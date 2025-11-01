import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import lit from "eslint-plugin-lit";
import litA11y from "eslint-plugin-lit-a11y";
import prettier from "eslint-plugin-prettier";
import wc from "eslint-plugin-wc";
import globals from "globals";

export default [
    // Global ignores
    {
        ignores: ["dist/**", "node_modules/**", "dev/**", "test/**", "server/**", ".eslintrc.json", "commitlint.config.cjs"],
    },

    // Base configuration for all files
    {
        files: ["src/**/*.ts", "src/**/*.js"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
                project: "./tsconfig.json",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2020,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            lit: lit,
            wc: wc,
            prettier: prettier,
            "lit-a11y": litA11y,
        },
        rules: {
            // ESLint recommended rules
            ...js.configs.recommended.rules,

            // TypeScript ESLint recommended rules
            ...tseslint.configs.recommended.rules,

            // Lit plugin recommended rules
            ...lit.configs.recommended.rules,

            // Web Components plugin recommended rules
            ...wc.configs.recommended.rules,

            // Custom TypeScript rules
            "@typescript-eslint/no-var-requires": "off",

            // Core ESLint rules
            curly: ["error", "multi-line"],
            "max-len": [
                "error",
                {
                    code: 160,
                },
            ],
            "no-console": ["error", { allow: ["warn", "error"] }],
            quotes: ["error", "double"],
            semi: ["error", "always"],

            // Lit-specific rules
            "lit/binding-positions": "error",
            "lit/no-duplicate-template-bindings": "error",
            "lit/no-invalid-html": "error",
            "lit/no-legacy-imports": "error",
            "lit/no-legacy-template-syntax": "error",
            "lit/no-native-attributes": "error",
            "lit/no-useless-template-literals": "error",
            "lit/prefer-nothing": "error",
            "lit/quoted-expressions": ["error", "never"],
            "lit/value-after-constraints": "error",

            // Web Components rules
            "wc/max-elements-per-file": ["error"],
            "wc/no-constructor-attributes": "error",
            "wc/no-constructor-params": "error",
            "wc/no-exports-with-element": "error",
            "wc/no-invalid-element-name": "error",
            "wc/no-method-prefixed-with-on": "error",
            "wc/no-typos": "error",
            "wc/no-self-class": "off",
            "wc/tag-name-matches-class": "error",
            "wc/file-name-matches-element": [
                "error",
                {
                    transform: ["kebab"],
                },
            ],

            // Prettier rules
            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto",
                    tabWidth: 4,
                    printWidth: 160,
                },
            ],
        },
    },

    // Override configuration for test files
    {
        files: ["**/*.test.ts", "**/*.spec.ts", "test/**/*.ts"],
        rules: {
            "lit/no-complex-attribute-binding": "off",
        },
    },

    // Override configuration for CLI files
    {
        files: ["cli/**/*.js"],
        rules: {
            "no-console": "off",
            quotes: "off",
            semi: "off",
        },
    },

    // Apply prettier config to disable conflicting rules
    prettierConfig,
];
