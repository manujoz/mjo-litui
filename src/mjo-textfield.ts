import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AiFillCloseCircle } from "mjo-icons/ai/AiFillCloseCircle.js";
import { AiFillEye } from "mjo-icons/ai/AiFillEye.js";
import { AiFillEyeInvisible } from "mjo-icons/ai/AiFillEyeInvisible.js";

import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";

import "./helpers/input-counter.js";
import "./helpers/input-helper-text.js";
import "./helpers/input-label.js";

import "./mjo-icon.js";

@customElement("mjo-textfield")
export class MjoTextfield extends InputErrorMixin(FormMixin(LitElement)) implements IInputErrorMixin, IFormMixin {
    @property({ type: String }) autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
    @property({ type: String }) autoComplete?: AutoFillContactField;
    @property({ type: Boolean }) autoFocus = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: String }) name?: string;
    @property({ type: String }) placeholder?: string;
    @property({ type: Boolean }) readonly: boolean = false;
    @property({ type: Number }) step?: number;
    @property({ type: String }) type: "text" | "password" | "email" | "number" | "tel" | "url" = "text";
    @property({ type: String }) value: string = "";
    @property({ type: String }) label?: string;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
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

    @state() private isFocused = false;
    @state() private valueLength = 0;

    inputRef = createRef<HTMLInputElement>();
    isPassword = false;

    render() {
        return html`${this.label
                ? html`<input-label color=${this.color} label=${this.label} ?focused=${this.isFocused} ?error=${this.error}></input-label>`
                : nothing}
            <div class="container" data-color=${this.color} ?data-focused=${this.isFocused} data-size=${this.size} ?data-error=${this.error}>
                ${this.prefixText ? html`<div class="prefixText">${this.prefixText}</div>` : nothing}
                ${this.startIcon && html`<div class="icon startIcon"><mjo-icon src=${this.startIcon}></mjo-icon></div>`}
                ${this.startImage && !this.startIcon ? html`<div class="image startImage"><img src=${this.startImage} alt="Input image" /></div>` : nothing}
                <input
                    ${ref(this.inputRef)}
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
                    aria-label=${this.label || this.ariaLabel || nothing}
                    aria-errormessage=${this.errormsg || nothing}
                    aria-required=${ifDefined(this.required)}
                />
                ${this.clearabled
                    ? html`<div class="icon endIcon clearabled" ?data-visible=${this.value.length > 0} @click=${this.#handleClearabled}>
                          <mjo-icon src=${AiFillCloseCircle}></mjo-icon>
                      </div>`
                    : nothing}
                ${this.endIcon && !this.clearabled && this.type !== "password"
                    ? html`<div class="icon endIcon"><mjo-icon src=${this.endIcon}></mjo-icon></div>`
                    : nothing}
                ${this.endImage && !this.endIcon ? html`<div class="image endImage"><img src=${this.endImage} alt="Input image" /></div>` : nothing}
                ${this.isPassword
                    ? this.type === "password"
                        ? html`<div class="icon endIcon passIcon" @click=${this.#handlePassword}><mjo-icon src=${AiFillEye}></mjo-icon></div>`
                        : html`<div class="icon endIcon passIcon" @click=${this.#handlePassword}><mjo-icon src=${AiFillEyeInvisible}></mjo-icon></div>`
                    : nothing}
                ${this.suffixText ? html`<div class="prefixText">${this.suffixText}</div>` : nothing}
            </div>
            <div class="helper">
                ${this.helperText || this.errormsg || this.successmsg
                    ? html`<input-helper-text errormsg=${ifDefined(this.errormsg)} successmsg=${ifDefined(this.successmsg)}
                          >${this.helperText}</input-helper-text
                      >`
                    : nothing}
                ${this.counter
                    ? html`<input-counter
                          count=${this.valueLength}
                          max=${ifDefined(this.maxlength)}
                          regressive
                          ?data-error=${this.error}
                          ?data-focused=${this.isFocused}
                          data-color=${this.color}
                      ></input-counter>`
                    : nothing}
            </div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        document.querySelector("input")?.autocomplete;

        if (this.type === "password" && !this.isPassword) {
            this.isPassword = true;
        }

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
        this.inputRef.value?.blur();
    }

    clear(focus = false) {
        this.setValue("");

        if (focus) this.focus();
    }

    focus() {
        this.inputRef.value?.focus();
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
    }

    #handleClearabled() {
        this.value = "";
        this.valueLength = 0;
    }

    #handleFocus = () => {
        this.isFocused = true;

        if (this.selectOnFocus) {
            this.inputRef.value?.select();
            return;
        }

        setTimeout(() => {
            if (!this.inputRef.value) return;
            const oldTyoe = this.inputRef.value.type;
            this.inputRef.value.type = oldTyoe !== "password" ? "text" : "password";
            this.inputRef.value.setSelectionRange(this.value.length, this.value.length);
            this.inputRef.value.type = oldTyoe;
        }, 10);
    };

    #handleInput = (ev: InputEvent) => {
        this.value = (ev.currentTarget as HTMLInputElement).value;
        this.valueLength = this.value.length;

        this.updateFormData({ name: this.name || "", value: this.value });
    };

    #handleKeyup = (ev: KeyboardEvent) => {
        if (ev.key === "Enter" && this.form) {
            this.submiForm();
        }
    };

    #handlePassword() {
        this.type = this.type === "password" ? "text" : "password";
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
                border-radius: var(--mjo-input-radius, var(--mjo-radius, 5px));
                border: solid 1px;
                border-style: var(--mjo-input-border-style, solid);
                border-width: var(--mjo-input-border-width, 1px);
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                background-color: var(--mjo-input-background-color, var(--mjo-background-color-light, #ffffff));
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
            .container[data-focused] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
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
                width: inherit;
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
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] .prefixText {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .icon {
                position: relative;
                display: grid;
                place-items: center;
            }
            mjo-icon {
                font-size: var(--mjo-input-font-size, 1em);
            }
            .container[data-focused] mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
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
            .passIcon {
                cursor: pointer;
            }
            .clearabled {
                opacity: 0;
                font-size: calc(var(--mjo-input-font-size, 1em) * 0.8);
                transition: opacity 0.3s;
            }
            .clearabled[data-visible] {
                opacity: 1;
                cursor: pointer;
            }
            .container .clearabled mjo-icon {
                color: #999999 !important;
            }
            .container .clearabled:hover mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb)) !important;
            }
            .container[data-color="secondary"] .clearabled:hover mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74)) !important;
            }
            .helper {
                position: relative;
                display: flex;
                justify-content: flex-end;
                gap: 5px;
            }
            input-helper-text {
                flex: 1 1 0;
            }
            input-counter {
                flex: 0 0 auto;
            }
            input-counter[data-focused] {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            input-counter[data-focused][data-color="secondary"] {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            input-counter[data-error],
            input-counter[data-error][data-color="secondary"] {
                color: var(--mjo-color-error, #d31616);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-textfield": MjoTextfield;
    }
}
