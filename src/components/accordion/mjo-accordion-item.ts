import { LitElement, PropertyValues, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

import { AiOutlineClose } from "mjo-icons/ai";
import "../../mjo-icon.js";

@customElement("mjo-accordion-item")
export class MjoAccordionItem extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) itemTitle: string | TemplateResult<1> = "";
    @property({ type: String }) itemSubtitle = "";
    @property({ type: Boolean }) expanded = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) icon = AiOutlineClose;

    @query(".content") content!: HTMLElement;

    render() {
        return html`
            <div class="container">
                <div class="titleContainer">
                    <div class="titleContent">
                        ${typeof this.itemTitle === "string"
                            ? html`
                                  <mjo-typography class="title" tag="h3" size="heading3" weight="medium">${this.itemTitle}</mjo-typography>
                                  ${this.itemSubtitle
                                      ? html`<mjo-typography class="subtitle" tag="p" size="body1" weight="medium"> ${this.itemSubtitle} </mjo-typography>`
                                      : nothing}
                              `
                            : this.itemTitle}
                    </div>
                    <div class="iconContainer"></div>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    updated(_changedProperties: PropertyValues) {
        if (_changedProperties.has("expanded")) {
            this.#toggleContent();
        }
    }

    #toggleContent() {
        if (this.expanded) {
            this.#openContent();
        } else {
            this.#closeContent();
        }
    }

    #openContent() {
        const scrollHeight = this.content.scrollHeight;

        this.content.style.maxHeight = `${scrollHeight}px`;
    }

    #closeContent() {
        this.content.style.maxHeight = "0";
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .title {
                margin: 0;
                font-size: var(--mjo-accordion-item-title-font-size, 1em);
            }
            .subtitle {
                margin: 0;
                color: var(--mjo-foreground-color-low);
            }
            .content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-in-out;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-accordion-item": MjoAccordionItem;
    }
}
