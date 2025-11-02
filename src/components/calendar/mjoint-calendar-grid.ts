import type { MjoCalendarMarker } from "../../types/mjo-calendar.js";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { CalendarUtils } from "../../utils/calendar.js";

import "../../mjo-typography.js";
import "./mjoint-calendar-day.js";

/**
 * Calendar grid component that renders the days of a month
 */
@customElement("mjoint-calendar-grid")
export class MjointCalendarGrid extends LitElement {
    @property({ type: Number }) month!: number;
    @property({ type: Number }) year!: number;
    @property({ type: String }) side: "single" | "left" | "right" = "single";
    @property({ type: Array }) weekDays!: string[];
    @property({ type: String }) firstDayOfWeek: "sunday" | "monday" = "monday";
    @property({ type: String }) mode: "single" | "range" = "single";
    @property({ type: Boolean }) showToday = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) compact = false;
    @property({ type: String }) minDate: string = "";
    @property({ type: String }) maxDate: string = "";
    @property({ type: Array }) disabledDates?: string[];

    // Selection states
    @property({ type: Object }) selectedDate?: Date;
    @property({ type: Object }) selectedStartDate?: Date;
    @property({ type: Object }) selectedEndDate?: Date;
    @property({ type: Object }) hoverDate?: Date;
    @property({ type: Object }) focusedDate?: Date;

    // Events map for event markers
    @property({ type: Object }) eventsMap = new Map<string, MjoCalendarMarker[]>();

    render() {
        const firstDay = new Date(this.year, this.month, 1);
        const lastDay = new Date(this.year, this.month + 1, 0);
        const firstDayOfWeek = this.firstDayOfWeek === "monday" ? (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1) : firstDay.getDay();

        const daysInMonth = lastDay.getDate();
        const today = new Date();

        // Validate weekDays array before using
        const safeWeekDays =
            this.weekDays && Array.isArray(this.weekDays) && this.weekDays.length >= 7 ? this.weekDays : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Adjust week days based on first day of week preference
        const weekDaysAdjusted =
            this.firstDayOfWeek === "monday"
                ? [safeWeekDays[1], safeWeekDays[2], safeWeekDays[3], safeWeekDays[4], safeWeekDays[5], safeWeekDays[6], safeWeekDays[0]]
                : safeWeekDays;

        const days = [];

        // Empty cells for days before month starts
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(html`<mjoint-calendar-day isEmpty .size=${this.size}></mjoint-calendar-day>`);
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
            const dayEvents = this.#getEventsForDate(date);

            days.push(html`
                <mjoint-calendar-day
                    day=${day}
                    exportparts="day,day-selected,day-today,event-indicator,event-indicator-single,event-indicator-multiple"
                    month=${this.month}
                    year=${this.year}
                    ?isToday=${isToday}
                    ?isSelected=${isSelected}
                    ?isInRange=${isInRange}
                    ?isRangeStart=${isRangeStart}
                    ?isRangeEnd=${isRangeEnd}
                    ?isDisabled=${isDisabled}
                    ?isHovered=${isHovered}
                    ?isFocused=${this.#isFocusedDate(date)}
                    ?showToday=${this.showToday}
                    size=${this.size}
                    .dayEvents=${dayEvents}
                ></mjoint-calendar-day>
            `);
        }

        return html`
            <div class="calendar-grid" part="calendar-grid" role="grid" aria-label=${this.#gridLabel}>
                <!-- Week day headers -->
                <div class="week-header" part="week-days-container" role="row">
                    ${weekDaysAdjusted.map(
                        (day) => html`
                            <div class="week-day" role="columnheader" part="week-day">
                                <mjo-typography tag="none" size="body1">${!this.compact ? day : day.substring(0, 1)}</mjo-typography>
                            </div>
                        `,
                    )}
                </div>
                <!-- Days grid -->
                <div class="days-grid" part="days-container">${days}</div>
            </div>
        `;
    }

    get #gridLabel() {
        return `Calendar grid for ${this.year}-${String(this.month + 1).padStart(2, "0")}`;
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

    #isFocusedDate(date: Date): boolean {
        if (!this.focusedDate) return false;
        return CalendarUtils.isSameDay(date, this.focusedDate);
    }

    /**
     * Get all events for a specific date
     */
    #getEventsForDate(date: Date): MjoCalendarMarker[] {
        const dateStr = CalendarUtils.formatDate(date);
        return this.eventsMap.get(dateStr) || [];
    }

    static styles = css`
        .calendar-grid {
            width: 100%;
            user-select: none;
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
            justify-self: center;
            padding: 8px 4px;
            color: var(--mjo-calendar-week-day-color, var(--mjoint-calendar-color-foreground-low));
            font-weight: var(--mjo-calendar-week-day-font-weight, 600);
            box-sizing: border-box;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-calendar-grid": MjointCalendarGrid;
    }
}
