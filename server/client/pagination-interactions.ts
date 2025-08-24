// Pagination Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoPaginationChangeEvent, MjoPaginationNavigationEvent, MjoPaginationPageClickEvent } from "../../src/types/mjo-pagination";

// Playground interactions
function changePaginationProp(prop: string, value: string | boolean): void {
    const pagination = document.getElementById("playground-pagination");
    if (!pagination) return;

    if (typeof value === "string") {
        // Handle numeric properties
        if (prop === "totalItems" || prop === "pageSize" || prop === "currentPage" || prop === "siblingCount") {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue) && numValue >= 0) {
                // Special handling for currentPage to ensure it's within valid range
                if (prop === "currentPage") {
                    const totalItems = parseInt(pagination.getAttribute("totalItems") || "0", 10);
                    const pageSize = parseInt(pagination.getAttribute("pageSize") || "10", 10);
                    const maxPage = Math.ceil(totalItems / pageSize);
                    const validPage = Math.max(1, Math.min(numValue, maxPage));
                    pagination.setAttribute(prop, validPage.toString());

                    // Update the input field with the valid value
                    const input = document.querySelector(`input[onchange*="${prop}"]`) as HTMLInputElement;
                    if (input) input.value = validPage.toString();
                } else {
                    pagination.setAttribute(prop, numValue.toString());
                }
            }
        } else {
            // Handle string properties
            pagination.setAttribute(prop, value);
        }
    } else {
        // Handle boolean properties
        if (value) {
            pagination.setAttribute(prop, "");
        } else {
            pagination.removeAttribute(prop);
        }
    }

    // Special handling for dependent properties
    if (prop === "totalItems" || prop === "pageSize") {
        // Update current page input max value
        const totalItems = parseInt(pagination.getAttribute("totalItems") || "0", 10);
        const pageSize = parseInt(pagination.getAttribute("pageSize") || "10", 10);
        const maxPage = Math.ceil(totalItems / pageSize);

        const currentPageInput = document.querySelector('input[onchange*="currentPage"]') as HTMLInputElement;
        if (currentPageInput) {
            currentPageInput.max = maxPage.toString();

            // Ensure current page is not greater than max page
            const currentPage = parseInt(currentPageInput.value, 10);
            if (currentPage > maxPage) {
                currentPageInput.value = maxPage.toString();
                pagination.setAttribute("currentPage", maxPage.toString());
            }
        }
    }
}

// Initialize event listeners and interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all pagination components
    document.querySelectorAll("mjo-pagination").forEach((paginationElement) => {
        // Listen for page changes
        paginationElement.addEventListener("mjo-pagination:change", (ev: Event) => {
            const event = ev as MjoPaginationChangeEvent;
            const { page, previousPage, totalPages, pageSize, totalItems } = event.detail;

            console.log("Pagination changed:", {
                from: previousPage,
                to: page,
                totalPages,
                pageSize,
                totalItems,
            });

            // Update playground controls if this is the playground pagination
            if (paginationElement.id === "playground-pagination") {
                const currentPageInput = document.querySelector('input[onchange*="currentPage"]') as HTMLInputElement;
                if (currentPageInput && parseInt(currentPageInput.value, 10) !== page) {
                    currentPageInput.value = page.toString();
                }
            }

            // Show notification for demo purposes
            showNotification(`Page changed from ${previousPage} to ${page} (Total: ${totalPages} pages)`);
        });

        // Listen for page clicks
        paginationElement.addEventListener("mjo-pagination:page-click", (ev: Event) => {
            const event = ev as MjoPaginationPageClickEvent;
            const { page } = event.detail;

            console.log("Page clicked:", page);
        });

        // Listen for navigation clicks
        paginationElement.addEventListener("mjo-pagination:navigation", (ev: Event) => {
            const event = ev as MjoPaginationNavigationEvent;
            const { direction, page } = event.detail;

            console.log("Navigation clicked:", { direction, targetPage: page });
        });
    });

    // Initialize playground controls with current values
    initializePlaygroundControls();
});

// Initialize playground controls with current pagination values
function initializePlaygroundControls(): void {
    const pagination = document.getElementById("playground-pagination");
    if (!pagination) return;

    // Update input max values based on current pagination state
    updateCurrentPageConstraints();
}

// Update current page input constraints based on total items and page size
function updateCurrentPageConstraints(): void {
    const pagination = document.getElementById("playground-pagination");
    if (!pagination) return;

    const totalItems = parseInt(pagination.getAttribute("totalItems") || "0", 10);
    const pageSize = parseInt(pagination.getAttribute("pageSize") || "10", 10);
    const maxPage = Math.ceil(totalItems / pageSize);

    const currentPageInput = document.querySelector('input[onchange*="currentPage"]') as HTMLInputElement;
    if (currentPageInput) {
        currentPageInput.max = maxPage.toString();
        currentPageInput.min = "1";
    }
}

// Show temporary notification for demo purposes
function showNotification(message: string): void {
    // Remove existing notifications
    const existingNotification = document.querySelector(".demo-notification");
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement("div");
    notification.className = "demo-notification";
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--mjo-primary-color, #3b82f6);
        color: white;
        padding: 12px 20px;
        border-radius: var(--mjo-radius, 8px);
        box-shadow: var(--mjo-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out, slideOut 0.3s ease-out 2.7s forwards;
    `;

    // Add animation styles if not already present
    if (!document.querySelector("#pagination-demo-styles")) {
        const styles = document.createElement("style");
        styles.id = "pagination-demo-styles";
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Remove notification after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Make function globally available
window.changePaginationProp = changePaginationProp;

// Global type declarations
declare global {
    interface Window {
        changePaginationProp: (prop: string, value: string | boolean) => void;
    }
}
