import { MjoOption } from "../components/select/mjo-option";
import { MjoSelect } from "../mjo-select";

// Select size types
export type MjoSelectSize = "small" | "medium" | "large";

// Select color types
export type MjoSelectColor = "primary" | "secondary";

// ARIA autocomplete types
export type MjoSelectAriaAutocomplete = "none" | "inline" | "list" | "both";

// ARIA expanded types
export type MjoSelectAriaExpanded = "true" | "false";

// ARIA invalid types
export type MjoSelectAriaInvalid = "false" | "true" | "grammar" | "spelling";

// Select change event interface
export interface MjoSelectChangeEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
        previousValue: string;
        option: MjoOption | null;
        previousOption: MjoOption | null;
    };
}

// Select open event interface
export interface MjoSelectOpenEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
        optionsCount: number;
    };
}

// Select close event interface
export interface MjoSelectCloseEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        value: string;
        reason: "selection" | "escape" | "blur" | "clickOutside";
    };
}

// Select search event interface
export interface MjoSelectSearchEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        query: string;
        filteredOptionsCount: number;
    };
}

// Select clear event interface
export interface MjoSelectClearEvent extends CustomEvent {
    detail: {
        element: MjoSelect;
        previousValue: string;
        previousOption: MjoOption | null;
    };
}

// Select focus events
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
