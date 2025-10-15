import type {
    MjoButtonBlurEvent,
    MjoButtonClickEvent,
    MjoButtonColor,
    MjoButtonFocusEvent,
    MjoButtonLoadingChangeEvent,
    MjoButtonSize,
    MjoButtonToggleEvent,
    MjoButtonType,
    MjoButtonVariant,
} from "./types/mjo-button";

import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-icon.js";
import "./mjo-ripple.js";
import "./mjo-typography.js";

/**
 * @summary Fully accessible button component with multiple variants, interactive states, and comprehensive ARIA support.
 *
 * @description The mjo-button component provides a complete button solution with multiple visual variants,
 * semantic colors, loading states, toggle functionality, and comprehensive accessibility features.
 * It integrates seamlessly with forms and supports both global and per-instance theming.
 *
 * @fires mjo-button:click - Fired when the button is clicked
 * @fires mjo-button:toggle - Fired when toggle state changes (only when toggleable=true)
 * @fires mjo-button:loading-change - Fired when loading state changes
 *
 * @slot - Button text content
 * @csspart button - The native button element
 * @csspart start-icon - The start icon element
 * @csspart end-icon - The end icon element
 * @csspart text - The typography wrapper around the button text
 * @csspart loading - The loading indicator element (visible when `loading` is true)
 */
@customElement("mjo-button")
export class MjoButton extends ThemeMixin(FormMixin(LitElement)) implements IThemeMixin, IFormMixin {
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) loading = false;
    @property({ type: Boolean }) rounded = false;
    @property({ type: Boolean }) toggleable = false;
    @property({ type: Boolean }) smallCaps = false;
    @property({ type: Boolean }) noink = false;
    @property({ type: String }) startIcon?: string;
    @property({ type: String }) endIcon?: string;
    @property({ type: String }) size: MjoButtonSize = "medium";
    @property({ type: String }) color: MjoButtonColor = "primary";
    @property({ type: String }) variant: MjoButtonVariant = "default";
    @property({ type: String }) type: MjoButtonType = "button";

    // Accessibility properties
    @property({ type: String }) buttonLabel?: string;
    @property({ type: String }) describedBy?: string;

    @state() private toggle = false;

    #styles = "";

    render() {
        super.render();
        const ariaBusy = this.loading ? "true" : "false";
        const ariaPressed = this.toggleable ? (this.toggle ? "true" : "false") : undefined;

        return html`
            ${this.applyThemeSsr()} ${unsafeHTML(this.#styles)}
            <button
                type=${this.type}
                part="button"
                data-color=${this.color}
                data-variant=${this.variant}
                data-size=${this.size}
                ?data-rounded=${this.rounded}
                ?data-toggle=${this.toggle}
                ?data-small-caps=${this.smallCaps}
                aria-busy=${ariaBusy}
                aria-pressed=${ifDefined(ariaPressed)}
                aria-label=${ifDefined(this.buttonLabel)}
                aria-describedby=${ifDefined(this.describedBy)}
                ?disabled=${this.disabled || this.loading}
                tabindex=${!this.disabled && !this.getAttribute("tabindex") ? "0" : "-1"}
                @click=${this.#handleClick}
            >
                ${this.startIcon && html` <mjo-icon exportparts="icon: start-icon" src=${this.startIcon}></mjo-icon>`}
                <mjo-typography tag="none" part="text"><slot></slot></mjo-typography>
                ${this.endIcon && html` <mjo-icon exportparts="icon: end-icon" src=${this.endIcon}></mjo-icon>`}
                ${!this.noink && !this.disabled && !this.loading ? html`<mjo-ripple></mjo-ripple>` : nothing}
                ${this.loading ? html`<div class="loading" aria-hidden="true" part="loading"></div>` : nothing}
            </button>
        `;
    }

    protected willUpdate(_changedProperties: PropertyValues<this>): void {
        super.willUpdate(_changedProperties);

        // Update button CSS variables when color or variant changes
        if (_changedProperties.has("color") || _changedProperties.has("variant") || _changedProperties.has("disabled") || _changedProperties.has("loading")) {
            this.#setButtonCssVars();
        }
    }

    protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);

        // Reset toggle state when disabled or loading
        if ((this.disabled || this.loading) && this.toggle) {
            this.toggle = false;
        }

        // Dispatch loading change event
        if (_changedProperties.has("loading")) {
            this.#dispatchLoadingChangeEvent();
        }

        // Dispatch toggle event when toggle state changes
        if (_changedProperties.has("toggle") && this.toggleable) {
            this.#dispatchToggleEvent(_changedProperties.get("toggle") as boolean);
        }
    }

    /**
     * Sets focus to the button
     */
    focus(options?: FocusOptions) {
        const button = this.shadowRoot?.querySelector("button");
        button?.focus(options);
    }

    /**
     * Removes focus from the button
     */
    blur() {
        const button = this.shadowRoot?.querySelector("button");
        button?.blur();
    }

    /**
     * Simulates a click on the button
     */
    click() {
        const button = this.shadowRoot?.querySelector("button");
        button?.click();
    }

    /**
     * Sets the button as busy/loading
     */
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    /**
     * Toggles the button pressed state (only works if toggleable is true)
     */
    togglePressed() {
        if (this.toggleable && !this.disabled && !this.loading) {
            this.toggle = !this.toggle;
        }
    }

    #handleClick(event: MouseEvent) {
        // Prevent action if disabled or loading
        if (this.disabled || this.loading) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        // Handle toggle functionality
        if (this.toggleable && this.type === "button") {
            this.toggle = !this.toggle;
        }

        // Handle form submission
        if (this.form && this.type === "submit") {
            this.submitForm();
        }

        // Dispatch custom click event
        this.#dispatchClickEvent(event);
    }

    #dispatchClickEvent(originalEvent: MouseEvent) {
        const clickEvent: MjoButtonClickEvent = new CustomEvent("mjo-button:click", {
            detail: {
                element: this,
                toggle: this.toggle,
                originalEvent,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(clickEvent);
    }

    #dispatchToggleEvent(previousState: boolean) {
        const toggleEvent: MjoButtonToggleEvent = new CustomEvent("mjo-button:toggle", {
            detail: {
                element: this,
                pressed: this.toggle,
                previousState,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(toggleEvent);
    }

    #dispatchLoadingChangeEvent() {
        const loadingEvent: MjoButtonLoadingChangeEvent = new CustomEvent("mjo-button:loading-change", {
            detail: {
                element: this,
                loading: this.loading,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(loadingEvent);
    }

    #setButtonCssVars() {
        // Color property mapping
        const colorMap = {
            primary: "var(--mjo-primary-color, #1aa8ed)",
            secondary: "var(--mjo-secondary-color, #7dc717)",
            success: "var(--mjo-color-success, #4caf50)",
            info: "var(--mjo-color-info, #2196f3)",
            warning: "var(--mjo-color-warning, #ff9800)",
            error: "var(--mjo-color-error, #f44336)",
        };

        // Hover color mapping
        const hoverColorMap = {
            primary: "var(--mjo-primary-color-hover, #4e9be4)",
            secondary: "var(--mjo-secondary-color-hover, #d86490)",
            success: "var(--mjo-color-success, #4caf50)",
            info: "var(--mjo-color-info, #2196f3)",
            warning: "var(--mjo-color-warning, #ff9800)",
            error: "var(--mjo-color-error, #f44336)",
        };

        // Foreground color mapping
        const foregroundColorMap = {
            primary: "var(--mjo-primary-foreground-color, white)",
            secondary: "var(--mjo-secondary-foreground-color, white)",
            success: "var(--mjo-color-success-foreground, white)",
            info: "var(--mjo-color-info-foreground, white)",
            warning: "var(--mjo-color-warning-foreground, white)",
            error: "var(--mjo-color-error-foreground, white)",
        };

        // Alpha color mapping for flat variant
        const alphaColorMap: Partial<Record<MjoButtonColor, string>> = {
            primary: "var(--mjo-primary-color-alpha2, #1d7fdb22)",
            secondary: "var(--mjo-secondary-color-alpha2, #cc3d7422)",
        };

        const currentColor = colorMap[this.color];
        const currentHoverColor = hoverColorMap[this.color];
        const currentForegroundColor = foregroundColorMap[this.color];

        // Check if disabled or loading
        const isDisabledOrLoading = this.disabled || this.loading;

        // Default values for normal state
        let backgroundColor = currentColor;
        let borderColor = currentColor;
        let borderStyle = "solid";
        let textColor = currentForegroundColor;
        let hoverBackgroundColor = currentHoverColor;
        let hoverBorderColor = currentHoverColor;
        let hoverOpacity = "1";
        let pseudoBackground = "transparent";
        let pseudoOpacity = "0";

        // Handle disabled/loading state first
        if (isDisabledOrLoading) {
            backgroundColor = "var(--mjo-disabled-color, #e0e0e0)";
            borderColor = "var(--mjo-disabled-color, #e0e0e0)";
            textColor = "var(--mjo-disabled-foreground-color, #aaaaaa)";
            hoverBackgroundColor = backgroundColor;
            hoverBorderColor = borderColor;
            hoverOpacity = "1";

            // Special loading states for variants
            if (this.loading) {
                switch (this.variant) {
                    case "ghost":
                    case "dashed":
                    case "link":
                        backgroundColor = "transparent";
                        borderColor = currentColor;
                        textColor = currentColor;
                        break;
                    case "flat": {
                        const alphaColor = alphaColorMap[this.color];
                        if (alphaColor) {
                            backgroundColor = alphaColor;
                            textColor = currentForegroundColor;
                        } else {
                            backgroundColor = "transparent";
                            pseudoBackground = currentColor;
                            pseudoOpacity = "0.2";
                            textColor = "white";
                        }
                        borderColor = "transparent";
                        break;
                    }
                    case "text":
                        backgroundColor = "transparent";
                        borderColor = "transparent";
                        textColor = "currentColor";
                        break;
                }
            }
        } else {
            // Normal state - variant-specific styling
            switch (this.variant) {
                case "ghost": {
                    backgroundColor = "transparent";
                    textColor = currentColor;
                    hoverBackgroundColor = "var(--mjo-background-color-high)";
                    hoverBorderColor = borderColor;
                    break;
                }
                case "flat": {
                    const alphaColor = alphaColorMap[this.color];
                    if (alphaColor) {
                        backgroundColor = alphaColor;
                        hoverBackgroundColor = `var(--mjo-${this.color}-color-alpha1, ${alphaColor})`;
                    } else {
                        backgroundColor = "transparent";
                        pseudoBackground = currentColor;
                        pseudoOpacity = "0.2";
                        textColor = "white";
                        hoverBackgroundColor = "transparent";
                    }
                    textColor = currentColor;
                    borderColor = "transparent";
                    hoverBorderColor = "transparent";
                    break;
                }
                case "dashed": {
                    backgroundColor = "transparent";
                    borderStyle = "dashed";
                    textColor = currentColor;
                    hoverBackgroundColor = "var(--mjo-background-color-high)";
                    hoverBorderColor = borderColor;
                    break;
                }
                case "link": {
                    backgroundColor = "transparent";
                    borderColor = "transparent";
                    textColor = currentColor;
                    hoverBackgroundColor = "transparent";
                    hoverBorderColor = "transparent";
                    break;
                }
                case "text": {
                    backgroundColor = "transparent";
                    borderColor = "transparent";
                    textColor = "currentColor";
                    hoverBackgroundColor = "var(--mjo-background-color-high)";
                    hoverBorderColor = "transparent";
                    hoverOpacity = "1";
                    break;
                }
                default: {
                    // Default/solid variant
                    if (this.color === "success" || this.color === "info" || this.color === "warning" || this.color === "error") {
                        hoverOpacity = "0.8";
                        hoverBackgroundColor = currentColor;
                        hoverBorderColor = currentColor;
                    }
                    break;
                }
            }
        }

        // Apply CSS variables
        // eslint-disable-next-line max-len
        this.#styles = `<style>:host{--mjoint-button-background-color: ${backgroundColor};--mjoint-button-border-color: ${borderColor};--mjoint-button-border-style: ${borderStyle};--mjoint-button-text-color: ${textColor};--mjoint-button-hover-background-color: ${hoverBackgroundColor};--mjoint-button-hover-border-color: ${hoverBorderColor};--mjoint-button-hover-opacity: ${hoverOpacity};--mjoint-button-pseudo-background: ${pseudoBackground};--mjoint-button-pseudo-opacity: ${pseudoOpacity};--mjoint-button-focus-outline-color: ${currentColor};--mjoint-button-loading-color: ${currentColor};}</style>`;
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                cursor: pointer;
            }
            :host([fullwidth]) {
                width: 100%;
            }
            button {
                align-items: center;
                background: var(--mjo-button-background-color, var(--mjoint-button-background-color));
                border-radius: var(--mjo-button-border-radius, var(--mjo-radius-medium, 5px));
                border: var(--mjo-button-border, var(--mjoint-button-border-style, solid) 1px var(--mjoint-button-border-color));
                box-sizing: border-box;
                color: var(--mjo-button-color, var(--mjoint-button-text-color));
                cursor: inherit;
                display: flex;
                flex-flow: row nowrap;
                font-size: var(--mjo-button-font-size, 1rem);
                font-weight: var(--mjo-button-font-weight, normal);
                font-family: var(--mjo-button-font-family, inherit);
                gap: var(--mjo-button-gap, 5px);
                justify-content: center;
                overflow: hidden;
                padding: var(--mjo-button-padding, calc(1em / 2 - 1px) calc(1em / 2 + 2px));
                position: relative;
                transition: all 0.3s;
                width: 100%;
                outline-color: transparent;
                outline-offset: 2px;
                outline-width: 2px;
                outline-style: solid;
            }
            button::before {
                position: absolute;
                content: "";
                inset: 0;
                opacity: var(--mjoint-button-pseudo-opacity, 0);
                background-color: var(--mjoint-button-pseudo-background, transparent);
            }
            button:hover {
                background: var(--mjo-button-background-color-hover, var(--mjoint-button-hover-background-color));
                border-color: var(--mjoint-button-hover-border-color);
                opacity: var(--mjo-button-opacity-hover, var(--mjoint-button-hover-opacity, 1));
            }
            button:focus-visible {
                outline-color: var(--mjo-button-background-color, var(--mjoint-button-focus-outline-color));
            }
            /* Ensure high contrast mode compatibility */
            @media (prefers-contrast: high) {
                button {
                    border-width: 2px;
                }
                button:focus {
                    outline-width: 3px;
                }
            }
            button[data-small-caps] {
                font-variant: all-small-caps;
            }
            /* Size variants */
            button[data-size="small"] {
                padding: calc(1em / 2 - 3px) calc(1em / 2);
                font-size: 0.8em;
            }
            button[data-size="large"] {
                padding: calc(1em / 2) calc(1em / 2 + 3px);
                font-size: 1.2em;
            }
            /* Rounded buttons */
            button[data-rounded] {
                border-radius: 100%;
                gap: 0;
                padding: 0.7em;
            }
            button[data-rounded][data-size="small"] {
                padding: 0.5em;
            }
            button[data-rounded][data-size="large"] {
                padding: 0.9em;
            }
            /* Toggle state */
            button[data-toggle] {
                box-shadow: inset 0px 0px 20px #333333;
            }
            /* Icon and text layout */
            button mjo-icon,
            button span {
                flex: 0 0 auto;
            }
            button mjo-icon {
                font-size: 1em;
            }
            mjo-typography {
                line-height: 1em;
            }
            /* Loading indicator */
            .loading {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0.2em;
                background-color: var(--mjo-button-loading-color, var(--mjoint-button-loading-color));
                animation: loading 1.5s infinite;
            }
            button[data-size="small"] .loading {
                height: 0.19em;
            }
            button[data-size="large"] .loading {
                height: 0.21em;
            }
            /* Respect user's motion preferences */
            @media (prefers-reduced-motion: reduce) {
                .loading {
                    animation: none;
                    background: repeating-linear-gradient(90deg, transparent, transparent 0.2em, currentColor 0.2em, currentColor 0.4em);
                }
                button {
                    transition: none;
                }
            }

            @keyframes loading {
                0% {
                    width: 0%;
                }
                50% {
                    left: 0%;
                    width: 100%;
                }
                100% {
                    left: 100%;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-button": MjoButton;
    }

    interface HTMLElementEventMap {
        "mjo-button:click": MjoButtonClickEvent;
        "mjo-button:toggle": MjoButtonToggleEvent;
        "mjo-button:loading-change": MjoButtonLoadingChangeEvent;
        "mjo-button:focus": MjoButtonFocusEvent;
        "mjo-button:blur": MjoButtonBlurEvent;
    }
}
