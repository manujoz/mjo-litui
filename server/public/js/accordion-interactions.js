import { A as AiOutlineDown, a as AiOutlineUp, b as AiOutlineLeft, c as AiFillStar, d as AiFillHeart, e as AiOutlineRight } from "./index.js";
function changeAccordionProp(prop, value) {
  const accordion = document.getElementById("playground-accordion");
  if (!accordion)
    return;
  if (typeof value === "string") {
    accordion.setAttribute(prop, value);
  } else {
    if (value) {
      accordion.setAttribute(prop, "");
    } else {
      accordion.removeAttribute(prop);
    }
  }
}
function changeAccordionItemProp(prop, value) {
  var _a;
  const accordion = document.getElementById("playground-accordion");
  if (!accordion)
    return;
  const firstItem = (_a = accordion.shadowRoot) == null ? void 0 : _a.querySelector("mjo-accordion-item");
  if (!firstItem)
    return;
  let iconValue = void 0;
  if (prop === "icon") {
    if (value === "down") {
      iconValue = AiOutlineDown;
    } else if (value === "up") {
      iconValue = AiOutlineUp;
    } else if (value === "left") {
      iconValue = AiOutlineLeft;
    } else if (value === "star") {
      iconValue = AiFillStar;
    } else if (value === "heart") {
      iconValue = AiFillHeart;
    } else if (value === "default") {
      iconValue = AiOutlineRight;
    }
    value = iconValue;
  }
  if (typeof value === "string") {
    firstItem.setAttribute(prop, value);
  } else {
    if (value) {
      firstItem.setAttribute(prop, "");
    } else {
      firstItem.removeAttribute(prop);
    }
  }
}
function removeLastItem() {
  const accordion = document.getElementById("playground-accordion");
  if (!accordion)
    return;
  const items = accordion.querySelectorAll("mjo-accordion-item");
  if (items.length > 1) {
    const lastItem = items[items.length - 1];
    lastItem.removeEventListener("toggle", handleAccordionToggle);
    accordion.removeChild(lastItem);
  }
}
const handleAccordionToggle = (ev) => {
  const event = ev;
  const { item, expanded } = event.detail;
  const title = item.getAttribute("itemTitle") || "Unknown";
  console.log(`Accordion item "${title}" ${expanded ? "expanded" : "collapsed"}`);
};
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-accordion").forEach((accordion) => {
    accordion.querySelectorAll("mjo-accordion-item").forEach((item) => {
      item.addEventListener("toggle", handleAccordionToggle);
    });
  });
  const playgroundAccordion = document.getElementById("playground-accordion");
  if (playgroundAccordion) {
    playgroundAccordion.addEventListener("toggle", (ev) => {
      const showcase = document.querySelector(".playground-showcase");
      if (showcase) {
        showcase.style.transform = "scale(1.02)";
        setTimeout(() => {
          showcase.style.transform = "";
        }, 200);
      }
    });
  }
  const formButton = document.querySelector(".rich-content-form button");
  if (formButton) {
    formButton.addEventListener("click", () => {
      alert("Form submitted! (This is just a demo)");
    });
  }
  document.querySelectorAll(".accordion-showcase mjo-accordion-item").forEach((item) => {
    const htmlItem = item;
    item.addEventListener("mouseenter", () => {
      htmlItem.style.transform = "translateX(4px)";
      htmlItem.style.transition = "transform 0.2s ease";
    });
    item.addEventListener("mouseleave", () => {
      htmlItem.style.transform = "";
    });
  });
});
window.changeAccordionProp = changeAccordionProp;
window.changeAccordionItemProp = changeAccordionItemProp;
window.removeLastItem = removeLastItem;
//# sourceMappingURL=accordion-interactions.js.map
