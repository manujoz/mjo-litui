import { MjoCalendarEventMarker } from "../../types/mjo-calendar.js";

import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

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

    // Events for this specific day
    @property({ type: Array }) dayEvents?: MjoCalendarEventMarker[];

    @query(".day") private $day!: HTMLElement;

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
            "has-events": this.#hasEvents,
        };

        return html`
            <div
                class=${classMap(dayClasses)}
                part="day ${this.isSelected ? "day-selected" : ""} ${this.isToday ? "day-today" : ""}"
                role="gridcell"
                aria-label=${this.#dateLabel}
                aria-selected=${this.isSelected ? "true" : "false"}
                aria-current=${this.isToday ? "date" : "false"}
                aria-disabled=${this.isDisabled ? "true" : "false"}
                tabindex=${this.isFocused ? 0 : -1}
                title=${this.#hasEvents ? this.#eventTooltip : ""}
                @click=${this.#handleClick}
                @mouseenter=${this.#handleMouseEnter}
                @mouseleave=${this.#handleMouseLeave}
            >
                <mjo-typography tag="none">${this.day}</mjo-typography>
                ${this.#hasEvents ? this.#renderEventIndicator() : ""}
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

    #renderEventIndicator() {
        const styles = styleMap({
            backgroundColor: this.#eventBackgroundColor,
            color: this.#eventForegroundColor,
        });

        const eventCount = this.#dayEvents.length;
        if (eventCount === 1) {
            return html`<span class="event-indicator single" part="event-indicator event-indicator-single" style=${styles}></span>`;
        } else {
            return html`
                <span class="event-indicator multiple" part="event-indicator event-indicator-multiple" style=${styles} data-count=${eventCount}>
                    ${this.#eventCount}
                </span>
            `;
        }
    }

    // Computed properties for events
    get #dayEvents(): MjoCalendarEventMarker[] {
        return this.dayEvents || [];
    }

    get #hasEvents(): boolean {
        return this.#dayEvents.length > 0;
    }

    get #eventTooltip(): string {
        return this.#dayEvents.map((evt: MjoCalendarEventMarker) => evt.tooltip || "Event").join("\n");
    }

    get #eventCount(): string {
        return this.#dayEvents.length < 10 ? String(this.#dayEvents.length) : "+9";
    }

    get #eventBackgroundColor(): string | undefined {
        return this.#dayEvents[0]?.backgroundColor;
    }

    get #eventForegroundColor(): string | undefined {
        return this.#dayEvents[0]?.foregroundColor;
    }

    get #dateLabel() {
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

    #handleClick() {
        if (this.isDisabled) return;

        const date = new Date(this.year, this.month, this.day);
        this.dispatchEvent(
            new CustomEvent("mjo-calendar:day-click", {
                detail: {
                    day: this.day,
                    date,
                    events: this.#dayEvents,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleMouseEnter() {
        if (this.isDisabled) return;

        const date = new Date(this.year, this.month, this.day);
        this.dispatchEvent(
            new CustomEvent("mjo-calendar:day-hover", {
                detail: {
                    day: this.day,
                    date,
                    events: this.#dayEvents,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleMouseLeave() {
        const date = new Date(this.year, this.month, this.day);
        this.dispatchEvent(
            new CustomEvent("mjo-calendar:day-leave", {
                detail: {
                    day: this.day,
                    date,
                    events: this.#dayEvents,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    static styles = css`
        .day {
            position: relative;
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
        .event-indicator {
            position: absolute;
            bottom: var(--mjo-calendar-event-offset, 2px);
            right: var(--mjo-calendar-event-offset, 2px);
            background: var(--mjo-calendar-event-background-color, #ff6b6b);
            color: var(--mjo-calendar-event-foreground-color, white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .event-indicator.multiple {
            width: var(--mjo-calendar-event-multiple-size, 12px);
            height: var(--mjo-calendar-event-multiple-size, 12px);
            font-size: var(--mjo-calendar-event-font-size, 8px);
            font-weight: var(--mjo-calendar-event-font-weight, bold);
            line-height: 1em;
        }
        .event-indicator.single {
            width: var(--mjo-calendar-event-single-size, 6px);
            height: var(--mjo-calendar-event-single-size, 6px);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-calendar-day": MjointCalendarDay;
    }
}
