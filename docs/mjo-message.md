# mjo-message

A message controller component that displays temporary toast-like notifications with enhanced accessibility support.

## Overview

The `mjo-message` component provides a powerful message system for displaying temporary notifications using a controller architecture. It creates a global message container in the document body, allowing messages to appear above any content regardless of parent element constraints like `overflow: hidden`. The component includes comprehensive accessibility features with proper ARIA attributes and screen reader support.

## Accessibility Features

The `mjo-message` component includes comprehensive accessibility support:

### Screen Reader Support

- **ARIA Live Regions**: Messages use appropriate `aria-live` attributes:
    - `"assertive"` for error and warning messages (announced immediately)
    - `"polite"` for info and success messages (announced when convenient)
- **Message Roles**: Each message has semantic roles:
    - `role="alert"` for urgent messages (error/warning)
    - `role="status"` for informational messages (info/success)
- **Atomic Announcements**: Messages use `aria-atomic="true"` for complete message reading

### Keyboard Navigation

- Messages are properly announced by screen readers without interfering with keyboard navigation
- The message container is marked as a landmark region with `role="region"`

### Visual Accessibility

- Color-coded message types with distinct icons for each type
- High contrast support through CSS custom properties
- Appropriate color choices that work with system themes

### Configuration

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoMessage } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("example-message-accessibility")
export class ExampleMessageAccessibility extends LitElement {
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    private showAccessibleMessage() {
        this.messageComponent.controller.show({
            message: "Form validation completed with 2 errors found",
            type: "error", // Will use aria-live="assertive" and role="alert"
            time: 6000, // Longer time for important messages
        });
    }

    render() {
        return html`
            <div>
                <h3>Accessible Message Example</h3>
                <mjo-button @click=${this.showAccessibleMessage}>Show Accessible Error</mjo-button>

                <!-- Configure accessibility settings -->
                <mjo-message region-label="Form validation messages" aria-live="assertive" max-messages="3"> </mjo-message>
            </div>
        `;
    }
}
```

## Basic Usage

### HTML

```html
<mjo-message region-label="Notification area" max-messages="6"></mjo-message>
```

### Simple Message Display

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoMessage } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("example-message-basic")
export class ExampleMessageBasic extends LitElement {
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    private showMessage(type: "info" | "success" | "warning" | "error", message: string) {
        this.messageComponent.controller.show({
            message,
            type,
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${() => this.showMessage("info", "Information message")}> Show Info </mjo-button>
                <mjo-button @click=${() => this.showMessage("success", "Operation completed!")}> Show Success </mjo-button>
                <mjo-button @click=${() => this.showMessage("warning", "Please check your input")}> Show Warning </mjo-button>
                <mjo-button @click=${() => this.showMessage("error", "An error occurred")}> Show Error </mjo-button>
            </div>

            <mjo-message></mjo-message>
        `;
    }
}
```

## Message Types and Icons

The component supports four message types, each with its corresponding icon:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoMessage, MessageTypes } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("example-message-types")
export class ExampleMessageTypes extends LitElement {
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    private showMessage(type: MessageTypes, message: string) {
        this.messageComponent.controller.show({
            message,
            type,
            time: 4000,
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <mjo-button @click=${() => this.showMessage("info", "ℹ️ Information: Task is in progress")} variant="ghost"> Info Message </mjo-button>

                <mjo-button @click=${() => this.showMessage("success", "✅ Success: Data saved successfully")} variant="success"> Success Message </mjo-button>

                <mjo-button @click=${() => this.showMessage("warning", "⚠️ Warning: Low disk space")} variant="warning"> Warning Message </mjo-button>

                <mjo-button @click=${() => this.showMessage("error", "❌ Error: Network connection failed")} variant="danger"> Error Message </mjo-button>
            </div>

            <mjo-message></mjo-message>
        `;
    }
}
```

## Custom Duration and Callbacks

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoMessage } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("example-message-advanced")
export class ExampleMessageAdvanced extends LitElement {
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    private async showAsyncMessage() {
        const messageItem = await this.messageComponent.controller.show({
            message: "Processing... This will close automatically",
            type: "info",
            time: 5000,
        });

        // Simulate async operation
        setTimeout(() => {
            messageItem.close();
            this.messageComponent.controller.show({
                message: "Operation completed successfully!",
                type: "success",
            });
        }, 2000);
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem;">
                <mjo-button @click=${this.showAsyncMessage}>Show Async Message</mjo-button>
            </div>

            <mjo-message max-messages="6"></mjo-message>
        `;
    }
}
```

## Form Integration

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoMessage, MjoForm } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-message-form")
export class ExampleMessageForm extends LitElement {
    @query("mjo-message") private messageComponent!: MjoMessage;
    @query("mjo-form") private form!: MjoForm;
    @state() private isSubmitting = false;

    private async handleSubmit() {
        if (!this.form.validate()) {
            this.messageComponent.controller.show({
                message: "Please correct the errors in the form",
                type: "error",
            });
            return;
        }

        this.isSubmitting = true;
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API
            this.messageComponent.controller.show({
                message: "Profile updated successfully!",
                type: "success",
            });
            this.form.reset();
        } catch {
            this.messageComponent.controller.show({
                message: "Failed to update profile. Please try again.",
                type: "error",
            });
        } finally {
            this.isSubmitting = false;
        }
    }

    render() {
        return html`
            <mjo-form style="max-width: 400px;">
                <mjo-textfield label="Name" name="name" required rules="required|min:2"></mjo-textfield>
                <mjo-textfield label="Email" name="email" type="email" required rules="required|email"></mjo-textfield>
                <mjo-button @click=${this.handleSubmit} .loading=${this.isSubmitting} style="margin-top: 1rem;"> Update Profile </mjo-button>
            </mjo-form>
            <mjo-message></mjo-message>
        `;
    }
}
```

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoMessage } from "mjo-litui/types";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("example-message-theming")
export class ExampleMessageTheming extends LitElement {
    @query("mjo-message") private messageComponent!: MjoMessage;

    private showThemedMessage() {
        this.messageComponent.controller.show({
            message: "This message uses custom theme colors",
            type: "info",
        });
    }

    render() {
        return html`
            <mjo-theme
                .theme=${{
                    components: {
                        mjoMessage: {
                            backgroundColor: "#e3f2fd",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                            radius: "12px",
                            marginTop: "20px",
                            top: "20px",
                        },
                    },
                }}
            >
                <mjo-button @click=${this.showThemedMessage}>Show Themed Message</mjo-button>
                <mjo-message></mjo-message>
            </mjo-theme>
        `;
    }
}
```

### Using ThemeMixin

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { ThemeMixin } from "mjo-litui/mixins";
import type { MjoMessage } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("example-message-theme-mixin")
export class ExampleMessageThemeMixin extends ThemeMixin(LitElement) {
    @query("mjo-message") private messageComponent!: MjoMessage;

    private showCustomMessage() {
        this.messageComponent.controller.show({
            message: "Message with component-level theme override",
            type: "success",
        });
    }

    render() {
        return html`
            <mjo-button @click=${this.showCustomMessage}>Show Custom Message</mjo-button>
            <mjo-message
                .theme=${{
                    backgroundColor: "#f3e5f5",
                    boxShadow: "0 2px 15px rgba(156, 39, 176, 0.2)",
                    radius: "8px",
                }}
            >
            </mjo-message>
        `;
    }
}
```

## Styling Architecture

### Important: Message Container Mounting

The `mjo-message` component works by dynamically creating a `mjo-message-container` element that is mounted directly in the document `<body>`. This architecture provides several benefits:

- **Overlay Management**: Ensures messages appear above all other content
- **Z-index Control**: Prevents z-index conflicts with parent containers
- **Overflow Prevention**: Bypasses any parent `overflow: hidden` styles
- **Global Accessibility**: Enables proper ARIA live region management

### CSS Variables and Parts Application

Because the actual message content is rendered in the `mjo-message-container` (mounted in the body), CSS variables and CSS parts cannot be applied directly to the `mjo-message` component. Instead, you need to apply styles globally to target the dynamically created container and message items.

### Global Styling Pattern

Since the message container is created in the document body, all styling must be applied globally:

```css
/* Global styling for all message containers */
mjo-message-container {
    --mjo-message-background-color: #f8f9fa;
    --mjo-message-top: 20px;
}

/* Global styling for all message items using CSS parts */
mjo-message-container::part(container) {
    backdrop-filter: blur(5px);
}

mjoint-message-item::part(icon-container) {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    padding: 4px;
}

mjoint-message-item::part(message) {
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

mjoint-message-item::part(icon) {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}
```

### Complete Styling Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoMessage } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("app-with-styled-messages")
export class AppWithStyledMessages extends LitElement {
    @query("mjo-message") private messageComponent!: MjoMessage;

    private showStyledMessage() {
        this.messageComponent.show({
            message: "This message uses custom styling applied globally",
            type: "success",
            time: 5000,
        });
    }

    render() {
        return html`
            <mjo-message region-label="Styled notifications"></mjo-message>
            <mjo-button @click=${this.showStyledMessage}>Show Styled Message</mjo-button>
        `;
    }

    static styles = css`
        /* Global styles applied to the document */
        :host {
            --mjo-message-background-color: #e8f5e8;
            --mjo-message-border-radius: 12px;
            --mjo-message-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
    `;
}

// Add global styles to the document
const globalStyles = document.createElement("style");
globalStyles.textContent = `
    /* Global message container styling */
    mjo-message-container::part(container) {
        padding: 20px;
        max-width: 400px;
        margin: 0 auto;
    }

    /* Global message item styling */
    mjoint-message-item::part(icon-container) {
        background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
        border-radius: 8px;
        padding: 6px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    mjoint-message-item::part(message) {
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 500;
        letter-spacing: 0.025em;
    }

    mjoint-message-item::part(icon) {
        filter: drop-shadow(0 1px 3px rgba(0,0,0,0.3));
    }
`;
document.head.appendChild(globalStyles);
```

### Best Practices for Styling

1. **Use global styles**: Apply CSS variables and parts globally since the container is mounted in the body
2. **Semantic styling**: Use type-specific styling through CSS variables for consistent theming
3. **Performance considerations**: Avoid excessive global styles that might affect other components
4. **CSS containment**: Use appropriate CSS containment for better performance when styling many messages

## CSS Parts

The message system exposes several CSS parts for advanced styling:

| Part             | Element                 | Description                                  |
| ---------------- | ----------------------- | -------------------------------------------- |
| `container`      | `mjo-message-container` | The main container holding all message items |
| `icon-container` | `mjoint-message-item`   | Container wrapping the message type icon     |
| `message`        | `mjoint-message-item`   | Container holding the message text content   |
| `icon`           | `mjo-icon`              | The icon element (exported from `mjo-icon`)  |

### CSS Parts Usage Examples

```css
/* Style the message container */
mjo-message-container::part(container) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 24px;
    backdrop-filter: blur(10px);
}

/* Style icon containers for all message types */
mjoint-message-item::part(icon-container) {
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    padding: 8px;
    transition: all 0.3s ease;
}

/* Style message text */
mjoint-message-item::part(message) {
    color: #2d3748;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    line-height: 1.5;
}

/* Style the icon itself */
mjoint-message-item::part(icon) {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    transition: transform 0.2s ease;
}

/* Interactive states */
mjoint-message-item:hover::part(icon-container) {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.25);
}

mjoint-message-item:hover::part(icon) {
    transform: scale(1.1);
}
```

### Type-specific Part Styling

You can also style parts based on message type using attribute selectors:

```css
/* Success message styling */
mjoint-message-item[type="success"]::part(icon-container) {
    background: linear-gradient(135deg, #48bb78, #38a169);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

/* Error message styling */
mjoint-message-item[type="error"]::part(icon-container) {
    background: linear-gradient(135deg, #f56565, #e53e3e);
    box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
}

/* Warning message styling */
mjoint-message-item[type="warning"]::part(icon-container) {
    background: linear-gradient(135deg, #ed8936, #dd6b20);
    box-shadow: 0 4px 12px rgba(237, 137, 54, 0.3);
}

/* Info message styling */
mjoint-message-item[type="info"]::part(icon-container) {
    background: linear-gradient(135deg, #4299e1, #3182ce);
    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
}
```

## Properties

| Name          | Type                               | Default                   | Description                                              |
| ------------- | ---------------------------------- | ------------------------- | -------------------------------------------------------- |
| `ariaLabel`   | `string \| null`                   | `null`                    | Accessible label for the message component               |
| `regionLabel` | `string`                           | `"Message notifications"` | Label for the message region (used in message container) |
| `ariaLive`    | `"polite" \| "assertive" \| "off"` | `"polite"`                | Urgency level for screen reader announcements            |
| `maxMessages` | `number`                           | `4`                       | Maximum number of messages displayed simultaneously      |
| `theme`       | `MjoMessageTheme`                  | `{}`                      | Theme configuration for the message container            |

## Controller Methods

The `MessageController` provides the following methods:

### `show(params: MessageShowParams): Promise<MessageItem>`

Shows a new message and returns the message item instance for programmatic control.

#### Parameters

| Name      | Type           | Default  | Description                                                    |
| --------- | -------------- | -------- | -------------------------------------------------------------- |
| `message` | `string`       | -        | The message text to display                                    |
| `type`    | `MessageTypes` | `"info"` | Message type: `"info"`, `"success"`, `"warning"`, or `"error"` |
| `time`    | `number`       | `3000`   | Duration in milliseconds before auto-close                     |
| `onClose` | `() => void`   | -        | Callback function executed when message closes                 |

## Types

```ts
type MessageTypes = "info" | "warning" | "error" | "success" | "";

interface MessageShowParams {
    message: string;
    type?: MessageTypes;
    time?: number;
    onClose?: () => void;
}
```

## Events

This component does not emit custom events. Individual message items emit a `remove` event when they are closed.

## CSS Custom Properties

| Property | Default | Description |

## CSS Custom Properties

| Variable                         | Default                                                                   | Description                            |
| -------------------------------- | ------------------------------------------------------------------------- | -------------------------------------- |
| `--mjo-message-background-color` | `color-mix(in srgb, var(--mjo-color-on-surface-variant) 8%, transparent)` | Background color for message container |
| `--mjo-message-backdrop-filter`  | `blur(10px)`                                                              | Backdrop filter effect                 |
| `--mjo-message-box-shadow`       | `var(--mjo-elevation-3)`                                                  | Box shadow elevation                   |
| `--mjo-message-border-radius`    | `var(--mjo-shape-corner-small)`                                           | Border radius                          |
| `--mjo-message-padding`          | `var(--mjo-space-4)`                                                      | Internal padding                       |
| `--mjo-message-gap`              | `var(--mjo-space-3)`                                                      | Gap between message elements           |
| `--mjo-message-font-size`        | `var(--mjo-typeface-body-medium-size)`                                    | Text size                              |
| `--mjo-message-line-height`      | `var(--mjo-typeface-body-medium-line-height)`                             | Text line height                       |
| `--mjo-message-color`            | `var(--mjo-color-on-surface-variant)`                                     | Text color                             |
| `--mjo-message-top`              | `var(--mjo-space-4)`                                                      | Distance from top of viewport          |
| `--mjo-message-right`            | `var(--mjo-space-4)`                                                      | Distance from right of viewport        |
| `--mjo-message-z-index`          | `1000`                                                                    | Z-index for stacking                   |
| `--mjo-message-margin-top`       | `var(--mjo-space-3)`                                                      | Top margin between messages            |
| `--mjo-message-min-width`        | `320px`                                                                   | Minimum width                          |
| `--mjo-message-max-width`        | `480px`                                                                   | Maximum width                          |

### Type-specific Colors

| Variable                      | Default                    | Description                |
| ----------------------------- | -------------------------- | -------------------------- |
| `--mjo-message-info-color`    | `var(--mjo-color-info)`    | Info message icon color    |
| `--mjo-message-success-color` | `var(--mjo-color-success)` | Success message icon color |
| `--mjo-message-warning-color` | `var(--mjo-color-warning)` | Warning message icon color |
| `--mjo-message-error-color`   | `var(--mjo-color-error)`   | Error message icon color   |

### Theme Interface

```ts
interface MjoMessageTheme {
    backgroundColor?: string;
    boxShadow?: string;
    radius?: string;
    marginTop?: string;
    top?: string;
}
```

## Accessibility Notes

- Messages use ARIA live regions for screen reader announcements
- `role="alert"` for urgent messages (error, warning)
- `role="status"` for informational messages (info, success)
- Icons are hidden from assistive technology with `aria-hidden="true"`
- Container uses `role="region"` with configurable `aria-label`
- Supports custom `aria-live` settings (assertive/polite)

## Browser Support

Compatible with all modern browsers supporting Web Components, CSS custom properties, and ES2020+ features.

For additional theming options, see the [Theming Guide](./theming.md).
