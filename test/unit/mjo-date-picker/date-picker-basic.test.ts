import { expect } from "@esm-bundle/chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "../../../src/mjo-date-picker.js";
import type { MjoDatePicker } from "../../../src/mjo-date-picker.js";

suite("mjo-date-picker basic", () => {
    test("renders and initializes empty", async () => {
        const el = (await fixture(html`<mjo-date-picker></mjo-date-picker>`)) as MjoDatePicker;
        expect(el.value).to.equal("");
    });

    test("select single date updates value and fires change", async () => {
        const el = (await fixture(html`<mjo-date-picker></mjo-date-picker>`)) as MjoDatePicker;
        const dp = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        const changePromise = oneEvent(el, "date-picker-change");
        el.openPicker();
        await new Promise((r) => setTimeout(r, 10));
        const calendar = dp.dropdownContainer?.shadowRoot?.querySelector("mjo-calendar") as HTMLElement;
        const detail = { date: new Date(2025, 5, 15), dateString: "2025-06-15" };
        calendar.dispatchEvent(new CustomEvent("date-selected", { detail }));
        await changePromise;
        expect(el.value).to.equal("2025-06-15");
    });

    test("range selection produces combined value", async () => {
        const el = (await fixture(html`<mjo-date-picker range></mjo-date-picker>`)) as MjoDatePicker;
        const dp = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        const changePromise = oneEvent(el, "date-picker-change");
        el.openPicker();
        await new Promise((r) => setTimeout(r, 10));
        const calendar = dp.dropdownContainer?.shadowRoot?.querySelector("mjo-calendar") as HTMLElement;
        const detailRange = { startDate: new Date(2025, 5, 10), endDate: new Date(2025, 5, 20), startDateString: "2025-06-10", endDateString: "2025-06-20" };
        calendar.dispatchEvent(new CustomEvent("range-selected", { detail: detailRange }));
        await changePromise;
        expect(el.value).to.equal("2025-06-10/2025-06-20");
    });

    test("clear button clears value", async () => {
        const el = (await fixture(html`<mjo-date-picker clearabled value="2025-06-01"></mjo-date-picker>`)) as MjoDatePicker;
        expect(el.value).to.equal("2025-06-01");
        el.clear();
        expect(el.value).to.equal("");
    });
});
