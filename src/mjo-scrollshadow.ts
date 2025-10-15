import { MjoScrollshadowOverflow } from "./types/mjo-scrollshadow";

import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { getInheritBackgroundColor } from "./utils/shadow-dom.js";

/**
 * @summary Container component that adds visual scroll shadows to indicate scrollable content.
 *
 * @slot - Content to be placed inside the scrollable container
 * @csspart container - The internal scrollable container element
 * @cssprop --mjo-scrollshadow-color - Color used for gradient shadows (auto-detected from parent background)
 * @cssprop --mjo-scrollshadow-size - Size of the gradient shadow effect (default: 10%)
 * @cssprop --mjo-scrollshadow-scrollbar-width - Width of the scrollbar (default: thin)
 * @cssprop --mjo-scrollshadow-scrollbar-thumb-color - Color of the scrollbar thumb (default: #cccccc)
 * @cssprop --mjo-scrollshadow-scrollbar-track - Background color of the scrollbar track (default: transparent)
 */
@customElement("mjo-scrollshadow")
export class MjoScrollshadow extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) overflow: MjoScrollshadowOverflow = "vertical";
    @property({ type: Boolean }) hideScrollbar = false;

    @query(".container") private $container!: HTMLDivElement;

    render() {
        return html`
            ${this.applyThemeSsr()}
            <div class="container" part="container" @scroll=${this.#handleScroll} data-overflow=${this.overflow} ?data-hidescrollbar=${this.hideScrollbar}>
                <slot></slot>
            </div>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues<this>): void {
        super.firstUpdated(_changedProperties);

        this.#getInheritBackgroundColor();

        this.$container.addEventListener("wheel", this.#handleWheel, { passive: false });

        this.updateComplete.then(() => {
            this.#setShadows();
        });
    }

    /**
     * Gets the current scroll position (scrollTop for vertical, scrollLeft for horizontal)
     */
    get scrollPosition() {
        if (this.overflow === "vertical") {
            return this.$container.scrollTop;
        } else {
            return this.$container.scrollLeft;
        }
    }

    /**
     * Manually recalculates and updates shadow visibility
     */
    updateShadows() {
        this.#setShadows();
    }

    /**
     * Scrolls to a specific position with smooth behavior
     */
    scrollToPosition(position: number) {
        if (this.overflow === "vertical") {
            this.$container.scrollTo({ top: position, behavior: "smooth" });
        } else {
            this.$container.scrollTo({ left: position, behavior: "smooth" });
        }
    }

    /**
     * Scrolls to the end of content with smooth behavior
     */
    scrollToEnd(): void {
        if (this.overflow === "vertical") {
            this.$container.scrollTo({ top: this.$container.scrollHeight, behavior: "smooth" });
        } else {
            this.$container.scrollTo({ left: this.$container.scrollWidth, behavior: "smooth" });
        }
    }

    #getInheritBackgroundColor() {
        const backgroundColor = getInheritBackgroundColor(this.$container);

        this.style.setProperty("--mjoint-scrollshadow-color", backgroundColor);
    }

    #handleWheel = (event: WheelEvent) => {
        if (this.overflow === "horizontal" && event.deltaX === 0 && Math.abs(event.deltaY) > 5 && this.$container.scrollWidth > this.$container.clientWidth) {
            event.preventDefault();
            this.$container.scrollTo({
                left: this.$container.scrollLeft + event.deltaY,
                behavior: "smooth",
            });
        } else if (this.overflow === "vertical" && event.deltaY === 0 && this.$container.scrollHeight > this.$container.clientHeight) {
            event.preventDefault();
            this.$container.scrollTo({
                top: this.$container.scrollTop + event.deltaX,
                behavior: "smooth",
            });
        }
    };

    #setShadows() {
        if (this.overflow === "vertical" && this.$container.scrollHeight <= this.$container.clientHeight) {
            this.$container.style.maskImage = "none";
            return;
        }
        if (this.overflow === "horizontal" && this.$container.scrollWidth <= this.$container.clientWidth) {
            this.$container.style.maskImage = "none";
            return;
        }

        const color = "var(--mjo-scrollshadow-color, var(--mjoint-scrollshadow-color))";
        const size = "var(--mjo-scrollshadow-size, 10%)";

        if (this.overflow === "vertical") {
            const scrollTop = this.$container.scrollTop;
            const scrollHeight = this.$container.scrollHeight;
            const clientHeight = this.$container.clientHeight;

            if (scrollTop === 0) {
                this.$container.style.maskImage = `linear-gradient(to bottom, ${color} calc(100% - ${size}), transparent)`;
            } else if (scrollTop + clientHeight + 2 >= scrollHeight) {
                this.$container.style.maskImage = `linear-gradient(to top, ${color} calc(100% - ${size}), transparent)`;
            } else {
                this.$container.style.maskImage = `linear-gradient(to bottom, transparent, ${color} ${size}, ${color} calc(100% - ${size}), transparent)`;
            }
        } else if (this.overflow === "horizontal") {
            const scrollLeft = this.$container.scrollLeft;
            const scrollWidth = this.$container.scrollWidth;
            const clientWidth = this.$container.clientWidth;

            if (scrollLeft === 0) {
                this.$container.style.maskImage = `linear-gradient(to right, ${color} calc(100% - ${size}), transparent)`;
            } else if (scrollLeft + clientWidth + 2 >= scrollWidth) {
                this.$container.style.maskImage = `linear-gradient(to left, ${color} calc(100% - ${size}), transparent)`;
            } else {
                this.$container.style.maskImage = `linear-gradient(to right, transparent, ${color} ${size}, ${color} calc(100% - ${size}), transparent)`;
            }
        }
    }

    #handleScroll = () => {
        this.#setShadows();
    };

    static styles = [
        css`
            :host {
                display: flex;
                align-self: stretch;
                justify-self: stretch;
                box-sizing: border-box;
                flex: 1 1 0;
                overflow: hidden;
            }
            .container {
                position: relative;
                scrollbar-color: var(--mjo-scrollshadow-scrollbar-thumb-color, var(--mjo-scrollshadow-background-color-card, #cccccc))
                    var(--mjo-scrollshadow-scrollbar-track, transparent);
                scrollbar-width: var(--mjo-scrollshadow-scrollbar-width, thin);
                transition: mask-image 0.2s ease;
                box-sizing: border-box;
            }
            .container[data-hidescrollbar] {
                scrollbar-width: none;
            }
            .container[data-hidescrollbar]::-webkit-scrollbar {
                display: none;
            }
            .container[data-overflow="vertical"] {
                overflow-x: hidden;
                overflow-y: auto;
                flex: 1 1 0;
            }
            .container[data-overflow="horizontal"] {
                overflow-x: auto;
                overflow-y: hidden;
                flex: 1 1 0;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-scrollshadow": MjoScrollshadow;
    }
}
