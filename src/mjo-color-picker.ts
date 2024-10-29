import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { FormMixin } from "./mixins/form-mixin";
import { InputErrorMixin } from "./mixins/input-error";

import "./helpers/input-helper-text";
import "./helpers/input-label";

@customElement("mjo-color-picker")
export class MjoColorPicker extends InputErrorMixin(FormMixin(LitElement)) {
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: Boolean }) hideErrors = false;
    @property({ type: Boolean }) rounded = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";

    @query("input") inputElement!: HTMLInputElement;
    @query(".color-picker") colorPicker!: HTMLDivElement;

    type = "colorpicker";

    render() {
        return html`
            ${this.label ? html`<input-label color=${this.color} label=${this.label} ?error=${this.error}></input-label>` : nothing}
            <div class="container" ?data-rounded=${this.rounded} data-size=${this.size} ?data-disabled=${this.disabled}>
                <div class="color-picker"></div>
                <input
                    @change=${this.#handleChange}
                    @input=${this.#handleInput}
                    type="color"
                    name=${ifDefined(this.name)}
                    ?disabled=${this.disabled}
                    value=${this.value}
                    aria-label=${this.label || this.ariaLabel || nothing}
                    aria-errormessage=${this.errormsg || nothing}
                    aria-required=${ifDefined(this.required)}
                />
            </div>
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

        this.colorPicker.style.backgroundColor = this.inputElement.value;
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
    }

    #handleInput(event: InputEvent) {
        const target = event.currentTarget as HTMLInputElement;
        this.colorPicker.style.backgroundColor = target.value;
        this.value = target.value;
        this.updateFormData({ name: this.name || "", value: this.value });
    }

    #handleChange() {
        this.dispatchEvent(new Event("change"));
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                text-align: left;
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
                border-style: var(--mjo-input-border-style, solid);
                border-width: var(--mjo-input-border-width, 1px);
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                box-shadow: var(--mjo-input-box-shadow, none);
                border-radius: var(--mjo-input-radius, var(--mjo-radius, 5px));
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
            }
            input {
                opacity: 0;
                width: 100%;
                height: 100%;
                padding: 0;
                cursor: pointer;
            }
            .container[data-disabled] input {
                cursor: not-allowed;
            }
            .color-picker {
                position: absolute;
                inset: 0;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-color-picker": MjoColorPicker;
    }
}
