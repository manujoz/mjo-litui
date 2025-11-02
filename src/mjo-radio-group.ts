import type { MjoRadio } from "./mjo-radio";
import type { MjoRadioChangeEvent } from "./types/mjo-radio";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * @summary A container component that manages a collection of radio buttons, ensuring only one radio per group can be selected at a time.
 *
 * @slot (default) - Content area for mjo-radio elements
 */
@customElement("mjo-radio-group")
export class MjoRadioGroup extends LitElement {
    radios: Record<string, MjoRadio[]> = {};

    render() {
        return html` <slot></slot> `;
    }

    /**
     * Registers a radio button with the group and sets up change event handling
     */
    pushRadio(radio: MjoRadio) {
        if (radio.name) {
            this.radios[radio.name] = this.radios[radio.name] || [];
            this.radios[radio.name].push(radio);
            radio.addEventListener("mjo-radio:change", this.#handleChange);
        }
    }

    #handleChange = (ev: MjoRadioChangeEvent) => {
        const radio = ev.detail.element;
        const name = radio.name;

        if (!name || !radio.checked) return;

        this.radios[name]?.forEach((radio) => {
            if (radio !== ev.detail.element) {
                radio.checked = false;
            }
        });
    };
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-radio-group": MjoRadioGroup;
    }
}
