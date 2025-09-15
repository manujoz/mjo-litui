# mjo-chip

Flexible, theme-aware chip component for displaying compact information with multiple variants, colors, sizes, and interactive capabilities including clickable and closable functionality with full accessibility support.

## HTML Usage

```html
<mjo-chip label="Default Chip"></mjo-chip>
<mjo-chip label="Primary" color="primary"></mjo-chip>
<mjo-chip label="Closable Tag" color="secondary" closable></mjo-chip>
<mjo-chip label="Clickable Filter" color="info" clickable></mjo-chip>
<mjo-chip label="Interactive" clickable closable color="primary"></mjo-chip>
<mjo-chip label="With Icon" startIcon="star" variant="flat"></mjo-chip>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-icon";

@customElement("example-chip-basic")
export class ExampleChipBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <mjo-chip label="Default"></mjo-chip>
                <mjo-chip label="Primary" color="primary"></mjo-chip>
                <mjo-chip label="Secondary" color="secondary"></mjo-chip>
                <mjo-chip label="Success" color="success"></mjo-chip>
                <mjo-chip label="Warning" color="warning"></mjo-chip>
                <mjo-chip label="Info" color="info"></mjo-chip>
                <mjo-chip label="Error" color="error"></mjo-chip>
            </div>
        `;
    }
}
```

## Interactive Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";

@customElement("example-chip-interactive")
export class ExampleChipInteractive extends LitElement {
    @state() private lastAction = "";

    private handleChipClick(event: CustomEvent) {
        this.lastAction = `Clicked: ${event.detail.value}`;
    }

    private handleChipClose(event: CustomEvent) {
        this.lastAction = `Closed: ${event.detail.value}`;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 0.5rem;">
                    <mjo-chip label="Click Me" color="primary" clickable @mjo-chip:click=${this.handleChipClick}></mjo-chip>
                    <mjo-chip label="Remove Me" color="error" closable @mjo-chip:close=${this.handleChipClose}></mjo-chip>
                    <mjo-chip
                        label="Interactive"
                        color="info"
                        clickable
                        closable
                        @mjo-chip:click=${this.handleChipClick}
                        @mjo-chip:close=${this.handleChipClose}
                    ></mjo-chip>
                </div>
                ${this.lastAction ? html`<p><strong>Last action:</strong> ${this.lastAction}</p>` : ""}
            </div>
        `;
    }
}
```

## Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";

@customElement("example-chip-variants")
export class ExampleChipVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${["solid", "bordered", "flat", "shadow", "dot"].map(
                    (variant) => html`
                        <div>
                            <h4>${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant</h4>
                            <div style="display: flex; gap: 0.5rem;">
                                <mjo-chip label="Primary" color="primary" variant=${variant as any}></mjo-chip>
                                <mjo-chip label="Success" color="success" variant=${variant as any}></mjo-chip>
                                <mjo-chip label="Warning" color="warning" variant=${variant as any}></mjo-chip>
                                <mjo-chip label="Error" color="error" variant=${variant as any}></mjo-chip>
                            </div>
                        </div>
                    `,
                )}
            </div>
        `;
    }
}
```

## Sizes and Radius Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";

@customElement("example-chip-sizes")
export class ExampleChipSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div>
                    <h4>Sizes</h4>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <mjo-chip label="Small" color="primary" size="small"></mjo-chip>
                        <mjo-chip label="Medium" color="primary" size="medium"></mjo-chip>
                        <mjo-chip label="Large" color="primary" size="large"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Border Radius</h4>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <mjo-chip label="None" color="secondary" radius="none"></mjo-chip>
                        <mjo-chip label="Small" color="secondary" radius="small"></mjo-chip>
                        <mjo-chip label="Medium" color="secondary" radius="medium"></mjo-chip>
                        <mjo-chip label="Large" color="secondary" radius="large"></mjo-chip>
                        <mjo-chip label="Full" color="secondary" radius="full"></mjo-chip>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Icons Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-chip";

@customElement("example-chip-icons")
export class ExampleChipIcons extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div>
                    <h4>With Icons</h4>
                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-chip label="Star" startIcon="star" color="primary"></mjo-chip>
                        <mjo-chip label="Heart" startIcon="heart" color="error"></mjo-chip>
                        <mjo-chip label="Download" endIcon="download" color="secondary"></mjo-chip>
                        <mjo-chip label="Complete" startIcon="check" endIcon="arrow-right" color="success"></mjo-chip>
                    </div>
                </div>

                <div>
                    <h4>Closable with Icons</h4>
                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-chip label="JavaScript" color="primary" startIcon="code" closable></mjo-chip>
                        <mjo-chip label="TypeScript" color="info" startIcon="file-text" closable></mjo-chip>
                        <mjo-chip label="CSS" color="warning" startIcon="palette" closable></mjo-chip>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Dynamic Chip Management Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("example-chip-dynamic")
export class ExampleChipDynamic extends LitElement {
    @state() private tags: Array<{ id: string; label: string }> = [
        { id: "1", label: "React" },
        { id: "2", label: "Vue" },
        { id: "3", label: "Angular" },
    ];
    @state() private newTagValue = "";

    private addTag() {
        if (this.newTagValue.trim()) {
            this.tags = [...this.tags, { id: Date.now().toString(), label: this.newTagValue.trim() }];
            this.newTagValue = "";
        }
    }

    private removeTag(event: CustomEvent) {
        const tagId = event.detail.value;
        this.tags = this.tags.filter((tag) => tag.id !== tagId);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 0.5rem;">
                    <mjo-textfield
                        placeholder="Enter tag name"
                        .value=${this.newTagValue}
                        @input=${(e: InputEvent) => (this.newTagValue = (e.target as HTMLInputElement).value)}
                        @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this.addTag()}
                    ></mjo-textfield>
                    <mjo-button @click=${this.addTag} ?disabled=${!this.newTagValue.trim()}>Add</mjo-button>
                </div>

                <div style="min-height: 60px; padding: 1rem; border: 2px dashed #e5e7eb; border-radius: 8px;">
                    ${this.tags.length > 0
                        ? html`
                              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                  ${this.tags.map(
                                      (tag) => html`
                                          <mjo-chip label=${tag.label} color="primary" closable value=${tag.id} @mjo-chip:close=${this.removeTag}></mjo-chip>
                                      `,
                                  )}
                              </div>
                          `
                        : html`<div style="text-align: center; color: #6b7280;">No tags yet. Add some above!</div>`}
                </div>
            </div>
        `;
    }
}
```

## ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoChipTheme } from "mjo-litui/types";
import "mjo-litui/mjo-chip";

@customElement("example-chip-themed")
export class ExampleChipThemed extends LitElement {
    private compactTheme: MjoChipTheme = {
        fontSizeMediumSize: "0.8rem",
        padding: "0 0.5rem",
        gap: "0.3rem",
    };

    private spaciousTheme: MjoChipTheme = {
        fontSizeMediumSize: "1.1rem",
        padding: "0 1.2rem",
        gap: "0.6rem",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <h4>Default</h4>
                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-chip label="Standard" color="primary"></mjo-chip>
                        <mjo-chip label="With Icon" startIcon="star" color="success"></mjo-chip>
                    </div>
                </div>
                <div>
                    <h4>Compact Theme</h4>
                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-chip label="Compact" color="primary" .theme=${this.compactTheme}></mjo-chip>
                        <mjo-chip label="Compact Icon" startIcon="star" color="success" .theme=${this.compactTheme}></mjo-chip>
                    </div>
                </div>
                <div>
                    <h4>Spacious Theme</h4>
                    <div style="display: flex; gap: 0.5rem;">
                        <mjo-chip label="Spacious" color="primary" .theme=${this.spaciousTheme}></mjo-chip>
                        <mjo-chip label="Spacious Icon" startIcon="star" color="success" .theme=${this.spaciousTheme}></mjo-chip>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name              | Type                                                                                   | Default     | Reflects | Description                                                           |
| ----------------- | -------------------------------------------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------- |
| `label`           | `string`                                                                               | `""`        | no       | Text content displayed in the chip                                    |
| `color`           | `"primary" \| "secondary" \| "default" \| "success" \| "warning" \| "info" \| "error"` | `"default"` | no       | Semantic color scheme applied to the chip                             |
| `variant`         | `"solid" \| "bordered" \| "light" \| "flat" \| "faded" \| "shadow" \| "dot"`           | `"solid"`   | no       | Visual styling variant that affects appearance and background         |
| `size`            | `"small" \| "medium" \| "large"`                                                       | `"medium"`  | no       | Controls the overall size including font size and padding             |
| `radius`          | `"small" \| "medium" \| "large" \| "full" \| "none"`                                   | `"full"`    | no       | Border radius applied to the chip (full creates pill shape)           |
| `startIcon`       | `string \| undefined`                                                                  | `undefined` | no       | Icon displayed at the beginning of the chip content                   |
| `endIcon`         | `string \| undefined`                                                                  | `undefined` | no       | Icon displayed at the end of the chip content                         |
| `clickable`       | `boolean`                                                                              | `false`     | no       | Makes the chip clickable and dispatches `mjo-chip:click` events       |
| `closable`        | `boolean`                                                                              | `false`     | no       | Adds a close button that emits `mjo-chip:close` event when clicked    |
| `disabled`        | `boolean`                                                                              | `false`     | no       | Disables interaction and applies disabled styling                     |
| `value`           | `string \| undefined`                                                                  | `undefined` | no       | Optional value passed in event details (falls back to label)          |
| `ariaDescribedby` | `string \| undefined`                                                                  | `undefined` | no       | References additional descriptive content for screen readers          |
| `ariaLabel`       | `string \| null`                                                                       | `null`      | yes      | Custom accessible label for screen readers (overrides computed label) |

### Accessibility Properties (Native Lit Support)

The component supports standard HTML accessibility attributes through Lit's native property binding:

| Attribute       | Usage                                     | Description                                           |
| --------------- | ----------------------------------------- | ----------------------------------------------------- |
| `aria-label`    | `aria-label="Custom chip description"`    | Provides accessible label for screen readers          |
| `tabindex`      | `tabindex="0"` or `tabindex="-1"`         | Controls keyboard navigation (automatically managed)  |
| `role`          | Automatically set based on context        | Dynamic: `"button"` when interactive, none otherwise  |
| `aria-disabled` | Automatically set when `disabled` is true | Communicates disabled state to assistive technologies |

### Behavior Notes

-   The `dot` variant adds a colored dot indicator at the beginning of the chip
-   Closable chips automatically remove themselves from DOM when close button is clicked
-   Clickable chips provide visual feedback animation when activated
-   Icons scale with the chip size automatically
-   The `value` property is useful for identifying chips in event handlers
-   Color variants affect both background and text colors based on the selected variant
-   When both `clickable` and `closable` are true, the chip main area triggers click events, close button triggers close events
-   Keyboard navigation: Tab to focus, Enter/Space to activate, Escape to close (if closable)

## Slots

| Slot      | Description                                                             |
| --------- | ----------------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via the `label` property |

## Events

| Event            | Detail              | Emitted When                                  | Notes                                                                   |
| ---------------- | ------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `mjo-chip:click` | `{ value: string }` | Chip main area is clicked (when `clickable`)  | Contains `value` prop or `label` prop as fallback; bubbles and composed |
| `mjo-chip:close` | `{ value: string }` | Close button is clicked (closable chips only) | Contains `value` prop or `label` prop as fallback; chip removes itself  |

**Note**: When both `clickable` and `closable` are true, clicking the main chip area triggers `mjo-chip:click`, while clicking the close button triggers `mjo-chip:close`. The close button click event stops propagation to prevent triggering the main click event.

## Methods

The component doesn't expose public methods. Interaction is handled through properties and events.

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Typography and Sizing

| Variable                             | Fallback | Used For                        |
| ------------------------------------ | -------- | ------------------------------- |
| `--mjo-chip-font-size-small-size`    | `0.75em` | Small chip font size            |
| `--mjo-chip-font-size-medium-size`   | `0.9em`  | Medium chip font size (default) |
| `--mjo-chip-font-size-large-size`    | `1.1em`  | Large chip font size            |
| `--mjo-chip-line-height-small-size`  | `0.75em` | Small chip line height          |
| `--mjo-chip-line-height-medium-size` | `1em`    | Medium chip line height         |
| `--mjo-chip-line-height-large-size`  | `1.2em`  | Large chip line height          |

### Structure and Spacing

| Variable             | Fallback   | Used For                  |
| -------------------- | ---------- | ------------------------- |
| `--mjo-chip-padding` | `0 0.75em` | Internal padding          |
| `--mjo-chip-gap`     | `0.4em`    | Gap between chip elements |

### Border Widths

| Variable                              | Fallback | Used For                 |
| ------------------------------------- | -------- | ------------------------ |
| `--mjo-chip-border-width-size-small`  | `1px`    | Small chip border width  |
| `--mjo-chip-border-width-size-medium` | `2px`    | Medium chip border width |
| `--mjo-chip-border-width-size-large`  | `3px`    | Large chip border width  |

### Semantic Colors

The component uses the global semantic color system:

#### Primary Colors

-   `--mjo-primary-color` / `--mjo-primary-foreground-color`
-   `--mjo-primary-color-alpha2` (flat variant)
-   `--mjo-primary-color-alpha5` (shadow variant)

#### Secondary Colors

-   `--mjo-secondary-color` / `--mjo-secondary-foreground-color`
-   `--mjo-secondary-color-alpha2` (flat variant)
-   `--mjo-secondary-color-alpha5` (shadow variant)

#### Status Colors

-   `--mjo-color-success` / `--mjo-color-info` / `--mjo-color-warning` / `--mjo-color-error`
-   Corresponding alpha variants for flat and shadow styles

#### Gray Scale

-   `--mjo-color-gray-400` (default background)
-   `--mjo-color-gray-600` (faded variant)
-   `--mjo-color-gray-200` (borders)
-   `--mjo-color-white` / `--mjo-color-black` (text)

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-chip-{property-name}`.

### MjoChipTheme Interface

```ts
interface MjoChipTheme {
    borderWidthSizeSmall?: string;
    borderWidthSizeMedium?: string;
    borderWidthSizeLarge?: string;
    fontSizeSmallSize?: string;
    fontSizeMediumSize?: string;
    fontSizeLargeSize?: string;
    gap?: string;
    lineHeightSmallSize?: string;
    lineHeightMediumSize?: string;
    lineHeightLargeSize?: string;
    padding?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoChipTheme } from "mjo-litui/types";
import "mjo-litui/mjo-chip";

@customElement("example-chip-themed")
export class ExampleChipThemed extends LitElement {
    private customTheme: MjoChipTheme = {
        fontSizeMediumSize: "1rem",
        lineHeightMediumSize: "1.2rem",
        padding: "0.25rem 1rem",
        gap: "0.5rem",
        borderWidthSizeMedium: "2px",
    };

    render() {
        return html`
            <div style="display: flex; gap: 0.5rem;">
                <mjo-chip label="Custom Theme" color="primary" startIcon="star" .theme=${this.customTheme}></mjo-chip>
                <mjo-chip label="Themed Bordered" color="success" variant="bordered" .theme=${this.customTheme}></mjo-chip>
            </div>
        `;
    }
}
```

## Accessibility Features

The `mjo-chip` component includes comprehensive accessibility support following WCAG 2.1 guidelines:

### Automatic Accessibility Features

-   **Dynamic Roles**: Automatically sets appropriate `role` attributes:
    -   `role="button"` for interactive chips (clickable or closable)
    -   No role for purely decorative chips
-   **ARIA Labels**: Intelligent `aria-label` generation:
    -   Generic: "Chip: {label}" for display-only chips
    -   Interactive: "{label}. Click to interact" for clickable chips
    -   Closable: "{label}. Press to close" for closable chips
    -   Combined: "{label}. Clickable chip with close button" for both
-   **Keyboard Navigation**: Full keyboard support:
    -   **Tab**: Navigate between focusable chips
    -   **Enter/Space**: Activate clickable chips or close closable chips
    -   **Escape**: Close closable chips (additional shortcut)
    -   Visual focus indicators with `:focus-visible`
-   **State Communication**:
    -   `aria-disabled="true"` when chip is disabled
    -   `tabindex` automatically managed based on interaction state
    -   Proper state changes communicated to screen readers

### Close Button Accessibility

-   Dedicated `aria-label` for close buttons: "Close {label}"
-   Independent keyboard navigation and activation
-   Visual focus indicators separate from main chip focus
-   Event propagation properly managed to prevent conflicts

### Accessibility Best Practices

```html
<!-- Basic accessible chip -->
<mjo-chip label="JavaScript Tag"></mjo-chip>

<!-- Enhanced accessibility for interactive chips -->
<mjo-chip
    label="Active Filter"
    clickable
    color="primary"
    aria-label="JavaScript filter, click to toggle"
    aria-describedby="filter-help"
    @mjo-chip:click="${this.handleFilterToggle}"
></mjo-chip>

<!-- Closable chip with context -->
<mjo-chip label="Project Alpha" closable value="project-alpha" aria-describedby="project-description" @mjo-chip:close="${this.handleProjectRemove}"></mjo-chip>

<!-- Both interactive with custom labels -->
<mjo-chip
    label="React"
    clickable
    closable
    value="react-tag"
    aria-label="React technology tag, click to view details or close to remove"
    @mjo-chip:click="${this.viewDetails}"
    @mjo-chip:close="${this.removeTag}"
></mjo-chip>
```

### Motion and Preference Support

-   **Reduced Motion**: Respects `prefers-reduced-motion` user setting
-   **Visual Feedback**: Subtle scale animations for clickable chips
-   **Focus Management**: Clear visual focus indicators for keyboard users
-   **Color Contrast**: All color variants maintain sufficient contrast ratios

### Screen Reader Support

-   Interactive state changes are announced appropriately
-   Close actions provide meaningful feedback through events
-   Complex chips with multiple actions have clear role separation
-   Loading and error states can be announced through custom event handling

## CSS Parts

| Part         | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `container`  | The main chip container element                               |
| `label`      | The text label element (via exportparts from mjo-typography)  |
| `start-icon` | The start icon element (via exportparts from mjo-icon)        |
| `end-icon`   | The end icon element (via exportparts from mjo-icon)          |
| `close-icon` | The close button icon element (via exportparts from mjo-icon) |

## Performance Considerations

-   Large numbers of chips should be virtualized if performance becomes an issue
-   The component uses efficient CSS variables for theming without runtime style recalculation
-   Close functionality removes chips from DOM automatically
-   Icon rendering is optimized through the mjo-icon component

## Design Guidelines

-   **Consistency**: Use consistent color schemes for related chip groups
-   **Clarity**: Choose variants that provide appropriate visual hierarchy
-   **Spacing**: Allow adequate spacing between chips for touch targets
-   **Content**: Keep labels concise and descriptive
-   **Actions**: Use closable chips for removable items, regular chips for display-only content

## Best Practices

### Content Organization

-   Group related chips together logically
-   Use consistent sizing within groups
-   Implement clear visual hierarchy with colors and variants

### Interactive Design

-   Provide visual feedback for interactive chips
-   Use appropriate colors to indicate state (selected, active, etc.)
-   Consider loading states for dynamic chip updates

### Accessibility

-   Ensure sufficient color contrast
-   Provide keyboard navigation for interactive chips
-   Use descriptive labels and ARIA attributes where needed

## Summary

`<mjo-chip>` provides a versatile component for displaying compact, labeled information with extensive customization options and comprehensive accessibility support. The component supports multiple visual variants, semantic colors, interactive capabilities (clickable and closable), and comprehensive theming through ThemeMixin. Use chips for tags, filters, status indicators, user attributes, and other compact data display needs.

Key features include:

-   **Interactive Capabilities**: Full support for clickable and closable functionality with separate event handling
-   **Visual Variants**: Seven distinct styling variants (solid, bordered, light, flat, faded, shadow, dot)
-   **Semantic Colors**: Complete integration with the global design system
-   **Keyboard Navigation**: Full keyboard support with Tab, Enter, Space, and Escape key handling
-   **Extensive Customization**: ThemeMixin support for instance-specific styling
-   **Icon Support**: Start and end icon positioning with automatic scaling
-   **Animation Feedback**: Subtle visual feedback for interactive elements

### Accessibility Highlights

-   **WCAG 2.1 Compliant**: Meets accessibility standards with comprehensive keyboard and screen reader support
-   **Intelligent ARIA**: Dynamic role and label generation based on interaction state
-   **Focus Management**: Clear visual focus indicators with customizable colors
-   **Keyboard Navigation**: Complete keyboard support including Escape key for closing
-   **Screen Reader Support**: Proper state announcements and contextual labeling
-   **Motion Preferences**: Respects user's `prefers-reduced-motion` setting
-   **Event Separation**: Clean separation between click and close actions for complex interactions

The component's flexibility makes it suitable for both static display and dynamic, interactive use cases while maintaining consistent styling and full accessibility compliance. Perfect for building accessible filter systems, tag management interfaces, status indicators, and compact information displays.
