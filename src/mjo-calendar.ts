import { SupportedLocale } from "./types/locales.js";
import {
    CalendarMonthPickerEvent,
    CalendarNavigateEvent,
    CalendarYearPickerEvent,
    GoToDateOptions,
    GoToMonthOptions,
    GoToYearOptions,
    MjoCalendarDateSelectedEvent,
    MjoCalendarDayClickEvent,
    MjoCalendarDayHoverEvent,
    MjoCalendarDayLeaveEvent,
    MjoCalendarHeaderSide,
    MjoCalendarMarker,
    MjoCalendarMonthSelectedEvent,
    MjoCalendarRangeSelectedEvent,
    MjoCalendarYearSelectedEvent,
} from "./types/mjo-calendar.js";

import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { locales } from "./locales/locales.js";
import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { CalendarUtils } from "./utils/calendar.js";
import { getParentNodes } from "./utils/shadow-dom.js";

import "./components/calendar/mjoint-calendar-grid.js";
import "./components/calendar/mjoint-calendar-header.js";
import "./components/calendar/mjoint-calendar-month-picker.js";
import "./components/calendar/mjoint-calendar-year-picker.js";

/**
 * A configurable calendar component for date selection.
 * Supports single date and date range selection with navigation controls, internationalization,
 * accessibility features, form integration, and extensive theming capabilities.
 *
 * @fires mjo-calendar:date-selected - Fired when a date is selected in single mode
 * @fires mjo-calendar:range-selected - Fired when a date range is selected in range mode
 * @fires mjo-calendar:day-click - Fired when a day is clicked
 * @fires mjo-calendar:day-hover - Fired when a day is hovered
 * @fires mjo-calendar:day-leave - Fired when mouse leaves a day
 * @fires mjo-calendar:month-selected - Fired when a month is selected in month picker
 * @fires mjo-calendar:year-selected - Fired when a year is selected in year picker
 * @fires change - Standard change event for form compatibility
 *
 * @cssprop --mjo-calendar-font-family - Calendar font family
 * @cssprop --mjo-calendar-background - Calendar background color
 * @cssprop --mjo-calendar-foreground-color - Calendar foreground color
 * @cssprop --mjo-calendar-foreground-color-low - Calendar foreground color for low emphasis
 * @cssprop --mjo-calendar-border - Calendar border style
 * @cssprop --mjo-calendar-border-radius - Calendar border radius
 * @cssprop --mjo-calendar-shadow - Calendar box shadow
 * @cssprop --mjo-calendar-padding - Calendar internal padding
 * @cssprop --mjo-calendar-week-day-color - Week day headers text color
 * @cssprop --mjo-calendar-week-day-font-weight - Week day headers font weight
 * @cssprop --mjo-calendar-day-border-radius - Individual day cell border radius
 * @cssprop --mjo-calendar-day-hover-background - Day cell hover background
 * @cssprop --mjo-calendar-focus-outline - Focused element outline color
 * @cssprop --mjo-calendar-today-background - Today's date background
 * @cssprop --mjo-calendar-today-color - Today's date text color
 * @cssprop --mjo-calendar-event-offset - Event indicator offset from bottom-right corner
 * @cssprop --mjo-calendar-event-font-size - Event indicator font size
 * @cssprop --mjo-calendar-event-font-weight - Event indicator font weight
 * @cssprop --mjo-calendar-event-background-color - Event indicator background color
 * @cssprop --mjo-calendar-event-foreground-color - Event indicator foreground color
 * @cssprop --mjo-calendar-event-single-size - Single event indicator size
 * @cssprop --mjo-calendar-event-multiple-size - Multiple events indicator size
 * @cssprop --mjo-calendar-selected-background - Selected date background
 * @cssprop --mjo-calendar-selected-color - Selected date text color
 * @cssprop --mjo-calendar-range-endpoint-background - Range start/end background
 * @cssprop --mjo-calendar-range-endpoint-color - Range start/end text color
 * @cssprop --mjo-calendar-range-background - Range middle dates background
 * @cssprop --mjo-calendar-range-color - Range middle dates text color
 * @cssprop --mjo-calendar-disabled-color - Disabled dates text color
 * @cssprop --mjo-calendar-disabled-background - Disabled dates background
 * @cssprop --mjo-calendar-picker-background - Month/year picker background
 * @cssprop --mjo-calendar-picker-radius - Month/year picker border radius
 * @cssprop --mjo-calendar-picker-button-background - Picker button background
 * @cssprop --mjo-calendar-picker-button-hover-background - Picker button hover background
 * @cssprop --mjo-calendar-picker-button-selected-background - Picker button selected background
 * @cssprop --mjo-calendar-nav-button-border - Navigation button border
 * @cssprop --mjo-calendar-nav-button-color - Navigation button text color
 * @cssprop --mjo-calendar-selector-button-color - Month/year selector text color
 * @cssprop --mjo-calendar-selector-button-highlight-color - Selector button hover background color
 * @cssprop --mjo-calendar-padding-compact - Calendar internal padding when compact
 * @cssprop --mjo-calendar-picker-button-border - Picker button border
 * @cssprop --mjo-calendar-picker-button-radius - Picker button border radius
 * @cssprop --mjo-calendar-picker-button-color - Picker button text color
 * @cssprop --mjo-calendar-picker-button-hover-border - Picker button hover border
 * @cssprop --mjo-calendar-picker-button-focus-outline - Picker button focus outline
 * @cssprop --mjo-calendar-picker-button-selected-border - Picker button selected border
 * @cssprop --mjo-calendar-picker-button-selected-color - Picker button selected text color
 * @cssprop --mjo-calendar-nav-background - Year picker navigation button background
 * @cssprop --mjo-calendar-nav-border - Year picker navigation button border
 * @cssprop --mjo-calendar-nav-radius - Year picker navigation button border radius
 * @cssprop --mjo-calendar-nav-color - Year picker navigation button text color
 * @cssprop --mjo-calendar-nav-hover-background - Year picker navigation button hover background
 * @cssprop --mjo-calendar-nav-hover-border - Year picker navigation button hover border
 * @cssprop --mjo-calendar-nav-focus-outline - Year picker navigation button focus outline
 * @cssprop --mjo-calendar-decade-label-color - Year picker decade label text color
 *
 * @csspart calendar - The main calendar container
 * @csspart header - The calendar header container
 * @csspart navigation - Navigation buttons and selectors toolbar
 * @csspart nav-button - Navigation buttons (previous/next month)
 * @csspart selectors-container - Container for month and year selectors
 * @csspart selector-button - Month and year selector buttons
 * @csspart calendar-grid - The main calendar grid container
 * @csspart week-days-container - Container for weekday headers
 * @csspart week-day - Individual weekday header cell
 * @csspart days-container - Container for calendar days
 * @csspart day - Individual day cell
 * @csspart day-selected - Selected day cell (applied with day part)
 * @csspart day-today - Today's date cell (applied with day part)
 * @csspart event-indicator - Event indicator container
 * @csspart event-indicator-single - Single event indicator (applied with event-indicator part)
 * @csspart event-indicator-multiple - Multiple events indicator (applied with event-indicator part)
 * @csspart month-picker-container - Month picker overlay container
 * @csspart month-picker-grid - Month picker grid layout
 * @csspart month-picker-button - Individual month selection button
 * @csspart month-picker-button-selected - Individual month selection button (selected state)
 * @csspart year-picker-container - Year picker overlay container
 * @csspart year-picker-navigation - Year picker navigation controls
 * @csspart year-picker-nav-button - Year picker navigation buttons
 * @csspart year-picker-decade-label - Decade range label in year picker
 * @csspart year-picker-grid - Year picker grid layout
 * @csspart year-picker-button - Individual year selection button
 * @csspart year-picker-button-selected - Individual year selection button (selected state)
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
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Array }) disabledDates?: string[];
    @property({ type: Boolean }) hideToday = false;
    @property({ type: String }) firstDayOfWeek: "sunday" | "monday" = "monday";
    @property({ type: String }) rangeCalendars: "1" | "2" | "auto" = "auto";
    @property({ type: Array }) eventMarkers?: MjoCalendarMarker[];
    @property({ type: Boolean }) disableKeyboardNavigation = false;
    @property({ type: Boolean }) disableAnnounceSelections = false;
    @property({ type: Boolean }) allowCompact = false;
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby: string | null = null;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby: string | null = null;
    @property({ type: String, attribute: "aria-live" }) ariaLive: "polite" | "assertive" | "off" = "polite";

    @state() private selectedDate?: Date;
    @state() private selectedStartDate?: Date;
    @state() private selectedEndDate?: Date;
    @state() private hoverDate?: Date;
    @state() private picker: { open: boolean; type?: "month" | "year"; index: number } = { open: false, type: undefined, index: 0 };
    @state() private displayedMonths: { month: number; year: number }[] = [];
    @state() private focusedDate?: Date;
    @state() private announcementText = "";
    @state() private compact = false;

    @state() private eventsMap = new Map<string, MjoCalendarMarker[]>();

    #resizeObserver?: ResizeObserver;
    #autoDual = false;
    #dualWidth = 0;
    #minWidth = 99999;

    render() {
        const calendarId = `calendar-${Math.random().toString(36).substring(2, 9)}`;

        return html`
            ${this.applyThemeSsr()}
            <div
                id=${calendarId}
                class="calendar"
                role="application"
                aria-label=${this.#computedAriaLabel}
                aria-labelledby=${ifDefined(this.ariaLabelledby || undefined)}
                aria-describedby=${ifDefined(this.ariaDescribedby || undefined)}
                aria-live=${this.announcementText ? this.ariaLive : "off"}
                tabindex=${this.disabled ? -1 : 0}
                @keydown=${!this.disableKeyboardNavigation ? this.#handleKeydown : nothing}
            >
                ${this.mode === "range" ? this.#renderRangeMode() : this.#renderSingleMode()}
                ${this.announcementText ? html`<div class="sr-only" aria-live=${this.ariaLive}>${this.announcementText}</div>` : nothing}
            </div>
        `;
    }

    #renderRangeMode() {
        // Decide whether to render dual or single calendar in range mode
        if (this.#shouldRenderDualRange()) {
            return this.#renderRangeCalendar();
        }
        // Fallback to a single-calendar rendering but keeping range selection logic
        return this.#renderSingleCalendar(/*rangeMode*/ true);
    }

    #renderSingleMode() {
        return this.#renderSingleCalendar();
    }

    #renderSingleCalendar(isRangeMode = false) {
        if (this.displayedMonths.length === 0) {
            const today = new Date();
            this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
        }
        const dm = this.displayedMonths[0];
        return html`
            <div
                class="calendar-container"
                part="calendar"
                ?data-compact=${this.compact}
                data-size=${this.size}
                data-color=${this.color}
                ?data-disabled=${this.disabled}
            >
                ${this.#renderCalendarSide({
                    month: dm.month,
                    year: dm.year,
                    side: "single",
                    forceMode: isRangeMode ? "range" : this.mode,
                })}
            </div>
        `;
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
                ${this.#renderCalendarSide({ month: months[0].month, year: months[0].year, side: "left" })}
                ${this.#renderCalendarSide({ month: months[1].month, year: months[1].year, side: "right" })}
            </div>
        `;
    }

    #renderCalendarSide(args: { month: number; year: number; side: "single" | "left" | "right"; forceMode?: "single" | "range" }) {
        const { month, year, side, forceMode } = args;
        const calendarIndex = this.#calendarIndexForSide(side);
        const isPickerSide = this.picker.open && this.picker.index === calendarIndex;
        const mode = forceMode ?? this.mode;

        return html`
            <div class="calendar-side" data-side=${side}>
                <mjoint-calendar-header
                    exportparts="header,navigation,selectors-container,selector-button,nav-button"
                    month=${month}
                    year=${year}
                    .monthNames=${this.#monthNames}
                    ?disabled=${this.disabled}
                    ?monthPickerOpen=${this.picker.open && this.picker.type === "month" && isPickerSide}
                    ?yearPickerOpen=${this.picker.open && this.picker.type === "year" && isPickerSide}
                    side=${side}
                    @navigate=${this.#handleNavigate}
                    @month-picker=${this.#handleMonthPicker}
                    @year-picker=${this.#handleYearPicker}
                ></mjoint-calendar-header>
                <mjoint-calendar-grid
                    exportparts="
                        calendar-grid,
                        week-days-container,
                        week-day,
                        days-container,
                        day,
                        day-selected,
                        day-today,
                        event-indicator,
                        event-indicator-single,
                        event-indicator-multiple"
                    month=${month}
                    year=${year}
                    .weekDays=${this.#weekDays}
                    firstDayOfWeek=${this.firstDayOfWeek}
                    mode=${mode}
                    ?showToday=${!this.hideToday}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    minDate=${this.minDate || ""}
                    maxDate=${this.maxDate || ""}
                    ?compact=${this.compact}
                    .disabledDates=${this.disabledDates}
                    .selectedDate=${this.selectedDate}
                    .selectedStartDate=${this.selectedStartDate}
                    .selectedEndDate=${this.selectedEndDate}
                    .hoverDate=${this.hoverDate}
                    .focusedDate=${this.focusedDate}
                    .eventsMap=${this.eventsMap}
                    side=${side}
                    @mjo-calendar:day-click=${this.#handleDayClick}
                    @mjo-calendar:day-hover=${this.#handleDayHover}
                    @mjo-calendar:day-leave=${this.#handleDayLeave}
                ></mjoint-calendar-grid>
                ${this.picker.open && this.picker.type === "month" && isPickerSide
                    ? html`
                          <mjoint-calendar-month-picker
                              exportparts="month-picker-container,month-picker-grid,month-picker-button,month-picker-button-selected"
                              selectedMonth=${month}
                              .monthNames=${this.#monthNames}
                              ?disabled=${this.disabled}
                              @mjo-calendar:month-selected=${this.#handleMonthSelected}
                              @click=${(e: Event) => e.stopPropagation()}
                          ></mjoint-calendar-month-picker>
                      `
                    : this.picker.open && this.picker.type === "year" && isPickerSide
                      ? html`
                            <mjoint-calendar-year-picker
                                exportparts="
                                    year-picker-container,
                                    year-picker-navigation,
                                    year-picker-nav-button,
                                    year-picker-decade-label,
                                    year-picker-grid,
                                    year-picker-button,
                                    year-picker-button-selected"
                                selectedYear=${year}
                                ?disabled=${this.disabled}
                                @mjo-calendar:year-selected=${this.#handleYearSelected}
                                @click=${(e: Event) => e.stopPropagation()}
                            ></mjoint-calendar-year-picker>
                        `
                      : nothing}
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#initializeDates();
        this.#syncDisplayedMonthsFromState();

        // Configurar observador después del primer render
        this.updateComplete.then(() => {
            this.#setupResizeObserver();
        });
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.#resizeObserver?.disconnect();
    }

    willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
        super.willUpdate(changedProperties);

        if (changedProperties.has("value") || changedProperties.has("startDate") || changedProperties.has("endDate") || changedProperties.has("mode")) {
            this.#initializeDates();
            this.#syncDisplayedMonthsFromState();
        }

        if (changedProperties.has("eventMarkers")) {
            this.#updateEventsMap();
        }
    }

    /** Returns a shallow copy of the currently displayed months (length 1 or 2). */
    getDisplayedMonths() {
        return [...this.displayedMonths];
    }

    /**
     * Sets the displayed months.
     * If two months provided and not adjacent, the second will be coerced to be +1 month from the first by default.
     */
    setDisplayedMonths(months: { month: number; year: number }[], enforceAdjacency = true) {
        if (!Array.isArray(months) || months.length === 0) return;
        if (months.length > 2) months = months.slice(0, 2);
        const normalized = months.map((m) => ({ month: m.month, year: m.year }));
        if (normalized.length === 2 && enforceAdjacency) {
            const first = normalized[0];
            const expected = this.#addMonth(first, 1);
            const second = normalized[1];
            if (second.month !== expected.month || second.year !== expected.year) {
                normalized[1] = expected;
            }
        }
        this.displayedMonths = normalized;
    }

    /** Navigate to a specific month with automatic side detection */
    goToMonth(options: GoToMonthOptions) {
        if (!options || typeof options !== "object") {
            throw new Error("Option param expect an object");
        }

        if (!options.year) {
            options.year = new Date().getFullYear();
        }

        const { month, year, side } = options;

        if (typeof month !== "number") {
            throw new Error("Requires a valid month number. Got: " + typeof month);
        }

        if (typeof year !== "number") {
            throw new Error("Requires a valid year number. Got: " + typeof year);
        }

        // Clamp month to valid range (1-12)
        const clampedMonth = Math.max(1, Math.min(12, month));

        const targetSide = this.#validateSide(side) || this.#getAutomaticSide();
        this.#setMonthAndYear(clampedMonth - 1, year, targetSide); // Convert to 0-based for internal use
    }

    /** Navigate to a specific year with automatic side detection */
    goToYear(options: GoToYearOptions) {
        if (!options || typeof options !== "object") {
            throw new Error("Option param expect an object");
        }

        const { year, side } = options;

        if (typeof year !== "number" || year < 1000 || year > 9999) {
            throw new Error("goToYear() requires a valid year (1000-9999). Got: " + year);
        }

        const targetSide = this.#validateSide(side) || this.#getAutomaticSide();
        const currentDisplayed = this.getDisplayedMonths();

        // Determine current month based on the target side
        let currentMonth: number;
        if (targetSide === "right" && currentDisplayed.length >= 2) {
            currentMonth = currentDisplayed[1].month;
        } else if (targetSide === "left" && currentDisplayed.length >= 1) {
            currentMonth = currentDisplayed[0].month;
        } else {
            // Default fallback - use first displayed month or current date
            currentMonth = currentDisplayed.length > 0 ? currentDisplayed[0].month : new Date().getMonth();
        }

        this.#setMonthAndYear(currentMonth, year, targetSide);
    }

    /** Navigate to a specific date (month and year simultaneously) */
    goToDate(options: GoToDateOptions) {
        if (!options || typeof options !== "object") {
            throw new Error("Option param expect an object");
        }

        const { date, side } = options;
        let targetDate: Date;

        // Parse date input
        if (date instanceof Date) {
            targetDate = new Date(date);
        } else if (typeof date === "string") {
            targetDate = new Date(date);
        } else {
            throw new Error("Date param expect a Date object or date string. Got: " + typeof date);
        }

        // Validate parsed date
        if (isNaN(targetDate.getTime())) {
            throw new Error("Date param expect a valid date. Got: " + date);
        }

        const targetSide = this.#validateSide(side) || this.#getAutomaticSide();
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();

        // Update both month and year in a single operation to avoid multiple re-renders
        this.#setMonthAndYear(targetMonth, targetYear, targetSide);
    }

    /** Reset any current selection (single or range) and displayed months to initial state. */
    resetSelection() {
        this.#doFullReset();
    }

    /** Full controlled reset API: clears selection, months, pickers and forces fresh today-based view. */
    reset() {
        this.#doFullReset();
    }

    /**
     * Programmatic date selection helper.
     * Exposed primarily to facilitate unit testing without relying on internal
     * shadow DOM event wiring. Mirrors a user clicking a date cell.
     */
    selectDate(date: Date) {
        this.#selectDate(date);
    }

    get #currentLocale() {
        return locales[this.locale] || locales.en;
    }

    get #monthNames() {
        const locale = this.#currentLocale;
        return locale && locale.calendar ? locale.calendar.months : locales.en.calendar.months;
    }

    get #weekDays() {
        const locale = this.#currentLocale;
        return locale && locale.calendar ? locale.calendar.weekdaysShort : locales.en.calendar.weekdaysShort;
    }

    get #computedAriaLabel() {
        if (this.ariaLabel) return this.ariaLabel;

        if (this.mode === "range") {
            return this.selectedStartDate && this.selectedEndDate
                ? `Date range picker. Selected from ${CalendarUtils.formatDate(this.selectedStartDate)} to ${CalendarUtils.formatDate(this.selectedEndDate)}`
                : "Date range picker. Use arrow keys to navigate, Enter to select.";
        }

        return this.selectedDate
            ? `Date picker. Selected date: ${CalendarUtils.formatDate(this.selectedDate)}`
            : "Date picker. Use arrow keys to navigate, Enter to select.";
    }

    #shouldRenderDualRange(): boolean {
        if (this.mode !== "range") return false;

        const setting = this.rangeCalendars;

        if (setting === "2") return true;
        if (setting === "1") return false;

        return this.#autoDual;
    }

    #handleCompact(parentElement: Element) {
        if (!this.allowCompact) return;
        if (this.#minWidth > this.offsetWidth && !this.compact) this.#minWidth = this.offsetWidth;

        const parentStyle = getComputedStyle(parentElement);
        const parentPaddingLeft = parseFloat(parentStyle.paddingLeft);
        const parentPaddingRight = parseFloat(parentStyle.paddingRight);
        const parentWidth = parentElement.clientWidth - parentPaddingLeft - parentPaddingRight;

        if (parentWidth <= this.#minWidth) {
            this.compact = true;
        } else {
            this.compact = false;
        }
    }

    #handleWindowResize = (parentElement: Element) => {
        this.#handleCompact(parentElement);

        if (this.rangeCalendars !== "auto" || this.mode !== "range") return;

        const parentStyle = getComputedStyle(parentElement);
        const parentPaddingLeft = parseFloat(parentStyle.paddingLeft);
        const parentPaddingRight = parseFloat(parentStyle.paddingRight);
        const parentWidth = parentElement.clientWidth - parentPaddingLeft - parentPaddingRight;

        const shouldDual = this.#dualWidth < parentWidth;

        if (shouldDual !== this.#autoDual) {
            this.#autoDual = shouldDual;
            if (this.#autoDual) this.compact = false;
            if (this.mode !== "range") return;

            if (this.#autoDual && this.displayedMonths.length === 1) {
                const first = this.displayedMonths[0];
                const second = new Date(first.year, first.month + 1, 1);
                this.displayedMonths = [first, { month: second.getMonth(), year: second.getFullYear() }];
                requestAnimationFrame(() => {
                    const prevDualWidth = this.#dualWidth;
                    this.#dualWidth = this.offsetWidth;

                    if (prevDualWidth === 0) this.#handleWindowResize(parentElement);
                });
            } else if (!this.#autoDual && this.displayedMonths.length === 2) {
                this.displayedMonths = [this.displayedMonths[0]];
            }

            this.requestUpdate();
        }
    };

    #handleKeydown(event: KeyboardEvent) {
        if (this.disabled || this.picker.open) return;

        const key = event.key;
        let handled = false;

        // Get current focused date or selected date as fallback
        const currentDate = this.focusedDate || this.selectedDate || new Date();

        switch (key) {
            case "ArrowLeft":
                this.#navigateDate(currentDate, -1);
                handled = true;
                break;
            case "ArrowRight":
                this.#navigateDate(currentDate, 1);
                handled = true;
                break;
            case "ArrowUp":
                this.#navigateDate(currentDate, -7);
                handled = true;
                break;
            case "ArrowDown":
                this.#navigateDate(currentDate, 7);
                handled = true;
                break;
            case "Home":
                this.#navigateToStartOfWeek(currentDate);
                handled = true;
                break;
            case "End":
                this.#navigateToEndOfWeek(currentDate);
                handled = true;
                break;
            case "PageUp":
                event.ctrlKey ? this.#navigateMonthByKeyboard(currentDate, -12) : this.#navigateMonthByKeyboard(currentDate, -1);
                handled = true;
                break;
            case "PageDown":
                event.ctrlKey ? this.#navigateMonthByKeyboard(currentDate, 12) : this.#navigateMonthByKeyboard(currentDate, 1);
                handled = true;
                break;
            case "Enter":
            case " ":
                if (this.focusedDate) {
                    this.#selectDate(this.focusedDate);
                    handled = true;
                }
                break;
            case "Escape":
                this.#handleEscape();
                handled = true;
                break;
            case "t":
            case "T":
                if (!event.ctrlKey && !event.altKey && !event.metaKey) {
                    this.#navigateToToday();
                    handled = true;
                }
                break;
        }

        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    #navigateDate(from: Date, days: number) {
        const newDate = new Date(from);
        newDate.setDate(newDate.getDate() + days);
        this.#setFocusedDate(newDate);
    }

    #navigateMonthByKeyboard(from: Date, months: number) {
        const newDate = new Date(from);
        newDate.setMonth(newDate.getMonth() + months);
        this.#setFocusedDate(newDate);
    }

    #navigateToStartOfWeek(from: Date) {
        const newDate = new Date(from);
        const day = newDate.getDay();
        const diff = this.firstDayOfWeek === "monday" ? (day === 0 ? 6 : day - 1) : day;
        newDate.setDate(newDate.getDate() - diff);
        this.#setFocusedDate(newDate);
    }

    #navigateToEndOfWeek(from: Date) {
        const newDate = new Date(from);
        const day = newDate.getDay();
        const diff = this.firstDayOfWeek === "monday" ? (day === 0 ? 0 : 7 - day) : 6 - day;
        newDate.setDate(newDate.getDate() + diff);
        this.#setFocusedDate(newDate);
    }

    #navigateToToday() {
        const today = new Date();
        this.#setFocusedDate(today);
        // Also update displayed months to show today
        this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
    }

    #setFocusedDate(date: Date) {
        this.focusedDate = date;
        // Ensure the focused date is visible
        const month = date.getMonth();
        const year = date.getFullYear();
        const currentMonth = this.displayedMonths[0];

        if (!currentMonth || currentMonth.month !== month || currentMonth.year !== year) {
            this.displayedMonths = [{ month, year }];
        }

        // Announce the focused date
        if (!this.disableAnnounceSelections) {
            const dateString = CalendarUtils.formatDate(date);
            this.#announceText(`Focused on ${dateString}`);
        }
    }

    #handleEscape() {
        if (this.picker.open) {
            this.#closePicker();
        } else {
            this.focusedDate = undefined;
        }
    }

    #announceText(text: string) {
        this.announcementText = text;
        // Clear after a short delay to allow screen readers to read it
        setTimeout(() => {
            this.announcementText = "";
        }, 1000);
    }

    #setupResizeObserver() {
        const parentElement = getParentNodes(this).next().value;
        if (!parentElement) return;

        this.#resizeObserver = new ResizeObserver(() => {
            this.#handleWindowResize(parentElement);
        });
        this.#resizeObserver.observe(parentElement);
    }

    #syncDisplayedMonthsFromState() {
        // Only initialize displayedMonths if empty AND no initial values were set
        if (this.displayedMonths.length === 0) {
            // Check if we have initial dates that should determine the displayed month
            let referenceDate: Date | undefined;

            if (this.mode === "single" && this.selectedDate) {
                referenceDate = this.selectedDate;
            } else if (this.mode === "range" && this.selectedStartDate) {
                referenceDate = this.selectedStartDate;
            }

            if (referenceDate) {
                // Use the month from the initial date selection instead of today
                this.displayedMonths = [{ month: referenceDate.getMonth(), year: referenceDate.getFullYear() }];
            } else {
                // Fallback to today only if no initial values exist
                const today = new Date();
                this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
            }
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

    #handleDayClick(event: MjoCalendarDayClickEvent) {
        const { date } = event.detail;
        this.#selectDate(date);
    }

    #handleDayHover(event: MjoCalendarDayHoverEvent) {
        const { date } = event.detail;

        if (this.mode === "range" && this.selectedStartDate && !this.selectedEndDate) {
            this.hoverDate = date;
        }
    }

    #handleDayLeave() {
        this.hoverDate = undefined;
    }

    #handleMonthSelected(event: MjoCalendarMonthSelectedEvent) {
        const { month } = event.detail;
        const side = this.#sideForCalendarIndex(this.picker.index);

        this.#setMonth(month, side);
        this.#closePicker();
    }

    #handleYearSelected(event: MjoCalendarYearSelectedEvent) {
        const { year } = event.detail;
        const side = this.#sideForCalendarIndex(this.picker.index);

        this.#setYear(year, side);
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

        // Defensive check - ensure we have at least one displayedMonth
        if (this.displayedMonths.length === 0 || !this.displayedMonths[0]) {
            const today = new Date();
            this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
        }

        if (side === "single") {
            const year = this.displayedMonths[0]?.year ?? new Date().getFullYear();
            this.displayedMonths = [{ month, year }];
            return;
        }

        if (this.displayedMonths.length < 2) this.#syncDisplayedMonthsFromState();

        // Ensure we have two months for range mode
        if (this.displayedMonths.length < 2) {
            const first = this.displayedMonths[0];
            const d = new Date(first?.year ?? new Date().getFullYear(), (first?.month ?? new Date().getMonth()) + 1, 1);
            this.displayedMonths = [first ?? { month: new Date().getMonth(), year: new Date().getFullYear() }, { month: d.getMonth(), year: d.getFullYear() }];
        }

        const [left] = this.displayedMonths;

        if (side === "left") {
            const newLeft = { month, year: left?.year ?? new Date().getFullYear() };
            const dRight = new Date(newLeft.year, newLeft.month + 1, 1);

            this.displayedMonths = [newLeft, { month: dRight.getMonth(), year: dRight.getFullYear() }];
        } else {
            const rightYear = this.displayedMonths[1]?.year ?? new Date().getFullYear();
            const newRight = { month, year: rightYear };
            const dLeft = new Date(newRight.year, newRight.month - 1, 1);

            this.displayedMonths = [{ month: dLeft.getMonth(), year: dLeft.getFullYear() }, newRight];
        }
    }

    #setYear(year: number, side: MjoCalendarHeaderSide) {
        if (this.displayedMonths.length === 0) this.#syncDisplayedMonthsFromState();

        // Defensive check - ensure we have at least one displayedMonth
        if (this.displayedMonths.length === 0 || !this.displayedMonths[0]) {
            const today = new Date();
            this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
        }

        if (side === "single") {
            const month = this.displayedMonths[0]?.month ?? new Date().getMonth();
            this.displayedMonths = [{ month, year }];
            return;
        }

        if (this.displayedMonths.length < 2) this.#syncDisplayedMonthsFromState();

        // Ensure we have two months for range mode
        if (this.displayedMonths.length < 2) {
            const first = this.displayedMonths[0];
            const d = new Date(first.year, first.month + 1, 1);
            this.displayedMonths = [first, { month: d.getMonth(), year: d.getFullYear() }];
        }

        if (side === "left") {
            const left = { month: this.displayedMonths[0]?.month ?? new Date().getMonth(), year };
            const rightDate = new Date(year, left.month + 1, 1);
            this.displayedMonths = [left, { month: rightDate.getMonth(), year: rightDate.getFullYear() }];
        } else {
            const right = { month: this.displayedMonths[1]?.month ?? new Date().getMonth(), year };
            const leftDate = new Date(year, right.month - 1, 1);
            this.displayedMonths = [{ month: leftDate.getMonth(), year: leftDate.getFullYear() }, right];
        }
    }

    #doFullReset() {
        this.selectedDate = undefined;
        this.selectedStartDate = undefined;
        this.selectedEndDate = undefined;
        this.hoverDate = undefined;
        this.value = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.picker = { open: false, type: undefined, index: 0 };
        // Reset displayed months so next render initializes fresh (current month)
        this.displayedMonths = [];
        this.#autoDual = false; // will be recalculated if in auto mode
        this.#syncDisplayedMonthsFromState();
    }

    #selectDate(date: Date) {
        if (CalendarUtils.isDateDisabled(date, this.disabled, this.minDate || "", this.maxDate || "", this.disabledDates)) return;

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
        const eventDetail: MjoCalendarDateSelectedEvent["detail"] & { value?: string } = {
            date: this.value ? new Date(this.value) : undefined,
            value: this.value,
        };

        // Announce selection for accessibility
        if (!this.disableAnnounceSelections && this.value) {
            const dateString = CalendarUtils.formatDate(new Date(this.value));
            this.#announceText(`Selected ${dateString}`);
        }

        // Emit the specific mjo-calendar:date-selected event
        this.dispatchEvent(
            new CustomEvent("mjo-calendar:date-selected", {
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
        const eventDetail: MjoCalendarRangeSelectedEvent["detail"] = {
            startDate: this.startDate ? new Date(this.startDate) : undefined,
            endDate: this.endDate ? new Date(this.endDate) : undefined,
            startDateValue: this.startDate,
            endDateValue: this.endDate,
        };

        // Announce selection for accessibility
        if (!this.disableAnnounceSelections && this.startDate && this.endDate) {
            const startString = CalendarUtils.formatDate(new Date(this.startDate));
            const endString = CalendarUtils.formatDate(new Date(this.endDate));
            this.#announceText(`Selected date range from ${startString} to ${endString}`);
        }

        // Emit the specific mjo-calendar:range-selected event
        this.dispatchEvent(
            new CustomEvent("mjo-calendar:range-selected", {
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

    /**
     * Determines the automatic side to use for navigation when no side is specified.
     * Returns the appropriate side based on the current mode and rangeCalendars setting.
     */
    #getAutomaticSide(): MjoCalendarHeaderSide {
        if (this.mode === "single") {
            return "single";
        }

        // For range mode
        if (this.rangeCalendars === "1") {
            return "single";
        }

        // For rangeCalendars="2" or autoDual, default to left side
        return "left";
    }

    /** Validate side parameter and return it if valid, null if invalid */
    #validateSide(side: string | undefined): MjoCalendarHeaderSide | null {
        if (side === "single" || side === "left" || side === "right") {
            return side;
        }
        return null;
    }

    /**
     * Sets both month and year simultaneously to avoid multiple re-renders.
     * This is more efficient than calling setMonth and setYear separately.
     */
    #setMonthAndYear(month: number, year: number, side: MjoCalendarHeaderSide) {
        if (this.displayedMonths.length === 0) this.#syncDisplayedMonthsFromState();

        if (side === "single") {
            this.displayedMonths = [{ month, year }];
            return;
        }

        if (this.displayedMonths.length < 2) this.#syncDisplayedMonthsFromState();

        if (side === "left") {
            const newLeft = { month, year };
            const rightDate = new Date(year, month + 1, 1);
            this.displayedMonths = [newLeft, { month: rightDate.getMonth(), year: rightDate.getFullYear() }];
        } else {
            // For right side, set right calendar and calculate left as previous month
            const newRight = { month, year };
            const leftDate = new Date(year, month - 1, 1);
            this.displayedMonths = [{ month: leftDate.getMonth(), year: leftDate.getFullYear() }, newRight];
        }
    }

    /**
     * Update the events map when eventMarkers property changes
     */
    #updateEventsMap() {
        const eventsMap = new Map<string, MjoCalendarMarker[]>();

        this.eventMarkers?.forEach((marker) => {
            const existing = eventsMap.get(marker.date) || [];
            existing.push(marker);
            eventsMap.set(marker.date, existing);
        });

        this.eventsMap = eventsMap;
    }

    /** Add delta months to a reference month/year. */
    #addMonth(ref: { month: number; year: number }, delta: number) {
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
                min-width: max-content;
                max-width: 100%;
            }

            :host([disabled]) {
                pointer-events: none;
                opacity: 0.6;
            }
            .calendar {
                position: relative;
                --mjoint-calendar-color-foreground: var(--mjo-calendar-foreground-color, var(--mjo-foreground-color, white));
                --mjoint-calendar-color-foreground-low: var(
                    --mjo-calendar-foreground-color-low,
                    var(--mjo-calendar-foreground-color, var(--mjo-foreground-color-low, #666))
                );
                --mjoint-calendar-border-color: var(--mjo-border-color, #e0e0e0);
                --mjoint-calendar-accent-color: var(--mjo-primary-color, #1aa8ed);
                --mjoint-calendar-accent-color-alpha: var(--mjo-primary-color-alpha2, rgba(26, 168, 237, 0.1));
                --mjoint-calendar-accent-color-foreground: var(--mjo-primary-foreground-color, #ffffff);
                --mjoint-calendar-highlight-color: var(--mjo-background-color-high, rgba(0, 0, 0, 0.2));
                --mjoint-calendar-disabled-color: var(--mjo-disabled-color, rgba(0, 0, 0, 0.1));
                --mjoint-calendar-disabled-color-foreground: var(--mjo-disabled-foreground-color, #aaa);
            }
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }

            .calendar-container,
            .calendar-range-container {
                position: relative;
                background: var(--mjo-calendar-background, var(--mjo-background-color, white));
                border: var(--mjo-calendar-border, 1px solid var(--mjo-border-color, #e0e0e0));
                border-radius: var(--mjo-calendar-border-radius, var(--mjo-radius-medium, 8px));
                box-shadow: var(--mjo-calendar-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
                padding: var(--mjo-calendar-padding, 14px);
                font-size: 12px;
            }
            .calendar-container[data-compact] {
                padding: var(--mjo-calendar-padding-compact, 6px);
            }
            .calendar-range-container {
                display: flex;
                gap: 24px;
            }
            .calendar-side {
                flex: 1;
            }
            mjoint-calendar-month-picker,
            mjoint-calendar-year-picker {
                position: absolute;
                inset: 0;
                z-index: 1;
            }
            [data-size="small"] {
                font-size: 10px;
            }
            [data-size="large"] {
                font-size: 14px;
            }
            [data-color="secondary"] {
                --mjoint-calendar-accent-color: var(--mjo-secondary-color, #7dc717);
                --mjoint-calendar-accent-color-alpha: var(--mjo-secondary-color-alpha2, rgba(125, 199, 23, 0.1));
                --mjoint-calendar-accent-color-foreground: var(--mjo-secondary-foreground-color, #ffffff);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-calendar": MjoCalendar;
    }

    interface HTMLElementEventMap {
        "mjo-calendar:date-selected": MjoCalendarDateSelectedEvent;
        "mjo-calendar:range-selected": MjoCalendarRangeSelectedEvent;
        "mjo-calendar:day-click": MjoCalendarDayClickEvent;
        "mjo-calendar:day-hover": MjoCalendarDayHoverEvent;
        "mjo-calendar:day-leave": MjoCalendarDayLeaveEvent;
        "mjo-calendar:month-selected": MjoCalendarMonthSelectedEvent;
        "mjo-calendar:year-selected": MjoCalendarYearSelectedEvent;
    }
}
