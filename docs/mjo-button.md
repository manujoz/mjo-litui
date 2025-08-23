# mjo-button

Fully accessible button component providing multiple variants, semantic colors, interactive states, and comprehensive accessibility features including ARIA support, loading states, and toggle functionality.

## HTML Usage

```html
<mjo-button color="primary" variant="default">Accept</mjo-button>
<mjo-button color="secondary" variant="ghost">Cancel</mjo-button>
<mjo-button color="success" variant="flat" startIcon="check">Done</mjo-button>
<mjo-button toggleable button-label="Notification settings">Toggle</mjo-button>
<mjo-button loading>Processing...</mjo-button>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-button";

@customElement("example-button-basic")
export class ExampleButtonBasic extends LitElement {
    render() {
        return html`
            <mjo-button color="primary">Primary</mjo-button>
            <mjo-button color="secondary" variant="ghost">Ghost Secondary</mjo-button>
            <mjo-button color="success" variant="flat" startIcon="check">Flat Success</mjo-button>
        `;
    }
}
```

## Accessibility Features Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-button";

@customElement("example-button-accessibility")
export class ExampleButtonAccessibility extends LitElement {
    @state() private isLoading = false;
    @state() private menuExpanded = false;

    render() {
        return html`
            <div>
                <h4>Loading State (uses aria-busy)</h4>
                <mjo-button .loading=${this.isLoading} @mjo-button:loading-change=${this.handleLoadingChange} @click=${this.simulateLoading}>
                    ${this.isLoading ? "Loading..." : "Start Task"}
                </mjo-button>
            </div>

            <div>
                <h4>Toggle Button (uses aria-pressed)</h4>
                <mjo-button toggleable button-label="Toggle notifications" @mjo-button:toggle=${this.handleToggle}> Notifications </mjo-button>
            </div>

            <div>
                <h4>Described Button</h4>
                <mjo-button color="error" described-by="delete-warning"> Delete Item </mjo-button>
                <div id="delete-warning">This action cannot be undone</div>
            </div>
        `;
    }

    private simulateLoading() {
        this.isLoading = true;
        setTimeout(() => (this.isLoading = false), 2000);
    }

    private handleLoadingChange(e: CustomEvent) {
        console.log("Loading changed:", e.detail.loading);
    }

    private handleToggle(e: CustomEvent) {
        console.log("Toggle state:", e.detail.pressed);
    }
}
```

## Variants & Colors Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-button";

@customElement("example-button-variants")
export class ExampleButtonVariants extends LitElement {
    render() {
        return html`
            <div>
                <h4>Default Variant</h4>
                <mjo-button color="primary">Primary</mjo-button>
                <mjo-button color="secondary">Secondary</mjo-button>
                <mjo-button color="success">Success</mjo-button>
                <mjo-button color="error">Error</mjo-button>
            </div>
            <div>
                <h4>Ghost Variant</h4>
                <mjo-button color="primary" variant="ghost">Primary Ghost</mjo-button>
                <mjo-button color="secondary" variant="ghost">Secondary Ghost</mjo-button>
            </div>
            <div>
                <h4>Flat Variant</h4>
                <mjo-button color="primary" variant="flat">Primary Flat</mjo-button>
                <mjo-button color="secondary" variant="flat">Secondary Flat</mjo-button>
            </div>
        `;
    }
}
```

## Interactive States Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-button";

@customElement("example-button-states")
export class ExampleButtonStates extends LitElement {
    @state() private loading = false;
    @state() private toggled = false;

    private simulateLoad() {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1500);
    }

    render() {
        return html`
            <mjo-button color="primary" .loading=${this.loading} @click=${this.simulateLoad}> ${this.loading ? "Loading..." : "Simulate Load"} </mjo-button>

            <mjo-button color="secondary" toggleable @click=${() => (this.toggled = !this.toggled)}> Toggle (${this.toggled ? "ON" : "OFF"}) </mjo-button>

            <mjo-button disabled>Disabled Button</mjo-button>

            <mjo-button color="primary" startIcon="home">With Icon</mjo-button>

            <mjo-button color="success" rounded startIcon="check"></mjo-button>
        `;
    }
}
```

## Attributes / Properties

| Name         | Type                                                                      | Default     | Reflects | Description                                                                       |
| ------------ | ------------------------------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------- |
| `type`       | `"button" \| "submit" \| "reset" \| "menu"`                               | `"button"`  | no       | Native button type; `submit` triggers form submission (via FormMixin)             |
| `color`      | `"primary" \| "secondary" \| "success" \| "info" \| "warning" \| "error"` | `"primary"` | no       | Semantic color; maps to theme variables / token palette                           |
| `variant`    | `"default" \| "ghost" \| "dashed" \| "link" \| "text" \| "flat"`          | `"default"` | no       | Visual styling strategy                                                           |
| `size`       | `"small" \| "medium" \| "large"`                                          | `"medium"`  | no       | Adjusts padding & font-size                                                       |
| `fullwidth`  | `boolean`                                                                 | `false`     | yes      | Forces the host to span 100% width                                                |
| `disabled`   | `boolean`                                                                 | `false`     | yes      | Disables interaction & ripple                                                     |
| `loading`    | `boolean`                                                                 | `false`     | yes      | Shows loading bar & blocks toggle/ripple, sets aria-busy="true"                   |
| `rounded`    | `boolean`                                                                 | `false`     | yes      | Circular shape (ignores width, uses equal padding)                                |
| `toggleable` | `boolean`                                                                 | `false`     | no       | Enables internal pressed state with aria-pressed when clicked and `type="button"` |
| `small-caps` | `boolean`                                                                 | `false`     | no       | Applies `font-variant: all-small-caps`                                            |
| `noink`      | `boolean`                                                                 | `false`     | no       | Hides the ripple effect                                                           |
| `startIcon`  | `string \| undefined`                                                     | `undefined` | no       | Icon name / path prepended to button text                                         |
| `endIcon`    | `string \| undefined`                                                     | `undefined` | no       | Icon name / path appended to button text                                          |

### Accessibility Properties

| Name           | Type                  | Default     | Description                                                |
| -------------- | --------------------- | ----------- | ---------------------------------------------------------- |
| `button-label` | `string \| undefined` | `undefined` | Custom aria-label for the button                           |
| `described-by` | `string \| undefined` | `undefined` | ID of element that describes the button (aria-describedby) |

### Internal State

| Name     | Type      | Description                                                                                   |
| -------- | --------- | --------------------------------------------------------------------------------------------- |
| `toggle` | `boolean` | Private `@state` used when `toggleable` is true to add `data-toggle` styling and aria-pressed |

### Behavior Notes

-   When `disabled` or `loading`, toggle state is reset to `false`.
-   Form submission only occurs if a parent form is wired via FormMixin and `type="submit"`.
-   Ripple (`<mjo-ripple>`) is omitted when `loading`, `disabled`, or `noink`.

## Slots

| Slot      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| (default) | Button textual / inline content (rendered inside `<mjo-typography>`) |

## Events

| Event                       | Detail                                | Emitted When          | Notes                                               |
| --------------------------- | ------------------------------------- | --------------------- | --------------------------------------------------- |
| `click`                     | Native `MouseEvent`                   | User activation       | Standard DOM event, prevented when disabled/loading |
| `mjo-button:click`          | `{ element, toggle?, originalEvent }` | Button is clicked     | Custom event with additional context                |
| `mjo-button:toggle`         | `{ element, pressed, previousState }` | Toggle state changes  | Only emitted when `toggleable` is true              |
| `mjo-button:loading-change` | `{ element, loading }`                | Loading state changes | Emitted whenever loading property changes           |

### Event Details

#### MjoButtonClickEvent

-   `element`: Reference to the button instance
-   `toggle`: Current toggle state (only present if toggleable)
-   `originalEvent`: The original MouseEvent or KeyboardEvent

#### MjoButtonToggleEvent

-   `element`: Reference to the button instance
-   `pressed`: New toggle/pressed state
-   `previousState`: Previous toggle state

#### MjoButtonLoadingChangeEvent

-   `element`: Reference to the button instance
-   `loading`: New loading state

## Public Methods

| Method            | Parameters               | Returns | Description                                |
| ----------------- | ------------------------ | ------- | ------------------------------------------ |
| `focus()`         | `options?: FocusOptions` | `void`  | Sets focus to the button                   |
| `blur()`          | -                        | `void`  | Removes focus from the button              |
| `click()`         | -                        | `void`  | Programmatically triggers a click          |
| `setLoading()`    | `loading: boolean`       | `void`  | Sets the loading/busy state                |
| `togglePressed()` | -                        | `void`  | Toggles pressed state (only if toggleable) |

### Method Examples

```ts
// Get reference to button and use methods
const button = document.querySelector("mjo-button") as MjoButton;

// Focus the button
button.focus();

// Set loading state
button.setBusy(true);

// Toggle pressed state (if toggleable)
button.togglePressed();

// Programmatically click
button.click();
```

## CSS Variables

The component consumes a broad set of CSS variables with fallbacks. Custom values can be injected globally (`<mjo-theme>`) or per-instance via ThemeMixin.

### Core Colors

| Variable                                  | Fallback                           | Used For                              |
| ----------------------------------------- | ---------------------------------- | ------------------------------------- |
| `--mjo-button-primary-color`              | `--mjo-primary-color`              | Default variant background / border   |
| `--mjo-button-primary-color-hover`        | `--mjo-primary-color-hover`        | Hover background / border             |
| `--mjo-button-primary-foreground-color`   | `--mjo-primary-foreground-color`   | Text/icon color                       |
| `--mjo-button-secondary-color`            | `--mjo-secondary-color`            | Secondary variant background / border |
| `--mjo-button-secondary-color-hover`      | `--mjo-secondary-color-hover`      | Secondary hover                       |
| `--mjo-button-secondary-foreground-color` | `--mjo-secondary-foreground-color` | Secondary text/icon                   |

### Structure & Typography

| Variable                     | Fallback       | Purpose                     |
| ---------------------------- | -------------- | --------------------------- |
| `--mjo-button-border-radius` | `--mjo-radius` | Corner radius (non-rounded) |
| `--mjo-button-font-size`     | (none)         | Font size override          |
| `--mjo-button-font-weight`   | `normal`       | Font weight                 |
| `--mjo-button-font-family`   | `inherit`      | Font family                 |
| `--mjo-button-padding`       | calculated     | Padding box                 |

### Flat Variant

| Variable                                             | Fallback                           | Purpose                     |
| ---------------------------------------------------- | ---------------------------------- | --------------------------- |
| `--mjo-button-flat-primary-background-color`         | `--mjo-primary-color-alpha2`       | Flat base fill (primary)    |
| `--mjo-button-flat-primary-background-color-hover`   | `--mjo-primary-color-alpha1`       | Flat hover fill (primary)   |
| `--mjo-button-flat-primary-foreground-color`         | `--mjo-primary-foreground-color`   | Foreground (primary)        |
| `--mjo-button-flat-secondary-background-color`       | `--mjo-secondary-color-alpha2`     | Flat base fill (secondary)  |
| `--mjo-button-flat-secondary-background-color-hover` | `--mjo-secondary-color-alpha1`     | Flat hover fill (secondary) |
| `--mjo-button-flat-secondary-foreground-color`       | `--mjo-secondary-foreground-color` | Foreground (secondary)      |

### Status Colors (Success / Info / Warning / Error)

These variants use the global status color tokens:

-   `--mjo-color-success`
-   `--mjo-color-info`
-   `--mjo-color-warning`
-   `--mjo-color-error`

### Ghost / Dashed / Link / Text Variants

| Variable                      | Purpose                                      |
| ----------------------------- | -------------------------------------------- |
| `--mjo-background-color-high` | Hover background for ghost & dashed variants |

### Disabled State

| Variable                                 | Fallback                          | Purpose             |
| ---------------------------------------- | --------------------------------- | ------------------- |
| `--mjo-button-disabled-background-color` | `--mjo-disabled-color`            | Disabled background |
| `--mjo-button-disabled-foreground-color` | `--mjo-disabled-foreground-color` | Disabled text/icon  |

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-button-{property-name}`.

### MjoButtonTheme Interface

```ts
interface MjoButtonTheme {
    disabledBackgroundColor?: string;
    disabledForegroundColor?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    primaryColor?: string;
    primaryBorder?: string;
    primaryColorHover?: string;
    primaryForegroundColor?: string;
    borderRadius?: string;
    secondaryBorder?: string;
    secondaryColor?: string;
    secondaryColorHover?: string;
    secondaryForegroundColor?: string;
    flatPrimaryBackgroundColor?: string;
    flatPrimaryBackgroundColorHover?: string;
    flatPrimaryForegroundColor?: string;
    flatPrimaryForegroundColorHover?: string;
    flatSecondaryBackgroundColor?: string;
    flatSecondaryBackgroundColorHover?: string;
    flatSecondaryForegroundColor?: string;
    flatSecondaryForegroundColorHover?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-button";

@customElement("example-button-themed")
export class ExampleButtonThemed extends LitElement {
    private customTheme = {
        primaryColor: "#7C3AED",
        primaryColorHover: "#6D28D9",
        primaryForegroundColor: "#ffffff",
        fontWeight: "600",
        padding: "0.75rem 1.25rem",
        borderRadius: "8px",
    };

    render() {
        return html` <mjo-button color="primary" .theme=${this.customTheme}> Custom Themed Button </mjo-button> `;
    }
}
```

## Form Integration

When used with `type="submit"`, the button integrates with forms through the FormMixin:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-form";

@customElement("example-button-form")
export class ExampleButtonForm extends LitElement {
    private handleSubmit(event: CustomEvent) {
        console.log("Form submitted:", event.detail);
    }

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <!-- form inputs here -->
                <mjo-button type="submit" color="primary">Submit Form</mjo-button>
                <mjo-button type="reset" variant="ghost">Reset</mjo-button>
            </mjo-form>
        `;
    }
}
```

## CSS Parts

| Part     | Description               |
| -------- | ------------------------- |
| `button` | The native button element |

## Accessibility Notes

This component follows WCAG 2.1 guidelines and provides comprehensive accessibility support:

### ARIA Support

-   **aria-busy**: Automatically set to "true" when `loading` is active, informing screen readers that the button is processing
-   **aria-pressed**: Automatically managed for toggle buttons when `toggleable` is true
-   **aria-label**: Custom accessible name via `button-label` property
-   **aria-describedby**: Reference to descriptive text via `described-by` property
-   **aria-expanded**: Shows popup state via `expanded` property

### Keyboard Navigation

-   Inherits native button keyboard behavior (Space, Enter)
-   Focus management with visible focus indicators
-   Proper tab order integration

### Screen Reader Support

-   State changes are announced immediately
-   Loading states are communicated via aria-busy
-   Toggle states use appropriate pressed/unpressed announcements
-   Custom labels override default content when needed

### Motion & Animation

-   Respects `prefers-reduced-motion` setting
-   Loading animation is replaced with static pattern when motion is reduced
-   Transitions are disabled for users who prefer reduced motion

### High Contrast Support

-   Enhanced borders and focus indicators in high contrast mode
-   Maintains readability across different contrast preferences

### Best Practices

```html
<!-- Good: Descriptive text -->
<mjo-button color="primary">Save Document</mjo-button>

<!-- Good: Icon with accessible label -->
<mjo-button rounded startIcon="close" button-label="Close dialog"></mjo-button>

<!-- Good: Toggle with clear context -->
<mjo-button toggleable button-label="Enable notifications"> Notifications </mjo-button>

<!-- Good: Loading state -->
<mjo-button loading>Processing payment...</mjo-button>

<!-- Good: Menu button -->
<mjo-button has-popup="menu" expanded="false"> Options </mjo-button>
```

## Performance Considerations

-   Avoid setting `loading` for long periods purely to block user interaction; prefer disabling only when necessary.
-   The ripple element is skipped when disabled/loading to reduce unnecessary DOM updates.

## Summary

`<mjo-button>` is a fully accessible, feature-rich button component that provides:

-   **Complete Accessibility**: WCAG 2.1 compliant with comprehensive ARIA support
-   **Multiple Variants**: Various visual styles (default, ghost, flat, dashed, link, text)
-   **Semantic Colors**: Primary, secondary, and status colors (success, info, warning, error)
-   **Interactive States**: Loading with aria-busy, toggle with aria-pressed, disabled states
-   **Flexible Theming**: Global theming via `<mjo-theme>` and per-instance via ThemeMixin
-   **Form Integration**: Seamless form submission via FormMixin
-   **Motion Respect**: Honors user motion preferences
-   **High Contrast**: Enhanced visibility in high contrast modes

The component is designed to be the primary interactive element for user actions, providing excellent usability for all users including those using assistive technologies. Start with semantic HTML and enhance with the specific properties needed for your use case.
