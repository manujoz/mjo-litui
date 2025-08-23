# mjo-text-nowrap

A utility component that prevents text wrapping and applies ellipsis when content overflows. Perfect for displaying long text in constrained layouts while maintaining visual consistency and acc## Notes

-   The component provides a lightweight wrapper for text truncation
-   It maintains consistent height regardless of content length
-   Styling is inherited from parent elements
-   Works with any text content including HTML elements
-   The ellipsis appears automatically when content overflows
-   Component is purely presentational and requires no JavaScript overhead
-   For enhanced accessibility, manually add `title` or `aria-label` attributes as neededty.

## Import

```ts
import "mjo-litui/mjo-text-nowrap";
```

## Basic Usage

```html
<mjo-text-nowrap>This is a very long text that will be truncated with ellipsis when it overflows the container width</mjo-text-nowrap>
```

## Accessibility Features

The component automatically provides tooltips when text is truncated and supports ARIA labels:

````ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";

@customElement("example-text-nowrap-accessibility")
export class ExampleTextNowrapAccessibility extends LitElement {
    @state() private _truncationInfo = "";

    render() {
        const longText = "This is a very long text that demonstrates accessibility features of the text-nowrap component";

        return html`
            <div style="width: 250px; padding: 1rem; border: 1px solid var(--mjo-color-border); border-radius: 8px;">
                <h4>Automatic Tooltip (hover to see full text):</h4>
                # mjo-text-nowrap

A lightweight utility component that prevents text wrapping and applies ellipsis when content overflows. Perfect for displaying long text in constrained layouts while maintaining visual consistency and accessibility.

## Import

```ts
import "mjo-litui/mjo-text-nowrap";
````

## Basic Usage

```html
<mjo-text-nowrap>This is a very long text that will be truncated with ellipsis when it overflows the container width</mjo-text-nowrap>
```

## Accessibility Features

The component supports ARIA labels for enhanced accessibility:

```html
<!-- With custom ARIA label -->
<mjo-text-nowrap aria-label="Product name: Gaming Laptop"> Ultra High-Performance Gaming Laptop with Advanced Graphics </mjo-text-nowrap>

<!-- Basic usage with automatic tooltip via title attribute -->
<mjo-text-nowrap title="This is the complete text that might be truncated"> This is the complete text that might be truncated </mjo-text-nowrap>
```

                <p style="margin-top: 1rem; font-size: 0.9em; color: var(--mjo-color-text-secondary);">${this._truncationInfo}</p>
            </div>

            <div style="width: 200px; padding: 1rem; border: 1px solid var(--mjo-color-border); border-radius: 8px; margin-top: 1rem;">
                <h4>With Custom ARIA Label:</h4>
                <mjo-text-nowrap aria-label="Product name: Ultra High-Performance Gaming Laptop">
                    Ultra High-Performance Gaming Laptop with Advanced Graphics
                </mjo-text-nowrap>
            </div>

            <div style="width: 180px; padding: 1rem; border: 1px solid var(--mjo-color-border); border-radius: 8px; margin-top: 1rem;">
                <h4>Tooltip Disabled:</h4>
                <mjo-text-nowrap .showTooltip=${false}> This text won't show tooltip even if truncated </mjo-text-nowrap>
            </div>
        `;
    }

    private _handleTruncation(event: CustomEvent) {
        const { isTruncated, fullText } = event.detail;
        this._truncationInfo = isTruncated ? `Text is truncated. Full text: "${fullText}"` : "Text fits completely";
    }

}

````

## Common Use Cases

### Form Labels

```html
<div style="width: 300px;">
    <label style="display: block; width: 150px; margin-bottom: 0.5rem;">
        <mjo-text-nowrap>Very long field label that would normally wrap:</mjo-text-nowrap>
    </label>
    <input type="text" placeholder="Enter value" style="width: 100%;" />
</div>
````

### Table Cells

```html
<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="width: 200px; padding: 0.5rem; border: 1px solid var(--mjo-color-border);">
            <mjo-text-nowrap>john.doe@verylongdomainname.com</mjo-text-nowrap>
        </td>
        <td style="padding: 0.5rem; border: 1px solid var(--mjo-color-border);">
            <mjo-text-nowrap>Senior Software Engineer with expertise in full-stack development</mjo-text-nowrap>
        </td>
    </tr>
</table>
```

### Navigation Items

```html
<nav style="width: 200px;">
    <div style="display: flex; align-items: center; padding: 0.75rem; gap: 0.75rem;">
        <span style="flex-shrink: 0;">🏠</span>
        <mjo-text-nowrap>Dashboard Overview and Analytics</mjo-text-nowrap>
    </div>
</nav>
```

## Attributes/Properties

| Name       | Type               | Default  | Description                                          |
| ---------- | ------------------ | -------- | ---------------------------------------------------- |
| tag        | `MjoTextNowrapTag` | `"span"` | Semantic tag for future use (currently not rendered) |
| aria-label | `string`           | -        | ARIA label for accessibility                         |
| (slot)     | `Node[]`           | -        | Content to be displayed with text truncation         |

## Events

This component does not emit any custom events.

## Methods

This component has no public methods beyond the standard LitElement lifecycle methods.

## CSS Custom Properties

The component uses fixed internal styling and does not expose CSS custom properties for customization. It inherits text styling from parent elements.

## Accessibility

The `mjo-text-nowrap` component provides enhanced accessibility features:

### Automatic Tooltips

When text is truncated, the component automatically shows the full text as a tooltip on hover (unless `showTooltip` is set to `false`).

### ARIA Support

-   **aria-label**: Provides custom accessibility labels for screen readers
-   **Semantic structure**: Uses proper DOM structure for accessibility

### Usage Examples

```html
<!-- Basic usage -->
<mjo-text-nowrap>Long text that may be truncated</mjo-text-nowrap>

<!-- With custom ARIA label -->
<mjo-text-nowrap aria-label="Product name: Gaming Laptop"> Ultra High-Performance Gaming Laptop with Advanced Graphics </mjo-text-nowrap>

<!-- With manual tooltip via title attribute -->
<mjo-text-nowrap title="Full text for accessibility">Truncated text content</mjo-text-nowrap>
```

## Styling

The component automatically inherits text styling from its parent:

```css
/* The component will inherit these styles */
.parent {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    font-family: Arial, sans-serif;
}
```

## Use Cases

1. **Form Labels**: Prevent label text from wrapping in form layouts
2. **Table Cells**: Maintain consistent row heights in data tables
3. **Card Titles**: Keep card layouts uniform with varying title lengths
4. **Navigation**: Truncate long menu item names
5. **Lists**: Display long item names without breaking layout
6. **Breadcrumbs**: Show navigation paths without wrapping

## Best Practices

1. **Container Width**: Ensure the parent container has a defined width
2. **Accessibility**: Use `aria-label` and `title` attributes when appropriate
3. **Responsive**: Component adapts to container size changes via CSS
4. **Content Priority**: Use for secondary text; critical content should remain fully visible
5. **Manual Tooltips**: Add `title` attribute when text truncation is expected

## Browser Support

-   **Text Overflow**: Supported in all modern browsers
-   **Ellipsis**: Universal support for text-overflow: ellipsis
-   **ResizeObserver**: Supported in all modern browsers
-   **CSS Custom Properties**: Compatible with all layout systems

## Notes

-   The component provides automatic truncation detection and tooltip support
-   It maintains consistent height regardless of content length
-   Styling is inherited from parent elements
-   Works with any text content including HTML elements
-   ResizeObserver ensures accurate truncation detection on container changes
-   Events enable custom accessibility and UX enhancements

## Related Components

-   [mjo-typography](./mjo-typography.md) - For semantic text styling
-   [mjo-card](./mjo-card.md) - Often used together for card layouts
-   [mjo-table](./mjo-table.md) - Commonly used in table cells
