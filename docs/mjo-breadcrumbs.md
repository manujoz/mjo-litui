# mjo-breadcrumbs

Navigation breadcrumbs component that displays a hierarchical path to help users understand their current location within an application. Provides excellent accessibility support including ARIA compliance, keyboard navigation, and screen reader compatibility.

## Installation

```bash
npm install mjo-litui
```

## Usage

### Basic HTML

```html
<mjo-breadcrumbs id="breadcrumbs"></mjo-breadcrumbs>

<script>
    const breadcrumbs = document.getElementById("breadcrumbs");
    breadcrumbs.items = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Electronics", href: "/products/electronics" },
        { label: "Current Product", active: true },
    ];
</script>
```

### With Lit Element

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-breadcrumbs";
import type { MjoBreadcrumbsItems } from "mjo-litui/types";

@customElement("example-breadcrumbs-basic")
export class ExampleBreadcrumbsBasic extends LitElement {
    @state() private breadcrumbItems: MjoBreadcrumbsItems = [
        { label: "Home", href: "/" },
        { label: "Documentation", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: "Breadcrumbs", active: true },
    ];

    render() {
        return html` <mjo-breadcrumbs .items=${this.breadcrumbItems} color="primary" size="medium" variant="default"></mjo-breadcrumbs> `;
    }
}
```

## Examples

### With Icons

```ts
import { FaHome, FaFolder } from "mjo-icons/fa";
import type { MjoBreadcrumbsItems } from "mjo-litui/types";

@customElement("example-breadcrumbs-icons")
export class ExampleBreadcrumbsIcons extends LitElement {
    @state() private items: MjoBreadcrumbsItems = [
        { label: "Home", href: "/", icon: FaHome },
        { label: "Projects", href: "/projects", icon: FaFolder },
        { label: "Current Project" },
    ];

    render() {
        return html` <mjo-breadcrumbs .items=${this.items} variant="solid" color="secondary" size="large"></mjo-breadcrumbs> `;
    }
}
```

### Navigation with Events

```ts
import type { MjoBreadcrumbsNavigateEvent } from "mjo-litui/types";

@customElement("example-breadcrumbs-navigation")
export class ExampleBreadcrumbsNavigation extends LitElement {
    @state() private items: MjoBreadcrumbsItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", href: "/settings" },
        { label: "Profile", active: true },
    ];

    private handleNavigation(event: MjoBreadcrumbsNavigateEvent) {
        const { item, index, href } = event.detail;

        // Custom navigation logic
        console.log(`Navigating to: ${item.label}`, { index, href });

        // Update your router or application state
        // this.router.navigate(href);
    }

    render() {
        return html` <mjo-breadcrumbs .items=${this.items} @mjo-breadcrumbs:navigate=${this.handleNavigation}></mjo-breadcrumbs> `;
    }
}
```

### Accessibility Enhanced

```ts
@customElement("example-breadcrumbs-accessibility")
export class ExampleBreadcrumbsAccessibility extends LitElement {
    render() {
        return html`
            <div>
                <h2 id="page-title">User Profile Settings</h2>
                <p id="breadcrumb-help">Use breadcrumbs to navigate back to parent sections</p>

                <mjo-breadcrumbs
                    .items=${[
                        { label: "Home", href: "/" },
                        { label: "Users", href: "/users" },
                        { label: "Profile Settings", active: true },
                    ]}
                    aria-label="Current page location"
                    aria-labelledby="page-title"
                    aria-describedby="breadcrumb-help"
                    color="primary"
                    variant="bordered"
                ></mjo-breadcrumbs>
            </div>
        `;
    }
}
```

### Theme Integration

```ts
import "mjo-litui/mjo-theme";

@customElement("example-breadcrumbs-theme")
export class ExampleBreadcrumbsTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .config=${{
                    components: {
                        mjoBreadcrumbs: {
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                            currentColor: "#495057",
                            linkHoverColor: "#007bff",
                            separatorColor: "#6c757d",
                        },
                    },
                }}
            >
                <mjo-breadcrumbs
                    .items=${[{ label: "Store", href: "/store" }, { label: "Category", href: "/store/category" }, { label: "Product Details" }]}
                    variant="solid"
                    .theme=${{
                        mjoBreadcrumbs: {
                            padding: "12px 16px",
                            fontSize: "14px",
                        },
                    }}
                ></mjo-breadcrumbs>
            </mjo-theme>
        `;
    }
}
```

## Attributes / Properties

| Name               | Type                                 | Default        | Description                                       |
| ------------------ | ------------------------------------ | -------------- | ------------------------------------------------- |
| `size`             | `"small" \| "medium" \| "large"`     | `"medium"`     | Controls the overall size of the breadcrumbs      |
| `color`            | `"primary" \| "secondary"`           | `"primary"`    | Color scheme for links and hover states           |
| `variant`          | `"default" \| "solid" \| "bordered"` | `"default"`    | Visual style variant                              |
| `items`            | `MjoBreadcrumbsItems`                | `[]`           | Array of breadcrumb items to display              |
| `autoNavigate`     | `boolean`                            | `false`        | When true, prevents custom navigation events      |
| `separator`        | `string`                             | `undefined`    | Custom separator icon (overrides default chevron) |
| `aria-label`       | `string`                             | `"breadcrumb"` | Accessible label for the navigation               |
| `aria-labelledby`  | `string`                             | `undefined`    | References element that labels the breadcrumbs    |
| `aria-describedby` | `string`                             | `undefined`    | References element that describes the breadcrumbs |

### MjoBreadcrumbsItems Type

```ts
type MjoBreadcrumbsItem = {
    label: string; // Display text for the breadcrumb
    href?: string; // URL for navigation (optional)
    active?: boolean; // Marks as current page (optional)
    icon?: string; // Icon to display before label (optional)
};

type MjoBreadcrumbsItems = MjoBreadcrumbsItem[];
```

## Events

| Event Name                 | Type                          | Description                                                                |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| `mjo-breadcrumbs:navigate` | `MjoBreadcrumbsNavigateEvent` | Fired when user clicks on a breadcrumb item (when `autoNavigate` is false) |

### MjoBreadcrumbsNavigateEvent

```ts
interface MjoBreadcrumbsNavigateEvent extends CustomEvent {
    detail: {
        item: MjoBreadcrumbsItem; // The clicked breadcrumb item
        index: number; // Index of the item in the items array
        href?: string; // URL if available
    };
}
```

## CSS Custom Properties

### Component Variables

| Variable                                | Default                                           | Description                                  |
| --------------------------------------- | ------------------------------------------------- | -------------------------------------------- |
| `--mjo-breadcrumbs-background-color`    | `var(--mjo-background-color-card)`                | Background color for solid/bordered variants |
| `--mjo-breadcrumbs-border-color`        | `var(--mjo-border-color)`                         | Border color for bordered variant            |
| `--mjo-breadcrumbs-border-radius`       | `var(--mjo-radius-medium)`                        | Border radius for containers                 |
| `--mjo-breadcrumbs-padding`             | `var(--mjo-space-xxsmall) var(--mjo-space-small)` | Internal padding                             |
| `--mjo-breadcrumbs-text-color`          | `var(--mjo-foreground-color-low)`                 | Text color for inactive items                |
| `--mjo-breadcrumbs-link-hover-color`    | `var(--mjo-primary-color)`                        | Hover color for links                        |
| `--mjo-breadcrumbs-current-color`       | `var(--mjo-foreground-color-high)`                | Color for current/active item                |
| `--mjo-breadcrumbs-current-font-weight` | `500`                                             | Font weight for current/active item          |
| `--mjo-breadcrumbs-separator-color`     | `var(--mjo-foreground-color-low)`                 | Color for separator icons                    |
| `--mjo-breadcrumbs-icon-top`            | `-1px`                                            | Top of icons                                 |
| `--mjo-breadcrumbs-icon-size`           | `1em`                                             | Size of icons                                |
| `--mjo-breadcrumbs-focus-outline`       | `2px solid var(--mjo-primary-color)`              | Focus outline for accessibility              |
| `--mjo-breadcrumbs-font-family`         | `inherit`                                         | Font family                                  |
| `--mjo-breadcrumbs-font-size`           | `inherit`                                         | Base font size                               |
| `--mjo-breadcrumbs-font-weight`         | `inherit`                                         | Base font weight                             |

### Global Design Tokens

The component also uses global design tokens for consistent theming:

-   `--mjo-primary-color`, `--mjo-secondary-color`
-   `--mjo-foreground-color-high`, `--mjo-foreground-color-low`
-   `--mjo-space-xxsmall`, `--mjo-space-small`, `--mjo-space-xsmall`
-   `--mjo-radius-medium`

## Accessibility Features

### WCAG 2.1 Compliance

-   **Semantic Structure**: Uses proper `<nav>`, `<ul>`, `<li>` markup
-   **ARIA Support**: Full support for `aria-label`, `aria-labelledby`, `aria-describedby`
-   **Current Page**: Uses `aria-current="page"` to identify the current location
-   **Screen Reader**: Decorative icons marked with `aria-hidden="true"`
-   **Keyboard Navigation**: Full keyboard support with focus management
-   **High Contrast**: Enhanced visibility in high contrast mode

### Keyboard Support

-   **Tab**: Navigate through clickable breadcrumb links
-   **Enter/Space**: Activate breadcrumb navigation
-   **Focus Management**: Clear focus indicators with customizable outline

### Screen Reader Support

-   **Landmark Navigation**: Breadcrumbs identified as navigation landmark
-   **Current Location**: Active item properly announced as current page
-   **Context Information**: Optional descriptions and labels for better context

### Best Practices

```html
<!-- ✅ Good: Semantic structure with proper labels -->
<nav aria-label="Breadcrumb navigation">
    <mjo-breadcrumbs .items="${items}" aria-label="Current page location"></mjo-breadcrumbs>
</nav>

<!-- ✅ Good: Connected to page context -->
<h1 id="page-title">Product Details</h1>
<mjo-breadcrumbs .items="${items}" aria-labelledby="page-title"></mjo-breadcrumbs>

<!-- ❌ Avoid: Missing context or labels -->
<mjo-breadcrumbs .items="${items}"></mjo-breadcrumbs>
```

## Theme Configuration

### Using mjo-theme Component

```ts
const breadcrumbsTheme = {
    components: {
        mjoBreadcrumbs: {
            backgroundColor: "#ffffff",
            borderColor: "#e9ecef",
            borderRadius: "6px",
            currentColor: "#212529",
            linkHoverColor: "#0056b3",
            separatorColor: "#6c757d",
        },
    },
};
```

### Component-Level Theming

```ts
// Apply theme directly to component instance
html`
    <mjo-breadcrumbs
        .items=${items}
        .theme=${{
            mjoBreadcrumbs: {
                padding: "8px 12px",
                fontSize: "12px",
                fontWeight: "500",
            },
        }}
    ></mjo-breadcrumbs>
`;
```

## Advanced Usage

### Dynamic Breadcrumbs

```ts
@customElement("example-dynamic-breadcrumbs")
export class ExampleDynamicBreadcrumbs extends LitElement {
    @state() private currentPath = "/dashboard/settings/profile";

    private get breadcrumbItems(): MjoBreadcrumbsItems {
        const segments = this.currentPath.split("/").filter(Boolean);
        const items: MjoBreadcrumbsItems = [{ label: "Home", href: "/" }];

        let currentPath = "";
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const isLast = index === segments.length - 1;

            items.push({
                label: this.formatSegment(segment),
                href: isLast ? undefined : currentPath,
                active: isLast,
            });
        });

        return items;
    }

    private formatSegment(segment: string): string {
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    render() {
        return html` <mjo-breadcrumbs .items=${this.breadcrumbItems}></mjo-breadcrumbs> `;
    }
}
```

### Integration with Router

```ts
// Example with a hypothetical router
@customElement("example-router-breadcrumbs")
export class ExampleRouterBreadcrumbs extends LitElement {
    private handleNavigation(event: MjoBreadcrumbsNavigateEvent) {
        const { href } = event.detail;
        if (href) {
            // Use your router's navigation method
            this.router.push(href);
        }
    }

    render() {
        return html` <mjo-breadcrumbs .items=${this.routerBreadcrumbs} @mjo-breadcrumbs:navigate=${this.handleNavigation}></mjo-breadcrumbs> `;
    }
}
```

## Summary

The `mjo-breadcrumbs` component provides a comprehensive navigation solution with:

-   **Full Accessibility**: WCAG 2.1 compliant with ARIA support
-   **Custom Events**: New event naming convention `mjo-breadcrumbs:navigate`
-   **Flexible Styling**: Multiple variants and comprehensive CSS variables
-   **Icon Support**: Optional icons for enhanced visual hierarchy
-   **Theme Integration**: Full support for global and component-level theming
-   **TypeScript Support**: Complete type definitions for all interfaces

Use breadcrumbs for hierarchical navigation, settings panels, multi-step processes, and any scenario where users need to understand their current location within a larger structure. The component automatically handles accessibility concerns while providing full customization control through CSS variables and theming.

### Accessibility Compliance

The component follows WCAG 2.1 guidelines and implements proper semantic structure, ARIA attributes, keyboard navigation, and screen reader support, ensuring compatibility with assistive technologies and inclusive user experiences.
