// Modal Interactive Demo TypeScript
// This functionality loads after client hydration

import { html } from "lit";

// Demo modal functions
function showBasicModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    modal.controller.show({
        content: "This is a basic modal. You can close it by clicking the X button or the backdrop.",
        onClose: () => console.log("Basic modal closed"),
    });
}

function showTitledModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    modal.controller.show({
        title: "Modal with Title",
        content: "This modal has a title header. The title helps users understand the purpose of the modal dialog.",
        onClose: () => console.log("Titled modal closed"),
    });
}

function showBlockedModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    modal.controller.show({
        title: "Blocked Modal",
        content: html`
            <div style="padding: 20px;">
                <p>This modal is blocked - you cannot close it by clicking the backdrop or pressing Escape.</p>
                <p>You must click the close button to dismiss it.</p>
                <button
                    onclick="document.getElementById('demo-modal').controller.close()"
                    style="margin-top: 15px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                >
                    Close Modal
                </button>
            </div>
        `,
        blocked: true,
        closePosition: "in",
        onClose: () => console.log("Blocked modal closed"),
    });
}

function showAutoCloseModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    modal.controller.show({
        title: "Auto-Close Modal",
        content: html`
            <div style="padding: 20px; text-align: center;">
                <p>This modal will automatically close in 3 seconds!</p>
                <div id="countdown" style="font-size: 24px; color: #007bff; margin-top: 10px;">3</div>
            </div>
        `,
        time: 3000,
        onClose: () => console.log("Auto-close modal closed"),
    });

    // Countdown animation
    let count = 3;
    const interval = setInterval(() => {
        count--;
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.textContent = count > 0 ? count.toString() : "Closing...";
        }
        if (count <= 0) {
            clearInterval(interval);
        }
    }, 1000);
}

function showWideModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    modal.controller.show({
        title: "Wide Modal",
        content: html`
            <div style="padding: 20px;">
                <p>This modal has a custom width of 700px, making it wider than the default.</p>
                <p>This is useful when you need to display more content horizontally, such as tables, forms with multiple columns, or detailed information.</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 15px;">
                    <strong>Note:</strong> The modal will still be responsive and adjust to smaller screens.
                </div>
            </div>
        `,
        width: 700,
        onClose: () => console.log("Wide modal closed"),
    });
}

function showOutsideCloseModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    modal.controller.show({
        title: "Outside Close Button",
        content: html`
            <div style="padding: 20px;">
                <p>This modal has its close button positioned outside the modal container.</p>
                <p>This can be useful for cleaner designs or when you want the close button to be more prominent.</p>
            </div>
        `,
        closePosition: "out",
        onClose: () => console.log("Outside close modal closed"),
    });
}

function showComplexModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    modal.controller.show({
        title: "Complex Content Modal",
        content: html`
            <div style="padding: 20px;">
                <h4 style="margin: 0 0 15px 0; color: #333;">User Information Form</h4>
                <form onsubmit="handleFormSubmit(event)" style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Name:</label>
                        <input
                            type="text"
                            name="name"
                            required
                            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"
                        />
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email:</label>
                        <input
                            type="email"
                            name="email"
                            required
                            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"
                        />
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 500;">Role:</label>
                        <select name="role" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
                            <option value="user">User</option>
                            <option value="admin">Administrator</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                        <button
                            type="button"
                            onclick="document.getElementById('demo-modal').controller.close()"
                            style="padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;"
                        >
                            Cancel
                        </button>
                        <button type="submit" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        `,
        width: 500,
        blocked: true,
        onClose: () => console.log("Complex modal closed"),
    });
}

function showAccessibilityModal(): void {
    const modal = document.getElementById("demo-modal") as any;
    if (!modal) return;

    // Set accessibility properties on the modal element
    modal.ariaLabelledby = "a11y-modal-title";
    modal.ariaDescribedby = "a11y-modal-description";
    modal.trapFocus = true;
    modal.restoreFocus = true;
    modal.closeOnEscape = true;
    modal.initialFocus = "#first-input";

    modal.controller.show({
        content: html`
            <div style="padding: 20px;">
                <h4 id="a11y-modal-title" style="margin: 0 0 15px 0; color: #333;">Accessibility Demo</h4>
                <div id="a11y-modal-description" style="margin-bottom: 20px;">
                    <p>This modal demonstrates accessibility features:</p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Focus is trapped within the modal</li>
                        <li>Escape key closes the modal</li>
                        <li>Focus is restored when closed</li>
                        <li>Proper ARIA attributes are set</li>
                        <li>Initial focus is set to the first input</li>
                    </ul>
                </div>
                <form style="display: flex; flex-direction: column; gap: 10px;">
                    <input
                        id="first-input"
                        type="text"
                        placeholder="First input (initially focused)"
                        style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
                    />
                    <input type="text" placeholder="Second input" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
                    <button
                        type="button"
                        onclick="document.getElementById('demo-modal').controller.close()"
                        style="margin-top: 15px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
                    >
                        Close (or press Escape)
                    </button>
                </form>
            </div>
        `,
        onClose: () => {
            console.log("Accessibility modal closed");
            // Reset modal accessibility properties
            modal.ariaLabelledby = undefined;
            modal.ariaDescribedby = undefined;
            modal.initialFocus = undefined;
        },
    });
}

// Handle form submission in complex modal
function handleFormSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);

    // Close modal after successful submission
    const modal = document.getElementById("demo-modal") as any;
    if (modal) {
        modal.controller.close();
    }
}

// Make functions globally available
window.showBasicModal = showBasicModal;
window.showTitledModal = showTitledModal;
window.showBlockedModal = showBlockedModal;
window.showAutoCloseModal = showAutoCloseModal;
window.showWideModal = showWideModal;
window.showOutsideCloseModal = showOutsideCloseModal;
window.showComplexModal = showComplexModal;
window.showAccessibilityModal = showAccessibilityModal;
window.handleFormSubmit = handleFormSubmit;

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("Modal interactions initialized");
});

declare global {
    interface Window {
        showBasicModal: () => void;
        showTitledModal: () => void;
        showBlockedModal: () => void;
        showAutoCloseModal: () => void;
        showWideModal: () => void;
        showOutsideCloseModal: () => void;
        showComplexModal: () => void;
        showAccessibilityModal: () => void;
        handleFormSubmit: (event: Event) => void;
    }
}
