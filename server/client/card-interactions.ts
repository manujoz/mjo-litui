// Card Interactive Demo TypeScript
// This functionality loads after client hydration

// Playground interactions
function changeCardProp(prop: string, value: string | boolean): void {
    const card = document.getElementById("playground-card");
    if (!card) return;

    if (typeof value === "string") {
        if (value === "") {
            card.removeAttribute(prop);
        } else {
            card.setAttribute(prop, value);
        }
    } else {
        if (value) {
            card.setAttribute(prop, "");
        } else {
            card.removeAttribute(prop);
        }
    }
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add any card-specific event listeners if needed
    // For now, mjo-card doesn't emit custom events, but we can add them later
    console.log("Card interactions initialized");
});

// Make function globally available
(window as any).changeCardProp = changeCardProp;
