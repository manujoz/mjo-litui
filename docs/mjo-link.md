# mjo-link

Accessible link component with multiple variants, color options, and comprehensive keyboard navigation support.

## Table of Contents

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

- Standard navigation links with color variants
- Button-styled links for call-to-action navigation
- Cover links that expand clickable areas to parent containers
- Links with custom typography sizes and weights
- Links with preventDefault for SPAs and custom navigation handling

## Import

```typescript
import "mjo-litui/mjo-link";
```

## Properties

| Property          | Type                                                                                | Description                                               | Default     | Required |
| ----------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------- | -------- |
| `href`            | `string`                                                                            | Target URL for the link                                   | `undefined` | No       |
| `target`          | `"_self" \| "_blank" \| "_parent" \| "_top"`                                        | Specifies where to open the linked document               | `"_self"`   | No       |
| `rel`             | `string`                                                                            | Relationship between current document and linked document | `undefined` | No       |
| `color`           | `"default" \| "primary" \| "secondary"`                                             | Color variant of the link                                 | `"default"` | No       |
| `variant`         | `"link" \| "button" \| "ghost" \| "dashed" \| "flat" \| "text"`                     | Visual style variant                                      | `"link"`    | No       |
| `size`            | `"heading1" \| "heading2" \| "heading3" \| "base" \| "body1" \| "body2" \| "body3"` | Typography size (only for variant="link")                 | `"base"`    | No       |
| `weight`          | `"light" \| "regular" \| "medium" \| "bold"`                                        | Font weight (only for variant="link")                     | `"regular"` | No       |
| `disabled`        | `boolean`                                                                           | Disables the link interaction                             | `false`     | No       |
| `cover`           | `boolean`                                                                           | Expands the clickable area to cover the parent container  | `false`     | No       |
| `nodecor`         | `boolean`                                                                           | Removes text decoration on hover                          | `false`     | No       |
| `preventDefault`  | `boolean`                                                                           | Prevents default navigation and fires custom event        | `false`     | No       |
| `ariaLabelledBy`  | `string`                                                                            | ID of element that labels the link                        | `undefined` | No       |
| `ariaDescribedBy` | `string`                                                                            | ID of element that describes the link                     | `undefined` | No       |

## Methods

This component does not expose public methods.

## Events

| Event            | Type                | Description                                               | Detail                             |
| ---------------- | ------------------- | --------------------------------------------------------- | ---------------------------------- |
| `mjo-link:click` | `MjoLinkClickEvent` | Fired when the link is clicked and preventDefault is true | `{ link: MjoLink, href?: string }` |

## CSS Variables

| Variable                           | Description                               | Default                                                                      |
| ---------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| `--mjo-link-font-family`           | Font family of the link                   | `inherit`                                                                    |
| `--mjo-link-color-default`         | Default text color                        | `currentColor`                                                               |
| `--mjo-link-color-primary`         | Primary color variant                     | `var(--mjo-primary-color, #1aa8ed)`                                          |
| `--mjo-link-color-secondary`       | Secondary color variant                   | `var(--mjo-secondary-color, #7dc717)`                                        |
| `--mjo-link-color-disabled`        | Disabled state color                      | `var(--mjo-disabled-foreground-color, #aaa)`                                 |
| `--mjo-link-text-decoration`       | Text decoration style                     | `none`                                                                       |
| `--mjo-link-text-decoration-hover` | Text decoration on hover                  | `underline`                                                                  |
| `--mjo-link-font-weight`           | Font weight                               | `inherit`                                                                    |
| `--mjo-link-transition`            | Transition effect                         | `color 0.2s ease, text-decoration 0.2s ease`                                 |
| `--mjo-link-focus-outline`         | Focus outline style                       | `2px solid`                                                                  |
| `--mjo-link-focus-outline-color`   | Focus outline color                       | `var(--mjo-primary-color, #1aa8ed)` or `var(--mjo-secondary-color, #7dc717)` |
| `--mjo-link-focus-outline-offset`  | Focus outline offset                      | `2px`                                                                        |
| `--mjo-link-focus-outline-width`   | Focus outline width in high contrast mode | `3px`                                                                        |
| `--mjo-link-focus-border-radius`   | Focus outline border radius               | `2px`                                                                        |

## CSS Parts

| Part             | Description                                                                             | Element  |
| ---------------- | --------------------------------------------------------------------------------------- | -------- |
| `link`           | The native anchor element                                                               | `<a>`    |
| `link-text`      | The text wrapper around the link content (only for variant="link")                      | `<span>` |
| `button`         | The button element (via exportparts from mjo-button when variant is not "link")         | -        |
| `button-content` | The button content element (via exportparts from mjo-button when variant is not "link") | -        |

## Accessibility

### ARIA Attributes

- **`aria-disabled`**: Automatically set to `"true"` when `disabled` is true
- **`aria-current`**: Can be set via the `ariaCurrent` property to indicate current page or location
- **`aria-label`**: Can be set via the `ariaLabel` property for custom accessible labels
- **`aria-labelledby`**: Links the element to another element that labels it
- **`aria-describedby`**: Links the element to another element that describes it

### Role Assignment

- Automatically assigns `role="button"` when:
    - `variant` is not "link"
    - `href` is not provided

### Keyboard Navigation

- **Tab**: Focus the link
- **Enter/Space**: Activate the link (when role="button")
- **Enter**: Follow the link (standard behavior)

### Best Practices

- Use descriptive link text that makes sense out of context
- Avoid generic text like "click here" or "read more"
- For links that open in new windows (`target="_blank"`), inform users either through text or `aria-label`
- Use `cover` property carefully to ensure the clickable area doesn't interfere with other interactive elements
- When using `preventDefault`, ensure you provide alternative navigation through the `mjo-link:click` event

### Focus Management

- Visible focus indicator with customizable outline
- Increased outline width in high contrast mode for better visibility
- Disabled links are removed from tab order (`tabindex="-1"`)

## Usage Examples

### Link with Cover Area

```html
<div style="position: relative; padding: 20px; background: #f0f0f0;">
    <h3>Card Title</h3>
    <p>Card description text</p>
    <mjo-link href="/details" cover nodecor>Read more</mjo-link>
</div>
```

### Button-Styled Link

```html
<mjo-link href="/signup" variant="button" color="primary"> Sign Up Now </mjo-link>
```

### SPA Navigation with preventDefault

```html
<mjo-link href="/about" preventDefault @mjo-link:click="${(e) => navigateTo(e.detail.href)}"> About Us </mjo-link>
```

```typescript
function navigateTo(href?: string) {
    if (href) {
        // Custom navigation logic for SPA
        router.push(href);
    }
}
```

### Typography Variants

```html
<mjo-link href="/article" size="heading2" weight="bold"> Article Title Link </mjo-link>

<mjo-link href="/footnote" size="body2" color="secondary"> Footnote reference </mjo-link>
```

### Accessibility Enhancement

```html
<p id="article-desc">This article discusses advanced CSS techniques</p>
<mjo-link href="/article/123" aria-describedby="article-desc" aria-label="Read full article about advanced CSS techniques"> Read more </mjo-link>
```

### External Link

```html
<mjo-link href="https://example.com" target="_blank" color="primary"> Visit External Site (opens in new tab) </mjo-link>
```

### Custom Styling with CSS Variables

```html
<style>
    .custom-link {
        --mjo-link-color-primary: #ff6b6b;
        --mjo-link-text-decoration: underline;
        --mjo-link-text-decoration-hover: none;
        --mjo-link-focus-outline-color: #ff6b6b;
    }
</style>

<mjo-link class="custom-link" href="/custom" color="primary"> Custom Styled Link </mjo-link>
```

### Styling with CSS Parts

```html
<style>
    mjo-link::part(link) {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        background-color: rgba(26, 168, 237, 0.1);
    }

    mjo-link::part(link):hover {
        background-color: rgba(26, 168, 237, 0.2);
    }
</style>

<mjo-link href="/styled" color="primary"> Link with Custom Background </mjo-link>
```

## Additional Notes

### Automatic rel Attribute

When `target="_blank"` is set without a custom `rel` attribute, the component automatically adds `rel="noopener noreferrer"` for security reasons.

### Button Variants

When using button variants (`button`, `ghost`, `dashed`, `flat`, `text`), the link internally uses the `mjo-button` component. Color mapping for these variants:

- `color="default"` → maps to `mjo-button` with `color="primary"`
- `color="primary"` and `color="secondary"` → maintain their respective colors

### Typography Customization

Typography size and weight properties only apply when `variant="link"`. For button variants, styling is controlled by the underlying `mjo-button` component.

### Motion Preferences

The component respects the user's `prefers-reduced-motion` setting by disabling transitions when motion reduction is preferred.
