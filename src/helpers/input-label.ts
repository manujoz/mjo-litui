import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../mjo-text-nowrap.js";

@customElement("input-label")
export class InputLabel extends LitElement {
    @property({ type: Boolean }) focused = false;
    @property({ type: Boolean }) error = false;
    @property({ type: String }) label?: string;
    @property({ type: String }) color: "primary" | "secondary" = "primary";

    render() {
        return html`${this.label
            ? html`<div class="container" data-color=${this.color} ?data-focused=${this.focused} ?data-error=${this.error}>
                  <mjo-text-nowrap>${this.label}</mjo-text-nowrap>
              </div>`
            : nothing}`;
    }
    static styles = [
        css`
            :host {
                position: relative;
                display: block;
                text-align: left;
                font-size: var(--mjo-input-label-font-size, calc(1em * 0.8));
                font-weight: var(--mjo-input-label-font-weight, normal);
                color: var(--mjo-input-label-color, currentColor);
            }
            .container {
                position: relative;
                transition: color 0.2s;
            }
            .container[data-focused] {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .container[data-error] {
                color: var(--mjo-color-error, #d81717);
            }
        `,
    ];
}
