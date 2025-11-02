import type { MjoLink } from "../mjo-link";

export type MjoLinkColors = "primary" | "secondary" | "default";
export type MjoLinkVariants = "ghost" | "dashed" | "link" | "text" | "flat" | "button";

export interface MjoLinkClickEvent extends CustomEvent {
    detail: {
        link: MjoLink;
        href?: string | undefined;
    };
}
