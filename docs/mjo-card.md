# mjo-card

Flexible card component with theme-aware styling, multiple contrast levels, configurable border radius, spacing options, and visual variants including modern geometric shapes.

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

- Content grouping and visual hierarchy
- Profile cards with user information
- Feature showcases with icons and descriptions
- Statistics displays with grouped metrics
- Call-to-action containers
- Dashboard widgets and panels
- Product cards in e-commerce interfaces

## Import

```ts
import "mjo-litui/mjo-card";
```

## Properties

| Property   | Type              | Default     | Required | Description                                                        |
| ---------- | ----------------- | ----------- | -------- | ------------------------------------------------------------------ |
| `contrast` | `MjoCardContrast` | `undefined` | No       | Controls background contrast level relative to the page background |
| `radius`   | `MjoCardRadius`   | `undefined` | No       | Controls border radius applied to the card container               |
| `variant`  | `MjoCardVariants` | `"default"` | No       | Controls the visual style variant of the card shape and design     |
| `space`    | `MjoCardSpace`    | `"medium"`  | No       | Controls internal padding size                                     |

### Type Definitions

```ts
type MjoCardContrast = "low" | "high" | "normal";
type MjoCardRadius = "none" | "small" | "medium" | "large";
type MjoCardSpace = "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
type MjoCardVariants = "default" | "modern" | "skew";
```

## Methods

This component does not expose public methods.

## Events

This component does not emit custom events. It's a pure presentation component.

## CSS Variables

| Variable                           | Description                    | Default                            |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| `--mjo-card-background-color`      | Default background color       | `--mjo-background-color-card`      |
| `--mjo-card-background-color-low`  | Low contrast background color  | `--mjo-background-color-card-low`  |
| `--mjo-card-background-color-high` | High contrast background color | `--mjo-background-color-card-high` |
| `--mjo-card-padding`               | Internal padding               | `--mjo-space-medium`               |
| `--mjo-card-box-shadow`            | Card elevation shadow          | `--mjo-box-shadow-1`               |
| `--mjo-card-border`                | Card border styling            | `none`                             |
| `--mjo-card-border-color`          | Border color for variants      | `transparent`                      |
| `--mjo-card-radius-small`          | Small border radius            | `--mjo-radius-small`               |
| `--mjo-card-radius-medium`         | Medium border radius           | `--mjo-radius-medium`              |
| `--mjo-card-radius-large`          | Large border radius            | `--mjo-radius-large`               |

## CSS Parts

| Part        | Description                                        | Element          |
| ----------- | -------------------------------------------------- | ---------------- |
| `container` | The main card container                            | `.container` div |
| `content`   | The internal content wrapper                       | `.content` div   |
| `border`    | The decorative border for skew and modern variants | `.border` div    |

## Accessibility

### Best Practices

- The card component is semantically neutral and doesn't impose specific accessibility requirements.
- Consider adding appropriate ARIA attributes when cards contain interactive content:
    - Use `role="article"` for content cards that represent independent, self-contained content.
    - Use `role="region"` with `aria-label` for cards that represent distinct sections of a page.
    - Add `tabindex="0"` to make cards focusable when they contain clickable content or should be keyboard-navigable.
- Ensure sufficient color contrast between card backgrounds and text content (WCAG AA minimum 4.5:1 for normal text).
- When using the `variant` property with geometric shapes (`modern`, `skew`), ensure text content remains legible and doesn't get clipped.

### Example with ARIA Attributes

```html
<mjo-card role="article" aria-label="Product feature overview">
    <h3>Feature Title</h3>
    <p>Feature description...</p>
</mjo-card>
```

## Usage Examples

### Basic Usage

```html
<mjo-card>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</mjo-card>
```

### Contrast Levels

```html
<!-- Low contrast - subtle appearance -->
<mjo-card contrast="low">
    <h4>Low Contrast</h4>
    <p>Subtle background that blends with the page.</p>
</mjo-card>

<!-- Normal contrast - default appearance -->
<mjo-card contrast="normal">
    <h4>Normal Contrast</h4>
    <p>Balanced appearance that works well in most situations.</p>
</mjo-card>

<!-- High contrast - prominent appearance -->
<mjo-card contrast="high">
    <h4>High Contrast</h4>
    <p>Prominent background that makes the card stand out.</p>
</mjo-card>
```

### Border Radius Variations

```html
<!-- No radius - sharp corners -->
<mjo-card radius="none">
    <p>Sharp, rectangular corners.</p>
</mjo-card>

<!-- Small radius -->
<mjo-card radius="small">
    <p>Slightly rounded corners.</p>
</mjo-card>

<!-- Medium radius -->
<mjo-card radius="medium">
    <p>Moderately rounded corners.</p>
</mjo-card>

<!-- Large radius -->
<mjo-card radius="large">
    <p>Prominently rounded corners.</p>
</mjo-card>
```

### Visual Variants

```html
<!-- Default variant - traditional rectangular card -->
<mjo-card variant="default">
    <h4>Default Variant</h4>
    <p>Traditional rectangular card with standard styling.</p>
</mjo-card>

<!-- Modern variant - contemporary design with cut corners -->
<mjo-card variant="modern">
    <h4>Modern Variant</h4>
    <p>Contemporary design with cut corners using clip-path.</p>
</mjo-card>

<!-- Skew variant - dynamic slanted parallelogram shape -->
<mjo-card variant="skew">
    <h4>Skew Variant</h4>
    <p>Dynamic slanted design ideal for energetic layouts.</p>
</mjo-card>
```

### Spacing Options

```html
<!-- Extra small spacing -->
<mjo-card space="xsmall">
    <p>Compact card with minimal padding.</p>
</mjo-card>

<!-- Medium spacing (default) -->
<mjo-card space="medium">
    <p>Standard card with default padding.</p>
</mjo-card>

<!-- Large spacing -->
<mjo-card space="large">
    <p>Spacious card with generous padding.</p>
</mjo-card>
```

### Combined Properties

```html
<!-- Subtle card with small spacing -->
<mjo-card contrast="low" radius="small" space="small">
    <h4>Subtle Card</h4>
    <p>Low contrast, small radius, compact spacing.</p>
</mjo-card>

<!-- Prominent modern card -->
<mjo-card contrast="high" radius="large" space="large" variant="modern">
    <h4>Prominent Card</h4>
    <p>High contrast modern card with generous spacing.</p>
</mjo-card>
```

### Profile Card Example

```html
<mjo-card contrast="high" radius="large">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;">
        <mjo-avatar name="Sarah Connor" size="large" nameColoured></mjo-avatar>
        <div>
            <h4 style="margin: 0 0 4px 0;">Sarah Connor</h4>
            <p style="margin: 0; color: var(--mjo-primary-color); font-weight: 600;">UX Designer</p>
        </div>
        <p style="margin: 0; font-size: 0.9em;">Passionate about creating intuitive user experiences.</p>
        <mjo-button size="small" variant="ghost">Connect</mjo-button>
    </div>
</mjo-card>
```

### Feature Card with Modern Variant

```html
<mjo-card contrast="normal" radius="medium" variant="modern">
    <div style="text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 16px;">🚀</div>
        <h4 style="margin: 0 0 12px 0;">Fast Performance</h4>
        <p style="margin: 0 0 20px 0;">Lightning-fast loading times and optimized performance.</p>
        <mjo-button size="small">Learn More</mjo-button>
    </div>
</mjo-card>
```

### Statistics Card

```html
<mjo-card contrast="low" variant="skew">
    <h4 style="margin: 0 0 16px 0; text-align: center;">Monthly Stats</h4>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
        <div>
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--mjo-primary-color);">1,234</div>
            <div style="font-size: 0.8rem; color: var(--mjo-foreground-color-medium);">Users</div>
        </div>
        <div>
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--mjo-primary-color);">5,678</div>
            <div style="font-size: 0.8rem; color: var(--mjo-foreground-color-medium);">Views</div>
        </div>
        <div>
            <div style="font-size: 1.5rem; font-weight: bold; color: var(--mjo-primary-color);">90%</div>
            <div style="font-size: 0.8rem; color: var(--mjo-foreground-color-medium);">Satisfaction</div>
        </div>
    </div>
</mjo-card>
```

### Customization with CSS Variables

```html
<mjo-card
    contrast="high"
    radius="large"
    style="
        --mjo-card-background-color-high: #f8f9fa;
        --mjo-card-padding: 2rem;
        --mjo-card-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --mjo-card-radius-large: 20px;
    "
>
    <h3>Custom Styled Card</h3>
    <p>This card uses custom CSS variables for unique styling.</p>
</mjo-card>
```

### Customization with CSS Parts

```html
<style>
    mjo-card::part(container) {
        border: 2px solid var(--mjo-primary-color);
    }

    mjo-card::part(content) {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    }

    mjo-card[variant="modern"]::part(border) {
        background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    }
</style>

<mjo-card variant="modern" radius="medium">
    <h4>Styled with CSS Parts</h4>
    <p>This card uses CSS parts for advanced customization.</p>
</mjo-card>
```

### ThemeMixin Customization

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoCardTheme } from "mjo-litui/types";
import "mjo-litui/mjo-card";

@customElement("example-card-themed")
export class ExampleCardThemed extends LitElement {
    private customTheme: MjoCardTheme = {
        backgroundColor: "#f8f9fa",
        backgroundColorHigh: "#e9ecef",
        padding: "2rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        radiusLarge: "20px",
    };

    render() {
        return html`
            <mjo-card contrast="high" radius="large" .theme=${this.customTheme}>
                <h3>Custom Themed Card</h3>
                <p>This card uses ThemeMixin for instance-specific styling.</p>
            </mjo-card>
        `;
    }
}
```

## Additional Notes

- **`variant` Property**: The `modern` and `skew` variants use `clip-path` for geometric shapes. These variants have fixed padding values that override the `space` property to maintain the shape integrity.
    - `modern` variant: Uses `padding: 1.5em` and creates cut corners at 2em.
    - `skew` variant: Uses `padding: 1em 2em` and creates a parallelogram shape.
- **Border Element**: The `border` part is only rendered when using `modern` or `skew` variants. It provides a decorative border layer that follows the same clip-path as the container.
- **Theme Integration**: The component extends `ThemeMixin`, allowing for instance-specific theming through the `theme` property. Theme properties are automatically converted to CSS variables with the pattern `--mjo-card-{property-name}`.
- **Spacing System**: The `space` property maps directly to global spacing tokens (`--mjo-space-*`), ensuring consistency across the design system.
- **Contrast Levels**: When `contrast` is not specified, the card uses the default `--mjo-card-background-color`. This allows for flexible theming based on the context.
