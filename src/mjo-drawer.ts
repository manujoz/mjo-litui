import { LitElement, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";

import { DrawerController } from "./controllers/drawer-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/drawer/drawer-container.js";

@customElement("mjo-drawer")
export class MjoDrawer extends ThemeMixin(LitElement) implements IThemeMixin {
    controller = new DrawerController(this);

    render() {
        return html`${nothing}`;
    }

    static styles = [
        css`
            :host {
                display: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-drawer": MjoDrawer;
    }
}
