# mjo-scrollshadow

Container component that adds visual scroll shadows to indicate scrollable content with automatic background color detection.

## Index

1. [Use Cases](#use-cases)
2. [Import](#import)
3. [Properties](#properties)
4. [Public Methods](#public-methods)
5. [CSS Variables](#css-variables)
6. [CSS Parts](#css-parts)
7. [Accessibility](#accessibility)
8. [Usage Examples](#usage-examples)
9. [Additional Notes](#additional-notes)

## Use Cases

The `mjo-scrollshadow` component is designed for:

- Creating elegant visual cues for scrollable content
- Improving user experience by indicating scrollable areas
- Building flexible layouts with scrollable sections
- Implementing horizontal carousels and galleries
- Creating scrollable lists and tables with visual boundaries
- Seamlessly integrating scrollable content in complex layouts (flex, grid)

## Import

```typescript
import "mjo-litui/mjo-scrollshadow";
```

## Properties

| Property        | Type                         | Default      | Description                                          | Required |
| --------------- | ---------------------------- | ------------ | ---------------------------------------------------- | -------- |
| `overflow`      | `"horizontal" \| "vertical"` | `"vertical"` | Scroll direction of the container                    | No       |
| `hideScrollbar` | `boolean`                    | `false`      | Hides the scrollbar while maintaining scroll ability | No       |

## Public Methods

| Method             | Parameters         | Description                                                | Returns  |
| ------------------ | ------------------ | ---------------------------------------------------------- | -------- |
| `scrollPosition`   | -                  | Gets the current scroll position (scrollTop or scrollLeft) | `number` |
| `updateShadows`    | -                  | Manually recalculates and updates shadow visibility        | `void`   |
| `scrollToPosition` | `position: number` | Scrolls to a specific position with smooth behavior        | `void`   |
| `scrollToEnd`      | -                  | Scrolls to the end of content with smooth behavior         | `void`   |

## CSS Variables

| Variable                                   | Description                             | Default                              |
| ------------------------------------------ | --------------------------------------- | ------------------------------------ |
| `--mjo-scrollshadow-color`                 | Color used for gradient shadows         | Auto-detected from parent background |
| `--mjo-scrollshadow-size`                  | Size of the gradient shadow effect      | `10%`                                |
| `--mjo-scrollshadow-scrollbar-width`       | Width of the scrollbar                  | `thin`                               |
| `--mjo-scrollshadow-scrollbar-thumb-color` | Color of the scrollbar thumb            | `#cccccc`                            |
| `--mjo-scrollshadow-scrollbar-track`       | Background color of the scrollbar track | `transparent`                        |

## CSS Parts

| Part        | Description                       | Element |
| ----------- | --------------------------------- | ------- |
| `container` | The internal scrollable container | `div`   |

## Accessibility

### Best Practices

- The component maintains native scroll behavior, preserving keyboard navigation
- Content remains accessible to screen readers as the component doesn't alter semantic structure
- Scrollbar visibility can be controlled while maintaining scroll functionality
- Works seamlessly with native focus management

### Keyboard Interaction

Standard scrollable container keyboard interaction:

- **Arrow Keys**: Scroll content in the specified direction
- **Page Up/Down**: Scroll content by page (vertical)
- **Home/End**: Jump to start/end of content
- **Tab**: Navigate through focusable elements within the scrollable area

### Wheel Event Handling

The component intelligently handles wheel events:

- Horizontal scroll containers can be scrolled with vertical wheel movements
- Vertical scroll containers can be scrolled with horizontal wheel movements
- Smooth scrolling behavior is applied automatically

## Usage Examples

### Vertical Scrolling Container

```html
<mjo-scrollshadow overflow="vertical" style="height: 300px;">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <!-- More items... -->
</mjo-scrollshadow>
```

### Horizontal Scrolling Container

```html
<mjo-scrollshadow overflow="horizontal" style="width: 400px;">
    <div style="display: flex; gap: 1rem;">
        <div style="flex: 0 0 150px;">Card 1</div>
        <div style="flex: 0 0 150px;">Card 2</div>
        <div style="flex: 0 0 150px;">Card 3</div>
        <!-- More cards... -->
    </div>
</mjo-scrollshadow>
```

### Hide Scrollbar

```html
<mjo-scrollshadow overflow="vertical" hideScrollbar style="height: 300px;">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <!-- More items... -->
</mjo-scrollshadow>
```

### Flex Layout Integration

```html
<style>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .header,
    .footer {
        flex: 0 0 auto;
        padding: 1rem;
        background: #f0f0f0;
    }
</style>

<div class="container">
    <div class="header">Header Content</div>

    <mjo-scrollshadow overflow="vertical">
        <div>Scrollable content here...</div>
        <!-- More content... -->
    </mjo-scrollshadow>

    <div class="footer">Footer Content</div>
</div>
```

### Grid Layout Integration

```html
<style>
    .grid-container {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
        height: 100vh;
    }
    .grid-header,
    .grid-footer {
        padding: 1rem;
        background: #f0f0f0;
    }
</style>

<div class="grid-container">
    <div class="grid-header">Header</div>

    <mjo-scrollshadow overflow="vertical">
        <div>Scrollable content...</div>
        <!-- More content... -->
    </mjo-scrollshadow>

    <div class="grid-footer">Footer</div>
</div>
```

### Programmatic Scroll Control

```html
<mjo-scrollshadow id="myScroll" overflow="vertical" style="height: 400px;">
    <!-- Content here -->
</mjo-scrollshadow>

<button id="scrollToTop">Scroll to Top</button>
<button id="scrollToEnd">Scroll to End</button>
<button id="scrollTo200">Scroll to 200px</button>
<button id="getPosition">Get Position</button>

<script>
    const scroll = document.getElementById("myScroll");

    document.getElementById("scrollToTop").addEventListener("click", () => {
        scroll.scrollToPosition(0);
    });

    document.getElementById("scrollToEnd").addEventListener("click", () => {
        scroll.scrollToEnd();
    });

    document.getElementById("scrollTo200").addEventListener("click", () => {
        scroll.scrollToPosition(200);
    });

    document.getElementById("getPosition").addEventListener("click", () => {
        console.log("Current position:", scroll.scrollPosition);
    });
</script>
```

### Dynamic Content with Manual Shadow Update

```html
<mjo-scrollshadow id="dynamicScroll" overflow="vertical" style="height: 300px;">
    <div id="content">Initial content</div>
</mjo-scrollshadow>

<button id="addContent">Add Content</button>

<script>
    const scroll = document.getElementById("dynamicScroll");
    const content = document.getElementById("content");

    document.getElementById("addContent").addEventListener("click", () => {
        const newItem = document.createElement("div");
        newItem.textContent = "New item";
        content.appendChild(newItem);

        // Update shadows after content changes
        scroll.updateShadows();
    });
</script>
```

### Custom Shadow Styling

```css
mjo-scrollshadow {
    --mjo-scrollshadow-color: rgb(255, 255, 255);
    --mjo-scrollshadow-size: 15%;
    --mjo-scrollshadow-scrollbar-width: auto;
    --mjo-scrollshadow-scrollbar-thumb-color: #4a90e2;
}
```

### Styling with CSS Parts

```css
/* Style the scrollable container */
mjo-scrollshadow::part(container) {
    padding: 1rem;
    background: linear-gradient(to bottom, #f9f9f9, #ffffff);
}
```

### Horizontal Image Gallery

```html
<mjo-scrollshadow overflow="horizontal" hideScrollbar style="width: 100%;">
    <div style="display: flex; gap: 1rem; padding: 1rem;">
        <img src="image1.jpg" style="height: 200px; width: auto;" />
        <img src="image2.jpg" style="height: 200px; width: auto;" />
        <img src="image3.jpg" style="height: 200px; width: auto;" />
        <!-- More images... -->
    </div>
</mjo-scrollshadow>
```

## Additional Notes

### Automatic Background Color Detection

The component uses the `getInheritBackgroundColor` utility to automatically detect the parent's background color. This ensures:

- Gradient shadows blend seamlessly with the surrounding design
- No manual color configuration needed in most cases
- Works correctly with nested shadow DOM structures
- Supports complex parent hierarchies including slotted content

### Shadow Behavior

The shadow gradients automatically adapt based on scroll position:

- **At the start**: Shows shadow only at the end
- **In the middle**: Shows shadows at both ends
- **At the end**: Shows shadow only at the start
- **No overflow**: No shadows are displayed

### Performance Considerations

The component optimizes performance by:

- Using CSS `mask-image` for hardware-accelerated shadow rendering
- Transition animations for smooth shadow appearance/disappearance (0.2s ease)
- Efficient scroll event handling with minimal calculations
- Conditional shadow updates only when scroll position changes

### Wheel Event Intelligence

The component enhances user experience by:

- Allowing vertical wheel movements to scroll horizontal containers
- Allowing horizontal wheel movements to scroll vertical containers
- Preventing default scroll behavior when appropriate
- Applying smooth scrolling behavior automatically

### Layout Integration

The component is designed to work seamlessly in various layout contexts:

- **Flex layouts**: Uses `flex: 1 1 0` to properly fill available space
- **Grid layouts**: Works with `minmax(0, 1fr)` for proper grid integration
- **Fixed dimensions**: Supports explicit width/height settings
- **Self-stretching**: Uses `align-self: stretch` and `justify-self: stretch` for proper sizing

### Browser Compatibility

The component uses modern CSS features:

- `mask-image` for gradient effects (widely supported)
- `scrollbar-color` and `scrollbar-width` for custom scrollbar styling (Firefox, Chromium)
- Fallback to default scrollbars in unsupported browsers
- Smooth scrolling behavior with `behavior: "smooth"`
