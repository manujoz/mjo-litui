import { expect } from "@esm-bundle/chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "../../../src/mjo-option.ts";
import "../../../src/mjo-select.ts";

suite("mjo-select basic", () => {
    test("setValue selecciona opción y dispara change", async () => {
        const select: any = await fixture(
            html`<mjo-select name="s"><mjo-option value="a" text="A"></mjo-option><mjo-option value="b" text="B"></mjo-option></mjo-select>`,
        );
        await select.updateComplete;
        // por defecto selecciona primera opción
        expect(select.getValue()).to.equal("a");
        const changePromise = oneEvent(select, "change");
        select.setValue("b");
        await changePromise;
        expect(select.getValue()).to.equal("b");
        // visibleValue debe reflejar texto
        expect(select.shadowRoot.querySelector("#inputVisible").value).to.equal("B");
    });

    test("focus abre dropdown y blur cierra", async () => {
        const select: any = await fixture(html`<mjo-select><mjo-option value="x"></mjo-option></mjo-select>`);
        await select.updateComplete;
        select.focus();
        await select.updateComplete;
        expect(select.isOpen()).to.be.true;
        // simulate blur
        select.shadowRoot.querySelector("#inputVisible").dispatchEvent(new Event("blur"));
        await select.updateComplete;
        expect(select.isOpen()).to.be.false;
    });
});
