import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("mjo-ionic")
export class MjoIonic extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
                overflow: hidden;
                position: relative;
                border-radius: var(--mjo-ionic-radius, 999px);
                padding: 1px;
            }
            :host::before {
                position: absolute;
                inset: -1000%;
                content: "";
                background-image: conic-gradient(from 90deg at 50% 50%, #e2cbff 0, #393bb2 50%, #e2cbff 100%);
                background-image: conic-gradient(from 90deg at 50% 50%, #e2cbff 0, #2fec00 50%, #e2cbff 100%);
                animation: spin 2s linear infinite;
            }
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `,
    ];

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-ionic": MjoIonic;
    }
}
