import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class SwitchController {
    /**
     * Renders the complete demo page for mjo-switch
     */
    async renderSwitchPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-switch");

        if (!component) {
            throw new Error("mjo-switch component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Toggle switch component with accessible design, form integration, and support for different colors and sizes.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const switchTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Switch Playground</h2>
                <p class="subtitle">Customize and interact with switches in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-switch id="playground-switch" label="Interactive Demo" name="demo" value="demo-value"></mjo-switch>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input
                                type="text"
                                name="label"
                                placeholder="Enter label..."
                                oninput="changeSwitchProp('label', this.value)"
                                value="Interactive Demo"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeSwitchProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select name="size" onchange="changeSwitchProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>State</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="checked" type="checkbox" onchange="changeSwitchProp('checked', this.checked || false)" />
                                    <span>Checked</span>
                                </label>
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeSwitchProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Name</h4>
                            <input name="name" type="text" placeholder="Enter name..." oninput="changeSwitchProp('name', this.value)" value="demo" />
                        </div>

                        <div class="control-group">
                            <h4>Value</h4>
                            <input name="value" type="text" placeholder="Enter value..." oninput="changeSwitchProp('value', this.value)" value="demo-value" />
                        </div>

                        <div class="control-group">
                            <h4>Helper Text</h4>
                            <input
                                name="helperText"
                                type="text"
                                placeholder="Enter helper text..."
                                oninput="changeSwitchProp('helperText', this.value)"
                                value=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Usage examples of mjo-switch component.</p>

                <h3>Basic States</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <mjo-switch label="Default Switch" name="basic1" value="default"></mjo-switch>
                    <mjo-switch label="Checked Switch" name="basic2" value="checked" checked></mjo-switch>
                    <mjo-switch label="Disabled Switch" name="basic3" value="disabled" disabled></mjo-switch>
                    <mjo-switch label="Disabled Checked" name="basic4" value="disabled-checked" disabled checked></mjo-switch>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <mjo-switch label="Primary Switch" name="color1" value="primary" color="primary" checked></mjo-switch>
                    <mjo-switch label="Secondary Switch" name="color2" value="secondary" color="secondary" checked></mjo-switch>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <mjo-switch label="Small Switch" name="size1" value="small" size="small" checked></mjo-switch>
                    <mjo-switch label="Medium Switch" name="size2" value="medium" size="medium" checked></mjo-switch>
                    <mjo-switch label="Large Switch" name="size3" value="large" size="large" checked></mjo-switch>
                </div>

                <h3>With Helper Text</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <mjo-switch
                        label="Email Notifications"
                        name="notifications1"
                        value="email"
                        helperText="Receive notifications via email"
                        checked
                    ></mjo-switch>
                    <mjo-switch label="Dark Mode" name="theme1" value="dark" helperText="Switch to dark theme" color="secondary"></mjo-switch>
                    <mjo-switch label="Auto Save" name="autosave1" value="enabled" helperText="Automatically save your work"></mjo-switch>
                </div>

                <h3>Switch Groups</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <h4>Settings (checkgroup: "settings")</h4>
                    <mjo-switch label="Push Notifications" name="setting" value="push" checkgroup="settings" checked></mjo-switch>
                    <mjo-switch label="Location Services" name="setting" value="location" checkgroup="settings"></mjo-switch>
                    <mjo-switch label="Analytics" name="setting" value="analytics" checkgroup="settings" checked></mjo-switch>
                    <mjo-switch label="Auto Updates" name="setting" value="updates" checkgroup="settings"></mjo-switch>
                </div>

                <div class="component-showcase switch-showcase-vertical">
                    <h4>Privacy (checkgroup: "privacy")</h4>
                    <mjo-switch label="Data Collection" name="privacy" value="data" checkgroup="privacy" color="secondary"></mjo-switch>
                    <mjo-switch label="Cookies" name="privacy" value="cookies" checkgroup="privacy" color="secondary" checked></mjo-switch>
                    <mjo-switch label="Third-party Sharing" name="privacy" value="sharing" checkgroup="privacy" color="secondary"></mjo-switch>
                    <mjo-switch label="Marketing" name="privacy" value="marketing" checkgroup="privacy" color="secondary"></mjo-switch>
                </div>

                <h3>Form Integration Example</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <mjo-switch
                        label="Required Setting"
                        name="required-demo"
                        value="required"
                        helperText="This setting is required for the application"
                        required
                        checked
                    ></mjo-switch>
                    <mjo-switch label="Optional Feature" name="optional-demo" value="optional" helperText="Enable this optional feature"></mjo-switch>
                    <mjo-switch label="Terms Agreement" name="terms-demo" value="agreed" helperText="I agree to the terms and conditions" required></mjo-switch>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <mjo-switch
                        label="Enhanced Accessibility"
                        name="a11y1"
                        value="enhanced"
                        helperText="This switch has enhanced ARIA support"
                        aria-describedby="enhanced-help"
                        checked
                    ></mjo-switch>
                    <mjo-switch label="Screen Reader Friendly" name="a11y2" value="screenreader" helperText="Optimized for screen readers" checked></mjo-switch>
                    <mjo-switch
                        label="Keyboard Navigation"
                        name="a11y3"
                        value="keyboard"
                        helperText="Fully accessible via keyboard (Space/Enter keys)"
                    ></mjo-switch>
                </div>

                <h3>Advanced Usage</h3>
                <div class="component-showcase switch-showcase-vertical">
                    <mjo-switch
                        label="API Integration"
                        name="api1"
                        value="enabled"
                        helperText="Enable API integration features"
                        size="large"
                        color="primary"
                    ></mjo-switch>
                    <mjo-switch
                        label="Debug Mode"
                        name="debug1"
                        value="active"
                        helperText="Show debug information in console"
                        size="small"
                        color="secondary"
                    ></mjo-switch>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(switchTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/switch-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-switch.css"],
        });
    }
}
