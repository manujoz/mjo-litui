# mjo-radio

A customizable radio button component with form integration, validation support, and enhanced accessibility. Works standalone or with `mjo-radio-group` to ensure mutual exclusivity within named groups.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [mjo-radio Properties](#mjo-radio-properties)
- [mjo-radio Public Methods](#mjo-radio-public-methods)
- [mjo-radio Events](#mjo-radio-events)
- [mjo-radio CSS Variables](#mjo-radio-css-variables)
- [mjo-radio CSS Parts](#mjo-radio-css-parts)
- [mjo-radio-group Component](#mjo-radio-group-component)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Single choice selection in forms (subscription plans, payment methods, preferences)
- Survey questions with multiple choice answers
- Settings and configuration options
- User preference selection with visual feedback
- Accessible forms requiring keyboard navigation and screen reader support

## Import

```javascript
import "mjo-litui/mjo-radio";
import "mjo-litui/mjo-radio-group"; // Optional, for grouped radios
```

## mjo-radio Properties

| Property           | Type                             | Description                                       | Default     | Required |
| ------------------ | -------------------------------- | ------------------------------------------------- | ----------- | -------- |
| `color`            | `"primary" \| "secondary"`       | Color variant of the radio button                 | `"primary"` | No       |
| `checked`          | `boolean`                        | Whether the radio is selected                     | `false`     | No       |
| `disabled`         | `boolean`                        | Disables the radio button                         | `false`     | No       |
| `helperText`       | `string`                         | Additional descriptive text below the radio       | `undefined` | No       |
| `size`             | `"small" \| "medium" \| "large"` | Size of the radio button                          | `"medium"`  | No       |
| `label`            | `string`                         | Text label displayed next to the radio            | `undefined` | No       |
| `name`             | `string`                         | Name attribute for form submission and grouping   | `undefined` | No       |
| `value`            | `string`                         | Value submitted when the radio is checked         | `""`        | No       |
| `hideErrors`       | `boolean`                        | Hides error messages                              | `false`     | No       |
| `error`            | `boolean`                        | Displays error state styling                      | `false`     | No       |
| `errormsg`         | `string`                         | Error message to display                          | `undefined` | No       |
| `success`          | `boolean`                        | Displays success state styling                    | `false`     | No       |
| `successmsg`       | `string`                         | Success message to display                        | `undefined` | No       |
| `required`         | `boolean`                        | Makes the radio required for form validation      | `false`     | No       |
| `aria-describedby` | `string`                         | ID of element describing the radio                | `undefined` | No       |
| `aria-label`       | `string`                         | Accessible label when visual label is not present | `undefined` | No       |

## mjo-radio Public Methods

| Method                       | Parameters         | Description                                                    | Return    |
| ---------------------------- | ------------------ | -------------------------------------------------------------- | --------- |
| `getValue()`                 | -                  | Returns the current value if checked, empty string otherwise   | `string`  |
| `setValue(value)`            | `value: string`    | Sets the value of the radio button                             | `void`    |
| `setChecked(checked)`        | `checked: boolean` | Programmatically sets the checked state                        | `void`    |
| `click()`                    | -                  | Programmatically clicks the radio button                       | `void`    |
| `toggle()`                   | -                  | Toggles the checked state                                      | `void`    |
| `reportValidity()`           | -                  | Validates the radio and displays validation message if invalid | `boolean` |
| `setCustomValidity(message)` | `message: string`  | Sets a custom validation message                               | `void`    |

## mjo-radio Events

| Event              | Description                                             | Type                  | Detail Properties                                                        |
| ------------------ | ------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------ |
| `change`           | Standard HTML input change event for form compatibility | `Event`               | -                                                                        |
| `mjo-radio:change` | Enhanced custom event with detailed state information   | `MjoRadioChangeEvent` | `element: MjoRadio`, `checked: boolean`, `value: string`, `name: string` |
| `mjo-radio:focus`  | Fired when radio button receives focus                  | `MjoRadioFocusEvent`  | `element: MjoRadio`                                                      |
| `mjo-radio:blur`   | Fired when radio button loses focus                     | `MjoRadioBlurEvent`   | `element: MjoRadio`                                                      |

## mjo-radio CSS Variables

| Variable                             | Description                      | Default                                                                          |
| ------------------------------------ | -------------------------------- | -------------------------------------------------------------------------------- |
| `--mjo-radio-border-color`           | Border color for unchecked state | `var(--mjo-foreground-color-low)`                                                |
| `--mjo-radio-checked-color`          | Background color when checked    | `var(--mjo-primary-color)` or `var(--mjo-secondary-color)`                       |
| `--mjo-radio-checked-border-color`   | Border color when checked        | `var(--mjo-radio-checked-color)`                                                 |
| `--mjo-radio-checked-icon-color`     | Icon color when checked          | `var(--mjo-primary-foreground-color)` or `var(--mjo-secondary-foreground-color)` |
| `--mjo-radio-disabled-opacity`       | Opacity when disabled            | `0.5`                                                                            |
| `--mjo-radio-error-border-color`     | Border color in error state      | `var(--mjo-color-error)`                                                         |
| `--mjo-radio-error-background-color` | Background color in error state  | `var(--mjo-color-error)`                                                         |
| `--mjo-radio-error-icon-color`       | Icon color in error state        | `var(--mjo-color-error-foreground)`                                              |
| `--mjo-radio-error-label-color`      | Label color in error state       | `var(--mjo-color-error)`                                                         |
| `--mjo-radio-focus-color`            | Focus indicator shadow color     | `rgba(59, 130, 246, 0.1)`                                                        |
| `--mjo-radio-focus-outline-color`    | Focus outline color              | `var(--mjo-primary-color)` or `var(--mjo-secondary-color)`                       |
| `--mjo-radio-label-color`            | Label text color                 | `inherit`                                                                        |
| `--mjo-radio-label-font-size`        | Label font size                  | `inherit`                                                                        |
| `--mjo-radio-label-font-weight`      | Label font weight                | `inherit`                                                                        |
| `--mjo-radio-helper-color`           | Helper text color                | `var(--mjo-foreground-color-low)`                                                |
| `--mjo-radio-helper-font-size`       | Helper text font size            | `0.8em`                                                                          |
| `--mjo-radio-helper-font-weight`     | Helper text font weight          | `normal`                                                                         |
| `--mjo-space-small`                  | Spacing between radio and label  | `5px`                                                                            |

## mjo-radio CSS Parts

| Part                              | Description                              | Element                    |
| --------------------------------- | ---------------------------------------- | -------------------------- |
| `container`                       | The main radio button container          | `div`                      |
| `box`                             | The radio button visual container        | `div`                      |
| `radio`                           | The radio button itself                  | `div`                      |
| `radio-inner`                     | The inner area containing the check icon | `div`                      |
| `radio-icon`                      | The check icon                           | `mjo-icon`                 |
| `label-container`                 | Container for the label text             | `div`                      |
| `label-text`                      | The label typography element             | `mjo-typography`           |
| `helper-text-container`           | Container for helper text                | `mjoint-input-helper-text` |
| `helper-text-typography`          | The helper text typography element       | `mjo-typography`           |
| `helper-text-msg-container`       | Container for error/success messages     | `mjoint-input-helper-text` |
| `helper-text-msg-error-message`   | Error message element                    | `div`                      |
| `helper-text-msg-success-message` | Success message element                  | `div`                      |
| `helper-text-msg-icon`            | Icon in error/success messages           | `mjo-icon`                 |

## mjo-radio-group Component

### Purpose

The `mjo-radio-group` component is a container that manages multiple radio buttons, automatically ensuring that only one radio button per group can be selected at a time. This is particularly useful when you have multiple independent groups of radios on the same page.

### Import

```javascript
import "mjo-litui/mjo-radio-group";
```

### Usage

Wrap your `mjo-radio` elements with the same `name` attribute inside a `mjo-radio-group`:

```html
<mjo-radio-group>
    <mjo-radio name="plan" value="basic" label="Basic Plan" checked></mjo-radio>
    <mjo-radio name="plan" value="premium" label="Premium Plan"></mjo-radio>
    <mjo-radio name="plan" value="enterprise" label="Enterprise Plan"></mjo-radio>
</mjo-radio-group>
```

### Features

- **Automatic Registration**: Radios within a group are automatically registered
- **Mutual Exclusivity**: Ensures only one radio per named group can be selected
- **Event Coordination**: Handles deselection of other radios when one is selected
- **Multiple Groups**: Supports multiple independent groups on the same page

### When to Use

- You have multiple sets of radio buttons with different names on the same page
- You want explicit visual and semantic grouping of related options
- You need guaranteed mutual exclusivity beyond the native browser behavior

### Slot

| Name      | Description                           |
| --------- | ------------------------------------- |
| (default) | Content area for `mjo-radio` elements |

### Public Method

| Method             | Parameters        | Description                                                    |
| ------------------ | ----------------- | -------------------------------------------------------------- |
| `pushRadio(radio)` | `radio: MjoRadio` | Registers a radio button with the group (automatically called) |

## Accessibility

### ARIA Support

- **`role="radio"`**: Applied to the interactive container for proper screen reader identification
- **`aria-checked`**: Dynamically reflects the checked state (`"true"` or `"false"`)
- **`aria-label`**: Computed from the `label` property with additional context (required/selected state)
- **`aria-describedby`**: Links to helper text or error messages for additional context
- **`aria-disabled`**: Reflects disabled state for assistive technologies
- **`aria-invalid`**: Indicates error state for form validation
- **`aria-live`**: Helper text regions announce changes to screen readers

### Keyboard Navigation

| Key           | Action                                        |
| ------------- | --------------------------------------------- |
| `Space`       | Toggles the radio selection                   |
| `Enter`       | Toggles the radio selection                   |
| `Tab`         | Moves focus to the next focusable element     |
| `Shift + Tab` | Moves focus to the previous focusable element |

### Focus Management

- Visible focus indicator via `:focus-visible` styling
- Custom focus outline color via `--mjo-radio-focus-outline-color`
- Focus shadow for enhanced visibility via `--mjo-radio-focus-color`
- Keyboard-only focus indicators (no focus on mouse click)

### Best Practices

1. **Always use descriptive labels**: Provide clear `label` text or `aria-label` for screen readers
2. **Group related radios**: Use the same `name` attribute for mutually exclusive options
3. **Use `mjo-radio-group`**: Wrap related radios for semantic grouping and guaranteed mutual exclusivity
4. **Provide helper text**: Use `helperText` for additional context or instructions
5. **Handle validation errors**: Set `error` and `errormsg` properties for clear error communication
6. **Mark required fields**: Use `required` attribute and ensure visual indication
7. **Test keyboard navigation**: Verify all interactions work without a mouse
8. **Test with screen readers**: Ensure all state changes are announced properly

### High Contrast Mode

The component adapts to high contrast mode with increased border width and outline for better visibility.

### Reduced Motion

Animation and transitions are disabled when the user prefers reduced motion (`prefers-reduced-motion: reduce`).

## Usage Examples

### Basic Radio Buttons

```html
<mjo-radio name="choice" value="yes" label="Yes"></mjo-radio>
<mjo-radio name="choice" value="no" label="No"></mjo-radio>
<mjo-radio name="choice" value="maybe" label="Maybe"></mjo-radio>
```

### Radio Group with Selection

```html
<mjo-radio-group>
    <mjo-radio name="plan" value="basic" label="Basic Plan - $9.99/month" helperText="Perfect for individuals" checked> </mjo-radio>
    <mjo-radio name="plan" value="premium" label="Premium Plan - $19.99/month" helperText="Great for small teams"> </mjo-radio>
    <mjo-radio name="plan" value="enterprise" label="Enterprise Plan - $49.99/month" helperText="For large organizations"> </mjo-radio>
</mjo-radio-group>
```

### Different Sizes

```html
<mjo-radio name="size" value="small" label="Small" size="small"></mjo-radio>
<mjo-radio name="size" value="medium" label="Medium" size="medium"></mjo-radio>
<mjo-radio name="size" value="large" label="Large" size="large"></mjo-radio>
```

### Color Variants

```html
<mjo-radio name="color1" value="primary" label="Primary" color="primary" checked></mjo-radio>
<mjo-radio name="color2" value="secondary" label="Secondary" color="secondary" checked></mjo-radio>
```

### With Helper Text and Error State

```html
<mjo-radio
    name="terms"
    value="accept"
    label="I accept the terms and conditions"
    helperText="You must accept to continue"
    required
    error
    errormsg="You must accept the terms"
>
</mjo-radio>
```

### Disabled State

```html
<mjo-radio name="disabled-example" value="option" label="Disabled Option" disabled> </mjo-radio>
```

### Form Integration

```html
<mjo-form>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <h4>Newsletter frequency:</h4>
        <mjo-radio name="newsletter" value="daily" label="Daily updates" helperText="Receive updates every day"> </mjo-radio>
        <mjo-radio name="newsletter" value="weekly" label="Weekly digest" helperText="Receive updates once a week" checked> </mjo-radio>
        <mjo-radio name="newsletter" value="monthly" label="Monthly summary" helperText="Receive updates once a month"> </mjo-radio>
    </div>

    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

### Programmatic Control

```javascript
// Get radio reference
const radio = document.querySelector("mjo-radio");

// Set checked state
radio.setChecked(true);

// Get current value
const value = radio.getValue();
console.log(value); // Returns value if checked, empty string otherwise

// Toggle checked state
radio.toggle();

// Set custom validation
radio.setCustomValidity("Please select a valid option");
radio.reportValidity();
```

### Event Handling

```javascript
const radio = document.querySelector("mjo-radio");

// Listen to change event
radio.addEventListener("mjo-radio:change", (event) => {
    console.log("Checked:", event.detail.checked);
    console.log("Value:", event.detail.value);
    console.log("Name:", event.detail.name);
    console.log("Element:", event.detail.element);
});

// Listen to focus event
radio.addEventListener("mjo-radio:focus", (event) => {
    console.log("Radio focused:", event.detail.element);
});

// Listen to blur event
radio.addEventListener("mjo-radio:blur", (event) => {
    console.log("Radio blurred:", event.detail.element);
});
```

### Multiple Independent Groups

```html
<!-- Group 1: Payment Method -->
<div>
    <h4>Payment method:</h4>
    <mjo-radio-group>
        <mjo-radio name="payment" value="credit" label="Credit Card" checked></mjo-radio>
        <mjo-radio name="payment" value="paypal" label="PayPal"></mjo-radio>
        <mjo-radio name="payment" value="bank" label="Bank Transfer"></mjo-radio>
    </mjo-radio-group>
</div>

<!-- Group 2: Shipping Method -->
<div>
    <h4>Shipping method:</h4>
    <mjo-radio-group>
        <mjo-radio name="shipping" value="standard" label="Standard (5-7 days)" checked></mjo-radio>
        <mjo-radio name="shipping" value="express" label="Express (2-3 days)"></mjo-radio>
        <mjo-radio name="shipping" value="overnight" label="Overnight"></mjo-radio>
    </mjo-radio-group>
</div>
```

### Custom Styling with CSS Parts

```css
/* Style the radio button */
mjo-radio::part(radio) {
    border-width: 3px;
}

/* Style the checked state */
mjo-radio[checked]::part(radio-inner) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Style the label */
mjo-radio::part(label-text) {
    font-weight: 600;
    text-transform: uppercase;
}

/* Style error messages */
mjo-radio::part(helper-text-msg-error-message) {
    font-weight: bold;
}
```

### Custom Styling with CSS Variables

```css
mjo-radio {
    --mjo-radio-border-color: #999;
    --mjo-radio-checked-color: #ff6b6b;
    --mjo-radio-checked-icon-color: white;
    --mjo-radio-label-font-size: 1.1em;
    --mjo-radio-label-font-weight: 500;
    --mjo-radio-focus-outline-color: #ff6b6b;
}
```

## Additional Notes

### Form Integration

- The `mjo-radio` component integrates seamlessly with `mjo-form` through the `FormMixin`
- Supports standard HTML5 validation attributes (`required`)
- Emits both standard `change` events and custom `mjo-radio:change` events for flexibility
- Automatically updates form data when the checked state changes

### Validation

- Supports custom validation messages via `setCustomValidity()`
- Can display error states with `error` and `errormsg` properties
- Integrates with browser validation via `reportValidity()`
- Works with form validation through the `required` attribute

### Accessibility Enhancements

- Automatically computes accessible labels with context (required/selected state)
- Provides keyboard navigation support (Space and Enter keys)
- Supports focus management with visible focus indicators
- Announces state changes to screen readers via ARIA live regions
- Adapts to high contrast mode and reduced motion preferences

### Performance

- Uses Shadow DOM for style encapsulation
- Minimal re-renders with efficient state management
- Lightweight implementation with no external dependencies beyond Lit

### Browser Compatibility

- Works in all modern browsers that support Web Components
- Requires a polyfill for older browsers (IE11 and below)
- Uses standard HTML5 form features for maximum compatibility
