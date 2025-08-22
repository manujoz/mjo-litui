function i(l,n){const t=document.getElementById("playground-color-picker");t&&(typeof n=="string"?n===""?t.removeAttribute(l):t.setAttribute(l,n):n?t.setAttribute(l,""):t.removeAttribute(l))}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("mjo-color-picker").forEach(t=>{t.addEventListener("mjo-color-input",o=>{const e=o;console.log("🎨 Color input:",{value:e.detail.value,format:e.detail.format,element:e.detail.element})}),t.addEventListener("mjo-color-change",o=>{const e=o;console.log("🔄 Color changed:",{value:e.detail.value,format:e.detail.format,element:e.detail.element})}),t.addEventListener("mjo-color-focus",o=>{console.log("🔍 Color picker focused:",{element:o.detail.element})}),t.addEventListener("mjo-color-blur",o=>{console.log("🔍 Color picker blurred:",{element:o.detail.element})}),t.addEventListener("mjo-color-format-change",o=>{const e=o;console.log("📝 Format changed:",{format:e.detail.format,previousFormat:e.detail.previousFormat,value:e.detail.value,element:e.detail.element})}),t.addEventListener("change",o=>{const e=o.target;console.log("📡 Standard change event:",{value:e.getAttribute("value"),tagName:e.tagName})})}),document.querySelectorAll(".interactive-example").forEach(t=>{t.addEventListener("mjo-color-change",o=>{const e=o,a=document.createElement("div");a.className="color-notification",a.style.cssText=`
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${e.detail.value};
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `,a.innerHTML=`
                <div style="font-size: 14px;">Color Updated!</div>
                <div style="font-size: 12px; opacity: 0.9;">${e.detail.value}</div>
            `,document.body.appendChild(a),setTimeout(()=>{a.style.animation="slideOut 0.3s ease-in forwards",setTimeout(()=>{document.body.removeChild(a)},300)},3e3)})});const n=document.createElement("style");n.textContent=`
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
    `,document.head.appendChild(n)});window.changeColorPickerProp=i;
//# sourceMappingURL=color-picker-interactions.js.map
