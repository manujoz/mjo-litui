/* eslint-disable no-console */
/**
 * Test suite for color utility functions
 * Tests comprehensive color conversion and manipulation with focus on alpha handling
 */

import { expect } from "@esm-bundle/chai";

// Import color utility functions
import {
    convertColor,
    detectColorFormat,
    isValidColor,
    toHex,
    toHexAlpha,
    toHsl,
    toHslObject,
    toHsla,
    toHslaObject,
    toHwbObject,
    toHwbaObject,
    toLabObject,
    toLchObject,
    toOklabObject,
    toOklchObject,
    toRgb,
    toRgbObject,
    toRgba,
    toRgbaObject,
} from "../../src/utils/colors.js";

/**
 * Test suite for color utility functions
 */
suite("Color Utility Functions", () => {
    /**
     * Format detection tests - verifies automatic format detection
     */
    suite("Format Detection", () => {
        test("should detect hex format correctly", () => {
            expect(detectColorFormat("#ff0000")).to.equal("hex");
            expect(detectColorFormat("ff0000")).to.equal("hex");
        });

        test("should detect hex alpha format correctly", () => {
            expect(detectColorFormat("#ff000080")).to.equal("hexalpha");
            expect(detectColorFormat("ff000080")).to.equal("hexalpha");
        });

        test("should detect RGB format correctly", () => {
            expect(detectColorFormat("rgb(255, 0, 0)")).to.equal("rgb");
        });

        test("should detect RGBA format correctly", () => {
            expect(detectColorFormat("rgba(255, 0, 0, 0.5)")).to.equal("rgba");
        });

        test("should detect HSL format correctly", () => {
            expect(detectColorFormat("hsl(0, 100%, 50%)")).to.equal("hsl");
        });

        test("should detect HSLA format correctly", () => {
            expect(detectColorFormat("hsla(0, 100%, 50%, 0.8)")).to.equal("hsla");
        });
    });

    /**
     * Color conversion tests - verifies basic conversions work correctly
     */
    suite("Color Conversion", () => {
        test("should convert RGB to hex correctly", () => {
            const result = toHex("rgb(255, 0, 0)");
            expect(result).to.equal("#ff0000");
        });

        test("should convert hex to RGB correctly", () => {
            const result = toRgb("#ff0000");
            expect(result).to.equal("rgb(255, 0, 0)");
        });

        test("should convert RGB to HSL correctly", () => {
            const result = toHsl("rgb(255, 0, 0)");
            expect(result).to.equal("hsl(0, 100%, 50%)");
        });

        test("should convert HSL to RGB correctly", () => {
            const result = toRgb("hsl(0, 100%, 50%)");
            expect(result).to.equal("rgb(255, 0, 0)");
        });
    });

    /**
     * Alpha handling tests - verifies proper alpha channel handling (main focus)
     */
    suite("Alpha Handling", () => {
        test("should preserve intrinsic alpha in RGBA conversion", () => {
            const result = toRgba("rgba(255, 0, 0, 0.5)");
            expect(result).to.equal("rgba(255, 0, 0, 0.5)");
        });

        test("should preserve intrinsic alpha in HSLA conversion", () => {
            const result = toHsla("hsla(0, 100%, 50%, 0.8)");
            expect(result).to.equal("hsla(0, 100%, 50%, 0.8)");
        });

        test("should preserve intrinsic alpha in hex alpha conversion", () => {
            const result = toHexAlpha("#ff000080");
            expect(result).to.equal("#ff000080");
        });

        test("should use default alpha when none provided", () => {
            const result = toRgba("rgb(255, 0, 0)");
            expect(result).to.equal("rgba(255, 0, 0, 1)");
        });

        test("should override intrinsic alpha when explicitly provided", () => {
            const result = toRgba("rgba(255, 0, 0, 0.5)", 0.8);
            expect(result).to.equal("rgba(255, 0, 0, 0.8)");
        });

        test("should handle hex alpha to RGBA with intrinsic alpha", () => {
            const result = toRgba("#ff000080");
            expect(result).to.equal("rgba(255, 0, 0, 0.5019607843137255)"); // 128/255
        });

        test("should handle HSLA to RGBA with intrinsic alpha", () => {
            const result = toRgba("hsla(0, 100%, 50%, 0.7)");
            expect(result).to.equal("rgba(255, 0, 0, 0.7)");
        });

        test("should handle RGBA to hex alpha with intrinsic alpha", () => {
            const result = toHexAlpha("rgba(255, 0, 0, 0.5)");
            expect(result).to.equal("#ff000080");
        });

        test("should handle HSLA to hex alpha with intrinsic alpha", () => {
            const result = toHexAlpha("hsla(0, 100%, 50%, 0.75)");
            expect(result).to.equal("#ff0000bf"); // 0.75 * 255 = 191.25 ≈ 191 = 0xBF
        });

        test("should handle complex alpha scenarios with convertColor", () => {
            // RGBA with alpha to HSLA should preserve alpha
            const result1 = convertColor("rgba(255, 0, 0, 0.6)", "hsla");
            expect(result1).to.equal("hsla(0, 100%, 50%, 0.6)");

            // Hex alpha to RGBA should preserve alpha
            const result2 = convertColor("#ff0000cc", "rgba");
            expect(result2).to.equal("rgba(255, 0, 0, 0.8)"); // 204/255 = 0.8

            // Override alpha should work
            const result3 = convertColor("rgba(255, 0, 0, 0.5)", "hsla", undefined, 0.9);
            expect(result3).to.equal("hsla(0, 100%, 50%, 0.9)");
        });
    });

    /**
     * Edge cases and validation tests
     */
    suite("Edge Cases and Validation", () => {
        test("should validate correct color formats", () => {
            expect(isValidColor("#ff0000")).to.be.true;
            expect(isValidColor("#ff000080")).to.be.true;
            expect(isValidColor("rgb(255, 0, 0)")).to.be.true;
            expect(isValidColor("rgba(255, 0, 0, 0.5)")).to.be.true;
            expect(isValidColor("hsl(0, 100%, 50%)")).to.be.true;
            expect(isValidColor("hsla(0, 100%, 50%, 0.8)")).to.be.true;
        });

        test("should reject invalid color formats", () => {
            expect(isValidColor("#gggggg")).to.be.false;
            expect(isValidColor("rgb(300, 0, 0)")).to.be.true; // Out of range but valid format
            expect(isValidColor("not-a-color")).to.be.false;
            expect(isValidColor("")).to.be.false;
        });

        test("should handle boundary alpha values", () => {
            const result1 = toRgba("rgb(255, 0, 0)", 0);
            expect(result1).to.equal("rgba(255, 0, 0, 0)");

            const result2 = toRgba("rgb(255, 0, 0)", 1);
            expect(result2).to.equal("rgba(255, 0, 0, 1)");

            const result3 = toHexAlpha("rgb(255, 0, 0)", 0);
            expect(result3).to.equal("#ff000000");

            const result4 = toHexAlpha("rgb(255, 0, 0)", 1);
            expect(result4).to.equal("#ff0000ff");
        });

        test("should handle decimal alpha values correctly", () => {
            const result1 = toRgba("rgb(255, 0, 0)", 0.33333);
            expect(result1).to.equal("rgba(255, 0, 0, 0.33333)");

            const result2 = toHsla("hsl(0, 100%, 50%)", 0.66667);
            expect(result2).to.equal("hsla(0, 100%, 50%, 0.66667)");
        });
    });

    /**
     * Performance and consistency tests
     */
    suite("Performance and Consistency", () => {
        test("should maintain consistency across multiple conversions", () => {
            const originalColor = "rgba(128, 64, 192, 0.75)";

            // Convert through multiple formats and back
            const hex = toHex(originalColor);
            const backToRgb = toRgb(hex);
            const backToRgba = toRgba(originalColor); // Should preserve original alpha
            const hsl = toHsl(originalColor);
            const backFromHsl = toRgb(hsl);

            // Parse RGB values to check individual components (allowing for rounding differences)
            const parseRgbValues = (rgb: string) => {
                const match = rgb.match(/rgb\((\d+), (\d+), (\d+)\)/);
                return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [0, 0, 0];
            };

            const originalRgbValues = [128, 64, 192];
            const backToRgbValues = parseRgbValues(backToRgb);
            const backFromHslValues = parseRgbValues(backFromHsl);

            // Allow small rounding differences (±1) due to mathematical precision
            backToRgbValues.forEach((value, index) => {
                expect(value).to.be.closeTo(originalRgbValues[index], 1);
            });

            backFromHslValues.forEach((value, index) => {
                expect(value).to.be.closeTo(originalRgbValues[index], 1);
            });

            // Alpha should be preserved exactly
            expect(backToRgba).to.equal(originalColor);
        });

        test("should handle batch conversions efficiently", () => {
            const colors = [
                "rgba(255, 0, 0, 0.5)",
                "rgba(0, 255, 0, 0.7)",
                "rgba(0, 0, 255, 0.3)",
                "#ff000080",
                "#00ff00b3",
                "#0000ff4d",
                "hsla(0, 100%, 50%, 0.6)",
                "hsla(120, 100%, 50%, 0.8)",
                "hsla(240, 100%, 50%, 0.4)",
            ];

            colors.forEach((color) => {
                const rgba = toRgba(color);
                const hex = toHexAlpha(color);
                const hsla = toHsla(color);

                expect(rgba).to.be.a("string");
                expect(hex).to.be.a("string");
                expect(hsla).to.be.a("string");

                expect(rgba).to.match(/^rgba\(\d+, \d+, \d+, [\d.]+\)$/);
                expect(hex).to.match(/^#[0-9a-f]{8}$/i);
                expect(hsla).to.match(/^hsla\(\d+, \d+%, \d+%, [\d.]+\)$/);
            });
        });
    });

    /**
     * API consistency tests
     */
    suite("API Consistency", () => {
        test("should have consistent parameter order across functions", () => {
            const testColor = "rgba(255, 0, 0, 0.5)";
            const testAlpha = 0.8;

            // All alpha functions should accept (color, alpha?, sourceFormat?)
            const rgba = toRgba(testColor, testAlpha);
            const hsla = toHsla(testColor, testAlpha);
            const hexAlpha = toHexAlpha(testColor, testAlpha);

            expect(rgba).to.equal("rgba(255, 0, 0, 0.8)");
            expect(hsla).to.equal("hsla(0, 100%, 50%, 0.8)");
            expect(hexAlpha).to.equal("#ff0000cc");
        });

        test("should work with explicit format specification", () => {
            const color = "255, 0, 0, 0.5"; // Invalid format string

            // Should throw error when trying to auto-detect
            expect(() => detectColorFormat(color)).to.throw();

            // But valid colors should work with explicit format
            const validRgba = "rgba(255, 0, 0, 0.5)";
            const result = toHex(validRgba, "rgba");
            expect(result).to.equal("#ff0000");
        });

        test("should handle undefined alpha gracefully", () => {
            // These should use intrinsic alpha
            const rgba1 = toRgba("rgba(255, 0, 0, 0.5)");
            const hsla1 = toHsla("hsla(0, 100%, 50%, 0.7)");
            const hex1 = toHexAlpha("#ff000080");

            expect(rgba1).to.equal("rgba(255, 0, 0, 0.5)");
            expect(hsla1).to.equal("hsla(0, 100%, 50%, 0.7)");
            expect(hex1).to.equal("#ff000080");

            // These should default to 1
            const rgba2 = toRgba("rgb(255, 0, 0)");
            const hsla2 = toHsla("hsl(0, 100%, 50%)");
            const hex2 = toHexAlpha("#ff0000");

            expect(rgba2).to.equal("rgba(255, 0, 0, 1)");
            expect(hsla2).to.equal("hsla(0, 100%, 50%, 1)");
            expect(hex2).to.equal("#ff0000ff");
        });
    });

    /**
     * Object conversion tests - verifies functions that return color objects
     */
    suite("Object Conversion Functions", () => {
        test("should convert to RGB object correctly", () => {
            const result = toRgbObject("rgb(255, 128, 64)");
            expect(result).to.deep.equal({ r: 255, g: 128, b: 64 });

            const resultFromHex = toRgbObject("#ff8040");
            expect(resultFromHex.r).to.equal(255);
            expect(resultFromHex.g).to.equal(128);
            expect(resultFromHex.b).to.equal(64);
        });

        test("should convert to RGBA object correctly", () => {
            const result1 = toRgbaObject("rgba(255, 128, 64, 0.5)");
            expect(result1).to.deep.equal({ r: 255, g: 128, b: 64, a: 0.5 });

            const result2 = toRgbaObject("rgb(255, 128, 64)", 0.8);
            expect(result2).to.deep.equal({ r: 255, g: 128, b: 64, a: 0.8 });

            // Should preserve intrinsic alpha
            const result3 = toRgbaObject("#ff804080");
            expect(result3.r).to.equal(255);
            expect(result3.g).to.equal(128);
            expect(result3.b).to.equal(64);
            expect(result3.a).to.be.approximately(0.5, 0.01);
        });

        test("should convert to HSL object correctly", () => {
            const result = toHslObject("hsl(120, 100%, 50%)");
            expect(result).to.deep.equal({ h: 120, s: 100, l: 50 });

            const resultFromRgb = toHslObject("rgb(0, 255, 0)");
            expect(resultFromRgb.h).to.equal(120);
            expect(resultFromRgb.s).to.equal(100);
            expect(resultFromRgb.l).to.equal(50);
        });

        test("should convert to HSLA object correctly", () => {
            const result1 = toHslaObject("hsla(120, 100%, 50%, 0.7)");
            expect(result1).to.deep.equal({ h: 120, s: 100, l: 50, a: 0.7 });

            const result2 = toHslaObject("hsl(120, 100%, 50%)", 0.9);
            expect(result2).to.deep.equal({ h: 120, s: 100, l: 50, a: 0.9 });

            // Should preserve alpha from RGBA source
            const result3 = toHslaObject("rgba(0, 255, 0, 0.6)");
            expect(result3.h).to.equal(120);
            expect(result3.s).to.equal(100);
            expect(result3.l).to.equal(50);
            expect(result3.a).to.equal(0.6);
        });

        test("should convert to HWB object correctly", () => {
            const result = toHwbObject("hwb(120 0% 0%)");
            expect(result).to.deep.equal({ h: 120, w: 0, b: 0 });

            const resultFromRgb = toHwbObject("rgb(0, 255, 0)");
            expect(resultFromRgb.h).to.equal(120);
            expect(resultFromRgb.w).to.equal(0);
            expect(resultFromRgb.b).to.equal(0);
        });

        test("should convert to HWBA object correctly", () => {
            const result1 = toHwbaObject("rgb(0, 255, 0)", 0.8);
            expect(result1.h).to.equal(120);
            expect(result1.w).to.equal(0);
            expect(result1.b).to.equal(0);
            expect(result1.a).to.equal(0.8);

            // Should preserve alpha from source
            const result2 = toHwbaObject("rgba(0, 255, 0, 0.5)");
            expect(result2.h).to.equal(120);
            expect(result2.w).to.equal(0);
            expect(result2.b).to.equal(0);
            expect(result2.a).to.equal(0.5);
        });

        test("should convert to modern color space objects correctly", () => {
            const testColor = "rgb(255, 0, 0)"; // Red

            // Test OKLCH object
            const oklch = toOklchObject(testColor);
            expect(oklch).to.have.property("l");
            expect(oklch).to.have.property("c");
            expect(oklch).to.have.property("h");
            expect(oklch.l).to.be.greaterThan(0);
            expect(oklch.c).to.be.greaterThan(0);

            // Test LAB object
            const lab = toLabObject(testColor);
            expect(lab).to.have.property("l");
            expect(lab).to.have.property("a");
            expect(lab).to.have.property("b");
            expect(lab.l).to.be.greaterThan(0);
            expect(lab.a).to.be.greaterThan(0);

            // Test LCH object
            const lch = toLchObject(testColor);
            expect(lch).to.have.property("l");
            expect(lch).to.have.property("c");
            expect(lch).to.have.property("h");
            expect(lch.l).to.be.greaterThan(0);
            expect(lch.c).to.be.greaterThan(0);

            // Test OKLAB object
            const oklab = toOklabObject(testColor);
            expect(oklab).to.have.property("l");
            expect(oklab).to.have.property("a");
            expect(oklab).to.have.property("b");
            expect(oklab.l).to.be.greaterThan(0);
            expect(oklab.a).to.be.greaterThan(0);
        });

        test("should maintain consistency between string and object conversions", () => {
            const testColor = "rgba(128, 64, 192, 0.75)";

            // RGB consistency
            const rgbString = toRgb(testColor);
            const rgbObject = toRgbObject(testColor);
            expect(rgbString).to.equal(`rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})`);

            // RGBA consistency
            const rgbaString = toRgba(testColor);
            const rgbaObject = toRgbaObject(testColor);
            expect(rgbaString).to.equal(`rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`);

            // HSL consistency
            const hslString = toHsl(testColor);
            const hslObject = toHslObject(testColor);
            expect(hslString).to.equal(`hsl(${Math.round(hslObject.h)}, ${Math.round(hslObject.s)}%, ${Math.round(hslObject.l)}%)`);

            // HSLA consistency
            const hslaString = toHsla(testColor);
            const hslaObject = toHslaObject(testColor);
            expect(hslaString).to.equal(`hsla(${Math.round(hslaObject.h)}, ${Math.round(hslaObject.s)}%, ${Math.round(hslaObject.l)}%, ${hslaObject.a})`);
        });

        test("should handle object conversions with alpha preservation", () => {
            // Test alpha preservation across different object conversions
            const hexAlphaColor = "#ff804080"; // Red-ish with ~50% alpha

            const rgbaObj = toRgbaObject(hexAlphaColor);
            const hslaObj = toHslaObject(hexAlphaColor);
            const hwbaObj = toHwbaObject(hexAlphaColor);

            // All should have approximately the same alpha value
            expect(rgbaObj.a).to.be.approximately(0.5, 0.01);
            expect(hslaObj.a).to.be.approximately(0.5, 0.01);
            expect(hwbaObj.a).to.be.approximately(0.5, 0.01);
        });
    });

    /**
     * HWBA Format Support Tests - comprehensive testing of new hwba format
     */
    suite("HWBA Format Support", () => {
        test("should detect hwba format correctly", () => {
            expect(detectColorFormat("hwba(120, 25%, 25%, 0.8)")).to.equal("hwba");
            expect(detectColorFormat("hwba(0, 0%, 0%, 1)")).to.equal("hwba");
            expect(detectColorFormat("hwba(240,50%,25%,0.5)")).to.equal("hwba"); // no spaces
            expect(detectColorFormat("hwba(  360  ,  100%  ,  0%  ,  1  )")).to.equal("hwba"); // extra spaces
        });

        test("should validate hwba colors correctly", () => {
            expect(isValidColor("hwba(120, 25%, 25%, 0.8)")).to.be.true;
            expect(isValidColor("hwba(0, 0%, 0%, 1)")).to.be.true;
            expect(isValidColor("hwba(360, 100%, 100%, 0)")).to.be.true;
            expect(isValidColor("hwba(-1, 0%, 0%, 0.5)")).to.be.false; // invalid hue
            expect(isValidColor("hwba(120, -5%, 25%, 0.8)")).to.be.false; // invalid whiteness
            expect(isValidColor("hwba(120, 25%, -5%, 0.8)")).to.be.false; // invalid blackness
            expect(isValidColor("hwba(120, 25%, 25%, -0.1)")).to.be.false; // invalid alpha
            expect(isValidColor("hwba(120, 25%, 25%, 1.1)")).to.be.false; // invalid alpha
        });

        test("should convert from hwba to other formats", () => {
            const hwbaColor = "hwba(120, 25%, 25%, 0.8)"; // Green with alpha

            // To RGB/RGBA
            const rgb = toRgb(hwbaColor);
            const rgba = toRgba(hwbaColor);
            expect(rgb).to.match(/^rgb\(\d+, \d+, \d+\)$/);
            expect(rgba).to.match(/^rgba\(\d+, \d+, \d+, 0\.8\)$/);

            // To HSL/HSLA
            const hsl = toHsl(hwbaColor);
            const hsla = toHsla(hwbaColor);
            expect(hsl).to.match(/^hsl\(\d+, \d+%, \d+%\)$/);
            expect(hsla).to.match(/^hsla\(\d+, \d+%, \d+%, 0\.8\)$/);

            // To HEX/HEXALPHA
            const hex = toHex(hwbaColor);
            const hexAlpha = toHexAlpha(hwbaColor);
            expect(hex).to.match(/^#[0-9a-f]{6}$/i);
            expect(hexAlpha).to.match(/^#[0-9a-f]{8}$/i);
        });

        test("should convert to hwba format from other formats", () => {
            // Test conversion through convertColor
            const rgbaColor = "rgba(128, 192, 128, 0.75)";
            const hwbaResult = convertColor(rgbaColor, "hwba");
            expect(hwbaResult).to.match(/^hwba\(\d+, \d+%, \d+%, 0\.75\)$/);

            const hslColor = "hsl(120, 50%, 50%)";
            const hwbaFromHsl = convertColor(hslColor, "hwba");
            expect(hwbaFromHsl).to.match(/^hwba\(\d+, \d+%, \d+%, 1\)$/);
        });

        test("should preserve alpha correctly in hwba conversions", () => {
            const testCases = [
                { input: "hwba(0, 0%, 0%, 0.25)", alpha: 0.25 },
                { input: "hwba(180, 50%, 25%, 0.5)", alpha: 0.5 },
                { input: "hwba(270, 25%, 50%, 0.75)", alpha: 0.75 },
                { input: "hwba(60, 75%, 10%, 1)", alpha: 1 },
            ];

            testCases.forEach(({ input, alpha }) => {
                const rgba = toRgbaObject(input);
                const hsla = toHslaObject(input);
                const hwba = toHwbaObject(input);

                expect(rgba.a).to.be.approximately(alpha, 0.001, `RGBA alpha for ${input}`);
                expect(hsla.a).to.be.approximately(alpha, 0.001, `HSLA alpha for ${input}`);
                expect(hwba.a).to.be.approximately(alpha, 0.001, `HWBA alpha for ${input}`);
            });
        });

        test("should handle hwba object conversions correctly", () => {
            const hwbaColor = "hwba(240, 30%, 20%, 0.6)"; // Blue-ish with alpha

            // Test object conversions
            const rgbObj = toRgbObject(hwbaColor);
            const rgbaObj = toRgbaObject(hwbaColor);
            const hslObj = toHslObject(hwbaColor);
            const hslaObj = toHslaObject(hwbaColor);
            const hwbObj = toHwbObject(hwbaColor);
            const hwbaObj = toHwbaObject(hwbaColor);

            // RGB/RGBA objects
            expect(rgbObj).to.have.property("r");
            expect(rgbObj).to.have.property("g");
            expect(rgbObj).to.have.property("b");
            expect(rgbaObj).to.have.property("a");
            expect(rgbaObj.a).to.be.approximately(0.6, 0.001);

            // HSL/HSLA objects
            expect(hslObj).to.have.property("h");
            expect(hslObj).to.have.property("s");
            expect(hslObj).to.have.property("l");
            expect(hslaObj).to.have.property("a");
            expect(hslaObj.a).to.be.approximately(0.6, 0.001);

            // HWB/HWBA objects
            expect(hwbObj).to.have.property("h");
            expect(hwbObj).to.have.property("w");
            expect(hwbObj).to.have.property("b");
            expect(hwbaObj).to.have.property("a");
            expect(hwbaObj.h).to.be.approximately(240, 1);
            expect(hwbaObj.w).to.be.approximately(30, 1);
            expect(hwbaObj.b).to.be.approximately(20, 1);
            expect(hwbaObj.a).to.be.approximately(0.6, 0.001);
        });

        test("should handle edge cases for hwba format", () => {
            // Pure colors
            expect(isValidColor("hwba(0, 0%, 0%, 1)")).to.be.true; // Pure red
            expect(isValidColor("hwba(120, 0%, 0%, 1)")).to.be.true; // Pure green
            expect(isValidColor("hwba(240, 0%, 0%, 1)")).to.be.true; // Pure blue

            // White/black combinations
            expect(isValidColor("hwba(0, 100%, 0%, 1)")).to.be.true; // White
            expect(isValidColor("hwba(0, 0%, 100%, 1)")).to.be.true; // Black
            expect(isValidColor("hwba(0, 50%, 50%, 1)")).to.be.true; // 50% gray

            // Zero alpha
            const zeroAlpha = "hwba(180, 25%, 25%, 0)";
            const rgbaZero = toRgbaObject(zeroAlpha);
            expect(rgbaZero.a).to.equal(0);
        });

        test("should maintain round-trip consistency for hwba", () => {
            const originalColors = ["hwba(0, 25%, 25%, 0.8)", "hwba(120, 50%, 10%, 0.5)", "hwba(240, 10%, 50%, 0.9)", "hwba(300, 75%, 5%, 0.3)"];

            originalColors.forEach((originalColor) => {
                // Convert to RGB and back to HWBA
                const rgb = toRgb(originalColor);
                const backToHwba = convertColor(rgb, "hwba");

                // Parse both for comparison
                const originalObj = toHwbaObject(originalColor);
                const roundTripObj = toHwbaObject(backToHwba);

                // Allow for small rounding differences
                expect(roundTripObj.h).to.be.approximately(originalObj.h, 2);
                expect(roundTripObj.w).to.be.approximately(originalObj.w, 2);
                expect(roundTripObj.b).to.be.approximately(originalObj.b, 2);
                // Note: Alpha won't match perfectly since RGB doesn't have alpha
            });
        });

        test("should handle alpha override in hwba conversions", () => {
            const hwbaColor = "hwba(60, 30%, 20%, 0.8)";

            // Override alpha in conversions
            const rgbaOverride = toRgbaObject(hwbaColor, 0.3);
            const hslaOverride = toHslaObject(hwbaColor, 0.3);
            const hwbaOverride = toHwbaObject(hwbaColor, 0.3);

            expect(rgbaOverride.a).to.equal(0.3);
            expect(hslaOverride.a).to.equal(0.3);
            expect(hwbaOverride.a).to.equal(0.3);

            // String conversions with alpha override
            const rgbaStringOverride = toRgba(hwbaColor, 0.7);
            const hslaStringOverride = toHsla(hwbaColor, 0.7);
            const hexAlphaOverride = toHexAlpha(hwbaColor, 0.7);

            expect(rgbaStringOverride).to.include("0.7");
            expect(hslaStringOverride).to.include("0.7");
            expect(hexAlphaOverride).to.match(/^#[0-9a-f]{8}$/i);
        });
    });
});
