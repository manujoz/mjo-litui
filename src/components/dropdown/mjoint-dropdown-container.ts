import type { MjoDropdown } from "../../mjo-dropdown";
import type { MjoDropdownPosition } from "../../types/mjo-dropdown.d.ts";

import { LitElement, TemplateResult, css, html, nothing, type CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

import {
    getLeftInCenterPOsition,
    getLeftInLeftPosition,
    getLeftInRightPosition,
    getTopInBottomPosition,
    getTopInMiddlePosition,
    getTopInTopPosition,
} from "../../utils/dropdown.js";

@customElement("mjoint-dropdown-container")
export class MjointDropdownContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Object }) css?: CSSResult;
    @property({ type: Object }) html?: TemplateResult<1>;
    @property({ type: String }) position: MjoDropdownPosition = "center-bottom";
    @property({ type: Boolean }) preventScroll = false;
    @property({ type: String }) width?: string;
    @property({ type: String }) height?: string;

    host?: MjoDropdown;

    #scrollElements: { element: HTMLElement; scrollTop: number }[] = [];

    render() {
        return html`${this.css
            ? html`<style type="text/css">
                  ${this.css.toString().replace(/\s+/g, " ")}
              </style>`
            : nothing}${this.html ? html`<div class="container" part="dropdown-container" role="dialog" aria-modal="false">${this.html}</div>` : nothing}`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.height) this.style.maxHeight = this.height;

        window.addEventListener("resize", this.#handleResize);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener("resize", this.#handleResize);
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
        if (this.width) this.style.minWidth = this.width;

        setTimeout(() => {
            this.updatePosition();
            this.style.transform = "scale(1)";
            this.style.opacity = "1";
        }, 5);
    }

    scrollToTop(top: number) {
        this.scrollTo({
            top,
        });
    }

    getScroll() {
        return {
            top: this.scrollTop,
            left: this.scrollLeft,
        };
    }

    updatePosition() {
        if (this.offsetHeight === 0 || !this.host) return;

        const container = this.host as unknown as HTMLElement;
        const [x, y] = this.position.split("-");

        const left =
            x === "left"
                ? getLeftInLeftPosition({ dropDown: this, container })
                : x === "center"
                  ? getLeftInCenterPOsition({ dropDown: this, container })
                  : getLeftInRightPosition({ dropDown: this, container });

        const top =
            y === "bottom"
                ? getTopInBottomPosition({ dropDown: this, container })
                : y === "middle"
                  ? getTopInMiddlePosition({ dropDown: this, container })
                  : getTopInTopPosition({ dropDown: this, container });

        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
    }

    #addPreventScroll() {
        this.#getScrollbarElements();

        this.#scrollElements.forEach(({ element }) => {
            element.addEventListener("scroll", this.#handleScroll);
        });

        if (this.preventScroll) document.addEventListener("wheel", this.#handleWheel, { passive: false });
    }

    #removePreventScroll() {
        this.#scrollElements.forEach(({ element }) => {
            element.removeEventListener("scroll", this.#handleScroll);
        });

        document.removeEventListener("wheel", this.#handleWheel);
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

    #handleResize = () => {
        this.updatePosition();
    };

    #handleScroll = (ev: Event) => {
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
    };

    #handleWheel = (ev: WheelEvent) => {
        if (ev.target !== this) ev.preventDefault();
    };

    static styles = [
        css`
            :host {
                display: none;
                position: absolute;
                transition: all 0.3s;
                opacity: 0;
                transform-origin: top center;
                max-width: calc(100vw - 20px);
                box-shadow: var(--mjo-dropdown-box-shadow, var(--mjo-box-shadow, 0px 0px 7px rgba(0, 0, 0, 0.5)));
                border-radius: var(--mjo-dropdown-border-radius, var(--mjo-radius-medium, 5px));
                overflow-x: hidden;
                overflow-y: auto;
                z-index: 1000;
            }
            .container {
                background-color: var(--mjo-dropdown-container-background-color, var(--mjo-dropdown-background-color, var(--mjo-background-color, white)));
                overflow: hidden;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-dropdown-container": MjointDropdownContainer;
    }
}
