import { MessageShowParams } from "../../types/mjo-message.js";
import type { MjointMessageItem } from "./mjoint-message-item";

import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

import "./mjoint-message-item.js";

@customElement("mjoint-message-container")
export class MjointMessageContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @query(".container") container!: HTMLDivElement;

    render() {
        return html`<div class="container" role="region" aria-label="Message notifications" aria-live="polite"></div>`;
    }

    async show({ message, type = "info", time, onClose }: MessageShowParams, maxMessages = 4) {
        const messageItem = document.createElement("mjoint-message-item") as MjointMessageItem;
        messageItem.message = message;
        messageItem.type = type;
        if (time) messageItem.time = time;
        if (onClose) messageItem.onClose = onClose;

        const messageItems = this.container.querySelectorAll("mjoint-message-item");
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
        "mjoint-message-container": MjointMessageContainer;
    }
}
