import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class TabsController {
    /**
     * Renders the complete demo page for mjo-tabs
     */
    async renderTabsPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-tabs");

        if (!component) {
            throw new Error("mjo-tabs component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Interactive tab navigation component with multiple variants and configurations.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const tabsTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Tabs Playground</h2>
                <p class="subtitle">Customize and interact with tabs in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase tabs-playground">
                        <mjo-tabs id="playground-tabs" variant="light" color="default">
                            <mjo-tab label="Design">
                                <div class="tab-content">
                                    <h3>🎨 Design Tab</h3>
                                    <p>
                                        This tab contains design-related content. You can customize the appearance of tabs using different variants and colors.
                                    </p>
                                    <div class="demo-buttons">
                                        <button class="demo-btn">Primary Action</button>
                                        <button class="demo-btn secondary">Secondary Action</button>
                                    </div>
                                </div>
                            </mjo-tab>
                            <mjo-tab label="Development">
                                <div class="tab-content">
                                    <h3>⚡ Development Tab</h3>
                                    <p>Development content goes here. This demonstrates how tab content can be structured.</p>
                                    <pre class="code-block">
const tabs = document.querySelector('mjo-tabs');
tabs.setTab(1); // Switch to second tab</pre
                                    >
                                </div>
                            </mjo-tab>
                            <mjo-tab label="Testing">
                                <div class="tab-content">
                                    <h3>🧪 Testing Tab</h3>
                                    <p>Testing and QA content. Each tab can contain complex content including forms, images, and interactive elements.</p>
                                    <ul class="feature-list">
                                        <li>✅ Unit Testing</li>
                                        <li>✅ Integration Testing</li>
                                        <li>✅ E2E Testing</li>
                                        <li>⏳ Performance Testing</li>
                                    </ul>
                                </div>
                            </mjo-tab>
                        </mjo-tabs>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Variant</h4>
                            <select onchange="changeTabsProp('variant', this.value)">
                                <option value="light" selected>Light</option>
                                <option value="solid">Solid</option>
                                <option value="bordered">Bordered</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeTabsProp('color', this.value)">
                                <option value="default" selected>Default</option>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                                <option value="info">Info</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Layout</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeTabsProp('vertical', this.checked)" />
                                    <span>Vertical</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Tab Actions</h4>
                            <div class="button-group">
                                <button onclick="switchToTab(0)" class="control-btn">Tab 1</button>
                                <button onclick="switchToTab(1)" class="control-btn">Tab 2</button>
                                <button onclick="switchToTab(2)" class="control-btn">Tab 3</button>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Dynamic Tabs</h4>
                            <div class="button-group">
                                <button onclick="addNewTab()" class="control-btn">Add Tab</button>
                                <button onclick="removeLastTab()" class="control-btn">Remove Last</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Different implementations and use cases of mjo-tabs component.</p>

                <h3>Variants</h3>
                <div class="tabs-example-group">
                    <div class="tabs-example-item">
                        <h4>Light Variant</h4>
                        <mjo-tabs variant="light" color="primary">
                            <mjo-tab label="Home">Welcome to the home section with light variant styling.</mjo-tab>
                            <mjo-tab label="About">About us page content goes here.</mjo-tab>
                            <mjo-tab label="Contact">Contact information and form.</mjo-tab>
                        </mjo-tabs>
                    </div>

                    <div class="tabs-example-item">
                        <h4>Solid Variant</h4>
                        <mjo-tabs variant="solid" color="secondary">
                            <mjo-tab label="Dashboard">Dashboard overview with solid styling.</mjo-tab>
                            <mjo-tab label="Analytics">Analytics and reports section.</mjo-tab>
                            <mjo-tab label="Settings">User settings and preferences.</mjo-tab>
                        </mjo-tabs>
                    </div>

                    <div class="tabs-example-item">
                        <h4>Bordered Variant</h4>
                        <mjo-tabs variant="bordered" color="success">
                            <mjo-tab label="Products">Our product catalog and listings.</mjo-tab>
                            <mjo-tab label="Services">Available services and pricing.</mjo-tab>
                            <mjo-tab label="Support">Help and support resources.</mjo-tab>
                        </mjo-tabs>
                    </div>
                </div>

                <h3>Colors</h3>
                <div class="tabs-example-group">
                    <div class="tabs-example-item">
                        <h4>Primary Color</h4>
                        <mjo-tabs variant="light" color="primary">
                            <mjo-tab label="Primary">Primary color theme demonstration.</mjo-tab>
                            <mjo-tab label="Features">Key features and benefits.</mjo-tab>
                        </mjo-tabs>
                    </div>

                    <div class="tabs-example-item">
                        <h4>Warning Color</h4>
                        <mjo-tabs variant="light" color="warning">
                            <mjo-tab label="Warnings">Important warnings and alerts.</mjo-tab>
                            <mjo-tab label="Guidelines">Safety guidelines and best practices.</mjo-tab>
                        </mjo-tabs>
                    </div>

                    <div class="tabs-example-item">
                        <h4>Error Color</h4>
                        <mjo-tabs variant="light" color="error">
                            <mjo-tab label="Errors">Error handling and troubleshooting.</mjo-tab>
                            <mjo-tab label="Debug">Debug information and logs.</mjo-tab>
                        </mjo-tabs>
                    </div>
                </div>

                <h3>Vertical Layout</h3>
                <div class="tabs-example-group">
                    <div class="tabs-example-item vertical-example">
                        <h4>Vertical Tabs - Light</h4>
                        <mjo-tabs variant="light" color="info" vertical>
                            <mjo-tab label="Navigation">Vertical navigation example.</mjo-tab>
                            <mjo-tab label="Content">Main content area.</mjo-tab>
                            <mjo-tab label="Sidebar">Sidebar information.</mjo-tab>
                        </mjo-tabs>
                    </div>

                    <div class="tabs-example-item vertical-example">
                        <h4>Vertical Tabs - Solid</h4>
                        <mjo-tabs variant="solid" color="primary" vertical>
                            <mjo-tab label="Profile">User profile settings.</mjo-tab>
                            <mjo-tab label="Security">Security and privacy options.</mjo-tab>
                            <mjo-tab label="Billing">Billing and subscription info.</mjo-tab>
                        </mjo-tabs>
                    </div>
                </div>

                <h3>Complex Content</h3>
                <div class="tabs-example-group">
                    <div class="tabs-example-item full-width">
                        <h4>Rich Content Example</h4>
                        <mjo-tabs variant="bordered" color="default">
                            <mjo-tab label="Overview">
                                <div class="rich-content">
                                    <h3>📊 Project Overview</h3>
                                    <div class="stats-grid">
                                        <div class="stat-card">
                                            <div class="stat-value">1,234</div>
                                            <div class="stat-label">Total Users</div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-value">98.5%</div>
                                            <div class="stat-label">Uptime</div>
                                        </div>
                                        <div class="stat-card">
                                            <div class="stat-value">42</div>
                                            <div class="stat-label">Active Projects</div>
                                        </div>
                                    </div>
                                </div>
                            </mjo-tab>
                            <mjo-tab label="Details">
                                <div class="rich-content">
                                    <h3>📋 Detailed Information</h3>
                                    <p>This tab demonstrates how complex content can be organized within tabs.</p>
                                    <div class="info-grid">
                                        <div class="info-item"><strong>Created:</strong> January 2024</div>
                                        <div class="info-item"><strong>Last Updated:</strong> Today</div>
                                        <div class="info-item"><strong>Status:</strong> Active</div>
                                        <div class="info-item"><strong>Version:</strong> 1.2.3</div>
                                    </div>
                                </div>
                            </mjo-tab>
                            <mjo-tab label="Actions">
                                <div class="rich-content">
                                    <h3>⚡ Available Actions</h3>
                                    <div class="actions-grid">
                                        <button class="action-btn primary">Export Data</button>
                                        <button class="action-btn secondary">Generate Report</button>
                                        <button class="action-btn">Backup Settings</button>
                                        <button class="action-btn warning">Reset Configuration</button>
                                    </div>
                                </div>
                            </mjo-tab>
                        </mjo-tabs>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(tabsTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/tabs-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-tabs.css"],
        });
    }
}
