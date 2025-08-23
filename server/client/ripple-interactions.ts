// Ripple Interactive Demo TypeScript
// This functionality loads after client hydration

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add click feedback for demonstration
    document.querySelectorAll(".demo-button, .demo-card, .list-item, .nav-item, .demo-chip, .demo-fab").forEach((element) => {
        element.addEventListener("click", (event) => {
            const target = event.currentTarget as HTMLElement;
            const ripple = target.querySelector("mjo-ripple");

            if (ripple) {
                console.log("Ripple effect triggered on:", target.className);

                // Add temporary visual feedback (optional)
                target.style.transform = "scale(0.98)";
                setTimeout(() => {
                    target.style.transform = "";
                }, 150);
            }
        });
    });

    // Specific interactions for different elements
    document.querySelectorAll(".demo-button").forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent?.trim();
            console.log(`Button clicked: ${buttonText}`);
        });
    });

    document.querySelectorAll(".demo-card").forEach((card) => {
        card.addEventListener("click", () => {
            const cardTitle = card.querySelector("h4")?.textContent;
            console.log(`Card clicked: ${cardTitle}`);
        });
    });

    document.querySelectorAll(".list-item").forEach((item) => {
        item.addEventListener("click", () => {
            const itemTitle = item.querySelector(".item-title")?.textContent;
            console.log(`List item clicked: ${itemTitle}`);
        });
    });

    document.querySelectorAll(".nav-item").forEach((navItem) => {
        navItem.addEventListener("click", () => {
            // Remove active class from all nav items
            document.querySelectorAll(".nav-item").forEach((item) => {
                item.classList.remove("active");
            });

            // Add active class to clicked item
            navItem.classList.add("active");

            const navLabel = navItem.querySelector(".nav-label")?.textContent;
            console.log(`Navigation item clicked: ${navLabel}`);
        });
    });

    document.querySelectorAll(".demo-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            const chipText = chip.querySelector("span")?.textContent;
            console.log(`Chip clicked: ${chipText}`);

            // Add selected state toggle
            chip.classList.toggle("selected");
        });
    });

    document.querySelectorAll(".demo-fab").forEach((fab) => {
        fab.addEventListener("click", () => {
            const fabIcon = fab.querySelector(".fab-icon")?.textContent;
            console.log(`FAB clicked: ${fabIcon}`);

            // Add visual feedback for FAB
            const fabElement = fab as HTMLElement;
            fabElement.style.transform = "scale(1.1)";
            setTimeout(() => {
                fabElement.style.transform = "";
            }, 200);
        });
    });

    // Demonstrate ripple customization
    const customButtons = document.querySelectorAll(".demo-button[class*='custom-ripple']");
    customButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const colorClass = Array.from(button.classList).find((cls) => cls.includes("custom-ripple"));
            console.log(`Custom ripple button clicked: ${colorClass}`);
        });
    });

    // Log when ripple effects are triggered
    document.querySelectorAll("mjo-ripple").forEach((ripple) => {
        const parent = ripple.parentElement;
        if (parent) {
            parent.addEventListener("click", () => {
                console.log("Ripple effect activated");
            });
        }
    });

    // Provide console help
    console.log("🌊 Ripple Demo Loaded!");
    console.log("Click on any interactive element to see ripple effects and console logs.");
    console.log("Available interactions:");
    console.log("- Buttons with different ripple colors");
    console.log("- Interactive cards");
    console.log("- List items");
    console.log("- Navigation items (with active state)");
    console.log("- Chips (with selection toggle)");
    console.log("- Floating Action Buttons");
});
