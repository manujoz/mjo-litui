/* eslint-disable no-console */
import type { MjoModal } from "../src/mjo-modal.js";
import { MjoAvatarTheme } from "../src/types/mjo-theme.js";

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { theme } from "./theme.js";

import "../src/mjo-avatar.js";
import "../src/mjo-button.js";
import "../src/mjo-modal.js";

/**
 * An example element.
 */
@customElement("my-element")
export class MyElement extends LitElement {
    render() {
        return html`<div class=".container">
            <mjo-theme theme="dark" .config=${theme} scope="global">
                <p style="color: var(--mjo-primary-color);">Hola mundo</p>
            </mjo-theme>

            <div style="padding: 20px;">
                <mjo-avatar size="small" name="Á" bordered nameColoured .theme=${{ backgroundColor: "red", borderWidth: "5px" } as MjoAvatarTheme}></mjo-avatar>
            </div>
            <p><mjo-button size="medium" variant="flat" @click=${this.#openModal}>ABRIR MODAL</mjo-button></p>
            <mjo-modal></mjo-modal>
        </div>`;
    }

    #openModal() {
        const modal = this.shadowRoot?.querySelector("mjo-modal") as MjoModal;
        modal.controller.show({
            content: html`
                <mjo-typography size="body2">
                    Este es el contenido que estamos metiendo Este es el contenido que estamos metiendo Este es el contenido que estamos metiendo Este es el
                    contenido que estamos metiendo Este es el contenido que estamos metiendo Este es el contenido que estamos metiendo
                </mjo-typography>
                <mjo-typography size="body2">
                    Este es el contenido que estamos metiendo Este es el contenido que estamos metiendo Este es el contenido que estamos metiendo Este es el
                    contenido que estamos metiendo Este es el contenido que estamos metiendo Este es el contenido que estamos metiendo
                </mjo-typography>
            `,
            title: "Este es el título",
        });
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
