import type { MjoButton } from "../mjo-button";

export type MjoButtonSize = "small" | "medium" | "large";
export type MjoButtonColor = "primary" | "secondary" | "success" | "info" | "warning" | "error";
export type MjoButtonVariant = "default" | "ghost" | "dashed" | "link" | "text" | "flat";
export type MjoButtonType = "button" | "submit" | "reset" | "menu";

export interface MjoButtonClickEvent extends CustomEvent {
    detail: {
        element: MjoButton;
        toggle?: boolean;
        originalEvent: MouseEvent | KeyboardEvent;
    };
}
export interface MjoButtonToggleEvent extends CustomEvent {
    detail: {
        element: MjoButton;
        pressed: boolean;
        previousState: boolean;
    };
}
export interface MjoButtonLoadingChangeEvent extends CustomEvent {
    detail: {
        element: MjoButton;
        loading: boolean;
    };
}
export interface MjoButtonFocusEvent extends CustomEvent {
    detail: {
        element: MjoButton;
    };
}
export interface MjoButtonBlurEvent extends CustomEvent {
    detail: {
        element: MjoButton;
    };
}
