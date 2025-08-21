function changeAlertProp(prop, value) {
  const alert = document.getElementById("playground-alert");
  if (!alert)
    return;
  if (typeof value === "string") {
    if (value === "") {
      alert.removeAttribute(prop);
    } else {
      alert.setAttribute(prop, value);
    }
  } else {
    if (value) {
      alert.setAttribute(prop, "");
    } else {
      alert.removeAttribute(prop);
    }
  }
}
function showAlert() {
  const alert = document.getElementById("playground-alert");
  if (alert && typeof alert.show === "function") {
    alert.show();
  }
}
function hideAlert() {
  const alert = document.getElementById("playground-alert");
  if (alert && typeof alert.hide === "function") {
    alert.hide();
  }
}
function focusAlert() {
  const alert = document.getElementById("playground-alert");
  if (alert && typeof alert.focus === "function") {
    alert.focus();
  }
}
function announceAlert() {
  const alert = document.getElementById("playground-alert");
  if (alert && typeof alert.announce === "function") {
    alert.announce();
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-alert").forEach((alert) => {
    alert.addEventListener("mjo-alert-will-show", (event) => {
      console.log("Alert will show:", event.detail);
    });
    alert.addEventListener("mjo-alert-show", (event) => {
      console.log("Alert shown:", event.detail);
    });
    alert.addEventListener("mjo-alert-will-close", (event) => {
      console.log("Alert will close:", event.detail);
    });
    alert.addEventListener("mjo-alert-closed", (event) => {
      console.log("Alert closed:", event.detail);
    });
  });
  console.log("Alert interactions initialized with enhanced functionality");
});
window.changeAlertProp = changeAlertProp;
window.showAlert = showAlert;
window.hideAlert = hideAlert;
window.focusAlert = focusAlert;
window.announceAlert = announceAlert;
//# sourceMappingURL=alert-interactions.js.map
