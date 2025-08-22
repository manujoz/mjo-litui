import{f as l,g as d,h as r,i as c,j as a,k as s}from"./index.js";function m(o,t){const e=document.getElementById("playground-button");if(!e)return;let n;(o==="startIcon"||o==="endIcon")&&(t==="icon1"?n=l:t==="icon2"?n=d:t==="icon3"?n=r:t==="icon4"?n=c:t==="icon5"?n=a:t==="icon6"&&(n=s),t=n),typeof t=="string"?t===""?e.removeAttribute(o):e.setAttribute(o,t):t?e.setAttribute(o,""):e.removeAttribute(o)}function u(o){const t=document.getElementById("playground-button");t&&(t.textContent=o||"Interactive Button")}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("mjo-button").forEach(o=>{o.addEventListener("mjo-button-click",t=>{const e=t;console.log("Button clicked:",{element:e.detail.element,toggle:e.detail.toggle,originalEvent:e.detail.originalEvent}),o.id!=="playground-button"&&i(o,"Clicked!")}),o.addEventListener("mjo-button-toggle",t=>{const e=t;console.log("Button toggled:",{element:e.detail.element,pressed:e.detail.pressed,previousState:e.detail.previousState});const n=e.detail.pressed?"ON":"OFF";i(o,`Toggle: ${n}`)}),o.addEventListener("mjo-button-loading-change",t=>{const e=t;console.log("Button loading changed:",{element:e.detail.element,loading:e.detail.loading})})}),document.querySelectorAll('mjo-button[type="submit"]').forEach(o=>{o.addEventListener("mjo-button-click",t=>{t.preventDefault(),i(o,"Form would submit!")})}),document.querySelectorAll('mjo-button[type="reset"]').forEach(o=>{o.addEventListener("mjo-button-click",t=>{t.preventDefault(),i(o,"Form would reset!")})})});function i(o,t){let e=document.querySelector(".button-feedback");e||(e=document.createElement("div"),e.className="button-feedback",e.style.cssText=`
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
        `,document.body.appendChild(e)),e.textContent=t,e.style.opacity="1",setTimeout(()=>{e.style.opacity="0",setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300)},2e3)}window.changeButtonProp=m;window.changeButtonText=u;
//# sourceMappingURL=button-interactions.js.map
