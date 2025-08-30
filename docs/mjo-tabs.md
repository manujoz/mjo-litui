# mjo-tabs

A versatile tab navigation component that provides organized content switching with multiple visual styles and layout options.

## Features

-   **Multiple Variants**: Light, solid, and bordered visual styles
-   **Color Theming**: Support for semantic color schemes (primary, secondary, success, warning, error, info)
-   **Layout Options**: Horizontal and vertical tab orientations
-   **Dynamic Content**: Programmatic tab management and content updates
-   **Keyboard Navigation**: Full accessibility support with arrow key navigation
-   **SSR Compatible**: Works seamlessly with server-side rendering
-   **Theme Integration**: Built-in theme system support

## Usage

### Basic Implementation

```html
<mjo-tabs>
    <mjo-tab label="Tab 1">Content for first tab</mjo-tab>
    <mjo-tab label="Tab 2">Content for second tab</mjo-tab>
    <mjo-tab label="Tab 3">Content for third tab</mjo-tab>
</mjo-tabs>
```

### TypeScript/Lit Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-tabs";

@customElement("example-tabs-demo")
export class ExampleTabsDemo extends LitElement {
    render() {
        return html`
            <mjo-tabs variant="solid" color="primary">
                <mjo-tab label="Dashboard">
                    <h3>Dashboard Overview</h3>
                    <p>Welcome to your dashboard with key metrics and insights.</p>
                </mjo-tab>
                <mjo-tab label="Analytics">
                    <h3>Analytics Report</h3>
                    <p>Detailed analytics and performance data.</p>
                </mjo-tab>
                <mjo-tab label="Settings">
                    <h3>Settings Panel</h3>
                    <p>Configure your application preferences.</p>
                </mjo-tab>
            </mjo-tabs>
        `;
    }
}
```

## Attributes/Properties

| Name       | Type             | Default     | Description                                                                                         |
| ---------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `variant`  | `MjoTabsVariant` | `"light"`   | Visual style variant: `"light"`, `"solid"`, `"bordered"`                                            |
| `color`    | `MjoTabsColor`   | `"default"` | Color theme: `"default"`, `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"error"`, `"info"` |
| `vertical` | `boolean`        | `false`     | Enable vertical tab layout                                                                          |

## mjo-tab Attributes/Properties

| Name     | Type      | Default | Description                                              |
| -------- | --------- | ------- | -------------------------------------------------------- |
| `label`  | `string`  | `"Tab"` | Text label displayed in the tab button                   |
| `active` | `boolean` | `false` | Whether the tab is currently active (managed internally) |

## Methods

| Name            | Parameters      | Description                                        |
| --------------- | --------------- | -------------------------------------------------- |
| `setTab(index)` | `index: number` | Programmatically switch to a specific tab by index |
| `getTab(index)` | `index: number` | Retrieve a specific tab element by index           |

## Events

| Name               | Detail                           | Description                               |
| ------------------ | -------------------------------- | ----------------------------------------- |
| `mjo-tabs:changed` | `{ index: number, tab: MjoTab }` | Fired when the active tab changes         |
| `mjo-tabs:updated` | `{ tabs: MjoTab[] }`             | Fired when the tabs collection is updated |

## Variants

### Light Variant

The default variant with minimal styling and underline indicator:

```html
<mjo-tabs variant="light" color="primary">
    <mjo-tab label="Home">Home content</mjo-tab>
    <mjo-tab label="About">About content</mjo-tab>
</mjo-tabs>
```

### Solid Variant

Tabs with background color and rounded corners:

```html
<mjo-tabs variant="solid" color="secondary">
    <mjo-tab label="Products">Product listings</mjo-tab>
    <mjo-tab label="Services">Service offerings</mjo-tab>
</mjo-tabs>
```

### Bordered Variant

Tabs with border styling and enclosed appearance:

```html
<mjo-tabs variant="bordered" color="success">
    <mjo-tab label="Overview">Overview content</mjo-tab>
    <mjo-tab label="Details">Detailed information</mjo-tab>
</mjo-tabs>
```

## Color Themes

All color themes work with any variant:

```html
<!-- Primary theme -->
<mjo-tabs color="primary">
    <mjo-tab label="Primary">Primary themed content</mjo-tab>
</mjo-tabs>

<!-- Warning theme -->
<mjo-tabs color="warning" variant="solid">
    <mjo-tab label="Warning">Warning themed content</mjo-tab>
</mjo-tabs>

<!-- Error theme -->
<mjo-tabs color="error" variant="bordered">
    <mjo-tab label="Error">Error themed content</mjo-tab>
</mjo-tabs>
```

## Vertical Layout

Enable vertical layout for sidebar-style navigation:

```html
<mjo-tabs vertical variant="light" color="info">
    <mjo-tab label="Navigation">Vertical navigation example</mjo-tab>
    <mjo-tab label="Content">Main content area</mjo-tab>
    <mjo-tab label="Sidebar">Additional information</mjo-tab>
</mjo-tabs>
```

## Dynamic Tab Management

### Adding Tabs Programmatically

```ts
const tabsElement = document.querySelector("mjo-tabs");
const newTab = document.createElement("mjo-tab");
newTab.label = "New Tab";
newTab.innerHTML = "<p>Dynamic content added at runtime</p>";

tabsElement.appendChild(newTab);
```

### Listening to Tab Changes

```ts
const tabs = document.querySelector("mjo-tabs");

tabs.addEventListener("mjo-tabs:changed", (event) => {
    console.log(`Switched to tab ${event.detail.index}: ${event.detail.tab.label}`);
});

tabs.addEventListener("mjo-tabs:updated", (event) => {
    console.log(`Tabs updated. Total: ${event.detail.tabs.length}`);
});
```

### Programmatic Tab Switching

```ts
const tabs = document.querySelector("mjo-tabs");

// Switch to second tab
tabs.setTab(1);

// Get specific tab
const firstTab = tabs.getTab(0);
console.log("First tab label:", firstTab.label);
```

## Advanced Usage

### Complex Content Structure

```html
<mjo-tabs variant="bordered" color="default">
    <mjo-tab label="Overview">
        <div style="padding: 20px;">
            <h3>📊 Project Overview</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 20px 0;">
                <div style="background: var(--mjo-background-color-high); padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--mjo-primary-color);">1,234</div>
                    <div style="color: var(--mjo-foreground-color-low);">Total Users</div>
                </div>
                <div style="background: var(--mjo-background-color-high); padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--mjo-primary-color);">98.5%</div>
                    <div style="color: var(--mjo-foreground-color-low);">Uptime</div>
                </div>
                <div style="background: var(--mjo-background-color-high); padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold; color: var(--mjo-primary-color);">42</div>
                    <div style="color: var(--mjo-foreground-color-low);">Active Projects</div>
                </div>
            </div>
        </div>
    </mjo-tab>
    <mjo-tab label="Details">
        <div style="padding: 20px;">
            <h3>📋 Detailed Information</h3>
            <p>This tab demonstrates complex content organization.</p>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 20px 0;">
                <div><strong>Created:</strong> January 2024</div>
                <div><strong>Status:</strong> Active</div>
                <div><strong>Last Updated:</strong> Today</div>
                <div><strong>Version:</strong> 1.2.3</div>
            </div>
        </div>
    </mjo-tab>
</mjo-tabs>
```

### Integration with Forms

```html
<mjo-tabs variant="light" color="primary">
    <mjo-tab label="Personal Info">
        <form style="padding: 20px;">
            <mjo-textfield label="Full Name" required></mjo-textfield>
            <mjo-textfield label="Email" type="email" required></mjo-textfield>
        </form>
    </mjo-tab>
    <mjo-tab label="Preferences">
        <div style="padding: 20px;">
            <mjo-switch label="Email Notifications"></mjo-switch>
            <mjo-switch label="Dark Mode"></mjo-switch>
        </div>
    </mjo-tab>
</mjo-tabs>
```

## Relevant CSS Variables

The tabs component inherits from global theme tokens and supports these specific customizations:

| Variable                          | Default                                          | Description                       |
| --------------------------------- | ------------------------------------------------ | --------------------------------- |
| `--mjo-tabs-border-color`         | `var(--mjo-border-color)`                        | Border color for bordered variant |
| `--mjo-tabs-button-font-weight`   | `500`                                            | Font weight for tab buttons       |
| `--mjo-tabs-button-padding`       | `var(--mjo-space-xsmall) var(--mjo-space-small)` | Tab button padding                |
| `--mjo-tabs-button-border-radius` | `var(--mjo-radius-medium)`                       | Tab button border radius          |

### Global Theme Tokens

Tabs inherit from the global theme system. Refer to the [theming documentation](./theming.md) for complete token reference:

-   Color tokens: `--mjo-primary-color`, `--mjo-secondary-color`, etc.
-   Spacing tokens: `--mjo-space-*`
-   Radius tokens: `--mjo-radius-*`
-   Typography tokens: Font family, weights, sizes

## Accessibility

The tabs component follows WAI-ARIA guidelines:

-   **Role Management**: Proper `tablist`, `tab`, and `tabpanel` roles
-   **Keyboard Navigation**: Arrow keys for tab navigation, Enter/Space for activation
-   **Screen Reader Support**: Proper labeling and state announcements
-   **Focus Management**: Visible focus indicators and logical tab sequence

### Keyboard Shortcuts

-   **Arrow Keys**: Navigate between tabs
-   **Enter/Space**: Activate focused tab
-   **Tab**: Move focus to tab content
-   **Shift+Tab**: Move focus back to tab list

## Browser Support

-   **Modern Browsers**: Full support in Chrome, Firefox, Safari, Edge
-   **Internet Explorer**: Not supported (requires modern JavaScript features)
-   **Mobile Browsers**: Full touch and accessibility support

## Best Practices

1. **Content Organization**: Group related content logically
2. **Label Clarity**: Use descriptive, concise tab labels
3. **Performance**: Lazy load complex tab content when possible
4. **Accessibility**: Provide keyboard navigation and screen reader support
5. **Visual Hierarchy**: Choose appropriate variants and colors for context
6. **Mobile Consideration**: Test vertical layout for mobile interfaces

## Troubleshooting

### Common Issues

**Issue**: Tabs not updating when content changes

```ts
// Solution: Force update after DOM changes
const tabs = document.querySelector("mjo-tabs");
tabs.requestUpdate();
```

**Issue**: Event listeners not firing

```ts
// Solution: Ensure proper event listener setup
tabs.addEventListener("mjo-tabs:changed", (e) => {
    console.log("Tab changed:", e.detail);
});
```

**Issue**: Vertical layout not working properly

```html
<!-- Solution: Ensure proper container styling -->
<div style="height: 400px; display: flex;">
    <mjo-tabs vertical>
        <!-- tabs content -->
    </mjo-tabs>
</div>
```

## Related Components

-   [`mjo-button`](./mjo-button.md) - For tab-style button groups
-   [`mjo-accordion`](./mjo-accordion.md) - Alternative content organization
-   [`mjo-drawer`](./mjo-drawer.md) - Side navigation panels
-   [`mjo-breadcrumbs`](./mjo-breadcrumbs.md) - Hierarchical navigation
