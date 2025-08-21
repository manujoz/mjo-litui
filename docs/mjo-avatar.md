# mjo-avatar

Configurable, theme-aware avatar component for displaying user images, initials, or fallback icons with multiple sizes, shapes, colors, and customization options.

## HTML Usage

```html
<mjo-avatar src="https://example.com/avatar.jpg" alt="User Avatar"></mjo-avatar>
<mjo-avatar name="John Doe" nameColoured></mjo-avatar>
<mjo-avatar fallbackIcon="<svg>...</svg>" bordered color="primary"></mjo-avatar>
<mjo-avatar name="Jane" clickable value="jane-user" bordered color="success"></mjo-avatar>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";

@customElement("example-avatar-basic")
export class ExampleAvatarBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"></mjo-avatar>
                <mjo-avatar name="John Doe"></mjo-avatar>
                <mjo-avatar fallbackIcon="<svg>...</svg>"></mjo-avatar>
                <mjo-avatar name="Jane Smith" nameColoured></mjo-avatar>
            </div>
        `;
    }
}
```

## Sizes and Shapes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";

@customElement("example-avatar-sizes")
export class ExampleAvatarSizes extends LitElement {
    private userImage = "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face";

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Sizes</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar src=${this.userImage} size="small" alt="Small avatar"></mjo-avatar>
                        <mjo-avatar src=${this.userImage} size="medium" alt="Medium avatar"></mjo-avatar>
                        <mjo-avatar src=${this.userImage} size="large" alt="Large avatar"></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Border Radius</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar src=${this.userImage} radius="none" alt="No radius"></mjo-avatar>
                        <mjo-avatar src=${this.userImage} radius="small" alt="Small radius"></mjo-avatar>
                        <mjo-avatar src=${this.userImage} radius="medium" alt="Medium radius"></mjo-avatar>
                        <mjo-avatar src=${this.userImage} radius="large" alt="Large radius"></mjo-avatar>
                        <mjo-avatar src=${this.userImage} radius="full" alt="Full radius (circle)"></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Combined Size and Radius</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar name="S" size="small" radius="small"></mjo-avatar>
                        <mjo-avatar name="M" size="medium" radius="medium"></mjo-avatar>
                        <mjo-avatar name="L" size="large" radius="large"></mjo-avatar>
                        <mjo-avatar name="C" size="large" radius="full"></mjo-avatar>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Colors and Borders Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";

@customElement("example-avatar-colors")
export class ExampleAvatarColors extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Border Colors</h4>
                    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                        <mjo-avatar name="D" bordered color="default"></mjo-avatar>
                        <mjo-avatar name="P" bordered color="primary"></mjo-avatar>
                        <mjo-avatar name="S" bordered color="secondary"></mjo-avatar>
                        <mjo-avatar name="✓" bordered color="success"></mjo-avatar>
                        <mjo-avatar name="!" bordered color="warning"></mjo-avatar>
                        <mjo-avatar name="i" bordered color="info"></mjo-avatar>
                        <mjo-avatar name="×" bordered color="error"></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Colored Names (nameColoured)</h4>
                    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                        <mjo-avatar name="Alice" nameColoured bordered></mjo-avatar>
                        <mjo-avatar name="Bob" nameColoured bordered></mjo-avatar>
                        <mjo-avatar name="Charlie" nameColoured bordered></mjo-avatar>
                        <mjo-avatar name="Diana" nameColoured bordered></mjo-avatar>
                        <mjo-avatar name="Edward" nameColoured bordered></mjo-avatar>
                        <mjo-avatar name="Fiona" nameColoured bordered></mjo-avatar>
                        <mjo-avatar name="George" nameColoured bordered></mjo-avatar>
                        <mjo-avatar name="Hannah" nameColoured bordered></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Large Colored Avatars</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar name="John" nameColoured size="large" bordered color="primary"></mjo-avatar>
                        <mjo-avatar name="Jane" nameColoured size="large" bordered color="secondary"></mjo-avatar>
                        <mjo-avatar name="Mike" nameColoured size="large" bordered color="success"></mjo-avatar>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Fallback and Error Handling Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-button";

@customElement("example-avatar-fallback")
export class ExampleAvatarFallback extends LitElement {
    @state() private brokenImage = "https://broken-url.com/image.jpg";
    @state() private validImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face";
    @state() private useValidImage = false;

    private toggleImage() {
        this.useValidImage = !this.useValidImage;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Default Fallback (Empty)</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar size="small"></mjo-avatar>
                        <mjo-avatar size="medium"></mjo-avatar>
                        <mjo-avatar size="large"></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Custom Fallback Icons</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar fallbackIcon="<svg>...</svg>" bordered color="warning"></mjo-avatar>
                        <mjo-avatar fallbackIcon="<svg>...</svg>" bordered color="error"></mjo-avatar>
                        <mjo-avatar fallbackIcon="<svg>...</svg>" bordered color="info"></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Error Handling (Image Loading Failures)</h4>
                    <div style="display: flex; gap: 1rem; align-items: center; flex-direction: column;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <mjo-avatar
                                src=${this.useValidImage ? this.validImage : this.brokenImage}
                                alt="User Avatar"
                                name="Fallback User"
                                size="large"
                                bordered
                            ></mjo-avatar>
                            <span>This avatar will fallback to initials if image fails to load</span>
                        </div>
                        <mjo-button @click=${this.toggleImage} variant="ghost"> ${this.useValidImage ? "Break Image URL" : "Fix Image URL"} </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>Fallback Priority Order</h4>
                    <div style="display: flex; gap: 1rem; align-items: center; flex-direction: column;">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <mjo-avatar src="broken-url.jpg" name="John" fallbackIcon="<svg>...</svg>"></mjo-avatar>
                            <span>1. Image → 2. Custom Fallback Icon → 3. Name Initial → 4. Empty</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <mjo-avatar fallbackIcon="<svg>...</svg>"></mjo-avatar>
                            <span>No image, no name → Custom Fallback</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <mjo-avatar name="John"></mjo-avatar>
                            <span>No image, no custom fallback → Name Initial</span>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <mjo-avatar></mjo-avatar>
                            <span>No image, no name, no custom fallback → Empty</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Clickable and Interactive Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-button";

@customElement("example-avatar-interactive")
export class ExampleAvatarInteractive extends LitElement {
    @state() private lastClicked = "";

    private handleAvatarClick(event: CustomEvent) {
        this.lastClicked = event.detail.value;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Clickable Avatars</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                            clickable
                            value="user1"
                            bordered
                            color="primary"
                            @mjo-avatar-click=${this.handleAvatarClick}
                        ></mjo-avatar>
                        <mjo-avatar
                            name="John Doe"
                            clickable
                            value="john"
                            nameColoured
                            bordered
                            color="secondary"
                            @mjo-avatar-click=${this.handleAvatarClick}
                        ></mjo-avatar>
                        <mjo-avatar
                            fallbackIcon="<svg>...</svg>"
                            clickable
                            value="star-user"
                            bordered
                            color="warning"
                            @mjo-avatar-click=${this.handleAvatarClick}
                        ></mjo-avatar>
                    </div>
                    ${this.lastClicked ? html`<p>Last clicked: <strong>${this.lastClicked}</strong></p>` : ""}
                </div>

                <div>
                    <h4>Clickable with Custom Values</h4>
                    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                        <mjo-avatar
                            name="Alice"
                            nameColoured
                            clickable
                            value="alice-123"
                            size="small"
                            bordered
                            @mjo-avatar-click=${this.handleAvatarClick}
                        ></mjo-avatar>
                        <mjo-avatar
                            name="Bob"
                            nameColoured
                            clickable
                            value="bob-456"
                            size="medium"
                            bordered
                            @mjo-avatar-click=${this.handleAvatarClick}
                        ></mjo-avatar>
                        <mjo-avatar
                            name="Charlie"
                            nameColoured
                            clickable
                            value="charlie-789"
                            size="large"
                            bordered
                            @mjo-avatar-click=${this.handleAvatarClick}
                        ></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Mixed Clickable and Non-Clickable</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar
                            name="Click Me"
                            clickable
                            value="clickable"
                            bordered
                            color="success"
                            @mjo-avatar-click=${this.handleAvatarClick}
                        ></mjo-avatar>
                        <mjo-avatar name="Static" bordered color="info"></mjo-avatar>
                        <mjo-avatar name="Disabled" clickable disabled bordered color="error"></mjo-avatar>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## States and Interactive Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";
import "mjo-litui/mjo-button";

@customElement("example-avatar-states")
export class ExampleAvatarStates extends LitElement {
    @state() private isDisabled = false;

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Normal vs Disabled State</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                            alt="Normal Avatar"
                            ?disabled=${this.isDisabled}
                        ></mjo-avatar>
                        <mjo-avatar name="John Doe" nameColoured bordered color="primary" ?disabled=${this.isDisabled}></mjo-avatar>
                        <mjo-avatar showFallback fallback="star" bordered color="success" ?disabled=${this.isDisabled}></mjo-avatar>
                    </div>
                    <div style="margin-top: 1rem;">
                        <mjo-button @click=${this.toggleDisabled} variant="ghost"> ${this.isDisabled ? "Enable Avatars" : "Disable Avatars"} </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>Avatar Group Example</h4>
                    <div style="display: flex; gap: -0.5rem; align-items: center;">
                        <mjo-avatar
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face"
                            bordered
                            color="primary"
                            style="margin-right: -0.5rem; z-index: 3;"
                        ></mjo-avatar>
                        <mjo-avatar name="Bob" nameColoured bordered color="secondary" style="margin-right: -0.5rem; z-index: 2;"></mjo-avatar>
                        <mjo-avatar name="Charlie" nameColoured bordered color="success" style="margin-right: -0.5rem; z-index: 1;"></mjo-avatar>
                        <div
                            style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: var(--mjo-color-gray-200); border: 2px solid white; font-size: 0.75rem; font-weight: bold; color: var(--mjo-color-gray-600);"
                        >
                            +5
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Advanced Customization Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoAvatarTheme } from "mjo-litui/types";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";

@customElement("example-avatar-advanced")
export class ExampleAvatarAdvanced extends LitElement {
    private customTheme: MjoAvatarTheme = {
        backgroundColor: "#ff6b6b",
        borderWidth: "3px",
        fallbackColor: "#ffffff",
        sizeSmall: "28px",
        sizeMedium: "36px",
        sizeLarge: "52px",
        nameColor: "#ffffff",
    };

    private largeTheme: MjoAvatarTheme = {
        sizeSmall: "48px",
        sizeMedium: "64px",
        sizeLarge: "80px",
        borderWidth: "4px",
        fallbackSizeSmall: "24px",
        fallbackSizeMedium: "32px",
        fallbackSizeLarge: "40px",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Custom Theme Example</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar name="Custom" size="small" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                        <mjo-avatar name="Theme" size="medium" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                        <mjo-avatar name="Avatar" size="large" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                    </div>
                </div>

                <div>
                    <h4>Large Custom Sizes</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                            size="small"
                            bordered
                            color="success"
                            .theme=${this.largeTheme}
                        ></mjo-avatar>
                        <mjo-avatar name="L" size="medium" bordered color="warning" .theme=${this.largeTheme}></mjo-avatar>
                        <mjo-avatar fallbackIcon="<svg>...</svg>" size="large" bordered color="error" .theme=${this.largeTheme}></mjo-avatar>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Accessibility Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-button";

@customElement("example-avatar-accessibility")
export class ExampleAvatarAccessibility extends LitElement {
    @state() private selectedUser = "";
    @state() private users = [
        { id: "john", name: "John Doe", role: "Manager", online: true },
        { id: "jane", name: "Jane Smith", role: "Developer", online: false },
        { id: "bob", name: "Bob Wilson", role: "Designer", online: true },
    ];

    private handleAvatarClick(event: CustomEvent) {
        this.selectedUser = event.detail.value;
    }

    private handleAvatarError(event: CustomEvent) {
        console.warn("Avatar image failed to load:", event.detail.message);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Fully Accessible Avatar List</h4>
                    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                        ${this.users.map(
                            (user) => html`
                                <div style="text-align: center;">
                                    <mjo-avatar
                                        name="${user.name}"
                                        clickable
                                        value="${user.id}"
                                        bordered
                                        color="${user.online ? "success" : "default"}"
                                        nameColoured
                                        aria-label="View ${user.name}'s profile (${user.role})"
                                        aria-describedby="status-${user.id}"
                                        tabindex="0"
                                        @mjo-avatar-click="${this.handleAvatarClick}"
                                        @mjo-avatar-error="${this.handleAvatarError}"
                                    ></mjo-avatar>
                                    <div id="status-${user.id}" style="font-size: 0.8rem; margin-top: 0.5rem;">
                                        ${user.name}<br />
                                        <span style="color: ${user.online ? "green" : "gray"}"> ${user.online ? "Online" : "Offline"} </span>
                                    </div>
                                </div>
                            `,
                        )}
                    </div>
                    ${this.selectedUser
                        ? html` <p style="margin-top: 1rem;">Selected user: <strong>${this.users.find((u) => u.id === this.selectedUser)?.name}</strong></p> `
                        : ""}
                </div>

                <div>
                    <h4>Keyboard Navigation Test</h4>
                    <p>Use Tab to navigate between avatars, Enter or Space to activate them.</p>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-avatar
                            name="KB1"
                            clickable
                            value="keyboard-1"
                            bordered
                            color="primary"
                            aria-label="Keyboard navigation test 1"
                            tabindex="1"
                            @mjo-avatar-click="${this.handleAvatarClick}"
                        ></mjo-avatar>
                        <mjo-avatar
                            name="KB2"
                            clickable
                            value="keyboard-2"
                            bordered
                            color="secondary"
                            aria-label="Keyboard navigation test 2"
                            tabindex="2"
                            @mjo-avatar-click="${this.handleAvatarClick}"
                        ></mjo-avatar>
                        <mjo-avatar
                            name="Disabled"
                            clickable
                            disabled
                            value="keyboard-disabled"
                            bordered
                            color="error"
                            aria-label="Disabled avatar (not clickable)"
                        ></mjo-avatar>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name              | Type                                                                                   | Default     | Reflects | Description                                                              |
| ----------------- | -------------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------------------ |
| `src`             | `string \| undefined`                                                                  | `undefined` | no       | Image URL to display in the avatar                                       |
| `alt`             | `string \| undefined`                                                                  | `undefined` | no       | Alternative text for the image (falls back to `name` if not provided)    |
| `name`            | `string \| undefined`                                                                  | `undefined` | no       | Name used to generate initials when image is not available               |
| `size`            | `"small" \| "medium" \| "large"`                                                       | `"medium"`  | no       | Controls the overall size of the avatar                                  |
| `radius`          | `"small" \| "medium" \| "large" \| "full" \| "none"`                                   | `"full"`    | no       | Border radius applied to the avatar (full = circle)                      |
| `color`           | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "info" \| "error"` | `"default"` | no       | Color scheme for borders when `bordered` is true                         |
| `bordered`        | `boolean`                                                                              | `false`     | yes      | Adds a colored border around the avatar                                  |
| `disabled`        | `boolean`                                                                              | `false`     | yes      | Applies disabled styling (reduced opacity)                               |
| `clickable`       | `boolean`                                                                              | `false`     | no       | Makes the avatar clickable and dispatches `mjo-avatar-click` events      |
| `nameColoured`    | `boolean`                                                                              | `false`     | no       | Applies automatic color generation based on the first letter of the name |
| `fallbackIcon`    | `string \| undefined`                                                                  | `undefined` | no       | Custom icon to use as fallback when image and name are not available     |
| `value`           | `string \| undefined`                                                                  | `undefined` | no       | Custom value passed in the `mjo-avatar-click` event detail               |
| `ariaDescribedby` | `string \| undefined`                                                                  | `undefined` | no       | References additional descriptive content for screen readers             |

### Accessibility Properties (Native Lit Support)

The component supports standard HTML accessibility attributes through Lit's native property binding:

| Attribute       | Usage                                     | Description                                           |
| --------------- | ----------------------------------------- | ----------------------------------------------------- |
| `aria-label`    | `aria-label="Custom avatar description"`  | Provides accessible label for screen readers          |
| `tabindex`      | `tabindex="0"` or `tabindex="-1"`         | Controls keyboard navigation (automatically managed)  |
| `role`          | Automatically set based on context        | Dynamic: `"button"`, `"img"`, or `"presentation"`     |
| `aria-disabled` | Automatically set when `disabled` is true | Communicates disabled state to assistive technologies |

### Internal State

| Name      | Type      | Description                                       |
| --------- | --------- | ------------------------------------------------- |
| `initial` | `string`  | First letter of the name, automatically uppercase |
| `error`   | `boolean` | Indicates if the image failed to load             |

### Behavior Notes

-   Avatar displays content in priority order: image → custom fallback icon → name initial → empty div
-   When `nameColoured` is true, background and text colors are automatically generated based on the first character
-   Image loading errors automatically trigger fallback to custom fallback icon or name initials
-   The `bordered` property adjusts internal sizing to account for border width
-   Border colors follow the semantic color system
-   When `clickable` is true, the avatar shows visual feedback on click and dispatches `mjo-avatar-click` events
-   Disabled avatars cannot be clicked even if `clickable` is true

## Slots

| Slot      | Description                                                   |
| --------- | ------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via properties |

## Events

| Event              | Detail                | Emitted When                         | Notes                                                             |
| ------------------ | --------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| `mjo-avatar-click` | `{ value: string }`   | Avatar is clicked (when `clickable`) | Contains `value` prop or `name` prop as fallback, or empty string |
| `mjo-avatar-error` | `{ message: string }` | Image fails to load                  | Provides error message for debugging and accessibility purposes   |

**Note**: The component handles image errors internally and automatically falls back to alternative content. The `mjo-avatar-click` event is only dispatched when the avatar is clickable and not disabled.

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Size Variables

| Variable                   | Fallback | Used For                 |
| -------------------------- | -------- | ------------------------ |
| `--mjo-avatar-size-small`  | `32px`   | Small avatar dimensions  |
| `--mjo-avatar-size-medium` | `44px`   | Medium avatar dimensions |
| `--mjo-avatar-size-large`  | `54px`   | Large avatar dimensions  |

### Fallback Icon Sizes

| Variable                            | Fallback | Used For                       |
| ----------------------------------- | -------- | ------------------------------ |
| `--mjo-avatar-fallback-size-small`  | `18px`   | Small fallback icon/text size  |
| `--mjo-avatar-fallback-size-medium` | `28px`   | Medium fallback icon/text size |
| `--mjo-avatar-fallback-size-large`  | `40px`   | Large fallback icon/text size  |

### Border Radius Variables

| Variable                     | Fallback | Used For                    |
| ---------------------------- | -------- | --------------------------- |
| `--mjo-avatar-radius-small`  | `4px`    | Small border radius option  |
| `--mjo-avatar-radius-medium` | `8px`    | Medium border radius option |
| `--mjo-avatar-radius-large`  | `12px`   | Large border radius option  |

### Color Variables

| Variable                                  | Fallback               | Used For                                    |
| ----------------------------------------- | ---------------------- | ------------------------------------------- |
| `--mjo-avatar-background-color`           | `--mjo-color-gray-400` | Default background color                    |
| `--mjo-avatar-fallback-color`             | `--mjo-color-gray-100` | Fallback icon color                         |
| `--mjo-avatar-name-color`                 | `--mjo-color-gray-100` | Name initial text color (when not colored)  |
| `--mjo-avatar-name-auto-background-color` | Computed               | Auto-generated background for colored names |
| `--mjo-avatar-name-auto-foreground-color` | Computed               | Auto-generated text color for colored names |
| `--mjo-avatar-border-color`               | `--mjo-color-gray-300` | Default border color                        |

### Border Variables

| Variable                    | Fallback | Used For         |
| --------------------------- | -------- | ---------------- |
| `--mjo-avatar-border-width` | `2px`    | Border thickness |

### Focus and Accessibility Variables

| Variable            | Fallback              | Used For            |
| ------------------- | --------------------- | ------------------- |
| `--mjo-focus-color` | `--mjo-primary-color` | Focus outline color |

### Semantic Border Colors

The component uses the global semantic color system for border colors:

-   `--mjo-primary-color` (primary)
-   `--mjo-secondary-color` (secondary)
-   `--mjo-success-color` (success)
-   `--mjo-warning-color` (warning)
-   `--mjo-info-color` (info)
-   `--mjo-error-color` (error)

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-avatar-{property-name}`.

### MjoAvatarTheme Interface

```ts
interface MjoAvatarTheme {
    backgroundColor?: string;
    borderWidth?: string;
    fallbackColor?: string;
    fallbackSizeSmall?: string;
    fallbackSizeMedium?: string;
    fallbackSizeLarge?: string;
    nameColor?: string;
    radiusSmall?: string;
    radiusMedium?: string;
    radiusLarge?: string;
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoAvatarTheme } from "mjo-litui/types";
import "mjo-litui/mjo-avatar";

@customElement("example-avatar-themed")
export class ExampleAvatarThemed extends LitElement {
    private customTheme: MjoAvatarTheme = {
        backgroundColor: "#6366f1",
        borderWidth: "3px",
        fallbackColor: "#ffffff",
        nameColor: "#ffffff",
        sizeSmall: "36px",
        sizeMedium: "48px",
        sizeLarge: "64px",
        radiusSmall: "6px",
        radiusMedium: "12px",
        radiusLarge: "18px",
    };

    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-avatar name="Themed" size="small" radius="small" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                <mjo-avatar name="Custom" size="medium" radius="medium" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
                <mjo-avatar name="Avatar" size="large" radius="large" bordered color="primary" .theme=${this.customTheme}></mjo-avatar>
            </div>
        `;
    }
}
```

## User Avatar Lists Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-icon";

@customElement("example-avatar-list")
export class ExampleAvatarList extends LitElement {
    @state() private users = [
        { name: "Alice Johnson", image: "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop&crop=face", online: true },
        { name: "Bob Smith", image: null, online: false },
        { name: "Charlie Brown", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", online: true },
        { name: "Diana Prince", image: null, online: true },
        { name: "Edward Norton", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", online: false },
    ];

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h4>User List with Avatars</h4>
                ${this.users.map(
                    (user) => html`
                        <div
                            style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem; border-radius: 8px; background: var(--mjo-background-color-high, #f8f9fa);"
                        >
                            <div style="position: relative;">
                                <mjo-avatar
                                    src=${user.image || undefined}
                                    name=${user.name}
                                    nameColoured
                                    size="medium"
                                    bordered
                                    color=${user.online ? "success" : "default"}
                                ></mjo-avatar>
                                <div
                                    style="position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; border-radius: 50%; background: ${user.online
                                        ? "#4caf50"
                                        : "#9e9e9e"}; border: 2px solid white;"
                                ></div>
                            </div>
                            <div style="flex: 1;">
                                <div style="font-weight: 500;">${user.name}</div>
                                <div style="font-size: 0.875rem; color: var(--mjo-foreground-color-low); margin-top: 0.125rem;">
                                    ${user.online ? "Online" : "Offline"}
                                </div>
                            </div>
                        </div>
                    `,
                )}
            </div>
        `;
    }
}
```

## CSS Parts

| Part        | Description                 |
| ----------- | --------------------------- |
| `container` | The main avatar container   |
| `image`     | The image/content container |

## Accessibility Features

The `mjo-avatar` component includes comprehensive accessibility support:

### Automatic Accessibility Features

-   **Dynamic Roles**: Automatically sets appropriate `role` attributes:

    -   `role="button"` for clickable avatars
    -   `role="img"` for avatars with images
    -   `role="presentation"` for purely decorative avatars

-   **ARIA Labels**: Intelligent `aria-label` generation:

    -   Clickable: "Click to interact with [name/value/avatar]"
    -   Named: "Avatar for [name]"
    -   Generic: "Avatar"

-   **Keyboard Navigation**: Full keyboard support:

    -   `Enter` and `Space` keys activate clickable avatars
    -   Automatic `tabindex` management (0 for clickable, -1 for non-clickable)
    -   Visual focus indicators with `:focus-visible`

-   **State Communication**:
    -   `aria-disabled="true"` when avatar is disabled
    -   Proper state changes communicated to screen readers

### Accessibility Best Practices

```html
<!-- Enhanced accessibility example -->
<mjo-avatar
    src="https://example.com/user.jpg"
    alt="Profile picture of John Doe, Software Engineer"
    name="John Doe"
    clickable
    value="john-doe"
    aria-label="Click to view John Doe's profile"
    aria-describedby="user-description"
    @mjo-avatar-click="${this.handleProfileClick}"
></mjo-avatar>

<p id="user-description">Senior Software Engineer with 5 years experience. Currently online.</p>
```

### Motion and Preference Support

-   **Reduced Motion**: Respects `prefers-reduced-motion` user setting
-   **Focus Management**: Clear visual focus indicators for keyboard users
-   **Color Contrast**: Automatic color generation considers readability

### Screen Reader Support

-   Images include meaningful `alt` text (falls back to `name` if not provided)
-   Error states are announced through `mjo-avatar-error` events
-   Interactive elements properly identified and described
-   State changes (enabled/disabled) are communicated

## Performance Considerations

-   Image loading is handled gracefully with automatic fallback
-   The `nameColoured` feature generates colors computationally, which is fast but consistent
-   Large numbers of avatars should use proper virtualization if performance becomes an issue
-   Consider lazy loading for avatar images in long lists
-   The component optimizes re-renders by caching computed values

## Image Guidelines

-   **Recommended sizes**: Use images at least 100x100px for best quality across all sizes
-   **Aspect ratio**: Square images (1:1) work best; the component will crop non-square images
-   **Formats**: Standard web formats (JPEG, PNG, WebP) are supported
-   **Loading**: The component handles loading states and errors gracefully

## Security Considerations

-   Always validate and sanitize image URLs from user input
-   Consider implementing Content Security Policy (CSP) for image sources
-   Be aware of potential CORS issues with external image URLs
-   For user-uploaded images, implement proper validation and processing

## Summary

`<mjo-avatar>` provides a comprehensive solution for displaying user avatars with intelligent fallback handling, automatic color generation, extensive customization options, and full accessibility support. The component gracefully handles image loading failures, supports multiple display modes (image, custom fallback icons, initials), and integrates seamlessly with the global design system.

Key features include:

-   **Smart Fallback System**: Prioritizes image → custom fallback icon → name initials → empty state
-   **Interactive Capabilities**: Optional `clickable` behavior with custom event values
-   **Automatic Color Generation**: `nameColoured` creates consistent colors based on initials
-   **Extensive Customization**: ThemeMixin support for instance-specific styling
-   **Semantic Color System**: Integrates with the global design tokens
-   **Full Accessibility Support**: WCAG 2.1 compliant with keyboard navigation, screen reader support, and dynamic ARIA attributes
-   **Error Handling**: Graceful fallback with `mjo-avatar-error` events for debugging
-   **Motion Preferences**: Respects user's `prefers-reduced-motion` setting

### Accessibility Highlights

-   **Keyboard Navigation**: Full Enter/Space key support for clickable avatars
-   **Screen Reader Support**: Intelligent ARIA labels and role management
-   **Focus Management**: Clear visual focus indicators with customizable colors
-   **State Communication**: Proper disabled state announcements
-   **Native HTML Support**: Uses standard HTML accessibility attributes through Lit

Use ThemeMixin for instance-specific customizations, leverage the semantic color system for consistent styling, take advantage of the clickable functionality for interactive user interfaces, and rely on the built-in accessibility features for inclusive design across your application.
