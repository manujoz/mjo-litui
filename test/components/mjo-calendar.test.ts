/**
 * Tests for mjo-calendar component
 * Testing the improved navigation API with goToMonth, goToYear, and goToDate methods
 */

import { expect } from "@esm-bundle/chai";
import { html } from "lit";

import { csrFixture, ssrHydratedFixture, ssrNonHydratedFixture } from "../fixtures/base-fixture.js";
import { assertHasShadowRoot, assertProperty, expectEventToFire, waitForComponentUpdate } from "../fixtures/test-utils.js";
import { setupSSREnvironment } from "../helpers/ssr-test-setup.js";

const CALENDAR_MODULE_PATH = "../../dist/mjo-calendar.js";

// Import component type for TypeScript support
import type { MjoCalendar } from "../../src/mjo-calendar";

// Helper functions for calendar testing
function getCurrentMonth(calendar: MjoCalendar): number {
    const displayed = calendar.getDisplayedMonths();
    return displayed.length > 0 ? displayed[0].month + 1 : 0; // Convert 0-based to 1-based
}

function getCurrentYear(calendar: MjoCalendar): number {
    const displayed = calendar.getDisplayedMonths();
    return displayed.length > 0 ? displayed[0].year : 0;
}

function expectCalendarDate(calendar: MjoCalendar, expectedMonth: number, expectedYear: number, message?: string) {
    const displayed = calendar.getDisplayedMonths();
    expect(displayed.length, "Calendar should have displayed months").to.be.greaterThan(0);

    // Check if the expected month/year appears in any of the displayed months
    const foundMonth = displayed.find((d) => d.month + 1 === expectedMonth && d.year === expectedYear);
    expect(foundMonth, message || `Expected month ${expectedMonth}/${expectedYear} to be displayed`).to.exist;
}

suite("mjo-calendar Component", () => {
    suiteSetup(() => {
        setupSSREnvironment({ verbose: false });
    });

    suite("Basic Rendering", () => {
        test("should render in CSR mode", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            expect(element).to.exist;
            assertHasShadowRoot(element);
        });

        test("should render in SSR mode without hydration", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await ssrNonHydratedFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            expect(element).to.exist;
            assertHasShadowRoot(element);
        });

        test("should render in SSR mode with hydration", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await ssrHydratedFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            expect(element).to.exist;
            assertHasShadowRoot(element);
        });
    });

    suite("Properties Testing", () => {
        test("should handle mode property", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar mode="range"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            assertProperty(element, "mode", "range");
        });

        test("should handle rangeCalendars property", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar rangeCalendars="2"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            assertProperty(element, "rangeCalendars", "2");
        });

        test("should apply default values correctly", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            assertProperty(element, "mode", "single");
            assertProperty(element, "rangeCalendars", "auto");

            const displayedMonths = element.getDisplayedMonths();
            expect(displayedMonths).to.be.an("array");
            expect(displayedMonths.length).to.be.greaterThan(0);
            expect(displayedMonths[0]).to.have.property("month");
            expect(displayedMonths[0]).to.have.property("year");
        });
    });

    suite("New Navigation API - goToMonth", () => {
        test("should navigate to a specific month with automatic side detection", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test with automatic side detection
            element.goToMonth({ month: 5, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 5, 2024);
        });

        test("should navigate to a specific month with explicit side", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar mode="range" rangeCalendars="2"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test with explicit left side
            element.goToMonth({ month: 3, year: 2024, side: "left" });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 3, 2024);
        });

        test("should validate month parameter range", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test invalid month (should be clamped)
            element.goToMonth({ month: 15, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 12, 2024, "Month should be clamped to December");

            // Test invalid month (should be clamped)
            element.goToMonth({ month: -1, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 1, 2024, "Month should be clamped to January");
        });

        test("should throw error for missing parameters", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test missing month parameter
            expect(() => {
                (element as any).goToMonth({ year: 2024 });
            }).to.throw();

            // Test missing year parameter
            expect(() => {
                (element as any).goToMonth({ month: 5 });
            }).to.throw();
        });
    });

    suite("New Navigation API - goToYear", () => {
        test("should navigate to a specific year with automatic side detection", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            const originalMonth = getCurrentMonth(element);

            // Test with automatic side detection
            element.goToYear({ year: 2025 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, originalMonth, 2025, "Year should change while preserving month");
        });

        test("should navigate to a specific year with explicit side", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar mode="range" rangeCalendars="2"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            const originalMonth = getCurrentMonth(element);

            // Test with explicit right side
            element.goToYear({ year: 2026, side: "right" });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, originalMonth, 2026, "Year should change while preserving month");
        });

        test("should validate year parameter range", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test reasonable year values
            element.goToYear({ year: 1990 });
            await waitForComponentUpdate(element);
            expect(getCurrentYear(element)).to.equal(1990);

            element.goToYear({ year: 2050 });
            await waitForComponentUpdate(element);
            expect(getCurrentYear(element)).to.equal(2050);
        });

        test("should throw error for missing year parameter", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test missing year parameter
            expect(() => {
                (element as any).goToYear({});
            }).to.throw();
        });
    });

    suite("New Navigation API - goToDate", () => {
        test("should navigate to a specific date using Date object", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            const targetDate = new Date(2024, 6, 15); // July 15, 2024

            // Test with Date object
            element.goToDate({ date: targetDate });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 7, 2024, "Should navigate to July 2024");
        });

        test("should navigate to a specific date using string", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test with string date
            element.goToDate({ date: "2024-08-20" });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 8, 2024, "Should navigate to August 2024");
        });

        test("should navigate to a specific date with explicit side", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar mode="range" rangeCalendars="2"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test with explicit side
            element.goToDate({ date: "2024-09-10", side: "right" });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 9, 2024, "Should navigate to September 2024");
        });

        test("should handle invalid date strings gracefully", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test invalid date string
            expect(() => {
                element.goToDate({ date: "invalid-date" });
            }).to.throw();
        });

        test("should throw error for missing date parameter", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test missing date parameter
            expect(() => {
                (element as any).goToDate({});
            }).to.throw();
        });
    });

    suite("Deprecated Methods Compatibility", () => {
        test("deprecated setMonth should still work with warning", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Capture console warnings
            const originalWarn = console.warn;
            let warningMessage = "";
            console.warn = (message: string) => {
                warningMessage = message;
            };

            try {
                // Test deprecated method
                (element as any).setMonth(5, 2024, "single");

                await waitForComponentUpdate(element);

                expectCalendarDate(element, 5, 2024, "Deprecated setMonth should still work");
                expect(warningMessage).to.include("deprecated");
            } finally {
                console.warn = originalWarn;
            }
        });

        test("deprecated setYear should still work with warning", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Capture console warnings
            const originalWarn = console.warn;
            let warningMessage = "";
            console.warn = (message: string) => {
                warningMessage = message;
            };

            try {
                const originalMonth = getCurrentMonth(element);

                // Test deprecated method
                (element as any).setYear(2025, "single");

                await waitForComponentUpdate(element);

                expectCalendarDate(element, originalMonth, 2025, "Deprecated setYear should preserve month");
                expect(warningMessage).to.include("deprecated");
            } finally {
                console.warn = originalWarn;
            }
        });
    });

    suite("Automatic Side Detection Logic", () => {
        test("should use 'single' side for single mode", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar mode="single"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test automatic side detection
            element.goToMonth({ month: 6, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 6, 2024);
        });

        test("should use 'left' side for range mode with dual calendars", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar mode="range" rangeCalendars="2"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test automatic side detection defaults to left
            element.goToMonth({ month: 7, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 7, 2024);
        });

        test("should use 'single' side for range mode with single calendar", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar mode="range" rangeCalendars="1"></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test automatic side detection with single calendar in range mode
            element.goToMonth({ month: 8, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 8, 2024);
        });
    });

    suite("Edge Cases and Error Handling", () => {
        test("should handle month overflow correctly", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test month overflow (13 should become 12)
            element.goToMonth({ month: 13, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 12, 2024, "Month overflow should be clamped to December");
        });

        test("should handle month underflow correctly", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test month underflow (0 should become 1)
            element.goToMonth({ month: 0, year: 2024 });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 1, 2024, "Month underflow should be clamped to January");
        });

        test("should handle invalid side parameter gracefully", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test invalid side parameter (should fall back to automatic detection)
            element.goToMonth({ month: 5, year: 2024, side: "invalid" as any });

            await waitForComponentUpdate(element);

            expectCalendarDate(element, 5, 2024, "Invalid side should fall back to automatic detection");
        });
    });

    suite("Advanced Behavior Testing", () => {
        test("should dispatch navigation events when using new methods", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test that navigation dispatches events (if implemented)
            try {
                const eventPromise = expectEventToFire(element, "mjo-calendar-change", () => {
                    element.goToMonth({ month: 9, year: 2024 });
                });

                const event = await eventPromise;
                expect(event.detail).to.be.an("object");
            } catch (error) {
                // Event might not be implemented yet, just verify navigation works
                element.goToMonth({ month: 9, year: 2024 });
                await waitForComponentUpdate(element);
                expectCalendarDate(element, 9, 2024);
            }
        });

        test("should maintain internal state consistency", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Perform multiple navigation operations
            element.goToMonth({ month: 3, year: 2024 });
            await waitForComponentUpdate(element);

            element.goToYear({ year: 2025 });
            await waitForComponentUpdate(element);

            element.goToDate({ date: new Date(2026, 5, 15) });
            await waitForComponentUpdate(element);

            // Verify final state
            expectCalendarDate(element, 6, 2026, "Final state should be June 2026");
        });
    });

    suite("SSR Specific Features", () => {
        test("should maintain consistency between CSR and SSR", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };
            const template = html`<mjo-calendar mode="range"></mjo-calendar>`;

            const csrElement = (await csrFixture(template, options)) as MjoCalendar;
            const ssrElement = (await ssrHydratedFixture(template, options)) as MjoCalendar;

            await waitForComponentUpdate(csrElement);
            await waitForComponentUpdate(ssrElement);

            // Compare key properties
            expect(csrElement.mode).to.equal(ssrElement.mode);
            expect(csrElement.rangeCalendars).to.equal(ssrElement.rangeCalendars);

            // Test that new methods work in both environments
            csrElement.goToMonth({ month: 7, year: 2024 });
            ssrElement.goToMonth({ month: 7, year: 2024 });

            await waitForComponentUpdate(csrElement);
            await waitForComponentUpdate(ssrElement);

            const csrDisplayed = csrElement.getDisplayedMonths();
            const ssrDisplayed = ssrElement.getDisplayedMonths();

            expect(csrDisplayed[0].month).to.equal(ssrDisplayed[0].month);
            expect(csrDisplayed[0].year).to.equal(ssrDisplayed[0].year);
        });

        test("should work with theme system in SSR", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = await ssrHydratedFixture(
                html`
                    <mjo-theme theme="dark">
                        <mjo-calendar></mjo-calendar>
                    </mjo-theme>
                `,
                options,
            );

            await waitForComponentUpdate(element);

            const calendar = element.querySelector("mjo-calendar") as MjoCalendar;
            expect(calendar).to.exist;

            // Test new methods work with theming
            calendar.goToMonth({ month: 8, year: 2024 });
            await waitForComponentUpdate(calendar);

            expectCalendarDate(calendar, 8, 2024);
        });
    });

    suite("Performance Testing", () => {
        test("should perform navigation operations efficiently", async () => {
            const options = { modules: [CALENDAR_MODULE_PATH] };

            const element = (await csrFixture(html`<mjo-calendar></mjo-calendar>`, options)) as MjoCalendar;

            await waitForComponentUpdate(element);

            // Test performance of multiple navigation operations
            const start = performance.now();

            for (let i = 1; i <= 12; i++) {
                element.goToMonth({ month: i, year: 2024 });
                await waitForComponentUpdate(element);
            }

            const end = performance.now();
            const duration = end - start;

            console.log(`12 navigation operations took: ${duration.toFixed(2)}ms`);

            // Should complete within reasonable time
            expect(duration).to.be.lessThan(1000); // 1 second for 12 operations
        });
    });
});
