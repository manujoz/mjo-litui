import { join } from "path";
import { fileURLToPath } from "url";

import { filterCacheableFiles, ModuleCacheManager, restartWithCacheInvalidation } from "../cache-manager";
import { createMjoLituiWatcher } from "../file-watcher";
import { HMRWebSocketManager } from "../websocket-manager";

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const RESTART_COOLDOWN = 2000;

let restartPending = false;
let lastRestartTime = 0;

const cacheManager = new ModuleCacheManager({ verbose: true });

// HMR Manager (development only)
export const hmrManager = process.env.NODE_ENV !== "production" ? new HMRWebSocketManager() : null;

export const fileWatcher = createMjoLituiWatcher({
    debounceDelay: 500,
    verbose: true,
});

/**
 * Handle file changes
 */
export function handleFileChanges(changedFiles: string[]): void {
    const now = Date.now();

    if (restartPending || now - lastRestartTime < RESTART_COOLDOWN) {
        console.log("⏳ Restart in cooldown, ignoring changes...");
        return;
    }

    // Separate changes by type (normalize path separators)
    const srcChanges = changedFiles.filter((file) => {
        // Only src/ at root, not server/src/
        const normalizedFile = file.replace(/\\/g, "/");
        return (
            (normalizedFile.includes("/src/") && !normalizedFile.includes("/server/src/")) ||
            (normalizedFile.startsWith("src/") && !normalizedFile.startsWith("server/"))
        );
    });
    const distChanges = changedFiles.filter((file) => file.includes("/dist/") || file.includes("\\dist\\"));
    const serverChanges = changedFiles.filter(
        (file) =>
            file.includes("/server/src/") || file.includes("\\server\\src\\") || file.includes("/server/templates/") || file.includes("\\server\\templates\\"),
    );

    // If there are changes in /src/, build client only (Vite)
    if (srcChanges.length > 0) {
        triggerBuild(srcChanges).catch((error) => console.error("❌ Error in triggerBuild:", error));
        return;
    }

    // Cache invalidation for cacheable files
    const cacheableFiles = filterCacheableFiles(changedFiles);
    if (cacheableFiles.length > 0) {
        cacheManager.invalidateModules(cacheableFiles);
    }

    // Restart if there are changes in /dist/ or /server/
    const needsRestart = distChanges.length > 0 || serverChanges.length > 0;
    if (needsRestart) {
        scheduleRestart();
    }
}

/**
 * Handle graceful shutdown of the application
 */
export async function shutdownGracefully(): Promise<void> {
    try {
        await fileWatcher.stop();

        if (hmrManager) {
            hmrManager.close();
        }

        console.log("🗑️  Clearing cache...");
        cacheManager.clearAll();

        console.log("✅ Shutdown completed");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error during shutdown:", error);
        process.exit(1);
    }
}

/**
 * Trigger build process
 */
async function triggerBuild(changedFiles: string[] = []): Promise<void> {
    // Notify build start to HMR clients
    if (hmrManager) {
        hmrManager.notifyBuildStart(changedFiles);
    }

    const { spawn } = await import("child_process");

    // Solo build del cliente (Vite) - el servidor no necesita rebuild constante
    const clientBuildProcess = spawn("npm", ["run", "server:build:client"], {
        stdio: "inherit",
        shell: true,
        cwd: join(__dirname, "../.."),
    });

    clientBuildProcess.on("close", (clientCode: number) => {
        if (clientCode === 0) {
            // Notificar fin del build a clientes HMR
            if (hmrManager) {
                // hmrManager.notifyBuildComplete();
            }
        } else {
            console.error(`❌ Error en build cliente (código: ${clientCode})`);
        }
    });
}

/**
 * Programa un reinicio del servidor
 */
function scheduleRestart(): void {
    if (restartPending) return;

    restartPending = true;
    lastRestartTime = Date.now();

    setTimeout(() => {
        restartWithCacheInvalidation();
    }, 300);
}
