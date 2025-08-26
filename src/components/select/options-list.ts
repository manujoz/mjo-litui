import { type locales } from "../../locales/locales.js";
import { type MjoSelect } from "../../mjo-select";
import { type MjoOption } from "./mjo-option.js";

import { LitElement, PropertyValues, css, html, isServer, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { AiOutlineSearch } from "mjo-icons/ai";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";
import { getDictionary } from "../../utils/dictionary.js";

import "../../mjo-icon.js";

@customElement("options-list")
export class OptionsList extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Array }) options: MjoOption[] = [];
    @property({ type: Object }) mjoSelect: MjoSelect | null = null;
    @property({ type: Boolean }) searchable = false;
    @property({ type: Boolean }) open = false;
    @property({ type: String }) filter = "";

    @query("input#optionsListsInputSearch") inputElement?: HTMLInputElement;
    @query(".search") searchElement?: HTMLDivElement;

    dictionary!: (typeof locales)["en"];

    listeners = {
        keydown: (ev: KeyboardEvent) => {
            this.#handleKeydown(ev);
        },
    };

    render() {
        return html`
            ${this.searchable
                ? html`<div class="search" @click=${this.#handleInputClick}>
                      <div class="input">
                          <input id="optionsListsInputSearch" type="text" placeholder=${this.dictionary.search} @input=${this.#hanldeInput} tabindex="0" />
                      </div>
                      <div class="icon">
                          <mjo-icon src=${AiOutlineSearch}></mjo-icon>
                      </div>
                  </div>`
                : nothing}
            ${repeat(
                this.options,
                (option) => option.value,
                (option) => {
                    if (
                        this.filter &&
                        !option.text.toLowerCase().includes(this.filter.toLowerCase()) &&
                        !option.value.toLowerCase().includes(this.filter.toLowerCase())
                    ) {
                        return nothing;
                    }

                    return html`${option}`;
                },
            )}
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        const lang = isServer ? "en" : (document.querySelector("html")?.lang as keyof typeof locales);
        this.dictionary = getDictionary(lang);

        document.addEventListener("keydown", this.listeners.keydown);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        document.removeEventListener("keydown", this.listeners.keydown);
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("open") && this.open) {
            this.#opened();
        }
    }

    focus() {
        this.inputElement?.focus();
    }

    resetFilter() {
        this.filter = "";
        if (this.inputElement) this.inputElement.value = "";
    }

    #handleInputClick(ev: Event) {
        ev.stopPropagation();
    }

    #hanldeInput(ev: InputEvent) {
        this.filter = (ev.target as HTMLInputElement).value;

        this.dispatchEvent(new CustomEvent("options-list.filter", { detail: { filter: this.filter } }));
    }

    #handleKeydown(ev: KeyboardEvent) {
        if (!this.mjoSelect?.isOpen()) return;

        if (ev.key === "ArrowDown") {
            ev.preventDefault();
            this.#moveDown();
        } else if (ev.key === "ArrowUp") {
            ev.preventDefault();
            this.#moveUp();
        } else if (ev.key === "Enter") {
            ev.preventDefault();
            this.#select();
        } else if (ev.key === "Tab" && this.searchable) {
            ev.preventDefault();
            this.dispatchEvent(new CustomEvent("options-list.blur", { bubbles: true }));
        }
    }

    #moveDown() {
        const options = this.options.filter(
            (option) => option.value.toLowerCase().includes(this.filter.toLowerCase()) || option.text.toLowerCase().includes(this.filter.toLowerCase()),
        );

        if (options.length === 0) return;

        let selected = options.find((option) => option.selected);
        let preselected = options.find((option) => option.preSelected);

        if (!selected) selected = options[0];
        if (!preselected && selected) preselected = selected;
        if (!preselected) preselected = options[0];

        this.options.forEach((option) => {
            option.preSelected = false;
        });

        const index = options.indexOf(preselected);
        const next = options[index + 1] || options[0];
        if (next) {
            next.preSelected = true;
        }

        this.#scrollTopOption(next);
    }

    #moveUp() {
        const options = this.options.filter(
            (option) => option.value.toLowerCase().includes(this.filter.toLowerCase()) || option.text.toLowerCase().includes(this.filter.toLowerCase()),
        );

        if (options.length === 0) return;

        let selected = options.find((option) => option.selected);
        let preselected = options.find((option) => option.preSelected);

        if (!selected) selected = options[0];
        if (!preselected && selected) preselected = selected;
        if (!preselected) preselected = options[0];

        this.options.forEach((option) => {
            option.preSelected = false;
        });

        const index = options.indexOf(preselected);
        const next = options[index - 1] || options[options.length - 1];
        if (next) {
            next.preSelected = true;
        }

        this.#scrollTopOption(next);
    }

    #opened() {
        this.focus();
        const selected = this.options.find((option) => option.selected);
        if (selected) {
            this.#scrollTopOption(selected);
        }
    }

    #scrollTopOption(option: MjoOption) {
        let top = option.offsetTop;
        const searhHeight = this.searchElement?.offsetHeight ?? 0;
        const scroll = this.mjoSelect?.dropdownElement.getScroll() ?? { top: 0, left: 0 };
        const height = this.mjoSelect?.dropdownElement.getHeigth() ?? 0;

        if (top < scroll.top + searhHeight) {
            this.mjoSelect?.dropdownElement.scrollToTop(top - searhHeight);
        } else if (top + option.offsetHeight > scroll.top + height) {
            top = top + option.offsetHeight - height;
            this.mjoSelect?.dropdownElement.scrollToTop(top);
        }
    }

    #select() {
        const selected = this.options.find((option) => option.selected);
        const preselected = this.options.find((option) => option.preSelected);

        if (selected) {
            selected.selected = false;
        }

        if (preselected) {
            preselected.selected = true;
            preselected.preSelected = false;
            this.mjoSelect?.setValue(preselected.value);
            this.mjoSelect?.focus();
            this.mjoSelect?.dropdownElement.close();
        }
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
            }

            .search {
                position: sticky;
                top: 0;
                display: flex;
                align-items: center;
                z-index: 1;
                background-color: var(--mjo-dropdown-background-color, var(--mjo-background-color-low, white));
                box-shadow: var(--mjo-dropdown-box-shadow, var(--mjo-box-shadow-1, 0px 2px 3px rgba(50, 50, 50, 0.5)));
            }
            .input {
                flex-grow: 1;
                position: relative;
            }
            input {
                width: 100%;
                padding: 0.5em;
                box-sizing: border-box;
                border: none;
                font-family: inherit;
                font-size: inherit;
                background-color: transparent;
                color: var(--mjo-foreground-color, currentColor);
            }
            input:focus {
                outline: none;
            }
            .icon {
                width: 20px;
                height: 20px;
                padding: 0 0.5em;
                color: var(--mjo-foreground-color, currentColor);
                display: flex;
                place-content: center;
            }
            .icon mjo-icon {
                font-size: 1.1em;
            }
        `,
    ];
}
