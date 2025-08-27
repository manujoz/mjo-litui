import { MjoLinkClickEvent, MjoLinkColors, MjoLinkVariants } from "./types/mjo-link";
import { MjoTypographySize, MjoTypographyWeight } from "./types/mjo-typography.js";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-button.js";

@customElement("mjo-link")
export class MjoLink extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) href?: string;
    @property({ type: String }) target: "_self" | "_blank" | "_parent" | "_top" = "_self";
    @property({ type: String }) rel?: string;
    @property({ type: String }) color: MjoLinkColors = "default";
    @property({ type: String }) variant: MjoLinkVariants = "link";
    @property({ type: String }) size: MjoTypographySize = "base";
    @property({ type: String }) weight: MjoTypographyWeight = "regular";
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) cover = false;
    @property({ type: Boolean }) nodecor = false;
    @property({ type: Boolean }) preventDefault = false;

    // ARIA Properties (using Lit's native support)
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledBy?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedBy?: string;

    private get computedRel(): string {
        if (this.rel) return this.rel;

        // Auto-add security attributes for external links
        if (this.target === "_blank") {
            return "noopener noreferrer";
        }

        return "";
    }

    private get computedTabIndex(): number {
        return this.disabled ? -1 : 0;
    }

    private get roleAssignment(): string | undefined {
        return this.variant !== "link" || !this.href ? "button" : undefined;
    }

    render() {
        const aClasses = classMap({
            disabled: this.disabled,
            cover: this.cover,
            nodecor: this.nodecor,
        });

        return html`
            <a
                href=${ifDefined(this.href)}
                @click=${this.#handleClick}
                target=${this.target}
                rel=${ifDefined(this.computedRel || undefined)}
                role=${ifDefined(this.roleAssignment as "")}
                tabindex=${this.computedTabIndex}
                aria-label=${ifDefined(this.ariaLabel || undefined)}
                aria-labelledby=${ifDefined(this.ariaLabelledBy)}
                aria-describedby=${ifDefined(this.ariaDescribedBy)}
                aria-current=${ifDefined((this.ariaCurrent as "page") || undefined)}
                data-color=${this.color}
                class=${aClasses}
                aria-disabled=${ifDefined(this.disabled ? "true" : undefined)}
            >
                ${this.variant === "link"
                    ? html`<span class=${`${this.size} ${this.weight}`}><slot></slot></span>`
                    : html`
                          <mjo-button
                              type="button"
                              variant=${this.variant === "button" ? "default" : this.variant}
                              color=${this.color === "default" ? "primary" : this.color}
                              ?disabled=${this.disabled}
                              tabindex="-1"
                          >
                              <slot></slot>
                          </mjo-button>
                      `}
            </a>
        `;
    }

    #handleClick = (ev: Event) => {
        if (!this.preventDefault) return;
        ev.preventDefault();

        this.dispatchEvent(
            new CustomEvent<MjoLinkClickEvent["detail"]>("mjo-link:click", {
                detail: {
                    link: this,
                    href: this.href,
                },
            }),
        );
    };

    static styles = [
        css`
            :host {
                display: inline-block;
                font-family: var(--mjo-link-font-family, inherit);
            }

            a {
                color: var(--mjo-link-color-default, currentColor);
                text-decoration: var(--mjo-link-text-decoration, none);
                font-weight: var(--mjo-link-font-weight, inherit);
                transition: var(--mjo-link-transition, color 0.2s ease, text-decoration 0.2s ease);
                display: inline-flex;
                align-items: center;
                outline: none;
            }

            /* Color variants */
            a[data-color="primary"] {
                color: var(--mjo-link-color-primary, var(--mjo-primary-color, #1d7fdb));
            }

            a[data-color="secondary"] {
                color: var(--mjo-link-color-secondary, var(--mjo-secondary-color, #cc3d74));
            }

            a[data-color="default"] {
                color: var(--mjo-link-color-default, currentColor);
            }

            /* Hover states */
            a:hover:not(.disabled) {
                text-decoration: var(--mjo-link-text-decoration-hover, underline);
            }

            /* Focus states for accessibility */
            a:focus-visible {
                outline: var(--mjo-link-focus-outline, 2px solid);
                outline-color: var(--mjo-link-focus-outline-color, var(--mjo-primary-color, #1d7fdb));
                outline-offset: var(--mjo-link-focus-outline-offset, 2px);
                border-radius: var(--mjo-link-focus-border-radius, 2px);
            }
            a[data-color="secondary"]:focus-visible {
                outline-color: var(--mjo-link-focus-outline-color, var(--mjo-secondary-color, #cc3d74));
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                a:focus-visible {
                    outline-width: var(--mjo-link-focus-outline-width, 3px);
                }
            }

            /* Disabled state */
            a.disabled,
            a[aria-disabled="true"] {
                color: var(--mjo-link-color-disabled, var(--mjo-disabled-foreground-color, #aaa));
                pointer-events: none;
                cursor: not-allowed;
                opacity: 0.6;
            }

            /* Cover link functionality */
            a.cover::before {
                position: absolute;
                inset: 0;
                content: "";
                z-index: 1;
            }

            /* No decoration variant */
            a.nodecor:hover {
                text-decoration: none;
            }

            a span {
                display: inline-flex;
                align-items: center;
            }

            /* Typography size classes */
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

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                a {
                    transition: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-link": MjoLink;
    }

    interface HTMLElementEventMap {
        "mjo-link:click": MjoLinkClickEvent;
    }
}
