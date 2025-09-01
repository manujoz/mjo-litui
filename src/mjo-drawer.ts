import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { DrawerController } from "./controllers/drawer-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/drawer/mjoint-drawer-container.js";

@customElement("mjo-drawer")
export class MjoDrawer extends ThemeMixin(LitElement) implements IThemeMixin {
    // Accessibility properties using native Lit ARIA support
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    // Additional accessibility configuration properties
    @property({ type: String }) label?: string; // Alternative label for drawer content
    @property({ type: Boolean }) trapFocus = true; // Enable/disable focus trapping
    @property({ type: Boolean }) restoreFocus = true; // Enable/disable focus restoration
    @property({ type: Boolean }) closeOnEscape = true; // Enable/disable ESC key closing
    @property({ type: String }) initialFocus?: string; // CSS selector for initial focus element

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
