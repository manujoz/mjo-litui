import * as url from "url";
import { defineConfig } from "vite";
// @ts-expect-error: Library has incorrect export configuration
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
                "mjo-link": `${__dirname}/dev/mjo-link.html`,
            },
        },
    },
});
