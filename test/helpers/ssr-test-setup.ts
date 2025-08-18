/**
 * SSR Test Setup - Configuración común para tests Server-Side Rendering
 * Proporciona utilidades para configurar el entorno de testing SSR
 */

import "@lit-labs/ssr-dom-shim";

/**
 * Configuración global para entorno SSR testing
 */
export interface SSRTestConfig {
    /** Instalar polyfills DOM globalmente */
    installDOMShims?: boolean;
    /** Configurar custom elements registry */
    setupCustomElementsRegistry?: boolean;
    /** Habilitar modo verbose para debugging */
    verbose?: boolean;
    /** URL base para módulos */
    baseURL?: string;
}

/**
 * Configuración por defecto para SSR testing
 */
export const defaultSSRConfig: SSRTestConfig = {
    installDOMShims: true,
    setupCustomElementsRegistry: true,
    verbose: false,
    baseURL: "http://localhost:8000/src/",
};

/**
 * Instala los DOM shims necesarios para SSR en Node.js
 * Debe llamarse antes de importar componentes Lit
 */
export function setupSSREnvironment(config: Partial<SSRTestConfig> = {}): void {
    const finalConfig = { ...defaultSSRConfig, ...config };

    if (finalConfig.installDOMShims) {
        // El import de '@lit-labs/ssr-dom-shim' ya instala los shims necesarios
        if (finalConfig.verbose) {
            console.log("✅ SSR DOM shims instalados");
        }
    }

    if (finalConfig.setupCustomElementsRegistry) {
        // Verificar que customElements está disponible
        if (!globalThis.customElements) {
            if (finalConfig.verbose) {
                console.warn("⚠️  Custom Elements Registry no disponible en este entorno");
            }
        } else if (finalConfig.verbose) {
            console.log("✅ Custom Elements Registry disponible");
        }
    }

    // Configurar base URL si se proporciona
    if (finalConfig.baseURL && globalThis.document) {
        const baseElement = globalThis.document.createElement("base");
        baseElement.href = finalConfig.baseURL;
        globalThis.document.head?.appendChild(baseElement);

        if (finalConfig.verbose) {
            console.log(`✅ Base URL configurada: ${finalConfig.baseURL}`);
        }
    }
}

/**
 * Limpia el entorno SSR después de los tests
 * Útil para tests que necesitan reset completo
 */
export function cleanupSSREnvironment(): void {
    // Limpiar document head de elementos base
    if (globalThis.document?.head) {
        const baseElements = globalThis.document.head.querySelectorAll("base");
        baseElements.forEach((el) => el.remove());
    }
}

/**
 * Verifica que el entorno SSR está correctamente configurado
 * Útil para debugging y validación
 */
export function validateSSREnvironment(): {
    hasWindow: boolean;
    hasDocument: boolean;
    hasCustomElements: boolean;
    hasHTMLElement: boolean;
    ready: boolean;
} {
    const result = {
        hasWindow: typeof globalThis.window !== "undefined",
        hasDocument: typeof globalThis.document !== "undefined",
        hasCustomElements: typeof globalThis.customElements !== "undefined",
        hasHTMLElement: typeof globalThis.HTMLElement !== "undefined",
        ready: false,
    };

    result.ready = result.hasWindow && result.hasDocument && result.hasCustomElements && result.hasHTMLElement;

    return result;
}

/**
 * Helper para esperar a que el entorno SSR esté listo
 * Útil en setup de tests asíncronos
 */
export async function waitForSSREnvironment(timeoutMs: number = 5000): Promise<void> {
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
        const checkEnvironment = () => {
            const status = validateSSREnvironment();

            if (status.ready) {
                resolve();
            } else if (Date.now() - startTime > timeoutMs) {
                reject(new Error(`SSR Environment no está listo después de ${timeoutMs}ms. Estado: ${JSON.stringify(status)}`));
            } else {
                setTimeout(checkEnvironment, 10);
            }
        };

        checkEnvironment();
    });
}

/**
 * Configuración automática para tests
 * Se ejecuta automáticamente al importar este módulo
 */
let autoSetupCompleted = false;

export function autoSetupSSR(config?: Partial<SSRTestConfig>): void {
    if (!autoSetupCompleted) {
        setupSSREnvironment(config);
        autoSetupCompleted = true;
    }
}

// Auto-setup por defecto (se puede deshabilitar estableciendo la variable global)
if (typeof globalThis !== "undefined" && !globalThis.__SSR_SETUP_DISABLED__) {
    autoSetupSSR({ verbose: false });
}
