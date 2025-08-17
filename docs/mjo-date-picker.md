# mjo-date-picker

Interactive date (or date range) selection input composed from `mjo-textfield`, `mjo-dropdown` (portal), and `mjo-calendar`. Provides an accessible, themed, non-typing date picking experience with optional range mode, clear button, localization, comprehensive form integration, validation support, and localized display formatting.

## Key Features

-   **Single & Range Selection**: Choose between single date or date range modes
-   **Portal-based UI**: Dropdown implementation using `mjo-dropdown` for consistent behavior
-   **Form Integration**: Full compatibility with `mjo-form` including validation support
-   **Localization**: Support for multiple locales with customizable display formats
-   **Accessibility**: Keyboard navigation, screen reader support, and semantic markup
-   **Theming**: Complete theme customization via ThemeMixin and CSS variables
-   **Validation**: Built-in form validation with error handling and custom messages
-   **No Typing Required**: Read-only input eliminates format errors

## HTML Usage

```html
<!-- Single date picker -->
<mjo-date-picker name="birthday" label="Birthday"></mjo-date-picker>

<!-- Single with placeholder and clear button -->
<mjo-date-picker label="Start" placeholder="Select date" clearabled></mjo-date-picker>

<!-- Range date picker (value becomes start/end) -->
<mjo-date-picker range label="Period" clearabled></mjo-date-picker>

<!-- Constrained range with min/max and disabled dates -->
<mjo-date-picker
  range
  label="Travel"
  min-date="2025-01-01"
  max-date="2025-12-31"
  .disabled-dates=${["2025-05-10","2025-05-11"]}
></mjo-date-picker>

<!-- Localized display (format via Intl) -->
<mjo-date-picker locale="es" display-mode="localized" label="Fecha"></mjo-date-picker>

<!-- Secondary color + large size -->
<mjo-date-picker label="Meeting" color="secondary" size="large"></mjo-date-picker>

<!-- With validation -->
<mjo-date-picker name="eventDate" label="Event Date" required></mjo-date-picker>
```

## Basic Lit Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";

@customElement("example-date-picker-basic")
export class ExampleDatePickerBasic extends LitElement {
    @state() private value = "";

    render() {
        return html`
            <mjo-date-picker label="Select date" @date-picker-change=${this.onChange}></mjo-date-picker>
            <p>Value: ${this.value || "(none)"}</p>
        `;
    }

    private onChange(e: CustomEvent) {
        this.value = e.detail.value;
        console.log("Date selected:", e.detail);
    }
}
```

## Range Selection Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";

@customElement("example-date-picker-range")
export class ExampleDatePickerRange extends LitElement {
    @state() private value = "";
    @state() private rangeDetails = "";

    render() {
        return html`
            <mjo-date-picker range label="Report range" clearabled @date-picker-change=${this.onChange}></mjo-date-picker>
            <p>Range: ${this.value || "(not selected)"}</p>
            ${this.rangeDetails ? html`<p><small>${this.rangeDetails}</small></p>` : ""}
        `;
    }

    private onChange(e: CustomEvent) {
        this.value = e.detail.value;
        const { startDate, endDate } = e.detail;
        if (startDate && endDate) {
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            this.rangeDetails = `Duration: ${days} days`;
        }
    }
}
```

## Localized Display Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";

@customElement("example-date-picker-localized")
export class ExampleDatePickerLocalized extends LitElement {
    @state() private locale = "es";

    render() {
        return html`
            <div style="display: flex; gap: 16px; align-items: end;">
                <mjo-date-picker label="Fecha" .locale=${this.locale} display-mode="localized" placeholder="Selecciona fecha"></mjo-date-picker>
                <select @change=${this.changeLocale}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
        `;
    }

    private changeLocale(e: Event) {
        this.locale = (e.target as HTMLSelectElement).value;
    }
}
```

## Form Integration & Validation

Works seamlessly with `mjo-form` providing complete validation support.

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-button";

@customElement("example-date-picker-form")
export class ExampleDatePickerForm extends LitElement {
    @state() private submittedData: any = null;

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <mjo-date-picker name="startDate" label="Event Start Date" required helperText="Required field"></mjo-date-picker>

                <mjo-date-picker name="period" range label="Event Period" clearabled helperText="Optional date range"></mjo-date-picker>

                <mjo-date-picker
                    name="deadline"
                    label="Deadline"
                    min-date="2025-01-01"
                    max-date="2025-12-31"
                    helperText="Must be within 2025"
                ></mjo-date-picker>

                <mjo-button type="submit">Submit Form</mjo-button>
            </mjo-form>

            ${this.submittedData
                ? html`
                      <div style="margin-top: 16px; padding: 12px; background: #f0f9ff; border-radius: 4px;">
                          <h4>Submitted Data:</h4>
                          <pre>${JSON.stringify(this.submittedData, null, 2)}</pre>
                      </div>
                  `
                : ""}
        `;
    }

    private handleSubmit(e: CustomEvent) {
        const { response } = e.detail;

        if (response.error) {
            console.error("Form validation error:", response.errmsg);
            return;
        }

        this.submittedData = response.data;
        console.log("Form submitted successfully:", response.data);

        // Reset loading state
        setTimeout(() => {
            if (response.submitButton) {
                response.submitButton.loading = false;
            }
        }, 1500);
    }
}
```

### Form Values Format

Submitted values follow these formats:

-   **Single mode**: `YYYY-MM-DD` string (e.g., `"2025-03-15"`)
-   **Range mode**: `YYYY-MM-DD/YYYY-MM-DD` string (e.g., `"2025-03-15/2025-03-20"`)

## Attributes / Properties

| Name              | Type                             | Default     | Reflects | Description                                                        |
| ----------------- | -------------------------------- | ----------- | -------- | ------------------------------------------------------------------ |
| `name`            | `string \| undefined`            | `undefined` | no       | Form field name (enables inclusion in `mjo-form` data)             |
| `value`           | `string`                         | `""`        | no       | Current value (single: `YYYY-MM-DD`; range: `start/end`)           |
| `range`           | `boolean`                        | `false`     | yes      | Enables range mode (`isRange` property)                            |
| `locale`          | `string`                         | `"en"`      | no       | Locale passed to calendar & Intl formatting                        |
| `min-date`        | `string \| undefined`            | `undefined` | no       | Minimum selectable date (ISO format)                               |
| `max-date`        | `string \| undefined`            | `undefined` | no       | Maximum selectable date (ISO format)                               |
| `disabled-dates`  | `string[] \| undefined`          | `undefined` | no       | Array of disabled dates in ISO format                              |
| `label`           | `string \| undefined`            | `undefined` | no       | Floating label of inner textfield                                  |
| `placeholder`     | `string \| undefined`            | `undefined` | no       | Placeholder text (shown when empty)                                |
| `disabled`        | `boolean`                        | `false`     | yes      | Disables user interaction                                          |
| `size`            | `"small" \| "medium" \| "large"` | `"medium"`  | no       | Size token forwarded to textfield                                  |
| `color`           | `"primary" \| "secondary"`       | `"primary"` | no       | Color token forwarded to textfield                                 |
| `clearabled`      | `boolean`                        | `false`     | no       | Shows a Clear button in dropdown when value present                |
| `close-on-select` | `boolean`                        | `true`      | no       | Closes dropdown after selection (single or after range completion) |
| `required`        | `boolean`                        | `false`     | yes      | Marks as required for form validation                              |
| `display-mode`    | `"iso" \| "localized"`           | `"iso"`     | no       | Display format: ISO raw value or locale-formatted text             |

### Validation Properties

Inherits all validation properties from `FormMixin`:

| Property       | Type                                           | Description               |
| -------------- | ---------------------------------------------- | ------------------------- |
| `required`     | `boolean`                                      | Field is required         |
| `isdate`       | `"aaaa-mm-dd" \| "dd-mm-aaaa" \| "mm-dd-aaaa"` | Date format validation    |
| `dateprevious` | `boolean`                                      | Date must be before today |
| `minage`       | `number`                                       | Minimum age in years      |
| `maxage`       | `number`                                       | Maximum age in years      |

## Events

| Event                | Detail (shape)                                                                                                     | Emitted When                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `date-picker-change` | `{ value: string, date?: Date, startDate?: Date, endDate?: Date, startDateValue?: string, endDateValue?: string }` | Value changes (single date or completed range) |
| `change`             | Native bubbling `Event` (no extra detail)                                                                          | Fired alongside `date-picker-change` for forms |

### Event Detail Properties

**Single Mode Events:**

-   `value`: ISO string of selected date
-   `date`: JavaScript Date object

**Range Mode Events:**

-   `value`: Combined string in format `start/end`
-   `startDate`: JavaScript Date object for start
-   `endDate`: JavaScript Date object for end
-   `startDateValue`: ISO string for start date
-   `endDateValue`: ISO string for end date

**Notes:**

-   In range mode, partial selection (only start date) does not emit change events until end date is selected
-   Events are emitted after internal state is fully updated
-   Both `date-picker-change` and `change` are fired for form compatibility

## Methods (Public)

| Method          | Parameters | Returns  | Description                                 |
| --------------- | ---------- | -------- | ------------------------------------------- |
| `focus()`       | none       | `void`   | Focuses the internal textfield              |
| `clear()`       | none       | `void`   | Clears value and emits change events        |
| `openPicker()`  | none       | `void`   | Programmatically opens the dropdown         |
| `closePicker()` | none       | `void`   | Programmatically closes the dropdown        |
| `getValue()`    | none       | `string` | Returns current raw value                   |
| `setValue(v)`   | `string`   | `void`   | Sets value (triggers internal state update) |

### Method Usage Example

```ts
@customElement("example-date-picker-methods")
export class ExampleDatePickerMethods extends LitElement {
    @query("mjo-date-picker") picker!: HTMLElement & {
        openPicker(): void;
        closePicker(): void;
        clear(): void;
        getValue(): string;
        setValue(value: string): void;
    };

    render() {
        return html`
            <mjo-date-picker label="Controlled Picker"></mjo-date-picker>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <mjo-button size="small" @click=${() => this.picker.openPicker()}> Open </mjo-button>
                <mjo-button size="small" @click=${() => this.picker.closePicker()}> Close </mjo-button>
                <mjo-button size="small" variant="flat" @click=${() => this.picker.clear()}> Clear </mjo-button>
                <mjo-button size="small" @click=${() => this.picker.setValue("2025-12-25")}> Set Christmas </mjo-button>
            </div>
        `;
    }
}
```

## Display Formatting

The `display-mode` property controls how dates are presented to users while maintaining consistent ISO internal values:

### ISO Mode (`display-mode="iso"`)

-   Shows raw ISO values: `2025-03-15` or `2025-03-15/2025-03-20`
-   Direct, unambiguous format
-   Good for technical interfaces

### Localized Mode (`display-mode="localized"`)

-   Uses `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`
-   Examples:
    -   `en`: `Mar 15, 2025`
    -   `es`: `15 mar 2025`
    -   `fr`: `15 mars 2025`
-   Range format uses en dash: `Mar 15, 2025 – Mar 20, 2025`
-   Falls back to ISO format if locale is unsupported

## Theming

### ThemeMixin Integration

Supports per-component theme overrides via the `theme` property:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";

@customElement("example-themed-date-picker")
export class ExampleThemedDatePicker extends LitElement {
    render() {
        return html`
            <mjo-date-picker
                label="Custom Theme"
                .theme=${{
                    panelBackgroundColor: "#f0f9ff",
                    panelRadius: "12px",
                    panelBoxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
                }}
            ></mjo-date-picker>
        `;
    }
}
```

### CSS Variables

The component exposes these CSS custom properties for styling:

| Variable                                   | Default                                             | Purpose             |
| ------------------------------------------ | --------------------------------------------------- | ------------------- |
| `--mjo-date-picker-panel-padding`          | `var(--mjo-space-small, 8px)`                       | Panel padding       |
| `--mjo-date-picker-panel-background-color` | `var(--mjo-background-color)`                       | Panel background    |
| `--mjo-date-picker-panel-radius`           | `var(--mjo-radius, 8px)`                            | Panel border-radius |
| `--mjo-date-picker-panel-box-shadow`       | `var(--mjo-box-shadow, 0 2px 6px rgba(0,0,0,0.15))` | Panel shadow        |

### Global Theme Configuration

For global theming via `<mjo-theme>`, use the `MjoDatePickerTheme` interface:

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-theme";
import "mjo-litui/mjo-date-picker";
import type { MjoThemeConfig } from "mjo-litui/types/mjo-theme";

@customElement("example-global-themed")
export class ExampleGlobalThemed extends LitElement {
    private themeConfig: Partial<MjoThemeConfig> = {
        components: {
            mjoDatePicker: {
                panelBackgroundColor: "#ffffff",
                panelRadius: "16px",
                panelBoxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                panelPadding: "16px",
            },
        },
    };

    render() {
        return html`
            <mjo-theme scope="global" .config=${this.themeConfig}></mjo-theme>
            <mjo-date-picker label="Globally Themed"></mjo-date-picker>
        `;
    }
}
```

## Validation & Error Handling

### Built-in Validation

The component integrates with the form validation system:

```html
<mjo-date-picker name="birthdate" label="Birth Date" required isdate="aaaa-mm-dd" maxage="65" helperText="Required field, maximum age 65"></mjo-date-picker>
```

### Custom Error Messages

```ts
@customElement("example-date-picker-validation")
export class ExampleDatePickerValidation extends LitElement {
    private customMessages = {
        birthdate: {
            required: "Please select your birth date",
            maxage: "Age cannot exceed 65 years",
        },
    };

    render() {
        return html`
            <mjo-form .inputsErrmessages=${this.customMessages} @submit=${this.handleSubmit}>
                <mjo-date-picker name="birthdate" label="Birth Date" required maxage="65" isdate="aaaa-mm-dd"></mjo-date-picker>
                <mjo-button type="submit">Submit</mjo-button>
            </mjo-form>
        `;
    }

    private handleSubmit(e: CustomEvent) {
        const { response } = e.detail;
        if (response.error) {
            console.error("Validation failed:", response.errmsg);
        }
    }
}
```

### Error States

The component supports error display through the `InputErrorMixin`:

-   `error`: Boolean indicating error state
-   `errormsg`: Error message to display
-   `success`: Boolean for success state
-   `successmsg`: Success message

## Accessibility

The component provides comprehensive accessibility features:

### Keyboard Navigation

-   **Tab**: Navigate to the date picker
-   **Enter/Space**: Open the dropdown calendar
-   **Escape**: Close the dropdown (when open)
-   **Arrow Keys**: Navigate within the calendar (delegated to `mjo-calendar`)

### Screen Reader Support

-   Proper ARIA labels and descriptions
-   Semantic markup for form integration
-   Clear announcement of selected dates and ranges
-   Range separator uses proper en dash character (–) for clarity

### Focus Management

-   Maintains focus on the textfield when dropdown opens
-   Returns focus appropriately when dropdown closes
-   Clear button is properly focusable and labeled

## Advanced Examples

### Date Range with Duration Display

```ts
@customElement("example-advanced-range")
export class ExampleAdvancedRange extends LitElement {
    @state() private startDate?: Date;
    @state() private endDate?: Date;
    @state() private duration = 0;

    render() {
        return html`
            <mjo-date-picker range label="Project Timeline" clearabled @date-picker-change=${this.handleRangeChange}></mjo-date-picker>

            ${this.duration > 0
                ? html`
                      <div style="margin-top: 12px; padding: 8px; background: #f0f9ff; border-radius: 4px;">
                          <strong>Duration:</strong> ${this.duration} days
                          <br />
                          <small> From ${this.startDate?.toLocaleDateString()} to ${this.endDate?.toLocaleDateString()} </small>
                      </div>
                  `
                : ""}
        `;
    }

    private handleRangeChange(e: CustomEvent) {
        const { startDate, endDate } = e.detail;
        this.startDate = startDate;
        this.endDate = endDate;

        if (startDate && endDate) {
            this.duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        }
    }
}
```

### Conditional Date Constraints

```ts
@customElement("example-conditional-constraints")
export class ExampleConditionalConstraints extends LitElement {
    @state() private startDate = "";
    @state() private endDate = "";

    render() {
        return html`
            <div style="display: grid; gap: 16px;">
                <mjo-date-picker label="Start Date" max-date="2025-12-31" @date-picker-change=${this.handleStartChange}></mjo-date-picker>

                <mjo-date-picker
                    label="End Date"
                    .min-date=${this.startDate || "2025-01-01"}
                    max-date="2025-12-31"
                    ?disabled=${!this.startDate}
                    @date-picker-change=${this.handleEndChange}
                ></mjo-date-picker>
            </div>
        `;
    }

    private handleStartChange(e: CustomEvent) {
        this.startDate = e.detail.value;
    }

    private handleEndChange(e: CustomEvent) {
        this.endDate = e.detail.value;
    }
}
```

## Behavioral Notes

### Dropdown Behavior

-   Portal-based dropdown prevents clipping issues
-   Closes on outside clicks (document click handling)
-   Internal clicks on calendar or Clear button do not close dropdown
-   In range mode, dropdown stays open until range is complete (unless `close-on-select="false"`)

### State Management

-   Component maintains internal calendar state through `calendarRef`
-   Value updates trigger form data synchronization when `name` is provided
-   Events are emitted after state is completely updated

### Performance Considerations

-   Calendar instances are created on-demand within dropdown
-   Uses `createRef` for efficient calendar reference management
-   Minimal re-rendering through strategic use of `@state()` properties

## Browser Support

The component relies on these modern web features:

-   **Custom Elements**: All modern browsers
-   **Shadow DOM**: All modern browsers
-   **Intl.DateTimeFormat**: All modern browsers (fallback to ISO format)
-   **CSS Custom Properties**: All modern browsers

## Integration Notes

### With mjo-form

-   Automatically registers with parent `mjo-form` when `name` is provided
-   Participates in form validation lifecycle
-   Values submitted in consistent ISO format
-   Supports all form validation attributes

### With mjo-calendar

-   Delegates calendar functionality to internal `mjo-calendar` instance
-   Inherits calendar theming and localization features
-   Supports all calendar constraints (min/max dates, disabled dates)

### With mjo-dropdown

-   Uses dropdown for portal-based positioning
-   Inherits dropdown behavior and styling
-   Supports custom CSS and responsive positioning

## Troubleshooting

### Common Issues

**Date not displaying in localized format:**

-   Ensure `display-mode="localized"` is set
-   Check that the specified `locale` is supported by the browser
-   Component will fallback to ISO format for unsupported locales

**Validation not working:**

-   Ensure the date picker has a `name` attribute when used in forms
-   Check that validation attributes are properly set (e.g., `required`, `isdate`)
-   Verify parent form is `mjo-form` for custom validation

**Dropdown not positioning correctly:**

-   Check for CSS transforms or overflow hidden on parent containers
-   Component uses portal rendering to avoid most positioning issues
-   Ensure adequate viewport space for dropdown

**Range selection not completing:**

-   Component requires both start and end dates before emitting change events
-   Use `close-on-select="false"` if you want dropdown to stay open
-   Clear button resets range and allows new selection

## Summary

`<mjo-date-picker>` is a comprehensive date selection component that combines the power of `mjo-textfield`, `mjo-dropdown`, and `mjo-calendar` into a cohesive, accessible, and themeable interface. It provides robust form integration, extensive validation options, localization support, and flexible configuration for both simple date picking and complex date range scenarios.
