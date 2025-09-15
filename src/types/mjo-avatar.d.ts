export type MjoAvatarColor = "default" | "primary" | "secondary" | "success" | "warning" | "info" | "error";
export type MjoAvatarSize = "small" | "medium" | "large";
export type MjoAvatarRadius = "none" | "small" | "medium" | "large" | "full";

export interface MjoAvatarClickEvent extends CustomEvent {
    detail: {
        value: string;
    };
}

export interface MjoAvatarErrorEvent extends CustomEvent {
    detail: {
        message: string;
    };
}
