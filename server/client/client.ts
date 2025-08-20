/**
 * Client entry point for SSR hydration
 * Imports all components needed for hydration
 */

import "../../src/mjo-avatar.js";
import "../../src/mjo-chip.js";
import "../../src/mjo-theme.js";

// Function to initialize theme after hydration
function initializeTheme(): void {
    const savedTheme = localStorage.getItem("mjo-theme") || "light";
    const themeComponent = document.querySelector("mjo-theme");

    if (themeComponent) {
        (themeComponent as any).theme = savedTheme;
    }

    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
        toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }
}

// Global function to toggle theme (called from HTML)
(window as any).toggleTheme = function (): void {
    const themeComponent = document.querySelector("mjo-theme");
    if (themeComponent) {
        const currentTheme = (themeComponent as any).theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        (themeComponent as any).theme = newTheme;
        localStorage.setItem("mjo-theme", newTheme);

        const toggleBtn = document.querySelector(".theme-toggle");
        if (toggleBtn) {
            toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
        }
    } else {
        console.warn("⚠️ mjo-theme component not found");
    }
};

// Initialize theme when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
});

// Also initialize after a short delay to ensure hydration
setTimeout(() => {
    initializeTheme();
}, 100);
