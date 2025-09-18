# mjo-progress

Accessible progress indicators supporting bar and circular variants with determinate and indeterminate states, multiple sizes, semantic colors, and real-time event tracking.

## HTML Usage

```html
<mjo-progress value="50" label="Loading data..."></mjo-progress>
<mjo-progress variant="circle" value="75" showValue color="success"></mjo-progress>
<mjo-progress indeterminate label="Processing..."></mjo-progress>
<mjo-progress min="0" max="200" value="150" showValue></mjo-progress>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("example-progress-basic")
export class ExampleProgressBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-progress value="25" label="Basic Progress" showValue></mjo-progress>
                <mjo-progress variant="circle" value="75" showValue color="primary"></mjo-progress>
                <mjo-progress indeterminate label="Loading..."></mjo-progress>
            </div>
        `;
    }
}
```

## Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("example-progress-variants")
export class ExampleProgressVariants extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Bar Progress</h4>
                    <mjo-progress value="40" label="Upload Progress" showValue></mjo-progress>
                </div>

                <div>
                    <h4>Circle Progress</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-progress variant="circle" value="60" showValue size="small"></mjo-progress>
                        <mjo-progress variant="circle" value="60" showValue size="medium"></mjo-progress>
                        <mjo-progress variant="circle" value="60" showValue size="large"></mjo-progress>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Colors and Sizes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("example-progress-colors")
export class ExampleProgressColors extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-progress value="60" color="success" label="Success" showValue></mjo-progress>
                <mjo-progress value="60" color="warning" label="Warning" showValue></mjo-progress>
                <mjo-progress value="70" size="small" label="Small size" showValue></mjo-progress>
                <mjo-progress value="70" size="large" label="Large size" showValue></mjo-progress>
            </div>
        `;
    }
}
```

## Interactive Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-progress";
import "mjo-litui/mjo-button";

@customElement("example-progress-interactive")
export class ExampleProgressInteractive extends LitElement {
    @state() private progress = 0;
    @state() private isAnimating = false;

    private animate() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.progress = 0;

        const interval = setInterval(() => {
            this.progress += 2;
            if (this.progress >= 100) {
                clearInterval(interval);
                this.isAnimating = false;
            }
        }, 50);
    }

    private handleProgressChange(e: CustomEvent) {
        console.log("Progress changed:", e.detail);
    }

    private handleProgressComplete(e: CustomEvent) {
        console.log("Progress completed!", e.detail);
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-progress
                    .value=${this.progress}
                    label="Animated Progress"
                    showValue
                    color="success"
                    @mjo-progress:change=${this.handleProgressChange}
                    @mjo-progress:complete=${this.handleProgressComplete}
                ></mjo-progress>

                <mjo-button @click=${this.animate} ?disabled=${this.isAnimating} variant="flat">
                    ${this.isAnimating ? "Animating..." : "Start Animation"}
                </mjo-button>
            </div>
        `;
    }
}
```

## Indeterminate States Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("example-progress-indeterminate")
export class ExampleProgressIndeterminate extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Bar Indeterminate</h4>
                    <mjo-progress indeterminate label="Processing data..."></mjo-progress>
                </div>

                <div>
                    <h4>Circle Indeterminate</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-progress variant="circle" indeterminate label="Loading..." size="small"></mjo-progress>
                        <mjo-progress variant="circle" indeterminate label="Processing..." size="medium"></mjo-progress>
                        <mjo-progress variant="circle" indeterminate label="Syncing..." size="large"></mjo-progress>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Custom Range Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("example-progress-range")
export class ExampleProgressRange extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <mjo-progress min="10" max="50" value="30" label="Custom Range (10-50)" showValue></mjo-progress>
                <mjo-progress min="0" max="200" value="150" label="Large Numbers (0-200)" showValue></mjo-progress>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name            | Type                                                                      | Default     | Reflects | Description                                       |
| --------------- | ------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------------- |
| `min`           | `number`                                                                  | `0`         | no       | Minimum value of the progress range               |
| `max`           | `number`                                                                  | `100`       | no       | Maximum value of the progress range               |
| `value`         | `number \| undefined`                                                     | `undefined` | no       | Current progress value (uses `min` if undefined)  |
| `showValue`     | `boolean`                                                                 | `false`     | no       | Display formatted percentage value                |
| `indeterminate` | `boolean`                                                                 | `false`     | yes      | Shows animated indeterminate state                |
| `label`         | `string \| undefined`                                                     | `undefined` | no       | Text label displayed above the progress indicator |
| `formatOptions` | `Intl.NumberFormatOptions \| undefined`                                   | `undefined` | no       | Custom formatting options for percentage display  |
| `color`         | `"primary" \| "secondary" \| "success" \| "warning" \| "error" \| "info"` | `"primary"` | no       | Semantic color theme                              |
| `size`          | `"small" \| "medium" \| "large"`                                          | `"medium"`  | no       | Overall size of the progress indicator            |
| `variant`       | `"bar" \| "circle"`                                                       | `"bar"`     | no       | Visual style variant                              |

### Internal State

| Name            | Type                  | Description                                         |
| --------------- | --------------------- | --------------------------------------------------- |
| `previousValue` | `number \| undefined` | Tracks previous value for change/complete detection |

### Behavior Notes

- Progress percentage is calculated as: `((value - min) / (max - min)) * 100`
- When `indeterminate` is true, animations show continuous activity regardless of `value`
- `mjo-progress:complete` event fires when value reaches or exceeds `max`
- Circle variant automatically adjusts SVG dimensions based on size
- Bar heights are fixed per size: small (6px), medium (8px), large (12px)

## Events

| Event                   | Detail                            | Emitted When                 | Notes                                         |
| ----------------------- | --------------------------------- | ---------------------------- | --------------------------------------------- |
| `mjo-progress:change`   | `{ value, percentage, min, max }` | Value, min, or max changes   | Fires on any progress value change            |
| `mjo-progress:complete` | `{ value, min, max }`             | Value reaches or exceeds max | Only fires when crossing completion threshold |

### Event Details

#### MjoProgressChangeEvent

- `value`: Current progress value
- `percentage`: Calculated percentage (0-100)
- `min`: Minimum value
- `max`: Maximum value

#### MjoProgressCompleteEvent

- `value`: Final value that triggered completion
- `min`: Minimum value
- `max`: Maximum value

## CSS Parts

The component exposes several CSS parts for granular styling control:

| Part Name          | Description                                    | Variant     |
| ------------------ | ---------------------------------------------- | ----------- |
| `container`        | Main progress wrapper element                  | Both        |
| `bar-container`    | Container for the bar variant                  | Bar only    |
| `bar-labels`       | Container for label and value text             | Bar only    |
| `bar-label`        | Label text element                             | Bar only    |
| `bar-value`        | Value text element                             | Bar only    |
| `bar-track`        | Background track of the progress bar           | Bar only    |
| `bar-fill`         | Filled portion of the progress bar             | Bar only    |
| `circle-container` | Container for the circle variant               | Circle only |
| `circle-label`     | Label text for circle variant                  | Circle only |
| `circle-wrapper`   | Wrapper around the SVG circle                  | Circle only |
| `circle-svg`       | The SVG element containing the progress circle | Circle only |
| `circle-value`     | Value text inside the circle                   | Circle only |

### CSS Parts Example

```css
/* Style the progress bar track */
mjo-progress::part(bar-track) {
    background: linear-gradient(90deg, #f0f0f0, #e0e0e0);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Style the progress bar fill */
mjo-progress::part(bar-fill) {
    background: linear-gradient(90deg, #4e9be4, #357abd);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Style circle labels */
mjo-progress::part(circle-label) {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

## CSS Variables

The component provides extensive customization through CSS variables with intelligent fallbacks.

### Layout and Typography

| Variable                     | Default | Used For                           |
| ---------------------------- | ------- | ---------------------------------- |
| `--mjo-progress-label-gap`   | `8px`   | Gap between label and progress bar |
| `--mjo-progress-font-size`   | `14px`  | Base font size for labels/values   |
| `--mjo-progress-font-weight` | `500`   | Font weight for text content       |

### Size-Specific Typography

| Variable                          | Fallback                            | Used For                 |
| --------------------------------- | ----------------------------------- | ------------------------ |
| `--mjo-progress-font-size-small`  | `--mjo-progress-font-size` (`12px`) | Small variant text size  |
| `--mjo-progress-font-size-medium` | `10px`                              | Medium circle value size |
| `--mjo-progress-font-size-large`  | `--mjo-progress-font-size` (`16px`) | Large variant text size  |

### Colors

| Variable                    | Fallback                                  | Used For                   |
| --------------------------- | ----------------------------------------- | -------------------------- |
| `--mjo-progress-color`      | Semantic color (see below)                | Progress fill/stroke color |
| `--mjo-progress-background` | `--mjo-background-color-high` (`#f5f5f5`) | Track background color     |

### Border Radius

| Variable                                 | Default | Used For                |
| ---------------------------------------- | ------- | ----------------------- |
| `--mjo-progress-bar-border-radius`       | `4px`   | Base bar corner radius  |
| `--mjo-progress-bar-border-radius-small` | `3px`   | Small bar corner radius |
| `--mjo-progress-bar-border-radius-large` | `6px`   | Large bar corner radius |

### Animation

| Variable                            | Default | Used For                           |
| ----------------------------------- | ------- | ---------------------------------- |
| `--mjo-progress-animation-duration` | `2s`    | Indeterminate animation cycle time |

### Indeterminate Circle Animation

| Variable                           | Calculated     | Used For                   |
| ---------------------------------- | -------------- | -------------------------- |
| `--mjo-progress-circle-dash`       | `40.84 122.52` | Medium circle dash pattern |
| `--mjo-progress-circle-dash-small` | `23.56 70.69`  | Small circle dash pattern  |
| `--mjo-progress-circle-dash-large` | `62.83 188.5`  | Large circle dash pattern  |

### Semantic Colors

The component automatically uses semantic colors based on the `color` prop:

| Color       | CSS Variable            | Fallback  |
| ----------- | ----------------------- | --------- |
| `primary`   | `--mjo-primary-color`   | `#4e9be4` |
| `secondary` | `--mjo-secondary-color` | `#7dc717` |
| `success`   | `--mjo-color-success`   | `#4caf50` |
| `warning`   | `--mjo-color-warning`   | `#ff9800` |
| `error`     | `--mjo-color-error`     | `#f44336` |
| `info`      | `--mjo-color-info`      | `#2196f3` |

## ThemeMixin Customization

This component supports `ThemeMixin` for instance-specific customization. Properties are converted to CSS variables with the pattern: `--mjo-progress-{property-name}`.

### MjoProgressTheme Interface

```ts
interface MjoProgressTheme {
    labelGap?: string;
    fontSize?: string;
    fontWeight?: string;
    fontSizeSmall?: string;
    fontSizeMedium?: string;
    fontSizeLarge?: string;
    color?: string;
    background?: string;
    barBorderRadius?: string;
    barBorderRadiusSmall?: string;
    barBorderRadiusLarge?: string;
    animationDuration?: string;
    circleDash?: string;
    circleDashSmall?: string;
    circleDashLarge?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("example-progress-themed")
export class ExampleProgressThemed extends LitElement {
    private customTheme = {
        color: "#7c3aed",
        background: "#f3f4f6",
        fontSize: "16px",
        fontWeight: "600",
        barBorderRadius: "8px",
        animationDuration: "1.5s",
    };

    render() {
        return html` <mjo-progress value="65" label="Custom Themed Progress" showValue .theme=${this.customTheme}></mjo-progress> `;
    }
}
```

## Accessibility Features

The component provides comprehensive accessibility support following WCAG 2.1 guidelines:

### ARIA Support

- **`role="progressbar"`**: Identifies the element as a progress indicator
- **`aria-valuenow`**: Current progress value (omitted for indeterminate)
- **`aria-valuemin`**: Minimum value from `min` property
- **`aria-valuemax`**: Maximum value from `max` property
- **`aria-label`**: Uses `ariaLabel` prop or falls back to `label` property

### Screen Reader Support

- Progress changes are announced through value updates
- Completion events provide auditory feedback
- Indeterminate state is properly communicated
- Labels provide context about what's progressing

### Motion Preferences

- Respects `prefers-reduced-motion` user setting
- Indeterminate animations are reduced or replaced with static patterns
- Smooth transitions honor motion preferences

### Keyboard Navigation

While progress indicators are typically not interactive, the component properly handles:

- Focus management when part of larger interfaces
- Programmatic focus if needed for custom interactions

## Performance Considerations

- Circle SVG dimensions are calculated efficiently using getters
- Indeterminate animations use CSS transforms for optimal performance
- Event dispatching is optimized to prevent unnecessary updates
- Value changes only trigger events when actual values differ

## Best Practices

### Value Display

```html
<!-- Good: Show values for user feedback -->
<mjo-progress value="45" label="Upload progress" showValue></mjo-progress>

<!-- Good: Hide values when not meaningful -->
<mjo-progress indeterminate label="Analyzing data..."></mjo-progress>
```

### Semantic Colors

```html
<!-- Good: Use semantic colors appropriately -->
<mjo-progress value="90" color="success" label="Download complete"></mjo-progress>
<mjo-progress value="25" color="warning" label="Low battery"></mjo-progress>
<mjo-progress value="95" color="error" label="Storage almost full"></mjo-progress>
```

### Custom Ranges

```html
<!-- Good: Custom ranges with clear labeling -->
<mjo-progress min="1000" max="5000" value="3500" label="API calls remaining: 1,500 of 4,000" showValue></mjo-progress>
```

## Summary

`<mjo-progress>` provides a fully accessible, flexible progress indicator supporting both determinate and indeterminate states. The component offers:

- **Dual Variants**: Bar and circular progress indicators
- **Semantic Colors**: Six semantic color options integrated with the design system
- **Flexible Sizing**: Three size variants with proportional scaling
- **Smart Events**: Real-time change tracking and completion detection
- **Custom Ranges**: Support for any numeric range beyond 0-100
- **Accessibility**: WCAG 2.1 compliant with comprehensive ARIA support
- **Motion Respect**: Honors user motion preferences
- **Theme Integration**: Full ThemeMixin support for custom styling

The component automatically handles percentage calculations, provides intelligent fallbacks for all CSS variables, and includes built-in animations that respect user preferences. Use it for file uploads, data processing, loading states, or any scenario requiring progress visualization with proper accessibility support.
