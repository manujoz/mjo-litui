import type { MjoTypographyColor, MjoTypographySize, MjoTypographyTag, MjoTypographyWeight } from "./types/mjo-typography";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

/**
 * @summary Semantic typography component with configurable sizes, weights, and semantic HTML tags.
 *
 * @description The mjo-typography component provides consistent text styling with predefined sizes,
 * weights, and semantic HTML tags. It supports theme customization, accessibility best practices
 * through proper semantic markup, and comprehensive ARIA properties for enhanced screen reader support.
 *
 * @slot - Text content to be styled with typography rules
 * @csspart typography - The rendered HTML element (h1, h2, h3, h4, h5, p, or span)
 */
@customElement("mjo-typography")
export class MjoTypography extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) tag: MjoTypographyTag = "p";
    @property({ type: String }) size: MjoTypographySize = "base";
    @property({ type: String }) weight: MjoTypographyWeight = "regular";
    @property({ type: String }) color: MjoTypographyColor = "inherit";

    // ARIA Properties (using Lit's native support)
    @property({ type: String, attribute: "aria-labelledby", reflect: true }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-describedby", reflect: true }) ariaDescribedby?: string;
    @property({ type: String, attribute: "aria-level", reflect: true }) ariaLevel: string | null = null;

    render() {
        switch (this.tag) {
            case "h1":
                return html`<h1 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h1>`;
            case "h2":
                return html`<h2 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h2>`;
            case "h3":
                return html`<h3 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h3>`;
            case "h4":
                return html`<h4 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h4>`;
            case "h5":
                return html`<h5 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h5>`;
            case "span":
                return html`<span class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></span>`;
            case "p":
                return html`<p class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></p>`;
            default:
                return html`<slot></slot>`;
        }
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            :host([tag="span"]),
            :host([tag="none"]) {
                margin: 0;
                display: inline;
            }
            :host([tag="none"]) {
                line-height: calc(1em + 6px);
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            span {
                padding: 0;
                margin: 0;
            }
            .heading1 {
                font-size: var(--mjo-typography-h1-font-size, 2em);
                line-height: var(--mjo-typography-h1-line-height, calc(1em + 6px));
            }
            .heading2 {
                font-size: var(--mjo-typography-h2-font-size, 1.5em);
                line-height: var(--mjo-typography-h2-line-height, calc(1em + 6px));
            }
            .heading3 {
                font-size: var(--mjo-typography-h3-font-size, 1.25em);
                line-height: var(--mjo-typography-h3-line-height, calc(1em + 6px));
            }
            .base {
                font-size: var(--mjo-typography-base-font-size, 1em);
                line-height: var(--mjo-typography-base-line-height, calc(1em + 6px));
            }
            .body1 {
                font-size: var(--mjo-typography-body1-font-size, 0.875em);
                line-height: var(--mjo-typography-body1-line-height, calc(1em + 6px));
            }
            .body2 {
                font-size: var(--mjo-typography-body2-font-size, 0.75em);
                line-height: var(--mjo-typography-body2-line-height, calc(1em + 6px));
            }
            .body3 {
                font-size: var(--mjo-typography-body3-font-size, 0.625em);
                line-height: var(--mjo-typography-body3-line-height, calc(1em + 6px));
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
                font-weight: var(--mjo-typography-font-weight-bold, 600);
            }
            .primary {
                color: var(--mjo-primary-color, currentColor);
            }
            .secondary {
                color: var(--mjo-secondary-color, currentColor);
            }
            .success {
                color: var(--mjo-color-success, currentColor);
            }
            .warning {
                color: var(--mjo-color-warning, currentColor);
            }
            .error {
                color: var(--mjo-color-error, currentColor);
            }
            .info {
                color: var(--mjo-color-info, currentColor);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-typography": MjoTypography;
    }
}
