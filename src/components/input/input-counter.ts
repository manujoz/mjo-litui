import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../../mjo-typography.js";

@customElement("input-counter")
export class InputCounter extends LitElement {
    @property({ type: Number }) count = 0;
    @property({ type: Number }) max?: number;
    @property({ type: Boolean }) regressive = false;

    render() {
        return html`<span role="status" aria-live="polite">
            <mjo-typography tag="none">${this.#setValue()}</mjo-typography>
        </span>`;
    }

    #setValue() {
        let value = "0";
        if (this.regressive && this.max) {
            value = String(this.max - this.count);
        } else if (this.max) {
            value = `${this.count}/${this.max}`;
        } else {
            value = String(this.count);
        }
        return value;
    }

    static styles = [
        css`
            :host {
                display: block;
                font-size: var(--mjo-textarea-helper-font-size, var(--mjo-input-helper-font-size, calc(1em * 0.8)));
                font-weight: var(--mjo-textarea-helper-font-weight, var(--mjo-input-helper-font-weight, normal));
                color: var(--mjo-textarea-helper-color, var(--mjo-input-helper-color, var(--mjo-foreground-color-low, currentColor)));
                line-height: calc(1em * 1.2);
                transition: color 0.3s;
            }
        `,
    ];
}
