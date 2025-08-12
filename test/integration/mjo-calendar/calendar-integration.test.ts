import type { MjoCalendar } from "../../../src/mjo-calendar.js";
import type { CalendarDateSelectedEvent, CalendarRangeSelectedEvent } from "../../../src/types/mjo-calendar.js";

import { expect } from "@esm-bundle/chai";
import "../../../src/mjo-calendar.js";
import { CalendarAssertions, CalendarTestUtils } from "../../utils/calendar-test-utils.js";

suite("mjo-calendar - Integration Tests", () => {
    let calendar: MjoCalendar;

    teardown(() => {
        calendar?.remove();
    });

    suite("Complete User Workflows", () => {
        test("should complete single date selection workflow", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({
                mode: "single",
                locale: "en",
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            let eventFired = false;
            let eventDetail: CalendarDateSelectedEvent["detail"];

            calendar.addEventListener("date-selected", (event: Event) => {
                eventFired = true;
                eventDetail = (event as CalendarDateSelectedEvent).detail;
            });

            // Navigate to a specific month
            calendar.setYear("single", 2024);
            calendar.setMonth("single", 5); // June
            await CalendarTestUtils.waitForUpdate();

            // Select a date
            const targetDate = "2024-06-15";
            await CalendarTestUtils.selectDate(calendar, targetDate);

            // Verify selection
            expect(eventFired).to.be.true;
            expect(eventDetail!.dateString).to.equal(targetDate);
            expect(calendar.value).to.equal(targetDate);
            CalendarAssertions.assertDateSelected(calendar, targetDate);
        });

        test("should complete date range selection workflow", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({
                mode: "range",
                locale: "en",
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            let eventCount = 0;
            let lastEventDetail: CalendarRangeSelectedEvent["detail"];

            calendar.addEventListener("range-selected", (event: Event) => {
                eventCount++;
                lastEventDetail = (event as CalendarRangeSelectedEvent).detail;
            });

            // Navigate to a specific month
            calendar.setYear("single", 2024);
            calendar.setMonth("single", 5); // June
            await CalendarTestUtils.waitForUpdate();

            // Select date range
            const startDate = "2024-06-10";
            const endDate = "2024-06-20";

            await CalendarTestUtils.selectDate(calendar, startDate);
            await CalendarTestUtils.selectDate(calendar, endDate);

            // Verify range selection
            expect(eventCount).to.be.greaterThan(0);
            expect(lastEventDetail!.startDateString).to.equal(startDate);
            expect(lastEventDetail!.endDateString).to.equal(endDate);
            CalendarAssertions.assertRangeSelected(calendar, startDate, endDate);
        });

        test("should handle month navigation and date selection", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture()) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            const dm0 = calendar.getDisplayedMonths()[0];
            const initialMonth = dm0.month;
            const initialYear = dm0.year;

            // Navigate to next month
            await CalendarTestUtils.clickNextMonth(calendar);

            // Verify navigation
            let expectedMonth = initialMonth + 1;
            let expectedYear = initialYear;
            if (expectedMonth > 11) {
                expectedMonth = 0;
                expectedYear = initialYear + 1;
            }

            const after = calendar.getDisplayedMonths()[0];
            expect(after.month).to.equal(expectedMonth);
            expect(after.year).to.equal(expectedYear);

            // Select a date in the new month
            const targetDate = `${expectedYear}-${String(expectedMonth + 1).padStart(2, "0")}-15`;
            await CalendarTestUtils.selectDate(calendar, targetDate);

            CalendarAssertions.assertDateSelected(calendar, targetDate);
        });

        test("should use month picker to change month and select date", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture()) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            // Open month picker
            await CalendarTestUtils.clickMonthDisplay(calendar);
            await CalendarTestUtils.waitForUpdate();

            // Select July (month index 6)
            const targetMonth = 6;
            await CalendarTestUtils.selectMonthFromPicker(calendar, targetMonth);

            // Verify month changed
            expect(calendar.getDisplayedMonths()[0].month).to.equal(targetMonth);

            // Select a date in July
            const targetDate = `${calendar.getDisplayedMonths()[0].year}-07-15`;
            await CalendarTestUtils.selectDate(calendar, targetDate);

            CalendarAssertions.assertDateSelected(calendar, targetDate);
        });

        test("should use year picker to change year and select date", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture()) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            // Open year picker
            await CalendarTestUtils.clickYearDisplay(calendar);
            await CalendarTestUtils.waitForUpdate();

            // Select 2025
            const targetYear = 2025;
            await CalendarTestUtils.selectYearFromPicker(calendar, targetYear);

            // Verify year changed
            expect(calendar.getDisplayedMonths()[0].year).to.equal(targetYear);

            // Select a date in 2025
            const targetDate = `2025-${String(calendar.getDisplayedMonths()[0].month + 1).padStart(2, "0")}-15`;
            await CalendarTestUtils.selectDate(calendar, targetDate);

            CalendarAssertions.assertDateSelected(calendar, targetDate);
        });
    });

    suite("Localization Integration", () => {
        test("should work with Spanish locale", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({
                locale: "es",
                showToday: true,
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            // Calendar should render with Spanish locale
            expect(calendar.locale).to.equal("es");

            // Should be able to select dates
            const targetDate = "2024-06-15";
            await CalendarTestUtils.selectDate(calendar, targetDate);
            CalendarAssertions.assertDateSelected(calendar, targetDate);
        });

        test("should respect first day of week setting", async () => {
            // Test Sunday first
            calendar = (await CalendarTestUtils.createCalendarFixture({
                firstDayOfWeek: "sunday",
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            expect(calendar.firstDayOfWeek).to.equal("sunday");

            // Test Monday first
            calendar.remove();
            calendar = (await CalendarTestUtils.createCalendarFixture({
                firstDayOfWeek: "monday",
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            expect(calendar.firstDayOfWeek).to.equal("monday");
        });
    });

    suite("Constraint Handling", () => {
        test("should allow navigation outside min/max but restrict date selection", async () => {
            const minDate = "2024-06-01";
            const maxDate = "2024-08-31";

            calendar = (await CalendarTestUtils.createCalendarFixture({
                minDate,
                maxDate,
            })) as MjoCalendar;

            // Set to minimum month
            calendar.setYear("single", 2024);
            calendar.setMonth("single", 5); // June
            await CalendarTestUtils.waitForUpdate();

            // Should be able to navigate before min date
            await CalendarTestUtils.clickPreviousMonth(calendar);

            // Should have navigated to May (month 4)
            {
                const dm = calendar.getDisplayedMonths()[0];
                expect(dm.month).to.equal(4);
                expect(dm.year).to.equal(2024);
            }

            // Navigate to maximum month
            calendar.setMonth("single", 7); // August
            await CalendarTestUtils.waitForUpdate();

            // Should be able to navigate after max date
            await CalendarTestUtils.clickNextMonth(calendar);

            // Should have navigated to September (month 8)
            {
                const dm = calendar.getDisplayedMonths()[0];
                expect(dm.month).to.equal(8);
                expect(dm.year).to.equal(2024);
            }
        });

        test("should handle disabled dates in selection workflow", async () => {
            const disabledDates = ["2024-06-15", "2024-06-16", "2024-06-17"];

            calendar = (await CalendarTestUtils.createCalendarFixture({
                disabledDates,
            })) as MjoCalendar;

            calendar.setYear("single", 2024);
            calendar.setMonth("single", 5); // June
            await CalendarTestUtils.waitForUpdate();

            // Try to select disabled date
            await CalendarTestUtils.selectDate(calendar, "2024-06-15");

            // Should not be selected
            expect(calendar.value).to.not.equal("2024-06-15");

            // Select valid date
            await CalendarTestUtils.selectDate(calendar, "2024-06-10");
            CalendarAssertions.assertDateSelected(calendar, "2024-06-10");
        });

        test("should handle range selection with constraints", async () => {
            const minDate = "2024-06-05";
            const maxDate = "2024-06-25";
            const disabledDates = ["2024-06-15"];

            calendar = (await CalendarTestUtils.createCalendarFixture({
                mode: "range",
                minDate,
                maxDate,
                disabledDates,
            })) as MjoCalendar;
            // Position calendar at June 2024
            calendar.setYear("left", 2024);
            calendar.setMonth("left", 5);
            await CalendarTestUtils.waitForUpdate();

            // Select valid range avoiding constraints
            const startDate = "2024-06-10";
            const endDate = "2024-06-20";

            await CalendarTestUtils.selectDateRange(calendar, startDate, endDate);
            CalendarAssertions.assertRangeSelected(calendar, startDate, endDate);
        });
    });

    suite("Error Recovery", () => {
        test("should recover from invalid initial values", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({
                value: "invalid-date",
                minDate: "2024-01-01",
                maxDate: "2024-12-31",
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            // Should not crash and should allow valid selection
            const validDate = "2024-06-15";
            await CalendarTestUtils.selectDate(calendar, validDate);
            CalendarAssertions.assertDateSelected(calendar, validDate);
        });

        test("should handle edge cases in range mode", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({
                mode: "range",
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            // Select same date twice (should handle gracefully)
            const sameDate = "2024-06-15";
            await CalendarTestUtils.selectDate(calendar, sameDate);
            await CalendarTestUtils.selectDate(calendar, sameDate);

            // Should have a valid state
            expect(calendar.startDate).to.equal(sameDate);
        });
    });
});
