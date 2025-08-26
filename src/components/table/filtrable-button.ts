import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { MdSearch } from "mjo-icons/md";

import "../../mjo-icon.js";

@customElement("filtrable-button")
export class FiltrableButton extends LitElement {
    @property({ type: String }) columnName?: string;
    @property({ type: String }) filter?: string;
    @property({ type: String }) color: "primary" | "secondary" = "primary";

    @state() isOpen = false;

    @query("input") inputElement!: HTMLInputElement;

    render() {
        const columnName = this.columnName || "column";
        const hasActiveFilter = this.filter && this.filter.length > 0;
        const buttonLabel = hasActiveFilter ? `Clear filter for ${columnName}, currently filtering by "${this.filter}"` : `Filter ${columnName}`;

        return html`
            <search ?data-open=${this.isOpen} role="search" aria-label=${`Filter by ${columnName}`}>
                <input
                    type="hidden"
                    value=${this.filter || ""}
                    @input=${this.#handleInput}
                    aria-label=${`Filter by ${columnName}`}
                    placeholder="Filter..."
                    @blur=${this.#handleBlur}
                />
            </search>
            <button
                class="sort-button"
                type="button"
                data-color=${this.color}
                aria-label=${buttonLabel}
                aria-describedby=${ifDefined(this.columnName ? `header-${this.columnName}` : undefined)}
                aria-expanded=${this.isOpen ? "true" : "false"}
                @click=${this.#openFilter}
            >
                <mjo-icon src=${MdSearch}></mjo-icon>
            </button>
        `;
    }

    #handleInput = (ev: InputEvent) => {
        const input = ev.target as HTMLInputElement;
        this.filter = input.value;

        this.dispatchEvent(new CustomEvent("mjo-table:filter", { detail: { key: this.columnName, filter: this.filter }, bubbles: true, composed: true }));
    };

    #handleBlur = () => {
        this.inputElement.type = "hidden";

        this.isOpen = false;
    };

    #openFilter = () => {
        this.isOpen = true;

        this.inputElement.type = "text";
        this.inputElement.setSelectionRange(0, this.inputElement.value.length);
        this.inputElement.focus();
    };

    static styles = [
        css`
            :host {
                display: block;
            }
            search {
                position: absolute;
                top: 0;
                height: 100%;
                right: 0;
                width: 0;
                overflow: hidden;
                transition:
                    width 0.3s ease,
                    padding 0.3s ease;
                font-size: 1em;
                box-sizing: border-box;
            }
            search[data-open] {
                width: 100%;
            }
            search input {
                position: absolute;
                inset: 0;
                border: none;
                background-color: var(--mjo-background-color-high);
                color: var(--mjo-foreground-color);
                box-sizing: border-box;
                padding: 0 2.2em 0 0.5em;
                outline: none;
            }
            search input::placeholder {
                color: var(--mjo-foreground-color-xlow);
            }
            button {
                position: relative;
                background: transparent;
                padding: 0;
                display: grid;
                border: none;
                color: inherit;
                place-content: center;
                font-size: 1.2em;
                cursor: pointer;
                border-radius: var(--mjo-radius-small);
                transition: transform 0.2s ease;
            }
            button:hover::before,
            button:focus-visible::before {
                position: absolute;
                content: "";
                inset: 0;
                background: var(--mjo-foreground-color);
                border-radius: var(--mjo-radius-small);
                opacity: 0.2;
            }
            button:focus-visible {
                outline-width: 2px;
                outline-style: solid;
                outline-color: var(--mjo-primary-color);
            }
            button[data-color="secondary"]:focus-visible {
                outline-color: var(--mjo-secondary-color);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "filtrable-button": FiltrableButton;
    }
}
