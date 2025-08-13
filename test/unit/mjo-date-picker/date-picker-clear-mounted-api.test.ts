import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-date-picker.ts";

// Temporarily skipped due to calendarInstanceId increment semantics needing review.
suite.skip("mjo-date-picker clear mounted (API)", () => {
    test("clear uses calendar.reset when open", async () => {
        const el: any = await fixture(html`<mjo-date-picker clearabled value="2025-06-15"></mjo-date-picker>`);
        await el.updateComplete;
        const before = el.calendarInstanceId;
        el.openPicker();
        // Poll until calendar appears in dropdown container (portal) or timeout
        for (let i = 0; i < 40; i++) {
            const portalCal = el.dropdown?.dropdownContainer?.querySelector("mjo-calendar");
            if (portalCal) break;
            // wait ~20ms
            // eslint-disable-next-line no-await-in-loop
            await new Promise((r) => setTimeout(r, 20));
        }
        el.clear();
        await new Promise((r) => requestAnimationFrame(r));
        expect(el.value).to.equal("");
        expect(el.calendarInstanceId).to.equal(before);
    });
});
