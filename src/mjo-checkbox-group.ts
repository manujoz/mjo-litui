import type { MjoCheckbox } from "./mjo-checkbox";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * @summary A container component that groups related mjo-checkbox elements for collective management.
 *
 * @slot - Contains one or more mjo-checkbox elements
 */
@customElement("mjo-checkbox-group")
export class MjoCheckboxGroup extends LitElement {
    checkboxs: MjoCheckbox[] = [];

    render() {
        return html`<slot></slot>`;
    }

    /**
     * Adds a checkbox to this group if it's not already present.
     * @param checkbox - The mjo-checkbox element to add to the group
     * @internal This method is called automatically by child checkboxes
     */
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
