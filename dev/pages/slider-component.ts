import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-slider.js";
import "../../src/mjo-textfield.js";

import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("slider-component")
export class SliderComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private isRange = false;
    @state() private isDisabled = false;
    @state() private hasTooltip = false;
    @state() private hideValue = false;
    @state() private hasLabel = true;
    @state() private hasError = false;
    @state() private currentValue = "0.5";
    @state() private rangeValue = "0.2-0.8";
    @state() private minValue = 0;
    @state() private maxValue = 1;
    @state() private stepValue = 0.01;
    @state() private valuePrefix = "";
    @state() private valueSuffix = "";
    @state() private customLabel = "Slider Label";
    @state() private customAriaLabel = "";

    render() {
        return html`
            <h1>Slider Component Examples</h1>

            <section-container label="Interactive Slider Playground">
                <playground-grid>
                    <mjo-slider
                        slot="demo"
                        id="playground-slider"
                        .value=${this.isRange ? this.rangeValue : this.currentValue}
                        .min=${this.minValue}
                        .max=${this.maxValue}
                        .step=${this.stepValue}
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        .label=${this.hasLabel ? this.customLabel : undefined}
                        .valuePrefix=${this.valuePrefix}
                        .valueSuffix=${this.valueSuffix}
                        .aria-label=${this.customAriaLabel || undefined}
                        ?isRange=${this.isRange}
                        ?disabled=${this.isDisabled}
                        ?tooltip=${this.hasTooltip}
                        ?hideValue=${this.hideValue}
                        ?error=${this.hasError}
                        @mjo-slider:change=${this.#handleSliderChange}
                        @mjo-slider:input=${this.#handleSliderInput}
                        @mjo-slider:focus=${this.#handleSliderFocus}
                        @mjo-slider:blur=${this.#handleSliderBlur}
                        @mjo-slider:valuechange=${this.#handleValueChange}
                    ></mjo-slider>

                    <control-group slot="controls" label="Color" columns="2">
                        <mjo-button
                            size="small"
                            color="primary"
                            variant=${this.selectedColor === "primary" ? "default" : "ghost"}
                            @click=${() => this.setColor("primary")}
                        >
                            Primary
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="secondary"
                            variant=${this.selectedColor === "secondary" ? "default" : "ghost"}
                            @click=${() => this.setColor("secondary")}
                        >
                            Secondary
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Size" columns="3">
                        <mjo-button size="small" variant=${this.selectedSize === "small" ? "default" : "ghost"} @click=${() => this.setSize("small")}>
                            Small
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "medium" ? "default" : "ghost"} @click=${() => this.setSize("medium")}>
                            Medium
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "large" ? "default" : "ghost"} @click=${() => this.setSize("large")}>
                            Large
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Type" columns="2">
                        <mjo-button size="small" variant=${!this.isRange ? "default" : "ghost"} @click=${() => this.setRange(false)}> Single </mjo-button>
                        <mjo-button size="small" variant=${this.isRange ? "default" : "ghost"} @click=${() => this.setRange(true)}> Range </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="States" columns="2">
                        <mjo-button size="small" variant=${this.isDisabled ? "default" : "ghost"} @click=${() => this.toggleDisabled()}> Disabled </mjo-button>
                        <mjo-button size="small" variant=${this.hasTooltip ? "default" : "ghost"} @click=${() => this.toggleTooltip()}> Tooltip </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Display Options" columns="2">
                        <mjo-button size="small" variant=${this.hideValue ? "default" : "ghost"} @click=${() => this.toggleHideValue()}>
                            Hide Value
                        </mjo-button>
                        <mjo-button size="small" variant=${this.hasLabel ? "default" : "ghost"} @click=${() => this.toggleLabel()}> Show Label </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Error State" columns="1">
                        <mjo-button size="small" color="error" variant=${this.hasError ? "default" : "ghost"} @click=${() => this.toggleError()}>
                            Toggle Error
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Range Settings" columns="1">
                        <mjo-textfield
                            label="Min Value"
                            .value=${String(this.minValue)}
                            type="number"
                            @input=${this.#handleMinChange}
                            size="small"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Max Value"
                            .value=${String(this.maxValue)}
                            type="number"
                            @input=${this.#handleMaxChange}
                            size="small"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Step"
                            .value=${String(this.stepValue)}
                            type="number"
                            step="0.001"
                            @input=${this.#handleStepChange}
                            size="small"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Value Formatting" columns="1">
                        <mjo-textfield
                            label="Value Prefix"
                            .value=${this.valuePrefix}
                            @input=${this.#handlePrefixChange}
                            size="small"
                            placeholder="e.g. $, #"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Value Suffix"
                            .value=${this.valueSuffix}
                            @input=${this.#handleSuffixChange}
                            size="small"
                            placeholder="e.g. %, px, deg"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Labels & Accessibility" columns="1">
                        <mjo-textfield label="Custom Label" .value=${this.customLabel} @input=${this.#handleLabelChange} size="small"></mjo-textfield>
                        <mjo-textfield
                            label="Aria Label"
                            .value=${this.customAriaLabel}
                            @input=${this.#handleAriaLabelChange}
                            size="small"
                            placeholder="Custom accessibility label"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.resetSlider}> Reset Values </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.setRandomValue}> Random Value </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="value-display">
                    <h4>Current Values:</h4>
                    <div class="values">
                        <span><strong>Current Value:</strong> ${this.isRange ? this.rangeValue : this.currentValue}</span>
                        <span><strong>Range:</strong> ${this.minValue} - ${this.maxValue}</span>
                        <span><strong>Step:</strong> ${this.stepValue}</span>
                        <span><strong>Formatted:</strong> ${this.valuePrefix}${this.isRange ? this.rangeValue : this.currentValue}${this.valueSuffix}</span>
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Simple slider implementations for common use cases.">
                <showcases-grid columns="2">
                    <mjo-slider
                        id="volume"
                        label="Volume Control"
                        value="0.7"
                        min="0"
                        max="1"
                        step="0.05"
                        valuePrefix=""
                        valueSuffix="%"
                        color="primary"
                        size="medium"
                        tooltip
                    ></mjo-slider>

                    <mjo-slider
                        label="Temperature"
                        value="22"
                        min="16"
                        max="30"
                        step="0.5"
                        valueSuffix="°C"
                        color="secondary"
                        size="medium"
                        tooltip
                    ></mjo-slider>
                </showcases-grid>
            </section-container>

            <section-container label="Range Sliders" description="Dual-handle sliders for selecting value ranges.">
                <showcases-grid columns="2">
                    <mjo-slider
                        label="Price Range"
                        value="100-500"
                        min="0"
                        max="1000"
                        step="10"
                        valuePrefix="$"
                        color="primary"
                        size="medium"
                        isRange
                        tooltip
                    ></mjo-slider>

                    <mjo-slider
                        label="Age Range"
                        value="25-65"
                        min="18"
                        max="100"
                        step="1"
                        valueSuffix=" years"
                        color="secondary"
                        size="medium"
                        isRange
                        tooltip
                    ></mjo-slider>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-slider label="Small Slider" value="0.3" size="small" color="primary" tooltip></mjo-slider>

                    <mjo-slider label="Medium Slider" value="0.5" size="medium" color="primary" tooltip></mjo-slider>

                    <mjo-slider label="Large Slider" value="0.7" size="large" color="primary" tooltip></mjo-slider>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="2">
                    <mjo-slider label="Primary Color" value="0.6" color="primary" size="medium" tooltip></mjo-slider>

                    <mjo-slider label="Secondary Color" value="0.4" color="secondary" size="medium" tooltip></mjo-slider>
                </showcases-grid>
            </section-container>

            <section-container label="Special Cases" description="Sliders with different step values and formatting.">
                <showcases-grid columns="2">
                    <mjo-slider label="Percentage" value="75" min="0" max="100" step="5" valueSuffix="%" color="primary" size="medium" tooltip></mjo-slider>

                    <mjo-slider label="Angle" value="180" min="0" max="360" step="15" valueSuffix="°" color="secondary" size="medium" tooltip></mjo-slider>
                </showcases-grid>

                <showcases-grid columns="2">
                    <mjo-slider
                        label="Currency Range"
                        value="25-75"
                        min="0"
                        max="100"
                        step="5"
                        valuePrefix="$"
                        color="primary"
                        size="medium"
                        isRange
                        tooltip
                    ></mjo-slider>

                    <mjo-slider
                        label="Time Range"
                        value="9-17"
                        min="0"
                        max="24"
                        step="1"
                        valueSuffix="h"
                        color="secondary"
                        size="medium"
                        isRange
                        tooltip
                    ></mjo-slider>
                </showcases-grid>
            </section-container>

            <section-container label="States & Options" description="Various slider states and configuration options.">
                <showcases-grid columns="2">
                    <mjo-slider label="Disabled Slider" value="0.5" color="primary" size="medium" disabled></mjo-slider>

                    <mjo-slider label="Hidden Value" value="0.3" color="secondary" size="medium" hideValue tooltip></mjo-slider>
                </showcases-grid>

                <showcases-grid columns="2">
                    <mjo-slider value="0.7" color="primary" size="medium" tooltip aria-label="Slider without visible label"></mjo-slider>

                    <mjo-slider label="Error State" value="0.2" color="primary" size="medium" error tooltip></mjo-slider>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <mjo-grid columns="2" gap="20px">
                        <mjo-slider
                            label="Budget Range"
                            name="budget"
                            value="500-2000"
                            min="0"
                            max="5000"
                            step="100"
                            valuePrefix="$"
                            color="primary"
                            size="medium"
                            isRange
                            tooltip
                        ></mjo-slider>

                        <mjo-slider
                            label="Priority Level"
                            name="priority"
                            value="7"
                            min="1"
                            max="10"
                            step="1"
                            color="secondary"
                            size="medium"
                            tooltip
                        ></mjo-slider>
                    </mjo-grid>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <mjo-slider
                        id="event-slider"
                        label="Event Tracking Slider"
                        value="0.5"
                        color="primary"
                        size="medium"
                        tooltip
                        @mjo-slider:change=${this.#logEvent}
                        @mjo-slider:input=${this.#logEvent}
                        @mjo-slider:focus=${this.#logEvent}
                        @mjo-slider:blur=${this.#logEvent}
                    ></mjo-slider>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Events will appear here...</div>
                    </div>
                </div>
            </section-container>
        `;
    }

    private setColor(color: "primary" | "secondary") {
        this.selectedColor = color;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private setRange(isRange: boolean) {
        this.isRange = isRange;
        // Reset values when switching between single and range
        if (isRange) {
            this.rangeValue = `${this.minValue + (this.maxValue - this.minValue) * 0.2}-${this.minValue + (this.maxValue - this.minValue) * 0.8}`;
        } else {
            this.currentValue = String(this.minValue + (this.maxValue - this.minValue) * 0.5);
        }
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleTooltip() {
        this.hasTooltip = !this.hasTooltip;
    }

    private toggleHideValue() {
        this.hideValue = !this.hideValue;
    }

    private toggleLabel() {
        this.hasLabel = !this.hasLabel;
    }

    private toggleError() {
        this.hasError = !this.hasError;
    }

    private resetSlider() {
        this.currentValue = "0.5";
        this.rangeValue = "0.2-0.8";
        this.minValue = 0;
        this.maxValue = 1;
        this.stepValue = 0.01;
        this.valuePrefix = "";
        this.valueSuffix = "";
        this.customLabel = "Slider Label";
        this.customAriaLabel = "";
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.isRange = false;
        this.isDisabled = false;
        this.hasTooltip = false;
        this.hideValue = false;
        this.hasLabel = true;
        this.hasError = false;
    }

    private setRandomValue() {
        if (this.isRange) {
            const min = this.minValue + Math.random() * (this.maxValue - this.minValue) * 0.5;
            const max = min + Math.random() * (this.maxValue - min);
            this.rangeValue = `${min.toFixed(2)}-${max.toFixed(2)}`;
        } else {
            this.currentValue = (this.minValue + Math.random() * (this.maxValue - this.minValue)).toFixed(2);
        }
    }

    #handleSliderChange = (event: CustomEvent) => {
        const { value, isRange } = event.detail;
        if (isRange) {
            this.rangeValue = value;
        } else {
            this.currentValue = value;
        }
        console.log("Slider change:", event.detail);
    };

    #handleSliderInput = (event: CustomEvent) => {
        const { value, isRange } = event.detail;
        if (isRange) {
            this.rangeValue = value;
        } else {
            this.currentValue = value;
        }
    };

    #handleSliderFocus = (event: CustomEvent) => {
        console.log("Slider focus:", event.detail);
    };

    #handleSliderBlur = (event: CustomEvent) => {
        console.log("Slider blur:", event.detail);
    };

    #handleValueChange = (event: CustomEvent) => {
        console.log("Value change:", event.detail);
    };

    #handleMinChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.minValue = Number(target.value);
    };

    #handleMaxChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.maxValue = Number(target.value);
    };

    #handleStepChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.stepValue = Number(target.value);
    };

    #handlePrefixChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.valuePrefix = target.value;
    };

    #handleSuffixChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.valueSuffix = target.value;
    };

    #handleLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customLabel = target.value;
    };

    #handleAriaLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.customAriaLabel = target.value;
    };

    #logEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();
            console.log(event.detail);

            // Create a safe copy of event.detail without circular references
            const safeDetail = {
                value: event.detail.value,
                name: event.detail.name,
                isRange: event.detail.isRange,
                handle: event.detail.handle,
                previousValue: event.detail.previousValue,
                programmatic: event.detail.programmatic,
                // Avoid including the element reference to prevent circular structure
                elementId: event.detail.element?.id || "unknown",
            };

            const eventInfo = `[${time}] ${event.type}: ${JSON.stringify(safeDetail)}\n`;
            output.textContent = eventInfo + (output.textContent || "").split("\n").slice(0, 9).join("\n");
        }
    };

    static styles = [
        css`
            :host {
                display: block;
                padding: 30px;
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                gap: 40px;
            }

            h1 {
                font-size: 2em;
                margin: 0;
                color: var(--mjo-foreground-color, #333);
            }

            .value-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .value-display h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .values {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .values span {
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .values strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
            }

            .form-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
                flex-wrap: wrap;
            }

            .event-demo {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .event-log h5 {
                margin: 0 0 8px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1em;
            }

            .log-output {
                background: var(--mjo-background-color-high, #f5f5f5);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 4px;
                padding: 12px;
                font-family: "Courier New", Courier, monospace;
                font-size: 0.85rem;
                color: var(--mjo-foreground-color, #333);
                white-space: pre-wrap;
                max-height: 200px;
                overflow-y: auto;
                min-height: 50px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .event-demo {
                    gap: 16px;
                }

                .form-actions {
                    flex-direction: column;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "slider-component": SliderComponent;
    }
}
