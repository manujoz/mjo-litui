import { expect } from "@esm-bundle/chai";
import { CalendarUtils } from "../../../src/utils/calendar.js";

suite("CalendarUtils - Utility Functions", () => {
    suite("Date Formatting", () => {
        test("should format dates correctly", () => {
            // Use UTC dates to avoid timezone issues
            const date = new Date("2024-06-15T12:00:00.000Z");
            const formatted = CalendarUtils.formatDate(date);

            expect(formatted).to.equal("2024-06-15");
        });

        test("should handle different dates", () => {
            // Use UTC dates to avoid timezone issues
            const date1 = new Date("2024-01-01T12:00:00.000Z");
            const date2 = new Date("2024-12-31T12:00:00.000Z");

            expect(CalendarUtils.formatDate(date1)).to.equal("2024-01-01");
            expect(CalendarUtils.formatDate(date2)).to.equal("2024-12-31");
        });
    });

    suite("Date Comparison", () => {
        test("should compare same dates correctly", () => {
            const date1 = new Date(2024, 5, 15);
            const date2 = new Date(2024, 5, 15);

            expect(CalendarUtils.isSameDay(date1, date2)).to.be.true;
        });

        test("should compare different dates correctly", () => {
            const date1 = new Date(2024, 5, 15);
            const date2 = new Date(2024, 5, 16);
            const date3 = new Date(2024, 6, 15);
            const date4 = new Date(2025, 5, 15);

            expect(CalendarUtils.isSameDay(date1, date2)).to.be.false;
            expect(CalendarUtils.isSameDay(date1, date3)).to.be.false;
            expect(CalendarUtils.isSameDay(date1, date4)).to.be.false;
        });

        test("should handle edge cases", () => {
            const date1 = new Date(2024, 11, 31); // Dec 31, 2024
            const date2 = new Date(2025, 0, 1); // Jan 1, 2025

            expect(CalendarUtils.isSameDay(date1, date2)).to.be.false;
        });
    });

    suite("Locale Handling", () => {
        test("should return correct locale strings", () => {
            expect(CalendarUtils.getDateLocale("en")).to.equal("en-US");
            expect(CalendarUtils.getDateLocale("es")).to.equal("es-ES");
            expect(CalendarUtils.getDateLocale("fr")).to.equal("fr-FR");
            expect(CalendarUtils.getDateLocale("de")).to.equal("de-DE");
        });

        test("should fallback to en-US for unknown locales", () => {
            // Testing with a locale that's not in the map - casting to bypass TypeScript
            const result = CalendarUtils.getDateLocale("unknown" as "en");
            expect(result).to.equal("en-US");
        });
    });

    suite("Date Validation", () => {
        test("should return true when calendar is disabled", () => {
            const date = new Date(2024, 5, 15);
            const isDisabled = CalendarUtils.isDateDisabled(date, true);

            expect(isDisabled).to.be.true;
        });

        test("should respect min date constraints", () => {
            const testDate = new Date(2024, 5, 10); // June 10
            const minDate = "2024-06-15";

            const isDisabled = CalendarUtils.isDateDisabled(testDate, false, minDate);
            expect(isDisabled).to.be.true;
        });

        test("should respect max date constraints", () => {
            const testDate = new Date(2024, 5, 20); // June 20
            const maxDate = "2024-06-15";

            const isDisabled = CalendarUtils.isDateDisabled(testDate, false, undefined, maxDate);
            expect(isDisabled).to.be.true;
        });

        test("should check disabled dates array", () => {
            // Create a date that when formatted will match the disabled date
            const testDate = new Date("2024-06-15T12:00:00.000Z"); // Use UTC to ensure consistent formatting
            const disabledDates = ["2024-06-15", "2024-06-16"];

            const isDisabled = CalendarUtils.isDateDisabled(testDate, false, undefined, undefined, disabledDates);
            expect(isDisabled).to.be.true;
        });

        test("should allow valid dates", () => {
            const testDate = new Date("2024-06-15T12:00:00.000Z"); // Use UTC
            const minDate = "2024-06-10";
            const maxDate = "2024-06-20";
            const disabledDates = ["2024-06-16"];

            const isDisabled = CalendarUtils.isDateDisabled(testDate, false, minDate, maxDate, disabledDates);
            expect(isDisabled).to.be.false;
        });

        test("should handle no constraints", () => {
            const testDate = new Date(2024, 5, 15);

            const isDisabled = CalendarUtils.isDateDisabled(testDate, false);
            expect(isDisabled).to.be.false;
        });

        test("should handle undefined arrays", () => {
            const testDate = new Date(2024, 5, 15);

            const isDisabled = CalendarUtils.isDateDisabled(testDate, false, undefined, undefined, undefined);
            expect(isDisabled).to.be.false;
        });
    });
});
