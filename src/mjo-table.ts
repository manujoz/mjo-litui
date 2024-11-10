import { MjoTableHeader, MjoTableRowItem, MjoTableRows } from "./types/mjo-table";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { AiFillAlert } from "mjo-icons/ai/AiFillAlert.js";
import { AiOutlineArrowUp } from "mjo-icons/ai/AiOutlineArrowUp.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-icon.js";

@customElement("mjo-table")
export class MjoTable extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Number }) page = 1;
    @property({ type: Number }) itemsPerPage = 10;
    @property({ type: Array }) headers: MjoTableHeader[] = [];
    @property({ type: Array }) rows: MjoTableRows[] = [];
    @property({ type: Array }) footers: MjoTableRows[] = [];

    #currentSortColumn!: MjoTableHeader;
    #selectedRowIndex = -1;
    #totalItems = 0;

    render() {
        return html`
            <table>
                <thead>
                    <tr>
                        ${this.#renderThead()}
                    </tr>
                </thead>
                <tbody>
                    ${this.#renderTBody()}
                </tbody>
                <tfoot>
                    ${this.#renderTFoot()}
                </tfoot>
            </table>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.#sortFirstSortableColumn();
        this.#totalItems = this.rows.length;
    }

    #filterColumn() {}

    #getColspan() {
        let colspan = 0;
        this.headers.map((head) => {
            colspan += head.colspan || 1;
        });
        return colspan;
    }

    #getItemsRows(): MjoTableRows[] {
        const startIndex = (this.page - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.#totalItems);
        return this.rows.slice(startIndex, endIndex);
    }

    #getValue(value: string | number | TemplateResult<1> | undefined): string | number {
        if (value === undefined) {
            return "";
        }
        if (typeof value === "string" || typeof value === "number") {
            return value;
        }
        return value.toString();
    }

    #renderThead() {
        return repeat(
            this.headers,
            (header, index) => {
                return `${header.key}-${index}`;
            },
            (header) =>
                html` <th style="min-width: ${header.minWidth || ""}" colspan=${header.colspan || 0} @click=${() => this.#sortColumn(header)}>
                    <div class="container-header" style="place-content: ${header.placeContent || "left"}">
                        ${header.icon ? html`<mjo-icon class="icon" src=${header.icon}></mjo-icon>` : nothing} ${header.render}
                        ${header.sortable ? html`<mjo-icon class="sort-icon ${header.sortDirection}" src=${AiOutlineArrowUp}></mjo-icon>` : nothing}
                        ${header.filterable ? html`<mjo-icon class="filter-icon" @click=${() => this.#filterColumn()} src=${AiFillAlert}></mjo-icon>` : nothing}
                    </div>
                </th>`,
        );
    }

    #renderTBody() {
        const itemsRow = this.#getItemsRows();
        if (itemsRow.length === 0) {
            return html`<tr class="no-data">
                <td colspan=${this.#getColspan()} style="text-align: center;">No data</td>
            </tr> `;
        }

        return repeat(
            itemsRow,
            (row, index) => {
                return `${row[0].key}-${index}`;
            },
            (row, index) =>
                html`<tr @click=${() => this.#selectRow(index)} class=${this.#selectedRowIndex === index ? "selected" : ""}>
                    ${repeat(
                        row,
                        (column, index) => {
                            return `${column.key}-${index}`;
                        },
                        (column: MjoTableRowItem) => html`<td>${column.render}</td>`,
                    )}
                </tr> `,
        );
    }

    #renderTFoot() {
        return repeat(
            this.footers,
            (footer, index) => {
                return `${footer[0].key}-${index}`;
            },
            (footer) =>
                html`<tr>
                    ${repeat(
                        footer,
                        (column, index) => {
                            return `${column.key}-${index}`;
                        },
                        (column: MjoTableRowItem) => html`<td>${column.render}</td>`,
                    )}
                </tr> `,
        );
    }

    #selectRow(index: number): void {
        this.#selectedRowIndex = index;
        this.requestUpdate();
    }

    #sortFirstSortableColumn(): void {
        const sortableColumn = this.headers.find((header) => header.sortable);
        if (sortableColumn) {
            this.#sortColumn(sortableColumn);
            this.#currentSortColumn = sortableColumn;
        }
    }

    #sortColumn(header: MjoTableHeader): void {
        if (!header.sortable) {
            return;
        }

        const sortDirection = header.sortDirection === "asc" ? 1 : -1;

        const comparator = (a: string | number, b: string | number): number => {
            if (typeof a === "string" && typeof b === "string") {
                return a.localeCompare(b) * sortDirection;
            } else if (typeof a === "number" && typeof b === "number") {
                return (a - b) * sortDirection;
            } else {
                return 0;
            }
        };

        this.rows.sort((a: MjoTableRows, b: MjoTableRows) => {
            const valueA = this.#getValue(a.find((item) => item.key === header.key)?.render);
            const valueB = this.#getValue(b.find((item) => item.key === header.key)?.render);
            return comparator(valueA, valueB);
        });

        if (this.#currentSortColumn === header) {
            this.#currentSortColumn = header;
        }
        header.sortDirection = header.sortDirection === "asc" ? "desc" : "asc";
        this.page = 1;
        this.requestUpdate();
    }

    static styles = css`
        :host {
            display: block;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            background-color: var(--mjo-table-background-color, transparent);
            color: var(--mjo-table-foreground-color, var(--mjo-foreground-color, #333333));
            font-size: inherit;
        }
        thead {
            font-size: var(--mjo-table-header-font-size, inherit);
        }
        tbody {
            font-size: var(--mjo-table-body-font-size, inherit);
        }
        th,
        td {
            padding: 8px;
            text-align: left;
        }

        td {
            color: var(--mjo-table-cell-foreground-color, var(--mjo-foreground-color, #333333));
        }

        tr:nth-child(even) {
            background-color: var(--mjo-table-cell-even-background-color, #f2f2f2);
        }

        tr:nth-child(even) td {
            color: var(--mjo-table-cell-even-foreground-color, var(--mjo-table-cell-foreground-color, var(--mjo-foreground-color, #333333)));
        }

        th {
            cursor: pointer;
            user-select: none;
            background-color: var(--mjo-table-header-background-color, var(--mjo-primary-color, rgb(235, 195, 23)));
            color: var(--mjo-table-header-foreground-color, var(--mjo-foreground-color, #333333));
        }

        .container-header {
            display: flex;
        }

        mjo-icon {
            width: 1.2rem;
            margin-left: 0.5rem;
        }

        .sort-icon {
            transition: transform 0.3s ease-in-out;
        }

        .sort-icon.asc {
            transform: rotate(180deg);
        }

        tfoot {
            background-color: var(--mjo-table-footer-background-color, transparent);
            color: var(--mjo-table-footer-color, var(--text-color));
            font-size: var(--mjo-table-footer-font-size, inherit);
        }
        tr.selected {
            background-color: var(--mjo-table-row-selected-color, transparent);
        }

        illo-image-fit {
            opacity: var(--mjo-table-no-data-opacity, 0.6);
            width: var(--mjo-table-no-data-width, 180px);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-table": MjoTable;
    }
}
