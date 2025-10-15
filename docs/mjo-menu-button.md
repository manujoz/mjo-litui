# mjo-menu-button

Animated hamburger menu button with multiple effects and semantic colors. Provides smooth transitions between open and closed states with comprehensive accessibility support.

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

- Navigation menu toggle for mobile/responsive designs
- Sidebar/drawer activation control
- Collapsible panel trigger
- Interactive UI state indicator with visual feedback

## Import

```typescript
import "mjo-litui/mjo-menu-button";
```

## Properties

| Property        | Type                                                                      | Description                                                                 | Default     | Required |
| --------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- | -------- |
| `size`          | `"sm" \| "md" \| "lg"`                                                    | Button size (sm: 35px, md: 50px, lg: 65px)                                  | `"md"`      | No       |
| `effect`        | `MjoButtonEffect`                                                         | Animation effect type (see [MjoButtonEffect types](#mjobuttoneffect-types)) | `"cross"`   | No       |
| `color`         | `"primary" \| "secondary" \| "success" \| "info" \| "warning" \| "error"` | Semantic color variant for hover state                                      | `"primary"` | No       |
| `isOpen`        | `boolean`                                                                 | Controls the open/closed state                                              | `false`     | No       |
| `noink`         | `boolean`                                                                 | Disables ripple effect                                                      | `false`     | No       |
| `disabled`      | `boolean`                                                                 | Disables the button                                                         | `false`     | No       |
| `aria-controls` | `string`                                                                  | ID of the element controlled by this button (for ARIA)                      | `undefined` | No       |

### MjoButtonEffect Types

Available animation effects:

- `"cross"` - Lines cross to form an X
- `"wink"` - Lines collapse from center
- `"wink-reverse"` - Lines collapse with reverse rotation
- `"bounce"` - Lines bounce while rotating
- `"rotate"` - Full 360° rotation with cross formation
- `"rotate-reverse"` - Counter-clockwise rotation with cross formation
- `"push"` - Lines push from right to left
- `"push-reverse"` - Lines push from left to right
- `"async"` - Lines animate sequentially from top
- `"async-reverse"` - Lines animate sequentially from bottom
- `"spin"` - Container spins 90° with diagonal lines
- `"spin-reverse"` - Container spins with reverse diagonal

## Public Methods

| Method   | Parameters               | Description                                       | Returns |
| -------- | ------------------------ | ------------------------------------------------- | ------- |
| `focus`  | `options?: FocusOptions` | Sets focus to the menu button                     | `void`  |
| `blur`   | -                        | Removes focus from the menu button                | `void`  |
| `open`   | -                        | Opens the menu button (sets `isOpen` to `true`)   | `void`  |
| `close`  | -                        | Closes the menu button (sets `isOpen` to `false`) | `void`  |
| `toggle` | -                        | Toggles the menu button state                     | `void`  |

## Events

| Event                    | Description                                 | Type                       | Detail                |
| ------------------------ | ------------------------------------------- | -------------------------- | --------------------- |
| `mjo-menu-button:open`   | Fired when the menu button is opened        | `MjoMenuButtonOpenEvent`   | `{ isOpen: true }`    |
| `mjo-menu-button:close`  | Fired when the menu button is closed        | `MjoMenuButtonCloseEvent`  | `{ isOpen: false }`   |
| `mjo-menu-button:toggle` | Fired when the menu button state is toggled | `MjoMenuButtonToggleEvent` | `{ isOpen: boolean }` |

## CSS Variables

| Variable                        | Description                  | Default                                                                                        |
| ------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `--mjo-menu-button-color-hover` | Color applied on hover state | Depends on `color` property (primary, secondary, success, info, warning, or error theme color) |

## CSS Parts

| Part          | Description                                                     | Element    |
| ------------- | --------------------------------------------------------------- | ---------- |
| `container`   | The main button element that contains the entire menu button    | `<button>` |
| `menu-button` | The inner container that holds the hamburger menu lines         | `<div>`    |
| `line`        | Individual lines that form the hamburger menu (4 span elements) | `<span>`   |

## Accessibility

### ARIA Support

- Automatically sets `aria-label` to "Open menu" or "Close menu" based on state
- Supports `aria-controls` attribute to link to controlled element
- Sets `aria-expanded` to reflect current state
- Sets `aria-haspopup="menu"` when `aria-controls` is provided
- Disabled state properly reflected with `disabled` attribute

### Keyboard Navigation

- Fully keyboard accessible as native `<button>` element
- Activates with `Enter` and `Space` keys
- Visible focus indicator with outline color matching semantic variant

### Motion Preferences

- Respects `prefers-reduced-motion` media query
- Switches to simple, instant transitions when reduced motion is preferred
- Maintains functionality while removing complex animations

### Best Practices

- Always use with descriptive labels or text nearby for context
- Connect to controlled element using `aria-controls` for screen readers
- Consider providing custom `aria-label` for specific contexts
- Use semantic `color` variants that match your UI's information architecture

## Usage Examples

### Basic Usage

```html
<mjo-menu-button></mjo-menu-button>
```

### Different Sizes and Effects

```html
<!-- Small size with wink effect -->
<mjo-menu-button size="sm" effect="wink"></mjo-menu-button>

<!-- Large size with bounce effect -->
<mjo-menu-button size="lg" effect="bounce" color="secondary"></mjo-menu-button>

<!-- Spin effect with warning color -->
<mjo-menu-button effect="spin" color="warning"></mjo-menu-button>
```

### Programmatic Control

```html
<mjo-menu-button id="menuBtn"></mjo-menu-button>
<button id="openBtn">Open Menu</button>
<button id="closeBtn">Close Menu</button>

<script>
    const menuBtn = document.getElementById("menuBtn");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    openBtn.addEventListener("click", () => {
        menuBtn.open();
    });

    closeBtn.addEventListener("click", () => {
        menuBtn.close();
    });

    // Listen to state changes
    menuBtn.addEventListener("mjo-menu-button:toggle", (e) => {
        console.log("Menu is now:", e.detail.isOpen ? "open" : "closed");
    });
</script>
```

### Controlling a Drawer

```html
<mjo-menu-button id="drawerToggle" aria-controls="mainDrawer" effect="push" color="primary"> </mjo-menu-button>

<mjo-drawer id="mainDrawer" position="left">
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
    </nav>
</mjo-drawer>

<script>
    const toggle = document.getElementById("drawerToggle");
    const drawer = document.getElementById("mainDrawer");

    toggle.addEventListener("mjo-menu-button:toggle", (e) => {
        if (e.detail.isOpen) {
            drawer.open();
        } else {
            drawer.close();
        }
    });

    // Sync button state when drawer closes
    drawer.addEventListener("mjo-drawer:close", () => {
        toggle.close();
    });
</script>
```

### Customization with CSS Parts

```html
<style>
    mjo-menu-button::part(container) {
        background-color: rgba(0, 0, 0, 0.05);
    }

    mjo-menu-button::part(line) {
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }

    mjo-menu-button:hover::part(container) {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>

<mjo-menu-button effect="cross"></mjo-menu-button>
```

### Custom Hover Color

```html
<style>
    .custom-menu {
        --mjo-menu-button-color-hover: #ff6b6b;
    }
</style>

<mjo-menu-button class="custom-menu" effect="rotate"></mjo-menu-button>
```

### Disabled State

```html
<mjo-menu-button disabled></mjo-menu-button>
```

### Without Ripple Effect

```html
<mjo-menu-button noink></mjo-menu-button>
```

## Additional Notes

### Animation Performance

- All effects are optimized with CSS transforms and transitions
- Animations are blocked during transitions to prevent state inconsistencies
- Uses `isAnimated` internal flag to prevent rapid state changes

### Effect Duration

- Most effects complete in 500-800ms
- Complex effects (bounce, rotate) may take up to 1 second
- Reduced motion users get instant transitions without delays

### Browser Compatibility

- Works in all modern browsers supporting Web Components
- CSS transforms and transitions are widely supported
- Ripple effect requires support for custom elements

### Styling Recommendations

- Use CSS parts for deep customization of individual lines
- Override `--mjo-menu-button-color-hover` for consistent theming
- Container size is fixed based on `size` property but can be overridden with host styles

### Integration with Navigation

This component is designed to work seamlessly with:

- **[mjo-drawer](mjo-drawer.md)** - For slide-out navigation panels
- **[mjo-modal](mjo-modal.md)** - For modal-based menus
- Custom navigation overlays and dropdown menus
