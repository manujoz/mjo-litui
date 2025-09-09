# mjo-badge

A positioned notification badge component that displays informational content over other elements with comprehensive accessibility support.

## Basic Usage

```html
<mjo-badge label="5" show>
    <button>Messages</button>
</mjo-badge>
```

## Usage with Lit

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-badge";

@customElement("example-badge-basic")
export class ExampleBadgeBasic extends LitElement {
    render() {
        return html`
            <mjo-badge label="99+" color="error" show>
                <mjo-icon name="notifications"></mjo-icon>
            </mjo-badge>
        `;
    }
}
```

## Properties

| Name              | Type                | Default       | Description                              |
| ----------------- | ------------------- | ------------- | ---------------------------------------- |
| `color`           | `MjoBadgeColors`    | `"primary"`   | Color theme of the badge                 |
| `size`            | `MjoBadgeSizes`     | `"medium"`    | Size of the badge                        |
| `variant`         | `MjoBadgeVariants`  | `"solid"`     | Visual variant style                     |
| `position`        | `MjoBadgePositions` | `"top-right"` | Position relative to the slotted element |
| `label`           | `string`            | `""`          | The content to display in the badge      |
| `value`           | `string`            | `undefined`   | Optional value associated with the badge |
| `offsetx`         | `number`            | `0`           | Horizontal offset in pixels              |
| `offsety`         | `number`            | `0`           | Vertical offset in pixels                |
| `show`            | `boolean`           | `false`       | Whether the badge is visible             |
| `disabled`        | `boolean`           | `false`       | Whether the badge is disabled            |
| `clickable`       | `boolean`           | `false`       | Whether the badge can be clicked         |
| `hideOutline`     | `boolean`           | `false`       | Whether to hide the border outline       |
| `ariaDescribedBy` | `string`            | `undefined`   | Reference to describing elements         |

## Methods

| Name            | Parameters | Returns | Description              |
| --------------- | ---------- | ------- | ------------------------ |
| `showBadge()`   | -          | `void`  | Shows the badge          |
| `hideBadge()`   | -          | `void`  | Hides the badge          |
| `toggleBadge()` | -          | `void`  | Toggles badge visibility |

## Events

| Name              | Detail                                                                                  | Description                           |
| ----------------- | --------------------------------------------------------------------------------------- | ------------------------------------- |
| `mjo-badge:click` | `{ value?: string, label: string, position: MjoBadgePositions, color: MjoBadgeColors }` | Fired when clickable badge is clicked |

## CSS Parts

| Part        | Description                                  |
| ----------- | -------------------------------------------- |
| `container` | The main badge container element             |
| `icon`      | The icon element (from mjo-icon)             |
| `label`     | The typography element (from mjo-typography) |

## CSS Custom Properties

| Property                           | Default | Description                             |
| ---------------------------------- | ------- | --------------------------------------- |
| `--mjo-badge-border-width`         | `2px`   | Border width of the badge               |
| `--mjo-badge-animation-duration`   | `0.2s`  | Animation duration for scaling          |
| `--mjo-badge-focus-outline-width`  | `2px`   | Width of focus outline                  |
| `--mjo-badge-focus-outline-offset` | `1px`   | Offset of focus outline                 |
| `--mjo-badge-background-color`     | Dynamic | Background color (varies by color prop) |
| `--mjo-badge-color`                | Dynamic | Text color (varies by color prop)       |

> **Note:** Additional theme-level variables are available via the global theming system and color tokens.

## Examples

### Different Colors

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-badge";

@customElement("example-badge-colors")
export class ExampleBadgeColors extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 2rem;">
                <mjo-badge label="3" color="primary" show>
                    <button>Primary</button>
                </mjo-badge>
                <mjo-badge label="7" color="success" show>
                    <button>Success</button>
                </mjo-badge>
                <mjo-badge label="!" color="error" show>
                    <button>Error</button>
                </mjo-badge>
            </div>
        `;
    }
}
```

### Variants and Positions

```ts
@customElement("example-badge-variants")
export class ExampleBadgeVariants extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                <mjo-badge label="5" variant="solid" position="top-right" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
                <mjo-badge label="2" variant="flat" position="top-left" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
                <mjo-badge label="8" variant="ghost" position="bottom-right" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
                <mjo-badge label="!" variant="brilliant" position="bottom-left" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
            </div>
        `;
    }
}
```

### Clickable Badge

```ts
@customElement("example-badge-clickable")
export class ExampleBadgeClickable extends LitElement {
    private handleBadgeClick(event: CustomEvent) {
        const { value, label, color } = event.detail;
        console.log("Badge clicked:", { value, label, color });
    }

    render() {
        return html`
            <mjo-badge
                label="5"
                value="notifications"
                color="error"
                clickable
                show
                aria-label="5 new notifications, click to view"
                @mjo-badge:click=${this.handleBadgeClick}
            >
                <button>Notifications</button>
            </mjo-badge>
        `;
    }
}
```

### Theme Customization

```ts
import "mjo-litui/mjo-theme";

@customElement("example-badge-theme")
export class ExampleBadgeTheme extends LitElement {
    render() {
        return html`
            <mjo-theme
                .theme=${{
                    components: {
                        mjoBadge: {
                            borderWidth: "3px",
                            animationDuration: "0.3s",
                            focusOutlineWidth: "3px",
                        },
                    },
                }}
            >
                <mjo-badge label="Custom" show>
                    <button>Themed Badge</button>
                </mjo-badge>
            </mjo-theme>
        `;
    }
}
```

## Accessibility

The badge component includes comprehensive accessibility features:

-   **ARIA Support**: Proper role attribution and live region announcements
-   **Keyboard Navigation**: Full keyboard support for clickable badges
-   **Screen Reader Support**: Announces badge changes and provides descriptive labels
-   **Focus Management**: Visible focus indicators with customizable styling

### Accessibility Best Practices

-   Use `aria-label` for badges containing important information
-   Set appropriate `badgeRole` based on content type
-   For decorative badges, consider using `aria-hidden="true"`
-   Ensure sufficient color contrast for badge content
-   Test with screen readers to verify announcements

## Type Definitions

```ts
type MjoBadgeColors = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default";
type MjoBadgeSizes = "small" | "medium" | "large";
type MjoBadgeVariants = "solid" | "flat" | "ghost" | "brilliant";
type MjoBadgePositions = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type MjoBadgeRoles = "status" | "img" | "generic" | "none";
```
