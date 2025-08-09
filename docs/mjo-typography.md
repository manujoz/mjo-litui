# mjo-typography

Semantic typography component that provides consistent text styling with predefined sizes, weights, and semantic HTML tags. Supports theme customization and accessibility best practices through proper semantic markup.

## HTML Usage

```html
<mjo-typography tag="h1" size="heading1" weight="bold">Main Heading</mjo-typography>
<mjo-typography tag="p" size="body1" weight="regular">Body text content</mjo-typography>
<mjo-typography tag="span" size="body2" weight="medium">Small text</mjo-typography>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("example-typography-basic")
export class ExampleTypographyBasic extends LitElement {
    render() {
        return html`
            <mjo-typography tag="h1" size="heading1" weight="bold"> Main Heading </mjo-typography>
            <mjo-typography tag="p" size="base" weight="regular"> This is a paragraph with base size and regular weight. </mjo-typography>
            <mjo-typography tag="span" size="body2" weight="medium"> Small inline text </mjo-typography>
        `;
    }
}
```

## Typography Sizes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("example-typography-sizes")
export class ExampleTypographySizes extends LitElement {
    render() {
        return html`
            <div>
                <mjo-typography tag="h1" size="heading1" weight="bold"> Heading 1 - heading1 size </mjo-typography>
                <mjo-typography tag="h2" size="heading2" weight="bold"> Heading 2 - heading2 size </mjo-typography>
                <mjo-typography tag="h3" size="heading3" weight="medium"> Heading 3 - heading3 size </mjo-typography>
                <mjo-typography tag="p" size="base" weight="regular"> Paragraph - base size (default) </mjo-typography>
                <mjo-typography tag="p" size="body1" weight="regular"> Paragraph - body1 size </mjo-typography>
                <mjo-typography tag="p" size="body2" weight="regular"> Paragraph - body2 size </mjo-typography>
                <mjo-typography tag="p" size="body3" weight="regular"> Paragraph - body3 size (smallest) </mjo-typography>
            </div>
        `;
    }
}
```

## Font Weights Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("example-typography-weights")
export class ExampleTypographyWeights extends LitElement {
    render() {
        return html`
            <div>
                <mjo-typography tag="p" size="base" weight="light"> Light weight text (300) </mjo-typography>
                <mjo-typography tag="p" size="base" weight="regular"> Regular weight text (400) </mjo-typography>
                <mjo-typography tag="p" size="base" weight="medium"> Medium weight text (500) </mjo-typography>
                <mjo-typography tag="p" size="base" weight="bold"> Bold weight text (600) </mjo-typography>
            </div>
        `;
    }
}
```

## Semantic Tags Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("example-typography-tags")
export class ExampleTypographyTags extends LitElement {
    render() {
        return html`
            <article>
                <mjo-typography tag="h1" size="heading1" weight="bold"> Article Title </mjo-typography>

                <mjo-typography tag="h2" size="heading2" weight="medium"> Section Heading </mjo-typography>

                <mjo-typography tag="p" size="base" weight="regular">
                    This is a paragraph with semantic p tag. It provides proper structure for screen readers and SEO.
                </mjo-typography>

                <mjo-typography tag="h3" size="heading3" weight="medium"> Subsection </mjo-typography>

                <mjo-typography tag="p" size="body1" weight="regular">
                    Another paragraph with smaller body1 size. You can also use
                    <mjo-typography tag="span" size="body2" weight="bold"> inline span elements </mjo-typography>
                    for emphasis within text.
                </mjo-typography>
            </article>
        `;
    }
}
```

## Inline Typography Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("example-typography-inline")
export class ExampleTypographyInline extends LitElement {
    render() {
        return html`
            <mjo-typography tag="p" size="base" weight="regular">
                This paragraph contains
                <mjo-typography tag="span" size="base" weight="bold">bold text</mjo-typography>,
                <mjo-typography tag="span" size="body2" weight="medium">smaller text</mjo-typography>, and
                <mjo-typography tag="span" size="base" weight="light">light text</mjo-typography>
                all inline.
            </mjo-typography>

            <mjo-typography tag="none" size="body1" weight="regular">
                Using tag="none" creates unstyled content that inherits typography styles without semantic markup.
            </mjo-typography>
        `;
    }
}
```

## Custom Theme Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";
import "mjo-litui/mjo-theme";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const typographyTheme: Partial<MjoThemeConfig> = {
    light: {
        components: {
            mjoTypography: {
                h1FontSize: "3rem",
                h1LineHeight: "1.2",
                h2FontSize: "2.25rem",
                h2LineHeight: "1.3",
                h3FontSize: "1.875rem",
                h3LineHeight: "1.4",
                baseFontSize: "1.125rem",
                baseLineHeight: "1.6",
                body1FontSize: "1rem",
                body1LineHeight: "1.5",
                body2FontSize: "0.875rem",
                body2LineHeight: "1.4",
                body3FontSize: "0.75rem",
                body3LineHeight: "1.3",
                fontWeightLight: "300",
                fontWeightRegular: "400",
                fontWeightMedium: "500",
                fontWeightBold: "700",
            },
        },
    },
};

@customElement("example-typography-theme")
export class ExampleTypographyTheme extends LitElement {
    render() {
        return html`
            <mjo-theme scope="local" .config=${typographyTheme}>
                <mjo-typography tag="h1" size="heading1" weight="bold"> Custom Themed Heading </mjo-typography>
                <mjo-typography tag="p" size="base" weight="regular">
                    This typography uses custom font sizes and line heights defined in the theme configuration.
                </mjo-typography>
                <mjo-typography tag="p" size="body1" weight="medium"> Medium weight body text with custom styling. </mjo-typography>
            </mjo-theme>
        `;
    }
}
```

## Layout Combinations Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";
import "mjo-litui/mjo-card";

@customElement("example-typography-layout")
export class ExampleTypographyLayout extends LitElement {
    render() {
        return html`
            <mjo-card>
                <mjo-typography tag="h2" size="heading2" weight="bold"> Typography in Cards </mjo-typography>

                <mjo-typography tag="p" size="body1" weight="regular">
                    Typography components work seamlessly with other mjo-litui components to create consistent layouts and hierarchies.
                </mjo-typography>

                <div class="stats">
                    <div class="stat-item">
                        <mjo-typography tag="span" size="heading3" weight="bold"> 142 </mjo-typography>
                        <mjo-typography tag="span" size="body2" weight="medium"> Users </mjo-typography>
                    </div>

                    <div class="stat-item">
                        <mjo-typography tag="span" size="heading3" weight="bold"> 2.4k </mjo-typography>
                        <mjo-typography tag="span" size="body2" weight="medium"> Views </mjo-typography>
                    </div>
                </div>
            </mjo-card>
        `;
    }

    static styles = css`
        .stats {
            display: flex;
            gap: 2rem;
            margin-top: 1rem;
        }

        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
        }
    `;
}
```

## Attributes / Properties

| Name     | Type                                                                                | Default     | Description                               |
| -------- | ----------------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `tag`    | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'p' \| 'span' \| 'none'`                   | `'p'`       | HTML tag to render for semantic structure |
| `size`   | `'heading1' \| 'heading2' \| 'heading3' \| 'base' \| 'body1' \| 'body2' \| 'body3'` | `'base'`    | Typography size variant                   |
| `weight` | `'light' \| 'regular' \| 'medium' \| 'bold'`                                        | `'regular'` | Font weight variant                       |

## Events

This component does not emit any custom events.

## Slots

| Name      | Description                                     |
| --------- | ----------------------------------------------- |
| `default` | Text content to be styled with typography rules |

## CSS Custom Properties

| Variable                               | Default           | Description                     |
| -------------------------------------- | ----------------- | ------------------------------- |
| `--mjo-typography-h1-font-size`        | `2em`             | Font size for heading1 size     |
| `--mjo-typography-h1-line-height`      | `calc(1em + 6px)` | Line height for heading1 size   |
| `--mjo-typography-h2-font-size`        | `1.5em`           | Font size for heading2 size     |
| `--mjo-typography-h2-line-height`      | `calc(1em + 6px)` | Line height for heading2 size   |
| `--mjo-typography-h3-font-size`        | `1.25em`          | Font size for heading3 size     |
| `--mjo-typography-h3-line-height`      | `calc(1em + 6px)` | Line height for heading3 size   |
| `--mjo-typography-base-font-size`      | `1em`             | Font size for base size         |
| `--mjo-typography-base-line-height`    | `calc(1em + 6px)` | Line height for base size       |
| `--mjo-typography-body1-font-size`     | `0.875em`         | Font size for body1 size        |
| `--mjo-typography-body1-line-height`   | `calc(1em + 6px)` | Line height for body1 size      |
| `--mjo-typography-body2-font-size`     | `0.75em`          | Font size for body2 size        |
| `--mjo-typography-body2-line-height`   | `calc(1em + 6px)` | Line height for body2 size      |
| `--mjo-typography-body3-font-size`     | `0.625em`         | Font size for body3 size        |
| `--mjo-typography-body3-line-height`   | `calc(1em + 6px)` | Line height for body3 size      |
| `--mjo-typography-font-weight-light`   | `300`             | Font weight for light variant   |
| `--mjo-typography-font-weight-regular` | `400`             | Font weight for regular variant |
| `--mjo-typography-font-weight-medium`  | `500`             | Font weight for medium variant  |
| `--mjo-typography-font-weight-bold`    | `600`             | Font weight for bold variant    |

## Theme Configuration

The `mjo-typography` component can be themed using the `TypographyTheme` interface through the `mjo-theme` component:

```ts
interface TypographyTheme {
    h1FontSize?: string;
    h1LineHeight?: string;
    h2FontSize?: string;
    h2LineHeight?: string;
    h3FontSize?: string;
    h3LineHeight?: string;
    baseFontSize?: string;
    baseLineHeight?: string;
    body1FontSize?: string;
    body1LineHeight?: string;
    body2FontSize?: string;
    body2LineHeight?: string;
    body3FontSize?: string;
    body3LineHeight?: string;
    fontWeightLight?: string;
    fontWeightRegular?: string;
    fontWeightMedium?: string;
    fontWeightBold?: string;
}
```

### Example Theme Configuration

```ts
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const customTypographyTheme: Partial<MjoThemeConfig> = {
    light: {
        components: {
            mjoTypography: {
                // Custom heading sizes
                h1FontSize: "2.5rem",
                h1LineHeight: "1.2",
                h2FontSize: "2rem",
                h2LineHeight: "1.3",
                h3FontSize: "1.5rem",
                h3LineHeight: "1.4",

                // Custom body sizes
                baseFontSize: "1rem",
                baseLineHeight: "1.6",
                body1FontSize: "0.875rem",
                body1LineHeight: "1.5",
                body2FontSize: "0.75rem",
                body2LineHeight: "1.4",
                body3FontSize: "0.625rem",
                body3LineHeight: "1.3",

                // Custom font weights
                fontWeightLight: "300",
                fontWeightRegular: "400",
                fontWeightMedium: "500",
                fontWeightBold: "700",
            },
        },
    },
    dark: {
        components: {
            mjoTypography: {
                // Dark mode specific adjustments if needed
                fontWeightLight: "200",
                fontWeightRegular: "300",
            },
        },
    },
};
```

## Accessibility

The `mjo-typography` component promotes accessibility best practices:

-   **Semantic HTML**: Uses proper heading hierarchy (h1-h5) and paragraph tags
-   **Screen Reader Support**: Semantic tags provide proper document structure
-   **Keyboard Navigation**: Maintains natural tab order through semantic markup
-   **SEO Benefits**: Proper heading structure improves search engine optimization

### Accessibility Guidelines

1. **Use proper heading hierarchy**: Start with h1 and progress sequentially (h1 → h2 → h3)
2. **Don't skip heading levels**: Avoid jumping from h1 directly to h3
3. **Use semantic tags appropriately**:
    - `tag="h1"` for page titles
    - `tag="h2"` for major sections
    - `tag="h3"` for subsections
    - `tag="p"` for body content
    - `tag="span"` for inline styling
    - `tag="none"` only when semantic markup would be redundant

## Size Reference

| Size       | Default Font Size | Use Case                   |
| ---------- | ----------------- | -------------------------- |
| `heading1` | 2em (32px)        | Page titles, main headings |
| `heading2` | 1.5em (24px)      | Section headings           |
| `heading3` | 1.25em (20px)     | Subsection headings        |
| `base`     | 1em (16px)        | Body text, default size    |
| `body1`    | 0.875em (14px)    | Secondary body text        |
| `body2`    | 0.75em (12px)     | Small text, captions       |
| `body3`    | 0.625em (10px)    | Fine print, labels         |

## Weight Reference

| Weight    | Default Value | CSS Equivalent   |
| --------- | ------------- | ---------------- |
| `light`   | 300           | font-weight: 300 |
| `regular` | 400           | font-weight: 400 |
| `medium`  | 500           | font-weight: 500 |
| `bold`    | 600           | font-weight: 600 |

## Best Practices

1. **Semantic Structure**: Always use appropriate HTML tags for document structure
2. **Consistent Hierarchy**: Maintain logical heading progression (h1 → h2 → h3)
3. **Readable Line Heights**: The default `calc(1em + 6px)` provides good readability
4. **Performance**: Use `tag="none"` sparingly as it bypasses semantic benefits
5. **Theme Consistency**: Define typography scales in your theme configuration for consistent sizing
6. **Responsive Design**: Consider different font sizes for mobile and desktop in your theme

## Related Components

-   [mjo-theme](./mjo-theme.md) - For typography theme configuration
-   [mjo-card](./mjo-card.md) - Often used together for content layout
-   [mjo-button](./mjo-button.md) - For interactive text elements

## Technical Notes

### Display Behavior

-   Block-level tags (`h1-h5`, `p`) have `margin: 0.5em 0` by default
-   Inline tags (`span`, `tag="none"`) have `margin: 0` and `display: inline`
-   The `tag="none"` option renders content without wrapper elements while applying typography classes

### CSS Architecture

The component uses a class-based approach where both `size` and `weight` are applied as CSS classes to the rendered element. This allows for flexible combinations and easy theming through CSS custom properties.

### Browser Support

The component uses modern CSS features like `calc()` and CSS custom properties. It supports all modern browsers and gracefully degrades in older browsers by using the fallback values in the CSS custom property declarations.
