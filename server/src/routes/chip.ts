import { Router } from "express";
import { ChipController } from "../controllers/chip-controller.js";

const router = Router();
const chipController = new ChipController();

/**
 * Ruta para demos completos del componente mjo-chip
 */
router.get("/", async (_req, res, next) => {
    try {
        console.log("🎯 Renderizando página de mjo-chip con SSR...");
        const html = await chipController.renderChipPage();
        console.log("✅ SSR renderizado exitoso - mjo-chip");
        res.send(html);
    } catch (error) {
        console.error("❌ Error en renderizado de mjo-chip:", error);
        next(error);
    }
});

export default router;
