import { MjoFormSubmitEvent } from "./src/types/mjo-form";

import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AiOutlineSearch } from "mjo-icons/ai/AiOutlineSearch";

import { theme } from "./theme.js";

import { repeat } from "lit/directives/repeat.js";
import "./src/mjo-alert.js";
import "./src/mjo-avatar.js";
import "./src/mjo-button.js";
import "./src/mjo-dropdown.js";
import "./src/mjo-form.js";
import "./src/mjo-image.js";
import "./src/mjo-select.js";
import "./src/mjo-slider.js";
import "./src/mjo-textarea.js";
import "./src/mjo-textfield.js";
import "./src/mjo-theme.js";
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
    @state() options: { value: string; inner: string }[] = [];

    render() {
        return html`<div class=".container">
            <mjo-theme theme="light" .config=${theme} scope="global">
                <p style="color: var(--mjo-primary-color);">Hola mundo</p>
            </mjo-theme>
            <div style="padding: 20px;">
                <mjo-image src="asdasdsa"></mjo-image>
                <mjo-alert
                    type="error"
                    message="este es el mensaje de error"
                    size="small"
                    closable
                    rounded="large"
                    detail="Est es el detalle de la alerta"
                ></mjo-alert>
            </div>
            <div style="padding: 20px;">
                <mjo-avatar size="small" name="Á" bordered nameColoured></mjo-avatar>
            </div>
            <div>
                <mjo-theme theme="dark" .config=${theme} scope="local">
                    <mjo-form @submit=${this.#handleSubmit} .errmessages=${messages} .inputsErrmessages=${inputsMessages}>
                        <mjo-textfield autoFocus label="Name" name="name" type="password" selectOnFocus clearabled counter></mjo-textfield>
                        <p>
                            <mjo-select name="select" label="Este es el select" searchable>
                                ${this.options.length === 0
                                    ? html`<mjo-option value="">Selecciona...</mjo-option>`
                                    : repeat(
                                          this.options,
                                          (option) => option.value,
                                          (option) => html`<mjo-option value=${option.value}>${option.inner}</mjo-option>`,
                                      )}
                            </mjo-select>
                        </p>
                        <p>
                            <mjo-textarea name="description" label="Description" startIcon=${AiOutlineSearch} maxHeight="200"></mjo-textarea>
                        </p>
                        <p>
                            <mjo-slider name="quantity" label="Slider" step="1" max="100" value="20" tooltip valueSuffix="€"></mjo-slider>
                        </p>
                        <p>
                            <mjo-button size="small" type="submit" startIcon=${AiOutlineSearch} color="primary" variant="dashed">ENVIAR</mjo-button>
                        </p>
                    </mjo-form>
                </mjo-theme>
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

        this.setOptions();

        setTimeout(() => {
            this.html = this.renderHtml(2);
        }, 3000);

        setTimeout(() => {
            this.setOptions("refresh");
        }, 5000);
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

    setOptions(action: "start" | "refresh" = "start") {
        if (action === "refresh") {
            this.options = [
                { value: "6", inner: "Dos Hermanas" },
                { value: "7", inner: "Utrera" },
                { value: "8", inner: "Los Palacios" },
                { value: "9", inner: "Las Cabezas" },
                { value: "10", inner: "Alcalá" },
            ];
        } else {
            this.options = [
                { value: "1", inner: "Barcelona" },
                { value: "2", inner: "Madrid" },
                { value: "3", inner: "Valencia" },
                { value: "4", inner: "Sevilla" },
                { value: "5", inner: "Bilbao" },
            ];
        }
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
        mjo-image {
            width: 200px;
            height: 100px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
