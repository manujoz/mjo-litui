import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { type MixinConstructor } from "../types/mixins";

/** @prop theme */
export declare class IThemeMixin {
    theme?: Record<string, string>;
}

export const ThemeMixin = <T extends MixinConstructor<LitElement>>(superClass: T) => {
    class ThemeMx extends superClass {
        @property({ type: Object }) theme?: Record<string, string>;

        cssStyles = "";

        connectedCallback(): void {
            super.connectedCallback();

            if (this.theme) {
                this.#applyTheme();
            }
        }

        #applyTheme() {
            const key = this.tagName.toLowerCase();
            for (const componentKey in this.theme) {
                const value = this.theme[componentKey];
                this.cssStyles += `--${this.#kamelCaseToKebabCase(key)}-${this.#kamelCaseToKebabCase(componentKey)}: ${value};`;
            }

            let style = this.shadowRoot?.querySelector("#mjo-theme") as HTMLStyleElement;
            if (!style) {
                style = document.createElement("style");
                style.setAttribute("id", "mjo-theme");
                this.shadowRoot?.appendChild(style);
            }

            style.innerHTML = `:host {${this.cssStyles}}`;
        }

        #kamelCaseToKebabCase(str: string) {
            return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
        }
    }

    return ThemeMx as unknown as MixinConstructor<IThemeMixin> & T;
};
