# mjo-color-picker

Form-integrated color picker component providing visual color selection with validation, accessibility features, and theme customization through multiple size options and styling variants.

## HTML Usage

```html
<mjo-color-picker label="Background Color" name="bgColor" value="#3b82f6"></mjo-color-picker>
<mjo-color-picker color="secondary" size="large" rounded></mjo-color-picker>
<mjo-color-picker helperText="Choose your preferred color" required></mjo-color-picker>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-basic")
export class ExampleColorPickerBasic extends LitElement {
    render() {
        return html`
            <div style="display: flex; gap: 1rem; align-items: center;">
                <mjo-color-picker label="Primary Color" value="#3b82f6"></mjo-color-picker>
                <mjo-color-picker label="Secondary Color" color="secondary" value="#6b7280"></mjo-color-picker>
                <mjo-color-picker label="Success Color" value="#10b981"></mjo-color-picker>
            </div>
        `;
    }
}
```

## Sizes and Variants Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-sizes")
export class ExampleColorPickerSizes extends LitElement {
    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Size Variants</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Small" size="small" value="#ef4444"></mjo-color-picker>
                        <mjo-color-picker label="Medium (Default)" size="medium" value="#3b82f6"></mjo-color-picker>
                        <mjo-color-picker label="Large" size="large" value="#10b981"></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Rounded Variants</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Small Rounded" size="small" rounded value="#f59e0b"></mjo-color-picker>
                        <mjo-color-picker label="Medium Rounded" size="medium" rounded value="#8b5cf6"></mjo-color-picker>
                        <mjo-color-picker label="Large Rounded" size="large" rounded value="#ec4899"></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Color Schemes</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Primary Color" color="primary" value="#3b82f6"></mjo-color-picker>
                        <mjo-color-picker label="Secondary Color" color="secondary" value="#6b7280"></mjo-color-picker>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Form Integration Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { MjoFormResponse } from "mjo-litui/types";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-button";
import "mjo-litui/mjo-textfield";

@customElement("example-color-picker-form")
export class ExampleColorPickerForm extends LitElement {
    @state() private formData: Record<string, string> = {};
    @state() private submitted = false;

    private handleFormSubmit(event: CustomEvent<{ response: MjoFormResponse }>) {
        const { response } = event.detail;

        if (!response.error) {
            this.formData = response.data || {};
            this.submitted = true;

            // Simulate async operation
            setTimeout(() => {
                const submitButton = response.submitButton;
                if (submitButton) {
                    submitButton.loading = false;
                }
            }, 1500);
        }
    }

    private resetForm() {
        this.formData = {};
        this.submitted = false;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Theme Configuration Form</h4>
                    <mjo-form @submit=${this.handleFormSubmit}>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <mjo-textfield label="Theme Name" name="themeName" required helperText="Enter a name for your theme"></mjo-textfield>

                            <mjo-color-picker
                                label="Primary Color"
                                name="primaryColor"
                                value="#3b82f6"
                                required
                                helperText="Main brand color"
                            ></mjo-color-picker>

                            <mjo-color-picker label="Secondary Color" name="secondaryColor" color="secondary" value="#6b7280" required></mjo-color-picker>

                            <mjo-color-picker label="Accent Color" name="accentColor" value="#10b981" size="large"></mjo-color-picker>

                            <mjo-color-picker label="Background Color" name="backgroundColor" value="#ffffff" rounded></mjo-color-picker>

                            <mjo-color-picker label="Text Color" name="textColor" value="#1f2937" size="small"></mjo-color-picker>
                        </div>

                        <div style="display: flex; gap: 0.5rem;">
                            <mjo-button type="submit" color="primary">Save Theme</mjo-button>
                            <mjo-button type="button" variant="ghost" @click=${this.resetForm}>Reset</mjo-button>
                        </div>
                    </mjo-form>
                </div>

                ${this.submitted
                    ? html`
                          <div style="padding: 1rem; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px;">
                              <h5 style="margin: 0 0 0.5rem 0; color: #0369a1;">Form Submitted Successfully!</h5>
                              <div style="display: grid; grid-template-columns: auto 1fr; gap: 0.5rem; font-size: 0.9rem;">
                                  ${Object.entries(this.formData).map(
                                      ([key, value]) => html`
                                          <span style="font-weight: 500;">${key}:</span>
                                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                                              ${key.includes("Color")
                                                  ? html`
                                                        <div
                                                            style="width: 20px; height: 20px; background-color: ${value}; border: 1px solid #ccc; border-radius: 4px;"
                                                        ></div>
                                                    `
                                                  : ""}
                                              <span>${value}</span>
                                          </div>
                                      `,
                                  )}
                              </div>
                          </div>
                      `
                    : ""}
            </div>
        `;
    }
}
```

## Validation and States Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-button";

@customElement("example-color-picker-validation")
export class ExampleColorPickerValidation extends LitElement {
    @state() private selectedColor = "#3b82f6";
    @state() private isDisabled = false;

    private handleColorChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.selectedColor = target.value;
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Required Validation</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Required Color" name="requiredColor" required helperText="This field is required"></mjo-color-picker>
                        <mjo-color-picker label="Optional Color" name="optionalColor" helperText="This field is optional" value="#10b981"></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Disabled State</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker
                            label="Disabled Color Picker"
                            ?disabled=${this.isDisabled}
                            value="#ef4444"
                            helperText="This picker can be disabled"
                        ></mjo-color-picker>
                        <mjo-button @click=${this.toggleDisabled} variant="ghost"> ${this.isDisabled ? "Enable" : "Disable"} </mjo-button>
                    </div>
                </div>

                <div>
                    <h4>Interactive Color Selection</h4>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <mjo-color-picker label="Select Color" .value=${this.selectedColor} @change=${this.handleColorChange} size="large"></mjo-color-picker>
                        <div
                            style="padding: 1rem; background-color: ${this
                                .selectedColor}; color: white; border-radius: 8px; min-width: 120px; text-align: center;"
                        >
                            Selected: ${this.selectedColor}
                        </div>
                    </div>
                </div>

                <div>
                    <h4>Helper Text Examples</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <mjo-color-picker label="Brand Color" value="#3b82f6" helperText="Choose your main brand color"></mjo-color-picker>
                        <mjo-color-picker
                            label="Accent Color"
                            value="#10b981"
                            helperText="Pick a complementary accent color"
                            color="secondary"
                        ></mjo-color-picker>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Real-World Use Cases Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-card";
import "mjo-litui/mjo-button";

@customElement("example-color-picker-use-cases")
export class ExampleColorPickerUseCases extends LitElement {
    @state() private uiColors = {
        primary: "#3b82f6",
        secondary: "#6b7280",
        background: "#ffffff",
        text: "#1f2937",
        accent: "#10b981",
    };

    @state() private chartColors = {
        series1: "#3b82f6",
        series2: "#ef4444",
        series3: "#10b981",
        series4: "#f59e0b",
    };

    private updateUIColor(property: keyof typeof this.uiColors, value: string) {
        this.uiColors = { ...this.uiColors, [property]: value };
    }

    private updateChartColor(property: keyof typeof this.chartColors, value: string) {
        this.chartColors = { ...this.chartColors, [property]: value };
    }

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 3rem;">
                <!-- UI Theme Designer -->
                <div>
                    <h4>UI Theme Designer</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h5>Color Configuration</h5>
                            <div style="display: flex; flex-direction: column; gap: 1rem;">
                                <mjo-color-picker
                                    label="Primary Color"
                                    .value=${this.uiColors.primary}
                                    @change=${(e: Event) => this.updateUIColor("primary", (e.target as HTMLInputElement).value)}
                                    helperText="Main brand color"
                                ></mjo-color-picker>
                                <mjo-color-picker
                                    label="Secondary Color"
                                    .value=${this.uiColors.secondary}
                                    @change=${(e: Event) => this.updateUIColor("secondary", (e.target as HTMLInputElement).value)}
                                    color="secondary"
                                ></mjo-color-picker>
                                <mjo-color-picker
                                    label="Background Color"
                                    .value=${this.uiColors.background}
                                    @change=${(e: Event) => this.updateUIColor("background", (e.target as HTMLInputElement).value)}
                                    size="small"
                                ></mjo-color-picker>
                                <mjo-color-picker
                                    label="Text Color"
                                    .value=${this.uiColors.text}
                                    @change=${(e: Event) => this.updateUIColor("text", (e.target as HTMLInputElement).value)}
                                    size="small"
                                ></mjo-color-picker>
                                <mjo-color-picker
                                    label="Accent Color"
                                    .value=${this.uiColors.accent}
                                    @change=${(e: Event) => this.updateUIColor("accent", (e.target as HTMLInputElement).value)}
                                    rounded
                                ></mjo-color-picker>
                            </div>
                        </div>

                        <div>
                            <h5>Live Preview</h5>
                            <mjo-card
                                style="
                                    background-color: ${this.uiColors.background}; 
                                    color: ${this.uiColors.text};
                                    border: 1px solid ${this.uiColors.secondary};
                                "
                            >
                                <div style="padding: 1rem;">
                                    <h6 style="margin: 0 0 1rem 0; color: ${this.uiColors.primary};">Sample UI Component</h6>
                                    <p style="margin: 0 0 1rem 0;">This preview shows how your selected colors work together in a real interface.</p>
                                    <div style="display: flex; gap: 0.5rem;">
                                        <mjo-button style="--mjo-primary-color: ${this.uiColors.primary};">Primary Button</mjo-button>
                                        <mjo-button variant="ghost" style="--mjo-secondary-color: ${this.uiColors.secondary};">Secondary</mjo-button>
                                    </div>
                                    <div
                                        style="margin-top: 1rem; padding: 0.5rem; background-color: ${this.uiColors.accent}20; border-left: 3px solid ${this
                                            .uiColors.accent};"
                                    >
                                        <small>Accent color used for highlights and emphasis</small>
                                    </div>
                                </div>
                            </mjo-card>
                        </div>
                    </div>
                </div>

                <!-- Chart Color Palette -->
                <div>
                    <h4>Chart Color Palette</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h5>Data Series Colors</h5>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <mjo-color-picker
                                    label="Series 1"
                                    .value=${this.chartColors.series1}
                                    @change=${(e: Event) => this.updateChartColor("series1", (e.target as HTMLInputElement).value)}
                                    size="large"
                                ></mjo-color-picker>
                                <mjo-color-picker
                                    label="Series 2"
                                    .value=${this.chartColors.series2}
                                    @change=${(e: Event) => this.updateChartColor("series2", (e.target as HTMLInputElement).value)}
                                    size="large"
                                ></mjo-color-picker>
                                <mjo-color-picker
                                    label="Series 3"
                                    .value=${this.chartColors.series3}
                                    @change=${(e: Event) => this.updateChartColor("series3", (e.target as HTMLInputElement).value)}
                                    size="large"
                                ></mjo-color-picker>
                                <mjo-color-picker
                                    label="Series 4"
                                    .value=${this.chartColors.series4}
                                    @change=${(e: Event) => this.updateChartColor("series4", (e.target as HTMLInputElement).value)}
                                    size="large"
                                ></mjo-color-picker>
                            </div>
                        </div>

                        <div>
                            <h5>Chart Preview</h5>
                            <div style="padding: 1rem; background: #f9fafb; border-radius: 8px;">
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    ${Object.entries(this.chartColors).map(([series, color], index) => {
                                        const width = [85, 65, 45, 75][index];
                                        return html`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 2px;"></div>
                                                <div style="flex: 1; background: #e5e7eb; height: 20px; border-radius: 4px; overflow: hidden;">
                                                    <div style="height: 100%; background-color: ${color}; width: ${width}%; transition: all 0.3s ease;"></div>
                                                </div>
                                                <span style="font-size: 0.8rem; color: #6b7280; min-width: 40px;">${width}%</span>
                                            </div>
                                        `;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Customization -->
                <div>
                    <h4>Product Customization</h4>
                    <div style="display: flex; gap: 2rem; align-items: start;">
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <h5>Customize Your Product</h5>
                            <mjo-color-picker label="Primary Color" value="#3b82f6" size="large" rounded helperText="Choose the main color"></mjo-color-picker>
                            <mjo-color-picker label="Accent Color" value="#10b981" size="large" rounded helperText="Pick an accent color"></mjo-color-picker>
                            <mjo-color-picker label="Text Color" value="#1f2937" size="medium" helperText="Select text color"></mjo-color-picker>
                        </div>

                        <div style="flex: 1; text-align: center;">
                            <h5>Product Preview</h5>
                            <div
                                style="display: inline-block; padding: 2rem; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; border: 2px solid #e5e7eb;"
                            >
                                <div
                                    style="width: 120px; height: 80px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
                                >
                                    <span style="font-size: 0.9rem; color: #6b7280;">Product Preview</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Custom Themes Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoColorPickerTheme } from "mjo-litui/types";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-themes")
export class ExampleColorPickerThemes extends LitElement {
    private compactTheme: MjoColorPickerTheme = {
        sizeSmall: "16px",
        sizeMedium: "24px",
        sizeLarge: "32px",
        borderWidth: "1px",
        radius: "4px",
    };

    private roundedTheme: MjoColorPickerTheme = {
        sizeSmall: "24px",
        sizeMedium: "32px",
        sizeLarge: "48px",
        borderWidth: "2px",
        radius: "50%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    private borderTheme: MjoColorPickerTheme = {
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "#6b7280",
        sizeSmall: "20px",
        sizeMedium: "28px",
        sizeLarge: "36px",
    };

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Compact Theme</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Small Compact" size="small" value="#ef4444" .theme=${this.compactTheme}></mjo-color-picker>
                        <mjo-color-picker label="Medium Compact" size="medium" value="#3b82f6" .theme=${this.compactTheme}></mjo-color-picker>
                        <mjo-color-picker label="Large Compact" size="large" value="#10b981" .theme=${this.compactTheme}></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Rounded Shadow Theme</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Small Rounded" size="small" value="#f59e0b" .theme=${this.roundedTheme}></mjo-color-picker>
                        <mjo-color-picker label="Medium Rounded" size="medium" value="#8b5cf6" .theme=${this.roundedTheme}></mjo-color-picker>
                        <mjo-color-picker label="Large Rounded" size="large" value="#ec4899" .theme=${this.roundedTheme}></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Dashed Border Theme</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker label="Dashed Small" size="small" value="#14b8a6" .theme=${this.borderTheme}></mjo-color-picker>
                        <mjo-color-picker label="Dashed Medium" size="medium" value="#f97316" .theme=${this.borderTheme}></mjo-color-picker>
                        <mjo-color-picker label="Dashed Large" size="large" value="#dc2626" .theme=${this.borderTheme}></mjo-color-picker>
                    </div>
                </div>

                <div>
                    <h4>Comparison with Default</h4>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Default:</span>
                            <div style="display: inline-flex; gap: 0.5rem; align-items: center;">
                                <mjo-color-picker label="Default Small" size="small" value="#3b82f6"></mjo-color-picker>
                                <mjo-color-picker label="Default Medium" size="medium" value="#10b981"></mjo-color-picker>
                                <mjo-color-picker label="Default Large" size="large" value="#ef4444"></mjo-color-picker>
                            </div>
                        </div>
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Compact:</span>
                            <div style="display: inline-flex; gap: 0.5rem; align-items: center;">
                                <mjo-color-picker label="Compact Small" size="small" value="#3b82f6" .theme=${this.compactTheme}></mjo-color-picker>
                                <mjo-color-picker label="Compact Medium" size="medium" value="#10b981" .theme=${this.compactTheme}></mjo-color-picker>
                                <mjo-color-picker label="Compact Large" size="large" value="#ef4444" .theme=${this.compactTheme}></mjo-color-picker>
                            </div>
                        </div>
                        <div>
                            <span style="font-weight: 500; margin-right: 1rem;">Rounded:</span>
                            <div style="display: inline-flex; gap: 0.5rem; align-items: center;">
                                <mjo-color-picker label="Rounded Small" size="small" value="#3b82f6" .theme=${this.roundedTheme}></mjo-color-picker>
                                <mjo-color-picker label="Rounded Medium" size="medium" value="#10b981" .theme=${this.roundedTheme}></mjo-color-picker>
                                <mjo-color-picker label="Rounded Large" size="large" value="#ef4444" .theme=${this.roundedTheme}></mjo-color-picker>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Attributes / Properties

| Name         | Type                             | Default     | Reflects | Description                                                 |
| ------------ | -------------------------------- | ----------- | -------- | ----------------------------------------------------------- |
| `color`      | `"primary" \| "secondary"`       | `"primary"` | no       | Semantic color scheme applied to the label                  |
| `disabled`   | `boolean`                        | `false`     | yes      | Disables the color picker and applies disabled styling      |
| `helperText` | `string \| undefined`            | `undefined` | no       | Additional descriptive text displayed below the picker      |
| `label`      | `string \| undefined`            | `undefined` | no       | Text label displayed above the color picker                 |
| `name`       | `string \| undefined`            | `undefined` | no       | Form field name for form submission and validation          |
| `value`      | `string`                         | `""`        | no       | Current color value in hexadecimal format (e.g., "#3b82f6") |
| `hideErrors` | `boolean`                        | `false`     | no       | Prevents display of validation error messages               |
| `rounded`    | `boolean`                        | `false`     | yes      | Applies circular border radius (50%) to the color picker    |
| `size`       | `"small" \| "medium" \| "large"` | `"medium"`  | no       | Controls the overall size of the color picker               |

### Form Validation Properties (inherited from FormMixin)

| Name       | Type      | Default | Description                                  |
| ---------- | --------- | ------- | -------------------------------------------- |
| `required` | `boolean` | `false` | Makes the field required for form validation |

### Behavior Notes

-   The `value` property automatically updates when user selects a color
-   Form integration is automatic when placed inside `<mjo-form>`
-   The component dispatches standard `change` events when color changes
-   Validation errors are displayed automatically if `hideErrors` is false

## Slots

| Slot      | Description                                                   |
| --------- | ------------------------------------------------------------- |
| (default) | Currently not implemented; content is provided via properties |

## Events

| Event    | Detail | Emitted When                           | Notes                               |
| -------- | ------ | -------------------------------------- | ----------------------------------- |
| `change` | None   | User selects a new color               | Standard HTML change event, bubbles |
| `input`  | None   | Color value changes during interaction | Standard HTML input event, bubbles  |

## Methods

| Method     | Parameters      | Return Type | Description                           |
| ---------- | --------------- | ----------- | ------------------------------------- |
| `getValue` | None            | `string`    | Returns the current color value       |
| `setValue` | `value: string` | `void`      | Sets the color value programmatically |

## CSS Variables

The component provides extensive customization through CSS variables with fallbacks to the global design system.

### Size Configuration

| Variable                         | Fallback | Used For                         |
| -------------------------------- | -------- | -------------------------------- |
| `--mjo-color-picker-size-small`  | `20px`   | Width and height for small size  |
| `--mjo-color-picker-size-medium` | `28px`   | Width and height for medium size |
| `--mjo-color-picker-size-large`  | `36px`   | Width and height for large size  |

### Border and Appearance

| Variable                          | Fallback                                                          | Used For          |
| --------------------------------- | ----------------------------------------------------------------- | ----------------- |
| `--mjo-color-picker-border-style` | `var(--mjo-input-border-style, solid)`                            | Border style      |
| `--mjo-color-picker-border-width` | `var(--mjo-input-border-width, 1px)`                              | Border width      |
| `--mjo-color-picker-border-color` | `var(--mjo-input-border-color, var(--mjo-border-color, #dddddd))` | Border color      |
| `--mjo-color-picker-radius`       | `var(--mjo-input-radius, var(--mjo-radius, 5px))`                 | Border radius     |
| `--mjo-color-picker-box-shadow`   | `var(--mjo-input-box-shadow, none)`                               | Box shadow effect |

### Label Styling

| Variable                               | Fallback  | Used For          |
| -------------------------------------- | --------- | ----------------- |
| `--mjo-color-picker-label-color`       | `inherit` | Label text color  |
| `--mjo-color-picker-label-font-size`   | `inherit` | Label font size   |
| `--mjo-color-picker-label-font-weight` | `inherit` | Label font weight |

### Global Integration

The component inherits from the global design system:

-   `--mjo-input-*` variables for consistent form styling
-   `--mjo-border-color` for default borders
-   `--mjo-radius` for consistent border radius
-   Primary and secondary color schemes for labels

## ThemeMixin Customization

This component mixes in `ThemeMixin`, allowing you to pass a `theme` object to customize specific instances. Properties are automatically converted from camelCase to CSS variables with the pattern: `--mjo-color-picker-{property-name}`.

### MjoColorPickerTheme Interface

```ts
interface MjoColorPickerTheme {
    height?: string;
    sizeSmall?: string;
    sizeMedium?: string;
    sizeLarge?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    radius?: string;
    boxShadow?: string;
    labelColor?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
}
```

### ThemeMixin Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { MjoColorPickerTheme } from "mjo-litui/types";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-themed")
export class ExampleColorPickerThemed extends LitElement {
    private customTheme: MjoColorPickerTheme = {
        sizeMedium: "32px",
        borderWidth: "2px",
        borderColor: "#3b82f6",
        radius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    };

    render() {
        return html`
            <div style="display: flex; gap: 1rem;">
                <mjo-color-picker label="Custom Theme" value="#3b82f6" .theme=${this.customTheme}></mjo-color-picker>
                <mjo-color-picker label="Default Theme" value="#10b981"></mjo-color-picker>
            </div>
        `;
    }
}
```

## CSS Custom Properties Example

```ts
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";

@customElement("example-color-picker-css-custom")
export class ExampleColorPickerCssCustom extends LitElement {
    static styles = css`
        .large-picker {
            --mjo-color-picker-size-medium: 40px;
            --mjo-color-picker-border-width: 3px;
            --mjo-color-picker-border-color: #3b82f6;
            --mjo-color-picker-radius: 8px;
            --mjo-color-picker-box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .compact-picker {
            --mjo-color-picker-size-medium: 20px;
            --mjo-color-picker-border-width: 1px;
            --mjo-color-picker-radius: 4px;
        }

        .rounded-picker {
            --mjo-color-picker-radius: 50%;
            --mjo-color-picker-border-width: 2px;
            --mjo-color-picker-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    `;

    render() {
        return html`
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div>
                    <h4>Custom Styled Pickers</h4>
                    <div style="display: flex; gap: 1rem; align-items: end;">
                        <mjo-color-picker class="large-picker" label="Large Custom" value="#3b82f6"></mjo-color-picker>
                        <mjo-color-picker class="compact-picker" label="Compact" value="#10b981"></mjo-color-picker>
                        <mjo-color-picker class="rounded-picker" label="Rounded" value="#ef4444"></mjo-color-picker>
                    </div>
                </div>
            </div>
        `;
    }
}
```

## Form Integration Notes

### mjo-form Integration

The `mjo-color-picker` seamlessly integrates with `mjo-form` through the `FormMixin`:

-   **Automatic Registration**: When placed inside `<mjo-form>`, the component automatically registers itself
-   **Validation Support**: Supports `required` validation and displays error messages
-   **Form Data**: Color values are included in form submission data using the `name` property
-   **Error Display**: Validation errors appear below the picker unless `hideErrors` is true

### Form Validation Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-color-picker";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-button";

@customElement("example-color-picker-form-validation")
export class ExampleColorPickerFormValidation extends LitElement {
    render() {
        return html`
            <mjo-form>
                <mjo-color-picker label="Required Theme Color" name="themeColor" required helperText="Please select a theme color"></mjo-color-picker>

                <mjo-color-picker label="Optional Accent Color" name="accentColor" helperText="This field is optional"></mjo-color-picker>

                <mjo-button type="submit">Save Colors</mjo-button>
            </mjo-form>
        `;
    }
}
```

## Accessibility Notes

-   **Keyboard Navigation**: Full keyboard support through native HTML5 color input
-   **Screen Readers**: Proper labeling with `aria-label` and `aria-errormessage`
-   **Color Contrast**: Labels follow semantic color schemes for proper contrast
-   **Required Fields**: `aria-required` attribute for form validation
-   **Error Messages**: Associated error messages via `aria-errormessage`

```html
<!-- Example with enhanced accessibility -->
<mjo-color-picker
    label="Primary Brand Color"
    name="brandColor"
    required
    helperText="Choose your main brand color (required)"
    aria-label="Primary brand color selector"
></mjo-color-picker>
```

## Performance Considerations

-   **Minimal DOM**: Efficient implementation using native HTML5 color input
-   **CSS Variables**: Dynamic theming without runtime style recalculation
-   **Event Handling**: Optimized event delegation for color changes
-   **Form Integration**: Lightweight integration with mjo-form system

## Design Guidelines

-   **Consistency**: Use consistent sizing within forms and component groups
-   **Labeling**: Always provide clear, descriptive labels
-   **Helper Text**: Use helper text to provide context or instructions
-   **Validation**: Include proper validation for required color selections
-   **Visual Hierarchy**: Use appropriate sizes to indicate importance

## Best Practices

### Form Design

-   Group related color pickers logically
-   Use helper text to explain color purpose
-   Implement proper validation feedback
-   Consider color accessibility for users with color vision deficiencies

### User Experience

-   Provide meaningful default values when possible
-   Show color previews in context when relevant
-   Use consistent sizing and spacing
-   Consider providing preset color options for common use cases

### Accessibility

-   Ensure labels are descriptive and context-specific
-   Provide alternative ways to identify colors (names, hex values)
-   Test with screen readers and keyboard navigation
-   Consider high contrast mode compatibility

## Summary

`<mjo-color-picker>` provides a robust, form-integrated color selection component with comprehensive theming capabilities. The component supports validation, accessibility standards, and seamless integration with the mjo-form system. Use it for theme customization, UI configuration, data visualization setup, and any scenario requiring user color input. The component's flexibility makes it suitable for both simple color selection and complex color configuration interfaces while maintaining consistent styling and form behavior.
