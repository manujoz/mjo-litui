import { LitElement, PropertyValues, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AiOutlineRight } from "mjo-icons/ai";

import { IThemeMixin, ThemeMixin } from "../../mixins/theme-mixin.js";

import "../../mjo-icon.js";
import { MjoAccordionVariants } from "../../types/mjo-accordion.js";
import { pause } from "../../utils/utils.js";

@customElement("mjo-accordion-item")
export class MjoAccordionItem extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) itemTitle: string | TemplateResult<1> = "";
    @property({ type: String }) itemSubtitle = "";
    @property({ type: Boolean }) expanded = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) compact = false;
    @property({ type: String }) icon = AiOutlineRight;
    @property({ type: Number }) animationDuration = 300;
    @property({ type: String }) animationEasing = "ease-in-out";
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;

    @state() variant: MjoAccordionVariants = "light";

    @query(".container") containerEl!: HTMLElement;
    @query(".content") contentEl!: HTMLElement;
    @query(".iconContainer mjo-icon") iconEl!: HTMLElement;
    @query(".titleContainer") titleContainerEl!: HTMLElement;

    #uniqueId = `accordion-item-${Math.random().toString(36).substring(2, 15)}`;

    private get computedAriaLabel() {
        if (typeof this.itemTitle === "string") {
            return `Toggle ${this.itemTitle}`;
        }

        return "Toggle accordion section";
    }

    render() {
        return html`
            <div class="container" data-variant=${this.variant} ?data-compact=${this.compact} ?data-disabled=${this.disabled}>
                <div
                    class="titleContainer"
                    role="button"
                    tabindex=${this.disabled ? -1 : 0}
                    aria-expanded=${this.expanded}
                    aria-controls=${`${this.#uniqueId}-content`}
                    aria-label=${this.computedAriaLabel}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    aria-disabled=${this.disabled}
                    @click=${this.#toggleContent}
                    @keydown=${this.#handleKeyDown}
                >
                    <div class="titleContent" id=${`${this.#uniqueId}-title`}>
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
                <div class="content" id=${`${this.#uniqueId}-content`} role="region" aria-labelledby=${`${this.#uniqueId}-title`}>
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

        if (_changedProperties.has("disabled") && this.disabled) {
            this.close();
        }
    }

    setCompact(compact: boolean) {
        this.compact = compact;
    }

    open() {
        this.expanded = true;
    }

    close() {
        this.expanded = false;
    }

    toggle() {
        this.expanded = !this.expanded;
    }

    focus() {
        this.titleContainerEl?.focus();
    }

    #handleKeyDown = (event: KeyboardEvent) => {
        if (this.disabled) return;

        const { key } = event;

        if (key === "Enter" || key === " ") {
            event.preventDefault();
            this.#toggleContent();
        } else if (key === "ArrowUp" || key === "ArrowDown") {
            event.preventDefault();
            this.#navigateToSibling(key === "ArrowUp" ? "previous" : "next");
        } else if (key === "Home" || key === "End") {
            event.preventDefault();
            this.#navigateToEdge(key === "Home" ? "first" : "last");
        } else if (key === "Escape" && this.expanded) {
            event.preventDefault();
            this.close();
        }
    };

    #navigateToSibling(direction: "previous" | "next") {
        const accordion = this.closest("mjo-accordion");
        if (!accordion) return;

        const items = Array.from(accordion.querySelectorAll("mjo-accordion-item"));
        const currentIndex = items.indexOf(this);
        const nextIndex = direction === "previous" ? currentIndex - 1 : currentIndex + 1;
        const targetItem = items[nextIndex] as MjoAccordionItem;

        if (targetItem && !targetItem.disabled) {
            targetItem.focus();
        }
    }

    #navigateToEdge(edge: "first" | "last") {
        const accordion = this.closest("mjo-accordion");
        if (!accordion) return;

        const items = Array.from(accordion.querySelectorAll("mjo-accordion-item"));
        const targetItem = (edge === "first" ? items[0] : items[items.length - 1]) as MjoAccordionItem;

        if (targetItem && !targetItem.disabled) {
            targetItem.focus();
        }
    }

    #toggleContent() {
        this.expanded = !this.expanded;

        // Dispatch the old toggle event for backward compatibility
        this.dispatchEvent(new CustomEvent("mjo-accordion-toggle", { detail: { item: this, expanded: this.expanded } }));
    }

    async #openContent(tries = 0) {
        if (this.disabled) return;

        const scrollHeight = this.contentEl.scrollHeight;

        if (scrollHeight === 0) {
            if (tries === 10) return;
            setTimeout(() => {
                this.#openContent(tries + 1);
            }, 50);

            return;
        }

        // Dispatch cancelable event before state change
        const willEvent = new CustomEvent("mjo-accordion-will-expand", {
            detail: { item: this, expanded: true },
            cancelable: true,
        });

        if (!this.dispatchEvent(willEvent)) {
            return;
        }

        // Apply custom animation duration and easing
        this.contentEl.style.transition = `
            max-height ${this.animationDuration}ms ${this.animationEasing},
            opacity ${this.animationDuration}ms ${this.animationEasing}
        `;
        this.iconEl.style.transition = `transform ${this.animationDuration}ms ${this.animationEasing}`;

        this.containerEl.style.paddingBottom = "var(--mjo-accordion-item-content-padding, var(--mjo-space-medium))";
        this.contentEl.style.maxHeight = `${scrollHeight}px`;
        this.contentEl.style.opacity = "1";
        this.iconEl.style.transform = "rotate(90deg)";

        await pause(this.animationDuration);

        // Dispatch new completed event
        this.dispatchEvent(
            new CustomEvent("mjo-accordion-expanded", {
                detail: { item: this, expanded: this.expanded },
            }),
        );
    }

    async #closeContent() {
        // Dispatch cancelable event before state change
        const willEvent = new CustomEvent("mjo-accordion-will-collapse", {
            detail: { item: this, expanded: false },
            cancelable: true,
        });

        if (!this.dispatchEvent(willEvent)) {
            return; // Event was cancelled
        }

        this.containerEl.removeAttribute("style");
        this.contentEl.removeAttribute("style");
        this.iconEl.removeAttribute("style");

        await pause(this.animationDuration);
        this.dispatchEvent(
            new CustomEvent("mjo-accordion-collapsed", {
                detail: { item: this, expanded: this.expanded },
            }),
        );
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
            .container[data-disabled] {
                pointer-events: none;
                opacity: 0.7;
            }
            .titleContainer {
                position: relative;
                display: flex;
                cursor: pointer;
                padding-top: var(--mjo-accordion-item-title-padding, var(--mjo-space-medium));
                padding-bottom: var(--mjo-accordion-item-title-padding, var(--mjo-space-medium));
            }
            .container[data-compact] .titleContainer {
                padding-top: var(--mjo-accordion-item-title-padding-compact, var(--mjo-space-small));
                padding-bottom: var(--mjo-accordion-item-title-padding-compact, var(--mjo-space-small));
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
            .container[data-variant="shadow"] .titleContainer,
            .container[data-variant="shadow"] .content {
                padding-left: var(--mjo-accordion-padding, var(--mjo-space-medium));
                padding-right: var(--mjo-accordion-padding, var(--mjo-space-medium));
            }
            .container[data-variant="shadow"][data-compact] .titleContainer,
            .container[data-variant="shadow"][data-compact] .content {
                padding-left: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
                padding-right: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }
            .container[data-variant="bordered"] .titleContainer,
            .container[data-variant="bordered"] .content {
                padding-left: var(--mjo-accordion-padding, var(--mjo-space-medium));
                padding-right: var(--mjo-accordion-padding, var(--mjo-space-medium));
            }
            .container[data-variant="bordered"][data-compact] .titleContainer,
            .container[data-variant="bordered"][data-compact] .content {
                padding-left: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
                padding-right: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }
            .container[data-variant="splitted"] .titleContainer,
            .container[data-variant="splitted"] .content {
                padding-left: var(--mjo-accordion-padding, var(--mjo-space-medium));
                padding-right: var(--mjo-accordion-padding, var(--mjo-space-medium));
            }
            .container[data-variant="splitted"][data-compact] .titleContainer,
            .container[data-variant="splitted"][data-compact] .content {
                padding-left: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
                padding-right: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }

            /* Accessibility: Respect prefers-reduced-motion */
            @media (prefers-reduced-motion: reduce) {
                .content,
                .iconContainer mjo-icon,
                .container {
                    transition: none !important;
                }
            }

            /* Focus styles for accessibility */
            .titleContainer:focus {
                outline: 2px solid var(--mjo-accordion-item-focus-color, var(--mjo-primary-color));
                outline-offset: 2px;
            }

            .titleContainer:focus-visible {
                outline: 2px solid var(--mjo-accordion-item-focus-color, var(--mjo-primary-color));
                outline-offset: 2px;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-accordion-item": MjoAccordionItem;
    }
}
