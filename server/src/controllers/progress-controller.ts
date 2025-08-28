import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class ProgressController {
    /**
     * Renders the complete demo page for mjo-progress
     */
    async renderProgressPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-progress");

        if (!component) {
            throw new Error("mjo-progress component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays progress indicators with bars and circles.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const progressTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Progress Playground</h2>
                <p class="subtitle">Customize and interact with progress indicators in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-progress id="playground-progress" value="50" label="Loading..."></mjo-progress>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Value</h4>
                            <input type="range" min="0" max="100" value="50" oninput="changeProgressProp('value', this.value)" />
                            <span id="value-display">50%</span>
                        </div>

                        <div class="control-group">
                            <h4>Min</h4>
                            <input type="number" min="0" max="50" value="0" oninput="changeProgressProp('min', this.value)" />
                        </div>

                        <div class="control-group">
                            <h4>Max</h4>
                            <input type="number" min="50" max="200" value="100" oninput="changeProgressProp('max', this.value)" />
                        </div>

                        <div class="control-group">
                            <h4>Variant</h4>
                            <select onchange="changeProgressProp('variant', this.value)">
                                <option value="bar" selected>Bar</option>
                                <option value="circle">Circle</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeProgressProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeProgressProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                                <option value="info">Info</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Label</h4>
                            <input type="text" placeholder="Enter label..." oninput="changeProgressProp('label', this.value)" value="Loading..." />
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeProgressProp('showValue', this.checked || false)" />
                                    <span>Show Value</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeProgressProp('indeterminate', this.checked || false)" />
                                    <span>Indeterminate</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-progress component.</p>

                <h3>Variants</h3>
                <div class="component-showcase">
                    <div class="progress-example">
                        <h4>Bar Progress</h4>
                        <mjo-progress value="75" label="Bar Progress" showValue></mjo-progress>
                    </div>
                    <div class="progress-example">
                        <h4>Circle Progress</h4>
                        <mjo-progress value="75" variant="circle" label="Circle Progress" showValue></mjo-progress>
                    </div>
                </div>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <div class="progress-example">
                        <h4>Small</h4>
                        <mjo-progress value="40" size="small" label="Small Progress" showValue></mjo-progress>
                    </div>
                    <div class="progress-example">
                        <h4>Medium</h4>
                        <mjo-progress value="60" size="medium" label="Medium Progress" showValue></mjo-progress>
                    </div>
                    <div class="progress-example">
                        <h4>Large</h4>
                        <mjo-progress value="80" size="large" label="Large Progress" showValue></mjo-progress>
                    </div>
                </div>

                <h3>Circle Sizes</h3>
                <div class="component-showcase">
                    <mjo-progress value="30" variant="circle" size="small" showValue></mjo-progress>
                    <mjo-progress value="50" variant="circle" size="medium" showValue></mjo-progress>
                    <mjo-progress value="70" variant="circle" size="large" showValue></mjo-progress>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-progress value="60" color="primary" label="Primary" showValue></mjo-progress>
                    <mjo-progress value="60" color="secondary" label="Secondary" showValue></mjo-progress>
                    <mjo-progress value="60" color="success" label="Success" showValue></mjo-progress>
                    <mjo-progress value="60" color="warning" label="Warning" showValue></mjo-progress>
                    <mjo-progress value="60" color="error" label="Error" showValue></mjo-progress>
                    <mjo-progress value="60" color="info" label="Info" showValue></mjo-progress>
                </div>

                <h3>Circle Colors</h3>
                <div class="component-showcase">
                    <mjo-progress value="70" variant="circle" color="primary" showValue></mjo-progress>
                    <mjo-progress value="70" variant="circle" color="secondary" showValue></mjo-progress>
                    <mjo-progress value="70" variant="circle" color="success" showValue></mjo-progress>
                    <mjo-progress value="70" variant="circle" color="warning" showValue></mjo-progress>
                    <mjo-progress value="70" variant="circle" color="error" showValue></mjo-progress>
                    <mjo-progress value="70" variant="circle" color="info" showValue></mjo-progress>
                </div>

                <h3>With Labels and Values</h3>
                <div class="component-showcase">
                    <div class="progress-example">
                        <mjo-progress value="25" label="Uploading files..." showValue></mjo-progress>
                    </div>
                    <div class="progress-example">
                        <mjo-progress value="50" label="Processing data..." showValue></mjo-progress>
                    </div>
                    <div class="progress-example">
                        <mjo-progress value="90" label="Almost done..." showValue></mjo-progress>
                    </div>
                </div>

                <h3>Indeterminate</h3>
                <div class="component-showcase">
                    <div class="progress-example">
                        <h4>Bar Indeterminate</h4>
                        <mjo-progress indeterminate label="Loading..."></mjo-progress>
                    </div>
                    <div class="progress-example">
                        <h4>Circle Indeterminate</h4>
                        <mjo-progress indeterminate variant="circle" label="Processing..."></mjo-progress>
                    </div>
                </div>

                <h3>Custom Range</h3>
                <div class="component-showcase">
                    <div class="progress-example">
                        <h4>Custom Min/Max (10-50)</h4>
                        <mjo-progress min="10" max="50" value="30" label="Custom Range" showValue></mjo-progress>
                    </div>
                    <div class="progress-example">
                        <h4>Custom Min/Max (0-200)</h4>
                        <mjo-progress min="0" max="200" value="150" label="Extended Range" showValue></mjo-progress>
                    </div>
                </div>

                <h3>Interactive Examples</h3>
                <div class="component-showcase">
                    <div class="progress-example">
                        <h4>Animated Progress</h4>
                        <mjo-progress id="animated-progress" value="0" label="Click to animate" showValue></mjo-progress>
                        <button onclick="animateProgress()">Start Animation</button>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(progressTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/progress-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-progress.css"],
        });
    }
}
