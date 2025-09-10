import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { AiFillStar } from "mjo-icons/ai";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class BreadcrumbsController {
    /**
     * Renders the complete demo page for mjo-breadcrumbs
     */
    async renderBreadcrumbsPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-breadcrumbs");

        if (!component) {
            throw new Error("mjo-breadcrumbs component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component for displaying a breadcrumb navigation with customizable appearance and behavior.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const breadcrumbsTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Breadcrumbs Playground</h2>
                <p class="subtitle">Customize and interact with breadcrumbs in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-breadcrumbs id="playground-breadcrumbs"></mjo-breadcrumbs>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeBreadcrumbsProp('size', this.value)">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeBreadcrumbsProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Variant</h4>
                            <select onchange="changeBreadcrumbsProp('variant', this.value)">
                                <option value="default" selected>Default</option>
                                <option value="solid">Solid</option>
                                <option value="bordered">Bordered</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Settings</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeBreadcrumbsProp('autoNavigate', this.checked)" />
                                    <span>Auto Navigate</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Collapse Strategy</h4>
                            <select onchange="changeBreadcrumbsProp('collapseStrategy', this.value)">
                                <option value="auto" selected>Auto</option>
                                <option value="manual">Manual</option>
                                <option value="responsive">Responsive</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Max Visible Items</h4>
                            <select onchange="changeBreadcrumbsProp('maxVisibleItems', parseInt(this.value))">
                                <option value="0">No limit</option>
                                <option value="3">3 items</option>
                                <option value="4">4 items</option>
                                <option value="5">5 items</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Separator Icon</h4>
                            <select onchange="changeBreadcrumbsProp('separator', this.value)">
                                <option value="" selected>Default (Chevron Right)</option>
                                <option value="icon1">Star</option>
                                <option value="icon2">Home</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Preset Examples</h4>
                            <button onclick="setBasicBreadcrumbs()" class="preset-btn">Basic</button>
                            <button onclick="setWithIconsBreadcrumbs()" class="preset-btn">With Icons</button>
                            <button onclick="setDeepBreadcrumbs()" class="preset-btn">Deep Navigation</button>
                            <button onclick="setCollapseBreadcrumbs()" class="preset-btn">Collapse Test</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Usage examples of mjo-breadcrumbs component.</p>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-breadcrumbs size="small"></mjo-breadcrumbs>
                    <mjo-breadcrumbs size="medium"></mjo-breadcrumbs>
                    <mjo-breadcrumbs size="large"></mjo-breadcrumbs>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-breadcrumbs color="primary"></mjo-breadcrumbs>
                    <mjo-breadcrumbs color="secondary"></mjo-breadcrumbs>
                </div>

                <h3>Variants</h3>
                <div class="component-showcase">
                    <mjo-breadcrumbs variant="default"></mjo-breadcrumbs>
                    <mjo-breadcrumbs variant="solid"></mjo-breadcrumbs>
                    <mjo-breadcrumbs variant="bordered"></mjo-breadcrumbs>
                </div>

                <h3>With Icons</h3>
                <div class="component-showcase">
                    <mjo-breadcrumbs id="icon-breadcrumbs"></mjo-breadcrumbs>
                </div>

                <h3>Deep Navigation</h3>
                <div class="component-showcase">
                    <mjo-breadcrumbs id="deep-breadcrumbs"></mjo-breadcrumbs>
                </div>

                <h3>Custom Separator</h3>
                <div class="component-showcase">
                    <mjo-breadcrumbs id="custom-separator" separator=${AiFillStar}></mjo-breadcrumbs>
                </div>

                <h3>Auto Navigate (Click disabled)</h3>
                <div class="component-showcase">
                    <mjo-breadcrumbs id="auto-navigate" autoNavigate></mjo-breadcrumbs>
                </div>

                <h3>Collapse Strategies</h3>
                <div class="component-showcase">
                    <h4>Manual Collapse (max 3 items)</h4>
                    <div style="width: 300px; border: 2px dashed #ccc; padding: 1rem; margin: 1rem 0;">
                        <mjo-breadcrumbs id="manual-collapse" collapseStrategy="manual"></mjo-breadcrumbs>
                    </div>

                    <h4>Responsive Collapse (Container Queries)</h4>
                    <div style="width: 400px; border: 2px dashed #7dc717; padding: 1rem; margin: 1rem 0; resize: horizontal; overflow: auto;">
                        <mjo-breadcrumbs id="responsive-collapse" collapseStrategy="responsive" color="secondary"></mjo-breadcrumbs>
                    </div>

                    <h4>Auto Collapse</h4>
                    <div style="width: 250px; border: 2px dashed #1aa8ed; padding: 1rem; margin: 1rem 0;">
                        <mjo-breadcrumbs id="auto-collapse" collapseStrategy="auto" variant="bordered"></mjo-breadcrumbs>
                    </div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(breadcrumbsTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/breadcrumbs-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-breadcrumbs.css"],
        });
    }
}
