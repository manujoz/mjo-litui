# mjo-color-picker

Advanced color picker component with multiple formats, accessibility features, and form integration.

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

- Color selection in design tools and editors
- Theme customization interfaces
- Form inputs requiring color values
- Configuration panels with color options
- Multi-format color value display and conversion
- Accessible color selection with keyboard navigation

## Import

```typescript
import "mjo-litui/mjo-color-picker";
```

## Properties

| Property           | Type                             | Default     | Required | Description                                                            |
| ------------------ | -------------------------------- | ----------- | -------- | ---------------------------------------------------------------------- |
| `color`            | `"primary" \| "secondary"`       | `"primary"` | No       | Color scheme of the picker border and focus states                     |
| `disabled`         | `boolean`                        | `false`     | No       | Whether the color picker is disabled                                   |
| `helperText`       | `string`                         | `undefined` | No       | Helper text displayed below the color picker                           |
| `label`            | `string`                         | `undefined` | No       | Label text for the color picker                                        |
| `name`             | `string`                         | `undefined` | No       | Name attribute for form submission                                     |
| `value`            | `string`                         | `""`        | No       | Current color value in the specified format                            |
| `hideErrors`       | `boolean`                        | `false`     | No       | Whether to hide error messages                                         |
| `rounded`          | `boolean`                        | `false`     | No       | When true, displays the color picker as a circle                       |
| `size`             | `"small" \| "medium" \| "large"` | `"medium"`  | No       | Size of the color picker                                               |
| `format`           | `ColorFormat`                    | `"hex"`     | No       | Color format for the value (hex, hexalpha, rgb, rgba, hsl, hsla, etc.) |
| `showValue`        | `boolean`                        | `false`     | No       | Whether to display the formatted color value below the picker          |
| `required`         | `boolean`                        | `false`     | No       | Whether the color picker is required (inherited from FormMixin)        |
| `error`            | `boolean`                        | `false`     | No       | Whether the picker is in error state (inherited from InputErrorMixin)  |
| `errormsg`         | `string`                         | `undefined` | No       | Error message to display (inherited from InputErrorMixin)              |
| `successmsg`       | `string`                         | `undefined` | No       | Success message to display (inherited from InputErrorMixin)            |
| `theme`            | `MjoColorPickerTheme`            | `undefined` | No       | Custom theme object for the picker (inherited from ThemeMixin)         |
| `aria-describedby` | `string`                         | `null`      | No       | ID of element describing the color picker                              |

## Public Methods

| Method                       | Parameters | Return    | Description                                                       |
| ---------------------------- | ---------- | --------- | ----------------------------------------------------------------- |
| `getValue()`                 | -          | `string`  | Returns the current color value in the specified format           |
| `setValue(value: string)`    | `value`    | `void`    | Sets the color value and converts it to the current format        |
| `click()`                    | -          | `void`    | Opens the native color picker dialog                              |
| `focus()`                    | -          | `void`    | Gives focus to the color picker input                             |
| `blur()`                     | -          | `void`    | Removes focus from the color picker input                         |
| `getFormattedValue(format)`  | `format`   | `string`  | Returns the current color value converted to the specified format |
| `reportValidity()`           | -          | `boolean` | Validates the picker and displays validation messages             |
| `setCustomValidity(message)` | `message`  | `void`    | Sets a custom validation message                                  |

## Events

| Event                            | Type                              | Description                                      | Detail Properties                                                                                |
| -------------------------------- | --------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `change`                         | `Event`                           | Standard HTML change event when color is changed | -                                                                                                |
| `input`                          | `InputEvent`                      | Standard HTML input event during color changes   | -                                                                                                |
| `mjo-color-picker:change`        | `MjoColorPickerChangeEvent`       | Fired when the color selection is finalized      | `element: MjoColorPicker`, `value: string`, `format: ColorFormat`                                |
| `mjo-color-picker:input`         | `MjoColorPickerInputEvent`        | Fired during color value changes                 | `element: MjoColorPicker`, `value: string`, `format: ColorFormat`                                |
| `mjo-color-picker:focus`         | `MjoColorPickerFocusEvent`        | Fired when the color picker gains focus          | `element: MjoColorPicker`                                                                        |
| `mjo-color-picker:blur`          | `MjoColorPickerBlurEvent`         | Fired when the color picker loses focus          | `element: MjoColorPicker`                                                                        |
| `mjo-color-picker:format-change` | `MjoColorPickerFormatChangeEvent` | Fired when the color format is changed           | `element: MjoColorPicker`, `format: ColorFormat`, `previousFormat: ColorFormat`, `value: string` |

## CSS Variables

| Variable                                | Description                      | Default                                                                  |
| --------------------------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `--mjo-color-picker-size-small`         | Size when size="small"           | `20px`                                                                   |
| `--mjo-color-picker-size-medium`        | Size when size="medium"          | `28px`                                                                   |
| `--mjo-color-picker-size-large`         | Size when size="large"           | `36px`                                                                   |
| `--mjo-color-picker-border-style`       | Border style                     | `var(--mjo-input-border-style, solid)`                                   |
| `--mjo-color-picker-border-width`       | Border width                     | `var(--mjo-input-border-width, 1px)`                                     |
| `--mjo-color-picker-border-color`       | Border color in default state    | `var(--mjo-input-border-color, var(--mjo-border-color, #dddddd))`        |
| `--mjo-color-picker-border-color-focus` | Border color on focus            | `var(--mjo-input-border-color-focus, var(--mjo-primary-color, #1aa8ed))` |
| `--mjo-color-picker-box-shadow`         | Box shadow in default state      | `var(--mjo-input-box-shadow, none)`                                      |
| `--mjo-color-picker-box-shadow-focus`   | Box shadow on focus              | `var(--mjo-input-box-shadow-focus, 0 0 0 2px rgba(29, 127, 219, 0.2))`   |
| `--mjo-color-picker-border-radius`      | Border radius                    | `var(--mjo-input-border-radius, var(--mjo-radius-medium, 5px))`          |
| `--mjo-color-picker-transition`         | Transition for border and shadow | `border-color 0.2s ease, box-shadow 0.2s ease`                           |
| `--mjo-color-picker-value-color`        | Color of the value display text  | `var(--mjo-foreground-color-low, #1f2937)`                               |
| `--mjo-color-picker-value-font-size`    | Font size of the value display   | `0.75rem`                                                                |
| `--mjo-color-picker-value-font-weight`  | Font weight of the value display | `500`                                                                    |
| `--mjo-color-picker-label-font-size`    | Label font size                  | `calc(1em * 0.8)`                                                        |
| `--mjo-color-picker-label-font-weight`  | Label font weight                | `normal`                                                                 |
| `--mjo-color-picker-label-color`        | Label text color                 | `currentColor`                                                           |

## CSS Parts

| Part                          | Description                     | Element                    |
| ----------------------------- | ------------------------------- | -------------------------- |
| `container`                   | The main color picker container | `.container`               |
| `color-picker`                | The visual color display area   | `.color-picker`            |
| `value-display`               | The color value text display    | `.value-display`           |
| `label-container`             | The label container             | `mjoint-input-label`       |
| `label-truncate-container`    | The label truncate container    | `mjoint-input-label`       |
| `label-truncate-wrapper`      | The label truncate wrapper      | `mjoint-input-label`       |
| `helper-text-container`       | The helper text container       | `mjoint-input-helper-text` |
| `helper-text-typography`      | The helper text typography      | `mjoint-input-helper-text` |
| `helper-text-error-message`   | The error message container     | `mjoint-input-helper-text` |
| `helper-text-success-message` | The success message container   | `mjoint-input-helper-text` |
| `helper-text-icon`            | The helper text icon            | `mjoint-input-helper-text` |

## Accessibility

### ARIA Attributes

The component automatically manages ARIA attributes:

- `aria-label`: Computed from explicit `ariaLabel`, `label` prop, or defaults to "Color picker"
- `aria-invalid`: Set to "true" when in error state
- `aria-required`: Set when `required` is true
- `aria-describedby`: Links to helper text and custom descriptions
- `aria-errormessage`: Links to error message when present

### Screen Reader Support

- Color changes are announced via live region with the format "Color changed to [formatted value]"
- The value display has `aria-live="polite"` for dynamic updates
- Helper text region has `role="region"` and `aria-live="polite"`
- Error messages use `role="alert"` and `aria-live="assertive"`

### Keyboard Navigation

- **Space/Enter**: Opens the native color picker dialog
- **Tab**: Moves focus to/from the color picker
- **Escape**: Closes the native color picker dialog (browser default)

### Best Practices

- Always provide a `label` or `aria-label` for context
- Use `helperText` to guide users on color format expectations
- Consider `showValue` for users who need to see exact color values
- Provide meaningful error messages with `errormsg`
- Use appropriate `format` based on your use case (hex for web, rgb for design tools)

### High Contrast Mode

The component includes styles for high contrast mode:

- Increased border widths (2px default, 3px on focus)
- Enhanced visual distinction between states

### Reduced Motion

Respects `prefers-reduced-motion` by disabling transitions when requested.

## Usage Examples

### Basic Usage

```html
<mjo-color-picker label="Background Color" value="#1aa8ed"></mjo-color-picker>
```

### With Value Display and Different Format

```html
<mjo-color-picker label="Text Color" format="rgb" value="rgb(26, 168, 237)" showValue></mjo-color-picker>
```

### Rounded Picker with Different Sizes

```html
<!-- Small rounded picker -->
<mjo-color-picker size="small" rounded value="#7dc717"></mjo-color-picker>

<!-- Medium rounded picker (default) -->
<mjo-color-picker rounded value="#1aa8ed"></mjo-color-picker>

<!-- Large rounded picker -->
<mjo-color-picker size="large" rounded value="#d81717"></mjo-color-picker>
```

### With Helper Text and Form Integration

```html
<mjo-form>
    <mjo-color-picker name="primary-color" label="Primary Color" helperText="Choose your brand's primary color" value="#1aa8ed" required></mjo-color-picker>
</mjo-form>
```

### With Validation

```html
<mjo-color-picker label="Theme Color" value="#1aa8ed" errormsg="Please select a valid color" error></mjo-color-picker>
```

### Programmatic Color Format Conversion

```typescript
const picker = document.querySelector("mjo-color-picker");

// Get current value
console.log(picker.getValue()); // "#1aa8ed"

// Get value in different format
console.log(picker.getFormattedValue("rgb")); // "rgb(26, 168, 237)"
console.log(picker.getFormattedValue("hsl")); // "hsl(198, 83%, 52%)"
console.log(picker.getFormattedValue("hwb")); // "hwb(198 10% 7%)"

// Change format dynamically
picker.format = "rgba";
console.log(picker.value); // "rgba(26, 168, 237, 1)"
```

### Event Handling

```typescript
const picker = document.querySelector("mjo-color-picker");

// Listen to color changes
picker.addEventListener("mjo-color-picker:change", (e) => {
    console.log("Color changed:", e.detail.value);
    console.log("Format:", e.detail.format);
});

// Listen to format changes
picker.addEventListener("mjo-color-picker:format-change", (e) => {
    console.log("Format changed from", e.detail.previousFormat, "to", e.detail.format);
    console.log("New value:", e.detail.value);
});

// Listen to real-time input
picker.addEventListener("mjo-color-picker:input", (e) => {
    console.log("Color input:", e.detail.value);
});
```

### Programmatic Control

```typescript
const picker = document.querySelector("mjo-color-picker");

// Set color programmatically (automatically converts to current format)
picker.setValue("#ff0000");

// Open color picker dialog
picker.click();

// Focus the picker
picker.focus();

// Validate
if (!picker.reportValidity()) {
    console.log("Validation failed");
}
```

### Custom Styling with CSS Variables

```html
<style>
    .custom-picker {
        --mjo-color-picker-size-medium: 40px;
        --mjo-color-picker-border-width: 2px;
        --mjo-color-picker-border-radius: 8px;
        --mjo-color-picker-border-color: #333;
        --mjo-color-picker-border-color-focus: #1aa8ed;
        --mjo-color-picker-value-font-size: 0.875rem;
        --mjo-color-picker-value-font-weight: 600;
    }
</style>

<mjo-color-picker class="custom-picker" label="Custom Styled Picker" value="#1aa8ed" showValue></mjo-color-picker>
```

### Using CSS Parts

```html
<style>
    mjo-color-picker::part(container) {
        border-width: 3px;
        border-style: dashed;
    }

    mjo-color-picker::part(value-display) {
        text-transform: uppercase;
        font-family: monospace;
    }

    mjo-color-picker::part(label-container) {
        font-weight: 600;
    }
</style>

<mjo-color-picker label="Styled Picker" value="#1aa8ed" showValue></mjo-color-picker>
```

## Additional Notes

### Supported Color Formats

The `format` property accepts the following values (via `ColorFormat` type):

- `hex`: Hexadecimal format (e.g., `#1aa8ed`)
- `hexalpha`: Hexadecimal with alpha channel (e.g., `#1aa8edff`)
- `rgb`: RGB format (e.g., `rgb(26, 168, 237)`)
- `rgba`: RGB with alpha channel (e.g., `rgba(26, 168, 237, 1)`)
- `hsl`: HSL format (e.g., `hsl(198, 83%, 52%)`)
- `hsla`: HSL with alpha channel (e.g., `hsla(198, 83%, 52%, 1)`)
- `hwb`: HWB format (e.g., `hwb(198 10% 7%)`)
- `oklch`: OKLch format (e.g., `oklch(0.64 0.18 232)`)
- `lab`: Lab format (e.g., `lab(60 -5 -50)`)
- `lch`: Lch format (e.g., `lch(60 50 280)`)
- `oklab`: OKLab format (e.g., `oklab(0.64 -0.08 -0.13)`)
- `color`: CSS color() function format

### Browser Compatibility

The component uses the native HTML5 `<input type="color">` which:

- Is widely supported in modern browsers
- Always returns hex format internally (converted automatically)
- Opens the browser's native color picker dialog

### Form Integration

The component integrates seamlessly with `mjo-form`:

- Automatically registers with parent form
- Participates in form validation
- Value is included in form submission
- Supports `required` attribute validation

### Theme Integration

The component uses `ThemeMixin` to support:

- Global theme variables via `--mjo-*` CSS variables
- Server-side rendering theme support
- Dynamic theme switching
- Fallback to default values

### Performance Considerations

- Color conversion is performed on-demand
- Visual updates are optimized to prevent unnecessary reflows
- Screen reader announcements are debounced to prevent spam
