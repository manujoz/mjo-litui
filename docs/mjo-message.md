# mjo-message

Global message controller component that displays temporary toast-like notifications with comprehensive accessibility support.

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

- Display temporary feedback messages for user actions
- Show form validation results
- Provide status updates for async operations
- Display system notifications and alerts
- Queue multiple messages with automatic management

## Import

```typescript
import "mjo-litui/mjo-message";
```

## Properties

| Property      | Type                               | Description                                         | Default                   | Required |
| ------------- | ---------------------------------- | --------------------------------------------------- | ------------------------- | -------- |
| `idMessage`   | `string`                           | Optional ID for the message container element       | `undefined`               | No       |
| `regionLabel` | `string`                           | Accessible label for the message region             | `"Message notifications"` | No       |
| `aria-live`   | `"polite" \| "assertive" \| "off"` | ARIA live region announcement behavior              | `"polite"`                | No       |
| `maxMessages` | `number`                           | Maximum number of messages displayed simultaneously | `4`                       | No       |

## Public Methods

The `mjo-message` component provides access to the controller's `show` method through the `controller` property.

### `controller.show(params: MessageShowParams): Promise<MjointMessageItem>`

Displays a new message and returns the message item instance for programmatic control.

#### Parameters

| Parameter | Type                                                | Description                                        | Default  | Required |
| --------- | --------------------------------------------------- | -------------------------------------------------- | -------- | -------- |
| `message` | `string`                                            | The message text to display                        | -        | Yes      |
| `type`    | `"info" \| "success" \| "warning" \| "error" \| ""` | Message type with corresponding icon and semantics | `"info"` | No       |
| `time`    | `number`                                            | Duration in milliseconds before auto-close         | `3000`   | No       |
| `onClose` | `() => void`                                        | Callback function executed when the message closes | -        | No       |

#### Returns

`Promise<MjointMessageItem>` - The message item instance allowing programmatic control (e.g., `messageItem.close()`)

## Events

The component does not emit custom events from `mjo-message` itself. The internal `mjoint-message-item` component dispatches a `remove` event when a message is removed, but this is an internal implementation detail.

## CSS Variables

| Variable                         | Description                             | Default                                                |
| -------------------------------- | --------------------------------------- | ------------------------------------------------------ |
| `--mjo-message-top`              | Top position of the message container   | `0`                                                    |
| `--mjo-message-background-color` | Background color of individual messages | `var(--mjo-background-color-low, #ffffff)`             |
| `--mjo-message-box-shadow`       | Box shadow applied to messages          | `var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1))` |
| `--mjo-message-border-radius`    | Border radius of message items          | `var(--mjo-radius-large, 4px)`                         |
| `--mjo-message-margin-top`       | Top margin for each message item        | `15px`                                                 |

## CSS Parts

| Part             | Description                                          | Element |
| ---------------- | ---------------------------------------------------- | ------- |
| `container`      | The main container element holding all message items | `<div>` |
| `icon-container` | Container for the message type icon                  | `<div>` |
| `icon`           | The icon element (exported from internal `mjo-icon`) | -       |
| `message`        | Container for the message text content               | `<div>` |

## Accessibility

### ARIA Support

- **Live Regions**: Uses ARIA live regions (`aria-live`) to announce messages to screen readers
    - `polite` (default): Announces when screen reader is idle
    - `assertive`: Interrupts current announcements for urgent messages
    - `off`: Disables announcements
- **Region Labeling**: Configurable `region-label` attribute for accessible region identification
- **Dynamic Roles**: Message items automatically use appropriate roles based on type:
    - `alert` role for error and warning messages with `aria-live="assertive"`
    - `status` role for info and success messages with `aria-live="polite"`
- **Atomic Announcements**: Uses `aria-atomic="true"` to ensure complete message content is announced

### Keyboard Navigation

- No direct keyboard interaction required (messages are informational)
- Messages auto-dismiss after specified duration
- Content within messages inherits standard keyboard behavior

### Message Type Semantics

| Type      | Icon             | Color                 | Semantic Meaning     |
| --------- | ---------------- | --------------------- | -------------------- |
| `info`    | Info Circle      | `--mjo-color-info`    | General information  |
| `success` | Check Circle     | `--mjo-color-success` | Successful operation |
| `warning` | Warning Triangle | `--mjo-color-warning` | Cautionary notice    |
| `error`   | Close Circle     | `--mjo-color-error`   | Error or failure     |

### Best Practices

- Use `assertive` for critical errors or urgent notifications
- Keep message text concise and actionable
- Use appropriate message types to convey semantic meaning
- Consider longer durations for important messages
- Provide callbacks for actions that should occur after message dismissal

## Usage Examples

### Basic Message Display

```html
<mjo-message id="myMessage"></mjo-message>
<mjo-button onclick="showMessage()">Show Message</mjo-button>

<script type="module">
    import "mjo-litui/mjo-message";
    import "mjo-litui/mjo-button";

    function showMessage() {
        const messageComponent = document.getElementById("myMessage");
        messageComponent.controller.show({
            message: "Operation completed successfully!",
            type: "success",
            time: 3000,
        });
    }

    window.showMessage = showMessage;
</script>
```

### Different Message Types

```html
<mjo-message id="messages"></mjo-message>

<mjo-button onclick="showInfo()">Info</mjo-button>
<mjo-button onclick="showSuccess()">Success</mjo-button>
<mjo-button onclick="showWarning()">Warning</mjo-button>
<mjo-button onclick="showError()">Error</mjo-button>

<script type="module">
    const messageComponent = document.getElementById("messages");

    window.showInfo = () => {
        messageComponent.controller.show({
            message: "This is an informational message",
            type: "info",
        });
    };

    window.showSuccess = () => {
        messageComponent.controller.show({
            message: "Operation completed successfully!",
            type: "success",
        });
    };

    window.showWarning = () => {
        messageComponent.controller.show({
            message: "Please review your settings",
            type: "warning",
        });
    };

    window.showError = () => {
        messageComponent.controller.show({
            message: "An error occurred",
            type: "error",
        });
    };
</script>
```

### Custom Duration

```html
<mjo-message id="customDuration"></mjo-message>

<script type="module">
    const messageComponent = document.getElementById("customDuration");

    // Quick message (1 second)
    messageComponent.controller.show({
        message: "Quick feedback",
        type: "info",
        time: 1000,
    });

    // Long message (10 seconds)
    messageComponent.controller.show({
        message: "Important information that needs more time",
        type: "warning",
        time: 10000,
    });
</script>
```

### Programmatic Control with Async Operations

```html
<mjo-message id="asyncMessage"></mjo-message>
<mjo-button onclick="processData()">Process Data</mjo-button>

<script type="module">
    const messageComponent = document.getElementById("asyncMessage");

    window.processData = async () => {
        // Show processing message
        const processingMsg = await messageComponent.controller.show({
            message: "Processing your request...",
            type: "info",
            time: 30000, // Long duration
        });

        try {
            // Simulate async operation
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Close processing message and show success
            processingMsg.close();
            messageComponent.controller.show({
                message: "Data processed successfully!",
                type: "success",
            });
        } catch (error) {
            // Close processing message and show error
            processingMsg.close();
            messageComponent.controller.show({
                message: "Failed to process data",
                type: "error",
            });
        }
    };
</script>
```

### Using Callbacks

```html
<mjo-message id="callbackMessage"></mjo-message>

<script type="module">
    const messageComponent = document.getElementById("callbackMessage");

    messageComponent.controller.show({
        message: "File uploaded successfully",
        type: "success",
        time: 3000,
        onClose: () => {
            console.log("Message closed, refreshing file list...");
            // Trigger additional actions after message closes
        },
    });
</script>
```

### Queue Management with Max Messages

```html
<mjo-message id="queuedMessages" max-messages="3"></mjo-message>
<mjo-button onclick="showMultiple()">Show Multiple Messages</mjo-button>

<script type="module">
    const messageComponent = document.getElementById("queuedMessages");

    window.showMultiple = () => {
        // Only 3 messages will be displayed at once
        // When the 4th message appears, the oldest will be automatically removed
        messageComponent.controller.show({
            message: "First message",
            type: "info",
            time: 5000,
        });

        setTimeout(() => {
            messageComponent.controller.show({
                message: "Second message",
                type: "success",
                time: 5000,
            });
        }, 500);

        setTimeout(() => {
            messageComponent.controller.show({
                message: "Third message",
                type: "warning",
                time: 5000,
            });
        }, 1000);

        setTimeout(() => {
            messageComponent.controller.show({
                message: "Fourth message (first will be removed)",
                type: "error",
                time: 5000,
            });
        }, 1500);
    };
</script>
```

### Accessibility Configuration

```html
<!-- Assertive announcements for urgent messages -->
<mjo-message id="urgentMessages" aria-live="assertive" region-label="Urgent notifications"></mjo-message>

<!-- Polite announcements for general updates -->
<mjo-message id="generalMessages" aria-live="polite" region-label="General notifications"></mjo-message>

<!-- Silent messages (not announced to screen readers) -->
<mjo-message id="silentMessages" aria-live="off" region-label="Visual notifications only"></mjo-message>
```

### Custom Styling with CSS Variables

```html
<style>
    .custom-messages {
        --mjo-message-top: 20px;
        --mjo-message-background-color: #f3e5f5;
        --mjo-message-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        --mjo-message-border-radius: 12px;
        --mjo-message-margin-top: 20px;
    }
</style>

<mjo-message id="styledMessages" class="custom-messages"></mjo-message>
```

### Styling with CSS Parts

```html
<style>
    mjo-message::part(container) {
        align-items: flex-end; /* Align messages to the right */
        padding: 0 20px;
    }

    mjo-message::part(icon-container) {
        font-size: 1.5em;
    }

    mjo-message::part(message) {
        font-weight: 500;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
</style>

<mjo-message id="customStyledMessages"></mjo-message>
```

### Form Integration

```html
<form id="userForm">
    <mjo-textfield label="Email" type="email" required></mjo-textfield>
    <mjo-textfield label="Password" type="password" required></mjo-textfield>
    <mjo-button type="submit">Submit</mjo-button>
</form>

<mjo-message id="formMessages"></mjo-message>

<script type="module">
    const form = document.getElementById("userForm");
    const messageComponent = document.getElementById("formMessages");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            messageComponent.controller.show({
                message: "Please fill in all required fields",
                type: "error",
                time: 5000,
            });
            return;
        }

        // Simulate form submission
        messageComponent.controller.show({
            message: "Form submitted successfully!",
            type: "success",
            time: 3000,
            onClose: () => {
                form.reset();
            },
        });
    });
</script>
```

## Additional Notes

### Controller Architecture

The component uses a controller pattern where:

- `mjo-message` is the host component that initializes the controller
- `MessageController` manages the lifecycle and message container creation
- `mjo-message-container` is dynamically created in the document body
- Individual messages are rendered as `mjoint-message-item` elements

This architecture allows messages to appear above all content regardless of parent element constraints (z-index, overflow, etc.).

### Message Container Placement

The message container is automatically appended to `document.body` when the component connects to the DOM and inherits the z-index from the host component. You can control positioning with the `--mjo-message-top` CSS variable.

### Message Queue Behavior

When `maxMessages` is reached:

1. The oldest message is automatically closed
2. The new message is added to the queue
3. Smooth animations ensure visual consistency

### Animation and Transitions

- Messages slide in with fade effect (500ms)
- Close animation includes opacity fade and margin collapse (520ms total)
- Respects `prefers-reduced-motion` user preferences through browser defaults

### Theme Integration

The component extends `ThemeMixin`, allowing theme customization through:

- Direct theme property on the component
- Parent `mjo-theme` component
- Global CSS variables

The theme is automatically propagated to the message container.

### Memory Management

The message container is automatically removed from the DOM when the host component disconnects, preventing memory leaks.

### Type Safety

For TypeScript projects, import types from the library:

```typescript
import type { MjoMessage, MessageTypes, MessageShowParams } from "mjo-litui/types";
```
