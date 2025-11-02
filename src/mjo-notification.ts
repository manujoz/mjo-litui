import type { NotificationPositions } from "./types/mjo-notification.js";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { NotificationController } from "./controllers/notification-controller.js";
import type { IThemeMixin } from "./mixins/theme-mixin.js";
import { ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/notifications/mjo-notification-container.js";

/**
 * @summary A notification system for displaying positioned toast notifications with controller architecture and comprehensive accessibility support.
 *
 * @cssprop --mjo-notification-background-color - Background color for notification items
 * @cssprop --mjo-notification-box-shadow - Box shadow for notification items
 * @cssprop --mjo-notification-border-radius - Border radius for notification items
 * @cssprop --mjo-notification-margin - Margin between notification items
 * @cssprop --mjo-notification-space-vertical - Vertical spacing from screen edge
 * @cssprop --mjo-notification-space-horizontal - Horizontal spacing from screen edge
 * @cssprop --mjo-notification-title-font-size - Font size for notification titles
 * @cssprop --mjo-notification-title-font-weight - Font weight for notification titles
 * @cssprop --mjo-notification-title-color - Color for notification titles
 * @cssprop --mjo-notification-message-font-size - Font size for notification messages
 * @cssprop --mjo-notification-message-color - Color for notification messages
 * @cssprop --mjo-notification-close-hover-background-color - Close button hover background
 * @cssprop --mjo-notification-animation-duration - Duration of notification animations
 * @cssprop --mjo-notification-focus-outline - Focus outline for interactive elements
 *
 * @csspart container - The main notification container mounted in document body
 * @csspart notification-icon-container - Container for the notification type icon
 * @csspart notification-icon - The notification type icon element
 * @csspart notification-wrapper - Wrapper for the notification content
 * @csspart notification-title - The notification title element
 * @csspart notification-message - The notification message element
 * @csspart close-button - The close button element
 * @csspart icon-close - The close icon element
 */
@customElement("mjo-notification")
export class MjoNotification extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) idNotification?: string;
    @property({ type: String }) position: NotificationPositions = "top-right";
    @property({ type: Number }) threshold = 4;
    @property({ type: String, attribute: "aria-live" }) ariaLive: "polite" | "assertive" | "off" = "polite";
    @property({ type: String, attribute: "aria-label" }) ariaLabel = "Notifications";
    @property({ type: Boolean, attribute: "disable-animations" }) disableAnimations = false;

    controller = new NotificationController(this);

    render() {
        return html`<slot></slot>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.setAttribute("role", "region");
        this.setAttribute("aria-live", this.ariaLive);
        this.setAttribute("aria-label", this.ariaLabel);

        this.controller.setPosition(this.position);
    }

    /**
     * Clear all notifications from the notification container
     */
    clearAll(): void {
        this.controller.clearAll();
    }

    /**
     * Announce a message to screen readers without showing a visual notification
     */
    announce(message: string): void {
        const announcer = document.createElement("div");
        announcer.setAttribute("aria-live", this.ariaLive);
        announcer.setAttribute("aria-atomic", "true");
        announcer.style.position = "absolute";
        announcer.style.left = "-10000px";
        announcer.style.width = "1px";
        announcer.style.height = "1px";
        announcer.style.overflow = "hidden";

        document.body.appendChild(announcer);
        announcer.textContent = message;

        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-notification": MjoNotification;
    }
}
