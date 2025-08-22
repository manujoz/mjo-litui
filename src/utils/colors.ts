/**
 * Color Utility Functions for mjo-litui
 *
 * This module provides comprehensive color conversion and manipulation utilities
 * supporting various color formats including HEX, RGB, RGBA, HSL, HSLA, and HWB.
 */

export type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "hwb";

export interface RGBColor {
    r: number;
    g: number;
    b: number;
}

export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

export interface HWBColor {
    h: number;
    w: number;
    b: number;
}

/**
 * Parse a hex color string to RGB values
 * @param hex - Hex color string (e.g., "#ff0000" or "ff0000")
 * @returns RGB color object
 */
export function parseHexToRgb(hex: string): RGBColor {
    const cleanHex = hex.replace("#", "");

    if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
        throw new Error(`Invalid hex color: ${hex}`);
    }

    return {
        r: parseInt(cleanHex.substring(0, 2), 16),
        g: parseInt(cleanHex.substring(2, 4), 16),
        b: parseInt(cleanHex.substring(4, 6), 16),
    };
}

/**
 * Convert RGB color to HSL
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HSL color object
 */
export function rgbToHsl(r: number, g: number, b: number): HSLColor {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert RGB color to HWB
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HWB color object
 */
export function rgbToHwb(r: number, g: number, b: number): HWBColor {
    const hsl = rgbToHsl(r, g, b);
    r /= 255;
    g /= 255;
    b /= 255;

    const w = Math.min(r, g, b) * 100;
    const bl = (1 - Math.max(r, g, b)) * 100;

    return { h: hsl.h, w: w, b: bl };
}

/**
 * Convert HSL to RGB
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns RGB color object
 */
export function hslToRgb(h: number, s: number, l: number): RGBColor {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    if (s === 0) {
        const gray = Math.round(l * 255);
        return { r: gray, g: gray, b: gray };
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return {
        r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, h) * 255),
        b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    };
}

/**
 * Convert HWB to RGB
 * @param h - Hue (0-360)
 * @param w - Whiteness (0-100)
 * @param b - Blackness (0-100)
 * @returns RGB color object
 */
export function hwbToRgb(h: number, w: number, b: number): RGBColor {
    w /= 100;
    b /= 100;

    if (w + b >= 1) {
        const gray = Math.round((w / (w + b)) * 255);
        return { r: gray, g: gray, b: gray };
    }

    const rgb = hslToRgb(h, 100, 50);

    return {
        r: Math.round(((rgb.r / 255) * (1 - w - b) + w) * 255),
        g: Math.round(((rgb.g / 255) * (1 - w - b) + w) * 255),
        b: Math.round(((rgb.b / 255) * (1 - w - b) + w) * 255),
    };
}

/**
 * Convert RGB values to hex string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string (e.g., "#ff0000")
 */
export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => {
        const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Parse RGB/RGBA string to RGB values
 * @param rgbString - RGB or RGBA string (e.g., "rgb(255, 0, 0)" or "rgba(255, 0, 0, 1)")
 * @returns RGB color object with optional alpha
 */
export function parseRgbString(rgbString: string): RGBColor & { a?: number } {
    const match = rgbString.match(/rgba?\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid RGB string: ${rgbString}`);
    }

    const values = match[1].split(",").map((v) => parseFloat(v.trim()));

    if (values.length < 3 || values.length > 4) {
        throw new Error(`Invalid RGB string: ${rgbString}`);
    }

    const result: RGBColor & { a?: number } = {
        r: values[0],
        g: values[1],
        b: values[2],
    };

    if (values.length === 4) {
        result.a = values[3];
    }

    return result;
}

/**
 * Parse HSL/HSLA string to HSL values
 * @param hslString - HSL or HSLA string (e.g., "hsl(0, 100%, 50%)" or "hsla(0, 100%, 50%, 1)")
 * @returns HSL color object with optional alpha
 */
export function parseHslString(hslString: string): HSLColor & { a?: number } {
    const match = hslString.match(/hsla?\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid HSL string: ${hslString}`);
    }

    const values = match[1].split(",").map((v, i) => {
        const trimmed = v.trim();
        if (i === 0) return parseFloat(trimmed); // Hue
        return parseFloat(trimmed.replace("%", "")); // Saturation, Lightness, Alpha
    });

    if (values.length < 3 || values.length > 4) {
        throw new Error(`Invalid HSL string: ${hslString}`);
    }

    const result: HSLColor & { a?: number } = {
        h: values[0],
        s: values[1],
        l: values[2],
    };

    if (values.length === 4) {
        result.a = values[3];
    }

    return result;
}

/**
 * Parse HWB string to HWB values
 * @param hwbString - HWB string (e.g., "hwb(0 0% 0%)")
 * @returns HWB color object
 */
export function parseHwbString(hwbString: string): HWBColor {
    const match = hwbString.match(/hwb\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid HWB string: ${hwbString}`);
    }

    const values = match[1].split(/\s+/).map((v, i) => {
        if (i === 0) return parseFloat(v); // Hue
        return parseFloat(v.replace("%", "")); // Whiteness, Blackness
    });

    if (values.length !== 3) {
        throw new Error(`Invalid HWB string: ${hwbString}`);
    }

    return {
        h: values[0],
        w: values[1],
        b: values[2],
    };
}

/**
 * Convert any supported color format to HEX
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns Hex color string
 */
export function toHex(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "hex":
            return color.startsWith("#") ? color : `#${color}`;
        case "rgb":
        case "rgba": {
            const rgb = parseRgbString(color);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        case "hsl":
        case "hsla": {
            const hsl = parseHslString(color);
            const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        case "hwb": {
            const hwb = parseHwbString(color);
            const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }
}

/**
 * Convert any supported color format to RGB
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns RGB color string
 */
export function toRgb(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "hex": {
            const rgb = parseHexToRgb(color);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        case "rgb":
            return color;
        case "rgba": {
            const rgb = parseRgbString(color);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        case "hsl":
        case "hsla": {
            const hsl = parseHslString(color);
            const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        case "hwb": {
            const hwb = parseHwbString(color);
            const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }
}

/**
 * Convert any supported color format to RGBA
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), defaults to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns RGBA color string
 */
export function toRgba(color: string, alpha: number = 1, sourceFormat?: ColorFormat): string {
    const rgbString = toRgb(color, sourceFormat);
    const rgb = parseRgbString(rgbString);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Convert any supported color format to HSL
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HSL color string
 */
export function toHsl(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let rgb: RGBColor;

    switch (sourceFormat) {
        case "hex":
            rgb = parseHexToRgb(color);
            break;
        case "rgb":
        case "rgba":
            rgb = parseRgbString(color);
            break;
        case "hsl":
            return color;
        case "hsla": {
            const hsl = parseHslString(color);
            return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
        }
        case "hwb": {
            const hwb = parseHwbString(color);
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}

/**
 * Convert any supported color format to HSLA
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), defaults to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HSLA color string
 */
export function toHsla(color: string, alpha: number = 1, sourceFormat?: ColorFormat): string {
    const hslString = toHsl(color, sourceFormat);
    const hsl = parseHslString(hslString);
    return `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${alpha})`;
}

/**
 * Convert any supported color format to HWB
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HWB color string
 */
export function toHwb(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let rgb: RGBColor;

    switch (sourceFormat) {
        case "hex":
            rgb = parseHexToRgb(color);
            break;
        case "rgb":
        case "rgba":
            rgb = parseRgbString(color);
            break;
        case "hsl":
        case "hsla": {
            const hsl = parseHslString(color);
            rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            break;
        }
        case "hwb":
            return color;
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
    return `hwb(${Math.round(hwb.h)} ${Math.round(hwb.w)}% ${Math.round(hwb.b)}%)`;
}

/**
 * Convert color from one format to another
 * @param color - Source color string
 * @param targetFormat - Target color format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @param alpha - Alpha value for formats that support it (0-1), defaults to 1
 * @returns Color string in target format
 */
export function convertColor(color: string, targetFormat: ColorFormat, sourceFormat?: ColorFormat, alpha?: number): string {
    switch (targetFormat) {
        case "hex":
            return toHex(color, sourceFormat);
        case "rgb":
            return toRgb(color, sourceFormat);
        case "rgba":
            return toRgba(color, alpha, sourceFormat);
        case "hsl":
            return toHsl(color, sourceFormat);
        case "hsla":
            return toHsla(color, alpha, sourceFormat);
        case "hwb":
            return toHwb(color, sourceFormat);
        default:
            throw new Error(`Unsupported target format: ${targetFormat}`);
    }
}

/**
 * Detect the format of a color string
 * @param color - Color string to analyze
 * @returns Detected color format
 */
export function detectColorFormat(color: string): ColorFormat {
    const trimmed = color.trim().toLowerCase();

    if (trimmed.startsWith("#") || /^[0-9a-f]{6}$/i.test(trimmed)) {
        return "hex";
    }
    if (trimmed.startsWith("rgb(")) {
        return "rgb";
    }
    if (trimmed.startsWith("rgba(")) {
        return "rgba";
    }
    if (trimmed.startsWith("hsl(")) {
        return "hsl";
    }
    if (trimmed.startsWith("hsla(")) {
        return "hsla";
    }
    if (trimmed.startsWith("hwb(")) {
        return "hwb";
    }

    throw new Error(`Cannot detect color format for: ${color}`);
}

/**
 * Check if a color string is valid
 * @param color - Color string to validate
 * @param format - Expected color format (optional, will auto-detect if not provided)
 * @returns True if valid, false otherwise
 */
export function isValidColor(color: string, format?: ColorFormat): boolean {
    try {
        if (!format) {
            format = detectColorFormat(color);
        }

        switch (format) {
            case "hex":
                parseHexToRgb(color);
                return true;
            case "rgb":
            case "rgba":
                parseRgbString(color);
                return true;
            case "hsl":
            case "hsla":
                parseHslString(color);
                return true;
            case "hwb":
                parseHwbString(color);
                return true;
            default:
                return false;
        }
    } catch {
        return false;
    }
}
