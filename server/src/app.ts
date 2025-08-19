import express from "express";
import { join } from "path";
import { fileURLToPath } from "url";
import { ModuleCacheManager, filterCacheableFiles, restartWithCacheInvalidation } from "./cache-manager.js";
import { createMjoLituiWatcher } from "./file-watcher.js";

// Importar controladores directamente
import { AvatarController } from "./controllers/avatar-controller.js";
import { ChipController } from "./controllers/chip-controller.js";
import { IndexController } from "./controllers/index-controller.js";

console.log("🚀 SSR Server starting...");

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Inicializar managers
const fileWatcher = createMjoLituiWatcher({
    debounceDelay: 500,
    verbose: true,
});

const cacheManager = new ModuleCacheManager({ verbose: true });

// Inicializar controladores
const indexController = new IndexController();
const avatarController = new AvatarController();
const chipController = new ChipController();

// Flag para controlar reinicios
let restartPending = false;
let lastRestartTime = 0;
const RESTART_COOLDOWN = 2000;

// Importación directa de componentes desde src/ para SSR
import "../../src/mjo-avatar.js";
import "../../src/mjo-chip.js";
import "../../src/mjo-theme.js";

const app = express();
const PORT = process.env.PORT || 5748;

// Middleware para archivos estáticos
app.use("/public", express.static(join(__dirname, "../public")));

// Servir archivos compilados de dist/ para hidratación en el cliente
app.use("/dist", express.static(join(__dirname, "../../dist")));

// Servir archivos fuente de src/ para imports directos en el cliente
app.use("/src", express.static(join(__dirname, "../../src")));

// Servir node_modules para las librerías de hidratación de Lit SSR
app.use("/node_modules", express.static(join(__dirname, "../../node_modules")));

// Función para manejar cambios de archivos
function handleFileChanges(changedFiles: string[]): void {
    const now = Date.now();

    if (restartPending || now - lastRestartTime < RESTART_COOLDOWN) {
        console.log("⏳ Reinicio en cooldown, ignorando cambios...");
        return;
    }

    console.log("📁 Archivos modificados detectados:", changedFiles.length);
    console.log("📋 Archivos:", changedFiles); // Debug: ver paths exactos

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

    console.log("🔍 Debug paths:");
    console.log("  srcChanges:", srcChanges);
    console.log("  distChanges:", distChanges);
    console.log("  serverChanges:", serverChanges);

    // Si hay cambios en /src/, compilar solo cliente (Vite)
    if (srcChanges.length > 0) {
        console.log("🎨 Cambios en /src/ detectados, compilando cliente...");
        triggerBuild().catch((error) => console.error("❌ Error en triggerBuild:", error));
        return; // La compilación activará el reinicio cuando termine
    }

    // Cache invalidation para archivos cacheable
    const cacheableFiles = filterCacheableFiles(changedFiles);
    if (cacheableFiles.length > 0) {
        console.log("♻️  Invalidando cache para archivos modificados...");
        cacheManager.invalidateModules(cacheableFiles);
    }

    // Reiniciar si hay cambios en /dist/ o /server/
    const needsRestart = distChanges.length > 0 || serverChanges.length > 0;
    if (needsRestart) {
        console.log("🔄 Cambios detectados que requieren reinicio del servidor...");
        scheduleRestart();
    }
}

// Función para compilar el cliente con Vite
async function triggerBuild(): Promise<void> {
    console.log("🎨 Iniciando compilación del cliente (Vite)...");

    const { spawn } = await import("child_process");

    // Solo build del cliente (Vite) - el servidor no necesita rebuild constante
    const clientBuildProcess = spawn("npm", ["run", "build:client"], {
        stdio: "inherit",
        shell: true,
        cwd: join(__dirname, "../.."),
    });

    clientBuildProcess.on("close", (clientCode: number) => {
        if (clientCode === 0) {
            console.log("✅ Build cliente completado");
            console.log("🔄 Reiniciando servidor tras compilación del cliente...");
            scheduleRestart();
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

    console.log("⏱️  Reinicio programado en 1 segundo...");

    setTimeout(() => {
        restartWithCacheInvalidation();
    }, 1000);
}

// RUTAS PRINCIPALES - INTEGRACIÓN COMPLETA DE ITERACIÓN 3

// Ruta principal - Página de índice con navegación completa
app.get("/", async (_req, res, next) => {
    try {
        console.log("🎯 Renderizando página principal con SSR...");
        const html = await indexController.renderIndexPage();
        console.log("✅ SSR renderizado exitoso - Página principal");
        res.send(html);
    } catch (error) {
        console.error("❌ Error en renderizado de página principal:", error);
        next(error);
    }
});

// Ruta de estado del sistema (JSON)
app.get("/status", (_req, res) => {
    try {
        const status = indexController.getSystemStatus();
        res.json(status);
    } catch (error) {
        console.error("❌ Error obteniendo estado del sistema:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Rutas para mjo-avatar - Demo completo con todas las variantes
app.get("/component/avatar", async (_req, res, next) => {
    try {
        console.log("🎯 Renderizando demos completos de mjo-avatar...");
        const html = await avatarController.renderAvatarPage();
        console.log("✅ SSR renderizado exitoso - mjo-avatar demos");
        res.send(html);
    } catch (error) {
        console.error("❌ Error en renderizado de mjo-avatar:", error);
        next(error);
    }
});

// Rutas para mjo-chip - Demo completo con todas las variantes
app.get("/component/chip", async (_req, res, next) => {
    try {
        console.log("🎯 Renderizando demos completos de mjo-chip...");
        const html = await chipController.renderChipPage();
        console.log("✅ SSR renderizado exitoso - mjo-chip demos");
        res.send(html);
    } catch (error) {
        console.error("❌ Error en renderizado de mjo-chip:", error);
        next(error);
    }
});

// Función para manejo graceful de shutdown
async function shutdownGracefully(): Promise<void> {
    try {
        console.log("🔄 Deteniendo file watcher...");
        await fileWatcher.stop();

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
    console.log("🛑 Recibida señal SIGTERM, cerrando servidor...");
    await shutdownGracefully();
});

process.on("SIGINT", async () => {
    console.log("🛑 Recibida señal SIGINT, cerrando servidor...");
    await shutdownGracefully();
});

// Middleware de manejo de errores
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("❌ Error en aplicación:", err);

    const errorHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - mjo-litui SSR</title>
        <style>
            body { 
                font-family: 'Segoe UI', sans-serif; 
                margin: 40px auto; 
                max-width: 800px; 
                padding: 20px; 
                background: #f8fafc; 
                color: #1e293b; 
            }
            .error-container { 
                background: white; 
                padding: 40px; 
                border-radius: 12px; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
                border-left: 4px solid #ef4444; 
            }
            h1 { 
                color: #ef4444; 
                margin: 0 0 20px 0; 
                display: flex; 
                align-items: center; 
                gap: 10px; 
            }
            pre { 
                background: #f1f5f9; 
                padding: 20px; 
                border-radius: 8px; 
                overflow-x: auto; 
                font-size: 0.875rem; 
            }
            .back-link { 
                display: inline-block; 
                margin-top: 20px; 
                color: #3b82f6; 
                text-decoration: none; 
                padding: 10px 15px; 
                background: #dbeafe; 
                border-radius: 6px; 
            }
            .back-link:hover { 
                background: #3b82f6; 
                color: white; 
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <h1>❌ Error en Servidor SSR</h1>
            <p><strong>Error:</strong> ${err instanceof Error ? err.message : "Error desconocido"}</p>
            ${err instanceof Error && err.stack ? `<pre>${err.stack}</pre>` : ""}
            <a href="/" class="back-link">← Volver al inicio</a>
        </div>
    </body>
    </html>
    `;

    res.status(500).send(errorHtml);
});

// Ruta de fallback para 404
app.use("*", (_req, res) => {
    const notFoundHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Página no encontrada</title>
        <style>
            body { 
                font-family: 'Segoe UI', sans-serif; 
                margin: 40px auto; 
                max-width: 600px; 
                padding: 20px; 
                background: #f8fafc; 
                color: #1e293b; 
                text-align: center; 
            }
            .not-found-container { 
                background: white; 
                padding: 60px 40px; 
                border-radius: 12px; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
            }
            h1 { 
                font-size: 4rem; 
                margin: 0; 
                color: #64748b; 
            }
            h2 { 
                color: #1e293b; 
                margin: 20px 0; 
            }
            .nav-links { 
                margin-top: 30px; 
                display: flex; 
                gap: 15px; 
                justify-content: center; 
                flex-wrap: wrap; 
            }
            .nav-links a { 
                color: #3b82f6; 
                text-decoration: none; 
                padding: 12px 20px; 
                background: #dbeafe; 
                border-radius: 8px; 
                transition: all 0.2s ease; 
            }
            .nav-links a:hover { 
                background: #3b82f6; 
                color: white; 
            }
        </style>
    </head>
    <body>
        <div class="not-found-container">
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>La página que estás buscando no existe en este servidor SSR.</p>
            <div class="nav-links">
                <a href="/">🏠 Inicio</a>
                <a href="/component/avatar">🧑‍💼 Avatar</a>
                <a href="/component/chip">🏷️ Chip</a>
            </div>
        </div>
    </body>
    </html>
    `;

    res.status(404).send(notFoundHtml);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log("🚀 Servidor SSR iniciado en http://localhost:" + PORT);
    console.log("📁 Sirviendo desde:", __dirname);
    console.log("🔗 Rutas disponibles:");
    console.log("   - http://localhost:" + PORT + "/ (Página principal)");
    console.log("   - http://localhost:" + PORT + "/component/avatar (Demos mjo-avatar)");
    console.log("   - http://localhost:" + PORT + "/component/chip (Demos mjo-chip)");
    console.log("   - http://localhost:" + PORT + "/status (Estado del sistema)");

    // Iniciar file watcher después del servidor
    console.log("🔍 Iniciando sistema de file watching...");
    fileWatcher.start(handleFileChanges);
});

export default app;
