import type { PropertyValues } from "lit";
import { LitElement, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { ModalController } from "./controllers/modal-controller.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/modal/mjo-modal-container.js";

/**
 * A controller-based modal dialog component for displaying overlay content with comprehensive accessibility support.
 *
 * @summary Modal dialog component with programmatic control and accessibility features
 *
 * @cssprop --mjo-modal-background-color - Modal background color
 * @cssprop --mjo-modal-backdrop-background-color - Backdrop background color
 * @cssprop --mjo-modal-backdrop-filter - Backdrop filter effect
 * @cssprop --mjo-modal-box-shadow - Modal box shadow
 * @cssprop --mjo-modal-border-radius - Modal border radius
 * @cssprop --mjo-modal-width - Modal width
 * @cssprop --mjo-modal-icon-close-size - Close icon size
 * @cssprop --mjo-modal-icon-close-offset - Close icon position offset
 * @cssprop --mjo-modal-icon-close-background-color-hover - Close icon hover background
 * @cssprop --mjo-modal-title-border-color - Title border color
 *
 * @csspart backdrop - The modal backdrop/overlay
 * @csspart container - The main modal container
 * @csspart title - The modal title element
 * @csspart title-tag - The typography element used for the title
 * @csspart content - The modal content area
 * @csspart icon-close-container - Container for the internal close icon
 * @csspart icon-close-out - External close icon (positioned outside modal)
 * @csspart icon-close-in - Internal close icon (positioned inside modal)
 */
@customElement("mjo-modal")
export class MjoModal extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) idModal?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) initialFocus?: string;
    @property({ type: Boolean }) disabledTrapFocus = false;
    @property({ type: Boolean }) disabledRestoreFocus = false;
    @property({ type: Boolean }) disabledCloseOnEscape = false;
    @property({ type: Boolean }) disableScrollLock = false;
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    // Legacy property for backward compatibility
    @property({ type: Boolean }) open = false;

    controller = new ModalController(this);

    render() {
        return nothing;
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("open")) {
            if (this.open) {
                this.style.display = "block";
            } else {
                this.style.display = "none";
            }
        }
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
        "mjo-modal": MjoModal;
    }
}
