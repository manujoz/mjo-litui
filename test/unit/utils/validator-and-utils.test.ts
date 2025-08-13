import { expect } from "@esm-bundle/chai";
import { pause } from "../../../src/utils/utils.js";
import { MjoValidator } from "../../../src/utils/validator.js";

// Minimal stub input element interface expected by validator
class FakeInput extends HTMLElement {
    name = "";
    label?: string;
    required?: boolean;
    type: string = "text";
    isemail?: boolean;
    isurl?: boolean;
    nospaces?: boolean;
    minlength?: number;
    maxlength?: number;
    rangelength?: [number, number];
    isnumber?: boolean;
    min?: number;
    max?: number;
    range?: [number, number];
    domains?: string[];
    isdate?: boolean;
    dateprevious?: boolean;
    minage?: number;
    maxage?: number;
    security?: boolean;
    equalto?: string;
    phonenumber?: boolean;
    phonecountry?: boolean;
    pattern?: string;
    allowed?: string[];
    mincheck?: number;
    maxcheck?: number;
    success?: boolean;
    error?: boolean;
    errormsg?: string;
    // custom flags
    value: any = "";
    checked: boolean = false;
    getValue() {
        return this.value;
    }
}
customElements.define("fake-input", FakeInput);

suite("utils - pause", () => {
    test("resolves after given ms", async () => {
        const start = performance.now();
        await pause(5);
        const elapsed = performance.now() - start;
        expect(elapsed).to.be.greaterThan(0);
    });
});

suite("MjoValidator targeted rules", () => {
    let form: HTMLFormElement;
    let validator: MjoValidator;
    setup(() => {
        form = document.createElement("form");
        document.body.appendChild(form);
        validator = new MjoValidator();
    });
    teardown(() => form.remove());

    test("pattern rule fails then passes (attribute based)", () => {
        const input = new FakeInput();
        input.name = "code";
        input.setAttribute("pattern", "^XYZ$");
        input.value = "ABC";
        form.appendChild(input);
        let res = validator.validateInput({ input: input as any, form, elements: [input as any] });
        expect(res.error).to.be.true; // fails pattern
        input.value = "XYZ";
        res = validator.validateInput({ input: input as any, form, elements: [input as any] });
        expect(res.error).to.be.false; // passes
    });

    test("mincheck & maxcheck rules using real checkbox inputs", () => {
        // controller element with attributes mincheck/maxcheck
        const controller = document.createElement("input");
        controller.type = "checkbox";
        controller.setAttribute("mincheck", "2");
        controller.setAttribute("maxcheck", "2");
        controller.setAttribute("checkgroup", "g1");
        form.appendChild(controller);

        const c1 = document.createElement("input");
        c1.type = "checkbox";
        c1.setAttribute("checkgroup", "g1");
        c1.setAttribute("checked", "");
        form.appendChild(c1);
        const c2 = document.createElement("input");
        c2.type = "checkbox";
        c2.setAttribute("checkgroup", "g1");
        form.appendChild(c2);
        const c3 = document.createElement("input");
        c3.type = "checkbox";
        c3.setAttribute("checkgroup", "g1");
        c3.setAttribute("checked", "");
        form.appendChild(c3);

        let res = validator.validateInput({ input: controller as any, form, elements: [controller as any] });
        expect(res.error).to.be.false; // exactly 2 checked passes

        c3.removeAttribute("checked"); // drops to 1 checked -> mincheck fail
        res = validator.validateInput({ input: controller as any, form, elements: [controller as any] });
        expect(res.error).to.be.true; // mincheck triggers
    });

    test("required + minlength + maxlength sequence", () => {
        const input = new FakeInput();
        input.name = "username";
        input.required = true;
        input.minlength = 3;
        input.maxlength = 5;
        input.value = ""; // required fail
        form.appendChild(input);
        let res = validator.validateInput({ input: input as any, form, elements: [input as any] });
        expect(res.error).to.be.true;
        input.value = "ab"; // minlength fail
        res = validator.validateInput({ input: input as any, form, elements: [input as any] });
        expect(res.error).to.be.true;
        input.value = "abcde"; // pass all
        res = validator.validateInput({ input: input as any, form, elements: [input as any] });
        expect(res.error).to.be.false;
    });
});
