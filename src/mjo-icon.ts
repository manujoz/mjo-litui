import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin";

@customElement("mjo-icon")
export class MjoIcon extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) src?: string;

    render() {
        return this.src ? html`${unsafeSVG(this.src)}` : nothing;
    }

    static styles = [
        css`
            :host {
                position: relative;
                display: inline-block;
                font-size: 24px;
                width: 1em;
                height: 1em;
            }
            svg {
                position: relative;
                display: block;
                width: 1em;
                height: 1em;
                fill: currentColor;
                transition: var(--mjo-icon-transition, all 0.3s);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-icon": MjoIcon;
    }
}
