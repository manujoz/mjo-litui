# mjo-alert

Alert component for displaying contextual feedback messages with multiple types, sizes, and dismissal functionality.

## Table of Contents

- [Use Cases](#use-cases)
- [Installation](#installation)
- [Properties](#properties)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

The `mjo-alert` component is ideal for:

- Displaying success, error, warning, or informational messages to users
- Providing contextual feedback after user actions (form submissions, operations)
- Creating dismissible notifications with auto-close functionality
- Building accessible alert systems with screen reader support
- Implementing animated message displays with customizable timing

## Installation

```typescript
import "mjo-litui/mjo-alert";
```

Or import it from the main package:

```typescript
import "mjo-litui";
```

## Properties

| Property            | Type                                                                                   | Description                                                                                              | Default    | Required |
| ------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `type`              | `"default" \| "primary" \| "secondary" \| "success" \| "info" \| "warning" \| "error"` | Semantic type of the alert that determines its visual appearance and default icon                        | `"info"`   | No       |
| `size`              | `"small" \| "medium" \| "large"`                                                       | Size variant affecting font size and spacing                                                             | `"medium"` | No       |
| `rounded`           | `"none" \| "small" \| "medium" \| "large" \| "full"`                                   | Border radius style                                                                                      | `"medium"` | No       |
| `variant`           | `"solid" \| "flat"`                                                                    | Visual variant. `solid` displays with border, `flat` without border                                      | `"solid"`  | No       |
| `icon`              | `string`                                                                               | Custom icon SVG string. If empty, uses default type-based icon                                           | `""`       | No       |
| `message`           | `string`                                                                               | Main alert message text                                                                                  | `""`       | No       |
| `details`           | `string \| TemplateResult<1>`                                                          | Additional details text or template. Displayed below the message                                         | `""`       | No       |
| `closable`          | `boolean`                                                                              | Whether the alert displays a close button                                                                | `false`    | No       |
| `hideIcon`          | `boolean`                                                                              | Hides the type icon when true                                                                            | `false`    | No       |
| `focusOnShow`       | `boolean`                                                                              | Automatically focuses the alert when shown                                                               | `false`    | No       |
| `autoClose`         | `boolean`                                                                              | Enables automatic closing after specified delay                                                          | `false`    | No       |
| `autoCloseDelay`    | `number`                                                                               | Milliseconds before auto-close triggers (requires `autoClose: true`)                                     | `5000`     | No       |
| `animation`         | `"fade" \| "slide" \| "scale" \| "none"`                                               | Animation type for show/hide transitions                                                                 | `"fade"`   | No       |
| `animationDuration` | `number`                                                                               | Duration of show/hide animation in milliseconds                                                          | `250`      | No       |
| `persistent`        | `boolean`                                                                              | When true, prevents alert from closing even with close button                                            | `false`    | No       |
| `ariaLive`          | `"polite" \| "assertive" \| "off"`                                                     | ARIA live region politeness for screen readers. `assertive` auto-applied for `error` and `warning` types | `"polite"` | No       |

## Public Methods

| Method       | Parameters | Description                                                                                            | Return Value |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------ | ------------ |
| `show()`     | None       | Displays the alert with configured animation. Resets auto-close timer if enabled                       | `void`       |
| `hide()`     | None       | Hides the alert with configured animation. Restores focus to next focusable element if alert had focus | `void`       |
| `focus()`    | None       | Sets focus to the close button if available, otherwise to the alert container                          | `void`       |
| `announce()` | None       | Forces screen readers to re-announce the alert by temporarily toggling `aria-live`                     | `void`       |

## Events

| Event                  | Type                     | Description                                             | Detail Properties       |
| ---------------------- | ------------------------ | ------------------------------------------------------- | ----------------------- |
| `mjo-alert:will-show`  | `MjoAlertWillShowEvent`  | Fired before the alert is shown                         | `{ element: MjoAlert }` |
| `mjo-alert:opened`     | `MjoAlertOpenedEvent`    | Fired after the alert is shown and animation completes  | `{ element: MjoAlert }` |
| `mjo-alert:will-close` | `MjoAlertWillCloseEvent` | Fired before the alert is closed                        | `{ element: MjoAlert }` |
| `mjo-alert:closed`     | `MjoAlertClosedEvent`    | Fired after the alert is closed and animation completes | `{ element: MjoAlert }` |

All events bubble and are composed, allowing them to cross shadow DOM boundaries.

## CSS Variables

| Variable                          | Description                                                          | Default |
| --------------------------------- | -------------------------------------------------------------------- | ------- |
| `--mjo-alert-border-width`        | Width of the border in solid variant                                 | `3px`   |
| `--mjo-alert-message-font-weight` | Font weight of the main message text                                 | `600`   |
| `--mjo-alert-animation-duration`  | Animation duration (auto-set to `0ms` with `prefers-reduced-motion`) | -       |

The component also uses global theme variables such as `--mjo-primary-color`, `--mjo-color-success`, `--mjo-color-error`, etc., for type-based styling.

## CSS Parts

| Part                | Description                                     | Element      |
| ------------------- | ----------------------------------------------- | ------------ |
| `container`         | Main alert container with type-based styling    | `<div>`      |
| `message-container` | Container for icon, message, and close button   | `<div>`      |
| `icon-container`    | Container for the type icon                     | `<div>`      |
| `message`           | Message content area                            | `<div>`      |
| `detail`            | Detail content area (when details are provided) | `<div>`      |
| `icon`              | Icon element (exported from `mjo-icon`)         | `<mjo-icon>` |

## Accessibility

### ARIA Attributes

- `role="alert"`: Applied to main container for screen reader announcements
- `aria-live`: Set to `"assertive"` for `error` and `warning` types, otherwise uses the `ariaLive` property value
- `aria-atomic="true"`: Ensures entire alert is announced when changed
- `aria-labelledby`: Links to the message element ID
- `aria-describedby`: Links to the detail element ID when details exist
- `aria-label="Close alert"`: Applied to close button for screen reader users

### Keyboard Navigation

- **Tab**: Moves focus to the close button when `closable` is true
- **Enter/Space**: Closes the alert when close button is focused
- **Focus management**: Automatically restores focus to next available element when closed

### Best Practices

- Use appropriate `type` values to convey semantic meaning (`error` for errors, `success` for confirmations)
- Provide meaningful `message` text that describes the alert's purpose
- Use `ariaLive="assertive"` sparingly, only for critical messages requiring immediate attention
- Enable `focusOnShow` for alerts requiring user interaction
- Set `persistent` for critical alerts that should not be dismissed accidentally
- Test with screen readers to ensure announcements work as expected

### Reduced Motion Support

The component respects `prefers-reduced-motion: reduce` by setting animation duration to `0ms`, providing instant transitions for users who prefer reduced motion.

## Usage Examples

### Basic Alert Types

```html
<!-- Success message -->
<mjo-alert type="success" message="Operation completed successfully" closable> </mjo-alert>

<!-- Error with details -->
<mjo-alert type="error" message="Something went wrong" details="Please check your input and try again." closable> </mjo-alert>

<!-- Info notification -->
<mjo-alert type="info" message="New updates available"> </mjo-alert>
```

### Different Sizes and Variants

```html
<!-- Small flat alert -->
<mjo-alert type="warning" size="small" variant="flat" message="Minor warning" closable> </mjo-alert>

<!-- Large solid alert -->
<mjo-alert type="primary" size="large" variant="solid" message="Important announcement" details="This is a larger alert for prominent messages." closable>
</mjo-alert>
```

### Auto-Close Functionality

```html
<!-- Auto-close after 3 seconds -->
<mjo-alert type="success" message="Saved successfully" autoClose autoCloseDelay="3000" closable> </mjo-alert>

<!-- Custom animation with auto-close -->
<mjo-alert type="info" message="Loading complete" animation="slide" animationDuration="300" autoClose autoCloseDelay="5000" closable> </mjo-alert>
```

### Custom Icons

```typescript
import { AiOutlineWarning } from "mjo-icons/ai";

// In your template:
```

```html
<mjo-alert type="warning" icon="${AiOutlineWarning}" message="Custom icon alert"> </mjo-alert>

<!-- Hide icon completely -->
<mjo-alert type="info" message="Alert without icon" hideIcon closable> </mjo-alert>
```

### Programmatic Control

```typescript
// Get alert reference
const alert = document.querySelector("mjo-alert");

// Show the alert
alert.show();

// Hide the alert
setTimeout(() => {
    alert.hide();
}, 3000);

// Force announcement
alert.announce();

// Focus the alert
alert.focus();
```

### Event Handling

```typescript
const alert = document.querySelector("mjo-alert");

alert.addEventListener("mjo-alert:will-show", (e) => {
    console.log("Alert about to show", e.detail.element);
});

alert.addEventListener("mjo-alert:opened", (e) => {
    console.log("Alert shown", e.detail.element);
});

alert.addEventListener("mjo-alert:will-close", (e) => {
    console.log("Alert about to close", e.detail.element);
    // Can perform cleanup or validation here
});

alert.addEventListener("mjo-alert:closed", (e) => {
    console.log("Alert closed", e.detail.element);
    // Can trigger next action or remove from DOM
});
```

### Integration with Forms

```html
<mjo-form id="user-form">
    <mjo-textfield name="email" label="Email" required></mjo-textfield>
    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>

<mjo-alert id="form-alert" type="error" message="Validation failed" details="Please check the required fields." closable hidden> </mjo-alert>

<script>
    const form = document.querySelector("#user-form");
    const alert = document.querySelector("#form-alert");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            // Form processing...
            alert.type = "success";
            alert.message = "Form submitted successfully";
            alert.details = "";
            alert.show();
        } catch (error) {
            alert.type = "error";
            alert.message = "Submission failed";
            alert.details = error.message;
            alert.show();
        }
    });
</script>
```

### Advanced Animation Examples

```html
<!-- Fade animation -->
<mjo-alert type="info" animation="fade" animationDuration="200" message="Fade in/out" closable> </mjo-alert>

<!-- Slide animation -->
<mjo-alert type="success" animation="slide" animationDuration="300" message="Slide in/out" closable> </mjo-alert>

<!-- Scale animation -->
<mjo-alert type="warning" animation="scale" animationDuration="250" message="Scale in/out" closable> </mjo-alert>

<!-- No animation -->
<mjo-alert type="error" animation="none" message="Instant show/hide" closable> </mjo-alert>
```

### Styling with CSS Parts

```css
/* Style the container */
mjo-alert::part(container) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Style the message */
mjo-alert::part(message) {
    font-family: "Custom Font", sans-serif;
    letter-spacing: 0.5px;
}

/* Style the icon container */
mjo-alert::part(icon-container) {
    transform: scale(1.2);
}

/* Style the icon itself */
mjo-alert::part(icon) {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Style details */
mjo-alert::part(detail) {
    font-style: italic;
    opacity: 0.9;
}
```

### Using CSS Variables

```css
/* Customize border width */
mjo-alert {
    --mjo-alert-border-width: 2px;
}

/* Customize message font weight */
mjo-alert[type="error"] {
    --mjo-alert-message-font-weight: 700;
}

/* Custom spacing for small alerts */
mjo-alert[size="small"] {
    --mjo-space-small: 8px;
    --mjo-space-medium: 12px;
}
```

## Additional Notes

### Type-Specific Behavior

- `error` and `warning` types automatically use `aria-live="assertive"` regardless of the `ariaLive` property value
- Each type has a default icon that can be overridden with the `icon` property
- Type determines the color scheme using theme variables

### Animation Considerations

- Animations respect the `prefers-reduced-motion` media query
- Animation durations should be kept between 150-500ms for optimal UX
- The `slide` animation requires the component to store its height for smooth transitions
- Setting `animation="none"` provides instant show/hide without transitions

### Focus Management

- When `focusOnShow` is enabled, the close button receives focus automatically
- Focus is restored to the next available focusable element when the alert closes with keyboard
- Focus restoration helps maintain keyboard navigation flow

### Persistent Alerts

- Setting `persistent="true"` with `closable="true"` shows the close button but prevents actual closing
- Useful for alerts requiring acknowledgment through other means (e.g., form submission)
- Can be programmatically closed using the `hide()` method even when persistent

### Auto-Close Timer

- The timer resets whenever `show()` is called
- Timer is cleared when `hide()` is called or component disconnects
- Setting `autoClose="false"` disables the timer even if `autoCloseDelay` is set

### Template Details

The `details` property accepts either a string or a Lit `TemplateResult`, allowing rich content:

```typescript
import { html } from "lit";

const alert = document.querySelector("mjo-alert");
alert.details = html` <strong>Important:</strong> Your session will expire in <a href="/extend">5 minutes</a>. `;
```

### Hidden State

- Alerts can be created with the `hidden` attribute for later programmatic display
- Use `show()` method to reveal hidden alerts with animation
- The component manages the `hidden` attribute internally during animations
