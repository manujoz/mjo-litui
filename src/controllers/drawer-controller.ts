import type { MjoDrawerContainer } from "../components/drawer/mjo-drawer-container";
import type { MjoDrawer } from "../mjo-drawer";
import { DrawerShowParams } from "../types/mjo-drawer";

import { ReactiveController, ReactiveControllerHost } from "lit";

import "../components/drawer/mjo-drawer-container.js";

export class DrawerController implements ReactiveController {
    host: ReactiveControllerHost;
    drawerContainer!: MjoDrawerContainer;
    parent?: Element;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    show({ title, content, position, width, height, blocked, animationDuration, onOpen, onClose }: DrawerShowParams) {
        this.drawerContainer.open({ title, content, position, width, height, blocked, animationDuration, onOpen, onClose });
    }

    close() {
        this.drawerContainer.close();
    }

    setParent(parent: Element) {
        this.parent = parent;

        this.parent.appendChild(this.drawerContainer);
    }

    hostConnected(): void {
        this.#createDrawerElement();
    }

    hostDisconnected(): void {
        this.drawerContainer.remove();
    }

    #createDrawerElement() {
        this.drawerContainer = document.createElement("mjo-drawer-container") as MjoDrawerContainer;
        this.drawerContainer.style.zIndex = window.getComputedStyle(this.host as MjoDrawer).zIndex;

        const id = (this.host as MjoDrawer).idDrawer;
        if (id) this.drawerContainer.id = id;

        const theme = (this.host as MjoDrawer).theme as Record<string, string>;
        if (theme) this.drawerContainer.theme = theme;

        if (!this.parent) this.parent = document.body;
        this.parent.appendChild(this.drawerContainer);
    }
}
