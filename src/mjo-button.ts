import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { FormMixin } from "./mixins/form-mixin.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./mjo-icon.js";
import "./mjo-ripple.js";

/**
 * An example element.
 *
 * @slot - Text button
 * @csspart button - The button
 */
@customElement("mjo-button")
export class MjoButton extends ThemeMixin(FormMixin(LitElement)) implements IThemeMixin {
    @property({ type: Boolean, reflect: true }) fullwidth = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) loading = false;
    @property({ type: Boolean, reflect: true }) rounded = false;
    @property({ type: Boolean }) toggleable = false;
    @property({ type: Boolean }) smallCaps = false;
    @property({ type: Boolean }) noink = false;
    @property({ type: String }) startIcon?: string;
    @property({ type: String }) endIcon?: string;
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: String }) variant: "default" | "ghost" | "dashed" | "link" | "text" = "default";
    @property({ type: String }) type: "button" | "submit" | "reset" | "menu" = "button";

    @state() private toggle = false;

    render() {
        return html`<button
            type=${this.type}
            data-color=${this.color}
            data-variant=${this.variant}
            data-size=${this.size}
            ?data-rounded=${this.rounded}
            ?data-toggle=${this.toggle}
            ?data-small-caps=${this.smallCaps}
            @click=${this.#handleClick}
        >
            ${this.startIcon && html` <mjo-icon src=${this.startIcon}></mjo-icon>`}
            <slot></slot>
            ${this.endIcon && html` <mjo-icon src=${this.endIcon}></mjo-icon>`}
            ${!this.noink && !this.disabled && !this.loading ? html`<mjo-ripple></mjo-ripple>` : nothing}
            ${this.loading ? html`<div class="loading"></div>` : nothing}
        </button>`;
    }

    protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);

        if ((this.disabled || this.loading) && this.toggle) {
            this.toggle = false;
        }
    }

    #handleClick() {
        if (this.disabled || this.loading) {
            this.toggle = false;
            return;
        }

        if (this.toggleable && this.type === "button") {
            this.toggle = !this.toggle;
        }

        if (this.form && this.type === "submit") {
            this.submiForm();
        }
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                cursor: pointer;
            }
            :host([fullwidth]) {
                width: 100%;
            }
            button {
                align-items: center;
                background-color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                border-radius: var(--mjo-button-radius, var(--mjo-radius, 5px));
                border: var(--mjo-button-primary-border, solid 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb)));
                box-sizing: border-box;
                color: var(--mjo-button-primary-foreground-color, var(--mjo-primary-foreground-color, white));
                cursor: inherit;
                display: flex;
                flex-flow: row nowrap;
                font-size: var(--mjo-button-font-size, 1em);
                font-weight: var(--mjo-button-font-weight, normal);
                font-family: var(--mjo-button-font-family, inherit);
                line-height: var(--mjo-button-font-size, 1em);
                gap: 5px;
                justify-content: center;
                overflow: hidden;
                padding: var(--mjo-button-padding, calc(1em / 2 - 1px) calc(1em / 2 + 2px));
                position: relative;
                transition: all 0.3s;
                width: 100%;
            }
            button:hover {
                background-color: var(--mjo-button-primary-color-hover, var(--mjo-primary-color-hover, #4e9be4));
                border: solid 1px var(--mjo-button-primary-color-hover, var(--mjo-primary-color-hover, #4e9be4));
            }
            button:focus {
                outline-color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            button[data-small-caps] {
                font-variant: all-small-caps;
            }
            button[data-color="secondary"]:focus {
                outline-color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-color="secondary"] {
                background-color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                border: var(--mjo-button-secondary-border, solid 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74)));
                color: var(--mjo-button-secondary-foreground-color, var(--mjo-secondary-foreground-color, white));
            }
            button[data-color="secondary"]:hover {
                background-color: var(--mjo-button-secondary-color-hover, var(--mjo-secondary-color-hover, #d86490));
                border: solid 1px var(--mjo-button-secondary-color-hover, var(--mjo-secondary-color-hover, #d86490));
            }
            button[data-variant="ghost"] {
                background-color: transparent;
                border: solid 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            button[data-variant="ghost"][data-color="secondary"] {
                background-color: transparent;
                border: solid 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-variant="ghost"]:hover {
                background-color: rgba(230, 230, 230, 0.5);
            }
            button[data-variant="ghost"][data-color="secondary"]:hover {
                background-color: rgba(230, 230, 230, 0.5);
            }
            button[data-variant="dashed"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            button[data-variant="dashed"][data-color="secondary"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-variant="dashed"]:hover {
                background-color: rgba(230, 230, 230, 0.5);
            }
            button[data-variant="dashed"][data-color="secondary"]:hover {
                background-color: rgba(230, 230, 230, 0.5);
            }
            button[data-variant="link"] {
                background-color: transparent;
                border: solid 1px transparent;
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            button[data-variant="link"][data-color="secondary"] {
                background-color: transparent;
                border: solid 1px transparent;
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-variant="text"],
            button[data-variant="text"][data-color="secondary"] {
                background-color: transparent;
                border: solid 1px transparent;
                color: currentColor;
            }
            button[data-variant="text"]:hover {
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                background-color: rgba(220, 220, 220, 0.5);
            }
            button[data-variant="text"][data-color="secondary"]:hover {
                background-color: rgba(220, 220, 220, 0.5);
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            :host([disabled]) button,
            :host([loading]) button {
                cursor: not-allowed;
                color: var(--mjo-button-disabled-foreground-color, var(--mjo-disabled-foreground-color, #aaaaaa));
                background-color: var(--mjo-button-disabled-background-color, var(--mjo-disabled-color, #e0e0e0));
                border: solid 1px var(--mjo-button-disabled-background-color, var(--mjo-disabled-color, #e0e0e0));
            }
            button[data-size="small"] {
                padding: 5px 10px;
                padding: calc(1em / 2 - 3px) calc(1em / 2);
                font-size: 0.8em;
            }
            button[data-size="large"] {
                padding: calc(1em / 2) calc(1em / 2 + 3px);
                font-size: 1.2em;
            }
            button[data-rounded] {
                border-radius: 100%;
                gap: 0;
                padding: 0.7em;
            }
            button[data-rounded]button[data-size="small"] {
                padding: 0.5em;
            }
            button[data-rounded]button[data-size="large"] {
                padding: 0.9em;
            }
            button[data-toggle] {
                box-shadow: inset 0px 0px 20px #333333;
            }
            button mjo-icon,
            button span {
                flex: 0 0 auto;
            }
            button mjo-icon {
                font-size: 1em;
            }
            .loading {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0.2em;
                background-color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                animation: loading 1.5s infinite;
            }
            button[data-color="secondary"] .loading {
                background-color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-size="small"] .loading {
                height: 0.19em;
            }
            button[data-size="large"] .loading {
                height: 0.21em;
            }

            @keyframes loading {
                0% {
                    width: 0%;
                }
                50% {
                    left: 0%;
                    width: 100%;
                }
                100% {
                    left: 100%;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-button": MjoButton;
    }
}
