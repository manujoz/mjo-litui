import { CalendarDayClickEvent, CalendarDayHoverEvent } from "../../types/mjo-calendar.js";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { CalendarUtils } from "../../utils/calendar.js";

import "../../mjo-typography.js";
import "./calendar-day.js";

/**
 * Calendar grid component that renders the days of a month
 */
@customElement("calendar-grid")
export class CalendarGrid extends LitElement {
    @property({ type: Number }) month!: number;
    @property({ type: Number }) year!: number;
    @property({ type: String }) side: "single" | "left" | "right" = "single";
    @property({ type: Array }) weekDays!: string[];
    @property({ type: String }) firstDayOfWeek: "sunday" | "monday" = "monday";
    @property({ type: String }) mode: "single" | "range" = "single";
    @property({ type: Boolean }) showToday = true;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) minDate?: string;
    @property({ type: String }) maxDate?: string;
    @property({ type: Array }) disabledDates?: string[];

    // Selection states
    @property({ type: Object }) selectedDate?: Date;
    @property({ type: Object }) selectedStartDate?: Date;
    @property({ type: Object }) selectedEndDate?: Date;
    @property({ type: Object }) hoverDate?: Date;

    render() {
        const firstDay = new Date(this.year, this.month, 1);
        const lastDay = new Date(this.year, this.month + 1, 0);
        const firstDayOfWeek = this.firstDayOfWeek === "monday" ? (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1) : firstDay.getDay();

        const daysInMonth = lastDay.getDate();
        const today = new Date();

        // Adjust week days based on first day of week preference
        const weekDaysAdjusted =
            this.firstDayOfWeek === "monday"
                ? [this.weekDays[1], this.weekDays[2], this.weekDays[3], this.weekDays[4], this.weekDays[5], this.weekDays[6], this.weekDays[0]]
                : this.weekDays;

        const days = [];

        // Empty cells for days before month starts
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(html`<calendar-day isEmpty .size=${this.size}></calendar-day>`);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.year, this.month, day);
            const isToday = CalendarUtils.isSameDay(date, today);
            const isSelected = this.#isSelectedDate(date);
            const isInRange = this.mode === "range" && this.#isInRange(date);
            const isRangeStart = this.mode === "range" && this.#isRangeStart(date);
            const isRangeEnd = this.mode === "range" && this.#isRangeEnd(date);
            const isDisabled = CalendarUtils.isDateDisabled(date, this.disabled, this.minDate, this.maxDate, this.disabledDates);
            const isHovered = this.mode === "range" && this.#isHoveredInRange(date);

            days.push(html`
                <calendar-day
                    .day=${day}
                    .isToday=${isToday}
                    .isSelected=${isSelected}
                    .isInRange=${isInRange}
                    .isRangeStart=${isRangeStart}
                    .isRangeEnd=${isRangeEnd}
                    .isDisabled=${isDisabled}
                    .isHovered=${isHovered}
                    .showToday=${this.showToday}
                    .size=${this.size}
                    @day-click=${this.#handleDayClick}
                    @day-hover=${this.#handleDayHover}
                    @day-leave=${this.#handleDayLeave}
                ></calendar-day>
            `);
        }

        return html`
            <div class="calendar-grid" part="calendar-grid">
                <!-- Week day headers -->
                <div class="week-header">
                    ${weekDaysAdjusted.map(
                        (day) => html`
                            <div class="week-day">
                                <mjo-typography tag="none" size="body1">${day}</mjo-typography>
                            </div>
                        `,
                    )}
                </div>
                <!-- Days grid -->
                <div class="days-grid">${days}</div>
            </div>
        `;
    }

    #handleDayClick(event: CalendarDayClickEvent) {
        const day = event.detail.day;
        const date = new Date(this.year, this.month, day);

        this.dispatchEvent(
            new CustomEvent("date-click", {
                detail: { date, formattedDate: CalendarUtils.formatDate(date) },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleDayHover(event: CalendarDayHoverEvent) {
        const day = event.detail.day;
        const date = new Date(this.year, this.month, day);

        this.dispatchEvent(
            new CustomEvent("date-hover", {
                detail: { date },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleDayLeave() {
        this.dispatchEvent(
            new CustomEvent("date-leave", {
                bubbles: true,
                composed: true,
            }),
        );
    }

    #isSelectedDate(date: Date): boolean {
        if (this.mode === "single" && this.selectedDate) {
            return CalendarUtils.isSameDay(date, this.selectedDate);
        }

        return false;
    }

    #isInRange(date: Date): boolean {
        if (!this.selectedStartDate || !this.selectedEndDate) return false;

        return date > this.selectedStartDate && date < this.selectedEndDate;
    }

    #isRangeStart(date: Date): boolean {
        if (!this.selectedStartDate) return false;

        return CalendarUtils.isSameDay(date, this.selectedStartDate);
    }

    #isRangeEnd(date: Date): boolean {
        if (!this.selectedEndDate) return false;

        return CalendarUtils.isSameDay(date, this.selectedEndDate);
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

    static styles = css`
        .calendar-grid {
            width: 100%;
        }

        .week-header,
        .days-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
        }
        .week-header {
            margin-bottom: 8px;
        }

        .week-day {
            text-align: center;
            padding: 8px 4px;
            color: var(--mjo-calendar-week-day-color, var(--mjo-foreground-color-xlow, #666));
            font-weight: var(--mjo-calendar-week-day-font-weight, 600);
            box-sizing: border-box;
            width: 3em;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "calendar-grid": CalendarGrid;
    }
}
