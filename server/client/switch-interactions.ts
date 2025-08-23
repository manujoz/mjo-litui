import { MjoSwitchBlurEvent, MjoSwitchChangeEvent, MjoSwitchFocusEvent } from "../../src/types/mjo-switch";

function changeSwitchProp(prop: string, value: string | boolean): void {
    const switchElement = document.getElementById("playground-switch");
    if (!switchElement) return;

    if (typeof value === "string") {
        if (prop === "label") {
            switchElement.setAttribute("label", value || "Interactive Demo");
        } else if (value.trim() === "") {
            // Remove attribute if empty string
            switchElement.removeAttribute(prop);
        } else {
            switchElement.setAttribute(prop, value);
        }
    } else {
        if (value) {
            switchElement.setAttribute(prop, "");
        } else {
            switchElement.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("mjo-switch").forEach((switchElement) => {
        // Standard change event
        switchElement.addEventListener("change", (ev: Event) => {
            console.log("Standard change event:", ev);
        });

        // Custom switch change event
        switchElement.addEventListener("mjo-switch:change", (ev: Event) => {
            const event = ev as MjoSwitchChangeEvent;
            const { element, checked, value, name, previousState } = event.detail;

            console.log("Switch changed:", {
                name,
                value,
                checked,
                previousState,
                element: element.tagName,
            });

            // Show alert for playground switch only
            if (element.id === "playground-switch") {
                let message = `Switch "${name}" changed!`;
                message += `\nState: ${checked ? "ON" : "OFF"}`;
                message += `\nValue: ${value}`;
                message += `\nPrevious: ${previousState.checked ? "ON" : "OFF"}`;

                alert(message);
            }
        });

        // Focus events
        switchElement.addEventListener("mjo-switch:focus", (ev: Event) => {
            const event = ev as MjoSwitchFocusEvent;
            console.log("Switch focused:", event.detail.element.getAttribute("label"));
        });

        switchElement.addEventListener("mjo-switch:blur", (ev: Event) => {
            const event = ev as MjoSwitchBlurEvent;
            console.log("Switch blurred:", event.detail.element.getAttribute("label"));
        });
    });

    // Handle form demonstrations
    const formExamples = document.querySelectorAll('mjo-switch[name*="demo"]');
    formExamples.forEach((switchElement) => {
        switchElement.addEventListener("mjo-switch:change", (ev: Event) => {
            const event = ev as MjoSwitchChangeEvent;
            const { checked, name, value } = event.detail;

            if (checked) {
                console.log(`Form field "${name}" with value "${value}" was enabled`);
            } else {
                console.log(`Form field "${name}" was disabled`);
            }
        });
    });

    // Demonstrate group functionality
    const settingsGroup = document.querySelectorAll('mjo-switch[checkgroup="settings"]');
    let settingsEnabled: string[] = [];

    settingsGroup.forEach((switchElement) => {
        // Initialize with checked items
        if (switchElement.hasAttribute("checked")) {
            settingsEnabled.push(switchElement.getAttribute("value") || "");
        }

        switchElement.addEventListener("mjo-switch:change", (ev: Event) => {
            const event = ev as MjoSwitchChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                if (!settingsEnabled.includes(value)) {
                    settingsEnabled.push(value);
                }
            } else if (value) {
                settingsEnabled = settingsEnabled.filter((v) => v !== value);
            }

            console.log("Settings enabled:", settingsEnabled);
        });
    });

    const privacyGroup = document.querySelectorAll('mjo-switch[checkgroup="privacy"]');
    let privacyEnabled: string[] = [];

    privacyGroup.forEach((switchElement) => {
        // Initialize with checked items
        if (switchElement.hasAttribute("checked")) {
            privacyEnabled.push(switchElement.getAttribute("value") || "");
        }

        switchElement.addEventListener("mjo-switch:change", (ev: Event) => {
            const event = ev as MjoSwitchChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                if (!privacyEnabled.includes(value)) {
                    privacyEnabled.push(value);
                }
            } else if (value) {
                privacyEnabled = privacyEnabled.filter((v) => v !== value);
            }

            console.log("Privacy settings enabled:", privacyEnabled);
        });
    });

    // Demonstrate keyboard accessibility
    document.querySelectorAll('mjo-switch[name*="a11y"]').forEach((switchElement) => {
        switchElement.addEventListener("mjo-switch:focus", (ev: Event) => {
            const event = ev as MjoSwitchFocusEvent;
            console.log("Accessibility switch focused - keyboard navigation available");
        });

        switchElement.addEventListener("keydown", (ev: Event) => {
            const keyEvent = ev as KeyboardEvent;
            if (keyEvent.key === " " || keyEvent.key === "Enter") {
                console.log("Switch activated via keyboard:", keyEvent.key);
            }
        });
    });

    // Advanced usage demonstrations
    document.querySelectorAll('mjo-switch[name*="api"], mjo-switch[name*="debug"]').forEach((switchElement) => {
        switchElement.addEventListener("mjo-switch:change", (ev: Event) => {
            const event = ev as MjoSwitchChangeEvent;
            const { checked, name, value } = event.detail;

            if (name?.includes("api")) {
                console.log(`API Integration ${checked ? "enabled" : "disabled"}`);
                // Simulate API status change
                if (checked) {
                    console.log("🔌 API endpoints are now active");
                } else {
                    console.log("🔌 API endpoints disabled");
                }
            }

            if (name?.includes("debug")) {
                console.log(`Debug Mode ${checked ? "activated" : "deactivated"}`);
                // Simulate debug mode change
                if (checked) {
                    console.log("🐛 Debug information will be shown");
                } else {
                    console.log("🐛 Debug mode disabled");
                }
            }
        });
    });
});

window.changeSwitchProp = changeSwitchProp;

// Make functions globally available
declare global {
    interface Window {
        changeSwitchProp: (prop: string, value: string | boolean) => void;
    }
}
