import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { MessageController } from "./controllers/message-controller.js";
import type { IThemeMixin } from "./mixins/theme-mixin.js";
import { ThemeMixin } from "./mixins/theme-mixin.js";

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
 *
 * @csspart container - The main container element holding all message items
 * @csspart icon-container - Container for the message type icon
 * @csspart icon - The icon element (exported from internal mjo-icon)
 * @csspart message - Container for the message text content
 *
 * @cssprop --mjo-message-top - Top position of the message container (default: 0)
 * @cssprop --mjo-message-background-color - Background color of individual messages
 * @cssprop --mjo-message-box-shadow - Box shadow applied to messages
 * @cssprop --mjo-message-border-radius - Border radius of message items
 * @cssprop --mjo-message-margin-top - Top margin for each message item (default: 15px)
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
