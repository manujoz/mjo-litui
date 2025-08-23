import type { MjoTextNowrapTag } from "./types/mjo-text-nowrap";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("mjo-text-nowrap")
export class MjoTextNowrap extends LitElement {
    // Semantic tag for the wrapper element (for future use)
    @property({ type: String }) tag: MjoTextNowrapTag = "span";

    // Accessibility properties
    @property({ type: String, attribute: "aria-label" }) override ariaLabel: string | null = null;
    static styles = [
        css`
            :host {
                display: block;
                position: relative;
                height: calc(1em * 1.25);
            }

            .truncate-container {
                position: absolute;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .truncate-wrapper {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                position: relative;
                display: inline-block;
                width: 100%;
            }
        `,
    ];

    render() {
        return html`
            <div class="truncate-container" role=${ifDefined(this.tag === "span" ? undefined : "none")} aria-label=${ifDefined(this.ariaLabel || undefined)}>
                <div class="truncate-wrapper">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-text-nowrap": MjoTextNowrap;
    }
}
