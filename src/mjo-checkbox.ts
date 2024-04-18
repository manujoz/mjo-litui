import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef } from "lit/directives/ref.js";

import { FormMixin } from "./mixins/form-mixin.js";
import { InputErrorMixin } from "./mixins/input-error.js";

@customElement("mjo-checkbox")
export class MjoCheckbox extends InputErrorMixin(FormMixin(LitElement)) {
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";

    type = "checkbox";
    inputRef = createRef<HTMLInputElement>();

    render() {
        return html`Hola checkbox`;
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];
}
