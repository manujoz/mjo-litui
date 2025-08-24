import {
    MjoTableFilterEvent,
    MjoTableFooters,
    MjoTableHeaders,
    MjoTableRowItem,
    MjoTableRows,
    MjoTableSortDirections,
    MjoTableSortEvent,
} from "./types/mjo-table";

import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import { ifDefined } from "lit/directives/if-defined.js";
import "./components/table/filtrable-button.js";
import "./components/table/sortable-button.js";
import "./mjo-icon.js";
import { normalizeText } from "./utils/strings.js";

@customElement("mjo-table")
export class MjoTable extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) rowSeparator: "border" | "contrast" | "none" = "none";

    @property({ type: Array }) headers: MjoTableHeaders = [];
    @property({ type: Array }) rows: MjoTableRows = [];
    @property({ type: Array }) footers: MjoTableFooters = [];

    @property({ type: Number }) page = 1;
    @property({ type: Number }) itemsPerPage = 10;

    @state() sort: Sort = { key: "", direction: undefined };
    @state() filters: Filter = { key: "", filter: undefined };

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
                    <th style=${styles}>
                        <div class=${classes}>
                            <span class="render">${header.render}</span>
                            ${header.sortable
                                ? html`<sortable-button
                                      key=${header.key}
                                      direction=${ifDefined(this.sort.key === header.key ? this.sort.direction : undefined)}
                                      @mjo-table:sort=${this.#handleSort}
                                  ></sortable-button>`
                                : nothing}
                            ${header.filterable
                                ? html`<filtrable-button
                                      key=${header.key}
                                      filter=${ifDefined(this.filters.key === header.key ? this.filters.filter : undefined)}
                                      @mjo-table:filter=${this.#handleFilter}
                                  ></filtrable-button>`
                                : nothing}
                        </div>
                    </th>
                `;
            },
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

    #handleSort = (ev: MjoTableSortEvent) => {
        const { key, direction } = ev.detail;

        if (!key || !direction) return;

        const sortDirection = direction === "asc" ? 1 : -1;
        const comparator = (a: string | number, b: string | number): number => {
            if (typeof a === "string" && typeof b === "string") {
                return a.localeCompare(b) * sortDirection;
            } else if (typeof a === "number" && typeof b === "number") {
                return (a - b) * sortDirection;
            } else {
                return 0;
            }
        };

        this.rows.sort((a: MjoTableRowItem[], b: MjoTableRowItem[]) => {
            const valueA = this.#getCellValue(a.find((item) => item.key === key)?.render);
            const valueB = this.#getCellValue(b.find((item) => item.key === key)?.render);
            return comparator(valueA, valueB);
        });

        this.sort = { key, direction };
    };

    #handleFilter = (ev: MjoTableFilterEvent) => {
        const { key, filter } = ev.detail;

        if (!filter) {
            this.filters = { key: "", filter: undefined };
            return;
        }

        this.filters = { key, filter };
    };

    #getColspan() {
        let colspan = 0;
        this.headers.map((head) => {
            colspan += head.colspan || 1;
        });
        return colspan;
    }

    #getItemsRows(): MjoTableRows {
        const { key, filter } = this.filters;
        let filteredRows = this.rows;

        if (key && filter) {
            filteredRows = filteredRows.filter((row) => {
                const value = this.#getCellValue(row.find((item) => item.key === key)?.render);
                return normalizeText(String(value)).includes(normalizeText(filter));
            });
        }

        const totalItems = filteredRows.length;
        const startIndex = (this.page - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, totalItems);

        return filteredRows.slice(startIndex, endIndex);
    }

    #getCellValue(value: string | number | TemplateResult<1> | undefined): string | number {
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
            background-color: var(--mjo-table-row-background-color-even, var(--mjo-background-color-high, #f2f2f2));
        }
        tr:nth-child(even) td {
            color: var(--mjo-table-row-foreground-color-even, var(--mjo-table-foreground-color, var(--mjo-foreground-color, #333333)));
        }
        th {
            padding: 0;
            user-select: none;
            background-color: var(--mjo-table-header-background-color, transparent);
            color: var(--mjo-table-header-foreground-color, var(--mjo-foreground-color, #333333));
            border-bottom: solid 1px var(--mjo-table-header-border-color, var(--mjo-border-color, #dddddd));
        }
        tfoot {
            background-color: var(--mjo-table-footer-background-color, transparent);
            color: var(--mjo-table-footer-color, var(--text-color));
            font-size: var(--mjo-table-footer-font-size, inherit);
        }

        .container-header {
            position: relative;
            display: flex;
            justify-content: flex-start;
            padding: var(--mjo-table-header-padding, var(--mjo-space-xxsmall) var(--mjo-space-small));
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
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-table": MjoTable;
    }
}

type Sort = {
    key: string;
    direction?: MjoTableSortDirections;
};

type Filter = {
    key?: string;
    filter?: string;
};
