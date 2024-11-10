import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { NotificationController } from "./controllers/notification-controller.js";

import "./components/notifications/notification-container.js";
import { NotificationPositions } from "./types/mjo-notification.js";
import { MjoNotificationTheme } from "./types/mjo-theme.js";

@customElement("mjo-notification")
export class MjoNotification extends LitElement {
    @property({ type: String }) position: NotificationPositions = "top-right";
    @property({ type: Number }) threshold = 4;
    @property({ type: Object }) theme?: MjoNotificationTheme;

    controller = new NotificationController(this);

    render() {
        return html`<slot></slot>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.controller.setPosition(this.position);
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
