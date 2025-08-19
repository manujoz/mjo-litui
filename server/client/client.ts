/**
 * Entry point del cliente para hidratación SSR
 * Importa todos los componentes necesarios para la hidratación
 */

console.log("🎨 mjo-litui client components loaded for hydration");

// Función para inicializar tema después de hidratación
function initializeTheme(): void {
    const savedTheme = localStorage.getItem("mjo-theme") || "light";
    const themeComponent = document.querySelector("mjo-theme");

    if (themeComponent) {
        (themeComponent as any).theme = savedTheme;
        console.log("🎨 Theme initialized from client:", savedTheme);
    }

    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
        toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }
}

// Función global para toggle de tema (llamada desde HTML)
(window as any).toggleTheme = function (): void {
    const themeComponent = document.querySelector("mjo-theme");
    if (themeComponent) {
        const currentTheme = (themeComponent as any).theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";
        (themeComponent as any).theme = newTheme;
        localStorage.setItem("mjo-theme", newTheme);

        const toggleBtn = document.querySelector(".theme-toggle");
        if (toggleBtn) {
            toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
        }

        console.log("🎨 Theme changed to:", newTheme);
    } else {
        console.warn("⚠️ mjo-theme component not found");
    }
};

// Inicializar tema cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM ready, initializing theme...");
    initializeTheme();
});

// También inicializar después de un breve delay para asegurar hidratación
setTimeout(() => {
    initializeTheme();
}, 100);
