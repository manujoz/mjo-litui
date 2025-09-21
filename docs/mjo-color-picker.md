# mjo-color-picker

Advanced color picker component with multiple formats, accessibility features, and form integration.

## HTML Usage

```html
<mjo-color-picker label="Background Color" name="bgColor" value="#3b82f6"></mjo-color-picker>
<mjo-color-picker color="secondary" size="large" rounded></mjo-color-picker>
<mjo-color-picker show-value format="hsl" value="#10b981"></mjo-color-picker>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-basic")
export class ExampleColorPickerBasic extends LitElement {
    render() {
        return html`
            <mjo-color-picker label="Primary Color" value="#3b82f6"></mjo-color-picker>
            <mjo-color-picker label="Secondary Color" color="secondary" value="#6b7280"></mjo-color-picker>
        `;
    }
}
```

## Sizes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-sizes")
export class ExampleColorPickerSizes extends LitElement {
    render() {
        return html`
            <mjo-color-picker label="Small" size="small" value="#ef4444"></mjo-color-picker>
            <mjo-color-picker label="Medium" size="medium" value="#3b82f6"></mjo-color-picker>
            <mjo-color-picker label="Large" size="large" value="#10b981"></mjo-color-picker>
            <mjo-color-picker label="Rounded" rounded value="#f59e0b"></mjo-color-picker>
        `;
    }
}
```

## Form Integration Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-form";

@customElement("example-color-picker-form")
export class ExampleColorPickerForm extends LitElement {
    render() {
        return html`
            <mjo-form>
                <mjo-color-picker label="Primary Color" name="primaryColor" value="#3b82f6" required></mjo-color-picker>
                <mjo-color-picker label="Secondary Color" name="secondaryColor" value="#6b7280"></mjo-color-picker>
            </mjo-form>
        `;
    }
}
```

## Color Formats Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-formats")
export class ExampleColorFormats extends LitElement {
    @state() private color = "#3b82f6";

    render() {
        return html`
            <mjo-color-picker
                label="HEX Format"
                format="hex"
                show-value
                .value=${this.color}
                @mjo-color-picker:change=${(e: CustomEvent) => (this.color = e.detail.value)}
            ></mjo-color-picker>
            <mjo-color-picker label="RGB Format" format="rgb" show-value .value=${this.color}></mjo-color-picker>
            <mjo-color-picker label="HSL Format" format="hsl" show-value .value=${this.color}></mjo-color-picker>
        `;
    }
}
```

## Attributes / Properties

| Name              | Type                                                   | Default     | Description                                              |
| ----------------- | ------------------------------------------------------ | ----------- | -------------------------------------------------------- |
| `color`           | `"primary" \| "secondary"`                             | `"primary"` | Semantic color scheme applied to the label               |
| `disabled`        | `boolean`                                              | `false`     | Disables the color picker and applies disabled styling   |
| `helperText`      | `string \| undefined`                                  | `undefined` | Additional descriptive text displayed below the picker   |
| `label`           | `string \| undefined`                                  | `undefined` | Text label displayed above the color picker              |
| `name`            | `string \| undefined`                                  | `undefined` | Form field name for form submission and validation       |
| `value`           | `string`                                               | `""`        | Current color value in the specified format              |
| `hideErrors`      | `boolean`                                              | `false`     | Prevents display of validation error messages            |
| `rounded`         | `boolean`                                              | `false`     | Applies circular border radius (50%) to the color picker |
| `size`            | `"small" \| "medium" \| "large"`                       | `"medium"`  | Controls the overall size of the color picker            |
| `format`          | `"hex" \| "rgb" \| "rgba" \| "hsl" \| "hsla" \| "hwb"` | `"hex"`     | Output format for color values                           |
| `showValue`       | `boolean`                                              | `false`     | Displays the current color value below the picker        |
| `ariaDescribedBy` | `string \| null`                                       | `null`      | IDs of elements that describe this color picker          |

### Form Properties (inherited from FormMixin)

| Name       | Type      | Default | Description                                  |
| ---------- | --------- | ------- | -------------------------------------------- |
| `required` | `boolean` | `false` | Makes the field required for form validation |

### Error State Properties (inherited from InputErrorMixin)

| Name         | Type                  | Default     | Description                |
| ------------ | --------------------- | ----------- | -------------------------- |
| `error`      | `boolean`             | `false`     | Indicates error state      |
| `errormsg`   | `string \| undefined` | `undefined` | Error message to display   |
| `success`    | `boolean`             | `false`     | Indicates success state    |
| `successmsg` | `string \| undefined` | `undefined` | Success message to display |

## Slots

| Slot | Description                                                   |
| ---- | ------------------------------------------------------------- |
| None | Currently not implemented; content is provided via properties |

## Events

| Event                            | Detail                                       | Description                         |
| -------------------------------- | -------------------------------------------- | ----------------------------------- |
| `change`                         | None                                         | Standard HTML change event          |
| `input`                          | None                                         | Standard HTML input event           |
| `mjo-color-picker:change`        | `{ element, value, format }`                 | Custom event with detailed info     |
| `mjo-color-picker:input`         | `{ element, value, format }`                 | Custom event during interaction     |
| `mjo-color-picker:format-change` | `{ element, format, previousFormat, value }` | Fired when color format changes     |
| `mjo-color-picker:focus`         | `{ element }`                                | Fired when component receives focus |
| `mjo-color-picker:blur`          | `{ element }`                                | Fired when component loses focus    |

## Methods

| Method                      | Parameters            | Return Type | Description                               |
| --------------------------- | --------------------- | ----------- | ----------------------------------------- |
| `getValue()`                | None                  | `string`    | Returns the current color value           |
| `setValue(value)`           | `value: string`       | `void`      | Sets the color value programmatically     |
| `getFormattedValue(format)` | `format: ColorFormat` | `string`    | Returns the color in the specified format |

## CSS Parts

| Part                          | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| `container`                   | The main color picker container                          |
| `color-picker`                | The visual color display area                            |
| `value-display`               | The color value text display                             |
| `label-container`             | Label container (via mjoint-input-label)                 |
| `label-truncate-container`    | Label truncate container (via mjoint-input-label)        |
| `label-truncate-wrapper`      | Label truncate wrapper (via mjoint-input-label)          |
| `helper-text-container`       | Helper text container (via mjoint-input-helper-text)     |
| `helper-text-typography`      | Helper text typography (via mjoint-input-helper-text)    |
| `helper-text-error-message`   | Error message container (via mjoint-input-helper-text)   |
| `helper-text-success-message` | Success message container (via mjoint-input-helper-text) |
| `helper-text-icon`            | Helper text icon (via mjoint-input-helper-text)          |

## CSS Variables

### Size Configuration

| Variable                                | Default                                        | Description                      |
| --------------------------------------- | ---------------------------------------------- | -------------------------------- |
| `--mjo-color-picker-size-small`         | `20px`                                         | Width and height for small size  |
| `--mjo-color-picker-size-medium`        | `28px`                                         | Width and height for medium size |
| `--mjo-color-picker-size-large`         | `36px`                                         | Width and height for large size  |
| `--mjo-color-picker-border-style`       | `solid`                                        | Border style                     |
| `--mjo-color-picker-border-width`       | `1px`                                          | Border width                     |
| `--mjo-color-picker-border-color`       | `#dddddd`                                      | Border color                     |
| `--mjo-color-picker-border-color-focus` | `#1aa8ed`                                      | Focus border color               |
| `--mjo-color-picker-border-radius`      | `5px`                                          | Border radius                    |
| `--mjo-color-picker-box-shadow`         | `none`                                         | Box shadow effect                |
| `--mjo-color-picker-box-shadow-focus`   | `0 0 0 2px rgba(29, 127, 219, 0.2)`            | Focus box shadow                 |
| `--mjo-color-picker-transition`         | `border-color 0.2s ease, box-shadow 0.2s ease` | Transition effects               |
| `--mjo-color-picker-value-color`        | `#1f2937`                                      | Value display text color         |
| `--mjo-color-picker-value-font-size`    | `0.75rem`                                      | Value display font size          |
| `--mjo-color-picker-value-font-weight`  | `500`                                          | Value display font weight        |
| `--mjo-color-picker-label-color`        | Label text color                               |
| `--mjo-color-picker-label-font-size`    | Label font size                                |
| `--mjo-color-picker-label-font-weight`  | Label font weight                              |

**Note**: The label styling variables cascade through multiple components in this order:
`--mjo-color-picker-label-*` → `--mjo-select-label-*` → `--mjo-slider-label-*` → `--mjo-switch-label-*` → `--mjo-textarea-label-*` → `--mjo-input-label-*`

## ThemeMixin Integration

This component supports the `ThemeMixin` for programmatic theming:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoColorPickerTheme } from "mjo-litui/types";
import "mjo-litui/mjo-color-picker";

@customElement("example-themed")
export class ExampleThemed extends LitElement {
    private customTheme: MjoColorPickerTheme = {
        sizeSmall: "16px",
        sizeMedium: "24px",
        sizeLarge: "32px",
        borderWidth: "2px",
        borderRadius: "8px",
    };

    render() {
        return html` <mjo-color-picker label="Custom Themed" .theme=${this.customTheme} value="#3b82f6"></mjo-color-picker> `;
    }
}
```

## Color Format Utilities

The component includes color conversion utilities:

```ts
import { convertColor, isValidColor } from "mjo-litui";

// Convert between formats
const hexColor = "#3b82f6";
const rgbColor = convertColor(hexColor, "rgb"); // "rgb(59, 130, 246)"
const hslColor = convertColor(hexColor, "hsl"); // "hsl(217, 91%, 60%)"

// Validate colors
if (isValidColor("#ff0000")) {
    // Color is valid
}
```

## Accessibility Features

- **Screen Reader Support**: Dynamic announcements for color changes
- **ARIA Attributes**: Comprehensive aria-label, aria-invalid, and aria-describedby support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast Mode**: Enhanced visibility in high contrast environments
- **Reduced Motion**: Respects prefers-reduced-motion preferences

## Form Integration

Seamlessly integrates with `mjo-form`:

- Automatic registration and validation
- Error message display
- Form data inclusion using the `name` property
- Required field validation support

## Best Practices

- Always provide a descriptive `label`
- Use `helperText` to explain the color's purpose
- Enable `showValue` for better accessibility
- Choose appropriate `size` for your interface
- Use semantic `color` values for consistent theming
- Test with screen readers and keyboard navigation
