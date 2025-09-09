import { MjoIconAnimation, MjoIconClickEvent, MjoIconErrorEvent, MjoIconLoadEvent, MjoIconSize } from "./types/mjo-icon.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-ripple.js";

/**
 * @summary Flexible SVG icon component with accessibility support, theming, and interaction capabilities.
 *
 * @description The mjo-icon component renders SVG icons with built-in accessibility features,
 * predefined sizes, animations, and click handling. It validates SVG content and provides
 * comprehensive event feedback.
 *
 * @fires mjo-icon:click - Fired when the icon is clicked (only when clickable)
 * @fires mjo-icon:load - Fired when SVG content is successfully loaded and rendered
 * @fires mjo-icon:error - Fired when SVG content is invalid or fails to load
 *
 * @slot - No slots available (content provided via src property)
 * @csspart icon - The SVG icon element
 */
@customElement("mjo-icon")
export class MjoIcon extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) src?: string;
    @property({ type: String }) size?: MjoIconSize;
    @property({ type: String }) animation: MjoIconAnimation = "none";
    @property({ type: Boolean }) clickable = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) loading = false;

    // ARIA Properties (using Lit's native support)
    @property({ type: String, attribute: "aria-label", reflect: true }) override ariaLabel: string | null = null;
    @property({ type: String, attribute: "aria-labelledby", reflect: true }) ariaLabelledBy?: string;
    @property({ type: String, attribute: "aria-describedby", reflect: true }) ariaDescribedBy?: string;

    @state() private hasError = false;

    private get roleAssignment() {
        return this.role ? (this.role as "button" | undefined) : this.clickable && !this.disabled ? "button" : undefined;
    }

    private get tabIndexAssignment() {
        return this.clickable && !this.disabled ? 0 : undefined;
    }

    render() {
        if ((!this.src && !this.loading) || this.hasError) {
            return nothing;
        }

        if (this.loading) {
            return this.#renderLoadingSpinner();
        }

        const classes = this.#getClasses();

        return html`
            <div
                class="icon-container ${classes}"
                part="icon"
                tabindex=${ifDefined(this.tabIndexAssignment)}
                role=${ifDefined(this.roleAssignment)}
                @click=${this.#handleClick}
                @keydown=${this.#handleKeydown}
            >
                ${unsafeSVG(this.src)} ${this.clickable && !this.disabled ? html`<mjo-ripple></mjo-ripple>` : nothing}
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.#validateAndProcessSrc();
    }

    updated(changedProperties: Map<string, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has("src")) {
            this.#validateAndProcessSrc();
        }
    }

    // Public methods
    focus(): void {
        if (this.clickable && !this.disabled) {
            const container = this.shadowRoot?.querySelector(".icon-container") as HTMLElement;
            container?.focus();
        }
    }

    blur(): void {
        const container = this.shadowRoot?.querySelector(".icon-container") as HTMLElement;
        container?.blur();
    }

    // Private methods
    #validateAndProcessSrc(): void {
        if (!this.src) {
            this.hasError = false;
            return;
        }

        // Basic SVG validation
        const trimmedSrc = this.src.trim();
        if (!trimmedSrc.startsWith("<svg") || !trimmedSrc.endsWith("</svg>")) {
            this.hasError = true;
            this.#dispatchErrorEvent("Invalid SVG format: SVG must start with <svg and end with </svg>");
            return;
        }

        // Try to parse as DOM to validate
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.src, "image/svg+xml");
            const parseError = doc.querySelector("parsererror");

            if (parseError) {
                throw new Error("SVG parsing error");
            }

            this.hasError = false;
            this.#dispatchLoadEvent();
        } catch (error) {
            this.hasError = true;
            this.#dispatchErrorEvent("Failed to parse SVG content");
        }
    }

    #getClasses(): string {
        const classes = [];

        if (this.clickable) classes.push("clickable");
        if (this.disabled) classes.push("disabled");
        if (this.animation !== "none") classes.push(`animate-${this.animation}`);
        if (this.size) classes.push(`size-${this.size}`);

        return classes.join(" ");
    }

    #renderLoadingSpinner() {
        const size = this.size ? `size-${this.size}` : "size-medium";

        return html`
            <div class="loading-spinner ${size}" part="icon">
                <svg viewBox="0 0 24 24" fill="none">
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-dasharray="15.708"
                        stroke-dashoffset="62.832"
                        fill="none"
                    >
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from="0 12 12"
                            to="360 12 12"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </svg>
            </div>
        `;
    }

    #handleClick(): void {
        if (!this.clickable || this.disabled || this.loading) {
            return;
        }

        this.#dispatchClickEvent();
    }

    #handleKeydown(event: KeyboardEvent): void {
        if (!this.clickable || this.disabled || this.loading) {
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.#dispatchClickEvent();
        }
    }

    #dispatchClickEvent(): void {
        this.dispatchEvent(
            new CustomEvent<MjoIconClickEvent["detail"]>("mjo-icon:click", {
                detail: {
                    element: this,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #dispatchLoadEvent(): void {
        this.dispatchEvent(
            new CustomEvent<MjoIconLoadEvent["detail"]>("mjo-icon:load", {
                detail: {
                    element: this,
                    src: this.src!,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    #dispatchErrorEvent(error: string): void {
        this.dispatchEvent(
            new CustomEvent<MjoIconErrorEvent["detail"]>("mjo-icon:error", {
                detail: {
                    element: this,
                    error,
                    src: this.src,
                },
                bubbles: true,
                composed: true,
            }),
        );
    }

    static styles = [
        css`
            :host {
                position: relative;
                display: inline-block;
                color: currentColor;
            }

            :host([disabled]) {
                opacity: var(--mjo-icon-disabled-opacity, 0.5);
                pointer-events: none;
                cursor: not-allowed;
            }
            .icon-container {
                position: relative;
                display: block;
                width: 1em;
                height: 1em;
                transition: var(--mjo-icon-transition, all 0.3s);
            }

            .icon-container.clickable {
                cursor: pointer;
                border-radius: var(--mjo-icon-border-radius, 999px);
                padding: var(--mjo-icon-padding, 0.2em);
                transition: var(--mjo-icon-transition, all 0.2s ease);
                transform-origin: center;
                overflow: hidden;
            }

            .icon-container.clickable:hover {
                background-color: var(--mjo-color-gray-alpha3);
            }

            .icon-container.clickable:focus-visible {
                outline: var(--mjo-icon-clickable-focus-outline, 2px solid currentColor);
                outline-offset: 2px;
            }

            .icon-container.clickable:active {
                transform: scale(0.95);
            }

            .icon-container.disabled {
                opacity: var(--mjo-icon-disabled-opacity, 0.5);
                pointer-events: none;
                cursor: not-allowed;
            }

            /* Size variations */
            .size-small {
                font-size: var(--mjo-icon-size-small, 16px);
            }

            .size-medium {
                font-size: var(--mjo-icon-size-medium, 24px);
            }

            .size-large {
                font-size: var(--mjo-icon-size-large, 32px);
            }

            .size-xl {
                font-size: var(--mjo-icon-size-xl, 48px);
            }

            /* Animations */
            .animate-spin {
                animation: spin var(--mjo-icon-loading-spin-duration, 1s) linear infinite;
            }

            .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }

            .animate-rotate {
                animation: rotate 2s ease-in-out infinite;
            }

            /* Loading spinner styles */
            .loading-spinner {
                display: block;
                width: 1em;
                height: 1em;
            }

            .loading-spinner svg {
                display: block;
                width: 100%;
                height: 100%;
            }

            /* SVG styles */
            svg {
                position: relative;
                display: block;
                width: 1em;
                height: 1em;
                fill: currentColor;
                transition: inherit;
            }

            /* Keyframes */
            @keyframes spin {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }

            @keyframes pulse {
                0%,
                100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }

            @keyframes rotate {
                0%,
                100% {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(180deg);
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-icon": MjoIcon;
    }

    interface HTMLElementEventMap {
        "mjo-icon:click": MjoIconClickEvent;
        "mjo-icon:load": MjoIconLoadEvent;
        "mjo-icon:error": MjoIconErrorEvent;
    }
}
