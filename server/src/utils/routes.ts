import { AccordionController } from "../controllers/accordion-controller.js";
import { AvatarController } from "../controllers/avatar-controller.js";
import { ChipController } from "../controllers/chip-controller.js";
import { IndexController } from "../controllers/index-controller.js";

const indexController = new IndexController();
const avatarController = new AvatarController();
const chipController = new ChipController();
const accordionController = new AccordionController();

export const ROUTES = [
    {
        path: "/",
        controller: indexController.renderIndexPage,
    },
    {
        path: "/component/mjo-accordion",
        controller: accordionController.renderAccordionPage,
    },
    {
        path: "/component/mjo-avatar",
        controller: avatarController.renderAvatarPage,
    },
    {
        path: "/component/mjo-chip",
        controller: chipController.renderChipPage,
    },
    {
        path: "/status",
        controller: indexController.getSystemStatus,
    },
];
