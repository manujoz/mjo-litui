import type { MessageContainer } from "../components/messages/message-container";
import type { MjoMessage } from "../mjo-message";
import { MessageShowParams } from "../types/mjo-message";

import { ReactiveController, ReactiveControllerHost } from "lit";
import "../components/messages/message-container.js";

export class MessageController implements ReactiveController {
    host: ReactiveControllerHost;
    messageContainer!: MessageContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    async show({ message, type = "info", time, onClose }: MessageShowParams) {
        return await this.messageContainer.show({ message, type, time, onClose }, (this.host as MjoMessage).maxMessages);
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

        const theme = (this.host as MjoMessage).theme as Record<string, string>;
        if (theme) this.messageContainer.theme = theme;

        // Apply accessibility properties from host
        const hostMessage = this.host as MjoMessage;
        const container = this.messageContainer.shadowRoot?.querySelector(".container");
        if (container && hostMessage.regionLabel) {
            container.setAttribute("aria-label", hostMessage.regionLabel);
        }
        if (container && hostMessage.ariaLive) {
            container.setAttribute("aria-live", hostMessage.ariaLive);
        }

        document.body.appendChild(this.messageContainer);
    }
}
