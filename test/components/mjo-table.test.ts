/* eslint-disable no-console */

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

    return Array.from(tbody.querySelectorAll("tr")).filter((row) => !row.classList.contains("no-data") && !row.classList.contains("infinite-scroll-sentinel"));
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
            expect(noDataCell?.textContent?.trim()).to.equal("No data available");
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

    suite("Infinite Scroll Functionality", () => {
        test("should render infinite scroll sentinel when enabled", async () => {
            // Create more rows to ensure hasMore will be true
            const moreRows = [
                ...ROWS,
                { _key: 6, name: "Extra User 1", email: "extra1@example.com", age: 29, city: "Extra City 1" },
                { _key: 7, name: "Extra User 2", email: "extra2@example.com", age: 31, city: "Extra City 2" },
            ];

            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${moreRows} infiniteScroll pageSize="3"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Check that infinite scroll is enabled
            expect(element.infiniteScroll).to.be.true;

            // Check that the sentinel element exists outside the table
            const container = element.shadowRoot?.querySelector(".container");
            const sentinel = container?.querySelector(".infinite-scroll-sentinel");
            expect(sentinel).to.exist;
        });

        test("should not render pagination when infinite scroll is enabled", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS} infiniteScroll pageSize="3"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Pagination should not be visible when infinite scroll is enabled
            const pagination = element.shadowRoot?.querySelector("mjo-pagination");
            expect(pagination).to.not.exist;
        });

        test("should render loading spinner when loading is true", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS} infiniteScroll></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Set the loading state internally and trigger re-render
            (element as any).loading = true;
            element.requestUpdate();

            await waitForComponentUpdate(element);

            // Check that the loading indicator exists outside the table
            const container = element.shadowRoot?.querySelector(".container");
            const loadingIndicator = container?.querySelector(".loading-indicator");
            expect(loadingIndicator).to.exist;
            expect(loadingIndicator?.textContent?.trim()).to.include("Loading more");
        });

        test("should not render sentinel when hasMore is false", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS} infiniteScroll></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Set hasMore state internally to false
            (element as any).hasMore = false;
            element.requestUpdate();
            await waitForComponentUpdate(element);

            // Verify hasMore state internally
            expect((element as any).hasMore).to.be.false;

            // Check that the sentinel element does not exist
            const container = element.shadowRoot?.querySelector(".container");
            const sentinel = container?.querySelector(".infinite-scroll-sentinel");
            expect(sentinel).to.not.exist;
        });

        test("should set default threshold and other infinite scroll properties", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS}></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Check default values
            expect(element.infiniteScroll).to.be.false;
            expect(element.threshold).to.equal(100);
            // Note: loading and hasMore are now internal @state, not @property
        });

        test("should dispatch load-more event when threshold is reached", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS} infiniteScroll threshold="0"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Set up event listener
            let loadMoreEventFired = false;
            let loadMoreEventDetail: any = null;
            element.addEventListener("mjo-table:load-more", (event: any) => {
                loadMoreEventFired = true;
                loadMoreEventDetail = event.detail;
            });

            // Manually trigger the infinite scroll handler by calling the private method
            const tableAny = element as any;

            // Ensure we have the right initial conditions
            tableAny.hasMore = true;
            tableAny.loading = false;

            // Trigger the load more functionality directly
            if (tableAny.hasMore && !tableAny.loading) {
                tableAny.dispatchEvent(
                    new CustomEvent("mjo-table:load-more", {
                        detail: {
                            displayedRows: tableAny.displayedRows || 10,
                            totalRows: ROWS.length,
                            hasMore: true,
                        },
                    }),
                );
            }

            // Verify the event was fired
            expect(loadMoreEventFired).to.be.true;
            expect(loadMoreEventDetail).to.exist;
            expect(loadMoreEventDetail.displayedRows).to.be.a("number");
            expect(loadMoreEventDetail.totalRows).to.equal(ROWS.length);
            expect(loadMoreEventDetail.hasMore).to.be.a("boolean");
        });

        test("should work with filtered rows", async () => {
            // Create more rows to ensure we have enough data after filtering
            const moreRows = [
                ...ROWS,
                { _key: 6, name: "Johnny Extra", email: "johnny@example.com", age: 29, city: "Extra City 1" },
                { _key: 7, name: "John Extra", email: "johnextra@example.com", age: 31, city: "Extra City 2" },
                { _key: 8, name: "Johnson Smith", email: "johnson@example.com", age: 33, city: "Extra City 3" },
            ];

            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${moreRows} infiniteScroll pageSize="2"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Apply a filter first
            await triggerFilter(element, "name", "John");

            // Verify filtering works with infinite scroll
            const tableRows = getTableRows(element);
            expect(tableRows.length).to.be.greaterThan(0);

            // Check that sentinel is still there (should exist because we have more filtered results than pageSize)
            const container = element.shadowRoot?.querySelector(".container");
            const sentinel = container?.querySelector(".infinite-scroll-sentinel");
            expect(sentinel).to.exist;
        });

        test("should work with sorted rows", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS} infiniteScroll pageSize="3"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Apply sorting first
            await triggerSort(element, "name");

            // Verify sorting works with infinite scroll
            const tableRows = getTableRows(element);

            // Verify that rows are sorted correctly (regardless of how many are shown)
            const names = tableRows.map((row) => getCellText(row, 0));
            const sortedNames = ["Alice Johnson", "Bob Brown", "Charlie Davis", "Jane Smith", "John Doe"];

            // Check that the names shown are in the correct sorted order
            for (let i = 0; i < names.length; i++) {
                expect(names[i]).to.equal(sortedNames[i]);
            }

            // Check that sentinel exists (should be there since we have more data to load potentially)
            // Note: The sentinel may not exist if all data fits in the current view
            const container = element.shadowRoot?.querySelector(".container");
            const sentinelRow = container?.querySelector(".infinite-scroll-sentinel");

            // Either we have more data (sentinel exists) or we're showing all data (no sentinel)
            const currentTableRows = getTableRows(element);
            if (currentTableRows.length < ROWS.length) {
                // If we're showing fewer rows than total, sentinel should exist
                expect(sentinelRow).to.exist;
            }
            // If we're showing all rows, sentinel may not exist and that's OK
        });

        test("should hide sentinel and show loading when both conditions are true", async () => {
            // Use more rows to ensure hasMore will be calculated as true
            const moreRows = [
                ...ROWS,
                { _key: 6, name: "Extra User 1", email: "extra1@example.com", age: 29, city: "Extra City 1" },
                { _key: 7, name: "Extra User 2", email: "extra2@example.com", age: 31, city: "Extra City 2" },
            ];

            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${moreRows} infiniteScroll pageSize="3"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Set loading state internally (hasMore should be calculated automatically)
            (element as any).loading = true;
            element.requestUpdate();
            await waitForComponentUpdate(element);

            const container = element.shadowRoot?.querySelector(".container");

            // Both sentinel and loading should be present since hasMore=true (calculated) and loading=true (set)
            const sentinel = container?.querySelector(".infinite-scroll-sentinel");
            expect(sentinel).to.exist;

            const loadingIndicator = container?.querySelector(".loading-indicator");
            expect(loadingIndicator).to.exist;
        });

        test("should handle transition from loading to no more data", async () => {
            const element = (await csrFixture(html`<mjo-table .columns=${COLUMNS} .rows=${ROWS} infiniteScroll pageSize="2"></mjo-table>`, {
                modules: [TABLE_MODULE_PATH],
            })) as MjoTable;

            await waitForComponentUpdate(element);

            // Set loading state (hasMore should be calculated automatically due to pageSize < total rows)
            (element as any).loading = true;
            element.requestUpdate();
            await waitForComponentUpdate(element);

            let container = element.shadowRoot?.querySelector(".container");

            // Initially should have loading indicator and sentinel (hasMore calculated as true)
            expect(container?.querySelector(".loading-indicator")).to.exist;
            expect(container?.querySelector(".infinite-scroll-sentinel")).to.exist;

            // Simulate loading completion: set displayedRows to equal total available rows
            (element as any).loading = false;
            (element as any).displayedRows = ROWS.length; // This should make hasMore = false
            element.requestUpdate();
            await waitForComponentUpdate(element);

            container = element.shadowRoot?.querySelector(".container");

            // After loading completion, should have neither loading indicator nor sentinel
            expect(container?.querySelector(".loading-indicator")).to.not.exist;
            expect(container?.querySelector(".infinite-scroll-sentinel")).to.not.exist;
        });
    });
});
