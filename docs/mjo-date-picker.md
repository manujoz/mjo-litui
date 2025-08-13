# mjo-date-picker

Interactive date (or date range) selection input composed from `mjo-textfield`, `mjo-dropdown` (portal), and `mjo-calendar`. Provides an accessible, themed, non-typing date picking experience with optional range mode, clear button, localization, form integration and localized display formatting.

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
    }
}
```

## Range Example

```ts
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";

@customElement("example-date-picker-range")
export class ExampleDatePickerRange extends LitElement {
    @state() private value = "";
    render() {
        return html`
            <mjo-date-picker range label="Report range" clearabled @date-picker-change=${this.onChange}></mjo-date-picker>
            <p>Range: ${this.value || "(not selected)"}</p>
        `;
    }
    private onChange(e: CustomEvent) {
        this.value = e.detail.value;
    }
}
```

## Localized Display Example

```ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "mjo-litui/mjo-date-picker";

@customElement("example-date-picker-localized")
export class ExampleDatePickerLocalized extends LitElement {
    render() {
        return html` <mjo-date-picker label="Fecha" locale="es" display-mode="localized" placeholder="Selecciona fecha"></mjo-date-picker> `;
    }
}
```

## Form Integration

Works seamlessly with `mjo-form` via `name`.

```html
<mjo-form @submit="${(e:any)" =""
    >console.log(e.detail)}>
    <mjo-date-picker name="startDate" label="Start" required></mjo-date-picker>
    <mjo-date-picker name="period" range label="Period"></mjo-date-picker>
    <mjo-button type="submit">Submit</mjo-button>
</mjo-form>
```

Submitted values:

-   Single: `YYYY-MM-DD` string.
-   Range: `YYYY-MM-DD/YYYY-MM-DD` once both ends selected.

## Attributes / Properties

| Name              | Type                             | Default     | Reflects | Description                                                        |
| ----------------- | -------------------------------- | ----------- | -------- | ------------------------------------------------------------------ |
| `name`            | `string \| undefined`            | `undefined` | no       | Form field name (enables inclusion in `mjo-form` data)             |
| `value`           | `string`                         | `""`        | no       | Current value (single: `YYYY-MM-DD`; range: `start/end`)           |
| `range`           | `boolean`                        | `false`     | yes      | Enables range mode                                                 |
| `locale`          | `string`                         | `"en"`      | no       | Locale passed to calendar & Intl formatting                        |
| `min-date`        | `string \| undefined`            | `undefined` | no       | Minimum selectable date                                            |
| `max-date`        | `string \| undefined`            | `undefined` | no       | Maximum selectable date                                            |
| `disabled-dates`  | `string[] \| undefined`          | `undefined` | no       | Array of explicit disabled dates                                   |
| `label`           | `string \| undefined`            | `undefined` | no       | Floating label of inner textfield                                  |
| `placeholder`     | `string \| undefined`            | `undefined` | no       | Placeholder (shown when empty)                                     |
| `disabled`        | `boolean`                        | `false`     | yes      | Disables user interaction                                          |
| `size`            | `"small" \| "medium" \| "large"` | `"medium"`  | no       | Size token forwarded to textfield                                  |
| `color`           | `"primary" \| "secondary"`       | `"primary"` | no       | Color token forwarded to textfield                                 |
| `clearabled`      | `boolean`                        | `false`     | no       | Shows a Clear button footer when value present                     |
| `close-on-select` | `boolean`                        | `true`      | no       | Closes dropdown after selection (single or after range completion) |
| `required`        | `boolean`                        | `false`     | yes      | Marks as required for form validation                              |
| `display-mode`    | `"iso" \| "localized"`           | `"iso"`     | no       | ISO raw value or locale-formatted display text                     |

## Events

| Event                | Detail (shape)                                                                                                       | Emitted When                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `date-picker-change` | `{ value: string, date?: Date, startDate?: Date, endDate?: Date, startDateString?: string, endDateString?: string }` | Value changes (single date or completed range) |
| `change`             | Native bubbling `Event` (no extra detail)                                                                            | Fired alongside `date-picker-change` for forms |

Notes:

-   In range mode partial (only start) selection does not emit change until end selected.
-   `value` always mirrors the component state.

## Methods (Public)

| Method          | Returns  | Description                                    |
| --------------- | -------- | ---------------------------------------------- |
| `focus()`       | `void`   | Focuses internal textfield                     |
| `clear()`       | `void`   | Clears value and emits change                  |
| `openPicker()`  | `void`   | Programmatically opens dropdown                |
| `closePicker()` | `void`   | Closes dropdown                                |
| `getValue()`    | `string` | Returns current raw value                      |
| `setValue(v)`   | `void`   | Sets value (no validation beyond pass-through) |

## Display Formatting

`display-mode` decides user-facing text while `value` stays ISO/raw.

-   `iso`: Textfield shows raw `value` (or `start/end` joined by `/`).
-   `localized`: Each ISO date is formatted with `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`. Range is rendered as `start – end` using an en dash.

If parsing fails or locale unsupported, falls back to ISO substring.

## Theming

Inherits ThemeMixin so you can pass a partial theme object:

```ts
<mjo-date-picker .theme=${{ panelBackground: '#fffbe6' }}></mjo-date-picker>
```

(See `theming.md` for global tokens. Specific date-picker theme interface extends global one via `MjoDatePickerTheme`—refer there for available keys.)

### CSS Variables

| Variable                                   | Purpose             |
| ------------------------------------------ | ------------------- |
| `--mjo-date-picker-panel-padding`          | Panel padding       |
| `--mjo-date-picker-panel-background-color` | Panel background    |
| `--mjo-date-picker-panel-radius`           | Panel border-radius |
| `--mjo-date-picker-panel-box-shadow`       | Panel shadow        |

Textfield & calendar expose their own rich set of variables (see their docs) and inherit theme tokens.

## Accessibility

-   No manual typing (readonly input) eliminates format errors.
-   Opens with mouse click, Enter or Space while focused.
-   Clear action button is a standard `<mjo-button>` with accessible label.
-   Range output uses a clear hyphen separator (en dash) for screen readers.

## Behavioral Notes

-   In range mode the dropdown remains open until the second date completes the range (unless `close-on-select=false`).
-   `clear()` triggers both `date-picker-change` and native `change` for form re-validation.
-   When disabled, open/clear/focus actions are ignored.
-   Emits events after internal state is updated, so listeners receive latest consistent value.
-   Internal clicks inside the portal dropdown (calendar surface or Clear button) no longer close the dropdown; only external document clicks dismiss it.
-   In range mode pressing Clear while open keeps the panel open to allow immediate new start selection.

## Example with Imperative Control

```ts
@customElement("example-date-picker-methods")
export class ExampleDatePickerMethods extends LitElement {
    private ref?: HTMLElement & { openPicker: () => void; closePicker: () => void; clear: () => void };
    render() {
        return html` <mjo-date-picker label="Session" ref=${(el: any) => (this.ref = el)}></mjo-date-picker>
            <div style="margin-top:8px; display:flex; gap:4px;">
                <mjo-button size="small" @click=${() => this.ref?.openPicker()}>Open</mjo-button>
                <mjo-button size="small" @click=${() => this.ref?.closePicker()}>Close</mjo-button>
                <mjo-button size="small" variant="flat" @click=${() => this.ref?.clear()}>Clear</mjo-button>
            </div>`;
    }
}
```

## Internationalization

Uses `locale` for both calendar language and optionally `display-mode="localized"` rendering. The underlying calendar supports specific locales (see `mjo-calendar` docs). Any BCP-47 tag supported by the host Intl implementation may work for formatting, but calendar labels are limited to its supported locale list.

## CSS Parts

(Delegated from child components; `mjo-date-picker` itself does not currently expose additional shadow parts.)

## Summary

`<mjo-date-picker>` provides a compact, themed, portal-based date or range selection UX with consistent ISO value semantics, optional localized display, clear button behavior, and straightforward form integration.
