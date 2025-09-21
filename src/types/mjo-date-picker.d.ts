export type MjoDatePickerDisplayMode = "iso" | "localized" | "numeric";
export type MjoDatePickerAriaLive = "polite" | "assertive" | "off";

export interface DatePickerDateSelectedEvent extends CustomEvent {
    detail: {
        value?: string;
        date?: Date;
        startDate?: Date;
        endDate?: Date;
        startDateValue?: string;
        endDateValue?: string;
    };
}

export interface DatePickerChangeEvent extends DatePickerDateSelectedEvent {}

export interface DatePickerAccessibilityConfig {
    announceSelections?: boolean;
    ariaLive?: "polite" | "assertive" | "off";
    calendarLabel?: string;
    openedAnnouncement?: string;
    closedAnnouncement?: string;
}
