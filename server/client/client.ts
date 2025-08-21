/**
 * Client entry point for SSR hydration
 * Imports all components needed for hydration
 */
import type { MjoTheme } from "../../src/mjo-theme.js";

import Cookies from "js-cookie";

import "../../src/mjo-avatar.js";
import "../../src/mjo-chip.js";
import "../../src/mjo-theme.js";

// Function to initialize theme after hydration
function initializeTheme(tries = 1): void {
    const themeComponent = document.querySelector("mjo-theme") as MjoTheme;
    if (!themeComponent) {
        if (tries > 5) {
            console.error("Failed to find mjo-theme component");
            return;
        }

        setTimeout(() => {
            initializeTheme(tries + 1);
        }, 100);
        return;
    }

    let savedTheme = Cookies.get("mjo-theme");
    if (themeComponent && !savedTheme) {
        savedTheme = themeComponent.theme || "light";
    } else if (!savedTheme) {
        savedTheme = "light";
    }

    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
        toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }

    themeComponent.addEventListener("mjo-theme-change", (ev) => {
        const newTheme = ev.detail.theme;
        if (toggleBtn) {
            toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
        }
    });
}

// Global function to toggle theme (called from HTML)
(window as any).toggleTheme = function (): void {
    const themeComponent = document.querySelector("mjo-theme") as MjoTheme;
    if (themeComponent) {
        const currentTheme = themeComponent.theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        themeComponent.theme = newTheme;
    } else {
        console.warn("⚠️ mjo-theme component not found");
    }
};

// Initialize theme when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
});
