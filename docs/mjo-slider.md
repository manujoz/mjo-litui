# mjo-slider

A customizable range slider component with full accessibility support, keyboard navigation, and support for single values and ranges.

## Overview

The `mjo-slider` component provides an interactive slider interface for selecting numeric values within a specified range. It supports both single-value selection and range selection, with comprehensive accessibility features including ARIA attributes, keyboard navigation, screen reader support, and customizable appearance with seamless form integration.

## Accessibility Features

- **Full ARIA support**: Complete implementation of ARIA slider pattern with proper roles and attributes
- **Keyboard navigation**: Arrow keys, Home/End, Page Up/Down for value adjustment
- **Screen reader support**: Live announcements of value changes and proper labeling
- **Focus management**: Visual focus indicators and proper tab order
- **High contrast mode**: Enhanced visibility in high contrast environments
- **Touch accessibility**: Improved touch targets for mobile devices

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
    @state() private volume = "50";

    render() {
        return html`
            <mjo-slider label="Volume" min="0" max="100" .value=${this.volume} valueSuffix="%" @mjo-slider:change=${(e: any) => (this.volume = e.detail.value)}>
            </mjo-slider>
        `;
    }
}
```

## Range Sliders

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-range")
export class ExampleSliderRange extends LitElement {
    @state() private priceRange = "200-800";

    render() {
        return html`
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
        `;
    }
}
```

## Accessibility Features

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("example-slider-accessibility")
export class ExampleSliderAccessibility extends LitElement {
    @state() private contrast = "75";

    render() {
        return html`
            <mjo-slider
                label="Display Contrast"
                min="0"
                max="100"
                step="5"
                .value=${this.contrast}
                valueSuffix="%"
                aria-describedby="contrast-help"
                .formatValueText=${(value: string) => `${value} percent contrast`}
                @mjo-slider:change=${(e: any) => (this.contrast = e.detail.value)}
            >
            </mjo-slider>
            <div id="contrast-help">Adjust screen contrast for better visibility</div>
        `;
    }
}
```

## Form Integration

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoForm } from "mjo-litui/types";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-slider";
import "mjo-litui/mjo-button";

@customElement("example-slider-form")
export class ExampleSliderForm extends LitElement {
    @query("mjo-form") private form!: MjoForm;
    @state() private experience = "5";
    @state() private budget = "500-2000";

    private async handleSubmit() {
        if (!this.form.validate()) return;
        const data = this.form.getFormData();
        console.log("Form submitted:", data);
    }

    render() {
        return html`
            <mjo-form>
                <mjo-slider label="Years of Experience" name="experience" min="0" max="20" step="1" .value=${this.experience} valueSuffix=" years" tooltip>
                </mjo-slider>

                <mjo-slider label="Budget Range" name="budget" min="100" max="5000" step="100" .value=${this.budget} valuePrefix="$" isRange tooltip>
                </mjo-slider>

                <mjo-button @click=${this.handleSubmit}>Submit</mjo-button>
            </mjo-form>
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
                        borderRadius: "8px",
                        primaryColor: "#059669",
                        secondaryColor: "#dc2626",
                    },
                }}
            >
                <mjo-slider label="Primary Themed Slider" min="0" max="100" value="65" valueSuffix="%" tooltip></mjo-slider>
                <mjo-slider label="Secondary Themed Slider" min="0" max="100" value="40" valueSuffix="%" color="secondary" tooltip></mjo-slider>
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
            <mjo-slider
                label="Custom Theme"
                min="0"
                max="100"
                value="55"
                valueSuffix="%"
                .theme=${{
                    backgroundColor: "#fed7aa",
                    primaryColor: "#ea580c",
                    primaryForegroundColor: "#ffffff",
                }}
                tooltip
            >
            </mjo-slider>
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

interface MjoSliderFocusEvent {
    detail: {
        element: MjoSlider;
        handle?: "one" | "two";
    };
}

interface MjoSliderBlurEvent {
    detail: {
        element: MjoSlider;
        handle?: "one" | "two";
    };
}

interface MjoSliderValueChangeEvent {
    detail: {
        element: MjoSlider;
        value: string;
        name?: string;
        isRange: boolean;
        previousValue: string;
    };
}
```

## CSS Parts

| Part                       | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `container`                | Main slider container                                  |
| `value`                    | Value display element next to the label                |
| `rangebar`                 | Slider track container                                 |
| `track`                    | Background track of the slider                         |
| `progress`                 | Progress/filled portion of the track                   |
| `label-container`          | Container for the input label (via mjoint-input-label) |
| `label-truncate-container` | Truncate container within the label                    |
| `label-truncate-wrapper`   | Truncate wrapper within the label                      |
| `tooltip-container`        | Container for slider handle tooltips                   |
| `tooltip`                  | Tooltip content for handle values                      |
| `handle-wrapper`           | Wrapper for slider handles                             |
| `handle-item`              | Individual slider handle element                       |

## CSS Custom Properties

| Property                                  | Default                                                 | Description                              |
| ----------------------------------------- | ------------------------------------------------------- | ---------------------------------------- |
| `--mjo-slider-background-color`           | `transparent`                                           | Background color of the slider track     |
| `--mjo-slider-border-radius`              | `var(--mjo-radius-medium, 5px)`                         | Border radius of the slider track        |
| `--mjo-slider-focus-outline-radius`       | `4px`                                                   | Border radius of focus outline           |
| `--mjo-slider-primary-color`              | `var(--mjo-primary-color, #007bff)`                     | Primary color for progress and handles   |
| `--mjo-slider-secondary-color`            | `var(--mjo-secondary-color, #ff8800)`                   | Secondary color for progress and handles |
| `--mjo-slider-primary-foreground-color`   | `var(--mjo-primary-foreground-color, #333333)`          | Text color for primary tooltips          |
| `--mjo-slider-secondary-foreground-color` | `var(--mjo-secondary-foreground-color, #333333)`        | Text color for secondary tooltips        |
| `--mjo-slider-value-color`                | `inherit`                                               | Color of the value display               |
| `--mjo-slider-value-font-size`            | `var(--mjo-input-label-font-size, calc(1em * 0.8))`     | Font size for value display              |
| `--mjo-slider-value-font-weight`          | `inherit`                                               | Font weight for value display            |
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
    /** --mjo-slider-background-color */
    backgroundColor?: string;
    /** --mjo-slider-border-radius */
    borderRadius?: string;
    /** --mjo-slider-progress-color (deprecated: use primaryColor) */
    progressColor?: string;
    /** --mjo-slider-primary-color */
    primaryColor?: string;
    /** --mjo-slider-secondary-color */
    secondaryColor?: string;
    /** --mjo-slider-label-color */
    labelColor?: string;
    /** --mjo-slider-label-font-size */
    labelFontSize?: string;
    /** --mjo-slider-label-font-weight */
    labelFontWeight?: string;
    /** --mjo-slider-primary-foreground-color */
    primaryForegroundColor?: string;
    /** --mjo-slider-secondary-foreground-color */
    secondaryForegroundColor?: string;
    /** --mjo-slider-value-color */
    valueColor?: string;
    /** --mjo-slider-value-font-size */
    valueFontSize?: string;
    /** --mjo-slider-value-font-weight */
    valueFontWeight?: string;
    /** --mjo-slider-focus-outline-color */
    focusOutlineColor?: string;
    /** --mjo-slider-focus-outline-width */
    focusOutlineWidth?: string;
    /** --mjo-slider-focus-outline-offset */
    focusOutlineOffset?: string;
    /** --mjo-slider-focus-outline-radius */
    focusOutlineRadius?: string;
    /** --mjo-slider-handle-focus-ring-color */
    handleFocusRingColor?: string;
    /** --mjo-slider-handle-focus-ring-width */
    handleFocusRingWidth?: string;
    /** --mjo-slider-handle-disabled-color */
    handleDisabledColor?: string;
    /** --mjo-slider-tooltip-background-color (deprecated: use tooltipTextColor) */
    tooltipBackgroundColor?: string;
    /** --mjo-slider-tooltip-text-color (deprecated: use primaryForegroundColor/secondaryForegroundColor) */
    tooltipTextColor?: string;
    /** --mjo-slider-tooltip-radius */
    tooltipRadius?: string;
    /** --mjo-slider-tooltip-box-shadow */
    tooltipBoxShadow?: string;
    /** --mjo-slider-disabled-opacity */
    disabledOpacity?: string;
    /** --mjo-slider-background-color-high-contrast */
    backgroundColorHighContrast?: string;
    /** --mjo-slider-border-color-high-contrast */
    borderColorHighContrast?: string;
    /** --mjo-slider-primary-color-high-contrast */
    primaryColorHighContrast?: string;
    /** --mjo-slider-secondary-color-high-contrast */
    secondaryColorHighContrast?: string;
    /** --mjo-slider-focus-outline-width-high-contrast */
    focusOutlineWidthHighContrast?: string;
}
```

## Technical Notes

- **Range Values**: For range sliders, values are formatted as "min-max" (e.g., "10-90")
- **Step Calculation**: The slider automatically calculates step positions and snaps to the nearest valid value
- **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
- **Touch Support**: Full touch and mouse support with proper event handling
- **Performance**: Uses efficient calculation methods for smooth dragging and positioning
- **Value Validation**: Automatically validates and constrains values within min/max bounds

## Accessibility

The `mjo-slider` component implements the complete ARIA slider pattern with comprehensive keyboard support and screen reader compatibility.

### ARIA Attributes

- **`role="slider"`**: Properly identifies each handle as a slider control
- **`aria-valuemin`**, **`aria-valuemax`**, **`aria-valuenow`**: Current value and range information
- **`aria-valuetext`**: Human-readable value description (e.g., "75 percent")
- **`aria-labelledby`**: Links to label elements for proper naming
- **`aria-describedby`**: Links to helper text or instructions
- **`aria-orientation`**: Indicates horizontal/vertical orientation
- **`aria-disabled`**: Properly communicates disabled state
- **`aria-live="polite"`**: Live announcements of value changes

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

- Value changes are announced using `aria-live` regions
- Custom `formatValueText` function for meaningful value descriptions
- Proper labeling and descriptions for context
- Range sliders announce both values appropriately

### Visual Accessibility

- **Focus indicators**: Clear visual focus rings on handles and container
- **High contrast support**: Enhanced colors and borders in high contrast mode
- **Reduced motion**: Respects `prefers-reduced-motion` for animations
- **Touch accessibility**: Larger touch targets on mobile devices

## Best Practices

- Always provide meaningful labels for accessibility
- Use appropriate step values that make sense for your use case
- Consider the range size when setting min/max values
- Use tooltips for sliders where precise values matter
- Provide value prefixes/suffixes to give context (%, $, etc.)
- Test with both keyboard and mouse/touch interactions
- Use consistent color schemes across related sliders
- Provide helper text for complex sliders using `aria-describedby`
- Consider using `formatValueText` for better screen reader announcements

For additional theming options, see the [Theming Guide](./theming.md).
