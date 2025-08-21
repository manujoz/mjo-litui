import { MjoButton } from "../mjo-button";

// Button size types
export type MjoButtonSize = "small" | "medium" | "large";

// Button color types
export type MjoButtonColor = "primary" | "secondary" | "success" | "info" | "warning" | "error";

// Button variant types
export type MjoButtonVariant = "default" | "ghost" | "dashed" | "link" | "text" | "flat";

// Button type attribute
export type MjoButtonType = "button" | "submit" | "reset" | "menu";

// Button click event interface
export interface MjoButtonClickEvent extends CustomEvent {
    detail: {
        element: MjoButton;
        toggle?: boolean;
        originalEvent: MouseEvent | KeyboardEvent;
    };
}

// Button toggle event interface
export interface MjoButtonToggleEvent extends CustomEvent {
    detail: {
        element: MjoButton;
        pressed: boolean;
        previousState: boolean;
    };
}

// Button loading state change event interface
export interface MjoButtonLoadingChangeEvent extends CustomEvent {
    detail: {
        element: MjoButton;
        loading: boolean;
    };
}

// Button focus events
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
