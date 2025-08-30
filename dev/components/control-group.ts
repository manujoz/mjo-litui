import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("control-group")
export class ControlGroup extends LitElement {
    @property({ type: String }) label = "";
    @property({ type: Number }) columns = 2;

    render() {
        return html`
            <div class="control-group">
                <h4>${this.label}</h4>
                <mjo-grid columns=${this.columns} gap="10px">
                    <slot></slot>
                </mjo-grid>
            </div>
        `;
    }
    static styles = [
        css`
            :host {
                position: relative;
                display: block;
            }

            h4 {
                position: relative;
                margin: 0 0 8px 0;
                font-size: 0.9em;
                color: var(--mjo-foreground-color-low, #333);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "control-group": ControlGroup;
    }
}
