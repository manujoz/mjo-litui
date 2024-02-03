import * as url from "url";
import { defineConfig } from "vite";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    css: {
        modules: {
            scopeBehaviour: "local",
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: `${__dirname}/project/index.ts`,
            },
        },
    },
});
