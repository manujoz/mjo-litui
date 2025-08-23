import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class MenuButtonController {
    /**
     * Renders the complete demo page for mjo-menu-button
     */
    async renderMenuButtonPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-menu-button");

        if (!component) {
            throw new Error("mjo-menu-button component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Animated hamburger menu button with multiple effects and semantic colors.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const menuButtonTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Menu Button Playground</h2>
                <p class="subtitle">Customize and interact with menu buttons in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container interactive-demo">
                    <div class="playground-showcase">
                        <mjo-menu-button id="playground-menu-button" aria-label="Interactive menu button demo"></mjo-menu-button>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Size</h4>
                            <select onchange="changeMenuButtonProp('size', this.value)">
                                <option value="sm">Small</option>
                                <option value="md" selected>Medium</option>
                                <option value="lg">Large</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Color</h4>
                            <select onchange="changeMenuButtonProp('color', this.value)">
                                <option value="primary" selected>Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="success">Success</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Effect</h4>
                            <select onchange="changeMenuButtonProp('effect', this.value)">
                                <option value="cross" selected>Cross</option>
                                <option value="wink">Wink</option>
                                <option value="wink-reverse">Wink Reverse</option>
                                <option value="bounce">Bounce</option>
                                <option value="rotate">Rotate</option>
                                <option value="rotate-reverse">Rotate Reverse</option>
                                <option value="push">Push</option>
                                <option value="push-reverse">Push Reverse</option>
                                <option value="async">Async</option>
                                <option value="async-reverse">Async Reverse</option>
                                <option value="spin">Spin</option>
                                <option value="spin-reverse">Spin Reverse</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>State</h4>
                            <div class="toggle-group">
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeMenuButtonProp('isOpen', this.checked || false)" />
                                    <span>Is Open</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeMenuButtonProp('noink', this.checked || false)" />
                                    <span>No Ripple</span>
                                </label>
                                <label class="toggle">
                                    <input type="checkbox" onchange="changeMenuButtonProp('disabled', this.checked || false)" />
                                    <span>Disabled</span>
                                </label>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>ARIA Controls</h4>
                            <input type="text" placeholder="Enter element ID..." oninput="changeMenuButtonProp('ariaControls', this.value)" value="" />
                        </div>

                        <div class="control-group">
                            <h4>Actions</h4>
                            <div class="action-buttons">
                                <button type="button" onclick="toggleMenuButton()">Toggle</button>
                                <button type="button" onclick="openMenuButton()">Open</button>
                                <button type="button" onclick="closeMenuButton()">Close</button>
                                <button type="button" onclick="focusMenuButton()">Focus</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Usage examples of mjo-menu-button component.</p>

                <h3>Sizes</h3>
                <div class="component-showcase">
                    <mjo-menu-button size="sm" aria-label="Small menu button"></mjo-menu-button>
                    <mjo-menu-button size="md" aria-label="Medium menu button"></mjo-menu-button>
                    <mjo-menu-button size="lg" aria-label="Large menu button"></mjo-menu-button>
                </div>

                <h3>Colors</h3>
                <div class="component-showcase">
                    <mjo-menu-button color="primary" aria-label="Primary menu"></mjo-menu-button>
                    <mjo-menu-button color="secondary" aria-label="Secondary menu"></mjo-menu-button>
                    <mjo-menu-button color="success" aria-label="Success menu"></mjo-menu-button>
                    <mjo-menu-button color="info" aria-label="Info menu"></mjo-menu-button>
                    <mjo-menu-button color="warning" aria-label="Warning menu"></mjo-menu-button>
                    <mjo-menu-button color="error" aria-label="Error menu"></mjo-menu-button>
                </div>

                <h3>Effects</h3>
                <div class="component-showcase">
                    <mjo-menu-button effect="cross" color="primary" aria-label="Cross effect"></mjo-menu-button>
                    <mjo-menu-button effect="wink" color="secondary" aria-label="Wink effect"></mjo-menu-button>
                    <mjo-menu-button effect="bounce" color="success" aria-label="Bounce effect"></mjo-menu-button>
                    <mjo-menu-button effect="rotate" color="info" aria-label="Rotate effect"></mjo-menu-button>
                    <mjo-menu-button effect="spin" color="warning" aria-label="Spin effect"></mjo-menu-button>
                    <mjo-menu-button effect="async" color="error" aria-label="Async effect"></mjo-menu-button>
                </div>

                <h3>States</h3>
                <div class="component-showcase">
                    <mjo-menu-button aria-label="Normal state"></mjo-menu-button>
                    <mjo-menu-button isOpen aria-label="Open state"></mjo-menu-button>
                    <mjo-menu-button disabled aria-label="Disabled state"></mjo-menu-button>
                    <mjo-menu-button noink color="secondary" aria-label="No ripple effect"></mjo-menu-button>
                </div>

                <h3>Navigation Integration</h3>
                <div class="component-showcase">
                    <div class="navigation-demo">
                        <header class="nav-header">
                            <h3>My App</h3>
                            <mjo-menu-button
                                id="nav-menu-button"
                                color="primary"
                                effect="cross"
                                aria-label="Toggle main navigation"
                                aria-controls="main-nav-menu"
                            >
                            </mjo-menu-button>
                        </header>
                        <nav id="main-nav-menu" class="nav-menu" hidden>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <h3>Accessibility Features</h3>
                <div class="component-showcase">
                    <mjo-menu-button aria-label="Navigation menu with external controls" aria-controls="external-menu" color="primary"> </mjo-menu-button>
                    <mjo-menu-button aria-label="Simple menu button" color="secondary"> </mjo-menu-button>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(menuButtonTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/menu-button-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-menu-button.css"],
        });
    }
}
