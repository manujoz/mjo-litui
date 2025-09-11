# mjo-scrollshadow

Container component that adds visual scroll shadows to indicate scrollable content. Creates elegant gradient masks that appear when content overflows, providing visual cues about scrollable areas. The component automatically detects the parent's background color to create seamless shadow gradients.

## Important Developer Responsibilities

**The developer must ensure the host element has appropriate sizing constraints** for the scroll functionality to work properly:

-   For vertical scrolling: Set `max-height`, `height`, or place the component within a flex container with defined height
-   For horizontal scrolling: Set `max-width`, `width`, or place within a constrained container
-   The component itself handles `overflow: hidden` and delegates scrolling to the internal container

## HTML Usage

```html
<!-- Vertical scrolling with shadows -->
<mjo-scrollshadow style="max-height: 300px;">
    <div>Long content that will scroll vertically...</div>
</mjo-scrollshadow>

<!-- Horizontal scrolling with hidden scrollbar -->
<mjo-scrollshadow overflow="horizontal" hideScrollbar style="max-width: 400px;">
    <div style="white-space: nowrap;">Wide content that scrolls horizontally...</div>
</mjo-scrollshadow>
```

## Basic Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-scrollshadow";

@customElement("example-scrollshadow-basic")
export class ExampleScrollshadowBasic extends LitElement {
    render() {
        return html`
            <div class="container">
                <h4>Vertical Scrolling</h4>
                <mjo-scrollshadow class="vertical-scroll">
                    <div class="content">
                        <p>Item 1: Lorem ipsum dolor sit amet...</p>
                        <p>Item 2: Consectetur adipiscing elit...</p>
                        <p>Item 3: Sed do eiusmod tempor incididunt...</p>
                        <p>Item 4: Ut labore et dolore magna aliqua...</p>
                        <p>Item 5: Duis aute irure dolor in reprehenderit...</p>
                        <p>Item 6: Excepteur sint occaecat cupidatat...</p>
                        <p>Item 7: Sunt in culpa qui officia deserunt...</p>
                        <p>Item 8: Mollit anim id est laborum...</p>
                    </div>
                </mjo-scrollshadow>

                <h4>Horizontal Scrolling</h4>
                <mjo-scrollshadow overflow="horizontal" class="horizontal-scroll">
                    <div class="horizontal-content">
                        <span>Item 1</span>
                        <span>Item 2</span>
                        <span>Item 3</span>
                        <span>Item 4</span>
                        <span>Item 5</span>
                        <span>Item 6</span>
                        <span>Item 7</span>
                        <span>Item 8</span>
                    </div>
                </mjo-scrollshadow>
            </div>
        `;
    }

    static styles = css`
        .container {
            padding: 1rem;
            gap: 2rem;
            display: flex;
            flex-direction: column;
        }

        .vertical-scroll {
            max-height: 200px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }

        .horizontal-scroll {
            max-width: 300px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }

        .content p {
            padding: 1rem;
            margin: 0;
            border-bottom: 1px solid #eee;
        }

        .horizontal-content {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            white-space: nowrap;
        }

        .horizontal-content span {
            padding: 0.5rem 1rem;
            background: #f0f0f0;
            border-radius: 4px;
            min-width: 100px;
            text-align: center;
        }
    `;
}
```

## Dynamic Content Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-scrollshadow";

@customElement("example-scrollshadow-dynamic")
export class ExampleScrollshadowDynamic extends LitElement {
    @state() private items = Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`);

    private addItem() {
        this.items = [...this.items, `Item ${this.items.length + 1}`];
    }

    private scrollToEnd() {
        const scrollshadow = this.shadowRoot?.querySelector("mjo-scrollshadow");
        scrollshadow?.scrollToEnd();
    }

    render() {
        return html`
            <div class="demo">
                <div class="controls">
                    <button @click=${this.addItem}>Add Item</button>
                    <button @click=${this.scrollToEnd}>Scroll to End</button>
                </div>

                <mjo-scrollshadow class="list-container">
                    <div class="list">${this.items.map((item) => html`<div class="list-item">${item}</div>`)}</div>
                </mjo-scrollshadow>
            </div>
        `;
    }

    static styles = css`
        .demo {
            max-width: 400px;
            padding: 1rem;
        }

        .controls {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .controls button {
            padding: 0.5rem 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            cursor: pointer;
        }

        .list-container {
            max-height: 200px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
        }

        .list-item {
            padding: 1rem;
            border-bottom: 1px solid #f1f5f9;
        }

        .list-item:last-child {
            border-bottom: none;
        }
    `;
}
```

## CSS Variables Styling Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-scrollshadow";

@customElement("example-scrollshadow-styling")
export class ExampleScrollshadowStyling extends LitElement {
    render() {
        return html`
            <div class="examples">
                <div class="example">
                    <h4>Subtle Shadows</h4>
                    <mjo-scrollshadow class="subtle">
                        <div class="content">${Array.from({ length: 10 }, (_, i) => html`<p>Content line ${i + 1}</p>`)}</div>
                    </mjo-scrollshadow>
                </div>

                <div class="example">
                    <h4>Custom Scrollbar</h4>
                    <mjo-scrollshadow class="custom-scrollbar">
                        <div class="content">${Array.from({ length: 10 }, (_, i) => html`<p>Content line ${i + 1}</p>`)}</div>
                    </mjo-scrollshadow>
                </div>
            </div>
        `;
    }

    static styles = css`
        .examples {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            padding: 1rem;
        }

        .example {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
        }

        mjo-scrollshadow {
            max-height: 150px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
        }

        .subtle {
            --mjo-scrollshadow-size: 5%;
            --mjo-scrollshadow-scrollbar-width: thin;
        }

        .custom-scrollbar {
            --mjo-scrollshadow-scrollbar-thumb-color: #3b82f6;
            --mjo-scrollshadow-scrollbar-track: #e5e7eb;
            --mjo-scrollshadow-scrollbar-width: auto;
        }

        .content {
            padding: 1rem;
        }

        .content p {
            margin: 0 0 0.5rem 0;
        }
    `;
}
```

## Attributes / Properties

| Name            | Type                         | Default      | Reflects | Description                                                        |
| --------------- | ---------------------------- | ------------ | -------- | ------------------------------------------------------------------ |
| `overflow`      | `"horizontal" \| "vertical"` | `"vertical"` | no       | Scroll direction - determines shadow placement and scroll behavior |
| `hideScrollbar` | `boolean`                    | `false`      | no       | Hides native scrollbar while maintaining scroll functionality      |

### Internal Query Properties

| Name         | Type             | Description                                       |
| ------------ | ---------------- | ------------------------------------------------- |
| `$container` | `HTMLDivElement` | Internal container element that handles scrolling |

## Public Methods

| Method                    | Parameters         | Returns  | Description                                         |
| ------------------------- | ------------------ | -------- | --------------------------------------------------- |
| `updateShadows()`         | -                  | `void`   | Manually recalculates and updates shadow visibility |
| `scrollToPosition()`      | `position: number` | `void`   | Scrolls to specific position with smooth behavior   |
| `scrollToEnd()`           | -                  | `void`   | Scrolls to the end of content with smooth behavior  |
| `scrollPosition` (getter) | -                  | `number` | Returns current scroll position (top or left)       |

### Method Examples

```ts
// Get reference to scrollshadow component
const scrollshadow = document.querySelector("mjo-scrollshadow") as MjoScrollshadow;

// Get current scroll position
const currentPosition = scrollshadow.scrollPosition;

// Scroll to specific position
scrollshadow.scrollToPosition(100);

// Scroll to end
scrollshadow.scrollToEnd();

// Update shadows after dynamic content changes
scrollshadow.updateShadows();
```

## Events

The component does not emit custom events but forwards native scroll events from the internal container.

### Native Events

| Event    | Target    | Description                                   |
| -------- | --------- | --------------------------------------------- |
| `scroll` | Container | Fired during scroll, triggers shadow updates  |
| `wheel`  | Container | Enhanced for cross-directional scroll support |

### Event Handling Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-scrollshadow";

@customElement("example-scrollshadow-events")
export class ExampleScrollshadowEvents extends LitElement {
    private handleScroll(event: Event) {
        const scrollshadow = event.target as MjoScrollshadow;
        console.log("Current scroll position:", scrollshadow.scrollPosition);
    }

    render() {
        return html`
            <mjo-scrollshadow @scroll=${this.handleScroll} style="max-height: 200px;">
                <div>Content that will trigger scroll events...</div>
            </mjo-scrollshadow>
        `;
    }
}
```

## Slots

| Slot      | Description                                          |
| --------- | ---------------------------------------------------- |
| (default) | Content to be placed inside the scrollable container |

## CSS Variables

| Variable                                   | Fallback                                           | Purpose                                         |
| ------------------------------------------ | -------------------------------------------------- | ----------------------------------------------- |
| `--mjo-scrollshadow-color`                 | `var(--mjoint-scrollshadow-color)` (auto-detected) | Color of the shadow gradients                   |
| `--mjo-scrollshadow-size`                  | `10%`                                              | Size/extent of shadow gradients                 |
| `--mjo-scrollshadow-scrollbar-thumb-color` | `var(--mjo-background-color-card, #cccccc)`        | Color of the scrollbar thumb                    |
| `--mjo-scrollshadow-scrollbar-track`       | `transparent`                                      | Color of the scrollbar track                    |
| `--mjo-scrollshadow-scrollbar-width`       | `thin`                                             | Width of the scrollbar (`auto`, `thin`, `none`) |

### Variable Details

#### Shadow Configuration

-   **`--mjo-scrollshadow-color`**: The component automatically detects the parent's background color and sets this internally. You can override for custom effects.
-   **`--mjo-scrollshadow-size`**: Controls how far the gradient extends. Larger values create more prominent shadows.

#### Scrollbar Styling

-   **`--mjo-scrollshadow-scrollbar-thumb-color`**: Color of the draggable scrollbar element
-   **`--mjo-scrollshadow-scrollbar-track`**: Background color behind the scrollbar
-   **`--mjo-scrollshadow-scrollbar-width`**: Controls scrollbar thickness
    -   `auto`: Browser default width
    -   `thin`: Thinner scrollbar
    -   `none`: Hidden scrollbar (same as `hideScrollbar` property)

### CSS Variables Example

```css
/* Custom shadow styling */
.my-scrollshadow {
    --mjo-scrollshadow-color: rgba(0, 0, 0, 0.1);
    --mjo-scrollshadow-size: 15%;
    --mjo-scrollshadow-scrollbar-thumb-color: #3b82f6;
    --mjo-scrollshadow-scrollbar-track: #f1f5f9;
}
```

## CSS Parts

| Part        | Description                               |
| ----------- | ----------------------------------------- |
| `container` | The internal scrollable container element |

### Parts Example

```css
/* Style the scrollable container */
mjo-scrollshadow::part(container) {
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: #fafafa;
}

/* Additional styling for specific overflow directions */
mjo-scrollshadow[overflow="horizontal"]::part(container) {
    border-left: none;
    border-right: none;
}
```

## Accessibility Notes

The component maintains native scrolling accessibility:

### Keyboard Navigation

-   **Arrow Keys**: Scroll in respective directions
-   **Page Up/Page Down**: Page-wise scrolling for vertical content
-   **Home/End**: Jump to start/end of content
-   **Tab**: Focuses scrollable content when appropriate

### Screen Reader Support

-   Preserves native scroll region announcements
-   Content remains navigable with screen reader cursor
-   Maintains semantic structure of scrolled content

### Focus Management

-   Container element can receive focus for keyboard scrolling
-   Focus indicators work naturally with shadows
-   Respects user's focus preferences

## Performance Considerations

### Efficient Shadow Updates

-   Shadows update only during scroll events
-   Uses `requestAnimationFrame` internally for smooth rendering
-   Automatic detection skips unnecessary updates when content doesn't overflow

### Background Color Detection

-   Computed only once during component initialization
-   Traverses shadow DOM boundaries efficiently
-   Caches result to avoid repeated calculations

### Memory Management

-   Event listeners properly cleaned up on disconnection
-   No memory leaks from resize observers or mutation observers

## Use Cases

### Common Implementation Patterns

1. **Fixed Height Lists**: Navigation menus, chat messages, data tables
2. **Flex Layout Children**: Components within constrained layouts
3. **Modal Content**: Scrollable modal bodies with visual feedback
4. **Dashboard Widgets**: Content cards with overflow handling
5. **Code Displays**: Syntax-highlighted code blocks

### Integration Examples

```html
<!-- With constrained height -->
<mjo-scrollshadow style="max-height: 300px;">
    <div>Long content...</div>
</mjo-scrollshadow>

<!-- In flex container -->
<div style="display: flex; flex-direction: column; height: 100vh;">
    <header>Fixed header</header>
    <mjo-scrollshadow style="flex: 1;">
        <main>Scrollable content</main>
    </mjo-scrollshadow>
</div>
```

## Browser Compatibility

-   **CSS Masks & Custom Properties**: All modern browsers
-   **Scrollbar Styling**: Limited support (Firefox `scrollbar-width`, Webkit `::-webkit-scrollbar`)
-   **Graceful Fallback**: Native scrollbars in unsupported browsers

## Summary

`<mjo-scrollshadow>` provides elegant visual feedback for scrollable content areas. Key benefits include:

-   **Automatic Shadow Detection**: Intelligent background color inheritance for seamless shadows
-   **Flexible Direction Support**: Both vertical and horizontal scrolling with appropriate shadow placement
-   **Customizable Appearance**: Full control over shadow size, color, and scrollbar styling
-   **Performance Optimized**: Efficient rendering and minimal resource usage
-   **Accessibility Preserved**: Maintains all native scrolling behaviors and keyboard navigation
-   **Developer Friendly**: Simple integration requiring only appropriate sizing constraints

The component enhances user experience by providing clear visual indicators of scrollable content while maintaining full accessibility and performance. It's particularly valuable in constrained layouts where users need immediate feedback about content overflow.

**Remember**: Always ensure the host element has appropriate size constraints (`max-height`, `height`, `max-width`, or flex properties) for the scroll functionality to activate.
