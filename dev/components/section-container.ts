import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("section-container")
export class SectionContainer extends LitElement {
    @property({ type: String }) label = "";
    @property({ type: String }) description?: string;

    render() {
        return html`
            <section>
                <header>
                    <h3>${this.label}</h3>
                    ${this.description ? html`<p>${this.description}</p>` : nothing}
                </header>
                <slot></slot>
            </section>
        `;
    }

    static styles = [
        css`
            :host {
                position: relative;
                display: block;
            }
            section {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 15px;
                padding: 15px;
                border: 1px solid var(--mjo-border-color, #e0e0e0);
                border-radius: 8px;
                background-color: var(--mjo-background-color-card, #ffffff);
            }
            header {
                position: relative;
                border-bottom: 2px solid var(--mjo-foreground-color-low, #4e9be4);
            }
            h3 {
                margin: 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.2em;
                padding-bottom: 2px;
            }
            p {
                margin: 0;
                padding-bottom: 5px;
                color: var(--mjo-foreground-color-low, #666);
                font-size: 0.9em;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "section-container": SectionContainer;
    }
}
