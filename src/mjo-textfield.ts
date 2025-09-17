import type {
    MjoTextfieldAutoCapitalize,
    MjoTextfieldBlurEvent,
    MjoTextfieldChangeEvent,
    MjoTextfieldClearEvent,
    MjoTextfieldColor,
    MjoTextfieldFocusEvent,
    MjoTextfieldInputEvent,
    MjoTextfieldKeyupEvent,
    MjoTextfieldPasswordToggleEvent,
    MjoTextfieldSize,
    MjoTextfieldType,
} from "./types/mjo-textfield.js";

import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from "mjo-icons/ai";

import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/input/mjoint-input-counter.js";
import "./components/input/mjoint-input-helper-text.js";
import "./components/input/mjoint-input-label.js";
import "./mjo-icon.js";

/**
 * @summary Versatile single-line text input component with comprehensive features including validation,
 * icons, prefix/suffix text, password visibility toggle, and full form integration.
 *
 * @fires mjo-textfield-input - Fired on every input change with detailed value and validation information
 * @fires mjo-textfield-change - Fired when value changes and field loses focus
 * @fires mjo-textfield-focus - Fired when the textfield gains focus
 * @fires mjo-textfield-blur - Fired when the textfield loses focus
 * @fires mjo-textfield-keyup - Fired on keyup events (Enter key submits parent form)
 * @fires mjo-textfield-clear - Fired when the clear button is clicked
 * @fires mjo-textfield-password-toggle - Fired when password visibility is toggled
 *
 * @csspart container - The main textfield container
 * @csspart input - The native input element
 * @csspart label-container - The label container (via exportparts)
 * @csspart label-truncate-container - The label truncate container (via exportparts)
 * @csspart label-truncate-wrapper - The label truncate wrapper (via exportparts)
 * @csspart prefix-text - Container for prefix text
 * @csspart suffix-text - Container for suffix text
 * @csspart start-icon-container - Container for start icon
 * @csspart start-icon - The start icon element (via exportparts)
 * @csspart end-icon-container - Container for end icon
 * @csspart end-icon - The end icon element (via exportparts)
 * @csspart start-image-container - Container for start image
 * @csspart start-image - The start image element
 * @csspart end-image-container - Container for end image
 * @csspart end-image - The end image element
 * @csspart clear-button - The clear button element
 * @csspart clear-icon - The clear icon element (via exportparts)
 * @csspart password-button - The password toggle button element
 * @csspart password-icon - The password toggle icon element (via exportparts)
 * @csspart helper-container - Helper container (via exportparts)
 * @csspart helper-text-container - Helper text container (via exportparts)
 * @csspart helper-text-typography - Helper text typography (via exportparts)
 * @csspart helper-text-typography-tag - Helper text typography tag (via exportparts)
 * @csspart helper-text-error-message - Error message element (via exportparts)
 * @csspart helper-text-success-message - Success message element (via exportparts)
 * @csspart helper-text-icon - Helper text icon element (via exportparts)
 * @csspart counter-container - Character counter container (via exportparts)
 * @csspart counter-text - Character counter text (via exportparts)
 */
@customElement("mjo-textfield")
export class MjoTextfield extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IInputErrorMixin, IFormMixin, IThemeMixin {
    @property({ type: String }) autoCapitalize?: MjoTextfieldAutoCapitalize;
    @property({ type: String }) autoComplete?: AutoFillContactField;
    @property({ type: Boolean }) autoFocus = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: String }) name?: string;
    @property({ type: String }) placeholder?: string;
    @property({ type: Boolean }) readonly: boolean = false;
    @property({ type: Number }) step?: number;
    @property({ type: String }) type: MjoTextfieldType = "text";
    @property({ type: String }) value: string = "";
    @property({ type: String }) label?: string;
    @property({ type: String }) size: MjoTextfieldSize = "medium";
    @property({ type: String }) color: MjoTextfieldColor = "primary";
    @property({ type: String }) startIcon?: string;
    @property({ type: String }) endIcon?: string;
    @property({ type: String }) startImage?: string;
    @property({ type: String }) endImage?: string;
    @property({ type: String }) prefixText?: string;
    @property({ type: String }) suffixText?: string;
    @property({ type: String }) helperText?: string;
    @property({ type: Boolean }) counter: boolean = false;
    @property({ type: Boolean }) selectOnFocus = false;
    @property({ type: Boolean }) clearabled = false;
    @property({ type: Boolean }) nospiners = false;

    @state() private isFocused = false;
    @state() private valueLength = 0;

    @query("input") inputElement!: HTMLInputElement;

    isPassword = false;
    #uniqueId = `mjo-textfield-${Math.random().toString(36).substring(2, 9)}`;

    render() {
        if (this.type === "password" && !this.isPassword) this.isPassword = true;

        const helperTextId = this.helperText || this.errormsg || this.successmsg ? `${this.#uniqueId}-helper` : undefined;
        const labelId = this.label ? `${this.#uniqueId}-label` : undefined;

        return html`
            ${this.applyThemeSsr()}
            ${this.label
                ? html`<mjoint-input-label
                      id=${ifDefined(labelId)}
                      exportparts="container: label-container, truncate-container: label-truncate-container, truncate-wrapper: label-truncate-wrapper"
                      color=${this.color}
                      label=${this.label}
                      ?focused=${this.isFocused}
                      ?error=${this.error}
                      ?data-disabled=${this.disabled}
                  ></mjoint-input-label>`
                : nothing}
            <div
                class="container"
                part="container"
                data-color=${this.color}
                ?data-focused=${this.isFocused}
                data-size=${this.size}
                ?data-error=${this.error}
                ?data-disabled=${this.disabled}
            >
                ${this.prefixText ? html`<div class="prefixText" part="prefix-text">${this.prefixText}</div>` : nothing}
                ${this.startIcon &&
                html`<div class="icon startIcon" part="start-icon-container" aria-hidden="true">
                    <mjo-icon exportparts="icon: start-icon" src=${this.startIcon}></mjo-icon>
                </div>`}
                ${this.startImage && !this.startIcon
                    ? html`<div class="image startImage" part="start-image-container"><img src=${this.startImage} part="start-image" alt="Input image" /></div>`
                    : nothing}
                <input
                    id=${ifDefined(this.id)}
                    part="input"
                    autocapitalize=${ifDefined(this.autoCapitalize)}
                    autocomplete=${ifDefined(this.autoComplete)}
                    ?disabled=${this.disabled}
                    name=${ifDefined(this.name)}
                    max=${ifDefined(this.max)}
                    min=${ifDefined(this.min)}
                    maxlength=${ifDefined(this.maxlength)}
                    minlength=${ifDefined(this.minlength)}
                    placeholder=${ifDefined(this.placeholder)}
                    ?readonly=${this.readonly}
                    step=${ifDefined(this.step)}
                    type=${this.type}
                    .value=${live(this.value)}
                    @focus=${this.#handleFocus}
                    @blur=${this.#handleBlur}
                    @input=${this.#handleInput}
                    @keyup=${this.#handleKeyup}
                    @change=${this.#handleInput}
                    aria-label=${this.ariaLabel || nothing}
                    aria-labelledby=${labelId || nothing}
                    aria-describedby=${helperTextId || nothing}
                    aria-errormessage=${ifDefined(this.errormsg ? helperTextId : undefined)}
                    aria-invalid=${this.error ? "true" : "false"}
                    aria-required=${ifDefined(this.required)}
                    ?data-nospiners=${this.nospiners}
                />
                ${this.clearabled
                    ? html`<button
                          type="button"
                          class="icon endIcon clearabled"
                          part="clear-button"
                          data-dropdown-noopen
                          ?data-visible=${this.value.length > 0}
                          @click=${this.#handleClearabled}
                          aria-label="Clear input"
                          tabindex="-1"
                      >
                          <mjo-icon src=${AiFillCloseCircle} exportparts="icon: clear-icon" aria-hidden="true"></mjo-icon>
                      </button>`
                    : nothing}
                ${this.endIcon && !this.clearabled && this.type !== "password"
                    ? html`
                          <div class="icon endIcon" part="end-icon-container" aria-hidden="true">
                              <mjo-icon src=${this.endIcon} exportparts="icon: end-icon"></mjo-icon>
                          </div>
                      `
                    : nothing}
                ${this.endImage && !this.endIcon
                    ? html`
                          <div class="image endImage" part="end-image-container">
                              <img src=${this.endImage} part="end-image" alt="Input image" />
                          </div>
                      `
                    : nothing}
                ${this.isPassword
                    ? this.type === "password"
                        ? html`<button
                              type="button"
                              class="icon endIcon passIcon"
                              part="password-button"
                              @click=${this.#handlePassword}
                              aria-label="Show password"
                              tabindex="-1"
                          >
                              <mjo-icon src=${AiFillEye} exportparts="icon: password-icon" aria-hidden="true"></mjo-icon>
                          </button>`
                        : html`<button
                              type="button"
                              class="icon endIcon passIcon"
                              part="password-button"
                              @click=${this.#handlePassword}
                              aria-label="Hide password"
                              tabindex="-1"
                          >
                              <mjo-icon src=${AiFillEyeInvisible} exportparts="icon: password-icon" aria-hidden="true"></mjo-icon>
                          </button>`
                    : nothing}
                ${this.suffixText ? html`<div class="prefixText" part="suffix-text">${this.suffixText}</div>` : nothing}
            </div>
            <div class="helper" part="helper-container" ?data-disabled=${this.disabled}>
                ${this.helperText || this.errormsg || this.successmsg
                    ? html`<mjoint-input-helper-text
                          id=${ifDefined(helperTextId)}
                          exportparts="
                            container: helper-text-container,
                            typography: helper-text-typography,
                            helper-text: helper-text-typography-tag,
                            error-message: helper-text-error-message,
                            success-message: helper-text-success-message,
                            icon: helper-text-icon
                          "
                          errormsg=${ifDefined(this.errormsg)}
                          successmsg=${ifDefined(this.successmsg)}
                          >${this.helperText}</mjoint-input-helper-text
                      >`
                    : nothing}
                ${this.counter
                    ? html`<mjoint-input-counter
                          count=${this.valueLength}
                          exportparts="counter: counter-container, counter-text: counter-text"
                          max=${ifDefined(this.maxlength)}
                          regressive
                          ?data-error=${this.error}
                          ?data-focused=${this.isFocused}
                          data-color=${this.color}
                      ></mjoint-input-counter>`
                    : nothing}
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        document.querySelector("input")?.autocomplete;

        this.updateFormData({ name: this.name || "", value: this.value });
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        if (_changedProperties.has("autoFocus") && this.autoFocus) {
            setTimeout(() => {
                this.focus();
            }, 50);
        }
    }

    blur() {
        this.inputElement.blur();
    }

    clear(focus = false) {
        this.setValue("");

        if (focus) this.focus();
    }

    focus() {
        this.inputElement.focus();
    }

    getError() {
        return this.errormsg;
    }

    getForm() {
        return this.form;
    }

    getValue() {
        return this.value;
    }

    removeError() {
        this.error = false;
        this.errormsg = "";
    }

    setError(errormsg: string) {
        this.error = true;
        this.errormsg = errormsg;
    }

    setValue(value: string) {
        this.value = value;
    }

    #handleBlur() {
        this.isFocused = false;

        this.dispatchEvent(
            new CustomEvent("mjo-textfield-blur", {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    value: this.value,
                },
            }),
        );
    }

    #handleClearabled() {
        const previousValue = this.value;
        this.value = "";
        this.valueLength = 0;

        this.dispatchEvent(
            new CustomEvent("mjo-textfield-clear", {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    previousValue,
                },
            }),
        );
    }

    #handleFocus = () => {
        this.isFocused = true;

        this.dispatchEvent(
            new CustomEvent("mjo-textfield-focus", {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    value: this.value,
                },
            }),
        );

        if (this.selectOnFocus) {
            this.inputElement.select();
            return;
        }

        setTimeout(() => {
            if (!this.inputElement) return;
            const oldTyoe = this.inputElement.type;
            this.inputElement.type = oldTyoe !== "password" ? "text" : "password";
            this.inputElement.setSelectionRange(this.value.length, this.value.length);
            this.inputElement.type = oldTyoe;
        }, 10);
    };

    #handleInput = (ev: InputEvent) => {
        const previousValue = this.value;
        this.value = (ev.currentTarget as HTMLInputElement).value;
        this.valueLength = this.value.length;

        this.dispatchEvent(
            new CustomEvent("mjo-textfield-input", {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    value: this.value,
                    previousValue,
                    inputType: ev.inputType || "",
                },
            }),
        );

        if (ev.type === "change") {
            this.dispatchEvent(
                new CustomEvent("mjo-textfield-change", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        element: this,
                        value: this.value,
                        previousValue,
                    },
                }),
            );
        }

        this.updateFormData({ name: this.name || "", value: this.value });
    };

    #handleKeyup = (ev: KeyboardEvent) => {
        this.dispatchEvent(
            new CustomEvent("mjo-textfield-keyup", {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    key: ev.key,
                    code: ev.code,
                    value: this.value,
                    originalEvent: ev,
                },
            }),
        );

        if (ev.key === "Enter" && this.form) {
            this.submitForm();
        }
    };

    #handlePassword() {
        const wasPassword = this.type === "password";
        this.type = this.type === "password" ? "text" : "password";

        this.dispatchEvent(
            new CustomEvent("mjo-textfield-password-toggle", {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    visible: !wasPassword,
                    type: this.type,
                },
            }),
        );
    }

    static styles = [
        css`
            :host {
                display: inline-flex;
                flex-flow: column nowrap;
                position: relative;
                max-width: 100%;
            }
            :host([fullwidth]) {
                width: 100%;
            }
            .container {
                border-radius: var(--mjo-input-border-radius, var(--mjo-radius-medium, 5px));
                border: solid 1px;
                border-style: var(--mjo-input-border-style, solid);
                border-width: var(--mjo-input-border-width, 1px);
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                background-color: var(--mjo-input-background-color, var(--mjo-background-color-card-low, #ffffff));
                box-shadow: var(--mjo-input-box-shadow, none);
                display: flex;
                flex-flow: row nowrap;
                overflow: hidden;
                position: relative;
                transition: border-color 0.3s;
            }
            .container:hover {
                border-style: var(--mjo-input-border-style-hover, solid);
                border-width: var(--mjo-input-border-width-hover, 1px);
                border-color: var(--mjo-input-border-color-hover, #cccccc);
            }
            .container[data-disabled] {
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                opacity: 0.5;
            }
            mjoint-input-label[data-disabled],
            .helper[data-disabled] {
                opacity: 0.5;
            }
            .container[data-focused] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-focused][data-color="secondary"] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            .container[data-error],
            .container[data-error][data-color="secondary"] {
                border-color: var(--mjo-color-error, #d31616);
            }
            input {
                background-color: transparent;
                border: none;
                padding: var(--mjo-input-padding, calc(1em / 2 - 3px) calc(1em / 2 - 2px) calc(1em / 2 - 4px));
                font-size: var(--mjo-input-font-size, 1em);
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                color: var(--mjo-input-color, var(--mjo-foreground-color, #222222));
                box-sizing: border-box;
                flex: 1 1 0;
                width: 100%;
                min-width: 0;
            }
            input:focus {
                outline: none;
            }
            input:-webkit-autofill {
                box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-text-fill-color: var(--mo-input-color, #111111);
            }
            input::-ms-reveal,
            input::-ms-clear {
                display: none !important;
            }
            input[data-nospiners]::-webkit-inner-spin-button,
            input[data-nospiners]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            .container[data-size="small"] input {
                padding: var(--mjo-input-padding-small, calc(1em / 2 - 4px) calc(1em / 2));
                font-size: 0.8em;
            }
            .container[data-size="large"] input {
                padding: var(--mjo-input-padding-large, calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px));
                font-size: 1.2em;
            }
            .prefixText {
                position: relative;
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                padding: calc(1em / 2 - 2px);
                background-color: var(--mjo-input-prefix-text-background-color, rgba(220, 220, 220, 0.5));
                color: var(--mjo-input-prefix-text-color, currentColor);
                display: grid;
                place-items: center;
                transition: color 0.3s;
            }
            .container[data-focused].prefixText {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-focused][data-color="secondary"] .prefixText {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            .icon {
                position: relative;
                display: grid;
                place-items: center;
                color: var(--mjo-input-color, var(--mjo-foreground-color, #222222));
            }
            mjo-icon {
                font-size: var(--mjo-input-font-size, 1em);
            }
            .container[data-focused] mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-focused][data-color="secondary"] mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            .container[data-error] mjo-icon,
            .container[data-error][data-color="secondary"] mjo-icon {
                color: var(--mjo-color-error, #d31616);
            }
            .image {
                position: relative;
                display: grid;
                place-items: center;
            }
            .image img {
                width: 1em;
                height: 1em;
                object-fit: contain;
            }
            .startIcon,
            .startImage {
                padding-left: calc(1em / 2 - 4px);
            }
            .endIcon,
            .endImage {
                padding-right: calc(1em / 2 - 4px);
            }
            .passIcon,
            .clearabled {
                cursor: pointer;
                background: none;
                border: none;
                margin: 0;
                color: inherit;
                font-size: inherit;
                transition: opacity 0.3s;
            }
            .clearabled[data-visible] {
                opacity: 1;
                cursor: pointer;
            }
            .container .passIcon mjo-icon,
            .container .clearabled mjo-icon {
                color: #999999 !important;
            }
            .container .passIcon:hover mjo-icon,
            .container .clearabled:hover mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed)) !important;
            }
            .container[data-color="secondary"] .passIcon:hover mjo-icon,
            .container[data-color="secondary"] .clearabled:hover mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717)) !important;
            }
            .helper {
                position: relative;
                display: flex;
                justify-content: flex-end;
                gap: 5px;
            }
            mjoint-input-helper-text {
                flex: 1 1 0;
            }
            mjoint-input-counter {
                flex: 0 0 auto;
            }
            mjoint-input-counter[data-focused] {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            mjoint-input-counter[data-focused][data-color="secondary"] {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            mjoint-input-counter[data-error],
            mjoint-input-counter[data-error][data-color="secondary"] {
                color: var(--mjo-color-error, #d31616);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-textfield": MjoTextfield;
    }

    interface HTMLElementEventMap {
        "mjo-textfield-clear": MjoTextfieldClearEvent;
        "mjo-textfield-password-toggle": MjoTextfieldPasswordToggleEvent;
        "mjo-textfield-input": MjoTextfieldInputEvent;
        "mjo-textfield-change": MjoTextfieldChangeEvent;
        "mjo-textfield-focus": MjoTextfieldFocusEvent;
        "mjo-textfield-blur": MjoTextfieldBlurEvent;
        "mjo-textfield-keyup": MjoTextfieldKeyupEvent;
    }
}
