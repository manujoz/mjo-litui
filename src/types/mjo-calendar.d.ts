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
export interface MjoCalendarEventMarker {
    date: string;
    hour?: string;
    backgroundColor?: string;
    foregroundColor?: string;
    tooltip?: string;
    className?: string;
}

export type MjoCalendarHeaderSide = "single" | "left" | "right";

/**
 * Options for goToMonth method
 */
export interface GoToMonthOptions {
    month: number; // 1-12 (1 = January, 12 = December)
    year?: number;
    side?: MjoCalendarHeaderSide;
}

/**
 * Options for goToYear method
 */
export interface GoToYearOptions {
    year: number;
    side?: MjoCalendarHeaderSide;
}

/**
 * Options for goToDate method
 */
export interface GoToDateOptions {
    date: Date | string; // Date object or "YYYY-MM-DD" string
    side?: MjoCalendarHeaderSide;
}

/**
 * Calendar navigation events
 */

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

export interface MjoCalendarNavigateEvent extends CustomEvent {
    detail: {
        direction: 1 | -1;
        side: MjoCalendarHeaderSide;
    };
}

export interface MjoCalendarMonthPickerEvent extends CustomEvent {
    detail: {
        side: MjoCalendarHeaderSide;
    };
}

export interface MjoCalendarYearPickerEvent extends CustomEvent {
    detail: {
        side: MjoCalendarHeaderSide;
    };
}

export interface MjoCalendarDateClickEvent extends CustomEvent {
    detail: {
        date: Date;
        formattedDate: string;
        events: MjoCalendarEventMarker[];
    };
}

export interface MjoCalendarDateHoverEvent extends CustomEvent {
    detail: {
        date: Date;
        events: MjoCalendarEventMarker[];
    };
}

export interface MjoCalendarDateLeaveEvent extends CustomEvent {
    detail: null;
}

export interface CalendarDayClickEvent extends CustomEvent {
    detail: {
        day: number;
        date: Date;
        events: MjoCalendarEventMarker[];
    };
}

export interface MjoCalendarDayHoverEvent extends CustomEvent {
    detail: {
        day: number;
        date: Date;
        events: MjoCalendarEventMarker[];
    };
}

export interface MjoCalendarDayLeaveEvent extends CustomEvent {
    detail: {
        day: number;
        date: Date;
        events: MjoCalendarEventMarker[];
    };
}
