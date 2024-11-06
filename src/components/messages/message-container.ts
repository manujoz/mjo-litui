import type { MessageItem } from "./message-item.js";

import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import "./message-item.js";

@customElement("message-container")
export class MessageContainer extends LitElement {
    @query(".container") container!: HTMLDivElement;

    render() {
        return html`<div class="container"></div>`;
    }

    show({ message, type = "info", time }: { message: string; type?: "info" | "warning" | "error" | "success"; time?: number }) {
        const messageItem = document.createElement("message-item") as MessageItem;
        messageItem.message = message;
        messageItem.type = type;
        if (time) messageItem.time = time;

        const messageItems = this.container.querySelectorAll("message-item");
        if (messageItems.length === 4) {
            messageItems[0].removeMessage();
        }

        this.container.appendChild(messageItem);
    }

    static styles = [
        css`
            :host {
                position: fixed;
                top: var(--mjo-message-top, 0);
                left: 0;
                right: 0;
                display: flex;
                z-index: 1;
            }
            .container {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1 1 0;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "message-container": MessageContainer;
    }
}
