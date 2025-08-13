import type { NotificationContainer } from "../components/notifications/notification-container";
import type { MjoNotification } from "../mjo-notification";
import { NotificationPositions, NotificationShowParams } from "../types/mjo-notification";

import { ReactiveController, ReactiveControllerHost } from "lit";
import "../components/notifications/notification-container.js";

export class NotificationController implements ReactiveController {
    host: ReactiveControllerHost;
    notificationContainer!: NotificationContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    async show({ message, type, time, title, onClose }: NotificationShowParams) {
        return await this.notificationContainer.show({ message, type, time, title, onClose });
    }

    hostConnected(): void {
        this.#createNotificationElement();
    }

    hostDisconnected(): void {
        this.notificationContainer.remove();
    }

    setPosition(position: NotificationPositions) {
        this.notificationContainer.position = position;
    }

    #createNotificationElement() {
        this.notificationContainer = document.createElement("notification-container") as NotificationContainer;
        this.notificationContainer.setAttribute("threshold", (this.host as MjoNotification).threshold.toString());
        this.notificationContainer.style.zIndex = window.getComputedStyle(this.host as MjoNotification).zIndex;

        const theme = (this.host as MjoNotification).theme as Record<string, string>;
        if (theme) this.notificationContainer.theme = theme;

        document.body.appendChild(this.notificationContainer);
    }
}
