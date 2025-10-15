# mjo-breadcrumbs

Navigation breadcrumbs component for displaying hierarchical paths with horizontal scroll shadow support.

## Index

1. [Use Cases](#use-cases)
2. [Import](#import)
3. [Properties](#properties)
4. [Events](#events)
5. [CSS Variables](#css-variables)
6. [CSS Parts](#css-parts)
7. [Accessibility](#accessibility)
8. [Usage Examples](#usage-examples)
9. [Additional Notes](#additional-notes)

## Use Cases

The `mjo-breadcrumbs` component is designed for:

- Displaying hierarchical navigation paths in web applications
- Providing users with contextual awareness of their location within a site structure
- Enabling quick navigation back to parent sections
- Maintaining accessibility when breadcrumb content overflows horizontally
- Supporting custom styling through CSS variables and parts

## Import

```typescript
import "mjo-litui/mjo-breadcrumbs";
```

## Properties

| Property          | Type                                 | Default     | Description                                                               | Required |
| ----------------- | ------------------------------------ | ----------- | ------------------------------------------------------------------------- | -------- |
| `size`            | `"small" \| "medium" \| "large"`     | `"medium"`  | Size of the breadcrumb component                                          | No       |
| `color`           | `"primary" \| "secondary"`           | `"primary"` | Color scheme for links and hover states                                   | No       |
| `variant`         | `"default" \| "solid" \| "bordered"` | `"default"` | Visual style variant                                                      | No       |
| `items`           | `MjoBreadcrumbsItems`                | `[]`        | Array of breadcrumb items to display                                      | No       |
| `autoNavigate`    | `boolean`                            | `false`     | Whether to navigate automatically on click or emit event                  | No       |
| `separator`       | `string`                             | `undefined` | Custom separator icon (SVG string). If not provided, uses default chevron | No       |
| `preventDefault`  | `boolean`                            | `false`     | Prevents default link behavior for breadcrumb items                       | No       |
| `ariaLabelledBy`  | `string`                             | `undefined` | ID of element that labels the breadcrumbs navigation                      | No       |
| `ariaDescribedBy` | `string`                             | `undefined` | ID of element that describes the breadcrumbs navigation                   | No       |

### MjoBreadcrumbsItem Type

Each item in the `items` array has the following structure:

```typescript
{
  label: string;       // Display text for the breadcrumb
  href?: string;       // URL for navigation (optional)
  active?: boolean;    // Whether this is the active/current item (optional)
  icon?: string;       // SVG string for an icon (optional)
}
```

## Events

| Event                      | Type                          | Description                                                                   | Detail                                                       |
| -------------------------- | ----------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `mjo-breadcrumbs:navigate` | `MjoBreadcrumbsNavigateEvent` | Fired when a breadcrumb item is clicked (only when `autoNavigate` is `false`) | `{ item: MjoBreadcrumbsItem, index: number, href?: string }` |

## CSS Variables

| Variable                                | Description                                              | Default                                                    |
| --------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| `--mjo-breadcrumbs-font-family`         | Font family for breadcrumb text                          | `inherit`                                                  |
| `--mjo-breadcrumbs-font-size`           | Font size for breadcrumb items                           | `inherit`                                                  |
| `--mjo-breadcrumbs-font-weight`         | Font weight for breadcrumb items                         | `inherit`                                                  |
| `--mjo-breadcrumbs-background-color`    | Background color for solid variant                       | `var(--mjo-background-color-card)`                         |
| `--mjo-breadcrumbs-border-color`        | Border color for bordered variant                        | `var(--mjo-border-color)`                                  |
| `--mjo-breadcrumbs-border-radius`       | Border radius for solid and bordered variants            | `var(--mjo-radius-medium)`                                 |
| `--mjo-breadcrumbs-padding`             | Padding for solid and bordered variants                  | `var(--mjo-space-small) var(--mjo-space-small)`            |
| `--mjo-breadcrumbs-text-color`          | Color for active/current breadcrumb item                 | `var(--mjo-foreground-color-low)`                          |
| `--mjo-breadcrumbs-link-hover-color`    | Color for links on hover                                 | `var(--mjo-primary-color)` or `var(--mjo-secondary-color)` |
| `--mjo-breadcrumbs-separator-color`     | Color for separator icons                                | `var(--mjo-foreground-color-low)`                          |
| `--mjo-breadcrumbs-current-font-weight` | Font weight for current breadcrumb in high contrast mode | `600`                                                      |

## CSS Parts

| Part             | Description                                                | Element                                    |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `container`      | The main navigation container element                      | `nav`                                      |
| `list`           | The ul element containing the breadcrumb items             | `ul`                                       |
| `list-item`      | Each li element representing a breadcrumb item             | `li`                                       |
| `link`           | The mjo-link element for navigable breadcrumb items        | `mjo-link` (via exportparts)               |
| `link-text`      | The text content of navigable breadcrumb items             | `mjo-link` inner element (via exportparts) |
| `icon`           | Icons within breadcrumb items                              | `mjo-icon` (via exportparts)               |
| `active-icon`    | Icons within active/current breadcrumb items               | `mjo-icon` (via exportparts)               |
| `active-text`    | The typography element for active/current breadcrumb items | `mjo-typography` (via exportparts)         |
| `icon-separator` | The separator icon between breadcrumb items                | `mjo-icon` (via exportparts)               |

## Accessibility

### ARIA Attributes

The component implements proper ARIA semantics for breadcrumb navigation:

- Uses `role="navigation"` on the container element
- Provides default `aria-label="breadcrumb"` if not overridden
- Supports `aria-labelledby` and `aria-describedby` for custom labeling
- Marks the current/active breadcrumb with `aria-current="page"`
- Uses `aria-hidden="true"` for decorative icons and separators
- Implements proper list semantics with `role="list"` and `role="listitem"`

### Keyboard Interaction

Navigation through breadcrumb links follows standard keyboard patterns:

- **Tab**: Moves focus between breadcrumb links
- **Enter/Space**: Activates the focused link
- **Shift + Tab**: Moves focus backward through links

### Best Practices

- Always provide meaningful labels for breadcrumb items
- The last item should represent the current page and is automatically marked as active
- Use the `ariaLabelledBy` or provide a clear `aria-label` for multilingual support
- Ensure sufficient color contrast for links and separators
- The component automatically handles horizontal scrolling with scroll shadows for overflow content

### High Contrast Mode Support

The component adapts to high contrast preferences by:

- Increasing outline width for focused links (3px)
- Applying increased font weight to the current breadcrumb item

### Reduced Motion Support

For users who prefer reduced motion, all transitions are disabled automatically.

## Usage Examples

### Basic Usage

```html
<mjo-breadcrumbs
  .items=${[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' }
  ]}
></mjo-breadcrumbs>
```

### With Icons

```html
<script type="module">
    import { BsHouse, BsBox, BsLaptop } from "mjo-icons/bs";

    const items = [
        { label: "Home", href: "/", icon: BsHouse },
        { label: "Products", href: "/products", icon: BsBox },
        { label: "Laptops", icon: BsLaptop },
    ];
</script>

<mjo-breadcrumbs .items="${items}"></mjo-breadcrumbs>
```

### Different Variants

```html
<!-- Default variant -->
<mjo-breadcrumbs .items="${items}"></mjo-breadcrumbs>

<!-- Solid background -->
<mjo-breadcrumbs variant="solid" .items="${items}"></mjo-breadcrumbs>

<!-- With border -->
<mjo-breadcrumbs variant="bordered" .items="${items}"></mjo-breadcrumbs>
```

### Custom Sizes and Colors

```html
<!-- Small size with secondary color -->
<mjo-breadcrumbs size="small" color="secondary" .items="${items}"></mjo-breadcrumbs>

<!-- Large size with primary color -->
<mjo-breadcrumbs size="large" .items="${items}"></mjo-breadcrumbs>
```

### Custom Separator

```html
<script type="module">
    import { BsSlash } from "mjo-icons/bs";

    const items = [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Team" }];
</script>

<mjo-breadcrumbs .items="${items}" .separator="${BsSlash}"></mjo-breadcrumbs>
```

### Handling Navigation Events

When `autoNavigate` is `false`, you can listen to navigation events:

```html
<mjo-breadcrumbs .items="${items}" @mjo-breadcrumbs:navigate="${handleNavigate}"></mjo-breadcrumbs>

<script>
    function handleNavigate(e) {
        const { item, index, href } = e.detail;
        console.log(`Navigating to: ${item.label} at index ${index}`);

        // Implement custom navigation logic
        if (href) {
            // Custom routing logic
            router.navigate(href);
        }
    }
</script>
```

### Preventing Default Link Behavior

```html
<mjo-breadcrumbs .items="${items}" preventDefault @mjo-breadcrumbs:navigate="${handleNavigate}"></mjo-breadcrumbs>
```

### Programmatic Control

```javascript
const breadcrumbs = document.querySelector("mjo-breadcrumbs");

// Update items dynamically
breadcrumbs.items = [{ label: "Home", href: "/" }, { label: "New Section", href: "/new" }, { label: "Current Page" }];

// Change variant
breadcrumbs.variant = "solid";

// Change size
breadcrumbs.size = "large";
```

### Styling with CSS Parts

```css
/* Style the container */
mjo-breadcrumbs::part(container) {
    padding: 1rem;
}

/* Style breadcrumb items */
mjo-breadcrumbs::part(list-item) {
    margin: 0 0.5rem;
}

/* Style the active/current breadcrumb */
mjo-breadcrumbs::part(active-text) {
    font-weight: bold;
    color: #333;
}

/* Style separators */
mjo-breadcrumbs::part(icon-separator) {
    opacity: 0.5;
    font-size: 0.8em;
}
```

### Styling with CSS Variables

```css
mjo-breadcrumbs {
    --mjo-breadcrumbs-font-family: "Inter", sans-serif;
    --mjo-breadcrumbs-font-size: 0.9rem;
    --mjo-breadcrumbs-link-hover-color: #0066cc;
    --mjo-breadcrumbs-text-color: #666;
    --mjo-breadcrumbs-separator-color: #999;
}

/* For solid variant */
mjo-breadcrumbs[variant="solid"] {
    --mjo-breadcrumbs-background-color: #f5f5f5;
    --mjo-breadcrumbs-border-radius: 8px;
    --mjo-breadcrumbs-padding: 0.75rem 1rem;
}
```

## Additional Notes

### Automatic Scroll Behavior

The component automatically scrolls to show the last (current) breadcrumb item when:

- The component is first rendered
- The `items` array changes
- The container is resized

This ensures that the current page breadcrumb is always visible, even when the breadcrumb list is too wide for the container.

### Scroll Shadow Integration

The component uses `mjo-scrollshadow` internally to provide visual feedback when content can be scrolled horizontally. The shadows automatically appear on the left and/or right sides when content overflows.

### Active Item Behavior

- The last item in the `items` array is automatically considered active/current
- Alternatively, you can explicitly mark an item as active with `active: true`
- Active items are rendered as plain text (not links) and marked with `aria-current="page"`
- Active items use different styling to distinguish them from navigable items

### Performance Considerations

The component uses:

- `ResizeObserver` to efficiently detect container size changes
- `requestAnimationFrame` for smooth scroll animations
- `repeat` directive from Lit for efficient list rendering
