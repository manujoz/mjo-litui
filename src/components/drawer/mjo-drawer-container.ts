import { DrawerShowParams } from "../../types/mjo-drawer";
import { FocusTrap } from "../../utils/focus-trap.js";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { AiOutlineClose } from "mjo-icons/ai";

import { ScrollLock } from "../../lib/scroll.js";
import { type IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

@customElement("mjo-drawer-container")
export class MjoDrawerContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) titleMsg = "";
    @property({ type: String }) content: string | TemplateResult<1> = "";
    @property({ type: String }) label?: string;
    @property({ type: String }) initialFocus?: string;
    @property({ type: Boolean }) disabledTrapFocus = false;
    @property({ type: Boolean }) disabledRestoreFocus = false;
    @property({ type: Boolean }) disabledCloseOnEscape = false;
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    @state() isOpen = false;
    @state() position: "left" | "right" | "top" | "bottom" = "right";
    @state() blocked = false;

    // Accessibility properties
    @state() titleId = "";
    @state() contentId = "";

    @query(".background") background!: HTMLDivElement;
    @query(".container") container!: HTMLDivElement;
    @query(".close") closeButton?: HTMLElement;

    disableScrollLock = false;

    #animationDuration = 200;
    #onOpen?: () => void;
    #onClose?: () => void;
    #focusTrap?: FocusTrap;
    #scrollLock!: ScrollLock;

    render() {
        // Generate unique IDs for accessibility
        if (!this.titleId) this.titleId = `drawer-title-${Math.random().toString(36).substr(2, 9)}`;
        if (!this.contentId) this.contentId = `drawer-content-${Math.random().toString(36).substr(2, 9)}`;

        return html`
            <div class="background" part="backdrop" @click=${this.#handleClose} aria-hidden="true"></div>
            <div
                class="container"
                part="container"
                data-position=${this.position}
                role="dialog"
                aria-modal="true"
                aria-labelledby=${this.ariaLabelledby || (this.titleMsg ? this.titleId : nothing)}
                aria-describedby=${this.ariaDescribedby || this.contentId}
                aria-label=${!this.ariaLabelledby && !this.titleMsg && this.label ? this.label : nothing}
            >
                ${this.titleMsg
                    ? html`
                          <div class="title" part="title">
                              <mjo-typography
                                  id=${this.titleId}
                                  size="heading3"
                                  tag="h2"
                                  weight="medium"
                                  part="typography"
                                  exportparts="typography: typography-tag"
                              >
                                  ${this.titleMsg}
                              </mjo-typography>
                              ${this.blocked
                                  ? nothing
                                  : html`
                                        <button
                                            type="button"
                                            part="close-button"
                                            class="close"
                                            @click=${this.#handleClose}
                                            aria-label="Close drawer"
                                            tabindex="0"
                                        >
                                            <mjo-icon src=${AiOutlineClose}></mjo-icon>
                                        </button>
                                    `}
                          </div>
                      `
                    : ""}
                <div class="content" id=${this.contentId} part="content" role="document">${this.content}</div>
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#scrollLock = new ScrollLock(this);
    }

    open({ title, content, position = "right", width, height, blocked = false, animationDuration, onOpen, onClose }: DrawerShowParams) {
        if (this.isOpen) return;

        if (title) this.titleMsg = title;
        if (animationDuration) this.#animationDuration = animationDuration;
        this.content = content;
        this.blocked = blocked;
        this.position = position;

        this.container.style.width = "";
        this.container.style.height = "";

        if (width && (this.position === "left" || this.position === "right")) {
            if (typeof width === "number") {
                this.container.style.width = `${width}px`;
            } else {
                this.container.style.width = width;
            }
        }

        if (height && (this.position === "top" || this.position === "bottom")) {
            if (typeof height === "number") {
                this.container.style.height = `${height}px`;
            } else {
                this.container.style.height = height;
            }
        }

        if (typeof onOpen === "function") {
            this.#onOpen = onOpen;
        } else {
            this.#onOpen = undefined;
        }

        if (typeof onClose === "function") {
            this.#onClose = onClose;
        } else {
            this.#onClose = undefined;
        }

        this.#open();
    }

    close() {
        if (!this.isOpen) return;

        this.#close();
    }

    #handleClose() {
        if (this.blocked) return;

        this.#close();
    }

    #handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === "Escape" && !this.blocked && !this.disabledCloseOnEscape) {
            event.preventDefault();
            this.#close();
        }
    };

    #open() {
        this.isOpen = true;

        if (!this.disableScrollLock) this.#scrollLock.lock();

        this.style.display = "block";

        const translateFrom =
            this.position === "left"
                ? "translateX(calc(-100% + 30px))"
                : this.position === "right"
                  ? "translateX(calc(100% + 30px))"
                  : this.position === "top"
                    ? "translateY(calc(-100% + 30px))"
                    : "translateY(calc(100% + 30px))";

        this.background.animate([{ opacity: 0 }, { opacity: 1 }], { duration: this.#animationDuration, fill: "forwards" });
        const containerAnimation = this.container.animate([{ transform: translateFrom }, { transform: "translate(0)" }], {
            duration: this.#animationDuration,
            fill: "forwards",
        });

        containerAnimation.onfinish = () => {
            if (!this.disabledTrapFocus) {
                this.#initializeFocusTrap();
            }

            if (typeof this.#onOpen === "function") {
                this.#onOpen();
            }

            document.addEventListener("keydown", this.#handleKeyDown);
        };
    }

    #close() {
        this.isOpen = false;

        if (!this.disableScrollLock) this.#scrollLock.unlock();

        // Deactivate focus trap (this will restore inert state automatically)
        this.#deactivateFocusTrap();

        const translateTo =
            this.position === "left"
                ? "translateX(calc(-100% + 30px))"
                : this.position === "right"
                  ? "translateX(calc(100% + 30px))"
                  : this.position === "top"
                    ? "translateY(calc(-100% + 30px))"
                    : "translateY(calc(100% + 30px))";

        this.background.animate([{ opacity: 1 }, { opacity: 0 }], { duration: this.#animationDuration, fill: "forwards" });
        const containerAnimation = this.container.animate([{ transform: "translate(0)" }, { transform: translateTo }], {
            duration: this.#animationDuration,
            fill: "forwards",
        });

        containerAnimation.onfinish = () => {
            this.style.display = "none";
            if (typeof this.#onClose === "function") {
                this.#onClose();
            }
        };

        document.removeEventListener("keydown", this.#handleKeyDown);
    }

    #initializeFocusTrap(): void {
        if (!this.container) return;

        this.#focusTrap = new FocusTrap(this, {
            initialFocus: this.initialFocus,
            disabledRestoreFocus: this.disabledRestoreFocus,
        });

        this.#focusTrap.activate();
    }

    #deactivateFocusTrap(): void {
        if (this.#focusTrap) {
            this.#focusTrap.deactivate();
            this.#focusTrap = undefined;
        }
    }

    static styles = [
        css`
            :host {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                inset: 0;
            }
            .background {
                position: absolute;
                top: 0;
                left: 0;
                inset: 0;
                background-color: var(--mjo-drawer-backdrop-background-color, rgba(0, 0, 0, 0.5));
                backdrop-filter: var(--mjo-drawer-backdrop-filter, blur(5px));
            }
            .container {
                position: absolute;
                background-color: var(--mjo-drawer-background-color, var(--mjo-background-color, #fff));
                box-shadow: var(--mjo-drawer-box-shadow, var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5)));
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border: var(--mjo-drawer-border-width, 1px) solid var(--mjo-drawer-border-color, transparent);
                outline: none;
            }

            .container:focus-visible {
                outline: var(--mjo-drawer-focus-outline-width, 2px) solid var(--mjo-drawer-focus-outline-color, var(--mjo-theme-primary-color, #2563eb));
                outline-offset: var(--mjo-drawer-focus-outline-offset, -2px);
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .container {
                    border: var(--mjo-drawer-border-width, 1px) solid var(--mjo-drawer-border-color, rgba(0, 0, 0, 0.5));
                }
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .container {
                    transition: none !important;
                }
            }
            .container[data-position="left"],
            .container[data-position="right"] {
                width: var(--mjo-drawer-width, 500px);
                max-width: calc(100vw - 30px);
                height: 100vh;
                top: 0;
            }
            .container[data-position="left"] {
                left: 0;
                transform: translateX(calc(-100% + 30px));
            }
            .container[data-position="right"] {
                right: 0;
                transform: translateX(calc(100% + 30px));
            }
            .container[data-position="top"],
            .container[data-position="bottom"] {
                width: 100%;
                height: var(--mjo-drawer-height, 500px);
                max-height: calc(100vh - 30px);
                left: 0;
            }
            .container[data-position="top"] {
                top: 0;
                transform: translateY(calc(-100% + 30px));
            }
            .container[data-position="bottom"] {
                bottom: 0;
                transform: translateY(calc(100% + 30px));
            }
            .title {
                position: relative;
                margin: var(--mjo-space-small, 5px);
                padding-bottom: var(--mjo-space-xsmall, 5px);
                border-bottom: 1px solid var(--mjo-drawer-title-border-color, var(--mjo-border-color, #ccc));
                display: flex;
                flex: 0 1 auto;
            }
            .title mjo-typography {
                flex: 1 1 0;
            }
            .title .close {
                position: relative;
                display: grid;
                place-content: center;
                flex: 0 1 35px;
            }
            .title button {
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
            }
            .title mjo-icon {
                font-size: 20px;
                padding: 2px;
                transition: background-color 0.2s;
                cursor: pointer;
                border-radius: var(--mjo-drawer-close-icon-border-radius, var(--mjo-radius-small, 3px));
                color: var(--mjo-drawer-close-icon-color, var(--mjo-foreground-color, currentColor));
            }
            .title mjo-icon:hover {
                background-color: color-mix(in srgb, var(--mjo-foreground-color, currentColor) 10%, transparent);
            }
            .content {
                position: relative;
                flex: 1 1 0;
                display: flex;
                flex-direction: column;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-drawer-container": MjoDrawerContainer;
    }
}
