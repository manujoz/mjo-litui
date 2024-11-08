import { TemplateResult } from "lit";

export type NotificationPositions = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type NotificationTypes = "info" | "warning" | "error" | "success";

export interface NotificationShowParams {
    title?: string;
    message: string | TemplateResult<1>;
    type?: NotificationTypes;
    time?: number;
}
