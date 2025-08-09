import { type SliderHandle } from "./components/slider/slider-handle.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { createRef, ref } from "lit/directives/ref.js";

import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/input/input-label.js";
import "./components/slider/slider-handle.js";

@customElement("mjo-slider")
export class MjoSlider extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IInputErrorMixin, IFormMixin, IThemeMixin {
    @property({ type: Boolean }) hideValue = false;
    @property({ type: Boolean }) isRange = false;
    @property({ type: Boolean }) tooltip = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Number }) max = 1;
    @property({ type: Number }) min = 0;
    @property({ type: Number }) step = 0.01;
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) value = "undefined";
    @property({ type: String }) valuePrefix = "";
    @property({ type: String }) valueSuffix = "";

    @state() private isFocused = false;

    @query("input#mjoSliderInput") inputElement!: HTMLInputElement;

    type = "slider";
    stepsLeftsPx = [0];
    setpsValues = [0];
    rangebarRef = createRef<HTMLDivElement>();
    progressbarRef = createRef<HTMLDivElement>();
    sliderOneRef = createRef<SliderHandle>();
    sliderTwoRef = createRef<SliderHandle>();

    listeners = {
        resize: () => {
            this.#setSteps();
        },
    };

    render() {
        return html`<div class="label">
                ${this.label
                    ? html`<input-label
                          color=${this.color}
                          label=${this.label}
                          ?focused=${this.isFocused}
                          ?error=${this.error}
                          ?data-disabled=${this.disabled}
                      ></input-label>`
                    : nothing}
                ${!this.hideValue
                    ? html`<div class="value" ?data-disabled=${this.disabled}>${this.valuePrefix}${this.value}${this.valueSuffix}</div>`
                    : nothing}
            </div>
            <div class="container" ?data-disabled=${this.disabled}>
                <div ${ref(this.rangebarRef)} class="rangebar">
                    <div class="progress" data-color=${this.color} ${ref(this.progressbarRef)}></div>
                </div>
                <slider-handle
                    ${ref(this.sliderOneRef)}
                    @move=${this.#handleMove}
                    ?tooltip=${this.tooltip}
                    ?disabled=${this.disabled}
                    value=${this.#getSliderValue("one")}
                    valuePrefix=${this.valuePrefix}
                    valueSuffix=${this.valueSuffix}
                    size="20"
                    color=${this.color}
                    @release=${this.#handleRelease}
                ></slider-handle>
                ${this.isRange
                    ? html`<slider-handle
                          ${ref(this.sliderTwoRef)}
                          @move=${this.#handleMove}
                          ?disabled=${this.tooltip}
                          ?tooltip=${this.tooltip}
                          value=${this.#getSliderValue("two")}
                          valuePrefix=${this.valuePrefix}
                          valueSuffix=${this.valueSuffix}
                          size="20"
                          color=${this.color}
                          @release=${this.#handleRelease}
                      ></slider-handle>`
                    : nothing}
                <input id="mjoSliderInput" name=${ifDefined(this.name)} type="hidden" .value=${live(this.value)} />
            </div>`;
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.value === "undefined") {
            if (!this.isRange) {
                this.value = String(this.min);
            } else {
                this.value = `${this.min}-${this.max}`;
            }
        } else {
            this.value = this.#checkValue(this.value);
        }

        window.addEventListener("resize", this.listeners.resize);

        this.updateFormData({ name: this.name || "", value: this.value });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener("resize", this.listeners.resize);
    }

    protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>) {
        super.firstUpdated(_changedProperties);

        this.#setSteps();

        if (this.sliderOneRef.value) {
            this.#setSliderPosition(this.sliderOneRef.value, this.#getSliderValue("one"));
        }
        if (this.sliderTwoRef.value) {
            this.#setSliderPosition(this.sliderTwoRef.value, this.#getSliderValue("two"));
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = this.#checkValue(value);

        this.updateFormData({ name: this.name || "", value: this.value });
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
    }

    #setSteps() {
        const width = this.rangebarRef.value?.getBoundingClientRect().width || 0;
        const steps = (this.max - this.min) / this.step + 1;
        const decimals = this.step.toString().split(".")[1]?.length || 0;
        const pixels = width / (steps - 1);

        let value = this.min;
        this.stepsLeftsPx = [0];
        this.setpsValues = [value];
        for (let i = 1; i < steps; i++) {
            value += this.step;
            const leftPx = pixels * i;

            this.stepsLeftsPx.push(Number(leftPx.toFixed(decimals)));
            this.setpsValues.push(Number(value.toFixed(decimals)));
        }
    }

    #handleMove(ev: CustomEvent<{ diff: number; target: SliderHandle }>) {
        const rangebar = this.rangebarRef.value;
        if (!rangebar) return;

        const slider = ev.detail.target;
        const diff = ev.detail.diff;
        const sliderLeft = slider.left;
        const left = sliderLeft + diff;

        const closestPosition = this.stepsLeftsPx.reduce((prev, curr) => (Math.abs(curr - left) < Math.abs(prev - left) ? curr : prev));
        const index = this.stepsLeftsPx.indexOf(closestPosition);
        let value = String(this.setpsValues[index]);

        if (this.isRange) {
            if (slider === this.sliderOneRef.value) {
                const sliderTwo = this.sliderTwoRef.value;
                if (!sliderTwo) return;

                const sliderTwoLeft = sliderTwo.left;
                if (closestPosition >= sliderTwoLeft) {
                    return;
                }

                value = `${value}-${this.value.split("-")[1]}`;
            } else {
                const sliderOne = this.sliderOneRef.value;
                if (!sliderOne) return;

                const sliderOneLeft = sliderOne.left;
                if (closestPosition <= sliderOneLeft) {
                    return;
                }

                value = `${this.value.split("-")[0]}-${value}`;
            }
        }

        this.dispatchEvent(new CustomEvent("move", { detail: { value, target: this } }));
        this.setValue(value);
        this.#setProgress();
        slider.setLeftPosition(closestPosition);
    }

    #setSliderPosition(slider: SliderHandle, value: string) {
        const rangebar = this.rangebarRef.value;
        if (!rangebar) return;

        const index = this.setpsValues.indexOf(Number(value));
        const left = this.stepsLeftsPx[index];

        slider.setLeftPosition(left);
        slider.setLeft();
        this.#setProgress();
    }

    #setProgress() {
        const progressbar = this.progressbarRef.value;
        if (!progressbar) return;

        const indexOne = this.setpsValues.indexOf(Number(this.#getSliderValue("one")));
        const leftOne = this.stepsLeftsPx[indexOne];

        if (this.isRange) {
            const indexTwo = this.setpsValues.indexOf(Number(this.#getSliderValue("two")));
            const leftTwo = this.stepsLeftsPx[indexTwo];

            progressbar.style.left = `${leftOne}px`;
            progressbar.style.width = `${leftTwo - leftOne}px`;
        } else {
            progressbar.style.left = "0";
            progressbar.style.width = `${leftOne}px`;
        }
    }

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
            input-label {
                padding-top: 0.2em;
                flex-grow: 1;
                flex-basis: 0;
            }
            .value {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                font-size: var(--mjo-slider-value-font-size, var(--mjo-input-label-font-size, calc(1em * 0.8)));
            }
            .container {
                position: relative;
                width: 100%;
                height: 20px;
                display: flex;
                align-items: center;
            }
            .container[data-disabled],
            .value[data-disabled],
            input-label[data-disabled] {
                opacity: 0.5;
            }
            .rangebar {
                position: relative;
                width: 100%;
                height: 3px;
                background-color: var(--mjo-slider-background-color, var(--mjo-border-color-dark, #c7c7c7));
                border-radius: var(--mjo-slider-border-radius, var(--mjo-radius-medium, 5px));
            }
            .progress {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background-color: var(--mjo-slider-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff)));
                border-radius: inherit;
            }
            .progress[data-color="secondary"] {
                background-color: var(--mjo-slider-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #ff8800)));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-slider": MjoSlider;
    }
}
