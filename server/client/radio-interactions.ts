import { MjoRadioBlurEvent, MjoRadioChangeEvent, MjoRadioFocusEvent } from "../../src/types/mjo-radio";

function changeRadioProp(prop: string, value: string | boolean): void {
    const radio = document.getElementById("playground-radio");
    if (!radio) return;

    if (typeof value === "string") {
        if (prop === "label") {
            radio.setAttribute("label", value || "Interactive Demo");
        } else if (value.trim() === "") {
            // Remove attribute if empty string
            radio.removeAttribute(prop);
        } else {
            radio.setAttribute(prop, value);
        }
    } else {
        if (value) {
            radio.setAttribute(prop, "");
        } else {
            radio.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("mjo-radio").forEach((radio) => {
        // Standard change event
        radio.addEventListener("change", (ev: Event) => {
            console.log("Standard change event:", ev);
        });

        // Custom radio change event
        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { element, checked, value, name, previousState } = event.detail;

            console.log("Radio changed:", {
                name,
                value,
                checked,
                previousState,
                element: element.tagName,
            });

            // Show alert for playground radio only
            if (element.id === "playground-radio") {
                let message = `Radio "${name}" changed!`;
                message += `\nState: ${checked ? "selected" : "unselected"}`;
                message += `\nValue: ${value}`;
                message += `\nPrevious: ${previousState.checked ? "selected" : "unselected"}`;

                alert(message);
            }
        });

        // Focus events
        radio.addEventListener("mjo-radio:focus", (ev: Event) => {
            const event = ev as MjoRadioFocusEvent;
            console.log("Radio focused:", event.detail.element.getAttribute("label"));
        });

        radio.addEventListener("mjo-radio:blur", (ev: Event) => {
            const event = ev as MjoRadioBlurEvent;
            console.log("Radio blurred:", event.detail.element.getAttribute("label"));
        });
    });

    // Handle form demonstrations
    const formExamples = document.querySelectorAll('mjo-radio[name*="demo"]');
    formExamples.forEach((radio) => {
        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { checked, name, value } = event.detail;

            if (checked) {
                console.log(`Form field "${name}" with value "${value}" was selected`);
            }
        });
    });

    // Demonstrate radio group functionality
    const frameworkGroup = document.querySelectorAll('mjo-radio[name="framework"]');
    let selectedFramework = "";

    frameworkGroup.forEach((radio) => {
        // Initialize with checked items
        if (radio.hasAttribute("checked")) {
            selectedFramework = radio.getAttribute("value") || "";
        }

        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                selectedFramework = value;
                console.log("Framework selected:", selectedFramework);
            }
        });
    });

    const experienceGroup = document.querySelectorAll('mjo-radio[name="experience"]');
    let selectedExperience = "";

    experienceGroup.forEach((radio) => {
        // Initialize with checked items
        if (radio.hasAttribute("checked")) {
            selectedExperience = radio.getAttribute("value") || "";
        }

        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                selectedExperience = value;
                console.log("Experience selected:", selectedExperience);
            }
        });
    });

    const genderGroup = document.querySelectorAll('mjo-radio[name="gender"]');
    let selectedGender = "";

    genderGroup.forEach((radio) => {
        // Initialize with checked items
        if (radio.hasAttribute("checked")) {
            selectedGender = radio.getAttribute("value") || "";
        }

        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                selectedGender = value;
                console.log("Gender selected:", selectedGender);
            }
        });
    });

    const communicationGroup = document.querySelectorAll('mjo-radio[name="communication"]');
    let selectedCommunication = "";

    communicationGroup.forEach((radio) => {
        // Initialize with checked items
        if (radio.hasAttribute("checked")) {
            selectedCommunication = radio.getAttribute("value") || "";
        }

        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                selectedCommunication = value;
                console.log("Communication preference selected:", selectedCommunication);
            }
        });
    });

    const a11yGroup = document.querySelectorAll('mjo-radio[name="a11y"]');
    let selectedA11y = "";

    a11yGroup.forEach((radio) => {
        // Initialize with checked items
        if (radio.hasAttribute("checked")) {
            selectedA11y = radio.getAttribute("value") || "";
        }

        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                selectedA11y = value;
                console.log("Accessibility option selected:", selectedA11y);
            }
        });
    });

    const paymentGroup = document.querySelectorAll('mjo-radio[name="payment"]');
    let selectedPayment = "";

    paymentGroup.forEach((radio) => {
        // Initialize with checked items
        if (radio.hasAttribute("checked")) {
            selectedPayment = radio.getAttribute("value") || "";
        }

        radio.addEventListener("mjo-radio:change", (ev: Event) => {
            const event = ev as MjoRadioChangeEvent;
            const { checked, value } = event.detail;

            if (checked && value) {
                selectedPayment = value;
                console.log("Payment method selected:", selectedPayment);

                // Show additional info for certain payment methods
                if (value === "crypto") {
                    console.log("Cryptocurrency payments require additional verification");
                } else if (value === "bank") {
                    console.log("Bank transfer may take 2-3 business days to process");
                }
            }
        });
    });

    // Demonstrate keyboard navigation
    document.addEventListener("keydown", (event) => {
        if (event.target && (event.target as HTMLElement).tagName === "MJO-RADIO") {
            const currentRadio = event.target as HTMLElement;
            const groupName = currentRadio.getAttribute("name");

            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();

                if (groupName) {
                    const groupRadios = Array.from(document.querySelectorAll(`mjo-radio[name="${groupName}"]`));
                    const currentIndex = groupRadios.indexOf(currentRadio);

                    let nextIndex;
                    if (event.key === "ArrowDown") {
                        nextIndex = (currentIndex + 1) % groupRadios.length;
                    } else {
                        nextIndex = currentIndex === 0 ? groupRadios.length - 1 : currentIndex - 1;
                    }

                    const nextRadio = groupRadios[nextIndex] as HTMLElement;
                    if (nextRadio && !nextRadio.hasAttribute("disabled")) {
                        nextRadio.focus();
                        nextRadio.click();
                    }
                }
            }
        }
    });
});

window.changeRadioProp = changeRadioProp;

// Make functions globally available
declare global {
    interface Window {
        changeRadioProp: (prop: string, value: string | boolean) => void;
    }
}
