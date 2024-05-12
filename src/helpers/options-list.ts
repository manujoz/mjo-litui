import { type locales } from "../locales/locales.js";
import { type MjoSelect } from "../mjo-select";
import { type OptionSelect } from "./option-select";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";
import { AiOutlineSearch } from "mjo-icons/ai/AiOutlineSearch";

import "../mjo-icon.js";
import { getDictionary } from "../utils/dictionary.js";

const dictionary = getDictionary(document.querySelector("html")?.lang as keyof typeof locales);

@customElement("options-list")
export class OptionsList extends LitElement {
    @property({ type: Array }) options: OptionSelect[] = [];
    @property({ type: Object }) mjoSelect: MjoSelect | null = null;
    @property({ type: Boolean }) searchable = false;
    @property({ type: Boolean }) open = false;
    @property({ type: String }) filter = "";

    inputRef = createRef<HTMLInputElement>();
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
                          <input ${ref(this.inputRef)} type="text" placeholder=${dictionary.search} @input=${this.#hanldeInput} tabindex="0" />
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

        document.addEventListener("keydown", this.listeners.keydown);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        document.removeEventListener("keydown", this.listeners.keydown);
    }

    protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
        if (_changedProperties.has("open") && this.open) {
            this.focus();
        }
    }

    focus() {
        this.inputRef.value?.focus();
    }

    #handleInputClick(ev: Event) {
        ev.stopPropagation();
    }

    #hanldeInput(ev: InputEvent) {
        this.filter = (ev.target as HTMLInputElement).value;
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
            this.dispatchEvent(new CustomEvent("optionsblur", { bubbles: true }));
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
            this.mjoSelect?.dropdownRef.value?.close();
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
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .search {
                display: flex;
                align-items: center;
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
            }
            input:focus {
                outline: none;
            }
            .icon {
                width: 20px;
                height: 20px;
                padding: 0 0.5em;
            }
        `,
    ];
}
