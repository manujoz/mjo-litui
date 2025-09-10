import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * Playground grid layout for demo and control sections.
 * This component provides a structured layout for showcasing interactive demos
 * alongside their corresponding control elements.
 *
 * @slot demo - Slot for the demo content.
 * @slot controls - Slot for the control elements.
 */
@customElement("playground-grid")
export class PlaygroundGrid extends LitElement {
    render() {
        return html`
            <div class="playground-grid">
                <div class="demo-tabs" part="demo-tabs">
                    <slot name="demo"></slot>
                </div>
                <div class="controls">
                    <slot name="controls"></slot>
                </div>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
            }

            /* Playground Styles */
            .playground-grid {
                position: relative;
                display: grid;
                grid-template-columns: 1fr 300px;
                gap: 15px;
                align-items: start;
            }

            @media (max-width: 768px) {
                .playground-grid {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
            }

            .demo-tabs {
                position: sticky;
                top: 20px;
                min-height: 350px;
                padding: 20px;
                border: 2px dashed var(--mjo-border-color-high, #ccc);
                border-radius: 8px;
                background-color: var(--mjo-background-color, #ffffff);
            }

            .controls {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding: 20px;
                border-radius: 8px;
                background-color: var(--mjo-background-color-card-low, #ffffff);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "playground-grid": PlaygroundGrid;
    }
}
