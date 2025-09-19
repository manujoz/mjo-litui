// Calendar Interactive Demo TypeScript
// This functionality loads after client hydration

import { MjoCalendar } from "../../src/mjo-calendar";
import type { MjoCalendarDateSelectedEvent, MjoCalendarMarker, MjoCalendarRangeSelectedEvent } from "../../src/types/mjo-calendar";

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

// Event management functions
function addSampleEvents(): void {
    const calendar = document.getElementById("playground-calendar") as any;
    if (!calendar) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const sampleEvents: MjoCalendarMarker[] = [
        {
            date: `${year}-${month}-05`,
            tooltip: "Team Meeting",
            backgroundColor: "var(--mjo-primary-color)",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-05`,
            tooltip: "Project Deadline",
            backgroundColor: "var(--mjo-color-error)",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-18`,
            tooltip: "Holiday Party",
            backgroundColor: "var(--mjo-color-success)",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-25`,
            tooltip: "Important Event",
            backgroundColor: "var(--mjo-color-warning)",
            foregroundColor: "white",
        },
    ];

    calendar.eventMarkers = sampleEvents;
    logEvent(`Added ${sampleEvents.length} sample events`);
}

function addWorkEvents(): void {
    const calendar = document.getElementById("playground-calendar") as any;
    if (!calendar) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const workEvents: MjoCalendarMarker[] = [
        {
            date: `${year}-${month}-03`,
            tooltip: "Sprint Planning",
            backgroundColor: "#1976d2",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-08`,
            tooltip: "Code Review",
            backgroundColor: "#388e3c",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-15`,
            tooltip: "Client Presentation",
            backgroundColor: "#f57c00",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-22`,
            tooltip: "Team Building",
            backgroundColor: "#7b1fa2",
            foregroundColor: "white",
        },
    ];

    calendar.eventMarkers = workEvents;
    logEvent(`Added ${workEvents.length} work events`);
}

function addHolidayEvents(): void {
    const calendar = document.getElementById("playground-calendar") as any;
    if (!calendar) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const holidayEvents: MjoCalendarMarker[] = [
        {
            date: `${year}-${month}-01`,
            tooltip: "Monthly Start",
            backgroundColor: "#c62828",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-10`,
            tooltip: "Mid-month Event",
            backgroundColor: "#2e7d32",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-20`,
            tooltip: "Special Day",
            backgroundColor: "#1565c0",
            foregroundColor: "white",
        },
        {
            date: `${year}-${month}-28`,
            tooltip: "Month End Event",
            backgroundColor: "#ef6c00",
            foregroundColor: "white",
        },
    ];

    calendar.eventMarkers = holidayEvents;
    logEvent(`Added ${holidayEvents.length} holiday events`);
}

function clearEvents(): void {
    const calendar = document.getElementById("playground-calendar") as any;
    if (!calendar) return;

    calendar.eventMarkers = [];
    logEvent("All events cleared");
}

function addCustomEvent(): void {
    const calendar = document.getElementById("playground-calendar") as any;
    const dateInput = document.getElementById("event-date") as HTMLInputElement;
    const tooltipInput = document.getElementById("event-tooltip") as HTMLInputElement;

    if (!calendar || !dateInput || !tooltipInput) return;

    const date = dateInput.value;
    const tooltip = tooltipInput.value;

    if (!date) {
        logEvent("Please select a date for the event");
        return;
    }

    const existingEvents = calendar.eventMarkers || [];
    const colors = ["#1976d2", "#388e3c", "#f57c00", "#7b1fa2", "#c62828", "#2e7d32", "#1565c0", "#ef6c00"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newEvent: MjoCalendarMarker = {
        date: date,
        tooltip: tooltip || `Event on ${date}`,
        backgroundColor: randomColor,
        foregroundColor: "white",
    };

    calendar.eventMarkers = [...existingEvents, newEvent];
    logEvent(`Added custom event: ${newEvent.tooltip} on ${date}`);

    // Clear inputs
    dateInput.value = "";
    tooltipInput.value = "";
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
        calendar.addEventListener("mjo-calendar:date-selected", (ev: Event) => {
            const event = ev as MjoCalendarDateSelectedEvent;
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

        calendar.addEventListener("mjo-calendar:range-selected", (ev: Event) => {
            const event = ev as MjoCalendarRangeSelectedEvent;
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

        // Add event listeners for new day-specific events
        calendar.addEventListener("mjo-calendar:day-click", (ev: Event) => {
            const event = ev as CustomEvent;
            const { day, date, events } = event.detail;
            const dateStr = date.toLocaleDateString();
            const eventsCount = events?.length || 0;
            logEvent(`Day clicked: ${dateStr} (Day ${day}) - ${eventsCount} events`);
        });

        calendar.addEventListener("mjo-calendar:day-hover", (ev: Event) => {
            const event = ev as CustomEvent;
            const { day, date, events } = event.detail;
            const dateStr = date.toLocaleDateString();
            const eventsCount = events?.length || 0;
            logEvent(`Day hovered: ${dateStr} (Day ${day}) - ${eventsCount} events`);
        });

        calendar.addEventListener("mjo-calendar:day-leave", (ev: Event) => {
            const event = ev as CustomEvent;
            const { day, date, events } = event.detail;
            const dateStr = date.toLocaleDateString();
            const eventsCount = events?.length || 0;
            logEvent(`Day leave: ${dateStr} (Day ${day}) - ${eventsCount} events`);
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
window.addSampleEvents = addSampleEvents;
window.addWorkEvents = addWorkEvents;
window.addHolidayEvents = addHolidayEvents;
window.clearEvents = clearEvents;
window.addCustomEvent = addCustomEvent;

// Type declarations for global functions
declare global {
    interface Window {
        changeCalendarProp: (prop: string, value: string | boolean) => void;
        resetCalendar: () => void;
        setToday: () => void;
        clearSelection: () => void;
        addSampleEvents: () => void;
        addWorkEvents: () => void;
        addHolidayEvents: () => void;
        clearEvents: () => void;
        addCustomEvent: () => void;
    }
}
