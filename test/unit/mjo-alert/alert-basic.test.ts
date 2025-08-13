import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-alert.ts";

suite("mjo-alert basic", () => {
    test("icon cambia según type y close elimina elemento", async () => {
        const alert: any = await fixture(html`<mjo-alert type="success" message="Ok" closable></mjo-alert>`);
        await alert.updateComplete;
        const iconInitial = alert.icon;
        expect(iconInitial).to.not.equal("");
        alert.type = "error";
        await alert.updateComplete;
        expect(alert.icon).to.not.equal(iconInitial);
        alert.close();
        await new Promise((r) => setTimeout(r, 600));
        expect(alert.isConnected).to.be.false;
    });
});
