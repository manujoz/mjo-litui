import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../../src/mjo-button.ts";
import "../../src/mjo-calendar.ts";
import "../../src/mjo-form.ts";
import "../../src/mjo-grid.ts";
import "../../src/mjo-textfield.ts";

import { MjoCalendarEventMarker } from "../../src/types/mjo-calendar";
import "../components/control-group.js";
import "../components/playground-grid.js";
import "../components/section-container.js";
import "../components/showcases-grid.js";

@customElement("calendar-component")
export class CalendarComponent extends LitElement {
    @state() private selectedMode: "single" | "range" = "single";
    @state() private selectedSize: "small" | "medium" | "large" = "medium";
    @state() private selectedColor: "primary" | "secondary" = "primary";
    @state() private selectedLocale: "en" | "es" | "fr" | "de" = "en";
    @state() private selectedFirstDay: "sunday" | "monday" = "monday";
    @state() private selectedRangeCalendars: "1" | "2" | "auto" = "auto";
    @state() private showToday = true;
    @state() private disabled = false;
    @state() private enableKeyboard = true;
    @state() private announceSelections = true;
    @state() private currentValue = "";
    @state() private currentStartDate = "";
    @state() private currentEndDate = "";
    @state() private currentMinDate = "";
    @state() private currentMaxDate = "";
    @state() private currentDisabledDates: string[] = [];
    @state() private eventMarkers: MjoCalendarEventMarker[] = this.generateCurrentMonthEvents();
    @state() private eventInfo = "Click on a day to see events";

    private generateCurrentMonthEvents(): MjoCalendarEventMarker[] {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");

        return [
            { date: `${year}-${month}-05`, hour: "16:25", tooltip: "Important meeting" },
            { date: `${year}-${month}-08`, backgroundColor: "#4ecdc4", foregroundColor: "white", tooltip: "Team standup" },
            { date: `${year}-${month}-08`, backgroundColor: "#45b7d1", foregroundColor: "white", tooltip: "Project deadline" },
            { date: `${year}-${month}-22`, backgroundColor: "#96ceb4", foregroundColor: "black", tooltip: "Client presentation" },
            { date: `${year}-${month}-25`, backgroundColor: "#f39c12", foregroundColor: "white", tooltip: "Lunch meeting" },
        ];
    }

    render() {
        return html`
            <h1>Calendar Component Examples</h1>

            <section-container label="Interactive Calendar Playground">
                <playground-grid>
                    <mjo-calendar
                        slot="demo"
                        id="playground-calendar"
                        .mode=${this.selectedMode}
                        .size=${this.selectedSize}
                        .color=${this.selectedColor}
                        .locale=${this.selectedLocale}
                        .firstDayOfWeek=${this.selectedFirstDay}
                        .rangeCalendars=${this.selectedRangeCalendars}
                        .value=${this.currentValue}
                        .startDate=${this.currentStartDate}
                        .endDate=${this.currentEndDate}
                        .minDate=${this.currentMinDate}
                        .maxDate=${this.currentMaxDate}
                        .disabledDates=${this.currentDisabledDates}
                        .eventMarkers=${this.eventMarkers}
                        ?showToday=${this.showToday}
                        ?disabled=${this.disabled}
                        ?enableKeyboardNavigation=${this.enableKeyboard}
                        ?announceSelections=${this.announceSelections}
                        @mjo-calendar:date-selected=${this.#handleDateSelected}
                        @mjo-calendar:range-selected=${this.#handleRangeSelected}
                        @mjo-calendar:day-click=${this.#handleDayClick}
                        @mjo-calendar:day-hover=${this.#handleDayHover}
                        @change=${this.#handleChange}
                    ></mjo-calendar>

                    <control-group slot="controls" label="Mode" columns="2">
                        <mjo-button size="small" variant=${this.selectedMode === "single" ? "default" : "ghost"} @click=${() => this.setMode("single")}>
                            Single
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedMode === "range" ? "default" : "ghost"} @click=${() => this.setMode("range")}>
                            Range
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

                    <control-group slot="controls" label="First Day" columns="2">
                        <mjo-button size="small" variant=${this.selectedFirstDay === "sunday" ? "default" : "ghost"} @click=${() => this.setFirstDay("sunday")}>
                            Sunday
                        </mjo-button>
                        <mjo-button size="small" variant=${this.selectedFirstDay === "monday" ? "default" : "ghost"} @click=${() => this.setFirstDay("monday")}>
                            Monday
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Range Calendars" columns="3">
                        <mjo-button
                            size="small"
                            variant=${this.selectedRangeCalendars === "1" ? "default" : "ghost"}
                            @click=${() => this.setRangeCalendars("1")}
                        >
                            Single
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedRangeCalendars === "2" ? "default" : "ghost"}
                            @click=${() => this.setRangeCalendars("2")}
                        >
                            Dual
                        </mjo-button>
                        <mjo-button
                            size="small"
                            variant=${this.selectedRangeCalendars === "auto" ? "default" : "ghost"}
                            @click=${() => this.setRangeCalendars("auto")}
                        >
                            Auto
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="States" columns="2">
                        <mjo-button size="small" variant=${this.showToday ? "default" : "ghost"} @click=${() => this.toggleShowToday()}>
                            Show Today
                        </mjo-button>
                        <mjo-button size="small" variant=${this.disabled ? "default" : "ghost"} @click=${() => this.toggleDisabled()}> Disabled </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Accessibility" columns="2">
                        <mjo-button size="small" variant=${this.enableKeyboard ? "default" : "ghost"} @click=${() => this.toggleKeyboard()}>
                            Keyboard Nav
                        </mjo-button>
                        <mjo-button size="small" variant=${this.announceSelections ? "default" : "ghost"} @click=${() => this.toggleAnnouncements()}>
                            Announcements
                        </mjo-button>
                    </control-group>

                    <control-group slot="controls" label="Date Values" columns="1">
                        <mjo-textfield
                            label="Current Value"
                            .value=${this.currentValue}
                            @input=${this.#handleValueChange}
                            size="small"
                            placeholder="YYYY-MM-DD"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="Start Date (Range)"
                            .value=${this.currentStartDate}
                            @input=${this.#handleStartDateChange}
                            size="small"
                            placeholder="YYYY-MM-DD"
                        ></mjo-textfield>
                        <mjo-textfield
                            label="End Date (Range)"
                            .value=${this.currentEndDate}
                            @input=${this.#handleEndDateChange}
                            size="small"
                            placeholder="YYYY-MM-DD"
                        ></mjo-textfield>
                    </control-group>

                    <control-group slot="controls" label="Date Restrictions" columns="1">
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
                    </control-group>

                    <control-group slot="controls" label="Quick Actions" columns="1">
                        <mjo-button size="small" color="success" @click=${this.loadSampleEvents}> Load Sample Events </mjo-button>
                        <mjo-button size="small" color="warning" @click=${this.clearEvents}> Clear Events </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.goToToday}> Go to Today </mjo-button>
                        <mjo-button size="small" color="primary" @click=${this.resetCalendar}> Reset All </mjo-button>
                    </control-group>
                </playground-grid>

                <div class="config-display">
                    <h4>Current Configuration:</h4>
                    <div class="config-values">
                        <span><strong>Mode:</strong> ${this.selectedMode}</span>
                        <span><strong>Size:</strong> ${this.selectedSize}</span>
                        <span><strong>Color:</strong> ${this.selectedColor}</span>
                        <span><strong>Locale:</strong> ${this.selectedLocale}</span>
                        <span><strong>First Day:</strong> ${this.selectedFirstDay}</span>
                        <span><strong>Range Calendars:</strong> ${this.selectedRangeCalendars}</span>
                        <span><strong>Current Value:</strong> ${this.currentValue || "None"}</span>
                        <span><strong>Events:</strong> ${this.eventMarkers.length} markers</span>
                    </div>
                </div>

                <div class="event-display">
                    <h4>Event Information:</h4>
                    <div class="event-info">${this.eventInfo}</div>
                </div>
            </section-container>

            <section-container label="Basic Usage Examples" description="Common calendar implementations with different modes and configurations.">
                <showcases-grid columns="2">
                    <mjo-calendar mode="single" size="medium" color="primary"></mjo-calendar>
                    <mjo-calendar mode="range" size="medium" color="secondary" rangeCalendars="2"></mjo-calendar>
                </showcases-grid>
            </section-container>

            <section-container label="Different Sizes">
                <showcases-grid columns="3">
                    <mjo-calendar mode="single" size="small" color="primary"></mjo-calendar>
                    <mjo-calendar mode="single" size="medium" color="primary"></mjo-calendar>
                    <mjo-calendar mode="single" size="large" color="primary"></mjo-calendar>
                </showcases-grid>
            </section-container>

            <section-container label="Color Variants">
                <showcases-grid columns="2">
                    <mjo-calendar mode="single" size="medium" color="primary"></mjo-calendar>
                    <mjo-calendar mode="single" size="medium" color="secondary"></mjo-calendar>
                </showcases-grid>
            </section-container>

            <section-container label="Locale Examples">
                <showcases-grid columns="2">
                    <mjo-calendar mode="single" size="medium" color="primary" locale="en"></mjo-calendar>
                    <mjo-calendar mode="single" size="medium" color="primary" locale="es"></mjo-calendar>
                </showcases-grid>
            </section-container>

            <section-container label="Calendar with Events" description="Calendars showing event markers with different colors and tooltips.">
                <showcases-grid columns="1">
                    <mjo-calendar
                        mode="single"
                        size="medium"
                        color="primary"
                        .eventMarkers=${this.eventMarkers}
                        @mjo-calendar:day-click=${this.#logEvent}
                    ></mjo-calendar>
                </showcases-grid>
            </section-container>

            <section-container label="Range Selection" description="Calendar configured for date range selection.">
                <showcases-grid columns="1">
                    <mjo-calendar mode="range" size="medium" color="primary" rangeCalendars="auto"></mjo-calendar>
                </showcases-grid>
            </section-container>

            <section-container label="Disabled and Restricted Dates">
                <showcases-grid columns="1">
                    <mjo-calendar
                        mode="single"
                        size="medium"
                        color="primary"
                        minDate="2025-09-01"
                        maxDate="2025-12-31"
                        .disabledDates=${["2025-09-15", "2025-09-22", "2025-09-29"]}
                    ></mjo-calendar>
                </showcases-grid>
            </section-container>

            <section-container label="Form Integration Example">
                <mjo-form>
                    <mjo-grid columns="2" gap="20px">
                        <div class="form-field">
                            <label>Event Date</label>
                            <mjo-calendar mode="single" size="medium" color="primary" name="eventDate"></mjo-calendar>
                        </div>

                        <div class="form-field">
                            <label>Date Range</label>
                            <mjo-calendar mode="range" size="medium" color="secondary" name="dateRange"></mjo-calendar>
                        </div>
                    </mjo-grid>

                    <div class="form-actions">
                        <mjo-button type="submit" color="primary">Save Dates</mjo-button>
                        <mjo-button type="reset" variant="ghost">Reset</mjo-button>
                    </div>
                </mjo-form>
            </section-container>

            <section-container label="Event Handling Demo">
                <div class="event-demo">
                    <div class="demo-calendars">
                        <mjo-calendar
                            id="event-calendar-1"
                            mode="single"
                            size="medium"
                            color="primary"
                            .eventMarkers=${this.eventMarkers}
                            @mjo-calendar:date-selected=${this.#logEvent}
                            @mjo-calendar:day-click=${this.#logEvent}
                            @mjo-calendar:day-hover=${this.#logEvent}
                            @change=${this.#logEvent}
                        ></mjo-calendar>
                    </div>

                    <div class="event-log">
                        <h5>Event Log:</h5>
                        <div id="event-output" class="log-output">Interact with the calendar to see events...</div>
                    </div>
                </div>
            </section-container>
        `;
    }

    private setMode(mode: "single" | "range") {
        this.selectedMode = mode;
    }

    private setSize(size: "small" | "medium" | "large") {
        this.selectedSize = size;
    }

    private setColor(color: "primary" | "secondary") {
        this.selectedColor = color;
    }

    private setLocale(locale: "en" | "es" | "fr" | "de") {
        this.selectedLocale = locale;
    }

    private setFirstDay(firstDay: "sunday" | "monday") {
        this.selectedFirstDay = firstDay;
    }

    private setRangeCalendars(rangeCalendars: "1" | "2" | "auto") {
        this.selectedRangeCalendars = rangeCalendars;
    }

    private toggleShowToday() {
        this.showToday = !this.showToday;
    }

    private toggleDisabled() {
        this.disabled = !this.disabled;
    }

    private toggleKeyboard() {
        this.enableKeyboard = !this.enableKeyboard;
    }

    private toggleAnnouncements() {
        this.announceSelections = !this.announceSelections;
    }

    private loadSampleEvents() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");

        this.eventMarkers = [
            { date: `${year}-${month}-03`, backgroundColor: "#ff6b6b", foregroundColor: "white", tooltip: "Important meeting" },
            { date: `${year}-${month}-08`, backgroundColor: "#4ecdc4", foregroundColor: "white", tooltip: "Team standup" },
            { date: `${year}-${month}-12`, backgroundColor: "#45b7d1", foregroundColor: "white", tooltip: "Project deadline" },
            { date: `${year}-${month}-18`, backgroundColor: "#96ceb4", foregroundColor: "white", tooltip: "Client presentation" },
            { date: `${year}-${month}-22`, backgroundColor: "#f39c12", foregroundColor: "white", tooltip: "Lunch meeting" },
            { date: `${year}-${month}-25`, backgroundColor: "#e74c3c", foregroundColor: "white", tooltip: "Quarter end" },
            { date: `${year}-${month}-28`, backgroundColor: "#9b59b6", foregroundColor: "white", tooltip: "Team building" },
        ];
    }

    private clearEvents() {
        this.eventMarkers = [];
    }

    private goToToday() {
        const today = new Date().toISOString().split("T")[0];
        this.currentValue = today;
    }

    private resetCalendar() {
        this.selectedMode = "single";
        this.selectedSize = "medium";
        this.selectedColor = "primary";
        this.selectedLocale = "en";
        this.selectedFirstDay = "monday";
        this.selectedRangeCalendars = "auto";
        this.showToday = true;
        this.disabled = false;
        this.enableKeyboard = true;
        this.announceSelections = true;
        this.currentValue = "";
        this.currentStartDate = "";
        this.currentEndDate = "";
        this.currentMinDate = "";
        this.currentMaxDate = "";
        this.currentDisabledDates = [];
        this.loadSampleEvents();
        this.eventInfo = "Click on a day to see events";
    }

    #handleValueChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentValue = target.value;
    };

    #handleStartDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentStartDate = target.value;
    };

    #handleEndDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentEndDate = target.value;
    };

    #handleMinDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMinDate = target.value;
    };

    #handleMaxDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.currentMaxDate = target.value;
    };

    #handleDateSelected = (event: CustomEvent) => {
        console.log("Date selected:", event.detail);
        this.eventInfo = `Selected: ${event.detail.value || "None"}`;
    };

    #handleRangeSelected = (event: CustomEvent) => {
        console.log("Range selected:", event.detail);
        this.eventInfo = `Range: ${event.detail.startDateValue || "None"} to ${event.detail.endDateValue || "None"}`;
    };

    #handleDayClick = (event: CustomEvent) => {
        console.log("Day clicked:", event.detail);
        const { day, date, events } = event.detail;
        const dateStr = date.toISOString().split("T")[0];

        if (events.length > 0) {
            const eventList = events.map((evt: any) => evt.tooltip).join(", ");
            this.eventInfo = `Day ${day} (${dateStr}): ${eventList}`;
        } else {
            this.eventInfo = `Day ${day} (${dateStr}): No events`;
        }
    };

    #handleDayHover = (event: CustomEvent) => {
        console.log("Day hovered:", event.detail);
    };

    #handleChange = (event: CustomEvent) => {
        console.log("Change event:", event.detail);
    };

    #logEvent = (event: CustomEvent) => {
        const output = this.shadowRoot?.querySelector("#event-output");
        if (output) {
            const time = new Date().toLocaleTimeString();
            const eventInfo = `[${time}] ${event.type}: ${JSON.stringify(event.detail, null, 2)}\n`;
            output.textContent = eventInfo + (output.textContent || "").split("\n").slice(0, 19).join("\n");
        }
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

            mjo-calendar {
                flex: 0 1 auto;
                justify-self: flex-start;
                align-self: center;
            }

            h1 {
                font-size: 2em;
                margin: 0;
                color: var(--mjo-foreground-color, #333);
            }

            .config-display,
            .event-display {
                margin-top: 20px;
                padding: 16px;
                background: var(--mjo-background-color-high, #f5f5f5);
                border-radius: 8px;
                border: 1px solid var(--mjo-border-color, #ddd);
            }

            .config-display h4,
            .event-display h4 {
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

            .event-info {
                font-family: monospace;
                font-size: 0.9rem;
                color: var(--mjo-foreground-color, #333);
                background: var(--mjo-background-color, white);
                border: 1px solid var(--mjo-border-color, #ddd);
                border-radius: 4px;
                padding: 8px;
            }

            .form-field {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .form-field label {
                font-weight: 600;
                color: var(--mjo-foreground-color, #333);
                font-size: 0.95rem;
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

            .demo-calendars {
                display: flex;
                justify-content: center;
                align-items: center;
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
                max-height: 300px;
                overflow-y: auto;
                min-height: 100px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                :host {
                    padding: 20px;
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
        "calendar-component": CalendarComponent;
    }
}
