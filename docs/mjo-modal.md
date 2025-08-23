# mjo-modal

A modal dialog component with controller architecture for displaying overlay content with full accessibility support.

## Overview

The `mjo-modal` component provides a powerful modal system for displaying overlay content. It uses a controller architecture that creates a global modal container in the document body, allowing modals to appear above any content regardless of parent element constraints like `overflow: hidden`.

The component includes comprehensive accessibility features including focus trapping, keyboard navigation, ARIA support, and screen reader compatibility.

## Accessibility Features

-   **Focus Management**: Automatic focus trapping within the modal with configurable initial focus
-   **Keyboard Navigation**: ESC key to close, Tab navigation within modal content
-   **ARIA Support**: Proper dialog role, aria-modal, aria-labelledby, and aria-describedby attributes
-   **Screen Reader**: Announces modal opening and provides accessible labels
-   **Body Scroll**: Prevents background scrolling when modal is open (configurable)
-   **Focus Restoration**: Returns focus to the triggering element when closed

## Basic Usage

### HTML

```html
<mjo-modal></mjo-modal>
```

### Simple Modal Display

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-basic")
export class ExampleModalBasic extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private openSimpleModal() {
        this.modalComponent.controller.show({
            title: "Welcome",
            content: html`
                <div style="padding: 1rem;">
                    <p>This is a simple modal with basic content.</p>
                    <p>You can close it by clicking the X button or clicking outside.</p>
                </div>
            `,
        });
    }

    private openHtmlModal() {
        this.modalComponent.controller.show({
            title: "HTML Content",
            content: `
        <div style="padding: 1rem;">
          <h4>Rich HTML Content</h4>
          <p>This modal contains <strong>HTML string content</strong> with styling.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </div>
      `,
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem;">
                <mjo-button @click=${this.openSimpleModal}> Open Simple Modal </mjo-button>
                <mjo-button @click=${this.openHtmlModal}> Open HTML Modal </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Accessibility Configuration

Configure modal accessibility features for optimal screen reader and keyboard support:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-accessibility")
export class ExampleModalAccessibility extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private openAccessibleModal() {
        this.modalComponent.controller.show({
            title: "Confirm Action",
            content: html`
                <div style="padding: 1.5rem;">
                    <h3 id="modal-title">Confirm Action</h3>
                    <p id="modal-description">Are you sure you want to delete this item? This action cannot be undone.</p>
                    <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                        <mjo-button variant="ghost" @click=${() => this.modalComponent.controller.close()}> Cancel </mjo-button>
                        <mjo-button id="confirm-button" variant="danger"> Delete </mjo-button>
                    </div>
                </div>
            `,
        });
    }

    render() {
        return html`
            <mjo-button @click=${this.openAccessibleModal}> Open Accessible Modal </mjo-button>

            <!-- Configure accessibility options -->
            <mjo-modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                initial-focus="#confirm-button"
                trap-focus
                restore-focus
                close-on-escape
                prevent-body-scroll
            >
            </mjo-modal>
        `;
    }
}
```

## Modal Sizes and Positioning

Configure modal dimensions and close button positioning:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-card";

@customElement("example-modal-sizes")
export class ExampleModalSizes extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private openSmallModal() {
        this.modalComponent.controller.show({
            title: "Small Modal",
            width: 300,
            content: html`
                <div style="padding: 1rem;">
                    <p>This is a small modal (300px width).</p>
                </div>
            `,
        });
    }

    private openLargeModal() {
        this.modalComponent.controller.show({
            title: "Large Modal",
            width: "80vw",
            content: html`
                <div style="padding: 2rem;">
                    <p>This is a large modal (80% viewport width).</p>
                    <p>It automatically adapts to the content size and viewport.</p>
                </div>
            `,
        });
    }

    private openOutsideCloseModal() {
        this.modalComponent.controller.show({
            title: "Outside Close Button",
            closePosition: "out",
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal has the close button positioned outside the modal container.</p>
                    <p>Notice the white X button in the top-right corner.</p>
                </div>
            `,
        });
    }

    private openInsideCloseModal() {
        this.modalComponent.controller.show({
            title: "Inside Close Button",
            closePosition: "in",
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal has the close button inside the modal container.</p>
                    <p>The close button is smaller and positioned within the modal.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <mjo-button @click=${this.openSmallModal}> Small Modal </mjo-button>
                <mjo-button @click=${this.openLargeModal}> Large Modal </mjo-button>
                <mjo-button @click=${this.openOutsideCloseModal}> Outside Close </mjo-button>
                <mjo-button @click=${this.openInsideCloseModal}> Inside Close </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Auto-Close and Blocking

Configure automatic closing and modal blocking:

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-behavior")
export class ExampleModalBehavior extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private openAutoCloseModal() {
        this.modalComponent.controller.show({
            title: "Auto-Close Modal",
            time: 3000,
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal will automatically close after 3 seconds.</p>
                    <p>You can still close it manually if needed.</p>
                </div>
            `,
            onClose: () => {
                console.log("Auto-close modal was closed");
            },
        });
    }

    private openBlockedModal() {
        this.modalComponent.controller.show({
            title: "Blocked Modal",
            blocked: true,
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal is blocked - you cannot close it by clicking outside or using the X button.</p>
                    <p>You must use the button below to close it.</p>
                    <mjo-button @click=${() => this.modalComponent.controller.close()}> Close Modal </mjo-button>
                </div>
            `,
        });
    }

    private openCallbackModal() {
        this.modalComponent.controller.show({
            title: "Modal with Callback",
            content: html`
                <div style="padding: 1rem;">
                    <p>This modal has a callback function that executes when closed.</p>
                    <p>Check the console when you close this modal.</p>
                </div>
            `,
            onClose: () => {
                alert("Modal was closed! Check the console for more info.");
                console.log("Modal closed at:", new Date().toLocaleTimeString());
            },
        });
    }

    render() {
        return html`
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <mjo-button @click=${this.openAutoCloseModal}> Auto-Close (3s) </mjo-button>
                <mjo-button @click=${this.openBlockedModal} variant="warning"> Blocked Modal </mjo-button>
                <mjo-button @click=${this.openCallbackModal}> With Callback </mjo-button>
            </div>

            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Complex Content Example

Advanced modal content and custom animations:

```ts
import { LitElement, html, css } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";

@customElement("example-modal-advanced")
export class ExampleModalAdvanced extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    @state()
    private formData = { name: "", email: "", message: "" };

    private openFormModal() {
        this.modalComponent.controller.show({
            title: "Contact Form",
            width: 500,
            initialFocus: "#name-input",
            content: html`
                <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                    <mjo-textfield id="name-input" label="Name" .value=${this.formData.name}></mjo-textfield>
                    <mjo-textfield label="Email" type="email" .value=${this.formData.email}></mjo-textfield>
                    <mjo-textfield label="Message" multiline rows="4" .value=${this.formData.message}></mjo-textfield>

                    <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                        <mjo-button variant="ghost" @click=${() => this.modalComponent.controller.close()}> Cancel </mjo-button>
                        <mjo-button @click=${this.submitForm}> Submit </mjo-button>
                    </div>
                </div>
            `,
        });
    }

    private submitForm() {
        console.log("Form submitted:", this.formData);
        this.modalComponent.controller.close();
    }

    render() {
        return html`
            <mjo-button @click=${this.openFormModal}> Open Contact Form </mjo-button>
            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Context Sharing

The modal controller can be shared across component hierarchies using `@lit/context`:

```ts
import { LitElement, html, PropertyValues } from "lit";
import { customElement, provide, consume, query } from "lit/decorators.js";
import { createContext } from "@lit/context";
import type { MjoModal, ModalController } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

// Create a context for the modal controller
const modalContext = createContext<ModalController>("modal-controller");

@customElement("main-app-component")
export class MainAppComponent extends LitElement {
    @provide({ context: modalContext })
    modalController!: ModalController;

    @query("mjo-modal")
    private modal!: MjoModal;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this.modalController = this.modal.controller;
    }

    render() {
        return html`
            <div>
                <h2>Main Application</h2>
                <child-component></child-component>
                <mjo-modal></mjo-modal>
            </div>
        `;
    }
}

@customElement("child-component")
export class ChildComponent extends LitElement {
    @consume({ context: modalContext, subscribe: true })
    modalController!: ModalController;

    private openModal() {
        this.modalController.show({
            title: "Child Modal",
            content: html`<p>This modal was opened from a child component!</p>`,
        });
    }

    render() {
        return html`<mjo-button @click=${this.openModal}>Open Modal</mjo-button>`;
    }
}
```

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-theming")
export class ExampleModalTheming extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private showThemedModal() {
        this.modalComponent.controller.show({
            title: "Themed Modal",
            content: html`
                <div style="padding: 1.5rem;">
                    <p>This modal uses custom theme colors and styling.</p>
                    <p>Notice the custom background, border radius, and shadows.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <mjo-theme
                .theme=${{
                    modal: {
                        backgroundColor: "#f8f9fa",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                        radius: "16px",
                        width: "500px",
                        iconCloseSize: "20px",
                        titleBorderColor: "#e9ecef",
                    },
                }}
            >
                <div style="padding: 2rem;">
                    <h3>Custom Modal Theme</h3>
                    <p>Modals will appear with custom styling</p>

                    <mjo-button @click=${this.showThemedModal}> Show Themed Modal </mjo-button>
                </div>

                <mjo-modal></mjo-modal>
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
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-theme-mixin")
export class ExampleModalThemeMixin extends ThemeMixin(LitElement) {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    private showCustomModal() {
        this.modalComponent.controller.show({
            title: "Component-Level Theme",
            content: html`
                <div style="padding: 1.5rem;">
                    <p>This modal has component-level theme overrides.</p>
                    <p>Perfect for specific modal styling requirements.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="padding: 2rem;">
                <h3>Component-Level Modal Theming</h3>

                <mjo-button @click=${this.showCustomModal}> Show Custom Modal </mjo-button>

                <mjo-modal
                    .theme=${{
                        backgroundColor: "#fff3cd",
                        boxShadow: "0 4px 20px rgba(255, 193, 7, 0.3)",
                        radius: "12px",
                        titleBorderColor: "#ffc107",
                    }}
                >
                </mjo-modal>
            </div>
        `;
    }
}
```

## Programmatic Control

Simple programmatic control example:

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoModal } from "mjo-litui/types";
import "mjo-litui/mjo-modal";
import "mjo-litui/mjo-button";

@customElement("example-modal-control")
export class ExampleModalControl extends LitElement {
    @query("mjo-modal")
    private modalComponent!: MjoModal;

    @state()
    private processing = false;

    private async startProcess() {
        this.processing = true;

        this.modalComponent.controller.show({
            title: "Processing...",
            blocked: true,
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <p>Please wait while we process your request.</p>
                    <div style="margin: 1rem 0;">Processing...</div>
                </div>
            `,
        });

        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 3000));

        this.modalComponent.controller.show({
            title: "Complete!",
            content: html`
                <div style="padding: 1.5rem; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                    <p>Processing completed successfully!</p>
                </div>
            `,
            time: 2000,
        });

        this.processing = false;
    }

    render() {
        return html`
            <mjo-button @click=${this.startProcess} .disabled=${this.processing}> ${this.processing ? "Processing..." : "Start Process"} </mjo-button>
            <mjo-modal></mjo-modal>
        `;
    }
}
```

## Properties

| Name                | Type            | Default | Description                                         |
| ------------------- | --------------- | ------- | --------------------------------------------------- |
| `open`              | `boolean`       | `false` | Controls modal visibility (mainly for internal use) |
| `theme`             | `MjoModalTheme` | `{}`    | Theme configuration for the modal container         |
| `ariaLabelledby`    | `string`        | -       | ID of element that labels the modal                 |
| `ariaDescribedby`   | `string`        | -       | ID of element that describes the modal              |
| `label`             | `string`        | -       | Alternative label for modal content                 |
| `trapFocus`         | `boolean`       | `true`  | Enable/disable focus trapping                       |
| `restoreFocus`      | `boolean`       | `true`  | Enable/disable focus restoration on close           |
| `closeOnEscape`     | `boolean`       | `true`  | Enable/disable ESC key closing                      |
| `initialFocus`      | `string`        | -       | CSS selector for initial focus element              |
| `preventBodyScroll` | `boolean`       | `true`  | Prevent body scroll when modal is open              |

## Controller Methods

The `ModalController` provides the following methods:

### `show(params: ModalShowParams): void`

Shows the modal with the specified configuration.

#### Parameters

| Name                | Type                          | Default | Description                                      |
| ------------------- | ----------------------------- | ------- | ------------------------------------------------ |
| `content`           | `string \| TemplateResult<1>` | -       | The modal content (HTML string or Lit template)  |
| `title`             | `string`                      | -       | Optional modal title                             |
| `width`             | `string \| number`            | -       | Modal width (pixels or CSS value)                |
| `time`              | `number`                      | -       | Auto-close time in milliseconds                  |
| `animationDuration` | `number`                      | `200`   | Animation duration in milliseconds               |
| `blocked`           | `boolean`                     | `false` | Prevents closing by clicking outside or X button |
| `closePosition`     | `"in" \| "out"`               | `"in"`  | Position of the close button                     |
| `onClose`           | `() => void`                  | -       | Callback function executed when modal closes     |

### `close(): void`

Closes the currently open modal.

## Types

````ts
interface ModalShowParams {
    title?: string;
    content: string | TemplateResult<1>;
    time?: number;
    width?: string | number;
    animationDuration?: number;
    blocked?: boolean;
    closePosition?: "out" | "in";
    onClose?: () => void;
}

interface MjoModalTheme {
    iconCloseSize?: string;
    titleBorderColor?: string;
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
    width?: string;
}
```## Events

This component does not emit custom events. The modal container handles internal events for user interactions.

## CSS Custom Properties

| Property                         | Default                                               | Description            |
| -------------------------------- | ----------------------------------------------------- | ---------------------- |
| `--mjo-modal-background-color`   | `var(--mjo-background-color, #fff)`                   | Modal background color |
| `--mjo-modal-box-shadow`         | `var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5))` | Modal box shadow       |
| `--mjo-modal-radius`             | `var(--mjo-border-radius, 5px)`                       | Modal border radius    |
| `--mjo-modal-width`              | `450px`                                               | Default modal width    |
| `--mjo-modal-icon-close-size`    | `16px` (inside), `30px` (outside)                     | Close button icon size |
| `--mjo-modal-title-border-color` | `var(--mjo-border-color, #ccc)`                       | Title border color     |

### Theme Interface

```ts
interface MjoModalTheme {
    iconCloseSize?: string;
    titleBorderColor?: string;
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
    width?: string;
}
````

## Technical Notes

-   **Global Container**: Modals are rendered in a container appended to `document.body`
-   **Z-Index Management**: The container inherits z-index from the host component
-   **Backdrop Filter**: Uses CSS backdrop-filter for modern blur effects
-   **Animation System**: Smooth scale and fade animations with configurable duration
-   **Content Flexibility**: Supports both HTML strings and Lit templates
-   **Theme Inheritance**: Modal container inherits theme from the host component
-   **Responsive Design**: Automatically adapts to viewport size with max-width constraints

## Accessibility

-   **Focus Management**: Automatic focus trapping within modal with configurable initial focus
-   **Keyboard Navigation**: Full keyboard support including ESC key to close and Tab navigation
-   **ARIA Support**: Complete ARIA implementation with dialog role, modal attribute, and labeling
-   **Screen Reader**: Proper announcements and accessible content structure
-   **Body Scroll Control**: Prevents background scrolling when modal is active
-   **Focus Restoration**: Automatically returns focus to the triggering element when closed
-   **Customizable Behavior**: All accessibility features can be configured or disabled as needed

## Best Practices

### General Usage

-   Use descriptive titles for better user understanding
-   Keep modal content focused and concise
-   Use blocking modals sparingly for critical actions
-   Provide clear action buttons for user guidance
-   Consider mobile viewport constraints when setting width
-   Use context sharing for large applications with multiple components
-   Implement proper error handling in onClose callbacks

### Accessibility

-   Always provide either `ariaLabelledby` or `label` for screen readers
-   Use `ariaDescribedby` to reference content that describes the modal's purpose
-   Set `initialFocus` to the most important interactive element (like a confirm button)
-   Keep focus trap enabled (`trapFocus: true`) unless there's a specific reason not to
-   Allow ESC key closing (`closeOnEscape: true`) for keyboard users
-   Use semantic HTML structure within modal content
-   Ensure sufficient color contrast for all text and interactive elements
-   Test with screen readers and keyboard-only navigation

### Performance

-   Avoid creating multiple modal instances; reuse a single instance when possible
-   Use the controller pattern for complex modal workflows
-   Implement proper cleanup in `onClose` callbacks to prevent memory leaks

For additional theming options, see the [Theming Guide](./theming.md).
