/* eslint-disable no-console */
import type { MjoTheme } from "../src/mjo-theme.js";
import { MjoTableColumns, MjoTableRowClickEvent, MjoTableRows, MjoTableSelectEvent } from "../src/types/mjo-table.js";

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import "../src/mjo-button.js";
import "../src/mjo-table.js";
import "../src/mjo-theme.js";

const COLUMNS: MjoTableColumns = [
    { name: "name", label: "Name", sortable: true, filterable: true, minWidth: 150 },
    { name: "email", label: "Email", sortable: true },
    { name: "age", label: "Age", sortable: true },
    { name: "city", label: "City" },
];

const ROWS: MjoTableRows = [
    { _key: 1, name: "John Doe", email: "john@example.com", age: 30, city: "New York" },
    { _key: 2, name: "Jane Smith", email: "jane@example.com", age: 25, city: "Los Angeles" },
    { _key: 3, name: "Alice Johnson", email: "alice@example.com", age: 28, city: "Chicago" },
    { _key: 4, name: "Bob Brown", email: "bob@example.com", age: 35, city: "Houston" },
    { _key: 5, name: "Charlie Davis", email: "charlie@example.com", age: 22, city: "Phoenix" },
    { _key: 6, name: "Emily Clark", email: "emily@example.com", age: 27, city: "San Diego" },
    { _key: 7, name: "Frank Miller", email: "frank@example.com", age: 32, city: "Dallas" },
    { _key: 8, name: "Grace Lee", email: "grace@example.com", age: 29, city: "San Jose" },
    { _key: 9, name: "Henry Wilson", email: "henry@example.com", age: 31, city: "Austin" },
    { _key: 10, name: "Ivy Martinez", email: "ivy@example.com", age: 26, city: "Jacksonville" },
    { _key: 11, name: "Jack White", email: "jack@example.com", age: 34, city: "Fort Worth" },
    { _key: 12, name: "Karen Harris", email: "karen@example.com", age: 24, city: "Columbus" },
    { _key: 13, name: "Leo King", email: "leo@example.com", age: 33, city: "Charlotte" },
    { _key: 14, name: "Mia Scott", email: "mia@example.com", age: 23, city: "San Francisco" },
    { _key: 15, name: "Nathan Young", email: "nathan@example.com", age: 36, city: "Indianapolis" },
    { _key: 16, name: "Olivia Green", email: "olivia@example.com", age: 28, city: "Seattle" },
    { _key: 17, name: "Paul Adams", email: "paul@example.com", age: 27, city: "Denver" },
    { _key: 18, name: "Quinn Baker", email: "quinn@example.com", age: 29, city: "Washington" },
    { _key: 19, name: "Rachel Carter", email: "rachel@example.com", age: 31, city: "Boston" },
    { _key: 20, name: "Sam Evans", email: "sam@example.com", age: 25, city: "El Paso" },
    { _key: 21, name: "Tina Foster", email: "tina@example.com", age: 32, city: "Nashville" },
    { _key: 22, name: "Uma Graham", email: "uma@example.com", age: 30, city: "Detroit" },
    { _key: 23, name: "Victor Hall", email: "victor@example.com", age: 33, city: "Memphis" },
    { _key: 24, name: "Wendy Irwin", email: "wendy@example.com", age: 26, city: "Portland" },
    { _key: 25, name: "Xander James", email: "xander@example.com", age: 28, city: "Oklahoma City" },
    { _key: 26, name: "Yara Kelly", email: "yara@example.com", age: 35, city: "Las Vegas" },
    { _key: 27, name: "Zane Lewis", email: "zane@example.com", age: 22, city: "Louisville" },
    { _key: 28, name: "Abby Morgan", email: "abby@example.com", age: 29, city: "Baltimore" },
    { _key: 29, name: "Ben Nelson", email: "ben@example.com", age: 31, city: "Milwaukee" },
    { _key: 30, name: "Cara Owens", email: "cara@example.com", age: 27, city: "Albuquerque" },
    { _key: 31, name: "Dylan Perez", email: "dylan@example.com", age: 34, city: "Tucson" },
    { _key: 32, name: "Ella Quinn", email: "ella@example.com", age: 25, city: "Fresno" },
    { _key: 33, name: "Finn Roberts", email: "finn@example.com", age: 32, city: "Sacramento" },
    { _key: 34, name: "Gina Smith", email: "gina@example.com", age: 28, city: "Kansas City" },
    { _key: 35, name: "Hugo Taylor", email: "hugo@example.com", age: 30, city: "Mesa" },
    { _key: 36, name: "Iris Underwood", email: "iris@example.com", age: 26, city: "Atlanta" },
    { _key: 37, name: "Jake Vincent", email: "jake@example.com", age: 33, city: "Omaha" },
    { _key: 38, name: "Kara Walker", email: "kara@example.com", age: 24, city: "Colorado Springs" },
    { _key: 39, name: "Liam Xu", email: "liam@example.com", age: 35, city: "Raleigh" },
    { _key: 40, name: "Mona Young", email: "mona@example.com", age: 29, city: "Miami" },
    { _key: 41, name: "Noah Zimmerman", email: "noah@example.com", age: 31, city: "Long Beach" },
    { _key: 42, name: "Olga Allen", email: "olga@example.com", age: 27, city: "Virginia Beach" },
    { _key: 43, name: "Pete Brooks", email: "pete@example.com", age: 32, city: "Oakland" },
    { _key: 44, name: "Quincy Cruz", email: "quincy@example.com", age: 28, city: "Minneapolis" },
    { _key: 45, name: "Rita Diaz", email: "rita@example.com", age: 30, city: "Tulsa" },
    { _key: 46, name: "Steve Edwards", email: "steve@example.com", age: 26, city: "Arlington" },
    { _key: 47, name: "Tara Flores", email: "tara@example.com", age: 34, city: "New Orleans" },
    { _key: 48, name: "Ulysses Grant", email: "ulysses@example.com", age: 25, city: "Wichita" },
    { _key: 49, name: "Vera Hunt", email: "vera@example.com", age: 33, city: "Cleveland" },
    { _key: 50, name: "Will Irving", email: "will@example.com", age: 28, city: "Tampa" },
];

@customElement("my-element")
export class MyElement extends LitElement {
    render() {
        return html` <div class=".container">
            <mjo-theme theme="light" scope="global"> </mjo-theme>
            <mjo-button @click=${this.#toggleTheme}>Toggle Theme</mjo-button>

            <mjo-table
                rowHover="highlight"
                rowClickable
                color="secondary"
                size="medium"
                headerSticky
                maxHeight="600"
                pageSize="10"
                currentPage="1"
                rowSeparator="contrast"
                selectable="multiple"
                .columns=${COLUMNS}
                .rows=${ROWS}
                @mjo-table:row-click=${this.#handleClick}
                @mjo-table:select=${this.#handleSelect}
            >
            </mjo-table>
        </div>`;
    }

    #handleClick(event: MjoTableRowClickEvent) {
        console.log("Row clicked:", event.detail);
    }

    #handleSelect(event: MjoTableSelectEvent) {
        console.log("Rows selected:", event.detail);
    }

    #toggleTheme = () => {
        const mjoTheme = this.shadowRoot?.querySelector("mjo-theme") as MjoTheme;
        if (mjoTheme) {
            mjoTheme.toggleTheme();
        }
    };

    static styles = css`
        :host {
            position: relative;
            min-width: 100vw;
            margin: 0 auto;
            text-align: center;
        }
        mjo-table {
            padding: 20px;
            max-width: 100dvw;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
