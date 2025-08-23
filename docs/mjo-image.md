# mjo-image

A responsive image component with error handling, loading states, clickable interactions, and comprehensive accessibility features.

## Overview

The `mjo-image` component provides a robust image rendering solution with built-in error handling, loading states, clickable interactions, and comprehensive accessibility support. It automatically falls back to a placeholder SVG when image loading fails and supports various interaction modes.

## Basic Usage

### HTML

```html
<mjo-image src="https://example.com/image.jpg" alt="Example image"></mjo-image>
```

### Lit Element Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-basic")
export class ExampleImageBasic extends LitElement {
    render() {
        return html`<mjo-image src="https://example.com/photo.jpg" alt="A beautiful photo"></mjo-image>`;
    }
}
```

## Interactive Images

### Clickable Images

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-clickable")
export class ExampleImageClickable extends LitElement {
    private handleImageClick(event: CustomEvent) {
        console.log("Image clicked:", event.detail.src);
    }

    render() {
        return html`
            <mjo-image
                src="https://example.com/photo.jpg"
                alt="Clickable image"
                clickable
                aria-label="View full size image"
                @mjo-image:click=${this.handleImageClick}
            ></mjo-image>
        `;
    }
}
```

### Loading States

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-loading")
export class ExampleImageLoading extends LitElement {
    @state() private isLoading = true;

    render() {
        return html`
            <div>
                <mjo-image src="https://example.com/photo.jpg" alt="Loading image example" .loading=${this.isLoading}></mjo-image>

                <button @click=${() => (this.isLoading = !this.isLoading)}>Toggle Loading</button>
            </div>
        `;
    }
}
```

## Fit Modes

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-fit-modes")
export class ExampleImageFitModes extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                <div>
                    <h3>Cover (default)</h3>
                    <mjo-image src="https://via.placeholder.com/300x200" alt="Cover fit" style="width: 200px; height: 150px;"></mjo-image>
                </div>

                <div>
                    <h3>Contain</h3>
                    <mjo-image src="https://via.placeholder.com/300x200" alt="Contain fit" fit="contain" style="width: 200px; height: 150px;"></mjo-image>
                </div>

                <div>
                    <h3>Fill</h3>
                    <mjo-image src="https://via.placeholder.com/300x200" alt="Fill fit" fit="fill" style="width: 200px; height: 150px;"></mjo-image>
                </div>
            </div>
        `;
    }
}
```

## Error Handling

The component automatically displays a placeholder when image loading fails and emits appropriate events:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-error-handling")
export class ExampleImageErrorHandling extends LitElement {
    private handleImageError(event: CustomEvent) {
        console.warn("Image failed to load:", event.detail.error);
    }

    render() {
        return html`
            <div style="display: flex; gap: 16px; align-items: center;">
                <div>
                    <h3>Valid Image</h3>
                    <mjo-image src="https://via.placeholder.com/150" alt="Valid image" style="width: 150px; height: 150px;"></mjo-image>
                </div>

                <div>
                    <h3>Broken Image (Error State)</h3>
                    <mjo-image
                        src="https://example.com/nonexistent.jpg"
                        alt="Broken image"
                        style="width: 150px; height: 150px;"
                        @mjo-image:error=${this.handleImageError}
                    ></mjo-image>
                </div>
            </div>
        `;
    }
}
```

## Lazy Loading

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-lazy")
export class ExampleImageLazy extends LitElement {
    render() {
        return html`
            <div style="height: 200vh;">
                <p>Scroll down to see lazy-loaded images...</p>

                <div style="margin-top: 100vh; display: flex; gap: 16px;">
                    <mjo-image src="https://via.placeholder.com/300x200" alt="Lazy loaded image 1" lazy style="width: 300px; height: 200px;"></mjo-image>

                    <mjo-image src="https://via.placeholder.com/300x200/ff6b6b" alt="Lazy loaded image 2" lazy style="width: 300px; height: 200px;"></mjo-image>
                </div>
            </div>
        `;
    }
}
```

## Accessibility Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-accessibility")
export class ExampleImageAccessibility extends LitElement {
    @state() private selectedImage = "";

    private images = [
        { src: "https://via.placeholder.com/300x200/ff6b6b", alt: "Red placeholder image", title: "Gallery Image 1" },
        { src: "https://via.placeholder.com/300x200/4ecdc4", alt: "Teal placeholder image", title: "Gallery Image 2" },
        { src: "https://via.placeholder.com/300x200/45b7d1", alt: "Blue placeholder image", title: "Gallery Image 3" },
    ];

    private handleImageClick(event: CustomEvent, title: string) {
        this.selectedImage = title;
        console.log(`Selected: ${title}`);
    }

    private handleImageLoad(event: CustomEvent) {
        console.log("Image loaded:", event.detail.naturalWidth, "x", event.detail.naturalHeight);
    }

    render() {
        return html`
            <div>
                <h3>Accessible Image Gallery</h3>
                <p>Current selection: ${this.selectedImage || "None"}</p>

                <div style="display: flex; gap: 1rem; flex-wrap: wrap;" role="grid" aria-label="Image gallery">
                    ${this.images.map(
                        (img, index) => html`
                            <div role="gridcell" style="text-align: center;">
                                <mjo-image
                                    src=${img.src}
                                    alt=${img.alt}
                                    clickable
                                    aria-label="Click to select ${img.title}"
                                    aria-describedby="gallery-instructions"
                                    tabindex="0"
                                    style="width: 200px; height: 150px; border-radius: 8px;"
                                    @mjo-image:click=${(e: CustomEvent) => this.handleImageClick(e, img.title)}
                                    @mjo-image:load=${this.handleImageLoad}
                                ></mjo-image>
                                <p style="margin: 0.5rem 0; font-size: 0.9rem;">${img.title}</p>
                            </div>
                        `,
                    )}
                </div>

                <p id="gallery-instructions" style="font-size: 0.8rem; color: #666;">Use arrow keys to navigate, Enter or Space to select images</p>
            </div>
        `;
    }
}
```

## Theme Customization

### Using mjo-theme

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-image";

@customElement("example-image-theming")
export class ExampleImageTheming extends LitElement {
    render() {
        return html`
            <mjo-theme
                .theme=${{
                    components: {
                        mjoImage: {
                            errorBackgroundColor: "#fff3e0",
                            errorRadius: "12px",
                            loadingBackgroundColor: "#f3e5f5",
                            loadingColor: "#9c27b0",
                            focusOutline: "3px solid #ff9800",
                        },
                    },
                }}
            >
                <div style="display: flex; gap: 16px;">
                    <mjo-image src="https://via.placeholder.com/150" alt="Valid image" clickable style="width: 150px; height: 150px;"></mjo-image>

                    <mjo-image loading alt="Loading state example" style="width: 150px; height: 150px;"></mjo-image>

                    <mjo-image
                        src="https://example.com/broken.jpg"
                        alt="Error state with custom styling"
                        clickable
                        style="width: 150px; height: 150px;"
                    ></mjo-image>
                </div>
            </mjo-theme>
        `;
    }
}
```

### Using ThemeMixin

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ThemeMixin } from "mjo-litui/mixins";
import "mjo-litui/mjo-image";

@customElement("example-image-theme-mixin")
export class ExampleImageThemeMixin extends ThemeMixin(LitElement) {
    render() {
        return html`
            <div style="display: flex; gap: 16px;">
                <mjo-image
                    .theme=${{
                        errorBackgroundColor: "#e3f2fd",
                        errorRadius: "16px",
                        clickableHoverScale: "scale(1.05)",
                    }}
                    src="https://example.com/broken.jpg"
                    alt="Error state with custom theme"
                    clickable
                    style="width: 150px; height: 150px;"
                ></mjo-image>
            </div>
        `;
    }
}
```

## Attributes/Properties

| Name              | Type                                                       | Default   | Required | Description                                               |
| ----------------- | ---------------------------------------------------------- | --------- | -------- | --------------------------------------------------------- |
| `src`             | `string`                                                   | `""`      | no       | The image source URL                                      |
| `alt`             | `string`                                                   | `""`      | no       | Alternative text for the image                            |
| `fit`             | `"contain" \| "cover" \| "fill" \| "none" \| "scale-down"` | `"cover"` | no       | How the image should be resized to fit its container      |
| `loading`         | `boolean`                                                  | `false`   | no       | Shows loading spinner instead of image                    |
| `clickable`       | `boolean`                                                  | `false`   | no       | Makes the image clickable and keyboard navigable          |
| `disabled`        | `boolean`                                                  | `false`   | no       | Disables interaction when clickable                       |
| `lazy`            | `boolean`                                                  | `false`   | no       | Enables native lazy loading for the image                 |
| `ariaLabel`       | `string`                                                   | `""`      | no       | ARIA label for screen readers                             |
| `ariaLabelledBy`  | `string`                                                   | `""`      | no       | References element(s) that label this image               |
| `ariaDescribedBy` | `string`                                                   | `""`      | no       | References element(s) that provide additional description |
| `theme`           | `MjoImageTheme`                                            | `{}`      | no       | Theme configuration for the component                     |

## Events

| Event Name        | Detail Type                                                                        | Bubbles | Cancelable | Description                           |
| ----------------- | ---------------------------------------------------------------------------------- | ------- | ---------- | ------------------------------------- |
| `mjo-image:load`  | `{ element: MjoImage; src: string; naturalWidth: number; naturalHeight: number; }` | yes     | no         | Fired when image loads successfully   |
| `mjo-image:error` | `{ element: MjoImage; src: string; error: string; }`                               | yes     | no         | Fired when image fails to load        |
| `mjo-image:click` | `{ element: MjoImage; src: string; }`                                              | yes     | yes        | Fired when clickable image is clicked |

## CSS Custom Properties

| Property                               | Default         | Description                                   |
| -------------------------------------- | --------------- | --------------------------------------------- |
| `--mjo-image-error-background-color`   | `#e0e0e0`       | Background color for the error placeholder    |
| `--mjo-image-error-radius`             | `5px`           | Border radius for error and loading states    |
| `--mjo-image-loading-background-color` | `#f5f5f5`       | Background color for loading state            |
| `--mjo-image-loading-size`             | `24px`          | Size of the loading spinner                   |
| `--mjo-image-loading-color`            | `#666`          | Color of the loading spinner                  |
| `--mjo-image-focus-outline`            | `2px solid ...` | Focus outline for clickable images            |
| `--mjo-image-disabled-opacity`         | `0.6`           | Opacity when disabled                         |
| `--mjo-image-clickable-hover-scale`    | `scale(1.02)`   | Transform scale on hover for clickable images |
| `--mjo-image-clickable-cursor`         | `pointer`       | Cursor style for clickable images             |

### Theme Interface

```ts
interface MjoImageTheme {
    errorBackgroundColor?: string;
    errorRadius?: string;
    loadingBackgroundColor?: string;
    loadingSize?: string;
    loadingColor?: string;
    focusOutline?: string;
    disabledOpacity?: string;
    clickableHoverScale?: string;
    clickableCursor?: string;
}
```

## Accessibility Features

### ARIA Support

-   **Dynamic Roles**: Automatically assigns appropriate roles (`img`, `button`, `presentation`) based on context
-   **ARIA Labels**: Supports `aria-label`, `aria-labelledby`, and `aria-describedby` properties
-   **State Communication**: Loading and error states are properly announced to screen readers
-   **Focus Management**: Clickable images are properly focusable and keyboard navigable

### Keyboard Navigation

-   **Tab Navigation**: Clickable images are included in tab order
-   **Activation**: Enter and Space keys trigger click events for clickable images
-   **Focus Indicators**: Clear visual focus indicators for keyboard users

### Screen Reader Support

-   **Descriptive Alt Text**: Always provide meaningful alt text for images
-   **State Announcements**: Loading and error states are communicated appropriately
-   **Context Information**: Additional context provided through ARIA attributes

### Best Practices Example

```html
<!-- Decorative image -->
<mjo-image src="decoration.jpg" alt="" aria-hidden="true"></mjo-image>

<!-- Informative image -->
<mjo-image src="chart.png" alt="Sales increased 40% from Q1 to Q2 2024" aria-describedby="chart-details"></mjo-image>
<p id="chart-details">Detailed breakdown shows consistent growth across all regions.</p>

<!-- Interactive image -->
<mjo-image
    src="product.jpg"
    alt="Premium wireless headphones"
    clickable
    aria-label="View product details for premium wireless headphones"
    @mjo-image:click="${this.showProductDetails}"
></mjo-image>
```

## Technical Notes

-   **Error Handling**: Automatic fallback to placeholder SVG with custom events
-   **Loading States**: Built-in loading spinner with accessibility support
-   **Performance**: Native lazy loading support for better page performance
-   **Responsive**: Component inherits dimensions from CSS styling
-   **Browser Support**: Works across modern browsers with graceful degradation

For additional theming options, see the [Theming Guide](./theming.md).
