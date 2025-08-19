import { html } from "lit";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";

export class IndexController {
    private hmrManager?: any; // Referencia opcional al HMR manager

    /**
     * Establece la referencia al HMR manager
     */
    setHMRManager(hmrManager: any): void {
        this.hmrManager = hmrManager;
    }

    /**
     * Renderiza la página principal con índice de componentes
     */
    async renderIndexPage(): Promise<string> {
        const navigationIndex = componentDiscovery.generateNavigationIndex();
        const stats = componentDiscovery.getStats();

        const indexTemplate = html`
            <mjo-theme scope="global" theme="light"></mjo-theme>
            <div class="page-header">
                <h1>mjo-litui SSR Server <span class="status-badge">Auto-Reload ✓</span></h1>
                <p>Servidor de renderizado del lado del servidor para componentes Lit</p>
                <p style="color: #64748b; font-size: 0.9rem; margin-top: 16px;">
                    ${stats.totalComponents} componentes disponibles • ${stats.componentsWithVariants} con variantes • Última actualización:
                    ${new Date().toLocaleTimeString("es-ES")}
                </p>
            </div>

            <div class="demo-section">
                <h2>📋 Componentes Disponibles</h2>
                <p>Explora los componentes mjo-litui renderizados del lado del servidor con todas sus variantes y casos de uso.</p>

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
                                                          >Variantes</span
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
                                                href="${component.demoPath}"
                                                style="display: inline-flex; align-items: center; gap: 6px; color: #3b82f6; text-decoration: none; font-weight: 500; font-size: 0.9rem;"
                                            >
                                                Ver demos completos →
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
                <h2>🎯 Demos Rápidos</h2>
                <p>Vista previa de los componentes principales con SSR.</p>

                <h3>🧑‍💼 mjo-avatar - Vista Previa</h3>
                <div class="component-showcase">
                    <mjo-avatar size="small" name="S"></mjo-avatar>
                    <mjo-avatar size="medium" name="M"></mjo-avatar>
                    <mjo-avatar size="large" name="L"></mjo-avatar>
                    <mjo-avatar name="AB" bordered nameColoured></mjo-avatar>
                </div>

                <h3>🏷️ mjo-chip - Vista Previa</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default"></mjo-chip>
                    <mjo-chip label="Primary" color="primary"></mjo-chip>
                    <mjo-chip label="Success" color="success" variant="solid"></mjo-chip>
                    <mjo-chip label="Bordered" variant="bordered"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>🔧 Estado del Sistema</h2>
                <div class="system-status">
                    <div class="status-item">
                        <span>🔍</span>
                        <div>
                            <strong>File Watcher:</strong><br />
                            <span style="color: #10b981;">Activo y monitoreando cambios</span>
                        </div>
                    </div>
                    <div class="status-item">
                        <span>♻️</span>
                        <div>
                            <strong>Cache Manager:</strong><br />
                            <span style="color: #10b981;">Operacional</span>
                        </div>
                    </div>
                    <div class="status-item">
                        <span>🔄</span>
                        <div>
                            <strong>Auto-Reload:</strong><br />
                            <span style="color: #10b981;">Habilitado con debouncing</span>
                        </div>
                    </div>
                    <div class="status-item">
                        <span>🚀</span>
                        <div>
                            <strong>SSR:</strong><br />
                            <span style="color: #10b981;">Renderizado exitoso</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="demo-section">
                <h2>🔗 Navegación</h2>
                <div class="nav-links">
                    <a href="/component/avatar"> 🧑‍💼 Explorar mjo-avatar </a>
                    <a href="/component/chip"> 🏷️ Explorar mjo-chip </a>
                    <a href="/status"> 📊 Estado del Sistema </a>
                </div>
            </div>

            <div class="demo-section" style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 30px;">
                <h2>📚 Información del Proyecto</h2>
                <p style="color: #64748b; margin-bottom: 20px;">
                    Este servidor SSR implementa renderizado del lado del servidor para componentes mjo-litui usando @lit-labs/ssr. Incluye file watching
                    avanzado, auto-reload inteligente y cache management para una experiencia de desarrollo óptima.
                </p>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 20px;">
                    <div style="color: #64748b; font-size: 0.875rem;"><strong>Tecnologías:</strong> Lit 3, Express, TypeScript, Chokidar</div>
                    <div style="color: #64748b; font-size: 0.875rem;"><strong>Puerto:</strong> 3000</div>
                    <div style="color: #64748b; font-size: 0.875rem;"><strong>Modo:</strong> Desarrollo con Hot Reload</div>
                </div>
            </div>
        `;

        return ssrRenderer.renderPage(indexTemplate, {
            title: "mjo-litui SSR Server - Componentes Web con Server-Side Rendering",
            description: "Servidor de desarrollo SSR para componentes mjo-litui con auto-reload, file watching y renderizado del lado del servidor",
            meta: [
                { name: "keywords", content: "mjo-litui, SSR, server-side rendering, lit, web components" },
                { name: "author", content: "mjo-litui Team" },
            ],
        });
    }

    /**
     * Renderiza la página de estado del sistema en JSON para debugging
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
