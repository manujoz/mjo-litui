import type { MixinConstructor } from "../types/mixins";

import type { LitElement } from "lit";
import { property } from "lit/decorators.js";

export declare class IFormValidatorMixin {
    required: boolean;
}

export const FormValidatorMixin = <T extends MixinConstructor<LitElement>>(superClass: T) => {
    class FormValidator extends superClass {
        @property({ type: String }) required?: string;
    }

    return FormValidator as unknown as MixinConstructor<IFormValidatorMixin> & T;
};
