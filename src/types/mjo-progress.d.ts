export type MjoProgressColor = "primary" | "secondary" | "success" | "warning" | "error" | "info";
export type MjoProgressSize = "small" | "medium" | "large";
export type MjoProgressVariant = "bar" | "circle";

// Events interfaces
export interface MjoProgressChangeEvent {
    detail: {
        value: number;
        percentage: number;
        min: number;
        max: number;
    };
}

export interface MjoProgressCompleteEvent {
    detail: {
        value: number;
        min: number;
        max: number;
    };
}
