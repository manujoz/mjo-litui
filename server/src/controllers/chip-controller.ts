import { html } from "lit";
import { componentDiscovery } from "../services/component-discovery.js";
import { ssrRenderer } from "../services/ssr-renderer.js";

export class ChipController {
    /**
     * Renderiza la página completa de demos para mjo-chip
     */
    async renderChipPage(): Promise<string> {
        const component = componentDiscovery.getComponent("mjo-chip");

        if (!component) {
            throw new Error("Componente mjo-chip no encontrado");
        }

        const chipTemplate = html`
            <mjo-theme scope="global" theme="light"></mjo-theme>
            <div class="page-header">
                <h1>🏷️ ${component.displayName}</h1>
                <p>${component.description}</p>
            </div>

            <div class="demo-section">
                <h2>🎨 Colores Básicos</h2>
                <p>El componente chip soporta diferentes colores para categorización visual.</p>
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
                <h2>📏 Tamaños Disponibles</h2>
                <p>Diferentes tamaños para adaptarse a distintos contextos de uso.</p>
                <div class="component-showcase">
                    <mjo-chip label="Small" size="small"></mjo-chip>
                    <mjo-chip label="Medium" size="medium"></mjo-chip>
                    <mjo-chip label="Large" size="large"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>🎭 Variantes de Estilo</h2>
                <p>Diferentes estilos visuales para adaptarse al diseño de tu aplicación.</p>

                <h3>Variante Solid (Sólida)</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default" variant="solid"></mjo-chip>
                    <mjo-chip label="Primary" variant="solid" color="primary"></mjo-chip>
                    <mjo-chip label="Success" variant="solid" color="success"></mjo-chip>
                    <mjo-chip label="Warning" variant="solid" color="warning"></mjo-chip>
                </div>

                <h3>Variante Bordered (Con Borde)</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default" variant="bordered"></mjo-chip>
                    <mjo-chip label="Primary" variant="bordered" color="primary"></mjo-chip>
                    <mjo-chip label="Success" variant="bordered" color="success"></mjo-chip>
                    <mjo-chip label="Error" variant="bordered" color="error"></mjo-chip>
                </div>

                <h3>Variante Light (Suave)</h3>
                <div class="component-showcase">
                    <mjo-chip label="Default" variant="light"></mjo-chip>
                    <mjo-chip label="Primary" variant="light" color="primary"></mjo-chip>
                    <mjo-chip label="Secondary" variant="light" color="secondary"></mjo-chip>
                    <mjo-chip label="Success" variant="light" color="success"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>🏷️ Casos de Uso Prácticos</h2>

                <h3>Sistema de Tags/Etiquetas</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <mjo-chip label="JavaScript" color="primary" variant="solid"></mjo-chip>
                    <mjo-chip label="TypeScript" color="primary" variant="bordered"></mjo-chip>
                    <mjo-chip label="React" color="secondary" variant="light"></mjo-chip>
                    <mjo-chip label="Vue.js" color="success" variant="solid"></mjo-chip>
                    <mjo-chip label="Angular" color="error" variant="bordered"></mjo-chip>
                    <mjo-chip label="Node.js" color="success" variant="light"></mjo-chip>
                </div>

                <h3>Estados de Proyecto</h3>
                <div class="component-grid">
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                        <h4 style="margin: 0 0 10px 0; color: #1e293b;">Proyecto Alpha</h4>
                        <mjo-chip label="En Progreso" color="warning" variant="solid"></mjo-chip>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                        <h4 style="margin: 0 0 10px 0; color: #1e293b;">Proyecto Beta</h4>
                        <mjo-chip label="Completado" color="success" variant="solid"></mjo-chip>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px;">
                        <h4 style="margin: 0 0 10px 0; color: #1e293b;">Proyecto Gamma</h4>
                        <mjo-chip label="Pendiente" variant="bordered"></mjo-chip>
                    </div>
                </div>

                <h3>Filtros de Categorías</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 12px; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <mjo-chip label="Todos" variant="solid" color="primary"></mjo-chip>
                    <mjo-chip label="Frontend" variant="bordered"></mjo-chip>
                    <mjo-chip label="Backend" variant="bordered"></mjo-chip>
                    <mjo-chip label="DevOps" variant="bordered"></mjo-chip>
                    <mjo-chip label="Testing" variant="bordered"></mjo-chip>
                </div>

                <h3>Chips de Tamaños Combinados</h3>
                <div class="component-showcase">
                    <mjo-chip label="Importante" size="large" color="error" variant="solid"></mjo-chip>
                    <mjo-chip label="Normal" size="medium" color="primary"></mjo-chip>
                    <mjo-chip label="Detalle" size="small" variant="light"></mjo-chip>
                </div>
            </div>

            <div class="demo-section">
                <h2>🔧 Propiedades Disponibles</h2>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; font-family: monospace;">
                    <div><strong>label:</strong> string - Texto del chip</div>
                    <div><strong>color:</strong> "primary" | "secondary" | "success" | "warning" | "info" | "error" - Color del chip</div>
                    <div><strong>size:</strong> "small" | "medium" | "large" - Tamaño del chip</div>
                    <div><strong>variant:</strong> "solid" | "bordered" | "light" - Estilo visual</div>
                </div>
            </div>

            <div class="nav-links">
                <a href="/">← Volver al inicio</a>
                <a href="/component/avatar">Ver mjo-avatar →</a>
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
