import type { MjoRadioGroup } from "./mjo-radio-group.js";
import type { MjoRadioBlurEvent, MjoRadioChangeEvent, MjoRadioColor, MjoRadioFocusEvent } from "./types/mjo-radio.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FaCheck } from "mjo-icons/fa";

import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { searchParentElement } from "./utils/shadow-dom.js";

import "./components/input/mjoint-input-helper-text.js";
import "./mjo-icon.js";
import "./mjo-typography.js";

/**
 * @summary A customizable radio button component with form integration, validation support, and enhanced accessibility.
 *
 * @fires change - Standard HTML input change event for form compatibility
 * @fires mjo-radio:change - Enhanced custom event with detailed state information
 * @fires mjo-radio:focus - Fired when radio button receives focus
 * @fires mjo-radio:blur - Fired when radio button loses focus
 *
 * @cssproperty --mjo-radio-border-color - Border color for unchecked state
 * @cssproperty --mjo-radio-checked-color - Color when checked
 * @cssproperty --mjo-radio-checked-border-color - Border color when checked
 * @cssproperty --mjo-radio-checked-icon-color - Icon color when checked
 * @cssproperty --mjo-radio-disabled-opacity - Opacity when disabled
 * @cssproperty --mjo-radio-error-border-color - Border color in error state
 * @cssproperty --mjo-radio-error-background-color - Background color in error state
 * @cssproperty --mjo-radio-error-icon-color - Icon color in error state
 * @cssproperty --mjo-radio-error-label-color - Label color in error state
 * @cssproperty --mjo-radio-focus-color - Focus indicator shadow color
 * @cssproperty --mjo-radio-focus-outline-color - Focus outline color
 * @cssproperty --mjo-radio-label-color - Label text color
 * @cssproperty --mjo-radio-label-font-size - Label font size
 * @cssproperty --mjo-radio-label-font-weight - Label font weight
 * @cssproperty --mjo-radio-helper-color - Helper text color
 * @cssproperty --mjo-radio-helper-font-size - Helper text font size
 * @cssproperty --mjo-radio-helper-font-weight - Helper text font weight
 * @cssproperty --mjo-space-small - Spacing between radio and label
 *
 * @csspart container - The main radio button container
 * @csspart box - The radio button visual container
 * @csspart radio - The radio button itself
 * @csspart radio-inner - The inner area containing the check icon
 * @csspart radio-icon - The check icon (via exportparts)
 * @csspart label-container - Container for the label text
 * @csspart label-text - The label typography element (via exportparts)
 * @csspart helper-text-container - Container for helper text (via exportparts)
 * @csspart helper-text-typography - The helper text typography element (via exportparts)
 * @csspart helper-text-msg-container - Container for error/success messages (via exportparts)
 * @csspart helper-text-msg-error-message - Error message element (via exportparts)
 * @csspart helper-text-msg-success-message - Success message element (via exportparts)
 * @csspart helper-text-msg-icon - Icon in error/success messages (via exportparts)
 */
@customElement("mjo-radio")
export class MjoRadio extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IThemeMixin, IFormMixin, IInputErrorMixin {
    @property({ type: String }) color: MjoRadioColor = "primary";
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: Boolean }) hideErrors = false;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    @query("input") inputElement!: HTMLInputElement;
    @query(".radio-container") radioContainer!: HTMLElement;

    group: MjoRadioGroup | null = null;
    type = "radio";

    // Computed properties for accessibility
    private get computedAriaChecked(): "true" | "false" {
        return this.checked ? "true" : "false";
    }

    private get computedAriaLabel(): string | undefined {
        if (this.ariaLabel) return this.ariaLabel;
        if (!this.label) return undefined;

        let baseLabel = this.label;
        if (this.required || this.ariaRequired) baseLabel += " (required)";
        if (this.checked) baseLabel += " (selected)";

        return baseLabel;
    }

    private get computedTabIndex(): number {
        return this.disabled ? -1 : 0;
    }

    render() {
        return html`
            ${this.applyThemeSsr()}
            <div class="container" ?data-disabled=${this.disabled} data-color=${this.color} data-size=${this.size} ?data-error=${this.error}>
                <div
                    class="radio-container"
                    part="container"
                    role="radio"
                    aria-checked=${this.computedAriaChecked}
                    aria-label=${ifDefined(this.computedAriaLabel)}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    aria-disabled=${this.disabled ? "true" : "false"}
                    aria-invalid=${this.error ? "true" : "false"}
                    tabindex=${this.computedTabIndex}
                    @click=${this.#handleClick}
                    @keydown=${this.#handleKeydown}
                    @focus=${this.#handleFocus}
                    @blur=${this.#handleBlur}
                >
                    <div class="box" part="box">
                        <div class="checkbox" part="radio" ?data-checked=${this.checked}>
                            <div class="inner" part="radio-inner">
                                <mjo-icon src=${FaCheck} exportparts="icon: radio-icon"></mjo-icon>
                            </div>
                        </div>
                    </div>
                    ${this.label
                        ? html`
                              <div class="label-container" part="label-container">
                                  <mjo-typography tag="none" class="label" part="label-text">${this.label}</mjo-typography>
                              </div>
                          `
                        : nothing}
                    <input
                        id=${ifDefined(this.id)}
                        type="radio"
                        name=${ifDefined(this.name)}
                        value=${ifDefined(this.value)}
                        ?checked=${this.checked}
                        ?disabled=${this.disabled}
                        ?required=${this.required}
                        aria-hidden="true"
                        tabindex="-1"
                    />
                </div>
                ${this.helperText
                    ? html`
                          <mjoint-input-helper-text
                              exportparts="
                            container: helper-text-container,
                            helper-text: helper-text-typography"
                          >
                              ${this.helperText}
                          </mjoint-input-helper-text>
                      `
                    : nothing}
                ${this.errormsg || this.successmsg
                    ? html`
                          <mjoint-input-helper-text
                              exportparts="
                            container: helper-text-msg-container,
                            error-message: helper-text-msg-error-message,
                            success-message: helper-text-msg-success-message,
                            icon: helper-text-msg-icon"
                              .errormsg=${this.errormsg}
                              .successmsg=${this.successmsg}
                          ></mjoint-input-helper-text>
                      `
                    : nothing}
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#searchGroup();

        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
    }

    #searchGroup() {
        this.group = searchParentElement(this, "mjo-radio-group") as MjoRadioGroup | null;
        this.group?.updateComplete.then(() => {
            this.group?.pushRadio(this);
        });
    }

    /**
     * Returns the current value of the radio button if checked, empty string otherwise
     */
    getValue() {
        return this.checked ? this.value : "";
    }

    /**
     * Sets the value of the radio button
     */
    setValue(value: string) {
        this.value = value;
    }

    /**
     * Programmatically sets the checked state of the radio button
     */
    setChecked(checked: boolean) {
        this.#handleClick(checked);
    }

    /**
     * Programmatically clicks the radio button
     */
    click(): void {
        this.#handleClick();
    }

    /**
     * Toggles the checked state of the radio button
     */
    toggle() {
        this.#handleClick();
    }

    /**
     * Validates the radio button and displays a validation message if invalid
     */
    reportValidity(): boolean {
        return this.inputElement.reportValidity();
    }

    /**
     * Sets a custom validation message for the radio button
     */
    setCustomValidity(message: string): void {
        this.inputElement.setCustomValidity(message);
    }

    #handleClick(newValue?: boolean) {
        if (this.disabled) {
            return;
        }

        if (typeof newValue === "boolean") {
            this.checked = newValue;
        } else {
            this.checked = !this.checked;
        }

        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });

        // Also dispatch custom event
        this.dispatchEvent(
            new CustomEvent<MjoRadioChangeEvent["detail"]>("mjo-radio:change", {
                detail: {
                    element: this,
                    checked: this.checked,
                    value: this.value,
                    name: this.name || "",
                },
                bubbles: true,
                composed: true,
            }),
        );

        this.mjoForm?.elements.forEach((element) => {
            if (element !== this && element.name === this.name) {
                (element as MjoRadio).checked = false;
            }
        });
    }

    #handleKeydown(event: KeyboardEvent) {
        if (this.disabled) return;

        // Handle Space and Enter keys
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            this.#handleClick();
        }
    }

    #handleFocus() {
        if (this.disabled) return;

        this.dispatchEvent(
            new CustomEvent<MjoRadioFocusEvent["detail"]>("mjo-radio:focus", {
                detail: {
                    element: this,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleBlur() {
        this.dispatchEvent(
            new CustomEvent<MjoRadioBlurEvent["detail"]>("mjo-radio:blur", {
                detail: {
                    element: this,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    static styles = [
        css`
            :host {
                display: inline-block;
            }
            .container {
                position: relative;
            }
            .container[data-size="small"] {
                font-size: 0.8em;
            }
            .container[data-size="medium"] {
                font-size: 1em;
            }
            .container[data-size="large"] {
                font-size: 1.1em;
            }
            .container[data-disabled] {
                opacity: var(--mjo-radio-disabled-opacity, 0.5);
                cursor: not-allowed;
            }
            .container[data-disabled] mjoint-input-helper-text,
            .container[data-disabled] .label {
                opacity: var(--mjo-radio-disabled-opacity, 0.5);
            }
            .radio-container {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                cursor: pointer;
                outline: none;
                border-radius: 0.25rem;
                transition: all 0.2s ease;
                outline-offset: 2px;
            }
            .radio-container:focus-visible {
                box-shadow: 0 0 0 3px var(--mjo-radio-focus-color, rgba(59, 130, 246, 0.1));
            }
            .container[data-color="primary"] .radio-container:focus-visible {
                outline: 2px solid var(--mjo-radio-focus-outline-color, var(--mjo-primary-color));
            }
            .container[data-color="secondary"] .radio-container:focus-visible {
                outline: 2px solid var(--mjo-radio-focus-outline-color, var(--mjo-secondary-color));
            }
            .container[data-disabled] .radio-container {
                cursor: not-allowed;
            }
            .box {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
            }
            .checkbox {
                position: relative;
                border: solid 2px var(--mjo-radio-border-color, var(--mjo-foreground-color-low, rgb(51, 51, 51)));
                border-radius: 9999px;
                line-height: 0;
                transition: all 0.5s ease;
                width: 1em;
                height: 1em;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container[data-size="small"] .checkbox {
                font-size: 12px;
            }
            .container[data-size="medium"] .checkbox {
                font-size: 16px;
            }
            .container[data-size="large"] .checkbox {
                font-size: 18px;
            }
            .checkbox[data-checked] {
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-primary-color)));
            }
            .container[data-color="secondary"] .checkbox[data-checked] {
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-secondary-color)));
            }
            .checkbox[data-indeterminate] {
                border-color: var(--mjo-checkbox-indeterminate-border-color, var(--mjo-checkbox-indeterminate-color, var(--mjo-primary-color)));
            }
            .container[data-color="secondary"] .checkbox[data-indeterminate] {
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-secondary-color)));
            }
            .inner {
                position: absolute;
                inset: 0;
                flex: 1 1 0;
                border-radius: 9999px;
                align-self: stretch;
                background: green;
                display: flex;
                background-color: var(--mjo-checkbox-checked-color, var(--mjo-primary-color));
                color: var(--mjo-checkbox-checked-icon-color, var(--mjo-primary-foreground-color));
                display: flex;
                justify-content: center;
                align-items: center;
                transform: scale(0);
                transform-origin: center;
                transition: transform 0.3s ease;
                overflow: hidden;
            }
            .container[data-color="secondary"] .inner {
                background-color: var(--mjo-checkbox-checked-color, var(--mjo-secondary-color));
                color: var(--mjo-checkbox-checked-icon-color, var(--mjo-secondary-foreground-color));
            }
            .checkbox[data-indeterminate] .inner {
                background-color: var(--mjo-checkbox-indeterminate-background-color, transparent);
                color: var(--mjo-checkbox-indeterminate-icon-color, var(--mjo-primary-color));
            }
            .container[data-color="secondary"] .checkbox[data-indeterminate] .inner {
                background-color: var(--mjo-checkbox-indeterminate-background-color, transparent);
                color: var(--mjo-checkbox-indeterminate-icon-color, var(--mjo-secondary-color));
            }
            .checkbox[data-checked] .inner {
                transform: scale(1);
            }
            .label-container {
                position: relative;
                align-self: stretch;
                display: flex;
                align-items: center;
            }
            .label {
                position: relative;
                padding-left: var(--mjo-space-small, 5px);
                user-select: none;
                color: var(--mjo-radio-label-color, inherit);
                font-size: var(--mjo-radio-label-font-size, inherit);
                font-weight: var(--mjo-radio-label-font-weight, inherit);
                line-height: 1em;
            }
            input {
                display: none;
            }
            mjoint-input-helper-text {
                padding-left: calc(calc(1.3rem + var(--mjo-space-small, 5px)) + 2px);
                color: var(--mjo-radio-helper-color, var(--mjo-foreground-color-low));
                font-size: var(--mjo-radio-helper-font-size, 0.8em);
                font-weight: var(--mjo-radio-helper-font-weight, normal);
            }
            mjoint-input-helper-text::part(typography) {
                line-height: 1em;
            }
            .container[data-size="small"] mjoint-input-helper-text {
                padding-left: calc(16px + var(--mjo-space-small, 5px));
            }
            .container[data-size="medium"] mjoint-input-helper-text {
                padding-left: calc(18px + var(--mjo-space-small, 5px));
            }
            .container[data-size="large"] mjoint-input-helper-text {
                padding-left: calc(20px + var(--mjo-space-small, 5px));
            }
            .container[data-error] .checkbox {
                border-color: var(--mjo-checkbox-error-border-color, var(--mjo-color-error));
            }
            .container[data-error] .inner {
                background-color: var(--mjo-checkbox-error-background-color, var(--mjo-color-error));
                color: var(--mjo-checkbox-error-icon-color, var(--mjo-color-error-foreground));
            }
            .container[data-error] .label {
                color: var(--mjo-checkbox-error-label-color, var(--mjo-color-error));
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .radio-container,
                .checkbox,
                mjo-icon {
                    transition: none;
                }
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .checkbox {
                    border-width: 3px;
                }
                .radio-container:focus-visible {
                    outline-width: 3px;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-radio": MjoRadio;
    }

    interface HTMLElementEventMap {
        "mjo-radio:change": MjoRadioChangeEvent;
        "mjo-radio:focus": MjoRadioFocusEvent;
        "mjo-radio:blur": MjoRadioBlurEvent;
    }
}
