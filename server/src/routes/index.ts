import { Router } from "express";
import { IndexController } from "../controllers/index-controller.js";

const router = Router();
const indexController = new IndexController();

/**
 * Ruta principal - Página de índice con todos los componentes
 */
router.get("/", async (_req, res, next) => {
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

/**
 * Ruta de estado del sistema (JSON)
 */
router.get("/status", (_req, res) => {
    try {
        const status = indexController.getSystemStatus();
        res.json(status);
    } catch (error) {
        console.error("❌ Error obteniendo estado del sistema:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
