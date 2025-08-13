import { expect } from "@esm-bundle/chai";
import { fixture, html, nextFrame } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

// Deprecated fragile test neutralized. See calendar-range-swap-api.test.ts for current coverage.
suite.skip("mjo-calendar range swap logic (deprecated)", () => {
    test("second earlier date swaps start/end", async () => {
        const cal: any = await fixture(html`<mjo-calendar mode="range" name="r"></mjo-calendar>`);
        await cal.updateComplete;
        await nextFrame();
        const later = new Date(2025, 5, 20);
        const earlier = new Date(2025, 5, 10);
        cal.dispatchEvent(new CustomEvent("date-click", { detail: { date: later }, bubbles: true, composed: true }));
        await nextFrame();
        cal.dispatchEvent(new CustomEvent("date-click", { detail: { date: earlier }, bubbles: true, composed: true }));
        await nextFrame();
        expect(cal.startDate).to.equal("2025-06-10");
        expect(cal.endDate).to.equal("2025-06-20");
    });
});
