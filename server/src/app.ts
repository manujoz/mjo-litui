import express from "express";
import fs from "fs";
import { createServer } from "http";
import { join } from "path";
import { fileURLToPath } from "url";

import { ModuleCacheManager, filterCacheableFiles, restartWithCacheInvalidation } from "./cache-manager.js";
import { createMjoLituiWatcher } from "./file-watcher.js";
import { HMRWebSocketManager } from "./websocket-manager.js";

// Importar controladores directamente
import { AvatarController } from "./controllers/avatar-controller.js";
import { ChipController } from "./controllers/chip-controller.js";
import { IndexController } from "./controllers/index-controller.js";
import { ROUTES } from "./utils/routes.js";

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Inicializar managers
const fileWatcher = createMjoLituiWatcher({
    debounceDelay: 500,
    verbose: true,
});

const cacheManager = new ModuleCacheManager({ verbose: true });

// HMR Manager (solo en desarrollo)
const hmrManager = process.env.NODE_ENV !== "production" ? new HMRWebSocketManager() : null;

// Inicializar controladores
const indexController = new IndexController();
const avatarController = new AvatarController();
const chipController = new ChipController();

// Flag para controlar reinicios
let restartPending = false;
let lastRestartTime = 0;
const RESTART_COOLDOWN = 2000;

const app = express();
const PORT = process.env.PORT || 5748;

// Middleware para archivos estáticos
app.use("/public", express.static(join(__dirname, "../public")));

// Función para manejar cambios de archivos
function handleFileChanges(changedFiles: string[]): void {
    const now = Date.now();

    if (restartPending || now - lastRestartTime < RESTART_COOLDOWN) {
        console.log("⏳ Reinicio en cooldown, ignorando cambios...");
        return;
    }

    // Separar cambios por tipo (normalizar separadores de path)
    const srcChanges = changedFiles.filter((file) => {
        // Solo src/ en la raíz, no server/src/
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

    // Si hay cambios en /src/, compilar solo cliente (Vite)
    if (srcChanges.length > 0) {
        triggerBuild(srcChanges).catch((error) => console.error("❌ Error en triggerBuild:", error));
        return;
    }

    // Cache invalidation para archivos cacheable
    const cacheableFiles = filterCacheableFiles(changedFiles);
    if (cacheableFiles.length > 0) {
        cacheManager.invalidateModules(cacheableFiles);
    }

    // Reiniciar si hay cambios en /dist/ o /server/
    const needsRestart = distChanges.length > 0 || serverChanges.length > 0;
    if (needsRestart) {
        scheduleRestart();
    }
}

// Función para compilar el cliente con Vite
async function triggerBuild(changedFiles: string[] = []): Promise<void> {
    // Notificar inicio del build a clientes HMR
    if (hmrManager) {
        hmrManager.notifyBuildStart(changedFiles);
    }

    const { spawn } = await import("child_process");

    // Solo build del cliente (Vite) - el servidor no necesita rebuild constante
    const clientBuildProcess = spawn("npm", ["run", "build:client"], {
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

// Función para programar reinicio con delay
function scheduleRestart(): void {
    if (restartPending) return;

    restartPending = true;
    lastRestartTime = Date.now();

    setTimeout(() => {
        restartWithCacheInvalidation();
    }, 300);
}

ROUTES.forEach((route) => {
    app.get(route.path, async (_req, res, next) => {
        try {
            const html = await route.controller();
            res.send(html);
        } catch (error) {
            console.error(`❌ Error en renderizado de ${route.path}:`, error);
            next(error);
        }
    });
});

// Función para manejo graceful de shutdown
async function shutdownGracefully(): Promise<void> {
    try {
        await fileWatcher.stop();

        if (hmrManager) {
            hmrManager.close();
        }

        console.log("🗑️  Limpiando cache...");
        cacheManager.clearAll();

        console.log("✅ Shutdown completado");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error durante shutdown:", error);
        process.exit(1);
    }
}

// Manejo graceful de shutdown
process.on("SIGTERM", async () => {
    console.log("🛑 Cerrando servidor...");
    await shutdownGracefully();
});

process.on("SIGINT", async () => {
    console.log("🛑 Cerrando servidor...");
    await shutdownGracefully();
});

// Middleware de manejo de errores
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("❌ Error en aplicación:", err);

    let errorHtml = fs.readFileSync(join(__dirname, "pages", "500.html"), "utf-8");
    errorHtml = errorHtml.replace("${errmsg}", err instanceof Error ? err.message : "Error desconocido");
    errorHtml = errorHtml.replace("${errstack}", err instanceof Error && err.stack ? `<pre>${err.stack}</pre>` : "");

    res.status(500).send(errorHtml);
});

// Ruta de fallback para 404
app.use("*", (_req, res) => {
    const notFoundHtml = fs.readFileSync(join(__dirname, "pages", "404.html"), "utf-8");

    res.status(404).send(notFoundHtml);
});

// Iniciar servidor con soporte para WebSocket
const server = createServer(app);
server.listen(PORT, () => {
    // Inicializar HMR WebSocket

    if (hmrManager) {
        hmrManager.initialize(server).then(() => {
            hmrManager.notifyBuildComplete();
            setTimeout(() => {
                console.log("🧪 HMR Done");
            }, 100);
        });

        // Configurar HMR manager en controladores
        indexController.setHMRManager(hmrManager);
    } else {
    }

    console.log("✅ Server listening in: http://localhost:" + PORT);
    // Iniciar file watcher después del servidor
    fileWatcher.start(handleFileChanges);
});

export default app;
