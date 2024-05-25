import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import ImageNotAvailable from "./assets/no-image.svg";

@customElement("mjo-image")
export class MjoImage extends LitElement {
    @property({ type: String }) src = "";
    @property({ type: String }) alt?: string;
    @property({ type: String }) fit: "contain" | "cover" | "fill" | "none" | "scale-down" = "cover";

    @query("img") img!: HTMLImageElement;

    render() {
        return html`<img class=${`${this.fit}`} src=${this.src} alt=${ifDefined(this.alt)} @error=${this.#handleError} />`;
    }

    #handleError() {
        this.src = ImageNotAvailable;
        this.img.classList.add("error");
    }

    static styles = [
        css`
            :host {
                width: 100%;
                height: 100%;
                display: inline-block;
                vertical-align: middle;
            }
            img {
                width: inherit;
                height: inherit;
                object-fit: cover;
                vertical-align: inherit;
            }
            img.contain {
                object-fit: contain;
            }
            img.cover {
                object-fit: cover;
            }
            img.fill {
                object-fit: fill;
            }
            img.none {
                object-fit: none;
            }
            img.scale-down {
                object-fit: scale-down;
            }
            img.error {
                background-color: var(--mjo-image-error-background-color, #e0e0e0);
                border-radius: var(--mjo-image-error-radius, 5px);
                object-fit: contain;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-image": MjoImage;
    }
}
