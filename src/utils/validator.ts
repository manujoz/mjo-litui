import { MjoFormElements } from "../types/litui";
import { InputsValidatorMessages, ValidatorMessages, ValidatorRulesNames } from "../types/validator";

import { validatorMessages } from "../locales/messages.js";

export class MjoValidator {
    messages?: Partial<ValidatorMessages>;
    inputsMessages?: Partial<InputsValidatorMessages>;

    validateForm({ elements, form }: { elements: MjoFormElements[]; form: HTMLFormElement }): {
        error: boolean;
        errmsg: string;
        rule: ValidatorRulesNames | null;
        errInput: MjoFormElements | null;
    } {
        for (const input of elements) {
            const { errmsg, error, rule } = this.validateInput({ input, form, elements });
            if (error) {
                return {
                    error,
                    errmsg,
                    rule,
                    errInput: input,
                };
            }
        }

        return {
            error: false,
            errmsg: "",
            rule: null,
            errInput: null,
        };
    }

    validateInput({ input, form, elements }: { input: MjoFormElements; form: HTMLFormElement; elements: MjoFormElements[] }) {
        const response: {
            error: boolean;
            errmsg: string;
            rule: ValidatorRulesNames | null;
        } = {
            error: false,
            errmsg: "",
            rule: null,
        };

        if (input.required) {
            response.error = !this.#validateIsRequired(input, form);
            response.errmsg = response.error ? this.#getErrorMessage(input, "required") : "";
            response.rule = "required";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.type === "email" || input.isemail) {
            response.error = !this.#validateIsEmail(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "isemail") : "";
            response.rule = "isemail";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.type === "url" || input.isurl) {
            response.error = !this.#validateIsUrl(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "isurl") : "";
            response.rule = "isurl";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.nospaces) {
            response.error = !this.#validateNoSpaces(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "nospaces") : "";
            response.rule = "nospaces";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.minlength !== undefined) {
            response.error = !this.#validateIsMinLength(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "minlength") : "";
            response.rule = "minlength";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.maxlength !== undefined) {
            response.error = !this.#validateIsMaxLength(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "maxlength") : "";
            response.rule = "maxlength";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.rangelength) {
            response.error = !this.#validateIsRangeLength(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "rangelength") : "";
            response.rule = "rangelength";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.isnumber) {
            response.error = !this.#validateIsNumber(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "isnumber") : "";
            response.rule = "isnumber";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.min !== undefined) {
            response.error = !this.#validateIsMin(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "min") : "";
            response.rule = "min";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.max !== undefined) {
            response.error = !this.#validateIsMax(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "max") : "";
            response.rule = "max";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.range) {
            response.error = !this.#validateIsRange(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "range") : "";
            response.rule = "range";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.domains) {
            response.error = !this.#validateDomains(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "domains") : "";
            response.rule = "domains";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.isdate) {
            response.error = !this.#validateIsDate(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "isdate") : "";
            response.rule = "isdate";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.isdate && input.dateprevious) {
            response.error = !this.#validateIsDateprevius(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "dateprevious") : "";
            response.rule = "dateprevious";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.isdate && input.minage) {
            response.error = !this.#validateIsMinage(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "minage") : "";
            response.rule = "minage";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.isdate && input.maxage) {
            response.error = !this.#validateIsMaxage(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "maxage") : "";
            response.rule = "maxage";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.security) {
            response.error = !this.#validateSecurity(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "security") : "";
            response.rule = "security";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.equalto) {
            const equalToElement = elements.find((el) => el.name === input.equalto);
            const variable = equalToElement?.label ?? input.equalto;
            response.error = !this.#validateEqualTo(input, elements);
            response.errmsg = response.error ? this.#getErrorMessage(input, "equalto", [variable]) : "";
            response.rule = "equalto";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.phonenumber) {
            response.error = !this.#validatePhonenumber(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "phonenumber") : "";
            response.rule = "phonenumber";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.phonenumber && input.phonecountry) {
            response.error = !this.#validatePhonecountry(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "phonecountry") : "";
            response.rule = "phonecountry";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.pattern) {
            response.error = !this.#validatePattern(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "pattern") : "";
            response.rule = "pattern";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.allowed) {
            response.error = !this.#validateAllowed(input);
            response.errmsg = response.error ? this.#getErrorMessage(input, "allowed") : "";
            response.rule = "allowed";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.mincheck !== undefined) {
            response.error = !this.#validateMincheck(input, form);
            response.errmsg = response.error ? this.#getErrorMessage(input, "mincheck") : "";
            response.rule = "mincheck";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        if (input.maxcheck !== undefined) {
            response.error = !this.#validateMaxcheck(input, form);
            response.errmsg = response.error ? this.#getErrorMessage(input, "maxcheck") : "";
            response.rule = "maxcheck";

            this.#setInputError(input, response.errmsg);

            if (response.error) return response;
        }

        input.success = true;
        input.error = false;
        input.errormsg = "";

        return response;
    }

    #ageCalculator(date: string, format: "aaaa-mm-dd" | "dd-mm-aaaa" | "mm-dd-aaaa") {
        let year: number | null = null;
        let month: number | null = null;
        let day: number | null = null;

        date = date.toString();
        date = date.replace(new RegExp("/", "g"), "-");

        const arrDate = date.split("-");
        if (format === "aaaa-mm-dd") {
            year = parseInt(arrDate[0]);
            month = parseInt(arrDate[1]);
            day = parseInt(arrDate[2]);
        } else if (format === "dd-mm-aaaa") {
            year = parseInt(arrDate[2]);
            month = parseInt(arrDate[1]);
            day = parseInt(arrDate[0]);
        } else {
            year = parseInt(arrDate[2]);
            month = parseInt(arrDate[0]);
            day = parseInt(arrDate[1]);
        }

        const dateAct = new Date();
        const actualyear = dateAct.getFullYear();
        const actualMonth = dateAct.getMonth() + 1;
        const actualDay = dateAct.getDate();

        let age = actualyear + 1900 - year;

        if (actualMonth < month) age--;

        if (month === actualMonth && day > actualDay) age--;

        if (age > 1900) age -= 1900;

        return age;
    }

    #defaultMessages(lang: string = "en") {
        const messages = validatorMessages[lang] ?? validatorMessages["en"];

        return messages;
    }

    #getErrorMessage(input: MjoFormElements, rule: ValidatorRulesNames, data?: string[]): string {
        const name = input.name;

        if (name && this.inputsMessages && this.inputsMessages[name] && this.inputsMessages[name]?.[rule]) {
            let message = this.inputsMessages[name]?.[rule];

            if (Array.isArray(data) && message) {
                data.forEach((d, k) => {
                    message = message?.replace(`{data${k}}`, d);
                });
            }

            if (message) return message;
        }

        // Search in custom messages
        if (name && this.messages && this.messages[rule]) {
            let message = this.messages[rule];

            if (Array.isArray(data) && message) {
                data.forEach((d, k) => {
                    message = message?.replace(`{data${k}}`, d);
                });
            }

            if (message) return message;
        }

        // Return default message
        const lang = (typeof document !== "undefined" ? document.querySelector("html")?.getAttribute("lang")?.split("-")[0] : null) || "en";
        const defaultMessages = this.#defaultMessages(lang);
        let message = defaultMessages[rule];

        if (Array.isArray(data)) {
            data.forEach((d, k) => {
                message = message.replace(`{data${k}}`, d);
            });
        }

        return message;
    }

    #getInputValue(input: MjoFormElements) {
        return input.getValue();
    }

    #setInputError(input: MjoFormElements, errmsg: string) {
        input.error = true;
        input.errormsg = errmsg;
        input.focus();
    }

    #phoneNumberFormat(phone: string, country: string) {
        if (country === "es") {
            phone = phone.toString();
            phone = phone.replace(new RegExp(" ", "g"), "");

            if (phone.length === 13) {
                if (phone[4] === "9") {
                    phone = `${phone[0]}${phone[1]}${phone[2]}${phone[3]} ${phone[4]} ${phone[5]} `;
                    phone += `${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]} ${phone[11]}${phone[12]}`;
                } else {
                    phone = `${phone[0]}${phone[1]}${phone[2]}${phone[3]} ${phone[4]} ${phone[5]}${phone[6]} `;
                    phone += `${phone[7]}${phone[8]}${phone[9]} ${phone[10]}${phone[11]}${phone[12]}`;
                }
            } else if (phone.length === 12) {
                if (phone[3] === "9") {
                    phone = `${phone[0]}${phone[1]}${phone[2]} ${phone[3]}${phone[4]} ${phone[5]}${phone[6]}${phone[7]} `;
                    phone += `${phone[8]}${phone[9]} ${phone[10]}${phone[11]}`;
                } else {
                    phone = `${phone[0]}${phone[1]}${phone[2]} ${phone[3]}${phone[4]}${phone[5]} `;
                    phone += `${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]}${phone[11]}`;
                }
            } else if (phone[0] === "9") {
                phone = `${phone[0]}${phone[1]} ${phone[2]}${phone[3]}${phone[4]} ${phone[5]}${phone[6]} ${phone[7]}${phone[8]}`;
            } else {
                phone = `${phone[0]}${phone[1]}${phone[2]} ${phone[3]}${phone[4]}${phone[5]} ${phone[6]}${phone[7]}${phone[8]}`;
            }
        }

        return phone;
    }

    #setInputValue(input: MjoFormElements, value: string) {
        input.setValue(value);
    }

    #validateIsEmail(input: MjoFormElements) {
        const email = this.#getInputValue(input);

        const se = email.split("@");
        if (!se[1]) return false;

        if (email.indexOf("@", 0) === -1 || se[1].indexOf(".", 0) === -1) return false;

        return true;
    }

    #validateIsUrl(input: MjoFormElements) {
        let url = this.#getInputValue(input);
        if (!/^(http|https|ftp):\/\//.test(url) && url) url = "http://" + url;

        const regexp = /^(http|https|ftp):\/\/[a-z0-9.-]+\.[a-z]{2,4}/gi;

        if (!regexp.test(url) && url) return false;

        return true;
    }

    #validateIsRequired(input: MjoFormElements, form: HTMLFormElement) {
        if (!input.inputElement) return false;

        if (input.tagName !== "MJO-CHECKBOX" && input.tagName !== "MJO-RADIO") {
            const value = this.#getInputValue(input);
            if (!value) return false;
            return true;
        }

        const inputRef = input.inputElement as HTMLInputElement;

        let { checked } = inputRef;

        if (inputRef.type === "checkbox" || inputRef.type === "radio") {
            checked = false;

            if (inputRef.hasAttribute("checked")) checked = true;
        }

        if (inputRef.type === "radio") {
            let checkedRadio = false;
            for (let i = 0; i < form.elements.length; i++) {
                if ((form[i] as HTMLInputElement).checked) {
                    checkedRadio = true;
                    break;
                }
            }

            if (checkedRadio) checked = true;
        }

        return checked;
    }

    #validateNoSpaces(input: MjoFormElements) {
        const attr = input.getAttribute("nospaces");
        let value = this.#getInputValue(input);

        const regexp = /\s/;
        if (attr !== "autodel" && regexp.test(value)) return false;

        value = value.split(" ").join("");
        this.#setInputValue(input, value);
        return true;
    }

    #validateIsMinLength(input: MjoFormElements) {
        const minlength = parseInt(input.getAttribute("minlength") ?? "0");
        const value = this.#getInputValue(input);

        if (value.length < minlength) return false;

        return true;
    }

    #validateIsMaxLength(input: MjoFormElements) {
        const maxlength = parseInt(input.getAttribute("maxlength") ?? "0");
        const value = this.#getInputValue(input);

        if (value.length > maxlength) return false;

        return true;
    }

    #validateIsRangeLength(input: MjoFormElements) {
        const rangelength = input.getAttribute("rangelength");
        if (typeof rangelength !== "string") return false;

        const rls = rangelength.split("|");

        const value = this.#getInputValue(input);
        if (value.length < parseInt(rls[0]) || value.length > parseInt(rls[1])) return false;

        return true;
    }

    #validateIsNumber(input: MjoFormElements) {
        const value = this.#getInputValue(input);

        if (isNaN(Number(value))) return false;

        return true;
    }

    #validateIsMin(input: MjoFormElements) {
        const min = input.min as number;

        const valor = parseFloat(this.#getInputValue(input));

        if (isNaN(valor)) return false;

        if (valor < min) return false;

        return true;
    }

    #validateIsMax(input: MjoFormElements) {
        const max = input.max as number;
        const valor = parseFloat(this.#getInputValue(input));

        if (isNaN(valor)) return false;

        if (valor > max) return false;

        return true;
    }

    #validateIsRange(input: MjoFormElements) {
        if (!input.hasAttribute("range")) return true;

        const value = parseInt(this.#getInputValue(input));
        const range = input.getAttribute("range");
        if (typeof range !== "string") return false;

        const rgs = range.split("|");

        if (isNaN(value)) return false;
        else if (value < parseInt(rgs[0]) || value > parseInt(rgs[1])) return false;

        return true;
    }

    #validateDomains(input: MjoFormElements) {
        if (!input.hasAttribute("domains")) return true;

        const domains = input.getAttribute("domains");
        if (typeof domains !== "string") return false;

        const dms = domains.split("|");
        const value = this.#getInputValue(input);

        let find = false;
        for (let i = 0; i < dms.length; i++) {
            const regexp = new RegExp(dms[i], "g");

            if (regexp.test(value)) {
                find = true;
                break;
            }
        }

        if (!find) return false;

        return true;
    }

    #validateIsDate(input: MjoFormElements) {
        const value = this.#getInputValue(input);

        if (!value) return true;

        let date = value;
        date = date.toString();
        date = date.replace(new RegExp("/", "g"), "-");

        let format = "aaaa-mm-dd";
        if (input.hasAttribute("isdate")) format = input.getAttribute("isdate") ?? "aaaa-mm-dd";

        const splittedDate = date.split(" ");
        const arrDate = splittedDate[0].split("-");
        const arrHour = splittedDate[1] ? splittedDate[1].split(":") : null;

        let year: string | null = null;
        let month: string | null = null;
        let day: string | null = null;
        if (format === "aaaa-mm-dd") [year, month, day] = arrDate;
        else if (format === "dd-mm-aaaa") [day, month, year] = arrDate;
        else if (format === "mm-dd-aaaa") [month, day, year] = arrDate;

        // Comprobamos la fecha

        const template = new Date(Number(year), Number(month) - 1, Number(day)); // January start in = 0
        if (!template || (template.getFullYear() !== Number(year) && template.getMonth() !== Number(month) - 1 && template.getDate() !== Number(day))) {
            return false;
        }

        // Comprobamos la hora

        if (arrHour) {
            const hour = parseInt(arrHour[0]);
            const minute = parseInt(arrHour[1]);

            if (hour > 24 || minute > 60) return false;
        }

        return true;
    }

    #validateIsDateprevius(input: MjoFormElements) {
        let date = this.#getInputValue(input);
        date = date.toString();
        date = date.replace(new RegExp("/", "g"), "-");

        const format = input.getAttribute("isdate") ?? "aaaa-mm-dd";

        const dateSplitted = date.split(" ");
        const arrDate = dateSplitted[0].split("-");

        let year = null;
        let month = null;
        let day = null;
        if (format === "aaaa-mm-dd") [year, month, day] = arrDate;
        else if (format === "dd-mm-aaaa") [day, month, year] = arrDate;
        else if (format === "mm-dd-aaaa") [month, day, year] = arrDate;

        const x = new Date();
        x.setFullYear(Number(year), Number(month) - 1, Number(day));
        const today = new Date();

        if (x >= today) return false;

        return true;
    }

    #validateIsMinage(input: MjoFormElements) {
        const minage = parseInt(input.getAttribute("minage") ?? "0");
        const format = (input.getAttribute("isdate") as "aaaa-mm-dd" | "dd-mm-aaaa" | "mm-dd-aaaa") ?? "aaaa-mm-dd";

        let date = this.#getInputValue(input);
        date = date.toString();
        date = date.replace(new RegExp("/", "g"), "-");

        if (minage > this.#ageCalculator(date, format)) return false;

        return true;
    }

    #validateIsMaxage(input: MjoFormElements) {
        const maxage = parseInt(input.getAttribute("maxage") ?? "0");
        const format = (input.getAttribute("isdate") as "aaaa-mm-dd" | "dd-mm-aaaa" | "mm-dd-aaaa") ?? "aaaa-mm-dd";

        let date = this.#getInputValue(input);
        date = date.toString();
        date = date.replace(new RegExp("/", "g"), "-");

        if (maxage < this.#ageCalculator(date, format)) return false;

        return true;
    }

    #validateSecurity(input: MjoFormElements) {
        const pass = this.#getInputValue(input);
        let security = input.getAttribute("security");

        // Ponemos medium como valor por defecto

        if (security !== "low" && security !== "medium" && security !== "high" && security !== "very-high") security = "medium";

        let regexp: RegExp | null = null;

        if ((security === "very-high" || security === "high") && pass.length < 8) return false;
        else if (pass.length < 6) return false;

        if (security === "very-high") {
            regexp = /[@$*&#\-_+./;()[\]{}\\ºª%!¿?¡^~·¬]+/;

            if (!regexp.test(pass)) return false;
        }

        if (security === "very-high" || security === "high") {
            regexp = /[0-9]+/;

            if (!regexp.test(pass)) return false;
        }

        if (security === "very-high" || security === "high" || security === "medium") {
            regexp = /[a-z]+/;

            if (!regexp.test(pass)) return false;

            regexp = /[A-Z]+/;

            if (!regexp.test(pass)) return false;
        }

        return true;
    }

    #validateEqualTo(input: MjoFormElements, elements: MjoFormElements[]) {
        const equalto = input.getAttribute("equalto");
        const inputEq = elements.find((el) => el.name === equalto);
        const value = this.#getInputValue(input);

        if (!inputEq) return false;

        if (value !== this.#getInputValue(inputEq)) return false;

        return true;
    }

    #validatePhonenumber(input: MjoFormElements) {
        let phoneNumber = this.#getInputValue(input);

        phoneNumber = phoneNumber.toString();
        phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
        phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
        phoneNumber = phoneNumber.replace(new RegExp("\\.", "g"), "");
        phoneNumber = phoneNumber.replace(new RegExp("\\/", "g"), "");

        const regexp = /^((\+\d{1,3})|(00\d{1,3}))?(\(\d{1,3}\))?([\d]){7,11}$/;

        if (phoneNumber && (!regexp.test(phoneNumber) || phoneNumber.length < 8)) return false;

        return true;
    }

    #validatePhonecountry(input: MjoFormElements) {
        let phoneNumber = this.#getInputValue(input);
        let valid: string | boolean = false;

        if (!phoneNumber) return true;

        const countries = input.getAttribute("phonecountry");
        if (typeof countries !== "string") return false;

        const ctrs = countries.split("|");

        let regexp: RegExp | null = null;
        let regexp2: RegExp | null = null;
        let regexp3: RegExp | null = null;

        // Recorremos el array con los paises

        for (let i = 0; i < ctrs.length; i++) {
            const country = ctrs[i];

            if (country === "es") {
                phoneNumber = phoneNumber.toString();
                phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");

                regexp = /^((\+34)|(0034))?(6|7|8|9)(\d){8}$/;

                if (regexp.test(phoneNumber)) {
                    valid = country;
                    break;
                }
            }

            if (country === "uk") {
                phoneNumber = phoneNumber.toString();
                phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
                phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");

                regexp = /^((\+44(\(0\))?(1|2|3|7|8))|(0044(\(0\))?(1|2|7))|(0(1|2|7)))\d{9}$/;

                if (regexp.test(phoneNumber)) {
                    valid = country;
                    break;
                }
            }

            if (country === "it") {
                phoneNumber = phoneNumber.toString();
                phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
                phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");

                regexp = /^((\+39)|(0039))?(0)(\d){5,9}$/;
                regexp2 = /^((\+39)|(0039))?(3)(\d){9}$/;
                regexp3 = /^((\+39)|(0039))?(80)(\d){7}$/;

                if (regexp.test(phoneNumber) || regexp2.test(phoneNumber) || regexp3.test(phoneNumber)) {
                    valid = country;
                    break;
                }
            }

            if (country === "pt") {
                phoneNumber = phoneNumber.toString();
                phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
                phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");

                regexp = /^((\+351)|(00351))?(2|7|8|9)(\d){8}$/;

                if (regexp.test(phoneNumber)) {
                    valid = country;
                    break;
                }
            }

            if (country === "fr") {
                phoneNumber = phoneNumber.toString();
                phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
                phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");

                regexp = /^((\+33)|(0033))?(0)?(1|2|3|4|5|6|8)\d{8}$/;

                if (regexp.test(phoneNumber)) {
                    valid = country;
                    break;
                }
            }

            if (country === "us") {
                phoneNumber = phoneNumber.toString();
                phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
                phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
                phoneNumber = phoneNumber.replace(new RegExp("\\.", "g"), "");
                phoneNumber = phoneNumber.replace(new RegExp("\\/", "g"), "");

                regexp = /^((\+1)|(001))?(1?((\(\d{3}\))|(\d{3})))?\d{7}$/;

                if (regexp.test(phoneNumber)) {
                    valid = country;
                    break;
                }
            }
        }

        // Comprobamos si es válido

        if (!valid) return false;

        this.#setInputValue(input, this.#phoneNumberFormat(phoneNumber, valid));
        return true;
    }

    #validatePattern(input: MjoFormElements) {
        const pattern = input.getAttribute("pattern");

        if (!pattern) return false;

        const regExp = new RegExp(pattern);
        const value = this.#getInputValue(input);

        if (value && !regExp.test(value)) return false;

        return true;
    }

    #validateAllowed(input: MjoFormElements) {
        const allowed = input.getAttribute("allowed");
        if (!allowed) return false;

        const alls = allowed.split("|");
        const files: HTMLInputElement[] = [];
        // if (input.shadowRoot) {
        //     files = (input as unk).getFiles();
        // } else {
        //     // eslint-disable-next-line prefer-destructuring
        //     files = (input as any).files;
        // }

        let valid = true;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extspl = file.name.split(".");
            const ext = extspl[extspl.length - 1];

            let find = false;
            for (let o = 0; o < alls.length; o++) {
                if (alls[o] === ext) {
                    find = true;
                    break;
                }
            }

            if (!find) {
                valid = false;
                break;
            }
        }

        return valid;
    }

    #validateMincheck(input: MjoFormElements, form: HTMLFormElement) {
        if (typeof document === "undefined") return true;

        const mincheck = parseInt(input.getAttribute("mincheck") ?? "0");
        const checkgroup = input.getAttribute("checkgroup");
        const checkboxs = [...form.querySelectorAll("input[type=checkbox]"), ...form.querySelectorAll("mo-checkbox")];

        let checkeds = 0;
        for (let i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].getAttribute("checkgroup") === checkgroup && checkboxs[i].hasAttribute("checked")) checkeds++;
        }

        if (mincheck > checkeds) return false;

        return true;
    }

    #validateMaxcheck(input: MjoFormElements, form: HTMLFormElement) {
        if (typeof document === "undefined") return true;

        const maxcheck = parseInt(input.getAttribute("maxcheck") ?? "0");
        const checkgroup = input.getAttribute("checkgroup");
        const checkboxs = [...form.querySelectorAll("input[type=checkbox]"), ...form.querySelectorAll("mo-checkbox")];

        let checkeds = 0;
        for (let i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].getAttribute("checkgroup") === checkgroup && checkboxs[i].hasAttribute("checked")) checkeds++;
        }

        if (maxcheck < checkeds) return false;

        return true;
    }
}
