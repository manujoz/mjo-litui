import { MjoFormSubmitEvent } from "./src/types/mjo-form";

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AiOutlineSearch } from "mjo-icons/ai/AiOutlineSearch";

import "./src/mjo-button";
import "./src/mjo-dropdown";
import "./src/mjo-form";
import "./src/mjo-textfield";
import { InputsValidatorMessages, ValidatorMessages } from "./src/types/validator";

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
                <p>hola</p>
                <form>
                    <input type="text" name="name" />
                    <mjo-textfield label="Email" name="email"></mjo-textfield>
                    <mjo-dropdow>
                        <button type="submit">Submit</button>
                    </mjo-dropdow>
                </form>
            </div>
        </div>`;
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
