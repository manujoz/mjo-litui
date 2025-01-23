import type { NotificationContainer } from "../components/notifications/notification-container";
import type { MjoNotification } from "../mjo-notification";
import { NotificationPositions, NotificationShowParams } from "../types/mjo-notification";

import { ReactiveController, ReactiveControllerHost } from "lit";

export class NotificationController implements ReactiveController {
    host: ReactiveControllerHost;
    notificationContainer!: NotificationContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    show({ message, type, time, title }: NotificationShowParams) {
        this.notificationContainer.show({ message, type, time, title });
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
