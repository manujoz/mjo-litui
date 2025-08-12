import { expect } from "@esm-bundle/chai";
import "../../../src/mjo-calendar.js";
import type { MjoCalendar } from "../../../src/mjo-calendar.js";
import { CalendarTestUtils } from "../../utils/calendar-test-utils.js";

suite("mjo-calendar - displayedMonths initialization branches", () => {
    let calendar: MjoCalendar;
    teardown(() => calendar?.remove());

    test("range dual render expands single displayed month to two", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        (calendar as any).displayedMonths = [{ month: 2, year: 2031 }];
        calendar.requestUpdate();
        await CalendarTestUtils.waitForUpdate();
        // Force render range (already dual setting) and ensure expansion
        const container = calendar.shadowRoot?.querySelector(".calendar-range-container");
        expect(container).to.exist;
        const dms = (calendar as any).displayedMonths;
        expect(dms.length).to.equal(2);
        expect(dms[1].month).to.equal((dms[0].month + 1) % 12);
    });

    test("sync helper initializes when empty", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "single" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        (calendar as any).displayedMonths = [];
        (calendar as any)._ensureDisplayedMonths();
        await CalendarTestUtils.waitForUpdate();
        const dms = (calendar as any).displayedMonths;
        expect(dms.length).to.equal(1);
    });
});
