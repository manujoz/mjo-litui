import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class GridController {
    /**
     * Renders the complete demo page for mjo-grid
     */
    async renderGridPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-grid");

        if (!component) {
            throw new Error("mjo-grid component not found");
        }

        const nextComponent = componentDiscovery.getNextComponent(component.name);
        const previousComponent = componentDiscovery.getPreviousComponent(component.name);

        const title = component.displayName;
        const subtitle = `Flexible CSS Grid layout component providing responsive grid systems with auto-fill, auto-fit, and fixed column modes.`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle, {
            next: nextComponent ? nextComponent.path : undefined,
            previous: previousComponent ? previousComponent.path : undefined,
        });

        const gridTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <div class="main-section">
                <h2 class="title">📦 Examples</h2>
                <p class="subtitle">Use examples of mjo-grid component.</p>

                <h3>Grid Modes</h3>
                <div class="grid-demo-section">
                    <h4>Fixed Columns Mode</h4>
                    <mjo-grid mode="columns" columns="3" gap="1rem">
                        <div class="demo-item">Fixed 1</div>
                        <div class="demo-item">Fixed 2</div>
                        <div class="demo-item">Fixed 3</div>
                        <div class="demo-item">Fixed 4</div>
                        <div class="demo-item">Fixed 5</div>
                        <div class="demo-item">Fixed 6</div>
                    </mjo-grid>
                </div>

                <div class="grid-demo-section">
                    <h4>Auto Fill Mode (Responsive)</h4>
                    <mjo-grid mode="fill" minWidthRow="200px" gap="1rem">
                        <div class="demo-item">Auto 1</div>
                        <div class="demo-item">Auto 2</div>
                        <div class="demo-item">Auto 3</div>
                        <div class="demo-item">Auto 4</div>
                        <div class="demo-item">Auto 5</div>
                    </mjo-grid>
                </div>

                <div class="grid-demo-section">
                    <h4>Auto Fit Mode (Stretch to Fill)</h4>
                    <mjo-grid mode="fit" minWidthRow="150px" gap="1rem">
                        <div class="demo-item">Fit 1</div>
                        <div class="demo-item">Fit 2</div>
                        <div class="demo-item">Fit 3</div>
                    </mjo-grid>
                </div>

                <h3>Gap Variations</h3>
                <div class="grid-demo-section">
                    <h4>Small Gap (0.5rem)</h4>
                    <mjo-grid columns="4" gap="0.5rem">
                        <div class="demo-item">A</div>
                        <div class="demo-item">B</div>
                        <div class="demo-item">C</div>
                        <div class="demo-item">D</div>
                    </mjo-grid>
                </div>

                <div class="grid-demo-section">
                    <h4>Large Gap (2rem)</h4>
                    <mjo-grid columns="4" gap="2rem">
                        <div class="demo-item">A</div>
                        <div class="demo-item">B</div>
                        <div class="demo-item">C</div>
                        <div class="demo-item">D</div>
                    </mjo-grid>
                </div>

                <h3>Responsive Card Grid</h3>
                <div class="grid-demo-section">
                    <mjo-grid mode="fill" minWidthRow="280px" gap="1.5rem">
                        <div class="card-item">
                            <h4>Card 1</h4>
                            <p>Responsive card that adapts to screen size automatically.</p>
                        </div>
                        <div class="card-item">
                            <h4>Card 2</h4>
                            <p>These cards will reflow based on available space.</p>
                        </div>
                        <div class="card-item">
                            <h4>Card 3</h4>
                            <p>Perfect for product listings and content galleries.</p>
                        </div>
                        <div class="card-item">
                            <h4>Card 4</h4>
                            <p>Automatically adjusts the number of columns.</p>
                        </div>
                        <div class="card-item">
                            <h4>Card 5</h4>
                            <p>No media queries needed for responsive behavior.</p>
                        </div>
                        <div class="card-item">
                            <h4>Card 6</h4>
                            <p>CSS Grid handles the responsive logic.</p>
                        </div>
                    </mjo-grid>
                </div>

                <h3>Dashboard Layout</h3>
                <div class="grid-demo-section">
                    <mjo-grid columns="4" gap="1rem" autoRows="80px">
                        <div class="metric-item">
                            <div class="metric-value">1,234</div>
                            <div class="metric-label">Users</div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-value">567</div>
                            <div class="metric-label">Sessions</div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-value">89%</div>
                            <div class="metric-label">Conversion</div>
                        </div>
                        <div class="metric-item">
                            <div class="metric-value">$12.3k</div>
                            <div class="metric-label">Revenue</div>
                        </div>
                    </mjo-grid>
                </div>

                <h3>Grid Flow Control</h3>
                <div class="grid-demo-section">
                    <h4>Row Flow (Default)</h4>
                    <mjo-grid columns="3" gap="1rem" flow="row" autoRows="80px">
                        <div class="flow-item">1</div>
                        <div class="flow-item wide-item">2 (wide)</div>
                        <div class="flow-item">3</div>
                        <div class="flow-item">4</div>
                    </mjo-grid>
                </div>

                <div class="grid-demo-section">
                    <h4>Dense Packing</h4>
                    <mjo-grid columns="3" gap="1rem" flow="row dense" autoRows="80px">
                        <div class="flow-item">1</div>
                        <div class="flow-item wide-item">2 (wide)</div>
                        <div class="flow-item">3</div>
                        <div class="flow-item">4</div>
                    </mjo-grid>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(gridTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
            styles: ["/public/css/mjo-grid.css"],
        });
    }
}
