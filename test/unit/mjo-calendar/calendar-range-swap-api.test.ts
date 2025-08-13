import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

suite("mjo-calendar range swap via API", () => {
    test("second earlier date swaps start/end", async () => {
        const cal: any = await fixture(html`<mjo-calendar mode="range"></mjo-calendar>`);
        await cal.updateComplete;
        const later = new Date(2025, 5, 20);
        const earlier = new Date(2025, 5, 10);
        cal.selectDate(later);
        cal.selectDate(earlier);
        expect(cal.startDate).to.equal("2025-06-10");
        expect(cal.endDate).to.equal("2025-06-20");
    });
});
