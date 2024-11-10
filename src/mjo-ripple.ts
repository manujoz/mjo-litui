import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin";

@customElement("mjo-ripple")
export class MjoRipple extends ThemeMixin(LitElement) implements IThemeMixin {
    parent?: HTMLElement;
    timeoutRipple?: NodeJS.Timeout;

    render() {
        return html`<div class="container" hidden></div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.parent = this.parentElement as HTMLElement;
        this.parent.addEventListener("click", this.handleClick);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.parent?.removeEventListener("click", this.handleClick);
    }

    handleClick = (ev: MouseEvent) => {
        const x = ev.offsetX;
        const y = ev.offsetY;

        const ripples = document.createElement("span");
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;

        const container = this.shadowRoot?.querySelector("div.container") as HTMLDivElement;
        container.removeAttribute("hidden");
        container.appendChild(ripples);

        setTimeout(() => {
            ripples.remove();
        }, 800);

        clearTimeout(this.timeoutRipple);
        this.timeoutRipple = setTimeout(() => {
            container.setAttribute("hidden", "");
        }, 850);
    };

    static styles = [
        css`
            :host {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                display: block;
                cursor: pointer;
            }
            .container {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                overflow: hidden;
            }
            [hidden] {
                display: none;
            }
            span {
                position: absolute;
                background-color: var(--mo-ripple-color, currentColor);
                transform: translate(-50%, -50%);
                pointer-events: none;
                border-radius: 50%;
                animation: ripple 0.8s linear infinite;
            }
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: var(--mo-ripple-opacity, 0.25);
                }
                100% {
                    width: 800px;
                    height: 800px;
                    opacity: 0;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-ripple": MjoRipple;
    }
}
