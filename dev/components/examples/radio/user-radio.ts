import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { FaCheck } from "mjo-icons/fa";
import { MjoRadio } from "../../../../src/mjo-radio.js";

import "../../../../src/mjo-avatar.js";

@customElement("user-radio")
export class UserRadio extends MjoRadio {
    @property({ type: String }) userName = "";
    @property({ type: String }) userRole = "";
    @property({ type: String }) src?: string;

    render() {
        return html`
            <div class="container" ?data-checked=${this.checked} @click=${this.click}>
                <mjo-avatar src=${ifDefined(this.src)} bordered color="primary" name=${this.userName} alt="User Avatar"></mjo-avatar>
                <div class="user-info">
                    <mjo-typography tag="h2">${this.userName}</mjo-typography>
                    <mjo-typography class="role" tag="p" size="body2">${this.userRole}</mjo-typography>
                </div>
                <mjo-icon src=${FaCheck}></mjo-icon>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            .container {
                display: flex;
                align-items: center;
                border: solid 1px var(--mjo-border-color);
                padding: var(--mjo-space-small);
                border-radius: var(--mjo-radius-medium);
                user-select: none;
                cursor: pointer;
                transition:
                    background-color 0.2s ease,
                    border-color 0.2s ease;
            }
            .container:hover {
                background-color: var(--mjo-background-color-high);
                border-color: var(--mjo-border-color-high);
            }
            .container[data-checked] {
                border-color: var(--mjo-primary-color);
                outline: solid 1px var(--mjo-primary-color);
            }
            mjo-avatar {
                flex: 0 1 auto;
                margin-right: 12px;
            }
            .user-info {
                flex: 1 1 0;
            }
            .role {
                color: var(--mjo-foreground-color-low);
            }
            mjo-icon {
                flex: 0 0 auto;
                color: var(--mjo-primary-color);
                transform: scale(0);
                transition: transform 0.5s ease;
            }
            [data-checked] mjo-icon {
                transform: scale(1);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "user-radio": UserRadio;
    }
}
