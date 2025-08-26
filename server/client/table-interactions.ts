// Table Interactive Demo TypeScript
// This functionality loads after client hydration

import type { MjoPaginationChangeEvent } from "../../src/types/mjo-pagination.js";
import type { MjoTableFilterEvent, MjoTableRowClickEvent, MjoTableSelectEvent, MjoTableSortEvent } from "../../src/types/mjo-table.js";

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all tables
    document.querySelectorAll("mjo-table").forEach((table) => {
        // Row click events
        table.addEventListener("mjo-table:row-click", handleRowClick);

        // Selection events
        table.addEventListener("mjo-table:select", handleSelection);

        // Sort events
        table.addEventListener("mjo-table:sort", handleSort);

        // Filter events
        table.addEventListener("mjo-table:filter", handleFilter);

        // Load more events (for infinite scroll)
        table.addEventListener("mjo-table:load-more", handleLoadMore);
    });

    // Add event listeners to pagination components
    document.querySelectorAll("mjo-pagination").forEach((pagination) => {
        pagination.addEventListener("mjo-pagination:change", handlePaginationChange);
    });

    // Add demo interaction messages
    addDemoMessages();
});

/**
 * Handle row click events
 */
function handleRowClick(ev: Event): void {
    const event = ev as MjoTableRowClickEvent;
    const { key, row } = event.detail;

    // Show notification for demo purposes
    showNotification(`Row clicked! Key: ${key}, Name: ${row.name || "N/A"}`, "info");
}

/**
 * Handle row selection events
 */
function handleSelection(ev: Event): void {
    const event = ev as MjoTableSelectEvent;
    const { selected } = event.detail;

    const count = selected.length;
    const message = count === 0 ? "No rows selected" : `${count} row${count > 1 ? "s" : ""} selected`;

    showNotification(message, "success");
}

/**
 * Handle sort events
 */
function handleSort(ev: Event): void {
    const event = ev as MjoTableSortEvent;
    const { columnName, direction } = event.detail;

    if (columnName && direction) {
        showNotification(`Sorted by ${columnName} (${direction})`, "info");
    } else {
        showNotification("Sort cleared", "info");
    }
}

/**
 * Handle filter events
 */
function handleFilter(ev: Event): void {
    const event = ev as MjoTableFilterEvent;
    const { key, filter } = event.detail;

    if (key && filter) {
        showNotification(`Filtered ${key} by "${filter}"`, "info");
    } else {
        showNotification("Filter cleared", "info");
    }
}

/**
 * Handle load more events (infinite scroll)
 */
function handleLoadMore(ev: Event): void {
    console.log("Load more triggered:", ev);
    showNotification("Loading more data...", "info");
}

/**
 * Handle pagination change events
 */
function handlePaginationChange(ev: Event): void {
    const event = ev as MjoPaginationChangeEvent;
    const { page } = event.detail;

    showNotification(`Navigated to page ${page}`, "info");
}

/**
 * Show a temporary notification message
 */
function showNotification(message: string, type: "success" | "info" | "warning" | "error" = "info"): void {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `demo-notification demo-notification--${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => {
        notification.classList.add("demo-notification--show");
    }, 10);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove("demo-notification--show");
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Add demo interaction messages
 */
function addDemoMessages(): void {
    // Add informational messages about table interactions
    const messages = [
        {
            selector: "mjo-table[row-clickable]",
            message: "Click on any row to see the interaction event",
        },
        {
            selector: 'mjo-table[selectable="single"], mjo-table[selectable="multiple"]',
            message: "Use checkboxes to select rows and see selection events",
        },
        {
            selector: "mjo-table[header-sticky]",
            message: "Scroll vertically to see the sticky header effect",
        },
    ];

    messages.forEach(({ selector, message }) => {
        const tables = document.querySelectorAll(selector);
        tables.forEach((table, index) => {
            if (index === 0) {
                // Only add message to first matching table
                const messageElement = document.createElement("div");
                messageElement.className = "demo-info-message";
                messageElement.innerHTML = `<span class="demo-info-icon">💡</span> ${message}`;

                // Insert message before the table
                const showcase = table.closest(".component-showcase");
                if (showcase && showcase.parentNode) {
                    showcase.parentNode.insertBefore(messageElement, showcase);
                }
            }
        });
    });
}

// Make functions globally available for debugging
declare global {
    interface Window {
        showNotification: (message: string, type: "success" | "info" | "warning" | "error") => void;
    }
}

window.showNotification = showNotification;
