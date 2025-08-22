import {
    MjoColorPickerBlurEvent,
    MjoColorPickerChangeEvent,
    MjoColorPickerFocusEvent,
    MjoColorPickerFormatChangeEvent,
    MjoColorPickerInputEvent,
} from "./types/mjo-color-picker.js";

import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { ColorFormat, convertColor } from "./utils/colors.js";

import "./components/input/input-helper-text.js";
import "./components/input/input-label.js";

@customElement("mjo-color-picker")
export class MjoColorPicker extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IFormMixin, IInputErrorMixin, IThemeMixin {
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: Boolean }) hideErrors = false;
    @property({ type: Boolean }) rounded = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) format: ColorFormat = "hex";
    @property({ type: Boolean }) showValue = false;

    // Non native Lit ARIA properties
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedBy: string | null = null;

    @query("input") inputElement!: HTMLInputElement;
    @query(".color-picker") colorPicker!: HTMLDivElement;

    type = "colorpicker";

    private get computedAriaLabel(): string {
        if (this.ariaLabel) return this.ariaLabel;
        if (this.label) return this.label;
        return "Color picker";
    }

    private get computedAriaInvalid(): "true" | "false" | undefined {
        if (this.error || this.errormsg) return "true";
        return this.ariaInvalid as "true" | "false" | undefined;
    }

    private get computedAriaDescribedBy(): string | undefined {
        const describedBy: string[] = [];

        if (this.ariaDescribedBy) {
            describedBy.push(this.ariaDescribedBy);
        }

        if (this.helperText && !this.errormsg && !this.successmsg) {
            describedBy.push("helper-text");
        }

        return describedBy.length > 0 ? describedBy.join(" ") : undefined;
    }

    render() {
        return html`
            ${this.label
                ? html`<input-label color=${this.color} label=${this.label} ?error=${this.error} ?data-disabled=${this.disabled}></input-label>`
                : nothing}
            <div class="container" ?data-rounded=${this.rounded} data-size=${this.size} ?data-disabled=${this.disabled}>
                <div class="color-picker" role="presentation" aria-hidden="true"></div>
                <input
                    @change=${this.#handleChange}
                    @input=${this.#handleInput}
                    @focus=${this.#handleFocus}
                    @blur=${this.#handleBlur}
                    type="color"
                    name=${ifDefined(this.name)}
                    ?disabled=${this.disabled}
                    value=${this.value}
                    aria-label=${this.computedAriaLabel}
                    aria-errormessage=${this.errormsg || nothing}
                    aria-invalid=${ifDefined(this.computedAriaInvalid)}
                    aria-required=${ifDefined(this.required)}
                    aria-describedby=${ifDefined(this.computedAriaDescribedBy)}
                />
            </div>
            ${this.showValue ? html`<div class="value-display" aria-live="polite">${this.getFormattedValue(this.format)}</div>` : nothing}
            ${this.helperText || this.errormsg || this.successmsg
                ? html`<input-helper-text errormsg=${ifDefined(this.errormsg)} successmsg=${ifDefined(this.successmsg)}>${this.helperText}</input-helper-text>`
                : nothing}
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.updateFormData({ name: this.name || "", value: this.value });
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this.colorPicker.style.backgroundColor = this.inputElement.value || this.value;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has("format") && changedProperties.get("format") !== undefined) {
            this.#handleFormatChange(changedProperties.get("format") as ColorFormat);
        }

        if (changedProperties.has("value")) {
            this.colorPicker.style.backgroundColor = this.value;
            this.#updateAriaInvalid();
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        try {
            this.value = convertColor(value, this.format);
            this.#updateVisualColor();
        } catch (error) {
            console.warn(`Failed to convert color ${this.value} to format ${this.format}:`, error);
            return this.value;
        }
    }

    getFormattedValue(format: ColorFormat): string {
        if (!this.value) return "";

        try {
            return convertColor(this.value, format);
        } catch (error) {
            console.warn(`Failed to convert color ${this.value} to format ${format}:`, error);
            return this.value;
        }
    }

    #announceColorChange(): void {
        if (!this.value) return;

        const announcement = `Color changed to ${this.getFormattedValue(this.format)}`;
        const liveRegion = document.createElement("div");
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.setAttribute("aria-atomic", "true");
        liveRegion.style.position = "absolute";
        liveRegion.style.left = "-10000px";
        liveRegion.style.width = "1px";
        liveRegion.style.height = "1px";
        liveRegion.style.overflow = "hidden";
        liveRegion.textContent = announcement;

        document.body.appendChild(liveRegion);
        setTimeout(() => document.body.removeChild(liveRegion), 1000);
    }

    #handleInput(event: InputEvent) {
        const target = event.currentTarget as HTMLInputElement;
        this.colorPicker.style.backgroundColor = target.value;
        this.value = convertColor(target.value, this.format);
        this.updateFormData({ name: this.name || "", value: this.value });
        this.#announceColorChange();

        // Dispatch custom input event
        this.dispatchEvent(
            new CustomEvent("mjo-color-input", {
                detail: {
                    element: this,
                    value: this.value,
                    format: this.format,
                },
                bubbles: true,
            }),
        );
    }

    #handleChange() {
        this.#updateAriaInvalid();

        // Dispatch standard change event
        this.dispatchEvent(new Event("change"));

        // Dispatch custom change event
        this.dispatchEvent(
            new CustomEvent("mjo-color-change", {
                detail: {
                    element: this,
                    value: this.value,
                    format: this.format,
                },
                bubbles: true,
            }),
        );
    }

    #handleFocus() {
        this.dispatchEvent(
            new CustomEvent("mjo-color-focus", {
                detail: { element: this },
                bubbles: true,
            }),
        );
    }

    #handleBlur() {
        this.dispatchEvent(
            new CustomEvent("mjo-color-blur", {
                detail: { element: this },
                bubbles: true,
            }),
        );
    }

    #handleFormatChange(previousFormat: ColorFormat): void {
        this.dispatchEvent(
            new CustomEvent("mjo-color-format-change", {
                detail: {
                    element: this,
                    format: this.format,
                    previousFormat: previousFormat,
                    value: this.value,
                },
                bubbles: true,
            }),
        );
    }

    #updateVisualColor(): void {
        if (this.colorPicker) {
            this.colorPicker.style.backgroundColor = this.getFormattedValue("hex");
        }
        if (this.inputElement) {
            this.inputElement.value = this.getFormattedValue("hex");
        }
    }

    #updateAriaInvalid(): void {
        if (this.error || this.errormsg) {
            this.ariaInvalid = "true";
        } else {
            this.ariaInvalid = "false";
        }
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                text-align: left;
                min-width: 150px;
            }
            :host([rounded]) {
                --mjo-input-radius: 50%;
            }
            .container {
                position: relative;
                overflow: hidden;
                border: solid 1px;
                width: inherit;
                width: var(--mjo-color-picker-size-medium, 28px);
                height: var(--mjo-color-picker-size-medium, 28px);
                border-style: var(--mjo-color-picker-border-style, var(--mjo-input-border-style, solid));
                border-width: var(--mjo-color-picker-border-width, var(--mjo-input-border-width, 1px));
                border-color: var(--mjo-color-picker-border-color, var(--mjo-input-border-color, var(--mjo-border-color, #dddddd)));
                box-shadow: var(--mjo-color-picker-box-shadow, var(--mjo-input-box-shadow, none));
                border-radius: var(--mjo-color-picker-radius, var(--mjo-input-radius, var(--mjo-radius, 5px)));
                transition: var(--mjo-color-picker-transition, border-color 0.2s ease, box-shadow 0.2s ease);
            }
            .container:focus-within {
                border-color: var(--mjo-color-picker-border-color-focus, var(--mjo-input-border-color-focus, var(--mjo-primary-color, #1d7fdb)));
                box-shadow: var(--mjo-color-picker-box-shadow-focus, var(--mjo-input-box-shadow-focus, 0 0 0 2px rgba(29, 127, 219, 0.2)));
                outline: none;
            }
            .container[data-size="small"] {
                width: var(--mjo-color-picker-size-small, 20px);
                height: var(--mjo-color-picker-size-small, 20px);
            }
            .container[data-size="large"] {
                width: var(--mjo-color-picker-size-large, 36px);
                height: var(--mjo-color-picker-size-large, 36px);
            }
            .container[data-disabled] {
                opacity: 0.5;
                filter: grayscale(0.5);
                cursor: not-allowed;
            }
            .container[data-disabled]:focus-within {
                border-color: var(--mjo-color-picker-border-color, var(--mjo-input-border-color, var(--mjo-border-color, #dddddd)));
                box-shadow: var(--mjo-color-picker-box-shadow, var(--mjo-input-box-shadow, none));
            }
            input-label[data-disabled] {
                opacity: 0.5;
            }
            input {
                opacity: 0;
                width: 100%;
                height: 100%;
                padding: 0;
                cursor: pointer;
                border: none;
                outline: none;
            }
            input:focus {
                outline: none;
            }
            .container[data-disabled] input {
                cursor: not-allowed;
            }
            .color-picker {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .value-display {
                position: relative;
                color: var(--mjo-color-picker-value-color, var(--mjo-foreground-color-low, #1f2937));
                font-size: var(--mjo-color-picker-value-font-size, 0.75rem);
                font-weight: var(--mjo-color-picker-value-font-weight, 500);
                padding: 2px 0 0;
                text-align: left;
                border-top: none;
                white-space: nowrap;
            }
            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .container {
                    border-width: 2px;
                }
                .container:focus-within {
                    border-width: 3px;
                }
                .value-display {
                    border-width: 2px;
                }
            }
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .container {
                    transition: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-color-picker": MjoColorPicker;
    }

    interface HTMLElementEventMap {
        "mjo-color-input": MjoColorPickerInputEvent;
        "mjo-color-change": MjoColorPickerChangeEvent;
        "mjo-color-focus": MjoColorPickerFocusEvent;
        "mjo-color-blur": MjoColorPickerBlurEvent;
        "mjo-color-format-change": MjoColorPickerFormatChangeEvent;
    }
}
