import { type MjoSelect } from "../mjo-select";
import { type OptionSelect } from "./option-select";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("options-list")
export class OptionsList extends LitElement {
    @property({ type: Array }) options: OptionSelect[] = [];
    @property({ type: Object }) mjoSelect: MjoSelect | null = null;

    listeners = {
        keydown: (ev: KeyboardEvent) => {
            this.#handleKeydown(ev);
        },
    };

    render() {
        return html`
            ${repeat(
                this.options,
                (option) => option.value,
                (option) => html`${option}`,
            )}
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        document.addEventListener("keydown", this.listeners.keydown);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        document.removeEventListener("keydown", this.listeners.keydown);
    }

    #handleKeydown(ev: KeyboardEvent) {
        if (!this.mjoSelect?.isOpen()) return;

        ev.preventDefault();

        if (ev.key === "ArrowDown") {
            this.#moveDown();
        } else if (ev.key === "ArrowUp") {
            this.#moveUp();
        } else if (ev.key === "Enter") {
            this.#select();
        }
    }

    #select() {
        const selected = this.options.find((option) => option.selected);
        const preselected = this.options.find((option) => option.preSelected);

        if (selected) {
            selected.selected = false;
        }

        if (preselected) {
            preselected.selected = true;
            preselected.preSelected = false;
            this.mjoSelect?.setValue(preselected.value);
            this.mjoSelect?.dropdownRef.value?.close();
        }
    }

    #moveDown() {
        let selected = this.options.find((option) => option.selected);
        let preselected = this.options.find((option) => option.preSelected);

        if (!selected) selected = this.options[0];
        if (!preselected && selected) preselected = selected;
        if (!preselected) preselected = this.options[0];

        this.options.forEach((option) => {
            option.preSelected = false;
        });

        const index = this.options.indexOf(preselected);
        const next = this.options[index + 1] || this.options[0];
        if (next) {
            next.preSelected = true;
        }
    }

    #moveUp() {
        let selected = this.options.find((option) => option.selected);
        let preselected = this.options.find((option) => option.preSelected);

        if (!selected) selected = this.options[0];
        if (!preselected && selected) preselected = selected;
        if (!preselected) preselected = this.options[0];

        this.options.forEach((option) => {
            option.preSelected = false;
        });

        const index = this.options.indexOf(preselected);
        const next = this.options[index - 1] || this.options[this.options.length - 1];
        if (next) {
            next.preSelected = true;
        }
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `,
    ];
}
