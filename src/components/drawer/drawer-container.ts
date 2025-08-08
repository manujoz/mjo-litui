import { DrawerShowParams } from "../../types/mjo-drawer";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { AiOutlineClose } from "mjo-icons/ai";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

@customElement("drawer-container")
export class DrawerContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) titleMsg = "";
    @property({ type: String }) content: string | TemplateResult<1> = "";

    @state() isOpen = false;
    @state() position: "left" | "right" | "top" | "bottom" = "right";
    @state() blocked = false;

    @query(".background") background!: HTMLDivElement;
    @query(".container") container!: HTMLDivElement;

    #animationDuration = 200;
    #onOpen?: () => void;
    #onClose?: () => void;

    render() {
        return html`
            <div class="background" @click=${this.#handleClose}></div>
            <div class="container" data-position=${this.position}>
                ${this.titleMsg
                    ? html`
                          <div class="title">
                              <mjo-typography size="heading3" tag="h5" weight="medium">${this.titleMsg}</mjo-typography>
                              ${this.blocked
                                  ? nothing
                                  : html`
                                        <div class="close" @click=${this.#handleClose}>
                                            <mjo-icon src=${AiOutlineClose} @click=${this.#handleClose}></mjo-icon>
                                        </div>
                                    `}
                          </div>
                      `
                    : ""}
                <div class="content">${this.content}</div>
            </div>
        `;
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

    #open() {
        this.isOpen = true;

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
            if (typeof this.#onOpen === "function") {
                this.#onOpen();
            }
        };
    }

    #close() {
        this.isOpen = false;

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
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            .container {
                position: absolute;
                background-color: var(--mjo-drawer-background-color, var(--mjo-background-color, #fff));
                box-shadow: var(--mjo-drawer-box-shadow, var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5)));
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
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
                width: 100vw;
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
            .title mjo-icon {
                font-size: 20px;
                padding: 2px;
                transition: background-color 0.2s;
                cursor: pointer;
                border-radius: var(--mjo-radius-small, 3px);
            }
            .title mjo-icon:hover {
                background-color: var(--mjo-background-color-high, #ffffff);
            }
            .content {
                position: relative;
                flex: 1 1 0;
                display: flex;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "drawer-container": DrawerContainer;
    }
}
