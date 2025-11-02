import type { MjoOption } from "../components/select/mjo-option";
import type { MjoSelect } from "../mjo-select";

export type MjoSelectSize = "small" | "medium" | "large";
export type MjoSelectColor = "primary" | "secondary";
export type MjoSelectVariant = "default" | "ghost" | "flat";
export type MjoSelectAriaAutocomplete = "none" | "inline" | "list" | "both";
export type MjoSelectAriaExpanded = "true" | "false";
export type MjoSelectAriaInvalid = "false" | "true" | "grammar" | "spelling";

export interface MjoSelectChangeEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
        previousValue: string;
        option: MjoOption | null;
        previousOption: MjoOption | null;
    };
}

export interface MjoSelectOpenEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
        optionsCount: number;
    };
}

export interface MjoSelectCloseEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
        reason: "selection" | "escape" | "blur" | "clickOutside";
    };
}

export interface MjoSelectSearchEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        query: string;
        filteredOptionsCount: number;
    };
}

export interface MjoSelectClearEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        previousValue: string;
        previousOption: MjoOption | null;
    };
}

export interface MjoSelectFocusEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
    };
}

export interface MjoSelectBlurEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
        reason: "tab" | "clickOutside" | "programmatic";
    };
}

// Option selection event interface
export interface MjoSelectOptionSelectEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        option: MjoOption;
        value: string;
        text: string;
    };
}

// Option preselection event interface (keyboard navigation)
export interface MjoSelectOptionPreselectEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        option: MjoOption;
        previousOption: MjoOption | null;
        value: string;
    };
}

// Option preselection event interface (keyboard navigation)
export interface MjoSelectKeydownEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        originalEvent: Event;
        key: string;
        code: string;
    };
}
