import { TemplateResult } from "lit";

export interface DrawerShowParams {
    content: string | TemplateResult<1>;
    title?: string;
    position?: "top" | "right" | "bottom" | "left";
    width?: string | number;
    height?: string | number;
    blocked?: boolean;
    animationDuration?: number;
    onOpen?: () => void;
    onClose?: () => void;
}
