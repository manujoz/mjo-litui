import type { DirectiveResult } from "lit/directive.js";
import { type MixinConstructor } from "../types/mixins";

import { LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { unsafeHTML, type UnsafeHTMLDirective } from "lit/directives/unsafe-html.js";

/** @prop theme */
export declare class IThemeMixin {
    theme?: Record<string, string>;

    applyThemeSsr(): DirectiveResult<typeof UnsafeHTMLDirective> | undefined;
}

export const ThemeMixin = <T extends MixinConstructor<LitElement>>(superClass: T) => {
    class ThemeMx extends superClass {
        @property({ type: Object }) theme?: Record<string, string>;

        #styleTagThemeMixin?: string;

        willUpdate(_changedProperties: PropertyValues<this>): void {
            super.willUpdate(_changedProperties);

            if (this.theme) {
                this.#setStyles();
            }
        }

        applyThemeSsr() {
            if (!this.#styleTagThemeMixin) return;

            return unsafeHTML(this.#styleTagThemeMixin);
        }

        #setStyles() {
            let cssStyles = "";
            const key = this.tagName.toLowerCase();
            for (const componentKey in this.theme) {
                const value = this.theme[componentKey];
                cssStyles += `--${this.#kamelCaseToKebabCase(key)}-${this.#kamelCaseToKebabCase(componentKey)}: ${value};`;
            }

            if (this.shadowRoot) {
                let style = this.shadowRoot?.querySelector("#mjo-theme") as HTMLStyleElement;
                if (!style) {
                    style = document.createElement("style");
                    style.setAttribute("id", "mjo-theme");
                    this.shadowRoot?.appendChild(style);
                }

                style.innerHTML = `:host{${cssStyles}}`;
                return;
            }

            this.#styleTagThemeMixin = `<style id="mjo-theme">:host{${cssStyles}}</style>`;
        }

        #kamelCaseToKebabCase(str: string) {
            return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
        }
    }

    return ThemeMx as unknown as MixinConstructor<IThemeMixin> & T;
};
