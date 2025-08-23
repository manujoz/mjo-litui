// Drawer Interactive Demo TypeScript
// This functionality loads after client hydration

import { html } from "lit";
import { MjoDrawer } from "../../src/mjo-drawer.js";
import { DrawerShowParams } from "../../src/types/mjo-drawer.js";

// Current drawer configuration for the playground
let currentConfig: DrawerShowParams = {
    title: "Sample Drawer",
    content: "This is the default content for the playground drawer.",
    position: "right",
    width: "400px",
    height: "300px",
    blocked: false,
    animationDuration: 200,
};

// Additional accessibility settings
let currentAccessibility = {
    trapFocus: true,
    restoreFocus: true,
    closeOnEscape: true,
    ariaLabelledby: "",
    ariaDescribedby: "",
    label: "",
};

// Content templates for different content types
const contentTemplates = {
    text: "This is sample text content for the drawer. You can put any information here that you want to display to users.",
    form: html`
        <div style="padding: 20px;">
            <h3>Contact Form</h3>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 4px;">Name:</label>
                <input type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter your name" />
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 4px;">Email:</label>
                <input type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter your email" />
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 4px;">Message:</label>
                <textarea
                    style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; min-height: 80px;"
                    placeholder="Your message"
                ></textarea>
            </div>
            <button style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Submit</button>
        </div>
    `,
    list: html`
        <div style="padding: 20px;">
            <h3>Menu Items</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 12px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="alert('Home clicked')">🏠 Home</li>
                <li style="padding: 12px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="alert('Profile clicked')">👤 Profile</li>
                <li style="padding: 12px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="alert('Settings clicked')">⚙️ Settings</li>
                <li style="padding: 12px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="alert('Help clicked')">❓ Help</li>
                <li style="padding: 12px; cursor: pointer;" onclick="alert('Logout clicked')">🚪 Logout</li>
            </ul>
        </div>
    `,
    cards: html`
        <div style="padding: 20px;">
            <h3>Product Cards</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px;">
                    <h4 style="margin: 0 0 8px 0;">Product A</h4>
                    <p style="color: #666; margin: 0 0 12px 0;">High-quality product with excellent features.</p>
                    <div style="font-weight: bold; color: #2563eb;">$29.99</div>
                </div>
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px;">
                    <h4 style="margin: 0 0 8px 0;">Product B</h4>
                    <p style="color: #666; margin: 0 0 12px 0;">Another amazing product for your needs.</p>
                    <div style="font-weight: bold; color: #2563eb;">$39.99</div>
                </div>
            </div>
        </div>
    `,
    custom: html`
        <div style="padding: 20px; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; margin: 10px;">
            <h3 style="margin: 0 0 16px 0;">Custom HTML Content</h3>
            <p>This drawer contains custom HTML with styling, gradients, and interactive elements.</p>
            <div style="display: flex; gap: 12px; margin-top: 16px;">
                <button
                    style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; border-radius: 4px; cursor: pointer;"
                    onclick="alert('Button 1 clicked!')"
                >
                    Action 1
                </button>
                <button
                    style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; border-radius: 4px; cursor: pointer;"
                    onclick="alert('Button 2 clicked!')"
                >
                    Action 2
                </button>
            </div>
        </div>
    `,
};

// Playground interactions
function changeDrawerProp(prop: string, value: string | boolean | number): void {
    switch (prop) {
        case "position":
            currentConfig.position = value as "top" | "right" | "bottom" | "left";
            break;
        case "title":
            currentConfig.title = value as string;
            break;
        case "width":
            currentConfig.width = value as string;
            break;
        case "height":
            currentConfig.height = value as string;
            break;
        case "animationDuration":
            currentConfig.animationDuration = value as number;
            break;
        case "blocked":
            currentConfig.blocked = value as boolean;
            break;
        case "contentType":
            const template = contentTemplates[value as keyof typeof contentTemplates];
            if (template) {
                currentConfig.content = template;
            }
            break;
        case "trapFocus":
            currentAccessibility.trapFocus = value as boolean;
            break;
        case "restoreFocus":
            currentAccessibility.restoreFocus = value as boolean;
            break;
        case "closeOnEscape":
            currentAccessibility.closeOnEscape = value as boolean;
            break;
        case "ariaLabelledby":
            currentAccessibility.ariaLabelledby = value as string;
            break;
        case "ariaDescribedby":
            currentAccessibility.ariaDescribedby = value as string;
            break;
        case "label":
            currentAccessibility.label = value as string;
            break;
    }

    // Update the drawer element properties
    const drawer = document.getElementById("playground-drawer") as MjoDrawer;
    if (drawer) {
        // Update accessibility properties
        if (currentAccessibility.trapFocus !== undefined) drawer.trapFocus = currentAccessibility.trapFocus;
        if (currentAccessibility.restoreFocus !== undefined) drawer.restoreFocus = currentAccessibility.restoreFocus;
        if (currentAccessibility.closeOnEscape !== undefined) drawer.closeOnEscape = currentAccessibility.closeOnEscape;
        if (currentAccessibility.ariaLabelledby) drawer.ariaLabelledby = currentAccessibility.ariaLabelledby;
        if (currentAccessibility.ariaDescribedby) drawer.ariaDescribedby = currentAccessibility.ariaDescribedby;
        if (currentAccessibility.label) drawer.label = currentAccessibility.label;
    }

    console.log("Drawer configuration updated:", { currentConfig, currentAccessibility });
}

// Main playground drawer functions
function openDrawer(): void {
    const drawer = document.getElementById("playground-drawer") as MjoDrawer;
    if (drawer && drawer.controller) {
        drawer.controller.show({
            ...currentConfig,
            onOpen: () => {
                console.log("Playground drawer opened");
                showStateIndicator("opened");
            },
            onClose: () => {
                console.log("Playground drawer closed");
                showStateIndicator("closed");
            },
        });
    }
}

function closeDrawer(): void {
    const drawer = document.getElementById("playground-drawer") as MjoDrawer;
    if (drawer && drawer.controller) {
        drawer.controller.close();
    }
}

// Example drawer functions
function showLeftDrawer(): void {
    showExampleDrawer("left-drawer", {
        title: "Left Navigation",
        content: contentTemplates.list,
        position: "left",
        width: "300px",
    });
}

function showRightDrawer(): void {
    showExampleDrawer("right-drawer", {
        title: "Right Panel",
        content: "This drawer slides in from the right side. Perfect for sidebars, filters, or additional information.",
        position: "right",
        width: "350px",
    });
}

function showTopDrawer(): void {
    showExampleDrawer("top-drawer", {
        title: "Top Notification",
        content: "This drawer slides down from the top. Great for notifications, alerts, or quick actions.",
        position: "top",
        height: "200px",
    });
}

function showBottomDrawer(): void {
    showExampleDrawer("bottom-drawer", {
        title: "Bottom Sheet",
        content: contentTemplates.cards,
        position: "bottom",
        height: "400px",
    });
}

function showSmallDrawer(): void {
    showExampleDrawer("small-drawer", {
        title: "Compact View",
        content: "This is a small drawer (250px width) suitable for quick actions or minimal content.",
        position: "right",
        width: "250px",
    });
}

function showLargeDrawer(): void {
    showExampleDrawer("large-drawer", {
        title: "Detailed View",
        content: contentTemplates.form,
        position: "right",
        width: "600px",
    });
}

function showPercentDrawer(): void {
    showExampleDrawer("percent-drawer", {
        title: "Responsive Width",
        content: "This drawer uses percentage width (60%) which adapts to screen size. Resize your window to see the effect!",
        position: "right",
        width: "60%",
    });
}

function showFormDrawer(): void {
    showExampleDrawer("form-drawer", {
        title: "Contact Form",
        content: contentTemplates.form,
        position: "right",
        width: "400px",
    });
}

function showListDrawer(): void {
    showExampleDrawer("list-drawer", {
        title: "Navigation Menu",
        content: contentTemplates.list,
        position: "left",
        width: "280px",
    });
}

function showNavDrawer(): void {
    showExampleDrawer("nav-drawer", {
        title: "Main Navigation",
        content: html`
            <div style="padding: 20px;">
                <nav style="display: flex; flex-direction: column; gap: 8px;">
                    <a
                        href="#dashboard"
                        style="padding: 12px; text-decoration: none; color: inherit; border-radius: 4px; background: #f3f4f6;"
                        onclick="alert('Dashboard')"
                        >📊 Dashboard</a
                    >
                    <a href="#projects" style="padding: 12px; text-decoration: none; color: inherit; border-radius: 4px;" onclick="alert('Projects')"
                        >📋 Projects</a
                    >
                    <a href="#team" style="padding: 12px; text-decoration: none; color: inherit; border-radius: 4px;" onclick="alert('Team')">👥 Team</a>
                    <a href="#calendar" style="padding: 12px; text-decoration: none; color: inherit; border-radius: 4px;" onclick="alert('Calendar')"
                        >📅 Calendar</a
                    >
                    <a href="#reports" style="padding: 12px; text-decoration: none; color: inherit; border-radius: 4px;" onclick="alert('Reports')"
                        >📈 Reports</a
                    >
                </nav>
            </div>
        `,
        position: "left",
        width: "320px",
    });
}

function showBlockedDrawer(): void {
    showExampleDrawer("blocked-drawer", {
        title: "Important Notice",
        content: html`
            <div style="padding: 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                <h3>Attention Required</h3>
                <p>This drawer is blocked - you cannot close it using the X button or ESC key.</p>
                <p style="color: #dc2626;">You must use the action button below to proceed.</p>
                <button
                    style="background: #dc2626; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; margin-top: 16px;"
                    onclick="closeBlockedDrawer()"
                >
                    I Understand - Close Drawer
                </button>
            </div>
        `,
        position: "right",
        width: "450px",
        blocked: true,
    });
}

function showNoTitleDrawer(): void {
    showExampleDrawer("notitle-drawer", {
        content: html`
            <div style="padding: 20px;">
                <h2 style="margin: 0 0 16px 0;">No Title Drawer</h2>
                <p>This drawer doesn't have a title bar. The content starts immediately, giving you more space and a cleaner look.</p>
                <p>Notice there's no title bar with a close button - but you can still close it with ESC or clicking outside.</p>
            </div>
        `,
        position: "right",
        width: "400px",
    });
}

function showSlowDrawer(): void {
    showExampleDrawer("slow-drawer", {
        title: "Slow Animation",
        content: "This drawer has a custom animation duration of 1 second (1000ms). Notice how it opens and closes more slowly than the others.",
        position: "right",
        width: "400px",
        animationDuration: 1000,
    });
}

function showAriaDrawer(): void {
    showExampleDrawer("aria-drawer", {
        title: "Accessibility Enhanced",
        content: html`
            <div style="padding: 20px;">
                <div id="drawer-title" style="font-weight: bold; margin-bottom: 16px;">ARIA Enhanced Drawer</div>
                <div id="drawer-desc">
                    <p>This drawer has proper ARIA labels for better screen reader support:</p>
                    <ul style="text-align: left; margin: 16px 0;">
                        <li><strong>aria-labelledby:</strong> References the title element</li>
                        <li><strong>aria-describedby:</strong> References this description</li>
                        <li><strong>role="dialog":</strong> Identifies as a dialog</li>
                        <li><strong>aria-modal="true":</strong> Indicates modal behavior</li>
                    </ul>
                    <p>Screen readers will announce this properly to users.</p>
                </div>
            </div>
        `,
        position: "right",
        width: "500px",
    });
}

function showFocusDrawer(): void {
    showExampleDrawer("focus-drawer", {
        title: "Focus Management Demo",
        content: html`
            <div style="padding: 20px;">
                <p style="margin-bottom: 16px;">
                    This drawer demonstrates focus trapping. Try pressing Tab to see how focus cycles through the focusable elements:
                </p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <input type="text" placeholder="First input" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
                    <input type="text" placeholder="Second input" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
                    <button style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Focusable Button
                    </button>
                    <select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                    <textarea placeholder="Text area" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; min-height: 60px;"></textarea>
                </div>
                <p style="margin-top: 16px; font-size: 0.9em; color: #666;">Press Tab/Shift+Tab to navigate. Focus should stay within this drawer.</p>
            </div>
        `,
        position: "right",
        width: "450px",
    });
}

// Helper function to show example drawers
function showExampleDrawer(drawerId: string, config: DrawerShowParams): void {
    const drawer = document.getElementById(drawerId) as MjoDrawer;
    if (drawer && drawer.controller) {
        drawer.controller.show({
            ...config,
            onOpen: () => {
                console.log(`${drawerId} opened`);
                showStateIndicator("opened");
            },
            onClose: () => {
                console.log(`${drawerId} closed`);
                showStateIndicator("closed");
            },
        });
    }
}

// Helper function for blocked drawer close
function closeBlockedDrawer(): void {
    const drawer = document.getElementById("blocked-drawer") as MjoDrawer;
    if (drawer && drawer.controller) {
        drawer.controller.close();
    }
}

// Visual feedback for drawer state changes
function showStateIndicator(state: "opened" | "closed"): void {
    const indicator = document.createElement("div");
    indicator.className = `drawer-state-indicator visible ${state === "opened" ? "opening" : "closing"}`;
    indicator.textContent = state === "opened" ? "Drawer Opened" : "Drawer Closed";

    document.body.appendChild(indicator);

    setTimeout(() => {
        indicator.classList.remove("visible");
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 300);
    }, 2000);
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("Drawer interactions initialized");

    // Ensure currentConfig has required content
    if (!currentConfig.content) {
        currentConfig.content = contentTemplates.text;
    }

    // Add event listeners for any custom drawer events if needed
    // (The drawer component uses a controller pattern, so events are handled via callbacks)
});

// Make functions globally available
declare global {
    interface Window {
        changeDrawerProp: (prop: string, value: string | boolean | number) => void;
        openDrawer: () => void;
        closeDrawer: () => void;
        showLeftDrawer: () => void;
        showRightDrawer: () => void;
        showTopDrawer: () => void;
        showBottomDrawer: () => void;
        showSmallDrawer: () => void;
        showLargeDrawer: () => void;
        showPercentDrawer: () => void;
        showFormDrawer: () => void;
        showListDrawer: () => void;
        showNavDrawer: () => void;
        showBlockedDrawer: () => void;
        showNoTitleDrawer: () => void;
        showSlowDrawer: () => void;
        showAriaDrawer: () => void;
        showFocusDrawer: () => void;
        closeBlockedDrawer: () => void;
    }
}

// Export functions to window object
window.changeDrawerProp = changeDrawerProp;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.showLeftDrawer = showLeftDrawer;
window.showRightDrawer = showRightDrawer;
window.showTopDrawer = showTopDrawer;
window.showBottomDrawer = showBottomDrawer;
window.showSmallDrawer = showSmallDrawer;
window.showLargeDrawer = showLargeDrawer;
window.showPercentDrawer = showPercentDrawer;
window.showFormDrawer = showFormDrawer;
window.showListDrawer = showListDrawer;
window.showNavDrawer = showNavDrawer;
window.showBlockedDrawer = showBlockedDrawer;
window.showNoTitleDrawer = showNoTitleDrawer;
window.showSlowDrawer = showSlowDrawer;
window.showAriaDrawer = showAriaDrawer;
window.showFocusDrawer = showFocusDrawer;
window.closeBlockedDrawer = closeBlockedDrawer;
