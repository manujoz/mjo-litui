import { MjoImageClickEvent, MjoImageErrorEvent, MjoImageFit, MjoImageLoadEvent } from "./types/mjo-image.js";

import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import ImageNotAvailable from "./utils/svg/no-image.js";

/**
 * @summary A responsive image component with error handling, loading states, and accessibility features.
 *
 * @description The mjo-image component provides a robust image rendering solution with built-in
 * error handling, loading states, clickable interactions, and comprehensive accessibility support.
 * It automatically falls back to a placeholder SVG when image loading fails.
 *
 * @fires mjo-image:load - Fired when image loads successfully
 * @fires mjo-image:error - Fired when image fails to load
 * @fires mjo-image:click - Fired when clickable image is clicked
 */
@customElement("mjo-image")
export class MjoImage extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) src = "";
    @property({ type: String }) alt?: string;
    @property({ type: String }) fit: MjoImageFit = "cover";
    @property({ type: Boolean }) loading = false;
    @property({ type: Boolean }) clickable = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) lazy = false;

    // ARIA Properties (using Lit's native support)
    @property({ type: String, attribute: "aria-label", reflect: true }) override ariaLabel: string | null = null;
    @property({ type: String, attribute: "aria-labelledby", reflect: true }) ariaLabelledBy?: string;
    @property({ type: String, attribute: "aria-describedby", reflect: true }) ariaDescribedBy?: string;

    @state() private error = false;
    @state() private svgImage?: string;

    @query("img") private img!: HTMLImageElement;

    private get roleAssignment() {
        if (this.clickable && !this.disabled) return "button";
        if (this.error) return "presentation";
        return "img";
    }

    private get tabIndexAssignment() {
        if (this.clickable && !this.disabled) return 0;
        return -1;
    }

    private get computedAriaLabel() {
        if (this.ariaLabel) return this.ariaLabel;
        if (this.error) return "Image failed to load";
        if (this.loading) return "Image loading";
        return this.alt;
    }

    render() {
        const loadingSpinner = html`
            <div class="loading-spinner" role="status" aria-label="Loading image">
                <svg viewBox="0 0 24 24" class="spinner">
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-dasharray="31.416"
                        stroke-dashoffset="31.416"
                    >
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite" />
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>
        `;

        if (this.loading) {
            return html`<div class="container loading" role="img" aria-label=${this.computedAriaLabel || "Loading image"}>${loadingSpinner}</div>`;
        }

        if (this.error) {
            return html`
                <div
                    class="container error ${this.clickable ? "clickable" : ""}"
                    role=${this.roleAssignment}
                    tabindex=${this.tabIndexAssignment}
                    aria-label=${this.computedAriaLabel || "Image failed to load"}
                    aria-describedby=${ifDefined(this.ariaDescribedBy)}
                    ?data-clickable=${this.clickable}
                    ?data-disabled=${this.disabled}
                    @click=${this.#handleClick}
                    @keydown=${this.#handleKeydown}
                >
                    ${unsafeSVG(this.svgImage)}
                </div>
            `;
        }

        return html`
            <div
                class="container ${this.clickable ? "clickable" : ""}"
                role=${this.roleAssignment}
                tabindex=${this.tabIndexAssignment}
                aria-label=${ifDefined(this.computedAriaLabel)}
                aria-labelledby=${ifDefined(this.ariaLabelledBy)}
                aria-describedby=${ifDefined(this.ariaDescribedBy)}
                ?data-clickable=${this.clickable}
                ?data-disabled=${this.disabled}
                @click=${this.#handleClick}
                @keydown=${this.#handleKeydown}
            >
                <img
                    class=${`${this.fit}`}
                    src=${this.src}
                    alt=${ifDefined(this.alt)}
                    loading=${this.lazy ? "lazy" : "eager"}
                    @load=${this.#handleLoad}
                    @error=${this.#handleError}
                />
            </div>
        `;
    }

    #handleLoad(event: Event) {
        const img = event.target as HTMLImageElement;
        this.error = false;

        const loadEvent = new CustomEvent("mjo-image:load", {
            detail: {
                element: this,
                src: this.src,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
            },
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(loadEvent);
    }

    #handleError() {
        this.error = true;
        this.svgImage = ImageNotAvailable;

        if (this.img) {
            this.img.classList.add("error");
        }

        const errorEvent = new CustomEvent("mjo-image:error", {
            detail: {
                element: this,
                src: this.src,
                error: "Failed to load image",
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(errorEvent);
    }

    #handleClick(event: Event) {
        if (!this.clickable || this.disabled) return;

        event.preventDefault();
        event.stopPropagation();

        const clickEvent = new CustomEvent("mjo-image:click", {
            detail: {
                element: this,
                src: this.src,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(clickEvent);
    }

    #handleKeydown(event: KeyboardEvent) {
        if (!this.clickable || this.disabled) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            this.#handleClick(event);
        }
    }

    static styles = [
        css`
            :host {
                width: 100%;
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }

            .container {
                width: 100%;
                height: 100%;
                position: relative;
                display: inline-block;
                vertical-align: inherit;
            }

            .container.clickable {
                cursor: var(--mjo-image-clickable-cursor, pointer);
                transition: transform 0.15s ease-in-out;
                outline: none;
            }

            .container.clickable:hover {
                transform: var(--mjo-image-clickable-hover-scale, scale(1.02));
            }

            .container.clickable:focus-visible {
                outline: var(--mjo-image-focus-outline, 2px solid var(--mjo-primary-color, #007bff));
                outline-offset: 2px;
            }

            .container[data-disabled] {
                opacity: var(--mjo-image-disabled-opacity, 0.6);
                cursor: not-allowed;
                pointer-events: none;
            }

            .container.loading {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--mjo-image-loading-background-color, #f5f5f5);
                border-radius: var(--mjo-image-error-radius, 5px);
            }

            .loading-spinner {
                width: var(--mjo-image-loading-size, 24px);
                height: var(--mjo-image-loading-size, 24px);
                color: var(--mjo-image-loading-color, #666);
            }

            .spinner {
                width: 100%;
                height: 100%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }

            img,
            svg {
                width: inherit;
                height: inherit;
                object-fit: cover;
                vertical-align: inherit;
                border-radius: inherit;
            }

            img.contain {
                object-fit: contain;
            }

            img.cover {
                object-fit: cover;
            }

            img.fill {
                object-fit: fill;
            }

            img.none {
                object-fit: none;
            }

            img.scale-down {
                object-fit: scale-down;
            }

            .container.error svg {
                background-color: var(--mjo-image-error-background-color, #e0e0e0);
                border-radius: var(--mjo-image-error-radius, 5px);
                object-fit: contain;
                padding: 8px;
            }

            /* Prefers reduced motion */
            @media (prefers-reduced-motion: reduce) {
                .container.clickable {
                    transition: none;
                }

                .container.clickable:hover {
                    transform: none;
                }

                .spinner {
                    animation: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-image": MjoImage;
    }

    interface HTMLElementEventMap {
        "mjo-image:load": MjoImageLoadEvent;
        "mjo-image:error": MjoImageErrorEvent;
        "mjo-image:click": MjoImageClickEvent;
    }
}
