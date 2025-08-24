import { MjoTableFooters, MjoTableHeaders, MjoTableRowItem, MjoTableRows, MjoTableSortDirections, MjoTableSortEvent } from "./types/mjo-table";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { AiFillAlert } from "mjo-icons/ai";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import "./components/table/sortable-button.js";
import "./mjo-icon.js";

@customElement("mjo-table")
export class MjoTable extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) rowSeparator: "border" | "contrast" | "none" = "none";

    @property({ type: Array }) headers: MjoTableHeaders = [];
    @property({ type: Array }) rows: MjoTableRows = [];
    @property({ type: Array }) footers: MjoTableFooters = [];

    @property({ type: Number }) page = 1;
    @property({ type: Number }) itemsPerPage = 10;

    @state() sortDirection?: MjoTableSortDirections;

    #currentSortKey?: string;

    #selectedRowIndex = -1;
    #totalItems = -1;

    render() {
        if (this.headers.length === 0 || this.rows.length === 0) {
            console.error("Headers and rows are required", this);
            return nothing;
        }

        if (this.#totalItems === -1) this.#totalItems = this.rows.length;

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
                ${this.footers.length > 0
                    ? html`<tfoot>
                          ${this.#renderTFoot()}
                      </tfoot>`
                    : nothing}
            </table>
        `;
    }

    #renderThead() {
        return repeat(
            this.headers,
            (header, index) => {
                return `${header.key}-${index}`;
            },
            (header) => {
                const classes = classMap({
                    "container-header": true,
                    "place-right": header.placeContent === "right",
                    "place-center": header.placeContent === "center",
                    sortable: header.sortable || false,
                    filterable: header.filterable || false,
                });

                const styles = styleMap({
                    "min-width": header.minWidth,
                    colspan: header.colspan,
                });

                return html`
                    <th style=${styles} @click=${() => this.#sortColumn(header)}>
                        <div class=${classes}>
                            <span class="render">${header.render}</span>
                            ${header.sortable
                                ? html`<sortable-button
                                      key=${header.key}
                                      .direction=${this.sortDirection}
                                      @mjo-table:sort=${this.#handleSort}
                                  ></sortable-button>`
                                : nothing}
                            ${header.filterable
                                ? html`<mjo-icon class="filter-icon" @click=${() => this.#filterColumn()} src=${AiFillAlert}></mjo-icon>`
                                : nothing}
                        </div>
                    </th>
                `;
            },
        );
    }

    #handleSort = (ev: MjoTableSortEvent) => {
        const { key, direction } = ev.detail;
        // TODO: Ordenar las filas de la tabla
        // this.#currentSortKey = key;
        // this.sortDirection = direction;
        // this.requestUpdate();
    };

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
        return nothing;
        // return repeat(
        //     this.footers,
        //     (footer, index) => {
        //         return `${footer[0].key}-${index}`;
        //     },
        //     (footer) =>
        //         html`<tr>
        //             ${repeat(
        //                 footer,
        //                 (column, index) => {
        //                     return `${column.key}-${index}`;
        //                 },
        //                 (column: MjoTableRowItem) => html`<td>${column.render}</td>`,
        //             )}
        //         </tr> `,
        // );
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

    #selectRow(index: number): void {
        this.#selectedRowIndex = index;
        this.requestUpdate();
    }

    #sortColumn(header: MjoTableHeaders[0]): void {
        // if (!header.sortable) {
        //     return;
        // }
        // const sortDirection = header.sortDirection === "asc" ? 1 : -1;
        // const comparator = (a: string | number, b: string | number): number => {
        //     if (typeof a === "string" && typeof b === "string") {
        //         return a.localeCompare(b) * sortDirection;
        //     } else if (typeof a === "number" && typeof b === "number") {
        //         return (a - b) * sortDirection;
        //     } else {
        //         return 0;
        //     }
        // };
        // this.rows.sort((a: MjoTableRows, b: MjoTableRows) => {
        //     const valueA = this.#getValue(a.find((item) => item.key === header.key)?.render);
        //     const valueB = this.#getValue(b.find((item) => item.key === header.key)?.render);
        //     return comparator(valueA, valueB);
        // });
        // if (this.#currentSortColumn === header) {
        //     this.#currentSortColumn = header;
        // }
        // header.sortDirection = header.sortDirection === "asc" ? "desc" : "asc";
        // this.page = 1;
        // this.requestUpdate();
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
            padding: var(--mjo-table-header-padding, 0 var(--mjo-space-small) var(--mjo-space-xxsmall));
            cursor: pointer;
            user-select: none;
            background-color: var(--mjo-table-header-background-color, transparent);
            color: var(--mjo-table-header-foreground-color, var(--mjo-foreground-color, #333333));
            border-bottom: solid 1px var(--mjo-table-header-border-color, var(--mjo-border-color, #dddddd));
        }

        .container-header {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: var(--mjo-space-xxsmall);
            font-weight: 500;
        }
        .container-header.place-right {
            justify-content: flex-end;
        }
        .container-header.place-center {
            justify-content: center;
        }
        .container-header > .render {
            font-size: var(--mjo-table-header-font-size, 0.8em);
            color: var(--mjo-table-header-foreground-color, var(--mjo-foreground-color-low, #333333));
            flex: 1 1 0;
        }

        tfoot {
            background-color: var(--mjo-table-footer-background-color, transparent);
            color: var(--mjo-table-footer-color, var(--text-color));
            font-size: var(--mjo-table-footer-font-size, inherit);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-table": MjoTable;
    }
}
