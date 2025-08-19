console.log("🎨 mjo-litui client components loaded for hydration");
function initializeTheme() {
  const savedTheme = localStorage.getItem("mjo-theme") || "light";
  const themeComponent = document.querySelector("mjo-theme");
  if (themeComponent) {
    themeComponent.theme = savedTheme;
    console.log("🎨 Theme initialized from client:", savedTheme);
  }
  const toggleBtn = document.querySelector(".theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  }
}
window.toggleTheme = function() {
  const themeComponent = document.querySelector("mjo-theme");
  if (themeComponent) {
    const currentTheme = themeComponent.theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    themeComponent.theme = newTheme;
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
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM ready, initializing theme...");
  initializeTheme();
});
setTimeout(() => {
  initializeTheme();
}, 100);
//# sourceMappingURL=client.js.map
