# mjo-button

Fully accessible button component with multiple variants, interactive states, and comprehensive ARIA support.

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

The `mjo-button` component is designed for:

- Standard clickable actions in user interfaces
- Form submissions with type variants (submit, reset, button, menu)
- Toggle buttons for on/off states
- Loading states for async operations
- Interactive elements with Material Design ripple effects
- Semantic color-coded actions (primary, secondary, success, info, warning, error)
- Icon-enhanced buttons with start/end icon positioning
- Fully accessible form integration

## Import

```typescript
import "mjo-litui/mjo-button";
```

## Properties

| Property      | Type                                                                      | Default     | Description                                                      | Required |
| ------------- | ------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- | -------- |
| `fullwidth`   | `boolean`                                                                 | `false`     | Makes the button take full width of its container                | No       |
| `disabled`    | `boolean`                                                                 | `false`     | Disables the button                                              | No       |
| `loading`     | `boolean`                                                                 | `false`     | Shows loading indicator and disables interaction                 | No       |
| `rounded`     | `boolean`                                                                 | `false`     | Makes the button fully rounded (circular)                        | No       |
| `toggleable`  | `boolean`                                                                 | `false`     | Enables toggle functionality                                     | No       |
| `smallCaps`   | `boolean`                                                                 | `false`     | Applies small-caps font variant                                  | No       |
| `noink`       | `boolean`                                                                 | `false`     | Disables ripple effect                                           | No       |
| `startIcon`   | `string`                                                                  | `undefined` | SVG string for icon at the start of the button                   | No       |
| `endIcon`     | `string`                                                                  | `undefined` | SVG string for icon at the end of the button                     | No       |
| `size`        | `"small" \| "medium" \| "large"`                                          | `"medium"`  | Size variant of the button                                       | No       |
| `color`       | `"primary" \| "secondary" \| "success" \| "info" \| "warning" \| "error"` | `"primary"` | Semantic color scheme                                            | No       |
| `variant`     | `"default" \| "ghost" \| "dashed" \| "link" \| "text" \| "flat"`          | `"default"` | Visual style variant                                             | No       |
| `type`        | `"button" \| "submit" \| "reset" \| "menu"`                               | `"button"`  | Button type for form handling                                    | No       |
| `buttonLabel` | `string`                                                                  | `undefined` | ARIA label for the button                                        | No       |
| `describedBy` | `string`                                                                  | `undefined` | ID of element that describes the button (for `aria-describedby`) | No       |

## States

| State    | Type      | Description                                                     |
| -------- | --------- | --------------------------------------------------------------- |
| `toggle` | `boolean` | Internal toggle state (only active when `toggleable` is `true`) |

## Public Methods

| Method          | Parameters               | Description                                           | Returns |
| --------------- | ------------------------ | ----------------------------------------------------- | ------- |
| `focus`         | `options?: FocusOptions` | Sets focus to the button                              | `void`  |
| `blur`          | -                        | Removes focus from the button                         | `void`  |
| `click`         | -                        | Simulates a click on the button                       | `void`  |
| `setLoading`    | `loading: boolean`       | Sets the button as busy/loading                       | `void`  |
| `togglePressed` | -                        | Toggles the button pressed state (only if toggleable) | `void`  |

## Events

| Event                       | Type                          | Description                                                   | Detail                                                                |
| --------------------------- | ----------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- |
| `mjo-button:click`          | `MjoButtonClickEvent`         | Fired when the button is clicked                              | `{ element: MjoButton, toggle?: boolean, originalEvent: MouseEvent }` |
| `mjo-button:toggle`         | `MjoButtonToggleEvent`        | Fired when toggle state changes (only when `toggleable=true`) | `{ element: MjoButton, pressed: boolean, previousState: boolean }`    |
| `mjo-button:loading-change` | `MjoButtonLoadingChangeEvent` | Fired when loading state changes                              | `{ element: MjoButton, loading: boolean }`                            |

## CSS Variables

| Variable                              | Description                         | Default                                   |
| ------------------------------------- | ----------------------------------- | ----------------------------------------- |
| `--mjo-button-background-color`       | Background color of the button      | Based on `color` and `variant` properties |
| `--mjo-button-background-color-hover` | Background color on hover           | Based on `color` and `variant` properties |
| `--mjo-button-border-radius`          | Border radius of the button         | `var(--mjo-radius-medium, 5px)`           |
| `--mjo-button-border`                 | Border style                        | Based on `variant` property               |
| `--mjo-button-color`                  | Text color                          | Based on `color` and `variant` properties |
| `--mjo-button-font-size`              | Font size                           | `1rem`                                    |
| `--mjo-button-font-weight`            | Font weight                         | `normal`                                  |
| `--mjo-button-font-family`            | Font family                         | `inherit`                                 |
| `--mjo-button-gap`                    | Gap between button content elements | `5px`                                     |
| `--mjo-button-padding`                | Internal padding                    | `calc(1em / 2 - 1px) calc(1em / 2 + 2px)` |
| `--mjo-button-opacity-hover`          | Opacity on hover                    | `1`                                       |
| `--mjo-button-loading-color`          | Color of the loading indicator      | Based on `color` property                 |

## CSS Parts

| Part         | Description                                          | Element          |
| ------------ | ---------------------------------------------------- | ---------------- |
| `button`     | The native button element                            | `button`         |
| `start-icon` | The start icon element (via exportparts)             | `mjo-icon`       |
| `end-icon`   | The end icon element (via exportparts)               | `mjo-icon`       |
| `text`       | The typography wrapper around the button text        | `mjo-typography` |
| `loading`    | The loading indicator element (visible when loading) | `div`            |

## Accessibility

### ARIA Attributes

The component implements comprehensive ARIA semantics:

- Uses `aria-busy` to indicate loading state
- Uses `aria-pressed` for toggle buttons (when `toggleable` is `true`)
- Supports custom `aria-label` via `buttonLabel` property
- Supports `aria-describedby` via `describedBy` property
- Properly manages `tabindex` based on disabled state
- Disables interaction when `disabled` or `loading` is `true`

### Keyboard Interaction

Standard button keyboard interaction:

- **Enter/Space**: Activates the button (when focused)
- **Tab**: Moves focus to/from the button

### Best Practices

- Use semantic `color` values to indicate action types (e.g., `error` for destructive actions)
- Provide clear text content or `buttonLabel` for screen readers
- Use `loading` state for async operations to prevent duplicate submissions
- Use `toggleable` for on/off state buttons with proper `aria-pressed` support
- Consider using `disabled` to prevent actions that aren't currently available
- Use appropriate `type` values for form integration (`submit`, `reset`, `button`)

### High Contrast Mode Support

The component adapts to high contrast preferences by:

- Increasing border width (2px) in high contrast mode
- Applying increased outline width (3px) for focused buttons

### Reduced Motion Support

For users who prefer reduced motion:

- All transitions are disabled
- Loading indicator uses a static striped pattern instead of animation

## Usage Examples

### Basic Button

```html
<mjo-button>Click me</mjo-button>
```

### Button Variants

```html
<!-- Default/Solid variant -->
<mjo-button variant="default">Default</mjo-button>

<!-- Ghost variant (transparent background) -->
<mjo-button variant="ghost">Ghost</mjo-button>

<!-- Flat variant (subtle background) -->
<mjo-button variant="flat">Flat</mjo-button>

<!-- Dashed border variant -->
<mjo-button variant="dashed">Dashed</mjo-button>

<!-- Link style variant -->
<mjo-button variant="link">Link</mjo-button>

<!-- Text only variant -->
<mjo-button variant="text">Text</mjo-button>
```

### Semantic Colors

```html
<mjo-button color="primary">Primary</mjo-button>
<mjo-button color="secondary">Secondary</mjo-button>
<mjo-button color="success">Success</mjo-button>
<mjo-button color="info">Info</mjo-button>
<mjo-button color="warning">Warning</mjo-button>
<mjo-button color="error">Error</mjo-button>
```

### Button Sizes

```html
<mjo-button size="small">Small</mjo-button>
<mjo-button size="medium">Medium</mjo-button>
<mjo-button size="large">Large</mjo-button>
```

### Buttons with Icons

```html
<script type="module">
    import { BsHeart, BsTrash } from "mjo-icons/bs";
</script>

<!-- Icon at start -->
<mjo-button .startIcon="${BsHeart}">Like</mjo-button>

<!-- Icon at end -->
<mjo-button .endIcon="${BsTrash}">Delete</mjo-button>

<!-- Icon only (rounded) -->
<mjo-button .startIcon="${BsHeart}" rounded></mjo-button>
```

### Loading State

```html
<mjo-button loading>Loading...</mjo-button>

<script>
    const button = document.querySelector("mjo-button");

    button.addEventListener("mjo-button:click", async (e) => {
        button.setLoading(true);

        try {
            await performAsyncOperation();
        } finally {
            button.setLoading(false);
        }
    });
</script>
```

### Toggle Button

```html
<mjo-button toggleable>Toggle me</mjo-button>

<script>
    const button = document.querySelector("mjo-button");

    button.addEventListener("mjo-button:toggle", (e) => {
        console.log("Pressed:", e.detail.pressed);
        console.log("Previous state:", e.detail.previousState);
    });
</script>
```

### Form Integration

```html
<form id="myForm">
    <input type="text" name="username" required />

    <!-- Submit button -->
    <mjo-button type="submit" color="primary">Submit</mjo-button>

    <!-- Reset button -->
    <mjo-button type="reset" variant="ghost">Reset</mjo-button>

    <!-- Regular button (doesn't submit) -->
    <mjo-button type="button">Cancel</mjo-button>
</form>
```

### Disabled and Full Width

```html
<mjo-button disabled>Disabled</mjo-button> <mjo-button fullwidth>Full Width Button</mjo-button>
```

### Handling Click Events

```html
<mjo-button id="myButton">Click me</mjo-button>

<script>
    const button = document.getElementById("myButton");

    button.addEventListener("mjo-button:click", (e) => {
        console.log("Button clicked!");
        console.log("Original event:", e.detail.originalEvent);
        console.log("Toggle state:", e.detail.toggle);
    });
</script>
```

### Programmatic Control

```javascript
const button = document.querySelector("mjo-button");

// Focus the button
button.focus();

// Trigger click programmatically
button.click();

// Toggle pressed state
button.togglePressed();

// Set loading state
button.setLoading(true);

// Remove focus
button.blur();
```

### Styling with CSS Parts

```css
/* Style the button element */
mjo-button::part(button) {
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Style the text content */
mjo-button::part(text) {
    font-weight: bold;
}

/* Style icons */
mjo-button::part(start-icon) {
    color: red;
}

/* Style loading indicator */
mjo-button::part(loading) {
    height: 3px;
}
```

### Styling with CSS Variables

```css
mjo-button {
    --mjo-button-font-family: "Inter", sans-serif;
    --mjo-button-font-size: 1.1rem;
    --mjo-button-font-weight: 600;
    --mjo-button-border-radius: 8px;
    --mjo-button-padding: 0.75rem 1.5rem;
    --mjo-button-gap: 8px;
}

/* Custom color scheme */
mjo-button[color="primary"] {
    --mjo-button-background-color: #0066cc;
    --mjo-button-background-color-hover: #0052a3;
    --mjo-button-color: white;
}
```

### Combined Features

```html
<script type="module">
    import { BsSave } from "mjo-icons/bs";
</script>

<mjo-button color="success" size="large" .startIcon="${BsSave}" loading buttonLabel="Save your changes"> Saving... </mjo-button>
```

## Additional Notes

### Ripple Effect

The component includes an integrated `mjo-ripple` effect that provides Material Design-style visual feedback on click. This effect:

- Is automatically enabled by default
- Can be disabled using the `noink` property
- Is automatically disabled when the button is `disabled` or `loading`
- Respects `prefers-reduced-motion` user preferences

### Toggle Behavior

When `toggleable` is `true`:

- The button maintains an internal toggle state
- Clicking the button toggles between pressed and unpressed states
- The `aria-pressed` attribute reflects the current state
- Toggle state is automatically reset when the button becomes `disabled` or `loading`
- Visual feedback is provided through a shadow inset effect

### Loading State

The loading state provides visual feedback for async operations:

- Shows an animated progress indicator at the bottom of the button
- Automatically disables the button to prevent duplicate actions
- Sets `aria-busy="true"` for screen readers
- The loading indicator animation respects `prefers-reduced-motion`
- Loading color is automatically calculated based on the button's `color` property

### Variant-Specific Behavior

Each variant has distinct visual characteristics:

- **default**: Solid background with border
- **ghost**: Transparent background, visible border, colored text
- **flat**: Subtle colored background (alpha channel), no border
- **dashed**: Transparent background with dashed border
- **link**: Minimal styling, resembles a hyperlink
- **text**: Plain text appearance with subtle hover effect

### Form Integration

The component integrates seamlessly with forms through the `FormMixin`:

- `type="submit"` triggers form submission
- `type="reset"` resets form fields
- Properly associates with parent forms
- Respects form validation before submission

### Performance Considerations

The component uses:

- CSS custom properties for dynamic theming without JavaScript recalculation
- Efficient event delegation for ripple effects
- `willUpdate` and `updated` lifecycle methods to minimize unnecessary updates
- Conditional rendering for loading states and ripple effects
