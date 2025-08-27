import { MjoBadgeClickEvent, MjoBadgeColors, MjoBadgePositions, MjoBadgeRoles, MjoBadgeSizes, MjoBadgeVariants } from "./types/mjo-badge.js";

import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { getInheritBackgroundColor } from "./utils/shadow-dom";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { pause } from "./utils/utils.js";

import "./mjo-icon.js";
import "./mjo-typography.js";

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
    @property({ type: String }) badgeRole: MjoBadgeRoles = "status";

    // ARIA properties using native Lit support
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedBy?: string;

    @query(".container") container!: HTMLElement;

    maxCount = 99;
    maxCountSuffix = "+";

    get computedRole() {
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

    get displayedLabel() {
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
                    ? html`<mjo-icon src=${this.displayedLabel} aria-hidden="true"></mjo-icon>`
                    : html`<mjo-typography tag="none" size="body2" weight="bold">${this.displayedLabel}</mjo-typography>`}
            </div>
        `;
    }

    backgroundColor = "";

    connectedCallback(): void {
        super.connectedCallback();

        this.#setBackgroundColor();
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
            }
            .container.show {
                transform: scale(1);
            }
            .container.clicked {
                animation: badge-click 0.2s ease-out;
            }
            .container:focus-visible {
                outline: var(--mjo-badge-focus-outline-width, 2px) solid var(--mjo-badge-focus-outline-color);
                outline-offset: var(--mjo-badge-focus-outline-offset, 1px);
            }
            .container[data-hide-outline] {
                border: none;
                outline: none;
            }
            .container[data-color="primary"]:focus-visible {
                --mjo-badge-focus-outline-color: var(--mjo-primary-color, #4e9be4);
            }
            .container[data-color="secondary"]:focus-visible {
                --mjo-badge-focus-outline-color: var(--mjo-secondary-color, #cc3d74);
            }
            .container[data-color="success"]:focus-visible {
                --mjo-badge-focus-outline-color: var(--mjo-color-success, #4caf50);
            }
            .container[data-color="error"]:focus-visible {
                --mjo-badge-focus-outline-color: var(--mjo-color-error, #f44336);
            }
            .container[data-color="info"]:focus-visible {
                --mjo-badge-focus-outline-color: var(--mjo-color-info, #2196f3);
            }
            .container[data-color="warning"]:focus-visible {
                --mjo-badge-focus-outline-color: var(--mjo-color-warning, #ff9800);
            }
            .container[data-color="default"]:focus-visible {
                --mjo-badge-focus-outline-color: var(--mjo-color-default, #999999);
            }
            .container[data-size="small"] {
                font-size: var(--mjo-badge-small-size, 12px);
            }
            .container[data-size="medium"] {
                font-size: var(--mjo-badge-medium-size, 14px);
            }
            .container[data-size="large"] {
                font-size: var(--mjo-badge-large-size, 18px);
            }
            .container[data-color="primary"] {
                background-color: var(--mjo-badge-background-color, var(--mjo-primary-color, #4e9be4));
                color: var(--mjo-badge-color, var(--mjo-primary-foreground-color, currentColor));
            }
            .container[data-color="primary"][data-variant="flat"] {
                background-color: var(--mjo-primary-color-alpha3);
                color: var(--mjo-primary-color);
            }
            .container[data-color="primary"][data-variant="ghost"] {
                background-color: rgba(200, 200, 200, 0.2);
                color: var(--mjo-primary-color);
            }
            .container[data-color="primary"][data-variant="brilliant"] {
                box-shadow: 0 0 1em var(--mjo-primary-color);
            }
            .container[data-color="secondary"] {
                background-color: var(--mjo-badge-background-color, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-badge-color, var(--mjo-secondary-foreground-color, currentColor));
            }
            .container[data-color="secondary"][data-variant="flat"] {
                background-color: var(--mjo-secondary-color-alpha3);
                color: var(--mjo-secondary-color);
            }
            .container[data-color="secondary"][data-variant="ghost"] {
                background-color: rgba(200, 200, 200, 0.2);
                color: var(--mjo-secondary-color);
            }
            .container[data-color="secondary"][data-variant="brilliant"] {
                box-shadow: 0 0 1em var(--mjo-secondary-color);
            }
            .container[data-color="success"] {
                background-color: var(--mjo-badge-background-color, var(--mjo-color-success, #4caf50));
                color: var(--mjo-badge-color, currentColor);
            }
            .container[data-color="success"][data-variant="flat"] {
                color: var(--mjo-color-success, #4caf50);
                background-color: transparent;
                overflow: hidden;
            }
            .container[data-color="success"][data-variant="flat"]::before {
                position: absolute;
                content: "";
                inset: 0;
                opacity: 0.2;
                background-color: var(--mjo-color-success, #4caf50);
            }
            .container[data-color="success"][data-variant="ghost"] {
                background-color: rgba(200, 200, 200, 0.2);
                color: var(--mjo-color-success);
            }
            .container[data-color="success"][data-variant="brilliant"] {
                box-shadow: 0 0 1em var(--mjo-color-success);
            }
            .container[data-color="error"] {
                background-color: var(--mjo-badge-background-color, var(--mjo-color-error, #f44336));
                color: var(--mjo-badge-color, currentColor);
            }
            .container[data-color="error"][data-variant="flat"] {
                background-color: transparent;
                color: var(--mjo-color-error, #f44336);
                overflow: hidden;
            }
            .container[data-color="error"][data-variant="flat"]::before {
                position: absolute;
                content: "";
                inset: 0;
                opacity: 0.2;
                background-color: var(--mjo-color-error, #f44336);
            }
            .container[data-color="error"][data-variant="ghost"] {
                background-color: rgba(200, 200, 200, 0.2);
                color: var(--mjo-color-error);
            }
            .container[data-color="error"][data-variant="brilliant"] {
                box-shadow: 0 0 1em var(--mjo-color-error);
            }
            .container[data-color="info"] {
                background-color: var(--mjo-badge-background-color, var(--mjo-color-info, #2196f3));
                color: var(--mjo-badge-color, currentColor);
            }
            .container[data-color="info"][data-variant="flat"] {
                background-color: transparent;
                color: var(--mjo-color-info, #2196f3);
                overflow: hidden;
            }
            .container[data-color="info"][data-variant="flat"]::before {
                position: absolute;
                content: "";
                inset: 0;
                opacity: 0.2;
                background-color: var(--mjo-color-info, #2196f3);
            }
            .container[data-color="info"][data-variant="ghost"] {
                background-color: rgba(200, 200, 200, 0.2);
                color: var(--mjo-color-info);
            }
            .container[data-color="info"][data-variant="brilliant"] {
                box-shadow: 0 0 1em var(--mjo-color-info);
            }
            .container[data-color="warning"] {
                background-color: var(--mjo-badge-background-color, var(--mjo-color-warning, #ff9800));
                color: var(--mjo-badge-color, currentColor);
            }
            .container[data-color="warning"][data-variant="flat"] {
                background-color: transparent;
                color: var(--mjo-color-warning, #ff9800);
                overflow: hidden;
            }
            .container[data-color="warning"][data-variant="flat"]::before {
                position: absolute;
                content: "";
                inset: 0;
                opacity: 0.2;
                background-color: var(--mjo-color-warning, #ff9800);
            }
            .container[data-color="warning"][data-variant="ghost"] {
                background-color: rgba(200, 200, 200, 0.2);
                color: var(--mjo-color-warning);
            }
            .container[data-color="warning"][data-variant="brilliant"] {
                box-shadow: 0 0 1em var(--mjo-color-warning);
            }
            .container[data-color="default"] {
                background-color: var(--mjo-badge-background-color, var(--mjo-color-default, #999999));
                color: var(--mjo-badge-color, currentColor);
            }
            .container[data-color="default"][data-variant="flat"] {
                background-color: transparent;
                color: var(--mjo-color-default, #999999);
                overflow: hidden;
            }
            .container[data-color="default"][data-variant="flat"]::before {
                position: absolute;
                content: "";
                inset: 0;
                opacity: 0.2;
                background-color: var(--mjo-color-default, #999999);
            }
            .container[data-color="default"][data-variant="ghost"] {
                background-color: rgba(200, 200, 200, 0.2);
                color: var(--mjo-color-default);
            }
            .container[data-color="default"][data-variant="brilliant"] {
                box-shadow: 0 0 1em var(--mjo-color-default);
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
