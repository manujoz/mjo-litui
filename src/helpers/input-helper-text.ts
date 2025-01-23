import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AiFillCheckCircle, AiFillCloseCircle } from "mjo-icons/ai";

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
                font-size: var(
                    --mjo-radio-helper-font-size,
                    var(
                        --mjo-checkbox-helper-font-size,
                        var(--mjo-switch-helper-font-size, var(--mjo-textarea-helper-font-size, var(--mjo-input-helper-font-size, calc(1em * 0.8))))
                    )
                );
                font-weight: var(
                    --mjo-radio-helper-font-weight,
                    var(
                        --mjo-checkbox-helper-font-weight,
                        var(--mjo-switch-helper-font-weight, var(--mjo-textarea-helper-font-weight, var(--mjo-input-helper-font-weight, normal)))
                    )
                );
                color: var(
                    --mjo-radio-helper-color,
                    var(
                        --mjo-checkbox-helper-color,
                        var(--mjo-switch-helper-color, var(--mjo-textarea-helper-color, var(--mjo-input-helper-color, currentColor)))
                    )
                );
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
                color: var(--mjo-color-error, #d31616);
            }
            .success {
                color: var(--mjo-color-success, #56b15b);
            }
            mjo-icon {
                flex: 0 1 auto;
                font-size: 1em;
            }
        `,
    ];
}
