import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class RadioController {
    /**
     * Renders the complete demo page for mjo-radio
     */
    async renderRadioPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-radio");

        if (!component) {
            throw new Error("mjo-radio component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Accessible radio button component with enhanced features, form integration, and comprehensive keyboard navigation support.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const radioTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Radio Playground</h2>
                <p class="subtitle">Customize and interact with radio buttons in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-radio id="playground-radio" label="Interactive Demo" name="demo" value="demo-value"></mjo-radio>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Label</h4>
                            <input
                                type="text"
                                name="label"
                                placeholder="Enter label..."
                                oninput="changeRadioProp('label', this.value)"
                                value="Interactive Demo"
                            />
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select name="color" onchange="changeRadioProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>State</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input name="checked" type="checkbox" onchange="changeRadioProp('checked', this.checked || false)" />
                                    <span>Checked</span>
                                </label>
                                <label class="toggle">
                                    <input name="disabled" type="checkbox" onchange="changeRadioProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Name</h4>
                            <input name="name" type="text" placeholder="Enter name..." oninput="changeRadioProp('name', this.value)" value="demo" />
                        </div>

                        <div class="control-group">
                            <h4>Value</h4>
                            <input name="value" type="text" placeholder="Enter value..." oninput="changeRadioProp('value', this.value)" value="demo-value" />
                        </div>

                        <div class="control-group">
                            <h4>Helper Text</h4>
                            <input
                                name="helperText"
                                type="text"
                                placeholder="Enter helper text..."
                                oninput="changeRadioProp('helperText', this.value)"
                                value=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-radio component.</p>

                <h3>Basic States</h3>
                <div class="component-showcase">
                    <mjo-radio label="Unchecked" name="basic" value="unchecked"></mjo-radio>
                    <mjo-radio label="Checked" name="basic" value="checked" checked></mjo-radio>
                    <mjo-radio label="Disabled" name="disabled-demo" value="disabled" disabled></mjo-radio>
                    <mjo-radio label="Disabled Checked" name="disabled-demo2" value="disabled-checked" disabled checked></mjo-radio>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-radio label="Primary" name="color-demo" value="primary" color="primary" checked></mjo-radio>
                    <mjo-radio label="Secondary" name="color-demo2" value="secondary" color="secondary" checked></mjo-radio>
                </div>

                <h3>With Helper Text</h3>
                <div class="component-showcase radio-showcase-vertical">
                    <mjo-radio label="Basic Plan" name="plan" value="basic" helperText="Free with limited features" checked></mjo-radio>
                    <mjo-radio label="Pro Plan" name="plan" value="pro" helperText="$9.99/month with advanced features"></mjo-radio>
                    <mjo-radio label="Enterprise Plan" name="plan" value="enterprise" helperText="Custom pricing for large teams" color="secondary"></mjo-radio>
                </div>

                <h3>Radio Button Groups</h3>
                <div class="component-showcase radio-showcase-vertical">
                    <h4>Framework Preference</h4>
                    <mjo-radio label="React" name="framework" value="react"></mjo-radio>
                    <mjo-radio label="Vue.js" name="framework" value="vue" checked></mjo-radio>
                    <mjo-radio label="Angular" name="framework" value="angular"></mjo-radio>
                    <mjo-radio label="Lit" name="framework" value="lit"></mjo-radio>
                </div>

                <div class="component-showcase radio-showcase-vertical">
                    <h4>Experience Level</h4>
                    <mjo-radio label="Beginner" name="experience" value="beginner" color="secondary" helperText="0-1 years"></mjo-radio>
                    <mjo-radio label="Intermediate" name="experience" value="intermediate" color="secondary" helperText="2-5 years" checked></mjo-radio>
                    <mjo-radio label="Advanced" name="experience" value="advanced" color="secondary" helperText="5+ years"></mjo-radio>
                    <mjo-radio label="Expert" name="experience" value="expert" color="secondary" helperText="10+ years"></mjo-radio>
                </div>

                <h3>Form Integration Example</h3>
                <div class="component-showcase radio-showcase-vertical">
                    <h4>Gender (Required)</h4>
                    <mjo-radio label="Male" name="gender" value="male" helperText="Required field" required></mjo-radio>
                    <mjo-radio label="Female" name="gender" value="female" helperText="Required field" required></mjo-radio>
                    <mjo-radio label="Other" name="gender" value="other" helperText="Required field" required></mjo-radio>
                    <mjo-radio label="Prefer not to say" name="gender" value="prefer-not-to-say" helperText="Required field" required></mjo-radio>
                </div>

                <h3>Communication Preferences</h3>
                <div class="component-showcase radio-showcase-vertical">
                    <mjo-radio
                        label="Email Updates"
                        name="communication"
                        value="email"
                        helperText="Receive updates via email"
                        color="secondary"
                        checked
                    ></mjo-radio>
                    <mjo-radio label="SMS Notifications" name="communication" value="sms" helperText="Receive updates via SMS" color="secondary"></mjo-radio>
                    <mjo-radio
                        label="No Communications"
                        name="communication"
                        value="none"
                        helperText="No promotional communications"
                        color="secondary"
                    ></mjo-radio>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase radio-showcase-vertical">
                    <mjo-radio
                        label="Enhanced Accessibility"
                        name="a11y"
                        value="enhanced"
                        helperText="This radio has enhanced ARIA support"
                        aria-describedby="enhanced-help"
                        checked
                    ></mjo-radio>
                    <mjo-radio label="Screen Reader Friendly" name="a11y" value="screenreader" helperText="Optimized for screen readers"></mjo-radio>
                    <mjo-radio label="Keyboard Navigation" name="a11y" value="keyboard" helperText="Fully accessible via keyboard"></mjo-radio>
                </div>

                <h3>Payment Methods</h3>
                <div class="component-showcase radio-showcase-vertical">
                    <mjo-radio label="Credit Card" name="payment" value="credit" helperText="Visa, MasterCard, American Express"></mjo-radio>
                    <mjo-radio label="PayPal" name="payment" value="paypal" helperText="Pay with your PayPal account" checked></mjo-radio>
                    <mjo-radio label="Bank Transfer" name="payment" value="bank" helperText="Direct bank transfer"></mjo-radio>
                    <mjo-radio label="Cryptocurrency" name="payment" value="crypto" helperText="Bitcoin, Ethereum supported" color="secondary"></mjo-radio>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(radioTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/radio-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-radio.css"],
        });
    }
}
