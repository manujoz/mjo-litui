# mjo-card

Simple, theme-aware card component providing a container with background, padding, shadow, and border radius customization through contrast levels and size variants.

## HTML Usage

```html
<mjo-card>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</mjo-card>

<mjo-card contrast="high" radius="large" variant="modern">
    <p>High contrast modern card with large border radius.</p>
</mjo-card>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-basic")
export class ExampleCardBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-card>
                    <h3 style="margin: 0 0 1rem 0;">Basic Card</h3>
                    <p style="margin: 0;">This is a basic card with default styling.</p>
                </mjo-card>

                <mjo-card space="large">
                    <h3 style="margin: 0 0 1rem 0;">Card with Large Spacing</h3>
                    <p style="margin: 0;">This card uses large internal spacing.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Contrast Levels Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-contrast")
export class ExampleCardContrast extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-card contrast="low">
                    <h4 style="margin: 0 0 0.5rem 0;">Low Contrast Card</h4>
                    <p style="margin: 0;">Subtle appearance with low contrast.</p>
                </mjo-card>

                <mjo-card>
                    <h4 style="margin: 0 0 0.5rem 0;">Default Card</h4>
                    <p style="margin: 0;">Normal contrast for balanced appearance.</p>
                </mjo-card>

                <mjo-card contrast="high">
                    <h4 style="margin: 0 0 0.5rem 0;">High Contrast Card</h4>
                    <p style="margin: 0;">High contrast for prominent display.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Border Radius Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-radius")
export class ExampleCardRadius extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <mjo-card radius="none">
                    <h4 style="margin: 0 0 0.5rem 0;">No Radius</h4>
                    <p style="margin: 0;">Sharp corners.</p>
                </mjo-card>

                <mjo-card radius="small">
                    <h4 style="margin: 0 0 0.5rem 0;">Small Radius</h4>
                    <p style="margin: 0;">Slightly rounded corners.</p>
                </mjo-card>

                <mjo-card radius="medium">
                    <h4 style="margin: 0 0 0.5rem 0;">Medium Radius</h4>
                    <p style="margin: 0;">Moderately rounded corners.</p>
                </mjo-card>

                <mjo-card radius="large">
                    <h4 style="margin: 0 0 0.5rem 0;">Large Radius</h4>
                    <p style="margin: 0;">Prominently rounded corners.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Variant Styles Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-variants")
export class ExampleCardVariants extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                <mjo-card variant="default">
                    <h4 style="margin: 0 0 0.5rem 0;">Default Variant</h4>
                    <p style="margin: 0;">Traditional rectangular card.</p>
                </mjo-card>

                <mjo-card variant="modern">
                    <h4 style="margin: 0 0 0.5rem 0;">Modern Variant</h4>
                    <p style="margin: 0;">Contemporary design with cut corners.</p>
                </mjo-card>

                <mjo-card variant="skew">
                    <h4 style="margin: 0 0 0.5rem 0;">Skew Variant</h4>
                    <p style="margin: 0;">Dynamic slanted design.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Spacing Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-spacing")
export class ExampleCardSpacing extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-card space="small">
                    <h4 style="margin: 0 0 0.5rem 0;">Small Spacing</h4>
                    <p style="margin: 0;">Compact card with minimal padding.</p>
                </mjo-card>

                <mjo-card space="medium">
                    <h4 style="margin: 0 0 0.5rem 0;">Medium Spacing (Default)</h4>
                    <p style="margin: 0;">Standard card with default padding.</p>
                </mjo-card>

                <mjo-card space="large">
                    <h4 style="margin: 0 0 0.5rem 0;">Large Spacing</h4>
                    <p style="margin: 0;">Spacious card with generous padding.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Combined Properties Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-combined")
export class ExampleCardCombined extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                <mjo-card contrast="low" radius="small" space="small">
                    <h4 style="margin: 0 0 0.5rem 0;">Subtle Card</h4>
                    <p style="margin: 0;">Low contrast, small radius, compact spacing.</p>
                </mjo-card>

                <mjo-card contrast="high" radius="large" space="large" variant="modern">
                    <h4 style="margin: 0 0 0.5rem 0;">Prominent Card</h4>
                    <p style="margin: 0;">High contrast modern card with generous spacing.</p>
                </mjo-card>

                <mjo-card variant="skew" radius="medium" space="medium">
                    <h4 style="margin: 0 0 0.5rem 0;">Dynamic Card</h4>
                    <p style="margin: 0;">Skewed variant with balanced properties.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name       | Type                                                                               | Default     | Description                                                        |
| ---------- | ---------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `contrast` | `"low" \| "high" \| "normal" \| undefined`                                         | `undefined` | Controls background contrast level relative to the page background |
| `radius`   | `"none" \| "small" \| "medium" \| "large" \| undefined`                            | `undefined` | Controls border radius applied to the card container               |
| `variant`  | `"default" \| "modern" \| "skew"`                                                  | `"default"` | Controls the visual style variant of the card shape and design     |
| `space`    | `"xxsmall" \| "xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| "xxlarge"` | `"medium"`  | Controls internal padding size                                     |

## Slots

| Slot      | Description                                     |
| --------- | ----------------------------------------------- |
| (default) | All content displayed inside the card container |

## Events

This component doesn't emit any custom events. It's a pure presentation component.

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Background Colors

| Variable                           | Fallback                                     | Used For                 |
| ---------------------------------- | -------------------------------------------- | ------------------------ |
| `--mjo-card-background-color`      | `--mjo-background-color-card` → `white`      | Default background color |
| `--mjo-card-background-color-low`  | `--mjo-background-color-card-low` → `white`  | Low contrast background  |
| `--mjo-card-background-color-high` | `--mjo-background-color-card-high` → `white` | High contrast background |

### Structure Variables

| Variable                  | Fallback                         | Used For                  |
| ------------------------- | -------------------------------- | ------------------------- |
| `--mjo-card-padding`      | `--mjo-space-medium`             | Internal padding          |
| `--mjo-card-box-shadow`   | `--mjo-box-shadow-1` → `inherit` | Card elevation shadow     |
| `--mjo-card-border`       | `none`                           | Card border styling       |
| `--mjo-card-border-color` | `transparent`                    | Border color for variants |

### Border Radius Variables

| Variable                   | Fallback                      | Used For             |
| -------------------------- | ----------------------------- | -------------------- |
| `--mjo-card-radius-small`  | `--mjo-radius-small` → `4px`  | Small border radius  |
| `--mjo-card-radius-medium` | `--mjo-radius-medium` → `8px` | Medium border radius |
| `--mjo-card-radius-large`  | `--mjo-radius-large` → `12px` | Large border radius  |

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-card-{property-name}`.

### MjoCardTheme Interface

```ts
interface MjoCardTheme {
    border?: string;
    borderColor?: string;
    backgroundColor?: string;
    backgroundColorLow?: string;
    backgroundColorHigh?: string;
    radiusSmall?: string;
    radiusMedium?: string;
    radiusLarge?: string;
    padding?: string;
    boxShadow?: string;
}
```

### ThemeMixin Example

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
                <h3 style="margin: 0 0 1rem 0;">Custom Themed Card</h3>
                <p style="margin: 0;">This card uses a custom theme with modified colors, padding, and shadow.</p>
            </mjo-card>
        `;
    }
}
```

## CSS Parts

| Part        | Description                    |
| ----------- | ------------------------------ |
| `container` | The main card container        |
| `content`   | The internal content container |

## Accessibility Notes

-   The card component is semantically neutral and doesn't impose specific accessibility requirements
-   Consider adding appropriate ARIA attributes when cards contain interactive content:
    -   `role="article"` for content cards
    -   `role="region"` with `aria-label` for distinct sections
    -   `tabindex="0"` for focusable cards
-   Ensure sufficient color contrast between card backgrounds and text content

```html
<!-- Example with enhanced accessibility -->
<mjo-card role="article" tabindex="0" aria-label="Product feature overview">
    <h3>Feature Title</h3>
    <p>Feature description...</p>
</mjo-card>
```

## Summary

`<mjo-card>` provides a flexible, theme-aware container component with built-in support for contrast levels, border radius variations, spacing options, and visual variants. The component integrates seamlessly with the global design system through CSS variables and supports extensive customization via ThemeMixin. Use cards to group related content, create visual hierarchy through contrast levels, and maintain consistent spacing and shadows across your application.
