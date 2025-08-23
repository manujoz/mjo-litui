import { f as AiFillApple, u as AiFillMail, v as AiFillLock, w as AiFillPhone } from "./index.js";
function changeTextfieldProp(prop, value) {
  const textfield = document.getElementById("playground-textfield");
  if (!textfield)
    return;
  let icon = void 0;
  if (prop === "startIcon" || prop === "endIcon") {
    if (value === "user") {
      icon = AiFillApple;
    } else if (value === "mail") {
      icon = AiFillMail;
    } else if (value === "lock") {
      icon = AiFillLock;
    } else if (value === "phone") {
      icon = AiFillPhone;
    }
    value = icon;
  }
  if (typeof value === "string") {
    if (value === "") {
      textfield.removeAttribute(prop);
    } else {
      textfield.setAttribute(prop, value);
    }
  } else {
    if (value) {
      textfield.setAttribute(prop, "");
    } else {
      textfield.removeAttribute(prop);
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-textfield").forEach((textfield) => {
    textfield.addEventListener("mjo-textfield-input", inputHandle);
    textfield.addEventListener("mjo-textfield-change", changeHandle);
    textfield.addEventListener("mjo-textfield-focus", focusHandle);
    textfield.addEventListener("mjo-textfield-blur", blurHandle);
    textfield.addEventListener("mjo-textfield-clear", clearHandle);
    textfield.addEventListener("mjo-textfield-password-toggle", passwordToggleHandle);
    textfield.addEventListener("mjo-textfield-keyup", keyupHandle);
  });
});
const inputHandle = (ev) => {
  const detail = ev.detail;
  console.log("Input event:", detail);
};
const changeHandle = (ev) => {
  const detail = ev.detail;
  console.log("Change event:", detail);
};
const focusHandle = (ev) => {
  const detail = ev.detail;
  console.log("Focus event:", detail);
};
const blurHandle = (ev) => {
  const detail = ev.detail;
  console.log("Blur event:", detail);
};
const clearHandle = (ev) => {
  const detail = ev.detail;
  console.log("Clear event:", detail);
};
const passwordToggleHandle = (ev) => {
  const detail = ev.detail;
  console.log("Password toggle event:", detail);
};
const keyupHandle = (ev) => {
  const detail = ev.detail;
  if (detail.key === "Enter") {
    console.log("Enter key pressed in textfield:", detail);
  }
};
window.changeTextfieldProp = changeTextfieldProp;
//# sourceMappingURL=textfield-interactions.js.map
