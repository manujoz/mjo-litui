import { expect, fixture, html } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

async function make(range = false, width = 900) {
    const el = await fixture<HTMLDivElement>(html`
        <div style="width:${width}px;display:inline-block;">
            <mjo-calendar mode=${range ? "range" : "single"}></mjo-calendar>
        </div>
    `);
    const cal = el.querySelector("mjo-calendar")! as any;
    cal._ensureDisplayedMonths();
    await cal.updateComplete;
    return cal;
}

suite("mjo-calendar displayedMonths helper", () => {
    test("single initializes one displayed month", async () => {
        const cal = await make(false);
        expect(cal.displayedMonths).to.have.length(1);
    });
    test("range dual auto creates two months when wide", async () => {
        const cal = await make(true, 900);
        cal.autoDual = true; // force dual
        cal._ensureDisplayedMonths();
        expect(cal.displayedMonths).to.have.length(2);
        const [left, right] = cal.displayedMonths;
        const next = cal._addMonth(left, 1);
        expect(right.month).to.equal(next.month);
        expect(right.year).to.equal(next.year);
    });
    test("range collapses to single when not dual", async () => {
        const cal = await make(true, 400);
        cal.autoDual = false; // ensure single
        cal._ensureDisplayedMonths();
        expect(cal.displayedMonths).to.have.length(1);
    });

    test("setDisplayedMonths enforces adjacency by default", async () => {
        const cal = await make(true, 900);
        cal.autoDual = true;
        cal.setDisplayedMonths([
            { month: 2, year: 2031 },
            { month: 5, year: 2035 }, // non adjacent intentionally
        ]);
        const [left, right] = cal.displayedMonths;
        expect(left.month).to.equal(2);
        const expected = cal._addMonth(left, 1);
        expect(right.month).to.equal(expected.month);
        expect(right.year).to.equal(expected.year);
    });

    test("setDisplayedMonths can skip adjacency enforcement", async () => {
        const cal = await make(true, 900);
        cal.autoDual = true;
        cal.setDisplayedMonths(
            [
                { month: 2, year: 2031 },
                { month: 5, year: 2035 }, // non adjacent
            ],
            false,
        );
        const [left, right] = cal.displayedMonths;
        expect(left.month).to.equal(2);
        expect(right.month).to.equal(5);
        expect(right.year).to.equal(2035);
    });
});
