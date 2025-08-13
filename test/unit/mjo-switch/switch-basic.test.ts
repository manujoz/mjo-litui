import { expect } from "@esm-bundle/chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "../../../src/mjo-switch.ts";

suite("mjo-switch basic", () => {
    test("click toggle checked y change event", async () => {
        const sw: any = await fixture(html`<mjo-switch value="1"></mjo-switch>`);
        await sw.updateComplete;
        expect(sw.getValue()).to.equal("");
        const change = oneEvent(sw, "change");
        sw.shadowRoot.querySelector(".container").click();
        await change;
        expect(sw.getValue()).to.equal("1");
    });

    test("disabled no toggle", async () => {
        const sw: any = await fixture(html`<mjo-switch disabled value="1"></mjo-switch>`);
        await sw.updateComplete;
        sw.shadowRoot.querySelector(".container").click();
        expect(sw.getValue()).to.equal("");
    });
});
