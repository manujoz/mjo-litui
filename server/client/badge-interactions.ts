// Badge Interactive Demo TypeScript
// This functionality loads after client hydration

import { AiFillAndroid, AiFillApi, AiFillApple, AiFillBell, AiFillHeart, AiFillStar, AiFillWindows } from "mjo-icons/ai";
import { MjoBadgeClickEvent } from "../../src/types/mjo-badge";

// Playground interactions
function changeBadgeProp(prop: string, value: string | boolean | number): void {
    const badge = document.getElementById("playground-badge");
    if (!badge) return;

    let icon: string | undefined = undefined;
    if (prop === "label" && typeof value === "string") {
        // Handle icon replacements for label
        if (value === "icon1") {
            icon = AiFillApple;
        } else if (value === "icon2") {
            icon = AiFillAndroid;
        } else if (value === "icon3") {
            icon = AiFillWindows;
        } else if (value === "icon4") {
            icon = AiFillApi;
        } else if (value === "icon5") {
            icon = AiFillHeart;
        } else if (value === "icon6") {
            icon = AiFillStar;
        }

        if (icon) {
            value = icon;
        }
    }

    if (typeof value === "string") {
        badge.setAttribute(prop, value);
    } else if (typeof value === "number") {
        badge.setAttribute(prop, value.toString());
    } else {
        if (value) {
            badge.setAttribute(prop, "");
        } else {
            badge.removeAttribute(prop);
        }
    }
}

function changeBadgeTarget(targetType: string): void {
    const playground = document.querySelector(".playground-showcase");
    if (!playground) return;

    // Clear current content
    playground.innerHTML = "";

    // Get current badge properties
    const badge = document.getElementById("playground-badge");
    const label = (document.querySelector("input[name='label']") as HTMLInputElement)?.value || "5";
    const color = (document.querySelector("select[name='color']") as HTMLSelectElement)?.value || "primary";
    const size = (document.querySelector("select[name='size']") as HTMLSelectElement)?.value || "medium";
    const variant = (document.querySelector("select[name='variant']") as HTMLSelectElement)?.value || "solid";
    const position = (document.querySelector("select[name='position']") as HTMLSelectElement)?.value || "top-right";
    const offsetx = (document.querySelector("input[name='offsetx']") as HTMLInputElement)?.value || "0";
    const offsety = (document.querySelector("input[name='offsety']") as HTMLInputElement)?.value || "0";
    const value = (document.querySelector("input[name='value']") as HTMLInputElement)?.value || "";
    const show = (document.querySelector("input[name='show']") as HTMLInputElement)?.checked || true;
    const clickable = (document.querySelector("input[name='clickable']") as HTMLInputElement)?.checked || false;
    const disabled = (document.querySelector("input[name='disabled']") as HTMLInputElement)?.checked || false;
    const hideOutline = (document.querySelector("input[name='hideOutline']") as HTMLInputElement)?.checked || false;

    let containerElement: HTMLElement;

    switch (targetType) {
        case "avatar":
            containerElement = document.createElement("mjo-avatar");
            containerElement.setAttribute("id", "badge-target");
            containerElement.setAttribute("name", "JD");
            containerElement.setAttribute("size", "large");
            break;
        case "icon":
            containerElement = document.createElement("mjo-icon");
            containerElement.setAttribute("id", "badge-target");
            containerElement.setAttribute("src", AiFillBell);
            containerElement.setAttribute("size", "large");
            containerElement.setAttribute("color", "info");
            break;
        case "button":
            containerElement = document.createElement("mjo-button");
            containerElement.setAttribute("id", "badge-target");
            containerElement.setAttribute("variant", "solid");
            containerElement.setAttribute("color", "primary");
            containerElement.textContent = "Button";
            break;
        default:
            return;
    }

    // Create new badge
    const newBadge = document.createElement("mjo-badge");
    newBadge.setAttribute("id", "playground-badge");
    newBadge.setAttribute("label", label);
    newBadge.setAttribute("color", color);
    newBadge.setAttribute("size", size);
    newBadge.setAttribute("variant", variant);
    newBadge.setAttribute("position", position);
    newBadge.setAttribute("offsetx", offsetx);
    newBadge.setAttribute("offsety", offsety);
    newBadge.setAttribute("value", value);

    if (show) newBadge.setAttribute("show", "");
    if (clickable) newBadge.setAttribute("clickable", "");
    if (disabled) newBadge.setAttribute("disabled", "");
    if (hideOutline) newBadge.setAttribute("hideOutline", "");

    // Add badge to container
    containerElement.appendChild(newBadge);
    playground.appendChild(containerElement);

    // Update button states
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeButton = Array.from(buttons).find((btn) => btn.textContent?.toLowerCase() === targetType.toLowerCase());
    if (activeButton) {
        activeButton.classList.add("active");
    }

    // Add event listener to new badge
    newBadge.addEventListener("mjo-badge:click", badgeClickHandle);
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all badges
    document.querySelectorAll("mjo-badge").forEach((badge) => {
        badge.addEventListener("mjo-badge:click", badgeClickHandle);
    });

    // Set initial target button state
    const iconButton = document.querySelector(".button-group button[onclick=\"changeBadgeTarget('icon')\"]");
    if (iconButton) {
        iconButton.classList.remove("active");
    }

    const avatarButton = document.querySelector(".button-group button[onclick=\"changeBadgeTarget('avatar')\"]");
    if (avatarButton) {
        avatarButton.classList.add("active");
    }
});

const badgeClickHandle = (ev: Event) => {
    const detail = (ev as MjoBadgeClickEvent).detail;
    const message = detail.value
        ? `Badge clicked! Value: "${detail.value}", Label: "${detail.label}", Position: ${detail.position}, Color: ${detail.color}`
        : `Badge clicked! Label: "${detail.label}", Position: ${detail.position}, Color: ${detail.color}`;
    alert(message);
};

window.changeBadgeProp = changeBadgeProp;
window.changeBadgeTarget = changeBadgeTarget;

// Make functions globally available
declare global {
    interface Window {
        changeBadgeProp: (prop: string, value: string | boolean | number) => void;
        changeBadgeTarget: (targetType: string) => void;
    }
}
