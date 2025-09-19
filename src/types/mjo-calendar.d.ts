export type MjoCalendarMode = "single" | "range" | "multiple";
export type MjoCalendarSize = "small" | "medium" | "large";
export type MjoCalendarColor = "primary" | "secondary";
export type MjoCalendarRangeCalendars = "1" | "2" | "auto";
export type MjoCalendarFirstDayOfWeek = "sunday" | "monday";

export interface MjoCalendarMarker<T = unknown> {
    date: string;
    time?: string;
    backgroundColor?: string;
    foregroundColor?: string;
    tooltip?: string;
    data?: T;
}

export type MjoCalendarHeaderSide = "single" | "left" | "right";

export interface MjoCalendarDateSelectedEvent extends CustomEvent {
    detail: {
        date?: Date;
        value?: string;
    };
}

export interface MjoCalendarRangeSelectedEvent extends CustomEvent {
    detail: {
        startDate?: Date;
        endDate?: Date;
        startDateValue?: string;
        endDateValue?: string;
    };
}

export interface MjoCalendarYearSelectedEvent extends CustomEvent {
    detail: {
        year: number;
    };
}

export interface MjoCalendarMonthSelectedEvent extends CustomEvent {
    detail: {
        month: number;
    };
}

export interface CalendarNavigateEvent extends CustomEvent {
    detail: {
        direction: 1 | -1;
        side: MjoCalendarHeaderSide;
    };
}

export interface CalendarMonthPickerEvent extends CustomEvent {
    detail: {
        side: MjoCalendarHeaderSide;
    };
}

export interface CalendarYearPickerEvent extends CustomEvent {
    detail: {
        side: MjoCalendarHeaderSide;
    };
}

export interface MjoCalendarDayClickEvent extends CustomEvent {
    detail: {
        day: number;
        date: Date;
        events: MjoCalendarMarker[];
    };
}

export interface MjoCalendarDayHoverEvent extends CustomEvent {
    detail: {
        day: number;
        date: Date;
        events: MjoCalendarMarker[];
    };
}

export interface MjoCalendarDayLeaveEvent extends CustomEvent {
    detail: {
        day: number;
        date: Date;
        events: MjoCalendarMarker[];
    };
}

export interface GoToMonthOptions {
    month: number; // 1-12 (1 = January, 12 = December)
    year?: number;
    side?: MjoCalendarHeaderSide;
}

export interface GoToYearOptions {
    year: number;
    side?: MjoCalendarHeaderSide;
}

export interface GoToDateOptions {
    date: Date | string; // Date object or "YYYY-MM-DD" string
    side?: MjoCalendarHeaderSide;
}

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
