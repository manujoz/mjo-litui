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
            <mjo-button color="primary">Primary Button</mjo-button>
            <mjo-button color="secondary" variant="ghost">Ghost Button</mjo-button>
            <mjo-button color="success" variant="flat" startIcon="check">Flat Button</mjo-button>
            <mjo-button toggleable>Toggle Button</mjo-button>
            <mjo-button loading>Loading Button</mjo-button>
        `;
    }
}
```

## Interactive Features Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-button";

@customElement("example-button-interactive")
export class ExampleButtonInteractive extends LitElement {
    @state() private loading = false;

    private handleClick() {
        this.loading = true;
        setTimeout(() => (this.loading = false), 2000);
    }

    private handleToggle(e: CustomEvent) {
        console.log("Toggle state:", e.detail.pressed);
    }

    render() {
        return html`
            <mjo-button color="primary" .loading=${this.loading} @click=${this.handleClick}> ${this.loading ? "Processing..." : "Start Task"} </mjo-button>

            <mjo-button toggleable button-label="Toggle notifications" @mjo-button:toggle=${this.handleToggle}> Notifications </mjo-button>
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
button.setLoading(true);

// Toggle pressed state (if toggleable)
button.togglePressed();

// Programmatically click
button.click();
```

## CSS Variables

The component uses CSS variables that inherit from the global theme system. Variables can be customized globally via `<mjo-theme>` or per-instance via ThemeMixin.

### Component-Specific Variables

| Variable                     | Default                                   | Purpose                     |
| ---------------------------- | ----------------------------------------- | --------------------------- |
| `--mjo-button-border-radius` | `var(--mjo-radius-medium, 5px)`           | Corner radius (non-rounded) |
| `--mjo-button-font-size`     | `1em`                                     | Font size                   |
| `--mjo-button-font-weight`   | `normal`                                  | Font weight                 |
| `--mjo-button-font-family`   | `inherit`                                 | Font family                 |
| `--mjo-button-padding`       | `calc(1em / 2 - 1px) calc(1em / 2 + 2px)` | Button padding              |

### Global Theme Variables Used

The component leverages these global theme variables:

#### Primary & Secondary Colors

-   `--mjo-primary-color`
-   `--mjo-primary-color-hover`
-   `--mjo-primary-foreground-color`
-   `--mjo-primary-color-alpha1`
-   `--mjo-primary-color-alpha2`
-   `--mjo-secondary-color`
-   `--mjo-secondary-color-hover`
-   `--mjo-secondary-foreground-color`
-   `--mjo-secondary-color-alpha1`
-   `--mjo-secondary-color-alpha2`

#### Status Colors

-   `--mjo-color-success` / `--mjo-color-success-foreground`
-   `--mjo-color-info` / `--mjo-color-info-foreground`
-   `--mjo-color-warning` / `--mjo-color-warning-foreground`
-   `--mjo-color-error` / `--mjo-color-error-foreground`

#### Background & Disabled States

-   `--mjo-background-color-high` (for ghost/dashed/text variant hovers)
-   `--mjo-disabled-color`
-   `--mjo-disabled-foreground-color`

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-button-{property-name}`.

### MjoButtonTheme Interface

```ts
interface MjoButtonTheme {
    borderRadius?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
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
        fontSize: "1.1em",
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

| Part      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `button`  | The native button element                                      |
| `loading` | The loading indicator element (visible when `loading` is true) |

### Parts from child components

When using `startIcon` or `endIcon`, the following parts are exposed via `exportparts`:

-   `start-icon` - The start icon element
-   `end-icon` - The end icon element
-   `text` - The text typography wrapper element

## Accessibility Notes

This component follows WCAG 2.1 guidelines and provides comprehensive accessibility support:

### ARIA Support

-   **aria-busy**: Automatically set to "true" when `loading` is active
-   **aria-pressed**: Automatically managed for toggle buttons when `toggleable` is true
-   **aria-label**: Custom accessible name via `button-label` property
-   **aria-describedby**: Reference to descriptive text via `described-by` property

### Best Practices

```html
<!-- Good: Descriptive text -->
<mjo-button color="primary">Save Document</mjo-button>

<!-- Good: Icon with accessible label -->
<mjo-button rounded startIcon="close" button-label="Close dialog"></mjo-button>

<!-- Good: Toggle with clear context -->
<mjo-button toggleable button-label="Enable notifications">Notifications</mjo-button>

<!-- Good: Loading state -->
<mjo-button loading>Processing payment...</mjo-button>
```

## Summary

`<mjo-button>` is a comprehensive button component that provides:

-   **Multiple Variants**: default, ghost, flat, dashed, link, text
-   **Semantic Colors**: primary, secondary, success, info, warning, error
-   **Interactive States**: loading, toggle, disabled
-   **Accessibility**: WCAG 2.1 compliant with comprehensive ARIA support
-   **Form Integration**: Seamless form submission via FormMixin
-   **Flexible Theming**: Global and per-instance customization

Perfect for building interactive interfaces with consistent styling and excellent accessibility support.
