import {
    MjoTableColumns,
    MjoTableFilterEvent,
    MjoTableRowClickEvent,
    MjoTableRowItem,
    MjoTableRows,
    MjoTableSelectEvent,
    MjoTableSortDirections,
    MjoTableSortEvent,
} from "./types/mjo-table";

import { LitElement, PropertyValues, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { normalizeText, uniqueId } from "./utils/strings.js";

import "./components/table/filtrable-button.js";
import "./components/table/sortable-button.js";
import "./mjo-checkbox.js";
import "./mjo-icon.js";
import { MjoCheckboxChangeEvent } from "./types/mjo-checkbox.js";

@customElement("mjo-table")
export class MjoTable extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Number }) maxHeight?: number;
    @property({ type: Boolean }) compact: boolean = false;

    @property({ type: String }) selectable: "single" | "multiple" | "none" = "none";

    @property({ type: Boolean }) headerSticky: boolean = false; // Only works when maxHeight is set
    @property({ type: String }) headerStyle?: "sticky-style";
    @property({ type: String }) rowSeparator: "border" | "contrast" | "none" = "none";
    @property({ type: String }) rowHover: "highlight" | "none" = "highlight";
    @property({ type: Boolean }) rowClickable: boolean = false;

    @property({ type: Array }) columns: MjoTableColumns = [];
    @property({ type: Array }) rows: MjoTableRows = []; // ¡IMPORTANT! Never mutate this array into component.

    @property({ type: Number }) page = 1;
    @property({ type: Number }) itemsPerPage?: number;

    @state() sort: Sort = { columnName: undefined, direction: undefined };
    @state() filters: Filter = { columnName: undefined, filter: undefined };
    @state() selectedItems: MjoTableRowItem[] = [];

    renderedRows: MjoTableRows = [];
    #stickyObserver: IntersectionObserver | null = null;

    render() {
        if (this.columns.length === 0 || this.rows.length === 0) {
            console.error("Headers and rows are required", this);
            return nothing;
        }

        const tableClasses = classMap({
            "separator-contrast": this.rowSeparator === "contrast",
            "separator-border": this.rowSeparator === "border",
            "size-small": this.size === "small",
            "size-large": this.size === "large",
            highlight: this.rowHover === "highlight",
            clickable: this.rowClickable,
            secondary: this.color === "secondary",
            compact: this.compact,
        });

        const headClasses = classMap({
            "sticky-header": this.headerSticky,
            "header-sticky-style": this.headerStyle === "sticky-style",
        });

        const containerStyles = styleMap({
            maxHeight: this.maxHeight ? `${this.maxHeight}px` : undefined,
        });

        return html`
            <div class="sentinel"></div>
            <div class="container" style=${containerStyles}>
                <table class=${tableClasses}>
                    <thead class=${headClasses}>
                        <tr>
                            ${this.#renderThead()}
                        </tr>
                    </thead>
                    <tbody>
                        ${this.#renderTBody()}
                    </tbody>
                </table>
            </div>
        `;
    }

    #renderThead() {
        let selectableTh: TemplateResult<1> | typeof nothing = nothing;
        if (this.selectable !== "none") {
            const indeterminate = this.selectedItems.length > 0 && this.selectedItems.length < this.rows.length;
            const checked = this.selectedItems.length === this.rows.length;

            selectableTh = html`
                <th class="selectable">
                    <mjo-checkbox
                        ?indeterminate=${indeterminate}
                        ?checked=${checked}
                        class=${this.selectable !== "multiple" ? "hidden" : ""}
                        color=${this.color || "primary"}
                        @mjo-checkbox:change=${this.#handleSelectAll}
                    ></mjo-checkbox>
                </th>
            `;
        }

        return repeat(
            this.columns,
            (column, index) => {
                return `${column.name}-${index}`;
            },
            (column, index) => {
                const classes = classMap({
                    "container-header": true,
                    "place-right": column.placeContent === "right",
                    "place-center": column.placeContent === "center",
                });

                const styles = styleMap({
                    "min-width": typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth,
                    width: typeof column.width === "number" ? `${column.width}px` : column.width,
                    colspan: column.colspan,
                });

                return html`
                    ${index === 0 ? selectableTh : nothing}
                    <th style=${styles}>
                        <div class=${classes}>
                            <span class="render">${column.label || "Column"}</span>
                            ${column.sortable
                                ? html`<sortable-button
                                      columnname=${column.name}
                                      direction=${ifDefined(this.sort.columnName === column.name ? this.sort.direction : undefined)}
                                      @mjo-table:sort=${this.#handleSort}
                                  ></sortable-button>`
                                : nothing}
                            ${column.filterable
                                ? html`<filtrable-button
                                      columnName=${column.name}
                                      filter=${ifDefined(this.filters.columnName === column.name ? this.filters.filter : undefined)}
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
        const itemsRow = this.#getRenderedRows();

        if (itemsRow.length === 0) {
            return html`
                <tr class="no-data">
                    <td colspan=${this.#fullColspan()} style="text-align: center;">No data</td>
                </tr>
            `;
        }

        return html`
            ${repeat(
                itemsRow,
                (row) => {
                    return `${this.#getRowKey(row)}-${uniqueId()}`;
                },
                (row) => {
                    return html`
                        <tr @click=${(ev: Event) => this.#handleRowClick(row, ev)}>
                            ${repeat(
                                this.columns,
                                (column, index) => {
                                    return `${column.name}-${index}`;
                                },
                                (column, index) => {
                                    if (!row[column.name]) return nothing;

                                    let selectableTh: TemplateResult<1> | typeof nothing = nothing;
                                    if (this.selectable !== "none") {
                                        selectableTh = html`
                                            <td class="selectable">
                                                <mjo-checkbox
                                                    class="selectable-checkbox-sr3as"
                                                    ?checked=${this.#isRowSelected(row)}
                                                    color=${this.color || "primary"}
                                                    @mjo-checkbox:change=${() => this.#handleSelect(row)}
                                                ></mjo-checkbox>
                                            </td>
                                        `;
                                    }
                                    return html`
                                        ${index === 0 ? selectableTh : nothing}
                                        <td>${row[column.name]}</td>
                                    `;
                                },
                            )}
                        </tr>
                    `;
                },
            )}
        `;
    }

    protected willUpdate(_changedProperties: PropertyValues): void {
        super.willUpdate(_changedProperties);

        if (_changedProperties.has("rows")) {
            this.#validateRowKeys();
        }
    }

    protected updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);

        if (_changedProperties.has("headerSticky") || _changedProperties.has("rows") || _changedProperties.has("columns")) {
            if (this.headerSticky && this.maxHeight) {
                this.#setupStickyObserver();
            } else {
                this.#stickyObserver?.disconnect();
            }
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.#stickyObserver?.disconnect();
    }

    #fullColspan() {
        let colspan = 0;

        this.columns.forEach((head) => {
            colspan += head.colspan || 1;
        });

        return colspan;
    }

    #getRenderedRows(): MjoTableRows {
        this.renderedRows = [...this.rows];

        const { columnName, filter } = this.filters;
        if (columnName && filter) {
            this.renderedRows = this.renderedRows.filter((row) => {
                const value = this.#getCellValue(row[columnName]);
                return normalizeText(String(value)).includes(normalizeText(filter));
            });
        }

        this.#sortRows();

        if (this.itemsPerPage) {
            const totalItems = this.renderedRows.length;
            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = Math.min(startIndex + this.itemsPerPage, totalItems);

            return this.renderedRows.slice(startIndex, endIndex);
        }

        return this.renderedRows;
    }

    #getCellValue(value: string | number | TemplateResult<1> | undefined): string | number {
        if (value === undefined || typeof value === "function") {
            return "";
        }
        if (typeof value === "string" || typeof value === "number") {
            return value;
        }

        return value.strings[0] ? value.strings.join() : "";
    }

    #getRowKey(row: MjoTableRowItem): string | number {
        // Note: Using Reflect.get instead of direct property access due to minification issues
        return Reflect.get(row, "_key");
    }

    #handleSort = (ev: MjoTableSortEvent) => {
        const { columnName, direction } = ev.detail;

        this.sort = { columnName, direction };
    };

    #handleFilter = (ev: MjoTableFilterEvent) => {
        const { key, filter } = ev.detail;

        if (!filter) {
            this.filters = { columnName: undefined, filter: undefined };
            return;
        }

        this.filters = { columnName: key, filter };
    };

    #handleRowClick = (row: MjoTableRowItem, ev: Event) => {
        if (!this.rowClickable) return;

        const keyValue = this.#getRowKey(row);

        if (this.selectable !== "none" && !(ev.target as HTMLElement).classList.contains("selectable-checkbox-sr3as")) {
            this.#handleSelect(row);
        }

        this.dispatchEvent(
            new CustomEvent<MjoTableRowClickEvent["detail"]>("mjo-table:row-click", {
                detail: {
                    key: keyValue,
                    row: row,
                },
            }),
        );
    };

    #handleSelect = (row: MjoTableRowItem) => {
        const exists = this.#isRowSelected(row);

        if (!exists) {
            if (this.selectable === "multiple") {
                this.selectedItems = [...this.selectedItems, row];
            } else {
                this.selectedItems = [row];
            }
        } else if (exists) {
            this.selectedItems = this.selectedItems.filter((item) => this.#getRowKey(item) !== this.#getRowKey(row));
        }

        this.dispatchEvent(
            new CustomEvent<MjoTableSelectEvent["detail"]>("mjo-table:select", {
                detail: {
                    selected: this.selectedItems,
                },
            }),
        );
    };

    #handleSelectAll = (event: MjoCheckboxChangeEvent) => {
        if (event.detail.previousState.checked && !event.detail.checked) {
            this.selectedItems = [];
        } else if (!event.detail.previousState.checked && event.detail.checked) {
            this.selectedItems = [...this.rows];
        }

        this.dispatchEvent(
            new CustomEvent<MjoTableSelectEvent["detail"]>("mjo-table:select", {
                detail: {
                    selected: this.selectedItems,
                },
            }),
        );
    };

    #isRowSelected(row: MjoTableRowItem): boolean {
        return this.selectedItems.some((item) => this.#getRowKey(item) === this.#getRowKey(row));
    }

    #setupStickyObserver() {
        const findScrollContainer = () => {
            let element: Element | null = this.shadowRoot?.querySelector("table") as Element;

            while (element) {
                const style = getComputedStyle(element);
                const overflow = style.overflow + style.overflowY;
                if (element.scrollHeight > element.clientHeight && /(auto|scroll)/.test(overflow)) {
                    return element;
                }

                element = element?.parentElement || (element?.getRootNode() as ShadowRoot).host;
            }

            return null;
        };

        const scrollContainer = findScrollContainer();
        const sentinel = this.shadowRoot?.querySelector(".sentinel") as HTMLElement;
        const thead = this.shadowRoot?.querySelector("thead") as HTMLElement;

        this.#stickyObserver = new IntersectionObserver(
            ([entry]) => {
                const isStuck = !entry.isIntersecting;
                if (isStuck) {
                    thead.classList.add("header-sticky-style");
                } else if (this.headerStyle !== "sticky-style") {
                    thead.classList.remove("header-sticky-style");
                }
            },
            {
                root: scrollContainer,
                rootMargin: "0px 0px 0px 0px",
            },
        );

        this.#stickyObserver.observe(sentinel);
    }

    #sortRows() {
        const { columnName, direction } = this.sort;
        if (!columnName || !direction) return;

        const sortDirection = this.sort.direction === "asc" ? 1 : -1;
        const comparator = (a: string | number, b: string | number): number => {
            if (typeof a === "string" && typeof b === "string") {
                return a.localeCompare(b) * sortDirection;
            } else if (typeof a === "number" && typeof b === "number") {
                return (a - b) * sortDirection;
            } else {
                return 0;
            }
        };

        this.renderedRows.sort((a, b) => {
            const valueA = this.#getCellValue(a[columnName]);
            const valueB = this.#getCellValue(b[columnName]);
            return comparator(valueA, valueB);
        });
    }

    #validateRowKeys() {
        // Check if any row is missing _key
        const hasInvalidKeys = this.rows.some((row) => {
            const keyValue = this.#getRowKey(row);
            return !keyValue && keyValue !== 0; // Allow 0 as valid key
        });

        if (hasInvalidKeys) {
            throw new Error("All rows must have a unique _key property");
        }

        // Check for duplicate keys using
        const keys = this.rows.map((row) => this.#getRowKey(row));
        const uniqueKeys = new Set(keys);

        if (keys.length !== uniqueKeys.size) {
            const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
            const uniqueDuplicates = [...new Set(duplicates)];
            throw new Error(`Duplicate _key values found: ${uniqueDuplicates.join(", ")}`);
        }
    }

    static styles = css`
        :host {
            position: relative;
            display: block;
            width: 100%;
            box-sizing: border-box;
        }
        .hidden {
            display: none !important;
        }
        .sentinel {
            position: relative;
            height: 1px;
        }
        .container {
            position: relative;
            top: 0;
            display: flex;
            box-sizing: border-box;
            padding: var(--mjo-space-medium);
            flex-direction: column;
            overflow: auto;
            border-radius: var(--mjo-table-border-radius, var(--mjo-radius-large, 10px));
            scrollbar-width: thin;
            background-color: var(--mjo-table-background-color, var(--mjo-background-color-card-low, #f0f0f0));
            width: 100%;
            scrollbar-color: var(--mjo-table-scrollbar-thumb-color, var(--mjo-background-color, #888))
                var(--mjo-scrollbar-track-color, var(--mjo-background-color-xhigh, #f1f1f1));
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            background-color: var(--mjo-table-background-color, transparent);
            color: var(--mjo-table-foreground-color, var(--mjo-foreground-color, #333333));
            font-size: inherit;
            table-layout: auto;
        }
        table.size-small {
            font-size: 0.8em;
        }
        table.size-large {
            font-size: 1.2em;
        }
        thead {
            position: relative;
            font-size: var(--mjo-table-header-font-size, inherit);
        }
        thead.sticky-header {
            position: sticky;
            top: 0px;
            z-index: 1;
        }
        thead::before {
            position: absolute;
            inset: 0;
            content: "";
            background-color: transparent;
            transition: background-color 0.2s ease;
        }
        thead.header-sticky-style::before {
            background-color: var(--mjo-table-header-background-color-stuck, var(--mjo-background-color-card-high, #000000)) !important;
            color: var(--mjo-table-header-foreground-color-stuck, var(--mjo-foreground-color, #ffffff));
            border-radius: var(--mjo-radius-large);
            box-shadow: var(--mjo-box-shadow-2);
            overflow: hidden;
        }
        thead.header-sticky-style th {
            border-bottom-color: transparent;
        }
        th {
            padding: 0;
            user-select: none;
            color: var(--mjo-table-header-foreground-color, var(--mjo-foreground-color, #333333));
            border-bottom: solid 1px var(--mjo-table-header-border-color, var(--mjo-border-color, #dddddd));
        }
        .container-header {
            position: relative;
            display: flex;
            justify-content: flex-start;
            padding: var(--mjo-table-header-padding, var(--mjo-space-small));
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
        tbody {
            font-size: var(--mjo-table-body-font-size, inherit);
        }
        th,
        td {
            text-align: left;
        }
        .compact td {
            padding: var(--mjo-space-xxsmall);
        }
        td {
            color: var(--mjo-table-cell-foreground-color, var(--mjo-foreground-color, #333333));
            padding: var(--mjo-space-small);
        }
        tr th:first-child,
        tr td:first-child {
            padding-left: var(--mjo-space-small);
        }
        tr th:last-child,
        tr td:last-child {
            padding-right: var(--mjo-space-small);
        }
        tr th:first-child .container-header {
            padding-left: 0;
        }
        .separator-contrast tr:nth-child(even) {
            background-color: var(--mjo-table-row-background-color-even, var(--mjo-background-color-high, #f2f2f2));
        }
        .separator-contrast tr:nth-child(even) td {
            color: var(--mjo-table-row-foreground-color-even, var(--mjo-table-foreground-color, var(--mjo-foreground-color, #333333)));
        }
        .separator-border tr {
            border-bottom: solid 1px var(--mjo-table-row-border-color, var(--mjo-border-color-low, #dddddd));
        }

        .highlight tr {
            transition: background-color 0.3s ease;
        }
        .highlight tr:hover {
            background-color: var(--mjo-table-row-background-color-highlight, var(--mjo-primary-color-alpha1, #007bff11));
        }
        .highlight tr:hover td {
            color: var(--mjo-table-row-foreground-color-highlight, var(--mjo-primary-color, #ffffff));
        }
        .highlight.secondary tr:hover {
            background-color: var(--mjo-table-row-background-color-highlight, var(--mjo-secondary-color-alpha1, #cc3d7411));
        }
        .highlight.secondary tr:hover td {
            color: var(--mjo-table-row-foreground-color-highlight, var(--mjo-secondary-color, #ffffff));
        }
        .clickable tr {
            cursor: pointer;
        }
        .clickable tr th {
            cursor: default;
        }

        thead tr {
            background-color: var(--mjo-table-header-background-color, transparent) !important;
        }

        th.selectable,
        td.selectable {
            width: 20px;
            padding: 0;
            vertical-align: middle;
        }
        th.selectable mjo-checkbox,
        td.selectable mjo-checkbox {
            display: block;
            width: 100%;
            padding: 0;
        }
        mjo-checkbox {
            font-size: 14px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-table": MjoTable;
    }

    interface HTMLElementEventMap {
        "mjo-table:row-click": MjoTableRowClickEvent;
        "mjo-table:filter": MjoTableFilterEvent;
        "mjo-table:sort": MjoTableSortEvent;
        "mjo-table:select": MjoTableSelectEvent;
    }
}

type Sort = {
    columnName?: string;
    direction?: MjoTableSortDirections;
};

type Filter = {
    columnName?: string;
    filter?: string;
};
