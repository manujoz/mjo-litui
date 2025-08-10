import { SupportedLocale } from "./types/locales.js";

import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { locales } from "./locales/locales.js";
import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { CalendarUtils } from "./utils/calendar.js";

import "./components/calendar/calendar-grid.js";
import "./components/calendar/calendar-header.js";
import "./components/calendar/calendar-month-picker.js";
import "./components/calendar/calendar-year-picker.js";

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

    @state() private currentMonth = new Date().getMonth();
    @state() private currentYear = new Date().getFullYear();
    @state() private selectedDate?: Date;
    @state() private selectedStartDate?: Date;
    @state() private selectedEndDate?: Date;
    @state() private hoverDate?: Date;
    @state() private leftCalendarMonth = new Date().getMonth();
    @state() private leftCalendarYear = new Date().getFullYear();
    @state() private rightCalendarMonth = new Date().getMonth() + 1;
    @state() private rightCalendarYear = new Date().getFullYear();
    @state() private showMonthPicker = false;
    @state() private showYearPicker = false;
    @state() private pickerSide: "single" | "left" | "right" = "single";

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
    }

    render() {
        if (this.mode === "range") {
            return this.#renderRangeCalendar();
        }
        return this.#renderSingleCalendar();
    }

    #renderSingleCalendar() {
        return html`
            <div class="calendar-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${this.showMonthPicker
                    ? html`
                          <calendar-month-picker
                              .selectedMonth=${this.currentMonth}
                              .monthNames=${this.monthNames}
                              .disabled=${this.disabled}
                              @month-selected=${this.#handleMonthSelected}
                              @click=${(e: Event) => e.stopPropagation()}
                          ></calendar-month-picker>
                      `
                    : this.showYearPicker
                      ? html`
                            <calendar-year-picker
                                .selectedYear=${this.currentYear}
                                .disabled=${this.disabled}
                                @year-selected=${this.#handleYearSelected}
                                @click=${(e: Event) => e.stopPropagation()}
                            ></calendar-year-picker>
                        `
                      : html`
                            <calendar-header
                                .month=${this.currentMonth}
                                .year=${this.currentYear}
                                .monthNames=${this.monthNames}
                                .disabled=${this.disabled}
                                side="single"
                                @navigate=${this.#handleNavigate}
                                @month-picker=${this.#handleMonthPicker}
                                @year-picker=${this.#handleYearPicker}
                            ></calendar-header>
                            <calendar-grid
                                .month=${this.currentMonth}
                                .year=${this.currentYear}
                                .weekDays=${this.weekDays}
                                .firstDayOfWeek=${this.firstDayOfWeek}
                                .mode=${this.mode}
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
                                side="single"
                                @date-click=${this.#handleDateClick}
                                @date-hover=${this.#handleDateHover}
                                @date-leave=${this.#handleDateLeave}
                            ></calendar-grid>
                        `}
                ${this.showMonthPicker || this.showYearPicker
                    ? html`
                          <div class="picker-overlay" @click=${this.#handlePickerClose}>
                              <div class="picker-backdrop"></div>
                          </div>
                      `
                    : ""}
            </div>
        `;
    }

    #renderRangeCalendar() {
        // Adjust right calendar if needed
        if (this.rightCalendarYear === this.leftCalendarYear && this.rightCalendarMonth === this.leftCalendarMonth) {
            if (this.rightCalendarMonth === 11) {
                this.rightCalendarMonth = 0;
                this.rightCalendarYear++;
            } else {
                this.rightCalendarMonth++;
            }
        }

        return html`
            <div class="calendar-range-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                <!-- Left Calendar -->
                <div class="calendar-side">
                    ${this.showMonthPicker && this.pickerSide === "left"
                        ? html`
                              <calendar-month-picker
                                  .selectedMonth=${this.leftCalendarMonth}
                                  .monthNames=${this.monthNames}
                                  .disabled=${this.disabled}
                                  @month-selected=${this.#handleMonthSelected}
                                  @click=${(e: Event) => e.stopPropagation()}
                              ></calendar-month-picker>
                          `
                        : this.showYearPicker && this.pickerSide === "left"
                          ? html`
                                <calendar-year-picker
                                    .selectedYear=${this.leftCalendarYear}
                                    .disabled=${this.disabled}
                                    @year-selected=${this.#handleYearSelected}
                                    @click=${(e: Event) => e.stopPropagation()}
                                ></calendar-year-picker>
                            `
                          : html`
                                <calendar-header
                                    .month=${this.leftCalendarMonth}
                                    .year=${this.leftCalendarYear}
                                    .monthNames=${this.monthNames}
                                    .disabled=${this.disabled}
                                    side="left"
                                    @navigate=${this.#handleNavigate}
                                    @month-picker=${this.#handleMonthPicker}
                                    @year-picker=${this.#handleYearPicker}
                                ></calendar-header>
                                <calendar-grid
                                    .month=${this.leftCalendarMonth}
                                    .year=${this.leftCalendarYear}
                                    .weekDays=${this.weekDays}
                                    .firstDayOfWeek=${this.firstDayOfWeek}
                                    .mode=${this.mode}
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
                                    side="left"
                                    @date-click=${this.#handleDateClick}
                                    @date-hover=${this.#handleDateHover}
                                    @date-leave=${this.#handleDateLeave}
                                ></calendar-grid>
                            `}
                </div>
                <!-- Right Calendar -->
                <div class="calendar-side">
                    ${this.showMonthPicker && this.pickerSide === "right"
                        ? html`
                              <calendar-month-picker
                                  .selectedMonth=${this.rightCalendarMonth}
                                  .monthNames=${this.monthNames}
                                  .disabled=${this.disabled}
                                  @month-selected=${this.#handleMonthSelected}
                                  @click=${(e: Event) => e.stopPropagation()}
                              ></calendar-month-picker>
                          `
                        : this.showYearPicker && this.pickerSide === "right"
                          ? html`
                                <calendar-year-picker
                                    .selectedYear=${this.rightCalendarYear}
                                    .disabled=${this.disabled}
                                    @year-selected=${this.#handleYearSelected}
                                    @click=${(e: Event) => e.stopPropagation()}
                                ></calendar-year-picker>
                            `
                          : html`
                                <calendar-header
                                    .month=${this.rightCalendarMonth}
                                    .year=${this.rightCalendarYear}
                                    .monthNames=${this.monthNames}
                                    .disabled=${this.disabled}
                                    side="right"
                                    @navigate=${this.#handleNavigate}
                                    @month-picker=${this.#handleMonthPicker}
                                    @year-picker=${this.#handleYearPicker}
                                ></calendar-header>
                                <calendar-grid
                                    .month=${this.rightCalendarMonth}
                                    .year=${this.rightCalendarYear}
                                    .weekDays=${this.weekDays}
                                    .firstDayOfWeek=${this.firstDayOfWeek}
                                    .mode=${this.mode}
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
                                    side="right"
                                    @date-click=${this.#handleDateClick}
                                    @date-hover=${this.#handleDateHover}
                                    @date-leave=${this.#handleDateLeave}
                                ></calendar-grid>
                            `}
                </div>
                ${this.showMonthPicker || this.showYearPicker
                    ? html`
                          <div class="picker-overlay" @click=${this.#handlePickerClose}>
                              <div class="picker-backdrop"></div>
                          </div>
                      `
                    : ""}
            </div>
        `;
    }

    #initializeDates() {
        if (this.value && this.mode === "single") {
            this.selectedDate = new Date(this.value);
            this.currentMonth = this.selectedDate.getMonth();
            this.currentYear = this.selectedDate.getFullYear();
        } else if (this.startDate && this.mode === "range") {
            this.selectedStartDate = new Date(this.startDate);
            this.leftCalendarMonth = this.selectedStartDate.getMonth();
            this.leftCalendarYear = this.selectedStartDate.getFullYear();

            if (this.endDate) {
                this.selectedEndDate = new Date(this.endDate);
            }
        }
    }

    #handleNavigate(event: CustomEvent) {
        const { direction, side } = event.detail;
        this.#navigateMonth(direction, side);
    }

    #handleMonthPicker(event: CustomEvent) {
        const { side } = event.detail;
        this.pickerSide = side;
        this.showMonthPicker = true;
        this.showYearPicker = false;
    }

    #handleYearPicker(event: CustomEvent) {
        const { side } = event.detail;
        this.pickerSide = side;
        this.showYearPicker = true;
        this.showMonthPicker = false;
    }

    #handleDateClick(event: CustomEvent) {
        const { date } = event.detail;
        this.#selectDate(date);
    }

    #handleDateHover(event: CustomEvent) {
        const { date } = event.detail;
        if (this.mode === "range" && this.selectedStartDate && !this.selectedEndDate) {
            this.hoverDate = date;
        }
    }

    #handleDateLeave() {
        this.hoverDate = undefined;
    }

    #handleMonthSelected(event: CustomEvent) {
        const { month } = event.detail;
        this.#setMonth(month, this.pickerSide);
        this.showMonthPicker = false;
    }

    #handleYearSelected(event: CustomEvent) {
        const { year } = event.detail;
        this.#setYear(year, this.pickerSide);
        this.showYearPicker = false;
    }

    #handlePickerClose() {
        this.showMonthPicker = false;
        this.showYearPicker = false;
    }

    #navigateMonth(direction: number, side: "single" | "left" | "right") {
        if (side === "single") {
            this.currentMonth += direction;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
        } else if (side === "left") {
            this.leftCalendarMonth += direction;
            if (this.leftCalendarMonth > 11) {
                this.leftCalendarMonth = 0;
                this.leftCalendarYear++;
            } else if (this.leftCalendarMonth < 0) {
                this.leftCalendarMonth = 11;
                this.leftCalendarYear--;
            }
            // Adjust right calendar to be one month ahead
            this.rightCalendarMonth = this.leftCalendarMonth + 1;
            this.rightCalendarYear = this.leftCalendarYear;
            if (this.rightCalendarMonth > 11) {
                this.rightCalendarMonth = 0;
                this.rightCalendarYear++;
            }
        } else if (side === "right") {
            this.rightCalendarMonth += direction;
            if (this.rightCalendarMonth > 11) {
                this.rightCalendarMonth = 0;
                this.rightCalendarYear++;
            } else if (this.rightCalendarMonth < 0) {
                this.rightCalendarMonth = 11;
                this.rightCalendarYear--;
            }
            // Adjust left calendar to be one month behind
            this.leftCalendarMonth = this.rightCalendarMonth - 1;
            this.leftCalendarYear = this.rightCalendarYear;
            if (this.leftCalendarMonth < 0) {
                this.leftCalendarMonth = 11;
            }
        }
    }

    #setMonth(month: number, side: "single" | "left" | "right") {
        if (side === "single") {
            this.currentMonth = month;
        } else if (side === "left") {
            this.leftCalendarMonth = month;
            // Adjust right calendar to be one month ahead
            this.rightCalendarMonth = this.leftCalendarMonth + 1;
            this.rightCalendarYear = this.leftCalendarYear;
            if (this.rightCalendarMonth > 11) {
                this.rightCalendarMonth = 0;
                this.rightCalendarYear++;
            }
        } else if (side === "right") {
            this.rightCalendarMonth = month;
            // Adjust left calendar to be one month behind
            this.leftCalendarMonth = this.rightCalendarMonth - 1;
            this.leftCalendarYear = this.rightCalendarYear;
            if (this.leftCalendarMonth < 0) {
                this.leftCalendarMonth = 11;
                this.leftCalendarYear--;
            }
        }
    }

    #setYear(year: number, side: "single" | "left" | "right") {
        if (side === "single") {
            this.currentYear = year;
        } else if (side === "left") {
            this.leftCalendarYear = year;
            // Adjust right calendar to maintain month difference
            this.rightCalendarMonth = this.leftCalendarMonth + 1;
            this.rightCalendarYear = this.leftCalendarYear;
            if (this.rightCalendarMonth > 11) {
                this.rightCalendarMonth = 0;
                this.rightCalendarYear++;
            }
        } else if (side === "right") {
            this.rightCalendarYear = year;
            // Adjust left calendar to maintain month difference
            this.leftCalendarMonth = this.rightCalendarMonth - 1;
            this.leftCalendarYear = this.rightCalendarYear;
            if (this.leftCalendarMonth < 0) {
                this.leftCalendarMonth = 11;
                this.leftCalendarYear--;
            }
        }
    }

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
        this.dispatchEvent(
            new CustomEvent("date-selected", {
                detail: {
                    date: this.value,
                    formattedDate: this.selectedDate?.toLocaleDateString(CalendarUtils.getDateLocale(this.locale)),
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #dispatchRangeSelected() {
        this.dispatchEvent(
            new CustomEvent("range-selected", {
                detail: {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    formattedStartDate: this.selectedStartDate?.toLocaleDateString(CalendarUtils.getDateLocale(this.locale)),
                    formattedEndDate: this.selectedEndDate?.toLocaleDateString(CalendarUtils.getDateLocale(this.locale)),
                },
                bubbles: true,
                composed: true,
            }),
        );
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
                background: var(--mjo-calendar-background, var(--mjo-background-color, white));
                border: var(--mjo-calendar-border, 1px solid var(--mjo-border-color, #e0e0e0));
                border-radius: var(--mjo-calendar-border-radius, var(--mjo-radius, 8px));
                box-shadow: var(--mjo-calendar-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
                padding: var(--mjo-calendar-padding, 16px);
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
                position: relative;
                z-index: 10;
                background: var(--mjo-calendar-picker-background, var(--mjo-background-color, white));
                border: var(--mjo-calendar-picker-border, 1px solid var(--mjo-border-color, #e0e0e0));
                border-radius: var(--mjo-calendar-picker-radius, var(--mjo-radius, 8px));
                box-shadow: var(--mjo-calendar-picker-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
            }

            /* Size variations */
            [data-size="small"] {
                font-size: 0.875rem;
            }

            [data-size="large"] {
                font-size: 1.125rem;
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
