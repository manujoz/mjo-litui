import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { FormMixin, IFormMixin } from "./mixins/form-mixin";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { MjoSwitchBlurEvent, MjoSwitchChangeEvent, MjoSwitchColor, MjoSwitchFocusEvent, MjoSwitchSize } from "./types/mjo-switch.js";

import { GiCheckMark } from "mjo-icons/gi";

import "./components/input/mjoint-input-helper-text.js";
import "./components/input/mjoint-input-label.js";
import "./mjo-icon.js";

@customElement("mjo-switch")
export class MjoSwitch extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IThemeMixin, IInputErrorMixin, IFormMixin {
    @property({ type: String }) color: MjoSwitchColor = "primary";
    @property({ type: String }) size: MjoSwitchSize = "medium";
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: String, reflect: true }) checkgroup?: string;
    @property({ type: Boolean }) hideErrors = false;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    @query("input") inputElement!: HTMLInputElement;
    @query(".container") switchContainer!: HTMLDivElement;

    type = "switch";

    // Computed properties for accessibility
    private get computedAriaChecked(): "true" | "false" {
        return this.checked ? "true" : "false";
    }

    private get computedAriaLabel(): string | undefined {
        if (this.ariaLabel) return this.ariaLabel;
        if (!this.label) return undefined;

        let baseLabel = this.label;
        if (this.required || this.ariaRequired) baseLabel += " (required)";
        baseLabel += this.checked ? " (on)" : " (off)";

        return baseLabel;
    }

    private get computedTabIndex(): number {
        return this.disabled ? -1 : 0;
    }

    render() {
        return html`
            ${this.label ? html`<mjoint-input-label color=${this.color} label=${this.label} ?error=${this.error}></mjoint-input-label>` : nothing}
            <div
                class="container"
                data-color=${this.color}
                ?data-disabled=${this.disabled}
                ?data-checked=${this.checked}
                data-size=${this.size}
                role="switch"
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
                <div class="checkItem">
                    <mjo-icon src=${GiCheckMark}></mjo-icon>
                </div>
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
            ${this.helperText || this.errormsg || this.successmsg
                ? html`<mjoint-input-helper-text .errormsg=${this.errormsg} .successmsg=${this.successmsg}>${this.helperText}</mjoint-input-helper-text>`
                : nothing}
        `;
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

    toggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.updateFormData({ name: this.name || "", value: this.getValue() });
    }

    focus() {
        if (!this.disabled) {
            this.switchContainer?.focus();
        }
    }

    blur() {
        this.switchContainer?.blur();
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
        };

        this.checked = !this.checked;
        this.updateFormData({ name: this.name || "", value: this.getValue() });

        // Dispatch standard change event for form compatibility
        this.dispatchEvent(new Event("change", { bubbles: true }));

        // Dispatch enhanced custom event
        this.dispatchEvent(
            new CustomEvent<MjoSwitchChangeEvent["detail"]>("mjo-switch:change", {
                detail: {
                    element: this,
                    checked: this.checked,
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
            new CustomEvent<MjoSwitchFocusEvent["detail"]>("mjo-switch:focus", {
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
            new CustomEvent<MjoSwitchBlurEvent["detail"]>("mjo-switch:blur", {
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
                background-color: var(--mjo-switch-background-color, var(--mjo-background-color-high, #dddddd));
                border-radius: var(--mjo-switch-radius, 50px);
                border-style: var(--mjo-switch-border-style, var(--mjo-input-border-style, solid));
                border-width: var(--mjo-switch-border-width, var(--mjo-input-border-width, 1px));
                border-color: var(--mjo-switch-border-color, var(--mjo-input-border-color, var(--mjo-border-color, #dddddd)));
                transition: all 0.3s ease;
                cursor: pointer;
                outline: none;
                width: 56px;
                outline-offset: 2px;
            }
            .container:focus-visible {
                box-shadow: 0 0 0 3px var(--mjo-switch-focus-color, rgba(59, 130, 246, 0.1));
            }
            .container[data-color="primary"]:focus-visible {
                outline: 2px solid var(--mjo-switch-focus-outline-color, var(--mjo-primary-color));
            }
            .container[data-color="secondary"]:focus-visible {
                outline: 2px solid var(--mjo-switch-focus-outline-color, var(--mjo-secondary-color));
            }
            .container[data-disabled] {
                opacity: var(--mjo-switch-disabled-opacity, 0.5);
                cursor: not-allowed;
            }
            .container[data-size="small"] {
                height: var(--mjo-switch-size-small, 20px);
                width: 42px;
            }
            .container[data-size="large"] {
                height: var(--mjo-switch-size-large, 36px);
                width: 65px;
            }
            .container[data-checked] {
                background-color: var(--mjo-switch-background-color-checked, var(--mjo-primary-color, #007bff));
            }
            .container[data-checked][data-color="secondary"] {
                background-color: var(--mjo-switch-background-color-checked, var(--mjo-secondary-color, #007bff));
            }
            .checkItem {
                position: absolute;
                top: 2px;
                left: 2px;
                border-radius: 50%;
                width: calc(var(--mjo-switch-size-medium, 28px) - 4px);
                height: calc(var(--mjo-switch-size-medium, 28px) - 4px);
                background-color: var(--mjo-switch-ball-background-color, var(--mjo-foreground-color, #333333));
                display: grid;
                place-content: center;
                transition: all 0.3s ease;
            }
            .container[data-checked] .checkItem {
                left: calc(100% - var(--mjo-switch-size-medium, 28px) + 2px);
                background-color: var(--mjo-switch-ball-background-color-checked, var(--mjo-primary-foreground-color, #ffffff));
            }
            .container[data-checked][data-color="secondary"] .checkItem {
                left: calc(100% - var(--mjo-switch-size-medium, 28px) + 2px);
                background-color: var(--mjo-switch-ball-background-color-checked, var(--mjo-secondary-foreground-color, #ffffff));
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
            .checkItem mjo-icon {
                color: var(--mjo-switch-background-color-checked, var(--mjo-primary-color, #007bff));
                font-size: calc((var(--mjo-switch-size-medium, 28px) - 4px) * 0.6);
                transform: scale(0);
                transform-origin: center;
                transition: transform 0.5s ease;
            }
            .container[data-color="secondary"] .checkItem mjo-icon {
                color: var(--mjo-switch-background-color-checked, var(--mjo-secondary-color, #cc3d74));
            }
            input {
                display: none;
            }
            mjoint-input-helper-text {
                color: var(--mjo-switch-helper-color, var(--mjo-foreground-color-low));
                font-size: var(--mjo-switch-helper-font-size, inherit);
                font-weight: var(--mjo-switch-helper-font-weight, inherit);
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .container,
                .checkItem,
                .checkItem mjo-icon {
                    transition: none;
                }
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .container {
                    border-width: 2px;
                }
                .container:focus-visible {
                    outline-width: 3px;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-switch": MjoSwitch;
    }

    interface HTMLElementEventMap {
        "mjo-switch:change": MjoSwitchChangeEvent;
        "mjo-switch:focus": MjoSwitchFocusEvent;
        "mjo-switch:blur": MjoSwitchBlurEvent;
    }
}
