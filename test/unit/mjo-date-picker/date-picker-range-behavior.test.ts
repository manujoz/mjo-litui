import { expect } from "@esm-bundle/chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "../../../src/mjo-date-picker.js";
import type { MjoDatePicker } from "../../../src/mjo-date-picker.js";

suite("mjo-date-picker range behavior", () => {
    test("range first selection keeps dropdown open until end selected", async () => {
        const el = await fixture<MjoDatePicker>(html`<mjo-date-picker range></mjo-date-picker>`);
        const dd: any = el.shadowRoot!.querySelector("mjo-dropdown");
        el.openPicker();
        await new Promise((r) => setTimeout(r, 15));
        const calendar = dd.dropdownContainer?.shadowRoot?.querySelector("mjo-calendar") as HTMLElement;
        // Simulate first click starting range. Calendar does not emit range-selected until end, so date-picker must stay open.
        calendar.dispatchEvent(
            new CustomEvent("date-selected", {
                detail: { date: new Date(2025, 0, 10), dateString: "2025-01-10" },
                bubbles: true,
                composed: true,
            }),
        );
        await new Promise((r) => setTimeout(r, 0));
        expect(dd.isOpen).to.be.true;
        // Complete range
        const changePromise = oneEvent(el, "date-picker-change");
        calendar.dispatchEvent(
            new CustomEvent("range-selected", {
                detail: {
                    startDate: new Date(2025, 0, 10),
                    endDate: new Date(2025, 0, 15),
                    startDateString: "2025-01-10",
                    endDateString: "2025-01-15",
                },
                bubbles: true,
                composed: true,
            }),
        );
        await changePromise;
        expect(el.value).to.equal("2025-01-10/2025-01-15");
        expect(dd.isOpen).to.be.false; // closed after completion
    });

    test("Clear button does not close dropdown in range mode", async () => {
        const el = await fixture<MjoDatePicker>(html`<mjo-date-picker range clearabled value="2025-02-01/2025-02-10"></mjo-date-picker>`);
        const dd: any = el.shadowRoot!.querySelector("mjo-dropdown");
        el.openPicker();
        await new Promise((r) => setTimeout(r, 15));
        expect(dd.isOpen).to.be.true;
        const btn = dd.dropdownContainer?.shadowRoot?.querySelector("mjo-button") as HTMLElement;
        const changePromise = oneEvent(el, "date-picker-change");
        btn.click();
        await changePromise;
        expect(el.value).to.equal("");
        expect(dd.isOpen).to.be.true; // stays open to allow new selection
    });
});
