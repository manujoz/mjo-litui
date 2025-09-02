import { MjoProgressChangeEvent, MjoProgressColor, MjoProgressCompleteEvent, MjoProgressSize, MjoProgressVariant } from "./types/mjo-progress";

import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { styleMap } from "lit/directives/style-map.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin";

@customElement("mjo-progress")
export class MjoProgress extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    @property({ type: Number }) value?: number;
    @property({ type: Boolean }) showValue = false;
    @property({ type: Boolean }) indeterminate = false;
    @property({ type: String }) label?: string;
    @property({ type: Object }) formatOptions?: Intl.NumberFormatOptions;
    @property({ type: String }) color: MjoProgressColor = "primary";
    @property({ type: String }) size: MjoProgressSize = "medium";
    @property({ type: String }) variant: MjoProgressVariant = "bar";

    @state() private previousValue?: number;

    // Circle SVG constants
    get #circleStrokeWidth(): number {
        switch (this.size) {
            case "small":
                return 6;
            case "large":
                return 10;
            default:
                return 8; // medium
        }
    }

    get #circleRadius(): number {
        switch (this.size) {
            case "small":
                return 15;
            case "large":
                return 40;
            default:
                return 26; // medium
        }
    }

    get #currentValue(): number {
        return this.value ?? this.min;
    }

    get #percentage(): number {
        if (this.indeterminate) return 0;

        const range = this.max - this.min;
        if (range <= 0) return 0;

        return Math.max(0, Math.min(100, ((this.#currentValue - this.min) / range) * 100));
    }

    get #formattedValue(): string {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "percent",
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
            ...this.formatOptions,
        });
        return formatter.format(this.#percentage / 100);
    }

    get #circumference(): number {
        return 2 * Math.PI * this.#circleRadius;
    }

    get #strokeDasharray(): number {
        return this.#circumference;
    }

    get #strokeDashoffset(): number {
        if (this.indeterminate) return this.#circumference;
        return this.#circumference - (this.#percentage / 100) * this.#circumference;
    }

    get #svgSize(): number {
        // Include stroke width to prevent clipping
        return this.#circleRadius * 2 + this.#circleStrokeWidth;
    }

    get #svgCenter(): number {
        return this.#svgSize / 2;
    }

    render() {
        return html`
            <div
                class="progress-wrapper"
                data-variant=${this.variant}
                data-color=${this.color}
                data-size=${this.size}
                ?data-indeterminate=${this.indeterminate}
                role="progressbar"
                aria-valuenow=${ifDefined(!this.indeterminate ? this.#currentValue : undefined)}
                aria-valuemin=${this.min}
                aria-valuemax=${this.max}
                aria-label=${ifDefined(this.ariaLabel || this.label || undefined)}
            >
                ${this.#renderContent()}
            </div>
        `;
    }

    #renderContent() {
        if (this.variant === "circle") {
            return this.#renderCircle();
        }
        return this.#renderBar();
    }

    #renderBar() {
        const stylesBar = styleMap({
            width: this.indeterminate ? "100%" : `${this.#percentage}%`,
        });

        return html`
            <div class="bar-container">
                ${this.label || this.showValue
                    ? html`
                          <div class="bar-labels">
                              ${this.label ? html`<span class="label">${this.label}</span>` : ""}
                              ${this.showValue ? html`<span class="value">${this.#formattedValue}</span>` : ""}
                          </div>
                      `
                    : ""}
                <div class="bar-track">
                    <div class="bar-fill" style=${stylesBar}></div>
                </div>
            </div>
        `;
    }

    #renderCircle() {
        return html`
            <div class="circle-container">
                ${this.label ? html`<div class="circle-label">${this.label}</div>` : ""}
                <div class="circle-wrapper">
                    <svg class="circle-svg" width=${this.#svgSize} height=${this.#svgSize} viewBox="0 0 ${this.#svgSize} ${this.#svgSize}">
                        <!-- Background circle -->
                        <circle
                            class="circle-bg"
                            cx=${this.#svgCenter}
                            cy=${this.#svgCenter}
                            r=${this.#circleRadius}
                            stroke-width=${this.#circleStrokeWidth}
                            fill="none"
                        ></circle>
                        <!-- Progress circle -->
                        <circle
                            class="circle-progress"
                            cx=${this.#svgCenter}
                            cy=${this.#svgCenter}
                            r=${this.#circleRadius}
                            stroke-width=${this.#circleStrokeWidth}
                            fill="none"
                            stroke-dasharray=${this.#strokeDasharray}
                            stroke-dashoffset=${this.#strokeDashoffset}
                            transform="rotate(-90 ${this.#svgCenter} ${this.#svgCenter})"
                        ></circle>
                    </svg>
                    ${this.showValue ? html`<div class="circle-value">${this.#formattedValue}</div>` : ""}
                </div>
            </div>
        `;
    }

    protected willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        if (changedProperties.has("value") || changedProperties.has("min") || changedProperties.has("max")) {
            const newValue = this.#currentValue;

            if (this.previousValue !== newValue) {
                this.#dispatchChangeEvent();

                // Check if completed (reached max)
                if (newValue >= this.max && this.previousValue !== undefined && this.previousValue < this.max) {
                    this.#dispatchCompleteEvent();
                }

                this.previousValue = newValue;
            }
        }
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("indeterminate")) {
            const circle = this.shadowRoot?.querySelector(".circle-progress") as HTMLElement;
            const bar = this.shadowRoot?.querySelector(".bar-fill") as HTMLElement;

            if (this.indeterminate) {
                if (bar) bar.style.transition = "none";
                if (circle) circle.style.transition = "none";
            } else {
                setTimeout(() => {
                    if (bar) bar.style.transition = "";
                    if (circle) circle.style.transition = "";
                }, 10);
            }
        }
    }

    #dispatchChangeEvent() {
        this.dispatchEvent(
            new CustomEvent<MjoProgressChangeEvent["detail"]>("mjo-progress:change", {
                detail: {
                    value: this.#currentValue,
                    percentage: this.#percentage,
                    min: this.min,
                    max: this.max,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #dispatchCompleteEvent() {
        this.dispatchEvent(
            new CustomEvent<MjoProgressCompleteEvent["detail"]>("mjo-progress:complete", {
                detail: {
                    value: this.#currentValue,
                    min: this.min,
                    max: this.max,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .progress-wrapper {
                width: 100%;
            }

            /* Bar variant styles */
            .bar-container {
                display: flex;
                flex-direction: column;
                gap: var(--mjo-progress-label-gap, 8px);
            }

            .bar-labels {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: var(--mjo-progress-font-size, 14px);
                font-weight: var(--mjo-progress-font-weight, 500);
                color: var(--mjo-text-color, currentColor);
            }

            .bar-labels .label {
                flex: 1;
            }

            .bar-labels .value {
                margin-left: auto;
            }

            .bar-track {
                position: relative;
                width: 100%;
                background-color: var(--mjo-progress-background, var(--mjo-background-color-high, #f5f5f5));
                border-radius: var(--mjo-progress-bar-border-radius, 4px);
                overflow: hidden;
            }

            .bar-fill {
                height: 8px; /* Fixed height for medium */
                border-radius: var(--mjo-progress-bar-border-radius, 4px);
                transition: width 0.3s ease-in-out;
                position: relative;
            }

            /* Size variations for bar */
            .progress-wrapper[data-size="small"] .bar-fill {
                height: 6px; /* Fixed height for small */
                border-radius: var(--mjo-progress-bar-border-radius-small, var(--mjo-progress-bar-border-radius, 3px));
            }

            .progress-wrapper[data-size="small"] .bar-track {
                border-radius: var(--mjo-progress-bar-border-radius-small, var(--mjo-progress-bar-border-radius, 3px));
            }

            .progress-wrapper[data-size="small"] .bar-labels {
                font-size: var(--mjo-progress-font-size-small, var(--mjo-progress-font-size, 12px));
            }

            .progress-wrapper[data-size="small"] .circle-label,
            .progress-wrapper[data-size="small"] .circle-value {
                font-size: var(--mjo-progress-font-size-small, var(--mjo-progress-font-size, 12px));
            }

            .progress-wrapper[data-size="large"] .bar-fill {
                height: 12px; /* Fixed height for large */
                border-radius: var(--mjo-progress-bar-border-radius-large, var(--mjo-progress-bar-border-radius, 6px));
            }

            .progress-wrapper[data-size="large"] .bar-track {
                border-radius: var(--mjo-progress-bar-border-radius-large, var(--mjo-progress-bar-border-radius, 6px));
            }

            .progress-wrapper[data-size="large"] .bar-labels {
                font-size: var(--mjo-progress-font-size-large, var(--mjo-progress-font-size, 16px));
            }

            .progress-wrapper[data-size="large"] .circle-label,
            .progress-wrapper[data-size="large"] .circle-value {
                font-size: var(--mjo-progress-font-size-large, var(--mjo-progress-font-size, 16px));
            }

            /* Circle variant styles */
            .circle-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: var(--mjo-progress-label-gap, 8px);
            }

            .circle-label {
                font-size: var(--mjo-progress-font-size, 14px);
                font-weight: var(--mjo-progress-font-weight, 500);
                color: var(--mjo-text-color, currentColor);
            }

            .circle-wrapper {
                position: relative;
                width: 60px; /* Fixed size for medium: (radius 26 * 2) + stroke 8 */
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .circle-svg {
                transform: rotate(0deg);
            }

            .circle-bg {
                stroke: var(--mjo-progress-background, var(--mjo-background-color-high, #f5f5f5));
            }

            .circle-progress {
                transition: stroke-dashoffset 0.3s ease-in-out;
                stroke-linecap: round;
            }

            .circle-value {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: var(--mjo-progress-font-size, 12px);
                font-weight: var(--mjo-progress-font-weight, 600);
                color: var(--mjo-text-color, currentColor);
                line-height: 1;
            }

            .progress-wrapper[data-size="small"] .circle-value {
                display: none; /* Ocultar valor en tamaño small */
            }

            .progress-wrapper[data-size="medium"] .circle-value {
                font-size: var(--mjo-progress-font-size-medium, 10px);
            }

            .progress-wrapper[data-size="large"] .circle-value {
                font-size: var(--mjo-progress-font-size-large, 16px);
            }

            /* Size variations for circle */
            .progress-wrapper[data-size="small"] .circle-wrapper {
                width: 36px; /* Fixed size for small: (radius 15 * 2) + stroke 6 */
                height: 36px;
            }

            .progress-wrapper[data-size="large"] .circle-wrapper {
                width: 90px; /* Fixed size for large: (radius 40 * 2) + stroke 10 */
                height: 90px;
            }

            /* Color variations */
            .progress-wrapper[data-color="primary"] .bar-fill {
                background-color: var(--mjo-progress-color, var(--mjo-primary-color, #4e9be4));
            }
            .progress-wrapper[data-color="primary"] .circle-progress {
                stroke: var(--mjo-progress-color, var(--mjo-primary-color, #4e9be4));
            }

            .progress-wrapper[data-color="secondary"] .bar-fill {
                background-color: var(--mjo-progress-color, var(--mjo-secondary-color, #7dc717));
            }
            .progress-wrapper[data-color="secondary"] .circle-progress {
                stroke: var(--mjo-progress-color, var(--mjo-secondary-color, #7dc717));
            }

            .progress-wrapper[data-color="success"] .bar-fill {
                background-color: var(--mjo-progress-color, var(--mjo-color-success, #4caf50));
            }
            .progress-wrapper[data-color="success"] .circle-progress {
                stroke: var(--mjo-progress-color, var(--mjo-color-success, #4caf50));
            }

            .progress-wrapper[data-color="warning"] .bar-fill {
                background-color: var(--mjo-progress-color, var(--mjo-color-warning, #ff9800));
            }
            .progress-wrapper[data-color="warning"] .circle-progress {
                stroke: var(--mjo-progress-color, var(--mjo-color-warning, #ff9800));
            }

            .progress-wrapper[data-color="error"] .bar-fill {
                background-color: var(--mjo-progress-color, var(--mjo-color-error, #f44336));
            }
            .progress-wrapper[data-color="error"] .circle-progress {
                stroke: var(--mjo-progress-color, var(--mjo-color-error, #f44336));
            }

            .progress-wrapper[data-color="info"] .bar-fill {
                background-color: var(--mjo-progress-color, var(--mjo-color-info, #2196f3));
            }
            .progress-wrapper[data-color="info"] .circle-progress {
                stroke: var(--mjo-progress-color, var(--mjo-color-info, #2196f3));
            }

            /* Indeterminate animations */
            .progress-wrapper[data-indeterminate] .bar-fill {
                position: relative;
                background: transparent;
                overflow: hidden;
                transition: none;
            }

            .progress-wrapper[data-indeterminate] .bar-fill::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent 0%, var(--mjo-progress-color, var(--mjo-primary-color, #4e9be4)) 50%, transparent 100%);
                width: 50%;
                animation: indeterminate-bar var(--mjo-progress-animation-duration, 2s) infinite linear;
                border-radius: inherit;
            }

            .progress-wrapper[data-indeterminate] .circle-progress {
                animation: indeterminate-circle var(--mjo-progress-animation-duration, 2s) infinite linear;
                stroke-dasharray: var(--mjo-progress-circle-dash, 40.84 122.52); /* Based on radius 26 */
                stroke-dashoffset: 0;
                transform-origin: center;
            }

            .progress-wrapper[data-size="small"][data-indeterminate] .circle-progress {
                stroke-dasharray: var(--mjo-progress-circle-dash-small, 23.56 70.69); /* Based on radius 15 */
            }

            .progress-wrapper[data-size="large"][data-indeterminate] .circle-progress {
                stroke-dasharray: var(--mjo-progress-circle-dash-large, 62.83 188.5); /* Based on radius 40 */
            }

            @keyframes indeterminate-bar {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(200%);
                }
            }

            @keyframes indeterminate-circle {
                0% {
                    transform: rotate(-90deg);
                }
                100% {
                    transform: rotate(270deg);
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-progress": MjoProgress;
    }

    interface HTMLElementEventMap {
        "mjo-progress:change": MjoProgressChangeEvent;
        "mjo-progress:complete": MjoProgressCompleteEvent;
    }
}
