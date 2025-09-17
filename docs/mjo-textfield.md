# mjo-textfield

A versatile single-line text input component with comprehensive features including multiple input types, validation, icons, prefix/suffix text, password visibility toggle, and full form integration. The foundation for all text-based form inputs.

## Import

```ts
import "mjo-litui/mjo-textfield";
```

## Basic Usage

```html
<mjo-textfield label="Name" placeholder="Enter your name"></mjo-textfield>
```

## Lit Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-basic")
export class ExampleTextfieldBasic extends LitElement {
    @state() name = "";

    render() {
        return html`
            <mjo-textfield
                label="Full Name"
                placeholder="Enter your full name"
                .value=${this.name}
                @input=${this.#handleInput}
                helperText="This will be used as your display name"
            ></mjo-textfield>

            <p style="margin-top: 1rem;"><strong>Current value:</strong> ${this.name || "No name entered"}</p>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.name = (e.target as any).value;
    }
}
```

## Input Types

The textfield supports various input types for different data formats.

```html
<mjo-textfield type="text" label="Text input" placeholder="Any text"></mjo-textfield>
<mjo-textfield type="email" label="Email" placeholder="user@example.com"></mjo-textfield>
<mjo-textfield type="password" label="Password" placeholder="Enter password"></mjo-textfield>
<mjo-textfield type="number" label="Age" placeholder="25"></mjo-textfield>
<mjo-textfield type="tel" label="Phone" placeholder="+1 234 567 8900"></mjo-textfield>
<mjo-textfield type="url" label="Website" placeholder="https://example.com"></mjo-textfield>
```

### Lit Example - Input Types

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-types")
export class ExampleTextfieldTypes extends LitElement {
    @state() formData = {
        email: "",
        password: "",
        age: "",
        phone: "",
        website: "",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    type="email"
                    label="Email Address"
                    placeholder="your@email.com"
                    .value=${this.formData.email}
                    @input=${(e: CustomEvent) => this.#updateField("email", e)}
                    helperText="We'll never share your email"
                ></mjo-textfield>

                <mjo-textfield
                    type="password"
                    label="Password"
                    placeholder="Enter secure password"
                    .value=${this.formData.password}
                    @input=${(e: CustomEvent) => this.#updateField("password", e)}
                    helperText="Password must be at least 8 characters"
                ></mjo-textfield>

                <mjo-textfield
                    type="number"
                    label="Age"
                    placeholder="25"
                    min="18"
                    max="120"
                    .value=${this.formData.age}
                    @input=${(e: CustomEvent) => this.#updateField("age", e)}
                    helperText="Must be between 18 and 120"
                    nospiners
                ></mjo-textfield>

                <mjo-textfield
                    type="tel"
                    label="Phone Number"
                    placeholder="+1 234 567 8900"
                    .value=${this.formData.phone}
                    @input=${(e: CustomEvent) => this.#updateField("phone", e)}
                    helperText="Include country code"
                ></mjo-textfield>

                <mjo-textfield
                    type="url"
                    label="Website"
                    placeholder="https://yourwebsite.com"
                    .value=${this.formData.website}
                    @input=${(e: CustomEvent) => this.#updateField("website", e)}
                    helperText="Your personal or company website"
                ></mjo-textfield>
            </div>
        `;
    }

    #updateField(field: string, e: CustomEvent) {
        this.formData = {
            ...this.formData,
            [field]: (e.target as any).value,
        };
    }
}
```

## Sizes

The textfield supports three sizes: `small`, `medium` (default), and `large`.

```html
<mjo-textfield size="small" label="Small textfield" placeholder="Small size"></mjo-textfield>
<mjo-textfield size="medium" label="Medium textfield" placeholder="Medium size"></mjo-textfield>
<mjo-textfield size="large" label="Large textfield" placeholder="Large size"></mjo-textfield>
```

### Lit Example - Sizes

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-sizes")
export class ExampleTextfieldSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    size="small"
                    label="Small textfield"
                    placeholder="Compact input for tight spaces"
                    helperText="Small size with reduced padding"
                ></mjo-textfield>

                <mjo-textfield
                    size="medium"
                    label="Medium textfield"
                    placeholder="Standard size for most cases"
                    helperText="Default medium size"
                ></mjo-textfield>

                <mjo-textfield
                    size="large"
                    label="Large textfield"
                    placeholder="Generous spacing for prominence"
                    helperText="Large size with extra padding"
                ></mjo-textfield>
            </div>
        `;
    }
}
```

## Color Variants

Choose between `primary` (default) and `secondary` color schemes.

```html
<mjo-textfield color="primary" label="Primary textfield"></mjo-textfield> <mjo-textfield color="secondary" label="Secondary textfield"></mjo-textfield>
```

### Lit Example - Colors

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-colors")
export class ExampleTextfieldColors extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    color="primary"
                    label="Primary color"
                    placeholder="Primary color scheme"
                    helperText="Uses primary theme colors when focused"
                ></mjo-textfield>

                <mjo-textfield
                    color="secondary"
                    label="Secondary color"
                    placeholder="Secondary color scheme"
                    helperText="Uses secondary theme colors when focused"
                ></mjo-textfield>
            </div>
        `;
    }
}
```

## Icons and Images

Add visual context with start and end icons or images.

```html
<mjo-textfield label="Email" startIcon="mail" placeholder="your@email.com"></mjo-textfield>

<mjo-textfield label="Search" endIcon="search" placeholder="Search here..."></mjo-textfield>
```

### Lit Example - Icons

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";
import { AiOutlineMail, AiOutlineSearch, AiOutlineUser, AiOutlineLock, AiOutlinePhone, AiOutlineGlobal } from "mjo-icons/ai";

@customElement("example-textfield-icons")
export class ExampleTextfieldIcons extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield label="Email Address" startIcon=${AiOutlineMail} placeholder="your@email.com" helperText="Your email address"></mjo-textfield>

                <mjo-textfield label="Search Query" endIcon=${AiOutlineSearch} placeholder="Search..." helperText="Enter search terms"></mjo-textfield>

                <mjo-textfield
                    label="Username"
                    startIcon=${AiOutlineUser}
                    endIcon=${AiOutlineGlobal}
                    placeholder="your-username"
                    helperText="Unique username for your account"
                ></mjo-textfield>

                <mjo-textfield
                    label="Phone Number"
                    startIcon=${AiOutlinePhone}
                    type="tel"
                    placeholder="+1 234 567 8900"
                    helperText="Your contact number"
                ></mjo-textfield>
            </div>
        `;
    }
}
```

## Password Field with Visibility Toggle

Password fields automatically include a visibility toggle button.

```html
<mjo-textfield type="password" label="Password" placeholder="Enter your password"></mjo-textfield>
```

### Lit Example - Password

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-password")
export class ExampleTextfieldPassword extends LitElement {
    @state() password = "";
    @state() confirmPassword = "";

    render() {
        const passwordsMatch = this.password === this.confirmPassword;
        const showConfirmError = this.confirmPassword.length > 0 && !passwordsMatch;

        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    .value=${this.password}
                    @input=${this.#handlePasswordChange}
                    helperText="Password must be at least 8 characters"
                    counter
                    maxlength="50"
                ></mjo-textfield>

                <mjo-textfield
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    .value=${this.confirmPassword}
                    @input=${this.#handleConfirmPasswordChange}
                    ?error=${showConfirmError}
                    errormsg=${showConfirmError ? "Passwords do not match" : ""}
                    successmsg=${passwordsMatch && this.confirmPassword.length > 0 ? "Passwords match!" : ""}
                    helperText="Re-enter your password"
                ></mjo-textfield>
            </div>
        `;
    }

    #handlePasswordChange(e: CustomEvent) {
        this.password = (e.target as any).value;
    }

    #handleConfirmPasswordChange(e: CustomEvent) {
        this.confirmPassword = (e.target as any).value;
    }
}
```

## Prefix and Suffix Text

Add textual context with prefix and suffix elements.

```html
<mjo-textfield label="Price" prefixText="$" suffixText="USD" placeholder="0.00"></mjo-textfield>
```

### Lit Example - Prefix/Suffix

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-prefix-suffix")
export class ExampleTextfieldPrefixSuffix extends LitElement {
    @state() price = "";
    @state() website = "";
    @state() weight = "";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    label="Product Price"
                    prefixText="$"
                    suffixText="USD"
                    type="number"
                    placeholder="99.99"
                    .value=${this.price}
                    @input=${(e: CustomEvent) => (this.price = (e.target as any).value)}
                    helperText="Price in US dollars"
                    nospiners
                ></mjo-textfield>

                <mjo-textfield
                    label="Website URL"
                    prefixText="https://"
                    suffixText=".com"
                    placeholder="yoursite"
                    .value=${this.website}
                    @input=${(e: CustomEvent) => (this.website = (e.target as any).value)}
                    helperText="Your website domain"
                ></mjo-textfield>

                <mjo-textfield
                    label="Package Weight"
                    suffixText="kg"
                    type="number"
                    placeholder="1.5"
                    step="0.1"
                    .value=${this.weight}
                    @input=${(e: CustomEvent) => (this.weight = (e.target as any).value)}
                    helperText="Weight in kilograms"
                    nospiners
                ></mjo-textfield>
            </div>
        `;
    }
}
```

## Clearable Input

Enable a clear button to quickly empty the field.

```html
<mjo-textfield label="Search" placeholder="Type to search..." clearabled></mjo-textfield>
```

### Lit Example - Clearable

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";
import { AiOutlineSearch } from "mjo-icons/ai";

@customElement("example-textfield-clearable")
export class ExampleTextfieldClearable extends LitElement {
    @state() searchQuery = "";
    @state() email = "";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    label="Search Products"
                    startIcon=${AiOutlineSearch}
                    placeholder="Search for products..."
                    clearabled
                    .value=${this.searchQuery}
                    @input=${(e: CustomEvent) => (this.searchQuery = (e.target as any).value)}
                    helperText="Clear button appears when typing"
                ></mjo-textfield>

                <mjo-textfield
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    clearabled
                    .value=${this.email}
                    @input=${(e: CustomEvent) => (this.email = (e.target as any).value)}
                    helperText="Click X to clear the field"
                ></mjo-textfield>

                <div style="margin-top: 1rem;">
                    <p><strong>Search:</strong> ${this.searchQuery || "No search query"}</p>
                    <p><strong>Email:</strong> ${this.email || "No email entered"}</p>
                </div>
            </div>
        `;
    }
}
```

## Character Counter

Display character count with optional limits.

```html
<mjo-textfield label="Bio" placeholder="Tell us about yourself..." counter maxlength="200"></mjo-textfield>
```

### Lit Example - Character Counter

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-counter")
export class ExampleTextfieldCounter extends LitElement {
    @state() bio = "";
    @state() title = "";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    label="Profile Bio"
                    placeholder="Tell us about yourself..."
                    .value=${this.bio}
                    @input=${(e: CustomEvent) => (this.bio = (e.target as any).value)}
                    counter
                    maxlength="200"
                    helperText="Brief description for your profile"
                ></mjo-textfield>

                <mjo-textfield
                    label="Job Title"
                    placeholder="Your professional title"
                    .value=${this.title}
                    @input=${(e: CustomEvent) => (this.title = (e.target as any).value)}
                    counter
                    maxlength="50"
                    helperText="Keep it concise and professional"
                ></mjo-textfield>
            </div>
        `;
    }
}
```

## Validation States

The textfield integrates with validation systems and displays error/success states.

```html
<!-- Error state -->
<mjo-textfield label="Email" type="email" value="invalid-email" error errormsg="Please enter a valid email address"></mjo-textfield>

<!-- Success state -->
<mjo-textfield label="Username" value="john_doe" successmsg="Username is available!"></mjo-textfield>
```

### Lit Example - Validation

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-validation")
export class ExampleTextfieldValidation extends LitElement {
    @state() email = "";

    render() {
        const isValidEmail = this.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
        const showError = this.email && !isValidEmail;

        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textfield
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    .value=${this.email}
                    @input=${(e: CustomEvent) => (this.email = (e.target as any).value)}
                    ?error=${showError}
                    errormsg=${showError ? "Please enter a valid email address" : ""}
                    successmsg=${isValidEmail ? "Email format is valid!" : ""}
                    helperText="Enter a valid email address"
                ></mjo-textfield>
            </div>
        `;
    }
}
```

## Form Integration

The textfield integrates seamlessly with `mjo-form` for complete form handling.

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-textfield-form")
export class ExampleTextfieldForm extends LitElement {
    @state() formData = {};

    render() {
        return html`
            <mjo-form @mjo-form-submit=${this.#handleSubmit}>
                <h3>User Registration</h3>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <mjo-textfield name="firstName" label="First Name" required placeholder="John" helperText="Your given name"></mjo-textfield>

                    <mjo-textfield name="lastName" label="Last Name" required placeholder="Doe" helperText="Your family name"></mjo-textfield>
                </div>

                <mjo-textfield
                    name="username"
                    label="Username"
                    required
                    minlength="3"
                    maxlength="20"
                    placeholder="johndoe"
                    helperText="Unique username for your account"
                    counter
                ></mjo-textfield>

                <mjo-textfield
                    name="email"
                    label="Email Address"
                    type="email"
                    required
                    placeholder="john@example.com"
                    helperText="We'll send verification to this email"
                ></mjo-textfield>

                <mjo-textfield
                    name="password"
                    label="Password"
                    type="password"
                    required
                    minlength="8"
                    placeholder="Enter secure password"
                    helperText="Minimum 8 characters required"
                ></mjo-textfield>

                <mjo-textfield
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    helperText="Optional: for account recovery"
                ></mjo-textfield>

                <mjo-textfield
                    name="website"
                    label="Website (Optional)"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    helperText="Your personal or professional website"
                ></mjo-textfield>

                <mjo-textfield name="company" label="Company" placeholder="Acme Corp" helperText="Where do you work?"></mjo-textfield>

                <mjo-button type="submit" style="margin-top: 1rem;"> Create Account </mjo-button>
            </mjo-form>

            <div style="margin-top: 1rem;">
                <h4>Form Data:</h4>
                <pre style="background: var(--mjo-color-surface); padding: 1rem; border-radius: 4px; overflow-x: auto;">
${JSON.stringify(this.formData, null, 2)}
                </pre
                >
            </div>
        `;
    }

    #handleSubmit(e: CustomEvent) {
        this.formData = e.detail.data;
        console.log("Form submitted:", e.detail);
    }
}
```

## Advanced Features

### Auto-focus and Selection

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-advanced")
export class ExampleTextfieldAdvanced extends LitElement {
    @state() settings = {
        autoFocus: false,
        selectOnFocus: false,
        readonly: false,
        disabled: false,
        fullwidth: false,
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                    <label>
                        <input
                            type="checkbox"
                            .checked=${this.settings.autoFocus}
                            @change=${(e: Event) => this.#updateSetting("autoFocus", (e.target as HTMLInputElement).checked)}
                        />
                        Auto Focus
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            .checked=${this.settings.selectOnFocus}
                            @change=${(e: Event) => this.#updateSetting("selectOnFocus", (e.target as HTMLInputElement).checked)}
                        />
                        Select on Focus
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            .checked=${this.settings.readonly}
                            @change=${(e: Event) => this.#updateSetting("readonly", (e.target as HTMLInputElement).checked)}
                        />
                        Readonly
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            .checked=${this.settings.disabled}
                            @change=${(e: Event) => this.#updateSetting("disabled", (e.target as HTMLInputElement).checked)}
                        />
                        Disabled
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            .checked=${this.settings.fullwidth}
                            @change=${(e: Event) => this.#updateSetting("fullwidth", (e.target as HTMLInputElement).checked)}
                        />
                        Full Width
                    </label>
                </div>

                <mjo-textfield
                    label="Advanced textfield"
                    placeholder="Test different states..."
                    value="Sample text content for testing"
                    .autoFocus=${this.settings.autoFocus}
                    .selectOnFocus=${this.settings.selectOnFocus}
                    .readonly=${this.settings.readonly}
                    .disabled=${this.settings.disabled}
                    .fullwidth=${this.settings.fullwidth}
                    helperText="Use the checkboxes above to test different states"
                    clearabled
                    counter
                    maxlength="100"
                ></mjo-textfield>
            </div>
        `;
    }

    #updateSetting(key: string, value: boolean) {
        this.settings = { ...this.settings, [key]: value };
    }
}
```

## Attributes/Properties

| Name             | Type                                                                | Default     | Description                                         |
| ---------------- | ------------------------------------------------------------------- | ----------- | --------------------------------------------------- |
| `autoCapitalize` | `'off' \| 'none' \| 'on' \| 'sentences' \| 'words' \| 'characters'` | `undefined` | Controls automatic capitalization                   |
| `autoComplete`   | `AutoFillContactField`                                              | `undefined` | Autocomplete attribute for form autofill            |
| `autoFocus`      | `boolean`                                                           | `false`     | Whether the textfield should focus automatically    |
| `clearabled`     | `boolean`                                                           | `false`     | Whether to show a clear button when there's content |
| `color`          | `'primary' \| 'secondary'`                                          | `'primary'` | Color variant of the textfield                      |
| `counter`        | `boolean`                                                           | `false`     | Whether to show character counter                   |
| `disabled`       | `boolean`                                                           | `false`     | Whether the textfield is disabled                   |
| `endIcon`        | `string`                                                            | `undefined` | Icon to display at the end of the textfield         |
| `endImage`       | `string`                                                            | `undefined` | Image URL to display at the end of the textfield    |
| `error`          | `boolean`                                                           | `false`     | Whether the textfield is in error state             |
| `errormsg`       | `string`                                                            | `undefined` | Error message to display                            |
| `fullwidth`      | `boolean`                                                           | `false`     | Whether the textfield should take full width        |
| `helperText`     | `string`                                                            | `undefined` | Helper text displayed below the textfield           |
| `label`          | `string`                                                            | `undefined` | Label text for the textfield                        |
| `max`            | `number`                                                            | `undefined` | Maximum value for number inputs                     |
| `maxlength`      | `number`                                                            | `undefined` | Maximum number of characters allowed                |
| `min`            | `number`                                                            | `undefined` | Minimum value for number inputs                     |
| `minlength`      | `number`                                                            | `undefined` | Minimum number of characters required               |
| `name`           | `string`                                                            | `undefined` | Name attribute for form submission                  |
| `nospiners`      | `boolean`                                                           | `false`     | Hide spinner buttons on number inputs               |
| `placeholder`    | `string`                                                            | `undefined` | Placeholder text                                    |
| `prefixText`     | `string`                                                            | `undefined` | Text to display before the input                    |
| `readonly`       | `boolean`                                                           | `false`     | Whether the textfield is read-only                  |
| `required`       | `boolean`                                                           | `false`     | Whether the textfield is required in forms          |
| `selectOnFocus`  | `boolean`                                                           | `false`     | Whether to select all text when focused             |
| `size`           | `'small' \| 'medium' \| 'large'`                                    | `'medium'`  | Size variant of the textfield                       |
| `startIcon`      | `string`                                                            | `undefined` | Icon to display at the start of the textfield       |
| `startImage`     | `string`                                                            | `undefined` | Image URL to display at the start of the textfield  |
| `step`           | `number`                                                            | `undefined` | Step value for number inputs                        |
| `success`        | `boolean`                                                           | `false`     | Whether the textfield is in success state           |
| `successmsg`     | `string`                                                            | `undefined` | Success message to display                          |
| `suffixText`     | `string`                                                            | `undefined` | Text to display after the input                     |
| `theme`          | `Record<string, string>`                                            | `undefined` | Component-level theme override object               |
| `type`           | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'`     | `'text'`    | Input type                                          |
| `value`          | `string`                                                            | `''`        | Current value of the textfield                      |

## Events

All events are dispatched with enhanced detail data for better form integration and accessibility.

| Name                            | Type                              | Description                                                    |
| ------------------------------- | --------------------------------- | -------------------------------------------------------------- |
| `mjo-textfield-input`           | `MjoTextfieldInputEvent`          | Enhanced input event with value, validation and metadata       |
| `mjo-textfield-change`          | `MjoTextfieldChangeEvent`         | Enhanced change event fired when value changes and loses focus |
| `mjo-textfield-focus`           | `MjoTextfieldFocusEvent`          | Enhanced focus event with element state information            |
| `mjo-textfield-blur`            | `MjoTextfieldBlurEvent`           | Enhanced blur event with validation and value information      |
| `mjo-textfield-keyup`           | `MjoTextfieldKeyupEvent`          | Enhanced keyup event (Enter key submits form)                  |
| `mjo-textfield-clear`           | `MjoTextfieldClearEvent`          | Fired when the clear button is clicked                         |
| `mjo-textfield-password-toggle` | `MjoTextfieldPasswordToggleEvent` | Fired when password visibility is toggled                      |

### Event Details

Each event includes comprehensive detail information:

```ts
// mjo-textfield-input event detail
{
    element: MjoTextfield;
    value: string;
    previousValue: string;
    inputType: string;
}

// mjo-textfield-change event detail
{
    element: MjoTextfield;
    value: string;
    previousValue: string;
}

// mjo-textfield-focus/blur event detail
{
    element: MjoTextfield;
    value: string;
}

// mjo-textfield-keyup event detail
{
    element: MjoTextfield;
    key: string;
    code: string;
    value: string;
    originalEvent: KeyboardEvent;
}

// mjo-textfield-clear event detail
{
    element: MjoTextfield;
    previousValue: string;
}

// mjo-textfield-password-toggle event detail
{
    element: MjoTextfield;
    visible: boolean;
    type: "password" | "text";
}
```

## Methods

| Name                         | Type     | Description                                 |
| ---------------------------- | -------- | ------------------------------------------- |
| `setValue(value: string)`    | `void`   | Programmatically set the textfield value    |
| `getValue()`                 | `string` | Get the current textfield value             |
| `focus()`                    | `void`   | Focus the textfield programmatically        |
| `blur()`                     | `void`   | Remove focus from the textfield             |
| `clear(focus?: boolean)`     | `void`   | Clear the textfield value, optionally focus |
| `setError(errormsg: string)` | `void`   | Set error state with message                |
| `removeError()`              | `void`   | Clear error state                           |
| `getError()`                 | `string` | Get current error message                   |

## CSS Parts

The textfield component exposes several CSS parts for advanced styling:

| Name                          | Description                                        |
| ----------------------------- | -------------------------------------------------- |
| `container`                   | The main textfield container                       |
| `input`                       | The native input element                           |
| `label-container`             | The label container element                        |
| `label-truncate-container`    | The label truncate container                       |
| `label-truncate-wrapper`      | The label truncate wrapper                         |
| `prefix-text`                 | Container for prefix text                          |
| `suffix-text`                 | Container for suffix text                          |
| `start-icon-container`        | Container for start icon                           |
| `start-icon`                  | The start icon element (via exportparts)           |
| `end-icon-container`          | Container for end icon                             |
| `end-icon`                    | The end icon element (via exportparts)             |
| `start-image-container`       | Container for start image                          |
| `start-image`                 | The start image element                            |
| `end-image-container`         | Container for end image                            |
| `end-image`                   | The end image element                              |
| `clear-button`                | The clear button element                           |
| `clear-icon`                  | The clear icon element (via exportparts)           |
| `password-button`             | The password toggle button element                 |
| `password-icon`               | The password toggle icon element (via exportparts) |
| `helper-container`            | Helper container (via exportparts)                 |
| `helper-text-container`       | Helper text container (via exportparts)            |
| `helper-text-typography`      | Helper text typography (via exportparts)           |
| `helper-text-error-message`   | Error message element (via exportparts)            |
| `helper-text-success-message` | Success message element (via exportparts)          |
| `helper-text-icon`            | Helper text icon element (via exportparts)         |
| `counter-container`           | Character counter container (via exportparts)      |
| `counter-text`                | Character counter text (via exportparts)           |

## CSS Custom Properties

The textfield component provides extensive customization through CSS custom properties:

| Name                                       | Default                                                       | Description                             |
| ------------------------------------------ | ------------------------------------------------------------- | --------------------------------------- |
| `--mjo-input-background-color`             | `var(--mjo-background-color-card-low, #ffffff)`               | Background color of the textfield       |
| `--mjo-input-border-color`                 | `var(--mjo-border-color, #dddddd)`                            | Border color of the textfield           |
| `--mjo-input-border-color-hover`           | `#cccccc`                                                     | Border color on hover                   |
| `--mjo-input-border-style`                 | `solid`                                                       | Border style                            |
| `--mjo-input-border-style-focus`           | `solid`                                                       | Border style when focused               |
| `--mjo-input-border-style-hover`           | `solid`                                                       | Border style on hover                   |
| `--mjo-input-border-width`                 | `1px`                                                         | Border width                            |
| `--mjo-input-border-width-focus`           | `1px`                                                         | Border width when focused               |
| `--mjo-input-border-width-hover`           | `1px`                                                         | Border width on hover                   |
| `--mjo-input-box-shadow`                   | `none`                                                        | Box shadow of the textfield             |
| `--mjo-input-color`                        | `var(--mjo-foreground-color, #222222)`                        | Text color                              |
| `--mjo-input-font-family`                  | `inherit`                                                     | Font family                             |
| `--mjo-input-font-size`                    | `1em`                                                         | Font size                               |
| `--mjo-input-font-weight`                  | `normal`                                                      | Font weight                             |
| `--mjo-input-padding`                      | `calc(1em / 2 - 3px) calc(1em / 2 - 2px) calc(1em / 2 - 4px)` | Padding inside the textfield            |
| `--mjo-input-padding-small`                | `calc(1em / 2 - 4px) calc(1em / 2)`                           | Padding for small size                  |
| `--mjo-input-padding-large`                | `calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px)` | Padding for large size                  |
| `--mjo-input-prefix-text-background-color` | `rgba(220, 220, 220, 0.5)`                                    | Background color for prefix/suffix text |
| `--mjo-input-prefix-text-color`            | `currentColor`                                                | Text color for prefix/suffix text       |
| `--mjo-input-primary-color`                | `var(--mjo-primary-color, #1aa8ed)`                           | Primary color for focus states          |
| `--mjo-input-border-radius`                | `var(--mjo-radius-medium, 5px)`                               | Border radius                           |
| `--mjo-input-secondary-color`              | `var(--mjo-secondary-color, #7dc717)`                         | Secondary color for focus states        |

## Theme Configuration

For global theme customization, use the theme configuration:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-textfield";

@customElement("example-textfield-theme")
export class ExampleTextfieldTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .config=${{
                    components: {
                        mjoTextfield: {
                            backgroundColor: "#f8fafc",
                            borderColor: "#e2e8f0",
                            borderColorHover: "#cbd5e1",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontFamily: "Inter, sans-serif",
                            padding: "12px 16px",
                            paddingSmall: "8px 12px",
                            paddingLarge: "16px 20px",
                        },
                    },
                }}
            >
                <mjo-textfield
                    label="Themed textfield"
                    placeholder="This textfield uses custom theme settings"
                    helperText="Styled with custom theme configuration"
                ></mjo-textfield>
            </mjo-theme>
        `;
    }
}
```

## Best Practices

1. **Labels**: Always provide meaningful labels for accessibility
2. **Input Types**: Use appropriate input types for better UX and validation
3. **Placeholder**: Use placeholder text to guide user input
4. **Validation**: Provide clear error messages and helper text
5. **Character Limits**: Use `maxlength` with `counter` for content with limits
6. **Auto-complete**: Set appropriate `autoComplete` values for form fields
7. **Password Security**: Use `type="password"` for sensitive data
8. **Form Integration**: Use with `mjo-form` for complete form handling

## Accessibility

The textfield component follows WCAG accessibility guidelines and includes comprehensive accessibility features:

### ARIA Support

- **aria-labelledby**: Automatically connects to associated labels
- **aria-describedby**: Links to helper text, error messages, and character counter
- **aria-invalid**: Set to `true` when in error state for screen readers
- **aria-required**: Indicates required fields
- **role**: Proper semantic roles for all interactive elements

### Keyboard Navigation

- **Tab**: Navigate to/from the textfield
- **Enter**: Submit parent form (if applicable)
- **Escape**: Clear field when clearable is enabled
- **Tab/Shift+Tab**: Navigate between clear button, password toggle, etc.

### Screen Reader Support

- Labels are properly associated with inputs
- Error messages are announced when validation fails
- Success messages provide positive feedback
- Helper text provides additional context
- Character counter updates are announced
- Password visibility changes are announced

### Interactive Elements

- Clear button has proper `aria-label` and keyboard support
- Password toggle button includes descriptive `aria-label`
- All interactive icons are converted to proper `<button>` elements
- Focus management maintains logical tab order

### Error Handling

- Error states use `role="alert"` for immediate announcement
- Error messages are connected via `aria-describedby`
- Visual error indicators are supplemented with screen reader text

## Browser Compatibility

- **Input Types**: Full support for all specified input types
- **Auto-complete**: Supported in all modern browsers
- **Form Integration**: Universal form API support
- **CSS Custom Properties**: Supported in all modern browsers

## Notes

- Password fields automatically include visibility toggle functionality
- Character counter updates in real-time during input
- Clear button appears only when there's content to clear
- Icons and images can be combined with prefix/suffix text
- Enter key in textfield submits the parent form automatically
- Component inherits styling from the input theme system
- Form validation integrates seamlessly with `mjo-form`
- **Enhanced Accessibility**: Full ARIA support with proper labelledby and describedby associations
- **Shadow DOM Compatible**: All ID relationships work properly within shadow boundaries
- **Improved Events**: All events include comprehensive detail objects for better integration
- **Interactive Icons**: Icons are converted to proper semantic buttons with accessibility labels
- **Screen Reader Support**: Error states, success messages, and counter updates are announced
- **Keyboard Navigation**: Full keyboard support including Tab, Enter, and Escape keys

## Related Components

- [mjo-textarea](./mjo-textarea.md) - For multi-line text input
- [mjo-form](./mjo-form.md) - For form integration and validation
- [mjo-icon](./mjo-icon.md) - For textfield icons
- [mjo-theme](./mjo-theme.md) - For theme configuration
