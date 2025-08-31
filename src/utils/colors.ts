/**
 * Color Utility Functions for mjo-litui
 *
 * This module provides comprehensive color conversion and manipulation utilities
 * supporting various color formats including HEX, RGB, RGBA, HSL, HSLA, and HWB.
 */

export type ColorFormat = "hex" | "hexalpha" | "rgb" | "rgba" | "hsl" | "hsla" | "hwb" | "hwba" | "oklch" | "lab" | "lch" | "oklab";

export interface RGBColor {
    r: number;
    g: number;
    b: number;
}

export interface RGBAColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

export interface HSLAColor {
    h: number;
    s: number;
    l: number;
    a: number;
}

export interface HWBColor {
    h: number;
    w: number;
    b: number;
}

export interface HWBAColor {
    h: number;
    w: number;
    b: number;
    a: number;
}

export interface OKLCHColor {
    l: number; // Lightness (0-1)
    c: number; // Chroma (0-0.4+)
    h: number; // Hue (0-360)
}

export interface LABColor {
    l: number; // Lightness (0-100)
    a: number; // Green-Red (-128 to 127)
    b: number; // Blue-Yellow (-128 to 127)
}

export interface LCHColor {
    l: number; // Lightness (0-100)
    c: number; // Chroma (0-150+)
    h: number; // Hue (0-360)
}

export interface OKLABColor {
    l: number; // Lightness (0-1)
    a: number; // Green-Red (-0.4 to 0.4)
    b: number; // Blue-Yellow (-0.4 to 0.4)
}

/**
 * Parse a hex color string to RGB values
 * @param hex - Hex color string (e.g., "#ff0000" or "ff0000")
 * @returns RGB color object
 */
function parseHexToRgb(hex: string): RGBColor {
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
 * Parse a hex color string with alpha to RGBA values
 * @param hex - Hex color string with alpha (e.g., "#ff000080" or "ff000080")
 * @returns RGBA color object
 */
function parseHexAlphaToRgba(hex: string): RGBAColor {
    const cleanHex = hex.replace("#", "");

    if (!/^[0-9a-fA-F]{8}$/.test(cleanHex)) {
        throw new Error(`Invalid hex alpha color: ${hex}`);
    }

    return {
        r: parseInt(cleanHex.substring(0, 2), 16),
        g: parseInt(cleanHex.substring(2, 4), 16),
        b: parseInt(cleanHex.substring(4, 6), 16),
        a: parseInt(cleanHex.substring(6, 8), 16) / 255,
    };
}

/**
 * Convert RGB color to HSL
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HSL color object
 */
function rgbToHsl(r: number, g: number, b: number): HSLColor {
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
function rgbToHwb(r: number, g: number, b: number): HWBColor {
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
function hslToRgb(h: number, s: number, l: number): RGBColor {
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
function hwbToRgb(h: number, w: number, b: number): RGBColor {
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
function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => {
        const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGBA values to hex string with alpha
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @param a - Alpha value (0-1)
 * @returns Hex color string with alpha (e.g., "#ff000080")
 */
function rgbaToHexAlpha(r: number, g: number, b: number, a: number): string {
    const toHex = (n: number) => {
        const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    const alphaHex = toHex(a * 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
}

/**
 * Convert RGB to XYZ color space (D65 illuminant)
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns XYZ color values
 */
function rgbToXyz(r: number, g: number, b: number): { x: number; y: number; z: number } {
    // Normalize to 0-1
    r = r / 255;
    g = g / 255;
    b = b / 255;

    // Apply gamma correction
    const gammaCorrect = (c: number) => (c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92);

    r = gammaCorrect(r);
    g = gammaCorrect(g);
    b = gammaCorrect(b);

    // Convert to XYZ using sRGB matrix
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

    return { x: x * 100, y: y * 100, z: z * 100 };
}

/**
 * Convert XYZ to RGB color space (D65 illuminant)
 * @param x - X value (0-100)
 * @param y - Y value (0-100)
 * @param z - Z value (0-100)
 * @returns RGB color values
 */
function xyzToRgb(x: number, y: number, z: number): RGBColor {
    // Normalize
    x = x / 100;
    y = y / 100;
    z = z / 100;

    // Convert using inverse sRGB matrix
    let r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
    let g = x * -0.969266 + y * 1.8760108 + z * 0.041556;
    let b = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

    // Apply inverse gamma correction
    const invGammaCorrect = (c: number) => (c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c);

    r = invGammaCorrect(r);
    g = invGammaCorrect(g);
    b = invGammaCorrect(b);

    return {
        r: Math.round(Math.max(0, Math.min(255, r * 255))),
        g: Math.round(Math.max(0, Math.min(255, g * 255))),
        b: Math.round(Math.max(0, Math.min(255, b * 255))),
    };
}

/**
 * Convert RGB to LAB color space
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns LAB color object
 */
function rgbToLab(r: number, g: number, b: number): LABColor {
    const xyz = rgbToXyz(r, g, b);

    // D65 white point
    const xn = 95.047;
    const yn = 100;
    const zn = 108.883;

    const x = xyz.x / xn;
    const y = xyz.y / yn;
    const z = xyz.z / zn;

    const fx = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    const fy = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    const fz = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const bValue = 200 * (fy - fz);

    return { l, a, b: bValue };
}

/**
 * Convert LAB to RGB color space
 * @param l - Lightness (0-100)
 * @param a - Green-Red (-128 to 127)
 * @param b - Blue-Yellow (-128 to 127)
 * @returns RGB color object
 */
function labToRgb(l: number, a: number, b: number): RGBColor {
    let y = (l + 16) / 116;
    let x = a / 500 + y;
    let z = y - b / 200;

    const fy = y > 0.206893 ? Math.pow(y, 3) : (y - 16 / 116) / 7.787;
    const fx = x > 0.206893 ? Math.pow(x, 3) : (x - 16 / 116) / 7.787;
    const fz = z > 0.206893 ? Math.pow(z, 3) : (z - 16 / 116) / 7.787;

    // D65 white point
    const xn = 95.047;
    const yn = 100;
    const zn = 108.883;

    x = fx * xn;
    y = fy * yn;
    z = fz * zn;

    return xyzToRgb(x, y, z);
}

/**
 * Convert LAB to LCH color space
 * @param l - Lightness (0-100)
 * @param a - Green-Red (-128 to 127)
 * @param b - Blue-Yellow (-128 to 127)
 * @returns LCH color object
 */
function labToLch(l: number, a: number, b: number): LCHColor {
    const c = Math.sqrt(a * a + b * b);
    let h = (Math.atan2(b, a) * 180) / Math.PI;
    if (h < 0) h += 360;

    return { l, c, h };
}

/**
 * Convert LCH to LAB color space
 * @param l - Lightness (0-100)
 * @param c - Chroma (0-150+)
 * @param h - Hue (0-360)
 * @returns LAB color object
 */
function lchToLab(l: number, c: number, h: number): LABColor {
    const hRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);

    return { l, a, b };
}

/**
 * Convert RGB to linear RGB (remove gamma correction)
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Linear RGB values (0-1)
 */
function rgbToLinearRgb(r: number, g: number, b: number): { r: number; g: number; b: number } {
    const toLinear = (c: number) => {
        c = c / 255;
        return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
    };

    return {
        r: toLinear(r),
        g: toLinear(g),
        b: toLinear(b),
    };
}

/**
 * Convert linear RGB to RGB (apply gamma correction)
 * @param r - Linear red value (0-1)
 * @param g - Linear green value (0-1)
 * @param b - Linear blue value (0-1)
 * @returns RGB values (0-255)
 */
function linearRgbToRgb(r: number, g: number, b: number): RGBColor {
    const fromLinear = (c: number) => {
        const gamma = c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
        return Math.round(Math.max(0, Math.min(255, gamma * 255)));
    };

    return {
        r: fromLinear(r),
        g: fromLinear(g),
        b: fromLinear(b),
    };
}

/**
 * Convert RGB to OKLAB color space
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns OKLAB color object
 */
function rgbToOklab(r: number, g: number, b: number): OKLABColor {
    const linear = rgbToLinearRgb(r, g, b);

    // Convert to OKLab using the matrix transformation
    const l = 0.4122214708 * linear.r + 0.5363325363 * linear.g + 0.0514459929 * linear.b;
    const m = 0.2119034982 * linear.r + 0.6806995451 * linear.g + 0.1073969566 * linear.b;
    const s = 0.0883024619 * linear.r + 0.2817188376 * linear.g + 0.6299787005 * linear.b;

    const lCubeRoot = Math.cbrt(l);
    const mCubeRoot = Math.cbrt(m);
    const sCubeRoot = Math.cbrt(s);

    return {
        l: 0.2104542553 * lCubeRoot + 0.793617785 * mCubeRoot - 0.0040720468 * sCubeRoot,
        a: 1.9779984951 * lCubeRoot - 2.428592205 * mCubeRoot + 0.4505937099 * sCubeRoot,
        b: 0.0259040371 * lCubeRoot + 0.7827717662 * mCubeRoot - 0.808675766 * sCubeRoot,
    };
}

/**
 * Convert OKLAB to RGB color space
 * @param l - Lightness (0-1)
 * @param a - Green-Red (-0.4 to 0.4)
 * @param b - Blue-Yellow (-0.4 to 0.4)
 * @returns RGB color object
 */
function oklabToRgb(l: number, a: number, b: number): RGBColor {
    const lCubeRoot = l + 0.3963377774 * a + 0.2158037573 * b;
    const mCubeRoot = l - 0.1055613458 * a - 0.0638541728 * b;
    const sCubeRoot = l - 0.0894841775 * a - 1.291485548 * b;

    const lLinear = lCubeRoot * lCubeRoot * lCubeRoot;
    const mLinear = mCubeRoot * mCubeRoot * mCubeRoot;
    const sLinear = sCubeRoot * sCubeRoot * sCubeRoot;

    const linear = {
        r: 4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear,
        g: -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear,
        b: -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear,
    };

    return linearRgbToRgb(linear.r, linear.g, linear.b);
}

/**
 * Convert OKLAB to OKLCH color space
 * @param l - Lightness (0-1)
 * @param a - Green-Red (-0.4 to 0.4)
 * @param b - Blue-Yellow (-0.4 to 0.4)
 * @returns OKLCH color object
 */
function oklabToOklch(l: number, a: number, b: number): OKLCHColor {
    const c = Math.sqrt(a * a + b * b);
    let h = (Math.atan2(b, a) * 180) / Math.PI;
    if (h < 0) h += 360;

    return { l, c, h };
}

/**
 * Convert OKLCH to OKLAB color space
 * @param l - Lightness (0-1)
 * @param c - Chroma (0-0.4+)
 * @param h - Hue (0-360)
 * @returns OKLAB color object
 */
function oklchToOklab(l: number, c: number, h: number): OKLABColor {
    const hRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);

    return { l, a, b };
}

/**
 * Parse RGB/RGBA string to RGB values
 * @param rgbString - RGB or RGBA string (e.g., "rgb(255, 0, 0)" or "rgba(255, 0, 0, 1)")
 * @returns RGB color object with optional alpha
 */
function parseRgbString(rgbString: string): RGBColor & { a?: number } {
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
function parseHslString(hslString: string): HSLColor & { a?: number } {
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
function parseHwbString(hwbString: string): HWBColor {
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
 * Parse HWBA string to HWBA values
 * @param hwbaString - HWBA string (e.g., "hwba(0, 0%, 0%, 0.5)" or "hwba(0 0% 0% / 0.5)")
 * @returns HWBA color object
 */
function parseHwbaString(hwbaString: string): HWBAColor {
    const match = hwbaString.match(/hwba\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid HWBA string: ${hwbaString}`);
    }

    const content = match[1].trim();
    let h: number, w: number, b: number, a: number;

    // Handle format with slash: "hwba(h w% b% / a)"
    if (content.includes("/")) {
        const parts = content.split("/");
        const hwbPart = parts[0].trim();
        const alphaPart = parts[1] ? parts[1].trim() : "1";

        const values = hwbPart.split(/\s+/).map((v, i) => {
            if (i === 0) return parseFloat(v); // Hue
            return parseFloat(v.replace("%", "")); // Whiteness, Blackness
        });

        if (values.length !== 3) {
            throw new Error(`Invalid HWBA string: ${hwbaString}`);
        }

        h = values[0];
        w = values[1];
        b = values[2];
        a = parseFloat(alphaPart);
    } else {
        // Handle comma-separated format: "hwba(h, w%, b%, a)"
        const values = content.split(",").map((v) => v.trim());

        if (values.length !== 4) {
            throw new Error(`Invalid HWBA string: ${hwbaString}`);
        }

        h = parseFloat(values[0]);
        w = parseFloat(values[1].replace("%", ""));
        b = parseFloat(values[2].replace("%", ""));
        a = parseFloat(values[3]);
    }

    // Validate ranges
    if (h < 0 || h > 360 || w < 0 || w > 100 || b < 0 || b > 100 || a < 0 || a > 1) {
        throw new Error(`Invalid HWBA string: ${hwbaString}`);
    }

    return { h, w, b, a };
}

/**
 * Parse OKLCH string to OKLCH values
 * @param oklchString - OKLCH string (e.g., "oklch(0.7 0.15 180)")
 * @returns OKLCH color object
 */
function parseOklchString(oklchString: string): OKLCHColor {
    const match = oklchString.match(/oklch\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid OKLCH string: ${oklchString}`);
    }

    const values = match[1].split(/\s+/).map((v) => parseFloat(v));

    if (values.length !== 3) {
        throw new Error(`Invalid OKLCH string: ${oklchString}`);
    }

    return {
        l: values[0],
        c: values[1],
        h: values[2],
    };
}

/**
 * Parse LAB string to LAB values
 * @param labString - LAB string (e.g., "lab(70 20 -30)")
 * @returns LAB color object
 */
function parseLabString(labString: string): LABColor {
    const match = labString.match(/lab\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid LAB string: ${labString}`);
    }

    const values = match[1].split(/\s+/).map((v) => parseFloat(v));

    if (values.length !== 3) {
        throw new Error(`Invalid LAB string: ${labString}`);
    }

    return {
        l: values[0],
        a: values[1],
        b: values[2],
    };
}

/**
 * Parse LCH string to LCH values
 * @param lchString - LCH string (e.g., "lch(70 40 180)")
 * @returns LCH color object
 */
function parseLchString(lchString: string): LCHColor {
    const match = lchString.match(/lch\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid LCH string: ${lchString}`);
    }

    const values = match[1].split(/\s+/).map((v) => parseFloat(v));

    if (values.length !== 3) {
        throw new Error(`Invalid LCH string: ${lchString}`);
    }

    return {
        l: values[0],
        c: values[1],
        h: values[2],
    };
}

/**
 * Parse OKLAB string to OKLAB values
 * @param oklabString - OKLAB string (e.g., "oklab(0.7 0.1 -0.1)")
 * @returns OKLAB color object
 */
function parseOklabString(oklabString: string): OKLABColor {
    const match = oklabString.match(/oklab\(([^)]+)\)/);
    if (!match) {
        throw new Error(`Invalid OKLAB string: ${oklabString}`);
    }

    const values = match[1].split(/\s+/).map((v) => parseFloat(v));

    if (values.length !== 3) {
        throw new Error(`Invalid OKLAB string: ${oklabString}`);
    }

    return {
        l: values[0],
        a: values[1],
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
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            return rgbToHex(rgba.r, rgba.g, rgba.b);
        }
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
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        case "lab": {
            const lab = parseLabString(color);
            const rgb = labToRgb(lab.l, lab.a, lab.b);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            const rgb = labToRgb(lab.l, lab.a, lab.b);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }
}

/**
 * Convert any supported color format to hex with alpha
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), optional. If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns Hex color string with alpha
 */
export function toHexAlpha(color: string, alpha?: number, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let rgb: RGBColor;
    let finalAlpha = alpha !== undefined ? alpha : 1;

    switch (sourceFormat) {
        case "hex":
            rgb = parseHexToRgb(color);
            break;
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            rgb = rgba;
            if (alpha === undefined) finalAlpha = rgba.a;
            break;
        }
        case "rgb":
            rgb = parseRgbString(color);
            break;
        case "rgba": {
            const rgba = parseRgbString(color);
            rgb = rgba;
            if (alpha === undefined && rgba.a !== undefined) finalAlpha = rgba.a;
            break;
        }
        case "hsl":
        case "hsla": {
            const hsl = parseHslString(color);
            rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            if (alpha === undefined && hsl.a !== undefined) finalAlpha = hsl.a;
            break;
        }
        case "hwb": {
            const hwb = parseHwbString(color);
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            if (alpha === undefined) finalAlpha = hwba.a;
            break;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        case "lab": {
            const lab = parseLabString(color);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    return rgbaToHexAlpha(rgb.r, rgb.g, rgb.b, finalAlpha);
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
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
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
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        case "lab": {
            const lab = parseLabString(color);
            const rgb = labToRgb(lab.l, lab.a, lab.b);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            const rgb = labToRgb(lab.l, lab.a, lab.b);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }
}

/**
 * Convert any supported color format to RGBA
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), optional. If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns RGBA color string
 */
export function toRgba(color: string, alpha?: number, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let finalAlpha = alpha !== undefined ? alpha : 1;
    let rgb: RGBColor;

    switch (sourceFormat) {
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            rgb = rgba;
            if (alpha === undefined) finalAlpha = rgba.a;
            break;
        }
        case "rgba": {
            const rgba = parseRgbString(color);
            rgb = rgba;
            if (alpha === undefined && rgba.a !== undefined) finalAlpha = rgba.a;
            break;
        }
        case "hsla": {
            const hsla = parseHslString(color);
            rgb = hslToRgb(hsla.h, hsla.s, hsla.l);
            if (alpha === undefined && hsla.a !== undefined) finalAlpha = hsla.a;
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            rgb = hwbToRgb(hwba.h, hwba.w, hwba.b);
            if (alpha === undefined) finalAlpha = hwba.a;
            break;
        }
        default: {
            const rgbString = toRgb(color, sourceFormat);
            rgb = parseRgbString(rgbString);
            break;
        }
    }

    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${finalAlpha})`;
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
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            rgb = rgba;
            break;
        }
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
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        case "lab": {
            const lab = parseLabString(color);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
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
 * @param alpha - Alpha value (0-1), optional. If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HSLA color string
 */
export function toHsla(color: string, alpha?: number, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let finalAlpha = alpha !== undefined ? alpha : 1;
    let hsl: HSLColor;

    switch (sourceFormat) {
        case "hsla": {
            const hsla = parseHslString(color);
            hsl = hsla;
            if (alpha === undefined && hsla.a !== undefined) finalAlpha = hsla.a;
            break;
        }
        case "rgba": {
            const rgba = parseRgbString(color);
            hsl = rgbToHsl(rgba.r, rgba.g, rgba.b);
            if (alpha === undefined && rgba.a !== undefined) finalAlpha = rgba.a;
            break;
        }
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            hsl = rgbToHsl(rgba.r, rgba.g, rgba.b);
            if (alpha === undefined) finalAlpha = rgba.a;
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const rgb = hwbToRgb(hwba.h, hwba.w, hwba.b);
            hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            if (alpha === undefined) finalAlpha = hwba.a;
            break;
        }
        default: {
            const hslString = toHsl(color, sourceFormat);
            hsl = parseHslString(hslString);
            break;
        }
    }

    return `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${finalAlpha})`;
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
        case "hexalpha":
            rgb = parseHexAlphaToRgba(color);
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
        case "hwba": {
            const hwba = parseHwbaString(color);
            return `hwb(${Math.round(hwba.h)} ${Math.round(hwba.w)}% ${Math.round(hwba.b)}%)`;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        case "lab": {
            const lab = parseLabString(color);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
    return `hwb(${Math.round(hwb.h)} ${Math.round(hwb.w)}% ${Math.round(hwb.b)}%)`;
}

/**
 * Convert any supported color format to HWBA (HWB with alpha)
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), optional. If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HWBA color string
 */
export function toHwba(color: string, alpha?: number, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let rgb: RGBColor;
    let finalAlpha = alpha !== undefined ? alpha : 1;

    switch (sourceFormat) {
        case "hex":
            rgb = parseHexToRgb(color);
            break;
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            rgb = rgba;
            if (alpha === undefined) finalAlpha = rgba.a;
            break;
        }
        case "rgb":
            rgb = parseRgbString(color);
            break;
        case "rgba": {
            const rgba = parseRgbString(color);
            rgb = rgba;
            if (alpha === undefined && rgba.a !== undefined) finalAlpha = rgba.a;
            break;
        }
        case "hsl":
        case "hsla": {
            const hsl = parseHslString(color);
            rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            if (alpha === undefined && hsl.a !== undefined) finalAlpha = hsl.a;
            break;
        }
        case "hwb": {
            const hwb = parseHwbString(color);
            return `hwba(${Math.round(hwb.h)}, ${Math.round(hwb.w)}%, ${Math.round(hwb.b)}%, ${finalAlpha})`;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            if (alpha === undefined) finalAlpha = hwba.a;
            return `hwba(${Math.round(hwba.h)}, ${Math.round(hwba.w)}%, ${Math.round(hwba.b)}%, ${finalAlpha})`;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        case "lab": {
            const lab = parseLabString(color);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
    return `hwba(${Math.round(hwb.h)}, ${Math.round(hwb.w)}%, ${Math.round(hwb.b)}%, ${finalAlpha})`;
}

/**
 * Convert any supported color format to OKLCH
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns OKLCH color string
 */
export function toOklch(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let rgb: RGBColor;

    switch (sourceFormat) {
        case "hex":
            rgb = parseHexToRgb(color);
            break;
        case "hexalpha":
            rgb = parseHexAlphaToRgba(color);
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
        case "hwb": {
            const hwb = parseHwbString(color);
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "oklch":
            return color;
        case "lab": {
            const lab = parseLabString(color);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            const oklch = oklabToOklch(oklab.l, oklab.a, oklab.b);
            return `oklch(${oklch.l.toFixed(4)} ${oklch.c.toFixed(4)} ${Math.round(oklch.h)})`;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const oklab = rgbToOklab(rgb.r, rgb.g, rgb.b);
    const oklch = oklabToOklch(oklab.l, oklab.a, oklab.b);
    return `oklch(${oklch.l.toFixed(4)} ${oklch.c.toFixed(4)} ${Math.round(oklch.h)})`;
}

/**
 * Convert any supported color format to LAB
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns LAB color string
 */
export function toLab(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let rgb: RGBColor;

    switch (sourceFormat) {
        case "hex":
            rgb = parseHexToRgb(color);
            break;
        case "hexalpha":
            rgb = parseHexAlphaToRgba(color);
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
        case "hwb": {
            const hwb = parseHwbString(color);
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        case "lab":
            return color;
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            return `lab(${Math.round(lab.l)} ${Math.round(lab.a)} ${Math.round(lab.b)})`;
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            break;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
    return `lab(${Math.round(lab.l)} ${Math.round(lab.a)} ${Math.round(lab.b)})`;
}

/**
 * Convert any supported color format to LCH
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns LCH color string
 */
export function toLch(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let lab: LABColor;

    switch (sourceFormat) {
        case "hex": {
            const rgb = parseHexToRgb(color);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        case "hexalpha": {
            const rgb = parseHexAlphaToRgba(color);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        case "rgb":
        case "rgba": {
            const rgb = parseRgbString(color);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        case "hsl":
        case "hsla": {
            const hsl = parseHslString(color);
            const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        case "hwb": {
            const hwb = parseHwbString(color);
            const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        case "lab":
            lab = parseLabString(color);
            break;
        case "lch":
            return color;
        case "oklab": {
            const oklab = parseOklabString(color);
            const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
            lab = rgbToLab(rgb.r, rgb.g, rgb.b);
            break;
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const lch = labToLch(lab.l, lab.a, lab.b);
    return `lch(${Math.round(lch.l)} ${Math.round(lch.c)} ${Math.round(lch.h)})`;
}

/**
 * Convert any supported color format to OKLAB
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns OKLAB color string
 */
export function toOklab(color: string, sourceFormat?: ColorFormat): string {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let rgb: RGBColor;

    switch (sourceFormat) {
        case "hex":
            rgb = parseHexToRgb(color);
            break;
        case "hexalpha":
            rgb = parseHexAlphaToRgba(color);
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
        case "hwb": {
            const hwb = parseHwbString(color);
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            break;
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            return `oklab(${oklab.l.toFixed(4)} ${oklab.a.toFixed(4)} ${oklab.b.toFixed(4)})`;
        }
        case "lab": {
            const lab = parseLabString(color);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            rgb = labToRgb(lab.l, lab.a, lab.b);
            break;
        }
        case "oklab":
            return color;
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }

    const oklab = rgbToOklab(rgb.r, rgb.g, rgb.b);
    return `oklab(${oklab.l.toFixed(4)} ${oklab.a.toFixed(4)} ${oklab.b.toFixed(4)})`;
}

/**
 * Convert any supported color format to RGB object
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns RGB color object
 */
export function toRgbObject(color: string, sourceFormat?: ColorFormat): RGBColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "hex":
            return parseHexToRgb(color);
        case "hexalpha":
            return parseHexAlphaToRgba(color);
        case "rgb":
        case "rgba":
            return parseRgbString(color);
        case "hsl":
        case "hsla": {
            const hsl = parseHslString(color);
            return hslToRgb(hsl.h, hsl.s, hsl.l);
        }
        case "hwb": {
            const hwb = parseHwbString(color);
            return hwbToRgb(hwb.h, hwb.w, hwb.b);
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            return hwbToRgb(hwb.h, hwb.w, hwb.b);
        }
        case "oklch": {
            const oklch = parseOklchString(color);
            const oklab = oklchToOklab(oklch.l, oklch.c, oklch.h);
            return oklabToRgb(oklab.l, oklab.a, oklab.b);
        }
        case "lab": {
            const lab = parseLabString(color);
            return labToRgb(lab.l, lab.a, lab.b);
        }
        case "lch": {
            const lch = parseLchString(color);
            const lab = lchToLab(lch.l, lch.c, lch.h);
            return labToRgb(lab.l, lab.a, lab.b);
        }
        case "oklab": {
            const oklab = parseOklabString(color);
            return oklabToRgb(oklab.l, oklab.a, oklab.b);
        }
        default:
            throw new Error(`Unsupported color format: ${sourceFormat}`);
    }
}

/**
 * Convert any supported color format to RGBA object
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), optional. If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns RGBA color object
 */
export function toRgbaObject(color: string, alpha?: number, sourceFormat?: ColorFormat): RGBAColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let finalAlpha = alpha !== undefined ? alpha : 1;
    let rgb: RGBColor;

    switch (sourceFormat) {
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            if (alpha === undefined) finalAlpha = rgba.a;
            return { r: rgba.r, g: rgba.g, b: rgba.b, a: finalAlpha };
        }
        case "rgba": {
            const rgba = parseRgbString(color);
            if (alpha === undefined && rgba.a !== undefined) finalAlpha = rgba.a;
            return { r: rgba.r, g: rgba.g, b: rgba.b, a: finalAlpha };
        }
        case "hsla": {
            const hsla = parseHslString(color);
            rgb = hslToRgb(hsla.h, hsla.s, hsla.l);
            if (alpha === undefined && hsla.a !== undefined) finalAlpha = hsla.a;
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            if (alpha === undefined) finalAlpha = hwba.a;
            break;
        }
        default: {
            rgb = toRgbObject(color, sourceFormat);
            break;
        }
    }

    return { r: rgb.r, g: rgb.g, b: rgb.b, a: finalAlpha };
}

/**
 * Convert any supported color format to HSL object
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HSL color object
 */
export function toHslObject(color: string, sourceFormat?: ColorFormat): HSLColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "hsl":
        case "hsla":
            return parseHslString(color);
        default: {
            const rgb = toRgbObject(color, sourceFormat);
            return rgbToHsl(rgb.r, rgb.g, rgb.b);
        }
    }
}

/**
 * Convert any supported color format to HSLA object
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), optional. If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HSLA color object
 */
export function toHslaObject(color: string, alpha?: number, sourceFormat?: ColorFormat): HSLAColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let finalAlpha = alpha !== undefined ? alpha : 1;
    let hsl: HSLColor;

    switch (sourceFormat) {
        case "hsla": {
            const hsla = parseHslString(color);
            if (alpha === undefined && hsla.a !== undefined) finalAlpha = hsla.a;
            return { h: hsla.h, s: hsla.s, l: hsla.l, a: finalAlpha };
        }
        case "rgba": {
            const rgba = parseRgbString(color);
            hsl = rgbToHsl(rgba.r, rgba.g, rgba.b);
            if (alpha === undefined && rgba.a !== undefined) finalAlpha = rgba.a;
            break;
        }
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            hsl = rgbToHsl(rgba.r, rgba.g, rgba.b);
            if (alpha === undefined) finalAlpha = rgba.a;
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            const hwb = { h: hwba.h, w: hwba.w, b: hwba.b };
            const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
            hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            if (alpha === undefined) finalAlpha = hwba.a;
            break;
        }
        default: {
            hsl = toHslObject(color, sourceFormat);
            break;
        }
    }

    return { h: hsl.h, s: hsl.s, l: hsl.l, a: finalAlpha };
}

/**
 * Convert any supported color format to HWB object
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HWB color object
 */
export function toHwbObject(color: string, sourceFormat?: ColorFormat): HWBColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "hwb":
            return parseHwbString(color);
        case "hwba": {
            const hwba = parseHwbaString(color);
            return { h: hwba.h, w: hwba.w, b: hwba.b };
        }
        default: {
            const rgb = toRgbObject(color, sourceFormat);
            return rgbToHwb(rgb.r, rgb.g, rgb.b);
        }
    }
}

/**
 * Convert any supported color format to HWBA object (HWB with alpha)
 * @param color - Color string in any supported format
 * @param alpha - Alpha value (0-1), optional. If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns HWBA color object
 */
export function toHwbaObject(color: string, alpha?: number, sourceFormat?: ColorFormat): HWBAColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    let finalAlpha = alpha !== undefined ? alpha : 1;
    let hwb: HWBColor;

    // Handle alpha extraction from source formats
    switch (sourceFormat) {
        case "rgba": {
            const rgba = parseRgbString(color);
            hwb = rgbToHwb(rgba.r, rgba.g, rgba.b);
            if (alpha === undefined && rgba.a !== undefined) finalAlpha = rgba.a;
            break;
        }
        case "hsla": {
            const hsla = parseHslString(color);
            const rgb = hslToRgb(hsla.h, hsla.s, hsla.l);
            hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
            if (alpha === undefined && hsla.a !== undefined) finalAlpha = hsla.a;
            break;
        }
        case "hexalpha": {
            const rgba = parseHexAlphaToRgba(color);
            hwb = rgbToHwb(rgba.r, rgba.g, rgba.b);
            if (alpha === undefined) finalAlpha = rgba.a;
            break;
        }
        case "hwba": {
            const hwba = parseHwbaString(color);
            if (alpha === undefined) finalAlpha = hwba.a;
            return { h: hwba.h, w: hwba.w, b: hwba.b, a: finalAlpha };
        }
        default: {
            hwb = toHwbObject(color, sourceFormat);
            break;
        }
    }

    return { h: hwb.h, w: hwb.w, b: hwb.b, a: finalAlpha };
}

/**
 * Convert any supported color format to OKLCH object
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns OKLCH color object
 */
export function toOklchObject(color: string, sourceFormat?: ColorFormat): OKLCHColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "oklch":
            return parseOklchString(color);
        case "oklab": {
            const oklab = parseOklabString(color);
            return oklabToOklch(oklab.l, oklab.a, oklab.b);
        }
        default: {
            const rgb = toRgbObject(color, sourceFormat);
            const oklab = rgbToOklab(rgb.r, rgb.g, rgb.b);
            return oklabToOklch(oklab.l, oklab.a, oklab.b);
        }
    }
}

/**
 * Convert any supported color format to LAB object
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns LAB color object
 */
export function toLabObject(color: string, sourceFormat?: ColorFormat): LABColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "lab":
            return parseLabString(color);
        case "lch": {
            const lch = parseLchString(color);
            return lchToLab(lch.l, lch.c, lch.h);
        }
        default: {
            const rgb = toRgbObject(color, sourceFormat);
            return rgbToLab(rgb.r, rgb.g, rgb.b);
        }
    }
}

/**
 * Convert any supported color format to LCH object
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns LCH color object
 */
export function toLchObject(color: string, sourceFormat?: ColorFormat): LCHColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "lch":
            return parseLchString(color);
        case "lab": {
            const lab = parseLabString(color);
            return labToLch(lab.l, lab.a, lab.b);
        }
        default: {
            const lab = toLabObject(color, sourceFormat);
            return labToLch(lab.l, lab.a, lab.b);
        }
    }
}

/**
 * Convert any supported color format to OKLAB object
 * @param color - Color string in any supported format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @returns OKLAB color object
 */
export function toOklabObject(color: string, sourceFormat?: ColorFormat): OKLABColor {
    if (!sourceFormat) {
        sourceFormat = detectColorFormat(color);
    }

    switch (sourceFormat) {
        case "oklab":
            return parseOklabString(color);
        case "oklch": {
            const oklch = parseOklchString(color);
            return oklchToOklab(oklch.l, oklch.c, oklch.h);
        }
        default: {
            const rgb = toRgbObject(color, sourceFormat);
            return rgbToOklab(rgb.r, rgb.g, rgb.b);
        }
    }
}

/**
 * Convert color from one format to another
 * @param color - Source color string
 * @param targetFormat - Target color format
 * @param sourceFormat - Source color format (optional, will auto-detect if not provided)
 * @param alpha - Alpha value for formats that support it (0-1). If not provided, will preserve intrinsic alpha from source color, or default to 1
 * @returns Color string in target format
 */
export function convertColor(color: string, targetFormat: ColorFormat, sourceFormat?: ColorFormat, alpha?: number): string {
    switch (targetFormat) {
        case "hex":
            return toHex(color, sourceFormat);
        case "hexalpha":
            return toHexAlpha(color, alpha, sourceFormat);
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
        case "hwba":
            return toHwba(color, alpha, sourceFormat);
        case "oklch":
            return toOklch(color, sourceFormat);
        case "lab":
            return toLab(color, sourceFormat);
        case "lch":
            return toLch(color, sourceFormat);
        case "oklab":
            return toOklab(color, sourceFormat);
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

    if (trimmed.startsWith("#")) {
        const cleanHex = trimmed.replace("#", "");
        if (/^[0-9a-f]{6}$/i.test(cleanHex)) {
            return "hex";
        }
        if (/^[0-9a-f]{8}$/i.test(cleanHex)) {
            return "hexalpha";
        }
    }
    if (/^[0-9a-f]{6}$/i.test(trimmed)) {
        return "hex";
    }
    if (/^[0-9a-f]{8}$/i.test(trimmed)) {
        return "hexalpha";
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
    if (trimmed.startsWith("hwba(")) {
        return "hwba";
    }
    if (trimmed.startsWith("oklch(")) {
        return "oklch";
    }
    if (trimmed.startsWith("lab(")) {
        return "lab";
    }
    if (trimmed.startsWith("lch(")) {
        return "lch";
    }
    if (trimmed.startsWith("oklab(")) {
        return "oklab";
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
            case "hexalpha":
                parseHexAlphaToRgba(color);
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
            case "hwba":
                parseHwbaString(color);
                return true;
            case "oklch":
                parseOklchString(color);
                return true;
            case "lab":
                parseLabString(color);
                return true;
            case "lch":
                parseLchString(color);
                return true;
            case "oklab":
                parseOklabString(color);
                return true;
            default:
                return false;
        }
    } catch {
        return false;
    }
}
