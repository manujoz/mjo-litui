# mjo-switch

Toggle switch component with customizable themes, sizes, and comprehensive form integration.

## Index

- [Use cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Public methods](#public-methods)
- [Events](#events)
- [CSS variables](#css-variables)
- [CSS parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage examples](#usage-examples)
- [Additional notes](#additional-notes)

## Use cases

The `mjo-switch` component is ideal for:

- Binary on/off settings and preferences
- Feature toggles in configuration panels
- Form controls requiring visual feedback of state
- Accessible toggle controls with keyboard support
- Settings that require immediate visual state confirmation

## Import

```javascript
import "mjo-litui/mjo-switch";
```

## Properties

| Property          | Type             | Description                                                              | Default     | Required |
| ----------------- | ---------------- | ------------------------------------------------------------------------ | ----------- | -------- |
| `color`           | `MjoSwitchColor` | Theme color variant. Possible values: `primary`, `secondary`             | `primary`   | No       |
| `size`            | `MjoSwitchSize`  | Size variant. Possible values: `small`, `medium`, `large`                | `medium`    | No       |
| `checked`         | `boolean`        | Determines if the switch is in the on state                              | `false`     | No       |
| `disabled`        | `boolean`        | Disables the switch, preventing interaction                              | `false`     | No       |
| `helperText`      | `string`         | Helper text displayed below the switch                                   | `undefined` | No       |
| `label`           | `string`         | Label text displayed above the switch                                    | `undefined` | No       |
| `name`            | `string`         | Name attribute for form submission                                       | `undefined` | No       |
| `value`           | `string`         | Value submitted when the switch is checked                               | `""`        | No       |
| `checkgroup`      | `string`         | Group identifier for related switches                                    | `undefined` | No       |
| `hideErrors`      | `boolean`        | Hides error messages from validation                                     | `false`     | No       |
| `ariaDescribedby` | `string`         | ID(s) of elements that describe the switch                               | `undefined` | No       |
| `required`        | `boolean`        | Makes the switch required for form validation (inherited from FormMixin) | `false`     | No       |
| `error`           | `boolean`        | Displays the switch in error state (inherited from InputErrorMixin)      | `false`     | No       |
| `errormsg`        | `string`         | Error message to display (inherited from InputErrorMixin)                | `undefined` | No       |
| `successmsg`      | `string`         | Success message to display (inherited from InputErrorMixin)              | `undefined` | No       |

## Public methods

| Method                       | Parameters                                    | Description                                                                                         | Return    |
| ---------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------- |
| `getValue()`                 | -                                             | Gets the current value of the switch. Returns the value property if checked, empty string otherwise | `string`  |
| `setValue(value)`            | `value: string` - The value to set            | Sets the value property of the switch                                                               | `void`    |
| `toggle()`                   | -                                             | Toggles the checked state of the switch. Does nothing if the switch is disabled                     | `void`    |
| `focus()`                    | -                                             | Programmatically focuses the switch element                                                         | `void`    |
| `blur()`                     | -                                             | Programmatically removes focus from the switch element                                              | `void`    |
| `reportValidity()`           | -                                             | Checks the validity of the switch and reports it to the user                                        | `boolean` |
| `setCustomValidity(message)` | `message: string` - Custom validation message | Sets a custom validation message for the switch                                                     | `void`    |

## Events

| Event               | Description                                                          | Type                   | Detail                                                                                                       |
| ------------------- | -------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `change`            | Standard form change event when the switch state changes             | `Event`                | -                                                                                                            |
| `mjo-switch:change` | Custom event with detailed information about the switch state change | `MjoSwitchChangeEvent` | `{ element: MjoSwitch, checked: boolean, value: string, name: string, previousState: { checked: boolean } }` |
| `mjo-switch:focus`  | Fired when the switch gains focus                                    | `MjoSwitchFocusEvent`  | `{ element: MjoSwitch }`                                                                                     |
| `mjo-switch:blur`   | Fired when the switch loses focus                                    | `MjoSwitchBlurEvent`   | `{ element: MjoSwitch }`                                                                                     |

## CSS variables

| Variable                                     | Description                                        | Default                                                                                                                    |
| -------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--mjo-switch-size-small`                    | Height for small size variant                      | `20px`                                                                                                                     |
| `--mjo-switch-size-medium`                   | Height for medium size variant                     | `28px`                                                                                                                     |
| `--mjo-switch-size-large`                    | Height for large size variant                      | `36px`                                                                                                                     |
| `--mjo-switch-background-color`              | Background color when unchecked                    | `var(--mjo-background-color-high, #dddddd)`                                                                                |
| `--mjo-switch-background-color-checked`      | Background color when checked                      | `var(--mjo-primary-color, #007bff)` for primary, `var(--mjo-secondary-color, #7dc717)` for secondary                       |
| `--mjo-switch-border-radius`                 | Border radius of the switch track                  | `50px`                                                                                                                     |
| `--mjo-switch-border-style`                  | Border style of the switch track                   | `var(--mjo-input-border-style, solid)`                                                                                     |
| `--mjo-switch-border-width`                  | Border width of the switch track                   | `var(--mjo-input-border-width, 1px)`                                                                                       |
| `--mjo-switch-border-color`                  | Border color of the switch track                   | `var(--mjo-input-border-color, var(--mjo-border-color, #dddddd))`                                                          |
| `--mjo-switch-ball-background-color`         | Background color of the switch ball when unchecked | `var(--mjo-foreground-color, #333333)`                                                                                     |
| `--mjo-switch-ball-background-color-checked` | Background color of the switch ball when checked   | `var(--mjo-primary-foreground-color, #ffffff)` for primary, `var(--mjo-secondary-foreground-color, #ffffff)` for secondary |
| `--mjo-switch-disabled-opacity`              | Opacity when the switch is disabled                | `0.5`                                                                                                                      |
| `--mjo-switch-focus-color`                   | Box shadow color on focus                          | `rgba(59, 130, 246, 0.1)`                                                                                                  |
| `--mjo-switch-focus-outline-color`           | Outline color on focus                             | `var(--mjo-primary-color)` for primary, `var(--mjo-secondary-color)` for secondary                                         |
| `--mjo-switch-label-font-size`               | Font size for the label                            | `calc(1em * 0.8)`                                                                                                          |
| `--mjo-switch-label-font-weight`             | Font weight for the label                          | `normal`                                                                                                                   |
| `--mjo-switch-label-color`                   | Color for the label                                | `currentColor`                                                                                                             |
| `--mjo-switch-helper-font-size`              | Font size for helper text                          | `inherit`                                                                                                                  |
| `--mjo-switch-helper-font-weight`            | Font weight for helper text                        | `inherit`                                                                                                                  |
| `--mjo-switch-helper-color`                  | Color for helper text                              | `var(--mjo-foreground-color-low)`                                                                                          |

## CSS parts

| Part                          | Description                           | Element                    |
| ----------------------------- | ------------------------------------- | -------------------------- |
| `container`                   | The main switch container             | `div`                      |
| `check-item`                  | The switch ball/handle container      | `div`                      |
| `check-icon`                  | The check icon inside the switch ball | `mjo-icon`                 |
| `label-container`             | The label container                   | `mjoint-input-label`       |
| `label-truncate-container`    | The label truncate container          | `mjo-text-nowrap`          |
| `label-truncate-wrapper`      | The label truncate wrapper            | `mjo-text-nowrap`          |
| `helper-text-container`       | The helper text container             | `mjoint-input-helper-text` |
| `helper-text-typography`      | The helper text typography element    | `mjo-typography`           |
| `helper-text-error-message`   | The error message container           | `div`                      |
| `helper-text-success-message` | The success message container         | `div`                      |
| `helper-text-icon`            | The helper text status icon           | `mjo-icon`                 |

## Accessibility

The `mjo-switch` component is designed with accessibility in mind:

### Best practices

- Always provide a `label` property for screen reader users to understand the switch's purpose
- Use `helperText` to provide additional context about what the switch controls
- When using in forms, ensure proper `name` attributes for form submission
- Set `required` property when the switch must be toggled for form validation

### ARIA roles and attributes

- The component uses `role="switch"` to properly identify itself to assistive technologies
- `aria-checked` reflects the current state ("true" or "false")
- `aria-label` is automatically computed from the label property, including "(required)" when applicable and "(on)"/"(off)" state indicators
- `aria-disabled` is set to "true" when the switch is disabled
- `aria-invalid` is set to "true" when the component is in error state
- `aria-describedby` can be customized to reference additional descriptive elements

### Keyboard interactions

| Key     | Action                                 |
| ------- | -------------------------------------- |
| `Space` | Toggles the switch state               |
| `Enter` | Toggles the switch state               |
| `Tab`   | Moves focus to or away from the switch |

## Usage examples

### Basic usage with label

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-switch";

@customElement("my-settings")
export class MySettings extends LitElement {
    render() {
        return html` <mjo-switch label="Enable notifications" helperText="Receive updates about your account"></mjo-switch> `;
    }
}
```

### Form integration with event handling

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-switch";
import "mjo-litui/mjo-form";
import type { MjoSwitchChangeEvent } from "mjo-litui/types/mjo-switch";

@customElement("my-preferences")
export class MyPreferences extends LitElement {
    @state() private preferences = {
        notifications: false,
        darkMode: false,
    };

    private handleSwitchChange(event: MjoSwitchChangeEvent) {
        const { name, checked } = event.detail;
        this.preferences = {
            ...this.preferences,
            [name]: checked,
        };
        console.log(`${name} changed to:`, checked);
    }

    render() {
        return html`
            <mjo-form>
                <mjo-switch
                    name="notifications"
                    label="Enable notifications"
                    ?checked=${this.preferences.notifications}
                    @mjo-switch:change=${this.handleSwitchChange}
                ></mjo-switch>

                <mjo-switch
                    name="darkMode"
                    label="Dark mode"
                    color="secondary"
                    ?checked=${this.preferences.darkMode}
                    @mjo-switch:change=${this.handleSwitchChange}
                ></mjo-switch>
            </mjo-form>
        `;
    }
}
```

### Programmatic control

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-switch";
import "mjo-litui/mjo-button";
import type { MjoSwitch } from "mjo-litui/mjo-switch";

@customElement("my-toggle-control")
export class MyToggleControl extends LitElement {
    @query("mjo-switch") switchElement!: MjoSwitch;

    private toggleSwitch() {
        this.switchElement.toggle();
    }

    private resetSwitch() {
        this.switchElement.checked = false;
    }

    render() {
        return html`
            <mjo-switch label="Feature toggle" name="feature" value="enabled"></mjo-switch>

            <mjo-button @click=${this.toggleSwitch}> Toggle </mjo-button>
            <mjo-button @click=${this.resetSwitch}> Reset </mjo-button>
        `;
    }
}
```

### Custom styling with CSS variables and parts

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-switch";

@customElement("my-custom-switch")
export class MyCustomSwitch extends LitElement {
    render() {
        return html` <mjo-switch label="Custom styled switch" size="large" color="secondary"></mjo-switch> `;
    }

    static styles = css`
        mjo-switch {
            --mjo-switch-background-color: #e0e0e0;
            --mjo-switch-background-color-checked: #00c853;
            --mjo-switch-ball-background-color: #ffffff;
            --mjo-switch-border-radius: 8px;
            --mjo-switch-label-font-weight: 600;
        }

        mjo-switch::part(container) {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        mjo-switch::part(check-icon) {
            color: #00c853;
        }
    `;
}
```

### Validation and error handling

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-switch";
import "mjo-litui/mjo-button";

@customElement("my-terms-agreement")
export class MyTermsAgreement extends LitElement {
    @state() private agreed = false;
    @state() private error = false;
    @state() private errorMsg = "";

    private handleSubmit() {
        if (!this.agreed) {
            this.error = true;
            this.errorMsg = "You must agree to the terms to continue";
        } else {
            this.error = false;
            this.errorMsg = "";
            console.log("Form submitted");
        }
    }

    private handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.agreed = target.checked;
        if (this.agreed) {
            this.error = false;
            this.errorMsg = "";
        }
    }

    render() {
        return html`
            <mjo-switch
                name="terms"
                label="I agree to the terms and conditions"
                ?checked=${this.agreed}
                ?required=${true}
                ?error=${this.error}
                .errormsg=${this.errorMsg}
                @change=${this.handleChange}
            ></mjo-switch>

            <mjo-button @click=${this.handleSubmit}> Submit </mjo-button>
        `;
    }
}
```

## Additional notes

- The switch includes a checkmark icon that appears when toggled on, providing clear visual feedback
- The component supports reduced motion preferences through CSS media queries
- High contrast mode support is built-in with enhanced borders and outlines
- The switch automatically manages form data when used within a form context via the FormMixin
- The internal checkbox input is hidden from accessibility tools (`aria-hidden="true"`) as the switch role on the container provides proper semantics
- When disabled, all interaction methods (click, keyboard, focus) are blocked
- The component properly handles focus management, allowing programmatic focus control while respecting the disabled state
