import { expect } from "@esm-bundle/chai";
import "../../../src/mjo-calendar.js";
import type { MjoCalendar } from "../../../src/mjo-calendar.js";
import { CalendarTestUtils } from "../../utils/calendar-test-utils.js";

suite("mjo-calendar - Early return + right year branch", () => {
    let calendar: MjoCalendar;
    teardown(() => calendar?.remove());

    test("_evaluateAutoDual early return when mode single", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "single" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        const before = (calendar as any).autoDual;
        (calendar as any)._evaluateAutoDual();
        const after = (calendar as any).autoDual;
        expect(after).to.equal(before);
    });

    test("_evaluateAutoDual early return when range-calendars=1", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "1" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        const before = (calendar as any).autoDual;
        (calendar as any)._evaluateAutoDual();
        const after = (calendar as any).autoDual;
        expect(after).to.equal(before);
    });

    test("right year setter maintains adjacency", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        // Force displayedMonths to Dec 2031 / Jan 2032
        (calendar as any).displayedMonths = [
            { month: 11, year: 2031 },
            { month: 0, year: 2032 },
        ];
        calendar.requestUpdate();
        await CalendarTestUtils.waitForUpdate();
        // Adjust right month/year via new API
        calendar.setYear("right", 2033);
        await CalendarTestUtils.waitForUpdate();
        const dms = (calendar as any).displayedMonths;
        expect(dms).to.deep.equal([
            { month: 11, year: 2032 },
            { month: 0, year: 2033 },
        ]);
    });

    test("navigate right with direction -1 keeps adjacency", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        // Start with dual months via new API
        calendar.setYear("left", 2035);
        calendar.setMonth("left", 0); // Jan 2035 / Feb 2035
        await CalendarTestUtils.waitForUpdate();
        const rightHeader = calendar.shadowRoot?.querySelectorAll("calendar-header")[1];
        rightHeader?.dispatchEvent(new CustomEvent("navigate", { detail: { direction: -1, side: "right" }, bubbles: true, composed: true }));
        await CalendarTestUtils.waitForUpdate();
        const dms = (calendar as any).displayedMonths;
        expect(dms.length).to.equal(2);
        expect(dms[1].month).to.equal((dms[0].month + 1) % 12);
    });

    test("setting right year when displayedMonths empty creates pair", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        (calendar as any).displayedMonths = [];
        calendar.setYear("right", 2040);
        await CalendarTestUtils.waitForUpdate();
        const dms = (calendar as any).displayedMonths;
        expect(dms.length).to.equal(2);
        expect(dms[1].year).to.equal(2040);
    });

    test("_ensureDisplayedMonths in range-calendars=1 currently expands to two months (behavior documented)", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "1" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        (calendar as any).displayedMonths = [{ month: 4, year: 2030 }];
        (calendar as any)._ensureDisplayedMonths();
        await CalendarTestUtils.waitForUpdate();
        const dms = (calendar as any).displayedMonths;
        expect(dms.length).to.equal(2);
    });

    test("setting right month when displayedMonths empty creates adjacent pair", async () => {
        calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range", "range-calendars": "2" })) as MjoCalendar;
        await CalendarTestUtils.waitForUpdate();
        (calendar as any).displayedMonths = [];
        calendar.setMonth("right", 7); // August
        await CalendarTestUtils.waitForUpdate();
        const dms = (calendar as any).displayedMonths;
        expect(dms.length).to.equal(2);
        expect(dms[1].month).to.equal(7);
        expect(dms[0].month).to.equal((7 + 11) % 12); // previous month
    });
});
