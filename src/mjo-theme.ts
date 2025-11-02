import type { MjoThemeChangeEvent, MjoThemeConfig, MjoThemeModes } from "./types/mjo-theme";

import type { PropertyValues } from "lit";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { Cookies } from "./lib/cookies.js";
import { applyThemeToCssVars, mergeConfig } from "./lib/theme.js";
import { defaultTheme } from "./theme/default-theme.js";

/**
 * @summary Theme management component that applies consistent design tokens across the application and manages light/dark mode switching.
 *
 * @fires {MjoThemeChangeEvent} mjo-theme:change - Dispatched when theme mode changes
 */
@customElement("mjo-theme")
export class MjoTheme extends LitElement {
    @property({ type: String }) theme: MjoThemeModes = "light";
    @property({ type: String }) scope: "global" | "local" = "local";
    @property({ type: Object }) config: MjoThemeConfig = {};

    #isFirstUpdated = true;

    render() {
        return html`<slot></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();

        if (!Cookies.get("mjo-theme")) {
            Cookies.set("mjo-theme", this.theme, { expires: 365 });
        } else if (Cookies.get("mjo-theme") !== this.theme) {
            this.theme = Cookies.get("mjo-theme") as MjoThemeModes;
        }

        document.querySelector("html")?.classList.remove(this.theme === "light" ? "dark" : "light");
        document.querySelector("html")?.classList.add(this.theme);

        const style = document.querySelector("#mjo-theme") as HTMLStyleElement | null;
        if ((this.scope === "global" && !style) || this.scope === "local") {
            this.applyTheme();
        }
    }

    protected update(_changedProperties: PropertyValues<this>): void {
        super.update(_changedProperties);
        if ((_changedProperties.get("theme") !== undefined && _changedProperties.get("theme") !== this.theme) || _changedProperties.has("config")) {
            if (!this.#isFirstUpdated) {
                Cookies.set("mjo-theme", this.theme, { expires: 365 });
                this.applyTheme();
            }
        }
    }

    protected firstUpdated(): void {
        this.#isFirstUpdated = false;
    }

    /**
     * Sets the current theme mode
     */
    setTheme(theme: MjoThemeModes) {
        this.theme = theme;
    }

    /**
     * Toggles between light and dark theme modes
     */
    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light";
        return this.theme;
    }

    /**
     * Applies the current theme configuration to CSS variables
     */
    applyTheme() {
        let style =
            this.scope === "global"
                ? (document.querySelector("#mjo-theme") as HTMLStyleElement | null)
                : (this.shadowRoot?.querySelector("#mjo-theme") as HTMLStyleElement | null | undefined);

        const mergedConfig = structuredClone(defaultTheme);
        mergeConfig(mergedConfig, this.config);

        let cssStyles = this.scope === "global" ? ":root {" : ":host {";
        cssStyles += applyThemeToCssVars({ config: mergedConfig, themeMode: this.theme });
        cssStyles += "}";

        if (!style) {
            style = document.createElement("style");
            style.setAttribute("id", "mjo-theme");

            if (this.scope === "global") {
                document.head.appendChild(style);
            } else {
                this.shadowRoot?.appendChild(style);
            }
        }

        style.innerHTML = cssStyles;

        if (this.scope === "global") {
            document.dispatchEvent(new CustomEvent("mjo-theme:change", { detail: { theme: this.theme } }));
        }

        this.dispatchEvent(new CustomEvent("mjo-theme:change", { detail: { theme: this.theme } }));
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
