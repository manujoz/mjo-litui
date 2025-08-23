import { MessageShowParams } from "../../types/mjo-message.js";
import type { MessageItem } from "./message-item.js";

import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

import "./message-item.js";

@customElement("message-container")
export class MessageContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @query(".container") container!: HTMLDivElement;

    render() {
        return html`<div class="container" role="region" aria-label="Message notifications" aria-live="polite"></div>`;
    }

    async show({ message, type = "info", time, onClose }: MessageShowParams, maxMessages = 4) {
        const messageItem = document.createElement("message-item") as MessageItem;
        messageItem.message = message;
        messageItem.type = type;
        if (time) messageItem.time = time;
        if (onClose) messageItem.onClose = onClose;

        const messageItems = this.container.querySelectorAll("message-item");
        if (messageItems.length === maxMessages) {
            messageItems[0].close();
        }

        this.container.appendChild(messageItem);
        return messageItem;
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
