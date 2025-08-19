import fs from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    // Build específico para cliente SSR
    build: {
        outDir: "server/public/js",
        emptyOutDir: true, // Limpiar la carpeta de salida automáticamente
        lib: false, // No es una librería, es un bundle para navegador
        rollupOptions: {
            input: getInputs(),
            output: {
                format: "es", // ES modules para navegadores modernos
                entryFileNames: "[name].js",
                chunkFileNames: (chunkInfo) => {
                    // Nombrar específicamente el chunk que contiene las directivas de Lit
                    if (chunkInfo.moduleIds.filter((id) => id.includes("lit")).length > 0) {
                        return "lit-core.js";
                    }
                    return "[name].js";
                },
            },
        },
        // Configuración de minificación para desarrollo
        minify: process.env.NODE_ENV === "production",
        sourcemap: true,
    },

    // Resolver alias para imports limpios
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "@components": resolve(__dirname, "src"),
        },
    },

    // Optimizaciones de dependencias
    optimizeDeps: {
        include: ["lit", "lit/decorators.js", "@lit/context", "@lit-labs/ssr-client"],
    },
});

function getInputs() {
    const clientDirPath = resolve(__dirname, "server/client");

    const clientDirFiles = fs.readdirSync(clientDirPath).reduce((acc, file) => {
        if (file.endsWith(".ts")) {
            acc[file.replace(".ts", "")] = resolve(clientDirPath, file);
        }
        return acc;
    }, {});

    return clientDirFiles;
}
