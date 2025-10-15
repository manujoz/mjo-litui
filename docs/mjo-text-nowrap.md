# mjo-text-nowrap

Simple component that truncates text with ellipsis when it overflows its container, preventing text wrapping.

## Index

- [Use cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage examples](#usage-examples)
- [Additional notes](#additional-notes)

## Use cases

- Truncate long text in table cells
- Display single-line text in cards or lists
- Show file names or paths in compact spaces
- Prevent text wrapping in fixed-width containers

## Import

```typescript
import "mjo-litui/mjo-text-nowrap";
```

## Properties

| Property     | Type               | Description                                                                                     | Default | Required |
| ------------ | ------------------ | ----------------------------------------------------------------------------------------------- | ------- | -------- |
| `tag`        | `MjoTextNowrapTag` | HTML tag to use for semantic structure (`span`, `p`, `div`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`) | `span`  | No       |
| `aria-label` | `string \| null`   | Accessible label for the truncated text                                                         | `null`  | No       |

### MjoTextNowrapTag Type

```typescript
type MjoTextNowrapTag = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
```

## CSS Parts

| Part        | Description                                      | Element |
| ----------- | ------------------------------------------------ | ------- |
| `container` | Main container that holds the truncated content  | `div`   |
| `wrapper`   | Inner wrapper that applies the truncation styles | `div`   |

## Accessibility

### Best practices

- Use the `aria-label` attribute when the truncated text might lose important context
- Choose the appropriate `tag` property value for semantic HTML structure
- When using heading tags (`h1`-`h6`), ensure proper heading hierarchy in your document

### ARIA attributes

- The component automatically sets `role="none"` when using non-span tags to avoid duplicate semantics
- The `aria-label` attribute can be used to provide the full text content when truncated

## Usage examples

### Basic truncation

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";

@customElement("my-component")
export class MyComponent extends LitElement {
    render() {
        return html`
            <mjo-text-nowrap style="width: 200px;">
                This is a very long text that will be truncated with ellipsis when it exceeds the container width
            </mjo-text-nowrap>
        `;
    }
}
```

### Using semantic tags

```typescript
@customElement("user-profile")
export class UserProfile extends LitElement {
    render() {
        return html`
            <div class="profile">
                <mjo-text-nowrap tag="h2" style="width: 300px;"> ${this.userName} </mjo-text-nowrap>
                <mjo-text-nowrap tag="p" style="width: 300px;"> ${this.userBio} </mjo-text-nowrap>
            </div>
        `;
    }
}
```

### Providing accessible labels

```typescript
@customElement("file-list")
export class FileList extends LitElement {
    private fileName = "very-long-document-name-with-many-details.pdf";

    render() {
        return html` <mjo-text-nowrap style="width: 150px;" aria-label="File name: ${this.fileName}"> ${this.fileName} </mjo-text-nowrap> `;
    }
}
```

### Styling with CSS parts

```typescript
@customElement("styled-truncate")
export class StyledTruncate extends LitElement {
    static styles = css`
        mjo-text-nowrap::part(container) {
            background: var(--surface-color);
            padding: 8px;
            border-radius: 4px;
        }

        mjo-text-nowrap::part(wrapper) {
            color: var(--text-primary);
            font-weight: 500;
        }
    `;

    render() {
        return html` <mjo-text-nowrap style="width: 200px;"> Styled truncated text </mjo-text-nowrap> `;
    }
}
```

### Table cell truncation

```typescript
@customElement("data-table")
export class DataTable extends LitElement {
    private data = [
        { id: 1, name: "Long Product Name That Needs Truncation", price: 99.99 },
        { id: 2, name: "Another Very Long Product Description", price: 149.99 },
    ];

    render() {
        return html`
            <table>
                <thead>
                    <tr>
                        <th style="width: 200px;">Product</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.data.map(
                        (item) => html`
                            <tr>
                                <td>
                                    <mjo-text-nowrap aria-label="${item.name}"> ${item.name} </mjo-text-nowrap>
                                </td>
                                <td>$${item.price}</td>
                            </tr>
                        `,
                    )}
                </tbody>
            </table>
        `;
    }
}
```

## Additional notes

- The component has a fixed height of `calc(1em * 1.25)` to maintain consistent line height
- The truncation is achieved using CSS `text-overflow: ellipsis`, `white-space: nowrap`, and `overflow: hidden`
- The component uses absolute positioning internally, so the parent container should have enough space to accommodate it
- Always set a width constraint on the component or its parent for the truncation to work properly
- The component extends `ThemeMixin` for theme support
