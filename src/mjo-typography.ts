import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("mjo-typography")
export class MjoTypography extends LitElement {
    @property({ type: String }) variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" = "p";

    render() {
        switch (this.variant) {
            case "h1":
                return html`<h1><slot></slot></h1>`;
            case "h2":
                return html`<h2><slot></slot></h2>`;
            case "h3":
                return html`<h3><slot></slot></h3>`;
            case "h4":
                return html`<h4><slot></slot></h4>`;
            case "h5":
                return html`<h5><slot></slot></h5>`;
            case "h6":
                return html`<h6><slot></slot></h6>`;
            default:
                return html`<p><slot></slot></p>`;
        }
    }

    static styles = [
        css`
            :host {
                display: block;
                margin: 0.5em 0;
                font-size: var(--mjo-typography-p-font-size, 1em);
                font-weight: var(--mjo-typography-p-font-weight, 400);
            }
            :host([variant="h1"]) {
                font-size: var(--mjo-typography-h1-font-size, 2em);
                font-weight: var(--mjo-typography-h1-font-weight, 500);
                margin: 0.7em 0;
            }
            :host([variant="h2"]) {
                font-size: var(--mjo-typography-h2-font-size, 1.8em);
                font-weight: var(--mjo-typography-h2-font-weight, 500);
                margin: 0.7em 0;
            }
            :host([variant="h3"]) {
                font-size: var(--mjo-typography-h3-font-size, 1.5em);
                font-weight: var(--mjo-typography-h3-font-weight, 500);
                margin: 0.7em 0;
            }
            :host([variant="h4"]) {
                font-size: var(--mjo-typography-h4-font-size, 1.3em);
                font-weight: var(--mjo-typography-h4-font-weight, 500);
                margin: 0.7em 0;
            }
            :host([variant="h5"]) {
                font-size: var(--mjo-typography-h5-font-size, 1.1em);
                font-weight: var(--mjo-typography-h5-font-weight, 500);
                margin: 0.7em 0;
            }
            :host([variant="h6"]) {
                font-size: var(--mjo-typography-h6-font-size, 1em);
                font-weight: var(--mjo-typography-h6-font-weight, 500);
                margin: 0.7em 0;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
                font-size: inherit;
                font-weight: inherit;
                padding: 0;
                margin: 0;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-typography": MjoTypography;
    }
}
