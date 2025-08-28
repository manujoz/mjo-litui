#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * CSS template literal minification script
 * Runs after JavaScript minification to optimize CSS in template literals
 * and minifies standalone CSS files (theme.min.css)
 */

import { readdir, readFile, stat, writeFile } from "fs/promises";
import { join } from "path";

const DIST_PATH = "dist";
const START_TIME = Date.now();

let filesProcessed = 0;
let cssBlocksMinified = 0;
let cssFilesMinified = 0;
let totalCssSaved = 0;

/**
 * Conservative CSS minification for template literals
 * Preserves critical spaces in calc(), var(), transform(), etc.
 */
function minifyCSSInTemplateStrings(content) {
    // Pattern to match: styles=[letter`...CSS...`]
    const stylePattern = /(styles=\[[a-z]+`)([\s\S]*?)(`\])/g;

    let modifiedContent = content;
    let cssSaved = 0;
    let modifications = 0;

    modifiedContent = modifiedContent.replace(stylePattern, (match, prefix, cssContent, suffix) => {
        const originalLength = cssContent.length;

        // Conservative minification rules
        let minifiedCSS = cssContent
            // Remove line breaks and normalize whitespace
            .replace(/\n\s*/g, " ")
            .replace(/\r/g, "")
            .replace(/ {2,}/g, " ")
            .trim()
            // Remove spaces around braces and semicolons
            .replace(/\s*{\s*/g, "{")
            .replace(/\s*}\s*/g, "}")
            .replace(/;\s+/g, ";")
            .replace(/:\s+/g, ":")
            // Remove CSS comments
            .replace(/\/\*[\s\S]*?\*\//g, "")
            // Final cleanup of multiple spaces
            .replace(/ {2,}/g, " ");

        const newLength = minifiedCSS.length;
        const saved = originalLength - newLength;

        if (saved > 0) {
            cssSaved += saved;
            modifications++;
        }

        return prefix + minifiedCSS + suffix;
    });

    return {
        content: modifiedContent,
        saved: cssSaved,
        modifications,
    };
}

/**
 * Conservative CSS minification for standalone CSS files
 * Uses the same pattern as template literals for consistency
 */
function minifyStandaloneCSS(content) {
    const originalLength = content.length;

    // Apply the same conservative minification rules
    let minifiedCSS = content
        // Remove line breaks and normalize whitespace
        .replace(/\n\s*/g, " ")
        .replace(/\r/g, "")
        .replace(/ {2,}/g, " ")
        .trim()
        // Remove spaces around braces and semicolons
        .replace(/\s*{\s*/g, "{")
        .replace(/\s*}\s*/g, "}")
        .replace(/;\s+/g, ";")
        .replace(/:\s+/g, ":")
        // Remove CSS comments
        .replace(/\/\*[\s\S]*?\*\//g, "")
        // Final cleanup of multiple spaces
        .replace(/ {2,}/g, " ");

    const newLength = minifiedCSS.length;
    const saved = originalLength - newLength;

    return {
        content: minifiedCSS,
        saved: saved > 0 ? saved : 0,
    };
}

/**
 * Process a single file for CSS minification
 */
async function processFile(filePath) {
    try {
        const content = await readFile(filePath, "utf8");

        // Handle CSS files (specifically theme.min.css)
        if (filePath.endsWith(".css") && filePath.includes("theme.min.css")) {
            const cssResult = minifyStandaloneCSS(content);

            if (cssResult.saved > 0) {
                await writeFile(filePath, cssResult.content, "utf8");
                cssFilesMinified++;
                totalCssSaved += cssResult.saved;
            }
            return;
        }

        // Handle JavaScript files with template literals
        if (filePath.endsWith(".js")) {
            const cssResult = minifyCSSInTemplateStrings(content);

            // Only write if there were changes
            if (cssResult.modifications > 0) {
                await writeFile(filePath, cssResult.content, "utf8");
                filesProcessed++;
                cssBlocksMinified += cssResult.modifications;
                totalCssSaved += cssResult.saved;
            }
        }
    } catch (error) {
        console.error(`   ❌ Error processing ${filePath}:`, error.message);
    }
}

/**
 * Recursively find all .js and .css files in directory
 */
async function findFiles(dir) {
    const files = [];
    const items = await readdir(dir);

    for (const item of items) {
        const fullPath = join(dir, item);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
            const subFiles = await findFiles(fullPath);
            files.push(...subFiles);
        } else if (stats.isFile() && (item.endsWith(".js") || (item.endsWith(".css") && item.includes("theme.min.css")))) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Main execution
 */
async function main() {
    console.log("🎨 Starting CSS template literal and standalone CSS minification...");

    try {
        const files = await findFiles(DIST_PATH);

        if (files.length === 0) {
            console.log("❌ No JavaScript or CSS files found in dist/");
            return;
        }

        // Process files in parallel with limited concurrency
        const BATCH_SIZE = 5;
        for (let i = 0; i < files.length; i += BATCH_SIZE) {
            const batch = files.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(processFile));
        }

        const endTime = Date.now();

        if (cssBlocksMinified === 0 && cssFilesMinified === 0) {
            console.log("✅ No CSS template literals or CSS files found to minify.");
        } else {
            console.log("✅ CSS minification completed!");
            if (filesProcessed > 0) {
                console.log(`   JS files with CSS processed: ${filesProcessed}`);
                console.log(`   CSS blocks processed: ${cssBlocksMinified}`);
            }
            if (cssFilesMinified > 0) {
                console.log(`   CSS files minified: ${cssFilesMinified}`);
            }
            console.log(`   CSS space saved: ${(totalCssSaved / 1024).toFixed(1)}KB`);
        }
        console.log(`   Time taken: ${endTime - START_TIME}ms`);
    } catch (error) {
        console.error("❌ CSS minification failed:", error.message);
        process.exit(1);
    }
}

main();
