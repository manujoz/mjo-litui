# mjo-menu-button

An animated hamburger menu button that transforms between different visual states with customizable effects and semantic colors.

## Overview

The `mjo-menu-button` component provides an interactive hamburger-style menu button with smooth transitions between open and closed states. It features multiple animation effects, semantic color <mjo-menu-button
color="warning"
effect="cross"
.disabled=${this.isLoading}
                    aria-label=${this.isLoading ? "Menu currently unavailable" : "Toggle settings menu"} ></mjo-menu-button>ts, and built-in ripple feedback for enhanced user interaction.

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
        return html`
            <div>
                <h4>Basic Menu Buttons</h4>
                <mjo-menu-button color="primary" effect="cross"></mjo-menu-button>
                <mjo-menu-button color="secondary" effect="wink"></mjo-menu-button>
                <mjo-menu-button color="success" effect="bounce"></mjo-menu-button>
            </div>
        `;
    }
}
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

The component leverages Lit's native ARIA support. You can use standard ARIA attributes directly:

| Attribute       | Description                                   | Usage                             |
| --------------- | --------------------------------------------- | --------------------------------- |
| `aria-label`    | Custom accessibility label for the button     | `aria-label="Toggle navigation"`  |
| `aria-controls` | ID of the element controlled by this button   | `aria-controls="main-navigation"` |
| `aria-expanded` | Automatically managed based on `isOpen` state | Read-only, managed internally     |

### ARIA Usage Examples

```html
<!-- Using aria-label directly -->
<mjo-menu-button
    aria-label="Toggle main navigation"
    aria-controls="navigation-menu"
    color="primary">
</mjo-menu-button>

<!-- Using ariaControls property (alternative) -->
<mjo-menu-button
    aria-label="Toggle sidebar"
    .ariaControls=${"sidebar-panel"}
    color="secondary">
</mjo-menu-button>
```

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

| Method     | Description                                                    |
| ---------- | -------------------------------------------------------------- |
| `close()`  | Programmatically closes the menu button (sets isOpen to false) |
| `open()`   | Programmatically opens the menu button (sets isOpen to true)   |
| `toggle()` | Toggles the current state of the menu button                   |

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

    render() {
        return html`
            <div>
                <mjo-menu-button color="primary" effect="cross"></mjo-menu-button>
                <button @click=${this.openMenu}>Open</button>
                <button @click=${this.closeMenu}>Close</button>
                <button @click=${this.toggleMenu}>Toggle</button>
            </div>
        `;
    }
}
```

## Events

| Event                | Detail                | Emitted When                           | Notes                               |
| -------------------- | --------------------- | -------------------------------------- | ----------------------------------- |
| `click`              | Native `MouseEvent`   | User clicks the menu button            | Native button click event           |
| `menu-button-open`   | `{ isOpen: true }`    | Menu button is opened programmatically | Custom event with state information |
| `menu-button-close`  | `{ isOpen: false }`   | Menu button is closed programmatically | Custom event with state information |
| `menu-button-toggle` | `{ isOpen: boolean }` | Menu button state is toggled           | Custom event with current state     |

## CSS Custom Properties

| Property                        | Default                    | Description                                     |
| ------------------------------- | -------------------------- | ----------------------------------------------- |
| `--mjo-menu-button-color-hover` | `var(--mjo-{color}-color)` | Hover color based on the selected color variant |

### Color-Specific Hover Variables

The component automatically uses different hover colors based on the `color` attribute:

-   **Primary**: `var(--mjo-menu-button-color-hover, var(--mjo-primary-color, #1d7fdb))`
-   **Secondary**: `var(--mjo-menu-button-color-hover, var(--mjo-secondary-color, #cc3d74))`
-   **Success**: `var(--mjo-menu-button-color-hover, var(--mjo-color-success, #20d338))`
-   **Info**: `var(--mjo-menu-button-color-hover, var(--mjo-color-info, #2065cc))`
-   **Warning**: `var(--mjo-menu-button-color-hover, var(--mjo-color-warning, #df950c))`
-   **Error**: `var(--mjo-menu-button-color-hover, var(--mjo-color-error, #cf2a2a))`

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

-   **Semantic HTML**: Uses a native `<button>` element for proper keyboard navigation and screen reader support
-   **ARIA Attributes**: Automatically includes `aria-expanded`, `aria-label`, and optionally `aria-controls`
-   **Keyboard Support**: Full keyboard interaction (Enter, Space, Tab navigation)
-   **Focus Management**: Clear focus indicators with `:focus-visible` support
-   **State Announcements**: Screen readers are informed of state changes through ARIA attributes
-   **Reduced Motion**: Respects `prefers-reduced-motion` user preference with simplified animations
-   **Disabled State**: Proper disabled state handling with visual and functional changes

### ARIA Labels

The component supports ARIA labeling through the native `aria-label` attribute:

-   Use `aria-label` to provide accessible names for the button
-   Labels should clearly indicate the button's purpose (e.g., "Toggle navigation menu")
-   The component also supports `ariaControls` property for menu relationships

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
        // Additional logic can be added here
        console.log(`Navigation menu ${this.menuOpen ? "opened" : "closed"}`);
    }

    private handleKeyDown(event: KeyboardEvent) {
        // Close menu on Escape key
        if (event.key === "Escape" && this.menuOpen) {
            this.menuOpen = false;
            // Return focus to menu button
            const menuButton = this.shadowRoot?.querySelector("mjo-menu-button");
            (menuButton as HTMLElement)?.focus();
        }
    }

    render() {
        return html`
            <div @keydown=${this.handleKeyDown}>
                <header role="banner">
                    <h1>My Application</h1>
                    <mjo-menu-button
                        color="primary"
                        effect="cross"
                        .isOpen=${this.menuOpen}
                        aria-label="Toggle navigation menu"
                        aria-controls="main-navigation"
                        @mjo-menu-toggle=${this.handleMenuToggle}
                    ></mjo-menu-button>
                </header>

                <nav id="main-navigation" role="navigation" ?hidden=${!this.menuOpen} aria-label="Main navigation">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        `;
    }
}
```

### Reduced Motion Support

The component automatically detects when users prefer reduced motion:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-reduced-motion")
export class ExampleMenuButtonReducedMotion extends LitElement {
    render() {
        return html`
            <div>
                <h4>Accessibility-Aware Menu Buttons</h4>
                <p>These buttons respect the user's motion preferences:</p>

                <!-- These will use simple cross animation if user prefers reduced motion -->
                <mjo-menu-button color="primary" effect="bounce" aria-label="Navigation menu"></mjo-menu-button>
                <mjo-menu-button color="secondary" effect="spin" aria-label="Options menu"></mjo-menu-button>
                <mjo-menu-button color="success" effect="rotate" aria-label="Actions menu"></mjo-menu-button>
            </div>
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

    private simulateLoading() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
        }, 3000);
    }

    render() {
        return html`
            <div>
                <h4>Disabled State Handling</h4>
                <mjo-menu-button
                    color="primary"
                    effect="cross"
                    .disabled=${this.isLoading}
                    label=${this.isLoading ? "Menu unavailable" : "Toggle menu"}
                ></mjo-menu-button>

                <button @click=${this.simulateLoading} ?disabled=${this.isLoading}>${this.isLoading ? "Loading..." : "Simulate Loading"}</button>
            </div>
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
                <div class="effect-item">
                    <h5>Cross</h5>
                    <mjo-menu-button effect="cross" color="primary"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Wink</h5>
                    <mjo-menu-button effect="wink" color="secondary"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Wink Reverse</h5>
                    <mjo-menu-button effect="wink-reverse" color="info"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Bounce</h5>
                    <mjo-menu-button effect="bounce" color="success"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Rotate</h5>
                    <mjo-menu-button effect="rotate" color="warning"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Rotate Reverse</h5>
                    <mjo-menu-button effect="rotate-reverse" color="error"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Push</h5>
                    <mjo-menu-button effect="push" color="primary"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Push Reverse</h5>
                    <mjo-menu-button effect="push-reverse" color="secondary"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Async</h5>
                    <mjo-menu-button effect="async" color="info"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Async Reverse</h5>
                    <mjo-menu-button effect="async-reverse" color="success"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Spin</h5>
                    <mjo-menu-button effect="spin" color="warning"></mjo-menu-button>
                </div>
                <div class="effect-item">
                    <h5>Spin Reverse</h5>
                    <mjo-menu-button effect="spin-reverse" color="error"></mjo-menu-button>
                </div>
            </div>
        `;
    }

    static styles = css`
        .effects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1.5rem;
            padding: 1rem;
        }

        .effect-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: white;
        }

        .effect-item h5 {
            margin: 0;
            font-size: 0.875rem;
            color: #374151;
            text-align: center;
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
            <div class="variants-container">
                <!-- Size Variants -->
                <div class="section">
                    <h4>Size Variants</h4>
                    <div class="size-row">
                        <div class="variant-item">
                            <span class="label">Small</span>
                            <mjo-menu-button size="sm" color="primary" effect="cross"></mjo-menu-button>
                        </div>
                        <div class="variant-item">
                            <span class="label">Medium</span>
                            <mjo-menu-button size="md" color="primary" effect="cross"></mjo-menu-button>
                        </div>
                        <div class="variant-item">
                            <span class="label">Large</span>
                            <mjo-menu-button size="lg" color="primary" effect="cross"></mjo-menu-button>
                        </div>
                    </div>
                </div>

                <!-- Color Variants -->
                <div class="section">
                    <h4>Color Variants</h4>
                    <div class="color-grid">
                        <div class="color-item">
                            <span class="color-label">Primary</span>
                            <mjo-menu-button color="primary" effect="wink"></mjo-menu-button>
                        </div>
                        <div class="color-item">
                            <span class="color-label">Secondary</span>
                            <mjo-menu-button color="secondary" effect="wink"></mjo-menu-button>
                        </div>
                        <div class="color-item">
                            <span class="color-label">Success</span>
                            <mjo-menu-button color="success" effect="wink"></mjo-menu-button>
                        </div>
                        <div class="color-item">
                            <span class="color-label">Info</span>
                            <mjo-menu-button color="info" effect="wink"></mjo-menu-button>
                        </div>
                        <div class="color-item">
                            <span class="color-label">Warning</span>
                            <mjo-menu-button color="warning" effect="wink"></mjo-menu-button>
                        </div>
                        <div class="color-item">
                            <span class="color-label">Error</span>
                            <mjo-menu-button color="error" effect="wink"></mjo-menu-button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .variants-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 1rem;
        }

        .section h4 {
            margin: 0 0 1rem 0;
            color: #1f2937;
        }

        .size-row {
            display: flex;
            gap: 2rem;
            align-items: end;
        }

        .variant-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
        }

        .label {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
        }

        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 1rem;
        }

        .color-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: white;
        }

        .color-label {
            font-size: 0.875rem;
            color: #374151;
            font-weight: 500;
        }
    `;
}
```

## Interactive State Management

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-menu-button";

@customElement("example-menu-button-interactive")
export class ExampleMenuButtonInteractive extends LitElement {
    @state() private menuOpen = false;
    @state() private noRippleOpen = false;

    private handleMenuToggle() {
        this.menuOpen = !this.menuOpen;
    }

    private handleNoRippleToggle() {
        this.noRippleOpen = !this.noRippleOpen;
    }

    private openMenu() {
        this.menuOpen = true;
    }

    private closeMenu() {
        this.menuOpen = false;
    }

    render() {
        return html`
            <div class="interactive-container">
                <!-- Controlled State -->
                <div class="section">
                    <h4>Controlled Menu State</h4>
                    <div class="controlled-demo">
                        <mjo-menu-button color="primary" effect="cross" .isOpen=${this.menuOpen} @click=${this.handleMenuToggle}></mjo-menu-button>

                        <div class="controls">
                            <button class="control-btn" @click=${this.openMenu}>Open</button>
                            <button class="control-btn" @click=${this.closeMenu}>Close</button>
                            <button class="control-btn" @click=${this.handleMenuToggle}>Toggle</button>
                        </div>

                        <div class="state-display">Status: <strong>${this.menuOpen ? "Open" : "Closed"}</strong></div>
                    </div>
                </div>

                <!-- Without Ripple Effect -->
                <div class="section">
                    <h4>Without Ripple Effect</h4>
                    <div class="no-ripple-demo">
                        <mjo-menu-button
                            color="secondary"
                            effect="bounce"
                            .isOpen=${this.noRippleOpen}
                            noink
                            @click=${this.handleNoRippleToggle}
                        ></mjo-menu-button>

                        <div class="info">
                            <p>This menu button has <code>noink</code> attribute to disable ripple effect.</p>
                            <p>Status: <strong>${this.noRippleOpen ? "Open" : "Closed"}</strong></p>
                        </div>
                    </div>
                </div>

                <!-- Navigation Example -->
                <div class="section">
                    <h4>Navigation Integration</h4>
                    <div class="nav-demo">
                        <div class="mobile-header">
                            <div class="logo">MyApp</div>
                            <mjo-menu-button color="primary" effect="spin" size="sm"></mjo-menu-button>
                        </div>
                        <p class="nav-description">Typical usage in a mobile navigation header with logo and menu button.</p>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .interactive-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 600px;
        }

        .section h4 {
            margin: 0 0 1rem 0;
            color: #1f2937;
        }

        .controlled-demo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
        }

        .controls {
            display: flex;
            gap: 0.5rem;
        }

        .control-btn {
            padding: 0.5rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            color: #374151;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s ease;
        }

        .control-btn:hover {
            border-color: #9ca3af;
            background: #f9fafb;
        }

        .state-display {
            padding: 0.75rem 1rem;
            background: #f3f4f6;
            border-radius: 6px;
            font-size: 0.875rem;
            color: #374151;
        }

        .no-ripple-demo {
            display: flex;
            align-items: center;
            gap: 2rem;
            padding: 2rem;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
        }

        .info p {
            margin: 0 0 0.5rem 0;
            font-size: 0.875rem;
            color: #6b7280;
        }

        .info code {
            background: #f3f4f6;
            padding: 0.125rem 0.25rem;
            border-radius: 3px;
            font-family: monospace;
            font-size: 0.8rem;
        }

        .nav-demo {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .mobile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            color: white;
        }

        .logo {
            font-size: 1.25rem;
            font-weight: bold;
        }

        .nav-description {
            font-size: 0.875rem;
            color: #6b7280;
            margin: 0;
        }
    `;
}
```

## Performance Considerations

-   **Animation Blocking**: During animations, the `isAnimated` flag prevents rapid state changes that could cause visual glitches
-   **CSS Transitions**: Uses CSS transitions for smooth, hardware-accelerated animations
-   **Event Handling**: Efficient click handling with proper event delegation
-   **Memory Management**: Automatic cleanup of animation timeouts to prevent memory leaks

## Best Practices

-   **Consistent Effects**: Use the same effect across your application for consistency
-   **Appropriate Sizing**: Choose size based on your UI layout (sm for compact layouts, lg for touch interfaces)
-   **Color Coordination**: Match the color prop with your overall design system
-   **State Management**: Use controlled state when you need to sync with other components
-   **Accessibility**: Always provide appropriate ARIA labels and roles
-   **Testing**: Test animations on different devices to ensure smooth performance

## Common Use Cases

1. **Mobile Navigation**: Primary use case for responsive navigation menus
2. **Sidebar Toggle**: Opening and closing sidebar panels
3. **Menu Overlay**: Triggering full-screen menu overlays
4. **Settings Panel**: Opening configuration or settings panels
5. **Filter Toggle**: Showing/hiding filter options in data views

## Summary

`<mjo-menu-button>` provides a flexible, animated hamburger menu button with multiple visual effects and customization options. It integrates seamlessly with the mjo-litui design system while offering extensive theming capabilities through both global and instance-level customization. The component handles state management efficiently and provides smooth animations that enhance user experience without compromising performance.

For additional theming options and design system integration, see the [Theming Guide](./theming.md).
