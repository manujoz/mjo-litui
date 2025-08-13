import { expect } from "@esm-bundle/chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "../../../src/mjo-date-picker.js";
import type { MjoDatePicker } from "../../../src/mjo-date-picker.js";

suite("mjo-date-picker extra", () => {
    test("keyboard Enter opens dropdown", async () => {
        const el = (await fixture(html`<mjo-date-picker></mjo-date-picker>`)) as MjoDatePicker;
        const tf = el.shadowRoot!.querySelector("mjo-textfield") as HTMLElement;
        tf.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        await new Promise((r) => setTimeout(r, 20));
        const dd = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        expect(dd.isOpen).to.be.true;
    });

    test("closeOnSelect=false keeps dropdown open after selection", async () => {
        const el = (await fixture(html`<mjo-date-picker .closeOnSelect=${false}></mjo-date-picker>`)) as MjoDatePicker;
        const dd = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        el.openPicker();
        await new Promise((r) => setTimeout(r, 10));
        const calendar = dd.dropdownContainer?.shadowRoot?.querySelector("mjo-calendar") as HTMLElement;
        const changePromise = oneEvent(el, "date-picker-change");
        calendar.dispatchEvent(new CustomEvent("date-selected", { detail: { date: new Date(2025, 0, 1), dateString: "2025-01-01" } }));
        await changePromise;
        expect(el.value).to.equal("2025-01-01");
        expect(dd.isOpen).to.be.true; // should remain open
    });

    test("range display uses separator", async () => {
        const el = (await fixture(html`<mjo-date-picker range value="2025-01-01/2025-01-10"></mjo-date-picker>`)) as MjoDatePicker;
        const tf = el.shadowRoot!.querySelector("mjo-textfield") as any;
        expect(tf.value).to.equal("2025-01-01 – 2025-01-10");
    });

    test("clear() emits change", async () => {
        const el = (await fixture(html`<mjo-date-picker clearabled value="2025-02-02"></mjo-date-picker>`)) as MjoDatePicker;
        const changePromise = oneEvent(el, "date-picker-change");
        el.clear();
        await changePromise;
        expect(el.value).to.equal("");
    });

    test("clear() does nothing when disabled", async () => {
        const el = (await fixture(html`<mjo-date-picker disabled clearabled value="2025-03-03"></mjo-date-picker>`)) as MjoDatePicker;
        el.clear();
        expect(el.value).to.equal("2025-03-03");
    });

    test("single mode ignores range-selected event", async () => {
        const el = (await fixture(html`<mjo-date-picker value="2025-04-04"></mjo-date-picker>`)) as MjoDatePicker;
        const dp = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        el.openPicker();
        await new Promise((r) => setTimeout(r, 10));
        const calendar = dp.dropdownContainer?.shadowRoot?.querySelector("mjo-calendar") as HTMLElement;
        calendar.dispatchEvent(new CustomEvent("range-selected", { detail: { startDateString: "2025-05-01", endDateString: "2025-05-02" } }));
        expect(el.value).to.equal("2025-04-04");
    });

    test("range mode ignores date-selected event", async () => {
        const el = (await fixture(html`<mjo-date-picker range value="2025-04-04/2025-04-10"></mjo-date-picker>`)) as MjoDatePicker;
        const dp = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        el.openPicker();
        await new Promise((r) => setTimeout(r, 10));
        const calendar = dp.dropdownContainer?.shadowRoot?.querySelector("mjo-calendar") as HTMLElement;
        calendar.dispatchEvent(new CustomEvent("date-selected", { detail: { dateString: "2025-06-06" } }));
        expect(el.value).to.equal("2025-04-04/2025-04-10");
    });

    test("openPicker() does nothing when disabled", async () => {
        const el = (await fixture(html`<mjo-date-picker disabled></mjo-date-picker>`)) as MjoDatePicker;
        el.openPicker();
        const dd = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        expect(dd.isOpen).to.be.false;
    });

    test("getValue/setValue roundtrip", async () => {
        const el = (await fixture(html`<mjo-date-picker></mjo-date-picker>`)) as MjoDatePicker;
        el.setValue("2025-07-07");
        expect(el.getValue()).to.equal("2025-07-07");
    });

    test("closePicker() closes after open", async () => {
        const el = (await fixture(html`<mjo-date-picker value="2025-08-08"></mjo-date-picker>`)) as MjoDatePicker;
        el.openPicker();
        await new Promise((r) => setTimeout(r, 10));
        el.closePicker();
        const dd = el.shadowRoot!.querySelector("mjo-dropdown") as any;
        expect(dd.isOpen).to.be.false;
    });
});
