import { type MjoTab } from "./components/tabs/mjo-tab.js";
import { MjoTabsChangeEvent, MjoTabsColor, MjoTabsUpdatedEvent, MjoTabsVariant } from "./types/mjo-tabs.js";

import { LitElement, PropertyValues, css, html, isServer, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { uniqueId } from "./utils/strings.js";

import "./components/tabs/mjo-tab.js";

/**
 * @summary Versatile tab navigation component with multiple variants, color themes and layout options.
 *
 * @description The mjo-tabs component provides organized content switching with multiple visual styles
 * and layout options. It supports light, solid and bordered variants, semantic color schemes,
 * horizontal and vertical orientations, and includes comprehensive keyboard navigation and ARIA support.
 *
 * @fires mjo-tabs:changed - Fired when the active tab changes
 * @fires mjo-tabs:updated - Fired when the tabs collection is updated
 *
 * @slot - Contains mjo-tab elements
 * @csspart container - The main tabs container
 * @csspart header - The tab navigation header containing buttons
 * @csspart indicator - The visual indicator that shows active tab
 * @csspart tab-button - Individual tab buttons
 * @csspart content - The content area containing tab panels
 */
@customElement("mjo-tabs")
export class MjoTabs extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) variant: MjoTabsVariant = "light";
    @property({ type: String }) color: MjoTabsColor = "default";
    @property({ type: Boolean }) vertical = false;

    @state() activeIndex = 0;

    @query(".container") container!: HTMLElement;

    tabs: MjoTab[] = [];

    #styles = "";

    render() {
        return html`
            ${this.applyThemeSsr()}${unsafeHTML(this.#styles)}
            <section class="container" part="container" ?data-vertical=${this.vertical} data-ssr=${isServer}>
                ${this.tabs.length > 0
                    ? html`
                          <header role="tablist" part="header" aria-label="Tab Navigation" data-variant=${this.variant} data-color=${this.color}>
                              <div class="indicator" part="indicator"></div>
                              ${repeat(
                                  this.tabs,
                                  (tab, index) => `${tab.label}-${index}`,
                                  (tab, index) => html`
                                      <button
                                          id=${`tab-${tab.id}`}
                                          class="tab-button"
                                          part="tab-button"
                                          type="button"
                                          ?data-active=${index === this.activeIndex}
                                          data-index=${index}
                                          role="tab"
                                          tabindex=${index === this.activeIndex ? -1 : 0}
                                          aria-label=${tab.label}
                                          aria-selected=${index === this.activeIndex}
                                          aria-controls=${tab.id}
                                          @click=${() => this.#handleClick(index)}
                                      >
                                          ${tab.label}
                                      </button>
                                  `,
                              )}
                          </header>
                      `
                    : nothing}
                <div class="content" part="content">
                    <slot @slotchange=${this.#updateTabs}></slot>
                </div>
            </section>
        `;
    }

    protected willUpdate(_changedProperties: PropertyValues<this>): void {
        super.willUpdate(_changedProperties);

        if (_changedProperties.has("color") || _changedProperties.has("variant")) {
            this.#setCssVars();
        }
    }

    protected firstUpdated(_changedProperties: PropertyValues<this>): void {
        super.firstUpdated(_changedProperties);

        if (this.container.getAttribute("data-ssr") === "true") {
            this.#updateTabs();
        }
        this.container.removeAttribute("data-ssr");
    }

    protected updated(_changedProperties: PropertyValues<this>): void {
        super.updated(_changedProperties);

        if (_changedProperties.has("variant") || _changedProperties.has("vertical")) {
            setTimeout(() => this.#updateIndicator(), 0);
        }
    }

    setTab(index: number) {
        if (!this.tabs[index]) return;

        this.#handleClick(index);
    }

    getTab(index: number) {
        return this.tabs[index];
    }

    #handleClick = (index: number) => {
        if (index === this.activeIndex) return;

        this.tabs.forEach((t) => (t.active = false));
        this.tabs[index].active = true;
        this.activeIndex = index;

        this.dispatchEvent(
            new CustomEvent<MjoTabsChangeEvent["detail"]>("mjo-tabs:changed", {
                detail: {
                    index,
                    tab: this.tabs[index],
                },
            }),
        );
        setTimeout(() => this.#updateIndicator(), 0);
    };

    #updateIndicator() {
        const indicator = this.container.querySelector(".indicator") as HTMLElement;
        if (!indicator) return;

        const activeTab = this.container.querySelector(".tab-button[data-active]") as HTMLElement;
        if (!activeTab) return;

        requestAnimationFrame(() => {
            // Clean conflicting properties based on orientation and variant
            if (!this.vertical) {
                // Horizontal: clean vertical-specific properties
                indicator.style.removeProperty("height");
                indicator.style.removeProperty("left");

                // Set horizontal properties
                indicator.style.width = `${activeTab.offsetWidth}px`;
                indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;

                // Clean variant-specific properties for light variant
                if (this.variant === "light") {
                    indicator.style.removeProperty("top");
                }
            } else {
                // Vertical: clean horizontal-specific properties
                indicator.style.removeProperty("width");
                indicator.style.removeProperty("top");

                // Set vertical properties
                indicator.style.height = `${activeTab.offsetHeight}px`;
                indicator.style.transform = `translateY(${activeTab.offsetTop}px)`;

                // Clean variant-specific properties for light variant
                if (this.variant === "light") {
                    indicator.style.removeProperty("left");
                }
            }

            // Apply additional properties for non-light variants
            if (this.variant !== "light") {
                if (!this.vertical) {
                    indicator.style.top = `${activeTab.offsetTop}px`;
                    indicator.style.height = activeTab.offsetHeight + "px";
                } else {
                    indicator.style.left = `${activeTab.offsetLeft}px`;
                    indicator.style.width = activeTab.offsetWidth + "px";
                }
            }
        });
    }

    #updateTabs() {
        this.tabs = Array.from(this.querySelectorAll("mjo-tab"));
        if (this.tabs.length === 0) {
            console.error("No tab elements found");
            return;
        }

        this.tabs.forEach((tab) => {
            if (!tab.id) tab.id = uniqueId();
            tab.active = false;
        });

        const oldActiveIndex = this.activeIndex;
        this.activeIndex = 0;
        this.tabs[0].active = true;

        if (oldActiveIndex === this.activeIndex) {
            this.requestUpdate();
        }

        this.dispatchEvent(
            new CustomEvent<MjoTabsUpdatedEvent["detail"]>("mjo-tabs:updated", {
                detail: {
                    tabs: this.tabs,
                },
            }),
        );

        setTimeout(() => this.#updateIndicator(), 0);
    }

    #setCssVars() {
        // Color property mapping
        const colorMap = {
            default: "var(--mjo-foreground-color)",
            primary: "var(--mjo-primary-color)",
            secondary: "var(--mjo-secondary-color)",
            success: "var(--mjo-color-success)",
            info: "var(--mjo-color-info)",
            warning: "var(--mjo-color-warning)",
            error: "var(--mjo-color-error)",
        };
        const colorSolidMap = {
            default: "var(--mjo-color-default-foreground)",
            primary: "var(--mjo-primary-foreground-color)",
            secondary: "var(--mjo-secondary-foreground-color)",
            success: "var(--mjo-color-success-foreground)",
            info: "var(--mjo-color-info-foreground)",
            warning: "var(--mjo-color-warning-foreground)",
            error: "var(--mjo-color-error-foreground)",
        };
        const bgColorMap = {
            default: "var(--mjo-color-default)",
            primary: "var(--mjo-primary-color)",
            secondary: "var(--mjo-secondary-color)",
            success: "var(--mjo-color-success)",
            info: "var(--mjo-color-info)",
            warning: "var(--mjo-color-warning)",
            error: "var(--mjo-color-error)",
        };

        // Valores por defecto
        let buttonColor = "var(--mjo-foreground-color)";
        let indicatorBgColor = "transparent";
        let indicatorRadius = "none";
        let indicatorBorder = "none";

        // Configuración específica por variante
        switch (this.variant) {
            case "light": {
                buttonColor = colorMap[this.color] || buttonColor;
                indicatorBgColor = colorMap[this.color] || "var(--mjo-foreground-color)";
                break;
            }
            case "bordered": {
                const borderColor = colorMap[this.color] || "var(--mjo-color-default)";
                indicatorBorder = `solid 2px ${borderColor}`;
                indicatorRadius = "var(--mjo-radius-medium)";
                break;
            }
            case "solid": {
                buttonColor = colorSolidMap[this.color] || buttonColor;
                indicatorBgColor = bgColorMap[this.color] || indicatorBgColor;
                indicatorRadius = "var(--mjo-radius-medium)";
                break;
            }
        }

        // Color para outline (siempre se necesita)
        const outlinedColor = colorMap[this.color] || "transparent";

        // Aplicar las variables CSS
        // eslint-disable-next-line max-len
        this.#styles = `<style>:host{--mjoint-tab-indicator-outlined-color: ${outlinedColor};--mjoint-tab-button-color: ${buttonColor};--mjoint-tab-indicator-bgcolor: ${indicatorBgColor};--mjoint-tab-indicator-border: ${indicatorBorder};--mjoint-tab-indicator-radius: ${indicatorRadius};}</style>`;
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .container {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: var(--mjo-space-xsmall);
            }
            .container[data-vertical] {
                flex-direction: row;
            }
            header {
                position: relative;
                display: inline-flex;
                flex-direction: row;
                width: max-content;
                height: max-content;
            }
            .container[data-vertical] header {
                flex-direction: column;
            }
            header[data-variant="bordered"] {
                padding: var(--mjo-space-xxsmall);
                border: solid 1px var(--mjo-tabs-border-color, var(--mjo-border-color));
                border-radius: var(--mjo-radius-medium);
            }
            header[data-variant="solid"] {
                padding: var(--mjo-space-xsmall);
                background-color: var(--mjo-background-color-high);
                border-radius: var(--mjo-radius-large);
            }
            .tab-button {
                position: relative;
                border: none;
                background-color: transparent;
                color: var(--mjo-foreground-color-low);
                font-weight: var(--mjo-tabs-button-font-weight, 500);
                font-family: inherit;
                font-size: 0.875em;
                transition: all 0.3s ease;
                padding: var(--mjo-tabs-button-padding, var(--mjo-space-xsmall) var(--mjo-space-small));
                border-radius: var(--mjo-tabs-button-border-radius, var(--mjo-radius-medium));
                overflow: hidden;
                outline: solid 2px transparent;
                cursor: pointer;
            }
            .tab-button:focus-visible {
                outline-color: var(--mjoint-tab-indicator-outlined-color);
            }
            .tab-button:hover,
            .tab-button[data-active] {
                color: var(--mjoint-tab-button-color);
            }
            .indicator {
                position: absolute;
                background-color: var(--mjoint-tab-indicator-bgcolor);
                border: var(--mjoint-tab-indicator-border);
                border-radius: var(--mjoint-tab-indicator-radius);
                transition: all 0.25s ease;
                box-sizing: border-box;
            }
            .container:not([data-vertical]) .indicator {
                bottom: 0;
                left: 0;
                height: 2px;
            }
            .container[data-vertical] .indicator {
                right: 0;
                top: 0;
                width: 2px;
            }
            .content {
                position: relative;
                flex: 1 1 0;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-tabs": MjoTabs;
    }

    interface HTMLElementEventMap {
        "mjo-tabs:changed": MjoTabsChangeEvent;
        "mjo-tabs:updated": MjoTabsUpdatedEvent;
    }
}
