import { SupportedLocale } from "./types/locales.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { locales } from "./locales/locales.js";
import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { CalendarUtils } from "./utils/calendar.js";

import "./components/calendar/calendar-grid.js";
import "./components/calendar/calendar-header.js";
import "./components/calendar/calendar-month-picker.js";
import "./components/calendar/calendar-year-picker.js";
import {
    CalendarDateClickEvent,
    CalendarDateHoverEvent,
    CalendarDateSelectedEvent,
    CalendarHeaderSide,
    CalendarMonthPickerEvent,
    CalendarMonthSelectedEvent,
    CalendarNavigateEvent,
    CalendarRangeSelectedEvent,
    CalendarYearPickerEvent,
    CalendarYearSelectedEvent,
} from "./types/mjo-calendar.js";

/**
 * A configurable calendar component for date selection.
 * Supports single date and date range selection with navigation controls.
 *
 * @slot - Optional content (not commonly used)
 * @csspart calendar - The main calendar container
 * @csspart header - The calendar header
 * @csspart navigation - Navigation buttons container
 * @csspart month-year - Month and year display
 * @csspart calendar-grid - The days grid
 * @csspart day - Individual day cell
 * @csspart selected - Selected day(s)
 * @csspart today - Today's date
 * @fires date-selected - Fired when a date is selected
 * @fires range-selected - Fired when a date range is selected
 */
@customElement("mjo-calendar")
export class MjoCalendar extends ThemeMixin(FormMixin(LitElement)) implements IFormMixin, IThemeMixin {
    @property({ type: String }) mode: "single" | "range" = "single";
    @property({ type: String }) name?: string;
    @property({ type: String }) value?: string;
    @property({ type: String }) startDate?: string;
    @property({ type: String }) endDate?: string;
    @property({ type: String }) locale: SupportedLocale = "en";
    @property({ type: String }) minDate?: string;
    @property({ type: String }) maxDate?: string;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Array }) disabledDates?: string[];
    @property({ type: Boolean }) showToday = true;
    @property({ type: Boolean }) showWeekNumbers = false;
    @property({ type: String }) firstDayOfWeek: "sunday" | "monday" = "monday";
    /**
     * Controls how many calendars are shown in range mode.
     * Accepted values:
     *  - 1: always show a single calendar (still allows selecting start/end sequentially)
     *  - 2: always show two synchronized calendars side by side
     *  - "auto": attempts to show two; falls back to one if viewport width is small
     * Default: "auto".
     * (Note: this does NOT apply to single mode.)
     */
    @property({ type: String, attribute: "range-calendars" }) rangeCalendars: "1" | "2" | "auto" = "auto";

    // Legacy month/year reactive states removed; derive via displayedMonths getters for backward compatibility during migration
    @state() private selectedDate?: Date;
    @state() private selectedStartDate?: Date;
    @state() private selectedEndDate?: Date;
    @state() private hoverDate?: Date;
    // Legacy left/right month/year removed; use displayedMonths[0|1]
    @state() private picker: { open: boolean; type?: "month" | "year"; index: number } = { open: false, type: undefined, index: 0 };
    /** Internal flag computed when rangeCalendars === "auto" determining if we show dual calendars */
    @state() private autoDual = false;
    /** Step 2: unified list of currently displayed months (length 1 or 2). */
    @state() private displayedMonths: { month: number; year: number }[] = [];

    static readonly AUTO_DUAL_THRESHOLD = 720; // px

    #resizeObserver?: ResizeObserver;

    get currentLocale() {
        return locales[this.locale] || locales.en;
    }

    get monthNames() {
        return this.currentLocale.calendar.months;
    }

    get weekDays() {
        return this.currentLocale.calendar.weekdaysShort;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.#initializeDates();
        this.#syncDisplayedMonthsFromState();
        // Setup ResizeObserver for adaptive dual-range mode
        if (typeof ResizeObserver !== "undefined") {
            this.#resizeObserver = new ResizeObserver(() => this._evaluateAutoDual());
            // Defer observing until first paint to ensure rendering box is stable
            requestAnimationFrame(() => {
                this.#resizeObserver?.observe(this);
                // Immediately evaluate once after observing
                this._evaluateAutoDual();
                this.#syncDisplayedMonthsFromState();
            });
        } else {
            // Fallback: listen to window resize
            window.addEventListener("resize", this.#handleWindowResize);
            this._evaluateAutoDual();
            this.#syncDisplayedMonthsFromState();
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.#resizeObserver?.disconnect();
        window.removeEventListener("resize", this.#handleWindowResize);
    }

    render() {
        if (this.mode === "range") {
            // Decide whether to render dual or single calendar in range mode
            if (this.#shouldRenderDualRange()) {
                return this.#renderRangeCalendar();
            }
            // Fallback to a single-calendar rendering but keeping range selection logic
            return this.#renderSingleCalendar(/*rangeMode*/ true);
        }
        return this.#renderSingleCalendar();
    }

    #renderSingleCalendar(isRangeMode = false) {
        if (this.displayedMonths.length === 0) {
            const today = new Date();
            this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
        }
        const dm = this.displayedMonths[0];
        return html`
            <div class="calendar-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${this.#renderCalendarSide({
                    month: dm.month,
                    year: dm.year,
                    side: "single",
                    forceMode: isRangeMode ? "range" : this.mode,
                })}
                ${this.picker.open
                    ? html`
                          <div class="picker-overlay" @click=${this.#handlePickerClose}>
                              <div class="picker-backdrop"></div>
                          </div>
                      `
                    : ""}
            </div>
        `;
    }

    #shouldRenderDualRange(): boolean {
        if (this.mode !== "range") return false;
        const setting = this.rangeCalendars;
        if (setting === "2") return true;
        if (setting === "1") return false;
        // Auto mode: rely on computed state updated by ResizeObserver / window resize
        return this.autoDual;
    }

    #renderRangeCalendar() {
        // Ensure we have two displayed months for range mode (adjacent)
        if (this.displayedMonths.length !== 2) {
            if (this.displayedMonths.length === 1) {
                const first = this.displayedMonths[0];
                const secondDate = new Date(first.year, first.month + 1, 1);
                this.displayedMonths = [first, { month: secondDate.getMonth(), year: secondDate.getFullYear() }];
            } else if (this.displayedMonths.length === 0) {
                const today = new Date();
                const next = new Date(today.getFullYear(), today.getMonth() + 1, 1);
                this.displayedMonths = [
                    { month: today.getMonth(), year: today.getFullYear() },
                    { month: next.getMonth(), year: next.getFullYear() },
                ];
            }
        }
        const months = this.displayedMonths;

        return html`
            <div class="calendar-range-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                <!-- Left Calendar -->
                ${this.#renderCalendarSide({ month: months[0].month, year: months[0].year, side: "left" })}
                <!-- Right Calendar -->
                ${this.#renderCalendarSide({ month: months[1].month, year: months[1].year, side: "right" })}
                ${this.picker.open
                    ? html`
                          <div class="picker-overlay" @click=${this.#handlePickerClose}>
                              <div class="picker-backdrop"></div>
                          </div>
                      `
                    : ""}
            </div>
        `;
    }

    /** Helper to render a calendar side (single/left/right) */
    #renderCalendarSide(args: { month: number; year: number; side: "single" | "left" | "right"; forceMode?: "single" | "range" }) {
        const { month, year, side, forceMode } = args;
        const calendarIndex = this.#calendarIndexForSide(side);
        const isPickerSide = this.picker.open && this.picker.index === calendarIndex;
        const mode = forceMode ?? this.mode;
        return html`
            <div class="calendar-side" data-side=${side}>
                <calendar-header
                    .month=${month}
                    .year=${year}
                    .monthNames=${this.monthNames}
                    .disabled=${this.disabled}
                    side=${side}
                    @navigate=${this.#handleNavigate}
                    @month-picker=${this.#handleMonthPicker}
                    @year-picker=${this.#handleYearPicker}
                ></calendar-header>
                <calendar-grid
                    .month=${month}
                    .year=${year}
                    .weekDays=${this.weekDays}
                    .firstDayOfWeek=${this.firstDayOfWeek}
                    .mode=${mode}
                    .showToday=${this.showToday}
                    .size=${this.size}
                    .disabled=${this.disabled}
                    .minDate=${this.minDate}
                    .maxDate=${this.maxDate}
                    .disabledDates=${this.disabledDates}
                    .selectedDate=${this.selectedDate}
                    .selectedStartDate=${this.selectedStartDate}
                    .selectedEndDate=${this.selectedEndDate}
                    .hoverDate=${this.hoverDate}
                    side=${side}
                    @date-click=${this.#handleDateClick}
                    @date-hover=${this.#handleDateHover}
                    @date-leave=${this.#handleDateLeave}
                ></calendar-grid>
                ${this.picker.open && this.picker.type === "month" && isPickerSide
                    ? html`
                          <calendar-month-picker
                              .selectedMonth=${month}
                              .monthNames=${this.monthNames}
                              .disabled=${this.disabled}
                              @month-selected=${this.#handleMonthSelected}
                              @click=${(e: Event) => e.stopPropagation()}
                          ></calendar-month-picker>
                      `
                    : this.picker.open && this.picker.type === "year" && isPickerSide
                      ? html`
                            <calendar-year-picker
                                .selectedYear=${year}
                                .disabled=${this.disabled}
                                @year-selected=${this.#handleYearSelected}
                                @click=${(e: Event) => e.stopPropagation()}
                            ></calendar-year-picker>
                        `
                      : nothing}
            </div>
        `;
    }

    /** Recalculate autoDual flag (called by ResizeObserver / window resize); public (prefixed underscore) for testability */
    _evaluateAutoDual() {
        if (this.rangeCalendars !== "auto" || this.mode !== "range") return;
        // Measure parent width preferentially (wrapper may define layout), fallback to host, then window
        const parentWidth = this.parentElement?.getBoundingClientRect().width;
        const hostRect = this.getBoundingClientRect();
        const width = parentWidth || hostRect.width || window.innerWidth;
        const shouldDual = width >= MjoCalendar.AUTO_DUAL_THRESHOLD;
        if (shouldDual !== this.autoDual) {
            this.autoDual = shouldDual;
        }
    }
    #handleWindowResize = () => this._evaluateAutoDual();

    /** Sync displayedMonths from legacy state */
    #syncDisplayedMonthsFromState() {
        if (this.displayedMonths.length === 0) {
            const today = new Date();
            this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
        }
        if (this.mode === "range" && this.#shouldRenderDualRange() && this.displayedMonths.length === 1) {
            const first = this.displayedMonths[0];
            const d = new Date(first.year, first.month + 1, 1);
            this.displayedMonths = [first, { month: d.getMonth(), year: d.getFullYear() }];
        }
    }

    #initializeDates() {
        if (this.value && this.mode === "single") {
            this.selectedDate = new Date(this.value);
            this.displayedMonths = [{ month: this.selectedDate.getMonth(), year: this.selectedDate.getFullYear() }];
        } else if (this.startDate && this.mode === "range") {
            this.selectedStartDate = new Date(this.startDate);
            this.displayedMonths = [{ month: this.selectedStartDate.getMonth(), year: this.selectedStartDate.getFullYear() }];

            if (this.endDate) {
                this.selectedEndDate = new Date(this.endDate);
            }
        }
    }

    #handleNavigate(event: CalendarNavigateEvent) {
        const { direction, side } = event.detail;
        this.#navigateMonth(direction, side);
    }

    #handleMonthPicker(event: CalendarMonthPickerEvent) {
        const { side } = event.detail;
        this.#openPicker("month", side);
    }

    #handleYearPicker(event: CalendarYearPickerEvent) {
        const { side } = event.detail;
        this.#openPicker("year", side);
    }

    #handleDateClick(event: CalendarDateClickEvent) {
        const { date } = event.detail;
        this.#selectDate(date);
    }

    #handleDateHover(event: CalendarDateHoverEvent) {
        const { date } = event.detail;
        if (this.mode === "range" && this.selectedStartDate && !this.selectedEndDate) {
            this.hoverDate = date;
        }
    }

    #handleDateLeave() {
        this.hoverDate = undefined;
    }

    #handleMonthSelected(event: CalendarMonthSelectedEvent) {
        const { month } = event.detail;
        const side = this.#sideForCalendarIndex(this.picker.index);
        this.#setMonth(month, side);
        this.#closePicker();
    }

    #handleYearSelected(event: CalendarYearSelectedEvent) {
        const { year } = event.detail;
        const side = this.#sideForCalendarIndex(this.picker.index);
        this.#setYear(year, side);
        this.#closePicker();
    }

    #handlePickerClose() {
        this.#closePicker();
    }

    #openPicker(type: "month" | "year", side: "single" | "left" | "right") {
        this.picker = { open: true, type, index: this.#calendarIndexForSide(side) };
    }

    #closePicker() {
        if (this.picker.open) {
            this.picker = { open: false, type: undefined, index: 0 };
        }
    }

    #calendarIndexForSide(side: "single" | "left" | "right") {
        if (side === "single") return 0;
        return side === "left" ? 0 : 1;
    }

    #sideForCalendarIndex(index: number): "single" | "left" | "right" {
        if (this.mode !== "range") return "single";
        return index === 0 ? "left" : "right";
    }

    #navigateMonth(direction: number, side: "single" | "left" | "right") {
        if (side === "single") {
            const base = this.displayedMonths[0];
            const newDate = new Date(base.year, base.month + direction, 1);
            this.displayedMonths = [{ month: newDate.getMonth(), year: newDate.getFullYear() }];
            return;
        }
        // range mode
        if (this.displayedMonths.length < 2) this.#syncDisplayedMonthsFromState();
        const [left, right] = this.displayedMonths;
        if (side === "left") {
            const newLeft = new Date(left.year, left.month + direction, 1);
            const newRight = new Date(newLeft.getFullYear(), newLeft.getMonth() + 1, 1);
            this.displayedMonths = [
                { month: newLeft.getMonth(), year: newLeft.getFullYear() },
                { month: newRight.getMonth(), year: newRight.getFullYear() },
            ];
        } else {
            const newRight = new Date(right.year, right.month + direction, 1);
            const newLeft = new Date(newRight.getFullYear(), newRight.getMonth() - 1, 1);
            this.displayedMonths = [
                { month: newLeft.getMonth(), year: newLeft.getFullYear() },
                { month: newRight.getMonth(), year: newRight.getFullYear() },
            ];
        }
    }

    #setMonth(month: number, side: "single" | "left" | "right") {
        if (this.displayedMonths.length === 0) this.#syncDisplayedMonthsFromState();
        if (side === "single") {
            const year = this.displayedMonths[0].year;
            this.displayedMonths = [{ month, year }];
            return;
        }
        if (this.displayedMonths.length < 2) this.#syncDisplayedMonthsFromState();
        const [left] = this.displayedMonths;
        if (side === "left") {
            const newLeft = { month, year: left.year };
            const dRight = new Date(newLeft.year, newLeft.month + 1, 1);
            this.displayedMonths = [newLeft, { month: dRight.getMonth(), year: dRight.getFullYear() }];
        } else {
            const rightYear = this.displayedMonths[1].year;
            const newRight = { month, year: rightYear };
            const dLeft = new Date(newRight.year, newRight.month - 1, 1);
            this.displayedMonths = [{ month: dLeft.getMonth(), year: dLeft.getFullYear() }, newRight];
        }
    }

    #setYear(year: number, side: CalendarHeaderSide) {
        if (this.displayedMonths.length === 0) this.#syncDisplayedMonthsFromState();
        if (side === "single") {
            const month = this.displayedMonths[0].month;
            this.displayedMonths = [{ month, year }];
            return;
        }
        if (this.displayedMonths.length < 2) this.#syncDisplayedMonthsFromState();
        if (side === "left") {
            const left = { month: this.displayedMonths[0].month, year };
            const rightDate = new Date(year, left.month + 1, 1);
            this.displayedMonths = [left, { month: rightDate.getMonth(), year: rightDate.getFullYear() }];
        } else {
            const right = { month: this.displayedMonths[1].month, year };
            const leftDate = new Date(year, right.month - 1, 1);
            this.displayedMonths = [{ month: leftDate.getMonth(), year: leftDate.getFullYear() }, right];
        }
    }

    /* =====================
     * Public API (new)
     * ===================== */
    /** Returns a shallow copy of the currently displayed months (length 1 or 2). */
    public getDisplayedMonths() {
        return [...this.displayedMonths];
    }

    /**
     * Sets the displayed months.
     * If two months provided and not adjacent, the second will be coerced to be +1 month from the first by default.
     */
    public setDisplayedMonths(months: { month: number; year: number }[], enforceAdjacency = true) {
        if (!Array.isArray(months) || months.length === 0) return;
        if (months.length > 2) months = months.slice(0, 2);
        const normalized = months.map((m) => ({ month: m.month, year: m.year }));
        if (normalized.length === 2 && enforceAdjacency) {
            const first = normalized[0];
            const expected = this._addMonth(first, 1);
            const second = normalized[1];
            if (second.month !== expected.month || second.year !== expected.year) {
                normalized[1] = expected;
            }
        }
        this.displayedMonths = normalized;
    }

    /** Programmatically set a month for the given side (single/left/right). */
    public setMonth(side: CalendarHeaderSide, month: number) {
        this.#setMonth(month, side);
    }

    /** Programmatically set a year for the given side (single/left/right). */
    public setYear(side: CalendarHeaderSide, year: number) {
        this.#setYear(year, side);
    }

    // (Legacy accessors removed permanently)

    #selectDate(date: Date) {
        if (CalendarUtils.isDateDisabled(date, this.disabled, this.minDate, this.maxDate, this.disabledDates)) return;

        if (this.mode === "single") {
            this.selectedDate = date;
            this.value = CalendarUtils.formatDate(date);
            this.#updateFormData();
            this.#dispatchDateSelected();
        } else if (this.mode === "range") {
            if (!this.selectedStartDate || (this.selectedStartDate && this.selectedEndDate)) {
                // Start new range
                this.selectedStartDate = date;
                this.selectedEndDate = undefined;
                this.startDate = CalendarUtils.formatDate(date);
                this.endDate = undefined;
            } else if (this.selectedStartDate && !this.selectedEndDate) {
                // Complete range
                if (date < this.selectedStartDate) {
                    // Swap if end date is before start date
                    this.selectedEndDate = this.selectedStartDate;
                    this.selectedStartDate = date;
                    this.endDate = CalendarUtils.formatDate(this.selectedEndDate);
                    this.startDate = CalendarUtils.formatDate(this.selectedStartDate);
                } else {
                    this.selectedEndDate = date;
                    this.endDate = CalendarUtils.formatDate(date);
                }
                this.#updateFormData();
                this.#dispatchRangeSelected();
            }
        }
    }

    #updateFormData() {
        if (!this.name) return;

        if (this.mode === "single" && this.value) {
            this.updateFormData({ name: this.name, value: this.value });
        } else if (this.mode === "range" && this.startDate && this.endDate) {
            // For range mode, we could send JSON or separate fields
            const rangeValue = JSON.stringify({ start: this.startDate, end: this.endDate });
            this.updateFormData({ name: this.name, value: rangeValue });
        }
    }

    #dispatchDateSelected() {
        const eventDetail: CalendarDateSelectedEvent["detail"] & { value?: string } = {
            date: this.value ? new Date(this.value) : undefined,
            dateString: this.value,
            value: this.value, // compatibility convenience
        };

        // Emit the specific date-selected event
        this.dispatchEvent(
            new CustomEvent("date-selected", {
                detail: eventDetail,
                bubbles: true,
                composed: true,
            }),
        );

        // Also emit a standard change event for consistency with other form controls
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: eventDetail,
                bubbles: true,
                composed: true,
            }),
        );
    }

    #dispatchRangeSelected() {
        const eventDetail: CalendarRangeSelectedEvent["detail"] & { startDateValue?: string; endDateValue?: string } = {
            startDate: this.startDate ? new Date(this.startDate) : undefined,
            endDate: this.endDate ? new Date(this.endDate) : undefined,
            startDateString: this.startDate,
            endDateString: this.endDate,
            startDateValue: this.startDate,
            endDateValue: this.endDate,
        };

        // Emit the specific range-selected event
        this.dispatchEvent(
            new CustomEvent("range-selected", {
                detail: eventDetail,
                bubbles: true,
                composed: true,
            }),
        );

        // Also emit a standard change event for consistency with other form controls
        this.dispatchEvent(
            new CustomEvent("change", {
                detail: eventDetail,
                bubbles: true,
                composed: true,
            }),
        );
    }

    /** Test helper: ensure displayed months are initialized and coherent (does not remove legacy yet). */
    _ensureDisplayedMonths() {
        this.#ensureDisplayedMonthsInternal();
    }

    #ensureDisplayedMonthsInternal() {
        if (this.displayedMonths.length === 0) {
            // derive base from selected values or legacy current/left
            const base = this.selectedDate || this.selectedStartDate || new Date();
            this.displayedMonths = [{ month: base.getMonth(), year: base.getFullYear() }];
        }
        if (this.mode === "range" && this.#shouldRenderDualRange()) {
            if (this.displayedMonths.length === 1) {
                const left = this.displayedMonths[0];
                this.displayedMonths = [left, this._addMonth(left, 1)];
            } else if (this.displayedMonths.length >= 2) {
                // enforce adjacency between first two
                const left = this.displayedMonths[0];
                this.displayedMonths = [left, this._addMonth(left, 1)];
            }
        } else {
            if (this.displayedMonths.length > 1) {
                this.displayedMonths = [this.displayedMonths[0]];
            }
        }
    }

    /** Add delta months to a reference month/year. */
    _addMonth(ref: { month: number; year: number }, delta: number) {
        let m = ref.month + delta;
        let y = ref.year;
        while (m > 11) {
            m -= 12;
            y++;
        }
        while (m < 0) {
            m += 12;
            y--;
        }
        return { month: m, year: y };
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                font-family: var(--mjo-calendar-font-family, var(--mjo-font-family, inherit));
            }

            :host([disabled]) {
                pointer-events: none;
                opacity: 0.6;
            }

            .calendar-container,
            .calendar-range-container {
                position: relative;
                background: var(--mjo-calendar-background, var(--mjo-background-color, white));
                border: var(--mjo-calendar-border, 1px solid var(--mjo-border-color, #e0e0e0));
                border-radius: var(--mjo-calendar-border-radius, var(--mjo-radius, 8px));
                box-shadow: var(--mjo-calendar-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
                padding: var(--mjo-calendar-padding, 16px);
                font-size: var(--mjo-font-size-small, 14px);
            }

            .calendar-range-container {
                display: flex;
                gap: 24px;
            }

            .calendar-side {
                flex: 1;
            }

            .picker-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                pointer-events: auto;
            }

            .picker-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: transparent;
            }

            calendar-month-picker,
            calendar-year-picker {
                position: absolute;
                inset: 0;
                z-index: 1;
                background: var(--mjo-calendar-picker-background, var(--mjo-background-color, white));
                border-radius: var(--mjo-calendar-picker-radius, var(--mjo-radius, 8px));
                box-shadow: var(--mjo-calendar-picker-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
            }

            /* Size variations */
            [data-size="small"] {
                font-size: var(--mjo-font-size-xsmall, 10px);
            }

            [data-size="large"] {
                font-size: var(--mjo-font-size, 16px);
            }

            /* Color variations */
            [data-color="secondary"] calendar-grid {
                --mjo-calendar-today-background: var(--mjo-calendar-today-background-secondary, var(--mjo-secondary-color-alpha2, rgba(204, 61, 116, 0.1)));
                --mjo-calendar-today-color: var(--mjo-calendar-today-color-secondary, var(--mjo-secondary-color, #cc3d74));
                --mjo-calendar-selected-background: var(--mjo-calendar-selected-background-secondary, var(--mjo-secondary-color, #cc3d74));
                --mjo-calendar-selected-color: var(--mjo-calendar-selected-color-secondary, white);
                --mjo-calendar-range-endpoint-background: var(--mjo-calendar-selected-background-secondary, var(--mjo-secondary-color, #cc3d74));
                --mjo-calendar-range-endpoint-color: var(--mjo-calendar-selected-color-secondary, white);
                --mjo-calendar-range-background: var(--mjo-calendar-range-background-secondary, var(--mjo-secondary-color-alpha1, rgba(204, 61, 116, 0.2)));
                --mjo-calendar-range-color: var(--mjo-calendar-range-color-secondary, var(--mjo-secondary-color, #cc3d74));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-calendar": MjoCalendar;
    }
}
