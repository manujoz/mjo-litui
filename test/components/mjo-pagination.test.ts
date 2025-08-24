/**
 * Test suite for mjo-pagination component
 * Tests basic functionality without complex dependencies
 */

import type { MjoPagination } from "../../src/mjo-pagination";

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

// Import fixtures
import { csrFixture } from "../fixtures/base-fixture.js";

// Import test utilities
import { assertHasShadowRoot, assertProperty, waitForComponentUpdate } from "../fixtures/test-utils.js";

// Component import path - this will load the component definition
const PAGINATION_MODULE_PATH = "../../dist/mjo-pagination.js";

/**
 * Test suite for mjo-pagination component
 */
suite("mjo-pagination Component", () => {
    /**
     * Basic rendering tests - verifies component renders correctly
     */
    suite("Basic Rendering", () => {
        test("should render in CSR mode", async () => {
            const element = await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            });

            expect(element).to.exist;
            expect(element.tagName.toLowerCase()).to.equal("mjo-pagination");
            assertHasShadowRoot(element);
        });

        test("should not render when totalPages <= 1", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="5" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            // Should not render pagination navigation when only 1 page or less
            const nav = element.shadowRoot?.querySelector("nav.pagination");
            expect(nav).to.not.exist;
        });
    });

    /**
     * Properties tests - verifies component properties work correctly
     */
    suite("Properties", () => {
        test("should set totalItems property correctly", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="200"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            expect(element).to.have.property("totalItems", 200);
        });

        test("should set pageSize property correctly", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="25"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            expect(element).to.have.property("pageSize", 25);
        });

        test("should set currentPage property correctly", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" currentPage="3"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            expect(element).to.have.property("currentPage", 3);
        });

        test("should set size property correctly", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" size="large"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            expect(element).to.have.property("size", "large");
        });

        test("should set color property correctly", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" color="secondary"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            expect(element).to.have.property("color", "secondary");
        });

        test("should set boolean properties correctly", async () => {
            const element = (await csrFixture(
                html`<mjo-pagination
                    totalItems="100"
                    pageSize="10"
                    ?hideFirstLast=${true}
                    ?hidePrevNext=${true}
                    ?showPageSizeSelector=${true}
                    ?disabled=${true}
                ></mjo-pagination>`,
                { modules: [PAGINATION_MODULE_PATH] },
            )) as MjoPagination;

            await waitForComponentUpdate(element);

            expect(element.hideFirstLast).to.be.true;
            expect(element.hidePrevNext).to.be.true;
            expect(element.showPageSizeSelector).to.be.true;
            expect(element.disabled).to.be.true;
        });

        test("should apply default values correctly", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            assertProperty(element, "pageSize", 10);
            assertProperty(element, "currentPage", 1);
            assertProperty(element, "siblingCount", 1);
            assertProperty(element, "hideFirstLast", false);
            assertProperty(element, "hidePrevNext", false);
            assertProperty(element, "showPageSizeSelector", false);
            assertProperty(element, "size", "medium");
            assertProperty(element, "color", "primary");
            assertProperty(element, "disabled", false);
            assertProperty(element, "locale", "en");
        });
    });

    /**
     * Navigation methods tests - verifies public methods work correctly
     */
    suite("Navigation Methods", () => {
        test("should navigate using goToPage method", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            element.goToPage(5);
            expect(element.currentPage).to.equal(5);

            element.goToPage(1);
            expect(element.currentPage).to.equal(1);
        });

        test("should navigate using nextPage method", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" currentPage="3"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            element.nextPage();
            expect(element.currentPage).to.equal(4);
        });

        test("should navigate using previousPage method", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" currentPage="3"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            element.previousPage();
            expect(element.currentPage).to.equal(2);
        });

        test("should navigate using firstPage method", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" currentPage="5"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            element.firstPage();
            expect(element.currentPage).to.equal(1);
        });

        test("should navigate using lastPage method", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" currentPage="1"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            element.lastPage();
            expect(element.currentPage).to.equal(10); // 100/10 = 10 pages
        });

        test("should change page size using setPageSize method", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" currentPage="5"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            element.setPageSize(25);
            expect(element.pageSize).to.equal(25);
            // Page 5 with 10 items = items 41-50. With 25 items per page, items 41-50 should be on page 2
            expect(element.currentPage).to.equal(2);
        });

        test("should not navigate beyond bounds", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            // Try to go to page 0 (below minimum)
            element.goToPage(0);
            expect(element.currentPage).to.equal(1);

            // Try to go beyond last page
            element.goToPage(15);
            expect(element.currentPage).to.equal(1); // Should stay at current page

            // Try previous page when at first page
            element.previousPage();
            expect(element.currentPage).to.equal(1);

            // Go to last page and try next
            element.lastPage();
            expect(element.currentPage).to.equal(10);
            element.nextPage();
            expect(element.currentPage).to.equal(10); // Should stay at last page
        });

        test("should not navigate when disabled", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" ?disabled=${true}></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            const originalPage = element.currentPage;

            element.goToPage(5);
            expect(element.currentPage).to.equal(originalPage);

            element.nextPage();
            expect(element.currentPage).to.equal(originalPage);
        });
    });

    /**
     * Edge cases and validation tests
     */
    suite("Edge Cases and Validation", () => {
        test("should handle zero totalItems", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="0" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            // Should not render anything when no items
            const nav = element.shadowRoot?.querySelector("nav.pagination");
            expect(nav).to.not.exist;
        });

        test("should handle very large numbers", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="10000" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            element.goToPage(500);
            expect(element.currentPage).to.equal(500);

            element.lastPage();
            expect(element.currentPage).to.equal(1000); // 10000/10 = 1000 pages
        });

        test("should adjust currentPage when totalItems changes", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" currentPage="8"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            expect(element.currentPage).to.equal(8);

            // Reduce totalItems so current page becomes invalid
            element.totalItems = 50; // Now only 5 pages
            await waitForComponentUpdate(element);

            // Current page should be adjusted to last valid page
            expect(element.currentPage).to.equal(5);
        });
    });

    /**
     * Localization tests - verifies locale support
     */
    suite("Localization", () => {
        test("should use default english locale", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            expect(element.locale).to.equal("en");
            expect(element.labels.first).to.equal("First");
            expect(element.labels.previous).to.equal("Previous");
            expect(element.labels.next).to.equal("Next");
            expect(element.labels.last).to.equal("Last");
        });
    });

    /**
     * Layout Stability tests - verifies consistent element count for stable UI
     */
    suite("Layout Stability", () => {
        test("should maintain consistent element count across different page positions", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" siblingCount="1"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            const testPageCounts: Array<{ page: number; expectedCount: number; range: (number | "ellipsis")[] }> = [];

            // Test pages 1-10 and collect element counts
            for (let page = 1; page <= 10; page++) {
                element.currentPage = page;
                await waitForComponentUpdate(element);

                const pageRange = element.getPageRange();
                testPageCounts.push({
                    page,
                    expectedCount: pageRange.length,
                    range: pageRange,
                });

                console.log(`Page ${page}: [${pageRange.join(", ")}] - Count: ${pageRange.length}`);
            }

            // Check for layout stability - all pages should have the same element count
            const firstCount = testPageCounts[0].expectedCount;
            const allSameCount = testPageCounts.every((item) => item.expectedCount === firstCount);

            if (!allSameCount) {
                const countVariations = testPageCounts.map((item) => `Page ${item.page}: ${item.expectedCount} elements [${item.range.join(", ")}]`);
                throw new Error(`Layout instability detected!\n${countVariations.join("\n")}`);
            }

            expect(allSameCount).to.be.true;
        });

        test("should handle edge cases maintaining stability", async () => {
            // Test with different configurations
            const testConfigs = [
                { totalItems: 50, pageSize: 10, siblingCount: 1 }, // 5 total pages - should show all
                { totalItems: 200, pageSize: 20, siblingCount: 2 }, // 10 total pages with more siblings
                { totalItems: 300, pageSize: 25, siblingCount: 1 }, // 12 total pages
            ];

            for (const config of testConfigs) {
                const element = (await csrFixture(
                    html`<mjo-pagination totalItems=${config.totalItems} pageSize=${config.pageSize} siblingCount=${config.siblingCount}></mjo-pagination>`,
                    { modules: [PAGINATION_MODULE_PATH] },
                )) as MjoPagination;

                await waitForComponentUpdate(element);

                const totalPages = Math.ceil(config.totalItems / config.pageSize);
                const testPages = Math.min(totalPages, 6); // Test first 6 pages or total if less

                const counts: number[] = [];

                for (let page = 1; page <= testPages; page++) {
                    element.currentPage = page;
                    await waitForComponentUpdate(element);

                    const pageRange = element.getPageRange();
                    counts.push(pageRange.length);
                }

                // All counts should be the same for this configuration
                const firstCount = counts[0];
                const isStable = counts.every((count) => count === firstCount);

                if (!isStable) {
                    throw new Error(`Config ${JSON.stringify(config)} is unstable: ${counts.join(", ")}`);
                }

                expect(isStable).to.be.true;
            }
        });

        test("should generate expected patterns for specific scenarios", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10" siblingCount="1"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            // Test specific scenarios that were problematic
            const testCases = [
                { page: 1, description: "Page 1 - start boundary" },
                { page: 2, description: "Page 2 - near start" },
                { page: 3, description: "Page 3 - middle transition" },
                { page: 5, description: "Page 5 - middle" },
                { page: 8, description: "Page 8 - near end" },
                { page: 9, description: "Page 9 - near end boundary" },
                { page: 10, description: "Page 10 - end boundary" },
            ];

            const ranges: Array<{ page: number; range: (number | "ellipsis")[]; count: number }> = [];

            for (const testCase of testCases) {
                element.currentPage = testCase.page;
                await waitForComponentUpdate(element);

                const pageRange = element.getPageRange();
                ranges.push({
                    page: testCase.page,
                    range: pageRange,
                    count: pageRange.length,
                });

                console.log(`${testCase.description}: [${pageRange.join(", ")}] - Count: ${pageRange.length}`);
            }

            // Verify all ranges have consistent element count
            const firstCount = ranges[0].count;
            const allConsistent = ranges.every((item) => item.count === firstCount);

            expect(allConsistent).to.be.true;

            // Additional checks for logical correctness
            ranges.forEach((item) => {
                expect(item.range).to.include(1); // Always includes first page
                expect(item.range).to.include(10); // Always includes last page
                expect(item.range).to.include(item.page); // Always includes current page
            });
        });

        test("should not have ellipsis when all pages fit", async () => {
            // With only 5 pages and siblingCount=1, all pages should be visible
            const element = (await csrFixture(html`<mjo-pagination totalItems="50" pageSize="10" siblingCount="1"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            element.currentPage = 3;
            await waitForComponentUpdate(element);

            const pageRange = element.getPageRange();

            expect(pageRange).to.deep.equal([1, 2, 3, 4, 5]);
            expect(pageRange).to.not.include("ellipsis");
        });

        test("should access generatePageRange method publicly", async () => {
            const element = (await csrFixture(html`<mjo-pagination totalItems="100" pageSize="10"></mjo-pagination>`, {
                modules: [PAGINATION_MODULE_PATH],
            })) as MjoPagination;

            await waitForComponentUpdate(element);

            // Test that generatePageRange is accessible and returns expected type
            const pageRange = element.getPageRange();
            expect(pageRange).to.be.an("array");
            expect(pageRange.length).to.be.greaterThan(0);

            // All items should be either numbers or "ellipsis"
            pageRange.forEach((item) => {
                expect(typeof item === "number" || item === "ellipsis").to.be.true;
            });
        });
    });
});
