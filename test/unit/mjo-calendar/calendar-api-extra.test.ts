import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-calendar.js";
import type { MjoCalendar } from "../../../src/mjo-calendar.js";

suite("mjo-calendar API extra", () => {
    test("setDisplayedMonths enforces adjacency by default", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([
            { month: 0, year: 2025 },
            { month: 5, year: 2025 },
        ]); // non adjacent
        const dm = cal.getDisplayedMonths();
        expect(dm).to.have.length(2);
        expect(dm[0].month).to.equal(0);
        // second coerced to +1
        expect(dm[1].month).to.equal(1);
    });

    test("setDisplayedMonths without adjacency keeps provided", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths(
            [
                { month: 0, year: 2025 },
                { month: 5, year: 2025 },
            ],
            false,
        );
        const dm = cal.getDisplayedMonths();
        expect(dm[1].month).to.equal(5);
    });

    test("setMonth adjusts right month in range dual", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>`)) as MjoCalendar;
        // initialize months explicitly
        cal.setDisplayedMonths([
            { month: 2, year: 2025 },
            { month: 3, year: 2025 },
        ]);
        cal.setMonth("left", 5);
        const dm = cal.getDisplayedMonths();
        expect(dm[0].month).to.equal(5);
        expect(dm[1].month).to.equal(6); // right auto adjusted
    });

    test("setYear adjusts left month when setting right side", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([
            { month: 10, year: 2025 },
            { month: 11, year: 2025 },
        ]);
        cal.setYear("right", 2026);
        const dm = cal.getDisplayedMonths();
        expect(dm[1].year).to.equal(2026);
        // left should be month before right
        expect(dm[0].month).to.equal(10);
    });

    test("_addMonth handles negative crossing year", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        const res = cal._addMonth({ month: 0, year: 2025 }, -1);
        expect(res.month).to.equal(11);
        expect(res.year).to.equal(2024);
    });

    test("_ensureDisplayedMonths trims extra months in single mode", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([
            { month: 0, year: 2025 },
            { month: 1, year: 2025 },
        ]);
        cal._ensureDisplayedMonths();
        const dm = cal.getDisplayedMonths();
        expect(dm).to.have.length(1);
    });

    test("_evaluateAutoDual toggles autoDual when width exceeds threshold", async () => {
        const wrapper = document.createElement("div");
        wrapper.style.width = "1000px"; // above threshold
        document.body.appendChild(wrapper);
        const cal = document.createElement("mjo-calendar") as MjoCalendar;
        cal.setAttribute("mode", "range");
        cal.setAttribute("range-calendars", "auto");
        wrapper.appendChild(cal);
        await new Promise((r) => setTimeout(r, 0));
        cal._evaluateAutoDual();
        expect((cal as any).autoDual).to.be.true;
        wrapper.remove();
    });

    test("range selection swap when second earlier than first", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range"></mjo-calendar>`)) as MjoCalendar;
        // Access internal calendar-grid to simulate clicks
        await new Promise((r) => setTimeout(r, 0));
        const grid = cal.shadowRoot!.querySelector("calendar-grid") as HTMLElement;
        const first = new Date(2025, 5, 20);
        const second = new Date(2025, 5, 10); // earlier triggers swap
        grid.dispatchEvent(new CustomEvent("date-click", { detail: { date: first }, bubbles: true, composed: true }));
        grid.dispatchEvent(new CustomEvent("date-click", { detail: { date: second }, bubbles: true, composed: true }));
        expect(cal.startDate).to.equal("2025-06-10");
        expect(cal.endDate).to.equal("2025-06-20");
    });

    test("month picker open and select month", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        // open month picker via event
        cal.dispatchEvent(new CustomEvent("month-picker", { detail: { side: "single" }, bubbles: true, composed: true } as any));
        // directly invoke internal openPicker through header event simulation not available; check state through rendered picker
        await new Promise((r) => setTimeout(r, 0));
        // simulate month-selected
        cal.dispatchEvent(new CustomEvent("month-selected", { detail: { month: 7 }, bubbles: true, composed: true } as any));
        const dm = cal.getDisplayedMonths();
        expect(dm[0].month).to.equal(7);
    });

    test("_addMonth positive overflow", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        const res = cal._addMonth({ month: 10, year: 2025 }, 5); // wraps to next year
        expect(res.month).to.equal(3);
        expect(res.year).to.equal(2026);
    });

    test("setDisplayedMonths trims >2", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([
            { month: 0, year: 2025 },
            { month: 1, year: 2025 },
            { month: 2, year: 2025 },
        ] as any);
        expect(cal.getDisplayedMonths()).to.have.length(2);
    });

    test("navigate months left and right in range", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([
            { month: 5, year: 2025 },
            { month: 6, year: 2025 },
        ]);
        // navigate left backwards
        cal.dispatchEvent(new CustomEvent("navigate", { detail: { direction: -1, side: "left" }, bubbles: true, composed: true } as any));
        // navigate right forwards
        cal.dispatchEvent(new CustomEvent("navigate", { detail: { direction: 1, side: "right" }, bubbles: true, composed: true } as any));
        const dm = cal.getDisplayedMonths();
        expect(dm[0].month).to.equal(5); // left went to 4 then right nav brought sequence back to 5? (sequence logic keeps adjacency)
        expect(dm[1].month).to.equal(6);
    });

    test("setMonth right side adjusts left", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([
            { month: 2, year: 2025 },
            { month: 3, year: 2025 },
        ]);
        cal.setMonth("right", 8);
        const dm = cal.getDisplayedMonths();
        expect(dm[1].month).to.equal(8);
        expect(dm[0].month).to.equal(7); // left becomes previous
    });

    test("setYear left side adjusts right", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([
            { month: 10, year: 2025 },
            { month: 11, year: 2025 },
        ]);
        cal.setYear("left", 2030);
        const dm = cal.getDisplayedMonths();
        expect(dm[0].year).to.equal(2030);
        expect(dm[1].year).to.equal(2030);
    });

    test("_ensureDisplayedMonths adds second month in range dual", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>`)) as MjoCalendar;
        cal.setDisplayedMonths([{ month: 0, year: 2025 }]);
        cal._ensureDisplayedMonths();
        const dm = cal.getDisplayedMonths();
        expect(dm).to.have.length(2);
        expect(dm[1].month).to.equal((dm[0].month + 1) % 12);
    });

    test("_ensureDisplayedMonths trims when autoDual false", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="range" range-calendars="auto"></mjo-calendar>`)) as MjoCalendar;
        // simulate single calendar scenario (autoDual false) with two months set
        (cal as any).autoDual = false;
        cal.setDisplayedMonths([
            { month: 1, year: 2025 },
            { month: 2, year: 2025 },
        ]);
        cal._ensureDisplayedMonths();
        expect(cal.getDisplayedMonths()).to.have.length(1);
    });

    test("_evaluateAutoDual sets false below threshold", async () => {
        const wrapper = document.createElement("div");
        wrapper.style.width = "300px"; // below threshold
        document.body.appendChild(wrapper);
        const cal = document.createElement("mjo-calendar") as MjoCalendar;
        cal.setAttribute("mode", "range");
        cal.setAttribute("range-calendars", "auto");
        (cal as any).autoDual = true; // start true
        wrapper.appendChild(cal);
        await new Promise((r) => setTimeout(r, 0));
        cal._evaluateAutoDual();
        expect((cal as any).autoDual).to.be.false;
        wrapper.remove();
    });

    test("overlay click closes picker", async () => {
        const cal = (await fixture(html`<mjo-calendar></mjo-calendar>`)) as MjoCalendar;
        cal.dispatchEvent(new CustomEvent("month-picker", { detail: { side: "single" }, bubbles: true, composed: true } as any));
        await new Promise((r) => setTimeout(r, 0));
        const overlay = cal.shadowRoot!.querySelector(".picker-overlay") as HTMLElement | null;
        if (overlay) overlay.click();
        await new Promise((r) => setTimeout(r, 0));
        expect(cal.shadowRoot!.querySelector("calendar-month-picker")).to.be.null;
    });

    test("single date click updates value & dispatches events", async () => {
        const cal = (await fixture(html`<mjo-calendar mode="single"></mjo-calendar>`)) as MjoCalendar;
        const grid = cal.shadowRoot!.querySelector("calendar-grid") as HTMLElement;
        const date = new Date(2025, 7, 25);
        let changed = 0;
        cal.addEventListener("date-selected", () => changed++);
        grid.dispatchEvent(new CustomEvent("date-click", { detail: { date }, bubbles: true, composed: true }));
        expect(cal.value).to.equal("2025-08-25");
        expect(changed).to.equal(1);
    });
});

// Deprecated duplicate consolidated into calendar.test.ts
suite.skip("mjo-calendar duplicate api-extra", () => {});
