import type { DrawerContainer } from "../components/drawer/drawer-container";
import type { MjoDrawer } from "../mjo-drawer";
import { DrawerShowParams } from "../types/mjo-drawer";

import { ReactiveController, ReactiveControllerHost } from "lit";

export class DrawerController implements ReactiveController {
    host: ReactiveControllerHost;
    drawerContainer!: DrawerContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    show({ title, content, position, width, height, blocked, animationDuration }: DrawerShowParams) {
        this.drawerContainer.open({ title, content, position, width, height, blocked, animationDuration });
    }

    hostConnected(): void {
        this.#createMessageElement();
    }

    hostDisconnected(): void {
        this.drawerContainer.remove();
    }

    #createMessageElement() {
        this.drawerContainer = document.createElement("drawer-container") as DrawerContainer;
        this.drawerContainer.style.zIndex = window.getComputedStyle(this.host as MjoDrawer).zIndex;

        const theme = (this.host as MjoDrawer).theme as Record<string, string>;
        if (theme) this.drawerContainer.theme = theme;

        document.body.appendChild(this.drawerContainer);
    }
}
