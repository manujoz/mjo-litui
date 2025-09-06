import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import "../../mjo-typography.js";

/**
 * Individual day cell component for calendar
 */
@customElement("mjoint-calendar-day")
export class MjointCalendarDay extends LitElement {
    @property({ type: Number }) day!: number;
    @property({ type: Number }) month!: number;
    @property({ type: Number }) year!: number;
    @property({ type: Boolean }) isEmpty = false;
    @property({ type: Boolean }) isToday = false;
    @property({ type: Boolean }) isSelected = false;
    @property({ type: Boolean }) isInRange = false;
    @property({ type: Boolean }) isRangeStart = false;
    @property({ type: Boolean }) isRangeEnd = false;
    @property({ type: Boolean }) isDisabled = false;
    @property({ type: Boolean }) isHovered = false;
    @property({ type: Boolean }) isFocused = false;
    @property({ type: Boolean }) showToday = true;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";

    @query(".day") $day!: HTMLElement;

    get dateLabel() {
        if (this.isEmpty || !this.month || !this.year) return "";

        const date = new Date(this.year, this.month, this.day);
        const formatter = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        let label = formatter.format(date);

        if (this.isToday) label += ", Today";
        if (this.isSelected) label += ", Selected";
        if (this.isRangeStart) label += ", Range start";
        if (this.isRangeEnd) label += ", Range end";
        if (this.isInRange) label += ", In selected range";
        if (this.isDisabled) label += ", Disabled";

        return label;
    }

    render() {
        if (this.isEmpty) {
            return html`<div class="day empty" role="gridcell"></div>`;
        }

        const dayClasses = {
            day: true,
            today: this.isToday && this.showToday,
            selected: this.isSelected,
            "in-range": this.isInRange,
            "range-start": this.isRangeStart,
            "range-end": this.isRangeEnd,
            disabled: this.isDisabled,
            "hovered-range": this.isHovered,
        };

        return html`
            <div
                class=${classMap(dayClasses)}
                part="day ${this.isSelected ? "selected" : ""} ${this.isToday ? "today" : ""}"
                role="gridcell"
                aria-label=${this.dateLabel}
                aria-selected=${this.isSelected ? "true" : "false"}
                aria-current=${this.isToday ? "date" : "false"}
                aria-disabled=${this.isDisabled ? "true" : "false"}
                tabindex=${this.isFocused ? 0 : -1}
                @click=${this.#handleClick}
                @mouseenter=${this.#handleMouseEnter}
                @mouseleave=${this.#handleMouseLeave}
            >
                <mjo-typography tag="none">${this.day}</mjo-typography>
            </div>
        `;
    }

    protected updated(_changedProperties: PropertyValues<this>): void {
        if (_changedProperties.has("isFocused")) {
            if (this.isFocused) {
                this.$day?.focus();
            } else {
                this.$day?.blur();
            }
        }
    }

    #handleClick() {
        if (this.isDisabled) return;

        this.dispatchEvent(
            new CustomEvent("day-click", {
                detail: { day: this.day },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleMouseEnter() {
        if (this.isDisabled) return;

        this.dispatchEvent(
            new CustomEvent("day-hover", {
                detail: { day: this.day },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleMouseLeave() {
        this.dispatchEvent(
            new CustomEvent("day-leave", {
                detail: { day: this.day },
                bubbles: true,
                composed: true,
            }),
        );
    }

    static styles = css`
        .day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: var(--mjo-calendar-day-border-radius, 4px);
            transition: all 0.2s ease;
            position: relative;
            font-size: 1.3em;
        }
        .day.empty {
            cursor: default;
            pointer-events: none;
        }
        .day:not(.empty):not(.disabled):hover {
            background: var(--mjo-calendar-day-hover-background, var(--mjoint-calendar-highlight-color));
        }
        .day.today:not(.empty):not(.disabled) {
            background: var(--mjo-calendar-today-background, var(--mjoint-calendar-accent-color-alpha));
            color: var(--mjo-calendar-today-color, var(--mjoint-calendar-accent-color));
            font-weight: 600;
        }
        .day.selected:not(.empty):not(.disabled) {
            background: var(--mjo-calendar-selected-background, var(--mjoint-calendar-accent-color));
            color: var(--mjo-calendar-selected-color, var(--mjoint-calendar-accent-color-foreground));
            font-weight: 600;
        }
        .day.in-range,
        .day.hovered-range {
            background: var(--mjo-calendar-range-background, var(--mjoint-calendar-accent-color-alpha));
            color: var(--mjo-calendar-range-color, var(--mjoint-calendar-accent-color));
        }
        .day.range-start,
        .day.range-end {
            background: var(--mjo-calendar-range-endpoint-background, var(--mjoint-calendar-accent-color));
            color: var(--mjo-calendar-range-endpoint-color, var(--mjoint-calendar-accent-color-foreground));
            font-weight: 600;
        }
        .day.disabled {
            color: var(--mjo-calendar-disabled-color, var(--mjoint-calendar-disabled-color-foreground));
            cursor: not-allowed;
            background: var(--mjo-calendar-disabled-background, transparent);
        }
        .day.disabled:hover {
            background: var(--mjo-calendar-disabled-background, transparent);
        }
        .day:focus-visible {
            outline: 2px solid var(--mjo-calendar-focus-outline, var(--mjoint-calendar-accent-color));
            outline-offset: 2px;
        }
        :host([size="small"]) .day {
            min-height: 28px;
        }

        :host([size="large"]) .day {
            min-height: 40px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-calendar-day": MjointCalendarDay;
    }
}
