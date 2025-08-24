/* eslint-disable no-console */

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { theme } from "./theme.js";

import "../src/mjo-table.js";
import "../src/mjo-theme.js";
import { MjoTableHeaders, MjoTableRows } from "../src/types/mjo-table.js";

const HEADERS: MjoTableHeaders = [
    { key: "name", sortable: true, render: "Name", filterable: true },
    { key: "email", sortable: true, render: "Email" },
    { key: "age", sortable: true, render: "Age" },
    { key: "city", render: "City" },
];

const ROWS: MjoTableRows = [
    [
        { key: "name", render: "John Doe" },
        { key: "email", render: "john@example.com" },
        { key: "age", render: 30 },
        { key: "city", render: "New York" },
    ],
    [
        { key: "name", render: "Jane Smith" },
        { key: "email", render: "jane@example.com" },
        { key: "age", render: 25 },
        { key: "city", render: "Los Angeles" },
    ],
    [
        { key: "name", render: "Alice Johnson" },
        { key: "email", render: "alice@example.com" },
        { key: "age", render: 28 },
        { key: "city", render: "Chicago" },
    ],
];

@customElement("my-element")
export class MyElement extends LitElement {
    render() {
        return html` <div class=".container">
            <mjo-theme theme="dark" .config=${theme} scope="global"> </mjo-theme>

            <mjo-table .headers=${HEADERS} .rows=${ROWS}> </mjo-table>
        </div>`;
    }

    static styles = css`
        :host {
            position: relative;
            min-width: 100vw;
            margin: 0 auto;
            text-align: center;
        }
        mjo-table {
            padding: 20px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
