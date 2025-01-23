import { NotificationPositions, NotificationTypes } from "../../types/mjo-notification";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { AiFillCheckCircle } from "mjo-icons/ai/AiFillCheckCircle.js";
import { AiFillCloseCircle } from "mjo-icons/ai/AiFillCloseCircle.js";
import { AiFillInfoCircle } from "mjo-icons/ai/AiFillInfoCircle.js";
import { AiFillWarning } from "mjo-icons/ai/AiFillWarning.js";
import { AiOutlineClose } from "mjo-icons/ai/AiOutlineClose.js";

@customElement("notification-item")
export class NotificationItem extends LitElement {
    @property({ type: String }) notificationTitle?: string = "";
    @property({ type: String }) message: string | TemplateResult<1> = "";
    @property({ type: String }) type?: NotificationTypes;
    @property({ type: Number }) time = 0;
    @property({ type: String }) position?: NotificationPositions;

    timeOut?: NodeJS.Timeout;
    removing = false;

    render() {
        return html`
            ${this.type
                ? html`
                      <div class="icon" data-type=${this.type}>
                          <mjo-icon
                              src=${this.type === "info"
                                  ? AiFillInfoCircle
                                  : this.type === "warning"
                                    ? AiFillWarning
                                    : this.type === "error"
                                      ? AiFillCloseCircle
                                      : AiFillCheckCircle}
                          ></mjo-icon>
                      </div>
                  `
                : nothing}
            <div class="container">
                ${this.notificationTitle ? html`<div class="title">${this.notificationTitle}</div>` : nothing}
                <div class="close" @click=${this.removeNotification}>
                    <mjo-icon src=${AiOutlineClose}></mjo-icon>
                </div>
                <div class="message">${this.message}</div>
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.time > 0) {
            this.timeOut = setTimeout(() => {
                this.removeNotification();
            }, this.time + 600);
        }
    }

    setPosition(position: NotificationPositions) {
        this.position = position;
    }

    removeNotification() {
        if (this.removing) return;

        this.removing = true;
        this.style.transform = this.position?.includes("right") ? "translateX(110%)" : "translateX(-110%)";

        setTimeout(() => {
            if (this.position?.includes("top")) {
                this.style.marginTop = `-${this.offsetHeight}px`;
            } else {
                this.style.marginBottom = `-${this.offsetHeight}px`;
            }
        }, 500);

        setTimeout(() => {
            this.remove();
        }, 1000);
    }

    static styles = [
        css`
            :host {
                display: flex;
                position: relative;
                max-width: 90vw;
                width: 400px;
                background-color: var(--mjo-notification-background-color, var(--mjo-background-color-low, #ffffff));
                box-shadow: var(--mjo-notification-box-shadow, var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1)));
                border-radius: var(--mjo-notification-radius, var(--mjo-radius-large, 4px));
                overflow: hidden;
            }
            :host([position="top-left"]),
            :host([position="top-right"]) {
                margin-top: var(--mjo-notification-margin, 15px);
            }
            :host([position="bottom-left"]),
            :host([position="bottom-right"]) {
                margin-bottom: var(--mjo-notification-margin, 15px);
            }

            .icon {
                position: relative;
                display: grid;
                place-content: center;
                flex: 0 0 30px;
                color: white;
            }
            .icon[data-type="success"] {
                background-color: var(--mjo-color-success);
            }
            .icon[data-type="error"] {
                background-color: var(--mjo-color-error);
            }
            .icon[data-type="warning"] {
                background-color: var(--mjo-color-warning);
            }
            .icon[data-type="info"] {
                background-color: var(--mjo-color-info);
            }
            mjo-icon {
                font-size: 18px;
            }
            .container {
                position: relative;
                min-height: 80px;
                display: flex;
                flex-direction: column;
                padding: 10px;
                flex: 1 1 0;
                gap: 5px;
            }
            .title {
                font-weight: var(--mjo-notification-title-font-weight, 500);
                color: var(--mjo-notification-title-color);
                font-size: var(--mjo-notification-title-font-size, 1em);
                flex: 0 1 auto;
                max-width: calc(100% - 28px);
            }
            .close {
                position: absolute;
                top: 9px;
                right: 10px;
                height: 24px;
                width: 24px;
                display: grid;
                place-content: center;
                transition: background-color 0.2s;
                cursor: pointer;
            }
            .close mjo-icon {
                font-size: 20px;
            }
            .close:hover {
                background-color: var(--mjo-notification-close-hover-background-color, var(--mjo-background-color-high, #f5f5f5));
                border-radius: 3px;
            }
            .message {
                position: relative;
                flex: 1 1 0;
                max-width: calc(100% - 28px);
                color: var(--mjo-notification-message-color);
                font-size: var(--mjo-notification-message-font-size, 0.9em);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "notification-item": NotificationItem;
    }
}
