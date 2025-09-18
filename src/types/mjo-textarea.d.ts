import { MjoTextarea } from "../mjo-textarea";

export type MjoTextareaSize = "small" | "medium" | "large";
export type MjoTextareaColor = "primary" | "secondary";
export type MjoTextareaVariant = "default" | "ghost" | "flat";
export type MjoTextareaAutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";
export type MjoTextareaAriaInvalid = "false" | "true" | "grammar" | "spelling";
export type MjoTextareaAriaAutocomplete = "none" | "inline" | "list" | "both";
export type MjoTextareaAriaExpanded = "true" | "false";

export interface MjoTextareaInputEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        value: string;
        previousValue: string;
        inputType: string;
    };
}

export interface MjoTextareaChangeEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        value: string;
        previousValue: string;
    };
}

export interface MjoTextareaClearEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        previousValue: string;
    };
}

export interface MjoTextareaFocusEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        value: string;
    };
}

export interface MjoTextareaBlurEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        value: string;
    };
}

// Textarea keyup event interface
export interface MjoTextareaKeyupEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        key: string;
        code: string;
        value: string;
        originalEvent: KeyboardEvent;
    };
}
