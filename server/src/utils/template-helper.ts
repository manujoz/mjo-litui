import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

export interface TemplateOptions {
    title?: string;
    enableHMR?: boolean;
    additionalScripts?: string[];
    additionalStyles?: string[];
}

export class TemplateHelper {
    private static baseTemplateCache: string | null = null;

    /**
     * Lee y cachea la plantilla base
     */
    private static getBaseTemplate(): string {
        if (!this.baseTemplateCache) {
            const templatePath = join(__dirname, "../../templates/base.html");
            this.baseTemplateCache = readFileSync(templatePath, "utf-8");
        }
        return this.baseTemplateCache;
    }

    /**
     * Invalida el cache de la plantilla (útil durante desarrollo)
     */
    public static invalidateCache(): void {
        this.baseTemplateCache = null;
    }

    /**
     * Renderiza la plantilla base con el contenido y opciones proporcionadas
     */
    public static renderTemplate(content: string, options: TemplateOptions = {}): string {
        const { title = "mjo-litui SSR", enableHMR = false, additionalScripts = [], additionalStyles = [] } = options;

        let template = this.getBaseTemplate();

        // Reemplazar título
        template = template.replace("{{TITLE}}", title);

        // Reemplazar contenido principal
        template = template.replace("{{CONTENT}}", content);

        // Agregar scripts adicionales (antes del cierre del body)
        const scripts = [...additionalScripts];

        // Agregar HMR script si está habilitado Y en desarrollo
        if (enableHMR && this.isDevelopment()) {
            scripts.unshift("/public/js/hmr-client.js");
        }

        if (scripts.length > 0) {
            const scriptTags = scripts
                .map((src) => {
                    // Detectar si el script necesita ser cargado como módulo
                    const needsModule = src.includes("client.js") || src.includes("lit-hydration.js");
                    const moduleAttr = needsModule ? ' type="module"' : "";
                    return `        <script src="${src}"${moduleAttr}></script>`;
                })
                .join("\n");
            template = template.replace("</body>", `${scriptTags}\n    </body>`);
        }

        // Agregar estilos adicionales (en el head)
        if (additionalStyles.length > 0) {
            const styleTags = additionalStyles.map((href) => `        <link rel="stylesheet" href="${href}">`).join("\n");
            template = template.replace("</head>", `${styleTags}\n    </head>`);
        }

        return template;
    }

    /**
     * Verifica si estamos en modo desarrollo
     */
    private static isDevelopment(): boolean {
        return process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined;
    }

    /**
     * Genera el script inline para HMR (alternativa al archivo externo)
     */
    public static getInlineHMRScript(): string {
        if (!this.isDevelopment()) {
            return "";
        }

        return `
        <script>
            // HMR Client inline - versión simplificada
            (function() {
                const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                const wsUrl = \`\${protocol}//\${window.location.host}/hmr\`;
                
                let ws;
                let reconnectAttempts = 0;
                const maxAttempts = 10;
                
                function connect() {
                    try {
                        ws = new WebSocket(wsUrl);
                        
                        ws.onopen = () => {
                            console.log('🔥 HMR conectado');
                            reconnectAttempts = 0;
                            showNotification('🔥 HMR conectado', 'success');
                        };
                        
                        ws.onmessage = (event) => {
                            const data = JSON.parse(event.data);
                            console.log('📡 HMR:', data.type);
                            
                            switch(data.type) {
                                case 'build-complete':
                                case 'file-changed':
                                case 'reload':
                                    setTimeout(() => window.location.reload(), 300);
                                    break;
                                case 'build-start':
                                    showNotification('🔨 Compilando...', 'info');
                                    break;
                                case 'build-error':
                                    showNotification('❌ Error de compilación', 'error');
                                    break;
                            }
                        };
                        
                        ws.onclose = () => {
                            if (reconnectAttempts < maxAttempts) {
                                reconnectAttempts++;
                                setTimeout(connect, 1000 * reconnectAttempts);
                            }
                        };
                    } catch (error) {
                        console.error('Error WebSocket HMR:', error);
                    }
                }
                
                function showNotification(msg, type) {
                    const notification = document.createElement('div');
                    const colors = { info: '#3b82f6', success: '#10b981', error: '#ef4444' };
                    
                    notification.style.cssText = \`
                        position: fixed; top: 20px; right: 20px; z-index: 10000;
                        background: \${colors[type] || colors.info}; color: white;
                        padding: 12px 16px; border-radius: 6px; font-size: 14px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        transform: translateX(100%); transition: transform 0.3s ease;
                    \`;
                    
                    notification.textContent = msg;
                    document.body.appendChild(notification);
                    
                    requestAnimationFrame(() => {
                        notification.style.transform = 'translateX(0)';
                    });
                    
                    setTimeout(() => {
                        notification.style.transform = 'translateX(100%)';
                        setTimeout(() => notification.remove(), 300);
                    }, 3000);
                }
                
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', connect);
                } else {
                    connect();
                }
            })();
        </script>`;
    }
}
