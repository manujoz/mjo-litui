import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { MessageController } from "./controllers/message-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/messages/message-container.js";

@customElement("mjo-message")
export class MjoMessage extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) regionLabel = "Message notifications";
    @property({ type: String, attribute: "aria-live" }) ariaLive: "polite" | "assertive" | "off" = "polite";
    @property({ type: Number }) maxMessages = 4;

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
