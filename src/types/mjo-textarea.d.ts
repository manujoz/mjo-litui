import { MjoTextarea } from "../mjo-textarea";

// Textarea size types
export type MjoTextareaSize = "small" | "medium" | "large";

// Textarea color types
export type MjoTextareaColor = "primary" | "secondary";

// AutoCapitalize types
export type MjoTextareaAutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";

// ARIA invalid types
export type MjoTextareaAriaInvalid = "false" | "true" | "grammar" | "spelling";

// ARIA autocomplete types
export type MjoTextareaAriaAutocomplete = "none" | "inline" | "list" | "both";

// ARIA expanded types
export type MjoTextareaAriaExpanded = "true" | "false";

// Textarea input event interface
export interface MjoTextareaInputEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        value: string;
        previousValue: string;
        inputType: string;
    };
}

// Textarea change event interface
export interface MjoTextareaChangeEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        value: string;
        previousValue: string;
    };
}

// Textarea clear event interface
export interface MjoTextareaClearEvent extends CustomEvent {
    detail: {
        element: MjoTextarea;
        previousValue: string;
    };
}

// Textarea focus events
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
