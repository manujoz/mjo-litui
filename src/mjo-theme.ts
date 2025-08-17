import { MjoInputTheme, MjoThemeConfig, MjoThemeShadeStructure } from "./types/mjo-theme";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { defaultTheme } from "./theme/default-theme.js";

@customElement("mjo-theme")
export class MjoTheme extends LitElement {
    @property({ type: String }) theme: "dark" | "light" = "light";
    @property({ type: String }) scope: "global" | "local" = "local";
    @property({ type: Object }) config: MjoThemeConfig = {};

    cssStyles = "";

    render() {
        return html`<slot></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.applyTheme();
    }

    protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
        if (_changedProperties.has("theme") && _changedProperties.get("theme") && _changedProperties.get("theme") !== this.theme) {
            this.applyTheme();
        }
    }

    applyTheme() {
        this.cssStyles = this.scope === "global" ? ":root {" : ":host {";

        const mergedConfig = structuredClone(defaultTheme);
        this.#mergeConfig(mergedConfig, this.config);
        this.#applyThemeToCssVars(mergedConfig);

        this.cssStyles += "}";

        if (typeof document === "undefined" || typeof window === "undefined") return;
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

        style.innerHTML = this.cssStyles;
    }

    #applyColorsPaletteToCssVars(colors: MjoThemeConfig["colors"]) {
        for (const key in colors) {
            const value = colors[key as keyof MjoThemeConfig["colors"]] as string | MjoThemeConfig["colors"];

            if (typeof value === "object") {
                this.#applyStylesFromObject(value as MjoThemeShadeStructure, `--mjo-color-${this.#kamelCaseToKebabCase(key)}`);
            } else {
                this.cssStyles += `--mjo-color-${key}: ${value};`;
            }
        }
    }

    #applyThemeToCssVars(config: MjoThemeConfig | MjoThemeConfig["colors"] | MjoThemeConfig["dark"], prefix = "--mjo-") {
        const theme = config;

        for (const key in theme) {
            const value = (theme as MjoThemeConfig)[key as keyof MjoThemeConfig];
            if ((key === "dark" || key === "light") && this.theme !== key) {
                continue;
            }

            if (key === "colors") {
                this.#applyColorsPaletteToCssVars(value as MjoThemeConfig["colors"]);
                continue;
            }

            if (typeof value === "object" && (value as MjoThemeShadeStructure)["default"]) {
                this.#applyStylesFromObject(value as MjoThemeShadeStructure, `${prefix}${this.#kamelCaseToKebabCase(key)}`);
                continue;
            }

            if (key === "components") {
                this.#applyComponentsStyles(value as MjoThemeConfig["components"]);
                continue;
            }

            if (typeof value === "object") {
                this.#applyThemeToCssVars(value as MjoThemeConfig);
                continue;
            }

            const cssVar = `${prefix}${this.#kamelCaseToKebabCase(key)}`;

            this.cssStyles += `${cssVar}: ${value};`;
        }
    }

    #applyComponentsStyles(components: MjoThemeConfig["components"]) {
        for (const key in components) {
            const component = components[key as keyof MjoThemeConfig["components"]] as MjoInputTheme;
            for (const componentKey in component) {
                const value = component[componentKey as keyof typeof component];
                this.cssStyles += `--${this.#kamelCaseToKebabCase(key)}-${this.#kamelCaseToKebabCase(componentKey)}: ${value};`;
            }
        }
    }

    #applyStylesFromObject(color: MjoThemeShadeStructure, prefix: string) {
        for (const key in color) {
            let cssVar = `${prefix}-${this.#kamelCaseToKebabCase(key)}`;
            if (key === "default") cssVar = `${prefix}`;

            this.cssStyles += `${cssVar}: ${color[key as keyof typeof color]};`;
        }
    }

    #kamelCaseToKebabCase(str: string) {
        return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
    }

    #mergeConfig(defaultConfig: MjoThemeConfig, userConfig: MjoThemeConfig) {
        for (const key in userConfig) {
            if (typeof userConfig[key as keyof MjoThemeConfig] === "object" && defaultConfig[key as keyof MjoThemeConfig]) {
                this.#mergeConfig(defaultConfig[key as keyof MjoThemeConfig] as MjoThemeConfig, userConfig[key as keyof MjoThemeConfig] as MjoThemeConfig);
            } else {
                defaultConfig[key as keyof MjoThemeConfig["colors"]] = userConfig[key as keyof MjoThemeConfig["colors"]];
            }
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
}
