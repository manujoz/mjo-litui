import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * Year picker component for calendar
 * Displays a grid of years for selection with navigation
 *
 * @fires year-selected - Fired when a year is selected
 */
@customElement("calendar-year-picker")
export class CalendarYearPicker extends LitElement {
    @property({ type: Number }) selectedYear = new Date().getFullYear();
    @property({ type: Boolean }) disabled = false;
    @property({ type: Number }) minYear?: number;
    @property({ type: Number }) maxYear?: number;

    @state() private startYear = Math.floor(new Date().getFullYear() / 10) * 10;

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
            <div class="year-picker" ?data-disabled=${this.disabled}>
                <div class="year-navigation">
                    <button class="nav-button" ?disabled=${this.disabled} @click=${this.#previousDecade} title="Previous decade: ${this.previousDecadeLabel}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <span class="decade-label">${this.startYear} - ${this.startYear + 11}</span>
                    <button class="nav-button" ?disabled=${this.disabled} @click=${this.#nextDecade} title="Next decade: ${this.nextDecadeLabel}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                </div>
                <div class="years-grid">
                    ${this.years.map(
                        (year) => html`
                            <button
                                class="year-button"
                                ?data-selected=${year === this.selectedYear}
                                ?disabled=${this.disabled || this.#isYearDisabled(year)}
                                @click=${() => this.#selectYear(year)}
                                tabindex=${this.disabled || this.#isYearDisabled(year) ? -1 : 0}
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

    static styles = css`
        :host {
            display: block;
        }

        .year-picker {
            padding: var(--mjo-space-medium) var(--mjo-space-small);
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
            border: var(--mjo-calendar-nav-border, 1px solid var(--mjo-border-color, #e0e0e0));
            border-radius: var(--mjo-calendar-nav-radius, var(--mjo-radius, 4px));
            color: var(--mjo-calendar-nav-color, var(--mjo-foreground-color, #333));
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
            background: var(--mjo-calendar-nav-hover-background, var(--mjo-primary-color-alpha2, rgba(76, 129, 201, 0.1)));
            border-color: var(--mjo-calendar-nav-hover-border, var(--mjo-primary-color, #4c81c9));
        }

        .nav-button:focus {
            outline: 2px solid var(--mjo-calendar-nav-focus-outline, var(--mjo-primary-color, #4c81c9));
            outline-offset: 2px;
        }

        .nav-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        .decade-label {
            font-weight: 500;
            color: var(--mjo-calendar-decade-label-color, var(--mjo-foreground-color, #333));
            font-size: 1.5em;
        }

        .years-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }

        .year-button {
            background: var(--mjo-calendar-picker-button-background, transparent);
            border: var(--mjo-calendar-picker-button-border, 1px solid var(--mjo-border-color, #e0e0e0));
            border-radius: var(--mjo-calendar-picker-button-radius, var(--mjo-radius, 4px));
            color: var(--mjo-calendar-picker-button-color, var(--mjo-foreground-color-low, #333));
            cursor: pointer;
            font-family: inherit;
            font-size: 1.3em;
            padding: 12px 8px;
            transition: all 0.2s ease;
            min-height: 40px;
        }

        .year-button:hover:not(:disabled) {
            background: var(--mjo-calendar-picker-button-hover-background, var(--mjo-primary-color-alpha2, rgba(76, 129, 201, 0.1)));
            border-color: var(--mjo-calendar-picker-button-hover-border, var(--mjo-primary-color, #4c81c9));
        }

        .year-button:focus {
            outline: 2px solid var(--mjo-calendar-picker-button-focus-outline, var(--mjo-primary-color, #4c81c9));
            outline-offset: 2px;
        }

        .year-button[data-selected]:not(:disabled) {
            background: var(--mjo-calendar-picker-button-selected-background, var(--mjo-primary-color, #4c81c9));
            border-color: var(--mjo-calendar-picker-button-selected-border, var(--mjo-primary-color, #4c81c9));
            color: var(--mjo-calendar-picker-button-selected-color, var(--mjo-primary-foreground-color, white));
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
        "calendar-year-picker": CalendarYearPicker;
    }
}
