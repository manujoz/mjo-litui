import { MjoCheckbox } from "../mjo-checkbox";

// Checkbox color types
export type MjoCheckboxColor = "primary" | "secondary";

// Checkbox change event interface
export interface MjoCheckboxChangeEvent extends CustomEvent {
    detail: {
        element: MjoCheckbox;
        checked: boolean;
        indeterminate: boolean;
        value: string;
        name: string;
        previousState: {
            checked: boolean;
            indeterminate: boolean;
        };
    };
}

// Checkbox indeterminate change event interface
export interface MjoCheckboxIndeterminateChangeEvent extends CustomEvent {
    detail: {
        element: MjoCheckbox;
        indeterminate: boolean;
        checked: boolean;
    };
}

// Checkbox focus events
export interface MjoCheckboxFocusEvent extends CustomEvent {
    detail: {
        element: MjoCheckbox;
    };
}

export interface MjoCheckboxBlurEvent extends CustomEvent {
    detail: {
        element: MjoCheckbox;
    };
}
