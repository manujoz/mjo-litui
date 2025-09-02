import { Command } from "commander";
import fs from "fs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import { calculateForegroundColor, formatColor, generateColorScale } from "../utils/color-generator.js";
import { formatBytes, minifyStandaloneCSS } from "../utils/css-minifier.js";
import { promptForThemeConfig } from "../utils/prompts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createTheme() {
    console.log("🎨 Welcome to mjo-litui theme creator!");
    console.log("");

    try {
        // Get user input for theme colors and options
        const answers = await promptForThemeConfig();

        console.log("");
        console.log("⚙️  Generating color scales and calculating contrasts...");

        // Convert all input colors to hexadecimal format
        const primaryColorHex = formatColor(answers.primaryColor);
        const secondaryColorHex = formatColor(answers.secondaryColor);
        const successColorHex = formatColor(answers.successColor);
        const errorColorHex = formatColor(answers.errorColor);
        const warningColorHex = formatColor(answers.warningColor);
        const infoColorHex = formatColor(answers.infoColor);

        // Generate color scales for primary and secondary colors
        const primaryScale = generateColorScale(primaryColorHex);
        const secondaryScale = generateColorScale(secondaryColorHex);

        // Calculate foreground colors for all theme colors
        const primaryForeground = calculateForegroundColor(primaryColorHex);
        const secondaryForeground = calculateForegroundColor(secondaryColorHex);
        const successForeground = calculateForegroundColor(successColorHex);
        const errorForeground = calculateForegroundColor(errorColorHex);
        const warningForeground = calculateForegroundColor(warningColorHex);
        const infoForeground = calculateForegroundColor(infoColorHex);

        // Create hover colors (slightly darker)
        const primaryHover = primaryScale.hover || primaryScale[600] || primaryColorHex;
        const secondaryHover = secondaryScale.hover || secondaryScale[600] || secondaryColorHex;

        // Read the CSS template
        const templatePath = join(__dirname, "../templates/theme.css.template");
        let cssTemplate = fs.readFileSync(templatePath, "utf8");

        // Replace template variables with actual values
        const replacements = {
            // Main theme colors
            PRIMARY_COLOR: primaryColorHex,
            PRIMARY_FOREGROUND: primaryForeground,
            PRIMARY_HOVER: primaryHover,
            SECONDARY_COLOR: secondaryColorHex,
            SECONDARY_FOREGROUND: secondaryForeground,
            SECONDARY_HOVER: secondaryHover,
            SUCCESS_COLOR: successColorHex,
            SUCCESS_FOREGROUND: successForeground,
            ERROR_COLOR: errorColorHex,
            ERROR_FOREGROUND: errorForeground,
            WARNING_COLOR: warningColorHex,
            WARNING_FOREGROUND: warningForeground,
            INFO_COLOR: infoColorHex,
            INFO_FOREGROUND: infoForeground,

            // Primary color scale
            PRIMARY_50: primaryScale[50] || primaryColorHex,
            PRIMARY_100: primaryScale[100] || primaryColorHex,
            PRIMARY_200: primaryScale[200] || primaryColorHex,
            PRIMARY_300: primaryScale[300] || primaryColorHex,
            PRIMARY_400: primaryScale[400] || primaryColorHex,
            PRIMARY_500: primaryScale[500] || primaryColorHex,
            PRIMARY_600: primaryScale[600] || primaryColorHex,
            PRIMARY_700: primaryScale[700] || primaryColorHex,
            PRIMARY_800: primaryScale[800] || primaryColorHex,
            PRIMARY_900: primaryScale[900] || primaryColorHex,
            PRIMARY_950: primaryScale[950] || primaryColorHex,

            // Primary alpha colors
            PRIMARY_ALPHA0: primaryScale.alpha0 || primaryColorHex + "00",
            PRIMARY_ALPHA1: primaryScale.alpha1 || primaryColorHex + "11",
            PRIMARY_ALPHA2: primaryScale.alpha2 || primaryColorHex + "22",
            PRIMARY_ALPHA3: primaryScale.alpha3 || primaryColorHex + "33",
            PRIMARY_ALPHA4: primaryScale.alpha4 || primaryColorHex + "44",
            PRIMARY_ALPHA5: primaryScale.alpha5 || primaryColorHex + "55",
            PRIMARY_ALPHA6: primaryScale.alpha6 || primaryColorHex + "66",
            PRIMARY_ALPHA7: primaryScale.alpha7 || primaryColorHex + "77",
            PRIMARY_ALPHA8: primaryScale.alpha8 || primaryColorHex + "88",
            PRIMARY_ALPHA9: primaryScale.alpha9 || primaryColorHex + "99",

            // Secondary color scale
            SECONDARY_50: secondaryScale[50] || secondaryColorHex,
            SECONDARY_100: secondaryScale[100] || secondaryColorHex,
            SECONDARY_200: secondaryScale[200] || secondaryColorHex,
            SECONDARY_300: secondaryScale[300] || secondaryColorHex,
            SECONDARY_400: secondaryScale[400] || secondaryColorHex,
            SECONDARY_500: secondaryScale[500] || secondaryColorHex,
            SECONDARY_600: secondaryScale[600] || secondaryColorHex,
            SECONDARY_700: secondaryScale[700] || secondaryColorHex,
            SECONDARY_800: secondaryScale[800] || secondaryColorHex,
            SECONDARY_900: secondaryScale[900] || secondaryColorHex,
            SECONDARY_950: secondaryScale[950] || secondaryColorHex,

            // Secondary alpha colors
            SECONDARY_ALPHA0: secondaryScale.alpha0 || secondaryColorHex + "00",
            SECONDARY_ALPHA1: secondaryScale.alpha1 || secondaryColorHex + "11",
            SECONDARY_ALPHA2: secondaryScale.alpha2 || secondaryColorHex + "22",
            SECONDARY_ALPHA3: secondaryScale.alpha3 || secondaryColorHex + "33",
            SECONDARY_ALPHA4: secondaryScale.alpha4 || secondaryColorHex + "44",
            SECONDARY_ALPHA5: secondaryScale.alpha5 || secondaryColorHex + "55",
            SECONDARY_ALPHA6: secondaryScale.alpha6 || secondaryColorHex + "66",
            SECONDARY_ALPHA7: secondaryScale.alpha7 || secondaryColorHex + "77",
            SECONDARY_ALPHA8: secondaryScale.alpha8 || secondaryColorHex + "88",
            SECONDARY_ALPHA9: secondaryScale.alpha9 || secondaryColorHex + "99",
        };

        // Perform template replacements
        Object.entries(replacements).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, "g");
            cssTemplate = cssTemplate.replace(regex, value);
        });

        // Apply CSS minification if requested
        let finalCSS = cssTemplate;
        let minificationInfo = null;

        if (answers.minifyOutput) {
            console.log("🗜️  Minifying CSS output...");
            const minificationResult = minifyStandaloneCSS(cssTemplate);
            finalCSS = minificationResult.content;
            minificationInfo = minificationResult;
        }

        // Use the installLocation from prompts
        const outputPath = answers.installLocation;

        // Ensure directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write the CSS file
        fs.writeFileSync(outputPath, finalCSS, "utf8");

        console.log("");
        console.log("✅ Theme created successfully!");
        console.log(`📁 File saved to: ${outputPath}`);

        // Show minification info if applied
        if (minificationInfo && minificationInfo.saved > 0) {
            console.log(`🗜️  CSS minified: saved ${formatBytes(minificationInfo.saved)}`);
        }
        console.log("");
        console.log("🚀 To use your custom theme:");
        console.log("   1. Import the CSS file in your project");
        console.log("   2. Apply the theme to your mjo-theme component");
        console.log("   3. Enjoy your custom color scheme!");
        console.log("");
        console.log("💡 Example usage:");
        console.log('   <link rel="stylesheet" href="./mjo-theme.css">');
        console.log("   <mjo-theme>");
        console.log("     <your-app></your-app>");
        console.log("   </mjo-theme>");
    } catch (error) {
        console.error("❌ Error creating theme:", error.message);
        process.exit(1);
    }
}

// Create and export the command
const createThemeCommand = new Command("create-theme").description("Create a custom theme CSS file with personalized colors").action(createTheme);

export { createTheme, createThemeCommand };
