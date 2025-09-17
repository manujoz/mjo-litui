# mjo-drawer

Dynamic side panel component providing slide-out content areas with configurable positioning, animations, overlay management, and comprehensive accessibility support including ARIA patterns, focus management, and keyboard navigation.

## HTML Usage

```html
<mjo-drawer id="myDrawer"></mjo-drawer>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-basic")
export class ExampleDrawerBasic extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private openDrawer() {
        this.drawer.controller.show({
            title: "Basic Drawer",
            content: html`
                <div style="padding: 1rem;">
                    <p>This is a basic drawer with some content.</p>
                    <p>You can put any HTML content here.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div>
                <mjo-button @click=${this.openDrawer} color="primary"> Open Basic Drawer </mjo-button>
                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Positioning Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-positions")
export class ExampleDrawerPositions extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private openDrawer(position: "left" | "right" | "top" | "bottom", title: string) {
        this.drawer.controller.show({
            title: `${title} Drawer`,
            position,
            width: position === "left" || position === "right" ? 400 : undefined,
            height: position === "top" || position === "bottom" ? 300 : undefined,
            content: html`
                <div style="padding: 1rem;">
                    <h4>Content from the ${position}</h4>
                    <p>This drawer slides in from the ${position} side of the screen.</p>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h4>Drawer Positions</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; max-width: 400px;">
                    <mjo-button @click=${() => this.openDrawer("left", "Left")} color="primary"> Left Drawer </mjo-button>
                    <mjo-button @click=${() => this.openDrawer("right", "Right")} color="secondary"> Right Drawer </mjo-button>
                    <mjo-button @click=${() => this.openDrawer("top", "Top")} color="success"> Top Drawer </mjo-button>
                    <mjo-button @click=${() => this.openDrawer("bottom", "Bottom")} color="warning"> Bottom Drawer </mjo-button>
                </div>
                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Advanced Configuration Example

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-advanced")
export class ExampleDrawerAdvanced extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;
    @state() private logs: string[] = [];

    private addLog(message: string) {
        this.logs = [...this.logs, `${new Date().toLocaleTimeString()}: ${message}`];
    }

    private openBlockedDrawer() {
        this.addLog("Opening blocked drawer...");
        this.drawer.controller.show({
            title: "Blocked Drawer",
            blocked: true,
            width: 450,
            content: html`
                <div style="padding: 1rem;">
                    <p style="color: #f59e0b; font-weight: 500;">⚠️ This drawer is blocked!</p>
                    <p>Blocked drawers can only be closed programmatically:</p>
                    <mjo-button @click=${() => this.drawer.controller.close()} color="error"> Force Close </mjo-button>
                </div>
            `,
            onOpen: () => this.addLog("Blocked drawer opened"),
            onClose: () => this.addLog("Blocked drawer closed"),
        });
    }

    private openCustomAnimationDrawer() {
        this.addLog("Opening slow animation drawer...");
        this.drawer.controller.show({
            title: "Custom Animation",
            animationDuration: 800,
            content: html`
                <div style="padding: 1rem;">
                    <p>This drawer uses a slower animation (800ms).</p>
                    <mjo-button @click=${() => this.drawer.controller.close()} color="primary"> Close </mjo-button>
                </div>
            `,
            onOpen: () => this.addLog("Animation completed"),
            onClose: () => this.addLog("Drawer closed"),
        });
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Advanced Configuration</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <mjo-button @click=${this.openBlockedDrawer} color="warning"> Blocked Drawer </mjo-button>
                        <mjo-button @click=${this.openCustomAnimationDrawer} color="secondary"> Custom Animation </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>Event Log</h4>
                    <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 1rem; max-height: 150px; overflow-y: auto;">
                        ${this.logs.length > 0
                            ? this.logs.map((log) => html`<div style="font-family: monospace; font-size: 0.9rem;">${log}</div>`)
                            : html`<div style="color: #6c757d;">No events yet. Open a drawer to see callbacks.</div>`}
                    </div>
                    <mjo-button @click=${() => (this.logs = [])} variant="ghost" size="small" style="margin-top: 0.5rem;"> Clear Log </mjo-button>
                </div>

                <mjo-drawer></mjo-drawer>
            </div>
        `;
    }
}
```

## Theming Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";
import "mjo-litui/mjo-button";

@customElement("example-drawer-themed")
export class ExampleDrawerThemed extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    static styles = css`
        .dark-drawer {
            --mjo-drawer-background-color: #1f2937;
            --mjo-drawer-title-border-color: #374151;
            --mjo-drawer-box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
            color: #f3f4f6;
        }
    `;

    private openDarkDrawer() {
        this.drawer.controller.show({
            title: "Dark Theme Drawer",
            position: "right",
            content: html`
                <div style="padding: 1rem;">
                    <h4 style="color: #f3f4f6;">Dark Theme</h4>
                    <p style="color: #d1d5db;">This drawer uses custom CSS variables for theming.</p>
                    <mjo-button color="primary">Action Button</mjo-button>
                </div>
            `,
        });
    }

    render() {
        return html`
            <div>
                <mjo-button @click=${this.openDarkDrawer} color="primary"> Dark Theme Drawer </mjo-button>
                <mjo-drawer class="dark-drawer" idDrawer="themed-drawer"></mjo-drawer>
            </div>
        `;
    }
}
```

## Styling Architecture

### Important: Drawer Container Mounting

The `mjo-drawer` component works by dynamically creating a `mjoint-drawer-container` element that is mounted directly in the document `<body>`. This architecture provides several benefits:

- **Overlay Management**: Ensures the drawer appears above all other content
- **Z-index Control**: Prevents z-index conflicts with parent containers
- **Overflow Prevention**: Bypasses any parent `overflow: hidden` styles
- **Focus Management**: Enables proper focus trapping and restoration

### CSS Variables and Parts Application

Because the actual drawer content is rendered in the `mjoint-drawer-container` (mounted in the body), CSS variables and CSS parts cannot be applied directly to the `mjo-drawer` component. Instead, you need to target the container using the `idDrawer` property.

### Usage with `idDrawer` Property

The `idDrawer` property allows you to assign a specific ID to the dynamically created drawer container, enabling targeted styling:

```html
<mjo-drawer idDrawer="my-settings-drawer"></mjo-drawer>
```

This creates a container with `id="my-settings-drawer"` in the document body, which you can then style:

```css
/* Target the specific drawer container */
#my-settings-drawer {
    --mjo-drawer-width: 600px;
    --mjo-drawer-background-color: #f8f9fa;
}

/* Apply CSS parts to the specific drawer */
#my-settings-drawer::part(backdrop) {
    background-color: rgba(0, 0, 0, 0.8);
}
```

### Global vs Specific Styling

#### Global Styling (All Drawers)

```css
/* Apply to all drawer containers */
:root {
    --mjo-drawer-width: 500px;
    --mjo-drawer-backdrop-background-color: rgba(0, 0, 0, 0.5);
}

/* Target all drawer containers */
mjo-drawer-container {
    --mjo-drawer-background-color: #ffffff;
}
```

#### Specific Styling (Individual Drawers)

```css
/* Apply only to drawers with specific idDrawer */
#navigation-drawer {
    --mjo-drawer-width: 280px;
    --mjo-drawer-background-color: #1f2937;
}

#settings-drawer {
    --mjo-drawer-width: 450px;
    --mjo-drawer-background-color: #f3f4f6;
}
```

### Complete Styling Example

```ts
@customElement("app-with-styled-drawers")
export class AppWithStyledDrawers extends LitElement {
    @query("#nav-drawer") navDrawer!: MjoDrawer;
    @query("#settings-drawer") settingsDrawer!: MjoDrawer;

    static styles = css`
        /* Global drawer defaults */
        :root {
            --mjo-drawer-backdrop-background-color: rgba(0, 0, 0, 0.6);
            --mjo-drawer-focus-outline-color: #3b82f6;
        }

        /* Navigation drawer specific styles */
        #app-navigation {
            --mjo-drawer-width: 280px;
            --mjo-drawer-background-color: #1e293b;
            --mjo-drawer-title-border-color: #334155;
        }

        /* Settings drawer specific styles */
        #app-settings {
            --mjo-drawer-width: 500px;
            --mjo-drawer-background-color: #f8fafc;
            --mjo-drawer-box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        /* Custom parts styling */
        #app-navigation::part(content) {
            padding: 0;
        }

        #app-settings::part(close-button) {
            background-color: #ef4444;
            border-radius: 50%;
        }
    `;

    private openNavigation() {
        this.navDrawer.controller.show({
            title: "Navigation",
            position: "left",
            content: html`<nav-menu></nav-menu>`,
        });
    }

    private openSettings() {
        this.settingsDrawer.controller.show({
            title: "Settings",
            position: "right",
            content: html`<settings-form></settings-form>`,
        });
    }

    render() {
        return html`
            <main>
                <mjo-button @click=${this.openNavigation}>Menu</mjo-button>
                <mjo-button @click=${this.openSettings}>Settings</mjo-button>

                <mjo-drawer id="nav-drawer" idDrawer="app-navigation"></mjo-drawer>
                <mjo-drawer id="settings-drawer" idDrawer="app-settings"></mjo-drawer>
            </main>
        `;
    }
}
```

### Best Practices for Styling

1. **Use `idDrawer` for specific styling**: Always provide a unique `idDrawer` when you need custom styling
2. **Global defaults in `:root`**: Set common variables in `:root` for consistency across all drawers
3. **Semantic naming**: Use descriptive IDs like `"navigation-drawer"` or `"user-settings"`
4. **CSS parts for advanced styling**: Use `::part()` selectors for styling internal elements
5. **Test with multiple drawers**: Ensure your styling doesn't conflict when multiple drawers exist

## Attributes / Properties

| Property          | Type                  | Default     | Description                                           |
| ----------------- | --------------------- | ----------- | ----------------------------------------------------- |
| `idDrawer`        | `string \| undefined` | `undefined` | ID assigned to the drawer container for CSS targeting |
| `ariaLabelledby`  | `string \| undefined` | `undefined` | ID of element that labels the drawer                  |
| `ariaDescribedby` | `string \| undefined` | `undefined` | ID of element that describes the drawer               |
| `label`           | `string \| undefined` | `undefined` | Accessible name for the drawer                        |
| `trapFocus`       | `boolean`             | `true`      | Whether to trap focus within the drawer               |
| `restoreFocus`    | `boolean`             | `true`      | Whether to restore focus when closing                 |
| `closeOnEscape`   | `boolean`             | `true`      | Whether escape key closes the drawer                  |
| `initialFocus`    | `string \| undefined` | `undefined` | Selector for element to focus when opened             |

### Property Details

#### `idDrawer`

This property is essential for styling the drawer since the actual container is mounted in the document body. When specified, the dynamically created `mjoint-drawer-container` receives this ID, allowing you to apply CSS variables and parts:

```html
<mjo-drawer idDrawer="my-drawer"></mjo-drawer>
```

```css
#my-drawer {
    --mjo-drawer-width: 600px;
}

#my-drawer::part(backdrop) {
    background-color: rgba(255, 0, 0, 0.5);
}
```

The remaining properties control drawer behavior and are configured through the controller's `show()` method.

## Controller Methods

| Method  | Parameters         | Return Type | Description                            |
| ------- | ------------------ | ----------- | -------------------------------------- |
| `show`  | `DrawerShowParams` | `void`      | Opens the drawer with specified config |
| `close` | None               | `void`      | Closes the currently open drawer       |

### DrawerShowParams Interface

| Property            | Type                                     | Default     | Description                                      |
| ------------------- | ---------------------------------------- | ----------- | ------------------------------------------------ |
| `content`           | `string \| TemplateResult<1>`            | Required    | Content to display inside the drawer             |
| `title`             | `string \| undefined`                    | `undefined` | Optional title displayed in the drawer header    |
| `position`          | `"top" \| "right" \| "bottom" \| "left"` | `"right"`   | Side of the screen from which drawer slides      |
| `width`             | `string \| number \| undefined`          | `undefined` | Custom width for left/right drawers              |
| `height`            | `string \| number \| undefined`          | `undefined` | Custom height for top/bottom drawers             |
| `blocked`           | `boolean \| undefined`                   | `false`     | Prevents closing by clicking outside or X button |
| `animationDuration` | `number \| undefined`                    | `200`       | Animation duration in milliseconds               |
| `onOpen`            | `(() => void) \| undefined`              | `undefined` | Callback executed when drawer finishes opening   |
| `onClose`           | `(() => void) \| undefined`              | `undefined` | Callback executed when drawer finishes closing   |

### Accessibility Properties

| Property          | Type                   | Default     | Description                               |
| ----------------- | ---------------------- | ----------- | ----------------------------------------- |
| `ariaLabelledby`  | `string \| undefined`  | `undefined` | ID of element that labels the drawer      |
| `ariaDescribedby` | `string \| undefined`  | `undefined` | ID of element that describes the drawer   |
| `label`           | `string \| undefined`  | `undefined` | Accessible name for the drawer            |
| `trapFocus`       | `boolean \| undefined` | `true`      | Whether to trap focus within the drawer   |
| `restoreFocus`    | `boolean \| undefined` | `true`      | Whether to restore focus when closing     |
| `closeOnEscape`   | `boolean \| undefined` | `true`      | Whether escape key closes the drawer      |
| `initialFocus`    | `string \| undefined`  | `undefined` | Selector for element to focus when opened |

### Behavior Notes

- **Position**: Affects both animation direction and default dimensions
- **Dimensions**: Left/right drawers use `width`, top/bottom use `height`
- **Blocked**: When true, prevents all user-initiated closing actions
- **Content**: Supports both string HTML and Lit TemplateResult for dynamic content
- **Callbacks**: Execute after animations complete, not when they start

## Slots

| Slot      | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via the `show()` method |

## Events

The drawer component uses callback functions for lifecycle management rather than custom events, as the drawer container is created dynamically in the document body outside the component tree.

### Lifecycle Callbacks

Use the `onOpen` and `onClose` callback functions in the `show()` method parameters:

```ts
this.drawer.controller.show({
    title: "My Drawer",
    content: html`<div>Content here</div>`,
    onOpen: () => {
        console.log("Drawer opened");
        // Drawer is fully opened and ready for interaction
    },
    onClose: () => {
        console.log("Drawer closed");
        // Drawer is fully closed and removed from DOM
        // Focus has been restored to the previous element
    },
});
```

### Callback Timing

- **`onOpen`**: Called after the opening animation completes and focus trap is activated
- **`onClose`**: Called after the closing animation completes and the drawer is removed from the DOM

## Methods

| Method | Parameters | Return Type | Description                                        |
| ------ | ---------- | ----------- | -------------------------------------------------- |
| None   | -          | -           | All interaction is through the controller instance |

## CSS Parts

The component exposes several CSS parts for advanced styling customization:

| Part           | Description                               | Element                  |
| -------------- | ----------------------------------------- | ------------------------ |
| `backdrop`     | The background overlay behind the drawer  | `.background` div        |
| `container`    | The main drawer container                 | `.container` div         |
| `title`        | The title section of the drawer           | `.title` div             |
| `typography`   | The typography component within the title | `mjo-typography` element |
| `close-button` | The close button in the title section     | `button` element         |
| `content`      | The main content area of the drawer       | `.content` div           |

### CSS Parts Usage Example

**⚠️ Important**: CSS Parts must be applied using the `idDrawer` property since the drawer container is mounted in the document body.

```html
<!-- Component with idDrawer -->
<mjo-drawer idDrawer="styled-drawer"></mjo-drawer>
```

```css
/* ❌ This WILL NOT work - parts cannot be applied to mjo-drawer */
mjo-drawer::part(backdrop) {
    background-color: rgba(255, 0, 0, 0.3);
}

/* ✅ This WILL work - parts applied to the container using idDrawer */
#styled-drawer::part(backdrop) {
    background-color: rgba(255, 0, 0, 0.3);
    backdrop-filter: blur(10px);
}

/* Style the main container */
#styled-drawer::part(container) {
    border-radius: 8px;
    border: 2px solid var(--mjo-theme-primary-color);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Customize the title section */
#styled-drawer::part(title) {
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    color: white;
    padding: 1rem;
    margin: 0;
}

/* Style the close button */
#styled-drawer::part(close-button) {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: white;
    transition: background-color 0.2s;
}

#styled-drawer::part(close-button):hover {
    background-color: rgba(255, 255, 255, 0.3);
}

/* Style the content area */
#styled-drawer::part(content) {
    padding: 2rem;
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}
```

### Global Parts Styling

For consistent styling across all drawers, target the container element directly:

```css
/* Apply to all drawer containers */
mjoint-drawer-container::part(backdrop) {
    backdrop-filter: blur(8px);
}

mjoint-drawer-container::part(container) {
    border-radius: 0.5rem;
}
```

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

**⚠️ Important**: CSS Variables must be applied using the `idDrawer` property or globally, since the drawer container is mounted in the document body.

### Variable Application Methods

#### Method 1: Using `idDrawer` (Recommended for specific drawers)

```html
<mjo-drawer idDrawer="custom-drawer"></mjo-drawer>
```

```css
/* Target specific drawer using its ID */
#custom-drawer {
    --mjo-drawer-width: 600px;
    --mjo-drawer-background-color: #f8f9fa;
    --mjo-drawer-backdrop-background-color: rgba(0, 0, 0, 0.8);
}
```

#### Method 2: Global Variables (Affects all drawers)

```css
/* Apply to all drawers globally */
:root {
    --mjo-drawer-width: 500px;
    --mjo-drawer-backdrop-background-color: rgba(0, 0, 0, 0.6);
}

/* Or target all drawer containers directly */
mjoint-drawer-container {
    --mjo-drawer-background-color: #ffffff;
}
```

#### Method 3: Conditional/Dynamic Styling

```css
/* Apply different styles based on theme or context */
[data-theme="dark"] #user-settings-drawer {
    --mjo-drawer-background-color: #1f2937;
    --mjo-drawer-title-border-color: #374151;
}

[data-theme="light"] #user-settings-drawer {
    --mjo-drawer-background-color: #f9fafb;
    --mjo-drawer-title-border-color: #e5e7eb;
}
```

### Layout and Dimensions

| Variable                                 | Fallback                                              | Used For                              |
| ---------------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| `--mjo-drawer-width`                     | `500px`                                               | Default width for left/right drawers  |
| `--mjo-drawer-height`                    | `500px`                                               | Default height for top/bottom drawers |
| `--mjo-drawer-background-color`          | `var(--mjo-background-color, #fff)`                   | Drawer background color               |
| `--mjo-drawer-box-shadow`                | `var(--mjo-box-shadow3, 0 0 10px rgba(0, 0, 0, 0.5))` | Shadow around drawer                  |
| `--mjo-drawer-title-border-color`        | `var(--mjo-border-color, #ccc)`                       | Border below title section            |
| `--mjo-drawer-backdrop-background-color` | `rgba(0, 0, 0, 0.5)`                                  | Background color of backdrop          |
| `--mjo-drawer-backdrop-filter`           | `blur(5px)`                                           | Backdrop filter effect                |
| `--mjo-drawer-close-icon-color`          | `var(--mjo-foreground-color, currentColor)`           | Color of the close icon               |
| `--mjo-drawer-close-icon-border-radius`  | `var(--mjo-radius-small, 3px)`                        | Border radius of close button         |
| `--mjo-drawer-focus-outline-color`       | `var(--mjo-theme-primary-color, #2563eb)`             | Focus outline color                   |
| `--mjo-drawer-focus-outline-width`       | `2px`                                                 | Focus outline width                   |
| `--mjo-drawer-focus-outline-offset`      | `-2px`                                                | Focus outline offset                  |
| `--mjo-drawer-border-width`              | `1px`                                                 | Border width for high contrast mode   |
| `--mjo-drawer-border-color`              | `transparent`                                         | Border color (default transparent)    |

### High Contrast and Accessibility Support

The component includes built-in support for:

- **High Contrast Mode**: Automatic border styling when `prefers-contrast: high`
- **Reduced Motion**: Animation disabling when `prefers-reduced-motion: reduce`
- **Focus Indicators**: Clear focus outlines with customizable colors and sizing

### Global Integration

The component inherits from the global design system:

- `--mjo-background-color` for consistent backgrounds
- `--mjo-border-color` for consistent borders
- `--mjo-space-small` and `--mjo-space-xsmall` for spacing
- `--mjo-box-shadow3` for consistent shadows

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. However, the drawer doesn't define a specific theme interface since it uses generic CSS variables.

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDrawer } from "mjo-litui/types";
import "mjo-litui/mjo-drawer";

@customElement("example-drawer-themed")
export class ExampleDrawerThemed extends LitElement {
    @query("mjo-drawer") drawer!: MjoDrawer;

    private customTheme = {
        "drawer-background-color": "#1f2937",
        "drawer-title-border-color": "#374151",
        "drawer-box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
    };

    private openThemedDrawer() {
        this.drawer.controller.show({
            title: "Themed Drawer",
            content: html`<div style="padding: 1rem; color: #f3f4f6;">Dark themed content</div>`,
        });
    }

    render() {
        return html`
            <div>
                <mjo-button @click=${this.openThemedDrawer}>Open Themed Drawer</mjo-button>
                <mjo-drawer .theme=${this.customTheme}></mjo-drawer>
            </div>
        `;
    }
}
```

## Usage Patterns

### Basic Implementation

```ts
// 1. Import the component
import "mjo-litui/mjo-drawer";

// 2. Add to template with query reference
@query("mjo-drawer") drawer!: MjoDrawer;

render() {
    return html`
        <mjo-button @click=${this.openDrawer}>Open</mjo-button>
        <mjo-drawer></mjo-drawer>
    `;
}

// 3. Use controller to show/hide
private openDrawer() {
    this.drawer.controller.show({
        title: "My Drawer",
        content: html`<div>Content here</div>`
    });
}
```

### Advanced Configuration

```ts
private openAdvancedDrawer() {
    this.drawer.controller.show({
        title: "Advanced Settings",
        position: "left",
        width: 450,
        blocked: false,
        animationDuration: 300,
        content: html`<complex-form></complex-form>`,
        onOpen: () => console.log("Drawer opened"),
        onClose: () => this.handleDrawerClose()
    });
}
```

## Best Practices

### Content Design

- Keep titles concise and descriptive
- Organize content in logical sections with proper hierarchy
- Consider scrollable content for longer drawers
- Use consistent positioning conventions for different use cases

### User Experience & Performance

- Provide visual feedback during animations (200-300ms recommended)
- Implement proper loading states for async content
- Lazy load heavy content when drawer opens
- Consider escape key handling and focus management for accessibility
- Optimize animations for mobile devices and test with reduced motion preferences

## Summary

`<mjo-drawer>` provides a flexible, powerful slide-out panel system with comprehensive customization options and full accessibility support. The component supports multiple positioning modes, configurable dimensions, modal behaviors, extensive theming capabilities, ARIA patterns, focus management, and keyboard navigation.

### Key Features

- **Full Accessibility**: ARIA roles, focus trapping, keyboard navigation, screen reader support
- **Custom Events**: New event naming convention `mjo-component-name:event-name`
- **Focus Management**: Automatic focus trapping and restoration with customizable initial focus
- **Keyboard Support**: Escape key handling, Tab navigation, and reduced motion support
- **High Contrast**: Automatic styling adjustments for accessibility preferences

Use drawers for navigation menus, settings panels, help documentation, notification centers, and any scenario requiring temporary overlay content. The controller-based API provides programmatic control while maintaining clean separation between the trigger elements and the drawer implementation.

### Accessibility Compliance

The component follows WCAG 2.1 guidelines and implements the Modal Dialog design pattern from the W3C ARIA Authoring Practices Guide, ensuring compatibility with assistive technologies and keyboard-only navigation.
