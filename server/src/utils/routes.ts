import { AvatarController } from "../controllers/avatar-controller.js";
import { ChipController } from "../controllers/chip-controller.js";
import { IndexController } from "../controllers/index-controller.js";

const indexController = new IndexController();
const avatarController = new AvatarController();
const chipController = new ChipController();

export const ROUTES = [
    {
        path: "/",
        controller: indexController.renderIndexPage,
    },
    {
        path: "/status",
        controller: indexController.getSystemStatus,
    },
    {
        path: "/component/mjo-avatar",
        controller: avatarController.renderAvatarPage,
    },
    {
        path: "/component/mjo-chip",
        controller: chipController.renderChipPage,
    },
];
