import type { MjoModalContainer } from "../components/modal/mjo-modal-container";
import type { MjoModal } from "../mjo-modal";
import { ModalShowParams } from "../types/mjo-modal";

import { ReactiveController, ReactiveControllerHost } from "lit";

import "../components/modal/mjo-modal-container.js";

export class ModalController implements ReactiveController {
    host: ReactiveControllerHost;
    modalContainer!: MjoModalContainer;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }

    /**
     * Opens the modal with the specified configuration
     */
    show({ content, time, title, width, animationDuration, blocked, closePosition, onClose }: ModalShowParams) {
        this.modalContainer.show({ content, time, title, width, animationDuration, blocked, closePosition, onClose });
    }

    /**
     * Closes the modal programmatically
     */
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

        this.modalContainer = document.createElement("mjo-modal-container") as MjoModalContainer;
        this.modalContainer.style.zIndex = window.getComputedStyle(this.host as MjoModal).zIndex;

        const id = hostModal.idModal;
        if (id) this.modalContainer.id = id;

        // Transfer theme
        const theme = hostModal.theme as Record<string, string>;
        if (theme) this.modalContainer.theme = theme;

        // Transfer accessibility properties
        this.modalContainer.ariaLabelledby = hostModal.ariaLabelledby;
        this.modalContainer.ariaDescribedby = hostModal.ariaDescribedby;
        this.modalContainer.label = hostModal.label;
        this.modalContainer.disabledTrapFocus = hostModal.disabledTrapFocus;
        this.modalContainer.disabledRestoreFocus = hostModal.disabledRestoreFocus;
        this.modalContainer.disabledCloseOnEscape = hostModal.disabledCloseOnEscape;
        this.modalContainer.initialFocus = hostModal.initialFocus;
        this.modalContainer.disableScrollLock = hostModal.disableScrollLock;

        document.body.appendChild(this.modalContainer);
    }
}
