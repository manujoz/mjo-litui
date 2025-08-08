import type { MjoAccordionItem, MjoAccordionToggleEvent } from "./components/accordion/mjo-accordion-item.js";

import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/accordion/mjo-accordion-item.js";

@customElement("mjo-accordion")
export class MjoAccordion extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) variant: "light" | "shadow" | "bordered" | "splitted" = "light";
    @property({ type: String }) selectionMode: "single" | "multiple" = "single";
    @property({ type: Boolean }) compact = false;

    items: MjoAccordionItem[] = [];

    @query(".container") containerEl!: HTMLElement;

    render() {
        return html`<div class="container" data-variant=${this.variant} ?data-compact=${this.compact}></div>`;
    }

    firstUpdated(): void {
        this.items = Array.from(this.querySelectorAll("mjo-accordion-item"));

        this.#mount();
    }

    updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("compact")) {
            this.items.forEach((item) => {
                item.setCompact(this.compact);
            });
        }
    }

    #handleToggle = (event: Event) => {
        if (this.selectionMode === "multiple") return;

        this.items.forEach((item) => {
            if (item !== (event as MjoAccordionToggleEvent).detail.item && item.expanded) {
                item.expanded = false;
            }
        });
    };

    #mount() {
        this.items.forEach((item) => {
            this.containerEl.appendChild(item);
            item.addEventListener("toggle", this.#handleToggle);
        });
    }

    static styles = [
        css`
            :host {
                display: block;
                text-align: left;
            }

            .container {
                position: relative;
            }
            .container[data-variant="shadow"] {
                padding: 0 var(--mjo-accordion-padding, var(--mjo-space-medium));
                border-radius: var(--mjo-accordion-radius, var(--mjo-radius-large));
                background-color: var(--mjo-accordion-background-color, var(--mjo-background-color-high));
            }
            .container[data-variant="shadow"][data-compact] {
                padding: 0 var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }
            .container[data-variant="bordered"] {
                padding: 0 var(--mjo-accordion-padding, var(--mjo-space-medium));
                border-radius: var(--mjo-accordion-radius, var(--mjo-radius-large));
                border: 1px solid var(--mjo-accordion-border-color, var(--mjo-border-color));
            }
            .container[data-variant="bordered"][data-compact] {
                padding: 0 var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }
            .container[data-variant="light"] mjo-accordion-item,
            .container[data-variant="shadow"] mjo-accordion-item,
            .container[data-variant="bordered"] mjo-accordion-item {
                border-top: 1px solid var(--mjo-accordion-border-color, var(--mjo-border-color));
            }
            .container[data-variant="light"] mjo-accordion-item:first-child,
            .container[data-variant="shadow"] mjo-accordion-item:first-child,
            .container[data-variant="bordered"] mjo-accordion-item:first-child {
                border-top: none;
            }
            .container[data-variant="splitted"] {
                display: flex;
                flex-direction: column;
                gap: var(--mjo-accordion-gap, var(--mjo-space-small));
            }
            .container[data-variant="splitted"] mjo-accordion-item {
                border-radius: var(--mjo-accordion-radius, var(--mjo-radius-large));
                background-color: var(--mjo-accordion-background-color, var(--mjo-background-color-high));
                padding: 0 var(--mjo-accordion-padding, var(--mjo-space-medium));
            }
            .container[data-variant="splitted"][data-compact] mjo-accordion-item {
                padding: 0 var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-accordion": MjoAccordion;
    }
}
