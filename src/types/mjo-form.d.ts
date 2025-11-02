import type { MjoButton } from "../mjo-button";
import type { MjoForm } from "../mjo-form";
import type { MjoFormElements } from "./litui";
import type { ValidatorRulesNames } from "./validator";

export interface MjoFormSubmitEvent extends CustomEvent {
    detail: {
        formData: FormData;
        event: SubmitEvent;
        response: MjoFormResponse;
    };
}

export interface MjoFormResponse {
    error: boolean;
    errmsg: string | null;
    errInput: MjoFormElements | null;
    errrule: ValidatorRulesNames | null;
    form: MjoForm;
    elements: MjoFormElements[];
    submitButton: MjoButton | null;
    data: {
        [key: string]: string | number | boolean | FileList | null;
    };
}
