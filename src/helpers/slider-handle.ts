import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("slider-handle")
export class SliderHandle extends LitElement {
    @property({ type: Boolean }) pressed = false;
    @property({ type: Boolean }) tooltip = false;
    @property({ type: Number }) size = 20;
    @property({ type: Number }) left = 0;
    @property({ type: String }) value = "0";
    @property({ type: String }) valuePrefix = "";
    @property({ type: String }) valueSuffix = "";
    @property({ type: String }) color: "primary" | "secondary" = "primary";

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
            <div class="outter" ?data-pressed=${this.pressed} data-color=${this.color}><div class="inner" ?data-pressed=${this.pressed}></div></div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener("mousedown", this.listeners.mousedown);
        this.addEventListener("touchstart", this.listeners.mousedown);
        document.addEventListener("mousemove", this.listeners.mousemove);
        document.addEventListener("touchmove", this.listeners.mousemove);
        document.addEventListener("mouseup", this.listeners.mouseup);
        document.addEventListener("touchend", this.listeners.mouseup);

        this.#setFontSize();
        this.#setSize();
        this.#setPosition();
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
        ev.preventDefault();
        this.pressed = true;

        if (ev.type === "mousedown") {
            this.start = (ev as MouseEvent).clientX;
        } else {
            this.start = (ev as TouchEvent).touches[0].clientX;
        }
    }

    #handleLeave(ev: MouseEvent | TouchEvent) {
        ev.preventDefault();

        this.pressed = false;
        this.start = 0;

        this.setLeft();
    }

    #setFontSize() {
        const outter = this.shadowRoot?.querySelector(".outter") as HTMLElement;
        if (!outter) return;

        if (this.size < 20) this.size = 20;

        outter.style.fontSize = `${this.size / 20}px`;
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
                color: var(--mjo-input-primary-foreground-color, var(--mjo-primary-foreground-color, #333333));
                background-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff));
                border-radius: var(--mjo-slider-tooltip-radius, var(--mjo-radius-small, 5px));
                box-shadow: var(--mjo-slider-tooltip-box-shadow, var(--mjo-box-shadow, 0px 0px 3px rgba(0, 0, 0, 0.5)));
            }
            .text::after {
                position: absolute;
                border: 5px solid transparent;
                bottom: -10px;
                left: calc(50% - 5px);
                border-top-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff));
                content: "";
            }
            .text[data-color="secondary"] {
                color: var(--mjo-input-secondary-foreground-color, var(--mjo-secondary-foreground-color, #333333));
                background-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .text[data-color="secondary"]::after {
                border-top-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
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
                border: solid 2em var(--mjo-background-color, white);
                background-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #007bff));
            }
            .outter[data-color="secondary"] {
                background-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .outter[data-pressed] {
                cursor: grabbing;
            }
            .inner {
                position: absolute;
                top: 2em;
                left: 2em;
                width: calc(100% - 4em);
                height: calc(100% - 4em);
                border-radius: 9999px;
                background-color: var(--mjo-background-color, white);
                transition: transform 0.2s;
            }
            .inner[data-pressed] {
                transform: scale(0.8);
            }
        `,
    ];
}
