import { NotificationPositions } from "./types/mjo-notification.js";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { NotificationController } from "./controllers/notification-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/notifications/notification-container.js";

@customElement("mjo-notification")
export class MjoNotification extends ThemeMixin(LitElement) implements IThemeMixin {
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
     * @param message - Message to announce
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
