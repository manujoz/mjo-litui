import { MjoCheckbox } from "../mjo-checkbox";

export type MjoCheckboxColor = "primary" | "secondary";

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

export interface MjoCheckboxIndeterminateChangeEvent extends CustomEvent {
    detail: {
        element: MjoCheckbox;
        indeterminate: boolean;
        checked: boolean;
    };
}

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
