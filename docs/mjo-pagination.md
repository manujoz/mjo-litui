# mjo-pagination

A comprehensive pagination component with animated page indicator, accessibility support, internationalization, and customizable styling options.

## Features

-   **Animated Page Indicator**: Visual indicator that smoothly moves to show current page
-   **Complete Navigation**: First, previous, next, last navigation buttons with icons
-   **Page Range Calculation**: Intelligent ellipsis system for large page counts
-   **Page Size Selection**: Built-in page size selector using mjo-select
-   **Accessibility**: Full ARIA support and keyboard navigation
-   **Internationalization**: Multi-language support through locales system
-   **Theming**: Comprehensive CSS custom properties for styling
-   **Size Variants**: Small, medium, large sizes
-   **Color Variants**: Primary and secondary color schemes
-   **Responsive**: Adapts to different screen sizes

## Usage

### Basic HTML

```html
<mjo-pagination current-page="3" total-pages="10" page-size="10" total-items="100"> </mjo-pagination>
```

### With Lit Element

````ts
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import 'mjo-litui/mjo-pagination';

@customElement('example-pagination')
export class ExamplePagination extends LitElement {
  @state() private currentPage = 1;
  @state() private totalPages = 20;
  @state() private pageSize = 10;
  @state() private totalItems = 200;

  render() {
    return html`
      <mjo-pagination
        .currentPage=${this.currentPage}
        .totalPages=${this.totalPages}
## Examples

### Basic Pagination

```ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import 'mjo-litui/mjo-pagination';

@customElement('example-basic-pagination')
export class ExampleBasicPagination extends LitElement {
  render() {
    return html`
      <h3>Basic Pagination</h3>
      <mjo-pagination
        currentPage="5"
        totalPages="10"
        pageSize="10"
        totalItems="100"
      ></mjo-pagination>
    `;
  }
}
````

### With All Navigation Options

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("example-full-navigation")
export class ExampleFullNavigation extends LitElement {
    render() {
        return html`
            <h3>Full Navigation</h3>
            <mjo-pagination
                currentPage="15"
                totalPages="50"
                pageSize="20"
                totalItems="1000"
                showFirstLast
                showPrevNext
                showPageSizeSelector
                .pageSizeOptions=${[10, 20, 50, 100]}
            ></mjo-pagination>
        `;
    }
}
```

### Size and Color Variants

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("example-pagination-variants")
export class ExamplePaginationVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <h4>Small Primary</h4>
                    <mjo-pagination size="small" color="primary" currentPage="2" totalPages="5" showPrevNext></mjo-pagination>
                </div>

                <div>
                    <h4>Medium Secondary</h4>
                    <mjo-pagination size="medium" color="secondary" currentPage="2" totalPages="5" showPrevNext></mjo-pagination>
                </div>

                <div>
                    <h4>Large Primary</h4>
                    <mjo-pagination size="large" color="primary" currentPage="2" totalPages="5" showPrevNext></mjo-pagination>
                </div>
            </div>
        `;
    }
}
```

### Internationalization

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("example-pagination-i18n")
export class ExamplePaginationI18n extends LitElement {
    @state() private locale: "en" | "es" | "fr" | "de" = "en";

    render() {
        return html`
            <div>
                <label>
                    Language:
                    <select @change=${this.handleLocaleChange}>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                    </select>
                </label>

                <mjo-pagination .locale=${this.locale} currentPage="5" totalPages="25" showFirstLast showPrevNext showPageSizeSelector></mjo-pagination>
            </div>
        `;
    }

    private handleLocaleChange(e: Event) {
        this.locale = (e.target as HTMLSelectElement).value as any;
    }
}
```

### Advanced Usage with Event Handling

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("example-pagination-advanced")
export class ExamplePaginationAdvanced extends LitElement {
    @state() private currentPage = 1;
    @state() private totalPages = 20;
    @state() private pageSize = 10;
    @state() private totalItems = 200;
    @state() private loading = false;

    render() {
        return html`
            <div>
                <mjo-pagination
                    .currentPage=${this.currentPage}
                    .totalPages=${this.totalPages}
                    .pageSize=${this.pageSize}
                    .totalItems=${this.totalItems}
                    .disabled=${this.loading}
                    showFirstLast
                    showPrevNext
                    showPageSizeSelector
                    maxVisiblePages="7"
                    @mjo-pagination:change=${this.handlePageChange}
                    @mjo-pagination:page-click=${this.handlePageClick}
                    @mjo-pagination:navigation=${this.handleNavigation}
                ></mjo-pagination>

                ${this.loading ? html`<p>Loading...</p>` : ""}
            </div>
        `;
    }

    private async handlePageChange(e: CustomEvent) {
        const { page, previousPage, pageSize } = e.detail;
        this.loading = true;

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            this.currentPage = page;
            this.pageSize = pageSize;

            // Recalculate total pages if page size changed
            this.totalPages = Math.ceil(this.totalItems / pageSize);
        } finally {
            this.loading = false;
        }
    }

    private handlePageClick(e: CustomEvent) {
        const { page, originalEvent } = e.detail;
        console.log(`Direct click on page ${page}`, originalEvent);
    }

    private handleNavigation(e: CustomEvent) {
        const { direction, targetPage } = e.detail;
        console.log(`Navigation: ${direction} to page ${targetPage}`);
    }
}
```

## Attributes / Properties

| Name                   | Type                                 | Default             | Description                            |
| ---------------------- | ------------------------------------ | ------------------- | -------------------------------------- |
| `currentPage`          | `number`                             | `1`                 | Current active page (1-based)          |
| `totalPages`           | `number`                             | `1`                 | Total number of pages                  |
| `pageSize`             | `number`                             | `10`                | Number of items per page               |
| `totalItems`           | `number`                             | `0`                 | Total number of items across all pages |
| `maxVisiblePages`      | `number`                             | `7`                 | Maximum number of page buttons to show |
| `showFirstLast`        | `boolean`                            | `false`             | Show first/last navigation buttons     |
| `showPrevNext`         | `boolean`                            | `true`              | Show previous/next navigation buttons  |
| `showPageSizeSelector` | `boolean`                            | `false`             | Show page size selector dropdown       |
| `pageSizeOptions`      | `number[]`                           | `[10, 20, 50, 100]` | Available page size options            |
| `disabled`             | `boolean`                            | `false`             | Disable all pagination interactions    |
| `size`                 | `"small"` \| `"medium"` \| `"large"` | `"medium"`          | Component size variant                 |
| `color`                | `"primary"` \| `"secondary"`         | `"primary"`         | Color scheme variant                   |
| `locale`               | `SupportedLocale`                    | `"en"`              | Language locale for labels             |

## Methods

| Method                     | Parameters                                        | Returns | Description                            |
| -------------------------- | ------------------------------------------------- | ------- | -------------------------------------- |
| `goToPage(page, options?)` | `page: number`, `options?: { animate?: boolean }` | `void`  | Navigate to specific page              |
| `previousPage()`           | -                                                 | `void`  | Navigate to previous page              |
| `nextPage()`               | -                                                 | `void`  | Navigate to next page                  |
| `firstPage()`              | -                                                 | `void`  | Navigate to first page                 |
| `lastPage()`               | -                                                 | `void`  | Navigate to last page                  |
| `setPageSize(size)`        | `size: number`                                    | `void`  | Update page size and recalculate pages |

## Events

| Event                       | Detail                                                              | Description                                  |
| --------------------------- | ------------------------------------------------------------------- | -------------------------------------------- |
| `mjo-pagination:change`     | `{ element, page, previousPage, totalPages, pageSize, totalItems }` | Fired when page or page size changes         |
| `mjo-pagination:page-click` | `{ page, originalEvent }`                                           | Fired when a specific page number is clicked |
| `mjo-pagination:navigation` | `{ direction, targetPage, originalEvent }`                          | Fired when navigation buttons are used       |

### Event Details

**mjo-pagination:change**

```typescript
{
    element: MjoPagination; // Reference to the component
    page: number; // New current page
    previousPage: number; // Previous page number
    totalPages: number; // Total number of pages
    pageSize: number; // Current page size
    totalItems: number; // Total items count
}
```

**mjo-pagination:page-click**

```typescript
{
    page: number; // Clicked page number
    originalEvent: Event; // Original click event
}
```

**mjo-pagination:navigation**

```typescript
{
    direction: "first" | "previous" | "next" | "last"; // Navigation direction
    targetPage: number; // Target page number
    originalEvent: Event; // Original click event
}
```

## CSS Custom Properties

### Layout and Spacing

| Property                                   | Default                  | Description                                        |
| ------------------------------------------ | ------------------------ | -------------------------------------------------- |
| `--mjo-pagination-gap`                     | `1em`                    | Gap between main pagination and page size selector |
| `--mjo-pagination-items-gap`               | `0.25em`                 | Gap between pagination items                       |
| `--mjo-pagination-container-padding`       | `0.25em`                 | Padding around the pagination container            |
| `--mjo-pagination-container-border-radius` | `var(--mjo-radius, 5px)` | Border radius of the container                     |
| `--mjo-pagination-container-border`        | `none`                   | Border around the container                        |
| `--mjo-pagination-background-color`        | `transparent`            | Background color of the container                  |

### Typography

| Property                              | Default   | Description                 |
| ------------------------------------- | --------- | --------------------------- |
| `--mjo-pagination-font-family`        | `inherit` | Font family                 |
| `--mjo-pagination-font-size`          | `1em`     | Base font size              |
| `--mjo-pagination-font-weight`        | `normal`  | Font weight                 |
| `--mjo-pagination-active-font-weight` | `600`     | Font weight for active page |

### Size Variants

| Property                           | Default | Description                   |
| ---------------------------------- | ------- | ----------------------------- |
| `--mjo-pagination-small-font-size` | `0.8em` | Font size for small variant   |
| `--mjo-pagination-large-font-size` | `1.2em` | Font size for large variant   |
| `--mjo-pagination-item-width`      | `2.5em` | Minimum width of page buttons |
| `--mjo-pagination-padding`         | `0.5em` | Padding inside page buttons   |

### Colors

| Property                                      | Default                                         | Description                        |
| --------------------------------------------- | ----------------------------------------------- | ---------------------------------- |
| `--mjo-pagination-color`                      | `var(--mjo-foreground-color, #222222)`          | Default text color                 |
| `--mjo-pagination-primary-color`              | `var(--mjo-primary-color, #1d7fdb)`             | Primary theme color                |
| `--mjo-pagination-secondary-color`            | `var(--mjo-secondary-color, #cc3d74)`           | Secondary theme color              |
| `--mjo-pagination-primary-foreground-color`   | `var(--mjo-primary-foreground-color, white)`    | Text color on primary background   |
| `--mjo-pagination-secondary-foreground-color` | `var(--mjo-secondary-foreground-color, white)`  | Text color on secondary background |
| `--mjo-pagination-disabled-color`             | `var(--mjo-disabled-foreground-color, #aaaaaa)` | Color for disabled items           |

### Hover and Focus States

| Property                                  | Default                                     | Description               |
| ----------------------------------------- | ------------------------------------------- | ------------------------- |
| `--mjo-pagination-hover-background-color` | `var(--mjo-background-color-low, #f5f5f5)`  | Background color on hover |
| `--mjo-pagination-primary-color-hover`    | `var(--mjo-primary-color-hover, #4e9be4)`   | Primary color on hover    |
| `--mjo-pagination-secondary-color-hover`  | `var(--mjo-secondary-color-hover, #d86490)` | Secondary color on hover  |

### Animated Indicator

| Property                                   | Default                                        | Description                                    |
| ------------------------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| `--mjo-pagination-indicator-opacity`       | `0.8`                                          | Opacity of the sliding indicator               |
| `--mjo-pagination-indicator-border-radius` | `var(--mjo-radius, 5px)`                       | Border radius of the indicator                 |
| `--mjo-pagination-animation-duration`      | `0.3s`                                         | Duration of the sliding animation              |
| `--mjo-pagination-animation-timing`        | `ease-out`                                     | Timing function for animations                 |
| `--mjo-pagination-primary-color-alpha`     | `var(--mjo-primary-color-alpha1, #1d7fdb33)`   | Semi-transparent primary color for indicator   |
| `--mjo-pagination-secondary-color-alpha`   | `var(--mjo-secondary-color-alpha1, #cc3d7433)` | Semi-transparent secondary color for indicator |

### Ellipsis

| Property                                | Default                                       | Description             |
| --------------------------------------- | --------------------------------------------- | ----------------------- |
| `--mjo-pagination-ellipsis-color`       | `var(--mjo-foreground-color-medium, #666666)` | Color of ellipsis       |
| `--mjo-pagination-ellipsis-font-weight` | `normal`                                      | Font weight of ellipsis |

### Page Size Selector

| Property                                   | Default                                     | Description                                        |
| ------------------------------------------ | ------------------------------------------- | -------------------------------------------------- |
| `--mjo-pagination-page-size-gap`           | `0.5em`                                     | Gap between label and select in page size selector |
| `--mjo-pagination-page-size-font-size`     | `0.9em`                                     | Font size of page size selector                    |
| `--mjo-pagination-page-size-color`         | `var(--mjo-foreground-color, #222222)`      | Text color of page size selector                   |
| `--mjo-pagination-select-background-color` | `var(--mjo-background-color-high, #ffffff)` | Background color of select dropdown                |
| `--mjo-pagination-select-border-color`     | `var(--mjo-border-color, #dddddd)`          | Border color of select dropdown                    |
| `--mjo-pagination-select-border-radius`    | `var(--mjo-radius, 5px)`                    | Border radius of select dropdown                   |
| `--mjo-pagination-select-color`            | `var(--mjo-foreground-color, #222222)`      | Text color of select dropdown                      |
| `--mjo-pagination-select-padding`          | `0.25em 0.5em`                              | Padding inside select dropdown                     |

## Accessibility

The `mjo-pagination` component implements comprehensive accessibility features:

-   **ARIA Labels**: All buttons have descriptive aria-label attributes
-   **Current Page**: Active page uses `aria-current="page"`
-   **Keyboard Navigation**: Full keyboard support with Tab navigation
-   **Screen Reader Support**: Proper semantics and announcements
-   **Focus Management**: Clear focus indicators and logical tab order
-   **Disabled State**: Proper aria-disabled handling for unavailable actions

## Internationalization

The component supports multiple languages through the built-in locales system:

### Supported Languages

| Code | Language   | Code | Language  | Code | Language |
| ---- | ---------- | ---- | --------- | ---- | -------- |
| `en` | English    | `es` | Español   | `fr` | Français |
| `pt` | Português  | `it` | Italiano  | `de` | Deutsch  |
| `nl` | Nederlands | `bg` | Български | `sr` | Српски   |
| `ru` | Русский    | `zh` | 中文      | `ja` | 日本語   |
| `ko` | 한국어     | `tr` | Türkçe    | `pl` | Polski   |

### Translation Keys

The component uses these translation keys from the pagination namespace:

-   `first`: First page button label
-   `previous`: Previous page button label
-   `next`: Next page button label
-   `last`: Last page button label
-   `page`: Page number prefix
-   `of`: "of" connector for page info
-   `itemsPerPage`: Label for page size selector
-   `goToPage`: Tooltip for page buttons

### Custom Translations

You can extend the locales system by adding pagination translations for additional languages in `src/locales/locales.ts`.

## Notes

-   The component automatically calculates page ranges and shows ellipsis for large page counts
-   Page size changes automatically recalculate total pages
-   The animated indicator smoothly moves to show the current page
-   All events bubble and can be caught by parent elements
-   The component is fully compatible with forms and validation libraries
-   Navigation buttons are automatically disabled when appropriate (e.g., previous on first page)
-   The page size selector integrates seamlessly with the existing mjo-select component
-   Responsive behavior automatically adjusts for smaller screens

## Related Components

-   [`mjo-table`](./mjo-table.md) - Table component that can work with pagination
-   [`mjo-select`](./mjo-select.md) - Used internally for page size selector
-   [`mjo-button`](./mjo-button.md) - Button component with similar styling patterns

```

```
