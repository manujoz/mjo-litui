# mjo-notification

A notification system for displaying positioned toast notifications with controller architecture and comprehensive accessibility support.

## Overview

The `mjo-notification` component provides a powerful notification system for displaying positioned toast notifications. It uses a controller architecture that creates a global notification container in the document body, allowing notifications to appear in any corner of the screen regardless of parent element constraints like `overflow: hidden`.

The component includes comprehensive accessibility features, support for reduced motion preferences, and extensive theming capabilities.

## Basic Usage

```html
<mjo-notification position="top-right"></mjo-notification>
```

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoNotification } from "mjo-litui/types";
import "mjo-litui/mjo-notification";
import "mjo-litui/mjo-button";

@customElement("notification-example")
export class NotificationExample extends LitElement {
    @query("mjo-notification")
    private notification!: MjoNotification;

    private showNotification() {
        this.notification.controller.show({
            title: "Success",
            message: "Operation completed successfully!",
            type: "success",
            time: 4000,
        });
    }

    render() {
        return html`
            <mjo-button @click=${this.showNotification}>Show Notification</mjo-button>
            <mjo-notification position="top-right"></mjo-notification>
        `;
    }
}
```

## Notification Types

The component supports four notification types with distinct styling:

```ts
// Success notification
this.notification.controller.show({
    title: "Success",
    message: "Operation completed successfully!",
    type: "success",
    time: 4000,
});

// Error notification
this.notification.controller.show({
    title: "Error",
    message: "An error occurred during processing",
    type: "error",
    time: 5000,
});

// Warning notification
this.notification.controller.show({
    title: "Warning",
    message: "Please review this important warning",
    type: "warning",
    time: 6000,
});

// Info notification
this.notification.controller.show({
    title: "Information",
    message: "This is important information",
    type: "info",
    time: 4000,
});

// No icon notification
this.notification.controller.show({
    title: "Simple Notification",
    message: "This notification has no type, so no icon is displayed",
    time: 4000,
});
```

## Positioning

Configure notification positioning in any corner of the screen:

```ts
// Top positions
<mjo-notification position="top-right"></mjo-notification>
<mjo-notification position="top-left"></mjo-notification>

// Bottom positions
<mjo-notification position="bottom-right"></mjo-notification>
<mjo-notification position="bottom-left"></mjo-notification>
```

## Auto-Close and Callbacks

```ts
// Auto-close after 3 seconds
this.notification.controller.show({
    message: "Auto-close notification",
    time: 3000,
});

// Persistent notification (manual close only)
this.notification.controller.show({
    message: "Persistent notification",
    // No time property = stays until manually closed
});

// With close callback
this.notification.controller.show({
    message: "Notification with callback",
    time: 4000,
    onClose: () => {
        console.log("Notification was closed");
    },
});

// Programmatic control
const notification = await this.notification.controller.show({
    message: "Controlled notification",
});
// Close programmatically after 2 seconds
setTimeout(() => notification.close(), 2000);
```

## Rich Content

Notifications support HTML strings and Lit templates:

```ts
import { html } from "lit";

// HTML template content
this.notification.controller.show({
    title: "Rich Content",
    message: html`
        <div>
            <p>This notification contains <strong>rich HTML content</strong>.</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                <mjo-button size="small" @click=${this.handleAction}>Action</mjo-button>
                <mjo-button size="small" variant="ghost">Cancel</mjo-button>
            </div>
        </div>
    `,
    type: "info",
});
```

## Threshold Management

Control the maximum number of notifications displayed simultaneously:

```ts
// Set threshold (default is 4)
<mjo-notification position="top-right" threshold="3"></mjo-notification>

// Clear all notifications
this.notification.clearAll();
```

## Accessibility Features

The component includes comprehensive accessibility support:

```html
<!-- Accessibility configuration -->
<mjo-notification position="top-right" aria-live="polite" aria-label="System notifications" disable-animations="false"> </mjo-notification>
```

### Screen Reader Support

```ts
// Announce message to screen readers without visual notification
this.notification.announce("Important status update available");
```

### Motion Preferences

The component automatically respects `prefers-reduced-motion` settings, disabling animations for users who prefer reduced motion.

## Context Sharing

Share the notification controller across component hierarchies:

```ts
import { createContext } from "@lit/context";
import { NotificationController } from "mjo-litui/types";

// Create notification context
const notificationContext = createContext<NotificationController>("notification-controller");

@customElement("app-root")
export class AppRoot extends LitElement {
    @provide({ context: notificationContext })
    notificationController!: NotificationController;

    @query("mjo-notification")
    private notification!: MjoNotification;

    protected firstUpdated() {
        this.notificationController = this.notification.controller;
    }

    render() {
        return html`
            <app-content></app-content>
            <mjo-notification position="top-right"></mjo-notification>
        `;
    }
}

@customElement("app-content")
export class AppContent extends LitElement {
    @consume({ context: notificationContext })
    notificationController!: NotificationController;

    private showNotification() {
        this.notificationController.show({
            message: "Notification from child component",
            type: "success",
        });
    }

    render() {
        return html` <mjo-button @click=${this.showNotification}>Notify</mjo-button> `;
    }
}
```

## Theme Customization

### Using mjo-theme

```ts
import "mjo-litui/mjo-theme";

const notificationTheme = {
    backgroundColor: "#f8f9fa",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    radius: "12px",
    margin: "20px",
    titleFontSize: "1.1em",
    titleFontWeight: "600",
    titleColor: "#2c3e50",
    messageFontSize: "0.95em",
    messageColor: "#34495e",
    closeHoverBackgroundColor: "#e9ecef",
    animationDuration: "0.4s",
    focusOutline: "2px solid #007acc",
};

html`
    <mjo-theme .theme=${{ components: { mjoNotification: notificationTheme } }}>
        <mjo-notification position="top-right"></mjo-notification>
    </mjo-theme>
`;
```

### Using ThemeMixin

```ts
import { ThemeMixin } from "mjo-litui/mixins";

@customElement("themed-notification")
export class ThemedNotification extends ThemeMixin(LitElement) {
    render() {
        return html`
            <mjo-notification
                position="top-right"
                .theme=${{
                    backgroundColor: "#fff3cd",
                    boxShadow: "0 4px 20px rgba(255, 193, 7, 0.3)",
                    titleColor: "#856404",
                    messageColor: "#664d03",
                }}
            ></mjo-notification>
        `;
    }
}
```

## Properties

| Property            | Type                               | Default           | Description                                                                           |
| ------------------- | ---------------------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `position`          | `NotificationPositions`            | `"top-right"`     | Notification position: `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"` |
| `threshold`         | `number`                           | `4`               | Maximum number of notifications displayed simultaneously                              |
| `ariaLive`          | `"polite" \| "assertive" \| "off"` | `"polite"`        | ARIA live region politeness setting                                                   |
| `ariaLabel`         | `string`                           | `"Notifications"` | ARIA label for the notification region                                                |
| `disableAnimations` | `boolean`                          | `false`           | Disable all notification animations                                                   |

## Controller Methods

### `show(params: NotificationShowParams): Promise<NotificationItem>`

Shows a new notification and returns the notification item instance.

#### Parameters

| Parameter | Type                          | Default | Description                                                      |
| --------- | ----------------------------- | ------- | ---------------------------------------------------------------- |
| `message` | `string \| TemplateResult<1>` | -       | The notification message content                                 |
| `title`   | `string`                      | -       | Optional notification title                                      |
| `type`    | `NotificationTypes`           | -       | Notification type: `"info"`, `"success"`, `"warning"`, `"error"` |
| `time`    | `number`                      | `0`     | Auto-close time in milliseconds (0 = manual close only)          |
| `onClose` | `() => void`                  | -       | Callback function executed when notification closes              |

### `clearAll(): void`

Clears all notifications from the notification container.

### `setPosition(position: NotificationPositions): void`

Changes the position of the notification container.

## Component Methods

### `clearAll(): void`

Clears all notifications from the notification container.

### `announce(message: string): void`

Announces a message to screen readers without showing a visual notification.

## Types

```ts
type NotificationPositions = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type NotificationTypes = "info" | "warning" | "error" | "success";

interface NotificationShowParams {
    title?: string;
    message: string | TemplateResult<1>;
    type?: NotificationTypes;
    time?: number;
    onClose?: () => void;
}

interface NotificationAccessibilityOptions {
    ariaLive?: "polite" | "assertive" | "off";
    ariaLabel?: string;
    disableAnimations?: boolean;
    announceToScreenReader?: boolean;
}
```

## CSS Custom Properties

| Property                                          | Default                                                | Description                             |
| ------------------------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| `--mjo-notification-background-color`             | `var(--mjo-background-color-low, #ffffff)`             | Background color for notification items |
| `--mjo-notification-box-shadow`                   | `var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1))` | Box shadow for notification items       |
| `--mjo-notification-border-radius`                | `var(--mjo-radius-large, 4px)`                         | Border radius for notification items    |
| `--mjo-notification-margin`                       | `15px`                                                 | Margin between notification items       |
| `--mjo-notification-space-vertical`               | `0`                                                    | Vertical spacing from screen edge       |
| `--mjo-notification-space-horizontal`             | `15px`                                                 | Horizontal spacing from screen edge     |
| `--mjo-notification-title-font-size`              | `1em`                                                  | Font size for notification titles       |
| `--mjo-notification-title-font-weight`            | `500`                                                  | Font weight for notification titles     |
| `--mjo-notification-title-color`                  | -                                                      | Color for notification titles           |
| `--mjo-notification-message-font-size`            | `0.9em`                                                | Font size for notification messages     |
| `--mjo-notification-message-color`                | -                                                      | Color for notification messages         |
| `--mjo-notification-close-hover-background-color` | `var(--mjo-background-color-high, #f5f5f5)`            | Close button hover background color     |
| `--mjo-notification-animation-duration`           | `0.3s`                                                 | Duration of notification animations     |
| `--mjo-notification-focus-outline`                | `2px solid var(--mjo-primary-color, #007acc)`          | Focus outline for interactive elements  |

## CSS Parts

The notification component uses CSS parts to allow styling of internal elements. Since the notification container and items are mounted directly in the document body, CSS parts must be applied globally:

```css
/* Global styling for all notification containers */
mjo-notification-container::part(container) {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

/* Global styling for notification items */
mjoint-notification-item::part(notification-wrapper) {
    padding: 20px;
    border-radius: 8px;
}

mjoint-notification-item::part(notification-icon-container) {
    width: 40px;
    border-radius: 8px 0 0 8px;
}

mjoint-notification-item::part(notification-title) {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
}

mjoint-notification-item::part(notification-message) {
    line-height: 1.5;
    color: #34495e;
}

mjoint-notification-item::part(close-button) {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    transition: all 0.2s ease;
}

mjoint-notification-item::part(close-button):hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
}
```

### Available CSS Parts

| Part                          | Component                    | Description                              |
| ----------------------------- | ---------------------------- | ---------------------------------------- |
| `container`                   | `mjo-notification-container` | The main notification container          |
| `notification-icon-container` | `mjoint-notification-item`   | Container for the notification type icon |
| `notification-icon`           | `mjoint-notification-item`   | The notification type icon element       |
| `notification-wrapper`        | `mjoint-notification-item`   | Wrapper for the notification content     |
| `notification-title`          | `mjoint-notification-item`   | The notification title element           |
| `notification-message`        | `mjoint-notification-item`   | The notification message element         |
| `close-button`                | `mjoint-notification-item`   | The close button element                 |
| `icon-close`                  | `mjoint-notification-item`   | The close icon element                   |

### Important: Global Notification Architecture

The `mjo-notification` component works by dynamically creating notification containers and items that are mounted directly in the document `<body>`. This architecture provides several benefits:

- **Overlay Management**: Ensures notifications appear above all other content
- **Position Control**: Allows notifications in any corner regardless of parent constraints
- **Z-index Management**: Prevents z-index conflicts with parent containers
- **Overflow Prevention**: Bypasses any parent `overflow: hidden` styles

Because the actual notification content is rendered in containers mounted in the body, CSS variables and CSS parts cannot be applied directly to the `mjo-notification` component. Instead, you need to target the containers and items globally.

### Global Styling Best Practices

#### All Notifications

```css
/* Apply to all notification containers */
:root {
    --mjo-notification-space-horizontal: 20px;
    --mjo-notification-animation-duration: 0.4s;
}

/* Target all notification containers */
mjo-notification-container {
    --mjo-notification-background-color: #ffffff;
}

/* Target all notification items */
mjoint-notification-item {
    --mjo-notification-border-radius: 12px;
}
```

#### Type-Specific Styling

You can style notifications based on their type using attribute selectors:

```css
/* Success notifications */
mjoint-notification-item[type="success"]::part(notification-wrapper) {
    border-left: 4px solid var(--mjo-color-success);
}

/* Error notifications */
mjoint-notification-item[type="error"]::part(notification-wrapper) {
    border-left: 4px solid var(--mjo-color-error);
}

/* Warning notifications */
mjoint-notification-item[type="warning"]::part(notification-wrapper) {
    border-left: 4px solid var(--mjo-color-warning);
}

/* Info notifications */
mjoint-notification-item[type="info"]::part(notification-wrapper) {
    border-left: 4px solid var(--mjo-color-info);
}
```

#### Position-Specific Styling

Style notifications based on their position:

```css
/* Top notifications */
mjoint-notification-item[position*="top"]::part(notification-wrapper) {
    border-radius: 0 0 8px 8px;
}

/* Bottom notifications */
mjoint-notification-item[position*="bottom"]::part(notification-wrapper) {
    border-radius: 8px 8px 0 0;
}
```

### Theme Interface

```ts
interface MjoNotificationTheme {
    backgroundColor?: string;
    boxShadow?: string;
    radius?: string;
    margin?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    titleColor?: string;
    closeHoverBackgroundColor?: string;
    messageFontSize?: string;
    messageColor?: string;
    animationDuration?: string;
    focusOutline?: string;
    spaceVertical?: string;
    spaceHorizontal?: string;
}
```

## Accessibility

- **ARIA Support**: Proper ARIA attributes including `aria-live`, `aria-label`, and `role`
- **Screen Reader Friendly**: Notifications are announced to screen readers
- **Keyboard Navigation**: Close buttons are keyboard accessible
- **Focus Management**: Proper focus handling for interactive notifications
- **Motion Preferences**: Respects `prefers-reduced-motion` settings
- **High Contrast**: Support for high contrast themes
- **Color Independence**: Icons and text provide information beyond color

## Technical Notes

- **Global Container**: Notifications render in containers appended to `document.body`
- **Z-Index Management**: Container inherits z-index from host component
- **Queue Management**: Automatically manages notification threshold
- **Animation System**: Smooth animations with position-aware directions
- **Content Flexibility**: Supports HTML strings and Lit templates
- **Theme Inheritance**: Container inherits theme from host component

## Best Practices

- Use appropriate notification types to convey correct urgency levels
- Keep notification content concise and actionable
- Provide longer duration for important notifications
- Use callbacks for notifications requiring user acknowledgment
- Consider threshold limits to avoid overwhelming users
- Place notification components at appropriate application levels
- Use context sharing for large applications
- Test with screen readers and keyboard navigation

For additional theming options, see the [Theming Guide](./theming.md).
