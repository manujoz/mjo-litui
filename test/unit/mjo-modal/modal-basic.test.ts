import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-modal.ts";

suite("mjo-modal basic", () => {
    test("toggle open actualiza display style", async () => {
        const modal: any = await fixture(html`<mjo-modal></mjo-modal>`);
        await modal.updateComplete;
        expect(getComputedStyle(modal).display).to.equal("none");
        modal.open = true;
        await modal.updateComplete;
        expect(modal.style.display).to.equal("block");
        modal.open = false;
        await modal.updateComplete;
        expect(modal.style.display).to.equal("none");
    });
});
