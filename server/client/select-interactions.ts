// Select Interactive Demo TypeScript
// This functionality loads after client hydration

import { AiFillAndroid, AiFillApple, AiFillMail, AiFillPhone, AiFillStar, AiFillWindows } from "mjo-icons/ai";
import type {
    MjoSelectBlurEvent,
    MjoSelectChangeEvent,
    MjoSelectClearEvent,
    MjoSelectCloseEvent,
    MjoSelectFocusEvent,
    MjoSelectOpenEvent,
    MjoSelectSearchEvent,
} from "../../src/types/mjo-select";

// Playground interactions
function changeSelectProp(prop: string, value: string | boolean): void {
    const select = document.getElementById("playground-select");
    if (!select) return;

    let icon: string | undefined = undefined;
    if (prop === "startIcon" || prop === "endIcon") {
        if (value === "user") {
            icon = AiFillStar; // Using star instead of user
        } else if (value === "mail") {
            icon = AiFillMail;
        } else if (value === "phone") {
            icon = AiFillPhone;
        } else if (value === "apple") {
            icon = AiFillApple;
        } else if (value === "star") {
            icon = AiFillStar;
        }

        value = icon as string;
    }

    if (typeof value === "string") {
        if (value === "") {
            select.removeAttribute(prop);
        } else {
            select.setAttribute(prop, value);
        }
    } else {
        if (value) {
            select.setAttribute(prop, "");
        } else {
            select.removeAttribute(prop);
        }
    }
}

// Add a new option to the playground select
function addSelectOption(): void {
    const select = document.getElementById("playground-select");
    if (!select) return;

    const optionCount = select.querySelectorAll("mjo-option").length + 1;
    const newOption = document.createElement("mjo-option");
    newOption.setAttribute("value", `option${optionCount}`);
    newOption.setAttribute("text", `Option ${optionCount}`);

    // Add some random icons to make it interesting
    const icons = [AiFillApple, AiFillAndroid, AiFillWindows, AiFillMail, AiFillPhone, AiFillStar];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    if (Math.random() > 0.5) {
        newOption.setAttribute("startIcon", randomIcon);
    }

    select.appendChild(newOption);
}

// Remove the last option from the playground select
function removeLastSelectOption(): void {
    const select = document.getElementById("playground-select");
    if (!select) return;

    const options = select.querySelectorAll("mjo-option");
    if (options.length > 1) {
        const lastOption = options[options.length - 1];
        lastOption.remove();
    }
}

// Clear all options from the playground select
function clearAllSelectOptions(): void {
    const select = document.getElementById("playground-select");
    if (!select) return;

    const options = select.querySelectorAll("mjo-option");
    options.forEach((option) => option.remove());
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("mjo-select").forEach((select) => {
        select.addEventListener("mjo-select:change", handleSelectChange);
        select.addEventListener("mjo-select:open", handleSelectOpen);
        select.addEventListener("mjo-select:close", handleSelectClose);
        select.addEventListener("mjo-select:clear", handleSelectClear);
        select.addEventListener("mjo-select:search", handleSelectSearch);
        select.addEventListener("mjo-select:focus", handleSelectFocus);
        select.addEventListener("mjo-select:blur", handleSelectBlur);
    });
});

// Event handlers
const handleSelectChange = (ev: Event) => {
    const event = ev as MjoSelectChangeEvent;
    const { value, previousValue, option } = event.detail;
    console.log("Select changed:", {
        newValue: value,
        previousValue: previousValue,
        selectedOption: option?.text || "None",
    });
};

const handleSelectOpen = (ev: Event) => {
    const event = ev as MjoSelectOpenEvent;
    const { value, optionsCount } = event.detail;
    console.log("Select opened:", {
        currentValue: value,
        optionsCount: optionsCount,
    });
};

const handleSelectClose = (ev: Event) => {
    const event = ev as MjoSelectCloseEvent;
    const { value, reason } = event.detail;
    console.log("Select closed:", {
        finalValue: value,
        reason: reason,
    });
};

const handleSelectClear = (ev: Event) => {
    const event = ev as MjoSelectClearEvent;
    const { previousValue, previousOption } = event.detail;
    console.log("Select cleared:", {
        previousValue: previousValue,
        previousOption: previousOption?.text || "None",
    });
};

const handleSelectSearch = (ev: Event) => {
    const event = ev as MjoSelectSearchEvent;
    const { query, filteredOptionsCount } = event.detail;
    console.log("Select search:", {
        query: query,
        filteredOptionsCount: filteredOptionsCount,
    });
};

const handleSelectFocus = (ev: Event) => {
    const event = ev as MjoSelectFocusEvent;
    const { value } = event.detail;
    console.log("Select focused:", {
        currentValue: value,
    });
};

const handleSelectBlur = (ev: Event) => {
    const event = ev as MjoSelectBlurEvent;
    const { value, reason } = event.detail;
    console.log("Select blurred:", {
        finalValue: value,
        reason: reason,
    });
};

// Make functions globally available
window.changeSelectProp = changeSelectProp;
window.addSelectOption = addSelectOption;
window.removeLastSelectOption = removeLastSelectOption;
window.clearAllSelectOptions = clearAllSelectOptions;

// Declare global types
declare global {
    interface Window {
        changeSelectProp: (prop: string, value: string | boolean) => void;
        addSelectOption: () => void;
        removeLastSelectOption: () => void;
        clearAllSelectOptions: () => void;
    }
}
