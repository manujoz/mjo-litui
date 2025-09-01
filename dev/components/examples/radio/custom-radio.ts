import { css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { MjoRadio } from "../../../../src/mjo-radio.js";

@customElement("custom-radio")
export class CustomRadio extends MjoRadio {
    render() {
        return html`<div class="container" ?data-checked=${this.checked} @click=${this.click}>${this.label}</div>`;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .container {
                position: relative;
                height: 30px;
                width: 30px;
                display: grid;
                place-content: center;
                border-radius: 50%;
                overflow: hidden;
                cursor: pointer;
            }
            .container[data-checked] {
                background-color: var(--mjo-primary-color);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "custom-radio": CustomRadio;
    }
}
