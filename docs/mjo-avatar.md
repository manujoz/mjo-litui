# mjo-avatar

Configurable avatar component for displaying user images, initials, or fallback icons with multiple sizes, shapes, and colors.

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

- Display user profile pictures with automatic fallback handling
- Show user initials when no image is available
- Create interactive avatar selectors in forms
- Build team member lists and user directories
- Implement status indicators with colored borders
- Handle image loading errors gracefully with fallback content

## Import

```javascript
import "mjo-litui/mjo-avatar";
```

## Properties

| Property           | Type                                                                                   | Description                                                                      | Default     | Required |
| ------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------- | -------- |
| `src`              | `string`                                                                               | URL of the avatar image                                                          | `undefined` | No       |
| `name`             | `string`                                                                               | User name for displaying initials (first letter)                                 | `undefined` | No       |
| `value`            | `string`                                                                               | Custom value associated with the avatar (useful for clickable avatars)           | `undefined` | No       |
| `alt`              | `string`                                                                               | Alternative text for the image (uses `name` if not provided)                     | `undefined` | No       |
| `fallbackIcon`     | `string`                                                                               | Icon to display when image fails to load or no image is provided                 | `undefined` | No       |
| `size`             | `"small" \| "medium" \| "large"`                                                       | Size of the avatar                                                               | `"medium"`  | No       |
| `color`            | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "info" \| "error"` | Color variant for border (when `bordered` is true)                               | `"default"` | No       |
| `radius`           | `"none" \| "small" \| "medium" \| "large" \| "full"`                                   | Border radius style                                                              | `"full"`    | No       |
| `bordered`         | `boolean`                                                                              | Whether to display a colored border around the avatar                            | `false`     | No       |
| `disabled`         | `boolean`                                                                              | Whether the avatar is disabled (reduced opacity, no interaction)                 | `false`     | No       |
| `clickable`        | `boolean`                                                                              | Whether the avatar is interactive and can be clicked                             | `false`     | No       |
| `nameColoured`     | `boolean`                                                                              | Whether to use auto-generated colors for name initials based on the first letter | `false`     | No       |
| `aria-describedby` | `string`                                                                               | ID of element that describes the avatar                                          | `undefined` | No       |

## Public Methods

| Method    | Parameters | Description                                                                                                     | Return |
| --------- | ---------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| `click()` | None       | Programmatically trigger a click event on the avatar. Only works when the avatar is clickable and not disabled. | `void` |

## Events

| Event              | Description                                                                         | Type                               | Detail                                                    |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------- |
| `mjo-avatar:click` | Fired when the avatar is clicked (only when `clickable` is `true` and not disabled) | `CustomEvent<MjoAvatarClickEvent>` | `{ value: string }` - The `value` or `name` of the avatar |
| `mjo-avatar:error` | Fired when the image fails to load                                                  | `CustomEvent<MjoAvatarErrorEvent>` | `{ message: string }` - Error message                     |

## CSS Variables

| Variable                            | Description                                                           | Default                     |
| ----------------------------------- | --------------------------------------------------------------------- | --------------------------- |
| `--mjo-avatar-background-color`     | Background color for the avatar container                             | `var(--mjo-color-gray-400)` |
| `--mjo-avatar-fallback-color`       | Text/icon color for fallback content                                  | `var(--mjo-color-gray-100)` |
| `--mjo-avatar-name-color`           | Text color for name initials (overridden when `nameColoured` is true) | `var(--mjo-color-gray-100)` |
| `--mjo-avatar-border-color`         | Border color for the avatar when `color="default"`                    | `var(--mjo-color-gray-300)` |
| `--mjo-avatar-border-width`         | Border width when `bordered` is true                                  | `3px`                       |
| `--mjo-avatar-size-small`           | Size for small avatars                                                | `32px`                      |
| `--mjo-avatar-size-medium`          | Size for medium avatars                                               | `44px`                      |
| `--mjo-avatar-size-large`           | Size for large avatars                                                | `54px`                      |
| `--mjo-avatar-fallback-size-small`  | Font size for small fallback content (icons and initials)             | `18px`                      |
| `--mjo-avatar-fallback-size-medium` | Font size for medium fallback content (icons and initials)            | `28px`                      |
| `--mjo-avatar-fallback-size-large`  | Font size for large fallback content (icons and initials)             | `40px`                      |
| `--mjo-avatar-radius-small`         | Border radius for small rounded avatars                               | `4px`                       |
| `--mjo-avatar-radius-medium`        | Border radius for medium rounded avatars                              | `8px`                       |
| `--mjo-avatar-radius-large`         | Border radius for large rounded avatars                               | `12px`                      |

## CSS Parts

| Part              | Description                                                  | Element    |
| ----------------- | ------------------------------------------------------------ | ---------- |
| `container`       | The main avatar container element                            | `<div>`    |
| `image-container` | The image/content container                                  | `<div>`    |
| `fallback`        | The fallback icon container (only when using `fallbackIcon`) | `<div>`    |
| `name`            | The name initials container (only when using `name`)         | `<div>`    |
| `image`           | The actual image element (only when using `src`)             | `<img>`    |
| `icon`            | The fallback icon element (exported from `mjo-icon`)         | `mjo-icon` |

## Accessibility

The `mjo-avatar` component implements comprehensive accessibility features:

### ARIA Roles and Attributes

- **Dynamic role assignment**: Automatically assigns the appropriate ARIA role based on context:
    - `role="button"` when `clickable` is true
    - `role="img"` when displaying an image
    - `role="presentation"` for decorative avatars
- **Computed aria-label**: Automatically generates descriptive labels:
    - For clickable avatars: `"Click to interact with [name/value]"`
    - For non-clickable avatars: `"Avatar for [name]"`
    - Can be overridden with custom `ariaLabel` property
- **aria-describedby**: Support for linking to descriptive elements
- **aria-disabled**: Properly indicates disabled state

### Keyboard Interaction

When `clickable` is true:

- **Enter** or **Space**: Activates the avatar click action
- **Tab**: Focuses the avatar (respects `tabIndex` property)
- **Visual focus indicator**: Displays outline on focus

### Best Practices

- Always provide a `name` or custom `ariaLabel` for screen reader context
- Use `alt` text for images that convey important information
- Ensure sufficient color contrast when using custom colors
- Consider providing a `fallbackIcon` for better error handling
- When grouping multiple avatars, ensure each has a unique identifier

## Usage Examples

### Basic Image Avatar

```html
<mjo-avatar src="https://example.com/user-photo.jpg" name="John Doe" alt="John Doe profile picture" size="medium"></mjo-avatar>
```

### Name Initials

When no image is provided, the component displays the first letter of the name:

```html
<mjo-avatar name="Jane Smith" size="medium" color="primary" bordered></mjo-avatar>
```

### Fallback Icon

Use a custom icon when no image or name is available:

```html
<mjo-avatar fallbackIcon="mjo-icons:user" size="medium" color="secondary"></mjo-avatar>
```

### Auto-generated Colors

The `nameColoured` property automatically generates background and text colors based on the first letter of the name:

```html
<mjo-avatar name="Alice Johnson" nameColoured size="medium"></mjo-avatar>

<mjo-avatar name="Bob Wilson" nameColoured size="medium"></mjo-avatar>

<mjo-avatar name="Carol Davis" nameColoured size="medium"></mjo-avatar>
```

Each name will have a different color based on its first letter, providing visual distinction.

### Programmatic Interaction

```html
<mjo-avatar id="user-avatar" src="https://example.com/user.jpg" name="User Name" value="user-123" clickable size="large"></mjo-avatar>

<button id="trigger-btn">Click Avatar Programmatically</button>

<script>
    const avatar = document.getElementById("user-avatar");
    const button = document.getElementById("trigger-btn");

    // Programmatic click
    button.addEventListener("click", () => {
        avatar.click();
    });
</script>
```

### Event Handling

```html
<mjo-avatar
    id="interactive-avatar"
    src="https://example.com/avatar.jpg"
    name="Interactive User"
    value="user-456"
    clickable
    size="medium"
    color="primary"
    bordered
></mjo-avatar>

<script>
    const avatar = document.getElementById("interactive-avatar");

    // Handle click event
    avatar.addEventListener("mjo-avatar:click", (event) => {
        console.log("Avatar clicked:", event.detail.value);
        // Output: "Avatar clicked: user-456"
    });

    // Handle image error
    avatar.addEventListener("mjo-avatar:error", (event) => {
        console.error("Image failed to load:", event.detail.message);
        // Optionally update the avatar with a fallback
    });
</script>
```

### Custom Styling with CSS Parts

```html
<style>
    /* Custom border styling */
    mjo-avatar::part(container) {
        border: 2px solid gold;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    /* Custom image styling */
    mjo-avatar::part(image) {
        filter: grayscale(50%);
        transition: filter 0.3s ease;
    }

    mjo-avatar:hover::part(image) {
        filter: grayscale(0%);
    }

    /* Custom initials styling */
    mjo-avatar::part(name) {
        font-family: "Arial", sans-serif;
        font-weight: bold;
        letter-spacing: 1px;
    }

    /* Custom icon color */
    mjo-avatar::part(icon) {
        color: #ff6b6b;
    }
</style>

<mjo-avatar name="Styled Avatar" size="large" radius="medium"></mjo-avatar>
```

### Avatar Group

Create a group of avatars representing team members:

```html
<style>
    .avatar-group {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    /* Overlapping effect */
    .avatar-group-stacked {
        display: flex;
        align-items: center;
    }

    .avatar-group-stacked mjo-avatar {
        margin-left: -12px;
        border: 2px solid white;
    }

    .avatar-group-stacked mjo-avatar:first-child {
        margin-left: 0;
    }
</style>

<!-- Normal spacing -->
<div class="avatar-group">
    <mjo-avatar src="https://example.com/user1.jpg" name="User 1" size="medium" clickable value="user-1"></mjo-avatar>
    <mjo-avatar src="https://example.com/user2.jpg" name="User 2" size="medium" clickable value="user-2"></mjo-avatar>
    <mjo-avatar name="User 3" size="medium" nameColoured clickable value="user-3"></mjo-avatar>
    <mjo-avatar fallbackIcon="mjo-icons:more" size="medium" color="info" clickable value="more-users"></mjo-avatar>
</div>

<!-- Stacked/overlapping -->
<div class="avatar-group-stacked">
    <mjo-avatar src="https://example.com/user1.jpg" name="User 1" size="medium"></mjo-avatar>
    <mjo-avatar src="https://example.com/user2.jpg" name="User 2" size="medium"></mjo-avatar>
    <mjo-avatar name="User 3" size="medium" nameColoured></mjo-avatar>
    <mjo-avatar fallbackIcon="mjo-icons:more" size="medium" color="default"></mjo-avatar>
</div>
```

## Additional Notes

- **Intelligent fallback hierarchy**: The component automatically falls back in this order: `src` → `fallbackIcon` → `name` initials → empty container
- **SSR support**: The component handles server-side rendering and checks image loading status on hydration
- **Automatic color generation**: When `nameColoured` is true, the component uses a predefined palette of 17 colors based on character codes
- **Click animation**: Clickable avatars include a subtle scale animation on click for visual feedback
- **Reduced motion support**: Animations are disabled when users prefer reduced motion
- **Border radius adjustment**: When `bordered` is true, the inner content radius automatically adjusts to maintain consistent appearance
- **Focus management**: Properly manages focus states and keyboard navigation when clickable
- **Image error handling**: Automatically displays fallback content when images fail to load and emits an error event
