export type MjoDatePickerDisplayMode = "iso" | "localized" | "numeric";
export type MjoDatePickerAriaLive = "polite" | "assertive" | "off";

export interface DatePickerChangeEvent extends CustomEvent {
    detail: {
        value?: string;
        date?: Date;
        startDate?: Date;
        endDate?: Date;
        startDateValue?: string;
        endDateValue?: string;
    };
}
