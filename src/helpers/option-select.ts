import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("option-select")
export class OptionSelect extends LitElement {
    @property({ type: String }) value = "";
    @property({ type: String }) text = "";
    @property({ type: Boolean }) selected = false;
    @property({ type: Boolean }) preSelected = false;
    @property({ type: String }) startIcon = "";
    @property({ type: String }) endIcon = "";
    @property({ type: String }) startImage = "";
    @property({ type: String }) endImage = "";

    render() {
        return html`<div class="container" ?data-selected=${this.selected} ?data-preselected=${this.preSelected}>
            ${this.startIcon && html`<div class="icon startIcon"><mjo-icon src=${this.startIcon}></mjo-icon></div>`}
            ${this.startImage && !this.startIcon ? html`<div class="image startImage"><img src=${this.startImage} alt="Input image" /></div>` : nothing}
            <div class="option">${this.text || this.value}</div>
            ${this.endIcon ? html`<div class="icon endIcon"><mjo-icon src=${this.endIcon}></mjo-icon></div>` : nothing}
            ${this.endImage && !this.endIcon ? html`<div class="image endImage"><img src=${this.endImage} alt="Input image" /></div>` : nothing}
        </div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.text) {
            this.text = this.textContent || this.value;
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
                padding: var(--option-select-padding, 5px) 0;
                gap: var(--option-select-padding, 5px);
                transition: background-color 0.2s;
            }
            .container[data-preselected],
            .container:hover {
                background-color: var(--mjo-select-option-preselected, #eeeeee);
            }
            .container[data-selected] {
                background-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-select-option-selected-color, white);
            }
            .option {
                position: relative;
                user-select: none;
                font-size: var(--option-select-font-size, 0.8em);
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
                font-size: var(--mjo-input-font-size, 1em);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "option-select": OptionSelect;
    }
}
