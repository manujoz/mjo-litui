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
                        <mjo-textfield autoFocus label="Name" name="nameequal" type="password" selectOnFocus clearabled counter equalto="name"></mjo-textfield>
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
                    <mjo-textfield label="Email" type="number" name="email" nospiners></mjo-textfield>
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

    setOptions() {
        this.options = [
            { value: "1", inner: "Barcelona" },
            { value: "2", inner: "Madrid" },
            { value: "3", inner: "Valencia" },
            { value: "4", inner: "Sevilla" },
            { value: "5", inner: "Bilbao" },
            { value: "6", inner: "Málaga" },
            { value: "7", inner: "Zaragoza" },
            { value: "8", inner: "Murcia" },
            { value: "9", inner: "Palma" },
            { value: "10", inner: "Las Palmas" },
            { value: "11", inner: "Alicante" },
            { value: "12", inner: "Córdoba" },
            { value: "13", inner: "Valladolid" },
            { value: "14", inner: "Vigo" },
            { value: "15", inner: "Gijón" },
            { value: "16", inner: "Hospitalet de Llobregat" },
            { value: "17", inner: "Vitoria" },
            { value: "18", inner: "La Coruña" },
            { value: "19", inner: "Granada" },
            { value: "20", inner: "Elche" },
            { value: "21", inner: "Oviedo" },
            { value: "22", inner: "Badalona" },
            { value: "23", inner: "Cartagena" },
            { value: "24", inner: "Terrassa" },
            { value: "25", inner: "Jerez de la Frontera" },
            { value: "26", inner: "Sabadell" },
            { value: "27", inner: "Alcalá de Henares" },
            { value: "28", inner: "Pamplona" },
            { value: "29", inner: "Fuenlabrada" },
            { value: "30", inner: "San Sebastián" },
            { value: "31", inner: "Leganés" },
            { value: "32", inner: "Almería" },
            { value: "33", inner: "Castellón de la Plana" },
            { value: "34", inner: "Santander" },
            { value: "35", inner: "Burgos" },
            { value: "36", inner: "Albacete" },
            { value: "37", inner: "Getafe" },
            { value: "38", inner: "Salamanca" },
            { value: "39", inner: "Huelva" },
            { value: "40", inner: "Logroño" },
            { value: "41", inner: "Badajoz" },
            { value: "42", inner: "San Cristóbal de La Laguna" },
            { value: "43", inner: "León" },
            { value: "44", inner: "Tarragona" },
            { value: "45", inner: "Cádiz" },
            { value: "46", inner: "Lleida" },
            { value: "47", inner: "Marbella" },
            { value: "48", inner: "Mataró" },
            { value: "49", inner: "Dos Hermanas" },
            { value: "50", inner: "Santa Coloma de Gramenet" },
            { value: "51", inner: "Jaén" },
            { value: "52", inner: "Algeciras" },
            { value: "53", inner: "Torrejón de Ardoz" },
            { value: "54", inner: "Ourense" },
            { value: "55", inner: "Alcobendas" },
            { value: "56", inner: "Reus" },
            { value: "57", inner: "Telde" },
            { value: "58", inner: "Barakaldo" },
            { value: "59", inner: "Santiago de Compostela" },
            { value: "60", inner: "Lugo" },
            { value: "61", inner: "Girona" },
            { value: "62", inner: "Cáceres" },
            { value: "63", inner: "Lorca" },
            { value: "64", inner: "Coslada" },
            { value: "65", inner: "Talavera de la Reina" },
            { value: "66", inner: "El Puerto de Santa María" },
            { value: "67", inner: "Cornellà de Llobregat" },
            { value: "68", inner: "Avilés" },
            { value: "69", inner: "Palencia" },
        ];
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
