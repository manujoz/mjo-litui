import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class DatePickerController {
    /**
     * Renders the complete demo page for mjo-date-picker
     */
    async renderDatePickerPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-date-picker");

        if (!component) {
            throw new Error("mjo-date-picker component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Interactive date selection component with accessibility features, range support, and localization.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const datePickerTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Date Picker Playground</h2>
                <p class="subtitle">Customize and interact with date picker in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-date-picker id="playground-date-picker" label="Select Date" placeholder="Choose a date..."></mjo-date-picker>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" placeholder="Enter label..." oninput="changeDatePickerProp('label', this.value)" value="Select Date" />
                        </div>

                        <div class="control-group">
                            <h4>Placeholder</h4>
                            <input type="text" placeholder="Enter placeholder..." oninput="changeDatePickerProp('placeholder', this.value)" value="Choose a date..." />
                        </div>

                        <div class="control-group">
                            <h4>Mode</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDatePickerProp('range', this.checked || false)" />
                                    <span>Range Mode</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDatePickerProp('clearabled', this.checked || false)" />
                                    <span>Clearable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDatePickerProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDatePickerProp('required', this.checked || false)" />
                                    <span>Required</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeDatePickerProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeDatePickerProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Display Mode</h4>
                            <select onchange="changeDatePickerProp('displayMode', this.value)">
                                <option value="iso" selected>ISO (YYYY-MM-DD)</option>
                                <option value="localized">Localized</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Locale</h4>
                            <select onchange="changeDatePickerProp('locale', this.value)">
                                <option value="en" selected>English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="it">Italiano</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Accessibility</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDatePickerProp('announceSelections', !this.checked)" />
                                    <span>Disable Announcements</span>
                                </label>
                            </div>
                            <select onchange="changeDatePickerProp('ariaLive', this.value)">
                                <option value="polite" selected>Polite</option>
                                <option value="assertive">Assertive</option>
                                <option value="off">Off</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Date Constraints</h4>
                            <input type="date" placeholder="Min date..." oninput="changeDatePickerProp('minDate', this.value)" />
                            <input type="date" placeholder="Max date..." oninput="changeDatePickerProp('maxDate', this.value)" />
                        </div>

                        <div class="control-group">
                            <h4>Close Behavior</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" checked onchange="changeDatePickerProp('closeOnSelect', this.checked || false)" />
                                    <span>Close on Select</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-date-picker component.</p>

                <h3>Basic Usage</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="Birth Date" placeholder="Select your birth date"></mjo-date-picker>
                    <mjo-date-picker label="Meeting Date" placeholder="Choose meeting date" clearabled></mjo-date-picker>
                    <mjo-date-picker label="Deadline" placeholder="Set deadline" required></mjo-date-picker>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="Small" size="small" placeholder="Small size"></mjo-date-picker>
                    <mjo-date-picker label="Medium" size="medium" placeholder="Medium size"></mjo-date-picker>
                    <mjo-date-picker label="Large" size="large" placeholder="Large size"></mjo-date-picker>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="Primary" color="primary" placeholder="Primary color"></mjo-date-picker>
                    <mjo-date-picker label="Secondary" color="secondary" placeholder="Secondary color"></mjo-date-picker>
                </div>

                <h3>Range Selection</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="Project Timeline" range clearabled placeholder="Select start and end dates"></mjo-date-picker>
                    <mjo-date-picker label="Vacation Period" range placeholder="Choose vacation dates"></mjo-date-picker>
                    <mjo-date-picker label="Event Duration" range required placeholder="Required date range"></mjo-date-picker>
                </div>

                <h3>Display Modes</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="ISO Format" display-mode="iso" value="2025-03-15" placeholder="ISO format"></mjo-date-picker>
                    <mjo-date-picker label="Localized" display-mode="localized" locale="es" value="2025-03-15" placeholder="Formato localizado"></mjo-date-picker>
                    <mjo-date-picker label="Range ISO" range display-mode="iso" value="2025-03-15/2025-03-20" placeholder="ISO range"></mjo-date-picker>
                    <mjo-date-picker label="Range Localized" range display-mode="localized" locale="fr" value="2025-03-15/2025-03-20" placeholder="Plage localisée"></mjo-date-picker>
                </div>

                <h3>Localization</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="English" locale="en" display-mode="localized" placeholder="Select date"></mjo-date-picker>
                    <mjo-date-picker label="Español" locale="es" display-mode="localized" placeholder="Seleccionar fecha"></mjo-date-picker>
                    <mjo-date-picker label="Français" locale="fr" display-mode="localized" placeholder="Sélectionner une date"></mjo-date-picker>
                    <mjo-date-picker label="Deutsch" locale="de" display-mode="localized" placeholder="Datum auswählen"></mjo-date-picker>
                </div>

                <h3>Date Constraints</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="Future Only" min-date="2025-01-01" placeholder="Only future dates"></mjo-date-picker>
                    <mjo-date-picker label="This Year" min-date="2025-01-01" max-date="2025-12-31" placeholder="Only 2025"></mjo-date-picker>
                    <mjo-date-picker label="Past Only" max-date="2024-12-31" placeholder="Only past dates"></mjo-date-picker>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="With Announcements" announce-selections aria-describedby="help1" placeholder="Announces selections"></mjo-date-picker>
                    <mjo-date-picker label="Assertive Live Region" aria-live="assertive" announce-selections placeholder="Assertive announcements"></mjo-date-picker>
                    <mjo-date-picker label="Range with Announcements" range announce-selections aria-describedby="help2" placeholder="Range with announcements"></mjo-date-picker>
                </div>
                <small id="help1">This date picker will announce selections to screen readers.</small>
                <br />
                <small id="help2">This range picker will announce both start and end date selections.</small>

                <h3>Disabled State</h3>
                <div class="component-showcase">
                    <mjo-date-picker label="Disabled" disabled placeholder="Cannot interact"></mjo-date-picker>
                    <mjo-date-picker label="Disabled with Value" disabled value="2025-03-15" placeholder="Has value but disabled"></mjo-date-picker>
                    <mjo-date-picker label="Disabled Range" range disabled value="2025-03-15/2025-03-20" placeholder="Disabled range"></mjo-date-picker>
                </div>

                <h3>Form Integration</h3>
                <div class="component-showcase form-example">
                    <mjo-form>
                        <mjo-date-picker name="startDate" label="Start Date" required placeholder="Enter start date"></mjo-date-picker>
                        <mjo-date-picker name="endDate" label="End Date" placeholder="Enter end date" clearabled></mjo-date-picker>
                        <mjo-date-picker name="period" label="Full Period" range placeholder="Select period range"></mjo-date-picker>
                        <mjo-button type="submit">Submit Form</mjo-button>
                    </mjo-form>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(datePickerTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/date-picker-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-date-picker.css"],
        });
    }
}
