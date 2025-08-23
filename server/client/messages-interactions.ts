// Messages Interactive Demo TypeScript
// This functionality loads after client hydration

// Basic message types
function showInfoMessage(): void {
    const message = document.getElementById("info-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "This is an informational message with helpful details",
        type: "info",
        time: 3000,
    });
}

function showSuccessMessage(): void {
    const message = document.getElementById("success-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Operation completed successfully!",
        type: "success",
        time: 4000,
    });
}

function showWarningMessage(): void {
    const message = document.getElementById("warning-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Please review your settings before continuing",
        type: "warning",
        time: 5000,
    });
}

function showErrorMessage(): void {
    const message = document.getElementById("error-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "An error occurred while processing your request",
        type: "error",
        time: 6000,
    });
}

// Custom duration examples
function showQuickMessage(): void {
    const message = document.getElementById("quick-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Quick feedback message",
        type: "info",
        time: 1000,
    });
}

function showLongMessage(): void {
    const message = document.getElementById("long-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "This important message will stay visible for a longer time to ensure you read it",
        type: "warning",
        time: 10000,
    });
}

function showPersistentMessage(): void {
    const message = document.getElementById("persistent-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Critical system notification - please take immediate action",
        type: "error",
        time: 30000,
    });
}

// Message queue behavior
function showMultipleMessages(): void {
    const message = document.getElementById("multi-message") as any;
    if (!message?.controller) return;

    const messages = [
        { text: "First message in queue", type: "info" as const },
        { text: "Second message added", type: "success" as const },
        { text: "Third message appears", type: "warning" as const },
        { text: "Fourth message shown", type: "error" as const },
        { text: "Fifth message (replaces first)", type: "info" as const },
    ];

    messages.forEach((msg, index) => {
        setTimeout(() => {
            message.controller.show({
                message: `${msg.text} (#${index + 1})`,
                type: msg.type,
                time: 8000,
            });
        }, index * 1000);
    });
}

function showRapidMessages(): void {
    const message = document.getElementById("rapid-message") as any;
    if (!message?.controller) return;

    for (let i = 1; i <= 6; i++) {
        setTimeout(() => {
            message.controller.show({
                message: `Rapid message #${i}`,
                type: i % 2 === 0 ? "success" : "info",
                time: 3000,
            });
        }, i * 300);
    }
}

function showMixedMessages(): void {
    const message = document.getElementById("mixed-message") as any;
    if (!message?.controller) return;

    const types = ["info", "success", "warning", "error", "info", "success"] as const;

    types.forEach((type, index) => {
        setTimeout(() => {
            message.controller.show({
                message: `Mixed type message: ${type.toUpperCase()}`,
                type: type,
                time: 5000,
            });
        }, index * 800);
    });
}

// Accessibility features
function showPoliteMessage(): void {
    const message = document.getElementById("polite-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "This message will be announced politely to screen readers",
        type: "success",
        time: 4000,
    });
}

function showAssertiveMessage(): void {
    const message = document.getElementById("assertive-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "URGENT: This message demands immediate attention!",
        type: "error",
        time: 6000,
    });
}

function showCustomRegionMessage(): void {
    const message = document.getElementById("custom-region") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Application status: All systems operational",
        type: "info",
        time: 4000,
    });
}

// Form integration examples
function validateForm(): void {
    const emailInput = document.getElementById("email-input") as HTMLInputElement;
    const message = document.getElementById("validation-message") as any;
    if (!message?.controller || !emailInput) return;

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        message.controller.show({
            message: "Email is required",
            type: "error",
            time: 4000,
        });
    } else if (!emailRegex.test(email)) {
        message.controller.show({
            message: "Please enter a valid email address",
            type: "warning",
            time: 4000,
        });
    } else {
        message.controller.show({
            message: "Email format is valid!",
            type: "success",
            time: 3000,
        });
    }
}

function simulateSave(): void {
    const dataInput = document.getElementById("data-input") as HTMLInputElement;
    const message = document.getElementById("save-message") as any;
    if (!message?.controller || !dataInput) return;

    const data = dataInput.value.trim();

    if (!data) {
        message.controller.show({
            message: "Please enter some data to save",
            type: "warning",
            time: 3000,
        });
        return;
    }

    message.controller.show({
        message: "Saving data...",
        type: "info",
        time: 1000,
    });

    setTimeout(() => {
        message.controller.show({
            message: "Data saved successfully!",
            type: "success",
            time: 3000,
            onClose: () => {
                dataInput.value = "";
            },
        });
    }, 1200);
}

function simulateAsyncOperation(): void {
    const button = document.getElementById("async-btn") as HTMLButtonElement;
    const message = document.getElementById("async-message") as any;
    if (!message?.controller || !button) return;

    button.disabled = true;
    button.textContent = "Processing...";

    message.controller.show({
        message: "Starting background process...",
        type: "info",
        time: 2000,
    });

    setTimeout(() => {
        message.controller.show({
            message: "Process 50% complete...",
            type: "info",
            time: 2000,
        });
    }, 2000);

    setTimeout(() => {
        message.controller.show({
            message: "Process completed successfully!",
            type: "success",
            time: 4000,
            onClose: () => {
                button.disabled = false;
                button.textContent = "Start Process";
            },
        });
    }, 4000);
}

// Callback examples
function showCallbackMessage(): void {
    const message = document.getElementById("callback-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "This message will trigger a callback when closed",
        type: "warning",
        time: 4000,
        onClose: () => {
            alert("Message callback executed!");
        },
    });
}

function showChainedMessages(): void {
    const message = document.getElementById("chain-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "First message in chain",
        type: "info",
        time: 2000,
        onClose: () => {
            message.controller.show({
                message: "Second message triggered by first",
                type: "success",
                time: 2000,
                onClose: () => {
                    message.controller.show({
                        message: "Final message in chain",
                        type: "warning",
                        time: 3000,
                    });
                },
            });
        },
    });
}

function showConfirmationSequence(): void {
    const message = document.getElementById("confirm-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Are you sure you want to delete this item?",
        type: "warning",
        time: 6000,
        onClose: () => {
            message.controller.show({
                message: "Item deletion confirmed",
                type: "info",
                time: 2000,
                onClose: () => {
                    message.controller.show({
                        message: "Item deleted successfully",
                        type: "success",
                        time: 3000,
                    });
                },
            });
        },
    });
}

// Custom configuration examples
function showLimitedQueue(): void {
    const message = document.getElementById("limited-message") as any;
    if (!message?.controller) return;

    for (let i = 1; i <= 4; i++) {
        setTimeout(() => {
            message.controller.show({
                message: `Limited queue message ${i} (max 2)`,
                type: i % 2 === 0 ? "success" : "info",
                time: 6000,
            });
        }, i * 800);
    }
}

function showLargeQueue(): void {
    const message = document.getElementById("large-message") as any;
    if (!message?.controller) return;

    for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
            message.controller.show({
                message: `Large queue message ${i} (max 6)`,
                type: ["info", "success", "warning", "error"][i % 4] as any,
                time: 8000,
            });
        }, i * 600);
    }
}

function showSilentMessage(): void {
    const message = document.getElementById("silent-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "This message won't be announced to screen readers",
        type: "info",
        time: 4000,
    });
}

// Real-world scenarios
function simulateFileUpload(): void {
    const message = document.getElementById("upload-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Preparing file upload...",
        type: "info",
        time: 1500,
    });

    setTimeout(() => {
        message.controller.show({
            message: "Uploading file... 0%",
            type: "info",
            time: 1500,
        });
    }, 1000);

    setTimeout(() => {
        message.controller.show({
            message: "Upload progress: 50%",
            type: "info",
            time: 1500,
        });
    }, 2500);

    setTimeout(() => {
        message.controller.show({
            message: "Upload progress: 100%",
            type: "success",
            time: 1500,
        });
    }, 4000);

    setTimeout(() => {
        message.controller.show({
            message: "File uploaded successfully!",
            type: "success",
            time: 3000,
        });
    }, 5500);
}

function simulateNetworkIssue(): void {
    const message = document.getElementById("network-message") as any;
    if (!message?.controller) return;

    message.controller.show({
        message: "Network connection lost - attempting to reconnect...",
        type: "warning",
        time: 3000,
    });

    setTimeout(() => {
        message.controller.show({
            message: "Reconnection attempt 1 failed",
            type: "error",
            time: 2000,
        });
    }, 3500);

    setTimeout(() => {
        message.controller.show({
            message: "Reconnection attempt 2 successful",
            type: "success",
            time: 4000,
        });
    }, 6000);
}

function showSystemNotifications(): void {
    const message = document.getElementById("system-message") as any;
    if (!message?.controller) return;

    const notifications = [
        { text: "System maintenance scheduled for 2:00 AM", type: "info" as const },
        { text: "Database backup completed successfully", type: "success" as const },
        { text: "High memory usage detected", type: "warning" as const },
        { text: "Security update available", type: "info" as const },
    ];

    notifications.forEach((notification, index) => {
        setTimeout(() => {
            message.controller.show({
                message: notification.text,
                type: notification.type,
                time: 4000,
            });
        }, index * 1200);
    });
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("Messages demo page loaded");
});

// Make functions globally available
window.showInfoMessage = showInfoMessage;
window.showSuccessMessage = showSuccessMessage;
window.showWarningMessage = showWarningMessage;
window.showErrorMessage = showErrorMessage;
window.showQuickMessage = showQuickMessage;
window.showLongMessage = showLongMessage;
window.showPersistentMessage = showPersistentMessage;
window.showMultipleMessages = showMultipleMessages;
window.showRapidMessages = showRapidMessages;
window.showMixedMessages = showMixedMessages;
window.showPoliteMessage = showPoliteMessage;
window.showAssertiveMessage = showAssertiveMessage;
window.showCustomRegionMessage = showCustomRegionMessage;
window.validateForm = validateForm;
window.simulateSave = simulateSave;
window.simulateAsyncOperation = simulateAsyncOperation;
window.showCallbackMessage = showCallbackMessage;
window.showChainedMessages = showChainedMessages;
window.showConfirmationSequence = showConfirmationSequence;
window.showLimitedQueue = showLimitedQueue;
window.showLargeQueue = showLargeQueue;
window.showSilentMessage = showSilentMessage;
window.simulateFileUpload = simulateFileUpload;
window.simulateNetworkIssue = simulateNetworkIssue;
window.showSystemNotifications = showSystemNotifications;

declare global {
    interface Window {
        showInfoMessage: () => void;
        showSuccessMessage: () => void;
        showWarningMessage: () => void;
        showErrorMessage: () => void;
        showQuickMessage: () => void;
        showLongMessage: () => void;
        showPersistentMessage: () => void;
        showMultipleMessages: () => void;
        showRapidMessages: () => void;
        showMixedMessages: () => void;
        showPoliteMessage: () => void;
        showAssertiveMessage: () => void;
        showCustomRegionMessage: () => void;
        validateForm: () => void;
        simulateSave: () => void;
        simulateAsyncOperation: () => void;
        showCallbackMessage: () => void;
        showChainedMessages: () => void;
        showConfirmationSequence: () => void;
        showLimitedQueue: () => void;
        showLargeQueue: () => void;
        showSilentMessage: () => void;
        simulateFileUpload: () => void;
        simulateNetworkIssue: () => void;
        showSystemNotifications: () => void;
    }
}
