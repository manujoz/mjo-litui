import { render } from "@lit-labs/ssr";
import { TemplateResult } from "lit";
import { TemplateHelper } from "../utils/template-helper.js";

// Importar componentes directamente desde src/ para SSR
import "../../../src/mjo-avatar.js";
import "../../../src/mjo-chip.js";
import "../../../src/mjo-theme.js";

export interface RenderOptions {
    title?: string;
    description?: string;
    styles?: string[];
    scripts?: string[];
    meta?: Array<{ name: string; content: string }>;
}

export class SSRRenderer {
    /**
     * Renderiza una página completa con SSR incluyendo el componente mjo-theme
     */
    async renderPage(content: TemplateResult, options: RenderOptions = {}): Promise<string> {
        // Renderizar el contenido Lit a HTML
        const ssrResult = Array.from(render(content));
        const renderedContent = ssrResult.join("");

        // Usar template helper para generar HTML con HMR
        return this.buildHTMLPageWithHMR(renderedContent, options);
    }

    /**
     * Construye la página HTML usando TemplateHelper con soporte HMR
     */
    private buildHTMLPageWithHMR(content: string, options: RenderOptions): string {
        const title = options.title || "mjo-litui SSR Server";

        // Scripts adicionales para SSR
        const ssrScripts = ["/public/js/lit-hydration.js", "/public/js/client.js", ...(options.scripts || [])];

        // Estilos adicionales para SSR
        const ssrStyles = ["/public/css/ssr-styles.css", ...(options.styles || [])];

        // Contenido completo con elementos adicionales para SSR
        const fullContent = this.wrapContentWithSSRElements(content, options);

        // Usar TemplateHelper para renderizar con HMR habilitado
        return TemplateHelper.renderTemplate(fullContent, {
            title,
            enableHMR: true, // Siempre habilitado en el servidor SSR
            additionalScripts: ssrScripts,
            additionalStyles: ssrStyles,
        });
    }

    /**
     * Envuelve el contenido con elementos específicos para SSR
     */
    private wrapContentWithSSRElements(content: string, options: RenderOptions): string {
        const metaTags = options.meta?.map((meta) => `<meta name="${meta.name}" content="${meta.content}">`).join("") || "";

        return `
            ${metaTags ? `<head>${metaTags}</head>` : ""}
            
            <!-- Google Fonts - Inter -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            
            <!-- Material Symbols -->
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
            
            <!-- Theme Toggle Button -->
            <button class="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">🌙</button>
            
            ${content}
        `;
    }
}

/**
 * Instancia singleton del renderizador SSR
 */
export const ssrRenderer = new SSRRenderer();
