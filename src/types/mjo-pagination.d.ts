import { MjoPagination } from "../mjo-pagination.js";

// Pagination size types
export type MjoPaginationSize = "small" | "medium" | "large";

// Pagination color types
export type MjoPaginationColor = "primary" | "secondary";

// Pagination change event interface
export interface MjoPaginationChangeEvent extends CustomEvent {
    detail: {
        element: MjoPagination;
        page: number;
        previousPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
    };
}

// Pagination page click event interface
export interface MjoPaginationPageClickEvent extends CustomEvent {
    detail: {
        element: MjoPagination;
        page: number;
        originalEvent: MouseEvent | KeyboardEvent;
    };
}

// Pagination navigation click event interface
export interface MjoPaginationNavigationEvent extends CustomEvent {
    detail: {
        element: MjoPagination;
        direction: "previous" | "next" | "first" | "last";
        page: number;
        originalEvent: MouseEvent | KeyboardEvent;
    };
}
