import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class CalendarController {
    /**
     * Renders the complete demo page for mjo-calendar
     */
    async renderCalendarPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-calendar");

        if (!component) {
            throw new Error("mjo-calendar component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `A configurable calendar component for date selection with single and range modes.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const date = new Date();
        const disabledDates = [date.setDate(date.getDate() + 1), date.setDate(date.getDate() + 2), date.setDate(date.getDate() + 3)];

        // Format disabled dates to yyyy-mm-dd
        const formattedDisabledDates = disabledDates.map((d) => {
            const date = new Date(d);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        });

        // Sample events for calendar examples
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");

        const sampleEvents = [
            {
                date: `${year}-${month}-05`,
                tooltip: "Team Meeting",
                backgroundColor: "var(--mjo-primary-color)",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-05`,
                tooltip: "Project Deadline",
                backgroundColor: "var(--mjo-color-error)",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-18`,
                tooltip: "Holiday Party",
                backgroundColor: "var(--mjo-color-success)",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-25`,
                tooltip: "Important Event",
                backgroundColor: "var(--mjo-color-warning)",
                foregroundColor: "white",
            },
        ];

        const workEvents = [
            {
                date: `${year}-${month}-03`,
                tooltip: "Sprint Planning",
                backgroundColor: "#1976d2",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-08`,
                tooltip: "Code Review",
                backgroundColor: "#388e3c",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-15`,
                tooltip: "Client Presentation",
                backgroundColor: "#f57c00",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-22`,
                tooltip: "Team Building",
                backgroundColor: "#7b1fa2",
                foregroundColor: "white",
            },
        ];

        const holidayEvents = [
            {
                date: `${year}-${month}-01`,
                tooltip: "Monthly Start",
                backgroundColor: "#c62828",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-10`,
                tooltip: "Mid-month Event",
                backgroundColor: "#2e7d32",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-20`,
                tooltip: "Special Day",
                backgroundColor: "#1565c0",
                foregroundColor: "white",
            },
            {
                date: `${year}-${month}-28`,
                tooltip: "Month End Event",
                backgroundColor: "#ef6c00",
                foregroundColor: "white",
            },
        ];

        const calendarTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Calendar Playground</h2>
                <p class="subtitle">Customize and interact with the calendar in real-time. Adjust properties to see instant changes.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase calendar-showcase">
                        <mjo-calendar id="playground-calendar"></mjo-calendar>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Mode</h4>
                            <select name="mode" onchange="changeCalendarProp('mode', this.value)">
                                <option value="single" selected>Single</option>
                                <option value="range">Range</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select name="size" onchange="changeCalendarProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeCalendarProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Locale</h4>
                            <select name="locale" onchange="changeCalendarProp('locale', this.value)">
                                <option value="en" selected>English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="it">Italiano</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>First Day of Week</h4>
                            <select name="firstDayOfWeek" onchange="changeCalendarProp('firstDayOfWeek', this.value)">
                                <option value="monday" selected>Monday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Range Calendars</h4>
                            <select name="rangeCalendars" onchange="changeCalendarProp('rangeCalendars', this.value)">
                                <option value="auto" selected>Auto</option>
                                <option value="1">Single</option>
                                <option value="2">Double</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Date Constraints</h4>
                            <div class="input-row">
                                <label>Min Date:</label>
                                <input name="minDate" type="date" oninput="changeCalendarProp('minDate', this.value)" />
                            </div>
                            <div class="input-row">
                                <label>Max Date:</label>
                                <input name="maxDate" type="date" oninput="changeCalendarProp('maxDate', this.value)" />
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeCalendarProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input name="showToday" type="checkbox" checked onchange="changeCalendarProp('showToday', this.checked || false)" />
                                    <span>Show Today</span>
                                </label>
                                <label class="toggle">
                                    <input
                                        name="enableKeyboardNavigation"
                                        type="checkbox"
                                        checked
                                        onchange="changeCalendarProp('enableKeyboardNavigation', this.checked || false)"
                                    />
                                    <span>Keyboard Nav</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Initial Values</h4>
                            <div class="input-row">
                                <label>Single Date:</label>
                                <input name="value" type="date" oninput="changeCalendarProp('value', this.value)" />
                            </div>
                            <div class="input-row">
                                <label>Start Date:</label>
                                <input name="startDate" type="date" oninput="changeCalendarProp('startDate', this.value)" />
                            </div>
                            <div class="input-row">
                                <label>End Date:</label>
                                <input name="endDate" type="date" oninput="changeCalendarProp('endDate', this.value)" />
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Actions</h4>
                            <div class="button-group">
                                <button onclick="resetCalendar()" class="reset-btn">Reset Calendar</button>
                                <button onclick="setToday()" class="today-btn">Set to Today</button>
                                <button onclick="clearSelection()" class="clear-btn">Clear Selection</button>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Event Markers</h4>
                            <div class="button-group">
                                <button onclick="addSampleEvents()" class="add-events-btn">Add Sample Events</button>
                                <button onclick="addWorkEvents()" class="work-events-btn">Add Work Events</button>
                                <button onclick="addHolidayEvents()" class="holiday-events-btn">Add Holiday Events</button>
                                <button onclick="clearEvents()" class="clear-events-btn">Clear Events</button>
                            </div>
                            <div class="input-row">
                                <label>Add Event Date:</label>
                                <input id="event-date" type="date" />
                                <input id="event-tooltip" type="text" placeholder="Event tooltip" />
                                <button onclick="addCustomEvent()" class="add-custom-btn">Add Event</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Event Log -->
                <div class="event-log">
                    <h4>Event Log</h4>
                    <div id="event-output"></div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-calendar component.</p>

                <h3>Single Date Selection</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Default Calendar</h4>
                        <mjo-calendar mode="single"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>With Initial Date</h4>
                        <mjo-calendar mode="single" value="2025-08-10"></mjo-calendar>
                    </div>
                </div>

                <h3>Range Selection</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Range Mode</h4>
                        <mjo-calendar mode="range"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>With Initial Range</h4>
                        <mjo-calendar mode="range" startDate="2024-12-20" endDate="2024-12-27"></mjo-calendar>
                    </div>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Small</h4>
                        <mjo-calendar mode="single" size="small"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>Medium (Default)</h4>
                        <mjo-calendar mode="single" size="medium"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>Large</h4>
                        <mjo-calendar mode="single" size="large"></mjo-calendar>
                    </div>
                </div>

                <h3>Different Locales</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Spanish</h4>
                        <mjo-calendar mode="single" locale="es"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>French</h4>
                        <mjo-calendar mode="single" locale="fr"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>German</h4>
                        <mjo-calendar mode="single" locale="de"></mjo-calendar>
                    </div>
                </div>

                <h3>First Day of Week</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Monday First</h4>
                        <mjo-calendar mode="single" firstDayOfWeek="monday"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>Sunday First</h4>
                        <mjo-calendar mode="single" firstDayOfWeek="sunday"></mjo-calendar>
                    </div>
                </div>

                <h3>With Constraints</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Date Range Constraint</h4>
                        <mjo-calendar mode="single" minDate="2024-12-10" maxDate="2025-01-15"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>Disabled Dates</h4>
                        <mjo-calendar mode="single" id="disabled-dates-example" .disabledDates=${formattedDisabledDates}></mjo-calendar>
                    </div>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Primary (Default)</h4>
                        <mjo-calendar mode="single" color="primary" value="2024-12-20"></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>Secondary</h4>
                        <mjo-calendar mode="single" color="secondary" value="2024-12-20"></mjo-calendar>
                    </div>
                </div>

                <h3>Range Calendars Configuration</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example wide">
                        <h4>Auto (Responsive)</h4>
                        <mjo-calendar mode="range" rangeCalendars="auto" id="auto-responsive"></mjo-calendar>
                    </div>
                    <div class="calendar-example wide">
                        <h4>Always Single</h4>
                        <mjo-calendar mode="range" rangeCalendars="1"></mjo-calendar>
                    </div>
                    <div class="calendar-example wide">
                        <h4>Always Double</h4>
                        <mjo-calendar mode="range" rangeCalendars="2"></mjo-calendar>
                    </div>
                </div>

                <h3>Disabled State</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Disabled Calendar</h4>
                        <mjo-calendar mode="single" disabled value="2024-12-20"></mjo-calendar>
                    </div>
                </div>

                <h3>Event Markers</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Basic Events</h4>
                        <mjo-calendar mode="single" id="basic-events-example" eventMarkers=${JSON.stringify(sampleEvents)}></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>Work Events</h4>
                        <mjo-calendar mode="single" id="work-events-example" eventMarkers=${JSON.stringify(workEvents)}></mjo-calendar>
                    </div>
                </div>

                <h3>Holiday Calendar</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Holiday Events</h4>
                        <mjo-calendar mode="single" id="holiday-events-example" eventMarkers=${JSON.stringify(holidayEvents)}></mjo-calendar>
                    </div>
                    <div class="calendar-example">
                        <h4>Combined Events</h4>
                        <mjo-calendar
                            mode="single"
                            id="combined-events-example"
                            eventMarkers=${JSON.stringify([...sampleEvents, ...workEvents])}
                        ></mjo-calendar>
                    </div>
                </div>

                <h3>Events with Range Selection</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example wide">
                        <h4>Range Mode with Events</h4>
                        <mjo-calendar
                            mode="range"
                            id="range-events-example"
                            eventMarkers=${JSON.stringify(sampleEvents)}
                            startDate="2024-12-20"
                            endDate="2024-12-27"
                        ></mjo-calendar>
                    </div>
                </div>

                <h3>Interactive Event Handling</h3>
                <div class="component-showcase calendar-examples">
                    <div class="calendar-example">
                        <h4>Click Events Demo</h4>
                        <mjo-calendar
                            mode="single"
                            id="interactive-events-example"
                            eventMarkers=${JSON.stringify(sampleEvents)}
                            @mjo-calendar:day-click=${(e) => console.log("Day clicked:", e.detail)}
                            @mjo-calendar:day-hover=${(e) => console.log("Day hovered:", e.detail)}
                            @mjo-calendar:day-leave=${(e) => console.log("Day leave:", e.detail)}
                        ></mjo-calendar>
                        <div class="event-info">
                            <small>Open browser console to see event logs</small>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(calendarTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/calendar-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-calendar.css"],
        });
    }
}
