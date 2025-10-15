# mjo-table

Comprehensive and accessible data table component with advanced features including sorting, filtering, pagination, infinite scroll, row selection, and responsive design.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [States](#states)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Display large datasets with pagination or infinite scroll
- Create sortable and filterable data tables
- Build interactive tables with row selection (single or multiple)
- Implement responsive tables that adapt to different screen sizes
- Create accessible data tables with keyboard navigation and screen reader support
- Display data with custom cell rendering using Lit templates
- Implement sticky headers for better UX in scrollable tables

## Import

```typescript
import "mjo-litui/mjo-table";
```

## Properties

| Property         | Type                               | Description                                                          | Default       | Required |
| ---------------- | ---------------------------------- | -------------------------------------------------------------------- | ------------- | -------- |
| `size`           | `"small" \| "medium" \| "large"`   | Size variant of the table                                            | `"medium"`    | No       |
| `color`          | `"primary" \| "secondary"`         | Color theme for interactive elements                                 | `"primary"`   | No       |
| `maxHeight`      | `number`                           | Maximum height in pixels for the table container (enables scrolling) | `undefined`   | No       |
| `compact`        | `boolean`                          | Reduces padding for a more compact layout                            | `false`       | No       |
| `selectable`     | `"single" \| "multiple" \| "none"` | Row selection mode                                                   | `"none"`      | No       |
| `headerSticky`   | `boolean`                          | Makes the header sticky when scrolling (requires `maxHeight`)        | `false`       | No       |
| `headerStyle`    | `"sticky-style"`                   | Apply special styling to sticky header                               | `undefined`   | No       |
| `rowSeparator`   | `"border" \| "contrast" \| "none"` | Type of row separator                                                | `"none"`      | No       |
| `rowHover`       | `"highlight" \| "none"`            | Row hover effect                                                     | `"highlight"` | No       |
| `rowClickable`   | `boolean`                          | Makes rows clickable and adds appropriate keyboard navigation        | `false`       | No       |
| `columns`        | `MjoTableColumns`                  | Array of column definitions                                          | `[]`          | Yes      |
| `rows`           | `MjoTableRows`                     | Array of row data (never mutate directly)                            | `[]`          | Yes      |
| `infiniteScroll` | `boolean`                          | Enables infinite scroll loading                                      | `false`       | No       |
| `threshold`      | `number`                           | Pixel threshold for triggering infinite scroll                       | `100`         | No       |
| `currentPage`    | `number`                           | Current page number for pagination                                   | `1`           | No       |
| `pageSize`       | `number`                           | Number of items per page (enables pagination)                        | `undefined`   | No       |
| `caption`        | `string`                           | Table caption for accessibility                                      | `undefined`   | No       |

## States

| State           | Type                                                   | Description                                           | Default                                           |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------- |
| `sort`          | `{ columnName?: string; direction?: "asc" \| "desc" }` | Current sort state                                    | `{ columnName: undefined, direction: undefined }` |
| `filters`       | `{ columnName?: string; filter?: string }`             | Current filter state                                  | `{ columnName: undefined, filter: undefined }`    |
| `selectedItems` | `MjoTableRowItem[]`                                    | Array of selected row items                           | `[]`                                              |
| `loading`       | `boolean`                                              | Loading state for infinite scroll                     | `false`                                           |
| `displayedRows` | `number`                                               | Number of rows currently displayed in infinite scroll | `0`                                               |

## Public Methods

This component does not expose public methods. All interactions are handled through properties and events.

## Events

| Event                 | Description                         | Type                    | Detail                                                           |
| --------------------- | ----------------------------------- | ----------------------- | ---------------------------------------------------------------- |
| `mjo-table:sort`      | Fired when column sort changes      | `MjoTableSortEvent`     | `{ columnName?: string; direction?: "asc" \| "desc" }`           |
| `mjo-table:filter`    | Fired when column filter changes    | `MjoTableFilterEvent`   | `{ key?: string; filter?: string }`                              |
| `mjo-table:select`    | Fired when row selection changes    | `MjoTableSelectEvent`   | `{ selected: MjoTableRowItem[] }`                                |
| `mjo-table:row-click` | Fired when a row is clicked         | `MjoTableRowClickEvent` | `{ key: string \| number; row: MjoTableRowItem }`                |
| `mjo-table:load-more` | Fired when infinite scroll triggers | `MjoTableLoadMoreEvent` | `{ displayedRows: number; totalRows: number; hasMore: boolean }` |

## CSS Variables

| Variable                                     | Description                                   | Default                                          |
| -------------------------------------------- | --------------------------------------------- | ------------------------------------------------ |
| `--mjo-table-border-radius`                  | Border radius of the table container          | `var(--mjo-radius-large, 10px)`                  |
| `--mjo-table-background-color`               | Background color of the table                 | `var(--mjo-background-color-card-low, #f0f0f0)`  |
| `--mjo-table-foreground-color`               | Text color of the table                       | `var(--mjo-foreground-color, #333333)`           |
| `--mjo-table-scrollbar-thumb-color`          | Color of the scrollbar thumb                  | `var(--mjo-background-color, #888)`              |
| `--mjo-table-header-font-size`               | Font size of header cells                     | `inherit`                                        |
| `--mjo-table-header-foreground-color`        | Text color of header cells                    | `var(--mjo-foreground-color, #333333)`           |
| `--mjo-table-header-border-color`            | Border color of header cells                  | `var(--mjo-border-color, #dddddd)`               |
| `--mjo-table-header-padding`                 | Padding of header cells                       | `var(--mjo-space-small)`                         |
| `--mjo-table-header-background-color`        | Background color of table header              | `transparent`                                    |
| `--mjo-table-header-background-color-stuck`  | Background color of sticky header             | `var(--mjo-background-color-card-high, #000000)` |
| `--mjo-table-header-foreground-color-stuck`  | Text color of sticky header                   | `var(--mjo-foreground-color, #ffffff)`           |
| `--mjo-table-caption-font-size`              | Font size of the table caption                | `0.9em`                                          |
| `--mjo-table-caption-foreground-color`       | Text color of the table caption               | `var(--mjo-foreground-color-low, #666666)`       |
| `--mjo-table-caption-padding-bottom`         | Bottom padding of the table caption           | `var(--mjo-space-medium)`                        |
| `--mjo-table-body-font-size`                 | Font size of body cells                       | `inherit`                                        |
| `--mjo-table-cell-foreground-color`          | Text color of body cells                      | `var(--mjo-foreground-color, #333333)`           |
| `--mjo-table-row-background-color-even`      | Background color of even rows (contrast mode) | `var(--mjo-background-color-high, #f2f2f2)`      |
| `--mjo-table-row-foreground-color-even`      | Text color of even rows (contrast mode)       | `var(--mjo-foreground-color, #333333)`           |
| `--mjo-table-row-border-color`               | Border color of rows (border mode)            | `var(--mjo-border-color-low, #dddddd)`           |
| `--mjo-table-row-background-color-highlight` | Background color of highlighted rows          | `var(--mjo-primary-color-alpha1, #007bff11)`     |
| `--mjo-table-row-foreground-color-highlight` | Text color of highlighted rows                | `var(--mjo-primary-color, #ffffff)`              |
| `--mjo-table-no-data-padding`                | Padding of the "no data" message              | `60px 10px`                                      |
| `--mjo-table-no-data-foreground-color`       | Text color of the "no data" message           | `var(--mjo-foreground-color-low, #666666)`       |

## CSS Parts

| Part                     | Description                                        | Element     |
| ------------------------ | -------------------------------------------------- | ----------- |
| `container`              | The main table container element                   | `<div>`     |
| `table`                  | The HTML table element                             | `<table>`   |
| `caption`                | The table caption element                          | `<caption>` |
| `thead`                  | The table header section                           | `<thead>`   |
| `body`                   | The table body section                             | `<tbody>`   |
| `row`                    | Table rows (both header and body)                  | `<tr>`      |
| `header-row`             | Header table row                                   | `<tr>`      |
| `header-cell`            | Header cells                                       | `<th>`      |
| `header-container`       | Header cell content container                      | `<div>`     |
| `header-label`           | Header cell text label                             | `<span>`    |
| `cell`                   | Body cells                                         | `<td>`      |
| `loading-indicator`      | Loading state container                            | `<div>`     |
| `loading-text`           | Loading spinner text                               | `<div>`     |
| `pagination-container`   | Pagination container (from mjo-pagination)         | `<div>`     |
| `pagination-wrapper`     | Pagination wrapper (from mjo-pagination)           | `<div>`     |
| `pagination-indicator`   | Pagination indicator (from mjo-pagination)         | `<div>`     |
| `pagination-nav-button`  | Pagination navigation button (from mjo-pagination) | `<button>`  |
| `pagination-page-button` | Pagination page button (from mjo-pagination)       | `<button>`  |
| `pagination-ellipsis`    | Pagination ellipsis (from mjo-pagination)          | `<span>`    |

## Accessibility

The `mjo-table` component is built with accessibility as a core principle:

### ARIA Roles and Attributes

- `role="table"` on the table element for proper semantic structure
- `role="region"` on the container with `aria-label` for screen reader context
- `aria-live="polite"` regions announce sort, filter, and pagination changes
- `aria-sort` attributes on sortable columns indicate current sort state
- `aria-expanded` on filterable buttons indicates filter state
- `tabindex="0"` on clickable rows enables keyboard navigation

### Keyboard Navigation

When `rowClickable` is enabled:

- **Enter/Space**: Activate the currently focused row
- **Arrow Down**: Move focus to the next row
- **Arrow Up**: Move focus to the previous row
- **Home**: Move focus to the first row
- **End**: Move focus to the last row
- **Arrow Left**: Focus the first cell in the current row
- **Arrow Right**: Focus the last cell in the current row

### Screen Reader Support

- Dynamic announcements for sort changes (e.g., "Sorted by Name, ascending")
- Filter changes announce the column and result count
- Pagination changes announce current page and total pages
- Selection changes announce the number of selected items
- Descriptive labels for all interactive elements

### User Preferences

- Respects `prefers-reduced-motion` to disable animations
- Supports `prefers-contrast: high` for enhanced visibility
- Enhanced focus indicators for keyboard navigation

### Best Practices

- Always provide a `caption` property for screen readers to understand table context
- Use descriptive `label` properties in column definitions
- Ensure sufficient color contrast for text and interactive elements
- Test with keyboard-only navigation to verify all features are accessible

## Usage Examples

### Basic Table with Sortable Columns

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableColumns, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("my-table")
class MyTable extends LitElement {
    @state() columns: MjoTableColumns = [
        { name: "name", label: "Name", sortable: true },
        { name: "email", label: "Email", sortable: true },
        { name: "role", label: "Role" },
    ];

    @state() rows: MjoTableRows = [
        { _key: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { _key: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    ];

    render() {
        return html` <mjo-table caption="User List" .columns=${this.columns} .rows=${this.rows} rowSeparator="border" rowHover="highlight"></mjo-table> `;
    }
}
```

### Table with Filtering and Row Selection

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableSelectEvent } from "mjo-litui/types/mjo-table";

@customElement("my-filterable-table")
class MyFilterableTable extends LitElement {
    @state() columns = [
        { name: "product", label: "Product", sortable: true, filterable: true },
        { name: "price", label: "Price", sortable: true },
        { name: "stock", label: "Stock" },
    ];

    @state() rows = [
        { _key: 1, product: "Laptop", price: 999, stock: 15 },
        { _key: 2, product: "Mouse", price: 25, stock: 150 },
    ];

    private handleSelection(e: MjoTableSelectEvent) {
        console.log("Selected items:", e.detail.selected);
    }

    render() {
        return html`
            <mjo-table
                caption="Product Inventory"
                .columns=${this.columns}
                .rows=${this.rows}
                selectable="multiple"
                @mjo-table:select=${this.handleSelection}
            ></mjo-table>
        `;
    }
}
```

### Paginated Table

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";

@customElement("my-paginated-table")
class MyPaginatedTable extends LitElement {
    @state() currentPage = 1;
    @state() rows = Array.from({ length: 50 }, (_, i) => ({
        _key: i + 1,
        id: i + 1,
        name: `Item ${i + 1}`,
    }));

    render() {
        return html`
            <mjo-table
                caption="Paginated List"
                .columns=${[
                    { name: "id", label: "ID" },
                    { name: "name", label: "Name" },
                ]}
                .rows=${this.rows}
                pageSize=${10}
                currentPage=${this.currentPage}
            ></mjo-table>
        `;
    }
}
```

### Infinite Scroll Table

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableLoadMoreEvent } from "mjo-litui/types/mjo-table";

@customElement("my-infinite-table")
class MyInfiniteTable extends LitElement {
    @state() rows = Array.from({ length: 20 }, (_, i) => ({
        _key: i + 1,
        name: `Item ${i + 1}`,
    }));

    private async handleLoadMore(e: MjoTableLoadMoreEvent) {
        // Load more data from API
        const newRows = await this.fetchMoreData();
        this.rows = [...this.rows, ...newRows];
    }

    render() {
        return html`
            <mjo-table
                caption="Infinite Scroll List"
                .columns=${[{ name: "name", label: "Name" }]}
                .rows=${this.rows}
                infiniteScroll
                maxHeight=${500}
                threshold=${100}
                @mjo-table:load-more=${this.handleLoadMore}
            ></mjo-table>
        `;
    }
}
```

### Responsive Table with Custom Cell Rendering

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";

@customElement("my-responsive-table")
class MyResponsiveTable extends LitElement {
    @state() columns = [
        { name: "name", label: "Name" },
        { name: "email", label: "Email", responsive: "md" },
        { name: "phone", label: "Phone", responsive: "lg" },
        { name: "actions", label: "Actions" },
    ];

    @state() rows = [
        {
            _key: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "555-1234",
            actions: html`<button @click=${() => this.handleEdit(1)}>Edit</button>`,
        },
    ];

    private handleEdit(id: number) {
        console.log("Edit item:", id);
    }

    render() {
        return html` <mjo-table caption="Responsive User Table" .columns=${this.columns} .rows=${this.rows} rowClickable></mjo-table> `;
    }
}
```

### Sticky Header with Custom Styling

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-table";

@customElement("my-sticky-table")
class MyStickyTable extends LitElement {
    render() {
        return html`
            <mjo-table
                caption="Long List with Sticky Header"
                .columns=${[
                    { name: "id", label: "ID" },
                    { name: "name", label: "Name" },
                ]}
                .rows=${Array.from({ length: 100 }, (_, i) => ({
                    _key: i + 1,
                    id: i + 1,
                    name: `Item ${i + 1}`,
                }))}
                headerSticky
                headerStyle="sticky-style"
                maxHeight=${400}
            ></mjo-table>
        `;
    }

    static styles = css`
        mjo-table {
            --mjo-table-header-background-color-stuck: #2196f3;
            --mjo-table-header-foreground-color-stuck: white;
        }
    `;
}
```

### Customizing Appearance with CSS Parts and Variables

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-table";

@customElement("my-styled-table")
class MyStyledTable extends LitElement {
    render() {
        return html`
            <mjo-table
                .columns=${[
                    { name: "name", label: "Name" },
                    { name: "value", label: "Value" },
                ]}
                .rows=${[
                    { _key: 1, name: "Item 1", value: 100 },
                    { _key: 2, name: "Item 2", value: 200 },
                ]}
                rowSeparator="contrast"
            ></mjo-table>
        `;
    }

    static styles = css`
        mjo-table {
            --mjo-table-background-color: #f9f9f9;
            --mjo-table-foreground-color: #333;
            --mjo-table-header-background-color: #e0e0e0;
            --mjo-table-border-radius: 8px;
        }

        mjo-table::part(header-cell) {
            font-weight: bold;
            text-transform: uppercase;
        }

        mjo-table::part(row):hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    `;
}
```

## Additional Notes

### Row Data Structure

Each row must have a unique `_key` property for proper rendering and selection tracking. This key should be stable across re-renders:

```typescript
const rows = [
    { _key: "user-1", name: "John", email: "john@example.com" },
    { _key: "user-2", name: "Jane", email: "jane@example.com" },
];
```

### Column Configuration

The `MjoTableColumn` type supports extensive configuration:

- `sortable`: Enable sorting for this column
- `filterable`: Enable filtering for this column
- `minWidth`/`width`: Control column dimensions
- `colspan`: Span multiple columns
- `placeContent`: Align content ("left", "center", "right")
- `responsive`: Hide column on smaller screens ("md" or "lg")

### Performance Considerations

- **Never mutate the `rows` array directly**: Always create a new array to trigger proper re-rendering
- Use `pageSize` or `infiniteScroll` for large datasets to improve performance
- The component uses `repeat` directive with efficient keying for optimal rendering
- Intersection Observer is used for sticky headers and infinite scroll with minimal performance impact

### Browser Support

The component uses modern web APIs:

- Intersection Observer (for sticky headers and infinite scroll)
- CSS custom properties
- ES6+ JavaScript features

Ensure polyfills are provided for older browsers if needed.
