import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class CheckboxController {
    /**
     * Renders the complete demo page for mjo-checkbox
     */
    async renderCheckboxPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-checkbox");

        if (!component) {
            throw new Error("mjo-checkbox component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Configurable, accessible checkbox component with form integration, validation support, and advanced features like indeterminate state.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const checkboxTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Checkbox Playground</h2>
                <p class="subtitle">Customize and interact with checkboxes in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-checkbox id="playground-checkbox" label="Interactive Demo" name="demo" value="demo-value"></mjo-checkbox>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input
                                type="text"
                                name="label"
                                placeholder="Enter label..."
                                oninput="changeCheckboxProp('label', this.value)"
                                value="Interactive Demo"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeCheckboxProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>State</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="checked" type="checkbox" onchange="changeCheckboxProp('checked', this.checked || false)" />
                                    <span>Checked</span>
                                </label>
                                <label class="toggle">
                                    <input name="indeterminate" type="checkbox" onchange="changeCheckboxProp('indeterminate', this.checked || false)" />
                                    <span>Indeterminate</span>
                                </label>
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeCheckboxProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Name</h4>
                            <input name="name" type="text" placeholder="Enter name..." oninput="changeCheckboxProp('name', this.value)" value="demo" />
                        </div>

                        <div class="control-group">
                            <h4>Value</h4>
                            <input name="value" type="text" placeholder="Enter value..." oninput="changeCheckboxProp('value', this.value)" value="demo-value" />
                        </div>

                        <div class="control-group">
                            <h4>Helper Text</h4>
                            <input
                                name="helperText"
                                type="text"
                                placeholder="Enter helper text..."
                                oninput="changeCheckboxProp('helperText', this.value)"
                                value=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-checkbox component.</p>

                <h3>Basic States</h3>
                <div class="component-showcase">
                    <mjo-checkbox label="Unchecked" name="basic1" value="unchecked"></mjo-checkbox>
                    <mjo-checkbox label="Checked" name="basic2" value="checked" checked></mjo-checkbox>
                    <mjo-checkbox label="Indeterminate" name="basic3" value="indeterminate" indeterminate></mjo-checkbox>
                    <mjo-checkbox label="Disabled" name="basic4" value="disabled" disabled></mjo-checkbox>
                    <mjo-checkbox label="Disabled Checked" name="basic5" value="disabled-checked" disabled checked></mjo-checkbox>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-checkbox label="Primary" name="color1" value="primary" color="primary" checked></mjo-checkbox>
                    <mjo-checkbox label="Secondary" name="color2" value="secondary" color="secondary" checked></mjo-checkbox>
                </div>

                <h3>With Helper Text</h3>
                <div class="component-showcase checkbox-showcase-vertical">
                    <mjo-checkbox
                        label="Terms and Conditions"
                        name="terms1"
                        value="accepted"
                        helperText="Please read our terms and conditions before accepting"
                    ></mjo-checkbox>
                    <mjo-checkbox
                        label="Newsletter Subscription"
                        name="newsletter1"
                        value="subscribed"
                        helperText="Get the latest updates and news"
                        checked
                    ></mjo-checkbox>
                    <mjo-checkbox
                        label="Marketing Communications"
                        name="marketing1"
                        value="enabled"
                        helperText="Receive promotional emails and offers"
                        color="secondary"
                    ></mjo-checkbox>
                </div>

                <h3>Checkbox Groups</h3>
                <div class="component-showcase checkbox-showcase-vertical">
                    <h4>Preferences (checkgroup: "preferences")</h4>
                    <mjo-checkbox label="Email Notifications" name="pref" value="email" checkgroup="preferences" checked></mjo-checkbox>
                    <mjo-checkbox label="SMS Notifications" name="pref" value="sms" checkgroup="preferences"></mjo-checkbox>
                    <mjo-checkbox label="Push Notifications" name="pref" value="push" checkgroup="preferences" checked></mjo-checkbox>
                    <mjo-checkbox label="Desktop Notifications" name="pref" value="desktop" checkgroup="preferences"></mjo-checkbox>
                </div>

                <div class="component-showcase checkbox-showcase-vertical">
                    <h4>Features (checkgroup: "features")</h4>
                    <mjo-checkbox label="Dark Mode" name="feat" value="dark" checkgroup="features" color="secondary"></mjo-checkbox>
                    <mjo-checkbox label="Auto Save" name="feat" value="autosave" checkgroup="features" color="secondary" checked></mjo-checkbox>
                    <mjo-checkbox label="Cloud Sync" name="feat" value="sync" checkgroup="features" color="secondary"></mjo-checkbox>
                    <mjo-checkbox label="Analytics" name="feat" value="analytics" checkgroup="features" color="secondary" indeterminate></mjo-checkbox>
                </div>

                <h3>Form Integration Example</h3>
                <div class="component-showcase checkbox-showcase-vertical">
                    <mjo-checkbox
                        label="Required Field"
                        name="required-demo"
                        value="required"
                        helperText="This field is required for form submission"
                        required
                    ></mjo-checkbox>
                    <mjo-checkbox
                        label="Optional Newsletter"
                        name="newsletter-demo"
                        value="newsletter"
                        helperText="Subscribe to our weekly newsletter"
                    ></mjo-checkbox>
                    <mjo-checkbox label="Privacy Policy" name="privacy-demo" value="privacy" helperText="I agree to the privacy policy" required></mjo-checkbox>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase checkbox-showcase-vertical">
                    <mjo-checkbox
                        label="Enhanced Accessibility"
                        name="a11y1"
                        value="enhanced"
                        helperText="This checkbox has enhanced ARIA support"
                        aria-describedby="enhanced-help"
                    ></mjo-checkbox>
                    <mjo-checkbox
                        label="Screen Reader Friendly"
                        name="a11y2"
                        value="screenreader"
                        helperText="Optimized for screen readers"
                        checked
                    ></mjo-checkbox>
                    <mjo-checkbox
                        label="Keyboard Navigation"
                        name="a11y3"
                        value="keyboard"
                        helperText="Fully accessible via keyboard"
                        indeterminate
                    ></mjo-checkbox>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(checkboxTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/checkbox-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-checkbox.css"],
        });
    }
}
