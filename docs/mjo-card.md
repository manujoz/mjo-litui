# mjo-card

Simple, theme-aware card component providing a container with background, padding, shadow, and border radius customization through contrast levels and size variants.

## HTML Usage

```html
<mjo-card>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
</mjo-card>

<mjo-card contrast="high" radius="large">
    <p>High contrast card with large border radius.</p>
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

                <mjo-card>
                    <h3 style="margin: 0 0 1rem 0;">Card with Content</h3>
                    <p style="margin: 0 0 1rem 0;">Cards can contain any HTML content including text, images, buttons, and other components.</p>
                    <button style="padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #007bff; color: white; cursor: pointer;">Action</button>
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
            <div style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
                <h3 style="margin: 0 0 1rem 0;">Contrast Levels</h3>

                <mjo-card contrast="low">
                    <h4 style="margin: 0 0 0.5rem 0;">Low Contrast Card</h4>
                    <p style="margin: 0;">This card has low contrast with the background, creating a subtle appearance.</p>
                </mjo-card>

                <mjo-card contrast="normal">
                    <h4 style="margin: 0 0 0.5rem 0;">Normal Contrast Card (Default)</h4>
                    <p style="margin: 0;">This card has normal contrast, providing a balanced appearance.</p>
                </mjo-card>

                <mjo-card contrast="high">
                    <h4 style="margin: 0 0 0.5rem 0;">High Contrast Card</h4>
                    <p style="margin: 0;">This card has high contrast, making it stand out prominently from the background.</p>
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
                    <p style="margin: 0;">Sharp corners with no border radius.</p>
                </mjo-card>

                <mjo-card radius="small">
                    <h4 style="margin: 0 0 0.5rem 0;">Small Radius</h4>
                    <p style="margin: 0;">Slightly rounded corners.</p>
                </mjo-card>

                <mjo-card radius="medium">
                    <h4 style="margin: 0 0 0.5rem 0;">Medium Radius (Default)</h4>
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
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                <mjo-card variant="default" radius="medium">
                    <h4 style="margin: 0 0 0.5rem 0;">Default Variant</h4>
                    <p style="margin: 0;">Traditional rectangular card with standard corners and edges.</p>
                </mjo-card>

                <mjo-card variant="modern" radius="medium">
                    <h4 style="margin: 0 0 0.5rem 0;">Modern Variant</h4>
                    <p style="margin: 0;">Contemporary design with cut corners creating a sophisticated geometric appearance.</p>
                </mjo-card>

                <mjo-card variant="skew" radius="medium">
                    <h4 style="margin: 0 0 0.5rem 0;">Skew Variant</h4>
                    <p style="margin: 0;">Dynamic slanted design with parallelogram shape for modern, energetic layouts.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Combined Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-combined")
export class ExampleCardCombined extends LitElement {
    render() {
        return html`
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; padding: 1rem; background: #f8f9fa;">
                <mjo-card contrast="low" radius="small" variant="default">
                    <h4 style="margin: 0 0 0.5rem 0; color: #6c757d;">Subtle Default Card</h4>
                    <p style="margin: 0; font-size: 0.9rem;">Low contrast with small radius for minimal visual impact.</p>
                </mjo-card>

                <mjo-card contrast="normal" radius="medium" variant="modern">
                    <h4 style="margin: 0 0 0.5rem 0; color: #495057;">Balanced Modern Card</h4>
                    <p style="margin: 0;">Normal contrast with modern cut corners for contemporary design.</p>
                </mjo-card>

                <mjo-card contrast="high" radius="large" variant="skew">
                    <h4 style="margin: 0 0 0.5rem 0; color: #212529;">Prominent Skew Card</h4>
                    <p style="margin: 0;">High contrast with skewed shape for attention-grabbing content.</p>
                </mjo-card>

                <mjo-card contrast="high" radius="none" variant="default">
                    <h4 style="margin: 0 0 0.5rem 0;">Sharp Modern Card</h4>
                    <p style="margin: 0;">High contrast with no radius for a clean, modern look.</p>
                </mjo-card>

                <mjo-card contrast="normal" radius="medium" variant="modern">
                    <h4 style="margin: 0 0 0.5rem 0;">Geometric Design</h4>
                    <p style="margin: 0;">Modern variant with geometric cut corners adds visual interest.</p>
                </mjo-card>

                <mjo-card contrast="low" radius="small" variant="skew">
                    <h4 style="margin: 0 0 0.5rem 0;">Dynamic Layout</h4>
                    <p style="margin: 0;">Skewed variant creates dynamic, movement-oriented designs.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Dynamic Card Management Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-button";

@customElement("example-card-dynamic")
export class ExampleCardDynamic extends LitElement {
    @state() private currentContrast: "low" | "high" | "normal" = "normal";
    @state() private currentRadius: "none" | "small" | "medium" | "large" = "medium";
    @state() private currentVariant: "default" | "modern" | "skew" = "default";

    private contrastOptions: Array<"low" | "high" | "normal"> = ["low", "normal", "high"];
    private radiusOptions: Array<"none" | "small" | "medium" | "large"> = ["none", "small", "medium", "large"];
    private variantOptions: Array<"default" | "modern" | "skew"> = ["default", "modern", "skew"];

    private setContrast(contrast: "low" | "high" | "normal") {
        this.currentContrast = contrast;
    }

    private setRadius(radius: "none" | "small" | "medium" | "large") {
        this.currentRadius = radius;
    }

    private setVariant(variant: "default" | "modern" | "skew") {
        this.currentVariant = variant;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h3 style="margin: 0 0 1rem 0;">Dynamic Card Customization</h3>

                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                        <div>
                            <h4 style="margin: 0 0 0.5rem 0;">Contrast Level:</h4>
                            <div style="display: flex; gap: 0.5rem;">
                                ${this.contrastOptions.map(
                                    (contrast) => html`
                                        <mjo-button
                                            size="small"
                                            variant=${this.currentContrast === contrast ? "default" : "ghost"}
                                            @click=${() => this.setContrast(contrast)}
                                        >
                                            ${contrast}
                                        </mjo-button>
                                    `,
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 style="margin: 0 0 0.5rem 0;">Border Radius:</h4>
                            <div style="display: flex; gap: 0.5rem;">
                                ${this.radiusOptions.map(
                                    (radius) => html`
                                        <mjo-button
                                            size="small"
                                            variant=${this.currentRadius === radius ? "default" : "ghost"}
                                            @click=${() => this.setRadius(radius)}
                                        >
                                            ${radius}
                                        </mjo-button>
                                    `,
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 style="margin: 0 0 0.5rem 0;">Variant Style:</h4>
                            <div style="display: flex; gap: 0.5rem;">
                                ${this.variantOptions.map(
                                    (variant) => html`
                                        <mjo-button
                                            size="small"
                                            variant=${this.currentVariant === variant ? "default" : "ghost"}
                                            @click=${() => this.setVariant(variant)}
                                        >
                                            ${variant}
                                        </mjo-button>
                                    `,
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <mjo-card contrast=${this.currentContrast} radius=${this.currentRadius} variant=${this.currentVariant}>
                    <h4 style="margin: 0 0 1rem 0;">Interactive Card</h4>
                    <p style="margin: 0 0 1rem 0;">
                        Current settings: <strong>${this.currentContrast}</strong> contrast, <strong>${this.currentRadius}</strong> radius,
                        <strong>${this.currentVariant}</strong> variant
                    </p>
                    <p style="margin: 0; color: #6c757d; font-size: 0.9rem;">
                        Use the buttons above to see how different combinations affect the card's appearance and shape.
                    </p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Card Layout Patterns Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-avatar";

@customElement("example-card-layouts")
export class ExampleCardLayouts extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <!-- Profile Card -->
                <mjo-card contrast="high" radius="large">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <mjo-avatar
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                            size="large"
                            bordered
                        ></mjo-avatar>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 0.25rem 0;">John Doe</h3>
                            <p style="margin: 0; color: #6c757d;">Software Engineer</p>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Building amazing web experiences with modern technologies.</p>
                        </div>
                        <mjo-button variant="ghost" size="small">Follow</mjo-button>
                    </div>
                </mjo-card>

                <!-- Feature Card -->
                <mjo-card contrast="normal" radius="medium">
                    <div style="text-align: center; padding: 1rem 0;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                        <h3 style="margin: 0 0 1rem 0;">Fast Performance</h3>
                        <p style="margin: 0 0 1.5rem 0; color: #6c757d;">
                            Lightning-fast loading times and optimized performance for the best user experience.
                        </p>
                        <mjo-button color="primary">Learn More</mjo-button>
                    </div>
                </mjo-card>

                <!-- Stats Card -->
                <mjo-card contrast="low" radius="small">
                    <h3 style="margin: 0 0 1.5rem 0;">Dashboard Stats</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
                        <div>
                            <div style="font-size: 2rem; font-weight: bold; color: #28a745;">1,234</div>
                            <div style="font-size: 0.9rem; color: #6c757d;">Users</div>
                        </div>
                        <div>
                            <div style="font-size: 2rem; font-weight: bold; color: #007bff;">5,678</div>
                            <div style="font-size: 0.9rem; color: #6c757d;">Sessions</div>
                        </div>
                        <div>
                            <div style="font-size: 2rem; font-weight: bold; color: #ffc107;">9,012</div>
                            <div style="font-size: 0.9rem; color: #6c757d;">Page Views</div>
                        </div>
                    </div>
                </mjo-card>

                <!-- Article Card -->
                <mjo-card radius="large">
                    <div style="margin-bottom: 1rem;">
                        <div
                            style="height: 200px; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); border-radius: 8px; margin-bottom: 1rem;"
                        ></div>
                    </div>
                    <h3 style="margin: 0 0 0.5rem 0;">Getting Started with Web Components</h3>
                    <p style="margin: 0 0 1rem 0; color: #6c757d; font-size: 0.9rem;">
                        Learn how to build reusable, encapsulated HTML elements that work across modern web frameworks.
                    </p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.8rem; color: #6c757d;">Published 2 days ago</span>
                        <mjo-button variant="ghost" size="small">Read More</mjo-button>
                    </div>
                </mjo-card>
            </div>
        `;
    }
}
```

## Programmatic Control Example

```ts
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { MjoCard } from "mjo-litui";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-button";

@customElement("example-card-programmatic")
export class ExampleCardProgrammatic extends LitElement {
    @query("mjo-card") private card!: MjoCard;
    @state() private currentContrast: "low" | "high" | "normal" = "normal";
    @state() private currentRadius: "none" | "small" | "medium" | "large" = "medium";
    @state() private currentVariant: "default" | "modern" | "skew" = "default";

    private changeContrast() {
        const contrasts: Array<"low" | "high" | "normal"> = ["low", "normal", "high"];
        const currentIndex = contrasts.indexOf(this.currentContrast);
        const nextIndex = (currentIndex + 1) % contrasts.length;
        this.currentContrast = contrasts[nextIndex];
        this.card.setContrast(this.currentContrast);
    }

    private changeRadius() {
        const radiuses: Array<"none" | "small" | "medium" | "large"> = ["none", "small", "medium", "large"];
        const currentIndex = radiuses.indexOf(this.currentRadius);
        const nextIndex = (currentIndex + 1) % radiuses.length;
        this.currentRadius = radiuses[nextIndex];
        this.card.setRadius(this.currentRadius);
    }

    private changeVariant() {
        const variants: Array<"default" | "modern" | "skew"> = ["default", "modern", "skew"];
        const currentIndex = variants.indexOf(this.currentVariant);
        const nextIndex = (currentIndex + 1) % variants.length;
        this.currentVariant = variants[nextIndex];
        this.card.setVariant(this.currentVariant);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 1rem;">
                    <mjo-button @click=${this.changeContrast} variant="ghost"> Change Contrast (${this.currentContrast}) </mjo-button>
                    <mjo-button @click=${this.changeRadius} variant="ghost"> Change Radius (${this.currentRadius}) </mjo-button>
                    <mjo-button @click=${this.changeVariant} variant="ghost"> Change Variant (${this.currentVariant}) </mjo-button>
                </div>

                <mjo-card>
                    <h3 style="margin: 0 0 1rem 0;">Programmatically Controlled Card</h3>
                    <p style="margin: 0;">
                        This card's appearance is controlled using the <code>setContrast()</code>, <code>setRadius()</code>, and
                        <code>setVariant()</code> methods. Click the buttons above to see the changes.
                    </p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name       | Type                                       | Default     | Reflects | Description                                                        |
| ---------- | ------------------------------------------ | ----------- | -------- | ------------------------------------------------------------------ |
| `contrast` | `"low" \| "high" \| "normal" \| undefined` | `undefined` | yes      | Controls background contrast level relative to the page background |
| `radius`   | `"none" \| "small" \| "medium" \| "large"` | `"medium"`  | yes      | Controls border radius applied to the card container               |
| `variant`  | `"default" \| "modern" \| "skew"`          | `"default"` | yes      | Controls the visual style variant of the card shape and design     |

### Behavior Notes

-   Properties use `noAccessor: true` and are managed through attribute reflection
-   The `contrast` property affects background color variations through CSS variables
-   The `radius` property controls corner rounding from sharp to fully rounded
-   The `variant` property changes the card's visual style:
    -   `default`: Traditional rectangular card
    -   `modern`: Contemporary design with cut corners using clip-path
    -   `skew`: Dynamic slanted parallelogram shape using clip-path
-   All properties can be changed programmatically using `setContrast()`, `setRadius()`, and `setVariant()` methods

## Slots

| Slot      | Description                                     |
| --------- | ----------------------------------------------- |
| (default) | All content displayed inside the card container |

## Events

This component doesn't emit any custom events. It's a pure presentation component.

## Methods

| Method                                                        | Description                                 |
| ------------------------------------------------------------- | ------------------------------------------- |
| `setContrast(contrast: "low" \| "high" \| "normal")`          | Programmatically changes the contrast level |
| `setRadius(radius: "none" \| "small" \| "medium" \| "large")` | Programmatically changes the border radius  |
| `setVariant(variant: "default" \| "modern" \| "skew")`        | Programmatically changes the visual variant |

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
| `--mjo-card-padding`      | `--mjo-space-small`              | Internal padding          |
| `--mjo-card-box-shadow`   | `--mjo-box-shadow-1` → `inherit` | Card elevation shadow     |
| `--mjo-card-border`       | `none`                           | Card border styling       |
| `--mjo-card-border-color` | `transparent`                    | Border color for variants |

### Border Radius Variables

| Variable                   | Fallback                      | Used For                       |
| -------------------------- | ----------------------------- | ------------------------------ |
| `--mjo-card-radius-small`  | `--mjo-radius-small` → `4px`  | Small border radius            |
| `--mjo-card-radius-medium` | `--mjo-radius-medium` → `8px` | Medium border radius (default) |
| `--mjo-card-radius-large`  | `--mjo-radius-large` → `12px` | Large border radius            |

### Global System Integration

The card integrates with the global theme system through these fallback chains:

-   **Background**: `card-specific` → `global-card` → `default-value`
-   **Spacing**: `card-specific` → `global-spacing` → `fallback`
-   **Shadows**: `card-specific` → `global-shadow` → `inherit`
-   **Radius**: `card-specific` → `global-radius` → `pixel-value`

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-card-{property-name}`.

### MjoCardTheme Interface

```ts
interface MjoCardTheme {
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
        backgroundColorLow: "#ffffff",
        backgroundColorHigh: "#e9ecef",
        padding: "2rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        radiusSmall: "6px",
        radiusMedium: "12px",
        radiusLarge: "20px",
    };

    private accentTheme: MjoCardTheme = {
        backgroundColor: "#f0f9ff",
        backgroundColorHigh: "#e0f2fe",
        padding: "1.5rem",
        boxShadow: "0 0 0 1px #0ea5e9, 0 4px 6px -1px rgba(14, 165, 233, 0.1)",
        radiusLarge: "16px",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <mjo-card contrast="normal" radius="medium" .theme=${this.customTheme}>
                    <h3 style="margin: 0 0 1rem 0;">Custom Themed Card</h3>
                    <p style="margin: 0;">This card uses a custom theme with increased padding, custom shadows, and modified colors.</p>
                </mjo-card>

                <mjo-card contrast="high" radius="large" .theme=${this.accentTheme}>
                    <h3 style="margin: 0 0 1rem 0;">Accent Themed Card</h3>
                    <p style="margin: 0;">This card has a blue accent theme with custom border, background, and shadow styling.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## CSS Custom Properties Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-css-custom")
export class ExampleCardCssCustom extends LitElement {
    static styles = css`
        .gradient-card {
            --mjo-card-background-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --mjo-card-padding: 2rem;
            --mjo-card-box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            color: white;
        }

        .minimal-card {
            --mjo-card-background-color: transparent;
            --mjo-card-box-shadow: none;
            --mjo-card-padding: 0;
            border: 1px solid #e5e7eb;
        }

        .elevated-card {
            --mjo-card-box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            --mjo-card-padding: 2rem;
        }
    `;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <mjo-card class="gradient-card" radius="large">
                    <h3 style="margin: 0 0 1rem 0;">Gradient Background</h3>
                    <p style="margin: 0; opacity: 0.9;">Custom gradient background with enhanced shadow and white text.</p>
                </mjo-card>

                <mjo-card class="minimal-card" radius="medium">
                    <div style="padding: 1.5rem;">
                        <h3 style="margin: 0 0 1rem 0;">Minimal Style</h3>
                        <p style="margin: 0;">Transparent background with simple border for a minimal appearance.</p>
                    </div>
                </mjo-card>

                <mjo-card class="elevated-card" radius="large">
                    <h3 style="margin: 0 0 1rem 0;">Elevated Card</h3>
                    <p style="margin: 0;">Enhanced shadow and padding for a floating, elevated appearance.</p>
                </mjo-card>
            </div>
        `;
    }
}
```

## Card Grid Systems Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";

@customElement("example-card-grids")
export class ExampleCardGrids extends LitElement {
    static styles = css`
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }

        .masonry-grid {
            columns: 3;
            column-gap: 1rem;
        }

        .masonry-grid mjo-card {
            break-inside: avoid;
            margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
            .masonry-grid {
                columns: 1;
            }
        }
    `;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 3rem;">
                <div>
                    <h3>Responsive Card Grid</h3>
                    <div class="card-grid">
                        ${Array.from(
                            { length: 6 },
                            (_, i) => html`
                                <mjo-card contrast="normal" radius="medium">
                                    <h4 style="margin: 0 0 0.5rem 0;">Card ${i + 1}</h4>
                                    <p style="margin: 0;">Grid item that adapts to available space with responsive columns.</p>
                                </mjo-card>
                            `,
                        )}
                    </div>
                </div>

                <div>
                    <h3>Feature Cards</h3>
                    <div class="feature-grid">
                        <mjo-card contrast="high" radius="large">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
                                <h4 style="margin: 0 0 0.5rem 0;">Fast</h4>
                                <p style="margin: 0; font-size: 0.9rem;">Lightning-fast performance</p>
                            </div>
                        </mjo-card>

                        <mjo-card contrast="high" radius="large">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">🔒</div>
                                <h4 style="margin: 0 0 0.5rem 0;">Secure</h4>
                                <p style="margin: 0; font-size: 0.9rem;">Enterprise-grade security</p>
                            </div>
                        </mjo-card>

                        <mjo-card contrast="high" radius="large">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">📱</div>
                                <h4 style="margin: 0 0 0.5rem 0;">Responsive</h4>
                                <p style="margin: 0; font-size: 0.9rem;">Works on all devices</p>
                            </div>
                        </mjo-card>
                    </div>
                </div>

                <div>
                    <h3>Masonry Layout</h3>
                    <div class="masonry-grid">
                        <mjo-card radius="medium">
                            <h4 style="margin: 0 0 1rem 0;">Short Content</h4>
                            <p style="margin: 0;">Brief description.</p>
                        </mjo-card>

                        <mjo-card radius="medium">
                            <h4 style="margin: 0 0 1rem 0;">Medium Content</h4>
                            <p style="margin: 0;">
                                This card has more content than the previous one, demonstrating how masonry layout handles varying content heights gracefully.
                            </p>
                        </mjo-card>

                        <mjo-card radius="medium">
                            <h4 style="margin: 0 0 1rem 0;">Longer Content</h4>
                            <p style="margin: 0 0 1rem 0;">
                                This card contains significantly more content to show how the masonry layout automatically adjusts the positioning of cards
                                based on their natural height.
                            </p>
                            <p style="margin: 0;">The masonry layout creates a Pinterest-like grid where cards flow naturally without gaps.</p>
                        </mjo-card>

                        <mjo-card radius="medium">
                            <h4 style="margin: 0 0 1rem 0;">Another Card</h4>
                            <p style="margin: 0;">Content flows naturally in columns.</p>
                        </mjo-card>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Accessibility Notes

-   The card component is semantically neutral and doesn't impose specific accessibility requirements
-   Consider adding appropriate ARIA attributes when cards contain interactive content:
    -   `role="article"` for content cards
    -   `role="region"` with `aria-label` for distinct sections
    -   `tabindex="0"` for focusable cards
-   Ensure sufficient color contrast between card backgrounds and text content
-   For clickable cards, add proper keyboard navigation support

```html
<!-- Example with enhanced accessibility -->
<mjo-card role="article" tabindex="0" aria-label="Product feature overview">
    <h3>Feature Title</h3>
    <p>Feature description...</p>
</mjo-card>
```

## Performance Considerations

-   The card component is lightweight with minimal DOM overhead
-   CSS variables enable efficient theme switching without style recalculation
-   Use CSS containment for large card grids to improve rendering performance
-   Consider implementing virtual scrolling for extensive card lists

## CSS Parts

| Part      | Description                    |
| --------- | ------------------------------ |
| `content` | The internal content container |

## Design Guidelines

-   **Spacing**: Use consistent padding through CSS variables rather than inline styles
-   **Hierarchy**: Establish visual hierarchy through contrast levels (low → normal → high)
-   **Grouping**: Use similar radius and contrast settings for related card groups
-   **Responsive**: Leverage CSS Grid or Flexbox for responsive card layouts
-   **Content**: Keep card content focused and scannable

## Integration with Other Components

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-avatar";
import "mjo-litui/mjo-chip";

@customElement("example-card-integration")
export class ExampleCardIntegration extends LitElement {
    render() {
        return html`
            <mjo-card contrast="high" radius="large">
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Header with avatar -->
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <mjo-avatar name="Sarah Connor" nameColoured bordered></mjo-avatar>
                        <div style="flex: 1;">
                            <h3 style="margin: 0;">Sarah Connor</h3>
                            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                                <mjo-chip size="small" color="success">Active</mjo-chip>
                                <mjo-chip size="small" color="info">Premium</mjo-chip>
                            </div>
                        </div>
                    </div>

                    <!-- Content -->
                    <p style="margin: 0; color: #6c757d;">
                        Cyberdyne Systems expert specializing in artificial intelligence and machine learning applications.
                    </p>

                    <!-- Actions -->
                    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                        <mjo-button variant="ghost" size="small">Message</mjo-button>
                        <mjo-button color="primary" size="small">Connect</mjo-button>
                    </div>
                </div>
            </mjo-card>
        `;
    }
}
```

## Summary

`<mjo-card>` provides a flexible, theme-aware container component with built-in support for contrast levels and border radius variations. The component integrates seamlessly with the global design system through CSS variables and supports extensive customization via ThemeMixin. Use cards to group related content, create visual hierarchy through contrast levels, and maintain consistent spacing and shadows across your application. The component's simplicity makes it ideal for composition with other UI elements to create complex layouts and interfaces.
