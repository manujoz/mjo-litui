import { LitElement, PropertyValues, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillWarning, AiOutlineClose } from "mjo-icons/ai";

import "./mjo-icon.js";
import { MjoAlertClosedEvent, MjoAlertShowEvent, MjoAlertWillCloseEvent, MjoAlertWillShowEvent } from "./types/mjo-alert.js";

@customElement("mjo-alert")
export class MjoAlert extends LitElement {
    @property({ type: String }) type: "success" | "info" | "warning" | "error" = "info";
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) rounded: "none" | "small" | "medium" | "large" = "medium";
    @property({ type: String }) message: string = "";
    @property({ type: String }) detail: string | TemplateResult<1> = "";
    @property({ type: Boolean }) closable: boolean = false;
    @property({ type: Boolean }) hideIcon: boolean = false;

    // Accessibility properties
    @property({ type: String }) ariaLive: "polite" | "assertive" | "off" = "polite";
    @property({ type: Boolean }) focusOnShow: boolean = false;

    // Auto-close functionality
    @property({ type: Boolean }) autoClose: boolean = false;
    @property({ type: Number }) autoCloseDelay: number = 5000;

    // Animation properties
    @property({ type: String }) animation: "fade" | "slide" | "scale" | "none" = "fade";
    @property({ type: Number }) animationDuration: number = 300;

    // UX properties
    @property({ type: Boolean }) persistent: boolean = false;

    @state() private icon: string = "";
    @state() private autoCloseTimer: number | null = null;

    storeHeight: number = 0;
    isAnimating: boolean = false;

    render() {
        const messageId = `alert-message-${Math.random().toString(36).substring(2, 9)}`;
        const detailId = `alert-detail-${Math.random().toString(36).substring(2, 9)}`;
        const isImportant = this.type === "error" || this.type === "warning";

        return html`
            <div
                class="container"
                data-type=${this.type}
                data-size=${this.size}
                data-rounded=${this.rounded}
                data-animation=${this.animation}
                role="alert"
                aria-live=${isImportant ? "assertive" : this.ariaLive}
                aria-atomic="true"
                aria-labelledby=${messageId}
                aria-describedby=${this.detail ? detailId : nothing}
            >
                <div class="messageContainer">
                    ${!this.hideIcon && this.icon ? html`<div class="icon"><mjo-icon src=${this.icon}></mjo-icon></div>` : nothing}
                    <div class="message" id=${messageId}>${this.message}</div>
                    ${this.closable && !this.persistent ? this.#renderCloseButton() : nothing}
                </div>
                ${this.detail ? html`<div class="detail" id=${detailId} ?data-icon=${!this.hideIcon}>${this.detail}</div>` : nothing}
            </div>
        `;
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("type")) {
            if (this.type === "warning") {
                this.icon = AiFillWarning;
            } else if (this.type === "info") {
                this.icon = AiFillInfoCircle;
            } else if (this.type === "error") {
                this.icon = AiFillCloseCircle;
            } else if (this.type === "success") {
                this.icon = AiFillCheckCircle;
            } else {
                this.icon = "";
            }
        }

        // Handle auto-close
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
            this.autoCloseTimer = window.setTimeout(() => {
                this.#hide();
            }, this.autoCloseDelay);
        }
    }

    #clearAutoCloseTimer() {
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
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
        const container = this.shadowRoot?.querySelector(".container") as HTMLElement;
        if (!container || container.offsetHeight > 0 || this.isAnimating) return;

        this.#dispatchEvent("mjo-alert-will-show");

        if (this.autoClose) {
            this.#setupAutoClose();
        }

        if (this.animation === "none") {
            this.style.display = "block";
            this.#dispatchEvent("mjo-alert-show");
            return;
        }

        this.isAnimating = true;

        let animate: Animation | null = null;
        switch (this.animation) {
            case "fade":
                animate = container.animate(
                    [
                        { opacity: 0, height: "0", display: "none" },
                        { opacity: 1, height: this.storeHeight + "px", display: "block" },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
            case "slide":
                animate = container.animate(
                    [
                        { transform: "translateX(-100%)", opacity: 0, height: "0", display: "none" },
                        {
                            transform: "translateX(0)",
                            opacity: 1,
                            height: this.storeHeight + "px",
                            display: "block",
                        },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
            case "scale":
                animate = container.animate(
                    [
                        { transform: "scale(0)", opacity: 0, height: "0", display: "none" },
                        {
                            transform: "scale(1)",
                            opacity: 1,
                            height: this.storeHeight + "px",
                            display: "block",
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
            this.#dispatchEvent("mjo-alert-show");
            if (animate) animate.cancel();
            this.isAnimating = false;
        });
    }

    #hide() {
        const container = this.shadowRoot?.querySelector(".container") as HTMLElement;
        if (!container || container.offsetHeight === 0 || this.isAnimating) return;

        // Dispatch cancel event
        this.#dispatchEvent("mjo-alert-will-close");

        // Clear auto-close timer
        this.#clearAutoCloseTimer();

        // Store current focused element to restore later
        const activeElement = document.activeElement;
        const shouldRestoreFocus = this.shadowRoot?.contains(activeElement) || this === activeElement;

        if (this.animation === "none") {
            this.style.display = "none";
            this.#dispatchEvent("mjo-alert-closed");
            return;
        }

        this.isAnimating = true;
        this.storeHeight = container.offsetHeight;

        let animate: Animation | null = null;
        switch (this.animation) {
            case "fade":
                animate = container.animate(
                    [
                        { opacity: 1, height: this.storeHeight + "px" },
                        { opacity: 0, height: "0", display: "none" },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
            case "slide":
                animate = container.animate(
                    [
                        {
                            transform: "translateX(0)",
                            opacity: 1,
                            height: this.storeHeight + "px",
                        },
                        { transform: "translateX(-100%)", opacity: 0, height: "0", display: "none" },
                    ],
                    {
                        duration: this.animationDuration,
                        easing: "ease-in-out",
                        fill: "forwards",
                    },
                );
                break;
            case "scale":
                animate = container.animate(
                    [
                        {
                            transform: "scale(1)",
                            opacity: 1,
                            height: this.storeHeight + "px",
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

            this.isAnimating = false;
            this.#dispatchEvent("mjo-alert-closed");
        });
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
                text-align: left;
                --mjo-alert-space: var(--mjo-space-small);
                --mjo-alert-animation-duration: 300ms;
                overflow: hidden;
            }

            :host([hidden]) {
                display: none !important;
            }

            .container {
                position: relative;
                padding: var(--mjo-alert-space);
                transition: padding var(--mjo-alert-animation-duration);
                box-sizing: border-box;
            }

            /* Animation support */
            .container[data-animation="slide"] {
                transform-origin: left center;
            }

            .container[data-animation="scale"] {
                transform-origin: center center;
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                :host {
                    --mjo-alert-animation-duration: 0ms;
                }
                .container {
                    transition: none;
                }
            }

            /* Type-based styling */
            .container[data-type="success"] {
                background-color: var(--mjo-color-green-50);
                border: solid 1px var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            .container[data-type="error"] {
                background-color: var(--mjo-color-red-50);
                border: solid 1px var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            .container[data-type="warning"] {
                background-color: var(--mjo-color-yellow-50);
                border: solid 1px var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            .container[data-type="info"] {
                background-color: var(--mjo-color-blue-50);
                border: solid 1px var(--mjo-color-info);
                color: var(--mjo-color-info);
            }

            /* Size variants */
            .container[data-size="small"] {
                font-size: 0.8em;
                --mjo-alert-space: var(--mjo-space-xsmall);
            }
            .container[data-size="large"] {
                font-size: 1.2em;
            }

            /* Border radius */
            .container[data-rounded="small"] {
                border-radius: var(--mjo-radius-small);
            }
            .container[data-rounded="medium"] {
                border-radius: var(--mjo-radius-medium);
            }
            .container[data-rounded="large"] {
                border-radius: var(--mjo-radius-large);
            }

            /* Message container */
            .messageContainer {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                gap: var(--mjo-space-xsmall);
                align-items: flex-start;
            }

            .icon {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                align-self: stretch;
                display: grid;
                place-content: center;
            }

            .icon mjo-icon {
                font-size: 1em;
            }

            .message {
                position: relative;
                flex-grow: 1;
                flex-basis: 0;
                align-self: stretch;
                display: flex;
                align-items: center;
                word-wrap: break-word;
            }

            /* Close button styling */
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

            .close-button:focus {
                outline: 2px solid currentColor;
                outline-offset: 2px;
            }

            .close-button:active {
                transform: scale(0.95);
            }

            .close-button mjo-icon {
                font-size: 1em;
            }

            /* Detail section */
            .detail {
                position: relative;
                padding: var(--mjo-alert-space) 0 0 0;
                font-size: 0.8em;
                word-wrap: break-word;
            }

            .detail[data-icon] {
                padding-left: calc(1em + var(--mjo-space-xsmall));
            }

            /* Focus management */
            :host(:focus) {
                outline: 2px solid currentColor;
                outline-offset: 2px;
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .container {
                    border-width: 2px;
                }
                .close-button:focus {
                    outline-width: 3px;
                }
            }

            /* Dark mode considerations */
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
        "mjo-alert-will-show": MjoAlertWillShowEvent;
        "mjo-alert-will-close": MjoAlertWillCloseEvent;
        "mjo-alert-closed": MjoAlertClosedEvent;
        "mjo-alert-show": MjoAlertShowEvent;
    }
}
