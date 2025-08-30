import type { MjoTab } from "../components/tabs/mjo-tab";

export type MjoTabsVariant = "light" | "solid" | "bordered";
export type MjoTabsColor = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";

export interface MjoTabsUpdatedEvent extends CustomEvent {
    detail: {
        tabs: MjoTab[];
    };
}

export interface MjoTabsChangeEvent extends CustomEvent {
    detail: {
        index: number;
        tab: MjoTab;
    };
}
