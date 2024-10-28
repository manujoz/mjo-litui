import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { FormMixin } from "./mixins/form-mixin";
import { InputErrorMixin } from "./mixins/input-error";

import { GiCheckMark } from "mjo-icons/gi/GiCheckMark.js";

import "./helpers/input-helper-text.js";
import "./helpers/input-label.js";
import "./mjo-icon.js";

@customElement("mjo-switch")
export class MjoSwitch extends InputErrorMixin(FormMixin(LitElement)) {
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: String, reflect: true }) checkgroup?: string;
    @property({ type: Boolean }) hideErrors = false;

    @query("input#mjoSwitchInput") inputElement!: HTMLInputElement;
    @query(".checkItem") checkItem!: HTMLDivElement;

    render() {
        return html`
            ${this.label ? html`<input-label color=${this.color} label=${this.label} ?error=${this.error}></input-label>` : nothing}
            <div class="container" ?data-disabled=${this.disabled} ?data-checked=${this.checked} data-size=${this.size} @click=${this.#handleClick}>
                <div class="checkItem">
                    <mjo-icon src=${GiCheckMark}></mjo-icon>
                </div>
                <input id="mjoSwitchInput" type="checkbox" name=${ifDefined(this.name)} value=${ifDefined(this.value)} ?checked=${this.checked} />
            </div>
            ${this.helperText
                ? html`<input-helper-text errormsg=${ifDefined(this.errormsg)} successmsg=${ifDefined(this.successmsg)}>${this.helperText}</input-helper-text>`
                : nothing}
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
    }

    getValue() {
        return this.checked ? this.value : "";
    }

    setValue(value: string) {
        this.value = value;
    }

    #handleClick() {
        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
        this.dispatchEvent(new Event("change"));
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                width: calc(var(--mjo-switch-size-medium, 28px) * 2);
            }
            :host([size="small"]) {
                width: calc(var(--mjo-switch-size-small, 20px) * 2);
            }
            :host([size="large"]) {
                width: calc(var(--mjo-switch-size-large, 36px) * 2);
            }
            .container {
                position: relative;
                height: var(--mjo-switch-size-medium, 28px);
                background-color: var(--mjo-switch-background-color, var(--mjo-background-color-light, #dddddd));
                border-radius: var(--mjo-switch-border-radius, 50px);
                border-style: var(--mjo-input-border-style, solid);
                border-width: var(--mjo-input-border-width, 1px);
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                transition: background-color 0.3s;
                cursor: pointer;
            }
            .container[data-disabled] {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .container[data-size="small"] {
                height: var(--mjo-switch-size-small, 20px);
            }
            .container[data-size="large"] {
                height: var(--mjo-switch-size-large, 36px);
            }
            .container[data-checked] {
                background-color: var(--mjo-switch-background-color-checked, var(--mjo-primary-color, #007bff));
            }
            .checkItem {
                position: absolute;
                top: 2px;
                left: 2px;
                border-radius: 50%;
                width: calc(var(--mjo-switch-size-medium, 28px) - 4px);
                height: calc(var(--mjo-switch-size-medium, 28px) - 4px);
                background-color: var(--mjo-switch-background-color, var(--mjo-foreground-color, #ffffff));
                display: grid;
                place-content: center;
                transition:
                    left 0.3s,
                    width 0.3s;
            }
            .checkItem mjo-icon {
                color: var(--mjo-switch-background-color-checked, var(--mjo-primary-color, #007bff));
                font-size: calc((var(--mjo-switch-size-medium, 28px) - 4px) * 0.6);
                transform: scale(0);
                transform-origin: center;
                transition: transform 0.5s;
            }
            .container[data-checked] .checkItem {
                left: calc(100% - var(--mjo-switch-size-medium, 28px) + 2px);
            }
            .container[data-size="small"] .checkItem {
                width: calc(var(--mjo-switch-size-small, 20px) - 4px);
                height: calc(var(--mjo-switch-size-small, 20px) - 4px);
            }
            .container[data-size="large"] .checkItem {
                width: calc(var(--mjo-switch-size-large, 36px) - 4px);
                height: calc(var(--mjo-switch-size-large, 36px) - 4px);
            }
            .container[data-size="small"] .checkItem mjo-icon {
                font-size: calc((var(--mjo-switch-size-small, 20px) - 4px) * 0.6);
            }
            .container[data-size="large"] .checkItem mjo-icon {
                font-size: calc((var(--mjo-switch-size-large, 36px) - 4px) * 0.6);
            }
            .container[data-checked][data-size="small"] .checkItem {
                left: calc(100% - var(--mjo-switch-size-small, 20px) + 2px);
            }
            .container[data-checked][data-size="large"] .checkItem {
                left: calc(100% - var(--mjo-switch-size-large, 36px) + 2px);
            }
            .container[data-checked] .checkItem mjo-icon {
                transform: scale(1);
            }
            input {
                display: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-switch": MjoSwitch;
    }
}
