# mjo-image

A responsive image component with error handling and configurable fit modes.

## Overview

The `mjo-image` component provides a robust image rendering solution with built-in error handling and display customization options. It automatically falls back to a placeholder SVG when image loading fails.

## Basic Usage

### HTML

```html
<mjo-image src="https://example.com/image.jpg" alt="Example image"> </mjo-image>
```

### Lit Element Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-basic")
export class ExampleImageBasic extends LitElement {
    render() {
        return html` <mjo-image src="https://example.com/photo.jpg" alt="A beautiful photo"> </mjo-image> `;
    }
}
```

## Fit Modes

The component supports various object-fit modes for controlling how images are displayed:

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
                    <mjo-image src="https://example.com/photo.jpg" alt="Cover fit" style="width: 200px; height: 150px;"> </mjo-image>
                </div>

                <div>
                    <h3>Contain</h3>
                    <mjo-image src="https://example.com/photo.jpg" alt="Contain fit" fit="contain" style="width: 200px; height: 150px;"> </mjo-image>
                </div>

                <div>
                    <h3>Fill</h3>
                    <mjo-image src="https://example.com/photo.jpg" alt="Fill fit" fit="fill" style="width: 200px; height: 150px;"> </mjo-image>
                </div>

                <div>
                    <h3>Scale Down</h3>
                    <mjo-image src="https://example.com/photo.jpg" alt="Scale down fit" fit="scale-down" style="width: 200px; height: 150px;"> </mjo-image>
                </div>
            </div>
        `;
    }
}
```

## Error Handling

The component automatically displays a placeholder when image loading fails:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-error-handling")
export class ExampleImageErrorHandling extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 16px; align-items: center;">
                <div>
                    <h3>Valid Image</h3>
                    <mjo-image src="https://via.placeholder.com/150" alt="Valid image" style="width: 150px; height: 150px;"> </mjo-image>
                </div>

                <div>
                    <h3>Broken Image (Error State)</h3>
                    <mjo-image src="https://example.com/nonexistent.jpg" alt="Broken image" style="width: 150px; height: 150px;"> </mjo-image>
                </div>
            </div>
        `;
    }
}
```

## Responsive Images

Create responsive image layouts with CSS:

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-image";

@customElement("example-image-responsive")
export class ExampleImageResponsive extends LitElement {
    static styles = css`
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            padding: 16px;
        }

        mjo-image {
            width: 100%;
            height: 200px;
            border-radius: 8px;
            overflow: hidden;
        }
    `;

    render() {
        return html`
            <div class="image-grid">
                <mjo-image src="https://via.placeholder.com/300x200" alt="Image 1"> </mjo-image>
                <mjo-image src="https://via.placeholder.com/300x200" alt="Image 2"> </mjo-image>
                <mjo-image src="https://via.placeholder.com/300x200" alt="Image 3"> </mjo-image>
            </div>
        `;
    }
}
```

## Image Gallery

Build an image gallery with mjo-image:

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-image";
import "mjo-litui/mjo-modal";

@customElement("example-image-gallery")
export class ExampleImageGallery extends LitElement {
    static styles = css`
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 12px;
            padding: 16px;
        }

        .gallery-item {
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .gallery-item:hover {
            transform: scale(1.05);
        }

        mjo-image {
            width: 100%;
            height: 200px;
            border-radius: 8px;
            overflow: hidden;
        }

        .modal-image {
            max-width: 90vw;
            max-height: 90vh;
            width: auto;
            height: auto;
        }
    `;

    @state()
    private selectedImage = "";

    private images = [
        "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Photo+1",
        "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Photo+2",
        "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Photo+3",
        "https://via.placeholder.com/400x300/96CEB4/FFFFFF?text=Photo+4",
        "https://via.placeholder.com/400x300/FFEAA7/000000?text=Photo+5",
        "https://via.placeholder.com/400x300/DDA0DD/FFFFFF?text=Photo+6",
    ];

    private openModal(imageSrc: string) {
        this.selectedImage = imageSrc;
        const modal = this.shadowRoot?.querySelector("mjo-modal") as any;
        modal?.open();
    }

    render() {
        return html`
            <div class="gallery">
                ${this.images.map(
                    (src, index) => html`
                        <div class="gallery-item" @click=${() => this.openModal(src)}>
                            <mjo-image src=${src} alt="Gallery image ${index + 1}" fit="cover"> </mjo-image>
                        </div>
                    `,
                )}
            </div>

            <mjo-modal>
                <mjo-image class="modal-image" src=${this.selectedImage} alt="Full size image" fit="contain"> </mjo-image>
            </mjo-modal>
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
                    image: {
                        errorBackgroundColor: "#ffebee",
                        errorRadius: "12px",
                    },
                }}
            >
                <div style="display: flex; gap: 16px;">
                    <mjo-image src="https://via.placeholder.com/150" alt="Valid image" style="width: 150px; height: 150px;"> </mjo-image>

                    <mjo-image src="https://example.com/broken.jpg" alt="Error state with custom styling" style="width: 150px; height: 150px;"> </mjo-image>
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
                        errorRadius: "8px",
                    }}
                    src="https://via.placeholder.com/150"
                    alt="Valid image"
                    style="width: 150px; height: 150px;"
                >
                </mjo-image>

                <mjo-image
                    .theme=${{
                        errorBackgroundColor: "#fff3e0",
                        errorRadius: "16px",
                    }}
                    src="https://example.com/broken.jpg"
                    alt="Error state with orange background"
                    style="width: 150px; height: 150px;"
                >
                </mjo-image>
            </div>
        `;
    }
}
```

## Attributes/Properties

| Name    | Type                                                       | Default   | Description                                          |
| ------- | ---------------------------------------------------------- | --------- | ---------------------------------------------------- |
| `src`   | `string`                                                   | `""`      | The image source URL                                 |
| `alt`   | `string`                                                   | `""`      | Alternative text for the image                       |
| `fit`   | `"contain" \| "cover" \| "fill" \| "none" \| "scale-down"` | `"cover"` | How the image should be resized to fit its container |
| `theme` | `MjoImageTheme`                                            | `{}`      | Theme configuration for the component                |

## Events

This component does not emit custom events, but the underlying `<img>` element will fire standard events like `load` and `error`.

## CSS Custom Properties

| Property                             | Default   | Description                          |
| ------------------------------------ | --------- | ------------------------------------ |
| `--mjo-image-error-background-color` | `#e0e0e0` | Background color for the error state |
| `--mjo-image-error-radius`           | `5px`     | Border radius for the error state    |

### Theme Interface

```ts
interface MjoImageTheme {
    errorBackgroundColor?: string;
    errorRadius?: string;
}
```

## Styling

The component can be styled using standard CSS properties:

```css
mjo-image {
    width: 300px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

## Technical Notes

-   **Error Handling**: When an image fails to load, the component automatically displays a placeholder SVG
-   **Object Fit**: The `fit` property directly maps to the CSS `object-fit` property
-   **Accessibility**: Always provide meaningful `alt` text for better accessibility
-   **Performance**: Images are loaded naturally by the browser, allowing for lazy loading when needed
-   **Responsive**: The component inherits its dimensions from CSS styling

## Accessibility

-   Always provide descriptive `alt` text
-   Use appropriate ARIA labels when the image conveys important information
-   Ensure sufficient color contrast in error states
-   Consider providing alternative content for essential images that might fail to load

## Examples in Action

The image component is particularly useful for:

-   Product catalogs and galleries
-   User avatars and profile pictures
-   Blog post featured images
-   Card layouts with visual content
-   Image-heavy dashboards and reports

For additional theming options, see the [Theming Guide](./theming.md).
