// Dropdown behavior types
export type MjoDropdownBehaviour = "hover" | "click";

// Dropdown position types
export type MjoDropdownPosition = "left-bottom" | "center-bottom" | "right-bottom" | "left-top" | "center-top" | "right-top" | "left-middle" | "right-middle";

// Custom event interfaces
export interface MjoDropdownOpenEvent {
    type: "mjo-dropdown:open";
    target: HTMLElement;
    currentTarget: HTMLElement;
}

export interface MjoDropdownCloseEvent {
    type: "mjo-dropdown:close";
    target: HTMLElement;
    currentTarget: HTMLElement;
}

// Theme interface for dropdown
export interface MjoDropdownTheme {
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
}

// Focus management options
export interface MjoDropdownFocusOptions {
    restoreFocus?: boolean;
    trapFocus?: boolean;
    initialFocus?: string; // CSS selector for element to focus initially
}
