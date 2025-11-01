import type { MjoDropdown } from "../../mjo-dropdown";
import type { MjoDropdownPosition } from "../../types/mjo-dropdown.d.ts";

import { LitElement, TemplateResult, css, html, nothing, type CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import { ScrollLock } from "../../lib/scroll.js";
import { ThemeMixin, type IThemeMixin } from "../../mixins/theme-mixin.js";

import {
    getLeftInCenterPOsition,
    getLeftInLeftPosition,
    getLeftInRightPosition,
    getTopInBottomPosition,
    getTopInMiddlePosition,
    getTopInTopPosition,
} from "../../utils/dropdown.js";
import { getScrollbarElements } from "../../utils/shadow-dom.js";

/**
 * @summary Container element for mjo-dropdown that holds the floating content.
 *
 * @csspart dropdown-container - The main container holding the dropdown content
 *
 * @cssprop --mjo-dropdown-background-color - Background color of the container
 * @cssprop --mjo-dropdown-foreground-color - Text color of the content
 * @cssprop --mjo-dropdown-border-radius - Border radius of the container
 * @cssprop --mjo-dropdown-box-shadow - Box shadow of the container
 */
@customElement("mjo-dropdown-container")
export class MjoDropdownContainer extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Object }) css?: CSSResult;
    @property({ type: Object }) html?: TemplateResult<1>;
    @property({ type: String }) position: MjoDropdownPosition = "center-bottom";
    @property({ type: Boolean }) scrollLocked = false;
    @property({ type: String }) width?: string;
    @property({ type: String }) height?: string;
    @property({ type: Number }) zIndex = 10;

    host!: MjoDropdown;
    #scrollLock!: ScrollLock;
    #scrollElements: HTMLElement[] = [];

    render() {
        return html`
            ${this.css
                ? html`
                      <style type="text/css">
                          ${this.css.toString().replace(/\s+/g, " ")}
                      </style>
                  `
                : nothing}
            ${this.html ? html`<div part="dropdown-container" role="dialog" aria-modal="false">${this.html}</div>` : nothing}
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#scrollLock = new ScrollLock(this.host);

        if (this.height) this.style.maxHeight = this.height;
        if (this.zIndex) this.style.zIndex = this.zIndex.toString();

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

    /**
     * Closes the dropdown with animation.
     */
    close() {
        if (this.scrollLocked) {
            this.#scrollLock.unlock();
        } else {
            this.#scrollElements.forEach((el) => {
                el.removeEventListener("scroll", this.#handleScroll);
            });
        }

        this.style.transform = "scale(0.7)";
        this.style.opacity = "0";

        setTimeout(() => {
            this.style.display = "";
            this.style.transition = "";
            this.style.transform = "";
        }, 210);
    }

    /**
     * Opens the dropdown with animation.
     */
    open() {
        if (this.scrollLocked) {
            this.#scrollLock.lock(true);
        } else {
            this.#scrollElements = getScrollbarElements(this.host as HTMLElement);
            this.#scrollElements.forEach((el) => {
                el.addEventListener("scroll", this.#handleScroll, { passive: true });
            });
        }

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

    /**
     * Scrolls the dropdown content to specified top position.
     */
    scrollToTop(top: number) {
        this.scrollTo({
            top,
        });
    }

    /**
     * Gets the current scroll position of the dropdown.
     */
    getScroll() {
        return {
            top: this.scrollTop,
            left: this.scrollLeft,
        };
    }

    /**
     * Recalculates and updates the dropdown position based on trigger element and viewport constraints.
     */
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

    #handleResize = () => {
        this.updatePosition();
    };

    #handleScroll = () => {
        if (!this.scrollLocked) {
            this.updatePosition();
        }
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
                z-index: 10;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-dropdown-container": MjoDropdownContainer;
    }
}
