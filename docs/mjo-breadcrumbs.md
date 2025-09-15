# mjo-breadcrumbs

Navigation breadcrumbs component that displays a hierarchical path to help users understand their current location within an application. Features automatic horizontal scroll shadows when content overflows, excellent accessibility support including ARIA compliance, keyboard navigation, and screen reader compatibility.

## Features

-   **Automatic Horizontal Scroll**: When breadcrumbs exceed container width, horizontal scroll shadows are automatically enabled
-   **Accessibility Compliant**: Full WCAG 2.1 support with proper ARIA attributes and keyboard navigation
-   **Visual Variants**: Multiple styles including default, solid, and bordered variants
-   **Icon Support**: Optional icons for enhanced visual hierarchy
-   **Custom Separators**: Configurable separator icons between breadcrumb items
-   **Event Handling**: Custom navigation events for application integration

## Installation

```bash
npm install mjo-litui
```

## Horizontal Scroll Shadow

The component automatically enables horizontal scroll shadows when the breadcrumb content exceeds the container width. This provides visual cues about scrollable content while maintaining accessibility.

### How it Works

-   **Automatic Detection**: The component uses a `ResizeObserver` to detect when content overflows
-   **Scroll Shadows**: Gradient shadows appear at the edges to indicate scrollable content
-   **Auto-scroll to End**: When items are updated, the component automatically scrolls to show the current (last) item
-   **Smooth Scrolling**: All scroll animations use smooth behavior for better user experience

### Key Features

-   **Responsive**: Adapts to container size changes automatically
-   **Accessible**: Maintains full keyboard navigation and screen reader support during horizontal scrolling
-   **Performance**: Uses efficient shadow updates only when necessary
-   **Visual Integration**: Shadows match the component's background color automatically

### Example Usage

```html
<!-- Long breadcrumb that will activate horizontal scrolling -->
<mjo-breadcrumbs style="max-width: 400px;">
    <!-- Component will automatically enable horizontal scroll when content overflows -->
</mjo-breadcrumbs>
```

The scroll shadow functionality is powered by the internal `mjo-scrollshadow` component and requires no additional configuration.

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
        console.log(`Navigating to: ${item.label}`, { index, href });
        // Update your router or application state here
    }

    render() {
        return html` <mjo-breadcrumbs .items=${this.items} @mjo-breadcrumbs:navigate=${this.handleNavigation}></mjo-breadcrumbs> `;
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
                            linkHoverColor: "#007bff",
                        },
                    },
                }}
            >
                <mjo-breadcrumbs
                    .items=${[{ label: "Store", href: "/store" }, { label: "Category", href: "/store/category" }, { label: "Product Details" }]}
                    variant="solid"
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

## CSS Parts

The component exposes the following CSS parts for styling:

| Part Name        | Description                                           | Element          |
| ---------------- | ----------------------------------------------------- | ---------------- |
| `container`      | The main navigation container                         | `<nav>`          |
| `list`           | The ul element containing breadcrumb items            | `<ul>`           |
| `list-item`      | Individual li elements for each breadcrumb            | `<li>`           |
| `link`           | Link elements for navigable breadcrumbs (exportparts) | `mjo-link`       |
| `link-text`      | Text content within link elements (exportparts)       | `mjo-link`       |
| `icon`           | Icons within breadcrumb items (exportparts)           | `mjo-icon`       |
| `active-icon`    | Icons within active/current items (exportparts)       | `mjo-icon`       |
| `active-text`    | Typography for active/current items (exportparts)     | `mjo-typography` |
| `icon-separator` | Separator icons between items (exportparts)           | `mjo-icon`       |

### CSS Parts Usage Example

```css
/* Style the main container */
mjo-breadcrumbs::part(container) {
    background: var(--custom-background);
    border-radius: 8px;
}

/* Style individual breadcrumb items */
mjo-breadcrumbs::part(list-item) {
    padding: 4px 8px;
}

/* Style the active text */
mjo-breadcrumbs::part(active-text) {
    font-weight: 700;
    color: var(--custom-active-color);
}

/* Style separator icons */
mjo-breadcrumbs::part(icon-separator) {
    opacity: 0.5;
}
```

## CSS Custom Properties

### Component Variables

| Variable                                | Default                                         | Description                                  |
| --------------------------------------- | ----------------------------------------------- | -------------------------------------------- |
| `--mjo-breadcrumbs-font-family`         | `inherit`                                       | Font family for the breadcrumbs              |
| `--mjo-breadcrumbs-background-color`    | `var(--mjo-background-color-card)`              | Background color for solid/bordered variants |
| `--mjo-breadcrumbs-border-color`        | `var(--mjo-border-color)`                       | Border color for bordered variant            |
| `--mjo-breadcrumbs-border-radius`       | `var(--mjo-radius-medium)`                      | Border radius for containers                 |
| `--mjo-breadcrumbs-padding`             | `var(--mjo-space-small) var(--mjo-space-small)` | Internal padding                             |
| `--mjo-breadcrumbs-font-size`           | `inherit`                                       | Base font size                               |
| `--mjo-breadcrumbs-font-weight`         | `inherit`                                       | Base font weight                             |
| `--mjo-breadcrumbs-text-color`          | `var(--mjo-foreground-color-low)`               | Text color for inactive items                |
| `--mjo-breadcrumbs-link-hover-color`    | `var(--mjo-primary-color)`                      | Hover color for links                        |
| `--mjo-breadcrumbs-current-font-weight` | `600`                                           | Font weight for current/active item          |
| `--mjo-breadcrumbs-separator-color`     | `var(--mjo-foreground-color-low)`               | Color for separator icons                    |

### Link Component Variables

The component also inherits variables from the `mjo-link` component:

| Variable                           | Description                   |
| ---------------------------------- | ----------------------------- |
| `--mjo-link-text-decoration-hover` | Link text decoration on hover |
| `--mjo-link-focus-outline-color`   | Focus outline color for links |

### Global Design Tokens

The component uses global design tokens for consistent theming:

-   `--mjo-primary-color`, `--mjo-secondary-color`
-   `--mjo-foreground-color-low`
-   `--mjo-space-small`, `--mjo-space-xsmall`
-   `--mjo-radius-medium`
-   `--mjo-background-color-card`
-   `--mjo-border-color`

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
<!-- ✅ Good: Proper semantic structure -->
<mjo-breadcrumbs .items="${items}" aria-label="Current page location"></mjo-breadcrumbs>

<!-- ✅ Good: Connected to page context -->
<h1 id="page-title">Product Details</h1>
<mjo-breadcrumbs .items="${items}" aria-labelledby="page-title"></mjo-breadcrumbs>

<!-- ❌ Avoid: Missing ARIA labels -->
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
            linkHoverColor: "#0056b3",
            separatorColor: "#6c757d",
        },
    },
};
```

### Component-Level Theming

```ts
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
                label: segment.charAt(0).toUpperCase() + segment.slice(1),
                href: isLast ? undefined : currentPath,
                active: isLast,
            });
        });

        return items;
    }

    render() {
        return html` <mjo-breadcrumbs .items=${this.breadcrumbItems}></mjo-breadcrumbs> `;
    }
}
```

### Router Integration

```ts
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

-   **Automatic Horizontal Scroll**: Smart scroll shadows when content overflows container width
-   **Full Accessibility**: WCAG 2.1 compliant with ARIA support and keyboard navigation
-   **Custom Events**: Flexible navigation events with `mjo-breadcrumbs:navigate`
-   **Visual Variants**: Multiple styles (default, solid, bordered) with comprehensive CSS variables
-   **Icon Support**: Optional icons for enhanced visual hierarchy
-   **Theme Integration**: Full support for global and component-level theming
-   **TypeScript Support**: Complete type definitions for all interfaces

Use breadcrumbs for hierarchical navigation, settings panels, multi-step processes, and any scenario where users need to understand their current location. The component automatically handles scroll overflow and accessibility concerns while providing full customization control.

### Accessibility Compliance

The component follows WCAG 2.1 guidelines and implements proper semantic structure, ARIA attributes, keyboard navigation, and screen reader support, ensuring compatibility with assistive technologies and inclusive user experiences.
