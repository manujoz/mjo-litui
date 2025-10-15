# mjo-image

A responsive image component with error handling, loading states, and accessibility features.

## Table of Contents

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

The `mjo-image` component is designed for:

- Displaying images with automatic error handling and fallback states
- Creating clickable image galleries or thumbnails with keyboard navigation
- Showing loading spinners while images are being fetched
- Implementing lazy loading for performance optimization
- Providing accessible image experiences with ARIA support
- Responsive images with different object-fit strategies

## Import

```javascript
import "mjo-litui/mjo-image";
```

## Properties

| Property          | Type                                                       | Description                                                | Default     | Required |
| ----------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ----------- | -------- |
| `src`             | `string`                                                   | The source URL of the image                                | `""`        | Yes      |
| `alt`             | `string`                                                   | Alternative text for the image                             | `undefined` | No       |
| `fit`             | `"contain" \| "cover" \| "fill" \| "none" \| "scale-down"` | How the image should be fitted to its container            | `"cover"`   | No       |
| `loading`         | `boolean`                                                  | Shows a loading spinner instead of the image               | `false`     | No       |
| `clickable`       | `boolean`                                                  | Makes the image interactive with click and keyboard events | `false`     | No       |
| `disabled`        | `boolean`                                                  | Disables interaction when clickable is true                | `false`     | No       |
| `lazy`            | `boolean`                                                  | Enables native lazy loading for the image                  | `false`     | No       |
| `ariaLabel`       | `string`                                                   | ARIA label for the image                                   | `null`      | No       |
| `ariaLabelledBy`  | `string`                                                   | ID of element that labels this image                       | `undefined` | No       |
| `ariaDescribedBy` | `string`                                                   | ID of element that describes this image                    | `undefined` | No       |

## Events

| Event             | Description                             | Type                 | Detail                                                                            |
| ----------------- | --------------------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| `mjo-image:load`  | Fired when the image loads successfully | `MjoImageLoadEvent`  | `{ element: MjoImage, src: string, naturalWidth: number, naturalHeight: number }` |
| `mjo-image:error` | Fired when the image fails to load      | `MjoImageErrorEvent` | `{ element: MjoImage, src: string, error: string }`                               |
| `mjo-image:click` | Fired when a clickable image is clicked | `MjoImageClickEvent` | `{ element: MjoImage, src: string }`                                              |

## CSS Variables

| Variable                               | Description                                   | Default                                       |
| -------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `--mjo-image-clickable-cursor`         | Cursor style for clickable images             | `pointer`                                     |
| `--mjo-image-clickable-hover-scale`    | Transform scale on hover for clickable images | `scale(1.02)`                                 |
| `--mjo-image-focus-outline`            | Outline style for focused clickable images    | `2px solid var(--mjo-primary-color, #007bff)` |
| `--mjo-image-disabled-opacity`         | Opacity for disabled images                   | `0.6`                                         |
| `--mjo-image-loading-background-color` | Background color for loading state            | `#f5f5f5`                                     |
| `--mjo-image-loading-size`             | Size of the loading spinner                   | `24px`                                        |
| `--mjo-image-loading-color`            | Color of the loading spinner                  | `#666`                                        |
| `--mjo-image-error-background-color`   | Background color for error state              | `#e0e0e0`                                     |
| `--mjo-image-error-radius`             | Border radius for error and loading states    | `5px`                                         |

## CSS Parts

| Part                      | Description                             | Element |
| ------------------------- | --------------------------------------- | ------- |
| `container`               | The main container wrapping the image   | `<div>` |
| `container-loading`       | The container in loading state          | `<div>` |
| `container-error`         | The container in error state            | `<div>` |
| `container-clickable`     | The container when clickable is enabled | `<div>` |
| `loading-spinner-wrapper` | The wrapper for the loading spinner     | `<div>` |
| `loading-spinner-svg`     | The SVG element of the loading spinner  | `<svg>` |
| `image`                   | The actual image element                | `<img>` |

## Accessibility

The `mjo-image` component is designed with comprehensive accessibility features:

### Best Practices

- Always provide an `alt` attribute for meaningful images
- Use `ariaLabel` when the alt text needs to be different from the visual context
- Use `ariaDescribedBy` to link to detailed descriptions when necessary
- For decorative images, use an empty alt attribute (`alt=""`)

### ARIA Roles and Attributes

- Automatically assigns appropriate roles based on state:
    - `role="img"` for normal images
    - `role="button"` for clickable images
    - `role="presentation"` for error states
    - `role="status"` for loading states
- Supports custom ARIA labels through `ariaLabel`, `ariaLabelledBy`, and `ariaDescribedBy` properties
- Automatically computes appropriate ARIA labels for loading and error states

### Keyboard Interactions

When `clickable` is enabled and not `disabled`:

- **Enter**: Triggers the click event
- **Space**: Triggers the click event
- **Tab**: Focuses the image (when `tabindex="0"`)

### Focus Management

- Clickable images receive visible focus indicators
- Focus outline can be customized via `--mjo-image-focus-outline` CSS variable
- Respects `prefers-reduced-motion` for smooth transitions

## Usage Examples

### Basic Image

```html
<mjo-image src="https://example.com/image.jpg" alt="A beautiful landscape"> </mjo-image>
```

### Clickable Image with Event Handling

```html
<mjo-image src="https://example.com/thumbnail.jpg" alt="Product thumbnail" clickable> </mjo-image>

<script>
    const image = document.querySelector("mjo-image");

    image.addEventListener("mjo-image:click", (e) => {
        console.log("Image clicked:", e.detail.src);
        // Open lightbox or navigate to detail page
    });
</script>
```

### Lazy Loading with Different Fit Modes

```html
<!-- Contain - maintains aspect ratio, fits within bounds -->
<mjo-image src="https://example.com/portrait.jpg" alt="Portrait photo" fit="contain" lazy> </mjo-image>

<!-- Cover - fills container, maintains aspect ratio (default) -->
<mjo-image src="https://example.com/wide.jpg" alt="Wide landscape" fit="cover" lazy> </mjo-image>

<!-- Scale-down - similar to contain but never scales up -->
<mjo-image src="https://example.com/small.jpg" alt="Small icon" fit="scale-down" lazy> </mjo-image>
```

### Loading State Management

```html
<mjo-image id="dynamic-image" src="" alt="Dynamic content" loading> </mjo-image>

<script>
    const image = document.getElementById("dynamic-image");

    // Simulate loading
    setTimeout(() => {
        image.loading = false;
        image.src = "https://example.com/loaded-image.jpg";
    }, 2000);
</script>
```

### Error Handling

```html
<mjo-image src="https://example.com/nonexistent.jpg" alt="Product image"> </mjo-image>

<script>
    const image = document.querySelector("mjo-image");

    image.addEventListener("mjo-image:error", (e) => {
        console.error("Failed to load:", e.detail.error);
        // Log error or show notification
    });

    image.addEventListener("mjo-image:load", (e) => {
        console.log("Image loaded:", e.detail.naturalWidth, "x", e.detail.naturalHeight);
    });
</script>
```

### Customizing Appearance with CSS Variables

```html
<style>
    .custom-image {
        --mjo-image-clickable-cursor: zoom-in;
        --mjo-image-clickable-hover-scale: scale(1.05);
        --mjo-image-focus-outline: 3px solid #ff6b6b;
        --mjo-image-loading-background-color: #fafafa;
        --mjo-image-loading-color: #007bff;
        --mjo-image-error-background-color: #ffe0e0;
    }
</style>

<mjo-image class="custom-image" src="https://example.com/image.jpg" alt="Custom styled image" clickable> </mjo-image>
```

### Using CSS Parts for Advanced Styling

```html
<style>
    mjo-image::part(container) {
        border: 2px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
    }

    mjo-image::part(image) {
        transition: transform 0.3s ease;
    }

    mjo-image:hover::part(image) {
        transform: scale(1.1);
    }

    mjo-image::part(container-error) {
        border-color: #ff6b6b;
    }
</style>

<mjo-image src="https://example.com/image.jpg" alt="Styled image"> </mjo-image>
```

### Accessible Image Gallery

```html
<div role="list" aria-label="Product gallery">
    <mjo-image role="listitem" src="https://example.com/product-1.jpg" alt="Product view from front" clickable aria-describedby="img-desc-1"> </mjo-image>
    <span id="img-desc-1" hidden>High resolution front view showing product details</span>

    <mjo-image role="listitem" src="https://example.com/product-2.jpg" alt="Product view from side" clickable aria-describedby="img-desc-2"> </mjo-image>
    <span id="img-desc-2" hidden>Side angle view highlighting product features</span>
</div>
```

## Additional Notes

- The component automatically displays a fallback SVG when image loading fails
- Loading spinner uses CSS animations that respect `prefers-reduced-motion` settings
- The `disabled` property only affects interaction when `clickable` is enabled
- When clickable, the component prevents default behavior and stops propagation to allow custom handling
- The component uses native lazy loading (`loading="lazy"`) when the `lazy` property is enabled
- All event handlers use private methods (prefixed with `#`) following modern JavaScript conventions
- The component inherits width and height from its container, making it flexible for different layouts
