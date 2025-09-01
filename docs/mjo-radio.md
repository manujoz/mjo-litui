# mjo-radio

A customizable radio button component with enhanced accessibility, form integration, and theming support.

## Overview

The `mjo-radio` component provides a styled radio button interface with comprehensive accessibility features, form validation, and custom theming. Radio buttons are typically used in groups to allow users to select one option from multiple choices.

## Basic Usage

### HTML

```html
<mjo-radio name="option" value="value1" label="Option 1"></mjo-radio>
<mjo-radio name="option" value="value2" label="Option 2"></mjo-radio>
<mjo-radio name="option" value="value3" label="Option 3"></mjo-radio>
```

### Lit Element Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-radio";

@customElement("example-radio-basic")
export class ExampleRadioBasic extends LitElement {
    @state()
    private selectedValue = "";

    private handleChange(event: CustomEvent) {
        this.selectedValue = event.detail.value;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h4>Choose your preference:</h4>
                <mjo-radio name="preference" value="option1" label="Option 1" @mjo-radio:change=${this.handleChange}></mjo-radio>
                <mjo-radio name="preference" value="option2" label="Option 2" @mjo-radio:change=${this.handleChange}></mjo-radio>
                <mjo-radio name="preference" value="option3" label="Option 3" @mjo-radio:change=${this.handleChange}></mjo-radio>
                ${this.selectedValue ? html`<p>Selected: <strong>${this.selectedValue}</strong></p>` : ""}
            </div>
        `;
    }
}
```

## Color Variants, Sizes and States

Configure radio buttons with different colors, sizes and states:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-radio";

@customElement("example-radio-variants")
export class ExampleRadioVariants extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Primary Color -->
                <div>
                    <h4>Primary Color</h4>
                    <mjo-radio name="primary" value="option1" label="Primary Option" color="primary" checked></mjo-radio>
                </div>

                <!-- Secondary Color -->
                <div>
                    <h4>Secondary Color</h4>
                    <mjo-radio name="secondary" value="option1" label="Secondary Option" color="secondary" checked></mjo-radio>
                </div>

                <!-- Sizes -->
                <div>
                    <h4>Sizes</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-radio name="sizes" value="small" label="Small size" size="small" checked></mjo-radio>
                        <mjo-radio name="sizes" value="medium" label="Medium size (default)" size="medium"></mjo-radio>
                        <mjo-radio name="sizes" value="large" label="Large size" size="large"></mjo-radio>
                    </div>
                </div>

                <!-- Disabled States -->
                <div>
                    <h4>Disabled States</h4>
                    <mjo-radio name="disabled1" value="option1" label="Disabled Unchecked" disabled></mjo-radio>
                    <mjo-radio name="disabled2" value="option2" label="Disabled Checked" disabled checked></mjo-radio>
                </div>

                <!-- With Helper Text -->
                <div>
                    <h4>With Helper Text</h4>
                    <mjo-radio name="helper" value="option1" label="Option with help" helperText="Additional information" checked></mjo-radio>
                </div>
            </div>
        `;
    }
}
```

## Form Integration

Use radio buttons within forms with validation:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoForm } from "mjo-litui/types";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-radio";
import "mjo-litui/mjo-button";

@customElement("example-radio-form")
export class ExampleRadioForm extends LitElement {
    @query("mjo-form")
    private form!: MjoForm;

    private async handleSubmit() {
        if (!this.form.validate()) return;

        const data = this.form.getFormData();
        console.log("Form data:", data);
    }

    render() {
        return html`
            <mjo-form>
                <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
                    <h3>Survey Form</h3>

                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;"> Experience Level: <span style="color: red;">*</span> </label>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="experience" value="beginner" required helperText="0-1 years">Beginner</mjo-radio>
                            <mjo-radio name="experience" value="intermediate" required helperText="2-5 years">Intermediate</mjo-radio>
                            <mjo-radio name="experience" value="advanced" required helperText="5+ years">Advanced</mjo-radio>
                        </div>
                    </div>

                    <mjo-button @click=${this.handleSubmit}>Submit</mjo-button>
                </div>
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
import "mjo-litui/mjo-radio";

@customElement("example-radio-theming")
export class ExampleRadioTheming extends LitElement {
    render() {
        return html`
            <mjo-theme
                .theme=${{
                    components: {
                        mjoRadio: {
                            borderColor: "#d1d5db",
                            checkedColor: "#059669",
                            checkedBorderColor: "#047857",
                            labelColor: "#374151",
                            labelFontSize: "1rem",
                            labelFontWeight: "500",
                        },
                    },
                }}
            >
                <div style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem;">
                    <h3>Custom Themed Radio Buttons</h3>
                    <mjo-radio name="themed" value="option1" label="Custom Theme Option 1" checked></mjo-radio>
                    <mjo-radio name="themed" value="option2" label="Custom Theme Option 2"></mjo-radio>
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
import "mjo-litui/mjo-radio";

@customElement("example-radio-theme-mixin")
export class ExampleRadioThemeMixin extends ThemeMixin(LitElement) {
    render() {
        return html`
            <div style="padding: 2rem;">
                <h3>Component-Level Radio Theming</h3>
                <mjo-radio
                    name="custom"
                    value="option1"
                    label="Custom Component Theme"
                    .theme=${{
                        borderColor: "#fbbf24",
                        checkedColor: "#f59e0b",
                        checkedBorderColor: "#d97706",
                        labelColor: "#92400e",
                        labelFontWeight: "600",
                    }}
                    checked
                >
                </mjo-radio>
            </div>
        `;
    }
}
```

## Properties

| Name              | Type                             | Default     | Description                                           |
| ----------------- | -------------------------------- | ----------- | ----------------------------------------------------- |
| `color`           | `"primary" \| "secondary"`       | `"primary"` | Color scheme for the radio button                     |
| `checked`         | `boolean`                        | `false`     | Whether the radio button is checked                   |
| `disabled`        | `boolean`                        | `false`     | Whether the radio button is disabled                  |
| `size`            | `"small" \| "medium" \| "large"` | `"medium"`  | Size variant of the radio button                      |
| `helperText`      | `string`                         | -           | Helper text displayed below the radio button          |
| `label`           | `string`                         | -           | Label text displayed next to the radio button         |
| `name`            | `string`                         | -           | Form field name for grouping radio buttons            |
| `value`           | `string`                         | `""`        | Value associated with this radio button               |
| `hideErrors`      | `boolean`                        | `false`     | Hide validation error messages                        |
| `ariaDescribedby` | `string`                         | -           | Associates the radio with additional descriptive text |
| `theme`           | `MjoRadioTheme`                  | `{}`        | Theme configuration for the radio button              |

## Methods

| Method                                     | Description                                               |
| ------------------------------------------ | --------------------------------------------------------- |
| `getValue(): string`                       | Returns the current value if checked, empty string if not |
| `setValue(value: string): void`            | Sets the value property of the radio button               |
| `setChecked(checked: boolean): void`       | Programmatically sets the checked state                   |
| `click(): void`                            | Programmatically clicks the radio button                  |
| `toggle(): void`                           | Toggles the radio button state (same as click)            |
| `reportValidity(): boolean`                | Checks validity and reports validation state to the user  |
| `setCustomValidity(message: string): void` | Sets a custom validation message                          |

## Events

| Event              | Description                                |
| ------------------ | ------------------------------------------ |
| `change`           | Standard change event when state changes   |
| `mjo-radio:change` | Custom event with enhanced detail object   |
| `mjo-radio:focus`  | Fired when the radio button receives focus |
| `mjo-radio:blur`   | Fired when the radio button loses focus    |

### Event Details

#### MjoRadioChangeEvent

```ts
interface MjoRadioChangeEvent extends CustomEvent {
    detail: {
        element: MjoRadio;
        checked: boolean;
        value: string;
        name: string;
        previousState: {
            checked: boolean;
        };
    };
}
```

## CSS Custom Properties

| Property                           | Default                                                    | Description                      |
| ---------------------------------- | ---------------------------------------------------------- | -------------------------------- |
| `--mjo-radio-border-color`         | `var(--mjo-foreground-color-low, rgb(51, 51, 51))`         | Border color for unchecked state |
| `--mjo-radio-checked-color`        | `var(--mjo-primary-color)`                                 | Color when checked               |
| `--mjo-radio-checked-border-color` | `var(--mjo-radio-checked-color, var(--mjo-primary-color))` | Border color when checked        |
| `--mjo-radio-checked-icon-color`   | `var(--mjo-primary-foreground-color)`                      | Icon color when checked          |
| `--mjo-radio-disabled-opacity`     | `0.5`                                                      | Opacity when disabled            |
| `--mjo-radio-focus-color`          | `rgba(59, 130, 246, 0.1)`                                  | Focus indicator shadow color     |
| `--mjo-radio-focus-outline-color`  | `var(--mjo-primary-color)`                                 | Focus outline color              |
| `--mjo-radio-label-color`          | `inherit`                                                  | Label text color                 |
| `--mjo-radio-label-font-size`      | `inherit`                                                  | Label font size                  |
| `--mjo-radio-label-font-weight`    | `inherit`                                                  | Label font weight                |
| `--mjo-radio-helper-color`         | `var(--mjo-foreground-color-low)`                          | Helper text color                |
| `--mjo-radio-helper-font-size`     | `inherit`                                                  | Helper text font size            |
| `--mjo-radio-helper-font-weight`   | `inherit`                                                  | Helper text font weight          |
| `--mjo-space-small`                | `5px`                                                      | Spacing between radio and label  |

## Theme Interface

```ts
interface MjoRadioTheme {
    borderColor?: string;
    checkedColor?: string;
    checkedBorderColor?: string;
    checkedBackgroundColor?: string;
    disabledOpacity?: string;
    focusColor?: string;
    focusOutlineColor?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
}
```

## Technical Notes

-   **Radio Groups**: Multiple radio buttons with the same `name` automatically form a group where only one can be selected
-   **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
-   **Accessibility**: Full keyboard support (Tab, Space, Enter) and comprehensive ARIA attributes
-   **Theme Inheritance**: Supports both global theme through `mjo-theme` and component-specific theme through `ThemeMixin`
-   **Automatic Deselection**: When one radio in a group is selected, others are automatically deselected
-   **Enhanced Events**: Provides both standard `change` events and custom `mjo-radio:*` events with detailed information

## Accessibility

-   Full keyboard navigation support with proper focus management
-   Comprehensive ARIA attributes including `role`, `aria-checked`, `aria-label`, and `aria-describedby`
-   Visual focus indicators that respect user preferences
-   Support for screen readers and assistive technologies
-   Semantic HTML structure with proper form association
-   High contrast mode support

## Best Practices

-   Always use the same `name` attribute for radio buttons that should be grouped together
-   Provide clear and descriptive labels for accessibility
-   Use helper text to provide additional context when beneficial
-   Consider using fieldsets and legends for complex radio groups
-   Implement proper validation when used in forms
-   Keep radio groups to a reasonable size (typically 5-7 options maximum)
-   Order options logically (alphabetically, by frequency, or by logical progression)
-   Test with keyboard navigation and screen readers

For additional theming options, see the [Theming Guide](./theming.md).
