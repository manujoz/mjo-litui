# mjo-radio

A customizable radio button component with enhanced accessibility, form integration, and theming support.

## Overview

The `mjo-radio` component provides a styled radio button interface with comprehensive accessibility features, form validation, and custom theming. Radio buttons are typically used in groups to allow users to select one option from multiple choices.

## HTML Usage

```html
<mjo-radio name="option" value="value1" label="Option 1"></mjo-radio>
<mjo-radio name="option" value="value2" label="Option 2" checked></mjo-radio>
<mjo-radio name="option" value="value3" label="Option 3" disabled></mjo-radio>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-radio";

@customElement("example-radio-basic")
export class ExampleRadioBasic extends LitElement {
    @state() private selectedValue = "";

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

## Colors, Sizes and States

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-radio";

@customElement("example-radio-variants")
export class ExampleRadioVariants extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <!-- Colors -->
                <div>
                    <h4>Colors</h4>
                    <mjo-radio name="primary" value="1" label="Primary" color="primary" checked></mjo-radio>
                    <mjo-radio name="secondary" value="1" label="Secondary" color="secondary" checked></mjo-radio>
                </div>

                <!-- Sizes -->
                <div>
                    <h4>Sizes</h4>
                    <mjo-radio name="small" value="1" label="Small" size="small" checked></mjo-radio>
                    <mjo-radio name="medium" value="1" label="Medium" size="medium" checked></mjo-radio>
                    <mjo-radio name="large" value="1" label="Large" size="large" checked></mjo-radio>
                </div>

                <!-- States -->
                <div>
                    <h4>States</h4>
                    <mjo-radio name="states1" value="1" label="Normal"></mjo-radio>
                    <mjo-radio name="states2" value="1" label="Checked" checked></mjo-radio>
                    <mjo-radio name="states3" value="1" label="Disabled" disabled></mjo-radio>
                    <mjo-radio name="states4" value="1" label="Disabled Checked" disabled checked></mjo-radio>
                </div>
            </div>
        `;
    }
}
```

## Form Integration

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoForm } from "mjo-litui/types";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-radio";
import "mjo-litui/mjo-button";

@customElement("example-radio-form")
export class ExampleRadioForm extends LitElement {
    @query("mjo-form") private form!: MjoForm;

    private async handleSubmit() {
        if (!this.form.validate()) return;
        const data = this.form.getFormData();
        console.log("Form data:", data);
    }

    render() {
        return html`
            <mjo-form>
                <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
                    <h3>Survey Form</h3>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;"> Experience Level: <span style="color: red;">*</span> </label>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="experience" value="beginner" required label="Beginner" helperText="0-1 years"></mjo-radio>
                            <mjo-radio name="experience" value="intermediate" required label="Intermediate" helperText="2-5 years"></mjo-radio>
                            <mjo-radio name="experience" value="advanced" required label="Advanced" helperText="5+ years"></mjo-radio>
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

## Attributes / Properties

| Name              | Type                             | Default     | Reflects | Description                                   |
| ----------------- | -------------------------------- | ----------- | -------- | --------------------------------------------- |
| `color`           | `"primary" \| "secondary"`       | `"primary"` | no       | Color scheme for the radio button             |
| `checked`         | `boolean`                        | `false`     | yes      | Controls whether the radio button is checked  |
| `disabled`        | `boolean`                        | `false`     | yes      | Disables interaction with the radio button    |
| `size`            | `"small" \| "medium" \| "large"` | `"medium"`  | no       | Size variant of the radio button              |
| `label`           | `string \| undefined`            | `undefined` | no       | Text label displayed next to the radio button |
| `name`            | `string \| undefined`            | `undefined` | no       | Form field name for grouping radio buttons    |
| `value`           | `string`                         | `""`        | no       | Value submitted when radio button is checked  |
| `helperText`      | `string \| undefined`            | `undefined` | no       | Helper text displayed below the radio button  |
| `hideErrors`      | `boolean`                        | `false`     | no       | Hides error messages from InputErrorMixin     |
| `ariaDescribedby` | `string \| undefined`            | `undefined` | no       | ARIA describedby attribute for accessibility  |

### FormMixin Properties

Radio buttons inherit validation properties from FormMixin for form integration:

| Name         | Type      | Default | Description                                    |
| ------------ | --------- | ------- | ---------------------------------------------- |
| `required`   | `boolean` | `false` | Makes the radio button required for validation |
| `formIgnore` | `boolean` | `false` | Excludes from form data collection             |

### InputErrorMixin Properties

| Name         | Type                  | Default     | Description                 |
| ------------ | --------------------- | ----------- | --------------------------- |
| `error`      | `boolean`             | `false`     | Shows error state styling   |
| `errormsg`   | `string \| undefined` | `undefined` | Error message to display    |
| `success`    | `boolean`             | `false`     | Shows success state styling |
| `successmsg` | `string \| undefined` | `undefined` | Success message to display  |

### ThemeMixin Properties

| Name    | Type                         | Default     | Description                          |
| ------- | ---------------------------- | ----------- | ------------------------------------ |
| `theme` | `MjoRadioTheme \| undefined` | `undefined` | Theme object to customize appearance |

## Methods

| Method                                     | Description                                               | Returns   |
| ------------------------------------------ | --------------------------------------------------------- | --------- |
| `getValue(): string`                       | Returns the current value if checked, empty string if not | `string`  |
| `setValue(value: string): void`            | Sets the value property of the radio button               | `void`    |
| `setChecked(checked: boolean): void`       | Programmatically sets the checked state                   | `void`    |
| `click(): void`                            | Programmatically clicks the radio button                  | `void`    |
| `toggle(): void`                           | Toggles the radio button state (same as click)            | `void`    |
| `reportValidity(): boolean`                | Checks validity and reports validation state              | `boolean` |
| `setCustomValidity(message: string): void` | Sets a custom validation message                          | `void`    |

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
    };
}
```

## CSS Parts

| Part                              | Description                                                        |
| --------------------------------- | ------------------------------------------------------------------ |
| `container`                       | The main radio button container element                            |
| `box`                             | The visual radio button container                                  |
| `radio`                           | The radio button element itself                                    |
| `radio-inner`                     | The inner area containing the check icon                           |
| `radio-icon`                      | The check icon (via exportparts from mjo-icon)                     |
| `label-container`                 | Container for the label text                                       |
| `label-text`                      | The label typography element (via exportparts from mjo-typography) |
| `helper-text-container`           | Container for helper text (via exportparts from helper component)  |
| `helper-text-typography`          | The helper text typography (via exportparts from helper component) |
| `helper-text-msg-container`       | Container for error/success messages (via exportparts)             |
| `helper-text-msg-error-message`   | Error message element (via exportparts)                            |
| `helper-text-msg-success-message` | Success message element (via exportparts)                          |
| `helper-text-msg-icon`            | Icon in error/success messages (via exportparts)                   |

## CSS Variables

| Property                             | Default                                                    | Description                      |
| ------------------------------------ | ---------------------------------------------------------- | -------------------------------- |
| `--mjo-radio-border-color`           | `var(--mjo-foreground-color-low, rgb(51, 51, 51))`         | Border color for unchecked state |
| `--mjo-radio-checked-color`          | `var(--mjo-primary-color)`                                 | Color when checked               |
| `--mjo-radio-checked-border-color`   | `var(--mjo-radio-checked-color, var(--mjo-primary-color))` | Border color when checked        |
| `--mjo-radio-checked-icon-color`     | `var(--mjo-primary-foreground-color)`                      | Icon color when checked          |
| `--mjo-radio-disabled-opacity`       | `0.5`                                                      | Opacity when disabled            |
| `--mjo-radio-error-border-color`     | `var(--mjo-color-error)`                                   | Border color in error state      |
| `--mjo-radio-error-background-color` | `var(--mjo-color-error)`                                   | Background color in error state  |
| `--mjo-radio-error-icon-color`       | `var(--mjo-color-error-foreground)`                        | Icon color in error state        |
| `--mjo-radio-error-label-color`      | `var(--mjo-color-error)`                                   | Label color in error state       |
| `--mjo-radio-focus-color`            | `rgba(59, 130, 246, 0.1)`                                  | Focus indicator shadow color     |
| `--mjo-radio-focus-outline-color`    | `var(--mjo-primary-color)`                                 | Focus outline color              |
| `--mjo-radio-label-color`            | `inherit`                                                  | Label text color                 |
| `--mjo-radio-label-font-size`        | `inherit`                                                  | Label font size                  |
| `--mjo-radio-label-font-weight`      | `inherit`                                                  | Label font weight                |
| `--mjo-radio-helper-color`           | `var(--mjo-foreground-color-low)`                          | Helper text color                |
| `--mjo-radio-helper-font-size`       | `0.8em`                                                    | Helper text font size            |
| `--mjo-radio-helper-font-weight`     | `normal`                                                   | Helper text font weight          |
| `--mjo-space-small`                  | `5px`                                                      | Spacing between radio and label  |

## Theme Interface

```ts
interface MjoRadioTheme {
    borderColor?: string;
    checkedColor?: string;
    checkedBorderColor?: string;
    checkedIconColor?: string;
    disabledOpacity?: string;
    errorBackgroundColor?: string;
    errorBorderColor?: string;
    errorIconColor?: string;
    errorLabelColor?: string;
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

## Related Components

### mjo-radio-group

The `mjo-radio-group` component provides a container for grouping related radio buttons. It automatically discovers and manages child `mjo-radio` elements within its slot, ensuring only one radio in a group can be selected at a time.

```html
<mjo-radio-group>
    <mjo-radio name="options" value="option1" label="Option 1"></mjo-radio>
    <mjo-radio name="options" value="option2" label="Option 2"></mjo-radio>
    <mjo-radio name="options" value="option3" label="Option 3"></mjo-radio>
</mjo-radio-group>
```

## Technical Notes

- **Radio Groups**: Multiple radio buttons with the same `name` automatically form a group where only one can be selected
- **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
- **Accessibility**: Full keyboard support (Tab, Space, Enter) and comprehensive ARIA attributes
- **Theme Inheritance**: Supports both global theme through `mjo-theme` and component-specific theme through `ThemeMixin`
- **Automatic Deselection**: When one radio in a group is selected, others are automatically deselected
- **Enhanced Events**: Provides both standard `change` events and custom `mjo-radio:*` events with detailed information

## Accessibility

- Full keyboard navigation support with proper focus management
- Comprehensive ARIA attributes including `role`, `aria-checked`, `aria-label`, and `aria-describedby`
- Visual focus indicators that respect user preferences
- Support for screen readers and assistive technologies
- Semantic HTML structure with proper form association
- High contrast mode support

## Best Practices

- Always use the same `name` attribute for radio buttons that should be grouped together
- Provide clear and descriptive labels for accessibility
- Use helper text to provide additional context when beneficial
- Consider using fieldsets and legends for complex radio groups
- Implement proper validation when used in forms
- Keep radio groups to a reasonable size (typically 5-7 options maximum)
- Order options logically (alphabetically, by frequency, or by logical progression)
- Test with keyboard navigation and screen readers

For additional theming options, see the [Theming Guide](./theming.md).
