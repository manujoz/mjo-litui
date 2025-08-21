import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class AlertController {
    /**
     * Renders the complete demo page for mjo-alert
     */
    async renderAlertPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-alert");

        if (!component) {
            throw new Error("mjo-alert component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays contextual alert messages with different types and styles.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const alertTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Alert Playground</h2>
                <p class="subtitle">Customize and interact with alerts in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-alert id="playground-alert" message="Interactive Demo Alert" type="info"></mjo-alert>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Message</h4>
                            <input type="text" placeholder="Enter message..." oninput="changeAlertProp('message', this.value)" value="Interactive Demo Alert" />
                        </div>

                        <div class="control-group">
                            <h4>Detail</h4>
                            <textarea placeholder="Enter detail message..." oninput="changeAlertProp('detail', this.value)" rows="3"></textarea>
                        </div>

                        <div class="control-group">
                            <h4>Type</h4>
                            <select onchange="changeAlertProp('type', this.value)">
                                <option value="info" selected>Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeAlertProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Rounded</h4>
                            <select onchange="changeAlertProp('rounded', this.value)">
                                <option value="none">None</option>
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Animation</h4>
                            <select onchange="changeAlertProp('animation', this.value)">
                                <option value="fade" selected>Fade</option>
                                <option value="slide">Slide</option>
                                <option value="scale">Scale</option>
                                <option value="none">None</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Animation Duration (ms)</h4>
                            <input
                                type="number"
                                min="0"
                                max="2000"
                                step="100"
                                placeholder="300"
                                oninput="changeAlertProp('animationDuration', this.value)"
                                value="300"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Auto Close Delay (ms)</h4>
                            <input
                                type="number"
                                min="1000"
                                max="10000"
                                step="1000"
                                placeholder="5000"
                                oninput="changeAlertProp('autoCloseDelay', this.value)"
                                value="5000"
                            />
                        </div>

                        <div class="control-group">
                            <h4>ARIA Live</h4>
                            <select onchange="changeAlertProp('ariaLive', this.value)">
                                <option value="polite" selected>Polite</option>
                                <option value="assertive">Assertive</option>
                                <option value="off">Off</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAlertProp('closable', this.checked || false)" />
                                    <span>Closable</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAlertProp('hideIcon', this.checked || false)" />
                                    <span>Hide Icon</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAlertProp('autoClose', this.checked || false)" />
                                    <span>Auto Close</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAlertProp('focusOnShow', this.checked || false)" />
                                    <span>Focus On Show</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeAlertProp('persistent', this.checked || false)" />
                                    <span>Persistent</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Actions</h4>
                            <div class="action-buttons">
                                <button onclick="showAlert()">Show Alert</button>
                                <button onclick="hideAlert()">Hide Alert</button>
                                <button onclick="focusAlert()">Focus Alert</button>
                                <button onclick="announceAlert()">Announce Alert</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-alert component.</p>

                <h3>Types</h3>
                <div class="component-showcase vertical">
                    <mjo-alert type="info" message="This is an info alert" detail="Additional information about this alert."></mjo-alert>
                    <mjo-alert type="success" message="Operation completed successfully" detail="Your changes have been saved."></mjo-alert>
                    <mjo-alert type="warning" message="Warning: Please check your data" detail="Some fields may contain invalid information."></mjo-alert>
                    <mjo-alert type="error" message="Error: Something went wrong" detail="Please try again or contact support."></mjo-alert>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase vertical">
                    <mjo-alert type="info" size="small" message="Small alert message"></mjo-alert>
                    <mjo-alert type="success" size="medium" message="Medium alert message"></mjo-alert>
                    <mjo-alert type="warning" size="large" message="Large alert message"></mjo-alert>
                </div>

                <h3>Rounded Corners</h3>
                <div class="component-showcase vertical">
                    <mjo-alert type="info" rounded="none" message="No rounded corners"></mjo-alert>
                    <mjo-alert type="success" rounded="small" message="Small rounded corners"></mjo-alert>
                    <mjo-alert type="warning" rounded="medium" message="Medium rounded corners"></mjo-alert>
                    <mjo-alert type="error" rounded="large" message="Large rounded corners"></mjo-alert>
                </div>

                <h3>Without Icons</h3>
                <div class="component-showcase vertical">
                    <mjo-alert type="info" hideIcon message="Info alert without icon"></mjo-alert>
                    <mjo-alert type="success" hideIcon message="Success alert without icon"></mjo-alert>
                    <mjo-alert type="warning" hideIcon message="Warning alert without icon"></mjo-alert>
                    <mjo-alert type="error" hideIcon message="Error alert without icon"></mjo-alert>
                </div>

                <h3>With Detail Messages</h3>
                <div class="component-showcase vertical">
                    <mjo-alert
                        type="info"
                        message="System Update Available"
                        detail="A new version of the software is available. <strong>Click here</strong> to download and install the update."
                    ></mjo-alert>
                    <mjo-alert
                        type="success"
                        message="Profile Updated"
                        detail="Your profile information has been successfully updated. Changes will be visible across all your connected devices."
                    ></mjo-alert>
                    <mjo-alert
                        type="warning"
                        message="Storage Almost Full"
                        detail="You're using 95% of your storage space. Consider deleting old files or upgrading your plan to avoid service interruption."
                    ></mjo-alert>
                </div>

                <h3>Closable Alerts</h3>
                <div class="component-showcase vertical">
                    <mjo-alert type="info" closable message="Closable info alert" detail="Click the X button to close this alert."></mjo-alert>
                    <mjo-alert type="success" closable message="Closable success alert" detail="This alert can be dismissed by the user."></mjo-alert>
                    <mjo-alert type="warning" closable message="Closable warning alert" detail="User can close this warning when they've read it."></mjo-alert>
                    <mjo-alert type="error" closable message="Closable error alert" detail="This error message can be dismissed after reading."></mjo-alert>
                </div>

                <h3>Simple Messages (No Detail)</h3>
                <div class="component-showcase vertical">
                    <mjo-alert type="info" message="Simple info message"></mjo-alert>
                    <mjo-alert type="success" message="Operation completed!"></mjo-alert>
                    <mjo-alert type="warning" message="Please check your input"></mjo-alert>
                    <mjo-alert type="error" message="Something went wrong"></mjo-alert>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(alertTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/alert-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-alert.css"],
        });
    }
}
