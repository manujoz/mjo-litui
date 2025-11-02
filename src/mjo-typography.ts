import type { MjoTypographyColor, MjoTypographySize, MjoTypographyTag, MjoTypographyWeight } from "./types/mjo-typography";

import type { TemplateResult } from "lit";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

/**
 * @summary Semantic typography component with configurable sizes, weights, and semantic HTML tags.
 *
 * @description The mjo-typography component provides consistent text styling with predefined sizes,
 * weights, and semantic HTML tags. It supports theme customization, accessibility best practices
 * through proper semantic markup, and comprehensive ARIA properties for enhanced screen reader support.
 *
 * @slot - Text content to be styled with typography rules
 * @csspart typography - The rendered HTML element (h1, h2, h3, h4, h5, p, or span)
 *
 * @cssprop --mjo-typography-h1-font-size - Font size for heading1 size preset (default: 2em)
 * @cssprop --mjo-typography-h1-line-height - Line height for heading1 size preset (default: calc(1em + 6px))
 * @cssprop --mjo-typography-h2-font-size - Font size for heading2 size preset (default: 1.5em)
 * @cssprop --mjo-typography-h2-line-height - Line height for heading2 size preset (default: calc(1em + 6px))
 * @cssprop --mjo-typography-h3-font-size - Font size for heading3 size preset (default: 1.25em)
 * @cssprop --mjo-typography-h3-line-height - Line height for heading3 size preset (default: calc(1em + 6px))
 * @cssprop --mjo-typography-base-font-size - Font size for base size preset (default: 1em)
 * @cssprop --mjo-typography-base-line-height - Line height for base size preset (default: calc(1em + 6px))
 * @cssprop --mjo-typography-body1-font-size - Font size for body1 size preset (default: 0.875em)
 * @cssprop --mjo-typography-body1-line-height - Line height for body1 size preset (default: calc(1em + 6px))
 * @cssprop --mjo-typography-body2-font-size - Font size for body2 size preset (default: 0.75em)
 * @cssprop --mjo-typography-body2-line-height - Line height for body2 size preset (default: calc(1em + 6px))
 * @cssprop --mjo-typography-body3-font-size - Font size for body3 size preset (default: 0.625em)
 * @cssprop --mjo-typography-body3-line-height - Line height for body3 size preset (default: calc(1em + 6px))
 * @cssprop --mjo-typography-font-weight-light - Font weight for light preset (default: 300)
 * @cssprop --mjo-typography-font-weight-regular - Font weight for regular preset (default: 400)
 * @cssprop --mjo-typography-font-weight-medium - Font weight for medium preset (default: 500)
 * @cssprop --mjo-typography-font-weight-bold - Font weight for bold preset (default: 600)
 * @cssprop --mjo-primary-color - Color for primary preset (default: currentColor)
 * @cssprop --mjo-secondary-color - Color for secondary preset (default: currentColor)
 * @cssprop --mjo-color-success - Color for success preset (default: currentColor)
 * @cssprop --mjo-color-warning - Color for warning preset (default: currentColor)
 * @cssprop --mjo-color-error - Color for error preset (default: currentColor)
 * @cssprop --mjo-color-info - Color for info preset (default: currentColor)
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
        let template: TemplateResult<1>;

        switch (this.tag) {
            case "h1":
                template = html`<h1 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h1>`;
                break;
            case "h2":
                template = html`<h2 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h2>`;
                break;
            case "h3":
                template = html`<h3 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h3>`;
                break;
            case "h4":
                template = html`<h4 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h4>`;
                break;
            case "h5":
                template = html`<h5 class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></h5>`;
                break;
            case "span":
                template = html`<span class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></span>`;
                break;
            case "p":
                template = html`<p class=${`${this.size} ${this.weight} ${this.color}`} part="typography"><slot></slot></p>`;
                break;
            default:
                template = html`<slot></slot>`;
                break;
        }

        return html`${this.applyThemeSsr()}${template}`;
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
