# mjo-icon

Flexible SVG icon component with accessibility support, theming, and interaction capabilities.

## Index

1. [Use Cases](#use-cases)
2. [Import](#import)
3. [Properties](#properties)
4. [States](#states)
5. [Public Methods](#public-methods)
6. [Events](#events)
7. [CSS Variables](#css-variables)
8. [CSS Parts](#css-parts)
9. [Accessibility](#accessibility)
10. [Usage Examples](#usage-examples)
11. [Additional Notes](#additional-notes)

## Use Cases

The `mjo-icon` component is designed for:

- Displaying SVG icons from `mjo-icons` library or custom SVG sources
- Creating clickable icon buttons with Material Design ripple effects
- Adding visual feedback with predefined animations (spin, pulse, rotate)
- Implementing accessible icon-based UI elements with proper ARIA support
- Loading states for async operations
- Consistent icon sizing across the application
- Icon integration within other components (buttons, inputs, navigation)

## Import

```typescript
import "mjo-litui/mjo-icon";
```

## Properties

| Property           | Type                                      | Default     | Description                                                          | Required |
| ------------------ | ----------------------------------------- | ----------- | -------------------------------------------------------------------- | -------- |
| `src`              | `string`                                  | `undefined` | SVG content as string to be rendered                                 | No       |
| `size`             | `"small" \| "medium" \| "large" \| "xl"`  | `undefined` | Predefined size of the icon                                          | No       |
| `animation`        | `"none" \| "spin" \| "pulse" \| "rotate"` | `"none"`    | Animation effect applied to the icon                                 | No       |
| `clickable`        | `boolean`                                 | `false`     | Enables click handling and interactive states (hover, focus, ripple) | No       |
| `disabled`         | `boolean`                                 | `false`     | Disables the icon and reduces opacity                                | No       |
| `loading`          | `boolean`                                 | `false`     | Shows loading spinner instead of the icon                            | No       |
| `aria-label`       | `string`                                  | `null`      | Accessible label for the icon                                        | No       |
| `aria-labelledby`  | `string`                                  | `undefined` | ID of element that labels the icon                                   | No       |
| `aria-describedby` | `string`                                  | `undefined` | ID of element that describes the icon                                | No       |

## States

No public states are exposed.

## Public Methods

| Method  | Parameters | Description                           | Returns |
| ------- | ---------- | ------------------------------------- | ------- |
| `focus` | -          | Sets focus to the icon (if clickable) | `void`  |
| `blur`  | -          | Removes focus from the icon           | `void`  |

## Events

| Event            | Type                | Description                                          | Detail                                              |
| ---------------- | ------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| `mjo-icon:click` | `MjoIconClickEvent` | Fired when the icon is clicked (only when clickable) | `{ element: MjoIcon }`                              |
| `mjo-icon:load`  | `MjoIconLoadEvent`  | Fired when SVG content is successfully loaded        | `{ element: MjoIcon, src: string }`                 |
| `mjo-icon:error` | `MjoIconErrorEvent` | Fired when SVG content is invalid or fails to load   | `{ element: MjoIcon, error: string, src?: string }` |

## CSS Variables

| Variable                             | Description                               | Default                  |
| ------------------------------------ | ----------------------------------------- | ------------------------ |
| `--mjo-icon-disabled-opacity`        | Opacity when the icon is disabled         | `0.5`                    |
| `--mjo-icon-transition`              | Transition effect for the icon            | `all 0.3s`               |
| `--mjo-icon-border-radius`           | Border radius for clickable icons         | `999px`                  |
| `--mjo-icon-padding`                 | Padding for clickable icons               | `0.2em`                  |
| `--mjo-icon-clickable-focus-outline` | Outline style for focused clickable icons | `2px solid currentColor` |
| `--mjo-icon-size-small`              | Font size for small icons                 | `16px`                   |
| `--mjo-icon-size-medium`             | Font size for medium icons                | `24px`                   |
| `--mjo-icon-size-large`              | Font size for large icons                 | `32px`                   |
| `--mjo-icon-size-xl`                 | Font size for extra large icons           | `48px`                   |
| `--mjo-icon-loading-spin-duration`   | Duration of the loading spinner animation | `1s`                     |

## CSS Parts

| Part   | Description          | Element |
| ------ | -------------------- | ------- |
| `icon` | The SVG icon element | `div`   |

## Accessibility

### ARIA Attributes

The component implements comprehensive ARIA semantics:

- Uses `aria-label` to provide accessible names for icons
- Supports `aria-labelledby` to reference labeling elements
- Supports `aria-describedby` for additional descriptive content
- Automatically assigns `role="button"` when `clickable` is `true`
- Manages `tabindex` based on clickable and disabled states
- Properly handles keyboard interaction for clickable icons

### Keyboard Interaction

For clickable icons:

- **Enter**: Activates the icon (triggers click event)
- **Space**: Activates the icon (triggers click event)
- **Tab**: Moves focus to/from the icon

### Best Practices

- Always provide `aria-label` for icons without accompanying text
- Use semantic icon choices that match the action or information they represent
- Use `clickable` for interactive icons to enable proper accessibility features
- Consider using `loading` state for async operations
- Use appropriate `size` values for visual hierarchy
- Avoid using icons alone for critical actions; pair with text when possible
- Use `disabled` to indicate unavailable actions

### High Contrast Mode Support

The component adapts to high contrast preferences through:

- Icon inherits `currentColor` for proper contrast
- Focus outline is visible and adjustable via CSS variables

### Reduced Motion Support

For users who prefer reduced motion:

- Loading spinner animation is handled via native SVG animation
- All CSS transitions respect system preferences

## Usage Examples

### Basic Icon

```html
<script type="module">
    import { AiOutlineHome } from "mjo-icons/ai";
</script>

<mjo-icon .src="${AiOutlineHome}" aria-label="Home"></mjo-icon>
```

### Icon Sizes

```html
<script type="module">
    import { AiOutlineStar } from "mjo-icons/ai";
</script>

<mjo-icon .src="${AiOutlineStar}" size="small" aria-label="Star"></mjo-icon>
<mjo-icon .src="${AiOutlineStar}" size="medium" aria-label="Star"></mjo-icon>
<mjo-icon .src="${AiOutlineStar}" size="large" aria-label="Star"></mjo-icon>
<mjo-icon .src="${AiOutlineStar}" size="xl" aria-label="Star"></mjo-icon>
```

### Animated Icons

```html
<script type="module">
    import { MdRefresh } from "mjo-icons/md";
    import { AiOutlineHeart } from "mjo-icons/ai";
</script>

<!-- Spinning icon (useful for loading indicators) -->
<mjo-icon .src="${MdRefresh}" animation="spin" aria-label="Refreshing"></mjo-icon>

<!-- Pulsing icon (useful for notifications) -->
<mjo-icon .src="${AiOutlineHeart}" animation="pulse" aria-label="Favorite"></mjo-icon>

<!-- Rotating icon -->
<mjo-icon .src="${MdRefresh}" animation="rotate" aria-label="Syncing"></mjo-icon>
```

### Clickable Icons

```html
<script type="module">
    import { AiOutlineHeart, FaTrash } from "mjo-icons/ai";
</script>

<mjo-icon .src="${AiOutlineHeart}" clickable aria-label="Like this item" @mjo-icon:click="${(e) => console.log('Liked!')}"></mjo-icon>

<mjo-icon .src="${FaTrash}" clickable aria-label="Delete item" @mjo-icon:click="${(e) => console.log('Deleted!')}"></mjo-icon>
```

### Loading State

```html
<mjo-icon size="large" loading aria-label="Loading"></mjo-icon>
```

### Disabled Icon

```html
<script type="module">
    import { AiOutlineSetting } from "mjo-icons/ai";
</script>

<mjo-icon .src="${AiOutlineSetting}" clickable disabled aria-label="Settings (disabled)"></mjo-icon>
```

### Custom SVG Source

```html
<mjo-icon
    src="<svg viewBox='0 0 24 24' fill='currentColor'><path d='M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z'/></svg>"
    aria-label="Shield"
></mjo-icon>
```

### Handling Events

```html
<script type="module">
    import { AiOutlineHeart } from "mjo-icons/ai";
</script>

<mjo-icon id="favorite-icon" .src="${AiOutlineHeart}" clickable aria-label="Toggle favorite"></mjo-icon>

<script>
    const icon = document.getElementById("favorite-icon");

    icon.addEventListener("mjo-icon:click", (e) => {
        console.log("Icon clicked:", e.detail.element);
    });

    icon.addEventListener("mjo-icon:load", (e) => {
        console.log("Icon loaded successfully:", e.detail.src);
    });

    icon.addEventListener("mjo-icon:error", (e) => {
        console.error("Icon failed to load:", e.detail.error);
    });
</script>
```

### Programmatic Control

```javascript
const icon = document.querySelector("mjo-icon");

// Focus the icon (if clickable)
icon.focus();

// Remove focus
icon.blur();
```

### Button Integration

```html
<script type="module">
    import { FaPlus, FaEdit, FaTrash } from "mjo-icons/fa";
</script>

<mjo-button>
    <mjo-icon .src="${FaPlus}" size="small"></mjo-icon>
    Add Item
</mjo-button>

<mjo-button variant="ghost">
    <mjo-icon .src="${FaEdit}" size="small"></mjo-icon>
    Edit
</mjo-button>

<mjo-button color="error">
    <mjo-icon .src="${FaTrash}" size="small"></mjo-icon>
    Delete
</mjo-button>
```

### Styling with CSS Parts

```css
/* Style the icon container */
mjo-icon::part(icon) {
    border: 2px solid currentColor;
    padding: 4px;
}

/* Custom colors for specific contexts */
.success-icon::part(icon) {
    color: green;
}

.error-icon::part(icon) {
    color: red;
}
```

### Styling with CSS Variables

```css
/* Custom sizes */
mjo-icon {
    --mjo-icon-size-small: 14px;
    --mjo-icon-size-medium: 20px;
    --mjo-icon-size-large: 28px;
    --mjo-icon-size-xl: 40px;
}

/* Custom clickable styles */
mjo-icon[clickable] {
    --mjo-icon-padding: 0.3em;
    --mjo-icon-border-radius: 8px;
    --mjo-icon-transition: all 0.2s ease;
}

/* Custom disabled opacity */
mjo-icon[disabled] {
    --mjo-icon-disabled-opacity: 0.3;
}

/* Custom focus outline */
mjo-icon[clickable] {
    --mjo-icon-clickable-focus-outline: 3px solid blue;
}
```

### Icon Collections

```html
<script type="module">
    import { AiOutlineHome, AiOutlineMenu, MdArrowBack, MdArrowForward, MdSearch, MdClose } from "mjo-icons/ai";
</script>

<!-- Navigation Icons -->
<div class="icon-group">
    <mjo-icon .src="${AiOutlineHome}" clickable aria-label="Home"></mjo-icon>
    <mjo-icon .src="${AiOutlineMenu}" clickable aria-label="Menu"></mjo-icon>
    <mjo-icon .src="${MdArrowBack}" clickable aria-label="Back"></mjo-icon>
    <mjo-icon .src="${MdArrowForward}" clickable aria-label="Forward"></mjo-icon>
    <mjo-icon .src="${MdSearch}" clickable aria-label="Search"></mjo-icon>
    <mjo-icon .src="${MdClose}" clickable aria-label="Close"></mjo-icon>
</div>

<style>
    .icon-group {
        display: flex;
        gap: 8px;
    }
</style>
```

## Additional Notes

### SVG Validation

The component performs automatic SVG validation when the `src` property is set:

- Validates that the content starts with `<svg` and ends with `</svg>`
- Uses `DOMParser` to check for parsing errors
- Fires `mjo-icon:error` event if validation fails
- Fires `mjo-icon:load` event when SVG is successfully validated

### Ripple Effect

When `clickable` is `true` and the icon is not `disabled`:

- Automatically includes `mjo-ripple` component for Material Design-style feedback
- Ripple effect is triggered on click
- Ripple respects `prefers-reduced-motion` user preferences

### Loading State

The loading state provides visual feedback for async operations:

- Shows an animated circular spinner
- Spinner size respects the `size` property
- Loading icon uses native SVG animation for better performance
- Automatically hides the main icon content when loading

### Icon Sources

The component works seamlessly with:

- **mjo-icons library**: Pre-packaged icon sets (AI, FA, MD, BS, etc.)
- **Custom SVG strings**: Any valid SVG markup
- **Dynamic icon switching**: Change `src` property at runtime

### Color Inheritance

Icons inherit `currentColor` from their parent context:

```css
/* Icon will be red */
.red-icon {
    color: red;
}
```

```html
<div class="red-icon">
    <mjo-icon .src="${someIcon}" aria-label="Red icon"></mjo-icon>
</div>
```

### Performance Considerations

The component uses:

- `unsafeSVG` directive for efficient SVG rendering
- Conditional rendering for loading and error states
- Efficient event handling with proper cleanup in `disconnectedCallback`
- CSS custom properties for dynamic theming without JavaScript recalculation
- SVG validation on `connectedCallback` and when `src` changes

### Clickable Icon Behavior

When `clickable` is `true`:

- Automatically assigns `role="button"` for screen readers
- Adds `tabindex="0"` for keyboard navigation
- Enables hover effects (background color change)
- Includes focus-visible outline for accessibility
- Supports Enter and Space key activation
- Adds scale effect on active state (`:active`)
- Includes ripple effect for visual feedback

### Animation Behavior

Each animation has specific characteristics:

- **spin**: Continuous 360-degree rotation (useful for loading indicators)
- **pulse**: Opacity animation between 1 and 0.5 (useful for notifications)
- **rotate**: Back-and-forth rotation between 0 and 180 degrees (useful for sync indicators)

All animations respect `prefers-reduced-motion` user preferences.

### Integration with mjo-icons

The component is designed to work seamlessly with the `mjo-icons` package:

```bash
npm install mjo-icons
```

```typescript
import { AiOutlineHome, AiOutlineStar } from "mjo-icons/ai";
import { FaEdit, FaTrash } from "mjo-icons/fa";
import { MdSearch, MdMenu } from "mjo-icons/md";
import { BsHeart, BsDownload } from "mjo-icons/bs";
```

The `mjo-icons` package provides thousands of icons from popular icon sets, all optimized as SVG strings.
