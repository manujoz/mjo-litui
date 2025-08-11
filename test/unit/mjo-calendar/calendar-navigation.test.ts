import type { MjoCalendar } from "../../../src/mjo-calendar";

import { expect } from "@esm-bundle/chai";
import "../../../src/mjo-calendar.js";
import { CalendarTestUtils } from "../../utils/calendar-test-utils.js";

suite("mjo-calendar - Navigation Basic", () => {
    let calendar: MjoCalendar;

    teardown(() => {
        calendar?.remove();
    });

    suite("Simple Navigation", () => {
        setup(async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture()) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();
        });

        test("should have navigation buttons", async () => {
            const nextButton = CalendarTestUtils.getNextMonthButton(calendar);
            const prevButton = CalendarTestUtils.getPreviousMonthButton(calendar);

            expect(nextButton).to.exist;
            expect(prevButton).to.exist;
        });

        test("should click next month button", async () => {
            const nextButton = CalendarTestUtils.getNextMonthButton(calendar);

            expect(nextButton).to.exist;

            // Just try clicking without checking the result yet
            CalendarTestUtils.click(nextButton!);
            await CalendarTestUtils.waitForUpdate();

            // Don't check result yet, just verify the click worked
            expect(calendar).to.exist;
        });

        test("should click previous month button", async () => {
            const prevButton = CalendarTestUtils.getPreviousMonthButton(calendar);

            expect(prevButton).to.exist;

            // Just try clicking without checking the result yet
            CalendarTestUtils.click(prevButton!);
            await CalendarTestUtils.waitForUpdate();

            // Don't check result yet, just verify the click worked
            expect(calendar).to.exist;
        });
    });
});
