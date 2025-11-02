import type { NotificationPositions, NotificationShowParams } from "../../types/mjo-notification";
import type { MjointNotificationItem } from "./mjoint-notification-item";

import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { type IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";
import { pause } from "../../utils/utils.js";

import "./mjoint-notification-item.js";

@customElement("mjo-notification-container")
export class MjoNotificationContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) position: NotificationPositions = "top-right";
    @property({ type: Number }) threshold = 4;

    @query(".container") container!: HTMLDivElement;

    render() {
        return html`<div
            class="container"
            part="container"
            data-position=${this.position}
            role="log"
            aria-live="polite"
            aria-label="Notification messages"
        ></div>`;
    }

    async show({ message, type, time, title, onClose }: NotificationShowParams) {
        const notificationItem = document.createElement("mjoint-notification-item") as MjointNotificationItem;
        notificationItem.setAttribute(
            "exportparts",
            "notification-icon-container, notification-icon, notification-wrapper, notification-title, notification-message, close-button, icon-close",
        );
        notificationItem.message = message;
        notificationItem.type = type;
        notificationItem.notificationTitle = title;
        if (onClose) notificationItem.onClose = onClose;
        notificationItem.setAttribute("position", this.position || "top-right");

        notificationItem.style.position = "absolute";
        notificationItem.style.opacity = "0";

        if (time) notificationItem.time = time;

        const notificationItems = this.container.querySelectorAll("mjoint-notification-item");

        if (notificationItems.length === 0 || this.position.includes("bottom")) {
            this.container.appendChild(notificationItem);
        } else {
            this.container.insertBefore(notificationItem, notificationItems[0]);
        }

        await pause(30);
        this.#showItem(notificationItem);

        return notificationItem;
    }

    clearAll() {
        const notificationItems = this.container.querySelectorAll("mjoint-notification-item");
        notificationItems.forEach((item) => {
            (item as MjointNotificationItem).close();
        });
    }

    async #showItem(item: MjointNotificationItem) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            item.style.position = "relative";
            item.style.opacity = "1";
            return;
        }

        const margin = this.position.includes("top") ? parseInt(getComputedStyle(item).marginTop) : parseInt(getComputedStyle(item).marginBottom);
        const height = item.offsetHeight;

        if (this.position.includes("top")) {
            item.style.marginTop = `-${height}px`;
        } else {
            item.style.marginBottom = `-${height}px`;
        }

        item.style.transform = this.position.includes("right") ? "translateX(110%)" : "translateX(-110%)";
        const duration = "var(--mjo-notification-animation-duration, 0.3s)";
        item.style.transition = `margin ${duration}, opacity ${duration}, transform ${duration}`;

        setTimeout(() => {
            item.style.position = "relative";
            item.style.opacity = "1";
            if (this.position.includes("top")) {
                item.style.marginTop = `${margin}px`;
            } else {
                item.style.marginBottom = `${margin}px`;
            }
        }, 300);

        setTimeout(() => {
            item.style.transform = "translateX(0)";
        }, 600);

        const notificationItems = this.container.querySelectorAll("mjoint-notification-item");
        if (notificationItems.length === this.threshold + 1) {
            const index = this.position.includes("bottom") ? 0 : this.threshold;
            notificationItems[index].close();
            notificationItems[index].style.transform = this.position.includes("right") ? "translateX(110%)" : "translateX(-110%)";

            await pause(300);
            notificationItems[index].remove();
        }
    }

    static styles = [
        css`
            :host {
                position: fixed;
                top: 0;
                left: 0;
                display: flex;
                z-index: 1;
            }
            .container {
                position: fixed;
                display: flex;
                flex-direction: column;
            }
            .container[data-position="top-right"] {
                top: var(--mjo-notification-space-vertical, 0);
                right: var(--mjo-notification-space-horizontal, 15px);
            }
            .container[data-position="top-left"] {
                top: var(--mjo-notification-space-vertical, 0);
                left: var(--mjo-notification-space-horizontal, 15px);
            }
            .container[data-position="bottom-left"] {
                bottom: var(--mjo-notification-space-vertical, 0);
                left: var(--mjo-notification-space-horizontal, 15px);
            }
            .container[data-position="bottom-right"] {
                bottom: var(--mjo-notification-space-vertical, 0);
                right: var(--mjo-notification-space-horizontal, 15px);
            }

            @media (prefers-reduced-motion: reduce) {
                mjoint-notification-item {
                    transition: none !important;
                    animation: none !important;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-notification-container": MjoNotificationContainer;
    }
}
