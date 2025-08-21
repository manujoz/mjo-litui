function changeCheckboxProp(prop, value) {
  const checkbox = document.getElementById("playground-checkbox");
  if (!checkbox)
    return;
  if (typeof value === "string") {
    if (prop === "label") {
      checkbox.setAttribute("label", value || "Interactive Demo");
    } else if (value.trim() === "") {
      checkbox.removeAttribute(prop);
    } else {
      checkbox.setAttribute(prop, value);
    }
  } else {
    if (value) {
      checkbox.setAttribute(prop, "");
    } else {
      checkbox.removeAttribute(prop);
    }
  }
  if (prop === "checked" && value === true) {
    checkbox.removeAttribute("indeterminate");
    const indeterminateInput = document.querySelector('input[name="indeterminate"]');
    if (indeterminateInput)
      indeterminateInput.checked = false;
  } else if (prop === "indeterminate" && value === true) {
    checkbox.removeAttribute("checked");
    const checkedInput = document.querySelector('input[name="checked"]');
    if (checkedInput)
      checkedInput.checked = false;
  }
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("mjo-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (ev) => {
      console.log("Standard change event:", ev);
    });
    checkbox.addEventListener("mjo-checkbox-change", (ev) => {
      const event = ev;
      const { element, checked, indeterminate, value, name, previousState } = event.detail;
      console.log("Checkbox changed:", {
        name,
        value,
        checked,
        indeterminate,
        previousState,
        element: element.tagName
      });
      if (element.id === "playground-checkbox") {
        let message = `Checkbox "${name}" changed!`;
        message += `
State: ${indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}`;
        message += `
Value: ${value}`;
        message += `
Previous: ${previousState.indeterminate ? "indeterminate" : previousState.checked ? "checked" : "unchecked"}`;
        alert(message);
      }
    });
    checkbox.addEventListener("mjo-checkbox-indeterminate-change", (ev) => {
      const event = ev;
      console.log("Checkbox indeterminate changed:", event.detail);
    });
    checkbox.addEventListener("mjo-checkbox-focus", (ev) => {
      const event = ev;
      console.log("Checkbox focused:", event.detail.element.getAttribute("label"));
    });
    checkbox.addEventListener("mjo-checkbox-blur", (ev) => {
      const event = ev;
      console.log("Checkbox blurred:", event.detail.element.getAttribute("label"));
    });
  });
  const formExamples = document.querySelectorAll('mjo-checkbox[name*="demo"]');
  formExamples.forEach((checkbox) => {
    checkbox.addEventListener("mjo-checkbox-change", (ev) => {
      const event = ev;
      const { checked, name, value } = event.detail;
      if (checked) {
        console.log(`Form field "${name}" with value "${value}" was selected`);
      } else {
        console.log(`Form field "${name}" was deselected`);
      }
    });
  });
  const preferencesGroup = document.querySelectorAll('mjo-checkbox[checkgroup="preferences"]');
  let preferencesSelected = [];
  preferencesGroup.forEach((checkbox) => {
    if (checkbox.hasAttribute("checked")) {
      preferencesSelected.push(checkbox.getAttribute("value") || "");
    }
    checkbox.addEventListener("mjo-checkbox-change", (ev) => {
      const event = ev;
      const { checked, value } = event.detail;
      if (checked && value) {
        if (!preferencesSelected.includes(value)) {
          preferencesSelected.push(value);
        }
      } else if (value) {
        preferencesSelected = preferencesSelected.filter((v) => v !== value);
      }
      console.log("Preferences selected:", preferencesSelected);
    });
  });
  const featuresGroup = document.querySelectorAll('mjo-checkbox[checkgroup="features"]');
  let featuresSelected = [];
  featuresGroup.forEach((checkbox) => {
    if (checkbox.hasAttribute("checked")) {
      featuresSelected.push(checkbox.getAttribute("value") || "");
    }
    checkbox.addEventListener("mjo-checkbox-change", (ev) => {
      const event = ev;
      const { checked, value } = event.detail;
      if (checked && value) {
        if (!featuresSelected.includes(value)) {
          featuresSelected.push(value);
        }
      } else if (value) {
        featuresSelected = featuresSelected.filter((v) => v !== value);
      }
      console.log("Features selected:", featuresSelected);
    });
  });
});
window.changeCheckboxProp = changeCheckboxProp;
//# sourceMappingURL=checkbox-interactions.js.map
