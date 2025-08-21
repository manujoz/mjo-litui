var Ht=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)};var Z=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)};var F=(t,o,a)=>(Ht(t,o,"access private method"),a);import{Q as Kt,R as ut,D as w,i as Xt,t as Vt,e as Gt,k as l}from"./lit-core.js";import{e as Jt,l as Zt,m as Qt,n as ft,o as Yt,p as oa}from"./index.js";/*! js-cookie v3.0.5 | MIT */function co(t){for(var o=1;o<arguments.length;o++){var a=arguments[o];for(var r in a)t[r]=a[r]}return t}var ta={read:function(t){return t[0]==='"'&&(t=t.slice(1,-1)),t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(t){return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function So(t,o){function a(e,n,i){if(!(typeof document>"u")){i=co({},o,i),typeof i.expires=="number"&&(i.expires=new Date(Date.now()+i.expires*864e5)),i.expires&&(i.expires=i.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var d="";for(var c in i)i[c]&&(d+="; "+c,i[c]!==!0&&(d+="="+i[c].split(";")[0]));return document.cookie=e+"="+t.write(n,e)+d}}function r(e){if(!(typeof document>"u"||arguments.length&&!e)){for(var n=document.cookie?document.cookie.split("; "):[],i={},d=0;d<n.length;d++){var c=n[d].split("="),k=c.slice(1).join("=");try{var S=decodeURIComponent(c[0]);if(i[S]=t.read(k,S),e===S)break}catch{}}return e?i[e]:i}}return Object.create({set:a,get:r,remove:function(e,n){a(e,"",co({},n,{expires:-1}))},withAttributes:function(e){return So(this.converter,co({},this.attributes,e))},withConverter:function(e){return So(co({},this.converter,e),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(t)}})}var W=So(ta,{path:"/"});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mo=globalThis,Jo=mo.ShadowRoot&&(mo.ShadyCSS===void 0||mo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zo=Symbol(),nt=new WeakMap;let bt=class{constructor(o,a,r){if(this._$cssResult$=!0,r!==Zo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=a}get styleSheet(){let o=this.o;const a=this.t;if(Jo&&o===void 0){const r=a!==void 0&&a.length===1;r&&(o=nt.get(a)),o===void 0&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),r&&nt.set(a,o))}return o}toString(){return this.cssText}};const aa=t=>new bt(typeof t=="string"?t:t+"",void 0,Zo),_=(t,...o)=>{const a=t.length===1?t[0]:o.reduce((r,e,n)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[n+1],t[0]);return new bt(a,t,Zo)},ea=(t,o)=>{if(Jo)t.adoptedStyleSheets=o.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of o){const r=document.createElement("style"),e=mo.litNonce;e!==void 0&&r.setAttribute("nonce",e),r.textContent=a.cssText,t.appendChild(r)}},st=Jo?t=>t:t=>t instanceof CSSStyleSheet?(o=>{let a="";for(const r of o.cssRules)a+=r.cssText;return aa(a)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ra,defineProperty:ia,getOwnPropertyDescriptor:na,getOwnPropertyNames:sa,getOwnPropertySymbols:ca,getPrototypeOf:la}=Object,A=globalThis,ct=A.trustedTypes,da=ct?ct.emptyScript:"",_o=A.reactiveElementPolyfillSupport,oo=(t,o)=>t,vo={toAttribute(t,o){switch(o){case Boolean:t=t?da:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,o){let a=t;switch(o){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},Qo=(t,o)=>!ra(t,o),lt={attribute:!0,type:String,converter:vo,reflect:!1,hasChanged:Qo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),A.litPropertyMetadata??(A.litPropertyMetadata=new WeakMap);class q extends HTMLElement{static addInitializer(o){this._$Ei(),(this.l??(this.l=[])).push(o)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(o,a=lt){if(a.state&&(a.attribute=!1),this._$Ei(),this.elementProperties.set(o,a),!a.noAccessor){const r=Symbol(),e=this.getPropertyDescriptor(o,r,a);e!==void 0&&ia(this.prototype,o,e)}}static getPropertyDescriptor(o,a,r){const{get:e,set:n}=na(this.prototype,o)??{get(){return this[a]},set(i){this[a]=i}};return{get(){return e==null?void 0:e.call(this)},set(i){const d=e==null?void 0:e.call(this);n.call(this,i),this.requestUpdate(o,d,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(o){return this.elementProperties.get(o)??lt}static _$Ei(){if(this.hasOwnProperty(oo("elementProperties")))return;const o=la(this);o.finalize(),o.l!==void 0&&(this.l=[...o.l]),this.elementProperties=new Map(o.elementProperties)}static finalize(){if(this.hasOwnProperty(oo("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oo("properties"))){const a=this.properties,r=[...sa(a),...ca(a)];for(const e of r)this.createProperty(e,a[e])}const o=this[Symbol.metadata];if(o!==null){const a=litPropertyMetadata.get(o);if(a!==void 0)for(const[r,e]of a)this.elementProperties.set(r,e)}this._$Eh=new Map;for(const[a,r]of this.elementProperties){const e=this._$Eu(a,r);e!==void 0&&this._$Eh.set(e,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(o){const a=[];if(Array.isArray(o)){const r=new Set(o.flat(1/0).reverse());for(const e of r)a.unshift(st(e))}else o!==void 0&&a.push(st(o));return a}static _$Eu(o,a){const r=a.attribute;return r===!1?void 0:typeof r=="string"?r:typeof o=="string"?o.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var o;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(o=this.constructor.l)==null||o.forEach(a=>a(this))}addController(o){var a;(this._$EO??(this._$EO=new Set)).add(o),this.renderRoot!==void 0&&this.isConnected&&((a=o.hostConnected)==null||a.call(o))}removeController(o){var a;(a=this._$EO)==null||a.delete(o)}_$E_(){const o=new Map,a=this.constructor.elementProperties;for(const r of a.keys())this.hasOwnProperty(r)&&(o.set(r,this[r]),delete this[r]);o.size>0&&(this._$Ep=o)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ea(o,this.constructor.elementStyles),o}connectedCallback(){var o;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(o=this._$EO)==null||o.forEach(a=>{var r;return(r=a.hostConnected)==null?void 0:r.call(a)})}enableUpdating(o){}disconnectedCallback(){var o;(o=this._$EO)==null||o.forEach(a=>{var r;return(r=a.hostDisconnected)==null?void 0:r.call(a)})}attributeChangedCallback(o,a,r){this._$AK(o,r)}_$EC(o,a){var n;const r=this.constructor.elementProperties.get(o),e=this.constructor._$Eu(o,r);if(e!==void 0&&r.reflect===!0){const i=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:vo).toAttribute(a,r.type);this._$Em=o,i==null?this.removeAttribute(e):this.setAttribute(e,i),this._$Em=null}}_$AK(o,a){var n;const r=this.constructor,e=r._$Eh.get(o);if(e!==void 0&&this._$Em!==e){const i=r.getPropertyOptions(e),d=typeof i.converter=="function"?{fromAttribute:i.converter}:((n=i.converter)==null?void 0:n.fromAttribute)!==void 0?i.converter:vo;this._$Em=e,this[e]=d.fromAttribute(a,i.type),this._$Em=null}}requestUpdate(o,a,r){if(o!==void 0){if(r??(r=this.constructor.getPropertyOptions(o)),!(r.hasChanged??Qo)(this[o],a))return;this.P(o,a,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(o,a,r){this._$AL.has(o)||this._$AL.set(o,a),r.reflect===!0&&this._$Em!==o&&(this._$Ej??(this._$Ej=new Set)).add(o)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const o=this.scheduleUpdate();return o!=null&&await o,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[n,i]of e)i.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],i)}let o=!1;const a=this._$AL;try{o=this.shouldUpdate(a),o?(this.willUpdate(a),(r=this._$EO)==null||r.forEach(e=>{var n;return(n=e.hostUpdate)==null?void 0:n.call(e)}),this.update(a)):this._$EU()}catch(e){throw o=!1,this._$EU(),e}o&&this._$AE(a)}willUpdate(o){}_$AE(o){var a;(a=this._$EO)==null||a.forEach(r=>{var e;return(e=r.hostUpdated)==null?void 0:e.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(o)),this.updated(o)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(o){return!0}update(o){this._$Ej&&(this._$Ej=this._$Ej.forEach(a=>this._$EC(a,this[a]))),this._$EU()}updated(o){}firstUpdated(o){}}q.elementStyles=[],q.shadowRootOptions={mode:"open"},q[oo("elementProperties")]=new Map,q[oo("finalized")]=new Map,_o==null||_o({ReactiveElement:q}),(A.reactiveElementVersions??(A.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class x extends q{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var a;const o=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=o.firstChild),o}update(o){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this.o=Kt(a,this.renderRoot,this.renderOptions)}connectedCallback(){var o;super.connectedCallback(),(o=this.o)==null||o.setConnected(!0)}disconnectedCallback(){var o;super.disconnectedCallback(),(o=this.o)==null||o.setConnected(!1)}render(){return ut}}var mt;x._$litElement$=!0,x.finalized=!0,(mt=globalThis.litElementHydrateSupport)==null||mt.call(globalThis,{LitElement:x});const Eo=globalThis.litElementPolyfillSupport;Eo==null||Eo({LitElement:x});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=t=>(o,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,o)}):customElements.define(t,o)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ha={attribute:!0,type:String,converter:vo,reflect:!1,hasChanged:Qo},pa=(t=ha,o,a)=>{const{kind:r,metadata:e}=a;let n=globalThis.litPropertyMetadata.get(e);if(n===void 0&&globalThis.litPropertyMetadata.set(e,n=new Map),n.set(a.name,t),r==="accessor"){const{name:i}=a;return{set(d){const c=o.get.call(this);o.set.call(this,d),this.requestUpdate(i,c,t)},init(d){return d!==void 0&&this.P(i,void 0,t),d}}}if(r==="setter"){const{name:i}=a;return function(d){const c=this[i];o.call(this,d),this.requestUpdate(i,c,t)}}throw Error("Unsupported decorator location: "+r)};function s(t){return(o,a)=>typeof a=="object"?pa(t,o,a):((r,e,n)=>{const i=e.hasOwnProperty(n);return e.constructor.createProperty(n,i?{...r,wrapped:!0}:r),i?Object.getOwnPropertyDescriptor(e,n):void 0})(t,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function io(t){return s({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=(t,o,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof o!="object"&&Object.defineProperty(t,o,a),a);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function L(t,o){return(a,r,e)=>{const n=i=>{var d;return((d=i.renderRoot)==null?void 0:d.querySelector(t))??null};if(o){const{get:i,set:d}=typeof r=="object"?a:e??(()=>{const c=Symbol();return{get(){return this[c]},set(k){this[c]=k}}})();return dt(a,r,{get(){let c=i.call(this);return c===void 0&&(c=n(this),(c!==null||this.hasUpdated)&&d.call(this,c)),c}})}return dt(a,r,{get(){return n(this)}})}}var ma=Object.defineProperty,ua=Object.getOwnPropertyDescriptor,fa=(t,o,a,r)=>{for(var e=r>1?void 0:r?ua(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&ma(o,a,e),e};const z=t=>{var a,vt,e,zo;class o extends t{constructor(){super(...arguments);Z(this,a);Z(this,e);this.cssStyles=""}connectedCallback(){super.connectedCallback(),this.theme&&F(this,a,vt).call(this)}}return a=new WeakSet,vt=function(){var S,I;const c=this.tagName.toLowerCase();for(const it in this.theme){const Nt=this.theme[it];this.cssStyles+=`--${F(this,e,zo).call(this,c)}-${F(this,e,zo).call(this,it)}: ${Nt};`}let k=(S=this.shadowRoot)==null?void 0:S.querySelector("#mjo-theme");k||(k=document.createElement("style"),k.setAttribute("id","mjo-theme"),(I=this.shadowRoot)==null||I.appendChild(k)),k.innerHTML=`:host {${this.cssStyles}}`},e=new WeakSet,zo=function(c){return c.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()},fa([s({type:Object})],o.prototype,"theme",2),o};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=t=>t??w;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ao extends Xt{constructor(o){if(super(o),this.it=w,o.type!==Vt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(o){if(o===w||o==null)return this._t=void 0,this.it=o;if(o===ut)return o;if(typeof o!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(o===this.it)return this._t;this.it=o;const a=[o];return a.raw=a,this._t={_$litType$:this.constructor.resultType,strings:a,values:[]}}}Ao.directiveName="unsafeHTML",Ao.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Oo extends Ao{}Oo.directiveName="unsafeSVG",Oo.resultType=2;const ba=Gt(Oo);var va=Object.defineProperty,ga=Object.getOwnPropertyDescriptor,gt=(t,o,a,r)=>{for(var e=r>1?void 0:r?ga(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&va(o,a,e),e};let go=class extends z(x){render(){return this.src?l`${ba(this.src)}`:w}};go.styles=[_`
            :host {
                position: relative;
                display: inline-block;
                font-size: 24px;
                width: 1em;
                height: 1em;
            }
            svg {
                position: relative;
                display: block;
                width: 1em;
                height: 1em;
                fill: currentColor;
                transition: var(--mjo-icon-transition, all 0.3s);
            }
        `];gt([s({type:String})],go.prototype,"src",2);go=gt([E("mjo-icon")],go);const K=async t=>new Promise(o=>setTimeout(o,t));var ya=Object.defineProperty,ja=Object.getOwnPropertyDescriptor,$=(t,o,a,r)=>{for(var e=r>1?void 0:r?ja(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&ya(o,a,e),e},yt=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)},Q=(t,o,a)=>(yt(t,o,"read from private field"),a?a.call(t):o.get(t)),T=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)},M=(t,o,a)=>(yt(t,o,"access private method"),a),N,Po,To,jt,Do,wt,uo,Mo,yo,Ro,Uo,xt;let b=class extends z(x){constructor(){super(...arguments),T(this,To),T(this,Do),T(this,uo),T(this,yo),T(this,Uo),this.itemTitle="",this.itemSubtitle="",this.expanded=!1,this.disabled=!1,this.compact=!1,this.icon=Jt,this.animationDuration=300,this.animationEasing="ease-in-out",this.variant="light",T(this,N,`accordion-item-${Math.random().toString(36).substring(2,15)}`),T(this,Po,t=>{if(this.disabled)return;const{key:o}=t;o==="Enter"||o===" "?(t.preventDefault(),M(this,uo,Mo).call(this)):o==="ArrowUp"||o==="ArrowDown"?(t.preventDefault(),M(this,To,jt).call(this,o==="ArrowUp"?"previous":"next")):o==="Home"||o==="End"?(t.preventDefault(),M(this,Do,wt).call(this,o==="Home"?"first":"last")):o==="Escape"&&this.expanded&&(t.preventDefault(),this.close())})}get computedAriaLabel(){return typeof this.itemTitle=="string"?`Toggle ${this.itemTitle}`:"Toggle accordion section"}render(){return l`
            <div class="container" data-variant=${this.variant} ?data-compact=${this.compact} ?data-disabled=${this.disabled}>
                <div
                    class="titleContainer"
                    role="button"
                    tabindex=${this.disabled?-1:0}
                    aria-expanded=${this.expanded}
                    aria-controls=${`${Q(this,N)}-content`}
                    aria-label=${this.computedAriaLabel}
                    aria-describedby=${O(this.ariaDescribedby)}
                    aria-disabled=${this.disabled}
                    @click=${M(this,uo,Mo)}
                    @keydown=${Q(this,Po)}
                >
                    <div class="titleContent" id=${`${Q(this,N)}-title`}>
                        ${typeof this.itemTitle=="string"?l`
                                  <mjo-typography class="title" tag="h3" size="heading3" weight="medium">${this.itemTitle}</mjo-typography>
                                  ${this.itemSubtitle?l`<mjo-typography class="subtitle" tag="p" size="body1" weight="medium"> ${this.itemSubtitle} </mjo-typography>`:w}
                              `:this.itemTitle}
                    </div>
                    <div class="iconContainer">
                        <mjo-icon src=${this.icon}></mjo-icon>
                    </div>
                </div>
                <div class="content" id=${`${Q(this,N)}-content`} role="region" aria-labelledby=${`${Q(this,N)}-title`}>
                    <slot></slot>
                </div>
            </div>
        `}updated(t){t.has("expanded")&&(this.expanded?M(this,yo,Ro).call(this):M(this,Uo,xt).call(this)),t.has("disabled")&&this.disabled&&this.close()}setCompact(t){this.compact=t}open(){this.expanded=!0}close(){this.expanded=!1}toggle(){this.expanded=!this.expanded}focus(){var t;(t=this.titleContainerEl)==null||t.focus()}};N=new WeakMap;Po=new WeakMap;To=new WeakSet;jt=function(t){const o=this.closest("mjo-accordion");if(!o)return;const a=Array.from(o.querySelectorAll("mjo-accordion-item")),r=a.indexOf(this),e=t==="previous"?r-1:r+1,n=a[e];n&&!n.disabled&&n.focus()};Do=new WeakSet;wt=function(t){const o=this.closest("mjo-accordion");if(!o)return;const a=Array.from(o.querySelectorAll("mjo-accordion-item")),r=t==="first"?a[0]:a[a.length-1];r&&!r.disabled&&r.focus()};uo=new WeakSet;Mo=function(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("mjo-accordion-toggle",{detail:{item:this,expanded:this.expanded}}))};yo=new WeakSet;Ro=async function(t=0){if(this.disabled)return;const o=this.contentEl.scrollHeight;if(o===0){if(t===10)return;setTimeout(()=>{M(this,yo,Ro).call(this,t+1)},50);return}const a=new CustomEvent("mjo-accordion-will-expand",{detail:{item:this,expanded:!0},cancelable:!0});this.dispatchEvent(a)&&(this.contentEl.style.transition=`
            max-height ${this.animationDuration}ms ${this.animationEasing},
            opacity ${this.animationDuration}ms ${this.animationEasing}
        `,this.iconEl.style.transition=`transform ${this.animationDuration}ms ${this.animationEasing}`,this.containerEl.style.paddingBottom="var(--mjo-accordion-item-content-padding, var(--mjo-space-medium))",this.contentEl.style.maxHeight=`${o}px`,this.contentEl.style.opacity="1",this.iconEl.style.transform="rotate(90deg)",await K(this.animationDuration),this.dispatchEvent(new CustomEvent("mjo-accordion-expanded",{detail:{item:this,expanded:this.expanded}})))};Uo=new WeakSet;xt=async function(){const t=new CustomEvent("mjo-accordion-will-collapse",{detail:{item:this,expanded:!1},cancelable:!0});this.dispatchEvent(t)&&(this.containerEl.removeAttribute("style"),this.contentEl.removeAttribute("style"),this.iconEl.removeAttribute("style"),await K(this.animationDuration),this.dispatchEvent(new CustomEvent("mjo-accordion-collapsed",{detail:{item:this,expanded:this.expanded}})))};b.styles=[_`
            :host {
                display: block;
            }
            .container {
                position: relative;
                transition: padding 0.3s ease-in-out;
            }
            .container[data-disabled] {
                pointer-events: none;
                opacity: 0.7;
            }
            .titleContainer {
                position: relative;
                display: flex;
                cursor: pointer;
                padding-top: var(--mjo-accordion-item-title-padding, var(--mjo-space-medium));
                padding-bottom: var(--mjo-accordion-item-title-padding, var(--mjo-space-medium));
            }
            .container[data-compact] .titleContainer {
                padding-top: var(--mjo-accordion-item-title-padding-compact, var(--mjo-space-small));
                padding-bottom: var(--mjo-accordion-item-title-padding-compact, var(--mjo-space-small));
            }
            .titleContent {
                position: relative;
                flex: 1 1 0;
            }
            .iconContainer {
                position: relative;
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
            .iconContainer mjo-icon {
                transition: transform 0.3s ease-in-out;
            }
            .title {
                margin: 0;
                font-size: var(--mjo-accordion-item-title-font-size, 1em);
                color: var(--mjo-accordion-item-title-color, var(--mjo-foreground-color));
            }
            .subtitle {
                margin: 0;
                color: var(--mjo-accordion-item-subtitle-color, var(--mjo-foreground-color-low));
            }
            .content {
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                box-sizing: border-box;
                transition:
                    max-height 0.3s ease-in-out,
                    opacity 0.3s ease-in-out;
            }
            .container[data-variant="shadow"] .titleContainer,
            .container[data-variant="shadow"] .content {
                padding-left: var(--mjo-accordion-padding, var(--mjo-space-medium));
                padding-right: var(--mjo-accordion-padding, var(--mjo-space-medium));
            }
            .container[data-variant="shadow"][data-compact] .titleContainer,
            .container[data-variant="shadow"][data-compact] .content {
                padding-left: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
                padding-right: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }
            .container[data-variant="bordered"] .titleContainer,
            .container[data-variant="bordered"] .content {
                padding-left: var(--mjo-accordion-padding, var(--mjo-space-medium));
                padding-right: var(--mjo-accordion-padding, var(--mjo-space-medium));
            }
            .container[data-variant="bordered"][data-compact] .titleContainer,
            .container[data-variant="bordered"][data-compact] .content {
                padding-left: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
                padding-right: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }
            .container[data-variant="splitted"] .titleContainer,
            .container[data-variant="splitted"] .content {
                padding-left: var(--mjo-accordion-padding, var(--mjo-space-medium));
                padding-right: var(--mjo-accordion-padding, var(--mjo-space-medium));
            }
            .container[data-variant="splitted"][data-compact] .titleContainer,
            .container[data-variant="splitted"][data-compact] .content {
                padding-left: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
                padding-right: var(--mjo-accordion-padding-compact, var(--mjo-space-small));
            }

            /* Accessibility: Respect prefers-reduced-motion */
            @media (prefers-reduced-motion: reduce) {
                .content,
                .iconContainer mjo-icon,
                .container {
                    transition: none !important;
                }
            }

            /* Focus styles for accessibility */
            .titleContainer:focus {
                outline: 2px solid var(--mjo-accordion-item-focus-color, var(--mjo-primary-color));
                outline-offset: 2px;
            }

            .titleContainer:focus-visible {
                outline: 2px solid var(--mjo-accordion-item-focus-color, var(--mjo-primary-color));
                outline-offset: 2px;
            }
        `];$([s({type:String})],b.prototype,"itemTitle",2);$([s({type:String})],b.prototype,"itemSubtitle",2);$([s({type:Boolean})],b.prototype,"expanded",2);$([s({type:Boolean})],b.prototype,"disabled",2);$([s({type:Boolean})],b.prototype,"compact",2);$([s({type:String})],b.prototype,"icon",2);$([s({type:Number})],b.prototype,"animationDuration",2);$([s({type:String})],b.prototype,"animationEasing",2);$([s({type:String,attribute:"aria-describedby"})],b.prototype,"ariaDescribedby",2);$([io()],b.prototype,"variant",2);$([L(".container")],b.prototype,"containerEl",2);$([L(".content")],b.prototype,"contentEl",2);$([L(".iconContainer mjo-icon")],b.prototype,"iconEl",2);$([L(".titleContainer")],b.prototype,"titleContainerEl",2);b=$([E("mjo-accordion-item")],b);var wa=Object.defineProperty,xa=Object.getOwnPropertyDescriptor,no=(t,o,a,r)=>{for(var e=r>1?void 0:r?xa(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&wa(o,a,e),e},$t=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)},$a=(t,o,a)=>($t(t,o,"read from private field"),a?a.call(t):o.get(t)),ht=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)},ka=(t,o,a)=>($t(t,o,"access private method"),a),Yo,Bo,kt;let B=class extends z(x){constructor(){super(...arguments),ht(this,Bo),this.variant="light",this.selectionMode="single",this.compact=!1,this.items=[],ht(this,Yo,t=>{const o=t,a=o.detail.item;this.selectionMode==="single"&&this.items.forEach(r=>{r!==a&&r.expanded&&r.close()}),this.dispatchEvent(new CustomEvent("mjo-accordion-toggle",{detail:{item:a,expanded:o.detail.expanded,accordion:this}}))})}render(){return l`<div class="container" role="tablist" data-variant=${this.variant} ?data-compact=${this.compact}></div>`}firstUpdated(){this.items=Array.from(this.querySelectorAll("mjo-accordion-item")),ka(this,Bo,kt).call(this)}updated(t){t.has("compact")&&this.items.forEach(o=>{o.setCompact(this.compact)}),t.has("variant")&&this.items.forEach(o=>{o.variant=this.variant})}expandItem(t){const o=typeof t=="number"?this.items[t]:this.items.find(a=>a.id===t);o&&!o.disabled&&o.open()}collapseItem(t){const o=typeof t=="number"?this.items[t]:this.items.find(a=>a.id===t);o&&o.close()}expandAll(){this.selectionMode==="multiple"&&this.items.forEach(t=>{t.disabled||t.open()})}collapseAll(){this.items.forEach(t=>t.close())}focusItem(t){this.items[t]&&!this.items[t].disabled&&this.items[t].focus()}};Yo=new WeakMap;Bo=new WeakSet;kt=function(){this.items.forEach(t=>{this.containerEl.appendChild(t),t.variant=this.variant,t.addEventListener("mjo-accordion-toggle",$a(this,Yo)),t.addEventListener("mjo-accordion-will-expand",o=>{const a=o;this.dispatchEvent(new CustomEvent("mjo-accordion-will-expand",{detail:{...a.detail,accordion:this},cancelable:!0,bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-expanded",o=>{const a=o;this.dispatchEvent(new CustomEvent("mjo-accordion-expanded",{detail:{...a.detail,accordion:this},bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-will-collapse",o=>{const a=o;this.dispatchEvent(new CustomEvent("mjo-accordion-will-collapse",{detail:{...a.detail,accordion:this},cancelable:!0,bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-collapsed",o=>{const a=o;this.dispatchEvent(new CustomEvent("mjo-accordion-collapsed",{detail:{...a.detail,accordion:this},bubbles:!0,composed:!0}))})})};B.styles=[_`
            :host {
                display: block;
                text-align: left;
            }

            .container {
                position: relative;
            }
            .container[data-variant="shadow"] {
                border-radius: var(--mjo-accordion-radius, var(--mjo-radius-large));
                background-color: var(--mjo-accordion-background-color, var(--mjo-background-color-high));
            }
            .container[data-variant="bordered"] {
                border-radius: var(--mjo-accordion-radius, var(--mjo-radius-large));
                border: 1px solid var(--mjo-accordion-border-color, var(--mjo-border-color));
            }
            .container[data-variant="light"] mjo-accordion-item,
            .container[data-variant="shadow"] mjo-accordion-item,
            .container[data-variant="bordered"] mjo-accordion-item {
                border-top: 1px solid var(--mjo-accordion-border-color, var(--mjo-border-color));
            }
            .container[data-variant="light"] mjo-accordion-item:first-child,
            .container[data-variant="shadow"] mjo-accordion-item:first-child,
            .container[data-variant="bordered"] mjo-accordion-item:first-child {
                border-top: none;
            }
            .container[data-variant="splitted"] {
                display: flex;
                flex-direction: column;
                gap: var(--mjo-accordion-gap, var(--mjo-space-small));
            }
            .container[data-variant="splitted"] mjo-accordion-item {
                border-radius: var(--mjo-accordion-radius, var(--mjo-radius-large));
                background-color: var(--mjo-accordion-background-color, var(--mjo-background-color-high));
            }
        `];no([s({type:String})],B.prototype,"variant",2);no([s({type:String})],B.prototype,"selectionMode",2);no([s({type:Boolean})],B.prototype,"compact",2);no([L(".container")],B.prototype,"containerEl",2);B=no([E("mjo-accordion")],B);var Ca=Object.defineProperty,_a=Object.getOwnPropertyDescriptor,v=(t,o,a,r)=>{for(var e=r>1?void 0:r?_a(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Ca(o,a,e),e},Ea=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)},D=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)},p=(t,o,a)=>(Ea(t,o,"access private method"),a),Lo,Ct,ot,_t,H,to,ao,xo,P,U,Io,Et,X,so;let m=class extends x{constructor(){super(...arguments),D(this,Lo),D(this,ot),D(this,H),D(this,ao),D(this,P),D(this,Io),D(this,X),this.type="info",this.size="medium",this.rounded="medium",this.message="",this.detail="",this.closable=!1,this.hideIcon=!1,this.ariaLive="polite",this.focusOnShow=!1,this.autoClose=!1,this.autoCloseDelay=5e3,this.animation="fade",this.animationDuration=300,this.persistent=!1,this.icon="",this.autoCloseTimer=null,this.storeHeight=0,this.isAnimating=!1}render(){const t=`alert-message-${Math.random().toString(36).substring(2,9)}`,o=`alert-detail-${Math.random().toString(36).substring(2,9)}`,a=this.type==="error"||this.type==="warning";return l`
            <div
                class="container"
                data-type=${this.type}
                data-size=${this.size}
                data-rounded=${this.rounded}
                data-animation=${this.animation}
                role="alert"
                aria-live=${a?"assertive":this.ariaLive}
                aria-atomic="true"
                aria-labelledby=${t}
                aria-describedby=${this.detail?o:w}
            >
                <div class="messageContainer">
                    ${!this.hideIcon&&this.icon?l`<div class="icon"><mjo-icon src=${this.icon}></mjo-icon></div>`:w}
                    <div class="message" id=${t}>${this.message}</div>
                    ${this.closable&&!this.persistent?p(this,Lo,Ct).call(this):w}
                </div>
                ${this.detail?l`<div class="detail" id=${o} ?data-icon=${!this.hideIcon}>${this.detail}</div>`:w}
            </div>
        `}updated(t){t.has("type")&&(this.type==="warning"?this.icon=Zt:this.type==="info"?this.icon=Qt:this.type==="error"?this.icon=ft:this.type==="success"?this.icon=Yt:this.icon=""),(t.has("autoClose")||t.has("autoCloseDelay"))&&p(this,H,to).call(this)}connectedCallback(){super.connectedCallback(),this.autoClose&&p(this,H,to).call(this),this.focusOnShow&&this.updateComplete.then(()=>{this.focus()})}disconnectedCallback(){super.disconnectedCallback(),p(this,ao,xo).call(this)}show(){this.autoClose&&p(this,H,to).call(this),p(this,Io,Et).call(this)}hide(){p(this,X,so).call(this)}focus(){var o;const t=(o=this.shadowRoot)==null?void 0:o.querySelector(".close-button");t?t.focus():super.focus()}announce(){var o;const t=(o=this.shadowRoot)==null?void 0:o.querySelector(".container");if(t){const a=t.getAttribute("aria-live");t.setAttribute("aria-live","off"),setTimeout(()=>{t.setAttribute("aria-live",a||this.ariaLive)},100)}}};Lo=new WeakSet;Ct=function(){return l`
            <button class="close-button" type="button" aria-label="Close alert" @click=${p(this,X,so)} @keydown=${p(this,ot,_t)}>
                <mjo-icon src=${oa}></mjo-icon>
            </button>
        `};ot=new WeakSet;_t=function(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),p(this,X,so).call(this))};H=new WeakSet;to=function(){p(this,ao,xo).call(this),this.autoClose&&this.autoCloseDelay>0&&(this.autoCloseTimer=window.setTimeout(()=>{p(this,X,so).call(this)},this.autoCloseDelay))};ao=new WeakSet;xo=function(){this.autoCloseTimer&&(clearTimeout(this.autoCloseTimer),this.autoCloseTimer=null)};P=new WeakSet;U=function(t,o){this.dispatchEvent(new CustomEvent(t,{detail:{element:this,...o},bubbles:!0,composed:!0}))};Io=new WeakSet;Et=function(){var a;const t=(a=this.shadowRoot)==null?void 0:a.querySelector(".container");if(!t||t.offsetHeight>0||this.isAnimating)return;if(p(this,P,U).call(this,"mjo-alert-will-show"),this.autoClose&&p(this,H,to).call(this),this.animation==="none"){this.style.display="block",p(this,P,U).call(this,"mjo-alert-show");return}this.isAnimating=!0;let o=null;switch(this.animation){case"fade":o=t.animate([{opacity:0,height:"0",display:"none"},{opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"slide":o=t.animate([{transform:"translateX(-100%)",opacity:0,height:"0",display:"none"},{transform:"translateX(0)",opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"scale":o=t.animate([{transform:"scale(0)",opacity:0,height:"0",display:"none"},{transform:"scale(1)",opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break}o.finished.then(()=>{p(this,P,U).call(this,"mjo-alert-show"),o&&o.cancel(),this.isAnimating=!1})};X=new WeakSet;so=function(){var e,n;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".container");if(!t||t.offsetHeight===0||this.isAnimating)return;p(this,P,U).call(this,"mjo-alert-will-close"),p(this,ao,xo).call(this);const o=document.activeElement,a=((n=this.shadowRoot)==null?void 0:n.contains(o))||this===o;if(this.animation==="none"){this.style.display="none",p(this,P,U).call(this,"mjo-alert-closed");return}this.isAnimating=!0,this.storeHeight=t.offsetHeight;let r=null;switch(this.animation){case"fade":r=t.animate([{opacity:1,height:this.storeHeight+"px"},{opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"slide":r=t.animate([{transform:"translateX(0)",opacity:1,height:this.storeHeight+"px"},{transform:"translateX(-100%)",opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"scale":r=t.animate([{transform:"scale(1)",opacity:1,height:this.storeHeight+"px"},{transform:"scale(0)",opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break}r==null||r.finished.then(()=>{if(a){const i=this.nextElementSibling||this.previousElementSibling||this.parentElement;i&&i instanceof HTMLElement&&i.focus()}this.isAnimating=!1,p(this,P,U).call(this,"mjo-alert-closed")})};m.styles=[_`
            :host {
                display: block;
                position: relative;
                text-align: left;
                --mjo-alert-space: var(--mjo-space-small);
                --mjo-alert-animation-duration: 300ms;
                overflow: hidden;
            }

            :host([hidden]) {
                display: none !important;
            }

            .container {
                position: relative;
                padding: var(--mjo-alert-space);
                transition: padding var(--mjo-alert-animation-duration);
                box-sizing: border-box;
            }

            /* Animation support */
            .container[data-animation="slide"] {
                transform-origin: left center;
            }

            .container[data-animation="scale"] {
                transform-origin: center center;
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                :host {
                    --mjo-alert-animation-duration: 0ms;
                }
                .container {
                    transition: none;
                }
            }

            /* Type-based styling */
            .container[data-type="success"] {
                background-color: var(--mjo-color-green-50);
                border: solid 1px var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            .container[data-type="error"] {
                background-color: var(--mjo-color-red-50);
                border: solid 1px var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            .container[data-type="warning"] {
                background-color: var(--mjo-color-yellow-50);
                border: solid 1px var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            .container[data-type="info"] {
                background-color: var(--mjo-color-blue-50);
                border: solid 1px var(--mjo-color-info);
                color: var(--mjo-color-info);
            }

            /* Size variants */
            .container[data-size="small"] {
                font-size: 0.8em;
                --mjo-alert-space: var(--mjo-space-xsmall);
            }
            .container[data-size="large"] {
                font-size: 1.2em;
            }

            /* Border radius */
            .container[data-rounded="small"] {
                border-radius: var(--mjo-radius-small);
            }
            .container[data-rounded="medium"] {
                border-radius: var(--mjo-radius-medium);
            }
            .container[data-rounded="large"] {
                border-radius: var(--mjo-radius-large);
            }

            /* Message container */
            .messageContainer {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                gap: var(--mjo-space-xsmall);
                align-items: flex-start;
            }

            .icon {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                align-self: stretch;
                display: grid;
                place-content: center;
            }

            .icon mjo-icon {
                font-size: 1em;
            }

            .message {
                position: relative;
                flex-grow: 1;
                flex-basis: 0;
                align-self: stretch;
                display: flex;
                align-items: center;
                word-wrap: break-word;
            }

            /* Close button styling */
            .close-button {
                background: none;
                border: none;
                padding: 0;
                margin: 0;
                cursor: pointer;
                color: inherit;
                font-size: inherit;
                display: grid;
                place-content: center;
                border-radius: var(--mjo-radius-small);
                transition: all 0.2s ease;
                min-width: 1.5em;
                min-height: 1.5em;
            }

            .close-button:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }

            .close-button:focus {
                outline: 2px solid currentColor;
                outline-offset: 2px;
            }

            .close-button:active {
                transform: scale(0.95);
            }

            .close-button mjo-icon {
                font-size: 1em;
            }

            /* Detail section */
            .detail {
                position: relative;
                padding: var(--mjo-alert-space) 0 0 0;
                font-size: 0.8em;
                word-wrap: break-word;
            }

            .detail[data-icon] {
                padding-left: calc(1em + var(--mjo-space-xsmall));
            }

            /* Focus management */
            :host(:focus) {
                outline: 2px solid currentColor;
                outline-offset: 2px;
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .container {
                    border-width: 2px;
                }
                .close-button:focus {
                    outline-width: 3px;
                }
            }

            /* Dark mode considerations */
            @media (prefers-color-scheme: dark) {
                .close-button:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        `];v([s({type:String})],m.prototype,"type",2);v([s({type:String})],m.prototype,"size",2);v([s({type:String})],m.prototype,"rounded",2);v([s({type:String})],m.prototype,"message",2);v([s({type:String})],m.prototype,"detail",2);v([s({type:Boolean})],m.prototype,"closable",2);v([s({type:Boolean})],m.prototype,"hideIcon",2);v([s({type:String})],m.prototype,"ariaLive",2);v([s({type:Boolean})],m.prototype,"focusOnShow",2);v([s({type:Boolean})],m.prototype,"autoClose",2);v([s({type:Number})],m.prototype,"autoCloseDelay",2);v([s({type:String})],m.prototype,"animation",2);v([s({type:Number})],m.prototype,"animationDuration",2);v([s({type:Boolean})],m.prototype,"persistent",2);v([io()],m.prototype,"icon",2);v([io()],m.prototype,"autoCloseTimer",2);m=v([E("mjo-alert")],m);var Sa=Object.defineProperty,za=Object.getOwnPropertyDescriptor,j=(t,o,a,r)=>{for(var e=r>1?void 0:r?za(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Sa(o,a,e),e},Aa=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)},lo=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)},Y=(t,o,a)=>(Aa(t,o,"access private method"),a),Fo,St,Wo,zt,jo,tt,qo,At;let f=class extends z(x){constructor(){super(...arguments),lo(this,Fo),lo(this,Wo),lo(this,jo),lo(this,qo),this.bordered=!1,this.disabled=!1,this.clickable=!1,this.nameColoured=!1,this.color="default",this.radius="full",this.size="medium",this.error=!1,this.initial=""}get appropriateRole(){return this.clickable?"button":this.src?"img":"presentation"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.clickable?`Click to interact with ${this.name||this.value||"avatar"}`:this.name?`Avatar for ${this.name}`:"Avatar"}render(){return this.initial=this.name?this.name[0].toLocaleUpperCase():"",l`<div
            class="container size-${this.size} radius-${this.radius} color-${this.color}"
            role=${this.appropriateRole}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${O(this.ariaDescribedby)}
            aria-disabled=${this.disabled?"true":"false"}
            tabindex=${this.clickable?this.tabIndex??0:-1}
            ?data-bordered=${this.bordered}
            ?data-disabled=${this.disabled}
            ?data-clickable=${this.clickable}
            @click=${Y(this,jo,tt)}
            @keydown=${Y(this,Wo,zt)}
        >
            ${this.src&&!this.error?l`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${O(this.alt||this.name)} @error=${Y(this,qo,At)} />
                  </div>`:this.fallbackIcon?l`<div class="image fallback radius-${this.radius} font-size-${this.size}"><mjo-icon src=${this.fallbackIcon}></mjo-icon></div>`:this.name?l`<div class="image name radius-${this.radius} font-size-${this.size}"><span>${this.initial}</span></div>`:l`<div class="image radius-${this.radius}"></div>`}
        </div>`}connectedCallback(){super.connectedCallback(),this.name&&(this.initial=this.name[0].toUpperCase())}updated(t){var a;t.has("name")&&(this.initial=this.name?this.name[0].toUpperCase():""),t.has("src")&&(this.error=!1);const o=(a=this.shadowRoot)==null?void 0:a.querySelector(".image.name");if(this.name&&this.nameColoured&&o){const[r,e]=Y(this,Fo,St).call(this);o.style.backgroundColor=r,o.style.color=e}else o&&(o.style.backgroundColor="",o.style.color="")}};Fo=new WeakSet;St=function(){const t=["#e72c2c","#e7902c","#f1db13","#c1f113","#59f113","#26b632","#19da90","#10dfcd","#0ab4df","#0a78df","#0a43df","#6d0adf","#985cdd","#c85cdd","#dd5cc8","#c7199b","#c7194d"],o=["#fff","#fff","#000","#000","#000","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff"],a=this.initial.charCodeAt(0)%t.length,r=this.initial.charCodeAt(0)%o.length;return[t[a],o[r]]};Wo=new WeakSet;zt=function(t){!this.clickable||this.disabled||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),Y(this,jo,tt).call(this))};jo=new WeakSet;tt=async function(){!this.clickable||this.disabled||(this.dispatchEvent(new CustomEvent("mjo-avatar-click",{detail:{value:this.value||this.name||""}})),this.container.style.transform="scale(0.9)",await K(100),this.container.style.transform="scale(1.1)",await K(150),this.container.removeAttribute("style"))};qo=new WeakSet;At=function(){this.error=!0,this.dispatchEvent(new CustomEvent("mjo-avatar-error",{detail:{message:"Failed to load avatar image"}}))};f.styles=[_`
            :host {
                display: inline-block;
                vertical-align: middle;
            }

            .container {
                position: relative;
                box-sizing: border-box;
                user-select: none;
            }
            .container[data-disabled] {
                opacity: 0.5;
                cursor: default !important;
            }

            .image {
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: var(--mjo-avatar-background-color, var(--mjo-color-gray-400));
                transition-property: background-color border-color border-radius;
                transition-duration: 0.3s;
            }
            .image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                vertical-align: middle;
            }

            .fallback {
                display: grid;
                place-content: center;
                color: var(--mjo-avatar-fallback-color, var(--mjo-color-gray-100));
            }
            .name {
                display: grid;
                place-content: center;
                font-weight: bold;
                background-color: var(--mjo-avatar-name-auto-background-color, var(--mjo-avatar-background-color, var(--mjo-color-gray-400)));
                color: var(--mjo-avatar-name-auto-foreground-color, var(--mjo-avatar-name-color, var(--mjo-color-gray-100)));
            }

            .size-small {
                font-size: var(--mjo-avatar-fallback-size-small, 18px);
            }
            .size-medium {
                font-size: var(--mjo-avatar-fallback-size-medium, 28px);
            }
            .size-large {
                font-size: var(--mjo-avatar-fallback-size-large, 40px);
            }
            .size-small mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-small, 18px);
            }
            .size-medium mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-medium, 28px);
            }
            .size-large mjo-icon {
                font-size: var(--mjo-avatar-fallback-size-large, 40px);
            }
            .radius-small {
                border-radius: var(--mjo-avatar-radius-small, 4px);
            }
            .radius-medium {
                border-radius: var(--mjo-avatar-radius-medium, 8px);
            }
            .radius-large {
                border-radius: var(--mjo-avatar-radius-large, 12px);
            }
            .radius-full {
                border-radius: 50%;
            }
            .size-small {
                width: var(--mjo-avatar-size-small, 32px);
                height: var(--mjo-avatar-size-small, 32px);
            }
            .size-medium {
                width: var(--mjo-avatar-size-medium, 44px);
                height: var(--mjo-avatar-size-medium, 44px);
            }
            .size-large {
                width: var(--mjo-avatar-size-large, 54px);
                height: var(--mjo-avatar-size-large, 54px);
            }
            .color-default {
                border-color: var(--mjo-avatar-name-auto-background-color, var(--mjo-avatar-border-color, var(--mjo-color-gray-300)));
            }
            .color-primary {
                border-color: var(--mjo-primary-color, #1976d2);
            }
            .color-secondary {
                border-color: var(--mjo-secondary-color, #cc3d74);
            }
            .color-success {
                border-color: var(--mjo-success-color, #4caf50);
            }
            .color-warning {
                border-color: var(--mjo-warning-color, #ff9800);
            }
            .color-info {
                border-color: var(--mjo-info-color, #128ada);
            }
            .color-error {
                border-color: var(--mjo-error-color, #f44336);
            }

            .container[data-bordered] {
                border-style: solid;
                border-width: var(--mjo-avatar-border-width, 2px);
                padding: 2px;
            }
            .container[data-bordered].size-small {
                width: calc(var(--mjo-avatar-size-small, 32px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-small, 32px) - var(--mjo-avatar-border-width, 2px));
                font-size: calc(var(--mjo-avatar-fallback-size-small, 18px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-medium {
                width: calc(var(--mjo-avatar-size-medium, 44px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-medium, 44px) - var(--mjo-avatar-border-width, 2px));
                font-size: calc(var(--mjo-avatar-fallback-size-medium, 26px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-large {
                width: calc(var(--mjo-avatar-size-large, 54px) - var(--mjo-avatar-border-width, 2px));
                height: calc(var(--mjo-avatar-size-large, 54px) - var(--mjo-avatar-border-width, 2px));
                font-size: calc(var(--mjo-avatar-fallback-size-large, 36px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-small mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-small, 18px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-medium mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-medium, 26px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-bordered].size-large mjo-icon {
                font-size: calc(var(--mjo-avatar-fallback-size-large, 36px) - var(--mjo-avatar-border-width, 2px));
            }
            .container[data-clickable] {
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            .container:focus-visible {
                outline: 2px solid var(--mjo-primary-color, #005fcc);
                outline-offset: 2px;
            }
            .container[data-clickable]:focus-visible {
                outline: 2px solid var(--mjo-primary-color, #005fcc);
                outline-offset: 2px;
            }

            @media (prefers-reduced-motion: reduce) {
                .container[data-clickable] {
                    transition: none;
                }
                .image {
                    transition: none;
                }
            }
        `];j([s({type:Boolean})],f.prototype,"bordered",2);j([s({type:Boolean})],f.prototype,"disabled",2);j([s({type:Boolean})],f.prototype,"clickable",2);j([s({type:Boolean})],f.prototype,"nameColoured",2);j([s({type:String})],f.prototype,"fallbackIcon",2);j([s({type:String})],f.prototype,"alt",2);j([s({type:String})],f.prototype,"color",2);j([s({type:String})],f.prototype,"name",2);j([s({type:String})],f.prototype,"radius",2);j([s({type:String})],f.prototype,"size",2);j([s({type:String})],f.prototype,"src",2);j([s({type:String})],f.prototype,"value",2);j([s({type:String,attribute:"aria-describedby"})],f.prototype,"ariaDescribedby",2);j([io()],f.prototype,"error",2);j([L(".container")],f.prototype,"container",2);f=j([E("mjo-avatar")],f);const Oa=(t,o)=>{var e;let a=t.parentElement||t.getRootNode().host,r=pt(o,a);if(r)return r;for(;a;){if(a.tagName===o.toUpperCase())return a;if(a=a.parentElement||((e=a.getRootNode())==null?void 0:e.host),a!=null&&a.shadowRoot&&(r=pt(o,a),r))return r}return null},pt=(t,o)=>o!=null&&o.shadowRoot?o.shadowRoot.querySelector(t):null;var Pa=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,h=(t,o,a,r)=>{for(var e=r>1?void 0:r?Ta(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Pa(o,a,e),e};const Da=t=>{var a,Ot,e,Pt;class o extends t{constructor(){super(...arguments);Z(this,a);Z(this,e);this.formIgnore=!1,this.form=null,this.mjoForm=null,this.listenersFormMixin={formData:c=>{F(this,e,Pt).call(this,c)}}}firstUpdated(){F(this,a,Ot).call(this)}disconnectedCallback(){var c;super.disconnectedCallback(),(c=this.form)==null||c.removeEventListener("formdata",this.listenersFormMixin.formData)}updateFormData({name:c,value:k}){c&&(this.dataFormMixin={name:c,value:k})}submiForm(){this.form&&(new FormData(this.form),this.form.dispatchEvent(new SubmitEvent("submit",{cancelable:!0,bubbles:!0})))}}return a=new WeakSet,Ot=function(){var c,k,S,I;this.form=Oa(this,"form"),(c=this.form)==null||c.addEventListener("formdata",this.listenersFormMixin.formData),!this.formIgnore&&(this.mjoForm=(S=(k=this.form)==null?void 0:k.parentNode)==null?void 0:S.host,((I=this.mjoForm)==null?void 0:I.tagName)==="MJO-FORM"&&(this.tagName==="MJO-BUTTON"&&this.type==="submit"?this.mjoForm.submitButton=this:this.mjoForm.elements.push(this)))},e=new WeakSet,Pt=function(c){this.dataFormMixin&&c.formData.set(this.dataFormMixin.name,this.dataFormMixin.value)},h([s({type:Boolean})],o.prototype,"isemail",2),h([s({type:Boolean})],o.prototype,"isurl",2),h([s({type:Boolean})],o.prototype,"required",2),h([s({type:Boolean})],o.prototype,"nospaces",2),h([s({type:Array})],o.prototype,"rangelength",2),h([s({type:Boolean})],o.prototype,"isnumber",2),h([s({type:Array})],o.prototype,"range",2),h([s({type:Array})],o.prototype,"domains",2),h([s({type:String})],o.prototype,"isdate",2),h([s({type:Boolean})],o.prototype,"dateprevious",2),h([s({type:Number})],o.prototype,"minage",2),h([s({type:Number})],o.prototype,"maxage",2),h([s({type:String})],o.prototype,"security",2),h([s({type:String})],o.prototype,"equalto",2),h([s({type:Boolean})],o.prototype,"phonenumber",2),h([s({type:Array})],o.prototype,"phonecountry",2),h([s({type:String})],o.prototype,"pattern",2),h([s({type:Array})],o.prototype,"allowed",2),h([s({type:Number})],o.prototype,"mincheck",2),h([s({type:Number})],o.prototype,"maxcheck",2),h([s({type:Number})],o.prototype,"max",2),h([s({type:Number})],o.prototype,"min",2),h([s({type:Number})],o.prototype,"maxlength",2),h([s({type:Number})],o.prototype,"minlength",2),h([s({type:Boolean,attribute:"form-ignore"})],o.prototype,"formIgnore",2),o};var Ma=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,Ua=(t,o,a,r)=>{for(var e=r>1?void 0:r?Ra(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Ma(o,a,e),e};let No=class extends z(x){constructor(){super(...arguments),this.handleClick=t=>{var n;const o=t.offsetX,a=t.offsetY,r=document.createElement("span");r.style.left=`${o}px`,r.style.top=`${a}px`;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("div.container");e.removeAttribute("hidden"),e.appendChild(r),setTimeout(()=>{r.remove()},800),clearTimeout(this.timeoutRipple),this.timeoutRipple=setTimeout(()=>{e.setAttribute("hidden","")},850)}}render(){return l`<div class="container" hidden></div>`}connectedCallback(){super.connectedCallback(),this.parent=this.parentElement,this.parent.addEventListener("click",this.handleClick)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.parent)==null||t.removeEventListener("click",this.handleClick)}};No.styles=[_`
            :host {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                display: block;
                cursor: pointer;
            }
            .container {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                overflow: hidden;
            }
            [hidden] {
                display: none;
            }
            span {
                position: absolute;
                background-color: var(--mo-ripple-color, currentColor);
                transform: translate(-50%, -50%);
                pointer-events: none;
                border-radius: 50%;
                animation: ripple 0.8s linear infinite;
            }
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: var(--mo-ripple-opacity, 0.25);
                }
                100% {
                    width: 800px;
                    height: 800px;
                    opacity: 0;
                }
            }
        `];No=Ua([E("mjo-ripple")],No);var Ba=Object.defineProperty,La=Object.getOwnPropertyDescriptor,$o=(t,o,a,r)=>{for(var e=r>1?void 0:r?La(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Ba(o,a,e),e};let V=class extends z(x){constructor(){super(...arguments),this.tag="p",this.size="base",this.weight="regular"}render(){switch(this.tag){case"h1":return l`<h1 class=${`${this.size} ${this.weight}`}><slot></slot></h1>`;case"h2":return l`<h2 class=${`${this.size} ${this.weight}`}><slot></slot></h2>`;case"h3":return l`<h3 class=${`${this.size} ${this.weight}`}><slot></slot></h3>`;case"h4":return l`<h4 class=${`${this.size} ${this.weight}`}><slot></slot></h4>`;case"h5":return l`<h5 class=${`${this.size} ${this.weight}`}><slot></slot></h5>`;case"span":return l`<span class=${`${this.size} ${this.weight}`}><slot></slot></span>`;case"p":return l`<p class=${`${this.size} ${this.weight}`}><slot></slot></p>`;default:return l`<slot></slot>`}}};V.styles=[_`
            :host {
                display: block;
                margin: 0.5em 0;
            }
            :host([tag="span"]),
            :host([tag="none"]) {
                margin: 0;
                display: inline;
            }
            :host([tag="none"]) {
                line-height: calc(1em + 6px);
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            span {
                padding: 0;
                margin: 0;
            }
            .heading1 {
                font-size: var(--mjo-typography-h1-font-size, 2em);
                line-height: var(--mjo-typography-h1-line-height, calc(1em + 6px));
            }
            .heading2 {
                font-size: var(--mjo-typography-h2-font-size, 1.5em);
                line-height: var(--mjo-typography-h2-line-height, calc(1em + 6px));
            }
            .heading3 {
                font-size: var(--mjo-typography-h3-font-size, 1.25em);
                line-height: var(--mjo-typography-h3-line-height, calc(1em + 6px));
            }
            .base {
                font-size: var(--mjo-typography-base-font-size, 1em);
                line-height: var(--mjo-typography-base-line-height, calc(1em + 6px));
            }
            .body1 {
                font-size: var(--mjo-typography-body1-font-size, 0.875em);
                line-height: var(--mjo-typography-body1-line-height, calc(1em + 6px));
            }
            .body2 {
                font-size: var(--mjo-typography-body2-font-size, 0.75em);
                line-height: var(--mjo-typography-body2-line-height, calc(1em + 6px));
            }
            .body3 {
                font-size: var(--mjo-typography-body3-font-size, 0.625em);
                line-height: var(--mjo-typography-body3-line-height, calc(1em + 6px));
            }
            .light {
                font-weight: var(--mjo-typography-font-weight-light, 300);
            }
            .regular {
                font-weight: var(--mjo-typography-font-weight-regular, 400);
            }
            .medium {
                font-weight: var(--mjo-typography-font-weight-medium, 500);
            }
            .bold {
                font-weight: var(--mjo-typography-font-weight-bold, 600);
            }
        `];$o([s({type:String})],V.prototype,"tag",2);$o([s({type:String})],V.prototype,"size",2);$o([s({type:String})],V.prototype,"weight",2);V=$o([E("mjo-typography")],V);var Ia=Object.defineProperty,Fa=Object.getOwnPropertyDescriptor,g=(t,o,a,r)=>{for(var e=r>1?void 0:r?Fa(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Ia(o,a,e),e},Wa=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)},ho=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)},fo=(t,o,a)=>(Wa(t,o,"access private method"),a),Ho,Tt,at,Dt,Ko,Mt,Xo,Rt;let u=class extends z(Da(x)){constructor(){super(...arguments),ho(this,Ho),ho(this,at),ho(this,Ko),ho(this,Xo),this.fullwidth=!1,this.disabled=!1,this.loading=!1,this.rounded=!1,this.toggleable=!1,this.smallCaps=!1,this.noink=!1,this.size="medium",this.color="primary",this.variant="default",this.type="button",this.toggle=!1}render(){const t=this.loading?"true":"false",o=this.toggleable?this.toggle?"true":"false":void 0;return l`<button
            type=${this.type}
            data-color=${this.color}
            data-variant=${this.variant}
            data-size=${this.size}
            ?data-rounded=${this.rounded}
            ?data-toggle=${this.toggle}
            ?data-small-caps=${this.smallCaps}
            aria-busy=${t}
            aria-pressed=${O(o)}
            aria-label=${O(this.buttonLabel)}
            aria-describedby=${O(this.describedBy)}
            ?disabled=${this.disabled||this.loading}
            @click=${fo(this,Ho,Tt)}
        >
            ${this.startIcon&&l` <mjo-icon src=${this.startIcon}></mjo-icon>`}
            <mjo-typography tag="none"><slot></slot></mjo-typography>
            ${this.endIcon&&l` <mjo-icon src=${this.endIcon}></mjo-icon>`}
            ${!this.noink&&!this.disabled&&!this.loading?l`<mjo-ripple></mjo-ripple>`:w}
            ${this.loading?l`<div class="loading" aria-hidden="true"></div>`:w}
        </button>`}updated(t){super.updated(t),(this.disabled||this.loading)&&this.toggle&&(this.toggle=!1),t.has("loading")&&fo(this,Xo,Rt).call(this),t.has("toggle")&&this.toggleable&&fo(this,Ko,Mt).call(this,t.get("toggle"))}focus(t){var a;const o=(a=this.shadowRoot)==null?void 0:a.querySelector("button");o==null||o.focus(t)}blur(){var o;const t=(o=this.shadowRoot)==null?void 0:o.querySelector("button");t==null||t.blur()}click(){var o;const t=(o=this.shadowRoot)==null?void 0:o.querySelector("button");t==null||t.click()}setLoading(t){this.loading=t}togglePressed(){this.toggleable&&!this.disabled&&!this.loading&&(this.toggle=!this.toggle)}};Ho=new WeakSet;Tt=function(t){if(this.disabled||this.loading){t.preventDefault(),t.stopPropagation();return}this.toggleable&&this.type==="button"&&(this.toggle=!this.toggle),this.form&&this.type==="submit"&&this.submiForm(),fo(this,at,Dt).call(this,t)};at=new WeakSet;Dt=function(t){const o=new CustomEvent("mjo-button-click",{detail:{element:this,toggle:this.toggle,originalEvent:t},bubbles:!0,composed:!0});this.dispatchEvent(o)};Ko=new WeakSet;Mt=function(t){const o=new CustomEvent("mjo-button-toggle",{detail:{element:this,pressed:this.toggle,previousState:t},bubbles:!0,composed:!0});this.dispatchEvent(o)};Xo=new WeakSet;Rt=function(){const t=new CustomEvent("mjo-button-loading-change",{detail:{element:this,loading:this.loading},bubbles:!0,composed:!0});this.dispatchEvent(t)};u.styles=[_`
            :host {
                display: inline-block;
                cursor: pointer;
            }
            :host([fullwidth]) {
                width: 100%;
            }
            button {
                align-items: center;
                background-color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                border-radius: var(--mjo-button-border-radius, var(--mjo-radius, 5px));
                border: var(--mjo-button-primary-border, solid 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb)));
                box-sizing: border-box;
                color: var(--mjo-button-primary-foreground-color, var(--mjo-primary-foreground-color, white));
                cursor: inherit;
                display: flex;
                flex-flow: row nowrap;
                font-size: var(--mjo-button-font-size, 1em);
                font-weight: var(--mjo-button-font-weight, normal);
                font-family: var(--mjo-button-font-family, inherit);
                line-height: var(--mjo-button-font-size, 1em);
                gap: 5px;
                justify-content: center;
                overflow: hidden;
                padding: var(--mjo-button-padding, calc(1em / 2 - 1px) calc(1em / 2 + 2px));
                position: relative;
                transition: all 0.3s;
                width: 100%;
                outline-color: transparent;
                outline-offset: 2px;
                outline-width: 2px;
                outline-style: solid;
            }
            button:hover {
                background-color: var(--mjo-button-primary-color-hover, var(--mjo-primary-color-hover, #4e9be4));
                border: solid 1px var(--mjo-button-primary-color-hover, var(--mjo-primary-color-hover, #4e9be4));
            }
            button:focus {
                outline-color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            /* Ensure high contrast mode compatibility */
            @media (prefers-contrast: high) {
                button {
                    border-width: 2px;
                }
                button:focus {
                    outline-width: 3px;
                }
            }
            button[data-small-caps] {
                font-variant: all-small-caps;
            }
            button[data-color="secondary"]:focus {
                outline-color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-color="secondary"] {
                background-color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                border: var(--mjo-button-secondary-border, solid 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74)));
                color: var(--mjo-button-secondary-foreground-color, var(--mjo-secondary-foreground-color, white));
            }
            button[data-color="secondary"]:hover {
                background-color: var(--mjo-button-secondary-color-hover, var(--mjo-secondary-color-hover, #d86490));
                border: solid 1px var(--mjo-button-secondary-color-hover, var(--mjo-secondary-color-hover, #d86490));
            }
            button[data-color="success"]:focus {
                outline-color: var(--mjo-color-success);
            }
            button[data-color="success"] {
                background-color: var(--mjo-color-success);
                border: var(--mjo-button-secondary-border, solid 1px var(--mjo-color-success));
                color: white;
            }
            button[data-color="info"]:focus {
                outline-color: var(--mjo-color-info);
            }
            button[data-color="info"] {
                background-color: var(--mjo-color-info);
                border: var(--mjo-button-secondary-border, solid 1px var(--mjo-color-info));
                color: white;
            }
            button[data-color="warning"]:focus {
                outline-color: var(--mjo-color-warning);
            }
            button[data-color="warning"] {
                background-color: var(--mjo-color-warning);
                border: var(--mjo-button-secondary-border, solid 1px var(--mjo-color-warning));
                color: white;
            }
            button[data-color="error"]:focus {
                outline-color: var(--mjo-color-error);
            }
            button[data-color="error"] {
                background-color: var(--mjo-color-error);
                border: var(--mjo-button-secondary-border, solid 1px var(--mjo-color-error));
                color: white;
            }
            button[data-color="success"]:hover,
            button[data-color="info"]:hover,
            button[data-color="warning"]:hover,
            button[data-color="error"]:hover {
                opacity: 0.8;
            }
            button[data-variant="ghost"] {
                background-color: transparent;
                border: solid 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            button[data-variant="ghost"][data-color="secondary"] {
                background-color: transparent;
                border: solid 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-variant="ghost"][data-color="info"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-info);
                color: var(--mjo-color-info);
            }
            button[data-variant="ghost"][data-color="warning"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            button[data-variant="ghost"][data-color="error"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            button[data-variant="ghost"][data-color="success"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            button[data-variant="ghost"]:hover,
            button[data-variant="ghost"][data-color="secondary"]:hover,
            button[data-variant="ghost"][data-color="info"]:hover,
            button[data-variant="ghost"][data-color="warning"]:hover,
            button[data-variant="ghost"][data-color="error"]:hover,
            button[data-variant="ghost"][data-color="success"]:hover {
                background-color: var(--mjo-background-color-high);
            }
            button[data-variant="flat"] {
                background-color: var(--mjo-button-flat-primary-background-color, var(--mjo-primary-color-alpha2, #1d7fdb22));
                color: var(--mjo-button-flat-primary-foreground-color, var(--mjo-primary-color, #1d7fdb));
                border: none;
            }
            button[data-variant="flat"]:hover {
                background-color: var(--mjo-button-flat-primary-background-color-hover, var(--mjo-primary-color-alpha1, #1d7fdb22));
                color: var(--mjo-button-flat-primary-foreground-color-hover, var(--mjo-primary-color, #1d7fdb));
                border: none;
            }
            button[data-variant="flat"][data-color="secondary"] {
                background-color: var(--mjo-button-flat-secondary-background-color, var(--mjo-secondary-color-alpha2, #cc3d7422));
                color: var(--mjo-button-flat-secondary-foreground-color, var(--mjo-secondary-color, #cc3d74));
                border: none;
            }
            button[data-variant="flat"][data-color="secondary"]:hover {
                background-color: var(--mjo-button-flat-secondary-background-color-hover, var(--mjo-secondary-color-alpha1, #cc3d7422));
                color: var(--mjo-button-flat-secondary-foreground-color-hover, var(--mjo-secondary-color, #cc3d74));
                border: none;
            }
            button[data-variant="flat"][data-color="success"],
            button[data-variant="flat"][data-color="error"],
            button[data-variant="flat"][data-color="info"],
            button[data-variant="flat"][data-color="warning"] {
                background-color: transparent;
                color: white;
                border: none;
            }
            button[data-variant="flat"][data-color="success"]::before {
                background-color: var(--mjo-color-success);
                position: absolute;
                inset: 0;
                content: "";
                opacity: 0.2;
            }
            button[data-variant="flat"][data-color="info"]::before {
                background-color: var(--mjo-color-info);
                position: absolute;
                inset: 0;
                content: "";
                opacity: 0.2;
            }
            button[data-variant="flat"][data-color="warning"]::before {
                background-color: var(--mjo-color-warning);
                position: absolute;
                inset: 0;
                content: "";
                opacity: 0.2;
            }
            button[data-variant="flat"][data-color="error"]::before {
                background-color: var(--mjo-color-error);
                position: absolute;
                inset: 0;
                content: "";
                opacity: 0.2;
            }
            button[data-variant="dashed"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            button[data-variant="dashed"][data-color="secondary"] {
                border: dashed 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-variant="dashed"][data-color="info"] {
                border: dashed 1px var(--mjo-color-info);
                color: var(--mjo-color-info);
            }
            button[data-variant="dashed"][data-color="success"] {
                border: dashed 1px var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            button[data-variant="dashed"][data-color="warning"] {
                border: dashed 1px var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            button[data-variant="dashed"][data-color="error"] {
                border: dashed 1px var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            button[data-variant="dashed"]:hover,
            button[data-variant="dashed"][data-color="secondary"]:hover,
            button[data-variant="dashed"][data-color="info"]:hover,
            button[data-variant="dashed"][data-color="warning"]:hover,
            button[data-variant="dashed"][data-color="error"]:hover,
            button[data-variant="dashed"][data-color="success"]:hover {
                background-color: var(--mjo-background-color-high);
            }
            button[data-variant="link"] {
                background-color: transparent;
                border: solid 1px transparent;
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            button[data-variant="link"][data-color="secondary"] {
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-variant="link"][data-color="info"] {
                color: var(--mjo-color-info);
            }
            button[data-variant="link"][data-color="success"] {
                color: var(--mjo-color-success);
            }
            button[data-variant="link"][data-color="warning"] {
                color: var(--mjo-color-warning);
            }
            button[data-variant="link"][data-color="error"] {
                color: var(--mjo-color-error);
            }
            button[data-variant="text"],
            button[data-variant="text"][data-color="secondary"] {
                background-color: transparent;
                border: solid 1px transparent;
                color: currentColor;
            }
            button[data-variant="text"]:hover {
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                background-color: var(--mjo-background-color-high);
            }
            button[data-variant="text"][data-color="secondary"]:hover {
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-variant="text"][data-color="info"]:hover {
                color: var(--mjo-color-info);
            }
            button[data-variant="text"][data-color="success"]:hover {
                color: var(--mjo-color-success);
            }
            button[data-variant="text"][data-color="warning"]:hover {
                color: var(--mjo-color-warning);
            }
            button[data-variant="text"][data-color="error"]:hover {
                color: var(--mjo-color-error);
            }
            :host([disabled]) button,
            :host([loading]) button {
                cursor: not-allowed;
                color: var(--mjo-button-disabled-foreground-color, var(--mjo-disabled-foreground-color, #aaaaaa));
                background-color: var(--mjo-button-disabled-background-color, var(--mjo-disabled-color, #e0e0e0));
                border: solid 1px var(--mjo-button-disabled-background-color, var(--mjo-disabled-color, #e0e0e0));
            }
            :host([loading]) button[data-variant="ghost"] {
                background-color: transparent;
                border: solid 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            :host([loading]) button[data-variant="ghost"][data-color="secondary"] {
                background-color: transparent;
                border: solid 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            :host([loading]) button[data-variant="ghost"][data-color="info"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-info);
                color: var(--mjo-color-info);
            }
            :host([loading]) button[data-variant="ghost"][data-color="success"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            :host([loading]) button[data-variant="ghost"][data-color="warning"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            :host([loading]) button[data-variant="ghost"][data-color="error"] {
                background-color: transparent;
                border: solid 1px var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            :host([loading]) button[data-variant="flat"] {
                background-color: var(--mjo-button-flat-primary-background-color, var(--mjo-primary-color-alpha2, #1d7fdb22));
                color: var(--mjo-button-flat-primary-foreground-color, var(--mjo-primary-foreground-color, #ffffff));
                border: none;
            }
            :host([loading]) button[data-variant="flat"][data-color="secondary"] {
                background-color: var(--mjo-button-flat-secondary-background-color, var(--mjo-secondary-color-alpha2, #cc3d7422));
                color: var(--mjo-button-flat-secondary-foreground-color, var(--mjo-secondary-foreground-color, #ffffff));
                border: none;
            }
            :host([loading]) button[data-variant="flat"][data-color="info"],
            :host([loading]) button[data-variant="flat"][data-color="success"],
            :host([loading]) button[data-variant="flat"][data-color="error"],
            :host([loading]) button[data-variant="flat"][data-color="warning"] {
                background-color: transparent;
                color: white;
                border: none;
            }
            :host([loading]) button[data-variant="flat"][data-color="info"]::before,
            :host([loading]) button[data-variant="flat"][data-color="success"]::before,
            :host([loading]) button[data-variant="flat"][data-color="warning"]::before,
            :host([loading]) button[data-variant="flat"][data-color="error"]::before {
                position: absolute;
                inset: 0;
                content: "";
                z-index: -1;
                opacity: 0.2;
            }
            :host([loading]) button[data-variant="flat"][data-color="info"]::before {
                background-color: var(--mjo-color-info);
            }
            :host([loading]) button[data-variant="flat"][data-color="success"]::before {
                background-color: var(--mjo-color-success);
            }
            :host([loading]) button[data-variant="flat"][data-color="warning"]::before {
                background-color: var(--mjo-color-warning);
            }
            :host([loading]) button[data-variant="flat"][data-color="error"]::before {
                background-color: var(--mjo-color-error);
            }
            :host([loading]) button[data-variant="dashed"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            :host([loading]) button[data-variant="dashed"][data-color="secondary"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            :host([loading]) button[data-variant="dashed"][data-color="info"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-color-info);
                color: var(--mjo-color-info);
            }
            :host([loading]) button[data-variant="dashed"][data-color="success"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            :host([loading]) button[data-variant="dashed"][data-color="warning"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            :host([loading]) button[data-variant="dashed"][data-color="error"] {
                background-color: transparent;
                border: dashed 1px var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            :host([loading]) button[data-variant="link"] {
                background-color: transparent;
                border: solid 1px transparent;
                color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            :host([loading]) button[data-variant="link"][data-color="secondary"] {
                color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            :host([loading]) button[data-variant="link"][data-color="info"] {
                color: var(--mjo-color-info);
            }
            :host([loading]) button[data-variant="link"][data-color="success"] {
                color: var(--mjo-color-success);
            }
            :host([loading]) button[data-variant="link"][data-color="warning"] {
                color: var(--mjo-color-warning);
            }
            :host([loading]) button[data-variant="link"][data-color="error"] {
                color: var(--mjo-color-error);
            }
            :host([loading]) button[data-variant="text"] {
                background-color: transparent;
                border: solid 1px transparent;
                color: currentColor;
            }
            button[data-size="small"] {
                padding: 5px 10px;
                padding: calc(1em / 2 - 3px) calc(1em / 2);
                font-size: 0.8em;
            }
            button[data-size="large"] {
                padding: calc(1em / 2) calc(1em / 2 + 3px);
                font-size: 1.2em;
            }
            button[data-rounded] {
                border-radius: 100%;
                gap: 0;
                padding: 0.7em;
            }
            button[data-rounded]button[data-size="small"] {
                padding: 0.5em;
            }
            button[data-rounded]button[data-size="large"] {
                padding: 0.9em;
            }
            button[data-toggle] {
                box-shadow: inset 0px 0px 20px #333333;
            }
            button mjo-icon,
            button span {
                flex: 0 0 auto;
            }
            button mjo-icon {
                font-size: 1em;
            }
            .loading {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0.2em;
                background-color: var(--mjo-button-primary-color, var(--mjo-primary-color, #1d7fdb));
                animation: loading 1.5s infinite;
            }
            /* Respect user's motion preferences */
            @media (prefers-reduced-motion: reduce) {
                .loading {
                    animation: none;
                    background: repeating-linear-gradient(90deg, transparent, transparent 0.2em, currentColor 0.2em, currentColor 0.4em);
                }
                button {
                    transition: none;
                }
            }
            button[data-color="secondary"] .loading {
                background-color: var(--mjo-button-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            button[data-color="info"] .loading {
                background-color: var(--mjo-color-info);
            }
            button[data-color="success"] .loading {
                background-color: var(--mjo-color-success);
            }
            button[data-color="warning"] .loading {
                background-color: var(--mjo-color-warning);
            }
            button[data-color="error"] .loading {
                background-color: var(--mjo-color-error);
            }
            button[data-size="small"] .loading {
                height: 0.19em;
            }
            button[data-size="large"] .loading {
                height: 0.21em;
            }

            @keyframes loading {
                0% {
                    width: 0%;
                }
                50% {
                    left: 0%;
                    width: 100%;
                }
                100% {
                    left: 100%;
                }
            }
        `];g([s({type:Boolean,reflect:!0})],u.prototype,"fullwidth",2);g([s({type:Boolean,reflect:!0})],u.prototype,"disabled",2);g([s({type:Boolean,reflect:!0})],u.prototype,"loading",2);g([s({type:Boolean,reflect:!0})],u.prototype,"rounded",2);g([s({type:Boolean})],u.prototype,"toggleable",2);g([s({type:Boolean})],u.prototype,"smallCaps",2);g([s({type:Boolean})],u.prototype,"noink",2);g([s({type:String})],u.prototype,"startIcon",2);g([s({type:String})],u.prototype,"endIcon",2);g([s({type:String})],u.prototype,"size",2);g([s({type:String})],u.prototype,"color",2);g([s({type:String})],u.prototype,"variant",2);g([s({type:String})],u.prototype,"type",2);g([s({type:String})],u.prototype,"buttonLabel",2);g([s({type:String})],u.prototype,"describedBy",2);g([io()],u.prototype,"toggle",2);u=g([E("mjo-button")],u);var qa=Object.defineProperty,Na=Object.getOwnPropertyDescriptor,et=(t,o,a,r)=>{for(var e=r>1?void 0:r?Na(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&qa(o,a,e),e};let eo=class extends z(x){constructor(){super(...arguments),this.radius="medium"}render(){return l`<div class="content"><slot></slot></div>`}connectedCallback(){super.connectedCallback(),this.contrast&&this.setAttribute("contrast",this.contrast),this.radius&&this.setAttribute("radius",this.radius)}setContrast(t){this.contrast=t,this.setAttribute("contrast",t)}setRadius(t){this.radius=t,this.setAttribute("radius",t)}};eo.styles=[_`
            :host {
                display: block;
                padding: var(--mjo-card-padding, var(--mjo-space-small));
                box-shadow: var(--mjo-card-box-shadow, var(--mjo-box-shadow-1, inherit));
                background-color: var(--mjo-card-background-color, var(--mjo-background-color-card, white));
            }
            :host([contrast="low"]) {
                background-color: var(--mjo-card-background-color-low, var(--mjo-background-color-card-low, white));
            }
            :host([contrast="high"]) {
                background-color: var(--mjo-card-background-color-high, var(--mjo-background-color-card-high, white));
            }
            :host([radius="small"]) {
                border-radius: var(--mjo-card-radius-small, var(--mjo-radius-small, 4px));
            }
            :host([radius="medium"]) {
                border-radius: var(--mjo-card-radius-medium, var(--mjo-radius-medium, 8px));
            }
            :host([radius="large"]) {
                border-radius: var(--mjo-card-radius-large, var(--mjo-radius-large, 12px));
            }
        `];et([s({type:String,noAccessor:!0})],eo.prototype,"contrast",2);et([s({type:String,noAccessor:!0})],eo.prototype,"radius",2);eo=et([E("mjo-card")],eo);var Ha=Object.defineProperty,Ka=Object.getOwnPropertyDescriptor,C=(t,o,a,r)=>{for(var e=r>1?void 0:r?Ka(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Ha(o,a,e),e},Xa=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)},po=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)},R=(t,o,a)=>(Xa(t,o,"access private method"),a),Vo,Ut,Go,Bt,wo,rt,ro,ko;let y=class extends z(x){constructor(){super(...arguments),po(this,Vo),po(this,Go),po(this,wo),po(this,ro),this.closable=!1,this.clickable=!1,this.disabled=!1,this.color="default",this.label="",this.radius="full",this.size="medium",this.variant="solid"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.clickable&&this.closable?`${this.label}. Clickable chip with close button`:this.clickable?`${this.label}. Click to interact`:this.closable?`${this.label}. Press to close`:`Chip: ${this.label}`}get computedTabIndex(){return this.disabled?-1:this.clickable||this.closable?this.tabIndex??0:-1}render(){return l`<div
            class="container"
            role=${O(this.clickable||this.closable?"button":void 0)}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${O(this.ariaDescribedby)}
            aria-disabled=${this.disabled?"true":"false"}
            tabindex=${this.computedTabIndex}
            data-color=${this.color}
            data-size=${this.size}
            data-variant=${this.variant}
            data-radius=${this.radius}
            ?data-closable=${this.closable}
            ?data-clickable=${this.clickable}
            ?data-disabled=${this.disabled}
            @click=${R(this,wo,rt)}
            @keydown=${R(this,Vo,Ut)}
        >
            ${this.variant==="dot"?l`<span class="dot"></span>`:w}
            ${this.startIcon?l`<mjo-icon src=${this.startIcon}></mjo-icon>`:w}
            <mjo-typography tag="span" class="label">${this.label}</mjo-typography>
            ${this.endIcon?l`<mjo-icon src=${this.endIcon}></mjo-icon>`:w}
            ${this.closable?l`<mjo-icon
                      class="close"
                      src=${ft}
                      @click=${R(this,ro,ko)}
                      @keydown=${R(this,Go,Bt)}
                      role="button"
                      tabindex=${this.disabled?"-1":"0"}
                      aria-label="Close ${this.label}"
                  ></mjo-icon>`:w}
        </div>`}};Vo=new WeakSet;Ut=function(t){this.disabled||(t.key==="Escape"&&this.closable&&(t.preventDefault(),R(this,ro,ko).call(this,t)),(t.key==="Enter"||t.key===" ")&&this.clickable&&(t.preventDefault(),R(this,wo,rt).call(this)))};Go=new WeakSet;Bt=function(t){this.disabled||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),t.stopPropagation(),R(this,ro,ko).call(this,t))};wo=new WeakSet;rt=async function(){!this.clickable||this.disabled||(this.dispatchEvent(new CustomEvent("mjo-chip-click",{bubbles:!0,composed:!0,detail:{value:this.value||this.label}})),this.container&&(this.container.style.transform="scale(0.95)",await K(100),this.container.style.transform="scale(1.02)",await K(150),this.container.removeAttribute("style")))};ro=new WeakSet;ko=function(t){this.disabled||(t&&t.stopPropagation(),this.dispatchEvent(new CustomEvent("mjo-chip-close",{bubbles:!0,composed:!0,detail:{value:this.value||this.label}})),this.remove())};y.styles=[_`
            :host {
                display: inline-flex;
            }
            .container {
                position: relative;
                background-color: var(--mjo-color-gray-400);
                color: var(--mjo-color-white);
                border-radius: 9999px;
                font-size: var(--mjo-chip-font-size-medium-size, 0.9em);
                line-height: var(--mjo-chip-line-height-medium-size, 1em);
                height: 1.6em;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                padding: var(--mjo-chip-padding, 0 0.75em);
                gap: var(--mjo-chip-gap, 0.4em);
            }
            .dot {
                width: 0.9em;
                height: 0.9em;
                border-radius: 9999px;
                background-color: var(--mjo-color-gray-400);
                flex-grow: 0;
                flex-basis: auto;
            }
            mjo-icon {
                font-size: 1em;
                flex-grow: 0;
                flex-basis: auto;
            }
            mjo-icon.close {
                cursor: pointer;
                transition: opacity 0.2s;
            }
            mjo-icon.close:hover {
                opacity: 0.8;
            }
            .label {
                flex-grow: 1;
                flex-basis: 0;
                white-space: nowrap;
            }
            .container[data-closable] {
                padding-right: 0.25em;
            }
            .container[data-color="primary"] {
                background-color: var(--mjo-primary-color);
                color: var(--mjo-primary-foreground-color);
            }
            .container[data-color="secondary"] {
                background-color: var(--mjo-secondary-color);
                color: var(--mjo-secondary-foreground-color);
            }
            .container[data-color="success"] {
                background-color: var(--mjo-color-success);
                color: var(--mjo-color-white);
            }
            .container[data-color="warning"] {
                background-color: var(--mjo-color-warning);
                color: var(--mjo-color-white);
            }
            .container[data-color="info"] {
                background-color: var(--mjo-color-info);
                color: var(--mjo-color-white);
            }
            .container[data-color="error"] {
                background-color: var(--mjo-color-error);
                color: var(--mjo-color-white);
            }
            .container[data-color="default"] mjo-icon.close {
                color: var(--mjo-color-gray-800);
            }
            .container[data-color="primary"] mjo-icon.close {
                color: var(--mjo-primary-color-300, var(--mjo-secondary-foreground-color));
            }
            .container[data-color="secondary"] mjo-icon.close {
                color: var(--mjo-secondary-color-300, var(--mjo-secondary-foreground-color));
            }
            .container[data-color="success"] mjo-icon.close {
                color: #ace4a3;
            }
            .container[data-color="warning"] mjo-icon.close {
                color: #e6d6a2;
            }
            .container[data-color="info"] mjo-icon.close {
                color: #94bedf;
            }
            .container[data-color="error"] mjo-icon.close {
                color: #e29aa2;
            }
            .container[data-radius="none"] {
                border-radius: 0px;
            }
            .container[data-radius="small"] {
                border-radius: 5px;
            }
            .container[data-radius="medium"] {
                border-radius: 10px;
            }
            .container[data-radius="large"] {
                border-radius: 20px;
            }
            .container[data-size="small"] {
                font-size: var(--mjo-chip-font-size-small-size, 0.75em);
                line-height: var(--mjo-chip-line-height-small-size, 0.75em);
                height: 1.5em;
            }
            .container[data-size="large"] {
                font-size: var(--mjo-chip-font-size-large-size, 1.1em);
                line-height: var(--mjo-chip-line-height-large-size, 1.2em);
                height: 1.8em;
            }
            .container[data-variant="bordered"] {
                background-color: transparent;
                border-style: solid;
                border-width: var(--mjo-chip-border-width-size-medium, 2px);
                border-color: var(--mjo-color-gray-400);
                color: var(--mjo-color-gray-400);
            }
            .container[data-variant="bordered"][data-size="small"] {
                border-width: var(--mjo-chip-border-width-size-small, 1px);
            }
            .container[data-variant="bordered"][data-size="large"] {
                border-width: var(--mjo-chip-border-width-size-large, 3px);
            }
            .container[data-variant="bordered"][data-color="primary"] {
                border-color: var(--mjo-primary-color);
                color: var(--mjo-primary-color);
            }
            .container[data-variant="bordered"][data-color="secondary"] {
                border-color: var(--mjo-secondary-color);
                color: var(--mjo-secondary-color);
            }
            .container[data-variant="bordered"][data-color="success"] {
                border-color: var(--mjo-color-success);
                color: var(--mjo-color-success);
            }
            .container[data-variant="bordered"][data-color="warning"] {
                border-color: var(--mjo-color-warning);
                color: var(--mjo-color-warning);
            }
            .container[data-variant="bordered"][data-color="info"] {
                border-color: var(--mjo-color-info);
                color: var(--mjo-color-info);
            }
            .container[data-variant="bordered"][data-color="error"] {
                border-color: var(--mjo-color-error);
                color: var(--mjo-color-error);
            }
            .container[data-variant="light"] {
                background-color: transparent;
                color: var(--mjo-color-gray-400);
            }
            .container[data-variant="light"][data-color="primary"] {
                color: var(--mjo-primary-color);
            }
            .container[data-variant="light"][data-color="secondary"] {
                color: var(--mjo-secondary-color);
            }
            .container[data-variant="light"][data-color="success"] {
                color: var(--mjo-color-success);
            }
            .container[data-variant="light"][data-color="warning"] {
                color: var(--mjo-color-warning);
            }
            .container[data-variant="light"][data-color="info"] {
                color: var(--mjo-color-info);
            }
            .container[data-variant="light"][data-color="error"] {
                color: var(--mjo-color-error);
            }
            .container[data-variant="flat"] {
                background-color: var(--mjo-color-gray-alpha2);
                color: var(--mjo-color-gray-600);
            }
            .container[data-variant="flat"][data-color="primary"] {
                background-color: var(--mjo-primary-color-alpha2);
                color: var(--mjo-primary-color);
            }
            .container[data-variant="flat"][data-color="secondary"] {
                background-color: var(--mjo-secondary-color-alpha2);
                color: var(--mjo-secondary-color);
            }
            .container[data-variant="flat"][data-color="success"] {
                background-color: var(--mjo-color-green-alpha2);
                color: var(--mjo-color-success);
            }
            .container[data-variant="flat"][data-color="warning"] {
                background-color: var(--mjo-color-orange-alpha2);
                color: var(--mjo-color-warning);
            }
            .container[data-variant="flat"][data-color="info"] {
                background-color: var(--mjo-color-blue-alpha2);
                color: var(--mjo-color-info);
            }
            .container[data-variant="flat"][data-color="error"] {
                background-color: var(--mjo-color-red-alpha2);
                color: var(--mjo-color-error);
            }
            .container[data-variant="faded"] {
                background-color: var(--mjo-background-color-card);
                border-style: solid;
                border-width: 2px;
                border-color: var(--mjo-foreground-color);
                color: var(--mjo-foreground-color);
            }
            .container[data-variant="faded"][data-color="primary"] {
                color: var(--mjo-primary-color);
            }
            .container[data-variant="faded"][data-color="secondary"] {
                color: var(--mjo-secondary-color);
            }
            .container[data-variant="faded"][data-color="success"] {
                color: var(--mjo-color-success);
            }
            .container[data-variant="faded"][data-color="warning"] {
                color: var(--mjo-color-warning);
            }
            .container[data-variant="faded"][data-color="info"] {
                color: var(--mjo-color-info);
            }
            .container[data-variant="faded"][data-color="error"] {
                color: var(--mjo-color-error);
            }
            .container[data-variant="shadow"] {
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
            }
            .container[data-variant="shadow"][data-color="primary"] {
                box-shadow: 0px 2px 5px var(--mjo-primary-color-alpha5);
            }
            .container[data-variant="shadow"][data-color="secondary"] {
                box-shadow: 0px 2px 5px var(--mjo-secondary-color-alpha5);
            }
            .container[data-variant="shadow"][data-color="success"] {
                box-shadow: 0px 2px 5px var(--mjo-color-green-alpha3);
            }
            .container[data-variant="shadow"][data-color="warning"] {
                color: var(--mjo-color-black);
                box-shadow: 0px 2px 5px var(--mjo-color-orange-alpha5);
            }
            .container[data-variant="shadow"][data-color="info"] {
                box-shadow: 0px 2px 5px var(--mjo-color-blue-alpha5);
            }
            .container[data-variant="shadow"][data-color="error"] {
                box-shadow: 0px 2px 5px var(--mjo-color-red-alpha5);
            }
            .container[data-variant="dot"] {
                border-style: solid;
                border-width: 2px;
                border-color: var(--mjo-foreground-color);
                background-color: transparent;
                color: var(--mjo-foreground-color);
            }
            .container[data-variant="dot"][data-size="small"] .dot {
                width: 0.75em;
                height: 0.75em;
            }
            .container[data-variant="dot"][data-size="large"] .dot {
                width: 1.1em;
                height: 1.1em;
            }
            .container[data-variant="dot"][data-color="primary"] .dot {
                background-color: var(--mjo-primary-color);
            }
            .container[data-variant="dot"][data-color="secondary"] .dot {
                background-color: var(--mjo-secondary-color);
            }
            .container[data-variant="dot"][data-color="success"] .dot {
                background-color: var(--mjo-color-success);
            }
            .container[data-variant="dot"][data-color="warning"] .dot {
                background-color: var(--mjo-color-warning);
            }
            .container[data-variant="dot"][data-color="info"] .dot {
                background-color: var(--mjo-color-info);
            }
            .container[data-variant="dot"][data-color="error"] .dot {
                background-color: var(--mjo-color-error);
            }
            .container[data-disabled] {
                opacity: 0.5;
                pointer-events: none;
            }

            /* Accessibility and interaction styles */
            .container[data-clickable] {
                cursor: pointer;
                transition: transform 0.2s ease-in-out;
            }
            .container[data-clickable]:hover:not([data-disabled]) {
                transform: scale(1.02);
            }
            .container:focus-visible {
                outline: 2px solid var(--mjo-primary-color, #005fcc);
                outline-offset: 2px;
            }
            .container[data-clickable]:focus-visible {
                outline: 2px solid var(--mjo-primary-color, #005fcc);
                outline-offset: 2px;
            }

            /* Close button improvements */
            mjo-icon.close {
                cursor: pointer;
                transition: opacity 0.2s ease;
            }
            mjo-icon.close:hover:not([aria-disabled="true"]) {
                opacity: 0.8;
            }
            mjo-icon.close:focus-visible {
                outline: 2px solid var(--mjo-primary-color, #005fcc);
                outline-offset: 1px;
                border-radius: 2px;
            }
        `];C([s({type:Boolean})],y.prototype,"closable",2);C([s({type:Boolean})],y.prototype,"clickable",2);C([s({type:Boolean})],y.prototype,"disabled",2);C([s({type:String})],y.prototype,"color",2);C([s({type:String})],y.prototype,"endIcon",2);C([s({type:String})],y.prototype,"label",2);C([s({type:String})],y.prototype,"radius",2);C([s({type:String})],y.prototype,"size",2);C([s({type:String})],y.prototype,"startIcon",2);C([s({type:String})],y.prototype,"value",2);C([s({type:String})],y.prototype,"variant",2);C([s({type:String,attribute:"aria-describedby"})],y.prototype,"ariaDescribedby",2);C([L(".container")],y.prototype,"container",2);y=C([E("mjo-chip")],y);const Va={radiusLarge:"10px",radiusMedium:"5px",radiusSmall:"3px",fontSizeLarge:"1.5em",fontSizeXlarge:"1.75em",fontSizeXxlarge:"2em",fontSizeMedium:"1em",fontSizeSmall:"0.8em",fontSizeXsmall:"0.6em",fontSizeXxsmall:"0.4em",fontWeightBold:"700",fontWeightLight:"300",fontWeightRegular:"400",spaceXxsmall:"3px",spaceXsmall:"6px",spaceSmall:"8px",spaceMedium:"16px",spaceLarge:"24px",spaceXlarge:"32px",spaceXxlarge:"40px",colors:{white:"#ffffff",black:"#000000",warning:"#ff9800",success:"#4caf50",error:"#f44336",info:"#128ada",blue:{default:"#1d7fdb",alpha0:"#e3f2fd00",alpha1:"#e3f2fd11",alpha2:"#e3f2fd22",alpha3:"#e3f2fd33",alpha4:"#e3f2fd44",alpha5:"#e3f2fd55",alpha6:"#e3f2fd66",alpha7:"#e3f2fd77",alpha8:"#e3f2fd88",alpha9:"#e3f2fd99",50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#1d7fdb",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1"},cyan:{default:"#00bcd4",alpha0:"#00bcd400",alpha1:"#00bcd411",alpha2:"#00bcd422",alpha3:"#00bcd433",alpha4:"#00bcd444",alpha5:"#00bcd455",alpha6:"#00bcd466",alpha7:"#00bcd477",alpha8:"#00bcd488",alpha9:"#00bcd499",50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064"},green:{default:"#4caf50",alpha0:"#4caf5000",alpha1:"#4caf5011",alpha2:"#4caf5022",alpha3:"#4caf5033",alpha4:"#4caf5044",alpha5:"#4caf5055",alpha6:"#4caf5066",alpha7:"#4caf5077",alpha8:"#4caf5088",alpha9:"#4caf5099",50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"},purple:{default:"#9c27b0",alpha0:"#9c27b000",alpha1:"#9c27b011",alpha2:"#9c27b022",alpha3:"#9c27b033",alpha4:"#9c27b044",alpha5:"#9c27b055",alpha6:"#9c27b066",alpha7:"#9c27b077",alpha8:"#9c27b088",alpha9:"#9c27b099",50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c"},red:{default:"#f44336",alpha0:"#f4433600",alpha1:"#f4433611",alpha2:"#f4433622",alpha3:"#f4433633",alpha4:"#f4433644",alpha5:"#f4433655",alpha6:"#f4433666",alpha7:"#f4433677",alpha8:"#f4433688",alpha9:"#f4433699",50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c"},yellow:{default:"#ffeb3b",alpha0:"#ffeb3b00",alpha1:"#ffeb3b11",alpha2:"#ffeb3b22",alpha3:"#ffeb3b33",alpha4:"#ffeb3b44",alpha5:"#ffeb3b55",alpha6:"#ffeb3b66",alpha7:"#ffeb3b77",alpha8:"#ffeb3b88",alpha9:"#ffeb3b99",50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17"},pink:{default:"#e91e63",alpha0:"#e91e6300",alpha1:"#e91e6311",alpha2:"#e91e6322",alpha3:"#e91e6333",alpha4:"#e91e6344",alpha5:"#e91e6355",alpha6:"#e91e6366",alpha7:"#e91e6377",alpha8:"#e91e6388",alpha9:"#e91e6399",50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f"},gray:{default:"#71717A",alpha0:"#71717A00",alpha1:"#71717A11",alpha2:"#71717A22",alpha3:"#71717A33",alpha4:"#71717A44",alpha5:"#71717A55",alpha6:"#71717A66",alpha7:"#71717A77",alpha8:"#71717A88",alpha9:"#71717A99",50:"#FAFAFA",100:"#F4F4F5",200:"#E4E4E7",300:"#D4D4D8",400:"#A1A1AA",500:"#71717A",600:"#52525B",700:"#3F3F46",800:"#27272A",900:"#18181B"}},dark:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#555555",low:"#444444",xlow:"#222222",high:"#666666",xhigh:"#888888"},backgroundColor:{hover:"#666666",default:"#151515",xlow:"#030303",low:"#111111",high:"#252525",xhigh:"#444444"},backgroundColorCard:{default:"#333333",xlow:"#111111",low:"#222222",high:"#555555",xhigh:"#666666"},foregroundColor:{default:"#f0f0f0",xlow:"#999999",low:"#bbbbbb",high:"#ffffff",xhigh:"#ffffff"}},light:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#dddddd",xlow:"#aaaaaa",low:"#cccccc",high:"#eeeeee",xhigh:"#f0f0f0"},backgroundColor:{hover:"#eeeeee",default:"#efefef",xlow:"#cccccc",low:"#dddddd",high:"#f6f6f6",xhigh:"#ffffff"},backgroundColorCard:{default:"#fafafa",xlow:"#ffffff",low:"#ffffff",high:"#e6e6e6",xhigh:"#dddddd"},foregroundColor:{default:"#333333",xlow:"#999999",low:"#666666",high:"#151515",xhigh:"#000000"}}},Lt=({config:t,prefix:o="--mjo-",themeMode:a="dark"})=>{let r="";for(const e in t){const n=t[e];if((e==="dark"||e==="light")&&a!==e)continue;if(e==="colors"){r+=Ga(n);continue}if(typeof n=="object"&&n.default){r+=Ft(n,`${o}${G(e)}`);continue}if(e==="components"){r+=Ja(n);continue}if(typeof n=="object"){r+=Lt({config:n,themeMode:a});continue}const i=`${o}${G(e)}`;r+=`${i}: ${n};`}return r},It=(t,o)=>{for(const a in o)typeof o[a]=="object"&&t[a]?It(t[a],o[a]):t[a]=o[a]},Ga=t=>{let o="";for(const a in t){const r=t[a];typeof r=="object"?o+=Ft(r,`--mjo-color-${G(a)}`):o+=`--mjo-color-${a}: ${r};`}return o},Ft=(t,o)=>{let a="";for(const r in t){let e=`${o}-${G(r)}`;r==="default"&&(e=`${o}`),a+=`${e}: ${t[r]};`}return a},Ja=t=>{let o="";for(const a in t){const r=t[a];for(const e in r){const n=r[e];o+=`--${G(a)}-${G(e)}: ${n};`}}return o},G=t=>t.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase();var Za=Object.defineProperty,Qa=Object.getOwnPropertyDescriptor,Co=(t,o,a,r)=>{for(var e=r>1?void 0:r?Qa(o,a):o,n=t.length-1,i;n>=0;n--)(i=t[n])&&(e=(r?i(o,a,e):i(e))||e);return r&&e&&Za(o,a,e),e},Wt=(t,o,a)=>{if(!o.has(t))throw TypeError("Cannot "+a)},Ya=(t,o,a)=>(Wt(t,o,"read from private field"),a?a.call(t):o.get(t)),oe=(t,o,a)=>{if(o.has(t))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(t):o.set(t,a)},te=(t,o,a,r)=>(Wt(t,o,"write to private field"),r?r.call(t,a):o.set(t,a),a),bo;let J=class extends x{constructor(){super(...arguments),this.theme="light",this.scope="local",this.config={},oe(this,bo,!0)}render(){return te(this,bo,!1),l`<slot></slot>`}connectedCallback(){super.connectedCallback(),W.get("mjo-theme")?W.get("mjo-theme")!==this.theme&&(this.theme=W.get("mjo-theme")):W.set("mjo-theme",this.theme,{expires:365}),this.applyTheme()}updated(t){t.has("theme")&&t.get("theme")&&t.get("theme")!==this.theme&&(Ya(this,bo)||W.set("mjo-theme",this.theme,{expires:365}),this.applyTheme())}applyTheme(){var r,e;const t=structuredClone(Va);It(t,this.config);let o=this.scope==="global"?":root {":":host {";o+=Lt({config:t,themeMode:this.theme}),o+="}";let a;this.scope==="global"?(a=document.querySelector("#mjo-theme"),a||(a=document.createElement("style"),a.setAttribute("id","mjo-theme"),document.head.appendChild(a))):(a=(r=this.shadowRoot)==null?void 0:r.querySelector("#mjo-theme"),a||(a=document.createElement("style"),a.setAttribute("id","mjo-theme"),(e=this.shadowRoot)==null||e.appendChild(a))),a.innerHTML=o,this.dispatchEvent(new CustomEvent("mjo-theme-change",{detail:{theme:this.theme}}))}};bo=new WeakMap;J.styles=[_`
            :host {
                display: block;
            }
        `];Co([s({type:String})],J.prototype,"theme",2);Co([s({type:String})],J.prototype,"scope",2);Co([s({type:Object})],J.prototype,"config",2);J=Co([E("mjo-theme")],J);function qt(t=1){const o=document.querySelector("mjo-theme");if(!o){if(t>5){console.error("Failed to find mjo-theme component");return}setTimeout(()=>{qt(t+1)},100);return}let a=W.get("mjo-theme");o&&!a?a=o.theme||"light":a||(a="light");const r=document.querySelector(".theme-toggle");r&&(r.textContent=a==="dark"?"☀️":"🌙"),o.addEventListener("mjo-theme-change",e=>{const n=e.detail.theme;r&&(r.textContent=n==="dark"?"☀️":"🌙")})}window.toggleTheme=function(){const t=document.querySelector("mjo-theme");if(t){const a=t.theme==="light"?"dark":"light";t.theme=a}else console.warn("⚠️ mjo-theme component not found")};document.addEventListener("DOMContentLoaded",()=>{qt()});
//# sourceMappingURL=client.js.map
