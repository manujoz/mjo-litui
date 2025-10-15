# mjo-ripple

Visual effect component that creates a Material Design-style ripple animation when the parent element is clicked.

## Index

1. [Use Cases](#use-cases)
2. [Import](#import)
3. [CSS Variables](#css-variables)
4. [Accessibility](#accessibility)
5. [Usage Examples](#usage-examples)
6. [Additional Notes](#additional-notes)

## Use Cases

The `mjo-ripple` component is designed for:

- Adding Material Design ripple effects to interactive elements
- Providing visual feedback on user clicks
- Enhancing the user experience with subtle animations
- Creating engaging and modern user interfaces

## Import

```typescript
import "mjo-litui/mjo-ripple";
```

## CSS Variables

| Variable              | Description                                                | Default        |
| --------------------- | ---------------------------------------------------------- | -------------- |
| `--mo-ripple-color`   | Color of the ripple effect                                 | `currentColor` |
| `--mo-ripple-opacity` | Opacity of the ripple effect at the start of the animation | `0.25`         |

## Accessibility

The `mjo-ripple` component is purely decorative and does not affect accessibility. It provides visual feedback without interfering with:

- Keyboard navigation (events are handled by the parent element)
- Screen readers (the component has no semantic meaning)
- Focus management (focus remains on the parent element)

**Best practices:**

- Use `mjo-ripple` as a child of interactive elements (buttons, links, etc.)
- Ensure the parent element has proper ARIA attributes and keyboard support
- The ripple effect is automatically triggered on click events from the parent element

## Usage Examples

### Basic usage within a custom button component

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-ripple";

@customElement("my-button")
export class MyButton extends LitElement {
    render() {
        return html`
            <button>
                <span>Click me</span>
                <mjo-ripple></mjo-ripple>
            </button>
        `;
    }

    static styles = css`
        button {
            position: relative;
            padding: 10px 20px;
            border: none;
            background: #1976d2;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
        }
    `;
}
```

### Customizing ripple color and opacity

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-ripple";

@customElement("my-custom-button")
export class MyCustomButton extends LitElement {
    render() {
        return html`
            <button>
                <span>Custom Ripple</span>
                <mjo-ripple></mjo-ripple>
            </button>
        `;
    }

    static styles = css`
        button {
            position: relative;
            padding: 10px 20px;
            border: none;
            background: #4caf50;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            --mo-ripple-color: rgba(255, 255, 255, 0.8);
            --mo-ripple-opacity: 0.5;
        }
    `;
}
```

### Using with different parent elements

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-ripple";

@customElement("my-card")
export class MyCard extends LitElement {
    render() {
        return html`
            <div class="card">
                <h3>Interactive Card</h3>
                <p>Click anywhere on this card</p>
                <mjo-ripple></mjo-ripple>
            </div>
        `;
    }

    static styles = css`
        .card {
            position: relative;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            overflow: hidden;
            --mo-ripple-color: #1976d2;
            --mo-ripple-opacity: 0.15;
        }
    `;
}
```

## Additional Notes

- The `mjo-ripple` component must be placed inside an element with `position: relative` or `position: absolute`
- The parent element should have `overflow: hidden` to contain the ripple effect within its boundaries
- The ripple effect is positioned using absolute positioning, covering the entire parent element
- The animation duration is fixed at 500ms
- The component automatically listens to click events on the parent element and creates ripple effects at the click position
- Multiple rapid clicks will create multiple ripple effects simultaneously
- The component cleans up after itself by removing ripple spans after the animation completes
