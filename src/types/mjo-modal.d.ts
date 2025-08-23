import { TemplateResult } from "lit";

export interface ModalShowParams {
    title?: string;
    content: string | TemplateResult<1>;
    time?: number;
    width?: string | number;
    animationDuration?: number;
    blocked?: boolean;
    closePosition?: "out" | "in";
    onClose?: () => void;
}

export interface MjoModalTheme {
    iconCloseSize?: string;
    titleBorderColor?: string;
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
    width?: string;
}

// Event interfaces (component does not emit custom events)
export interface MjoModalEventMap extends HTMLElementEventMap {
    // No custom events - the modal controller handles all interactions
}
