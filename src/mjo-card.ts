import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("mjo-card")
export class MjoCard extends LitElement {
    @property({ type: String, noAccessor: true }) contrast?: "low" | "high" | "normal";
    @property({ type: String, noAccessor: true }) radius?: "none" | "small" | "medium" | "large" = "medium";

    render() {
        return html`<div class="content"><slot></slot></div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.contrast) this.setAttribute("contrast", this.contrast);
        if (this.radius) this.setAttribute("radius", this.radius);
    }

    setContrast(contrast: "low" | "high" | "normal") {
        this.contrast = contrast;
        this.setAttribute("contrast", contrast);
    }

    setRadius(radius: "none" | "small" | "medium" | "large") {
        this.radius = radius;
        this.setAttribute("radius", radius);
    }

    static styles = [
        css`
            :host {
                display: block;
                padding: var(--mjo-space-small);
                box-shadow: var(--mjo-card-box-shadow, var(--mjo-box-shadow-1, inherit));
                background-color: var(--mjo-card-background-color, var(--mjo-background-color-card, white));
            }
            :host([contrast="low"]) {
                background-color: var(--mjo-card-background-color-low, var(--mjo-background-color-card-low, white));
            }
            :host([contrast="high"]) {
                background-color: var(--mjo-card-background-color-high, var(--mjo-background-color-card-high, white));
            }
            :host([radius="small"]) {
                border-radius: var(--mjo-card-radius-small, var(--mjo-radius-small, 4px));
            }
            :host([radius="medium"]) {
                border-radius: var(--mjo-card-radius-medium, var(--mjo-radius-medium, 8px));
            }
            :host([radius="large"]) {
                border-radius: var(--mjo-card-radius-large, var(--mjo-radius-large, 12px));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-card": MjoCard;
    }
}
