# mjo-notification

A notification system for displaying positioned toast notifications with controller architecture and comprehensive accessibility support.

The notification system renders in a container that is mounted directly in the document body, providing proper overlay management and positioning control. It manages the lifecycle of notifications, handles animations, supports screen reader announcements, and respects user motion preferences.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Display success, error, warning, or informational toast notifications
- Show temporary status updates or feedback to users
- Present non-blocking alerts that auto-dismiss after a configured time
- Stack multiple notifications with automatic threshold management
- Provide accessible notifications that work with screen readers
- Support different positioning strategies (top-left, top-right, bottom-left, bottom-right)

## Import

```typescript
import "mjo-litui/mjo-notification";
```

## Properties

| Property            | Type                               | Description                                                                                             | Default           | Required |
| ------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------- | -------- |
| `idNotification`    | `string`                           | Unique identifier for the notification container                                                        | `undefined`       | No       |
| `position`          | `NotificationPositions`            | Position of the notification container (`"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`) | `"top-right"`     | No       |
| `threshold`         | `number`                           | Maximum number of notifications to display simultaneously                                               | `4`               | No       |
| `ariaLive`          | `"polite" \| "assertive" \| "off"` | ARIA live region politeness setting                                                                     | `"polite"`        | No       |
| `ariaLabel`         | `string`                           | ARIA label for the notification region                                                                  | `"Notifications"` | No       |
| `disableAnimations` | `boolean`                          | Disable notification animations                                                                         | `false`           | No       |

## Methods

| Method       | Parameters                       | Description                                                              | Return Value                      |
| ------------ | -------------------------------- | ------------------------------------------------------------------------ | --------------------------------- |
| `show()`     | `params: NotificationShowParams` | Display a new notification with specified configuration                  | `Promise<MjointNotificationItem>` |
| `clearAll()` | -                                | Clear all visible notifications from the container                       | `void`                            |
| `announce()` | `message: string`                | Announce a message to screen readers without showing visual notification | `void`                            |

### NotificationShowParams Interface

```typescript
interface NotificationShowParams {
    title?: string;
    message: string | TemplateResult<1>;
    type?: "info" | "warning" | "error" | "success";
    time?: number;
    onClose?: () => void;
}
```

## CSS Variables

| Variable                                          | Description                             | Default                                                |
| ------------------------------------------------- | --------------------------------------- | ------------------------------------------------------ |
| `--mjo-notification-background-color`             | Background color for notification items | `var(--mjo-background-color-low, #ffffff)`             |
| `--mjo-notification-box-shadow`                   | Box shadow for notification items       | `var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1))` |
| `--mjo-notification-border-radius`                | Border radius for notification items    | `var(--mjo-radius-large, 4px)`                         |
| `--mjo-notification-margin`                       | Margin between notification items       | `15px`                                                 |
| `--mjo-notification-space-vertical`               | Vertical spacing from screen edge       | `0`                                                    |
| `--mjo-notification-space-horizontal`             | Horizontal spacing from screen edge     | `15px`                                                 |
| `--mjo-notification-title-font-size`              | Font size for notification titles       | `1em`                                                  |
| `--mjo-notification-title-font-weight`            | Font weight for notification titles     | `500`                                                  |
| `--mjo-notification-title-color`                  | Color for notification titles           | -                                                      |
| `--mjo-notification-message-font-size`            | Font size for notification messages     | `0.9em`                                                |
| `--mjo-notification-message-color`                | Color for notification messages         | -                                                      |
| `--mjo-notification-close-hover-background-color` | Close button hover background color     | `var(--mjo-background-color-high, #f5f5f5)`            |
| `--mjo-notification-animation-duration`           | Duration of notification animations     | `0.3s`                                                 |
| `--mjo-notification-focus-outline`                | Focus outline for interactive elements  | `2px solid var(--mjo-primary-color, #007acc)`          |

## CSS Parts

| Part                          | Description                                              | Element      |
| ----------------------------- | -------------------------------------------------------- | ------------ |
| `container`                   | The main notification container mounted in document body | `<div>`      |
| `notification-icon-container` | Container for the notification type icon                 | `<div>`      |
| `notification-icon`           | The notification type icon element                       | `<mjo-icon>` |
| `notification-wrapper`        | Wrapper for the notification content                     | `<div>`      |
| `notification-title`          | The notification title element                           | `<div>`      |
| `notification-message`        | The notification message element                         | `<div>`      |
| `close-button`                | The close button element                                 | `<div>`      |
| `icon-close`                  | The close icon element                                   | `<mjo-icon>` |

## Accessibility

The notification system is built with comprehensive accessibility support:

### ARIA Attributes

- The notification container has `role="region"` to indicate a significant section of content
- Uses `aria-live` attribute to control screen reader announcement behavior:
    - `"polite"` (default): Announces notifications when screen reader is idle
    - `"assertive"`: Interrupts screen reader immediately
    - `"off"`: Disables live region announcements
- Uses `aria-label` to provide descriptive label for the notification region
- Individual notification items have `role="alert"` for their message content
- Uses `aria-describedby` to associate titles with message content when present

### Keyboard Support

- Close button is keyboard accessible with `tabindex="0"`
- Close button can be activated with Enter/Space keys through native button behavior
- Close button has `aria-label` and `title` attributes for clear purpose indication
- Focus indicator respects `--mjo-notification-focus-outline` CSS variable

### Motion and Animation

- Respects `prefers-reduced-motion` media query
- When reduced motion is preferred, notifications appear instantly without animations
- All animations can be disabled programmatically via `disableAnimations` property

### Screen Reader Support

- The `announce()` method allows programmatic announcements without visual notifications
- Each notification generates a unique ID for proper ARIA relationships
- Type indicators (success, error, warning, info) are marked with `aria-hidden="true"` as they're decorative

### Best Practices

- Use `ariaLive="polite"` for non-critical notifications to avoid interrupting users
- Use `ariaLive="assertive"` for critical errors that require immediate attention
- Provide meaningful titles and messages that work well when read aloud
- Consider using the `announce()` method for status updates that don't need visual persistence
- Set appropriate `time` values to allow users enough time to perceive and read notifications

## Usage Examples

### Basic Usage with Controller

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-notification";
import type { MjoNotification } from "mjo-litui/mjo-notification";

@customElement("my-component")
class MyComponent extends LitElement {
    @query("mjo-notification") notificationSystem!: MjoNotification;

    render() {
        return html`
            <mjo-notification position="top-right"></mjo-notification>
            <button @click=${this.showNotification}>Show Notification</button>
        `;
    }

    async showNotification() {
        await this.notificationSystem.controller.show({
            message: "Operation completed successfully",
            type: "success",
            time: 3000,
        });
    }
}
```

### Notifications with Title and Custom Duration

```typescript
async showDetailedNotification() {
    await this.notificationSystem.controller.show({
        title: 'Upload Complete',
        message: 'Your file has been uploaded and processed successfully.',
        type: 'success',
        time: 5000
    });
}
```

### Different Notification Types

```typescript
async showDifferentTypes() {
    // Success notification
    await this.notificationSystem.controller.show({
        message: 'Changes saved successfully',
        type: 'success',
        time: 3000
    });

    // Error notification
    await this.notificationSystem.controller.show({
        title: 'Error',
        message: 'Failed to connect to server',
        type: 'error',
        time: 5000
    });

    // Warning notification
    await this.notificationSystem.controller.show({
        message: 'Your session will expire in 5 minutes',
        type: 'warning',
        time: 4000
    });

    // Info notification
    await this.notificationSystem.controller.show({
        message: 'New features are available',
        type: 'info',
        time: 4000
    });
}
```

### Handling Close Events

```typescript
async showWithCloseCallback() {
    await this.notificationSystem.controller.show({
        message: 'Processing your request...',
        type: 'info',
        time: 3000,
        onClose: () => {
            console.log('Notification was closed');
            // Perform cleanup or trigger next action
        }
    });
}
```

### Using Template Result for Rich Content

```typescript
import { html } from 'lit';

async showRichNotification() {
    await this.notificationSystem.controller.show({
        title: 'Update Available',
        message: html`
            <div>
                <p>Version 2.0 is now available.</p>
                <a href="/updates">View release notes</a>
            </div>
        `,
        type: 'info',
        time: 6000
    });
}
```

### Different Positioning Strategies

```typescript
render() {
    return html`
        <!-- Top right (default) -->
        <mjo-notification position="top-right"></mjo-notification>

        <!-- Top left -->
        <mjo-notification position="top-left"></mjo-notification>

        <!-- Bottom right -->
        <mjo-notification position="bottom-right"></mjo-notification>

        <!-- Bottom left -->
        <mjo-notification position="bottom-left"></mjo-notification>
    `;
}
```

### Managing Multiple Notifications

```typescript
async showMultipleNotifications() {
    // Show several notifications in sequence
    for (let i = 1; i <= 5; i++) {
        await this.notificationSystem.controller.show({
            message: `Notification ${i}`,
            type: 'info',
            time: 3000
        });
    }

    // The threshold property (default: 4) will automatically
    // remove the oldest notification when exceeded
}
```

### Clearing All Notifications

```typescript
async handleClearAll() {
    this.notificationSystem.clearAll();
}
```

### Screen Reader Announcements

```typescript
async announceStatusChange() {
    // Visual notification
    await this.notificationSystem.controller.show({
        message: 'Processing complete',
        type: 'success',
        time: 3000
    });

    // Additional screen reader announcement without visual
    this.notificationSystem.announce('All items have been processed successfully');
}
```

### Accessibility Configuration

```typescript
render() {
    return html`
        <!-- Assertive for critical errors -->
        <mjo-notification
            position="top-right"
            aria-live="assertive"
            aria-label="Critical notifications"
        ></mjo-notification>

        <!-- Disable animations for reduced motion preference -->
        <mjo-notification
            position="bottom-right"
            disable-animations
        ></mjo-notification>
    `;
}
```

### Custom Styling with CSS Variables

```typescript
render() {
    return html`
        <style>
            mjo-notification {
                --mjo-notification-background-color: #1a1a1a;
                --mjo-notification-title-color: #ffffff;
                --mjo-notification-message-color: #cccccc;
                --mjo-notification-space-vertical: 20px;
                --mjo-notification-space-horizontal: 20px;
                --mjo-notification-animation-duration: 0.5s;
            }
        </style>
        <mjo-notification position="top-right"></mjo-notification>
    `;
}
```

### Custom Styling with CSS Parts

```typescript
render() {
    return html`
        <style>
            mjo-notification::part(notification-wrapper) {
                padding: 15px;
                border-left: 4px solid var(--mjo-primary-color);
            }

            mjo-notification::part(notification-title) {
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            mjo-notification::part(close-button) {
                color: var(--mjo-error-color);
            }

            mjo-notification::part(notification-icon-container) {
                border-radius: 50%;
            }
        </style>
        <mjo-notification position="top-right"></mjo-notification>
    `;
}
```

## Additional Notes

### Architecture

The notification system uses a controller-based architecture where:

- `mjo-notification` component manages the configuration and serves as the public API
- `NotificationController` handles the lifecycle and communication with the container
- `mjo-notification-container` manages the rendering and positioning of notifications
- `mjoint-notification-item` represents individual notification instances

### Container Management

The notification container is automatically created and mounted to the document body when the component connects. It's removed when the component disconnects, ensuring proper cleanup.

### Threshold Behavior

When the number of notifications exceeds the `threshold` property:

- The oldest notification is automatically removed
- For top-positioned notifications, the first notification is removed
- For bottom-positioned notifications, the last notification is removed

### Animation Timing

Notifications animate in three stages:

1. Initial appearance (slide in from side)
2. Position adjustment
3. Final translation to position

Each stage is timed to create smooth, sequential animations. The total animation duration can be controlled via the `--mjo-notification-animation-duration` CSS variable.

### z-index Management

The notification container inherits the z-index from the `mjo-notification` component, allowing you to control the stacking context relative to other elements in your application.

### Theme Support

The component extends `ThemeMixin`, allowing it to participate in the theming system. Theme properties set on the component are automatically propagated to the notification container.
