# mjo-drawer

Dynamic side panel component providing slide-out content areas with configurable positioning and comprehensive accessibility support.

## Index

1. [Use Cases](#use-cases)
2. [Import](#import)
3. [Properties](#properties)
4. [States](#states)
5. [Public Methods](#public-methods)
6. [Events](#events)
7. [CSS Variables](#css-variables)
8. [CSS Parts](#css-parts)
9. [Accessibility](#accessibility)
10. [Usage Examples](#usage-examples)
11. [Additional Notes](#additional-notes)

## Use Cases

The `mjo-drawer` component is designed for:

- Side navigation panels that slide in from any screen edge
- Form panels and detail views in responsive layouts
- Contextual content overlays with configurable dimensions
- Modal-like panels with backdrop and focus trapping
- Temporary panels for displaying additional information or controls
- Navigation menus on mobile devices

## Import

```typescript
import "mjo-litui/mjo-drawer";
```

## Properties

| Property                | Type      | Default     | Description                                                                        | Required |
| ----------------------- | --------- | ----------- | ---------------------------------------------------------------------------------- | -------- |
| `idDrawer`              | `string`  | `undefined` | ID for the drawer container element                                                | No       |
| `label`                 | `string`  | `undefined` | Accessible label for the drawer (used when no title is provided)                   | No       |
| `initialFocus`          | `string`  | `undefined` | CSS selector for the element to focus when drawer opens                            | No       |
| `disabledTrapFocus`     | `boolean` | `false`     | Disables focus trapping within the drawer                                          | No       |
| `disabledRestoreFocus`  | `boolean` | `false`     | Prevents restoring focus to the previously focused element when drawer closes      | No       |
| `disabledCloseOnEscape` | `boolean` | `false`     | Prevents closing the drawer when the Escape key is pressed                         | No       |
| `disableScrollLock`     | `boolean` | `false`     | Disables body scroll locking when the drawer is open                               | No       |
| `aria-labelledby`       | `string`  | `undefined` | ID of the element that labels the drawer (automatically set to title if provided)  | No       |
| `aria-describedby`      | `string`  | `undefined` | ID of the element that describes the drawer (automatically set to content element) | No       |

## States

No public states are exposed.

## Public Methods

The `mjo-drawer` component uses a controller-based API. All interactions are performed through the `controller` property:

| Method                   | Parameters         | Description                                    | Returns |
| ------------------------ | ------------------ | ---------------------------------------------- | ------- |
| `controller.show()`      | `DrawerShowParams` | Opens the drawer with the specified parameters | `void`  |
| `controller.close()`     | -                  | Closes the drawer                              | `void`  |
| `controller.setParent()` | `parent: Element`  | Sets a custom parent element for the drawer    | `void`  |

### DrawerShowParams Interface

```typescript
interface DrawerShowParams {
    content: string | TemplateResult<1>;
    title?: string;
    position?: "top" | "right" | "bottom" | "left";
    width?: string | number;
    height?: string | number;
    blocked?: boolean;
    animationDuration?: number;
    onOpen?: () => void;
    onClose?: () => void;
}
```

| Parameter           | Type                                     | Default   | Description                                                   |
| ------------------- | ---------------------------------------- | --------- | ------------------------------------------------------------- |
| `content`           | `string \| TemplateResult`               | -         | Content to display in the drawer (required)                   |
| `title`             | `string`                                 | `""`      | Title displayed at the top of the drawer                      |
| `position`          | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | Position of the drawer on the screen                          |
| `width`             | `string \| number`                       | -         | Width of the drawer (applies to left/right positions)         |
| `height`            | `string \| number`                       | -         | Height of the drawer (applies to top/bottom positions)        |
| `blocked`           | `boolean`                                | `false`   | Prevents closing via backdrop click, ESC key, or close button |
| `animationDuration` | `number`                                 | `200`     | Duration of open/close animations in milliseconds             |
| `onOpen`            | `() => void`                             | -         | Callback function executed when the drawer finishes opening   |
| `onClose`           | `() => void`                             | -         | Callback function executed when the drawer finishes closing   |

## Events

The `mjo-drawer` component does not emit custom events. Use the `onOpen` and `onClose` callbacks in the `show()` method parameters for event handling.

## CSS Variables

| Variable                                 | Description                              | Default                                               |
| ---------------------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| `--mjo-drawer-backdrop-background-color` | Background color of the backdrop overlay | `rgba(0, 0, 0, 0.5)`                                  |
| `--mjo-drawer-backdrop-filter`           | Backdrop filter effect                   | `blur(5px)`                                           |
| `--mjo-drawer-background-color`          | Background color of the drawer container | `var(--mjo-background-color, #fff)`                   |
| `--mjo-drawer-box-shadow`                | Box shadow of the drawer container       | `var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5))` |
| `--mjo-drawer-border-width`              | Border width of the drawer container     | `1px`                                                 |
| `--mjo-drawer-border-color`              | Border color of the drawer container     | `transparent`                                         |
| `--mjo-drawer-focus-outline-width`       | Width of the focus outline               | `2px`                                                 |
| `--mjo-drawer-focus-outline-color`       | Color of the focus outline               | `var(--mjo-theme-primary-color, #2563eb)`             |
| `--mjo-drawer-focus-outline-offset`      | Offset of the focus outline              | `-2px`                                                |
| `--mjo-drawer-width`                     | Default width for left/right drawers     | `500px`                                               |
| `--mjo-drawer-height`                    | Default height for top/bottom drawers    | `500px`                                               |
| `--mjo-drawer-title-border-color`        | Border color of the title section        | `var(--mjo-border-color, #ccc)`                       |
| `--mjo-drawer-close-icon-border-radius`  | Border radius of the close icon button   | `var(--mjo-radius-small, 3px)`                        |
| `--mjo-drawer-close-icon-color`          | Color of the close icon                  | `var(--mjo-foreground-color, currentColor)`           |

## CSS Parts

| Part             | Description                               | Element                        |
| ---------------- | ----------------------------------------- | ------------------------------ |
| `backdrop`       | The background overlay behind the drawer  | `div.background`               |
| `container`      | The main drawer container                 | `div.container`                |
| `title`          | The title section of the drawer           | `div.title`                    |
| `typography`     | The typography component within the title | `mjo-typography`               |
| `typography-tag` | The typography tag (exported part)        | `mjo-typography` inner element |
| `close-button`   | The close button in the title section     | `button.close`                 |
| `content`        | The main content area of the drawer       | `div.content`                  |

## Accessibility

The `mjo-drawer` component implements comprehensive accessibility features:

### ARIA Roles and Attributes

- **role="dialog"**: The drawer container has the `dialog` role to indicate it's a modal-like element
- **aria-modal="true"**: Indicates that the drawer is modal and requires user interaction
- **aria-labelledby**: Automatically set to the title element ID when a title is provided, or uses the `aria-labelledby` property
- **aria-describedby**: Automatically set to the content element ID, or uses the `aria-describedby` property
- **aria-label**: Used when no title is provided and no `aria-labelledby` is set (uses the `label` property)
- **aria-hidden="true"**: Applied to the backdrop to hide it from screen readers

### Focus Management

- **Focus Trapping**: When the drawer opens, focus is trapped within the drawer (can be disabled with `disabledTrapFocus`)
- **Initial Focus**: Focus can be directed to a specific element using the `initialFocus` property (CSS selector)
- **Focus Restoration**: When the drawer closes, focus is restored to the previously focused element (can be disabled with `disabledRestoreFocus`)
- **Inert Elements**: Elements outside the drawer are made inert to prevent interaction while the drawer is open

### Keyboard Interactions

| Key           | Action                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| `Escape`      | Closes the drawer (unless `blocked` or `disabledCloseOnEscape` is true) |
| `Tab`         | Moves focus to the next focusable element within the drawer             |
| `Shift + Tab` | Moves focus to the previous focusable element within the drawer         |

### Best Practices

- **Always provide a title or label**: Use the `title` parameter or the `label` property to ensure screen reader users understand the drawer's purpose
- **Use descriptive content**: Ensure the drawer content is clearly structured and accessible
- **Avoid nested drawers**: Don't open a drawer from within another drawer, as this can confuse users
- **Provide clear close mechanisms**: Unless the drawer is `blocked`, ensure users can close it via the close button, backdrop, or Escape key
- **Test with screen readers**: Verify that the drawer announcement and navigation work correctly with screen readers

### High Contrast Mode Support

The component includes specific styles for high contrast mode:

- Border becomes visible in high contrast mode to ensure the drawer is distinguishable

### Reduced Motion Support

The component respects the `prefers-reduced-motion` media query:

- Animations are disabled when the user prefers reduced motion

## Usage Examples

### Basic Usage

```typescript
import { LitElement, html } from "lit";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

class MyComponent extends LitElement {
    render() {
        return html`
            <mjo-drawer id="my-drawer"></mjo-drawer>
            <mjo-button @click=${this.openDrawer}>Open Drawer</mjo-button>
        `;
    }

    openDrawer() {
        const drawer = this.shadowRoot.getElementById("my-drawer");
        drawer.controller.show({
            title: "My Drawer",
            content: "This is the drawer content.",
        });
    }
}
```

### Drawer Positions

```typescript
// Right drawer (default)
drawer.controller.show({
    title: "Right Drawer",
    content: "Slides in from the right",
    position: "right",
    width: 400,
});

// Left drawer
drawer.controller.show({
    title: "Left Drawer",
    content: "Slides in from the left",
    position: "left",
    width: 350,
});

// Top drawer
drawer.controller.show({
    title: "Top Drawer",
    content: "Slides in from the top",
    position: "top",
    height: 300,
});

// Bottom drawer
drawer.controller.show({
    title: "Bottom Drawer",
    content: "Slides in from the bottom",
    position: "bottom",
    height: 250,
});
```

### Custom Content with HTML Templates

```typescript
import { html } from "lit";

const drawer = this.shadowRoot.getElementById("my-drawer");
drawer.controller.show({
    title: "Form Drawer",
    content: html`
        <div style="padding: 20px;">
            <mjo-form>
                <mjo-textfield label="Name" required></mjo-textfield>
                <mjo-textfield label="Email" type="email" required></mjo-textfield>
                <mjo-textarea label="Message" rows="4"></mjo-textarea>
                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                    <mjo-button variant="ghost" @click=${() => drawer.controller.close()}> Cancel </mjo-button>
                    <mjo-button color="primary">Submit</mjo-button>
                </div>
            </mjo-form>
        </div>
    `,
    position: "right",
    width: 450,
});
```

### Blocked Drawer

```typescript
// Drawer that cannot be closed by clicking outside or pressing ESC
drawer.controller.show({
    title: "Important Message",
    content: html`
        <div style="padding: 20px;">
            <p>This drawer requires your attention.</p>
            <mjo-button @click=${() => drawer.controller.close()}> I Understand </mjo-button>
        </div>
    `,
    blocked: true,
    position: "right",
    width: 400,
});
```

### Drawer with Callbacks

```typescript
drawer.controller.show({
    title: "Drawer with Events",
    content: "Content with event handling",
    onOpen: () => {
        console.log("Drawer opened");
        // Perform actions when drawer opens
    },
    onClose: () => {
        console.log("Drawer closed");
        // Clean up or save data when drawer closes
    },
});
```

### Custom Animation Duration

```typescript
// Slower animation
drawer.controller.show({
    title: "Slow Animation",
    content: "This drawer opens slowly",
    animationDuration: 500,
});

// Faster animation
drawer.controller.show({
    title: "Fast Animation",
    content: "This drawer opens quickly",
    animationDuration: 100,
});
```

### Accessibility Properties

```typescript
// Drawer with accessibility labels
const drawer = html`
    <mjo-drawer id="accessible-drawer" label="User Settings" initial-focus="#first-input" aria-describedby="drawer-description"></mjo-drawer>
`;

// When opened
drawer.controller.show({
    title: "Settings",
    content: html`
        <div>
            <p id="drawer-description">Configure your application settings.</p>
            <mjo-textfield id="first-input" label="Username"></mjo-textfield>
        </div>
    `,
});
```

### Programmatic Control

```typescript
class MyComponent extends LitElement {
    render() {
        return html`
            <mjo-drawer id="controlled-drawer"></mjo-drawer>
            <mjo-button @click=${this.openDrawer}>Open</mjo-button>
            <mjo-button @click=${this.closeDrawer}>Close</mjo-button>
        `;
    }

    openDrawer() {
        const drawer = this.shadowRoot.getElementById("controlled-drawer");
        drawer.controller.show({
            title: "Controlled Drawer",
            content: "This drawer can be controlled programmatically",
        });
    }

    closeDrawer() {
        const drawer = this.shadowRoot.getElementById("controlled-drawer");
        drawer.controller.close();
    }
}
```

### Custom Parent Element

```typescript
// By default, drawer is appended to document.body
// You can set a custom parent:
const drawer = this.shadowRoot.getElementById("my-drawer");
const customParent = document.getElementById("drawer-container");
drawer.controller.setParent(customParent);

drawer.controller.show({
    title: "Drawer in Custom Container",
    content: "This drawer is appended to a custom parent element",
});
```

### Styling with CSS Parts

```css
/* Style the backdrop */
mjo-drawer::part(backdrop) {
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
}

/* Style the container */
mjo-drawer::part(container) {
    background-color: #f5f5f5;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    border: 2px solid #333;
}

/* Style the title */
mjo-drawer::part(title) {
    background-color: #333;
    color: #fff;
    padding: 15px;
}

/* Style the close button */
mjo-drawer::part(close-button) {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

/* Style the content area */
mjo-drawer::part(content) {
    padding: 20px;
}
```

### Styling with CSS Variables

```css
/* Global drawer customization */
:root {
    --mjo-drawer-width: 600px;
    --mjo-drawer-height: 400px;
    --mjo-drawer-background-color: #fafafa;
    --mjo-drawer-backdrop-background-color: rgba(0, 0, 0, 0.7);
    --mjo-drawer-backdrop-filter: blur(8px);
    --mjo-drawer-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    --mjo-drawer-border-color: #ddd;
    --mjo-drawer-border-width: 2px;
    --mjo-drawer-title-border-color: #e0e0e0;
    --mjo-drawer-close-icon-color: #666;
    --mjo-drawer-close-icon-border-radius: 50%;
}

/* Drawer-specific customization */
#special-drawer {
    --mjo-drawer-width: 800px;
    --mjo-drawer-background-color: #fff;
    --mjo-drawer-focus-outline-color: #ff5722;
}
```

## Additional Notes

### Architecture

The `mjo-drawer` component uses a unique controller-based architecture:

1. **Invisible Host**: The `<mjo-drawer>` element itself is invisible (`display: none`) and serves only as a controller provider
2. **Dynamic Container**: When `show()` is called, a `<mjo-drawer-container>` element is dynamically created and appended to the specified parent (default: `document.body`)
3. **Controller API**: All interactions are performed through the `controller` property, which manages the lifecycle of the dynamically created container

This architecture enables proper z-index management and overlay behavior without affecting the document flow.

### Performance Considerations

- **Scroll Locking**: By default, the drawer locks body scrolling when open. Disable with `disableScrollLock` if needed
- **Animation Duration**: The default 200ms animation provides good performance. Longer durations may feel sluggish on slower devices
- **Content Complexity**: Complex HTML templates in `content` may affect rendering performance. Consider lazy loading heavy content

### Browser Support

- **Focus Trap**: Uses the Inert API for focus management, which is widely supported in modern browsers
- **Backdrop Filter**: The blur effect requires `backdrop-filter` support. Fallback styling is applied automatically
- **CSS Container Queries**: Not used, ensuring compatibility with older browsers

### Integration with Forms

When using forms inside drawers:

```typescript
drawer.controller.show({
    title: "Form Submission",
    content: html`
        <mjo-form @submit=${this.handleSubmit}>
            <mjo-textfield label="Name" required></mjo-textfield>
            <mjo-button type="submit">Submit</mjo-button>
        </mjo-form>
    `,
    onClose: () => {
        // Handle form cleanup if needed
    },
});
```

### Multiple Drawers

You can have multiple drawer instances, but only open one at a time:

```typescript
// Multiple drawer elements
html`
    <mjo-drawer id="drawer-1"></mjo-drawer>
    <mjo-drawer id="drawer-2"></mjo-drawer>
    <mjo-drawer id="drawer-3"></mjo-drawer>
`;

// Opening different drawers
drawer1.controller.show({ title: "Drawer 1", content: "..." });
drawer2.controller.show({ title: "Drawer 2", content: "..." });
```

**Note**: Opening multiple drawers simultaneously is not recommended as it can confuse users and cause accessibility issues.

### Theme Integration

The drawer respects the global theme through the `ThemeMixin`:

```typescript
// Drawer automatically inherits theme from parent
html`<mjo-drawer id="themed-drawer"></mjo-drawer>`;

// Theme properties are transferred to the dynamically created container
drawer.controller.show({
    title: "Themed Drawer",
    content: "This drawer uses the current theme",
});
```
