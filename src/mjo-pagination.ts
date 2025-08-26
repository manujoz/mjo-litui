import type { SupportedLocale } from "./types/locales.js";
import type {
    MjoPaginationChangeEvent,
    MjoPaginationColor,
    MjoPaginationNavigationEvent,
    MjoPaginationPageClickEvent,
    MjoPaginationSize,
} from "./types/mjo-pagination.js";

import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { locales } from "./locales/locales.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { MjoSelect } from "./mjo-select.js";

import "./components/pagination/pagination-ellipsis.js";
import "./components/pagination/pagination-nav-button.js";
import "./components/pagination/pagination-page-item.js";
import "./mjo-option.js";
import "./mjo-select.js";

/**
 * A comprehensive pagination component with animated page indicator and full accessibility support.
 *
 * @fires mjo-pagination:change - Fired when the current page changes
 * @fires mjo-pagination:page-click - Fired when a page number is clicked
 * @fires mjo-pagination:navigation - Fired when navigation buttons are clicked
 *
 * @example
 * ```html
 * <mjo-pagination totalItems="100" pageSize="10" currentPage="1"></mjo-pagination>
 * <mjo-pagination totalItems="500" pageSize="25" size="large" color="secondary"></mjo-pagination>
 * ```
 */
@customElement("mjo-pagination")
export class MjoPagination extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Number }) totalItems = 0;
    @property({ type: Number }) pageSize = 10;
    @property({ type: Number }) currentPage = 1;
    @property({ type: Number }) siblingCount = 1;
    @property({ type: Boolean }) hideFirstLast = false;
    @property({ type: Boolean }) hidePrevNext = false;
    @property({ type: Boolean }) showPageSizeSelector = false;
    @property({ type: Array }) pageSizeOptions = [10, 25, 50, 100];
    @property({ type: String }) size: MjoPaginationSize = "medium";
    @property({ type: String }) color: MjoPaginationColor = "primary";
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) locale: SupportedLocale = "en";

    @state() private totalPages!: number;
    @state() private pageRange: (number | "ellipsis")[] = [];

    get currentLocale() {
        return locales[this.locale] || locales.en;
    }

    get labels() {
        const locale = this.currentLocale;
        return {
            first: locale.pagination?.first || "First",
            previous: locale.pagination?.previous || "Previous",
            next: locale.pagination?.next || "Next",
            last: locale.pagination?.last || "Last",
            page: locale.pagination?.page || "Page",
            of: locale.pagination?.of || "of",
            itemsPerPage: locale.pagination?.itemsPerPage || "Items per page",
            goToPage: locale.pagination?.goToPage || "Go to page",
        };
    }

    render() {
        if (this.totalPages === undefined) {
            this.#calculatePagination();
        }

        if (this.totalPages <= 1) {
            return nothing;
        }

        return html`
            <nav
                class=${classMap({
                    pagination: true,
                    disabled: this.disabled,
                })}
                data-size=${this.size}
                data-color=${this.color}
                role="navigation"
                aria-label="Pagination Navigation"
            >
                <div class="pagination-container">
                    <div class="pagination-indicator" data-current-page=${this.currentPage} data-total-pages=${this.totalPages}></div>

                    ${!this.hideFirstLast
                        ? html`<pagination-nav-button
                              direction="first"
                              size=${this.size}
                              color=${this.color}
                              ?disabled=${this.disabled || this.currentPage === 1}
                              label=${this.labels.first}
                              @pagination-nav-click=${this.#handleNavigation}
                          ></pagination-nav-button>`
                        : nothing}
                    ${!this.hidePrevNext
                        ? html`<pagination-nav-button
                              direction="previous"
                              size=${this.size}
                              color=${this.color}
                              ?disabled=${this.disabled || this.currentPage === 1}
                              label=${this.labels.previous}
                              @pagination-nav-click=${this.#handleNavigation}
                          ></pagination-nav-button>`
                        : nothing}
                    ${this.pageRange.map((item) =>
                        item === "ellipsis"
                            ? html`<pagination-ellipsis size=${this.size}></pagination-ellipsis>`
                            : html`<pagination-page-item
                                  page=${item}
                                  size=${this.size}
                                  color=${this.color}
                                  ?active=${item === this.currentPage}
                                  ?disabled=${this.disabled}
                                  @pagination-page-click=${this.#handlePageClick}
                              ></pagination-page-item>`,
                    )}
                    ${!this.hidePrevNext
                        ? html`<pagination-nav-button
                              direction="next"
                              size=${this.size}
                              color=${this.color}
                              ?disabled=${this.disabled || this.currentPage === this.totalPages}
                              label=${this.labels.next}
                              @pagination-nav-click=${this.#handleNavigation}
                          ></pagination-nav-button>`
                        : nothing}
                    ${!this.hideFirstLast
                        ? html`<pagination-nav-button
                              direction="last"
                              size=${this.size}
                              color=${this.color}
                              ?disabled=${this.disabled || this.currentPage === this.totalPages}
                              label=${this.labels.last}
                              @pagination-nav-click=${this.#handleNavigation}
                          ></pagination-nav-button>`
                        : nothing}
                </div>

                ${this.showPageSizeSelector ? this.#renderPageSizeSelector() : nothing}
            </nav>
        `;
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (
            changedProperties.has("totalItems") ||
            changedProperties.has("pageSize") ||
            changedProperties.has("currentPage") ||
            changedProperties.has("siblingCount")
        ) {
            this.#calculatePagination();
            this.#updateIndicatorPosition();
        }
    }

    protected firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);
        this.#updateIndicatorPosition();
    }

    /**
     * Navigate to a specific page
     */
    goToPage(page: number) {
        if (page < 1 || page > this.totalPages || page === this.currentPage || this.disabled) {
            return;
        }

        const previousPage = this.currentPage;
        this.currentPage = page;
        this.#dispatchChangeEvent(previousPage);

        // Update indicator position after page change
        this.updateComplete.then(() => this.#updateIndicatorPosition());
    }

    /**
     * Navigate to the next page
     */
    nextPage() {
        this.goToPage(this.currentPage + 1);
    }

    /**
     * Navigate to the previous page
     */
    previousPage() {
        this.goToPage(this.currentPage - 1);
    }

    /**
     * Navigate to the first page
     */
    firstPage() {
        this.goToPage(1);
    }

    /**
     * Navigate to the last page
     */
    lastPage() {
        this.goToPage(this.totalPages);
    }

    getPageRange(): (number | "ellipsis")[] {
        return this.pageRange;
    }

    /**
     * Change the page size
     */
    setPageSize(size: number) {
        if (size === this.pageSize) return;

        const previousPage = this.currentPage;
        const oldPageSize = this.pageSize;

        // Calculate the first item of the current page with old page size
        const currentItemStart = (this.currentPage - 1) * oldPageSize;

        // Update page size
        this.pageSize = size;

        // Recalculate current page based on current item position with new page size
        this.currentPage = Math.floor(currentItemStart / this.pageSize) + 1;

        this.#dispatchChangeEvent(previousPage);
    }

    #calculatePagination() {
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);

        // Ensure current page is within bounds
        if (this.currentPage > this.totalPages) {
            this.currentPage = Math.max(1, this.totalPages);
        }

        this.pageRange = this.#generatePageRange();
    }

    /**
     * Generate the page range array for display with consistent element count
     * Made public for testing purposes
     */
    #generatePageRange(): (number | "ellipsis")[] {
        const delta = this.siblingCount;

        // If we have few pages, show all pages (but pad to maintain consistency)
        if (this.totalPages <= 2 * delta + 5) {
            const range: (number | "ellipsis")[] = [];
            for (let i = 1; i <= this.totalPages; i++) {
                range.push(i);
            }
            return range;
        }

        // Target layout with consistent element count: [1] [ellipsis?] [siblings around current] [ellipsis?] [last]
        // Maximum elements: 1 + 1 + (2*delta+1) + 1 + 1 = 2*delta + 5 (e.g., 7 for delta=1, 9 for delta=2)
        const maxElements = 2 * delta + 5;
        const range: (number | "ellipsis")[] = [];

        // Always start with page 1
        range.push(1);

        // Calculate the core window around current page
        let startPage = Math.max(this.currentPage - delta, 1);
        let endPage = Math.min(this.currentPage + delta, this.totalPages);

        // Determine if we need ellipsis
        const needLeftEllipsis = startPage > 2;
        const needRightEllipsis = endPage < this.totalPages - 1;

        // Calculate current elements that would be used
        let currentElements = 1; // First page
        if (needLeftEllipsis) currentElements += 1; // Left ellipsis
        if (needRightEllipsis) currentElements += 1; // Right ellipsis
        currentElements += 1; // Last page

        // Count middle pages (excluding first and last)
        let middlePages = 0;
        for (let page = startPage; page <= endPage; page++) {
            if (page !== 1 && page !== this.totalPages) {
                middlePages++;
            }
        }
        currentElements += middlePages;

        // Expand the middle section to fill up to maxElements
        const availableSlots = maxElements - currentElements;

        // Distribute additional slots to expand the visible page range
        if (availableSlots > 0) {
            let expandLeft = Math.floor(availableSlots / 2);
            let expandRight = availableSlots - expandLeft;

            // Expand left
            while (expandLeft > 0 && startPage > 2) {
                startPage--;
                expandLeft--;
            }

            // If we couldn't expand left enough, add to right
            expandRight += expandLeft;

            // Expand right
            while (expandRight > 0 && endPage < this.totalPages - 1) {
                endPage++;
                expandRight--;
            }

            // If we couldn't expand right enough, try expanding left more
            while (expandRight > 0 && startPage > 2) {
                startPage--;
                expandRight--;
            }
        }

        // Re-check ellipsis needs after expansion
        const finalNeedLeftEllipsis = startPage > 2;
        const finalNeedRightEllipsis = endPage < this.totalPages - 1;

        // Build the final range
        if (finalNeedLeftEllipsis) {
            range.push("ellipsis");
        }

        // Add middle pages (excluding first and last page)
        for (let page = startPage; page <= endPage; page++) {
            if (page !== 1 && page !== this.totalPages) {
                range.push(page);
            }
        }

        if (finalNeedRightEllipsis) {
            range.push("ellipsis");
        }

        // Always add last page (if different from first)
        if (this.totalPages > 1) {
            range.push(this.totalPages);
        }

        return range;
    }

    #renderPageSizeSelector() {
        return html`
            <div class="page-size-selector">
                <label for="page-size">${this.labels.itemsPerPage}:</label>
                <mjo-select
                    id="page-size"
                    .value=${this.pageSize.toString()}
                    @change=${this.#handlePageSizeChange}
                    ?disabled=${this.disabled}
                    size=${this.size}
                >
                    ${this.pageSizeOptions.map((option) => html`<mjo-option value=${option}>${option}</mjo-option>`)}
                </mjo-select>
            </div>
        `;
    }

    #handlePageClick(event: CustomEvent) {
        const page = event.detail.page;
        this.#dispatchPageClickEvent(page, event.detail.originalEvent);
        this.goToPage(page);
    }

    #handleNavigation(event: CustomEvent) {
        const { direction, originalEvent } = event.detail;

        let targetPage = this.currentPage;

        switch (direction) {
            case "first":
                targetPage = 1;
                break;
            case "previous":
                targetPage = this.currentPage - 1;
                break;
            case "next":
                targetPage = this.currentPage + 1;
                break;
            case "last":
                targetPage = this.totalPages;
                break;
        }

        this.#dispatchNavigationEvent(direction, targetPage, originalEvent);
        this.goToPage(targetPage);
    }

    #handlePageSizeChange(event: Event) {
        const target = event.target as MjoSelect;
        this.setPageSize(parseInt(target.value, 10));
    }

    #dispatchChangeEvent(previousPage: number) {
        const changeEvent: MjoPaginationChangeEvent = new CustomEvent("mjo-pagination:change", {
            detail: {
                element: this,
                page: this.currentPage,
                previousPage,
                totalPages: this.totalPages,
                pageSize: this.pageSize,
                totalItems: this.totalItems,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(changeEvent);
    }

    #dispatchPageClickEvent(page: number, originalEvent: MouseEvent | KeyboardEvent) {
        const pageClickEvent: MjoPaginationPageClickEvent = new CustomEvent("mjo-pagination:page-click", {
            detail: {
                element: this,
                page,
                originalEvent,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(pageClickEvent);
    }

    #dispatchNavigationEvent(direction: "previous" | "next" | "first" | "last", page: number, originalEvent: MouseEvent | KeyboardEvent) {
        const navigationEvent: MjoPaginationNavigationEvent = new CustomEvent("mjo-pagination:navigation", {
            detail: {
                element: this,
                direction,
                page,
                originalEvent,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(navigationEvent);
    }

    #updateIndicatorPosition() {
        // Wait for the next animation frame to ensure elements are rendered
        requestAnimationFrame(() => {
            const container = this.shadowRoot?.querySelector(".pagination-container") as HTMLElement;
            const indicator = this.shadowRoot?.querySelector(".pagination-indicator") as HTMLElement;
            const activePageItem = this.shadowRoot?.querySelector("pagination-page-item[active]") as HTMLElement;

            if (!container || !indicator || !activePageItem) {
                return;
            }

            // Calculate the position and width of the active page item
            const containerRect = container.getBoundingClientRect();
            const activeRect = activePageItem.getBoundingClientRect();
            const top = activePageItem.offsetTop;

            const offsetX = activeRect.left - containerRect.left;
            const width = activeRect.width;

            // Update CSS custom properties for smooth animation
            indicator.style.setProperty("--mjoint-pagination-indicator-offset", `${offsetX}px`);
            indicator.style.setProperty("--mjoint-pagination-indicator-top", `${top}px`);
            indicator.style.setProperty("--mjoint-pagination-indicator-width", `${width}px`);
        });
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .pagination {
                display: flex;
                flex-direction: column;
                gap: var(--mjo-pagination-gap, 1em);
                align-items: center;
            }

            .pagination-container {
                display: flex;
                align-items: center;
                gap: var(--mjo-pagination-items-gap, 0.25em);
                position: relative;
                padding: var(--mjo-pagination-container-padding, 0.25em);
                background-color: var(--mjo-pagination-background-color, transparent);
                border-radius: var(--mjo-pagination-container-border-radius, var(--mjo-radius, 5px));
                border: var(--mjo-pagination-container-border, none);
            }

            .pagination-indicator {
                position: absolute;
                top: var(--mjoint-pagination-indicator-top, 0);
                left: 0;
                /* opacity: 0; */
                background-color: var(--mjo-pagination-primary-color-alpha, var(--mjo-primary-color, #1d7fdb33));
                border-radius: var(--mjo-pagination-indicator-border-radius, var(--mjo-radius, 5px));
                transition: all var(--mjo-pagination-animation-duration, 0.3s) var(--mjo-pagination-animation-timing, ease-out);
                z-index: -1;
                pointer-events: none;
                transform: translateX(var(--mjoint-pagination-indicator-offset, 0));
                width: var(--mjoint-pagination-indicator-width, 2.5em);
                aspect-ratio: 1 / 1;
            }

            .pagination-container[data-color="secondary"] .pagination-indicator {
                background-color: var(--mjo-pagination-secondary-color-alpha, var(--mjo-secondary-color-alpha1, #cc3d7433));
            }

            .pagination.disabled {
                opacity: 0.6;
                pointer-events: none;
            }

            .page-size-selector {
                display: flex;
                align-items: center;
                gap: var(--mjo-pagination-page-size-gap, 0.5em);
                font-family: var(--mjo-pagination-font-family, inherit);
                font-size: var(--mjo-pagination-page-size-font-size, 0.9em);
                color: var(--mjo-pagination-page-size-color, var(--mjo-foreground-color, #222222));
            }

            .page-size-selector label {
                white-space: nowrap;
            }

            .page-size-selector select {
                background-color: var(--mjo-pagination-select-background-color, var(--mjo-background-color-high, #ffffff));
                border: solid 1px var(--mjo-pagination-select-border-color, var(--mjo-border-color, #dddddd));
                border-radius: var(--mjo-pagination-select-border-radius, var(--mjo-radius, 5px));
                color: var(--mjo-pagination-select-color, var(--mjo-foreground-color, #222222));
                font-family: inherit;
                font-size: inherit;
                padding: var(--mjo-pagination-select-padding, 0.25em 0.5em);
            }

            .page-size-selector select:focus {
                outline: 2px solid var(--mjo-pagination-primary-color, var(--mjo-primary-color, #1d7fdb));
                outline-offset: 2px;
            }

            .pagination-container[data-color="secondary"] .page-size-selector select:focus {
                outline-color: var(--mjo-pagination-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }

            /* Responsive design */
            @media (max-width: 640px) {
                .pagination-container {
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .page-size-selector {
                    flex-direction: column;
                    text-align: center;
                }
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .pagination-container {
                    border: 2px solid currentColor;
                }

                .pagination-indicator {
                    border: 2px solid currentColor;
                }
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .pagination-indicator {
                    transition: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-pagination": MjoPagination;
    }

    interface HTMLElementEventMap {
        "mjo-pagination:change": MjoPaginationChangeEvent;
        "mjo-pagination:page-click": MjoPaginationPageClickEvent;
        "mjo-pagination:navigation": MjoPaginationNavigationEvent;
    }
}
