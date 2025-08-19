import { html } from "lit";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";

export class ChipController {
    /**
     * Renders the full demo page for mjo-chip
     */
    async renderChipPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-chip");

        if (!component) {
            throw new Error("Component mjo-chip not found");
        }

        const chipTemplate = html`
            <mjo-theme scope="global" theme="light"></mjo-theme>
            <div class="page-header">
                <h1>🏷️ ${component.displayName}</h1>
                <p>${component.description}</p>
            </div>

            <div class="demo-section">
                <h2>🎨 Basic Colors</h2>
                <p>The chip component supports different colors for visual categorization.</p>
                <div class="component-showcase">
                    <mjo-chip label="Default"></mjo-chip>
                    <mjo-chip label="Primary" color="primary"></mjo-chip>
                    <mjo-chip label="Secondary" color="secondary"></mjo-chip>
                    <mjo-chip label="Success" color="success"></mjo-chip>
                    <mjo-chip label="Warning" color="warning"></mjo-chip>
                    <mjo-chip label="Error" color="error"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>📏 Available Sizes</h2>
                <p>Different sizes to fit various usage contexts.</p>
                <div class="component-showcase">
                    <mjo-chip label="Small" size="small"></mjo-chip>
                    <mjo-chip label="Medium" size="medium"></mjo-chip>
                    <mjo-chip label="Large" size="large"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>🎭 Style Variants</h2>
                <p>Different visual styles to match your application's design.</p>

                <h3>Solid Variant</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default" variant="solid"></mjo-chip>
                    <mjo-chip label="Primary" variant="solid" color="primary"></mjo-chip>
                    <mjo-chip label="Success" variant="solid" color="success"></mjo-chip>
                    <mjo-chip label="Warning" variant="solid" color="warning"></mjo-chip>
                </div>

                <h3>Bordered Variant</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default" variant="bordered"></mjo-chip>
                    <mjo-chip label="Primary" variant="bordered" color="primary"></mjo-chip>
                    <mjo-chip label="Success" variant="bordered" color="success"></mjo-chip>
                    <mjo-chip label="Error" variant="bordered" color="error"></mjo-chip>
                </div>

                <h3>Light Variant</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default" variant="light"></mjo-chip>
                    <mjo-chip label="Primary" variant="light" color="primary"></mjo-chip>
                    <mjo-chip label="Secondary" variant="light" color="secondary"></mjo-chip>
                    <mjo-chip label="Success" variant="light" color="success"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>🏷️ Practical Use Cases</h2>

                <h3>Tag System</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <mjo-chip label="JavaScript" color="primary" variant="solid"></mjo-chip>
                    <mjo-chip label="TypeScript" color="primary" variant="bordered"></mjo-chip>
                    <mjo-chip label="React" color="secondary" variant="light"></mjo-chip>
                    <mjo-chip label="Vue.js" color="success" variant="solid"></mjo-chip>
                    <mjo-chip label="Angular" color="error" variant="bordered"></mjo-chip>
                    <mjo-chip label="Node.js" color="success" variant="light"></mjo-chip>
                </div>

                <h3>Project Status</h3>
                <div class="component-grid">
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                        <h4 style="margin: 0 0 10px 0; color: #1e293b;">Project Alpha</h4>
                        <mjo-chip label="In Progress" color="warning" variant="solid"></mjo-chip>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                        <h4 style="margin: 0 0 10px 0; color: #1e293b;">Project Beta</h4>
                        <mjo-chip label="Completed" color="success" variant="solid"></mjo-chip>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                        <h4 style="margin: 0 0 10px 0; color: #1e293b;">Project Gamma</h4>
                        <mjo-chip label="Pending" variant="bordered"></mjo-chip>
                    </div>
                </div>

                <h3>Category Filters</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <mjo-chip label="All" variant="solid" color="primary"></mjo-chip>
                    <mjo-chip label="Frontend" variant="bordered"></mjo-chip>
                    <mjo-chip label="Backend" variant="bordered"></mjo-chip>
                    <mjo-chip label="DevOps" variant="bordered"></mjo-chip>
                    <mjo-chip label="Testing" variant="bordered"></mjo-chip>
                </div>

                <h3>Combined Chip Sizes</h3>
                <div class="component-showcase">
                    <mjo-chip label="Important" size="large" color="error" variant="solid"></mjo-chip>
                    <mjo-chip label="Normal" size="medium" color="primary"></mjo-chip>
                    <mjo-chip label="Detail" size="small" variant="light"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>🔧 Available Properties</h2>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; font-family: monospace;">
                    <div><strong>label:</strong> string - Chip text</div>
                    <div><strong>color:</strong> "primary" | "secondary" | "success" | "warning" | "info" | "error" - Chip color</div>
                    <div><strong>size:</strong> "small" | "medium" | "large" - Chip size</div>
                    <div><strong>variant:</strong> "solid" | "bordered" | "light" - Visual style</div>
                </div>
            </div>

            <div class="nav-links">
                <a href="/">← Back to home</a>
                <a href="/component/avatar">See mjo-avatar →</a>
            </div>
        `;

        return ssrRenderer.renderPage(chipTemplate, {
            title: `${component.displayName} - mjo-litui SSR`,
            description: component.description,
            meta: [
                { name: "component", content: component.name },
                { name: "category", content: component.category },
            ],
        });
    }
}
