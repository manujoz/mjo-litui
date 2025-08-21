// Avatar Interactive Demo TypeScript
// This functionality loads after client hydration

import { AiFillAndroid, AiFillApple, AiFillWindows } from "mjo-icons/ai";
import { MjoAvatarClickEvent } from "../../src/types/mjo-avatar";

// Playground interactions
function changeAvatarProp(prop: string, value: string | boolean): void {
    const avatar = document.getElementById("playground-avatar");
    if (!avatar) return;

    let icon: string | undefined = undefined;
    if (prop === "fallbackIcon") {
        if (value === "icon1") {
            icon = AiFillApple;
        } else if (value === "icon2") {
            icon = AiFillAndroid;
        } else if (value === "icon3") {
            icon = AiFillWindows;
        }

        value = icon as string;
    }

    if (typeof value === "string") {
        if (prop === "name") {
            avatar.setAttribute("name", value || "Interactive Demo");
        } else {
            avatar.setAttribute(prop, value);
        }
    } else {
        if (value) {
            avatar.setAttribute(prop, "");
        } else {
            avatar.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("mjo-avatar").forEach((avatar) => {
        avatar.addEventListener("mjo-avatar-click", (ev: Event) => {
            const value = (ev as MjoAvatarClickEvent).detail.value;
            alert(value);
        });
    });
});

window.changeAvatarProp = changeAvatarProp;

// Make functions globally available
declare global {
    interface Window {
        changeAvatarProp: (prop: string, value: string | boolean) => void;
    }
}
