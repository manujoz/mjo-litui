import { MjoTextfield } from "../mjo-textfield";

export type MjoTextfieldType = "text" | "password" | "email" | "number" | "tel" | "url";
export type MjoTextfieldSize = "small" | "medium" | "large";
export type MjoTextfieldVariant = "default" | "ghost" | "flat";
export type MjoTextfieldColor = "primary" | "secondary";
export type MjoTextfieldAutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";
export type MjoTextfieldAriaInvalid = "false" | "true" | "grammar" | "spelling";
export type MjoTextfieldAriaAutocomplete = "none" | "inline" | "list" | "both";
export type MjoTextfieldAriaExpanded = "true" | "false";

export interface MjoTextfieldInputEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        value: string;
        previousValue: string;
        inputType: string;
    };
}

export interface MjoTextfieldChangeEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        value: string;
        previousValue: string;
    };
}

export interface MjoTextfieldClearEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        previousValue: string;
    };
}

export interface MjoTextfieldPasswordToggleEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        visible: boolean;
        type: "password" | "text";
    };
}

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

export interface MjoTextfieldKeyupEvent extends CustomEvent {
    detail: {
        element: MjoTextfield;
        key: string;
        code: string;
        value: string;
        originalEvent: KeyboardEvent;
    };
}
