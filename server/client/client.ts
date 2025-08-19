/**
 * Client entry point for SSR hydration
 * Imports all components needed for hydration
 */

console.log("🎨 mjo-litui client components loaded for hydration");

import "../../src/mjo-avatar.js";
import "../../src/mjo-chip.js";
import "../../src/mjo-theme.js";

// Function to initialize theme after hydration
function initializeTheme(): void {
    const savedTheme = localStorage.getItem("mjo-theme") || "light";
    const themeComponent = document.querySelector("mjo-theme");

    if (themeComponent) {
        (themeComponent as any).theme = savedTheme;
        console.log("🎨 Theme initialized from client:", savedTheme);
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

        console.log("🎨 Theme changed to:", newTheme);
    } else {
        console.warn("⚠️ mjo-theme component not found");
    }
};

// Initialize theme when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM ready, initializing theme...");
    initializeTheme();
});

// Also initialize after a short delay to ensure hydration
setTimeout(() => {
    initializeTheme();
}, 100);
