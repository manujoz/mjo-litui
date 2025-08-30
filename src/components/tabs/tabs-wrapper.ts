import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("tabs-wrapper")
export class TabsWrapper extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];

    render() {
        return html`s`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "tabs-wrapper": TabsWrapper;
    }
}
