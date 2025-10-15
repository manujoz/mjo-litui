# mjo-textarea

Multi-line text input component with auto-resize functionality, character counting, form integration, and comprehensive validation support.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [States](#states)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Multi-line text input for forms (comments, descriptions, messages)
- Auto-resizing textarea based on content with configurable max height
- Character counting with visual feedback
- Form validation with custom error messages
- Integration with native form submission and validation

## Import

```typescript
import "mjo-litui/mjo-textarea";
```

## Properties

| Property         | Type                                                                | Description                                                                   | Default     | Required |
| ---------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------- | -------- |
| `autoCapitalize` | `"off" \| "none" \| "on" \| "sentences" \| "words" \| "characters"` | Controls automatic capitalization of text input                               | -           | No       |
| `autoComplete`   | `AutoFillContactField`                                              | Enables browser autocomplete functionality                                    | -           | No       |
| `autoFocus`      | `boolean`                                                           | Automatically focuses the textarea when mounted                               | `false`     | No       |
| `disabled`       | `boolean`                                                           | Disables the textarea (reflected as attribute)                                | `false`     | No       |
| `fullwidth`      | `boolean`                                                           | Makes the textarea take full width of container                               | `false`     | No       |
| `name`           | `string`                                                            | Name attribute for form submission                                            | -           | No       |
| `placeholder`    | `string`                                                            | Placeholder text displayed when empty                                         | -           | No       |
| `readonly`       | `boolean`                                                           | Makes the textarea read-only                                                  | `false`     | No       |
| `value`          | `string`                                                            | Current value of the textarea                                                 | `""`        | No       |
| `rows`           | `number`                                                            | Initial number of visible text rows                                           | `1`         | No       |
| `maxHeight`      | `number`                                                            | Maximum height in pixels for auto-resize                                      | -           | No       |
| `label`          | `string`                                                            | Label text displayed above the textarea                                       | -           | No       |
| `size`           | `"small" \| "medium" \| "large"`                                    | Visual size variant of the textarea                                           | `"medium"`  | No       |
| `color`          | `"primary" \| "secondary"`                                          | Color theme for focus state                                                   | `"primary"` | No       |
| `variant`        | `"default" \| "ghost" \| "flat"`                                    | Visual style variant                                                          | `"default"` | No       |
| `startIcon`      | `string`                                                            | Icon displayed at the start of the textarea                                   | -           | No       |
| `endIcon`        | `string`                                                            | Icon displayed at the end of the textarea                                     | -           | No       |
| `startImage`     | `string`                                                            | Image URL displayed at the start (ignored if startIcon exists)                | -           | No       |
| `endImage`       | `string`                                                            | Image URL displayed at the end (ignored if endIcon exists)                    | -           | No       |
| `helperText`     | `string`                                                            | Helper text displayed below the textarea                                      | -           | No       |
| `counter`        | `boolean`                                                           | Displays character counter                                                    | `false`     | No       |
| `selectOnFocus`  | `boolean`                                                           | Selects all text when textarea receives focus                                 | `false`     | No       |
| `maxlength`      | `number`                                                            | Maximum number of characters allowed (inherited from InputErrorMixin)         | -           | No       |
| `minlength`      | `number`                                                            | Minimum number of characters required (inherited from InputErrorMixin)        | -           | No       |
| `required`       | `boolean`                                                           | Makes the field required for form validation (inherited from InputErrorMixin) | `false`     | No       |
| `error`          | `boolean`                                                           | Displays error state (inherited from InputErrorMixin)                         | `false`     | No       |
| `errormsg`       | `string`                                                            | Error message displayed below textarea (inherited from InputErrorMixin)       | -           | No       |
| `successmsg`     | `string`                                                            | Success message displayed below textarea (inherited from InputErrorMixin)     | -           | No       |

## States

| State         | Type      | Description                                   |
| ------------- | --------- | --------------------------------------------- |
| `isFocused`   | `boolean` | Indicates if the textarea currently has focus |
| `valueLength` | `number`  | Current character count of the value          |

## Public Methods

| Method        | Parameters         | Description                                         | Returns                   |
| ------------- | ------------------ | --------------------------------------------------- | ------------------------- |
| `setValue`    | `value: string`    | Sets the textarea value programmatically            | `void`                    |
| `getValue`    | -                  | Gets the current textarea value                     | `string`                  |
| `blur`        | -                  | Removes focus from the textarea                     | `void`                    |
| `clear`       | `focus?: boolean`  | Clears the textarea value and optionally focuses it | `void`                    |
| `focus`       | -                  | Sets focus to the textarea                          | `void`                    |
| `getError`    | -                  | Returns the current error message                   | `string \| undefined`     |
| `getForm`     | -                  | Returns the closest parent form element             | `HTMLFormElement \| null` |
| `removeError` | -                  | Removes error state and message                     | `void`                    |
| `setError`    | `errormsg: string` | Sets error state and message                        | `void`                    |

## Events

| Event                 | Description                                         | Type                     | Detail Properties                                                                                      |
| --------------------- | --------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `mjo-textarea:input`  | Fired on every input change                         | `MjoTextareaInputEvent`  | `element: MjoTextarea`, `value: string`, `previousValue: string`, `inputType: string`                  |
| `mjo-textarea:change` | Fired when value changes and field loses focus      | `MjoTextareaChangeEvent` | `element: MjoTextarea`, `value: string`, `previousValue: string`                                       |
| `mjo-textarea:focus`  | Fired when the textarea gains focus                 | `MjoTextareaFocusEvent`  | `element: MjoTextarea`, `value: string`                                                                |
| `mjo-textarea:blur`   | Fired when the textarea loses focus                 | `MjoTextareaBlurEvent`   | `element: MjoTextarea`, `value: string`                                                                |
| `mjo-textarea:keyup`  | Fired on keyup events                               | `MjoTextareaKeyupEvent`  | `element: MjoTextarea`, `key: string`, `code: string`, `value: string`, `originalEvent: KeyboardEvent` |
| `mjo-textarea:clear`  | Fired when the textarea is cleared programmatically | `MjoTextareaClearEvent`  | `element: MjoTextarea`, `previousValue: string`                                                        |

## CSS Variables

| Variable                            | Description                             | Default                                                             |
| ----------------------------------- | --------------------------------------- | ------------------------------------------------------------------- |
| `--mjo-textarea-radius`             | Border radius of the textarea container | `--mjo-input-border-radius` or `--mjo-radius-medium`                |
| `--mjo-textarea-border-style`       | Border style of the container           | `--mjo-input-border-style` or `solid`                               |
| `--mjo-textarea-border-width`       | Border width of the container           | `--mjo-input-border-width` or `1px`                                 |
| `--mjo-textarea-border-color`       | Border color of the container           | `--mjo-input-border-color` or `--mjo-border-color`                  |
| `--mjo-textarea-background-color`   | Background color of the container       | `--mjo-input-background-color` or `--mjo-background-color-card-low` |
| `--mjo-textarea-box-shadow`         | Box shadow of the container             | `--mjo-input-box-shadow` or `none`                                  |
| `--mjo-textarea-border-style-hover` | Border style on hover                   | `--mjo-input-border-style-hover` or `solid`                         |
| `--mjo-textarea-border-width-hover` | Border width on hover                   | `--mjo-input-border-width-hover` or `1px`                           |
| `--mjo-textarea-border-color-hover` | Border color on hover                   | `--mjo-input-border-color-hover` or `#cccccc`                       |
| `--mjo-textarea-border-style-focus` | Border style when focused               | `--mjo-input-border-style-focus` or `solid`                         |
| `--mjo-textarea-border-width-focus` | Border width when focused               | `--mjo-input-border-width-focus` or `1px`                           |
| `--mjo-textarea-primary-color`      | Primary theme color for focus state     | `--mjo-input-primary-color` or `--mjo-primary-color`                |
| `--mjo-textarea-secondary-color`    | Secondary theme color for focus state   | `--mjo-input-secondary-color` or `--mjo-secondary-color`            |
| `--mjo-textarea-padding`            | Inner padding of the textarea           | `calc(1em / 2 - 2px)`                                               |
| `--mjo-textarea-padding-small`      | Inner padding for small size            | `calc(1em / 2 - 4px) calc(1em / 2)`                                 |
| `--mjo-textarea-padding-large`      | Inner padding for large size            | `calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px)`       |
| `--mjo-textarea-font-size`          | Font size of the textarea text          | `--mjo-input-font-size` or `1em`                                    |
| `--mjo-textarea-font-weight`        | Font weight of the textarea text        | `--mjo-input-font-weight` or `normal`                               |
| `--mjo-textarea-font-family`        | Font family of the textarea text        | `--mjo-input-font-family` or `inherit`                              |
| `--mjo-textarea-color`              | Text color of the textarea              | `--mjo-input-color` or `--mjo-foreground-color`                     |
| `--mjo-textarea-label-font-size`    | Font size of the label                  | `--mjo-input-label-font-size` or `calc(1em * 0.8)`                  |
| `--mjo-textarea-label-font-weight`  | Font weight of the label                | `--mjo-input-label-font-weight` or `normal`                         |
| `--mjo-textarea-label-color`        | Color of the label                      | `--mjo-input-label-color` or `currentColor`                         |
| `--mjo-textarea-helper-font-size`   | Font size of helper text and counter    | `--mjo-input-helper-font-size` or `calc(1em * 0.8)`                 |
| `--mjo-textarea-helper-font-weight` | Font weight of helper text and counter  | `--mjo-input-helper-font-weight` or `normal`                        |
| `--mjo-textarea-helper-color`       | Color of helper text and counter        | `--mjo-input-helper-color` or `--mjo-foreground-color-low`          |

## CSS Parts

| Part                          | Description                                    | Element                      |
| ----------------------------- | ---------------------------------------------- | ---------------------------- |
| `container`                   | The main textarea container                    | `<div>`                      |
| `textarea`                    | The native textarea element                    | `<textarea>`                 |
| `start-icon-container`        | Container for start icon                       | `<div>`                      |
| `start-icon`                  | The start icon element (via exportparts)       | `<mjo-icon>`                 |
| `end-icon-container`          | Container for end icon                         | `<div>`                      |
| `end-icon`                    | The end icon element (via exportparts)         | `<mjo-icon>`                 |
| `start-image-container`       | Container for start image                      | `<div>`                      |
| `start-image`                 | The start image element                        | `<img>`                      |
| `end-image-container`         | Container for end image                        | `<div>`                      |
| `end-image`                   | The end image element                          | `<img>`                      |
| `label-container`             | The label container (via exportparts)          | `<mjoint-input-label>`       |
| `label-truncate-container`    | The label truncate container (via exportparts) | `<mjo-text-nowrap>`          |
| `label-truncate-wrapper`      | The label truncate wrapper (via exportparts)   | `<mjo-text-nowrap>`          |
| `helper-text-container`       | Helper text container (via exportparts)        | `<mjoint-input-helper-text>` |
| `helper-text-typography`      | Helper text typography (via exportparts)       | `<mjo-typography>`           |
| `helper-text-error-message`   | Error message element (via exportparts)        | `<div>`                      |
| `helper-text-success-message` | Success message element (via exportparts)      | `<div>`                      |
| `helper-text-icon`            | Helper text icon element (via exportparts)     | `<mjo-icon>`                 |
| `counter-container`           | Character counter container (via exportparts)  | `<mjoint-input-counter>`     |
| `counter-text`                | Character counter text (via exportparts)       | `<mjo-typography>`           |

## Accessibility

### Best Practices

- Always provide a `label` for screen reader context
- Use `helperText` to provide additional instructions
- Error messages are announced via `aria-live` regions
- The textarea includes proper ARIA attributes automatically (`aria-invalid`, `aria-required`, `aria-describedby`)

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
- **Enter**: Creates new line in textarea (does not submit form)

## Usage Examples

### Auto-resize with max height

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("my-component")
class MyComponent extends LitElement {
    render() {
        return html` <mjo-textarea label="Description" placeholder="Enter your description..." rows="3" maxHeight="200"></mjo-textarea> `;
    }
}
```

### Character counter with validation

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("comment-form")
class CommentForm extends LitElement {
    @state() private comment = "";

    private handleInput(e: CustomEvent) {
        const { value } = e.detail;
        this.comment = value;

        const textarea = e.target as HTMLElement & { setError: (msg: string) => void; removeError: () => void };

        if (value.length < 10) {
            textarea.setError("Comment must be at least 10 characters");
        } else {
            textarea.removeError();
        }
    }

    render() {
        return html`
            <mjo-textarea
                label="Your Comment"
                placeholder="Share your thoughts..."
                counter
                maxlength="500"
                minlength="10"
                required
                @mjo-textarea:input=${this.handleInput}
            ></mjo-textarea>
        `;
    }
}
```

### Programmatic control

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";
import type { MjoTextarea } from "mjo-litui";

@customElement("textarea-controller")
class TextareaController extends LitElement {
    @query("mjo-textarea") textarea!: MjoTextarea;

    private clearTextarea() {
        this.textarea.clear(true); // Clear and focus
    }

    private setTemplate() {
        this.textarea.setValue("Thank you for contacting us...");
    }

    render() {
        return html`
            <mjo-textarea label="Message" rows="5"></mjo-textarea>

            <button @click=${this.clearTextarea}>Clear</button>
            <button @click=${this.setTemplate}>Use Template</button>
        `;
    }
}
```

### Form integration with validation

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";
import type { MjoTextarea } from "mjo-litui";

@customElement("feedback-form")
class FeedbackForm extends LitElement {
    @query("mjo-textarea") textarea!: MjoTextarea;

    private async handleSubmit(e: Event) {
        e.preventDefault();

        const value = this.textarea.getValue();

        if (value.length < 20) {
            this.textarea.setError("Please provide more detailed feedback (min 20 characters)");
            return;
        }

        // Submit feedback
        await this.submitFeedback(value);
        this.textarea.clear();
    }

    private async submitFeedback(feedback: string) {
        // API call
    }

    render() {
        return html`
            <form @submit=${this.handleSubmit}>
                <mjo-textarea
                    name="feedback"
                    label="Your Feedback"
                    placeholder="Tell us what you think..."
                    helperText="Help us improve by sharing your experience"
                    rows="4"
                    maxHeight="300"
                    counter
                    maxlength="1000"
                    required
                ></mjo-textarea>

                <button type="submit">Submit Feedback</button>
            </form>
        `;
    }
}
```

### Custom styling with CSS parts

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("styled-textarea")
class StyledTextarea extends LitElement {
    render() {
        return html` <mjo-textarea label="Custom Styled" placeholder="Type here..." counter maxlength="200"></mjo-textarea> `;
    }

    static styles = css`
        mjo-textarea::part(container) {
            border-radius: 12px;
            border-width: 2px;
        }

        mjo-textarea::part(textarea) {
            font-family: "Courier New", monospace;
        }

        mjo-textarea::part(counter-text) {
            font-weight: bold;
            color: var(--mjo-primary-color);
        }
    `;
}
```

### Event handling

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-textarea";

@customElement("textarea-events")
class TextareaEvents extends LitElement {
    @state() private log: string[] = [];

    private handleFocus(e: CustomEvent) {
        this.log = [...this.log, `Focused - Current value: "${e.detail.value}"`];
    }

    private handleBlur(e: CustomEvent) {
        this.log = [...this.log, `Blurred - Final value: "${e.detail.value}"`];
    }

    private handleChange(e: CustomEvent) {
        const { value, previousValue } = e.detail;
        this.log = [...this.log, `Changed from "${previousValue}" to "${value}"`];
    }

    render() {
        return html`
            <mjo-textarea
                label="Monitor Events"
                @mjo-textarea:focus=${this.handleFocus}
                @mjo-textarea:blur=${this.handleBlur}
                @mjo-textarea:change=${this.handleChange}
            ></mjo-textarea>

            <ul>
                ${this.log.map((entry) => html`<li>${entry}</li>`)}
            </ul>
        `;
    }
}
```

## Additional Notes

- The component automatically adjusts its height based on content when `rows` is set and content exceeds the initial size
- When `maxHeight` is reached, the textarea becomes scrollable
- The character counter displays remaining characters when `maxlength` is set and `counter` is enabled
- Icons take precedence over images (if both `startIcon` and `startImage` are provided, only the icon is shown)
- The component integrates with native form validation and submission
- Auto-resize functionality is handled by the internal `TextAreaAutoSize` utility
- The `selectOnFocus` property is useful for scenarios where users might want to replace the entire content
- Form data is automatically synchronized when value changes
