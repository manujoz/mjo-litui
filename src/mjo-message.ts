import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { MessageController } from "./controllers/message-controller.js";

import "./components/messages/message-container.js";

@customElement("mjo-message")
export class MjoMessage extends LitElement {
    controller = new MessageController(this);

    render() {
        return html`<slot></slot>`;
    }

    static styles = [
        css`
            :host {
                display: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-message": MjoMessage;
    }
}
