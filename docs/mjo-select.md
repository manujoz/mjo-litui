# mjo-select

Comprehensive dropdown select component with search functionality, rich options support, and full form integration.

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

The `mjo-select` component is designed for scenarios where users need to select a single value from a list of options:

- Form fields requiring single-value selection from a predefined list
- Configuration dropdowns with search capability for large datasets
- Navigation menus with enhanced visual presentation (icons/images)
- Advanced selection interfaces requiring form validation and error handling
- Components needing programmatic value management and custom validation

## Import

```typescript
import "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option"; // Required for options
```

## Properties

| Property               | Type                                           | Description                                                              | Default     | Required |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ | ----------- | -------- |
| `autoFocus`            | `boolean`                                      | Automatically focuses the select on mount                                | `false`     | No       |
| `disabled`             | `boolean`                                      | Disables user interaction with the select                                | `false`     | No       |
| `required`             | `boolean`                                      | Marks the select as required for form validation                         | `false`     | No       |
| `fullwidth`            | `boolean`                                      | Makes the select expand to fill its container width                      | `false`     | No       |
| `name`                 | `string`                                       | Name attribute for form submission                                       | `undefined` | No       |
| `placeholder`          | `string`                                       | Placeholder text displayed when no value is selected                     | `undefined` | No       |
| `value`                | `string`                                       | Currently selected option value                                          | `""`        | No       |
| `label`                | `string`                                       | Label text displayed above the select                                    | `undefined` | No       |
| `size`                 | `MjoSelectSize`                                | Visual size of the select (`"small"`, `"medium"`, `"large"`)             | `"medium"`  | No       |
| `color`                | `MjoSelectColor`                               | Color scheme for focus and selection states (`"primary"`, `"secondary"`) | `"primary"` | No       |
| `variant`              | `MjoSelectVariant`                             | Visual variant style (`"default"`, `"ghost"`, `"flat"`)                  | `"default"` | No       |
| `startIcon`            | `string`                                       | Icon displayed at the start of the select input                          | `undefined` | No       |
| `endIcon`              | `string`                                       | Icon displayed at the end of the select input                            | `undefined` | No       |
| `startImage`           | `string`                                       | Image URL displayed at the start (ignored if startIcon is set)           | `undefined` | No       |
| `endImage`             | `string`                                       | Image URL displayed at the end (ignored if endIcon is set)               | `undefined` | No       |
| `prefixText`           | `string`                                       | Text displayed before the input value                                    | `undefined` | No       |
| `suffixText`           | `string`                                       | Text displayed after the input value                                     | `undefined` | No       |
| `helperText`           | `string`                                       | Helper text displayed below the select                                   | `undefined` | No       |
| `selectOnFocus`        | `boolean`                                      | Whether to select text when the input receives focus                     | `false`     | No       |
| `searchable`           | `boolean`                                      | Enables search functionality in the dropdown                             | `false`     | No       |
| `dropDownTheme`        | `MjoDropdownTheme`                             | Custom theme configuration for the dropdown                              | `undefined` | No       |
| `ariaDescribedby`      | `string`                                       | ID(s) of elements that describe the select                               | `undefined` | No       |
| `ariaLabelledby`       | `string`                                       | ID(s) of elements that label the select                                  | `undefined` | No       |
| `ariaErrormessage`     | `string`                                       | ID of element containing error message                                   | `undefined` | No       |
| `ariaAutocomplete`     | `"none"` \| `"inline"` \| `"list"` \| `"both"` | Indicates type of autocomplete functionality                             | `undefined` | No       |
| `ariaActivedescendant` | `string`                                       | ID of currently active descendant element                                | `undefined` | No       |

## Public Methods

| Method                         | Parameters                              | Description                                                        | Return              |
| ------------------------------ | --------------------------------------- | ------------------------------------------------------------------ | ------------------- |
| `focus()`                      | -                                       | Focuses the select input element                                   | `void`              |
| `blur()`                       | -                                       | Removes focus from the select input element                        | `void`              |
| `checkValidity()`              | -                                       | Checks if the select meets all validation constraints              | `boolean`           |
| `reportValidity()`             | -                                       | Reports validity state and displays validation messages if invalid | `boolean`           |
| `setCustomValidity(message)`   | `message: string`                       | Sets a custom validation message                                   | `void`              |
| `openDropdown()`               | -                                       | Opens the select dropdown programmatically                         | `void`              |
| `closeDropdown()`              | -                                       | Closes the select dropdown programmatically                        | `void`              |
| `toggleDropdown()`             | -                                       | Toggles the dropdown open/closed state                             | `void`              |
| `getSelectedOption()`          | -                                       | Returns the currently selected option element                      | `MjoOption \| null` |
| `getOptions()`                 | -                                       | Returns an array of all available option elements                  | `MjoOption[]`       |
| `filterOptions(query)`         | `query: string`                         | Filters visible options based on search query                      | `void`              |
| `resetFilter()`                | -                                       | Resets the filter to show all options                              | `void`              |
| `isOpen()`                     | -                                       | Returns whether the dropdown is currently open                     | `boolean`           |
| `setValue(value, noDispatch?)` | `value: string`, `noDispatch?: boolean` | Sets the selected value programmatically                           | `void`              |
| `getValue()`                   | -                                       | Returns the current selected value                                 | `string`            |

Additional validation methods:

- **`validationMessage`** (getter): Returns the current validation message string

## Events

| Event                         | Type                            | Description                                      | Detail                                                                                                                       |
| ----------------------------- | ------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `mjo-select:change`           | `MjoSelectChangeEvent`          | Fired when the selected value changes            | `{ element: MjoSelect, value: string, previousValue: string, option: MjoOption \| null, previousOption: MjoOption \| null }` |
| `mjo-select:open`             | `MjoSelectOpenEvent`            | Fired when the dropdown opens                    | `{ element: MjoSelect, value: string, optionsCount: number }`                                                                |
| `mjo-select:close`            | `MjoSelectCloseEvent`           | Fired when the dropdown closes                   | `{ element: MjoSelect, value: string, reason: "selection" \| "escape" \| "blur" \| "clickOutside" }`                         |
| `mjo-select:search`           | `MjoSelectSearchEvent`          | Fired when searching through options             | `{ element: MjoSelect, query: string, filteredOptionsCount: number }`                                                        |
| `mjo-select:focus`            | `MjoSelectFocusEvent`           | Fired when the select gains focus                | `{ element: MjoSelect, value: string }`                                                                                      |
| `mjo-select:blur`             | `MjoSelectBlurEvent`            | Fired when the select loses focus                | `{ element: MjoSelect, value: string, reason: "tab" \| "clickOutside" \| "programmatic" }`                                   |
| `mjo-select:option-preselect` | `MjoSelectOptionPreselectEvent` | Fired when an option is preselected via keyboard | `{ element: MjoSelect, option: MjoOption, previousOption: MjoOption \| null, value: string }`                                |
| `change`                      | `Event`                         | Standard HTML change event                       | -                                                                                                                            |
| `focus`                       | `FocusEvent`                    | Standard HTML focus event                        | -                                                                                                                            |
| `invalid`                     | `Event`                         | Fired when form validation fails                 | -                                                                                                                            |

## CSS Variables

### Select Component Variables

| Variable                         | Description                      | Default   |
| -------------------------------- | -------------------------------- | --------- |
| `--mjo-select-label-font-size`   | Font size for the select label   | `inherit` |
| `--mjo-select-label-font-weight` | Font weight for the select label | `inherit` |
| `--mjo-select-label-color`       | Color for the select label       | `inherit` |

### Option Component Variables

| Variable                                           | Description                                      | Default                                        |
| -------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| `--mjo-select-option-padding`                      | Padding for each option in the dropdown          | `5px`                                          |
| `--mjo-select-option-font-size`                    | Font size for option text                        | `0.8em`                                        |
| `--mjo-select-option-preselected-background-color` | Background color for preselected/hovered options | `var(--mjo-background-color-hover, #eeeeee)`   |
| `--mjo-select-option-preselected-color`            | Text color for preselected/hovered options       | `var(--mjo-foreground-color, currentColor)`    |
| `--mjo-select-option-selected-primary-color`       | Text color for selected option (primary color)   | `var(--mjo-primary-foreground-color, white)`   |
| `--mjo-select-option-selected-secondary-color`     | Text color for selected option (secondary color) | `var(--mjo-secondary-foreground-color, white)` |

**Note**: The select component also supports all standard input CSS variables documented in the theming guide (e.g., `--mjo-input-background-color`, `--mjo-input-border-color`, etc.).

## CSS Parts

### Select Container Parts

| Part                         | Description                                   | Element    |
| ---------------------------- | --------------------------------------------- | ---------- |
| `container`                  | Main select input container                   | `div`      |
| `input`                      | Native input element (hidden for display)     | `input`    |
| `prefix-text`                | Container for prefix text                     | `div`      |
| `suffix-text`                | Container for suffix text                     | `div`      |
| `start-icon-container`       | Container for start icon                      | `div`      |
| `start-icon`                 | Start icon element (from mjo-icon)            | `mjo-icon` |
| `end-icon-container`         | Container for end icon                        | `div`      |
| `end-icon`                   | End icon element (from mjo-icon)              | `mjo-icon` |
| `start-image-container`      | Container for start image                     | `div`      |
| `start-image`                | Start image element                           | `img`      |
| `end-image-container`        | Container for end image                       | `div`      |
| `end-image`                  | End image element                             | `img`      |
| `end-icon-option-container`  | Container for end icon from selected option   | `div`      |
| `end-option-icon`            | End icon from selected option (from mjo-icon) | `mjo-icon` |
| `end-image-option-container` | Container for end image from selected option  | `div`      |
| `end-option-image`           | End image from selected option                | `img`      |
| `select-dropdown-icon`       | Dropdown arrow icon                           | `div`      |
| `helper-container`           | Helper text container                         | `div`      |

### Label Parts (via exportparts)

| Part                       | Description              | Element              |
| -------------------------- | ------------------------ | -------------------- |
| `label-container`          | Label container          | `mjoint-input-label` |
| `label-truncate-container` | Label truncate container | `mjoint-input-label` |
| `label-truncate-wrapper`   | Label truncate wrapper   | `mjoint-input-label` |

### Helper Text Parts (via exportparts)

| Part                          | Description              | Element                    |
| ----------------------------- | ------------------------ | -------------------------- |
| `helper-text-container`       | Helper text container    | `mjoint-input-helper-text` |
| `helper-text-typography`      | Helper text typography   | `mjoint-input-helper-text` |
| `helper-text-error-message`   | Error message element    | `mjoint-input-helper-text` |
| `helper-text-success-message` | Success message element  | `mjoint-input-helper-text` |
| `helper-text-icon`            | Helper text icon element | `mjoint-input-helper-text` |

### Options List Parts (via exportparts)

| Part                           | Description                              | Element               |
| ------------------------------ | ---------------------------------------- | --------------------- |
| `options-list-container`       | Options list container                   | `mjoint-options-list` |
| `select-search-container`      | Search input container (when searchable) | `mjoint-options-list` |
| `select-search-input-wrapper`  | Search input wrapper                     | `mjoint-options-list` |
| `select-search-input`          | Search input element                     | `mjoint-options-list` |
| `select-search-icon-container` | Search icon container                    | `mjoint-options-list` |
| `select-search-icon`           | Search icon element                      | `mjoint-options-list` |

## Accessibility

The `mjo-select` component implements comprehensive accessibility features following WAI-ARIA best practices:

### ARIA Attributes

- **`role="combobox"`**: Applied to the input element for proper screen reader identification
- **`aria-haspopup="listbox"`**: Indicates the presence of a listbox popup
- **`aria-expanded`**: Dynamically reflects the dropdown's open/closed state
- **`aria-controls`**: Links the input to the listbox by ID
- **`aria-activedescendant`**: Points to the currently highlighted option during keyboard navigation
- **`aria-autocomplete`**: Set to "list" when searchable, "none" otherwise
- **`aria-invalid`**: Indicates validation state
- **`aria-required`**: Reflects the required property
- **`aria-describedby`**: Associates helper text and error messages
- **`aria-labelledby`**: Associates label elements
- **`aria-errormessage`**: Points to error message element

### Keyboard Navigation

- **Arrow Down**: Opens dropdown (if closed) or moves to next option
- **Arrow Up**: Opens dropdown (if closed) or moves to previous option
- **Enter**: Selects the currently highlighted option and closes dropdown
- **Tab**: Closes dropdown and moves focus to next focusable element
- **Escape**: Closes dropdown without changing selection

### Best Practices

- Always provide a `label` or use `aria-label` for screen reader users
- Use `helperText` to provide additional context or instructions
- Set `required` attribute for mandatory fields to enable proper form validation
- Ensure sufficient color contrast when customizing colors
- Provide meaningful `aria-describedby` for complex validation requirements
- Use the `ariaErrormessage` property to associate custom error messages

## Usage Examples

### Basic Select

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option";

@customElement("my-component")
class MyComponent extends LitElement {
    render() {
        return html`
            <mjo-select label="Choose a color" placeholder="Select a color">
                <mjo-option value="red">Red</mjo-option>
                <mjo-option value="green">Green</mjo-option>
                <mjo-option value="blue">Blue</mjo-option>
            </mjo-select>
        `;
    }
}
```

### Searchable Select with Icons

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option";
import { AiOutlineUser } from "mjo-icons/ai";

@customElement("user-selector")
class UserSelector extends LitElement {
    @state() selectedUser = "";

    render() {
        return html`
            <mjo-select
                label="Select User"
                .value=${this.selectedUser}
                searchable
                helperText="Search by name or email"
                startIcon=${AiOutlineUser}
                @mjo-select:change=${this.handleChange}
            >
                <mjo-option value="1" startIcon=${AiOutlineUser}>John Doe</mjo-option>
                <mjo-option value="2" startIcon=${AiOutlineUser}>Jane Smith</mjo-option>
                <mjo-option value="3" startIcon=${AiOutlineUser}>Bob Johnson</mjo-option>
            </mjo-select>
        `;
    }

    handleChange(e: CustomEvent) {
        this.selectedUser = e.detail.value;
        console.log("Selected user:", e.detail.option?.text);
    }
}
```

### Form Integration with Validation

```typescript
import { LitElement, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { MjoSelect } from "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option";

@customElement("registration-form")
class RegistrationForm extends LitElement {
    @query('mjo-select[name="country"]') countrySelect!: MjoSelect;
    @state() formError = "";

    render() {
        return html`
            <form @submit=${this.handleSubmit}>
                <mjo-select name="country" label="Country" placeholder="Select your country" required helperText="Required field" searchable>
                    <mjo-option value="us">United States</mjo-option>
                    <mjo-option value="uk">United Kingdom</mjo-option>
                    <mjo-option value="ca">Canada</mjo-option>
                    <mjo-option value="au">Australia</mjo-option>
                </mjo-select>

                ${this.formError ? html`<p class="error">${this.formError}</p>` : ""}

                <button type="submit">Submit</button>
            </form>
        `;
    }

    handleSubmit(e: Event) {
        e.preventDefault();

        if (!this.countrySelect.checkValidity()) {
            this.formError = this.countrySelect.validationMessage;
            this.countrySelect.reportValidity();
            return;
        }

        // Form is valid, proceed with submission
        console.log("Country:", this.countrySelect.getValue());
    }
}
```

### Programmatic Control

```typescript
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { MjoSelect } from "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option";

@customElement("controlled-select")
class ControlledSelect extends LitElement {
    @query("mjo-select") select!: MjoSelect;

    render() {
        return html`
            <mjo-select label="Status">
                <mjo-option value="active">Active</mjo-option>
                <mjo-option value="inactive">Inactive</mjo-option>
                <mjo-option value="pending">Pending</mjo-option>
            </mjo-select>

            <button @click=${() => this.select.setValue("active")}>Set Active</button>
            <button @click=${() => this.select.openDropdown()}>Open Dropdown</button>
            <button @click=${() => console.log(this.select.getSelectedOption())}>Log Selection</button>
        `;
    }
}
```

### Custom Styling with CSS Parts

```typescript
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option";

@customElement("styled-select")
class StyledSelect extends LitElement {
    render() {
        return html`
            <mjo-select label="Styled Select" placeholder="Choose an option">
                <mjo-option value="1">Option 1</mjo-option>
                <mjo-option value="2">Option 2</mjo-option>
            </mjo-select>
        `;
    }

    static styles = css`
        mjo-select::part(container) {
            border-radius: 12px;
            border: 2px solid #1aa8ed;
        }

        mjo-select::part(label-container) {
            font-weight: bold;
            color: #1aa8ed;
        }

        mjo-select::part(select-dropdown-icon) {
            color: #1aa8ed;
        }

        mjo-select {
            --mjo-select-option-padding: 12px;
            --mjo-select-option-font-size: 1em;
        }
    `;
}
```

### Options with Images

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option";

@customElement("country-selector")
class CountrySelector extends LitElement {
    render() {
        return html`
            <mjo-select label="Select Country" placeholder="Choose a country" searchable>
                <mjo-option value="us" startImage="https://flagcdn.com/w20/us.png"> United States </mjo-option>
                <mjo-option value="uk" startImage="https://flagcdn.com/w20/gb.png"> United Kingdom </mjo-option>
                <mjo-option value="fr" startImage="https://flagcdn.com/w20/fr.png"> France </mjo-option>
            </mjo-select>
        `;
    }
}
```

### Event Handling

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-select";
import "mjo-litui/components/select/mjo-option";

@customElement("select-with-events")
class SelectWithEvents extends LitElement {
    render() {
        return html`
            <mjo-select
                label="Interactive Select"
                searchable
                @mjo-select:open=${this.handleOpen}
                @mjo-select:close=${this.handleClose}
                @mjo-select:change=${this.handleChange}
                @mjo-select:search=${this.handleSearch}
                @mjo-select:option-preselect=${this.handlePreselect}
            >
                <mjo-option value="1">Option 1</mjo-option>
                <mjo-option value="2">Option 2</mjo-option>
                <mjo-option value="3">Option 3</mjo-option>
            </mjo-select>
        `;
    }

    handleOpen(e: CustomEvent) {
        console.log("Dropdown opened with", e.detail.optionsCount, "options");
    }

    handleClose(e: CustomEvent) {
        console.log("Dropdown closed. Reason:", e.detail.reason);
    }

    handleChange(e: CustomEvent) {
        console.log("Value changed from", e.detail.previousValue, "to", e.detail.value);
        console.log("Selected option:", e.detail.option);
    }

    handleSearch(e: CustomEvent) {
        console.log("Searching for:", e.detail.query);
        console.log("Filtered options:", e.detail.filteredOptionsCount);
    }

    handlePreselect(e: CustomEvent) {
        console.log("Preselected option:", e.detail.option?.text);
    }
}
```

## Additional Notes

### Option Component Relationship

The `mjo-select` component works exclusively with `mjo-option` elements. Each option supports:

- Text content via slot or `text` property
- Icons via `startIcon` and `endIcon` properties
- Images via `startImage` and `endImage` properties
- Value via `value` property (required)
- Color matching via `color` property (inherits from parent select)

### Form Integration

The select component fully integrates with HTML forms:

- Submits the selected value under the specified `name` attribute
- Supports native form validation with `required` attribute
- Implements `checkValidity()` and `reportValidity()` methods
- Triggers native `invalid` event when validation fails
- Compatible with `FormData` API

### Search Functionality

When `searchable` is enabled:

- A search input appears at the top of the dropdown
- Options are filtered in real-time as the user types
- Filtering matches both `value` and `text` properties
- The search is case-insensitive
- Fires `mjo-select:search` event with filtered results count

### Keyboard Navigation

The component maintains focus management during keyboard navigation:

- Preselected options are visually highlighted before selection
- The `aria-activedescendant` attribute tracks the highlighted option
- Enter key confirms the preselected option
- Tab key closes dropdown and moves to next form element

### Performance Considerations

- Options are rendered using Lit's `repeat` directive for efficient updates
- Search filtering uses client-side filtering; for large datasets, consider server-side filtering
- The dropdown implements virtual scrolling for optimal performance with many options
- MutationObserver tracks dynamic option changes automatically

### Validation

The component supports both native HTML5 validation and custom validation:

- Use `required` for mandatory field validation
- Call `setCustomValidity()` for custom validation rules
- The `validationMessage` getter returns the current error message
- Validation errors display in the helper text area when `reportValidity()` is called
