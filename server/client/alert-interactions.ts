// Alert Interactive Demo TypeScript
// This functionality loads after client hydration

// Playground interactions
function changeAlertProp(prop: string, value: string | boolean): void {
    const alert = document.getElementById("playground-alert");
    if (!alert) return;

    if (typeof value === "string") {
        if (value === "") {
            alert.removeAttribute(prop);
        } else {
            alert.setAttribute(prop, value);
        }
    } else {
        if (value) {
            alert.setAttribute(prop, "");
        } else {
            alert.removeAttribute(prop);
        }
    }
}

// Action functions for the playground
function showAlert(): void {
    const alert = document.getElementById("playground-alert") as any;
    if (alert && typeof alert.show === "function") {
        alert.show();
    }
}

function hideAlert(): void {
    const alert = document.getElementById("playground-alert") as any;
    if (alert && typeof alert.hide === "function") {
        alert.hide();
    }
}

function focusAlert(): void {
    const alert = document.getElementById("playground-alert") as any;
    if (alert && typeof alert.focus === "function") {
        alert.focus();
    }
}

function announceAlert(): void {
    const alert = document.getElementById("playground-alert") as any;
    if (alert && typeof alert.announce === "function") {
        alert.announce();
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners for all alert events
    document.querySelectorAll("mjo-alert").forEach((alert) => {
        alert.addEventListener("mjo-alert:will-show", (event: any) => {
            console.log("Alert will show:", event.detail);
        });

        alert.addEventListener("mjo-alert:opened", (event: any) => {
            console.log("Alert shown:", event.detail);
        });

        alert.addEventListener("mjo-alert:will-close", (event: any) => {
            console.log("Alert will close:", event.detail);
            // You can prevent closing by calling event.preventDefault()
            // Example: if (someCondition) event.preventDefault();
        });

        alert.addEventListener("mjo-alert:closed", (event: any) => {
            console.log("Alert closed:", event.detail);
        });
    });

    console.log("Alert interactions initialized with enhanced functionality");
});

// Make functions globally available
window.changeAlertProp = changeAlertProp;
window.showAlert = showAlert;
window.hideAlert = hideAlert;
window.focusAlert = focusAlert;
window.announceAlert = announceAlert;
