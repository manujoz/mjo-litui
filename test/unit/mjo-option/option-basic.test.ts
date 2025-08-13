import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-option.ts";

suite("mjo-option basic", () => {
    test("click ejecuta handleClick asignado", async () => {
        const opt: any = await fixture(html`<mjo-option value="v" text="Texto"></mjo-option>`);
        await opt.updateComplete;
        let clicked = "";
        opt.handleClick = (val: string) => (clicked = val);
        opt.shadowRoot.querySelector(".container").click();
        expect(clicked).to.equal("v");
    });
});
