import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";

import { type DropdowContainer } from "./mixins/dropdow-container";

@customElement("mjo-dropdow")
export class MjoDropdown extends LitElement {
    @property({ type: Boolean }) open = false;

    #container = createRef<HTMLDivElement>();
    dropdown?: DropdowContainer;

    render() {
        return html`<div ${ref(this.#container)}></div>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.#createDropdown();
    }

    #createDropdown() {
        this.dropdown = document.createElement("dropdow-container");
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
        "mjo-dropdown": MjoDropdown;
    }
}
