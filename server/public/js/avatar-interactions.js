import { A as AiFillApple, a as AiFillAndroid, b as AiFillWindows } from "./index.js";
function changeAvatarProp(prop, value) {
  const avatar = document.getElementById("playground-avatar");
  if (!avatar)
    return;
  let icon = void 0;
  if (prop === "fallbackIcon") {
    if (value === "icon1") {
      icon = AiFillApple;
    } else if (value === "icon2") {
      icon = AiFillAndroid;
    } else if (value === "icon3") {
      icon = AiFillWindows;
    }
    value = icon;
  }
  if (typeof value === "string") {
    if (prop === "name") {
      avatar.setAttribute("name", value || "Interactive Demo");
    } else {
      avatar.setAttribute(prop, value);
    }
  } else {
    if (value) {
      avatar.setAttribute(prop, "");
    } else {
      avatar.removeAttribute(prop);
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-avatar").forEach((avatar) => {
    avatar.addEventListener("avatar-click", (ev) => {
      const value = ev.detail.value;
      alert(value);
    });
  });
});
window.changeAvatarProp = changeAvatarProp;
//# sourceMappingURL=avatar-interactions.js.map
