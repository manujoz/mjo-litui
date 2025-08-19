import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";
import { TemplateHelper } from "../utils/template-helper.js";

export class IndexController {
    private hmrManager?: any; // Optional reference to the HMR manager

    /**
     * Sets the reference to the HMR manager
     */
    setHMRManager(hmrManager: any): void {
        this.hmrManager = hmrManager;
    }

    /**
     * Renders the main page with the component index
     */
    async renderIndexPage(): Promise<string> {
        const navigationIndex = componentDiscovery.generateNavigationIndex();
        const stats = componentDiscovery.getStats();

        const title = "mjo-litui SSR";
        const subtitle = `${stats.totalComponents} components available • ${stats.componentsWithVariants} with variants • Last update: ${new Date().toLocaleTimeString("es-ES")}`;
        const headerTemplate = TemplateHelper.getHeaderTemplate(title, subtitle);

        const indexTemplate = html`
            ${unsafeHTML(headerTemplate)}

            <section class="main-section">
                <h2>📋 Available Components</h2>
                <p>Explore mjo-litui components rendered server-side with all their variants and use cases.</p>

                ${navigationIndex.categories.map(
                    (category) => html`
                        <div style="margin: 30px 0;">
                            <h3 style="color: #3b82f6; margin-bottom: 15px; font-size: 1.125rem;">
                                ${category.name === "Display" ? "🖼️" : category.name === "Input" ? "📝" : category.name === "Components" ? "🧰" : "🔧"}
                                ${category.name}
                            </h3>
                            <div class="component-grid">
                                ${category.components.map(
                                    (component) => html`
                                        <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">${component.name === "mjo-avatar" ? "🧑‍💼" : "🏷️"} ${component.displayName}</h4>
                                                ${component.hasVariants ? html`<span class="card-variant-label">Variants</span>` : ""}
                                            </div>
                                            <p class="card-description">${component.description}</p>
                                            <div class="card-tags">${component.tags.map((tag) => html` <span class="card-tag">${tag}</span> `)}</div>
                                            <a href="${component.path}" class="card-link"> View full demos → </a>
                                        </div>
                                    `,
                                )}
                            </div>
                        </div>
                    `,
                )}
            </section>

            <section class="main-section">
                <h2>🔧 System Status</h2>
                <div class="system-status">
                    <div class="status-item">
                        <span>🔍</span>
                        <div>
                            <strong>File Watcher:</strong><br />
                            <span style="color: #10b981;">Active and monitoring changes</span>
                        </div>
                    </div>
                    <div class="status-item">
                        <span>♻️</span>
                        <div>
                            <strong>Cache Manager:</strong><br />
                            <span style="color: #10b981;">Operational</span>
                        </div>
                    </div>
                    <div class="status-item">
                        <span>🔄</span>
                        <div>
                            <strong>Auto-Reload:</strong><br />
                            <span style="color: #10b981;">Enabled with debouncing</span>
                        </div>
                    </div>
                    <div class="status-item">
                        <span>🚀</span>
                        <div>
                            <strong>SSR:</strong><br />
                            <span style="color: #10b981;">Successful rendering</span>
                        </div>
                    </div>
                </div>
            </section>

            <section class="main-section" style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 30px;">
                <h2>📚 Project Information</h2>
                <p style="color: #64748b; margin-bottom: 20px;">
                    This SSR server implements server-side rendering for mjo-litui components using @lit-labs/ssr. It includes advanced file watching, smart
                    auto-reload and cache management for an optimal development experience.
                </p>
            </section>
        `;

        return ssrRenderer.renderPage(indexTemplate, {
            title: "mjo-litui SSR Server - Web Components with Server-Side Rendering",
            description: "SSR development server for mjo-litui components with auto-reload, file watching and server-side rendering",
            meta: [
                { name: "keywords", content: "mjo-litui, SSR, server-side rendering, lit, web components" },
                { name: "author", content: "mjo-litui Team" },
            ],
            styles: ["/public/css/index.css"],
        });
    }

    /**
     * Renders the system status page in JSON for debugging
     */
    getSystemStatus() {
        const stats = componentDiscovery.getStats();
        const components = componentDiscovery.getComponents();

        return {
            server: {
                status: "running",
                uptime: process.uptime(),
                port: process.env.PORT || 3000,
                timestamp: new Date().toISOString(),
            },
            hmr: this.hmrManager
                ? {
                      isActive: this.hmrManager.getStats().isActive,
                      connectedClients: this.hmrManager.getStats().connectedClients,
                      enabled: process.env.NODE_ENV !== "production",
                  }
                : {
                      isActive: false,
                      connectedClients: 0,
                      enabled: false,
                  },
            fileWatcher: {
                isActive: true,
                lastCheck: new Date().toISOString(),
                watchedPaths: ["src/", "server/src/", "server/templates/"],
            },
            componentDiscovery: {
                totalComponents: stats.totalComponents,
                componentsByCategory: stats.componentsByCategory,
                componentsWithVariants: stats.componentsWithVariants,
                availableComponents: components.map((c) => ({
                    name: c.name,
                    displayName: c.displayName,
                    category: c.category,
                    hasVariants: c.hasVariants,
                    path: c.path,
                })),
            },
            environment: {
                nodeVersion: process.version,
                platform: process.platform,
                isDevelopment: process.env.NODE_ENV !== "production",
            },
        };
    }
}
