# mjo-modal

Controller-based modal dialog component for displaying overlay content with comprehensive accessibility support.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Public Methods](#public-methods)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Display confirmation dialogs requiring user action
- Show detailed information in an overlay without navigating away
- Present forms or complex interactions in a focused context
- Create custom alert or notification systems with controlled timing
- Implement modal workflows with programmatic control

## Import

```typescript
import "mjo-litui/mjo-modal";
```

## Properties

| Property                | Type            | Description                                                                 | Default     | Required |
| ----------------------- | --------------- | --------------------------------------------------------------------------- | ----------- | -------- |
| `idModal`               | `string`        | Unique identifier for the modal container                                   | `undefined` | No       |
| `label`                 | `string`        | Accessible label for the modal                                              | `undefined` | No       |
| `initialFocus`          | `string`        | CSS selector for element to focus when modal opens                          | `undefined` | No       |
| `disabledTrapFocus`     | `boolean`       | Disables focus trapping within the modal                                    | `false`     | No       |
| `disabledRestoreFocus`  | `boolean`       | Prevents focus restoration when modal closes                                | `false`     | No       |
| `disabledCloseOnEscape` | `boolean`       | Prevents closing the modal with Escape key                                  | `false`     | No       |
| `disableScrollLock`     | `boolean`       | Disables body scroll locking when modal is open                             | `false`     | No       |
| `aria-labelledby`       | `string`        | ID of element that labels the modal                                         | `undefined` | No       |
| `aria-describedby`      | `string`        | ID of element that describes the modal                                      | `undefined` | No       |
| `open`                  | `boolean`       | Legacy property for backward compatibility (use controller methods instead) | `false`     | No       |
| `theme`                 | `MjoModalTheme` | Theme customization object                                                  | `undefined` | No       |

## Public Methods

The modal is controlled through its `controller` property, which provides the following methods:

| Method  | Parameters        | Description                                  | Return Value |
| ------- | ----------------- | -------------------------------------------- | ------------ |
| `show`  | `ModalShowParams` | Opens the modal with specified configuration | `void`       |
| `close` | -                 | Closes the modal programmatically            | `void`       |

### ModalShowParams Interface

```typescript
interface ModalShowParams {
    title?: string; // Modal title text
    content: string | TemplateResult<1>; // Content to display (HTML string or Lit template)
    time?: number; // Auto-close timeout in milliseconds
    width?: string | number; // Custom width (pixels or CSS string)
    animationDuration?: number; // Animation duration in milliseconds
    blocked?: boolean; // Prevents user from closing the modal
    closePosition?: "out" | "in"; // Close icon position (outside or inside modal)
    onClose?: () => void; // Callback executed when modal closes
}
```

## CSS Variables

| Variable                                        | Description                       | Default                                              |
| ----------------------------------------------- | --------------------------------- | ---------------------------------------------------- |
| `--mjo-modal-background-color`                  | Modal background color            | `--mjo-background-color` or `#fff`                   |
| `--mjo-modal-backdrop-background-color`         | Backdrop overlay color            | `rgba(0, 0, 0, 0.5)`                                 |
| `--mjo-modal-backdrop-filter`                   | Backdrop filter effect            | `blur(5px)`                                          |
| `--mjo-modal-box-shadow`                        | Modal box shadow                  | `--mjo-box-shadow3` or `0 0 10px rgba(0, 0, 0, 0.5)` |
| `--mjo-modal-border-radius`                     | Modal border radius               | `--mjo-border-radius` or `5px`                       |
| `--mjo-modal-width`                             | Modal default width               | `450px`                                              |
| `--mjo-modal-icon-close-size`                   | Close icon size                   | `30px` (out), `16px` (in)                            |
| `--mjo-modal-icon-close-offset`                 | Close icon position offset        | `5px`                                                |
| `--mjo-modal-icon-close-background-color-hover` | Close icon hover background color | `rgba(0, 0, 0, 0.5)`                                 |
| `--mjo-modal-title-border-color`                | Title border color                | `--mjo-border-color` or `#ccc`                       |

## CSS Parts

| Part                   | Description                                    | Element                     |
| ---------------------- | ---------------------------------------------- | --------------------------- |
| `backdrop`             | The modal backdrop/overlay                     | `div.background`            |
| `container`            | The main modal container                       | `div.container`             |
| `title`                | The modal title element                        | `mjo-typography`            |
| `title-tag`            | The typography element used for the title      | Internal typography element |
| `content`              | The modal content area                         | `div.content`               |
| `icon-close-container` | Container for the internal close icon          | `div.closeIn`               |
| `icon-close-out`       | External close icon (positioned outside modal) | `mjo-icon`                  |
| `icon-close-in`        | Internal close icon (positioned inside modal)  | `mjo-icon`                  |

## Accessibility

The modal component implements comprehensive accessibility features:

### ARIA Support

- Modal uses `role="dialog"` and `aria-modal="true"` on the container
- Supports `aria-labelledby` and `aria-describedby` for semantic labeling
- Provides fallback `aria-label` from `label` or `title` properties
- Close icons include `aria-label="Close modal"` for screen readers

### Focus Management

- Implements automatic focus trapping to keep focus within the modal
- Configurable initial focus via `initialFocus` property (CSS selector)
- Restores focus to triggering element when modal closes (can be disabled)
- Focus trap can be disabled with `disabledTrapFocus` property

### Keyboard Interaction

- **Escape**: Closes the modal (can be disabled with `disabledCloseOnEscape`)
- **Enter/Space**: Activates close icons when focused
- **Tab**: Cycles through focusable elements within the modal (when focus trap is enabled)

### Best Practices

- Always provide either `aria-labelledby`, `aria-describedby`, or `label` for screen readers
- Use `blocked` mode sparingly and only when user action is required
- Provide clear visual indicators for required actions in blocked modals
- Consider `time` property for non-critical notifications
- Test keyboard navigation in complex modal content

## Usage Examples

### Basic Modal with Controller

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("my-component")
class MyComponent extends LitElement {
    @query("mjo-modal") modal!: MjoModal;

    render() {
        return html`
            <mjo-modal label="Information Dialog"></mjo-modal>
            <mjo-button @click=${this.openModal}>Open Modal</mjo-button>
        `;
    }

    openModal() {
        this.modal.controller.show({
            title: "Welcome",
            content: "This is a simple modal dialog.",
        });
    }
}
```

### Modal with Lit Template Content

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("my-component")
class MyComponent extends LitElement {
    @query("mjo-modal") modal!: MjoModal;

    render() {
        return html`
            <mjo-modal aria-labelledby="modal-title"></mjo-modal>
            <mjo-button @click=${this.openModal}>Show Details</mjo-button>
        `;
    }

    openModal() {
        this.modal.controller.show({
            title: "User Details",
            content: html`
                <div style="padding: 20px;">
                    <p id="modal-title"><strong>Name:</strong> John Doe</p>
                    <p><strong>Email:</strong> john@example.com</p>
                    <mjo-button @click=${() => this.modal.controller.close()}> Close </mjo-button>
                </div>
            `,
            width: 600,
        });
    }
}
```

### Auto-Closing Notification Modal

```typescript
openNotification() {
    this.modal.controller.show({
        title: 'Success',
        content: 'Your changes have been saved successfully.',
        time: 3000, // Auto-close after 3 seconds
        closePosition: 'out',
        animationDuration: 300
    });
}
```

### Blocked Modal with Callback

```typescript
openConfirmation() {
    this.modal.controller.show({
        title: 'Confirm Action',
        content: html`
            <div style="padding: 20px;">
                <p>Are you sure you want to delete this item?</p>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <mjo-button @click=${this.handleConfirm}>Confirm</mjo-button>
                    <mjo-button @click=${() => this.modal.controller.close()}>
                        Cancel
                    </mjo-button>
                </div>
            </div>
        `,
        blocked: true, // Prevents closing with backdrop or Escape
        closePosition: 'in',
        onClose: () => {
            console.log('Modal closed');
        }
    });
}

handleConfirm() {
    // Perform deletion
    this.modal.controller.close();
}
```

### Modal with Focus Management

```typescript
@customElement("my-form-modal")
class MyFormModal extends LitElement {
    @query("mjo-modal") modal!: MjoModal;

    render() {
        return html`
            <mjo-modal label="Edit Form" initialFocus="#first-input" .disabledRestoreFocus=${false}></mjo-modal>
            <mjo-button @click=${this.openForm}>Edit</mjo-button>
        `;
    }

    openForm() {
        this.modal.controller.show({
            title: "Edit Information",
            content: html`
                <form style="padding: 20px;">
                    <mjo-textfield id="first-input" label="Name" required></mjo-textfield>
                    <mjo-textfield label="Email" type="email" required></mjo-textfield>
                    <mjo-button type="submit">Save</mjo-button>
                </form>
            `,
            width: 500,
        });
    }
}
```

### Styling with CSS Parts and Variables

```css
/* Customize modal appearance */
mjo-modal {
    --mjo-modal-background-color: #f5f5f5;
    --mjo-modal-backdrop-background-color: rgba(0, 0, 0, 0.7);
    --mjo-modal-backdrop-filter: blur(10px);
    --mjo-modal-border-radius: 12px;
    --mjo-modal-box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    --mjo-modal-width: 800px;
}

/* Style specific parts */
mjo-modal::part(backdrop) {
    backdrop-filter: blur(8px) brightness(0.8);
}

mjo-modal::part(container) {
    border: 2px solid var(--primary-color);
}

mjo-modal::part(title) {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    margin: 0;
}

mjo-modal::part(content) {
    padding: 30px;
    font-size: 16px;
}

mjo-modal::part(icon-close-in) {
    color: #666;
}
```

### Theme Configuration

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-modal";

@customElement("themed-modal")
class ThemedModal extends LitElement {
    render() {
        return html`
            <mjo-modal
                .theme=${{
                    backgroundColor: "#ffffff",
                    radius: "16px",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    width: "700px",
                    iconCloseSize: "24px",
                    titleBorderColor: "#e0e0e0",
                }}
            ></mjo-modal>
        `;
    }
}
```

## Additional Notes

### Architecture

The modal uses a controller-based architecture where:

1. The `mjo-modal` component serves as the API surface and configuration container
2. A `ModalController` manages the lifecycle and creates the internal container
3. The `mjo-modal-container` is mounted directly to `document.body` for proper overlay rendering
4. This architecture ensures proper z-index stacking and avoids parent container constraints

### State Management

- The modal container manages its own internal state for animation and visibility
- The `open` property on `mjo-modal` is legacy and should not be used directly
- Always use the controller's `show()` and `close()` methods for programmatic control

### Scroll Lock

- Body scroll is automatically locked when the modal opens (unless `disableScrollLock` is true)
- The scroll lock calculates the scrollbar width and adjusts body padding to prevent layout shift
- Scroll lock is automatically removed when the modal closes

### Animation

- Default animation duration is 200ms
- Custom duration can be set per modal instance via `animationDuration` parameter
- Animations use the Web Animations API for smooth performance
- Modal scales and fades in/out with backdrop transition

### Performance Considerations

- The modal container is created once during component connection and reused
- Content is rendered on-demand when `show()` is called
- Focus trap uses the native Inert API for optimal performance
- The container is removed from DOM when the component disconnects
