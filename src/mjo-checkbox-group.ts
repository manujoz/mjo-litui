import type { MjoCheckbox } from "./mjo-checkbox";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("mjo-checkbox-group")
export class MjoCheckboxGroup extends LitElement {
    checkboxs: MjoCheckbox[] = [];

    render() {
        return html`<slot></slot>`;
    }

    pushCheckbox(checkbox: MjoCheckbox) {
        if (this.checkboxs.indexOf(checkbox) === -1) {
            this.checkboxs.push(checkbox);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-checkbox-group": MjoCheckboxGroup;
    }
}
