import { expect } from "@esm-bundle/chai";
import { fixture, html, nextFrame } from "@open-wc/testing";
import "../../../src/mjo-calendar.ts";

suite("mjo-calendar auto dual mode", () => {
    test("auto switches to dual when width large", async () => {
        const wrapper: any = await fixture(html`<div style="width:1100px"><mjo-calendar id="c" mode="range" range-calendars="auto"></mjo-calendar></div>`);
        const calendar = wrapper.querySelector("#c");
        (calendar as any).getBoundingClientRect = () => ({
            width: 1100,
            height: 0,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON() {},
        });
        calendar._evaluateAutoDual();
        await nextFrame();
        const sides = calendar.shadowRoot.querySelectorAll(".calendar-range-container .calendar-side");
        expect(sides.length).to.equal(2);
    });
});

// Deprecated duplicate consolidated into calendar.test.ts
suite.skip("mjo-calendar duplicate auto-dual", () => {});
