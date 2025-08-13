import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-drawer.ts";

suite("mjo-drawer basic", () => {
    test("controller crea drawer-container y show/close togglean isOpen", async () => {
        const drawer: any = await fixture(html`<mjo-drawer></mjo-drawer>`);
        await drawer.updateComplete;
        // controller debe haber creado el elemento en body
        const container: any = document.querySelector("drawer-container");
        expect(container).to.exist;
        expect(container.isOpen).to.be.false;
        drawer.controller.show({ title: "T", content: "Contenido" });
        expect(container.isOpen).to.be.true;
        drawer.controller.close();
        // close animación async: simulamos onfinish inmediato
        container.style.display = "none";
        expect(container.isOpen).to.be.false;
    });
});
