import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class DropdownController {
    /**
     * Renders the complete demo page for mjo-dropdown
     */
    async renderDropdownPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-dropdown");

        if (!component) {
            throw new Error("mjo-dropdown component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that provides floating panels with customizable content and positioning.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const dropdownTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Dropdown Playground</h2>
                <p class="subtitle">Customize and interact with dropdowns in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-dropdown id="playground-dropdown" behaviour="click">
                            <button class="dropdown-trigger">Click me for dropdown</button>
                        </mjo-dropdown>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Behaviour</h4>
                            <select onchange="changeDropdownProp('behaviour', this.value)">
                                <option value="hover">Hover</option>
                                <option value="click" selected>Click</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Position</h4>
                            <select onchange="changeDropdownProp('position', this.value)">
                                <option value="left-top">Left Top</option>
                                <option value="center-top">Center Top</option>
                                <option value="right-top">Right Top</option>
                                <option value="left-middle">Left Middle</option>
                                <option value="right-middle">Right Middle</option>
                                <option value="left-bottom">Left Bottom</option>
                                <option value="center-bottom" selected>Center Bottom</option>
                                <option value="right-bottom">Right Bottom</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Options</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDropdownProp('fullwidth', this.checked || false)" />
                                    <span>Full Width</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDropdownProp('preventScroll', this.checked || false)" />
                                    <span>Prevent Scroll</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDropdownProp('preventCloseOnInnerClick', this.checked || false)" />
                                    <span>Prevent Close on Inner Click</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDropdownProp('restoreFocus', this.checked || false)" checked />
                                    <span>Restore Focus</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeDropdownProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Dimensions</h4>
                            <input type="text" placeholder="Width (e.g. 200px, 100%)" oninput="changeDropdownProp('width', this.value)" />
                            <input type="text" placeholder="Height (e.g. 300px)" oninput="changeDropdownProp('height', this.value)" />
                        </div>

                        <div class="control-group">
                            <h4>Content</h4>
                            <select onchange="changeDropdownContent(this.value)">
                                <option value="menu" selected>Menu Items</option>
                                <option value="form">Form Content</option>
                                <option value="list">List Items</option>
                                <option value="cards">Card Layout</option>
                                <option value="custom">Custom HTML</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-dropdown component.</p>

                <h3>Basic Dropdown (Click)</h3>
                <div class="component-showcase">
                    <mjo-dropdown behaviour="click" class="basic-dropdown">
                        <button class="dropdown-button">Options ▼</button>
                    </mjo-dropdown>

                    <mjo-dropdown behaviour="click" class="primary-dropdown">
                        <button class="dropdown-button primary">Actions ▼</button>
                    </mjo-dropdown>

                    <mjo-dropdown behaviour="click" class="secondary-dropdown">
                        <button class="dropdown-button secondary">Menu ▼</button>
                    </mjo-dropdown>
                </div>

                <h3>Hover Dropdown</h3>
                <div class="component-showcase">
                    <mjo-dropdown behaviour="hover" class="hover-dropdown">
                        <div class="hover-trigger">Hover over me</div>
                    </mjo-dropdown>

                    <mjo-dropdown behaviour="hover" position="right-bottom" class="hover-right-dropdown">
                        <div class="hover-trigger">Hover (Right)</div>
                    </mjo-dropdown>
                </div>

                <h3>Different Positions</h3>
                <div class="component-showcase positions-demo">
                    <div class="position-row">
                        <mjo-dropdown behaviour="click" position="right-top" class="position-dropdown">
                            <button class="dropdown-button small">Right Top ▲</button>
                        </mjo-dropdown>
                        <mjo-dropdown behaviour="click" position="center-top" class="position-dropdown">
                            <button class="dropdown-button small">Center Top ▲</button>
                        </mjo-dropdown>
                        <mjo-dropdown behaviour="click" position="left-top" class="position-dropdown">
                            <button class="dropdown-button small">Left Top ▲</button>
                        </mjo-dropdown>
                    </div>

                    <div class="position-row">
                        <mjo-dropdown behaviour="click" position="right-middle" class="position-dropdown">
                            <button class="dropdown-button small">Right Middle ►</button>
                        </mjo-dropdown>
                        <div class="center-space"></div>
                        <mjo-dropdown behaviour="click" position="left-middle" class="position-dropdown">
                            <button class="dropdown-button small">Left Middle ◄</button>
                        </mjo-dropdown>
                    </div>

                    <div class="position-row">
                        <mjo-dropdown behaviour="click" position="right-bottom" class="position-dropdown">
                            <button class="dropdown-button small">Right Bottom ▼</button>
                        </mjo-dropdown>
                        <mjo-dropdown behaviour="click" position="center-bottom" class="position-dropdown">
                            <button class="dropdown-button small">Center Bottom ▼</button>
                        </mjo-dropdown>
                        <mjo-dropdown behaviour="click" position="left-bottom" class="position-dropdown">
                            <button class="dropdown-button small">Left Bottom ▼</button>
                        </mjo-dropdown>
                    </div>
                </div>

                <h3>Full Width Dropdown</h3>
                <div class="component-showcase">
                    <mjo-dropdown behaviour="click" fullwidth class="fullwidth-dropdown">
                        <button class="dropdown-button wide">Full Width Dropdown ▼</button>
                    </mjo-dropdown>
                </div>

                <h3>Custom Content Types</h3>
                <div class="component-showcase">
                    <mjo-dropdown behaviour="click" class="form-dropdown">
                        <button class="dropdown-button">Form Dropdown ▼</button>
                    </mjo-dropdown>

                    <mjo-dropdown behaviour="click" class="card-dropdown">
                        <button class="dropdown-button">Card Dropdown ▼</button>
                    </mjo-dropdown>

                    <mjo-dropdown behaviour="click" preventCloseOnInnerClick class="interactive-dropdown">
                        <button class="dropdown-button">Interactive Content ▼</button>
                    </mjo-dropdown>
                </div>

                <h3>Disabled State</h3>
                <div class="component-showcase">
                    <mjo-dropdown behaviour="click" disabled class="disabled-dropdown">
                        <button class="dropdown-button" disabled>Disabled Dropdown ▼</button>
                    </mjo-dropdown>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(dropdownTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/dropdown-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-dropdown.css"],
        });
    }
}
