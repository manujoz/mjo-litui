import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("dropdow-container")
export class DropdowContainer extends LitElement {
    render() {
        return html`<div class="container"></div>`;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .container {
                position: relative;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "dropdow-container": DropdowContainer;
    }
}
