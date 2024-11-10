/* eslint-disable no-console */
import { MjoFormSubmitEvent } from "./src/types/mjo-form";

import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { AiOutlineSearch } from "mjo-icons/ai/AiOutlineSearch";
import { InputsValidatorMessages, ValidatorMessages } from "./src/types/validator.js";
import { theme } from "./theme.js";

import "./src/mjo-alert.js";
import "./src/mjo-avatar.js";
import "./src/mjo-button.js";
import "./src/mjo-card.js";
import "./src/mjo-checkbox.js";
import "./src/mjo-color-picker.js";
import "./src/mjo-dropdown.js";
import "./src/mjo-form.js";
import "./src/mjo-image.js";
import "./src/mjo-message.js";
import "./src/mjo-notification.js";
import { MjoNotification } from "./src/mjo-notification.js";
import "./src/mjo-select.js";
import "./src/mjo-slider.js";
import "./src/mjo-switch.js";
import "./src/mjo-textarea.js";
import "./src/mjo-textfield.js";
import "./src/mjo-theme.js";
import { MjoAvatarTheme, MjoSelectTheme } from "./src/types/mjo-theme.js";

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
                <mjo-theme theme="dark" .config=${theme} scope="global">
                    <p style="color: var(--mjo-primary-color);">Hola mundo</p>
                </mjo-theme>

                <div style="padding: 20px;">
                    <mjo-avatar
                        size="small"
                        name="Á"
                        bordered
                        nameColoured
                        .theme=${{ backgroundColor: "red", borderWidth: "5px" } as MjoAvatarTheme}
                    ></mjo-avatar>
                </div>
                <div>
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
                            <mjo-select
                                name="select1"
                                label="Este es el select"
                                searchable
                                .dropDownTheme=${{ backgroundColor: "red" } as MjoSelectTheme}
                                @change=${this.#handleChange}
                                @focus=${this.#handleFocus}
                            >
                                <mjo-option value="">Selecciona...</mjo-option>
                                <mjo-option value="1">Barcelona</mjo-option>
                                <mjo-option value="2">Madrid</mjo-option>
                                <mjo-option selected value="3">Valencia</mjo-option>
                                <mjo-option value="4">Sevilla</mjo-option>
                                <mjo-option value="5">Bilbao</mjo-option>
                                <mjo-option value="6">Málaga</mjo-option>
                                <mjo-option value="7">Zaragoza</mjo-option>
                                <mjo-option value="8">Murcia</mjo-option>
                                <mjo-option value="9">Palma</mjo-option>
                                <mjo-option value="10">Las Palmas</mjo-option>
                                <mjo-option value="11">Alicante</mjo-option>
                                <mjo-option value="12">Córdoba</mjo-option>
                                <mjo-option value="13">Valladolid</mjo-option>
                                <mjo-option value="14">Vigo</mjo-option>
                                <mjo-option value="15">Gijón</mjo-option>
                                <mjo-option value="16">Hospitalet de Llobregat</mjo-option>
                                <mjo-option value="17">Vitoria</mjo-option>
                                <mjo-option value="18">La Coruña</mjo-option>
                                <mjo-option value="19">Granada</mjo-option>
                                <mjo-option value="20">Elche</mjo-option>
                                <mjo-option value="21">Oviedo</mjo-option>
                                <mjo-option value="22">Badalona</mjo-option>
                                <mjo-option value="23">Cartagena</mjo-option>
                                <mjo-option value="24">Terrassa</mjo-option>
                                <mjo-option value="25">Jerez de la Frontera</mjo-option>
                                <mjo-option value="26">Sabadell</mjo-option>
                                <mjo-option value="27">Alcalá de Henares</mjo-option>
                            </mjo-select>
                        </p>
                        <p>
                            <mjo-textarea
                                name="description"
                                label="Description"
                                startIcon=${AiOutlineSearch}
                                maxHeight="200"
                                @change=${this.#handleChange}
                            ></mjo-textarea>
                        </p>
                        <p>
                            <mjo-slider
                                name="quantity"
                                label="Slider"
                                step="1"
                                max="100"
                                value="20"
                                tooltip
                                valueSuffix="€"
                                @change=${this.#handleChange}
                            ></mjo-slider>
                        </p>
                        <p>
                            <mjo-card>
                                <mjo-color-picker
                                    size="large"
                                    disabled
                                    @change=${this.#handleChange}
                                    name="color"
                                    label="Color"
                                    value="#FF0000"
                                ></mjo-color-picker>
                                <mjo-checkbox name="checkbox" label="check"></mjo-checkbox>
                            </mjo-card>
                        </p>
                        <p>
                            <mjo-switch name="switch"></mjo-switch>
                            <mjo-dropdown theme></mjo-dropdown>
                        </p>
                        <p>
                            <mjo-button size="small" type="submit" startIcon=${AiOutlineSearch} color="primary" variant="dashed">ENVIAR</mjo-button>
                        </p>
                    </mjo-form>
                </div>
            </div>
            <mjo-message></mjo-message>
            <mjo-notification></mjo-notification> `;
    }

    @state() html = this.renderHtml(1);

    #handleInput(ev: Event) {
        console.log(ev.currentTarget);
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.setOptions();

        setTimeout(() => {
            this.html = this.renderHtml(2);
        }, 3000);
    }

    protected firstUpdated(): void {
        // const message = this.shadowRoot?.querySelector("mjo-message") as MjoMessage;
        // setTimeout(() => {
        //     message.controller.show({ message: "Hola mundo", type: "info" });
        //     setTimeout(() => {
        //         message.controller.show({ message: "Hola mundo", type: "warning" });
        //     }, 1000);
        //     setTimeout(() => {
        //         message.controller.show({ message: "Hola mundo", type: "error", time: 5000 });
        //     }, 1500);
        //     setTimeout(() => {
        //         message.controller.show({ message: "Hola mundo", type: "success" });
        //     }, 2000);
        //     setTimeout(() => {
        //         message.controller.show({ message: "Hola mundo", type: "info" });
        //     }, 2500);
        // }, 1000);

        const notification = this.shadowRoot?.querySelector("mjo-notification") as MjoNotification;
        setTimeout(() => {
            notification.controller.show({ message: "Hola mundo", type: "info", title: "Este es el título" });
        }, 2000);
        setTimeout(() => {
            notification.controller.show({ message: "Hola mundo 2", type: "error", title: "Este es el título" });
        }, 5000);
        setTimeout(() => {
            notification.controller.show({ message: "Hola mundo 2", type: "warning", title: "Este es el título" });
        }, 6000);
        setTimeout(() => {
            notification.controller.show({ message: "Hola mundo 2", type: "success", title: "Este es el título", time: 5000 });
        }, 7000);
        setTimeout(() => {
            notification.controller.show({
                message: html`<mjo-icon src=${AiOutlineSearch}></mjo-icon> Adios amigo
                    <p>Adios amigo</p>`,
            });
        }, 9000);
    }

    #handleFocus(ev: FocusEvent) {
        console.log(ev);
    }

    #handleChange(ev: Event) {
        console.log((ev.currentTarget as HTMLInputElement).value);
    }

    renderHtml(num: number) {
        return html`<div class="container">hola ${num}</div>`;
    }

    #handleSubmit(ev: MjoFormSubmitEvent) {
        const { response } = ev.detail;

        console.log(response);
        setTimeout(() => {
            if (response.submitButton) response.submitButton.loading = false;
        }, 3000);
    }

    setOptions() {
        this.options = [
            { value: "", inner: "Selecciona..." },
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
        mjo-notification {
            --mjo-notification-margin: 11px;
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
