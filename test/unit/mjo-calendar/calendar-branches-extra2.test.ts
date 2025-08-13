import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-calendar.js";
import type { MjoCalendar } from "../../../src/mjo-calendar.js";

suite("mjo-calendar branches extra2", () => {
    test("_evaluateAutoDual early returns when not range mode", async () => {
        const cal = (await fixture(html`<mjo-calendar range-calendars="auto"></mjo-calendar>`)) as MjoCalendar; // mode=single
        (cal as any).autoDual = true;
        cal._evaluateAutoDual();
        expect((cal as any).autoDual).to.be.true; // unchanged
    });

    test("disabled date click ignored", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="single" .disabledDates=${["2025-06-15"]}></mjo-calendar>`)) as MjoCalendar;
        const grid = cal.shadowRoot!.querySelector("calendar-grid") as HTMLElement;
        grid.dispatchEvent(new CustomEvent("date-click", { detail: { date: new Date(2025, 5, 15) }, bubbles: true, composed: true }));
        expect(cal.value).to.be.undefined;
    });

    test("range forward selection (no swap)", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range"></mjo-calendar>`)) as MjoCalendar;
        const grid = cal.shadowRoot!.querySelector("calendar-grid") as HTMLElement;
        const start = new Date(2025, 5, 10);
        const end = new Date(2025, 5, 15);
        grid.dispatchEvent(new CustomEvent("date-click", { detail: { date: start }, bubbles: true, composed: true }));
        grid.dispatchEvent(new CustomEvent("date-click", { detail: { date: end }, bubbles: true, composed: true }));
        expect(cal.startDate).to.equal("2025-06-10");
        expect(cal.endDate).to.equal("2025-06-15");
    });

    test("hover date sets during range selection", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range"></mjo-calendar>`)) as MjoCalendar;
        const grid = cal.shadowRoot!.querySelector("calendar-grid") as HTMLElement;
        const start = new Date(2025, 5, 1);
        const hover = new Date(2025, 5, 5);
        grid.dispatchEvent(new CustomEvent("date-click", { detail: { date: start }, bubbles: true, composed: true }));
        grid.dispatchEvent(new CustomEvent("date-hover", { detail: { date: hover }, bubbles: true, composed: true }));
        expect((cal as any).hoverDate?.getDate()).to.equal(5);
        grid.dispatchEvent(new CustomEvent("date-leave", { bubbles: true, composed: true }));
        expect((cal as any).hoverDate).to.be.undefined;
    });

    test("setMonth single side path", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        cal.setMonth("single", 6);
        const dm = cal.getDisplayedMonths();
        expect(dm[0].month).to.equal(6);
    });

    test("setYear single side path", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        cal.setYear("single", 2030);
        const dm = cal.getDisplayedMonths();
        expect(dm[0].year).to.equal(2030);
    });
});
