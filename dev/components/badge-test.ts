import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { AiFillAlipaySquare } from "mjo-icons/ai";

import "../../src/mjo-badge.js";
import "../../src/mjo-grid.js";

@customElement("badge-test")
export class BadgeTest extends LitElement {
    render() {
        return html`
            <mjo-grid columns="4" gap="50px">
                <div>
                    <mjo-badge value="1" label="2" size="small" color="success" variant="brilliant" show>
                        <div class="container"></div>
                    </mjo-badge>
                </div>
                <div>
                    <mjo-badge value="3" label="2" size="medium" clickable color="secondary" variant="flat" position="top-right" show animation="pulse">
                        <div class="container"></div>
                    </mjo-badge>
                </div>
                <div>
                    <mjo-badge value="3" label="2" size="large" show>
                        <div class="container"></div>
                    </mjo-badge>
                </div>
                <div>
                    <mjo-badge label=${AiFillAlipaySquare} size="medium" show>
                        <div class="container"></div>
                    </mjo-badge>
                </div>
            </mjo-grid>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            mjo-grid {
                padding: 30px;
            }
            .container {
                position: relative;
                background-color: var(--mjo-background-color-card);
                height: 60px;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "badge-test": BadgeTest;
    }
}
