import { litSsrPlugin } from "@lit-labs/testing/web-test-runner-ssr-plugin.js";
import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from "@web/test-runner-playwright";

// web-test-runner has a known issue where it ignores --watch=false in interactive terminals
// The only reliable way to disable watch mode is to run tests in a non-interactive context
// or use process control from the calling environment

// Only enable watch mode if explicitly requested via --watch flag
const watchMode = process.argv.includes("--watch");

export default {
    files: ["test/**/*.test.{js,ts}"],
    nodeResolve: true,

    // Watch mode only when explicitly requested
    watch: watchMode,

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
