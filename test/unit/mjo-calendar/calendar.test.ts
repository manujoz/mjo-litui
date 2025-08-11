import { expect } from "@esm-bundle/chai";
import type { MjoCalendar } from "../../../src/mjo-calendar";
import "../../../src/mjo-calendar.js";
import { CalendarAssertions, CalendarEvent, CalendarTestUtils } from "../../utils/calendar-test-utils.js";

suite("mjo-calendar - Basic Functionality", () => {
    let calendar: MjoCalendar;

    teardown(() => {
        calendar?.remove();
    });

    suite("Initialization", () => {
        test("should create calendar with default properties", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture()) as MjoCalendar;

            expect(calendar).to.exist;
            expect(calendar.tagName.toLowerCase()).to.equal("mjo-calendar");

            // Check default properties
            expect(calendar.mode).to.equal("single");
            expect(calendar.locale).to.equal("en");
            expect(calendar.size).to.equal("medium");
            expect(calendar.color).to.equal("primary");
            expect(calendar.disabled).to.be.false;
            expect(calendar.showToday).to.be.true;
            expect(calendar.firstDayOfWeek).to.equal("monday");
        });

        test("should initialize with custom properties", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({
                mode: "range",
                locale: "es",
                size: "large",
                color: "secondary",
                disabled: true,
                showToday: false,
                firstDayOfWeek: "sunday",
            })) as MjoCalendar;

            expect(calendar.mode).to.equal("range");
            expect(calendar.locale).to.equal("es");
            expect(calendar.size).to.equal("large");
            expect(calendar.color).to.equal("secondary");
            expect(calendar.disabled).to.be.true;
            expect(calendar.showToday).to.be.false;
            expect(calendar.firstDayOfWeek).to.equal("sunday");
        });

        test("should render calendar grid and header", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture()) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            const calendarGrid = CalendarTestUtils.getCalendarGrid(calendar);
            const calendarHeader = CalendarTestUtils.getCalendarHeader(calendar);

            expect(calendarGrid).to.exist;
            expect(calendarHeader).to.exist;
        });
    });

    suite("Date Selection - Single Mode", () => {
        setup(async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "single" })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();
        });

        test("should select a date in single mode", async () => {
            const targetDate = "2024-01-15";
            await CalendarTestUtils.selectDate(calendar, targetDate);

            CalendarAssertions.assertDateSelected(calendar, targetDate);
        });

        test("should fire change event when selecting a date", async () => {
            let eventFired = false;
            let eventDetail: CalendarEvent["detail"];

            calendar.addEventListener("change", (event: Event) => {
                eventFired = true;
                eventDetail = (event as CalendarEvent).detail;
            });

            const targetDate = "2024-01-15";
            await CalendarTestUtils.selectDate(calendar, targetDate);

            expect(eventFired).to.be.true;
            expect(eventDetail!.value).to.equal(targetDate);
        });

        test("should update value when selecting different dates", async () => {
            const firstDate = "2024-01-10";
            const secondDate = "2024-01-20";

            await CalendarTestUtils.selectDate(calendar, firstDate);
            CalendarAssertions.assertDateSelected(calendar, firstDate);

            await CalendarTestUtils.selectDate(calendar, secondDate);
            CalendarAssertions.assertDateSelected(calendar, secondDate);

            // Previous date should no longer be selected
            expect(calendar.value).to.equal(secondDate);
            expect(calendar.value).to.not.equal(firstDate);
        });
    });

    suite("Date Selection - Range Mode", () => {
        setup(async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({ mode: "range" })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();
        });

        test("should select start date in range mode", async () => {
            const startDate = "2024-01-10";
            await CalendarTestUtils.selectDate(calendar, startDate);

            expect(calendar.startDate).to.equal(startDate);
            expect(calendar.endDate).to.be.undefined;
        });

        test("should select date range", async () => {
            const startDate = "2024-01-10";
            const endDate = "2024-01-20";

            await CalendarTestUtils.selectDateRange(calendar, startDate, endDate);
            CalendarAssertions.assertRangeSelected(calendar, startDate, endDate);
        });

        test("should fire change event with range data", async () => {
            let eventFired = false;
            let eventDetail: CalendarEvent["detail"];

            calendar.addEventListener("change", (event: Event) => {
                eventFired = true;
                eventDetail = (event as CalendarEvent).detail;
            });

            const startDate = "2024-01-10";
            const endDate = "2024-01-20";
            await CalendarTestUtils.selectDateRange(calendar, startDate, endDate);

            expect(eventFired).to.be.true;
            expect(eventDetail!.startDate).to.equal(startDate);
            expect(eventDetail!.endDate).to.equal(endDate);
        });

        test("should handle reverse range selection", async () => {
            const laterDate = "2024-01-20";
            const earlierDate = "2024-01-10";

            // Select later date first, then earlier date
            await CalendarTestUtils.selectDate(calendar, laterDate);
            await CalendarTestUtils.selectDate(calendar, earlierDate);

            // Should automatically order the dates
            CalendarAssertions.assertRangeSelected(calendar, earlierDate, laterDate);
        });
    });

    suite("Disabled States", () => {
        test("should not allow selection when calendar is disabled", async () => {
            calendar = (await CalendarTestUtils.createCalendarFixture({ disabled: true })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            const targetDate = "2024-01-15";
            await CalendarTestUtils.selectDate(calendar, targetDate);

            // Date should not be selected
            expect(calendar.value).to.be.undefined;
        });

        test("should not allow selection of disabled dates", async () => {
            const disabledDate = "2024-01-15";
            calendar = (await CalendarTestUtils.createCalendarFixture({
                disabledDates: [disabledDate],
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            await CalendarTestUtils.selectDate(calendar, disabledDate);

            // Disabled date should not be selected
            expect(calendar.value).to.not.equal(disabledDate);
        });

        test("should respect min and max date constraints", async () => {
            const minDate = "2024-01-10";
            const maxDate = "2024-01-20";
            const beforeMinDate = "2024-01-05";
            const afterMaxDate = "2024-01-25";

            calendar = (await CalendarTestUtils.createCalendarFixture({
                minDate,
                maxDate,
            })) as MjoCalendar;
            await CalendarTestUtils.waitForUpdate();

            // Try to select date before minimum
            await CalendarTestUtils.selectDate(calendar, beforeMinDate);
            expect(calendar.value).to.not.equal(beforeMinDate);

            // Try to select date after maximum
            await CalendarTestUtils.selectDate(calendar, afterMaxDate);
            expect(calendar.value).to.not.equal(afterMaxDate);

            // Valid date should work
            const validDate = "2024-01-15";
            await CalendarTestUtils.selectDate(calendar, validDate);
            CalendarAssertions.assertDateSelected(calendar, validDate);
        });
    });
});
