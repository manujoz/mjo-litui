import { AvailableLanguages } from "./types/locales";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { AiOutlineLeft } from "mjo-icons/ai/AiOutlineLeft";
import { AiOutlineRight } from "mjo-icons/ai/AiOutlineRight";

import "./mjo-grid";
import "./mjo-icon";

@customElement("mjo-calendar")
export class MjoCalendar extends LitElement {
    @property({ type: String }) locale: AvailableLanguages = "en";
    render() {
        return html`
            <div class="header">
                <div class="selects">
                    <div class="icon">
                        <mjo-icon src=${AiOutlineLeft} role="button" tabindex="0"></mjo-icon>
                    </div>
                    <div class="month">Diciembre 2024</div>
                    <div class="icon">
                        <mjo-icon src=${AiOutlineRight} role="button" tabindex="0"></mjo-icon>
                    </div>
                </div>
                <mjo-grid columns="7" gap="5">
                    <div class="day">L</div>
                    <div class="day">M</div>
                    <div class="day">X</div>
                    <div class="day">J</div>
                    <div class="day">V</div>
                    <div class="day">S</div>
                    <div class="day">D</div>
                </mjo-grid>
            </div>
            <div class="daysOfMonth">
                <mjo-grid columns="7" gap="5">
                    <div class="day">1</div>
                    <div class="day">2</div>
                    <div class="day">3</div>
                    <div class="day">4</div>
                    <div class="day">5</div>
                    <div class="day">6</div>
                    <div class="day">7</div>
                    <div class="day">8</div>
                    <div class="day">9</div>
                    <div class="day">10</div>
                    <div class="day">11</div>
                    <div class="day">12</div>
                    <div class="day">13</div>
                    <div class="day">14</div>
                    <div class="day">15</div>
                    <div class="day">16</div>
                    <div class="day">17</div>
                    <div class="day">18</div>
                    <div class="day">19</div>
                    <div class="day">20</div>
                    <div class="day">21</div>
                    <div class="day">22</div>
                    <div class="day">23</div>
                    <div class="day">24</div>
                    <div class="day">25</div>
                    <div class="day">26</div>
                    <div class="day">27</div>
                    <div class="day">28</div>
                    <div class="day">29</div>
                    <div class="day">30</div>
                    <div class="day">31</div>
                </mjo-grid>
            </div>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
                position: relative;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 240px;
                border-radius: 5px;
                overflow: hidden;
                user-select: none;
            }
            .header {
                position: relative;
                padding: 10px;
                background-color: var(--mjo-primary-color, #333333);
                color: var(--mjo-primary-foreground-color, #ffffff);
            }
            .selects {
                position: relative;
                display: flex;
            }
            .header .icon {
                flex: 0 1;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
            }
            .header .icon mjo-icon {
                font-size: 1em;
                background-color: var(--mjo-primary-color-600, #222222);
                border-radius: 7px;
                padding: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .header .icon mjo-icon:hover {
                background-color: var(--mjo-primary-color-700, #333333);
            }
            .header .month {
                flex: 1 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .header mjo-grid {
                margin-top: 10px;
            }
            .header .day {
                flex: 1 1;
                display: grid;
                place-items: center;
                height: 1.8em;
                opacity: 0.7;
            }
            .daysOfMonth {
                padding: 10px;
            }
            .daysOfMonth mjo-grid {
                margin-top: 10px;
            }
            .daysOfMonth .day {
                flex: 1 1;
                display: grid;
                place-items: center;
                height: 1.8em;
                opacity: 0.7;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-calendar": MjoCalendar;
    }
}
