# mjo-table

A flexible and feature-rich table component that supports sorting, pagination, row selection, and custom rendering. Perfect for displaying structured data with advanced functionality like sortable columns, filterable headers, and customizable styling.

## Import

```ts
import "mjo-litui/mjo-table";
```

## Basic Usage

```html
<mjo-table .headers="${headers}" .rows="${rows}"></mjo-table>
```

## Table Structure

The table component requires two main properties:

1. **Headers** - Define column structure and behavior
2. **Rows** - Contain the actual data to display

### Headers Structure

Each header defines a column with the following properties:

```ts
interface MjoTableHeader {
    key: string; // Unique identifier for the column
    render: string | number | TemplateResult; // Column title content
    sortable?: boolean; // Enable sorting for this column
    filterable?: boolean; // Enable filtering (future feature)
    sortDirection?: "asc" | "desc"; // Current sort direction
    icon?: string; // Icon to display in header
    minWidth?: string; // Minimum column width
    colspan?: number; // Column span
    placeContent?: "center" | "left" | "right"; // Content alignment
}
```

### Rows Structure

Each row is an array of row items:

```ts
interface MjoTableRowItem {
    key?: string; // Optional identifier
    render: string | number | TemplateResult; // Cell content
}

type MjoTableRows = MjoTableRowItem[];
```

## Lit Example - Basic Table

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableHeader, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-basic")
export class ExampleTableBasic extends LitElement {
    @state() headers: MjoTableHeader[] = [
        {
            key: "name",
            render: "Name",
            sortable: true,
            sortDirection: "asc",
            placeContent: "left",
        },
        {
            key: "email",
            render: "Email",
            sortable: true,
            placeContent: "left",
        },
        {
            key: "role",
            render: "Role",
            placeContent: "center",
        },
        {
            key: "status",
            render: "Status",
            placeContent: "center",
        },
    ];

    @state() rows: MjoTableRows[] = [
        [
            { key: "name", render: "John Doe" },
            { key: "email", render: "john@example.com" },
            { key: "role", render: "Admin" },
            { key: "status", render: "Active" },
        ],
        [
            { key: "name", render: "Jane Smith" },
            { key: "email", render: "jane@example.com" },
            { key: "role", render: "User" },
            { key: "status", render: "Active" },
        ],
        [
            { key: "name", render: "Bob Johnson" },
            { key: "email", render: "bob@example.com" },
            { key: "role", render: "Editor" },
            { key: "status", render: "Inactive" },
        ],
    ];

    render() {
        return html` <mjo-table .headers=${this.headers} .rows=${this.rows}></mjo-table> `;
    }
}
```

## Advanced Table with Custom Rendering

Tables can render custom content including HTML elements and Lit templates:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-icon";
import { AiOutlineUser, AiOutlineEdit, AiOutlineDelete } from "mjo-icons/ai";
import type { MjoTableHeader, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-advanced")
export class ExampleTableAdvanced extends LitElement {
    @state() headers: MjoTableHeader[] = [
        {
            key: "avatar",
            render: html`<mjo-icon src=${AiOutlineUser}></mjo-icon>`,
            placeContent: "center",
            minWidth: "60px",
        },
        {
            key: "name",
            render: "Name",
            sortable: true,
            sortDirection: "asc",
        },
        {
            key: "email",
            render: "Email",
            sortable: true,
        },
        {
            key: "salary",
            render: "Salary",
            sortable: true,
            placeContent: "right",
        },
        {
            key: "actions",
            render: "Actions",
            placeContent: "center",
            minWidth: "120px",
        },
    ];

    @state() employees = [
        { id: 1, name: "Alice Cooper", email: "alice@company.com", salary: 75000 },
        { id: 2, name: "Bob Wilson", email: "bob@company.com", salary: 82000 },
        { id: 3, name: "Carol Davis", email: "carol@company.com", salary: 68000 },
        { id: 4, name: "David Miller", email: "david@company.com", salary: 95000 },
    ];

    get rows(): MjoTableRows[] {
        return this.employees.map((employee) => [
            {
                key: "avatar",
                render: html`
                    <div style="display: flex; justify-content: center;">
                        <div
                            style="width: 32px; height: 32px; border-radius: 50%; background: var(--mjo-color-primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;"
                        >
                            ${employee.name.charAt(0)}
                        </div>
                    </div>
                `,
            },
            { key: "name", render: employee.name },
            { key: "email", render: employee.email },
            { key: "salary", render: `$${employee.salary.toLocaleString()}` },
            {
                key: "actions",
                render: html`
                    <div style="display: flex; gap: 0.5rem; justify-content: center;">
                        <mjo-button size="small" variant="outline" @click=${() => this.#editEmployee(employee.id)}>
                            <mjo-icon src=${AiOutlineEdit}></mjo-icon>
                        </mjo-button>
                        <mjo-button size="small" variant="outline" color="error" @click=${() => this.#deleteEmployee(employee.id)}>
                            <mjo-icon src=${AiOutlineDelete}></mjo-icon>
                        </mjo-button>
                    </div>
                `,
            },
        ]);
    }

    render() {
        return html` <mjo-table .headers=${this.headers} .rows=${this.rows} .itemsPerPage=${10} .page=${1}></mjo-table> `;
    }

    #editEmployee(id: number) {
        console.log("Edit employee:", id);
    }

    #deleteEmployee(id: number) {
        this.employees = this.employees.filter((emp) => emp.id !== id);
    }
}
```

## Pagination

The table supports built-in pagination:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import "mjo-litui/mjo-button";
import type { MjoTableHeader, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-pagination")
export class ExampleTablePagination extends LitElement {
    @state() currentPage = 1;
    @state() itemsPerPage = 5;

    @state() headers: MjoTableHeader[] = [
        { key: "id", render: "ID", sortable: true, placeContent: "center" },
        { key: "product", render: "Product", sortable: true },
        { key: "category", render: "Category", sortable: true },
        { key: "price", render: "Price", sortable: true, placeContent: "right" },
    ];

    @state() allData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        product: `Product ${i + 1}`,
        category: ["Electronics", "Clothing", "Books", "Home"][i % 4],
        price: Math.floor(Math.random() * 1000) + 10,
    }));

    get rows(): MjoTableRows[] {
        return this.allData.map((item) => [
            { key: "id", render: item.id },
            { key: "product", render: item.product },
            { key: "category", render: item.category },
            { key: "price", render: `$${item.price}` },
        ]);
    }

    get totalPages(): number {
        return Math.ceil(this.allData.length / this.itemsPerPage);
    }

    render() {
        return html`
            <div>
                <mjo-table .headers=${this.headers} .rows=${this.rows} .page=${this.currentPage} .itemsPerPage=${this.itemsPerPage}></mjo-table>

                <div
                    style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding: 1rem; border-top: 1px solid var(--mjo-color-border);"
                >
                    <span>
                        Showing ${(this.currentPage - 1) * this.itemsPerPage + 1} to ${Math.min(this.currentPage * this.itemsPerPage, this.allData.length)} of
                        ${this.allData.length} entries
                    </span>

                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-button size="small" variant="outline" .disabled=${this.currentPage === 1} @click=${this.#goToPreviousPage}> Previous </mjo-button>

                        <span style="display: flex; align-items: center; padding: 0 1rem;"> Page ${this.currentPage} of ${this.totalPages} </span>

                        <mjo-button size="small" variant="outline" .disabled=${this.currentPage === this.totalPages} @click=${this.#goToNextPage}>
                            Next
                        </mjo-button>
                    </div>
                </div>
            </div>
        `;
    }

    #goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    #goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
}
```

## Table with Footer

Tables can include footer rows for summaries or totals:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableHeader, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-footer")
export class ExampleTableFooter extends LitElement {
    @state() headers: MjoTableHeader[] = [
        { key: "item", render: "Item", sortable: true },
        { key: "quantity", render: "Quantity", sortable: true, placeContent: "center" },
        { key: "price", render: "Unit Price", sortable: true, placeContent: "right" },
        { key: "total", render: "Total", placeContent: "right" },
    ];

    @state() salesData = [
        { item: "Laptop", quantity: 2, price: 999.99 },
        { item: "Mouse", quantity: 5, price: 29.99 },
        { item: "Keyboard", quantity: 3, price: 79.99 },
        { item: "Monitor", quantity: 1, price: 299.99 },
    ];

    get rows(): MjoTableRows[] {
        return this.salesData.map((sale) => [
            { key: "item", render: sale.item },
            { key: "quantity", render: sale.quantity },
            { key: "price", render: `$${sale.price.toFixed(2)}` },
            { key: "total", render: `$${(sale.quantity * sale.price).toFixed(2)}` },
        ]);
    }

    get footers(): MjoTableRows[] {
        const totalQuantity = this.salesData.reduce((sum, sale) => sum + sale.quantity, 0);
        const grandTotal = this.salesData.reduce((sum, sale) => sum + sale.quantity * sale.price, 0);

        return [
            [
                { key: "item", render: html`<strong>Total</strong>` },
                { key: "quantity", render: html`<strong>${totalQuantity}</strong>` },
                { key: "price", render: "" },
                { key: "total", render: html`<strong>$${grandTotal.toFixed(2)}</strong>` },
            ],
        ];
    }

    render() {
        return html` <mjo-table .headers=${this.headers} .rows=${this.rows} .footers=${this.footers}></mjo-table> `;
    }
}
```

## Empty State

The table automatically displays an empty state when no data is provided:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import "mjo-litui/mjo-button";
import type { MjoTableHeader, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-empty")
export class ExampleTableEmpty extends LitElement {
    @state() showData = false;

    @state() headers: MjoTableHeader[] = [
        { key: "name", render: "Name", sortable: true },
        { key: "email", render: "Email", sortable: true },
        { key: "role", render: "Role" },
    ];

    get rows(): MjoTableRows[] {
        if (!this.showData) return [];

        return [
            [
                { key: "name", render: "John Doe" },
                { key: "email", render: "john@example.com" },
                { key: "role", render: "Admin" },
            ],
        ];
    }

    render() {
        return html`
            <div>
                <div style="margin-bottom: 1rem;">
                    <mjo-button @click=${this.#toggleData}> ${this.showData ? "Hide Data" : "Show Data"} </mjo-button>
                </div>

                <mjo-table .headers=${this.headers} .rows=${this.rows}></mjo-table>
            </div>
        `;
    }

    #toggleData() {
        this.showData = !this.showData;
    }
}
```

## Sortable Columns

Columns can be made sortable by setting the `sortable` property:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableHeader, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-sorting")
export class ExampleTableSorting extends LitElement {
    @state() headers: MjoTableHeader[] = [
        {
            key: "name",
            render: "Name",
            sortable: true,
            sortDirection: "asc",
        },
        {
            key: "age",
            render: "Age",
            sortable: true,
            placeContent: "center",
        },
        {
            key: "department",
            render: "Department",
            sortable: true,
        },
        {
            key: "salary",
            render: "Salary",
            sortable: true,
            placeContent: "right",
        },
    ];

    @state() rows: MjoTableRows[] = [
        [
            { key: "name", render: "Alice Johnson" },
            { key: "age", render: 28 },
            { key: "department", render: "Engineering" },
            { key: "salary", render: 85000 },
        ],
        [
            { key: "name", render: "Bob Smith" },
            { key: "age", render: 35 },
            { key: "department", render: "Marketing" },
            { key: "salary", render: 65000 },
        ],
        [
            { key: "name", render: "Carol White" },
            { key: "age", render: 42 },
            { key: "department", render: "Sales" },
            { key: "salary", render: 75000 },
        ],
        [
            { key: "name", render: "David Brown" },
            { key: "age", render: 31 },
            { key: "department", render: "Engineering" },
            { key: "salary", render: 92000 },
        ],
    ];

    render() {
        return html`
            <div>
                <p>Click on column headers to sort. Sortable columns show an arrow icon.</p>
                <mjo-table .headers=${this.headers} .rows=${this.rows}></mjo-table>
            </div>
        `;
    }
}
```

## Custom Column Widths and Spanning

Control column layout with `minWidth` and `colspan` properties:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-table";
import type { MjoTableHeader, MjoTableRows } from "mjo-litui/types/mjo-table";

@customElement("example-table-layout")
export class ExampleTableLayout extends LitElement {
    @state() headers: MjoTableHeader[] = [
        {
            key: "id",
            render: "ID",
            minWidth: "60px",
            placeContent: "center",
        },
        {
            key: "details",
            render: "Product Details",
            colspan: 2,
            placeContent: "center",
        },
        {
            key: "price",
            render: "Price",
            minWidth: "100px",
            placeContent: "right",
        },
    ];

    @state() rows: MjoTableRows[] = [
        [
            { key: "id", render: "001" },
            { key: "name", render: "Laptop Pro" },
            { key: "specs", render: "16GB RAM, 512GB SSD" },
            { key: "price", render: "$1,299" },
        ],
        [
            { key: "id", render: "002" },
            { key: "name", render: "Wireless Mouse" },
            { key: "specs", render: "Bluetooth, Ergonomic" },
            { key: "price", render: "$49" },
        ],
    ];

    render() {
        return html` <mjo-table .headers=${this.headers} .rows=${this.rows}></mjo-table> `;
    }
}
```

## Attributes/Properties

| Name           | Type               | Default | Description                                           |
| -------------- | ------------------ | ------- | ----------------------------------------------------- |
| `headers`      | `MjoTableHeader[]` | `[]`    | Array of header configurations defining table columns |
| `rows`         | `MjoTableRows[]`   | `[]`    | Array of row data to display in the table             |
| `footers`      | `MjoTableRows[]`   | `[]`    | Array of footer rows for summaries or totals          |
| `page`         | `number`           | `1`     | Current page number for pagination                    |
| `itemsPerPage` | `number`           | `10`    | Number of items to display per page                   |

## Events

The table component currently does not emit custom events, but you can handle events from the content rendered within cells (like buttons or other interactive elements).

## Methods

| Name                  | Type         | Description                                                        |
| --------------------- | ------------ | ------------------------------------------------------------------ |
| `connectedCallback()` | `() => void` | Lifecycle method that initializes sorting on first sortable column |

## CSS Custom Properties

The table component provides extensive customization through CSS custom properties:

| Name                                     | Default                                       | Description                        |
| ---------------------------------------- | --------------------------------------------- | ---------------------------------- |
| `--mjo-table-background-color`           | `transparent`                                 | Background color of the table      |
| `--mjo-table-foreground-color`           | `var(--mjo-foreground-color, #333333)`        | Text color of the table            |
| `--mjo-table-header-font-size`           | `inherit`                                     | Font size for table headers        |
| `--mjo-table-body-font-size`             | `inherit`                                     | Font size for table body           |
| `--mjo-table-cell-foreground-color`      | `var(--mjo-foreground-color, #333333)`        | Text color for table cells         |
| `--mjo-table-cell-even-background-color` | `#f2f2f2`                                     | Background color for even rows     |
| `--mjo-table-cell-even-foreground-color` | `var(--mjo-table-cell-foreground-color)`      | Text color for even rows           |
| `--mjo-table-header-background-color`    | `var(--mjo-primary-color, rgb(235, 195, 23))` | Background color for headers       |
| `--mjo-table-header-foreground-color`    | `var(--mjo-foreground-color, #333333)`        | Text color for headers             |
| `--mjo-table-footer-background-color`    | `transparent`                                 | Background color for footer        |
| `--mjo-table-footer-color`               | `var(--text-color)`                           | Text color for footer              |
| `--mjo-table-footer-font-size`           | `inherit`                                     | Font size for footer               |
| `--mjo-table-row-selected-color`         | `transparent`                                 | Background color for selected rows |
| `--mjo-table-no-data-opacity`            | `0.6`                                         | Opacity for empty state content    |
| `--mjo-table-no-data-width`              | `180px`                                       | Width for empty state content      |

## Theme Configuration

For global theme customization, use the theme configuration:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-table";

@customElement("example-table-theme")
export class ExampleTableTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .config=${{
                    components: {
                        mjoTable: {
                            backgroundColor: "#ffffff",
                            headerFontSize: "14px",
                            bodyFontSize: "13px",
                            cellEvenBackgroundColor: "#f8f9fa",
                            cellHeaderBackgroundColor: "#2563eb",
                            cellHeaderForegroundColor: "#ffffff",
                        },
                    },
                }}
            >
                <mjo-table
                    .headers=${[
                        { key: "name", render: "Name", sortable: true },
                        { key: "value", render: "Value", sortable: true },
                    ]}
                    .rows=${[
                        [
                            { key: "name", render: "Item 1" },
                            { key: "value", render: "100" },
                        ],
                        [
                            { key: "name", render: "Item 2" },
                            { key: "value", render: "200" },
                        ],
                    ]}
                ></mjo-table>
            </mjo-theme>
        `;
    }
}
```

For component-specific theming using the `theme` property:

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import 'mjo-litui/mjo-table';

@customElement('example-table-custom-theme')
export class ExampleTableCustomTheme extends LitElement {
    render() {
        return html`
            <mjo-table
                .headers=${[
                    { key: 'product', render: 'Product', sortable: true },
                    { key: 'price', render: 'Price', placeContent: 'right' }
                ]}
                .rows=${[
                    [
                        { key: 'product', render: 'Laptop' },
                        { key: 'price', render: '$999' }
                    ]
                ]}
                .theme=${{
                    backgroundColor: '#f1f5f9',
                    cellHeaderBackgroundColor: '#0f172a',
                    cellHeaderForegroundColor: '#f1f5f9',
                    cellEvenBackgroundColor: '#e2e8f0'
                }}
            ></mjo-table>
        `;
    }
    }
}
```

## Table Construction Guide

### 1. Define Headers

Headers define the structure and behavior of each column:

```ts
const headers: MjoTableHeader[] = [
    {
        key: "id", // Must match row item keys
        render: "ID", // Column title
        sortable: true, // Enable sorting
        placeContent: "center", // Alignment
        minWidth: "60px", // Minimum width
    },
    {
        key: "name",
        render: html`<strong>Name</strong>`, // Can use templates
        sortable: true,
        sortDirection: "asc", // Initial sort direction
    },
];
```

### 2. Prepare Row Data

Each row is an array of objects with matching keys:

```ts
const rows: MjoTableRows[] = [
    [
        { key: "id", render: 1 },
        { key: "name", render: "John Doe" },
    ],
    [
        { key: "id", render: 2 },
        { key: "name", render: html`<em>Jane Smith</em>` }, // Custom rendering
    ],
];
```

### 3. Optional Footer

Add footer rows for totals or summaries:

```ts
const footers: MjoTableRows[] = [
    [
        { key: "id", render: html`<strong>Total</strong>` },
        { key: "name", render: html`<strong>2 Users</strong>` },
    ],
];
```

### 4. Combine Everything

```ts
render() {
    return html`
        <mjo-table
            .headers=${this.headers}
            .rows=${this.rows}
            .footers=${this.footers}
            .page=${this.currentPage}
            .itemsPerPage=${this.itemsPerPage}
        ></mjo-table>
    `;
}
```

## Best Practices

1. **Consistent Keys**: Ensure header keys match row item keys for proper data association
2. **Performance**: Use pagination for large datasets to maintain performance
3. **Accessibility**: Provide meaningful header text for screen readers
4. **Responsive Design**: Consider using `minWidth` on important columns
5. **Custom Rendering**: Leverage template rendering for rich content like buttons, badges, or formatted data
6. **Sorting**: Make frequently queried columns sortable for better user experience

## Accessibility

The table component follows semantic HTML structure:

-   Uses proper `<table>`, `<thead>`, `<tbody>`, and `<tfoot>` elements
-   Maintains logical tab order for interactive elements
-   Supports keyboard navigation for sortable headers
-   Provides proper heading structure with `<th>` elements

## Notes

-   The table automatically handles sorting logic for string and number values
-   Pagination is built-in but requires manual page state management
-   Row selection is visual only (styling applied to selected row)
-   Custom content in cells receives all event handling capabilities
-   The component automatically sorts by the first sortable column on initialization
-   Empty state shows "No data" message when no rows are provided

## Related Components

-   [mjo-button](./mjo-button.md) - For action buttons within table cells
-   [mjo-icon](./mjo-icon.md) - For icons in headers and cells
-   [mjo-theme](./mjo-theme.md) - For theme configuration
