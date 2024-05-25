import { TemplateResult } from "lit";

interface MjoTableRowItem {
    key?: string;
    render: string | number | TemplateResult<1>;
}

type MjoTableHeader = {
    key: string;
    sortDirection?: "asc" | "desc";
    sortable?: boolean;
    filterable?: boolean;
    render: string | number | TemplateResult<1>;
    icon?: string;
    minWidth?: string;
    colspan?: number;
    placeContent?: "center" | "left" | "right";
};

type MjoTableRows = MjoTableRowItem[];
