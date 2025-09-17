import type { MjoCalendar } from "./mjo-calendar.js";
import type { MjoDropdown } from "./mjo-dropdown.js";
import type { MjoTextfield } from "./mjo-textfield.js";
import { SupportedLocale } from "./types/locales.js";
import { CalendarDateSelectedEvent, CalendarRangeSelectedEvent } from "./types/mjo-calendar";
import { DatePickerChangeEvent } from "./types/mjo-date-picker.js";

import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { PiCalendarDotsLight } from "mjo-icons/pi";

import { createRef, ref } from "lit/directives/ref.js";
import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import { ifDefined } from "lit/directives/if-defined.js";
import "./mjo-button.js";
import "./mjo-calendar.js";
import "./mjo-dropdown.js";
import "./mjo-textfield.js";

/**
 * @summary Interactive date picker component with comprehensive features for single date and date range selection.
 *
 * @fires mjo-date-picker:change - Fired when date selection changes (single date or completed range)
 * @fires change - Standard change event for form compatibility
 *
 * @csspart textfield-container - Main textfield container (via exportparts from mjo-textfield)
 * @csspart textfield-input - Input element (via exportparts from mjo-textfield)
 * @csspart textfield-label-container - Label container (via exportparts from mjo-textfield)
 * @csspart textfield-label-truncate-container - Label truncate container (via exportparts from mjo-textfield)
 * @csspart textfield-label-truncate-wrapper - Label truncate wrapper (via exportparts from mjo-textfield)
 * @csspart textfield-prefix-text - Container for prefix text (via exportparts from mjo-textfield)
 * @csspart textfield-suffix-text - Container for suffix text (via exportparts from mjo-textfield)
 * @csspart textfield-start-icon-container - Container for start icon (via exportparts from mjo-textfield)
 * @csspart textfield-start-icon - The start icon element (via exportparts from mjo-textfield)
 * @csspart textfield-end-icon-container - Container for end icon (via exportparts from mjo-textfield)
 * @csspart textfield-end-icon - The end icon element (via exportparts from mjo-textfield)
 * @csspart textfield-start-image-container - Container for start image (via exportparts from mjo-textfield)
 * @csspart textfield-start-image - The start image element (via exportparts from mjo-textfield)
 * @csspart textfield-end-image-container - Container for end image (via exportparts from mjo-textfield)
 * @csspart textfield-end-image - The end image element (via exportparts from mjo-textfield)
 * @csspart textfield-clear-button - The clear button element (via exportparts from mjo-textfield)
 * @csspart textfield-clear-icon - The clear icon element (via exportparts from mjo-textfield)
 * @csspart textfield-password-button - The password toggle button element (via exportparts from mjo-textfield)
 * @csspart textfield-password-icon - The password toggle icon element (via exportparts from mjo-textfield)
 * @csspart textfield-helper-text-container - Helper text container (via exportparts from mjo-textfield)
 * @csspart textfield-helper-text-typography - Helper text typography (via exportparts from mjo-textfield)
 * @csspart textfield-helper-text-error-message - Error message element (via exportparts from mjo-textfield)
 * @csspart textfield-helper-text-success-message - Success message element (via exportparts from mjo-textfield)
 * @csspart textfield-helper-text-icon - Helper text icon element (via exportparts from mjo-textfield)
 * @csspart textfield-counter-container - Character counter container (via exportparts from mjo-textfield)
 * @csspart textfield-counter-text - Character counter text (via exportparts from mjo-textfield)
 * @csspart calendar-container - The main calendar container (via exportparts from mjo-calendar)
 * @csspart calendar-header - The calendar header container (via exportparts from mjo-calendar)
 * @csspart calendar-navigation - Navigation buttons and selectors toolbar (via exportparts from mjo-calendar)
 * @csspart calendar-nav-button - Navigation buttons - previous/next month (via exportparts from mjo-calendar)
 * @csspart calendar-selectors-container - Container for month and year selectors (via exportparts from mjo-calendar)
 * @csspart calendar-selector-button - Month and year selector buttons (via exportparts from mjo-calendar)
 * @csspart calendar-grid - The main calendar grid container (via exportparts from mjo-calendar)
 * @csspart calendar-week-days-container - Container for weekday headers (via exportparts from mjo-calendar)
 * @csspart calendar-week-day - Individual weekday header cell (via exportparts from mjo-calendar)
 * @csspart calendar-days-container - Container for calendar days (via exportparts from mjo-calendar)
 * @csspart calendar-day - Individual day cell (via exportparts from mjo-calendar)
 * @csspart calendar-day-today - Today's date cell (via exportparts from mjo-calendar)
 * @csspart calendar-day-selected - Selected day cell (via exportparts from mjo-calendar)
 * @csspart calendar-month-picker-container - Month picker overlay container (via exportparts from mjo-calendar)
 * @csspart calendar-month-picker-button - Individual month selection button (via exportparts from mjo-calendar)
 * @csspart calendar-year-picker-container - Year picker overlay container (via exportparts from mjo-calendar)
 * @csspart calendar-year-picker-navigation - Year picker navigation controls (via exportparts from mjo-calendar)
 * @csspart calendar-year-picker-nav-button - Year picker navigation buttons (via exportparts from mjo-calendar)
 * @csspart calendar-year-picker-decade-label - Decade range label in year picker (via exportparts from mjo-calendar)
 * @csspart calendar-year-picker-grid - Year picker grid layout (via exportparts from mjo-calendar)
 * @csspart calendar-year-picker-button - Individual year selection button (via exportparts from mjo-calendar)
 */
@customElement("mjo-date-picker")
export class MjoDatePicker extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IInputErrorMixin, IFormMixin, IThemeMixin {
    @property({ type: String }) name?: string;
    @property({ type: String }) value: string = ""; // single: YYYY-MM-DD, range: YYYY-MM-DD/YYYY-MM-DD
    @property({ type: Boolean, attribute: "range" }) isRange = false;
    @property({ type: String }) locale: SupportedLocale = "en";
    @property({ type: String }) minDate?: string;
    @property({ type: String }) maxDate?: string;
    @property({ type: Array }) disabledDates?: string[];
    @property({ type: String }) label?: string;
    @property({ type: String }) placeholder?: string;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Boolean }) clearabled = false;
    @property({ type: Boolean }) closeOnSelect = true;
    @property({ type: Boolean }) required = false;
    @property({ type: String }) displayMode: "iso" | "localized" = "iso";
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;
    @property({ type: String, attribute: "aria-live" }) ariaLive: "polite" | "assertive" | "off" = "polite";
    @property({ type: Boolean }) disabledAnnounceSelections = false;
    @state() private calendarId = `mjo-calendar-${Math.random().toString(36).substring(2, 9)}`;
    @state() private announcementText = "";

    @query("mjo-textfield") private textfield!: MjoTextfield;
    @query("mjo-dropdown") private dropdown!: MjoDropdown;

    type = "date";
    inputElement?: HTMLInputElement = undefined;

    #calendarRef = createRef<MjoCalendar>();
    #calendarInstanceId = 0;

    render() {
        const isOpen = this.dropdown?.isOpen ?? false;
        const computedAriaLabel = this.ariaLabel || this.label || (this.isRange ? "Date range picker" : "Date picker");

        return html`
            ${this.applyThemeSsr()}
            <div aria-live=${this.ariaLive} aria-atomic="true" class="sr-only" .textContent=${this.announcementText}></div>

            <mjo-dropdown
                behaviour="click"
                preventCloseOnInnerClick
                .suppressOpenSelectors=${[".clearabled", "[data-dropdown-noopen]"]}
                .html=${this.#calendarTemplate()}
            >
                <mjo-textfield
                    exportparts="
                        container: textfield-container,
                        input: textfield-input,
                        label-container: textfield-label-container,
                        label-truncate-container: textfield-label-truncate-container,
                        label-truncate-wrapper: textfield-label-truncate-wrapper,
                        prefix-text: textfield-prefix-text,
                        suffix-text: textfield-suffix-text,
                        start-icon-container: textfield-start-icon-container,
                        start-icon: textfield-start-icon,
                        end-icon-container: textfield-end-icon-container,
                        end-icon: textfield-end-icon,
                        start-image-container: textfield-start-image-container,
                        start-image: textfield-start-image,
                        end-image-container: textfield-end-image-container,
                        end-image: textfield-end-image
                        clear-button: textfield-clear-button
                        clear-icon: textfield-clear-icon
                        password-button: textfield-password-button
                        password-icon: textfield-password-icon
                        helper-text-container: textfield-helper-text-container
                        helper-text-typography: textfield-helper-text-typography
                        helper-text-error-message: textfield-helper-text-error-message
                        helper-text-success-message: textfield-helper-text-success-message
                        helper-text-icon: textfield-helper-text-icon
                        counter-container: textfield-counter-container
                        counter-text: textfield-counter-text
                    "
                    form-ignore
                    role="combobox"
                    aria-expanded=${isOpen ? "true" : "false"}
                    aria-haspopup="dialog"
                    aria-controls=${this.calendarId}
                    aria-label=${computedAriaLabel}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    value=${this.#displayValue()}
                    size=${this.size}
                    color=${this.color}
                    ?disabled=${this.disabled}
                    label=${this.label ?? ""}
                    placeholder=${this.placeholder ?? ""}
                    readonly
                    startIcon=${PiCalendarDotsLight}
                    ?clearabled=${this.clearabled}
                    @keydown=${this.#onKeydown}
                    @clear=${this.#handleClear}
                ></mjo-textfield>
            </mjo-dropdown>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    firstUpdated(args: PropertyValues): void {
        super.firstUpdated(args);

        if (this.name) this.updateFormData({ name: this.name, value: this.value });

        this.#setInputElement();
    }

    async #setInputElement() {
        const textfield = this.shadowRoot?.querySelector("mjo-textfield");
        if (textfield) {
            await textfield.updateComplete;
            this.inputElement = textfield.inputElement;
        }
    }

    focus() {
        this.textfield?.focus();
    }

    #handleClear() {
        this.clear();
    }

    #announceToScreenReader(message: string) {
        this.announcementText = message;
        // Clear the message after a brief delay to allow for re-announcement if needed
        setTimeout(() => {
            this.announcementText = "";
        }, 1000);
    }

    #formatDateForAnnouncement(date: Date): string {
        try {
            // Use a more verbose format for screen reader announcements
            const formatter = new Intl.DateTimeFormat(this.locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return formatter.format(date);
        } catch {
            // Fallback to a simple format if locale is not supported
            return date.toLocaleDateString(this.locale);
        }
    }

    clear() {
        if (this.disabled) return;

        this.value = "";

        this.#emitChange({ value: this.value });

        if (this.name) this.updateFormData({ name: this.name, value: this.value });

        this.#calendarRef.value?.reset();

        // Announce clearing to screen reader
        if (!this.disabledAnnounceSelections) {
            this.#announceToScreenReader(this.isRange ? "Date range cleared" : "Date cleared");
        }
    }

    openPicker() {
        if (this.disabled) return;

        this.dropdown.open();

        if (!this.disabledAnnounceSelections) {
            this.#announceToScreenReader(this.isRange ? "Date range picker opened" : "Date picker opened");
        }

        // Focus the calendar when opened with keyboard
        requestAnimationFrame(() => {
            if (this.#calendarRef.value) {
                this.#calendarRef.value.focus();
            }
        });
    }

    closePicker() {
        this.dropdown.close();

        if (!this.disabledAnnounceSelections) {
            this.#announceToScreenReader(this.isRange ? "Date range picker closed" : "Date picker closed");
        }

        // Restore focus to textfield
        this.textfield?.focus();
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
    }

    #calendarTemplate(): TemplateResult<1> {
        const resetKey = `${this.#calendarInstanceId}-${this.value || (this.isRange ? "range-empty" : "single-empty")}`;

        const startDate = this.isRange && this.value ? this.value.split("/")[0] : undefined;
        const endDate = this.isRange && this.value ? this.value.split("/")[1] : undefined;
        const value = !this.isRange && this.value ? this.value : undefined;

        return html`<div class="panel">
            <mjo-calendar
                exportparts="
                    calendar:calendar-container,
                    header:calendar-header,
                    navigation:calendar-navigation,
                    nav-button:calendar-nav-button,
                    selectors-container:calendar-selectors-container,
                    selector-button:calendar-selector-button,
                    calendar-grid:calendar-grid,
                    week-days-container:calendar-week-days-container,
                    week-day:calendar-week-day,
                    days-container:calendar-days-container,
                    day:calendar-day,
                    day-today:calendar-day-today,
                    day-selected:calendar-day-selected,
                    month-picker-container:calendar-month-picker-container,
                    month-picker-button:calendar-month-picker-button,
                    year-picker-container:calendar-year-picker-container,
                    year-picker-navigation:calendar-year-picker-navigation,
                    year-picker-nav-button:calendar-year-picker-nav-button,
                    year-picker-decade-label:calendar-year-picker-decade-label,
                    year-picker-grid:calendar-year-picker-grid,
                    year-picker-button:calendar-year-picker-button
                "
                ${ref(this.#calendarRef)}
                id=${this.calendarId}
                data-reset-key=${resetKey}
                mode=${this.isRange ? "range" : "single"}
                locale=${this.locale}
                size="small"
                color=${this.color}
                aria-label=${this.isRange ? "Date range calendar" : "Date selection calendar"}
                value=${ifDefined(value)}
                startDate=${ifDefined(startDate)}
                endDate=${ifDefined(endDate)}
                minDate=${ifDefined(this.minDate)}
                maxDate=${ifDefined(this.maxDate)}
                .disabledDates=${this.disabledDates}
                @mjo-calendar:date-selected=${this.#onDateSelected}
                @mjo-calendar:range-selected=${this.#onRangeSelected}
            ></mjo-calendar>
        </div>`;
    }

    #displayValue(): string {
        if (!this.value) return "";

        const format = (iso: string) => {
            if (this.displayMode === "iso") return iso;
            const [y, m, d] = iso.split("-").map((v) => Number(v));
            if (!y || !m || !d) return iso;
            try {
                const dtf = new Intl.DateTimeFormat(this.locale, { dateStyle: "medium" });
                return dtf.format(new Date(y, m - 1, d));
            } catch {
                return iso;
            }
        };

        if (!this.isRange) return format(this.value);

        const [start, end] = this.value.split("/");

        return `${format(start)} – ${format(end)}`;
    }

    #onDateSelected = (ev: CalendarDateSelectedEvent) => {
        const detail = ev.detail;

        if (this.isRange) return; // ignore single events in range mode

        if (detail.value) {
            this.value = detail.value;

            this.#emitChange({ value: this.value, date: detail.date });

            // Announce selection to screen reader
            if (!this.disabledAnnounceSelections && detail.date) {
                const formattedDate = this.#formatDateForAnnouncement(detail.date);
                this.#announceToScreenReader(`Selected ${formattedDate}`);
            }

            if (this.closeOnSelect) this.closePicker();
        }
    };

    #onRangeSelected = (ev: CalendarRangeSelectedEvent) => {
        if (!this.isRange) return;

        const detail = ev.detail;

        if (detail.startDateValue && detail.endDateValue) {
            const value = `${detail.startDateValue}/${detail.endDateValue}`;
            this.value = value;

            this.#emitChange({
                value,
                startDate: detail.startDate,
                endDate: detail.endDate,
                startDateValue: detail.startDateValue,
                endDateValue: detail.endDateValue,
            });

            // Announce range selection to screen reader
            if (!this.disabledAnnounceSelections && detail.startDate && detail.endDate) {
                const startFormatted = this.#formatDateForAnnouncement(detail.startDate);
                const endFormatted = this.#formatDateForAnnouncement(detail.endDate);
                this.#announceToScreenReader(`Selected date range from ${startFormatted} to ${endFormatted}`);
            }

            if (this.closeOnSelect) this.closePicker();
        }
    };

    #emitChange({
        value,
        date,
        startDate,
        endDate,
        startDateValue,
        endDateValue,
    }: {
        value: string;
        date?: Date;
        startDate?: Date;
        endDate?: Date;
        startDateValue?: string;
        endDateValue?: string;
    }) {
        if (this.name) this.updateFormData({ name: this.name, value });

        this.dispatchEvent(
            new CustomEvent("mjo-date-picker:change", {
                detail: {
                    value,
                    date,
                    startDate,
                    endDate,
                    startDateValue,
                    endDateValue,
                },
                bubbles: true,
                cancelable: true,
            }),
        );
    }

    #onKeydown = (ev: KeyboardEvent) => {
        if (this.disabled) return;

        const isOpen = this.dropdown?.isOpen ?? false;

        switch (ev.key) {
            case "Enter":
            case " ":
                ev.preventDefault();
                if (!isOpen) {
                    this.openPicker();
                }
                break;

            case "ArrowDown":
            case "ArrowUp":
                ev.preventDefault();
                if (!isOpen) {
                    this.openPicker();
                }
                break;

            case "Escape":
                if (isOpen) {
                    ev.preventDefault();
                    this.closePicker();
                }
                break;
        }
    };

    static styles = [
        css`
            :host {
                display: inline-block;
            }

            .panel {
                padding: var(--mjo-date-picker-panel-padding, var(--mjo-space-small, 8px));
                background: var(--mjo-date-picker-panel-background-color, var(--mjo-background-color));
                border-radius: var(--mjo-date-picker-panel-radius, var(--mjo-radius-medium, 8px));
                box-shadow: var(--mjo-date-picker-panel-box-shadow, var(--mjo-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.15)));
            }

            /* Screen reader only content */
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .panel {
                    border: var(--mjo-date-picker-high-contrast-border, 1px solid);
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-date-picker": MjoDatePicker;
    }

    interface HTMLElementEventMap {
        "mjo-date-picker:change": DatePickerChangeEvent;
    }
}
