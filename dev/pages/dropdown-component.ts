import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "../../src/mjo-button";
import "../../src/mjo-dropdown";

@customElement("dropdown-component")
export class DropdownComponent extends LitElement {
    render() {
        return html`
            <div class="container">
                <mjo-dropdown .html=${html` <div style="width: 200px; background-color: #444444;">Hello World!</div> `} behaviour="click">
                    <mjo-button>Click masdasda asdasd ase</mjo-button>
                </mjo-dropdown>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
                height: 200dvh;
                display: grid;
                place-content: center;
            }
            .container {
                position: relative;
                width: 300px;
                height: 200px;
                background-color: #222222;
                overflow: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "dropdown-component": DropdownComponent;
    }
}
