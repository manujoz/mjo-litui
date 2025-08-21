# mjo-alert

Configurable, type-aware alert component for displaying contextual feedback messages with multiple types, sizes, and interactive dismissal functionality.

## HTML Usage

```html
<mjo-alert type="success" message="Operation completed successfully!"></mjo-alert>
<mjo-alert type="error" message="An error occurred" detail="Please check your input and try again."></mjo-alert>
<mjo-alert type="warning" message="Warning" closable></mjo-alert>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-icon";

@customElement("example-alert-basic")
export class ExampleAlertBasic extends LitElement {
    render() {
        return html`
            <mjo-alert type="info" message="This is an informational alert"></mjo-alert>
            <mjo-alert type="success" message="Success! Your action was completed."></mjo-alert>
            <mjo-alert type="warning" message="Warning: Please review your settings."></mjo-alert>
            <mjo-alert type="error" message="Error: Something went wrong."></mjo-alert>
        `;
    }
}
```

## Types and Detailed Messages Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-icon";

@customElement("example-alert-types")
export class ExampleAlertTypes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-alert
                    type="info"
                    message="Information"
                    detail="This is additional information that provides more context about the alert message."
                ></mjo-alert>

                <mjo-alert
                    type="success"
                    message="Success!"
                    detail="Your changes have been saved successfully. You can continue working on your project."
                ></mjo-alert>

                <mjo-alert
                    type="warning"
                    message="Warning"
                    detail="<strong>Important:</strong> This action cannot be undone. Please make sure you want to proceed."
                ></mjo-alert>

                <mjo-alert type="error" message="Error" detail="Failed to save changes. Please check your network connection and try again."></mjo-alert>
            </div>
        `;
    }
}
```

## Auto-Close Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-alert";

@customElement("example-alert-autoclose")
export class ExampleAlertAutoclose extends LitElement {
    render() {
        return html`
            <mjo-alert
                type="success"
                message="Auto-closing alert"
                detail="This alert will disappear after 3 seconds"
                autoClose
                autoCloseDelay="3000"
            ></mjo-alert>
        `;
    }
}
```

## Animation Types Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-alert";

@customElement("example-alert-animations")
export class ExampleAlertAnimations extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-alert type="info" message="Fade animation" animation="fade" closable></mjo-alert>
                <mjo-alert type="success" message="Slide animation" animation="slide" closable></mjo-alert>
                <mjo-alert type="warning" message="Scale animation" animation="scale" closable></mjo-alert>
                <mjo-alert type="error" message="No animation" animation="none" closable></mjo-alert>
            </div>
        `;
    }
}
```

## Programmatic Control Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-button";

@customElement("example-alert-control")
export class ExampleAlertControl extends LitElement {
    @query("mjo-alert") alert!: MjoAlert;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 0.5rem;">
                    <mjo-button @click=${() => this.alert.show()} size="small">Show</mjo-button>
                    <mjo-button @click=${() => this.alert.hide()} size="small">Hide</mjo-button>
                    <mjo-button @click=${() => this.alert.announce()} size="small">Announce</mjo-button>
                </div>
                <mjo-alert
                    type="info"
                    message="Programmatically controlled alert"
                    focusOnShow
                    @mjo-alert-show=${() => console.log("Alert shown")}
                    @mjo-alert-closed=${() => console.log("Alert closed")}
                ></mjo-alert>
            </div>
        `;
    }
}
```

## Sizes and Rounded Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-icon";

@customElement("example-alert-variants")
export class ExampleAlertVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Sizes</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-alert type="info" size="small" message="Small alert message"></mjo-alert>
                        <mjo-alert type="info" size="medium" message="Medium alert message (default)"></mjo-alert>
                        <mjo-alert type="info" size="large" message="Large alert message"></mjo-alert>
                    </div>
                </div>

                <div>
                    <h4>Border Radius</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-alert type="success" rounded="none" message="No border radius"></mjo-alert>
                        <mjo-alert type="success" rounded="small" message="Small border radius"></mjo-alert>
                        <mjo-alert type="success" rounded="medium" message="Medium border radius (default)"></mjo-alert>
                        <mjo-alert type="success" rounded="large" message="Large border radius"></mjo-alert>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Closable and Icon Options Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-button";

@customElement("example-alert-interactive")
export class ExampleAlertInteractive extends LitElement {
    @state() private showAlert = true;

    private resetAlert() {
        this.showAlert = true;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <h4>Closable Alerts</h4>
                    ${this.showAlert
                        ? html`
                              <mjo-alert
                                  type="warning"
                                  message="Dismissible Alert"
                                  detail="Click the X button to close this alert."
                                  closable
                                  @click=${(e: Event) => {
                                      if ((e.target as HTMLElement).closest(".close")) {
                                          this.showAlert = false;
                                      }
                                  }}
                              ></mjo-alert>
                          `
                        : html` <mjo-button @click=${this.resetAlert} color="secondary" variant="ghost"> Show Alert Again </mjo-button> `}
                </div>

                <div>
                    <h4>Without Icons</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-alert type="info" message="Info without icon" hideIcon></mjo-alert>
                        <mjo-alert type="success" message="Success without icon" hideIcon closable></mjo-alert>
                        <mjo-alert type="error" message="Error without icon" detail="This alert doesn't show the default type icon." hideIcon></mjo-alert>
                    </div>
                </div>

                <div>
                    <h4>Combined Options</h4>
                    <mjo-alert
                        type="warning"
                        size="large"
                        rounded="large"
                        message="Large Warning Alert"
                        detail="This is a large, highly rounded, closable warning alert with detailed information."
                        closable
                    ></mjo-alert>
                </div>
            </div>
        `;
    }
}
```

## Dynamic Alerts Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-button";

@customElement("example-alert-dynamic")
export class ExampleAlertDynamic extends LitElement {
    @state() private alerts: Array<{
        id: number;
        type: "info" | "success" | "warning" | "error";
        message: string;
        detail?: string;
    }> = [];

    private alertId = 0;

    private addAlert(type: "info" | "success" | "warning" | "error") {
        const messages = {
            info: { message: "Info Alert", detail: "This is an informational message." },
            success: { message: "Success Alert", detail: "Operation completed successfully!" },
            warning: { message: "Warning Alert", detail: "Please be careful with this action." },
            error: { message: "Error Alert", detail: "Something went wrong. Please try again." },
        };

        this.alerts = [
            ...this.alerts,
            {
                id: ++this.alertId,
                type,
                ...messages[type],
            },
        ];
    }

    private removeAlert(id: number) {
        this.alerts = this.alerts.filter((alert) => alert.id !== id);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <h4>Dynamic Alert Management</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <mjo-button @click=${() => this.addAlert("info")} color="info" size="small"> Add Info </mjo-button>
                        <mjo-button @click=${() => this.addAlert("success")} color="success" size="small"> Add Success </mjo-button>
                        <mjo-button @click=${() => this.addAlert("warning")} color="warning" size="small"> Add Warning </mjo-button>
                        <mjo-button @click=${() => this.addAlert("error")} color="error" size="small"> Add Error </mjo-button>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${this.alerts.map(
                        (alert) => html`
                            <mjo-alert
                                type=${alert.type}
                                message=${alert.message}
                                detail=${alert.detail}
                                closable
                                @click=${(e: Event) => {
                                    if ((e.target as HTMLElement).closest(".close")) {
                                        this.removeAlert(alert.id);
                                    }
                                }}
                            ></mjo-alert>
                        `,
                    )}
                </div>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name                | Type                                          | Default    | Reflects | Description                                                 |
| ------------------- | --------------------------------------------- | ---------- | -------- | ----------------------------------------------------------- |
| `type`              | `"success" \| "info" \| "warning" \| "error"` | `"info"`   | no       | Semantic type that determines color scheme and default icon |
| `size`              | `"small" \| "medium" \| "large"`              | `"medium"` | no       | Controls font size and padding                              |
| `rounded`           | `"none" \| "small" \| "medium" \| "large"`    | `"medium"` | no       | Border radius applied to the alert container                |
| `message`           | `string`                                      | `""`       | no       | Main alert message displayed prominently                    |
| `detail`            | `string`                                      | `""`       | no       | Additional detail text (supports HTML via `unsafeHTML`)     |
| `closable`          | `boolean`                                     | `false`    | no       | Shows close button and enables dismissal functionality      |
| `hideIcon`          | `boolean`                                     | `false`    | no       | Hides the default type-based icon                           |
| `ariaLive`          | `"polite" \| "assertive" \| "off"`            | `"polite"` | no       | Controls aria-live announcement behavior for screen readers |
| `focusOnShow`       | `boolean`                                     | `false`    | no       | Automatically focus the alert when shown                    |
| `autoClose`         | `boolean`                                     | `false`    | no       | Automatically close the alert after a delay                 |
| `autoCloseDelay`    | `number`                                      | `5000`     | no       | Delay in milliseconds before auto-closing (when enabled)    |
| `animation`         | `"fade" \| "slide" \| "scale" \| "none"`      | `"fade"`   | no       | Animation type for show/hide transitions                    |
| `animationDuration` | `number`                                      | `300`      | no       | Animation duration in milliseconds                          |
| `persistent`        | `boolean`                                     | `false`    | no       | Prevents the alert from being closed manually               |

### Internal State

| Name   | Type     | Description                                                    |
| ------ | -------- | -------------------------------------------------------------- |
| `icon` | `string` | Private `@state` that stores the icon path based on alert type |

### Behavior Notes

-   Icons are automatically selected based on the `type` property:
    -   `success`: Check circle icon
    -   `info`: Info circle icon
    -   `warning`: Warning triangle icon
    -   `error`: Close circle icon
-   The `detail` property supports HTML content via `unsafeHTML` directive
-   Closing animation smoothly transitions height, opacity, and padding before removing the element
-   The close functionality calls the native `remove()` method to delete the element from DOM

## Public Methods

| Method       | Parameters | Description                                           |
| ------------ | ---------- | ----------------------------------------------------- |
| `show()`     | none       | Programmatically show the alert with animations       |
| `hide()`     | none       | Programmatically hide the alert with animations       |
| `focus()`    | none       | Focus the alert (close button if available)           |
| `announce()` | none       | Force screen readers to re-announce the alert content |

## Slots

| Slot      | Description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via `message` and `detail` props |

## Events

| Event                  | Detail                  | Emitted When               | Notes                                    |
| ---------------------- | ----------------------- | -------------------------- | ---------------------------------------- |
| `mjo-alert-will-show`  | `{ element: MjoAlert }` | Before the alert is shown  | Can be used to prepare for alert display |
| `mjo-alert-show`       | `{ element: MjoAlert }` | After the alert is shown   | Fired when show animation completes      |
| `mjo-alert-will-close` | `{ element: MjoAlert }` | Before the alert is closed | Can be used to save state or cleanup     |
| `mjo-alert-closed`     | `{ element: MjoAlert }` | After the alert is closed  | Fired when close animation completes     |

**Note**: All events are custom events that bubble and are composed, making them available across shadow DOM boundaries.

## CSS Variables

The component uses semantic color tokens and spacing variables with fallbacks to the global design system.

### Type-based Colors

Each alert type uses specific color tokens from the design system:

| Type      | Background Variable     | Border Variable       | Text Color Variable   |
| --------- | ----------------------- | --------------------- | --------------------- |
| `success` | `--mjo-color-green-50`  | `--mjo-color-success` | `--mjo-color-success` |
| `info`    | `--mjo-color-blue-50`   | `--mjo-color-info`    | `--mjo-color-info`    |
| `warning` | `--mjo-color-yellow-50` | `--mjo-color-warning` | `--mjo-color-warning` |
| `error`   | `--mjo-color-red-50`    | `--mjo-color-error`   | `--mjo-color-error`   |

### Structure Variables

| Variable                         | Fallback              | Used For                                      |
| -------------------------------- | --------------------- | --------------------------------------------- |
| `--mjo-alert-space`              | `--mjo-space-small`   | Internal padding and spacing                  |
| `--mjo-alert-animation-duration` | `300ms`               | Duration for show/hide animations             |
| `--mjo-radius-small`             | Global radius system  | Small border radius option                    |
| `--mjo-radius-medium`            | Global radius system  | Medium border radius (default)                |
| `--mjo-radius-large`             | Global radius system  | Large border radius option                    |
| `--mjo-space-xsmall`             | Global spacing system | Gap between icon and text, small size spacing |

### Size-specific Adjustments

-   `small` size: Uses `--mjo-space-xsmall` for padding and 0.8em font-size
-   `medium` size: Uses default `--mjo-alert-space` and 1em font-size
-   `large` size: Uses default `--mjo-alert-space` and 1.2em font-size

## Theme Customization

While this component doesn't use ThemeMixin, it can be customized through CSS variables. The component references an `MjoAlertTheme` interface with limited options:

### MjoAlertTheme Interface

```ts
interface MjoAlertTheme {
    space?: string;
}
```

### CSS Custom Properties Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-alert";

@customElement("example-alert-custom")
export class ExampleAlertCustom extends LitElement {
    static styles = css`
        .custom-alert {
            --mjo-alert-space: 1.5rem;
            --mjo-alert-animation-duration: 600ms;
            --mjo-color-success: #2d8f47;
            --mjo-color-green-50: #f0f9f3;
        }
    `;

    render() {
        return html`
            <mjo-alert
                class="custom-alert"
                type="success"
                message="Custom Styled Alert"
                detail="Uses custom spacing and slower animations."
                size="large"
                animation="scale"
                closable
            ></mjo-alert>
        `;
    }
}
```

## Form Integration Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-alert-form")
export class ExampleAlertForm extends LitElement {
    @state() private alertType: "success" | "error" | null = null;
    @state() private alertMessage = "";

    private handleSubmit(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;

        // Simulate validation
        if (email && email.includes("@")) {
            this.alertType = "success";
            this.alertMessage = "Email submitted successfully!";
        } else {
            this.alertType = "error";
            this.alertMessage = "Please enter a valid email address.";
        }

        // Clear alert after 3 seconds
        setTimeout(() => {
            this.alertType = null;
        }, 3000);
    }

    render() {
        return html`
            <form @submit=${this.handleSubmit} style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
                ${this.alertType
                    ? html`
                          <mjo-alert
                              type=${this.alertType}
                              message=${this.alertMessage}
                              closable
                              @click=${(e: Event) => {
                                  if ((e.target as HTMLElement).closest(".close")) {
                                      this.alertType = null;
                                  }
                              }}
                          ></mjo-alert>
                      `
                    : ""}

                <mjo-textfield name="email" placeholder="Enter your email" type="email" required></mjo-textfield>

                <mjo-button type="submit" color="primary"> Submit </mjo-button>
            </form>
        `;
    }
}
```

## Accessibility Notes

-   Alert content is announced to screen readers automatically with appropriate `aria-live` behavior
-   Important alerts (error/warning) use `aria-live="assertive"` for immediate attention
-   The component includes proper ARIA attributes: `role="alert"`, `aria-atomic="true"`, and `aria-labelledby`/`aria-describedby`
-   Close button is fully keyboard accessible (Enter/Space keys) with proper `aria-label`
-   Focus management: the `focusOnShow` property enables automatic focus for important alerts
-   Color contrast is maintained across all alert types for accessibility compliance
-   Animation respects `prefers-reduced-motion` user preferences
-   Use `announce()` method to force re-announcement for dynamic content changes

```html
<!-- Example with enhanced accessibility -->
<mjo-alert
    type="error"
    message="Form validation failed"
    detail="Please correct the errors below and try again."
    closable
    focusOnShow
    ariaLive="assertive"
></mjo-alert>
```

## Performance Considerations

-   The `detail` property uses `unsafeHTML` directive, so sanitize content if accepting user input
-   Close animations are optimized with CSS transitions and minimal DOM manipulation
-   Large numbers of alerts should be managed with proper state cleanup to prevent memory leaks
-   Consider implementing a global alert service for application-wide alert management

## CSS Parts

| Part        | Description                      |
| ----------- | -------------------------------- |
| `container` | The main alert container         |
| `message`   | The message content area         |
| `detail`    | The detail content area          |
| `icon`      | Icon containers (type and close) |

## HTML Content in Detail

The `detail` property supports HTML content via Lit's `unsafeHTML` directive:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-alert";
import "mjo-litui/mjo-icon";

@customElement("example-alert-html")
export class ExampleAlertHtml extends LitElement {
    render() {
        return html`
            <mjo-alert
                type="info"
                message="Rich Content Alert"
                detail="This alert supports <strong>bold text</strong>, <em>italic text</em>, and <a href='#' style='color: inherit; text-decoration: underline;'>links</a>."
            ></mjo-alert>
        `;
    }
}
```

**Security Warning**: Only use trusted HTML content in the `detail` property to prevent XSS attacks.

## Summary

`<mjo-alert>` provides a flexible and accessible way to display contextual feedback messages with automatic type-based styling and icons. The component supports multiple sizes, border radius options, and dismissal functionality. Use semantic types (`success`, `info`, `warning`, `error`) for consistent styling, and leverage the `closable` property for interactive alerts. The component automatically handles animations and cleanup when dismissed, making it suitable for both static and dynamic alert scenarios.
