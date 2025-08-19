import { resolve } from "path";
// import { fileURLToPath } from "url";

// Configurar __dirname para ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = resolve(__filename, "..", "..", "..");

export class ModuleCacheManager {
    private cachedModules: Set<string> = new Set();
    private verbose: boolean = false;

    constructor(options?: { verbose?: boolean }) {
        this.verbose = options?.verbose || false;
    }

    /**
     * Invalida el cache de módulos específicos
     */
    invalidateModules(filePaths: string[]): void {
        filePaths.filter((path) => this.invalidateModule(path)).length;
    }

    /**
     * Invalida el cache de un módulo específico
     */
    private invalidateModule(filePath: string): boolean {
        try {
            const absolutePath = resolve(filePath);

            // En Node.js con ES modules, el cache se maneja diferente
            // Para TSX/TS files, necesitamos invalidar posibles transformaciones
            if (this.shouldInvalidate(absolutePath)) {
                this.cachedModules.add(absolutePath);
                return true;
            }

            return false;
        } catch (error) {
            this.log(`❌ Error invalidando cache para ${filePath}: ${error}`);
            return false;
        }
    }

    /**
     * Verifica si un archivo debe tener su cache invalidado
     */
    private shouldInvalidate(filePath: string): boolean {
        const extensions = [".ts", ".js", ".mjs"];
        return extensions.some((ext) => filePath.endsWith(ext));
    }

    /**
     * Limpia completamente el cache (para reinicio completo)
     */
    clearAll(): void {
        this.cachedModules.clear();
        this.log("🗑️  Cache cleaned");
    }

    /**
     * Obtiene estadísticas del cache
     */
    getStats(): {
        totalCachedModules: number;
        cachedModules: string[];
    } {
        return {
            totalCachedModules: this.cachedModules.size,
            cachedModules: Array.from(this.cachedModules),
        };
    }

    /**
     * Logger con timestamp
     */
    private log(message: string): void {
        if (this.verbose) {
            const timestamp = new Date().toLocaleTimeString("es-ES");
            console.log(`[${timestamp}] ${message}`);
        }
    }
}

/**
 * Función utilitaria para filtrar archivos que necesitan invalidación de cache
 */
export function filterCacheableFiles(filePaths: string[]): string[] {
    const cacheableExtensions = [".ts", ".js", ".mjs"];

    return filePaths.filter((filePath) => {
        return cacheableExtensions.some((ext) => filePath.endsWith(ext));
    });
}

/**
 * Función para reiniciar proceso con invalidación de cache
 * Útil para reinicios completos del servidor
 */
export function restartWithCacheInvalidation(): void {
    // En un entorno con tsx/nodemon, simplemente salir permite que el process manager reinicie
    process.exit(0);
}
