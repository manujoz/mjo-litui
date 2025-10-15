# mjo-checkbox

A customizable checkbox component with form integration, validation support, and indeterminate state. Supports grouping through `mjo-checkbox-group` for collective management.

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
- [mjo-checkbox-group](#mjo-checkbox-group)

## Use Cases

- Form input for boolean selections
- Terms and conditions acceptance
- Multi-selection lists with independent options
- Grouped checkboxes with collective management
- Indeterminate state for partial selections (e.g., "select all" functionality)
- Validation and error handling in forms

## Import

```typescript
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-checkbox-group"; // Optional, for grouping
```

## Properties

| Property           | Type                             | Default     | Required | Description                                                             |
| ------------------ | -------------------------------- | ----------- | -------- | ----------------------------------------------------------------------- |
| `color`            | `"primary" \| "secondary"`       | `"primary"` | No       | Color scheme of the checkbox                                            |
| `checked`          | `boolean`                        | `false`     | No       | Whether the checkbox is checked                                         |
| `disabled`         | `boolean`                        | `false`     | No       | Whether the checkbox is disabled                                        |
| `indeterminate`    | `boolean`                        | `false`     | No       | Whether the checkbox is in indeterminate state (displays dash icon)     |
| `helperText`       | `string`                         | `undefined` | No       | Helper text displayed below the checkbox                                |
| `size`             | `"small" \| "medium" \| "large"` | `"medium"`  | No       | Size of the checkbox                                                    |
| `label`            | `string`                         | `undefined` | No       | Label text for the checkbox                                             |
| `name`             | `string`                         | `undefined` | No       | Name attribute for form submission                                      |
| `value`            | `string`                         | `""`        | No       | Value attribute for form submission                                     |
| `hideErrors`       | `boolean`                        | `false`     | No       | Whether to hide error messages                                          |
| `required`         | `boolean`                        | `false`     | No       | Whether the checkbox is required (inherited from FormMixin)             |
| `error`            | `boolean`                        | `false`     | No       | Whether the checkbox is in error state (inherited from InputErrorMixin) |
| `errormsg`         | `string`                         | `undefined` | No       | Error message to display (inherited from InputErrorMixin)               |
| `successmsg`       | `string`                         | `undefined` | No       | Success message to display (inherited from InputErrorMixin)             |
| `theme`            | `MjoCheckboxTheme`               | `undefined` | No       | Custom theme object for the checkbox (inherited from ThemeMixin)        |
| `aria-describedby` | `string`                         | `undefined` | No       | ID of element describing the checkbox                                   |

## Public Methods

| Method                                     | Parameters               | Return    | Description                                             |
| ------------------------------------------ | ------------------------ | --------- | ------------------------------------------------------- |
| `getValue()`                               | -                        | `string`  | Returns the value if checked, empty string otherwise    |
| `setValue(value: string)`                  | `value: string`          | `void`    | Sets the value property                                 |
| `setChecked(checked: boolean)`             | `checked: boolean`       | `void`    | Programmatically sets the checked state                 |
| `click()`                                  | -                        | `void`    | Simulates a click, toggling the checked state           |
| `toggle()`                                 | -                        | `void`    | Toggles the checked state                               |
| `setIndeterminate(indeterminate: boolean)` | `indeterminate: boolean` | `void`    | Sets the indeterminate state                            |
| `reportValidity()`                         | -                        | `boolean` | Validates the checkbox and displays validation messages |
| `setCustomValidity(message: string)`       | `message: string`        | `void`    | Sets a custom validation message                        |

## Events

| Event                               | Type                                  | Description                                | Detail Properties                                                                                                                                                    |
| ----------------------------------- | ------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mjo-checkbox:change`               | `MjoCheckboxChangeEvent`              | Fired when the checked state changes       | `element: MjoCheckbox`, `checked: boolean`, `indeterminate: boolean`, `value: string`, `name: string`, `previousState: { checked: boolean, indeterminate: boolean }` |
| `mjo-checkbox:indeterminate-change` | `MjoCheckboxIndeterminateChangeEvent` | Fired when the indeterminate state changes | `element: MjoCheckbox`, `indeterminate: boolean`, `checked: boolean`                                                                                                 |
| `mjo-checkbox:focus`                | `MjoCheckboxFocusEvent`               | Fired when checkbox receives focus         | `element: MjoCheckbox`                                                                                                                                               |
| `mjo-checkbox:blur`                 | `MjoCheckboxBlurEvent`                | Fired when checkbox loses focus            | `element: MjoCheckbox`                                                                                                                                               |

## CSS Variables

| Variable                                        | Description                         | Default                                                                          |
| ----------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------- |
| `--mjo-checkbox-border-color`                   | Border color for unchecked state    | `var(--mjo-foreground-color-low, rgb(51, 51, 51))`                               |
| `--mjo-checkbox-border-radius`                  | Border radius of the checkbox       | `var(--mjo-radius-small, 4px)`                                                   |
| `--mjo-checkbox-checked-color`                  | Background color when checked       | `var(--mjo-primary-color)` or `var(--mjo-secondary-color)`                       |
| `--mjo-checkbox-checked-border-color`           | Border color when checked           | `var(--mjo-checkbox-checked-color)`                                              |
| `--mjo-checkbox-checked-icon-color`             | Icon color when checked             | `var(--mjo-primary-foreground-color)` or `var(--mjo-secondary-foreground-color)` |
| `--mjo-checkbox-indeterminate-color`            | Border color when indeterminate     | `var(--mjo-primary-color)` or `var(--mjo-secondary-color)`                       |
| `--mjo-checkbox-indeterminate-border-color`     | Border color when indeterminate     | `var(--mjo-checkbox-indeterminate-color)`                                        |
| `--mjo-checkbox-indeterminate-background-color` | Background color when indeterminate | `transparent`                                                                    |
| `--mjo-checkbox-indeterminate-icon-color`       | Icon color when indeterminate       | `var(--mjo-primary-color)` or `var(--mjo-secondary-color)`                       |
| `--mjo-checkbox-disabled-opacity`               | Opacity when disabled               | `0.5`                                                                            |
| `--mjo-checkbox-focus-color`                    | Shadow color on focus               | `rgba(59, 130, 246, 0.1)`                                                        |
| `--mjo-checkbox-focus-outline-color`            | Outline color on focus              | `var(--mjo-primary-color)` or `var(--mjo-secondary-color)`                       |
| `--mjo-checkbox-label-color`                    | Label text color                    | `inherit`                                                                        |
| `--mjo-checkbox-label-font-size`                | Label font size                     | `inherit`                                                                        |
| `--mjo-checkbox-label-font-weight`              | Label font weight                   | `inherit`                                                                        |
| `--mjo-checkbox-helper-color`                   | Helper text color                   | `var(--mjo-foreground-color-low)`                                                |
| `--mjo-checkbox-helper-font-size`               | Helper text font size               | `0.8em`                                                                          |
| `--mjo-checkbox-helper-font-weight`             | Helper text font weight             | `normal`                                                                         |
| `--mjo-checkbox-error-border-color`             | Border color in error state         | `var(--mjo-color-error)`                                                         |
| `--mjo-checkbox-error-background-color`         | Background color in error state     | `var(--mjo-color-error)`                                                         |
| `--mjo-checkbox-error-icon-color`               | Icon color in error state           | `var(--mjo-color-error-foreground)`                                              |
| `--mjo-checkbox-error-label-color`              | Label color in error state          | `var(--mjo-color-error)`                                                         |

## CSS Parts

| Part                              | Element                                           | Description                                            |
| --------------------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| `container`                       | `<div>`                                           | The main checkbox container                            |
| `box`                             | `<div>`                                           | The checkbox visual container                          |
| `checkbox`                        | `<div>`                                           | The checkbox itself                                    |
| `checkbox-inner`                  | `<div>`                                           | The inner area containing the check/indeterminate icon |
| `checkbox-icon`                   | `mjo-icon::part(icon)`                            | The check/indeterminate icon (via exportparts)         |
| `label-container`                 | `<div>`                                           | Container for the label text                           |
| `label-text`                      | `mjo-typography`                                  | The label typography element (via exportparts)         |
| `helper-text-container`           | `mjoint-input-helper-text::part(container)`       | Container for helper text (via exportparts)            |
| `helper-text-typography`          | `mjoint-input-helper-text::part(helper-text)`     | The helper text typography element (via exportparts)   |
| `helper-text-msg-container`       | `mjoint-input-helper-text::part(container)`       | Container for error/success messages (via exportparts) |
| `helper-text-msg-error-message`   | `mjoint-input-helper-text::part(error-message)`   | Error message element (via exportparts)                |
| `helper-text-msg-success-message` | `mjoint-input-helper-text::part(success-message)` | Success message element (via exportparts)              |
| `helper-text-msg-icon`            | `mjoint-input-helper-text::part(icon)`            | Icon in error/success messages (via exportparts)       |

## Accessibility

### ARIA Attributes

The component automatically manages ARIA attributes:

- `role="checkbox"` - Identifies the element as a checkbox
- `aria-checked` - Reflects the current state (`"true"`, `"false"`, or `"mixed"` for indeterminate)
- `aria-label` - Computed from label property, includes state information
- `aria-describedby` - Can be set to reference descriptive text
- `aria-disabled` - Set to `"true"` when disabled
- `aria-invalid` - Set to `"true"` when in error state
- `tabindex` - Set to `0` when enabled, `-1` when disabled

### Keyboard Interactions

| Key     | Action                           |
| ------- | -------------------------------- |
| `Space` | Toggles the checked state        |
| `Enter` | Toggles the checked state        |
| `Tab`   | Moves focus to/from the checkbox |

### Best Practices

- Always provide a `label` for screen reader users
- Use `helperText` to provide additional context
- Set `required` attribute for mandatory fields
- Use `aria-describedby` to reference external descriptions when needed
- Ensure sufficient color contrast for custom themes
- Group related checkboxes using `mjo-checkbox-group` with proper fieldset/legend

## Usage Examples

### Basic Usage

```html
<mjo-checkbox name="terms" value="accepted" label="I accept the terms and conditions"> </mjo-checkbox>

<mjo-checkbox name="newsletter" value="subscribe" label="Subscribe to newsletter" checked> </mjo-checkbox>
```

### Colors and Sizes

```html
<mjo-checkbox name="primary" value="1" label="Primary color" color="primary" checked> </mjo-checkbox>

<mjo-checkbox name="secondary" value="1" label="Secondary color" color="secondary" checked> </mjo-checkbox>

<mjo-checkbox name="small" value="1" label="Small size" size="small" checked> </mjo-checkbox>

<mjo-checkbox name="large" value="1" label="Large size" size="large" checked> </mjo-checkbox>
```

### Indeterminate State

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-checkbox";

@customElement("example-indeterminate")
export class ExampleIndeterminate extends LitElement {
    @state() private parentChecked = false;
    @state() private child1Checked = true;
    @state() private child2Checked = false;
    @state() private child3Checked = false;

    private updateParentState() {
        const checkedCount = [this.child1Checked, this.child2Checked, this.child3Checked].filter(Boolean).length;

        const parent = this.shadowRoot?.querySelector("#parent") as any;

        if (checkedCount === 0) {
            parent?.setChecked(false);
            parent?.setIndeterminate(false);
        } else if (checkedCount === 3) {
            parent?.setChecked(true);
            parent?.setIndeterminate(false);
        } else {
            parent?.setIndeterminate(true);
        }
    }

    private handleParentChange(e: CustomEvent) {
        const checked = e.detail.checked;
        this.child1Checked = checked;
        this.child2Checked = checked;
        this.child3Checked = checked;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <mjo-checkbox id="parent" name="parent" value="all" label="Select All Features" @mjo-checkbox:change=${this.handleParentChange}></mjo-checkbox>

                <div style="padding-left: 2rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    <mjo-checkbox
                        name="child1"
                        value="feature1"
                        label="Feature 1"
                        .checked=${this.child1Checked}
                        @mjo-checkbox:change=${(e: CustomEvent) => {
                            this.child1Checked = e.detail.checked;
                            this.updateParentState();
                        }}
                    ></mjo-checkbox>

                    <mjo-checkbox
                        name="child2"
                        value="feature2"
                        label="Feature 2"
                        .checked=${this.child2Checked}
                        @mjo-checkbox:change=${(e: CustomEvent) => {
                            this.child2Checked = e.detail.checked;
                            this.updateParentState();
                        }}
                    ></mjo-checkbox>

                    <mjo-checkbox
                        name="child3"
                        value="feature3"
                        label="Feature 3"
                        .checked=${this.child3Checked}
                        @mjo-checkbox:change=${(e: CustomEvent) => {
                            this.child3Checked = e.detail.checked;
                            this.updateParentState();
                        }}
                    ></mjo-checkbox>
                </div>
            </div>
        `;
    }
}
```

### Helper Text and Error States

```html
<mjo-checkbox name="terms" value="accepted" label="Terms and Conditions" helperText="Please read and accept our terms and conditions."></mjo-checkbox>

<mjo-checkbox
    name="required"
    value="1"
    label="Required checkbox"
    helperText="This field is required"
    error
    errormsg="You must check this option"
></mjo-checkbox>
```

### Form Integration

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-button";

@customElement("example-form")
export class ExampleForm extends LitElement {
    @state() private formData: any = null;

    private handleSubmit(e: CustomEvent) {
        this.formData = e.detail.data;
    }

    render() {
        return html`
            <mjo-form @mjo-form:submit=${this.handleSubmit}>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <mjo-checkbox name="notifications" value="email" label="Email notifications" helperText="Receive updates via email" checked></mjo-checkbox>

                    <mjo-checkbox name="terms" value="accepted" label="I accept the terms" required></mjo-checkbox>

                    <mjo-button type="submit">Submit</mjo-button>
                </div>
            </mjo-form>

            ${this.formData ? html` <pre>${JSON.stringify(this.formData, null, 2)}</pre> ` : ""}
        `;
    }
}
```

### Event Handling

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { MjoCheckboxChangeEvent } from "mjo-litui/types";
import "mjo-litui/mjo-checkbox";

@customElement("example-events")
export class ExampleEvents extends LitElement {
    @state() private eventLog: string[] = [];

    private handleChange(e: MjoCheckboxChangeEvent) {
        const { checked, value, name, previousState } = e.detail;
        this.eventLog = [`Change: ${name}=${value}, checked=${checked}, was=${previousState.checked}`, ...this.eventLog].slice(0, 5);
    }

    private handleFocus(e: CustomEvent) {
        this.eventLog = ["Focus event", ...this.eventLog].slice(0, 5);
    }

    private handleBlur(e: CustomEvent) {
        this.eventLog = ["Blur event", ...this.eventLog].slice(0, 5);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-checkbox
                    name="events"
                    value="test"
                    label="Interactive checkbox"
                    @mjo-checkbox:change=${this.handleChange}
                    @mjo-checkbox:focus=${this.handleFocus}
                    @mjo-checkbox:blur=${this.handleBlur}
                ></mjo-checkbox>

                <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
                    <strong>Event Log:</strong>
                    ${this.eventLog.map((log) => html`<div>${log}</div>`)}
                </div>
            </div>
        `;
    }
}
```

### Programmatic Control

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { MjoCheckbox } from "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-programmatic")
export class ExampleProgrammatic extends LitElement {
    @query("#controlled-checkbox") checkbox!: MjoCheckbox;

    private check() {
        this.checkbox.setChecked(true);
    }

    private uncheck() {
        this.checkbox.setChecked(false);
    }

    private toggle() {
        this.checkbox.toggle();
    }

    private setIndeterminate() {
        this.checkbox.setIndeterminate(true);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-checkbox id="controlled-checkbox" name="controlled" value="1" label="Controlled checkbox"></mjo-checkbox>

                <div style="display: flex; gap: 0.5rem;">
                    <mjo-button @click=${this.check}>Check</mjo-button>
                    <mjo-button @click=${this.uncheck}>Uncheck</mjo-button>
                    <mjo-button @click=${this.toggle}>Toggle</mjo-button>
                    <mjo-button @click=${this.setIndeterminate}>Set Indeterminate</mjo-button>
                </div>
            </div>
        `;
    }
}
```

### Custom Styling with CSS Parts

```html
<style>
    mjo-checkbox::part(checkbox) {
        border-width: 3px;
        border-radius: 8px;
    }

    mjo-checkbox::part(checkbox-icon) {
        font-size: 1.2em;
    }

    mjo-checkbox::part(label-text) {
        font-weight: 600;
        color: #2c3e50;
    }
</style>

<mjo-checkbox name="custom" value="1" label="Custom styled checkbox" checked> </mjo-checkbox>
```

### Custom Styling with CSS Variables

```html
<style>
    .custom-checkbox {
        --mjo-checkbox-border-color: #e74c3c;
        --mjo-checkbox-checked-color: #c0392b;
        --mjo-checkbox-checked-border-color: #c0392b;
        --mjo-checkbox-checked-icon-color: #fff;
        --mjo-checkbox-label-color: #2c3e50;
        --mjo-checkbox-label-font-weight: 600;
    }
</style>

<mjo-checkbox class="custom-checkbox" name="custom" value="1" label="Custom themed checkbox" checked> </mjo-checkbox>
```

## mjo-checkbox-group

A container component for grouping related `mjo-checkbox` elements. It provides collective management of checkboxes.

### Import

```typescript
import "mjo-litui/mjo-checkbox-group";
```

### Properties

The `mjo-checkbox-group` component has no public properties. It acts as a container that automatically tracks all `mjo-checkbox` elements within it.

### Public Methods

| Method                                | Parameters              | Return | Description                                                             |
| ------------------------------------- | ----------------------- | ------ | ----------------------------------------------------------------------- |
| `pushCheckbox(checkbox: MjoCheckbox)` | `checkbox: MjoCheckbox` | `void` | Adds a checkbox to the group (called automatically by child checkboxes) |

### Usage with mjo-checkbox-group

```html
<mjo-checkbox-group>
    <mjo-checkbox name="features" value="notifications" label="Push Notifications"> </mjo-checkbox>

    <mjo-checkbox name="features" value="dark-mode" label="Dark Mode" checked> </mjo-checkbox>

    <mjo-checkbox name="features" value="auto-save" label="Auto Save"> </mjo-checkbox>
</mjo-checkbox-group>
```

### Integration Example

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-checkbox-group";

@customElement("example-checkbox-group")
export class ExampleCheckboxGroup extends LitElement {
    @state() private selectedOptions: string[] = [];

    private handleChange(e: CustomEvent) {
        const checkbox = e.target as any;
        if (checkbox.checked) {
            this.selectedOptions = [...this.selectedOptions, checkbox.value];
        } else {
            this.selectedOptions = this.selectedOptions.filter((v) => v !== checkbox.value);
        }
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h4>Select your preferences:</h4>

                <mjo-checkbox-group>
                    <mjo-checkbox name="preferences" value="email" label="Email Notifications" @mjo-checkbox:change=${this.handleChange}></mjo-checkbox>

                    <mjo-checkbox name="preferences" value="sms" label="SMS Notifications" @mjo-checkbox:change=${this.handleChange}></mjo-checkbox>

                    <mjo-checkbox name="preferences" value="push" label="Push Notifications" checked @mjo-checkbox:change=${this.handleChange}></mjo-checkbox>
                </mjo-checkbox-group>

                <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
                    <strong>Selected:</strong> ${this.selectedOptions.join(", ") || "None"}
                </div>
            </div>
        `;
    }
}
```

## Notes

- The indeterminate state is visual only and does not affect form submission
- When a checkbox is in indeterminate state and clicked, it becomes checked
- The component automatically integrates with `mjo-form` for validation and data collection
- Use `mjo-checkbox-group` for semantic grouping, but it's optional for functionality
- The component supports reduced motion and high contrast modes for better accessibility
