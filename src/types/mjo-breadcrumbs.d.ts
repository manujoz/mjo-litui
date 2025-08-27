export type MjoBreadCrumbsSizes = "small" | "medium" | "large";
export type MjoBreadCrumbsColor = "primary" | "secondary";
export type MjoBreadCrumbsVariants = "default" | "solid" | "bordered";
export type MjoBreadcrumbsItems = MjoBreadcrumbsItem[];

export type MjoBreadcrumbsItem = {
    label: string;
    href?: string;
    active?: boolean;
    icon?: string;
};

export interface MjoBreadcrumbsNavigateEvent extends CustomEvent {
    detail: {
        item: MjoBreadcrumbsItem;
        index: number;
        href?: string;
    };
}
