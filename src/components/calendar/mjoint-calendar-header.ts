import { MjoCalendarHeaderSide } from "../../types/mjo-calendar.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { FaChevronLeft, FaChevronRight } from "mjo-icons/fa";

import "../../mjo-button.js";
import "../../mjo-icon.js";
import "../../mjo-typography.js";

/**
 * Calendar header with navigation controls
 */
@customElement("mjoint-calendar-header")
export class MjointCalendarHeader extends LitElement {
    @property({ type: Number }) month!: number;
    @property({ type: Number }) year!: number;
    @property({ type: String }) side: MjoCalendarHeaderSide = "single";
    @property({ type: Array }) monthNames!: string[];
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) monthPickerOpen = false;
    @property({ type: Boolean }) yearPickerOpen = false;

    render() {
        return html`
            <div class="calendar-header" part="header" role="banner">
                <div class="navigation" part="navigation" role="toolbar" aria-label="Calendar navigation">
                    ${this.side === "single" || this.side === "left"
                        ? html`
                              <button
                                  class="nav-button"
                                  part="nav-button"
                                  ?disabled=${this.disabled}
                                  aria-label=${this.#previousMonthLabel}
                                  tabindex=${this.disabled ? -1 : 0}
                                  title=${this.#previousMonthLabel}
                                  @click=${this.#handlePrevious}
                              >
                                  <mjo-icon src=${FaChevronLeft}></mjo-icon>
                              </button>
                          `
                        : nothing}

                    <div class="month-year-selectors" part="selectors-container" role="group" aria-label=${this.#currentMonthYearLabel}>
                        <button
                            class="selector-button"
                            part="selector-button"
                            ?disabled=${this.disabled}
                            tabindex=${this.disabled ? -1 : 0}
                            aria-label="Select month"
                            aria-expanded=${this.monthPickerOpen ? "true" : "false"}
                            @click=${this.#handleMonthClick}
                        >
                            <mjo-typography tag="none">
                                ${this.monthNames && Array.isArray(this.monthNames) && this.monthNames[this.month]
                                    ? this.monthNames[this.month]
                                    : `Month ${this.month + 1}`}
                            </mjo-typography>
                        </button>
                        <button
                            class="selector-button"
                            part="selector-button"
                            ?disabled=${this.disabled}
                            tabindex=${this.disabled ? -1 : 0}
                            aria-label="Select year"
                            aria-expanded=${this.yearPickerOpen ? "true" : "false"}
                            @click=${this.#handleYearClick}
                        >
                            <mjo-typography tag="none">${this.year}</mjo-typography>
                        </button>
                    </div>

                    ${this.side === "single" || this.side === "right"
                        ? html`
                              <button
                                  class="nav-button"
                                  part="nav-button"
                                  ?disabled=${this.disabled}
                                  aria-label=${this.#nextMonthLabel}
                                  title=${this.#nextMonthLabel}
                                  @click=${this.#handleNext}
                              >
                                  <mjo-icon src=${FaChevronRight}></mjo-icon>
                              </button>
                          `
                        : nothing}
                </div>
            </div>
        `;
    }

    get #previousMonthLabel() {
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

    get #nextMonthLabel() {
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

    get #currentMonthYearLabel() {
        if (!this.monthNames || !Array.isArray(this.monthNames) || this.monthNames.length < 12) {
            return `Month ${this.month + 1} ${this.year}`;
        }
        if (this.month < 0 || this.month >= this.monthNames.length || !this.monthNames[this.month]) {
            return `Month ${this.month + 1} ${this.year}`;
        }
        return `${this.monthNames[this.month]} ${this.year}`;
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
        .nav-button {
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            font-size: 1em;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.8em;
            aspect-ratio: 1 / 1;
            border: var(--mjo-calendar-nav-button-border, solid 1px var(--mjoint-calendar-accent-color));
            color: var(--mjo-calendar-nav-button-color, var(--mjoint-calendar-accent-color));
            cursor: pointer;
            transition: background-color 0.2s ease;
            font-family: inherit;
        }
        .month-year-selectors {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .selector-button {
            background: none;
            border: none;
            padding: 5px 8px;
            margin: 0;
            font-size: 1em;
            font-family: inherit;
            border-radius: var(--mjo-radius-medium, 6px);
            display: flex;
            align-items: center;
            color: var(--mjo-calendar-selector-button-color, var(--mjoint-calendar-color-foreground));
            cursor: pointer;
        }
        .nav-button:hover:not(:disabled),
        .selector-button:hover:not(:disabled) {
            background-color: var(--mjo-calendar-selector-button-highlight-color, var(--mjoint-calendar-highlight-color));
        }
        .nav-button:focus-visible,
        .selector-button:focus-visible {
            outline: 2px solid var(--mjo-calendar-nav-button-color, var(--mjoint-calendar-accent-color));
            outline-offset: 2px;
        }
        .nav-button:disabled,
        .selector-button:disabled {
            background-color: transparent;
            color: var(--mjoint-calendar-disabled-color-foreground);
            border-color: var(--mjoint-calendar-disabled-color-foreground);
            cursor: not-allowed;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-calendar-header": MjointCalendarHeader;
    }
}
