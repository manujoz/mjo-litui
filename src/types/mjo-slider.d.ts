import { SliderHandle } from "../components/slider/mjoint-slider-handle";
import { MjoSlider } from "../mjo-slider";

export type MjoSliderColor = "primary" | "secondary";
export type MjoSliderSize = "small" | "medium" | "large";

export interface MjoSliderChangeEvent extends CustomEvent {
    detail: {
        element: MjoSlider;
        value: string;
        name?: string;
        isRange: boolean;
        previousValue: string;
    };
}

export interface MjoSliderInputEvent extends CustomEvent {
    detail: {
        element: MjoSlider;
        value: string;
        name?: string;
        isRange: boolean;
        handle?: "one" | "two";
    };
}

export interface MjoSliderFocusEvent extends CustomEvent {
    detail: {
        element: MjoSlider;
        handle?: "one" | "two";
    };
}

export interface MjoSliderBlurEvent extends CustomEvent {
    detail: {
        element: MjoSlider;
        handle?: "one" | "two";
    };
}

export interface MjoSliderValueChangeEvent extends CustomEvent {
    detail: {
        element: MjoSlider;
        value: string;
        previousValue: string;
        programmatic: boolean;
    };
}

// Interfaces for mjoint-slider-handle component
export interface SliderHandleMoveEvent extends CustomEvent {
    detail: {
        diff: number;
        target: SliderHandle;
    };
}

export interface SliderHandleReleaseEvent extends CustomEvent {
    detail: {
        target: SliderHandle;
    };
}

export interface SliderHandleFocusEvent extends CustomEvent {
    detail: {
        target: SliderHandle;
    };
}

export interface SliderHandleBlurEvent extends CustomEvent {
    detail: {
        target: SliderHandle;
    };
}

export interface SliderHandleKeydownEvent extends CustomEvent {
    detail: {
        target: SliderHandle;
        key: string;
        originalEvent: KeyboardEvent;
    };
}
