function changeCalendarProp(prop, value) {
  const calendar = document.getElementById("playground-calendar");
  if (!calendar)
    return;
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
  logEvent(`Property changed: ${prop} = ${value}`);
}
function resetCalendar() {
  const calendar = document.getElementById("playground-calendar");
  if (!calendar)
    return;
  if (calendar.reset && typeof calendar.reset === "function") {
    calendar.reset();
    logEvent("Calendar reset to initial state");
  } else {
    calendar.removeAttribute("value");
    calendar.removeAttribute("startDate");
    calendar.removeAttribute("endDate");
    logEvent("Calendar selection cleared");
  }
}
function setToday() {
  const calendar = document.getElementById("playground-calendar");
  if (!calendar)
    return;
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const mode = calendar.getAttribute("mode") || "single";
  if (mode === "single") {
    calendar.setAttribute("value", today);
    logEvent(`Set single date to today: ${today}`);
  } else if (mode === "range") {
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    const endDate = tomorrow.toISOString().split("T")[0];
    calendar.setAttribute("startDate", today);
    calendar.setAttribute("endDate", endDate);
    logEvent(`Set range to today through next week: ${today} - ${endDate}`);
  }
}
function clearSelection() {
  const calendar = document.getElementById("playground-calendar");
  if (!calendar)
    return;
  if (calendar.resetSelection && typeof calendar.resetSelection === "function") {
    calendar.resetSelection();
    logEvent("Selection cleared via resetSelection()");
  } else {
    calendar.removeAttribute("value");
    calendar.removeAttribute("startDate");
    calendar.removeAttribute("endDate");
    logEvent("Selection attributes cleared");
  }
}
function logEvent(message) {
  const eventOutput = document.getElementById("event-output");
  if (!eventOutput)
    return;
  const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  const logEntry = document.createElement("div");
  logEntry.className = "event-entry";
  logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
  eventOutput.insertBefore(logEntry, eventOutput.firstChild);
  while (eventOutput.children.length > 10) {
    const lastChild = eventOutput.lastChild;
    if (lastChild) {
      eventOutput.removeChild(lastChild);
    }
  }
}
function initializeCalendarExamples() {
  const eventMarkersCalendar = document.getElementById("event-markers-example");
  if (eventMarkersCalendar) {
    const eventMarkers = [
      { date: "2024-12-25", color: "red", tooltip: "Christmas" },
      { date: "2025-01-01", color: "green", tooltip: "New Year" }
    ];
    eventMarkersCalendar.eventMarkers = eventMarkers;
  }
}
document.addEventListener("DOMContentLoaded", function() {
  initializeCalendarExamples();
  document.querySelectorAll("mjo-calendar").forEach((calendar) => {
    calendar.addEventListener("date-selected", (ev) => {
      const event = ev;
      const value = event.detail.value;
      const date = event.detail.date;
      const dateStr = date ? date.toLocaleDateString() : value || "Unknown";
      logEvent(`Date selected: ${dateStr}`);
      if (calendar.id === "playground-calendar") {
        const valueInput = document.querySelector("input[name='value']");
        if (valueInput && value) {
          valueInput.value = value;
        }
      }
    });
    calendar.addEventListener("range-selected", (ev) => {
      const event = ev;
      const startDate = event.detail.startDate;
      const endDate = event.detail.endDate;
      const startValue = event.detail.startDateValue;
      const endValue = event.detail.endDateValue;
      const startStr = startDate ? startDate.toLocaleDateString() : startValue || "Unknown";
      const endStr = endDate ? endDate.toLocaleDateString() : endValue || "Unknown";
      logEvent(`Range selected: ${startStr} - ${endStr}`);
      if (calendar.id === "playground-calendar") {
        const startInput = document.querySelector("input[name='startDate']");
        const endInput = document.querySelector("input[name='endDate']");
        if (startInput && startValue) {
          startInput.value = startValue;
        }
        if (endInput && endValue) {
          endInput.value = endValue;
        }
      }
    });
  });
  logEvent("Calendar demo page loaded and ready");
});
window.changeCalendarProp = changeCalendarProp;
window.resetCalendar = resetCalendar;
window.setToday = setToday;
window.clearSelection = clearSelection;
//# sourceMappingURL=calendar-interactions.js.map
