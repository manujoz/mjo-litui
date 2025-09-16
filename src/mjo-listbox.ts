import {
    MjoListboxChangeEvent,
    MjoListboxClickEvent,
    MjoListboxItem,
    MjoListboxItemBlurEvent,
    MjoListboxItemFocusEvent,
    MjoListboxItems,
    MjoListboxSize,
    MjoListboxVariant,
} from "./types/mjo-listbox";

import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { uniqueId } from "./utils/strings.js";

import "./components/listbox/mjoint-listbox-item.js";
import "./components/listbox/mjoint-listbox-section.js";

@customElement("mjo-listbox")
export class MjoListbox extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Array }) items: MjoListboxItems = [];
    @property({ type: String }) variant: MjoListboxVariant = "solid";
    @property({ type: String }) size: MjoListboxSize = "medium";
    @property({ type: String }) selectable?: "single" | "multiple";

    @state() selectedItems: MjoListboxItems = [];

    #focusedIndex = -1;
    #uniqueId = uniqueId();

    render() {
        return html`
            ${this.applyThemeSsr()}
            <div
                id=${this.#uniqueId}
                class="container"
                data-size=${this.size}
                data-selectable=${ifDefined(this.selectable)}
                role="listbox"
                tabindex="0"
                aria-multiselectable=${this.selectable === "multiple" ? "true" : "false"}
                aria-activedescendant=${this.#getActiveDescendant()}
                @focus=${this.#handleFocus}
            >
                ${repeat(
                    this.items,
                    (item, index) => this.#getItemKey(item, index),
                    (item, index) => {
                        if (item.section) return html`<mjoint-listbox-section section=${item.section}></mjoint-listbox-section>`;
                        return html`<mjoint-listbox-item
                            id=${this.#getItemId(index)}
                            .item=${item}
                            index=${index}
                            variant=${this.variant}
                            ?selected=${this.selectedItems.includes(item)}
                            @mjo-listbox:click=${this.#handleItemClick}
                            @mjo-listbox:focus=${this.#handleItemFocus}
                            @navigate=${this.#handleItemNavigate}
                        ></mjoint-listbox-item>`;
                    },
                )}
            </div>
        `;
    }

    #getActiveDescendant() {
        if (this.#focusedIndex >= 0 && this.#focusedIndex < this.items.length) {
            const item = this.items[this.#focusedIndex];
            if (item && !item.section) {
                return this.#getItemId(this.#focusedIndex);
            }
        }
        return "";
    }

    #getItemId(index: number) {
        return `${this.#uniqueId}-item-${index}`;
    }

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

    #handleFocus = () => {
        if (this.#focusedIndex === -1) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i] && !this.items[i].disabled && !this.items[i].section) {
                    this.#focusItem(i, true);
                    break;
                }
            }
        }

        this.#focusItem(this.#focusedIndex);
    };

    #handleItemNavigate = (ev: CustomEvent) => {
        const { direction, currentIndex, home, end } = ev.detail;

        if (home) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i] && !this.items[i].disabled && !this.items[i].section) {
                    this.#focusItem(i, true);
                    break;
                }
            }
            return;
        }

        if (end) {
            for (let i = this.items.length - 1; i >= 0; i--) {
                if (this.items[i] && !this.items[i].disabled && !this.items[i].section) {
                    this.#focusItem(i, true);
                    break;
                }
            }
            return;
        }

        if (direction === 1) {
            for (let i = currentIndex + 1; i < this.items.length; i++) {
                if (this.items[i] && !this.items[i].disabled && !this.items[i].section) {
                    this.#focusItem(i, true);
                    return;
                }
            }

            for (let i = 0; i < currentIndex; i++) {
                if (this.items[i] && !this.items[i].disabled && !this.items[i].section) {
                    this.#focusItem(i, true);
                    return;
                }
            }
        }

        if (direction === -1) {
            for (let i = currentIndex - 1; i >= 0; i--) {
                if (this.items[i] && !this.items[i].disabled && !this.items[i].section) {
                    this.#focusItem(i, true);
                    return;
                }
            }

            for (let i = this.items.length - 1; i > currentIndex; i--) {
                if (this.items[i] && !this.items[i].disabled && !this.items[i].section) {
                    this.#focusItem(i, true);
                    return;
                }
            }
        }
    };

    #focusItem(index: number, visibleFocus = false) {
        this.#focusedIndex = index;

        const items = this.shadowRoot?.querySelectorAll("mjoint-listbox-item");
        if (!items || items.length === 0) return;

        for (const item of items) {
            if (item.index === index) {
                item.focus();
                if (visibleFocus) item.focused = true;
                break;
            }
        }
    }

    #handleItemFocus = (ev: MjoListboxItemFocusEvent) => {
        const { item } = ev.detail;
        if (item.disabled) return;

        this.#focusedIndex = this.items.indexOf(item);
    };

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

        this.dispatchEvent(
            new CustomEvent<MjoListboxChangeEvent["detail"]>("mjo-listbox:change", {
                detail: {
                    selectedItems: this.selectedItems,
                    selectedValues: this.selectedItems.map((item) => item.value || ""),
                },
            }),
        );
    };

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
            .container:focus-visible {
                outline: none;
            }
            .container[data-size="small"] {
                font-size: 0.9em;
            }
            .container[data-size="large"] {
                font-size: 1.1em;
            }
            .container[data-selectable] mjoint-listbox-item {
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
        "mjo-listbox:focus": MjoListboxItemFocusEvent;
        "mjo-listbox:blur": MjoListboxItemBlurEvent;
        "mjo-listbox:change": MjoListboxChangeEvent;
    }
}
