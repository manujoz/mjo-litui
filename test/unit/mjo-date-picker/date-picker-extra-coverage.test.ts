import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-date-picker.ts";

suite("mjo-date-picker extra coverage", () => {
    test.skip("closeOnSelect=false keeps dropdown open after selection (temporarily skipped)", async () => {
        const dp: any = await fixture(html`<mjo-date-picker value="2025-06-10" ?closeOnSelect="false"></mjo-date-picker>`);
        await dp.updateComplete;
        dp.openPicker();
        await new Promise((r) => requestAnimationFrame(r));
        let cal: any = dp.dropdown?.dropdownContainer?.querySelector("mjo-calendar");
        if (!cal) {
            cal = dp.renderRoot.querySelector("mjo-calendar");
        }
        if (cal?.selectDate) {
            cal.selectDate(new Date(2025, 5, 11));
        } else if (cal) {
            cal.dispatchEvent(new CustomEvent("date-selected", { detail: { dateString: "2025-06-11", date: new Date(2025, 5, 11) } }));
        }
        await dp.updateComplete;
        expect(dp.value).to.equal("2025-06-11");
        expect(dp.dropdown.isOpen).to.be.true;
    });

    test("clear does nothing if disabled", async () => {
        const dp: any = await fixture(html`<mjo-date-picker value="2025-06-12" disabled clearabled></mjo-date-picker>`);
        const before = dp.value;
        dp.clear();
        await dp.updateComplete;
        expect(dp.value).to.equal(before);
    });

    test("set value programmatically then clear (range=false)", async () => {
        const dp: any = await fixture(html`<mjo-date-picker clearabled></mjo-date-picker>`);
        dp.setValue("2025-06-13");
        await dp.updateComplete;
        expect(dp.value).to.equal("2025-06-13");
        dp.clear();
        await new Promise((r) => requestAnimationFrame(r));
        expect(dp.value).to.equal("");
    });
});
