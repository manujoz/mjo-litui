import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillWarning, AiOutlineClose } from "mjo-icons/ai";

import "./mjo-icon.js";

@customElement("mjo-alert")
export class MjoAlert extends LitElement {
    @property({ type: String }) type: "success" | "info" | "warning" | "error" = "info";
    @property({ type: String }) size: "small" | "medium" | "large" = "medium";
    @property({ type: String }) rounded: "none" | "small" | "medium" | "large" = "medium";
    @property({ type: String }) message: string = "";
    @property({ type: String }) detail: string = "";
    @property({ type: Boolean }) closable: boolean = false;
    @property({ type: Boolean }) hideIcon: boolean = false;

    @state() icon: string = "";

    render() {
        return html`
            <div class="container" data-type=${this.type} data-size=${this.size} data-rounded=${this.rounded}>
                <div class="messageContainer">
                    ${!this.hideIcon && this.icon ? html`<div class="icon"><mjo-icon src=${this.icon}></mjo-icon></div>` : nothing}
                    <div class="message">${this.message}</div>
                    ${this.closable ? html`<div class="icon close"><mjo-icon @click=${this.close} src=${AiOutlineClose}></mjo-icon></div>` : nothing}
                </div>
                ${this.detail ? html`<div class="detail" ?data-icon=${!this.hideIcon}>${unsafeHTML(this.detail)}</div>` : nothing}
            </div>
        `;
    }

    protected updated(_changedProperties: PropertyValues): void {
        if (_changedProperties.has("type")) {
            if (this.type === "warning") {
                this.icon = AiFillWarning;
            } else if (this.type === "info") {
                this.icon = AiFillInfoCircle;
            } else if (this.type === "error") {
                this.icon = AiFillCloseCircle;
            } else if (this.type === "success") {
                this.icon = AiFillCheckCircle;
            } else {
                this.icon = "";
            }
        }
    }

    close() {
        this.style.overflow = "hidden";
        this.style.transition = "all 0.5s";
        this.style.height = this.offsetHeight + 2 + "px";

        const container = this.shadowRoot?.querySelector(".container") as HTMLElement;

        setTimeout(() => {
            this.style.opacity = "0";
            this.style.height = "0";
            container.style.paddingTop = "0";
            container.style.paddingBottom = "0";
        }, 50);

        setTimeout(() => {
            this.remove();
        }, 550);
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
                text-align: left;
                --mjo-alert-space: var(--mjo-space-small);
            }

            .container {
                position: relative;
                padding: var(--mjo-alert-space);
                transition: padding 0.5s;
            }
            .container[data-type="success"] {
                background-color: var(--mjo-color-green-50);
                border: solid 1px var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            .container[data-type="error"] {
                background-color: var(--mjo-color-red-50);
                border: solid 1px var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            .container[data-type="warning"] {
                background-color: var(--mjo-color-yellow-50);
                border: solid 1px var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            .container[data-type="info"] {
                background-color: var(--mjo-color-blue-50);
                border: solid 1px var(--mjo-color-info);
                color: var(--mjo-color-info);
            }
            .container[data-size="small"] {
                font-size: 0.8em;
                --mjo-alert-space: var(--mjo-space-x-small);
            }
            .container[data-size="large"] {
                font-size: 1.2em;
            }
            .container[data-rounded="small"] {
                border-radius: var(--mjo-radius-small);
            }
            .container[data-rounded="medium"] {
                border-radius: var(--mjo-radius-medium);
            }
            .container[data-rounded="large"] {
                border-radius: var(--mjo-radius-large);
            }

            .messageContainer {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                gap: var(--mjo-space-x-small);
            }
            .icon {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                display: grid;
                place-content: center;
            }
            .icon mjo-icon {
                font-size: 1em;
            }
            .message {
                position: relative;
                flex-grow: 1;
                flex-basis: 0;
            }
            .close mjo-icon {
                cursor: pointer;
            }

            .detail {
                position: relative;
                padding: var(--mjo-alert-space) 0 0 0;
            }
            .detail[data-icon] {
                padding-left: calc(1em + var(--mjo-space-x-small));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-alert": MjoAlert;
    }
}
