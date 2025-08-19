import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    // Build específico para cliente SSR
    build: {
        outDir: "server/public/js",
        emptyOutDir: false, // No limpiar toda la carpeta public
        lib: false, // No es una librería, es un bundle para navegador
        rollupOptions: {
            input: {
                // Entry point para hidratación
                client: resolve(__dirname, "server/client/client.ts"),
                // Entry point para soporte de hidratación de Lit
                "lit-hydration": resolve(__dirname, "server/client/lit-hydration.ts"),
            },
            output: {
                format: "es", // ES modules para navegadores modernos
                entryFileNames: "[name].js",
                chunkFileNames: "[name]-[hash].js",
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
        include: ["lit", "lit/decorators.js", "lit/directives/class-map.js", "lit/directives/style-map.js", "@lit/context", "@lit-labs/ssr-client"],
    },
});
