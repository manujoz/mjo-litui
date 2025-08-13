import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-date-picker.ts";

suite("mjo-date-picker localized display", () => {
    test("displayMode localized changes rendered text", async () => {
        const el: any = await fixture(html`<mjo-date-picker value="2025-06-15" displayMode="localized" locale="en"></mjo-date-picker>`);
        const tf = el.shadowRoot.querySelector("mjo-textfield") as any;
        expect(tf.value).to.not.equal("2025-06-15");
        expect(tf.value).to.not.include("-");
    });
});
