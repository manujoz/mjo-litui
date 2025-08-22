var Mi=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)};var Oe=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)};var fe=(t,e,a)=>(Mi(t,e,"access private method"),a);import{Q as Ei,R as Qa,D as v,i as er,t as tr,e as ar,k as c}from"./lit-core.js";import{e as zi,l as Ai,m as Oi,n as eo,o as or,p as Ti,q as Pi,r as Wi}from"./index.js";/*! js-cookie v3.0.5 | MIT */function nt(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)t[r]=a[r]}return t}var Fi={read:function(t){return t[0]==='"'&&(t=t.slice(1,-1)),t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(t){return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function aa(t,e){function a(o,i,n){if(!(typeof document>"u")){n=nt({},e,n),typeof n.expires=="number"&&(n.expires=new Date(Date.now()+n.expires*864e5)),n.expires&&(n.expires=n.expires.toUTCString()),o=encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var u="";for(var d in n)n[d]&&(u+="; "+d,n[d]!==!0&&(u+="="+n[d].split(";")[0]));return document.cookie=o+"="+t.write(i,o)+u}}function r(o){if(!(typeof document>"u"||arguments.length&&!o)){for(var i=document.cookie?document.cookie.split("; "):[],n={},u=0;u<i.length;u++){var d=i[u].split("="),b=d.slice(1).join("=");try{var I=decodeURIComponent(d[0]);if(n[I]=t.read(b,I),o===I)break}catch{}}return o?n[o]:n}}return Object.create({set:a,get:r,remove:function(o,i){a(o,"",nt({},i,{expires:-1}))},withAttributes:function(o){return aa(this.converter,nt({},this.attributes,o))},withConverter:function(o){return aa(nt({},this.converter,o),this.attributes)}},{attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(t)}})}var be=aa(Fi,{path:"/"});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=globalThis,to=bt.ShadowRoot&&(bt.ShadyCSS===void 0||bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ao=Symbol(),Jo=new WeakMap;let rr=class{constructor(e,a,r){if(this._$cssResult$=!0,r!==ao)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(to&&e===void 0){const r=a!==void 0&&a.length===1;r&&(e=Jo.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Jo.set(a,e))}return e}toString(){return this.cssText}};const Li=t=>new rr(typeof t=="string"?t:t+"",void 0,ao),S=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((r,o,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new rr(a,t,ao)},Ri=(t,e)=>{if(to)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const r=document.createElement("style"),o=bt.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=a.cssText,t.appendChild(r)}},qo=to?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const r of e.cssRules)a+=r.cssText;return Li(a)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Yi,defineProperty:Ni,getOwnPropertyDescriptor:Bi,getOwnPropertyNames:Ii,getOwnPropertySymbols:Ui,getPrototypeOf:Hi}=Object,te=globalThis,Ko=te.trustedTypes,Ji=Ko?Ko.emptyScript:"",Zt=te.reactiveElementPolyfillSupport,Ue=(t,e)=>t,St={toAttribute(t,e){switch(e){case Boolean:t=t?Ji:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},oo=(t,e)=>!Yi(t,e),Vo={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:oo};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),te.litPropertyMetadata??(te.litPropertyMetadata=new WeakMap);class ve extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=Vo){if(a.state&&(a.attribute=!1),this._$Ei(),this.elementProperties.set(e,a),!a.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,a);o!==void 0&&Ni(this.prototype,e,o)}}static getPropertyDescriptor(e,a,r){const{get:o,set:i}=Bi(this.prototype,e)??{get(){return this[a]},set(n){this[a]=n}};return{get(){return o==null?void 0:o.call(this)},set(n){const u=o==null?void 0:o.call(this);i.call(this,n),this.requestUpdate(e,u,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Vo}static _$Ei(){if(this.hasOwnProperty(Ue("elementProperties")))return;const e=Hi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ue("properties"))){const a=this.properties,r=[...Ii(a),...Ui(a)];for(const o of r)this.createProperty(o,a[o])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[r,o]of a)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[a,r]of this.elementProperties){const o=this._$Eu(a,r);o!==void 0&&this._$Eh.set(o,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)a.unshift(qo(o))}else e!==void 0&&a.push(qo(e));return a}static _$Eu(e,a){const r=a.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const r of a.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ri(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var r;return(r=a.hostConnected)==null?void 0:r.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var r;return(r=a.hostDisconnected)==null?void 0:r.call(a)})}attributeChangedCallback(e,a,r){this._$AK(e,r)}_$EC(e,a){var i;const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const n=(((i=r.converter)==null?void 0:i.toAttribute)!==void 0?r.converter:St).toAttribute(a,r.type);this._$Em=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,a){var i;const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const n=r.getPropertyOptions(o),u=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)==null?void 0:i.fromAttribute)!==void 0?n.converter:St;this._$Em=o,this[o]=u.fromAttribute(a,n.type),this._$Em=null}}requestUpdate(e,a,r){if(e!==void 0){if(r??(r=this.constructor.getPropertyOptions(e)),!(r.hasChanged??oo)(this[e],a))return;this.P(e,a,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,a,r){this._$AL.has(e)||this._$AL.set(e,a),r.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,n]of o)n.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],n)}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(r=this._$EO)==null||r.forEach(o=>{var i;return(i=o.hostUpdate)==null?void 0:i.call(o)}),this.update(a)):this._$EU()}catch(o){throw e=!1,this._$EU(),o}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(r=>{var o;return(o=r.hostUpdated)==null?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(a=>this._$EC(a,this[a]))),this._$EU()}updated(e){}firstUpdated(e){}}ve.elementStyles=[],ve.shadowRootOptions={mode:"open"},ve[Ue("elementProperties")]=new Map,ve[Ue("finalized")]=new Map,Zt==null||Zt({ReactiveElement:ve}),(te.reactiveElementVersions??(te.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class y extends ve{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.o=Ei(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.o)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.o)==null||e.setConnected(!1)}render(){return Qa}}var Qo;y._$litElement$=!0,y.finalized=!0,(Qo=globalThis.litElementHydrateSupport)==null||Qo.call(globalThis,{LitElement:y});const Qt=globalThis.litElementPolyfillSupport;Qt==null||Qt({LitElement:y});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=t=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qi={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:oo},Ki=(t=qi,e,a)=>{const{kind:r,metadata:o}=a;let i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),i.set(a.name,t),r==="accessor"){const{name:n}=a;return{set(u){const d=e.get.call(this);e.set.call(this,u),this.requestUpdate(n,d,t)},init(u){return u!==void 0&&this.P(n,void 0,t),u}}}if(r==="setter"){const{name:n}=a;return function(u){const d=this[n];e.call(this,u),this.requestUpdate(n,d,t)}}throw Error("Unsupported decorator location: "+r)};function s(t){return(e,a)=>typeof a=="object"?Ki(t,e,a):((r,o,i)=>{const n=o.hasOwnProperty(i);return o.constructor.createProperty(i,n?{...r,wrapped:!0}:r),n?Object.getOwnPropertyDescriptor(o,i):void 0})(t,e,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(t){return s({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Go=(t,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,a),a);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function X(t,e){return(a,r,o)=>{const i=n=>{var u;return((u=n.renderRoot)==null?void 0:u.querySelector(t))??null};if(e){const{get:n,set:u}=typeof r=="object"?a:o??(()=>{const d=Symbol();return{get(){return this[d]},set(b){this[d]=b}}})();return Go(a,r,{get(){let d=n.call(this);return d===void 0&&(d=i(this),(d!==null||this.hasUpdated)&&u.call(this,d)),d}})}return Go(a,r,{get(){return i(this)}})}}var Vi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,Xi=(t,e,a,r)=>{for(var o=r>1?void 0:r?Gi(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Vi(e,a,o),o};const J=t=>{var a,ir,o,oa;class e extends t{constructor(){super(...arguments);Oe(this,a);Oe(this,o);this.cssStyles=""}connectedCallback(){super.connectedCallback(),this.theme&&fe(this,a,ir).call(this)}}return a=new WeakSet,ir=function(){var I,Z;const d=this.tagName.toLowerCase();for(const it in this.theme){const Xt=this.theme[it];this.cssStyles+=`--${fe(this,o,oa).call(this,d)}-${fe(this,o,oa).call(this,it)}: ${Xt};`}let b=(I=this.shadowRoot)==null?void 0:I.querySelector("#mjo-theme");b||(b=document.createElement("style"),b.setAttribute("id","mjo-theme"),(Z=this.shadowRoot)==null||Z.appendChild(b)),b.innerHTML=`:host {${this.cssStyles}}`},o=new WeakSet,oa=function(d){return d.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()},Xi([s({type:Object})],e.prototype,"theme",2),e};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=t=>t??v;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ra extends er{constructor(e){if(super(e),this.it=v,e.type!==tr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===v||e==null)return this._t=void 0,this.it=e;if(e===Qa)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const a=[e];return a.raw=a,this._t={_$litType$:this.constructor.resultType,strings:a,values:[]}}}ra.directiveName="unsafeHTML",ra.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ia extends ra{}ia.directiveName="unsafeSVG",ia.resultType=2;const Zi=ar(ia);var Qi=Object.defineProperty,en=Object.getOwnPropertyDescriptor,nr=(t,e,a,r)=>{for(var o=r>1?void 0:r?en(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Qi(e,a,o),o};let Dt=class extends J(y){render(){return this.src?c`${Zi(this.src)}`:v}};Dt.styles=[S`
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
        `];nr([s({type:String})],Dt.prototype,"src",2);Dt=nr([D("mjo-icon")],Dt);const De=async t=>new Promise(e=>setTimeout(e,t));var tn=Object.defineProperty,an=Object.getOwnPropertyDescriptor,F=(t,e,a,r)=>{for(var o=r>1?void 0:r?an(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&tn(e,a,o),o},sr=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},Te=(t,e,a)=>(sr(t,e,"read from private field"),a?a.call(t):e.get(t)),re=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},se=(t,e,a)=>(sr(t,e,"access private method"),a),ye,na,sa,lr,la,cr,vt,ca,_t,da,ha,dr;let M=class extends J(y){constructor(){super(...arguments),re(this,sa),re(this,la),re(this,vt),re(this,_t),re(this,ha),this.itemTitle="",this.itemSubtitle="",this.expanded=!1,this.disabled=!1,this.compact=!1,this.icon=zi,this.animationDuration=300,this.animationEasing="ease-in-out",this.variant="light",re(this,ye,`accordion-item-${Math.random().toString(36).substring(2,15)}`),re(this,na,t=>{if(this.disabled)return;const{key:e}=t;e==="Enter"||e===" "?(t.preventDefault(),se(this,vt,ca).call(this)):e==="ArrowUp"||e==="ArrowDown"?(t.preventDefault(),se(this,sa,lr).call(this,e==="ArrowUp"?"previous":"next")):e==="Home"||e==="End"?(t.preventDefault(),se(this,la,cr).call(this,e==="Home"?"first":"last")):e==="Escape"&&this.expanded&&(t.preventDefault(),this.close())})}get computedAriaLabel(){return typeof this.itemTitle=="string"?`Toggle ${this.itemTitle}`:"Toggle accordion section"}render(){return c`
            <div class="container" data-variant=${this.variant} ?data-compact=${this.compact} ?data-disabled=${this.disabled}>
                <div
                    class="titleContainer"
                    role="button"
                    tabindex=${this.disabled?-1:0}
                    aria-expanded=${this.expanded}
                    aria-controls=${`${Te(this,ye)}-content`}
                    aria-label=${this.computedAriaLabel}
                    aria-describedby=${R(this.ariaDescribedby)}
                    aria-disabled=${this.disabled}
                    @click=${se(this,vt,ca)}
                    @keydown=${Te(this,na)}
                >
                    <div class="titleContent" id=${`${Te(this,ye)}-title`}>
                        ${typeof this.itemTitle=="string"?c`
                                  <mjo-typography class="title" tag="h3" size="heading3" weight="medium">${this.itemTitle}</mjo-typography>
                                  ${this.itemSubtitle?c`<mjo-typography class="subtitle" tag="p" size="body1" weight="medium"> ${this.itemSubtitle} </mjo-typography>`:v}
                              `:this.itemTitle}
                    </div>
                    <div class="iconContainer">
                        <mjo-icon src=${this.icon}></mjo-icon>
                    </div>
                </div>
                <div class="content" id=${`${Te(this,ye)}-content`} role="region" aria-labelledby=${`${Te(this,ye)}-title`}>
                    <slot></slot>
                </div>
            </div>
        `}updated(t){t.has("expanded")&&(this.expanded?se(this,_t,da).call(this):se(this,ha,dr).call(this)),t.has("disabled")&&this.disabled&&this.close()}setCompact(t){this.compact=t}open(){this.expanded=!0}close(){this.expanded=!1}toggle(){this.expanded=!this.expanded}focus(){var t;(t=this.titleContainerEl)==null||t.focus()}};ye=new WeakMap;na=new WeakMap;sa=new WeakSet;lr=function(t){const e=this.closest("mjo-accordion");if(!e)return;const a=Array.from(e.querySelectorAll("mjo-accordion-item")),r=a.indexOf(this),o=t==="previous"?r-1:r+1,i=a[o];i&&!i.disabled&&i.focus()};la=new WeakSet;cr=function(t){const e=this.closest("mjo-accordion");if(!e)return;const a=Array.from(e.querySelectorAll("mjo-accordion-item")),r=t==="first"?a[0]:a[a.length-1];r&&!r.disabled&&r.focus()};vt=new WeakSet;ca=function(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("mjo-accordion-toggle",{detail:{item:this,expanded:this.expanded}}))};_t=new WeakSet;da=async function(t=0){if(this.disabled)return;const e=this.contentEl.scrollHeight;if(e===0){if(t===10)return;setTimeout(()=>{se(this,_t,da).call(this,t+1)},50);return}const a=new CustomEvent("mjo-accordion-will-expand",{detail:{item:this,expanded:!0},cancelable:!0});this.dispatchEvent(a)&&(this.contentEl.style.transition=`
            max-height ${this.animationDuration}ms ${this.animationEasing},
            opacity ${this.animationDuration}ms ${this.animationEasing}
        `,this.iconEl.style.transition=`transform ${this.animationDuration}ms ${this.animationEasing}`,this.containerEl.style.paddingBottom="var(--mjo-accordion-item-content-padding, var(--mjo-space-medium))",this.contentEl.style.maxHeight=`${e}px`,this.contentEl.style.opacity="1",this.iconEl.style.transform="rotate(90deg)",await De(this.animationDuration),this.dispatchEvent(new CustomEvent("mjo-accordion-expanded",{detail:{item:this,expanded:this.expanded}})))};ha=new WeakSet;dr=async function(){const t=new CustomEvent("mjo-accordion-will-collapse",{detail:{item:this,expanded:!1},cancelable:!0});this.dispatchEvent(t)&&(this.containerEl.removeAttribute("style"),this.contentEl.removeAttribute("style"),this.iconEl.removeAttribute("style"),await De(this.animationDuration),this.dispatchEvent(new CustomEvent("mjo-accordion-collapsed",{detail:{item:this,expanded:this.expanded}})))};M.styles=[S`
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
        `];F([s({type:String})],M.prototype,"itemTitle",2);F([s({type:String})],M.prototype,"itemSubtitle",2);F([s({type:Boolean})],M.prototype,"expanded",2);F([s({type:Boolean})],M.prototype,"disabled",2);F([s({type:Boolean})],M.prototype,"compact",2);F([s({type:String})],M.prototype,"icon",2);F([s({type:Number})],M.prototype,"animationDuration",2);F([s({type:String})],M.prototype,"animationEasing",2);F([s({type:String,attribute:"aria-describedby"})],M.prototype,"ariaDescribedby",2);F([z()],M.prototype,"variant",2);F([X(".container")],M.prototype,"containerEl",2);F([X(".content")],M.prototype,"contentEl",2);F([X(".iconContainer mjo-icon")],M.prototype,"iconEl",2);F([X(".titleContainer")],M.prototype,"titleContainerEl",2);M=F([D("mjo-accordion-item")],M);var on=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,et=(t,e,a,r)=>{for(var o=r>1?void 0:r?rn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&on(e,a,o),o},hr=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},nn=(t,e,a)=>(hr(t,e,"read from private field"),a?a.call(t):e.get(t)),Xo=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},sn=(t,e,a)=>(hr(t,e,"access private method"),a),ro,pa,pr;let he=class extends J(y){constructor(){super(...arguments),Xo(this,pa),this.variant="light",this.selectionMode="single",this.compact=!1,this.items=[],Xo(this,ro,t=>{const e=t,a=e.detail.item;this.selectionMode==="single"&&this.items.forEach(r=>{r!==a&&r.expanded&&r.close()}),this.dispatchEvent(new CustomEvent("mjo-accordion-toggle",{detail:{item:a,expanded:e.detail.expanded,accordion:this}}))})}render(){return c`<div class="container" role="tablist" data-variant=${this.variant} ?data-compact=${this.compact}></div>`}firstUpdated(){this.items=Array.from(this.querySelectorAll("mjo-accordion-item")),sn(this,pa,pr).call(this)}updated(t){t.has("compact")&&this.items.forEach(e=>{e.setCompact(this.compact)}),t.has("variant")&&this.items.forEach(e=>{e.variant=this.variant})}expandItem(t){const e=typeof t=="number"?this.items[t]:this.items.find(a=>a.id===t);e&&!e.disabled&&e.open()}collapseItem(t){const e=typeof t=="number"?this.items[t]:this.items.find(a=>a.id===t);e&&e.close()}expandAll(){this.selectionMode==="multiple"&&this.items.forEach(t=>{t.disabled||t.open()})}collapseAll(){this.items.forEach(t=>t.close())}focusItem(t){this.items[t]&&!this.items[t].disabled&&this.items[t].focus()}};ro=new WeakMap;pa=new WeakSet;pr=function(){this.items.forEach(t=>{this.containerEl.appendChild(t),t.variant=this.variant,t.addEventListener("mjo-accordion-toggle",nn(this,ro)),t.addEventListener("mjo-accordion-will-expand",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-will-expand",{detail:{...a.detail,accordion:this},cancelable:!0,bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-expanded",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-expanded",{detail:{...a.detail,accordion:this},bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-will-collapse",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-will-collapse",{detail:{...a.detail,accordion:this},cancelable:!0,bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-collapsed",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-collapsed",{detail:{...a.detail,accordion:this},bubbles:!0,composed:!0}))})})};he.styles=[S`
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
        `];et([s({type:String})],he.prototype,"variant",2);et([s({type:String})],he.prototype,"selectionMode",2);et([s({type:Boolean})],he.prototype,"compact",2);et([X(".container")],he.prototype,"containerEl",2);he=et([D("mjo-accordion")],he);var ln=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,A=(t,e,a,r)=>{for(var o=r>1?void 0:r?cn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&ln(e,a,o),o},dn=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ie=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},j=(t,e,a)=>(dn(t,e,"access private method"),a),ua,ur,io,mr,ge,He,Je,Rt,ae,de,ma,fr,_e,tt;let x=class extends y{constructor(){super(...arguments),ie(this,ua),ie(this,io),ie(this,ge),ie(this,Je),ie(this,ae),ie(this,ma),ie(this,_e),this.type="info",this.size="medium",this.rounded="medium",this.message="",this.detail="",this.closable=!1,this.hideIcon=!1,this.ariaLive="polite",this.focusOnShow=!1,this.autoClose=!1,this.autoCloseDelay=5e3,this.animation="fade",this.animationDuration=300,this.persistent=!1,this.icon="",this.autoCloseTimer=null,this.storeHeight=0,this.isAnimating=!1}render(){const t=`alert-message-${Math.random().toString(36).substring(2,9)}`,e=`alert-detail-${Math.random().toString(36).substring(2,9)}`,a=this.type==="error"||this.type==="warning";return c`
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
                aria-describedby=${this.detail?e:v}
            >
                <div class="messageContainer">
                    ${!this.hideIcon&&this.icon?c`<div class="icon"><mjo-icon src=${this.icon}></mjo-icon></div>`:v}
                    <div class="message" id=${t}>${this.message}</div>
                    ${this.closable&&!this.persistent?j(this,ua,ur).call(this):v}
                </div>
                ${this.detail?c`<div class="detail" id=${e} ?data-icon=${!this.hideIcon}>${this.detail}</div>`:v}
            </div>
        `}updated(t){t.has("type")&&(this.type==="warning"?this.icon=Ai:this.type==="info"?this.icon=Oi:this.type==="error"?this.icon=eo:this.type==="success"?this.icon=or:this.icon=""),(t.has("autoClose")||t.has("autoCloseDelay"))&&j(this,ge,He).call(this)}connectedCallback(){super.connectedCallback(),this.autoClose&&j(this,ge,He).call(this),this.focusOnShow&&this.updateComplete.then(()=>{this.focus()})}disconnectedCallback(){super.disconnectedCallback(),j(this,Je,Rt).call(this)}show(){this.autoClose&&j(this,ge,He).call(this),j(this,ma,fr).call(this)}hide(){j(this,_e,tt).call(this)}focus(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".close-button");t?t.focus():super.focus()}announce(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".container");if(t){const a=t.getAttribute("aria-live");t.setAttribute("aria-live","off"),setTimeout(()=>{t.setAttribute("aria-live",a||this.ariaLive)},100)}}};ua=new WeakSet;ur=function(){return c`
            <button class="close-button" type="button" aria-label="Close alert" @click=${j(this,_e,tt)} @keydown=${j(this,io,mr)}>
                <mjo-icon src=${Ti}></mjo-icon>
            </button>
        `};io=new WeakSet;mr=function(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),j(this,_e,tt).call(this))};ge=new WeakSet;He=function(){j(this,Je,Rt).call(this),this.autoClose&&this.autoCloseDelay>0&&(this.autoCloseTimer=window.setTimeout(()=>{j(this,_e,tt).call(this)},this.autoCloseDelay))};Je=new WeakSet;Rt=function(){this.autoCloseTimer&&(clearTimeout(this.autoCloseTimer),this.autoCloseTimer=null)};ae=new WeakSet;de=function(t,e){this.dispatchEvent(new CustomEvent(t,{detail:{element:this,...e},bubbles:!0,composed:!0}))};ma=new WeakSet;fr=function(){var a;const t=(a=this.shadowRoot)==null?void 0:a.querySelector(".container");if(!t||t.offsetHeight>0||this.isAnimating)return;if(j(this,ae,de).call(this,"mjo-alert-will-show"),this.autoClose&&j(this,ge,He).call(this),this.animation==="none"){this.style.display="block",j(this,ae,de).call(this,"mjo-alert-show");return}this.isAnimating=!0;let e=null;switch(this.animation){case"fade":e=t.animate([{opacity:0,height:"0",display:"none"},{opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"slide":e=t.animate([{transform:"translateX(-100%)",opacity:0,height:"0",display:"none"},{transform:"translateX(0)",opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"scale":e=t.animate([{transform:"scale(0)",opacity:0,height:"0",display:"none"},{transform:"scale(1)",opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break}e.finished.then(()=>{j(this,ae,de).call(this,"mjo-alert-show"),e&&e.cancel(),this.isAnimating=!1})};_e=new WeakSet;tt=function(){var o,i;const t=(o=this.shadowRoot)==null?void 0:o.querySelector(".container");if(!t||t.offsetHeight===0||this.isAnimating)return;j(this,ae,de).call(this,"mjo-alert-will-close"),j(this,Je,Rt).call(this);const e=document.activeElement,a=((i=this.shadowRoot)==null?void 0:i.contains(e))||this===e;if(this.animation==="none"){this.style.display="none",j(this,ae,de).call(this,"mjo-alert-closed");return}this.isAnimating=!0,this.storeHeight=t.offsetHeight;let r=null;switch(this.animation){case"fade":r=t.animate([{opacity:1,height:this.storeHeight+"px"},{opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"slide":r=t.animate([{transform:"translateX(0)",opacity:1,height:this.storeHeight+"px"},{transform:"translateX(-100%)",opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"scale":r=t.animate([{transform:"scale(1)",opacity:1,height:this.storeHeight+"px"},{transform:"scale(0)",opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break}r==null||r.finished.then(()=>{if(a){const n=this.nextElementSibling||this.previousElementSibling||this.parentElement;n&&n instanceof HTMLElement&&n.focus()}this.isAnimating=!1,j(this,ae,de).call(this,"mjo-alert-closed")})};x.styles=[S`
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
        `];A([s({type:String})],x.prototype,"type",2);A([s({type:String})],x.prototype,"size",2);A([s({type:String})],x.prototype,"rounded",2);A([s({type:String})],x.prototype,"message",2);A([s({type:String})],x.prototype,"detail",2);A([s({type:Boolean})],x.prototype,"closable",2);A([s({type:Boolean})],x.prototype,"hideIcon",2);A([s({type:String})],x.prototype,"ariaLive",2);A([s({type:Boolean})],x.prototype,"focusOnShow",2);A([s({type:Boolean})],x.prototype,"autoClose",2);A([s({type:Number})],x.prototype,"autoCloseDelay",2);A([s({type:String})],x.prototype,"animation",2);A([s({type:Number})],x.prototype,"animationDuration",2);A([s({type:Boolean})],x.prototype,"persistent",2);A([z()],x.prototype,"icon",2);A([z()],x.prototype,"autoCloseTimer",2);x=A([D("mjo-alert")],x);var hn=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,W=(t,e,a,r)=>{for(var o=r>1?void 0:r?pn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&hn(e,a,o),o},un=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},st=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Pe=(t,e,a)=>(un(t,e,"access private method"),a),fa,br,ba,vr,Ct,no,va,yr;let _=class extends J(y){constructor(){super(...arguments),st(this,fa),st(this,ba),st(this,Ct),st(this,va),this.bordered=!1,this.disabled=!1,this.clickable=!1,this.nameColoured=!1,this.color="default",this.radius="full",this.size="medium",this.error=!1,this.initial=""}get appropriateRole(){return this.clickable?"button":this.src?"img":"presentation"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.clickable?`Click to interact with ${this.name||this.value||"avatar"}`:this.name?`Avatar for ${this.name}`:"Avatar"}render(){return this.initial=this.name?this.name[0].toLocaleUpperCase():"",c`<div
            class="container size-${this.size} radius-${this.radius} color-${this.color}"
            role=${this.appropriateRole}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${R(this.ariaDescribedby)}
            aria-disabled=${this.disabled?"true":"false"}
            tabindex=${this.clickable?this.tabIndex??0:-1}
            ?data-bordered=${this.bordered}
            ?data-disabled=${this.disabled}
            ?data-clickable=${this.clickable}
            @click=${Pe(this,Ct,no)}
            @keydown=${Pe(this,ba,vr)}
        >
            ${this.src&&!this.error?c`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${R(this.alt||this.name)} @error=${Pe(this,va,yr)} />
                  </div>`:this.fallbackIcon?c`<div class="image fallback radius-${this.radius} font-size-${this.size}"><mjo-icon src=${this.fallbackIcon}></mjo-icon></div>`:this.name?c`<div class="image name radius-${this.radius} font-size-${this.size}"><span>${this.initial}</span></div>`:c`<div class="image radius-${this.radius}"></div>`}
        </div>`}connectedCallback(){super.connectedCallback(),this.name&&(this.initial=this.name[0].toUpperCase())}updated(t){var a;t.has("name")&&(this.initial=this.name?this.name[0].toUpperCase():""),t.has("src")&&(this.error=!1);const e=(a=this.shadowRoot)==null?void 0:a.querySelector(".image.name");if(this.name&&this.nameColoured&&e){const[r,o]=Pe(this,fa,br).call(this);e.style.backgroundColor=r,e.style.color=o}else e&&(e.style.backgroundColor="",e.style.color="")}};fa=new WeakSet;br=function(){const t=["#e72c2c","#e7902c","#f1db13","#c1f113","#59f113","#26b632","#19da90","#10dfcd","#0ab4df","#0a78df","#0a43df","#6d0adf","#985cdd","#c85cdd","#dd5cc8","#c7199b","#c7194d"],e=["#fff","#fff","#000","#000","#000","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff"],a=this.initial.charCodeAt(0)%t.length,r=this.initial.charCodeAt(0)%e.length;return[t[a],e[r]]};ba=new WeakSet;vr=function(t){!this.clickable||this.disabled||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),Pe(this,Ct,no).call(this))};Ct=new WeakSet;no=async function(){!this.clickable||this.disabled||(this.dispatchEvent(new CustomEvent("mjo-avatar-click",{detail:{value:this.value||this.name||""}})),this.container.style.transform="scale(0.9)",await De(100),this.container.style.transform="scale(1.1)",await De(150),this.container.removeAttribute("style"))};va=new WeakSet;yr=function(){this.error=!0,this.dispatchEvent(new CustomEvent("mjo-avatar-error",{detail:{message:"Failed to load avatar image"}}))};_.styles=[S`
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
        `];W([s({type:Boolean})],_.prototype,"bordered",2);W([s({type:Boolean})],_.prototype,"disabled",2);W([s({type:Boolean})],_.prototype,"clickable",2);W([s({type:Boolean})],_.prototype,"nameColoured",2);W([s({type:String})],_.prototype,"fallbackIcon",2);W([s({type:String})],_.prototype,"alt",2);W([s({type:String})],_.prototype,"color",2);W([s({type:String})],_.prototype,"name",2);W([s({type:String})],_.prototype,"radius",2);W([s({type:String})],_.prototype,"size",2);W([s({type:String})],_.prototype,"src",2);W([s({type:String})],_.prototype,"value",2);W([s({type:String,attribute:"aria-describedby"})],_.prototype,"ariaDescribedby",2);W([z()],_.prototype,"error",2);W([X(".container")],_.prototype,"container",2);_=W([D("mjo-avatar")],_);const mn=(t,e)=>{var o;let a=t.parentElement||t.getRootNode().host,r=Zo(e,a);if(r)return r;for(;a;){if(a.tagName===e.toUpperCase())return a;if(a=a.parentElement||((o=a.getRootNode())==null?void 0:o.host),a!=null&&a.shadowRoot&&(r=Zo(e,a),r))return r}return null},Zo=(t,e)=>e!=null&&e.shadowRoot?e.shadowRoot.querySelector(t):null;var fn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,f=(t,e,a,r)=>{for(var o=r>1?void 0:r?bn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&fn(e,a,o),o};const so=t=>{var a,gr,o,wr;class e extends t{constructor(){super(...arguments);Oe(this,a);Oe(this,o);this.formIgnore=!1,this.form=null,this.mjoForm=null,this.listenersFormMixin={formData:d=>{fe(this,o,wr).call(this,d)}}}firstUpdated(){fe(this,a,gr).call(this)}disconnectedCallback(){var d;super.disconnectedCallback(),(d=this.form)==null||d.removeEventListener("formdata",this.listenersFormMixin.formData)}updateFormData({name:d,value:b}){d&&(this.dataFormMixin={name:d,value:b})}submiForm(){this.form&&(new FormData(this.form),this.form.dispatchEvent(new SubmitEvent("submit",{cancelable:!0,bubbles:!0})))}}return a=new WeakSet,gr=function(){var d,b,I,Z;this.form=mn(this,"form"),(d=this.form)==null||d.addEventListener("formdata",this.listenersFormMixin.formData),!this.formIgnore&&(this.mjoForm=(I=(b=this.form)==null?void 0:b.parentNode)==null?void 0:I.host,((Z=this.mjoForm)==null?void 0:Z.tagName)==="MJO-FORM"&&(this.tagName==="MJO-BUTTON"&&this.type==="submit"?this.mjoForm.submitButton=this:this.mjoForm.elements.push(this)))},o=new WeakSet,wr=function(d){this.dataFormMixin&&d.formData.set(this.dataFormMixin.name,this.dataFormMixin.value)},f([s({type:Boolean})],e.prototype,"isemail",2),f([s({type:Boolean})],e.prototype,"isurl",2),f([s({type:Boolean})],e.prototype,"required",2),f([s({type:Boolean})],e.prototype,"nospaces",2),f([s({type:Array})],e.prototype,"rangelength",2),f([s({type:Boolean})],e.prototype,"isnumber",2),f([s({type:Array})],e.prototype,"range",2),f([s({type:Array})],e.prototype,"domains",2),f([s({type:String})],e.prototype,"isdate",2),f([s({type:Boolean})],e.prototype,"dateprevious",2),f([s({type:Number})],e.prototype,"minage",2),f([s({type:Number})],e.prototype,"maxage",2),f([s({type:String})],e.prototype,"security",2),f([s({type:String})],e.prototype,"equalto",2),f([s({type:Boolean})],e.prototype,"phonenumber",2),f([s({type:Array})],e.prototype,"phonecountry",2),f([s({type:String})],e.prototype,"pattern",2),f([s({type:Array})],e.prototype,"allowed",2),f([s({type:Number})],e.prototype,"mincheck",2),f([s({type:Number})],e.prototype,"maxcheck",2),f([s({type:Number})],e.prototype,"max",2),f([s({type:Number})],e.prototype,"min",2),f([s({type:Number})],e.prototype,"maxlength",2),f([s({type:Number})],e.prototype,"minlength",2),f([s({type:Boolean,attribute:"form-ignore"})],e.prototype,"formIgnore",2),e};var vn=Object.defineProperty,yn=Object.getOwnPropertyDescriptor,gn=(t,e,a,r)=>{for(var o=r>1?void 0:r?yn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&vn(e,a,o),o};let ya=class extends J(y){constructor(){super(...arguments),this.handleClick=t=>{var i;const e=t.offsetX,a=t.offsetY,r=document.createElement("span");r.style.left=`${e}px`,r.style.top=`${a}px`;const o=(i=this.shadowRoot)==null?void 0:i.querySelector("div.container");o.removeAttribute("hidden"),o.appendChild(r),setTimeout(()=>{r.remove()},800),clearTimeout(this.timeoutRipple),this.timeoutRipple=setTimeout(()=>{o.setAttribute("hidden","")},850)}}render(){return c`<div class="container" hidden></div>`}connectedCallback(){super.connectedCallback(),this.parent=this.parentElement,this.parent.addEventListener("click",this.handleClick)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.parent)==null||t.removeEventListener("click",this.handleClick)}};ya.styles=[S`
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
        `];ya=gn([D("mjo-ripple")],ya);var wn=Object.defineProperty,jn=Object.getOwnPropertyDescriptor,Yt=(t,e,a,r)=>{for(var o=r>1?void 0:r?jn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&wn(e,a,o),o};let Ce=class extends J(y){constructor(){super(...arguments),this.tag="p",this.size="base",this.weight="regular"}render(){switch(this.tag){case"h1":return c`<h1 class=${`${this.size} ${this.weight}`}><slot></slot></h1>`;case"h2":return c`<h2 class=${`${this.size} ${this.weight}`}><slot></slot></h2>`;case"h3":return c`<h3 class=${`${this.size} ${this.weight}`}><slot></slot></h3>`;case"h4":return c`<h4 class=${`${this.size} ${this.weight}`}><slot></slot></h4>`;case"h5":return c`<h5 class=${`${this.size} ${this.weight}`}><slot></slot></h5>`;case"span":return c`<span class=${`${this.size} ${this.weight}`}><slot></slot></span>`;case"p":return c`<p class=${`${this.size} ${this.weight}`}><slot></slot></p>`;default:return c`<slot></slot>`}}};Ce.styles=[S`
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
        `];Yt([s({type:String})],Ce.prototype,"tag",2);Yt([s({type:String})],Ce.prototype,"size",2);Yt([s({type:String})],Ce.prototype,"weight",2);Ce=Yt([D("mjo-typography")],Ce);var kn=Object.defineProperty,xn=Object.getOwnPropertyDescriptor,O=(t,e,a,r)=>{for(var o=r>1?void 0:r?xn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&kn(e,a,o),o},$n=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},lt=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},yt=(t,e,a)=>($n(t,e,"access private method"),a),ga,jr,lo,kr,wa,xr,ja,$r;let $=class extends J(so(y)){constructor(){super(...arguments),lt(this,ga),lt(this,lo),lt(this,wa),lt(this,ja),this.fullwidth=!1,this.disabled=!1,this.loading=!1,this.rounded=!1,this.toggleable=!1,this.smallCaps=!1,this.noink=!1,this.size="medium",this.color="primary",this.variant="default",this.type="button",this.toggle=!1}render(){const t=this.loading?"true":"false",e=this.toggleable?this.toggle?"true":"false":void 0;return c`<button
            type=${this.type}
            data-color=${this.color}
            data-variant=${this.variant}
            data-size=${this.size}
            ?data-rounded=${this.rounded}
            ?data-toggle=${this.toggle}
            ?data-small-caps=${this.smallCaps}
            aria-busy=${t}
            aria-pressed=${R(e)}
            aria-label=${R(this.buttonLabel)}
            aria-describedby=${R(this.describedBy)}
            ?disabled=${this.disabled||this.loading}
            @click=${yt(this,ga,jr)}
        >
            ${this.startIcon&&c` <mjo-icon src=${this.startIcon}></mjo-icon>`}
            <mjo-typography tag="none"><slot></slot></mjo-typography>
            ${this.endIcon&&c` <mjo-icon src=${this.endIcon}></mjo-icon>`}
            ${!this.noink&&!this.disabled&&!this.loading?c`<mjo-ripple></mjo-ripple>`:v}
            ${this.loading?c`<div class="loading" aria-hidden="true"></div>`:v}
        </button>`}updated(t){super.updated(t),(this.disabled||this.loading)&&this.toggle&&(this.toggle=!1),t.has("loading")&&yt(this,ja,$r).call(this),t.has("toggle")&&this.toggleable&&yt(this,wa,xr).call(this,t.get("toggle"))}focus(t){var a;const e=(a=this.shadowRoot)==null?void 0:a.querySelector("button");e==null||e.focus(t)}blur(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("button");t==null||t.blur()}click(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("button");t==null||t.click()}setLoading(t){this.loading=t}togglePressed(){this.toggleable&&!this.disabled&&!this.loading&&(this.toggle=!this.toggle)}};ga=new WeakSet;jr=function(t){if(this.disabled||this.loading){t.preventDefault(),t.stopPropagation();return}this.toggleable&&this.type==="button"&&(this.toggle=!this.toggle),this.form&&this.type==="submit"&&this.submiForm(),yt(this,lo,kr).call(this,t)};lo=new WeakSet;kr=function(t){const e=new CustomEvent("mjo-button-click",{detail:{element:this,toggle:this.toggle,originalEvent:t},bubbles:!0,composed:!0});this.dispatchEvent(e)};wa=new WeakSet;xr=function(t){const e=new CustomEvent("mjo-button-toggle",{detail:{element:this,pressed:this.toggle,previousState:t},bubbles:!0,composed:!0});this.dispatchEvent(e)};ja=new WeakSet;$r=function(){const t=new CustomEvent("mjo-button-loading-change",{detail:{element:this,loading:this.loading},bubbles:!0,composed:!0});this.dispatchEvent(t)};$.styles=[S`
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
        `];O([s({type:Boolean,reflect:!0})],$.prototype,"fullwidth",2);O([s({type:Boolean,reflect:!0})],$.prototype,"disabled",2);O([s({type:Boolean,reflect:!0})],$.prototype,"loading",2);O([s({type:Boolean,reflect:!0})],$.prototype,"rounded",2);O([s({type:Boolean})],$.prototype,"toggleable",2);O([s({type:Boolean})],$.prototype,"smallCaps",2);O([s({type:Boolean})],$.prototype,"noink",2);O([s({type:String})],$.prototype,"startIcon",2);O([s({type:String})],$.prototype,"endIcon",2);O([s({type:String})],$.prototype,"size",2);O([s({type:String})],$.prototype,"color",2);O([s({type:String})],$.prototype,"variant",2);O([s({type:String})],$.prototype,"type",2);O([s({type:String})],$.prototype,"buttonLabel",2);O([s({type:String})],$.prototype,"describedBy",2);O([z()],$.prototype,"toggle",2);$=O([D("mjo-button")],$);const ct={en:{search:"Search...",calendar:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"]}},es:{search:"Buscar...",calendar:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthsShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],weekdays:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],weekdaysShort:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],weekdaysMin:["Do","Lu","Ma","Mi","Ju","Vi","Sá"]}},fr:{search:"Rechercher...",calendar:{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthsShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],weekdays:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],weekdaysShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],weekdaysMin:["Di","Lu","Ma","Me","Je","Ve","Sa"]}},pt:{search:"Pesquisar...",calendar:{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],weekdays:["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],weekdaysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],weekdaysMin:["Do","Se","Te","Qa","Qi","Sx","Sá"]}},it:{search:"Cerca...",calendar:{months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],monthsShort:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],weekdays:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],weekdaysShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],weekdaysMin:["Do","Lu","Ma","Me","Gi","Ve","Sa"]}},de:{search:"Suchen...",calendar:{months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],weekdays:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],weekdaysShort:["So","Mo","Di","Mi","Do","Fr","Sa"],weekdaysMin:["So","Mo","Di","Mi","Do","Fr","Sa"]}},nl:{search:"Zoeken...",calendar:{months:["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"],monthsShort:["Jan","Feb","Maa","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],weekdays:["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"],weekdaysShort:["Zo","Ma","Di","Wo","Do","Vr","Za"],weekdaysMin:["Zo","Ma","Di","Wo","Do","Vr","Za"]}},bg:{search:"Търсене...",calendar:{months:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],monthsShort:["Яну","Фев","Мар","Апр","Май","Юни","Юли","Авг","Сеп","Окт","Ное","Дек"],weekdays:["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"],weekdaysShort:["Нед","Пон","Вто","Сря","Чет","Пет","Съб"],weekdaysMin:["Не","По","Вт","Ср","Че","Пе","Съ"]}},sr:{search:"Претрага...",calendar:{months:["Јануар","Фебруар","Март","Април","Мај","Јун","Јул","Август","Септембар","Октобар","Новембар","Децембар"],monthsShort:["Јан","Феб","Мар","Апр","Мај","Јун","Јул","Авг","Сеп","Окт","Нов","Дец"],weekdays:["Недеља","Понедељак","Уторак","Среда","Четвртак","Петак","Субота"],weekdaysShort:["Нед","Пон","Уто","Сре","Чет","Пет","Суб"],weekdaysMin:["Не","По","Ут","Ср","Че","Пе","Су"]}},ru:{search:"Поиск...",calendar:{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],weekdays:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],weekdaysShort:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],weekdaysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]}},zh:{search:"搜索...",calendar:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],weekdays:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],weekdaysShort:["周日","周一","周二","周三","周四","周五","周六"],weekdaysMin:["日","一","二","三","四","五","六"]}},ja:{search:"検索...",calendar:{months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],weekdays:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],weekdaysShort:["日","月","火","水","木","金","土"],weekdaysMin:["日","月","火","水","木","金","土"]}},ko:{search:"검색...",calendar:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],monthsShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],weekdays:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],weekdaysShort:["일","월","화","수","목","금","토"],weekdaysMin:["일","월","화","수","목","금","토"]}},tr:{search:"Arama...",calendar:{months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],monthsShort:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],weekdays:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],weekdaysShort:["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],weekdaysMin:["Pz","Pt","Sa","Ça","Pe","Cu","Ct"]}},pl:{search:"Szukaj...",calendar:{months:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],monthsShort:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],weekdays:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],weekdaysShort:["Nie","Pon","Wto","Śro","Czw","Pią","Sob"],weekdaysMin:["Ni","Po","Wt","Śr","Cz","Pi","So"]}}};class g{static isSameDay(e,a){return e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}static formatDate(e){const a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}static getDateLocale(e){return{en:"en-US",es:"es-ES",fr:"fr-FR",pt:"pt-PT",it:"it-IT",de:"de-DE",nl:"nl-NL",bg:"bg-BG",sr:"sr-RS",ru:"ru-RU",zh:"zh-CN",ja:"ja-JP",ko:"ko-KR",tr:"tr-TR",pl:"pl-PL"}[e]||"en-US"}static isDateDisabled(e,a,r,o,i){if(a)return!0;if(r){const n=new Date(r);if(n.setDate(n.getDate()-1),e<n)return!0}if(o){const n=new Date(o);if(e>n)return!0}if(i){const n=g.formatDate(e);return i.includes(n)}return!1}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Sn=ar(class extends er{constructor(t){var e;if(super(t),t.type!==tr.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var r,o;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!((r=this.nt)!=null&&r.has(i))&&this.st.add(i);return this.render(e)}const a=t.element.classList;for(const i of this.st)i in e||(a.remove(i),this.st.delete(i));for(const i in e){const n=!!e[i];n===this.st.has(i)||(o=this.nt)!=null&&o.has(i)||(n?(a.add(i),this.st.add(i)):(a.remove(i),this.st.delete(i)))}return Qa}});var Dn=Object.defineProperty,_n=Object.getOwnPropertyDescriptor,L=(t,e,a,r)=>{for(var o=r>1?void 0:r?_n(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Dn(e,a,o),o},Cn=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ea=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},ta=(t,e,a)=>(Cn(t,e,"access private method"),a),ka,Sr,xa,Dr,$a,_r;let E=class extends y{constructor(){super(...arguments),ea(this,ka),ea(this,xa),ea(this,$a),this.isEmpty=!1,this.isToday=!1,this.isSelected=!1,this.isInRange=!1,this.isRangeStart=!1,this.isRangeEnd=!1,this.isDisabled=!1,this.isHovered=!1,this.isFocused=!1,this.showToday=!0,this.size="medium"}get dateLabel(){if(this.isEmpty||!this.month||!this.year)return"";const t=new Date(this.year,this.month,this.day);let a=new Intl.DateTimeFormat("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t);return this.isToday&&(a+=", Today"),this.isSelected&&(a+=", Selected"),this.isRangeStart&&(a+=", Range start"),this.isRangeEnd&&(a+=", Range end"),this.isInRange&&(a+=", In selected range"),this.isDisabled&&(a+=", Disabled"),a}render(){if(this.isEmpty)return c`<div class="day empty" role="gridcell"></div>`;const t={day:!0,today:this.isToday&&this.showToday,selected:this.isSelected,"in-range":this.isInRange,"range-start":this.isRangeStart,"range-end":this.isRangeEnd,disabled:this.isDisabled,"hovered-range":this.isHovered,focused:this.isFocused};return c`
            <div
                class=${Sn(t)}
                part="day ${this.isSelected?"selected":""} ${this.isToday?"today":""}"
                role="gridcell"
                aria-label=${this.dateLabel}
                aria-selected=${this.isSelected?"true":"false"}
                aria-current=${this.isToday?"date":"false"}
                aria-disabled=${this.isDisabled?"true":"false"}
                tabindex=${this.isFocused?0:-1}
                @click=${ta(this,ka,Sr)}
                @mouseenter=${ta(this,xa,Dr)}
                @mouseleave=${ta(this,$a,_r)}
            >
                <mjo-typography tag="none">${this.day}</mjo-typography>
            </div>
        `}};ka=new WeakSet;Sr=function(){this.isDisabled||this.dispatchEvent(new CustomEvent("day-click",{detail:{day:this.day},bubbles:!0,composed:!0}))};xa=new WeakSet;Dr=function(){this.isDisabled||this.dispatchEvent(new CustomEvent("day-hover",{detail:{day:this.day},bubbles:!0,composed:!0}))};$a=new WeakSet;_r=function(){this.dispatchEvent(new CustomEvent("day-leave",{detail:{day:this.day},bubbles:!0,composed:!0}))};E.styles=S`
        .day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: var(--mjo-calendar-day-border-radius, 4px);
            transition: all 0.2s ease;
            position: relative;
            font-size: 1.3em;
        }

        .day.empty {
            cursor: default;
            pointer-events: none;
        }

        .day:not(.empty):not(.disabled):hover {
            background: var(--mjo-calendar-day-hover-background, var(--mjo-background-color-high, #f5f5f5));
        }

        .day.today:not(.empty):not(.disabled) {
            background: var(--mjo-calendar-today-background, var(--mjo-primary-color-alpha2, rgba(29, 127, 219, 0.1)));
            color: var(--mjo-calendar-today-color, var(--mjo-primary-color, #1d7fdb));
            font-weight: 600;
        }

        .day.selected:not(.empty):not(.disabled) {
            background: var(--mjo-calendar-selected-background, var(--mjo-primary-color, #1d7fdb));
            color: var(--mjo-calendar-selected-color, white);
            font-weight: 600;
        }

        .day.in-range,
        .day.hovered-range {
            background: var(--mjo-calendar-range-background, var(--mjo-primary-color-alpha1, rgba(29, 127, 219, 0.2)));
            color: var(--mjo-calendar-range-color, var(--mjo-primary-color, #1d7fdb));
        }

        .day.range-start,
        .day.range-end {
            background: var(--mjo-calendar-range-endpoint-background, var(--mjo-primary-color, #1d7fdb));
            color: var(--mjo-calendar-range-endpoint-color, white);
            font-weight: 600;
        }

        .day.disabled {
            color: var(--mjo-calendar-disabled-color, var(--mjo-disabled-foreground-color, #aaa));
            cursor: not-allowed;
            background: var(--mjo-calendar-disabled-background, transparent);
        }

        .day.disabled:hover {
            background: var(--mjo-calendar-disabled-background, transparent);
        }

        .day.focused {
            outline: 2px solid var(--mjo-calendar-focus-outline, var(--mjo-primary-color, #1d7fdb));
            outline-offset: 2px;
        }

        /* Size variations */
        :host([size="small"]) .day {
            min-height: 28px;
        }

        :host([size="large"]) .day {
            min-height: 40px;
        }
    `;L([s({type:Number})],E.prototype,"day",2);L([s({type:Number})],E.prototype,"month",2);L([s({type:Number})],E.prototype,"year",2);L([s({type:Boolean})],E.prototype,"isEmpty",2);L([s({type:Boolean})],E.prototype,"isToday",2);L([s({type:Boolean})],E.prototype,"isSelected",2);L([s({type:Boolean})],E.prototype,"isInRange",2);L([s({type:Boolean})],E.prototype,"isRangeStart",2);L([s({type:Boolean})],E.prototype,"isRangeEnd",2);L([s({type:Boolean})],E.prototype,"isDisabled",2);L([s({type:Boolean})],E.prototype,"isHovered",2);L([s({type:Boolean})],E.prototype,"isFocused",2);L([s({type:Boolean})],E.prototype,"showToday",2);L([s({type:String})],E.prototype,"size",2);E=L([D("calendar-day")],E);var Mn=Object.defineProperty,En=Object.getOwnPropertyDescriptor,C=(t,e,a,r)=>{for(var o=r>1?void 0:r?En(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Mn(e,a,o),o},zn=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},K=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},V=(t,e,a)=>(zn(t,e,"access private method"),a),Sa,Cr,Da,Mr,_a,Er,Ca,zr,Ma,Ar,Ea,Or,za,Tr,Aa,Pr,Oa,Wr;let k=class extends y{constructor(){super(...arguments),K(this,Sa),K(this,Da),K(this,_a),K(this,Ca),K(this,Ma),K(this,Ea),K(this,za),K(this,Aa),K(this,Oa),this.side="single",this.firstDayOfWeek="monday",this.mode="single",this.showToday=!0,this.size="medium",this.disabled=!1,this.minDate="",this.maxDate=""}get gridLabel(){return`Calendar grid for ${this.year}-${String(this.month+1).padStart(2,"0")}`}render(){const t=new Date(this.year,this.month,1),e=new Date(this.year,this.month+1,0),a=this.firstDayOfWeek==="monday"?t.getDay()===0?6:t.getDay()-1:t.getDay(),r=e.getDate(),o=new Date,i=this.weekDays&&Array.isArray(this.weekDays)&&this.weekDays.length>=7?this.weekDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=this.firstDayOfWeek==="monday"?[i[1],i[2],i[3],i[4],i[5],i[6],i[0]]:i,u=[];for(let d=0;d<a;d++)u.push(c`<calendar-day isEmpty .size=${this.size}></calendar-day>`);for(let d=1;d<=r;d++){const b=new Date(this.year,this.month,d),I=g.isSameDay(b,o),Z=V(this,Ca,zr).call(this,b),it=this.mode==="range"&&V(this,Ma,Ar).call(this,b),Xt=this.mode==="range"&&V(this,Ea,Or).call(this,b),Di=this.mode==="range"&&V(this,za,Tr).call(this,b),_i=g.isDateDisabled(b,this.disabled,this.minDate,this.maxDate,this.disabledDates),Ci=this.mode==="range"&&V(this,Aa,Pr).call(this,b);u.push(c`
                <calendar-day
                    day=${d}
                    month=${this.month}
                    year=${this.year}
                    ?isToday=${I}
                    ?isSelected=${Z}
                    ?isInRange=${it}
                    ?isRangeStart=${Xt}
                    ?isRangeEnd=${Di}
                    ?isDisabled=${_i}
                    ?isHovered=${Ci}
                    ?isFocused=${V(this,Oa,Wr).call(this,b)}
                    ?showToday=${this.showToday}
                    size=${this.size}
                    @day-click=${V(this,Sa,Cr)}
                    @day-hover=${V(this,Da,Mr)}
                    @day-leave=${V(this,_a,Er)}
                ></calendar-day>
            `)}return c`
            <div class="calendar-grid" part="calendar-grid" role="grid" aria-label=${this.gridLabel}>
                <!-- Week day headers -->
                <div class="week-header" role="row">
                    ${n.map(d=>c`
                            <div class="week-day" role="columnheader">
                                <mjo-typography tag="none" size="body1">${d}</mjo-typography>
                            </div>
                        `)}
                </div>
                <!-- Days grid -->
                <div class="days-grid">${u}</div>
            </div>
        `}};Sa=new WeakSet;Cr=function(t){const e=t.detail.day,a=new Date(this.year,this.month,e);this.dispatchEvent(new CustomEvent("date-click",{detail:{date:a,formattedDate:g.formatDate(a)},bubbles:!0,composed:!0}))};Da=new WeakSet;Mr=function(t){const e=t.detail.day,a=new Date(this.year,this.month,e);this.dispatchEvent(new CustomEvent("date-hover",{detail:{date:a},bubbles:!0,composed:!0}))};_a=new WeakSet;Er=function(){this.dispatchEvent(new CustomEvent("date-leave",{bubbles:!0,composed:!0}))};Ca=new WeakSet;zr=function(t){return this.mode==="single"&&this.selectedDate?g.isSameDay(t,this.selectedDate):!1};Ma=new WeakSet;Ar=function(t){return!this.selectedStartDate||!this.selectedEndDate?!1:t>this.selectedStartDate&&t<this.selectedEndDate};Ea=new WeakSet;Or=function(t){return this.selectedStartDate?g.isSameDay(t,this.selectedStartDate):!1};za=new WeakSet;Tr=function(t){return this.selectedEndDate?g.isSameDay(t,this.selectedEndDate):!1};Aa=new WeakSet;Pr=function(t){if(!this.selectedStartDate||!this.hoverDate||this.selectedEndDate)return!1;const e=this.selectedStartDate,a=this.hoverDate;return a<e?t>a&&t<e:t>e&&t<a};Oa=new WeakSet;Wr=function(t){return this.focusedDate?g.isSameDay(t,this.focusedDate):!1};k.styles=S`
        .calendar-grid {
            width: 100%;
        }

        .week-header,
        .days-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
            min-width: max-content;
        }
        .week-header {
            margin-bottom: 8px;
        }

        .week-day {
            text-align: center;
            justify-self: center;
            padding: 8px 4px;
            color: var(--mjo-calendar-week-day-color, var(--mjo-foreground-color-xlow, #666));
            font-weight: var(--mjo-calendar-week-day-font-weight, 600);
            box-sizing: border-box;
            width: 3em;
        }
    `;C([s({type:Number})],k.prototype,"month",2);C([s({type:Number})],k.prototype,"year",2);C([s({type:String})],k.prototype,"side",2);C([s({type:Array})],k.prototype,"weekDays",2);C([s({type:String})],k.prototype,"firstDayOfWeek",2);C([s({type:String})],k.prototype,"mode",2);C([s({type:Boolean})],k.prototype,"showToday",2);C([s({type:String})],k.prototype,"size",2);C([s({type:Boolean})],k.prototype,"disabled",2);C([s({type:String})],k.prototype,"minDate",2);C([s({type:String})],k.prototype,"maxDate",2);C([s({type:Array})],k.prototype,"disabledDates",2);C([s({type:Object})],k.prototype,"selectedDate",2);C([s({type:Object})],k.prototype,"selectedStartDate",2);C([s({type:Object})],k.prototype,"selectedEndDate",2);C([s({type:Object})],k.prototype,"hoverDate",2);C([s({type:Object})],k.prototype,"focusedDate",2);k=C([D("calendar-grid")],k);const An='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>',On='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>';var Tn=Object.defineProperty,Pn=Object.getOwnPropertyDescriptor,oe=(t,e,a,r)=>{for(var o=r>1?void 0:r?Pn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Tn(e,a,o),o},Wn=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},dt=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},ht=(t,e,a)=>(Wn(t,e,"access private method"),a),Ta,Fr,Pa,Lr,Wa,Rr,Fa,Yr;let q=class extends y{constructor(){super(...arguments),dt(this,Ta),dt(this,Pa),dt(this,Wa),dt(this,Fa),this.side="single",this.disabled=!1,this.monthPickerOpen=!1,this.yearPickerOpen=!1}get previousMonthLabel(){if(!this.monthNames||!Array.isArray(this.monthNames)||this.monthNames.length<12)return"Previous month";const t=new Date(this.year,this.month-1,1),e=t.getMonth();return e<0||e>=this.monthNames.length||!this.monthNames[e]?"Previous month":`Go to ${this.monthNames[e]} ${t.getFullYear()}`}get nextMonthLabel(){if(!this.monthNames||!Array.isArray(this.monthNames)||this.monthNames.length<12)return"Next month";const t=new Date(this.year,this.month+1,1),e=t.getMonth();return e<0||e>=this.monthNames.length||!this.monthNames[e]?"Next month":`Go to ${this.monthNames[e]} ${t.getFullYear()}`}get currentMonthYearLabel(){return!this.monthNames||!Array.isArray(this.monthNames)||this.monthNames.length<12?`Month ${this.month+1} ${this.year}`:this.month<0||this.month>=this.monthNames.length||!this.monthNames[this.month]?`Month ${this.month+1} ${this.year}`:`${this.monthNames[this.month]} ${this.year}`}render(){return c`
            <div class="calendar-header" part="header" role="banner">
                <div class="navigation" part="navigation" role="toolbar" aria-label="Calendar navigation">
                    ${this.side==="single"||this.side==="left"?c`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${An}
                                  @click=${ht(this,Ta,Fr)}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.previousMonthLabel}
                                  title=${this.previousMonthLabel}
                              ></mjo-button>
                          `:v}

                    <div class="month-year-selectors" part="month-year" role="group" aria-label=${this.currentMonthYearLabel}>
                        <mjo-button
                            variant="text"
                            @click=${ht(this,Wa,Rr)}
                            ?disabled=${this.disabled}
                            aria-label="Select month"
                            aria-expanded=${this.monthPickerOpen?"true":"false"}
                        >
                            <mjo-typography tag="none">
                                ${this.monthNames&&Array.isArray(this.monthNames)&&this.monthNames[this.month]?this.monthNames[this.month]:`Month ${this.month+1}`}
                            </mjo-typography>
                        </mjo-button>
                        <mjo-button
                            variant="text"
                            @click=${ht(this,Fa,Yr)}
                            ?disabled=${this.disabled}
                            aria-label="Select year"
                            aria-expanded=${this.yearPickerOpen?"true":"false"}
                        >
                            <mjo-typography tag="none">${this.year}</mjo-typography>
                        </mjo-button>
                    </div>

                    ${this.side==="single"||this.side==="right"?c`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${On}
                                  @click=${ht(this,Pa,Lr)}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.nextMonthLabel}
                                  title=${this.nextMonthLabel}
                              ></mjo-button>
                          `:v}
                </div>
            </div>
        `}};Ta=new WeakSet;Fr=function(){this.dispatchEvent(new CustomEvent("navigate",{detail:{direction:-1,side:this.side},bubbles:!0,composed:!0}))};Pa=new WeakSet;Lr=function(){this.dispatchEvent(new CustomEvent("navigate",{detail:{direction:1,side:this.side},bubbles:!0,composed:!0}))};Wa=new WeakSet;Rr=function(){this.dispatchEvent(new CustomEvent("month-picker",{detail:{side:this.side},bubbles:!0,composed:!0}))};Fa=new WeakSet;Yr=function(){this.dispatchEvent(new CustomEvent("year-picker",{detail:{side:this.side},bubbles:!0,composed:!0}))};q.styles=S`
        .calendar-header {
            margin-bottom: 16px;
            font-size: 1.3em;
        }

        .navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            min-width: max-content;
            --mjo-button-disabled-background-color: transparent;
        }

        .month-year-selectors {
            display: flex;
            align-items: center;
            gap: 4px;
        }
    `;oe([s({type:Number})],q.prototype,"month",2);oe([s({type:Number})],q.prototype,"year",2);oe([s({type:String})],q.prototype,"side",2);oe([s({type:Array})],q.prototype,"monthNames",2);oe([s({type:Boolean})],q.prototype,"disabled",2);oe([s({type:Boolean})],q.prototype,"monthPickerOpen",2);oe([s({type:Boolean})],q.prototype,"yearPickerOpen",2);q=oe([D("calendar-header")],q);var Fn=Object.defineProperty,Ln=Object.getOwnPropertyDescriptor,at=(t,e,a,r)=>{for(var o=r>1?void 0:r?Ln(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Fn(e,a,o),o},Rn=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},pt=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},U=(t,e,a)=>(Rn(t,e,"access private method"),a),Mt,co,Me,qe,La,Nr,we,We;let pe=class extends y{constructor(){super(...arguments),pt(this,Mt),pt(this,Me),pt(this,La),pt(this,we),this.selectedMonth=new Date().getMonth(),this.monthNames=[],this.disabled=!1,this.focusedMonth=this.selectedMonth}render(){return c`
            <div class="month-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select month" @keydown=${U(this,La,Nr)}>
                <div class="months-grid" role="grid" aria-label="Month selection grid">
                    ${this.monthNames.map((t,e)=>c`
                            <button
                                class="month-button"
                                role="gridcell"
                                ?data-selected=${e===this.selectedMonth}
                                ?disabled=${this.disabled}
                                @click=${()=>U(this,Mt,co).call(this,e)}
                                tabindex=${this.disabled?-1:e===this.focusedMonth?0:-1}
                                aria-label=${t}
                                aria-selected=${e===this.selectedMonth?"true":"false"}
                                @focus=${()=>U(this,Me,qe).call(this,e)}
                            >
                                ${t}
                            </button>
                        `)}
                </div>
            </div>
        `}};Mt=new WeakSet;co=function(t){this.disabled||(this.selectedMonth=t,this.dispatchEvent(new CustomEvent("month-selected",{detail:{month:t},bubbles:!0,composed:!0})))};Me=new WeakSet;qe=function(t){this.focusedMonth=t};La=new WeakSet;Nr=function(t){if(this.disabled)return;const e=t.key;let a=!1;switch(e){case"ArrowLeft":U(this,we,We).call(this,-1),a=!0;break;case"ArrowRight":U(this,we,We).call(this,1),a=!0;break;case"ArrowUp":U(this,we,We).call(this,-3),a=!0;break;case"ArrowDown":U(this,we,We).call(this,3),a=!0;break;case"Home":U(this,Me,qe).call(this,0),a=!0;break;case"End":U(this,Me,qe).call(this,11),a=!0;break;case"Enter":case" ":U(this,Mt,co).call(this,this.focusedMonth),a=!0;break}a&&(t.preventDefault(),t.stopPropagation())};we=new WeakSet;We=function(t){let e=this.focusedMonth+t;e<0&&(e=11),e>11&&(e=0),U(this,Me,qe).call(this,e),this.updateComplete.then(()=>{var o;const a=(o=this.shadowRoot)==null?void 0:o.querySelectorAll("button"),r=a==null?void 0:a[this.focusedMonth];r==null||r.focus()})};pe.styles=S`
        :host {
            display: block;
        }

        .month-picker {
            padding: var(--mjo-space-small);
        }

        .months-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }

        .month-button {
            background: var(--mjo-calendar-picker-button-background, transparent);
            border: var(--mjo-calendar-picker-button-border, 1px solid var(--mjo-border-color, #e0e0e0));
            border-radius: var(--mjo-calendar-picker-button-radius, var(--mjo-radius, 4px));
            color: var(--mjo-calendar-picker-button-color, var(--mjo-foreground-color-low, #333));
            cursor: pointer;
            font-family: inherit;
            font-size: 1.2em;
            padding: 12px 4px;
            box-sizing: border-box;
            transition: all 0.2s ease;
            min-height: 40px;
        }

        .month-button:hover:not(:disabled) {
            background: var(--mjo-calendar-picker-button-hover-background, var(--mjo-primary-color-alpha2, rgba(76, 129, 201, 0.1)));
            border-color: var(--mjo-calendar-picker-button-hover-border, var(--mjo-primary-color, #4c81c9));
        }

        .month-button:focus {
            outline: 2px solid var(--mjo-calendar-picker-button-focus-outline, var(--mjo-primary-color, #4c81c9));
            outline-offset: 2px;
        }

        .month-button[data-selected]:not(:disabled) {
            background: var(--mjo-calendar-picker-button-selected-background, var(--mjo-primary-color, #4c81c9));
            border-color: var(--mjo-calendar-picker-button-selected-border, var(--mjo-primary-color, #4c81c9));
            color: var(--mjo-calendar-picker-button-selected-color, var(--mjo-primary-foreground-color, white));
        }

        .month-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        .month-picker[data-disabled] {
            pointer-events: none;
        }
    `;at([s({type:Number})],pe.prototype,"selectedMonth",2);at([s({type:Array})],pe.prototype,"monthNames",2);at([s({type:Boolean})],pe.prototype,"disabled",2);at([z()],pe.prototype,"focusedMonth",2);pe=at([D("calendar-month-picker")],pe);var Yn=Object.defineProperty,Nn=Object.getOwnPropertyDescriptor,ue=(t,e,a,r)=>{for(var o=r>1?void 0:r?Nn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Yn(e,a,o),o},Bn=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ne=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},w=(t,e,a)=>(Bn(t,e,"access private method"),a),$e,Ke,Et,ho,zt,po,At,uo,Q,le,Ra,Br,je,Fe;let G=class extends y{constructor(){super(...arguments),ne(this,$e),ne(this,Et),ne(this,zt),ne(this,At),ne(this,Q),ne(this,Ra),ne(this,je),this.selectedYear=new Date().getFullYear(),this.disabled=!1,this.startYear=Math.floor(new Date().getFullYear()/10)*10,this.focusedYear=new Date().getFullYear()}get years(){const t=[];for(let e=this.startYear;e<this.startYear+12;e++)t.push(e);return t}get previousDecadeLabel(){return`${this.startYear-10} - ${this.startYear-1}`}get nextDecadeLabel(){return`${this.startYear+12} - ${this.startYear+21}`}render(){return c`
            <div class="year-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select year" @keydown=${w(this,Ra,Br)}>
                <div class="year-navigation">
                    <button
                        class="nav-button"
                        ?disabled=${this.disabled}
                        @click=${w(this,zt,po)}
                        title="Previous decade: ${this.previousDecadeLabel}"
                        aria-label="Previous decade: ${this.previousDecadeLabel}"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <span class="decade-label">${this.startYear} - ${this.startYear+11}</span>
                    <button
                        class="nav-button"
                        ?disabled=${this.disabled}
                        @click=${w(this,At,uo)}
                        title="Next decade: ${this.nextDecadeLabel}"
                        aria-label="Next decade: ${this.nextDecadeLabel}"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                </div>
                <div class="years-grid" role="grid" aria-label="Year selection grid">
                    ${this.years.map(t=>c`
                            <button
                                class="year-button"
                                role="gridcell"
                                ?data-selected=${t===this.selectedYear}
                                ?disabled=${this.disabled||w(this,$e,Ke).call(this,t)}
                                @click=${()=>w(this,Et,ho).call(this,t)}
                                tabindex=${this.disabled||w(this,$e,Ke).call(this,t)?-1:t===this.focusedYear?0:-1}
                                aria-label=${t.toString()}
                                aria-selected=${t===this.selectedYear?"true":"false"}
                                @focus=${()=>w(this,Q,le).call(this,t)}
                            >
                                ${t}
                            </button>
                        `)}
                </div>
            </div>
        `}};$e=new WeakSet;Ke=function(t){return!!(this.minYear&&t<this.minYear||this.maxYear&&t>this.maxYear)};Et=new WeakSet;ho=function(t){this.disabled||w(this,$e,Ke).call(this,t)||(this.selectedYear=t,this.dispatchEvent(new CustomEvent("year-selected",{detail:{year:t},bubbles:!0,composed:!0})))};zt=new WeakSet;po=function(){this.disabled||(this.startYear-=12)};At=new WeakSet;uo=function(){this.disabled||(this.startYear+=12)};Q=new WeakSet;le=function(t){this.focusedYear=t};Ra=new WeakSet;Br=function(t){if(this.disabled)return;const e=t.key;let a=!1;switch(e){case"ArrowLeft":w(this,je,Fe).call(this,-1),a=!0;break;case"ArrowRight":w(this,je,Fe).call(this,1),a=!0;break;case"ArrowUp":w(this,je,Fe).call(this,-4),a=!0;break;case"ArrowDown":w(this,je,Fe).call(this,4),a=!0;break;case"Home":w(this,Q,le).call(this,this.startYear),a=!0;break;case"End":w(this,Q,le).call(this,this.startYear+11),a=!0;break;case"PageUp":w(this,zt,po).call(this),w(this,Q,le).call(this,Math.max(this.startYear,this.focusedYear-12)),a=!0;break;case"PageDown":w(this,At,uo).call(this),w(this,Q,le).call(this,Math.min(this.startYear+11,this.focusedYear+12)),a=!0;break;case"Enter":case" ":w(this,$e,Ke).call(this,this.focusedYear)||(w(this,Et,ho).call(this,this.focusedYear),a=!0);break}a&&(t.preventDefault(),t.stopPropagation())};je=new WeakSet;Fe=function(t){let e=this.focusedYear+t;e<this.startYear&&(e=this.startYear),e>this.startYear+11&&(e=this.startYear+11),w(this,Q,le).call(this,e),this.updateComplete.then(()=>{var i;const a=(i=this.shadowRoot)==null?void 0:i.querySelectorAll(".year-button"),r=e-this.startYear,o=a==null?void 0:a[r];o==null||o.focus()})};G.styles=S`
        :host {
            display: block;
        }

        .year-picker {
            padding: var(--mjo-space-medium) var(--mjo-space-small);
        }

        .year-navigation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            padding: 0 8px;
        }

        .nav-button {
            background: var(--mjo-calendar-nav-background, transparent);
            border: var(--mjo-calendar-nav-border, 1px solid var(--mjo-border-color, #e0e0e0));
            border-radius: var(--mjo-calendar-nav-radius, var(--mjo-radius, 4px));
            color: var(--mjo-calendar-nav-color, var(--mjo-foreground-color, #333));
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: inherit;
            height: 32px;
            width: 32px;
            transition: all 0.2s ease;
        }

        .nav-button:hover:not(:disabled) {
            background: var(--mjo-calendar-nav-hover-background, var(--mjo-primary-color-alpha2, rgba(76, 129, 201, 0.1)));
            border-color: var(--mjo-calendar-nav-hover-border, var(--mjo-primary-color, #4c81c9));
        }

        .nav-button:focus {
            outline: 2px solid var(--mjo-calendar-nav-focus-outline, var(--mjo-primary-color, #4c81c9));
            outline-offset: 2px;
        }

        .nav-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        .decade-label {
            font-weight: 500;
            color: var(--mjo-calendar-decade-label-color, var(--mjo-foreground-color, #333));
            font-size: 1.5em;
        }

        .years-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }

        .year-button {
            background: var(--mjo-calendar-picker-button-background, transparent);
            border: var(--mjo-calendar-picker-button-border, 1px solid var(--mjo-border-color, #e0e0e0));
            border-radius: var(--mjo-calendar-picker-button-radius, var(--mjo-radius, 4px));
            color: var(--mjo-calendar-picker-button-color, var(--mjo-foreground-color-low, #333));
            cursor: pointer;
            font-family: inherit;
            font-size: 1.3em;
            padding: 12px 8px;
            transition: all 0.2s ease;
            min-height: 40px;
        }

        .year-button:hover:not(:disabled) {
            background: var(--mjo-calendar-picker-button-hover-background, var(--mjo-primary-color-alpha2, rgba(76, 129, 201, 0.1)));
            border-color: var(--mjo-calendar-picker-button-hover-border, var(--mjo-primary-color, #4c81c9));
        }

        .year-button:focus {
            outline: 2px solid var(--mjo-calendar-picker-button-focus-outline, var(--mjo-primary-color, #4c81c9));
            outline-offset: 2px;
        }

        .year-button[data-selected]:not(:disabled) {
            background: var(--mjo-calendar-picker-button-selected-background, var(--mjo-primary-color, #4c81c9));
            border-color: var(--mjo-calendar-picker-button-selected-border, var(--mjo-primary-color, #4c81c9));
            color: var(--mjo-calendar-picker-button-selected-color, var(--mjo-primary-foreground-color, white));
        }

        .year-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }

        .year-picker[data-disabled] {
            pointer-events: none;
        }
    `;ue([s({type:Number})],G.prototype,"selectedYear",2);ue([s({type:Boolean})],G.prototype,"disabled",2);ue([s({type:Number})],G.prototype,"minYear",2);ue([s({type:Number})],G.prototype,"maxYear",2);ue([z()],G.prototype,"startYear",2);ue([z()],G.prototype,"focusedYear",2);G=ue([D("calendar-year-picker")],G);var In=Object.defineProperty,Un=Object.getOwnPropertyDescriptor,m=(t,e,a,r)=>{for(var o=r>1?void 0:r?Un(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&In(e,a,o),o},mo=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},Se=(t,e,a)=>(mo(t,e,"read from private field"),a?a.call(t):e.get(t)),h=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Ir=(t,e,a,r)=>(mo(t,e,"write to private field"),r?r.call(t,a):e.set(t,a),a),l=(t,e,a)=>(mo(t,e,"access private method"),a),ee,Ya,Ur,Na,Hr,Nt,fo,bo,Jr,Ve,Ot,Ba,qr,Bt,vo,yo,Kr,Tt,go,wo,Vr,jo,Gr,Pt,Ia,Xr,ke,Le,xe,Re,ko,Zr,xo,Qr,$o,ei,me,Ae,So,ti,ot,It,B,H,gt,Ua,Do,ai,_o,oi,Co,ri,Mo,ii,Eo,ni,zo,si,Ao,li,Oo,ci,Ut,To,rt,Ht,Jt,Po,qt,Wo,Fo,di,Lo,hi,Ro,pi,wt,Ha,Ge,Kt,Wt,Ja,Yo,ui,No,mi,Ye,jt,Ne,kt,Be,xt,qa,fi;let p=class extends J(so(y)){constructor(){super(...arguments),h(this,Ya),h(this,Na),h(this,Nt),h(this,bo),h(this,Ve),h(this,Ba),h(this,Bt),h(this,yo),h(this,Tt),h(this,wo),h(this,jo),h(this,Ia),h(this,ke),h(this,xe),h(this,ko),h(this,xo),h(this,$o),h(this,me),h(this,So),h(this,ot),h(this,B),h(this,gt),h(this,Do),h(this,_o),h(this,Co),h(this,Mo),h(this,Eo),h(this,zo),h(this,Ao),h(this,Oo),h(this,Ut),h(this,rt),h(this,Jt),h(this,qt),h(this,Fo),h(this,Lo),h(this,Ro),h(this,wt),h(this,Ge),h(this,Wt),h(this,Yo),h(this,No),h(this,Ye),h(this,Ne),h(this,Be),h(this,qa),this.mode="single",this.locale="en",this.disabled=!1,this.size="medium",this.color="primary",this.showToday=!0,this.firstDayOfWeek="monday",this.rangeCalendars="auto",this.enableKeyboardNavigation=!0,this.announceSelections=!0,this.ariaLabelledby=null,this.ariaDescribedby=null,this.ariaLive="polite",this.picker={open:!1,type:void 0,index:0},this.autoDual=!1,this.displayedMonths=[],this.announcementText="",h(this,ee,void 0),h(this,Pt,()=>l(this,Tt,go).call(this))}get currentLocale(){return ct[this.locale]||ct.en}get monthNames(){const t=this.currentLocale;return t&&t.calendar?t.calendar.months:ct.en.calendar.months}get weekDays(){const t=this.currentLocale;return t&&t.calendar?t.calendar.weekdaysShort:ct.en.calendar.weekdaysShort}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.mode==="range"?this.selectedStartDate&&this.selectedEndDate?`Date range picker. Selected from ${g.formatDate(this.selectedStartDate)} to ${g.formatDate(this.selectedEndDate)}`:"Date range picker. Use arrow keys to navigate, Enter to select.":this.selectedDate?`Date picker. Selected date: ${g.formatDate(this.selectedDate)}`:"Date picker. Use arrow keys to navigate, Enter to select."}get computedRole(){return"application"}render(){const t=`calendar-${Math.random().toString(36).substring(2,9)}`;return c`
            <div
                id=${t}
                class="calendar"
                role="application"
                aria-label=${this.computedAriaLabel}
                aria-labelledby=${R(this.ariaLabelledby||void 0)}
                aria-describedby=${R(this.ariaDescribedby||void 0)}
                aria-live=${this.announcementText?this.ariaLive:"off"}
                tabindex=${this.disabled?-1:0}
                @keydown=${this.enableKeyboardNavigation?l(this,Ia,Xr):v}
            >
                ${this.mode==="range"?l(this,Ya,Ur).call(this):l(this,Na,Hr).call(this)}
                ${this.announcementText?c`<div class="sr-only" aria-live=${this.ariaLive}>${this.announcementText}</div>`:v}
            </div>
        `}connectedCallback(){super.connectedCallback(),l(this,gt,Ua).call(this),l(this,B,H).call(this),this.updateComplete.then(()=>{l(this,Ba,qr).call(this)})}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("startDate")||t.has("endDate")||t.has("mode"))&&(l(this,gt,Ua).call(this),l(this,B,H).call(this))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",Se(this,Pt)),Se(this,ee)&&(clearTimeout(Se(this,ee)),Ir(this,ee,void 0))}getDisplayedMonths(){return[...this.displayedMonths]}setDisplayedMonths(t,e=!0){if(!Array.isArray(t)||t.length===0)return;t.length>2&&(t=t.slice(0,2));const a=t.map(r=>({month:r.month,year:r.year}));if(a.length===2&&e){const r=a[0],o=l(this,qa,fi).call(this,r,1),i=a[1];(i.month!==o.month||i.year!==o.year)&&(a[1]=o)}this.displayedMonths=a}goToMonth(t){if(!t||typeof t!="object")throw new Error("Option param expect an object");t.year||(t.year=new Date().getFullYear());const{month:e,year:a,side:r}=t;if(typeof e!="number")throw new Error("Requires a valid month number. Got: "+typeof e);if(typeof a!="number")throw new Error("Requires a valid year number. Got: "+typeof a);const o=Math.max(1,Math.min(12,e)),i=l(this,Ne,kt).call(this,r)||l(this,Ye,jt).call(this);l(this,Be,xt).call(this,o-1,a,i)}goToYear(t){if(!t||typeof t!="object")throw new Error("Option param expect an object");const{year:e,side:a}=t;if(typeof e!="number"||e<1e3||e>9999)throw new Error("goToYear() requires a valid year (1000-9999). Got: "+e);const r=l(this,Ne,kt).call(this,a)||l(this,Ye,jt).call(this),o=this.getDisplayedMonths();let i;r==="right"&&o.length>=2?i=o[1].month:r==="left"&&o.length>=1?i=o[0].month:i=o.length>0?o[0].month:new Date().getMonth(),l(this,Be,xt).call(this,i,e,r)}goToDate(t){if(!t||typeof t!="object")throw new Error("Option param expect an object");const{date:e,side:a}=t;let r;if(e instanceof Date)r=new Date(e);else if(typeof e=="string")r=new Date(e);else throw new Error("Date param expect a Date object or date string. Got: "+typeof e);if(isNaN(r.getTime()))throw new Error("Date param expect a valid date. Got: "+e);const o=l(this,Ne,kt).call(this,a)||l(this,Ye,jt).call(this),i=r.getMonth(),n=r.getFullYear();l(this,Be,xt).call(this,i,n,o)}resetSelection(){l(this,wt,Ha).call(this)}reset(){l(this,wt,Ha).call(this)}selectDate(t){l(this,Ge,Kt).call(this,t)}};ee=new WeakMap;Ya=new WeakSet;Ur=function(){return l(this,Bt,vo).call(this)?l(this,bo,Jr).call(this):l(this,Nt,fo).call(this,!0)};Na=new WeakSet;Hr=function(){return l(this,Nt,fo).call(this)};Nt=new WeakSet;fo=function(t=!1){if(this.displayedMonths.length===0){const a=new Date;this.displayedMonths=[{month:a.getMonth(),year:a.getFullYear()}]}const e=this.displayedMonths[0];return c`
            <div class="calendar-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${l(this,Ve,Ot).call(this,{month:e.month,year:e.year,side:"single",forceMode:t?"range":this.mode})}
            </div>
        `};bo=new WeakSet;Jr=function(){if(this.displayedMonths.length!==2){if(this.displayedMonths.length===1){const e=this.displayedMonths[0],a=new Date(e.year,e.month+1,1);this.displayedMonths=[e,{month:a.getMonth(),year:a.getFullYear()}]}else if(this.displayedMonths.length===0){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1);this.displayedMonths=[{month:e.getMonth(),year:e.getFullYear()},{month:a.getMonth(),year:a.getFullYear()}]}}const t=this.displayedMonths;return c`
            <div class="calendar-range-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${l(this,Ve,Ot).call(this,{month:t[0].month,year:t[0].year,side:"left"})}
                ${l(this,Ve,Ot).call(this,{month:t[1].month,year:t[1].year,side:"right"})}
            </div>
        `};Ve=new WeakSet;Ot=function(t){const{month:e,year:a,side:r,forceMode:o}=t,i=l(this,Jt,Po).call(this,r),n=this.picker.open&&this.picker.index===i,u=o??this.mode;return c`
            <div class="calendar-side" data-side=${r}>
                <calendar-header
                    month=${e}
                    year=${a}
                    .monthNames=${this.monthNames}
                    ?disabled=${this.disabled}
                    ?monthPickerOpen=${this.picker.open&&this.picker.type==="month"&&n}
                    ?yearPickerOpen=${this.picker.open&&this.picker.type==="year"&&n}
                    side=${r}
                    @navigate=${l(this,Do,ai)}
                    @month-picker=${l(this,_o,oi)}
                    @year-picker=${l(this,Co,ri)}
                ></calendar-header>
                <calendar-grid
                    month=${e}
                    year=${a}
                    .weekDays=${this.weekDays}
                    firstDayOfWeek=${this.firstDayOfWeek}
                    mode=${u}
                    ?showToday=${this.showToday}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    minDate=${this.minDate||""}
                    maxDate=${this.maxDate||""}
                    .disabledDates=${this.disabledDates}
                    .selectedDate=${this.selectedDate}
                    .selectedStartDate=${this.selectedStartDate}
                    .selectedEndDate=${this.selectedEndDate}
                    .hoverDate=${this.hoverDate}
                    .focusedDate=${this.focusedDate}
                    side=${r}
                    @date-click=${l(this,Mo,ii)}
                    @date-hover=${l(this,Eo,ni)}
                    @date-leave=${l(this,zo,si)}
                ></calendar-grid>
                ${this.picker.open&&this.picker.type==="month"&&n?c`
                          <calendar-month-picker
                              selectedMonth=${e}
                              .monthNames=${this.monthNames}
                              ?disabled=${this.disabled}
                              @month-selected=${l(this,Ao,li)}
                              @click=${d=>d.stopPropagation()}
                          ></calendar-month-picker>
                      `:this.picker.open&&this.picker.type==="year"&&n?c`
                            <calendar-year-picker
                                selectedYear=${a}
                                ?disabled=${this.disabled}
                                @year-selected=${l(this,Oo,ci)}
                                @click=${d=>d.stopPropagation()}
                            ></calendar-year-picker>
                        `:v}
            </div>
        `};Ba=new WeakSet;qr=function(){window.addEventListener("resize",Se(this,Pt)),l(this,Tt,go).call(this)};Bt=new WeakSet;vo=function(){if(this.mode!=="range")return!1;const t=this.rangeCalendars;return t==="2"?!0:t==="1"?!1:this.autoDual};yo=new WeakSet;Kr=function(){var r;if(this.rangeCalendars!=="auto"||this.mode!=="range")return;const t=(r=this.parentElement)==null?void 0:r.getBoundingClientRect().width,e=this.getBoundingClientRect(),a=t||e.width||window.innerWidth;l(this,wo,Vr).call(this,a)};Tt=new WeakSet;go=function(){Se(this,ee)&&clearTimeout(Se(this,ee)),Ir(this,ee,window.setTimeout(()=>{l(this,yo,Kr).call(this)},16))};wo=new WeakSet;Vr=function(t){const e=t>=p.AUTO_DUAL_THRESHOLD;e!==this.autoDual&&(this.autoDual=e,l(this,jo,Gr).call(this),this.requestUpdate())};jo=new WeakSet;Gr=function(){if(this.mode==="range")if(this.autoDual&&this.displayedMonths.length===1){const t=this.displayedMonths[0],e=new Date(t.year,t.month+1,1);this.displayedMonths=[t,{month:e.getMonth(),year:e.getFullYear()}]}else!this.autoDual&&this.displayedMonths.length===2&&(this.displayedMonths=[this.displayedMonths[0]])};Pt=new WeakMap;Ia=new WeakSet;Xr=function(t){if(this.disabled||this.picker.open)return;const e=t.key;let a=!1;const r=this.focusedDate||this.selectedDate||new Date;switch(e){case"ArrowLeft":l(this,ke,Le).call(this,r,-1),a=!0;break;case"ArrowRight":l(this,ke,Le).call(this,r,1),a=!0;break;case"ArrowUp":l(this,ke,Le).call(this,r,-7),a=!0;break;case"ArrowDown":l(this,ke,Le).call(this,r,7),a=!0;break;case"Home":l(this,ko,Zr).call(this,r),a=!0;break;case"End":l(this,xo,Qr).call(this,r),a=!0;break;case"PageUp":t.ctrlKey?l(this,xe,Re).call(this,r,-12):l(this,xe,Re).call(this,r,-1),a=!0;break;case"PageDown":t.ctrlKey?l(this,xe,Re).call(this,r,12):l(this,xe,Re).call(this,r,1),a=!0;break;case"Enter":case" ":this.focusedDate&&(l(this,Ge,Kt).call(this,this.focusedDate),a=!0);break;case"Escape":l(this,So,ti).call(this),a=!0;break;case"t":case"T":!t.ctrlKey&&!t.altKey&&!t.metaKey&&(l(this,$o,ei).call(this),a=!0);break}a&&(t.preventDefault(),t.stopPropagation())};ke=new WeakSet;Le=function(t,e){const a=new Date(t);a.setDate(a.getDate()+e),l(this,me,Ae).call(this,a)};xe=new WeakSet;Re=function(t,e){const a=new Date(t);a.setMonth(a.getMonth()+e),l(this,me,Ae).call(this,a)};ko=new WeakSet;Zr=function(t){const e=new Date(t),a=e.getDay(),r=this.firstDayOfWeek==="monday"?a===0?6:a-1:a;e.setDate(e.getDate()-r),l(this,me,Ae).call(this,e)};xo=new WeakSet;Qr=function(t){const e=new Date(t),a=e.getDay(),r=this.firstDayOfWeek==="monday"?a===0?0:7-a:6-a;e.setDate(e.getDate()+r),l(this,me,Ae).call(this,e)};$o=new WeakSet;ei=function(){const t=new Date;l(this,me,Ae).call(this,t),this.displayedMonths=[{month:t.getMonth(),year:t.getFullYear()}]};me=new WeakSet;Ae=function(t){this.focusedDate=t;const e=t.getMonth(),a=t.getFullYear(),r=this.displayedMonths[0];if((!r||r.month!==e||r.year!==a)&&(this.displayedMonths=[{month:e,year:a}]),this.announceSelections){const o=g.formatDate(t);l(this,ot,It).call(this,`Focused on ${o}`)}};So=new WeakSet;ti=function(){this.picker.open?l(this,rt,Ht).call(this):this.focusedDate=void 0};ot=new WeakSet;It=function(t){this.announcementText=t,setTimeout(()=>{this.announcementText=""},1e3)};B=new WeakSet;H=function(){if(this.displayedMonths.length===0){let t;if(this.mode==="single"&&this.selectedDate?t=this.selectedDate:this.mode==="range"&&this.selectedStartDate&&(t=this.selectedStartDate),t)this.displayedMonths=[{month:t.getMonth(),year:t.getFullYear()}];else{const e=new Date;this.displayedMonths=[{month:e.getMonth(),year:e.getFullYear()}]}}if(this.mode==="range"&&l(this,Bt,vo).call(this)&&this.displayedMonths.length===1){const t=this.displayedMonths[0],e=new Date(t.year,t.month+1,1);this.displayedMonths=[t,{month:e.getMonth(),year:e.getFullYear()}]}};gt=new WeakSet;Ua=function(){this.value&&this.mode==="single"?(this.selectedDate=new Date(this.value),this.displayedMonths=[{month:this.selectedDate.getMonth(),year:this.selectedDate.getFullYear()}]):this.startDate&&this.mode==="range"&&(this.selectedStartDate=new Date(this.startDate),this.displayedMonths=[{month:this.selectedStartDate.getMonth(),year:this.selectedStartDate.getFullYear()}],this.endDate&&(this.selectedEndDate=new Date(this.endDate)))};Do=new WeakSet;ai=function(t){const{direction:e,side:a}=t.detail;l(this,Fo,di).call(this,e,a)};_o=new WeakSet;oi=function(t){const{side:e}=t.detail;l(this,Ut,To).call(this,"month",e)};Co=new WeakSet;ri=function(t){const{side:e}=t.detail;l(this,Ut,To).call(this,"year",e)};Mo=new WeakSet;ii=function(t){const{date:e}=t.detail;l(this,Ge,Kt).call(this,e)};Eo=new WeakSet;ni=function(t){const{date:e}=t.detail;this.mode==="range"&&this.selectedStartDate&&!this.selectedEndDate&&(this.hoverDate=e)};zo=new WeakSet;si=function(){this.hoverDate=void 0};Ao=new WeakSet;li=function(t){const{month:e}=t.detail,a=l(this,qt,Wo).call(this,this.picker.index);l(this,Lo,hi).call(this,e,a),l(this,rt,Ht).call(this)};Oo=new WeakSet;ci=function(t){const{year:e}=t.detail,a=l(this,qt,Wo).call(this,this.picker.index);l(this,Ro,pi).call(this,e,a),l(this,rt,Ht).call(this)};Ut=new WeakSet;To=function(t,e){this.picker={open:!0,type:t,index:l(this,Jt,Po).call(this,e)}};rt=new WeakSet;Ht=function(){this.picker.open&&(this.picker={open:!1,type:void 0,index:0})};Jt=new WeakSet;Po=function(t){return t==="single"||t==="left"?0:1};qt=new WeakSet;Wo=function(t){return this.mode!=="range"?"single":t===0?"left":"right"};Fo=new WeakSet;di=function(t,e){if(e==="single"){const o=this.displayedMonths[0],i=new Date(o.year,o.month+t,1);this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()}];return}this.displayedMonths.length<2&&l(this,B,H).call(this);const[a,r]=this.displayedMonths;if(e==="left"){const o=new Date(a.year,a.month+t,1),i=new Date(o.getFullYear(),o.getMonth()+1,1);this.displayedMonths=[{month:o.getMonth(),year:o.getFullYear()},{month:i.getMonth(),year:i.getFullYear()}]}else{const o=new Date(r.year,r.month+t,1),i=new Date(o.getFullYear(),o.getMonth()-1,1);this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()},{month:o.getMonth(),year:o.getFullYear()}]}};Lo=new WeakSet;hi=function(t,e){var r,o;if(this.displayedMonths.length===0&&l(this,B,H).call(this),this.displayedMonths.length===0||!this.displayedMonths[0]){const i=new Date;this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()}]}if(e==="single"){const i=((r=this.displayedMonths[0])==null?void 0:r.year)??new Date().getFullYear();this.displayedMonths=[{month:t,year:i}];return}if(this.displayedMonths.length<2&&l(this,B,H).call(this),this.displayedMonths.length<2){const i=this.displayedMonths[0],n=new Date((i==null?void 0:i.year)??new Date().getFullYear(),((i==null?void 0:i.month)??new Date().getMonth())+1,1);this.displayedMonths=[i??{month:new Date().getMonth(),year:new Date().getFullYear()},{month:n.getMonth(),year:n.getFullYear()}]}const[a]=this.displayedMonths;if(e==="left"){const i={month:t,year:(a==null?void 0:a.year)??new Date().getFullYear()},n=new Date(i.year,i.month+1,1);this.displayedMonths=[i,{month:n.getMonth(),year:n.getFullYear()}]}else{const i=((o=this.displayedMonths[1])==null?void 0:o.year)??new Date().getFullYear(),n={month:t,year:i},u=new Date(n.year,n.month-1,1);this.displayedMonths=[{month:u.getMonth(),year:u.getFullYear()},n]}};Ro=new WeakSet;pi=function(t,e){var a,r,o;if(this.displayedMonths.length===0&&l(this,B,H).call(this),this.displayedMonths.length===0||!this.displayedMonths[0]){const i=new Date;this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()}]}if(e==="single"){const i=((a=this.displayedMonths[0])==null?void 0:a.month)??new Date().getMonth();this.displayedMonths=[{month:i,year:t}];return}if(this.displayedMonths.length<2&&l(this,B,H).call(this),this.displayedMonths.length<2){const i=this.displayedMonths[0],n=new Date(i.year,i.month+1,1);this.displayedMonths=[i,{month:n.getMonth(),year:n.getFullYear()}]}if(e==="left"){const i={month:((r=this.displayedMonths[0])==null?void 0:r.month)??new Date().getMonth(),year:t},n=new Date(t,i.month+1,1);this.displayedMonths=[i,{month:n.getMonth(),year:n.getFullYear()}]}else{const i={month:((o=this.displayedMonths[1])==null?void 0:o.month)??new Date().getMonth(),year:t},n=new Date(t,i.month-1,1);this.displayedMonths=[{month:n.getMonth(),year:n.getFullYear()},i]}};wt=new WeakSet;Ha=function(){this.selectedDate=void 0,this.selectedStartDate=void 0,this.selectedEndDate=void 0,this.hoverDate=void 0,this.value=void 0,this.startDate=void 0,this.endDate=void 0,this.picker={open:!1,type:void 0,index:0},this.displayedMonths=[],this.autoDual=!1,l(this,B,H).call(this)};Ge=new WeakSet;Kt=function(t){g.isDateDisabled(t,this.disabled,this.minDate||"",this.maxDate||"",this.disabledDates)||(this.mode==="single"?(this.selectedDate=t,this.value=g.formatDate(t),l(this,Wt,Ja).call(this),l(this,Yo,ui).call(this)):this.mode==="range"&&(!this.selectedStartDate||this.selectedStartDate&&this.selectedEndDate?(this.selectedStartDate=t,this.selectedEndDate=void 0,this.startDate=g.formatDate(t),this.endDate=void 0):this.selectedStartDate&&!this.selectedEndDate&&(t<this.selectedStartDate?(this.selectedEndDate=this.selectedStartDate,this.selectedStartDate=t,this.endDate=g.formatDate(this.selectedEndDate),this.startDate=g.formatDate(this.selectedStartDate)):(this.selectedEndDate=t,this.endDate=g.formatDate(t)),l(this,Wt,Ja).call(this),l(this,No,mi).call(this))))};Wt=new WeakSet;Ja=function(){if(this.name){if(this.mode==="single"&&this.value)this.updateFormData({name:this.name,value:this.value});else if(this.mode==="range"&&this.startDate&&this.endDate){const t=JSON.stringify({start:this.startDate,end:this.endDate});this.updateFormData({name:this.name,value:t})}}};Yo=new WeakSet;ui=function(){const t={date:this.value?new Date(this.value):void 0,value:this.value};if(this.announceSelections&&this.value){const e=g.formatDate(new Date(this.value));l(this,ot,It).call(this,`Selected ${e}`)}this.dispatchEvent(new CustomEvent("date-selected",{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0}))};No=new WeakSet;mi=function(){const t={startDate:this.startDate?new Date(this.startDate):void 0,endDate:this.endDate?new Date(this.endDate):void 0,startDateValue:this.startDate,endDateValue:this.endDate};if(this.announceSelections&&this.startDate&&this.endDate){const e=g.formatDate(new Date(this.startDate)),a=g.formatDate(new Date(this.endDate));l(this,ot,It).call(this,`Selected date range from ${e} to ${a}`)}this.dispatchEvent(new CustomEvent("range-selected",{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0}))};Ye=new WeakSet;jt=function(){return this.mode==="single"||this.rangeCalendars==="1"?"single":"left"};Ne=new WeakSet;kt=function(t){return t==="single"||t==="left"||t==="right"?t:null};Be=new WeakSet;xt=function(t,e,a){if(this.displayedMonths.length===0&&l(this,B,H).call(this),a==="single"){this.displayedMonths=[{month:t,year:e}];return}if(this.displayedMonths.length<2&&l(this,B,H).call(this),a==="left"){const r={month:t,year:e},o=new Date(e,t+1,1);this.displayedMonths=[r,{month:o.getMonth(),year:o.getFullYear()}]}else{const r={month:t,year:e},o=new Date(e,t-1,1);this.displayedMonths=[{month:o.getMonth(),year:o.getFullYear()},r]}};qa=new WeakSet;fi=function(t,e){let a=t.month+e,r=t.year;for(;a>11;)a-=12,r++;for(;a<0;)a+=12,r--;return{month:a,year:r}};p.AUTO_DUAL_THRESHOLD=720;p.styles=[S`
            :host {
                display: inline-block;
                font-family: var(--mjo-calendar-font-family, var(--mjo-font-family, inherit));
                min-width: max-content;
            }

            :host([disabled]) {
                pointer-events: none;
                opacity: 0.6;
            }
            .calendar {
                position: relative;
                min-width: max-content;
            }
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }

            .calendar-container,
            .calendar-range-container {
                position: relative;
                background: var(--mjo-calendar-background, var(--mjo-background-color, white));
                border: var(--mjo-calendar-border, 1px solid var(--mjo-border-color, #e0e0e0));
                border-radius: var(--mjo-calendar-border-radius, var(--mjo-radius, 8px));
                box-shadow: var(--mjo-calendar-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
                padding: var(--mjo-calendar-padding, 16px);
                font-size: calc(var(--mjo-font-size-small, 14px) - 3px);
                min-width: max-content;
            }

            .calendar-range-container {
                display: flex;
                gap: 24px;
            }

            .calendar-side {
                flex: 1;
                min-width: max-content;
            }

            calendar-month-picker,
            calendar-year-picker {
                position: absolute;
                inset: 0;
                z-index: 1;
                background: var(--mjo-calendar-picker-background, var(--mjo-background-color, white));
                border-radius: var(--mjo-calendar-picker-radius, var(--mjo-radius, 8px));
                box-shadow: var(--mjo-calendar-picker-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
            }

            /* Size variations */
            [data-size="small"] {
                font-size: calc(var(--mjo-font-size-xsmall, 10px) - 1px);
            }

            [data-size="large"] {
                font-size: calc(var(--mjo-font-size, 16px) - 3px);
            }

            [data-color="secondary"] calendar-header,
            [data-color="secondary"] calendar-month-picker,
            [data-color="secondary"] calendar-year-picker {
                --mjo-button-primary-color: var(--mjo-secondary-color, #cc3d74);
                --mjo-button-secondary-foreground-color: var(--mjo-secondary-foreground-color, #ffffff);
                --mjo-calendar-picker-button-selected-background: var(--mjo-secondary-color, #cc3d74);
                --mjo-calendar-picker-button-selected-border: var(--mjo-secondary-color, #cc3d74);
                --mjo-calendar-picker-button-selected-color: var(--mjo-secondary-foreground-color, #ffffff);
                --mjo-calendar-picker-button-hover-background: var(--mjo-secondary-color-alpha2, #cc3d74);
                --mjo-calendar-picker-button-hover-border: var(--mjo-secondary-color, #cc3d74);
                --mjo-calendar-nav-hover-background: var(--mjo-secondary-color-alpha2, #cc3d74);
                --mjo-calendar-nav-hover-border: var(--mjo-secondary-color, #cc3d74);
            }

            /* Color variations */
            [data-color="secondary"] calendar-grid {
                --mjo-calendar-today-background: var(--mjo-calendar-today-background-secondary, var(--mjo-secondary-color-alpha2, rgba(204, 61, 116, 0.1)));
                --mjo-calendar-today-color: var(--mjo-calendar-today-color-secondary, var(--mjo-secondary-color, #cc3d74));
                --mjo-calendar-selected-background: var(--mjo-calendar-selected-background-secondary, var(--mjo-secondary-color, #cc3d74));
                --mjo-calendar-selected-color: var(--mjo-calendar-selected-color-secondary, white);
                --mjo-calendar-range-endpoint-background: var(--mjo-calendar-selected-background-secondary, var(--mjo-secondary-color, #cc3d74));
                --mjo-calendar-range-endpoint-color: var(--mjo-calendar-selected-color-secondary, white);
                --mjo-calendar-range-background: var(--mjo-calendar-range-background-secondary, var(--mjo-secondary-color-alpha1, rgba(204, 61, 116, 0.2)));
                --mjo-calendar-range-color: var(--mjo-calendar-range-color-secondary, var(--mjo-secondary-color, #cc3d74));
            }
        `];m([s({type:String})],p.prototype,"mode",2);m([s({type:String})],p.prototype,"name",2);m([s({type:String})],p.prototype,"value",2);m([s({type:String})],p.prototype,"startDate",2);m([s({type:String})],p.prototype,"endDate",2);m([s({type:String})],p.prototype,"locale",2);m([s({type:String})],p.prototype,"minDate",2);m([s({type:String})],p.prototype,"maxDate",2);m([s({type:Boolean,reflect:!0})],p.prototype,"disabled",2);m([s({type:String})],p.prototype,"size",2);m([s({type:String})],p.prototype,"color",2);m([s({type:Array})],p.prototype,"disabledDates",2);m([s({type:Boolean})],p.prototype,"showToday",2);m([s({type:String})],p.prototype,"firstDayOfWeek",2);m([s({type:String})],p.prototype,"rangeCalendars",2);m([s({type:Array})],p.prototype,"eventMarkers",2);m([s({type:Boolean})],p.prototype,"enableKeyboardNavigation",2);m([s({type:Boolean})],p.prototype,"announceSelections",2);m([s({type:String,attribute:"aria-labelledby"})],p.prototype,"ariaLabelledby",2);m([s({type:String,attribute:"aria-describedby"})],p.prototype,"ariaDescribedby",2);m([s({type:String,attribute:"aria-live"})],p.prototype,"ariaLive",2);m([z()],p.prototype,"selectedDate",2);m([z()],p.prototype,"selectedStartDate",2);m([z()],p.prototype,"selectedEndDate",2);m([z()],p.prototype,"hoverDate",2);m([z()],p.prototype,"picker",2);m([z()],p.prototype,"autoDual",2);m([z()],p.prototype,"displayedMonths",2);m([z()],p.prototype,"focusedDate",2);m([z()],p.prototype,"announcementText",2);p=m([D("mjo-calendar")],p);var Hn=Object.defineProperty,Jn=Object.getOwnPropertyDescriptor,Bo=(t,e,a,r)=>{for(var o=r>1?void 0:r?Jn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Hn(e,a,o),o};let Xe=class extends J(y){constructor(){super(...arguments),this.radius="medium"}render(){return c`<div class="content"><slot></slot></div>`}connectedCallback(){super.connectedCallback(),this.contrast&&this.setAttribute("contrast",this.contrast),this.radius&&this.setAttribute("radius",this.radius)}setContrast(t){this.contrast=t,this.setAttribute("contrast",t)}setRadius(t){this.radius=t,this.setAttribute("radius",t)}};Xe.styles=[S`
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
        `];Bo([s({type:String,noAccessor:!0})],Xe.prototype,"contrast",2);Bo([s({type:String,noAccessor:!0})],Xe.prototype,"radius",2);Xe=Bo([D("mjo-card")],Xe);var qn=Object.defineProperty,Kn=Object.getOwnPropertyDescriptor,ut=(t,e,a,r)=>{for(var o=r>1?void 0:r?Kn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&qn(e,a,o),o};const Vn=t=>{class e extends t{constructor(){super(...arguments),this.error=!1,this.success=!1}}return ut([s({type:Boolean})],e.prototype,"error",2),ut([s({type:String})],e.prototype,"errormsg",2),ut([s({type:Boolean})],e.prototype,"success",2),ut([s({type:String})],e.prototype,"successmsg",2),e};var Gn=Object.defineProperty,Xn=Object.getOwnPropertyDescriptor,Io=(t,e,a,r)=>{for(var o=r>1?void 0:r?Xn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Gn(e,a,o),o};let Ze=class extends y{render(){return c`<div class="container">
            ${this.errormsg?c`<div class="error"><mjo-icon src=${eo}></mjo-icon>${this.errormsg}</div>`:this.successmsg?c`<div class="success"><mjo-icon src=${or}></mjo-icon>${this.successmsg}</div>`:c`<mjo-typography tag="none"><slot></slot></mjo-typography>`}
        </div>`}};Ze.styles=[S`
            :host {
                position: relative;
                display: block;
                text-align: left;
                font-size: var(
                    --mjo-radio-helper-font-size,
                    var(
                        --mjo-checkbox-helper-font-size,
                        var(--mjo-switch-helper-font-size, var(--mjo-textarea-helper-font-size, var(--mjo-input-helper-font-size, calc(1em * 0.8))))
                    )
                );
                font-weight: var(
                    --mjo-radio-helper-font-weight,
                    var(
                        --mjo-checkbox-helper-font-weight,
                        var(--mjo-switch-helper-font-weight, var(--mjo-textarea-helper-font-weight, var(--mjo-input-helper-font-weight, normal)))
                    )
                );
                color: var(
                    --mjo-radio-helper-color,
                    var(
                        --mjo-checkbox-helper-color,
                        var(--mjo-switch-helper-color, var(--mjo-textarea-helper-color, var(--mjo-input-helper-color, currentColor)))
                    )
                );
                line-height: calc(1em * 1.2);
                max-width: 100%;
            }
            .container {
                position: relative;
                max-width: 100%;
            }
            .error,
            .success {
                position: relative;
                display: flex;
                align-items: center;
                gap: 3px;
            }
            .error {
                color: var(--mjo-color-error, #d31616);
            }
            .success {
                color: var(--mjo-color-success, #56b15b);
            }
            mjo-icon {
                flex: 0 1 auto;
                font-size: 1em;
            }
        `];Io([s({type:String})],Ze.prototype,"errormsg",2);Io([s({type:String})],Ze.prototype,"successmsg",2);Ze=Io([D("input-helper-text")],Ze);var Zn=Object.defineProperty,Qn=Object.getOwnPropertyDescriptor,Y=(t,e,a,r)=>{for(var o=r>1?void 0:r?Qn(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&Zn(e,a,o),o},es=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},mt=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Ie=(t,e,a)=>(es(t,e,"access private method"),a),Ft,Uo,Ka,bi,Va,vi,Ga,yi;let T=class extends J(Vn(so(y))){constructor(){super(...arguments),mt(this,Ft),mt(this,Ka),mt(this,Va),mt(this,Ga),this.color="primary",this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.value="",this.hideErrors=!1,this.type="checkbox"}get computedAriaChecked(){return this.indeterminate?"mixed":this.checked?"true":"false"}get computedAriaLabel(){if(this.ariaLabel)return this.ariaLabel;if(!this.label)return;let t=this.label;return(this.required||this.ariaRequired)&&(t+=" (required)"),this.indeterminate?t+=" (partially selected)":this.checked?t+=" (checked)":t+=" (unchecked)",t}get computedTabIndex(){return this.disabled?-1:0}render(){return c`<div class="container" ?data-disabled=${this.disabled} data-color=${this.color}>
            <div
                class="checkbox-container"
                role="checkbox"
                aria-checked=${this.computedAriaChecked}
                aria-label=${R(this.computedAriaLabel)}
                aria-describedby=${R(this.ariaDescribedby)}
                aria-disabled=${this.disabled?"true":"false"}
                aria-invalid=${this.error?"true":"false"}
                tabindex=${this.computedTabIndex}
                @click=${Ie(this,Ft,Uo)}
                @keydown=${Ie(this,Ka,bi)}
                @focus=${Ie(this,Va,vi)}
                @blur=${Ie(this,Ga,yi)}
            >
                <div class="box">
                    <div class="checkbox" ?data-checked=${this.checked} ?data-indeterminate=${this.indeterminate}>
                        ${this.indeterminate?c`<mjo-icon src=${Pi}></mjo-icon>`:c`<mjo-icon src=${Wi}></mjo-icon>`}
                    </div>
                </div>
                ${this.label?c`<div class="label-container"><mjo-typography tag="none" class="label">${this.label}</mjo-typography></div>`:v}
                <input
                    id="mjoCheckboxInput"
                    type="checkbox"
                    name=${R(this.name)}
                    value=${R(this.value)}
                    ?checked=${this.checked}
                    .indeterminate=${this.indeterminate}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    aria-hidden="true"
                    tabindex="-1"
                />
            </div>
            ${this.helperText?c`<input-helper-text>${this.helperText}</input-helper-text> `:v}
            ${this.errormsg||this.successmsg?c`<input-helper-text .errormsg=${this.errormsg} .successmsg=${this.successmsg}></input-helper-text> `:v}
        </div>`}connectedCallback(){super.connectedCallback(),this.updateFormData({name:this.name||"",value:this.checked?this.value||"1":""})}getValue(){return this.checked?this.value||"1":""}setValue(t){this.value=t}setIndeterminate(t){this.indeterminate=t,this.inputElement.indeterminate=t,this.dispatchEvent(new CustomEvent("mjo-checkbox-indeterminate-change",{detail:{element:this,indeterminate:this.indeterminate,checked:this.checked},bubbles:!0,composed:!0})),this.updateFormData({name:this.name||"",value:this.getValue()})}reportValidity(){return this.inputElement.reportValidity()}setCustomValidity(t){this.inputElement.setCustomValidity(t)}};Ft=new WeakSet;Uo=function(){if(this.disabled)return;const t={checked:this.checked,indeterminate:this.indeterminate};this.indeterminate&&(this.indeterminate=!1,this.inputElement.indeterminate=!1),this.checked=!this.checked,this.updateFormData({name:this.name||"",value:this.getValue()}),this.dispatchEvent(new CustomEvent("change",{detail:{element:this,checked:this.checked,indeterminate:this.indeterminate,value:this.value,name:this.name||"",previousState:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("mjo-checkbox-change",{detail:{element:this,checked:this.checked,indeterminate:this.indeterminate,value:this.value,name:this.name||"",previousState:t},bubbles:!0,composed:!0}))};Ka=new WeakSet;bi=function(t){this.disabled||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),Ie(this,Ft,Uo).call(this))};Va=new WeakSet;vi=function(){this.disabled||this.dispatchEvent(new CustomEvent("mjo-checkbox-focus",{detail:{element:this},bubbles:!0,composed:!0}))};Ga=new WeakSet;yi=function(){this.dispatchEvent(new CustomEvent("mjo-checkbox-blur",{detail:{element:this},bubbles:!0,composed:!0}))};T.styles=[S`
            :host {
                display: inline-block;
                width: 200px;
            }
            .container {
                position: relative;
            }
            .container[data-disabled] {
                opacity: var(--mjo-checkbox-disabled-opacity, 0.5);
                cursor: not-allowed;
            }
            .container[data-disabled] input-helper-text,
            .container[data-disabled] .label {
                opacity: var(--mjo-checkbox-disabled-opacity, 0.5);
            }
            .checkbox-container {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                cursor: pointer;
                outline: none;
                border-radius: 0.25rem;
                transition: all 0.2s ease;
                outline-offset: 2px;
            }
            .checkbox-container:focus-visible {
                box-shadow: 0 0 0 3px var(--mjo-checkbox-focus-color, rgba(59, 130, 246, 0.1));
            }
            .container[data-color="primary"] .checkbox-container:focus-visible {
                outline: 2px solid var(--mjo-checkbox-focus-outline-color, var(--mjo-primary-color));
            }
            .container[data-color="secondary"] .checkbox-container:focus-visible {
                outline: 2px solid var(--mjo-checkbox-focus-outline-color, var(--mjo-secondary-color));
            }
            .container[data-disabled] .checkbox-container {
                cursor: not-allowed;
            }
            .box {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
            }
            .checkbox {
                position: relative;
                border: solid 2px var(--mjo-checkbox-border-color, var(--mjo-foreground-color-low, rgb(51, 51, 51)));
                border-radius: 0.2rem;
                line-height: 0;
                transition: all 0.3s ease;
                width: 1.3rem;
                height: 1.3rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            mjo-icon {
                transform: scale(0);
                transition: transform 0.3s ease;
                font-size: 1.3rem;
            }
            .checkbox[data-checked] {
                color: var(--mjo-checkbox-checked-color, var(--mjo-primary-color));
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-primary-color)));
                background-color: var(--mjo-checkbox-checked-background-color, transparent);
            }
            .container[data-color="secondary"] .checkbox[data-checked] {
                color: var(--mjo-checkbox-checked-color, var(--mjo-secondary-color));
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-secondary-color)));
                background-color: var(--mjo-checkbox-checked-background-color, transparent);
            }
            .checkbox[data-checked] mjo-icon {
                transform: scale(1);
            }
            .checkbox[data-indeterminate] {
                color: var(--mjo-checkbox-indeterminate-color, var(--mjo-checkbox-checked-color, var(--mjo-primary-color)));
                border-color: var(--mjo-checkbox-indeterminate-border-color, var(--mjo-checkbox-indeterminate-color, var(--mjo-primary-color)));
                background-color: var(--mjo-checkbox-indeterminate-background-color, transparent);
            }
            .checkbox[data-indeterminate] mjo-icon {
                transform: scale(1);
            }
            .label-container {
                position: relative;
                align-self: stretch;
                display: flex;
                align-items: center;
            }
            .label {
                position: relative;
                padding-left: var(--mjo-space-small, 5px);
                user-select: none;
                color: var(--mjo-checkbox-label-color, inherit);
                font-size: var(--mjo-checkbox-label-font-size, inherit);
                font-weight: var(--mjo-checkbox-label-font-weight, inherit);
            }
            input {
                display: none;
            }
            input-helper-text {
                padding-left: calc(calc(1.3rem + var(--mjo-space-small, 5px)) + 2px);
                color: var(--mjo-checkbox-helper-color, var(--mjo-foreground-color-low));
                font-size: var(--mjo-checkbox-helper-font-size, inherit);
                font-weight: var(--mjo-checkbox-helper-font-weight, inherit);
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .checkbox-container,
                .checkbox,
                mjo-icon {
                    transition: none;
                }
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .checkbox {
                    border-width: 3px;
                }
                .checkbox-container:focus-visible {
                    outline-width: 3px;
                }
            }
        `];Y([s({type:String})],T.prototype,"color",2);Y([s({type:Boolean,reflect:!0})],T.prototype,"checked",2);Y([s({type:Boolean,reflect:!0})],T.prototype,"disabled",2);Y([s({type:Boolean,reflect:!0})],T.prototype,"indeterminate",2);Y([s({type:String})],T.prototype,"helperText",2);Y([s({type:String})],T.prototype,"label",2);Y([s({type:String})],T.prototype,"name",2);Y([s({type:String})],T.prototype,"value",2);Y([s({type:String,reflect:!0})],T.prototype,"checkgroup",2);Y([s({type:Boolean})],T.prototype,"hideErrors",2);Y([s({type:String,attribute:"aria-describedby"})],T.prototype,"ariaDescribedby",2);Y([X("input#mjoCheckboxInput")],T.prototype,"inputElement",2);Y([X(".checkbox-container")],T.prototype,"checkboxContainer",2);T=Y([D("mjo-checkbox")],T);var ts=Object.defineProperty,as=Object.getOwnPropertyDescriptor,N=(t,e,a,r)=>{for(var o=r>1?void 0:r?as(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&ts(e,a,o),o},os=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ft=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},ce=(t,e,a)=>(os(t,e,"access private method"),a),Xa,gi,Za,wi,Lt,Ho,Qe,Vt;let P=class extends J(y){constructor(){super(...arguments),ft(this,Xa),ft(this,Za),ft(this,Lt),ft(this,Qe),this.closable=!1,this.clickable=!1,this.disabled=!1,this.color="default",this.label="",this.radius="full",this.size="medium",this.variant="solid"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.clickable&&this.closable?`${this.label}. Clickable chip with close button`:this.clickable?`${this.label}. Click to interact`:this.closable?`${this.label}. Press to close`:`Chip: ${this.label}`}get computedTabIndex(){return this.disabled?-1:this.clickable||this.closable?this.tabIndex??0:-1}render(){return c`<div
            class="container"
            role=${R(this.clickable||this.closable?"button":void 0)}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${R(this.ariaDescribedby)}
            aria-disabled=${this.disabled?"true":"false"}
            tabindex=${this.computedTabIndex}
            data-color=${this.color}
            data-size=${this.size}
            data-variant=${this.variant}
            data-radius=${this.radius}
            ?data-closable=${this.closable}
            ?data-clickable=${this.clickable}
            ?data-disabled=${this.disabled}
            @click=${ce(this,Lt,Ho)}
            @keydown=${ce(this,Xa,gi)}
        >
            ${this.variant==="dot"?c`<span class="dot"></span>`:v}
            ${this.startIcon?c`<mjo-icon src=${this.startIcon}></mjo-icon>`:v}
            <mjo-typography tag="span" class="label">${this.label}</mjo-typography>
            ${this.endIcon?c`<mjo-icon src=${this.endIcon}></mjo-icon>`:v}
            ${this.closable?c`<mjo-icon
                      class="close"
                      src=${eo}
                      @click=${ce(this,Qe,Vt)}
                      @keydown=${ce(this,Za,wi)}
                      role="button"
                      tabindex=${this.disabled?"-1":"0"}
                      aria-label="Close ${this.label}"
                  ></mjo-icon>`:v}
        </div>`}};Xa=new WeakSet;gi=function(t){this.disabled||(t.key==="Escape"&&this.closable&&(t.preventDefault(),ce(this,Qe,Vt).call(this,t)),(t.key==="Enter"||t.key===" ")&&this.clickable&&(t.preventDefault(),ce(this,Lt,Ho).call(this)))};Za=new WeakSet;wi=function(t){this.disabled||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),t.stopPropagation(),ce(this,Qe,Vt).call(this,t))};Lt=new WeakSet;Ho=async function(){!this.clickable||this.disabled||(this.dispatchEvent(new CustomEvent("mjo-chip-click",{bubbles:!0,composed:!0,detail:{value:this.value||this.label}})),this.container&&(this.container.style.transform="scale(0.95)",await De(100),this.container.style.transform="scale(1.02)",await De(150),this.container.removeAttribute("style")))};Qe=new WeakSet;Vt=function(t){this.disabled||(t&&t.stopPropagation(),this.dispatchEvent(new CustomEvent("mjo-chip-close",{bubbles:!0,composed:!0,detail:{value:this.value||this.label}})),this.remove())};P.styles=[S`
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
        `];N([s({type:Boolean})],P.prototype,"closable",2);N([s({type:Boolean})],P.prototype,"clickable",2);N([s({type:Boolean})],P.prototype,"disabled",2);N([s({type:String})],P.prototype,"color",2);N([s({type:String})],P.prototype,"endIcon",2);N([s({type:String})],P.prototype,"label",2);N([s({type:String})],P.prototype,"radius",2);N([s({type:String})],P.prototype,"size",2);N([s({type:String})],P.prototype,"startIcon",2);N([s({type:String})],P.prototype,"value",2);N([s({type:String})],P.prototype,"variant",2);N([s({type:String,attribute:"aria-describedby"})],P.prototype,"ariaDescribedby",2);N([X(".container")],P.prototype,"container",2);P=N([D("mjo-chip")],P);const rs={radiusLarge:"10px",radiusMedium:"5px",radiusSmall:"3px",fontSizeLarge:"1.5em",fontSizeXlarge:"1.75em",fontSizeXxlarge:"2em",fontSizeMedium:"1em",fontSizeSmall:"0.8em",fontSizeXsmall:"0.6em",fontSizeXxsmall:"0.4em",fontWeightBold:"700",fontWeightLight:"300",fontWeightRegular:"400",spaceXxsmall:"3px",spaceXsmall:"6px",spaceSmall:"8px",spaceMedium:"16px",spaceLarge:"24px",spaceXlarge:"32px",spaceXxlarge:"40px",colors:{white:"#ffffff",black:"#000000",warning:"#ff9800",success:"#4caf50",error:"#f44336",info:"#128ada",blue:{default:"#1d7fdb",alpha0:"#e3f2fd00",alpha1:"#e3f2fd11",alpha2:"#e3f2fd22",alpha3:"#e3f2fd33",alpha4:"#e3f2fd44",alpha5:"#e3f2fd55",alpha6:"#e3f2fd66",alpha7:"#e3f2fd77",alpha8:"#e3f2fd88",alpha9:"#e3f2fd99",50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#1d7fdb",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1"},cyan:{default:"#00bcd4",alpha0:"#00bcd400",alpha1:"#00bcd411",alpha2:"#00bcd422",alpha3:"#00bcd433",alpha4:"#00bcd444",alpha5:"#00bcd455",alpha6:"#00bcd466",alpha7:"#00bcd477",alpha8:"#00bcd488",alpha9:"#00bcd499",50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064"},green:{default:"#4caf50",alpha0:"#4caf5000",alpha1:"#4caf5011",alpha2:"#4caf5022",alpha3:"#4caf5033",alpha4:"#4caf5044",alpha5:"#4caf5055",alpha6:"#4caf5066",alpha7:"#4caf5077",alpha8:"#4caf5088",alpha9:"#4caf5099",50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"},purple:{default:"#9c27b0",alpha0:"#9c27b000",alpha1:"#9c27b011",alpha2:"#9c27b022",alpha3:"#9c27b033",alpha4:"#9c27b044",alpha5:"#9c27b055",alpha6:"#9c27b066",alpha7:"#9c27b077",alpha8:"#9c27b088",alpha9:"#9c27b099",50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c"},red:{default:"#f44336",alpha0:"#f4433600",alpha1:"#f4433611",alpha2:"#f4433622",alpha3:"#f4433633",alpha4:"#f4433644",alpha5:"#f4433655",alpha6:"#f4433666",alpha7:"#f4433677",alpha8:"#f4433688",alpha9:"#f4433699",50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c"},yellow:{default:"#ffeb3b",alpha0:"#ffeb3b00",alpha1:"#ffeb3b11",alpha2:"#ffeb3b22",alpha3:"#ffeb3b33",alpha4:"#ffeb3b44",alpha5:"#ffeb3b55",alpha6:"#ffeb3b66",alpha7:"#ffeb3b77",alpha8:"#ffeb3b88",alpha9:"#ffeb3b99",50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17"},pink:{default:"#e91e63",alpha0:"#e91e6300",alpha1:"#e91e6311",alpha2:"#e91e6322",alpha3:"#e91e6333",alpha4:"#e91e6344",alpha5:"#e91e6355",alpha6:"#e91e6366",alpha7:"#e91e6377",alpha8:"#e91e6388",alpha9:"#e91e6399",50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f"},gray:{default:"#71717A",alpha0:"#71717A00",alpha1:"#71717A11",alpha2:"#71717A22",alpha3:"#71717A33",alpha4:"#71717A44",alpha5:"#71717A55",alpha6:"#71717A66",alpha7:"#71717A77",alpha8:"#71717A88",alpha9:"#71717A99",50:"#FAFAFA",100:"#F4F4F5",200:"#E4E4E7",300:"#D4D4D8",400:"#A1A1AA",500:"#71717A",600:"#52525B",700:"#3F3F46",800:"#27272A",900:"#18181B"}},dark:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#555555",low:"#444444",xlow:"#222222",high:"#666666",xhigh:"#888888"},backgroundColor:{hover:"#666666",default:"#151515",xlow:"#030303",low:"#111111",high:"#252525",xhigh:"#444444"},backgroundColorCard:{default:"#333333",xlow:"#111111",low:"#222222",high:"#555555",xhigh:"#666666"},foregroundColor:{default:"#f0f0f0",xlow:"#999999",low:"#bbbbbb",high:"#ffffff",xhigh:"#ffffff"}},light:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#dddddd",xlow:"#aaaaaa",low:"#cccccc",high:"#eeeeee",xhigh:"#f0f0f0"},backgroundColor:{hover:"#eeeeee",default:"#efefef",xlow:"#cccccc",low:"#dddddd",high:"#f6f6f6",xhigh:"#ffffff"},backgroundColorCard:{default:"#fafafa",xlow:"#ffffff",low:"#ffffff",high:"#e6e6e6",xhigh:"#dddddd"},foregroundColor:{default:"#333333",xlow:"#999999",low:"#666666",high:"#151515",xhigh:"#000000"}}},ji=({config:t,prefix:e="--mjo-",themeMode:a="dark"})=>{let r="";for(const o in t){const i=t[o];if((o==="dark"||o==="light")&&a!==o)continue;if(o==="colors"){r+=is(i);continue}if(typeof i=="object"&&i.default){r+=xi(i,`${e}${Ee(o)}`);continue}if(o==="components"){r+=ns(i);continue}if(typeof i=="object"){r+=ji({config:i,themeMode:a});continue}const n=`${e}${Ee(o)}`;r+=`${n}: ${i};`}return r},ki=(t,e)=>{for(const a in e)typeof e[a]=="object"&&t[a]?ki(t[a],e[a]):t[a]=e[a]},is=t=>{let e="";for(const a in t){const r=t[a];typeof r=="object"?e+=xi(r,`--mjo-color-${Ee(a)}`):e+=`--mjo-color-${a}: ${r};`}return e},xi=(t,e)=>{let a="";for(const r in t){let o=`${e}-${Ee(r)}`;r==="default"&&(o=`${e}`),a+=`${o}: ${t[r]};`}return a},ns=t=>{let e="";for(const a in t){const r=t[a];for(const o in r){const i=r[o];e+=`--${Ee(a)}-${Ee(o)}: ${i};`}}return e},Ee=t=>t.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase();var ss=Object.defineProperty,ls=Object.getOwnPropertyDescriptor,Gt=(t,e,a,r)=>{for(var o=r>1?void 0:r?ls(e,a):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(o=(r?n(e,a,o):n(o))||o);return r&&o&&ss(e,a,o),o},$i=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},cs=(t,e,a)=>($i(t,e,"read from private field"),a?a.call(t):e.get(t)),ds=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},hs=(t,e,a,r)=>($i(t,e,"write to private field"),r?r.call(t,a):e.set(t,a),a),$t;let ze=class extends y{constructor(){super(...arguments),this.theme="light",this.scope="local",this.config={},ds(this,$t,!0)}render(){return hs(this,$t,!1),c`<slot></slot>`}connectedCallback(){super.connectedCallback(),be.get("mjo-theme")?be.get("mjo-theme")!==this.theme&&(this.theme=be.get("mjo-theme")):be.set("mjo-theme",this.theme,{expires:365}),this.applyTheme()}updated(t){t.has("theme")&&t.get("theme")&&t.get("theme")!==this.theme&&(cs(this,$t)||be.set("mjo-theme",this.theme,{expires:365}),this.applyTheme())}applyTheme(){var r,o;const t=structuredClone(rs);ki(t,this.config);let e=this.scope==="global"?":root {":":host {";e+=ji({config:t,themeMode:this.theme}),e+="}";let a;this.scope==="global"?(a=document.querySelector("#mjo-theme"),a||(a=document.createElement("style"),a.setAttribute("id","mjo-theme"),document.head.appendChild(a))):(a=(r=this.shadowRoot)==null?void 0:r.querySelector("#mjo-theme"),a||(a=document.createElement("style"),a.setAttribute("id","mjo-theme"),(o=this.shadowRoot)==null||o.appendChild(a))),a.innerHTML=e,this.dispatchEvent(new CustomEvent("mjo-theme-change",{detail:{theme:this.theme}}))}};$t=new WeakMap;ze.styles=[S`
            :host {
                display: block;
            }
        `];Gt([s({type:String})],ze.prototype,"theme",2);Gt([s({type:String})],ze.prototype,"scope",2);Gt([s({type:Object})],ze.prototype,"config",2);ze=Gt([D("mjo-theme")],ze);function Si(t=1){const e=document.querySelector("mjo-theme");if(!e){if(t>5){console.error("Failed to find mjo-theme component");return}setTimeout(()=>{Si(t+1)},100);return}let a=be.get("mjo-theme");e&&!a?a=e.theme||"light":a||(a="light");const r=document.querySelector(".theme-toggle");r&&(r.textContent=a==="dark"?"☀️":"🌙"),e.addEventListener("mjo-theme-change",o=>{const i=o.detail.theme;r&&(r.textContent=i==="dark"?"☀️":"🌙")})}window.toggleTheme=function(){const t=document.querySelector("mjo-theme");if(t){const a=t.theme==="light"?"dark":"light";t.theme=a}else console.warn("⚠️ mjo-theme component not found")};document.addEventListener("DOMContentLoaded",()=>{Si()});
//# sourceMappingURL=client.js.map
