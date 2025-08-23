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
import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import { ifDefined } from "lit/directives/if-defined.js";
import "./mjo-button.js";
import "./mjo-calendar.js";
import "./mjo-dropdown.js";
import "./mjo-textfield.js";

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

    // Accessibility properties
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;
    @property({ type: String, attribute: "aria-live" }) ariaLive: "polite" | "assertive" | "off" = "polite";
    @property({ type: Boolean }) disabledAnnounceSelections = false;

    // State for accessibility
    @state() private calendarId = `mjo-calendar-${Math.random().toString(36).substring(2, 9)}`;
    @state() private announcementText = "";

    // internal open state removed; rely on dropdown.isOpen when needed
    private calendarInstanceId = 0;

    @query("mjo-textfield") private textfield!: MjoTextfield;
    @query("mjo-dropdown") private dropdown!: MjoDropdown;

    calendarRef = createRef<MjoCalendar>();
    type = "date";
    inputElement?: HTMLInputElement = undefined;

    render() {
        const isOpen = this.dropdown?.isOpen ?? false;
        const computedAriaLabel = this.ariaLabel || this.label || (this.isRange ? "Date range picker" : "Date picker");

        return html`
            <!-- Accessibility announcements region -->
            <div aria-live=${this.ariaLive} aria-atomic="true" class="sr-only" .textContent=${this.announcementText}></div>

            <mjo-dropdown
                behaviour="click"
                preventCloseOnInnerClick
                .suppressOpenSelectors=${[".clearabled", "[data-dropdown-noopen]"]}
                .html=${this.#calendarTemplate()}
            >
                <mjo-textfield
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

        this.calendarRef.value?.reset();

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
            if (this.calendarRef.value) {
                this.calendarRef.value.focus();
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
        const resetKey = `${this.calendarInstanceId}-${this.value || (this.isRange ? "range-empty" : "single-empty")}`;

        const startDate = this.isRange && this.value ? this.value.split("/")[0] : undefined;
        const endDate = this.isRange && this.value ? this.value.split("/")[1] : undefined;
        const value = !this.isRange && this.value ? this.value : undefined;

        return html`<div class="panel">
            <mjo-calendar
                ${ref(this.calendarRef)}
                id=${this.calendarId}
                data-reset-key=${resetKey}
                mode=${this.isRange ? "range" : "single"}
                locale=${this.locale}
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
                border-radius: var(--mjo-date-picker-panel-radius, var(--mjo-radius, 8px));
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
