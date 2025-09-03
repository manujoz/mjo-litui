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
            <div class="month-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select month" @keydown=${this.#handleKeydown}>
                <div class="months-grid" role="grid" aria-label="Month selection grid">
                    ${this.monthNames.map(
                        (month, index) => html`
                            <button
                                class="month-button"
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
        }

        .months-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }

        .month-button {
            background: var(--mjo-calendar-picker-button-background, transparent);
            border: var(--mjo-calendar-picker-button-border, 1px solid var(--mjo-border-color, #e0e0e0));
            border-radius: var(--mjo-calendar-picker-button-radius, var(--mjo-radius-medium, 4px));
            color: var(--mjo-calendar-picker-button-color, var(--mjo-foreground-color-low, #333));
            cursor: pointer;
            font-family: inherit;
            font-size: 1.2em;
            padding: 12px 4px;
            box-sizing: border-box;
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

        .month-button[data-selected]:not(:disabled) {
            background: var(--mjo-calendar-picker-button-selected-background, var(--mjo-primary-color, #4c81c9));
            border-color: var(--mjo-calendar-picker-button-selected-border, var(--mjo-primary-color, #4c81c9));
            color: var(--mjo-calendar-picker-button-selected-color, var(--mjo-primary-foreground-color, white));
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
