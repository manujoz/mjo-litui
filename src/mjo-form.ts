import { MjoFormElements } from "./types/litui";
import { MjoFormResponse } from "./types/mjo-form";
import { InputsValidatorMessages, ValidatorMessages } from "./types/validator";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";

import { MjoButton } from "./mjo-button.js";
import { MjoValidator } from "./utils/validator.js";

@customElement("mjo-form")
export class MjoForm extends LitElement {
    @property({ type: Boolean }) noValidate: boolean = false;
    @property({ type: Object }) errmessages: Partial<ValidatorMessages> = {};
    @property({ type: Object }) inputsErrmessages: InputsValidatorMessages = {};

    formRef = createRef<HTMLFormElement>();
    elements: MjoFormElements[] = [];
    submitButton: MjoButton | null = null;

    validator = new MjoValidator();

    render() {
        return html`<form ${ref(this.formRef)} enctype="multipart/form-data" @submit=${this.#handleSubmit}>
            <slot></slot>
        </form>`;
    }

    #handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        if (!this.formRef.value) return;

        this.validator.messages = this.errmessages;
        this.validator.inputsMessages = this.inputsErrmessages;

        const formData = new FormData(this.formRef.value);
        const validatorResponse = this.validator.validateForm({ elements: this.elements, form: this.formRef.value });

        const response: Partial<MjoFormResponse> = {
            elements: this.elements,
            data: this.#parseFormData(formData),
            form: this,
            submitButton: this.submitButton,
            ...validatorResponse,
        };

        if (!response.error && this.submitButton) {
            this.submitButton.loading = true;
        }

        this.dispatchEvent(new CustomEvent("submit", { detail: { formData, event, response: response }, bubbles: true, cancelable: true }));
    }

    #parseFormData(formData: FormData) {
        const data: { [key: string]: string } = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        return data;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-form": MjoForm;
    }
}
