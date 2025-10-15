# mjo-calendar

A configurable calendar component for date selection with support for single date and date range selection modes. Features navigation controls, internationalization for 15 languages, accessibility with keyboard navigation and screen reader support, form integration, extensive theming capabilities, and a powerful programmatic API.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Variables](#css-variables)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Date selection in forms and applications
- Date range selection for booking systems, reports, or filters
- Event calendars with visual markers
- Multi-language applications requiring localized date displays
- Responsive layouts requiring adaptive calendar sizing
- Applications requiring programmatic date navigation
- Accessible date selection interfaces for screen reader users

## Import

```typescript
import "mjo-litui/mjo-calendar";
```

## Properties

| Property                    | Type                               | Default     | Required | Description                                                                                                                                                                    |
| --------------------------- | ---------------------------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`                      | `"single" \| "range"`              | `"single"`  | No       | Calendar selection mode                                                                                                                                                        |
| `name`                      | `string \| undefined`              | `undefined` | No       | Form field name for integration with mjo-form                                                                                                                                  |
| `value`                     | `string \| undefined`              | `undefined` | No       | Selected date in YYYY-MM-DD format (single mode)                                                                                                                               |
| `startDate`                 | `string \| undefined`              | `undefined` | No       | Start date for range selection in YYYY-MM-DD format                                                                                                                            |
| `endDate`                   | `string \| undefined`              | `undefined` | No       | End date for range selection in YYYY-MM-DD format                                                                                                                              |
| `locale`                    | `SupportedLocale \| "auto"`        | `"auto"`    | No       | Language locale for months/days translation. Supported: `"en"`, `"es"`, `"fr"`, `"pt"`, `"it"`, `"de"`, `"nl"`, `"bg"`, `"sr"`, `"ru"`, `"zh"`, `"ja"`, `"ko"`, `"tr"`, `"pl"` |
| `minDate`                   | `string \| undefined`              | `undefined` | No       | Minimum selectable date in YYYY-MM-DD format                                                                                                                                   |
| `maxDate`                   | `string \| undefined`              | `undefined` | No       | Maximum selectable date in YYYY-MM-DD format                                                                                                                                   |
| `disabled`                  | `boolean`                          | `false`     | No       | Disables calendar interaction                                                                                                                                                  |
| `size`                      | `"small" \| "medium" \| "large"`   | `"medium"`  | No       | Calendar size                                                                                                                                                                  |
| `color`                     | `"primary" \| "secondary"`         | `"primary"` | No       | Color theme                                                                                                                                                                    |
| `disabledDates`             | `string[] \| undefined`            | `undefined` | No       | Array of disabled dates in YYYY-MM-DD format                                                                                                                                   |
| `hideToday`                 | `boolean`                          | `false`     | No       | Hide today's date highlighting                                                                                                                                                 |
| `firstDayOfWeek`            | `"sunday" \| "monday"`             | `"monday"`  | No       | First day of the week                                                                                                                                                          |
| `rangeCalendars`            | `"1" \| "2" \| "auto"`             | `"auto"`    | No       | Range mode calendar layout: `"1"` single calendar, `"2"` dual calendars, `"auto"` adaptive (uses ResizeObserver)                                                               |
| `eventMarkers`              | `MjoCalendarMarker[] \| undefined` | `undefined` | No       | Event markers for specific dates                                                                                                                                               |
| `disableKeyboardNavigation` | `boolean`                          | `false`     | No       | Disable keyboard navigation                                                                                                                                                    |
| `disableAnnounceSelections` | `boolean`                          | `false`     | No       | Disable screen reader announcements for selections                                                                                                                             |
| `allowCompact`              | `boolean`                          | `false`     | No       | Enable compact mode when parent container is narrow                                                                                                                            |
| `ariaLabelledby`            | `string \| null`                   | `null`      | No       | ID of element that labels the calendar                                                                                                                                         |
| `ariaDescribedby`           | `string \| null`                   | `null`      | No       | ID of element that describes the calendar                                                                                                                                      |
| `ariaLive`                  | `"polite" \| "assertive" \| "off"` | `"polite"`  | No       | Live region politeness for announcements                                                                                                                                       |

### MjoCalendarMarker Interface

```typescript
interface MjoCalendarMarker<T = unknown> {
    date: string; // YYYY-MM-DD format
    time?: string; // Optional time
    backgroundColor?: string;
    foregroundColor?: string;
    tooltip?: string;
    data?: T; // Custom data
}
```

## Public Methods

| Method                                          | Parameters                                                                    | Description                                                                                               | Return Value                      |
| ----------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `getDisplayedMonths()`                          | None                                                                          | Returns a shallow copy of the currently displayed months (length 1 or 2)                                  | `{month: number; year: number}[]` |
| `setDisplayedMonths(months, enforceAdjacency?)` | `months: {month: number; year: number}[]`, `enforceAdjacency: boolean = true` | Sets one or two months. If two and enforceAdjacency is true (default), second is coerced to be next month | `void`                            |
| `goToMonth(options)`                            | `options: GoToMonthOptions`                                                   | Navigate to a specific month with automatic side detection                                                | `void`                            |
| `goToYear(options)`                             | `options: GoToYearOptions`                                                    | Navigate to a specific year with automatic side detection                                                 | `void`                            |
| `goToDate(options)`                             | `options: GoToDateOptions`                                                    | Navigate to a specific date (month and year simultaneously)                                               | `void`                            |
| `resetSelection()`                              | None                                                                          | Reset any current selection (single or range) and displayed months to initial state                       | `void`                            |
| `reset()`                                       | None                                                                          | Full controlled reset: clears selection, months, pickers and forces fresh today-based view                | `void`                            |
| `selectDate(date)`                              | `date: Date`                                                                  | Programmatically select a date (mirrors user click behavior with validation)                              | `void`                            |

### Method Options Interfaces

```typescript
interface GoToMonthOptions {
    month: number; // 1-12 (1 = January, 12 = December)
    year?: number;
    side?: "single" | "left" | "right";
}

interface GoToYearOptions {
    year: number;
    side?: "single" | "left" | "right";
}

interface GoToDateOptions {
    date: Date | string; // Date object or "YYYY-MM-DD" string
    side?: "single" | "left" | "right";
}
```

## Events

| Event                         | Type                            | Description                                                                           | Detail Properties                                                                        |
| ----------------------------- | ------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `mjo-calendar:date-selected`  | `MjoCalendarDateSelectedEvent`  | Fired when a date is selected in single mode                                          | `date?: Date`, `value?: string`                                                          |
| `mjo-calendar:range-selected` | `MjoCalendarRangeSelectedEvent` | Fired when a date range is selected in range mode                                     | `startDate?: Date`, `endDate?: Date`, `startDateValue?: string`, `endDateValue?: string` |
| `mjo-calendar:day-click`      | `MjoCalendarDayClickEvent`      | Fired when a day is clicked                                                           | `day: number`, `date: Date`, `events: MjoCalendarMarker[]`                               |
| `mjo-calendar:day-hover`      | `MjoCalendarDayHoverEvent`      | Fired when a day is hovered                                                           | `day: number`, `date: Date`, `events: MjoCalendarMarker[]`                               |
| `mjo-calendar:day-leave`      | `MjoCalendarDayLeaveEvent`      | Fired when mouse leaves a day                                                         | `day: number`, `date: Date`, `events: MjoCalendarMarker[]`                               |
| `mjo-calendar:month-selected` | `MjoCalendarMonthSelectedEvent` | Fired when a month is selected in month picker                                        | `month: number`                                                                          |
| `mjo-calendar:year-selected`  | `MjoCalendarYearSelectedEvent`  | Fired when a year is selected in year picker                                          | `year: number`                                                                           |
| `change`                      | `CustomEvent`                   | Standard change event for form compatibility, mirrors date-selected or range-selected | Same as date-selected or range-selected depending on mode                                |

## CSS Variables

| Variable                                           | Default                                      | Description                                     |
| -------------------------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| `--mjo-calendar-font-family`                       | `var(--mjo-font-family, inherit)`            | Calendar font family                            |
| `--mjo-calendar-background`                        | `var(--mjo-background-color, white)`         | Calendar background color                       |
| `--mjo-calendar-foreground-color`                  | `var(--mjo-foreground-color, white)`         | Calendar foreground color                       |
| `--mjo-calendar-foreground-color-low`              | `var(--mjo-foreground-color-low, #666)`      | Calendar foreground color for low emphasis      |
| `--mjo-calendar-border`                            | `1px solid var(--mjo-border-color, #e0e0e0)` | Calendar border style                           |
| `--mjo-calendar-border-radius`                     | `var(--mjo-radius-medium, 8px)`              | Calendar border radius                          |
| `--mjo-calendar-shadow`                            | `0 2px 8px rgba(0, 0, 0, 0.1)`               | Calendar box shadow                             |
| `--mjo-calendar-padding`                           | `14px`                                       | Calendar internal padding                       |
| `--mjo-calendar-padding-compact`                   | `6px`                                        | Calendar internal padding when compact          |
| `--mjo-calendar-week-day-color`                    | -                                            | Week day headers text color                     |
| `--mjo-calendar-week-day-font-weight`              | -                                            | Week day headers font weight                    |
| `--mjo-calendar-day-border-radius`                 | `4px`                                        | Individual day cell border radius               |
| `--mjo-calendar-day-hover-background`              | -                                            | Day cell hover background                       |
| `--mjo-calendar-focus-outline`                     | -                                            | Focused element outline color                   |
| `--mjo-calendar-today-background`                  | -                                            | Today's date background                         |
| `--mjo-calendar-today-color`                       | -                                            | Today's date text color                         |
| `--mjo-calendar-event-offset`                      | `2px`                                        | Event indicator offset from bottom-right corner |
| `--mjo-calendar-event-font-size`                   | `8px`                                        | Event indicator font size                       |
| `--mjo-calendar-event-font-weight`                 | `bold`                                       | Event indicator font weight                     |
| `--mjo-calendar-event-background-color`            | `#ff6b6b`                                    | Event indicator background color                |
| `--mjo-calendar-event-foreground-color`            | `white`                                      | Event indicator foreground color                |
| `--mjo-calendar-event-single-size`                 | `6px`                                        | Single event indicator size                     |
| `--mjo-calendar-event-multiple-size`               | `12px`                                       | Multiple events indicator size                  |
| `--mjo-calendar-selected-background`               | -                                            | Selected date background                        |
| `--mjo-calendar-selected-color`                    | -                                            | Selected date text color                        |
| `--mjo-calendar-range-endpoint-background`         | -                                            | Range start/end background                      |
| `--mjo-calendar-range-endpoint-color`              | -                                            | Range start/end text color                      |
| `--mjo-calendar-range-background`                  | -                                            | Range middle dates background                   |
| `--mjo-calendar-range-color`                       | -                                            | Range middle dates text color                   |
| `--mjo-calendar-disabled-color`                    | -                                            | Disabled dates text color                       |
| `--mjo-calendar-disabled-background`               | `transparent`                                | Disabled dates background                       |
| `--mjo-calendar-picker-background`                 | -                                            | Month/year picker background                    |
| `--mjo-calendar-picker-radius`                     | -                                            | Month/year picker border radius                 |
| `--mjo-calendar-picker-button-background`          | `transparent`                                | Picker button background                        |
| `--mjo-calendar-picker-button-hover-background`    | -                                            | Picker button hover background                  |
| `--mjo-calendar-picker-button-selected-background` | -                                            | Picker button selected background               |
| `--mjo-calendar-picker-button-border`              | -                                            | Picker button border                            |
| `--mjo-calendar-picker-button-radius`              | -                                            | Picker button border radius                     |
| `--mjo-calendar-picker-button-color`               | -                                            | Picker button text color                        |
| `--mjo-calendar-picker-button-hover-border`        | -                                            | Picker button hover border                      |
| `--mjo-calendar-picker-button-focus-outline`       | -                                            | Picker button focus outline                     |
| `--mjo-calendar-picker-button-selected-border`     | -                                            | Picker button selected border                   |
| `--mjo-calendar-picker-button-selected-color`      | -                                            | Picker button selected text color               |
| `--mjo-calendar-nav-background`                    | `transparent`                                | Year picker navigation button background        |
| `--mjo-calendar-nav-border`                        | -                                            | Year picker navigation button border            |
| `--mjo-calendar-nav-radius`                        | -                                            | Year picker navigation button border radius     |
| `--mjo-calendar-nav-color`                         | -                                            | Year picker navigation button text color        |
| `--mjo-calendar-nav-hover-background`              | -                                            | Year picker navigation button hover background  |
| `--mjo-calendar-nav-hover-border`                  | -                                            | Year picker navigation button hover border      |
| `--mjo-calendar-nav-focus-outline`                 | -                                            | Year picker navigation button focus outline     |
| `--mjo-calendar-nav-button-border`                 | -                                            | Navigation button border                        |
| `--mjo-calendar-nav-button-color`                  | -                                            | Navigation button text color                    |
| `--mjo-calendar-selector-button-color`             | -                                            | Month/year selector text color                  |
| `--mjo-calendar-selector-button-highlight-color`   | -                                            | Selector button hover background color          |
| `--mjo-calendar-decade-label-color`                | -                                            | Year picker decade label text color             |

## CSS Parts

| Part                           | Description                                                   | Element    |
| ------------------------------ | ------------------------------------------------------------- | ---------- |
| `calendar`                     | The main calendar container                                   | `<div>`    |
| `header`                       | The calendar header container                                 | `<div>`    |
| `navigation`                   | Navigation buttons and selectors toolbar                      | `<div>`    |
| `nav-button`                   | Navigation buttons (previous/next month)                      | `<button>` |
| `selectors-container`          | Container for month and year selectors                        | `<div>`    |
| `selector-button`              | Month and year selector buttons                               | `<button>` |
| `calendar-grid`                | The main calendar grid container                              | `<div>`    |
| `week-days-container`          | Container for weekday headers                                 | `<div>`    |
| `week-day`                     | Individual weekday header cell                                | `<div>`    |
| `days-container`               | Container for calendar days                                   | `<div>`    |
| `day`                          | Individual day cell                                           | `<div>`    |
| `day-selected`                 | Selected day cell (applied with day part)                     | `<div>`    |
| `day-today`                    | Today's date cell (applied with day part)                     | `<div>`    |
| `event-indicator`              | Event indicator container                                     | `<span>`   |
| `event-indicator-single`       | Single event indicator (applied with event-indicator part)    | `<span>`   |
| `event-indicator-multiple`     | Multiple events indicator (applied with event-indicator part) | `<span>`   |
| `month-picker-container`       | Month picker overlay container                                | `<div>`    |
| `month-picker-grid`            | Month picker grid layout                                      | `<div>`    |
| `month-picker-button`          | Individual month selection button                             | `<button>` |
| `month-picker-button-selected` | Individual month selection button (selected state)            | `<button>` |
| `year-picker-container`        | Year picker overlay container                                 | `<div>`    |
| `year-picker-navigation`       | Year picker navigation controls                               | `<div>`    |
| `year-picker-nav-button`       | Year picker navigation buttons                                | `<button>` |
| `year-picker-decade-label`     | Decade range label in year picker                             | `<span>`   |
| `year-picker-grid`             | Year picker grid layout                                       | `<div>`    |
| `year-picker-button`           | Individual year selection button                              | `<button>` |
| `year-picker-button-selected`  | Individual year selection button (selected state)             | `<button>` |

## Accessibility

The `mjo-calendar` component provides comprehensive accessibility features:

### Best Practices

- Use `aria-labelledby` or `aria-label` to provide clear calendar purpose description
- Use `aria-describedby` to link help text or constraint descriptions
- Keep `disableKeyboardNavigation` and `disableAnnounceSelections` disabled (false) for full accessibility
- Use appropriate `size` for touch interfaces (consider "large" for mobile devices)
- Provide clear labels when integrated with forms

### ARIA Roles and Attributes

- Main calendar uses `role="application"` for custom keyboard navigation
- Calendar grid uses `role="grid"` with proper `role="gridcell"` for days
- Date cells include `aria-selected`, `aria-current="date"` for today, and `aria-disabled` states
- Month and year pickers use `role="dialog"` with proper `role="grid"` structure
- Navigation controls use `role="toolbar"` with descriptive labels
- Live region with configurable `aria-live` for selection announcements

### Keyboard Interactions

| Key                 | Action                                                          |
| ------------------- | --------------------------------------------------------------- |
| Arrow Keys          | Navigate between dates (Left/Right for days, Up/Down for weeks) |
| Page Up/Down        | Navigate by month                                               |
| Ctrl + Page Up/Down | Navigate by year                                                |
| Home                | Move to start of current week                                   |
| End                 | Move to end of current week                                     |
| T                   | Jump to today's date                                            |
| Enter/Space         | Select focused date or confirm picker selection                 |
| Escape              | Close month/year picker or clear focus                          |
| Tab/Shift+Tab       | Navigate between interactive elements                           |

## Usage Examples

### Basic Single Date Selection

```html
<mjo-calendar mode="single" value="2025-01-15"></mjo-calendar>
```

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";
import type { MjoCalendarDateSelectedEvent } from "mjo-litui/types/mjo-calendar";

@customElement("calendar-single-example")
export class CalendarSingleExample extends LitElement {
    @state() private selectedDate = "";

    private handleDateSelected = (e: MjoCalendarDateSelectedEvent) => {
        this.selectedDate = e.detail.value || "";
        console.log("Selected date:", e.detail.date);
    };

    render() {
        return html`
            <mjo-calendar mode="single" .value=${this.selectedDate} @mjo-calendar:date-selected=${this.handleDateSelected}></mjo-calendar>
            <p>Selected: ${this.selectedDate || "None"}</p>
        `;
    }
}
```

### Date Range Selection

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";
import type { MjoCalendarRangeSelectedEvent } from "mjo-litui/types/mjo-calendar";

@customElement("calendar-range-example")
export class CalendarRangeExample extends LitElement {
    @state() private startDate = "";
    @state() private endDate = "";

    private handleRangeSelected = (e: MjoCalendarRangeSelectedEvent) => {
        this.startDate = e.detail.startDateValue || "";
        this.endDate = e.detail.endDateValue || "";
    };

    render() {
        return html`
            <mjo-calendar
                mode="range"
                .startDate=${this.startDate}
                .endDate=${this.endDate}
                @mjo-calendar:range-selected=${this.handleRangeSelected}
            ></mjo-calendar>
            <p>Range: ${this.startDate || "None"} - ${this.endDate || "None"}</p>
        `;
    }
}
```

### Programmatic Navigation

```typescript
const calendar = document.querySelector("mjo-calendar");

// Navigate to specific month
calendar.goToMonth({ month: 12, year: 2025 });

// Navigate to today
calendar.goToDate({ date: new Date() });

// Programmatic selection
calendar.selectDate(new Date("2025-12-25"));

// Get current displayed months
const months = calendar.getDisplayedMonths();
console.log("Current months:", months);

// Reset calendar
calendar.reset();
```

### Form Integration

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";
import "mjo-litui/mjo-form";
import "mjo-litui/mjo-button";

@customElement("calendar-form-example")
export class CalendarFormExample extends LitElement {
    private handleSubmit = (e: CustomEvent) => {
        const formData = e.detail;
        console.log("Event date:", formData.eventDate);
        console.log("Vacation range:", JSON.parse(formData.vacationPeriod));
    };

    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <mjo-calendar name="eventDate" mode="single" required min-date="2025-01-01"></mjo-calendar>

                <mjo-calendar name="vacationPeriod" mode="range"></mjo-calendar>

                <mjo-button type="submit">Submit</mjo-button>
            </mjo-form>
        `;
    }
}
```

### Event Markers

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";
import type { MjoCalendarMarker, MjoCalendarDayClickEvent } from "mjo-litui/types/mjo-calendar";

@customElement("calendar-events-example")
export class CalendarEventsExample extends LitElement {
    private events: MjoCalendarMarker[] = [
        {
            date: "2025-01-15",
            backgroundColor: "#ff6b6b",
            foregroundColor: "#fff",
            tooltip: "Important meeting",
            data: { type: "meeting", id: 1 },
        },
        {
            date: "2025-01-20",
            backgroundColor: "#4ecdc4",
            foregroundColor: "#fff",
            tooltip: "Vacation starts",
            data: { type: "vacation", id: 2 },
        },
    ];

    private handleDayClick = (e: MjoCalendarDayClickEvent) => {
        if (e.detail.events.length > 0) {
            console.log("Events on this day:", e.detail.events);
        }
    };

    render() {
        return html` <mjo-calendar mode="single" .eventMarkers=${this.events} @mjo-calendar:day-click=${this.handleDayClick}></mjo-calendar> `;
    }
}
```

### Date Constraints

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("calendar-constraints-example")
export class CalendarConstraintsExample extends LitElement {
    private disabledDates = ["2025-02-14", "2025-07-04", "2025-12-25"];

    render() {
        return html` <mjo-calendar mode="single" min-date="2025-01-01" max-date="2025-12-31" .disabledDates=${this.disabledDates}></mjo-calendar> `;
    }
}
```

### Internationalization

```html
<!-- Spanish calendar starting on Monday -->
<mjo-calendar locale="es" first-day-of-week="monday"></mjo-calendar>

<!-- Japanese calendar starting on Sunday -->
<mjo-calendar locale="ja" first-day-of-week="sunday"></mjo-calendar>
```

### CSS Variables and Parts Customization

```css
/* Custom purple theme */
mjo-calendar {
    --mjo-calendar-selected-background: #7c3aed;
    --mjo-calendar-today-background: #ddd6fe;
    --mjo-calendar-today-color: #7c3aed;
    --mjo-calendar-range-background: rgba(124, 58, 237, 0.2);
    --mjo-calendar-border-radius: 12px;
}

/* Style specific parts */
mjo-calendar::part(day-selected) {
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
}

mjo-calendar::part(nav-button) {
    border: 2px solid #7c3aed;
}
```

## Additional Notes

### Range Calendar Layout

The `rangeCalendars` property controls calendar layout in range mode:

- `"1"`: Single calendar (user selects start then end)
- `"2"`: Dual calendars always (left and right adjacent months)
- `"auto"`: Adaptive layout using ResizeObserver (switches at 720px width)

### Date Format

All date strings use ISO format `YYYY-MM-DD`. The component automatically handles:

- Date validation
- Range ordering (start <= end)
- Timezone considerations for date calculations

### Compact Mode

When `allowCompact` is enabled, the calendar automatically:

- Reduces padding and spacing
- Adjusts font sizes
- Optimizes for narrow containers
- Uses ResizeObserver for responsive behavior

### Performance

The component is optimized for performance:

- Efficient date calculations
- Minimal re-renders with Lit's reactive system
- Automatic cleanup of observers and event listeners
- On-demand picker rendering

### Browser Support

Requires modern browsers with support for:

- Web Components (Custom Elements v1)
- Shadow DOM
- ResizeObserver (for responsive features)
- Intl.DateTimeFormat (for internationalization)
