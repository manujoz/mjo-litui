import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../../mjo-typography.js";

@customElement("mjoint-listbox-section")
export class MjointListboxSection extends LitElement {
    @property({ type: String }) section = "";

    render() {
        return html`
            <div role="group" aria-label=${this.section}>
                <mjo-typography size="body2">${this.section}</mjo-typography>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            mjo-typography {
                border-bottom: solid 1px var(--mjo-listbox-section-border-color, var(--mjo-border-color, #dddddd));
                color: var(--mjo-listbox-section-color, var(--mjo-foreground-color-low, #666666));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-listbox-section": MjointListboxSection;
    }
}
