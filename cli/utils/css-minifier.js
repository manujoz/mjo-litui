/**
 * CSS Minification utilities
 * Copied from scripts/minify-css.js for CLI usage
 */

/**
 * Conservative CSS minification for standalone CSS files
 * Uses the same pattern as template literals for consistency
 * @param {string} content - CSS content to minify
 * @returns {Object} Minification result with content and savings info
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
 * Format bytes to human readable format
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted string
 */
function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export { formatBytes, minifyStandaloneCSS };
