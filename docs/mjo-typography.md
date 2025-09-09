# mjo-typography

Semantic typography component that provides consistent text styling with predefined sizes, weights, and semantic HTML tags. Supports theme customization and accessibility best practices through proper semantic markup and ARIA properties.

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

## Accessibility Features Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("example-typography-accessibility")
export class ExampleTypographyAccessibility extends LitElement {
    render() {
        return html`
            <article>
                <!-- Proper heading hierarchy -->
                <mjo-typography tag="h1" size="heading1" weight="bold" aria-level="1"> Article Title </mjo-typography>

                <mjo-typography tag="h2" size="heading2" weight="medium" aria-level="2"> Section Heading </mjo-typography>

                <!-- Visual heading that's actually level 4 semantically -->
                <mjo-typography tag="h2" size="heading2" weight="medium" aria-level="4" aria-label="Technical specifications subsection">
                    Technical Specs
                </mjo-typography>

                <!-- Paragraph with additional description -->
                <mjo-typography tag="p" size="base" weight="regular" aria-describedby="usage-note">
                    This component provides semantic structure for screen readers.
                </mjo-typography>

                <mjo-typography tag="p" size="body2" weight="light" id="usage-note">
                    Note: Always use proper heading hierarchy for accessibility.
                </mjo-typography>

                <!-- Decorative text that should be hidden from screen readers -->
                <mjo-typography tag="span" size="body3" weight="light" aria-hidden="true"> ★ ★ ★ Decorative stars ★ ★ ★ </mjo-typography>
            </article>
        `;
    }
}
```

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
                <mjo-typography tag="p" size="base" weight="regular"> This typography uses custom font sizes and line heights. </mjo-typography>
            </mjo-theme>
        `;
    }
}
```

## Attributes / Properties

| Name               | Type                                                                                | Default     | Description                                                             |
| ------------------ | ----------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `tag`              | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'p' \| 'span' \| 'none'`                   | `'p'`       | HTML tag to render for semantic structure                               |
| `size`             | `'heading1' \| 'heading2' \| 'heading3' \| 'base' \| 'body1' \| 'body2' \| 'body3'` | `'base'`    | Typography size variant                                                 |
| `weight`           | `'light' \| 'regular' \| 'medium' \| 'bold'`                                        | `'regular'` | Font weight variant                                                     |
| `aria-label`       | `string \| null`                                                                    | `null`      | Custom accessibility label for screen readers                           |
| `aria-labelledby`  | `string \| undefined`                                                               | `undefined` | ID of element that labels this typography element                       |
| `aria-describedby` | `string \| undefined`                                                               | `undefined` | ID of element that describes this typography element                    |
| `aria-level`       | `string \| null`                                                                    | `null`      | Semantic heading level (1-6) for accessibility when tag != visual level |
| `aria-hidden`      | `string`                                                                            | `"false"`   | Hide element from screen readers when decorative                        |

### Usage Notes for ARIA Properties

-   **aria-label**: Use when the content needs additional context for screen readers
-   **aria-level**: Use when visual heading level differs from semantic level (e.g., `tag="h2"` but semantically level 4)
-   **aria-hidden="true"**: Use for purely decorative text that doesn't add meaning
-   **aria-describedby**: Reference additional descriptive content by ID

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

Configure typography through the `TypographyTheme` interface in `mjo-theme`:

```ts
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

const customTheme: Partial<MjoThemeConfig> = {
    light: {
        components: {
            mjoTypography: {
                h1FontSize: "2.5rem",
                h1LineHeight: "1.2",
                baseFontSize: "1.125rem",
                baseLineHeight: "1.6",
                fontWeightBold: "700",
            },
        },
    },
};
```

## CSS Parts

| Part         | Component        | Description                                                |
| ------------ | ---------------- | ---------------------------------------------------------- |
| `typography` | `mjo-typography` | The rendered HTML element (h1, h2, h3, h4, h5, p, or span) |

### Parts vs CSS Variables

**CSS Variables** are ideal for theming and design tokens:

```css
mjo-typography {
    --mjo-typography-h1-font-size: 2.5rem;
    --mjo-typography-font-weight-bold: 700;
    --mjo-typography-base-line-height: 1.6;
}
```

**CSS Parts** provide structural control and advanced styling:

```css
/* Maximum flexibility with parts */
mjo-typography::part(typography) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

Both approaches work together harmoniously - use variables for consistent theming and parts for advanced customization.

## Accessibility

The `mjo-typography` component provides comprehensive accessibility features:

### **Semantic HTML Structure**

-   **Proper heading hierarchy**: Uses correct HTML tags (h1-h5) for screen reader navigation
-   **Document outline**: Maintains logical content structure for assistive technologies
-   **SEO benefits**: Semantic markup improves search engine understanding

### **ARIA Enhancement**

-   **aria-level**: Override semantic heading level when visual != logical hierarchy
-   **aria-label**: Provide additional context when content alone isn't descriptive
-   **aria-describedby**: Reference additional explanatory content
-   **aria-hidden**: Hide decorative text from screen readers

### **Accessibility Guidelines**

1. **Maintain proper heading hierarchy**: h1 → h2 → h3 (don't skip levels)
2. **Use aria-level judiciously**: When visual design requires different heading tag than semantic level
3. **Label descriptively**: Use aria-label for complex or abbreviated content
4. **Hide decorative content**: Set aria-hidden="true" for visual-only elements
5. **Reference related content**: Use aria-describedby to link to explanatory text

### **Example: Proper Heading Hierarchy**

```ts
// ✅ Correct: Logical progression
<mjo-typography tag="h1" size="heading1">Main Title</mjo-typography>
<mjo-typography tag="h2" size="heading2">Section</mjo-typography>
<mjo-typography tag="h3" size="heading3">Subsection</mjo-typography>

// ❌ Incorrect: Skips h2
<mjo-typography tag="h1" size="heading1">Main Title</mjo-typography>
<mjo-typography tag="h3" size="heading3">Subsection</mjo-typography>

// ✅ Correct: Use aria-level when visual differs from semantic
<mjo-typography tag="h1" size="heading1">Main Title</mjo-typography>
<mjo-typography tag="h2" size="heading2">Section</mjo-typography>
<mjo-typography tag="h1" size="heading1" aria-level="3">Visual H1, Semantic H3</mjo-typography>
```

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
