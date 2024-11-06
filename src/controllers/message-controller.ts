import type { MessageContainer } from "../components/messages/message-container";
import type { MjoMessage } from "../mjo-message";

import { ReactiveController, ReactiveControllerHost } from "lit";

export class MessageController implements ReactiveController {
    host: ReactiveControllerHost;
    messageContainer!: MessageContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    show({ message, type = "info", time }: { message: string; type?: "info" | "warning" | "error" | "success"; time?: number }) {
        this.messageContainer.show({ message, type, time });
    }

    hostConnected(): void {
        this.#createMessageElement();
    }

    hostDisconnected(): void {
        this.messageContainer.remove();
    }

    #createMessageElement() {
        this.messageContainer = document.createElement("message-container") as MessageContainer;
        this.messageContainer.style.zIndex = window.getComputedStyle(this.host as MjoMessage).zIndex;

        document.body.appendChild(this.messageContainer);
    }
}
