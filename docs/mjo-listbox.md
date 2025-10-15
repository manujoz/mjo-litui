# mjo-listbox

Interactive listbox component for displaying selectable lists of items with full accessibility support.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

The `mjo-listbox` component is designed for scenarios where you need to display a list of selectable items with rich formatting and interactions:

- Building menus with sections and icons
- Creating action lists with visual feedback
- Implementing single or multiple selection lists
- Displaying navigation options with descriptions
- Building command palettes or quick action menus
- Creating accessible list interfaces with keyboard navigation

## Import

```typescript
import "mjo-litui/mjo-listbox";
```

## Properties

| Property     | Type                                         | Description                                                                            | Default     | Required |
| ------------ | -------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- | -------- |
| `items`      | `MjoListboxItems`                            | Array of listbox items to display. Each item can be a regular item or a section header | `[]`        | No       |
| `variant`    | `'solid' \| 'bordered' \| 'light' \| 'flat'` | Visual variant of the listbox items                                                    | `'solid'`   | No       |
| `size`       | `'small' \| 'medium' \| 'large'`             | Size of the listbox and its items                                                      | `'medium'`  | No       |
| `selectable` | `'single' \| 'multiple' \| undefined`        | Selection mode. If undefined, items are not selectable                                 | `undefined` | No       |

### MjoListboxItem Interface

Each item in the `items` array can have the following properties:

| Property      | Type                                                                      | Description                                                       |
| ------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `label`       | `string \| number \| TemplateResult<1>`                                   | Label text or template for the item                               |
| `description` | `string`                                                                  | Optional secondary description text                               |
| `color`       | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | Color theme for the item                                          |
| `startIcon`   | `string`                                                                  | Icon to display at the start of the item                          |
| `endIcon`     | `string`                                                                  | Icon to display at the end of the item                            |
| `disabled`    | `boolean`                                                                 | Whether the item is disabled                                      |
| `section`     | `string`                                                                  | If defined, renders as a section header instead of a regular item |
| `href`        | `string`                                                                  | If defined, renders the item as a link                            |
| `value`       | `string \| number`                                                        | Value associated with the item for form integration               |

## Methods

This component does not expose public methods.

## Events

| Event                | Type                       | Description                                            | Detail                                                                        |
| -------------------- | -------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `mjo-listbox:click`  | `MjoListboxClickEvent`     | Fired when an item is clicked                          | `{ item: MjoListboxItem, value: string \| number }`                           |
| `mjo-listbox:change` | `MjoListboxChangeEvent`    | Fired when selection changes (only in selectable mode) | `{ selectedItems: MjoListboxItems, selectedValues: Array<string \| number> }` |
| `mjo-listbox:focus`  | `MjoListboxItemFocusEvent` | Fired when an item receives focus                      | `{ item: MjoListboxItem, value: string \| number }`                           |
| `mjo-listbox:blur`   | `MjoListboxItemBlurEvent`  | Fired when an item loses focus                         | `{ item: MjoListboxItem, value: string \| number }`                           |

## CSS Variables

| Variable                                    | Description                                      | Default                                                           |
| ------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------- |
| `--mjo-listbox-background-color`            | Background color of the listbox container        | -                                                                 |
| `--mjo-listbox-border-radius`               | Border radius of the listbox container and items | `var(--mjo-radius-medium, 3px)`                                   |
| `--mjo-listbox-item-gap`                    | Gap between item content elements                | `var(--mjo-space-small)`                                          |
| `--mjo-listbox-item-margin`                 | Margin around individual items                   | `var(--mjo-space-xsmall, 3px) 0`                                  |
| `--mjo-listbox-item-padding`                | Padding inside individual items                  | `var(--mjo-space-xxsmall, 3px) var(--mjo-space-xsmall, 3px)`      |
| `--mjo-listbox-item-cursor`                 | Cursor style for items                           | `pointer`                                                         |
| `--mjo-listbox-item-border-radius`          | Border radius for individual items               | `var(--mjo-listbox-border-radius, var(--mjo-radius-medium, 3px))` |
| `--mjo-listbox-item-hover-background-color` | Background color for hovered/focused items       | `var(--mjo-color-default)`                                        |
| `--mjo-listbox-item-hover-foreground-color` | Text color for hovered/focused items             | `var(--mjo-color-default-foreground)`                             |
| `--mjo-listbox-icon-top`                    | Top offset for icons within items                | -                                                                 |
| `--mjo-listbox-section-border-color`        | Border color for section headers                 | `var(--mjo-border-color, #dddddd)`                                |
| `--mjo-listbox-section-color`               | Text color for section headers                   | `var(--mjo-foreground-color-low, #666666)`                        |

## CSS Parts

| Part                     | Description                         | Element                      |
| ------------------------ | ----------------------------------- | ---------------------------- |
| `container`              | Main listbox container              | `div[role="listbox"]`        |
| `link`                   | Link element for items with href    | `a`                          |
| `wrapper`                | Individual item wrapper             | `div.inner`                  |
| `content`                | Item content container              | `div.content`                |
| `item-label`             | Item label typography               | `mjo-typography`             |
| `item-description`       | Item description typography         | `mjo-typography.description` |
| `item-description-tag`   | Typography tag for item description | `typography` element         |
| `start-icon`             | Start icon element                  | `mjo-icon`                   |
| `end-icon`               | End icon element                    | `mjo-icon`                   |
| `selected-icon`          | Selected state icon                 | `mjo-icon.selected-icon`     |
| `section`                | Section header container            | `div[role="group"]`          |
| `section-typography-tag` | Section typography tag              | `typography` element         |
| `section-typography`     | Section typography element          | `mjo-typography`             |

## Accessibility

The `mjo-listbox` component follows WAI-ARIA guidelines for accessible listbox patterns:

### ARIA Roles and Attributes

- **Container**: `role="listbox"` with `aria-multiselectable` indicating selection mode
- **Items**: `role="option"` with `aria-selected` and `aria-disabled` attributes
- **Sections**: `role="group"` with `aria-label` for section headers
- **Focus Management**: `aria-activedescendant` points to the currently focused item

### Keyboard Interactions

| Key                | Action                                                   |
| ------------------ | -------------------------------------------------------- |
| `ArrowDown`        | Moves focus to the next enabled item (wraps to first)    |
| `ArrowUp`          | Moves focus to the previous enabled item (wraps to last) |
| `Home`             | Moves focus to the first enabled item                    |
| `End`              | Moves focus to the last enabled item                     |
| `Enter` or `Space` | Selects/deselects the focused item in selectable mode    |
| `Tab`              | Moves focus into and out of the listbox                  |

### Best Practices

- Always provide meaningful `label` values for items
- Use `description` to provide additional context when needed
- Set `disabled` on items that are not currently actionable
- Use `section` to group related items logically
- Provide `value` for items when using in forms or selections
- Use appropriate `color` values to convey meaning (e.g., `error` for destructive actions)

## Usage Examples

### Basic Listbox

```typescript
import "mjo-litui/mjo-listbox";
import { MjoListboxItems } from "mjo-litui/types/mjo-listbox";

const items: MjoListboxItems = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
];
```

```html
<mjo-listbox .items="${items}"></mjo-listbox>
```

### Listbox with Sections and Icons

```typescript
import { AiFillAccountBook, AiFillAlert, AiFillApple } from "mjo-icons/ai";

const items: MjoListboxItems = [
    { section: "Actions" },
    { label: "Edit", startIcon: AiFillAccountBook, color: "primary", value: "edit" },
    { label: "Delete", startIcon: AiFillAlert, color: "error", value: "delete" },
    { section: "User" },
    { label: "Profile", startIcon: AiFillApple, color: "secondary", value: "profile" },
];
```

```html
<mjo-listbox .items="${items}" variant="light"></mjo-listbox>
```

### Single Selection Listbox

```typescript
const items: MjoListboxItems = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3", disabled: true },
];
```

```html
<mjo-listbox .items="${items}" selectable="single" @mjo-listbox:change="${(e)" =""> console.log('Selected:', e.detail.selectedValues)} ></mjo-listbox>
```

### Multiple Selection Listbox

```html
<mjo-listbox .items="${items}" selectable="multiple" variant="flat" @mjo-listbox:change="${(e)" ="">
    console.log('Selected items:', e.detail.selectedItems)} ></mjo-listbox
>
```

### Listbox with Descriptions

```typescript
const items: MjoListboxItems = [
    {
        label: "Advanced Settings",
        description: "Configure advanced options",
        color: "info",
        value: "advanced",
    },
    {
        label: "Danger Zone",
        description: "Irreversible actions",
        color: "error",
        value: "danger",
    },
];
```

```html
<mjo-listbox .items="${items}" size="large"></mjo-listbox>
```

### Listbox with Custom HTML Labels

```typescript
import { html } from "lit";

const items: MjoListboxItems = [
    {
        label: html`<span style="color: var(--mjo-color-success)">Success</span>`,
        value: "success",
    },
    {
        label: html`<strong>Bold Item</strong>`,
        value: "bold",
    },
];
```

```html
<mjo-listbox .items="${items}"></mjo-listbox>
```

### Listbox with Links

```typescript
const items: MjoListboxItems = [
    { label: "Home", href: "/", value: "home" },
    { label: "About", href: "/about", value: "about" },
    { label: "Contact", href: "/contact", value: "contact" },
];
```

```html
<mjo-listbox .items="${items}" variant="bordered"></mjo-listbox>
```

### Handling Events

```typescript
const handleClick = (e: CustomEvent) => {
    console.log("Clicked item:", e.detail.item);
    console.log("Item value:", e.detail.value);
};

const handleChange = (e: CustomEvent) => {
    console.log("Selected items:", e.detail.selectedItems);
    console.log("Selected values:", e.detail.selectedValues);
};
```

```html
<mjo-listbox .items="${items}" selectable="single" @mjo-listbox:click="${handleClick}" @mjo-listbox:change="${handleChange}"></mjo-listbox>
```

### Customizing with CSS Variables

```css
mjo-listbox {
    --mjo-listbox-background-color: #f5f5f5;
    --mjo-listbox-border-radius: 8px;
    --mjo-listbox-item-padding: 12px 16px;
    --mjo-listbox-item-gap: 12px;
    --mjo-listbox-item-hover-background-color: #e0e0e0;
    --mjo-listbox-icon-top: -2px;
}
```

### Styling with CSS Parts

```css
mjo-listbox::part(container) {
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

mjo-listbox::part(item-label) {
    font-weight: 500;
}

mjo-listbox::part(item-description) {
    font-style: italic;
}

mjo-listbox::part(start-icon) {
    color: var(--mjo-primary-color);
}
```

## Additional Notes

- **Selection State**: The component manages selection state internally via the `selectedItems` state. Access current selection through the `mjo-listbox:change` event.
- **Keyboard Navigation**: Focus management automatically skips disabled items and sections.
- **Icon Support**: Use icons from `mjo-icons` package for `startIcon` and `endIcon` properties.
- **Performance**: The component uses Lit's `repeat` directive with efficient keying for optimal rendering performance.
- **Section Headers**: Items with a `section` property are rendered as non-interactive section headers that group related items.
- **Link Items**: Items with an `href` property are rendered as `<a>` elements, allowing standard link behavior while maintaining listbox semantics.
- **Disabled Items**: Disabled items are not focusable and cannot be selected, but remain visible in the list.
