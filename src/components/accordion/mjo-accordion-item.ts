import { LitElement, PropertyValues, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { AiOutlineRight } from "mjo-icons/ai";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

import "../../mjo-icon.js";

@customElement("mjo-accordion-item")
export class MjoAccordionItem extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) itemTitle: string | TemplateResult<1> = "";
    @property({ type: String }) itemSubtitle = "";
    @property({ type: Boolean }) expanded = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) icon = AiOutlineRight;

    @query(".container") containerEl!: HTMLElement;
    @query(".content") contentEl!: HTMLElement;
    @query(".iconContainer mjo-icon") iconEl!: HTMLElement;

    render() {
        return html`
            <div class="container">
                <div class="titleContainer" @click=${this.#toggleContent}>
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
                    <div class="iconContainer">
                        <mjo-icon src=${this.icon}></mjo-icon>
                    </div>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    updated(_changedProperties: PropertyValues) {
        if (_changedProperties.has("expanded")) {
            if (this.expanded) {
                this.#openContent();
            } else {
                this.#closeContent();
            }
        }
    }

    #toggleContent() {
        this.expanded = !this.expanded;

        this.dispatchEvent(new CustomEvent("toggle", { detail: { item: this, expanded: this.expanded } }));
    }

    #openContent() {
        const scrollHeight = this.contentEl.scrollHeight;

        this.containerEl.style.paddingBottom = "var(--mjo-accordion-item-content-padding, var(--mjo-space-medium))";
        this.contentEl.style.maxHeight = `${scrollHeight}px`;
        this.contentEl.style.opacity = "1";
        this.iconEl.style.transform = "rotate(90deg)";
    }

    #closeContent() {
        this.containerEl.removeAttribute("style");
        this.contentEl.removeAttribute("style");
        this.iconEl.removeAttribute("style");
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .container {
                position: relative;
                transition: padding 0.3s ease-in-out;
            }
            .titleContainer {
                position: relative;
                display: flex;
                cursor: pointer;
                padding: var(--mjo-accordion-item-title-padding, var(--mjo-space-medium)) 0;
            }
            .titleContent {
                position: relative;
                flex: 1 1 0;
            }
            .iconContainer {
                position: relative;
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            .iconContainer mjo-icon {
                transition: transform 0.3s ease-in-out;
            }
            .title {
                margin: 0;
                font-size: var(--mjo-accordion-item-title-font-size, 1em);
                color: var(--mjo-accordion-item-title-color, var(--mjo-foreground-color));
            }
            .subtitle {
                margin: 0;
                color: var(--mjo-accordion-item-subtitle-color, var(--mjo-foreground-color-low));
            }
            .content {
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                box-sizing: border-box;
                transition:
                    max-height 0.3s ease-in-out,
                    opacity 0.3s ease-in-out;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-accordion-item": MjoAccordionItem;
    }
}

export type MjoAccordionToggleEvent = CustomEvent<{ item: MjoAccordionItem; expanded: boolean }>;
