import { MjoChipClickEvent, MjoChipCloseEvent } from "./types/mjo-chip.js";

import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillCloseCircle } from "mjo-icons/ai";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { pause } from "./utils/utils.js";

import "./mjo-icon.js";
import "./mjo-typography.js";

/**
 * @summary Flexible chip component for displaying compact information with multiple variants, colors, and interactive capabilities.
 *
 * @fires mjo-chip:click - Fired when the chip is clicked (when clickable is true)
 * @fires mjo-chip:close - Fired when the close button is clicked (when closable is true)
 *
 * @csspart container - The main chip container element
 * @csspart label - The text label element (via exportparts from mjo-typography)
 * @csspart start-icon - The start icon element (via exportparts from mjo-icon)
 * @csspart end-icon - The end icon element (via exportparts from mjo-icon)
 * @csspart close-icon - The close button icon element (via exportparts from mjo-icon)
 */
@customElement("mjo-chip")
export class MjoChip extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Boolean }) closable = false;
    @property({ type: Boolean }) clickable = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) color: "primary" | "secondary" | "default" | "success" | "warning" | "info" | "error" = "default";
    @property({ type: String }) endIcon?: string;
    @property({ type: String }) label = "";
    @property({ type: String }) radius: "small" | "medium" | "large" | "full" | "none" = "full";
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) startIcon?: string;
    @property({ type: String }) value?: string;
    @property({ type: String }) variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot" = "solid";
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;
    @property({ type: String, attribute: "aria-label", reflect: true }) override ariaLabel: string | null = null;

    @query(".container") private container!: HTMLElement;

    #styles = "";

    render() {
        return html`${unsafeHTML(this.#styles)}
            <div
                class="container"
                part="container"
                role=${ifDefined(this.clickable || this.closable ? "button" : undefined)}
                aria-label=${this.#computedAriaLabel}
                aria-describedby=${ifDefined(this.ariaDescribedby)}
                aria-disabled=${this.disabled ? "true" : "false"}
                tabindex=${this.#computedTabIndex}
                data-color=${this.color}
                data-size=${this.size}
                data-variant=${this.variant}
                data-radius=${this.radius}
                ?data-closable=${this.closable}
                ?data-clickable=${this.clickable}
                ?data-disabled=${this.disabled}
                @click=${this.#handleChipClick}
                @keydown=${this.#handleKeydown}
            >
                ${this.variant === "dot" ? html`<span class="dot"></span>` : nothing}
                ${this.startIcon ? html`<mjo-icon src=${this.startIcon} exportparts="icon: start-icon"></mjo-icon>` : nothing}
                <mjo-typography tag="none" class="label" exportparts="typography: label">${this.label}</mjo-typography>
                ${this.endIcon ? html`<mjo-icon src=${this.endIcon} exportparts="icon: end-icon"></mjo-icon>` : nothing}
                ${this.closable
                    ? html`<mjo-icon
                          class="close"
                          exportparts="icon: close-icon"
                          src=${AiFillCloseCircle}
                          @click=${this.#handleCloseClick}
                          @keydown=${this.#handleCloseKeydown}
                          role="button"
                          tabindex=${this.disabled ? "-1" : "0"}
                          aria-label="Close ${this.label}"
                      ></mjo-icon>`
                    : nothing}
            </div>`;
    }

    get #computedAriaLabel() {
        if (this.ariaLabel) return this.ariaLabel;

        if (this.clickable && this.closable) {
            return `${this.label}. Clickable chip with close button`;
        } else if (this.clickable) {
            return `${this.label}. Click to interact`;
        } else if (this.closable) {
            return `${this.label}. Press to close`;
        }

        return `Chip: ${this.label}`;
    }

    get #computedTabIndex() {
        if (this.clickable) return 0;
        return -1;
    }

    #handleKeydown(event: KeyboardEvent) {
        if (this.disabled) return;

        if (event.key === "Escape" && this.closable) {
            event.preventDefault();
            this.#handleCloseClick(event);
        }

        if ((event.key === "Enter" || event.key === " ") && this.clickable) {
            event.preventDefault();
            this.#handleChipClick();
        }
    }

    #handleCloseKeydown(event: KeyboardEvent) {
        if (this.disabled) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            this.#handleCloseClick(event);
        }
    }

    async #handleChipClick() {
        if (!this.clickable || this.disabled) return;

        this.dispatchEvent(
            new CustomEvent("mjo-chip:click", {
                bubbles: true,
                composed: true,
                detail: { value: this.value || this.label },
            }),
        );

        // Add visual feedback animation
        if (this.container) {
            this.container.style.transform = "scale(0.95)";
            await pause(100);
            this.container.style.transform = "scale(1.02)";
            await pause(150);
            this.container.removeAttribute("style");
        }
    }

    #handleCloseClick(event?: Event) {
        if (this.disabled) return;

        if (event) {
            event.stopPropagation();
        }

        this.dispatchEvent(
            new CustomEvent("mjo-chip:close", {
                bubbles: true,
                composed: true,
                detail: { value: this.value || this.label },
            }),
        );

        this.remove();
    }

    protected willUpdate(_changedProperties: PropertyValues<this>): void {
        if (_changedProperties.has("color") || _changedProperties.has("variant") || _changedProperties.has("size") || _changedProperties.has("radius")) {
            this.#setChipCssVars();
        }
    }

    #setChipCssVars() {
        // Color property mapping
        const colorMap = {
            default: "var(--mjo-color-gray-400)",
            primary: "var(--mjo-primary-color)",
            secondary: "var(--mjo-secondary-color)",
            success: "var(--mjo-color-success)",
            info: "var(--mjo-color-info)",
            warning: "var(--mjo-color-warning)",
            error: "var(--mjo-color-error)",
        };

        // Foreground color mapping
        const foregroundColorMap = {
            default: "var(--mjo-color-white)",
            primary: "var(--mjo-primary-foreground-color)",
            secondary: "var(--mjo-secondary-foreground-color)",
            success: "var(--mjo-color-white)",
            info: "var(--mjo-color-white)",
            warning: "var(--mjo-color-white)",
            error: "var(--mjo-color-white)",
        };

        // Alpha colors for flat variant
        const alphaColorMap = {
            primary: "var(--mjo-primary-color-alpha2)",
            secondary: "var(--mjo-secondary-color-alpha2)",
        };

        // Shadow colors for shadow variant
        const shadowColorMap = {
            default: "rgba(0, 0, 0, 0.2)",
            primary: "var(--mjo-primary-color-alpha5)",
            secondary: "var(--mjo-secondary-color-alpha5)",
            success: "var(--mjo-color-green-alpha5)",
            warning: "var(--mjo-color-yellow-alpha5)",
            info: "var(--mjo-color-cyan-alpha5)",
            error: "var(--mjo-color-red-alpha5)",
        };

        const currentColor = colorMap[this.color];
        const currentForegroundColor = foregroundColorMap[this.color];

        // Default values
        let backgroundColor = currentColor;
        let textColor = currentForegroundColor;
        let borderColor = "transparent";
        let borderWidth = "0px";
        let boxShadow = "none";
        let pseudoBackground = "transparent";
        let pseudoOpacity = "0";
        let closeIconColor = "rgba(0, 0, 0, 0.6)";

        // Variant-specific styling
        switch (this.variant) {
            case "solid": {
                // Default solid variant
                backgroundColor = currentColor;
                textColor = currentForegroundColor;
                closeIconColor = "rgba(0, 0, 0, 0.6)";
                break;
            }
            case "bordered": {
                backgroundColor = "transparent";
                textColor = currentColor;
                borderColor = currentColor;
                borderWidth =
                    this.size === "small"
                        ? "var(--mjo-chip-border-width-size-small, 1px)"
                        : this.size === "large"
                          ? "var(--mjo-chip-border-width-size-large, 3px)"
                          : "var(--mjo-chip-border-width-size-medium, 2px)";
                closeIconColor = currentColor;
                break;
            }
            case "light": {
                backgroundColor = "transparent";
                textColor = currentColor;
                closeIconColor = currentColor;
                break;
            }
            case "flat": {
                textColor = currentColor;
                closeIconColor = currentColor;
                const alphaColor = alphaColorMap[this.color as keyof typeof alphaColorMap];
                if (alphaColor) {
                    backgroundColor = alphaColor;
                } else {
                    backgroundColor = "transparent";
                    pseudoBackground = currentColor;
                    pseudoOpacity = "0.1";
                }
                break;
            }
            case "faded": {
                backgroundColor = "rgba(0, 0, 0, 0.1)";
                textColor = this.color === "default" ? "var(--mjo-foreground-color)" : currentColor;
                closeIconColor = currentColor;
                break;
            }
            case "shadow": {
                backgroundColor = currentColor;
                textColor = this.color === "warning" ? "var(--mjo-color-black)" : currentForegroundColor;
                boxShadow = `0px 2px 5px ${shadowColorMap[this.color]}`;
                closeIconColor = "rgba(0, 0, 0, 0.6)";
                break;
            }
            case "dot": {
                backgroundColor = "transparent";
                textColor = "var(--mjo-foreground-color)";
                borderColor = "var(--mjo-foreground-color-low)";
                borderWidth =
                    this.size === "small"
                        ? "var(--mjo-chip-border-width-size-small, 1px)"
                        : this.size === "large"
                          ? "var(--mjo-chip-border-width-size-large, 3px)"
                          : "var(--mjo-chip-border-width-size-medium, 2px)";
                closeIconColor = currentColor;
                // For dot variant, the dot color should match the chip's color
                break;
            }
        }

        // Size-specific values
        let fontSize, lineHeight, height;
        switch (this.size) {
            case "small":
                fontSize = "var(--mjo-chip-font-size-small-size, 0.75em)";
                lineHeight = "var(--mjo-chip-line-height-small-size, 0.75em)";
                height = "1.5em";
                break;
            case "large":
                fontSize = "var(--mjo-chip-font-size-large-size, 1.1em)";
                lineHeight = "var(--mjo-chip-line-height-large-size, 1.2em)";
                height = "1.8em";
                break;
            default: // medium
                fontSize = "var(--mjo-chip-font-size-medium-size, 0.9em)";
                lineHeight = "var(--mjo-chip-line-height-medium-size, 1em)";
                height = "1.8em";
        }

        // Radius values
        let borderRadius;
        switch (this.radius) {
            case "none":
                borderRadius = "0px";
                break;
            case "small":
                borderRadius = "5px";
                break;
            case "medium":
                borderRadius = "10px";
                break;
            case "large":
                borderRadius = "20px";
                break;
            default: // full
                borderRadius = "9999px";
        }

        // Apply CSS variables
        // eslint-disable-next-line max-len
        this.#styles = `<style>:host{--mjoint-chip-background-color: ${backgroundColor};--mjoint-chip-text-color: ${textColor};--mjoint-chip-border-color: ${borderColor};--mjoint-chip-border-width: ${borderWidth};--mjoint-chip-box-shadow: ${boxShadow};--mjoint-chip-pseudo-background: ${pseudoBackground};--mjoint-chip-pseudo-opacity: ${pseudoOpacity};--mjoint-chip-close-icon-color: ${closeIconColor};--mjoint-chip-font-size: ${fontSize};--mjoint-chip-line-height: ${lineHeight};--mjoint-chip-height: ${height};--mjoint-chip-border-radius: ${borderRadius};--mjoint-chip-focus-outline-color: ${currentColor};--mjoint-chip-dot-color: ${currentColor};}</style>`;
    }

    static styles = [
        css`
            :host {
                display: inline-flex;
            }
            .container {
                position: relative;
                background-color: var(--mjoint-chip-background-color);
                color: var(--mjoint-chip-text-color);
                border: var(--mjoint-chip-border-width) solid var(--mjoint-chip-border-color);
                border-radius: var(--mjoint-chip-border-radius);
                font-size: var(--mjoint-chip-font-size);
                line-height: var(--mjoint-chip-line-height);
                height: var(--mjoint-chip-height);
                box-shadow: var(--mjoint-chip-box-shadow);
                vertical-align: middle;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                padding: var(--mjo-chip-padding, 0 0.75em);
                gap: var(--mjo-chip-gap, 0.4em);
                overflow: hidden;
                z-index: 1;
            }
            .container::before {
                content: "";
                position: absolute;
                inset: 0;
                opacity: var(--mjoint-chip-pseudo-opacity);
                background-color: var(--mjoint-chip-pseudo-background);
                border-radius: var(--mjoint-chip-border-radius);
                z-index: -1;
            }
            .dot {
                width: 0.9em;
                height: 0.9em;
                border-radius: 9999px;
                background-color: var(--mjoint-chip-dot-color);
                flex-grow: 0;
                flex-basis: auto;
            }
            .container[data-size="small"] .dot {
                width: 0.75em;
                height: 0.75em;
            }
            .container[data-size="large"] .dot {
                width: 1.1em;
                height: 1.1em;
            }
            mjo-icon {
                font-size: 1em;
                flex-grow: 0;
                flex-basis: auto;
            }
            mjo-icon.close {
                color: var(--mjoint-chip-close-icon-color);
                cursor: pointer;
                transition: opacity 0.2s;
            }
            mjo-icon.close:hover {
                opacity: 0.8;
            }
            .label {
                flex-grow: 1;
                flex-basis: 0;
                white-space: nowrap;
            }
            .container[data-closable] {
                padding-right: 0.25em;
            }
            .container[data-disabled] {
                opacity: 0.5;
                pointer-events: none;
            }

            /* Accessibility and interaction styles */
            .container[data-clickable] {
                user-select: none;
                cursor: pointer;
                transition: transform 0.2s ease-in-out;
            }
            .container:focus-visible,
            .container[data-clickable]:hover {
                outline: 2px solid var(--mjoint-chip-focus-outline-color);
                outline-offset: 2px;
            }

            /* Close button improvements */
            mjo-icon.close {
                cursor: pointer;
                transition: opacity 0.2s ease;
            }
            mjo-icon.close:hover:not([aria-disabled="true"]) {
                opacity: 0.8;
            }
            mjo-icon.close:focus-visible {
                outline: 1px solid #000000;
                outline-offset: 1px;
                border-radius: 9999px;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-chip": MjoChip;
    }

    interface HTMLElementEventMap {
        "mjo-chip:click": MjoChipClickEvent;
        "mjo-chip:close": MjoChipCloseEvent;
    }
}
