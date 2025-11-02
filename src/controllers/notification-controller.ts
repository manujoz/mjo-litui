import type { MjoNotificationContainer } from "../components/notifications/mjo-notification-container";
import type { MjoNotification } from "../mjo-notification";
import type { NotificationPositions, NotificationShowParams } from "../types/mjo-notification";

import type { ReactiveController, ReactiveControllerHost } from "lit";
import "../components/notifications/mjo-notification-container.js";

export class NotificationController implements ReactiveController {
    host: ReactiveControllerHost;
    notificationContainer!: MjoNotificationContainer;

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

    clearAll() {
        this.notificationContainer.clearAll();
    }

    #createNotificationElement() {
        this.notificationContainer = document.createElement("mjo-notification-container") as MjoNotificationContainer;
        this.notificationContainer.setAttribute("threshold", (this.host as MjoNotification).threshold.toString());
        this.notificationContainer.style.zIndex = window.getComputedStyle(this.host as MjoNotification).zIndex;

        const id = (this.host as MjoNotification).idNotification;
        if (id) this.notificationContainer.id = id;

        const theme = (this.host as MjoNotification).theme as Record<string, string>;
        if (theme) this.notificationContainer.theme = theme;

        document.body.appendChild(this.notificationContainer);
    }
}
