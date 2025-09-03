import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "mjo-icons/ai";

import "../../mjo-icon.js";

@customElement("mjoint-pagination-nav-button")
export class MjointPaginationNavButton extends LitElement {
    @property({ type: String }) direction: "previous" | "next" | "first" | "last" = "next";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: String }) label?: string;

    render() {
        const icon = this.#getIcon();
        const ariaLabel = this.label || this.#getDefaultLabel();

        return html`<button
            type="button"
            data-size=${this.size}
            data-color=${this.color}
            data-direction=${this.direction}
            ?disabled=${this.disabled}
            @click=${this.#handleClick}
            aria-label=${ariaLabel}
        >
            <mjo-icon src=${icon} aria-hidden="true"></mjo-icon>
        </button>`;
    }

    #getIcon() {
        switch (this.direction) {
            case "first":
                return AiOutlineDoubleLeft;
            case "previous":
                return AiOutlineLeft;
            case "next":
                return AiOutlineRight;
            case "last":
                return AiOutlineDoubleRight;
            default:
                return AiOutlineRight;
        }
    }

    #getDefaultLabel() {
        switch (this.direction) {
            case "first":
                return "Go to first page";
            case "previous":
                return "Go to previous page";
            case "next":
                return "Go to next page";
            case "last":
                return "Go to last page";
            default:
                return "Navigate";
        }
    }

    #handleClick(event: MouseEvent) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        this.dispatchEvent(
            new CustomEvent("pagination-nav-click", {
                bubbles: true,
                composed: true,
                detail: {
                    direction: this.direction,
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
                border-radius: var(--mjo-pagination-border-radius, var(--mjo-radius-medium, 5px));
                color: var(--mjo-pagination-nav-color, var(--mjo-foreground-color, #222222));
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--mjo-pagination-font-family, inherit);
                font-size: var(--mjo-pagination-font-size, 1em);
                line-height: 1;
                min-width: var(--mjo-pagination-nav-min-width, 1.5em);
                padding: var(--mjo-pagination-nav-padding, 0.5em);
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
                color: var(--mjo-pagination-primary-color, var(--mjo-primary-color, #1aa8ed));
                outline-color: var(--mjo-pagination-primary-color, var(--mjo-primary-color, #1aa8ed));
            }

            button[data-color="secondary"]:hover:not(:disabled) {
                background-color: var(--mjo-pagination-secondary-color-alpha1, var(--mjo-secondary-color-alpha1, #ffeef0));
                color: var(--mjo-pagination-secondary-color, var(--mjo-secondary-color, #7dc717));
            }

            button[data-color="secondary"]:focus {
                color: var(--mjo-pagination-secondary-color, var(--mjo-secondary-color, #7dc717));
                outline-color: var(--mjo-pagination-secondary-color, var(--mjo-secondary-color, #7dc717));
            }

            button:disabled {
                color: var(--mjo-pagination-nav-disabled-color, var(--mjo-disabled-foreground-color, #aaaaaa));
                cursor: not-allowed;
                opacity: 0.5;
            }

            mjo-icon {
                font-size: 1em;
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
        "mjoint-pagination-nav-button": MjointPaginationNavButton;
    }
}
