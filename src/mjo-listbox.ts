import { MjoListboxClickEvent, MjoListboxItem, MjoListboxItems, MjoListboxSize, MjoListboxVariant } from "./types/mjo-listbox";

import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";

import "./components/listbox/listbox-item.js";
import "./components/listbox/listbox-section.js";

@customElement("mjo-listbox")
export class MjoListbox extends LitElement {
    @property({ type: Array }) items: MjoListboxItems = [];
    @property({ type: String }) variant: MjoListboxVariant = "solid";
    @property({ type: String }) size: MjoListboxSize = "medium";
    @property({ type: String }) selectable?: "single" | "multiple";

    @state() selectedItems: MjoListboxItems = [];

    render() {
        return html`
            <div class="container" data-size=${this.size} data-selectable=${ifDefined(this.selectable)}>
                ${repeat(
                    this.items,
                    (item, index) => this.#getItemKey(item, index),
                    (item, index) => {
                        if (item.section) return html`<listbox-section section=${item.section}></listbox-section>`;
                        return html`<listbox-item
                            .item=${item}
                            key=${index}
                            variant=${this.variant}
                            ?selected=${this.selectedItems.includes(item)}
                            @mjo-listbox:click=${this.#handleItemClick}
                        ></listbox-item>`;
                    },
                )}
            </div>
        `;
    }

    #handleItemClick = (ev: MjoListboxClickEvent) => {
        if (!this.selectable) return;

        const { item } = ev.detail;
        if (this.selectable === "single") {
            this.selectedItems = [item];
        } else if (this.selectable === "multiple") {
            const selectedIndex = [...this.selectedItems];
            const index = selectedIndex.indexOf(item);
            if (index > -1) {
                selectedIndex.splice(index, 1);
            } else {
                selectedIndex.push(item);
            }
            this.selectedItems = selectedIndex;
        }
    };

    #getItemKey(item: MjoListboxItem, index: number) {
        if (item.section) return `${item.section}-${index}`;

        if (!item.label) {
            console.error("Listbox item label is not defined");
            return index;
        }

        if (typeof item.label === "string" || typeof item.label === "number") {
            return `${item.label}-${index}`;
        }

        return `${item.label.strings[0]}-${index}` || index;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .container {
                position: relative;
                background-color: var(--mjo-listbox-background-color);
                padding: 1px var(--mjo-space-small, 3px);
                border-radius: var(--mjo-listbox-border-radius, var(--mjo-radius-medium, 3px));
            }
            .container[data-size="small"] {
                font-size: 0.9em;
            }
            .container[data-size="large"] {
                font-size: 1.1em;
            }
            .container[data-selectable] listbox-item {
                user-select: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-listbox": MjoListbox;
    }

    interface GlobalEventHandlersEventMap {
        "mjo-listbox:click": MjoListboxClickEvent;
    }
}
