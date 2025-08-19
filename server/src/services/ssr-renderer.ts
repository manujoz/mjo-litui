import { render } from "@lit-labs/ssr";
import { TemplateResult } from "lit";

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

        // Construir HTML completo con mjo-theme integrado
        return this.buildHTMLPage(renderedContent, options);
    }

    /**
     * Construye la página HTML completa con mjo-theme
     */
    private buildHTMLPage(content: string, options: RenderOptions): string {
        const title = options.title || "mjo-litui SSR Server";
        const description = options.description || "Server-Side Rendering para componentes mjo-litui";
        const metaTags = options.meta?.map((meta) => `<meta name="${meta.name}" content="${meta.content}">`).join("") || "";
        const additionalStyles = options.styles?.map((style) => `<link rel="stylesheet" href="${style}">`).join("") || "";
        const additionalScripts = options.scripts?.map((script) => `<script type="module" src="${script}"></script>`).join("") || "";

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    ${metaTags}
    
    <!-- Google Fonts - Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Material Symbols -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
    
    <!-- SSR Styles -->
    <link rel="stylesheet" href="/public/css/ssr-styles.css">
    
    ${additionalStyles}
</head>
<body>    
    <!-- Theme Toggle Button -->
    <button class="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">🌙</button>
    
    <div class="container">
        ${content}
    </div>
    
    <!-- Lit SSR Hydration Support - MUST be loaded first -->
    <script type="module" src="/public/js/lit-hydration.js"></script>
    
    <!-- mjo-litui Client Bundle - Contiene todos los componentes -->
    <script type="module" src="/public/js/client.js"></script>
    
    ${additionalScripts}
</body>
</html>`;
    }
}

/**
 * Instancia singleton del renderizador SSR
 */
export const ssrRenderer = new SSRRenderer();
