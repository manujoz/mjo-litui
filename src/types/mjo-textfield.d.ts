import { MjoTextfield } from "../mjo-textfield";

// Input type definitions
export type MjoTextfieldType = "text" | "password" | "email" | "number" | "tel" | "url";

// Textfield size types
export type MjoTextfieldSize = "small" | "medium" | "large";

// Textfield color types
export type MjoTextfieldColor = "primary" | "secondary";

// AutoCapitalize types
export type MjoTextfieldAutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";

// ARIA invalid types
export type MjoTextfieldAriaInvalid = "false" | "true" | "grammar" | "spelling";

// ARIA autocomplete types
export type MjoTextfieldAriaAutocomplete = "none" | "inline" | "list" | "both";

// ARIA expanded types
export type MjoTextfieldAriaExpanded = "true" | "false";

// Textfield input event interface
export interface MjoTextfieldInputEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        value: string;
        previousValue: string;
        inputType: string;
    };
}

// Textfield change event interface
export interface MjoTextfieldChangeEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        value: string;
        previousValue: string;
    };
}

// Textfield clear event interface
export interface MjoTextfieldClearEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        previousValue: string;
    };
}

// Textfield password toggle event interface
export interface MjoTextfieldPasswordToggleEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        visible: boolean;
        type: "password" | "text";
    };
}

// Textfield focus events
export interface MjoTextfieldFocusEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        value: string;
    };
}

export interface MjoTextfieldBlurEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        value: string;
    };
}

// Textfield keyup event interface
export interface MjoTextfieldKeyupEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        key: string;
        code: string;
        value: string;
        originalEvent: KeyboardEvent;
    };
}
