# mjo-dropdown

Accessible dropdown component that displays floating content relative to its trigger element. Supports multiple positioning strategies, hover/click behaviors, keyboard navigation, focus management, and comprehensive accessibility features.

## HTML Usage

```html
<mjo-dropdown behaviour="hover">
    <button>Hover me</button>
</mjo-dropdown>

<mjo-dropdown behaviour="click" fullwidth>
    <input type="text" placeholder="Click me" />
</mjo-dropdown>
```

## Usage

### Basic Hover Dropdown

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-hover")
export class ExampleDropdownHover extends LitElement {
    render() {
        return html`
            <mjo-dropdown
                behaviour="hover"
                .html=${html`
                    <div style="padding: 1rem; background: white; border: 1px solid #ccc;">
                        <p>This is dropdown content!</p>
                        <button>Action</button>
                    </div>
                `}
            >
                <button>Hover me for dropdown</button>
            </mjo-dropdown>
        `;
    }
}
```

### Click Dropdown with Menu

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-click")
export class ExampleDropdownClick extends LitElement {
    render() {
        return html`
            <mjo-dropdown
                behaviour="click"
                .html=${html`
                    <div style="padding: 1rem; min-width: 200px;">
                        <h4>Menu Options</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li><a href="#" style="display: block; padding: 0.5rem;">Profile</a></li>
                            <li><a href="#" style="display: block; padding: 0.5rem;">Settings</a></li>
                            <li><a href="#" style="display: block; padding: 0.5rem;">Logout</a></li>
                        </ul>
                    </div>
                `}
            >
                <button>Click for menu</button>
            </mjo-dropdown>
        `;
    }
}
```

### Form Dropdown (Prevent Close on Inner Click)

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-form")
export class ExampleDropdownForm extends LitElement {
    @state() private formData = { name: "", email: "" };

    private handleSubmit(e: Event) {
        e.preventDefault();
        console.log("Form submitted:", this.formData);
        // Close dropdown programmatically after form submission
        const dropdown = this.shadowRoot?.querySelector("mjo-dropdown") as any;
        dropdown?.close();
    }

    render() {
        return html`
            <mjo-dropdown
                behaviour="click"
                preventCloseOnInnerClick
                .html=${html`
                    <div style="padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px; min-width: 300px;">
                        <h3 style="margin: 0 0 1rem 0;">User Information</h3>
                        <form @submit=${this.handleSubmit}>
                            <div style="margin-bottom: 1rem;">
                                <label>Name:</label>
                                <input type="text" .value=${this.formData.name} style="width: 100%; padding: 0.5rem;" />
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label>Email:</label>
                                <input type="email" .value=${this.formData.email} style="width: 100%; padding: 0.5rem;" />
                            </div>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                `}
            >
                <button>Edit User Info</button>
            </mjo-dropdown>
        `;
    }
}
```

## Attributes / Properties

| Name                       | Type                          | Default           | Reflects | Description                                                                |
| -------------------------- | ----------------------------- | ----------------- | -------- | -------------------------------------------------------------------------- |
| `fullwidth`                | `boolean`                     | `false`           | no       | Makes dropdown width match trigger element width                           |
| `disabled`                 | `boolean`                     | `false`           | no       | Disables dropdown interaction                                              |
| `scrollLocked`             | `boolean`                     | `false`           | no       | Prevents page scrolling when dropdown is open                              |
| `isOpen`                   | `boolean`                     | `false`           | yes      | Controls dropdown open state (can be used for programmatic control)        |
| `css`                      | `CSSResult \| undefined`      | `undefined`       | no       | Custom CSS styles to apply to dropdown content                             |
| `html`                     | `TemplateResult \| undefined` | `undefined`       | no       | HTML template to render inside dropdown                                    |
| `behaviour`                | `"hover" \| "click"`          | `"hover"`         | no       | Interaction mode: hover or click to trigger                                |
| `width`                    | `string \| undefined`         | `undefined`       | no       | Fixed width for dropdown (converted to pixels if numeric)                  |
| `height`                   | `string \| undefined`         | `undefined`       | no       | Fixed height for dropdown (converted to pixels if numeric)                 |
| `preventCloseOnInnerClick` | `boolean`                     | `false`           | no       | Prevents dropdown from closing when clicking inside dropdown content       |
| `position`                 | `MjoDropdownPosition`         | `"center-bottom"` | no       | Preferred position for dropdown relative to trigger                        |
| `restoreFocus`             | `boolean`                     | `true`            | no       | Restores focus to trigger element when dropdown closes                     |
| `suppressOpenSelectors`    | `string[] \| undefined`       | `undefined`       | no       | CSS selectors that prevent dropdown opening when matched (click mode only) |

### Internal Properties

| Name                | Type                        | Description                                             |
| ------------------- | --------------------------- | ------------------------------------------------------- |
| `dropdownContainer` | `DropdownContainer \| null` | Reference to the floating dropdown container element    |
| `openTimestamp`     | `number`                    | Timestamp when dropdown was opened (for click debounce) |

### Behavior Notes

- The dropdown container is created dynamically and appended to `document.body`
- Position is automatically calculated and updated on scroll/resize
- Click behavior includes a 100ms debounce to prevent immediate close on trigger click
- When `scrollLocked` is true, the dropdown locks scroll position during display
- When `preventCloseOnInnerClick` is true, clicking inside the dropdown content will not close the dropdown
- `suppressOpenSelectors` array allows preventing dropdown opening when click events originate from matching elements (only applies to `behaviour="click"`)
- Theme inheritance: dropdown inherits theme from closest `<mjo-theme>` ancestor

## Slots

| Name      | Description                                             |
| --------- | ------------------------------------------------------- |
| `trigger` | Element that triggers the dropdown (button, link, etc.) |
| (default) | Default slot for dropdown content                       |

## Events

| Name                  | Type                     | Description                                                                |
| --------------------- | ------------------------ | -------------------------------------------------------------------------- |
| `mjo-dropdown-opened` | `MjoDropdownOpenedEvent` | Fired when dropdown opens. Contains `isOpen: true` property                |
| `mjo-dropdown-closed` | `MjoDropdownClosedEvent` | Fired when dropdown closes. Contains `isOpen: false` property              |
| `mjo-dropdown-change` | `MjoDropdownChangeEvent` | Fired when dropdown state changes. Contains `isOpen: boolean` and `reason` |

## Accessibility Features

The `mjo-dropdown` component implements comprehensive accessibility features following ARIA standards:

### ARIA Attributes

- **aria-haspopup="true"**: Indicates trigger element has a popup
- **aria-expanded**: Reflects current open/closed state
- **aria-controls**: Links trigger to dropdown content via ID
- **role="region"**: Applied to dropdown container for screen readers
- **aria-labelledby**: Links dropdown content to trigger element

### Keyboard Navigation

- **Escape**: Closes dropdown and restores focus to trigger
- **Tab**: Normal tab navigation through dropdown content
- **Shift+Tab**: Reverse tab navigation
- **Space/Enter**: Opens dropdown when trigger is focused (click mode)

### Focus Management

- Focus is automatically moved to dropdown content when opened
- Focus is restored to trigger element when closed (configurable via `restoreFocus`)
- Focus trap prevents tabbing outside dropdown when open
- Screen reader announcements for state changes

## Public Methods

| Method             | Parameters   | Returns | Description                                |
| ------------------ | ------------ | ------- | ------------------------------------------ |
| `open()`           | none         | `void`  | Programmatically opens the dropdown        |
| `close()`          | `ev?: Event` | `void`  | Programmatically closes the dropdown       |
| `updatePosition()` | none         | `void`  | Recalculates and updates dropdown position |

## Styling Architecture

### Important: Dropdown Container Mounting

The `mjo-dropdown` component works by dynamically creating a `mjo-dropdown-container` element that is mounted directly in the document `<body>`. This architecture provides several benefits:

- **Overlay Management**: Ensures dropdowns appear above all other content
- **Z-index Control**: Prevents z-index conflicts with parent containers
- **Overflow Prevention**: Bypasses any parent `overflow: hidden` styles
- **Theme Inheritance**: Automatically inherits theme from the closest `mjo-theme` ancestor

### CSS Variables and Parts Application

Because the actual dropdown content is rendered in the `mjo-dropdown-container` (mounted in the body), CSS variables and CSS parts cannot be applied directly to the `mjo-dropdown` component. Instead, you need to target the dynamically created container using the `idDropdown` property or apply styles globally.

### Usage with `idDropdown` Property

The `idDropdown` property allows you to assign a specific ID to the dynamically created dropdown container, enabling targeted styling:

```html
<mjo-dropdown idDropdown="my-settings-dropdown">
    <button>Settings</button>
</mjo-dropdown>
```

This creates a container with `id="my-settings-dropdown"` in the document body, which you can then style:

```css
/* Target the specific dropdown container */
#my-settings-dropdown {
    --mjo-dropdown-background-color: #f8f9fa;
    --mjo-dropdown-border-radius: 12px;
}

/* Apply CSS parts to the specific dropdown */
#my-settings-dropdown::part(dropdown-container) {
    border: 2px solid #e9ecef;
    backdrop-filter: blur(10px);
}
```

### Global vs Specific Styling

#### Global Styling (All Dropdowns)

```css
/* Apply to all dropdown containers */
:root {
    --mjo-dropdown-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    --mjo-dropdown-border-radius: 8px;
}

/* Target all dropdown containers */
mjo-dropdown-container {
    --mjo-dropdown-background-color: #ffffff;
}
```

#### Specific Styling (Individual Dropdowns)

```css
/* Apply only to dropdowns with specific idDropdown */
#user-menu-dropdown {
    --mjo-dropdown-background-color: #1f2937;
    --mjo-dropdown-box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

#tooltip-dropdown {
    --mjo-dropdown-background-color: #374151;
    --mjo-dropdown-border-radius: 4px;
}
```

### Complete Styling Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoDropdown } from "mjo-litui/types";
import "mjo-litui/mjo-dropdown";
import "mjo-litui/mjo-button";

@customElement("app-with-styled-dropdowns")
export class AppWithStyledDropdowns extends LitElement {
    @query("#menu-dropdown") menuDropdown!: MjoDropdown;

    private showMenu() {
        this.menuDropdown.open();
    }

    render() {
        return html`
            <mjo-dropdown
                id="menu-dropdown"
                idDropdown="styled-menu"
                behaviour="click"
                .html=${html`
                    <div style="padding: 1rem;">
                        <h3>Styled Menu</h3>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul>
                    </div>
                `}
            >
                <mjo-button @click=${this.showMenu}>Show Styled Menu</mjo-button>
            </mjo-dropdown>
        `;
    }

    static styles = css`
        /* Global styles applied to the document */
        :host {
            --mjo-dropdown-background-color: #f8fafc;
            --mjo-dropdown-border-radius: 12px;
            --mjo-dropdown-box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
    `;
}

// Add global styles to the document
const globalStyles = document.createElement("style");
globalStyles.textContent = `
    /* Global dropdown container styling */
    #styled-menu::part(dropdown-container) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Hover effects for menu items */
    #styled-menu a {
        color: white;
        text-decoration: none;
        display: block;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    #styled-menu a:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(globalStyles);
```

### Best Practices for Styling

1. **Use `idDropdown` for specific styling**: Always provide a unique `idDropdown` when you need custom styling
2. **Global defaults in `:root`**: Set common variables in `:root` for consistency across all dropdowns
3. **Semantic naming**: Use descriptive IDs like `"user-menu-dropdown"` or `"search-suggestions"`
4. **CSS parts for advanced styling**: Use `::part()` selectors for styling internal elements
5. **Test with multiple dropdowns**: Ensure your styling doesn't conflict when multiple dropdowns exist

## CSS Parts

The dropdown system exposes the following CSS part for advanced styling:

| Part                 | Element                  | Description                                     |
| -------------------- | ------------------------ | ----------------------------------------------- |
| `dropdown-container` | `mjo-dropdown-container` | The main container holding the dropdown content |

### CSS Parts Usage Examples

```css
/* Style the dropdown container */
mjo-dropdown-container::part(dropdown-container) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Interactive states */
mjo-dropdown-container:hover::part(dropdown-container) {
    transform: translateY(-2px);
    box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.35);
}

/* Dark theme dropdown */
mjo-dropdown-container[theme="dark"]::part(dropdown-container) {
    background: #1f2937;
    border: 1px solid #374151;
    color: #f9fafb;
}

/* Light theme dropdown */
mjo-dropdown-container[theme="light"]::part(dropdown-container) {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    color: #111827;
}
```

### Specific Dropdown Styling with idDropdown

```css
/* Style specific dropdown using idDropdown */
#user-profile-dropdown::part(dropdown-container) {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 0;
    overflow: hidden;
}

#search-suggestions::part(dropdown-container) {
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
}

#tooltip-info::part(dropdown-container) {
    background: #374151;
    color: white;
    border-radius: 6px;
    padding: 0.75rem;
    max-width: 250px;
    font-size: 0.875rem;
}
```

## CSS Variables

The dropdown component uses a minimal set of CSS variables with comprehensive fallback chains.

### Core Styling

| Variable                          | Fallback                                   | Used For               |
| --------------------------------- | ------------------------------------------ | ---------------------- |
| `--mjo-dropdown-box-shadow`       | `--mjo-box-shadow` (fallback: standard)    | Dropdown shadow        |
| `--mjo-dropdown-border-radius`    | `--mjo-radius-medium` (fallback: 5px)      | Dropdown border radius |
| `--mjo-dropdown-background-color` | `--mjo-background-color` (fallback: white) | Dropdown background    |
| `--mjo-dropdown-foreground-color` | `--mjo-background-color` (fallback: white) | Dropdown background    |

### Position & Sizing

The dropdown automatically handles positioning based on available viewport space. No CSS variables control position - it's calculated dynamically via JavaScript utilities.

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-dropdown-{property-name}`.

### MjoDropdownTheme Interface

```ts
interface MjoDropdownTheme {
    backgroundColor?: string;
    radius?: string;
    boxShadow?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-themed")
export class ExampleDropdownThemed extends LitElement {
    private customTheme = {
        backgroundColor: "#1f2937",
        radius: "12px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    };

    render() {
        return html`
            <mjo-dropdown
                behaviour="click"
                .theme=${this.customTheme}
                .html=${html`
                    <div style="padding: 1rem; color: white;">
                        <h3 style="margin: 0 0 0.5rem; color: #f9fafb;">Dark Themed</h3>
                        <p style="margin: 0; color: #d1d5db;">Custom themed dropdown content</p>
                    </div>
                `}
            >
                <button>Dark themed dropdown</button>
            </mjo-dropdown>
        `;
    }
}
```

## Integration with mjo-theme

For global dropdown theming across your application:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-global-theme")
export class ExampleDropdownGlobalTheme extends LitElement {
    private globalConfig = {
        mjoDropdown: {
            backgroundColor: "#f8fafc",
            radius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
    };

    render() {
        return html`
            <mjo-theme .config=${this.globalConfig}>
                <mjo-dropdown
                    behaviour="hover"
                    .html=${html`
                        <div style="padding: 1rem;">
                            <p>This dropdown uses global theme configuration</p>
                        </div>
                    `}
                >
                    <button>Globally themed dropdown</button>
                </mjo-dropdown>
            </mjo-theme>
        `;
    }
}
```

## Position Strategies

The dropdown automatically selects the best position based on available viewport space. The positioning system supports 8 different positions:

- **Bottom positions**: `left-bottom`, `center-bottom`, `right-bottom`
- **Top positions**: `left-top`, `center-top`, `right-top`
- **Middle positions**: `left-middle`, `right-middle`

Position is calculated dynamically by the `DropdownContainer` using utilities that consider available space, dropdown dimensions, viewport boundaries, and scroll position.

## Common Use Cases

### Tooltip

```html
<mjo-dropdown behaviour="hover" .html=${html`<div style="padding: 0.5rem;">Helpful tooltip</div>`}>
    <button>?</button>
</mjo-dropdown>
```

### Context Menu

```html
<mjo-dropdown behaviour="click" .html=${html`<div>Menu items...</div>`}>
    <div>Right-click area</div>
</mjo-dropdown>
```

### Select Dropdown

```html
<mjo-dropdown behaviour="click" fullwidth .html=${html`<div>Options list...</div>`}>
    <input readonly placeholder="Select option..." />
</mjo-dropdown>
```
