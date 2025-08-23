// Icon Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoIconClickEvent, MjoIconErrorEvent, MjoIconLoadEvent } from "../../src/types/mjo-icon";

// Playground interactions
function changeIconProp(prop: string, value: string | boolean): void {
    const icon = document.getElementById("playground-icon");
    if (!icon) return;

    if (typeof value === "string") {
        if (prop === "aria-label") {
            icon.setAttribute("aria-label", value || "Interactive icon");
        } else {
            icon.setAttribute(prop, value);
        }
    } else {
        if (value) {
            icon.setAttribute(prop, "");
        } else {
            icon.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all icons
    document.querySelectorAll("mjo-icon").forEach((icon) => {
        // Click events (only for clickable icons)
        icon.addEventListener("mjo-icon:click", handleIconClick);

        // Load events
        icon.addEventListener("mjo-icon:load", handleIconLoad);

        // Error events
        icon.addEventListener("mjo-icon:error", handleIconError);
    });

    // Add special interactions for interactive examples
    initializeInteractiveExamples();
});

// Handle icon click events
const handleIconClick = (ev: Event) => {
    const event = ev as MjoIconClickEvent;
    const element = event.detail.element;

    // Get the aria-label or create a generic message
    const label = element.getAttribute("aria-label") || "Icon";

    // Show different behaviors based on the icon type
    if (element.classList.contains("interactive-heart")) {
        toggleHeartIcon(element);
    } else if (element.classList.contains("interactive-star")) {
        toggleStarIcon(element);
    } else if (element.classList.contains("interactive-settings")) {
        showSettingsMessage();
    } else {
        // Generic click feedback
        console.log(`🖱️ Icon clicked: ${label}`);
        showToast(`Clicked: ${label}`);
    }
};

// Handle icon load events
const handleIconLoad = (ev: Event) => {
    const event = ev as MjoIconLoadEvent;
    console.log(`✅ Icon loaded successfully:`, event.detail.src);
};

// Handle icon error events
const handleIconError = (ev: Event) => {
    const event = ev as MjoIconErrorEvent;
    console.error(`❌ Icon error:`, event.detail.error);
    showToast(`Icon Error: ${event.detail.error}`, "error");
};

// Interactive example behaviors
function initializeInteractiveExamples(): void {
    // Heart icon state management
    let heartLiked = false;
    const heartIcon = document.querySelector(".interactive-heart") as HTMLElement;
    if (heartIcon) {
        heartIcon.dataset.liked = heartLiked.toString();
    }

    // Star icon state management
    let starRated = false;
    const starIcon = document.querySelector(".interactive-star") as HTMLElement;
    if (starIcon) {
        starIcon.dataset.rated = starRated.toString();
    }
}

// Toggle heart icon state
function toggleHeartIcon(element: Element): void {
    const isLiked = element.getAttribute("data-liked") === "true";
    const newState = !isLiked;

    element.setAttribute("data-liked", newState.toString());

    if (newState) {
        element.setAttribute("style", "color: #e74c3c; transform: scale(1.2);");
        showToast("❤️ Liked!", "success");
    } else {
        element.setAttribute("style", "color: #bdc3c7; transform: scale(1);");
        showToast("💔 Unliked", "info");
    }

    // Reset transform after animation
    setTimeout(() => {
        const currentStyle = element.getAttribute("style") || "";
        const newStyle = currentStyle.replace("transform: scale(1.2);", "").replace("transform: scale(1);", "");
        element.setAttribute("style", newStyle);
    }, 300);
}

// Toggle star icon state
function toggleStarIcon(element: Element): void {
    const isRated = element.getAttribute("data-rated") === "true";
    const newState = !isRated;

    element.setAttribute("data-rated", newState.toString());

    if (newState) {
        element.setAttribute("style", "color: #f39c12; transform: scale(1.15) rotate(15deg);");
        showToast("⭐ Rated!", "success");
    } else {
        element.setAttribute("style", "color: #bdc3c7; transform: scale(1) rotate(0deg);");
        showToast("⭐ Rating removed", "info");
    }

    // Reset transform after animation
    setTimeout(() => {
        const currentStyle = element.getAttribute("style") || "";
        const newStyle = currentStyle.replace(/transform: scale\([^)]+\) rotate\([^)]+\);?/g, "");
        element.setAttribute("style", newStyle);
    }, 300);
}

// Show settings message
function showSettingsMessage(): void {
    showToast("⚙️ Settings clicked! (Demo only)", "info");
}

// Toast notification helper
function showToast(message: string, type: "success" | "error" | "info" = "info"): void {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Style the toast
    Object.assign(toast.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 20px",
        borderRadius: "6px",
        color: "white",
        fontWeight: "500",
        fontSize: "14px",
        zIndex: "10000",
        transition: "all 0.3s ease",
        opacity: "0",
        transform: "translateX(100%)",
    });

    // Set background color based on type
    switch (type) {
        case "success":
            toast.style.backgroundColor = "#27ae60";
            break;
        case "error":
            toast.style.backgroundColor = "#e74c3c";
            break;
        case "info":
        default:
            toast.style.backgroundColor = "#3498db";
            break;
    }

    // Add to DOM
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(0)";
    });

    // Remove after delay
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Make functions globally available
window.changeIconProp = changeIconProp;

// Type declarations
declare global {
    interface Window {
        changeIconProp: (prop: string, value: string | boolean) => void;
    }
}
