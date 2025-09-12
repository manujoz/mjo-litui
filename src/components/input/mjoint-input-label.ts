import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import "../../mjo-text-nowrap.js";

@customElement("mjoint-input-label")
export class MjointInputLabel extends LitElement {
    @property({ type: Boolean }) focused = false;
    @property({ type: Boolean }) error = false;
    @property({ type: String }) label?: string;
    @property({ type: String }) color: "primary" | "secondary" = "primary";

    render() {
        return html`${this.label
            ? html`<div class="container" part="container" data-color=${this.color} ?data-focused=${this.focused} ?data-error=${this.error}>
                  <mjo-text-nowrap exportparts="container: truncate-container, wrapper: truncate-wrapper">${this.label}</mjo-text-nowrap>
              </div>`
            : nothing}`;
    }
    static styles = [
        css`
            :host {
                position: relative;
                display: block;
                text-align: left;
                font-size: var(
                    --mjo-color-picker-label-font-size,
                    var(
                        --mjo-select-label-font-size,
                        var(
                            --mjo-slider-label-font-size,
                            var(--mjo-switch-label-font-size, var(--mjo-textarea-label-font-size, var(--mjo-input-label-font-size, calc(1em * 0.8))))
                        )
                    )
                );
                font-weight: var(
                    --mjo-color-picker-label-font-weight,
                    var(
                        --mjo-select-label-font-weight,
                        var(
                            --mjo-slider-label-font-weight,
                            var(--mjo-switch-label-font-weight, var(--mjo-textarea-label-font-weight, var(--mjo-input-label-font-weight, normal)))
                        )
                    )
                );
                color: var(
                    --mjo-color-picker-label-color,
                    var(
                        --mjo-select-label-color,
                        var(
                            --mjo-slider-label-color,
                            var(--mjo-switch-label-color, var(--mjo-textarea-label-color, var(--mjo-input-label-color, currentColor)))
                        )
                    )
                );
            }
            .container {
                position: relative;
                transition: color 0.2s;
            }
            .container[data-focused] {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-focused][data-color="secondary"] {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            .container[data-error] {
                color: var(--mjo-color-error, #d81717);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjoint-input-label": MjointInputLabel;
    }
}
