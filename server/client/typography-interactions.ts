// Typography Interactive Demo TypeScript
// This functionality loads after client hydration

// Playground interactions
function changeTypographyProp(prop: string, value: string): void {
    const typography = document.getElementById("playground-typography");
    if (!typography) return;

    // Handle ARIA properties that might be empty
    if (prop.startsWith("aria-") && !value.trim()) {
        typography.removeAttribute(prop);
        return;
    }

    typography.setAttribute(prop, value);
}

function changeTypographyContent(content: string): void {
    const typography = document.getElementById("playground-typography");
    if (!typography) return;

    typography.textContent = content || "Interactive Typography Demo";
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Typography component doesn't emit custom events, but we can still add some interactive feedback
    document.querySelectorAll("mjo-typography").forEach((typography) => {
        // Add hover effects for clickable elements
        if (typography.getAttribute("tag") !== "none") {
            typography.addEventListener("mouseenter", () => {
                console.log(`Hovered over typography element: ${typography.textContent?.trim()}`);
            });
        }
    });

    // Add demo for accessibility features
    const ariaDemoElements = document.querySelectorAll("[aria-describedby], [aria-labelledby]");
    ariaDemoElements.forEach((element) => {
        element.addEventListener("focus", () => {
            const describedBy = element.getAttribute("aria-describedby");
            const labelledBy = element.getAttribute("aria-labelledby");

            if (describedBy) {
                const descElement = document.getElementById(describedBy);
                if (descElement) {
                    console.log(`ARIA Description: ${descElement.textContent}`);
                }
            }

            if (labelledBy) {
                const labelElement = document.getElementById(labelledBy);
                if (labelElement) {
                    console.log(`ARIA Label: ${labelElement.textContent}`);
                }
            }
        });
    });
});

// Make functions globally available
(window as any).changeTypographyProp = changeTypographyProp;
(window as any).changeTypographyContent = changeTypographyContent;
