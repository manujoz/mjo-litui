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

## Compact Mode and Custom Content Example

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
                    <h4>Custom Content</h4>
                    <mjo-accordion variant="shadow">
                        <mjo-accordion-item itemTitle="Rich Content" itemSubtitle="With buttons and more">
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                <p>You can include any content inside accordion sections:</p>
                                <div style="display: flex; gap: 0.5rem;">
                                    <mjo-button color="primary" size="small">Action 1</mjo-button>
                                    <mjo-button color="secondary" variant="ghost" size="small">Action 2</mjo-button>
                                </div>
                            </div>
                        </mjo-accordion-item>
                        <mjo-accordion-item itemTitle="Form Content">
                            <form style="display: flex; flex-direction: column; gap: 1rem;">
                                <input type="text" placeholder="Enter some text" style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
                                <textarea
                                    placeholder="Enter description"
                                    style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; min-height: 80px;"
                                ></textarea>
                            </form>
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

| Name           | Type                       | Default          | Reflects | Description                                             |
| -------------- | -------------------------- | ---------------- | -------- | ------------------------------------------------------- |
| `itemTitle`    | `string \| TemplateResult` | `""`             | no       | Title text or template for the accordion section header |
| `itemSubtitle` | `string`                   | `""`             | no       | Subtitle text displayed below the title                 |
| `expanded`     | `boolean`                  | `false`          | no       | Controls whether the section is expanded or collapsed   |
| `disabled`     | `boolean`                  | `false`          | no       | Disables interaction with the accordion section         |
| `compact`      | `boolean`                  | `false`          | no       | Internal property managed by parent accordion           |
| `icon`         | `string`                   | `AiOutlineRight` | no       | Icon used for the expand/collapse indicator             |

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

### mjo-accordion-item

| Event    | Detail                                          | Emitted When                     | Notes                                                       |
| -------- | ----------------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| `toggle` | `{ item: MjoAccordionItem, expanded: boolean }` | Section is expanded or collapsed | Bubbles to parent accordion for selection mode coordination |

## CSS Variables

The component consumes CSS variables with fallbacks. Custom values can be injected globally (`<mjo-theme>`) or per-instance via ThemeMixin.

### mjo-accordion Variables

| Variable                           | Fallback                      | Used For                                        |
| ---------------------------------- | ----------------------------- | ----------------------------------------------- |
| `--mjo-accordion-padding`          | `--mjo-space-medium`          | Horizontal padding for shadow/bordered variants |
| `--mjo-accordion-padding-compact`  | `--mjo-space-small`           | Compact horizontal padding                      |
| `--mjo-accordion-radius`           | `--mjo-radius-large`          | Border radius for container and items           |
| `--mjo-accordion-background-color` | `--mjo-background-color-high` | Background color for shadow/splitted variants   |
| `--mjo-accordion-border-color`     | `--mjo-border-color`          | Border color for separators and borders         |
| `--mjo-accordion-gap`              | `--mjo-space-small`           | Gap between items in splitted variant           |

### mjo-accordion-item Variables

| Variable                                     | Fallback                     | Used For                                |
| -------------------------------------------- | ---------------------------- | --------------------------------------- |
| `--mjo-accordion-item-title-padding`         | `--mjo-space-medium`         | Vertical padding for title container    |
| `--mjo-accordion-item-title-padding-compact` | `--mjo-space-small`          | Compact vertical padding for title      |
| `--mjo-accordion-item-content-padding`       | `--mjo-space-medium`         | Bottom padding when content is expanded |
| `--mjo-accordion-item-title-font-size`       | `1em`                        | Font size for the title                 |
| `--mjo-accordion-item-title-color`           | `--mjo-foreground-color`     | Color for the title text                |
| `--mjo-accordion-item-subtitle-color`        | `--mjo-foreground-color-low` | Color for the subtitle text             |

## ThemeMixin Customization

Both components mix in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances.

### MjoAccordionTheme Interface

```ts
interface MjoAccordionTheme {
    backgroundColor?: string;
    borderColor?: string;
    padding?: string;
    paddingCompact?: string;
    radius?: string;
    gap?: string;
}
```

### MjoAccordionItemTheme Interface

```ts
interface MjoAccordionItemTheme {
    titlePadding?: string;
    titleFontSize?: string;
    titleColor?: string;
    subtitleColor?: string;
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
        radius: "12px",
    };

    private customItemTheme = {
        titleColor: "#495057",
        titleFontSize: "1.1rem",
        subtitleColor: "#6c757d",
        titlePadding: "1rem",
    };

    render() {
        return html`
            <mjo-accordion variant="shadow" .theme=${this.customAccordionTheme}>
                <mjo-accordion-item itemTitle="Custom Themed Section" itemSubtitle="With custom colors and spacing" .theme=${this.customItemTheme}>
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

## Dynamic Content Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-accordion";

@customElement("example-accordion-dynamic")
export class ExampleAccordionDynamic extends LitElement {
    @state() private sections = [
        { title: "Dynamic Section 1", content: "This content is generated dynamically.", expanded: false },
        { title: "Dynamic Section 2", content: "You can programmatically control sections.", expanded: true },
        { title: "Dynamic Section 3", content: "Add, remove, or modify sections as needed.", expanded: false },
    ];

    private toggleSection(index: number) {
        this.sections = this.sections.map((section, i) => (i === index ? { ...section, expanded: !section.expanded } : section));
    }

    render() {
        return html`
            <mjo-accordion variant="shadow" selectionMode="multiple">
                ${this.sections.map(
                    (section, index) => html`
                        <mjo-accordion-item itemTitle=${section.title} ?expanded=${section.expanded} @toggle=${() => this.toggleSection(index)}>
                            <p>${section.content}</p>
                        </mjo-accordion-item>
                    `,
                )}
            </mjo-accordion>
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

-   Accordion items are clickable and support keyboard navigation
-   Consider adding appropriate ARIA attributes for screen readers:
    -   `aria-expanded` on the title container
    -   `aria-controls` linking to the content area
    -   `role="button"` on clickable title areas
-   Ensure sufficient color contrast for title and subtitle text
-   The expand/collapse animations respect `prefers-reduced-motion` preferences

## Performance Considerations

-   Content is rendered but hidden with CSS transitions rather than conditional rendering for smooth animations
-   Large numbers of accordion items should be virtualized if performance becomes an issue
-   The component automatically manages item references and event listeners efficiently

## Summary

`<mjo-accordion>` provides a flexible container for organizing content in collapsible sections with multiple visual variants and selection modes. The component consists of a parent `<mjo-accordion>` that manages behavior and child `<mjo-accordion-item>` elements that contain the actual content. Use global theming for consistency and ThemeMixin overrides for specific customizations. The component supports both simple text titles and complex template-based headers for advanced use cases.
