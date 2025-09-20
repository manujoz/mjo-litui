import type {
    MjoTextareaAutoCapitalize,
    MjoTextareaBlurEvent,
    MjoTextareaChangeEvent,
    MjoTextareaClearEvent,
    MjoTextareaColor,
    MjoTextareaFocusEvent,
    MjoTextareaInputEvent,
    MjoTextareaKeyupEvent,
    MjoTextareaSize,
    MjoTextareaVariant,
} from "./types/mjo-textarea.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";

import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { TextAreaAutoSize } from "./utils/textarea-autosize.js";

import "./components/input/mjoint-input-counter.js";
import "./components/input/mjoint-input-helper-text.js";
import "./components/input/mjoint-input-label.js";
import "./mjo-icon.js";

/**
 * @summary Multi-line text input component with auto-resize functionality, character counting,
 * form integration, and comprehensive validation support.
 *
 * @fires mjo-textarea:input - Fired on every input change with detailed value and validation information
 * @fires mjo-textarea:change - Fired when value changes and field loses focus
 * @fires mjo-textarea:focus - Fired when the textarea gains focus
 * @fires mjo-textarea:blur - Fired when the textarea loses focus
 * @fires mjo-textarea:keyup - Fired on keyup events (Enter key submits parent form)
 * @fires mjo-textarea:clear - Fired when the textarea is cleared programmatically
 *
 * @slot - No slots available (self-contained component)
 * @csspart container - The main textarea container
 * @csspart textarea - The native textarea element
 * @csspart start-icon-container - Container for start icon
 * @csspart start-icon - The start icon element (via exportparts)
 * @csspart end-icon-container - Container for end icon
 * @csspart end-icon - The end icon element (via exportparts)
 * @csspart start-image-container - Container for start image
 * @csspart start-image - The start image element
 * @csspart end-image-container - Container for end image
 * @csspart end-image - The end image element
 * @csspart label-container - The label container (via exportparts)
 * @csspart label-truncate-container - The label truncate container (via exportparts)
 * @csspart label-truncate-wrapper - The label truncate wrapper (via exportparts)
 * @csspart helper-text-container - Helper text container (via exportparts)
 * @csspart helper-text-typography - Helper text typography (via exportparts)
 * @csspart helper-text-error-message - Error message element (via exportparts)
 * @csspart helper-text-success-message - Success message element (via exportparts)
 * @csspart helper-text-icon - Helper text icon element (via exportparts)
 * @csspart counter-container - Character counter container (via exportparts)
 * @csspart counter-text - Character counter text (via exportparts)
 */
@customElement("mjo-textarea")
export class MjoTextarea extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IInputErrorMixin, IFormMixin, IThemeMixin {
    @property({ type: String }) autoCapitalize?: MjoTextareaAutoCapitalize;
    @property({ type: String }) autoComplete?: AutoFillContactField;
    @property({ type: Boolean }) autoFocus = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: String }) name?: string;
    @property({ type: String }) placeholder?: string;
    @property({ type: Boolean }) readonly: boolean = false;
    @property({ type: String }) value: string = "";
    @property({ type: Number }) rows: number = 1;
    @property({ type: Number }) maxHeight?: number;
    @property({ type: String }) label?: string;
    @property({ type: String }) size: MjoTextareaSize = "medium";
    @property({ type: String }) color: MjoTextareaColor = "primary";
    @property({ type: String }) variant: MjoTextareaVariant = "default";
    @property({ type: String }) startIcon?: string;
    @property({ type: String }) endIcon?: string;
    @property({ type: String }) startImage?: string;
    @property({ type: String }) endImage?: string;
    @property({ type: String }) helperText?: string;
    @property({ type: Boolean }) counter: boolean = false;
    @property({ type: Boolean }) selectOnFocus = false;

    @state() private isFocused = false;
    @state() private valueLength = 0;

    @query("textarea") inputElement!: HTMLTextAreaElement;

    type = "textarea";

    textAreaAutoSize?: TextAreaAutoSize;

    #uniqueId = `mjo-textarea-${Math.random().toString(36).substring(2, 9)}`;
    #previousValue = "";

    render() {
        const helperTextId = this.helperText || this.errormsg || this.successmsg ? `${this.#uniqueId}-helper` : undefined;
        const labelId = this.label ? `${this.#uniqueId}-label` : undefined;

        return html`
            ${this.applyThemeSsr()}
            ${this.label
                ? html`
                      <mjoint-input-label
                          id=${ifDefined(labelId)}
                          exportparts="container: label-container, truncate-container: label-truncate-container, truncate-wrapper: label-truncate-wrapper"
                          color=${this.color}
                          label=${this.label}
                          ?focused=${this.isFocused}
                          ?error=${this.error}
                          ?data-disabled=${this.disabled}
                      ></mjoint-input-label>
                  `
                : nothing}
            <div
                class="container"
                part="container"
                data-color=${this.color}
                data-variant=${this.variant}
                ?data-focused=${this.isFocused}
                data-size=${this.size}
                ?data-error=${this.error}
                ?data-disabled=${this.disabled}
            >
                ${this.startIcon &&
                html`
                    <div class="icon startIcon" part="start-icon-container">
                        <mjo-icon src=${this.startIcon} exportparts="icon: start-icon"></mjo-icon>
                    </div>
                `}
                ${this.startImage && !this.startIcon
                    ? html`
                          <div class="image startImage" part="start-image-container">
                              <img src=${this.startImage} part="start-image" alt="Input image" />
                          </div>
                      `
                    : nothing}
                <textarea
                    id=${this.id}
                    part="textarea"
                    autocapitalize=${ifDefined(this.autoCapitalize)}
                    autocomplete=${ifDefined(this.autoComplete)}
                    ?autofocus=${this.autoFocus}
                    ?disabled=${this.disabled}
                    name=${ifDefined(this.name)}
                    rows=${this.rows}
                    maxlength=${ifDefined(this.maxlength)}
                    minlength=${ifDefined(this.minlength)}
                    placeholder=${ifDefined(this.placeholder)}
                    ?readonly=${this.readonly}
                    .value=${live(this.value)}
                    @focus=${this.#handleFocus}
                    @blur=${this.#handleBlur}
                    @input=${this.#handleInput}
                    @change=${this.#handleChange}
                    @keyup=${this.#handleKeyup}
                    aria-label=${this.ariaLabel || nothing}
                    aria-labelledby=${labelId || nothing}
                    aria-describedby=${helperTextId || nothing}
                    aria-errormessage=${this.errormsg || nothing}
                    aria-invalid=${this.error ? "true" : "false"}
                    aria-required=${ifDefined(this.required)}
                ></textarea>
                ${this.endIcon
                    ? html`
                          <div class="icon endIcon" part="end-icon-container">
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
            </div>
            <div class="helper" ?data-disabled=${this.disabled}>
                ${this.helperText || this.errormsg || this.successmsg
                    ? html`<mjoint-input-helper-text
                          id=${ifDefined(helperTextId)}
                          exportparts="
                            container: helper-text-container,
                            helper-text: helper-text-typography,
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

        // Initialize valueLength and previousValue
        this.valueLength = this.value.length;
        this.#previousValue = this.value;

        if (this.autoFocus) {
            this.focus();
        }

        this.updateFormData({ name: this.name || "", value: this.value });
    }

    protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        this.textAreaAutoSize = new TextAreaAutoSize(this.inputElement, this.rows, this.maxHeight);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.textAreaAutoSize?.destroy();
    }

    setValue(value: string) {
        this.#previousValue = this.value;
        this.value = value;
        this.valueLength = value.length;
    }

    getValue() {
        return this.value;
    }

    blur() {
        this.inputElement.blur();
    }

    clear(focus = false) {
        const previousValue = this.value;
        this.setValue("");

        if (focus) {
            this.inputElement.focus();
        }

        // Dispatch custom clear event
        this.dispatchEvent(
            new CustomEvent("mjo-textarea:clear", {
                detail: {
                    element: this,
                    previousValue,
                },
                bubbles: true,
            }),
        );

        this.updateFormData({ name: this.name || "", value: this.value });
    }

    focus() {
        this.inputElement.focus();
    }

    getError() {
        return this.errormsg;
    }

    getForm() {
        return this.closest("form");
    }

    removeError() {
        this.error = false;
        this.errormsg = "";
    }

    setError(errormsg: string) {
        this.error = true;
        this.errormsg = errormsg;
    }

    #handleFocus() {
        this.isFocused = true;

        // Dispatch custom focus event
        this.dispatchEvent(
            new CustomEvent("mjo-textarea:focus", {
                detail: {
                    element: this,
                    value: this.value,
                },
                bubbles: true,
            }),
        );

        if (this.selectOnFocus) {
            this.inputElement.select();
            return;
        }

        setTimeout(() => {
            this.inputElement.setSelectionRange(this.value.length, this.value.length);
        }, 10);
    }

    #handleBlur() {
        this.isFocused = false;

        // Dispatch custom blur event
        this.dispatchEvent(
            new CustomEvent("mjo-textarea:blur", {
                detail: {
                    element: this,
                    value: this.value,
                },
                bubbles: true,
            }),
        );
    }

    #handleInput(ev: InputEvent) {
        const target = ev.currentTarget as HTMLTextAreaElement;
        this.#previousValue = this.value;
        this.value = target.value;
        this.valueLength = this.value.length;

        // Dispatch custom input event
        this.dispatchEvent(
            new CustomEvent("mjo-textarea:input", {
                detail: {
                    element: this,
                    value: this.value,
                    previousValue: this.#previousValue,
                    inputType: (ev as InputEvent).inputType || "",
                },
                bubbles: true,
            }),
        );

        this.updateFormData({ name: this.name || "", value: this.value });
    }

    #handleChange() {
        // Dispatch custom change event
        this.dispatchEvent(
            new CustomEvent("mjo-textarea:change", {
                detail: {
                    element: this,
                    value: this.value,
                    previousValue: this.#previousValue,
                },
                bubbles: true,
            }),
        );

        // Also dispatch native change event for form compatibility
        this.dispatchEvent(new Event("change", { bubbles: true }));
    }

    #handleKeyup(ev: KeyboardEvent) {
        // Dispatch custom keyup event
        this.dispatchEvent(
            new CustomEvent("mjo-textarea:keyup", {
                detail: {
                    element: this,
                    key: ev.key,
                    code: ev.code,
                    value: this.value,
                    originalEvent: ev,
                },
                bubbles: true,
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
                border-radius: var(--mjo-textarea-radius, var(--mjo-input-border-radius, var(--mjo-radius-medium, 5px)));
                border: solid 1px;
                border-style: var(--mjo-textarea-border-style, var(--mjo-input-border-style, solid));
                border-width: var(--mjo-textarea-border-width, var(--mjo-input-border-width, 1px));
                border-color: var(--mjo-textarea-border-color, var(--mjo-input-border-color, var(--mjo-border-color, #dddddd)));
                background: var(--mjo-textarea-background-color, var(--mjo-input-background-color, var(--mjo-background-color-card-low, #ffffff)));
                box-shadow: var(--mjo-textarea-box-shadow, var(--mjo-input-box-shadow, none));
                display: flex;
                flex-flow: row nowrap;
                overflow: hidden;
                position: relative;
                transition:
                    border-color 0.3s,
                    background-color 0.3s;
            }
            .container:hover {
                border-style: var(--mjo-textarea-border-style-hover, var(--mjo-input-border-style-hover, solid));
                border-width: var(--mjo-textarea-border-width-hover, var(--mjo-input-border-width-hover, 1px));
                border-color: var(--mjo-textarea-border-color-hover, var(--mjo-input-border-color-hover, #cccccc));
            }
            .container[data-focused] {
                border-style: var(--mjo-textarea-border-style-focus, var(--mjo-input-border-style-focus, solid));
                border-width: var(--mjo-textarea-border-width-focus, var(--mjo-input-border-width-focus, 1px));
                border-color: var(--mjo-textarea-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed)));
            }
            .container[data-focused][data-color="secondary"] {
                border-style: var(--mjo-textarea-border-style-focus, var(--mjo-input-border-style-focus, solid));
                border-width: var(--mjo-textarea-border-width-focus, var(--mjo-input-border-width-focus, 1px));
                border-color: var(--mjo-textarea-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717)));
            }
            .container[data-error],
            .container[data-error][data-color="secondary"] {
                border-color: var(--mjo-color-error, #d31616);
            }
            .container[data-variant="flat"] {
                border-color: transparent;
                border-radius: 0;
                background: color-mix(in srgb, var(--mjo-textarea-color, var(--mjo-foreground-color, #222222)) 7%, transparent);
            }
            .container[data-variant="flat"]:hover,
            .container[data-variant="flat"][data-focused] {
                border-color: transparent;
                background: color-mix(in srgb, var(--mjo-textarea-primary-color, var(--mjo-primary-color, #1aa8ed)) 10%, transparent);
            }
            .container[data-variant="flat"][data-color="secondary"]:hover,
            .container[data-variant="flat"][data-color="secondary"][data-focused] {
                border-color: transparent;
                background: color-mix(in srgb, var(--mjo-textarea-secondary-color, var(--mjo-secondary-color, #7dc717)) 10%, transparent);
            }
            .container[data-variant="ghost"] {
                border-color: transparent;
                background: transparent;
            }
            .container[data-variant="ghost"]:hover,
            .container[data-variant="ghost"][data-focused] {
                border-color: transparent;
                background: transparent;
            }
            .container[data-variant="ghost"] textarea {
                padding-left: 2px;
                padding-right: 2px;
            }
            .container[data-error],
            .container[data-error][data-color="secondary"] {
                border-color: var(--mjo-color-error, #d31616);
            }
            .container[data-error][data-variant="flat"],
            .container[data-error][data-variant="ghost"] {
                border-color: transparent;
                background: color-mix(in srgb, var(--mjo-color-error, #d31616) 10%, transparent);
            }
            .container[data-disabled] {
                border-color: var(--mjo-textarea-border-color, var(--mjo-border-color, #dddddd));
                opacity: 0.5;
            }
            .container[data-variant="flat"][data-disabled],
            .container[data-variant="ghost"][data-disabled] {
                border-color: transparent;
            }
            mjoint-input-label[data-disabled],
            .helper[data-disabled] {
                opacity: 0.5;
            }
            textarea {
                background-color: transparent;
                border: none;
                padding: var(--mjo-textarea-padding, calc(1em / 2 - 2px) calc(1em / 2 - 2px) calc(1em / 2 - 2px));
                font-size: var(--mjo-textarea-font-size, var(--mjo-input-font-size, 1em));
                font-weight: var(--mjo-textarea-font-weight, var(--mjo-input-font-weight, normal));
                font-family: var(--mjo-textarea-font-family, var(--mjo-input-font-family, inherit));
                line-height: var(--mjo-textarea-font-size, var(--mjo-input-font-size, 1em));
                color: var(--mjo-textarea-color, var(--mjo-input-color, var(--mjo-foreground-color, #222222)));
                box-sizing: border-box;
                flex: 1 1 0;
                width: 100%;
                min-width: 0;
                resize: none;
            }
            textarea:focus {
                outline: none;
            }
            textarea:-webkit-autofill {
                box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-text-fill-color: var(--mjo-textarea-color, var(--mjo-input-color, #111111));
            }
            .container[data-size="small"] textarea {
                padding: var(--mjo-textarea-padding-small, calc(1em / 2 - 4px) calc(1em / 2));
                font-size: 0.8em;
            }
            .container[data-size="large"] textarea {
                padding: var(--mjo-textarea-padding-large, calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px));
                font-size: 1.2em;
            }
            .icon {
                position: relative;
                display: grid;
                place-items: center;
                color: var(--mjo-textarea-color, var(--mjo-input-color, var(--mjo-foreground-color, #222222)));
            }
            mjo-icon {
                font-size: var(--mjo-textarea-font-size, var(--mjo-input-font-size, 1em));
            }
            .container[data-focused] mjo-icon {
                color: var(--mjo-textarea-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed)));
            }
            .container[data-focused][data-color="secondary"] mjo-icon {
                color: var(--mjo-textarea-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717)));
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
                color: var(--mjo-textarea-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed)));
            }
            mjoint-input-counter[data-focused][data-color="secondary"] {
                color: var(--mjo-textarea-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717)));
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
        "mjo-textarea": MjoTextarea;
    }

    interface HTMLElementEventMap {
        "mjo-textarea:input": MjoTextareaInputEvent;
        "mjo-textarea:change": MjoTextareaChangeEvent;
        "mjo-textarea:focus": MjoTextareaFocusEvent;
        "mjo-textarea:blur": MjoTextareaBlurEvent;
        "mjo-textarea:keyup": MjoTextareaKeyupEvent;
        "mjo-textarea:clear": MjoTextareaClearEvent;
    }
}
