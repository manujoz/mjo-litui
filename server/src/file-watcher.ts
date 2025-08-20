import chokidar from "chokidar";
import { join, relative } from "path";
import { fileURLToPath } from "url";

// Configure __dirname for ES modules
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
     * Starts the file watcher with the specified configuration
     */
    start(onChangeCallback: (files: string[]) => void): void {
        if (this.isWatching) {
            this.log("⚠️  File watcher is already active");
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
     * Stops the file watcher
     */
    async stop(): Promise<void> {
        if (!this.watcher || !this.isWatching) {
            this.log("⚠️  File watcher is not active");
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
            this.log("✅ File watcher stopped successfully");
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Handles file changes
     */
    private handleFileChange(path: string): void {
        this.pendingChanges.add(path);
        this.debounceChange();
    }

    /**
     * Handles directory changes
     */
    private handleDirectoryChange(path: string, eventType: "created" | "deleted"): void {
        const relativePath = relative(__dirname, path);
        this.log(`📁 Directory ${eventType}: ${relativePath}`);
    }

    /**
     * Implements debouncing to avoid excessive reloads
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
     * Handles watcher errors
     */
    private handleError(error: any): void {
        console.error("❌ Error in file watcher:", error);
    }

    /**
     * Logger with timestamp
     */
    private log(message: string): void {
        if (this.config.verbose !== false) {
            const timestamp = new Date().toLocaleTimeString("en-US");
            console.log(`[${timestamp}] ${message}`);
        }
    }

    /**
     * Checks if the watcher is active
     */
    get isActive(): boolean {
        return this.isWatching;
    }
}

/**
 * Factory to create a watcher specific for the mjo-litui project
 */
export function createMjoLituiWatcher(options?: { debounceDelay?: number; verbose?: boolean }): FileWatcher {
    const config: WatcherConfig = {
        paths: [
            join(__dirname, "src"),
            join(__dirname, "server/src"),
            join(__dirname, "server/client"),
            join(__dirname, "server/public/css"),
            join(__dirname, "server/templates"),
        ],
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
