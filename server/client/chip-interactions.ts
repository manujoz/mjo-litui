import { MjoChipClickEvent, MjoChipCloseEvent } from "../../src/types/mjo-chip";

import { AiFillAndroid, AiFillApi, AiFillApple, AiFillAudio, AiFillBackward, AiFillWindows } from "mjo-icons/ai";

function changeChipProp(prop: string, value: string | boolean): void {
    const chip = document.getElementById("playground-chip");
    if (!chip) return;

    let icon: string | undefined = undefined;
    if (prop === "endIcon" || prop === "startIcon") {
        if (value === "icon1") {
            icon = AiFillApple;
        } else if (value === "icon2") {
            icon = AiFillAndroid;
        } else if (value === "icon3") {
            icon = AiFillWindows;
        } else if (value === "icon4") {
            icon = AiFillApi;
        } else if (value === "icon5") {
            icon = AiFillAudio;
        } else if (value === "icon6") {
            icon = AiFillBackward;
        }

        value = icon as string;
    }

    if (typeof value === "string") {
        if (prop === "name") {
            chip.setAttribute("name", value || "Interactive Demo");
        } else {
            chip.setAttribute(prop, value);
        }
    } else {
        if (value) {
            chip.setAttribute(prop, "");
        } else {
            chip.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("mjo-chip").forEach((chip) => {
        chip.addEventListener("mjo-chip-click", clickHandle);
        chip.addEventListener("mjo-chip-close", closeHandle);
    });
});

const clickHandle = (ev: Event) => {
    const value = (ev as MjoChipClickEvent).detail.value;
    alert("Clicked chip with value: " + value);
};

const closeHandle = (ev: Event) => {
    const value = (ev as MjoChipCloseEvent).detail.value;
    alert("Closed chip with value: " + value);

    setTimeout(() => {
        const chip = document.createElement("mjo-chip");

        const label = document.querySelector("input[name='label']") as HTMLInputElement;
        const color = document.querySelector("select[name='color']") as HTMLSelectElement;
        const variant = document.querySelector("select[name='variant']") as HTMLSelectElement;
        const size = document.querySelector("select[name='size']") as HTMLSelectElement;
        const radius = document.querySelector("select[name='radius']") as HTMLSelectElement;
        const startIcon = document.querySelector("select[name='startIcon']") as HTMLSelectElement;
        const endIcon = document.querySelector("select[name='endIcon']") as HTMLSelectElement;
        const clickable = document.querySelector("input[name='clickable']") as HTMLInputElement;
        const closable = document.querySelector("input[name='closable']") as HTMLInputElement;
        const disabled = document.querySelector("input[name='disabled']") as HTMLInputElement;
        const value = document.querySelector("input[name='value']") as HTMLInputElement;

        chip.setAttribute("id", "playground-chip");
        chip.setAttribute("label", label ? label.value : "New Chip");

        if (color) chip.setAttribute("color", color ? color.value : "default");
        if (variant) chip.setAttribute("variant", variant ? variant.value : "solid");
        if (size) chip.setAttribute("size", size ? size.value : "medium");
        if (radius) chip.setAttribute("radius", radius ? radius.value : "full");
        if (clickable.checked) chip.setAttribute("clickable", "");
        if (closable.checked) chip.setAttribute("closable", "");
        if (disabled.checked) chip.setAttribute("disabled", "");
        if (value) chip.setAttribute("value", value ? value.value : "");

        // Reswt startIcon and endIcon selects
        if (startIcon) startIcon.selectedIndex = 0;
        if (endIcon) endIcon.selectedIndex = 0;

        const container = document.querySelector(".playground-showcase");
        if (container) {
            container.textContent = "";
            container.appendChild(chip);
            chip.addEventListener("mjo-chip-click", clickHandle);
            chip.addEventListener("mjo-chip-close", closeHandle);
        }
    }, 1500);
};

window.changeChipProp = changeChipProp;

// Make functions globally available
declare global {
    interface Window {
        changeChipProp: (prop: string, value: string | boolean) => void;
    }
}
