import { expect } from "@esm-bundle/chai";
import "../../../src/mjo-calendar.js";
import type { MjoCalendar } from "../../../src/mjo-calendar.js";
import { CalendarTestUtils } from "../../utils/calendar-test-utils.js";

suite("mjo-calendar - Navigation Rollover Dual-Write", () => {
    let calendar: MjoCalendar;
    teardown(() => calendar?.remove());

    test("single mode next month December -> January updates displayedMonths", async () => {
        calendar = await CalendarTestUtils.createCalendarFixture({ mode: "single" });
        // Force December 2023 via new API
        calendar.setYear("single", 2023);
        calendar.setMonth("single", 11); // December
        await CalendarTestUtils.waitForUpdate();

        const nextBtn = CalendarTestUtils.getNextMonthButton(calendar)!;
        CalendarTestUtils.click(nextBtn);
        await CalendarTestUtils.waitForUpdate();

        {
            const dm = calendar.getDisplayedMonths()[0];
            expect(dm.year).to.equal(2024);
            expect(dm.month).to.equal(0);
        }
    });

    test("range mode previous month January -> December updates displayedMonths pair", async () => {
        calendar = await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" });
        await CalendarTestUtils.waitForUpdate();
        // Set left = January 2024
        calendar.setYear("left", 2024);
        calendar.setMonth("left", 0);
        await CalendarTestUtils.waitForUpdate();

        const prevBtn = CalendarTestUtils.getPreviousMonthButton(calendar)!;
        CalendarTestUtils.click(prevBtn);
        await CalendarTestUtils.waitForUpdate();

        // After moving left backwards: left = Dec 2023, right = Jan 2024
        {
            const dms = calendar.getDisplayedMonths();
            expect(dms[0].year).to.equal(2023);
            expect(dms[0].month).to.equal(11);
            expect(dms[1].year).to.equal(2024);
            expect(dms[1].month).to.equal(0);
        }
    });
});
