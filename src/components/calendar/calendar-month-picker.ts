import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Month picker component for calendar
 * Displays a grid of months for selection
 *
 * @fires month-selected - Fired when a month is selected
 */
@customElement("calendar-month-picker")
export class CalendarMonthPicker extends LitElement {
    @property({ type: Number }) selectedMonth = new Date().getMonth();
    @property({ type: Array }) monthNames: string[] = [];
    @property({ type: Boolean }) disabled = false;

    render() {
        return html`
            <div class="month-picker" ?data-disabled=${this.disabled}>
                <div class="months-grid">
                    ${this.monthNames.map(
                        (month, index) => html`
                            <button
                                class="month-button"
                                ?data-selected=${index === this.selectedMonth}
                                ?disabled=${this.disabled}
                                @click=${() => this.#selectMonth(index)}
                                tabindex=${this.disabled ? -1 : 0}
                            >
                                ${month}
                            </button>
                        `,
                    )}
                </div>
            </div>
        `;
    }

    #selectMonth(month: number) {
        if (this.disabled) return;

        this.selectedMonth = month;
        this.dispatchEvent(
            new CustomEvent("month-selected", {
                detail: { month },
                bubbles: true,
                composed: true,
            }),
        );
    }

    static styles = css`
        :host {
            display: block;
        }

        .month-picker {
            padding: 16px;
        }

        .months-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }

        .month-button {
            background: var(--mjo-calendar-picker-button-background, transparent);
            border: var(--mjo-calendar-picker-button-border, 1px solid var(--mjo-border-color, #e0e0e0));
            border-radius: var(--mjo-calendar-picker-button-radius, var(--mjo-radius, 4px));
            color: var(--mjo-calendar-picker-button-color, var(--mjo-text-color, #333));
            cursor: pointer;
            font-family: inherit;
            font-size: 0.875rem;
            padding: 12px 8px;
            transition: all 0.2s ease;
            min-height: 40px;
        }

        .month-button:hover:not(:disabled) {
            background: var(--mjo-calendar-picker-button-hover-background, var(--mjo-primary-color-alpha2, rgba(76, 129, 201, 0.1)));
            border-color: var(--mjo-calendar-picker-button-hover-border, var(--mjo-primary-color, #4c81c9));
        }

        .month-button:focus {
            outline: 2px solid var(--mjo-calendar-picker-button-focus-outline, var(--mjo-primary-color, #4c81c9));
            outline-offset: 2px;
        }

        .month-button[data-selected] {
            background: var(--mjo-calendar-picker-button-selected-background, var(--mjo-primary-color, #4c81c9));
            border-color: var(--mjo-calendar-picker-button-selected-border, var(--mjo-primary-color, #4c81c9));
            color: var(--mjo-calendar-picker-button-selected-color, white);
        }

        .month-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        .month-picker[data-disabled] {
            pointer-events: none;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "calendar-month-picker": CalendarMonthPicker;
    }
}
