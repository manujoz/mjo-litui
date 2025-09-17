# mjo-menu-button

An animated hamburger menu button that transforms between different visual states with customizable effects and semantic colors.

## Overview

The `mjo-menu-button` component provides an interactive hamburger-style menu button with smooth transitions between open and closed states. It features multiple animation effects, semantic color variants, and built-in ripple feedback for enhanced user interaction.

## Basic Usage

### HTML

```html
<mjo-menu-button color="primary" effect="cross"></mjo-menu-button>
<mjo-menu-button color="secondary" effect="wink" size="lg"></mjo-menu-button>
<mjo-menu-button color="success" effect="bounce" isOpen></mjo-menu-button>
```

### Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-basic")
export class ExampleMenuButtonBasic extends LitElement {
    render() {
        return html` <mjo-menu-button color="primary" effect="cross" aria-label="Toggle navigation menu"> </mjo-menu-button> `;
    }
}
```

### ARIA Usage Examples

```html
<!-- Basic hamburger menu with external navigation -->
<mjo-menu-button aria-label="Toggle main navigation" aria-controls="navigation-menu" color="primary"> </mjo-menu-button>

<!-- Menu button for sidebar control -->
<mjo-menu-button aria-label="Toggle sidebar" aria-controls="sidebar-panel" color="secondary"> </mjo-menu-button>

<!-- Menu button without external control -->
<mjo-menu-button aria-label="Menu options" color="primary"> </mjo-menu-button>
```

## Attributes / Properties

| Name           | Type                                                                      | Default     | Reflects | Description                                                            |
| -------------- | ------------------------------------------------------------------------- | ----------- | -------- | ---------------------------------------------------------------------- |
| `size`         | `"sm" \| "md" \| "lg"`                                                    | `"md"`      | no       | Controls the button size (35px, 50px, or 65px)                         |
| `effect`       | `MjoButtonEffect` (see types below)                                       | `"cross"`   | no       | Animation effect when transitioning between states                     |
| `color`        | `"primary" \| "secondary" \| "success" \| "info" \| "warning" \| "error"` | `"primary"` | no       | Semantic color theme for hover states                                  |
| `isOpen`       | `boolean`                                                                 | `false`     | no       | Controls the open/closed state of the menu button                      |
| `noink`        | `boolean`                                                                 | `false`     | no       | Disables the ripple effect when true                                   |
| `disabled`     | `boolean`                                                                 | `false`     | yes      | Disables the button interaction and applies disabled styling           |
| `ariaControls` | `string`                                                                  | `undefined` | no       | ID of the element this button controls (sets aria-controls attribute)  |
| `theme`        | `MjoMenuButtonTheme`                                                      | `{}`        | no       | Theme configuration object for customizing appearance (via ThemeMixin) |

### ARIA Support

The component leverages both Lit's native ARIA support and custom properties for comprehensive accessibility:

| Attribute       | Type                          | Description                                   | Usage                             |
| --------------- | ----------------------------- | --------------------------------------------- | --------------------------------- |
| `aria-label`    | `string \| null` (Lit native) | Custom accessibility label for the button     | `aria-label="Toggle navigation"`  |
| `aria-controls` | `string` (custom property)    | ID of the element controlled by this button   | `aria-controls="main-navigation"` |
| `aria-expanded` | Read-only (automatic)         | Automatically managed based on `isOpen` state | Managed internally based on state |
| `aria-haspopup` | Read-only (automatic)         | Set to "menu" when `ariaControls` is provided | Managed internally                |

### Effect Types

The `effect` property supports the following animation effects:

| Effect             | Description                                |
| ------------------ | ------------------------------------------ |
| `"cross"`          | Default cross animation (hamburger to X)   |
| `"wink"`           | Wink effect with diagonal animations       |
| `"wink-reverse"`   | Reverse wink effect                        |
| `"bounce"`         | Bounce effect with extended rotation       |
| `"rotate"`         | Rotation of container with cross animation |
| `"rotate-reverse"` | Reverse rotation effect                    |
| `"push"`           | Push effect from center outwards           |
| `"push-reverse"`   | Push effect towards center                 |
| `"async"`          | Asynchronous animation of individual bars  |
| `"async-reverse"`  | Reverse asynchronous animation             |
| `"spin"`           | Spin container with diagonal bars          |
| `"spin-reverse"`   | Reverse spin effect                        |

### Internal State

| Name         | Type      | Description                                             |
| ------------ | --------- | ------------------------------------------------------- |
| `isAnimated` | `boolean` | Internal flag to prevent state changes during animation |

## Methods

| Method            | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `close()`         | Programmatically closes the menu button (sets isOpen to false) |
| `open()`          | Programmatically opens the menu button (sets isOpen to true)   |
| `toggle()`        | Toggles the current state of the menu button                   |
| `focus(options?)` | Sets focus to the menu button element                          |
| `blur()`          | Removes focus from the menu button element                     |

### Method Usage Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { MjoMenuButton } from "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-methods")
export class ExampleMenuButtonMethods extends LitElement {
    @query("mjo-menu-button") menuButton!: MjoMenuButton;

    private openMenu() {
        this.menuButton.open();
    }

    private closeMenu() {
        this.menuButton.close();
    }

    private toggleMenu() {
        this.menuButton.toggle();
    }

    private focusMenuButton() {
        this.menuButton.focus();
    }

    render() {
        return html`
            <div>
                <mjo-menu-button color="primary" effect="cross" aria-label="Toggle navigation" aria-controls="main-nav"> </mjo-menu-button>

                <div class="controls">
                    <button @click=${this.openMenu}>Open</button>
                    <button @click=${this.closeMenu}>Close</button>
                    <button @click=${this.toggleMenu}>Toggle</button>
                    <button @click=${this.focusMenuButton}>Focus Menu Button</button>
                </div>
            </div>
        `;
    }
}
```

## Events

| Event                    | Detail                | Emitted When                           | Notes                               |
| ------------------------ | --------------------- | -------------------------------------- | ----------------------------------- |
| `click`                  | Native `MouseEvent`   | User clicks the menu button            | Native button click event           |
| `mjo-menu-button:open`   | `{ isOpen: true }`    | Menu button is opened programmatically | Custom event with state information |
| `mjo-menu-button:close`  | `{ isOpen: false }`   | Menu button is closed programmatically | Custom event with state information |
| `mjo-menu-button:toggle` | `{ isOpen: boolean }` | Menu button state is toggled           | Custom event with current state     |

## CSS Parts

| Part          | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `container`   | The main button element that contains the entire menu button    |
| `menu-button` | The inner container that holds the hamburger menu lines         |
| `line`        | Individual lines that form the hamburger menu (4 span elements) |

## CSS Custom Properties

| Property                        | Default                    | Description                                     |
| ------------------------------- | -------------------------- | ----------------------------------------------- |
| `--mjo-menu-button-color-hover` | `var(--mjo-{color}-color)` | Hover color based on the selected color variant |

### Color-Specific Hover Variables

The component automatically uses different hover colors based on the `color` attribute:

- **Primary**: `var(--mjo-menu-button-color-hover, var(--mjo-primary-color, #1aa8ed))`
- **Secondary**: `var(--mjo-menu-button-color-hover, var(--mjo-secondary-color, #7dc717))`
- **Success**: `var(--mjo-menu-button-color-hover, var(--mjo-color-success, #20d338))`
- **Info**: `var(--mjo-menu-button-color-hover, var(--mjo-color-info, #2065cc))`
- **Warning**: `var(--mjo-menu-button-color-hover, var(--mjo-color-warning, #df950c))`
- **Error**: `var(--mjo-menu-button-color-hover, var(--mjo-color-error, #cf2a2a))`

## Theme Interface

```ts
interface MjoMenuButtonTheme {
    colorHover?: string;
}
```

## ThemeMixin Customization

This component uses `ThemeMixin`, allowing you to pass a `theme` object for instance-specific customization:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-themed")
export class ExampleMenuButtonThemed extends LitElement {
    private customTheme = {
        colorHover: "#7c3aed",
    };

    render() {
        return html` <mjo-menu-button color="primary" effect="bounce" .theme=${this.customTheme}></mjo-menu-button> `;
    }
}
```

## Global Theming

Configure menu button styling globally using `mjo-theme`:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-global-theme")
export class ExampleMenuButtonGlobalTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .theme=${{
                    components: {
                        mjoMenuButton: {
                            colorHover: "#f59e0b",
                        },
                    },
                }}
            >
                <mjo-menu-button color="primary" effect="cross"></mjo-menu-button>
                <mjo-menu-button color="secondary" effect="wink"></mjo-menu-button>
            </mjo-theme>
        `;
    }
}
```

## Accessibility

The `mjo-menu-button` component is built with comprehensive accessibility features:

### Built-in Accessibility Features

- **Semantic HTML**: Uses a native `<button>` element for proper keyboard navigation and screen reader support
- **ARIA Attributes**: Automatically includes `aria-expanded`, `aria-haspopup` (when controlling external elements), and optionally `aria-controls`
- **Smart ARIA Management**: `aria-haspopup="menu"` is automatically set when `ariaControls` is provided, indicating this button controls an external menu
- **Keyboard Support**: Full keyboard interaction (Enter, Space, Tab navigation)
- **Focus Management**: Clear focus indicators with `:focus-visible` support and programmatic focus methods
- **State Announcements**: Screen readers are informed of state changes through ARIA attributes
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference with simplified animations
- **Disabled State**: Proper disabled state handling with visual and functional changes

### ARIA Labels and Controls

The component supports ARIA labeling and control relationships for hamburger menu buttons:

- Use native `aria-label` attribute to provide accessible names for the button
- Use `ariaControls` property to establish relationships with controlled elements (navigation menus, panels, etc.)
- `aria-haspopup="menu"` is automatically added when `ariaControls` is set
- Labels should clearly indicate the button's purpose (e.g., "Toggle navigation menu")

### Enhanced Accessibility Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-accessible")
export class ExampleMenuButtonAccessible extends LitElement {
    @state() private menuOpen = false;

    private handleMenuToggle(event: CustomEvent) {
        this.menuOpen = event.detail.isOpen;
    }

    render() {
        return html`
            <mjo-menu-button
                color="primary"
                effect="cross"
                .isOpen=${this.menuOpen}
                aria-label="Toggle navigation menu"
                aria-controls="main-navigation"
                @mjo-menu-button:toggle=${this.handleMenuToggle}
            ></mjo-menu-button>

            <nav id="main-navigation" ?hidden=${!this.menuOpen}>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                </ul>
            </nav>
        `;
    }
}
```

### Reduced Motion Support

The component automatically detects when users prefer reduced motion and uses simplified animations.

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-reduced-motion")
export class ExampleMenuButtonReducedMotion extends LitElement {
    render() {
        return html`
            <!-- These buttons respect the user's motion preferences -->
            <mjo-menu-button color="primary" effect="bounce" aria-label="Navigation"></mjo-menu-button>
            <mjo-menu-button color="secondary" effect="spin" aria-label="Options"></mjo-menu-button>
        `;
    }
}
```

### Disabled State Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-disabled")
export class ExampleMenuButtonDisabled extends LitElement {
    @state() private isLoading = false;

    private toggleLoading() {
        this.isLoading = !this.isLoading;
    }

    render() {
        return html`
            <mjo-menu-button color="primary" .disabled=${this.isLoading} aria-label=${this.isLoading ? "Menu unavailable" : "Toggle menu"}></mjo-menu-button>
            <button @click=${this.toggleLoading}>${this.isLoading ? "Enable" : "Disable"} Menu</button>
        `;
    }
}
```

## Animation Effects Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-effects")
export class ExampleMenuButtonEffects extends LitElement {
    render() {
        return html`
            <div class="effects-grid">
                <mjo-menu-button effect="cross" color="primary" aria-label="Cross effect"></mjo-menu-button>
                <mjo-menu-button effect="wink" color="secondary" aria-label="Wink effect"></mjo-menu-button>
                <mjo-menu-button effect="bounce" color="success" aria-label="Bounce effect"></mjo-menu-button>
                <mjo-menu-button effect="rotate" color="info" aria-label="Rotate effect"></mjo-menu-button>
                <mjo-menu-button effect="spin" color="warning" aria-label="Spin effect"></mjo-menu-button>
                <mjo-menu-button effect="async" color="error" aria-label="Async effect"></mjo-menu-button>
            </div>
        `;
    }

    static styles = css`
        .effects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }
    `;
}
```

## Size and Color Variants

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-variants")
export class ExampleMenuButtonVariants extends LitElement {
    render() {
        return html`
            <div class="variants-grid">
                <!-- Size Variants -->
                <mjo-menu-button size="sm" color="primary" effect="cross" aria-label="Small menu"></mjo-menu-button>
                <mjo-menu-button size="md" color="secondary" effect="wink" aria-label="Medium menu"></mjo-menu-button>
                <mjo-menu-button size="lg" color="success" effect="bounce" aria-label="Large menu"></mjo-menu-button>

                <!-- Color Variants -->
                <mjo-menu-button color="info" effect="rotate" aria-label="Info menu"></mjo-menu-button>
                <mjo-menu-button color="warning" effect="spin" aria-label="Warning menu"></mjo-menu-button>
                <mjo-menu-button color="error" effect="async" aria-label="Error menu"></mjo-menu-button>
            </div>
        `;
    }

    static styles = css`
        .variants-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }
    `;
}
```

## Performance Considerations

- **Animation Blocking**: During animations, the `isAnimated` flag prevents rapid state changes that could cause visual glitches
- **CSS Transitions**: Uses CSS transitions for smooth, hardware-accelerated animations
- **Event Handling**: Efficient click handling with proper event delegation
- **Memory Management**: Automatic cleanup of animation timeouts to prevent memory leaks

## Best Practices

- **Consistent Effects**: Use the same effect across your application for consistency
- **Appropriate Sizing**: Choose size based on your UI layout (sm for compact layouts, lg for touch interfaces)
- **Color Coordination**: Match the color prop with your overall design system
- **State Management**: Use controlled state when you need to sync with other components
- **Accessibility**: Always provide appropriate ARIA labels and roles
- **Testing**: Test animations on different devices to ensure smooth performance

## Common Use Cases

1. **Mobile Navigation**: Primary use case for responsive navigation menus
2. **Sidebar Toggle**: Opening and closing sidebar panels
3. **Menu Overlay**: Triggering full-screen menu overlays
4. **Settings Panel**: Opening configuration or settings panels
5. **Filter Toggle**: Showing/hiding filter options in data views

## Summary

`<mjo-menu-button>` provides a flexible, animated hamburger menu button with multiple visual effects and customization options. It integrates seamlessly with the mjo-litui design system while offering extensive theming capabilities through both global and instance-level customization. The component handles state management efficiently and provides smooth animations that enhance user experience without compromising performance.

For additional theming options and design system integration, see the [Theming Guide](./theming.md).
