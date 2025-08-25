// import { MjoTable } from "../../src/mjo-table.js";
import type { MjoTable } from "../../src/mjo-table";
import { MjoTableColumns, MjoTableRows } from "../../src/types/mjo-table";

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

// Import fixtures
import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";

// Import test utilities
import { assertHasShadowRoot, waitForComponentUpdate } from "../fixtures/test-utils.js";

// Import SSR helpers
import { setupSSREnvironment } from "../helpers/ssr-test-setup.js";

const TABLE_MODULE_PATH = "../../dist/mjo-table.js";

const COLUMNS: MjoTableColumns = [
    { name: "name", label: "Name", sortable: true, filterable: true, minWidth: 150 },
    { name: "email", label: "Email", sortable: true },
    { name: "age", label: "Age", sortable: true },
    { name: "city", label: "City" },
];

const ROWS: MjoTableRows = [
    { _key: 1, name: "John Doe", email: "john@example.com", age: 30, city: "New York" },
    { _key: 2, name: "Jane Smith", email: "jane@example.com", age: 25, city: "Los Angeles" },
    { _key: 3, name: "Alice Johnson", email: "alice@example.com", age: 28, city: "Chicago" },
    { _key: 4, name: "Bob Brown", email: "bob@example.com", age: 35, city: "Houston" },
    { _key: 5, name: "Charlie Davis", email: "charlie@example.com", age: 22, city: "Phoenix" },
];

/**
 * Helper function to get all visible table rows from the shadow DOM
 */
function getTableRows(element: MjoTable): HTMLTableRowElement[] {
    const tbody = element.shadowRoot?.querySelector("tbody");
    if (!tbody) return [];

    return Array.from(tbody.querySelectorAll("tr")).filter((row) => !row.classList.contains("no-data"));
}

/**
 * Helper function to get cell text content from a table row
 */
function getCellText(row: HTMLTableRowElement, columnIndex: number): string {
    const cell = row.children[columnIndex] as HTMLTableCellElement;
    return cell?.textContent?.trim() || "";
}

/**
 * Helper function to trigger sort on a column
 */
async function triggerSort(element: MjoTable, columnName: string): Promise<void> {
    const sortButton = element.shadowRoot?.querySelector(`sortable-button[columnname="${columnName}"]`);
    if (!sortButton) throw new Error(`Sort button for column "${columnName}" not found`);

    const button = sortButton.shadowRoot?.querySelector("button");
    if (!button) throw new Error(`Sort button element not found for column "${columnName}"`);

    button.click();
    await waitForComponentUpdate(element);
}

/**
 * Helper function to trigger filter on a column
 */
async function triggerFilter(element: MjoTable, columnName: string, filterValue: string): Promise<void> {
    const filterButton = element.shadowRoot?.querySelector(`filtrable-button[columnName="${columnName}"]`);
    if (!filterButton) throw new Error(`Filter button for column "${columnName}" not found`);

    // Open the filter input
    const button = filterButton.shadowRoot?.querySelector("button");
    if (!button) throw new Error(`Filter button element not found for column "${columnName}"`);

    button.click();
    await waitForComponentUpdate(element);

    // Type in the filter input
    const input = filterButton.shadowRoot?.querySelector("input");
    if (!input) throw new Error(`Filter input not found for column "${columnName}"`);

    input.value = filterValue;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await waitForComponentUpdate(element);
}

/**
 * Test suite for mjo-table component
 */
suite("mjo-table Component", () => {
    // Setup SSR environment before tests
    suiteSetup(() => {
        setupSSREnvironment({ verbose: false });
    });

    suite("Basic Rendering", () => {
        test("should render in CSR mode", async () => {
            const element = await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            });

            await waitForComponentUpdate(element);

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-table");
            assertHasShadowRoot(element);
        });

        test("should render in SSR non-hydrated mode", async () => {
            const element = await ssrNonHydratedFixture(html`<mjo-table columns=${JSON.stringify(COLUMNS)} rows=${JSON.stringify(ROWS)}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            });

            await waitForComponentUpdate(element);

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-table");
        });

        test("should render in SSR hydrated mode", async () => {
            const element = await ssrHydratedFixture(html`<mjo-table columns=${JSON.stringify(COLUMNS)} rows=${JSON.stringify(ROWS)}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            });

            await waitForComponentUpdate(element);

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-table");
            assertHasShadowRoot(element);
        });
    });

    suite("Sorting Functionality", () => {
        test("should sort by name column ascending", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Trigger sort on name column
            await triggerSort(element, "name");

            // Check internal state
            expect(element.sort.columnName).to.equal("name");
            expect(element.sort.direction).to.equal("asc");

            // Verify the rows are sorted alphabetically
            const tableRows = getTableRows(element);
            expect(tableRows).to.have.length(5);

            // Check that names are in alphabetical order
            const names = tableRows.map((row) => getCellText(row, 0));
            expect(names).to.deep.equal(["Alice Johnson", "Bob Brown", "Charlie Davis", "Jane Smith", "John Doe"]);
        });

        test("should sort by name column descending on second click", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // First click - ascending
            await triggerSort(element, "name");
            // Second click - descending
            await triggerSort(element, "name");

            // Check internal state
            expect(element.sort.columnName).to.equal("name");
            expect(element.sort.direction).to.equal("desc");

            // Verify the rows are sorted in reverse alphabetical order
            const tableRows = getTableRows(element);
            const names = tableRows.map((row) => getCellText(row, 0));
            expect(names).to.deep.equal(["John Doe", "Jane Smith", "Charlie Davis", "Bob Brown", "Alice Johnson"]);
        });

        test("should sort by age column (numeric sort)", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Trigger sort on age column
            await triggerSort(element, "age");

            // Check internal state
            expect(element.sort.columnName).to.equal("age");
            expect(element.sort.direction).to.equal("asc");

            // Verify the rows are sorted by age (numeric)
            const tableRows = getTableRows(element);
            const ages = tableRows.map((row) => parseInt(getCellText(row, 2)));
            expect(ages).to.deep.equal([22, 25, 28, 30, 35]);

            // Also check that the corresponding names are correct
            const names = tableRows.map((row) => getCellText(row, 0));
            expect(names).to.deep.equal([
                "Charlie Davis", // age 22
                "Jane Smith", // age 25
                "Alice Johnson", // age 28
                "John Doe", // age 30
                "Bob Brown", // age 35
            ]);
        });

        test("should sort by email column", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Trigger sort on email column
            await triggerSort(element, "email");

            // Check internal state
            expect(element.sort.columnName).to.equal("email");
            expect(element.sort.direction).to.equal("asc");

            // Verify the rows are sorted by email alphabetically
            const tableRows = getTableRows(element);
            const emails = tableRows.map((row) => getCellText(row, 1));
            expect(emails).to.deep.equal(["alice@example.com", "bob@example.com", "charlie@example.com", "jane@example.com", "john@example.com"]);
        });
    });

    suite("Filtering Functionality", () => {
        test("should filter by name containing 'John'", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Apply filter
            await triggerFilter(element, "name", "John");

            // Check internal filter state
            expect(element.filters.columnName).to.equal("name");
            expect(element.filters.filter).to.equal("John");

            // Verify only matching rows are displayed
            const tableRows = getTableRows(element);
            expect(tableRows).to.have.length(2); // John Doe and Alice Johnson

            const names = tableRows.map((row) => getCellText(row, 0));
            expect(names).to.include("John Doe");
            expect(names).to.include("Alice Johnson");
        });

        test("should filter by name containing 'Smith'", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Apply filter
            await triggerFilter(element, "name", "Smith");

            // Check internal filter state
            expect(element.filters.columnName).to.equal("name");
            expect(element.filters.filter).to.equal("Smith");

            // Verify only Jane Smith is displayed
            const tableRows = getTableRows(element);
            expect(tableRows).to.have.length(1);

            const name = getCellText(tableRows[0], 0);
            expect(name).to.equal("Jane Smith");
        });

        test("should filter case-insensitively", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Apply filter with different case
            await triggerFilter(element, "name", "john");

            // Verify case-insensitive matching works
            const tableRows = getTableRows(element);
            expect(tableRows).to.have.length(2); // John Doe and Alice Johnson

            const names = tableRows.map((row) => getCellText(row, 0));
            expect(names).to.include("John Doe");
            expect(names).to.include("Alice Johnson");
        });

        test("should show no results for non-matching filter", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Apply filter that matches nothing
            await triggerFilter(element, "name", "NonExistent");

            // Check internal filter state
            expect(element.filters.columnName).to.equal("name");
            expect(element.filters.filter).to.equal("NonExistent");

            // Verify no data row is displayed
            const tbody = element.shadowRoot?.querySelector("tbody");
            const noDataRow = tbody?.querySelector("tr.no-data");
            expect(noDataRow).to.exist;

            const noDataCell = noDataRow?.querySelector("td");
            expect(noDataCell?.textContent?.trim()).to.equal("No data");
        });

        test("should clear filter when empty value is provided", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // First apply a filter
            await triggerFilter(element, "name", "John");

            // Verify filter is applied
            let tableRows = getTableRows(element);
            expect(tableRows).to.have.length(2);

            // Clear the filter
            await triggerFilter(element, "name", "");

            // Check that filter state is cleared
            expect(element.filters.columnName).to.be.undefined;
            expect(element.filters.filter).to.be.undefined;

            // Verify all rows are displayed again
            tableRows = getTableRows(element);
            expect(tableRows).to.have.length(5);
        });
    });

    suite("Combined Sorting and Filtering", () => {
        test("should apply both filter and sort correctly", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // First filter to get subset
            await triggerFilter(element, "name", "o"); // Should match John Doe, Bob Brown, Alice Johnson

            // Then sort by name
            await triggerSort(element, "name");

            // Check both filter and sort states
            expect(element.filters.columnName).to.equal("name");
            expect(element.filters.filter).to.equal("o");
            expect(element.sort.columnName).to.equal("name");
            expect(element.sort.direction).to.equal("asc");

            // Verify filtered and sorted results
            const tableRows = getTableRows(element);
            expect(tableRows).to.have.length(3);

            const names = tableRows.map((row) => getCellText(row, 0));
            expect(names).to.deep.equal(["Alice Johnson", "Bob Brown", "John Doe"]);
        });

        test("should maintain sort when filter is applied", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // First sort by age descending
            await triggerSort(element, "age");
            await triggerSort(element, "age"); // Second click for descending

            // Then apply filter
            await triggerFilter(element, "name", "o"); // Should match John Doe (30), Bob Brown (35), Alice Johnson (28)

            // Verify that sort is maintained within filtered results
            const tableRows = getTableRows(element);
            expect(tableRows).to.have.length(3);

            // Ages should still be sorted in descending order within filtered results
            const ages = tableRows.map((row) => parseInt(getCellText(row, 2)));
            expect(ages).to.deep.equal([35, 30, 28]); // Bob Brown, John Doe, Alice Johnson

            const names = tableRows.map((row) => getCellText(row, 0));
            expect(names).to.deep.equal([
                "Bob Brown", // age 35
                "John Doe", // age 30
                "Alice Johnson", // age 28
            ]);
        });
    });
});
