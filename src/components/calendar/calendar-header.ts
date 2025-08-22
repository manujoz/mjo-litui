import { CalendarHeaderSide } from "../../types/mjo-calendar.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { FaChevronLeft, FaChevronRight } from "mjo-icons/fa";

import "../../mjo-button.js";
import "../../mjo-typography.js";

/**
 * Calendar header with navigation controls
 */
@customElement("calendar-header")
export class CalendarHeader extends LitElement {
    @property({ type: Number }) month!: number;
    @property({ type: Number }) year!: number;
    @property({ type: String }) side: CalendarHeaderSide = "single";
    @property({ type: Array }) monthNames!: string[];
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) monthPickerOpen = false;
    @property({ type: Boolean }) yearPickerOpen = false;

    get previousMonthLabel() {
        if (!this.monthNames || !Array.isArray(this.monthNames) || this.monthNames.length < 12) {
            return "Previous month";
        }
        const prevMonth = new Date(this.year, this.month - 1, 1);
        const monthIndex = prevMonth.getMonth();
        if (monthIndex < 0 || monthIndex >= this.monthNames.length || !this.monthNames[monthIndex]) {
            return "Previous month";
        }
        return `Go to ${this.monthNames[monthIndex]} ${prevMonth.getFullYear()}`;
    }

    get nextMonthLabel() {
        if (!this.monthNames || !Array.isArray(this.monthNames) || this.monthNames.length < 12) {
            return "Next month";
        }
        const nextMonth = new Date(this.year, this.month + 1, 1);
        const monthIndex = nextMonth.getMonth();
        if (monthIndex < 0 || monthIndex >= this.monthNames.length || !this.monthNames[monthIndex]) {
            return "Next month";
        }
        return `Go to ${this.monthNames[monthIndex]} ${nextMonth.getFullYear()}`;
    }

    get currentMonthYearLabel() {
        if (!this.monthNames || !Array.isArray(this.monthNames) || this.monthNames.length < 12) {
            return `Month ${this.month + 1} ${this.year}`;
        }
        if (this.month < 0 || this.month >= this.monthNames.length || !this.monthNames[this.month]) {
            return `Month ${this.month + 1} ${this.year}`;
        }
        return `${this.monthNames[this.month]} ${this.year}`;
    }

    render() {
        return html`
            <div class="calendar-header" part="header" role="banner">
                <div class="navigation" part="navigation" role="toolbar" aria-label="Calendar navigation">
                    ${this.side === "single" || this.side === "left"
                        ? html`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${FaChevronLeft}
                                  @click=${this.#handlePrevious}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.previousMonthLabel}
                                  title=${this.previousMonthLabel}
                              ></mjo-button>
                          `
                        : nothing}

                    <div class="month-year-selectors" part="month-year" role="group" aria-label=${this.currentMonthYearLabel}>
                        <mjo-button
                            variant="text"
                            @click=${this.#handleMonthClick}
                            ?disabled=${this.disabled}
                            aria-label="Select month"
                            aria-expanded=${this.monthPickerOpen ? "true" : "false"}
                        >
                            <mjo-typography tag="none">
                                ${this.monthNames && Array.isArray(this.monthNames) && this.monthNames[this.month]
                                    ? this.monthNames[this.month]
                                    : `Month ${this.month + 1}`}
                            </mjo-typography>
                        </mjo-button>
                        <mjo-button
                            variant="text"
                            @click=${this.#handleYearClick}
                            ?disabled=${this.disabled}
                            aria-label="Select year"
                            aria-expanded=${this.yearPickerOpen ? "true" : "false"}
                        >
                            <mjo-typography tag="none">${this.year}</mjo-typography>
                        </mjo-button>
                    </div>

                    ${this.side === "single" || this.side === "right"
                        ? html`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${FaChevronRight}
                                  @click=${this.#handleNext}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.nextMonthLabel}
                                  title=${this.nextMonthLabel}
                              ></mjo-button>
                          `
                        : nothing}
                </div>
            </div>
        `;
    }

    #handlePrevious() {
        this.dispatchEvent(
            new CustomEvent("navigate", {
                detail: { direction: -1, side: this.side },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleNext() {
        this.dispatchEvent(
            new CustomEvent("navigate", {
                detail: { direction: 1, side: this.side },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleMonthClick() {
        this.dispatchEvent(
            new CustomEvent("month-picker", {
                detail: { side: this.side },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleYearClick() {
        this.dispatchEvent(
            new CustomEvent("year-picker", {
                detail: { side: this.side },
                bubbles: true,
                composed: true,
            }),
        );
    }

    static styles = css`
        .calendar-header {
            margin-bottom: 16px;
            font-size: 1.3em;
        }

        .navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            min-width: max-content;
            --mjo-button-disabled-background-color: transparent;
        }

        .month-year-selectors {
            display: flex;
            align-items: center;
            gap: 4px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "calendar-header": CalendarHeader;
    }
}
