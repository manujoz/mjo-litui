import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import { BiCalendarEvent } from "mjo-icons/bi";
import "./mjo-button.js";
import "./mjo-calendar.js";
import "./mjo-dropdown.js";
import { MjoDropdown } from "./mjo-dropdown.js";
import "./mjo-textfield.js";
import { MjoTextfield } from "./mjo-textfield.js";
import { CalendarDateSelectedEvent, CalendarRangeSelectedEvent } from "./types/mjo-calendar";

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
    /**
     * Controls how the selected value is displayed.
     *  - "iso": raw ISO string(s)
     *  - "localized": Intl.DateTimeFormat with dateStyle medium for locale
     */
    @property({ type: String }) displayMode: "iso" | "localized" = "iso";

    // internal open state removed; rely on dropdown.isOpen when needed
    private calendarInstanceId = 0; // forces remount of calendar when cleared

    @query("mjo-textfield") private textfield!: MjoTextfield;
    @query("mjo-dropdown") private dropdown!: MjoDropdown;

    connectedCallback(): void {
        super.connectedCallback();
    }

    protected firstUpdated(): void {
        // Ensure form mixin registration (call any inherited firstUpdated in mixin chain)
        if (typeof super.firstUpdated === "function") (super.firstUpdated as (...args: unknown[]) => unknown).call(this);
        this.#syncTextfield();
        // Initialize form value if name is provided
        if (this.name) this.updateFormData({ name: this.name, value: this.value });
    }

    protected updated(changed: Map<PropertyKey, unknown>): void {
        if (changed.has("value")) this.#syncTextfield();
    }

    focus() {
        this.textfield?.focus();
    }

    clear() {
        if (this.disabled) return;
        this.value = "";
        this.#emitChange();
        // Mantener panel abierto si estaba abierto en modo range para permitir nueva selección inmediata
        if (this.isRange && this.dropdown?.isOpen) {
            this.requestUpdate();
        }
        if (this.name) this.updateFormData({ name: this.name, value: this.value });
        // Hard reset internal calendar component (visual + state)
        const localCalendar = this.renderRoot?.querySelector("mjo-calendar") as { resetSelection?: () => void; reset?: () => void } | null;
        const portalCalendar = this.dropdown?.dropdownContainer?.querySelector("mjo-calendar") as { resetSelection?: () => void; reset?: () => void } | null;
        const calendar = portalCalendar || localCalendar;
        if (calendar) {
            if (typeof calendar.reset === "function") calendar.reset();
            else if (typeof calendar.resetSelection === "function") calendar.resetSelection();
            else this.calendarInstanceId++;
        } else {
            this.calendarInstanceId++;
        }
        requestAnimationFrame(() => this.requestUpdate());
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

    #syncTextfield() {
        if (!this.textfield) return;
        this.textfield.value = this.#displayValue();
        this.textfield.name = this.name;
        this.textfield.readonly = true;
        this.textfield.label = this.label;
        this.textfield.placeholder = this.placeholder;
        this.textfield.size = this.size;
        this.textfield.color = this.color;
        this.textfield.disabled = this.disabled;
        this.textfield.clearabled = this.clearabled;
    }

    #displayValue(): string {
        if (!this.value) return "";
        const format = (iso: string) => {
            if (this.displayMode === "iso") return iso;
            // localized
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

    #onDateSelected = (ev: Event) => {
        const detail = (ev as CalendarDateSelectedEvent).detail;
        if (this.isRange) return; // ignore single events in range mode
        if (detail.dateString) {
            this.value = detail.dateString;
            this.#emitChange(detail.dateString, detail.date);
            if (this.closeOnSelect) this.closePicker();
        }
    };

    #onRangeSelected = (ev: Event) => {
        if (!this.isRange) return;
        const detail = (ev as CalendarRangeSelectedEvent).detail;
        if (detail.startDateString && detail.endDateString) {
            const combined = `${detail.startDateString}/${detail.endDateString}`;
            this.value = combined;
            this.#emitChange(combined, detail.startDate, detail.endDate);
            if (this.closeOnSelect) this.closePicker();
        }
    };

    #emitChange(value: string = this.value, date?: Date, endDate?: Date) {
        if (this.name) this.updateFormData({ name: this.name, value });
        this.dispatchEvent(
            new CustomEvent("date-picker-change", {
                detail: {
                    value,
                    date,
                    startDate: date,
                    endDate,
                    startDateString: value.includes("/") ? value.split("/")[0] : value,
                    endDateString: value.includes("/") ? value.split("/")[1] : undefined,
                },
                bubbles: true,
                cancelable: true,
            }),
        );
        this.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    }

    // Toggle eliminado: se prefiere control explícito via behaviour click del dropdown y teclado

    #onOpen = () => {};
    #onClose = () => {};

    #onKeydown = (ev: KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            this.openPicker();
        }
    };

    #calendarTemplate(): TemplateResult {
        const resetKey = `${this.calendarInstanceId}-${this.value || (this.isRange ? "range-empty" : "single-empty")}`;
        return html`<div class="panel">
            <mjo-calendar
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
            ${this.clearabled && this.value
                ? html`<div class="dp-footer">
                      <mjo-button
                          size="small"
                          variant="flat"
                          @click=${(e: Event) => {
                              e.stopPropagation();
                              this.clear();
                          }}
                          >Clear</mjo-button
                      >
                  </div>`
                : null}
        </div>`;
    }

    render() {
        return html`<mjo-dropdown
            behaviour="click"
            .closeOnInnerClick=${false}
            .suppressOpenSelectors=${[".clearabled", "[data-dropdown-noopen]"]}
            @open=${this.#onOpen}
            @close=${this.#onClose}
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
                startIcon=${BiCalendarEvent}
                @keydown=${this.#onKeydown}
            ></mjo-textfield>
        </mjo-dropdown>`;
    }

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
            .dp-footer {
                margin-top: var(--mjo-space-xsmall, 4px);
                text-align: right;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-date-picker": MjoDatePicker;
    }
}
