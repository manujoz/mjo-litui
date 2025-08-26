import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "../../src/mjo-link.js";

@customElement("link-test")
export class LinkTest extends LitElement {
    render() {
        return html`
            <p>
                <mjo-link href="#">Link</mjo-link>
            </p>
            <p class="cover">
                <mjo-link href="#" cover nodecor>Link Cover</mjo-link>
            </p>
            <p>
                <mjo-link href="#" disabled>Link</mjo-link>
            </p>
            <p>
                <mjo-link href="#" color="primary">Link</mjo-link>
            </p>
            <p>
                <mjo-link href="#" color="secondary">Link</mjo-link>
            </p>
            <p>
                <mjo-link href="#" variant="button">Link</mjo-link>
            </p>
            <p>
                <mjo-link href="#" variant="dashed">Link</mjo-link>
            </p>
            <p>
                <mjo-link href="#" variant="flat">Link</mjo-link>
            </p>
            <p>
                <mjo-link href="#" variant="ghost">Link</mjo-link>
            </p>
            <p>
                <mjo-link href="#" variant="text">Link</mjo-link>
            </p>
        `;
    }
    static styles = [
        css`
            :host {
                display: block;
            }

            p {
                position: relative;
            }
            p.cover {
                position: relative;
                height: 80px;
                width: 150px;
                background-color: rgba(0, 0, 0, 0.1);
                display: grid;
                place-content: center;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "link-test": LinkTest;
    }
}
