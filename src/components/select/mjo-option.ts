import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

/**
 * @summary Individual option element for mjo-select component with support for icons, images, and custom styling.
 *
 * @description The mjo-option component represents a single selectable option within an mjo-select dropdown.
 * It supports rich content including icons, images, custom text, and provides full accessibility features
 * with proper ARIA attributes and keyboard navigation support.
 *
 * @fires click - Fired when the option is clicked
 *
 * @slot - The default slot contains the option text content (used as fallback if text property is not set)
 *
 * @csspart option-container - The main option container element
 * @csspart option-start-icon-container - Container for the start icon
 * @csspart option-start-icon - The start icon element (via exportparts from mjo-icon)
 * @csspart option-start-image-container - Container for the start image
 * @csspart option-start-image - The start image element
 * @csspart option-end-icon-container - Container for the end icon
 * @csspart option-end-icon - The end icon element (via exportparts from mjo-icon)
 * @csspart option-end-image-container - Container for the end image
 * @csspart option-end-image - The end image element
 */
@customElement("mjo-option")
export class MjoOption extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) value = "";
    @property({ type: String }) text = "";
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Boolean }) selected = false;
    @property({ type: Boolean }) preSelected = false;
    @property({ type: String }) startIcon = "";
    @property({ type: String }) endIcon = "";
    @property({ type: String }) startImage = "";
    @property({ type: String }) endImage = "";
    handleClick?: (value: string) => void;

    #uniqueId = `mjo-option-${Math.random().toString(36).substring(2, 9)}`;

    render() {
        return html`<div
            id=${this.#uniqueId}
            part="option-container"
            role="option"
            tabindex="-1"
            aria-selected=${this.selected ? "true" : "false"}
            @click=${this.#handleClick}
            class="container"
            data-color=${this.color}
            ?data-selected=${this.selected}
            ?data-preselected=${this.preSelected}
        >
            ${this.startIcon &&
            html`
                <div class="icon startIcon" part="option-start-icon-container" aria-hidden="true">
                    <mjo-icon exportparts="icon: option-start-icon" src=${this.startIcon}></mjo-icon>
                </div>
            `}
            ${this.startImage && !this.startIcon
                ? html`
                      <div class="image startImage" part="option-start-image-container">
                          <img src=${this.startImage} part="option-start-image" alt="Option image" />
                      </div>
                  `
                : nothing}
            <div class="option">${this.text || this.value}</div>
            ${this.endIcon
                ? html`<div class="icon endIcon" part="option-end-icon-container" aria-hidden="true">
                      <mjo-icon exportparts="icon: option-end-icon" src=${this.endIcon}></mjo-icon>
                  </div>`
                : nothing}
            ${this.endImage && !this.endIcon
                ? html`
                      <div class="image endImage" part="option-end-image-container">
                          <img src=${this.endImage} part="option-end-image" alt="Option image" />
                      </div>
                  `
                : nothing}
        </div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.text) {
            this.text = this.textContent?.trim() || this.value;
        }
    }

    /**
     * Gets the unique identifier for this option element.
     * Used for accessibility and ARIA relationships.
     * @returns The unique ID string for this option
     */
    get id(): string {
        return this.#uniqueId;
    }

    #handleClick() {
        if (this.handleClick) {
            this.handleClick(this.value);
        }
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
                cursor: default;
            }
            .container {
                display: flex;
                flex-flow: row nowrap;
                overflow: hidden;
                position: relative;
                padding: var(--mjo-option-option-padding, var(--mjo-select-option-padding, 5px));
                gap: var(--mjo-option-option-padding, var(--mjo-select-option-padding, 5px));
                transition: background-color 0.2s;
                color: var(--mjo-foreground-color);
            }
            .container[data-preselected],
            .container:hover {
                background-color: var(
                    --mjo-option-option-preselected-background-color,
                    var(--mjo-select-option-preselected-background-color, var(--mjo-background-color-hover, #eeeeee))
                );
                color: var(--mjo-option-option-preselected-color, var(--mjo-select-option-preselected-color, var(--mjo-foreground-color, currentColor)));
            }
            .container[data-selected] {
                background-color: var(--mjo-option-option-primary-color, var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed)));
                color: var(
                    --mjo-option-option-selected-primary-color,
                    var(--mjo-select-option-selected-primary-color, var(--mjo-primary-foreground-color, white))
                );
            }
            .container[data-color="secondary"][data-selected] {
                background-color: var(--mjo-option-option-secondary-color, var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717)));
                color: var(
                    --mjo-option-option-selected-secondary-color,
                    var(--mjo-select-option-selected-secondary-color, var(--mjo-secondary-foreground-color, white))
                );
            }
            .option {
                position: relative;
                user-select: none;
                font-size: var(--mjo-option-option-font-size, var(--mjo-select-option-font-size, 0.8em));
            }
            .icon {
                position: relative;
                display: grid;
                place-items: center;
            }
            .image {
                position: relative;
                display: grid;
                place-items: center;
            }
            .image img {
                width: 1em;
                height: 1em;
                object-fit: contain;
            }
            .startIcon,
            .startImage {
                padding-left: calc(1em / 2 - 4px);
            }
            .endIcon,
            .endImage {
                padding-right: calc(1em / 2 - 4px);
            }
            mjo-icon {
                font-size: var(--mjo-option-option-font-size, var(--mjo-select-option-font-size, var(--mjo-input-font-size, 1em)));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-option": MjoOption;
    }
}
