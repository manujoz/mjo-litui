import { type DropdowContainer } from "./components/dropdwon/dropdow-container";
import { type MjoTheme } from "./mjo-theme.js";

import { CSSResult, LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { searchClosestElement } from "./utils/shadow-dom.js";

import "./components/dropdwon/dropdow-container.js";

const convertToPx = (value: string | null): string | null => {
    if (value === null) return value;
    return isNaN(Number(value)) ? value : `${value}px`;
};

@customElement("mjo-dropdown")
export class MjoDropdown extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) preventScroll = false;
    @property({ type: Boolean, reflect: true }) isOpen = false;
    @property({ type: Object }) css?: CSSResult;
    @property({ type: Object }) html?: TemplateResult<1>;
    @property({ type: String }) behaviour: "hover" | "click" = "hover";
    @property({ type: String, converter: convertToPx }) width?: string;
    @property({ type: String, converter: convertToPx }) height?: string;
    @property({ type: Boolean }) preventCloseOnInnerClick = false;
    /** Optional list of CSS selectors that, if any element in the click composedPath matches, will prevent opening (only for behaviour='click'). */
    @property({ type: Array }) suppressOpenSelectors?: string[];

    dropdownContainer?: DropdowContainer | null;
    openTimestamp = 0;

    #listeners = {
        open: (ev: Event) => {
            if (this.behaviour === "click" && ev?.type === "click" && this.suppressOpenSelectors?.length) {
                const path = ev.composedPath();
                if (
                    path.some((n) => {
                        const el = n as HTMLElement;
                        if (!el || !el.matches) return false;
                        return this.suppressOpenSelectors!.some((sel) => {
                            try {
                                return el.matches(sel);
                            } catch {
                                return false;
                            }
                        });
                    })
                ) {
                    return; // suppressed
                }
            }
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
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.#removeListeners();
    }

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has("html") && this.html) {
            if (!this.dropdownContainer) return;
            this.dropdownContainer.html = this.html;
        }
        if (changedProperties.has("css") && this.css) {
            if (!this.dropdownContainer) return;
            this.dropdownContainer.css = this.css;
        }
        if (changedProperties.has("preventScroll") && this.preventScroll) {
            if (!this.dropdownContainer) return;
            this.dropdownContainer.preventScroll = this.preventScroll;
        }
        if (changedProperties.has("width") && this.width !== undefined) {
            if (!this.dropdownContainer) return;

            this.dropdownContainer.style.display = this.width;
        }

        if (changedProperties.has("behaviour") && this.behaviour !== undefined) {
            this.#removeListeners();
            this.#setListeners();
        }
    }

    #setListeners() {
        if (this.behaviour === "hover") {
            this.addEventListener("mouseenter", this.#listeners.open);
            this.dropdownContainer?.addEventListener("mouseleave", this.#listeners.close);
        } else {
            this.addEventListener("click", this.#listeners.open);
        }

        document.addEventListener("click", this.#listeners.close);
    }

    #removeListeners() {
        this.removeEventListener("mouseenter", this.#listeners.open);
        this.dropdownContainer?.removeEventListener("mouseleave", this.#listeners.close);
        this.removeEventListener("click", this.#listeners.open);
        document.removeEventListener("click", this.#listeners.close);
    }

    open() {
        this.#open();
    }

    close(ev?: Event) {
        this.#close(ev);
    }

    updatePosition() {
        this.dropdownContainer?.updatePosition();
    }

    scrollToTop(top: number) {
        this.dropdownContainer?.scrollToTop(top);
    }

    getScroll() {
        return this.dropdownContainer?.getScroll() ?? { top: 0, left: 0 };
    }

    getHeigth() {
        return this.dropdownContainer?.offsetHeight ?? 0;
    }

    #open() {
        if (this.isOpen || this.disabled) return;

        if (this.fullwidth && this.dropdownContainer) {
            this.dropdownContainer.width = `${this.offsetWidth}px`;
        }

        if (this.height && this.dropdownContainer) {
            this.dropdownContainer.height = this.height;
        }

        this.isOpen = true;
        this.dropdownContainer?.open();
        this.openTimestamp = Date.now();

        this.dispatchEvent(new CustomEvent("open"));
    }

    #close(ev?: Event) {
        if (!this.isOpen) return;
        const path = ev?.composedPath();
        const insideHost = !!path?.includes(this);
        const insideContainer = !!(this.dropdownContainer && path?.includes(this.dropdownContainer));

        if (insideHost && this.behaviour === "click" && Date.now() - this.openTimestamp < 100) return;

        if (insideContainer && this.preventCloseOnInnerClick) return;

        if (insideHost && !insideContainer) return;

        this.isOpen = false;
        this.dropdownContainer?.close();
        this.openTimestamp = 0;
        this.dispatchEvent(new CustomEvent("close"));
    }

    #createDropdown() {
        if (typeof document === "undefined") return;

        const themeElement = searchClosestElement(this as LitElement, "mjo-theme") as MjoTheme | null;

        this.dropdownContainer = document.createElement("dropdow-container");
        this.dropdownContainer.host = this;
        this.dropdownContainer.html = this.html;
        this.dropdownContainer.css = this.css;
        this.dropdownContainer.preventScroll = this.preventScroll;

        if (this.theme) this.dropdownContainer.theme = this.theme as Record<string, string>;

        if (this.width) this.dropdownContainer.style.width = this.width;

        if (themeElement) {
            const themeClone = document.createElement("mjo-theme") as MjoTheme;
            themeClone.config = themeElement.config;
            themeClone.theme = themeElement.theme;
            themeClone.scope = "local";
            themeClone.appendChild(this.dropdownContainer);
            document.body.appendChild(themeClone);
        } else {
            document.body.appendChild(this.dropdownContainer);
        }
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
