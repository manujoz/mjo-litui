// Form Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoFormSubmitEvent } from "../../src/types/mjo-form";

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Basic form interactions
    const basicForm = document.getElementById("basic-form");
    if (basicForm) {
        basicForm.addEventListener("submit", handleBasicFormSubmit);
    }

    // Advanced validation form
    const validationForm = document.getElementById("validation-form");
    if (validationForm) {
        validationForm.addEventListener("submit", handleValidationFormSubmit);
    }

    // Multi-input form
    const multiInputForm = document.getElementById("multi-input-form");
    if (multiInputForm) {
        multiInputForm.addEventListener("submit", handleMultiInputFormSubmit);
    }

    // Radio form
    const radioForm = document.getElementById("radio-form");
    if (radioForm) {
        radioForm.addEventListener("submit", handleRadioFormSubmit);
    }

    // Checkbox form
    const checkboxForm = document.getElementById("checkbox-form");
    if (checkboxForm) {
        checkboxForm.addEventListener("submit", handleCheckboxFormSubmit);
    }

    // Switch form
    const switchForm = document.getElementById("switch-form");
    if (switchForm) {
        switchForm.addEventListener("submit", handleSwitchFormSubmit);
    }

    // Date form
    const dateForm = document.getElementById("date-form");
    if (dateForm) {
        dateForm.addEventListener("submit", handleDateFormSubmit);
    }

    // Custom errors form
    const customErrorsForm = document.getElementById("custom-errors-form");
    if (customErrorsForm) {
        // Set custom error messages
        const customMessages = {
            required: "This field is mandatory and cannot be empty!",
            minlength: "Please enter at least {data0} characters",
            maxlength: "Please do not exceed {data0} characters",
            nospaces: "No spaces are allowed in this field",
            isemail: "Please enter a valid email address",
            security: "Password must be very strong with symbols, numbers, and mixed case",
        };

        const inputMessages = {
            customUsername: {
                required: "Username is required for registration",
                minlength: "Username must be at least 3 characters long",
                maxlength: "Username cannot exceed 15 characters",
                nospaces: "Username cannot contain spaces",
            },
            customEmail: {
                required: "Email address is mandatory",
                isemail: "Please provide a valid email format",
            },
            customPassword: {
                required: "Password is required for security",
                security: "Password must include uppercase, lowercase, numbers, and special characters",
                minlength: "Password must be at least 8 characters for security",
            },
        };

        customErrorsForm.setAttribute("errmessages", JSON.stringify(customMessages));
        customErrorsForm.setAttribute("inputsErrmessages", JSON.stringify(inputMessages));

        customErrorsForm.addEventListener("submit", handleCustomErrorsFormSubmit);
    }

    // No validation form
    const noValidationForm = document.getElementById("no-validation-form");
    if (noValidationForm) {
        noValidationForm.addEventListener("submit", handleNoValidationFormSubmit);
    }

    // Loading form
    const loadingForm = document.getElementById("loading-form");
    if (loadingForm) {
        loadingForm.addEventListener("submit", handleLoadingFormSubmit);
    }
});

// Form submit handlers
function handleBasicFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Basic Form Submitted Successfully!`, "success");
    logFormData("Basic Form", formData, response.data);
}

function handleValidationFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Account Created Successfully with Advanced Validation!`, "success");
    logFormData("Advanced Validation Form", formData, response.data);

    // Simulate account creation delay
    simulateAsyncOperation(response.submitButton, 2000, () => {
        showNotification(`🎉 Welcome! Your account has been set up.`, "info");
    });
}

function handleMultiInputFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Profile Submitted Successfully!`, "success");
    logFormData("Multi-Input Form", formData, response.data);

    // Simulate profile processing
    simulateAsyncOperation(response.submitButton, 1500, () => {
        showNotification(`📝 Profile has been processed and saved.`, "info");
    });
}

function handleRadioFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Account Created with Radio Selections!`, "success");
    logFormData("Radio Form", formData, response.data);
}

function handleCheckboxFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Project Submitted with Technology Selections!`, "success");
    logFormData("Checkbox Form", formData, response.data);
}

function handleSwitchFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Preferences Saved Successfully!`, "success");
    logFormData("Switch Form", formData, response.data);
}

function handleDateFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Event Created Successfully!`, "success");
    logFormData("Date Form", formData, response.data);
}

function handleCustomErrorsFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Custom Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Registration Completed with Custom Messages!`, "success");
    logFormData("Custom Errors Form", formData, response.data);
}

function handleNoValidationFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    // This form has noValidate, so it should always succeed
    showNotification(`✅ Form Submitted Without Validation!`, "info");
    logFormData("No Validation Form", formData, response.data);
}

function handleLoadingFormSubmit(event: Event) {
    const formEvent = event as MjoFormSubmitEvent;
    const { response, formData } = formEvent.detail;

    if (response.error) {
        showNotification(`❌ Validation Error: ${response.errmsg}`, "error");
        return;
    }

    showNotification(`✅ Message Sending...`, "info");
    logFormData("Loading Form", formData, response.data);

    // Simulate message sending with longer delay
    simulateAsyncOperation(response.submitButton, 3000, () => {
        showNotification(`📤 Message sent successfully!`, "success");
    });
}

// Helper functions
function simulateAsyncOperation(submitButton: any, delay: number, callback: () => void) {
    if (submitButton) {
        submitButton.loading = true;

        setTimeout(() => {
            submitButton.loading = false;
            callback();
        }, delay);
    } else {
        setTimeout(callback, delay);
    }
}

function showNotification(message: string, type: "success" | "error" | "info" = "info") {
    // Create a simple notification system
    const notification = document.createElement("div");
    notification.className = `form-notification form-notification--${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 16px",
        borderRadius: "6px",
        color: "white",
        fontWeight: "500",
        zIndex: "10000",
        maxWidth: "400px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transform: "translateX(100%)",
        transition: "transform 0.3s ease",
    });

    // Set color based on type
    const colors = {
        success: "#10b981",
        error: "#ef4444",
        info: "#3b82f6",
    };
    notification.style.backgroundColor = colors[type];

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function logFormData(formName: string, formData: FormData, parsedData: any) {
    console.group(`🔍 ${formName} Data`);
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
    }
    console.log("Parsed data:", parsedData);
    console.groupEnd();
}
