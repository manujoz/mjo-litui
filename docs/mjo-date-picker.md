# mjo-date-picker

Interactive date (or date range) selection input composed from `mjo-textfield`, `mjo-dropdown` (portal), and `mjo-calendar`. Provides an accessible, themed, non-typing date picking experience with optional range mode, clear button, localization, comprehensive form integration, validation support, and localized display formatting.

## Key Features

- **Single & Range Selection**: Choose between single date or date range modes
- **Portal-based UI**: Dropdown implementation using `mjo-dropdown` for consistent behavior
- **Form Integration**: Full compatibility with `mjo-form` including validation support
- **Localization**: Support for multiple locales with customizable display formats
- **Accessibility**: Keyboard navigation, screen reader support, and semantic markup
- **Theming**: Complete theme customization via ThemeMixin and CSS variables
- **Validation**: Built-in form validation with error handling and custom messages
- **No Typing Required**: Read-only input eliminates format errors

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
            <mjo-date-picker label="Select date" @mjo-date-picker:change=${this.onChange}></mjo-date-picker>
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

    render() {
        return html`
            <mjo-date-picker range label="Report range" clearabled @mjo-date-picker:change=${this.onChange}></mjo-date-picker>
            <p>Range: ${this.value || "(not selected)"}</p>
        `;
    }

    private onChange(e: CustomEvent) {
        this.value = e.detail.value;
        const { startDate, endDate } = e.detail;
        if (startDate && endDate) {
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            console.log(`Duration: ${days} days`);
        }
    }
}
```

## Form Integration Example

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
                <mjo-date-picker name="startDate" label="Event Start Date" required></mjo-date-picker>
                <mjo-date-picker name="period" range label="Event Period" clearabled></mjo-date-picker>
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
    }
}
```

### Form Values Format

Submitted values follow these formats:

- **Single mode**: `YYYY-MM-DD` string (e.g., `"2025-03-15"`)
- **Range mode**: `YYYY-MM-DD/YYYY-MM-DD` string (e.g., `"2025-03-15/2025-03-20"`)

## Attributes / Properties

| Name                         | Type                                  | Default     | Description                                                        |
| ---------------------------- | ------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `name`                       | `string \| undefined`                 | `undefined` | Form field name (enables inclusion in `mjo-form` data)             |
| `value`                      | `string`                              | `""`        | Current value (single: `YYYY-MM-DD`; range: `start/end`)           |
| `range`                      | `boolean`                             | `false`     | Enables range mode (`isRange` property)                            |
| `locale`                     | `string`                              | `"en"`      | Locale passed to calendar & Intl formatting                        |
| `minDate`                    | `string \| undefined`                 | `undefined` | Minimum selectable date (ISO format)                               |
| `maxDate`                    | `string \| undefined`                 | `undefined` | Maximum selectable date (ISO format)                               |
| `disabledDates`              | `string[] \| undefined`               | `undefined` | Array of disabled dates in ISO format                              |
| `label`                      | `string \| undefined`                 | `undefined` | Floating label of inner textfield                                  |
| `placeholder`                | `string \| undefined`                 | `undefined` | Placeholder text (shown when empty)                                |
| `disabled`                   | `boolean`                             | `false`     | Disables user interaction                                          |
| `size`                       | `"small" \| "medium" \| "large"`      | `"medium"`  | Size token forwarded to textfield                                  |
| `color`                      | `"primary" \| "secondary"`            | `"primary"` | Color token forwarded to textfield                                 |
| `clearabled`                 | `boolean`                             | `false`     | Shows a Clear button in dropdown when value present                |
| `closeOnSelect`              | `boolean`                             | `true`      | Closes dropdown after selection (single or after range completion) |
| `required`                   | `boolean`                             | `false`     | Marks as required for form validation                              |
| `variant`                    | `"default" \| "filled" \| "outlined"` | `"default"` | Visual variant style of the input field                            |
| `displayMode`                | `"iso" \| "localized" \| "numeric"`   | `"numeric"` | Display format: ISO raw value or locale-formatted text             |
| `helperText`                 | `string \| undefined`                 | `undefined` | Helper text displayed below the input                              |
| `aria-describedby`           | `string`                              | `""`        | Links to external elements describing the picker                   |
| `aria-live`                  | `string`                              | `"polite"`  | Live region politeness level for screen reader announcements       |
| `aria-label`                 | `string \| null`                      | `null`      | Accessible label for the date picker                               |
| `disabledAnnounceSelections` | `boolean`                             | `false`     | Disables automatic screen reader announcements for date selections |

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

| Event                    | Detail (shape)                                                                                                     | Emitted When                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `mjo-date-picker:change` | `{ value: string, date?: Date, startDate?: Date, endDate?: Date, startDateValue?: string, endDateValue?: string }` | Value changes (single date or completed range) |

### Event Detail Properties

**Single Mode Events:**

- `value`: ISO string of selected date
- `date`: JavaScript Date object

**Range Mode Events:**

- `value`: Combined string in format `start/end`
- `startDate`: JavaScript Date object for start
- `endDate`: JavaScript Date object for end
- `startDateValue`: ISO string for start date
- `endDateValue`: ISO string for end date

**Notes:**

- In range mode, partial selection (only start date) does not emit change events until end date is selected
- Events are emitted after internal state is fully updated
- Both `mjo-date-picker:change` and `change` are fired for form compatibility

## Methods (Public)

| Method        | Parameters | Returns  | Description                                 |
| ------------- | ---------- | -------- | ------------------------------------------- |
| `focus()`     | none       | `void`   | Focuses the internal textfield              |
| `clear()`     | none       | `void`   | Clears value and emits change events        |
| `click()`     | none       | `void`   | Click the internal textfield                |
| `open()`      | none       | `void`   | Programmatically opens the dropdown         |
| `close()`     | none       | `void`   | Programmatically closes the dropdown        |
| `getValue()`  | none       | `string` | Returns current raw value                   |
| `setValue(v)` | `string`   | `void`   | Sets value (triggers internal state update) |

## CSS Parts

The component exposes CSS parts through `exportparts` from its internal textfield and calendar components:

| Part                                    | Element                  | Description                                 |
| --------------------------------------- | ------------------------ | ------------------------------------------- |
| `textfield-container`                   | Main textfield container | The container wrapping the entire textfield |
| `textfield-input`                       | Input element            | The native input element                    |
| `textfield-label-container`             | Label container          | Container for the floating label            |
| `textfield-label-truncate-container`    | Label truncate container | Container for label truncation behavior     |
| `textfield-label-truncate-wrapper`      | Label truncate wrapper   | Wrapper for label truncation                |
| `textfield-prefix-text`                 | Prefix text container    | Container for prefix text                   |
| `textfield-suffix-text`                 | Suffix text container    | Container for suffix text                   |
| `textfield-start-icon-container`        | Start icon container     | Container for start icon                    |
| `textfield-start-icon`                  | Start icon element       | The start icon element                      |
| `textfield-end-icon-container`          | End icon container       | Container for end icon                      |
| `textfield-end-icon`                    | End icon element         | The end icon element                        |
| `textfield-start-image-container`       | Start image container    | Container for start image                   |
| `textfield-start-image`                 | Start image element      | The start image element                     |
| `textfield-end-image-container`         | End image container      | Container for end image                     |
| `textfield-end-image`                   | End image element        | The end image element                       |
| `textfield-clear-button`                | Clear button             | The clear button element                    |
| `textfield-clear-icon`                  | Clear icon               | Icon within the clear button                |
| `textfield-password-button`             | Password toggle button   | Password visibility toggle button           |
| `textfield-password-icon`               | Password toggle icon     | Icon within the password toggle button      |
| `textfield-helper-text-container`       | Helper text container    | Container for helper text                   |
| `textfield-helper-text-typography`      | Helper text typography   | Typography element for helper text          |
| `textfield-helper-text-error-message`   | Error message element    | Error message typography element            |
| `textfield-helper-text-success-message` | Success message element  | Success message typography element          |
| `textfield-helper-text-icon`            | Helper text icon         | Icon element in helper text                 |
| `textfield-counter-container`           | Counter container        | Container for character counter             |
| `textfield-counter-text`                | Counter text             | Character counter text element              |

### Calendar Parts (via exportparts)

| Part                                | Element                        | Description                                        |
| ----------------------------------- | ------------------------------ | -------------------------------------------------- |
| `calendar-container`                | Main calendar container        | The root calendar wrapper                          |
| `calendar-header`                   | Calendar header                | Header area with navigation and selectors          |
| `calendar-navigation`               | Navigation container           | Container for navigation buttons                   |
| `calendar-nav-button`               | Navigation buttons             | Previous/next month navigation buttons             |
| `calendar-selectors-container`      | Selectors container            | Container for month/year selector buttons          |
| `calendar-selector-button`          | Month/year selector buttons    | Clickable month and year selector buttons          |
| `calendar-grid`                     | Calendar grid container        | Main calendar grid layout                          |
| `calendar-week-days-container`      | Week days header container     | Container for weekday headers                      |
| `calendar-week-day`                 | Individual weekday header      | Individual weekday header cell                     |
| `calendar-days-container`           | Days grid container            | Container for calendar day cells                   |
| `calendar-day`                      | Individual day cell            | Individual date cell                               |
| `calendar-day-today`                | Today's date cell              | Applied to today's date (used with calendar-day)   |
| `calendar-day-selected`             | Selected day cell              | Applied to selected dates (used with calendar-day) |
| `calendar-month-picker-container`   | Month picker overlay           | Container for month selection overlay              |
| `calendar-month-picker-button`      | Month picker buttons           | Individual month selection buttons                 |
| `calendar-year-picker-container`    | Year picker overlay            | Container for year selection overlay               |
| `calendar-year-picker-navigation`   | Year picker navigation         | Navigation controls in year picker                 |
| `calendar-year-picker-nav-button`   | Year picker navigation buttons | Previous/next decade navigation buttons            |
| `calendar-year-picker-decade-label` | Decade range label             | Label showing current decade range                 |
| `calendar-year-picker-grid`         | Year picker grid               | Grid layout for year selection buttons             |
| `calendar-year-picker-button`       | Year picker buttons            | Individual year selection buttons                  |

## Display Formatting

The `display-mode` property controls how dates are presented to users while maintaining consistent ISO internal values:

### ISO Mode (`display-mode="iso"`)

Shows raw ISO values: `2025-03-15` or `2025-03-15/2025-03-20`. Good for technical interfaces.

### Localized Mode (`display-mode="localized"`)

Uses `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`:

- `en`: `Mar 15, 2025`
- `es`: `15 mar 2025`
- `fr`: `15 mars 2025`
- Range format uses en dash: `Mar 15, 2025 – Mar 20, 2025`

Falls back to ISO format if locale is unsupported.

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

The component doesn't define its own CSS variables. Instead, it inherits theming through:

- **mjo-textfield**: All textfield theming variables for input styling
- **mjo-calendar**: All calendar theming variables for calendar appearance
- **mjo-dropdown**: Dropdown positioning and behavior variables

For a complete list of inherited variables, see the documentation for [mjo-textfield](./mjo-textfield.md), [mjo-calendar](./mjo-calendar.md), and [mjo-dropdown](./mjo-dropdown.md).

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

- `error`: Boolean indicating error state
- `errormsg`: Error message to display
- `success`: Boolean for success state
- `successmsg`: Success message

## Accessibility

The component provides comprehensive accessibility features:

### ARIA Compliance

- Implements the **combobox pattern** with `role="combobox"`
- Proper `aria-expanded` state management for dropdown visibility
- `aria-controls` linking to the calendar panel
- `aria-describedby` support for external descriptions
- Optional `aria-live` regions for screen reader announcements

### Keyboard Navigation

- **Tab**: Navigate to the date picker
- **Enter/Space**: Open the dropdown calendar
- **Escape**: Close the dropdown (when open)
- **Arrow Keys**: Open dropdown when closed, navigate dates when open

### Screen Reader Support

- Semantic markup with proper roles and ARIA attributes
- Live announcements for date selections and changes
- Clear announcement of selected dates and ranges
- Range separator uses proper en dash character (–) for clarity
- Optional screen reader feedback via `disabled-announce-selections` property

### Enhanced Properties for Accessibility

| Property                       | Type             | Default    | Description                                         |
| ------------------------------ | ---------------- | ---------- | --------------------------------------------------- |
| `aria-describedby`             | `string`         | `""`       | Links to external elements describing the picker    |
| `aria-live`                    | `string`         | `"polite"` | Live region politeness for announcements            |
| `aria-label`                   | `string \| null` | `null`     | Accessible label for the date picker                |
| `disabled-announce-selections` | `boolean`        | `false`    | Disables screen reader announcements for selections |

## Advanced Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";

@customElement("example-date-picker-advanced")
export class ExampleDatePickerAdvanced extends LitElement {
    @state() private startDate = "";
    @state() private endDate = "";

    render() {
        return html`
            <mjo-date-picker label="Start Date" .value=${this.startDate} @mjo-date-picker:change=${this.handleStartChange}></mjo-date-picker>

            <mjo-date-picker
                label="End Date"
                .minDate=${this.startDate || "2025-01-01"}
                ?disabled=${!this.startDate}
                .value=${this.endDate}
                @mjo-date-picker:change=${this.handleEndChange}
            ></mjo-date-picker>
        `;
    }

    private handleStartChange(e: CustomEvent) {
        this.startDate = e.detail.value;
        if (this.endDate && this.endDate < this.startDate) {
            this.endDate = ""; // Clear end date if invalid
        }
    }

    private handleEndChange(e: CustomEvent) {
        this.endDate = e.detail.value;
    }
}
```

## Browser Support

The component relies on these modern web features:

- **Custom Elements**: All modern browsers
- **Shadow DOM**: All modern browsers
- **Intl.DateTimeFormat**: All modern browsers (fallback to ISO format)
- **CSS Custom Properties**: All modern browsers

## Integration Notes

- **With mjo-form**: Automatically registers when `name` is provided, participates in validation lifecycle
- **With mjo-calendar**: Delegates calendar functionality, inherits theming and localization
- **With mjo-dropdown**: Uses portal-based positioning, inherits dropdown behavior

## Troubleshooting

**Date not displaying in localized format:**

- Ensure `display-mode="localized"` is set and locale is supported

**Validation not working:**

- Ensure date picker has `name` attribute and parent is `mjo-form`

**Dropdown positioning issues:**

- Component uses portal rendering to avoid most positioning issues

**Range selection not completing:**

- Component requires both start and end dates before emitting change events

## Summary

`<mjo-date-picker>` is a comprehensive date selection component that combines the power of `mjo-textfield`, `mjo-dropdown`, and `mjo-calendar` into a cohesive, accessible, and themeable interface. It provides robust form integration, extensive validation options, localization support, and flexible configuration for both simple date picking and complex date range scenarios.
