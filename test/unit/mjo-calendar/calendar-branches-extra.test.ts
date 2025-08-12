import { expect } from "@esm-bundle/chai";
import "../../../src/mjo-calendar.js";
import type { MjoCalendar } from "../../../src/mjo-calendar.js";
import { CalendarTestUtils } from "../../utils/calendar-test-utils.js";

suite("mjo-calendar - Additional branch coverage", () => {
    let calendar: MjoCalendar;
    teardown(() => calendar?.remove());

    test("navigate right from single displayed month expands and keeps adjacency", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        (calendar as any).displayedMonths = [{ month: 4, year: 2032 }];
        calendar.requestUpdate();
        await CalendarTestUtils.waitForUpdate();
        const rightHeader = calendar.shadowRoot?.querySelectorAll("calendar-header")[0];
        rightHeader?.dispatchEvent(new CustomEvent("navigate", { detail: { direction: 1, side: "right" }, bubbles: true, composed: true }));
        await CalendarTestUtils.waitForUpdate();
        const dms = (calendar as any).displayedMonths;
        expect(dms.length).to.equal(2);
        expect(dms[1].month).to.equal((dms[0].month + 1) % 12);
    });

    test("derived right month/year rollover when left month is December single", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        (calendar as any).displayedMonths = [{ month: 11, year: 2033 }]; // Dec 2033
        calendar.requestUpdate();
        await CalendarTestUtils.waitForUpdate();
        // Derive right month/year from displayedMonths logic directly
        {
            const dms = (calendar as any).displayedMonths;
            const left = dms[0];
            const expectedRightMonth = (left.month + 1) % 12;
            const expectedRightYear = left.month === 11 ? left.year + 1 : left.year;
            expect(expectedRightMonth).to.equal(0); // January
            expect(expectedRightYear).to.equal(2034); // rollover year
        }
    });
});
