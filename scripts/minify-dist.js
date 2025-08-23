#!/usr/bin/env node
/* eslint-disable no-console */
import { readdir, readFile, stat, writeFile } from "fs/promises";
import { dirname, join, relative } from "path";
import { minify } from "terser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_PATH = join(__dirname, "..", "dist");
const VERBOSE = process.argv.includes("--verbose") || process.argv.includes("-v");

// Terser configuration optimized for web components
const terserOptions = {
    module: true, // For ES modules
    compress: {
        drop_console: false, // Keep console.log for debugging
        drop_debugger: false,
        pure_funcs: [],
        keep_fargs: false, // Optimize argument names
        passes: 2, // Two passes for better optimization
    },
    mangle: {
        keep_classnames: true, // Important for web components
        keep_fnames: false, // Minify private function names
        reserved: ["customElements", "HTMLElement", "LitElement", "CSSResult"],
        properties: {
            regex: /^_/, // Minify private properties starting with _
        },
    },
    format: {
        comments: false, // Remove comments
        preserve_annotations: false,
    },
    sourceMap: false, // Do not generate additional source maps
};

async function isDirectory(path) {
    try {
        const stats = await stat(path);
        return stats.isDirectory();
    } catch {
        return false;
    }
}

async function minifyFile(filePath) {
    try {
        const content = await readFile(filePath, "utf8");
        const result = await minify(content, terserOptions);

        if (result.code) {
            await writeFile(filePath, result.code, "utf8");
            const relativePath = relative(DIST_PATH, filePath);
            if (VERBOSE) {
                console.log(`✓ Minified: ${relativePath}`);
            }
            return true;
        } else {
            if (VERBOSE) {
                console.warn(`⚠ Warning: No output for ${filePath}`);
            }
            return false;
        }
    } catch (error) {
        const relativePath = relative(DIST_PATH, filePath);
        if (VERBOSE) {
            console.error(`✗ Error minifying ${relativePath}:`, error.message);
        }
        return false;
    }
}

async function processDirectory(dirPath) {
    const entries = await readdir(dirPath);
    let processedFiles = 0;

    for (const entry of entries) {
        const fullPath = join(dirPath, entry);

        if (await isDirectory(fullPath)) {
            processedFiles += await processDirectory(fullPath);
        } else if (entry.endsWith(".js")) {
            const success = await minifyFile(fullPath);
            if (success) processedFiles++;
        }
    }

    return processedFiles;
}

async function main() {
    console.log("🚀 Starting JavaScript minification in dist/ folder...\n");

    try {
        const startTime = Date.now();
        const totalFiles = await processDirectory(DIST_PATH);
        const endTime = Date.now();

        console.log("\n✅ Minification completed!");
        console.log(`   Files processed: ${totalFiles}`);
        console.log(`   Time taken: ${endTime - startTime}ms`);
    } catch (error) {
        console.error("💥 Error during minification:", error);
        process.exit(1);
    }
}

main();
