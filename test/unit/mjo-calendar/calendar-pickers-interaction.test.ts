import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

suite("mjo-calendar month/year picker interaction", () => {
    test("open month picker and select month", async () => {
        const cal: any = await fixture(html`<mjo-calendar mode="single"></mjo-calendar>`);
        await cal.updateComplete;
        const header: HTMLElement = cal.shadowRoot.querySelector("calendar-header");
        const initial = cal.getDisplayedMonths()[0];
        const targetMonth = (initial.month + 3) % 12;
        header.dispatchEvent(new CustomEvent("month-picker", { detail: { side: "single" }, bubbles: true, composed: true }));
        await cal.updateComplete;
        const monthPicker: HTMLElement = cal.shadowRoot.querySelector("calendar-month-picker");
        expect(monthPicker).to.exist;
        monthPicker.dispatchEvent(new CustomEvent("month-selected", { detail: { month: targetMonth }, bubbles: true, composed: true }));
        await cal.updateComplete;
        const after = cal.getDisplayedMonths()[0];
        expect(after.month).to.equal(targetMonth);
    });

    test("open year picker and select year", async () => {
        const cal: any = await fixture(html`<mjo-calendar mode="single"></mjo-calendar>`);
        await cal.updateComplete;
        const header: HTMLElement = cal.shadowRoot.querySelector("calendar-header");
        const initial = cal.getDisplayedMonths()[0];
        const targetYear = initial.year + 2;
        header.dispatchEvent(new CustomEvent("year-picker", { detail: { side: "single" }, bubbles: true, composed: true }));
        await cal.updateComplete;
        const yearPicker: HTMLElement = cal.shadowRoot.querySelector("calendar-year-picker");
        expect(yearPicker).to.exist;
        yearPicker.dispatchEvent(new CustomEvent("year-selected", { detail: { year: targetYear }, bubbles: true, composed: true }));
        await cal.updateComplete;
        const after = cal.getDisplayedMonths()[0];
        expect(after.year).to.equal(targetYear);
    });
});
