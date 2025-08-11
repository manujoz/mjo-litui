# mjo-calendar

Configurable calendar component for date selection, supporting both single date and date range selection with intuitive navigation controls. The component includes internationalization support for 15 languages.

## HTML Usage

```html
<!-- Single date selection -->
<mjo-calendar mode="single" value="2025-01-15"></mjo-calendar>

<!-- Date range selection -->
<mjo-calendar mode="range" start-date="2025-01-10" end-date="2025-01-20"></mjo-calendar>

<!-- With different locale -->
<mjo-calendar mode="single" locale="es"></mjo-calendar>

<!-- With constraints -->
<mjo-calendar mode="single" min-date="2025-01-01" max-date="2025-12-31" color="secondary" size="large"></mjo-calendar>
```

## Basic Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-basic")
export class ExampleCalendarBasic extends LitElement {
    render() {
        return html` <mjo-calendar mode="single" @date-selected=${this.handleDateSelected}></mjo-calendar> `;
    }

    private handleDateSelected(event: CustomEvent) {
        console.log("Selected date:", event.detail.date);
    }
}
```

## Date Range Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";

@customElement("example-calendar-range")
export class ExampleCalendarRange extends LitElement {
    @state() private selectedRange = { start: "", end: "" };

    render() {
        return html`
            <div>
                <h3>Select Date Range</h3>
                <mjo-calendar mode="range" @range-selected=${this.handleRangeSelected}></mjo-calendar>

                ${this.selectedRange.start ? html` <p>Selected: ${this.selectedRange.start} to ${this.selectedRange.end}</p> ` : html`<p>No range selected</p>`}
            </div>
        `;
    }

    private handleRangeSelected(event: CustomEvent) {
        this.selectedRange = {
            start: event.detail.startDate,
            end: event.detail.endDate,
        };
    }
}
```

## Form Integration Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-calendar";
import "mjo-litui/mjo-form";

@customElement("example-calendar-form")
export class ExampleCalendarForm extends LitElement {
    render() {
        return html`
            <mjo-form @submit=${this.handleSubmit}>
                <mjo-calendar name="appointment-date" mode="single" min-date="2025-01-01" required></mjo-calendar>

                <mjo-button type="submit">Schedule Appointment</mjo-button>
            </mjo-form>
        `;
    }

    private handleSubmit(event: CustomEvent) {
        console.log("Form data:", event.detail);
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

### Behavior Notes

-   In `single` mode, clicking a date selects it and fires `date-selected` and `change` events
-   In `range` mode, first click sets start date, second click sets end date and fires `range-selected` and `change` events
-   Range selection automatically swaps dates if end date is before start date
-   Navigation (month/year changes) is always allowed regardless of `minDate`/`maxDate` constraints
-   Date selection is restricted by `minDate`/`maxDate` and `disabledDates` constraints
-   Form integration works through FormMixin when `name` attribute is provided

## Events

| Event            | Detail                                                                                       | Emitted When                                    |
| ---------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `date-selected`  | `{date: string, formattedDate: string}`                                                      | Date is selected (single mode)                  |
| `range-selected` | `{startDate: string, endDate: string, formattedStartDate: string, formattedEndDate: string}` | Date range is selected                          |
| `change`         | `{value: string}` (single) or `{startDate: string, endDate: string}` (range)                 | Date selection changes (for form compatibility) |

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

| Variable                              | Fallback                     | Purpose                     |
| ------------------------------------- | ---------------------------- | --------------------------- |
| `--mjo-calendar-week-day-color`       | `--mjo-text-color-secondary` | Week day labels color       |
| `--mjo-calendar-week-day-font-weight` | `600`                        | Week day labels font weight |

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

## ThemeMixin Customization

This component includes `ThemeMixin`, allowing per-instance customization:

```ts
interface MjoCalendarTheme {
    fontFamily?: string;
    background?: string;
    border?: string;
    borderRadius?: string;
    shadow?: string;
    padding?: string;
    weekDayColor?: string;
    weekDayFontWeight?: string;
    dayBorderRadius?: string;
    dayHoverBackground?: string;
    todayBackground?: string;
    todayColor?: string;
    selectedBackground?: string;
    selectedColor?: string;
    rangeEndpointBackground?: string;
    rangeEndpointColor?: string;
    rangeBackground?: string;
    rangeColor?: string;
    disabledColor?: string;
    disabledBackground?: string;
}
```

### ThemeMixin Example

```ts
const customTheme = {
    selectedBackground: "#10B981",
    selectedColor: "#ffffff",
    todayBackground: "#D1FAE5",
    todayColor: "#10B981",
    borderRadius: "16px",
};

// Apply to calendar
html`<mjo-calendar .theme=${customTheme}></mjo-calendar>`;
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

-   **Single mode**: Sends selected date as string value
-   **Range mode**: Sends JSON string with `{start: "YYYY-MM-DD", end: "YYYY-MM-DD"}`

```html
<mjo-form>
    <!-- Single date -->
    <mjo-calendar name="event-date" mode="single"></mjo-calendar>

    <!-- Range dates -->
    <mjo-calendar name="vacation-dates" mode="range"></mjo-calendar>
</mjo-form>
```

## Internationalization

The calendar component supports 15 languages with automatic translation of month names and weekday labels:

### Supported Locales

| Locale | Language   | Code |
| ------ | ---------- | ---- |
| `en`   | English    | en   |
| `es`   | Spanish    | es   |
| `fr`   | French     | fr   |
| `pt`   | Portuguese | pt   |
| `it`   | Italian    | it   |
| `de`   | German     | de   |
| `nl`   | Dutch      | nl   |
| `bg`   | Bulgarian  | bg   |
| `sr`   | Serbian    | sr   |
| `ru`   | Russian    | ru   |
| `zh`   | Chinese    | zh   |
| `ja`   | Japanese   | ja   |
| `ko`   | Korean     | ko   |
| `tr`   | Turkish    | tr   |
| `pl`   | Polish     | pl   |

### Usage Examples

```html
<!-- Spanish calendar -->
<mjo-calendar locale="es" mode="single"></mjo-calendar>

<!-- French calendar with range -->
<mjo-calendar locale="fr" mode="range"></mjo-calendar>

<!-- German calendar -->
<mjo-calendar locale="de" mode="single"></mjo-calendar>
```

The locale property affects:

-   Month names in the header
-   Weekday abbreviations
-   Date formatting in events
-   Starting day of the week (can be overridden with `firstDayOfWeek`)

## Accessibility Notes

-   Calendar provides keyboard navigation (planned feature)
-   All interactive elements have proper ARIA labels
-   Date formatting respects locale settings
-   Screen reader friendly date announcements

## Performance Considerations

-   Calendar renders efficiently using Lit's reactive updates
-   Range hover effects are optimized to minimize redraws
-   Large date ranges are handled smoothly

## Browser Support

-   Modern browsers with native Date API support
-   Internationalization API for locale formatting
-   CSS Grid for layout (IE11+ with polyfills)

## Summary

`<mjo-calendar>` provides a complete date selection solution with both single and range modes. It integrates seamlessly with forms, supports extensive theming, and follows your library's design patterns. Use global themes for consistency and ThemeMixin for specific customizations.
