import { expect } from "@esm-bundle/chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "../../../src/mjo-dropdown.js";

suite("mjo-dropdown basic", () => {
    test("open() sets isOpen and fires open event", async () => {
        const dd: any = await fixture(html`<mjo-dropdown behaviour="click" .html=${html`<div>content</div>` as any}></mjo-dropdown>`);
        const openEv = oneEvent(dd, "open");
        dd.open();
        await openEv;
        expect(dd.isOpen).to.be.true;
        expect(dd.dropdownContainer).to.exist;
    });

    test("close() closes after open", async () => {
        const dd: any = await fixture(html`<mjo-dropdown behaviour="click" .html=${html`<div>content</div>` as any}></mjo-dropdown>`);
        dd.open();
        await new Promise((r) => setTimeout(r, 5));
        dd.close();
        expect(dd.isOpen).to.be.false;
    });

    test("document click closes (behaviour=click)", async () => {
        const dd: any = await fixture(html`<mjo-dropdown behaviour="click" .html=${html`<div>content</div>` as any}></mjo-dropdown>`);
        dd.open();
        await new Promise((r) => setTimeout(r, 120));
        document.body.click();
        await new Promise((r) => setTimeout(r, 10));
        expect(dd.isOpen).to.be.false;
    });

    test("hover behaviour opens on mouseenter", async () => {
        const dd: any = await fixture(html`<mjo-dropdown behaviour="hover" .html=${html`<div>hover</div>` as any}></mjo-dropdown>`);
        dd.dispatchEvent(new Event("mouseenter", { bubbles: true }));
        await new Promise((r) => setTimeout(r, 20));
        expect(dd.isOpen).to.be.true;
    });

    test("updatePosition & getScroll & scrollToTop methods callable", async () => {
        const dd: any = await fixture(
            html`<mjo-dropdown behaviour="click" style="height:20px;display:block" .html=${html`<div style="height:200px">long</div>` as any}></mjo-dropdown>`,
        );
        dd.open();
        await new Promise((r) => setTimeout(r, 50));
        dd.updatePosition();
        const before = dd.getScroll();
        dd.scrollToTop(0);
        const after = dd.getScroll();
        expect(before.top).to.equal(after.top);
    });
});
