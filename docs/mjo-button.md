# mjo-button

Configurable, theme‑aware button providing multiple variants, semantic colors, interactive states (hover, toggle, loading) and ripple feedback.

## HTML Usage

```html
<mjo-button color="primary" variant="default">Accept</mjo-button>
<mjo-button color="secondary" variant="ghost">Cancel</mjo-button>
<mjo-button color="success" variant="flat" startIcon="check">Done</mjo-button>
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

| Name         | Type                                                                      | Default     | Reflects | Description                                                                   |
| ------------ | ------------------------------------------------------------------------- | ----------- | -------- | ----------------------------------------------------------------------------- |
| `type`       | `"button" \| "submit" \| "reset" \| "menu"`                               | `"button"`  | no       | Native button type; `submit` triggers form submission (via FormMixin)         |
| `color`      | `"primary" \| "secondary" \| "success" \| "info" \| "warning" \| "error"` | `"primary"` | no       | Semantic color; maps to theme variables / token palette                       |
| `variant`    | `"default" \| "ghost" \| "dashed" \| "link" \| "text" \| "flat"`          | `"default"` | no       | Visual styling strategy                                                       |
| `size`       | `"small" \| "medium" \| "large"`                                          | `"medium"`  | no       | Adjusts padding & font-size                                                   |
| `fullwidth`  | `boolean`                                                                 | `false`     | yes      | Forces the host to span 100% width                                            |
| `disabled`   | `boolean`                                                                 | `false`     | yes      | Disables interaction & ripple                                                 |
| `loading`    | `boolean`                                                                 | `false`     | yes      | Shows loading bar & blocks toggle/ripple                                      |
| `rounded`    | `boolean`                                                                 | `false`     | yes      | Circular shape (ignores width, uses equal padding)                            |
| `toggleable` | `boolean`                                                                 | `false`     | no       | Enables internal pressed state (data-toggle) when clicked and `type="button"` |
| `smallCaps`  | `boolean`                                                                 | `false`     | no       | Applies `font-variant: all-small-caps`                                        |
| `noink`      | `boolean`                                                                 | `false`     | no       | Hides the ripple effect                                                       |
| `startIcon`  | `string \| undefined`                                                     | `undefined` | no       | Icon name / path prepended to button text                                     |
| `endIcon`    | `string \| undefined`                                                     | `undefined` | no       | Icon name / path appended to button text                                      |

### Internal State

| Name     | Type      | Description                                                                  |
| -------- | --------- | ---------------------------------------------------------------------------- |
| `toggle` | `boolean` | Private `@state` used when `toggleable` is true to add `data-toggle` styling |

### Behavior Notes

-   When `disabled` or `loading`, toggle state is reset to `false`.
-   Form submission only occurs if a parent form is wired via FormMixin and `type="submit"`.
-   Ripple (`<mjo-ripple>`) is omitted when `loading`, `disabled`, or `noink`.

## Slots

| Slot      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| (default) | Button textual / inline content (rendered inside `<mjo-typography>`) |

## Events

| Event   | Detail              | Emitted When    | Notes                                              |
| ------- | ------------------- | --------------- | -------------------------------------------------- |
| `click` | Native `MouseEvent` | User activation | Prevented from toggling if `disabled` or `loading` |

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

-   Renders a native `<button>`: inherits keyboard accessibility (Enter/Space) automatically.
-   Provide meaningful text or an accessible name if only icons are used (e.g. via `aria-label`).
-   Loading state uses a visual bar; consider adding `aria-busy="true"` manually if needed for assistive tech.

## Performance Considerations

-   Avoid setting `loading` for long periods purely to block user interaction; prefer disabling only when necessary.
-   The ripple element is skipped when disabled/loading to reduce unnecessary DOM updates.

## Summary

`<mjo-button>` is a flexible UI primitive supporting multiple visual variants, semantic colors, and interactive states. Start with global theming for consistency and only resort to per-instance ThemeMixin overrides for exceptions. All CSS variables can be layered: global (`<mjo-theme>`), per‑component (ThemeMixin), and inline (author CSS) if absolutely needed.
