export interface DatePickerDateSelectedEvent extends CustomEvent {
    detail: {
        value?: string; // ISO string single or range "YYYY-MM-DD" or "YYYY-MM-DD/YYYY-MM-DD"
        date?: Date;
        startDate?: Date;
        endDate?: Date;
        startDateString?: string;
        endDateString?: string;
    };
}

export interface DatePickerChangeEvent extends DatePickerDateSelectedEvent {}

declare global {
    interface HTMLElementEventMap {
        "date-picker-change": DatePickerChangeEvent;
    }
}
