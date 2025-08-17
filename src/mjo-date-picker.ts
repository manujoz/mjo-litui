import type { MjoCalendar } from "./mjo-calendar.js";
import type { MjoDropdown } from "./mjo-dropdown.js";
import type { MjoTextfield } from "./mjo-textfield.js";
import { CalendarDateSelectedEvent, CalendarRangeSelectedEvent } from "./types/mjo-calendar";

import { css, html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { createRef, ref } from "lit/directives/ref.js";
import { PiCalendarDotsLight } from "mjo-icons/pi";
import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-button.js";
import "./mjo-calendar.js";
import "./mjo-dropdown.js";
import "./mjo-textfield.js";

@customElement("mjo-date-picker")
export class MjoDatePicker extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IInputErrorMixin, IFormMixin, IThemeMixin {
    @property({ type: String }) name?: string;
    @property({ type: String }) value: string = ""; // single: YYYY-MM-DD, range: YYYY-MM-DD/YYYY-MM-DD
    @property({ type: Boolean, attribute: "range" }) isRange = false;
    @property({ type: String }) locale: string = "en";
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

    // internal open state removed; rely on dropdown.isOpen when needed
    private calendarInstanceId = 0;

    @query("mjo-textfield") private textfield!: MjoTextfield;
    @query("mjo-dropdown") private dropdown!: MjoDropdown;

    calendarRef = createRef<MjoCalendar>();

    render() {
        return html`<mjo-dropdown
            behaviour="click"
            preventCloseOnInnerClick
            .suppressOpenSelectors=${[".clearabled", "[data-dropdown-noopen]"]}
            .html=${this.#calendarTemplate()}
        >
            <mjo-textfield
                form-ignore
                .value=${this.#displayValue()}
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
        </mjo-dropdown>`;
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    firstUpdated(args: PropertyValues): void {
        super.firstUpdated(args);

        if (this.name) this.updateFormData({ name: this.name, value: this.value });
    }

    focus() {
        this.textfield?.focus();
    }

    #handleClear() {
        this.clear();
    }

    clear() {
        if (this.disabled) return;

        this.value = "";

        this.#emitChange({ value: this.value });

        if (this.name) this.updateFormData({ name: this.name, value: this.value });

        this.calendarRef.value?.reset();
    }

    openPicker() {
        if (this.disabled) return;

        this.dropdown.open();
    }

    closePicker() {
        this.dropdown.close();
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
    }

    #calendarTemplate(): TemplateResult {
        const resetKey = `${this.calendarInstanceId}-${this.value || (this.isRange ? "range-empty" : "single-empty")}`;

        return html`<div class="panel">
            <mjo-calendar
                ${ref(this.calendarRef)}
                data-reset-key=${resetKey}
                mode=${this.isRange ? "range" : "single"}
                locale=${this.locale}
                .value=${!this.isRange && this.value ? this.value : undefined}
                .startDate=${this.isRange && this.value ? this.value.split("/")[0] : undefined}
                .endDate=${this.isRange && this.value ? this.value.split("/")[1] : undefined}
                .minDate=${this.minDate}
                .maxDate=${this.maxDate}
                .disabledDates=${this.disabledDates}
                @date-selected=${this.#onDateSelected}
                @range-selected=${this.#onRangeSelected}
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
            new CustomEvent("date-picker-change", {
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

        this.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    }

    #onKeydown = (ev: KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            this.openPicker();
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
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-date-picker": MjoDatePicker;
    }
}
