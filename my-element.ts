import { MjoFormSubmitEvent } from "./src/types/mjo-form";

import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AiOutlineSearch } from "mjo-icons/ai/AiOutlineSearch";

import "./src/mjo-button.js";
import "./src/mjo-dropdown.js";
import "./src/mjo-form.js";
import "./src/mjo-select.js";
import "./src/mjo-textfield.js";
import { InputsValidatorMessages, ValidatorMessages } from "./src/types/validator.js";

const messages: Partial<ValidatorMessages> = {
    required: "Este campo es obligatorio",
};

const inputsMessages: InputsValidatorMessages = {
    email: {
        isemail: "Este campo debe ser un email",
    },
};

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
    render() {
        return html`<div class=".container">
            <div>
                <mjo-form @submit=${this.#handleSubmit} .errmessages=${messages} .inputsErrmessages=${inputsMessages}>
                    <mjo-textfield label="Name" name="name" type="password" selectOnFocus clearabled counter required></mjo-textfield>
                    <mjo-textfield
                        name="email"
                        label="Email"
                        type="email"
                        color="secondary"
                        helperText="Este es el texto de apoyo"
                        counter
                        maxlength="100"
                        size="small"
                        aria-label="myInput"
                    ></mjo-textfield>
                    <mjo-button size="small" type="submit" startIcon=${AiOutlineSearch} color="primary" variant="dashed">ENVIAR</mjo-button>
                </mjo-form>
                <p>
                    <mjo-select name="select" label="Este es el select">
                        <option-select startIcon=${AiOutlineSearch} value="">Selecciona...</option-select>
                        <option-select startIcon=${AiOutlineSearch} value="1">Barcelona</option-select>
                        <option-select startIcon=${AiOutlineSearch} value="2">Madrid</option-select>
                        <option-select startIcon=${AiOutlineSearch} value="3">Valencia</option-select>
                        <option-select startIcon=${AiOutlineSearch} value="4">Sevilla</option-select>
                        <option-select startIcon=${AiOutlineSearch} value="5">Bilbao</option-select>
                    </mjo-select>
                </p>
                <form>
                    <input type="text" name="name" />
                    <mjo-textfield label="Email" name="email"></mjo-textfield>
                    <mjo-dropdown
                        .html=${this.html}
                        .css=${css`
                            .container {
                                position: relative;
                                display: grid;
                                place-content: center;
                                padding: 10px;
                            }
                        `}
                    >
                        <button type="submit">Submit</button>
                    </mjo-dropdown>
                </form>
            </div>
        </div>`;
    }

    @state() html = this.renderHtml(1);

    connectedCallback(): void {
        super.connectedCallback();

        setTimeout(() => {
            this.html = this.renderHtml(2);
        }, 3000);
    }

    renderHtml(num: number) {
        return html`<div class="container">hola ${num}</div>`;
    }

    #handleSubmit(ev: MjoFormSubmitEvent) {
        const { response } = ev.detail;

        setTimeout(() => {
            if (response.submitButton) response.submitButton.loading = false;
        }, 3000);
    }

    static styles = css`
        :host {
            position: relative;
            min-width: 100vw;
            margin: 0 auto;
            text-align: center;
        }
        .container {
            position: relative;
            display: grid;
            place-content: center;
        }
        .container > div {
            position: relative;
            display: grid;
        }
        .white {
            color: white;
        }
        mjo-textfield,
        mjo-button {
            vertical-align: middle;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
