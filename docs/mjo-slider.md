# mjo-slider

A customizable range slider component with support for single values and ranges, tooltips, and form integration.

## Overview

The `mjo-slider` component provides an interactive slider interface for selecting numeric values within a specified range. It supports both single-value selection and range selection, with customizable appearance, tooltips, and seamless form integration. The slider automatically snaps to steps and provides visual feedback during interaction.

## Basic Usage

### HTML

```html
<mjo-slider label="Volume" min="0" max="100" value="50"></mjo-slider> <mjo-slider label="Price Range" min="0" max="1000" value="200-800" isRange></mjo-slider>
```

### Lit Element Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-basic")
export class ExampleSliderBasic extends LitElement {
    @state()
    private volume = "50";

    @state()
    private brightness = "75";

    private handleVolumeChange(event: Event) {
        const slider = event.target as any;
        this.volume = slider.value;
        console.log("Volume changed:", this.volume);
    }

    private handleBrightnessChange(event: Event) {
        const slider = event.target as any;
        this.brightness = slider.value;
        console.log("Brightness changed:", this.brightness);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
                <h3>Basic Sliders</h3>

                <mjo-slider label="Volume" min="0" max="100" step="1" .value=${this.volume} valueSuffix="%" @change=${this.handleVolumeChange}> </mjo-slider>

                <mjo-slider
                    label="Brightness"
                    min="0"
                    max="100"
                    step="5"
                    .value=${this.brightness}
                    valueSuffix="%"
                    color="secondary"
                    @change=${this.handleBrightnessChange}
                >
                </mjo-slider>

                <div style="padding: 1rem; background: #f5f5f5; border-radius: 4px;">
                    <p><strong>Current Values:</strong></p>
                    <p>Volume: ${this.volume}%</p>
                    <p>Brightness: ${this.brightness}%</p>
                </div>
            </div>
        `;
    }
}
```

## Slider Variants and Sizes

Configure sliders with different sizes and styling options:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-variants")
export class ExampleSliderVariants extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem;">
                <!-- Size Variants -->
                <div>
                    <h4>Size Variants</h4>
                    <div style="display: flex; flex-direction: column; gap: 2rem;">
                        <mjo-slider label="Small Slider" size="small" min="0" max="100" value="25" valueSuffix="%"> </mjo-slider>

                        <mjo-slider label="Medium Slider" size="medium" min="0" max="100" value="50" valueSuffix="%"> </mjo-slider>

                        <mjo-slider label="Large Slider" size="large" min="0" max="100" value="75" valueSuffix="%"> </mjo-slider>
                    </div>
                </div>

                <!-- Color Variants -->
                <div>
                    <h4>Color Variants</h4>
                    <div style="display: flex; flex-direction: column; gap: 2rem;">
                        <mjo-slider label="Primary Color" color="primary" min="0" max="100" value="60"> </mjo-slider>

                        <mjo-slider label="Secondary Color" color="secondary" min="0" max="100" value="40"> </mjo-slider>
                    </div>
                </div>

                <!-- States -->
                <div>
                    <h4>Slider States</h4>
                    <div style="display: flex; flex-direction: column; gap: 2rem;">
                        <mjo-slider label="Normal Slider" min="0" max="100" value="30"> </mjo-slider>

                        <mjo-slider label="Disabled Slider" min="0" max="100" value="70" disabled> </mjo-slider>

                        <mjo-slider label="Hidden Value" min="0" max="100" value="85" hideValue> </mjo-slider>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Range Sliders

Create dual-handle sliders for selecting ranges:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-range")
export class ExampleSliderRange extends LitElement {
    @state()
    private priceRange = "200-800";

    @state()
    private temperatureRange = "18-25";

    @state()
    private ageRange = "25-45";

    private handlePriceChange(event: Event) {
        const slider = event.target as any;
        this.priceRange = slider.value;
    }

    private handleTemperatureChange(event: Event) {
        const slider = event.target as any;
        this.temperatureRange = slider.value;
    }

    private handleAgeChange(event: Event) {
        const slider = event.target as any;
        this.ageRange = slider.value;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem; width: 500px;">
                <h3>Range Sliders</h3>

                <!-- Price Range -->
                <mjo-slider
                    label="Price Range"
                    min="0"
                    max="1000"
                    step="10"
                    .value=${this.priceRange}
                    valuePrefix="$"
                    isRange
                    @change=${this.handlePriceChange}
                >
                </mjo-slider>

                <!-- Temperature Range -->
                <mjo-slider
                    label="Temperature Range"
                    min="0"
                    max="40"
                    step="1"
                    .value=${this.temperatureRange}
                    valueSuffix="°C"
                    color="secondary"
                    isRange
                    @change=${this.handleTemperatureChange}
                >
                </mjo-slider>

                <!-- Age Range -->
                <mjo-slider
                    label="Age Range"
                    min="18"
                    max="65"
                    step="1"
                    .value=${this.ageRange}
                    valueSuffix=" years"
                    isRange
                    size="large"
                    @change=${this.handleAgeChange}
                >
                </mjo-slider>

                <!-- Current Values Display -->
                <div style="padding: 1.5rem; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                    <h4 style="margin: 0 0 1rem 0;">Selected Ranges:</h4>
                    <div style="display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1rem;">
                        <strong>Price:</strong> <span>$${this.priceRange.replace("-", " - $")}</span> <strong>Temperature:</strong>
                        <span>${this.temperatureRange.replace("-", "°C - ")}°C</span> <strong>Age:</strong>
                        <span>${this.ageRange.replace("-", " - ")} years</span>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Sliders with Tooltips

Enable tooltips to show values during interaction:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-tooltips")
export class ExampleSliderTooltips extends LitElement {
    @state()
    private quality = "75";

    @state()
    private budget = "500-1500";

    @state()
    private performance = "80";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 3rem; width: 450px;">
                <h3>Sliders with Tooltips</h3>
                <p style="margin: 0; color: #666;">Drag the handles to see tooltips with current values</p>

                <!-- Single Value with Tooltip -->
                <mjo-slider
                    label="Quality Setting"
                    min="0"
                    max="100"
                    step="5"
                    .value=${this.quality}
                    valueSuffix="%"
                    tooltip
                    @change=${(e: any) => (this.quality = e.target.value)}
                >
                </mjo-slider>

                <!-- Range with Tooltip -->
                <mjo-slider
                    label="Budget Range"
                    min="100"
                    max="2000"
                    step="50"
                    .value=${this.budget}
                    valuePrefix="$"
                    isRange
                    tooltip
                    color="secondary"
                    @change=${(e: any) => (this.budget = e.target.value)}
                >
                </mjo-slider>

                <!-- Performance Slider -->
                <mjo-slider
                    label="Performance Level"
                    min="0"
                    max="100"
                    step="1"
                    .value=${this.performance}
                    valueSuffix="%"
                    tooltip
                    size="large"
                    @change=${(e: any) => (this.performance = e.target.value)}
                >
                </mjo-slider>

                <!-- Instructions -->
                <div style="padding: 1rem; background: #fffbeb; border: 1px solid #fbbf24; border-radius: 6px;">
                    <p style="margin: 0; color: #92400e; font-size: 0.9rem;">
                        <strong>💡 Tip:</strong> Click and drag the slider handles to see live tooltips showing the current values.
                    </p>
                </div>
            </div>
        `;
    }
}
```

## Custom Step Values and Precision

Configure sliders with different step intervals and decimal precision:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-steps")
export class ExampleSliderSteps extends LitElement {
    @state()
    private rating = "4.5";

    @state()
    private discount = "15";

    @state()
    private precision = "0.125";

    @state()
    private volume = "50";

    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
                <!-- Decimal Steps -->
                <div>
                    <h4>Decimal Precision</h4>
                    <div style="display: flex; flex-direction: column; gap: 2rem;">
                        <mjo-slider
                            label="Rating"
                            min="0"
                            max="5"
                            step="0.5"
                            .value=${this.rating}
                            valueSuffix=" stars"
                            @change=${(e: any) => (this.rating = e.target.value)}
                        >
                        </mjo-slider>

                        <mjo-slider
                            label="Precision Value"
                            min="0"
                            max="1"
                            step="0.125"
                            .value=${this.precision}
                            @change=${(e: any) => (this.precision = e.target.value)}
                        >
                        </mjo-slider>
                    </div>
                </div>

                <!-- Custom Intervals -->
                <div>
                    <h4>Custom Intervals</h4>
                    <div style="display: flex; flex-direction: column; gap: 2rem;">
                        <mjo-slider
                            label="Discount"
                            min="0"
                            max="100"
                            step="5"
                            .value=${this.discount}
                            valueSuffix="% off"
                            color="secondary"
                            @change=${(e: any) => (this.discount = e.target.value)}
                        >
                        </mjo-slider>

                        <mjo-slider
                            label="Volume (10s)"
                            min="0"
                            max="100"
                            step="10"
                            .value=${this.volume}
                            @change=${(e: any) => (this.volume = e.target.value)}
                        >
                        </mjo-slider>
                    </div>
                </div>
            </div>

            <!-- Current Values -->
            <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 6px;">
                <h4 style="margin: 0 0 0.5rem 0;">Current Values:</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem;">
                    <span>Rating: <strong>${this.rating} stars</strong></span>
                    <span>Discount: <strong>${this.discount}% off</strong></span>
                    <span>Precision: <strong>${this.precision}</strong></span>
                    <span>Volume: <strong>${this.volume}</strong></span>
                </div>
            </div>
        `;
    }
}
```

## Form Integration

Use sliders within forms with validation:

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoForm } from "mjo-litui/types";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-slider";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-slider-form")
export class ExampleSliderForm extends LitElement {
    @query("mjo-form")
    private form!: MjoForm;

    @state()
    private formData = {
        name: "",
        experience: "5",
        budget: "500-2000",
        quality: "75",
        priority: "50",
        satisfaction: "80",
    };

    @state()
    private isSubmitting = false;

    private async handleSubmit() {
        if (!this.form.validate()) {
            console.log("Form validation failed");
            return;
        }

        this.isSubmitting = true;

        try {
            // Get form data
            const data = this.form.getFormData();
            console.log("Form submitted with data:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Project preferences saved successfully!");
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to save preferences");
        } finally {
            this.isSubmitting = false;
        }
    }

    private handleFormChange(event: Event) {
        const target = event.target as any;
        if (target.name) {
            this.formData = {
                ...this.formData,
                [target.name]: target.value,
            };
        }
    }

    render() {
        return html`
            <mjo-form @change=${this.handleFormChange}>
                <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
                    <h3>Project Configuration</h3>

                    <!-- Basic Information -->
                    <mjo-textfield label="Project Name" name="name" required rules="required|min:3" placeholder="Enter project name"> </mjo-textfield>

                    <!-- Experience Level -->
                    <mjo-slider
                        label="Years of Experience"
                        name="experience"
                        min="0"
                        max="20"
                        step="1"
                        .value=${this.formData.experience}
                        valueSuffix=" years"
                        tooltip
                    >
                    </mjo-slider>

                    <!-- Budget Range -->
                    <mjo-slider
                        label="Budget Range"
                        name="budget"
                        min="100"
                        max="5000"
                        step="100"
                        .value=${this.formData.budget}
                        valuePrefix="$"
                        isRange
                        tooltip
                        color="secondary"
                    >
                    </mjo-slider>

                    <!-- Quality Requirements -->
                    <mjo-slider label="Quality Requirements" name="quality" min="0" max="100" step="5" .value=${this.formData.quality} valueSuffix="%" tooltip>
                    </mjo-slider>

                    <!-- Priority Level -->
                    <mjo-slider
                        label="Priority Level"
                        name="priority"
                        min="0"
                        max="100"
                        step="10"
                        .value=${this.formData.priority}
                        valueSuffix="%"
                        size="large"
                    >
                    </mjo-slider>

                    <!-- Expected Satisfaction -->
                    <mjo-slider
                        label="Expected Satisfaction"
                        name="satisfaction"
                        min="0"
                        max="100"
                        step="1"
                        .value=${this.formData.satisfaction}
                        valueSuffix="%"
                        color="secondary"
                        tooltip
                    >
                    </mjo-slider>

                    <!-- Form Actions -->
                    <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">
                        <mjo-button type="button" variant="ghost" @click=${() => this.form.reset()}> Reset Form </mjo-button>

                        <mjo-button @click=${this.handleSubmit} .loading=${this.isSubmitting}>
                            ${this.isSubmitting ? "Saving..." : "Save Configuration"}
                        </mjo-button>
                    </div>

                    <!-- Current Form Data Display -->
                    <details style="margin-top: 1rem;">
                        <summary>View Current Form Data</summary>
                        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 0.85rem;">
${JSON.stringify(this.formData, null, 2)}
            </pre>
                    </details>
                </div>
            </mjo-form>
        `;
    }
}
```

## Dynamic Slider Configuration

Create sliders with dynamic ranges and interactive controls:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";

@customElement("example-slider-dynamic")
export class ExampleSliderDynamic extends LitElement {
    @state()
    private minValue = 0;

    @state()
    private maxValue = 100;

    @state()
    private stepValue = 1;

    @state()
    private currentValue = "50";

    @state()
    private rangeValue = "25-75";

    @state()
    private enableTooltips = false;

    @state()
    private sliderSize: "small" | "medium" | "large" = "medium";

    @state()
    private sliderColor: "primary" | "secondary" = "primary";

    private updateRange() {
        // Ensure current value is within new range
        const current = parseInt(this.currentValue);
        if (current < this.minValue) {
            this.currentValue = this.minValue.toString();
        } else if (current > this.maxValue) {
            this.currentValue = this.maxValue.toString();
        }

        // Adjust range value
        const [rangeMin, rangeMax] = this.rangeValue.split("-").map(Number);
        const newRangeMin = Math.max(rangeMin, this.minValue);
        const newRangeMax = Math.min(rangeMax, this.maxValue);
        this.rangeValue = `${newRangeMin}-${newRangeMax}`;
    }

    private resetDefaults() {
        this.minValue = 0;
        this.maxValue = 100;
        this.stepValue = 1;
        this.currentValue = "50";
        this.rangeValue = "25-75";
        this.enableTooltips = false;
        this.sliderSize = "medium";
        this.sliderColor = "primary";
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 300px 1fr; gap: 2rem; max-width: 900px;">
                <!-- Controls Panel -->
                <div style="padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa;">
                    <h4 style="margin: 0 0 1rem 0;">Slider Configuration</h4>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <!-- Range Settings -->
                        <mjo-textfield
                            label="Min Value"
                            type="number"
                            .value=${this.minValue.toString()}
                            @input=${(e: any) => {
                                this.minValue = parseInt(e.target.value) || 0;
                                this.updateRange();
                            }}
                        >
                        </mjo-textfield>

                        <mjo-textfield
                            label="Max Value"
                            type="number"
                            .value=${this.maxValue.toString()}
                            @input=${(e: any) => {
                                this.maxValue = parseInt(e.target.value) || 100;
                                this.updateRange();
                            }}
                        >
                        </mjo-textfield>

                        <mjo-textfield
                            label="Step Value"
                            type="number"
                            .value=${this.stepValue.toString()}
                            @input=${(e: any) => (this.stepValue = parseFloat(e.target.value) || 1)}
                        >
                        </mjo-textfield>

                        <!-- Appearance Settings -->
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Size:</label>
                            <select
                                .value=${this.sliderSize}
                                @change=${(e: any) => (this.sliderSize = e.target.value)}
                                style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Color:</label>
                            <select
                                .value=${this.sliderColor}
                                @change=${(e: any) => (this.sliderColor = e.target.value)}
                                style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
                            >
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                            <input type="checkbox" .checked=${this.enableTooltips} @change=${(e: any) => (this.enableTooltips = e.target.checked)} />
                            Enable Tooltips
                        </label>

                        <mjo-button @click=${this.resetDefaults} variant="ghost" fullwidth> Reset to Defaults </mjo-button>
                    </div>
                </div>

                <!-- Sliders Preview -->
                <div style="padding: 1.5rem;">
                    <h4 style="margin: 0 0 2rem 0;">Live Preview</h4>

                    <div style="display: flex; flex-direction: column; gap: 3rem;">
                        <!-- Single Value Slider -->
                        <mjo-slider
                            label="Single Value Slider"
                            .min=${this.minValue}
                            .max=${this.maxValue}
                            .step=${this.stepValue}
                            .value=${this.currentValue}
                            .size=${this.sliderSize}
                            .color=${this.sliderColor}
                            .tooltip=${this.enableTooltips}
                            @change=${(e: any) => (this.currentValue = e.target.value)}
                        >
                        </mjo-slider>

                        <!-- Range Slider -->
                        <mjo-slider
                            label="Range Slider"
                            .min=${this.minValue}
                            .max=${this.maxValue}
                            .step=${this.stepValue}
                            .value=${this.rangeValue}
                            .size=${this.sliderSize}
                            .color=${this.sliderColor}
                            .tooltip=${this.enableTooltips}
                            isRange
                            @change=${(e: any) => (this.rangeValue = e.target.value)}
                        >
                        </mjo-slider>
                    </div>

                    <!-- Current Values Display -->
                    <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 6px;">
                        <h5 style="margin: 0 0 0.5rem 0;">Current Configuration:</h5>
                        <div style="font-size: 0.9rem; line-height: 1.6;">
                            <div><strong>Range:</strong> ${this.minValue} - ${this.maxValue} (step: ${this.stepValue})</div>
                            <div><strong>Single Value:</strong> ${this.currentValue}</div>
                            <div><strong>Range Value:</strong> ${this.rangeValue}</div>
                            <div><strong>Appearance:</strong> ${this.sliderSize} size, ${this.sliderColor} color</div>
                            <div><strong>Tooltips:</strong> ${this.enableTooltips ? "Enabled" : "Disabled"}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-slider";

@customElement("example-slider-theming")
export class ExampleSliderTheming extends LitElement {
    render() {
        return html`
            <mjo-theme
                .theme=${{
                    slider: {
                        backgroundColor: "#f1f5f9",
                        radius: "8px",
                        primaryColor: "#059669",
                        secondaryColor: "#dc2626",
                        primaryForegroundColor: "#ffffff",
                        secondaryForegroundColor: "#ffffff",
                        labelColor: "#374151",
                        labelFontSize: "1rem",
                        labelFontWeight: "600",
                    },
                }}
            >
                <div style="display: flex; flex-direction: column; gap: 3rem; padding: 2rem; width: 500px;">
                    <h3>Custom Themed Sliders</h3>

                    <mjo-slider label="Primary Themed Slider" min="0" max="100" value="65" valueSuffix="%" tooltip> </mjo-slider>

                    <mjo-slider label="Secondary Themed Slider" min="0" max="100" value="40" valueSuffix="%" color="secondary" tooltip> </mjo-slider>

                    <mjo-slider label="Range Slider with Theme" min="100" max="1000" value="300-700" valuePrefix="$" isRange tooltip size="large"> </mjo-slider>
                </div>
            </mjo-theme>
        `;
    }
}
```

### Using ThemeMixin

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ThemeMixin } from "mjo-litui/mixins";
import "mjo-litui/mjo-slider";

@customElement("example-slider-theme-mixin")
export class ExampleSliderThemeMixin extends ThemeMixin(LitElement) {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; width: 450px;">
                <h3>Component-Level Slider Theming</h3>

                <mjo-slider
                    label="Custom Orange Theme"
                    min="0"
                    max="100"
                    value="55"
                    valueSuffix="%"
                    .theme=${{
                        backgroundColor: "#fed7aa",
                        primaryColor: "#ea580c",
                        primaryForegroundColor: "#ffffff",
                        labelColor: "#9a3412",
                        labelFontWeight: "600",
                    }}
                    tooltip
                >
                </mjo-slider>

                <mjo-slider
                    label="Custom Purple Theme"
                    min="0"
                    max="200"
                    value="80-150"
                    isRange
                    color="secondary"
                    .theme=${{
                        backgroundColor: "#e9d5ff",
                        secondaryColor: "#7c3aed",
                        secondaryForegroundColor: "#ffffff",
                        labelColor: "#5b21b6",
                        radius: "12px",
                    }}
                    tooltip
                >
                </mjo-slider>

                <mjo-slider
                    label="Minimal Theme"
                    min="0"
                    max="10"
                    step="0.5"
                    value="7.5"
                    .theme=${{
                        backgroundColor: "#f8fafc",
                        primaryColor: "#64748b",
                        labelColor: "#475569",
                        labelFontSize: "0.875rem",
                    }}
                >
                </mjo-slider>
            </div>
        `;
    }
}
```

## Properties

| Name          | Type                             | Default       | Description                                     |
| ------------- | -------------------------------- | ------------- | ----------------------------------------------- |
| `hideValue`   | `boolean`                        | `false`       | Hide the value display next to the label        |
| `isRange`     | `boolean`                        | `false`       | Enable range selection with two handles         |
| `tooltip`     | `boolean`                        | `false`       | Show tooltips when dragging handles             |
| `disabled`    | `boolean`                        | `false`       | Disable the slider interaction                  |
| `max`         | `number`                         | `1`           | Maximum value of the slider                     |
| `min`         | `number`                         | `0`           | Minimum value of the slider                     |
| `step`        | `number`                         | `0.01`        | Step increment for value changes                |
| `color`       | `"primary" \| "secondary"`       | `"primary"`   | Color scheme for the slider                     |
| `label`       | `string`                         | -             | Label text displayed above the slider           |
| `name`        | `string`                         | -             | Form field name for form submission             |
| `size`        | `"small" \| "medium" \| "large"` | `"medium"`    | Size variant of the slider                      |
| `value`       | `string`                         | `"undefined"` | Current value (single) or range (e.g., "10-90") |
| `valuePrefix` | `string`                         | `""`          | Text prefix for displayed values                |
| `valueSuffix` | `string`                         | `""`          | Text suffix for displayed values                |
| `theme`       | `MjoSliderTheme`                 | `{}`          | Theme configuration for the slider              |

## Methods

| Method                    | Description                               |
| ------------------------- | ----------------------------------------- |
| `getValue()`              | Returns the current slider value(s)       |
| `setValue(value: string)` | Sets the slider value(s) programmatically |

## Events

| Event    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| `change` | Fired when the slider value changes and handle is released       |
| `move`   | Fired during slider handle movement (provides real-time updates) |

## CSS Custom Properties

| Property                                  | Default                                                 | Description                              |
| ----------------------------------------- | ------------------------------------------------------- | ---------------------------------------- |
| `--mjo-slider-background-color`           | `var(--mjo-border-color-dark, #c7c7c7)`                 | Background color of the slider track     |
| `--mjo-slider-border-radius`              | `var(--mjo-radius-medium, 5px)`                         | Border radius of the slider track        |
| `--mjo-slider-primary-color`              | `var(--mjo-primary-color, #007bff)`                     | Primary color for progress and handles   |
| `--mjo-slider-secondary-color`            | `var(--mjo-secondary-color, #ff8800)`                   | Secondary color for progress and handles |
| `--mjo-slider-primary-foreground-color`   | `var(--mjo-primary-foreground-color, #333333)`          | Text color for primary tooltips          |
| `--mjo-slider-secondary-foreground-color` | `var(--mjo-secondary-foreground-color, #333333)`        | Text color for secondary tooltips        |
| `--mjo-slider-value-font-size`            | `var(--mjo-input-label-font-size, calc(1em * 0.8))`     | Font size for value display              |
| `--mjo-slider-tooltip-radius`             | `var(--mjo-radius-small, 5px)`                          | Border radius for tooltips               |
| `--mjo-slider-tooltip-box-shadow`         | `var(--mjo-box-shadow, 0px 0px 3px rgba(0, 0, 0, 0.5))` | Box shadow for tooltips                  |

## Theme Interface

```ts
interface MjoSliderTheme {
    backgroundColor?: string;
    radius?: string;
    progressColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    primaryForegroundColor?: string;
    secondaryForegroundColor?: string;
}
```

## Technical Notes

-   **Range Values**: For range sliders, values are formatted as "min-max" (e.g., "10-90")
-   **Step Calculation**: The slider automatically calculates step positions and snaps to the nearest valid value
-   **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
-   **Touch Support**: Full touch and mouse support with proper event handling
-   **Performance**: Uses efficient calculation methods for smooth dragging and positioning
-   **Value Validation**: Automatically validates and constrains values within min/max bounds

## Accessibility

-   Full keyboard navigation support (Tab, Arrow keys, Home, End, Page Up/Down)
-   Proper ARIA attributes for screen readers
-   Visual focus indicators and high contrast support
-   Support for assistive technologies
-   Semantic HTML structure with proper labeling

## Best Practices

-   Always provide meaningful labels for accessibility
-   Use appropriate step values that make sense for your use case
-   Consider the range size when setting min/max values
-   Use tooltips for sliders where precise values matter
-   Provide value prefixes/suffixes to give context (%, $, etc.)
-   Test with both mouse and touch interactions
-   Consider disabled state styling for better UX
-   Use consistent color schemes across related sliders

For additional theming options, see the [Theming Guide](./theming.md).
