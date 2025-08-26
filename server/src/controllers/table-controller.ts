import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { MjoTableColumns, MjoTableRows } from "../../../src/types/mjo-table.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class TableController {
    /**
     * Renders the complete demo page for mjo-table
     */
    async renderTablePage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-table");

        if (!component) {
            throw new Error("mjo-table component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays tabular data with advanced features like sorting, filtering, pagination, and infinite scroll.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        // Sample data for examples
        const basicColumns: MjoTableColumns = [
            { name: "name", label: "Name", sortable: true, filterable: true },
            { name: "age", label: "Age", sortable: true, placeContent: "center" },
            { name: "email", label: "Email", filterable: true },
            { name: "status", label: "Status", sortable: true, placeContent: "center" },
        ];

        const basicRows: MjoTableRows = [
            { _key: 1, name: "John Doe", age: 30, email: "john@example.com", status: "Active" },
            { _key: 2, name: "Jane Smith", age: 25, email: "jane@example.com", status: "Inactive" },
            { _key: 3, name: "Bob Johnson", age: 35, email: "bob@example.com", status: "Active" },
            { _key: 4, name: "Alice Williams", age: 28, email: "alice@example.com", status: "Active" },
            { _key: 5, name: "Charlie Brown", age: 42, email: "charlie@example.com", status: "Inactive" },
        ];

        const responsiveColumns: MjoTableColumns = [
            { name: "name", label: "Name", sortable: true },
            { name: "email", label: "Email", responsive: "md" },
            { name: "phone", label: "Phone", responsive: "lg" },
            { name: "status", label: "Status", placeContent: "center" },
        ];

        const responsiveRows: MjoTableRows = [
            { _key: 1, name: "John Doe", email: "john@example.com", phone: "+1-555-0123", status: "Active" },
            { _key: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1-555-0456", status: "Inactive" },
            { _key: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+1-555-0789", status: "Active" },
        ];

        const paginationColumns: MjoTableColumns = [
            { name: "id", label: "ID", sortable: true, width: 80, placeContent: "center" },
            { name: "product", label: "Product", sortable: true, filterable: true },
            { name: "category", label: "Category", sortable: true },
            { name: "price", label: "Price", sortable: true, placeContent: "right" },
            { name: "stock", label: "Stock", sortable: true, placeContent: "center" },
        ];

        const paginationRows: MjoTableRows = Array.from({ length: 50 }, (_, i) => ({
            _key: i + 1,
            id: i + 1,
            product: `Product ${i + 1}`,
            category: ["Electronics", "Clothing", "Books", "Home"][i % 4],
            price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
            stock: Math.floor(Math.random() * 100),
        }));

        const selectableColumns: MjoTableColumns = [
            { name: "name", label: "Name", sortable: true },
            { name: "department", label: "Department", sortable: true },
            { name: "salary", label: "Salary", sortable: true, placeContent: "right" },
            { name: "startDate", label: "Start Date", sortable: true },
        ];

        const selectableRows: MjoTableRows = [
            { _key: 1, name: "John Doe", department: "Engineering", salary: "$75,000", startDate: "2023-01-15" },
            { _key: 2, name: "Jane Smith", department: "Marketing", salary: "$65,000", startDate: "2023-03-01" },
            { _key: 3, name: "Bob Johnson", department: "Engineering", salary: "$80,000", startDate: "2022-11-15" },
            { _key: 4, name: "Alice Williams", department: "Design", salary: "$70,000", startDate: "2023-02-20" },
            { _key: 5, name: "Charlie Brown", department: "Sales", salary: "$60,000", startDate: "2023-04-10" },
        ];

        const tableTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Basic Usage Section -->
            <div class="main-section">
                <h2 class="title">📦 Basic Table</h2>
                <p class="subtitle">Simple table with basic features like sorting and filtering.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows)}
                        caption="User Information Table"
                        rowHover="highlight"
                        rowSeparator="border"
                    ></mjo-table>
                </div>
            </div>

            <!-- Sizes Section -->
            <div class="main-section">
                <h2 class="title">📏 Table Sizes</h2>
                <p class="subtitle">Different table sizes for various use cases.</p>

                <h3>Small</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows.slice(0, 3))}
                        size="small"
                        rowSeparator="contrast"
                        rowHover="highlight"
                    ></mjo-table>
                </div>

                <h3>Medium (Default)</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows.slice(0, 3))}
                        size="medium"
                        rowSeparator="border"
                        rowHover="highlight"
                    ></mjo-table>
                </div>

                <h3>Large</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows.slice(0, 3))}
                        size="large"
                        rowSeparator="border"
                        rowHover="highlight"
                    ></mjo-table>
                </div>
            </div>

            <!-- Row Separators Section -->
            <div class="main-section">
                <h2 class="title">🎨 Row Separators</h2>
                <p class="subtitle">Different visual styles for row separation.</p>

                <h3>Border Separator</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows.slice(0, 4))}
                        rowSeparator="border"
                        rowHover="highlight"
                    ></mjo-table>
                </div>

                <h3>Contrast Separator</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows.slice(0, 4))}
                        rowSeparator="contrast"
                        rowHover="highlight"
                    ></mjo-table>
                </div>

                <h3>No Separator</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows.slice(0, 4))}
                        rowSeparator="none"
                        rowHover="highlight"
                    ></mjo-table>
                </div>
            </div>

            <!-- Responsive Design Section -->
            <div class="main-section">
                <h2 class="title">📱 Responsive Design</h2>
                <p class="subtitle">Columns that show/hide based on screen size. Resize window to see the effect.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(responsiveColumns)}
                        rows=${JSON.stringify(responsiveRows)}
                        rowHover="highlight"
                        rowSeparator="border"
                        caption="Responsive Table - Email shows on medium screens, Phone on large screens"
                    ></mjo-table>
                </div>
            </div>

            <!-- Compact Mode Section -->
            <div class="main-section">
                <h2 class="title">🗜️ Compact Mode</h2>
                <p class="subtitle">Reduced padding for dense data display.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows)}
                        compact
                        rowHover="highlight"
                        rowSeparator="contrast"
                    ></mjo-table>
                </div>
            </div>

            <!-- Sticky Header Section -->
            <div class="main-section">
                <h2 class="title">📌 Sticky Header</h2>
                <p class="subtitle">Header stays visible when scrolling through large datasets.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(
                            Array.from({ length: 20 }, (_, i) => ({
                                _key: i + 1,
                                name: `User ${i + 1}`,
                                age: 20 + (i % 40),
                                email: `user${i + 1}@example.com`,
                                status: i % 2 === 0 ? "Active" : "Inactive",
                            })),
                        )}
                        maxHeight="300"
                        headerSticky
                        headerStyle="sticky-style"
                        rowHover="highlight"
                        rowSeparator="border"
                    ></mjo-table>
                </div>
            </div>

            <!-- Selection Section -->
            <div class="main-section">
                <h2 class="title">✅ Row Selection</h2>
                <p class="subtitle">Single and multiple row selection capabilities.</p>

                <h3>Single Selection</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(selectableColumns)}
                        rows=${JSON.stringify(selectableRows)}
                        selectable="single"
                        rowHover="highlight"
                        rowSeparator="border"
                        caption="Employee List - Single Selection"
                    ></mjo-table>
                </div>

                <h3>Multiple Selection</h3>
                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(selectableColumns)}
                        rows=${JSON.stringify(selectableRows)}
                        selectable="multiple"
                        rowHover="highlight"
                        rowSeparator="border"
                        caption="Employee List - Multiple Selection"
                    ></mjo-table>
                </div>
            </div>

            <!-- Clickable Rows Section -->
            <div class="main-section">
                <h2 class="title">👆 Clickable Rows</h2>
                <p class="subtitle">Rows that respond to click events for navigation or actions.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows)}
                        rowClickable
                        rowHover="highlight"
                        rowSeparator="border"
                        caption="Clickable User Table - Try clicking on rows"
                    ></mjo-table>
                </div>
            </div>

            <!-- Pagination Section -->
            <div class="main-section">
                <h2 class="title">📄 Pagination</h2>
                <p class="subtitle">Handle large datasets with client-side pagination.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(paginationColumns)}
                        rows=${JSON.stringify(paginationRows)}
                        pageSize="10"
                        rowHover="highlight"
                        rowSeparator="contrast"
                        caption="Product Catalog - Paginated (10 items per page)"
                    ></mjo-table>
                </div>
            </div>

            <!-- Secondary Color Section -->
            <div class="main-section">
                <h2 class="title">🎨 Secondary Color</h2>
                <p class="subtitle">Table with secondary color scheme.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify(basicRows)}
                        color="secondary"
                        rowHover="highlight"
                        rowSeparator="border"
                        rowClickable
                    ></mjo-table>
                </div>
            </div>

            <!-- Empty State Section -->
            <div class="main-section">
                <h2 class="title">🗳️ Empty State</h2>
                <p class="subtitle">How the table appears when there's no data.</p>

                <div class="component-showcase">
                    <mjo-table
                        columns=${JSON.stringify(basicColumns)}
                        rows=${JSON.stringify([])}
                        rowHover="highlight"
                        rowSeparator="border"
                        caption="Empty Table Example"
                    ></mjo-table>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(tableTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/table-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-table.css"],
        });
    }
}
