// Dropdown Interactive Demo TypeScript
// This functionality loads after client hydration

import { css, html } from "lit";
import { MjoDropdownCloseEvent, MjoDropdownOpenEvent } from "../../src/types/mjo-dropdown";

// Content templates for different dropdown types
const contentTemplates = {
    menu: html`
        <div class="dropdown-menu">
            <div class="dropdown-item" tabindex="0">📝 Edit</div>
            <div class="dropdown-item" tabindex="0">📋 Copy</div>
            <div class="dropdown-item" tabindex="0">📁 Move</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item danger" tabindex="0">🗑️ Delete</div>
        </div>
    `,
    form: html`
        <div class="dropdown-form">
            <h4>Quick Form</h4>
            <label>
                <span>Name:</span>
                <input type="text" placeholder="Enter name..." />
            </label>
            <label>
                <span>Email:</span>
                <input type="email" placeholder="Enter email..." />
            </label>
            <div class="form-actions">
                <button type="button" class="btn-primary">Submit</button>
                <button type="button" class="btn-secondary">Cancel</button>
            </div>
        </div>
    `,
    list: html`
        <div class="dropdown-list">
            <div class="list-header">Recent Items</div>
            <div class="list-item">
                <span class="item-icon">📄</span>
                <span class="item-text">Document 1.pdf</span>
                <span class="item-date">Today</span>
            </div>
            <div class="list-item">
                <span class="item-icon">📊</span>
                <span class="item-text">Spreadsheet.xlsx</span>
                <span class="item-date">Yesterday</span>
            </div>
            <div class="list-item">
                <span class="item-icon">🖼️</span>
                <span class="item-text">image.png</span>
                <span class="item-date">2 days ago</span>
            </div>
            <div class="list-footer">
                <button type="button" class="btn-link">View All</button>
            </div>
        </div>
    `,
    cards: html`
        <div class="dropdown-cards">
            <div class="card-item">
                <div class="card-header">
                    <span class="card-icon">🔥</span>
                    <span class="card-title">Popular</span>
                </div>
                <div class="card-content">Most used features</div>
            </div>
            <div class="card-item">
                <div class="card-header">
                    <span class="card-icon">⚡</span>
                    <span class="card-title">Quick Actions</span>
                </div>
                <div class="card-content">Fast operations</div>
            </div>
            <div class="card-item">
                <div class="card-header">
                    <span class="card-icon">🎨</span>
                    <span class="card-title">Customize</span>
                </div>
                <div class="card-content">Personalize settings</div>
            </div>
        </div>
    `,
    custom: html`
        <div class="dropdown-custom">
            <div class="custom-header">
                <h3>🎮 Interactive Panel</h3>
                <button class="close-btn">×</button>
            </div>
            <div class="custom-content">
                <p>This is a custom dropdown with interactive elements.</p>
                <div class="custom-controls">
                    <input type="range" min="0" max="100" value="50" />
                    <div class="checkbox-group">
                        <label><input type="checkbox" /> Option A</label>
                        <label><input type="checkbox" /> Option B</label>
                        <label><input type="checkbox" /> Option C</label>
                    </div>
                </div>
                <div class="custom-footer">
                    <button class="btn-success">Apply</button>
                    <button class="btn-warning">Reset</button>
                </div>
            </div>
        </div>
    `,
};

// CSS styles for dropdown content
const dropdownStyles = css`
    .dropdown-menu {
        min-width: 200px;
        padding: 8px 0;
    }

    .dropdown-item {
        padding: 12px 16px;
        cursor: pointer;
        border-radius: 4px;
        margin: 0 8px;
        transition: background-color 0.2s;
    }

    .dropdown-item:hover,
    .dropdown-item:focus {
        background-color: var(--mjo-color-primary-50, #f0f9ff);
        outline: none;
    }

    .dropdown-item.danger:hover {
        background-color: var(--mjo-color-error-50, #fef2f2);
        color: var(--mjo-color-error-600, #dc2626);
    }

    .dropdown-divider {
        height: 1px;
        background-color: var(--mjo-color-gray-200, #e5e7eb);
        margin: 8px 0;
    }

    .dropdown-form {
        padding: 20px;
        min-width: 280px;
    }

    .dropdown-form h4 {
        margin: 0 0 16px 0;
        color: var(--mjo-color-gray-800, #1f2937);
    }

    .dropdown-form label {
        display: block;
        margin-bottom: 12px;
    }

    .dropdown-form label span {
        display: block;
        margin-bottom: 4px;
        font-size: 14px;
        color: var(--mjo-color-gray-700, #374151);
    }

    .dropdown-form input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--mjo-color-gray-300, #d1d5db);
        border-radius: 4px;
        font-size: 14px;
    }

    .form-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
    }

    .dropdown-list {
        min-width: 300px;
        max-height: 300px;
        overflow-y: auto;
    }

    .list-header {
        padding: 12px 16px;
        font-weight: 600;
        background-color: var(--mjo-color-gray-50, #f9fafb);
        border-bottom: 1px solid var(--mjo-color-gray-200, #e5e7eb);
    }

    .list-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .list-item:hover {
        background-color: var(--mjo-color-gray-50, #f9fafb);
    }

    .item-icon {
        margin-right: 12px;
        font-size: 16px;
    }

    .item-text {
        flex: 1;
        font-size: 14px;
    }

    .item-date {
        font-size: 12px;
        color: var(--mjo-color-gray-500, #6b7280);
    }

    .list-footer {
        padding: 12px 16px;
        border-top: 1px solid var(--mjo-color-gray-200, #e5e7eb);
        text-align: center;
    }

    .dropdown-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        min-width: 280px;
    }

    .card-item {
        padding: 16px;
        border: 1px solid var(--mjo-color-gray-200, #e5e7eb);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .card-item:hover {
        border-color: var(--mjo-color-primary-300, #93c5fd);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .card-icon {
        margin-right: 8px;
        font-size: 18px;
    }

    .card-title {
        font-weight: 600;
        font-size: 14px;
    }

    .card-content {
        font-size: 12px;
        color: var(--mjo-color-gray-600, #4b5563);
    }

    .dropdown-custom {
        min-width: 320px;
        max-width: 400px;
    }

    .custom-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid var(--mjo-color-gray-200, #e5e7eb);
    }

    .custom-header h3 {
        margin: 0;
        font-size: 16px;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .close-btn:hover {
        background-color: var(--mjo-color-gray-100, #f3f4f6);
    }

    .custom-content {
        padding: 20px;
    }

    .custom-controls {
        margin: 16px 0;
    }

    .custom-controls input[type="range"] {
        width: 100%;
        margin-bottom: 12px;
    }

    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }

    .custom-footer {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 16px;
    }

    /* Button styles */
    .btn-primary,
    .btn-secondary,
    .btn-success,
    .btn-warning,
    .btn-link {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
    }

    .btn-primary {
        background-color: var(--mjo-color-primary-600, #2563eb);
        color: white;
    }

    .btn-primary:hover {
        background-color: var(--mjo-color-primary-700, #1d4ed8);
    }

    .btn-secondary {
        background-color: var(--mjo-color-gray-200, #e5e7eb);
        color: var(--mjo-color-gray-700, #374151);
    }

    .btn-secondary:hover {
        background-color: var(--mjo-color-gray-300, #d1d5db);
    }

    .btn-success {
        background-color: var(--mjo-color-success-600, #16a34a);
        color: white;
    }

    .btn-success:hover {
        background-color: var(--mjo-color-success-700, #15803d);
    }

    .btn-warning {
        background-color: var(--mjo-color-warning-600, #ea580c);
        color: white;
    }

    .btn-warning:hover {
        background-color: var(--mjo-color-warning-700, #c2410c);
    }

    .btn-link {
        background: none;
        color: var(--mjo-color-primary-600, #2563eb);
        text-decoration: underline;
    }

    .btn-link:hover {
        color: var(--mjo-color-primary-700, #1d4ed8);
    }
`;

// Playground interactions
function changeDropdownProp(prop: string, value: string | boolean): void {
    const dropdown = document.getElementById("playground-dropdown") as any;
    if (!dropdown) return;

    if (typeof value === "string") {
        if (value === "") {
            dropdown.removeAttribute(prop);
        } else {
            dropdown.setAttribute(prop, value);
        }
    } else {
        if (value) {
            dropdown.setAttribute(prop, "");
        } else {
            dropdown.removeAttribute(prop);
        }
    }

    // Update trigger button text based on behaviour
    if (prop === "behaviour") {
        const trigger = dropdown.querySelector(".dropdown-trigger");
        if (trigger) {
            trigger.textContent = value === "hover" ? "Hover over me" : "Click me for dropdown";
        }
    }
}

function changeDropdownContent(contentType: string): void {
    const dropdown = document.getElementById("playground-dropdown") as any;
    if (!dropdown) return;

    const template = contentTemplates[contentType as keyof typeof contentTemplates];
    if (template) {
        dropdown.html = template;
        dropdown.css = dropdownStyles;
    }
}

// Initialize fixed content for demo dropdowns
function initializeDemoDropdowns(): void {
    // Basic dropdown
    const basicDropdown = document.querySelector(".basic-dropdown") as any;
    if (basicDropdown) {
        basicDropdown.html = contentTemplates.menu;
        basicDropdown.css = dropdownStyles;
    }

    // Primary dropdown
    const primaryDropdown = document.querySelector(".primary-dropdown") as any;
    if (primaryDropdown) {
        primaryDropdown.html = html`
            <div class="dropdown-menu">
                <div class="dropdown-item">⚡ Quick Action</div>
                <div class="dropdown-item">🚀 Launch</div>
                <div class="dropdown-item">📊 Analytics</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">⚙️ Settings</div>
            </div>
        `;
        primaryDropdown.css = dropdownStyles;
    }

    // Secondary dropdown
    const secondaryDropdown = document.querySelector(".secondary-dropdown") as any;
    if (secondaryDropdown) {
        secondaryDropdown.html = html`
            <div class="dropdown-menu">
                <div class="dropdown-item">🏠 Home</div>
                <div class="dropdown-item">👤 Profile</div>
                <div class="dropdown-item">📝 Posts</div>
                <div class="dropdown-item">📸 Gallery</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item">🚪 Logout</div>
            </div>
        `;
        secondaryDropdown.css = dropdownStyles;
    }

    // Hover dropdowns
    const hoverDropdowns = document.querySelectorAll(".hover-dropdown, .hover-right-dropdown");
    hoverDropdowns.forEach((dropdown: any) => {
        dropdown.html = html`
            <div class="dropdown-menu">
                <div class="dropdown-item">🔍 Search</div>
                <div class="dropdown-item">📋 Recent</div>
                <div class="dropdown-item">⭐ Favorites</div>
            </div>
        `;
        dropdown.css = dropdownStyles;
    });

    // Position dropdowns
    const positionDropdowns = document.querySelectorAll(".position-dropdown");
    positionDropdowns.forEach((dropdown: any) => {
        dropdown.html = html`
            <div class="dropdown-menu">
                <div class="dropdown-item">Option 1</div>
                <div class="dropdown-item">Option 2</div>
                <div class="dropdown-item">Option 3</div>
            </div>
        `;
        dropdown.css = dropdownStyles;
    });

    // Full width dropdown
    const fullwidthDropdown = document.querySelector(".fullwidth-dropdown") as any;
    if (fullwidthDropdown) {
        fullwidthDropdown.html = html`
            <div class="dropdown-menu">
                <div class="dropdown-item">This dropdown takes full width of the trigger</div>
                <div class="dropdown-item">Perfect for navigation menus</div>
                <div class="dropdown-item">Or wide content panels</div>
            </div>
        `;
        fullwidthDropdown.css = dropdownStyles;
    }

    // Form dropdown
    const formDropdown = document.querySelector(".form-dropdown") as any;
    if (formDropdown) {
        formDropdown.html = contentTemplates.form;
        formDropdown.css = dropdownStyles;
    }

    // Card dropdown
    const cardDropdown = document.querySelector(".card-dropdown") as any;
    if (cardDropdown) {
        cardDropdown.html = contentTemplates.cards;
        cardDropdown.css = dropdownStyles;
    }

    // Interactive dropdown
    const interactiveDropdown = document.querySelector(".interactive-dropdown") as any;
    if (interactiveDropdown) {
        interactiveDropdown.html = contentTemplates.custom;
        interactiveDropdown.css = dropdownStyles;
    }

    // Initialize playground dropdown
    const playgroundDropdown = document.getElementById("playground-dropdown") as any;
    if (playgroundDropdown) {
        playgroundDropdown.html = contentTemplates.menu;
        playgroundDropdown.css = dropdownStyles;
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all demo dropdowns
    initializeDemoDropdowns();

    // Add event listeners to all dropdowns
    document.querySelectorAll("mjo-dropdown").forEach((dropdown) => {
        dropdown.addEventListener("mjo-dropdown:open", (ev: Event) => {
            const openEvent = ev as unknown as MjoDropdownOpenEvent;
            console.log("Dropdown opened:", openEvent.target);
        });

        dropdown.addEventListener("mjo-dropdown:close", (ev: Event) => {
            const closeEvent = ev as unknown as MjoDropdownCloseEvent;
            console.log("Dropdown closed:", closeEvent.target);
        });
    });

    // Handle interactive content in custom dropdown
    document.addEventListener("click", (ev: Event) => {
        const target = ev.target as HTMLElement;

        // Handle close button in custom dropdown
        if (target.classList.contains("close-btn")) {
            const dropdown = target.closest("mjo-dropdown") as any;
            if (dropdown) {
                dropdown.close();
            }
        }
    });
});

window.changeDropdownProp = changeDropdownProp;
window.changeDropdownContent = changeDropdownContent;

// Make functions globally available
declare global {
    interface Window {
        changeDropdownProp: (prop: string, value: string | boolean) => void;
        changeDropdownContent: (contentType: string) => void;
    }
}
