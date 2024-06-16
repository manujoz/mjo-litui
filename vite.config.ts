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
    plugins: [svg()],
    build: {
        rollupOptions: {
            input: {
                main: `${__dirname}/project/index.ts`,
            },
        },
    },
});
