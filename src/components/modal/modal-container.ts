import { ModalShowParams } from "../../types/mjo-modal";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { AiOutlineClose } from "mjo-icons/ai/AiOutlineClose.js";
import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

import "../../mjo-icon.js";
import "../../mjo-typography.js";

@customElement("modal-container")
export class ModalContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Boolean }) isOpen = false;
    @property({ type: String }) titleMsg = "";
    @property({ type: String }) content: string | TemplateResult<1> = "";

    @state() blocked = false;

    @query(".background") background!: HTMLDivElement;
    @query(".container") container!: HTMLDivElement;
    @query(".close") closeIcon?: HTMLElement;

    #animationDuration = 200;

    render() {
        return html`
            <div class="background" @click=${this.#handleClose}></div>
            ${this.blocked ? nothing : html`<mjo-icon class="close" src=${AiOutlineClose} @click=${this.#handleClose}></mjo-icon>`}
            <div class="container">
                ${this.titleMsg ? html`<mjo-typography class="title" size="heading3" tag="h5" weight="medium">${this.titleMsg}</mjo-typography>` : ""}
                <div class="content">${this.content}</div>
            </div>
        `;
    }

    show({ content, time, title, width, animationDuration, blocked = false }: ModalShowParams) {
        if (this.isOpen) return;

        if (animationDuration) this.#animationDuration = animationDuration;

        if (title) this.titleMsg = title;
        this.content = content;
        this.blocked = blocked;

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

    close() {
        if (!this.isOpen) return;

        this.#close();
    }

    #handleClose() {
        if (this.blocked) return;
        this.close();
    }

    #open() {
        this.isOpen = true;

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
    }

    #close() {
        this.isOpen = false;

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
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            .close {
                position: absolute;
                top: var(--mjo-space-small, 5px);
                right: var(--mjo-space-small, 5px);
                font-size: var(--mjo-modal-icon-close-size, 30px);
                cursor: pointer;
            }
            .title {
                position: relative;
                margin: var(--mjo-space-small, 5px);
                padding-bottom: var(--mjo-space-xsmall, 5px);
                border-bottom: 1px solid var(--mjo-modal-title-border-color, var(--mjo-border-color, #ccc));
            }
            .container {
                position: relative;
                background-color: var(--mjo-modal-background-color, var(--mjo-background-color, #fff));
                box-shadow: var(--mjo-modal-box-shadow, var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5)));
                border-radius: var(--mjo-modal-radius, var(--mjo-border-radius, 5px));
                width: var(--mjo-modal-width, 450px);
                max-width: calc(100vw - 30px);
                box-sizing: border-box;
                max-height: calc(100vh - 30px);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "modal-container": ModalContainer;
    }
}
