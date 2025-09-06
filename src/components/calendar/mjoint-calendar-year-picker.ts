import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * Year picker component for calendar
 * Displays a grid of years for selection with navigation
 *
 * @fires year-selected - Fired when a year is selected
 */
@customElement("mjoint-calendar-year-picker")
export class MjointCalendarYearPicker extends LitElement {
    @property({ type: Number }) selectedYear = new Date().getFullYear();
    @property({ type: Boolean }) disabled = false;
    @property({ type: Number }) minYear?: number;
    @property({ type: Number }) maxYear?: number;

    @state() private startYear = Math.floor(new Date().getFullYear() / 10) * 10;
    @state() private focusedYear = new Date().getFullYear();

    get years() {
        const years = [];
        for (let i = this.startYear; i < this.startYear + 12; i++) {
            years.push(i);
        }
        return years;
    }

    get previousDecadeLabel() {
        return `${this.startYear - 10} - ${this.startYear - 1}`;
    }

    get nextDecadeLabel() {
        return `${this.startYear + 12} - ${this.startYear + 21}`;
    }

    render() {
        return html`
            <div class="year-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select year" @keydown=${this.#handleKeydown}>
                <div class="year-navigation">
                    <button
                        class="nav-button"
                        ?disabled=${this.disabled}
                        @click=${this.#previousDecade}
                        tabindex=${this.disabled ? -1 : 0}
                        title="Previous decade: ${this.previousDecadeLabel}"
                        aria-label="Previous decade: ${this.previousDecadeLabel}"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <span class="decade-label">${this.startYear} - ${this.startYear + 11}</span>
                    <button
                        class="nav-button"
                        ?disabled=${this.disabled}
                        tabindex=${this.disabled ? -1 : 0}
                        @click=${this.#nextDecade}
                        title="Next decade: ${this.nextDecadeLabel}"
                        aria-label="Next decade: ${this.nextDecadeLabel}"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                </div>
                <div class="years-grid" role="grid" aria-label="Year selection grid">
                    ${this.years.map(
                        (year) => html`
                            <button
                                class="year-button"
                                role="gridcell"
                                ?data-selected=${year === this.selectedYear}
                                ?disabled=${this.disabled || this.#isYearDisabled(year)}
                                @click=${() => this.#selectYear(year)}
                                tabindex=${this.disabled || this.#isYearDisabled(year) ? -1 : year === this.focusedYear ? 0 : -1}
                                aria-label=${year.toString()}
                                aria-selected=${year === this.selectedYear ? "true" : "false"}
                                @focus=${() => this.#setFocusedYear(year)}
                            >
                                ${year}
                            </button>
                        `,
                    )}
                </div>
            </div>
        `;
    }

    #isYearDisabled(year: number): boolean {
        if (this.minYear && year < this.minYear) return true;

        if (this.maxYear && year > this.maxYear) return true;

        return false;
    }

    #selectYear(year: number) {
        if (this.disabled || this.#isYearDisabled(year)) return;

        this.selectedYear = year;

        this.dispatchEvent(
            new CustomEvent("year-selected", {
                detail: { year },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #previousDecade() {
        if (this.disabled) return;

        this.startYear -= 12;
    }

    #nextDecade() {
        if (this.disabled) return;

        this.startYear += 12;
    }

    #setFocusedYear(year: number) {
        this.focusedYear = year;
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
                this.#moveFocus(-4);
                handled = true;
                break;
            case "ArrowDown":
                this.#moveFocus(4);
                handled = true;
                break;
            case "Home":
                this.#setFocusedYear(this.startYear);
                handled = true;
                break;
            case "End":
                this.#setFocusedYear(this.startYear + 11);
                handled = true;
                break;
            case "PageUp":
                this.#previousDecade();
                this.#setFocusedYear(Math.max(this.startYear, this.focusedYear - 12));
                handled = true;
                break;
            case "PageDown":
                this.#nextDecade();
                this.#setFocusedYear(Math.min(this.startYear + 11, this.focusedYear + 12));
                handled = true;
                break;
            case "Enter":
            case " ":
                if (!this.#isYearDisabled(this.focusedYear)) {
                    this.#selectYear(this.focusedYear);
                    handled = true;
                }
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
        let newFocus = this.focusedYear + delta;

        // Keep focus within current decade
        if (newFocus < this.startYear) newFocus = this.startYear;
        if (newFocus > this.startYear + 11) newFocus = this.startYear + 11;

        this.#setFocusedYear(newFocus);

        // Focus the appropriate button
        this.updateComplete.then(() => {
            const buttons = this.shadowRoot?.querySelectorAll(".year-button");
            const yearIndex = newFocus - this.startYear;
            const targetButton = buttons?.[yearIndex] as HTMLButtonElement;
            targetButton?.focus();
        });
    }

    static styles = css`
        :host {
            display: block;
        }
        .year-picker {
            padding: var(--mjo-space-medium, 8px) var(--mjo-space-small, 4px);
        }
        .year-navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            padding: 0 8px;
        }
        .nav-button {
            background: var(--mjo-calendar-nav-background, transparent);
            border: var(--mjo-calendar-nav-border, 1px solid var(--mjoint-calendar-border-color));
            border-radius: var(--mjo-calendar-nav-radius, var(--mjo-radius-medium, 4px));
            color: var(--mjo-calendar-nav-color, var(--mjoint-calendar-color-foreground));
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: inherit;
            height: 32px;
            width: 32px;
            transition: all 0.2s ease;
        }
        .nav-button:hover:not(:disabled) {
            background: var(--mjo-calendar-nav-hover-background, var(--mjoint-calendar-accent-color-alpha));
            border-color: var(--mjo-calendar-nav-hover-border, var(--mjoint-calendar-accent-color));
        }
        .nav-button:focus-visible {
            outline: 2px solid var(--mjo-calendar-nav-focus-outline, var(--mjoint-calendar-accent-color));
            outline-offset: 2px;
        }
        .nav-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
        .decade-label {
            font-weight: 500;
            color: var(--mjo-calendar-decade-label-color, var(--mjoint-calendar-color-foreground));
            font-size: 1.5em;
        }
        .years-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }
        .year-button {
            background: var(--mjo-calendar-picker-button-background, transparent);
            border: var(--mjo-calendar-picker-button-border, 1px solid var(--mjoint-calendar-border-color));
            border-radius: var(--mjo-calendar-picker-button-radius, var(--mjo-radius-medium, 4px));
            color: var(--mjo-calendar-picker-button-color, var(--mjoint-calendar-color-foreground-low));
            cursor: pointer;
            font-family: inherit;
            font-size: 1.3em;
            padding: 12px 8px;
            transition: all 0.2s ease;
            min-height: 40px;
        }
        .year-button:hover:not(:disabled) {
            background: var(--mjo-calendar-picker-button-hover-background, var(--mjoint-calendar-accent-color-alpha));
            border-color: var(--mjo-calendar-picker-button-hover-border, var(--mjoint-calendar-accent-color));
        }
        .year-button:focus-visible {
            outline: 2px solid var(--mjo-calendar-picker-button-focus-outline, var(--mjoint-calendar-accent-color));
            outline-offset: 2px;
        }
        .year-button[data-selected]:not(:disabled) {
            background: var(--mjo-calendar-picker-button-selected-background, var(--mjoint-calendar-accent-color));
            border-color: var(--mjo-calendar-picker-button-selected-border, var(--mjoint-calendar-accent-color));
            color: var(--mjo-calendar-picker-button-selected-color, var(--mjoint-calendar-accent-color-foreground));
        }
        .year-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
        .year-picker[data-disabled] {
            pointer-events: none;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-calendar-year-picker": MjointCalendarYearPicker;
    }
}
