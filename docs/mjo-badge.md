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

| Name              | Type                               | Default       | Description                              |
| ----------------- | ---------------------------------- | ------------- | ---------------------------------------- |
| `label`           | `string`                           | `""`          | The content to display in the badge      |
| `value`           | `string \| undefined`              | `undefined`   | Optional value associated with the badge |
| `color`           | `MjoBadgeColors`                   | `"primary"`   | Color theme of the badge                 |
| `size`            | `MjoBadgeSizes`                    | `"medium"`    | Size of the badge                        |
| `variant`         | `MjoBadgeVariants`                 | `"solid"`     | Visual variant style                     |
| `position`        | `MjoBadgePositions`                | `"top-right"` | Position relative to the slotted element |
| `offsetx`         | `number`                           | `0`           | Horizontal offset in pixels              |
| `offsety`         | `number`                           | `0`           | Vertical offset in pixels                |
| `show`            | `boolean`                          | `false`       | Whether the badge is visible             |
| `disabled`        | `boolean`                          | `false`       | Whether the badge is disabled            |
| `clickable`       | `boolean`                          | `false`       | Whether the badge can be clicked         |
| `hideOutline`     | `boolean`                          | `false`       | Whether to hide the border outline       |
| `role`            | `MjoBadgeRoles`                    | `"status"`    | ARIA role for the badge                  |
| `ariaLabel`       | `string `                          | `undefined`   | Accessible label for the badge           |
| `ariaLive`        | `"polite" \| "assertive" \| "off"` | `"polite"`    | How screen readers announce changes      |
| `ariaHidden`      | `string`                           | `undefined`   | Whether to hide from screen readers      |
| `ariaDescribedBy` | `string `                          | `undefined`   | Reference to describing elements         |
| `ariaAtomic`      | `string`                           | `"true"`      | Whether to read entire region on changes |

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

## CSS Custom Properties

| Property                           | Default                             | Description                             |
| ---------------------------------- | ----------------------------------- | --------------------------------------- |
| `--mjo-badge-border-width`         | `2px`                               | Border width of the badge               |
| `--mjo-badge-font-size-small`      | `12px`                              | Font size for small badges              |
| `--mjo-badge-font-size-medium`     | `14px`                              | Font size for medium badges             |
| `--mjo-badge-font-size-large`      | `18px`                              | Font size for large badges              |
| `--mjo-badge-focus-outline-width`  | `2px`                               | Width of focus outline                  |
| `--mjo-badge-focus-outline-offset` | `2px`                               | Offset of focus outline                 |
| `--mjo-badge-background-color`     | `var(--mjo-primary-color, #4e9be4)` | Background color (varies by color prop) |
| `--mjo-badge-color`                | `currentColor`                      | Text color                              |

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

### Variants

```ts
@customElement("example-badge-variants")
export class ExampleBadgeVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 2rem;">
                <mjo-badge label="5" variant="solid" show>
                    <button>Solid</button>
                </mjo-badge>
                <mjo-badge label="5" variant="flat" show>
                    <button>Flat</button>
                </mjo-badge>
                <mjo-badge label="5" variant="ghost" show>
                    <button>Ghost</button>
                </mjo-badge>
                <mjo-badge label="5" variant="brilliant" show>
                    <button>Brilliant</button>
                </mjo-badge>
            </div>
        `;
    }
}
```

### Positions

```ts
@customElement("example-badge-positions")
export class ExampleBadgePositions extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                <mjo-badge label="1" position="top-right" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
                <mjo-badge label="2" position="top-left" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
                <mjo-badge label="3" position="bottom-right" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
                <mjo-badge label="4" position="bottom-left" show>
                    <div style="width: 60px; height: 60px; background: #f0f0f0;"></div>
                </mjo-badge>
            </div>
        `;
    }
}
```

### Animations

```ts
@customElement("example-badge-animations")
export class ExampleBadgeAnimations extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 2rem;">
                <mjo-badge label="1" animation="pulse" pulse show>
                    <button>Pulse</button>
                </mjo-badge>
                <mjo-badge label="2" animation="bounce" show>
                    <button>Bounce</button>
                </mjo-badge>
                <mjo-badge label="3" animation="scale" show>
                    <button>Scale</button>
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

> **Note:** Clickable badges automatically show a subtle press animation when clicked or activated with Enter/Space keys.

### Max Count Limit

```ts
@customElement("example-badge-max-count")
export class ExampleBadgeMaxCount extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 2rem;">
                <mjo-badge label="150" maxCount="99" show>
                    <button>Default (99+)</button>
                </mjo-badge>
                <mjo-badge label="1500" maxCount="999" maxCountSuffix="+" show>
                    <button>Custom (999+)</button>
                </mjo-badge>
            </div>
        `;
    }
}
```

### Accessibility Features

```ts
@customElement("example-badge-accessibility")
export class ExampleBadgeAccessibility extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 2rem;">
                <!-- Status badge for screen readers -->
                <mjo-badge label="3" aria-label="3 unread messages" aria-live="polite" show>
                    <button>Messages</button>
                </mjo-badge>

                <!-- Decorative badge hidden from screen readers -->
                <mjo-badge label="NEW" aria-hidden="true" color="success" show>
                    <button>Feature</button>
                </mjo-badge>

                <!-- Icon badge with appropriate role -->
                <mjo-badge label="<svg>...</svg>" badgeRole="img" aria-label="Important notification" show>
                    <button>Alerts</button>
                </mjo-badge>
            </div>
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
                            fontSizeSmall: "10px",
                            fontSizeMedium: "12px",
                            fontSizeLarge: "16px",
                            animationDuration: "0.3s",
                            pulseAnimationDuration: "1.5s",
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

## Accessibility Considerations

-   Use appropriate `aria-label` for badges containing important information
-   Set `aria-live="polite"` for badges that update dynamically
-   Use `aria-hidden="true"` for purely decorative badges
-   Provide keyboard navigation support for clickable badges
-   Ensure sufficient color contrast for the badge content
-   Use semantic roles like `status` for informational badges

## Best Practices

-   Keep badge labels concise (ideally 1-3 characters)
-   Use the max count feature for large numbers (99+ instead of 150)
-   Choose appropriate colors that convey the right urgency level
-   Position badges consistently across your application
-   Test with screen readers to ensure accessibility
-   Use animations sparingly to avoid distraction
