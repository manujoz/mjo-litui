import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AiFillCheckSquare, AiOutlineMinus } from "mjo-icons/ai";

import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import {
    MjoCheckboxBlurEvent,
    MjoCheckboxChangeEvent,
    MjoCheckboxColor,
    MjoCheckboxFocusEvent,
    MjoCheckboxIndeterminateChangeEvent,
} from "./types/mjo-checkbox.js";

import "./components/input/input-helper-text.js";
import "./mjo-icon.js";
import "./mjo-typography.js";

@customElement("mjo-checkbox")
export class MjoCheckbox extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IThemeMixin, IInputErrorMixin, IFormMixin {
    @property({ type: String }) color: MjoCheckboxColor = "primary";
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) indeterminate = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: String, reflect: true }) checkgroup?: string;
    @property({ type: Boolean }) hideErrors = false;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    @query("input#mjoCheckboxInput") inputElement!: HTMLInputElement;
    @query(".checkbox-container") checkboxContainer!: HTMLElement;

    type = "checkbox";

    // Computed properties for accessibility
    private get computedAriaChecked(): "true" | "false" | "mixed" {
        if (this.indeterminate) return "mixed";
        return this.checked ? "true" : "false";
    }

    private get computedAriaLabel(): string | undefined {
        if (this.ariaLabel) return this.ariaLabel;
        if (!this.label) return undefined;

        let baseLabel = this.label;
        if (this.required || this.ariaRequired) baseLabel += " (required)";
        if (this.indeterminate) baseLabel += " (partially selected)";
        else if (this.checked) baseLabel += " (checked)";
        else baseLabel += " (unchecked)";

        return baseLabel;
    }

    private get computedTabIndex(): number {
        return this.disabled ? -1 : 0;
    }

    render() {
        return html`<div class="container" ?data-disabled=${this.disabled} data-color=${this.color}>
            <div
                class="checkbox-container"
                role="checkbox"
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
                <div class="box">
                    <div class="checkbox" ?data-checked=${this.checked} ?data-indeterminate=${this.indeterminate}>
                        ${this.indeterminate ? html`<mjo-icon src=${AiOutlineMinus}></mjo-icon>` : html`<mjo-icon src=${AiFillCheckSquare}></mjo-icon>`}
                    </div>
                </div>
                ${this.label ? html`<div class="label-container"><mjo-typography tag="none" class="label">${this.label}</mjo-typography></div>` : nothing}
                <input
                    id="mjoCheckboxInput"
                    type="checkbox"
                    name=${ifDefined(this.name)}
                    value=${ifDefined(this.value)}
                    ?checked=${this.checked}
                    .indeterminate=${this.indeterminate}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    aria-hidden="true"
                    tabindex="-1"
                />
            </div>
            ${this.helperText ? html`<input-helper-text>${this.helperText}</input-helper-text> ` : nothing}
            ${this.errormsg || this.successmsg
                ? html`<input-helper-text .errormsg=${this.errormsg} .successmsg=${this.successmsg}></input-helper-text> `
                : nothing}
        </div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
    }

    getValue() {
        return this.checked ? this.value || "1" : "";
    }

    setValue(value: string) {
        this.value = value;
    }

    setIndeterminate(indeterminate: boolean) {
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

    reportValidity(): boolean {
        return this.inputElement.reportValidity();
    }

    setCustomValidity(message: string): void {
        this.inputElement.setCustomValidity(message);
    }

    #handleClick() {
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

        this.checked = !this.checked;
        this.updateFormData({ name: this.name || "", value: this.getValue() });

        // Dispatch enhanced change event
        this.dispatchEvent(
            new CustomEvent<MjoCheckboxChangeEvent["detail"]>("change", {
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
                width: 200px;
            }
            .container {
                position: relative;
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
                border-radius: 0.2rem;
                line-height: 0;
                transition: all 0.3s ease;
                width: 1.3rem;
                height: 1.3rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            mjo-icon {
                transform: scale(0);
                transition: transform 0.3s ease;
                font-size: 1.3rem;
            }
            .checkbox[data-checked] {
                color: var(--mjo-checkbox-checked-color, var(--mjo-primary-color));
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-primary-color)));
                background-color: var(--mjo-checkbox-checked-background-color, transparent);
            }
            .container[data-color="secondary"] .checkbox[data-checked] {
                color: var(--mjo-checkbox-checked-color, var(--mjo-secondary-color));
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-secondary-color)));
                background-color: var(--mjo-checkbox-checked-background-color, transparent);
            }
            .checkbox[data-checked] mjo-icon {
                transform: scale(1);
            }
            .checkbox[data-indeterminate] {
                color: var(--mjo-checkbox-indeterminate-color, var(--mjo-checkbox-checked-color, var(--mjo-primary-color)));
                border-color: var(--mjo-checkbox-indeterminate-border-color, var(--mjo-checkbox-indeterminate-color, var(--mjo-primary-color)));
                background-color: var(--mjo-checkbox-indeterminate-background-color, transparent);
            }
            .checkbox[data-indeterminate] mjo-icon {
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
            }
            input {
                display: none;
            }
            input-helper-text {
                padding-left: calc(calc(1.3rem + var(--mjo-space-small, 5px)) + 2px);
                color: var(--mjo-checkbox-helper-color, var(--mjo-foreground-color-low));
                font-size: var(--mjo-checkbox-helper-font-size, inherit);
                font-weight: var(--mjo-checkbox-helper-font-weight, inherit);
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
