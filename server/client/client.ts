import type { MjoTheme } from "../../src/mjo-theme.js";

import Cookies from "js-cookie";

/**
 * Client entry point for SSR hydration
 */
import "../../src/mjo-accordion.js";
import "../../src/mjo-alert.js";
import "../../src/mjo-avatar.js";
import "../../src/mjo-button.js";
import "../../src/mjo-calendar.js";
import "../../src/mjo-card.js";
import "../../src/mjo-checkbox.js";
import "../../src/mjo-chip.js";
import "../../src/mjo-color-picker.js";
import "../../src/mjo-date-picker.js";
import "../../src/mjo-drawer.js";
import "../../src/mjo-dropdown.js";
import "../../src/mjo-form.js";
import "../../src/mjo-grid.js";
import "../../src/mjo-icon.js";
import "../../src/mjo-image.js";
import "../../src/mjo-menu-button.js";
import "../../src/mjo-message.js";
import "../../src/mjo-modal.js";
import "../../src/mjo-notification.js";
import "../../src/mjo-radio.js";
import "../../src/mjo-ripple.js";
import "../../src/mjo-slider.js";
import "../../src/mjo-switch.js";
import "../../src/mjo-text-nowrap.js";
import "../../src/mjo-textfield.js";
import "../../src/mjo-theme.js";
import "../../src/mjo-typography.js";

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
