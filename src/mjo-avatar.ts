import { LitElement, PropertyValues, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { pause } from "./utils/utils.js";

@customElement("mjo-avatar")
export class MjoAvatar extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Boolean }) bordered = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) clickable = false;
    @property({ type: Boolean }) nameColoured = false;
    @property({ type: String }) fallbackIcon?: string;
    @property({ type: String }) alt?: string;
    @property({ type: String }) color: "default" | "primary" | "secondary" | "success" | "warning" | "info" | "error" = "default";
    @property({ type: String }) name?: string;
    @property({ type: String }) radius: "small" | "medium" | "large" | "full" | "none" = "full";
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) src?: string;
    @property({ type: String }) value?: string;
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    @state() private error = false;

    @query(".container") private container!: HTMLElement;

    private initial = "";

    private get appropriateRole() {
        if (this.clickable) return "button";
        if (this.src) return "img";
        return "presentation";
    }

    private get computedAriaLabel() {
        if (this.ariaLabel) return this.ariaLabel;

        if (this.clickable) {
            const nameOrValue = this.name || this.value || "avatar";
            return `Click to interact with ${nameOrValue}`;
        }
        if (this.name) {
            return `Avatar for ${this.name}`;
        }
        return "Avatar";
    }

    render() {
        this.initial = this.name ? this.name[0].toLocaleUpperCase() : "";

        return html`<div
            class="container size-${this.size} radius-${this.radius} color-${this.color}"
            role=${this.appropriateRole}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${ifDefined(this.ariaDescribedby)}
            aria-disabled=${this.disabled ? "true" : "false"}
            tabindex=${this.clickable ? this.tabIndex ?? 0 : -1}
            ?data-bordered=${this.bordered}
            ?data-disabled=${this.disabled}
            ?data-clickable=${this.clickable}
            @click=${this.#handleClick}
            @keydown=${this.#handleKeydown}
        >
            ${this.src && !this.error
                ? html`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${ifDefined(this.alt || this.name)} @error=${this.#handleError} />
                  </div>`
                : this.fallbackIcon
                  ? html`<div class="image fallback radius-${this.radius} font-size-${this.size}"><mjo-icon src=${this.fallbackIcon}></mjo-icon></div>`
                  : this.name
                    ? html`<div class="image name radius-${this.radius} font-size-${this.size}"><span>${this.initial}</span></div>`
                    : html`<div class="image radius-${this.radius}"></div>`}
        </div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.name) {
            this.initial = this.name[0].toUpperCase();
        }
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("name")) {
            this.initial = this.name ? this.name[0].toUpperCase() : "";
        }

        if (_changedProperties.has("src")) {
            this.error = false;
        }

        // Query for nameElement each time to avoid stale references
        const nameElement = this.shadowRoot?.querySelector(".image.name") as HTMLElement | null;

        if (this.name && this.nameColoured && nameElement) {
            const [bg, fg] = this.#colorByInitial();
            nameElement.style.backgroundColor = bg;
            nameElement.style.color = fg;
        } else if (nameElement) {
            nameElement.style.backgroundColor = "";
            nameElement.style.color = "";
        }
    }

    #colorByInitial() {
        const backgroundColors = [
            "#e72c2c",
            "#e7902c",
            "#f1db13",
            "#c1f113",
            "#59f113",
            "#26b632",
            "#19da90",
            "#10dfcd",
            "#0ab4df",
            "#0a78df",
            "#0a43df",
            "#6d0adf",
            "#985cdd",
            "#c85cdd",
            "#dd5cc8",
            "#c7199b",
            "#c7194d",
        ];
        const foregroundColors = [
            "#fff",
            "#fff",
            "#000",
            "#000",
            "#000",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
        ];

        const bgindex = this.initial.charCodeAt(0) % backgroundColors.length;
        const fgindex = this.initial.charCodeAt(0) % foregroundColors.length;

        return [backgroundColors[bgindex], foregroundColors[fgindex]];
    }

    #handleKeydown(event: KeyboardEvent) {
        if (!this.clickable || this.disabled) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.#handleClick();
        }
    }

    async #handleClick() {
        if (!this.clickable || this.disabled) return;

        this.dispatchEvent(new CustomEvent("mjo-avatar:click", { detail: { value: this.value || this.name || "" } }));

        this.container.style.transform = "scale(0.9)";
        await pause(100);
        this.container.style.transform = "scale(1.1)";
        await pause(150);
        this.container.removeAttribute("style");
    }

    #handleError() {
        this.error = true;
        this.dispatchEvent(
            new CustomEvent("mjo-avatar:error", {
                detail: { message: "Failed to load avatar image" },
            }),
        );
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                vertical-align: middle;
            }

            .container {
                position: relative;
                box-sizing: border-box;
                user-select: none;
            }
            .container[data-disabled] {
                opacity: 0.5;
                cursor: default !important;
            }

            .image {
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: var(--mjo-avatar-background-color, var(--mjo-color-gray-400));
                transition-property: background-color border-color border-radius;
                transition-duration: 0.3s;
            }
            .image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                vertical-align: middle;
            }

            .fallback {
                display: grid;
                place-content: center;
                color: var(--mjo-avatar-fallback-color, var(--mjo-color-gray-100));
            }
            .name {
                display: grid;
                place-content: center;
                font-weight: bold;
                background-color: var(--mjo-avatar-name-auto-background-color, var(--mjo-avatar-background-color, var(--mjo-color-gray-400)));
                color: var(--mjo-avatar-name-auto-foreground-color, var(--mjo-avatar-name-color, var(--mjo-color-gray-100)));
            }

            .size-small {
                font-size: var(--mjo-avatar-fallback-size-small, 18px);
            }
            .size-medium {
                font-size: var(--mjo-avatar-fallback-size-medium, 28px);
            }
            .size-large {
                font-size: var(--mjo-avatar-fallback-size-large, 40px);
            }
            .size-small mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-small, 18px);
            }
            .size-medium mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-medium, 28px);
            }
            .size-large mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-large, 40px);
            }
            .radius-small {
                border-radius: var(--mjo-avatar-radius-small, 4px);
            }
            .radius-medium {
                border-radius: var(--mjo-avatar-radius-medium, 8px);
            }
            .radius-large {
                border-radius: var(--mjo-avatar-radius-large, 12px);
            }
            .radius-full {
                border-radius: 50%;
            }
            .size-small {
                width: var(--mjo-avatar-size-small, 32px);
                height: var(--mjo-avatar-size-small, 32px);
            }
            .size-medium {
                width: var(--mjo-avatar-size-medium, 44px);
                height: var(--mjo-avatar-size-medium, 44px);
            }
            .size-large {
                width: var(--mjo-avatar-size-large, 54px);
                height: var(--mjo-avatar-size-large, 54px);
            }
            .color-default {
                border-color: var(--mjo-avatar-name-auto-background-color, var(--mjo-avatar-border-color, var(--mjo-color-gray-300)));
            }
            .color-primary {
                border-color: var(--mjo-primary-color, #1976d2);
            }
            .color-secondary {
                border-color: var(--mjo-secondary-color, #cc3d74);
            }
            .color-success {
                border-color: var(--mjo-success-color, #4caf50);
            }
            .color-warning {
                border-color: var(--mjo-warning-color, #ff9800);
            }
            .color-info {
                border-color: var(--mjo-info-color, #128ada);
            }
            .color-error {
                border-color: var(--mjo-error-color, #f44336);
            }

            .container[data-bordered] {
                border-style: solid;
                border-width: var(--mjo-avatar-border-width, 2px);
                padding: 2px;
            }
            .container[data-bordered].size-small {
                width: calc(var(--mjo-avatar-size-small, 32px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-small, 32px) - var(--mjo-avatar-border-width, 2px));
                font-size: calc(var(--mjo-avatar-fallback-size-small, 18px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-medium {
                width: calc(var(--mjo-avatar-size-medium, 44px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-medium, 44px) - var(--mjo-avatar-border-width, 2px));
                font-size: calc(var(--mjo-avatar-fallback-size-medium, 26px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-large {
                width: calc(var(--mjo-avatar-size-large, 54px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-large, 54px) - var(--mjo-avatar-border-width, 2px));
                font-size: calc(var(--mjo-avatar-fallback-size-large, 36px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-small mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-small, 18px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-medium mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-medium, 26px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-large mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-large, 36px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-clickable] {
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            .container:focus-visible {
                outline: 2px solid var(--mjo-primary-color, #005fcc);
                outline-offset: 2px;
            }
            .container[data-clickable]:focus-visible {
                outline: 2px solid var(--mjo-primary-color, #005fcc);
                outline-offset: 2px;
            }

            @media (prefers-reduced-motion: reduce) {
                .container[data-clickable] {
                    transition: none;
                }
                .image {
                    transition: none;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-avatar": MjoAvatar;
    }

    interface HTMLElementEventMap {
        "mjo-avatar:click": CustomEvent<{ value: string }>;
        "mjo-avatar:error": CustomEvent<{ message: string }>;
    }
}
