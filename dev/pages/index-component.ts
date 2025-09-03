import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-card.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-theme.js";
import { MjoThemeConfig } from "../../src/types/mjo-theme.js";

@customElement("index-component")
export class IndexComponent extends LitElement {
    @state() config: MjoThemeConfig = {};
    render() {
        return html`
            <mjo-theme scope="local" .config=${this.config}>
                <mjo-grid columns="3">
                    <div class="background-low"></div>
                    <div class="background-default"></div>
                    <div class="background-high"></div>
                    <div class="background-card-low"></div>
                    <div class="background-card-default"></div>
                    <div class="background-card-high"></div>
                    <div class="border-low"></div>
                    <div class="border-default"></div>
                    <div class="border-high"></div>
                </mjo-grid>
            </mjo-theme>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        setTimeout(() => {
            this.config = {
                dark: {
                    backgroundColor: {
                        default: "#666666",
                    },
                },
            };
        }, 5000);
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            div {
                aspect-ratio: 3 / 1;
            }
            .background-low {
                background-color: var(--mjo-background-color-low);
                box-shadow: var(--mjo-box-shadow-5);
            }
            .background-default {
                background-color: var(--mjo-background-color);
                box-shadow: var(--mjo-box-shadow-5);
            }
            .background-high {
                background-color: var(--mjo-background-color-high);
                box-shadow: var(--mjo-box-shadow-5);
            }
            .background-card-low {
                background-color: var(--mjo-background-color-card-low);
                box-shadow: var(--mjo-box-shadow-5);
            }
            .background-card-default {
                background-color: var(--mjo-background-color-card);
                box-shadow: var(--mjo-box-shadow-5);
            }
            .background-card-high {
                background-color: var(--mjo-background-color-card-high);
                box-shadow: var(--mjo-box-shadow-5);
            }
            .border-low {
                border: 1px solid var(--mjo-border-color-low);
            }
            .border-default {
                border: 1px solid var(--mjo-border-color);
            }
            .border-high {
                border: 1px solid var(--mjo-border-color-high);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "index-component": IndexComponent;
    }
}
