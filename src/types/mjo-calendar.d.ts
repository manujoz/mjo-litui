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

export interface CalendarDateSelectedEvent {
    date: string;
    formattedDate: string;
}

export interface CalendarRangeSelectedEvent {
    startDate: string;
    endDate: string;
    formattedStartDate: string;
    formattedEndDate: string;
}

declare global {
    interface HTMLElementEventMap {
        "date-selected": CustomEvent<CalendarDateSelectedEvent>;
        "range-selected": CustomEvent<CalendarRangeSelectedEvent>;
    }
}
