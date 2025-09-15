import type { MjoTheme } from "../../src";
import { MjoThemeModes } from "../../src/types/mjo-theme";

import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("theme-toggle")
export class ThemeToggle extends LitElement {
    @state() theme: MjoThemeModes = "light";

    render() {
        return html`
            <div class="theme-toggle">
                <button @click=${this.#toggleTheme}>${this.theme === "dark" ? "☀️" : "🌑"}</button>
            </div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.updateComplete.then(() => {
            const mjoTheme = document.querySelector("mjo-theme") as MjoTheme;
            if (mjoTheme) {
                this.theme = mjoTheme.theme;
            }
        });
    }

    #toggleTheme = () => {
        const mjoTheme = document.querySelector("mjo-theme") as MjoTheme;
        if (mjoTheme) {
            this.theme = mjoTheme.toggleTheme();
        }
    };

    static styles = [
        css`
            :host {
                position: absolute;
                display: block;
                top: 10px;
                right: 10px;
                z-index: 10;
            }
            button {
                aspect-ratio: 1 / 1;
                border: solid 1px var(--mjo-border-color);
                border-radius: var(--mjo-radius);
                background: var(--mjo-background-color);
                cursor: pointer;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "theme-toggle": ThemeToggle;
    }
}
