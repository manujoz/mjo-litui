import { type MixinConstructor } from "../types/mixins";

import type { LitElement } from "lit";
import { property } from "lit/decorators.js";

export declare class IInputErrorMixin {
    error: boolean;
    errormsg: string;
    success: boolean;
    successmsg: string;
}

export const InputErrorMixin = <T extends MixinConstructor<LitElement>>(superClass: T) => {
    class InputError extends superClass {
        @property({ type: Boolean }) error = false;
        @property({ type: String }) errormsg?: string;
        @property({ type: Boolean }) success = false;
        @property({ type: String }) successmsg?: string;
    }

    return InputError as unknown as MixinConstructor<IInputErrorMixin> & T;
};
