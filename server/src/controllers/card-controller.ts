import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class CardController {
    /**
     * Renders the complete demo page for mjo-card
     */
    async renderCardPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-card");

        if (!component) {
            throw new Error("mjo-card component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Component that displays a flexible container for content with various styling options.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const cardTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <!-- Interactive Demo Section -->
            <div class="main-section">
                <h2 class="title">🎮 Interactive Card Playground</h2>
                <p class="subtitle">Customize and interact with cards in real-time. Click properties to change them dynamically.</p>

                <div class="playground-container  interactive-demo">
                    <div class="playground-showcase">
                        <mjo-card id="playground-card" radius="medium">
                            <div class="card-content">
                                <h3>Interactive Demo Card</h3>
                                <p>This is a sample card content that you can customize using the controls on the right.</p>
                                <button class="sample-button">Action Button</button>
                            </div>
                        </mjo-card>
                    </div>

                    <div class="controls-panel">
                        <div class="control-group">
                            <h4>Contrast</h4>
                            <select onchange="changeCardProp('contrast', this.value)">
                                <option value="" selected>Default</option>
                                <option value="low">Low</option>
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div class="control-group">
                            <h4>Radius</h4>
                            <select onchange="changeCardProp('radius', this.value)">
                                <option value="none">None</option>
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-card component.</p>

                <h3>Basic Card</h3>
                <div class="component-showcase">
                    <mjo-card>
                        <div class="card-content">
                            <h4>Default Card</h4>
                            <p>This is a basic card with default styling.</p>
                        </div>
                    </mjo-card>
                </div>

                <h3>Radius Variations</h3>
                <div class="component-showcase">
                    <mjo-card radius="none">
                        <div class="card-content">
                            <h4>No Radius</h4>
                            <p>Card with sharp corners.</p>
                        </div>
                    </mjo-card>
                    <mjo-card radius="small">
                        <div class="card-content">
                            <h4>Small Radius</h4>
                            <p>Card with small rounded corners.</p>
                        </div>
                    </mjo-card>
                    <mjo-card radius="medium">
                        <div class="card-content">
                            <h4>Medium Radius</h4>
                            <p>Card with medium rounded corners.</p>
                        </div>
                    </mjo-card>
                    <mjo-card radius="large">
                        <div class="card-content">
                            <h4>Large Radius</h4>
                            <p>Card with large rounded corners.</p>
                        </div>
                    </mjo-card>
                </div>

                <h3>Contrast Variations</h3>
                <div class="component-showcase">
                    <mjo-card contrast="low">
                        <div class="card-content">
                            <h4>Low Contrast</h4>
                            <p>Card with low contrast background.</p>
                        </div>
                    </mjo-card>
                    <mjo-card contrast="normal">
                        <div class="card-content">
                            <h4>Normal Contrast</h4>
                            <p>Card with normal contrast background.</p>
                        </div>
                    </mjo-card>
                    <mjo-card contrast="high">
                        <div class="card-content">
                            <h4>High Contrast</h4>
                            <p>Card with high contrast background.</p>
                        </div>
                    </mjo-card>
                </div>

                <h3>Card with Different Content Types</h3>
                <div class="component-showcase">
                    <mjo-card radius="medium">
                        <div class="card-content">
                            <img src="https://picsum.photos/300/200" alt="Sample image" style="width: 100%; border-radius: 4px; margin-bottom: 16px;" />
                            <h4>Image Card</h4>
                            <p>Card containing an image and text content.</p>
                        </div>
                    </mjo-card>
                    <mjo-card radius="medium">
                        <div class="card-content">
                            <h4>Feature Card</h4>
                            <ul>
                                <li>Feature one</li>
                                <li>Feature two</li>
                                <li>Feature three</li>
                            </ul>
                        </div>
                    </mjo-card>
                    <mjo-card radius="medium">
                        <div class="card-content">
                            <h4>Action Card</h4>
                            <p>Card with multiple actions.</p>
                            <div style="display: flex; gap: 8px; margin-top: 16px;">
                                <button class="sample-button">Primary</button>
                                <button class="sample-button secondary">Secondary</button>
                            </div>
                        </div>
                    </mjo-card>
                </div>

                <h3>Nested Cards</h3>
                <div class="component-showcase">
                    <mjo-card radius="large">
                        <div class="card-content">
                            <h4>Parent Card</h4>
                            <p>This card contains nested cards inside.</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
                                <mjo-card radius="small" contrast="low">
                                    <div class="card-content">
                                        <h5>Nested Card 1</h5>
                                        <p>Small nested card.</p>
                                    </div>
                                </mjo-card>
                                <mjo-card radius="small" contrast="low">
                                    <div class="card-content">
                                        <h5>Nested Card 2</h5>
                                        <p>Another nested card.</p>
                                    </div>
                                </mjo-card>
                            </div>
                        </div>
                    </mjo-card>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(cardTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            scripts: [{ src: "/public/js/card-interactions.js", type: "module" }],
            styles: ["/public/css/mjo-card.css"],
        });
    }
}
