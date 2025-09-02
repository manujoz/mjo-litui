// Menu Button Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoMenuButtonCloseEvent, MjoMenuButtonOpenEvent, MjoMenuButtonToggleEvent } from "../../src/types/mjo-menu-button";

// Playground interactions
function changeMenuButtonProp(prop: string, value: string | boolean): void {
    const menuButton = document.getElementById("playground-menu-button");
    if (!menuButton) return;

    if (typeof value === "string") {
        if (value === "") {
            menuButton.removeAttribute(prop);
        } else {
            menuButton.setAttribute(prop, value);
        }
    } else {
        if (value) {
            menuButton.setAttribute(prop, "");
        } else {
            menuButton.removeAttribute(prop);
        }
    }
}

// Action functions for manual control
function toggleMenuButton(): void {
    const menuButton = document.getElementById("playground-menu-button") as any;
    if (menuButton && typeof menuButton.toggle === "function") {
        menuButton.toggle();
    }
}

function openMenuButton(): void {
    const menuButton = document.getElementById("playground-menu-button") as any;
    if (menuButton && typeof menuButton.open === "function") {
        menuButton.open();
    }
}

function closeMenuButton(): void {
    const menuButton = document.getElementById("playground-menu-button") as any;
    if (menuButton && typeof menuButton.close === "function") {
        menuButton.close();
    }
}

function focusMenuButton(): void {
    const menuButton = document.getElementById("playground-menu-button") as any;
    if (menuButton && typeof menuButton.focus === "function") {
        menuButton.focus();
    }
}

// Navigation demo integration
function setupNavigationDemo(): void {
    const navMenuButton = document.getElementById("nav-menu-button");
    const navMenu = document.getElementById("main-nav-menu");

    if (navMenuButton && navMenu) {
        navMenuButton.addEventListener("click", () => {
            const isCurrentlyHidden = navMenu.hasAttribute("hidden");
            if (isCurrentlyHidden) {
                navMenu.removeAttribute("hidden");
            } else {
                navMenu.setAttribute("hidden", "");
            }
        });

        // Also listen to custom events for programmatic control
        navMenuButton.addEventListener("mjo-menu-button:toggle", (event: Event) => {
            const customEvent = event as MjoMenuButtonToggleEvent;
            if (customEvent.detail.isOpen) {
                navMenu.removeAttribute("hidden");
            } else {
                navMenu.setAttribute("hidden", "");
            }
        });
    }
}

// Event logging for demo purposes
function logMenuButtonEvent(eventName: string, detail: any): void {
    console.log(`Menu Button Event: ${eventName}`, detail);

    // Show a subtle notification (optional)
    const notification = document.createElement("div");
    notification.textContent = `Event: ${eventName} (isOpen: ${detail.isOpen})`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--mjo-primary-color, #1aa8ed);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";
    });

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(-10px)";
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Setup playground menu button events
    const playgroundMenuButton = document.getElementById("playground-menu-button");
    if (playgroundMenuButton) {
        playgroundMenuButton.addEventListener("mjo-menu-button:toggle", (event: Event) => {
            const toggleEvent = event as MjoMenuButtonToggleEvent;
            logMenuButtonEvent("toggle", toggleEvent.detail);
        });

        playgroundMenuButton.addEventListener("mjo-menu-button:open", (event: Event) => {
            const openEvent = event as MjoMenuButtonOpenEvent;
            logMenuButtonEvent("open", openEvent.detail);
        });

        playgroundMenuButton.addEventListener("mjo-menu-button:close", (event: Event) => {
            const closeEvent = event as MjoMenuButtonCloseEvent;
            logMenuButtonEvent("close", closeEvent.detail);
        });
    }

    // Setup navigation demo
    setupNavigationDemo();

    // Add event listeners to all menu buttons on the page
    document.querySelectorAll("mjo-menu-button").forEach((menuButton) => {
        menuButton.addEventListener("click", (event: Event) => {
            console.log("Menu button clicked:", event.target);
        });

        // Add event listeners for custom events
        menuButton.addEventListener("mjo-menu-button:toggle", (event: Event) => {
            const toggleEvent = event as MjoMenuButtonToggleEvent;
            console.log("Menu button toggled:", toggleEvent.detail);
        });
    });

    // Add keyboard shortcuts for playground demo
    document.addEventListener("keydown", (event: KeyboardEvent) => {
        // Only activate shortcuts when not focusing on input elements
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
            return;
        }

        switch (event.key) {
            case "t":
            case "T":
                if (event.ctrlKey || event.metaKey) return;
                event.preventDefault();
                toggleMenuButton();
                break;
            case "o":
            case "O":
                if (event.ctrlKey || event.metaKey) return;
                event.preventDefault();
                openMenuButton();
                break;
            case "c":
            case "C":
                if (event.ctrlKey || event.metaKey) return;
                event.preventDefault();
                closeMenuButton();
                break;
            case "f":
            case "F":
                if (event.ctrlKey || event.metaKey) return;
                event.preventDefault();
                focusMenuButton();
                break;
        }
    });

    // Show keyboard shortcuts hint
    console.log("Menu Button Playground Shortcuts:");
    console.log("T - Toggle menu button");
    console.log("O - Open menu button");
    console.log("C - Close menu button");
    console.log("F - Focus menu button");
});

// Make functions globally available
window.changeMenuButtonProp = changeMenuButtonProp;
window.toggleMenuButton = toggleMenuButton;
window.openMenuButton = openMenuButton;
window.closeMenuButton = closeMenuButton;
window.focusMenuButton = focusMenuButton;

// Type declarations for global functions
declare global {
    interface Window {
        changeMenuButtonProp: (prop: string, value: string | boolean) => void;
        toggleMenuButton: () => void;
        openMenuButton: () => void;
        closeMenuButton: () => void;
        focusMenuButton: () => void;
    }
}
