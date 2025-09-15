# mjo-color-picker

Form-integrated color picker component providing visual color selection with validation, accessibility features, and theme customization through multiple size options and styling variants.

## HTML Usage

```html
<mjo-color-picker label="Background Color" name="bgColor" value="#3b82f6"></mjo-color-picker>
<mjo-color-picker color="secondary" size="large" rounded></mjo-color-picker>
<mjo-color-picker helperText="Choose your preferred color" required></mjo-color-picker>
```

## Color Utilities

The `mjo-litui` library includes color utility functions for color format conversion and validation:

### Basic Example

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

### Available Functions

-   `convertColor(color, targetFormat)` - Convert between hex, rgb, rgba, hsl, hsla, hwb
-   `isValidColor(color)` - Validate color format
-   `toHex(color)`, `toRgb(color)`, `toHsl(color)` - Direct conversion shortcuts

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-basic")
export class ExampleColorPickerBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-color-picker label="Primary Color" value="#3b82f6"></mjo-color-picker>
                <mjo-color-picker label="Secondary Color" color="secondary" value="#6b7280"></mjo-color-picker>
                <mjo-color-picker label="Success Color" value="#10b981"></mjo-color-picker>
            </div>
        `;
    }
}
```

## Sizes and Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-sizes")
export class ExampleColorPickerSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Size Variants</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Small" size="small" value="#ef4444"></mjo-color-picker>
                        <mjo-color-picker label="Medium (Default)" size="medium" value="#3b82f6"></mjo-color-picker>
                        <mjo-color-picker label="Large" size="large" value="#10b981"></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Rounded Variants</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Small Rounded" size="small" rounded value="#f59e0b"></mjo-color-picker>
                        <mjo-color-picker label="Medium Rounded" size="medium" rounded value="#8b5cf6"></mjo-color-picker>
                        <mjo-color-picker label="Large Rounded" size="large" rounded value="#ec4899"></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Color Schemes</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Primary Color" color="primary" value="#3b82f6"></mjo-color-picker>
                        <mjo-color-picker label="Secondary Color" color="secondary" value="#6b7280"></mjo-color-picker>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Form Integration Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";

@customElement("example-color-picker-form")
export class ExampleColorPickerForm extends LitElement {
    @state() private formData: Record<string, string> = {};

    private handleFormSubmit(event: CustomEvent) {
        const { response } = event.detail;
        if (!response.error) {
            this.formData = response.data || {};
        }
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleFormSubmit}>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <mjo-textfield label="Theme Name" name="themeName" required></mjo-textfield>
                    <mjo-color-picker label="Primary Color" name="primaryColor" value="#3b82f6" required></mjo-color-picker>
                    <mjo-color-picker label="Secondary Color" name="secondaryColor" value="#6b7280"></mjo-color-picker>
                    <mjo-color-picker label="Accent Color" name="accentColor" value="#10b981"></mjo-color-picker>
                </div>
                <mjo-button type="submit">Save Theme</mjo-button>
            </mjo-form>
        `;
    }
}
```

## Validation and States Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-validation")
export class ExampleColorPickerValidation extends LitElement {
    @state() private selectedColor = "#3b82f6";
    @state() private isDisabled = false;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-color-picker label="Required Color" required helperText="This field is required"></mjo-color-picker>

                <mjo-color-picker label="Disabled Picker" ?disabled=${this.isDisabled} value="#ef4444"></mjo-color-picker>

                <mjo-color-picker
                    label="Interactive Color"
                    .value=${this.selectedColor}
                    @change=${(e: Event) => (this.selectedColor = (e.target as HTMLInputElement).value)}
                ></mjo-color-picker>

                <div style="padding: 1rem; background: ${this.selectedColor}; color: white;">Selected: ${this.selectedColor}</div>
            </div>
        `;
    }
}
```

## Color Format and Value Display Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-formats")
export class ExampleColorFormats extends LitElement {
    @state() private color = "#3b82f6";
    @state() private format: "hex" | "rgb" | "hsl" = "hex";

    private changeFormat(newFormat: "hex" | "rgb" | "hsl") {
        this.format = newFormat;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    Format:
                    <button @click=${() => this.changeFormat("hex")}>HEX</button>
                    <button @click=${() => this.changeFormat("rgb")}>RGB</button>
                    <button @click=${() => this.changeFormat("hsl")}>HSL</button>
                </div>

                <mjo-color-picker
                    label="Color Selector"
                    .value=${this.color}
                    .format=${this.format}
                    show-value
                    @change=${(e: Event) => (this.color = (e.target as HTMLInputElement).value)}
                ></mjo-color-picker>
            </div>
        `;
    }
}
```

## Accessibility Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-accessibility-features")
export class ExampleAccessibilityFeatures extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-color-picker label="Primary Color" required show-value helper-text="Choose your main theme color"></mjo-color-picker>

                <mjo-color-picker label="Accent Color" show-value aria-describedby="accent-help"></mjo-color-picker>
                <div id="accent-help">Used for highlights and call-to-action elements.</div>

                <mjo-color-picker label="Disabled Example" disabled value="#cccccc"></mjo-color-picker>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name         | Type                                                   | Default     | Reflects | Description                                                 |
| ------------ | ------------------------------------------------------ | ----------- | -------- | ----------------------------------------------------------- |
| `color`      | `"primary" \| "secondary"`                             | `"primary"` | no       | Semantic color scheme applied to the label                  |
| `disabled`   | `boolean`                                              | `false`     | yes      | Disables the color picker and applies disabled styling      |
| `helperText` | `string \| undefined`                                  | `undefined` | no       | Additional descriptive text displayed below the picker      |
| `label`      | `string \| undefined`                                  | `undefined` | no       | Text label displayed above the color picker                 |
| `name`       | `string \| undefined`                                  | `undefined` | no       | Form field name for form submission and validation          |
| `value`      | `string`                                               | `""`        | no       | Current color value in hexadecimal format (e.g., "#3b82f6") |
| `hideErrors` | `boolean`                                              | `false`     | no       | Prevents display of validation error messages               |
| `rounded`    | `boolean`                                              | `false`     | yes      | Applies circular border radius (50%) to the color picker    |
| `size`       | `"small" \| "medium" \| "large"`                       | `"medium"`  | no       | Controls the overall size of the color picker               |
| `format`     | `"hex" \| "rgb" \| "rgba" \| "hsl" \| "hsla" \| "hwb"` | `"hex"`     | no       | Output format for color values                              |
| `showValue`  | `boolean`                                              | `false`     | no       | Displays the current color value below the picker           |

### ARIA Properties for Enhanced Accessibility

| Name              | Type                                                   | Default | Description                                     |
| ----------------- | ------------------------------------------------------ | ------- | ----------------------------------------------- |
| `ariaLabel`       | `string \| null`                                       | `null`  | Accessible label for screen readers             |
| `ariaInvalid`     | `"true" \| "false" \| "grammar" \| "spelling" \| null` | `null`  | Indicates validation state for screen readers   |
| `ariaDescribedBy` | `string \| null`                                       | `null`  | IDs of elements that describe this color picker |

### Form Validation Properties (inherited from FormMixin)

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

### Behavior Notes

-   The `value` property automatically updates when user selects a color
-   Form integration is automatic when placed inside `<mjo-form>`
-   The component dispatches both standard and custom events when color changes
-   Color format conversion happens automatically based on the `format` property
-   Screen reader announcements occur when colors change
-   Validation errors are displayed automatically if `hideErrors` is false
-   Focus management follows accessibility best practices

## Slots

| Slot      | Description                                                   |
| --------- | ------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via properties |

## Events

| Event                            | Detail                                       | Emitted When                           | Notes                               |
| -------------------------------- | -------------------------------------------- | -------------------------------------- | ----------------------------------- |
| `change`                         | None                                         | User selects a new color               | Standard HTML change event, bubbles |
| `input`                          | None                                         | Color value changes during interaction | Standard HTML input event, bubbles  |
| `mjo-color-picker:change`        | `{ element, value, format, originalEvent }`  | User selects a new color               | Custom event with detailed info     |
| `mjo-color-picker:input`         | `{ element, value, format, originalEvent }`  | Color value changes during interaction | Custom event with detailed info     |
| `mjo-color-picker:format-change` | `{ element, format, previousFormat, value }` | Color format changes                   | Custom event for format tracking    |
| `mjo-color-picker:focus`         | `{ element }`                                | Color picker receives focus            | Custom focus event                  |
| `mjo-color-picker:blur`          | `{ element }`                                | Color picker loses focus               | Custom blur event                   |

## Methods

| Method              | Parameters               | Return Type | Description                               |
| ------------------- | ------------------------ | ----------- | ----------------------------------------- |
| `getValue`          | None                     | `string`    | Returns the current color value           |
| `setValue`          | `value: string`          | `void`      | Sets the color value programmatically     |
| `getFormattedValue` | `format: MjoColorFormat` | `string`    | Returns the color in the specified format |

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Size Configuration

| Variable                         | Fallback | Used For                         |
| -------------------------------- | -------- | -------------------------------- |
| `--mjo-color-picker-size-small`  | `20px`   | Width and height for small size  |
| `--mjo-color-picker-size-medium` | `28px`   | Width and height for medium size |
| `--mjo-color-picker-size-large`  | `36px`   | Width and height for large size  |

### Border and Appearance

| Variable                                | Fallback                                                                 | Used For           |
| --------------------------------------- | ------------------------------------------------------------------------ | ------------------ |
| `--mjo-color-picker-border-style`       | `var(--mjo-input-border-style, solid)`                                   | Border style       |
| `--mjo-color-picker-border-width`       | `var(--mjo-input-border-width, 1px)`                                     | Border width       |
| `--mjo-color-picker-border-color`       | `var(--mjo-input-border-color, var(--mjo-border-color, #dddddd))`        | Border color       |
| `--mjo-color-picker-border-color-focus` | `var(--mjo-input-border-color-focus, var(--mjo-primary-color, #1aa8ed))` | Focus border color |
| `--mjo-color-picker-border-radius`      | `var(--mjo-input-border-radius, var(--mjo-radius-medium, 5px))`          | Border radius      |
| `--mjo-color-picker-box-shadow`         | `var(--mjo-input-box-shadow, none)`                                      | Box shadow effect  |
| `--mjo-color-picker-box-shadow-focus`   | `var(--mjo-input-box-shadow-focus, 0 0 0 2px rgba(29, 127, 219, 0.2))`   | Focus box shadow   |
| `--mjo-color-picker-transition`         | `border-color 0.2s ease, box-shadow 0.2s ease`                           | Transition effects |

### Label Styling

| Variable                               | Fallback  | Used For          |
| -------------------------------------- | --------- | ----------------- |
| `--mjo-color-picker-label-color`       | `inherit` | Label text color  |
| `--mjo-color-picker-label-font-size`   | `inherit` | Label font size   |
| `--mjo-color-picker-label-font-weight` | `inherit` | Label font weight |

### Value Display Styling (when showValue is true)

| Variable                               | Fallback                                   | Used For                  |
| -------------------------------------- | ------------------------------------------ | ------------------------- |
| `--mjo-color-picker-value-color`       | `var(--mjo-foreground-color-low, #1f2937)` | Value display text color  |
| `--mjo-color-picker-value-font-size`   | `0.75rem`                                  | Value display font size   |
| `--mjo-color-picker-value-font-weight` | `500`                                      | Value display font weight |

### Global Integration

The component inherits from the global design system:

-   `--mjo-input-*` variables for consistent form styling
-   `--mjo-border-color` for default borders
-   `--mjo-radius` for consistent border radius
-   `--mjo-primary-color` and `--mjo-secondary-color` for focus states and labels
-   `--mjo-background-color` and `--mjo-text-color` for value display

### Accessibility Features

-   High contrast mode support with increased border widths
-   Reduced motion support for users with motion sensitivities
-   Focus indicators that meet accessibility contrast requirements

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-color-picker-{property-name}`.

### MjoColorPickerTheme Interface

```ts
interface MjoColorPickerTheme {
    // Size variables
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;

    // Border and appearance
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    borderColorFocus?: string;
    borderRadius?: string;
    boxShadow?: string;
    boxShadowFocus?: string;
    transition?: string;

    // Label styling
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;

    // Value display styling
    valueColor?: string;
    valueFontSize?: string;
    valueFontWeight?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoColorPickerTheme } from "mjo-litui/types";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-themed")
export class ExampleColorPickerThemed extends LitElement {
    private compactTheme: MjoColorPickerTheme = {
        sizeSmall: "16px",
        sizeMedium: "24px",
        sizeLarge: "32px",
        borderWidth: "1px",
        radius: "4px",
    };

    private roundedTheme: MjoColorPickerTheme = {
        borderWidth: "2px",
        radius: "50%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Theme Variations</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <!-- Default -->
                        <mjo-color-picker label="Default" value="#3b82f6"></mjo-color-picker>

                        <!-- Compact Theme -->
                        <mjo-color-picker label="Compact" value="#10b981" .theme=${this.compactTheme}></mjo-color-picker>

                        <!-- Rounded Theme -->
                        <mjo-color-picker label="Rounded" value="#ef4444" .theme=${this.roundedTheme}></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Size Comparison</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Small Default" size="small" value="#f59e0b"></mjo-color-picker>
                        <mjo-color-picker label="Small Compact" size="small" value="#f59e0b" .theme=${this.compactTheme}></mjo-color-picker>
                        <mjo-color-picker label="Medium Default" size="medium" value="#8b5cf6"></mjo-color-picker>
                        <mjo-color-picker label="Medium Rounded" size="medium" value="#8b5cf6" .theme=${this.roundedTheme}></mjo-color-picker>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## CSS Custom Properties Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-css-custom")
export class ExampleColorPickerCssCustom extends LitElement {
    static styles = css`
        .large-picker {
            --mjo-color-picker-size-medium: 40px;
            --mjo-color-picker-border-width: 3px;
            --mjo-color-picker-border-color: #3b82f6;
            --mjo-color-picker-border-radius: 8px;
            --mjo-color-picker-box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .compact-picker {
            --mjo-color-picker-size-medium: 20px;
            --mjo-color-picker-border-width: 1px;
            --mjo-color-picker-border-radius: 4px;
        }

        .rounded-picker {
            --mjo-color-picker-border-radius: 50%;
            --mjo-color-picker-border-width: 2px;
            --mjo-color-picker-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    `;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Custom Styled Pickers</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker class="large-picker" label="Large Custom" value="#3b82f6"></mjo-color-picker>
                        <mjo-color-picker class="compact-picker" label="Compact" value="#10b981"></mjo-color-picker>
                        <mjo-color-picker class="rounded-picker" label="Rounded" value="#ef4444"></mjo-color-picker>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Form Integration Notes

### mjo-form Integration

The `mjo-color-picker` seamlessly integrates with `mjo-form` through the `FormMixin`:

-   **Automatic Registration**: When placed inside `<mjo-form>`, the component automatically registers itself
-   **Validation Support**: Supports `required` validation and displays error messages
-   **Form Data**: Color values are included in form submission data using the `name` property
-   **Error Display**: Validation errors appear below the picker unless `hideErrors` is true

### Form Validation Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-button";

@customElement("example-color-picker-form-validation")
export class ExampleColorPickerFormValidation extends LitElement {
    render() {
        return html`
            <mjo-form>
                <mjo-color-picker label="Required Theme Color" name="themeColor" required helperText="Please select a theme color"></mjo-color-picker>

                <mjo-color-picker label="Optional Accent Color" name="accentColor" helperText="This field is optional"></mjo-color-picker>

                <mjo-button type="submit">Save Colors</mjo-button>
            </mjo-form>
        `;
    }
}
```

## Accessibility Notes

The `mjo-color-picker` component follows WCAG 2.1 AA guidelines and includes comprehensive accessibility features:

### Screen Reader Support

-   **Dynamic Announcements**: Color changes are announced to screen readers using live regions
-   **Descriptive Labels**: Automatic and customizable aria-label generation
-   **State Information**: `aria-invalid` and `aria-required` attributes reflect validation state
-   **Contextual Descriptions**: Support for `aria-describedby` and contextual helper text

### Keyboard Navigation

-   **Full Keyboard Support**: Complete navigation using keyboard only
-   **Focus Management**: Proper focus indicators and keyboard event handling
-   **Tab Order**: Logical tab sequence within forms

### Visual Accessibility

-   **High Contrast Support**: Enhanced borders and focus indicators in high contrast mode
-   **Reduced Motion**: Respects `prefers-reduced-motion` for users with vestibular disorders
-   **Color Independence**: Does not rely solely on color to convey information

### ARIA Properties

The component uses native Lit ARIA properties for optimal screen reader compatibility:

```html
<!-- Example with enhanced accessibility -->
<mjo-color-picker
    label="Primary Brand Color"
    name="brandColor"
    required
    helperText="Choose your main brand color (required)"
    aria-label="Primary brand color selector"
    show-value
></mjo-color-picker>
```

### Best Practices for Accessibility

1. **Always provide labels**: Use either `label` or `aria-label`
2. **Add contextual descriptions**: Use `aria-describedby` for detailed explanations
3. **Include helper text**: Provide context about color selection purpose
4. **Show color values**: Enable `showValue` to display selected color information
5. **Test with screen readers**: Verify functionality with assistive technology

## Performance Considerations

-   **Minimal DOM**: Efficient implementation using native HTML5 color input
-   **CSS Variables**: Dynamic theming without runtime style recalculation
-   **Event Handling**: Optimized event delegation for color changes
-   **Form Integration**: Lightweight integration with mjo-form system

## Design Guidelines

-   **Consistency**: Use consistent sizing within forms and component groups
-   **Labeling**: Always provide clear, descriptive labels
-   **Helper Text**: Use helper text to provide context or instructions
-   **Validation**: Include proper validation for required color selections
-   **Visual Hierarchy**: Use appropriate sizes to indicate importance

## Best Practices

### Form Design

-   Group related color pickers logically
-   Use helper text to explain color purpose
-   Implement proper validation feedback
-   Consider color accessibility for users with color vision deficiencies

### User Experience

-   Provide meaningful default values when possible
-   Show color previews in context when relevant
-   Use consistent sizing and spacing
-   Consider providing preset color options for common use cases

### Accessibility

-   Ensure labels are descriptive and context-specific
-   Provide alternative ways to identify colors (names, hex values)
-   Test with screen readers and keyboard navigation
-   Consider high contrast mode compatibility

## Summary

`<mjo-color-picker>` provides a comprehensive, accessible color selection component with advanced features:

### Key Features

-   **Multiple Color Formats**: Support for hex, rgb, rgba, hsl, hsla, and hwb formats
-   **Enhanced Accessibility**: Full WCAG 2.1 AA compliance with screen reader support
-   **Real-time Value Display**: Optional live display of selected color values
-   **Form Integration**: Seamless integration with mjo-form system and validation
-   **Custom Events**: Detailed event system for color changes and format switching
-   **Theme Customization**: Extensive CSS variable support and ThemeMixin integration
-   **Responsive Design**: Multiple size options and responsive behavior
-   **High Contrast Support**: Enhanced visibility for users with visual impairments

### Perfect For

-   **Theme Configuration**: Building color customization interfaces
-   **Design Tools**: Creating color picker components for design applications
-   **Form Inputs**: Collecting color preferences in forms and surveys
-   **Data Visualization**: Setting up color palettes for charts and graphs
-   **Accessibility-First Applications**: Where screen reader support is critical
-   **Multi-format Color Systems**: Applications requiring different color format outputs

### Accessibility Highlights

-   Dynamic screen reader announcements for color changes
-   Comprehensive ARIA attribute support
-   High contrast and reduced motion support
-   Full keyboard navigation
-   Descriptive labeling and contextual help

### Development Benefits

-   **TypeScript Support**: Full type definitions for all properties and events
-   **Custom Events**: Rich event system with detailed information
-   **Format Conversion**: Built-in color format conversion utilities
-   **Theme Integration**: Works seamlessly with the mjo-litui design system
-   **Performance Optimized**: Efficient rendering and minimal DOM updates

Use `<mjo-color-picker>` when you need a robust, accessible color selection component that integrates perfectly with forms, provides multiple output formats, and meets the highest accessibility standards while maintaining excellent user experience across all devices and assistive technologies.
