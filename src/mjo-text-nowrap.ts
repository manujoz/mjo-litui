import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("mjo-text-nowrap")
export class MjoTextNowrap extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                position: relative;
                height: calc(1em * 1.25);
            }
            div {
                position: absolute;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                left: 0;
                width: 100%;
            }
            div > div {
                position: relative;
                display: inline-block;
            }
        `,
    ];

    render() {
        return html`<div>
            <div>
                <slot></slot>
            </div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-text-nowrap": MjoTextNowrap;
    }
}
