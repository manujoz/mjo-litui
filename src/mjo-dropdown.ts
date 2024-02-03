import { CSSResult, LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { type DropdowContainer } from "./mixins/dropdow-container";

import "./mixins/dropdow-container.js";

@customElement("mjo-dropdow")
export class MjoDropdown extends LitElement {
    @property({ type: Object }) html?: TemplateResult<1>;
    @property({ type: Object }) css?: CSSResult;
    @property({ type: Boolean, reflect: true }) isOpen = false;
    @property({ type: String }) behavior: "hover" | "click" = "hover";
    @property({ type: Number }) width?: number;
    @property({ type: Boolean }) preventScroll = false;

    dropdown?: DropdowContainer | null;

    #listeners = {
        open: () => {
            this.open();
        },
        close: () => {
            this.close();
        },
    };

    render() {
        return html`<slot></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.#createDropdown();

        if (this.behavior === "hover") {
            this.addEventListener("mouseenter", this.#listeners.open);
            this.dropdown?.addEventListener("mouseleave", this.#listeners.close);
        } else {
            this.addEventListener("click", this.#listeners.open);
        }
        document.addEventListener("click", this.#listeners.close);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        if (this.behavior === "hover") {
            this.removeEventListener("mouseenter", this.#listeners.open);
            this.dropdown?.removeEventListener("mouseleave", this.#listeners.close);
        } else {
            this.removeEventListener("click", this.#listeners.open);
        }
        document.removeEventListener("click", this.#listeners.close);
    }

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has("html") && this.html) {
            if (!this.dropdown) return;
            this.dropdown.html = this.html;
        }
        if (changedProperties.has("css") && this.css) {
            if (!this.dropdown) return;
            this.dropdown.css = this.css;
        }
        if (changedProperties.has("preventScroll") && this.preventScroll) {
            if (!this.dropdown) return;
            this.dropdown.preventScroll = this.preventScroll;
        }
        if (changedProperties.has("width") && this.width) {
            if (!this.dropdown) return;
            this.dropdown.style.width = `${this.width}px`;
        }

        if (changedProperties.has("isOpen")) {
            if (this.isOpen === true && changedProperties.get("isOpen") === false) {
                this.#open();
            } else if (this.isOpen === false && changedProperties.get("isOpen") === true) {
                this.#close();
            }
        }
    }

    open() {
        this.isOpen = true;
        this.dropdown?.open();
    }

    close() {
        this.isOpen = false;
        this.dropdown?.close();
    }

    #open() {}

    #close() {}

    #createDropdown() {
        this.dropdown = document.createElement("dropdow-container");
        this.dropdown.host = this;
        this.dropdown.html = this.html;
        this.dropdown.css = this.css;
        this.dropdown.preventScroll = this.preventScroll;

        if (this.width) this.dropdown.style.width = `${this.width}px`;

        document.body.appendChild(this.dropdown);
    }

    static styles = [
        css`
            :host {
                display: inline-block;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-dropdown": MjoDropdown;
    }
}
