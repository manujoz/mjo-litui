import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { AiFillAlipaySquare } from "mjo-icons/ai";

import "../../src/mjo-avatar.js";
import "../../src/mjo-badge.js";
import "../../src/mjo-grid.js";

@customElement("badge-component")
export class BadgeComponent extends LitElement {
    render() {
        return html`
            <mjo-grid columns="4" gap="50px">
                <div>
                    <mjo-badge value="1" label="2" size="small" color="success" variant="brilliant" show>
                        <mjo-avatar radius="large" size="large" src="https://i.pravatar.cc/150?img=16" name="Juliet"></mjo-avatar>
                    </mjo-badge>
                </div>
                <div>
                    <mjo-badge value="3" label="2" size="medium" color="secondary" variant="flat" show>
                        <mjo-avatar radius="large" size="large" src="https://i.pravatar.cc/150?img=16" name="Juliet"></mjo-avatar>
                    </mjo-badge>
                </div>
                <div>
                    <mjo-badge value="3" label="2" size="large" show>
                        <mjo-avatar radius="large" size="large" src="https://i.pravatar.cc/150?img=16" name="Juliet"></mjo-avatar>
                    </mjo-badge>
                </div>
                <div>
                    <mjo-badge label=${AiFillAlipaySquare} size="medium" variant="ghost" show>
                        <mjo-avatar radius="large" size="large" src="https://i.pravatar.cc/150?img=16" name="Juliet"></mjo-avatar>
                    </mjo-badge>
                </div>
                <div>
                    <mjo-badge label=${AiFillAlipaySquare} size="medium" color="success" variant="shadow" show>
                        <mjo-avatar radius="large" size="large" src="https://i.pravatar.cc/150?img=16" name="Juliet"></mjo-avatar>
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
        "badge-component": BadgeComponent;
    }
}
