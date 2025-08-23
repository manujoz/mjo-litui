// Color Picker Interactive Demo TypeScript
// This functionality loads after client hydration

import {
    MjoColorPickerBlurEvent,
    MjoColorPickerChangeEvent,
    MjoColorPickerFocusEvent,
    MjoColorPickerFormatChangeEvent,
    MjoColorPickerInputEvent,
} from "../../src/types/mjo-color-picker";

// Playground interactions
function changeColorPickerProp(prop: string, value: string | boolean): void {
    const colorPicker = document.getElementById("playground-color-picker");
    if (!colorPicker) return;

    if (typeof value === "string") {
        if (value === "") {
            colorPicker.removeAttribute(prop);
        } else {
            colorPicker.setAttribute(prop, value);
        }
    } else {
        if (value) {
            colorPicker.setAttribute(prop, "");
        } else {
            colorPicker.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all color pickers
    document.querySelectorAll("mjo-color-picker").forEach((colorPicker) => {
        // Input event
        colorPicker.addEventListener("mjo-color-picker:input", (ev: Event) => {
            const event = ev as MjoColorPickerInputEvent;
            console.log("🎨 Color input:", {
                value: event.detail.value,
                format: event.detail.format,
                element: event.detail.element,
            });
        });

        // Change event
        colorPicker.addEventListener("mjo-color-picker:change", (ev: Event) => {
            const event = ev as MjoColorPickerChangeEvent;
            console.log("🔄 Color changed:", {
                value: event.detail.value,
                format: event.detail.format,
                element: event.detail.element,
            });
        });

        // Focus event
        colorPicker.addEventListener("mjo-color-picker:focues", (ev: Event) => {
            const event = ev as MjoColorPickerFocusEvent;
            console.log("🔍 Color picker focused:", {
                element: event.detail.element,
            });
        });

        // Blur event
        colorPicker.addEventListener("mjo-color-picker:blur", (ev: Event) => {
            const event = ev as MjoColorPickerBlurEvent;
            console.log("🔍 Color picker blurred:", {
                element: event.detail.element,
            });
        });

        // Format change event
        colorPicker.addEventListener("mjo-color-picker:format-change", (ev: Event) => {
            const event = ev as MjoColorPickerFormatChangeEvent;
            console.log("📝 Format changed:", {
                format: event.detail.format,
                previousFormat: event.detail.previousFormat,
                value: event.detail.value,
                element: event.detail.element,
            });
        });

        // Standard change event
        colorPicker.addEventListener("change", (ev: Event) => {
            const target = ev.target as HTMLElement;
            console.log("📡 Standard change event:", {
                value: target.getAttribute("value"),
                tagName: target.tagName,
            });
        });
    });

    // Special handling for interactive examples
    const interactiveExamples = document.querySelectorAll(".interactive-example");
    interactiveExamples.forEach((example) => {
        example.addEventListener("mjo-color-picker:change", (ev: Event) => {
            const event = ev as MjoColorPickerChangeEvent;

            // Show a notification for interactive examples
            const notification = document.createElement("div");
            notification.className = "color-notification";
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${event.detail.value};
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
            notification.innerHTML = `
                <div style="font-size: 14px;">Color Updated!</div>
                <div style="font-size: 12px; opacity: 0.9;">${event.detail.value}</div>
            `;

            document.body.appendChild(notification);

            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = "slideOut 0.3s ease-in forwards";
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });

    // Add CSS animations for notifications
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

        .color-notification {
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
});

window.changeColorPickerProp = changeColorPickerProp;

// Make functions globally available
declare global {
    interface Window {
        changeColorPickerProp: (prop: string, value: string | boolean) => void;
    }
}
