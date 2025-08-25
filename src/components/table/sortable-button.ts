import { MjoTableSortDirections, MjoTableSortEvent } from "../../types/mjo-table.js";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { MdKeyboardArrowDown } from "mjo-icons/md";

import "../../mjo-icon.js";

@customElement("sortable-button")
export class SortableButton extends LitElement {
    @property({ type: String }) columnname?: string;
    @property({ type: String }) direction?: MjoTableSortDirections;

    render() {
        return html`
            <button
                class="sort-button"
                type="button"
                aria-label=${this.direction === "asc" ? "Sort descending" : "Sort ascending"}
                data-direction=${this.direction || ""}
                @click=${this.#handleSort}
                @keydown=${this.#handleKeyDown}
            >
                <mjo-icon src=${MdKeyboardArrowDown}></mjo-icon>
            </button>
        `;
    }

    #handleSort = () => {
        this.direction = this.direction === "asc" ? "desc" : "asc";

        this.dispatchEvent(
            new CustomEvent<MjoTableSortEvent["detail"]>("mjo-table:sort", {
                detail: { columnName: this.columnname, direction: this.direction },
                bubbles: true,
                composed: true,
            }),
        );
    };

    #handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.#handleSort();
        }
    };

    static styles = [
        css`
            :host {
                display: block;
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
                transform: rotate(-90deg);
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
            button[data-direction="desc"] {
                transform: rotate(-180deg);
            }
            button[data-direction="asc"] {
                transform: rotate(00deg);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "sortable-button": SortableButton;
    }
}
