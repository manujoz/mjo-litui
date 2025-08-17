import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

@customElement("mjo-ionic")
export class MjoIonic extends ThemeMixin(LitElement) implements IThemeMixin {
    static styles = [
        css`
            :host {
                display: inline-block;
                overflow: hidden;
                position: relative;
                border-radius: var(--mjo-ionic-radius, 999px);
                padding: 1px;
            }
            :host::before {
                position: absolute;
                inset: -1000%;
                content: "";
                background-image: conic-gradient(
                    from 90deg at 50% 50%,
                    var(--mjo-ionic-color-one, #e2cbff) 0,
                    var(--mjo-ionic-color-two, #393bb2) 50%,
                    var(--mjo-ionic-color-one, #e2cbff) 100%
                );
                background-image: conic-gradient(
                    from 90deg at 50% 50%,
                    var(--mjo-ionic-color-one, #e2cbff) 0,
                    var(--mjo-ionic-color-three, #2fec00) 50%,
                    var(--mjo-ionic-color-one, #e2cbff) 100%
                );
                animation: spin 2s linear infinite;
            }
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `,
    ];

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-ionic": MjoIonic;
    }
}
