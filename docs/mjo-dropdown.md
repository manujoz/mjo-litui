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
| `preventScroll`            | `boolean`                     | `false`           | no       | Prevents page scrolling when dropdown is open                              |
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

-   The dropdown container is created dynamically and appended to `document.body`
-   Position is automatically calculated and updated on scroll/resize
-   Click behavior includes a 100ms debounce to prevent immediate close on trigger click
-   When `preventScroll` is true, the dropdown locks scroll position during display
-   When `preventCloseOnInnerClick` is true, clicking inside the dropdown content will not close the dropdown
-   `suppressOpenSelectors` array allows preventing dropdown opening when click events originate from matching elements (only applies to `behaviour="click"`)
-   Theme inheritance: dropdown inherits theme from closest `<mjo-theme>` ancestor

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

-   **aria-haspopup="true"**: Indicates trigger element has a popup
-   **aria-expanded**: Reflects current open/closed state
-   **aria-controls**: Links trigger to dropdown content via ID
-   **role="region"**: Applied to dropdown container for screen readers
-   **aria-labelledby**: Links dropdown content to trigger element

### Keyboard Navigation

-   **Escape**: Closes dropdown and restores focus to trigger
-   **Tab**: Normal tab navigation through dropdown content
-   **Shift+Tab**: Reverse tab navigation
-   **Space/Enter**: Opens dropdown when trigger is focused (click mode)

### Focus Management

-   Focus is automatically moved to dropdown content when opened
-   Focus is restored to trigger element when closed (configurable via `restoreFocus`)
-   Focus trap prevents tabbing outside dropdown when open
-   Screen reader announcements for state changes

## Public Methods

| Method             | Parameters   | Returns | Description                                |
| ------------------ | ------------ | ------- | ------------------------------------------ |
| `open()`           | none         | `void`  | Programmatically opens the dropdown        |
| `close()`          | `ev?: Event` | `void`  | Programmatically closes the dropdown       |
| `updatePosition()` | none         | `void`  | Recalculates and updates dropdown position |

## CSS Variables

The dropdown component uses a minimal set of CSS variables with comprehensive fallback chains.

### Core Styling

| Variable                          | Fallback                                   | Used For               |
| --------------------------------- | ------------------------------------------ | ---------------------- |
| `--mjo-dropdown-box-shadow`       | `--mjo-box-shadow` (fallback: standard)    | Dropdown shadow        |
| `--mjo-dropdown-radius`           | `--mjo-radius-medium` (fallback: 5px)      | Dropdown border radius |
| `--mjo-dropdown-background-color` | `--mjo-background-color` (fallback: white) | Dropdown background    |

### Container Specific

| Variable                               | Fallback                          | Used For                      |
| -------------------------------------- | --------------------------------- | ----------------------------- |
| `--dropdow-container-background-color` | `--mjo-dropdown-background-color` | Container background override |

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

-   **Bottom positions**: `left-bottom`, `center-bottom`, `right-bottom`
-   **Top positions**: `left-top`, `center-top`, `right-top`
-   **Middle positions**: `left-middle`, `right-middle`

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
