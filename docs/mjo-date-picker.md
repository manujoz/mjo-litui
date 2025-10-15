# mjo-date-picker

Interactive date picker component that combines a text field with a calendar dropdown for single date and date range selection.

## Index

- [Use Cases](#use-cases)
- [Import](#import)
- [Properties](#properties)
- [States](#states)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Parts](#css-parts)
- [Accessibility](#accessibility)
- [Usage Examples](#usage-examples)
- [Additional Notes](#additional-notes)

## Use Cases

- Single date selection with formatted display
- Date range selection for booking systems or reporting
- Localized date inputs with multiple display formats
- Form integration with validation support
- Accessible date input with keyboard navigation
- Programmatic date selection and manipulation

## Import

```typescript
import "mjo-litui/mjo-date-picker";
```

## Properties

| Property                     | Type                        | Default     | Description                                                                                   | Required |
| ---------------------------- | --------------------------- | ----------- | --------------------------------------------------------------------------------------------- | -------- |
| `name`                       | `string`                    | `undefined` | Form field name for form submissions                                                          | No       |
| `value`                      | `string`                    | `""`        | Current date value. Format: `YYYY-MM-DD` for single dates, `YYYY-MM-DD/YYYY-MM-DD` for ranges | No       |
| `isRange`                    | `boolean`                   | `false`     | Enable date range selection mode                                                              | No       |
| `fullwidth`                  | `boolean`                   | `false`     | Make the textfield take full width of its container                                           | No       |
| `locale`                     | `SupportedLocale \| "auto"` | `"auto"`    | Locale for date formatting and calendar localization                                          | No       |
| `minDate`                    | `string`                    | `undefined` | Minimum selectable date in `YYYY-MM-DD` format                                                | No       |
| `maxDate`                    | `string`                    | `undefined` | Maximum selectable date in `YYYY-MM-DD` format                                                | No       |
| `disabledDates`              | `string[]`                  | `undefined` | Array of dates to disable in `YYYY-MM-DD` format                                              | No       |
| `label`                      | `string`                    | `undefined` | Label text for the textfield                                                                  | No       |
| `placeholder`                | `string`                    | `undefined` | Placeholder text for the textfield                                                            | No       |
| `disabled`                   | `boolean`                   | `false`     | Disable the date picker                                                                       | No       |
| `size`                       | `MjoTextfieldSize`          | `"medium"`  | Size of the textfield component: `"small"`, `"medium"`, `"large"`                             | No       |
| `color`                      | `MjoTextfieldColor`         | `"primary"` | Color scheme: `"primary"`, `"secondary"`                                                      | No       |
| `variant`                    | `MjoTextfieldVariant`       | `"default"` | Textfield variant: `"default"`, `"ghost"`, `"flat"`                                           | No       |
| `clearabled`                 | `boolean`                   | `false`     | Show clear button to remove selected date                                                     | No       |
| `displayMode`                | `MjoDatePickerDisplayMode`  | `"numeric"` | Date display format: `"iso"`, `"localized"`, `"numeric"`                                      | No       |
| `helperText`                 | `string`                    | `undefined` | Helper text displayed below the textfield                                                     | No       |
| `aria-describedby`           | `string`                    | `undefined` | ID of element describing the date picker                                                      | No       |
| `aria-live`                  | `MjoDatePickerAriaLive`     | `"polite"`  | ARIA live region politeness: `"polite"`, `"assertive"`, `"off"`                               | No       |
| `disabledAnnounceSelections` | `boolean`                   | `false`     | Disable screen reader announcements for date selections                                       | No       |
| `textfieldTheme`             | `MjoInputTheme`             | `undefined` | Theme overrides for the textfield component                                                   | No       |
| `calendarTheme`              | `MjoCalendarTheme`          | `undefined` | Theme overrides for the calendar component                                                    | No       |

## States

| State              | Type     | Description                             |
| ------------------ | -------- | --------------------------------------- |
| `announcementText` | `string` | Current screen reader announcement text |

## Public Methods

| Method       | Parameters      | Description                                               | Return   |
| ------------ | --------------- | --------------------------------------------------------- | -------- |
| `clear()`    | -               | Clears the current date selection and resets the calendar | `void`   |
| `click()`    | -               | Programmatically clicks the textfield                     | `void`   |
| `close()`    | -               | Closes the calendar dropdown                              | `void`   |
| `focus()`    | -               | Focuses the textfield input                               | `void`   |
| `open()`     | -               | Opens the calendar dropdown                               | `void`   |
| `getValue()` | -               | Returns the current value                                 | `string` |
| `setValue()` | `value: string` | Sets the date value programmatically                      | `void`   |

## Events

| Event                    | Type                    | Description                                                        | Detail                                                                                                              |
| ------------------------ | ----------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `mjo-date-picker:change` | `DatePickerChangeEvent` | Fired when date selection changes (single date or completed range) | `{ value?: string, date?: Date, startDate?: Date, endDate?: Date, startDateValue?: string, endDateValue?: string }` |
| `change`                 | `CustomEvent`           | Standard change event for form compatibility                       | Same as `mjo-date-picker:change`                                                                                    |

## CSS Parts

All parts from the internal `mjo-textfield` and `mjo-calendar` components are exported with prefixes for styling customization.

### Textfield Parts

| Part                                    | Description                        | Element            |
| --------------------------------------- | ---------------------------------- | ------------------ |
| `textfield-container`                   | Main textfield container           | Container element  |
| `textfield-input`                       | Input element                      | Input element      |
| `textfield-label-container`             | Label container                    | Container element  |
| `textfield-label-truncate-container`    | Label truncate container           | Container element  |
| `textfield-label-truncate-wrapper`      | Label truncate wrapper             | Wrapper element    |
| `textfield-prefix-text`                 | Container for prefix text          | Container element  |
| `textfield-suffix-text`                 | Container for suffix text          | Container element  |
| `textfield-start-icon-container`        | Container for start icon           | Container element  |
| `textfield-start-icon`                  | The start icon element             | Icon element       |
| `textfield-end-icon-container`          | Container for end icon             | Container element  |
| `textfield-end-icon`                    | The end icon element               | Icon element       |
| `textfield-start-image-container`       | Container for start image          | Container element  |
| `textfield-start-image`                 | The start image element            | Image element      |
| `textfield-end-image-container`         | Container for end image            | Container element  |
| `textfield-end-image`                   | The end image element              | Image element      |
| `textfield-clear-button`                | The clear button element           | Button element     |
| `textfield-clear-icon`                  | The clear icon element             | Icon element       |
| `textfield-password-button`             | The password toggle button element | Button element     |
| `textfield-password-icon`               | The password toggle icon element   | Icon element       |
| `textfield-helper-text-container`       | Helper text container              | Container element  |
| `textfield-helper-text-typography`      | Helper text typography             | Typography element |
| `textfield-helper-text-error-message`   | Error message element              | Message element    |
| `textfield-helper-text-success-message` | Success message element            | Message element    |
| `textfield-helper-text-icon`            | Helper text icon element           | Icon element       |
| `textfield-counter-container`           | Character counter container        | Container element  |
| `textfield-counter-text`                | Character counter text             | Text element       |

### Calendar Parts

| Part                                | Description                              | Element            |
| ----------------------------------- | ---------------------------------------- | ------------------ |
| `calendar-container`                | The main calendar container              | Container element  |
| `calendar-header`                   | The calendar header container            | Header element     |
| `calendar-navigation`               | Navigation buttons and selectors toolbar | Navigation element |
| `calendar-nav-button`               | Navigation buttons (previous/next month) | Button element     |
| `calendar-selectors-container`      | Container for month and year selectors   | Container element  |
| `calendar-selector-button`          | Month and year selector buttons          | Button element     |
| `calendar-grid`                     | The main calendar grid container         | Grid container     |
| `calendar-week-days-container`      | Container for weekday headers            | Container element  |
| `calendar-week-day`                 | Individual weekday header cell           | Cell element       |
| `calendar-days-container`           | Container for calendar days              | Container element  |
| `calendar-day`                      | Individual day cell                      | Cell element       |
| `calendar-day-today`                | Today's date cell                        | Cell element       |
| `calendar-day-selected`             | Selected day cell                        | Cell element       |
| `calendar-month-picker-container`   | Month picker overlay container           | Container element  |
| `calendar-month-picker-button`      | Individual month selection button        | Button element     |
| `calendar-year-picker-container`    | Year picker overlay container            | Container element  |
| `calendar-year-picker-navigation`   | Year picker navigation controls          | Navigation element |
| `calendar-year-picker-nav-button`   | Year picker navigation buttons           | Button element     |
| `calendar-year-picker-decade-label` | Decade range label in year picker        | Label element      |
| `calendar-year-picker-grid`         | Year picker grid layout                  | Grid container     |
| `calendar-year-picker-button`       | Individual year selection button         | Button element     |

## Accessibility

### ARIA Roles and Attributes

- The textfield has `role="combobox"` with `aria-expanded`, `aria-haspopup="dialog"`, and `aria-controls` attributes
- The calendar is identified by a unique `id` referenced by `aria-controls`
- Live region announcements use configurable `aria-live` politeness levels
- `aria-describedby` can link to external description elements
- Automatic ARIA labels are generated based on selection mode and state

### Keyboard Interactions

- **Enter/Space**: Opens the calendar dropdown when focused on textfield
- **Arrow Down/Up**: Opens the calendar dropdown when closed
- **Escape**: Closes the calendar dropdown
- All calendar keyboard navigation is inherited from the `mjo-calendar` component

### Screen Reader Support

- Date selections are announced with formatted dates (e.g., "Selected Wednesday, January 15, 2025")
- Range selections announce both start and end dates
- Calendar open/close states are announced
- Clear actions are announced
- Announcements can be disabled via `disabledAnnounceSelections` property
- Configurable politeness level via `aria-live` attribute

### Best Practices

- Always provide a descriptive `label` for the date picker
- Use `helperText` to provide additional context or format requirements
- Set appropriate `minDate` and `maxDate` constraints for your use case
- For date ranges, provide clear visual feedback of the selection state
- Consider setting `aria-live="assertive"` for critical date selections
- Use `aria-describedby` to link to detailed instructions when needed

## Usage Examples

### Basic Single Date Selection

```html
<mjo-date-picker label="Select Date" placeholder="Choose a date" name="eventDate"> </mjo-date-picker>
```

### Date Range Selection

```html
<mjo-date-picker label="Select Date Range" placeholder="Choose start and end dates" isRange name="bookingDates"> </mjo-date-picker>
```

### With Date Constraints

```html
<mjo-date-picker
  label="Appointment Date"
  minDate="2025-01-01"
  maxDate="2025-12-31"
  .disabledDates=${['2025-01-15', '2025-02-14']}
  helperText="Select a date within 2025, excluding holidays">
</mjo-date-picker>
```

### Display Modes

```html
<!-- ISO Format (YYYY-MM-DD) -->
<mjo-date-picker label="ISO Format" displayMode="iso"> </mjo-date-picker>

<!-- Localized Format (e.g., "Jan 15, 2025") -->
<mjo-date-picker label="Localized Format" displayMode="localized" locale="en"> </mjo-date-picker>

<!-- Numeric Format (locale-specific numeric, e.g., "1/15/2025") -->
<mjo-date-picker label="Numeric Format" displayMode="numeric"> </mjo-date-picker>
```

### With Clearable Option

```html
<mjo-date-picker label="Select Date" clearabled value="2025-01-15"> </mjo-date-picker>
```

### Programmatic Date Handling

```typescript
const datePicker = document.querySelector("mjo-date-picker");

// Set a date programmatically
datePicker.setValue("2025-06-15");

// Get current value
const currentDate = datePicker.getValue();

// Clear selection
datePicker.clear();

// Open/close programmatically
datePicker.open();
datePicker.close();
```

### Handling Date Selection Events

```typescript
const datePicker = document.querySelector("mjo-date-picker");

datePicker.addEventListener("mjo-date-picker:change", (event) => {
    if (datePicker.isRange) {
        console.log("Start:", event.detail.startDateValue);
        console.log("End:", event.detail.endDateValue);
    } else {
        console.log("Selected:", event.detail.value);
        console.log("Date object:", event.detail.date);
    }
});
```

### Form Integration

```html
<mjo-form>
    <mjo-date-picker name="birthDate" label="Date of Birth" required error errormsg="Date of birth is required"> </mjo-date-picker>

    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

### Custom Theming

```html
<mjo-date-picker
  label="Themed Date Picker"
  .textfieldTheme=${{
    '--mjo-input-background': '#f5f5f5',
    '--mjo-input-border-color': '#2196F3',
  }}
  .calendarTheme=${{
    '--mjo-calendar-selected-background': '#2196F3',
    '--mjo-calendar-selected-color': '#ffffff',
  }}>
</mjo-date-picker>
```

### Different Sizes and Variants

```html
<!-- Small size -->
<mjo-date-picker label="Small" size="small"> </mjo-date-picker>

<!-- Ghost variant -->
<mjo-date-picker label="Ghost" variant="ghost"> </mjo-date-picker>

<!-- Secondary color -->
<mjo-date-picker label="Secondary" color="secondary"> </mjo-date-picker>

<!-- Full width -->
<mjo-date-picker label="Full Width" fullwidth> </mjo-date-picker>
```

### Accessible Date Range with Context

```html
<div>
    <p id="booking-instructions">Select your check-in and check-out dates. Minimum stay is 2 nights.</p>

    <mjo-date-picker
        label="Booking Dates"
        isRange
        aria-describedby="booking-instructions"
        aria-live="assertive"
        helperText="Check-in and check-out"
        minDate="2025-01-01"
    >
    </mjo-date-picker>
</div>
```

## Additional Notes

### Date Value Format

- Single date mode: `"YYYY-MM-DD"` (e.g., `"2025-01-15"`)
- Range mode: `"YYYY-MM-DD/YYYY-MM-DD"` (e.g., `"2025-01-15/2025-01-20"`)
- All date constraints (`minDate`, `maxDate`, `disabledDates`) use the same ISO format

### Display Mode Behavior

- **iso**: Always displays in ISO format regardless of locale
- **localized**: Uses `Intl.DateTimeFormat` with `dateStyle: "medium"` option
- **numeric**: Uses default numeric formatting based on locale

### Component Composition

The `mjo-date-picker` is composed of:

- **mjo-textfield**: Provides the input interface with icons and validation
- **mjo-dropdown**: Manages the floating calendar container
- **mjo-calendar**: Handles date selection logic and rendering

### Form Integration

The component implements the `FormMixin` and automatically:

- Registers with parent `mjo-form` components
- Updates form data when dates are selected
- Supports the `name` attribute for form submissions
- Provides an `inputElement` reference for native form validation

### Localization

When `locale="auto"`, the component automatically detects the browser's locale. Supported locales include all those available in the `mjo-calendar` component.

### Performance Considerations

The calendar dropdown is recreated with a unique key whenever the value changes to ensure proper state synchronization. This prevents stale selections when programmatically changing values.
