# mjo-message

A message controller component that displays temporary toast-like notifications at the top of the screen.

## Overview

The `mjo-message` component provides a powerful message system for displaying temporary notifications. It uses a controller architecture that creates a global message container in the document body, allowing messages to appear above any content regardless of parent element constraints like `overflow: hidden`.

## Basic Usage

### HTML

```html
<mjo-message></mjo-message>
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

    private showInfoMessage() {
        this.messageComponent.controller.show({
            message: "This is an informational message",
            type: "info",
        });
    }

    private showSuccessMessage() {
        this.messageComponent.controller.show({
            message: "Operation completed successfully!",
            type: "success",
        });
    }

    private showWarningMessage() {
        this.messageComponent.controller.show({
            message: "Please check your input",
            type: "warning",
        });
    }

    private showErrorMessage() {
        this.messageComponent.controller.show({
            message: "An error occurred. Please try again.",
            type: "error",
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.showInfoMessage}>Show Info</mjo-button>
                <mjo-button @click=${this.showSuccessMessage} variant="success">Show Success</mjo-button>
                <mjo-button @click=${this.showWarningMessage} variant="warning">Show Warning</mjo-button>
                <mjo-button @click=${this.showErrorMessage} variant="danger">Show Error</mjo-button>
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

Messages can have custom display durations and callback functions:

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

    private showPersistentMessage() {
        this.messageComponent.controller.show({
            message: "This message stays for 10 seconds",
            type: "info",
            time: 10000,
            onClose: () => {
                console.log("Persistent message closed");
            },
        });
    }

    private showQuickMessage() {
        this.messageComponent.controller.show({
            message: "Quick message (1 second)",
            type: "success",
            time: 1000,
        });
    }

    private showCallbackMessage() {
        this.messageComponent.controller.show({
            message: "Message with callback function",
            type: "warning",
            time: 3000,
            onClose: () => {
                alert("Message was closed!");
            },
        });
    }

    private async showAsyncMessage() {
        const messageItem = await this.messageComponent.controller.show({
            message: "Processing... This can be closed programmatically",
            type: "info",
            time: 10000,
        });

        // Simulate async operation
        setTimeout(() => {
            messageItem.close();
            this.messageComponent.controller.show({
                message: "Operation completed!",
                type: "success",
            });
        }, 2000);
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.showPersistentMessage}>10s Message</mjo-button>
                <mjo-button @click=${this.showQuickMessage}>Quick Message</mjo-button>
                <mjo-button @click=${this.showCallbackMessage}>With Callback</mjo-button>
                <mjo-button @click=${this.showAsyncMessage}>Async Control</mjo-button>
            </div>

            <mjo-message></mjo-message>
        `;
    }
}
```

## Form Integration

Messages are commonly used to provide feedback in forms:

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
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    @query("mjo-form")
    private form!: MjoForm;

    @state()
    private isSubmitting = false;

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
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            this.messageComponent.controller.show({
                message: "User profile updated successfully!",
                type: "success",
                time: 4000,
            });

            this.form.reset();
        } catch (error) {
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
            <mjo-form>
                <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
                    <mjo-textfield label="Name" name="name" required rules="required|min:2" helper="Enter your full name"> </mjo-textfield>

                    <mjo-textfield label="Email" name="email" type="email" required rules="required|email" helper="We'll use this to contact you">
                    </mjo-textfield>

                    <mjo-button @click=${this.handleSubmit} .loading=${this.isSubmitting} style="margin-top: 1rem;">
                        ${this.isSubmitting ? "Updating..." : "Update Profile"}
                    </mjo-button>
                </div>
            </mjo-form>

            <mjo-message></mjo-message>
        `;
    }
}
```

## Context Sharing Example

The message controller can be shared across component hierarchies using `@lit/context`, allowing child components to display messages from a parent container. This is especially useful for applications where message functionality needs to be accessible from deeply nested components.

```ts
import { LitElement, html, PropertyValues } from "lit";
import { customElement, provide, consume, query } from "lit/decorators.js";
import { createContext } from "@lit/context";
import type { MjoMessage, MessageController } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

// Create a context for the message controller
const messageContext = createContext<MessageController>("message-controller");

@customElement("main-app-component")
export class MainAppComponent extends LitElement {
    @provide({ context: messageContext })
    messageController!: MessageController;

    @query("mjo-message")
    private message!: MjoMessage;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        // Assign the message controller to the context provider after the message is available
        this.messageController = this.message.controller;
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h2>Main Application</h2>
                <p>This main component provides a message controller to all child components through context.</p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                    <user-actions-component></user-actions-component>
                    <data-operations-component></data-operations-component>
                </div>

                <div style="margin-top: 2rem;">
                    <notification-center></notification-center>
                </div>

                <!-- The message instance that provides the controller -->
                <mjo-message></mjo-message>
            </div>
        `;
    }
}

@customElement("user-actions-component")
export class UserActionsComponent extends LitElement {
    @consume({ context: messageContext, subscribe: true })
    messageController!: MessageController;

    private saveUserProfile() {
        // Simulate saving
        setTimeout(() => {
            this.messageController.show({
                message: "User profile saved successfully!",
                type: "success",
            });
        }, 500);
    }

    private deleteAccount() {
        this.messageController.show({
            message: "Account deletion requires admin approval",
            type: "warning",
            time: 5000,
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>User Actions</h4>
                    <p>This component can trigger messages through the shared controller.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <mjo-button @click=${this.saveUserProfile} variant="success"> Save Profile </mjo-button>
                        <mjo-button @click=${this.deleteAccount} variant="danger"> Delete Account </mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("data-operations-component")
export class DataOperationsComponent extends LitElement {
    @consume({ context: messageContext, subscribe: true })
    messageController!: MessageController;

    private exportData() {
        this.messageController.show({
            message: "Data export started. You will receive an email when complete.",
            type: "info",
            time: 4000,
        });
    }

    private importData() {
        this.messageController.show({
            message: "Please select a valid CSV file",
            type: "error",
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Data Operations</h4>
                    <p>Another component using the same message controller.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <mjo-button @click=${this.exportData}> Export Data </mjo-button>
                        <mjo-button @click=${this.importData}> Import Data </mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}

@customElement("notification-center")
export class NotificationCenter extends LitElement {
    @consume({ context: messageContext, subscribe: true })
    messageController!: MessageController;

    private showSystemStatus() {
        const messages = [
            { message: "System maintenance scheduled for tonight", type: "info" as const },
            { message: "Backup completed successfully", type: "success" as const },
            { message: "High CPU usage detected", type: "warning" as const },
            { message: "Database connection lost", type: "error" as const },
        ];

        messages.forEach((msg, index) => {
            setTimeout(() => {
                this.messageController.show({
                    message: msg.message,
                    type: msg.type,
                    time: 3000,
                });
            }, index * 1000);
        });
    }

    render() {
        return html`
            <mjo-card>
                <div style="padding: 1rem;">
                    <h4>Notification Center</h4>
                    <p>Centralized component for system notifications.</p>
                    <mjo-button @click=${this.showSystemStatus} style="margin-top: 1rem;"> Show System Status </mjo-button>
                </div>
            </mjo-card>
        `;
    }
}
```

This pattern allows any component in the application hierarchy to display messages without needing to pass the controller through props or maintaining multiple message instances.

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
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    private showThemedMessage() {
        this.messageComponent.controller.show({
            message: "This message uses custom theme colors",
            type: "info",
            time: 4000,
        });
    }

    render() {
        return html`
            <mjo-theme
                .theme=${{
                    message: {
                        backgroundColor: "#e3f2fd",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                        radius: "12px",
                        marginTop: "20px",
                        top: "20px",
                    },
                }}
            >
                <div style="padding: 2rem;">
                    <h3>Custom Message Theme</h3>
                    <p>Messages will appear with custom styling</p>

                    <mjo-button @click=${this.showThemedMessage}> Show Themed Message </mjo-button>
                </div>

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
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    private showCustomMessage() {
        this.messageComponent.controller.show({
            message: "Message with component-level theme override",
            type: "success",
        });
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h3>Component-Level Message Theming</h3>

                <mjo-button @click=${this.showCustomMessage}> Show Custom Message </mjo-button>

                <mjo-message
                    .theme=${{
                        backgroundColor: "#f3e5f5",
                        boxShadow: "0 2px 15px rgba(156, 39, 176, 0.2)",
                        radius: "8px",
                    }}
                >
                </mjo-message>
            </div>
        `;
    }
}
```

## Message Queue Management

The system automatically manages a queue of messages, showing up to 4 messages at once:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoMessage } from "mjo-litui/types";
import "mjo-litui/mjo-message";
import "mjo-litui/mjo-button";

@customElement("example-message-queue")
export class ExampleMessageQueue extends LitElement {
    @query("mjo-message")
    private messageComponent!: MjoMessage;

    private showMultipleMessages() {
        const messages = [
            { message: "First message", type: "info" as const },
            { message: "Second message", type: "success" as const },
            { message: "Third message", type: "warning" as const },
            { message: "Fourth message", type: "error" as const },
            { message: "Fifth message (will replace first)", type: "info" as const },
            { message: "Sixth message (will replace second)", type: "success" as const },
        ];

        messages.forEach((msg, index) => {
            setTimeout(() => {
                this.messageComponent.controller.show({
                    message: `${msg.message} - ${index + 1}`,
                    type: msg.type,
                    time: 10000, // Long duration to see queue behavior
                });
            }, index * 500);
        });
    }

    private showRapidMessages() {
        for (let i = 1; i <= 10; i++) {
            setTimeout(() => {
                this.messageComponent.controller.show({
                    message: `Rapid message #${i}`,
                    type: i % 2 === 0 ? "success" : "info",
                    time: 2000,
                });
            }, i * 200);
        }
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.showMultipleMessages}> Show Queue Demo </mjo-button>
                <mjo-button @click=${this.showRapidMessages}> Rapid Messages </mjo-button>
            </div>

            <mjo-message></mjo-message>
        `;
    }
}
```

## Properties

| Name    | Type              | Default | Description                                   |
| ------- | ----------------- | ------- | --------------------------------------------- |
| `theme` | `MjoMessageTheme` | `{}`    | Theme configuration for the message container |

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

| Property                         | Default                                                | Description                            |
| -------------------------------- | ------------------------------------------------------ | -------------------------------------- |
| `--mjo-message-background-color` | `var(--mjo-background-color-low, #ffffff)`             | Background color for message items     |
| `--mjo-message-box-shadow`       | `var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1))` | Box shadow for message items           |
| `--mjo-message-radius`           | `var(--mjo-radius-large, 4px)`                         | Border radius for message items        |
| `--mjo-message-margin-top`       | `15px`                                                 | Top margin for message items           |
| `--mjo-message-top`              | `0`                                                    | Top position for the message container |

### Theme Interface

```ts
interface MjoMessageTheme {
    backgroundColor?: string;
    boxShadow?: string;
    marginTop?: string;
    top?: string;
    radius?: string;
}
```

## Technical Notes

-   **Global Container**: Messages are rendered in a container appended to `document.body`
-   **Z-Index Management**: The container inherits z-index from the host component
-   **Queue Limit**: Maximum of 4 messages displayed simultaneously
-   **Auto-removal**: Messages automatically close after the specified time
-   **Animation**: Smooth slide-in and fade-out animations
-   **Theme Inheritance**: Message container inherits theme from the host component

## Accessibility

-   Messages include appropriate ARIA attributes for screen readers
-   Color-coded by type with distinct icons for each message type
-   Auto-dismissal prevents screen reader spam
-   Semantic color choices that work with high contrast modes

## Best Practices

-   Use appropriate message types to convey the correct urgency
-   Keep message text concise and actionable
-   Provide longer duration for important messages
-   Use callbacks for messages that require user acknowledgment
-   Place the `mjo-message` component at the application root level
-   Consider using context sharing for large applications

For additional theming options, see the [Theming Guide](./theming.md).
