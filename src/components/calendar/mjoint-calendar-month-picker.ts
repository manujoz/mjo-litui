import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * Month picker component for calendar
 * Displays a grid of months for selection
 *
 * @fires month-selected - Fired when a month is selected
 */
@customElement("mjoint-calendar-month-picker")
export class MjointCalendarMonthPicker extends LitElement {
    @property({ type: Number }) selectedMonth = new Date().getMonth();
    @property({ type: Array }) monthNames: string[] = [];
    @property({ type: Boolean }) disabled = false;

    @state() private focusedMonth = this.selectedMonth;

    render() {
        return html`
            <div
                class="month-picker"
                part="month-picker-container"
                ?data-disabled=${this.disabled}
                role="dialog"
                aria-label="Select month"
                @keydown=${this.#handleKeydown}
            >
                <div class="months-grid" part="month-picker-grid" role="grid" aria-label="Month selection grid">
                    ${this.monthNames.map(
                        (month, index) => html`
                            <button
                                class="month-button"
                                part="month-picker-button${index === this.selectedMonth ? " month-picker-button-selected" : ""}"
                                role="gridcell"
                                ?data-selected=${index === this.selectedMonth}
                                ?disabled=${this.disabled}
                                @click=${() => this.#selectMonth(index)}
                                tabindex=${this.disabled ? -1 : index === this.focusedMonth ? 0 : -1}
                                aria-label=${month}
                                aria-selected=${index === this.selectedMonth ? "true" : "false"}
                                @focus=${() => this.#setFocusedMonth(index)}
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

    #setFocusedMonth(month: number) {
        this.focusedMonth = month;
    }

    #handleKeydown(event: KeyboardEvent) {
        if (this.disabled) return;

        const key = event.key;
        let handled = false;

        switch (key) {
            case "ArrowLeft":
                this.#moveFocus(-1);
                handled = true;
                break;
            case "ArrowRight":
                this.#moveFocus(1);
                handled = true;
                break;
            case "ArrowUp":
                this.#moveFocus(-3);
                handled = true;
                break;
            case "ArrowDown":
                this.#moveFocus(3);
                handled = true;
                break;
            case "Home":
                this.#setFocusedMonth(0);
                handled = true;
                break;
            case "End":
                this.#setFocusedMonth(11);
                handled = true;
                break;
            case "Enter":
            case " ":
                this.#selectMonth(this.focusedMonth);
                handled = true;
                break;
            case "Escape":
                // Let parent handle escape
                break;
        }

        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    #moveFocus(delta: number) {
        let newFocus = this.focusedMonth + delta;
        if (newFocus < 0) newFocus = 11;
        if (newFocus > 11) newFocus = 0;
        this.#setFocusedMonth(newFocus);

        // Focus the appropriate button
        this.updateComplete.then(() => {
            const buttons = this.shadowRoot?.querySelectorAll("button");
            const targetButton = buttons?.[this.focusedMonth];
            targetButton?.focus();
        });
    }

    static styles = css`
        :host {
            display: block;
        }
        .month-picker {
            padding: var(--mjo-space-small);
            background: var(--mjo-calendar-picker-background, var(--mjo-calendar-background, var(--mjo-background-color, white)));
            border-radius: var(--mjo-calendar-picker-radius, var(--mjo-radius-medium, 8px));
            height: 100%;
            box-sizing: border-box;
        }
        .months-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }
        .month-button {
            background: var(--mjo-calendar-picker-button-background, transparent);
            border: var(--mjo-calendar-picker-button-border, 1px solid var(--mjoint-calendar-border-color));
            border-radius: var(--mjo-calendar-picker-button-radius, var(--mjo-radius-medium, 4px));
            color: var(--mjo-calendar-picker-button-color, var(--mjoint-calendar-color-foreground-low));
            cursor: pointer;
            font-family: inherit;
            font-size: 1.2em;
            padding: 12px 4px;
            box-sizing: border-box;
            transition: all 0.2s ease;
            min-height: 40px;
        }
        .month-button:hover:not(:disabled) {
            background: var(--mjo-calendar-picker-button-hover-background, var(--mjoint-calendar-accent-color-alpha));
            border-color: var(--mjo-calendar-picker-button-hover-border, var(--mjoint-calendar-accent-color));
        }
        .month-button:focus-visible {
            outline: 2px solid var(--mjo-calendar-picker-button-focus-outline, var(--mjoint-calendar-accent-color));
            outline-offset: 2px;
        }
        .month-button[data-selected]:not(:disabled) {
            background: var(--mjo-calendar-picker-button-selected-background, var(--mjoint-calendar-accent-color));
            border-color: var(--mjo-calendar-picker-button-selected-border, var(--mjoint-calendar-accent-color));
            color: var(--mjo-calendar-picker-button-selected-color, var(--mjoint-calendar-accent-color-foreground));
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
        "mjoint-calendar-month-picker": MjointCalendarMonthPicker;
    }
}
