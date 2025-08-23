// Date Picker Interactive Demo TypeScript
// This functionality loads after client hydration

import { DatePickerChangeEvent } from "../../src/types/mjo-date-picker.js";

// Playground interactions
function changeDatePickerProp(prop: string, value: string | boolean): void {
    const datePicker = document.getElementById("playground-date-picker");
    if (!datePicker) return;

    if (typeof value === "string") {
        if (value === "") {
            datePicker.removeAttribute(prop);
        } else {
            datePicker.setAttribute(prop, value);
        }
    } else {
        if (value) {
            datePicker.setAttribute(prop, "");
        } else {
            datePicker.removeAttribute(prop);
        }
    }

    // Special handling for some properties
    if (prop === "range") {
        // Clear value when switching modes to avoid format conflicts
        datePicker.removeAttribute("value");

        // Update placeholder based on mode
        const placeholder = value ? "Select start and end dates..." : "Choose a date...";
        datePicker.setAttribute("placeholder", placeholder);

        // Update the placeholder input field
        const placeholderInput = document.querySelector('input[placeholder="Enter placeholder..."]') as HTMLInputElement;
        if (placeholderInput) {
            placeholderInput.value = placeholder;
        }
    }

    if (prop === "announceSelections") {
        // This property works inversely with the checkbox (disable announcements)
        const actualValue = !value;
        if (actualValue) {
            datePicker.removeAttribute("disabled-announce-selections");
        } else {
            datePicker.setAttribute("disabled-announce-selections", "");
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all date pickers
    document.querySelectorAll("mjo-date-picker").forEach((datePicker) => {
        datePicker.addEventListener("change", (ev: Event) => {
            const event = ev as DatePickerChangeEvent;
            const { value, date, startDate, endDate } = event.detail;

            let message = `Date picker changed!\nValue: ${value}`;

            if (startDate && endDate) {
                message += `\nStart: ${startDate.toLocaleDateString()}`;
                message += `\nEnd: ${endDate.toLocaleDateString()}`;

                const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                message += `\nDuration: ${days} days`;
            } else if (date) {
                message += `\nSelected: ${date.toLocaleDateString()}`;
            }

            console.log(message);

            // Show notification for playground component
            if (datePicker.id === "playground-date-picker") {
                showNotification(message);
            }
        });
    });

    // Handle form submission
    const forms = document.querySelectorAll("mjo-form");
    forms.forEach((form) => {
        form.addEventListener("submit", (ev: Event) => {
            const event = ev as CustomEvent;
            const { response } = event.detail;

            if (response.error) {
                console.error("Form validation error:", response.errmsg);
                alert("Form validation failed: " + response.errmsg.join(", "));
            } else {
                console.log("Form submitted successfully:", response.data);
                alert("Form submitted!\n" + JSON.stringify(response.data, null, 2));

                // Reset loading state
                setTimeout(() => {
                    if (response.submitButton) {
                        response.submitButton.loading = false;
                    }
                }, 1500);
            }
        });
    });
});

// Show notification helper
function showNotification(message: string): void {
    // Remove existing notifications
    const existing = document.querySelector(".date-picker-notification");
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "date-picker-notification";
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--mjo-background-color);
        color: var(--mjo-text-color);
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 1px solid var(--mjo-border-color);
        z-index: 1000;
        max-width: 300px;
        white-space: pre-line;
        font-size: 14px;
        animation: slideIn 0.3s ease-out;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make function globally available
window.changeDatePickerProp = changeDatePickerProp;

// Global declarations
declare global {
    interface Window {
        changeDatePickerProp: (prop: string, value: string | boolean) => void;
    }
}
