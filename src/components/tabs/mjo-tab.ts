import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("mjo-tab")
export class MjoTab extends LitElement {
    @property({ type: Boolean }) active = false;
    @property({ type: String }) label = "Tab";

    render() {
        return html`
            <div class="container" role="tabpanel" aria-labelledby=${`tab-${this.id}`} ?hidden=${!this.active}>
                <slot></slot>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .container {
                position: relative;
                display: block;
            }
            .container[hidden] {
                display: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-tab": MjoTab;
    }
}
