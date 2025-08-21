import { MjoAccordionToggleEvent } from "../../src/types/mjo-accordion";

import { AiFillHeart, AiFillStar, AiOutlineDown, AiOutlineLeft, AiOutlineRight, AiOutlineUp } from "mjo-icons/ai";

let itemCounter = 4;

function changeAccordionProp(prop: string, value: string | boolean): void {
    const accordion = document.getElementById("playground-accordion");
    if (!accordion) return;

    if (typeof value === "string") {
        accordion.setAttribute(prop, value);
    } else {
        if (value) {
            accordion.setAttribute(prop, "");
        } else {
            accordion.removeAttribute(prop);
        }
    }
}

function changeAccordionItemProp(prop: string, value: string | boolean): void {
    const accordion = document.getElementById("playground-accordion");
    if (!accordion) return;

    const firstItem = accordion.shadowRoot?.querySelector("mjo-accordion-item");
    if (!firstItem) return;

    let iconValue: string | undefined = undefined;
    if (prop === "icon") {
        if (value === "down") {
            iconValue = AiOutlineDown;
        } else if (value === "up") {
            iconValue = AiOutlineUp;
        } else if (value === "left") {
            iconValue = AiOutlineLeft;
        } else if (value === "star") {
            iconValue = AiFillStar;
        } else if (value === "heart") {
            iconValue = AiFillHeart;
        } else if (value === "default") {
            iconValue = AiOutlineRight;
        }

        value = iconValue as string;
    }

    if (typeof value === "string") {
        firstItem.setAttribute(prop, value);
    } else {
        if (value) {
            firstItem.setAttribute(prop, "");
        } else {
            firstItem.removeAttribute(prop);
        }
    }
}

function removeLastItem(): void {
    const accordion = document.getElementById("playground-accordion");
    if (!accordion) return;

    const items = accordion.querySelectorAll("mjo-accordion-item");
    if (items.length > 1) {
        // Keep at least one item
        const lastItem = items[items.length - 1];
        lastItem.removeEventListener("toggle", handleAccordionToggle);
        accordion.removeChild(lastItem);
    }
}

const handleAccordionToggle = (ev: Event) => {
    const event = ev as MjoAccordionToggleEvent;
    const { item, expanded } = event.detail;
    const title = item.getAttribute("itemTitle") || "Unknown";

    console.log(`Accordion item "${title}" ${expanded ? "expanded" : "collapsed"}`);

    // Optional: Show a subtle notification
    // You could integrate with mjo-notification component here
};

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all existing accordion items
    document.querySelectorAll("mjo-accordion").forEach((accordion) => {
        accordion.querySelectorAll("mjo-accordion-item").forEach((item) => {
            item.addEventListener("toggle", handleAccordionToggle);
        });
    });

    // Add some visual feedback for the playground
    const playgroundAccordion = document.getElementById("playground-accordion");
    if (playgroundAccordion) {
        playgroundAccordion.addEventListener("toggle", (ev: Event) => {
            const event = ev as MjoAccordionToggleEvent;
            // Add a subtle visual feedback
            const showcase = document.querySelector(".playground-showcase") as HTMLElement;
            if (showcase) {
                showcase.style.transform = "scale(1.02)";
                setTimeout(() => {
                    showcase.style.transform = "";
                }, 200);
            }
        });
    }

    // Add demo interaction for rich content examples
    const formButton = document.querySelector(".rich-content-form button");
    if (formButton) {
        formButton.addEventListener("click", () => {
            alert("Form submitted! (This is just a demo)");
        });
    }

    // Add hover effects for accordion showcases
    document.querySelectorAll(".accordion-showcase mjo-accordion-item").forEach((item) => {
        const htmlItem = item as HTMLElement;
        item.addEventListener("mouseenter", () => {
            htmlItem.style.transform = "translateX(4px)";
            htmlItem.style.transition = "transform 0.2s ease";
        });

        item.addEventListener("mouseleave", () => {
            htmlItem.style.transform = "";
        });
    });
});

// Make functions globally available
window.changeAccordionProp = changeAccordionProp;
window.changeAccordionItemProp = changeAccordionItemProp;
window.removeLastItem = removeLastItem;

// Type declarations for global functions
declare global {
    interface Window {
        changeAccordionProp: (prop: string, value: string | boolean) => void;
        changeAccordionItemProp: (prop: string, value: string | boolean) => void;
        removeLastItem: () => void;
    }
}
