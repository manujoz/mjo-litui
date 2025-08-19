import { Router } from "express";
import { AvatarController } from "../controllers/avatar-controller.js";

const router = Router();
const avatarController = new AvatarController();

/**
 * Ruta para demos completos del componente mjo-avatar
 */
router.get("/", async (_req, res, next) => {
    try {
        console.log("🎯 Renderizando página de mjo-avatar con SSR...");
        const html = await avatarController.renderAvatarPage();
        console.log("✅ SSR renderizado exitoso - mjo-avatar");
        res.send(html);
    } catch (error) {
        console.error("❌ Error en renderizado de mjo-avatar:", error);
        next(error);
    }
});

export default router;
