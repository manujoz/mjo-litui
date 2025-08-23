// Button Interactive Demo TypeScript
// This functionality loads after client hydration

import { AiFillAndroid, AiFillApi, AiFillApple, AiFillAudio, AiFillBackward, AiFillWindows } from "mjo-icons/ai";
import { MjoButtonClickEvent, MjoButtonLoadingChangeEvent, MjoButtonToggleEvent } from "../../src/types/mjo-button";

// Playground interactions
function changeButtonProp(prop: string, value: string | boolean): void {
    const button = document.getElementById("playground-button");
    if (!button) return;

    let icon: string | undefined = undefined;
    if (prop === "startIcon" || prop === "endIcon") {
        if (value === "icon1") {
            icon = AiFillApple;
        } else if (value === "icon2") {
            icon = AiFillAndroid;
        } else if (value === "icon3") {
            icon = AiFillWindows;
        } else if (value === "icon4") {
            icon = AiFillApi;
        } else if (value === "icon5") {
            icon = AiFillAudio;
        } else if (value === "icon6") {
            icon = AiFillBackward;
        }

        value = icon as string;
    }

    if (typeof value === "string") {
        if (value === "") {
            button.removeAttribute(prop);
        } else {
            button.setAttribute(prop, value);
        }
    } else {
        if (value) {
            button.setAttribute(prop, "");
        } else {
            button.removeAttribute(prop);
        }
    }
}

// Special function to change button text content
function changeButtonText(text: string): void {
    const button = document.getElementById("playground-button");
    if (!button) return;

    button.textContent = text || "Interactive Button";
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all buttons on the page
    document.querySelectorAll("mjo-button").forEach((button) => {
        // Button click event
        button.addEventListener("mjo-button:click", (ev: Event) => {
            const clickEvent = ev as MjoButtonClickEvent;
            console.log("Button clicked:", {
                element: clickEvent.detail.element,
                toggle: clickEvent.detail.toggle,
                originalEvent: clickEvent.detail.originalEvent,
            });

            // Show visual feedback for demonstration
            if (button.id !== "playground-button") {
                showTemporaryFeedback(button, "Clicked!");
            }
        });

        // Button toggle event
        button.addEventListener("mjo-button:toggle", (ev: Event) => {
            const toggleEvent = ev as MjoButtonToggleEvent;
            console.log("Button toggled:", {
                element: toggleEvent.detail.element,
                pressed: toggleEvent.detail.pressed,
                previousState: toggleEvent.detail.previousState,
            });

            // Show toggle state feedback
            const state = toggleEvent.detail.pressed ? "ON" : "OFF";
            showTemporaryFeedback(button, `Toggle: ${state}`);
        });

        // Button loading change event
        button.addEventListener("mjo-button:loading-change", (ev: Event) => {
            const loadingEvent = ev as MjoButtonLoadingChangeEvent;
            console.log("Button loading changed:", {
                element: loadingEvent.detail.element,
                loading: loadingEvent.detail.loading,
            });
        });
    });

    // Add special handling for form buttons
    document.querySelectorAll('mjo-button[type="submit"]').forEach((button) => {
        button.addEventListener("mjo-button:click", (ev: Event) => {
            ev.preventDefault(); // Prevent actual form submission in demo
            showTemporaryFeedback(button, "Form would submit!");
        });
    });

    document.querySelectorAll('mjo-button[type="reset"]').forEach((button) => {
        button.addEventListener("mjo-button:click", (ev: Event) => {
            ev.preventDefault(); // Prevent actual form reset in demo
            showTemporaryFeedback(button, "Form would reset!");
        });
    });
});

// Helper function to show temporary visual feedback
function showTemporaryFeedback(element: Element, message: string): void {
    // Create or update feedback tooltip
    let feedback = document.querySelector(".button-feedback") as HTMLElement;
    if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "button-feedback";
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--mjo-primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--mjo-radius);
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.style.opacity = "1";

    // Hide after 2 seconds
    setTimeout(() => {
        feedback.style.opacity = "0";
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 2000);
}

// Make functions globally available
window.changeButtonProp = changeButtonProp;
window.changeButtonText = changeButtonText;

// Declare global types
declare global {
    interface Window {
        changeButtonProp: (prop: string, value: string | boolean) => void;
        changeButtonText: (text: string) => void;
    }
}
