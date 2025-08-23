import { LitElement, PropertyValues, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { ModalController } from "./controllers/modal-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

@customElement("mjo-modal")
export class MjoModal extends ThemeMixin(LitElement) implements IThemeMixin {
    // Accessibility properties using native Lit ARIA support
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    // Additional accessibility configuration properties
    @property({ type: String }) label?: string; // Alternative label for modal content
    @property({ type: Boolean }) trapFocus = true; // Enable/disable focus trapping
    @property({ type: Boolean }) restoreFocus = true; // Enable/disable focus restoration
    @property({ type: Boolean }) closeOnEscape = true; // Enable/disable ESC key closing
    @property({ type: String }) initialFocus?: string; // CSS selector for initial focus element
    @property({ type: Boolean }) preventBodyScroll = true; // Prevent body scroll when open

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

    interface HTMLElementEventMap {
        // No custom events - the modal controller handles all interactions
    }
}
