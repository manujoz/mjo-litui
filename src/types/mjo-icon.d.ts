import type { MjoIcon } from "../mjo-icon";

// Icon size types
export type MjoIconSize = "small" | "medium" | "large" | "xl";

// Icon animation types
export type MjoIconAnimation = "none" | "spin" | "pulse" | "rotate";

// Icon click event interface
export interface MjoIconClickEvent extends CustomEvent {
    detail: {
        element: MjoIcon;
    };
}

// Icon load event interface (when SVG is successfully parsed)
export interface MjoIconLoadEvent extends CustomEvent {
    detail: {
        element: MjoIcon;
        src: string;
    };
}

// Icon error event interface (when SVG fails to load or is invalid)
export interface MjoIconErrorEvent extends CustomEvent {
    detail: {
        element: MjoIcon;
        error: string;
        src?: string;
    };
}
