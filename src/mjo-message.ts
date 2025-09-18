import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { MessageController } from "./controllers/message-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/messages/mjo-message-container.js";

/**
 * @summary Global message controller component that displays temporary toast-like notifications.
 *
 * @description The mjo-message component provides a powerful message system for displaying temporary
 * notifications using a controller architecture. It creates a global message container in the document
 * body, allowing messages to appear above any content regardless of parent element constraints. The
 * component includes comprehensive accessibility features with proper ARIA live regions, screen reader
 * support, and semantic message types.
 *
 * @slot - Default slot for any content (hidden by default as the component uses a controller pattern)
 * @csspart container - The message container element (applied to mjo-message-container in document body)
 */
@customElement("mjo-message")
export class MjoMessage extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) idMessage?: string;
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
