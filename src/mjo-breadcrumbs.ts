import { MjoBreadCrumbsColor, MjoBreadcrumbsItems, MjoBreadcrumbsNavigateEvent, MjoBreadCrumbsSizes, MjoBreadCrumbsVariants } from "./types/mjo-breadcrumbs";

import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";

import { HiChevronRight } from "mjo-icons/hi";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-icon.js";
import "./mjo-link.js";
import "./mjo-typography.js";

@customElement("mjo-breadcrumbs")
export class MjoBreadcrumbs extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) size: MjoBreadCrumbsSizes = "medium";
    @property({ type: String }) color: MjoBreadCrumbsColor = "primary";
    @property({ type: String }) variant: MjoBreadCrumbsVariants = "default";
    @property({ type: Array }) items: MjoBreadcrumbsItems = [];
    @property({ type: Boolean }) autoNavigate = false;
    @property({ type: String }) separator?: string;

    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledBy?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedBy?: string;

    @query("nav") $nav!: HTMLElement;

    render() {
        if (this.items.length === 0) return nothing;

        return html`
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

                            return html`
                                <li ?data-active=${isActive} part="item" role="listitem">
                                    ${item.href && !isActive
                                        ? html`
                                              <mjo-link
                                                  exportparts="link: link"
                                                  href=${item.href}
                                                  @click=${this.autoNavigate ? nothing : (e: Event) => this.#handleNavigate(e, item, index)}
                                                  aria-current=${ifDefined(isActive ? "page" : undefined)}
                                              >
                                                  ${item.icon
                                                      ? html`<mjo-icon class="icon" src=${item.icon} aria-hidden="true"></mjo-icon>`
                                                      : nothing}${item.label}
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
                                    ${index < this.items.length - 1
                                        ? html`<mjo-icon
                                              class="separator"
                                              src=${this.separator || HiChevronRight}
                                              aria-hidden="true"
                                              exportparts="icon: icon-separator"
                                          ></mjo-icon>`
                                        : nothing}
                                </li>
                            `;
                        },
                    )}
                </ul>
            </nav>
        `;
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.$nav.removeEventListener("scroll", this.#handleScroll);
    }

    protected firstUpdated(_changedProperties: PropertyValues<this>): void {
        super.firstUpdated(_changedProperties);

        this.$nav.addEventListener("scroll", this.#handleScroll);
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

    #handleScroll = () => {
        // console.log(this.$nav.scrollLeft);
    };

    get #computedAriaLabel(): string {
        return this.ariaLabel || "breadcrumb";
    }

    #setScrollToEnd() {
        this.$nav.scrollTo({ left: this.$nav.scrollWidth, behavior: "smooth" });
    }

    #handleNavigate(event: Event, item: MjoBreadcrumbsItems[0], index: number) {
        event.preventDefault();

        this.dispatchEvent(
            new CustomEvent<MjoBreadcrumbsNavigateEvent["detail"]>("mjo-breadcrumbs:navigate", {
                detail: {
                    item,
                    index,
                    href: item.href,
                },
                bubbles: true,
            }),
        );
    }

    static styles = [
        css`
            :host {
                display: block;
                font-family: var(--mjo-breadcrumbs-font-family, inherit);
                width: 100%;
            }

            nav {
                position: relative;
                display: inline-flex;
                font-size: var(--mjo-breadcrumbs-font-size, inherit);
                font-weight: var(--mjo-breadcrumbs-font-weight, inherit);
                max-width: 100%;
                overflow: hidden;
                overflow-x: auto;
                overflow-anchor: auto;
                box-sizing: border-box;
                scrollbar-width: none;
            }

            nav[data-variant="solid"] {
                background-color: var(--mjo-breadcrumbs-background-color, var(--mjo-background-color-card));
                border-radius: var(--mjo-breadcrumbs-border-radius, var(--mjo-radius-medium));
                padding: var(--mjo-breadcrumbs-padding, var(--mjo-space-xxsmall) var(--mjo-space-small));
            }

            nav[data-variant="bordered"] {
                padding: var(--mjo-breadcrumbs-padding, var(--mjo-space-xxsmall) var(--mjo-space-small));
                border-radius: var(--mjo-breadcrumbs-border-radius, var(--mjo-radius-medium));
                border: 1px solid var(--mjo-breadcrumbs-border-color, var(--mjo-border-color));
            }

            /* Size variants */
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

            /* Icon styling */
            mjo-icon {
                line-height: 1em;
            }

            mjo-icon.icon {
                top: var(--mjo-breadcrumbs-icon-top, -1px);
                margin-right: var(--mjo-space-xxsmall);
            }

            mjo-icon.separator {
                margin: 0 var(--mjo-space-xsmall);
                color: var(--mjo-breadcrumbs-separator-color, var(--mjo-foreground-color-low));
            }

            /* Link styling */
            mjo-link {
                display: flex;
                align-items: center;
                --mjo-link-text-decoration-hover: none;
            }

            mjo-link:hover {
                color: var(--mjo-breadcrumbs-link-hover-color, var(--mjo-primary-color, #1aa8ed));
            }

            nav[data-color="secondary"] mjo-link:hover {
                color: var(--mjo-breadcrumbs-link-hover-color, var(--mjo-secondary-color, #7dc717));
            }

            /* Focus states for accessibility */
            mjo-link:focus-visible {
                outline: var(--mjo-breadcrumbs-focus-outline, 2px solid var(--mjo-primary-color, #1aa8ed));
                outline-offset: 2px;
                border-radius: 2px;
            }

            nav[data-color="secondary"] mjo-link:focus-visible {
                outline-color: var(--mjo-secondary-color, #7dc717);
            }

            /* Typography for active/current items */
            mjo-typography {
                font-size: 1em;
                color: var(--mjo-breadcrumbs-text-color, var(--mjo-foreground-color-low));
                display: flex;
                align-items: center;
            }
            mjo-icon.active {
                color: var(--mjo-breadcrumbs-text-color, var(--mjo-foreground-color-low));
            }

            /* High contrast mode support */
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
