import type { MjoDrawerContainer } from "../components/drawer/mjo-drawer-container";
import type { MjoDrawer } from "../mjo-drawer";
import type { DrawerShowParams } from "../types/mjo-drawer";

import type { ReactiveController, ReactiveControllerHost } from "lit";

import "../components/drawer/mjo-drawer-container.js";

export class DrawerController implements ReactiveController {
    host: ReactiveControllerHost;
    drawerContainer!: MjoDrawerContainer;
    parent?: Element;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    /**
     * Opens the drawer with the specified parameters.
     * Creates and displays the drawer container with the provided content, title, and configuration.
     */
    show({ title, content, position, width, height, blocked, animationDuration, onOpen, onClose }: DrawerShowParams) {
        this.drawerContainer.open({ title, content, position, width, height, blocked, animationDuration, onOpen, onClose });
    }

    /**
     * Closes the drawer.
     * Hides the drawer container and triggers the close animation.
     */
    close() {
        this.drawerContainer.close();
    }

    /**
     * Sets a custom parent element for the drawer container.
     * By default, the drawer is appended to document.body.
     */
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
        const host = this.host as MjoDrawer;
        this.drawerContainer = document.createElement("mjo-drawer-container") as MjoDrawerContainer;
        this.drawerContainer.style.zIndex = window.getComputedStyle(host).zIndex;

        const id = host.idDrawer;
        if (id) this.drawerContainer.id = id;

        const theme = host.theme as Record<string, string>;
        if (theme) this.drawerContainer.theme = theme;

        // Transfer accessibility properties
        this.drawerContainer.ariaLabelledby = host.ariaLabelledby;
        this.drawerContainer.ariaDescribedby = host.ariaDescribedby;
        this.drawerContainer.label = host.label;
        this.drawerContainer.disabledTrapFocus = host.disabledTrapFocus;
        this.drawerContainer.disabledRestoreFocus = host.disabledRestoreFocus;
        this.drawerContainer.disabledCloseOnEscape = host.disabledCloseOnEscape;
        this.drawerContainer.initialFocus = host.initialFocus;
        this.drawerContainer.disableScrollLock = host.disableScrollLock;

        if (!this.parent) this.parent = document.body;
        this.parent.appendChild(this.drawerContainer);
    }
}
