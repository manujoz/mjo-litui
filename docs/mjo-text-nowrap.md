# mjo-text-nowrap

A utility component that prevents text wrapping and applies ellipsis when content overflows. Perfect for displaying long text in constrained layouts while maintaining visual consistency.

## Import

```ts
import "mjo-litui/mjo-text-nowrap";
```

## Basic Usage

```html
<mjo-text-nowrap>This is a very long text that will be truncated with ellipsis when it overflows the container width</mjo-text-nowrap>
```

## Lit Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";

@customElement("example-text-nowrap-basic")
export class ExampleTextNowrapBasic extends LitElement {
    @state() longText =
        "This is a very long text that demonstrates how the text-nowrap component truncates content with ellipsis when it exceeds the available width of its container.";

    render() {
        return html`
            <div style="width: 200px; border: 1px solid #ccc; padding: 1rem;">
                <h4>Container with 200px width:</h4>
                <mjo-text-nowrap>${this.longText}</mjo-text-nowrap>
            </div>
        `;
    }
}
```

## Responsive Containers

The component adapts to its container width automatically:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";

@customElement("example-text-nowrap-responsive")
export class ExampleTextNowrapResponsive extends LitElement {
    render() {
        const sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="width: 100px; border: 1px solid #e2e8f0; padding: 0.5rem;">
                    <small>100px container:</small>
                    <mjo-text-nowrap>${sampleText}</mjo-text-nowrap>
                </div>

                <div style="width: 250px; border: 1px solid #e2e8f0; padding: 0.5rem;">
                    <small>250px container:</small>
                    <mjo-text-nowrap>${sampleText}</mjo-text-nowrap>
                </div>

                <div style="width: 400px; border: 1px solid #e2e8f0; padding: 0.5rem;">
                    <small>400px container:</small>
                    <mjo-text-nowrap>${sampleText}</mjo-text-nowrap>
                </div>
            </div>
        `;
    }
}
```

## In Form Labels

The component is commonly used in form labels to prevent text overflow:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";
import "mjo-litui/mjo-textfield";

@customElement("example-text-nowrap-forms")
export class ExampleTextNowrapForms extends LitElement {
    render() {
        return html`
            <div style="width: 300px; display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; width: 150px;">
                        <mjo-text-nowrap>Very long field label that would normally wrap:</mjo-text-nowrap>
                    </label>
                    <mjo-textfield placeholder="Enter value"></mjo-textfield>
                </div>

                <div>
                    <label style="display: block; margin-bottom: 0.5rem; width: 150px;">
                        <mjo-text-nowrap>Another extremely long label text:</mjo-text-nowrap>
                    </label>
                    <mjo-textfield placeholder="Enter value"></mjo-textfield>
                </div>
            </div>
        `;
    }
}
```

## Card Titles and Metadata

Perfect for card layouts where consistent height is important:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";
import "mjo-litui/mjo-card";

@customElement("example-text-nowrap-cards")
export class ExampleTextNowrapCards extends LitElement {
    render() {
        const products = [
            {
                title: "Ultra High-Performance Gaming Laptop with Advanced Graphics",
                description: "Professional grade laptop for gaming and content creation",
                price: "$2,499",
            },
            {
                title: "Wireless Bluetooth Headphones",
                description: "Premium audio experience with noise cancellation",
                price: "$199",
            },
            {
                title: "Smart Home Automation Hub with Voice Control and AI Integration",
                description: "Complete home automation solution",
                price: "$349",
            },
        ];

        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                ${products.map(
                    (product) => html`
                        <mjo-card style="height: 200px;">
                            <div slot="header" style="padding: 1rem; border-bottom: 1px solid var(--mjo-color-border);">
                                <mjo-text-nowrap style="font-weight: bold; font-size: 1.1em;"> ${product.title} </mjo-text-nowrap>
                            </div>

                            <div style="padding: 1rem; flex: 1;">
                                <p style="margin: 0 0 1rem 0; color: var(--mjo-color-text-secondary);">${product.description}</p>
                            </div>

                            <div slot="footer" style="padding: 1rem; border-top: 1px solid var(--mjo-color-border);">
                                <strong style="color: var(--mjo-color-primary);">${product.price}</strong>
                            </div>
                        </mjo-card>
                    `,
                )}
            </div>
        `;
    }
}
```

## Table Cells

Ideal for table cells to maintain consistent row heights:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";

@customElement("example-text-nowrap-table")
export class ExampleTextNowrapTable extends LitElement {
    render() {
        const data = [
            {
                name: "John Doe",
                email: "john.doe@verylongdomainname.com",
                description: "Senior Software Engineer with expertise in full-stack development and cloud architecture",
            },
            {
                name: "Jane Smith",
                email: "jane.smith@company.com",
                description: "Product Manager responsible for strategic planning and roadmap development",
            },
            {
                name: "Bob Johnson",
                email: "bob.johnson@anotherlongdomainname.org",
                description: "UX Designer focused on user research and interface design",
            },
        ];

        return html`
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: var(--mjo-color-surface);">
                        <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--mjo-color-border); width: 120px;">Name</th>
                        <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--mjo-color-border); width: 200px;">Email</th>
                        <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--mjo-color-border);">Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(
                        (person) => html`
                            <tr>
                                <td style="padding: 0.75rem; border: 1px solid var(--mjo-color-border);">
                                    <mjo-text-nowrap>${person.name}</mjo-text-nowrap>
                                </td>
                                <td style="padding: 0.75rem; border: 1px solid var(--mjo-color-border);">
                                    <mjo-text-nowrap>${person.email}</mjo-text-nowrap>
                                </td>
                                <td style="padding: 0.75rem; border: 1px solid var(--mjo-color-border);">
                                    <mjo-text-nowrap>${person.description}</mjo-text-nowrap>
                                </td>
                            </tr>
                        `,
                    )}
                </tbody>
            </table>
        `;
    }
}
```

## Navigation Items

Useful for navigation menus with long text:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";
import "mjo-litui/mjo-icon";
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "mjo-icons/ai";

@customElement("example-text-nowrap-navigation")
export class ExampleTextNowrapNavigation extends LitElement {
    @state() activeItem = "dashboard";

    render() {
        const menuItems = [
            { id: "dashboard", icon: AiOutlineHome, label: "Dashboard Overview and Analytics" },
            { id: "profile", icon: AiOutlineUser, label: "User Profile Management Settings" },
            { id: "settings", icon: AiOutlineSetting, label: "Advanced Configuration Options" },
        ];

        return html`
            <nav style="width: 200px; background: var(--mjo-color-surface); border-radius: 8px; padding: 0.5rem;">
                ${menuItems.map(
                    (item) => html`
                        <div
                            style="
                            display: flex; 
                            align-items: center; 
                            gap: 0.75rem; 
                            padding: 0.75rem; 
                            margin: 0.25rem 0; 
                            border-radius: 6px; 
                            cursor: pointer;
                            background: ${this.activeItem === item.id ? "var(--mjo-color-primary)" : "transparent"};
                            color: ${this.activeItem === item.id ? "white" : "inherit"};
                        "
                            @click=${() => (this.activeItem = item.id)}
                        >
                            <mjo-icon src=${item.icon} style="flex-shrink: 0; width: 20px; height: 20px;"></mjo-icon>
                            <mjo-text-nowrap style="flex: 1;">${item.label}</mjo-text-nowrap>
                        </div>
                    `,
                )}
            </nav>
        `;
    }
}
```

## Dynamic Content

The component works with dynamic content updates:

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";
import "mjo-litui/mjo-button";

@customElement("example-text-nowrap-dynamic")
export class ExampleTextNowrapDynamic extends LitElement {
    @state() currentText = "Short text";

    @state() textOptions = [
        "Short text",
        "This is a medium length text example",
        "This is a very long text that will definitely overflow the container and show the ellipsis behavior",
        "Ultra super mega extremely long text that would normally break the layout but with text-nowrap it stays contained",
    ];

    @state() currentIndex = 0;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
                <div style="width: 300px; padding: 1rem; border: 2px solid var(--mjo-color-primary); border-radius: 8px;">
                    <h4 style="margin: 0 0 0.5rem 0;">Dynamic Text (300px container):</h4>
                    <mjo-text-nowrap style="font-size: 1.1em; color: var(--mjo-color-primary);"> ${this.currentText} </mjo-text-nowrap>
                </div>

                <mjo-button @click=${this.#changeText}> Change Text (${this.currentIndex + 1}/${this.textOptions.length}) </mjo-button>

                <div style="font-size: 0.9em; color: var(--mjo-color-text-secondary); max-width: 400px;">
                    <strong>Current text:</strong> "${this.currentText}"
                </div>
            </div>
        `;
    }

    #changeText() {
        this.currentIndex = (this.currentIndex + 1) % this.textOptions.length;
        this.currentText = this.textOptions[this.currentIndex];
    }
}
```

## Styled Content

The component preserves styling applied to the content:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";

@customElement("example-text-nowrap-styled")
export class ExampleTextNowrapStyled extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
                <div style="padding: 1rem; background: var(--mjo-color-surface); border-radius: 8px;">
                    <h4 style="margin: 0 0 0.5rem 0;">Bold Text:</h4>
                    <mjo-text-nowrap>
                        <strong>This is bold text that will be truncated with ellipsis when it overflows</strong>
                    </mjo-text-nowrap>
                </div>

                <div style="padding: 1rem; background: var(--mjo-color-surface); border-radius: 8px;">
                    <h4 style="margin: 0 0 0.5rem 0;">Italic Text:</h4>
                    <mjo-text-nowrap>
                        <em>This is italic text that will be truncated with ellipsis when it overflows the container</em>
                    </mjo-text-nowrap>
                </div>

                <div style="padding: 1rem; background: var(--mjo-color-surface); border-radius: 8px;">
                    <h4 style="margin: 0 0 0.5rem 0;">Colored Text:</h4>
                    <mjo-text-nowrap>
                        <span style="color: var(--mjo-color-primary); font-weight: 600;">
                            This is colored and bold text that will be truncated with ellipsis
                        </span>
                    </mjo-text-nowrap>
                </div>

                <div style="padding: 1rem; background: var(--mjo-color-surface); border-radius: 8px;">
                    <h4 style="margin: 0 0 0.5rem 0;">Mixed Styles:</h4>
                    <mjo-text-nowrap>
                        <span>
                            Regular text with <strong>bold parts</strong> and
                            <em style="color: var(--mjo-color-secondary);">colored italic text</em>
                            that will all be truncated together
                        </span>
                    </mjo-text-nowrap>
                </div>
            </div>
        `;
    }
}
```

## Attributes/Properties

This component has no specific properties as it acts as a pure layout utility.

| Name   | Type     | Default | Description                                  |
| ------ | -------- | ------- | -------------------------------------------- |
| (slot) | `Node[]` | -       | Content to be displayed with text truncation |

## Events

This component does not emit any custom events.

## Methods

This component has no public methods beyond the standard LitElement lifecycle methods.

## CSS Custom Properties

The component uses fixed internal styling and does not expose CSS custom properties for customization.

## Styling

The component automatically inherits text styling from its parent:

```css
/* The component will inherit these styles */
.parent {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    font-family: Arial, sans-serif;
}
```

## Layout Behavior

-   **Height**: Fixed at `calc(1em * 1.25)` (1.25 line-height equivalent)
-   **Width**: Takes full width of container
-   **Display**: Block-level element
-   **Overflow**: Hidden with ellipsis
-   **White-space**: No wrapping (nowrap)

## Use Cases

1. **Form Labels**: Prevent label text from wrapping in form layouts
2. **Table Cells**: Maintain consistent row heights in data tables
3. **Card Titles**: Keep card layouts uniform with varying title lengths
4. **Navigation**: Truncate long menu item names
5. **Lists**: Display long item names without breaking layout
6. **Breadcrumbs**: Show navigation paths without wrapping
7. **Tags/Badges**: Display tag text without expanding containers

## Best Practices

1. **Container Width**: Ensure the parent container has a defined width
2. **Accessibility**: Consider providing full text via `title` attribute for truncated content
3. **Responsive**: Test behavior across different screen sizes
4. **Content Priority**: Use for secondary text; important content should remain fully visible
5. **Tooltips**: Consider adding tooltips for truncated content

## Accessibility

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-text-nowrap";

@customElement("example-text-nowrap-accessible")
export class ExampleTextNowrapAccessible extends LitElement {
    render() {
        const fullText = "This is the complete text that might be truncated but should be accessible";

        return html`
            <div style="width: 200px;">
                <mjo-text-nowrap title="${fullText}"> ${fullText} </mjo-text-nowrap>
            </div>
        `;
    }
}
```

## Browser Support

-   **Text Overflow**: Supported in all modern browsers
-   **Ellipsis**: Universal support for text-overflow: ellipsis
-   **Flexbox**: Used internally, supported in all target browsers
-   **CSS Grid**: Not used, component is compatible with all layout systems

## Performance

-   **Minimal DOM**: Simple structure with minimal element nesting
-   **No JavaScript**: Pure CSS-based truncation
-   **Lightweight**: No external dependencies or complex logic
-   **Reflow**: Minimal impact on layout performance

## Notes

-   The component provides a semantic wrapper for text truncation
-   It maintains a consistent height regardless of content length
-   Styling is inherited from parent elements
-   Works with any text content including HTML elements
-   The ellipsis appears automatically when content overflows
-   Component is purely presentational and requires no configuration

## Related Components

-   [mjo-typography](./mjo-typography.md) - For semantic text styling
-   [mjo-card](./mjo-card.md) - Often used together for card layouts
-   [mjo-table](./mjo-table.md) - Commonly used in table cells
