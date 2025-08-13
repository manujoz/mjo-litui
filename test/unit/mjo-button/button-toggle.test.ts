import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-button.ts";

suite("mjo-button toggle and submit branches", () => {
    test("toggleable button flips state", async () => {
        const btn: any = await fixture(html`<mjo-button toggleable>Txt</mjo-button>`);
        const internal = btn.shadowRoot.querySelector("button");
        internal.click();
        await btn.updateComplete;
        expect(internal.hasAttribute("data-toggle")).to.be.true;
        internal.click();
        await btn.updateComplete;
        expect(internal.hasAttribute("data-toggle")).to.be.false;
    });
});
