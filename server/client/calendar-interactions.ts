// Calendar Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoCalendar } from "../../src/mjo-calendar";
import type { CalendarDateSelectedEvent, CalendarRangeSelectedEvent } from "../../src/types/mjo-calendar";

// Playground interactions
function changeCalendarProp(prop: string, value: string | boolean): void {
    const calendar = document.getElementById("playground-calendar");
    if (!calendar) return;

    if (typeof value === "string") {
        if (value === "") {
            calendar.removeAttribute(prop);
        } else {
            calendar.setAttribute(prop, value);
        }
    } else {
        if (value) {
            calendar.setAttribute(prop, "");
        } else {
            calendar.removeAttribute(prop);
        }
    }

    // Log the change
    logEvent(`Property changed: ${prop} = ${value}`);
}

// Helper functions for calendar actions
function resetCalendar(): void {
    const calendar = document.getElementById("playground-calendar") as any;
    if (!calendar) return;

    // Reset the calendar to initial state
    if (calendar.reset && typeof calendar.reset === "function") {
        calendar.reset();
        logEvent("Calendar reset to initial state");
    } else {
        // Fallback: clear selection attributes
        calendar.removeAttribute("value");
        calendar.removeAttribute("startDate");
        calendar.removeAttribute("endDate");
        logEvent("Calendar selection cleared");
    }
}

function setToday(): void {
    const calendar = document.getElementById("playground-calendar") as MjoCalendar;
    if (!calendar) return;

    const today = new Date().toISOString().split("T")[0];
    const mode = calendar.getAttribute("mode") || "single";

    if (mode === "single") {
        calendar.setAttribute("value", today);
        calendar.goToDate({ date: today });
        logEvent(`Set single date to today: ${today}`);
    } else if (mode === "range") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        const endDate = tomorrow.toISOString().split("T")[0];

        calendar.setAttribute("startDate", today);
        calendar.setAttribute("endDate", endDate);
        calendar.goToDate({ date: today });
        logEvent(`Set range to today through next week: ${today} - ${endDate}`);
    }
}

function clearSelection(): void {
    const calendar = document.getElementById("playground-calendar") as any;
    if (!calendar) return;

    if (calendar.resetSelection && typeof calendar.resetSelection === "function") {
        calendar.resetSelection();
        logEvent("Selection cleared via resetSelection()");
    } else {
        // Fallback: clear selection attributes
        calendar.removeAttribute("value");
        calendar.removeAttribute("startDate");
        calendar.removeAttribute("endDate");
        logEvent("Selection attributes cleared");
    }
}

// Event logging function
function logEvent(message: string): void {
    const eventOutput = document.getElementById("event-output");
    if (!eventOutput) return;

    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.className = "event-entry";
    logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;

    eventOutput.insertBefore(logEntry, eventOutput.firstChild);

    // Keep only last 10 entries
    while (eventOutput.children.length > 10) {
        const lastChild = eventOutput.lastChild;
        if (lastChild) {
            eventOutput.removeChild(lastChild);
        }
    }
}

// Initialize calendar examples with special properties
function initializeCalendarExamples(): void {
    // Set up event markers example
    const eventMarkersCalendar = document.getElementById("event-markers-example");
    if (eventMarkersCalendar) {
        // Set event markers programmatically
        const eventMarkers = [
            { date: "2024-12-25", color: "red", tooltip: "Christmas" },
            { date: "2025-01-01", color: "green", tooltip: "New Year" },
        ];
        (eventMarkersCalendar as any).eventMarkers = eventMarkers;
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Initialize special examples
    initializeCalendarExamples();

    // Add event listeners to all calendar components
    document.querySelectorAll("mjo-calendar").forEach((calendar) => {
        calendar.addEventListener("mjo-calendar-date-selected", (ev: Event) => {
            const event = ev as CalendarDateSelectedEvent;
            const value = event.detail.value;
            const date = event.detail.date;

            const dateStr = date ? date.toLocaleDateString() : value || "Unknown";
            logEvent(`Date selected: ${dateStr}`);

            // Update playground controls if this is the playground calendar
            if (calendar.id === "playground-calendar") {
                const valueInput = document.querySelector("input[name='value']") as HTMLInputElement;
                if (valueInput && value) {
                    valueInput.value = value;
                }
            }
        });

        calendar.addEventListener("mjo-calendar-range-selected", (ev: Event) => {
            const event = ev as CalendarRangeSelectedEvent;
            const startDate = event.detail.startDate;
            const endDate = event.detail.endDate;
            const startValue = event.detail.startDateValue;
            const endValue = event.detail.endDateValue;

            const startStr = startDate ? startDate.toLocaleDateString() : startValue || "Unknown";
            const endStr = endDate ? endDate.toLocaleDateString() : endValue || "Unknown";
            logEvent(`Range selected: ${startStr} - ${endStr}`);

            // Update playground controls if this is the playground calendar
            if (calendar.id === "playground-calendar") {
                const startInput = document.querySelector("input[name='startDate']") as HTMLInputElement;
                const endInput = document.querySelector("input[name='endDate']") as HTMLInputElement;

                if (startInput && startValue) {
                    startInput.value = startValue;
                }
                if (endInput && endValue) {
                    endInput.value = endValue;
                }
            }
        });
    });

    // Initialize event log
    logEvent("Calendar demo page loaded and ready");
});

// Make functions globally available
window.changeCalendarProp = changeCalendarProp;
window.resetCalendar = resetCalendar;
window.setToday = setToday;
window.clearSelection = clearSelection;

// Type declarations for global functions
declare global {
    interface Window {
        changeCalendarProp: (prop: string, value: string | boolean) => void;
        resetCalendar: () => void;
        setToday: () => void;
        clearSelection: () => void;
    }
}
