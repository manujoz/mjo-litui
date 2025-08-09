import type { ModalContainer } from "../components/modal/modal-container";
import type { MjoModal } from "../mjo-modal";
import { ModalShowParams } from "../types/mjo-modal";

import { ReactiveController, ReactiveControllerHost } from "lit";

import "../components/modal/modal-container";

export class ModalController implements ReactiveController {
    host: ReactiveControllerHost;
    modalContainer!: ModalContainer;

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
        this.modalContainer = document.createElement("modal-container") as ModalContainer;
        this.modalContainer.style.zIndex = window.getComputedStyle(this.host as MjoModal).zIndex;

        const theme = (this.host as MjoModal).theme as Record<string, string>;
        if (theme) this.modalContainer.theme = theme;

        document.body.appendChild(this.modalContainer);
    }
}
