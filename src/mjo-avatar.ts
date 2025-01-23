import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin";

import { AiOutlineUser } from "mjo-icons/ai";

@customElement("mjo-avatar")
export class MjoAvatar extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: Boolean }) bordered = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) showFallback = false;
    @property({ type: Boolean }) nameColoured = false;
    @property({ type: String }) fallback?: string;
    @property({ type: String }) alt?: string;
    @property({ type: String }) color: "default" | "primary" | "secondary" | "success" | "warning" | "info" | "error" = "default";
    @property({ type: String }) name?: string;
    @property({ type: String }) radius: "small" | "medium" | "large" | "full" | "none" = "full";
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) src?: string;

    @state() private initial = "";
    @state() private fallbackIcon?: TemplateResult<1>;
    @state() private error = false;

    @query(".image.name") private nameElement!: HTMLImageElement;

    render() {
        return html`<div
            class="container size-${this.size} radius-${this.radius} color-${this.color}"
            ?data-bordered=${this.bordered}
            ?data-disabled=${this.disabled}
        >
            ${this.src && !this.error
                ? html`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${ifDefined(this.alt || this.name)} @error=${this.#handleError} />
                  </div>`
                : this.fallback && this.showFallback
                  ? html`<div class="image fallback radius-${this.radius} font-size-${this.size}">${this.fallbackIcon}</div>`
                  : this.name
                    ? html`<div class="image name radius-${this.radius} font-size-${this.size}"><span>${this.initial}</span></div>`
                    : html`<div class="image radius-${this.radius}"></div>`}
        </div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.src && this.showFallback && !this.fallback) {
            this.showFallback = true;
            this.#setFallback();
        }

        if (this.name) {
            this.initial = this.name[0].toUpperCase();
        }
    }

    protected updated(): void {
        if (this.name && this.nameColoured) {
            const [bg, fg] = this.#colorByInitial();
            this.nameElement.style.backgroundColor = bg;
            this.nameElement.style.color = fg;
        } else {
            this.nameElement.style.backgroundColor = "";
            this.nameElement.style.color = "";
        }

        if (this.name) {
            this.initial = this.name[0].toUpperCase();
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

    #handleError() {
        this.error = true;
        this.showFallback = true;

        if (!this.showFallback) {
            this.#setFallback();
        }
    }

    #setFallback() {
        const icon = this.fallback || AiOutlineUser;
        this.fallbackIcon = html`<mjo-icon src=${icon}></mjo-icon>`;
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
            }
            .container[data-disabled] {
                opacity: 0.5;
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

            .font-size-small {
                font-size: var(--mjo-avatar-fallback-size-small, 18px);
            }
            .font-size-medium {
                font-size: var(--mjo-avatar-fallback-size-medium, 24px);
            }
            .font-size-large {
                font-size: var(--mjo-avatar-fallback-size-large, 32px);
            }
            .font-size-small mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-small, 18px);
            }
            .font-size-medium mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-medium, 24px);
            }
            .font-size-large mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-large, 32px);
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
                width: var(--mjo-avatar-size-medium, 40px);
                height: var(--mjo-avatar-size-medium, 40px);
            }
            .size-large {
                width: var(--mjo-avatar-size-large, 48px);
                height: var(--mjo-avatar-size-large, 48px);
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
            .container[data-bordered] .size-small {
                width: calc(var(--mjo-avatar-size-small, 32px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-small, 32px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .size-medium {
                width: calc(var(--mjo-avatar-size-medium, 40px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-medium, 40px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .size-large {
                width: calc(var(--mjo-avatar-size-large, 48px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-large, 48px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .font-size-small {
                font-size: calc(var(--mjo-avatar-fallback-size-small, 18px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .font-size-medium {
                font-size: calc(var(--mjo-avatar-fallback-size-medium, 24px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .font-size-large {
                font-size: calc(var(--mjo-avatar-fallback-size-large, 32px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .font-size-small mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-small, 18px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .font-size-medium mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-medium, 24px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered] .font-size-large mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-large, 32px) - var(--mjo-avatar-border-width, 2px));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-avatar": MjoAvatar;
    }
}
