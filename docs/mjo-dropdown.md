# mjo-dropdown

Accessible dropdown component that displays floating content relative to its trigger element.

## Index

1. [Use Cases](#use-cases)
2. [Import](#import)
3. [Properties](#properties)
4. [Public Methods](#public-methods)
5. [Events](#events)
6. [CSS Variables](#css-variables)
7. [CSS Parts](#css-parts)
8. [Accessibility](#accessibility)
9. [Usage Examples](#usage-examples)
10. [Additional Notes](#additional-notes)

## Use Cases

The `mjo-dropdown` component is designed for:

- Context menus and action lists
- Tooltips and informational overlays
- Custom select inputs and pickers
- Form field suggestions and autocomplete
- Navigation mega-menus
- User profile and settings panels
- Interactive content that requires positioning relative to a trigger element

## Import

```typescript
import "mjo-litui/mjo-dropdown";
```

## Properties

| Property                   | Type                                                                                                                                 | Default           | Description                                                                             | Required |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------------------------- | -------- |
| `idDropdown`               | `string`                                                                                                                             | `undefined`       | Custom ID for the dropdown container element                                            | No       |
| `fullwidth`                | `boolean`                                                                                                                            | `false`           | Makes dropdown match the width of the trigger element                                   | No       |
| `disabled`                 | `boolean`                                                                                                                            | `false`           | Disables the dropdown                                                                   | No       |
| `scrollLocked`             | `boolean`                                                                                                                            | `false`           | Locks scroll when dropdown is open                                                      | No       |
| `isOpen`                   | `boolean`                                                                                                                            | `false`           | Controls the open/closed state of the dropdown                                          | No       |
| `css`                      | `CSSResult`                                                                                                                          | `undefined`       | Custom styles to apply to dropdown content                                              | No       |
| `html`                     | `TemplateResult<1>`                                                                                                                  | `undefined`       | Template content to display inside the dropdown                                         | No       |
| `behaviour`                | `"hover" \| "click"`                                                                                                                 | `"hover"`         | Interaction mode for opening the dropdown                                               | No       |
| `width`                    | `string`                                                                                                                             | `undefined`       | Custom width for the dropdown (px or other CSS units)                                   | No       |
| `height`                   | `string`                                                                                                                             | `undefined`       | Maximum height for the dropdown (px or other CSS units)                                 | No       |
| `preventCloseOnInnerClick` | `boolean`                                                                                                                            | `false`           | Prevents dropdown from closing when clicking inside its content                         | No       |
| `position`                 | `"left-bottom" \| "center-bottom" \| "right-bottom" \| "left-top" \| "center-top" \| "right-top" \| "left-middle" \| "right-middle"` | `"center-bottom"` | Positioning strategy for the dropdown relative to trigger                               | No       |
| `restoreFocus`             | `boolean`                                                                                                                            | `true`            | Restores focus to trigger element when dropdown closes                                  | No       |
| `suppressOpenSelectors`    | `string[]`                                                                                                                           | `undefined`       | CSS selectors that prevent dropdown opening when clicked (only for `behaviour="click"`) | No       |

## Public Methods

| Method           | Parameters    | Description                                        | Returns                         |
| ---------------- | ------------- | -------------------------------------------------- | ------------------------------- |
| `open`           | -             | Programmatically opens the dropdown                | `void`                          |
| `close`          | `ev?: Event`  | Programmatically closes the dropdown               | `void`                          |
| `updatePosition` | -             | Recalculates and updates dropdown position         | `void`                          |
| `scrollToTop`    | `top: number` | Scrolls dropdown content to specified top position | `void`                          |
| `getScroll`      | -             | Gets current scroll position of dropdown           | `{ top: number; left: number }` |
| `getHeigth`      | -             | Gets the current height of the dropdown container  | `number`                        |

## Events

| Event                | Type                    | Description                    |
| -------------------- | ----------------------- | ------------------------------ |
| `mjo-dropdown:open`  | `MjoDropdownOpenEvent`  | Fired when the dropdown opens  |
| `mjo-dropdown:close` | `MjoDropdownCloseEvent` | Fired when the dropdown closes |

## CSS Variables

| Variable                          | Description                                | Default                                                 |
| --------------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| `--mjo-dropdown-background-color` | Background color of the dropdown container | `var(--mjo-background-color, transparent)`              |
| `--mjo-dropdown-foreground-color` | Text color of the dropdown content         | `currentColor`                                          |
| `--mjo-dropdown-border-radius`    | Border radius of the dropdown container    | `var(--mjo-radius-medium, 5px)`                         |
| `--mjo-dropdown-box-shadow`       | Box shadow of the dropdown container       | `var(--mjo-box-shadow, 0px 0px 7px rgba(0, 0, 0, 0.5))` |

## CSS Parts

| Part                 | Description                                         | Element |
| -------------------- | --------------------------------------------------- | ------- |
| `dropdown-container` | The floating container holding the dropdown content | `div`   |

## Accessibility

### ARIA Attributes

The component implements comprehensive ARIA semantics:

- The trigger element has `role="button"` to indicate interactivity
- Uses `aria-haspopup="true"` to indicate popup functionality
- Uses `aria-expanded` to communicate the open/closed state to assistive technologies
- Uses `aria-controls` to associate the trigger with the dropdown container
- The dropdown container has `role="dialog"` for screen reader announcement
- Uses `aria-modal="false"` since the dropdown doesn't block interaction with the rest of the page

### Keyboard Interaction

- **Escape**: Closes the dropdown when open
- **Tab**: Standard focus management through the document
- Focus is automatically restored to the trigger element when the dropdown closes (controlled by `restoreFocus` property)

### Best Practices

- Ensure trigger elements are keyboard accessible (buttons or interactive elements)
- Use `behaviour="click"` for dropdowns containing interactive content
- Use `behaviour="hover"` for simple informational tooltips
- Provide clear visual indication of the trigger element's interactive state
- Use semantic HTML inside the dropdown content template
- Consider using `preventCloseOnInnerClick` for forms or interactive content within the dropdown
- Use `aria-label` or visible text on trigger elements for screen reader users
- Ensure sufficient color contrast between dropdown content and background

## Usage Examples

### Basic Hover Dropdown

```html
<mjo-dropdown
    behaviour="hover"
    .html="${html`
        <div style="padding: 1rem; background: white; border: 1px solid #ccc;">
            <p>Tooltip content</p>
        </div>
    `}"
>
    <button>Hover me</button>
</mjo-dropdown>
```

### Click Dropdown with Menu

```html
<script type="module">
    import { html } from "lit";

    const menuTemplate = html`
        <div style="padding: 0.5rem; min-width: 200px;">
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li><a href="#profile" style="display: block; padding: 0.5rem;">Profile</a></li>
                <li><a href="#settings" style="display: block; padding: 0.5rem;">Settings</a></li>
                <li><a href="#logout" style="display: block; padding: 0.5rem;">Logout</a></li>
            </ul>
        </div>
    `;

    document.querySelector("#user-menu").html = menuTemplate;
</script>

<mjo-dropdown id="user-menu" behaviour="click">
    <button>User Menu ▼</button>
</mjo-dropdown>
```

### Dropdown with Custom Positioning

```html
<mjo-dropdown
    behaviour="click"
    position="right-bottom"
    .html="${html`
        <div style="padding: 1rem;">Content positioned to the right</div>
    `}"
>
    <button>Right Aligned</button>
</mjo-dropdown>

<mjo-dropdown
    behaviour="click"
    position="center-top"
    .html="${html`
        <div style="padding: 1rem;">Content above trigger</div>
    `}"
>
    <button>Open Above</button>
</mjo-dropdown>
```

### Form Dropdown with Prevent Close

```html
<script type="module">
    import { html } from "lit";

    const formTemplate = html`
        <form
            style="padding: 1.5rem; background: white; min-width: 300px;"
            @submit="${(e) => {
                e.preventDefault();
                console.log("Form submitted");
                // Close dropdown programmatically after submission
                document.querySelector("#form-dropdown").close();
            }}"
        >
            <label>
                Name:
                <input type="text" name="name" style="display: block; width: 100%; margin-top: 0.25rem;" />
            </label>
            <button type="submit" style="margin-top: 1rem;">Submit</button>
        </form>
    `;

    document.querySelector("#form-dropdown").html = formTemplate;
</script>

<mjo-dropdown id="form-dropdown" behaviour="click" preventCloseOnInnerClick>
    <button>Open Form</button>
</mjo-dropdown>
```

### Full Width Dropdown

```html
<mjo-dropdown
    behaviour="click"
    fullwidth
    .html="${html`
        <div style="padding: 1rem;">
            <p>This dropdown matches the width of its trigger</p>
        </div>
    `}"
>
    <input type="text" placeholder="Select option..." readonly style="width: 300px; cursor: pointer;" />
</mjo-dropdown>
```

### Dropdown with Custom ID and Styling

```html
<style>
    #custom-dropdown-content::part(dropdown-container) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
    }
</style>

<mjo-dropdown
    idDropdown="custom-dropdown-content"
    behaviour="hover"
    .html="${html`
        <div style="padding: 1rem;">
            <h4 style="margin: 0 0 0.5rem;">Styled Dropdown</h4>
            <p style="margin: 0;">Custom gradient background</p>
        </div>
    `}"
>
    <button>Styled Dropdown</button>
</mjo-dropdown>
```

### Programmatic Control

```javascript
const dropdown = document.querySelector("mjo-dropdown");

// Open dropdown programmatically
dropdown.open();

// Close dropdown programmatically
dropdown.close();

// Update position (useful after content changes)
dropdown.updatePosition();

// Get scroll position
const scroll = dropdown.getScroll();
console.log("Scroll top:", scroll.top);

// Scroll to top
dropdown.scrollToTop(0);

// Get dropdown height
const height = dropdown.getHeigth();
console.log("Dropdown height:", height);
```

### Handling Events

```html
<script>
    const dropdown = document.querySelector("#event-dropdown");

    dropdown.addEventListener("mjo-dropdown:open", (e) => {
        console.log("Dropdown opened");
    });

    dropdown.addEventListener("mjo-dropdown:close", (e) => {
        console.log("Dropdown closed");
    });
</script>

<mjo-dropdown id="event-dropdown" behaviour="click" .html="${html`<div style="padding: 1rem;">Content</div>`}">
    <button>Toggle Dropdown</button>
</mjo-dropdown>
```

### Dropdown with Custom CSS Styles

```html
<script type="module">
    import { html, css } from "lit";

    const customStyles = css`
        .dropdown-menu {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 0.5rem;
        }
        .dropdown-menu a {
            display: block;
            padding: 0.5rem 1rem;
            color: #212529;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.15s;
        }
        .dropdown-menu a:hover {
            background-color: #e9ecef;
        }
    `;

    const menuContent = html`
        <div class="dropdown-menu">
            <a href="#">Item 1</a>
            <a href="#">Item 2</a>
            <a href="#">Item 3</a>
        </div>
    `;

    const dropdown = document.querySelector("#styled-dropdown");
    dropdown.css = customStyles;
    dropdown.html = menuContent;
</script>

<mjo-dropdown id="styled-dropdown" behaviour="click">
    <button>Custom Styled Menu</button>
</mjo-dropdown>
```

### Suppress Open on Specific Elements

```html
<script type="module">
    import { html } from "lit";

    const contentWithButtons = html`
        <div style="padding: 1rem;">
            <p>Click anywhere to close, except the "Keep Open" button</p>
            <button class="keep-open">Keep Open</button>
            <button>Normal Close</button>
        </div>
    `;

    const dropdown = document.querySelector("#suppress-dropdown");
    dropdown.html = contentWithButtons;
    dropdown.suppressOpenSelectors = [".keep-open"];
</script>

<mjo-dropdown id="suppress-dropdown" behaviour="click">
    <button>Open with Suppression</button>
</mjo-dropdown>
```

### Scroll Locked Dropdown

```html
<mjo-dropdown
    behaviour="click"
    scrollLocked
    .html="${html`
        <div style="padding: 2rem; max-height: 400px; overflow-y: auto;">
            <h3>Modal-like Dropdown</h3>
            <p>Page scrolling is locked while this dropdown is open</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <!-- More content -->
        </div>
    `}"
>
    <button>Open Modal Dropdown</button>
</mjo-dropdown>
```

### Styling with CSS Variables

```css
mjo-dropdown {
    --mjo-dropdown-background-color: #ffffff;
    --mjo-dropdown-foreground-color: #333333;
    --mjo-dropdown-border-radius: 12px;
    --mjo-dropdown-box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}
```

## Additional Notes

### Dynamic Positioning

The dropdown automatically calculates its position based on:

- The trigger element's position
- The `position` property value
- Available viewport space
- The dropdown's content size

The component includes intelligent collision detection that adjusts the position if the dropdown would overflow the viewport boundaries. For example, a `bottom` positioned dropdown will automatically flip to `top` if there isn't enough space below.

### Container Architecture

The dropdown creates a `mjo-dropdown-container` element that is appended to `document.body`. This architecture allows the dropdown to:

- Appear above any content regardless of parent element constraints (z-index stacking contexts)
- Position correctly relative to scrolled content
- Work correctly with `position: relative` parent elements
- Be styled independently from the trigger element

### Theme Integration

If a `mjo-theme` component is found in the component ancestry, the dropdown container is automatically wrapped in a clone of that theme, ensuring consistent theming even though the dropdown is rendered in `document.body`.

### Scroll Lock Behavior

When `scrollLocked` is `true`:

- Document body scrolling is prevented while the dropdown is open
- The dropdown itself remains scrollable if its content exceeds the `height` property
- Scroll position is restored when the dropdown closes
- Multiple scroll locks are handled correctly (last lock wins)

### Focus Management

The component provides robust focus management:

- Focus is stored when the dropdown opens (if `restoreFocus` is `true`)
- Focus is automatically restored to the trigger element when the dropdown closes
- This ensures a seamless keyboard navigation experience
- Set `restoreFocus` to `false` if you need custom focus management

### Click vs Hover Behavior

**Hover behavior:**

- Opens on `mouseenter` of the trigger element
- Closes on `mouseleave` of the dropdown container
- Best for tooltips and simple informational content
- No focus management needed

**Click behavior:**

- Opens/closes on click of the trigger element
- Closes on clicking outside the dropdown
- Supports `Escape` key to close
- Includes debouncing to prevent immediate close after open
- Best for interactive content like forms and menus
- Supports `suppressOpenSelectors` to prevent opening on specific child element clicks

### Performance Considerations

The component uses:

- Efficient event delegation for global click/scroll handlers
- Debouncing to prevent rapid open/close cycles
- `requestAnimationFrame` for position updates
- Cleanup of event listeners in `disconnectedCallback`
- Minimal DOM manipulation through the shadow DOM boundary

### Width and Height Control

- Use `fullwidth` to automatically match the trigger element's width
- Use `width` property for fixed width (supports any CSS unit)
- Use `height` property to set maximum height with automatic scrolling
- The dropdown automatically adapts to content size when no dimensions are specified
- Maximum width is constrained to `calc(100vw - 20px)` to prevent viewport overflow

### Suppress Open Selectors

The `suppressOpenSelectors` property allows fine-grained control over click behavior:

- Only applies when `behaviour="click"`
- Accepts an array of CSS selectors
- If any element in the click path matches a selector, the dropdown won't open
- Useful for dropdowns with multiple interactive trigger areas
- Example: Prevent opening when clicking a clear button inside a search input

### Event Timing

Events are dispatched at specific lifecycle moments:

- `mjo-dropdown:open` fires immediately after the dropdown becomes visible
- `mjo-dropdown:close` fires immediately when the dropdown starts closing
- Both events bubble and are composed, making them accessible through shadow DOM boundaries
