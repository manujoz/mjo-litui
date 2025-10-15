# mjo-accordion

Flexible accordion component with multiple variants, selection modes, and accessibility support. It provides an organized way to display collapsible content sections with keyboard navigation and comprehensive ARIA features.

## Use Cases

- FAQ sections with question/answer pairs
- Expandable content panels in dashboards
- Settings or preference panels with grouped options
- Documentation with collapsible sections
- Product details with expandable specifications

## Import

```typescript
import "mjo-litui/mjo-accordion";
```

## Properties

### mjo-accordion

| Property        | Type                                                         | Description                                                           | Default    | Required |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------------------------- | ---------- | -------- |
| `variant`       | `"light" \| "solid" \| "shadow" \| "bordered" \| "splitted"` | Visual style variant of the accordion                                 | `"light"`  | No       |
| `selectionMode` | `"single" \| "multiple"`                                     | Controls whether one or multiple items can be expanded simultaneously | `"single"` | No       |
| `compact`       | `boolean`                                                    | Enables compact spacing for items                                     | `false`    | No       |

### mjo-accordion-item

| Property           | Type                       | Description                                     | Default          | Required |
| ------------------ | -------------------------- | ----------------------------------------------- | ---------------- | -------- |
| `itemTitle`        | `string \| TemplateResult` | Title text or template for the accordion item   | `""`             | No       |
| `itemSubtitle`     | `string`                   | Subtitle text displayed below the title         | `""`             | No       |
| `expanded`         | `boolean`                  | Controls whether the item is expanded           | `false`          | No       |
| `disabled`         | `boolean`                  | Disables interaction with the item              | `false`          | No       |
| `icon`             | `string`                   | Icon SVG string for the toggle indicator        | `AiOutlineRight` | No       |
| `aria-describedby` | `string`                   | ID of element that describes the accordion item | `undefined`      | No       |

## Methods

### mjo-accordion

| Method         | Parameters                | Description                                                          | Return |
| -------------- | ------------------------- | -------------------------------------------------------------------- | ------ |
| `expandItem`   | `index: number \| string` | Expands an item by index or ID. Only works if item is not disabled   | `void` |
| `collapseItem` | `index: number \| string` | Collapses an item by index or ID                                     | `void` |
| `expandAll`    | -                         | Expands all non-disabled items (only in `"multiple"` selection mode) | `void` |
| `collapseAll`  | -                         | Collapses all items                                                  | `void` |
| `focusItem`    | `index: number`           | Sets focus to an item by index if not disabled                       | `void` |

### mjo-accordion-item

| Method       | Parameters                      | Description                                   | Return |
| ------------ | ------------------------------- | --------------------------------------------- | ------ |
| `open`       | -                               | Expands the accordion item                    | `void` |
| `close`      | -                               | Collapses the accordion item                  | `void` |
| `toggle`     | -                               | Toggles between expanded and collapsed states | `void` |
| `focus`      | -                               | Sets focus on the item's header               | `void` |
| `setVariant` | `variant: MjoAccordionVariants` | Sets the visual variant (internal use)        | `void` |
| `setCompact` | `compact: boolean`              | Sets compact mode (internal use)              | `void` |

## Events

### mjo-accordion

| Event                         | Type                            | Description                                 | Detail                                                                   |
| ----------------------------- | ------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| `mjo-accordion:toggle`        | `MjoAccordionToggleEvent`       | Fired when any accordion item is toggled    | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` |
| `mjo-accordion:will-expand`   | `MjoAccordionWillExpandEvent`   | Fired before an item expands (cancelable)   | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` |
| `mjo-accordion:expanded`      | `MjoAccordionExpandedEvent`     | Fired after an item has expanded            | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` |
| `mjo-accordion:will-collapse` | `MjoAccordionWillCollapseEvent` | Fired before an item collapses (cancelable) | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` |
| `mjo-accordion:collapsed`     | `MjoAccordionCollapsedEvent`    | Fired after an item has collapsed           | `{ item: MjoAccordionItem, expanded: boolean, accordion: MjoAccordion }` |

### mjo-accordion-item

| Event                         | Type                            | Description                                  | Detail                                          |
| ----------------------------- | ------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| `mjo-accordion:toggle`        | `MjoAccordionToggleEvent`       | Fired when the item is toggled               | `{ item: MjoAccordionItem, expanded: boolean }` |
| `mjo-accordion:will-expand`   | `MjoAccordionWillExpandEvent`   | Fired before the item expands (cancelable)   | `{ item: MjoAccordionItem, expanded: boolean }` |
| `mjo-accordion:expanded`      | `MjoAccordionExpandedEvent`     | Fired after the item has expanded            | `{ item: MjoAccordionItem, expanded: boolean }` |
| `mjo-accordion:will-collapse` | `MjoAccordionWillCollapseEvent` | Fired before the item collapses (cancelable) | `{ item: MjoAccordionItem, expanded: boolean }` |
| `mjo-accordion:collapsed`     | `MjoAccordionCollapsedEvent`    | Fired after the item has collapsed           | `{ item: MjoAccordionItem, expanded: boolean }` |

## CSS Variables

### mjo-accordion

| Variable                           | Description                                                           | Default                            |
| ---------------------------------- | --------------------------------------------------------------------- | ---------------------------------- |
| `--mjo-accordion-border-radius`    | Border radius for solid, shadow, bordered, and splitted variants      | `var(--mjo-radius-large)`          |
| `--mjo-accordion-background-color` | Background color for solid, shadow, and splitted item variants        | `var(--mjo-background-color-card)` |
| `--mjo-accordion-box-shadow`       | Box shadow for shadow variant                                         | `var(--mjo-box-shadow-2)`          |
| `--mjo-accordion-border-color`     | Border color for bordered variant and item separators                 | `var(--mjo-border-color)`          |
| `--mjo-accordion-gap`              | Gap between items in splitted variant                                 | `var(--mjo-space-small)`           |
| `--mjo-accordion-padding`          | Horizontal padding for solid, shadow, bordered, and splitted variants | `var(--mjo-space-medium)`          |
| `--mjo-accordion-padding-compact`  | Horizontal padding in compact mode                                    | `var(--mjo-space-small)`           |

### mjo-accordion-item

| Variable                                     | Description                                     | Default                           |
| -------------------------------------------- | ----------------------------------------------- | --------------------------------- |
| `--mjo-accordion-item-title-padding`         | Vertical padding for item title area            | `var(--mjo-space-medium)`         |
| `--mjo-accordion-item-title-padding-compact` | Vertical padding for item title in compact mode | `var(--mjo-space-small)`          |
| `--mjo-accordion-item-title-font-size`       | Font size for item title                        | `1em`                             |
| `--mjo-accordion-item-title-color`           | Color for item title                            | `var(--mjo-foreground-color)`     |
| `--mjo-accordion-item-title-color-hover`     | Color for item title on hover                   | `var(--mjo-foreground-color)`     |
| `--mjo-accordion-item-subtitle-color`        | Color for item subtitle                         | `var(--mjo-foreground-color-low)` |
| `--mjo-accordion-item-content-padding`       | Bottom padding when item is expanded            | `var(--mjo-space-medium)`         |
| `--mjo-accordion-item-focus-color`           | Focus outline color for keyboard navigation     | `var(--mjo-primary-color)`        |

## CSS Parts

### mjo-accordion

| Part        | Description              | Element         |
| ----------- | ------------------------ | --------------- |
| `accordion` | Main accordion container | `div.container` |

### mjo-accordion-item

| Part       | Description                                     | Element              |
| ---------- | ----------------------------------------------- | -------------------- |
| `item`     | Main accordion item container                   | `div.container`      |
| `header`   | Clickable header area containing title and icon | `div.titleContainer` |
| `content`  | Collapsible content area                        | `div.content`        |
| `title`    | Title typography element (via exportparts)      | `mjo-typography`     |
| `subtitle` | Subtitle typography element (via exportparts)   | `mjo-typography`     |
| `icon`     | Toggle icon element (via exportparts)           | `mjo-icon`           |

## Accessibility

### Keyboard Navigation

The accordion supports full keyboard navigation:

- **Tab**: Navigate between accordion items
- **Enter/Space**: Toggle the focused item
- **Arrow Up/Down**: Move focus to previous/next item
- **Home**: Focus first item
- **End**: Focus last item
- **Escape**: Collapse the focused item (if expanded)

## Usage Examples

### Basic Accordion

```html
<mjo-accordion>
    <mjo-accordion-item itemTitle="Section 1">
        <p>Content for section 1</p>
    </mjo-accordion-item>
    <mjo-accordion-item itemTitle="Section 2">
        <p>Content for section 2</p>
    </mjo-accordion-item>
    <mjo-accordion-item itemTitle="Section 3">
        <p>Content for section 3</p>
    </mjo-accordion-item>
</mjo-accordion>
```

### Multiple Selection Mode

```html
<mjo-accordion selectionMode="multiple">
    <mjo-accordion-item itemTitle="Feature 1">
        <p>Details about feature 1</p>
    </mjo-accordion-item>
    <mjo-accordion-item itemTitle="Feature 2">
        <p>Details about feature 2</p>
    </mjo-accordion-item>
</mjo-accordion>
```

### Visual Variants

```html
<!-- Solid variant -->
<mjo-accordion variant="solid">
    <mjo-accordion-item itemTitle="Solid Style">
        <p>Accordion with solid background</p>
    </mjo-accordion-item>
</mjo-accordion>

<!-- Shadow variant -->
<mjo-accordion variant="shadow">
    <mjo-accordion-item itemTitle="Shadow Style">
        <p>Accordion with elevated shadow</p>
    </mjo-accordion-item>
</mjo-accordion>

<!-- Bordered variant -->
<mjo-accordion variant="bordered">
    <mjo-accordion-item itemTitle="Bordered Style">
        <p>Accordion with border</p>
    </mjo-accordion-item>
</mjo-accordion>

<!-- Splitted variant -->
<mjo-accordion variant="splitted">
    <mjo-accordion-item itemTitle="Splitted Style">
        <p>Accordion with separated items</p>
    </mjo-accordion-item>
</mjo-accordion>
```

### With Subtitles and Disabled Items

```html
<mjo-accordion>
    <mjo-accordion-item itemTitle="Available Section" itemSubtitle="Click to expand">
        <p>This section can be expanded</p>
    </mjo-accordion-item>
    <mjo-accordion-item itemTitle="Disabled Section" itemSubtitle="Cannot be opened" disabled>
        <p>This content is not accessible</p>
    </mjo-accordion-item>
</mjo-accordion>
```

### Programmatic Control

```typescript
const accordion = document.querySelector("mjo-accordion");

// Expand specific item
accordion.expandItem(0); // By index
accordion.expandItem("item-id"); // By ID

// Collapse all items
accordion.collapseAll();

// Expand all (only in multiple mode)
accordion.expandAll();

// Focus specific item
accordion.focusItem(1);
```

### Event Handling

```typescript
const accordion = document.querySelector("mjo-accordion");

// Listen for toggle events
accordion.addEventListener("mjo-accordion:toggle", (e) => {
    console.log("Toggled:", e.detail.item, "Expanded:", e.detail.expanded);
});

// Prevent expansion with cancelable event
accordion.addEventListener("mjo-accordion:will-expand", (e) => {
    if (someCondition) {
        e.preventDefault(); // Cancel the expansion
    }
});

// React after expansion completes
accordion.addEventListener("mjo-accordion:expanded", (e) => {
    console.log("Item fully expanded:", e.detail.item);
});
```

### Custom Styling with CSS Parts

```css
/* Style the accordion container */
mjo-accordion::part(accordion) {
    max-width: 800px;
    margin: 0 auto;
}

/* Customize item header */
mjo-accordion-item::part(header) {
    background: linear-gradient(to right, #f0f0f0, #ffffff);
}

/* Style the title */
mjo-accordion-item::part(title) {
    font-weight: bold;
    color: #333;
}

/* Customize the content area */
mjo-accordion-item::part(content) {
    padding: 20px;
    background: #fafafa;
}
```

## Additional Notes

- The component automatically handles `single` vs `multiple` selection modes. In single mode, expanding one item collapses others.
- All events include both the item and accordion references for flexible event handling.
- The `will-expand` and `will-collapse` events are cancelable, allowing you to prevent state changes based on custom logic.
- The component respects `prefers-reduced-motion` for users who prefer reduced animations.
- Full ARIA support is included for screen readers with proper roles, labels, and state management.
- Disabled items are automatically skipped during keyboard navigation.
