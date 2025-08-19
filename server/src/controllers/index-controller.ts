import { html } from "lit";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";

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

        const indexTemplate = html`
            <mjo-theme scope="global" theme="light"></mjo-theme>
            <div class="page-header">
                <h1>mjo-litui SSR Server <span class="status-badge">Auto-Reload ✓</span></h1>
                <p>Server-side rendering server for Lit components</p>
                <p style="color: #64748b; font-size: 0.9rem; margin-top: 16px;">
                    ${stats.totalComponents} components available • ${stats.componentsWithVariants} with variants • Last update:
                    ${new Date().toLocaleTimeString("es-ES")}
                </p>
            </div>

            <div class="demo-section">
                <h2>📋 Available Components</h2>
                <p>Explore mjo-litui components rendered server-side with all their variants and use cases.</p>

                ${navigationIndex.categories.map(
                    (category) => html`
                        <div style="margin: 30px 0;">
                            <h3 style="color: #3b82f6; margin-bottom: 15px; font-size: 1.125rem;">
                                ${category.name === "Display" ? "🖼️" : category.name === "Input" ? "📝" : "🔧"} ${category.name}
                            </h3>
                            <div class="component-grid">
                                ${category.components.map(
                                    (component) => html`
                                        <div
                                            style="padding: 25px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; transition: all 0.2s ease;"
                                        >
                                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                                <h4 style="margin: 0; color: #1e293b; font-size: 1.1rem;">
                                                    ${component.name === "mjo-avatar" ? "🧑‍💼" : "🏷️"} ${component.displayName}
                                                </h4>
                                                ${component.hasVariants
                                                    ? html`<span
                                                          style="background: #dbeafe; color: #3b82f6; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;"
                                                          >Variants</span
                                                      >`
                                                    : ""}
                                            </div>
                                            <p style="color: #64748b; font-size: 0.9rem; margin: 0 0 15px 0;">${component.description}</p>
                                            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 15px;">
                                                ${component.tags.map(
                                                    (tag) => html`
                                                        <span
                                                            style="background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;"
                                                            >${tag}</span
                                                        >
                                                    `,
                                                )}
                                            </div>
                                            <a
                                                href="${component.path}"
                                                style="display: inline-flex; align-items: center; gap: 6px; color: #3b82f6; text-decoration: none; font-weight: 500; font-size: 0.9rem;"
                                            >
                                                View full demos →
                                            </a>
                                        </div>
                                    `,
                                )}
                            </div>
                        </div>
                    `,
                )}
            </div>

            <div class="demo-section">
                <h2>🎯 Quick Demos</h2>
                <p>Preview of main components with SSR.</p>

                <h3>🧑‍💼 mjo-avatar - Preview</h3>
                <div class="component-showcase">
                    <mjo-avatar size="small" name="S"></mjo-avatar>
                    <mjo-avatar size="medium" name="M"></mjo-avatar>
                    <mjo-avatar size="large" name="L"></mjo-avatar>
                    <mjo-avatar name="AB" bordered nameColoured></mjo-avatar>
                </div>

                <h3>🏷️ mjo-chip - Preview</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default"></mjo-chip>
                    <mjo-chip label="Primary" color="primary"></mjo-chip>
                    <mjo-chip label="Success" color="success" variant="solid"></mjo-chip>
                    <mjo-chip label="Bordered" variant="bordered"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
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
            </div>

            <div class="demo-section">
                <h2>🔗 Navigation</h2>
                <div class="nav-links">
                    <a href="/component/avatar"> 🧑‍💼 Explore mjo-avatar </a>
                    <a href="/component/chip"> 🏷️ Explore mjo-chip </a>
                    <a href="/status"> 📊 System Status </a>
                </div>
            </div>

            <div class="demo-section" style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 30px;">
                <h2>📚 Project Information</h2>
                <p style="color: #64748b; margin-bottom: 20px;">
                    This SSR server implements server-side rendering for mjo-litui components using @lit-labs/ssr. It includes advanced file watching, smart
                    auto-reload and cache management for an optimal development experience.
                </p>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 20px;">
                    <div style="color: #64748b; font-size: 0.875rem;"><strong>Technologies:</strong> Lit 3, Express, TypeScript, Chokidar</div>
                    <div style="color: #64748b; font-size: 0.875rem;"><strong>Port:</strong> 3000</div>
                    <div style="color: #64748b; font-size: 0.875rem;"><strong>Mode:</strong> Development with Hot Reload</div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(indexTemplate, {
            title: "mjo-litui SSR Server - Web Components with Server-Side Rendering",
            description: "SSR development server for mjo-litui components with auto-reload, file watching and server-side rendering",
            meta: [
                { name: "keywords", content: "mjo-litui, SSR, server-side rendering, lit, web components" },
                { name: "author", content: "mjo-litui Team" },
            ],
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
