import { LitElement, TemplateResult, css, html, nothing, type CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import { type MjoDropdown } from "../mjo-dropdown";

import {
    getLeftInCenterPOsition,
    getLeftInLeftPosition,
    getLeftInRightPosition,
    getTopInBottomPosition,
    getTopInMiddlePosition,
    getTopInTopPosition,
} from "../utils/dropdown";

@customElement("dropdow-container")
export class DropdowContainer extends LitElement {
    @property({ type: Object }) css?: CSSResult;
    @property({ type: Object }) html?: TemplateResult<1>;
    @property({ type: String }) position: DropdownPositions = "center-bottom";
    @property({ type: Boolean }) preventScroll = false;
    @property({ type: Number }) width?: number;

    host?: MjoDropdown;

    #scrollElements: { element: HTMLElement; scrollTop: number }[] = [];
    #listeners = {
        scroll: (ev: Event) => {
            this.#handleScroll(ev);
        },
        wheel: (ev: WheelEvent) => {
            this.#preventWheel(ev);
        },
        resize: () => {
            this.updatePosition();
        },
    };

    render() {
        return html`${this.css
            ? html`<style type="text/css">
                  ${this.css.toString().replace(/\s+/g, " ")}
              </style>`
            : nothing}${this.html ? this.html : nothing}`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        window.addEventListener("resize", this.#listeners.resize);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener("resize", this.#listeners.resize);
    }

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        if (this.offsetHeight > 0) this.updatePosition();
    }

    close() {
        this.#scrollElements = [];
        this.#removePreventScroll();

        this.style.transform = "scale(0.7)";
        this.style.opacity = "0";

        setTimeout(() => {
            this.style.display = "";
            this.style.transition = "";
            this.style.transform = "";
        }, 210);
    }

    open() {
        this.#addPreventScroll();

        this.style.display = "block";
        this.style.transition = "opacity 0.1s ease-in, transform 0.1s ease-in";
        this.style.transform = "scale(0.7)";
        if (this.width) this.style.minWidth = `${this.width}px`;

        setTimeout(() => {
            this.updatePosition();
            this.style.transform = "scale(1)";
            this.style.opacity = "1";
        }, 5);
    }

    updatePosition() {
        if (this.offsetHeight === 0 || !this.host) return;

        const container = this.host as unknown as HTMLElement;
        const [x, y] = this.position.split("-");

        const top =
            y === "bottom"
                ? getTopInBottomPosition({ dropDown: this, container })
                : y === "middle"
                  ? getTopInMiddlePosition({ dropDown: this, container })
                  : getTopInTopPosition({ dropDown: this, container });
        const left =
            x === "left"
                ? getLeftInLeftPosition({ dropDown: this, container })
                : x === "center"
                  ? getLeftInCenterPOsition({ dropDown: this, container })
                  : getLeftInRightPosition({ dropDown: this, container });

        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
    }

    #addPreventScroll() {
        this.#getScrollbarElements();

        this.#scrollElements.forEach(({ element }) => {
            element.addEventListener("scroll", this.#listeners.scroll);
        });

        if (this.preventScroll) document.addEventListener("wheel", this.#listeners.wheel, { passive: false });
    }

    #removePreventScroll() {
        this.#scrollElements.forEach(({ element }) => {
            element.removeEventListener("scroll", this.#listeners.scroll);
        });

        document.removeEventListener("wheel", this.#listeners.wheel);
    }

    #handleScroll(ev: Event) {
        const target = ev.currentTarget as HTMLElement;

        if (this.preventScroll) {
            for (const { element, scrollTop } of this.#scrollElements) {
                if (element !== target) continue;

                if (element === (window as unknown as HTMLElement)) {
                    window.scrollTo(0, scrollTop);
                } else {
                    element.scrollTop = scrollTop;
                }
            }
        } else {
            this.updatePosition();
        }
    }

    #preventWheel(ev: WheelEvent) {
        ev.preventDefault();
    }

    #getScrollbarElements() {
        this.#scrollElements = [];

        let element = this.host as unknown as HTMLElement;
        while (element) {
            if (element.scrollHeight > element.clientHeight) {
                if (element.tagName === "HTML") {
                    element = window as unknown as HTMLElement;
                    this.#scrollElements.push({ element, scrollTop: (element as unknown as Window).scrollY });
                } else {
                    this.#scrollElements.push({ element, scrollTop: element.scrollTop });
                }
            }
            element = ((element.parentNode as ShadowRoot)?.host as HTMLElement) ?? element.parentNode;
        }
    }

    static styles = [
        css`
            :host {
                display: none;
                position: absolute;
                transition: all 0.3s;
                opacity: 0;
                background-color: var(--mjo-dropdown-background-color, var(--mjo-background-color, white));
                box-shadow: var(--mjo-dropdown-box-shadow, var(--mjo-box-shadow, 0px 0px 7px rgba(0, 0, 0, 0.5)));
                border-radius: var(--mjo-dropdown-radius, var(--mjo-radius-medium, 5px));
                transform-origin: top center;
                max-width: calc(100vw - 20px);
                overflow: hidden;
            }
        `,
    ];
}

export type DropdownPositions = "left-bottom" | "center-bottom" | "right-bottom" | "left-top" | "center-top" | "right-top" | "left-middle" | "right-middle";

declare global {
    interface HTMLElementTagNameMap {
        "dropdow-container": DropdowContainer;
    }
}
