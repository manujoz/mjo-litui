import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-date-picker.ts";

suite("mjo-date-picker clear() sin calendario montado", () => {
    test("clear incrementa instancia cuando dropdown cerrado (sin calendario)", async () => {
        const el: any = await fixture(html`<mjo-date-picker clearabled value="2025-06-10"></mjo-date-picker>`);
        expect(el.shadowRoot.querySelector("mjo-calendar")).to.be.null;
        const prev = el.calendarInstanceId;
        el.clear();
        expect(el.value).to.equal("");
        expect(el.calendarInstanceId).to.be.greaterThan(prev);
    });
});
