export interface CalendarLocale {
    months: string[];
    monthsShort: string[];
    weekdays: string[];
    weekdaysShort: string[];
    weekdaysMin: string[];
}

export interface CalendarDateInfo {
    date: Date;
    isToday: boolean;
    isSelected: boolean;
    isInRange: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isDisabled: boolean;
    isHovered: boolean;
    hasEvents?: boolean;
    tooltip?: string;
}

// Calendar component types
export type MjoCalendarMode = "single" | "range" | "multiple";
export type MjoCalendarSize = "small" | "medium" | "large";
export type MjoCalendarColor = "primary" | "secondary";
export type MjoCalendarRangeCalendars = "1" | "2" | "auto";
export type MjoCalendarFirstDayOfWeek = "sunday" | "monday";

// Calendar event marker interface
export interface CalendarEventMarker {
    date: string; // ISO date string
    color?: string;
    tooltip?: string;
    className?: string;
}

export type CalendarHeaderSide = "single" | "left" | "right";

export interface CalendarDateSelectedEvent extends CustomEvent {
    detail: {
        date?: Date;
        value?: string;
    };
}

export interface CalendarRangeSelectedEvent extends CustomEvent {
    detail: {
        startDate?: Date;
        endDate?: Date;
        startDateValue?: string;
        endDateValue?: string;
    };
}

export interface CalendarYearSelectedEvent extends CustomEvent {
    detail: {
        year: number;
    };
}

export interface CalendarMonthSelectedEvent extends CustomEvent {
    detail: {
        month: number;
    };
}

export interface CalendarNavigateEvent extends CustomEvent {
    detail: {
        direction: 1 | -1;
        side: CalendarHeaderSide;
    };
}

export interface CalendarMonthPickerEvent extends CustomEvent {
    detail: {
        side: CalendarHeaderSide;
    };
}

export interface CalendarYearPickerEvent extends CustomEvent {
    detail: {
        side: CalendarHeaderSide;
    };
}

export interface CalendarDateClickEvent extends CustomEvent {
    detail: {
        date: Date;
        formattedDate: string;
    };
}

export interface CalendarDateHoverEvent extends CustomEvent {
    detail: {
        date: Date;
    };
}

export interface CalendarDateLeaveEvent extends CustomEvent {
    detail: null;
}

export interface CalendarDayClickEvent extends CustomEvent {
    detail: {
        day: number;
    };
}

export interface CalendarDayHoverEvent extends CustomEvent {
    detail: {
        day: number;
    };
}

export interface CalendarDayLeaveEvent extends CustomEvent {
    detail: {
        day: number;
    };
}

declare global {
    interface HTMLElementEventMap {
        "date-selected": CalendarDateSelectedEvent;
        "range-selected": CalendarRangeSelectedEvent;
    }
}
