# mjo-checkbox

Configurable, theme-aware checkbox component with form integration, validation support, and customizable styling through multiple mixins including FormMixin, InputErrorMixin, and ThemeMixin.

## HTML Usage

```html
<mjo-checkbox name="terms" value="accepted" label="I accept the terms and conditions"></mjo-checkbox>
<mjo-checkbox name="newsletter" value="subscribe" label="Subscribe to newsletter" checked></mjo-checkbox>
<mjo-checkbox name="notifications" value="enabled" label="Enable notifications" color="secondary"></mjo-checkbox>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-checkbox";

@customElement("example-checkbox-basic")
export class ExampleCheckboxBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-checkbox label="Basic checkbox" name="basic" value="1"></mjo-checkbox>
                <mjo-checkbox label="Checked by default" name="checked" value="1" checked></mjo-checkbox>
                <mjo-checkbox label="Secondary color" name="secondary" value="1" color="secondary"></mjo-checkbox>
                <mjo-checkbox label="Disabled checkbox" name="disabled" value="1" disabled></mjo-checkbox>
                <mjo-checkbox label="Disabled and checked" name="disabled-checked" value="1" disabled checked></mjo-checkbox>
            </div>
        `;
    }
}
```

## Colors and States Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-checkbox-states")
export class ExampleCheckboxStates extends LitElement {
    @state() private isDisabled = false;

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Colors</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-checkbox label="Primary color (default)" name="primary" value="1" color="primary" checked></mjo-checkbox>
                        <mjo-checkbox label="Secondary color" name="secondary" value="1" color="secondary" checked></mjo-checkbox>
                    </div>
                </div>

                <div>
                    <h4>Interactive States</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
                        <mjo-checkbox label="Toggle me" name="interactive1" value="1" ?disabled=${this.isDisabled}></mjo-checkbox>
                        <mjo-checkbox label="I'm checked" name="interactive2" value="1" checked ?disabled=${this.isDisabled}></mjo-checkbox>
                        <mjo-checkbox label="Secondary disabled" name="interactive3" value="1" color="secondary" ?disabled=${this.isDisabled}></mjo-checkbox>
                    </div>
                    <mjo-button @click=${this.toggleDisabled} variant="ghost"> ${this.isDisabled ? "Enable All" : "Disable All"} </mjo-button>
                </div>
            </div>
        `;
    }
}
```

## Helper Text and Error States Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-checkbox-messages")
export class ExampleCheckboxMessages extends LitElement {
    @state() private showError = false;
    @state() private showSuccess = false;

    private toggleError() {
        this.showError = !this.showError;
        if (this.showError) this.showSuccess = false;
    }

    private toggleSuccess() {
        this.showSuccess = !this.showSuccess;
        if (this.showSuccess) this.showError = false;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Helper Text</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-checkbox
                            label="Terms and Conditions"
                            name="terms"
                            value="accepted"
                            helperText="Please read and accept our terms and conditions to continue."
                        ></mjo-checkbox>
                        <mjo-checkbox
                            label="Newsletter Subscription"
                            name="newsletter"
                            value="subscribe"
                            helperText="Receive updates about new features and promotions."
                            checked
                        ></mjo-checkbox>
                    </div>
                </div>

                <div>
                    <h4>Error and Success States</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
                        <mjo-checkbox
                            label="Required checkbox"
                            name="required"
                            value="1"
                            helperText="This field is required"
                            ?error=${this.showError}
                            errormsg=${this.showError ? "You must check this box to continue" : undefined}
                            ?success=${this.showSuccess}
                            successmsg=${this.showSuccess ? "Thank you for accepting!" : undefined}
                        ></mjo-checkbox>
                    </div>

                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-button @click=${this.toggleError} variant="ghost" color="error" size="small">
                            ${this.showError ? "Hide Error" : "Show Error"}
                        </mjo-button>
                        <mjo-button @click=${this.toggleSuccess} variant="ghost" color="success" size="small">
                            ${this.showSuccess ? "Hide Success" : "Show Success"}
                        </mjo-button>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Checkbox Groups Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-checkbox-groups")
export class ExampleCheckboxGroups extends LitElement {
    @state() private selectedFeatures: string[] = ["notifications"];
    @state() private selectedCategories: string[] = [];

    private handleFeatureChange(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const value = checkbox.value;

        if (checkbox.checked) {
            this.selectedFeatures = [...this.selectedFeatures, value];
        } else {
            this.selectedFeatures = this.selectedFeatures.filter((f) => f !== value);
        }
    }

    private handleCategoryChange(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const value = checkbox.value;

        if (checkbox.checked) {
            this.selectedCategories = [...this.selectedCategories, value];
        } else {
            this.selectedCategories = this.selectedCategories.filter((c) => c !== value);
        }
    }

    private selectAllFeatures() {
        this.selectedFeatures = ["notifications", "darkMode", "autoSave", "analytics"];
    }

    private clearAllFeatures() {
        this.selectedFeatures = [];
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Features Selection</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
                        <mjo-checkbox
                            label="Push Notifications"
                            name="features"
                            value="notifications"
                            checkgroup="app-features"
                            ?checked=${this.selectedFeatures.includes("notifications")}
                            @change=${this.handleFeatureChange}
                            helperText="Receive push notifications for important updates"
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Dark Mode"
                            name="features"
                            value="darkMode"
                            checkgroup="app-features"
                            ?checked=${this.selectedFeatures.includes("darkMode")}
                            @change=${this.handleFeatureChange}
                            helperText="Use dark theme for better night viewing"
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Auto Save"
                            name="features"
                            value="autoSave"
                            checkgroup="app-features"
                            ?checked=${this.selectedFeatures.includes("autoSave")}
                            @change=${this.handleFeatureChange}
                            helperText="Automatically save your work every 30 seconds"
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Usage Analytics"
                            name="features"
                            value="analytics"
                            checkgroup="app-features"
                            ?checked=${this.selectedFeatures.includes("analytics")}
                            @change=${this.handleFeatureChange}
                            helperText="Help us improve by sharing anonymous usage data"
                        ></mjo-checkbox>
                    </div>

                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <mjo-button @click=${this.selectAllFeatures} variant="ghost" size="small"> Select All </mjo-button>
                        <mjo-button @click=${this.clearAllFeatures} variant="ghost" size="small"> Clear All </mjo-button>
                    </div>

                    <p style="margin: 0; font-size: 0.9rem; color: #6c757d;">
                        Selected: ${this.selectedFeatures.length > 0 ? this.selectedFeatures.join(", ") : "None"}
                    </p>
                </div>

                <div>
                    <h4>Content Categories</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <mjo-checkbox
                            label="Technology"
                            name="categories"
                            value="tech"
                            color="secondary"
                            ?checked=${this.selectedCategories.includes("tech")}
                            @change=${this.handleCategoryChange}
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Design"
                            name="categories"
                            value="design"
                            color="secondary"
                            ?checked=${this.selectedCategories.includes("design")}
                            @change=${this.handleCategoryChange}
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Business"
                            name="categories"
                            value="business"
                            color="secondary"
                            ?checked=${this.selectedCategories.includes("business")}
                            @change=${this.handleCategoryChange}
                        ></mjo-checkbox>
                    </div>

                    <p style="margin: 1rem 0 0 0; font-size: 0.9rem; color: #6c757d;">
                        Selected categories: ${this.selectedCategories.length > 0 ? this.selectedCategories.join(", ") : "None"}
                    </p>
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
import type { MjoFormResponse } from "mjo-litui/types";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-checkbox-form")
export class ExampleCheckboxForm extends LitElement {
    @state() private formData: Record<string, any> = {};
    @state() private lastSubmission: MjoFormResponse | null = null;

    private handleFormSubmit(event: CustomEvent<MjoFormResponse>) {
        this.lastSubmission = event.detail;

        // Extract form data
        const formData: Record<string, any> = {};
        if (event.detail.formData) {
            for (const [key, value] of event.detail.formData.entries()) {
                if (formData[key]) {
                    // Handle multiple values (like checkboxes with same name)
                    if (Array.isArray(formData[key])) {
                        formData[key].push(value);
                    } else {
                        formData[key] = [formData[key], value];
                    }
                } else {
                    formData[key] = value;
                }
            }
        }
        this.formData = formData;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Registration Form with Checkboxes</h4>

                    <mjo-form @submit=${this.handleFormSubmit}>
                        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                            <mjo-textfield name="email" label="Email Address" type="email" required placeholder="your@email.com"></mjo-textfield>

                            <div>
                                <h5 style="margin: 0 0 1rem 0; font-size: 1rem;">Preferences</h5>

                                <div style="display: flex; flex-direction: column; gap: 1rem;">
                                    <mjo-checkbox
                                        name="preferences"
                                        value="newsletter"
                                        label="Newsletter Subscription"
                                        helperText="Receive our weekly newsletter with latest updates"
                                        checked
                                    ></mjo-checkbox>

                                    <mjo-checkbox
                                        name="preferences"
                                        value="promotions"
                                        label="Promotional Emails"
                                        helperText="Get notified about special offers and discounts"
                                    ></mjo-checkbox>

                                    <mjo-checkbox
                                        name="preferences"
                                        value="updates"
                                        label="Product Updates"
                                        helperText="Stay informed about new features and improvements"
                                        color="secondary"
                                    ></mjo-checkbox>
                                </div>
                            </div>

                            <div style="border-top: 1px solid #e5e7eb; padding-top: 1rem;">
                                <mjo-checkbox
                                    name="terms"
                                    value="accepted"
                                    label="I accept the Terms and Conditions"
                                    required
                                    helperText="Required to create an account"
                                ></mjo-checkbox>

                                <mjo-checkbox
                                    name="privacy"
                                    value="accepted"
                                    label="I agree to the Privacy Policy"
                                    required
                                    helperText="Required to process your data"
                                ></mjo-checkbox>
                            </div>

                            <div style="display: flex; gap: 1rem; justify-content: flex-end; padding-top: 1rem;">
                                <mjo-button type="reset" variant="ghost">Reset</mjo-button>
                                <mjo-button type="submit" color="primary">Create Account</mjo-button>
                            </div>
                        </div>
                    </mjo-form>
                </div>

                ${this.lastSubmission
                    ? html`
                          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
                              <h5 style="margin: 0 0 1rem 0;">Form Submission Result</h5>

                              <div style="margin-bottom: 1rem;"><strong>Valid:</strong> ${this.lastSubmission.valid ? "✅ Yes" : "❌ No"}</div>

                              ${Object.keys(this.formData).length > 0
                                  ? html`
                                        <div>
                                            <strong>Form Data:</strong>
                                            <pre
                                                style="background: white; padding: 1rem; border-radius: 4px; margin: 0.5rem 0 0 0; overflow-x: auto; font-size: 0.9rem;"
                                            >
${JSON.stringify(this.formData, null, 2)}</pre
                                            >
                                        </div>
                                    `
                                  : ""} ${this.lastSubmission.errors && this.lastSubmission.errors.length > 0
                                  ? html`
                                        <div style="margin-top: 1rem;">
                                            <strong style="color: #dc3545;">Validation Errors:</strong>
                                            <ul style="margin: 0.5rem 0 0 1rem; color: #dc3545;">
                                                ${this.lastSubmission.errors.map((error) => html`<li>${error.field}: ${error.message}</li>`)}
                                            </ul>
                                        </div>
                                    `
                                  : ""}
                          </div>
                      `
                    : ""}
            </div>
        `;
    }
}
```

## Validation and Required Fields Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-checkbox-validation")
export class ExampleCheckboxValidation extends LitElement {
    @state() private validationResult: any = null;

    private handleSubmit(event: CustomEvent) {
        this.validationResult = event.detail;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <mjo-form @submit=${this.handleSubmit}>
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <h4 style="margin: 0;">Checkbox Validation Example</h4>

                        <mjo-checkbox
                            name="required-single"
                            value="accepted"
                            label="Required Checkbox"
                            helperText="This checkbox must be checked to proceed"
                            required
                        ></mjo-checkbox>

                        <div>
                            <h5 style="margin: 0 0 1rem 0;">Select at least 2 options (mincheck validation)</h5>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <mjo-checkbox name="options" value="option1" label="Option 1" mincheck="2"></mjo-checkbox>
                                <mjo-checkbox name="options" value="option2" label="Option 2" mincheck="2"></mjo-checkbox>
                                <mjo-checkbox name="options" value="option3" label="Option 3" mincheck="2"></mjo-checkbox>
                                <mjo-checkbox name="options" value="option4" label="Option 4" mincheck="2"></mjo-checkbox>
                            </div>
                        </div>

                        <div>
                            <h5 style="margin: 0 0 1rem 0;">Select maximum 2 options (maxcheck validation)</h5>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <mjo-checkbox name="limited-options" value="limited1" label="Limited Option 1" maxcheck="2"></mjo-checkbox>
                                <mjo-checkbox name="limited-options" value="limited2" label="Limited Option 2" maxcheck="2"></mjo-checkbox>
                                <mjo-checkbox name="limited-options" value="limited3" label="Limited Option 3" maxcheck="2"></mjo-checkbox>
                            </div>
                        </div>

                        <mjo-button type="submit" color="primary"> Validate Form </mjo-button>
                    </div>
                </mjo-form>

                ${this.validationResult
                    ? html`
                          <div
                              style="background: ${this.validationResult.valid
                                  ? "#d4edda"
                                  : "#f8d7da"}; padding: 1rem; border-radius: 8px; border: 1px solid ${this.validationResult.valid ? "#c3e6cb" : "#f5c6cb"};"
                          >
                              <h5 style="margin: 0 0 0.5rem 0; color: ${this.validationResult.valid ? "#155724" : "#721c24"};">
                                  Validation Result: ${this.validationResult.valid ? "Valid ✅" : "Invalid ❌"}
                              </h5>
                              ${this.validationResult.errors && this.validationResult.errors.length > 0
                                  ? html`
                                        <ul style="margin: 0; padding-left: 1rem; color: #721c24;">
                                            ${this.validationResult.errors.map((error: any) => html` <li>${error.field}: ${error.message}</li> `)}
                                        </ul>
                                    `
                                  : ""}
                          </div>
                      `
                    : ""}
            </div>
        `;
    }
}
```

## Custom Themes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoCheckboxTheme } from "mjo-litui/types";
import "mjo-litui/mjo-checkbox";

@customElement("example-checkbox-themes")
export class ExampleCheckboxThemes extends LitElement {
    private redTheme: MjoCheckboxTheme = {
        borderColor: "#e74c3c",
        checkedColor: "#c0392b",
        checkedBorderColor: "#c0392b",
        labelColor: "#2c3e50",
        labelFontSize: "1.1rem",
        labelFontWeight: "600",
    };

    private blueTheme: MjoCheckboxTheme = {
        borderColor: "#3498db",
        checkedColor: "#2980b9",
        checkedBorderColor: "#2980b9",
        labelColor: "#34495e",
        helperColor: "#7f8c8d",
        helperFontSize: "0.8rem",
    };

    private greenTheme: MjoCheckboxTheme = {
        borderColor: "#27ae60",
        checkedColor: "#229954",
        checkedBorderColor: "#229954",
        labelColor: "#1e8449",
        labelFontWeight: "500",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Custom Themes</h4>
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <mjo-checkbox
                            label="Red Theme Checkbox"
                            name="red"
                            value="1"
                            checked
                            helperText="Custom red color scheme"
                            .theme=${this.redTheme}
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Blue Theme Checkbox"
                            name="blue"
                            value="1"
                            checked
                            helperText="Custom blue color scheme with smaller helper text"
                            .theme=${this.blueTheme}
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Green Theme Checkbox"
                            name="green"
                            value="1"
                            checked
                            helperText="Custom green color scheme"
                            .theme=${this.greenTheme}
                        ></mjo-checkbox>

                        <mjo-checkbox
                            label="Default Theme for Comparison"
                            name="default"
                            value="1"
                            checked
                            helperText="Using default theme colors"
                        ></mjo-checkbox>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name         | Type                       | Default     | Reflects | Description                                        |
| ------------ | -------------------------- | ----------- | -------- | -------------------------------------------------- |
| `color`      | `"primary" \| "secondary"` | `"primary"` | no       | Color scheme for the checkbox when checked         |
| `checked`    | `boolean`                  | `false`     | yes      | Controls whether the checkbox is checked           |
| `disabled`   | `boolean`                  | `false`     | yes      | Disables interaction with the checkbox             |
| `label`      | `string \| undefined`      | `undefined` | no       | Text label displayed next to the checkbox          |
| `name`       | `string \| undefined`      | `undefined` | no       | Form field name for form submission                |
| `value`      | `string`                   | `""`        | no       | Value submitted when checkbox is checked           |
| `checkgroup` | `string \| undefined`      | `undefined` | yes      | Groups checkboxes together for validation purposes |
| `helperText` | `string \| undefined`      | `undefined` | no       | Helper text displayed below the checkbox           |
| `hideErrors` | `boolean`                  | `false`     | no       | Hides error messages from InputErrorMixin          |

### FormMixin Properties

| Name       | Type      | Default     | Description                                                |
| ---------- | --------- | ----------- | ---------------------------------------------------------- |
| `required` | `boolean` | `false`     | Makes the checkbox required for form validation            |
| `mincheck` | `number`  | `undefined` | Minimum number of checkboxes that must be checked in group |
| `maxcheck` | `number`  | `undefined` | Maximum number of checkboxes that can be checked in group  |

### InputErrorMixin Properties

| Name         | Type                  | Default     | Description                 |
| ------------ | --------------------- | ----------- | --------------------------- |
| `error`      | `boolean`             | `false`     | Shows error state styling   |
| `errormsg`   | `string \| undefined` | `undefined` | Error message to display    |
| `success`    | `boolean`             | `false`     | Shows success state styling |
| `successmsg` | `string \| undefined` | `undefined` | Success message to display  |

### Internal Properties

| Name   | Type     | Description                               |
| ------ | -------- | ----------------------------------------- |
| `type` | `string` | Always "checkbox" for form identification |

### Behavior Notes

-   Form integration through FormMixin automatically handles form data submission
-   The checkbox uses a custom icon (`AiFillCheckSquare`) with scale animation
-   Clicking anywhere on the label or checkbox toggles the state
-   Form validation supports required fields and group validation (mincheck/maxcheck)
-   Error and success states override helper text display

## Slots

| Slot      | Description                                                |
| --------- | ---------------------------------------------------------- |
| (default) | Currently not implemented; content provided via properties |

## Events

| Event    | Detail | Emitted When           | Notes                                              |
| -------- | ------ | ---------------------- | -------------------------------------------------- |
| `change` | Native | Checkbox state changes | Standard HTML input change event for form handling |

## Methods

| Method                          | Description                                                |
| ------------------------------- | ---------------------------------------------------------- |
| `getValue(): string`            | Returns the checkbox value if checked, empty string if not |
| `setValue(value: string): void` | Sets the checkbox value property                           |

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Border and Colors

| Variable                              | Fallback                                       | Used For               |
| ------------------------------------- | ---------------------------------------------- | ---------------------- |
| `--mjo-checkbox-border-color`         | `--mjo-foreground-color-low` → `rgb(51,51,51)` | Unchecked border color |
| `--mjo-checkbox-checked-color`        | `--mjo-primary-color`                          | Checked icon color     |
| `--mjo-checkbox-checked-border-color` | `--mjo-checkbox-checked-color`                 | Checked border color   |

### Typography

| Variable                            | Fallback  | Used For                |
| ----------------------------------- | --------- | ----------------------- |
| `--mjo-checkbox-label-color`        | `inherit` | Label text color        |
| `--mjo-checkbox-label-font-size`    | `inherit` | Label font size         |
| `--mjo-checkbox-label-font-weight`  | `inherit` | Label font weight       |
| `--mjo-checkbox-helper-color`       | `inherit` | Helper text color       |
| `--mjo-checkbox-helper-font-size`   | `inherit` | Helper text font size   |
| `--mjo-checkbox-helper-font-weight` | `inherit` | Helper text font weight |

### Spacing

| Variable            | Fallback | Used For                       |
| ------------------- | -------- | ------------------------------ |
| `--mjo-space-small` | `5px`    | Gap between checkbox and label |

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-checkbox-{property-name}`.

### MjoCheckboxTheme Interface

```ts
interface MjoCheckboxTheme {
    borderColor?: string;
    checkedColor?: string;
    checkedBorderColor?: string;
    helperColor?: string;
    helperFontSize?: string;
    helperFontWeight?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoCheckboxTheme } from "mjo-litui/types";
import "mjo-litui/mjo-checkbox";

@customElement("example-checkbox-themed")
export class ExampleCheckboxThemed extends LitElement {
    private customTheme: MjoCheckboxTheme = {
        borderColor: "#9333ea",
        checkedColor: "#7c3aed",
        checkedBorderColor: "#7c3aed",
        labelColor: "#374151",
        labelFontSize: "1.1rem",
        labelFontWeight: "500",
        helperColor: "#6b7280",
        helperFontSize: "0.875rem",
    };

    render() {
        return html`
            <mjo-checkbox
                label="Custom Themed Checkbox"
                name="themed"
                value="1"
                checked
                helperText="This checkbox uses a custom purple theme"
                .theme=${this.customTheme}
            ></mjo-checkbox>
        `;
    }
}
```

## Form Validation Integration

The checkbox integrates with `mjo-form` through FormMixin, providing these validation features:

### Required Validation

```ts
// Single required checkbox
<mjo-checkbox name="terms" value="accepted" required></mjo-checkbox>
```

### Group Validation

```ts
// Require at least 2 checkboxes to be selected
<mjo-checkbox name="preferences" value="email" mincheck="2"></mjo-checkbox>
<mjo-checkbox name="preferences" value="sms" mincheck="2"></mjo-checkbox>
<mjo-checkbox name="preferences" value="push" mincheck="2"></mjo-checkbox>

// Allow maximum 2 checkboxes to be selected
<mjo-checkbox name="extras" value="extra1" maxcheck="2"></mjo-checkbox>
<mjo-checkbox name="extras" value="extra2" maxcheck="2"></mjo-checkbox>
<mjo-checkbox name="extras" value="extra3" maxcheck="2"></mjo-checkbox>
```

### Advanced Form Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-checkbox-advanced-form")
export class ExampleCheckboxAdvancedForm extends LitElement {
    render() {
        return html`
            <mjo-form>
                <!-- Required checkbox -->
                <mjo-checkbox name="agreement" value="accepted" label="I agree to the terms" required></mjo-checkbox>

                <!-- Group with minimum selection -->
                <div>
                    <h4>Select at least 2 contact methods:</h4>
                    <mjo-checkbox name="contact" value="email" label="Email" mincheck="2"></mjo-checkbox>
                    <mjo-checkbox name="contact" value="phone" label="Phone" mincheck="2"></mjo-checkbox>
                    <mjo-checkbox name="contact" value="sms" label="SMS" mincheck="2"></mjo-checkbox>
                </div>

                <mjo-button type="submit">Submit</mjo-button>
            </mjo-form>
        `;
    }
}
```

## CSS Parts

| Part            | Description                             |
| --------------- | --------------------------------------- |
| `container`     | The main checkbox container             |
| `flexContainer` | The flex container holding all elements |
| `box`           | The checkbox visual container           |
| `checkbox`      | The actual checkbox element             |
| `label`         | The label text element                  |

## Accessibility Notes

-   The component provides proper keyboard navigation (Space to toggle)
-   Uses semantic HTML input element for screen reader compatibility
-   Label is properly associated with the checkbox for accessibility
-   Consider adding `aria-describedby` for helper text association
-   Error states should be announced to screen readers
-   For required checkboxes, consider adding `aria-required="true"`

```html
<!-- Example with enhanced accessibility -->
<mjo-checkbox
    name="newsletter"
    value="subscribe"
    label="Subscribe to newsletter"
    helperText="You can unsubscribe at any time"
    required
    aria-required="true"
    aria-describedby="newsletter-help"
></mjo-checkbox>
```

## Performance Considerations

-   The component uses efficient event delegation for click handling
-   Form integration updates are optimized to prevent unnecessary re-renders
-   Icon animations use CSS transforms for optimal performance
-   Large checkbox groups should use proper state management to avoid re-rendering all items

## Best Practices

### Form Design

-   Group related checkboxes logically
-   Use clear, descriptive labels
-   Provide helpful helper text for complex options
-   Use validation appropriately (required, mincheck, maxcheck)

### Styling

-   Maintain consistent color schemes across checkbox groups
-   Use the same theme for related checkboxes
-   Ensure sufficient contrast for accessibility
-   Test with different text lengths to ensure proper layout

### User Experience

-   Pre-check sensible defaults where appropriate
-   Use helper text to clarify the implications of checking boxes
-   Group validation feedback should be clear and actionable
-   Consider the cognitive load of too many options

## Summary

`<mjo-checkbox>` provides a comprehensive checkbox solution with built-in form integration, validation support, and extensive theming capabilities. The component seamlessly integrates with `mjo-form` for automatic form handling and validation, supports grouping with min/max selection constraints, and offers both individual and batch styling options. Use the FormMixin properties for validation, InputErrorMixin for error states, and ThemeMixin for visual customization. The component handles all standard checkbox behaviors while providing enhanced functionality for modern web applications.
