import { converter, formatHex, interpolate, samples } from "culori";
import { toRgbObject } from "../../utils/colors.js";

/**
 * Generates a color scale using OKLCH color space with proper interpolation
 * @param {string} baseColor - Base color in any supported format
 * @returns {Object} Color scale with steps 50-950 and alpha variants
 */
function generateColorScale(baseColor) {
    const toOklch = converter("oklch");

    // Convert base color to OKLCH
    const base = toOklch(baseColor);

    if (!base || typeof base.l !== "number" || typeof base.c !== "number") {
        throw new Error(`Invalid color: ${baseColor}`);
    }

    // Create colors for interpolation (light to dark)
    // Generate a very light version and a very dark version of the same hue/chroma
    const lightColor = {
        mode: "oklch",
        l: Math.min(0.98, base.l + 0.4), // Very light but not white
        c: base.c * 0.1, // Lower chroma for lighter colors
        h: base.h,
    };

    const darkColor = {
        mode: "oklch",
        l: Math.max(0.1, base.l - 0.6), // Very dark but not black
        c: base.c * 0.8, // Maintain more chroma in darks
        h: base.h,
    };

    // Create interpolator from light to dark in OKLCH space
    const interpolator = interpolate([lightColor, base, darkColor], "oklch");

    // Generate 11 evenly spaced samples (50, 100, ..., 950)
    const colorSamples = samples(11).map(interpolator);

    // Map samples to scale steps
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const scale = {
        default: formatHex(base),
    };

    // Assign samples to scale steps
    steps.forEach((step, index) => {
        scale[step] = formatHex(colorSamples[index]);
    });

    // Generate alpha variants (0-9 with 11% increments)
    for (let i = 0; i <= 9; i++) {
        const alpha = (i * 11).toString(16).padStart(2, "0");
        const baseHex = formatHex(base);
        scale[`alpha${i}`] = `${baseHex}${alpha}`;
    }

    // Generate hover variant (slightly darker using interpolation)
    const hoverInterpolator = interpolate([base, darkColor], "oklch");
    scale.hover = formatHex(hoverInterpolator(0.15)); // 15% towards darker

    return scale;
}

/**
 * Calculate appropriate foreground color for a given background
 * @param {string} backgroundColor - Background color
 * @returns {string} Either "#ffffff" or "#000000" for optimal contrast
 */
function calculateForegroundColor(backgroundColor) {
    try {
        // Convert to RGB to calculate luminance
        const rgb = toRgbObject(backgroundColor);

        // Calculate relative luminance using sRGB formula
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

        // Return white for dark colors, black for light colors
        return luminance > 0.5 ? "#000000" : "#ffffff";
    } catch (error) {
        // Default to white if calculation fails
        return "#ffffff";
    }
}

/**
 * Format a color to hexadecimal format
 * @param {string|Object} color - Color to format (any valid CSS color)
 * @returns {string} Formatted color string in hexadecimal format
 */
function formatColor(color) {
    // Always convert to hex format using culori
    const toOklch = converter("oklch");
    const oklchColor = toOklch(color);

    if (!oklchColor) {
        throw new Error(`Invalid color: ${color}`);
    }

    // Convert the OKLCH color back to hex
    return formatHex(oklchColor);
}

/**
 * Validate if a color string is valid
 * @param {string} color - Color string to validate
 * @returns {boolean} True if valid
 */
function isValidColor(color) {
    try {
        const toOklch = converter("oklch");
        const result = toOklch(color);
        return result && typeof result.l === "number" && typeof result.c === "number";
    } catch {
        return false;
    }
}

export { calculateForegroundColor, formatColor, generateColorScale, isValidColor };
