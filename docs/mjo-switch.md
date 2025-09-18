# mjo-switch

A toggle switch component that provides an elegant way to toggle between two states. The switch features smooth animations, customizable themes, and full form integration capabilities.

## Import

```ts
import "mjo-litui/mjo-switch";
```

## Basic Usage

```html
<mjo-switch label="Enable notifications"></mjo-switch>
```

## Lit Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-switch";

@customElement("example-switch-basic")
export class ExampleSwitchBasic extends LitElement {
    @state() isEnabled = false;

    render() {
        return html`
            <mjo-switch label="Enable feature" .checked=${this.isEnabled} @mjo-switch:change=${this.#handleToggle}></mjo-switch>

            <p>Feature is ${this.isEnabled ? "enabled" : "disabled"}</p>
        `;
    }

    #handleToggle(e: CustomEvent) {
        this.isEnabled = e.detail.checked;
    }
}
```

## Switch Sizes

The switch component supports three sizes: `small`, `medium` (default), and `large`.

```html
<mjo-switch size="small" label="Small switch"></mjo-switch>
<mjo-switch size="medium" label="Medium switch"></mjo-switch>
<mjo-switch size="large" label="Large switch"></mjo-switch>
```

### Lit Example - Sizes

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-switch";

@customElement("example-switch-sizes")
export class ExampleSwitchSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-switch size="small" label="Small switch" checked></mjo-switch>
                <mjo-switch size="medium" label="Medium switch" checked></mjo-switch>
                <mjo-switch size="large" label="Large switch" checked></mjo-switch>
            </div>
        `;
    }
}
```

## Color Variants

The switch supports different color variants: `primary` (default) and `secondary`.

```html
<mjo-switch color="primary" label="Primary switch" checked></mjo-switch> <mjo-switch color="secondary" label="Secondary switch" checked></mjo-switch>
```

### Lit Example - Colors

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-switch";

@customElement("example-switch-colors")
export class ExampleSwitchColors extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-switch color="primary" label="Primary switch" checked></mjo-switch>
                <mjo-switch color="secondary" label="Secondary switch" checked></mjo-switch>
            </div>
        `;
    }
}
```

## Disabled State

Switches can be disabled to prevent user interaction.

```html
<mjo-switch label="Disabled switch" disabled></mjo-switch> <mjo-switch label="Disabled checked" checked disabled></mjo-switch>
```

## Helper Text

Provide additional context with helper text.

```html
<mjo-switch label="Dark mode" helperText="Switch to dark theme" checked></mjo-switch>
```

## Form Integration

The switch integrates seamlessly with `mjo-form` and supports validation.

```html
<mjo-form>
    <mjo-switch name="terms" label="I agree to the terms and conditions" required helperText="You must accept the terms to continue"></mjo-switch>

    <mjo-switch name="newsletter" label="Subscribe to newsletter" helperText="Receive updates about our products"></mjo-switch>
</mjo-form>
```

### Lit Example - Form Integration

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-switch";
import "mjo-litui/mjo-button";

@customElement("example-switch-form")
export class ExampleSwitchForm extends LitElement {
    @state() formData = {};

    render() {
        return html`
            <mjo-form @mjo-form-submit=${this.#handleSubmit}>
                <mjo-switch name="notifications" label="Email notifications" checked></mjo-switch>
                <mjo-switch name="terms" label="I agree to the terms" required></mjo-switch>
                <mjo-button type="submit">Save</mjo-button>
            </mjo-form>
        `;
    }

    #handleSubmit(e: CustomEvent) {
        this.formData = e.detail.data;
        console.log("Form submitted:", e.detail);
    }
}
```

## Attributes/Properties

| Name               | Type                             | Default     | Description                               |
| ------------------ | -------------------------------- | ----------- | ----------------------------------------- |
| `checked`          | `boolean`                        | `false`     | Whether the switch is checked             |
| `color`            | `'primary' \| 'secondary'`       | `'primary'` | Color variant of the switch               |
| `disabled`         | `boolean`                        | `false`     | Whether the switch is disabled            |
| `helper-text`      | `string`                         | `''`        | Helper text displayed below the switch    |
| `label`            | `string`                         | `''`        | Label text for the switch                 |
| `name`             | `string`                         | `''`        | Name attribute for form submission        |
| `required`         | `boolean`                        | `false`     | Whether the switch is required in forms   |
| `size`             | `'small' \| 'medium' \| 'large'` | `'medium'`  | Size of the switch                        |
| `value`            | `string`                         | `'on'`      | Value when the switch is checked          |
| `aria-describedby` | `string`                         | `undefined` | IDs of elements that describe the switch  |
| `checkgroup`       | `string`                         | `undefined` | Groups related switches for form handling |
| `hideErrors`       | `boolean`                        | `false`     | Whether to hide error messages            |

## Events

| Name                | Type                                                            | Description                         |
| ------------------- | --------------------------------------------------------------- | ----------------------------------- |
| `change`            | `Event`                                                         | Standard form change event          |
| `mjo-switch:change` | `CustomEvent<{ element, checked, value, name, previousState }>` | Fired when the switch state changes |
| `mjo-switch:focus`  | `CustomEvent<{ element }>`                                      | Fired when the switch gains focus   |
| `mjo-switch:blur`   | `CustomEvent<{ element }>`                                      | Fired when the switch loses focus   |

## Methods

| Name                     | Type                        | Description                            |
| ------------------------ | --------------------------- | -------------------------------------- |
| `toggle()`               | `() => void`                | Toggles the switch state               |
| `focus()`                | `() => void`                | Focuses the switch                     |
| `blur()`                 | `() => void`                | Removes focus from the switch          |
| `getValue()`             | `() => string`              | Gets the current value of the switch   |
| `setValue(value)`        | `(value: string) => void`   | Sets the value of the switch           |
| `reportValidity()`       | `() => boolean`             | Checks if the switch passes validation |
| `setCustomValidity(msg)` | `(message: string) => void` | Sets a custom validation message       |

## CSS Parts

| Name                          | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `container`                   | The main switch container                               |
| `check-item`                  | The switch ball/handle container                        |
| `label-container`             | The label container (via exportparts)                   |
| `label-truncate-container`    | The label truncate container (via exportparts)          |
| `label-truncate-wrapper`      | The label truncate wrapper (via exportparts)            |
| `check-icon`                  | The check icon inside the switch ball (via exportparts) |
| `helper-text-container`       | The helper text container (via exportparts)             |
| `helper-text-typography`      | The helper text typography element (via exportparts)    |
| `helper-text-typography-tag`  | The helper text typography tag (via exportparts)        |
| `helper-text-error-message`   | The error message container (via exportparts)           |
| `helper-text-success-message` | The success message container (via exportparts)         |
| `helper-text-icon`            | The helper text status icon (via exportparts)           |

## CSS Custom Properties

The switch component inherits global theme tokens and provides these specific customization options:

| Name                                         | Default                               | Description                                      |
| -------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| `--mjo-switch-size-medium`                   | `28px`                                | Height of medium switch                          |
| `--mjo-switch-size-small`                    | `20px`                                | Height of small switch                           |
| `--mjo-switch-size-large`                    | `36px`                                | Height of large switch                           |
| `--mjo-switch-background-color`              | `var(--mjo-background-color-high)`    | Background color when unchecked                  |
| `--mjo-switch-background-color-checked`      | `var(--mjo-primary-color)`            | Background color when checked                    |
| `--mjo-switch-ball-background-color`         | `var(--mjo-foreground-color)`         | Background color of the switch ball              |
| `--mjo-switch-ball-background-color-checked` | `var(--mjo-primary-foreground-color)` | Background color of the switch ball when checked |
| `--mjo-switch-border-radius`                 | `50px`                                | Border radius of the switch                      |
| `--mjo-switch-border-style`                  | `solid`                               | Border style of the switch                       |
| `--mjo-switch-border-width`                  | `1px`                                 | Border width of the switch                       |
| `--mjo-switch-border-color`                  | `var(--mjo-border-color)`             | Border color of the switch                       |
| `--mjo-switch-focus-color`                   | `rgba(59, 130, 246, 0.1)`             | Focus shadow color                               |
| `--mjo-switch-focus-outline-color`           | `var(--mjo-primary-color)`            | Focus outline color                              |
| `--mjo-switch-disabled-opacity`              | `0.5`                                 | Opacity when switch is disabled                  |
| `--mjo-switch-helper-color`                  | `var(--mjo-foreground-color-low)`     | Color of helper text                             |
| `--mjo-switch-helper-font-size`              | `inherit`                             | Font size of helper text                         |
| `--mjo-switch-helper-font-weight`            | `inherit`                             | Font weight of helper text                       |

## Theme Configuration

For global theme customization, use the theme configuration:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";

@customElement("example-switch-theme")
export class ExampleSwitchTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .config=${{
                    components: {
                        mjoSwitch: {
                            sizeMedium: "24px",
                            backgroundColorChecked: "#10B981",
                            ballBackgroundColor: "#FFFFFF",
                            radius: "12px",
                            helperTextColor: "#6B7280",
                            labelFontWeight: "600",
                        },
                    },
                }}
            >
                <mjo-switch label="Custom themed switch" helperText="This switch uses custom theme colors" checked></mjo-switch>
            </mjo-theme>
        `;
    }
}
```

For component-specific theming using the `theme` property:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-switch";

@customElement("example-switch-custom-theme")
export class ExampleSwitchCustomTheme extends LitElement {
    render() {
        return html`
            <mjo-switch
                label="Custom switch"
                helperText="Custom themed switch"
                .theme=${{
                    backgroundColorChecked: "#8B5CF6",
                    sizeMedium: "20px",
                    radius: "10px",
                }}
                checked
            ></mjo-switch>
        `;
    }
}
```

## Accessibility

The switch component follows WAI-ARIA guidelines and provides comprehensive accessibility support:

### ARIA Support

- Uses `role="switch"` for proper screen reader identification
- Provides `aria-checked` state information (`true`/`false`)
- Supports `aria-label` and `aria-describedby` for labeling and description
- Implements `aria-disabled` and `aria-invalid` states
- Associates helper text with the switch using `aria-describedby`

### Keyboard Navigation

- **Space** or **Enter**: Toggle the switch state
- **Tab**: Navigate to/from the switch
- Proper focus management with visual focus indicators

### Screen Reader Support

- Announces switch state changes appropriately
- Provides context about required fields
- Helper text and error messages are properly announced

### Focus Management

- Clear focus indicators with customizable colors
- Respects user's focus preferences
- Maintains focus during state changes

### Accessibility Example

```html
<mjo-switch label="Enable dark mode" helperText="Switch to dark theme for better visibility" aria-describedby="dark-mode-help" required></mjo-switch>
<div id="dark-mode-help">This setting will affect all pages in the application</div>
```

### Best Practices

1. Always provide meaningful labels
2. Use helper text for additional context
3. Group related switches with fieldsets when appropriate
4. Test with keyboard-only navigation
5. Verify screen reader announcements

## Notes

- The switch automatically handles smooth animations with support for `prefers-reduced-motion`
- High contrast mode is supported with enhanced visual indicators
- When used in forms, the switch value is included in form data when checked
- The component supports both controlled and uncontrolled usage patterns
- Custom checkmark icon appears when the switch is in the checked state
- Form validation integration works with the `required` attribute
- All theme tokens can be overridden at the component level or globally
- Full keyboard navigation support follows WCAG guidelines
- Screen reader compatibility with proper ARIA attributes

## Related Components

- [mjo-checkbox](./mjo-checkbox.md) - For multi-select options
- [mjo-radio](./mjo-radio.md) - For single-select from multiple options
- [mjo-form](./mjo-form.md) - For form integration and validation
- [mjo-theme](./mjo-theme.md) - For theme configuration
