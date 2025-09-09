import { MjoBadgeClickEvent, MjoBadgeColors, MjoBadgePositions, MjoBadgeSizes, MjoBadgeVariants } from "./types/mjo-badge.js";

import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { getInheritBackgroundColor } from "./utils/shadow-dom.js";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { pause } from "./utils/utils.js";

import "./mjo-icon.js";
import "./mjo-typography.js";

/**
 * @summary Positioned notification badge component with comprehensive accessibility support and theming.
 *
 * @description The mjo-badge component displays informational content over other elements using absolute positioning.
 * It supports multiple visual variants (solid, flat, ghost, brilliant), color schemes, sizes, and positions.
 * The component includes automatic count limiting, click handling, keyboard navigation, and comprehensive ARIA support.
 *
 * @fires mjo-badge:click - Fired when the badge is clicked (only when clickable is true)
 *
 * @slot - Contains the element over which the badge will be positioned
 * @csspart container - The main badge container element
 * @csspart icon - The icon element (via exportparts from mjo-icon)
 * @csspart label - The typography element (via exportparts from mjo-typography)
 */
@customElement("mjo-badge")
export class MjoBadge extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) color: MjoBadgeColors = "primary";
    @property({ type: String }) size: MjoBadgeSizes = "medium";
    @property({ type: String }) variant: MjoBadgeVariants = "solid";
    @property({ type: String }) position: MjoBadgePositions = "top-right";
    @property({ type: String }) label: string = "";
    @property({ type: String }) value?: string;
    @property({ type: Number }) offsetx = 0;
    @property({ type: Number }) offsety = 0;
    @property({ type: Boolean }) show = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) clickable = false;
    @property({ type: Boolean }) hideOutline = false;

    // ARIA properties using native Lit support
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedBy?: string;

    @query(".container") private container!: HTMLElement;

    private maxCount = 99;
    private maxCountSuffix = "+";
    private backgroundColor = "";

    private get computedRole() {
        // Auto-detect role based on badge properties
        if (this.role !== "status") {
            return this.role === "none" ? "" : this.role;
        }

        // If it contains SVG, it's decorative
        if (this.label.includes("<svg")) {
            return "img";
        }

        // If it's purely decorative (no meaningful content)
        if (this.ariaHidden === "true") {
            return "";
        }

        // Default to status for informational badges
        return "status";
    }

    private get displayedLabel() {
        if (!this.label) return "";

        // Handle numeric values with max count limit
        const numericValue = parseInt(this.label, 10);
        if (!isNaN(numericValue) && numericValue > this.maxCount) {
            return `${this.maxCount}${this.maxCountSuffix}`;
        }

        return this.label;
    }

    render() {
        return html`
            <slot></slot>
            <div
                class="container"
                part="container"
                data-color=${this.color}
                data-size=${this.size}
                data-variant=${this.variant}
                ?data-clickable=${this.clickable}
                ?data-disabled=${this.disabled}
                ?data-hide-outline=${this.hideOutline}
                tabindex=${ifDefined(this.clickable && !this.disabled ? 0 : undefined)}
                role=${ifDefined((this.computedRole as "status") || undefined)}
                aria-label=${ifDefined(this.ariaLabel || undefined)}
                aria-live=${(this.ariaLive as "polite") || "polite"}
                aria-hidden=${ifDefined(this.ariaHidden === "true" ? "true" : undefined)}
                aria-describedby=${ifDefined(this.ariaDescribedBy || undefined)}
                aria-atomic=${ifDefined(this.ariaAtomic === undefined ? "true" : undefined)}
                @click=${this.#clickHandler}
                @keydown=${this.#keydownHandler}
            >
                ${this.displayedLabel.includes("<svg")
                    ? html`<mjo-icon src=${this.displayedLabel} exportparts="icon: icon" aria-hidden="true"></mjo-icon>`
                    : html`<mjo-typography tag="none" size="body2" weight="bold" exportparts="typography: label">${this.displayedLabel}</mjo-typography>`}
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#setBackgroundColor();
        this.#setBadgeCssVars();
    }

    hideBadge() {
        this.show = false;
    }

    showBadge() {
        this.show = true;
    }

    toggleBadge() {
        this.show = !this.show;
    }

    #keydownHandler = (event: KeyboardEvent) => {
        if (!this.clickable || this.disabled) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.#clickHandler();
        }
    };

    protected willUpdate(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("label") || _changedProperties.has("show")) {
            if (this.container) this.container.classList.remove("show");
        }
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("label") || _changedProperties.has("show")) {
            setTimeout(() => {
                this.#setPosition();
            }, 200);
        }

        if (_changedProperties.has("color") || _changedProperties.has("variant")) {
            this.#setBadgeCssVars();
        }
    }

    async #addClickAnimation() {
        if (!this.container) return;

        // Add the clicked class for animation
        this.container.classList.add("clicked");

        // Remove the class after animation completes
        await new Promise((resolve) => setTimeout(resolve, 200));
        this.container.classList.remove("clicked");
    }

    #clickHandler = () => {
        if (!this.clickable) return;

        this.dispatchEvent(
            new CustomEvent<MjoBadgeClickEvent["detail"]>("mjo-badge:click", {
                detail: {
                    value: this.value,
                    label: this.label,
                    position: this.position,
                    color: this.color,
                },
                bubbles: true,
                composed: true,
            }),
        );

        // Add click animation
        this.#addClickAnimation();
    };

    #setBackgroundColor() {
        this.backgroundColor = getInheritBackgroundColor(this);

        this.style.setProperty("--mjoin-badge-background-color", this.backgroundColor);
    }

    async #setPosition() {
        if (!this.show) return;

        await pause(1);

        const height = this.container.offsetHeight;
        this.container.style.minWidth = `${height < 10 ? 10 : height}px`;
        pause(1);
        const width = this.container.offsetWidth;

        let offsetx = typeof this.offsetx === "number" ? this.offsetx : Number(this.offsetx);
        let offsety = typeof this.offsety === "number" ? this.offsety : Number(this.offsety);

        if (isNaN(offsetx)) offsetx = 0;
        if (isNaN(offsety)) offsety = 0;

        switch (this.position) {
            case "top-left":
                this.container.style.top = `-${(height + offsety) / 2}px`;
                this.container.style.left = `-${(width + offsetx) / 2}px`;
                break;
            case "bottom-right":
                this.container.style.bottom = `-${(height + offsety) / 2}px`;
                this.container.style.right = `-${(width + offsetx) / 2}px`;
                break;
            case "bottom-left":
                this.container.style.bottom = `-${(height + offsety) / 2}px`;
                this.container.style.left = `-${(width + offsetx) / 2}px`;
                break;
            default:
                this.container.style.top = `-${(height + offsety) / 2}px`;
                this.container.style.right = `-${(width + offsetx) / 2}px`;
                break;
        }

        this.container.classList.add("show");
    }

    #setBadgeCssVars() {
        // Color property mapping
        const colorMap = {
            default: "var(--mjo-color-default, #999999)",
            primary: "var(--mjo-primary-color, #4e9be4)",
            secondary: "var(--mjo-secondary-color, #7dc717)",
            success: "var(--mjo-color-success, #4caf50)",
            info: "var(--mjo-color-info, #2196f3)",
            warning: "var(--mjo-color-warning, #ff9800)",
            error: "var(--mjo-color-error, #f44336)",
        };

        // Foreground color mapping (when available)
        const foregroundColorMap = {
            primary: "var(--mjo-primary-foreground-color, currentColor)",
            secondary: "var(--mjo-secondary-foreground-color, currentColor)",
            default: "var(--mjo-foreground-color, currentColor)",
            success: "var(--mjo-color-success-foreground, currentColor)",
            info: "var(--mjo-color-info-foreground, currentColor)",
            warning: "var(--mjo-color-warning-foreground, currentColor)",
            error: "var(--mjo-color-error-foreground, currentColor)",
        };

        // Alpha color mapping for flat variant (only available for primary/secondary)
        const alphaColorMap: Partial<Record<MjoBadgeColors, string>> = {
            primary: "var(--mjo-primary-color-alpha3)",
            secondary: "var(--mjo-secondary-color-alpha3)",
        };

        const currentColor = colorMap[this.color];
        const currentForegroundColor = foregroundColorMap[this.color];

        // Default values
        let backgroundColor = `var(--mjo-badge-background-color, ${currentColor})`;
        let textColor = `var(--mjo-badge-color, ${currentForegroundColor})`;
        let boxShadow = "none";
        let pseudoBackground = "none";
        let pseudoOpacity = "0";
        let overflow = "visible";

        // Variant-specific styling
        switch (this.variant) {
            case "solid": {
                // Default solid variant - no changes needed
                break;
            }
            case "flat": {
                textColor = currentColor;
                const alphaColor = alphaColorMap[this.color];
                if (alphaColor) {
                    backgroundColor = alphaColor;
                } else {
                    backgroundColor = "transparent";
                    pseudoBackground = currentColor;
                    pseudoOpacity = "0.2";
                    overflow = "hidden";
                }
                break;
            }
            case "ghost": {
                backgroundColor = "rgba(200, 200, 200, 0.2)";
                textColor = currentColor;
                break;
            }
            case "brilliant": {
                boxShadow = `0 0 1em ${currentColor}`;
                break;
            }
        }

        // Apply CSS variables
        this.style.setProperty("--mjoint-badge-background-color", backgroundColor);
        this.style.setProperty("--mjoint-badge-text-color", textColor);
        this.style.setProperty("--mjoint-badge-box-shadow", boxShadow);
        this.style.setProperty("--mjoint-badge-pseudo-background", pseudoBackground);
        this.style.setProperty("--mjoint-badge-pseudo-opacity", pseudoOpacity);
        this.style.setProperty("--mjoint-badge-overflow", overflow);
        this.style.setProperty("--mjoint-badge-focus-outline-color", currentColor);
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
            }

            .container {
                position: absolute;
                border: solid var(--mjo-badge-border-width, 2px) var(--mjoin-badge-background-color, #111111);
                padding: 4px;
                box-sizing: border-box;
                display: grid;
                place-content: center;
                border-radius: 999px;
                transform: scale(0);
                transition: transform var(--mjo-badge-animation-duration, 0.2s) ease-in-out;
                z-index: 1;
                outline: none;

                /* Dynamic styles via CSS variables */
                background-color: var(--mjoint-badge-background-color);
                color: var(--mjoint-badge-text-color);
                box-shadow: var(--mjoint-badge-box-shadow);
                overflow: var(--mjoint-badge-overflow);
            }
            .container::before {
                position: absolute;
                content: "";
                inset: 0;
                opacity: var(--mjoint-badge-pseudo-opacity, 0);
                background-color: var(--mjoint-badge-pseudo-background, transparent);
            }
            .container.show {
                transform: scale(1);
            }
            .container.clicked {
                animation: badge-click 0.2s ease-out;
            }
            .container:focus-visible {
                outline: var(--mjo-badge-focus-outline-width, 2px) solid var(--mjoint-badge-focus-outline-color);
                outline-offset: var(--mjo-badge-focus-outline-offset, 1px);
            }
            .container[data-hide-outline] {
                border: none;
                outline: none;
            }
            .container[data-size="small"] {
                font-size: 12px;
            }
            .container[data-size="medium"] {
                font-size: 14px;
            }
            .container[data-size="large"] {
                font-size: 18px;
            }
            .container[data-clickable] {
                cursor: pointer;
                transition: transform 0.2s ease-in-out;
                user-select: none;
            }
            .container[data-clickable]:hover {
                transform: scale(1.2);
            }
            .container[data-disabled] {
                background-color: var(--mjo-color-gray-500, #999999);
                color: var(--mjo-color-gray-700);
                pointer-events: none;
            }
            mjo-typography {
                font-weight: bold;
                font-size: 1em;
                line-height: 1em;
                white-space: nowrap;
                margin: 0;
            }

            @keyframes badge-click {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(0.85);
                }
                100% {
                    transform: scale(1);
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-badge": MjoBadge;
    }

    interface HTMLElementEventMap {
        "mjo-badge:click": MjoBadgeClickEvent;
    }
}
