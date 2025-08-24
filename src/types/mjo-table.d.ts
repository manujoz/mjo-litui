import { MjoTableHeaderItem, MjoTableRowItem } from "./mjo-table";

type MjoTableRowItem = {
    key?: string;
    render: string | number | TemplateResult<1>;
};

type MjoTableHeaderItem = {
    key: string;
    sortable?: boolean;
    filterable?: boolean;
    render: string | number | TemplateResult<1>;
    minWidth?: string;
    colspan?: number;
    placeContent?: "center" | "left" | "right";
};

export type MjoTableHeaders = MjoTableHeaderItem[];
export type MjoTableRows = MjoTableRowItem[][];
export type MjoTableFooters = MjoTableRowItem[];
export type MjoTableSortDirections = "asc" | "desc";

export interface MjoTableSortEvent extends CustomEvent {
    detail: {
        key?: string;
        direction?: MjoTableSortDirections;
    };
}
