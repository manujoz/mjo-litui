import { MjoThemeChangeEvent, MjoThemeConfig, MjoThemeModes } from "./types/mjo-theme";

import Cookies from "js-cookie";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { applyThemeToCssVars, mergeConfig } from "./lib/theme.js";
import { defaultTheme } from "./theme/default-theme.js";

@customElement("mjo-theme")
export class MjoTheme extends LitElement {
    @property({ type: String }) theme: MjoThemeModes = "light";
    @property({ type: String }) scope: "global" | "local" = "local";
    @property({ type: Object }) config: MjoThemeConfig = {};

    #isFirstUpdated = true;

    render() {
        this.#isFirstUpdated = false;

        return html`<slot></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();

        if (!Cookies.get("mjo-theme")) {
            Cookies.set("mjo-theme", this.theme, { expires: 365 });
        } else if (Cookies.get("mjo-theme") !== this.theme) {
            this.theme = Cookies.get("mjo-theme") as MjoThemeModes;
        }

        this.applyTheme();
    }

    protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
        if (_changedProperties.has("theme") && _changedProperties.get("theme") && _changedProperties.get("theme") !== this.theme) {
            if (!this.#isFirstUpdated) {
                Cookies.set("mjo-theme", this.theme, { expires: 365 });
            }

            this.applyTheme();
        }
    }

    setTheme(theme: MjoThemeModes) {
        this.theme = theme;
    }

    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light";
        return this.theme;
    }

    applyTheme() {
        const mergedConfig = structuredClone(defaultTheme);
        mergeConfig(mergedConfig, this.config);

        let cssStyles = this.scope === "global" ? ":root {" : ":host {";
        cssStyles += applyThemeToCssVars({ config: mergedConfig, themeMode: this.theme });
        cssStyles += "}";

        let style: HTMLStyleElement;
        if (this.scope === "global") {
            style = document.querySelector("#mjo-theme") as HTMLStyleElement;
            if (!style) {
                style = document.createElement("style");
                style.setAttribute("id", "mjo-theme");
                document.head.appendChild(style);
            }
        } else {
            style = this.shadowRoot?.querySelector("#mjo-theme") as HTMLStyleElement;
            if (!style) {
                style = document.createElement("style");
                style.setAttribute("id", "mjo-theme");
                this.shadowRoot?.appendChild(style);
            }
        }

        style.innerHTML = cssStyles;

        if (this.scope === "global") {
            document.dispatchEvent(new CustomEvent("mjo-theme:change", { detail: { theme: this.theme } }));
        } else {
            this.dispatchEvent(new CustomEvent("mjo-theme:change", { detail: { theme: this.theme } }));
        }
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-theme": MjoTheme;
    }

    interface HTMLElementEventMap {
        "mjo-theme:change": MjoThemeChangeEvent;
    }
}
