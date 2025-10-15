# mjo-pagination

Comprehensive pagination component with animated page indicator and full accessibility support.

The `mjo-pagination` component provides a complete pagination solution with an animated page indicator, navigation buttons, intelligent page range calculation with ellipsis, optional page size selector, and comprehensive internationalization support. It includes full ARIA support and keyboard navigation for accessibility.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Paginating large datasets in tables or lists
- Navigating through multi-page content
- Providing users with clear navigation between pages with visual feedback
- Implementing server-side or client-side pagination
- Creating paginated galleries or product listings

## Import

```typescript
import "mjo-litui/mjo-pagination";
```

## Properties

| Property               | Type                 | Description                                                                                                                                         | Default             | Required |
| ---------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| `totalItems`           | `number`             | Total number of items to paginate                                                                                                                   | `0`                 | No       |
| `pageSize`             | `number`             | Number of items per page                                                                                                                            | `10`                | No       |
| `currentPage`          | `number`             | Current active page (1-indexed)                                                                                                                     | `1`                 | No       |
| `siblingCount`         | `number`             | Number of page siblings to show on each side of the current page                                                                                    | `1`                 | No       |
| `hideFirstLast`        | `boolean`            | Hide first and last navigation buttons                                                                                                              | `false`             | No       |
| `hidePrevNext`         | `boolean`            | Hide previous and next navigation buttons                                                                                                           | `false`             | No       |
| `showPageSizeSelector` | `boolean`            | Show page size selector dropdown                                                                                                                    | `false`             | No       |
| `pageSizeOptions`      | `number[]`           | Available options for page size selector                                                                                                            | `[10, 25, 50, 100]` | No       |
| `size`                 | `MjoPaginationSize`  | Size of the pagination component (`"small"`, `"medium"`, `"large"`)                                                                                 | `"medium"`          | No       |
| `color`                | `MjoPaginationColor` | Color scheme (`"primary"`, `"secondary"`)                                                                                                           | `"primary"`         | No       |
| `disabled`             | `boolean`            | Disable all pagination interactions                                                                                                                 | `false`             | No       |
| `locale`               | `SupportedLocale`    | Language locale for labels (`"en"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"ja"`, `"ko"`, `"zh"`, `"ar"`, `"ru"`, `"nl"`, `"pl"`, `"sv"`, `"tr"`) | `"en"`              | No       |

## Public Methods

| Method         | Parameters     | Description                                                                                   | Return                     |
| -------------- | -------------- | --------------------------------------------------------------------------------------------- | -------------------------- |
| `goToPage`     | `page: number` | Navigate to a specific page number                                                            | `void`                     |
| `nextPage`     | -              | Navigate to the next page                                                                     | `void`                     |
| `previousPage` | -              | Navigate to the previous page                                                                 | `void`                     |
| `firstPage`    | -              | Navigate to the first page                                                                    | `void`                     |
| `lastPage`     | -              | Navigate to the last page                                                                     | `void`                     |
| `setPageSize`  | `size: number` | Change the page size and recalculate the current page to maintain the position in the dataset | `void`                     |
| `getPageRange` | -              | Get the current page range array with numbers and ellipsis                                    | `(number \| "ellipsis")[]` |

## Events

| Event                       | Description                                                          | Type                           | Detail                                                                                                                                       |
| --------------------------- | -------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `mjo-pagination:change`     | Fired when the current page or page size changes                     | `MjoPaginationChangeEvent`     | `{ element: MjoPagination, page: number, previousPage: number, totalPages: number, pageSize: number, totalItems: number }`                   |
| `mjo-pagination:page-click` | Fired when a specific page number is clicked                         | `MjoPaginationPageClickEvent`  | `{ element: MjoPagination, page: number, originalEvent: MouseEvent \| KeyboardEvent }`                                                       |
| `mjo-pagination:navigation` | Fired when navigation buttons (first, previous, next, last) are used | `MjoPaginationNavigationEvent` | `{ element: MjoPagination, direction: "previous" \| "next" \| "first" \| "last", page: number, originalEvent: MouseEvent \| KeyboardEvent }` |

## CSS Variables

| Variable                                      | Description                                             | Default                                         |
| --------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------- |
| `--mjo-pagination-gap`                        | Gap between pagination container and page size selector | `1em`                                           |
| `--mjo-pagination-items-gap`                  | Gap between pagination items                            | `0.25em`                                        |
| `--mjo-pagination-container-padding`          | Padding for pagination container                        | `0.25em`                                        |
| `--mjo-pagination-background-color`           | Background color for pagination container               | `transparent`                                   |
| `--mjo-pagination-container-border-radius`    | Border radius for pagination container                  | `var(--mjo-radius-medium, 5px)`                 |
| `--mjo-pagination-container-border`           | Border for pagination container                         | `none`                                          |
| `--mjo-pagination-primary-color-alpha`        | Background color for active page indicator (primary)    | `var(--mjo-primary-color-alpha1, #1d7fdb33)`    |
| `--mjo-pagination-secondary-color-alpha`      | Background color for active page indicator (secondary)  | `var(--mjo-secondary-color-alpha1, #cc3d7433)`  |
| `--mjo-pagination-animation-duration`         | Duration of the page indicator animation                | `0.3s`                                          |
| `--mjo-pagination-animation-timing`           | Timing function for page indicator animation            | `ease-out`                                      |
| `--mjo-pagination-indicator-border-radius`    | Border radius for page indicator                        | `var(--mjo-radius-medium, 5px)`                 |
| `--mjo-pagination-font-family`                | Font family for pagination text                         | `inherit`                                       |
| `--mjo-pagination-page-size-gap`              | Gap between page size label and selector                | `0.5em`                                         |
| `--mjo-pagination-page-size-font-size`        | Font size for page size selector                        | `0.9em`                                         |
| `--mjo-pagination-page-size-color`            | Text color for page size selector                       | `var(--mjo-foreground-color, #222222)`          |
| `--mjo-pagination-select-background-color`    | Background color for page size select                   | `var(--mjo-background-color-high, #ffffff)`     |
| `--mjo-pagination-select-border-color`        | Border color for page size select                       | `var(--mjo-border-color, #dddddd)`              |
| `--mjo-pagination-select-border-radius`       | Border radius for page size select                      | `var(--mjo-radius-medium, 5px)`                 |
| `--mjo-pagination-select-color`               | Text color for page size select                         | `var(--mjo-foreground-color, #222222)`          |
| `--mjo-pagination-select-padding`             | Padding for page size select                            | `0.25em 0.5em`                                  |
| `--mjo-pagination-primary-color`              | Primary color for focus and hover states                | `var(--mjo-primary-color, #1aa8ed)`             |
| `--mjo-pagination-secondary-color`            | Secondary color for focus and hover states              | `var(--mjo-secondary-color, #7dc717)`           |
| `--mjo-pagination-border-radius`              | Border radius for page and navigation buttons           | `var(--mjo-radius-medium, 5px)`                 |
| `--mjo-pagination-color`                      | Text color for page buttons                             | `var(--mjo-foreground-color, #222222)`          |
| `--mjo-pagination-font-size`                  | Font size for page buttons                              | `1em`                                           |
| `--mjo-pagination-font-weight`                | Font weight for page buttons                            | `normal`                                        |
| `--mjo-pagination-item-width`                 | Width of page buttons                                   | `2em`                                           |
| `--mjo-pagination-small-min-width`            | Minimum width for small size buttons                    | `2em`                                           |
| `--mjo-pagination-hover-background-color`     | Background color for page buttons on hover              | `var(--mjo-primary-color-alpha1, #f5f5f5)`      |
| `--mjo-pagination-primary-foreground-color`   | Text color for active page (primary)                    | `var(--mjo-primary-foreground-color, white)`    |
| `--mjo-pagination-secondary-foreground-color` | Text color for active page (secondary)                  | `var(--mjo-secondary-foreground-color, white)`  |
| `--mjo-pagination-secondary-color-alpha1`     | Background color for hover state (secondary)            | `var(--mjo-secondary-color-alpha1, #ffeef0)`    |
| `--mjo-pagination-active-font-weight`         | Font weight for active page button                      | `600`                                           |
| `--mjo-pagination-primary-color-hover`        | Border color for active page on hover (primary)         | `var(--mjo-primary-color-hover, #4e9be4)`       |
| `--mjo-pagination-secondary-color-hover`      | Border color for active page on hover (secondary)       | `var(--mjo-secondary-color-hover, #d86490)`     |
| `--mjo-pagination-disabled-color`             | Text color for disabled buttons                         | `var(--mjo-disabled-foreground-color, #aaaaaa)` |
| `--mjo-pagination-small-font-size`            | Font size for small size                                | `0.8em`                                         |
| `--mjo-pagination-large-font-size`            | Font size for large size                                | `1.2em`                                         |
| `--mjo-pagination-nav-color`                  | Text color for navigation buttons                       | `var(--mjo-foreground-color, #222222)`          |
| `--mjo-pagination-nav-min-width`              | Minimum width for navigation buttons                    | `1.5em`                                         |
| `--mjo-pagination-nav-padding`                | Padding for navigation buttons                          | `0.5em`                                         |
| `--mjo-pagination-nav-disabled-color`         | Text color for disabled navigation buttons              | `var(--mjo-disabled-foreground-color, #aaaaaa)` |
| `--mjo-pagination-ellipsis-color`             | Text color for ellipsis                                 | `var(--mjo-foreground-color-medium, #666666)`   |
| `--mjo-pagination-ellipsis-font-weight`       | Font weight for ellipsis                                | `normal`                                        |

## CSS Parts

| Part          | Description                                      | Element                                          |
| ------------- | ------------------------------------------------ | ------------------------------------------------ |
| `container`   | The main pagination navigation container         | `<nav>`                                          |
| `wrapper`     | The pagination container wrapper with items      | `<div class="pagination-container">`             |
| `indicator`   | The animated page indicator element              | `<div class="pagination-indicator">`             |
| `nav-button`  | Navigation buttons (first, previous, next, last) | `<button>` (from `mjoint-pagination-nav-button`) |
| `page-button` | Individual page number buttons                   | `<button>` (from `mjoint-pagination-page-item`)  |
| `ellipsis`    | Ellipsis elements for truncated page ranges      | `<span>` (from `mjoint-pagination-ellipsis`)     |

## Accessibility

The `mjo-pagination` component is built with accessibility as a priority:

### Best Practices

- Use descriptive labels for navigation buttons via the `locale` property
- Ensure sufficient color contrast for all states
- Test keyboard navigation across all page buttons
- Provide alternative navigation methods for users with disabilities

### ARIA Support

- **Navigation role**: The main container has `role="navigation"` and `aria-label="Pagination Navigation"`
- **Page buttons**: Each page button has `aria-current="page"` when active and descriptive `aria-label` attributes
- **Navigation buttons**: All navigation buttons include descriptive `aria-label` attributes in the current locale
- **Ellipsis**: Marked with `aria-hidden="true"` and `role="presentation"` as they are decorative

### Keyboard Interactions

- **Tab**: Move focus between pagination buttons and page size selector
- **Enter/Space**: Activate the focused page or navigation button
- **Arrow Keys**: Natural focus movement between interactive elements

### Visual Feedback

- Focus states are clearly visible with outline indicators
- Active page is highlighted with background color and font weight
- Disabled states have reduced opacity and cannot be activated
- Hover states provide visual feedback on interactive elements

### Additional Features

- **Reduced Motion Support**: The animated page indicator respects `prefers-reduced-motion: reduce`
- **High Contrast Mode**: Border widths and outline widths increase in high contrast mode
- **Screen Reader Support**: All interactive elements have appropriate labels and ARIA attributes
- **Internationalization**: Full support for 15 languages through the `locale` property

## Usage Examples

### Basic Pagination

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("my-paginated-list")
export class MyPaginatedList extends LitElement {
    @state() private totalItems = 100;
    @state() private currentPage = 1;
    @state() private pageSize = 10;

    render() {
        return html`
            <div>
                <!-- Your paginated content here -->
                <mjo-pagination
                    .totalItems=${this.totalItems}
                    .pageSize=${this.pageSize}
                    .currentPage=${this.currentPage}
                    @mjo-pagination:change=${this._handlePageChange}
                ></mjo-pagination>
            </div>
        `;
    }

    private _handlePageChange(e: CustomEvent) {
        this.currentPage = e.detail.page;
        this.pageSize = e.detail.pageSize;
        // Fetch new data based on currentPage and pageSize
    }
}
```

### With Page Size Selector

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("my-table-with-pagination")
export class MyTableWithPagination extends LitElement {
    @state() private totalItems = 250;
    @state() private currentPage = 1;
    @state() private pageSize = 25;

    render() {
        return html`
            <div>
                <!-- Your table here -->
                <mjo-pagination
                    .totalItems=${this.totalItems}
                    .pageSize=${this.pageSize}
                    .currentPage=${this.currentPage}
                    .pageSizeOptions=${[10, 25, 50, 100]}
                    showPageSizeSelector
                    @mjo-pagination:change=${this._handlePageChange}
                ></mjo-pagination>
            </div>
        `;
    }

    private _handlePageChange(e: CustomEvent) {
        const { page, pageSize } = e.detail;
        this.currentPage = page;
        this.pageSize = pageSize;
        // Reload data with new pagination settings
    }
}
```

### Programmatic Navigation

```typescript
import { LitElement, html } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { MjoPagination } from "mjo-litui/mjo-pagination";
import "mjo-litui/mjo-pagination";

@customElement("my-gallery")
export class MyGallery extends LitElement {
    @query("mjo-pagination") private pagination!: MjoPagination;
    @state() private totalItems = 60;

    render() {
        return html`
            <div>
                <button @click=${this._goToFirstPage}>First</button>
                <button @click=${this._goToPreviousPage}>Previous</button>
                <button @click=${this._goToNextPage}>Next</button>
                <button @click=${this._goToLastPage}>Last</button>

                <!-- Your gallery content -->

                <mjo-pagination .totalItems=${this.totalItems} .pageSize=${12} hideFirstLast hidePrevNext></mjo-pagination>
            </div>
        `;
    }

    private _goToFirstPage() {
        this.pagination.firstPage();
    }

    private _goToPreviousPage() {
        this.pagination.previousPage();
    }

    private _goToNextPage() {
        this.pagination.nextPage();
    }

    private _goToLastPage() {
        this.pagination.lastPage();
    }
}
```

### Event Handling

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("my-data-view")
export class MyDataView extends LitElement {
    @state() private totalItems = 500;

    render() {
        return html`
            <mjo-pagination
                .totalItems=${this.totalItems}
                .pageSize=${20}
                @mjo-pagination:page-click=${this._handlePageClick}
                @mjo-pagination:navigation=${this._handleNavigation}
                @mjo-pagination:change=${this._handleChange}
            ></mjo-pagination>
        `;
    }

    private _handlePageClick(e: CustomEvent) {
        console.log(`Page ${e.detail.page} clicked`);
        // Track analytics or perform specific action on page click
    }

    private _handleNavigation(e: CustomEvent) {
        const { direction, page } = e.detail;
        console.log(`Navigated ${direction} to page ${page}`);
        // Track navigation patterns
    }

    private _handleChange(e: CustomEvent) {
        const { page, previousPage, pageSize, totalPages } = e.detail;
        console.log(`Changed from page ${previousPage} to ${page}`);
        // Update URL, fetch data, etc.
    }
}
```

### Customizing with CSS Variables and Parts

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("my-custom-pagination")
export class MyCustomPagination extends LitElement {
    static styles = css`
        mjo-pagination {
            --mjo-pagination-primary-color: #ff6b6b;
            --mjo-pagination-primary-color-alpha: #ff6b6b33;
            --mjo-pagination-border-radius: 8px;
            --mjo-pagination-font-family: "Arial", sans-serif;
            --mjo-pagination-animation-duration: 0.5s;
        }

        mjo-pagination::part(container) {
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 12px;
        }

        mjo-pagination::part(page-button) {
            font-weight: 600;
        }

        mjo-pagination::part(nav-button) {
            color: #495057;
        }

        mjo-pagination::part(indicator) {
            box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
        }
    `;

    render() {
        return html` <mjo-pagination .totalItems=${100} .pageSize=${10}></mjo-pagination> `;
    }
}
```

### Internationalization

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("my-localized-pagination")
export class MyLocalizedPagination extends LitElement {
    @state() private userLocale: "en" | "es" | "fr" | "de" = "es";

    render() {
        return html`
            <div>
                <select @change=${this._handleLocaleChange}>
                    <option value="en">English</option>
                    <option value="es" ?selected=${this.userLocale === "es"}>Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                </select>

                <mjo-pagination .totalItems=${100} .pageSize=${10} .locale=${this.userLocale} showPageSizeSelector></mjo-pagination>
            </div>
        `;
    }

    private _handleLocaleChange(e: Event) {
        const select = e.target as HTMLSelectElement;
        this.userLocale = select.value as "en" | "es" | "fr" | "de";
    }
}
```

## Additional Notes

### Page Range Algorithm

The component uses an intelligent page range algorithm that:

- Maintains a consistent element count in the pagination bar
- Shows siblings around the current page based on `siblingCount`
- Automatically adds ellipsis when pages are truncated
- Expands visible page range when possible to fill available space
- Always shows first and last page (unless there's only one page)

### Page Size Changes

When changing the page size using `setPageSize()`, the component intelligently recalculates the current page to maintain the user's position in the dataset. For example, if you're viewing items 21-30 (page 3 with pageSize=10) and change to pageSize=20, you'll be on page 2 showing items 21-40.

### Performance Considerations

- The animated page indicator uses CSS transforms for optimal performance
- Component respects `prefers-reduced-motion` for accessibility
- Page range calculation is optimized to minimize re-renders
- Navigation is debounced to prevent rapid state changes

### Browser Support

The component uses modern CSS features including:

- CSS custom properties (CSS variables)
- CSS Grid and Flexbox
- CSS transitions and transforms
- `aspect-ratio` property

For older browsers, consider using appropriate polyfills or fallbacks.
