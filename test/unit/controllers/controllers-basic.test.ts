import { expect } from "@esm-bundle/chai";
import { DrawerController } from "../../../src/controllers/drawer-controller";
import { MessageController } from "../../../src/controllers/message-controller";
import { ModalController } from "../../../src/controllers/modal-controller";
import { NotificationController } from "../../../src/controllers/notification-controller";

class BaseHost extends HTMLElement {
    theme = { color: "red" } as Record<string, string>;
    addController(): void {
        /* no-op */
    }
    removeController(): void {
        /* no-op */
    }
    requestUpdate(): void {
        /* no-op */
    }
    updateComplete = Promise.resolve(true);
}
class ModalHost extends BaseHost {}
class DrawerHost extends BaseHost {}
class NotificationHost extends BaseHost {
    threshold = 3;
}
class MessageHost extends BaseHost {}

if (!customElements.get("test-modal-host")) customElements.define("test-modal-host", ModalHost);
if (!customElements.get("test-drawer-host")) customElements.define("test-drawer-host", DrawerHost);
if (!customElements.get("test-notification-host")) customElements.define("test-notification-host", NotificationHost);
if (!customElements.get("test-message-host")) customElements.define("test-message-host", MessageHost);

suite("controllers basic", () => {
    test("modal controller show/close cycle", async () => {
        const host = document.createElement("test-modal-host") as ModalHost;
        document.body.appendChild(host);
        const ctrl = new ModalController(host);
        ctrl.hostConnected();
        await customElements.whenDefined("modal-container");
        await (ctrl.modalContainer as any).updateComplete;
        ctrl.show({ content: "Hi", title: "Title" } as any);
        expect(document.querySelector("modal-container")).to.exist;
        ctrl.close();
        ctrl.hostDisconnected();
        host.remove();
    });

    test("drawer controller show/close cycle with callbacks", async () => {
        const host = document.createElement("test-drawer-host") as DrawerHost;
        document.body.appendChild(host);
        const ctrl = new DrawerController(host);
        ctrl.hostConnected();
        await customElements.whenDefined("drawer-container");
        await (ctrl.drawerContainer as any).updateComplete;
        let opened = false;
        let closed = false;
        ctrl.show({ content: "X", title: "Drawer", onOpen: () => (opened = true), onClose: () => (closed = true) } as any);
        expect(document.querySelector("drawer-container")).to.exist;
        // esperar hasta que flag opened se ponga o timeout
        for (let i = 0; i < 15 && !opened; i++) {
            await new Promise((r) => setTimeout(r, 40));
        }
        ctrl.close();
        for (let i = 0; i < 15 && !closed; i++) {
            await new Promise((r) => setTimeout(r, 40));
        }
        ctrl.hostDisconnected();
        host.remove();
        expect(opened).to.be.true;
        expect(closed).to.be.true;
    });

    test("notification controller show threshold + setPosition", async () => {
        const host = document.createElement("test-notification-host") as NotificationHost;
        document.body.appendChild(host);
        const ctrl = new NotificationController(host);
        ctrl.hostConnected();
        await customElements.whenDefined("notification-container");
        await (ctrl.notificationContainer as any).updateComplete;
        // push over threshold to exercise removal branch
        for (let i = 0; i < host.threshold + 1; i++) {
            await ctrl.show({ message: `Note${i}`, type: "info", time: 10 } as any);
        }
        ctrl.setPosition("top-right" as any);
        expect(document.querySelector("notification-container")!.getAttribute("threshold")).to.equal(host.threshold.toString());
        ctrl.hostDisconnected();
        host.remove();
    });

    test("message controller show limit", async () => {
        const host = document.createElement("test-message-host") as MessageHost;
        document.body.appendChild(host);
        const ctrl = new MessageController(host);
        ctrl.hostConnected();
        await customElements.whenDefined("message-container");
        await (ctrl.messageContainer as any).updateComplete;
        for (let i = 0; i < 5; i++) {
            await ctrl.show({ message: "Hola" } as any);
        }
        expect(document.querySelector("message-container")).to.exist;
        ctrl.hostDisconnected();
        host.remove();
    });
});
