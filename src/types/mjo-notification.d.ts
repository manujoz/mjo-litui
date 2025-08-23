import { TemplateResult } from "lit";

export type NotificationPositions = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type NotificationTypes = "info" | "warning" | "error" | "success";

export interface NotificationShowParams {
    title?: string;
    message: string | TemplateResult<1>;
    type?: NotificationTypes;
    time?: number;
    onClose?: () => void;
}

// Accessibility interfaces
export interface NotificationAccessibilityOptions {
    ariaLive?: "polite" | "assertive" | "off";
    ariaLabel?: string;
    disableAnimations?: boolean;
    announceToScreenReader?: boolean;
}

// Component interfaces for types (even though events are handled by controller)
export interface MjoNotificationInterface {
    position: NotificationPositions;
    threshold: number;
    ariaLive: "polite" | "assertive" | "off";
    ariaLabel: string;
    disableAnimations: boolean;
    clearAll(): void;
    announce(message: string): void;
}
