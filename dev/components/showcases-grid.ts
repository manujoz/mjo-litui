import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../../src/mjo-grid.js";

@customElement("showcases-grid")
export class ShowcasesGrid extends LitElement {
    @property({ type: String }) label?: string;
    @property({ type: Number }) columns = 1;

    render() {
        return html`
            <div class="container">
                ${this.label && this.columns === 1 ? html`<h4>${this.label}</h4>` : nothing}
                <mjo-grid columns=${this.columns}>
                    <slot></slot>
                </mjo-grid>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .container {
                background-color: var(--mjo-background-color-card-low, #f9f9f9);
                padding: 12px;
                border-radius: var(--mjo-radius-large);
            }
            h4 {
                margin: 0 0 8px;
                font-size: 1em;
                padding: 0 0 4px 0;
                border-bottom: solid 2px var(--mjo-border-color-low, #eee);
                color: var(--mjo-foreground-color-low, #333);
                font-weight: 600;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "showcases-grid": ShowcasesGrid;
    }
}
