# mjo-listbox

Interactive listbox component for displaying selectable lists of items with support for single and multiple selection, keyboard navigation, and full accessibility features.

## Usage

### Basic HTML

```html
<mjo-listbox>
    <!-- Items are configured via JavaScript -->
</mjo-listbox>
```

### Lit Element Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-listbox";

@customElement("example-listbox-basic")
export class ExampleListboxBasic extends LitElement {
    @state() private items = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3", disabled: true },
        { label: "Option 4", value: "4" },
    ];

    render() {
        return html` <mjo-listbox .items=${this.items} selectable="single" @mjo-listbox:change=${this.handleChange}></mjo-listbox> `;
    }

    private handleChange(event: CustomEvent) {
        console.log("Selected items:", event.detail.selectedItems);
        console.log("Selected values:", event.detail.selectedValues);
    }
}
```

### Multiple Selection

```ts
@customElement("example-listbox-multiple")
export class ExampleListboxMultiple extends LitElement {
    @state() private items = [
        { label: "Apple", value: "apple", color: "success" },
        { label: "Banana", value: "banana", color: "warning" },
        { label: "Orange", value: "orange", color: "warning" },
        { label: "Grape", value: "grape", color: "info" },
    ];

    render() {
        return html` <mjo-listbox .items=${this.items} selectable="multiple" variant="bordered" @mjo-listbox:change=${this.handleChange}></mjo-listbox> `;
    }

    private handleChange(event: CustomEvent) {
        const { selectedItems, selectedValues } = event.detail;
        console.log("Selection changed to:", selectedItems);
        console.log("Selected values:", selectedValues);
    }
}
```

### With Sections and Icons

```ts
@customElement("example-listbox-sections")
export class ExampleListboxSections extends LitElement {
    @state() private items = [
        { section: "Fruits" },
        { label: "Apple", value: "apple", startIcon: "🍎" },
        { label: "Banana", value: "banana", startIcon: "🍌" },
        { section: "Vegetables" },
        { label: "Carrot", value: "carrot", startIcon: "🥕" },
        { label: "Broccoli", value: "broccoli", startIcon: "🥦" },
    ];

    render() {
        return html` <mjo-listbox .items=${this.items} selectable="single" size="large"></mjo-listbox> `;
    }
}
```

### Links Support

```ts
@customElement("example-listbox-links")
export class ExampleListboxLinks extends LitElement {
    @state() private items = [
        { label: "Home", href: "/", startIcon: "🏠" },
        { label: "About", href: "/about", startIcon: "ℹ️" },
        { label: "Contact", href: "/contact", startIcon: "📧" },
    ];

    render() {
        return html` <mjo-listbox .items=${this.items}></mjo-listbox> `;
    }
}
```

## Attributes/Properties

| Name         | Type                | Default     | Description                                                             |
| ------------ | ------------------- | ----------- | ----------------------------------------------------------------------- |
| `items`      | `MjoListboxItems`   | `[]`        | Array of items to display in the listbox                                |
| `variant`    | `MjoListboxVariant` | `"solid"`   | Visual style variant: `"solid"`, `"bordered"`, `"light"`, or `"flat"`   |
| `size`       | `MjoListboxSize`    | `"medium"`  | Size of the listbox: `"small"`, `"medium"`, or `"large"`                |
| `selectable` | `string`            | `undefined` | Selection mode: `"single"`, `"multiple"`, or `undefined` (no selection) |

## Item Properties

Each item in the `items` array can have the following properties:

| Name          | Type                                 | Default     | Description                                                                            |
| ------------- | ------------------------------------ | ----------- | -------------------------------------------------------------------------------------- |
| `label`       | `string \| number \| TemplateResult` | -           | Display text or template for the item                                                  |
| `value`       | `string \| number`                   | `undefined` | Value associated with the item                                                         |
| `description` | `string`                             | `undefined` | Optional description text                                                              |
| `color`       | `string`                             | `undefined` | Color theme: `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"error"`, `"info"` |
| `startIcon`   | `string`                             | `undefined` | Icon to display at the start of the item                                               |
| `endIcon`     | `string`                             | `undefined` | Icon to display at the end of the item                                                 |
| `disabled`    | `boolean`                            | `false`     | Whether the item is disabled                                                           |
| `section`     | `string`                             | `undefined` | If present, renders as a section header                                                |
| `href`        | `string`                             | `undefined` | If present, renders as a link                                                          |

## Events

| Name                 | Detail                                                                        | Description                       |
| -------------------- | ----------------------------------------------------------------------------- | --------------------------------- |
| `mjo-listbox:click`  | `{ item: MjoListboxItem, value: string \| number }`                           | Fired when an item is clicked     |
| `mjo-listbox:change` | `{ selectedItems: MjoListboxItems, selectedValues: Array<string \| number> }` | Fired when selection changes      |
| `mjo-listbox:focus`  | `{ item: MjoListboxItem, value: string \| number }`                           | Fired when an item receives focus |
| `mjo-listbox:blur`   | `{ item: MjoListboxItem, value: string \| number }`                           | Fired when an item loses focus    |

## Keyboard Navigation

-   **Arrow Up/Down**: Navigate between items
-   **Home**: Focus first item
-   **End**: Focus last item
-   **Enter/Space**: Select focused item
-   **Tab**: Move focus to next focusable element

The component automatically skips disabled items and sections during keyboard navigation and wraps around at the boundaries.

## Accessibility Features

-   Full ARIA support with proper roles (`listbox`, `option`, `group`)
-   Keyboard navigation following WAI-ARIA guidelines
-   Screen reader announcements for selection changes
-   Focus management with `aria-activedescendant`
-   Support for disabled and grouped options
-   Proper labeling and descriptions

## CSS Variables

### Container Variables

| Variable                         | Default                         | Description                               |
| -------------------------------- | ------------------------------- | ----------------------------------------- |
| `--mjo-listbox-background-color` | -                               | Background color of the listbox container |
| `--mjo-listbox-border-radius`    | `var(--mjo-radius-medium, 3px)` | Border radius of the container            |

### Item Variables

| Variable                                    | Default                                                      | Description                |
| ------------------------------------------- | ------------------------------------------------------------ | -------------------------- |
| `--mjo-listbox-item-gap`                    | `var(--mjo-space-small)`                                     | Gap between item elements  |
| `--mjo-listbox-item-margin`                 | `var(--mjo-space-xsmall, 3px) 0`                             | Margin around items        |
| `--mjo-listbox-item-padding`                | `var(--mjo-space-xxsmall, 3px) var(--mjo-space-xsmall, 3px)` | Internal padding of items  |
| `--mjo-listbox-item-cursor`                 | `pointer`                                                    | Cursor when hovering items |
| `--mjo-listbox-item-border-radius`          | `var(--mjo-listbox-border-radius)`                           | Border radius of items     |
| `--mjo-listbox-item-hover-background-color` | `var(--mjo-color-default)`                                   | Background color on hover  |
| `--mjo-listbox-item-hover-foreground-color` | `var(--mjo-color-default-foreground)`                        | Text color on hover        |

### Section Variables

| Variable                             | Default                                    | Description                         |
| ------------------------------------ | ------------------------------------------ | ----------------------------------- |
| `--mjo-listbox-section-border-color` | `var(--mjo-border-color, #dddddd)`         | Border color for section separators |
| `--mjo-listbox-section-color`        | `var(--mjo-foreground-color-low, #666666)` | Text color for section headers      |

### Icon Variables

| Variable                 | Default | Description                       |
| ------------------------ | ------- | --------------------------------- |
| `--mjo-listbox-icon-top` | -       | Top position adjustment for icons |

## Theming

The component inherits from global theme tokens. Color variants (`primary`, `secondary`, etc.) automatically use the corresponding theme colors for hover and focus states.

```css
mjo-listbox {
    --mjo-listbox-background-color: var(--mjo-background-surface);
    --mjo-listbox-item-hover-background-color: var(--mjo-primary-color-alpha2);
}
```

## Selection Behavior

### Single Selection Mode

When `selectable="single"`, only one item can be selected at a time. Selecting a new item automatically deselects the previous one.

### Multiple Selection Mode

When `selectable="multiple"`, multiple items can be selected. Clicking or pressing Enter/Space on an already selected item will deselect it.

### No Selection Mode

When `selectable` is not set or is `undefined`, items are not selectable but still respond to focus and click events for navigation purposes.

## Visual Variants

### Solid (default)

Items show solid background colors on hover and focus.

### Bordered

Items show colored borders on hover and focus instead of background colors.

### Light

Items show subtle text color changes on hover and focus.

### Flat

Items show very subtle background overlays on hover and focus.

## Size Options

-   **Small**: Reduced font size (0.9em)
-   **Medium**: Default font size
-   **Large**: Increased font size (1.1em)

## Implementation Notes

-   The component uses internal `listbox-item` and `listbox-section` components for rendering
-   Focus management is handled internally with proper ARIA attributes
-   Selection state is maintained in the `selectedItems` property
-   The component automatically generates unique IDs for accessibility
-   Items without labels will show an error in the console but won't crash the component
-   Disabled items are skipped during keyboard navigation
-   Links (items with `href`) render as anchor elements instead of divs
