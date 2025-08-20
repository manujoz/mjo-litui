import express from "express";
import fs from "fs";
import { createServer } from "http";
import { join } from "path";
import { fileURLToPath } from "url";

// Import controllers directly
import { IndexController } from "./controllers/index-controller.js";
import { fileWatcher, handleFileChanges, hmrManager, shutdownGracefully } from "./lib/app.js";
import { ROUTES } from "./utils/routes.js";

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Initialize managers

// Initialize controllers
const indexController = new IndexController();

const app = express();
const PORT = process.env.PORT || 5748;

// Middleware for static files
app.use("/public", express.static(join(__dirname, "../public")));

ROUTES.forEach((route) => {
    app.get(route.path, async (_req, res, next) => {
        try {
            const html = await route.controller();
            res.send(html);
        } catch (error) {
            console.error(`❌ Rendering error at ${route.path}:`, error);
            next(error);
        }
    });
});

// Function for graceful shutdown handling

// Graceful shutdown handling
process.on("SIGTERM", async () => {
    console.log("🛑 Shutting down server...");
    await shutdownGracefully();
});

process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await shutdownGracefully();
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("❌ Application error:", err);

    let errorHtml = fs.readFileSync(join(__dirname, "pages", "500.html"), "utf-8");
    errorHtml = errorHtml.replace("${errmsg}", err instanceof Error ? err.message : "Unknown error");
    errorHtml = errorHtml.replace("${errstack}", err instanceof Error && err.stack ? `<pre>${err.stack}</pre>` : "");

    res.status(500).send(errorHtml);
});

// Fallback route for 404
app.use("*", (_req, res) => {
    const notFoundHtml = fs.readFileSync(join(__dirname, "pages", "404.html"), "utf-8");

    res.status(404).send(notFoundHtml);
});

// Start server with WebSocket support
const server = createServer(app);
server.listen(PORT, () => {
    // Initialize HMR WebSocket

    if (hmrManager) {
        hmrManager.initialize(server).then(() => {
            if (hmrManager) hmrManager.notifyBuildComplete();
            setTimeout(() => {
                console.log("🧪 HMR Done");
            }, 100);
        });

        // Configure HMR manager in controllers
        indexController.setHMRManager(hmrManager);
    }

    console.log("✅ Server listening at: http://localhost:" + PORT);

    // Start file watcher after server
    fileWatcher.start(handleFileChanges);
});

export default app;
