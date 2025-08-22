function changeColorPickerProp(prop, value) {
  const colorPicker = document.getElementById("playground-color-picker");
  if (!colorPicker)
    return;
  if (typeof value === "string") {
    if (value === "") {
      colorPicker.removeAttribute(prop);
    } else {
      colorPicker.setAttribute(prop, value);
    }
  } else {
    if (value) {
      colorPicker.setAttribute(prop, "");
    } else {
      colorPicker.removeAttribute(prop);
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-color-picker").forEach((colorPicker) => {
    colorPicker.addEventListener("mjo-color-input", (ev) => {
      const event = ev;
      console.log("🎨 Color input:", {
        value: event.detail.value,
        format: event.detail.format,
        element: event.detail.element
      });
    });
    colorPicker.addEventListener("mjo-color-change", (ev) => {
      const event = ev;
      console.log("🔄 Color changed:", {
        value: event.detail.value,
        format: event.detail.format,
        element: event.detail.element
      });
    });
    colorPicker.addEventListener("mjo-color-focus", (ev) => {
      const event = ev;
      console.log("🔍 Color picker focused:", {
        element: event.detail.element
      });
    });
    colorPicker.addEventListener("mjo-color-blur", (ev) => {
      const event = ev;
      console.log("🔍 Color picker blurred:", {
        element: event.detail.element
      });
    });
    colorPicker.addEventListener("mjo-color-format-change", (ev) => {
      const event = ev;
      console.log("📝 Format changed:", {
        format: event.detail.format,
        previousFormat: event.detail.previousFormat,
        value: event.detail.value,
        element: event.detail.element
      });
    });
    colorPicker.addEventListener("change", (ev) => {
      const target = ev.target;
      console.log("📡 Standard change event:", {
        value: target.getAttribute("value"),
        tagName: target.tagName
      });
    });
  });
  const interactiveExamples = document.querySelectorAll(".interactive-example");
  interactiveExamples.forEach((example) => {
    example.addEventListener("mjo-color-change", (ev) => {
      const event = ev;
      const notification = document.createElement("div");
      notification.className = "color-notification";
      notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${event.detail.value};
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
      notification.innerHTML = `
                <div style="font-size: 14px;">Color Updated!</div>
                <div style="font-size: 12px; opacity: 0.9;">${event.detail.value}</div>
            `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease-in forwards";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3e3);
    });
  });
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

        .color-notification {
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
    `;
  document.head.appendChild(style);
});
window.changeColorPickerProp = changeColorPickerProp;
//# sourceMappingURL=color-picker-interactions.js.map
