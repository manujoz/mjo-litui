export type MjoBadgeColors = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default";
export type MjoBadgeSizes = "small" | "medium" | "large";
export type MjoBadgeVariants = "solid" | "flat" | "ghost" | "brilliant";
export type MjoBadgePositions = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface MjoBadgeClickEvent extends CustomEvent {
    detail: {
        value?: string;
        label: string;
        position: MjoBadgePositions;
        color: MjoBadgeColors;
    };
}
