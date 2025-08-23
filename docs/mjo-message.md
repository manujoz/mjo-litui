# mjo-message

A message controller component that displays temporary toast-like notifications with enhanced accessibility support.

## Overview

The `mjo-message` component provides a powerful message system for displaying temporary notifications using a controller architecture. It creates a global message container in the document body, allowing messages to appear above any content regardless of parent element constraints like `overflow: hidden`. The component includes comprehensive accessibility features with proper ARIA attributes and screen reader support.

## Accessibility Features

The `mjo-message` component includes comprehensive accessibility support:

### Screen Reader Support

-   **ARIA Live Regions**: Messages use appropriate `aria-live` attributes:
    -   `"assertive"` for error and warning messages (announced immediately)
    -   `"polite"` for info and success messages (announced when convenient)
-   **Message Roles**: Each message has semantic roles:
    -   `role="alert"` for urgent messages (error/warning)
    -   `role="status"` for informational messages (info/success)
-   **Atomic Announcements**: Messages use `aria-atomic="true"` for complete message reading

### Keyboard Navigation

-   Messages are properly announced by screen readers without interfering with keyboard navigation
-   The message container is marked as a landmark region with `role="region"`

### Visual Accessibility

-   Color-coded message types with distinct icons for each type
-   High contrast support through CSS custom properties
-   Appropriate color choices that work with system themes

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
| `--mjo-message-radius`           | `var(--mjo-shape-corner-small)`                                           | Border radius                          |
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

-   Messages use ARIA live regions for screen reader announcements
-   `role="alert"` for urgent messages (error, warning)
-   `role="status"` for informational messages (info, success)
-   Icons are hidden from assistive technology with `aria-hidden="true"`
-   Container uses `role="region"` with configurable `aria-label`
-   Supports custom `aria-live` settings (assertive/polite)

## Browser Support

Compatible with all modern browsers supporting Web Components, CSS custom properties, and ES2020+ features.

For additional theming options, see the [Theming Guide](./theming.md).
