/* eslint-disable @typescript-eslint/no-explicit-any */

import { assert } from "@esm-bundle/chai";
import { fixture, nextFrame } from "@open-wc/testing";
import { html, TemplateResult } from "lit";

// Import real types from the source code
import type { MjoCalendar } from "../../src/mjo-calendar.js";
import type {
    CalendarDateClickEvent,
    CalendarDateHoverEvent,
    CalendarDateLeaveEvent,
    CalendarDateSelectedEvent,
    CalendarMonthPickerEvent,
    CalendarMonthSelectedEvent,
    CalendarNavigateEvent,
    CalendarRangeSelectedEvent,
    CalendarYearPickerEvent,
    CalendarYearSelectedEvent,
} from "../../src/types/mjo-calendar.js";

// Define types for change events
export interface CalendarEvent extends CustomEvent {
    detail: {
        value?: string;
        startDate?: string;
        endDate?: string;
    };
}

// Export the real types for use in tests
export type {
    CalendarDateClickEvent,
    CalendarDateHoverEvent,
    CalendarDateLeaveEvent,
    CalendarDateSelectedEvent,
    CalendarMonthPickerEvent,
    CalendarMonthSelectedEvent,
    CalendarNavigateEvent,
    CalendarRangeSelectedEvent,
    CalendarYearPickerEvent,
    CalendarYearSelectedEvent,
    MjoCalendar,
};

/**
 * Test utilities for mjo-litui components
 */
export class TestUtils {
    /**
     * Create a fixture for a component with proper typing
     */
    static async createFixture<T extends HTMLElement>(template: TemplateResult): Promise<T> {
        return await fixture<T>(template);
    }

    /**
     * Wait for the next frame and component updates
     */
    static async waitForUpdate(): Promise<void> {
        await nextFrame();
    }

    /**
     * Wait for multiple animation frames
     */
    static async waitForAnimationFrame(frames = 1): Promise<void> {
        for (let i = 0; i < frames; i++) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
        }
    }

    /**
     * Get today's date in YYYY-MM-DD format
     */
    static getTodayString(): string {
        return new Date().toISOString().split("T")[0];
    }

    /**
     * Create a date string in YYYY-MM-DD format
     */
    static getDateString(year: number, month: number, day: number): string {
        const date = new Date(year, month - 1, day); // month is 0-indexed
        return date.toISOString().split("T")[0];
    }

    /**
     * Create a date object from YYYY-MM-DD string
     */
    static parseDate(dateString: string): Date {
        return new Date(dateString);
    }

    /**
     * Get a date N days from today
     */
    static getRelativeDate(daysOffset: number): string {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().split("T")[0];
    }

    /**
     * Assert that an element exists in shadow DOM
     */
    static assertElementExists(shadowRoot: ShadowRoot | null, selector: string): HTMLElement {
        assert.isNotNull(shadowRoot, "Shadow root should exist");
        const element = shadowRoot!.querySelector(selector) as HTMLElement;
        assert.isNotNull(element, `Element with selector "${selector}" should exist`);
        return element;
    }

    /**
     * Assert that an element does not exist in shadow DOM
     */
    static assertElementNotExists(shadowRoot: ShadowRoot | null, selector: string): void {
        assert.isNotNull(shadowRoot, "Shadow root should exist");
        const element = shadowRoot!.querySelector(selector);
        assert.isNull(element, `Element with selector "${selector}" should not exist`);
    }

    /**
     * Wait for an event to be fired on an element
     */
    static waitForEvent<T = any>(element: EventTarget, eventName: string, timeout = 5000): Promise<CustomEvent<T>> {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                element.removeEventListener(eventName, handler);
                reject(new Error(`Event "${eventName}" was not fired within ${timeout}ms`));
            }, timeout);

            const handler = (event: Event) => {
                clearTimeout(timeoutId);
                element.removeEventListener(eventName, handler);
                resolve(event as CustomEvent<T>);
            };

            element.addEventListener(eventName, handler);
        });
    }

    /**
     * Simulate a click event on an element
     */
    static click(element: HTMLElement): void {
        element.click();
    }

    /**
     * Simulate a mouse hover event
     */
    static hover(element: HTMLElement): void {
        element.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    }

    /**
     * Simulate mouse leave event
     */
    static mouseLeave(element: HTMLElement): void {
        element.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    }

    /**
     * Get computed styles for an element
     */
    static getComputedStyle(element: HTMLElement): CSSStyleDeclaration {
        return window.getComputedStyle(element);
    }

    /**
     * Assert that an element has a specific CSS class
     */
    static assertHasClass(element: HTMLElement, className: string): void {
        assert.isTrue(element.classList.contains(className), `Element should have class "${className}"`);
    }

    /**
     * Assert that an element does not have a specific CSS class
     */
    static assertNotHasClass(element: HTMLElement, className: string): void {
        assert.isFalse(element.classList.contains(className), `Element should not have class "${className}"`);
    }

    /**
     * Assert that an element has a specific attribute
     */
    static assertHasAttribute(element: HTMLElement, attributeName: string, expectedValue?: string): void {
        assert.isTrue(element.hasAttribute(attributeName), `Element should have attribute "${attributeName}"`);
        if (expectedValue !== undefined) {
            assert.equal(element.getAttribute(attributeName), expectedValue, `Attribute "${attributeName}" should have value "${expectedValue}"`);
        }
    }

    /**
     * Assert that an element does not have a specific attribute
     */
    static assertNotHasAttribute(element: HTMLElement, attributeName: string): void {
        assert.isFalse(element.hasAttribute(attributeName), `Element should not have attribute "${attributeName}"`);
    }
}

/**
 * Calendar-specific test utilities
 */
export class CalendarTestUtils extends TestUtils {
    /**
     * Create a mjo-calendar fixture with common properties
     */
    static async createCalendarFixture(props: Record<string, any> = {}): Promise<MjoCalendar> {
        const template = html`<mjo-calendar
            .locale=${props.locale || "en"}
            .mode=${props.mode || "single"}
            .value=${props.value}
            .startDate=${props.startDate}
            .endDate=${props.endDate}
            .minDate=${props.minDate}
            .maxDate=${props.maxDate}
            .disabled=${props.disabled || false}
            .disabledDates=${props.disabledDates}
            .size=${props.size || "medium"}
            .color=${props.color || "primary"}
            .showToday=${props.showToday !== false}
            .firstDayOfWeek=${props.firstDayOfWeek || "monday"}
        ></mjo-calendar>`;

        return this.createFixture<MjoCalendar>(template);
    }

    /**
     * Get calendar grid element from calendar shadow DOM
     */
    static getCalendarGrid(calendar: MjoCalendar): HTMLElement {
        return this.assertElementExists(calendar.shadowRoot, "calendar-grid");
    }

    /**
     * Get calendar header element from calendar shadow DOM
     */
    static getCalendarHeader(calendar: MjoCalendar): HTMLElement {
        return this.assertElementExists(calendar.shadowRoot, "calendar-header");
    }

    /**
     * Get day elements from calendar grid
     */
    static getDayElements(calendar: MjoCalendar): NodeListOf<HTMLElement> {
        const grid = calendar.shadowRoot?.querySelector("calendar-grid");
        if (!grid) {
            assert.fail("Should have calendar-grid");
        }
        const dayElements = grid.shadowRoot?.querySelectorAll("calendar-day:not([isEmpty])");
        assert.isTrue(dayElements && dayElements.length > 0, "Should have day elements");
        return dayElements as NodeListOf<HTMLElement>;
    }

    /**
     * Find a specific day element by date
     */
    static findDayElement(calendar: MjoCalendar, date: string): HTMLElement | null {
        const targetDate = new Date(date);
        const targetDay = targetDate.getDate();

        const dayElements = this.getDayElements(calendar);
        for (const dayElement of dayElements) {
            // Buscar el día en la propiedad directamente
            const dayNumber = (dayElement as any).day;

            if (dayNumber === targetDay) {
                return dayElement;
            }
        }
        return null;
    }

    /**
     * Click on a specific day number in the current calendar month
     */
    static async clickDay(calendar: MjoCalendar, day: number): Promise<void> {
        const dayElements = this.getDayElements(calendar);

        for (const dayElement of dayElements) {
            // Buscar el día en la propiedad directamente
            const dayNumber = (dayElement as any).day;

            if (dayNumber === day) {
                // Necesitamos hacer click en el contenido interno del calendar-day
                const dayContent = dayElement.shadowRoot?.querySelector(".day") || dayElement.shadowRoot?.querySelector("div");
                if (dayContent) {
                    this.click(dayContent as HTMLElement);
                } else {
                    // Fallback: hacer click en el elemento directamente
                    this.click(dayElement);
                }
                await this.waitForUpdate();
                return;
            }
        }

        throw new Error(`Could not find day ${day} in current calendar month`);
    }

    /**
     * Click on a specific date in the calendar
     */
    static async clickDate(calendar: MjoCalendar, date: string): Promise<void> {
        const dayElement = this.findDayElement(calendar, date);
        assert.isNotNull(dayElement, `Day element for date ${date} should exist`);

        // Necesitamos hacer click en el contenido interno del calendar-day
        const dayContent = dayElement!.shadowRoot?.querySelector(".day") || dayElement!.shadowRoot?.querySelector("div");
        if (dayContent) {
            this.click(dayContent as HTMLElement);
        } else {
            // Fallback: hacer click en el elemento directamente
            this.click(dayElement!);
        }
        await this.waitForUpdate();
    }

    /**
     * Click navigation buttons
     */
    static async clickNextMonth(calendar: MjoCalendar): Promise<void> {
        const nextButton = this.getNextMonthButton(calendar);
        if (nextButton && !(nextButton as any).disabled) {
            this.click(nextButton);
            await this.waitForUpdate();
            await this.waitForUpdate(); // Extra wait for calendar update
        }
    }

    static async clickPreviousMonth(calendar: MjoCalendar): Promise<void> {
        const prevButton = this.getPreviousMonthButton(calendar);
        if (prevButton && !(prevButton as any).disabled) {
            this.click(prevButton);
            await this.waitForUpdate();
            await this.waitForUpdate(); // Extra wait for calendar update
        }
    }

    /**
     * Get navigation buttons
     */
    static getNextMonthButton(calendar: MjoCalendar): HTMLElement | null {
        const header = calendar.shadowRoot?.querySelector("calendar-header");
        if (!header) return null;
        const navigation = header.shadowRoot?.querySelector(".navigation");
        if (!navigation) return null;
        const buttons = navigation.querySelectorAll("mjo-button");
        if (!buttons || buttons.length === 0) return null;

        // En modo single, la estructura es: [Prev] [Month] [Year] [Next]
        // El botón Next es el último
        return buttons[buttons.length - 1] as HTMLElement | null;
    }

    static getPreviousMonthButton(calendar: MjoCalendar): HTMLElement | null {
        const header = calendar.shadowRoot?.querySelector("calendar-header");
        if (!header) return null;
        const navigation = header.shadowRoot?.querySelector(".navigation");
        if (!navigation) return null;
        const buttons = navigation.querySelectorAll("mjo-button");
        if (!buttons || buttons.length === 0) return null;

        // En modo single, la estructura es: [Prev] [Month] [Year] [Next]
        // El botón Prev es el primero
        return buttons[0] as HTMLElement | null;
    }

    /**
     * Month/Year display interaction
     */
    static async clickMonthDisplay(calendar: MjoCalendar): Promise<void> {
        const header = calendar.shadowRoot?.querySelector("calendar-header");
        if (!header) return;
        const monthYearSelectors = header.shadowRoot?.querySelector(".month-year-selectors");
        if (!monthYearSelectors) return;
        const buttons = monthYearSelectors.querySelectorAll("mjo-button");
        if (!buttons || buttons.length < 2) return;
        // El botón de mes es el primer botón en month-year-selectors
        const monthButton = buttons[0];
        if (monthButton) {
            this.click(monthButton as HTMLElement);
            await this.waitForUpdate();
        }
    }

    static async clickYearDisplay(calendar: MjoCalendar): Promise<void> {
        const header = calendar.shadowRoot?.querySelector("calendar-header");
        if (!header) return;
        const monthYearSelectors = header.shadowRoot?.querySelector(".month-year-selectors");
        if (!monthYearSelectors) return;
        const buttons = monthYearSelectors.querySelectorAll("mjo-button");
        if (!buttons || buttons.length < 2) return;
        // El botón de año es el segundo botón en month-year-selectors
        const yearButton = buttons[1];
        if (yearButton) {
            this.click(yearButton as HTMLElement);
            await this.waitForUpdate();
        }
    }

    /**
     * Month picker interactions
     */
    static async selectMonthFromPicker(calendar: MjoCalendar, monthIndex: number): Promise<void> {
        const monthPicker = this.getMonthPicker(calendar);
        if (monthPicker) {
            const monthElements = this.getMonthElements(monthPicker);
            if (monthElements[monthIndex]) {
                this.click(monthElements[monthIndex]);
                await this.waitForUpdate();
            }
        }
    }

    static getMonthElements(monthPicker: HTMLElement): HTMLElement[] {
        const elements = monthPicker.shadowRoot?.querySelectorAll(".month-button");
        return elements ? (Array.from(elements) as HTMLElement[]) : [];
    }

    /**
     * Year picker interactions
     */
    static async selectYearFromPicker(calendar: MjoCalendar, year: number): Promise<void> {
        const yearPicker = this.getYearPicker(calendar);
        if (yearPicker) {
            const yearElements = this.getYearElements(yearPicker);
            const targetElement = yearElements.find((el) => el.textContent?.trim() === year.toString());
            if (targetElement) {
                this.click(targetElement);
                await this.waitForUpdate();
            }
        }
    }

    static getYearElements(yearPicker: HTMLElement): HTMLElement[] {
        const elements = yearPicker.shadowRoot?.querySelectorAll(".year-button");
        return elements ? (Array.from(elements) as HTMLElement[]) : [];
    }

    static async clickNextYearRange(yearPicker: HTMLElement): Promise<void> {
        const nextButton = yearPicker.shadowRoot?.querySelector("[data-testid='next-years']") || yearPicker.shadowRoot?.querySelector(".next-years");
        if (nextButton) {
            this.click(nextButton as HTMLElement);
            await this.waitForUpdate();
        }
    }

    /**
     * Get today button
     */
    static getTodayButton(calendar: MjoCalendar): HTMLElement | null {
        return (calendar.shadowRoot?.querySelector("[data-testid='today-button']") ||
            calendar.shadowRoot?.querySelector(".today-button") ||
            calendar.shadowRoot?.querySelector("button[aria-label*='today']")) as HTMLElement | null;
    }

    /**
     * Select a date in the calendar (alias for clickDate but ensures we're in the right month)
     */
    static async selectDate(calendar: MjoCalendar, date: string): Promise<void> {
        const targetDate = new Date(date);
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();
        const targetDay = targetDate.getDate();

        // Force calendar to display the target month/year
        // We need to ensure both the main calendar and the grid components are updated
        (calendar as any).currentYear = targetYear;
        (calendar as any).currentMonth = targetMonth;

        // Force multiple update cycles to ensure all child components are updated
        calendar.requestUpdate();
        await this.waitForUpdate();
        calendar.requestUpdate();
        await this.waitForUpdate();

        // Get the calendar-grid element and force it to update as well
        const calendarGrid = calendar.shadowRoot?.querySelector("calendar-grid");
        if (calendarGrid) {
            (calendarGrid as any).year = targetYear;
            (calendarGrid as any).month = targetMonth;
            (calendarGrid as any).requestUpdate();
            await this.waitForUpdate();
        }

        // Get current state after setting

        // Click the day number in the current month
        await this.clickDay(calendar, targetDay);

        // Debug: Check what value the calendar has after clicking
    }

    /**
     * Navigate calendar to specific month/year
     */
    static async navigateToMonth(calendar: MjoCalendar, year: number, month: number): Promise<void> {
        const currentYear = (calendar as any).currentYear;

        // Navigate year first if needed
        let yearDiff = year - currentYear;

        while (yearDiff !== 0) {
            if (yearDiff > 0) {
                await this.clickNextMonth(calendar);
                yearDiff--;
            } else {
                await this.clickPreviousMonth(calendar);
                yearDiff++;
            }
            await this.waitForUpdate();
        }

        // Navigate month
        const currentMonth = (calendar as any).currentMonth;
        let monthDiff = month - currentMonth;

        while (monthDiff !== 0) {
            if (monthDiff > 0) {
                await this.clickNextMonth(calendar);
                monthDiff--;
            } else {
                await this.clickPreviousMonth(calendar);
                monthDiff++;
            }
            await this.waitForUpdate();
        }
    }

    /**
     * Select a date range by selecting start and end dates
     */
    static async selectDateRange(calendar: MjoCalendar, startDate: string, endDate: string): Promise<void> {
        await this.selectDate(calendar, startDate);
        await this.selectDate(calendar, endDate);
    }

    /**
     * Get month picker element if visible
     */
    static getMonthPicker(calendar: MjoCalendar): HTMLElement | null {
        return calendar.shadowRoot?.querySelector("calendar-month-picker") as HTMLElement | null;
    }

    /**
     * Get year picker element if visible
     */
    static getYearPicker(calendar: MjoCalendar): HTMLElement | null {
        return calendar.shadowRoot?.querySelector("calendar-year-picker") as HTMLElement | null;
    }

    /**
     * Get navigation button (prev/next)
     */
    static getNavigationButton(calendarHeader: HTMLElement, direction: "prev" | "next"): HTMLElement {
        const selector = direction === "prev" ? "[data-testid='prev-button']" : "[data-testid='next-button']";
        return this.assertElementExists(calendarHeader.shadowRoot, selector);
    }

    /**
     * Navigate calendar month
     */
    static async navigateMonth(calendar: MjoCalendar, direction: "prev" | "next"): Promise<void> {
        const header = this.getCalendarHeader(calendar);
        const button = this.getNavigationButton(header, direction);
        this.click(button);
        await this.waitForUpdate();
    }

    /**
     * Open month picker
     */
    static async openMonthPicker(calendar: MjoCalendar): Promise<void> {
        const header = this.getCalendarHeader(calendar);
        const monthButton = this.assertElementExists(header.shadowRoot, "[data-testid='month-button']");
        this.click(monthButton);
        await this.waitForUpdate();
    }

    /**
     * Open year picker
     */
    static async openYearPicker(calendar: MjoCalendar): Promise<void> {
        const header = this.getCalendarHeader(calendar);
        const yearButton = this.assertElementExists(header.shadowRoot, "[data-testid='year-button']");
        this.click(yearButton);
        await this.waitForUpdate();
    }

    /**
     * Select month in month picker
     */
    static async selectMonth(calendar: MjoCalendar, monthIndex: number): Promise<void> {
        await this.openMonthPicker(calendar);
        const monthPicker = this.getMonthPicker(calendar);
        assert.isNotNull(monthPicker, "Month picker should be visible");

        const monthButtons = monthPicker!.shadowRoot?.querySelectorAll("[data-testid='month-button']");
        assert.isTrue(monthButtons && monthButtons.length > monthIndex, `Month button ${monthIndex} should exist`);

        this.click(monthButtons![monthIndex] as HTMLElement);
        await this.waitForUpdate();
    }

    /**
     * Select year in year picker
     */
    static async selectYear(calendar: MjoCalendar, year: number): Promise<void> {
        await this.openYearPicker(calendar);
        const yearPicker = this.getYearPicker(calendar);
        assert.isNotNull(yearPicker, "Year picker should be visible");

        const yearButton = yearPicker!.shadowRoot?.querySelector(`[data-year="${year}"]`);
        assert.isNotNull(yearButton, `Year button for ${year} should exist`);

        this.click(yearButton as HTMLElement);
        await this.waitForUpdate();
    }
}

/**
 * Common assertions for calendar testing
 */
export class CalendarAssertions {
    /**
     * Assert that a date is selected in the calendar
     */
    static assertDateSelected(calendar: MjoCalendar, expectedDate: string): void {
        if (calendar.mode === "single") {
            assert.equal(calendar.value, expectedDate, `Selected date should be ${expectedDate}`);
        } else {
            // For range mode, check if it's start or end date
            assert.isTrue(calendar.startDate === expectedDate || calendar.endDate === expectedDate, `Date ${expectedDate} should be selected in range`);
        }
    }

    /**
     * Assert that a date range is selected
     */
    static assertRangeSelected(calendar: MjoCalendar, startDate: string, endDate: string): void {
        assert.equal(calendar.mode, "range", "Calendar should be in range mode");
        assert.equal(calendar.startDate, startDate, `Start date should be ${startDate}`);
        assert.equal(calendar.endDate, endDate, `End date should be ${endDate}`);
    }

    /**
     * Assert that calendar shows specific month/year
     */
    static assertCalendarMonth(calendar: MjoCalendar, month: number, year: number): void {
        if (calendar.mode === "single") {
            assert.equal((calendar as any).currentMonth, month, `Current month should be ${month}`);
            assert.equal((calendar as any).currentYear, year, `Current year should be ${year}`);
        } else {
            // For range mode, check left calendar
            assert.equal((calendar as any).leftCalendarMonth, month, `Left calendar month should be ${month}`);
            assert.equal((calendar as any).leftCalendarYear, year, `Left calendar year should be ${year}`);
        }
    }

    /**
     * Assert that month picker is visible
     */
    static assertMonthPickerVisible(calendar: MjoCalendar): void {
        assert.isTrue((calendar as any).showMonthPicker, "Month picker should be visible");
        const monthPicker = calendar.shadowRoot?.querySelector("calendar-month-picker");
        assert.isNotNull(monthPicker, "Month picker element should exist");
    }

    /**
     * Assert that year picker is visible
     */
    static assertYearPickerVisible(calendar: MjoCalendar): void {
        assert.isTrue((calendar as any).showYearPicker, "Year picker should be visible");
        const yearPicker = calendar.shadowRoot?.querySelector("calendar-year-picker");
        assert.isNotNull(yearPicker, "Year picker element should exist");
    }

    /**
     * Assert that an element is visible
     */
    static assertElementVisible(element: HTMLElement): void {
        assert.isNotNull(element, "Element should exist");
        const computedStyle = window.getComputedStyle(element);
        assert.notEqual(computedStyle.display, "none", "Element should not have display: none");
        assert.notEqual(computedStyle.visibility, "hidden", "Element should not have visibility: hidden");
    }

    /**
     * Assert that an element is disabled
     */
    static assertElementDisabled(element: HTMLElement | null): void {
        assert.isNotNull(element, "Element should exist");
        if (element) {
            const isDisabled = element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true" || (element as any).disabled === true;
            assert.isTrue(isDisabled, "Element should be disabled");
        }
    }

    /**
     * Assert that no picker is visible
     */
    static assertNoPickerVisible(calendar: MjoCalendar): void {
        assert.isFalse((calendar as any).showMonthPicker, "Month picker should not be visible");
        assert.isFalse((calendar as any).showYearPicker, "Year picker should not be visible");
    }

    /**
     * Assert that calendar is disabled
     */
    static assertCalendarDisabled(calendar: MjoCalendar): void {
        assert.isTrue(calendar.disabled, "Calendar should be disabled");
        assert.isTrue(calendar.hasAttribute("disabled"), "Calendar should have disabled attribute");
    }

    /**
     * Assert that calendar is enabled
     */
    static assertCalendarEnabled(calendar: MjoCalendar): void {
        assert.isFalse(calendar.disabled, "Calendar should be enabled");
        assert.isFalse(calendar.hasAttribute("disabled"), "Calendar should not have disabled attribute");
    }
}
