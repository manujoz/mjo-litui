# mjo-dropdown

Configurable dropdown component that displays floating content relative to its trigger element. Supports multiple positioning strategies, hover/click behaviors, scroll prevention, and theme customization.

## HTML Usage

```html
<mjo-dropdown behaviour="hover">
    <button>Hover me</button>
</mjo-dropdown>

<mjo-dropdown behaviour="click" fullwidth>
    <input type="text" placeholder="Click me" />
</mjo-dropdown>
```

## Basic Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-basic")
export class ExampleDropdownBasic extends LitElement {
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

## Click Behavior Example

```ts
import { LitElement, html, css } from "lit";
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

## Positioning & Sizing Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-positioning")
export class ExampleDropdownPositioning extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-dropdown
                    behaviour="hover"
                    fullwidth
                    .html=${html`
                        <div style="padding: 1rem; background: #f0f9ff; border: 1px solid #0ea5e9;">
                            <p>This dropdown matches the trigger width (fullwidth)</p>
                        </div>
                    `}
                >
                    <input type="text" placeholder="Fullwidth dropdown" style="width: 300px;" />
                </mjo-dropdown>

                <mjo-dropdown
                    behaviour="hover"
                    width="400"
                    height="200"
                    .html=${html`
                        <div style="padding: 1rem; background: #fef3c7; border: 1px solid #f59e0b; height: 100%;">
                            <p>Fixed width (400px) and height (200px)</p>
                            <p>Content with scrollable overflow if needed</p>
                        </div>
                    `}
                >
                    <button>Fixed size dropdown</button>
                </mjo-dropdown>
            </div>
        `;
    }
}
```

## Custom Styles Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-styles")
export class ExampleDropdownStyles extends LitElement {
    private dropdownStyles = css`
        .custom-dropdown {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .custom-dropdown h3 {
            margin: 0 0 1rem 0;
            font-size: 1.2rem;
        }
        .custom-dropdown p {
            margin: 0.5rem 0;
        }
    `;

    render() {
        return html`
            <mjo-dropdown
                behaviour="click"
                .css=${this.dropdownStyles}
                .html=${html`
                    <div class="custom-dropdown">
                        <h3>Custom Styled Content</h3>
                        <p>This dropdown has custom CSS styling.</p>
                        <p>Background gradient and custom spacing.</p>
                    </div>
                `}
            >
                <button>Click for styled dropdown</button>
            </mjo-dropdown>
        `;
    }
}
```

## Advanced Usage Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-advanced")
export class ExampleDropdownAdvanced extends LitElement {
    @state() private selectedOption = "Select an option";
    @state() private isDropdownOpen = false;

    private options = [
        { value: "option1", label: "First Option" },
        { value: "option2", label: "Second Option" },
        { value: "option3", label: "Third Option" },
    ];

    private handleOptionSelect(value: string, label: string) {
        this.selectedOption = label;
        this.isDropdownOpen = false;
    }

    private handleDropdownOpen() {
        this.isDropdownOpen = true;
    }

    private handleDropdownClose() {
        this.isDropdownOpen = false;
    }

    render() {
        return html`
            <mjo-dropdown
                behaviour="click"
                .isOpen=${this.isDropdownOpen}
                fullwidth
                preventScroll
                .html=${html`
                    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 0.5rem 0;">
                        ${this.options.map(
                            (option) => html`
                                <div
                                    style="padding: 0.75rem 1rem; cursor: pointer; hover: background-color: #f9fafb;"
                                    @click=${() => this.handleOptionSelect(option.value, option.label)}
                                >
                                    ${option.label}
                                </div>
                            `,
                        )}
                    </div>
                `}
                @open=${this.handleDropdownOpen}
                @close=${this.handleDropdownClose}
            >
                <div style="border: 1px solid #d1d5db; padding: 0.75rem 1rem; border-radius: 6px; cursor: pointer; background: white;">
                    ${this.selectedOption}
                    <span style="float: right;">${this.isDropdownOpen ? "▲" : "▼"}</span>
                </div>
            </mjo-dropdown>
        `;
    }
}
```

## Attributes / Properties

| Name                       | Type                          | Default     | Reflects | Description                                                                |
| -------------------------- | ----------------------------- | ----------- | -------- | -------------------------------------------------------------------------- |
| `fullwidth`                | `boolean`                     | `false`     | no       | Makes dropdown width match trigger element width                           |
| `disabled`                 | `boolean`                     | `false`     | no       | Disables dropdown interaction                                              |
| `preventScroll`            | `boolean`                     | `false`     | no       | Prevents page scrolling when dropdown is open                              |
| `isOpen`                   | `boolean`                     | `false`     | yes      | Controls dropdown open state (can be used for programmatic control)        |
| `css`                      | `CSSResult \| undefined`      | `undefined` | no       | Custom CSS styles to apply to dropdown content                             |
| `html`                     | `TemplateResult \| undefined` | `undefined` | no       | HTML template to render inside dropdown                                    |
| `behaviour`                | `"hover" \| "click"`          | `"hover"`   | no       | Interaction mode: hover or click to trigger                                |
| `width`                    | `string \| undefined`         | `undefined` | no       | Fixed width for dropdown (converted to pixels if numeric)                  |
| `height`                   | `string \| undefined`         | `undefined` | no       | Fixed height for dropdown (converted to pixels if numeric)                 |
| `preventCloseOnInnerClick` | `boolean`                     | `false`     | no       | Prevents dropdown from closing when clicking inside dropdown content       |
| `suppressOpenSelectors`    | `string[] \| undefined`       | `undefined` | no       | CSS selectors that prevent dropdown opening when matched (click mode only) |

### Internal Properties

| Name                | Type                       | Description                                             |
| ------------------- | -------------------------- | ------------------------------------------------------- |
| `dropdownContainer` | `DropdowContainer \| null` | Reference to the floating dropdown container element    |
| `openTimestamp`     | `number`                   | Timestamp when dropdown was opened (for click debounce) |

### Behavior Notes

-   The dropdown container is created dynamically and appended to `document.body`
-   Position is automatically calculated and updated on scroll/resize
-   Click behavior includes a 100ms debounce to prevent immediate close on trigger click
-   When `preventScroll` is true, the dropdown locks scroll position during display
-   When `preventCloseOnInnerClick` is true, clicking inside the dropdown content will not close the dropdown
-   `suppressOpenSelectors` array allows preventing dropdown opening when click events originate from matching elements (only applies to `behaviour="click"`)
-   Theme inheritance: dropdown inherits theme from closest `<mjo-theme>` ancestor

## New Properties Examples

### Prevent Close on Inner Click Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-prevent-close")
export class ExampleDropdownPreventClose extends LitElement {
    @state() private formData = { name: "", email: "" };

    private handleInputChange(field: string, value: string) {
        this.formData = { ...this.formData, [field]: value };
    }

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
                                <label style="display: block; margin-bottom: 0.5rem;">Name:</label>
                                <input
                                    type="text"
                                    .value=${this.formData.name}
                                    @input=${(e: Event) => this.handleInputChange("name", (e.target as HTMLInputElement).value)}
                                    style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
                                />
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem;">Email:</label>
                                <input
                                    type="email"
                                    .value=${this.formData.email}
                                    @input=${(e: Event) => this.handleInputChange("email", (e.target as HTMLInputElement).value)}
                                    style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px;"
                                />
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button type="submit" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px;">
                                    Save
                                </button>
                                <button type="button" style="padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 4px;">
                                    Cancel
                                </button>
                            </div>
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

### Suppress Open Selectors Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-dropdown";

@customElement("example-dropdown-suppress-open")
export class ExampleDropdownSuppressOpen extends LitElement {
    @state() private items = [
        { id: 1, name: "Item 1", deletable: true },
        { id: 2, name: "Item 2", deletable: true },
        { id: 3, name: "Item 3", deletable: false },
    ];

    private deleteItem(id: number, event: Event) {
        event.stopPropagation(); // Additional safety
        this.items = this.items.filter((item) => item.id !== id);
        console.log(`Deleted item ${id}`);
    }

    private selectItem(id: number) {
        console.log(`Selected item ${id}`);
    }

    render() {
        return html`
            <mjo-dropdown
                behaviour="click"
                .suppressOpenSelectors=${[".delete-button", ".no-open-zone"]}
                .html=${html`
                    <div style="padding: 0.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 6px; min-width: 250px;">
                        <h4 style="margin: 0 0 0.5rem 0; padding: 0.5rem;">Action Menu</h4>
                        <div style="border-top: 1px solid #e5e7eb; padding-top: 0.5rem;">
                            <div style="padding: 0.5rem; cursor: pointer;" @click=${() => console.log("Edit clicked")}>✏️ Edit Item</div>
                            <div style="padding: 0.5rem; cursor: pointer;" @click=${() => console.log("Share clicked")}>🔗 Share Item</div>
                            <div style="padding: 0.5rem; cursor: pointer; color: #ef4444;" @click=${() => console.log("Delete all clicked")}>🗑️ Delete All</div>
                        </div>
                    </div>
                `}
            >
                <div style="border: 1px solid #d1d5db; border-radius: 8px; padding: 1rem; background: white;">
                    <h3>Items List</h3>
                    <p class="no-open-zone" style="color: #6b7280; font-size: 0.875rem;">Click delete buttons won't open the dropdown menu</p>
                    ${this.items.map(
                        (item) => html`
                            <div
                                style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6;"
                            >
                                <span @click=${() => this.selectItem(item.id)} style="cursor: pointer;"> ${item.name} </span>
                                <button
                                    class="delete-button"
                                    ?disabled=${!item.deletable}
                                    @click=${(e: Event) => this.deleteItem(item.id, e)}
                                    style="background: #ef4444; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;"
                                >
                                    Delete
                                </button>
                            </div>
                        `,
                    )}
                    <div style="margin-top: 1rem; text-align: center; color: #6b7280; font-size: 0.875rem;">Click anywhere else to open actions menu</div>
                </div>
            </mjo-dropdown>
        `;
    }
}
```

## Slots

| Slot      | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| (default) | Trigger element that activates the dropdown (button, input, etc.) |

## Events

| Event   | Detail | Emitted When    | Notes                               |
| ------- | ------ | --------------- | ----------------------------------- |
| `open`  | none   | Dropdown opens  | Fired when dropdown becomes visible |
| `close` | none   | Dropdown closes | Fired when dropdown becomes hidden  |

## Public Methods

| Method             | Parameters    | Returns       | Description                                    |
| ------------------ | ------------- | ------------- | ---------------------------------------------- |
| `open()`           | none          | `void`        | Programmatically opens the dropdown            |
| `close()`          | `ev?: Event`  | `void`        | Programmatically closes the dropdown           |
| `updatePosition()` | none          | `void`        | Recalculates and updates dropdown position     |
| `scrollToTop()`    | `top: number` | `void`        | Scrolls dropdown content to specified position |
| `getScroll()`      | none          | `{top, left}` | Gets current scroll position of dropdown       |
| `getHeigth()`      | none          | `number`      | Gets dropdown container height                 |

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

Position is calculated dynamically by the `DropdowContainer` using utilities that consider:

-   Available space in each direction
-   Dropdown content dimensions
-   Viewport boundaries
-   Scroll position

## Accessibility Notes

-   The dropdown container is appended to `document.body` but maintains association with its trigger
-   Ensure trigger elements are keyboard accessible (native buttons, focusable elements)
-   Consider adding `aria-haspopup="true"` and `aria-expanded` to trigger elements for screen readers
-   When using click behavior, clicking outside the dropdown will close it
-   Content inside dropdown should follow standard accessibility practices

## Performance Considerations

-   Dropdown container is created once on `connectedCallback` and reused
-   Position calculations are throttled to prevent excessive updates during scroll/resize
-   Event listeners are properly cleaned up on `disconnectedCallback`
-   Consider using `preventScroll` sparingly as it can impact user experience

## Common Patterns

### Tooltip-style Dropdown

```ts
<mjo-dropdown
    behaviour="hover"
    .html=${html`<div style="padding: 0.5rem; font-size: 0.875rem;">Helpful tooltip text</div>`}
>
    <button>?</button>
</mjo-dropdown>
```

### Context Menu

```ts
<mjo-dropdown
    behaviour="click"
    .html=${html`
        <div style="padding: 0.5rem 0;">
            <div style="padding: 0.5rem 1rem; cursor: pointer;">Cut</div>
            <div style="padding: 0.5rem 1rem; cursor: pointer;">Copy</div>
            <div style="padding: 0.5rem 1rem; cursor: pointer;">Paste</div>
        </div>
    `}
>
    <div>Right-click area</div>
</mjo-dropdown>
```

### Select-style Dropdown

```ts
<mjo-dropdown
    behaviour="click"
    fullwidth
    preventScroll
    .html=${html`<!-- options list -->`}
>
    <input readonly placeholder="Select option..." />
</mjo-dropdown>
```

## Summary

`<mjo-dropdown>` provides a flexible foundation for creating floating content relative to trigger elements. It handles complex positioning calculations automatically, supports both hover and click interactions, and integrates seamlessly with the mjo-litui theming system. Use global theming for consistency and component-level theming for specific customizations.
