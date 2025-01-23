import type { MjoAccordionItem } from "./components/accordion/mjo-accordion-item.js";

import { LitElement, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/accordion/mjo-accordion-item.js";

@customElement("mjo-accordion")
export class MjoAccordion extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) variant: "light" | "shadow" | "bordered" | "splitted" = "light";
    @property({ type: String }) selectionMode: "single" | "multiple" = "single";
    @property({ type: Boolean }) compact = false;

    @state() items: MjoAccordionItem[] = [];

    render() {
        return nothing;
    }

    firstUpdated(): void {
        this.items = Array.from(this.querySelectorAll("mjo-accordion-item"));

        this.#mount();
    }

    #mount() {
        this.items.forEach((item) => {
            this.shadowRoot?.appendChild(item);
        });
    }

    static styles = [
        css`
            :host {
                display: block;
                text-align: left;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-accordion": MjoAccordion;
    }
}
