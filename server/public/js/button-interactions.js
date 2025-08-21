import { f as AiFillApple, g as AiFillAndroid, h as AiFillWindows, i as AiFillApi, j as AiFillAudio, k as AiFillBackward } from "./index.js";
function changeButtonProp(prop, value) {
  const button = document.getElementById("playground-button");
  if (!button)
    return;
  let icon = void 0;
  if (prop === "startIcon" || prop === "endIcon") {
    if (value === "icon1") {
      icon = AiFillApple;
    } else if (value === "icon2") {
      icon = AiFillAndroid;
    } else if (value === "icon3") {
      icon = AiFillWindows;
    } else if (value === "icon4") {
      icon = AiFillApi;
    } else if (value === "icon5") {
      icon = AiFillAudio;
    } else if (value === "icon6") {
      icon = AiFillBackward;
    }
    value = icon;
  }
  if (typeof value === "string") {
    if (value === "") {
      button.removeAttribute(prop);
    } else {
      button.setAttribute(prop, value);
    }
  } else {
    if (value) {
      button.setAttribute(prop, "");
    } else {
      button.removeAttribute(prop);
    }
  }
}
function changeButtonText(text) {
  const button = document.getElementById("playground-button");
  if (!button)
    return;
  button.textContent = text || "Interactive Button";
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-button").forEach((button) => {
    button.addEventListener("mjo-button-click", (ev) => {
      const clickEvent = ev;
      console.log("Button clicked:", {
        element: clickEvent.detail.element,
        toggle: clickEvent.detail.toggle,
        originalEvent: clickEvent.detail.originalEvent
      });
      if (button.id !== "playground-button") {
        showTemporaryFeedback(button, "Clicked!");
      }
    });
    button.addEventListener("mjo-button-toggle", (ev) => {
      const toggleEvent = ev;
      console.log("Button toggled:", {
        element: toggleEvent.detail.element,
        pressed: toggleEvent.detail.pressed,
        previousState: toggleEvent.detail.previousState
      });
      const state = toggleEvent.detail.pressed ? "ON" : "OFF";
      showTemporaryFeedback(button, `Toggle: ${state}`);
    });
    button.addEventListener("mjo-button-loading-change", (ev) => {
      const loadingEvent = ev;
      console.log("Button loading changed:", {
        element: loadingEvent.detail.element,
        loading: loadingEvent.detail.loading
      });
    });
  });
  document.querySelectorAll('mjo-button[type="submit"]').forEach((button) => {
    button.addEventListener("mjo-button-click", (ev) => {
      ev.preventDefault();
      showTemporaryFeedback(button, "Form would submit!");
    });
  });
  document.querySelectorAll('mjo-button[type="reset"]').forEach((button) => {
    button.addEventListener("mjo-button-click", (ev) => {
      ev.preventDefault();
      showTemporaryFeedback(button, "Form would reset!");
    });
  });
});
function showTemporaryFeedback(element, message) {
  let feedback = document.querySelector(".button-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "button-feedback";
    feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--mjo-primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--mjo-radius);
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
    document.body.appendChild(feedback);
  }
  feedback.textContent = message;
  feedback.style.opacity = "1";
  setTimeout(() => {
    feedback.style.opacity = "0";
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 300);
  }, 2e3);
}
window.changeButtonProp = changeButtonProp;
window.changeButtonText = changeButtonText;
//# sourceMappingURL=button-interactions.js.map
