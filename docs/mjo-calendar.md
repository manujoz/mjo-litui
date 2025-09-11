# mjo-calendar

A comprehensive calendar component for date selection that supports both single date and date range selection modes. Features intuitive navigation controls, adaptive dual-calendar rendering in range mode, internationalization support for 15 languages, full accessibility implementation with keyboard navigation and screen reader support, form integration via `FormMixin`, extensive theming capabilities through `ThemeMixin`, and a powerful programmatic API.

## Key Features

-   **Dual Selection Modes**: Single date or date range selection
-   **Adaptive Layout**: Intelligent dual-calendar layout in range mode based on container width
-   **Full Accessibility**: ARIA roles, keyboard navigation, screen reader announcements, and focus management
-   **Internationalization**: Support for 15 languages with localized month names and weekdays
-   **Smart Constraints**: Min/max dates and individual disabled dates support
-   **Form Integration**: Native form support with validation capabilities
-   **Advanced Theming**: Extensive customization via CSS variables and ThemeMixin
-   **Programmatic Control**: Complete API for external date manipulation
-   **Responsive Design**: Adaptive sizing and responsive dual-calendar behavior
-   **Event Markers**: Support for custom event indicators on dates (planned feature)
-   **Keyboard Navigation**: Full keyboard support with arrow keys, Page Up/Down, Home/End, and shortcuts

## Form Integration

The `mjo-calendar` component integrates seamlessly with `mjo-form` through the `FormMixin`, providing automatic form data collection, validation, and submission handling.

### Basic Form Integration

```ts
// HTML
<mjo-form @submit=${this.handleSubmit}>
    <mjo-calendar name="eventDate" mode="single" required></mjo-calendar>
    <mjo-calendar name="vacationPeriod" mode="range"></mjo-calendar>
    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

### Form Data Format

When integrated with forms, the calendar component submits data in the following formats:

-   **Single mode**: `{ fieldName: "2025-01-15" }` (string in YYYY-MM-DD format)
-   **Range mode**: `{ fieldName: "{\"start\":\"2025-01-10\",\"end\":\"2025-01-20\"}" }` (JSON string format)

### Validation Support

The component supports validation through `FormMixin` properties:

```html
<mjo-calendar name="birthDate" mode="single" required min-date="1900-01-01" max-date="2010-12-31"></mjo-calendar>
```

### Form Integration Example

```ts
@customElement("calendar-form-example")
export class CalendarFormExample extends LitElement {
    private handleFormSubmit = (e: CustomEvent) => {
        const formData = e.detail;
        console.log("Form data:", formData);

        // Access individual calendar values
        if (formData.eventDate) {
            console.log("Event date:", formData.eventDate); // "2025-01-15"
        }

        if (formData.vacationPeriod) {
            const range = JSON.parse(formData.vacationPeriod);
            console.log("Vacation:", range.start, "to", range.end); // "2025-07-01" to "2025-07-14"
        }
    };

    render() {
        return html`
            <mjo-form @submit=${this.handleFormSubmit}>
                <div class="form-grid">
                    <mjo-calendar name="eventDate" mode="single" label="Event Date" required min-date="2025-01-01"></mjo-calendar>

                    <mjo-calendar name="vacationPeriod" mode="range" label="Vacation Period"></mjo-calendar>
                </div>
                <mjo-button type="submit">Create Event</mjo-button>
            </mjo-form>
        `;
    }
}
```

## Accessibility

The `mjo-calendar` component is designed with comprehensive accessibility features:

### Keyboard Navigation

-   **Arrow Keys**: Navigate between dates (Left/Right for days, Up/Down for weeks)
-   **Page Up/Page Down**: Navigate by month (Ctrl+Page Up/Down for year navigation)
-   **Home/End**: Move to start/end of current week
-   **Enter/Space**: Select focused date
-   **Escape**: Close month/year pickers or clear focus
-   **Tab**: Navigate between interactive elements (month/year buttons, navigation)
-   **T**: Jump to today's date (quick shortcut)

### ARIA Support

-   **Roles**: Proper semantic structure with `application`, `grid`, `gridcell`, `button`, `dialog` roles
-   **Labels**: Contextual labels for dates, navigation, and pickers
-   **States**: `aria-selected`, `aria-current`, `aria-disabled`, `aria-expanded` attributes
-   **Live Regions**: Screen reader announcements for selection changes and navigation
-   **Focus Management**: Proper focus indicators and focus trapping in pickers

### Screen Reader Support

-   **Date Announcements**: Full date context with day of week, date, and status
-   **Selection Feedback**: Automatic announcements when dates are selected
-   **Navigation Context**: Clear indication of current month/year being viewed
-   **Range Context**: Proper announcement of range start, end, and in-between dates
-   **Picker Context**: Clear indication when entering/exiting month/year selection mode

### Best Practices

```html
<!-- Provide descriptive labels for form integration -->
<mjo-calendar name="appointmentDate" mode="single" aria-label="Select appointment date"></mjo-calendar>

<!-- Use labelledby for complex labeling -->
<label id="event-date-label">Event Date (required)</label>
<mjo-calendar name="eventDate" mode="single" aria-labelledby="event-date-label"></mjo-calendar>

<!-- Add descriptions for complex constraints -->
<span id="date-help">Select a date between January 1 and December 31, 2025</span>
<mjo-calendar name="limitedDate" mode="single" min-date="2025-01-01" max-date="2025-12-31" aria-describedby="date-help"></mjo-calendar>

<!-- Use appropriate sizing for touch interfaces -->
<mjo-calendar size="large" mode="single"></mjo-calendar>

<!-- Enable announcements for better feedback -->
<mjo-calendar mode="range" announce-selections></mjo-calendar>
```

> **Legacy API Note**: Previous versions exposed direct property accessors (`currentMonth`, `leftCalendarYear`, etc.). These have been removed in favor of the new methods for better encapsulation and maintainability.

## CSS Variables

The component provides extensive CSS customization through variables with fallbacks to global theme tokens.

### Core Structure

| Variable                       | Fallback                       | Purpose                   |
| ------------------------------ | ------------------------------ | ------------------------- |
| `--mjo-calendar-font-family`   | `--mjo-font-family`            | Calendar font family      |
| `--mjo-calendar-background`    | `--mjo-background-color`       | Calendar background       |
| `--mjo-calendar-border`        | `1px solid --mjo-border-color` | Calendar border           |
| `--mjo-calendar-border-radius` | `--mjo-radius`                 | Calendar border radius    |
| `--mjo-calendar-shadow`        | `0 2px 8px rgba(0,0,0,0.1)`    | Calendar shadow           |
| `--mjo-calendar-padding`       | `16px`                         | Calendar internal padding |

### Week Headers

| Variable                              | Fallback                     | Purpose                      |
| ------------------------------------- | ---------------------------- | ---------------------------- |
| `--mjo-calendar-week-day-color`       | `--mjo-foreground-color-low` | Week day headers text color  |
| `--mjo-calendar-week-day-font-weight` | `600`                        | Week day headers font weight |

### Day Cells

| Variable                              | Fallback                      | Purpose                      |
| ------------------------------------- | ----------------------------- | ---------------------------- |
| `--mjo-calendar-day-border-radius`    | `4px`                         | Individual day border radius |
| `--mjo-calendar-day-hover-background` | `--mjo-background-color-high` | Day hover background         |
| `--mjo-calendar-focus-outline`        | `--mjo-primary-color`         | Focused day outline color    |

### Today's Date

| Variable                          | Fallback                     | Purpose                 |
| --------------------------------- | ---------------------------- | ----------------------- |
| `--mjo-calendar-today-background` | `--mjo-primary-color-alpha2` | Today's date background |
| `--mjo-calendar-today-color`      | `--mjo-primary-color`        | Today's date text color |

### Selected Dates

| Variable                             | Fallback              | Purpose                  |
| ------------------------------------ | --------------------- | ------------------------ |
| `--mjo-calendar-selected-background` | `--mjo-primary-color` | Selected date background |
| `--mjo-calendar-selected-color`      | `white`               | Selected date text color |

### Range Selection

| Variable                                   | Fallback                     | Purpose                       |
| ------------------------------------------ | ---------------------------- | ----------------------------- |
| `--mjo-calendar-range-endpoint-background` | `--mjo-primary-color`        | Range start/end background    |
| `--mjo-calendar-range-endpoint-color`      | `white`                      | Range start/end text color    |
| `--mjo-calendar-range-background`          | `--mjo-primary-color-alpha1` | Range middle dates background |
| `--mjo-calendar-range-color`               | `--mjo-primary-color`        | Range middle dates text color |

### Disabled State

| Variable                             | Fallback                          | Purpose                   |
| ------------------------------------ | --------------------------------- | ------------------------- |
| `--mjo-calendar-disabled-color`      | `--mjo-disabled-foreground-color` | Disabled dates text color |
| `--mjo-calendar-disabled-background` | `transparent`                     | Disabled dates background |

### Secondary Color Theme

When `color="secondary"`, these variables apply:

| Variable                                             | Fallback                       | Purpose                          |
| ---------------------------------------------------- | ------------------------------ | -------------------------------- |
| `--mjo-calendar-today-background-secondary`          | `--mjo-secondary-color-alpha2` | Today background (secondary)     |
| `--mjo-calendar-today-color-secondary`               | `--mjo-secondary-color`        | Today text color (secondary)     |
| `--mjo-calendar-selected-background-secondary`       | `--mjo-secondary-color`        | Selected background (secondary)  |
| `--mjo-calendar-selected-color-secondary`            | `white`                        | Selected text color (secondary)  |
| `--mjo-calendar-range-endpoint-background-secondary` | `--mjo-secondary-color`        | Range endpoints (secondary)      |
| `--mjo-calendar-range-endpoint-color-secondary`      | `white`                        | Range endpoints text (secondary) |
| `--mjo-calendar-range-background-secondary`          | `--mjo-secondary-color-alpha1` | Range background (secondary)     |
| `--mjo-calendar-range-color-secondary`               | `--mjo-secondary-color`        | Range text color (secondary)     |

### Month/Year Pickers

| Variable                                           | Fallback                         | Purpose                           |
| -------------------------------------------------- | -------------------------------- | --------------------------------- |
| `--mjo-calendar-picker-background`                 | `--mjo-background-color`         | Picker overlay background         |
| `--mjo-calendar-picker-radius`                     | `--mjo-radius`                   | Picker border radius              |
| `--mjo-calendar-picker-shadow`                     | `0 4px 12px rgba(0,0,0,0.15)`    | Picker shadow                     |
| `--mjo-calendar-picker-button-background`          | `transparent`                    | Picker button background          |
| `--mjo-calendar-picker-button-border`              | `1px solid --mjo-border-color`   | Picker button border              |
| `--mjo-calendar-picker-button-radius`              | `--mjo-radius`                   | Picker button border radius       |
| `--mjo-calendar-picker-button-color`               | `--mjo-foreground-color-low`     | Picker button text color          |
| `--mjo-calendar-picker-button-hover-background`    | `--mjo-primary-color-alpha2`     | Picker button hover background    |
| `--mjo-calendar-picker-button-hover-border`        | `--mjo-primary-color`            | Picker button hover border        |
| `--mjo-calendar-picker-button-focus-outline`       | `--mjo-primary-color`            | Picker button focus outline       |
| `--mjo-calendar-picker-button-selected-background` | `--mjo-primary-color`            | Picker button selected background |
| `--mjo-calendar-picker-button-selected-border`     | `--mjo-primary-color`            | Picker button selected border     |
| `--mjo-calendar-picker-button-selected-color`      | `--mjo-primary-foreground-color` | Picker button selected text color |

-   **Smart Constraints**: Min/max dates and individual disabled dates support
-   **Form Integration**: Native form support with validation capabilities
-   **Accessibility**: Full keyboard navigation and screen reader support
-   **Advanced Theming**: Extensive customization via CSS variables and ThemeMixin
-   **Programmatic Control**: Complete API for external date manipulation
-   **Responsive Design**: Adaptive sizing and responsive dual-calendar behavior

## HTML Usage

```html
<!-- Basic single date selection -->
<mjo-calendar mode="single" value="2025-01-15"></mjo-calendar>

<!-- Date range selection with auto layout -->
<mjo-calendar mode="range" start-date="2025-01-10" end-date="2025-01-20"></mjo-calendar>

<!-- Force specific calendar layouts -->
<mjo-calendar mode="range" range-calendars="1"></mjo-calendar>
<!-- Single calendar -->
<mjo-calendar mode="range" range-calendars="2"></mjo-calendar>
<!-- Dual calendars -->
<mjo-calendar mode="range" range-calendars="auto"></mjo-calendar>
<!-- Adaptive (default) -->

<!-- Internationalization -->
<mjo-calendar locale="es" mode="single"></mjo-calendar>
<mjo-calendar locale="fr" mode="range"></mjo-calendar>
<mjo-calendar locale="ja" mode="single" first-day-of-week="sunday"></mjo-calendar>

<!-- Date constraints -->
<mjo-calendar mode="single" min-date="2025-01-01" max-date="2025-12-31" disabled-dates='["2025-02-14", "2025-07-04"]'></mjo-calendar>

<!-- Accessibility features -->
<mjo-calendar mode="single" aria-label="Select appointment date" enable-keyboard-navigation announce-selections></mjo-calendar>

<!-- Advanced accessibility -->
<label id="birth-date-label">Birth Date</label>
<span id="birth-date-help">Select your birth date (must be before 2010)</span>
<mjo-calendar name="birthDate" mode="single" aria-labelledby="birth-date-label" aria-describedby="birth-date-help" max-date="2009-12-31"></mjo-calendar>

<!-- Theming and sizing -->
<mjo-calendar mode="single" color="secondary" size="large"></mjo-calendar>

<!-- Customization with event markers (visual feature) -->
<mjo-calendar
    mode="single"
    event-markers='[
        {"date": "2025-01-15", "color": "#ff6b6b", "tooltip": "Important meeting"},
        {"date": "2025-01-20", "color": "#4ecdc4", "tooltip": "Vacation starts"}
    ]'
></mjo-calendar>

<!-- Form integration -->
<mjo-form>
    <mjo-calendar name="eventDate" mode="single" required></mjo-calendar>
    <mjo-calendar name="vacationPeriod" mode="range"></mjo-calendar>
</mjo-form>

<!-- Disable features for controlled environments -->
<mjo-calendar mode="single" enable-keyboard-navigation="false" announce-selections="false" show-today="false"></mjo-calendar>
```

## Basic Examples

### Single Date Selection

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-single")
export class ExampleCalendarSingle extends LitElement {
    @state() private selectedDate = "";

    private handleDateSelected = (e: CustomEvent) => {
        this.selectedDate = e.detail.value || "";
        console.log("Selected date:", e.detail);
    };

    render() {
        return html`
            <h3>Single Date Selection</h3>
            <mjo-calendar
                mode="single"
                .value=${this.selectedDate}
                @mjo-calendar:date-selected=${this.handleDateSelected}
                @change=${this.handleDateSelected}
            ></mjo-calendar>
            <p>Selected: ${this.selectedDate || "None"}</p>
        `;
    }
}
```

### Date Range Selection

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-range")
export class ExampleCalendarRange extends LitElement {
    @state() private selectedRange = { start: "", end: "" };

    private handleRangeSelected = (e: CustomEvent) => {
        this.selectedRange = {
            start: e.detail.startDateValue || "",
            end: e.detail.endDateValue || "",
        };
        console.log("Selected range:", e.detail);
    };

    render() {
        return html`
            <h3>Date Range Selection</h3>
            <mjo-calendar
                mode="range"
                range-calendars="auto"
                .startDate=${this.selectedRange.start}
                .endDate=${this.selectedRange.end}
                @mjo-calendar:range-selected=${this.handleRangeSelected}
                @change=${this.handleRangeSelected}
            ></mjo-calendar>
            <p>Range: ${this.selectedRange.start || "None"} - ${this.selectedRange.end || "None"}</p>
        `;
    }
}
```

### Internationalization Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-i18n")
export class ExampleCalendarI18n extends LitElement {
    render() {
        return html` <mjo-calendar locale="es" mode="single" first-day-of-week="monday"></mjo-calendar> `;
    }
}
```

### Date Constraints Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-constraints")
export class ExampleCalendarConstraints extends LitElement {
    private disabledDates = ["2025-02-14", "2025-07-04", "2025-12-25"];

    render() {
        return html` <mjo-calendar mode="single" min-date="2025-01-01" max-date="2025-12-31" .disabledDates=${this.disabledDates}></mjo-calendar> `;
    }
}
```

## Form Integration Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-button";

@customElement("example-calendar-form")
export class ExampleCalendarForm extends LitElement {
    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <div style="display: grid; gap: 16px; max-width: 600px;">
                    <mjo-calendar name="eventDate" mode="single" min-date="2025-01-01" required></mjo-calendar>

                    <mjo-calendar name="vacationPeriod" mode="range" min-date="2025-01-01"></mjo-calendar>

                    <mjo-button type="submit">Submit Dates</mjo-button>
                </div>
            </mjo-form>
        `;
    }

    private handleSubmit = (event: CustomEvent) => {
        console.log("Form data:", event.detail);
        // event.detail will contain: { eventDate: "2025-01-15", vacationPeriod: "{\"start\":\"2025-07-01\",\"end\":\"2025-07-14\"}" }
    };
}
```

## Theming and Customization Examples

### Basic Theme Customization

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-theming")
export class ExampleCalendarTheming extends LitElement {
    private customTheme = {
        selectedBackground: "#7C3AED",
        todayBackground: "#DDD6FE",
        todayColor: "#7C3AED",
        borderRadius: "12px",
        padding: "20px",
    };

    render() {
        return html` <mjo-calendar mode="single" color="primary" size="medium" .theme=${this.customTheme}></mjo-calendar> `;
    }
}
```

## Customization Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-custom")
export class ExampleCalendarCustom extends LitElement {
    private calendarTheme = {
        selectedBackground: "#7C3AED",
        selectedColor: "#ffffff",
        todayBackground: "#DDD6FE",
        todayColor: "#7C3AED",
        borderRadius: "12px",
        shadow: "0 4px 20px rgba(124, 58, 237, 0.15)",
    };

    render() {
        return html`
            <mjo-calendar
                mode="single"
                size="large"
                color="secondary"
                locale="es"
                first-day-of-week="monday"
                .theme=${this.calendarTheme}
                .disabled-dates=${["2025-01-15", "2025-01-20"]}
            ></mjo-calendar>
        `;
    }
}
```

## Attributes / Properties

| Name                       | Type                                                      | Default     | Reflects | Description                                         |
| -------------------------- | --------------------------------------------------------- | ----------- | -------- | --------------------------------------------------- |
| `mode`                     | `"single" \| "range"`                                     | `"single"`  | no       | Calendar selection mode                             |
| `name`                     | `string \| undefined`                                     | `undefined` | no       | Form field name for integration with mjo-form       |
| `value`                    | `string \| undefined`                                     | `undefined` | no       | Selected date in YYYY-MM-DD format (single mode)    |
| `startDate`                | `string \| undefined`                                     | `undefined` | no       | Start date for range selection in YYYY-MM-DD format |
| `endDate`                  | `string \| undefined`                                     | `undefined` | no       | End date for range selection in YYYY-MM-DD format   |
| `locale`                   | `SupportedLocale`                                         | `"en"`      | no       | Language locale for months/days translation         |
| `minDate`                  | `string \| undefined`                                     | `undefined` | no       | Minimum selectable date in YYYY-MM-DD format        |
| `maxDate`                  | `string \| undefined`                                     | `undefined` | no       | Maximum selectable date in YYYY-MM-DD format        |
| `disabled`                 | `boolean`                                                 | `false`     | yes      | Disables calendar interaction                       |
| `size`                     | `"small" \| "medium" \| "large"`                          | `"medium"`  | no       | Calendar size                                       |
| `color`                    | `"primary" \| "secondary"`                                | `"primary"` | no       | Color theme                                         |
| `disabledDates`            | `string[] \| undefined`                                   | `undefined` | no       | Array of disabled dates in YYYY-MM-DD format        |
| `showToday`                | `boolean`                                                 | `true`      | no       | Highlight today's date                              |
| `firstDayOfWeek`           | `"sunday" \| "monday"`                                    | `"monday"`  | no       | First day of the week                               |
| `rangeCalendars`           | `"1" \| "2" \| "auto"`                                    | `"auto"`    | no       | Range mode calendar layout strategy                 |
| `ariaLabel`                | `string \| null`                                          | `null`      | no       | Accessible label for the calendar                   |
| `ariaLabelledby`           | `string \| null`                                          | `null`      | no       | ID of element that labels the calendar              |
| `ariaDescribedby`          | `string \| null`                                          | `null`      | no       | ID of element that describes the calendar           |
| `ariaLive`                 | `"polite" \| "assertive" \| "off"`                        | `"polite"`  | no       | Live region politeness for announcements            |
| `eventMarkers`             | `Array<{date: string; color?: string; tooltip?: string}>` | `undefined` | no       | Event markers for specific dates (visual only)      |
| `enableKeyboardNavigation` | `boolean`                                                 | `true`      | no       | Enable/disable keyboard navigation                  |
| `announceSelections`       | `boolean`                                                 | `true`      | no       | Enable/disable selection announcements              |
| `theme`                    | `Record<string, string>`                                  | `undefined` | no       | Theme object for ThemeMixin customization           |

### Supported Locales

The `locale` property supports the following languages with full month names, abbreviations, and weekday labels:

| Code | Language   | Code | Language  | Code | Language |
| ---- | ---------- | ---- | --------- | ---- | -------- |
| `en` | English    | `es` | Español   | `fr` | Français |
| `pt` | Português  | `it` | Italiano  | `de` | Deutsch  |
| `nl` | Nederlands | `bg` | Български | `sr` | Српски   |
| `ru` | Русский    | `zh` | 中文      | `ja` | 日本語   |
| `ko` | 한국어     | `tr` | Türkçe    | `pl` | Polski   |

### Range Calendar Layout (`rangeCalendars`)

Controls how many calendars are shown in **range** mode:

| Value    | Behavior                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------- |
| `"1"`    | Always render a single calendar (still supports selecting start then end)                           |
| `"2"`    | Always render two adjacent months (left + right)                                                    |
| `"auto"` | (Default) Render two calendars when the host (or parent) width ≥ 720px; otherwise fall back to one. |

The auto mode uses a `ResizeObserver` for responsive adaptation. The threshold is defined by `MjoCalendar.AUTO_DUAL_THRESHOLD = 720` pixels.

### Size Variations

| Size     | Description             | Font Size | Day Cell Height |
| -------- | ----------------------- | --------- | --------------- |
| `small`  | Compact calendar        | ~10px     | 28px            |
| `medium` | Standard size (default) | ~14px     | 32px            |
| `large`  | Expanded calendar       | ~16px     | 40px            |

### Behavior Notes

-   **Single Mode**: Clicking a date selects it and fires `mjo-calendar:date-selected` + `change` events.
-   **Range Mode**: First valid click sets start date, second sets end date and fires `mjo-calendar:range-selected` + `change` events.
-   **Date Ordering**: If the second selected date is earlier than the first, dates are automatically swapped (start ≤ end guarantee).
-   **Navigation**: Month/year navigation ignores constraints; constraints only block selection.
-   **Constraints**: Selection is vetoed by `minDate`, `maxDate`, and `disabledDates`.
-   **Adjacent Months**: In range mode with two calendars, months are always adjacent (left is month N, right is N+1).
-   **Responsive**: `range-calendars="auto"` dynamically toggles dual layout depending on 720px width threshold.
-   **Form Integration**: Automatically integrates with `mjo-form` when `name` property is set.
-   **Today Highlighting**: Today's date is automatically highlighted unless `showToday` is false.

## Events

| Event                         | Detail (shape)                                                                                                                                                                | Emitted When                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `mjo-calendar:date-selected`  | `{ date?: Date, value?: string }`                                                                                                                                             | Date is selected (single mode)        |
| `mjo-calendar:range-selected` | `{ startDate?: Date, endDate?: Date, startDateValue?: string, endDateValue?: string }`                                                                                        | Date range fully selected (both ends) |
| `change`                      | Mirrors `mjo-calendar:date-selected` (single) or `mjo-calendar-` (range) with identical detail fields (adds compatibility for generic form handlers & change event listeners) | Date selection changes                |

### Event Details

All events expose date(s) in two forms:

-   **Date objects** (`date`, `startDate`, `endDate`) – Native JavaScript Date objects for programmatic use.
-   **String values** (`value`, `startDateValue`, `endDateValue`) – ISO format `YYYY-MM-DD` strings for display, forms, and storage.

### Event Examples

```ts
// Single mode events
calendar.addEventListener("mjo-calendar:date-selected", (e) => {
    console.log("Date object:", e.detail.date); // Date object or undefined
    console.log("Date string:", e.detail.value); // "2025-01-15" or undefined
});

// Range mode events
calendar.addEventListener("mjo-calendar:range-selected", (e) => {
    console.log("Start date:", e.detail.startDate); // Date object or undefined
    console.log("End date:", e.detail.endDate); // Date object or undefined
    console.log("Start string:", e.detail.startDateValue); // "2025-01-15" or undefined
    console.log("End string:", e.detail.endDateValue); // "2025-01-20" or undefined
});

// Universal change event (works for both modes)
calendar.addEventListener("change", (e) => {
    if (calendar.mode === "single") {
        console.log("Selected date:", e.detail.value);
    } else {
        console.log("Selected range:", e.detail.startDateValue, "to", e.detail.endDateValue);
    }
});
```

## Public Programmatic API

The calendar provides a comprehensive API for programmatic control without directly manipulating internal state.

### Navigation Methods

| Method                                                                              | Description                                                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `getDisplayedMonths(): {month; year;}[]`                                            | Returns a shallow copy (length 1 or 2) of the months currently rendered.                               |
| `setDisplayedMonths(months, enforceAdj = true)`                                     | Sets one or two months. If two and `enforceAdj` is true (default), second is coerced to be next month. |
| `setMonth(side, month)`                                                             | Sets the month (0–11) for `"single"`, `"left"`, or `"right"` side, preserving adjacency in range mode. |
| `goToDate({ date: string \| Date, side?: 'single' \| 'left' \| 'right' })`          | Navigate to the specific date for the given side.                                                      |
| `goToMonth({ month: number, year?: number, side?: 'single' \| 'left' \| 'right' })` | Navigate to the month for the given side.                                                              |
| `goToYear({ year: number, side?: 'single' \| 'left' \| 'right' })`                  | Navigate to the year for the given side.                                                               |

### Selection Methods

| Method                   | Description                                                                     |
| ------------------------ | ------------------------------------------------------------------------------- |
| `selectDate(date: Date)` | Programmatically select a date (mirrors user click behavior with validation)    |
| `resetSelection()`       | Clear any current selection (single or range) without changing displayed months |
| `reset()`                | Full reset: clear selection, reset to today's month, close any open pickers     |

### Side Semantics

-   `"single"`: Used when `mode="single"` (always index 0).
-   `"left"`, `"right"`: Applicable only in range mode. In dual calendar mode they map to calendar indices 0 and 1 respectively.

### API Usage Examples

#### Basic Navigation

```ts
const calendar = document.querySelector("mjo-calendar");

// Get current displayed months
const months = calendar.getDisplayedMonths();
console.log("Current months:", months); // [{ month: 0, year: 2025 }]

// Jump to specific month (single mode)
calendar.setDisplayedMonths([{ month: 11, year: 2025 }]); // December 2025

// Navigate month by month
const [current] = calendar.getDisplayedMonths();
const nextMonth = new Date(current.year, current.month + 1);
calendar.setDisplayedMonths([
    {
        month: nextMonth.getMonth(),
        year: nextMonth.getFullYear(),
    },
]);
```

#### Range Mode Navigation

```ts
const rangeCalendar = document.querySelector('mjo-calendar[mode="range"]');

// Set specific month for left side (right will be adjacent)
rangeCalendar.setMonth("left", 2); // March (right becomes April)

// Set year for right side
rangeCalendar.setYear("right", 2026);

// Jump to specific month pair
rangeCalendar.setDisplayedMonths([
    { month: 2, year: 2025 }, // March 2025
    { month: 3, year: 2025 }, // April 2025 (adjacent)
]);

// Force non-adjacent months (disable adjacency enforcement)
rangeCalendar.setDisplayedMonths(
    [
        { month: 0, year: 2025 }, // January 2025
        { month: 5, year: 2025 }, // June 2025
    ],
    false,
);
```

#### Programmatic Selection

```ts
// Select today's date programmatically
calendar.selectDate(new Date());

// Select a specific date
calendar.selectDate(new Date("2025-12-25"));

// Clear current selection
calendar.resetSelection();

// Full reset to initial state
calendar.reset();
```

#### Advanced Navigation Helper

```ts
function navigateCalendar(calendar, direction) {
    const [current] = calendar.getDisplayedMonths();
    const targetDate = new Date(current.year, current.month + direction, 1);

    calendar.setDisplayedMonths([
        {
            month: targetDate.getMonth(),
            year: targetDate.getFullYear(),
        },
    ]);
}

// Usage
const prevButton = document.querySelector("#prev-month");
const nextButton = document.querySelector("#next-month");

prevButton.addEventListener("click", () => navigateCalendar(calendar, -1));
nextButton.addEventListener("click", () => navigateCalendar(calendar, 1));
```

## CSS Variables

The component provides extensive CSS customization through variables with fallbacks to global theme tokens.

### Core Structure

| Variable                       | Fallback                       | Purpose                   |
| ------------------------------ | ------------------------------ | ------------------------- |
| `--mjo-calendar-font-family`   | `--mjo-font-family`            | Calendar font family      |
| `--mjo-calendar-background`    | `--mjo-background-color`       | Calendar background       |
| `--mjo-calendar-border`        | `1px solid --mjo-border-color` | Calendar border           |
| `--mjo-calendar-border-radius` | `--mjo-radius-medium`          | Calendar border radius    |
| `--mjo-calendar-shadow`        | `0 2px 8px rgba(0,0,0,0.1)`    | Calendar shadow           |
| `--mjo-calendar-padding`       | `16px`                         | Calendar internal padding |

### Week Headers

| Variable                              | Fallback                     | Purpose                      |
| ------------------------------------- | ---------------------------- | ---------------------------- |
| `--mjo-calendar-week-day-color`       | `--mjo-foreground-color-low` | Week day headers text color  |
| `--mjo-calendar-week-day-font-weight` | `600`                        | Week day headers font weight |

### Day Cells

| Variable                              | Fallback                      | Purpose                      |
| ------------------------------------- | ----------------------------- | ---------------------------- |
| `--mjo-calendar-day-border-radius`    | `4px`                         | Individual day border radius |
| `--mjo-calendar-day-hover-background` | `--mjo-background-color-high` | Day hover background         |
| `--mjo-calendar-focus-outline`        | `--mjo-primary-color`         | Focused day outline color    |

### Today's Date

| Variable                          | Fallback                     | Purpose                 |
| --------------------------------- | ---------------------------- | ----------------------- |
| `--mjo-calendar-today-background` | `--mjo-primary-color-alpha2` | Today's date background |
| `--mjo-calendar-today-color`      | `--mjo-primary-color`        | Today's date text color |

### Selected Dates

| Variable                             | Fallback              | Purpose                  |
| ------------------------------------ | --------------------- | ------------------------ |
| `--mjo-calendar-selected-background` | `--mjo-primary-color` | Selected date background |
| `--mjo-calendar-selected-color`      | `white`               | Selected date text color |

### Range Selection

| Variable                                   | Fallback                     | Purpose                       |
| ------------------------------------------ | ---------------------------- | ----------------------------- |
| `--mjo-calendar-range-endpoint-background` | `--mjo-primary-color`        | Range start/end background    |
| `--mjo-calendar-range-endpoint-color`      | `white`                      | Range start/end text color    |
| `--mjo-calendar-range-background`          | `--mjo-primary-color-alpha1` | Range middle dates background |
| `--mjo-calendar-range-color`               | `--mjo-primary-color`        | Range middle dates text color |

### Disabled State

| Variable                             | Fallback                          | Purpose                   |
| ------------------------------------ | --------------------------------- | ------------------------- |
| `--mjo-calendar-disabled-color`      | `--mjo-disabled-foreground-color` | Disabled dates text color |
| `--mjo-calendar-disabled-background` | `transparent`                     | Disabled dates background |

### Secondary Color Theme

When `color="secondary"`, these variables apply:

| Variable                                             | Fallback                       | Purpose                          |
| ---------------------------------------------------- | ------------------------------ | -------------------------------- |
| `--mjo-calendar-today-background-secondary`          | `--mjo-secondary-color-alpha2` | Today background (secondary)     |
| `--mjo-calendar-today-color-secondary`               | `--mjo-secondary-color`        | Today text color (secondary)     |
| `--mjo-calendar-selected-background-secondary`       | `--mjo-secondary-color`        | Selected background (secondary)  |
| `--mjo-calendar-selected-color-secondary`            | `white`                        | Selected text color (secondary)  |
| `--mjo-calendar-range-endpoint-background-secondary` | `--mjo-secondary-color`        | Range endpoints (secondary)      |
| `--mjo-calendar-range-endpoint-color-secondary`      | `white`                        | Range endpoints text (secondary) |
| `--mjo-calendar-range-background-secondary`          | `--mjo-secondary-color-alpha1` | Range background (secondary)     |
| `--mjo-calendar-range-color-secondary`               | `--mjo-secondary-color`        | Range text color (secondary)     |

### Month/Year Pickers

| Variable                                           | Fallback                         | Purpose                           |
| -------------------------------------------------- | -------------------------------- | --------------------------------- |
| `--mjo-calendar-picker-background`                 | `--mjo-background-color`         | Picker overlay background         |
| `--mjo-calendar-picker-radius`                     | `--mjo-radius-medium`            | Picker border radius              |
| `--mjo-calendar-picker-shadow`                     | `0 4px 12px rgba(0,0,0,0.15)`    | Picker shadow                     |
| `--mjo-calendar-picker-button-background`          | `transparent`                    | Picker button background          |
| `--mjo-calendar-picker-button-border`              | `1px solid --mjo-border-color`   | Picker button border              |
| `--mjo-calendar-picker-button-radius`              | `--mjo-radius-medium`            | Picker button border radius       |
| `--mjo-calendar-picker-button-color`               | `--mjo-foreground-color-low`     | Picker button text color          |
| `--mjo-calendar-picker-button-hover-background`    | `--mjo-primary-color-alpha2`     | Picker button hover background    |
| `--mjo-calendar-picker-button-hover-border`        | `--mjo-primary-color`            | Picker button hover border        |
| `--mjo-calendar-picker-button-focus-outline`       | `--mjo-primary-color`            | Picker button focus outline       |
| `--mjo-calendar-picker-button-selected-background` | `--mjo-primary-color`            | Picker button selected background |
| `--mjo-calendar-picker-button-selected-border`     | `--mjo-primary-color`            | Picker button selected border     |
| `--mjo-calendar-picker-button-selected-color`      | `--mjo-primary-foreground-color` | Picker button selected text color |

### Navigation Controls

| Variable                                         | Fallback                        | Purpose                                |
| ------------------------------------------------ | ------------------------------- | -------------------------------------- |
| `--mjo-calendar-nav-background`                  | `transparent`                   | Navigation button background           |
| `--mjo-calendar-nav-border`                      | `1px solid --mjo-border-color`  | Navigation button border               |
| `--mjo-calendar-nav-color`                       | `--mjo-foreground-color`        | Navigation button text color           |
| `--mjo-calendar-nav-hover-background`            | `--mjo-primary-color-alpha2`    | Navigation button hover background     |
| `--mjo-calendar-nav-radius`                      | `--mjo-radius-medium`           | Navigation button border radius        |
| `--mjo-calendar-nav-hover-border`                | `--mjo-primary-color`           | Navigation button hover border         |
| `--mjo-calendar-nav-focus-outline`               | `--mjo-primary-color`           | Navigation button focus outline        |
| `--mjo-calendar-decade-label-color`              | `--mjo-foreground-color`        | Year picker decade label text color    |
| `--mjo-calendar-nav-button-border`               | `1px solid --mjo-primary-color` | Header navigation button border        |
| `--mjo-calendar-nav-button-color`                | `--mjo-primary-color`           | Header navigation button text color    |
| `--mjo-calendar-selector-button-color`           | `--mjo-foreground-color`        | Month/year selector button text color  |
| `--mjo-calendar-selector-button-highlight-color` | `--mjo-background-color-high`   | Selector button hover background color |

### CSS Customization Examples

#### Basic Color Customization

```css
/* Custom purple theme */
mjo-calendar {
    --mjo-calendar-selected-background: #7c3aed;
    --mjo-calendar-today-background: #ddd6fe;
    --mjo-calendar-today-color: #7c3aed;
    --mjo-calendar-range-background: rgba(124, 58, 237, 0.2);
    --mjo-calendar-range-color: #7c3aed;
}
```

#### Dark Theme Styling

```css
mjo-calendar.dark-theme {
    --mjo-calendar-background: #1a1a1a;
    --mjo-calendar-border: #333;
    --mjo-calendar-week-day-color: #888;
    --mjo-calendar-day-hover-background: #333;
    --mjo-calendar-today-background: rgba(59, 130, 246, 0.2);
    --mjo-calendar-selected-background: #3b82f6;
    --mjo-calendar-disabled-color: #555;
}
```

#### Rounded Modern Look

```css
mjo-calendar.rounded {
    --mjo-calendar-border-radius: 16px;
    --mjo-calendar-day-border-radius: 8px;
    --mjo-calendar-selected-background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    --mjo-calendar-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## ThemeMixin Integration

The component supports `ThemeMixin` for component-specific theming through the complete `MjoCalendarTheme` interface.

### MjoCalendarTheme Interface

The component exposes a comprehensive theming interface with all available CSS customization properties:

```ts
export interface MjoCalendarTheme {
    // Core structure
    fontFamily?: string; // --mjo-calendar-font-family
    background?: string; // --mjo-calendar-background
    border?: string; // --mjo-calendar-border
    borderRadius?: string; // --mjo-calendar-border-radius
    shadow?: string; // --mjo-calendar-shadow
    padding?: string; // --mjo-calendar-padding

    // Week headers
    weekDayColor?: string; // --mjo-calendar-week-day-color
    weekDayFontWeight?: string; // --mjo-calendar-week-day-font-weight

    // Day cells
    dayBorderRadius?: string; // --mjo-calendar-day-border-radius
    dayHoverBackground?: string; // --mjo-calendar-day-hover-background
    focusOutline?: string; // --mjo-calendar-focus-outline

    // Today's date
    todayBackground?: string; // --mjo-calendar-today-background
    todayColor?: string; // --mjo-calendar-today-color

    // Selected dates
    selectedBackground?: string; // --mjo-calendar-selected-background
    selectedColor?: string; // --mjo-calendar-selected-color

    // Range selection
    rangeEndpointBackground?: string; // --mjo-calendar-range-endpoint-background
    rangeEndpointColor?: string; // --mjo-calendar-range-endpoint-color
    rangeBackground?: string; // --mjo-calendar-range-background
    rangeColor?: string; // --mjo-calendar-range-color

    // Disabled state
    disabledColor?: string; // --mjo-calendar-disabled-color
    disabledBackground?: string; // --mjo-calendar-disabled-background

    // Secondary color theme (when color="secondary")
    todayBackgroundSecondary?: string; // --mjo-calendar-today-background-secondary
    todayColorSecondary?: string; // --mjo-calendar-today-color-secondary
    selectedBackgroundSecondary?: string; // --mjo-calendar-selected-background-secondary
    selectedColorSecondary?: string; // --mjo-calendar-selected-color-secondary
    rangeBackgroundSecondary?: string; // --mjo-calendar-range-background-secondary
    rangeColorSecondary?: string; // --mjo-calendar-range-color-secondary

    // Month/Year picker overlay
    pickerBackground?: string; // --mjo-calendar-picker-background
    pickerRadius?: string; // --mjo-calendar-picker-radius
    pickerShadow?: string; // --mjo-calendar-picker-shadow

    // Picker buttons (months/years)
    pickerButtonBackground?: string; // --mjo-calendar-picker-button-background
    pickerButtonBorder?: string; // --mjo-calendar-picker-button-border
    pickerButtonRadius?: string; // --mjo-calendar-picker-button-radius
    pickerButtonColor?: string; // --mjo-calendar-picker-button-color
    pickerButtonHoverBackground?: string; // --mjo-calendar-picker-button-hover-background
    pickerButtonHoverBorder?: string; // --mjo-calendar-picker-button-hover-border
    pickerButtonFocusOutline?: string; // --mjo-calendar-picker-button-focus-outline
    pickerButtonSelectedBackground?: string; // --mjo-calendar-picker-button-selected-background
    pickerButtonSelectedBorder?: string; // --mjo-calendar-picker-button-selected-border
    pickerButtonSelectedColor?: string; // --mjo-calendar-picker-button-selected-color

    // Year picker navigation
    navBackground?: string; // --mjo-calendar-nav-background
    navBorder?: string; // --mjo-calendar-nav-border
    navRadius?: string; // --mjo-calendar-nav-radius
    navColor?: string; // --mjo-calendar-nav-color
    navHoverBackground?: string; // --mjo-calendar-nav-hover-background
    navHoverBorder?: string; // --mjo-calendar-nav-hover-border
    navFocusOutline?: string; // --mjo-calendar-nav-focus-outline
    decadeLabelColor?: string; // --mjo-calendar-decade-label-color

    // Header navigation controls
    navButtonBorder?: string; // --mjo-calendar-nav-button-border
    navButtonColor?: string; // --mjo-calendar-nav-button-color
    selectorButtonColor?: string; // --mjo-calendar-selector-button-color
    selectorButtonHighlightColor?: string; // --mjo-calendar-selector-button-highlight-color
}
```

### ThemeMixin Usage Examples

#### Basic Theme Customization

```ts
@customElement("themed-calendar-example")
export class ThemedCalendarExample extends LitElement {
    private calendarTheme: Partial<MjoCalendarTheme> = {
        background: "#f8fafc",
        selectedBackground: "#8b5cf6",
        todayBackground: "#e5e7eb",
        todayColor: "#6b7280",
        borderRadius: "12px",
        dayBorderRadius: "6px",
        padding: "24px",
        shadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    };

    render() {
        return html` <mjo-calendar mode="single" .theme=${this.calendarTheme}></mjo-calendar> `;
    }
}
```

#### Complete Theme Configuration

```ts
@customElement("advanced-themed-calendar")
export class AdvancedThemedCalendar extends LitElement {
    private darkCalendarTheme: Partial<MjoCalendarTheme> = {
        // Core structure
        background: "#1f2937",
        border: "1px solid #374151",
        borderRadius: "16px",
        shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",

        // Week headers
        weekDayColor: "#9ca3af",
        weekDayFontWeight: "500",

        // Day cells
        dayBorderRadius: "8px",
        dayHoverBackground: "#374151",
        focusOutline: "#60a5fa",

        // Today's date
        todayBackground: "#1e40af",
        todayColor: "#ffffff",

        // Selected dates
        selectedBackground: "#7c3aed",
        selectedColor: "#ffffff",

        // Range selection
        rangeEndpointBackground: "#7c3aed",
        rangeEndpointColor: "#ffffff",
        rangeBackground: "#5b21b6",
        rangeColor: "#e5e7eb",

        // Disabled state
        disabledColor: "#6b7280",
        disabledBackground: "transparent",

        // Picker overlay
        pickerBackground: "#111827",
        pickerRadius: "12px",
        pickerShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",

        // Picker buttons
        pickerButtonBackground: "#374151",
        pickerButtonBorder: "1px solid #4b5563",
        pickerButtonRadius: "6px",
        pickerButtonColor: "#d1d5db",
        pickerButtonHoverBackground: "#4b5563",
        pickerButtonHoverBorder: "#6b7280",
        pickerButtonSelectedBackground: "#7c3aed",
        pickerButtonSelectedColor: "#ffffff",

        // Navigation
        navBackground: "#374151",
        navBorder: "1px solid #4b5563",
        navRadius: "6px",
        navColor: "#d1d5db",
        navHoverBackground: "#4b5563",
        decadeLabelColor: "#f9fafb",
    };

    render() {
        return html` <mjo-calendar mode="range" .theme=${this.darkCalendarTheme} size="large"></mjo-calendar> `;
    }
}
```

## Performance Considerations

### Responsive Behavior

The `range-calendars="auto"` mode uses a `ResizeObserver` to detect container width changes and automatically switch between single and dual calendar layouts at the 720px breakpoint. This provides optimal user experience without manual configuration.

### Memory Management

-   The component automatically cleans up event listeners and ResizeObserver on disconnection
-   Date calculations are optimized to minimize object creation
-   Month/year picker components are created on-demand

### Best Practices

1. **Use appropriate sizing**: Choose `size="small"` for compact layouts, `size="large"` for touch interfaces
2. **Optimize constraints**: Use `minDate` and `maxDate` to limit navigation range when possible
3. **Leverage programmatic API**: Use the public methods for complex navigation instead of manipulating properties
4. **Form integration**: Always use `name` attribute for form integration to ensure proper data collection

## Browser Support

The `mjo-calendar` component is built on modern web standards and supports:

-   **Modern browsers**: Chrome 80+, Firefox 72+, Safari 13+, Edge 80+
-   **Web Components**: Uses standard Custom Elements v1 and Shadow DOM
-   **ES2020 features**: Requires modern JavaScript support
-   **ResizeObserver**: Used for responsive behavior (has polyfill fallback)

## Related Components

-   **`mjo-date-picker`**: Input field with calendar popup for form inputs
-   **`mjo-form`**: Form container with validation and data collection
-   **`mjo-theme`**: Global theme management
-   **`mjo-button`**: Used in navigation controls

## Migration Notes

### From Previous Versions

If you're upgrading from earlier versions of `mjo-calendar`:

1. **Legacy Properties Removed**: Direct access to `currentMonth`, `leftCalendarYear`, etc. has been removed. Use the new programmatic API methods instead.

2. **Event Structure**: Events now provide both Date objects and string values for better flexibility.

3. **Range Layout**: The `range-calendars` attribute now defaults to `"auto"` for responsive behavior.

### Code Migration Examples

```ts
// OLD (deprecated)
calendar.currentMonth = 5;
calendar.currentYear = 2025;

// NEW (recommended)
calendar.setDisplayedMonths([{ month: 5, year: 2025 }]);

// OLD (deprecated)
const month = calendar.currentMonth;

// NEW (recommended)
const [{ month }] = calendar.getDisplayedMonths();
```

## Troubleshooting

### Common Issues

**Calendar not showing dates**

-   Ensure the component is properly connected to the DOM
-   Check that locale is supported (defaults to "en")
-   Verify no CSS is hiding the calendar content

**Range selection not working**

-   Confirm `mode="range"` is set
-   Check that dates aren't disabled by constraints
-   Verify event listeners are properly attached

**Responsive layout not switching**

-   Ensure `range-calendars="auto"` (default)
-   Check that ResizeObserver is supported (modern browsers)
-   Verify container width calculations

**Keyboard navigation not working**

-   Check that `enableKeyboardNavigation` is `true` (default)
-   Ensure the calendar has proper focus (click on it or tab to it)
-   Verify no other elements are preventing keyboard events

**Accessibility announcements not working**

-   Check that `announceSelections` is `true` (default)
-   Ensure `ariaLive` is set to `"polite"` or `"assertive"`
-   Verify screen reader is running and configured properly

### Debug Mode

For development and debugging, you can listen to all events:

```ts
const calendar = document.querySelector("mjo-calendar");

// Debug all calendar events
calendar.addEventListener("mjo-calendar:date-selected", (e) => console.log("Date selected:", e.detail));
calendar.addEventListener("mjo-calendar:range-selected", (e) => console.log("Range selected:", e.detail));
calendar.addEventListener("change", (e) => console.log("Calendar changed:", e.detail));

// Monitor displayed months
const observer = new MutationObserver(() => {
    console.log("Current months:", calendar.getDisplayedMonths());
});
```

## CSS Parts

| Part                       | Description                               |
| -------------------------- | ----------------------------------------- |
| `calendar`                 | Main calendar container                   |
| `header`                   | Calendar header with navigation           |
| `navigation`               | Navigation buttons container              |
| `nav-button`               | Previous/next navigation buttons          |
| `selectors-container`      | Month and year selector buttons container |
| `selector-button`          | Month and year selector buttons           |
| `calendar-grid`            | The calendar grid container               |
| `week-days-container`      | Container for weekday headers             |
| `week-day`                 | Individual weekday header                 |
| `days-container`           | Container for calendar days               |
| `day`                      | Individual day cell                       |
| `day-selected`             | Selected day(s) - automatically applied   |
| `day-today`                | Today's date - automatically applied      |
| `month-picker-container`   | Month picker overlay container            |
| `month-picker-grid`        | Month picker grid                         |
| `month-picker-button`      | Individual month selection button         |
| `year-picker-container`    | Year picker overlay container             |
| `year-picker-navigation`   | Year picker navigation container          |
| `year-picker-nav-button`   | Year picker previous/next decade buttons  |
| `year-picker-decade-label` | Decade range label in year picker         |
| `year-picker-grid`         | Year picker grid                          |
| `year-picker-button`       | Individual year selection button          |

## Browser Support

The `mjo-calendar` component is built on modern web standards and supports:

-   **Modern browsers**: Chrome 80+, Firefox 72+, Safari 13+, Edge 80+
-   **Web Components**: Uses standard Custom Elements v1 and Shadow DOM
-   **ES2020 features**: Requires modern JavaScript support
-   **ResizeObserver**: Used for responsive behavior (graceful fallback for older browsers)
-   **Internationalization**: Relies on `Intl.DateTimeFormat` for localized date formatting

## Performance Notes

-   **Efficient Rendering**: Uses Lit's reactive update system for optimal performance
-   **Memory Management**: Automatic cleanup of event listeners and observers
-   **Date Calculations**: Optimized algorithms for calendar generation and navigation
-   **Range Hover**: Debounced hover effects to minimize unnecessary redraws
-   **Responsive Layout**: Uses `ResizeObserver` for efficient responsive behavior
-   **On-Demand Pickers**: Month/year picker components are created only when needed

## Related Components

-   **`mjo-date-picker`**: Input field with calendar popup for form inputs
-   **`mjo-form`**: Form container with validation and data collection
-   **`mjo-theme`**: Global theme management component
-   **`mjo-button`**: Button component used in navigation controls

## Contributing

This component is part of the mjo-litui design system. For bug reports, feature requests, or contributions:

1. Check existing issues in the repository
2. Follow the component development guidelines
3. Include test cases for new features
4. Update documentation for API changes

## License

This component is part of the mjo-litui library and follows the same license terms as the main project.
