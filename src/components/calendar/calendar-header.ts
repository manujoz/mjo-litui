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

    render() {
        return html`
            <div class="calendar-header" part="header">
                <div class="navigation" part="navigation">
                    ${this.side === "single" || this.side === "left"
                        ? html`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${FaChevronLeft}
                                  @click=${this.#handlePrevious}
                                  ?disabled=${this.disabled}
                              ></mjo-button>
                          `
                        : nothing}

                    <div class="month-year-selectors" part="month-year">
                        <mjo-button variant="text" @click=${this.#handleMonthClick} ?disabled=${this.disabled}>
                            <mjo-typography tag="none">${this.monthNames[this.month]}</mjo-typography>
                        </mjo-button>
                        <mjo-button variant="text" @click=${this.#handleYearClick} ?disabled=${this.disabled}>
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
