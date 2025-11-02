import type { MjoScrollshadow } from "./mjo-scrollshadow.js";
import type {
    MjoBreadCrumbsColor,
    MjoBreadcrumbsItem,
    MjoBreadcrumbsItems,
    MjoBreadcrumbsNavigateEvent,
    MjoBreadCrumbsSizes,
    MjoBreadCrumbsVariants,
} from "./types/mjo-breadcrumbs";

import type { PropertyValues } from "lit";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { BsChevronRight } from "mjo-icons/bs";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-icon.js";
import "./mjo-link.js";
import "./mjo-scrollshadow.js";
import "./mjo-typography.js";

/**
 * @summary Navigation breadcrumbs component for displaying hierarchical paths with horizontal scroll shadow support.
 *
 * @fires mjo-breadcrumbs:navigate - Fired when a breadcrumb item is clicked (when not using autoNavigate)
 *
 * @csspart container - The main navigation container element
 * @csspart list - The ul element containing the breadcrumb items
 * @csspart list-item - Each li element representing a breadcrumb item
 * @csspart link - The mjo-link element for navigable breadcrumb items (via exportparts)
 * @csspart link-text - The text content of navigable breadcrumb items (via exportparts)
 * @csspart icon - Icons within breadcrumb items (via exportparts)
 * @csspart active-icon - Icons within active/current breadcrumb items (via exportparts)
 * @csspart active-text - The typography element for active/current breadcrumb items (via exportparts)
 * @csspart icon-separator - The separator icon between breadcrumb items (via exportparts)
 *
 * @cssprop --mjo-breadcrumbs-font-family - Font family for breadcrumb text (default: inherit)
 * @cssprop --mjo-breadcrumbs-font-size - Font size for breadcrumb items (default: inherit)
 * @cssprop --mjo-breadcrumbs-font-weight - Font weight for breadcrumb items (default: inherit)
 * @cssprop --mjo-breadcrumbs-background-color - Background color for solid variant (default: var(--mjo-background-color-card))
 * @cssprop --mjo-breadcrumbs-border-color - Border color for bordered variant (default: var(--mjo-border-color))
 * @cssprop --mjo-breadcrumbs-border-radius - Border radius for solid and bordered variants (default: var(--mjo-radius-medium))
 * @cssprop --mjo-breadcrumbs-padding - Padding for solid and bordered variants (default: var(--mjo-space-small) var(--mjo-space-small))
 * @cssprop --mjo-breadcrumbs-text-color - Color for active/current breadcrumb item (default: var(--mjo-foreground-color-low))
 * @cssprop --mjo-breadcrumbs-link-hover-color - Color for links on hover (default: var(--mjo-primary-color) or var(--mjo-secondary-color))
 * @cssprop --mjo-breadcrumbs-separator-color - Color for separator icons (default: var(--mjo-foreground-color-low))
 * @cssprop --mjo-breadcrumbs-current-font-weight - Font weight for current breadcrumb in high contrast mode (default: 600)
 */
@customElement("mjo-breadcrumbs")
export class MjoBreadcrumbs extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) size: MjoBreadCrumbsSizes = "medium";
    @property({ type: String }) color: MjoBreadCrumbsColor = "primary";
    @property({ type: String }) variant: MjoBreadCrumbsVariants = "default";
    @property({ type: Array }) items: MjoBreadcrumbsItems = [];
    @property({ type: Boolean }) autoNavigate = false;
    @property({ type: String }) separator?: string;
    @property({ type: Boolean }) preventDefault = false;

    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledBy?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedBy?: string;

    @query("mjo-scrollshadow") $scrollshadow!: MjoScrollshadow;
    @query("nav") $nav!: HTMLElement;

    #navObserver!: ResizeObserver;

    render() {
        if (this.items.length === 0) return nothing;

        return html`
            ${this.applyThemeSsr()}
            <mjo-scrollshadow overflow="horizontal" hideScrollbar data-variant=${this.variant}>
                <nav
                    part="container"
                    role="navigation"
                    aria-label=${this.#computedAriaLabel}
                    aria-labelledby=${ifDefined(this.ariaLabelledBy)}
                    aria-describedby=${ifDefined(this.ariaDescribedBy)}
                    data-color=${this.color}
                    data-size=${this.size}
                    data-variant=${this.variant}
                >
                    <ul part="list" role="list">
                        ${repeat(
                            this.items,
                            (item) => item.href || item.label,
                            (item, index) => {
                                const isActive = item.active || index === this.items.length - 1;
                                const showSeparator = index < this.items.length - 1;

                                return html`
                                    <li ?data-active=${isActive} part="list-item" role="listitem">
                                        ${item.href && !isActive
                                            ? html`
                                                  <mjo-link
                                                      exportparts="link: link, link-text: link-text"
                                                      data-color=${this.color}
                                                      href=${item.href}
                                                      ?preventDefault=${this.preventDefault}
                                                      @mjo-link:click=${() => this.#handleClick(item, index)}
                                                      aria-current=${ifDefined(isActive ? "page" : undefined)}
                                                  >
                                                      ${item.icon
                                                          ? html`<mjo-icon
                                                                class="icon"
                                                                src=${item.icon}
                                                                aria-hidden="true"
                                                                exportparts="icon: icon"
                                                            ></mjo-icon>`
                                                          : nothing}
                                                      ${item.label}
                                                  </mjo-link>
                                              `
                                            : html`
                                                  ${item.icon
                                                      ? html`<mjo-icon
                                                            class="icon active"
                                                            src=${item.icon}
                                                            aria-hidden="true"
                                                            exportparts="icon: active-icon"
                                                        ></mjo-icon>`
                                                      : nothing}
                                                  <mjo-typography
                                                      tag="span"
                                                      aria-current=${ifDefined(isActive ? "page" : undefined)}
                                                      exportparts="typography: active-text"
                                                  >
                                                      ${item.label}
                                                  </mjo-typography>
                                              `}
                                        ${showSeparator
                                            ? html`
                                                  <mjo-icon
                                                      class="separator"
                                                      src=${this.separator || BsChevronRight}
                                                      aria-hidden="true"
                                                      exportparts="icon: icon-separator"
                                                  ></mjo-icon>
                                              `
                                            : nothing}
                                    </li>
                                `;
                            },
                        )}
                    </ul>
                </nav>
            </mjo-scrollshadow>
        `;
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.#navObserver?.disconnect();
    }

    protected firstUpdated(_changedProperties: PropertyValues<this>): void {
        super.firstUpdated(_changedProperties);

        this.#navObserver = new ResizeObserver(() => {
            this.#setScrollToEnd();
            this.$scrollshadow.updateShadows();
        });

        this.#navObserver.observe(this.$nav);

        this.updateComplete.then(() => {
            this.#setScrollToEnd();
        });
    }

    protected updated(_changedProperties: PropertyValues<this>): void {
        super.updated(_changedProperties);

        if (_changedProperties.has("items")) {
            this.updateComplete.then(() => {
                this.#setScrollToEnd();
            });
        }
    }

    get #computedAriaLabel(): string {
        return this.ariaLabel || "breadcrumb";
    }

    #handleClick(item: MjoBreadcrumbsItem, index: number) {
        this.dispatchEvent(
            new CustomEvent<MjoBreadcrumbsNavigateEvent["detail"]>("mjo-breadcrumbs:navigate", {
                detail: { item, href: item.href, index },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #setScrollToEnd() {
        requestAnimationFrame(() => {
            this.$scrollshadow.scrollToEnd();
        });
    }

    static styles = [
        css`
            :host {
                display: block;
                font-family: var(--mjo-breadcrumbs-font-family, inherit);
                width: 100%;
            }
            mjo-scrollshadow {
                display: inline-flex;
                max-width: 100%;
            }
            mjo-scrollshadow::part(container) {
                display: flex;
                padding: 5px 3px;
            }
            mjo-scrollshadow[data-variant="solid"] {
                background-color: var(--mjo-breadcrumbs-background-color, var(--mjo-background-color-card));
                border-radius: var(--mjo-breadcrumbs-border-radius, var(--mjo-radius-medium));
                padding: var(--mjo-breadcrumbs-padding, var(--mjo-space-small) var(--mjo-space-small));
            }
            mjo-scrollshadow[data-variant="bordered"] {
                padding: var(--mjo-breadcrumbs-padding, var(--mjo-space-small) var(--mjo-space-small));
                border-radius: var(--mjo-breadcrumbs-border-radius, var(--mjo-radius-medium));
                border: 1px solid var(--mjo-breadcrumbs-border-color, var(--mjo-border-color));
            }
            nav {
                position: relative;
                display: inline-flex;
                font-size: var(--mjo-breadcrumbs-font-size, inherit);
                font-weight: var(--mjo-breadcrumbs-font-weight, inherit);
                max-width: 100%;
                box-sizing: border-box;
            }
            nav[data-size="small"] {
                font-size: 0.8em;
            }
            nav[data-size="large"] {
                font-size: 1.2em;
            }
            ul {
                position: relative;
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
            }

            li {
                position: relative;
                display: flex;
                align-items: center;
                white-space: nowrap;
            }

            mjo-icon::part(icon),
            mjo-typography::part(typography),
            mjo-link::part(typography) {
                line-height: 1em;
            }

            mjo-icon.icon::part(icon) {
                margin-right: var(--mjo-space-xsmall);
            }

            mjo-icon.separator::part(icon) {
                font-size: 1em;
                margin: 0 var(--mjo-space-xsmall);
                color: var(--mjo-breadcrumbs-separator-color, var(--mjo-foreground-color-low));
                opacity: 0.6;
            }

            /* Link styling */
            mjo-link {
                display: flex;
                align-items: center;
                --mjo-link-text-decoration-hover: none;
            }

            mjo-link[data-color="secondary"] {
                --mjo-link-focus-outline-color: var(--mjo-secondary-color, #7dc717);
            }
            mjo-link:hover {
                color: var(--mjo-breadcrumbs-link-hover-color, var(--mjo-primary-color, #1aa8ed));
            }
            mjo-link[data-color="secondary"]:hover {
                color: var(--mjo-breadcrumbs-link-hover-color, var(--mjo-secondary-color, #7dc717));
            }
            mjo-typography {
                font-size: 1em;
                color: var(--mjo-breadcrumbs-text-color, var(--mjo-foreground-color-low));
                display: flex;
                align-items: center;
            }
            mjo-icon.active {
                color: var(--mjo-breadcrumbs-text-color, var(--mjo-foreground-color-low));
            }
            @media (prefers-contrast: high) {
                mjo-link:focus-visible {
                    outline-width: 3px;
                }

                li[data-active] mjo-typography {
                    font-weight: var(--mjo-breadcrumbs-current-font-weight, 600);
                }
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                mjo-link {
                    transition: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-breadcrumbs": MjoBreadcrumbs;
    }

    interface HTMLElementEventMap {
        "mjo-breadcrumbs:navigate": MjoBreadcrumbsNavigateEvent;
    }
}
