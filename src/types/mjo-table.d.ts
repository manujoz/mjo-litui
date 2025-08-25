import { TemplateResult } from "lit";
import { MjoTableRowItem } from "./mjo-table";

export type MjoTableColumn = {
    name: string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    minWidth?: string | number;
    width?: string | number;
    colspan?: number;
    placeContent?: "center" | "left" | "right";
};

export interface MjoTableRowItem extends Record<string, string | number | TemplateResult<1>> {
    _key: string | number;
}

export type MjoTableColumns = MjoTableColumn[];
export type MjoTableRows = MjoTableRowItem[];
export type MjoTableFooters = MjoTableRowItem[];
export type MjoTableSortDirections = "asc" | "desc";

export interface MjoTableSortEvent extends CustomEvent {
    detail: {
        columnName?: string;
        direction?: MjoTableSortDirections;
    };
}
export interface MjoTableFilterEvent extends CustomEvent {
    detail: {
        key?: string;
        filter?: string;
    };
}
export interface MjoTableRowClickEvent extends CustomEvent {
    detail: {
        key: string | number;
        row: MjoTableRowItem;
    };
}
export interface MjoTableSelectEvent extends CustomEvent {
    detail: {
        selected: MjoTableRowItem[];
    };
}
