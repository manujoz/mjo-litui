// Image Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoImageClickEvent, MjoImageErrorEvent, MjoImageLoadEvent } from "../../src/types/mjo-image";

// Playground interactions
function changeImageProp(prop: string, value: string | boolean): void {
    const image = document.getElementById("playground-image");
    if (!image) return;

    if (typeof value === "string") {
        if (value === "") {
            image.removeAttribute(prop);
        } else {
            image.setAttribute(prop, value);
        }
    } else {
        if (value) {
            image.setAttribute(prop, "");
        } else {
            image.removeAttribute(prop);
        }
    }

    // Update input field if it's the src change
    if (prop === "src") {
        const srcInput = document.querySelector('input[placeholder="Enter image URL..."]') as HTMLInputElement;
        if (srcInput && typeof value === "string") {
            srcInput.value = value;
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all mjo-image components
    document.querySelectorAll("mjo-image").forEach((image) => {
        // Load event
        image.addEventListener("mjo-image:load", (ev: Event) => {
            const event = ev as MjoImageLoadEvent;
            console.log("✅ Image loaded:", {
                src: event.detail.src,
                dimensions: `${event.detail.naturalWidth}x${event.detail.naturalHeight}`,
            });

            // Show a subtle notification for the playground image
            if ((event.detail.element as unknown as HTMLElement).id === "playground-image") {
                showNotification("✅ Image loaded successfully!", "success");
            }
        });

        // Error event
        image.addEventListener("mjo-image:error", (ev: Event) => {
            const event = ev as MjoImageErrorEvent;
            console.log("❌ Image error:", {
                src: event.detail.src,
                error: event.detail.error,
            });

            // Show a notification for the playground image
            if ((event.detail.element as unknown as HTMLElement).id === "playground-image") {
                showNotification("❌ Failed to load image", "error");
            }
        });

        // Click event
        image.addEventListener("mjo-image:click", (ev: Event) => {
            const event = ev as MjoImageClickEvent;
            console.log("🖱️ Image clicked:", {
                src: event.detail.src,
            });

            // Show click notification
            showNotification(`🖱️ Image clicked: ${event.detail.src}`, "info");
        });
    });

    // Add intersection observer for lazy loading demo
    setupLazyLoadingDemo();
});

// Helper function to show notifications
function showNotification(message: string, type: "success" | "error" | "info" = "info"): void {
    // Remove existing notification
    const existingNotification = document.querySelector(".image-notification");
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `image-notification ${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 16px",
        borderRadius: "8px",
        color: "white",
        fontWeight: "500",
        zIndex: "9999",
        maxWidth: "300px",
        wordWrap: "break-word",
        backgroundColor: type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transform: "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Setup intersection observer for lazy loading demo
function setupLazyLoadingDemo(): void {
    const lazyImages = document.querySelectorAll(".lazy-loading-demo mjo-image");

    if (lazyImages.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLElement;
                    console.log("👀 Lazy image came into view:", img.getAttribute("src"));
                    showNotification("👀 Lazy image loaded into viewport", "info");
                }
            });
        },
        {
            rootMargin: "50px",
        },
    );

    lazyImages.forEach((img) => observer.observe(img));
}

// Make functions globally available
window.changeImageProp = changeImageProp;

// Global declarations
declare global {
    interface Window {
        changeImageProp: (prop: string, value: string | boolean) => void;
    }
}
