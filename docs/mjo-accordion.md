# mjo-accordion

Configurable, theme-aware accordion component for organizing content in expandable and collapsible sections with multiple visual variants and selection modes.

## HTML Usage

```html
<mjo-accordion variant="shadow" selectionMode="single">
    <mjo-accordion-item itemTitle="Section 1" itemSubtitle="Click to expand">
        <p>Content for section 1</p>
    </mjo-accordion-item>
    <mjo-accordion-item itemTitle="Section 2" expanded>
        <p>Content for section 2</p>
    </mjo-accordion-item>
</mjo-accordion>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-accordion";

@customElement("example-accordion-basic")
export class ExampleAccordionBasic extends LitElement {
    render() {
        return html`
            <mjo-accordion>
                <mjo-accordion-item itemTitle="Getting Started">
                    <p>Welcome to our accordion component. This is a basic example of how to use it.</p>
                </mjo-accordion-item>
                <mjo-accordion-item itemTitle="Configuration" itemSubtitle="Learn about options">
                    <p>You can customize the accordion with various properties and styling options.</p>
                </mjo-accordion-item>
                <mjo-accordion-item itemTitle="Advanced Usage">
                    <p>Explore advanced features like multiple selection modes and custom themes.</p>
                </mjo-accordion-item>
            </mjo-accordion>
        `;
    }
}
```

## Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-accordion";

@customElement("example-accordion-variants")
export class ExampleAccordionVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Light Variant (Default)</h4>
                    <mjo-accordion variant="light">
                        <mjo-accordion-item itemTitle="Light Section 1">
                            <p>Content in light variant</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Light Section 2">
                            <p>More content in light variant</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <div>
                    <h4>Shadow Variant</h4>
                    <mjo-accordion variant="shadow">
                        <mjo-accordion-item itemTitle="Shadow Section 1">
                            <p>Content in shadow variant with background</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Shadow Section 2">
                            <p>More content in shadow variant</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <div>
                    <h4>Bordered Variant</h4>
                    <mjo-accordion variant="bordered">
                        <mjo-accordion-item itemTitle="Bordered Section 1">
                            <p>Content in bordered variant</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Bordered Section 2">
                            <p>More content in bordered variant</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <div>
                    <h4>Splitted Variant</h4>
                    <mjo-accordion variant="splitted">
                        <mjo-accordion-item itemTitle="Splitted Section 1">
                            <p>Content in splitted variant with individual cards</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Splitted Section 2">
                            <p>More content in splitted variant</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>
            </div>
        `;
    }
}
```

## Selection Modes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-accordion";

@customElement("example-accordion-selection")
export class ExampleAccordionSelection extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Single Selection Mode (Default)</h4>
                    <mjo-accordion variant="shadow" selectionMode="single">
                        <mjo-accordion-item itemTitle="Only One Open" itemSubtitle="Opens and closes others">
                            <p>In single mode, only one section can be open at a time.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Second Section">
                            <p>Opening this will close the previous one.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Third Section">
                            <p>This follows the same behavior.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <div>
                    <h4>Multiple Selection Mode</h4>
                    <mjo-accordion variant="shadow" selectionMode="multiple">
                        <mjo-accordion-item itemTitle="Multiple Open" itemSubtitle="Independent sections">
                            <p>In multiple mode, several sections can be open simultaneously.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Another Section" expanded>
                            <p>This section starts expanded.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Third Section">
                            <p>You can open all sections at once if needed.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>
            </div>
        `;
    }
}
```

## Compact Mode Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-accordion";
import "mjo-litui/mjo-button";

@customElement("example-accordion-compact")
export class ExampleAccordionCompact extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Compact Mode</h4>
                    <mjo-accordion variant="bordered" compact>
                        <mjo-accordion-item itemTitle="Compact Section 1" itemSubtitle="Reduced padding">
                            <p>This accordion uses compact mode with reduced padding.</p>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Compact Section 2">
                            <p>All sections have smaller padding in compact mode.</p>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>

                <div>
                    <h4>Rich Content</h4>
                    <mjo-accordion variant="shadow">
                        <mjo-accordion-item itemTitle="Custom Content" itemSubtitle="With buttons and elements">
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                <p>You can include any content inside accordion sections:</p>
                                <div style="display: flex; gap: 0.5rem;">
                                    <mjo-button color="primary" size="small">Action 1</mjo-button>
                                    <mjo-button color="secondary" variant="ghost" size="small">Action 2</mjo-button>
                                </div>
                            </div>
                        </mjo-accordion-item>
                    </mjo-accordion>
                </div>
            </div>
        `;
    }
}
```

## Attributes / Properties

### mjo-accordion

| Name            | Type                                              | Default    | Reflects | Description                                                            |
| --------------- | ------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------- |
| `variant`       | `"light" \| "shadow" \| "bordered" \| "splitted"` | `"light"`  | no       | Visual styling variant for the accordion container                     |
| `selectionMode` | `"single" \| "multiple"`                          | `"single"` | no       | Controls whether only one or multiple sections can be expanded at once |
| `compact`       | `boolean`                                         | `false`    | no       | Reduces padding for a more compact appearance                          |

### mjo-accordion-item

| Name              | Type                       | Default          | Reflects | Description                                                  |
| ----------------- | -------------------------- | ---------------- | -------- | ------------------------------------------------------------ |
| `itemTitle`       | `string \| TemplateResult` | `""`             | no       | Title text or template for the accordion section header      |
| `itemSubtitle`    | `string`                   | `""`             | no       | Subtitle text displayed below the title                      |
| `expanded`        | `boolean`                  | `false`          | no       | Controls whether the section is expanded or collapsed        |
| `disabled`        | `boolean`                  | `false`          | no       | Disables interaction with the accordion section              |
| `compact`         | `boolean`                  | `false`          | no       | Internal property managed by parent accordion                |
| `icon`            | `string`                   | `AiOutlineRight` | no       | Icon used for the expand/collapse indicator                  |
| `ariaDescribedby` | `string \| undefined`      | `undefined`      | no       | References additional descriptive content for screen readers |

### Internal State

| Name    | Type                 | Description                                                    |
| ------- | -------------------- | -------------------------------------------------------------- |
| `items` | `MjoAccordionItem[]` | Array of child accordion items managed by the parent accordion |

### Behavior Notes

-   In `single` selection mode, expanding one section automatically collapses others
-   In `multiple` selection mode, sections operate independently
-   The `compact` property is propagated from parent to all child items
-   Smooth animations are applied during expand/collapse transitions
-   Icons rotate 90 degrees when sections are expanded
-   Full keyboard navigation support with ARIA attributes
-   Animations respect `prefers-reduced-motion` user preference

## Methods

### mjo-accordion

| Method                | Parameters                | Returns | Description                                       |
| --------------------- | ------------------------- | ------- | ------------------------------------------------- |
| `expandItem(index)`   | `index: number \| string` | `void`  | Expands a specific item by index or id            |
| `collapseItem(index)` | `index: number \| string` | `void`  | Collapses a specific item by index or id          |
| `expandAll()`         | -                         | `void`  | Expands all items (only works in `multiple` mode) |
| `collapseAll()`       | -                         | `void`  | Collapses all items                               |
| `focusItem(index)`    | `index: number`           | `void`  | Sets focus to a specific item by index            |

### mjo-accordion-item

| Method     | Parameters | Returns | Description                          |
| ---------- | ---------- | ------- | ------------------------------------ |
| `open()`   | -          | `void`  | Expands the accordion section        |
| `close()`  | -          | `void`  | Collapses the accordion section      |
| `toggle()` | -          | `void`  | Toggles the expanded/collapsed state |
| `focus()`  | -          | `void`  | Sets focus to the accordion item     |

## Slots

### mjo-accordion

| Slot      | Description                                 |
| --------- | ------------------------------------------- |
| (default) | Container for `mjo-accordion-item` elements |

### mjo-accordion-item

| Slot      | Description                                              |
| --------- | -------------------------------------------------------- |
| (default) | Content displayed when the accordion section is expanded |

## Events

### mjo-accordion

| Event                         | Detail                                                                   | Emitted When                         | Notes                                |
| ----------------------------- | ------------------------------------------------------------------------ | ------------------------------------ | ------------------------------------ |
| `mjo-accordion:toggle`        | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` | Any section is expanded or collapsed | Forwarded from accordion-item events |
| `mjo-accordion:will-expand`   | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` | Before a section starts expanding    | Cancelable event                     |
| `mjo-accordion:expanded`      | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` | After a section finishes expanding   | Animation completed                  |
| `mjo-accordion:will-collapse` | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` | Before a section starts collapsing   | Cancelable event                     |
| `mjo-accordion:collapsed`     | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` | After a section finishes collapsing  | Animation completed                  |

### mjo-accordion-item

| Event                         | Detail                                          | Emitted When                      | Notes                                        |
| ----------------------------- | ----------------------------------------------- | --------------------------------- | -------------------------------------------- |
| `mjo-accordion:toggle`        | `{ item: MjoAccordionItem, expanded: boolean }` | Section is expanded or collapsed  | Bubbles to parent accordion                  |
| `mjo-accordion:will-expand`   | `{ item: MjoAccordionItem, expanded: boolean }` | Before section starts expanding   | Cancelable - prevents expansion if cancelled |
| `mjo-accordion:expanded`      | `{ item: MjoAccordionItem, expanded: boolean }` | After section finishes expanding  | Fired when animation completes               |
| `mjo-accordion:will-collapse` | `{ item: MjoAccordionItem, expanded: boolean }` | Before section starts collapsing  | Cancelable - prevents collapse if cancelled  |
| `mjo-accordion:collapsed`     | `{ item: MjoAccordionItem, expanded: boolean }` | After section finishes collapsing | Fired when animation completes               |

## CSS Variables

The component consumes CSS variables with fallbacks. Custom values can be injected globally (`<mjo-theme>`) or per-instance via ThemeMixin.

### mjo-accordion Variables

| Variable                           | Fallback                      | Used For                                        |
| ---------------------------------- | ----------------------------- | ----------------------------------------------- |
| `--mjo-accordion-background-color` | `--mjo-background-color-high` | Background color for shadow/splitted variants   |
| `--mjo-accordion-border-color`     | `--mjo-border-color`          | Border color for separators and borders         |
| `--mjo-accordion-border-radius`    | `--mjo-radius-large`          | Border radius for container and items           |
| `--mjo-accordion-box-shadow`       | `--mjo-box-shadow-2`          | Box shadow for the container                    |
| `--mjo-accordion-gap`              | `--mjo-space-small`           | Gap between items in splitted variant           |
| `--mjo-accordion-padding-compact`  | `--mjo-space-small`           | Compact horizontal padding                      |
| `--mjo-accordion-padding`          | `--mjo-space-medium`          | Horizontal padding for shadow/bordered variants |

### mjo-accordion-item Variables

| Variable                                     | Fallback                     | Used For                                   |
| -------------------------------------------- | ---------------------------- | ------------------------------------------ |
| `--mjo-accordion-item-content-padding`       | `--mjo-space-medium`         | Bottom padding when content is expanded    |
| `--mjo-accordion-item-focus-color`           | `--mjo-primary-color`        | Outline color for keyboard focus indicator |
| `--mjo-accordion-item-subtitle-color`        | `--mjo-foreground-color-low` | Color for the subtitle text                |
| `--mjo-accordion-item-title-color-hover`     | `--mjo-foreground-color`     | Color for the title text on hover          |
| `--mjo-accordion-item-title-color`           | `--mjo-foreground-color`     | Color for the title text                   |
| `--mjo-accordion-item-title-font-size`       | `1em`                        | Font size for the title                    |
| `--mjo-accordion-item-title-padding-compact` | `--mjo-space-small`          | Compact vertical padding for title         |
| `--mjo-accordion-item-title-padding`         | `--mjo-space-medium`         | Vertical padding for title container       |

## ThemeMixin Customization

Both components mix in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances.

### MjoAccordionTheme Interface

```ts
interface MjoAccordionTheme {
    backgroundColor?: string;
    borderColor?: string;
    padding?: string;
    paddingCompact?: string;
    borderRadius?: string;
    boxShadow?: string;
    gap?: string;
    itemTitlePadding?: string;
    itemTitlePaddingCompact?: string;
    itemTitleFontSize?: string;
    itemTitleColor?: string;
    itemTitleColorHover?: string;
    itemSubtitleColor?: string;
    itemContentPadding?: string;
    itemFocusColor?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-accordion";

@customElement("example-accordion-themed")
export class ExampleAccordionThemed extends LitElement {
    private customAccordionTheme = {
        backgroundColor: "#f8f9fa",
        borderColor: "#e9ecef",
        padding: "1rem",
        borderRadius: "12px",
        itemTitleColor: "#495057",
        itemTitleFontSize: "1.1rem",
        itemSubtitleColor: "#6c757d",
        itemTitlePadding: "1rem",
    };

    render() {
        return html`
            <mjo-accordion variant="shadow" .theme=${this.customAccordionTheme}>
                <mjo-accordion-item itemTitle="Custom Themed Section" itemSubtitle="With custom colors and spacing">
                    <p>This accordion uses custom theming for both container and items.</p>
                </mjo-accordion-item>
            </mjo-accordion>
        `;
    }
}
```

## Advanced Usage with Custom Templates

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-accordion";
import "mjo-litui/mjo-icon";

@customElement("example-accordion-custom-title")
export class ExampleAccordionCustomTitle extends LitElement {
    render() {
        return html`
            <mjo-accordion variant="bordered">
                <mjo-accordion-item
                    .itemTitle=${html`
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <mjo-icon src="star" style="color: gold;"></mjo-icon>
                            <span style="font-weight: bold;">Premium Feature</span>
                            <span style="background: #ff6b6b; color: white; padding: 0.125rem 0.5rem; border-radius: 1rem; font-size: 0.75rem;">NEW</span>
                        </div>
                    `}
                >
                    <p>You can use template literals to create complex title layouts with icons, badges, and custom styling.</p>
                </mjo-accordion-item>
            </mjo-accordion>
        `;
    }
}
```

## Programmatic Control Example

```ts
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { MjoAccordion } from "mjo-litui";
import "mjo-litui/mjo-accordion";
import "mjo-litui/mjo-button";

@customElement("example-accordion-programmatic")
export class ExampleAccordionProgrammatic extends LitElement {
    @query("mjo-accordion") private accordion!: MjoAccordion;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 0.5rem;">
                    <mjo-button @click=${() => this.accordion.expandItem(0)}>Expand First</mjo-button>
                    <mjo-button @click=${() => this.accordion.collapseAll()}>Collapse All</mjo-button>
                </div>

                <mjo-accordion variant="shadow" selectionMode="multiple">
                    <mjo-accordion-item itemTitle="Section 1">
                        <p>Content for section 1</p>
                    </mjo-accordion-item>
                    <mjo-accordion-item itemTitle="Section 2">
                        <p>Content for section 2</p>
                    </mjo-accordion-item>
                </mjo-accordion>
            </div>
        `;
    }
}
```

## CSS Parts

| Part        | Component            | Description                  |
| ----------- | -------------------- | ---------------------------- |
| `container` | `mjo-accordion`      | The main container element   |
| `container` | `mjo-accordion-item` | The item container element   |
| `content`   | `mjo-accordion-item` | The collapsible content area |

## Accessibility Notes

The accordion components include comprehensive accessibility features following WCAG 2.1 guidelines:

### Built-in Accessibility Features

-   **ARIA Structure**: Complete ARIA implementation with `role="button"` on title containers, `aria-expanded`, `aria-controls`, and `role="region"` on content areas
-   **Keyboard Navigation**: Full keyboard support including:
    -   **Enter/Space**: Toggle expansion
    -   **Arrow Up/Down**: Navigate between items
    -   **Home/End**: Jump to first/last item
    -   **Escape**: Close expanded section
-   **Focus Management**: Proper focus indicators with `:focus-visible` support and customizable focus colors
-   **Screen Reader Support**: Automatic unique IDs and proper labeling relationships
-   **Reduced Motion**: Respects `prefers-reduced-motion` user preference by disabling animations
-   **State Communication**: All state changes are properly announced to assistive technologies

### Accessibility Best Practices

```html
<!-- Enhanced accessibility example -->
<mjo-accordion variant="shadow" selectionMode="single">
    <mjo-accordion-item itemTitle="Account Settings" itemSubtitle="Manage your profile and preferences" aria-describedby="account-help">
        <div id="account-help">Configure your account settings, privacy preferences, and notification options.</div>
        <p>Account configuration content here...</p>
    </mjo-accordion-item>
</mjo-accordion>
```

## Performance Considerations

-   Content is rendered but hidden with CSS transitions rather than conditional rendering for smooth animations
-   Large numbers of accordion items should be virtualized if performance becomes an issue
-   The component automatically manages item references and event listeners efficiently

## Summary

`<mjo-accordion>` provides a flexible, accessible container for organizing content in collapsible sections with multiple visual variants and selection modes. The component consists of a parent `<mjo-accordion>` that manages behavior and child `<mjo-accordion-item>` elements that contain the actual content.

### Key Features

-   **Multiple Variants**: Light, shadow, bordered, and splitted visual styles
-   **Selection Modes**: Single or multiple section expansion
-   **Full Accessibility**: WCAG 2.1 compliant with complete keyboard navigation and ARIA support
-   **Programmatic Control**: Rich API for expanding, collapsing, and focusing items
-   **Granular Events**: Detailed event system with cancelable before/after events
-   **Customizable Animations**: Configurable duration and easing with reduced-motion support
-   **Flexible Content**: Support for both simple text titles and complex template-based headers

### Usage Recommendations

-   Use global theming (`<mjo-theme>`) for consistency across your application
-   Leverage ThemeMixin for instance-specific customizations
-   Take advantage of the programmatic API for dynamic content management
-   Use the granular event system for complex interaction flows
-   Ensure proper contrast ratios when customizing colors
-   Test keyboard navigation and screen reader compatibility

The component automatically handles focus management, state synchronization, and accessibility requirements, making it ideal for building inclusive user interfaces with organized, collapsible content sections.
