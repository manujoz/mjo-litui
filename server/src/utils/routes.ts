import { AccordionController } from "../controllers/accordion-controller.js";
import { AlertController } from "../controllers/alert-controller.js";
import { AvatarController } from "../controllers/avatar-controller.js";
import { ButtonController } from "../controllers/button-controller.js";
import { CalendarController } from "../controllers/calendar-controller.js";
import { CardController } from "../controllers/card-controller.js";
import { CheckboxController } from "../controllers/checkbox-controller.js";
import { ChipController } from "../controllers/chip-controller.js";
import { ColorPickerController } from "../controllers/color-picker-controller.js";
import { DatePickerController } from "../controllers/date-picker-controller.js";
import { IndexController } from "../controllers/index-controller.js";

const indexController = new IndexController();
const alertController = new AlertController();
const avatarController = new AvatarController();
const buttonController = new ButtonController();
const calendarController = new CalendarController();
const cardController = new CardController();
const checkboxController = new CheckboxController();
const chipController = new ChipController();
const colorPickerController = new ColorPickerController();
const datePickerController = new DatePickerController();
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
        path: "/component/mjo-alert",
        controller: alertController.renderAlertPage,
    },
    {
        path: "/component/mjo-avatar",
        controller: avatarController.renderAvatarPage,
    },
    {
        path: "/component/mjo-button",
        controller: buttonController.renderButtonPage,
    },
    {
        path: "/component/mjo-calendar",
        controller: calendarController.renderCalendarPage,
    },
    {
        path: "/component/mjo-card",
        controller: cardController.renderCardPage,
    },
    {
        path: "/component/mjo-checkbox",
        controller: checkboxController.renderCheckboxPage,
    },
    {
        path: "/component/mjo-chip",
        controller: chipController.renderChipPage,
    },
    {
        path: "/component/mjo-color-picker",
        controller: colorPickerController.renderColorPickerPage,
    },
    {
        path: "/component/mjo-date-picker",
        controller: datePickerController.renderDatePickerPage,
    },
    {
        path: "/status",
        controller: indexController.getSystemStatus,
    },
];
