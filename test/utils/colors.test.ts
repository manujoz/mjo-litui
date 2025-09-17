/* eslint-disable no-console */
/**
 * Test suite for color utility functions
 * Tests comprehensive color conversion and manipulation with focus on alpha handling
 */

import { assert } from "@esm-bundle/chai";

import {
    ColorFormat,
    convertColor,
    detectColorFormat,
    isValidColor,
    toHslaObject,
    toHslObject,
    toHwbObject,
    toLabObject,
    toLchObject,
    toOklabObject,
    toOklchObject,
    toRgbaObject,
    toRgbObject,
} from "../../src/utils/colors";
import { colorsAreEqual } from "../fixtures/colors-utils";

// Import color utility functions

const allowedColorFormats: ColorFormat[] = ["hex", "hexalpha", "rgb", "rgba", "hsl", "hsla", "lab", "lch", "oklab", "oklch", "color", "hwb"];

const colors: Map<ColorFormat, string> = new Map([
    ["hex", "#00BAAE"],
    ["hexalpha", "#00BAAEFF"], // Alpha 1.0 (FF) instead of 0.8 (CC)
    ["rgb", "rgb(0, 186, 174)"],
    ["rgba", "rgba(0, 186, 174, 1)"], // Alpha 1.0 instead of 0.8
    ["hsl", "hsl(176, 100%, 36%)"],
    ["hsla", "hsla(176, 100%, 36%, 1)"], // Alpha 1.0 and consistent hue with hsl
    ["lab", "lab(68.15, -41.51, -5.07)"],
    ["lch", "lch(67.85% 43.11 187.59)"],
    ["oklab", "oklab(0.7101 -0.1233 -0.0144)"],
    ["oklch", "oklch(71.02% 0.1242 186.67)"],
    ["color", "color(srgb 0 0.729412 0.682353)"], // No alpha since base color has no alpha
    ["hwb", "hwb(176.12903 0% 27.0588%)"], // No alpha since base color has no alpha
]);

/**
 * Test suite for color utility functions
 */
suite("Color Utility Functions", () => {
    /**
     * Format detection tests - verifies automatic format detection
     */
    suite("Format Detection", () => {
        allowedColorFormats.forEach((format) => {
            test(`Detect format: ${format}`, () => {
                const colorString = colors.get(format);
                if (colorString) {
                    const detectedFormat = detectColorFormat(colorString);
                    assert.strictEqual(detectedFormat, format);
                }
            });
        });

        test("Detect invalid format", () => {
            const invalidColor = "not-a-color";
            assert.throws(() => detectColorFormat(invalidColor), Error, undefined, "Invalid color format should throw an error");
        });
    });

    suite("Is valid color", () => {
        colors.forEach((colorString, format) => {
            test(`Valid color: ${format}`, () => {
                assert.isTrue(isValidColor(colorString), `Color string ${colorString} should be valid`);
            });
        });

        test("Invalid color", () => {
            const invalidColor = "not-a-color";
            assert.isFalse(isValidColor(invalidColor), `Color string ${invalidColor} should be invalid`);
        });
    });

    suite("Color Conversion", () => {
        allowedColorFormats.forEach((targetFormat) => {
            allowedColorFormats.forEach((sourceFormat) => {
                const sourceColor = colors.get(sourceFormat);
                const targetColor = colors.get(targetFormat);
                if (sourceColor && targetColor) {
                    test(`Convert ${sourceFormat} to ${targetFormat}`, () => {
                        const convertedColor = convertColor(sourceColor, targetFormat);
                        assert.isTrue(isValidColor(convertedColor), `Converted color ${convertedColor} should be valid`);

                        assert.isTrue(colorsAreEqual(convertedColor, targetColor), `Converted color ${convertedColor} should match expected ${targetColor}`);
                    });
                }
            });
        });
    });

    suite("Color to Object Conversion", () => {
        allowedColorFormats.forEach((targetFormat) => {
            colors.forEach((sourceColor) => {
                const targetColor = colors.get(targetFormat);

                if (!targetColor) return;

                if (targetFormat === "rgb") {
                    const result = toRgbObject(sourceColor);

                    assert.isDefined(result.b);
                    assert.isDefined(result.g);
                    assert.isDefined(result.r);
                } else if (targetFormat === "rgba") {
                    const result = toRgbaObject(sourceColor);

                    assert.isDefined(result.r);
                    assert.isDefined(result.g);
                    assert.isDefined(result.b);
                    assert.isDefined(result.a);
                } else if (targetFormat === "hsl") {
                    const result = toHslObject(sourceColor);

                    assert.isDefined(result.h);
                    assert.isDefined(result.s);
                    assert.isDefined(result.l);
                } else if (targetFormat === "hsla") {
                    const result = toHslaObject(sourceColor);

                    assert.isDefined(result.h);
                    assert.isDefined(result.s);
                    assert.isDefined(result.l);
                    assert.isDefined(result.a);
                } else if (targetFormat === "hwb") {
                    const result = toHwbObject(sourceColor);

                    assert.isDefined(result.h);
                    assert.isDefined(result.w);
                    assert.isDefined(result.b);
                } else if (targetFormat === "oklch") {
                    const result = toOklchObject(sourceColor);

                    assert.isDefined(result.l);
                    assert.isDefined(result.c);
                    assert.isDefined(result.h);
                } else if (targetFormat === "lab") {
                    const result = toLabObject(sourceColor);

                    assert.isDefined(result.l);
                    assert.isDefined(result.a);
                    assert.isDefined(result.b);
                } else if (targetFormat === "lch") {
                    const result = toLchObject(sourceColor);

                    assert.isDefined(result.l);
                    assert.isDefined(result.c);
                    assert.isDefined(result.h);
                } else if (targetFormat === "oklab") {
                    const result = toOklabObject(sourceColor);

                    assert.isDefined(result.l);
                    assert.isDefined(result.a);
                    assert.isDefined(result.b);
                }
            });
        });
    });
});
