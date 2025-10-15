# mjo-chip

Flexible chip component for displaying compact information with multiple variants, colors, and interactive capabilities. Chips are commonly used for tags, categories, filters, and selections in user interfaces.

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

- **Tagging and categorization**: Display tags, labels, or categories for content organization
- **Filter selections**: Show active filters with close functionality in search interfaces
- **Contact chips**: Display selected contacts or recipients with removal capability
- **Status indicators**: Show status with colored chips using the dot variant
- **Interactive lists**: Clickable chips for navigation or triggering actions
- **Choice selections**: Display selected options from multi-select interfaces

## Import

```typescript
import "mjo-litui/mjo-chip";
```

Or import individually:

```typescript
import "mjo-litui/src/mjo-chip.js";
```

## Properties

| Property          | Type                  | Description                                                                                           | Default     | Required |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------------------------- | ----------- | -------- |
| `label`           | `string`              | Text displayed on the chip                                                                            | `""`        | No       |
| `size`            | `MjoChipSize`         | Size variant: `"small"`, `"medium"`, `"large"`                                                        | `"medium"`  | No       |
| `color`           | `MjoChipColor`        | Color variant: `"default"`, `"primary"`, `"secondary"`, `"success"`, `"info"`, `"warning"`, `"error"` | `"default"` | No       |
| `radius`          | `MjoChipRadius`       | Border radius: `"none"`, `"small"`, `"medium"`, `"large"`, `"full"`                                   | `"full"`    | No       |
| `variant`         | `MjoChipVariant`      | Visual style: `"solid"`, `"bordered"`, `"light"`, `"flat"`, `"faded"`, `"shadow"`, `"dot"`            | `"solid"`   | No       |
| `value`           | `string \| undefined` | Optional value for the chip, used in events                                                           | `undefined` | No       |
| `closable`        | `boolean`             | Shows close button and enables closing functionality                                                  | `false`     | No       |
| `clickable`       | `boolean`             | Makes the chip interactive and emits click events                                                     | `false`     | No       |
| `disabled`        | `boolean`             | Disables all interactions with the chip                                                               | `false`     | No       |
| `startIcon`       | `string \| undefined` | Icon displayed at the start (from mjo-icons)                                                          | `undefined` | No       |
| `endIcon`         | `string \| undefined` | Icon displayed at the end (from mjo-icons)                                                            | `undefined` | No       |
| `ariaDescribedby` | `string \| undefined` | ID of element providing additional description                                                        | `undefined` | No       |
| `ariaLabel`       | `string \| null`      | Accessibility label (auto-generated if not provided)                                                  | `null`      | No       |

## Methods

This component does not expose public methods.

## Events

| Event            | Type                | Description                                                           | Detail                                          |
| ---------------- | ------------------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| `mjo-chip:click` | `MjoChipClickEvent` | Fired when the chip is clicked (requires `clickable` property)        | `{ value: string }` - The chip's value or label |
| `mjo-chip:close` | `MjoChipCloseEvent` | Fired when the close button is clicked (requires `closable` property) | `{ value: string }` - The chip's value or label |

## CSS Variables

| Variable                              | Description                                    | Default                             |
| ------------------------------------- | ---------------------------------------------- | ----------------------------------- |
| `--mjo-chip-background-color`         | Background color of the chip                   | Computed based on variant and color |
| `--mjo-chip-border-color`             | Border color of the chip                       | Computed based on variant and color |
| `--mjo-chip-padding`                  | Internal padding of the chip                   | `0 0.75em`                          |
| `--mjo-chip-gap`                      | Gap between chip elements (icon, label, close) | `0.4em`                             |
| `--mjo-chip-border-width-size-small`  | Border width for small size                    | `1px`                               |
| `--mjo-chip-border-width-size-medium` | Border width for medium size                   | `2px`                               |
| `--mjo-chip-border-width-size-large`  | Border width for large size                    | `3px`                               |
| `--mjo-chip-font-size-small-size`     | Font size for small chips                      | `0.75em`                            |
| `--mjo-chip-line-height-small-size`   | Line height for small chips                    | `0.75em`                            |
| `--mjo-chip-font-size-medium-size`    | Font size for medium chips                     | `0.9em`                             |
| `--mjo-chip-line-height-medium-size`  | Line height for medium chips                   | `1em`                               |
| `--mjo-chip-font-size-large-size`     | Font size for large chips                      | `1.1em`                             |
| `--mjo-chip-line-height-large-size`   | Line height for large chips                    | `1.2em`                             |

## CSS Parts

| Part         | Description                 | Element                       |
| ------------ | --------------------------- | ----------------------------- |
| `container`  | Main chip container element | `<div class="container">`     |
| `label`      | Text label element          | Exposed from `mjo-typography` |
| `start-icon` | Start icon element          | Exposed from `mjo-icon`       |
| `end-icon`   | End icon element            | Exposed from `mjo-icon`       |
| `close-icon` | Close button icon element   | Exposed from `mjo-icon`       |

## Accessibility

### ARIA Attributes

The component automatically provides comprehensive ARIA labels:

- **Clickable chips**: `"[Label]. Click to interact"`
- **Closable chips**: `"[Label]. Press to close"`
- **Both**: `"[Label]. Clickable chip with close button"`
- **Default**: `"Chip: [Label]"`

You can override these with the `ariaLabel` property for specific use cases.

### Keyboard Interactions

| Key                               | Action             | Requires              |
| --------------------------------- | ------------------ | --------------------- |
| `Enter` / `Space`                 | Activates the chip | `clickable` property  |
| `Escape`                          | Closes the chip    | `closable` property   |
| `Enter` / `Space` (on close icon) | Closes the chip    | Focus on close button |

### Best Practices

- Use descriptive labels that clearly communicate the chip's purpose
- Provide `ariaDescribedby` for additional context when needed
- Ensure sufficient color contrast when customizing colors
- When using chips as filters, consider grouping them with a label
- For closable chips in critical flows, provide confirmation or undo functionality

## Usage Examples

### Basic Chips

```html
<!-- Simple chip -->
<mjo-chip label="Tag"></mjo-chip>

<!-- Colored chips -->
<mjo-chip label="Success" color="success"></mjo-chip>
<mjo-chip label="Warning" color="warning"></mjo-chip>
<mjo-chip label="Error" color="error"></mjo-chip>
```

### Size Variants

```html
<mjo-chip label="Small" size="small"></mjo-chip>
<mjo-chip label="Medium" size="medium"></mjo-chip>
<mjo-chip label="Large" size="large"></mjo-chip>
```

### Visual Variants

```html
<!-- Solid (default) -->
<mjo-chip label="Solid" variant="solid" color="primary"></mjo-chip>

<!-- Bordered -->
<mjo-chip label="Bordered" variant="bordered" color="primary"></mjo-chip>

<!-- Light variant -->
<mjo-chip label="Light" variant="light" color="primary"></mjo-chip>

<!-- Flat variant -->
<mjo-chip label="Flat" variant="flat" color="primary"></mjo-chip>

<!-- Faded variant -->
<mjo-chip label="Faded" variant="faded" color="primary"></mjo-chip>

<!-- Shadow variant -->
<mjo-chip label="Shadow" variant="shadow" color="primary"></mjo-chip>

<!-- Dot variant for status -->
<mjo-chip label="Online" variant="dot" color="success"></mjo-chip>
```

### Interactive Chips

```html
<!-- Clickable chip -->
<mjo-chip label="Click me" clickable @mjo-chip:click="${(e) => console.log('Clicked:', e.detail.value)}"></mjo-chip>

<!-- Closable chip -->
<mjo-chip label="Close me" closable @mjo-chip:close="${(e) => console.log('Closed:', e.detail.value)}"></mjo-chip>

<!-- Both clickable and closable -->
<mjo-chip label="Interactive" clickable closable value="custom-value" @mjo-chip:click="${handleClick}" @mjo-chip:close="${handleClose}"></mjo-chip>
```

### Chips with Icons

```html
<!-- Start icon -->
<mjo-chip label="User" startIcon="user"></mjo-chip>

<!-- End icon -->
<mjo-chip label="Arrow" endIcon="arrow-right"></mjo-chip>

<!-- Both icons -->
<mjo-chip label="Favorite" startIcon="star" endIcon="check"></mjo-chip>
```

### Filter Chips with Dynamic Removal

```typescript
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";

@customElement("filter-chips")
class FilterChips extends LitElement {
    @state() filters = [
        { id: 1, label: "Electronics", value: "electronics" },
        { id: 2, label: "Books", value: "books" },
        { id: 3, label: "Clothing", value: "clothing" },
    ];

    handleClose(event: CustomEvent) {
        const value = event.detail.value;
        this.filters = this.filters.filter((f) => f.value !== value);
    }

    render() {
        return html`
            <div class="filter-container">
                ${this.filters.map(
                    (filter) => html`
                        <mjo-chip
                            label="${filter.label}"
                            value="${filter.value}"
                            closable
                            color="primary"
                            variant="flat"
                            @mjo-chip:close="${this.handleClose}"
                        ></mjo-chip>
                    `,
                )}
            </div>
        `;
    }
}
```

### Status Indicators with Dot Variant

```html
<mjo-chip label="Active" variant="dot" color="success"></mjo-chip>
<mjo-chip label="Pending" variant="dot" color="warning"></mjo-chip>
<mjo-chip label="Offline" variant="dot" color="default"></mjo-chip>
<mjo-chip label="Error" variant="dot" color="error"></mjo-chip>
```

### Custom Styling with CSS Variables

```html
<style>
    .custom-chip::part(container) {
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .large-gap-chip {
        --mjo-chip-gap: 0.8em;
    }

    .padded-chip {
        --mjo-chip-padding: 0.5em 1.2em;
    }

    .custom-border {
        --mjo-chip-border-width-size-medium: 3px;
    }
</style>

<mjo-chip label="Styled" class="custom-chip"></mjo-chip>
<mjo-chip label="Large Gap" class="large-gap-chip" startIcon="star" endIcon="check"></mjo-chip>
<mjo-chip label="Padded" class="padded-chip"></mjo-chip>
<mjo-chip label="Thick Border" variant="bordered" class="custom-border"></mjo-chip>
```

### Programmatic Chip Management

```typescript
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-chip";
import "mjo-litui/mjo-textfield";
import "mjo-litui/mjo-button";

@customElement("tag-manager")
class TagManager extends LitElement {
    @state() tags: string[] = ["JavaScript", "TypeScript", "Lit"];
    @state() newTag = "";

    addTag() {
        if (this.newTag.trim() && !this.tags.includes(this.newTag.trim())) {
            this.tags = [...this.tags, this.newTag.trim()];
            this.newTag = "";
        }
    }

    removeTag(event: CustomEvent) {
        this.tags = this.tags.filter((tag) => tag !== event.detail.value);
    }

    render() {
        return html`
            <div class="tag-input">
                <mjo-textfield
                    label="Add Tag"
                    .value="${this.newTag}"
                    @input="${(e: Event) => (this.newTag = (e.target as HTMLInputElement).value)}"
                    @keydown="${(e: KeyboardEvent) => e.key === "Enter" && this.addTag()}"
                ></mjo-textfield>
                <mjo-button @click="${this.addTag}">Add</mjo-button>
            </div>
            <div class="tag-list">
                ${this.tags.map(
                    (tag) => html` <mjo-chip label="${tag}" value="${tag}" closable color="primary" @mjo-chip:close="${this.removeTag}"></mjo-chip> `,
                )}
            </div>
        `;
    }

    static styles = css`
        .tag-input {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .tag-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
    `;
}
```

## Additional Notes

### Visual Feedback

When a chip is clickable, it provides visual feedback on interaction:

- Scale animation on click (scales to 0.95, then 1.02, then back to normal)
- Focus outline appears on keyboard navigation
- Hover state shows focus outline

### Auto-removal on Close

When a closable chip is closed, it automatically removes itself from the DOM. This behavior is built-in and does not require additional handling, though you should still listen to the `mjo-chip:close` event to update your application state.

### Value vs Label

The `value` property is optional and distinct from `label`:

- **label**: Visual text displayed on the chip
- **value**: Semantic value used in events (defaults to label if not provided)

This separation allows for display text that differs from the underlying data value.

### Variant Guidelines

- **solid**: Default, high emphasis, best for primary actions
- **bordered**: Medium emphasis, good for secondary choices
- **light**: Minimal styling, subtle presence
- **flat**: Light background with colored text, balanced visibility
- **faded**: Low emphasis, uniform appearance across colors
- **shadow**: Elevated appearance, draws attention
- **dot**: Status indicators, minimal space usage
