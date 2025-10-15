# mjo-form

Form container component that provides comprehensive validation and data collection capabilities with extensive validation rules and error handling.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Events](#events)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Creating validated forms with built-in error handling
- Implementing complex validation rules without custom code
- Collecting and processing form data with automatic validation
- Managing form state and submit button loading states
- Integrating multiple form elements with coordinated validation
- Providing user-friendly validation feedback in real-time

## Import

```typescript
import "mjo-litui/mjo-form";
```

## Properties

| Property            | Type                         | Default | Description                                                                      | Required |
| ------------------- | ---------------------------- | ------- | -------------------------------------------------------------------------------- | -------- |
| `noValidate`        | `boolean`                    | `false` | When `true`, disables all validation rules and submits the form without checking | No       |
| `errmessages`       | `Partial<ValidatorMessages>` | `{}`    | Custom validation error messages for all form inputs                             | No       |
| `inputsErrmessages` | `InputsValidatorMessages`    | `{}`    | Custom validation error messages for specific inputs by name                     | No       |

## Events

| Event    | Description                        | Type                 | Detail Properties                                                                                                    |
| -------- | ---------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `submit` | Emitted when the form is submitted | `MjoFormSubmitEvent` | `formData`: FormData object<br>`event`: Original submit event<br>`response`: MjoFormResponse with validation results |

### MjoFormResponse Structure

The `response` object in the submit event contains:

| Property       | Type                          | Description                                   |
| -------------- | ----------------------------- | --------------------------------------------- |
| `error`        | `boolean`                     | Indicates if validation errors occurred       |
| `errmsg`       | `string \| null`              | Error message if validation failed            |
| `errInput`     | `MjoFormElements \| null`     | Reference to the input that failed validation |
| `errrule`      | `ValidatorRulesNames \| null` | Name of the validation rule that failed       |
| `form`         | `MjoForm`                     | Reference to the form component               |
| `elements`     | `MjoFormElements[]`           | Array of all form elements                    |
| `submitButton` | `MjoButton \| null`           | Reference to the submit button if present     |
| `data`         | `object`                      | Parsed form data as key-value pairs           |

## Accessibility

### Best Practices

- The component renders a native `<form>` element with proper `enctype="multipart/form-data"`
- All form inputs should have descriptive labels for screen reader users
- Validation errors are automatically set on individual inputs with appropriate error messages
- Focus is automatically moved to the first input with validation errors
- Submit buttons should have clear, descriptive text

### Form Validation Flow

1. User submits the form
2. Validation runs on all registered form elements
3. If validation fails:
    - The first invalid input receives focus
    - Error message is displayed on the input
    - The submit event fires with `error: true`
4. If validation passes:
    - Submit button enters loading state (if present)
    - The submit event fires with `error: false`
    - Application can process the form data

## Usage Examples

### Basic Form with Validation

```html
<mjo-form id="basic-form">
    <mjo-textfield name="firstName" label="First Name" placeholder="Enter your first name" required></mjo-textfield>

    <mjo-textfield name="email" label="Email" type="email" placeholder="Enter your email" required isemail></mjo-textfield>

    <mjo-button type="submit" color="primary"> Submit Form </mjo-button>
</mjo-form>

<script>
    const form = document.getElementById("basic-form");

    form.addEventListener("submit", (event) => {
        const { response, formData } = event.detail;

        if (response.error) {
            console.error("Validation error:", response.errmsg);
            return;
        }

        console.log("Form data:", response.data);
        // Process form data
    });
</script>
```

### Advanced Validation Rules

```html
<mjo-form id="validation-form">
    <mjo-textfield name="username" label="Username" required minlength="3" maxlength="20" nospaces></mjo-textfield>

    <mjo-textfield name="phone" label="Phone Number" type="tel" phonenumber phonecountry='["es", "us", "uk"]'></mjo-textfield>

    <mjo-textfield name="password" label="Password" type="password" required security="high" minlength="8"></mjo-textfield>

    <mjo-textfield name="confirmPassword" label="Confirm Password" type="password" required equalto="password"></mjo-textfield>

    <mjo-button type="submit" color="primary"> Create Account </mjo-button>
</mjo-form>
```

### Custom Error Messages

```typescript
import "mjo-litui/mjo-form";

const form = document.querySelector("mjo-form");

// Global custom messages for all inputs
form.errmessages = {
    required: "This field is mandatory!",
    minlength: "Please enter at least {data0} characters",
    isemail: "Please enter a valid email address",
};

// Specific messages for individual inputs
form.inputsErrmessages = {
    username: {
        required: "Username is required for registration",
        minlength: "Username must be at least 3 characters",
        nospaces: "Username cannot contain spaces",
    },
    email: {
        required: "Email is mandatory",
        isemail: "Please provide a valid email format",
    },
};

form.addEventListener("submit", (event) => {
    const { response } = event.detail;

    if (response.error) {
        // Custom error message will be shown
        console.log(response.errmsg);
    }
});
```

### Form with Multiple Input Types

```html
<mjo-form id="profile-form">
    <mjo-select name="country" label="Country" required>
        <option value="">Select Country</option>
        <option value="es">Spain</option>
        <option value="us">United States</option>
    </mjo-select>

    <mjo-textarea name="bio" label="Bio" maxlength="500"></mjo-textarea>

    <mjo-date-picker name="birthdate" label="Birth Date" required minage="18" maxage="100"></mjo-date-picker>

    <mjo-slider name="experience" label="Years of Experience" min="0" max="50" value="5"></mjo-slider>

    <mjo-checkbox name="terms" label="I agree to the terms" required></mjo-checkbox>

    <mjo-button type="submit" color="success"> Submit Profile </mjo-button>
</mjo-form>
```

### Radio Groups Validation

```html
<mjo-form>
    <div class="form-group">
        <label>Preferred Contact Method</label>
        <mjo-radio name="contact" value="email" label="Email" required></mjo-radio>
        <mjo-radio name="contact" value="phone" label="Phone"></mjo-radio>
        <mjo-radio name="contact" value="sms" label="SMS"></mjo-radio>
    </div>

    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

### Checkbox Groups with Min/Max Validation

```html
<mjo-form>
    <div class="form-group">
        <label>Select Technologies (2-4 required)</label>
        <mjo-checkbox name="tech1" value="javascript" label="JavaScript" checkgroup="technologies" mincheck="2" maxcheck="4"></mjo-checkbox>
        <mjo-checkbox name="tech2" value="typescript" label="TypeScript" checkgroup="technologies"></mjo-checkbox>
        <mjo-checkbox name="tech3" value="react" label="React" checkgroup="technologies"></mjo-checkbox>
        <mjo-checkbox name="tech4" value="vue" label="Vue.js" checkgroup="technologies"></mjo-checkbox>
    </div>

    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

### Handling Loading States

```html
<mjo-form id="async-form">
    <mjo-textfield name="email" label="Email" required isemail></mjo-textfield>
    <mjo-button type="submit" color="primary">Send</mjo-button>
</mjo-form>

<script>
    const form = document.getElementById("async-form");

    form.addEventListener("submit", async (event) => {
        const { response } = event.detail;

        if (response.error) return;

        // Submit button automatically enters loading state
        try {
            await fetch("/api/submit", {
                method: "POST",
                body: JSON.stringify(response.data),
            });

            console.log("Success!");
        } finally {
            // Reset loading state
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }
    });
</script>
```

### Disabling Validation

```html
<mjo-form noValidate>
    <!-- All validation rules are ignored -->
    <mjo-textfield name="name" label="Name" required></mjo-textfield>
    <mjo-textfield name="email" label="Email" required isemail></mjo-textfield>

    <mjo-button type="submit">Submit Without Validation</mjo-button>
</mjo-form>
```

### Date Validation

```html
<mjo-form>
    <mjo-textfield
        name="birthdate"
        label="Birth Date"
        placeholder="YYYY-MM-DD"
        required
        isdate="aaaa-mm-dd"
        dateprevious
        minage="18"
        maxage="120"
    ></mjo-textfield>

    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

### Pattern Validation

```html
<mjo-form>
    <mjo-textfield name="postalCode" label="Postal Code" pattern="^\d{5}(-\d{4})?$" placeholder="12345 or 12345-6789"></mjo-textfield>

    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

## Additional Notes

### Supported Form Elements

The form component works with the following input components:

- `mjo-textfield`
- `mjo-textarea`
- `mjo-select`
- `mjo-checkbox`
- `mjo-radio`
- `mjo-switch`
- `mjo-slider`
- `mjo-color-picker`
- `mjo-date-picker`

### Validation Rules

The component supports comprehensive validation rules through the `MjoValidator` class:

- **Basic**: `required`, `nospaces`, `minlength`, `maxlength`, `rangelength`
- **Type**: `isemail`, `isurl`, `isnumber`, `isdate`
- **Range**: `min`, `max`, `range`
- **Security**: `security` (low, medium, high, very-high)
- **Matching**: `equalto`
- **Phone**: `phonenumber`, `phonecountry`
- **Date**: `dateprevious`, `minage`, `maxage`
- **Pattern**: `pattern`
- **File**: `allowed`
- **Checkbox**: `mincheck`, `maxcheck`
- **Domain**: `domains`

### Form Elements Registration

Form elements are automatically registered when:

1. They are placed inside the `<mjo-form>` component
2. They have a `name` attribute
3. They don't have the `formIgnore` property set to `true`

Submit buttons with `type="submit"` are also automatically registered and will enter a loading state upon successful validation.

### Error Message Interpolation

Custom error messages support data interpolation using placeholders like `{data0}`, `{data1}`, etc. The validator will replace these with relevant values (e.g., minlength value, field name).

### TypeScript Integration

```typescript
import { MjoForm } from "mjo-litui/mjo-form";
import { MjoFormSubmitEvent, MjoFormResponse } from "mjo-litui/types/mjo-form";

const form = document.querySelector("mjo-form") as MjoForm;

form.addEventListener("submit", (event: Event) => {
    const formEvent = event as MjoFormSubmitEvent;
    const response: MjoFormResponse = formEvent.detail.response;

    if (!response.error) {
        // Process form data
        console.log(response.data);
    }
});
```
