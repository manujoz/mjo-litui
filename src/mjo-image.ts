import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import ImageNotAvailable from "./assets/no-image";

@customElement("mjo-image")
export class MjoImage extends LitElement {
    @property({ type: String }) src = "";
    @property({ type: String }) alt?: string;
    @property({ type: String }) fit: "contain" | "cover" | "fill" | "none" | "scale-down" = "cover";

    @state() error = false;
    @state() svgImage?: string;

    @query("img") img!: HTMLImageElement;

    render() {
        return !this.error
            ? html`<img class=${`${this.fit}`} src=${this.src} alt=${ifDefined(this.alt)} @error=${this.#handleError} />`
            : html`${unsafeSVG(this.svgImage)}`;
    }

    #handleError() {
        this.error = true;
        this.svgImage = ImageNotAvailable;
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
            img,
            svg {
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
            svg {
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
