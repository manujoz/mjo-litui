function changeDatePickerProp(prop, value) {
  const datePicker = document.getElementById("playground-date-picker");
  if (!datePicker)
    return;
  if (typeof value === "string") {
    if (value === "") {
      datePicker.removeAttribute(prop);
    } else {
      datePicker.setAttribute(prop, value);
    }
  } else {
    if (value) {
      datePicker.setAttribute(prop, "");
    } else {
      datePicker.removeAttribute(prop);
    }
  }
  if (prop === "range") {
    datePicker.removeAttribute("value");
    const placeholder = value ? "Select start and end dates..." : "Choose a date...";
    datePicker.setAttribute("placeholder", placeholder);
    const placeholderInput = document.querySelector('input[placeholder="Enter placeholder..."]');
    if (placeholderInput) {
      placeholderInput.value = placeholder;
    }
  }
  if (prop === "announceSelections") {
    const actualValue = !value;
    if (actualValue) {
      datePicker.removeAttribute("disabled-announce-selections");
    } else {
      datePicker.setAttribute("disabled-announce-selections", "");
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-date-picker").forEach((datePicker) => {
    datePicker.addEventListener("change", (ev) => {
      const event = ev;
      const { value, date, startDate, endDate } = event.detail;
      let message = `Date picker changed!
Value: ${value}`;
      if (startDate && endDate) {
        message += `
Start: ${startDate.toLocaleDateString()}`;
        message += `
End: ${endDate.toLocaleDateString()}`;
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24));
        message += `
Duration: ${days} days`;
      } else if (date) {
        message += `
Selected: ${date.toLocaleDateString()}`;
      }
      console.log(message);
      if (datePicker.id === "playground-date-picker") {
        showNotification(message);
      }
    });
  });
  const forms = document.querySelectorAll("mjo-form");
  forms.forEach((form) => {
    form.addEventListener("submit", (ev) => {
      const event = ev;
      const { response } = event.detail;
      if (response.error) {
        console.error("Form validation error:", response.errmsg);
        alert("Form validation failed: " + response.errmsg.join(", "));
      } else {
        console.log("Form submitted successfully:", response.data);
        alert("Form submitted!\n" + JSON.stringify(response.data, null, 2));
        setTimeout(() => {
          if (response.submitButton) {
            response.submitButton.loading = false;
          }
        }, 1500);
      }
    });
  });
});
function showNotification(message) {
  const existing = document.querySelector(".date-picker-notification");
  if (existing) {
    existing.remove();
  }
  const notification = document.createElement("div");
  notification.className = "date-picker-notification";
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--mjo-background-color);
        color: var(--mjo-text-color);
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 1px solid var(--mjo-border-color);
        z-index: 1000;
        max-width: 300px;
        white-space: pre-line;
        font-size: 14px;
        animation: slideIn 0.3s ease-out;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 4e3);
}
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
window.changeDatePickerProp = changeDatePickerProp;
//# sourceMappingURL=date-picker-interactions.js.map
