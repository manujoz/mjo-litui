import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { ModalController } from "./controllers/modal-controller.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

@customElement("mjo-modal")
export class MjoModal extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Boolean }) open = false;

    controller = new ModalController(this);

    render() {
        return html`<div class="container"><slot></slot></div>`;
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
