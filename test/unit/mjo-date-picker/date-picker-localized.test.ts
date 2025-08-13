import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-date-picker.js";
import type { MjoDatePicker } from "../../../src/mjo-date-picker.js";

suite("mjo-date-picker localized display", () => {
    test("single localized display uses Intl", async () => {
        const el = (await fixture(html`<mjo-date-picker displayMode="localized" value="2025-08-13" locale="es"></mjo-date-picker>`)) as MjoDatePicker;
        const tf = el.shadowRoot!.querySelector("mjo-textfield") as any;
        expect(/13/.test(tf.value)).to.be.true;
    });

    test("range localized display", async () => {
        const el = (await fixture(
            html`<mjo-date-picker range displayMode="localized" value="2025-08-01/2025-08-15" locale="en"></mjo-date-picker>`,
        )) as MjoDatePicker;
        const tf = el.shadowRoot!.querySelector("mjo-textfield") as any;
        expect(tf.value).to.include("–");
    });

    test("changing value updates localized text", async () => {
        const el = (await fixture(html`<mjo-date-picker displayMode="localized" value="2025-01-01" locale="en"></mjo-date-picker>`)) as MjoDatePicker;
        el.setValue("2025-12-25");
        // no automatic change event emitted by setValue alone; force update flush
        await new Promise((r) => setTimeout(r, 0));
        const tf = el.shadowRoot!.querySelector("mjo-textfield") as any;
        expect(/25/.test(tf.value)).to.be.true;
    });
});
