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
                @input=${this.#handleInput}
                helperText="Share your thoughts with us"
            ></mjo-textarea>

            <p style="margin-top: 1rem;"><strong>Current message:</strong> ${this.message || "No message yet"}</p>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.message = (e.target as any).value;
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
                    @input=${this.#handleInput}
                    helperText="Grows automatically up to 150px height"
                ></mjo-textarea>

                <mjo-textarea
                    label="Larger auto-resize"
                    placeholder="This one can grow much larger..."
                    rows="3"
                    maxHeight="300"
                    helperText="Grows automatically up to 300px height"
                ></mjo-textarea>
            </div>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.content = (e.target as any).value;
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
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-textarea
                    label="Product Review"
                    placeholder="Write your review..."
                    counter
                    maxlength="200"
                    .value=${this.feedback}
                    @input=${this.#handleInput}
                    helperText="Share your experience with this product"
                ></mjo-textarea>

                <mjo-textarea
                    label="Brief Description"
                    placeholder="Keep it short and sweet..."
                    counter
                    maxlength="50"
                    helperText="Maximum 50 characters"
                ></mjo-textarea>
            </div>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.feedback = (e.target as any).value;
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
    @state() isValid = false;
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
                    successmsg=${this.isValid ? "Message length is valid!" : ""}
                    counter
                    maxlength="500"
                    @input=${this.#handleInput}
                    helperText="Please provide a meaningful message"
                ></mjo-textarea>

                <mjo-button @click=${this.#validate}> Validate Message </mjo-button>
            </div>
        `;
    }

    #handleInput(e: CustomEvent) {
        this.message = (e.target as any).value;
        this.#clearValidation();
    }

    #validate() {
        if (this.message.length < 10) {
            this.errorMessage = "Message must be at least 10 characters long";
            this.isValid = false;
        } else {
            this.errorMessage = "";
            this.isValid = true;
        }
    }

    #clearValidation() {
        this.errorMessage = "";
        this.isValid = false;
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
            <mjo-form @mjo-form-submit=${this.#handleSubmit}>
                <h3>Contact Form</h3>

                <mjo-textfield
                    name="name"
                    label="Full Name"
                    required
                    placeholder="Enter your full name"
                    helperText="We'll use this to address you"
                ></mjo-textfield>

                <mjo-textfield
                    name="email"
                    label="Email Address"
                    type="email"
                    required
                    placeholder="your@email.com"
                    helperText="We'll send a confirmation to this email"
                ></mjo-textfield>

                <mjo-textarea
                    name="subject"
                    label="Subject"
                    required
                    placeholder="Brief subject line..."
                    rows="1"
                    maxHeight="100"
                    helperText="What is this message about?"
                ></mjo-textarea>

                <mjo-textarea
                    name="message"
                    label="Message"
                    required
                    minlength="20"
                    maxlength="1000"
                    counter
                    placeholder="Please provide details about your inquiry..."
                    rows="4"
                    maxHeight="200"
                    helperText="Minimum 20 characters required"
                ></mjo-textarea>

                <mjo-textarea
                    name="additional_info"
                    label="Additional Information (Optional)"
                    placeholder="Any other details you'd like to share..."
                    rows="2"
                    maxHeight="150"
                    helperText="Optional field for extra context"
                ></mjo-textarea>

                <mjo-button type="submit" style="margin-top: 1rem;"> Send Message </mjo-button>
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

### Full Width and Custom Styling

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-advanced")
export class ExampleTextareaAdvanced extends LitElement {
    @state() settings = {
        selectOnFocus: false,
        readonly: false,
        disabled: false,
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
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
                </div>

                <mjo-textarea
                    label="Advanced textarea"
                    placeholder="Test different states..."
                    fullwidth
                    .selectOnFocus=${this.settings.selectOnFocus}
                    .readonly=${this.settings.readonly}
                    .disabled=${this.settings.disabled}
                    value="Sample text content for testing different states"
                    helperText="Use the checkboxes above to test different states"
                    counter
                    maxlength="200"
                ></mjo-textarea>
            </div>
        `;
    }

    #updateSetting(key: string, value: boolean) {
        this.settings = { ...this.settings, [key]: value };
    }
}
```

### Code Editor Style

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";
import { AiOutlineCode } from "mjo-icons/ai";

@customElement("example-textarea-code")
export class ExampleTextareaCode extends LitElement {
    @state() code = `function greet(name) {
    return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

    render() {
        return html`
            <mjo-textarea
                label="JavaScript Code"
                startIcon=${AiOutlineCode}
                .value=${this.code}
                @input=${this.#handleCodeChange}
                rows="6"
                maxHeight="400"
                fullwidth
                style="
                    --mjo-textarea-font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                    --mjo-textarea-font-size: 14px;
                    --mjo-textarea-background-color: #1e1e1e;
                    --mjo-textarea-color: #d4d4d4;
                    --mjo-textarea-border-color: #3c3c3c;
                "
                helperText="Enter your JavaScript code here"
                counter
                maxlength="2000"
            ></mjo-textarea>
        `;
    }

    #handleCodeChange(e: CustomEvent) {
        this.code = (e.target as any).value;
    }
}
```

## Attributes/Properties

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
| `maxlength`      | `number`                                                            | `undefined` | Maximum number of characters allowed              |
| `minlength`      | `number`                                                            | `undefined` | Minimum number of characters required             |
| `name`           | `string`                                                            | `undefined` | Name attribute for form submission                |
| `placeholder`    | `string`                                                            | `undefined` | Placeholder text                                  |
| `readonly`       | `boolean`                                                           | `false`     | Whether the textarea is read-only                 |
| `required`       | `boolean`                                                           | `false`     | Whether the textarea is required in forms         |
| `rows`           | `number`                                                            | `1`         | Initial number of rows to display                 |
| `selectOnFocus`  | `boolean`                                                           | `false`     | Whether to select all text when focused           |
| `size`           | `'small' \| 'medium' \| 'large'`                                    | `'medium'`  | Size variant of the textarea                      |
| `startIcon`      | `string`                                                            | `undefined` | Icon to display at the start of the textarea      |
| `startImage`     | `string`                                                            | `undefined` | Image URL to display at the start of the textarea |
| `value`          | `string`                                                            | `''`        | Current value of the textarea                     |

## Events

| Name     | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| `input`  | `InputEvent` | Fired when the value changes during user input            |
| `change` | `Event`      | Fired when the value changes and the textarea loses focus |
| `focus`  | `FocusEvent` | Fired when the textarea gains focus                       |
| `blur`   | `FocusEvent` | Fired when the textarea loses focus                       |

## Methods

| Name                      | Type     | Description                             |
| ------------------------- | -------- | --------------------------------------- |
| `setValue(value: string)` | `void`   | Programmatically set the textarea value |
| `getValue()`              | `string` | Get the current textarea value          |
| `focus()`                 | `void`   | Focus the textarea programmatically     |
| `blur()`                  | `void`   | Remove focus from the textarea          |

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

## Theme Configuration

For global theme customization, use the theme configuration:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-theme")
export class ExampleTextareaTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .config=${{
                    components: {
                        mjoTextarea: {
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
                <mjo-textarea
                    label="Themed textarea"
                    placeholder="This textarea uses custom theme settings"
                    helperText="Styled with custom theme configuration"
                ></mjo-textarea>
            </mjo-theme>
        `;
    }
}
```

For component-specific theming using the `theme` property:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("example-textarea-custom-theme")
export class ExampleTextareaCustomTheme extends LitElement {
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
                }}
                helperText="This textarea has component-level custom styling"
            ></mjo-textarea>
        `;
    }
}
```

## Auto-resize Behavior

The textarea automatically adjusts its height based on content:

1. **Initial Height**: Set by the `rows` property
2. **Growth**: Expands as content is added
3. **Maximum**: Limited by `maxHeight` property (default: 300px)
4. **Scrolling**: Shows scrollbar when content exceeds maximum height

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

-   Uses semantic `<textarea>` element
-   Supports ARIA attributes for labels and descriptions
-   Maintains proper focus management
-   Works with screen readers and keyboard navigation
-   Error states are announced to assistive technologies

## Browser Compatibility

-   **Auto-resize**: Supported in all modern browsers
-   **Character Counter**: Universal support
-   **Form Integration**: Full support in all target browsers
-   **CSS Custom Properties**: Supported in all modern browsers

## Notes

-   The component automatically manages form data integration
-   Auto-resize functionality is provided through the `TextAreaAutoSize` utility
-   Character counter updates in real-time during input
-   Icons and images can be combined for rich visual context
-   Component inherits styling from the input theme system
-   Form validation integrates seamlessly with `mjo-form`

## Related Components

-   [mjo-textfield](./mjo-textfield.md) - For single-line text input
-   [mjo-form](./mjo-form.md) - For form integration and validation
-   [mjo-icon](./mjo-icon.md) - For textarea icons
-   [mjo-theme](./mjo-theme.md) - For theme configuration
