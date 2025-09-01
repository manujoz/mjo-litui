import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("mjoint-pagination-ellipsis")
export class MjointPaginationEllipsis extends LitElement {
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";

    render() {
        return html`<span data-size=${this.size} aria-hidden="true" role="presentation"> … </span>`;
    }

    static styles = [
        css`
            :host {
                display: inline-block;
            }

            span {
                color: var(--mjo-pagination-ellipsis-color, var(--mjo-foreground-color-medium, #666666));
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: var(--mjo-pagination-font-family, inherit);
                font-size: var(--mjo-pagination-font-size, 1em);
                font-weight: var(--mjo-pagination-ellipsis-font-weight, normal);
                line-height: 0;
                width: var(--mjo-pagination-item-width, 2em);
                aspect-ratio: 1 / 1;
                padding: 0;
            }

            span[data-size="small"] {
                font-size: var(--mjo-pagination-small-font-size, 0.8em);
            }

            span[data-size="large"] {
                font-size: var(--mjo-pagination-large-font-size, 1.2em);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-pagination-ellipsis": MjointPaginationEllipsis;
    }
}
