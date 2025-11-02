import type { MjoCheckboxGroup } from "./mjo-checkbox-group.js";
import type {
    MjoCheckboxBlurEvent,
    MjoCheckboxChangeEvent,
    MjoCheckboxColor,
    MjoCheckboxFocusEvent,
    MjoCheckboxIndeterminateChangeEvent,
} from "./types/mjo-checkbox.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FaCheck, FaMinus } from "mjo-icons/fa";

import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { searchParentElement } from "./utils/shadow-dom.js";

import "./components/input/mjoint-input-helper-text.js";

import "./mjo-icon.js";
import "./mjo-typography.js";

/**
 * @summary A customizable checkbox component with form integration, validation support, and indeterminate state.
 *
 * @slot - Default slot for content when no label is specified
 *
 * @fires mjo-checkbox:change - Enhanced custom event with detailed state information
 * @fires mjo-checkbox:indeterminate-change - Fired when indeterminate state changes
 * @fires mjo-checkbox:focus - Fired when checkbox receives focus
 * @fires mjo-checkbox:blur - Fired when checkbox loses focus
 *
 * @csspart container - The main checkbox container
 * @csspart box - The checkbox visual container
 * @csspart checkbox - The checkbox itself
 * @csspart checkbox-inner - The inner area containing the check/indeterminate icon
 * @csspart checkbox-icon - The check/indeterminate icon (via exportparts)
 * @csspart label-container - Container for the label text
 * @csspart label-text - The label typography element (via exportparts)
 * @csspart helper-text-container - Container for helper text (via exportparts)
 * @csspart helper-text-typography - The helper text typography element (via exportparts)
 * @csspart helper-text-msg-container - Container for error/success messages (via exportparts)
 * @csspart helper-text-msg-error-message - Error message element (via exportparts)
 * @csspart helper-text-msg-success-message - Success message element (via exportparts)
 * @csspart helper-text-msg-icon - Icon in error/success messages (via exportparts)
 *
 * @cssprop --mjo-checkbox-border-color - Border color for unchecked state
 * @cssprop --mjo-checkbox-border-radius - Border radius of the checkbox
 * @cssprop --mjo-checkbox-checked-color - Background color when checked
 * @cssprop --mjo-checkbox-checked-border-color - Border color when checked
 * @cssprop --mjo-checkbox-checked-icon-color - Icon color when checked
 * @cssprop --mjo-checkbox-indeterminate-color - Border color when indeterminate
 * @cssprop --mjo-checkbox-indeterminate-border-color - Border color when indeterminate
 * @cssprop --mjo-checkbox-indeterminate-background-color - Background color when indeterminate
 * @cssprop --mjo-checkbox-indeterminate-icon-color - Icon color when indeterminate
 * @cssprop --mjo-checkbox-disabled-opacity - Opacity when disabled
 * @cssprop --mjo-checkbox-focus-color - Shadow color on focus
 * @cssprop --mjo-checkbox-focus-outline-color - Outline color on focus
 * @cssprop --mjo-checkbox-label-color - Label text color
 * @cssprop --mjo-checkbox-label-font-size - Label font size
 * @cssprop --mjo-checkbox-label-font-weight - Label font weight
 * @cssprop --mjo-checkbox-helper-color - Helper text color
 * @cssprop --mjo-checkbox-helper-font-size - Helper text font size
 * @cssprop --mjo-checkbox-helper-font-weight - Helper text font weight
 * @cssprop --mjo-checkbox-error-border-color - Border color in error state
 * @cssprop --mjo-checkbox-error-background-color - Background color in error state
 * @cssprop --mjo-checkbox-error-icon-color - Icon color in error state
 * @cssprop --mjo-checkbox-error-label-color - Label color in error state
 */
@customElement("mjo-checkbox")
export class MjoCheckbox extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IThemeMixin, IInputErrorMixin, IFormMixin {
    @property({ type: String }) color: MjoCheckboxColor = "primary";
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) indeterminate = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: Boolean }) hideErrors = false;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    @query("input") inputElement!: HTMLInputElement;
    @query(".checkbox-container") checkboxContainer!: HTMLElement;

    group: MjoCheckboxGroup | null = null;
    type = "checkbox";

    render() {
        return html`
            ${this.applyThemeSsr()}
            <div class="container" ?data-disabled=${this.disabled} data-color=${this.color} data-size=${this.size} ?data-error=${this.error}>
                <div
                    class="checkbox-container"
                    part="container"
                    role="checkbox"
                    aria-checked=${this.#computedAriaChecked}
                    aria-label=${ifDefined(this.#computedAriaLabel)}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    aria-disabled=${this.disabled ? "true" : "false"}
                    aria-invalid=${this.error ? "true" : "false"}
                    tabindex=${this.#computedTabIndex}
                    @click=${this.#handleClick}
                    @keydown=${this.#handleKeydown}
                    @focus=${this.#handleFocus}
                    @blur=${this.#handleBlur}
                >
                    <div class="box" part="box">
                        <div class="checkbox" part="checkbox" ?data-checked=${this.checked} ?data-indeterminate=${this.indeterminate}>
                            ${this.indeterminate
                                ? html`
                                      <div class="inner" part="checkbox-inner">
                                          <mjo-icon src=${FaMinus} exportparts="icon: checkbox-icon"></mjo-icon>
                                      </div>
                                  `
                                : html`
                                      <div class="inner" part="checkbox-inner">
                                          <mjo-icon src=${FaCheck} exportparts="icon: checkbox-icon"></mjo-icon>
                                      </div>
                                  `}
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
                        type="checkbox"
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
                    ? html`<mjoint-input-helper-text
                          exportparts="
                            container: helper-text-msg-container,
                            error-message: helper-text-msg-error-message,
                            success-message: helper-text-msg-success-message,
                            icon: helper-text-msg-icon"
                          .errormsg=${this.errormsg}
                          .successmsg=${this.successmsg}
                      ></mjoint-input-helper-text> `
                    : nothing}
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#searchGroup();

        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
    }

    /**
     * Retrieves the current value of the checkbox as a string.
     * Returns the value property if checked, otherwise returns empty string.
     */
    getValue() {
        return this.checked ? this.value || "1" : "";
    }

    /**
     * Sets the value property of the checkbox.
     */
    setValue(value: string) {
        this.value = value;
    }

    /**
     * Programmatically sets the checked state of the checkbox.
     */
    setChecked(checked: boolean) {
        this.#handleClick(checked);
    }

    /**
     * Simulates a click on the checkbox, toggling its checked state.
     */
    click(): void {
        this.#handleClick();
    }

    /**
     * Toggles the checked state of the checkbox.
     */
    toggle() {
        this.#handleClick();
    }

    /**
     * Sets the indeterminate state of the checkbox.
     * When set to true, the checkbox displays a dash icon instead of a checkmark.
     */
    setIndeterminate(indeterminate: boolean) {
        this.checked = false;
        this.indeterminate = indeterminate;
        this.inputElement.indeterminate = indeterminate;

        // Dispatch indeterminate change event
        this.dispatchEvent(
            new CustomEvent<MjoCheckboxIndeterminateChangeEvent["detail"]>("mjo-checkbox:indeterminate-change", {
                detail: {
                    element: this,
                    indeterminate: this.indeterminate,
                    checked: this.checked,
                },
                bubbles: true,
                composed: true,
            }),
        );

        this.updateFormData({ name: this.name || "", value: this.getValue() });
    }

    /**
     * Validates the checkbox and displays any validation messages.
     * Returns true if the checkbox is valid, false otherwise.
     */
    reportValidity(): boolean {
        return this.inputElement.reportValidity();
    }

    /**
     * Sets a custom validation message for the checkbox.
     * Use an empty string to clear the custom validation message.
     */
    setCustomValidity(message: string): void {
        this.inputElement.setCustomValidity(message);
    }

    // Computed properties for accessibility
    get #computedAriaChecked(): "true" | "false" | "mixed" {
        if (this.indeterminate) return "mixed";
        return this.checked ? "true" : "false";
    }

    get #computedAriaLabel(): string | undefined {
        if (this.ariaLabel) return this.ariaLabel;
        if (!this.label) return undefined;

        let baseLabel = this.label;
        if (this.required || this.ariaRequired) baseLabel += " (required)";
        if (this.indeterminate) baseLabel += " (partially selected)";
        else if (this.checked) baseLabel += " (checked)";
        else baseLabel += " (unchecked)";

        return baseLabel;
    }

    get #computedTabIndex(): number {
        return this.disabled ? -1 : 0;
    }

    #searchGroup() {
        this.group = searchParentElement(this, "mjo-checkbox-group") as MjoCheckboxGroup | null;
        this.group?.updateComplete.then(() => {
            this.group?.pushCheckbox(this);
        });
    }

    #handleClick(newValue?: boolean) {
        if (this.disabled) return;

        const previousState = {
            checked: this.checked,
            indeterminate: this.indeterminate,
        };

        // Clear indeterminate state when clicked
        if (this.indeterminate) {
            this.indeterminate = false;
            this.inputElement.indeterminate = false;
        }

        if (typeof newValue === "boolean") {
            this.checked = newValue;
        } else {
            this.checked = !this.checked;
        }

        this.updateFormData({ name: this.name || "", value: this.getValue() });

        // Also dispatch custom event
        this.dispatchEvent(
            new CustomEvent<MjoCheckboxChangeEvent["detail"]>("mjo-checkbox:change", {
                detail: {
                    element: this,
                    checked: this.checked,
                    indeterminate: this.indeterminate,
                    value: this.value,
                    name: this.name || "",
                    previousState,
                },
                bubbles: true,
                composed: true,
            }),
        );
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
            new CustomEvent<MjoCheckboxFocusEvent["detail"]>("mjo-checkbox:focus", {
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
            new CustomEvent<MjoCheckboxBlurEvent["detail"]>("mjo-checkbox:blur", {
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
                opacity: var(--mjo-checkbox-disabled-opacity, 0.5);
                cursor: not-allowed;
            }
            .container[data-disabled] input-helper-text,
            .container[data-disabled] .label {
                opacity: var(--mjo-checkbox-disabled-opacity, 0.5);
            }
            .checkbox-container {
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
            .checkbox-container:focus-visible {
                box-shadow: 0 0 0 3px var(--mjo-checkbox-focus-color, rgba(59, 130, 246, 0.1));
            }
            .container[data-color="primary"] .checkbox-container:focus-visible {
                outline: 2px solid var(--mjo-checkbox-focus-outline-color, var(--mjo-primary-color));
            }
            .container[data-color="secondary"] .checkbox-container:focus-visible {
                outline: 2px solid var(--mjo-checkbox-focus-outline-color, var(--mjo-secondary-color));
            }
            .container[data-disabled] .checkbox-container {
                cursor: not-allowed;
            }
            .box {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
            }
            .checkbox {
                position: relative;
                border: solid 2px var(--mjo-checkbox-border-color, var(--mjo-foreground-color-low, rgb(51, 51, 51)));
                border-radius: var(--mjo-checkbox-border-radius, var(--mjo-radius-small, 4px));
                line-height: 0;
                transition: all 0.3s ease;
                width: 1em;
                height: 1em;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container[data-size="small"] .checkbox {
                font-size: 14px;
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
                align-self: stretch;
                background: green;
                display: flex;
                background: var(--mjo-checkbox-checked-color, var(--mjo-primary-color));
                color: var(--mjo-checkbox-checked-icon-color, var(--mjo-primary-foreground-color));
                display: grid;
                place-content: center;
                transform: scale(0);
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
            .checkbox[data-checked] .inner,
            .checkbox[data-indeterminate] .inner {
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
                color: var(--mjo-checkbox-label-color, inherit);
                font-size: var(--mjo-checkbox-label-font-size, inherit);
                font-weight: var(--mjo-checkbox-label-font-weight, inherit);
                line-height: 1em;
            }
            input {
                display: none;
            }
            mjoint-input-helper-text {
                color: var(--mjo-checkbox-helper-color, var(--mjo-foreground-color-low));
                font-size: var(--mjo-checkbox-helper-font-size, 0.8em);
                font-weight: var(--mjo-checkbox-helper-font-weight, normal);
                margin-top: var(--mjo-space-xxsmall, 2px);
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
                .checkbox-container,
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
                .checkbox-container:focus-visible {
                    outline-width: 3px;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-checkbox": MjoCheckbox;
    }

    interface HTMLElementEventMap {
        "mjo-checkbox:change": MjoCheckboxChangeEvent;
        "mjo-checkbox:indeterminate-change": MjoCheckboxIndeterminateChangeEvent;
        "mjo-checkbox:focus": MjoCheckboxFocusEvent;
        "mjo-checkbox:blur": MjoCheckboxBlurEvent;
    }
}
