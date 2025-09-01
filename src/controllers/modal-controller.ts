import type { MjointModalContainer } from "../components/modal/mjoint-modal-container";
import type { MjoModal } from "../mjo-modal";
import { ModalShowParams } from "../types/mjo-modal";

import { ReactiveController, ReactiveControllerHost } from "lit";

import "../components/modal/mjoint-modal-container.js";

export class ModalController implements ReactiveController {
    host: ReactiveControllerHost;
    modalContainer!: MjointModalContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    show({ content, time, title, width, animationDuration, blocked, closePosition, onClose }: ModalShowParams) {
        this.modalContainer.show({ content, time, title, width, animationDuration, blocked, closePosition, onClose });
    }

    close() {
        this.modalContainer.close();
    }

    hostConnected(): void {
        this.#createModalElement();
    }

    hostDisconnected(): void {
        this.modalContainer.remove();
    }

    #createModalElement() {
        const hostModal = this.host as MjoModal;

        this.modalContainer = document.createElement("mjoint-modal-container") as MjointModalContainer;
        this.modalContainer.style.zIndex = window.getComputedStyle(this.host as MjoModal).zIndex;

        // Transfer theme
        const theme = hostModal.theme as Record<string, string>;
        if (theme) this.modalContainer.theme = theme;

        // Transfer accessibility properties
        this.modalContainer.ariaLabelledby = hostModal.ariaLabelledby;
        this.modalContainer.ariaDescribedby = hostModal.ariaDescribedby;
        this.modalContainer.label = hostModal.label;
        this.modalContainer.trapFocus = hostModal.trapFocus;
        this.modalContainer.restoreFocus = hostModal.restoreFocus;
        this.modalContainer.closeOnEscape = hostModal.closeOnEscape;
        this.modalContainer.initialFocus = hostModal.initialFocus;
        this.modalContainer.preventBodyScroll = hostModal.preventBodyScroll;

        document.body.appendChild(this.modalContainer);
    }
}
