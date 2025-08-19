import chokidar from "chokidar";
import { join, relative } from "path";
import { fileURLToPath } from "url";

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..", "..", "..");

interface WatcherConfig {
    paths: string[];
    ignored?: string[];
    debounceDelay?: number;
    verbose?: boolean;
}

export class FileWatcher {
    private watcher: any = null;
    private isWatching = false;
    private changeTimeout: NodeJS.Timeout | null = null;
    private pendingChanges: Set<string> = new Set();
    private onChangeCallback?: (files: string[]) => void;
    private debounceDelay: number = 300;

    constructor(private config: WatcherConfig) {
        this.debounceDelay = config.debounceDelay || 300;
    }

    /**
     * Inicia el file watcher con la configuración especificada
     */
    start(onChangeCallback: (files: string[]) => void): void {
        if (this.isWatching) {
            this.log("⚠️  File watcher ya está activo");
            return;
        }

        this.onChangeCallback = onChangeCallback;

        const watcherOptions = {
            ignored: [
                "**/node_modules/**",
                "**/server/dist/**",
                "**/*.test.ts",
                "**/*.spec.ts",
                "**/coverage/**",
                "**/dist/**",
                "**/.git/**",
                "**/.DS_Store",
                "**/Thumbs.db",
                ...(this.config.ignored || []),
            ],
            persistent: true,
            ignoreInitial: true,
            followSymlinks: true,
            usePolling: false,
            interval: 100,
            awaitWriteFinish: {
                stabilityThreshold: 300,
                pollInterval: 100,
            },
        };

        try {
            this.watcher = chokidar.watch(this.config.paths, watcherOptions);

            this.watcher
                .on("change", (path: string) => this.handleFileChange(path))
                .on("add", (path: string) => this.handleFileChange(path))
                .on("unlink", (path: string) => this.handleFileChange(path))
                .on("addDir", (path: string) => this.handleDirectoryChange(path, "created"))
                .on("unlinkDir", (path: string) => this.handleDirectoryChange(path, "deleted"))
                .on("error", (error: any) => this.handleError(error))
                .on("ready", () => {
                    this.isWatching = true;
                });
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Detiene el file watcher
     */
    async stop(): Promise<void> {
        if (!this.watcher || !this.isWatching) {
            this.log("⚠️  File watcher no está activo");
            return;
        }

        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
            this.changeTimeout = null;
        }

        try {
            await this.watcher.close();
            this.watcher = null;
            this.isWatching = false;
            this.pendingChanges.clear();
            this.log("✅ File watcher detenido correctamente");
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Maneja cambios en archivos
     */
    private handleFileChange(path: string): void {
        this.pendingChanges.add(path);
        this.debounceChange();
    }

    /**
     * Maneja cambios en directorios
     */
    private handleDirectoryChange(path: string, eventType: "created" | "deleted"): void {
        const relativePath = relative(__dirname, path);
        this.log(`📁 Directorio ${eventType}: ${relativePath}`);
    }

    /**
     * Implementa debouncing para evitar recargas excesivas
     */
    private debounceChange(): void {
        if (this.changeTimeout) {
            clearTimeout(this.changeTimeout);
        }

        this.changeTimeout = setTimeout(() => {
            const changedFiles = Array.from(this.pendingChanges);
            this.pendingChanges.clear();

            if (changedFiles.length > 0 && this.onChangeCallback) {
                this.onChangeCallback(changedFiles);
            }
        }, this.debounceDelay);
    }

    /**
     * Maneja errores del watcher
     */
    private handleError(error: any): void {
        console.error("❌ Error en file watcher:", error);
    }

    /**
     * Logger con timestamp
     */
    private log(message: string): void {
        if (this.config.verbose !== false) {
            const timestamp = new Date().toLocaleTimeString("es-ES");
            console.log(`[${timestamp}] ${message}`);
        }
    }

    /**
     * Verifica si el watcher está activo
     */
    get isActive(): boolean {
        return this.isWatching;
    }
}

/**
 * Factory para crear un watcher específico para el proyecto mjo-litui
 */
export function createMjoLituiWatcher(options?: { debounceDelay?: number; verbose?: boolean }): FileWatcher {
    const config: WatcherConfig = {
        paths: [join(__dirname, "src"), join(__dirname, "server/src"), join(__dirname, "server/templates")],
        ignored: [
            "**/node_modules/**",
            "**/server/dist/**",
            "**/*.test.ts",
            "**/*.spec.ts",
            "**/coverage/**",
            "**/dist/**",
            "**/.git/**",
            "**/stories/**",
            "**/*.stories.ts",
        ],
        debounceDelay: options?.debounceDelay || 500,
        verbose: options?.verbose !== false,
    };

    return new FileWatcher(config);
}
