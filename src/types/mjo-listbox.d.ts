import { TemplateResult } from "lit";

export interface MjoListboxItem {
    label?: string | number | TemplateResult<1>;
    description?: string;
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
    startIcon?: string;
    endIcon?: string;
    disabled?: boolean;
    section?: string;
    href?: string;
    value?: string | number;
}

export type MjoListboxItems = Array<MjoListboxItem>;
export type MjoListboxVariant = "solid" | "bordered" | "light" | "flat";
export type MjoListboxSize = "small" | "medium" | "large";

export interface MjoListboxClickEvent extends CustomEvent {
    detail: {
        item: MjoListboxItem;
        value: MjoListboxItem["value"];
    };
}
