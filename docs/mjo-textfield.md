# mjo-textfield

Versatile single-line text input component with comprehensive features including validation, icons, prefix/suffix text, password visibility toggle, and full form integration.

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
- [Additional Notes](#additional-notes)

## Use Cases

- Single-line text input for forms with multiple input types (text, email, password, number, tel, url)
- Password fields with visibility toggle
- Input fields with start/end icons or images for visual context
- Text inputs with prefix/suffix text (e.g., currency symbols, units)
- Character counting with validation feedback
- Clearable inputs with optional clear button
- Form validation with custom error and success messages
- Number inputs with optional spinner controls

## Import

```typescript
import "mjo-litui/mjo-textfield";
```

## Properties

| Property         | Type                                                                | Description                                                                   | Default     | Required |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------- | -------- |
| `autoCapitalize` | `"off" \| "none" \| "on" \| "sentences" \| "words" \| "characters"` | Controls automatic capitalization of text input                               | -           | No       |
| `autoComplete`   | `AutoFillContactField`                                              | Enables browser autocomplete functionality                                    | -           | No       |
| `autoFocus`      | `boolean`                                                           | Automatically focuses the input when mounted                                  | `false`     | No       |
| `disabled`       | `boolean`                                                           | Disables the input (reflected as attribute)                                   | `false`     | No       |
| `fullwidth`      | `boolean`                                                           | Makes the input take full width of container                                  | `false`     | No       |
| `name`           | `string`                                                            | Name attribute for form submission                                            | -           | No       |
| `placeholder`    | `string`                                                            | Placeholder text displayed when empty                                         | -           | No       |
| `readonly`       | `boolean`                                                           | Makes the input read-only                                                     | `false`     | No       |
| `step`           | `number`                                                            | Step value for number inputs                                                  | -           | No       |
| `type`           | `"text" \| "password" \| "email" \| "number" \| "tel" \| "url"`     | Input type determining behavior and validation                                | `"text"`    | No       |
| `value`          | `string`                                                            | Current value of the input                                                    | `""`        | No       |
| `label`          | `string`                                                            | Label text displayed above the input                                          | -           | No       |
| `size`           | `"small" \| "medium" \| "large"`                                    | Visual size variant of the input                                              | `"medium"`  | No       |
| `color`          | `"primary" \| "secondary"`                                          | Color theme for focus state                                                   | `"primary"` | No       |
| `variant`        | `"default" \| "ghost" \| "flat"`                                    | Visual style variant                                                          | `"default"` | No       |
| `startIcon`      | `string`                                                            | Icon displayed at the start of the input                                      | -           | No       |
| `endIcon`        | `string`                                                            | Icon displayed at the end of the input                                        | -           | No       |
| `startImage`     | `string`                                                            | Image URL displayed at the start (ignored if startIcon exists)                | -           | No       |
| `endImage`       | `string`                                                            | Image URL displayed at the end (ignored if endIcon exists)                    | -           | No       |
| `prefixText`     | `string`                                                            | Text displayed before the input value (e.g., currency symbol)                 | -           | No       |
| `suffixText`     | `string`                                                            | Text displayed after the input value (e.g., unit)                             | -           | No       |
| `helperText`     | `string`                                                            | Helper text displayed below the input                                         | -           | No       |
| `counter`        | `boolean`                                                           | Displays character counter                                                    | `false`     | No       |
| `selectOnFocus`  | `boolean`                                                           | Selects all text when input receives focus                                    | `false`     | No       |
| `clearabled`     | `boolean`                                                           | Shows clear button when input has value                                       | `false`     | No       |
| `nospiners`      | `boolean`                                                           | Hides spinner controls for number inputs                                      | `false`     | No       |
| `maxlength`      | `number`                                                            | Maximum number of characters allowed (inherited from InputErrorMixin)         | -           | No       |
| `minlength`      | `number`                                                            | Minimum number of characters required (inherited from InputErrorMixin)        | -           | No       |
| `min`            | `number`                                                            | Minimum value for number inputs (inherited from InputErrorMixin)              | -           | No       |
| `max`            | `number`                                                            | Maximum value for number inputs (inherited from InputErrorMixin)              | -           | No       |
| `pattern`        | `string`                                                            | Regular expression pattern for validation (inherited from InputErrorMixin)    | -           | No       |
| `required`       | `boolean`                                                           | Makes the field required for form validation (inherited from InputErrorMixin) | `false`     | No       |
| `error`          | `boolean`                                                           | Displays error state (inherited from InputErrorMixin)                         | `false`     | No       |
| `errormsg`       | `string`                                                            | Error message displayed below input (inherited from InputErrorMixin)          | -           | No       |
| `successmsg`     | `string`                                                            | Success message displayed below input (inherited from InputErrorMixin)        | -           | No       |

## Public Methods

| Method        | Parameters         | Description                                      | Returns                   |
| ------------- | ------------------ | ------------------------------------------------ | ------------------------- |
| `setValue`    | `value: string`    | Sets the input value programmatically            | `void`                    |
| `getValue`    | -                  | Gets the current input value                     | `string`                  |
| `blur`        | -                  | Removes focus from the input                     | `void`                    |
| `clear`       | `focus?: boolean`  | Clears the input value and optionally focuses it | `void`                    |
| `focus`       | -                  | Sets focus to the input                          | `void`                    |
| `getError`    | -                  | Returns the current error message                | `string \| undefined`     |
| `getForm`     | -                  | Returns the closest parent form element          | `HTMLFormElement \| null` |
| `removeError` | -                  | Removes error state and message                  | `void`                    |
| `setError`    | `errormsg: string` | Sets error state and message                     | `void`                    |

## Events

| Event                           | Description                                    | Type                              | Detail Properties                                                                                       |
| ------------------------------- | ---------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `mjo-textfield:input`           | Fired on every input change                    | `MjoTextfieldInputEvent`          | `element: MjoTextfield`, `value: string`, `previousValue: string`, `inputType: string`                  |
| `mjo-textfield:change`          | Fired when value changes and field loses focus | `MjoTextfieldChangeEvent`         | `element: MjoTextfield`, `value: string`, `previousValue: string`                                       |
| `mjo-textfield:focus`           | Fired when the input gains focus               | `MjoTextfieldFocusEvent`          | `element: MjoTextfield`, `value: string`                                                                |
| `mjo-textfield:blur`            | Fired when the input loses focus               | `MjoTextfieldBlurEvent`           | `element: MjoTextfield`, `value: string`                                                                |
| `mjo-textfield:keyup`           | Fired on keyup events                          | `MjoTextfieldKeyupEvent`          | `element: MjoTextfield`, `key: string`, `code: string`, `value: string`, `originalEvent: KeyboardEvent` |
| `mjo-textfield:keydown`         | Fired on keydown events                        | `MjoTextfieldKeydownEvent`        | `element: MjoTextfield`, `key: string`, `code: string`, `value: string`, `originalEvent: KeyboardEvent` |
| `mjo-textfield:clear`           | Fired when the clear button is clicked         | `MjoTextfieldClearEvent`          | `element: MjoTextfield`, `previousValue: string`                                                        |
| `mjo-textfield:password-toggle` | Fired when password visibility is toggled      | `MjoTextfieldPasswordToggleEvent` | `element: MjoTextfield`, `visible: boolean`, `type: "password" \| "text"`                               |

## CSS Variables

| Variable                                   | Description                            | Default                                                       |
| ------------------------------------------ | -------------------------------------- | ------------------------------------------------------------- |
| `--mjo-input-border-radius`                | Border radius of the input container   | `--mjo-radius-medium` or `5px`                                |
| `--mjo-input-border-style`                 | Border style of the container          | `solid`                                                       |
| `--mjo-input-border-width`                 | Border width of the container          | `1px`                                                         |
| `--mjo-input-border-color`                 | Border color of the container          | `--mjo-border-color` or `#dddddd`                             |
| `--mjo-input-background-color`             | Background color of the container      | `--mjo-background-color-card-low` or `#ffffff`                |
| `--mjo-input-box-shadow`                   | Box shadow of the container            | `none`                                                        |
| `--mjo-input-border-style-hover`           | Border style on hover                  | `solid`                                                       |
| `--mjo-input-border-width-hover`           | Border width on hover                  | `1px`                                                         |
| `--mjo-input-border-color-hover`           | Border color on hover                  | `#cccccc`                                                     |
| `--mjo-input-border-style-focus`           | Border style when focused              | `solid`                                                       |
| `--mjo-input-border-width-focus`           | Border width when focused              | `1px`                                                         |
| `--mjo-input-primary-color`                | Primary theme color for focus state    | `--mjo-primary-color` or `#1aa8ed`                            |
| `--mjo-input-secondary-color`              | Secondary theme color for focus state  | `--mjo-secondary-color` or `#7dc717`                          |
| `--mjo-input-padding`                      | Inner padding of the input             | `calc(1em / 2 - 3px) calc(1em / 2 - 2px) calc(1em / 2 - 4px)` |
| `--mjo-input-padding-small`                | Inner padding for small size           | `calc(1em / 2 - 4px) calc(1em / 2)`                           |
| `--mjo-input-padding-large`                | Inner padding for large size           | `calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px)` |
| `--mjo-input-font-size`                    | Font size of the input text            | `1em`                                                         |
| `--mjo-input-font-weight`                  | Font weight of the input text          | `normal`                                                      |
| `--mjo-input-font-family`                  | Font family of the input text          | `inherit`                                                     |
| `--mjo-input-color`                        | Text color of the input                | `--mjo-foreground-color` or `#222222`                         |
| `--mjo-input-prefix-text-background-color` | Background color of prefix text        | `rgba(220, 220, 220, 0.5)`                                    |
| `--mjo-input-prefix-text-color`            | Text color of prefix text              | `currentColor`                                                |
| `--mjo-input-label-font-size`              | Font size of the label                 | `calc(1em * 0.8)`                                             |
| `--mjo-input-label-font-weight`            | Font weight of the label               | `normal`                                                      |
| `--mjo-input-label-color`                  | Color of the label                     | `currentColor`                                                |
| `--mjo-input-helper-font-size`             | Font size of helper text and counter   | `calc(1em * 0.8)`                                             |
| `--mjo-input-helper-font-weight`           | Font weight of helper text and counter | `normal`                                                      |
| `--mjo-input-helper-color`                 | Color of helper text and counter       | `--mjo-foreground-color-low` or `currentColor`                |

## CSS Parts

| Part                          | Description                                        | Element                      |
| ----------------------------- | -------------------------------------------------- | ---------------------------- |
| `container`                   | The main input container                           | `<div>`                      |
| `input`                       | The native input element                           | `<input>`                    |
| `label-container`             | The label container (via exportparts)              | `<mjoint-input-label>`       |
| `label-truncate-container`    | The label truncate container (via exportparts)     | `<mjo-text-nowrap>`          |
| `label-truncate-wrapper`      | The label truncate wrapper (via exportparts)       | `<mjo-text-nowrap>`          |
| `prefix-text`                 | Container for prefix text                          | `<div>`                      |
| `suffix-text`                 | Container for suffix text                          | `<div>`                      |
| `start-icon-container`        | Container for start icon                           | `<div>`                      |
| `start-icon`                  | The start icon element (via exportparts)           | `<mjo-icon>`                 |
| `end-icon-container`          | Container for end icon                             | `<div>`                      |
| `end-icon`                    | The end icon element (via exportparts)             | `<mjo-icon>`                 |
| `start-image-container`       | Container for start image                          | `<div>`                      |
| `start-image`                 | The start image element                            | `<img>`                      |
| `end-image-container`         | Container for end image                            | `<div>`                      |
| `end-image`                   | The end image element                              | `<img>`                      |
| `clear-button`                | The clear button element                           | `<button>`                   |
| `clear-icon`                  | The clear icon element (via exportparts)           | `<mjo-icon>`                 |
| `password-button`             | The password toggle button element                 | `<button>`                   |
| `password-icon`               | The password toggle icon element (via exportparts) | `<mjo-icon>`                 |
| `helper-container`            | Helper container (via exportparts)                 | `<mjoint-input-helper-text>` |
| `helper-text-container`       | Helper text container (via exportparts)            | `<div>`                      |
| `helper-text-typography`      | Helper text typography (via exportparts)           | `<mjo-typography>`           |
| `helper-text-error-message`   | Error message element (via exportparts)            | `<div>`                      |
| `helper-text-success-message` | Success message element (via exportparts)          | `<div>`                      |
| `helper-text-icon`            | Helper text icon element (via exportparts)         | `<mjo-icon>`                 |
| `counter-container`           | Character counter container (via exportparts)      | `<mjoint-input-counter>`     |
| `counter-text`                | Character counter text (via exportparts)           | `<mjo-typography>`           |

## Accessibility

### Best Practices

- Always provide a `label` for screen reader context
- Use `helperText` to provide additional instructions
- Error messages are announced via `aria-live` regions
- The input includes proper ARIA attributes automatically (`aria-invalid`, `aria-required`, `aria-describedby`)
- For password fields, the visibility toggle button includes appropriate `aria-label`

### ARIA Attributes

The component automatically manages:

- `aria-label` or `aria-labelledby` for labeling
- `aria-describedby` linking to helper text and error messages
- `aria-invalid` reflecting error state
- `aria-required` when field is required
- `aria-errormessage` linking to error messages

### Keyboard Interactions

- **Focus**: Standard tab navigation
- **Text Input**: All standard text editing keyboard shortcuts
- **Enter**: Submits the parent form when inside a form
- **Escape**: Can be used to clear value when `clearabled` is enabled (via custom implementation)

## Usage Examples

### Password field with visibility toggle

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("login-form")
class LoginForm extends LitElement {
    render() {
        return html` <mjo-textfield type="password" label="Password" placeholder="Enter your password" required minlength="8"></mjo-textfield> `;
    }
}
```

### Input with prefix and suffix text

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("price-input")
class PriceInput extends LitElement {
    @state() private price = "";

    render() {
        return html`
            <mjo-textfield
                type="number"
                label="Price"
                placeholder="0.00"
                prefixText="$"
                suffixText="USD"
                .value=${this.price}
                @mjo-textfield:input=${(e: CustomEvent) => {
                    this.price = e.detail.value;
                }}
            ></mjo-textfield>
        `;
    }
}
```

### Clearable input with character counter

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("username-input")
class UsernameInput extends LitElement {
    @state() private username = "";

    render() {
        return html`
            <mjo-textfield
                label="Username"
                placeholder="Choose a username"
                helperText="Username must be between 3 and 20 characters"
                .value=${this.username}
                maxlength="20"
                minlength="3"
                counter
                clearabled
                required
                @mjo-textfield:input=${(e: CustomEvent) => {
                    this.username = e.detail.value;
                }}
            ></mjo-textfield>
        `;
    }
}
```

### Email validation with custom error handling

```typescript
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";
import type { MjoTextfield } from "mjo-litui";

@customElement("email-validator")
class EmailValidator extends LitElement {
    @query("mjo-textfield") input!: MjoTextfield;
    @state() private email = "";

    private async validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(this.email)) {
            this.input.setError("Please enter a valid email address");
            return;
        }

        // Simulate API validation
        const isAvailable = await this.checkEmailAvailability(this.email);

        if (!isAvailable) {
            this.input.setError("This email is already registered");
        } else {
            this.input.removeError();
        }
    }

    private async checkEmailAvailability(email: string): Promise<boolean> {
        // Simulated API call
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    }

    render() {
        return html`
            <mjo-textfield
                type="email"
                label="Email"
                placeholder="your@email.com"
                .value=${this.email}
                required
                @mjo-textfield:change=${() => this.validateEmail()}
                @mjo-textfield:input=${(e: CustomEvent) => {
                    this.email = e.detail.value;
                }}
            ></mjo-textfield>
        `;
    }
}
```

### Number input with validation and no spinners

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("age-input")
class AgeInput extends LitElement {
    @state() private age = "";

    render() {
        return html`
            <mjo-textfield
                type="number"
                label="Age"
                placeholder="Enter your age"
                helperText="Must be between 18 and 120"
                .value=${this.age}
                min="18"
                max="120"
                step="1"
                nospiners
                required
                @mjo-textfield:input=${(e: CustomEvent) => {
                    this.age = e.detail.value;
                }}
            ></mjo-textfield>
        `;
    }
}
```

### Input with icons for visual context

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AiOutlineUser, AiOutlineSearch } from "mjo-icons/ai";
import "mjo-litui/mjo-textfield";

@customElement("search-input")
class SearchInput extends LitElement {
    @state() private searchTerm = "";

    render() {
        return html`
            <div>
                <mjo-textfield
                    label="Username"
                    placeholder="Enter username"
                    .startIcon=${AiOutlineUser}
                    .value=${this.searchTerm}
                    @mjo-textfield:input=${(e: CustomEvent) => {
                        this.searchTerm = e.detail.value;
                    }}
                ></mjo-textfield>

                <mjo-textfield placeholder="Search..." .endIcon=${AiOutlineSearch} variant="ghost" fullwidth></mjo-textfield>
            </div>
        `;
    }
}
```

### Form integration with programmatic control

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";
import type { MjoTextfield } from "mjo-litui";

@customElement("registration-form")
class RegistrationForm extends LitElement {
    @query("#firstName") firstNameInput!: MjoTextfield;
    @query("#lastName") lastNameInput!: MjoTextfield;
    @query("#email") emailInput!: MjoTextfield;

    private async handleSubmit(e: Event) {
        e.preventDefault();

        const form = this.firstNameInput.getForm();
        if (!form) return;

        const formData = new FormData(form);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
        };

        try {
            // Simulate API call
            await this.submitForm(data);
            this.clearForm();
        } catch (error) {
            this.emailInput.setError("Registration failed. Please try again.");
        }
    }

    private async submitForm(data: any): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    private clearForm() {
        this.firstNameInput.clear();
        this.lastNameInput.clear();
        this.emailInput.clear();
        this.firstNameInput.focus();
    }

    render() {
        return html`
            <form @submit=${this.handleSubmit}>
                <mjo-textfield id="firstName" name="firstName" label="First Name" placeholder="John" required></mjo-textfield>

                <mjo-textfield id="lastName" name="lastName" label="Last Name" placeholder="Doe" required></mjo-textfield>

                <mjo-textfield id="email" name="email" type="email" label="Email" placeholder="john.doe@example.com" required></mjo-textfield>

                <button type="submit">Register</button>
                <button type="button" @click=${this.clearForm}>Clear</button>
            </form>
        `;
    }
}
```

### Custom styling with CSS parts and variables

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("styled-input")
class StyledInput extends LitElement {
    render() {
        return html` <mjo-textfield class="custom-input" label="Custom Styled Input" placeholder="Type something..."></mjo-textfield> `;
    }

    static styles = css`
        .custom-input {
            --mjo-input-border-radius: 20px;
            --mjo-input-border-width: 2px;
            --mjo-input-primary-color: #ff6b6b;
            --mjo-input-font-size: 1.1em;
            --mjo-input-padding: 12px 16px;
        }

        .custom-input::part(container) {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .custom-input::part(input) {
            font-weight: 500;
        }

        .custom-input::part(label-container) {
            margin-bottom: 8px;
        }
    `;
}
```

### Event handling with keyboard interactions

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textfield";

@customElement("search-with-shortcuts")
class SearchWithShortcuts extends LitElement {
    @state() private searchValue = "";
    @state() private searchHistory: string[] = [];

    private handleKeydown(e: CustomEvent) {
        const { key, originalEvent } = e.detail;

        // Clear on Escape
        if (key === "Escape") {
            this.searchValue = "";
            e.detail.element.clear();
        }

        // Search on Enter
        if (key === "Enter") {
            originalEvent.preventDefault();
            this.performSearch(this.searchValue);
        }
    }

    private handleClear() {
        console.log("Search cleared");
    }

    private performSearch(query: string) {
        if (query.trim()) {
            this.searchHistory = [query, ...this.searchHistory.slice(0, 9)];
            console.log("Searching for:", query);
        }
    }

    render() {
        return html`
            <div>
                <mjo-textfield
                    placeholder="Search... (ESC to clear, ENTER to search)"
                    .value=${this.searchValue}
                    clearabled
                    fullwidth
                    @mjo-textfield:input=${(e: CustomEvent) => {
                        this.searchValue = e.detail.value;
                    }}
                    @mjo-textfield:keydown=${this.handleKeydown}
                    @mjo-textfield:clear=${this.handleClear}
                ></mjo-textfield>

                ${this.searchHistory.length > 0
                    ? html`
                          <div class="history">
                              <h4>Recent searches:</h4>
                              <ul>
                                  ${this.searchHistory.map((item) => html`<li>${item}</li>`)}
                              </ul>
                          </div>
                      `
                    : null}
            </div>
        `;
    }
}
```

## Additional Notes

- The component automatically submits parent forms when Enter key is pressed (except when form is invalid)
- Icons take precedence over images (if both `startIcon` and `startImage` are provided, only the icon is shown)
- The password visibility toggle is automatically shown for `type="password"` fields
- The clear button is only visible when the input has a value and `clearabled` is enabled
- The component integrates with native form validation and submission
- The `selectOnFocus` property is useful for scenarios where users might want to replace the entire content
- Number inputs support `min`, `max`, and `step` validation
- The `nospiners` property hides the default browser spinner controls for number inputs
- Form data is automatically synchronized when value changes
- Character counter displays remaining characters when `maxlength` is set and `counter` is enabled
- The component supports all standard HTML5 input validation attributes through the InputErrorMixin
