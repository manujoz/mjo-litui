import type { MjoAccordionItem } from "./components/accordion/mjo-accordion-item.js";
import {
    MjoAccordionCollapsedEvent,
    MjoAccordionExpandedEvent,
    MjoAccordionSelectionModes,
    MjoAccordionToggleEvent,
    MjoAccordionVariants,
    MjoAccordionWillCollapseEvent,
    MjoAccordionWillExpandEvent,
} from "./types/mjo-accordion.js";

import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/accordion/mjo-accordion-item.js";

@customElement("mjo-accordion")
export class MjoAccordion extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) variant: MjoAccordionVariants = "light";
    @property({ type: String }) selectionMode: MjoAccordionSelectionModes = "single";
    @property({ type: Boolean }) compact = false;

    private itemsChildren: MjoAccordionItem[] = [];

    @query(".container") private $container!: HTMLElement;

    render() {
        return html`<div class="container" role="tablist" data-variant=${this.variant} ?data-compact=${this.compact}></div>`;
    }

    firstUpdated(): void {
        this.itemsChildren = Array.from(this.querySelectorAll("mjo-accordion-item"));

        this.#mount();
    }

    updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("compact")) {
            this.itemsChildren.forEach((item) => {
                item.setCompact(this.compact);
            });
        }

        if (_changedProperties.has("variant")) {
            this.itemsChildren.forEach((item) => {
                item.setVariant(this.variant);
            });
        }
    }

    expandItem(index: number | string) {
        const item = typeof index === "number" ? this.itemsChildren[index] : this.itemsChildren.find((i) => i.id === index);

        if (item && !item.disabled) {
            item.open();
        }
    }

    collapseItem(index: number | string) {
        const item = typeof index === "number" ? this.itemsChildren[index] : this.itemsChildren.find((i) => i.id === index);

        if (item) {
            item.close();
        }
    }

    expandAll() {
        if (this.selectionMode === "multiple") {
            this.itemsChildren.forEach((item) => {
                if (!item.disabled) item.open();
            });
        }
    }

    collapseAll() {
        this.itemsChildren.forEach((item) => item.close());
    }

    focusItem(index: number) {
        if (this.itemsChildren[index] && !this.itemsChildren[index].disabled) {
            this.itemsChildren[index].focus();
        }
    }

    #handleToggle = (event: Event) => {
        const customEvent = event as MjoAccordionToggleEvent;
        const toggledItem = customEvent.detail.item;

        // In single selection mode, close other items
        if (this.selectionMode === "single") {
            this.itemsChildren.forEach((item) => {
                if (item !== toggledItem && item.expanded) {
                    item.close();
                }
            });
        }

        // Forward the event to the accordion level
        this.dispatchEvent(
            new CustomEvent("mjo-accordion:toggle", {
                detail: {
                    item: toggledItem,
                    expanded: customEvent.detail.expanded,
                    accordion: this,
                },
            }),
        );
    };

    #mount() {
        this.itemsChildren.forEach((item) => {
            this.$container.appendChild(item);
            item.setVariant(this.variant);
            item.addEventListener("mjo-accordion:toggle", this.#handleToggle);

            // Listen for granular events and forward them
            item.addEventListener("mjo-accordion:will-expand", (event) => {
                const customEvent = event as CustomEvent;
                this.dispatchEvent(
                    new CustomEvent("mjo-accordion:will-expand", {
                        detail: { ...customEvent.detail, accordion: this },
                        cancelable: true,
                        bubbles: true,
                        composed: true,
                    }),
                );
            });

            item.addEventListener("mjo-accordion:expanded", (event) => {
                const customEvent = event as CustomEvent;
                this.dispatchEvent(
                    new CustomEvent("mjo-accordion:expanded", {
                        detail: { ...customEvent.detail, accordion: this },
                        bubbles: true,
                        composed: true,
                    }),
                );
            });

            item.addEventListener("mjo-accordion:will-collapse", (event) => {
                const customEvent = event as CustomEvent;
                this.dispatchEvent(
                    new CustomEvent("mjo-accordion:will-collapse", {
                        detail: { ...customEvent.detail, accordion: this },
                        cancelable: true,
                        bubbles: true,
                        composed: true,
                    }),
                );
            });

            item.addEventListener("mjo-accordion:collapsed", (event) => {
                const customEvent = event as CustomEvent;
                this.dispatchEvent(
                    new CustomEvent("mjo-accordion:collapsed", {
                        detail: { ...customEvent.detail, accordion: this },
                        bubbles: true,
                        composed: true,
                    }),
                );
            });
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
                border-radius: var(--mjo-accordion-border-radius, var(--mjo-radius-large));
                background-color: var(--mjo-accordion-background-color, var(--mjo-background-color-high));
            }
            .container[data-variant="bordered"] {
                border-radius: var(--mjo-accordion-border-radius, var(--mjo-radius-large));
                border: 1px solid var(--mjo-accordion-border-color, var(--mjo-border-color));
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
                border-radius: var(--mjo-accordion-border-radius, var(--mjo-radius-large));
                background-color: var(--mjo-accordion-background-color, var(--mjo-background-color-high));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-accordion": MjoAccordion;
    }

    interface HTMLElementEventMap {
        "mjo-accordion:toggle": MjoAccordionToggleEvent;
        "mjo-accordion:will-expand": MjoAccordionWillExpandEvent;
        "mjo-accordion:expanded": MjoAccordionExpandedEvent;
        "mjo-accordion:will-collapse": MjoAccordionWillCollapseEvent;
        "mjo-accordion:collapsed": MjoAccordionCollapsedEvent;
    }
}
