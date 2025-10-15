# mjo-typography

Semantic typography component with configurable sizes, weights, and semantic HTML tags.

## Table of Contents

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [CSS Parts](#css-parts)
- [CSS Variables](#css-variables)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Display headings with semantic HTML tags (h1-h5) and consistent styling
- Apply consistent text styling across an application
- Control typography color, size, and weight systematically
- Maintain accessibility through proper semantic markup
- Create flexible text elements with customizable appearance through CSS variables

## Import

```typescript
import "mjo-litui/mjo-typography";
```

## Properties

| Property          | Type                  | Description                                                                                                        | Default     | Required |
| ----------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- | -------- |
| `tag`             | `MjoTypographyTag`    | Semantic HTML tag to render. Options: `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, `"p"`, `"span"`, `"none"`            | `"p"`       | No       |
| `size`            | `MjoTypographySize`   | Font size preset. Options: `"heading1"`, `"heading2"`, `"heading3"`, `"base"`, `"body1"`, `"body2"`, `"body3"`     | `"base"`    | No       |
| `weight`          | `MjoTypographyWeight` | Font weight preset. Options: `"light"`, `"regular"`, `"medium"`, `"bold"`                                          | `"regular"` | No       |
| `color`           | `MjoTypographyColor`  | Text color preset. Options: `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"error"`, `"info"`, `"inherit"` | `"inherit"` | No       |
| `ariaLabelledby`  | `string \| undefined` | Associates the element with labelling element(s) via ID reference(s)                                               | `undefined` | No       |
| `ariaDescribedby` | `string \| undefined` | Associates the element with describing element(s) via ID reference(s)                                              | `undefined` | No       |
| `ariaLevel`       | `string \| null`      | Defines the hierarchical level of a heading within a document structure (1-6)                                      | `null`      | No       |

## CSS Parts

| Part         | Description               | Element                                      |
| ------------ | ------------------------- | -------------------------------------------- |
| `typography` | The rendered HTML element | `h1`, `h2`, `h3`, `h4`, `h5`, `p`, or `span` |

## CSS Variables

| Variable                               | Description                          | Default           |
| -------------------------------------- | ------------------------------------ | ----------------- |
| `--mjo-typography-h1-font-size`        | Font size for heading1 size preset   | `2em`             |
| `--mjo-typography-h1-line-height`      | Line height for heading1 size preset | `calc(1em + 6px)` |
| `--mjo-typography-h2-font-size`        | Font size for heading2 size preset   | `1.5em`           |
| `--mjo-typography-h2-line-height`      | Line height for heading2 size preset | `calc(1em + 6px)` |
| `--mjo-typography-h3-font-size`        | Font size for heading3 size preset   | `1.25em`          |
| `--mjo-typography-h3-line-height`      | Line height for heading3 size preset | `calc(1em + 6px)` |
| `--mjo-typography-base-font-size`      | Font size for base size preset       | `1em`             |
| `--mjo-typography-base-line-height`    | Line height for base size preset     | `calc(1em + 6px)` |
| `--mjo-typography-body1-font-size`     | Font size for body1 size preset      | `0.875em`         |
| `--mjo-typography-body1-line-height`   | Line height for body1 size preset    | `calc(1em + 6px)` |
| `--mjo-typography-body2-font-size`     | Font size for body2 size preset      | `0.75em`          |
| `--mjo-typography-body2-line-height`   | Line height for body2 size preset    | `calc(1em + 6px)` |
| `--mjo-typography-body3-font-size`     | Font size for body3 size preset      | `0.625em`         |
| `--mjo-typography-body3-line-height`   | Line height for body3 size preset    | `calc(1em + 6px)` |
| `--mjo-typography-font-weight-light`   | Font weight for light preset         | `300`             |
| `--mjo-typography-font-weight-regular` | Font weight for regular preset       | `400`             |
| `--mjo-typography-font-weight-medium`  | Font weight for medium preset        | `500`             |
| `--mjo-typography-font-weight-bold`    | Font weight for bold preset          | `600`             |
| `--mjo-primary-color`                  | Color for primary preset             | `currentColor`    |
| `--mjo-secondary-color`                | Color for secondary preset           | `currentColor`    |
| `--mjo-color-success`                  | Color for success preset             | `currentColor`    |
| `--mjo-color-warning`                  | Color for warning preset             | `currentColor`    |
| `--mjo-color-error`                    | Color for error preset               | `currentColor`    |
| `--mjo-color-info`                     | Color for info preset                | `currentColor`    |

## Accessibility

### Best Practices

- Use semantic HTML tags (`h1`, `h2`, `h3`, etc.) to maintain proper document structure
- Ensure heading hierarchy is logical and sequential (don't skip levels)
- Use `aria-level` attribute when visual heading style doesn't match semantic level
- Associate descriptive content with `aria-describedby` and `aria-labelledby` when needed
- Avoid using color alone to convey information

### ARIA Attributes

- `aria-labelledby`: References IDs of elements that label this text element
- `aria-describedby`: References IDs of elements that describe this text element
- `aria-level`: Explicitly sets heading level for assistive technologies (1-6)

### Display Behavior

- Elements with `tag="span"` or `tag="none"` render inline
- Other tags render as block elements
- The `tag="none"` option renders content directly in the slot without a wrapper element

## Usage Examples

### Semantic Headings with Custom Styling

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("my-page-header")
export class MyPageHeader extends LitElement {
    render() {
        return html`
            <!-- Visual h1 with h2 semantic level for proper hierarchy -->
            <mjo-typography tag="h2" size="heading1" weight="bold" color="primary"> Page Title </mjo-typography>

            <!-- Subtitle with custom aria-level -->
            <mjo-typography tag="h3" size="heading3" weight="regular" color="secondary" aria-level="3"> Subtitle for context </mjo-typography>
        `;
    }
}
```

### Inline Text with Color Presets

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("status-message")
export class StatusMessage extends LitElement {
    @property({ type: String }) status: "success" | "error" | "warning" = "success";

    render() {
        return html` <mjo-typography tag="span" size="body1" weight="medium" color=${this.status}> ${this.getMessage()} </mjo-typography> `;
    }

    private getMessage() {
        switch (this.status) {
            case "success":
                return "Operation completed successfully";
            case "error":
                return "An error occurred";
            case "warning":
                return "Warning: Please review";
        }
    }
}
```

### Custom Styling with CSS Parts and Variables

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("custom-heading")
export class CustomHeading extends LitElement {
    static styles = css`
        mjo-typography {
            --mjo-typography-h1-font-size: 3rem;
            --mjo-typography-h1-line-height: 1.2;
            --mjo-typography-font-weight-bold: 700;
            --mjo-primary-color: #ff6b6b;
        }

        mjo-typography::part(typography) {
            text-transform: uppercase;
            letter-spacing: 0.05em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
    `;

    render() {
        return html` <mjo-typography tag="h1" size="heading1" weight="bold" color="primary"> Custom Styled Heading </mjo-typography> `;
    }
}
```

### Accessible Text with ARIA References

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("article-section")
export class ArticleSection extends LitElement {
    render() {
        return html`
            <div id="intro-label">Article Introduction</div>
            <div id="intro-desc">This section provides an overview</div>

            <mjo-typography tag="h2" size="heading2" aria-labelledby="intro-label" aria-describedby="intro-desc"> Introduction </mjo-typography>

            <mjo-typography tag="p" size="base"> Content of the article... </mjo-typography>
        `;
    }
}
```

### Responsive Typography System

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-typography";

@customElement("responsive-text")
export class ResponsiveText extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        /* Base typography sizes */
        mjo-typography {
            --mjo-typography-h1-font-size: 2rem;
            --mjo-typography-base-font-size: 1rem;
        }

        /* Larger screens */
        @media (min-width: 768px) {
            mjo-typography {
                --mjo-typography-h1-font-size: 2.5rem;
                --mjo-typography-base-font-size: 1.125rem;
            }
        }

        /* Extra large screens */
        @media (min-width: 1200px) {
            mjo-typography {
                --mjo-typography-h1-font-size: 3rem;
                --mjo-typography-base-font-size: 1.25rem;
            }
        }
    `;

    render() {
        return html`
            <mjo-typography tag="h1" size="heading1" weight="bold"> Responsive Heading </mjo-typography>
            <mjo-typography tag="p" size="base"> This text scales automatically based on screen size. </mjo-typography>
        `;
    }
}
```

## Additional Notes

### Tag and Size Independence

The `tag` property controls the semantic HTML element, while `size` controls the visual appearance. This separation allows for flexible combinations, such as using an `h3` tag with `heading1` size when the visual hierarchy differs from the semantic structure.

### The "none" Tag Option

When `tag="none"` is used, the component renders the slot content directly without wrapping it in an HTML element. This is useful when you need typography styling without semantic markup, though this should be used sparingly to maintain accessibility.

### Theme Integration

The component extends `ThemeMixin`, enabling automatic theme application through the `applyThemeSsr()` method. This ensures consistent theming across server-side and client-side rendering.

### Color Presets

Color presets (`primary`, `secondary`, `success`, `warning`, `error`, `info`) reference theme-level CSS variables. If these variables are not defined in your theme, the component falls back to `currentColor`, inheriting the color from its parent element.

### Font Weight Mapping

Weight presets map to standard font-weight values:

- `light`: 300
- `regular`: 400
- `medium`: 500
- `bold`: 600

These can be customized via CSS variables to match your specific font family's available weights.
