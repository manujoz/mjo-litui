import * as url from "url";
import { defineConfig } from "vite";

import svg from "vite-plugin-svgo";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    css: {
        modules: {
            scopeBehaviour: "local",
        },
    },
    root: `${__dirname}/dev`,
    plugins: [svg()],
    build: {
        rollupOptions: {
            input: {
                main: `${__dirname}/dev/index.html`,
                "mjo-accordion": `${__dirname}/dev/mjo-accordion.html`,
                "mjo-alert": `${__dirname}/dev/mjo-alert.html`,
                "mjo-avatar": `${__dirname}/dev/mjo-avatar.html`,
                "mjo-link": `${__dirname}/dev/mjo-link.html`,
                "mjo-badge": `${__dirname}/dev/mjo-badge.html`,
                "mjo-breadcrumbs": `${__dirname}/dev/mjo-breadcrumbs.html`,
                "mjo-calendar": `${__dirname}/dev/mjo-calendar.html`,
                "mjo-checkbox": `${__dirname}/dev/mjo-checkbox.html`,
                "mjo-chip": `${__dirname}/dev/mjo-chip.html`,
                "mjo-color-picker": `${__dirname}/dev/mjo-color-picker.html`,
                "mjo-date-picker": `${__dirname}/dev/mjo-date-picker.html`,
                "mjo-drawer": `${__dirname}/dev/mjo-drawer.html`,
                "mjo-dropdown": `${__dirname}/dev/mjo-dropdown.html`,
                "mjo-form": `${__dirname}/dev/mjo-form.html`,
                "mjo-listbox": `${__dirname}/dev/mjo-listbox.html`,
                "mjo-progress": `${__dirname}/dev/mjo-progress.html`,
                "mjo-radio": `${__dirname}/dev/mjo-radio.html`,
                "mjo-table": `${__dirname}/dev/mjo-table.html`,
                "mjo-scrollshadow": `${__dirname}/dev/mjo-scrollshadow.html`,
                "mjo-select": `${__dirname}/dev/mjo-select.html`,
                "mjo-slider": `${__dirname}/dev/mjo-slider.html`,
                "mjo-tabs": `${__dirname}/dev/mjo-tabs.html`,
                "mjo-textarea": `${__dirname}/dev/mjo-textarea.html`,
                "mjo-textfield": `${__dirname}/dev/mjo-textfield.html`,
            },
        },
    },
});
