import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { parseColorToRgba } from "../../utils/colors";
import { getParentNodes } from "../../utils/shadow-dom";

@customElement("slider-handle")
export class SliderHandle extends LitElement {
    @property({ type: Boolean }) pressed = false;
    @property({ type: Boolean }) tooltip = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Number }) size = 20;
    @property({ type: Number }) left = 0;
    @property({ type: String }) value = "0";
    @property({ type: String }) valuePrefix = "";
    @property({ type: String }) valueSuffix = "";
    @property({ type: String }) color: "primary" | "secondary" = "primary";

    // Accessibility properties (using custom attributes to avoid conflicts)
    @property({ type: String, attribute: "aria-valuemin" }) ariaValueMinAttr?: string;
    @property({ type: String, attribute: "aria-valuemax" }) ariaValueMaxAttr?: string;
    @property({ type: String, attribute: "aria-valuenow" }) ariaValueNowAttr?: string;
    @property({ type: String, attribute: "aria-valuetext" }) ariaValueTextAttr?: string;
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledByAttr?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedByAttr?: string;
    @property({ type: String, attribute: "aria-orientation" }) ariaOrientationAttr?: string;
    @property({ type: String, attribute: "aria-disabled" }) ariaDisabledAttr?: string;

    @state() private isFocused = false;
    @state() private backgroundColor = "";

    start: number = 0;

    listeners = {
        mousedown: (ev: MouseEvent | TouchEvent) => {
            this.#handlePress(ev);
        },
        mousemove: (ev: MouseEvent | TouchEvent) => {
            this.#handleMove(ev);
        },
        mouseup: (ev: MouseEvent | TouchEvent) => {
            this.#handleLeave(ev);
        },
    };

    render() {
        return html`
            ${this.tooltip
                ? html`<div class="tooltip">
                      <div class="text" data-color=${this.color}>${this.valuePrefix}${this.value}${this.valueSuffix}</div>
                  </div>`
                : nothing}
            <div
                class="outter hidden"
                ?data-pressed=${this.pressed}
                ?data-focused=${this.isFocused}
                data-color=${this.color}
                ?data-disabled=${this.disabled}
                role="slider"
                aria-valuemin=${this.ariaValueMinAttr || "0"}
                aria-valuemax=${this.ariaValueMaxAttr || "100"}
                aria-valuenow=${this.ariaValueNowAttr || this.value}
                aria-valuetext=${this.ariaValueTextAttr || `${this.valuePrefix}${this.value}${this.valueSuffix}`}
                aria-labelledby=${this.ariaLabelledByAttr || nothing}
                aria-describedby=${this.ariaDescribedByAttr || nothing}
                aria-orientation=${(this.ariaOrientationAttr as "horizontal" | "vertical") || "horizontal"}
                aria-disabled=${this.disabled ? "true" : "false"}
                tabindex=${this.disabled ? -1 : 0}
                @focus=${this.#handleFocus}
                @blur=${this.#handleBlur}
                @keydown=${this.#handleKeydown}
            >
                <div class="inner" ?data-pressed=${this.pressed}></div>
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener("mousedown", this.listeners.mousedown);
        this.addEventListener("touchstart", this.listeners.mousedown, { passive: true });
        document.addEventListener("mousemove", this.listeners.mousemove);
        document.addEventListener("touchmove", this.listeners.mousemove);
        document.addEventListener("mouseup", this.listeners.mouseup);
        document.addEventListener("touchend", this.listeners.mouseup);

        this.#setFontSize();
        this.#setSize();
        this.#setPosition();
        this.#setBackgroundColor();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener("mousedown", this.listeners.mousedown);
        this.removeEventListener("touchstart", this.listeners.mousedown);
        document.removeEventListener("mousemove", this.listeners.mousemove);
        document.removeEventListener("touchmove", this.listeners.mousemove);
        document.removeEventListener("mouseup", this.listeners.mouseup);
        document.removeEventListener("touchend", this.listeners.mouseup);
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        this.shadowRoot?.querySelector(".outter")?.classList.remove("hidden");
    }

    protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
        if (_changedProperties.has("size") && this.size > 0) {
            this.#setFontSize();
        }

        if (_changedProperties.has("pressed")) {
            this.#showTooltip();
        }
    }

    #showTooltip() {
        if (!this.tooltip) return;

        const tooltip = this.shadowRoot?.querySelector(".tooltip") as HTMLElement;
        if (!tooltip) return;

        if (this.pressed) {
            tooltip.style.display = "flex";

            setTimeout(() => {
                tooltip.setAttribute("data-pressed", "");
            }, 10);
        } else {
            tooltip.removeAttribute("data-pressed");

            setTimeout(() => {
                tooltip.style.display = "none";
            }, 200);
        }
    }

    setLeftPosition(left: number) {
        this.style.left = `${left - this.size / 2}px`;
    }

    setLeft() {
        this.left = Number(window.getComputedStyle(this).left.replace("px", "")) + this.size / 2;
    }

    #handleMove(ev: MouseEvent | TouchEvent) {
        if (!this.pressed) return;

        const clientX = ev.type === "mousemove" ? (ev as MouseEvent).clientX : (ev as TouchEvent).touches[0].clientX;
        const diff = clientX - this.start;

        this.dispatchEvent(new CustomEvent("move", { detail: { diff, target: this } }));
    }

    #handlePress(ev: MouseEvent | TouchEvent) {
        if (ev.type !== "touchstart") ev.preventDefault();

        if (this.disabled) return;
        this.pressed = true;

        if (ev.type === "mousedown") {
            this.start = (ev as MouseEvent).clientX;
        } else {
            this.start = (ev as TouchEvent).touches[0].clientX;
        }
    }

    #handleLeave(ev: MouseEvent | TouchEvent) {
        ev.preventDefault();

        if (!this.pressed) return;

        this.pressed = false;
        this.start = 0;

        this.setLeft();

        this.dispatchEvent(new CustomEvent("release", { detail: { target: this } }));
    }

    #handleFocus() {
        if (this.disabled) return;

        this.isFocused = true;

        this.dispatchEvent(
            new CustomEvent("focus", {
                detail: { target: this },
            }),
        );
    }

    #handleBlur() {
        this.isFocused = false;

        this.dispatchEvent(
            new CustomEvent("blur", {
                detail: { target: this },
            }),
        );
    }

    #handleKeydown(event: KeyboardEvent) {
        if (this.disabled) return;

        // Dispatch keydown event to parent slider for handling
        this.dispatchEvent(
            new CustomEvent("keydown", {
                detail: {
                    target: this,
                    key: event.key,
                    originalEvent: event,
                },
            }),
        );
    }

    #setFontSize() {
        const outter = this.shadowRoot?.querySelector(".outter") as HTMLElement;
        if (!outter) return;

        if (this.size < 20) this.size = 20;

        outter.style.fontSize = `${this.size / 20}px`;
    }

    #setBackgroundColor() {
        const parentNodesGen = getParentNodes(this);
        let parent = parentNodesGen.next();
        let lastColor = "";
        while (parent.done === false) {
            const backgroundColor = window.getComputedStyle(parent.value).backgroundColor;
            lastColor = backgroundColor;
            const rgba = parseColorToRgba(backgroundColor);
            if (rgba.a > 0) {
                this.backgroundColor = backgroundColor;
                break;
            }
            parent = parentNodesGen.next();
        }

        this.style.setProperty("--inner-background-color", this.backgroundColor || lastColor);
    }

    #setPosition() {
        this.style.left = `${this.left - this.size / 2}px`;
    }

    #setSize() {
        this.style.width = `${this.size}px`;
        this.style.height = `${this.size}px`;
    }

    static styles = [
        css`
            :host {
                position: absolute;
                top: -1px;
                left: -10px;
                width: 20px;
                height: 20px;
            }
            .hidden {
                display: none !important;
            }
            .tooltip {
                position: absolute;
                bottom: calc(100% + 7px);
                width: 250px;
                left: calc(50% - 125px);
                justify-content: center;
                transform: translateY(20%) scale(0.8);
                opacity: 0;
                user-select: none;
                display: none;
                transition:
                    transform 0.2s,
                    opacity 0.2s;
            }
            .tooltip[data-pressed] {
                transform: translateX(0%) scale(1);
                opacity: 1;
            }
            .text {
                position: relative;
                padding: 0.1em 0.5em;
                font-size: 0.8em;
                color: var(--mjo-slider-primary-foreground-color, var(--mjo-input-primary-foreground-color, var(--mjo-primary-foreground-color, #333333)));
                background-color: var(--mjo-slider-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff)));
                border-radius: var(--mjo-slider-tooltip-radius, var(--mjo-radius-small, 5px));
                box-shadow: var(--mjo-slider-tooltip-box-shadow, var(--mjo-box-shadow, 0px 0px 3px rgba(0, 0, 0, 0.5)));
            }
            .text::after {
                position: absolute;
                border: 5px solid transparent;
                bottom: -10px;
                left: calc(50% - 5px);
                border-top-color: var(--mjo-slider-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff)));
                content: "";
            }
            .text[data-color="secondary"] {
                color: var(
                    --mjo-slider-secondary-foreground-color,
                    var(--mjo-input-secondary-foreground-color, var(--mjo-secondary-foreground-color, #333333))
                );
                background-color: var(--mjo-slider-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74)));
            }
            .text[data-color="secondary"]::after {
                border-top-color: var(--mjo-slider-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74)));
            }
            .outter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 9999px;
                cursor: grab;
                box-sizing: border-box;
                border: solid 2em var(--inner-background-color, var(--mjo-background-color, transparent));
                background-color: var(--mjo-slider-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff)));
                outline: none;
                display: flex;
                transition: box-shadow 0.2s ease;
            }
            .outter:focus-visible {
                box-shadow: 0 0 0 2px var(--mjo-slider-handle-focus-ring-color, var(--mjo-primary-color, #007bff));
            }
            .outter[data-focused] {
                box-shadow: 0 0 0 2px var(--mjo-slider-handle-focus-ring-color, var(--mjo-primary-color, #007bff));
            }
            .outter[data-color="secondary"] {
                background-color: var(--mjo-slider-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74)));
            }
            .outter[data-color="secondary"]:focus-visible,
            .outter[data-color="secondary"][data-focused] {
                box-shadow: 0 0 0 2px var(--mjo-slider-handle-focus-ring-color, var(--mjo-secondary-color, #cc3d74));
            }
            .outter[data-pressed] {
                cursor: grabbing;
            }
            .outter[data-disabled] {
                cursor: not-allowed;
                background-color: var(--mjo-slider-handle-disabled-color, var(--mjo-slider-background-color, var(--mjo-border-color-dark, #c7c7c7)));
                opacity: var(--mjo-slider-disabled-opacity, 0.5);
            }
            .outter[data-disabled]:focus-visible,
            .outter[data-disabled][data-focused] {
                box-shadow: none;
            }
            .inner {
                position: relative;
                align-self: stretch;
                flex: 1 1 0;
                border-radius: 9999px;
                background-color: var(--inner-background-color, var(--mjo-background-color, transparent));
                transition: transform 0.2s;
                transform: scale(0.75);
            }
            .inner[data-pressed] {
                transform: scale(0.55);
            }
        `,
    ];
}
