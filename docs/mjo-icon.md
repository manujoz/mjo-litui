# mjo-icon

Accessible SVG icon component with enhanced interaction capabilities, loading states, and comprehensive theming support. Renders SVG icons with automatic sizing, color inheritance, validation, and customizable animations.

## HTML Usage

```html
<mjo-icon src="<svg>...</svg>"></mjo-icon>
<mjo-icon src="${iconString}" size="large" clickable></mjo-icon>
<mjo-icon src="${iconString}" animation="spin" loading aria-label="Loading"></mjo-icon>
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
                <mjo-icon src=${AiOutlineUser} size="medium" aria-label="User profile"></mjo-icon>
                <mjo-icon src=${AiFillStar} clickable @mjo-icon:click=${this.handleStarClick}></mjo-icon>
            </div>
        `;
    }

    private handleStarClick(event: CustomEvent) {
        console.log("Star clicked!", event.detail);
    }
}
```

## Accessibility Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiFillClose, AiFillInfo, AiFillWarning } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-accessibility")
export class ExampleIconAccessibility extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <!-- Decorative icon (no ARIA label needed) -->
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <mjo-icon src=${AiFillInfo} size="small" aria-hidden="true"></mjo-icon>
                    <span>Information text with decorative icon</span>
                </div>

                <!-- Interactive icon with proper ARIA -->
                <button style="display: flex; align-items: center; gap: 0.5rem;">
                    <mjo-icon src=${AiFillClose} clickable aria-label="Close dialog" role="button" @mjo-icon:click=${this.handleClose}> </mjo-icon>
                    Close
                </button>

                <!-- Status icon with description -->
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <mjo-icon src=${AiFillWarning} size="medium" aria-describedby="warning-text" style="color: orange;"> </mjo-icon>
                    <span id="warning-text">Warning: Please review your input</span>
                </div>
            </div>
        `;
    }

    private handleClose() {
        console.log("Dialog closed");
    }
}
```

## Size Variants & Loading States Example

```ts
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AiFillCheckCircle, AiFillWarning, AiFillCloseCircle, AiOutlineLoading } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-variants")
export class ExampleIconVariants extends LitElement {
    @state() private loading = false;

    private simulateLoading() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 3000);
    }

    render() {
        return html`
            <div class="icon-variants">
                <!-- Size variants -->
                <section>
                    <h4>Size Variants</h4>
                    <div class="size-row">
                        <mjo-icon src=${AiFillCheckCircle} size="small"></mjo-icon>
                        <mjo-icon src=${AiFillCheckCircle} size="medium"></mjo-icon>
                        <mjo-icon src=${AiFillCheckCircle} size="large"></mjo-icon>
                        <mjo-icon src=${AiFillCheckCircle} size="xl"></mjo-icon>
                    </div>
                    <div class="size-labels">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                        <span>XL</span>
                    </div>
                </section>

                <!-- Loading states -->
                <section>
                    <h4>Loading States</h4>
                    <div class="loading-examples">
                        <mjo-icon src=${AiOutlineLoading} size="medium" animation="spin" loading aria-label="Loading"> </mjo-icon>
                        <button @click=${this.simulateLoading}>
                            ${this.loading
                                ? html`<mjo-icon src=${AiOutlineLoading} animation="spin" loading size="small"></mjo-icon> Loading...`
                                : "Start Loading"}
                        </button>
                    </div>
                </section>

                <!-- Animation variants -->
                <section>
                    <h4>Animations</h4>
                    <div class="animation-row">
                        <mjo-icon src=${AiFillCheckCircle} animation="bounce"></mjo-icon>
                        <mjo-icon src=${AiFillWarning} animation="pulse"></mjo-icon>
                        <mjo-icon src=${AiFillCloseCircle} animation="shake"></mjo-icon>
                    </div>
                </section>
            </div>
        `;
    }

    static styles = css`
        .icon-variants {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 1rem;
        }

        section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        h4 {
            margin: 0;
            color: #374151;
            font-size: 1rem;
            font-weight: 600;
        }

        .size-row {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .size-labels {
            display: flex;
            gap: 1rem;
            font-size: 0.75rem;
            color: #6b7280;
            margin-left: 0.5rem;
        }

        .size-labels span {
            text-align: center;
            min-width: 3rem;
        }

        .loading-examples {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .animation-row {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            font-size: 0.875rem;
        }

        button:hover {
            background: #f9fafb;
        }
    `;
}
```

## Interactive & Clickable Icons Example

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

    private handleLikeClick(event: CustomEvent) {
        this.liked = !this.liked;
        console.log("Like clicked:", event.detail);
    }

    private handleStarClick(event: CustomEvent) {
        this.starred = !this.starred;
        console.log("Star clicked:", event.detail);
    }

    private handleVisibilityClick(event: CustomEvent) {
        this.visible = !this.visible;
        console.log("Visibility toggled:", event.detail);
    }

    render() {
        return html`
            <div class="interactive-icons">
                <h4>Clickable Icons</h4>

                <div class="icon-buttons">
                    <div class="icon-group">
                        <mjo-icon
                            src=${this.liked ? AiFillHeart : AiOutlineHeart}
                            clickable
                            size="large"
                            class=${this.liked ? "liked" : ""}
                            aria-label=${this.liked ? "Unlike" : "Like"}
                            role="button"
                            tabindex="0"
                            @mjo-icon:click=${this.handleLikeClick}
                        >
                        </mjo-icon>
                        <span>${this.liked ? "Liked" : "Like"}</span>
                    </div>

                    <div class="icon-group">
                        <mjo-icon
                            src=${this.starred ? AiFillStar : AiOutlineStar}
                            clickable
                            size="large"
                            class=${this.starred ? "starred" : ""}
                            aria-label=${this.starred ? "Unstar" : "Star"}
                            role="button"
                            tabindex="0"
                            @mjo-icon:click=${this.handleStarClick}
                        >
                        </mjo-icon>
                        <span>${this.starred ? "Starred" : "Star"}</span>
                    </div>

                    <div class="icon-group">
                        <mjo-icon
                            src=${this.visible ? AiFillEye : AiFillEyeInvisible}
                            clickable
                            size="large"
                            aria-label=${this.visible ? "Hide" : "Show"}
                            role="button"
                            tabindex="0"
                            @mjo-icon:click=${this.handleVisibilityClick}
                        >
                        </mjo-icon>
                        <span>${this.visible ? "Hide" : "Show"}</span>
                    </div>
                </div>

                <div class="hover-section">
                    <h5>Hover & Focus Effects</h5>
                    <div class="hover-icons">
                        <mjo-icon src=${AiFillHeart} clickable size="large" class="hover-scale" aria-label="Heart icon with scale effect" tabindex="0">
                        </mjo-icon>
                        <mjo-icon src=${AiFillStar} clickable size="large" class="hover-rotate" aria-label="Star icon with rotate effect" tabindex="0">
                        </mjo-icon>
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
            gap: 2rem;
            flex-wrap: wrap;
        }

        .icon-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .icon-group span {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
        }

        .hover-section h5 {
            margin: 0 0 1rem 0;
            color: #374151;
            font-size: 0.875rem;
            font-weight: 600;
        }

        .hover-icons {
            display: flex;
            gap: 2rem;
        }

        /* Clickable icon states */
        mjo-icon[clickable] {
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        mjo-icon[clickable]:hover {
            transform: scale(1.1);
        }

        mjo-icon[clickable]:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
            border-radius: 4px;
        }

        .liked {
            color: #dc2626;
        }

        .starred {
            color: #f59e0b;
        }

        .hover-scale:hover {
            transform: scale(1.3) !important;
            color: #3b82f6;
        }

        .hover-rotate:hover {
            transform: rotate(180deg) !important;
            color: #059669;
        }

        h4 {
            margin: 0;
            color: #1f2937;
            font-size: 1.125rem;
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

| Name        | Type                            | Default     | Reflects | Description                                               |
| ----------- | ------------------------------- | ----------- | -------- | --------------------------------------------------------- |
| `src`       | `string \| undefined`           | `undefined` | no       | SVG string content to render as icon                      |
| `size`      | `MjoIconSize`                   | `"medium"`  | yes      | Predefined size variant: "small", "medium", "large", "xl" |
| `animation` | `MjoIconAnimation \| undefined` | `undefined` | yes      | Animation type: "spin", "bounce", "pulse", "shake"        |
| `clickable` | `boolean`                       | `false`     | yes      | Makes icon clickable with proper ARIA and interaction     |
| `loading`   | `boolean`                       | `false`     | yes      | Shows loading state with appropriate ARIA attributes      |
| `disabled`  | `boolean`                       | `false`     | yes      | Disables interaction and applies disabled styling         |
| `ariaLabel` | `string \| undefined`           | `undefined` | no       | Accessible label for screen readers                       |
| `role`      | `string \| undefined`           | `undefined` | no       | ARIA role for semantic meaning                            |

### Size Values

-   `"small"`: 16px icon size
-   `"medium"`: 24px icon size (default)
-   `"large"`: 32px icon size
-   `"xl"`: 40px icon size

### Animation Values

-   `"spin"`: Continuous rotation (ideal for loading states)
-   `"bounce"`: Bounce animation with scaling
-   `"pulse"`: Pulsing opacity animation
-   `"shake"`: Horizontal shake animation

### Behavior Notes

-   If `src` is undefined, empty, or invalid SVG, nothing is rendered
-   SVG content is validated before rendering for security
-   Invalid SVG triggers `mjo-icon:error` event
-   Icons automatically inherit text color via `currentColor`
-   Size can be controlled by `size` property or CSS `font-size`
-   Clickable icons have hover/focus states and emit click events
-   Loading state automatically applies `aria-label="Loading"` if not provided
-   Component uses `display: inline-block` for easy inline usage

## Slots

This component does not use slots. Content is provided via the `src` property.

## Events

The component emits the following custom events:

| Event Name       | Detail Type         | Bubbles | Cancelable | Description                              |
| ---------------- | ------------------- | ------- | ---------- | ---------------------------------------- |
| `mjo-icon:click` | `MjoIconClickEvent` | yes     | yes        | Fired when clickable icon is clicked     |
| `mjo-icon:load`  | `MjoIconLoadEvent`  | yes     | no         | Fired when SVG is successfully validated |
| `mjo-icon:error` | `MjoIconErrorEvent` | yes     | no         | Fired when SVG validation fails          |

### Event Details

```ts
interface MjoIconClickEvent {
    element: MjoIcon;
    originalEvent: MouseEvent | KeyboardEvent;
}

interface MjoIconLoadEvent {
    element: MjoIcon;
    src: string;
}

interface MjoIconErrorEvent {
    element: MjoIcon;
    src: string;
    error: string;
}
```

### Event Handling Example

```ts
html`
  <mjo-icon
    src=${iconSrc}
    clickable
    @mjo-icon:click=${this.handleClick}
    @mjo-icon:load=${this.handleLoad}
    @mjo-icon:error=${this.handleError}>
  </mjo-icon>
`;

private handleClick(event: CustomEvent<MjoIconClickEvent>) {
  console.log('Icon clicked:', event.detail);
}

private handleLoad(event: CustomEvent<MjoIconLoadEvent>) {
  console.log('Icon loaded:', event.detail.src);
}

private handleError(event: CustomEvent<MjoIconErrorEvent>) {
  console.error('Icon error:', event.detail.error);
}
```

## CSS Variables

The component supports comprehensive CSS custom properties for styling and theming:

### Theme Variables (Inherited from Global Theme)

| Variable                             | Default                                       | Used For                                  |
| ------------------------------------ | --------------------------------------------- | ----------------------------------------- |
| `--mjo-icon-size-small`              | `16px`                                        | Small size variant                        |
| `--mjo-icon-size-medium`             | `24px`                                        | Medium size variant (default)             |
| `--mjo-icon-size-large`              | `32px`                                        | Large size variant                        |
| `--mjo-icon-size-xl`                 | `40px`                                        | Extra large size variant                  |
| `--mjo-icon-transition`              | `all 0.2s ease`                               | Base transition for all animations        |
| `--mjo-icon-disabled-opacity`        | `0.5`                                         | Opacity when disabled                     |
| `--mjo-icon-clickable-hover-scale`   | `1.05`                                        | Scale factor on hover for clickable icons |
| `--mjo-icon-clickable-focus-outline` | `2px solid var(--mjo-color-primary, #3b82f6)` | Focus ring for clickable icons            |
| `--mjo-icon-loading-spin-duration`   | `1s`                                          | Duration for loading spin animation       |

### Animation Variables

| Variable                     | Default | Used For                  |
| ---------------------------- | ------- | ------------------------- |
| `--mjo-icon-spin-duration`   | `1s`    | Spin animation duration   |
| `--mjo-icon-bounce-duration` | `0.6s`  | Bounce animation duration |
| `--mjo-icon-pulse-duration`  | `2s`    | Pulse animation duration  |
| `--mjo-icon-shake-duration`  | `0.5s`  | Shake animation duration  |

### State-Specific Variables

| Variable                    | Default   | Used For                           |
| --------------------------- | --------- | ---------------------------------- |
| `--mjo-icon-hover-color`    | `inherit` | Color on hover for clickable icons |
| `--mjo-icon-focus-color`    | `inherit` | Color on focus for clickable icons |
| `--mjo-icon-disabled-color` | `inherit` | Color when disabled                |
| `--mjo-icon-loading-color`  | `inherit` | Color when in loading state        |

### Custom CSS Examples

```css
/* Size customization */
.custom-sizes {
    --mjo-icon-size-small: 14px;
    --mjo-icon-size-medium: 20px;
    --mjo-icon-size-large: 28px;
    --mjo-icon-size-xl: 36px;
}

/* Animation timing */
.slow-animations {
    --mjo-icon-transition: all 0.5s ease;
    --mjo-icon-spin-duration: 2s;
    --mjo-icon-bounce-duration: 1s;
}

/* Clickable customization */
.enhanced-clickable {
    --mjo-icon-clickable-hover-scale: 1.2;
    --mjo-icon-clickable-focus-outline: 3px solid #f59e0b;
    --mjo-icon-hover-color: #3b82f6;
}

/* Loading state */
.custom-loading {
    --mjo-icon-loading-spin-duration: 0.8s;
    --mjo-icon-loading-color: #6366f1;
}

/* Disabled state */
.custom-disabled {
    --mjo-icon-disabled-opacity: 0.3;
    --mjo-icon-disabled-color: #9ca3af;
}
```

## ThemeMixin Customization

This component extends `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-icon-{property-name}`.

### MjoIconTheme Interface

```ts
interface MjoIconTheme {
    // Size variants
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
    sizeXl?: string;

    // Transitions and animations
    transition?: string;
    spinDuration?: string;
    bounceDuration?: string;
    pulseDuration?: string;
    shakeDuration?: string;

    // Interaction states
    disabledOpacity?: string;
    clickableHoverScale?: string;
    clickableFocusOutline?: string;
    loadingSpinDuration?: string;

    // State colors
    hoverColor?: string;
    focusColor?: string;
    disabledColor?: string;
    loadingColor?: string;
}
```

### ThemeMixin Examples

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiFillStar, AiOutlineLoading } from "mjo-icons/ai";
import "mjo-litui/mjo-icon";

@customElement("example-icon-themed")
export class ExampleIconThemed extends LitElement {
    private customTheme = {
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        clickableHoverScale: "1.3",
        hoverColor: "#f59e0b",
        spinDuration: "0.5s",
    };

    private loadingTheme = {
        loadingSpinDuration: "2s",
        loadingColor: "#6366f1",
        sizeMedium: "28px",
    };

    render() {
        return html`
            <div style="display: flex; gap: 2rem; align-items: center;">
                <!-- Custom themed clickable icon -->
                <mjo-icon src=${AiFillStar} clickable size="large" .theme=${this.customTheme} aria-label="Themed star icon"> </mjo-icon>

                <!-- Custom themed loading icon -->
                <mjo-icon src=${AiOutlineLoading} loading animation="spin" .theme=${this.loadingTheme} aria-label="Custom loading"> </mjo-icon>
            </div>
        `;
    }
}
```

### Advanced Theming

```ts
@customElement("example-icon-advanced-theme")
export class ExampleIconAdvancedTheme extends LitElement {
    private buttonTheme = {
        transition: "all 0.3s ease",
        clickableHoverScale: "1.1",
        clickableFocusOutline: "2px solid #10b981",
        hoverColor: "#059669",
        focusColor: "#047857",
    };

    private statusTheme = {
        transition: "opacity 0.5s ease",
        pulseDuration: "1.5s",
        sizeMedium: "20px",
    };

    render() {
        return html`
            <div class="theme-examples">
                <!-- Button-style themed icons -->
                <div class="button-icons">
                    ${["save", "edit", "delete"].map(
                        (action) => html`
                            <mjo-icon
                                src=${this.getActionIcon(action)}
                                clickable
                                .theme=${this.buttonTheme}
                                aria-label=${action}
                                @mjo-icon:click=${() => this.handleAction(action)}
                            >
                            </mjo-icon>
                        `,
                    )}
                </div>

                <!-- Status indicator themed icons -->
                <div class="status-icons">
                    <mjo-icon src=${this.getStatusIcon()} animation="pulse" .theme=${this.statusTheme} aria-label="Status indicator"> </mjo-icon>
                </div>
            </div>
        `;
    }

    private getActionIcon(action: string) {
        /* ... */
    }
    private getStatusIcon() {
        /* ... */
    }
    private handleAction(action: string) {
        console.log(`${action} clicked`);
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
        <mjo-icon src=${AiFillPlus} size="small"></mjo-icon>
        Add Item
    </button>
`;
```

### Status Indicators

```ts
html`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <mjo-icon src=${AiFillCheckCircle} size="small" style="color: green;" aria-label="Success"> </mjo-icon>
        <span>Operation completed</span>
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
    <nav role="navigation">
        ${menuItems.map(
            (item) => html`
                <a href=${item.path} style="display: flex; align-items: center; gap: 0.5rem;" aria-label=${item.label}>
                    <mjo-icon src=${item.icon} size="small" aria-hidden="true"> </mjo-icon>
                    ${item.label}
                </a>
            `,
        )}
    </nav>
`;
```

### Loading Spinner

```ts
html` <mjo-icon src=${AiOutlineLoading} animation="spin" loading size="medium" aria-label="Loading content"> </mjo-icon> `;
```

### Interactive Toggle

```ts
@customElement("icon-toggle")
class IconToggle extends LitElement {
    @state() private active = false;

    private handleToggle(event: CustomEvent) {
        this.active = !this.active;
        this.dispatchEvent(
            new CustomEvent("toggle", {
                detail: { active: this.active },
            }),
        );
    }

    render() {
        return html`
            <mjo-icon
                src=${this.active ? AiFillHeart : AiOutlineHeart}
                clickable
                size="large"
                style="color: ${this.active ? "#dc2626" : "inherit"}"
                aria-label=${this.active ? "Remove from favorites" : "Add to favorites"}
                role="button"
                tabindex="0"
                @mjo-icon:click=${this.handleToggle}
            >
            </mjo-icon>
        `;
    }
}
```

## Accessibility Guidelines

### Screen Reader Support

```ts
// Decorative icons (purely visual)
html`
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <mjo-icon src=${AiFillStar} aria-hidden="true"></mjo-icon>
        <span>5 star rating</span>
    </div>
`;

// Functional icons (convey information)
html` <mjo-icon src=${AiFillWarning} size="small" style="color: orange;" aria-label="Warning: Review your input" role="img"> </mjo-icon> `;

// Interactive icons (clickable)
html`
    <mjo-icon src=${AiFillClose} clickable size="medium" aria-label="Close dialog" role="button" tabindex="0" @mjo-icon:click=${this.handleClose}> </mjo-icon>
`;
```

### Keyboard Navigation

-   Clickable icons are automatically focusable with `tabindex="0"`
-   Press Enter or Space to activate clickable icons
-   Focus indicators are automatically provided
-   Custom focus styling via CSS variables

### Color and Contrast

-   Icons inherit color from parent for better contrast compliance
-   Use sufficient color contrast ratios (4.5:1 for normal text)
-   Don't rely solely on color to convey information
-   Consider providing text labels alongside icons

### Loading States

-   Loading icons automatically get `aria-label="Loading"` if not provided
-   Use loading state for long-running operations
-   Announce status changes to screen readers

```ts
html` <mjo-icon src=${AiOutlineLoading} loading animation="spin" aria-label="Loading user data"> </mjo-icon> `;
```

### Best Practices

-   Use semantic HTML around icons when possible
-   Provide text alternatives for critical information
-   Test with keyboard navigation and screen readers
-   Use appropriate ARIA roles (`img`, `button`, `presentation`)
-   Consider reduced motion preferences for animations

```css
@media (prefers-reduced-motion: reduce) {
    mjo-icon {
        --mjo-icon-transition: none;
        --mjo-icon-spin-duration: 0s;
        --mjo-icon-bounce-duration: 0s;
        --mjo-icon-pulse-duration: 0s;
        --mjo-icon-shake-duration: 0s;
    }
}
```

## Performance Considerations

-   **SVG Validation**: Content is validated before rendering for security and performance
-   **Error Handling**: Invalid SVG gracefully handled with error events
-   **Direct Rendering**: SVG content is rendered directly without additional DOM parsing
-   **CSS Transitions**: Hardware-accelerated animations for smooth performance
-   **Lightweight Bundle**: Icons don't significantly impact bundle size
-   **Optimized Re-renders**: Changes to properties trigger efficient updates only

### Performance Tips

```ts
// Preload frequently used icons
const commonIcons = {
    home: AiFillHome,
    user: AiFillUser,
    settings: AiFillSetting,
};

// Use size prop instead of CSS font-size when possible
html`<mjo-icon src=${icon} size="large"></mjo-icon>`;

// Minimize animation usage on mobile devices
html`<mjo-icon src=${icon} animation=${isMobile ? undefined : "bounce"}></mjo-icon>`;
```

## Browser Support

-   **SVG Support**: All modern browsers (IE 11+)
-   **CSS Custom Properties**: All modern browsers (IE 11 with limitations)
-   **CSS Animations**: All modern browsers
-   **Event Listeners**: All modern browsers
-   **ARIA Support**: All modern browsers with screen reader compatibility

## Security Considerations

-   **SVG Validation**: All SVG content is validated before rendering
-   **XSS Prevention**: Malicious SVG content is rejected with error events
-   **Content Sanitization**: Only valid SVG elements and attributes are allowed
-   **Safe Rendering**: No unsafe DOM operations or script execution

```ts
// Error handling for invalid/malicious content
html`
    <mjo-icon
        src=${untrustedSVG}
        @mjo-icon:error=${this.handleInvalidSVG}>
    </mjo-icon>
`;

private handleInvalidSVG(event: CustomEvent) {
    console.warn('Invalid SVG content detected:', event.detail.error);
    // Fallback to safe default icon
    this.iconSrc = this.getDefaultIcon();
}
```

## Browser Support

-   SVG support: All modern browsers
-   CSS custom properties: All modern browsers (IE 11 not supported for theming)
-   `unsafeSVG` directive: Follows Lit framework compatibility

## Summary

`<mjo-icon>` provides a comprehensive, accessible SVG icon solution with enhanced interaction capabilities, validation, and theming support. Key features include:

-   **Accessibility First**: Built-in ARIA support, keyboard navigation, and screen reader compatibility
-   **Interactive Capabilities**: Clickable icons with proper focus management and event handling
-   **Loading States**: Built-in loading indicators with appropriate ARIA labels
-   **Size Variants**: Predefined size options (`small`, `medium`, `large`, `xl`) plus custom sizing
-   **Animations**: Built-in animations (`spin`, `bounce`, `pulse`, `shake`) with customizable timing
-   **SVG Validation**: Secure rendering with validation and error handling
-   **Theme Integration**: Comprehensive theming via CSS variables and ThemeMixin
-   **Event System**: Custom events for click, load, and error states
-   **Performance Optimized**: Efficient rendering and hardware-accelerated animations
-   **Security Focused**: SVG content validation prevents XSS vulnerabilities

The component integrates seamlessly with the `mjo-icons` library and supports extensive customization while maintaining excellent performance, accessibility, and security standards. Use it for any scenario requiring scalable, interactive, and accessible icons in your application.

### Quick Integration

```ts
import "mjo-litui/mjo-icon";
import { AiFillHeart } from "mjo-icons/ai";

// Basic usage
html`<mjo-icon src=${AiFillHeart}></mjo-icon>`;

// Interactive usage
html`<mjo-icon src=${AiFillHeart} clickable @mjo-icon:click=${this.handleClick}></mjo-icon>`;

// Loading state
html`<mjo-icon src=${loadingIcon} loading animation="spin"></mjo-icon>`;

// Themed usage
html`<mjo-icon src=${icon} .theme=${{ transition: "all 0.5s ease" }}></mjo-icon>`;
```
