import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("mjoint-pagination-page-item")
export class MjointPaginationPageItem extends LitElement {
    @property({ type: Number }) page = 1;
    @property({ type: Boolean, reflect: true }) active = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";

    render() {
        return html`<button
            type="button"
            data-size=${this.size}
            data-color=${this.color}
            ?data-active=${this.active}
            ?disabled=${this.disabled}
            @click=${this.#handleClick}
            aria-current=${this.active ? "page" : "false"}
            aria-label="Go to page ${this.page}"
        >
            ${this.page}
        </button>`;
    }

    #handleClick(event: MouseEvent) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        this.dispatchEvent(
            new CustomEvent("pagination-page-click", {
                bubbles: true,
                composed: true,
                detail: {
                    page: this.page,
                    originalEvent: event,
                },
            }),
        );
    }

    static styles = [
        css`
            :host {
                display: inline-block;
            }

            button {
                background-color: transparent;
                border: solid 1px transparent;
                border-radius: var(--mjo-pagination-border-radius, var(--mjo-radius, 5px));
                color: var(--mjo-pagination-color, var(--mjo-foreground-color, #222222));
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--mjo-pagination-font-family, inherit);
                font-size: var(--mjo-pagination-font-size, 1em);
                font-weight: var(--mjo-pagination-font-weight, normal);
                line-height: 0;
                width: var(--mjo-pagination-item-width, 2em);
                min-width: var(--mjo-pagination-small-min-width, 2em);
                padding: 0;
                aspect-ratio: 1 / 1;
                position: relative;
                transition: all 0.2s ease-in-out;
                outline-color: transparent;
                outline-offset: 2px;
                outline-width: 2px;
                outline-style: solid;
            }

            button:hover:not(:disabled) {
                background-color: var(--mjo-pagination-hover-background-color, var(--mjo-primary-color-alpha1, #f5f5f5));
                color: var(--mjo-pagination-primary-color, var(--mjo-primary-color, #1aa8ed));
            }

            button:focus {
                background-color: var(--mjo-pagination-hover-background-color, var(--mjo-primary-color-alpha1, #f5f5f5));
                color: var(--mjo-pagination-primary-color, var(--mjo-primary-color, #1aa8ed));
                outline-color: var(--mjo-pagination-primary-color, var(--mjo-primary-color, #1aa8ed));
            }

            button[data-color="secondary"]:hover:not(:disabled) {
                background-color: var(--mjo-pagination-secondary-color-alpha1, var(--mjo-secondary-color-alpha1, #ffeef0));
                color: var(--mjo-pagination-secondary-color, var(--mjo-secondary-color, #7dc717));
            }

            button[data-color="secondary"]:focus {
                background-color: var(--mjo-pagination-secondary-color-alpha1, var(--mjo-secondary-color-alpha1, #ffeef0));
                color: var(--mjo-pagination-secondary-color, var(--mjo-secondary-color, #7dc717));
                outline-color: var(--mjo-pagination-secondary-color, var(--mjo-secondary-color, #7dc717));
            }

            button[data-active] {
                color: var(--mjo-pagination-primary-foreground-color, var(--mjo-primary-foreground-color, white));
                font-weight: var(--mjo-pagination-active-font-weight, 600);
            }

            button[data-active][data-color="secondary"] {
                color: var(--mjo-pagination-secondary-foreground-color, var(--mjo-secondary-foreground-color, white));
            }

            button[data-active]:hover {
                color: var(--mjo-pagination-primary-foreground-color, var(--mjo-primary-foreground-color, white));
                border-color: var(--mjo-pagination-primary-color-hover, var(--mjo-primary-color-hover, #4e9be4));
            }

            button[data-active][data-color="secondary"]:hover {
                color: var(--mjo-pagination-secondary-foreground-color, var(--mjo-secondary-foreground-color, white));
                border-color: var(--mjo-pagination-secondary-color-hover, var(--mjo-secondary-color-hover, #d86490));
            }

            button:disabled {
                color: var(--mjo-pagination-disabled-color, var(--mjo-disabled-foreground-color, #aaaaaa));
                cursor: not-allowed;
                opacity: 0.5;
            }

            button[data-size="small"] {
                font-size: var(--mjo-pagination-small-font-size, 0.8em);
            }

            button[data-size="large"] {
                font-size: var(--mjo-pagination-large-font-size, 1.2em);
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                button {
                    border-width: 2px;
                }
                button:focus {
                    outline-width: 3px;
                }
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                button {
                    transition: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-pagination-page-item": MjointPaginationPageItem;
    }
}
