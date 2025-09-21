import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

// Import components
import "../../src/mjo-button.js";
import "../../src/mjo-date-picker.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-switch.js";
import "../../src/mjo-textfield.js";

// Import dev components
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

// Import types
import { SupportedLocale } from "../../src/types/locales.js";
import { MjoFormSubmitEvent } from "../../src/types/mjo-form.js";

@customElement("date-picker-component")
export class DatePickerComponent extends LitElement {
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private selectedLocale: SupportedLocale = "en";
    @state() private selectedDisplayMode: "iso" | "localized" | "numeric" = "numeric";
    @state() private isRange = false;
    @state() private isDisabled = false;
    @state() private isClearabled = false;
    @state() private isCloseOnSelect = true;
    @state() private isRequired = false;
    @state() private isDisabledAnnounceSelections = false;
    @state() private currentValue = "";
    @state() private currentLabel = "Select Date";
    @state() private currentPlaceholder = "Choose a date";
    @state() private currentName = "";
    @state() private currentMinDate = "";
    @state() private currentMaxDate = "";
    @state() private currentDisabledDates: string[] = [];
    @state() private currentAriaDescribedby = "";

    // Event logs
    @state() private eventLogs: string[] = [];

    render() {
        return html`
            <h1>Date Picker Component Examples</h1>

            <section-container label="Interactive Date Picker Playground">
                <playground-grid>
                    <mjo-date-picker
                        slot="demo"
                        id="playground-date-picker"
                        .value=${this.currentValue}
                        .name=${this.currentName}
                        .label=${this.currentLabel}
                        .placeholder=${this.currentPlaceholder}
                        .color=${this.selectedColor}
                        .size=${this.selectedSize}
                        .locale=${this.selectedLocale}
                        .displayMode=${this.selectedDisplayMode}
                        .minDate=${this.currentMinDate}
                        .maxDate=${this.currentMaxDate}
                        .disabledDates=${this.currentDisabledDates}
                        aria-describedby=${ifDefined(this.currentAriaDescribedby || undefined)}
                        ?isRange=${this.isRange}
                        ?disabled=${this.isDisabled}
                        ?clearabled=${this.isClearabled}
                        ?closeOnSelect=${this.isCloseOnSelect}
                        ?required=${this.isRequired}
                        ?disabledAnnounceSelections=${this.isDisabledAnnounceSelections}
                        @mjo-date-picker:change=${this.#logEvent}
                        @change=${this.#logEvent}
                    ></mjo-date-picker>

                    <control-group slot="controls" label="Color" columns="2">
                        <mjo-button
                            size="small"
                            color="primary"
                            variant=${this.selectedColor === "primary" ? "default" : "ghost"}
                            @click=${() => this.setColor("primary")}
                        >
                            Primary
                        </mjo-button>
                        <mjo-button
                            size="small"
                            color="secondary"
                            variant=${this.selectedColor === "secondary" ? "default" : "ghost"}
                            @click=${() => this.setColor("secondary")}
                        >
                            Secondary
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Size" columns="3">
                        <mjo-button size="small" variant=${this.selectedSize === "small" ? "default" : "ghost"} @click=${() => this.setSize("small")}>
                            Small
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "medium" ? "default" : "ghost"} @click=${() => this.setSize("medium")}>
                            Medium
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedSize === "large" ? "default" : "ghost"} @click=${() => this.setSize("large")}>
                            Large
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Locale" columns="4">
                        <mjo-button size="small" variant=${this.selectedLocale === "en" ? "default" : "ghost"} @click=${() => this.setLocale("en")}>
                            English
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedLocale === "es" ? "default" : "ghost"} @click=${() => this.setLocale("es")}>
                            Español
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedLocale === "fr" ? "default" : "ghost"} @click=${() => this.setLocale("fr")}>
                            Français
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedLocale === "de" ? "default" : "ghost"} @click=${() => this.setLocale("de")}>
                            Deutsch
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Display Mode" columns="2">
                        <mjo-button size="small" variant=${this.selectedDisplayMode === "iso" ? "default" : "ghost"} @click=${() => this.setDisplayMode("iso")}>
                            ISO
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedDisplayMode === "numeric" ? "default" : "ghost"}
                            @click=${() => this.setDisplayMode("numeric")}
                        >
                            ISO
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedDisplayMode === "localized" ? "default" : "ghost"}
                            @click=${() => this.setDisplayMode("localized")}
                        >
                            Localized
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Features" columns="2">
                        <mjo-switch label="Range Mode" size="small" ?checked=${this.isRange} @change=${this.toggleRange}></mjo-switch>
                        <mjo-switch label="Clearable" size="small" ?checked=${this.isClearabled} @change=${this.toggleClearabled}></mjo-switch>
                        <mjo-switch label="Close on Select" size="small" ?checked=${this.isCloseOnSelect} @change=${this.toggleCloseOnSelect}></mjo-switch>
                        <mjo-switch label="Required" size="small" ?checked=${this.isRequired} @change=${this.toggleRequired}></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="States" columns="2">
                        <mjo-switch label="Disabled" size="small" ?checked=${this.isDisabled} @change=${this.toggleDisabled}></mjo-switch>
                        <mjo-switch
                            label="Disable Announcements"
                            size="small"
                            ?checked=${this.isDisabledAnnounceSelections}
                            @change=${this.toggleDisabledAnnounceSelections}
                        ></mjo-switch>
                    </control-group>

                    <control-group slot="controls" label="Basic Settings" columns="1">
                        <mjo-textfield
                            label="Value"
                            .value=${this.currentValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="YYYY-MM-DD or YYYY-MM-DD/YYYY-MM-DD for range"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Label"
                            .value=${this.currentLabel}
                            @input=${this.#handleLabelChange}
                            size="small"
                            placeholder="Field label"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Placeholder"
                            .value=${this.currentPlaceholder}
                            @input=${this.#handlePlaceholderChange}
                            size="small"
                            placeholder="Placeholder text"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Name"
                            .value=${this.currentName}
                            @input=${this.#handleNameChange}
                            size="small"
                            placeholder="Form field name"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Date Constraints" columns="1">
                        <mjo-textfield
                            label="Min Date"
                            .value=${this.currentMinDate}
                            @input=${this.#handleMinDateChange}
                            size="small"
                            placeholder="YYYY-MM-DD"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Max Date"
                            .value=${this.currentMaxDate}
                            @input=${this.#handleMaxDateChange}
                            size="small"
                            placeholder="YYYY-MM-DD"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Disabled Dates (comma separated)"
                            .value=${this.currentDisabledDates.join(", ")}
                            @input=${this.#handleDisabledDatesChange}
                            size="small"
                            placeholder="2024-01-15, 2024-01-20"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Aria Describedby"
                            .value=${this.currentAriaDescribedby}
                            @input=${this.#handleAriaDescribedbyChange}
                            size="small"
                            placeholder="ID of describing element"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Quick Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.setTodayValue}> Set Today's Date </mjo-button>
                        <mjo-button size="small" color="info" @click=${this.setWeekRange}> Set This Week (Range) </mjo-button>
                        <mjo-button size="small" color="warning" @click=${this.setConstraints}> Set Date Constraints </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.resetDatePicker}> Reset All </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="config-display">
                    <h4>Current Configuration:</h4>
                    <div class="config-values">
                        <span><strong>Value:</strong> ${this.currentValue || "None"}</span>
                        <span><strong>Mode:</strong> ${this.isRange ? "Range" : "Single"}</span>
                        <span><strong>Locale:</strong> ${this.selectedLocale}</span>
                        <span><strong>Display:</strong> ${this.selectedDisplayMode}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Color:</strong> ${this.selectedColor}</span>
                        <span
                            ><strong>Features:</strong> ${[
                                this.isClearabled && "Clearable",
                                this.isCloseOnSelect && "Close on Select",
                                this.isRequired && "Required",
                            ]
                                .filter(Boolean)
                                .join(", ") || "None"}</span
                        >
                        <span
                            ><strong>States:</strong> ${[this.isDisabled && "Disabled", this.isDisabledAnnounceSelections && "No Announcements"]
                                .filter(Boolean)
                                .join(", ") || "None"}</span
                        >
                    </div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Common date picker implementations.">
                <showcases-grid columns="3">
                    <mjo-date-picker label="Basic Date Picker" placeholder="Select a date"></mjo-date-picker>

                    <mjo-date-picker label="Date Range Picker" placeholder="Select date range" isRange></mjo-date-picker>

                    <mjo-date-picker label="With Value" value="2024-01-15" clearabled></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-date-picker label="Small" size="small" placeholder="Small date picker"></mjo-date-picker>

                    <mjo-date-picker label="Medium" size="medium" placeholder="Medium date picker"></mjo-date-picker>

                    <mjo-date-picker label="Large" size="large" placeholder="Large date picker"></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="2">
                    <mjo-date-picker label="Primary Color" color="primary" placeholder="Primary color theme"></mjo-date-picker>

                    <mjo-date-picker label="Secondary Color" color="secondary" placeholder="Secondary color theme"></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Locale Examples">
                <showcases-grid columns="2">
                    <mjo-date-picker label="English" locale="en" displayMode="localized" placeholder="English locale"></mjo-date-picker>

                    <mjo-date-picker label="Español" locale="es" displayMode="localized" placeholder="Localización en español"></mjo-date-picker>

                    <mjo-date-picker label="Français" locale="fr" displayMode="localized" placeholder="Localisation française"></mjo-date-picker>

                    <mjo-date-picker label="Deutsch" locale="de" displayMode="localized" placeholder="Deutsche Lokalisierung"></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Range Mode Examples">
                <showcases-grid columns="2">
                    <mjo-date-picker label="Basic Range" isRange placeholder="Select date range"></mjo-date-picker>

                    <mjo-date-picker
                        label="Range with Value"
                        isRange
                        value="2024-01-15/2024-01-20"
                        placeholder="Pre-selected range"
                        clearabled
                    ></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Date Constraints">
                <showcases-grid columns="2">
                    <mjo-date-picker label="Min/Max Dates" minDate="2024-01-01" maxDate="2024-12-31" placeholder="Limited to 2024"></mjo-date-picker>

                    <mjo-date-picker
                        label="With Disabled Dates"
                        .disabledDates=${["2024-01-15", "2024-01-20", "2024-01-25"]}
                        placeholder="Some dates disabled"
                    ></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Display Modes">
                <showcases-grid columns="2">
                    <mjo-date-picker label="ISO Format" locale="es" displayMode="iso" value="2024-01-15" placeholder="ISO format"></mjo-date-picker>

                    <mjo-date-picker
                        label="Localized Format"
                        displayMode="localized"
                        locale="es"
                        value="2024-01-15"
                        placeholder="Localized format"
                    ></mjo-date-picker>

                    <mjo-date-picker
                        label="Localized Format"
                        displayMode="numeric"
                        locale="es"
                        value="2024-01-15"
                        placeholder="Localized format"
                    ></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="States & Features">
                <showcases-grid columns="2">
                    <mjo-date-picker label="Clearable" clearabled value="2024-01-15" placeholder="Can be cleared"></mjo-date-picker>

                    <mjo-date-picker label="Required" required placeholder="Required field"></mjo-date-picker>

                    <mjo-date-picker label="Disabled" disabled value="2024-01-15" placeholder="Disabled field"></mjo-date-picker>

                    <mjo-date-picker label="Stay Open" ?closeOnSelect=${false} placeholder="Doesn't close on select"></mjo-date-picker>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form @submit=${this.#handleSubmit}>
                    <mjo-grid columns="2" gap="20px">
                        <mjo-date-picker name="start_date" label="Start Date" placeholder="Select start date" required clearabled></mjo-date-picker>

                        <mjo-date-picker name="end_date" label="End Date" placeholder="Select end date" required clearabled></mjo-date-picker>

                        <mjo-date-picker name="date_range" label="Date Range" placeholder="Select date range" isRange clearabled></mjo-date-picker>

                        <mjo-date-picker
                            name="birthday"
                            label="Birthday"
                            placeholder="Your birthday"
                            maxDate=${new Date().toISOString().split("T")[0]}
                            clearabled
                        ></mjo-date-picker>
                    </mjo-grid>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Submit Dates</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset Form</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <mjo-date-picker
                        id="event-date-picker"
                        label="Event Test Date Picker"
                        placeholder="Select a date to see events"
                        clearabled
                        @mjo-date-picker:change=${this.#logEvent}
                        @change=${this.#logEvent}
                    ></mjo-date-picker>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div class="log-output">${this.eventLogs.length > 0 ? this.eventLogs.join("\n") : "No events yet. Try selecting a date above."}</div>
                        <mjo-button size="small" @click=${this.clearEventLog}>Clear Log</mjo-button>
                    </div>
                </div>
            </section-container>
        `;
    }

    #handleSubmit = (event: MjoFormSubmitEvent) => {
        console.log(event.detail.response);
    };

    private setColor(color: "primary" | "secondary") {
        this.selectedColor = color;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private setLocale(locale: SupportedLocale) {
        this.selectedLocale = locale;
    }

    private setDisplayMode(mode: "iso" | "localized" | "numeric") {
        this.selectedDisplayMode = mode;
    }

    private toggleRange() {
        this.isRange = !this.isRange;
        // Clear value when switching modes
        this.currentValue = "";
    }

    private toggleDisabled() {
        this.isDisabled = !this.isDisabled;
    }

    private toggleClearabled() {
        this.isClearabled = !this.isClearabled;
    }

    private toggleCloseOnSelect() {
        this.isCloseOnSelect = !this.isCloseOnSelect;
    }

    private toggleRequired() {
        this.isRequired = !this.isRequired;
    }

    private toggleDisabledAnnounceSelections() {
        this.isDisabledAnnounceSelections = !this.isDisabledAnnounceSelections;
    }

    private setTodayValue() {
        const today = new Date().toISOString().split("T")[0];
        this.currentValue = today;
    }

    private setWeekRange() {
        this.isRange = true;
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
        const end = new Date(start);
        end.setDate(start.getDate() + 6); // End of week (Saturday)

        this.currentValue = `${start.toISOString().split("T")[0]}/${end.toISOString().split("T")[0]}`;
    }

    private setConstraints() {
        const today = new Date();
        const minDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of current month
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month

        this.currentMinDate = minDate.toISOString().split("T")[0];
        this.currentMaxDate = maxDate.toISOString().split("T")[0];

        // Set some disabled dates in the middle of the month
        const disabledDates = [];
        for (let i = 10; i <= 15; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), i);
            disabledDates.push(date.toISOString().split("T")[0]);
        }
        this.currentDisabledDates = disabledDates;
    }

    private resetDatePicker() {
        this.currentValue = "";
        this.currentLabel = "Select Date";
        this.currentPlaceholder = "Choose a date";
        this.currentName = "";
        this.currentMinDate = "";
        this.currentMaxDate = "";
        this.currentDisabledDates = [];
        this.currentAriaDescribedby = "";
        this.selectedColor = "primary";
        this.selectedSize = "medium";
        this.selectedLocale = "en";
        this.selectedDisplayMode = "iso";
        this.isRange = false;
        this.isDisabled = false;
        this.isClearabled = false;
        this.isCloseOnSelect = true;
        this.isRequired = false;
        this.isDisabledAnnounceSelections = false;
    }

    private clearEventLog() {
        this.eventLogs = [];
    }

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentValue = target.value;
    };

    #handleLabelChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentLabel = target.value;
    };

    #handlePlaceholderChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentPlaceholder = target.value;
    };

    #handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentName = target.value;
    };

    #handleMinDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMinDate = target.value;
    };

    #handleMaxDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMaxDate = target.value;
    };

    #handleDisabledDatesChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const dates = target.value
            .split(",")
            .map((date) => date.trim())
            .filter((date) => date.length > 0);
        this.currentDisabledDates = dates;
    };

    #handleAriaDescribedbyChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentAriaDescribedby = target.value;
    };

    #logEvent = (event: CustomEvent) => {
        const timestamp = new Date().toLocaleTimeString();
        const eventType = event.type;
        const eventDetail = JSON.stringify(event.detail, null, 2);

        const logEntry = `[${timestamp}] ${eventType}: ${eventDetail}`;
        this.eventLogs = [logEntry, ...this.eventLogs.slice(0, 9)]; // Keep last 10 events
    };

    static styles = [
        css`
            :host {
                display: block;
                padding: 30px;
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                gap: 40px;
            }

            h1 {
                font-size: 2em;
                margin: 0;
                color: var(--mjo-foreground-color, #333);
            }

            .config-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .config-display h4 {
                margin: 0 0 12px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1.1em;
            }

            .config-values {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .config-values span {
                font-size: 0.95rem;
                color: var(--mjo-foreground-color, #333);
            }

            .config-values strong {
                color: var(--mjo-foreground-color, #222);
                font-weight: 600;
                margin-right: 8px;
            }

            .form-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
                flex-wrap: wrap;
            }

            .event-demo {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .event-log h5 {
                margin: 0 0 8px 0;
                color: var(--mjo-foreground-color, #333);
                font-size: 1em;
            }

            .log-output {
                background: var(--mjo-background-color-high, #f5f5f5);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 4px;
                padding: 12px;
                font-family: "Courier New", Courier, monospace;
                font-size: 0.85rem;
                color: var(--mjo-foreground-color, #333);
                white-space: pre-wrap;
                max-height: 200px;
                overflow-y: auto;
                min-height: 50px;
                margin-bottom: 12px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
                }

                .event-demo {
                    gap: 16px;
                }

                .form-actions {
                    flex-direction: column;
                }
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "date-picker-component": DatePickerComponent;
    }
}
