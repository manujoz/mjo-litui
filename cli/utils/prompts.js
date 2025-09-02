import inquirer from "inquirer";
import path from "path";
import { isValidColor } from "./color-generator.js";

/**
 * Prompts for theme configuration
 * @returns {Promise<Object>} Theme configuration object
 */
async function promptForThemeConfig() {
    console.log("🎨 Welcome to mjo-litui theme generator!");
    console.log("Configure your custom theme colors (press Enter to use defaults):\n");

    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "installLocation",
            message: "📁 Install location (where to save the CSS file):",
            default: "./mjo-theme.css",
            validate: (input) => {
                if (!input.trim()) return "Please provide a valid file path";
                if (!input.endsWith(".css")) return "File must have .css extension";
                return true;
            },
            filter: (input) => {
                // Resolve relative paths
                if (!path.isAbsolute(input)) {
                    return path.resolve(process.cwd(), input);
                }
                return input;
            },
        },
        {
            type: "input",
            name: "primaryColor",
            message: "🔵 Primary color:",
            default: "#1aa8ed",
            validate: validateColor,
        },
        {
            type: "input",
            name: "secondaryColor",
            message: "🟢 Secondary color:",
            default: "#7dc717",
            validate: validateColor,
        },
        {
            type: "input",
            name: "successColor",
            message: "✅ Success color:",
            default: "#4caf50",
            validate: validateColor,
        },
        {
            type: "input",
            name: "infoColor",
            message: "ℹ️  Info color:",
            default: "#128ada",
            validate: validateColor,
        },
        {
            type: "input",
            name: "warningColor",
            message: "⚠️  Warning color:",
            default: "#ff9800",
            validate: validateColor,
        },
        {
            type: "input",
            name: "errorColor",
            message: "❌ Error color:",
            default: "#f44336",
            validate: validateColor,
        },
        {
            type: "confirm",
            name: "minifyOutput",
            message: "🗜️  Minify CSS output?",
            default: false,
        },
    ]);

    return answers;
}

/**
 * Validates if a color string is valid
 * @param {string} input - Color string to validate
 * @returns {boolean|string} True if valid, error message if not
 */
function validateColor(input) {
    if (!input.trim()) return "Please provide a color value";

    const trimmed = input.trim();
    if (isValidColor(trimmed)) {
        return true;
    }

    return "Please provide a valid color (hex, rgb, hsl, etc.)";
}

/**
 * Shows a summary of the configuration
 * @param {Object} config - Theme configuration
 */
function showConfigSummary(config) {
    console.log("\n📋 Theme Configuration Summary:");
    console.log("================================");
    console.log(`📁 Install Location: ${config.installLocation}`);
    console.log(`🔵 Primary Color: ${config.primaryColor}`);
    console.log(`🟢 Secondary Color: ${config.secondaryColor}`);
    console.log(`✅ Success Color: ${config.successColor}`);
    console.log(`ℹ️  Info Color: ${config.infoColor}`);
    console.log(`⚠️  Warning Color: ${config.warningColor}`);
    console.log(`❌ Error Color: ${config.errorColor}`);
    console.log(`🗜️  Minify Output: ${config.minifyOutput ? "Yes" : "No"}`);
    console.log("================================\n");
}

export { promptForThemeConfig, showConfigSummary };
