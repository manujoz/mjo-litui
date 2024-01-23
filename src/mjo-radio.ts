import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef } from "lit/directives/ref.js";
import { FormMixin } from "./mixins/form-mixin.js";
import { InputErrorMixin } from "./mixins/input-error.js";

@customElement("mjo-radio")
export class MjoRadio extends InputErrorMixin(FormMixin(LitElement)) {
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";

    type = "radio";
    inputRef = createRef<HTMLInputElement>();

    render() {
        return html`<div>hola</div>`;
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
