# mjo-icon

Flexible SVG icon component with theme support and smooth transitions. Renders SVG icons from string sources with automatic sizing, color inheritance, and customizable animations.

## HTML Usage

```html
<mjo-icon src="<svg>...</svg>"></mjo-icon> <mjo-icon src="${iconString}" style="font-size: 32px; color: blue;"></mjo-icon>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiFillHeart, AiOutlineUser, AiFillStar } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-basic")
export class ExampleIconBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-icon src=${AiFillHeart}></mjo-icon>
                <mjo-icon src=${AiOutlineUser}></mjo-icon>
                <mjo-icon src=${AiFillStar}></mjo-icon>
            </div>
        `;
    }
}
```

## Sizing & Colors Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { AiFillCheckCircle, AiFillWarning, AiFillCloseCircle } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-sizing")
export class ExampleIconSizing extends LitElement {
    render() {
        return html`
            <div class="icon-grid">
                <!-- Different sizes -->
                <div class="size-section">
                    <h4>Sizes</h4>
                    <mjo-icon src=${AiFillCheckCircle} class="small"></mjo-icon>
                    <mjo-icon src=${AiFillCheckCircle} class="medium"></mjo-icon>
                    <mjo-icon src=${AiFillCheckCircle} class="large"></mjo-icon>
                    <mjo-icon src=${AiFillCheckCircle} class="xl"></mjo-icon>
                </div>

                <!-- Different colors -->
                <div class="color-section">
                    <h4>Colors</h4>
                    <mjo-icon src=${AiFillCheckCircle} class="success"></mjo-icon>
                    <mjo-icon src=${AiFillWarning} class="warning"></mjo-icon>
                    <mjo-icon src=${AiFillCloseCircle} class="error"></mjo-icon>
                    <mjo-icon src=${AiFillCheckCircle} class="primary"></mjo-icon>
                </div>

                <!-- Inline sizing -->
                <div class="inline-section">
                    <h4>Inline with Text</h4>
                    <p>
                        This is text with a
                        <mjo-icon src=${AiFillCheckCircle} style="color: green;"></mjo-icon>
                        checkmark icon inline.
                    </p>
                    <p style="font-size: 1.5rem;">
                        Larger text with
                        <mjo-icon src=${AiFillWarning} style="color: orange;"></mjo-icon>
                        warning icon.
                    </p>
                </div>
            </div>
        `;
    }

    static styles = css`
        .icon-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .size-section,
        .color-section,
        .inline-section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .size-section > mjo-icon,
        .color-section > mjo-icon {
            display: inline-block;
            margin-right: 1rem;
        }

        /* Size variations */
        .small {
            font-size: 16px;
        }
        .medium {
            font-size: 24px;
        }
        .large {
            font-size: 32px;
        }
        .xl {
            font-size: 48px;
        }

        /* Color variations */
        .success {
            color: #059669;
        }
        .warning {
            color: #d97706;
        }
        .error {
            color: #dc2626;
        }
        .primary {
            color: #3b82f6;
        }

        h4 {
            margin: 0;
            color: #374151;
            font-size: 1rem;
            font-weight: 600;
        }

        p {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
    `;
}
```

## Interactive Icons Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AiFillHeart, AiOutlineHeart, AiFillStar, AiOutlineStar, AiFillEye, AiFillEyeInvisible } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-interactive")
export class ExampleIconInteractive extends LitElement {
    @state() private liked = false;
    @state() private starred = false;
    @state() private visible = true;

    private toggleLike() {
        this.liked = !this.liked;
    }

    private toggleStar() {
        this.starred = !this.starred;
    }

    private toggleVisibility() {
        this.visible = !this.visible;
    }

    render() {
        return html`
            <div class="interactive-icons">
                <h4>Interactive Icons</h4>

                <div class="icon-buttons">
                    <button class="icon-btn ${this.liked ? "liked" : ""}" @click=${this.toggleLike} title="Toggle like">
                        <mjo-icon src=${this.liked ? AiFillHeart : AiOutlineHeart}></mjo-icon>
                        ${this.liked ? "Liked" : "Like"}
                    </button>

                    <button class="icon-btn ${this.starred ? "starred" : ""}" @click=${this.toggleStar} title="Toggle star">
                        <mjo-icon src=${this.starred ? AiFillStar : AiOutlineStar}></mjo-icon>
                        ${this.starred ? "Starred" : "Star"}
                    </button>

                    <button class="icon-btn" @click=${this.toggleVisibility} title="Toggle visibility">
                        <mjo-icon src=${this.visible ? AiFillEye : AiFillEyeInvisible}></mjo-icon>
                        ${this.visible ? "Hide" : "Show"}
                    </button>
                </div>

                <div class="hover-icons">
                    <h5>Hover Effects</h5>
                    <div class="hover-grid">
                        <div class="hover-icon scale">
                            <mjo-icon src=${AiFillHeart}></mjo-icon>
                            <span>Scale</span>
                        </div>
                        <div class="hover-icon rotate">
                            <mjo-icon src=${AiFillStar}></mjo-icon>
                            <span>Rotate</span>
                        </div>
                        <div class="hover-icon bounce">
                            <mjo-icon src=${AiFillCheckCircle}></mjo-icon>
                            <span>Bounce</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = css`
        .interactive-icons {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 1rem;
        }

        .icon-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .icon-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;
        }

        .icon-btn:hover {
            background: #f9fafb;
            border-color: #9ca3af;
        }

        .icon-btn.liked {
            color: #dc2626;
            border-color: #dc2626;
            background: #fef2f2;
        }

        .icon-btn.starred {
            color: #d97706;
            border-color: #d97706;
            background: #fffbeb;
        }

        .hover-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 1rem;
        }

        .hover-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .hover-icon mjo-icon {
            font-size: 24px;
            color: #6b7280;
            transition: all 0.3s ease;
        }

        .hover-icon span {
            font-size: 0.75rem;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .hover-icon.scale:hover mjo-icon {
            transform: scale(1.3);
            color: #3b82f6;
        }

        .hover-icon.rotate:hover mjo-icon {
            transform: rotate(180deg);
            color: #059669;
        }

        .hover-icon.bounce:hover mjo-icon {
            animation: bounce 0.6s ease-in-out;
            color: #dc2626;
        }

        @keyframes bounce {
            0%,
            20%,
            50%,
            80%,
            100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }

        h4,
        h5 {
            margin: 0;
            color: #374151;
        }

        h5 {
            font-size: 0.875rem;
            margin-bottom: 1rem;
        }
    `;
}
```

## Icon Collections Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import {
    AiFillHome,
    AiFillUser,
    AiFillSetting,
    AiFillMail,
    AiFillPhone,
    AiFillCamera,
    AiFillCalendar,
    AiFillFolder,
    AiFillFile,
    AiFillCloud,
    AiFillLock,
    AiFillBell,
} from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-collections")
export class ExampleIconCollections extends LitElement {
    private navigationIcons = [
        { icon: AiFillHome, label: "Home" },
        { icon: AiFillUser, label: "Profile" },
        { icon: AiFillSetting, label: "Settings" },
        { icon: AiFillMail, label: "Messages" },
    ];

    private actionIcons = [
        { icon: AiFillPhone, label: "Call" },
        { icon: AiFillCamera, label: "Photo" },
        { icon: AiFillCalendar, label: "Schedule" },
        { icon: AiFillFolder, label: "Files" },
    ];

    private statusIcons = [
        { icon: AiFillFile, label: "Document", status: "active" },
        { icon: AiFillCloud, label: "Synced", status: "success" },
        { icon: AiFillLock, label: "Secure", status: "warning" },
        { icon: AiFillBell, label: "Alert", status: "error" },
    ];

    render() {
        return html`
            <div class="icon-showcase">
                <section class="icon-section">
                    <h4>Navigation Icons</h4>
                    <div class="icon-list">
                        ${this.navigationIcons.map(
                            (item) => html`
                                <div class="icon-item nav-item">
                                    <mjo-icon src=${item.icon}></mjo-icon>
                                    <span>${item.label}</span>
                                </div>
                            `,
                        )}
                    </div>
                </section>

                <section class="icon-section">
                    <h4>Action Icons</h4>
                    <div class="icon-grid">
                        ${this.actionIcons.map(
                            (item) => html`
                                <button class="action-button">
                                    <mjo-icon src=${item.icon}></mjo-icon>
                                    <span>${item.label}</span>
                                </button>
                            `,
                        )}
                    </div>
                </section>

                <section class="icon-section">
                    <h4>Status Icons</h4>
                    <div class="status-list">
                        ${this.statusIcons.map(
                            (item) => html`
                                <div class="status-item ${item.status}">
                                    <mjo-icon src=${item.icon}></mjo-icon>
                                    <span>${item.label}</span>
                                    <div class="status-indicator"></div>
                                </div>
                            `,
                        )}
                    </div>
                </section>

                <section class="icon-section">
                    <h4>Icon Sizes Showcase</h4>
                    <div class="size-showcase">
                        ${[16, 20, 24, 32, 40, 48].map(
                            (size) => html`
                                <div class="size-item">
                                    <mjo-icon src=${AiFillStar} style="font-size: ${size}px; color: #f59e0b;"></mjo-icon>
                                    <span>${size}px</span>
                                </div>
                            `,
                        )}
                    </div>
                </section>
            </div>
        `;
    }

    static styles = css`
        .icon-showcase {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 800px;
        }

        .icon-section h4 {
            margin: 0 0 1rem 0;
            color: #1f2937;
            font-size: 1.125rem;
            font-weight: 600;
        }

        .icon-list {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .icon-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border-radius: 8px;
            min-width: 80px;
        }

        .nav-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .nav-item:hover {
            background: #e2e8f0;
            transform: translateY(-1px);
        }

        .nav-item mjo-icon {
            font-size: 24px;
            color: #475569;
        }

        .nav-item span {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 500;
        }

        .icon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
        }

        .action-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .action-button:hover {
            background: #f9fafb;
            border-color: #9ca3af;
            transform: translateY(-1px);
        }

        .action-button mjo-icon {
            font-size: 28px;
            color: #4b5563;
        }

        .action-button span {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
        }

        .status-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .status-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            background: white;
            border: 1px solid #e5e7eb;
            position: relative;
        }

        .status-item mjo-icon {
            font-size: 20px;
        }

        .status-item span {
            flex: 1;
            font-size: 0.875rem;
            font-weight: 500;
        }

        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        .status-item.active mjo-icon {
            color: #3b82f6;
        }
        .status-item.active .status-indicator {
            background: #3b82f6;
        }

        .status-item.success mjo-icon {
            color: #059669;
        }
        .status-item.success .status-indicator {
            background: #059669;
        }

        .status-item.warning mjo-icon {
            color: #d97706;
        }
        .status-item.warning .status-indicator {
            background: #d97706;
        }

        .status-item.error mjo-icon {
            color: #dc2626;
        }
        .status-item.error .status-indicator {
            background: #dc2626;
        }

        .size-showcase {
            display: flex;
            align-items: end;
            gap: 1.5rem;
            padding: 1rem;
            background: #f8fafc;
            border-radius: 8px;
        }

        .size-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .size-item span {
            font-size: 0.75rem;
            color: #6b7280;
            font-weight: 500;
        }
    `;
}
```

## ThemeMixin Customization Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { AiFillHeart, AiFillStar, AiFillThumbsUp } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-themed")
export class ExampleIconThemed extends LitElement {
    private slowTransition = {
        transition: "all 1s ease-in-out",
    };

    private fastTransition = {
        transition: "all 0.1s ease",
    };

    private bounceTransition = {
        transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    };

    render() {
        return html`
            <div class="themed-icons">
                <h4>Custom Transitions</h4>

                <div class="transition-examples">
                    <div class="example-group">
                        <h5>Slow Transition (1s)</h5>
                        <div class="icon-row">
                            <mjo-icon src=${AiFillHeart} .theme=${this.slowTransition} class="hover-scale"></mjo-icon>
                            <mjo-icon src=${AiFillStar} .theme=${this.slowTransition} class="hover-rotate"></mjo-icon>
                        </div>
                    </div>

                    <div class="example-group">
                        <h5>Fast Transition (0.1s)</h5>
                        <div class="icon-row">
                            <mjo-icon src=${AiFillHeart} .theme=${this.fastTransition} class="hover-scale"></mjo-icon>
                            <mjo-icon src=${AiFillStar} .theme=${this.fastTransition} class="hover-rotate"></mjo-icon>
                        </div>
                    </div>

                    <div class="example-group">
                        <h5>Bounce Transition</h5>
                        <div class="icon-row">
                            <mjo-icon src=${AiFillThumbsUp} .theme=${this.bounceTransition} class="hover-bounce"></mjo-icon>
                        </div>
                    </div>
                </div>

                <div class="usage-note">
                    <p>Hover over icons to see different transition effects applied via ThemeMixin</p>
                </div>
            </div>
        `;
    }

    static styles = css`
        .themed-icons {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1rem;
        }

        .transition-examples {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .example-group {
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #fafafa;
        }

        .example-group h5 {
            margin: 0 0 1rem 0;
            color: #374151;
            font-size: 0.875rem;
            font-weight: 600;
        }

        .icon-row {
            display: flex;
            gap: 1rem;
        }

        .icon-row mjo-icon {
            font-size: 32px;
            color: #6b7280;
            cursor: pointer;
        }

        .hover-scale:hover {
            transform: scale(1.3);
            color: #3b82f6;
        }

        .hover-rotate:hover {
            transform: rotate(180deg);
            color: #059669;
        }

        .hover-bounce:hover {
            transform: translateY(-5px);
            color: #dc2626;
        }

        .usage-note {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 6px;
            padding: 1rem;
        }

        .usage-note p {
            margin: 0;
            color: #0c4a6e;
            font-size: 0.875rem;
            font-style: italic;
        }

        h4 {
            margin: 0;
            color: #1f2937;
            font-size: 1.125rem;
        }
    `;
}
```

## Attributes / Properties

| Name  | Type                  | Default     | Reflects | Description                          |
| ----- | --------------------- | ----------- | -------- | ------------------------------------ |
| `src` | `string \| undefined` | `undefined` | no       | SVG string content to render as icon |

### Behavior Notes

-   If `src` is undefined or empty, nothing is rendered
-   SVG content is rendered using `unsafeSVG` directive for performance
-   Icon automatically inherits text color via `fill: currentColor`
-   Size is controlled by `font-size` CSS property (default: 24px)
-   Component uses `display: inline-block` for easy inline usage

## Slots

This component does not use slots. Content is provided via the `src` property.

## Events

This component does not emit any custom events.

## CSS Variables

The component supports CSS custom properties for styling and animations:

### Core Styling

| Variable                | Default    | Used For                            |
| ----------------------- | ---------- | ----------------------------------- |
| `--mjo-icon-transition` | `all 0.3s` | Transition effects for SVG elements |

### Custom CSS Examples

```css
/* Custom transition timing */
mjo-icon {
    --mjo-icon-transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Size variations */
.icon-small {
    font-size: 16px;
}
.icon-medium {
    font-size: 24px;
}
.icon-large {
    font-size: 32px;
}
.icon-xl {
    font-size: 48px;
}

/* Color variations */
.icon-primary {
    color: #3b82f6;
}
.icon-success {
    color: #059669;
}
.icon-warning {
    color: #d97706;
}
.icon-error {
    color: #dc2626;
}

/* Interactive states */
.icon-hover:hover {
    transform: scale(1.1);
    color: #3b82f6;
}

/* Custom animations */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.icon-spin {
    animation: spin 1s linear infinite;
}
```

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-icon-{property-name}`.

### MjoIconTheme Interface

```ts
interface MjoIconTheme {
    transition?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiFillStar } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-themed-simple")
export class ExampleIconThemedSimple extends LitElement {
    private customTransition = {
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };

    render() {
        return html`
            <mjo-icon
                src=${AiFillStar}
                .theme=${this.customTransition}
                style="font-size: 32px; color: #f59e0b; cursor: pointer;"
                onmouseover="this.style.transform = 'rotate(72deg) scale(1.2)'"
                onmouseout="this.style.transform = 'rotate(0deg) scale(1)'"
            ></mjo-icon>
        `;
    }
}
```

## Integration with mjo-icons

The component is designed to work seamlessly with the `mjo-icons` package:

```ts
// Import specific icons
import { AiFillHome, AiOutlineUser, AiFillStar } from "mjo-icons/ai";
import { BiSolidHeart } from "mjo-icons/bi";
import { FaSolidCheck } from "mjo-icons/fa";
import { GiCheckMark } from "mjo-icons/gi";

// Use in templates
html`
    <mjo-icon src=${AiFillHome}></mjo-icon>
    <mjo-icon src=${BiSolidHeart}></mjo-icon>
    <mjo-icon src=${FaSolidCheck}></mjo-icon>
`;
```

### Available Icon Libraries

-   **AI (Ant Design Icons)**: `mjo-icons/ai`
-   **BI (Bootstrap Icons)**: `mjo-icons/bi`
-   **FA (Font Awesome)**: `mjo-icons/fa`
-   **GI (Game Icons)**: `mjo-icons/gi`
-   **And many more...**

## Common Usage Patterns

### Button with Icon

```ts
html`
    <button style="display: flex; align-items: center; gap: 0.5rem;">
        <mjo-icon src=${AiFillPlus} style="font-size: 16px;"></mjo-icon>
        Add Item
    </button>
`;
```

### Status Indicators

```ts
html`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <mjo-icon src=${AiFillCheckCircle} style="color: green;"></mjo-icon>
        <span>Success</span>
    </div>
`;
```

### Navigation Menu

```ts
const menuItems = [
    { icon: AiFillHome, label: "Home", path: "/" },
    { icon: AiFillUser, label: "Profile", path: "/profile" },
    { icon: AiFillSetting, label: "Settings", path: "/settings" },
];

html`
    <nav>
        ${menuItems.map(
            (item) => html`
                <a href=${item.path} style="display: flex; align-items: center; gap: 0.5rem;">
                    <mjo-icon src=${item.icon}></mjo-icon>
                    ${item.label}
                </a>
            `,
        )}
    </nav>
`;
```

### Loading Spinner

```ts
html` <mjo-icon src=${AiOutlineLoading} style="animation: spin 1s linear infinite;"></mjo-icon> `;
```

## Accessibility Notes

-   Icons inherit color from parent text for better contrast compliance
-   For decorative icons, no additional ARIA attributes needed
-   For functional icons, add appropriate `aria-label` or `title` to parent element
-   Icons used as buttons should be wrapped in focusable elements with proper labels
-   Consider providing text alternatives for critical information conveyed by icons

## Performance Considerations

-   Uses `unsafeSVG` directive for optimal rendering performance
-   SVG content is rendered directly without additional DOM parsing
-   Icons are lightweight and don't impact bundle size significantly
-   Consider icon sprite sheets for very large icon collections
-   CSS transitions are hardware-accelerated for smooth animations

## Browser Support

-   SVG support: All modern browsers
-   CSS custom properties: All modern browsers (IE 11 not supported for theming)
-   `unsafeSVG` directive: Follows Lit framework compatibility

## Summary

`<mjo-icon>` provides a simple yet powerful way to render SVG icons with automatic sizing, color inheritance, and smooth transitions. It integrates seamlessly with the mjo-icons library and supports theme customization through ThemeMixin. The component is designed for maximum flexibility while maintaining excellent performance and accessibility standards. Use it for any scenario requiring scalable, customizable icons in your application.
