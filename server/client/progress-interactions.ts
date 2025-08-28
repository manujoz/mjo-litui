// Progress Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoProgressChangeEvent, MjoProgressCompleteEvent } from "../../src/types/mjo-progress";

// Playground interactions
function changeProgressProp(prop: string, value: string | boolean): void {
    const progress = document.getElementById("playground-progress");
    if (!progress) return;

    if (typeof value === "string") {
        progress.setAttribute(prop, value);

        // Update value display
        if (prop === "value") {
            const valueDisplay = document.getElementById("value-display");
            if (valueDisplay) {
                valueDisplay.textContent = `${value}%`;
            }
        }
    } else {
        if (value) {
            progress.setAttribute(prop, "");
        } else {
            progress.removeAttribute(prop);
        }
    }
}

// Animation function for interactive example
function animateProgress(): void {
    const animatedProgress = document.getElementById("animated-progress");
    if (!animatedProgress) return;

    let currentValue = 0;
    const targetValue = 100;
    const increment = 2;
    const interval = 50;

    const animation = setInterval(() => {
        currentValue += increment;
        animatedProgress.setAttribute("value", currentValue.toString());

        if (currentValue >= targetValue) {
            clearInterval(animation);
            // Reset after 2 seconds
            setTimeout(() => {
                animatedProgress.setAttribute("value", "0");
            }, 2000);
        }
    }, interval);
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all progress components
    document.querySelectorAll("mjo-progress").forEach((progress) => {
        progress.addEventListener("mjo-progress:change", (ev: Event) => {
            const event = ev as unknown as MjoProgressChangeEvent;
            console.log("Progress changed:", {
                value: event.detail.value,
                percentage: event.detail.percentage,
                min: event.detail.min,
                max: event.detail.max,
            });
        });

        progress.addEventListener("mjo-progress:complete", (ev: Event) => {
            const event = ev as unknown as MjoProgressCompleteEvent;
            console.log("Progress completed:", {
                value: event.detail.value,
                min: event.detail.min,
                max: event.detail.max,
            });

            // Show completion message for playground progress
            if (progress.id === "playground-progress") {
                alert("Progress completed!");
            }
        });
    });

    // Initialize value display
    const valueDisplay = document.getElementById("value-display");
    const playgroundProgress = document.getElementById("playground-progress");
    if (valueDisplay && playgroundProgress) {
        const currentValue = playgroundProgress.getAttribute("value") || "50";
        valueDisplay.textContent = `${currentValue}%`;
    }
});

// Make functions globally available
window.changeProgressProp = changeProgressProp;
window.animateProgress = animateProgress;

declare global {
    interface Window {
        changeProgressProp: (prop: string, value: string | boolean) => void;
        animateProgress: () => void;
    }
}
