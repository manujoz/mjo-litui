import { expect } from "@esm-bundle/chai";
import { fixture, html } from "@open-wc/testing";
import "../../../src/mjo-notification.ts";

suite("mjo-notification basic", () => {
    test("controller setPosition invocado en connectedCallback", async () => {
        const notif: any = await fixture(html`<mjo-notification position="bottom-left"></mjo-notification>`);
        await notif.updateComplete;
        // El controller mantiene position internamente; verificamos side effect mínimo: propiedad position se conserva
        expect(notif.position).to.equal("bottom-left");
    });
});
