import { f as AiFillApple, g as AiFillAndroid, h as AiFillWindows, i as AiFillApi, j as AiFillAudio, k as AiFillBackward } from "./index.js";
function changeChipProp(prop, value) {
  const chip = document.getElementById("playground-chip");
  if (!chip)
    return;
  let icon = void 0;
  if (prop === "endIcon" || prop === "startIcon") {
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
    if (prop === "name") {
      chip.setAttribute("name", value || "Interactive Demo");
    } else {
      chip.setAttribute(prop, value);
    }
  } else {
    if (value) {
      chip.setAttribute(prop, "");
    } else {
      chip.removeAttribute(prop);
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-chip").forEach((chip) => {
    chip.addEventListener("mjo-chip-click", clickHandle);
    chip.addEventListener("mjo-chip-close", closeHandle);
  });
});
const clickHandle = (ev) => {
  const value = ev.detail.value;
  alert("Clicked chip with value: " + value);
};
const closeHandle = (ev) => {
  const value = ev.detail.value;
  alert("Closed chip with value: " + value);
  setTimeout(() => {
    const chip = document.createElement("mjo-chip");
    const label = document.querySelector("input[name='label']");
    const color = document.querySelector("select[name='color']");
    const variant = document.querySelector("select[name='variant']");
    const size = document.querySelector("select[name='size']");
    const radius = document.querySelector("select[name='radius']");
    const startIcon = document.querySelector("select[name='startIcon']");
    const endIcon = document.querySelector("select[name='endIcon']");
    const clickable = document.querySelector("input[name='clickable']");
    const closable = document.querySelector("input[name='closable']");
    const disabled = document.querySelector("input[name='disabled']");
    const value2 = document.querySelector("input[name='value']");
    chip.setAttribute("id", "playground-chip");
    chip.setAttribute("label", label ? label.value : "New Chip");
    if (color)
      chip.setAttribute("color", color ? color.value : "default");
    if (variant)
      chip.setAttribute("variant", variant ? variant.value : "solid");
    if (size)
      chip.setAttribute("size", size ? size.value : "medium");
    if (radius)
      chip.setAttribute("radius", radius ? radius.value : "full");
    if (clickable.checked)
      chip.setAttribute("clickable", "");
    if (closable.checked)
      chip.setAttribute("closable", "");
    if (disabled.checked)
      chip.setAttribute("disabled", "");
    if (value2)
      chip.setAttribute("value", value2 ? value2.value : "");
    if (startIcon)
      startIcon.selectedIndex = 0;
    if (endIcon)
      endIcon.selectedIndex = 0;
    const container = document.querySelector(".playground-showcase");
    if (container) {
      container.textContent = "";
      container.appendChild(chip);
      chip.addEventListener("mjo-chip-click", clickHandle);
      chip.addEventListener("mjo-chip-close", closeHandle);
    }
  }, 1500);
};
window.changeChipProp = changeChipProp;
//# sourceMappingURL=chip-interactions.js.map
