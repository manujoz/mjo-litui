import { MjoRadio } from "../mjo-radio";

// Radio color types
export type MjoRadioColor = "primary" | "secondary";

// Radio change event interface
export interface MjoRadioChangeEvent extends CustomEvent {
    detail: {
        element: MjoRadio;
        checked: boolean;
        value: string;
        name: string;
        previousState: {
            checked: boolean;
        };
    };
}

// Radio focus events
export interface MjoRadioFocusEvent extends CustomEvent {
    detail: {
        element: MjoRadio;
    };
}

export interface MjoRadioBlurEvent extends CustomEvent {
    detail: {
        element: MjoRadio;
    };
}
