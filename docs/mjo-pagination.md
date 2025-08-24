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
<mjo-pagination total-items="100" page-size="10" current-page="1"></mjo-pagination>
```

### With Lit Element

```ts
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import 'mjo-litui/mjo-pagination';

@customElement('example-pagination')
export class ExamplePagination extends LitElement {
  @state() private currentPage = 1;
  @state() private totalItems = 100;
  @state() private pageSize = 10;

  render() {
    return html`
      <mjo-pagination
        .currentPage=${this.currentPage}
        .totalItems=${this.totalItems}
        .pageSize=${this.pageSize}
        @mjo-pagination:change=${this.#handlePageChange}
      ></mjo-pagination>
    `;
  }

  #handlePageChange(event: CustomEvent) {
    this.currentPage = event.detail.page;
  }
}
```

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
      <mjo-pagination total-items="250" page-size="25" current-page="3"></mjo-pagination>
    `;
  }
}
```

### With Navigation and Page Size Selector

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-pagination";

@customElement("example-full-pagination")
export class ExampleFullPagination extends LitElement {
    render() {
        return html`
            <mjo-pagination
                total-items="500"
                page-size="25"
                current-page="5"
                show-page-size-selector
                .pageSizeOptions=${[10, 25, 50, 100]}
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
            <mjo-pagination total-items="100" size="small" color="secondary"></mjo-pagination>
            <mjo-pagination total-items="100" size="large" color="primary"></mjo-pagination>
        `;
    }
}
```

## Attributes / Properties

| Name                   | Type                                 | Default             | Description                            |
| ---------------------- | ------------------------------------ | ------------------- | -------------------------------------- |
| `totalItems`           | `number`                             | `0`                 | Total number of items across all pages |
| `pageSize`             | `number`                             | `10`                | Number of items per page               |
| `currentPage`          | `number`                             | `1`                 | Current active page (1-based)          |
| `siblingCount`         | `number`                             | `1`                 | Number of sibling pages around current page |
| `hideFirstLast`        | `boolean`                            | `false`             | Hide first/last navigation buttons     |
| `hidePrevNext`         | `boolean`                            | `false`             | Hide previous/next navigation buttons  |
| `showPageSizeSelector` | `boolean`                            | `false`             | Show page size selector dropdown       |
| `pageSizeOptions`      | `number[]`                           | `[10, 25, 50, 100]` | Available page size options            |
| `disabled`             | `boolean`                            | `false`             | Disable all pagination interactions    |
| `size`                 | `"small"` \| `"medium"` \| `"large"` | `"medium"`          | Component size variant                 |
| `color`                | `"primary"` \| `"secondary"`         | `"primary"`         | Color scheme variant                   |
| `locale`               | `SupportedLocale`                    | `"en"`              | Language locale for labels             |

## Methods

| Method             | Parameters      | Returns | Description                            |
| ------------------ | --------------- | ------- | -------------------------------------- |
| `goToPage(page)`   | `page: number`  | `void`  | Navigate to specific page              |
| `previousPage()`   | -               | `void`  | Navigate to previous page              |
| `nextPage()`       | -               | `void`  | Navigate to next page                  |
| `firstPage()`      | -               | `void`  | Navigate to first page                 |
| `lastPage()`       | -               | `void`  | Navigate to last page                  |
| `setPageSize(size)` | `size: number` | `void`  | Update page size and recalculate pages |
| `getPageRange()`   | -               | `(number \| "ellipsis")[]` | Get current page range array |

## Events

| Event                       | Detail                                                                              | Description                                  |
| --------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------- |
| `mjo-pagination:change`     | `{ element, page, previousPage, totalPages, pageSize, totalItems }`                | Fired when page or page size changes         |
| `mjo-pagination:page-click` | `{ element, page, originalEvent }`                                                  | Fired when a specific page number is clicked |
| `mjo-pagination:navigation` | `{ element, direction, page, originalEvent }`                                       | Fired when navigation buttons are used       |

### Event Interfaces

```typescript
interface MjoPaginationChangeEvent extends CustomEvent {
  detail: {
    element: MjoPagination;
    page: number;
    previousPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  };
}

interface MjoPaginationPageClickEvent extends CustomEvent {
  detail: {
    element: MjoPagination;
    page: number;
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

interface MjoPaginationNavigationEvent extends CustomEvent {
  detail: {
    element: MjoPagination;
    direction: "previous" | "next" | "first" | "last";
    page: number;
    originalEvent: MouseEvent | KeyboardEvent;
  };
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

### Page Items

| Property                           | Default | Description                   |
| ---------------------------------- | ------- | ----------------------------- |
| `--mjo-pagination-item-width`      | `2em`   | Width of page buttons         |
| `--mjo-pagination-border-radius`   | `var(--mjo-radius, 5px)` | Border radius of page buttons |
| `--mjo-pagination-small-font-size` | `0.8em` | Font size for small variant   |
| `--mjo-pagination-large-font-size` | `1.2em` | Font size for large variant   |

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
| `--mjo-pagination-hover-background-color` | `var(--mjo-primary-color-alpha1, #f5f5f5)`  | Background color on hover |
| `--mjo-pagination-primary-color-hover`    | `var(--mjo-primary-color-hover, #4e9be4)`   | Primary color on hover    |
| `--mjo-pagination-secondary-color-hover`  | `var(--mjo-secondary-color-hover, #d86490)` | Secondary color on hover  |
| `--mjo-pagination-secondary-color-alpha1` | `var(--mjo-secondary-color-alpha1, #ffeef0)` | Secondary alpha color for hover |

### Navigation Buttons

| Property                                  | Default                                       | Description                       |
| ----------------------------------------- | --------------------------------------------- | --------------------------------- |
| `--mjo-pagination-nav-color`              | `var(--mjo-foreground-color, #222222)`        | Navigation button text color      |
| `--mjo-pagination-nav-min-width`          | `2.5em`                                       | Minimum width of nav buttons      |
| `--mjo-pagination-nav-padding`            | `0.5em`                                       | Padding of nav buttons            |
| `--mjo-pagination-nav-disabled-color`     | `var(--mjo-disabled-foreground-color, #aaaaaa)` | Color for disabled nav buttons |
| `--mjo-pagination-nav-small-min-width`    | `2em`                                         | Small size nav button min width   |
| `--mjo-pagination-nav-small-padding`      | `0.4em`                                       | Small size nav button padding     |
| `--mjo-pagination-nav-large-min-width`    | `3em`                                         | Large size nav button min width   |
| `--mjo-pagination-nav-large-padding`      | `0.6em`                                       | Large size nav button padding     |

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

| Property                                    | Default                                       | Description                               |
| ------------------------------------------- | --------------------------------------------- | ----------------------------------------- |
| `--mjo-pagination-page-size-gap`            | `0.5em`                                       | Gap in page size selector                 |
| `--mjo-pagination-page-size-font-size`      | `0.9em`                                       | Font size of page size selector           |
| `--mjo-pagination-page-size-color`          | `var(--mjo-foreground-color, #222222)`        | Text color of page size selector          |
| `--mjo-pagination-select-background-color`  | `var(--mjo-background-color-high, #ffffff)`   | Background color of select dropdown       |
| `--mjo-pagination-select-border-color`      | `var(--mjo-border-color, #dddddd)`            | Border color of select dropdown           |
| `--mjo-pagination-select-border-radius`     | `var(--mjo-radius, 5px)`                      | Border radius of select dropdown          |
| `--mjo-pagination-select-color`             | `var(--mjo-foreground-color, #222222)`        | Text color of select dropdown             |
| `--mjo-pagination-select-padding`           | `0.25em 0.5em`                               | Padding of select dropdown                |

## Theming

The component supports theming through the `MjoPaginationTheme` interface:

```typescript
interface MjoPaginationTheme {
  gap?: string;
  itemsGap?: string;
  containerPadding?: string;
  containerBorderRadius?: string;
  containerBorder?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  activeFontWeight?: string;
  color?: string;
  primaryColor?: string;
  secondaryColor?: string;
  primaryForegroundColor?: string;
  secondaryForegroundColor?: string;
  disabledColor?: string;
  hoverBackgroundColor?: string;
  primaryColorHover?: string;
  secondaryColorHover?: string;
  indicatorOpacity?: string;
  animationDuration?: string;
  animationTiming?: string;
  ellipsisColor?: string;
  // ... and more properties for complete customization
}
```
