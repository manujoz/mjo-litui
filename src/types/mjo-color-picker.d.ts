import { MjoColorPicker } from "../mjo-color-picker";
import type { ColorFormat } from "../utils/colors.js";

// Color picker size types
export type MjoColorPickerSize = "small" | "medium" | "large";

// Color picker color theme types
export type MjoColorPickerColor = "primary" | "secondary";

// Color picker change event interface
export interface MjoColorPickerChangeEvent extends CustomEvent {
    detail: {
        element: MjoColorPicker;
        value: string;
        format: ColorFormat;
    };
}

// Color picker format change event interface
export interface MjoColorPickerFormatChangeEvent extends CustomEvent {
    detail: {
        element: MjoColorPicker;
        format: ColorFormat;
        previousFormat: ColorFormat;
        value: string;
    };
}

// Color picker input event interface
export interface MjoColorPickerInputEvent extends CustomEvent {
    detail: {
        element: MjoColorPicker;
        value: string;
        format: ColorFormat;
    };
}

// Color picker focus events
export interface MjoColorPickerFocusEvent extends CustomEvent {
    detail: {
        element: MjoColorPicker;
    };
}

export interface MjoColorPickerBlurEvent extends CustomEvent {
    detail: {
        element: MjoColorPicker;
    };
}
