import { expect, fixture, html, nextFrame } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

// Helper to force element width via style wrapper
async function renderWithWidth(width: number, attrs: Record<string, string> = {}) {
    const el = await fixture<HTMLDivElement>(html`
        <div id="wrapper" style="width:${width}px;display:inline-block;">
            <mjo-calendar></mjo-calendar>
        </div>
    `);
    await nextFrame();
    const cal = el.querySelector("mjo-calendar")!;
    Object.entries(attrs).forEach(([k, v]) => cal.setAttribute(k, v));
    await (cal as any).updateComplete;
    return cal;
}

suite("mjo-calendar range auto adaptive", () => {
    test("falls back to single calendar when width below threshold (auto)", async () => {
        const cal = await renderWithWidth(500, { mode: "range", "range-calendars": "auto" });
        // Wait a frame for observer evaluation
        await nextFrame();
        const rangeContainer = cal.shadowRoot!.querySelector(".calendar-range-container");
        expect(rangeContainer).to.be.null;
        const single = cal.shadowRoot!.querySelector(".calendar-container");
        expect(single).to.exist;
    });

    test("renders dual calendars when width above threshold (auto)", async () => {
        const cal = await renderWithWidth(900, { mode: "range", "range-calendars": "auto" });
        await (cal as any).updateComplete;
        // Force re-evaluation just in case
        (cal as any)._evaluateAutoDual?.();
        await nextFrame();
        const rangeContainer = cal.shadowRoot!.querySelector(".calendar-range-container");
        expect(rangeContainer).to.exist;
        const sides = rangeContainer!.querySelectorAll(".calendar-side");
        expect(sides.length).to.equal(2);
    });

    test("forces dual calendars when range-calendars=2 even if narrow", async () => {
        const cal = await renderWithWidth(500, { mode: "range", "range-calendars": "2" });
        await (cal as any).updateComplete;
        await nextFrame();
        const rangeContainer = cal.shadowRoot!.querySelector(".calendar-range-container");
        expect(rangeContainer).to.exist;
        const sides = rangeContainer!.querySelectorAll(".calendar-side");
        expect(sides.length).to.equal(2);
    });

    test("forces single calendar when range-calendars=1 even if wide", async () => {
        const cal = await renderWithWidth(900, { mode: "range", "range-calendars": "1" });
        await (cal as any).updateComplete;
        await nextFrame();
        const rangeContainer = cal.shadowRoot!.querySelector(".calendar-range-container");
        expect(rangeContainer).to.be.null;
        const single = cal.shadowRoot!.querySelector(".calendar-container");
        expect(single).to.exist;
    });

    test("single mode ignores range-calendars=2", async () => {
        const cal = await renderWithWidth(900, { mode: "single", "range-calendars": "2" });
        await (cal as any).updateComplete;
        await nextFrame();
        const rangeContainer = cal.shadowRoot!.querySelector(".calendar-range-container");
        expect(rangeContainer).to.be.null;
        const single = cal.shadowRoot!.querySelector(".calendar-container");
        expect(single).to.exist;
    });
});

// Deprecated duplicate consolidated into calendar.test.ts
suite.skip("mjo-calendar duplicate auto-mode", () => {});
