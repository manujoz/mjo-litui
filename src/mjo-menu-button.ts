import type { MjoButtonEffect, MjoMenuButtonCloseEvent, MjoMenuButtonOpenEvent, MjoMenuButtonToggleEvent } from "./types/mjo-menu-button";

import type { PropertyValues } from "lit";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { pause } from "./utils/utils.js";

import "./mjo-ripple.js";

/**
 * @summary Animated hamburger menu button with multiple effects and semantic colors.
 *
 * @fires mjo-menu-button:open - Fired when the menu button is opened
 * @fires mjo-menu-button:close - Fired when the menu button is closed
 * @fires mjo-menu-button:toggle - Fired when the menu button state is toggled
 *
 * @csspart container - The main button element that contains the entire menu button
 * @csspart menu-button - The inner container that holds the hamburger menu lines
 * @csspart line - Individual lines that form the hamburger menu (4 span elements)
 *
 * @cssprop --mjo-menu-button-color-hover - Color applied on hover state
 */
@customElement("mjo-menu-button")
export class MjoMenuButton extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) size: "sm" | "md" | "lg" = "md";
    @property({ type: String }) effect: MjoButtonEffect = "cross";
    @property({ type: String }) color: "primary" | "secondary" | "success" | "info" | "warning" | "error" = "primary";
    @property({ type: Boolean }) isOpen = false;
    @property({ type: Boolean }) noink = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String, attribute: "aria-controls" }) ariaControls?: string;

    @query(".container") container!: HTMLButtonElement;
    @query(".menu-button") menuButton!: HTMLDivElement;

    spans!: NodeListOf<HTMLSpanElement>;
    isAnimated = false;

    render() {
        return html`
            ${this.applyThemeSsr()}
            <button
                class="container"
                part="container"
                @click=${this.#handleClick}
                data-color=${this.color}
                aria-label=${this.ariaLabel || (this.isOpen ? "Close menu" : "Open menu")}
                aria-expanded=${this.isOpen ? "true" : "false"}
                aria-haspopup=${this.ariaControls ? "menu" : "false"}
                aria-controls=${this.ariaControls || nothing}
                ?disabled=${this.disabled}
                type="button"
            >
                <div class="menu-button" part="menu-button">
                    <span part="line"></span>
                    <span part="line"></span>
                    <span part="line"></span>
                    <span part="line"></span>
                    ${!this.noink && !this.disabled ? html`<mjo-ripple></mjo-ripple>` : nothing}
                </div>
            </button>
        `;
    }

    firstUpdated(): void {
        this.spans = this.menuButton.querySelectorAll("span");

        if (this.size === "sm") {
            this.style.width = "35px";
            this.style.height = "35px";
        } else if (this.size === "lg") {
            this.style.width = "65px";
            this.style.height = "65px";
        }
    }

    updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("isOpen")) {
            this.#applyEffect();
        }
    }

    /**
     * Sets focus to the menu button
     */
    focus(options?: FocusOptions): void {
        this.container?.focus(options);
    }

    /**
     * Removes focus from the menu button
     */
    blur(): void {
        this.container?.blur();
    }

    /**
     * Closes the menu button by setting isOpen to false
     */
    close() {
        if (this.isAnimated || this.disabled) return;

        this.isOpen = false;

        this.dispatchEvent(
            new CustomEvent("mjo-menu-button:close", {
                detail: { isOpen: this.isOpen },
                bubbles: true,
                composed: true,
            }),
        );
    }

    /**
     * Opens the menu button by setting isOpen to true
     */
    open() {
        if (this.isAnimated || this.disabled) return;

        this.isOpen = true;

        this.dispatchEvent(
            new CustomEvent("mjo-menu-button:open", {
                detail: { isOpen: this.isOpen },
                bubbles: true,
                composed: true,
            }),
        );
    }

    /**
     * Toggles the menu button state between open and closed
     */
    toggle() {
        if (this.isAnimated || this.disabled) return;

        this.isOpen = !this.isOpen;

        this.dispatchEvent(
            new CustomEvent("mjo-menu-button:toggle", {
                detail: { isOpen: this.isOpen },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #handleClick() {
        if (this.disabled) return;

        this.toggle();
    }

    #applyEffect() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            this.#simpleCrossEffect();
            return;
        }

        switch (this.effect) {
            case "cross":
                this.#crossEffect();
                break;
            case "wink":
                this.#winkEffect();
                break;
            case "wink-reverse":
                this.#winkReverseEffect();
                break;
            case "bounce":
                this.#bounceEffect();
                break;
            case "rotate":
                this.#rotateEffect();
                break;
            case "rotate-reverse":
                this.#rotateReverseEffect();
                break;
            case "push":
                this.#pushEffect();
                break;
            case "push-reverse":
                this.#pushReverseEffect();
                break;
            case "async":
                this.#asyncEffect();
                break;
            case "async-reverse":
                this.#asyncReverseEffect();
                break;
            case "spin":
                this.#spinEffect();
                break;
            case "spin-reverse":
                this.#spinReverseEffect();
                break;
            default:
                this.#crossEffect();
        }
    }

    #simpleCrossEffect() {
        // Simple, instant transition for users who prefer reduced motion
        if (this.isOpen) {
            this.spans[0].style.cssText = "left: 50%; width: 0px;";
            this.spans[1].style.cssText = "transform: rotate(45deg);";
            this.spans[2].style.cssText = "transform: rotate(-45deg);";
            this.spans[3].style.cssText = "left: 50%; width: 0px;";
        } else {
            this.spans[0].style.cssText = "";
            this.spans[1].style.cssText = "";
            this.spans[2].style.cssText = "";
            this.spans[3].style.cssText = "";
        }
    }

    #removeStyles() {
        this.isAnimated = true;
        this.container.removeAttribute("style");
        this.spans[0].removeAttribute("style");
        this.spans[1].removeAttribute("style");
        this.spans[2].removeAttribute("style");
        this.spans[3].removeAttribute("style");

        pause(500).then(() => {
            this.isAnimated = false;
        });
    }

    #crossEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[0].style.cssText = "left: 50%; width: 0px;";
            this.spans[1].style.cssText = "transform: rotate(45deg);";
            this.spans[2].style.cssText = "transform: rotate(-45deg);";
            this.spans[3].style.cssText = "left: 50%; width: 0px";

            pause(500).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.#removeStyles();
        }
    }

    #winkEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[0].style.cssText = "top: 48%; transform: rotate(45deg);";
            this.spans[1].style.cssText = "width: 0px;";
            this.spans[2].style.cssText = "width: 0px; left: 80%;";
            this.spans[3].style.cssText = "top: 48%; transform: rotate(-45deg);";

            pause(500).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.#removeStyles();
        }
    }

    #winkReverseEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[0].style.cssText = "top: 48%; transform: rotate(-45deg);";
            this.spans[1].style.cssText = "width: 0px;";
            this.spans[2].style.cssText = "width: 0px; left: 80%;";
            this.spans[3].style.cssText = "top: 48%; transform: rotate(45deg);";

            pause(500).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.#removeStyles();
        }
    }

    #bounceEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[0].style.cssText = "left: 50%; width: 0px;";
            this.spans[1].style.cssText = "transition: all 1s; transform: rotate(225deg);";
            this.spans[2].style.cssText = "transition: all 1s; transform: rotate(-225deg);";
            this.spans[3].style.cssText = "left: 50%; width: 0px;";

            pause(500).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.spans[1].style.cssText = "transition: all 1s; transform: rotate(0deg);";
            this.spans[2].style.cssText = "transition: all 1s; transform: rotate(0deg);";

            pause(400).then(() => {
                this.#removeStyles();
            });
        }
    }

    #rotateEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .9s; transform: rotate(360deg);";
            this.spans[0].style.cssText = "transition: all .8s; left: 50%; width: 0px;";
            this.spans[1].style.cssText = "transition: all .8s; transform: rotate(45deg);";
            this.spans[2].style.cssText = "transition: all .8s; transform: rotate(-45deg);";
            this.spans[3].style.cssText = "transition: all .8s; left: 50%; width: 0px;";

            pause(500).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .9s; transform: rotate(0deg);";
            this.spans[0].style.cssText = "transition: all .8s; left: 20%; width: 60%;";
            this.spans[1].style.cssText = "transition: all .8s; transform: rotate(0deg);";
            this.spans[2].style.cssText = "transition: all .8s; transform: rotate(0deg);";
            this.spans[3].style.cssText = "transition: all .8s; left: 20%; width: 60%;";

            pause(800).then(() => {
                this.#removeStyles();
            });
        }
    }

    #rotateReverseEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .9s; transform: rotate(-360deg);";
            this.spans[0].style.cssText = "transition: all .8s; left: 50%; width: 0px;";
            this.spans[1].style.cssText = "transition: all .8s; transform: rotate(45deg);";
            this.spans[2].style.cssText = "transition: all .8s; transform: rotate(-45deg);";
            this.spans[3].style.cssText = "transition: all .8s; left: 50%; width: 0px;";

            pause(800).then(() => {
                this.#removeStyles();
            });
        } else {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .9s; transform: rotate(0deg);";
            this.spans[0].style.cssText = "transition: all .8s; left: 20%; width: 60%;";
            this.spans[1].style.cssText = "transition: all .8s; transform: rotate(0deg);";
            this.spans[2].style.cssText = "transition: all .8s; transform: rotate(0deg);";
            this.spans[3].style.cssText = "transition: all .8s; left: 20%; width: 60%;";

            pause(800).then(() => {
                this.#removeStyles();
            });
        }
    }

    #pushEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[0].style.cssText = "transition: .6s; left: 80%; width: 0px;";
            this.spans[1].style.cssText = "transition: .6s; transform: rotate(45deg);";
            this.spans[2].style.cssText = "transition: .6s; transform: rotate(135deg);";
            this.spans[3].style.cssText = "transition: .6s; left: 20%; width: 0px;";

            pause(500).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.spans[0].style.cssText = "transition: all .6s; left: 20%; width: 60%;";
            this.spans[1].style.cssText = "transition: all .6s; transform: rotate(0deg);";
            this.spans[2].style.cssText = "transition: all .6s; transform: rotate(0deg);";
            this.spans[3].style.cssText = "transition: all .6s; left: 20%; width: 60%;";

            pause(800).then(() => {
                this.#removeStyles();
            });
        }
    }

    #pushReverseEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[0].style.cssText = "transition: .6s; left: 20%; width: 0px;";
            this.spans[1].style.cssText = "transition: .6s; transform: rotate(-45deg);";
            this.spans[2].style.cssText = "transition: .6s; transform: rotate(-135deg);";
            this.spans[3].style.cssText = "transition: .6s; left: 80%; width: 0px;";

            pause(500).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.spans[0].style.cssText = "transition: all .6s; left: 20%; width: 60%;";
            this.spans[1].style.cssText = "transition: all .6s; transform: rotate(0deg);";
            this.spans[2].style.cssText = "transition: all .6s; transform: rotate(0deg);";
            this.spans[3].style.cssText = "transition: all .6s; left: 20%; width: 60%;";

            pause(800).then(() => {
                this.#removeStyles();
            });
        }
    }

    #asyncEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[1].style.cssText = "width: 0px;";
            this.spans[2].style.cssText = "width: 0px; left: 80%";
            this.spans[3].style.cssText = "top: 48%; transform: rotate(225deg);";

            pause(200).then(() => {
                this.spans[0].style.cssText = "top: 48%; transform: rotate(-225deg);";
            });

            pause(700).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.spans[0].removeAttribute("style");
            this.spans[1].removeAttribute("style");
            this.spans[2].removeAttribute("style");

            pause(200).then(() => {
                this.#removeStyles();
            });
        }
    }

    #asyncReverseEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.spans[0].style.cssText = "top: 48%; transform: rotate(225deg);";
            this.spans[1].style.cssText = "width: 0px;";
            this.spans[2].style.cssText = "width: 0px; left: 80%";

            pause(200).then(() => {
                this.spans[3].style.cssText = "top: 48%; transform: rotate(-225deg);";
            });

            pause(700).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.spans[1].removeAttribute("style");
            this.spans[2].removeAttribute("style");
            this.spans[3].removeAttribute("style");

            pause(200).then(() => {
                this.#removeStyles();
            });
        }
    }

    #spinEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .5s; transform: rotate(90deg);";
            this.spans[1].style.cssText = "width: 0px;";
            this.spans[2].style.cssText = "width: 0px; left: 80%;";

            pause(200).then(() => {
                this.spans[0].style.cssText = "top: 48%; transform: rotate(45deg);";
                this.spans[3].style.cssText = "top: 48%; transform: rotate(135deg);";
            });

            pause(700).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .5s; transform: rotate(0deg);";
            this.spans[0].removeAttribute("style");
            this.spans[3].removeAttribute("style");

            pause(200).then(() => {
                this.#removeStyles();
            });
        }
    }

    #spinReverseEffect() {
        if (this.isOpen) {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .5s; transform: rotate(90deg);";
            this.spans[1].style.cssText = "width: 0px;";
            this.spans[2].style.cssText = "width: 0px; left: 80%;";

            pause(200).then(() => {
                this.spans[0].style.cssText = "top: 48%; transform: rotate(-45deg);";
                this.spans[3].style.cssText = "top: 48%; transform: rotate(-135deg);";
            });

            pause(700).then(() => {
                this.isAnimated = false;
            });
        } else {
            this.isAnimated = true;

            this.container.style.cssText = "transition: all .5s; transform: rotate(0deg);";
            this.spans[0].removeAttribute("style");
            this.spans[3].removeAttribute("style");

            pause(200).then(() => {
                this.#removeStyles();
            });
        }
    }

    static styles = [
        css`
            :host {
                display: inline-flex;
                position: relative;
                width: 50px;
                height: 50px;
                align-items: stretch;
                justify-content: stretch;
            }
            .container {
                position: relative;
                cursor: pointer;
                flex: 1 1 0;
                border-radius: 40%;
                overflow: hidden;
                background-color: transparent;
                border: none;
                color: currentColor;
                transition: all 0.2s ease;
            }

            /* Focus styles for better accessibility */
            .container:focus-visible,
            .container:focus {
                outline: 2px solid var(--mjo-primary-color, #1aa8ed);
                outline-offset: 2px;
            }
            .container[data-color="secondary"]:focus,
            .container[data-color="secondary"]:focus-visible {
                outline: 2px solid var(--mjo-secondary-color, #7dc717);
            }
            .container[data-color="success"]:focus,
            .container[data-color="success"]:focus-visible {
                outline: 2px solid var(--mjo-color-success, #20d338);
            }
            .container[data-color="info"]:focus,
            .container[data-color="info"]:focus-visible {
                outline: 2px solid var(--mjo-color-info, #2065cc);
            }
            .container[data-color="warning"]:focus,
            .container[data-color="warning"]:focus-visible {
                outline: 2px solid var(--mjo-color-warning, #df950c);
            }
            .container[data-color="error"]:focus,
            .container[data-color="error"]:focus-visible {
                outline: 2px solid var(--mjo-color-error, #cf2a2a);
            }

            /* Disabled state */
            .container:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .container:disabled:hover {
                color: currentColor;
            }

            /* Color variants */
            .container[data-color="primary"]:hover:not(:disabled) {
                color: var(--mjo-menu-button-color-hover, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-color="secondary"]:hover:not(:disabled) {
                color: var(--mjo-menu-button-color-hover, var(--mjo-secondary-color, #7dc717));
            }
            .container[data-color="success"]:hover:not(:disabled) {
                color: var(--mjo-menu-button-color-hover, var(--mjo-color-success, #20d338));
            }
            .container[data-color="info"]:hover:not(:disabled) {
                color: var(--mjo-menu-button-color-hover, var(--mjo-color-info, #2065cc));
            }
            .container[data-color="warning"]:hover:not(:disabled) {
                color: var(--mjo-menu-button-color-hover, var(--mjo-color-warning, #df950c));
            }
            .container[data-color="error"]:hover:not(:disabled) {
                color: var(--mjo-menu-button-color-hover, var(--mjo-color-error, #cf2a2a));
            }

            span {
                position: absolute;
                left: 20%;
                right: 20%;
                height: 2px;
                background-color: currentColor;
                transition: all 0.5s;
            }

            /* Respect user's motion preferences */
            @media (prefers-reduced-motion: reduce) {
                span {
                    transition: none;
                }
                .container {
                    transition: none;
                }
            }

            .menu-button {
                position: absolute;
                inset: 0;
            }
            .menu-button span:nth-child(1) {
                top: 28%;
            }
            .menu-button span:nth-child(2) {
                top: 48%;
            }
            .menu-button span:nth-child(3) {
                top: 48%;
            }
            .menu-button span:nth-child(4) {
                top: 68%;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-menu-button": MjoMenuButton;
    }

    interface HTMLElementEventMap {
        "mjo-menu-button:toggle": MjoMenuButtonToggleEvent;
        "mjo-menu-button:open": MjoMenuButtonOpenEvent;
        "mjo-menu-button:close": MjoMenuButtonCloseEvent;
    }
}
