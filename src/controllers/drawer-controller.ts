import type { DrawerContainer } from "../components/drawer/drawer-container";
import type { MjoDrawer } from "../mjo-drawer";
import { DrawerShowParams } from "../types/mjo-drawer";

import { ReactiveController, ReactiveControllerHost } from "lit";
import "../components/drawer/drawer-container.js";

export class DrawerController implements ReactiveController {
    host: ReactiveControllerHost;
    drawerContainer!: DrawerContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    show({ title, content, position, width, height, blocked, animationDuration, onOpen, onClose }: DrawerShowParams) {
        this.drawerContainer.open({ title, content, position, width, height, blocked, animationDuration, onOpen, onClose });
    }

    close() {
        this.drawerContainer.close();
    }

    hostConnected(): void {
        this.#createMessageElement();
    }

    hostDisconnected(): void {
        if (typeof document === "undefined") return;

        this.drawerContainer.remove();
    }

    #createMessageElement() {
        if (typeof document === "undefined" || typeof window === "undefined") return;

        this.drawerContainer = document.createElement("drawer-container") as DrawerContainer;
        this.drawerContainer.style.zIndex = window.getComputedStyle(this.host as MjoDrawer).zIndex;

        const theme = (this.host as MjoDrawer).theme as Record<string, string>;
        if (theme) this.drawerContainer.theme = theme;

        document.body.appendChild(this.drawerContainer);
    }
}
