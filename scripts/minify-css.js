#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * CSS template literal minification script
 * Runs after JavaScript minification to optimize CSS in template literals
 */

import { readdir, readFile, stat, writeFile } from "fs/promises";
import { join } from "path";

const DIST_PATH = "dist";
const START_TIME = Date.now();

let filesProcessed = 0;
let cssBlocksMinified = 0;
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
 * Process a single JavaScript file for CSS minification
 */
async function processFile(filePath) {
    try {
        const content = await readFile(filePath, "utf8");

        // Only minify CSS in template literals
        const cssResult = minifyCSSInTemplateStrings(content);

        // Only write if there were changes
        if (cssResult.modifications > 0) {
            await writeFile(filePath, cssResult.content, "utf8");
            filesProcessed++;
            cssBlocksMinified += cssResult.modifications;
            totalCssSaved += cssResult.saved;
        }
    } catch (error) {
        console.error(`   ❌ Error processing ${filePath}:`, error.message);
    }
}

/**
 * Recursively find all .js files in directory
 */
async function findJsFiles(dir) {
    const files = [];
    const items = await readdir(dir);

    for (const item of items) {
        const fullPath = join(dir, item);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
            const subFiles = await findJsFiles(fullPath);
            files.push(...subFiles);
        } else if (stats.isFile() && item.endsWith(".js")) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Main execution
 */
async function main() {
    console.log("🎨 Starting CSS template literal minification...");

    try {
        const jsFiles = await findJsFiles(DIST_PATH);

        if (jsFiles.length === 0) {
            console.log("❌ No JavaScript files found in dist/");
            return;
        }

        // Process files in parallel with limited concurrency
        const BATCH_SIZE = 5;
        for (let i = 0; i < jsFiles.length; i += BATCH_SIZE) {
            const batch = jsFiles.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(processFile));
        }

        const endTime = Date.now();

        if (cssBlocksMinified === 0) {
            console.log("✅ No CSS template literals found to minify.");
        } else {
            console.log("✅ CSS minification completed!");
            console.log(`   Files with CSS processed: ${filesProcessed}`);
            console.log(`   CSS blocks processed: ${cssBlocksMinified}`);
            console.log(`   CSS space saved: ${(totalCssSaved / 1024).toFixed(1)}KB`);
        }
        console.log(`   Time taken: ${endTime - START_TIME}ms`);
    } catch (error) {
        console.error("❌ CSS minification failed:", error.message);
        process.exit(1);
    }
}

main();
