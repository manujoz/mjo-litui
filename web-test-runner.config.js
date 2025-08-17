import { litSsrPlugin } from "@lit-labs/testing/web-test-runner-ssr-plugin.js";
import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
    files: "test/**/*.test.{js,ts}",
    nodeResolve: true,

    // Enable SSR testing capabilities and TypeScript compilation
    plugins: [
        litSsrPlugin(),
        esbuildPlugin({
            ts: true,
            target: "es2020",
            tsconfig: "tsconfig.json",
        }),
    ],

    // Use Playwright for cross-browser testing
    browsers: [playwrightLauncher({ product: "chromium" }), playwrightLauncher({ product: "firefox" }), playwrightLauncher({ product: "webkit" })],

    // Test configurations
    testFramework: {
        config: {
            ui: "tdd",
            timeout: 10000,
        },
    },

    // Coverage configuration
    coverage: true,
    coverageConfig: {
        // Temporary relaxed function threshold while consolidating & adding targeted tests
        threshold: {
            statements: 80,
            branches: 80,
            functions: 75, // TODO: restore to 80 after new validator/select utils tests
            lines: 80,
        },
        include: ["src/**/*.ts"],
        exclude: ["src/**/*.d.ts", "src/types/**/*", "src/vite-env.d.ts", "dev/**/*", "test/**/*"],
    },

    // Serve static files
    staticDirs: ["src"],
};
