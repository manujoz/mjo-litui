import type { MjoAccordionItem } from "../components/accordion/mjo-accordion-item";
import type { MjoAccordion } from "../mjo-accordion";

export type MjoAccordionVariants = "light" | "solid" | "shadow" | "bordered" | "splitted";
export type MjoAccordionSelectionModes = "single" | "multiple";

export interface MjoAccordionToggleEvent extends CustomEvent {
    detail: {
        item: MjoAccordionItem;
        expanded: boolean;
    };
}

export interface MjoAccordionWillExpandEvent extends CustomEvent {
    detail: {
        item: MjoAccordionItem;
        expanded: boolean;
        accordion?: MjoAccordion;
    };
}

export interface MjoAccordionExpandedEvent extends CustomEvent {
    detail: {
        item: MjoAccordionItem;
        expanded: boolean;
        accordion?: MjoAccordion;
    };
}

export interface MjoAccordionWillCollapseEvent extends CustomEvent {
    detail: {
        item: MjoAccordionItem;
        expanded: boolean;
        accordion?: MjoAccordion;
    };
}

export interface MjoAccordionCollapsedEvent extends CustomEvent {
    detail: {
        item: MjoAccordionItem;
        expanded: boolean;
        accordion?: MjoAccordion;
    };
}
