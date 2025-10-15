import { ModalShowParams } from "../../types/mjo-modal";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { AiOutlineClose } from "mjo-icons/ai";
import { ScrollLock } from "../../lib/scroll.js";
import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";
import { FocusTrap } from "../../utils/focus-trap.js";

import "../../mjo-icon.js";
import "../../mjo-typography.js";

/**
 * Internal container component for the modal system.
 * This component is created and managed by the ModalController and should not be used directly.
 *
 * @internal
 */
@customElement("mjo-modal-container")
export class MjoModalContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Boolean }) isOpen = false;
    @property({ type: String }) titleMsg = "";
    @property({ type: String }) content: string | TemplateResult<1> = "";
    @property({ type: String }) closePosition: "out" | "in" = "in";

    // Accessibility properties
    @property({ type: String }) ariaLabelledby?: string;
    @property({ type: String }) ariaDescribedby?: string;
    @property({ type: String }) label?: string;
    @property({ type: Boolean }) disabledTrapFocus = false;
    @property({ type: Boolean }) disabledRestoreFocus = false;
    @property({ type: Boolean }) disabledCloseOnEscape = false;
    @property({ type: Boolean }) disableScrollLock = false;
    @property({ type: String }) initialFocus?: string;

    @state() blocked = false;

    @query(".background") background!: HTMLDivElement;
    @query(".container") container!: HTMLDivElement;
    @query(".close") closeIcon?: HTMLElement;

    onClose?: () => void;
    #animationDuration = 200;
    #focusTrap?: FocusTrap;
    #scrollLock!: ScrollLock;

    render() {
        return html`
            <div class="background" part="backdrop" @click=${this.#handleClose}></div>
            ${!this.blocked && this.closePosition === "out"
                ? html`<mjo-icon
                      exportparts="icon: icon-close-out"
                      class="closeOut"
                      src=${AiOutlineClose}
                      @click=${this.#handleClose}
                      @keydown=${this.#handleKeyDown}
                      tabindex="0"
                      role="button"
                      aria-label="Close modal"
                  ></mjo-icon>`
                : nothing}
            <div
                class="container"
                part="container"
                role="dialog"
                aria-modal="true"
                aria-labelledby=${this.ariaLabelledby || nothing}
                aria-describedby=${this.ariaDescribedby || nothing}
                aria-label=${!this.ariaLabelledby && (this.label || this.titleMsg) ? this.label || this.titleMsg : nothing}
            >
                ${this.titleMsg
                    ? html`
                          <mjo-typography class="title" part="title" exportparts="typography: title-tag" size="heading3" tag="h5" weight="medium">
                              ${this.titleMsg}
                          </mjo-typography>
                      `
                    : ""}
                <div class="content" part="content">${this.content}</div>
                ${!this.blocked && this.closePosition === "in"
                    ? html`<div class="closeIn" part="icon-close-container">
                          <mjo-icon
                              exportparts="icon: icon-close-in"
                              class="close"
                              @click=${this.#handleClose}
                              @keydown=${this.#handleKeyDown}
                              tabindex="0"
                              role="button"
                              aria-label="Close modal"
                              src=${AiOutlineClose}
                          ></mjo-icon>
                      </div>`
                    : nothing}
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#scrollLock = new ScrollLock(this);
    }

    /**
     * Opens the modal with the specified configuration and content
     */
    show({ content, time, title, width, animationDuration, blocked = false, closePosition = "in", onClose }: ModalShowParams) {
        if (this.isOpen) return;

        if (animationDuration) this.#animationDuration = animationDuration;

        if (title) this.titleMsg = title;

        if (onClose) this.onClose = onClose;
        this.content = content;
        this.blocked = blocked;
        this.closePosition = closePosition;

        if (width) {
            if (typeof width === "number") {
                this.container.style.width = `${width}px`;
            } else {
                this.container.style.width = width;
            }
        }

        this.#open();

        if (time) {
            setTimeout(() => {
                this.close();
            }, time);
        }
    }

    /**
     * Closes the modal with animation and cleanup
     */
    close() {
        if (!this.isOpen) return;

        this.#close();
    }

    #handleClose() {
        if (this.blocked) return;
        this.close();
    }

    #handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.#handleClose();
        }
    }

    #handleGlobalKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && !this.disabledCloseOnEscape && !this.blocked) {
            event.preventDefault();
            this.close();
        }
    };

    #open() {
        this.isOpen = true;

        // Manage body scroll
        if (!this.disableScrollLock) this.#scrollLock.lock(true);

        // Add global keyboard listener
        document.addEventListener("keydown", this.#handleGlobalKeyDown);

        this.style.display = "grid";

        this.background.animate([{ opacity: 0 }, { opacity: 1 }], { duration: this.#animationDuration, fill: "forwards" });
        this.closeIcon?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: this.#animationDuration, fill: "forwards" });
        this.container.animate(
            [
                { transform: "translateY(-50px) scale(0.8)", opacity: 0 },
                { transform: "translateY(0) scale(1)", opacity: 1 },
            ],
            { duration: this.#animationDuration, fill: "forwards" },
        );

        // Setup focus trap after animation
        setTimeout(() => {
            if (!this.disabledTrapFocus) {
                this.#focusTrap = new FocusTrap(this, {
                    initialFocus: this.initialFocus,
                    disabledRestoreFocus: this.disabledRestoreFocus,
                });
                this.#focusTrap.activate();
            }
        }, this.#animationDuration);
    }

    #close() {
        this.isOpen = false;

        // Cleanup focus trap
        if (this.#focusTrap) {
            this.#focusTrap.deactivate();
            this.#focusTrap = undefined;
        }

        // Remove global keyboard listener
        document.removeEventListener("keydown", this.#handleGlobalKeyDown);

        // Restore body scroll
        if (!this.disableScrollLock) this.#scrollLock.unlock();

        this.background.animate([{ opacity: 1 }, { opacity: 0 }], { duration: this.#animationDuration, fill: "forwards" });
        this.closeIcon?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: this.#animationDuration, fill: "forwards" });
        this.container.animate(
            [
                { transform: "translateY(0) scale(1)", opacity: 1 },
                { transform: "translateY(50px) scale(0.8)", opacity: 0 },
            ],
            { duration: this.#animationDuration, fill: "forwards" },
        );

        setTimeout(() => {
            if (typeof this.onClose === "function") this.onClose();
            this.style.display = "none";
        }, this.#animationDuration);
    }

    static styles = [
        css`
            :host {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                inset: 0;
                place-items: center;
            }
            .background {
                position: absolute;
                top: 0;
                left: 0;
                inset: 0;
                background-color: var(--mjo-modal-backdrop-background-color, rgba(0, 0, 0, 0.5));
                backdrop-filter: var(--mjo-modal-backdrop-filter, blur(5px));
            }
            .closeOut {
                position: absolute;
                top: var(--mjo-space-small, 5px);
                right: var(--mjo-space-small, 5px);
                font-size: var(--mjo-modal-icon-close-size, 30px);
                color: white;
                cursor: pointer;
            }
            .closeIn {
                position: absolute;
                top: var(--mjo-modal-icon-close-offset, 5px);
                right: var(--mjo-modal-icon-close-offset, 5px);
            }
            .closeIn mjo-icon {
                font-size: var(--mjo-modal-icon-close-size, 16px);
                vertical-align: middle;
                cursor: pointer;
                transition: background-color 0.3s;
                padding: 2px;
            }
            .closeIn mjo-icon:hover {
                background-color: var(--mjo-modal-icon-close-background-color-hover, rgba(0, 0, 0, 0.5));
            }
            .container {
                position: relative;
                background-color: var(--mjo-modal-background-color, var(--mjo-background-color, #fff));
                box-shadow: var(--mjo-modal-box-shadow, var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5)));
                border-radius: var(--mjo-modal-border-radius, var(--mjo-border-radius, 5px));
                width: var(--mjo-modal-width, 450px);
                max-width: calc(100vw - 30px);
                box-sizing: border-box;
                max-height: calc(100vh - 30px);
                display: flex;
                flex-direction: column;
            }
            .title {
                position: relative;
                margin: var(--mjo-space-small, 5px);
                padding-bottom: var(--mjo-space-xsmall, 5px);
                border-bottom: 1px solid var(--mjo-modal-title-border-color, var(--mjo-border-color, #ccc));
                flex: 0 1 0;
            }
            .content {
                position: relative;
                overflow: auto;
                flex: 1 1 auto;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-modal-container": MjoModalContainer;
    }
}
