import { MjoCardContrast, MjoCardRadius, MjoCardSpace, MjoCardVariants } from "./types/mjo-card.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { ifDefined } from "lit/directives/if-defined.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

/**
 * @summary Flexible card component with background, padding, shadow, radius, and variant customization.
 *
 * @description The mjo-card component provides a versatile container with theme-aware styling.
 * It supports multiple contrast levels for background adaptation, configurable border radius,
 * different spacing options, and visual variants including modern geometric shapes.
 * The component integrates with the global design system through CSS variables.
 *
 * @slot - Content to be displayed inside the card container
 * @csspart container - The main card container element
 * @csspart content - The internal content wrapper element
 * @csspart border - The decorative border element for skew and modern variants
 */
@customElement("mjo-card")
export class MjoCard extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) contrast?: MjoCardContrast;
    @property({ type: String }) radius?: MjoCardRadius;
    @property({ type: String }) variant: MjoCardVariants = "default";
    @property({ type: String }) space: MjoCardSpace = "medium";

    render() {
        return html`
            ${this.applyThemeSsr()}${this.variant !== "default" ? html`<div class="border" part="border" data-variant=${this.variant}></div>` : nothing}
            <div
                class="container"
                part="container"
                data-space=${this.space}
                data-contrast=${ifDefined(this.contrast)}
                data-radius=${ifDefined(this.radius)}
                data-variant=${this.variant}
            >
                <div class="content" part="content"><slot></slot></div>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                position: relative;
                display: block;
                min-height: 150px;
            }
            .border {
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                content: "";
                background: var(--mjo-card-border-color, transparent);
                z-index: -2;
                pointer-events: none;
            }
            .container {
                position: relative;
                padding: var(--mjo-card-padding, var(--mjo-space-medium));
                box-shadow: var(--mjo-card-box-shadow, var(--mjo-box-shadow-1, inherit));
                background-color: var(--mjo-card-background-color, var(--mjo-background-color-card, white));
                border: var(--mjo-card-border, none);
                min-height: inherit;
                box-sizing: border-box;
            }
            .container[data-space="xxsmall"] {
                padding: var(--mjo-space-xxsmall);
            }
            .container[data-space="xsmall"] {
                padding: var(--mjo-space-xsmall);
            }
            .container[data-space="small"] {
                padding: var(--mjo-space-small);
            }
            .container[data-space="medium"] {
                padding: var(--mjo-space-medium);
            }
            .container[data-space="large"] {
                padding: var(--mjo-space-large);
            }
            .container[data-space="xlarge"] {
                padding: var(--mjo-space-xlarge);
            }
            .container[data-space="xxlarge"] {
                padding: var(--mjo-space-xxlarge);
            }
            .container[data-variant="modern"] {
                padding: 1.5em;
                clip-path: polygon(2em 0, 100% 0, 100% calc(100% - 2em), calc(100% - 2em) 100%, 0 100%, 0 2em);
            }
            .border[data-variant="modern"] {
                clip-path: polygon(2em 0, 100% 0, 100% calc(100% - 2em), calc(100% - 2em) 100%, 0 100%, 0 2em);
            }
            .container[data-variant="skew"] {
                padding: 1em 2em;
                clip-path: polygon(1.5em 0, 100% 0, calc(100% - 1.5em) 100%, 0 100%);
            }
            .border[data-variant="skew"] {
                clip-path: polygon(1.5em 0, 100% 0, calc(100% - 1.5em) 100%, 0 100%);
            }
            .container[data-contrast="low"] {
                background-color: var(--mjo-card-background-color-low, var(--mjo-background-color-card-low, white));
            }
            .container[data-contrast="high"] {
                background-color: var(--mjo-card-background-color-high, var(--mjo-background-color-card-high, white));
            }
            .container[data-radius="small"] {
                border-radius: var(--mjo-card-radius-small, var(--mjo-radius-small, 4px));
            }
            .container[data-radius="medium"] {
                border-radius: var(--mjo-card-radius-medium, var(--mjo-radius-medium, 8px));
            }
            .container[data-radius="large"] {
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
