# mjo-textarea

A multi-line text input component with advanced features including auto-resize functionality, character counting, form integration, and comprehensive validation support. Perfect for comments, descriptions, messages, and any multi-line text input needs.

## Import

```ts
import "mjo-litui/mjo-textarea";
```

## Basic Usage

```html
<mjo-textarea label="Message" placeholder="Enter your message here"></mjo-textarea>
```

## Lit Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-basic")
export class ExampleTextareaBasic extends LitElement {
    @state() message = "";

    render() {
        return html`
            <mjo-textarea
                label="Your Message"
                placeholder="Type your message here..."
                .value=${this.message}
                @mjo-textarea:input=${this.#handleInput}
                helperText="Share your thoughts with us"
            ></mjo-textarea>

            <p style="margin-top: 1rem;"><strong>Current message:</strong> ${this.message || "No message yet"}</p>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.message = e.detail.value;
    }
}
```

## Sizes

The textarea supports three sizes: `small`, `medium` (default), and `large`.

```html
<mjo-textarea size="small" label="Small textarea" placeholder="Small size"></mjo-textarea>
<mjo-textarea size="medium" label="Medium textarea" placeholder="Medium size"></mjo-textarea>
<mjo-textarea size="large" label="Large textarea" placeholder="Large size"></mjo-textarea>
```

### Lit Example - Sizes

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-sizes")
export class ExampleTextareaSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textarea
                    size="small"
                    label="Small textarea"
                    placeholder="Small size with compact padding"
                    helperText="Compact size for limited space"
                ></mjo-textarea>

                <mjo-textarea
                    size="medium"
                    label="Medium textarea"
                    placeholder="Default medium size"
                    helperText="Standard size for most use cases"
                ></mjo-textarea>

                <mjo-textarea
                    size="large"
                    label="Large textarea"
                    placeholder="Large size with generous padding"
                    helperText="Comfortable size for extensive writing"
                ></mjo-textarea>
            </div>
        `;
    }
}
```

## Color Variants

Choose between `primary` (default) and `secondary` color schemes.

```html
<mjo-textarea color="primary" label="Primary textarea"></mjo-textarea> <mjo-textarea color="secondary" label="Secondary textarea"></mjo-textarea>
```

### Lit Example - Colors

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-colors")
export class ExampleTextareaColors extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textarea
                    color="primary"
                    label="Primary color"
                    placeholder="Primary color scheme"
                    helperText="Uses primary theme colors when focused"
                ></mjo-textarea>

                <mjo-textarea
                    color="secondary"
                    label="Secondary color"
                    placeholder="Secondary color scheme"
                    helperText="Uses secondary theme colors when focused"
                ></mjo-textarea>
            </div>
        `;
    }
}
```

## Auto-resize with Rows

The textarea automatically adjusts its height based on content, starting with the specified number of rows.

```html
<mjo-textarea label="Auto-resize textarea" rows="3" maxHeight="200" placeholder="Start typing to see auto-resize in action..."></mjo-textarea>
```

### Lit Example - Auto-resize

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-autoresize")
export class ExampleTextareaAutoresize extends LitElement {
    @state() content = "";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textarea
                    label="Auto-resize textarea"
                    placeholder="Start typing and watch the textarea grow automatically..."
                    rows="2"
                    maxHeight="150"
                    .value=${this.content}
                    @mjo-textarea:input=${this.#handleInput}
                    helperText="Grows automatically up to 150px height"
                ></mjo-textarea>
            </div>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.content = e.detail.value;
    }
}
```

## Character Counter

Enable character counting to help users stay within limits.

```html
<mjo-textarea label="Comment" placeholder="Enter your comment..." counter maxlength="500" helperText="Share your feedback"></mjo-textarea>
```

### Lit Example - Character Counter

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-counter")
export class ExampleTextareaCounter extends LitElement {
    @state() feedback = "";

    render() {
        return html`
            <mjo-textarea
                label="Product Review"
                placeholder="Write your review..."
                counter
                maxlength="200"
                .value=${this.feedback}
                @mjo-textarea:input=${this.#handleInput}
                helperText="Share your experience with this product"
            ></mjo-textarea>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.feedback = e.detail.value;
    }
}
```

## Icons and Images

Add visual context with start and end icons or images.

```html
<mjo-textarea label="Message with icon" startIcon="mail" placeholder="Type your message..."></mjo-textarea>
```

### Lit Example - Icons

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";
import { AiOutlineMail, AiOutlineEdit, AiOutlineUser } from "mjo-icons/ai";

@customElement("example-textarea-icons")
export class ExampleTextareaIcons extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textarea
                    label="Email Message"
                    startIcon=${AiOutlineMail}
                    placeholder="Compose your email..."
                    helperText="Message will be sent via email"
                ></mjo-textarea>

                <mjo-textarea
                    label="Profile Bio"
                    startIcon=${AiOutlineUser}
                    endIcon=${AiOutlineEdit}
                    placeholder="Tell others about yourself..."
                    helperText="This will appear on your public profile"
                ></mjo-textarea>
            </div>
        `;
    }
}
```

## Validation States

The textarea integrates with validation systems and displays error states.

```html
<!-- Error state -->
<mjo-textarea label="Required field" required error errormsg="This field is required"></mjo-textarea>

<!-- Success state -->
<mjo-textarea label="Valid input" successmsg="Looks good!"></mjo-textarea>
```

### Lit Example - Validation

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";
import "mjo-litui/mjo-button";

@customElement("example-textarea-validation")
export class ExampleTextareaValidation extends LitElement {
    @state() message = "";
    @state() errorMessage = "";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textarea
                    label="Message (minimum 10 characters)"
                    placeholder="Enter your message..."
                    .value=${this.message}
                    ?error=${!!this.errorMessage}
                    errormsg=${this.errorMessage}
                    counter
                    maxlength="500"
                    @mjo-textarea:input=${this.#handleInput}
                    helperText="Please provide a meaningful message"
                ></mjo-textarea>

                <mjo-button @click=${this.#validate}>Validate Message</mjo-button>
            </div>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.message = e.detail.value;
        this.errorMessage = "";
    }

    #validate() {
        if (this.message.length < 10) {
            this.errorMessage = "Message must be at least 10 characters long";
        }
    }
}
```

## Form Integration

The textarea integrates seamlessly with `mjo-form` for complete form handling.

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textarea";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-textarea-form")
export class ExampleTextareaForm extends LitElement {
    @state() formData = {};

    render() {
        return html`
            <mjo-form @mjo-form:submit=${this.#handleSubmit}>
                <mjo-textfield name="name" label="Full Name" required placeholder="Enter your full name"></mjo-textfield>

                <mjo-textarea
                    name="message"
                    label="Message"
                    required
                    minlength="20"
                    maxlength="500"
                    counter
                    placeholder="Please provide details..."
                    rows="4"
                    helperText="Minimum 20 characters required"
                ></mjo-textarea>

                <mjo-button type="submit">Send Message</mjo-button>
            </mjo-form>

            <pre style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
${JSON.stringify(this.formData, null, 2)}
            </pre
            >
        `;
    }

    #handleSubmit(e: CustomEvent) {
        this.formData = e.detail.data;
    }
}
```

## Advanced Usage

### Custom Event Handling

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-events")
export class ExampleTextareaEvents extends LitElement {
    @state() logs: string[] = [];

    render() {
        return html`
            <mjo-textarea
                label="Event Tracking"
                placeholder="Type to see events..."
                @mjo-textarea:input=${this.#onInput}
                @mjo-textarea:focus=${this.#onFocus}
                @mjo-textarea:blur=${this.#onBlur}
                @mjo-textarea:keyup=${this.#onKeyup}
            ></mjo-textarea>

            <div style="margin-top: 1rem; max-height: 200px; overflow-y: auto;">
                <h4>Event Log:</h4>
                ${this.logs.map((log) => html`<div style="font-family: monospace; font-size: 0.9em;">${log}</div>`)}
            </div>
        `;
    }

    #onInput(e: CustomEvent) {
        this.#addLog(`input: "${e.detail.value}" (${e.detail.inputType})`);
    }

    #onFocus(e: CustomEvent) {
        this.#addLog(`focus: "${e.detail.value}"`);
    }

    #onBlur(e: CustomEvent) {
        this.#addLog(`blur: "${e.detail.value}"`);
    }

    #onKeyup(e: CustomEvent) {
        this.#addLog(`keyup: ${e.detail.key} (${e.detail.code})`);
    }

    #addLog(message: string) {
        this.logs = [...this.logs.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`];
    }
}
```

## Attributes/Properties

### Core Properties

| Name             | Type                                                                | Default     | Description                                       |
| ---------------- | ------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `autoCapitalize` | `'off' \| 'none' \| 'on' \| 'sentences' \| 'words' \| 'characters'` | `undefined` | Controls automatic capitalization                 |
| `autoComplete`   | `AutoFillContactField`                                              | `undefined` | Autocomplete attribute for form autofill          |
| `autoFocus`      | `boolean`                                                           | `false`     | Whether the textarea should focus automatically   |
| `color`          | `'primary' \| 'secondary'`                                          | `'primary'` | Color variant of the textarea                     |
| `counter`        | `boolean`                                                           | `false`     | Whether to show character counter                 |
| `disabled`       | `boolean`                                                           | `false`     | Whether the textarea is disabled                  |
| `endIcon`        | `string`                                                            | `undefined` | Icon to display at the end of the textarea        |
| `endImage`       | `string`                                                            | `undefined` | Image URL to display at the end of the textarea   |
| `fullwidth`      | `boolean`                                                           | `false`     | Whether the textarea should take full width       |
| `helperText`     | `string`                                                            | `undefined` | Helper text displayed below the textarea          |
| `label`          | `string`                                                            | `undefined` | Label text for the textarea                       |
| `maxHeight`      | `number`                                                            | `undefined` | Maximum height for auto-resize (in pixels)        |
| `name`           | `string`                                                            | `undefined` | Name attribute for form submission                |
| `placeholder`    | `string`                                                            | `undefined` | Placeholder text                                  |
| `readonly`       | `boolean`                                                           | `false`     | Whether the textarea is read-only                 |
| `rows`           | `number`                                                            | `1`         | Initial number of rows to display                 |
| `selectOnFocus`  | `boolean`                                                           | `false`     | Whether to select all text when focused           |
| `size`           | `'small' \| 'medium' \| 'large'`                                    | `'medium'`  | Size variant of the textarea                      |
| `startIcon`      | `string`                                                            | `undefined` | Icon to display at the start of the textarea      |
| `startImage`     | `string`                                                            | `undefined` | Image URL to display at the start of the textarea |
| `value`          | `string`                                                            | `''`        | Current value of the textarea                     |

### FormMixin Properties

| Name           | Type                                           | Default     | Description                               |
| -------------- | ---------------------------------------------- | ----------- | ----------------------------------------- |
| `required`     | `boolean`                                      | `false`     | Whether the textarea is required in forms |
| `maxlength`    | `number`                                       | `undefined` | Maximum number of characters allowed      |
| `minlength`    | `number`                                       | `undefined` | Minimum number of characters required     |
| `max`          | `number`                                       | `undefined` | Maximum value for numeric validation      |
| `min`          | `number`                                       | `undefined` | Minimum value for numeric validation      |
| `isemail`      | `boolean`                                      | `undefined` | Validates as email format                 |
| `isurl`        | `boolean`                                      | `undefined` | Validates as URL format                   |
| `nospaces`     | `boolean`                                      | `undefined` | Disallows spaces in input                 |
| `rangelength`  | `number[]`                                     | `undefined` | Array with min/max length validation      |
| `isnumber`     | `boolean`                                      | `undefined` | Validates as number                       |
| `range`        | `number[]`                                     | `undefined` | Array with min/max value validation       |
| `domains`      | `string[]`                                     | `undefined` | Allowed email domains for validation      |
| `isdate`       | `'aaaa-mm-dd' \| 'dd-mm-aaaa' \| 'mm-dd-aaaa'` | `undefined` | Date format validation                    |
| `dateprevious` | `boolean`                                      | `undefined` | Only allow dates before today             |
| `minage`       | `number`                                       | `undefined` | Minimum age validation                    |
| `maxage`       | `number`                                       | `undefined` | Maximum age validation                    |
| `security`     | `'low' \| 'medium' \| 'high' \| 'very-high'`   | `undefined` | Password security level validation        |
| `equalto`      | `string`                                       | `undefined` | Element name to match value against       |
| `phonenumber`  | `boolean`                                      | `undefined` | Validates as phone number                 |
| `phonecountry` | `string[]`                                     | `undefined` | Country codes for phone validation        |
| `pattern`      | `string`                                       | `undefined` | Regular expression pattern for validation |
| `allowed`      | `string[]`                                     | `undefined` | Array of allowed values                   |
| `mincheck`     | `number`                                       | `undefined` | Minimum checkboxes to select (for groups) |
| `maxcheck`     | `number`                                       | `undefined` | Maximum checkboxes to select (for groups) |
| `formIgnore`   | `boolean`                                      | `false`     | Exclude from form data collection         |

### InputErrorMixin Properties

| Name         | Type      | Default     | Description                              |
| ------------ | --------- | ----------- | ---------------------------------------- |
| `error`      | `boolean` | `false`     | Whether the textarea is in error state   |
| `errormsg`   | `string`  | `undefined` | Error message to display                 |
| `success`    | `boolean` | `false`     | Whether the textarea is in success state |
| `successmsg` | `string`  | `undefined` | Success message to display               |

### ThemeMixin Properties

| Name    | Type               | Default | Description                           |
| ------- | ------------------ | ------- | ------------------------------------- |
| `theme` | `MjoTextareaTheme` | `{}`    | Theme configuration for the component |

## Events

### Native Events

| Name     | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| `input`  | `InputEvent` | Fired when the value changes during user input            |
| `change` | `Event`      | Fired when the value changes and the textarea loses focus |
| `focus`  | `FocusEvent` | Fired when the textarea gains focus                       |
| `blur`   | `FocusEvent` | Fired when the textarea loses focus                       |

### Custom Events

| Name                  | Type                     | Description                                     |
| --------------------- | ------------------------ | ----------------------------------------------- |
| `mjo-textarea:input`  | `MjoTextareaInputEvent`  | Custom input event with additional detail       |
| `mjo-textarea:change` | `MjoTextareaChangeEvent` | Custom change event with previous value         |
| `mjo-textarea:focus`  | `MjoTextareaFocusEvent`  | Custom focus event with current value           |
| `mjo-textarea:blur`   | `MjoTextareaBlurEvent`   | Custom blur event with current value            |
| `mjo-textarea:keyup`  | `MjoTextareaKeyupEvent`  | Custom keyup event with key information         |
| `mjo-textarea:clear`  | `MjoTextareaClearEvent`  | Fired when textarea is cleared programmatically |

### Event Details

#### MjoTextareaInputEvent

```ts
{
    element: MjoTextarea;
    value: string;
    previousValue: string;
    inputType: string;
}
```

#### MjoTextareaChangeEvent

```ts
{
    element: MjoTextarea;
    value: string;
    previousValue: string;
}
```

#### MjoTextareaFocusEvent & MjoTextareaBlurEvent

```ts
{
    element: MjoTextarea;
    value: string;
}
```

#### MjoTextareaKeyupEvent

```ts
{
    element: MjoTextarea;
    key: string;
    code: string;
    value: string;
    originalEvent: KeyboardEvent;
}
```

#### MjoTextareaClearEvent

```ts
{
    element: MjoTextarea;
    previousValue: string;
}
```

## Methods

| Name                            | Type                      | Description                                   |
| ------------------------------- | ------------------------- | --------------------------------------------- |
| `setValue(value: string)`       | `void`                    | Programmatically set the textarea value       |
| `getValue()`                    | `string`                  | Get the current textarea value                |
| `focus()`                       | `void`                    | Focus the textarea programmatically           |
| `blur()`                        | `void`                    | Remove focus from the textarea                |
| `clear(focus?: boolean)`        | `void`                    | Clear the textarea value and optionally focus |
| `getError()`                    | `string`                  | Get current error message                     |
| `setError(errormsg: string)`    | `void`                    | Set error state with message                  |
| `removeError()`                 | `void`                    | Remove error state and message                |
| `getForm()`                     | `HTMLFormElement \| null` | Get the closest form element                  |
| `submiForm()`                   | `void`                    | Programmatically submit the form              |
| `updateFormData({name, value})` | `void`                    | Update form data for form integration         |

## CSS Custom Properties

The textarea component inherits from input theme and provides these customization options:

| Name                                | Default                                   | Description                      |
| ----------------------------------- | ----------------------------------------- | -------------------------------- |
| `--mjo-textarea-background-color`   | `var(--mjo-input-background-color)`       | Background color of the textarea |
| `--mjo-textarea-border-color`       | `var(--mjo-input-border-color)`           | Border color of the textarea     |
| `--mjo-textarea-border-color-hover` | `var(--mjo-input-border-color-hover)`     | Border color on hover            |
| `--mjo-textarea-border-style`       | `var(--mjo-input-border-style, solid)`    | Border style                     |
| `--mjo-textarea-border-style-focus` | `var(--mjo-input-border-style-focus)`     | Border style when focused        |
| `--mjo-textarea-border-style-hover` | `var(--mjo-input-border-style-hover)`     | Border style on hover            |
| `--mjo-textarea-border-width`       | `var(--mjo-input-border-width, 1px)`      | Border width                     |
| `--mjo-textarea-border-width-focus` | `var(--mjo-input-border-width-focus)`     | Border width when focused        |
| `--mjo-textarea-border-width-hover` | `var(--mjo-input-border-width-hover)`     | Border width on hover            |
| `--mjo-textarea-box-shadow`         | `var(--mjo-input-box-shadow, none)`       | Box shadow of the textarea       |
| `--mjo-textarea-color`              | `var(--mjo-input-color)`                  | Text color                       |
| `--mjo-textarea-font-family`        | `var(--mjo-input-font-family, inherit)`   | Font family                      |
| `--mjo-textarea-font-size`          | `var(--mjo-input-font-size, 1em)`         | Font size                        |
| `--mjo-textarea-font-weight`        | `var(--mjo-input-font-weight, normal)`    | Font weight                      |
| `--mjo-textarea-padding`            | `calc(1em / 2 - 2px)`                     | Padding inside the textarea      |
| `--mjo-textarea-padding-small`      | `calc(1em / 2 - 4px) calc(1em / 2)`       | Padding for small size           |
| `--mjo-textarea-padding-large`      | `calc(1em / 2 - 2px) calc(1em / 2 + 3px)` | Padding for large size           |
| `--mjo-textarea-primary-color`      | `var(--mjo-input-primary-color)`          | Primary color for focus states   |
| `--mjo-textarea-radius`             | `var(--mjo-input-radius)`                 | Border radius                    |
| `--mjo-textarea-secondary-color`    | `var(--mjo-input-secondary-color)`        | Secondary color for focus states |

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-textarea-{property-name}`.

### Component-level Theming

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-themed")
export class ExampleTextareaThemed extends LitElement {
    render() {
        return html`
            <mjo-textarea
                label="Custom themed textarea"
                placeholder="Custom styling applied"
                .theme=${{
                    backgroundColor: "#fef3c7",
                    borderColor: "#f59e0b",
                    borderColorHover: "#d97706",
                    color: "#92400e",
                    fontSize: "18px",
                    padding: "16px 20px",
                    radius: "12px",
                }}
                helperText="This textarea has component-level custom styling"
            ></mjo-textarea>
        `;
    }
}
```

### Global Theme Configuration

For application-wide theming, configure the theme provider:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-global-theme")
export class ExampleTextareaGlobalTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .config=${{
                    components: {
                        mjoTextarea: {
                            backgroundColor: "#f8fafc",
                            borderColor: "#e2e8f0",
                            borderColorHover: "#cbd5e1",
                            radius: "8px",
                            fontSize: "16px",
                            fontFamily: "Inter, sans-serif",
                        },
                    },
                }}
            >
                <mjo-textarea label="Globally themed textarea" placeholder="Uses global theme configuration"></mjo-textarea>
            </mjo-theme>
        `;
    }
}
```

## Auto-resize Behavior

The textarea uses the `TextAreaAutoSize` utility for automatic height adjustment:

1. **Initial Height**: Set by the `rows` property (default: 1 row)
2. **Auto-growth**: Expands as content is added
3. **Maximum Height**: Limited by `maxHeight` property (default: no limit)
4. **Scrolling**: Shows scrollbar when content exceeds maximum height
5. **Performance**: Optimized for smooth resizing without layout thrashing

```ts
// Example with controlled auto-resize
<mjo-textarea
    label="Auto-resizing textarea"
    rows="3"           // Start with 3 rows
    maxHeight="200"    // Don't grow beyond 200px
    placeholder="Type to see auto-resize..."
></mjo-textarea>
```

## Form Integration Details

The textarea automatically integrates with form systems through the FormMixin:

-   **Form Data**: Automatically added to `FormData` on form submission
-   **Validation**: Supports all FormMixin validation rules
-   **Event Bubbling**: Form-compatible events bubble up properly
-   **Native Behavior**: Works with native form validation APIs
-   **Custom Forms**: Integrates seamlessly with `mjo-form` component

```ts
// The textarea updates form data automatically
<form>
    <mjo-textarea name="description" required minlength="10"></mjo-textarea>
    <button type="submit">Submit</button> <!-- Gets textarea data automatically -->
</form>
```

## Best Practices

1. **Labels**: Always provide meaningful labels for accessibility
2. **Placeholder**: Use placeholder text to guide user input
3. **Character Limits**: Use `maxlength` with `counter` for content with limits
4. **Validation**: Provide clear error messages and helper text
5. **Auto-resize**: Set appropriate `maxHeight` to prevent excessive growth
6. **Form Integration**: Use with `mjo-form` for complete form handling
7. **Accessibility**: Ensure proper ARIA attributes are maintained

## Accessibility

The textarea component follows accessibility best practices:

-   Uses semantic `<textarea>` element for proper screen reader support
-   Supports ARIA attributes (`aria-label`, `aria-labelledby`, `aria-describedby`, etc.)
-   Maintains proper focus management with keyboard navigation
-   Error states are announced to assistive technologies via `aria-invalid`
-   Required fields indicated with `aria-required` attribute
-   Helper text properly associated with `aria-describedby`

```html
<!-- Example with full accessibility features -->
<mjo-textarea
    label="Message"
    name="user-message"
    required
    aria-describedby="message-help"
    helperText="Please provide a detailed message (minimum 20 characters)"
    minlength="20"
    maxlength="500"
    counter
></mjo-textarea>
```

## Implementation Notes

### Performance Considerations

-   Auto-resize uses `TextAreaAutoSize` utility with optimized DOM measurements
-   Character counter updates are debounced for performance
-   Event handlers use efficient event delegation

### Browser Compatibility

-   **Auto-resize**: Supported in all modern browsers with fallback
-   **Custom Properties**: Full support in all target browsers
-   **Form Integration**: Works with both native forms and custom form libraries
-   **Events**: Custom events work in all browsers supporting CustomEvent API

### Technical Details

-   Component extends LitElement with ThemeMixin, InputErrorMixin, and FormMixin
-   Uses Shadow DOM for style encapsulation
-   Auto-resize utility manages textarea height efficiently
-   Form data automatically synchronized on input changes
-   ARIA attributes managed automatically for accessibility

### Migration Notes

-   Custom events now use `mjo-textarea:` prefix (e.g., `mjo-textarea:input`)
-   `clear()` method now accepts optional `focus` parameter
-   Form validation properties inherited from FormMixin
-   Theme customization available through both global config and component-level `theme` prop

## Related Components

-   [mjo-textfield](./mjo-textfield.md) - For single-line text input
-   [mjo-form](./mjo-form.md) - For form integration and validation
-   [mjo-icon](./mjo-icon.md) - For textarea icons
-   [mjo-theme](./mjo-theme.md) - For theme configuration
