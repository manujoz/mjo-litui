// Link Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoLinkClickEvent } from "../../src/types/mjo-link";

// Playground interactions
function changeLinkProp(prop: string, value: string | boolean): void {
    const link = document.getElementById("playground-link");
    if (!link) return;

    if (typeof value === "string") {
        if (value === "") {
            link.removeAttribute(prop);
        } else {
            link.setAttribute(prop, value);
        }
    } else {
        if (value) {
            link.setAttribute(prop, "");
        } else {
            link.removeAttribute(prop);
        }
    }
}

// Function to change link text content
function changeLinkText(text: string): void {
    const link = document.getElementById("playground-link");
    if (!link) return;

    link.textContent = text || "Interactive Link";
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all mjo-link elements
    document.querySelectorAll("mjo-link").forEach((link) => {
        link.addEventListener("mjo-link:click", (ev: Event) => {
            const event = ev as MjoLinkClickEvent;
            const href = event.detail.href;
            const linkElement = event.detail.link;

            // Show alert for demonstration purposes
            alert(`Link clicked!\nHref: ${href || "No href set"}\nElement: ${linkElement.tagName}`);
        });
    });

    // Special handling for cover link demo
    const coverDemoCard = document.querySelector(".cover-demo-card");
    if (coverDemoCard) {
        coverDemoCard.addEventListener("click", (ev: Event) => {
            // Prevent double-clicking on cover links
            const target = ev.target as HTMLElement;
            if (target.tagName === "MJO-LINK") {
                ev.stopPropagation();
            }
        });
    }
});

// Make functions globally available
window.changeLinkProp = changeLinkProp;
window.changeLinkText = changeLinkText;

declare global {
    interface Window {
        changeLinkProp: (prop: string, value: string | boolean) => void;
        changeLinkText: (text: string) => void;
    }
}
