import { MjoAlertClosedEvent, MjoAlertOpenedEvent, MjoAlertWillCloseEvent, MjoAlertWillShowEvent } from "./types/mjo-alert.js";

import { LitElement, PropertyValues, TemplateResult, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillWarning, AiOutlineClose } from "mjo-icons/ai";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-icon.js";

/**
 * @summary Alert component for displaying contextual feedback messages with multiple types, sizes, and dismissal functionality.
 *
 * @description The mjo-alert component provides a flexible way to display contextual feedback messages
 * with automatic type-based styling and icons. It supports multiple sizes, border radius options,
 * dismissal functionality, auto-close behavior, and comprehensive accessibility features including
 * screen reader support and keyboard navigation.
 *
 * @fires mjo-alert:will-show - Fired before the alert is shown
 * @fires mjo-alert:opened - Fired after the alert is shown and animation completes
 * @fires mjo-alert:will-close - Fired before the alert is closed
 * @fires mjo-alert:closed - Fired after the alert is closed and animation completes
 *
 * @csspart container - The main alert container
 * @csspart message-container - The container for the message and close button
 * @csspart icon-container - The container for the type icon
 * @csspart message - The message content area
 * @csspart detail - The detail content area
 * @csspart icon - The icon element (via exportparts from mjo-icon)
 */
@customElement("mjo-alert")
export class MjoAlert extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) type: "default" | "primary" | "secondary" | "success" | "info" | "warning" | "error" = "info";
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) rounded: "none" | "small" | "medium" | "large" | "full" = "medium";
    @property({ type: String }) variant: "solid" | "flat" = "solid";
    @property({ type: String }) icon: string = "";
    @property({ type: String }) message: string = "";
    @property({ type: String }) details: string | TemplateResult<1> = "";
    @property({ type: Boolean }) closable: boolean = false;
    @property({ type: Boolean }) hideIcon: boolean = false;
    @property({ type: Boolean }) focusOnShow: boolean = false;
    @property({ type: Boolean }) autoClose: boolean = false;
    @property({ type: Number }) autoCloseDelay: number = 5000;
    @property({ type: String }) animation: "fade" | "slide" | "scale" | "none" = "fade";
    @property({ type: Number }) animationDuration: number = 250;
    @property({ type: Boolean }) persistent: boolean = false;

    @property({ type: String }) ariaLive: "polite" | "assertive" | "off" = "polite";

    #autoCloseTimer: number | null = null;
    #storeHeight: number = 0;
    #storePadding: string = "";
    #isAnimating: boolean = false;

    render() {
        const messageId = `alert-message-${Math.random().toString(36).substring(2, 9)}`;
        const detailId = `alert-detail-${Math.random().toString(36).substring(2, 9)}`;
        const isImportant = this.type === "error" || this.type === "warning";

        return html`
            ${this.applyThemeSsr()}
            <div
                class="container"
                part="container"
                data-type=${this.type}
                data-size=${this.size}
                data-variant=${this.variant}
                data-rounded=${this.rounded}
                data-animation=${this.animation}
                role="alert"
                aria-live=${isImportant ? "assertive" : this.ariaLive}
                aria-atomic="true"
                aria-labelledby=${messageId}
                aria-describedby=${this.details ? detailId : nothing}
            >
                <div class="messageContainer" part="message-container">
                    ${!this.hideIcon && this.#iconComputed
                        ? html`<div class="icon" part="icon-container"><mjo-icon src=${this.#iconComputed} exportparts="icon: icon"></mjo-icon></div>`
                        : nothing}
                    <div class="message" id=${messageId} part="message">${this.message}</div>
                    ${this.closable && !this.persistent ? this.#renderCloseButton() : nothing}
                </div>
                ${this.details ? html`<div class="detail" id=${detailId} ?data-icon=${!this.hideIcon} part="detail">${this.details}</div>` : nothing}
            </div>
        `;
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("autoClose") || _changedProperties.has("autoCloseDelay")) {
            this.#setupAutoClose();
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (this.autoClose) {
            this.#setupAutoClose();
        }
        if (this.focusOnShow) {
            this.updateComplete.then(() => {
                this.focus();
            });
        }

        if (this.hidden) {
            this.hide();
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.#clearAutoCloseTimer();
    }

    show(): void {
        if (this.autoClose) {
            this.#setupAutoClose();
        }

        this.#show();
    }

    hide(): void {
        this.#hide();
    }

    focus(): void {
        const closeButton = this.shadowRoot?.querySelector(".close-button") as HTMLButtonElement;
        if (closeButton) {
            closeButton.focus();
        } else {
            super.focus();
        }
    }

    announce(): void {
        // Force re-announcement by temporarily changing aria-live
        const container = this.shadowRoot?.querySelector(".container") as HTMLElement;
        if (container) {
            const currentLive = container.getAttribute("aria-live");
            container.setAttribute("aria-live", "off");
            setTimeout(() => {
                container.setAttribute("aria-live", currentLive || this.ariaLive);
            }, 100);
        }
    }

    get #iconComputed(): string {
        if (this.icon) return this.icon;

        if (this.type === "info" || this.type === "default" || this.type === "primary" || this.type === "secondary") {
            return AiFillInfoCircle;
        } else if (this.type === "success") {
            return AiFillCheckCircle;
        } else if (this.type === "warning") {
            return AiFillWarning;
        } else if (this.type === "error") {
            return AiFillCloseCircle;
        }

        return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'></svg>";
    }

    #renderCloseButton() {
        return html`
            <button class="close-button" type="button" aria-label="Close alert" @click=${this.#hide} @keydown=${this.#handleCloseKeydown}>
                <mjo-icon src=${AiOutlineClose}></mjo-icon>
            </button>
        `;
    }

    #handleCloseKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.#hide();
        }
    }

    #setupAutoClose() {
        this.#clearAutoCloseTimer();
        if (this.autoClose && this.autoCloseDelay > 0) {
            this.#autoCloseTimer = window.setTimeout(() => {
                this.#hide();
            }, this.autoCloseDelay);
        }
    }

    #clearAutoCloseTimer() {
        if (this.#autoCloseTimer) {
            clearTimeout(this.#autoCloseTimer);
            this.#autoCloseTimer = null;
        }
    }

    #dispatchEvent(eventName: string, detail?: object) {
        this.dispatchEvent(
            new CustomEvent(eventName, {
                detail: { element: this, ...detail },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #show() {
        const $container = this as HTMLElement;
        if (!$container || $container.offsetHeight > 0 || this.#isAnimating) return;

        this.#dispatchEvent("mjo-alert:will-show");

        if (this.autoClose) {
            this.#setupAutoClose();
        }

        if (this.animation === "none") {
            this.style.display = "block";
            this.#dispatchEvent("mjo-alert:opened");
            return;
        }

        this.#isAnimating = true;

        let animate: Animation | null = null;
        switch (this.animation) {
            case "fade":
                animate = $container.animate(
                    [
                        { opacity: 0, display: "none", padding: "0" },
                        { opacity: 1, display: "block" },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
            case "slide":
                animate = $container.animate(
                    [
                        { opacity: 0, height: 0, display: "none" },
                        { opacity: 1, height: this.#storeHeight + "px", display: "block" },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
            case "scale":
                animate = $container.animate(
                    [
                        { transform: "scale(0)", opacity: 0, height: "0", display: "none" },
                        {
                            transform: "scale(1)",
                            opacity: 1,
                            height: this.#storeHeight + "px",
                            display: "block",
                            padding: this.#storePadding,
                        },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
        }

        animate.finished.then(() => {
            this.#dispatchEvent("mjo-alert:opened");
            if (animate) animate.cancel();
            this.#isAnimating = false;
        });
    }

    #hide() {
        const $container = this as HTMLElement;
        if (!$container || this.#isAnimating || ($container.offsetHeight === 0 && !this.hidden)) return;

        // Dispatch cancel event
        this.#dispatchEvent("mjo-alert:will-close");

        // Clear auto-close timer
        this.#clearAutoCloseTimer();

        // Store current focused element to restore later
        const activeElement = document.activeElement;
        const shouldRestoreFocus = this.shadowRoot?.contains(activeElement) || this === activeElement;

        if (this.animation === "none") {
            this.style.display = "none";
            this.#dispatchEvent("mjo-alert:closed");
            return;
        }

        this.#isAnimating = true;
        this.#storeHeight = $container.offsetHeight;

        let animate: Animation | null = null;
        switch (this.animation) {
            case "fade":
                animate = $container.animate([{ opacity: 1 }, { opacity: 0, display: "none" }], {
                    duration: this.animationDuration,
                    easing: "ease-in-out",
                    fill: "forwards",
                });
                break;
            case "slide":
                animate = $container.animate(
                    [
                        { opacity: 1, height: this.#storeHeight + "px" },
                        { opacity: 0, height: "0", display: "none" },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
            case "scale":
                animate = $container.animate(
                    [
                        {
                            transform: "scale(1)",
                            opacity: 1,
                            height: this.#storeHeight + "px",
                            padding: this.#storePadding,
                        },
                        { transform: "scale(0)", opacity: 0, height: "0", display: "none" },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
        }

        animate?.finished.then(() => {
            // Restore focus if needed
            if (shouldRestoreFocus) {
                const nextFocusable = this.nextElementSibling || this.previousElementSibling || this.parentElement;
                if (nextFocusable && nextFocusable instanceof HTMLElement) {
                    nextFocusable.focus();
                }
            }

            this.#isAnimating = false;
            this.removeAttribute("hidden");
            this.#dispatchEvent("mjo-alert:closed");
        });
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
                text-align: left;
                --mjoint-alert-space: var(--mjo-space-small);
                overflow: hidden;
            }
            :host(:focus-visible) {
                outline: 2px solid currentColor;
                outline-offset: 2px;
            }
            :host([hidden]) {
                display: none !important;
            }
            .container {
                position: relative;
                padding: var(--mjoint-alert-space);
                box-sizing: border-box;
            }
            .container[data-animation="slide"] {
                transform-origin: left center;
            }
            .container[data-animation="scale"] {
                transform-origin: center center;
            }
            .container[data-type="default"] {
                background-color: transparent;
                border: solid var(--mjo-alert-border-width, 3px) var(--mjo-border-color);
                color: var(--mjo-foreground-color);
            }
            .container[data-type="primary"] {
                background-color: var(--mjo-primary-color-50);
                border: solid var(--mjo-alert-border-width, 3px) var(--mjo-primary-color);
                color: var(--mjo-primary-color);
            }
            .container[data-type="secondary"] {
                background-color: var(--mjo-secondary-color-50);
                border: solid var(--mjo-alert-border-width, 3px) var(--mjo-secondary-color);
                color: var(--mjo-secondary-color);
            }
            .container[data-type="success"] {
                background-color: var(--mjo-color-green-50);
                border: solid var(--mjo-alert-border-width, 3px) var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            .container[data-type="error"] {
                background-color: var(--mjo-color-red-50);
                border: solid var(--mjo-alert-border-width, 3px) var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            .container[data-type="warning"] {
                background-color: var(--mjo-color-yellow-50);
                border: solid var(--mjo-alert-border-width, 3px) var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            .container[data-type="info"] {
                background-color: var(--mjo-color-blue-50);
                border: solid var(--mjo-alert-border-width, 3px) var(--mjo-color-info);
                color: var(--mjo-color-info);
            }
            .container[data-variant="flat"][data-type="default"] {
                background-color: color-mix(in srgb, var(--mjo-border-color) 10%, transparent);
                border: none;
            }
            .container[data-variant="flat"][data-type="primary"] {
                background-color: color-mix(in srgb, var(--mjo-primary-color) 10%, transparent);
                border: none;
            }
            .container[data-variant="flat"][data-type="secondary"] {
                background-color: color-mix(in srgb, var(--mjo-secondary-color) 10%, transparent);
                border: none;
            }
            .container[data-variant="flat"][data-type="success"] {
                background-color: color-mix(in srgb, var(--mjo-color-success) 10%, transparent);
                border: none;
            }
            .container[data-variant="flat"][data-type="error"] {
                background-color: color-mix(in srgb, var(--mjo-color-error) 10%, transparent);
                border: none;
            }
            .container[data-variant="flat"][data-type="warning"] {
                background-color: color-mix(in srgb, var(--mjo-color-warning) 10%, transparent);
                border: none;
            }
            .container[data-variant="flat"][data-type="info"] {
                background-color: color-mix(in srgb, var(--mjo-color-info) 10%, transparent);
                border: none;
            }
            .container[data-size="small"] {
                font-size: 0.8em;
                --mjoint-alert-space: var(--mjo-space-xsmall);
            }
            .container[data-size="large"] {
                font-size: 1.2em;
            }
            .container[data-rounded="small"] {
                border-radius: var(--mjo-radius-small);
            }
            .container[data-rounded="medium"] {
                border-radius: var(--mjo-radius-medium);
            }
            .container[data-rounded="large"] {
                border-radius: var(--mjo-radius-large);
            }
            .container[data-rounded="full"] {
                border-radius: 9999px;
            }
            .messageContainer {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                gap: var(--mjo-space-medium);
                align-items: center;
            }
            .icon {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                align-self: stretch;
                display: grid;
                place-content: center;
                border-radius: 50%;
                width: 2.2em;
                aspect-ratio: 1 / 1;
            }
            .container[data-type="default"] .icon {
                background-color: color-mix(in srgb, var(--mjo-border-color) 25%, transparent);
            }
            .container[data-type="primary"] .icon {
                background-color: color-mix(in srgb, var(--mjo-primary-color) 25%, transparent);
            }
            .container[data-type="secondary"] .icon {
                background-color: color-mix(in srgb, var(--mjo-secondary-color) 25%, transparent);
            }
            .container[data-type="info"] .icon {
                background-color: color-mix(in srgb, var(--mjo-color-info) 25%, transparent);
            }
            .container[data-type="success"] .icon {
                background-color: color-mix(in srgb, var(--mjo-color-success) 25%, transparent);
            }
            .container[data-type="warning"] .icon {
                background-color: color-mix(in srgb, var(--mjo-color-warning) 25%, transparent);
            }
            .container[data-type="error"] .icon {
                background-color: color-mix(in srgb, var(--mjo-color-error) 25%, transparent);
            }
            .icon mjo-icon {
                font-size: 1.5em;
            }
            .message {
                position: relative;
                flex-grow: 1;
                flex-basis: 0;
                align-self: stretch;
                display: flex;
                align-items: center;
                word-wrap: break-word;
                font-weight: var(--mjo-alert-message-font-weight, 600);
            }
            .close-button {
                background: none;
                border: none;
                padding: 0;
                margin: 0;
                cursor: pointer;
                color: inherit;
                font-size: inherit;
                display: grid;
                place-content: center;
                border-radius: var(--mjo-radius-small);
                transition: all 0.2s ease;
                min-width: 1.5em;
                min-height: 1.5em;
            }
            .close-button:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
            .container[data-type="info"] .icon,
            .container[data-type="info"] .close-button:hover {
                background-color: color-mix(in srgb, var(--mjo-color-info) 25%, transparent);
            }
            .container[data-type="success"] .icon,
            .container[data-type="success"] .close-button:hover {
                background-color: color-mix(in srgb, var(--mjo-color-success) 25%, transparent);
            }
            .container[data-type="warning"] .icon,
            .container[data-type="warning"] .close-button:hover {
                background-color: color-mix(in srgb, var(--mjo-color-warning) 25%, transparent);
            }
            .container[data-type="error"] .icon,
            .container[data-type="error"] .close-button:hover {
                background-color: color-mix(in srgb, var(--mjo-color-error) 25%, transparent);
            }
            .close-button:focus-visible {
                outline: 2px solid currentColor;
                outline-offset: 2px;
            }
            .close-button mjo-icon {
                font-size: 1.2em;
            }
            .detail {
                position: relative;
                padding: var(--mjoint-alert-space) 0 0 0;
                font-size: 0.9em;
                word-wrap: break-word;
            }
            .detail[data-icon] {
                padding-left: calc(3.1em + var(--mjo-space-xsmall));
            }
            @media (prefers-reduced-motion: reduce) {
                :host {
                    --mjo-alert-animation-duration: 0ms;
                }
                .container {
                    transition: none;
                }
            }
            @media (prefers-contrast: high) {
                .container {
                    border-width: 2px;
                }
                .close-button:focus-visible {
                    outline-width: 3px;
                }
            }
            @media (prefers-color-scheme: dark) {
                .close-button:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-alert": MjoAlert;
    }

    interface HTMLElementEventMap {
        "mjo-alert:will-show": MjoAlertWillShowEvent;
        "mjo-alert:will-close": MjoAlertWillCloseEvent;
        "mjo-alert:closed": MjoAlertClosedEvent;
        "mjo-alert:opened": MjoAlertOpenedEvent;
    }
}
