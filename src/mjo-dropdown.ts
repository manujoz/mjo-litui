import { CSSResult, LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { type DropdowContainer } from "./mixins/dropdow-container";

import "./mixins/dropdow-container.js";

@customElement("mjo-dropdown")
export class MjoDropdown extends LitElement {
    @property({ type: Object }) html?: TemplateResult<1>;
    @property({ type: Object }) css?: CSSResult;
    @property({ type: Boolean, reflect: true }) isOpen = false;
    @property({ type: String }) behavior: "hover" | "click" = "hover";
    @property({ type: Number }) width?: number;
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: Boolean }) preventScroll = false;

    dropdown?: DropdowContainer | null;
    openTimestamp = 0;

    #listeners = {
        open: () => {
            this.open();
        },
        close: (ev: Event) => {
            this.close(ev);
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
        if (changedProperties.has("width") && this.width !== undefined) {
            if (!this.dropdown) return;
            this.dropdown.width = this.width;
        }
    }

    open() {
        this.#open();
    }

    close(ev?: Event) {
        this.#close(ev);
    }

    #open() {
        if (this.isOpen) return;

        if (this.fullwidth && this.dropdown) {
            this.dropdown.width = this.offsetWidth;
        }

        this.isOpen = true;
        this.dropdown?.open();
        this.openTimestamp = Date.now();

        this.dispatchEvent(new CustomEvent("open"));
    }

    #close(ev?: Event) {
        if (this.behavior === "click" && ev?.composedPath().includes(this) && Date.now() - this.openTimestamp < 100) return;

        this.isOpen = false;
        this.dropdown?.close();
        this.openTimestamp = 0;

        this.dispatchEvent(new CustomEvent("close"));
    }

    #createDropdown() {
        this.dropdown = document.createElement("dropdow-container");
        this.dropdown.host = this;
        this.dropdown.html = this.html;
        this.dropdown.css = this.css;
        this.dropdown.preventScroll = this.preventScroll;

        if (this.width) {
            this.dropdown.style.width = `${this.width}px`;
        }

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
