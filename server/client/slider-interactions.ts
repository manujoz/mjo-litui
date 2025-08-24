// Slider Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoSliderBlurEvent, MjoSliderChangeEvent, MjoSliderFocusEvent, MjoSliderInputEvent } from "../../src/types/mjo-slider";

// Playground interactions
function changeSliderProp(prop: string, value: string | boolean): void {
    const slider = document.getElementById("playground-slider");
    if (!slider) return;

    if (typeof value === "string") {
        if (prop === "label") {
            slider.setAttribute("label", value || "Interactive Demo");
        } else if (prop === "min" || prop === "max" || prop === "step") {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
                slider.setAttribute(prop, numValue.toString());

                // If changing min/max, ensure current value is within bounds
                if (prop === "min" || prop === "max") {
                    updateSliderValueBounds(slider);
                }
            }
        } else {
            slider.setAttribute(prop, value);
        }
    } else {
        if (value) {
            slider.setAttribute(prop, "");

            // Special handling for range mode
            if (prop === "isRange" && value) {
                // Convert current value to range format if not already
                const currentValue = slider.getAttribute("value") || "50";
                if (!currentValue.includes("-")) {
                    const val = parseInt(currentValue);
                    const min = parseInt(slider.getAttribute("min") || "0");
                    const max = parseInt(slider.getAttribute("max") || "100");
                    const range = max - min;
                    const rangeStart = Math.max(min, val - Math.floor(range * 0.1));
                    const rangeEnd = Math.min(max, val + Math.floor(range * 0.1));
                    slider.setAttribute("value", `${rangeStart}-${rangeEnd}`);
                }
            } else if (prop === "isRange" && !value) {
                // Convert range value to single value
                const currentValue = slider.getAttribute("value") || "50";
                if (currentValue.includes("-")) {
                    const [start] = currentValue.split("-");
                    slider.setAttribute("value", start);
                }
            }
        } else {
            slider.removeAttribute(prop);
        }
    }
}

// Helper function to ensure slider value is within bounds
function updateSliderValueBounds(slider: Element): void {
    const min = parseInt(slider.getAttribute("min") || "0");
    const max = parseInt(slider.getAttribute("max") || "100");
    const currentValue = slider.getAttribute("value") || "50";

    if (currentValue.includes("-")) {
        // Range value
        const [start, end] = currentValue.split("-").map(Number);
        const newStart = Math.max(min, Math.min(start, max));
        const newEnd = Math.max(min, Math.min(end, max));
        slider.setAttribute("value", `${newStart}-${newEnd}`);
    } else {
        // Single value
        const val = parseInt(currentValue);
        const newVal = Math.max(min, Math.min(val, max));
        slider.setAttribute("value", newVal.toString());
    }
}

// Create a status div for showing events
function createEventStatus(): HTMLDivElement {
    let statusDiv = document.getElementById("event-status") as HTMLDivElement;
    if (!statusDiv) {
        statusDiv = document.createElement("div");
        statusDiv.id = "event-status";
        statusDiv.className = "event-status";
        statusDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-family: monospace;
            max-width: 300px;
            word-wrap: break-word;
            z-index: 1000;
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(statusDiv);
    }
    return statusDiv;
}

// Show event information
function showEventInfo(eventType: string, detail: any): void {
    const statusDiv = createEventStatus();
    const timestamp = new Date().toLocaleTimeString();

    let message = `[${timestamp}] ${eventType}`;

    if (detail.value !== undefined) {
        message += `: ${detail.value}`;
    }

    if (detail.handle) {
        message += ` (handle: ${detail.handle})`;
    }

    statusDiv.textContent = message;
    statusDiv.style.opacity = "1";

    // Hide after 3 seconds
    setTimeout(() => {
        statusDiv.style.opacity = "0";
    }, 3000);
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all sliders
    document.querySelectorAll("mjo-slider").forEach((slider) => {
        // Change events (fired when user releases the slider)
        slider.addEventListener("mjo-slider:change", (ev: Event) => {
            const event = ev as MjoSliderChangeEvent;
            console.log("Slider changed:", event.detail);
            showEventInfo("change", event.detail);
        });

        // Input events (fired during dragging/real-time updates)
        slider.addEventListener("mjo-slider:input", (ev: Event) => {
            const event = ev as MjoSliderInputEvent;
            console.log("Slider input:", event.detail);
            showEventInfo("input", event.detail);
        });

        // Focus events
        slider.addEventListener("mjo-slider:focus", (ev: Event) => {
            const event = ev as MjoSliderFocusEvent;
            console.log("Slider focused:", event.detail);
            showEventInfo("focus", event.detail);
        });

        // Blur events
        slider.addEventListener("mjo-slider:blur", (ev: Event) => {
            const event = ev as MjoSliderBlurEvent;
            console.log("Slider blurred:", event.detail);
            showEventInfo("blur", event.detail);
        });

        // Legacy change event for form compatibility
        slider.addEventListener("change", (ev: Event) => {
            const target = ev.target as any;
            if (target && target.value !== undefined) {
                console.log("Legacy change event:", target.value);
            }
        });
    });

    // Add keyboard navigation info
    const playgroundSlider = document.getElementById("playground-slider");
    if (playgroundSlider) {
        // Add some helpful keyboard navigation hints
        const helpDiv = document.createElement("div");
        helpDiv.className = "keyboard-help";
        helpDiv.textContent = "💡 Use arrow keys, Home/End, Page Up/Down for keyboard navigation";

        const showcase = document.querySelector(".playground-showcase");
        if (showcase) {
            showcase.appendChild(helpDiv);
        }
    }

    // Initialize control sync - sync control panel with current slider state
    syncControlsWithSlider();
});

// Sync control panel values with current slider state
function syncControlsWithSlider(): void {
    const slider = document.getElementById("playground-slider");
    if (!slider) return;

    // Sync input controls
    const labelInput = document.querySelector('input[name="label"]') as HTMLInputElement;
    const minInput = document.querySelector('input[name="min"]') as HTMLInputElement;
    const maxInput = document.querySelector('input[name="max"]') as HTMLInputElement;
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const prefixInput = document.querySelector('input[name="valuePrefix"]') as HTMLInputElement;
    const suffixInput = document.querySelector('input[name="valueSuffix"]') as HTMLInputElement;

    // Sync select controls
    const colorSelect = document.querySelector('select[name="color"]') as HTMLSelectElement;
    const sizeSelect = document.querySelector('select[name="size"]') as HTMLSelectElement;
    const stepSelect = document.querySelector('select[name="step"]') as HTMLSelectElement;

    // Sync checkboxes
    const rangeCheckbox = document.querySelector('input[name="isRange"]') as HTMLInputElement;
    const tooltipCheckbox = document.querySelector('input[name="tooltip"]') as HTMLInputElement;
    const hideValueCheckbox = document.querySelector('input[name="hideValue"]') as HTMLInputElement;
    const disabledCheckbox = document.querySelector('input[name="disabled"]') as HTMLInputElement;

    // Update inputs based on slider attributes
    if (labelInput) labelInput.value = slider.getAttribute("label") || "";
    if (minInput) minInput.value = slider.getAttribute("min") || "0";
    if (maxInput) maxInput.value = slider.getAttribute("max") || "100";
    if (nameInput) nameInput.value = slider.getAttribute("name") || "";
    if (prefixInput) prefixInput.value = slider.getAttribute("valuePrefix") || "";
    if (suffixInput) suffixInput.value = slider.getAttribute("valueSuffix") || "";

    if (colorSelect) colorSelect.value = slider.getAttribute("color") || "primary";
    if (sizeSelect) sizeSelect.value = slider.getAttribute("size") || "medium";
    if (stepSelect) stepSelect.value = slider.getAttribute("step") || "1";

    if (rangeCheckbox) rangeCheckbox.checked = slider.hasAttribute("isRange");
    if (tooltipCheckbox) tooltipCheckbox.checked = slider.hasAttribute("tooltip");
    if (hideValueCheckbox) hideValueCheckbox.checked = slider.hasAttribute("hideValue");
    if (disabledCheckbox) disabledCheckbox.checked = slider.hasAttribute("disabled");
}

// Make function globally available
(window as any).changeSliderProp = changeSliderProp;

// Make functions globally available
declare global {
    interface Window {
        changeSliderProp: (prop: string, value: string | boolean) => void;
    }
}
