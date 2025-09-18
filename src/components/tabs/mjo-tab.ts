import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @summary Individual tab panel component that displays content when active.
 *
 * @description The mjo-tab component represents a single content panel within a tab navigation system.
 * It works in conjunction with mjo-tabs to provide organized content switching. The component
 * automatically manages its visibility based on the active state and provides proper ARIA support.
 *
 * @slot - Content to display when the tab is active
 */
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
