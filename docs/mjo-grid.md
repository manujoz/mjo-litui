# mjo-grid

Flexible CSS Grid layout component providing responsive grid systems with auto-fill, auto-fit, and fixed column modes. Supports customizable gaps, row sizing, and adaptive layouts for modern web applications.

## HTML Usage

```html
<mjo-grid columns="3" gap="1rem">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</mjo-grid>

<mjo-grid mode="fill" minWidthRow="250px" gap="1.5rem">
    <div>Responsive Item 1</div>
    <div>Responsive Item 2</div>
    <div>Responsive Item 3</div>
</mjo-grid>
```

## Basic Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-grid-basic")
export class ExampleGridBasic extends LitElement {
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

## Grid Modes Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-grid-modes")
export class ExampleGridModes extends LitElement {
    render() {
        return html`
            <div>
                <h4>Fixed Columns Mode</h4>
                <mjo-grid mode="columns" columns="4" gap="1rem">
                    <div class="item">1</div>
                    <div class="item">2</div>
                    <div class="item">3</div>
                    <div class="item">4</div>
                    <div class="item">5</div>
                </mjo-grid>
            </div>

            <div>
                <h4>Auto-Fill Mode (Responsive)</h4>
                <mjo-grid mode="fill" minWidthRow="200px" gap="1rem">
                    <div class="item">Auto 1</div>
                    <div class="item">Auto 2</div>
                    <div class="item">Auto 3</div>
                    <div class="item">Auto 4</div>
                    <div class="item">Auto 5</div>
                </mjo-grid>
            </div>

            <div>
                <h4>Auto-Fit Mode (Stretch)</h4>
                <mjo-grid mode="fit" minWidthRow="150px" maxWidthRow="1fr" gap="1rem">
                    <div class="item">Fit 1</div>
                    <div class="item">Fit 2</div>
                    <div class="item">Fit 3</div>
                </mjo-grid>
            </div>
        `;
    }

    static styles = css`
        .item {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
        }

        div > h4 {
            margin: 2rem 0 1rem 0;
            color: #374151;
        }
    `;
}
```

## Responsive Design Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-grid-responsive")
export class ExampleGridResponsive extends LitElement {
    render() {
        return html`
            <div>
                <h3>Responsive Card Grid</h3>
                <mjo-grid mode="fill" minWidthRow="280px" maxWidthRow="1fr" gap="1.5rem">
                    ${Array.from(
                        { length: 8 },
                        (_, i) => html`
                            <div class="card">
                                <div class="card-header">Card ${i + 1}</div>
                                <div class="card-content">
                                    <p>This is a responsive card that automatically adjusts to available space.</p>
                                    <button class="card-button">Learn More</button>
                                </div>
                            </div>
                        `,
                    )}
                </mjo-grid>
            </div>

            <div>
                <h3>Image Gallery</h3>
                <mjo-grid mode="fill" minWidthRow="200px" gap="0.5rem">
                    ${Array.from(
                        { length: 12 },
                        (_, i) => html`
                            <div class="image-placeholder">
                                <span>Image ${i + 1}</span>
                            </div>
                        `,
                    )}
                </mjo-grid>
            </div>
        `;
    }

    static styles = css`
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            background: #f8fafc;
            padding: 1rem;
            font-weight: 600;
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
        }

        .card-content {
            padding: 1rem;
        }

        .card-content p {
            margin: 0 0 1rem 0;
            color: #6b7280;
            line-height: 1.5;
        }

        .card-button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.2s ease;
        }

        .card-button:hover {
            background: #2563eb;
        }

        .image-placeholder {
            aspect-ratio: 1;
            background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 500;
            border-radius: 8px;
        }

        h3 {
            margin: 2rem 0 1rem 0;
            color: #111827;
        }
    `;
}
```

## Advanced Layout Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-grid-advanced")
export class ExampleGridAdvanced extends LitElement {
    render() {
        return html`
            <div class="layout">
                <h3>Dashboard Layout</h3>

                <!-- Main metrics grid -->
                <mjo-grid columns="4" gap="1rem" class="metrics">
                    <div class="metric-card">
                        <div class="metric-value">1,234</div>
                        <div class="metric-label">Total Users</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">567</div>
                        <div class="metric-label">Active Sessions</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">89%</div>
                        <div class="metric-label">Conversion Rate</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">$12,345</div>
                        <div class="metric-label">Revenue</div>
                    </div>
                </mjo-grid>

                <!-- Content sections with different column counts -->
                <mjo-grid columns="2" gap="2rem" class="content-sections">
                    <div class="section">
                        <h4>Recent Activity</h4>
                        <mjo-grid columns="1" gap="0.5rem" autoRows="min-content">
                            <div class="activity-item">User John signed up</div>
                            <div class="activity-item">Order #1234 completed</div>
                            <div class="activity-item">Payment received</div>
                            <div class="activity-item">New comment posted</div>
                        </mjo-grid>
                    </div>

                    <div class="section">
                        <h4>Quick Actions</h4>
                        <mjo-grid columns="2" gap="1rem">
                            <button class="action-btn primary">Add User</button>
                            <button class="action-btn secondary">Export Data</button>
                            <button class="action-btn secondary">Send Report</button>
                            <button class="action-btn primary">Settings</button>
                        </mjo-grid>
                    </div>
                </mjo-grid>

                <!-- Responsive product grid -->
                <div class="section">
                    <h4>Products</h4>
                    <mjo-grid mode="fill" minWidthRow="250px" maxWidthRow="300px" gap="1rem">
                        ${Array.from(
                            { length: 6 },
                            (_, i) => html`
                                <div class="product-card">
                                    <div class="product-image">Product ${i + 1}</div>
                                    <div class="product-info">
                                        <h5>Product Name ${i + 1}</h5>
                                        <p class="product-price">$${(Math.random() * 100 + 20).toFixed(2)}</p>
                                        <button class="product-button">Add to Cart</button>
                                    </div>
                                </div>
                            `,
                        )}
                    </mjo-grid>
                </div>
            </div>
        `;
    }

    static styles = css`
        .layout {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .metrics {
            margin-bottom: 2rem;
        }

        .metric-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            text-align: center;
            border: 1px solid #f3f4f6;
        }

        .metric-value {
            font-size: 2rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.25rem;
        }

        .metric-label {
            font-size: 0.875rem;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }

        .content-sections {
            margin-bottom: 2rem;
        }

        .section {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section h4 {
            margin: 0 0 1rem 0;
            color: #1f2937;
            font-size: 1.125rem;
            font-weight: 600;
        }

        .activity-item {
            padding: 0.75rem;
            background: #f8fafc;
            border-radius: 6px;
            font-size: 0.875rem;
            color: #4b5563;
        }

        .action-btn {
            padding: 0.75rem 1rem;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;
        }

        .action-btn.primary {
            background: #3b82f6;
            color: white;
        }

        .action-btn.primary:hover {
            background: #2563eb;
        }

        .action-btn.secondary {
            background: #f3f4f6;
            color: #374151;
        }

        .action-btn.secondary:hover {
            background: #e5e7eb;
        }

        .product-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
        }

        .product-card:hover {
            transform: translateY(-2px);
        }

        .product-image {
            aspect-ratio: 1;
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 500;
        }

        .product-info {
            padding: 1rem;
        }

        .product-info h5 {
            margin: 0 0 0.5rem 0;
            color: #1f2937;
            font-size: 1rem;
        }

        .product-price {
            margin: 0 0 1rem 0;
            color: #059669;
            font-weight: 600;
            font-size: 1.125rem;
        }

        .product-button {
            width: 100%;
            padding: 0.5rem;
            background: #1f2937;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: background 0.2s ease;
        }

        .product-button:hover {
            background: #374151;
        }

        h3 {
            margin: 0 0 2rem 0;
            color: #111827;
            font-size: 1.5rem;
        }
    `;
}
```

## Custom Grid Flow Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-grid-flow")
export class ExampleGridFlow extends LitElement {
    render() {
        return html`
            <div>
                <h4>Row Flow (Default)</h4>
                <mjo-grid columns="3" gap="1rem" flow="row" autoRows="100px">
                    <div class="item large">1 (spans 2 columns)</div>
                    <div class="item">2</div>
                    <div class="item">3</div>
                    <div class="item">4</div>
                    <div class="item">5</div>
                </mjo-grid>
            </div>

            <div>
                <h4>Column Flow</h4>
                <mjo-grid columns="3" gap="1rem" flow="column" autoRows="80px">
                    <div class="item">A</div>
                    <div class="item">B</div>
                    <div class="item">C</div>
                    <div class="item">D</div>
                    <div class="item">E</div>
                    <div class="item">F</div>
                </mjo-grid>
            </div>

            <div>
                <h4>Dense Packing</h4>
                <mjo-grid columns="4" gap="1rem" flow="row dense" autoRows="60px">
                    <div class="item">1</div>
                    <div class="item wide">2 (wide)</div>
                    <div class="item">3</div>
                    <div class="item tall">4 (tall)</div>
                    <div class="item">5</div>
                    <div class="item">6</div>
                    <div class="item">7</div>
                    <div class="item">8</div>
                </mjo-grid>
            </div>
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
            font-weight: 500;
            text-align: center;
        }

        .item.large {
            grid-column: span 2;
            background: #059669;
        }

        .item.wide {
            grid-column: span 2;
            background: #dc2626;
        }

        .item.tall {
            grid-row: span 2;
            background: #7c3aed;
        }

        h4 {
            margin: 2rem 0 1rem 0;
            color: #374151;
        }
    `;
}
```

## Attributes / Properties

| Name          | Type                           | Default     | Reflects | Description                                              |
| ------------- | ------------------------------ | ----------- | -------- | -------------------------------------------------------- |
| `columns`     | `number`                       | `4`         | no       | Number of columns when using `mode="columns"`            |
| `autoRows`    | `Properties["gridAutoRows"]`   | `"auto"`    | no       | Sets grid-auto-rows CSS property for row sizing          |
| `flow`        | `Properties["gridAutoFlow"]`   | `""`        | no       | Sets grid-auto-flow CSS property (row, column, dense)    |
| `gap`         | `Properties["gap"]`            | `"1em"`     | no       | Sets gap between grid items (CSS gap property)           |
| `maxWidthRow` | `string \| undefined`          | `undefined` | no       | Maximum width for grid items in auto-fill/auto-fit modes |
| `minWidthRow` | `string`                       | `"1fr"`     | no       | Minimum width for grid items in auto-fill/auto-fit modes |
| `mode`        | `"fill" \| "fit" \| "columns"` | `"columns"` | no       | Grid layout strategy                                     |

### Mode Descriptions

| Mode      | Behavior                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| `columns` | Fixed number of columns (uses `columns` property)                              |
| `fill`    | Auto-fill: creates as many columns as fit, leaving empty columns if needed     |
| `fit`     | Auto-fit: creates columns that fit content, stretching to fill available space |

### CSS Properties Generated

The component dynamically sets CSS custom properties based on the configuration:

| CSS Variable              | Source Property      | Purpose                       |
| ------------------------- | -------------------- | ----------------------------- |
| `--grid-gap`              | `gap`                | Grid gap spacing              |
| `--grid-auto-flow`        | `flow`               | Grid auto flow direction      |
| `--grid-auto-rows`        | `autoRows`           | Automatic row sizing          |
| `--grid-template-columns` | Calculated from mode | Column template configuration |

### Behavior Notes

-   In `columns` mode, the grid uses `repeat(${columns}, 1fr)` for equal-width columns
-   In `fill` and `fit` modes, the grid uses `repeat(auto-fill/auto-fit, minmax(min(100%, ${minWidthRow}), ${maxWidthRow}))`
-   All CSS properties are applied via CSS custom properties for maximum flexibility
-   The component updates styles on both `connectedCallback` and property changes

## Slots

| Slot      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| (default) | Grid items - any HTML elements that will be arranged in the grid |

## Events

This component does not emit any custom events. It provides pure layout functionality.

## CSS Variables

The component uses CSS custom properties that can be overridden:

### Core Grid Properties

| Variable                  | Default          | Used For                            |
| ------------------------- | ---------------- | ----------------------------------- |
| `--grid-gap`              | `1em`            | Space between grid items            |
| `--grid-auto-flow`        | `initial`        | Direction and packing of grid items |
| `--grid-auto-rows`        | `auto`           | Size of automatically created rows  |
| `--grid-template-columns` | `repeat(4, 1fr)` | Column template definition          |

### Custom CSS Override Example

```css
mjo-grid {
    --grid-gap: 2rem;
    --grid-auto-rows: minmax(200px, auto);
}

/* Custom responsive grid */
mjo-grid[mode="fill"] {
    --grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
}
```

## Advanced Usage Patterns

### Responsive Breakpoint Grid

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-responsive-grid")
export class ExampleResponsiveGrid extends LitElement {
    @state() private screenSize: "small" | "medium" | "large" = "large";

    connectedCallback() {
        super.connectedCallback();
        this.updateScreenSize();
        window.addEventListener("resize", () => this.updateScreenSize());
    }

    private updateScreenSize() {
        const width = window.innerWidth;
        if (width < 768) {
            this.screenSize = "small";
        } else if (width < 1024) {
            this.screenSize = "medium";
        } else {
            this.screenSize = "large";
        }
    }

    private getColumns() {
        return this.screenSize === "small" ? 1 : this.screenSize === "medium" ? 2 : 4;
    }

    render() {
        return html`
            <mjo-grid columns=${this.getColumns()} gap="1rem">
                ${Array.from({ length: 8 }, (_, i) => html` <div class="responsive-item">Item ${i + 1}</div> `)}
            </mjo-grid>
        `;
    }

    static styles = css`
        .responsive-item {
            background: #f3f4f6;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e5e7eb;
        }
    `;
}
```

### Masonry-Style Layout

```ts
@customElement("example-masonry-grid")
export class ExampleMasonryGrid extends LitElement {
    render() {
        return html`
            <mjo-grid mode="fill" minWidthRow="250px" gap="1rem" autoRows="min-content">
                ${Array.from({ length: 12 }, (_, i) => {
                    const height = Math.floor(Math.random() * 200) + 150;
                    return html`
                        <div class="masonry-item" style="height: ${height}px">
                            <h4>Card ${i + 1}</h4>
                            <p>Variable height content that creates a masonry-like effect.</p>
                        </div>
                    `;
                })}
            </mjo-grid>
        `;
    }

    static styles = css`
        .masonry-item {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
        }
    `;
}
```

### Grid with Custom Areas

```ts
@customElement("example-grid-areas")
export class ExampleGridAreas extends LitElement {
    render() {
        return html`
            <div class="layout-container">
                <mjo-grid columns="4" gap="1rem" autoRows="100px" class="layout-grid">
                    <div class="header">Header</div>
                    <div class="sidebar">Sidebar</div>
                    <div class="main">Main Content</div>
                    <div class="aside">Aside</div>
                    <div class="footer">Footer</div>
                </mjo-grid>
            </div>
        `;
    }

    static styles = css`
        .layout-grid {
            height: 400px;
        }

        .layout-grid > div {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 500;
            border-radius: 8px;
        }

        .header {
            grid-column: 1 / -1;
            background: #1f2937;
        }

        .sidebar {
            grid-row: 2 / 4;
            background: #374151;
        }

        .main {
            grid-column: 2 / 4;
            background: #4b5563;
        }

        .aside {
            grid-row: 2 / 4;
            background: #6b7280;
        }

        .footer {
            grid-column: 1 / -1;
            background: #9ca3af;
        }
    `;
}
```

## Performance Considerations

-   CSS Grid is hardware-accelerated in modern browsers
-   The component uses CSS custom properties for efficient style updates
-   Property changes trigger style recalculation only, not DOM restructure
-   Large grids (1000+ items) perform well but consider virtualization for massive datasets

## Accessibility Notes

-   The grid container maintains semantic structure of child elements
-   Grid layout doesn't affect tab order - items remain in DOM order
-   Use appropriate semantic markup within grid items (headings, landmarks, etc.)
-   Consider providing skip navigation for large grids with many interactive elements

## Browser Support

-   CSS Grid: All modern browsers (IE 11+ with -ms- prefix)
-   CSS Custom Properties: All modern browsers (IE 11 not supported)
-   The component gracefully falls back to block layout in non-supporting browsers

## Common Patterns

### Card Grid

```ts
<mjo-grid mode="fill" minWidthRow="300px" gap="1.5rem">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
</mjo-grid>
```

### Equal Height Columns

```ts
<mjo-grid columns="3" gap="2rem" autoRows="1fr">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</mjo-grid>
```

### Responsive Image Gallery

```ts
<mjo-grid mode="fill" minWidthRow="200px" maxWidthRow="300px" gap="0.5rem">
    <img src="image1.jpg" alt="Gallery image 1">
    <img src="image2.jpg" alt="Gallery image 2">
    <img src="image3.jpg" alt="Gallery image 3">
</mjo-grid>
```

### Dashboard Layout

```ts
<mjo-grid columns="12" gap="1rem">
    <div style="grid-column: span 12;">Header</div>
    <div style="grid-column: span 3;">Sidebar</div>
    <div style="grid-column: span 9;">Main Content</div>
    <div style="grid-column: span 12;">Footer</div>
</mjo-grid>
```

## Summary

`<mjo-grid>` provides a powerful and flexible CSS Grid wrapper that simplifies complex grid layouts. It supports three distinct layout modes: fixed columns, auto-fill, and auto-fit, making it suitable for both rigid designs and responsive layouts. The component automatically handles CSS Grid complexity while providing fine-grained control through properties and CSS custom properties. Use fixed columns for consistent layouts, auto-fill for responsive card grids, and auto-fit for stretching content to fill available space.
