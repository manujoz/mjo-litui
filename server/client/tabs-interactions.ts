import { MjoTab } from "../../src/components/tabs/mjo-tab.js";
import { MjoTabsChangeEvent, MjoTabsUpdatedEvent } from "../../src/types/mjo-tabs.js";

let tabCounter = 4; // Starting from 4 since we have 3 initial tabs

function changeTabsProp(prop: string, value: string | boolean): void {
    const tabs = document.getElementById("playground-tabs");
    if (!tabs) return;

    if (typeof value === "string") {
        tabs.setAttribute(prop, value);
    } else {
        if (value) {
            tabs.setAttribute(prop, "");
        } else {
            tabs.removeAttribute(prop);
        }
    }
}

function switchToTab(index: number): void {
    const tabs = document.getElementById("playground-tabs") as any;
    if (!tabs || !tabs.setTab) return;

    tabs.setTab(index);
}

function addNewTab(): void {
    const tabs = document.getElementById("playground-tabs");
    if (!tabs) return;

    const newTab = document.createElement("mjo-tab") as MjoTab;
    newTab.label = `Dynamic ${tabCounter}`;

    // Create rich content for the new tab
    const tabContent = document.createElement("div");
    tabContent.className = "tab-content";
    tabContent.innerHTML = `
        <h3>🚀 Dynamic Tab ${tabCounter}</h3>
        <p>This tab was added dynamically at ${new Date().toLocaleTimeString()}.</p>
        <div class="dynamic-features">
            <div class="feature-item">
                <strong>Tab Number:</strong> ${tabCounter}
            </div>
            <div class="feature-item">
                <strong>Creation Time:</strong> ${new Date().toLocaleString()}
            </div>
            <div class="feature-item">
                <strong>Type:</strong> Dynamic Content
            </div>
        </div>
        <button class="demo-btn" onclick="alert('Hello from dynamic tab ${tabCounter}!')">
            Interact with Tab ${tabCounter}
        </button>
    `;

    newTab.appendChild(tabContent);
    tabs.appendChild(newTab);

    tabCounter++;

    // Switch to the new tab after a short delay to allow for DOM updates
    setTimeout(() => {
        const tabsInstance = tabs as any;
        if (tabsInstance.tabs && tabsInstance.tabs.length > 0) {
            switchToTab(tabsInstance.tabs.length - 1);
        }
    }, 100);
}

function removeLastTab(): void {
    const tabs = document.getElementById("playground-tabs");
    if (!tabs) return;

    const tabElements = tabs.querySelectorAll("mjo-tab");
    if (tabElements.length <= 1) {
        alert("Cannot remove the last tab. At least one tab must remain.");
        return;
    }

    const lastTab = tabElements[tabElements.length - 1];
    lastTab.remove();

    // Ensure we're not on a removed tab
    setTimeout(() => {
        const tabsInstance = tabs as any;
        if (tabsInstance.tabs && tabsInstance.activeIndex >= tabsInstance.tabs.length) {
            switchToTab(0);
        }
    }, 100);
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all tabs components
    document.querySelectorAll("mjo-tabs").forEach((tabsElement) => {
        tabsElement.addEventListener("mjo-tabs:changed", (ev: Event) => {
            const changeEvent = ev as MjoTabsChangeEvent;
            console.log(`Tab changed to index ${changeEvent.detail.index}:`, changeEvent.detail.tab.label);

            // Update visual feedback in playground
            if (tabsElement.id === "playground-tabs") {
                updateActiveTabIndicator(changeEvent.detail.index);
            }
        });

        tabsElement.addEventListener("mjo-tabs:updated", (ev: Event) => {
            const updateEvent = ev as MjoTabsUpdatedEvent;
            console.log(`Tabs updated. Total tabs: ${updateEvent.detail.tabs.length}`);
        });
    });

    // Add demo button interactions
    document.querySelectorAll(".demo-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const buttonText = this.textContent || "Button";
            showNotification(`${buttonText} clicked!`);
        });
    });

    // Add action button interactions
    document.querySelectorAll(".action-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const buttonText = this.textContent || "Action";
            showNotification(`${buttonText} executed!`);
        });
    });

    console.log("Tabs interactions initialized successfully");
});

function updateActiveTabIndicator(activeIndex: number): void {
    // Update the tab action buttons to show which tab is active
    const tabButtons = document.querySelectorAll(".control-group .button-group .control-btn");
    tabButtons.forEach((button, index) => {
        if (index === activeIndex) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

function showNotification(message: string): void {
    // Create a simple notification
    const notification = document.createElement("div");
    notification.className = "demo-notification";
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--mjo-primary-color);
        color: var(--mjo-primary-foreground-color);
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(-10px)";
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Make functions globally available
window.changeTabsProp = changeTabsProp;
window.switchToTab = switchToTab;
window.addNewTab = addNewTab;
window.removeLastTab = removeLastTab;

declare global {
    interface Window {
        changeTabsProp: (prop: string, value: string | boolean) => void;
        switchToTab: (index: number) => void;
        addNewTab: () => void;
        removeLastTab: () => void;
    }
}
