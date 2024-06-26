import { LitElement } from "lit";
import { property } from "lit/decorators.js";

import { type MjoButton } from "../mjo-button";
import { type MjoForm } from "../mjo-form";
import { MjoFormElements } from "../types/litui";
import { MixinConstructor } from "../types/mixins";

import { searchClosestElement } from "../utils/shadow-dom.js";

export declare class IFormMixin {
    isemail?: boolean;
    isurl?: boolean;
    required?: boolean;
    nospaces?: boolean;
    rangelength?: number[];
    isnumber?: boolean;
    range?: number[];
    domains?: string[];
    isdate?: "aaaa-mm-dd" | "dd-mm-aaaa" | "mm-dd-aaaa";
    dateprevious?: boolean;
    minage?: number;
    maxage?: number;
    security?: "low" | "medium" | "high" | "very-high";
    equalto?: string;
    phonenumber?: boolean;
    phonecountry?: string[];
    pattern?: string;
    allowed?: string[];
    mincheck?: number;
    maxcheck?: number;

    min?: number;
    max?: number;
    maxlength?: number;
    minlength?: number;

    form: HTMLFormElement | null;

    submiForm(): void;
    updateFormData({ name, value }: { name: string; value: string }): void;
}

export const FormMixin = <T extends MixinConstructor<LitElement>>(superClass: T) => {
    class FormClass extends superClass {
        @property({ type: Boolean }) isemail?: boolean;
        @property({ type: Boolean }) isurl?: boolean;
        @property({ type: Boolean }) required?: boolean;
        @property({ type: Boolean }) nospaces?: boolean;
        @property({ type: Array }) rangelength?: number[];
        @property({ type: Boolean }) isnumber?: boolean;
        @property({ type: Array }) range?: number[];
        @property({ type: Array }) domains?: string[];
        @property({ type: String }) isdate?: "aaaa-mm-dd" | "dd-mm-aaaa" | "mm-dd-aaaa";
        @property({ type: Boolean }) dateprevious?: boolean;
        @property({ type: Number }) minage?: number;
        @property({ type: Number }) maxage?: number;
        @property({ type: String }) security?: "low" | "medium" | "high" | "very-high";
        @property({ type: String }) equalto?: string;
        @property({ type: Boolean }) phonenumber?: boolean;
        @property({ type: Array }) phonecountry?: string[];
        @property({ type: String }) pattern?: string;
        @property({ type: Array }) allowed?: string[];
        @property({ type: Number }) mincheck?: number;
        @property({ type: Number }) maxcheck?: number;

        @property({ type: Number }) max?: number;
        @property({ type: Number }) min?: number;
        @property({ type: Number }) maxlength?: number;
        @property({ type: Number }) minlength?: number;

        form: HTMLFormElement | null = null;

        private data?: { name: string; value: string };
        private listeners = {
            formData: (ev: FormDataEvent) => {
                this.#onFormdata(ev);
            },
        };

        protected firstUpdated() {
            this.#getForm();
        }

        disconnectedCallback() {
            super.disconnectedCallback();

            this.form?.removeEventListener("formdata", this.listeners.formData);
        }

        updateFormData({ name, value }: { name: string; value: string }) {
            if (!name) return;

            this.data = { name, value };
        }

        submiForm() {
            if (!this.form) return;

            new FormData(this.form);

            this.form.dispatchEvent(new SubmitEvent("submit", { cancelable: true, bubbles: true }));
        }

        #getForm() {
            this.form = searchClosestElement(this, "form") as HTMLFormElement | null;
            this.form?.addEventListener("formdata", this.listeners.formData);

            const mjoForm = (this.form?.parentNode as ShadowRoot)?.host as MjoForm | null;
            if (mjoForm?.tagName === "MJO-FORM") {
                if (this.tagName === "MJO-BUTTON" && (this as unknown as MjoButton).type === "submit") {
                    mjoForm.submitButton = this as unknown as MjoButton;
                } else {
                    mjoForm.elements.push(this as unknown as MjoFormElements);
                }
            }
        }

        #onFormdata(ev: FormDataEvent) {
            if (!this.data) return;

            ev.formData.set(this.data.name, this.data.value);
        }
    }

    return FormClass as unknown as MixinConstructor<IFormMixin> & T;
};
