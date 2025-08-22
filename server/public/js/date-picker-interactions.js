function m(n,t){const e=document.getElementById("playground-date-picker");if(e){if(typeof t=="string"?t===""?e.removeAttribute(n):e.setAttribute(n,t):t?e.setAttribute(n,""):e.removeAttribute(n),n==="range"){e.removeAttribute("value");const a=t?"Select start and end dates...":"Choose a date...";e.setAttribute("placeholder",a);const o=document.querySelector('input[placeholder="Enter placeholder..."]');o&&(o.value=a)}n==="announceSelections"&&(!t?e.removeAttribute("disabled-announce-selections"):e.setAttribute("disabled-announce-selections",""))}}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("mjo-date-picker").forEach(t=>{t.addEventListener("date-picker-change",e=>{const a=e,{value:o,date:c,startDate:r,endDate:s}=a.detail;let i=`Date picker changed!
Value: ${o}`;if(r&&s){i+=`
Start: ${r.toLocaleDateString()}`,i+=`
End: ${s.toLocaleDateString()}`;const l=Math.ceil((s.getTime()-r.getTime())/(1e3*60*60*24));i+=`
Duration: ${l} days`}else c&&(i+=`
Selected: ${c.toLocaleDateString()}`);console.log(i),t.id==="playground-date-picker"&&u(i)})}),document.querySelectorAll("mjo-form").forEach(t=>{t.addEventListener("submit",e=>{const a=e,{response:o}=a.detail;o.error?(console.error("Form validation error:",o.errmsg),alert("Form validation failed: "+o.errmsg.join(", "))):(console.log("Form submitted successfully:",o.data),alert(`Form submitted!
`+JSON.stringify(o.data,null,2)),setTimeout(()=>{o.submitButton&&(o.submitButton.loading=!1)},1500))})})});function u(n){const t=document.querySelector(".date-picker-notification");t&&t.remove();const e=document.createElement("div");e.className="date-picker-notification",e.style.cssText=`
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
    `,e.textContent=n,document.body.appendChild(e),setTimeout(()=>{e.style.animation="slideOut 0.3s ease-in",setTimeout(()=>{e.parentNode&&e.remove()},300)},4e3)}const d=document.createElement("style");d.textContent=`
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
`;document.head.appendChild(d);window.changeDatePickerProp=m;
//# sourceMappingURL=date-picker-interactions.js.map
