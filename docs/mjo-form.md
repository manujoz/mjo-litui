# mjo-form

Comprehensive form management system with built-in validation, internationalization, and seamless integration with mjo-litui form components. Provides automatic form data collection, client-side validation with 24+ validation rules, and multilingual error messaging.

## HTML Usage

```html
<mjo-form>
    <mjo-textfield name="email" label="Email" type="email" required></mjo-textfield>
    <mjo-textfield name="password" label="Password" type="password" required minlength="6"></mjo-textfield>
    <mjo-button type="submit" color="primary">Submit</mjo-button>
</mjo-form>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-form-basic")
export class ExampleFormBasic extends LitElement {
    private handleSubmit(event: CustomEvent) {
        const { response } = event.detail;

        if (response.error) {
            console.log("Validation error:", response.errmsg);
            return;
        }

        console.log("Form data:", response.data);
        console.log("Form elements:", response.elements);

        // Simulate async operation
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }, 2000);
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <mjo-textfield name="email" label="Email Address" type="email" required placeholder="Enter your email"></mjo-textfield>

                <mjo-textfield name="password" label="Password" type="password" required minlength="6" placeholder="Enter password"></mjo-textfield>

                <mjo-button type="submit" color="primary">Sign In</mjo-button>
            </mjo-form>
        `;
    }
}
```

## Advanced Validation Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-textarea";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-form-validation")
export class ExampleFormValidation extends LitElement {
    private handleSubmit(event: CustomEvent) {
        const { response } = event.detail;

        if (response.error) {
            console.log(`Validation failed: ${response.errmsg}`);
            console.log(`Failed rule: ${response.errrule}`);
            console.log(`Failed input:`, response.errInput);
            return;
        }

        console.log("Valid form submitted:", response.data);

        // Reset loading state after processing
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }, 1500);
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <mjo-textfield
                    name="username"
                    label="Username"
                    required
                    minlength="3"
                    maxlength="20"
                    nospaces
                    pattern="^[a-zA-Z0-9_]+$"
                    placeholder="Username (3-20 chars, no spaces)"
                ></mjo-textfield>

                <mjo-textfield
                    name="email"
                    label="Email"
                    type="email"
                    required
                    domains="gmail.com|yahoo.com|hotmail.com"
                    placeholder="Email from allowed domains"
                ></mjo-textfield>

                <mjo-textfield name="phone" label="Phone Number" phonenumber phonecountry="es|uk|us" placeholder="International phone number"></mjo-textfield>

                <mjo-textfield name="age" label="Age" type="number" isnumber min="18" max="120" required placeholder="Age (18-120)"></mjo-textfield>

                <mjo-textfield
                    name="password"
                    label="Password"
                    type="password"
                    required
                    security="high"
                    minlength="8"
                    placeholder="Strong password required"
                ></mjo-textfield>

                <mjo-textfield
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                    equalto="password"
                    placeholder="Must match password"
                ></mjo-textfield>

                <mjo-textfield
                    name="birthdate"
                    label="Birth Date"
                    isdate="dd-mm-yyyy"
                    dateprevious
                    minage="18"
                    maxage="100"
                    placeholder="DD-MM-YYYY"
                ></mjo-textfield>

                <mjo-textarea name="bio" label="Biography" rangelength="50,500" placeholder="Tell us about yourself (50-500 chars)"></mjo-textarea>

                <mjo-checkbox name="terms" required label="I agree to the terms and conditions"></mjo-checkbox>

                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <mjo-button type="submit" color="primary">Register</mjo-button>
                    <mjo-button type="reset" variant="ghost">Reset</mjo-button>
                </div>
            </mjo-form>
        `;
    }
}
```

## Custom Error Messages Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ValidatorMessages, InputsValidatorMessages } from "mjo-litui/types/validator";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-form-custom-messages")
export class ExampleFormCustomMessages extends LitElement {
    // Global custom error messages
    private customMessages: Partial<ValidatorMessages> = {
        required: "Please fill in this field - it's important!",
        isemail: "That doesn't look like a valid email address",
        minlength: "Too short! Please enter at least {data0} characters",
        security: "Your password needs to be stronger for security",
    };

    // Input-specific error messages
    private inputMessages: InputsValidatorMessages = {
        username: {
            required: "Username is mandatory for registration",
            minlength: "Username must be at least {data0} characters",
            pattern: "Username can only contain letters, numbers, and underscores",
        },
        email: {
            required: "We need your email to send confirmation",
            isemail: "Please enter a valid email format (user@domain.com)",
        },
    };

    private handleSubmit(event: CustomEvent) {
        const { response } = event.detail;

        if (response.error) {
            console.log("Custom validation error:", response.errmsg);
            return;
        }

        console.log("Form submitted successfully:", response.data);

        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }, 1500);
    }

    render() {
        return html`
            <mjo-form .errmessages=${this.customMessages} .inputsErrmessages=${this.inputMessages} @submit=${this.handleSubmit}>
                <mjo-textfield name="username" label="Username" required minlength="4" pattern="^[a-zA-Z0-9_]+$" placeholder="Enter username"></mjo-textfield>

                <mjo-textfield name="email" label="Email" type="email" required placeholder="Enter email"></mjo-textfield>

                <mjo-textfield
                    name="password"
                    label="Password"
                    type="password"
                    required
                    security="high"
                    minlength="8"
                    placeholder="Enter secure password"
                ></mjo-textfield>

                <mjo-button type="submit" color="primary">Submit</mjo-button>
            </mjo-form>
        `;
    }
}
```

## Multi-Input Types Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-textarea";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-radio";
import "mjo-litui/mjo-switch";
import "mjo-litui/mjo-slider";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-button";

@customElement("example-form-multi-input")
export class ExampleFormMultiInput extends LitElement {
    private countryOptions = [
        { value: "us", text: "United States" },
        { value: "uk", text: "United Kingdom" },
        { value: "es", text: "Spain" },
        { value: "fr", text: "France" },
        { value: "de", text: "Germany" },
    ];

    private handleSubmit(event: CustomEvent) {
        const { response } = event.detail;

        if (response.error) {
            console.log("Form validation failed:", response.errmsg);
            return;
        }

        console.log("All form data collected:", response.data);
        console.log("Form elements:", response.elements);

        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }, 2000);
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <div style="display: grid; gap: 1rem;">
                    <mjo-textfield name="firstName" label="First Name" required minlength="2" placeholder="Enter first name"></mjo-textfield>

                    <mjo-textfield name="lastName" label="Last Name" required minlength="2" placeholder="Enter last name"></mjo-textfield>

                    <mjo-select name="country" label="Country" required .options=${this.countryOptions} placeholder="Select your country"></mjo-select>

                    <mjo-textarea
                        name="message"
                        label="Message"
                        required
                        minlength="10"
                        maxlength="500"
                        counter
                        placeholder="Tell us your message"
                    ></mjo-textarea>

                    <div>
                        <label>Gender:</label>
                        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                            <mjo-radio name="gender" value="male" required>Male</mjo-radio>
                            <mjo-radio name="gender" value="female" required>Female</mjo-radio>
                            <mjo-radio name="gender" value="other" required>Other</mjo-radio>
                        </div>
                    </div>

                    <mjo-slider name="experience" label="Years of Experience" min="0" max="50" value="5"></mjo-slider>

                    <mjo-color-picker name="favoriteColor" label="Favorite Color" value="#3B82F6"></mjo-color-picker>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-checkbox name="newsletter" label="Subscribe to newsletter"></mjo-checkbox>

                        <mjo-switch name="notifications" label="Enable notifications"></mjo-switch>

                        <mjo-checkbox name="terms" required label="I agree to the terms and conditions"></mjo-checkbox>
                    </div>

                    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                        <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                        <mjo-button type="reset" variant="ghost">Clear All</mjo-button>
                    </div>
                </div>
            </mjo-form>
        `;
    }
}
```

## Conditional Validation Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-select";
import "mjo-litui/mjo-checkbox";
import "mjo-litui/mjo-button";

@customElement("example-form-conditional")
export class ExampleFormConditional extends LitElement {
    @state() private accountType = "personal";
    @state() private needsShipping = false;

    private accountTypes = [
        { value: "personal", text: "Personal Account" },
        { value: "business", text: "Business Account" },
    ];

    private handleAccountTypeChange(event: CustomEvent) {
        this.accountType = event.target.value;
    }

    private handleShippingToggle(event: CustomEvent) {
        this.needsShipping = event.target.checked;
    }

    private handleSubmit(event: CustomEvent) {
        const { response } = event.detail;

        if (response.error) {
            console.log("Validation error:", response.errmsg);
            return;
        }

        console.log("Conditional form submitted:", response.data);

        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }, 1500);
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <mjo-select
                    name="accountType"
                    label="Account Type"
                    required
                    .options=${this.accountTypes}
                    .value=${this.accountType}
                    @change=${this.handleAccountTypeChange}
                ></mjo-select>

                <mjo-textfield
                    name="name"
                    label="${this.accountType === "business" ? "Company Name" : "Full Name"}"
                    required
                    minlength="2"
                    placeholder="Enter ${this.accountType === "business" ? "company name" : "your full name"}"
                ></mjo-textfield>

                ${this.accountType === "business"
                    ? html`
                          <mjo-textfield
                              name="taxId"
                              label="Tax ID"
                              required
                              pattern="^[0-9A-Z-]+$"
                              placeholder="Enter tax identification number"
                          ></mjo-textfield>

                          <mjo-textfield
                              name="companySize"
                              label="Company Size"
                              type="number"
                              isnumber
                              min="1"
                              max="10000"
                              placeholder="Number of employees"
                          ></mjo-textfield>
                      `
                    : ""}

                <mjo-textfield name="email" label="Email" type="email" required placeholder="Enter email address"></mjo-textfield>

                <mjo-checkbox
                    name="needsShipping"
                    label="I need shipping information"
                    .checked=${this.needsShipping}
                    @change=${this.handleShippingToggle}
                ></mjo-checkbox>

                ${this.needsShipping
                    ? html`
                          <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                              <h4 style="margin: 0 0 1rem 0;">Shipping Information</h4>

                              <mjo-textfield
                                  name="shippingAddress"
                                  label="Shipping Address"
                                  required
                                  minlength="5"
                                  placeholder="Enter full address"
                              ></mjo-textfield>

                              <mjo-textfield name="shippingCity" label="City" required minlength="2" placeholder="Enter city"></mjo-textfield>

                              <mjo-textfield
                                  name="shippingZip"
                                  label="ZIP Code"
                                  required
                                  pattern="^[0-9]{5}(-[0-9]{4})?$"
                                  placeholder="12345 or 12345-6789"
                              ></mjo-textfield>
                          </div>
                      `
                    : ""}

                <mjo-button type="submit" color="primary"> ${this.accountType === "business" ? "Register Business" : "Create Account"} </mjo-button>
            </mjo-form>
        `;
    }
}
```

## Attributes / Properties

| Name                | Type                         | Default | Reflects | Description                                        |
| ------------------- | ---------------------------- | ------- | -------- | -------------------------------------------------- |
| `noValidate`        | `boolean`                    | `false` | no       | Disables all client-side validation                |
| `errmessages`       | `Partial<ValidatorMessages>` | `{}`    | no       | Global custom error messages for validation rules  |
| `inputsErrmessages` | `InputsValidatorMessages`    | `{}`    | no       | Input-specific custom error messages by input name |

### Internal Properties

| Name           | Type                   | Description                                             |
| -------------- | ---------------------- | ------------------------------------------------------- |
| `formRef`      | `Ref<HTMLFormElement>` | Reference to the internal form element                  |
| `elements`     | `MjoFormElements[]`    | Array of all form components registered with the form   |
| `submitButton` | `MjoButton \| null`    | Reference to the submit button (if using type="submit") |
| `validator`    | `MjoValidator`         | Internal validator instance for form validation         |

### Behavior Notes

-   Form automatically collects all child components that implement `FormMixin`
-   Validation runs on form submission and focuses the first invalid input
-   Submit button automatically shows loading state during async operations
-   Form data is collected using native `FormData` API for file upload support
-   Error messages support internationalization based on document language (`<html lang="...">`)

## Slots

| Slot      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| (default) | Form content including input components and submit/reset buttons |

## Events

| Event    | Detail                      | Emitted When      | Notes                                                  |
| -------- | --------------------------- | ----------------- | ------------------------------------------------------ |
| `submit` | `MjoFormSubmitEvent.detail` | Form is submitted | Includes validation results, form data, and references |

### Submit Event Detail

```ts
interface MjoFormSubmitEvent extends CustomEvent {
    detail: {
        formData: FormData; // Native FormData object
        event: SubmitEvent; // Original submit event
        response: MjoFormResponse; // Validation and form data
    };
}

interface MjoFormResponse {
    error: boolean; // True if validation failed
    errmsg: string | null; // Error message (if any)
    errInput: MjoFormElements | null; // First invalid input (if any)
    errrule: ValidatorRulesNames | null; // Failed validation rule
    form: MjoForm; // Reference to form component
    elements: MjoFormElements[]; // All form elements
    submitButton: MjoButton | null; // Submit button reference
    data: { [key: string]: any }; // Parsed form data object
}
```

## Validation Rules

The form supports 24 comprehensive validation rules that can be applied to form elements:

### Text Validation

| Rule       | Type      | Description                | Example                     |
| ---------- | --------- | -------------------------- | --------------------------- |
| `required` | `boolean` | Field must have a value    | `required`                  |
| `isemail`  | `boolean` | Must be valid email format | `isemail` or `type="email"` |
| `isurl`    | `boolean` | Must be valid URL format   | `isurl` or `type="url"`     |
| `nospaces` | `boolean` | Cannot contain spaces      | `nospaces`                  |
| `pattern`  | `string`  | Must match regex pattern   | `pattern="^[A-Z0-9]+$"`     |

### Length Validation

| Rule          | Type       | Description                 | Example              |
| ------------- | ---------- | --------------------------- | -------------------- |
| `minlength`   | `number`   | Minimum character length    | `minlength="3"`      |
| `maxlength`   | `number`   | Maximum character length    | `maxlength="50"`     |
| `rangelength` | `number[]` | Length must be within range | `rangelength="5,20"` |

### Numeric Validation

| Rule       | Type       | Description                | Example        |
| ---------- | ---------- | -------------------------- | -------------- |
| `isnumber` | `boolean`  | Must be a valid number     | `isnumber`     |
| `min`      | `number`   | Minimum numeric value      | `min="0"`      |
| `max`      | `number`   | Maximum numeric value      | `max="100"`    |
| `range`    | `number[]` | Numeric value within range | `range="1,10"` |

### Date Validation

| Rule           | Type                                           | Description               | Example               |
| -------------- | ---------------------------------------------- | ------------------------- | --------------------- |
| `isdate`       | `"aaaa-mm-dd" \| "dd-mm-aaaa" \| "mm-dd-aaaa"` | Valid date format         | `isdate="dd-mm-yyyy"` |
| `dateprevious` | `boolean`                                      | Date must be before today | `dateprevious`        |
| `minage`       | `number`                                       | Minimum age in years      | `minage="18"`         |
| `maxage`       | `number`                                       | Maximum age in years      | `maxage="65"`         |

### Phone Validation

| Rule           | Type       | Description                      | Example                   |
| -------------- | ---------- | -------------------------------- | ------------------------- |
| `phonenumber`  | `boolean`  | Valid phone number format        | `phonenumber`             |
| `phonecountry` | `string[]` | Phone number valid for countries | `phonecountry="es,us,uk"` |

### Security & Comparison

| Rule       | Type                                         | Description              | Example              |
| ---------- | -------------------------------------------- | ------------------------ | -------------------- |
| `security` | `"low" \| "medium" \| "high" \| "very-high"` | Password strength level  | `security="high"`    |
| `equalto`  | `string`                                     | Must equal another field | `equalto="password"` |

### Domain & File Validation

| Rule      | Type       | Description                          | Example                           |
| --------- | ---------- | ------------------------------------ | --------------------------------- |
| `domains` | `string[]` | Email domain must be in allowed list | `domains="gmail.com,company.com"` |
| `allowed` | `string[]` | Allowed file extensions              | `allowed=".jpg,.png,.pdf"`        |

### Checkbox/Radio Validation

| Rule       | Type     | Description                        | Example        |
| ---------- | -------- | ---------------------------------- | -------------- |
| `mincheck` | `number` | Minimum checkboxes/radios selected | `mincheck="2"` |
| `maxcheck` | `number` | Maximum checkboxes/radios selected | `maxcheck="5"` |

## Validation Rule Examples

### Email with Domain Restriction

```ts
<mjo-textfield
    name="workEmail"
    label="Work Email"
    type="email"
    required
    domains="company.com|partner.org"
    placeholder="Must be from company.com or partner.org"
></mjo-textfield>
```

### Strong Password Validation

```ts
<mjo-textfield
    name="password"
    label="Password"
    type="password"
    required
    security="very-high"
    minlength="12"
    placeholder="Very strong password required"
></mjo-textfield>
```

### Age Verification

```ts
<mjo-textfield
    name="birthdate"
    label="Birth Date"
    isdate="dd-mm-yyyy"
    dateprevious
    minage="21"
    maxage="120"
    placeholder="Must be 21+ years old"
></mjo-textfield>
```

### International Phone

```ts
<mjo-textfield
    name="phone"
    label="Phone Number"
    phonenumber
    phonecountry="us|uk|es|fr|de"
    placeholder="International phone format"
></mjo-textfield>
```

### Pattern Validation

```ts
<mjo-textfield
    name="productCode"
    label="Product Code"
    required
    pattern="^[A-Z]{2}[0-9]{4}$"
    placeholder="Format: AB1234"
></mjo-textfield>
```

## Error Message Customization

### Global Custom Messages

```ts
const customMessages: Partial<ValidatorMessages> = {
    required: "This field cannot be empty",
    isemail: "Please enter a valid email address",
    minlength: "Must be at least {data0} characters long",
    security: "Password must include uppercase, lowercase, numbers, and symbols"
};

<mjo-form .errmessages=${customMessages}>
    <!-- form content -->
</mjo-form>
```

### Input-Specific Messages

```ts
const inputMessages: InputsValidatorMessages = {
    username: {
        required: "Username is required for your account",
        minlength: "Username must be at least {data0} characters",
        pattern: "Username can only contain letters, numbers, and underscores"
    },
    password: {
        required: "Password is mandatory",
        security: "Create a strong password for account security"
    }
};

<mjo-form .inputsErrmessages=${inputMessages}>
    <!-- form content -->
</mjo-form>
```

## Internationalization

Error messages automatically adapt to the document language:

```html
<!-- English messages -->
<html lang="en">
    <!-- Spanish messages -->
    <html lang="es">
        <!-- French messages -->
        <html lang="fr"></html>
    </html>
</html>
```

**Supported languages:** English, Spanish, French, Portuguese, Italian, German, Dutch, Bulgarian, Serbian, Russian, Chinese, Japanese, Korean, Turkish, Polish.

## FormMixin Integration

Components that integrate with `mjo-form` implement the `FormMixin`:

### Supported Form Components

-   `mjo-textfield` - Text input with validation
-   `mjo-textarea` - Multi-line text input
-   `mjo-select` - Dropdown selection
-   `mjo-checkbox` - Single checkbox
-   `mjo-radio` - Radio button groups
-   `mjo-switch` - Toggle switch
-   `mjo-slider` - Range slider
-   `mjo-color-picker` - Color selection

### FormMixin Properties

All form components automatically inherit these validation properties:

```ts
interface IFormMixin {
    // Validation rules
    isemail?: boolean;
    isurl?: boolean;
    required?: boolean;
    nospaces?: boolean;
    rangelength?: number[];
    isnumber?: boolean;
    range?: number[];
    domains?: string[];
    isdate?: "aaaa-mm-dd" | "dd-mm-aaaa" | "mm-dd-aaaa";
    dateprevious?: boolean;
    minage?: number;
    maxage?: number;
    security?: "low" | "medium" | "high" | "very-high";
    equalto?: string;
    phonenumber?: boolean;
    phonecountry?: string[];
    pattern?: string;
    allowed?: string[];
    mincheck?: number;
    maxcheck?: number;

    // Numeric constraints
    min?: number;
    max?: number;
    maxlength?: number;
    minlength?: number;

    // Form references
    form: HTMLFormElement | null;
    mjoForm: MjoForm | null;

    // Methods
    submitForm(): void;
    updateFormData(data: { name: string; value: string }): void;
}
```

## Advanced Usage Patterns

### Programmatic Form Submission

```ts
// Get form reference
const form = document.querySelector("mjo-form") as MjoForm;

// Access form elements
console.log(form.elements); // All form components

// Access submit button
console.log(form.submitButton); // Submit button reference

// Programmatic validation
const validation = form.validator.validateForm({
    elements: form.elements,
    form: form.formRef.value!,
});

if (!validation.error) {
    // Process form data
    console.log("Form is valid");
}
```

### Dynamic Form Building

```ts
@customElement("dynamic-form")
export class DynamicForm extends LitElement {
    @state() private fields: any[] = [];

    addField(type: string, name: string, label: string) {
        this.fields = [...this.fields, { type, name, label }];
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                ${this.fields.map((field) => {
                    switch (field.type) {
                        case "text":
                            return html`<mjo-textfield name=${field.name} label=${field.label}></mjo-textfield>`;
                        case "email":
                            return html`<mjo-textfield name=${field.name} label=${field.label} type="email" required></mjo-textfield>`;
                        case "select":
                            return html`<mjo-select name=${field.name} label=${field.label} .options=${field.options}></mjo-select>`;
                        default:
                            return "";
                    }
                })}
                <mjo-button type="submit">Submit Dynamic Form</mjo-button>
            </mjo-form>
        `;
    }
}
```

### Form Reset and State Management

```ts
@customElement("stateful-form")
export class StatefulForm extends LitElement {
    @state() private formData: any = {};
    @state() private isSubmitting = false;

    private handleSubmit(event: CustomEvent) {
        const { response } = event.detail;

        if (response.error) {
            console.log("Validation failed");
            return;
        }

        this.isSubmitting = true;
        this.formData = response.data;

        // Simulate API call
        this.submitToServer(response.data).then(() => {
            this.isSubmitting = false;
            this.resetForm();
        });
    }

    private async submitToServer(data: any) {
        // API submission logic
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    private resetForm() {
        // Reset all form elements
        const form = this.shadowRoot?.querySelector("mjo-form") as MjoForm;
        form.elements.forEach((element) => {
            if ("value" in element) {
                (element as any).value = "";
            }
            if ("checked" in element) {
                (element as any).checked = false;
            }
        });
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <!-- form content -->
                <mjo-button type="submit" .loading=${this.isSubmitting} .disabled=${this.isSubmitting}>
                    ${this.isSubmitting ? "Submitting..." : "Submit"}
                </mjo-button>
            </mjo-form>
        `;
    }
}
```

## Performance Considerations

-   Form validation is performed synchronously on submit
-   Large forms with many validation rules may have slight delay
-   Consider using `noValidate` for forms with custom validation logic
-   Error message internationalization is loaded once per page load
-   Form elements register automatically via `FormMixin` during `firstUpdated`

## Accessibility Notes

-   Form maintains standard HTML form semantics
-   Validation errors are announced to screen readers via form element focus
-   Submit button loading state should include appropriate ARIA attributes
-   All form components support standard accessibility patterns
-   Error messages are associated with their input elements

## Common Patterns

### Login Form

```ts
<mjo-form @submit=${this.handleLogin}>
    <mjo-textfield name="email" label="Email" type="email" required></mjo-textfield>
    <mjo-textfield name="password" label="Password" type="password" required></mjo-textfield>
    <mjo-checkbox name="remember" label="Remember me"></mjo-checkbox>
    <mjo-button type="submit" color="primary" fullwidth>Sign In</mjo-button>
</mjo-form>
```

### Registration Form

```ts
<mjo-form @submit=${this.handleRegister}>
    <mjo-textfield name="username" required minlength="3" nospaces></mjo-textfield>
    <mjo-textfield name="email" type="email" required></mjo-textfield>
    <mjo-textfield name="password" type="password" required security="high"></mjo-textfield>
    <mjo-textfield name="confirmPassword" type="password" required equalto="password"></mjo-textfield>
    <mjo-checkbox name="terms" required label="I agree to terms"></mjo-checkbox>
    <mjo-button type="submit">Create Account</mjo-button>
</mjo-form>
```

### Contact Form

```ts
<mjo-form @submit=${this.handleContact}>
    <mjo-textfield name="name" label="Full Name" required></mjo-textfield>
    <mjo-textfield name="email" label="Email" type="email" required></mjo-textfield>
    <mjo-textfield name="subject" label="Subject" required></mjo-textfield>
    <mjo-textarea name="message" label="Message" required minlength="10"></mjo-textarea>
    <mjo-button type="submit">Send Message</mjo-button>
</mjo-form>
```

## Summary

`<mjo-form>` provides a comprehensive form management system with built-in validation, internationalization, and seamless integration with mjo-litui components. It handles complex validation scenarios, custom error messaging, and maintains accessibility standards while offering a simple API for both basic and advanced use cases. The system automatically manages form state, validation lifecycle, and provides detailed feedback for handling both successful submissions and validation errors.
