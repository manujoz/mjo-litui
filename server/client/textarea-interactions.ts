// Textarea Interactive Demo TypeScript
// This functionality loads after client hydration

import { AiFillEdit, AiFillFileText, AiFillMail, AiFillMessage } from "mjo-icons/ai";
import {
    MjoTextareaBlurEvent,
    MjoTextareaChangeEvent,
    MjoTextareaClearEvent,
    MjoTextareaFocusEvent,
    MjoTextareaInputEvent,
    MjoTextareaKeyupEvent,
} from "../../src/types/mjo-textarea";

// Playground interactions
function changeTextareaProp(prop: string, value: string | boolean): void {
    const textarea = document.getElementById("playground-textarea");
    if (!textarea) return;

    let icon: string | undefined = undefined;
    if (prop === "startIcon" || prop === "endIcon") {
        if (value === "message") {
            icon = AiFillMessage;
        } else if (value === "mail") {
            icon = AiFillMail;
        } else if (value === "edit") {
            icon = AiFillEdit;
        } else if (value === "filetext") {
            icon = AiFillFileText;
        }

        value = icon as string;
    }

    if (typeof value === "string") {
        if (value === "") {
            textarea.removeAttribute(prop);
        } else {
            if (prop === "label") {
                textarea.setAttribute("label", value || "Interactive Demo");
            } else {
                textarea.setAttribute(prop, value);
            }
        }
    } else {
        if (value) {
            textarea.setAttribute(prop, "");
        } else {
            textarea.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all textarea elements
    document.querySelectorAll("mjo-textarea").forEach((textarea) => {
        // Input event
        textarea.addEventListener("mjo-textarea:input", (ev: Event) => {
            const event = ev as MjoTextareaInputEvent;
            console.log("Textarea input:", {
                value: event.detail.value,
                previousValue: event.detail.previousValue,
                inputType: event.detail.inputType,
            });
        });

        // Change event
        textarea.addEventListener("mjo-textarea:change", (ev: Event) => {
            const event = ev as MjoTextareaChangeEvent;
            console.log("Textarea changed:", {
                value: event.detail.value,
                previousValue: event.detail.previousValue,
            });
        });

        // Focus events
        textarea.addEventListener("mjo-textarea:focus", (ev: Event) => {
            const event = ev as MjoTextareaFocusEvent;
            console.log("Textarea focused:", {
                value: event.detail.value,
            });
        });

        textarea.addEventListener("mjo-textarea:blur", (ev: Event) => {
            const event = ev as MjoTextareaBlurEvent;
            console.log("Textarea blurred:", {
                value: event.detail.value,
            });
        });

        // Keyup event
        textarea.addEventListener("mjo-textarea:keyup", (ev: Event) => {
            const event = ev as MjoTextareaKeyupEvent;
            if (event.detail.key === "Enter" && event.detail.originalEvent.ctrlKey) {
                console.log("Ctrl+Enter pressed in textarea:", event.detail.value);
            }
        });

        // Clear event (if clearable functionality is added later)
        textarea.addEventListener("mjo-textarea:clear", (ev: Event) => {
            const event = ev as MjoTextareaClearEvent;
            console.log("Textarea cleared:", {
                previousValue: event.detail.previousValue,
            });
        });
    });

    // Demo form submission
    const formExamples = document.querySelectorAll(".form-example");
    formExamples.forEach((form) => {
        const textareas = form.querySelectorAll("mjo-textarea");
        textareas.forEach((textarea) => {
            textarea.addEventListener("mjo-textarea:change", () => {
                console.log("Form textarea changed:", {
                    label: textarea.getAttribute("label"),
                    value: (textarea as any).value,
                });
            });
        });
    });

    // Add some interactive demonstrations
    addInteractiveDemonstrations();
});

// Add interactive demonstrations
function addInteractiveDemonstrations(): void {
    // Auto-resize demonstration
    const autoResizeTextareas = document.querySelectorAll("mjo-textarea[maxheight]");
    autoResizeTextareas.forEach((textarea) => {
        textarea.addEventListener("mjo-textarea:input", (ev: Event) => {
            const event = ev as MjoTextareaInputEvent;
            if (event.detail.value.length > 50) {
                console.log("Auto-resize textarea has substantial content:", event.detail.value.length, "characters");
            }
        });
    });

    // Character counter demonstration
    const counterTextareas = document.querySelectorAll("mjo-textarea[counter]");
    counterTextareas.forEach((textarea) => {
        textarea.addEventListener("mjo-textarea:input", (ev: Event) => {
            const event = ev as MjoTextareaInputEvent;
            const maxLength = textarea.getAttribute("maxlength");
            if (maxLength) {
                const remaining = parseInt(maxLength) - event.detail.value.length;
                if (remaining < 50) {
                    console.log("Character limit approaching:", remaining, "characters remaining");
                }
            }
        });
    });

    // Validation demonstration
    const requiredTextareas = document.querySelectorAll("mjo-textarea[required]");
    requiredTextareas.forEach((textarea) => {
        textarea.addEventListener("mjo-textarea:blur", (ev: Event) => {
            const event = ev as MjoTextareaBlurEvent;
            if (!event.detail.value.trim()) {
                console.log("Required textarea is empty");
            } else {
                console.log("Required textarea has value");
            }
        });
    });

    // Advanced textarea demonstration
    const advancedTextarea = document.querySelector("mjo-textarea[selectonfocus]");
    if (advancedTextarea) {
        advancedTextarea.addEventListener("mjo-textarea:focus", () => {
            console.log("Advanced textarea focused with selectOnFocus enabled");
        });
    }
}

window.changeTextareaProp = changeTextareaProp;

// Make functions globally available
declare global {
    interface Window {
        changeTextareaProp: (prop: string, value: string | boolean) => void;
    }
}
