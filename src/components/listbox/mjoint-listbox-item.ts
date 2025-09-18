import { MjoListboxClickEvent, MjoListboxItem, MjoListboxItemBlurEvent, MjoListboxItemFocusEvent, MjoListboxVariant } from "../../types/mjo-listbox";

import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { MdOutlineCheck } from "mjo-icons/md";

import "../../mjo-icon.js";
import "../../mjo-typography.js";

@customElement("mjoint-listbox-item")
export class MjointListboxItem extends LitElement {
    @property({ type: Object }) item!: MjoListboxItem;
    @property({ type: Number }) index: number = -1;
    @property({ type: String }) variant: MjoListboxVariant = "solid";
    @property({ type: Boolean }) selected: boolean = false;
    @property({ type: Boolean }) focused: boolean = false;

    render() {
        if (!this.item || !this.item.label) {
            console.error("Listbox item label is not defined");
            return nothing;
        }

        if (this.item.href) {
            return html`
                <a
                    id=${this.id}
                    part="link"
                    href=${this.item.href}
                    role="option"
                    aria-selected=${this.selected ? "true" : "false"}
                    aria-disabled=${this.item.disabled ? "true" : "false"}
                    tabindex="0"
                >
                    ${this.#renderContent()}
                </a>
            `;
        }

        return html`
            <div
                id=${this.id}
                class="container"
                part="container"
                role="option"
                aria-selected=${this.selected ? "true" : "false"}
                aria-disabled=${this.item.disabled ? "true" : "false"}
                tabindex="-1"
                @focus=${this.#handleFocus}
                @blur=${this.#handleBlur}
                @click=${this.#handleClick}
                @keydown=${this.#handleKeyDown}
            >
                ${this.#renderContent()}
            </div>
        `;
    }

    #renderContent() {
        return html`
            <div
                class="inner"
                part="wrapper"
                data-color=${ifDefined(this.item.color)}
                data-variant=${this.variant}
                ?data-focused=${this.focused}
                ?data-disabled=${this.item.disabled || false}
            >
                ${this.item.startIcon ? html`<mjo-icon exportparts="icon: start-icon" src=${this.item.startIcon}></mjo-icon>` : nothing}
                <div class="content" part="content">
                    <mjo-typography part="item-label">${this.item.label}</mjo-typography>
                    ${this.item.description
                        ? html`
                              <mjo-typography class="description" size="body2" part="item-description" exportparts="typography: item-description-tag">
                                  ${this.item.description}
                              </mjo-typography>
                          `
                        : nothing}
                </div>
                ${this.item.endIcon ? html`<mjo-icon exportparts="icon: end-icon" src=${this.item.endIcon}></mjo-icon>` : nothing}
                ${this.selected ? html`<mjo-icon class="selected-icon" exportparts="icon: selected-icon" src=${MdOutlineCheck}></mjo-icon>` : nothing}
            </div>
        `;
    }

    protected updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);

        if (_changedProperties.has("selected") && this.selected) {
            setTimeout(() => {
                this.shadowRoot?.querySelector(".selected-icon")?.classList.add("show");
            }, 0);
        }
    }

    focus() {
        const div = this.shadowRoot?.querySelector(".container") as HTMLElement;
        if (!div) return;
        div.focus();
    }

    #handleClick = () => {
        if (this.item.disabled) return;

        this.dispatchEvent(
            new CustomEvent<MjoListboxClickEvent["detail"]>("mjo-listbox:click", {
                detail: {
                    item: this.item,
                    value: this.item.value,
                },
                bubbles: true,
                composed: true,
            }),
        );
    };

    #handleBlur = () => {
        this.focused = false;

        this.dispatchEvent(
            new CustomEvent<MjoListboxItemBlurEvent["detail"]>("mjo-listbox:blur", {
                detail: {
                    item: this.item,
                    value: this.item.value,
                },
                bubbles: true,
                composed: true,
            }),
        );
    };

    #handleFocus = () => {
        this.dispatchEvent(
            new CustomEvent<MjoListboxItemFocusEvent["detail"]>("mjo-listbox:focus", {
                detail: {
                    item: this.item,
                    value: this.item.value,
                },
                bubbles: true,
                composed: true,
            }),
        );
    };

    #handleKeyDown = (event: KeyboardEvent) => {
        if (this.item.disabled) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            // Dispatch the same event but with keyboard event properties
            this.dispatchEvent(
                new CustomEvent<MjoListboxClickEvent["detail"]>("mjo-listbox:click", {
                    detail: {
                        item: this.item,
                        value: this.item.value,
                    },
                    bubbles: true,
                    composed: true,
                }),
            );
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
            event.preventDefault();
            this.dispatchEvent(
                new CustomEvent("navigate", {
                    detail: {
                        direction: event.key === "ArrowDown" ? 1 : -1,
                        currentIndex: this.index,
                        home: event.key === "Home",
                        end: event.key === "End",
                    },
                }),
            );
        }
    };

    static styles = [
        css`
            :host {
                position: relative;
                display: block;
            }
            a {
                text-decoration: none;
                color: inherit;
            }
            .container {
                outline: none;
            }
            .inner {
                position: relative;
                display: flex;
                align-items: center;
                gap: var(--mjo-listbox-item-gap, var(--mjo-space-small));
                margin: var(--mjo-listbox-item-margin, var(--mjo-space-xsmall, 3px) 0);
                padding: var(--mjo-listbox-item-padding, var(--mjo-space-xxsmall, 3px) var(--mjo-space-xsmall, 3px));
                cursor: var(--mjo-listbox-item-cursor, pointer);
                transition: all 0.2s ease;
                border-radius: var(--mjo-listbox-item-border-radius, var(--mjo-listbox-border-radius, var(--mjo-radius-medium, 3px)));
                overflow: hidden;
                box-sizing: border-box;
                outline: none;
            }
            [data-variant="solid"][data-focused],
            [data-variant="solid"]:hover {
                background-color: var(--mjo-listbox-item-hover-background-color, var(--mjo-color-default));
            }
            [data-variant="solid"][data-focused] *,
            [data-variant="solid"]:hover * {
                color: var(--mjo-listbox-item-hover-foreground-color, var(--mjo-color-default-foreground)) !important;
            }
            [data-color="primary"][data-variant="solid"][data-focused],
            [data-color="primary"][data-variant="solid"]:hover {
                background-color: var(--mjo-primary-color);
            }
            [data-color="primary"][data-variant="solid"][data-focused],
            [data-color="primary"][data-variant="solid"]:hover * {
                color: var(--mjo-primary-foreground-color) !important;
            }
            [data-color="secondary"][data-variant="solid"][data-focused],
            [data-color="secondary"][data-variant="solid"]:hover {
                background-color: var(--mjo-secondary-color);
            }
            [data-color="secondary"][data-variant="solid"][data-focused] *,
            [data-color="secondary"][data-variant="solid"]:hover * {
                color: var(--mjo-secondary-foreground-color) !important;
            }
            [data-color="success"][data-variant="solid"][data-focused],
            [data-color="success"][data-variant="solid"]:hover {
                background-color: var(--mjo-color-success);
            }
            [data-color="success"][data-variant="solid"][data-focused] *,
            [data-color="success"][data-variant="solid"]:hover * {
                color: var(--mjo-color-success-foreground) !important;
            }
            [data-color="info"][data-variant="solid"][data-focused],
            [data-color="info"][data-variant="solid"]:hover {
                background-color: var(--mjo-color-info);
            }
            [data-color="info"][data-variant="solid"][data-focused] *,
            [data-color="info"][data-variant="solid"]:hover * {
                color: var(--mjo-color-info-foreground) !important;
            }
            [data-color="warning"][data-variant="solid"][data-focused],
            [data-color="warning"][data-variant="solid"]:hover {
                background-color: var(--mjo-color-warning);
            }
            [data-color="warning"][data-variant="solid"][data-focused] *,
            [data-color="warning"][data-variant="solid"]:hover * {
                color: var(--mjo-color-warning-foreground) !important;
            }
            [data-color="error"][data-variant="solid"][data-focused],
            [data-color="error"][data-variant="solid"]:hover {
                background-color: var(--mjo-color-error);
            }
            [data-color="error"][data-variant="solid"][data-focused] *,
            [data-color="error"][data-variant="solid"]:hover * {
                color: var(--mjo-color-error-foreground) !important;
            }

            [data-variant="light"][data-focused] *,
            [data-variant="light"]:hover * {
                color: var(--mjo-primary-color) !important;
            }
            [data-color="secondary"][data-variant="light"][data-focused] *,
            [data-color="secondary"][data-variant="light"]:hover * {
                color: var(--mjo-secondary-color) !important;
            }
            [data-color="success"][data-variant="light"][data-focused] *,
            [data-color="success"][data-variant="light"]:hover * {
                color: var(--mjo-color-success) !important;
            }
            [data-color="info"][data-variant="light"][data-focused] *,
            [data-color="info"][data-variant="light"]:hover * {
                color: var(--mjo-color-info) !important;
            }
            [data-color="warning"][data-variant="light"][data-focused] *,
            [data-color="warning"][data-variant="light"]:hover * {
                color: var(--mjo-color-warning) !important;
            }
            [data-color="error"][data-variant="light"][data-focused] *,
            [data-color="error"][data-variant="light"]:hover * {
                color: var(--mjo-color-error) !important;
            }

            [data-variant="bordered"] {
                border: solid 2px transparent;
            }
            [data-variant="bordered"][data-focused],
            [data-variant="bordered"]:hover {
                border-color: var(--mjo-listbox-item-hover-background-color, var(--mjo-color-default));
            }
            [data-color="primary"][data-variant="bordered"][data-focused],
            [data-color="primary"][data-variant="bordered"]:hover {
                border-color: var(--mjo-primary-color);
            }
            [data-color="primary"][data-variant="bordered"][data-focused] *,
            [data-color="primary"][data-variant="bordered"]:hover * {
                color: var(--mjo-primary-color) !important;
            }
            [data-color="secondary"][data-variant="bordered"][data-focused],
            [data-color="secondary"][data-variant="bordered"]:hover {
                border-color: var(--mjo-secondary-color);
            }
            [data-color="secondary"][data-variant="bordered"][data-focused] *,
            [data-color="secondary"][data-variant="bordered"]:hover * {
                color: var(--mjo-secondary-color) !important;
            }
            [data-color="success"][data-variant="bordered"][data-focused],
            [data-color="success"][data-variant="bordered"]:hover {
                border-color: var(--mjo-color-success);
            }
            [data-color="success"][data-variant="bordered"][data-focused] *,
            [data-color="success"][data-variant="bordered"]:hover * {
                color: var(--mjo-color-success) !important;
            }
            [data-color="info"][data-variant="bordered"][data-focused],
            [data-color="info"][data-variant="bordered"]:hover {
                border-color: var(--mjo-color-info);
            }
            [data-color="info"][data-variant="bordered"][data-focused] *,
            [data-color="info"][data-variant="bordered"]:hover * {
                color: var(--mjo-color-info) !important;
            }
            [data-color="warning"][data-variant="bordered"][data-focused],
            [data-color="warning"][data-variant="bordered"]:hover {
                border-color: var(--mjo-color-warning);
            }
            [data-color="warning"][data-variant="bordered"][data-focused] *,
            [data-color="warning"][data-variant="bordered"]:hover * {
                color: var(--mjo-color-warning) !important;
            }
            [data-color="error"][data-variant="bordered"][data-focused],
            [data-color="error"][data-variant="bordered"]:hover {
                border-color: var(--mjo-color-error);
            }
            [data-color="error"][data-variant="bordered"][data-focused] *,
            [data-color="error"][data-variant="bordered"]:hover * {
                color: var(--mjo-color-error) !important;
            }

            [data-variant="flat"][data-focused],
            [data-variant="flat"]:hover {
                background-color: transparent;
            }
            [data-variant="flat"][data-focused]::before,
            [data-variant="flat"]:hover::before {
                position: absolute;
                inset: 0;
                content: "";
                opacity: 0.1;
                background-color: var(--mjo-listbox-item-hover-background-color, var(--mjo-color-default));
            }
            [data-color="primary"][data-variant="flat"][data-focused],
            [data-color="primary"][data-variant="flat"]:hover {
                background-color: var(--mjo-primary-color-alpha1);
            }
            [data-color="primary"][data-variant="flat"][data-focused] *,
            [data-color="primary"][data-variant="flat"]:hover * {
                color: var(--mjo-primary-color) !important;
            }
            [data-color="secondary"][data-variant="flat"][data-focused],
            [data-color="secondary"][data-variant="flat"]:hover {
                background-color: var(--mjo-secondary-color-alpha1);
            }
            [data-color="secondary"][data-variant="flat"][data-focused] *,
            [data-color="secondary"][data-variant="flat"]:hover * {
                color: var(--mjo-secondary-color) !important;
            }
            [data-color="success"][data-variant="flat"][data-focused],
            [data-color="success"][data-variant="flat"]:hover {
                background-color: transparent;
            }
            [data-color="success"][data-variant="flat"][data-focused]::before,
            [data-color="success"][data-variant="flat"]:hover::before {
                position: absolute;
                inset: 0;
                content: "";
                background-color: var(--mjo-color-success);
                opacity: 0.1;
            }
            [data-color="success"][data-variant="flat"][data-focused] *,
            [data-color="success"][data-variant="flat"]:hover * {
                color: var(--mjo-color-success) !important;
            }
            [data-color="info"][data-variant="flat"][data-focused],
            [data-color="info"][data-variant="flat"]:hover {
                background-color: transparent;
            }
            [data-color="info"][data-variant="flat"][data-focused]::before,
            [data-color="info"][data-variant="flat"]:hover::before {
                position: absolute;
                inset: 0;
                content: "";
                background-color: var(--mjo-color-info);
                opacity: 0.1;
            }
            [data-color="info"][data-variant="flat"][data-focused] *,
            [data-color="info"][data-variant="flat"]:hover * {
                color: var(--mjo-color-info) !important;
            }
            [data-color="warning"][data-variant="flat"][data-focused],
            [data-color="warning"][data-variant="flat"]:hover {
                background-color: transparent;
            }
            [data-color="warning"][data-variant="flat"][data-focused]::before,
            [data-color="warning"][data-variant="flat"]:hover::before {
                position: absolute;
                inset: 0;
                content: "";
                background-color: var(--mjo-color-warning);
                opacity: 0.1;
            }
            [data-color="warning"][data-variant="flat"][data-focused] *,
            [data-color="warning"][data-variant="flat"]:hover * {
                color: var(--mjo-color-warning) !important;
            }
            [data-color="error"][data-variant="flat"][data-focused],
            [data-color="error"][data-variant="flat"]:hover {
                background-color: transparent;
            }
            [data-color="error"][data-variant="flat"][data-focused]::before,
            [data-color="error"][data-variant="flat"]:hover::before {
                position: absolute;
                inset: 0;
                content: "";
                background-color: var(--mjo-color-error);
                opacity: 0.1;
            }
            [data-color="error"][data-variant="flat"][data-focused] *,
            [data-color="error"][data-variant="flat"]:hover * {
                color: var(--mjo-color-error) !important;
            }
            [data-disabled] {
                pointer-events: none;
                opacity: 0.5;
            }

            mjo-icon {
                top: var(--mjo-listbox-icon-top);
                flex: 0 1 auto;
            }
            .content {
                flex: 1 1 0;
            }
            mjo-typography {
                margin: 0;
            }
            mjo-typography.description {
                color: var(--mjo-foreground-color-low);
            }
            .selected-icon {
                transition: transform 0.3s ease-in-out;
                transform: scale(0);
            }
            .selected-icon.show {
                transform: scale(1);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-listbox-item": MjointListboxItem;
    }
}
