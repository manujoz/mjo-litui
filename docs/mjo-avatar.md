# mjo-avatar

Configurable, theme-aware avatar component for displaying user images, initials, or fallback icons with multiple sizes, shapes, colors, and customization options.

## HTML Usage

```html
<mjo-avatar src="https://example.com/avatar.jpg" alt="User Avatar"></mjo-avatar>
<mjo-avatar name="John Doe" nameColoured></mjo-avatar>
<mjo-avatar fallbackIcon="<svg>...</svg>" bordered color="primary"></mjo-avatar>
<mjo-avatar name="Jane" clickable value="jane-user" bordered color="success"></mjo-avatar>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";

@customElement("example-avatar-basic")
export class ExampleAvatarBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"></mjo-avatar>
                <mjo-avatar name="John Doe"></mjo-avatar>
                <mjo-avatar fallbackIcon="person" name="Fallback User"></mjo-avatar>
                <mjo-avatar name="Jane Smith" nameColoured></mjo-avatar>
            </div>
        `;
    }
}
```

## Sizes and Shapes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";

@customElement("example-avatar-sizes")
export class ExampleAvatarSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Sizes</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar name="S" size="small"></mjo-avatar>
                        <mjo-avatar name="M" size="medium"></mjo-avatar>
                        <mjo-avatar name="L" size="large"></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Border Radius</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar name="□" radius="none"></mjo-avatar>
                        <mjo-avatar name="▢" radius="small"></mjo-avatar>
                        <mjo-avatar name="▣" radius="medium"></mjo-avatar>
                        <mjo-avatar name="●" radius="full"></mjo-avatar>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Colors and Interactive Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";

@customElement("example-avatar-interactive")
export class ExampleAvatarInteractive extends LitElement {
    @state() private lastClicked = "";

    private handleAvatarClick(event: CustomEvent) {
        this.lastClicked = event.detail.value;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Bordered Colors</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar name="P" bordered color="primary"></mjo-avatar>
                        <mjo-avatar name="S" bordered color="secondary"></mjo-avatar>
                        <mjo-avatar name="✓" bordered color="success"></mjo-avatar>
                        <mjo-avatar name="⚠" bordered color="warning"></mjo-avatar>
                        <mjo-avatar name="!" bordered color="error"></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Clickable Avatars</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar name="Alice" nameColoured clickable value="alice" @mjo-avatar:click=${this.handleAvatarClick}></mjo-avatar>
                        <mjo-avatar name="Bob" nameColoured clickable value="bob" @mjo-avatar:click=${this.handleAvatarClick}></mjo-avatar>
                        <mjo-avatar name="Disabled" clickable disabled value="disabled"></mjo-avatar>
                    </div>
                    ${this.lastClicked ? html`<p>Last clicked: <strong>${this.lastClicked}</strong></p>` : ""}
                </div>
            </div>
        `;
    }
}
```

## ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoAvatarTheme } from "mjo-litui/types";
import "mjo-litui/mjo-avatar";

@customElement("example-avatar-themed")
export class ExampleAvatarThemed extends LitElement {
    private customTheme: MjoAvatarTheme = {
        backgroundColor: "#6366f1",
        borderWidth: "3px",
        fallbackColor: "#ffffff",
        nameColor: "#ffffff",
        sizeSmall: "36px",
        sizeMedium: "48px",
        sizeLarge: "64px",
    };

    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-avatar name="T" size="small" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                <mjo-avatar name="H" size="medium" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                <mjo-avatar name="E" size="large" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name              | Type                                                                                   | Default     | Reflects | Description                                                              |
| ----------------- | -------------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------------------ |
| `src`             | `string \| undefined`                                                                  | `undefined` | no       | Image URL to display in the avatar                                       |
| `alt`             | `string \| undefined`                                                                  | `undefined` | no       | Alternative text for the image (falls back to `name` if not provided)    |
| `name`            | `string \| undefined`                                                                  | `undefined` | no       | Name used to generate initials when image is not available               |
| `size`            | `"small" \| "medium" \| "large"`                                                       | `"medium"`  | no       | Controls the overall size of the avatar                                  |
| `radius`          | `"small" \| "medium" \| "large" \| "full" \| "none"`                                   | `"full"`    | no       | Border radius applied to the avatar (full = circle)                      |
| `color`           | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "info" \| "error"` | `"default"` | no       | Color scheme for borders when `bordered` is true                         |
| `bordered`        | `boolean`                                                                              | `false`     | yes      | Adds a colored border around the avatar                                  |
| `disabled`        | `boolean`                                                                              | `false`     | yes      | Applies disabled styling (reduced opacity)                               |
| `clickable`       | `boolean`                                                                              | `false`     | no       | Makes the avatar clickable and dispatches `mjo-avatar:click` events      |
| `nameColoured`    | `boolean`                                                                              | `false`     | no       | Applies automatic color generation based on the first letter of the name |
| `fallbackIcon`    | `string \| undefined`                                                                  | `undefined` | no       | Custom icon to use as fallback when image and name are not available     |
| `value`           | `string \| undefined`                                                                  | `undefined` | no       | Custom value passed in the `mjo-avatar:click` event detail               |
| `ariaDescribedby` | `string \| undefined`                                                                  | `undefined` | no       | References additional descriptive content for screen readers             |

### Accessibility Properties (Native Lit Support)

The component supports standard HTML accessibility attributes through Lit's native property binding:

| Attribute       | Usage                                     | Description                                           |
| --------------- | ----------------------------------------- | ----------------------------------------------------- |
| `aria-label`    | `aria-label="Custom avatar description"`  | Provides accessible label for screen readers          |
| `tabindex`      | `tabindex="0"` or `tabindex="-1"`         | Controls keyboard navigation (automatically managed)  |
| `role`          | Automatically set based on context        | Dynamic: `"button"`, `"img"`, or `"presentation"`     |
| `aria-disabled` | Automatically set when `disabled` is true | Communicates disabled state to assistive technologies |

### Internal State

| Name      | Type      | Description                                       |
| --------- | --------- | ------------------------------------------------- |
| `initial` | `string`  | First letter of the name, automatically uppercase |
| `error`   | `boolean` | Indicates if the image failed to load             |

## Slots

| Slot      | Description                                                   |
| --------- | ------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via properties |

## Events

| Event              | Detail                | Emitted When                         | Notes                                                             |
| ------------------ | --------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| `mjo-avatar:click` | `{ value: string }`   | Avatar is clicked (when `clickable`) | Contains `value` prop or `name` prop as fallback, or empty string |
| `mjo-avatar:error` | `{ message: string }` | Image fails to load                  | Provides error message for debugging and accessibility purposes   |

## CSS Parts

| Part              | Description                                        |
| ----------------- | -------------------------------------------------- |
| `container`       | The main avatar container element                  |
| `image-container` | The image/content container                        |
| `image`           | The actual image element (when using src)          |
| `icon`            | The fallback icon element (exported from mjo-icon) |

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Size Variables

| Variable                   | Fallback | Used For                 |
| -------------------------- | -------- | ------------------------ |
| `--mjo-avatar-size-small`  | `32px`   | Small avatar dimensions  |
| `--mjo-avatar-size-medium` | `44px`   | Medium avatar dimensions |
| `--mjo-avatar-size-large`  | `54px`   | Large avatar dimensions  |

### Fallback Icon and Text Sizes

| Variable                            | Fallback | Used For                       |
| ----------------------------------- | -------- | ------------------------------ |
| `--mjo-avatar-fallback-size-small`  | `18px`   | Small fallback icon/text size  |
| `--mjo-avatar-fallback-size-medium` | `28px`   | Medium fallback icon/text size |
| `--mjo-avatar-fallback-size-large`  | `40px`   | Large fallback icon/text size  |

### Border Radius Variables

| Variable                     | Fallback | Used For                    |
| ---------------------------- | -------- | --------------------------- |
| `--mjo-avatar-radius-small`  | `4px`    | Small border radius option  |
| `--mjo-avatar-radius-medium` | `8px`    | Medium border radius option |
| `--mjo-avatar-radius-large`  | `12px`   | Large border radius option  |

### Color Variables

| Variable                                  | Fallback               | Used For                                    |
| ----------------------------------------- | ---------------------- | ------------------------------------------- |
| `--mjo-avatar-background-color`           | `--mjo-color-gray-400` | Default background color                    |
| `--mjo-avatar-fallback-color`             | `--mjo-color-gray-100` | Fallback icon color                         |
| `--mjo-avatar-name-color`                 | `--mjo-color-gray-100` | Name initial text color (when not colored)  |
| `--mjo-avatar-name-auto-background-color` | Computed               | Auto-generated background for colored names |
| `--mjo-avatar-name-auto-foreground-color` | Computed               | Auto-generated text color for colored names |
| `--mjo-avatar-border-color`               | `--mjo-color-gray-300` | Default border color                        |

### Border Variables

| Variable                    | Fallback | Used For         |
| --------------------------- | -------- | ---------------- |
| `--mjo-avatar-border-width` | `2px`    | Border thickness |

### Focus and Accessibility Variables

| Variable            | Fallback              | Used For            |
| ------------------- | --------------------- | ------------------- |
| `--mjo-focus-color` | `--mjo-primary-color` | Focus outline color |

### Semantic Border Colors

The component uses the global semantic color system for border colors:

-   `--mjo-primary-color` (primary)
-   `--mjo-secondary-color` (secondary)
-   `--mjo-success-color` (success)
-   `--mjo-warning-color` (warning)
-   `--mjo-info-color` (info)
-   `--mjo-error-color` (error)

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-avatar-{property-name}`.

### MjoAvatarTheme Interface

```ts
interface MjoAvatarTheme {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    fallbackColor?: string;
    fallbackSizeSmall?: string;
    fallbackSizeMedium?: string;
    fallbackSizeLarge?: string;
    nameColor?: string;
    nameAutoBackgroundColor?: string;
    nameAutoForegroundColor?: string;
    radiusSmall?: string;
    radiusMedium?: string;
    radiusLarge?: string;
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoAvatarTheme } from "mjo-litui/types";
import "mjo-litui/mjo-avatar";

@customElement("example-avatar-themed")
export class ExampleAvatarThemed extends LitElement {
    private customTheme: MjoAvatarTheme = {
        backgroundColor: "#6366f1",
        borderWidth: "3px",
        fallbackColor: "#ffffff",
        nameColor: "#ffffff",
        sizeSmall: "36px",
        sizeMedium: "48px",
        sizeLarge: "64px",
        radiusSmall: "6px",
        radiusMedium: "12px",
        radiusLarge: "18px",
    };

    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-avatar name="Themed" size="small" radius="small" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                <mjo-avatar name="Custom" size="medium" radius="medium" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                <mjo-avatar name="Avatar" size="large" radius="large" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
            </div>
        `;
    }
}
```

## Accessibility Features

The `mjo-avatar` component includes comprehensive accessibility support:

### Automatic Accessibility Features

-   **Dynamic Roles**: Automatically sets appropriate `role` attributes:

    -   `role="button"` for clickable avatars
    -   `role="img"` for avatars with images
    -   `role="presentation"` for purely decorative avatars

-   **ARIA Labels**: Intelligent `aria-label` generation:

    -   Clickable: "Click to interact with [name/value/avatar]"
    -   Named: "Avatar for [name]"
    -   Generic: "Avatar"

-   **Keyboard Navigation**: Full keyboard support:

    -   `Enter` and `Space` keys activate clickable avatars
    -   Automatic `tabindex` management (0 for clickable, -1 for non-clickable)
    -   Visual focus indicators with `:focus-visible`

-   **State Communication**:
    -   `aria-disabled="true"` when avatar is disabled
    -   Proper state changes communicated to screen readers

### Motion and Preference Support

-   **Reduced Motion**: Respects `prefers-reduced-motion` user setting
-   **Focus Management**: Clear visual focus indicators for keyboard users
-   **Color Contrast**: Automatic color generation considers readability

## Summary

`<mjo-avatar>` provides a comprehensive solution for displaying user avatars with intelligent fallback handling, automatic color generation, extensive customization options, and full accessibility support. The component gracefully handles image loading failures, supports multiple display modes (image, custom fallback icons, initials), and integrates seamlessly with the global design system.

Key features include:

-   **Smart Fallback System**: Prioritizes image → custom fallback icon → name initials → empty state
-   **Interactive Capabilities**: Optional `clickable` behavior with custom event values
-   **Automatic Color Generation**: `nameColoured` creates consistent colors based on initials
-   **Extensive Customization**: ThemeMixin support for instance-specific styling
-   **Semantic Color System**: Integrates with the global design tokens
-   **Full Accessibility Support**: WCAG 2.1 compliant with keyboard navigation, screen reader support, and dynamic ARIA attributes
-   **Error Handling**: Graceful fallback with `mjo-avatar:error` events for debugging
-   **Motion Preferences**: Respects user's `prefers-reduced-motion` setting

### Usage Best Practices

-   Use meaningful `alt` text for images or `aria-label` for better accessibility
-   Leverage the `nameColoured` feature for consistent visual identity
-   Implement `mjo-avatar:error` event handlers for graceful error handling
-   Use the semantic color system (`color` property) for consistent theming
-   Consider the `clickable` property for interactive user interfaces
-   Apply ThemeMixin for instance-specific customizations while maintaining design consistency
