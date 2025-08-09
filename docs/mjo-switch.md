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
            <mjo-switch label="Enable feature" .checked=${this.isEnabled} @mjo-switch=${this.#handleToggle}></mjo-switch>

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
<mjo-switch label="Dark mode" helper-text="Switch to dark theme" checked></mjo-switch>
```

## Form Integration

The switch integrates seamlessly with `mjo-form` and supports validation.

```html
<mjo-form>
    <mjo-switch name="terms" label="I agree to the terms and conditions" required helper-text="You must accept the terms to continue"></mjo-switch>

    <mjo-switch name="newsletter" label="Subscribe to newsletter" helper-text="Receive updates about our products"></mjo-switch>
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
                <h3>User Preferences</h3>

                <mjo-switch name="notifications" label="Email notifications" helper-text="Receive important updates via email" checked></mjo-switch>

                <mjo-switch name="marketing" label="Marketing emails" helper-text="Receive promotional content and offers"></mjo-switch>

                <mjo-switch name="darkMode" label="Dark mode" helper-text="Use dark theme interface"></mjo-switch>

                <mjo-switch name="terms" label="I agree to the terms and conditions" required helper-text="Required to save preferences"></mjo-switch>

                <mjo-button type="submit" style="margin-top: 1rem;"> Save Preferences </mjo-button>
            </mjo-form>

            <div style="margin-top: 1rem;">
                <h4>Form Data:</h4>
                <pre>${JSON.stringify(this.formData, null, 2)}</pre>
            </div>
        `;
    }

    #handleSubmit(e: CustomEvent) {
        this.formData = e.detail.data;
        console.log("Form submitted:", e.detail);
    }
}
```

## Advanced Example with State Management

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-switch";
import "mjo-litui/mjo-card";

@customElement("example-switch-advanced")
export class ExampleSwitchAdvanced extends LitElement {
    @state() settings = {
        notifications: true,
        darkMode: false,
        autoSave: true,
        showPreview: false,
    };

    render() {
        return html`
            <mjo-card>
                <h3 slot="header">Application Settings</h3>

                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <mjo-switch
                        label="Enable notifications"
                        helper-text="Show desktop notifications for important events"
                        .checked=${this.settings.notifications}
                        @mjo-switch=${(e: CustomEvent) => this.#updateSetting("notifications", e.detail.checked)}
                    ></mjo-switch>

                    <mjo-switch
                        label="Dark mode"
                        helper-text="Use dark theme for better visibility in low light"
                        .checked=${this.settings.darkMode}
                        @mjo-switch=${(e: CustomEvent) => this.#updateSetting("darkMode", e.detail.checked)}
                    ></mjo-switch>

                    <mjo-switch
                        label="Auto-save"
                        helper-text="Automatically save changes every 5 minutes"
                        .checked=${this.settings.autoSave}
                        @mjo-switch=${(e: CustomEvent) => this.#updateSetting("autoSave", e.detail.checked)}
                    ></mjo-switch>

                    <mjo-switch
                        label="Show preview"
                        helper-text="Display preview panel while editing"
                        .checked=${this.settings.showPreview}
                        @mjo-switch=${(e: CustomEvent) => this.#updateSetting("showPreview", e.detail.checked)}
                        .disabled=${!this.settings.autoSave}
                    ></mjo-switch>
                </div>

                <div slot="footer" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--mjo-color-border);">
                    <small>Settings are saved automatically</small>
                </div>
            </mjo-card>
        `;
    }

    #updateSetting(key: string, value: boolean) {
        this.settings = { ...this.settings, [key]: value };
        this.#saveSettings();
    }

    #saveSettings() {
        // Simulate saving to backend or localStorage
        console.log("Saving settings:", this.settings);
    }
}
```

## Attributes/Properties

| Name          | Type                             | Default     | Description                             |
| ------------- | -------------------------------- | ----------- | --------------------------------------- |
| `checked`     | `boolean`                        | `false`     | Whether the switch is checked           |
| `color`       | `'primary' \| 'secondary'`       | `'primary'` | Color variant of the switch             |
| `disabled`    | `boolean`                        | `false`     | Whether the switch is disabled          |
| `helper-text` | `string`                         | `''`        | Helper text displayed below the switch  |
| `label`       | `string`                         | `''`        | Label text for the switch               |
| `name`        | `string`                         | `''`        | Name attribute for form submission      |
| `required`    | `boolean`                        | `false`     | Whether the switch is required in forms |
| `size`        | `'small' \| 'medium' \| 'large'` | `'medium'`  | Size of the switch                      |
| `value`       | `string`                         | `'on'`      | Value when the switch is checked        |

## Events

| Name         | Type                                               | Description                         |
| ------------ | -------------------------------------------------- | ----------------------------------- |
| `mjo-switch` | `CustomEvent<{ checked: boolean, value: string }>` | Fired when the switch state changes |
| `mjo-blur`   | `CustomEvent`                                      | Fired when the switch loses focus   |
| `mjo-focus`  | `CustomEvent`                                      | Fired when the switch gains focus   |

## Methods

| Name       | Type         | Description                   |
| ---------- | ------------ | ----------------------------- |
| `toggle()` | `() => void` | Toggles the switch state      |
| `focus()`  | `() => void` | Focuses the switch            |
| `blur()`   | `() => void` | Removes focus from the switch |

## CSS Custom Properties

The switch component inherits global theme tokens and provides these specific customization options:

| Name                                         | Default                           | Description                                      |
| -------------------------------------------- | --------------------------------- | ------------------------------------------------ |
| `--mjo-switch-size-medium`                   | `22px`                            | Height of medium switch                          |
| `--mjo-switch-size-small`                    | `18px`                            | Height of small switch                           |
| `--mjo-switch-size-large`                    | `26px`                            | Height of large switch                           |
| `--mjo-switch-background-color`              | `var(--mjo-color-border)`         | Background color when unchecked                  |
| `--mjo-switch-background-color-checked`      | `var(--mjo-color-primary)`        | Background color when checked                    |
| `--mjo-switch-ball-background-color`         | `var(--mjo-color-background)`     | Background color of the switch ball              |
| `--mjo-switch-ball-background-color-checked` | `var(--mjo-color-background)`     | Background color of the switch ball when checked |
| `--mjo-switch-border-radius`                 | `11px`                            | Border radius of the switch                      |
| `--mjo-switch-helper-text-color`             | `var(--mjo-color-text-secondary)` | Color of helper text                             |
| `--mjo-switch-helper-text-font-size`         | `var(--mjo-font-size-sm)`         | Font size of helper text                         |
| `--mjo-switch-label-color`                   | `var(--mjo-color-text)`           | Color of the label text                          |
| `--mjo-switch-label-font-size`               | `var(--mjo-font-size-base)`       | Font size of the label text                      |
| `--mjo-switch-label-font-weight`             | `var(--mjo-font-weight-medium)`   | Font weight of the label text                    |

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
                <mjo-switch label="Custom themed switch" helper-text="This switch uses custom theme colors" checked></mjo-switch>
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
                helper-text="Custom themed switch"
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

The switch component follows WAI-ARIA guidelines:

-   Uses `role="switch"` for proper screen reader support
-   Supports keyboard navigation (Space to toggle)
-   Provides `aria-checked` state information
-   Associates labels and helper text with `aria-describedby`
-   Maintains proper focus management

## Notes

-   The switch automatically handles animations for smooth state transitions
-   When used in forms, the switch value is included in form data when checked
-   The component supports both controlled and uncontrolled usage patterns
-   Custom checkmark icon appears when the switch is in the checked state
-   Form validation integration works with the `required` attribute
-   All theme tokens can be overridden at the component level or globally

## Related Components

-   [mjo-checkbox](./mjo-checkbox.md) - For multi-select options
-   [mjo-radio](./mjo-radio.md) - For single-select from multiple options
-   [mjo-form](./mjo-form.md) - For form integration and validation
-   [mjo-theme](./mjo-theme.md) - For theme configuration
