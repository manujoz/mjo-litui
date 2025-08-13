import { expect } from "@esm-bundle/chai";
import { fixture, html, oneEvent } from "@open-wc/testing";
import "../../../src/mjo-option.ts";
import "../../../src/mjo-select.ts";

suite("mjo-select coverage extra", () => {
    test("dispara handleClick, handleClearabled, handleOptionsBlur y handleOptionListFilter", async () => {
        const select: any = await fixture(
            html`<mjo-select clearabled searchable><mjo-option value="a" text="A"></mjo-option><mjo-option value="b" text="B"></mjo-option></mjo-select>`,
        );
        await select.updateComplete;
        // handleClick -> focus event
        const focusEvt = oneEvent(select, "focus");
        const dropdown: HTMLElement = select.shadowRoot.querySelector("mjo-dropdown");
        dropdown.click();
        await focusEvt;

        // abrir para que options-list esté en DOM actualizado
        select.focus();
        await select.updateComplete;

        // select value b para que clear sea visible
        select.setValue("b");
        await select.updateComplete;
        const clearBtn: HTMLElement | null = select.shadowRoot.querySelector(".clearabled");
        if (clearBtn) clearBtn.click(); // handleClearabled (vacío) ejecutado

        // obtener options-list
        const opts: HTMLElement | null = select.shadowRoot.querySelector("options-list");
        // dispatch filter event
        opts?.dispatchEvent(new CustomEvent("options-list.filter", { bubbles: true }));
        // dispatch blur event
        opts?.dispatchEvent(new CustomEvent("options-list.blur", { bubbles: true }));

        // assert sigue consistente (no rompe valor)
        expect(select.getValue()).to.equal("b");
    });
});
