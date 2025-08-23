import { MjoSwitch } from "../mjo-switch";

// Switch color types
export type MjoSwitchColor = "primary" | "secondary";

// Switch size types
export type MjoSwitchSize = "small" | "medium" | "large";

// Switch change event interface
export interface MjoSwitchChangeEvent extends CustomEvent {
    detail: {
        element: MjoSwitch;
        checked: boolean;
        value: string;
        name: string;
        previousState: {
            checked: boolean;
        };
    };
}

// Switch focus events
export interface MjoSwitchFocusEvent extends CustomEvent {
    detail: {
        element: MjoSwitch;
    };
}

export interface MjoSwitchBlurEvent extends CustomEvent {
    detail: {
        element: MjoSwitch;
    };
}
