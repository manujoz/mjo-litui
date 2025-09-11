import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { uniqueId } from "../../src/utils/strings";

import "../components/section-container.js";
import "../components/showcases-grid.js";

import "../../src/mjo-scrollshadow.js";

@customElement("scrollshadow-component")
export class ScrollshadowComponent extends LitElement {
    render() {
        return html`
            <h1>Radio Component Examples</h1>

            <section-container label="Vertical scroll with height defined">
                <showcases-grid columns="2">
                    <div class="vertical-height">
                        <mjo-scrollshadow class="mjo-scrollshadow-with-height" overflow="vertical">
                            ${repeat(this.#getArray(), (item) => html`<div class="vertical-item">Item ${item}</div>`)}
                        </mjo-scrollshadow>
                    </div>
                    <div class="vertical-height">
                        <mjo-scrollshadow overflow="vertical" hideScrollbar>
                            ${repeat(this.#getArray(), (item) => html`<div class="vertical-item">Item ${item}</div>`)}
                        </mjo-scrollshadow>
                    </div>
                </showcases-grid>
            </section-container>
            <section-container label="Horizontal scroll with width defined">
                <showcases-grid columns="2">
                    <div class="horizontal">
                        <mjo-scrollshadow overflow="horizontal">
                            <div class="horizontal-items">${repeat(this.#getArray(3), (item) => html`<span>Item ${item}</span>`)}</div>
                        </mjo-scrollshadow>
                    </div>
                    <div class="horizontal">
                        <mjo-scrollshadow overflow="horizontal" hideScrollbar>
                            <div class="horizontal-items">${repeat(this.#getArray(3), (item) => html`<span>Item ${item}</span>`)}</div>
                        </mjo-scrollshadow>
                    </div>
                </showcases-grid>
            </section-container>
            <section-container label="Flex columns with start and end content">
                <showcases-grid columns="2">
                    <div class="flex-column">
                        <div class="content">Start content</div>
                        <mjo-scrollshadow overflow="vertical">
                            ${repeat(this.#getArray(), (item) => html`<div class="vertical-item">Item ${item}</div>`)}
                        </mjo-scrollshadow>
                        <div class="content">End content</div>
                    </div>
                    <div class="grid-column">
                        <div class="content">Start content</div>
                        <mjo-scrollshadow overflow="vertical">
                            ${repeat(this.#getArray(), (item) => html`<div class="vertical-item">Item ${item}</div>`)}
                        </mjo-scrollshadow>
                        <div class="content">End content</div>
                    </div>
                </showcases-grid>
            </section-container>
        `;
    }

    #getArray(length = 50) {
        return Array.from({ length }, () => uniqueId());
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            section-container {
                margin-bottom: 24px;
            }
            .vertical-height {
                height: 50vh;
            }
            .vertical-height mjo-scrollshadow {
                height: 100%;
            }
            .vertical-item {
                position: relative;
                white-space: nowrap;
            }
            .mjo-scrollshadow-with-height {
                height: 100%;
            }
            .horizontal {
                position: relative;
            }
            .horizontal-items {
                position: relative;
                white-space: nowrap;
            }
            .flex-column {
                position: relative;
                height: 70vh;
                display: flex;
                flex-direction: column;
            }
            .flex-column .content {
                flex: 0 1 auto;
                padding: 12px;
                background: var(--mjo-background-color-card-low, #f9f9f9);
            }
            .grid-column {
                position: relative;
                height: 70vh;
                display: grid;
                grid-template-rows: auto minmax(0, 1fr) auto;
            }
            .grid-column .content {
                flex: 0 1 auto;
                padding: 12px;
                background: var(--mjo-background-color-card-low, #f9f9f9);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "scrollshadow-component": ScrollshadowComponent;
    }
}
