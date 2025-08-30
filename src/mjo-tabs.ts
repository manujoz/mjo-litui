import { type MjoTab } from "./components/tabs/mjo-tab.js";
import { MjoTabsChangeEvent, MjoTabsColor, MjoTabsUpdatedEvent, MjoTabsVariant } from "./types/mjo-tabs.js";

import { LitElement, PropertyValues, css, html, isServer, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { uniqueId } from "./utils/strings.js";

import "./components/tabs/mjo-tab.js";

@customElement("mjo-tabs")
export class MjoTabs extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) variant: MjoTabsVariant = "light";
    @property({ type: String }) color: MjoTabsColor = "default";
    @property({ type: Boolean }) vertical = false;

    @state() activeIndex = 0;

    @query(".container") container!: HTMLElement;

    tabs: MjoTab[] = [];

    render() {
        return html`
            <section class="container" ?data-vertical=${this.vertical} data-ssr=${isServer}>
                ${this.tabs.length > 0
                    ? html`
                          <header role="tablist" aria-label="Tab Navigation" data-variant=${this.variant} data-color=${this.color}>
                              <div class="indicator"></div>
                              ${repeat(
                                  this.tabs,
                                  (tab, index) => `${tab.label}-${index}`,
                                  (tab, index) => html`
                                      <button
                                          id=${`tab-${tab.id}`}
                                          class="tab-button"
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
                <div class="content">
                    <slot @slotchange=${this.#updateTabs}></slot>
                </div>
            </section>
        `;
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

        if (_changedProperties.has("color") || _changedProperties.has("variant")) {
            this.#setCssVars();
        }
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

        indicator.removeAttribute("style");

        if (!this.vertical) {
            indicator.style.width = `${activeTab.offsetWidth}px`;
            indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
        } else {
            indicator.style.height = `${activeTab.offsetHeight}px`;
            indicator.style.transform = `translateY(${activeTab.offsetTop}px)`;
        }

        if (this.variant !== "light") {
            if (!this.vertical) {
                indicator.style.top = `${activeTab.offsetTop}px`;
                indicator.style.height = activeTab.offsetHeight + "px";
            } else {
                indicator.style.left = `${activeTab.offsetLeft}px`;
                indicator.style.width = activeTab.offsetWidth + "px";
            }
        }
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
        this.style.setProperty("--mjoint-tab-indicator-outlined-color", outlinedColor);
        this.style.setProperty("--mjoint-tab-button-color", buttonColor);
        this.style.setProperty("--mjoint-tab-indicator-bgcolor", indicatorBgColor);
        this.style.setProperty("--mjoint-tab-indicator-border", indicatorBorder);
        this.style.setProperty("--mjoint-tab-indicator-radius", indicatorRadius);
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
                transition:
                    width 0.3s ease,
                    background 0.3s ease,
                    border 0.3s ease,
                    transform 0.3s ease;
                box-sizing: border-box;
            }
            .container:not([data-vertical]) .indicator {
                bottom: 0;
                left: 0;
                height: 2px;
                transition:
                    width 0.3s ease,
                    background 0.3s ease,
                    border 0.3s ease,
                    transform 0.3s ease;
            }
            .container[data-vertical] .indicator {
                right: 0;
                top: 0;
                width: 2px;
                transition:
                    height 0.3s ease,
                    background 0.3s ease,
                    border 0.3s ease,
                    transform 0.3s ease;
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
