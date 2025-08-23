# mjo-grid

Flexible CSS Grid layout component providing responsive grid systems with auto-fill, auto-fit, and fixed column modes. Ideal for creating responsive layouts without complex media queries.

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
            <h4>Fixed Columns Mode</h4>
            <mjo-grid mode="columns" columns="3" gap="1rem">
                <div class="item">Fixed 1</div>
                <div class="item">Fixed 2</div>
                <div class="item">Fixed 3</div>
            </mjo-grid>

            <h4>Auto-Fill Mode (Responsive)</h4>
            <mjo-grid mode="fill" minWidthRow="200px" gap="1rem">
                <div class="item">Auto 1</div>
                <div class="item">Auto 2</div>
                <div class="item">Auto 3</div>
            </mjo-grid>

            <h4>Auto-Fit Mode (Stretch to Fill)</h4>
            <mjo-grid mode="fit" minWidthRow="150px" gap="1rem">
                <div class="item">Fit 1</div>
                <div class="item">Fit 2</div>
                <div class="item">Fit 3</div>
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

        h4 {
            margin: 2rem 0 1rem 0;
            color: #374151;
        }
    `;
}
```

## Responsive Card Grid Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-responsive-cards")
export class ExampleResponsiveCards extends LitElement {
    render() {
        return html`
            <mjo-grid mode="fill" minWidthRow="280px" gap="1.5rem">
                ${Array.from(
                    { length: 6 },
                    (_, i) => html`
                        <div class="card">
                            <h3>Card ${i + 1}</h3>
                            <p>Responsive card that adapts to screen size automatically.</p>
                            <button>Action</button>
                        </div>
                    `,
                )}
            </mjo-grid>
        `;
    }

    static styles = css`
        .card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
        }

        .card h3 {
            margin: 0 0 1rem 0;
            color: #1f2937;
        }

        .card p {
            margin: 0 0 1.5rem 0;
            color: #6b7280;
            line-height: 1.5;
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

## Dashboard Layout Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-dashboard")
export class ExampleDashboard extends LitElement {
    render() {
        return html`
            <!-- Metrics row -->
            <mjo-grid columns="4" gap="1rem">
                <div class="metric">
                    <div class="value">1,234</div>
                    <div class="label">Users</div>
                </div>
                <div class="metric">
                    <div class="value">567</div>
                    <div class="label">Sessions</div>
                </div>
                <div class="metric">
                    <div class="value">89%</div>
                    <div class="label">Conversion</div>
                </div>
                <div class="metric">
                    <div class="value">$12.3k</div>
                    <div class="label">Revenue</div>
                </div>
            </mjo-grid>

            <!-- Content sections -->
            <mjo-grid columns="2" gap="2rem" style="margin-top: 2rem;">
                <div class="section">
                    <h4>Recent Activity</h4>
                    <p>Latest user interactions and system events.</p>
                </div>
                <div class="section">
                    <h4>Quick Actions</h4>
                    <mjo-grid columns="2" gap="1rem">
                        <button>Add User</button>
                        <button>Export Data</button>
                        <button>Settings</button>
                        <button>Reports</button>
                    </mjo-grid>
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
            text-transform: uppercase;
        }

        .section {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .section h4 {
            margin: 0 0 1rem 0;
            color: #1f2937;
        }

        .section p {
            margin: 0;
            color: #6b7280;
        }

        button {
            background: #f3f4f6;
            border: none;
            padding: 0.75rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
        }

        button:hover {
            background: #e5e7eb;
        }
    `;
}
```

## Grid Flow Control Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-grid";

@customElement("example-grid-flow")
export class ExampleGridFlow extends LitElement {
    render() {
        return html`
            <h4>Row Flow (Default)</h4>
            <mjo-grid columns="3" gap="1rem" flow="row" autoRows="80px">
                <div class="item">1</div>
                <div class="item wide">2 (wide)</div>
                <div class="item">3</div>
                <div class="item">4</div>
            </mjo-grid>

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
            font-weight: 500;
        }

        .item.wide {
            grid-column: span 2;
            background: #059669;
        }

        h4 {
            margin: 2rem 0 1rem 0;
            color: #374151;
        }
    `;
}
```

## Properties

| Property      | Type                           | Default     | Description                                              |
| ------------- | ------------------------------ | ----------- | -------------------------------------------------------- |
| `columns`     | `number`                       | `4`         | Number of columns when using `mode="columns"`            |
| `autoRows`    | `Properties["gridAutoRows"]`   | `"auto"`    | Sets grid-auto-rows CSS property for row sizing          |
| `flow`        | `Properties["gridAutoFlow"]`   | `""`        | Sets grid-auto-flow CSS property (row, column, dense)    |
| `gap`         | `Properties["gap"]`            | `"1em"`     | Sets gap between grid items (CSS gap property)           |
| `maxWidthRow` | `string \| undefined`          | `undefined` | Maximum width for grid items in auto-fill/auto-fit modes |
| `minWidthRow` | `string`                       | `"1fr"`     | Minimum width for grid items in auto-fill/auto-fit modes |
| `mode`        | `"fill" \| "fit" \| "columns"` | `"columns"` | Grid layout strategy                                     |

### Grid Modes

| Mode      | Behavior                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| `columns` | Fixed number of columns (uses `columns` property)                              |
| `fill`    | Auto-fill: creates as many columns as fit, leaving empty columns if needed     |
| `fit`     | Auto-fit: creates columns that fit content, stretching to fill available space |

## Slots

| Slot      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| (default) | Grid items - any HTML elements that will be arranged in the grid |

## Events

This component does not emit any custom events. It provides pure layout functionality.

## Accessibility

The grid is a **layout-only component** - accessibility is handled by the content placed inside. Grid layout preserves DOM order for screen readers and keyboard navigation. Use semantic HTML elements within grid items and consider ARIA landmarks for complex layouts.

## Browser Support

**CSS Grid**: All modern browsers (IE 11+ with -ms- prefix)  
**CSS Custom Properties**: All modern browsers (IE 11 not supported)

## CSS Variables

| Variable                  | Default          | Description                         |
| ------------------------- | ---------------- | ----------------------------------- |
| `--grid-gap`              | `1em`            | Space between grid items            |
| `--grid-auto-flow`        | `initial`        | Direction and packing of grid items |
| `--grid-auto-rows`        | `auto`           | Size of automatically created rows  |
| `--grid-template-columns` | `repeat(4, 1fr)` | Column template definition          |

### Override Example

```css
mjo-grid {
    --grid-gap: 2rem;
    --grid-auto-rows: minmax(200px, auto);
}
```

## Common Patterns

### Card Grid

```html
<mjo-grid mode="fill" minWidthRow="300px" gap="1.5rem">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
</mjo-grid>
```

### Equal Height Columns

```html
<mjo-grid columns="3" gap="2rem" autoRows="1fr">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</mjo-grid>
```

### Responsive Image Gallery

```html
<mjo-grid mode="fill" minWidthRow="200px" gap="0.5rem">
    <img src="image1.jpg" alt="Gallery image 1" />
    <img src="image2.jpg" alt="Gallery image 2" />
    <img src="image3.jpg" alt="Gallery image 3" />
</mjo-grid>
```

### Dashboard Layout

```html
<mjo-grid columns="12" gap="1rem">
    <div style="grid-column: span 12;">Header</div>
    <div style="grid-column: span 3;">Sidebar</div>
    <div style="grid-column: span 9;">Main Content</div>
    <div style="grid-column: span 12;">Footer</div>
</mjo-grid>
```

## Summary

`<mjo-grid>` is a flexible CSS Grid wrapper that simplifies responsive layouts without complex media queries. It supports three layout modes: fixed columns for consistent layouts, auto-fill for responsive card grids, and auto-fit for content that stretches to fill space. The component handles CSS Grid complexity while providing fine-grained control through properties and CSS custom properties.
