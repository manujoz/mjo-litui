import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("mjo-scrollshadow")
export class MjoScrollshadow extends LitElement {
    @property({ type: String }) overflow: "horizontal" | "vertical" | "both" = "both";
    @property({ type: Boolean }) hideScrollbar = false;

    render() {
        return html`
            <div class="container" @scroll=${this.#handleScroll} data-overflow=${this.overflow}>
                <slot></slot>
            </div>
        `;
    }

    #handleScroll = () => {
        // console.log(ev);
    };

    static styles = [
        css`
            :host {
                display: block;
                width: 100%;
            }
            .container {
                position: relative;
                width: 100%;
                overflow-x: auto;
                overflow-y: auto;
            }
            .container:not([data-overflow="vertical"]) {
                overflow-x: auto;
                overflow-y: hidden;
            }
            .container:not([data-overflow="horizontal"]) {
                overflow-x: hidden;
                overflow-y: auto;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-scrollshadow": MjoScrollshadow;
    }
}
