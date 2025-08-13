import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

suite("mjo-calendar setMonth/setYear API", () => {
    test("single mode setMonth/setYear", async () => {
        const cal: any = await fixture(html`<mjo-calendar mode="single"></mjo-calendar>`);
        await cal.updateComplete;
        const initial = cal.getDisplayedMonths()[0];
        const targetMonth = (initial.month + 5) % 12;
        cal.setMonth("single", targetMonth);
        cal.setYear("single", initial.year + 1);
        const after = cal.getDisplayedMonths()[0];
        expect(after.month).to.equal(targetMonth);
        expect(after.year).to.equal(initial.year + 1);
    });

    test("range left/right month adjacency preserved", async () => {
        const cal: any = await fixture(html`<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>`);
        await cal.updateComplete;
        const [leftBefore] = cal.getDisplayedMonths();
        cal.setMonth("left", (leftBefore.month + 2) % 12);
        const [leftAfter, rightAfter] = cal.getDisplayedMonths();
        const expectedRight = new Date(leftAfter.year, leftAfter.month + 1, 1);
        expect(rightAfter.month).to.equal(expectedRight.getMonth());
        expect(rightAfter.year).to.equal(expectedRight.getFullYear());
    });
});
