import { MjoCheckboxBlurEvent, MjoCheckboxChangeEvent, MjoCheckboxFocusEvent, MjoCheckboxIndeterminateChangeEvent } from "../../src/types/mjo-checkbox";

function changeCheckboxProp(prop: string, value: string | boolean): void {
    const checkbox = document.getElementById("playground-checkbox");
    if (!checkbox) return;

    if (typeof value === "string") {
        if (prop === "label") {
            checkbox.setAttribute("label", value || "Interactive Demo");
        } else if (value.trim() === "") {
            // Remove attribute if empty string
            checkbox.removeAttribute(prop);
        } else {
            checkbox.setAttribute(prop, value);
        }
    } else {
        if (value) {
            checkbox.setAttribute(prop, "");
        } else {
            checkbox.removeAttribute(prop);
        }
    }

    // Handle mutual exclusivity of checked and indeterminate states
    if (prop === "checked" && value === true) {
        checkbox.removeAttribute("indeterminate");
        const indeterminateInput = document.querySelector('input[name="indeterminate"]') as HTMLInputElement;
        if (indeterminateInput) indeterminateInput.checked = false;
    } else if (prop === "indeterminate" && value === true) {
        checkbox.removeAttribute("checked");
        const checkedInput = document.querySelector('input[name="checked"]') as HTMLInputElement;
        if (checkedInput) checkedInput.checked = false;
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("mjo-checkbox").forEach((checkbox) => {
        // Standard change event
        checkbox.addEventListener("change", (ev: Event) => {
            console.log("Standard change event:", ev);
        });

        // Custom checkbox change event
        checkbox.addEventListener("mjo-checkbox-change", (ev: Event) => {
            const event = ev as MjoCheckboxChangeEvent;
            const { element, checked, indeterminate, value, name, previousState } = event.detail;

            console.log("Checkbox changed:", {
                name,
                value,
                checked,
                indeterminate,
                previousState,
                element: element.tagName,
            });

            // Show alert for playground checkbox only
            if (element.id === "playground-checkbox") {
                let message = `Checkbox "${name}" changed!`;
                message += `\nState: ${indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}`;
                message += `\nValue: ${value}`;
                message += `\nPrevious: ${previousState.indeterminate ? "indeterminate" : previousState.checked ? "checked" : "unchecked"}`;

                alert(message);
            }
        });

        // Indeterminate change event
        checkbox.addEventListener("mjo-checkbox-indeterminate-change", (ev: Event) => {
            const event = ev as MjoCheckboxIndeterminateChangeEvent;
            console.log("Checkbox indeterminate changed:", event.detail);
        });

        // Focus events
        checkbox.addEventListener("mjo-checkbox-focus", (ev: Event) => {
            const event = ev as MjoCheckboxFocusEvent;
            console.log("Checkbox focused:", event.detail.element.getAttribute("label"));
        });

        checkbox.addEventListener("mjo-checkbox-blur", (ev: Event) => {
            const event = ev as MjoCheckboxBlurEvent;
            console.log("Checkbox blurred:", event.detail.element.getAttribute("label"));
        });
    });

    // Handle form demonstrations
    const formExamples = document.querySelectorAll('mjo-checkbox[name*="demo"]');
    formExamples.forEach((checkbox) => {
        checkbox.addEventListener("mjo-checkbox-change", (ev: Event) => {
            const event = ev as MjoCheckboxChangeEvent;
            const { checked, name, value } = event.detail;

            if (checked) {
                console.log(`Form field "${name}" with value "${value}" was selected`);
            } else {
                console.log(`Form field "${name}" was deselected`);
            }
        });
    });

    // Demonstrate group functionality
    const preferencesGroup = document.querySelectorAll('mjo-checkbox[checkgroup="preferences"]');
    let preferencesSelected: string[] = [];

    preferencesGroup.forEach((checkbox) => {
        // Initialize with checked items
        if (checkbox.hasAttribute("checked")) {
            preferencesSelected.push(checkbox.getAttribute("value") || "");
        }

        checkbox.addEventListener("mjo-checkbox-change", (ev: Event) => {
            const event = ev as MjoCheckboxChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                if (!preferencesSelected.includes(value)) {
                    preferencesSelected.push(value);
                }
            } else if (value) {
                preferencesSelected = preferencesSelected.filter((v) => v !== value);
            }

            console.log("Preferences selected:", preferencesSelected);
        });
    });

    const featuresGroup = document.querySelectorAll('mjo-checkbox[checkgroup="features"]');
    let featuresSelected: string[] = [];

    featuresGroup.forEach((checkbox) => {
        // Initialize with checked items
        if (checkbox.hasAttribute("checked")) {
            featuresSelected.push(checkbox.getAttribute("value") || "");
        }

        checkbox.addEventListener("mjo-checkbox-change", (ev: Event) => {
            const event = ev as MjoCheckboxChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                if (!featuresSelected.includes(value)) {
                    featuresSelected.push(value);
                }
            } else if (value) {
                featuresSelected = featuresSelected.filter((v) => v !== value);
            }

            console.log("Features selected:", featuresSelected);
        });
    });
});

window.changeCheckboxProp = changeCheckboxProp;

// Make functions globally available
declare global {
    interface Window {
        changeCheckboxProp: (prop: string, value: string | boolean) => void;
    }
}
