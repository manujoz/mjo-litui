import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-date-picker.ts";
import "../../../src/mjo-form.ts";

suite("mjo-date-picker form-ignore internal textfields", () => {
    test("internal textfields not registered in form elements", async () => {
        const wrapper = await fixture<any>(html`<mjo-form id="f"><mjo-date-picker name="period" range clearabled></mjo-date-picker></mjo-form>`);
        const formHost = wrapper as any; // mjo-form
        await new Promise((r) => setTimeout(r, 20)); // permitir firstUpdated de hijos
        const dp = formHost.querySelector("mjo-date-picker") as any;
        expect(dp).to.exist;
        // los elementos registrados deben contener solo el date-picker (no los mjo-textfield internos)
        expect(formHost.elements.filter((e: HTMLElement) => e.tagName === "MJO-TEXTFIELD").length).to.equal(0);
        expect(formHost.elements.some((e: any) => e === dp)).to.be.true;
    });
});
