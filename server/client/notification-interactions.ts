// Notification Interactive Demo TypeScript
// This functionality loads after client hydration

import type { MjoNotification } from "../../src/mjo-notification.js";

let animationsDisabled = false;

/**
 * Show a basic notification with specified type and content
 */
function showNotification(type: string, title: string, message: string): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    notification.controller.show({
        title,
        message,
        type: type as any,
        time: 4000,
        onClose: () => {
            console.log(`${type || "basic"} notification closed`);
        },
    });
}

/**
 * Show notification in different position
 */
function showPositionNotification(position: string, title: string): void {
    const notification = document.getElementById("position-notification") as MjoNotification;
    if (!notification) return;

    // Update position
    notification.position = position as any;
    notification.controller.setPosition(position as any);

    notification.controller.show({
        title: `${title} Position`,
        message: `This notification appears in the ${position} position`,
        type: "info",
        time: 3000,
    });
}

/**
 * Show notification with specific timing
 */
function showTimedNotification(time: number, title: string, message: string): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    notification.controller.show({
        title,
        message,
        type: "info",
        time,
    });
}

/**
 * Show persistent notification (no auto-close)
 */
function showPersistentNotification(title: string, message: string): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    notification.controller.show({
        title,
        message,
        type: "warning",
        // No time property = stays until manually closed
    });
}

/**
 * Show notification with rich HTML content
 */
function showRichContentNotification(): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    const richContent = `
        <div>
            <p>This notification contains <strong>rich HTML content</strong>.</p>
            <p style="margin-top: 0.5rem;">
                <small style="color: var(--mjo-text-color-low, #666);">
                    HTML formatting is fully supported in notification messages.
                </small>
            </p>
        </div>
    `;

    notification.controller.show({
        title: "Rich Content",
        message: richContent,
        type: "info",
        time: 6000,
    });
}

/**
 * Show notification with action buttons
 */
function showActionNotification(): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    const actionContent = `
        <div>
            <p>Do you want to proceed with this action?</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <mjo-button size="small" color="success" onclick="handleNotificationAction('proceed')">Proceed</mjo-button>
                <mjo-button size="small" variant="ghost" onclick="handleNotificationAction('cancel')">Cancel</mjo-button>
            </div>
        </div>
    `;

    notification.controller.show({
        title: "Action Required",
        message: actionContent,
        type: "warning",
        time: 8000,
    });
}

/**
 * Handle notification action button clicks
 */
function handleNotificationAction(action: string): void {
    alert(`Action selected: ${action}`);
    clearAllNotifications();
}

/**
 * Show multiple notifications to test threshold
 */
function showMultipleNotifications(): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    const messages = [
        { title: "First", message: "This is the first notification", type: "info" },
        { title: "Second", message: "This is the second notification", type: "success" },
        { title: "Third", message: "This is the third notification", type: "warning" },
        { title: "Fourth", message: "This is the fourth notification", type: "error" },
        { title: "Fifth", message: "This should push out the first one", type: "info" },
        { title: "Sixth", message: "This should push out the second one", type: "success" },
    ];

    messages.forEach((msg, index) => {
        setTimeout(() => {
            notification.controller.show({
                title: msg.title,
                message: msg.message,
                type: msg.type as any,
                time: 10000,
            });
        }, index * 500);
    });
}

/**
 * Clear all notifications from all containers
 */
function clearAllNotifications(): void {
    const defaultNotification = document.getElementById("default-notification") as MjoNotification;
    const positionNotification = document.getElementById("position-notification") as MjoNotification;

    if (defaultNotification) {
        defaultNotification.clearAll();
    }

    if (positionNotification) {
        positionNotification.clearAll();
    }

    console.log("All notifications cleared");
}

/**
 * Announce message to screen readers only
 */
function announceMessage(): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    notification.announce("This message was announced to screen readers without showing a visual notification");

    // Show a visual confirmation
    setTimeout(() => {
        notification.controller.show({
            title: "Screen Reader Announcement",
            message: "A message was announced to screen readers (check console for details)",
            type: "info",
            time: 3000,
        });
    }, 500);
}

/**
 * Show notification with specific accessibility settings
 */
function showAccessibleNotification(ariaLive: string): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    // Update aria-live setting
    notification.ariaLive = ariaLive as any;
    notification.setAttribute("aria-live", ariaLive);

    notification.controller.show({
        title: `${ariaLive.charAt(0).toUpperCase() + ariaLive.slice(1)} Notification`,
        message: `This notification uses aria-live="${ariaLive}" for screen reader announcements`,
        type: ariaLive === "assertive" ? "warning" : "info",
        time: 5000,
    });
}

/**
 * Toggle animations on/off
 */
function toggleAnimations(): void {
    const notifications = [
        document.getElementById("default-notification") as MjoNotification,
        document.getElementById("position-notification") as MjoNotification,
    ];

    animationsDisabled = !animationsDisabled;

    notifications.forEach((notification) => {
        if (notification) {
            notification.disableAnimations = animationsDisabled;
            if (animationsDisabled) {
                notification.setAttribute("disable-animations", "");
            } else {
                notification.removeAttribute("disable-animations");
            }
        }
    });

    // Show confirmation
    const defaultNotification = document.getElementById("default-notification") as MjoNotification;
    if (defaultNotification) {
        defaultNotification.controller.show({
            title: "Animation Settings",
            message: `Animations are now ${animationsDisabled ? "disabled" : "enabled"}`,
            type: "info",
            time: 2000,
        });
    }
}

/**
 * Show notification with callback handling
 */
function showNotificationWithCallback(): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    notification.controller.show({
        title: "Callback Example",
        message: "This notification will trigger a callback when closed",
        type: "info",
        time: 4000,
        onClose: () => {
            alert("Notification was closed! This is the callback function.");
        },
    });
}

/**
 * Show programmatic control example
 */
function showProgrammaticControl(): void {
    const notification = document.getElementById("default-notification") as MjoNotification;
    if (!notification) return;

    notification.controller
        .show({
            title: "Programmatic Control",
            message: "This notification will be closed programmatically in 2 seconds",
            type: "success",
        })
        .then((notificationItem) => {
            // Close programmatically after 2 seconds
            setTimeout(() => {
                notificationItem.close();
                console.log("Notification closed programmatically");
            }, 2000);
        });
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("Notification interactions initialized");

    // Set up global error handling for demonstration
    window.addEventListener("error", (event) => {
        const notification = document.getElementById("default-notification") as MjoNotification;
        if (notification) {
            notification.controller.show({
                title: "JavaScript Error",
                message: `An error occurred: ${event.message}`,
                type: "error",
                time: 5000,
            });
        }
    });
});

// Make functions globally available
(window as any).showNotification = showNotification;
(window as any).showPositionNotification = showPositionNotification;
(window as any).showTimedNotification = showTimedNotification;
(window as any).showPersistentNotification = showPersistentNotification;
(window as any).showRichContentNotification = showRichContentNotification;
(window as any).showActionNotification = showActionNotification;
(window as any).handleNotificationAction = handleNotificationAction;
(window as any).showMultipleNotifications = showMultipleNotifications;
(window as any).clearAllNotifications = clearAllNotifications;
(window as any).announceMessage = announceMessage;
(window as any).showAccessibleNotification = showAccessibleNotification;
(window as any).toggleAnimations = toggleAnimations;
(window as any).showNotificationWithCallback = showNotificationWithCallback;
(window as any).showProgrammaticControl = showProgrammaticControl;

// TypeScript global declarations
declare global {
    interface Window {
        showNotification: (type: string, title: string, message: string) => void;
        showPositionNotification: (position: string, title: string) => void;
        showTimedNotification: (time: number, title: string, message: string) => void;
        showPersistentNotification: (title: string, message: string) => void;
        showRichContentNotification: () => void;
        showActionNotification: () => void;
        handleNotificationAction: (action: string) => void;
        showMultipleNotifications: () => void;
        clearAllNotifications: () => void;
        announceMessage: () => void;
        showAccessibleNotification: (ariaLive: string) => void;
        toggleAnimations: () => void;
        showNotificationWithCallback: () => void;
        showProgrammaticControl: () => void;
    }
}
