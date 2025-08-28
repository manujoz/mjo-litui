import { MjoListboxItems } from "../../src/types/mjo-listbox";

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "../../src/mjo-listbox.js";

import { AiFillAccountBook, AiFillAlert, AiFillAlipayCircle, AiFillApple, AiFillBehanceSquare } from "mjo-icons/ai";

const ListboxItems: MjoListboxItems = [
    { section: "Actions" },
    { label: "No color", startIcon: AiFillAccountBook, endIcon: AiFillAccountBook },
    { label: "Edit", description: "This is description", startIcon: AiFillAccountBook, color: "primary", endIcon: AiFillAccountBook },
    { label: "Delete", startIcon: AiFillAlert, color: "error", endIcon: AiFillAlert },
    { label: "View", startIcon: AiFillAlipayCircle, color: "info", endIcon: AiFillAlipayCircle, disabled: true },
    { section: "User" },
    { label: "Profile", startIcon: AiFillAccountBook, color: "secondary", endIcon: AiFillAccountBook },
    { label: "Settings", startIcon: AiFillApple, color: "warning", endIcon: AiFillApple },
    {
        label: html`<span style="color: var(--mjo-color-success)">Logout</span>`,
        startIcon: AiFillBehanceSquare,
        color: "success",
        endIcon: AiFillBehanceSquare,
    },
];

@customElement("listbox-component")
export class ListboxComponent extends LitElement {
    render() {
        return html`<mjo-listbox .items=${ListboxItems} variant="light" size="small" selectable="multiple"></mjo-listbox>`;
    }

    static styles = [
        css`
            :host {
                display: block;
                --mjo-listbox-icon-top: -1px;
                min-height: 200vh;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "listbox-component": ListboxComponent;
    }
}
