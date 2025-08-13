import { expect } from "@esm-bundle/chai";
import { DrawerController } from "../../../src/controllers/drawer-controller";
import { MessageController } from "../../../src/controllers/message-controller";
import { ModalController } from "../../../src/controllers/modal-controller";
import { NotificationController } from "../../../src/controllers/notification-controller";

class PlainHost extends HTMLElement {
    theme?: Record<string, string>;
    addController() {}
    removeController() {}
    requestUpdate() {}
    updateComplete = Promise.resolve(true);
}

if (!customElements.get("plain-host")) customElements.define("plain-host", PlainHost);

suite("controllers branches", () => {
    test("modal width numeric vs string, closePosition out/in, blocked background click", async () => {
        const host = document.createElement("plain-host") as PlainHost;
        host.style.zIndex = "100";
        document.body.appendChild(host);
        const ctrl = new ModalController(host as any);
        ctrl.hostConnected();
        await customElements.whenDefined("modal-container");
        await (ctrl.modalContainer as any).updateComplete;
        // first show with numeric width and closePosition out
        ctrl.show({ content: "A", width: 300, closePosition: "out" } as any);
        const modalEl = ctrl.modalContainer;
        expect(modalEl.container.style.width).to.equal("300px");
        // close
        ctrl.close();
        await new Promise((r) => setTimeout(r, 50));
        // show again with string width, blocked, closePosition in
        ctrl.show({ content: "B", width: "50%", blocked: true, closePosition: "in" } as any);
        expect(modalEl.container.style.width).to.equal("50%");
        // attempt background click should not close due to blocked
        modalEl.background.click();
        expect(modalEl.isOpen).to.be.true;
        ctrl.close();
        ctrl.hostDisconnected();
        host.remove();
    });

    test("drawer positions left/right/top/bottom width/height numeric and blocked prevention", async () => {
        const host = document.createElement("plain-host") as PlainHost;
        host.style.zIndex = "101";
        document.body.appendChild(host);
        const ctrl = new DrawerController(host as any);
        ctrl.hostConnected();
        await customElements.whenDefined("drawer-container");
        await (ctrl.drawerContainer as any).updateComplete;
        const dc = ctrl.drawerContainer;
        // right (default) numeric width
        ctrl.show({ content: "X", width: 250 } as any);
        expect(dc.container.style.width).to.equal("250px");
        ctrl.close();
        await new Promise((r) => setTimeout(r, 20));
        // top with height
        ctrl.show({ content: "Y", position: "top", height: 180 } as any);
        await new Promise((r) => setTimeout(r, 220));
        expect(dc.container.getAttribute("data-position")).to.equal("top");
        expect(dc.container.style.height).to.equal("180px");
        ctrl.close();
        await new Promise((r) => setTimeout(r, 220));
        // left blocked
        ctrl.show({ content: "Z", position: "left", blocked: true } as any);
        await new Promise((r) => setTimeout(r, 220));
        expect(dc.container.getAttribute("data-position")).to.equal("left");
        // click background should not close
        dc.background.click();
        expect(dc.isOpen).to.be.true;
        ctrl.close();
        ctrl.hostDisconnected();
        host.remove();
    });

    test("notification bottom-left threshold removal and left transform path", async () => {
        const host = document.createElement("plain-host") as any;
        (host as any).threshold = 1; // custom property read by controller during creation
        host.style.zIndex = "102";
        document.body.appendChild(host);
        const ctrl = new NotificationController(host as any);
        ctrl.hostConnected();
        await customElements.whenDefined("notification-container");
        await (ctrl.notificationContainer as any).updateComplete;
        ctrl.setPosition("bottom-left" as any);
        // show two notifications -> second should trigger removal of first (threshold 1)
        await ctrl.show({ message: "n1", type: "info", time: 10 } as any);
        await ctrl.show({ message: "n2", type: "info", time: 10 } as any);
        await new Promise((r) => setTimeout(r, 900));
        const items = ctrl.notificationContainer.shadowRoot!.querySelectorAll("notification-item");
        expect(items.length).to.be.lessThan(3);
        ctrl.hostDisconnected();
        host.remove();
    });

    test("message onClose + time path", async () => {
        const host = document.createElement("plain-host") as PlainHost;
        host.style.zIndex = "103";
        document.body.appendChild(host);
        const ctrl = new MessageController(host as any);
        ctrl.hostConnected();
        await customElements.whenDefined("message-container");
        await (ctrl.messageContainer as any).updateComplete;
        let closed = 0;
        await ctrl.show({ message: "m1", time: 10, onClose: () => closed++ } as any);
        await new Promise((r) => setTimeout(r, 700));
        expect(closed).to.be.greaterThan(0);
        ctrl.hostDisconnected();
        host.remove();
    });
});
