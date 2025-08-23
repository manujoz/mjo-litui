import { render } from "@lit-labs/ssr";
import { TemplateResult } from "lit";
import { TemplateHelper } from "../utils/template-helper.js";

// Import components directly from src/ for SSR
import "../../../src/mjo-accordion.js";
import "../../../src/mjo-alert.js";
import "../../../src/mjo-avatar.js";
import "../../../src/mjo-button.js";
import "../../../src/mjo-calendar.js";
import "../../../src/mjo-card.js";
import "../../../src/mjo-checkbox.js";
import "../../../src/mjo-chip.js";
import "../../../src/mjo-color-picker.js";
import "../../../src/mjo-date-picker.js";
import "../../../src/mjo-drawer.js";
import "../../../src/mjo-dropdown.js";
import "../../../src/mjo-form.js";
import "../../../src/mjo-grid.js";
import "../../../src/mjo-icon.js";
import "../../../src/mjo-image.js";
import "../../../src/mjo-menu-button.js";
import "../../../src/mjo-textfield.js";
import "../../../src/mjo-theme.js";

export interface RenderOptions {
    title?: string;
    description?: string;
    styles?: string[];
    scripts?: SriptsType[];
    meta?: Array<{ name: string; content: string }>;
}

export class SSRRenderer {
    /**
     * Renders a complete page with SSR including the mjo-theme component
     */
    async renderPage(content: TemplateResult, options: RenderOptions = {}): Promise<string> {
        // Render Lit content to HTML
        const ssrResult = Array.from(render(content));
        const renderedContent = ssrResult.join("");

        // Use template helper to generate HTML with HMR
        return this.buildHTMLPageWithHMR(renderedContent, options);
    }

    /**
     * Builds the HTML page using TemplateHelper with HMR support
     */
    private buildHTMLPageWithHMR(content: string, options: RenderOptions): string {
        const title = options.title || "mjo-litui SSR Server";

        // Additional scripts for SSR
        const ssrScripts: SriptsType[] = [
            { src: "/public/js/lit-hydration.js", type: "module" },
            { src: "/public/js/client.js", type: "module" },
            ...(options.scripts || []),
        ];

        // Additional styles for SSR
        const ssrStyles = [...(options.styles || [])];

        // Full content with additional elements for SSR
        const fullContent = this.wrapContentWithSSRElements(content, options);

        // Use TemplateHelper to render with HMR enabled
        return TemplateHelper.renderTemplate(fullContent, {
            title,
            enableHMR: true, // Always enabled on SSR server
            additionalScripts: ssrScripts,
            additionalStyles: ssrStyles,
        });
    }

    /**
     * Wraps the content with SSR-specific elements
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
 * Singleton instance of the SSR renderer
 */
export const ssrRenderer = new SSRRenderer();

interface SriptsType {
    src: string;
    type: "module" | "text/javascript";
}
