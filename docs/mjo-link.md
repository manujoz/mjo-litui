# mjo-link

Accessible and versatile link component with button-like variants, comprehensive ARIA support, and extensive theming capabilities. Supports both traditional anchor functionality and button-like interactions with preventDefault handling.

## HTML Usage

```html
<mjo-link href="/about">About Us</mjo-link>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-link";

@customElement("example-link-basic")
export class ExampleLinkBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-link href="/home">Home Page</mjo-link>
                <mjo-link href="/about" color="primary">About Us</mjo-link>
                <mjo-link href="/contact" color="secondary">Contact</mjo-link>
                <mjo-link href="https://example.com" target="_blank">External Link</mjo-link>
            </div>
        `;
    }
}
```

## Accessibility Features Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-link";

@customElement("example-link-accessibility")
export class ExampleLinkAccessibility extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <!-- Link with ARIA label for screen readers -->
                <mjo-link href="/profile" aria-label="View your user profile settings"> Profile </mjo-link>

                <!-- Current page indicator -->
                <mjo-link href="/dashboard" aria-current="page" color="primary"> Dashboard </mjo-link>

                <!-- Link with description -->
                <mjo-link href="/help" aria-describedby="help-description"> Help Center </mjo-link>
                <div id="help-description">Access comprehensive documentation and support</div>

                <!-- Disabled link -->
                <mjo-link disabled>Coming Soon</mjo-link>
            </div>
        `;
    }
}
```

## Variants and Typography Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-link";

@customElement("example-link-variants")
export class ExampleLinkVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <!-- Typography sizes -->
                <div>
                    <h4>Typography Sizes</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-link href="#" size="heading1" weight="bold">Heading 1 Link</mjo-link>
                        <mjo-link href="#" size="heading2" weight="medium">Heading 2 Link</mjo-link>
                        <mjo-link href="#" size="base" weight="regular">Base Size Link</mjo-link>
                        <mjo-link href="#" size="body1" weight="light">Body 1 Link</mjo-link>
                        <mjo-link href="#" size="body2">Body 2 Link</mjo-link>
                    </div>
                </div>

                <!-- Button variants -->
                <div>
                    <h4>Button Variants</h4>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <mjo-link href="/action" variant="button" color="primary">Primary Button</mjo-link>
                        <mjo-link href="/action" variant="ghost" color="secondary">Ghost Button</mjo-link>
                        <mjo-link href="/action" variant="flat" color="primary">Flat Button</mjo-link>
                        <mjo-link href="/action" variant="dashed">Dashed Button</mjo-link>
                    </div>
                </div>

                <!-- Special behaviors -->
                <div>
                    <h4>Special Behaviors</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <mjo-link href="#" nodecor>No decoration on hover</mjo-link>
                        <mjo-link href="#" cover>Cover link (fills container)</mjo-link>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## PreventDefault and Custom Events Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoLinkClickEvent } from "mjo-litui/types";
import "mjo-litui/mjo-link";

@customElement("example-link-events")
export class ExampleLinkEvents extends LitElement {
    private handleLinkClick(event: MjoLinkClickEvent) {
        console.log("Link clicked:", event.detail.href);
        // Handle custom navigation logic here
        // For example: router navigation, analytics tracking, etc.
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-link href="/custom-nav" preventDefault @mjo-link:click=${this.handleLinkClick}> Custom Navigation Handler </mjo-link>

                <mjo-link href="/analytics-tracked" preventDefault @mjo-link:click=${this.handleLinkClick}> Analytics Tracked Link </mjo-link>
            </div>
        `;
    }
}
```

## Theme Customization Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ThemeMixin } from "mjo-litui/mixins";
import "mjo-litui/mjo-link";

@customElement("example-link-themed")
export class ExampleLinkThemed extends ThemeMixin(LitElement) {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem;">
                <h3>Component-Level Link Theming</h3>

                <!-- Custom brand theme -->
                <mjo-link
                    href="/brand"
                    .theme=${{
                        colorPrimary: "#ff6b35",
                        fontWeight: "600",
                        textDecorationHover: "none",
                        focusOutlineColor: "#ff6b35",
                        transition: "all 0.3s ease",
                    }}
                    color="primary"
                >
                    Custom Brand Link
                </mjo-link>

                <!-- Elegant theme -->
                <mjo-link
                    href="/elegant"
                    .theme=${{
                        colorDefault: "#2c3e50",
                        fontFamily: "'Playfair Display', serif",
                        textDecoration: "underline",
                        textDecorationHover: "none",
                        focusOutline: "2px dotted #2c3e50",
                        focusOutlineOffset: "4px",
                    }}
                >
                    Elegant Typography Link
                </mjo-link>

                <!-- Minimal theme -->
                <mjo-link
                    href="/minimal"
                    .theme=${{
                        colorSecondary: "#6c757d",
                        textDecoration: "none",
                        textDecorationHover: "underline",
                        transition: "color 0.15s ease-in-out",
                    }}
                    color="secondary"
                >
                    Minimal Design Link
                </mjo-link>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name              | Type                                                                                | Default     | Description                                                  |
| ----------------- | ----------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `href`            | `string`                                                                            | -           | The URL the link should navigate to                          |
| `target`          | `"_self" \| "_blank" \| "_parent" \| "_top"`                                        | `"_self"`   | Where to open the linked document                            |
| `rel`             | `string`                                                                            | -           | Relationship between current and linked document             |
| `color`           | `"primary" \| "secondary" \| "default"`                                             | `"default"` | Color variant of the link                                    |
| `variant`         | `"ghost" \| "dashed" \| "link" \| "text" \| "flat" \| "button"`                     | `"link"`    | Visual style variant                                         |
| `size`            | `"heading1" \| "heading2" \| "heading3" \| "base" \| "body1" \| "body2" \| "body3"` | `"base"`    | Typography size                                              |
| `weight`          | `"light" \| "regular" \| "medium" \| "bold"`                                        | `"regular"` | Font weight                                                  |
| `disabled`        | `boolean`                                                                           | `false`     | Disable the link interaction                                 |
| `cover`           | `boolean`                                                                           | `false`     | Make link cover the entire container                         |
| `nodecor`         | `boolean`                                                                           | `false`     | Prevent text decoration on hover                             |
| `preventDefault`  | `boolean`                                                                           | `false`     | Prevent default navigation and emit custom event             |
| `ariaLabel`       | `string \| null`                                                                    | `null`      | Accessible label for screen readers                          |
| `ariaLabelledBy`  | `string`                                                                            | -           | ID of element that labels this link                          |
| `ariaDescribedBy` | `string`                                                                            | -           | ID of element that describes this link                       |
| `ariaCurrent`     | `string \| null`                                                                    | `null`      | Indicates current item in a set (page, step, location, etc.) |

## Slots

| Slot      | Description                                   |
| --------- | --------------------------------------------- |
| (default) | Link content (text, icons, or other elements) |

## Events

| Event            | Type                | Description                                            |
| ---------------- | ------------------- | ------------------------------------------------------ |
| `mjo-link:click` | `MjoLinkClickEvent` | Fired when link is clicked with `preventDefault: true` |

### Event Details

```ts
interface MjoLinkClickEvent extends CustomEvent {
    detail: {
        link: MjoLink; // Reference to the link component
        href?: string; // The href value that was prevented
    };
}
```

## CSS Custom Properties

### Core Colors

| Variable                     | Default                           | Description             |
| ---------------------------- | --------------------------------- | ----------------------- |
| `--mjo-link-color-primary`   | `--mjo-primary-color`             | Primary color variant   |
| `--mjo-link-color-secondary` | `--mjo-secondary-color`           | Secondary color variant |
| `--mjo-link-color-default`   | `currentColor`                    | Default text color      |
| `--mjo-link-color-disabled`  | `--mjo-disabled-foreground-color` | Disabled state color    |

### Typography & Decoration

| Variable                           | Default     | Description              |
| ---------------------------------- | ----------- | ------------------------ |
| `--mjo-link-font-family`           | `inherit`   | Font family              |
| `--mjo-link-font-weight`           | `inherit`   | Font weight              |
| `--mjo-link-text-decoration`       | `none`      | Text decoration          |
| `--mjo-link-text-decoration-hover` | `underline` | Text decoration on hover |

### Focus & Interaction

| Variable                          | Default                    | Description                 |
| --------------------------------- | -------------------------- | --------------------------- |
| `--mjo-link-focus-outline`        | `2px solid`                | Focus outline style         |
| `--mjo-link-focus-outline-color`  | `--mjo-primary-color`      | Focus outline color         |
| `--mjo-link-focus-outline-width`  | `3px` (high contrast mode) | Focus outline width         |
| `--mjo-link-focus-outline-offset` | `2px`                      | Focus outline offset        |
| `--mjo-link-focus-border-radius`  | `2px`                      | Focus outline border radius |

### Animation

| Variable                | Default                                      | Description          |
| ----------------------- | -------------------------------------------- | -------------------- |
| `--mjo-link-transition` | `color 0.2s ease, text-decoration 0.2s ease` | Transition animation |

## ThemeMixin Customization

This component implements `ThemeMixin`, enabling component-specific theming through the `MjoLinkTheme` interface.

### MjoLinkTheme Interface

```ts
interface MjoLinkTheme {
    colorPrimary?: string;
    colorSecondary?: string;
    colorDefault?: string;
    colorDisabled?: string;
    fontFamily?: string;
    fontWeight?: string;
    textDecoration?: string;
    textDecorationHover?: string;
    focusOutline?: string;
    focusOutlineColor?: string;
    focusOutlineWidth?: string;
    focusOutlineOffset?: string;
    transition?: string;
}
```

### Global Theme Configuration

```ts
import "mjo-litui/mjo-theme";

const customTheme = {
    components: {
        mjoLink: {
            colorPrimary: "#007bff",
            colorSecondary: "#6c757d",
            fontWeight: "500",
            textDecorationHover: "none",
            focusOutlineColor: "#007bff",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        },
    },
};
```

## Accessibility Features

### WCAG 2.1 Compliance

-   **Focus Management**: Proper focus indicators with customizable outline
-   **Screen Reader Support**: Full ARIA label and description support
-   **High Contrast**: Enhanced visibility in high contrast mode
-   **Keyboard Navigation**: Full keyboard accessibility
-   **Motion Respect**: Honors `prefers-reduced-motion` settings

### Best Practices

```ts
// ✅ Good: Descriptive link text
html`<mjo-link href="/contact">Contact Us</mjo-link>`;

// ✅ Good: ARIA label for context
html`<mjo-link href="/profile" aria-label="View your user profile">Profile</mjo-link>`;

// ✅ Good: Current page indication
html`<mjo-link href="/dashboard" aria-current="page">Dashboard</mjo-link>`;

// ❌ Avoid: Generic link text without context
html`<mjo-link href="/more">Click here</mjo-link>`;

// ❌ Avoid: External links without indication
html`<mjo-link href="https://example.com">External</mjo-link>`;
// Better:
html`<mjo-link href="https://example.com" target="_blank" aria-label="External link (opens in new tab)">External</mjo-link>`;
```

### Screen Reader Considerations

-   Links without `href` are treated as buttons with appropriate ARIA roles
-   External links (`target="_blank"`) automatically get `rel="noopener noreferrer"`
-   Disabled links use both `aria-disabled` and visual indication
-   Current page/section indication through `aria-current`

## Performance Considerations

-   **CSS Variables**: Efficient theming without style recalculation
-   **Event Delegation**: Minimal event listener overhead
-   **Lazy Evaluation**: Computed properties only run when needed
-   **Small Bundle**: Minimal dependencies and optimized imports

## Browser Support

-   Modern browsers with Web Components support
-   Graceful degradation in older browsers
-   Full accessibility features in all supported browsers

## Related Components

-   [mjo-button](./mjo-button.md) - For action buttons
-   [mjo-typography](./mjo-typography.md) - For text styling
-   [mjo-theme](./mjo-theme.md) - For global theming

## Summary

`<mjo-link>` provides a comprehensive solution for link functionality with:

-   **Complete Accessibility**: WCAG 2.1 compliant with comprehensive ARIA support
-   **Flexible Variants**: Traditional links and button-like appearances
-   **Typography Integration**: Consistent sizing with the typography system
-   **Custom Events**: preventDefault handling for SPA navigation
-   **Comprehensive Theming**: Global and component-level customization
-   **Performance Optimized**: Efficient rendering and minimal overhead
-   **Modern Features**: Focus management, reduced motion support, high contrast mode

The component seamlessly integrates with modern web applications while maintaining excellent accessibility and user experience standards.
