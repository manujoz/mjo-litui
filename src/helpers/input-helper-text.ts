import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AiFillCheckCircle } from "mjo-icons/ai/AiFillCheckCircle.js";
import { AiFillCloseCircle } from "mjo-icons/ai/AiFillCloseCircle.js";

import "../mjo-icon.js";

@customElement("input-helper-text")
export class InputHelperText extends LitElement {
    @property({ type: String }) errormsg?: string;
    @property({ type: String }) successmsg?: string;

    render() {
        return html`<div class="container">
            ${this.errormsg
                ? html`<div class="error"><mjo-icon src=${AiFillCloseCircle}></mjo-icon>${this.errormsg}</div>`
                : this.successmsg
                  ? html`<div class="success"><mjo-icon src=${AiFillCheckCircle}></mjo-icon>${this.successmsg}</div>`
                  : html`<slot></slot>`}
        </div>`;
    }

    static styles = [
        css`
            :host {
                position: relative;
                display: block;
                text-align: left;
                font-size: var(--mjo-input-helper-text-font-size, calc(1em * 0.8));
                font-weight: var(--mjo-input-helper-text-font-weight, normal);
                color: var(--mjo-input-helper-text-fg-color, #555555);
                line-height: calc(1em * 1.2);
                max-width: 100%;
            }
            .container {
                position: relative;
                max-width: 100%;
            }
            .error,
            .success {
                position: relative;
                display: flex;
                align-items: center;
                gap: 3px;
            }
            .error {
                color: var(--mjo-error-color, #d31616);
            }
            .success {
                color: var(--mjo-success-color, #56b15b);
            }
            mjo-icon {
                flex: 0 1 auto;
                font-size: 1em;
            }
        `,
    ];
}
