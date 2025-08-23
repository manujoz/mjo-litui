import {
    MjoTextfieldBlurEvent,
    MjoTextfieldChangeEvent,
    MjoTextfieldClearEvent,
    MjoTextfieldFocusEvent,
    MjoTextfieldInputEvent,
    MjoTextfieldKeyupEvent,
    MjoTextfieldPasswordToggleEvent,
} from "../../src/types/mjo-textfield";

import { AiFillApple, AiFillLock, AiFillMail, AiFillPhone } from "mjo-icons/ai";

function changeTextfieldProp(prop: string, value: string | boolean): void {
    const textfield = document.getElementById("playground-textfield");
    if (!textfield) return;

    let icon: string | undefined = undefined;
    if (prop === "startIcon" || prop === "endIcon") {
        if (value === "user") {
            icon = AiFillApple;
        } else if (value === "mail") {
            icon = AiFillMail;
        } else if (value === "lock") {
            icon = AiFillLock;
        } else if (value === "phone") {
            icon = AiFillPhone;
        }

        value = icon as string;
    }

    if (typeof value === "string") {
        if (value === "") {
            textfield.removeAttribute(prop);
        } else {
            textfield.setAttribute(prop, value);
        }
    } else {
        if (value) {
            textfield.setAttribute(prop, "");
        } else {
            textfield.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("mjo-textfield").forEach((textfield) => {
        textfield.addEventListener("mjo-textfield-input", inputHandle);
        textfield.addEventListener("mjo-textfield-change", changeHandle);
        textfield.addEventListener("mjo-textfield-focus", focusHandle);
        textfield.addEventListener("mjo-textfield-blur", blurHandle);
        textfield.addEventListener("mjo-textfield-clear", clearHandle);
        textfield.addEventListener("mjo-textfield-password-toggle", passwordToggleHandle);
        textfield.addEventListener("mjo-textfield-keyup", keyupHandle);
    });
});

const inputHandle = (ev: Event) => {
    const detail = (ev as MjoTextfieldInputEvent).detail;
    console.log("Input event:", detail);
};

const changeHandle = (ev: Event) => {
    const detail = (ev as MjoTextfieldChangeEvent).detail;
    console.log("Change event:", detail);
};

const focusHandle = (ev: Event) => {
    const detail = (ev as MjoTextfieldFocusEvent).detail;
    console.log("Focus event:", detail);
};

const blurHandle = (ev: Event) => {
    const detail = (ev as MjoTextfieldBlurEvent).detail;
    console.log("Blur event:", detail);
};

const clearHandle = (ev: Event) => {
    const detail = (ev as MjoTextfieldClearEvent).detail;
    console.log("Clear event:", detail);
};

const passwordToggleHandle = (ev: Event) => {
    const detail = (ev as MjoTextfieldPasswordToggleEvent).detail;
    console.log("Password toggle event:", detail);
};

const keyupHandle = (ev: Event) => {
    const detail = (ev as MjoTextfieldKeyupEvent).detail;
    if (detail.key === "Enter") {
        console.log("Enter key pressed in textfield:", detail);
    }
};

window.changeTextfieldProp = changeTextfieldProp;

// Make functions globally available
declare global {
    interface Window {
        changeTextfieldProp: (prop: string, value: string | boolean) => void;
    }
}
