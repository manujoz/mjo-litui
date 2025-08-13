import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-dropdown.ts";

suite("mjo-dropdown coverage", () => {
    test("open/close via click behaviour y closeOnInnerClick=false mantiene abierto", async () => {
        const dd: any = await fixture(html`<mjo-dropdown behaviour="click" .html=${null} .closeOnInnerClick=${false}><button id="t">T</button></mjo-dropdown>`);
        await dd.updateComplete;
        // open
        dd.open();
        expect(dd.isOpen).to.be.true;
        // simulate inner click (should not close)
        dd.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
        await dd.updateComplete;
        expect(dd.isOpen).to.be.true;
        // force close from outside path: dispatch event on document
        document.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
        await dd.updateComplete;
        expect(dd.isOpen).to.be.false;
    });

    test("prevent open when disabled", async () => {
        const dd: any = await fixture(html`<mjo-dropdown disabled behaviour="click"></mjo-dropdown>`);
        dd.open();
        expect(dd.isOpen).to.be.false;
    });
});
