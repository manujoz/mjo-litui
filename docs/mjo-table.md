# mjo-table

A comprehensive and accessible table component with advanced features including sorting, filtering, pagination, row selection, infinite scrolling, and responsive design. Built with accessibility first and supports custom theming.

## Import

```ts
import "mjo-litui/mjo-table";
```

## Basic Usage

```html
<mjo-table .columns="${columns}" .rows="${rows}"></mjo-table>
```

## Data Structure

The table component uses two main data structures:

### Columns Structure

Columns define the table structure and behavior:

```ts
interface MjoTableColumn {
    name: string; // Unique identifier and property key in row data
    label: string; // Display text for column header
    sortable?: boolean; // Enable sorting for this column
    filterable?: boolean; // Enable filtering for this column
    minWidth?: string | number; // Minimum width (px or CSS value)
    width?: string | number; // Fixed width (px or CSS value)
    colspan?: number; // Number of columns to span
    placeContent?: "center" | "left" | "right"; // Head content alignment
    responsive?: "sm" | "md" | "lg"; // Show column by breakpoint size
}

type MjoTableColumns = MjoTableColumn[];
```

### Rows Structure

Each row must have a unique `_key` property and data matching column names:

```ts
interface MjoTableRowItem extends Record<string, string | number | TemplateResult<1>> {
    _key: string | number; // Required: unique identifier for each row
}

type MjoTableRows = MjoTableRowItem[];
```

## Lit Example - Basic Table

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableColumns, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-basic")
export class ExampleTableBasic extends LitElement {
    @state() columns: MjoTableColumns = [
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "age", label: "Age" },
    ];

    @state() rows: MjoTableRows = [
        { _key: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { _key: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
    ];

    render() {
        return html`<mjo-table .columns=${this.columns} .rows=${this.rows}></mjo-table>`;
    }
}
```

## Advanced Features

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type {
    MjoTableColumns,
    MjoTableRows,
    MjoTableSortEvent,
    MjoTableFilterEvent,
    MjoTableSelectEvent,
    MjoTableRowClickEvent,
} from "mjo-litui/types/mjo-table";

@customElement("example-table-advanced")
export class ExampleTableAdvanced extends LitElement {
    @state() columns: MjoTableColumns = [
        { name: "name", label: "Name", sortable: true, filterable: true },
        { name: "email", label: "Email", sortable: true },
        { name: "age", label: "Age", sortable: true, responsive: "md" },
    ];

    @state() rows: MjoTableRows = [
        { _key: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { _key: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
    ];

    render() {
        return html`
            <mjo-table
                .columns=${this.columns}
                .rows=${this.rows}
                selectable="multiple"
                rowClickable
                rowHover="highlight"
                @mjo-table:sort=${this.#handleSort}
                @mjo-table:filter=${this.#handleFilter}
                @mjo-table:select=${this.#handleSelect}
                @mjo-table:row-click=${this.#handleRowClick}
            ></mjo-table>
        `;
    }

    #handleSort = (event: MjoTableSortEvent) => {
        console.log("Sort:", event.detail);
    };

    #handleFilter = (event: MjoTableFilterEvent) => {
        console.log("Filter:", event.detail);
    };

    #handleSelect = (event: MjoTableSelectEvent) => {
        console.log("Selected rows:", event.detail.selected);
    };

    #handleRowClick = (event: MjoTableRowClickEvent) => {
        console.log("Row clicked:", event.detail);
    };
}
```

## Pagination and Infinite Scroll

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableColumns, MjoTableRows, MjoTableLoadMoreEvent } from "mjo-litui/types/mjo-table";
import type { MjoPaginationChangeEvent } from "mjo-litui/types/mjo-pagination";

@customElement("example-table-pagination")
export class ExampleTablePagination extends LitElement {
    @state() columns: MjoTableColumns = [
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
    ];

    @state() rows: MjoTableRows = Array.from({ length: 100 }, (_, i) => ({
        _key: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
    }));

    render() {
        return html`
            <!-- Regular Pagination -->
            <mjo-table .columns=${this.columns} .rows=${this.rows} pageSize="10" currentPage="1" @mjo-pagination:change=${this.#handlePageChange}></mjo-table>

            <!-- Infinite Scroll -->
            <mjo-table
                .columns=${this.columns}
                .rows=${this.rows}
                infiniteScroll
                pageSize="20"
                maxHeight="400"
                @mjo-table:load-more=${this.#handleLoadMore}
            ></mjo-table>
        `;
    }

    #handlePageChange = (event: MjoPaginationChangeEvent) => {
        console.log("Page changed to:", event.detail.page);
    };

    #handleLoadMore = (event: MjoTableLoadMoreEvent) => {
        console.log("Load more requested:", event.detail);
    };
}
```

## Attributes/Properties

| Name             | Type                               | Default       | Description                                              |
| ---------------- | ---------------------------------- | ------------- | -------------------------------------------------------- |
| `columns`        | `MjoTableColumns`                  | `[]`          | Array of column definitions                              |
| `rows`           | `MjoTableRows`                     | `[]`          | Array of row data (never mutate in place)                |
| `size`           | `"small" \| "medium" \| "large"`   | `"medium"`    | Size variant affecting fonts and spacing                 |
| `color`          | `"primary" \| "secondary"`         | `"primary"`   | Color scheme for interactive elements                    |
| `maxHeight`      | `number`                           | -             | Maximum height in pixels, enables scrolling              |
| `compact`        | `boolean`                          | `false`       | Reduces padding for more compact display                 |
| `selectable`     | `"single" \| "multiple" \| "none"` | `"none"`      | Row selection mode                                       |
| `headerSticky`   | `boolean`                          | `false`       | Makes headers sticky when scrolling (requires maxHeight) |
| `headerStyle`    | `"sticky-style"`                   | -             | Forces sticky header visual styling                      |
| `rowSeparator`   | `"border" \| "contrast" \| "none"` | `"none"`      | Row separator visual style                               |
| `rowHover`       | `"highlight" \| "none"`            | `"highlight"` | Row hover effect                                         |
| `rowClickable`   | `boolean`                          | `false`       | Makes rows clickable and keyboard navigable              |
| `infiniteScroll` | `boolean`                          | `false`       | Enables infinite scroll loading                          |
| `threshold`      | `number`                           | `100`         | Distance in pixels from bottom to trigger load more      |
| `currentPage`    | `number`                           | `1`           | Current page for pagination                              |
| `pageSize`       | `number`                           | -             | Number of items per page (enables pagination)            |
| `caption`        | `string`                           | -             | Table caption for accessibility                          |

## Events

| Name                  | Type                    | Description                         |
| --------------------- | ----------------------- | ----------------------------------- |
| `mjo-table:sort`      | `MjoTableSortEvent`     | Fired when column sort changes      |
| `mjo-table:filter`    | `MjoTableFilterEvent`   | Fired when column filter changes    |
| `mjo-table:select`    | `MjoTableSelectEvent`   | Fired when row selection changes    |
| `mjo-table:row-click` | `MjoTableRowClickEvent` | Fired when a row is clicked         |
| `mjo-table:load-more` | `MjoTableLoadMoreEvent` | Fired when infinite scroll triggers |

### Event Details

```ts
interface MjoTableSortEvent extends CustomEvent {
    detail: {
        columnName?: string;
        direction?: "asc" | "desc";
    };
}

interface MjoTableFilterEvent extends CustomEvent {
    detail: {
        key?: string;
        filter?: string;
    };
}

interface MjoTableSelectEvent extends CustomEvent {
    detail: {
        selected: MjoTableRowItem[];
    };
}

interface MjoTableRowClickEvent extends CustomEvent {
    detail: {
        key: string | number;
        row: MjoTableRowItem;
    };
}

interface MjoTableLoadMoreEvent extends CustomEvent {
    detail: {
        displayedRows: number;
        totalRows: number;
        hasMore: boolean;
    };
}
```

## CSS Custom Properties

The table component provides extensive theming through CSS custom properties:

### Container & General

| Name                                | Default                                         | Description                   |
| ----------------------------------- | ----------------------------------------------- | ----------------------------- |
| `--mjo-table-background-color`      | `var(--mjo-background-color-card-low, #f0f0f0)` | Table background color        |
| `--mjo-table-foreground-color`      | `var(--mjo-foreground-color, #333333)`          | Table text color              |
| `--mjo-table-border-radius`         | `var(--mjo-radius-large, 10px)`                 | Table container border radius |
| `--mjo-table-scrollbar-thumb-color` | `var(--mjo-background-color, #888)`             | Scrollbar thumb color         |

### Header Styles

| Name                                        | Default                                          | Description                |
| ------------------------------------------- | ------------------------------------------------ | -------------------------- |
| `--mjo-table-header-font-size`              | `inherit`                                        | Header font size           |
| `--mjo-table-header-foreground-color`       | `var(--mjo-foreground-color-low, #333333)`       | Header text color          |
| `--mjo-table-header-border-color`           | `var(--mjo-border-color, #dddddd)`               | Header bottom border color |
| `--mjo-table-header-padding`                | `var(--mjo-space-small)`                         | Header cell padding        |
| `--mjo-table-header-background-color-stuck` | `var(--mjo-background-color-card-high, #000000)` | Sticky header background   |
| `--mjo-table-header-foreground-color-stuck` | `var(--mjo-foreground-color, #ffffff)`           | Sticky header text color   |

### Caption Styles

| Name                                   | Default                                 | Description          |
| -------------------------------------- | --------------------------------------- | -------------------- |
| `--mjo-table-caption-font-size`        | `0.9em`                                 | Caption font size    |
| `--mjo-table-caption-foreground-color` | `var(--mjo-foreground-color-low, #666)` | Caption text color   |
| `--mjo-table-caption-padding-bottom`   | `var(--mjo-space-medium)`               | Caption bottom space |

### Body & Cell Styles

| Name                                | Default                                | Description     |
| ----------------------------------- | -------------------------------------- | --------------- |
| `--mjo-table-body-font-size`        | `inherit`                              | Body font size  |
| `--mjo-table-cell-foreground-color` | `var(--mjo-foreground-color, #333333)` | Cell text color |

### Row Styles

| Name                                         | Default                                      | Description                         |
| -------------------------------------------- | -------------------------------------------- | ----------------------------------- |
| `--mjo-table-row-background-color-even`      | `var(--mjo-background-color-high, #f2f2f2)`  | Even row background (contrast mode) |
| `--mjo-table-row-foreground-color-even`      | `var(--mjo-foreground-color, #333333)`       | Even row text color                 |
| `--mjo-table-row-border-color`               | `var(--mjo-border-color-low, #dddddd)`       | Row border color (border mode)      |
| `--mjo-table-row-background-color-highlight` | `var(--mjo-primary-color-alpha1, #007bff11)` | Row hover/focus background          |
| `--mjo-table-row-foreground-color-highlight` | `var(--mjo-primary-color, #ffffff)`          | Row hover/focus text color          |

### No Data State

| Name                                   | Default                                 | Description             |
| -------------------------------------- | --------------------------------------- | ----------------------- |
| `--mjo-table-no-data-padding`          | `60px 10px`                             | No data message padding |
| `--mjo-table-no-data-foreground-color` | `var(--mjo-foreground-color-low, #666)` | No data text color      |

## CSS Parts

The table exposes several CSS parts for granular styling:

| Name                | Description                       |
| ------------------- | --------------------------------- |
| `container`         | The main table container element  |
| `table`             | The HTML table element            |
| `caption`           | The table caption element         |
| `thead`             | The table header section          |
| `body`              | The table body section            |
| `row`               | Table rows (both header and body) |
| `header-row`        | Header table row                  |
| `no-data`           | No data state row and cell        |
| `header-cell`       | Header cells                      |
| `header-selectable` | Header checkbox cell              |
| `header-container`  | Header cell content container     |
| `header-label`      | Header cell text label            |
| `cell`              | Body cells                        |
| `selectable`        | Checkbox cells                    |
| `loading-indicator` | Loading state container           |
| `loading-text`      | Loading spinner text              |

### Exportparts

The table also re-exports parts from child components:

#### From mjo-pagination

| Name                     | Component Part | Description             |
| ------------------------ | -------------- | ----------------------- |
| `pagination-container`   | `container`    | Pagination container    |
| `pagination-wrapper`     | `wrapper`      | Pagination wrapper      |
| `pagination-indicator`   | `indicator`    | Page indicator          |
| `pagination-nav-button`  | `nav-button`   | Navigation buttons      |
| `pagination-page-button` | `page-button`  | Page buttons            |
| `pagination-ellipsis`    | `ellipsis`     | Page ellipsis indicator |

#### From mjo-checkbox

| Name        | Component Part | Description            |
| ----------- | -------------- | ---------------------- |
| `checkbox`  | `checkbox`     | Checkbox input element |
| `checkmark` | `checkmark`    | Checkbox checkmark     |

#### From mjo-button (sort buttons)

| Name          | Component Part | Description      |
| ------------- | -------------- | ---------------- |
| `sort-button` | `button`       | Sort button      |
| `sort-icon`   | `icon`         | Sort button icon |

#### From mjo-textfield (filter inputs)

| Name           | Component Part | Description        |
| -------------- | -------------- | ------------------ |
| `filter-field` | `field`        | Filter input field |
| `filter-input` | `input`        | Filter input       |

## Accessibility Features

The table component includes comprehensive accessibility features:

- **Screen Reader Support**: Proper ARIA labels, roles, and live regions
- **Keyboard Navigation**: Full keyboard support for clickable tables
- **Focus Management**: Maintains focus during sorting and filtering
- **High Contrast Support**: Adapts to user's contrast preferences
- **Reduced Motion**: Respects user's motion preferences
- **Semantic Markup**: Uses proper table elements and structure

### Keyboard Controls (when `rowClickable` is true)

- **Arrow Keys**: Navigate between rows
- **Enter/Space**: Activate row click
- **Home/End**: Move to first/last row
- **Ctrl+Home/End**: Move to first/last cell in current row

## Responsive Design

The table supports responsive column hiding using the `responsive` property:

- `responsive: "sm"` - Hidden on screens < 640px
- `responsive: "md"` - Hidden on screens < 768px
- `responsive: "lg"` - Hidden on screens < 1024px

## Performance Considerations

- Use `infiniteScroll` for large datasets instead of loading all rows
- Set `pageSize` to limit rendered rows for better performance
- The `rows` array should never be mutated in place - always assign a new array
- Consider using `maxHeight` with sticky headers for large tables

## Best Practices

1. Always provide a unique `_key` for each row
2. Use `caption` property for accessibility when appropriate
3. Implement proper error handling for sort and filter events
4. Use semantic column names that match your data structure
5. Consider responsive design with the `responsive` property
6. Test keyboard navigation if using `rowClickable`
7. Provide loading states when data is being fetched

## Notes

- The table automatically handles sorting logic for string and number values
- Pagination is built-in but requires manual page state management
- Row selection is visual only (styling applied to selected row)
- Custom content in cells receives all event handling capabilities
- The component automatically sorts by the first sortable column on initialization
- Empty state shows "No data" message when no rows are provided

## Related Components

- [mjo-button](./mjo-button.md) - For action buttons within table cells
- [mjo-icon](./mjo-icon.md) - For icons in headers and cells
- [mjo-theme](./mjo-theme.md) - For theme configuration
