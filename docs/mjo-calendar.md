# mjo-calendar

A comprehensive calendar component for date selection that supports both single date and date range selection modes. Features intuitive navigation controls, adaptive dual-calendar rendering in range mode, internationalization support for 15 languages, form integration via `FormMixin`, extensive theming capabilities through `ThemeMixin`, and a powerful programmatic API.

## Key Features

-   **Dual Selection Modes**: Single date or date range selection
-   **Adaptive Layout**: Intelligent dual-calendar layout in range mode based on container# nextButton.addEventListener('click', () => navigateCalendar(calendar, 1));

````

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
````

### Form Data Format

When integrated with forms, the calendar component submits data in the following formats:

-   **Single mode**: `{ fieldName: "2025-01-15" }` (string in YYYY-MM-DD format)
-   **Range mode**: `{ fieldName: "2025-01-10,2025-01-20" }` (comma-separated string)

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
            const [start, end] = formData.vacationPeriod.split(",");
            console.log("Vacation:", start, "to", end); // "2025-07-01" to "2025-07-14"
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

The `mjo-calendar` component is designed with accessibility in mind:

### Keyboard Navigation

-   **Arrow Keys**: Navigate between dates
-   **Enter/Space**: Select date
-   **Tab**: Navigate between interactive elements
-   **Escape**: Close month/year pickers

### Screen Reader Support

-   Proper ARIA labels for dates and navigation
-   Semantic structure for calendar grid
-   Announced selection changes
-   Clear focus indicators

### Best Practices

```html
<!-- Provide descriptive labels for form integration -->
<mjo-calendar name="appointmentDate" mode="single" aria-label="Select appointment date"></mjo-calendar>

<!-- Use appropriate sizing for touch interfaces -->
<mjo-calendar size="large" mode="single"></mjo-calendar>
```

> **Legacy API Note**: Previous versions exposed direct property accessors (`currentMonth`, `leftCalendarYear`, etc.). These have been removed in favor of the new methods for better encapsulation and maintainability.

## CSS Variables

The component provides extensive CSS customization through variables with fallbacks to global theme tokens.

### Core Structure

| Variable                     | Fallback            | Purpose     |
| ---------------------------- | ------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| `--mjo-calendar-font-family` | `--mjo-font-family` | Font family | ll Internationalization\*\*: Support for 15 languages with localized month names and weekdays |

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

<!-- Theming and sizing -->
<mjo-calendar mode="single" color="secondary" size="large"></mjo-calendar>

<!-- Form integration -->
<mjo-form>
    <mjo-calendar name="eventDate" mode="single" required></mjo-calendar>
    <mjo-calendar name="vacationPeriod" mode="range" required></mjo-calendar>
</mjo-form>
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
            <mjo-calendar mode="single" .value=${this.selectedDate} @date-selected=${this.handleDateSelected} @change=${this.handleDateSelected}></mjo-calendar>
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
                @range-selected=${this.handleRangeSelected}
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
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-i18n")
export class ExampleCalendarI18n extends LitElement {
    @state() private locale: "en" | "es" | "fr" | "de" | "ja" | "zh" = "en";
    @state() private firstDayOfWeek: "monday" | "sunday" = "monday";

    private locales = [
        { code: "en", name: "English" },
        { code: "es", name: "Español" },
        { code: "fr", name: "Français" },
        { code: "de", name: "Deutsch" },
        { code: "ja", name: "日本語" },
        { code: "zh", name: "中文" },
    ];

    render() {
        return html`
            <h3>Internationalization</h3>
            <div style="margin-bottom: 16px;">
                <label>
                    Language:
                    <select @change=${(e: Event) => (this.locale = (e.target as HTMLSelectElement).value as any)}>
                        ${this.locales.map((loc) => html` <option value=${loc.code} ?selected=${this.locale === loc.code}>${loc.name}</option> `)}
                    </select>
                </label>
                <label style="margin-left: 16px;">
                    Week starts on:
                    <select @change=${(e: Event) => (this.firstDayOfWeek = (e.target as HTMLSelectElement).value as any)}>
                        <option value="monday" ?selected=${this.firstDayOfWeek === "monday"}>Monday</option>
                        <option value="sunday" ?selected=${this.firstDayOfWeek === "sunday"}>Sunday</option>
                    </select>
                </label>
            </div>
            <mjo-calendar mode="single" .locale=${this.locale} .firstDayOfWeek=${this.firstDayOfWeek}></mjo-calendar>
        `;
    }
}
```

### Date Constraints Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-constraints")
export class ExampleCalendarConstraints extends LitElement {
    @state() private minDate = "2025-01-01";
    @state() private maxDate = "2025-12-31";
    @state() private disabledDates = ["2025-02-14", "2025-07-04", "2025-12-25"];

    render() {
        return html`
            <h3>Date Constraints</h3>
            <div style="margin-bottom: 16px;">
                <label>Min Date: <input type="date" .value=${this.minDate} @input=${this.updateMinDate} /></label>
                <label style="margin-left: 16px;">Max Date: <input type="date" .value=${this.maxDate} @input=${this.updateMaxDate} /></label>
            </div>

            <mjo-calendar
                mode="single"
                .minDate=${this.minDate}
                .maxDate=${this.maxDate}
                .disabledDates=${this.disabledDates}
                @date-selected=${this.handleDateSelected}
            ></mjo-calendar>

            <p><strong>Disabled dates:</strong> ${this.disabledDates.join(", ")}</p>
        `;
    }

    private updateMinDate = (e: Event) => {
        this.minDate = (e.target as HTMLInputElement).value;
    };

    private updateMaxDate = (e: Event) => {
        this.maxDate = (e.target as HTMLInputElement).value;
    };

    private handleDateSelected = (e: CustomEvent) => {
        console.log("Selected date:", e.detail);
    };
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
        // event.detail will contain: { eventDate: "2025-01-15", vacationPeriod: "2025-07-01,2025-07-14" }
    };
}
```

## Theming and Customization Examples

### Basic Theme Customization

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-theming")
export class ExampleCalendarTheming extends LitElement {
    @state() private color: "primary" | "secondary" = "primary";
    @state() private size: "small" | "medium" | "large" = "medium";

    private customTheme = {
        selectedBackground: "#7C3AED", // Custom purple
        todayBackground: "#DDD6FE",
        todayColor: "#7C3AED",
        borderRadius: "12px",
        padding: "20px",
    };

    render() {
        return html`
            <h3>Theme Customization</h3>
            <div style="margin-bottom: 16px;">
                <label>
                    Color:
                    <select @change=${(e: Event) => (this.color = (e.target as HTMLSelectElement).value as any)}>
                        <option value="primary" ?selected=${this.color === "primary"}>Primary</option>
                        <option value="secondary" ?selected=${this.color === "secondary"}>Secondary</option>
                    </select>
                </label>
                <label style="margin-left: 16px;">
                    Size:
                    <select @change=${(e: Event) => (this.size = (e.target as HTMLSelectElement).value as any)}>
                        <option value="small" ?selected=${this.size === "small"}>Small</option>
                        <option value="medium" ?selected=${this.size === "medium"}>Medium</option>
                        <option value="large" ?selected=${this.size === "large"}>Large</option>
                    </select>
                </label>
            </div>

            <mjo-calendar mode="single" .color=${this.color} .size=${this.size} .theme=${this.customTheme}></mjo-calendar>
        `;
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

| Name              | Type                             | Default     | Reflects | Description                                         |
| ----------------- | -------------------------------- | ----------- | -------- | --------------------------------------------------- |
| `mode`            | `"single" \| "range"`            | `"single"`  | no       | Calendar selection mode                             |
| `name`            | `string \| undefined`            | `undefined` | no       | Form field name for integration with mjo-form       |
| `value`           | `string \| undefined`            | `undefined` | no       | Selected date in YYYY-MM-DD format (single mode)    |
| `startDate`       | `string \| undefined`            | `undefined` | no       | Start date for range selection in YYYY-MM-DD format |
| `endDate`         | `string \| undefined`            | `undefined` | no       | End date for range selection in YYYY-MM-DD format   |
| `locale`          | `SupportedLocale`                | `"en"`      | no       | Language locale for months/days translation         |
| `minDate`         | `string \| undefined`            | `undefined` | no       | Minimum selectable date in YYYY-MM-DD format        |
| `maxDate`         | `string \| undefined`            | `undefined` | no       | Maximum selectable date in YYYY-MM-DD format        |
| `disabled`        | `boolean`                        | `false`     | yes      | Disables calendar interaction                       |
| `size`            | `"small" \| "medium" \| "large"` | `"medium"`  | no       | Calendar size                                       |
| `color`           | `"primary" \| "secondary"`       | `"primary"` | no       | Color theme                                         |
| `disabledDates`   | `string[] \| undefined`          | `undefined` | no       | Array of disabled dates in YYYY-MM-DD format        |
| `showToday`       | `boolean`                        | `true`      | no       | Highlight today's date                              |
| `showWeekNumbers` | `boolean`                        | `false`     | no       | Show week numbers (not implemented yet)             |
| `firstDayOfWeek`  | `"sunday" \| "monday"`           | `"monday"`  | no       | First day of the week                               |
| `range-calendars` | `"1" \| "2" \| "auto"`           | `"auto"`    | no       | Range mode calendar layout strategy (see below)     |
| `theme`           | `Record<string, string>`         | `undefined` | no       | Theme object for ThemeMixin customization           |

### Supported Locales

The `locale` property supports the following languages with full month names, abbreviations, and weekday labels:

| Code | Language   | Code | Language  | Code | Language |
| ---- | ---------- | ---- | --------- | ---- | -------- |
| `en` | English    | `es` | Español   | `fr` | Français |
| `pt` | Português  | `it` | Italiano  | `de` | Deutsch  |
| `nl` | Nederlands | `bg` | Български | `sr` | Српски   |
| `ru` | Русский    | `zh` | 中文      | `ja` | 日本語   |
| `ko` | 한국어     | `tr` | Türkçe    | `pl` | Polski   |

### Range Calendar Layout (`range-calendars`)

Controls how many calendars are shown in **range** mode:

| Value  | Behavior                                                                                            |
| ------ | --------------------------------------------------------------------------------------------------- |
| `1`    | Always render a single calendar (still supports selecting start then end)                           |
| `2`    | Always render two adjacent months (left + right)                                                    |
| `auto` | (Default) Render two calendars when the host (or parent) width ≥ 720px; otherwise fall back to one. |

The auto mode uses a `ResizeObserver` for responsive adaptation.

### Size Variations

| Size     | Description             | Font Size | Day Cell Height |
| -------- | ----------------------- | --------- | --------------- |
| `small`  | Compact calendar        | ~10px     | 28px            |
| `medium` | Standard size (default) | ~14px     | 32px            |
| `large`  | Expanded calendar       | ~16px     | 40px            |

### Behavior Notes

-   **Single Mode**: Clicking a date selects it and fires `date-selected` + `change` events.
-   **Range Mode**: First valid click sets start date, second sets end date and fires `range-selected` + `change` events.
-   **Date Ordering**: If the second selected date is earlier than the first, dates are automatically swapped (start ≤ end guarantee).
-   **Navigation**: Month/year navigation ignores constraints; constraints only block selection.
-   **Constraints**: Selection is vetoed by `minDate`, `maxDate`, and `disabledDates`.
-   **Adjacent Months**: In range mode with two calendars, months are always adjacent (left is month N, right is N+1).
-   **Responsive**: `range-calendars="auto"` dynamically toggles dual layout depending on 720px width threshold.
-   **Form Integration**: Automatically integrates with `mjo-form` when `name` property is set.
-   **Today Highlighting**: Today's date is automatically highlighted unless `showToday` is false.

## Events

| Event            | Detail (shape)                                                                                                                                                    | Emitted When                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `date-selected`  | `{ date?: Date, value?: string }`                                                                                                                                 | Date is selected (single mode)        |
| `range-selected` | `{ startDate?: Date, endDate?: Date, startDateValue?: string, endDateValue?: string }`                                                                            | Date range fully selected (both ends) |
| `change`         | Mirrors `date-selected` (single) or `range-selected` (range) with identical detail fields (adds compatibility for generic form handlers & change event listeners) | Date selection changes                |

### Event Details

All events expose date(s) in two forms:

-   **Date objects** (`date`, `startDate`, `endDate`) – Native JavaScript Date objects for programmatic use.
-   **String values** (`value`, `startDateValue`, `endDateValue`) – ISO format `YYYY-MM-DD` strings for display, forms, and storage.

### Event Examples

```ts
// Single mode events
calendar.addEventListener("date-selected", (e) => {
    console.log("Date object:", e.detail.date); // Date object or undefined
    console.log("Date string:", e.detail.value); // "2025-01-15" or undefined
});

// Range mode events
calendar.addEventListener("range-selected", (e) => {
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

| Method                                          | Description                                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `getDisplayedMonths(): {month; year;}[]`        | Returns a shallow copy (length 1 or 2) of the months currently rendered.                               |
| `setDisplayedMonths(months, enforceAdj = true)` | Sets one or two months. If two and `enforceAdj` is true (default), second is coerced to be next month. |
| `setMonth(side, month)`                         | Sets the month (0–11) for `"single"`, `"left"`, or `"right"` side, preserving adjacency in range mode. |
| `setYear(side, year)`                           | Sets the year for the given side, re-normalizing adjacency.                                            |

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

| Variable                       | Fallback                 | Purpose                |
| ------------------------------ | ------------------------ | ---------------------- |
| `--mjo-calendar-font-family`   | `--mjo-font-family`      | Font family            |
| `--mjo-calendar-background`    | `--mjo-background-color` | Calendar background    |
| `--mjo-calendar-border`        | `--mjo-border-color`     | Calendar border        |
| `--mjo-calendar-border-radius` | `--mjo-radius`           | Calendar border radius |
| `--mjo-calendar-shadow`        | calculated               | Calendar shadow        |
| `--mjo-calendar-padding`       | `16px`                   | Calendar padding       |

### Week Headers

| Variable                              | Fallback                      | Purpose                     |
| ------------------------------------- | ----------------------------- | --------------------------- |
| `--mjo-calendar-week-day-color`       | `--mjo-foreground-color-xlow` | Week day labels color       |
| `--mjo-calendar-week-day-font-weight` | `600`                         | Week day labels font weight |

### Day Cells

| Variable                              | Fallback                      | Purpose                      |
| ------------------------------------- | ----------------------------- | ---------------------------- |
| `--mjo-calendar-day-border-radius`    | `4px`                         | Individual day border radius |
| `--mjo-calendar-day-hover-background` | `--mjo-background-color-high` | Day hover background         |

### Today Styling

| Variable                          | Fallback                     | Purpose          |
| --------------------------------- | ---------------------------- | ---------------- |
| `--mjo-calendar-today-background` | `--mjo-primary-color-alpha2` | Today background |
| `--mjo-calendar-today-color`      | `--mjo-primary-color`        | Today text color |

### Selection Styling

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

### Secondary Color Variations

When `color="secondary"`, these variables apply:

| Variable                                       | Fallback                       |
| ---------------------------------------------- | ------------------------------ |
| `--mjo-calendar-today-background-secondary`    | `--mjo-secondary-color-alpha2` |
| `--mjo-calendar-today-color-secondary`         | `--mjo-secondary-color`        |
| `--mjo-calendar-selected-background-secondary` | `--mjo-secondary-color`        |
| `--mjo-calendar-selected-color-secondary`      | `white`                        |
| `--mjo-calendar-range-background-secondary`    | `--mjo-secondary-color-alpha1` |
| `--mjo-calendar-range-color-secondary`         | `--mjo-secondary-color`        |

### Navigation Controls

| Variable                              | Fallback                     | Purpose                            |
| ------------------------------------- | ---------------------------- | ---------------------------------- |
| `--mjo-calendar-nav-background`       | `transparent`                | Navigation button background       |
| `--mjo-calendar-nav-border`           | `--mjo-border-color`         | Navigation button border           |
| `--mjo-calendar-nav-color`            | `--mjo-foreground-color`     | Navigation button text color       |
| `--mjo-calendar-nav-hover-background` | `--mjo-primary-color-alpha2` | Navigation button hover background |
| `--mjo-calendar-nav-radius`           | `--mjo-radius`               | Navigation button border radius    |

### Month/Year Pickers

| Variable                                           | Fallback                         | Purpose                           |
| -------------------------------------------------- | -------------------------------- | --------------------------------- |
| `--mjo-calendar-picker-background`                 | `--mjo-background-color`         | Picker overlay background         |
| `--mjo-calendar-picker-shadow`                     | `0 4px 12px rgba(0, 0, 0, 0.15)` | Picker shadow                     |
| `--mjo-calendar-picker-button-background`          | `transparent`                    | Picker button background          |
| `--mjo-calendar-picker-button-hover-background`    | `--mjo-primary-color-alpha2`     | Picker button hover background    |
| `--mjo-calendar-picker-button-selected-background` | `--mjo-primary-color`            | Picker button selected background |

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

The component supports `ThemeMixin` for component-specific theming:

### Theme Object Properties

The `theme` property accepts an object with the following keys (automatically prefixed with `--mjo-calendar-`):

| Theme Key            | CSS Variable                         | Purpose                      |
| -------------------- | ------------------------------------ | ---------------------------- |
| `background`         | `--mjo-calendar-background`          | Calendar background          |
| `selectedBackground` | `--mjo-calendar-selected-background` | Selected date background     |
| `todayBackground`    | `--mjo-calendar-today-background`    | Today's date background      |
| `todayColor`         | `--mjo-calendar-today-color`         | Today's date text color      |
| `borderRadius`       | `--mjo-calendar-border-radius`       | Calendar border radius       |
| `dayBorderRadius`    | `--mjo-calendar-day-border-radius`   | Individual day border radius |
| `padding`            | `--mjo-calendar-padding`             | Calendar padding             |
| `shadow`             | `--mjo-calendar-shadow`              | Calendar shadow              |

### ThemeMixin Usage Example

```ts
@customElement("themed-calendar-example")
export class ThemedCalendarExample extends LitElement {
    private calendarTheme = {
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

**Form integration not working**

-   Add `name` attribute for form integration
-   Ensure the calendar is inside a `mjo-form` element
-   Check that FormMixin is properly initialized

### Debug Mode

For development and debugging, you can listen to all events:

```ts
const calendar = document.querySelector("mjo-calendar");

// Debug all calendar events
calendar.addEventListener("date-selected", (e) => console.log("Date selected:", e.detail));
calendar.addEventListener("range-selected", (e) => console.log("Range selected:", e.detail));
calendar.addEventListener("change", (e) => console.log("Calendar changed:", e.detail));

// Monitor displayed months
const observer = new MutationObserver(() => {
    console.log("Current months:", calendar.getDisplayedMonths());
});
```

## CSS Parts

| Part            | Description                             |
| --------------- | --------------------------------------- |
| `calendar`      | Main calendar container                 |
| `header`        | Calendar header with navigation         |
| `navigation`    | Navigation buttons container            |
| `month-year`    | Month and year selector buttons         |
| `calendar-grid` | The calendar grid container             |
| `day`           | Individual day cell                     |
| `selected`      | Selected day(s) - automatically applied |
| `today`         | Today's date - automatically applied    |

## Form Integration

When used with `name` attribute, the calendar integrates with `mjo-form`:

-   **Single mode**: Emits the selected date as `value`.
-   **Range mode**: Emits a JSON string `{ "start": "YYYY-MM-DD", "end": "YYYY-MM-DD" }` once both dates are chosen.

```html
<mjo-form>
    <!-- Single date -->
    <mjo-calendar name="event-date" mode="single"></mjo-calendar>

    <!-- Range dates -->
    <mjo-calendar name="vacation-dates" mode="range"></mjo-calendar>
</mjo-form>
```

## Accessibility Notes

-   Keyboard navigation: planned (not yet implemented).
-   Interactive elements expose semantic roles and ARIA labels where relevant.
-   Locale-driven labeling (month / weekday names) aids screen reader context.
-   String date formats are stable for assistive tech.

## Performance Considerations

-   Calendar renders efficiently using Lit's reactive updates
-   Range hover effects are optimized to minimize redraws
-   Large date ranges are handled smoothly

## Browser Support

-   Modern evergreen browsers (Chromium, Firefox, WebKit).
-   Relies on Intl for localized month/weekday names (widely supported in modern engines).
-   Uses CSS Grid & shadow DOM.

## Contributing

This component is part of the mjo-litui design system. For bug reports, feature requests, or contributions:

1. Check existing issues in the repository
2. Follow the component development guidelines
3. Include test cases for new features
4. Update documentation for API changes

## License

This component is part of the mjo-litui library and follows the same license terms as the main project.
