# mjo-grid

Flexible CSS Grid layout component providing responsive grid systems with auto-fill, auto-fit, and fixed column modes. Simplifies responsive layouts without complex media queries.

## Index

1. [Use Cases](#use-cases)
2. [Import](#import)
3. [Properties](#properties)
4. [CSS Variables](#css-variables)
5. [Accessibility](#accessibility)
6. [Usage Examples](#usage-examples)
7. [Additional Notes](#additional-notes)

## Use Cases

The `mjo-grid` component is designed for:

- Responsive card grids that automatically adjust to available space
- Dashboard layouts with consistent metric displays
- Photo galleries and image grids
- Product listings and catalog displays
- Form field layouts with automatic wrapping
- Multi-column content layouts without media queries
- Content sections with controlled gap spacing

## Import

```typescript
import "mjo-litui/mjo-grid";
```

## Properties

| Property      | Type                           | Default     | Description                                                                           | Required |
| ------------- | ------------------------------ | ----------- | ------------------------------------------------------------------------------------- | -------- |
| `columns`     | `number`                       | `4`         | Number of columns when `mode="columns"`                                               | No       |
| `autoRows`    | `Properties["gridAutoRows"]`   | `"auto"`    | Height of automatically created rows (CSS grid-auto-rows value)                       | No       |
| `flow`        | `Properties["gridAutoFlow"]`   | `""`        | Grid auto-flow direction (e.g., "row", "column", "dense")                             | No       |
| `gap`         | `Properties["gap"]`            | `"1em"`     | Gap between grid items (supports any CSS gap value)                                   | No       |
| `maxWidthRow` | `string \| undefined`          | `undefined` | Maximum width of each column when `mode="fill"` or `mode="fit"` (defaults to `"1fr"`) | No       |
| `minWidthRow` | `string`                       | `"1fr"`     | Minimum width of each column when `mode="fill"` or `mode="fit"`                       | No       |
| `mode`        | `"fill" \| "fit" \| "columns"` | `"columns"` | Grid layout mode (see mode descriptions below)                                        | No       |

### Mode Descriptions

- **`columns`**: Creates a fixed number of columns specified by the `columns` property. Each column has equal width (`minmax(0, 1fr)`).
- **`fill`**: Uses CSS Grid's `auto-fill` to create as many columns as possible based on `minWidthRow` and available space. Empty columns are created if space allows.
- **`fit`**: Uses CSS Grid's `auto-fit` to create columns based on `minWidthRow` and automatically collapses empty columns, allowing content to stretch.

## CSS Variables

The component uses internal CSS custom properties that are set programmatically based on the properties:

| Variable                         | Description                          | Set By Property                                 |
| -------------------------------- | ------------------------------------ | ----------------------------------------------- |
| `--mjoint-grid-gap`              | Gap between grid items               | `gap`                                           |
| `--mjoint-grid-auto-flow`        | Grid auto-flow direction             | `flow`                                          |
| `--mjoint-grid-auto-rows`        | Height of automatically created rows | `autoRows`                                      |
| `--mjoint-grid-template-columns` | Grid template columns definition     | `mode`, `columns`, `minWidthRow`, `maxWidthRow` |

**Note**: These variables are managed internally and should not be overridden directly. Use the component properties instead.

## Accessibility

The `mjo-grid` is a **layout-only component** and does not add semantic meaning or interactive behavior. Accessibility considerations:

- Grid layout preserves DOM order for screen readers and keyboard navigation
- Use semantic HTML elements within grid items (e.g., `<article>`, `<section>`)
- Consider ARIA landmarks for complex layouts (e.g., `role="region"` with `aria-label`)
- Ensure grid items have sufficient color contrast
- Test keyboard navigation flows through grid items
- Use proper heading hierarchy within grid items for screen reader navigation

### Best Practices

- Do not rely solely on visual grid positioning to convey meaning
- Ensure interactive elements within grid items are keyboard accessible
- Use logical DOM order that makes sense when read linearly
- Consider responsive behavior and how content reflows on smaller screens

## Usage Examples

### Basic Fixed Column Grid

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-basic-grid")
export class ExampleBasicGrid extends LitElement {
    render() {
        return html`
            <mjo-grid columns="3" gap="1rem">
                <div class="item">Item 1</div>
                <div class="item">Item 2</div>
                <div class="item">Item 3</div>
                <div class="item">Item 4</div>
                <div class="item">Item 5</div>
                <div class="item">Item 6</div>
            </mjo-grid>
        `;
    }

    static styles = css`
        .item {
            background: #f3f4f6;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e5e7eb;
        }
    `;
}
```

### Responsive Card Grid (Auto-Fill Mode)

```typescript
@customElement("example-responsive-grid")
export class ExampleResponsiveGrid extends LitElement {
    render() {
        return html`
            <mjo-grid mode="fill" minWidthRow="250px" maxWidthRow="1fr" gap="1.5rem">
                <div class="card">
                    <h3>Product 1</h3>
                    <p>Description of product 1</p>
                    <button>View Details</button>
                </div>
                <div class="card">
                    <h3>Product 2</h3>
                    <p>Description of product 2</p>
                    <button>View Details</button>
                </div>
                <div class="card">
                    <h3>Product 3</h3>
                    <p>Description of product 3</p>
                    <button>View Details</button>
                </div>
            </mjo-grid>
        `;
    }

    static styles = css`
        .card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .card h3 {
            margin: 0 0 1rem 0;
            color: #1f2937;
        }

        .card p {
            margin: 0 0 1.5rem 0;
            color: #6b7280;
        }

        .card button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
        }
    `;
}
```

### Dashboard Metrics Layout

```typescript
@customElement("example-dashboard")
export class ExampleDashboard extends LitElement {
    render() {
        return html`
            <mjo-grid columns="4" gap="1rem">
                <div class="metric">
                    <div class="value">1,234</div>
                    <div class="label">Total Users</div>
                </div>
                <div class="metric">
                    <div class="value">567</div>
                    <div class="label">Active Sessions</div>
                </div>
                <div class="metric">
                    <div class="value">89%</div>
                    <div class="label">Conversion Rate</div>
                </div>
                <div class="metric">
                    <div class="value">$12.3k</div>
                    <div class="label">Revenue</div>
                </div>
            </mjo-grid>
        `;
    }

    static styles = css`
        .metric {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .value {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
        }

        .label {
            font-size: 0.875rem;
            color: #6b7280;
            margin-top: 0.5rem;
        }
    `;
}
```

### Grid with Flow Control

```typescript
@customElement("example-grid-flow")
export class ExampleGridFlow extends LitElement {
    render() {
        return html`
            <h4>Dense Packing</h4>
            <mjo-grid columns="3" gap="1rem" flow="row dense" autoRows="80px">
                <div class="item">1</div>
                <div class="item wide">2 (wide)</div>
                <div class="item">3</div>
                <div class="item">4</div>
            </mjo-grid>
        `;
    }

    static styles = css`
        .item {
            background: #3b82f6;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .item.wide {
            grid-column: span 2;
        }
    `;
}
```

### Programmatic Column Control

```typescript
@customElement("example-dynamic-grid")
export class ExampleDynamicGrid extends LitElement {
    @property({ type: Number }) columns = 3;

    render() {
        return html`
            <div>
                <label>
                    Columns:
                    <input type="range" min="1" max="6" .value=${String(this.columns)} @input=${this.#handleColumnsChange} />
                    ${this.columns}
                </label>

                <mjo-grid columns=${this.columns} gap="1rem">
                    <div class="item">Item 1</div>
                    <div class="item">Item 2</div>
                    <div class="item">Item 3</div>
                    <div class="item">Item 4</div>
                    <div class="item">Item 5</div>
                    <div class="item">Item 6</div>
                </mjo-grid>
            </div>
        `;
    }

    #handleColumnsChange(e: Event) {
        const input = e.target as HTMLInputElement;
        this.columns = parseInt(input.value);
    }

    static styles = css`
        .item {
            background: #f3f4f6;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
    `;
}
```

### Nested Grids

```typescript
@customElement("example-nested-grids")
export class ExampleNestedGrids extends LitElement {
    render() {
        return html`
            <mjo-grid columns="2" gap="2rem">
                <div class="section">
                    <h4>Section 1</h4>
                    <mjo-grid columns="2" gap="1rem">
                        <button>Action 1</button>
                        <button>Action 2</button>
                        <button>Action 3</button>
                        <button>Action 4</button>
                    </mjo-grid>
                </div>

                <div class="section">
                    <h4>Section 2</h4>
                    <p>Content area with different layout</p>
                </div>
            </mjo-grid>
        `;
    }

    static styles = css`
        .section {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section h4 {
            margin: 0 0 1rem 0;
        }

        button {
            background: #f3f4f6;
            border: none;
            padding: 0.75rem;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
        }
    `;
}
```

## Additional Notes

### Browser Support

- **CSS Grid**: Supported in all modern browsers (IE 11+ with `-ms-` prefix)
- **CSS Custom Properties**: Supported in all modern browsers (IE 11 not supported)

### Performance Considerations

- The component recalculates grid template on every property update
- For static grids, set properties once and avoid unnecessary updates
- CSS Grid layout is hardware-accelerated in modern browsers

### Common Patterns

**12-Column Dashboard Layout:**

```html
<mjo-grid columns="12" gap="1rem">
    <div style="grid-column: span 12;">Header</div>
    <div style="grid-column: span 3;">Sidebar</div>
    <div style="grid-column: span 9;">Main Content</div>
    <div style="grid-column: span 12;">Footer</div>
</mjo-grid>
```

**Responsive Three-Column Layout:**

```html
<mjo-grid mode="fill" minWidthRow="300px" gap="2rem">
    <article>Column 1</article>
    <article>Column 2</article>
    <article>Column 3</article>
</mjo-grid>
```

### Integration with Theme System

The component extends `ThemeMixin` and supports the `theme` property for dynamic theming:

```typescript
const gridTheme = {
    gap: "2rem",
    // Note: Use properties instead of theme for grid-specific configuration
};
```

**Recommendation**: Use component properties (`gap`, `columns`, etc.) directly rather than the theme system for grid configuration.

### Related Components

- **[mjo-card](./mjo-card.md)** - Content containers commonly used within grids
- **[mjo-button](./mjo-button.md)** - Interactive elements in grid layouts
- **[mjo-avatar](./mjo-avatar.md)** - User avatars in grid displays
