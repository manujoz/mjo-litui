import { type OptionSelect } from "./helpers/option-select.js";
import { type OptionsList } from "./helpers/options-list.js";
import { type MjoDropdown } from "./mjo-dropdown.js";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AiFillCloseCircle } from "mjo-icons/ai/AiFillCloseCircle.js";
import { AiOutlineDown } from "mjo-icons/ai/AiOutlineDown.js";

import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";

import "./helpers/option-select.js";
import "./helpers/options-list.js";
import "./mjo-dropdown.js";

@customElement("mjo-select")
export class MjoSelect extends InputErrorMixin(FormMixin(LitElement)) implements IInputErrorMixin, IFormMixin {
    @property({ type: Boolean }) autoFocus = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: String }) name?: string;
    @property({ type: String }) placeholder?: string;
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
    @property({ type: Boolean }) selectOnFocus = false;
    @property({ type: Boolean }) clearabled = false;

    @state() private isFocused = false;
    @state() private open = false;
    @state() private options: OptionSelect[] = [];
    @state() private optionsHtml?: TemplateResult<1> = this.#renderOptions();
    @state() private visibleValue: string = "";
    @state() private startOptionImage?: string;
    @state() private endOptionImage?: string;
    @state() private startOptionIcon?: string;
    @state() private endOptionIcon?: string;

    optionsList?: OptionsList;
    dropdownRef = createRef<MjoDropdown>();
    inputRef = createRef<HTMLInputElement>();
    inputVisibleRef = createRef<HTMLInputElement>();

    render() {
        return html`${this.label
                ? html`<input-label color=${this.color} label=${this.label} ?focused=${this.isFocused} ?error=${this.error}></input-label>`
                : nothing}
            <mjo-dropdown
                ${ref(this.dropdownRef)}
                .html=${this.optionsHtml}
                preventScroll
                behavior="click"
                fullwidth
                @open=${this.#handleOpen}
                @close=${this.#handleClose}
            >
                <div class="container" data-color=${this.color} ?data-focused=${this.isFocused} data-size=${this.size} ?data-error=${this.error}>
                    ${this.prefixText ? html`<div class="prefixText">${this.prefixText}</div>` : nothing}
                    ${this.startIcon && html`<div class="icon startIcon"><mjo-icon src=${this.startIcon}></mjo-icon></div>`}
                    ${this.startImage && !this.startIcon ? html`<div class="image startImage"><img src=${this.startImage} alt="Input image" /></div>` : nothing}
                    ${this.startOptionIcon && html`<div class="icon startIcon optionImage"><mjo-icon src=${this.startOptionIcon}></mjo-icon></div>`}
                    ${this.startOptionImage && !this.startOptionIcon
                        ? html`<div class="image startImage optionImage"><img src=${this.startOptionImage} alt="Input image" /></div>`
                        : nothing}
                    <input
                        ${ref(this.inputVisibleRef)}
                        ?autofocus=${this.autoFocus}
                        ?disabled=${this.disabled}
                        placeholder=${ifDefined(this.placeholder)}
                        type="text"
                        .value=${live(this.visibleValue)}
                        aria-label=${this.label || this.ariaLabel || nothing}
                        aria-errormessage=${this.errormsg || nothing}
                        aria-required=${ifDefined(this.required)}
                        readonly
                        @focus=${this.#handleFocus}
                        @blur=${this.#handleBlur}
                    />
                    <input ${ref(this.inputRef)} type="hidden" name=${ifDefined(this.name)} .value=${live(this.value)} />
                    ${this.clearabled
                        ? html`<div class="icon endIcon clearabled" ?data-visible=${this.value.length > 0} @click=${this.#handleClearabled}>
                              <mjo-icon src=${AiFillCloseCircle}></mjo-icon>
                          </div>`
                        : nothing}
                    ${this.endOptionIcon ? html`<div class="icon endIcon optionImage"><mjo-icon src=${this.endOptionIcon}></mjo-icon></div>` : nothing}
                    ${this.endOptionImage && !this.endOptionIcon
                        ? html`<div class="image endImage optionImage"><img src=${this.endOptionImage} alt="Input image" /></div>`
                        : nothing}
                    ${this.endIcon && !this.clearabled ? html`<div class="icon endIcon"><mjo-icon src=${this.endIcon}></mjo-icon></div>` : nothing}
                    ${this.endImage && !this.endIcon ? html`<div class="image endImage"><img src=${this.endImage} alt="Input image" /></div>` : nothing}
                    ${this.suffixText ? html`<div class="prefixText">${this.suffixText}</div>` : nothing}
                    <div class="icon endIcon arrowDown"><mjo-icon src=${AiOutlineDown}></mjo-icon></div>
                </div>
            </mjo-dropdown>
            <div class="helper">
                ${this.helperText || this.errormsg || this.successmsg
                    ? html`<input-helper-text errormsg=${ifDefined(this.errormsg)} successmsg=${ifDefined(this.successmsg)}
                          >${this.helperText}</input-helper-text
                      >`
                    : nothing}
            </div>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.optionsHtml = this.#renderOptions();
        this.#handleOptions();

        if (this.autoFocus) {
            this.inputVisibleRef.value?.focus();
        }
    }

    isOpen() {
        return this.open;
    }

    setValue(value: string) {
        for (const option of this.options) {
            option.selected = option.value === value;
            if (option.value === value) {
                this.value = value;
                this.startOptionIcon = option.startIcon;
                this.endOptionIcon = option.endIcon;
                this.startOptionImage = option.startImage;
                this.endOptionImage = option.endImage;
                this.visibleValue = option.text || option.value;
            }
        }
    }

    #handleBlur() {
        this.dropdownRef.value?.close();
    }

    #handleClearabled() {}

    #handleClose() {
        this.open = false;
        this.isFocused = false;
    }

    #handleFocus() {
        this.dropdownRef.value?.open();
    }

    #handleOpen() {
        this.open = true;
        this.isFocused = true;
    }

    async #handleOptions() {
        if (this.options.length === 0) return;

        let selectedValue = null;
        let hasSelected = false;
        for (const option of this.options) {
            await option.updateComplete;

            if (selectedValue === null || option.selected) {
                selectedValue = option.value;
            }

            if (option.selected) {
                hasSelected = true;
            }

            option.addEventListener("click", () => {
                this.setValue(option.value);
            });
        }

        if (!hasSelected) {
            this.options[0].selected = true;
        }

        this.setValue(selectedValue || "");
    }

    #renderOptions() {
        const options = this.querySelectorAll("option-select");
        if (!options.length) {
            throw new Error(`[mjo-select=name=${this.name}]: No options found`);
        }

        this.options = Array.from(options) as OptionSelect[];

        return html`<options-list .options=${this.options} .mjoSelect=${this}></options-list>`;
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
                border: var(--mjo-input-border, solid var(--mjo-input-border-width, 1px));
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                background-color: var(--mjo-input-background-color, var(--mjo-background-color, #ffffff));
                box-shadow: var(--mjo-input-box-shadow, none);
                display: flex;
                flex-flow: row nowrap;
                overflow: hidden;
                position: relative;
                transition: border-color 0.3s;
                user-select: none;
            }
            .container::after {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
            }
            .container:hover {
                border: var(--mjo-input-border, solid var(--mjo-input-border-width, 1px));
                border-color: var(--mjo-input-border-color-hv, var(--mjo-border-color-hv, #ccc));
            }
            .container[data-focused] {
                border: var(--mjo-input-border, solid 1px);
                border-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] {
                border: var(--mjo-input-border, solid 1px);
                border-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .container[data-error],
            .container[data-error][data-color="secondary"] {
                border: var(--mjo-input-border, solid 1px);
                border-color: var(--mjo-error-color, #d31616);
            }
            input {
                position: relative;
                background-color: transparent;
                border: none;
                padding: var(--mjo-input-padding, calc(1em / 2 - 3px)) calc(1em / 2 - 2px) var(--mjo-input-padding, calc(1em / 2 - 4px));
                font-size: var(--mjo-input-font-size, 1em);
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                box-sizing: border-box;
                flex: 1 1 0;
                width: inherit;
                min-width: 0;
                user-select: none;
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
                padding: calc(1em / 2 - 4px) calc(1em / 2);
                font-size: 0.8em;
            }
            .container[data-size="large"] input {
                padding: calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px);
                font-size: 1.2em;
            }
            .prefixText {
                position: relative;
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                padding: calc(1em / 2 - 2px);
                background-color: var(--mjo-input-prefix-text-bg-color, rgba(220, 220, 220, 0.5));
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
            .container[data-focused] :not(.optionImage) mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] :not(.optionImage) mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .container[data-error] :not(.optionImage) mjo-icon,
            .container[data-error][data-color="secondary"] :not(.optionImage) mjo-icon {
                color: var(--mjo-error-color, #d31616);
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
            .arrowDown {
                color: var(--mjo-select-arrow-color, #666666);
                font-size: 0.8em;
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
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-select": MjoSelect;
    }
}
