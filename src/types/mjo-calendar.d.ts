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
}

export interface MjoCalendarTheme {
    fontFamily?: string;
    background?: string;
    border?: string;
    borderRadius?: string;
    shadow?: string;
    padding?: string;
    weekDayColor?: string;
    weekDayFontWeight?: string;
    dayBorderRadius?: string;
    dayHoverBackground?: string;
    todayBackground?: string;
    todayColor?: string;
    selectedBackground?: string;
    selectedColor?: string;
    rangeEndpointBackground?: string;
    rangeEndpointColor?: string;
    rangeBackground?: string;
    rangeColor?: string;
    disabledColor?: string;
    disabledBackground?: string;
    todayBackgroundSecondary?: string;
    todayColorSecondary?: string;
    selectedBackgroundSecondary?: string;
    selectedColorSecondary?: string;
    rangeBackgroundSecondary?: string;
    rangeColorSecondary?: string;
}

export type CalendarHeaderSide = "single" | "left" | "right";

export interface CalendarDateSelectedEvent extends CustomEvent {
    detail: {
        date?: string;
        formattedDate?: string;
    };
}

export interface CalendarRangeSelectedEvent extends CustomEvent {
    detail: {
        startDate?: string;
        endDate?: string;
        formattedStartDate?: string;
        formattedEndDate?: string;
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
        "date-selected": CustomEvent<CalendarDateSelectedEvent>;
        "range-selected": CustomEvent<CalendarRangeSelectedEvent>;
    }
}
