import { Properties } from "csstype";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("mjo-grid")
export class MjoGrid extends LitElement {
    @property({ type: Number }) columns: number = 4;
    @property({ type: String }) autoRows: Properties["gridAutoRows"] = "auto";
    @property({ type: String }) flow: Properties["gridAutoFlow"] = "";
    @property({ type: String }) gap: Properties["gap"] = "1em";
    @property({ type: String }) maxWidthRow?: string;
    @property({ type: String }) minWidthRow: string = "1fr";
    @property({ type: String }) mode: "fill" | "fit" | "columns" = "columns";

    render() {
        return html`<slot></slot>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.#setProperties();
    }

    protected updated(): void {
        this.#setProperties();
    }

    #setProperties() {
        this.style.setProperty("--mjoint-grid-gap", this.gap as string);
        this.style.setProperty("--mjoint-grid-auto-flow", this.flow as string);
        this.style.setProperty("--mjoint-grid-auto-rows", this.autoRows as string);

        if (this.mode === "columns") {
            this.style.setProperty("--mjoint-grid-template-columns", `repeat(${this.columns}, minmax(0, 1fr))`);
        } else {
            const fillMode = this.mode === "fill" ? "auto-fill" : "auto-fit";
            const min = this.minWidthRow ? this.minWidthRow : "100px";
            const max = this.maxWidthRow ? this.maxWidthRow : "1fr";
            this.style.setProperty("--mjoint-grid-template-columns", `repeat(${fillMode}, minmax(min(100%, ${min}), ${max}))`);
        }
    }

    static styles = [
        css`
            :host {
                display: grid;
                gap: var(--mjoint-grid-gap, 1em);
                grid-auto-flow: var(--mjoint-grid-auto-flow, initial);
                grid-auto-rows: var(--mjoint-grid-auto-rows, auto);
                grid-template-columns: var(--mjoint-grid-template-columns, repeat(4, 1fr));
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-grid": MjoGrid;
    }
}
