export type MjoChipVariant = "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot";
export type MjoChipSize = "small" | "medium" | "large";
export type MjoChipColor = "default" | "primary" | "secondary" | "success" | "info" | "warning" | "error";
export type MjoChipRadius = "small" | "medium" | "large" | "full" | "none";

export interface MjoChipCloseEvent extends CustomEvent {
    detail: {
        value: string;
    };
}

export interface MjoChipClickEvent extends CustomEvent {
    detail: {
        value: string;
    };
}
