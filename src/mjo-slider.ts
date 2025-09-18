import { type MjointSliderHandle } from "./components/slider/mjoint-slider-handle.js";
import {
    MjoSliderBlurEvent,
    MjoSliderChangeEvent,
    MjoSliderColor,
    MjoSliderFocusEvent,
    MjoSliderInputEvent,
    MjoSliderSize,
    MjoSliderValueChangeEvent,
} from "./types/mjo-slider.js";

import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { createRef, ref } from "lit/directives/ref.js";

import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { MJO_SLIDER_SIZES } from "./utils/mjo-slider.js";

import "./components/input/mjoint-input-label.js";
import "./components/slider/mjoint-slider-handle.js";

/**
 * @summary Customizable range slider component with accessibility support, keyboard navigation, and range selection.
 *
 * @description The mjo-slider component provides an interactive slider interface for selecting numeric values
 * within a specified range. It supports both single-value selection and range selection with dual handles,
 * includes comprehensive accessibility features with ARIA attributes, keyboard navigation, screen reader support,
 * and customizable appearance with seamless form integration.
 *
 * @fires mjo-slider:change - Fired when the slider value changes and handle is released
 * @fires mjo-slider:input - Fired during slider handle movement for real-time updates
 * @fires mjo-slider:focus - Fired when a slider handle receives focus
 * @fires mjo-slider:blur - Fired when a slider handle loses focus
 * @fires mjo-slider:valuechange - Fired when value changes programmatically
 * @fires change - Standard change event for form compatibility
 *
 * @slot - No slots available (uses properties for configuration)
 * @csspart container - The main slider container
 * @csspart value - Value display element next to the label
 * @csspart rangebar - Slider track container
 * @csspart track - Background track of the slider
 * @csspart progress - Progress/filled portion of the track
 * @csspart label-container - Container for the input label (via mjoint-input-label)
 * @csspart label-truncate-container - Truncate container within the label
 * @csspart label-truncate-wrapper - Truncate wrapper within the label
 * @csspart tooltip-container - Container for slider handle tooltips
 * @csspart tooltip - Tooltip content for handle values
 * @csspart handle-wrapper - Wrapper for slider handles
 * @csspart handle-item - Individual slider handle element
 */
@customElement("mjo-slider")
export class MjoSlider extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IInputErrorMixin, IFormMixin, IThemeMixin {
    @property({ type: Boolean }) hideValue = false;
    @property({ type: Boolean }) isRange = false;
    @property({ type: Boolean }) tooltip = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Number }) max = 1;
    @property({ type: Number }) min = 0;
    @property({ type: Number }) step = 0.01;
    @property({ type: String }) color: MjoSliderColor = "primary";
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) size: MjoSliderSize = "medium";
    @property({ type: String }) value = "undefined";
    @property({ type: String }) valuePrefix = "";
    @property({ type: String }) valueSuffix = "";

    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-label" }) declare ariaLabel: string | null;
    @property({ type: String, attribute: "aria-valuetext" }) ariaValuetext?: string;
    @property({ type: String, attribute: "aria-orientation" }) ariaOrientation: "horizontal" | "vertical" = "horizontal";
    @property({ type: String, attribute: "aria-required" }) ariaRequiredAttr?: string;

    // Function to format aria-valuetext
    @property({ attribute: false }) formatValueText?: (value: string) => string;

    @state() private isFocused = false;
    @state() private activeHandle: "one" | "two" | null = null;
    @state() private sizeNumber = MJO_SLIDER_SIZES.medium;

    @query("input") inputElement!: HTMLInputElement;

    type = "slider";
    #stepsLeftsPx = [0];
    #stepsValues = [0];
    #rangebarRef = createRef<HTMLDivElement>();
    #progressbarRef = createRef<HTMLDivElement>();
    #sliderOneRef = createRef<MjointSliderHandle>();
    #sliderTwoRef = createRef<MjointSliderHandle>();

    render() {
        const handleOneId = `${this.id || "slider"}-handle-one-${Math.random().toString(36).substring(2, 9)}`;
        const handleTwoId = this.isRange ? `${this.id || "slider"}-handle-two-${Math.random().toString(36).substring(2, 9)}` : undefined;
        const labelId = this.label ? `${this.id || "slider"}-label-${Math.random().toString(36).substring(2, 9)}` : undefined;

        return html`
            ${this.applyThemeSsr()}
            <div class="label">
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
                ${!this.hideValue
                    ? html`
                          <div class="value" part="value" ?data-disabled=${this.disabled} aria-live="polite" aria-atomic="true">
                              ${this.valuePrefix}${this.value}${this.valueSuffix}
                          </div>
                      `
                    : nothing}
            </div>
            <div
                class="container"
                part="container"
                ?data-disabled=${this.disabled}
                data-color=${this.color}
                role="group"
                aria-label=${this.#computedAriaLabel}
                aria-describedby=${ifDefined(this.ariaDescribedby)}
            >
                <div ${ref(this.#rangebarRef)} class="rangebar" part="rangebar" aria-hidden="true">
                    <div class="track" part="track"></div>
                    <div class="progress" part="progress" data-color=${this.color} ${ref(this.#progressbarRef)}></div>
                </div>
                <mjoint-slider-handle
                    ${ref(this.#sliderOneRef)}
                    id=${handleOneId}
                    exportparts="
                        tooltip-container,
                        tooltip,
                        handle-wrapper,
                        handle-item"
                    .role=${"slider"}
                    aria-valuemin=${this.min}
                    aria-valuemax=${this.max}
                    aria-valuenow=${this.#getSliderValue("one")}
                    aria-valuetext=${this.#computedAriaValueText}
                    aria-labelledby=${ifDefined(this.ariaLabelledby || labelId)}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    aria-orientation=${this.ariaOrientation}
                    aria-disabled=${this.disabled ? "true" : "false"}
                    .tabindex=${this.#computedTabIndex}
                    @move=${this.#handleMove}
                    @focus=${this.#handleSliderFocus}
                    @blur=${this.#handleSliderBlur}
                    @keydown=${this.#handleKeydown}
                    ?tooltip=${this.tooltip}
                    ?disabled=${this.disabled}
                    value=${this.#getSliderValue("one")}
                    valuePrefix=${this.valuePrefix}
                    valueSuffix=${this.valueSuffix}
                    size=${this.sizeNumber}
                    color=${this.color}
                    @release=${this.#handleRelease}
                ></mjoint-slider-handle>
                ${this.isRange
                    ? html`<mjoint-slider-handle
                          ${ref(this.#sliderTwoRef)}
                          id=${ifDefined(handleTwoId)}
                          exportparts="
                            tooltip-container,
                            tooltip,
                            handle-wrapper,
                            handle-item"
                          .role=${"slider"}
                          aria-valuemin=${this.min}
                          aria-valuemax=${this.max}
                          aria-valuenow=${this.#getSliderValue("two")}
                          aria-valuetext=${this.#computedAriaValueText}
                          aria-labelledby=${ifDefined(this.ariaLabelledby || labelId)}
                          aria-describedby=${ifDefined(this.ariaDescribedby)}
                          aria-orientation=${this.ariaOrientation}
                          aria-disabled=${this.disabled ? "true" : "false"}
                          .tabindex=${this.#computedTabIndex}
                          @move=${this.#handleMove}
                          @focus=${this.#handleSliderFocus}
                          @blur=${this.#handleSliderBlur}
                          @keydown=${this.#handleKeydown}
                          ?disabled=${this.disabled}
                          ?tooltip=${this.tooltip}
                          value=${this.#getSliderValue("two")}
                          valuePrefix=${this.valuePrefix}
                          valueSuffix=${this.valueSuffix}
                          size=${this.sizeNumber}
                          color=${this.color}
                          @release=${this.#handleRelease}
                      ></mjoint-slider-handle>`
                    : nothing}
                <input name=${ifDefined(this.name)} type="hidden" .value=${live(this.value)} />
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();

        window.addEventListener("resize", this.#resizeHandler);

        this.updateFormData({ name: this.name || "", value: this.value });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener("resize", this.#resizeHandler);
    }

    protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>) {
        super.firstUpdated(_changedProperties);

        if (this.value === "undefined") {
            if (!this.isRange) {
                this.value = String(this.min);
            } else {
                this.value = `${this.min}-${this.max}`;
            }
        } else {
            this.value = this.#checkValue(this.value);
        }

        requestAnimationFrame(() => {
            this.#setSteps();

            if (this.#sliderOneRef.value) {
                this.#setSliderPosition(this.#sliderOneRef.value, this.#getSliderValue("one"));
            }
            if (this.#sliderTwoRef.value) {
                this.#setSliderPosition(this.#sliderTwoRef.value, this.#getSliderValue("two"));
            }
        });
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("size") && this.size) {
            this.sizeNumber = MJO_SLIDER_SIZES[this.size];

            this.style.setProperty("--slider-size", `${this.sizeNumber}px`);
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        const previousValue = this.value;
        this.value = this.#checkValue(value);

        this.updateFormData({ name: this.name || "", value: this.value });

        // Dispatch value change event for programmatic changes
        if (previousValue !== this.value) {
            this.dispatchEvent(
                new CustomEvent<MjoSliderValueChangeEvent["detail"]>("mjo-slider:valuechange", {
                    detail: {
                        element: this,
                        value: this.value,
                        previousValue,
                        programmatic: true,
                    },
                    bubbles: true,
                    composed: true,
                }),
            );
        }
    }

    // Computed properties for accessibility
    get #computedAriaValueText(): string {
        if (this.formatValueText) {
            return this.formatValueText(this.value);
        }

        if (this.ariaValuetext) {
            return this.ariaValuetext;
        }

        // Default format with prefix and suffix
        if (this.isRange) {
            const [min, max] = this.value.split("-");
            return `${this.valuePrefix}${min}${this.valueSuffix} to ${this.valuePrefix}${max}${this.valueSuffix}`;
        }

        return `${this.valuePrefix}${this.value}${this.valueSuffix}`;
    }

    get #computedAriaLabel(): string {
        if (this.ariaLabel) return this.ariaLabel;
        if (this.label) return this.label;
        return this.isRange ? "Range slider" : "Slider";
    }

    get #computedTabIndex(): number {
        return this.disabled ? -1 : 0;
    }

    #checkValue(value: string) {
        if (this.isRange) {
            const values = value.split("-");
            if (isNaN(Number(values[0])) || isNaN(Number(values[1]))) {
                throw new Error("[mjo-slider]: Invalid value, must be a number separated by a dash (-)");
            }

            if (Number(values[0]) > Number(values[1])) {
                throw new Error("[mjo-slider]: Invalid value, the first value must be less than the second value");
            }

            if (!values[1]) {
                values[1] = this.max.toString();
            }

            if (Number(values[0]) < this.min) {
                values[0] = this.min.toString();
            }

            if (Number(values[1]) > this.max) {
                values[1] = this.max.toString();
            }

            // reconstruir el valor normalizado
            value = `${values[0]}-${values[1]}`;
        } else {
            if (isNaN(Number(value))) {
                throw new Error("[mjo-slider]: Invalid value, must be a number");
            }

            if (Number(value) < this.min) {
                value = this.min.toString();
            }

            if (Number(value) > this.max) {
                value = this.max.toString();
            }
        }

        return value;
    }

    #getSliderValue(slider: "one" | "two") {
        if (!this.isRange) {
            return this.value;
        }

        if (slider === "one") {
            return this.value.split("-")[0];
        } else {
            return this.value.split("-")[1];
        }
    }

    #handleRelease() {
        this.dispatchEvent(new Event("change"));

        // Dispatch custom event with details
        const previousValue = this.value;
        this.dispatchEvent(
            new CustomEvent<MjoSliderChangeEvent["detail"]>("mjo-slider:change", {
                detail: {
                    element: this,
                    value: this.value,
                    name: this.name,
                    isRange: this.isRange,
                    previousValue,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleSliderFocus(event: FocusEvent) {
        this.isFocused = true;
        const target = event.target as MjointSliderHandle;

        // Determine which handle is focused
        if (target === this.#sliderOneRef.value) {
            this.activeHandle = "one";
        } else if (target === this.#sliderTwoRef.value) {
            this.activeHandle = "two";
        }

        this.dispatchEvent(
            new CustomEvent<MjoSliderFocusEvent["detail"]>("mjo-slider:focus", {
                detail: {
                    element: this,
                    handle: this.activeHandle || undefined,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleSliderBlur(event: FocusEvent) {
        // Check if focus is moving to another handle
        const relatedTarget = event.relatedTarget as Element;
        const isMovingToAnotherHandle = relatedTarget === this.#sliderOneRef.value || relatedTarget === this.#sliderTwoRef.value;

        if (!isMovingToAnotherHandle) {
            this.isFocused = false;
            this.activeHandle = null;
        }

        this.dispatchEvent(
            new CustomEvent<MjoSliderBlurEvent["detail"]>("mjo-slider:blur", {
                detail: {
                    element: this,
                    handle: this.activeHandle || undefined,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleKeydown(event: KeyboardEvent) {
        if (this.disabled) return;

        const target = event.target as MjointSliderHandle;
        const isHandleOne = target === this.#sliderOneRef.value;
        const currentValue = Number(this.#getSliderValue(isHandleOne ? "one" : "two"));
        let newValue = currentValue;
        let handled = false;

        // Calculate step increment based on key
        const stepIncrement = this.step;
        const largeStepIncrement = Math.max(this.step * 10, (this.max - this.min) / 10);

        switch (event.key) {
            case "ArrowLeft":
            case "ArrowDown":
                newValue = Math.max(this.min, currentValue - stepIncrement);
                handled = true;
                break;
            case "ArrowRight":
            case "ArrowUp":
                newValue = Math.min(this.max, currentValue + stepIncrement);
                handled = true;
                break;
            case "Home":
                newValue = this.min;
                handled = true;
                break;
            case "End":
                newValue = this.max;
                handled = true;
                break;
            case "PageDown":
                handled = true;
                newValue = Math.min(this.max, currentValue + largeStepIncrement);
                break;
            case "PageUp":
                newValue = Math.max(this.min, currentValue - largeStepIncrement);
                handled = true;
                break;
        }

        if (handled) {
            event.preventDefault();
            event.stopPropagation();

            // Update the appropriate value
            const roundedValue = Number(newValue.toFixed(this.step.toString().split(".")[1]?.length || 0));

            if (this.isRange) {
                const [minVal, maxVal] = this.value.split("-").map(Number);
                if (isHandleOne) {
                    if (roundedValue <= maxVal) {
                        this.setValue(`${roundedValue}-${maxVal}`);
                    }
                } else {
                    if (roundedValue >= minVal) {
                        this.setValue(`${minVal}-${roundedValue}`);
                    }
                }
            } else {
                this.setValue(String(roundedValue));
            }

            // Update handle position and progress
            this.#setSliderPosition(target, String(roundedValue));

            // Dispatch input event for real-time updates
            this.dispatchEvent(
                new CustomEvent<MjoSliderInputEvent["detail"]>("mjo-slider:input", {
                    detail: {
                        element: this,
                        value: this.value,
                        name: this.name,
                        isRange: this.isRange,
                        handle: isHandleOne ? "one" : "two",
                    },
                    bubbles: true,
                    composed: true,
                }),
            );
        }
    }

    #setSteps() {
        const width = this.#rangebarRef.value?.getBoundingClientRect().width || 0;
        const steps = (this.max - this.min) / this.step + 1;
        const decimals = this.step.toString().split(".")[1]?.length || 0;
        const pixels = width / (steps - 1);

        let value = this.min;
        this.#stepsLeftsPx = [0];
        this.#stepsValues = [value];
        for (let i = 1; i < steps; i++) {
            value += this.step;
            const leftPx = pixels * i;

            this.#stepsLeftsPx.push(Number(leftPx.toFixed(decimals)));
            this.#stepsValues.push(Number(value.toFixed(decimals)));
        }
    }

    #handleMove(ev: CustomEvent<{ diff: number; target: MjointSliderHandle }>) {
        const rangebar = this.#rangebarRef.value;
        if (!rangebar) return;

        const slider = ev.detail.target;
        const diff = ev.detail.diff;
        const sliderLeft = slider.left;
        const left = sliderLeft + diff;

        const closestPosition = this.#stepsLeftsPx.reduce((prev, curr) => (Math.abs(curr - left) < Math.abs(prev - left) ? curr : prev));
        const index = this.#stepsLeftsPx.indexOf(closestPosition);
        let value = String(this.#stepsValues[index]);

        if (this.isRange) {
            if (slider === this.#sliderOneRef.value) {
                const sliderTwo = this.#sliderTwoRef.value;
                if (!sliderTwo) return;

                const sliderTwoLeft = sliderTwo.left;
                if (closestPosition >= sliderTwoLeft) {
                    return;
                }

                value = `${value}-${this.value.split("-")[1]}`;
            } else {
                const sliderOne = this.#sliderOneRef.value;
                if (!sliderOne) return;

                const sliderOneLeft = sliderOne.left;
                if (closestPosition <= sliderOneLeft) {
                    return;
                }

                value = `${this.value.split("-")[0]}-${value}`;
            }
        }

        this.dispatchEvent(new CustomEvent("move", { detail: { value, target: this } }));

        // Dispatch new input event for real-time updates
        this.dispatchEvent(
            new CustomEvent<MjoSliderInputEvent["detail"]>("mjo-slider:input", {
                detail: {
                    element: this,
                    value,
                    name: this.name,
                    isRange: this.isRange,
                    handle: slider === this.#sliderOneRef.value ? "one" : "two",
                },
                bubbles: true,
                composed: true,
            }),
        );

        this.setValue(value);
        this.#setProgress();
        slider.setLeftPosition(closestPosition);
    }

    #setSliderPosition(slider: MjointSliderHandle, value: string) {
        const rangebar = this.#rangebarRef.value;
        if (!rangebar) return;

        const index = this.#stepsValues.indexOf(Number(value));
        const left = this.#stepsLeftsPx[index];

        slider.setLeftPosition(left);
        slider.setLeft();
        this.#setProgress();
    }

    #setProgress() {
        const progressbar = this.#progressbarRef.value;
        if (!progressbar) return;

        const indexOne = this.#stepsValues.indexOf(Number(this.#getSliderValue("one")));
        const leftOne = this.#stepsLeftsPx[indexOne];

        if (this.isRange) {
            const indexTwo = this.#stepsValues.indexOf(Number(this.#getSliderValue("two")));
            const leftTwo = this.#stepsLeftsPx[indexTwo];

            progressbar.style.left = `${leftOne}px`;
            progressbar.style.width = `${leftTwo - leftOne}px`;
        } else {
            progressbar.style.left = "0";
            progressbar.style.width = `${leftOne}px`;
        }
    }

    #resizeHandler = () => {
        this.#setSteps();
    };

    static styles = [
        css`
            :host {
                display: inline-block;
                width: 250px;
            }
            .label {
                position: relative;
                display: flex;
            }
            mjoint-input-label {
                padding-top: 0.2em;
                flex-grow: 1;
                flex-basis: 0;
            }
            .value {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                font-size: var(--mjo-slider-value-font-size, var(--mjo-input-label-font-size, calc(1em * 0.8)));
                color: var(--mjo-slider-value-color, inherit);
                font-weight: var(--mjo-slider-value-font-weight, inherit);
            }
            .container {
                position: relative;
                width: 100%;
                height: var(--slider-size, 20px);
                display: flex;
                align-items: center;
                outline: none;
                border-radius: var(--mjo-slider-focus-outline-radius, 4px);
            }
            .container[data-disabled],
            .value[data-disabled],
            mjoint-input-label[data-disabled] {
                opacity: var(--mjo-slider-disabled-opacity, 0.5);
            }
            .rangebar {
                width: 100%;
                height: 15%;
                background-color: var(--mjo-slider-background-color, transparent);
                border-radius: var(--mjo-slider-border-radius, var(--mjo-radius-medium, 5px));
                padding: 8px 0;
                margin: -8px 0;
                touch-action: pan-y;
            }
            .progress,
            .track {
                position: absolute;
                top: 8px;
                left: 0;
                height: 15%;
                background-color: var(--mjo-slider-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff)));
                border-radius: inherit;
                transition: background-color 0.2s ease;
            }
            .track {
                width: 100%;
                background-color: var(--mjo-foreground-color);
                opacity: 0.2;
            }
            .progress[data-color="secondary"] {
                background-color: var(--mjo-slider-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #ff8800)));
            }

            @media (prefers-reduced-motion: reduce) {
                .container:focus-within,
                .progress,
                mjoint-slider-handle {
                    transition: none;
                }
            }

            @media (prefers-contrast: high) {
                .container:focus-within {
                    outline-width: var(--mjo-slider-focus-outline-width-high-contrast, 3px);
                }
                .rangebar {
                    background-color: var(--mjo-slider-background-color-high-contrast, #000);
                    border: 1px solid var(--mjo-slider-border-color-high-contrast, #fff);
                }
                .progress {
                    background-color: var(--mjo-slider-primary-color-high-contrast, #0000ff);
                }
                .progress[data-color="secondary"] {
                    background-color: var(--mjo-slider-secondary-color-high-contrast, #ff0000);
                }
            }

            @media (pointer: coarse) {
                .container {
                    height: 32px;
                }
                .rangebar {
                    padding: 14px 0;
                    margin: -14px 0;
                    touch-action: pan-y;
                }
                mjoint-slider-handle {
                    touch-action: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-slider": MjoSlider;
    }

    interface HTMLElementEventMap {
        "mjo-slider:change": MjoSliderChangeEvent;
        "mjo-slider:input": MjoSliderInputEvent;
        "mjo-slider:focus": MjoSliderFocusEvent;
        "mjo-slider:blur": MjoSliderBlurEvent;
        "mjo-slider:valuechange": MjoSliderValueChangeEvent;
    }
}
