function changeCardProp(prop, value) {
  const card = document.getElementById("playground-card");
  if (!card)
    return;
  if (typeof value === "string") {
    if (value === "") {
      card.removeAttribute(prop);
    } else {
      card.setAttribute(prop, value);
    }
  } else {
    if (value) {
      card.setAttribute(prop, "");
    } else {
      card.removeAttribute(prop);
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  console.log("Card interactions initialized");
});
window.changeCardProp = changeCardProp;
//# sourceMappingURL=card-interactions.js.map
