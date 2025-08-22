export interface DatePickerDateSelectedEvent extends CustomEvent {
    detail: {
        value?: string; // ISO string single or range "YYYY-MM-DD" or "YYYY-MM-DD/YYYY-MM-DD"
        date?: Date;
        startDate?: Date;
        endDate?: Date;
        startDateValue?: string;
        endDateValue?: string;
    };
}

export interface DatePickerChangeEvent extends DatePickerDateSelectedEvent {}

// New accessibility-related types
export interface DatePickerAccessibilityConfig {
    announceSelections?: boolean;
    ariaLive?: "polite" | "assertive" | "off";
    calendarLabel?: string;
    openedAnnouncement?: string;
    closedAnnouncement?: string;
}

declare global {
    interface HTMLElementEventMap {
        "date-picker-change": DatePickerChangeEvent;
    }
}
