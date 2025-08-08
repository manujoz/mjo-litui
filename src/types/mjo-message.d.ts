export type MessageTypes = "info" | "warning" | "error" | "success" | "";

export interface MessageShowParams {
    message: string;
    type?: MessageTypes;
    time?: number;
    onClose?: () => void;
}
