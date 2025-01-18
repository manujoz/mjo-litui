import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin";

@customElement("mjo-typography")
export class MjoTypography extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) size: "h1" | "h2" | "h3" | "base" | "body1" | "body2" | "body3" = "base";
    @property({ type: String }) weight: "light" | "regular" | "medium" | "bold" = "regular";

    render() {
        switch (this.size) {
            case "h1":
                return html`<h1 class=${`${this.weight}`}><slot></slot></h1>`;
            case "h2":
                return html`<h2 class=${`${this.weight}`}><slot></slot></h2>`;
            case "h3":
                return html`<h3 class=${`${this.weight}`}><slot></slot></h3>`;
            case "body1":
                return html`<p class=${`body1 ${this.weight}`}><slot></slot></p>`;
            case "body2":
                return html`<p class=${`body2 ${this.weight}`}><slot></slot></p>`;
            case "body3":
                return html`<p class=${`body3 ${this.weight}`}><slot></slot></p>`;
            default:
                return html`<p class=${`base ${this.weight}`}><slot></slot></p>`;
        }
    }

    static styles = [
        css`
            :host {
                display: block;
                margin: 0.5em 0;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p {
                padding: 0;
                margin: 0;
            }
            h1 {
                font-size: var(--mjo-typography-h1-font-size, 2em);
                line-height: var(--mjo-typography-h1-line-height, 2.5em);
            }
            h2 {
                font-size: var(--mjo-typography-h2-font-size, 1.5em);
                line-height: var(--mjo-typography-h2-line-height, 2em);
            }
            h3 {
                font-size: var(--mjo-typography-h3-font-size, 1.25em);
                line-height: var(--mjo-typography-h3-line-height, 1.75em);
            }
            .bsae {
                font-size: var(--mjo-typography-base-font-size, 1em);
                line-height: var(--mjo-typography-base-line-height, 1.5em);
            }
            .body1 {
                font-size: var(--mjo-typography-body1-font-size, 0.875em);
                line-height: var(--mjo-typography-body1-line-height, 1.375em);
            }
            .body2 {
                font-size: var(--mjo-typography-body2-font-size, 0.75em);
                line-height: var(--mjo-typography-body2-line-height, 1.25em);
            }
            .body3 {
                font-size: var(--mjo-typography-body3-font-size, 0.625em);
                line-height: var(--mjo-typography-body3-line-height, 1.125em);
            }
            .light {
                font-weight: var(--mjo-typography-font-weight-light, 300);
            }
            .regular {
                font-weight: var(--mjo-typography-font-weight-regular, 400);
            }
            .medium {
                font-weight: var(--mjo-typography-font-weight-medium, 500);
            }
            .bold {
                font-weight: var(--mjo-typography-font-weight-bold, 700);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-typography": MjoTypography;
    }
}
