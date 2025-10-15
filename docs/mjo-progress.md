# mjo-progress

Accessible progress indicators supporting bar and circular variants with determinate and indeterminate states.

The `mjo-progress` component provides flexible progress visualization with support for both bar and circular variants. It offers determinate progress tracking with value changes, indeterminate animations for ongoing processes, multiple semantic colors, three size variants, and real-time event tracking with comprehensive accessibility support.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- **File upload progress**: Show the progress of file uploads or downloads
- **Form completion tracking**: Display how much of a multi-step form has been completed
- **Loading states**: Indicate ongoing processes with indeterminate animations
- **Task progress**: Track completion of tasks or processes in real-time
- **Goal tracking**: Visualize achievement or progress toward goals
- **Data processing**: Show the status of batch operations or data transformations

## Import

```typescript
import "mjo-litui/mjo-progress";
```

## Properties

| Property        | Type                                    | Description                                                                                                          | Default     | Required |
| --------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| `min`           | `number`                                | Minimum value for the progress range                                                                                 | `0`         | No       |
| `max`           | `number`                                | Maximum value for the progress range                                                                                 | `100`       | No       |
| `value`         | `number \| undefined`                   | Current progress value. When undefined, uses `min` value                                                             | `undefined` | No       |
| `showValue`     | `boolean`                               | Whether to display the formatted percentage value                                                                    | `false`     | No       |
| `indeterminate` | `boolean`                               | Whether to show an indeterminate loading animation                                                                   | `false`     | No       |
| `label`         | `string \| undefined`                   | Optional label text displayed above the progress indicator                                                           | `undefined` | No       |
| `formatOptions` | `Intl.NumberFormatOptions \| undefined` | Custom number format options for the displayed value                                                                 | `undefined` | No       |
| `color`         | `MjoProgressColor`                      | Semantic color of the progress indicator (`'primary'`, `'secondary'`, `'success'`, `'warning'`, `'error'`, `'info'`) | `'primary'` | No       |
| `size`          | `MjoProgressSize`                       | Size variant of the progress indicator (`'small'`, `'medium'`, `'large'`)                                            | `'medium'`  | No       |
| `variant`       | `MjoProgressVariant`                    | Visual variant of the progress indicator (`'bar'`, `'circle'`)                                                       | `'bar'`     | No       |

## Events

| Event                   | Type                       | Description                                          | Detail                                                            |
| ----------------------- | -------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| `mjo-progress:change`   | `MjoProgressChangeEvent`   | Fired when progress value, min, or max changes       | `{ value: number, percentage: number, min: number, max: number }` |
| `mjo-progress:complete` | `MjoProgressCompleteEvent` | Fired when progress value reaches or exceeds maximum | `{ value: number, min: number, max: number }`                     |

## CSS Variables

| Variable                                 | Description                                                  | Default                                     |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| `--mjo-progress-label-gap`               | Gap between label and progress indicator                     | `8px`                                       |
| `--mjo-progress-font-size`               | Font size for labels and values                              | `14px`                                      |
| `--mjo-progress-font-size-small`         | Font size for small variant                                  | `12px`                                      |
| `--mjo-progress-font-size-medium`        | Font size for circle value in medium variant                 | `10px`                                      |
| `--mjo-progress-font-size-large`         | Font size for large variant                                  | `16px`                                      |
| `--mjo-progress-font-weight`             | Font weight for labels                                       | `500`                                       |
| `--mjo-progress-background`              | Background color for track/circle background                 | `var(--mjo-background-color-high, #f5f5f5)` |
| `--mjo-progress-color`                   | Color of the progress fill/stroke (overrides color property) | Depends on `color` property                 |
| `--mjo-progress-bar-border-radius`       | Border radius for bar variant                                | `4px`                                       |
| `--mjo-progress-bar-border-radius-small` | Border radius for small bar variant                          | `3px`                                       |
| `--mjo-progress-bar-border-radius-large` | Border radius for large bar variant                          | `6px`                                       |
| `--mjo-progress-animation-duration`      | Duration of indeterminate animation                          | `2s`                                        |
| `--mjo-progress-circle-dash`             | Stroke dash array for medium circle indeterminate animation  | `40.84 122.52`                              |
| `--mjo-progress-circle-dash-small`       | Stroke dash array for small circle indeterminate animation   | `23.56 70.69`                               |
| `--mjo-progress-circle-dash-large`       | Stroke dash array for large circle indeterminate animation   | `62.83 188.5`                               |

## CSS Parts

| Part               | Description                                       | Element |
| ------------------ | ------------------------------------------------- | ------- |
| `container`        | The main progress wrapper element                 | `div`   |
| `bar-container`    | Container for the bar variant                     | `div`   |
| `bar-labels`       | Container for label and value text in bar variant | `div`   |
| `bar-label`        | Label text element in bar variant                 | `span`  |
| `bar-value`        | Value text element in bar variant                 | `span`  |
| `bar-track`        | Background track of the progress bar              | `div`   |
| `bar-fill`         | Filled portion of the progress bar                | `div`   |
| `circle-container` | Container for the circle variant                  | `div`   |
| `circle-label`     | Label text for circle variant                     | `div`   |
| `circle-wrapper`   | Wrapper around the SVG circle                     | `div`   |
| `circle-svg`       | The SVG element containing the progress circle    | `svg`   |
| `circle-value`     | Value text inside the circle                      | `div`   |

## Accessibility

### ARIA Roles and Attributes

The component implements proper ARIA attributes for screen reader support:

- `role="progressbar"`: Identifies the element as a progress indicator
- `aria-valuenow`: Current value (only in determinate state)
- `aria-valuemin`: Minimum value
- `aria-valuemax`: Maximum value
- `aria-label`: Accessible label from `ariaLabel` or `label` properties

### Best Practices

1. **Provide labels**: Use the `label` property to describe what is being tracked
2. **Use appropriate colors**: Choose semantic colors that match the context (e.g., `'success'` for completed tasks, `'error'` for failed operations)
3. **Show values when relevant**: Enable `showValue` for determinate progress where users benefit from seeing the percentage
4. **Use indeterminate for unknown duration**: Set `indeterminate` when the process duration is unknown
5. **Choose appropriate variants**: Use `'bar'` for horizontal spaces, `'circle'` for compact areas or dashboards

### Keyboard Interactions

The component is informational and does not require keyboard interactions. Screen readers will announce progress updates automatically when values change.

## Usage Examples

### Basic Progress Bar

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("my-component")
export class MyComponent extends LitElement {
    render() {
        return html` <mjo-progress label="Upload Progress" .value=${45} showValue></mjo-progress> `;
    }
}
```

### Circular Progress with Different Colors

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("my-dashboard")
export class MyDashboard extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 20px;">
                <mjo-progress variant="circle" color="success" .value=${80} showValue label="CPU Usage"></mjo-progress>

                <mjo-progress variant="circle" color="warning" .value=${65} showValue label="Memory"></mjo-progress>

                <mjo-progress variant="circle" color="error" .value=${95} showValue label="Disk Space"></mjo-progress>
            </div>
        `;
    }
}
```

### Indeterminate Loading State

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("my-loader")
export class MyLoader extends LitElement {
    @state() private loading = true;

    render() {
        return html` <mjo-progress label="Processing data..." ?indeterminate=${this.loading} variant="bar" color="primary"></mjo-progress> `;
    }
}
```

### Progress Event Handling

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-progress";
import type { MjoProgressChangeEvent, MjoProgressCompleteEvent } from "mjo-litui/types/mjo-progress";

@customElement("my-upload")
export class MyUpload extends LitElement {
    @state() private progress = 0;

    private handleChange(e: MjoProgressChangeEvent) {
        console.log(`Progress: ${e.detail.percentage.toFixed(1)}%`);
    }

    private handleComplete(e: MjoProgressCompleteEvent) {
        console.log("Upload complete!");
        alert("File uploaded successfully");
    }

    private simulateUpload() {
        this.progress = 0;
        const interval = setInterval(() => {
            this.progress += 10;
            if (this.progress >= 100) {
                clearInterval(interval);
            }
        }, 500);
    }

    render() {
        return html`
            <div>
                <mjo-progress
                    label="File Upload"
                    .value=${this.progress}
                    showValue
                    color="info"
                    @mjo-progress:change=${this.handleChange}
                    @mjo-progress:complete=${this.handleComplete}
                ></mjo-progress>

                <button @click=${this.simulateUpload}>Start Upload</button>
            </div>
        `;
    }
}
```

### Custom Formatting Options

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("my-progress-custom")
export class MyProgressCustom extends LitElement {
    render() {
        return html`
            <mjo-progress
                label="Download Progress"
                .value=${75.5}
                showValue
                .formatOptions=${{
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }}
            ></mjo-progress>
        `;
    }
}
```

### Different Sizes

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("my-progress-sizes")
export class MyProgressSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <mjo-progress size="small" .value=${60} label="Small Progress" showValue></mjo-progress>

                <mjo-progress size="medium" .value=${60} label="Medium Progress" showValue></mjo-progress>

                <mjo-progress size="large" .value=${60} label="Large Progress" showValue></mjo-progress>
            </div>
        `;
    }
}
```

### Styling with CSS Parts and Variables

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("my-styled-progress")
export class MyStyledProgress extends LitElement {
    static styles = css`
        mjo-progress {
            --mjo-progress-color: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            --mjo-progress-background: #e0e0e0;
            --mjo-progress-bar-border-radius: 10px;
            --mjo-progress-font-size: 16px;
            --mjo-progress-font-weight: 700;
        }

        mjo-progress::part(bar-fill) {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        mjo-progress::part(bar-label) {
            color: #333;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    `;

    render() {
        return html` <mjo-progress label="Custom Styled Progress" .value=${70} showValue></mjo-progress> `;
    }
}
```

### Real-World Multi-Step Form Progress

```typescript
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-progress";

@customElement("my-multi-step-form")
export class MyMultiStepForm extends LitElement {
    @state() private currentStep = 1;
    private totalSteps = 5;

    static styles = css`
        .form-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .step-content {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
        }

        .navigation {
            display: flex;
            gap: 10px;
            justify-content: space-between;
            margin-top: 20px;
        }
    `;

    private get progress() {
        return (this.currentStep / this.totalSteps) * 100;
    }

    private nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        }
    }

    private prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    render() {
        return html`
            <div class="form-container">
                <mjo-progress label="Form Completion" .value=${this.progress} showValue color="primary" size="large"></mjo-progress>

                <div class="step-content">
                    <h3>Step ${this.currentStep} of ${this.totalSteps}</h3>
                    <p>Form content for step ${this.currentStep}...</p>
                </div>

                <div class="navigation">
                    <button @click=${this.prevStep} ?disabled=${this.currentStep === 1}>Previous</button>
                    <button @click=${this.nextStep} ?disabled=${this.currentStep === this.totalSteps}>Next</button>
                </div>
            </div>
        `;
    }
}
```

## Additional Notes

- The component automatically calculates percentages based on `min`, `max`, and `value` properties
- When `indeterminate` is true, the `value` property is ignored and animations are shown
- The `complete` event fires only when transitioning from below max to at or above max value
- Circle variant automatically hides the value text in `small` size due to space constraints
- The component uses native `Intl.NumberFormat` for value formatting, allowing extensive customization
- All transitions and animations respect the user's motion preferences when properly configured in the theme
- The component is fully responsive and works well in flex and grid layouts
