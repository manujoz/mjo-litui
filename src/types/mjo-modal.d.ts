import { TemplateResult } from "lit";

export interface ModalShowParams {
    title?: string;
    content: string | TemplateResult<1>;
    time?: number;
    width?: string | number;
    animationDuration?: number;
    blocked?: boolean;
    onClose?: () => void;
}
