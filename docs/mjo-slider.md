# mjo-slider

A customizable range slider component with full accessibility support, keyboard navigation, and support for single values and ranges.

## Overview

The `mjo-slider` component provides an interactive slider interface for selecting numeric values within a specified range. It supports both single-value selection and range selection, with comprehensive accessibility features including ARIA attributes, keyboard navigation, screen reader support, and customizable appearance with seamless form integration.

## Accessibility Features

-   **Full ARIA support**: Complete implementation of ARIA slider pattern with proper roles and attributes
-   **Keyboard navigation**: Arrow keys, Home/End, Page Up/Down for value adjustment
-   **Screen reader support**: Live announcements of value changes and proper labeling
-   **Focus management**: Visual focus indicators and proper tab order
-   **High contrast mode**: Enhanced visibility in high contrast environments
-   **Touch accessibility**: Improved touch targets for mobile devices

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

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem; width: 400px;">
                <h3>Basic Sliders</h3>

                <mjo-slider label="Volume" min="0" max="100" step="1" .value=${this.volume} valueSuffix="%" @mjo-slider:change=${this.handleVolumeChange}>
                </mjo-slider>

                <mjo-slider
                    label="Brightness"
                    min="0"
                    max="100"
                    step="5"
                    .value=${this.brightness}
                    valueSuffix="%"
                    color="secondary"
                    @mjo-slider:change=${(e: any) => (this.brightness = e.detail.value)}
                >
                </mjo-slider>
            </div>
        `;
    }
}
```

## Accessibility and Keyboard Navigation

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-accessibility")
export class ExampleSliderAccessibility extends LitElement {
    @state()
    private settings = {
        contrast: "75",
        fontSize: "16",
        animationSpeed: "0.5",
    };

    render() {
        return html`
            <div style="max-width: 500px;">
                <h3>Accessible Settings Panel</h3>
                <p>Navigate with Tab key, adjust values with Arrow keys, Home/End for min/max, Page Up/Down for large steps.</p>

                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <!-- Slider with custom aria-valuetext formatting -->
                    <mjo-slider
                        label="Display Contrast"
                        min="0"
                        max="100"
                        step="5"
                        .value=${this.settings.contrast}
                        valueSuffix="%"
                        aria-describedby="contrast-help"
                        .formatValueText=${(value: string) => `${value} percent contrast`}
                        @mjo-slider:change=${(e: any) => (this.settings.contrast = e.detail.value)}
                    >
                    </mjo-slider>
                    <div id="contrast-help" style="font-size: 0.8em; color: #666;">Adjust screen contrast for better visibility</div>

                    <!-- Range slider with accessibility features -->
                    <mjo-slider
                        label="Font Size Range"
                        min="12"
                        max="24"
                        step="1"
                        .value=${this.settings.fontSize}
                        valueSuffix="px"
                        aria-describedby="fontsize-help"
                        tooltip
                        @mjo-slider:change=${(e: any) => (this.settings.fontSize = e.detail.value)}
                    >
                    </mjo-slider>
                    <div id="fontsize-help" style="font-size: 0.8em; color: #666;">Choose comfortable reading size</div>

                    <!-- Slider with live feedback -->
                    <mjo-slider
                        label="Animation Speed"
                        min="0"
                        max="2"
                        step="0.1"
                        .value=${this.settings.animationSpeed}
                        valueSuffix="x"
                        @mjo-slider:input=${(e: any) => console.log("Real-time value:", e.detail.value)}
                        @mjo-slider:change=${(e: any) => (this.settings.animationSpeed = e.detail.value)}
                    >
                    </mjo-slider>
                </div>

                <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                    <h4>Current Settings:</h4>
                    <ul>
                        <li>Contrast: ${this.settings.contrast}%</li>
                        <li>Font Size: ${this.settings.fontSize}px</li>
                        <li>Animation Speed: ${this.settings.animationSpeed}x</li>
                    </ul>
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

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem; width: 500px;">
                <h3>Range Sliders</h3>

                <mjo-slider
                    label="Price Range"
                    min="0"
                    max="1000"
                    step="10"
                    .value=${this.priceRange}
                    valuePrefix="$"
                    isRange
                    tooltip
                    @mjo-slider:change=${(e: any) => (this.priceRange = e.detail.value)}
                >
                </mjo-slider>

                <mjo-slider
                    label="Temperature Range"
                    min="0"
                    max="40"
                    step="1"
                    .value=${this.temperatureRange}
                    valueSuffix="°C"
                    color="secondary"
                    isRange
                    @mjo-slider:change=${(e: any) => (this.temperatureRange = e.detail.value)}
                >
                </mjo-slider>

                <div style="padding: 1.5rem; background: #f0f9ff; border-radius: 8px;">
                    <h4>Selected Ranges:</h4>
                    <p>Price: $${this.priceRange.replace("-", " - $")}</p>
                    <p>Temperature: ${this.temperatureRange.replace("-", "°C - ")}°C</p>
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

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 3rem; width: 450px;">
                <h3>Sliders with Tooltips</h3>
                <p>Drag the handles to see tooltips with current values</p>

                <mjo-slider
                    label="Quality Setting"
                    min="0"
                    max="100"
                    step="5"
                    .value=${this.quality}
                    valueSuffix="%"
                    tooltip
                    @mjo-slider:change=${(e: any) => (this.quality = e.detail.value)}
                >
                </mjo-slider>

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
                    @mjo-slider:input=${(e: any) => console.log("Live value:", e.detail.value)}
                    @mjo-slider:change=${(e: any) => (this.budget = e.detail.value)}
                >
                </mjo-slider>

                <div style="padding: 1rem; background: #fffbeb; border-radius: 6px;">
                    <p style="margin: 0; color: #92400e;"><strong>💡 Tip:</strong> Click and drag the slider handles to see live tooltips.</p>
                </div>
            </div>
        `;
    }
}
```

## Custom Step Values

Configure sliders with different step intervals:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-steps")
export class ExampleSliderSteps extends LitElement {
    @state()
    private rating = "4.5";

    @state()
    private precision = "0.125";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
                <h3>Custom Step Values</h3>

                <mjo-slider
                    label="Rating"
                    min="0"
                    max="5"
                    step="0.5"
                    .value=${this.rating}
                    valueSuffix=" stars"
                    @mjo-slider:change=${(e: any) => (this.rating = e.detail.value)}
                >
                </mjo-slider>

                <mjo-slider
                    label="Precision Value"
                    min="0"
                    max="1"
                    step="0.125"
                    .value=${this.precision}
                    @mjo-slider:change=${(e: any) => (this.precision = e.detail.value)}
                >
                </mjo-slider>

                <div style="padding: 1rem; background: #f5f5f5; border-radius: 6px;">
                    <p><strong>Current Values:</strong></p>
                    <p>Rating: ${this.rating} stars</p>
                    <p>Precision: ${this.precision}</p>
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

## Slider Configuration

Create sliders with different settings:

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

| Name               | Type                             | Default        | Description                                     |
| ------------------ | -------------------------------- | -------------- | ----------------------------------------------- |
| `hideValue`        | `boolean`                        | `false`        | Hide the value display next to the label        |
| `isRange`          | `boolean`                        | `false`        | Enable range selection with two handles         |
| `tooltip`          | `boolean`                        | `false`        | Show tooltips when dragging handles             |
| `disabled`         | `boolean`                        | `false`        | Disable the slider interaction                  |
| `max`              | `number`                         | `1`            | Maximum value of the slider                     |
| `min`              | `number`                         | `0`            | Minimum value of the slider                     |
| `step`             | `number`                         | `0.01`         | Step increment for value changes                |
| `color`            | `"primary" \| "secondary"`       | `"primary"`    | Color scheme for the slider                     |
| `label`            | `string`                         | -              | Label text displayed above the slider           |
| `name`             | `string`                         | -              | Form field name for form submission             |
| `size`             | `"small" \| "medium" \| "large"` | `"medium"`     | Size variant of the slider                      |
| `value`            | `string`                         | `"undefined"`  | Current value (single) or range (e.g., "10-90") |
| `valuePrefix`      | `string`                         | `""`           | Text prefix for displayed values                |
| `valueSuffix`      | `string`                         | `""`           | Text suffix for displayed values                |
| `ariaDescribedby`  | `string`                         | -              | ID of element that describes the slider         |
| `ariaLabelledby`   | `string`                         | -              | ID of element that labels the slider            |
| `ariaValuetext`    | `string`                         | -              | Custom aria-valuetext for screen readers        |
| `ariaOrientation`  | `"horizontal" \| "vertical"`     | `"horizontal"` | Orientation of the slider                       |
| `ariaRequiredAttr` | `string`                         | -              | Indicates if slider is required                 |
| `formatValueText`  | `(value: string) => string`      | -              | Function to format aria-valuetext               |
| `theme`            | `MjoSliderTheme`                 | `{}`           | Theme configuration for the slider              |

## Methods

| Method                    | Description                               |
| ------------------------- | ----------------------------------------- |
| `getValue()`              | Returns the current slider value(s)       |
| `setValue(value: string)` | Sets the slider value(s) programmatically |

## Events

| Event                    | Detail Interface            | Description                                                |
| ------------------------ | --------------------------- | ---------------------------------------------------------- |
| `mjo-slider:change`      | `MjoSliderChangeEvent`      | Fired when the slider value changes and handle is released |
| `mjo-slider:input`       | `MjoSliderInputEvent`       | Fired during slider handle movement (real-time updates)    |
| `mjo-slider:focus`       | `MjoSliderFocusEvent`       | Fired when slider handle receives focus                    |
| `mjo-slider:blur`        | `MjoSliderBlurEvent`        | Fired when slider handle loses focus                       |
| `mjo-slider:valuechange` | `MjoSliderValueChangeEvent` | Fired when value changes programmatically                  |
| `change`                 | `Event`                     | Standard change event (maintained for compatibility)       |
| `move`                   | `CustomEvent`               | Legacy event during handle movement (deprecated)           |

### Event Detail Interfaces

```ts
interface MjoSliderChangeEvent {
    detail: {
        element: MjoSlider;
        value: string;
        name?: string;
        isRange: boolean;
        previousValue: string;
    };
}

interface MjoSliderInputEvent {
    detail: {
        element: MjoSlider;
        value: string;
        name?: string;
        isRange: boolean;
        handle?: "one" | "two";
    };
}
```

## CSS Custom Properties

| Property                                  | Default                                                 | Description                              |
| ----------------------------------------- | ------------------------------------------------------- | ---------------------------------------- |
| `--mjo-slider-background-color`           | `var(--mjo-border-color-dark, #c7c7c7)`                 | Background color of the slider track     |
| `--mjo-slider-border-radius`              | `var(--mjo-radius-medium, 5px)`                         | Border radius of the slider track        |
| `--mjo-slider-primary-color`              | `var(--mjo-primary-color, #007bff)`                     | Primary color for progress and handles   |
| `--mjo-slider-secondary-color`            | `var(--mjo-secondary-color, #ff8800)`                   | Secondary color for progress and handles |
| `--mjo-slider-primary-foreground-color`   | `var(--mjo-primary-foreground-color, #333333)`          | Text color for primary tooltips          |
| `--mjo-slider-secondary-foreground-color` | `var(--mjo-secondary-foreground-color, #333333)`        | Text color for secondary tooltips        |
| `--mjo-slider-value-color`                | `inherit`                                               | Color of the value display               |
| `--mjo-slider-value-font-size`            | `var(--mjo-input-label-font-size, calc(1em * 0.8))`     | Font size for value display              |
| `--mjo-slider-value-font-weight`          | `inherit`                                               | Font weight for value display            |
| `--mjo-slider-focus-outline-color`        | `var(--mjo-primary-color, #007bff)`                     | Color of focus outline                   |
| `--mjo-slider-focus-outline-width`        | `2px`                                                   | Width of focus outline                   |
| `--mjo-slider-focus-outline-offset`       | `2px`                                                   | Offset of focus outline                  |
| `--mjo-slider-handle-focus-ring-color`    | `var(--mjo-primary-color, #007bff)`                     | Color of handle focus ring               |
| `--mjo-slider-handle-disabled-color`      | `var(--mjo-border-color-dark, #c7c7c7)`                 | Color of disabled handles                |
| `--mjo-slider-disabled-opacity`           | `0.5`                                                   | Opacity when disabled                    |
| `--mjo-slider-tooltip-radius`             | `var(--mjo-radius-small, 5px)`                          | Border radius for tooltips               |
| `--mjo-slider-tooltip-box-shadow`         | `var(--mjo-box-shadow, 0px 0px 3px rgba(0, 0, 0, 0.5))` | Box shadow for tooltips                  |

### High Contrast Mode Variables

| Property                                         | Default   | Description                          |
| ------------------------------------------------ | --------- | ------------------------------------ |
| `--mjo-slider-background-color-high-contrast`    | `#000`    | Track background in high contrast    |
| `--mjo-slider-border-color-high-contrast`        | `#fff`    | Track border in high contrast        |
| `--mjo-slider-primary-color-high-contrast`       | `#0000ff` | Primary color in high contrast       |
| `--mjo-slider-secondary-color-high-contrast`     | `#ff0000` | Secondary color in high contrast     |
| `--mjo-slider-focus-outline-width-high-contrast` | `3px`     | Focus outline width in high contrast |

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
    valueColor?: string;
    valueFontSize?: string;
    valueFontWeight?: string;
    focusOutlineColor?: string;
    focusOutlineWidth?: string;
    focusOutlineOffset?: string;
    handleFocusRingColor?: string;
    handleFocusRingWidth?: string;
    handleDisabledColor?: string;
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
    tooltipRadius?: string;
    tooltipBoxShadow?: string;
    disabledOpacity?: string;
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

The `mjo-slider` component implements the complete ARIA slider pattern with comprehensive keyboard support and screen reader compatibility.

### ARIA Attributes

-   **`role="slider"`**: Properly identifies each handle as a slider control
-   **`aria-valuemin`**, **`aria-valuemax`**, **`aria-valuenow`**: Current value and range information
-   **`aria-valuetext`**: Human-readable value description (e.g., "75 percent")
-   **`aria-labelledby`**: Links to label elements for proper naming
-   **`aria-describedby`**: Links to helper text or instructions
-   **`aria-orientation`**: Indicates horizontal/vertical orientation
-   **`aria-disabled`**: Properly communicates disabled state
-   **`aria-live="polite"`**: Live announcements of value changes

### Keyboard Navigation

| Key                 | Action                                |
| ------------------- | ------------------------------------- |
| **Tab**             | Navigate between slider handles       |
| **Arrow Left/Down** | Decrease value by one step            |
| **Arrow Right/Up**  | Increase value by one step            |
| **Home**            | Set to minimum value                  |
| **End**             | Set to maximum value                  |
| **Page Down**       | Decrease by large step (10% of range) |
| **Page Up**         | Increase by large step (10% of range) |

### Screen Reader Support

-   Value changes are announced using `aria-live` regions
-   Custom `formatValueText` function for meaningful value descriptions
-   Proper labeling and descriptions for context
-   Range sliders announce both values appropriately

### Visual Accessibility

-   **Focus indicators**: Clear visual focus rings on handles and container
-   **High contrast support**: Enhanced colors and borders in high contrast mode
-   **Reduced motion**: Respects `prefers-reduced-motion` for animations
-   **Touch accessibility**: Larger touch targets on mobile devices

## Technical Notes

-   **Range Values**: For range sliders, values are formatted as "min-max" (e.g., "10-90")
-   **Step Calculation**: The slider automatically calculates step positions and snaps to the nearest valid value
-   **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
-   **Touch Support**: Full touch and mouse support with proper event handling
-   **Value Validation**: Automatically validates and constrains values within min/max bounds
-   **Event System**: New event system follows `mjo-slider:event-name` convention with detailed event information

## Best Practices

-   Always provide meaningful labels for accessibility
-   Use appropriate step values that make sense for your use case
-   Consider the range size when setting min/max values
-   Use tooltips for sliders where precise values matter
-   Provide value prefixes/suffixes to give context (%, $, etc.)
-   Test with both keyboard and mouse/touch interactions
-   Use consistent color schemes across related sliders
-   Provide helper text for complex sliders using `aria-describedby`
-   Consider using `formatValueText` for better screen reader announcements

For additional theming options, see the [Theming Guide](./theming.md).
