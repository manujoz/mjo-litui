# mjo-slider

Customizable range slider component with accessibility support, keyboard navigation, and range selection.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

The `mjo-slider` component is designed for:

- Single value selection within a numeric range
- Dual-handle range selection for min/max values
- Form integration with automatic data management
- Real-time value updates during handle movement
- Accessible numeric input with keyboard navigation
- Custom visual appearance through CSS variables and parts
- Display value with custom prefix and suffix

## Import

```typescript
import "mjo-litui/mjo-slider";
```

## Properties

| Property           | Type                         | Description                                                                                                                                     | Default                                          | Required |
| ------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| `value`            | `string`                     | Current slider value. For single sliders, a number as string (e.g., `"50"`). For range sliders, two numbers separated by dash (e.g., `"20-80"`) | `"undefined"` (auto-calculated from `min`/`max`) | No       |
| `min`              | `number`                     | Minimum value of the slider range                                                                                                               | `0`                                              | No       |
| `max`              | `number`                     | Maximum value of the slider range                                                                                                               | `1`                                              | No       |
| `step`             | `number`                     | Step increment for value changes                                                                                                                | `0.01`                                           | No       |
| `isRange`          | `boolean`                    | Enables dual-handle range selection mode                                                                                                        | `false`                                          | No       |
| `label`            | `string`                     | Label text displayed above the slider                                                                                                           | `undefined`                                      | No       |
| `name`             | `string`                     | Form field name for form integration                                                                                                            | `undefined`                                      | No       |
| `disabled`         | `boolean`                    | Disables slider interaction                                                                                                                     | `false`                                          | No       |
| `tooltip`          | `boolean`                    | Shows tooltips with current values on handles                                                                                                   | `false`                                          | No       |
| `hideValue`        | `boolean`                    | Hides the value display next to the label                                                                                                       | `false`                                          | No       |
| `valuePrefix`      | `string`                     | Text to display before the value (e.g., `"$"`)                                                                                                  | `""`                                             | No       |
| `valueSuffix`      | `string`                     | Text to display after the value (e.g., `"%"`)                                                                                                   | `""`                                             | No       |
| `size`             | `MjoSliderSize`              | Visual size of slider handles (`"small"`, `"medium"`, `"large"`)                                                                                | `"medium"`                                       | No       |
| `color`            | `MjoSliderColor`             | Color theme (`"primary"`, `"secondary"`)                                                                                                        | `"primary"`                                      | No       |
| `ariaLabel`        | `string \| null`             | Accessible label for screen readers                                                                                                             | `null`                                           | No       |
| `ariaLabelledby`   | `string`                     | ID of element providing accessible label                                                                                                        | `undefined`                                      | No       |
| `ariaDescribedby`  | `string`                     | ID of element providing accessible description                                                                                                  | `undefined`                                      | No       |
| `ariaValuetext`    | `string`                     | Custom text for screen readers describing current value                                                                                         | `undefined`                                      | No       |
| `ariaOrientation`  | `"horizontal" \| "vertical"` | Slider orientation for accessibility                                                                                                            | `"horizontal"`                                   | No       |
| `ariaRequiredAttr` | `string`                     | Marks the slider as required                                                                                                                    | `undefined`                                      | No       |
| `formatValueText`  | `(value: string) => string`  | Function to format aria-valuetext dynamically                                                                                                   | `undefined`                                      | No       |

## Public Methods

| Method                    | Parameters                             | Description                                                    | Return Value |
| ------------------------- | -------------------------------------- | -------------------------------------------------------------- | ------------ |
| `getValue()`              | -                                      | Returns the current slider value                               | `string`     |
| `setValue(value: string)` | `value: string` - The new value to set | Sets the slider value programmatically and triggers validation | `void`       |

## Events

| Event                    | Description                                                | Type                        | Detail Properties                                                                                             |
| ------------------------ | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `mjo-slider:change`      | Fired when the slider value changes and handle is released | `MjoSliderChangeEvent`      | `element: MjoSlider`<br>`value: string`<br>`name?: string`<br>`isRange: boolean`<br>`previousValue: string`   |
| `mjo-slider:input`       | Fired during slider handle movement for real-time updates  | `MjoSliderInputEvent`       | `element: MjoSlider`<br>`value: string`<br>`name?: string`<br>`isRange: boolean`<br>`handle?: "one" \| "two"` |
| `mjo-slider:focus`       | Fired when a slider handle receives focus                  | `MjoSliderFocusEvent`       | `element: MjoSlider`<br>`handle?: "one" \| "two"`                                                             |
| `mjo-slider:blur`        | Fired when a slider handle loses focus                     | `MjoSliderBlurEvent`        | `element: MjoSlider`<br>`handle?: "one" \| "two"`                                                             |
| `mjo-slider:valuechange` | Fired when value changes programmatically via `setValue()` | `MjoSliderValueChangeEvent` | `element: MjoSlider`<br>`value: string`<br>`previousValue: string`<br>`programmatic: boolean`                 |
| `change`                 | Standard change event for form compatibility               | `Event`                     | -                                                                                                             |

## CSS Variables

| Variable                                         | Description                                            | Default                                                                                       |
| ------------------------------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `--mjo-slider-background-color`                  | Background color of the slider container               | `transparent`                                                                                 |
| `--mjo-slider-border-radius`                     | Border radius of the slider track                      | `var(--mjo-radius-medium, 5px)`                                                               |
| `--mjo-slider-primary-color`                     | Color for primary theme (track progress and handles)   | `var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff))`                           |
| `--mjo-slider-secondary-color`                   | Color for secondary theme (track progress and handles) | `var(--mjo-input-secondary-color, var(--mjo-secondary-color, #ff8800))`                       |
| `--mjo-slider-primary-foreground-color`          | Text color for primary tooltip                         | `var(--mjo-input-primary-foreground-color, var(--mjo-primary-foreground-color, #333333))`     |
| `--mjo-slider-secondary-foreground-color`        | Text color for secondary tooltip                       | `var(--mjo-input-secondary-foreground-color, var(--mjo-secondary-foreground-color, #333333))` |
| `--mjo-slider-disabled-opacity`                  | Opacity when slider is disabled                        | `0.5`                                                                                         |
| `--mjo-slider-focus-outline-radius`              | Border radius for focus outline                        | `4px`                                                                                         |
| `--mjo-slider-label-font-size`                   | Font size for label text                               | `var(--mjo-input-label-font-size, calc(1em * 0.8))`                                           |
| `--mjo-slider-label-font-weight`                 | Font weight for label text                             | `inherit`                                                                                     |
| `--mjo-slider-label-color`                       | Color for label text                                   | `currentColor`                                                                                |
| `--mjo-slider-value-font-size`                   | Font size for value display                            | `var(--mjo-input-label-font-size, calc(1em * 0.8))`                                           |
| `--mjo-slider-value-color`                       | Color for value display                                | `inherit`                                                                                     |
| `--mjo-slider-value-font-weight`                 | Font weight for value display                          | `inherit`                                                                                     |
| `--mjo-slider-tooltip-radius`                    | Border radius for tooltip                              | `var(--mjo-radius-small, 5px)`                                                                |
| `--mjo-slider-tooltip-box-shadow`                | Box shadow for tooltip                                 | `var(--mjo-box-shadow, 0px 0px 3px rgba(0, 0, 0, 0.5))`                                       |
| `--mjo-slider-handle-focus-ring-color`           | Color of focus ring around handles                     | `var(--mjo-primary-color, #007bff)`                                                           |
| `--mjo-slider-handle-disabled-color`             | Color for handles when disabled                        | `var(--mjo-border-color-dark, #c7c7c7)`                                                       |
| `--mjo-slider-background-color-high-contrast`    | Background color in high contrast mode                 | `#000`                                                                                        |
| `--mjo-slider-border-color-high-contrast`        | Border color in high contrast mode                     | `#fff`                                                                                        |
| `--mjo-slider-primary-color-high-contrast`       | Primary color in high contrast mode                    | `#0000ff`                                                                                     |
| `--mjo-slider-secondary-color-high-contrast`     | Secondary color in high contrast mode                  | `#ff0000`                                                                                     |
| `--mjo-slider-focus-outline-width-high-contrast` | Focus outline width in high contrast mode              | `3px`                                                                                         |

## CSS Parts

| Part                       | Description                             | Element                              |
| -------------------------- | --------------------------------------- | ------------------------------------ |
| `container`                | Main slider container                   | `<div>`                              |
| `value`                    | Value display element next to the label | `<div>`                              |
| `rangebar`                 | Slider track container                  | `<div>`                              |
| `track`                    | Background track of the slider          | `<div>`                              |
| `progress`                 | Progress/filled portion of the track    | `<div>`                              |
| `label-container`          | Container for the input label           | `<div>` (via `mjoint-input-label`)   |
| `label-truncate-container` | Truncate container within the label     | `<div>` (via `mjoint-input-label`)   |
| `label-truncate-wrapper`   | Truncate wrapper within the label       | `<div>` (via `mjoint-input-label`)   |
| `tooltip-container`        | Container for slider handle tooltips    | `<div>` (via `mjoint-slider-handle`) |
| `tooltip`                  | Tooltip content for handle values       | `<div>` (via `mjoint-slider-handle`) |
| `handle-wrapper`           | Wrapper for slider handles              | `<div>` (via `mjoint-slider-handle`) |
| `handle-item`              | Individual slider handle element        | `<div>` (via `mjoint-slider-handle`) |

## Accessibility

The `mjo-slider` component implements comprehensive accessibility features:

### ARIA Attributes

- **Role**: Each handle has `role="slider"` with appropriate ARIA attributes
- **aria-valuemin/max/now**: Automatically managed to reflect current state
- **aria-valuetext**: Provides formatted value description including prefix/suffix
- **aria-label/labelledby**: Associates slider with descriptive labels
- **aria-describedby**: Links to additional descriptive content
- **aria-orientation**: Indicates slider orientation (default: horizontal)
- **aria-disabled**: Reflects disabled state
- **aria-live**: Value display has `aria-live="polite"` for screen reader updates

### Keyboard Navigation

| Key               | Action                                                  |
| ----------------- | ------------------------------------------------------- |
| `Arrow Left/Down` | Decrease value by one step                              |
| `Arrow Right/Up`  | Increase value by one step                              |
| `Home`            | Set value to minimum                                    |
| `End`             | Set value to maximum                                    |
| `Page Up`         | Increase value by large step (10× step or 10% of range) |
| `Page Down`       | Decrease value by large step (10× step or 10% of range) |
| `Tab`             | Move focus to next/previous handle (in range mode)      |

### Best Practices

- Always provide a `label` or `ariaLabel` for context
- Use `ariaDescribedby` to link to instructions or error messages
- Consider `formatValueText` for complex value formatting
- Ensure sufficient color contrast for progress and handles
- Test with screen readers to verify value announcements
- For range sliders, provide clear instructions about dual-handle interaction

## Usage Examples

### Basic Single Value Slider

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("my-component")
export class MyComponent extends LitElement {
    render() {
        return html` <mjo-slider label="Volume" min="0" max="100" step="1" value="50" valueSuffix="%"></mjo-slider> `;
    }
}
```

### Range Slider with Tooltips

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("price-filter")
export class PriceFilter extends LitElement {
    @state() private priceRange = "100-500";

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
                color="secondary"
                @mjo-slider:change=${this._handlePriceChange}
            ></mjo-slider>
        `;
    }

    private _handlePriceChange(e: CustomEvent) {
        this.priceRange = e.detail.value;
        console.log("Selected range:", e.detail.value);
    }
}
```

### Programmatic Value Control

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { MjoSlider } from "mjo-litui/mjo-slider";

@customElement("controlled-slider")
export class ControlledSlider extends LitElement {
    @query("mjo-slider") slider!: MjoSlider;

    render() {
        return html`
            <mjo-slider label="Opacity" min="0" max="1" step="0.1" value="0.5"></mjo-slider>
            <button @click=${this._reset}>Reset to 0.5</button>
            <button @click=${this._setMax}>Set to Maximum</button>
        `;
    }

    private _reset() {
        this.slider.setValue("0.5");
    }

    private _setMax() {
        this.slider.setValue("1");
    }
}
```

### Real-time Updates with Input Event

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("live-preview")
export class LivePreview extends LitElement {
    @state() private currentValue = "50";

    render() {
        return html`
            <mjo-slider
                label="Brightness"
                min="0"
                max="100"
                step="1"
                .value=${this.currentValue}
                valueSuffix="%"
                @mjo-slider:input=${this._handleInput}
            ></mjo-slider>
            <div style="opacity: ${Number(this.currentValue) / 100}">Live preview content</div>
        `;
    }

    private _handleInput(e: CustomEvent) {
        // Update on every movement, not just on release
        this.currentValue = e.detail.value;
    }
}
```

### Form Integration

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-slider";
import "mjo-litui/mjo-form";

@customElement("settings-form")
export class SettingsForm extends LitElement {
    render() {
        return html`
            <mjo-form @mjo-form:submit=${this._handleSubmit}>
                <mjo-slider name="volume" label="Volume" min="0" max="100" step="5" value="50" valueSuffix="%"></mjo-slider>

                <mjo-slider name="quality" label="Quality Range" min="1" max="10" step="1" value="3-8" isRange></mjo-slider>

                <button type="submit">Save Settings</button>
            </mjo-form>
        `;
    }

    private _handleSubmit(e: CustomEvent) {
        console.log("Form data:", e.detail.data);
        // { volume: "50", quality: "3-8" }
    }
}
```

### Custom Styling with CSS Parts and Variables

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("custom-slider")
export class CustomSlider extends LitElement {
    render() {
        return html` <mjo-slider label="Custom Styled Slider" min="0" max="100" step="1" value="50" class="custom"></mjo-slider> `;
    }

    static styles = css`
        .custom {
            --mjo-slider-primary-color: #ff6b6b;
            --mjo-slider-border-radius: 10px;
            --mjo-slider-label-font-weight: bold;
            --mjo-slider-value-color: #ff6b6b;
        }

        .custom::part(progress) {
            background: linear-gradient(90deg, #ff6b6b 0%, #feca57 100%);
        }

        .custom::part(handle-item) {
            box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
        }
    `;
}
```

### Accessible Slider with Custom Value Formatting

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-slider";

@customElement("accessible-slider")
export class AccessibleSlider extends LitElement {
    render() {
        return html`
            <mjo-slider
                label="Temperature"
                ariaDescribedby="temp-help"
                min="0"
                max="100"
                step="5"
                value="20"
                valueSuffix="°C"
                .formatValueText=${this._formatTemp}
            ></mjo-slider>
            <div id="temp-help">Select temperature between 0 and 100 degrees Celsius</div>
        `;
    }

    private _formatTemp(value: string): string {
        const num = Number(value);
        if (num < 10) return `${value} degrees Celsius, very cold`;
        if (num < 30) return `${value} degrees Celsius, cold`;
        if (num < 60) return `${value} degrees Celsius, warm`;
        return `${value} degrees Celsius, hot`;
    }
}
```

## Additional Notes

### Value Format

- **Single slider**: Value is a string representation of a number (e.g., `"42.5"`)
- **Range slider**: Value is two numbers separated by a dash (e.g., `"20-80"`)
- Values are automatically validated and clamped to `min`/`max` bounds

### Automatic Value Initialization

If `value` is not provided or is `"undefined"`:

- Single slider: Initializes to `min`
- Range slider: Initializes to `min-max`

### Step Precision

The component automatically handles decimal precision based on the `step` value. For example, if `step="0.01"`, values will be rounded to two decimal places.

### Performance Optimization

- Handle movement listeners are added only during drag operations
- Touch events use passive listeners where appropriate
- Reduced motion preferences are respected
- High contrast mode provides enhanced visual feedback

### Touch Support

The slider is optimized for touch devices with:

- Larger touch targets (32px minimum)
- Touch-action properties to prevent scrolling during drag
- Passive touch event listeners for better scroll performance

### Theme Integration

The component integrates with the `mjo-litui` theming system and automatically updates colors when the theme changes.
