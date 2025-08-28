// Listbox Interactive Demo TypeScript
// This functionality loads after client hydration

import { AiFillAccountBook, AiFillAlert, AiFillApi, AiFillAudio, AiFillBackward, AiFillHome } from "mjo-icons/ai";
import { MjoListboxChangeEvent, MjoListboxClickEvent, MjoListboxItemBlurEvent, MjoListboxItemFocusEvent } from "../../src/types/mjo-listbox";

// Sample data for different item types
const itemTypes = {
    basic: [
        { label: "Item 1", value: "item1" },
        { label: "Item 2", value: "item2" },
        { label: "Item 3", value: "item3" },
        { label: "Item 4", value: "item4" },
        { label: "Item 5", value: "item5" },
    ],
    icons: [
        { label: "Home", value: "home", startIcon: AiFillHome },
        { label: "Profile", value: "profile", startIcon: AiFillAccountBook, endIcon: AiFillAlert },
        { label: "Settings", value: "settings", endIcon: AiFillAlert },
        { label: "API", value: "api", startIcon: AiFillApi },
    ],
    colors: [
        { label: "Primary", value: "primary", color: "primary" },
        { label: "Secondary", value: "secondary", color: "secondary" },
        { label: "Success", value: "success", color: "success" },
        { label: "Warning", value: "warning", color: "warning" },
        { label: "Error", value: "error", color: "error" },
        { label: "Info", value: "info", color: "info" },
    ],
    descriptions: [
        { label: "Item 1", value: "item1", description: "This is the first item with a description" },
        { label: "Item 2", value: "item2", description: "This is the second item with more details" },
        { label: "Item 3", value: "item3", description: "This is the third item with information" },
        { label: "Item 4", value: "item4", description: "This is the fourth item", disabled: true },
    ],
    sections: [
        { section: "Group 1" },
        { label: "Item 1", value: "item1" },
        { label: "Item 2", value: "item2" },
        { section: "Group 2" },
        { label: "Item 3", value: "item3" },
        { label: "Item 4", value: "item4", disabled: true },
        { section: "Group 3" },
        { label: "Item 5", value: "item5" },
    ],
    mixed: [
        { section: "Navigation" },
        { label: "Home", value: "home", startIcon: AiFillHome, color: "primary" },
        { label: "Profile", value: "profile", startIcon: AiFillAccountBook, description: "View your profile", color: "secondary" },
        { section: "Actions" },
        { label: "Settings", value: "settings", endIcon: AiFillAlert, color: "info" },
        { label: "Audio", value: "audio", startIcon: AiFillAudio, description: "Audio settings", disabled: true },
        { label: "API", value: "api", startIcon: AiFillApi, endIcon: AiFillBackward, color: "warning" },
    ],
};

// Playground interactions
function changeListboxProp(prop: string, value: string): void {
    const listbox = document.getElementById("playground-listbox");
    if (!listbox) return;

    if (value === "") {
        listbox.removeAttribute(prop);
    } else {
        listbox.setAttribute(prop, value);
    }
}

// Change item type function
function changeItemType(type: string): void {
    const listbox = document.getElementById("playground-listbox") as any;
    if (!listbox) return;

    // Update active button
    const buttons = document.querySelectorAll(".button-group button");
    buttons.forEach((btn) => btn.classList.remove("active"));

    const clickedButton = document.querySelector(`button[onclick="changeItemType('${type}')"]`);
    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    // Set new items
    listbox.items = itemTypes[type as keyof typeof itemTypes] || itemTypes.basic;

    // Clear event info
    const eventInfo = document.getElementById("event-info");
    if (eventInfo) {
        eventInfo.innerHTML = `<span style="color: var(--mjo-foreground-color-low);">Items changed to: ${type}. Click an item to see event details...</span>`;
    }
}

// Update event information display
function updateEventInfo(eventType: string, details: any): void {
    const eventInfo = document.getElementById("event-info");
    if (!eventInfo) return;

    let content = `<div style="margin-bottom: 8px;"><strong>${eventType}</strong></div>`;

    if (details.item) {
        content += `<div style="font-size: 0.8em; margin-bottom: 4px;">Label: ${details.item.label}</div>`;
        if (details.item.value) {
            content += `<div style="font-size: 0.8em; margin-bottom: 4px;">Value: ${details.item.value}</div>`;
        }
        if (details.item.color) {
            content += `<div style="font-size: 0.8em; margin-bottom: 4px;">Color: ${details.item.color}</div>`;
        }
    }

    if (details.selectedItems) {
        content += `<div style="font-size: 0.8em; margin-bottom: 4px;">Selected: ${details.selectedItems.length} item(s)</div>`;
        if (details.selectedValues) {
            content += `<div style="font-size: 0.8em;">Values: [${details.selectedValues.join(", ")}]</div>`;
        }
    }

    eventInfo.innerHTML = content;
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const listboxElements = document.querySelectorAll("mjo-listbox");

    listboxElements.forEach((listbox) => {
        // Click events
        listbox.addEventListener("mjo-listbox:click", (ev: Event) => {
            const event = ev as MjoListboxClickEvent;
            updateEventInfo("Item Clicked", event.detail);
            console.log("Listbox click:", event.detail);
        });

        // Change events (selection)
        listbox.addEventListener("mjo-listbox:change", (ev: Event) => {
            const event = ev as MjoListboxChangeEvent;
            updateEventInfo("Selection Changed", event.detail);
            console.log("Listbox selection changed:", event.detail);
        });

        // Focus events
        listbox.addEventListener("mjo-listbox:focus", (ev: Event) => {
            const event = ev as MjoListboxItemFocusEvent;
            console.log("Item focused:", event.detail);
        });

        // Blur events
        listbox.addEventListener("mjo-listbox:blur", (ev: Event) => {
            const event = ev as MjoListboxItemBlurEvent;
            console.log("Item blurred:", event.detail);
        });
    });

    // Add keyboard navigation instructions to first example
    const playgroundListbox = document.getElementById("playground-listbox");
    if (playgroundListbox) {
        const showcase = playgroundListbox.closest(".playground-showcase");
        if (showcase) {
            const instructions = document.createElement("div");
            instructions.innerHTML = `
                <div style="position: absolute; top: 10px; right: 10px; background: var(--mjo-background-color-card-low); padding: 8px 12px; border-radius: 6px; font-size: 0.75em; color: var(--mjo-foreground-color-low); max-width: 200px; line-height: 1.4;">
                    <strong>Keyboard Navigation:</strong><br>
                    • Arrow keys: Navigate<br>
                    • Enter/Space: Select<br>
                    • Home/End: Jump
                </div>
            `;
            showcase.appendChild(instructions);
        }
    }
});

// Make functions globally available
window.changeListboxProp = changeListboxProp;
window.changeItemType = changeItemType;

declare global {
    interface Window {
        changeListboxProp: (prop: string, value: string) => void;
        changeItemType: (type: string) => void;
    }
}
