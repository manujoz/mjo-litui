export type ValidatorRulesNames =
    | "isemail"
    | "isurl"
    | "required"
    | "nospaces"
    | "maxlength"
    | "minlength"
    | "rangelength"
    | "isnumber"
    | "min"
    | "max"
    | "range"
    | "domains"
    | "isdate"
    | "dateprevious"
    | "minage"
    | "maxage"
    | "security"
    | "equalto"
    | "phonenumber"
    | "phonecountry"
    | "pattern"
    | "allowed"
    | "mincheck"
    | "maxcheck";

export type ValidatorRules = {
    isemail?: boolean;
    isurl?: boolean;
    required?: boolean;
    nospaces?: boolean;
    maxlength?: number;
    minlength?: number;
    rangelength?: number[];
    isnumber?: boolean;
    min?: number;
    max?: number;
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
};

export interface ValidatorMessages {
    isemail: string;
    isurl: string;
    required: string;
    nospaces: string;
    maxlength: string;
    minlength: string;
    rangelength: string;
    isnumber: string;
    min: string;
    max: string;
    range: string;
    domains: string;
    isdate: string;
    dateprevious: string;
    minage: string;
    maxage: string;
    security: string;
    equalto: string;
    phonenumber: string;
    phonecountry: string;
    pattern: string;
    allowed: string;
    mincheck: string;
    maxcheck: string;
}

/** Error messages by languages. The object key es the lang. Ex.: en */
export interface ValidatorMessagesLanguages {
    [key: string]: ValidatorMessages;
}

/** Error message por especific inputs. The object key is the name of input */
export interface InputsValidatorMessages {
    [key: string]: Partial<ValidatorMessages>;
}
