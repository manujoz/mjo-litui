# mjo-badge

Positioned notification badge component with comprehensive accessibility support and theming for displaying informational content over other elements.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Display notification counts on user avatars, buttons, or icons
- Show status indicators with visual variants and colors
- Create clickable badges with custom actions
- Implement dynamic counters with automatic count limiting
- Position informational indicators at different corners of elements
- Display icon-based badges for quick visual identification
- Build interactive notification systems with keyboard support

## Import

```javascript
import "mjo-litui/mjo-badge";
```

## Properties

| Property           | Type                                                                                   | Description                                                                                 | Default       | Required |
| ------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------- | -------- |
| `label`            | `string`                                                                               | Badge content (text or SVG icon). Numbers over 99 will be displayed as "99+"                | `""`          | No       |
| `value`            | `string`                                                                               | Custom value associated with the badge (useful for clickable badges)                        | `undefined`   | No       |
| `color`            | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "info" \| "error"` | Color scheme for the badge                                                                  | `"primary"`   | No       |
| `size`             | `"small" \| "medium" \| "large"`                                                       | Size of the badge                                                                           | `"medium"`    | No       |
| `variant`          | `"solid" \| "flat" \| "ghost" \| "brilliant" \| "shadow"`                              | Visual style variant                                                                        | `"solid"`     | No       |
| `position`         | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"`                         | Position of the badge relative to its slotted content                                       | `"top-right"` | No       |
| `offsetx`          | `number`                                                                               | Horizontal offset in pixels for fine-tuning badge position                                  | `0`           | No       |
| `offsety`          | `number`                                                                               | Vertical offset in pixels for fine-tuning badge position                                    | `0`           | No       |
| `show`             | `boolean`                                                                              | Whether the badge is visible                                                                | `false`       | No       |
| `disabled`         | `boolean`                                                                              | Whether the badge is disabled (grayed out, no interaction)                                  | `false`       | No       |
| `clickable`        | `boolean`                                                                              | Whether the badge is interactive and can be clicked                                         | `false`       | No       |
| `hideOutline`      | `boolean`                                                                              | Whether to hide the border outline (automatically hidden for brilliant and shadow variants) | `false`       | No       |
| `aria-describedby` | `string`                                                                               | ID of element that describes the badge                                                      | `undefined`   | No       |

## Public Methods

| Method          | Parameters | Description                                      | Return |
| --------------- | ---------- | ------------------------------------------------ | ------ |
| `showBadge()`   | None       | Programmatically show the badge                  | `void` |
| `hideBadge()`   | None       | Programmatically hide the badge                  | `void` |
| `toggleBadge()` | None       | Toggle the badge visibility between shown/hidden | `void` |

## Events

| Event             | Description                                                                        | Type                 | Detail                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------- |
| `mjo-badge:click` | Fired when the badge is clicked (only when `clickable` is `true` and not disabled) | `MjoBadgeClickEvent` | `{ value: string, label: string, position: MjoBadgePositions, color: MjoBadgeColors }` |

## CSS Variables

| Variable                         | Description                                                    | Default                                             |
| -------------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| `--mjo-badge-background-color`   | Background color for the badge (overrides variant-based color) | Varies by `color` and `variant`                     |
| `--mjo-badge-color`              | Text/icon color for the badge (overrides variant-based color)  | Varies by `color` and `variant`                     |
| `--mjo-badge-border-width`       | Width of the badge border                                      | `2px`                                               |
| `--mjo-badge-animation-duration` | Duration of the show/hide animation                            | `0.2s`                                              |
| `--mjo-badge-box-shadow`         | Box shadow for shadow variant                                  | `var(--mjo-box-shadow-2, 0 0 6px rgba(0, 0, 0, 1))` |

## CSS Parts

| Part        | Description                                            | Element          |
| ----------- | ------------------------------------------------------ | ---------------- |
| `container` | The main badge container element                       | `<div>`          |
| `icon`      | The icon element (only when label contains SVG)        | `mjo-icon`       |
| `label`     | The typography element (only when label contains text) | `mjo-typography` |

## Accessibility

The `mjo-badge` component implements comprehensive accessibility features:

### ARIA Roles and Attributes

- **Dynamic role assignment**: Automatically assigns the appropriate ARIA role based on context:
    - `role="status"` for informational badges (default)
    - `role="img"` for icon-based badges
    - No role for decorative badges (`aria-hidden="true"`)
- **aria-live**: Set to `"polite"` by default for screen reader announcements
- **aria-atomic**: Set to `true` by default to ensure full content is announced
- **aria-hidden**: Properly hides decorative badges from screen readers
- **aria-describedby**: Support for linking to descriptive elements
- **aria-label**: Can be set to provide custom descriptive labels

### Keyboard Interaction

When `clickable` is true:

- **Enter** or **Space**: Activates the badge click action
- **Tab**: Focuses the badge
- **Visual focus indicator**: Displays outline on focus (uses badge color)

### Best Practices

- Provide descriptive `aria-label` for badges conveying important information
- Use `aria-describedby` to link to detailed descriptions when needed
- Set `aria-hidden="true"` for purely decorative badges
- Ensure sufficient color contrast for all color variants
- When using custom icons, ensure they are accessible to screen readers
- Consider the impact of auto-hiding badges on screen reader users

## Usage Examples

### Basic Notification Badge

```html
<mjo-badge label="5" color="error" size="medium" show>
    <mjo-avatar src="https://example.com/user.jpg" name="John Doe"></mjo-avatar>
</mjo-badge>
```

### Icon Badge

Use SVG icons from icon libraries:

```html
<mjo-badge label="<svg>...</svg>" color="success" variant="brilliant" show>
    <mjo-avatar src="https://example.com/user.jpg" name="Jane Smith"></mjo-avatar>
</mjo-badge>
```

### Different Positions

```html
<!-- Top Right (default) -->
<mjo-badge label="3" position="top-right" show>
    <mjo-avatar name="User 1"></mjo-avatar>
</mjo-badge>

<!-- Top Left -->
<mjo-badge label="5" position="top-left" color="warning" show>
    <mjo-avatar name="User 2"></mjo-avatar>
</mjo-badge>

<!-- Bottom Right -->
<mjo-badge label="7" position="bottom-right" color="info" show>
    <mjo-avatar name="User 3"></mjo-avatar>
</mjo-badge>

<!-- Bottom Left -->
<mjo-badge label="2" position="bottom-left" color="success" show>
    <mjo-avatar name="User 4"></mjo-avatar>
</mjo-badge>
```

### Visual Variants

```html
<!-- Solid (default) -->
<mjo-badge label="12" variant="solid" color="primary" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<!-- Flat -->
<mjo-badge label="8" variant="flat" color="secondary" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<!-- Ghost -->
<mjo-badge label="3" variant="ghost" color="success" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<!-- Brilliant (with glow effect) -->
<mjo-badge label="99+" variant="brilliant" color="error" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<!-- Shadow -->
<mjo-badge label="5" variant="shadow" color="info" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>
```

### Position Fine-tuning with Offsets

Adjust the badge position using `offsetx` and `offsety`:

```html
<!-- Move badge 5px right and 3px down -->
<mjo-badge label="10" offsetx="5" offsety="3" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<!-- Move badge 8px left and 5px up -->
<mjo-badge label="25" offsetx="-8" offsety="-5" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>
```

### Clickable Badges

```html
<mjo-badge id="notification-badge" label="5" value="notifications" color="error" clickable show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<script>
    const badge = document.getElementById("notification-badge");

    badge.addEventListener("mjo-badge:click", (event) => {
        console.log("Badge clicked:", event.detail);
        // Output: { value: 'notifications', label: '5', position: 'top-right', color: 'error' }

        // Example: Navigate to notifications page
        // window.location.href = '/notifications';
    });
</script>
```

### Programmatic Control

```html
<mjo-badge id="dynamic-badge" label="0" color="primary">
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<button id="show-btn">Show Badge</button>
<button id="hide-btn">Hide Badge</button>
<button id="toggle-btn">Toggle Badge</button>
<button id="increment-btn">Increment Count</button>

<script>
    const badge = document.getElementById("dynamic-badge");
    let count = 0;

    document.getElementById("show-btn").addEventListener("click", () => {
        badge.showBadge();
    });

    document.getElementById("hide-btn").addEventListener("click", () => {
        badge.hideBadge();
    });

    document.getElementById("toggle-btn").addEventListener("click", () => {
        badge.toggleBadge();
    });

    document.getElementById("increment-btn").addEventListener("click", () => {
        count++;
        badge.label = count.toString();
        badge.showBadge();
    });
</script>
```

### Count Limiting

Numbers over 99 are automatically displayed with a "+" suffix:

```html
<!-- Will display as "99+" -->
<mjo-badge label="150" color="error" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<!-- Will display as "25" -->
<mjo-badge label="25" color="info" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>
```

### Custom Styling with CSS Variables

```html
<style>
    /* Custom colors */
    mjo-badge.custom-badge {
        --mjo-badge-background-color: #ff6b6b;
        --mjo-badge-color: #ffffff;
        --mjo-badge-border-width: 3px;
    }

    /* Custom animation duration */
    mjo-badge.slow-animation {
        --mjo-badge-animation-duration: 0.5s;
    }

    /* Custom shadow */
    mjo-badge.custom-shadow {
        --mjo-badge-box-shadow: 0 4px 12px rgba(255, 0, 0, 0.5);
    }
</style>

<mjo-badge class="custom-badge" label="10" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<mjo-badge class="slow-animation" label="5" color="primary" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<mjo-badge class="custom-shadow" label="3" variant="shadow" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>
```

### Custom Styling with CSS Parts

```html
<style>
    /* Style the badge container */
    mjo-badge::part(container) {
        font-family: "Arial", sans-serif;
        letter-spacing: 1px;
    }

    /* Style the label typography */
    mjo-badge::part(label) {
        text-transform: uppercase;
    }

    /* Style the icon */
    mjo-badge::part(icon) {
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
    }
</style>

<mjo-badge label="new" color="success" show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>
```

### Disabled State

```html
<mjo-badge label="5" disabled show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>

<mjo-badge label="10" clickable disabled show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>
```

### Without Border Outline

```html
<mjo-badge label="8" hideOutline show>
    <mjo-avatar name="User"></mjo-avatar>
</mjo-badge>
```

## Additional Notes

- **Automatic count limiting**: Numbers over 99 are automatically displayed as "99+" to prevent badge overflow
- **Dynamic positioning**: Badge automatically calculates its position based on its size and the configured position
- **Background color inheritance**: Automatically detects and adapts to the background color of parent elements
- **Click animation**: Clickable badges include a subtle scale animation on click for visual feedback
- **Intelligent content detection**: Automatically detects SVG content and renders it as an icon instead of text
- **Focus management**: Properly manages focus states and keyboard navigation when clickable
- **Variant-specific styling**: Each variant (solid, flat, ghost, brilliant, shadow) has optimized color combinations for accessibility
- **Responsive sizing**: Badge size automatically adjusts based on content, with a minimum width constraint
- **Theme integration**: Fully integrated with the ThemeMixin for consistent theming across applications
- **Automatic role detection**: ARIA role is automatically determined based on badge content and properties
- **SSR support**: Compatible with server-side rendering through the ThemeMixin
