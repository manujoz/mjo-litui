import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { DrawerController } from "./controllers/drawer-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/drawer/mjo-drawer-container.js";

/**
 * @summary Dynamic side panel component providing slide-out content areas with configurable positioning and comprehensive accessibility support.
 *
 * @description The mjo-drawer component creates slide-out panels that can appear from any side of the screen.
 * Unlike traditional modal components, mjo-drawer dynamically creates a container in the document body,
 * enabling proper overlay management and z-index control. The component provides extensive customization
 * options including positioning, dimensions, animations, modal behaviors, and full accessibility support
 * with ARIA patterns, focus management, and keyboard navigation.
 *
 * The drawer uses a controller-based API where the actual drawer instance is invisible and serves only
 * as a controller provider. All interactions are handled through the `controller` property which manages
 * the dynamically created drawer container.
 *
 * @slot - No slots available; content is provided through the controller's show() method
 * @csspart backdrop - The background overlay behind the drawer (applied to dynamically created container)
 * @csspart container - The main drawer container (applied to dynamically created container)
 * @csspart title - The title section of the drawer (applied to dynamically created container)
 * @csspart typography - The typography component within the title (applied to dynamically created container)
 * @csspart close-button - The close button in the title section (applied to dynamically created container)
 * @csspart content - The main content area of the drawer (applied to dynamically created container)
 */
@customElement("mjo-drawer")
export class MjoDrawer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) idDrawer?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) initialFocus?: string;
    @property({ type: Boolean }) disabledTrapFocus = false;
    @property({ type: Boolean }) disabledRestoreFocus = false;
    @property({ type: Boolean }) disabledCloseOnEscape = false;
    @property({ type: Boolean }) disableScrollLock = false;
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

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
