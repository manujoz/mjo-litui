# mjo-radio

A customizable radio button component with form integration and theming support.

## Overview

The `mjo-radio` component provides a styled radio button interface with support for form validation, custom theming, and accessibility features. Radio buttons are typically used in groups to allow users to select one option from multiple choices.

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

    private handleChange(event: Event) {
        const radio = event.target as any;
        this.selectedValue = radio.value;
        console.log("Selected:", this.selectedValue);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h4>Choose your favorite framework:</h4>

                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <mjo-radio name="framework" value="lit" label="Lit" @change=${this.handleChange}> </mjo-radio>

                    <mjo-radio name="framework" value="react" label="React" @change=${this.handleChange}> </mjo-radio>

                    <mjo-radio name="framework" value="vue" label="Vue" @change=${this.handleChange}> </mjo-radio>

                    <mjo-radio name="framework" value="angular" label="Angular" @change=${this.handleChange}> </mjo-radio>
                </div>

                ${this.selectedValue ? html` <p>Selected: <strong>${this.selectedValue}</strong></p> ` : ""}
            </div>
        `;
    }
}
```

## Radio Button States

Configure radio buttons with different states and styling:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-radio";

@customElement("example-radio-states")
export class ExampleRadioStates extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Default State -->
                <div>
                    <h4>Default Radio Buttons</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-radio name="default" value="option1" label="Option 1"></mjo-radio>
                        <mjo-radio name="default" value="option2" label="Option 2" checked></mjo-radio>
                        <mjo-radio name="default" value="option3" label="Option 3"></mjo-radio>
                    </div>
                </div>

                <!-- Disabled State -->
                <div>
                    <h4>Disabled Radio Buttons</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-radio name="disabled" value="option1" label="Disabled Option 1" disabled></mjo-radio>
                        <mjo-radio name="disabled" value="option2" label="Disabled Option 2" disabled checked></mjo-radio>
                        <mjo-radio name="disabled" value="option3" label="Disabled Option 3" disabled></mjo-radio>
                    </div>
                </div>

                <!-- With Helper Text -->
                <div>
                    <h4>Radio Buttons with Helper Text</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-radio name="helper" value="basic" label="Basic Plan" helperText="Free with limited features"> </mjo-radio>
                        <mjo-radio name="helper" value="pro" label="Pro Plan" helperText="$9.99/month with advanced features"> </mjo-radio>
                        <mjo-radio name="helper" value="enterprise" label="Enterprise Plan" helperText="Custom pricing for large teams"> </mjo-radio>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Color Variants

Use different color schemes for radio buttons:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-radio";

@customElement("example-radio-colors")
export class ExampleRadioColors extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <!-- Primary Color -->
                <div>
                    <h4>Primary Color</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-radio name="primary" value="option1" label="Primary Option 1" color="primary"></mjo-radio>
                        <mjo-radio name="primary" value="option2" label="Primary Option 2" color="primary" checked></mjo-radio>
                        <mjo-radio name="primary" value="option3" label="Primary Option 3" color="primary"></mjo-radio>
                    </div>
                </div>

                <!-- Secondary Color -->
                <div>
                    <h4>Secondary Color</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-radio name="secondary" value="option1" label="Secondary Option 1" color="secondary"></mjo-radio>
                        <mjo-radio name="secondary" value="option2" label="Secondary Option 2" color="secondary" checked></mjo-radio>
                        <mjo-radio name="secondary" value="option3" label="Secondary Option 3" color="secondary"></mjo-radio>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Radio Button Groups with Custom Content

Create radio groups with rich content using slot content:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-radio";
import "mjo-litui/mjo-typography";

@customElement("example-radio-custom-content")
export class ExampleRadioCustomContent extends LitElement {
    @state()
    private selectedPlan = "";

    private handlePlanChange(event: Event) {
        const radio = event.target as any;
        this.selectedPlan = radio.value;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <h3>Choose Your Subscription Plan</h3>

                <!-- Plan Options -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Basic Plan -->
                    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem;">
                        <mjo-radio name="subscription" value="basic" @change=${this.handlePlanChange}>
                            <div style="margin-left: 1.5rem;">
                                <mjo-typography tag="h4" style="margin: 0 0 0.5rem 0;">Basic Plan</mjo-typography>
                                <mjo-typography tag="p" style="margin: 0 0 0.5rem 0; color: #666;"> Perfect for getting started </mjo-typography>
                                <ul style="margin: 0; padding-left: 1rem; color: #666;">
                                    <li>5 Projects</li>
                                    <li>10GB Storage</li>
                                    <li>Email Support</li>
                                </ul>
                                <mjo-typography tag="strong" style="color: #2563eb;"> Free </mjo-typography>
                            </div>
                        </mjo-radio>
                    </div>

                    <!-- Pro Plan -->
                    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem;">
                        <mjo-radio name="subscription" value="pro" color="secondary" @change=${this.handlePlanChange}>
                            <div style="margin-left: 1.5rem;">
                                <mjo-typography tag="h4" style="margin: 0 0 0.5rem 0;">Pro Plan</mjo-typography>
                                <mjo-typography tag="p" style="margin: 0 0 0.5rem 0; color: #666;"> For growing teams and businesses </mjo-typography>
                                <ul style="margin: 0; padding-left: 1rem; color: #666;">
                                    <li>50 Projects</li>
                                    <li>100GB Storage</li>
                                    <li>Priority Support</li>
                                    <li>Advanced Analytics</li>
                                </ul>
                                <mjo-typography tag="strong" style="color: #dc2626;"> $19/month </mjo-typography>
                            </div>
                        </mjo-radio>
                    </div>

                    <!-- Enterprise Plan -->
                    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem;">
                        <mjo-radio name="subscription" value="enterprise" @change=${this.handlePlanChange}>
                            <div style="margin-left: 1.5rem;">
                                <mjo-typography tag="h4" style="margin: 0 0 0.5rem 0;">Enterprise Plan</mjo-typography>
                                <mjo-typography tag="p" style="margin: 0 0 0.5rem 0; color: #666;"> For large organizations </mjo-typography>
                                <ul style="margin: 0; padding-left: 1rem; color: #666;">
                                    <li>Unlimited Projects</li>
                                    <li>1TB Storage</li>
                                    <li>24/7 Phone Support</li>
                                    <li>Custom Integrations</li>
                                    <li>SSO & Advanced Security</li>
                                </ul>
                                <mjo-typography tag="strong" style="color: #059669;"> Contact Sales </mjo-typography>
                            </div>
                        </mjo-radio>
                    </div>
                </div>

                <!-- Selection Display -->
                ${this.selectedPlan
                    ? html`
                          <div style="padding: 1rem; background: #f0f9ff; border-radius: 4px; border-left: 4px solid #0ea5e9;">
                              <strong>Selected Plan:</strong> ${this.selectedPlan}
                          </div>
                      `
                    : ""}
            </div>
        `;
    }
}
```

## Form Integration

Use radio buttons within forms with validation:

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoForm } from "mjo-litui/types";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-radio";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-radio-form")
export class ExampleRadioForm extends LitElement {
    @query("mjo-form")
    private form!: MjoForm;

    @state()
    private formData = {
        name: "",
        email: "",
        gender: "",
        experience: "",
        preference: "",
    };

    @state()
    private isSubmitting = false;

    private async handleSubmit() {
        if (!this.form.validate()) {
            console.log("Form validation failed");
            return;
        }

        this.isSubmitting = true;

        try {
            // Get form data
            const data = this.form.getFormData();
            console.log("Form submitted with data:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Registration completed successfully!");
            this.form.reset();
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit registration");
        } finally {
            this.isSubmitting = false;
        }
    }

    private handleFormChange(event: Event) {
        const target = event.target as any;
        if (target.name) {
            this.formData = {
                ...this.formData,
                [target.name]: target.value,
            };
        }
    }

    render() {
        return html`
            <mjo-form @change=${this.handleFormChange}>
                <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
                    <h3>User Registration</h3>

                    <!-- Personal Information -->
                    <mjo-textfield label="Full Name" name="name" required rules="required|min:2" placeholder="Enter your full name"> </mjo-textfield>

                    <mjo-textfield label="Email" name="email" type="email" required rules="required|email" placeholder="Enter your email address">
                    </mjo-textfield>

                    <!-- Gender Selection -->
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;"> Gender: <span style="color: red;">*</span> </label>
                        <div style="display: flex; gap: 1rem;">
                            <mjo-radio name="gender" value="male" required>Male</mjo-radio>
                            <mjo-radio name="gender" value="female" required>Female</mjo-radio>
                            <mjo-radio name="gender" value="other" required>Other</mjo-radio>
                            <mjo-radio name="gender" value="prefer-not-to-say" required>Prefer not to say</mjo-radio>
                        </div>
                    </div>

                    <!-- Experience Level -->
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
                            Programming Experience: <span style="color: red;">*</span>
                        </label>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="experience" value="beginner" required helperText="0-1 years of experience"> Beginner </mjo-radio>
                            <mjo-radio name="experience" value="intermediate" required helperText="2-5 years of experience"> Intermediate </mjo-radio>
                            <mjo-radio name="experience" value="advanced" required helperText="5+ years of experience"> Advanced </mjo-radio>
                            <mjo-radio name="experience" value="expert" required helperText="10+ years, industry expert"> Expert </mjo-radio>
                        </div>
                    </div>

                    <!-- Communication Preference -->
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;"> Preferred Communication: </label>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="preference" value="email" color="secondary" helperText="Receive updates via email"> Email Updates </mjo-radio>
                            <mjo-radio name="preference" value="sms" color="secondary" helperText="Receive updates via SMS"> SMS Notifications </mjo-radio>
                            <mjo-radio name="preference" value="none" color="secondary" helperText="No promotional communications">
                                No Communications
                            </mjo-radio>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">
                        <mjo-button type="button" variant="ghost" @click=${() => this.form.reset()}> Reset Form </mjo-button>

                        <mjo-button @click=${this.handleSubmit} .loading=${this.isSubmitting}>
                            ${this.isSubmitting ? "Registering..." : "Register"}
                        </mjo-button>
                    </div>

                    <!-- Current Form Data Display -->
                    <details style="margin-top: 1rem;">
                        <summary>View Current Form Data</summary>
                        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 0.85rem;">
${JSON.stringify(this.formData, null, 2)}
            </pre>
                    </details>
                </div>
            </mjo-form>
        `;
    }
}
```

## Advanced Radio Groups

Create complex radio button interactions with dynamic behavior:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-radio";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";

@customElement("example-radio-advanced")
export class ExampleRadioAdvanced extends LitElement {
    @state()
    private paymentMethod = "";

    @state()
    private shippingMethod = "";

    @state()
    private additionalOptions = new Set<string>();

    @state()
    private customAmount = "";

    private handlePaymentChange(event: Event) {
        const radio = event.target as any;
        this.paymentMethod = radio.value;
    }

    private handleShippingChange(event: Event) {
        const radio = event.target as any;
        this.shippingMethod = radio.value;
    }

    private handleOptionChange(event: Event) {
        const radio = event.target as any;
        const newOptions = new Set(this.additionalOptions);

        if (radio.checked) {
            newOptions.add(radio.value);
        } else {
            newOptions.delete(radio.value);
        }

        this.additionalOptions = newOptions;
    }

    private calculateTotal() {
        let total = 0;

        // Base shipping cost
        switch (this.shippingMethod) {
            case "standard":
                total += 5;
                break;
            case "express":
                total += 15;
                break;
            case "overnight":
                total += 25;
                break;
        }

        // Additional options
        if (this.additionalOptions.has("insurance")) total += 10;
        if (this.additionalOptions.has("signature")) total += 5;
        if (this.additionalOptions.has("tracking")) total += 3;

        // Custom donation
        if (this.customAmount) {
            total += parseFloat(this.customAmount) || 0;
        }

        return total.toFixed(2);
    }

    private clearAll() {
        this.paymentMethod = "";
        this.shippingMethod = "";
        this.additionalOptions = new Set();
        this.customAmount = "";
    }

    render() {
        const total = this.calculateTotal();

        return html`
            <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem; max-width: 800px;">
                <!-- Options Panel -->
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <!-- Payment Method -->
                    <div>
                        <h4>Payment Method</h4>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="payment" value="credit" @change=${this.handlePaymentChange} helperText="Visa, MasterCard, American Express">
                                Credit Card
                            </mjo-radio>
                            <mjo-radio name="payment" value="paypal" @change=${this.handlePaymentChange} helperText="Pay with your PayPal account">
                                PayPal
                            </mjo-radio>
                            <mjo-radio name="payment" value="bank" @change=${this.handlePaymentChange} helperText="Direct bank transfer">
                                Bank Transfer
                            </mjo-radio>
                            <mjo-radio
                                name="payment"
                                value="crypto"
                                @change=${this.handlePaymentChange}
                                helperText="Bitcoin, Ethereum supported"
                                color="secondary"
                            >
                                Cryptocurrency
                            </mjo-radio>
                        </div>
                    </div>

                    <!-- Shipping Method -->
                    <div>
                        <h4>Shipping Method</h4>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="shipping" value="standard" @change=${this.handleShippingChange} helperText="5-7 business days (+$5.00)">
                                Standard Shipping
                            </mjo-radio>
                            <mjo-radio name="shipping" value="express" @change=${this.handleShippingChange} helperText="2-3 business days (+$15.00)">
                                Express Shipping
                            </mjo-radio>
                            <mjo-radio
                                name="shipping"
                                value="overnight"
                                @change=${this.handleShippingChange}
                                helperText="Next business day (+$25.00)"
                                color="secondary"
                            >
                                Overnight Shipping
                            </mjo-radio>
                        </div>
                    </div>

                    <!-- Additional Options -->
                    <div>
                        <h4>Additional Services</h4>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="insurance" value="insurance" @change=${this.handleOptionChange} helperText="Protect your package (+$10.00)">
                                Package Insurance
                            </mjo-radio>
                            <mjo-radio
                                name="signature"
                                value="signature"
                                @change=${this.handleOptionChange}
                                helperText="Require signature on delivery (+$5.00)"
                            >
                                Signature Required
                            </mjo-radio>
                            <mjo-radio name="tracking" value="tracking" @change=${this.handleOptionChange} helperText="Real-time tracking updates (+$3.00)">
                                Premium Tracking
                            </mjo-radio>
                        </div>
                    </div>

                    <!-- Custom Donation -->
                    <div>
                        <h4>Optional Donation</h4>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <mjo-radio name="donation" value="5">$5 Donation</mjo-radio>
                            <mjo-radio name="donation" value="10">$10 Donation</mjo-radio>
                            <mjo-radio name="donation" value="25">$25 Donation</mjo-radio>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <mjo-radio name="donation" value="custom">Custom Amount:</mjo-radio>
                                <mjo-textfield
                                    type="number"
                                    placeholder="0.00"
                                    .value=${this.customAmount}
                                    @input=${(e: any) => (this.customAmount = e.target.value)}
                                    style="width: 100px;"
                                >
                                </mjo-textfield>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Panel -->
                <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; height: fit-content;">
                    <h4 style="margin-top: 0;">Order Summary</h4>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                        <div><strong>Payment:</strong> ${this.paymentMethod || "Not selected"}</div>
                        <div><strong>Shipping:</strong> ${this.shippingMethod || "Not selected"}</div>

                        ${this.additionalOptions.size > 0 ? html` <div><strong>Services:</strong> ${Array.from(this.additionalOptions).join(", ")}</div> ` : ""}
                        ${this.customAmount ? html` <div><strong>Donation:</strong> $${this.customAmount}</div> ` : ""}
                    </div>

                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 1rem 0;" />

                    <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold;">
                        <span>Total:</span>
                        <span>$${total}</span>
                    </div>

                    <div style="margin-top: 1rem;">
                        <mjo-button fullwidth .disabled=${!this.paymentMethod || !this.shippingMethod}> Proceed to Checkout </mjo-button>
                    </div>

                    <div style="margin-top: 0.5rem;">
                        <mjo-button fullwidth variant="ghost" @click=${this.clearAll}> Clear All </mjo-button>
                    </div>
                </div>
            </div>
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
                    radio: {
                        borderColor: "#d1d5db",
                        checkedColor: "#059669",
                        checkedBorderColor: "#047857",
                        labelColor: "#374151",
                        labelFontSize: "1rem",
                        labelFontWeight: "500",
                        helperColor: "#6b7280",
                        helperFontSize: "0.875rem",
                    },
                }}
            >
                <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem;">
                    <h3>Custom Themed Radio Buttons</h3>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-radio name="themed" value="option1" label="Custom Theme Option 1" helperText="This radio uses custom theme colors"> </mjo-radio>
                        <mjo-radio name="themed" value="option2" label="Custom Theme Option 2" helperText="Green accent color and custom typography" checked>
                        </mjo-radio>
                        <mjo-radio name="themed" value="option3" label="Custom Theme Option 3" helperText="Consistent styling across all options"> </mjo-radio>
                    </div>
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
            <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem;">
                <h3>Component-Level Radio Theming</h3>

                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
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
                        helperText="This radio has component-specific styling"
                    >
                    </mjo-radio>

                    <mjo-radio
                        name="custom"
                        value="option2"
                        label="Another Custom Style"
                        .theme=${{
                            borderColor: "#ec4899",
                            checkedColor: "#db2777",
                            checkedBorderColor: "#be185d",
                            labelColor: "#be185d",
                            helperColor: "#ec4899",
                        }}
                        helperText="Different color scheme for this option"
                    >
                    </mjo-radio>
                </div>
            </div>
        `;
    }
}
```

## Properties

| Name         | Type                       | Default     | Description                                   |
| ------------ | -------------------------- | ----------- | --------------------------------------------- |
| `color`      | `"primary" \| "secondary"` | `"primary"` | Color scheme for the radio button             |
| `checked`    | `boolean`                  | `false`     | Whether the radio button is checked           |
| `disabled`   | `boolean`                  | `false`     | Whether the radio button is disabled          |
| `helperText` | `string`                   | -           | Helper text displayed below the radio button  |
| `label`      | `string`                   | -           | Label text displayed next to the radio button |
| `name`       | `string`                   | -           | Form field name for grouping radio buttons    |
| `value`      | `string`                   | `""`        | Value associated with this radio button       |
| `hideErrors` | `boolean`                  | `false`     | Hide validation error messages                |
| `theme`      | `MjoRadioTheme`            | `{}`        | Theme configuration for the radio button      |

## Methods

| Method                    | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| `getValue()`              | Returns the current value if checked, empty string if not |
| `setValue(value: string)` | Sets the value property of the radio button               |

## Events

| Event    | Description                               |
| -------- | ----------------------------------------- |
| `change` | Fired when the radio button state changes |

## CSS Custom Properties

| Property                           | Default                                                    | Description                      |
| ---------------------------------- | ---------------------------------------------------------- | -------------------------------- |
| `--mjo-checkbox-border-color`      | `var(--mjo-foreground-color-low, rgb(51, 51, 51))`         | Border color for unchecked state |
| `--mjo-radio-checked-color`        | `var(--mjo-primary-color)`                                 | Color when checked               |
| `--mjo-radio-checked-border-color` | `var(--mjo-radio-checked-color, var(--mjo-primary-color))` | Border color when checked        |
| `--mjo-space-small`                | `5px`                                                      | Spacing between radio and label  |

## Theme Interface

```ts
interface MjoRadioTheme {
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

## Technical Notes

-   **Radio Groups**: Multiple radio buttons with the same `name` automatically form a group where only one can be selected
-   **Form Integration**: Automatically integrates with `mjo-form` for validation and data collection
-   **Accessibility**: Full keyboard support and proper ARIA attributes for screen readers
-   **Theme Inheritance**: Supports both global theme through `mjo-theme` and component-specific theme through `ThemeMixin`
-   **Automatic Deselection**: When one radio in a group is selected, others are automatically deselected

## Accessibility

-   Full keyboard navigation support (Tab, Space, Arrow keys for groups)
-   Proper ARIA attributes for screen readers
-   Visual focus indicators
-   Support for assistive technologies
-   Semantic HTML structure with proper form association

## Best Practices

-   Always use the same `name` attribute for radio buttons that should be grouped together
-   Provide meaningful labels for accessibility
-   Use helper text to provide additional context when needed
-   Consider using fieldsets and legends for complex radio groups
-   Implement proper validation when used in forms
-   Keep radio groups to a reasonable size (typically 5-7 options maximum)
-   Order options logically (alphabetically, by frequency, or by logical progression)

For additional theming options, see the [Theming Guide](./theming.md).
