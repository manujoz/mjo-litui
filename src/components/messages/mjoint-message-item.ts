import { MessageTypes } from "../../types/mjo-message";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillWarning } from "mjo-icons/ai";

@customElement("mjoint-message-item")
export class MjointMessageItem extends LitElement {
    @property({ type: String }) message = "";
    @property({ type: String }) type: MessageTypes = "info";
    @property({ type: Number }) time = 3000;

    onClose?: () => void;
    timeOut?: ReturnType<typeof setTimeout>;
    removing = false;

    render() {
        const isUrgent = this.type === "error" || this.type === "warning";
        const messageRole = isUrgent ? "alert" : "status";
        const ariaLive = isUrgent ? "assertive" : "polite";

        return html`
            <div class="icon" part="icon-container" data-type=${this.type} aria-hidden="true">
                <mjo-icon
                    exportparts="icon"
                    src=${this.type === "info"
                        ? AiFillInfoCircle
                        : this.type === "warning"
                          ? AiFillWarning
                          : this.type === "error"
                            ? AiFillCloseCircle
                            : AiFillCheckCircle}
                    aria-hidden="true"
                ></mjo-icon>
            </div>
            <div class="message" part="message" role=${messageRole} aria-live=${ariaLive} aria-atomic="true">${this.message}</div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.timeOut = setTimeout(() => {
            this.#removeMessage();
        }, this.time);
    }

    close() {
        this.#removeMessage();
    }

    #removeMessage() {
        if (this.removing) return;

        clearTimeout(this.timeOut!);
        this.removing = true;

        const marginTop = window.getComputedStyle(this).marginTop;

        this.style.animation = "none";
        this.style.opacity = "1";
        this.style.marginTop = marginTop;
        this.style.transition = "margin 0.5s, opacity 0.3s";

        setTimeout(() => {
            this.style.opacity = "0";
            this.style.marginTop = `-${this.offsetHeight}px`;
        }, 20);

        setTimeout(() => {
            if (typeof this.onClose === "function") this.onClose();
            this.dispatchEvent(new CustomEvent("remove"));
            this.remove();
        }, 520);
    }

    static styles = [
        css`
            :host {
                display: flex;
                flex: 0 1 auto;
                gap: 7px;
                background-color: var(--mjo-message-background-color, var(--mjo-background-color-low, #ffffff));
                box-shadow: var(--mjo-message-box-shadow, var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1)));
                border-radius: var(--mjo-message-border-radius, var(--mjo-radius-large, 4px));
                margin: var(--mjo-message-margin-top, 15px) 0 0;
                padding: 7px 15px;
                max-width: 90vw;
                box-sizing: border-box;
                animation: slideIn 0.5s forwards;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    margin-top: -20px;
                }
                to {
                    opacity: 1;
                    margin-top: var(--mjo-message-margin-top, 15px);
                }
            }

            .icon {
                position: relative;
                display: grid;
                place-content: center;
            }
            .icon[data-type="success"] {
                color: var(--mjo-color-success);
            }
            .icon[data-type="error"] {
                color: var(--mjo-color-error);
            }
            .icon[data-type="warning"] {
                color: var(--mjo-color-warning);
            }
            .icon[data-type="info"] {
                color: var(--mjo-color-info);
            }
            mjo-icon {
                font-size: 1em;
            }
            .message {
                position: relative;
                max-width: 80vw;
                width: 200px;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-message-item": MjointMessageItem;
    }
}
