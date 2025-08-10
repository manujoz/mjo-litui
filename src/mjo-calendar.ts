/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { FaChevronLeft, FaChevronRight } from "mjo-icons/fa";
import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-button.js";
import "./mjo-icon.js";
import "./mjo-typography.js";

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
    @property({ type: String }) locale: string = "en-US";
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

    private monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    private weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
                ${this.#renderCalendarHeader(this.currentMonth, this.currentYear, "single")}
                ${this.#renderCalendarGrid(this.currentMonth, this.currentYear, "single")}
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
                    ${this.#renderCalendarHeader(this.leftCalendarMonth, this.leftCalendarYear, "left")}
                    ${this.#renderCalendarGrid(this.leftCalendarMonth, this.leftCalendarYear, "left")}
                </div>
                <!-- Right Calendar -->
                <div class="calendar-side">
                    ${this.#renderCalendarHeader(this.rightCalendarMonth, this.rightCalendarYear, "right")}
                    ${this.#renderCalendarGrid(this.rightCalendarMonth, this.rightCalendarYear, "right")}
                </div>
            </div>
        `;
    }

    #renderCalendarHeader(month: number, year: number, side: "single" | "left" | "right") {
        return html`
            <div class="calendar-header" part="header">
                <div class="navigation" part="navigation">
                    ${side === "single" || side === "left"
                        ? html`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${FaChevronLeft}
                                  @click=${() => this.#navigateMonth(-1, side)}
                                  ?disabled=${this.disabled}
                              ></mjo-button>
                          `
                        : nothing}

                    <div class="month-year-selectors" part="month-year">
                        <mjo-button variant="text" @click=${() => this.#showMonthPicker(side)} ?disabled=${this.disabled}>
                            <mjo-typography tag="none">${this.monthNames[month]}</mjo-typography>
                        </mjo-button>
                        <mjo-button variant="text" @click=${() => this.#showYearPicker(side)} ?disabled=${this.disabled}>
                            <mjo-typography tag="none">${year}</mjo-typography>
                        </mjo-button>
                    </div>

                    ${side === "single" || side === "right"
                        ? html`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${FaChevronRight}
                                  @click=${() => this.#navigateMonth(1, side)}
                                  ?disabled=${this.disabled}
                              ></mjo-button>
                          `
                        : nothing}
                </div>
            </div>
        `;
    }

    #renderCalendarGrid(month: number, year: number, _side: "single" | "left" | "right") {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = this.firstDayOfWeek === "monday" ? (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1) : firstDay.getDay();

        const daysInMonth = lastDay.getDate();
        const today = new Date();

        // Adjust week days based on first day of week preference
        const weekDaysAdjusted = this.firstDayOfWeek === "monday" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : this.weekDays;

        const days = [];

        // Empty cells for days before month starts
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(html`<div class="day empty"></div>`);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = this.#isSameDay(date, today);
            const isSelected = this.#isSelectedDate(date);
            const isInRange = this.mode === "range" && this.#isInRange(date);
            const isRangeStart = this.mode === "range" && this.#isRangeStart(date);
            const isRangeEnd = this.mode === "range" && this.#isRangeEnd(date);
            const isDisabled = this.#isDisabledDate(date);
            const isHovered = this.mode === "range" && this.#isHoveredInRange(date);

            const dayClasses = {
                day: true,
                today: isToday && this.showToday,
                selected: isSelected,
                "in-range": isInRange,
                "range-start": isRangeStart,
                "range-end": isRangeEnd,
                disabled: isDisabled,
                "hovered-range": isHovered,
            };

            days.push(html`
                <div
                    class=${classMap(dayClasses)}
                    part="day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}"
                    @click=${() => this.#selectDate(date)}
                    @mouseenter=${() => this.#handleDateHover(date)}
                    @mouseleave=${() => this.#handleDateLeave()}
                >
                    <mjo-typography tag="none">${day}</mjo-typography>
                </div>
            `);
        }

        return html`
            <div class="calendar-grid" part="calendar-grid">
                <!-- Week day headers -->
                <div class="week-header">
                    ${weekDaysAdjusted.map(
                        (day) => html`
                            <div class="week-day">
                                <mjo-typography tag="none" size="small">${day}</mjo-typography>
                            </div>
                        `,
                    )}
                </div>
                <!-- Days grid -->
                <div class="days-grid">${days}</div>
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
                this.leftCalendarYear--;
            }
        }
    }

    #selectDate(date: Date) {
        if (this.#isDisabledDate(date)) return;

        if (this.mode === "single") {
            this.selectedDate = date;
            this.value = this.#formatDate(date);
            this.#updateFormData();
            this.#dispatchDateSelected();
        } else if (this.mode === "range") {
            if (!this.selectedStartDate || (this.selectedStartDate && this.selectedEndDate)) {
                // Start new range
                this.selectedStartDate = date;
                this.selectedEndDate = undefined;
                this.startDate = this.#formatDate(date);
                this.endDate = undefined;
            } else if (this.selectedStartDate && !this.selectedEndDate) {
                // Complete range
                if (date < this.selectedStartDate) {
                    // Swap if end date is before start date
                    this.selectedEndDate = this.selectedStartDate;
                    this.selectedStartDate = date;
                    this.endDate = this.#formatDate(this.selectedEndDate);
                    this.startDate = this.#formatDate(this.selectedStartDate);
                } else {
                    this.selectedEndDate = date;
                    this.endDate = this.#formatDate(date);
                }
                this.#updateFormData();
                this.#dispatchRangeSelected();
            }
        }
    }

    #handleDateHover(date: Date) {
        if (this.mode === "range" && this.selectedStartDate && !this.selectedEndDate) {
            this.hoverDate = date;
        }
    }

    #handleDateLeave() {
        this.hoverDate = undefined;
    }

    #showMonthPicker(_side: "single" | "left" | "right") {
        // TODO: Implement month picker modal
    }

    #showYearPicker(_side: "single" | "left" | "right") {
        // TODO: Implement year picker modal
    }

    #isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    }

    #isSelectedDate(date: Date): boolean {
        if (this.mode === "single" && this.selectedDate) {
            return this.#isSameDay(date, this.selectedDate);
        }
        return false;
    }

    #isInRange(date: Date): boolean {
        if (!this.selectedStartDate || !this.selectedEndDate) return false;
        return date > this.selectedStartDate && date < this.selectedEndDate;
    }

    #isRangeStart(date: Date): boolean {
        if (!this.selectedStartDate) return false;
        return this.#isSameDay(date, this.selectedStartDate);
    }

    #isRangeEnd(date: Date): boolean {
        if (!this.selectedEndDate) return false;
        return this.#isSameDay(date, this.selectedEndDate);
    }

    #isHoveredInRange(date: Date): boolean {
        if (!this.selectedStartDate || !this.hoverDate || this.selectedEndDate) return false;
        const start = this.selectedStartDate;
        const end = this.hoverDate;
        if (end < start) {
            return date > end && date < start;
        }
        return date > start && date < end;
    }

    #isDisabledDate(date: Date): boolean {
        if (this.disabled) return true;

        if (this.minDate) {
            const minDate = new Date(this.minDate);
            if (date < minDate) return true;
        }

        if (this.maxDate) {
            const maxDate = new Date(this.maxDate);
            if (date > maxDate) return true;
        }

        if (this.disabledDates) {
            const dateStr = this.#formatDate(date);
            return this.disabledDates.includes(dateStr);
        }

        return false;
    }

    #formatDate(date: Date): string {
        return date.toISOString().split("T")[0]; // YYYY-MM-DD format
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
                    formattedDate: this.selectedDate?.toLocaleDateString(this.locale),
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
                    formattedStartDate: this.selectedStartDate?.toLocaleDateString(this.locale),
                    formattedEndDate: this.selectedEndDate?.toLocaleDateString(this.locale),
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

            .calendar-header {
                margin-bottom: 16px;
            }

            .navigation {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
            }

            .month-year-selectors {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .calendar-grid {
                width: 100%;
            }

            .week-header {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 2px;
                margin-bottom: 8px;
            }

            .week-day {
                text-align: center;
                padding: 8px 4px;
                color: var(--mjo-calendar-week-day-color, var(--mjo-text-color-secondary, #666));
                font-weight: var(--mjo-calendar-week-day-font-weight, 600);
            }

            .days-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 2px;
            }

            .day {
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border-radius: var(--mjo-calendar-day-border-radius, 4px);
                transition: all 0.2s ease;
                position: relative;
                min-height: 32px;
            }

            .day.empty {
                cursor: default;
                pointer-events: none;
            }

            .day:not(.empty):not(.disabled):hover {
                background: var(--mjo-calendar-day-hover-background, var(--mjo-background-color-high, #f5f5f5));
            }

            .day.today {
                background: var(--mjo-calendar-today-background, var(--mjo-primary-color-alpha2, rgba(29, 127, 219, 0.1)));
                color: var(--mjo-calendar-today-color, var(--mjo-primary-color, #1d7fdb));
                font-weight: 600;
            }

            .day.selected {
                background: var(--mjo-calendar-selected-background, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-calendar-selected-color, white);
                font-weight: 600;
            }

            .day.range-start,
            .day.range-end {
                background: var(--mjo-calendar-range-endpoint-background, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-calendar-range-endpoint-color, white);
                font-weight: 600;
            }

            .day.in-range,
            .day.hovered-range {
                background: var(--mjo-calendar-range-background, var(--mjo-primary-color-alpha1, rgba(29, 127, 219, 0.2)));
                color: var(--mjo-calendar-range-color, var(--mjo-primary-color, #1d7fdb));
            }

            .day.disabled {
                color: var(--mjo-calendar-disabled-color, var(--mjo-disabled-foreground-color, #aaa));
                cursor: not-allowed;
                background: var(--mjo-calendar-disabled-background, transparent);
            }

            .day.disabled:hover {
                background: var(--mjo-calendar-disabled-background, transparent);
            }

            /* Size variations */
            [data-size="small"] {
                font-size: 0.875rem;
            }

            [data-size="small"] .day {
                min-height: 28px;
            }

            [data-size="large"] {
                font-size: 1.125rem;
            }

            [data-size="large"] .day {
                min-height: 40px;
            }

            /* Color variations */
            [data-color="secondary"] .day.today {
                background: var(--mjo-calendar-today-background-secondary, var(--mjo-secondary-color-alpha2, rgba(204, 61, 116, 0.1)));
                color: var(--mjo-calendar-today-color-secondary, var(--mjo-secondary-color, #cc3d74));
            }

            [data-color="secondary"] .day.selected,
            [data-color="secondary"] .day.range-start,
            [data-color="secondary"] .day.range-end {
                background: var(--mjo-calendar-selected-background-secondary, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-calendar-selected-color-secondary, white);
            }

            [data-color="secondary"] .day.in-range,
            [data-color="secondary"] .day.hovered-range {
                background: var(--mjo-calendar-range-background-secondary, var(--mjo-secondary-color-alpha1, rgba(204, 61, 116, 0.2)));
                color: var(--mjo-calendar-range-color-secondary, var(--mjo-secondary-color, #cc3d74));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-calendar": MjoCalendar;
    }
}
