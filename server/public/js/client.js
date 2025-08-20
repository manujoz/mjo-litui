var Pe=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)};var F=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)};var P=(t,e,a)=>(Pe(t,e,"access private method"),a);import{Q as Ae,R as ge,D as v,k as l,i as Oe,t as Te,e as Ue}from"./lit-core.js";import{c as Re}from"./index.js";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,ee=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol(),de=new WeakMap;let ye=class{constructor(e,a,o){if(this._$cssResult$=!0,o!==ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(ee&&e===void 0){const o=a!==void 0&&a.length===1;o&&(e=de.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&de.set(a,e))}return e}toString(){return this.cssText}};const Me=t=>new ye(typeof t=="string"?t:t+"",void 0,ae),k=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((o,r,s)=>o+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new ye(a,t,ae)},Le=(t,e)=>{if(ee)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const o=document.createElement("style"),r=O.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=a.cssText,t.appendChild(o)}},he=ee?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const o of e.cssRules)a+=o.cssText;return Me(a)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:De,defineProperty:We,getOwnPropertyDescriptor:Ie,getOwnPropertyNames:Be,getOwnPropertySymbols:Fe,getPrototypeOf:qe}=Object,g=globalThis,pe=g.trustedTypes,Ve=pe?pe.emptyScript:"",q=g.reactiveElementPolyfillSupport,C=(t,e)=>t,T={toAttribute(t,e){switch(e){case Boolean:t=t?Ve:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},te=(t,e)=>!De(t,e),fe={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:te};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);class x extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=fe){if(a.state&&(a.attribute=!1),this._$Ei(),this.elementProperties.set(e,a),!a.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,a);r!==void 0&&We(this.prototype,e,r)}}static getPropertyDescriptor(e,a,o){const{get:r,set:s}=Ie(this.prototype,e)??{get(){return this[a]},set(i){this[a]=i}};return{get(){return r==null?void 0:r.call(this)},set(i){const d=r==null?void 0:r.call(this);s.call(this,i),this.requestUpdate(e,d,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??fe}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=qe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const a=this.properties,o=[...Be(a),...Fe(a)];for(const r of o)this.createProperty(r,a[r])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[o,r]of a)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[a,o]of this.elementProperties){const r=this._$Eu(a,o);r!==void 0&&this._$Eh.set(r,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)a.unshift(he(r))}else e!==void 0&&a.push(he(e));return a}static _$Eu(e,a){const o=a.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const o of a.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostConnected)==null?void 0:o.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostDisconnected)==null?void 0:o.call(a)})}attributeChangedCallback(e,a,o){this._$AK(e,o)}_$EC(e,a){var s;const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const i=(((s=o.converter)==null?void 0:s.toAttribute)!==void 0?o.converter:T).toAttribute(a,o.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,a){var s;const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const i=o.getPropertyOptions(r),d=typeof i.converter=="function"?{fromAttribute:i.converter}:((s=i.converter)==null?void 0:s.fromAttribute)!==void 0?i.converter:T;this._$Em=r,this[r]=d.fromAttribute(a,i.type),this._$Em=null}}requestUpdate(e,a,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??te)(this[e],a))return;this.P(e,a,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,a,o){this._$AL.has(e)||this._$AL.set(e,a),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,i]of r)i.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],i)}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(o=this._$EO)==null||o.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(a)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(o=>{var r;return(r=o.hostUpdated)==null?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(a=>this._$EC(a,this[a]))),this._$EU()}updated(e){}firstUpdated(e){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[C("elementProperties")]=new Map,x[C("finalized")]=new Map,q==null||q({ReactiveElement:x}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class b extends x{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.o=Ae(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.o)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.o)==null||e.setConnected(!1)}render(){return ge}}var ve;b._$litElement$=!0,b.finalized=!0,(ve=globalThis.litElementHydrateSupport)==null||ve.call(globalThis,{LitElement:b});const V=globalThis.litElementPolyfillSupport;V==null||V({LitElement:b});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=t=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ne={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:te},Ke=(t=Ne,e,a)=>{const{kind:o,metadata:r}=a;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),s.set(a.name,t),o==="accessor"){const{name:i}=a;return{set(d){const h=e.get.call(this);e.set.call(this,d),this.requestUpdate(i,h,t)},init(d){return d!==void 0&&this.P(i,void 0,t),d}}}if(o==="setter"){const{name:i}=a;return function(d){const h=this[i];e.call(this,d),this.requestUpdate(i,h,t)}}throw Error("Unsupported decorator location: "+o)};function c(t){return(e,a)=>typeof a=="object"?Ke(t,e,a):((o,r,s)=>{const i=r.hasOwnProperty(s);return r.constructor.createProperty(s,i?{...o,wrapped:!0}:o),i?Object.getOwnPropertyDescriptor(r,s):void 0})(t,e,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Xe(t){return c({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const me=(t,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,a),a);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function He(t,e){return(a,o,r)=>{const s=i=>{var d;return((d=i.renderRoot)==null?void 0:d.querySelector(t))??null};if(e){const{get:i,set:d}=typeof o=="object"?a:r??(()=>{const h=Symbol();return{get(){return this[h]},set(j){this[h]=j}}})();return me(a,o,{get(){let h=i.call(this);return h===void 0&&(h=s(this),(h!==null||this.hasUpdated)&&d.call(this,h)),h}})}return me(a,o,{get(){return s(this)}})}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ue=t=>t??v;var Ze=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,Ge=(t,e,a,o)=>{for(var r=o>1?void 0:o?Je(e,a):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(r=(o?i(e,a,r):i(r))||r);return o&&r&&Ze(e,a,r),r};const D=t=>{var a,je,r,N;class e extends t{constructor(){super(...arguments);F(this,a);F(this,r);this.cssStyles=""}connectedCallback(){super.connectedCallback(),this.theme&&P(this,a,je).call(this)}}return a=new WeakSet,je=function(){var ce,le;const h=this.tagName.toLowerCase();for(const ne in this.theme){const Ee=this.theme[ne];this.cssStyles+=`--${P(this,r,N).call(this,h)}-${P(this,r,N).call(this,ne)}: ${Ee};`}let j=(ce=this.shadowRoot)==null?void 0:ce.querySelector("#mjo-theme");j||(j=document.createElement("style"),j.setAttribute("id","mjo-theme"),(le=this.shadowRoot)==null||le.appendChild(j)),j.innerHTML=`:host {${this.cssStyles}}`},r=new WeakSet,N=function(h){return h.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()},Ge([c({type:Object})],e.prototype,"theme",2),e},be=async t=>new Promise(e=>setTimeout(e,t));var Qe=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,p=(t,e,a,o)=>{for(var r=o>1?void 0:o?Ye(e,a):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(r=(o?i(e,a,r):i(r))||r);return o&&r&&Qe(e,a,r),r},ea=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},A=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},z=(t,e,a)=>(ea(t,e,"access private method"),a),K,we,X,$e,U,oe,H,xe;let n=class extends D(b){constructor(){super(...arguments),A(this,K),A(this,X),A(this,U),A(this,H),this.bordered=!1,this.disabled=!1,this.clickable=!1,this.nameColoured=!1,this.color="default",this.radius="full",this.size="medium",this.error=!1,this.initial=""}get appropriateRole(){return this.clickable?"button":this.src?"img":"presentation"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.clickable?`Click to interact with ${this.name||this.value||"avatar"}`:this.name?`Avatar for ${this.name}`:"Avatar"}render(){return this.initial=this.name?this.name[0].toLocaleUpperCase():"",l`<div
            class="container size-${this.size} radius-${this.radius} color-${this.color}"
            role=${this.appropriateRole}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${ue(this.ariaDescribedby)}
            aria-disabled=${this.disabled?"true":"false"}
            tabindex=${this.clickable?this.tabIndex??0:-1}
            ?data-bordered=${this.bordered}
            ?data-disabled=${this.disabled}
            ?data-clickable=${this.clickable}
            @click=${z(this,U,oe)}
            @keydown=${z(this,X,$e)}
        >
            ${this.src&&!this.error?l`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${ue(this.alt||this.name)} @error=${z(this,H,xe)} />
                  </div>`:this.fallbackIcon?l`<div class="image fallback radius-${this.radius} font-size-${this.size}"><mjo-icon src=${this.fallbackIcon}></mjo-icon></div>`:this.name?l`<div class="image name radius-${this.radius} font-size-${this.size}"><span>${this.initial}</span></div>`:l`<div class="image radius-${this.radius}"></div>`}
        </div>`}connectedCallback(){super.connectedCallback(),this.name&&(this.initial=this.name[0].toUpperCase())}updated(t){var a;t.has("name")&&(this.initial=this.name?this.name[0].toUpperCase():""),t.has("src")&&(this.error=!1);const e=(a=this.shadowRoot)==null?void 0:a.querySelector(".image.name");if(this.name&&this.nameColoured&&e){const[o,r]=z(this,K,we).call(this);e.style.backgroundColor=o,e.style.color=r}else e&&(e.style.backgroundColor="",e.style.color="")}};K=new WeakSet;we=function(){const t=["#e72c2c","#e7902c","#f1db13","#c1f113","#59f113","#26b632","#19da90","#10dfcd","#0ab4df","#0a78df","#0a43df","#6d0adf","#985cdd","#c85cdd","#dd5cc8","#c7199b","#c7194d"],e=["#fff","#fff","#000","#000","#000","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff"],a=this.initial.charCodeAt(0)%t.length,o=this.initial.charCodeAt(0)%e.length;return[t[a],e[o]]};X=new WeakSet;$e=function(t){!this.clickable||this.disabled||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),z(this,U,oe).call(this))};U=new WeakSet;oe=async function(){!this.clickable||this.disabled||(this.dispatchEvent(new CustomEvent("avatar-click",{detail:{value:this.value||this.name||""}})),this.container.style.transform="scale(0.9)",await be(100),this.container.style.transform="scale(1.1)",await be(150),this.container.removeAttribute("style"))};H=new WeakSet;xe=function(){this.error=!0,this.dispatchEvent(new CustomEvent("avatar-error",{detail:{message:"Failed to load avatar image"}}))};n.styles=[k`
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
        `];p([c({type:Boolean})],n.prototype,"bordered",2);p([c({type:Boolean})],n.prototype,"disabled",2);p([c({type:Boolean})],n.prototype,"clickable",2);p([c({type:Boolean})],n.prototype,"nameColoured",2);p([c({type:String})],n.prototype,"fallbackIcon",2);p([c({type:String})],n.prototype,"alt",2);p([c({type:String})],n.prototype,"color",2);p([c({type:String})],n.prototype,"name",2);p([c({type:String})],n.prototype,"radius",2);p([c({type:String})],n.prototype,"size",2);p([c({type:String})],n.prototype,"src",2);p([c({type:String})],n.prototype,"value",2);p([c({type:String,attribute:"aria-describedby"})],n.prototype,"ariaDescribedby",2);p([Xe()],n.prototype,"error",2);p([He(".container")],n.prototype,"container",2);n=p([E("mjo-avatar")],n);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Z extends Oe{constructor(e){if(super(e),this.it=v,e.type!==Te.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===v||e==null)return this._t=void 0,this.it=e;if(e===ge)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const a=[e];return a.raw=a,this._t={_$litType$:this.constructor.resultType,strings:a,values:[]}}}Z.directiveName="unsafeHTML",Z.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class J extends Z{}J.directiveName="unsafeSVG",J.resultType=2;const aa=Ue(J);var ta=Object.defineProperty,oa=Object.getOwnPropertyDescriptor,Se=(t,e,a,o)=>{for(var r=o>1?void 0:o?oa(e,a):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(r=(o?i(e,a,r):i(r))||r);return o&&r&&ta(e,a,r),r};let R=class extends D(b){render(){return this.src?l`${aa(this.src)}`:v}};R.styles=[k`
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
        `];Se([c({type:String})],R.prototype,"src",2);R=Se([E("mjo-icon")],R);var ra=Object.defineProperty,ia=Object.getOwnPropertyDescriptor,W=(t,e,a,o)=>{for(var r=o>1?void 0:o?ia(e,a):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(r=(o?i(e,a,r):i(r))||r);return o&&r&&ra(e,a,r),r};let S=class extends D(b){constructor(){super(...arguments),this.tag="p",this.size="base",this.weight="regular"}render(){switch(this.tag){case"h1":return l`<h1 class=${`${this.size} ${this.weight}`}><slot></slot></h1>`;case"h2":return l`<h2 class=${`${this.size} ${this.weight}`}><slot></slot></h2>`;case"h3":return l`<h3 class=${`${this.size} ${this.weight}`}><slot></slot></h3>`;case"h4":return l`<h4 class=${`${this.size} ${this.weight}`}><slot></slot></h4>`;case"h5":return l`<h5 class=${`${this.size} ${this.weight}`}><slot></slot></h5>`;case"span":return l`<span class=${`${this.size} ${this.weight}`}><slot></slot></span>`;case"p":return l`<p class=${`${this.size} ${this.weight}`}><slot></slot></p>`;default:return l`<slot></slot>`}}};S.styles=[k`
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
        `];W([c({type:String})],S.prototype,"tag",2);W([c({type:String})],S.prototype,"size",2);W([c({type:String})],S.prototype,"weight",2);S=W([E("mjo-typography")],S);var sa=Object.defineProperty,ca=Object.getOwnPropertyDescriptor,u=(t,e,a,o)=>{for(var r=o>1?void 0:o?ca(e,a):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(r=(o?i(e,a,r):i(r))||r);return o&&r&&sa(e,a,r),r},la=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},na=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},da=(t,e,a)=>(la(t,e,"access private method"),a),G,_e;let m=class extends D(b){constructor(){super(...arguments),na(this,G),this.closable=!1,this.disabled=!1,this.color="default",this.label="",this.radius="full",this.size="medium",this.variant="solid"}render(){return l`<div
            class="container"
            data-color=${this.color}
            data-size=${this.size}
            data-variant=${this.variant}
            data-radius=${this.radius}
            ?data-closable=${this.closable}
            ?data-disabled=${this.disabled}
        >
            ${this.variant==="dot"?l`<span class="dot"></span>`:v}
            ${this.startIcon?l`<mjo-icon src=${this.startIcon}></mjo-icon>`:v}
            <mjo-typography tag="span" class="label">${this.label}</mjo-typography>
            ${this.endIcon?l`<mjo-icon src=${this.endIcon}></mjo-icon>`:v}
            ${this.closable?l`<mjo-icon class="close" src=${Re} @click=${da(this,G,_e)} role="button" tabindex="0"></mjo-icon>`:v}
        </div>`}};G=new WeakSet;_e=function(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0,detail:{value:this.value}})),this.remove()};m.styles=[k`
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
                color: var(--mjo-primary-color-200, var(--mjo-secondary-foreground-color));
            }
            .container[data-color="secondary"] mjo-icon.close {
                color: var(--mjo-secondary-color-200, var(--mjo-secondary-foreground-color));
            }
            .container[data-color="success"] mjo-icon.close {
                color: #d8ffd2;
            }
            .container[data-color="warning"] mjo-icon.close {
                color: #fff2c6;
            }
            .container[data-color="info"] mjo-icon.close {
                color: #c8e7ff;
            }
            .container[data-color="error"] mjo-icon.close {
                color: #ffccd2;
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
                background-color: var(--mjo-color-gray-600);
                border-style: solid;
                border-width: 2px;
                border-color: var(--mjo-color-gray-200);
                color: var(--mjo-color-white);
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
                border-color: var(--mjo-color-gray-200);
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
        `];u([c({type:Boolean})],m.prototype,"closable",2);u([c({type:Boolean})],m.prototype,"disabled",2);u([c({type:String})],m.prototype,"color",2);u([c({type:String})],m.prototype,"endIcon",2);u([c({type:String})],m.prototype,"label",2);u([c({type:String})],m.prototype,"radius",2);u([c({type:String})],m.prototype,"size",2);u([c({type:String})],m.prototype,"startIcon",2);u([c({type:String})],m.prototype,"value",2);u([c({type:String})],m.prototype,"variant",2);m=u([E("mjo-chip")],m);const ha={radiusLarge:"10px",radiusMedium:"5px",radiusSmall:"3px",fontSizeLarge:"1.5em",fontSizeXlarge:"1.75em",fontSizeXxlarge:"2em",fontSizeMedium:"1em",fontSizeSmall:"0.8em",fontSizeXsmall:"0.6em",fontSizeXxsmall:"0.4em",fontWeightBold:"700",fontWeightLight:"300",fontWeightRegular:"400",spaceXxsmall:"3px",spaceXsmall:"6px",spaceSmall:"8px",spaceMedium:"16px",spaceLarge:"24px",spaceXlarge:"32px",spaceXxlarge:"40px",colors:{white:"#ffffff",black:"#000000",warning:"#ff9800",success:"#4caf50",error:"#f44336",info:"#128ada",blue:{default:"#1d7fdb",alpha0:"#e3f2fd00",alpha1:"#e3f2fd11",alpha2:"#e3f2fd22",alpha3:"#e3f2fd33",alpha4:"#e3f2fd44",alpha5:"#e3f2fd55",alpha6:"#e3f2fd66",alpha7:"#e3f2fd77",alpha8:"#e3f2fd88",alpha9:"#e3f2fd99",50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#1d7fdb",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1"},cyan:{default:"#00bcd4",alpha0:"#00bcd400",alpha1:"#00bcd411",alpha2:"#00bcd422",alpha3:"#00bcd433",alpha4:"#00bcd444",alpha5:"#00bcd455",alpha6:"#00bcd466",alpha7:"#00bcd477",alpha8:"#00bcd488",alpha9:"#00bcd499",50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064"},green:{default:"#4caf50",alpha0:"#4caf5000",alpha1:"#4caf5011",alpha2:"#4caf5022",alpha3:"#4caf5033",alpha4:"#4caf5044",alpha5:"#4caf5055",alpha6:"#4caf5066",alpha7:"#4caf5077",alpha8:"#4caf5088",alpha9:"#4caf5099",50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"},purple:{default:"#9c27b0",alpha0:"#9c27b000",alpha1:"#9c27b011",alpha2:"#9c27b022",alpha3:"#9c27b033",alpha4:"#9c27b044",alpha5:"#9c27b055",alpha6:"#9c27b066",alpha7:"#9c27b077",alpha8:"#9c27b088",alpha9:"#9c27b099",50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c"},red:{default:"#f44336",alpha0:"#f4433600",alpha1:"#f4433611",alpha2:"#f4433622",alpha3:"#f4433633",alpha4:"#f4433644",alpha5:"#f4433655",alpha6:"#f4433666",alpha7:"#f4433677",alpha8:"#f4433688",alpha9:"#f4433699",50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c"},yellow:{default:"#ffeb3b",alpha0:"#ffeb3b00",alpha1:"#ffeb3b11",alpha2:"#ffeb3b22",alpha3:"#ffeb3b33",alpha4:"#ffeb3b44",alpha5:"#ffeb3b55",alpha6:"#ffeb3b66",alpha7:"#ffeb3b77",alpha8:"#ffeb3b88",alpha9:"#ffeb3b99",50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17"},pink:{default:"#e91e63",alpha0:"#e91e6300",alpha1:"#e91e6311",alpha2:"#e91e6322",alpha3:"#e91e6333",alpha4:"#e91e6344",alpha5:"#e91e6355",alpha6:"#e91e6366",alpha7:"#e91e6377",alpha8:"#e91e6388",alpha9:"#e91e6399",50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f"},gray:{default:"#71717A",alpha0:"#71717A00",alpha1:"#71717A11",alpha2:"#71717A22",alpha3:"#71717A33",alpha4:"#71717A44",alpha5:"#71717A55",alpha6:"#71717A66",alpha7:"#71717A77",alpha8:"#71717A88",alpha9:"#71717A99",50:"#FAFAFA",100:"#F4F4F5",200:"#E4E4E7",300:"#D4D4D8",400:"#A1A1AA",500:"#71717A",600:"#52525B",700:"#3F3F46",800:"#27272A",900:"#18181B"}},dark:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#555555",low:"#444444",xlow:"#222222",high:"#666666",xhigh:"#888888"},backgroundColor:{hover:"#666666",default:"#151515",xlow:"#030303",low:"#111111",high:"#252525",xhigh:"#444444"},backgroundColorCard:{default:"#333333",xlow:"#111111",low:"#222222",high:"#555555",xhigh:"#666666"},foregroundColor:{default:"#f0f0f0",xlow:"#999999",low:"#bbbbbb",high:"#ffffff",xhigh:"#ffffff"}},light:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#dddddd",xlow:"#aaaaaa",low:"#cccccc",high:"#eeeeee",xhigh:"#f0f0f0"},backgroundColor:{hover:"#eeeeee",default:"#efefef",xlow:"#cccccc",low:"#dddddd",high:"#f6f6f6",xhigh:"#ffffff"},backgroundColorCard:{default:"#fafafa",xlow:"#ffffff",low:"#ffffff",high:"#e6e6e6",xhigh:"#dddddd"},foregroundColor:{default:"#333333",xlow:"#999999",low:"#666666",high:"#151515",xhigh:"#000000"}}};var pa=Object.defineProperty,fa=Object.getOwnPropertyDescriptor,I=(t,e,a,o)=>{for(var r=o>1?void 0:o?fa(e,a):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(r=(o?i(e,a,r):i(r))||r);return o&&r&&pa(e,a,r),r},ma=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},$=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},f=(t,e,a)=>(ma(t,e,"access private method"),a),re,ze,M,Q,ie,Ce,B,se,y,w,L,Y;let _=class extends b{constructor(){super(...arguments),$(this,re),$(this,M),$(this,ie),$(this,B),$(this,y),$(this,L),this.theme="light",this.scope="local",this.config={},this.cssStyles=""}render(){return l`<slot></slot>`}connectedCallback(){super.connectedCallback(),this.applyTheme()}updated(t){t.has("theme")&&t.get("theme")&&t.get("theme")!==this.theme&&this.applyTheme()}applyTheme(){var a,o;this.cssStyles=this.scope==="global"?":root {":":host {";const t=structuredClone(ha);f(this,L,Y).call(this,t,this.config),f(this,M,Q).call(this,t),this.cssStyles+="}";let e;this.scope==="global"?(e=document.querySelector("#mjo-theme"),e||(e=document.createElement("style"),e.setAttribute("id","mjo-theme"),document.head.appendChild(e))):(e=(a=this.shadowRoot)==null?void 0:a.querySelector("#mjo-theme"),e||(e=document.createElement("style"),e.setAttribute("id","mjo-theme"),(o=this.shadowRoot)==null||o.appendChild(e))),e.innerHTML=this.cssStyles}};re=new WeakSet;ze=function(t){for(const e in t){const a=t[e];typeof a=="object"?f(this,B,se).call(this,a,`--mjo-color-${f(this,y,w).call(this,e)}`):this.cssStyles+=`--mjo-color-${e}: ${a};`}};M=new WeakSet;Q=function(t,e="--mjo-"){const a=t;for(const o in a){const r=a[o];if((o==="dark"||o==="light")&&this.theme!==o)continue;if(o==="colors"){f(this,re,ze).call(this,r);continue}if(typeof r=="object"&&r.default){f(this,B,se).call(this,r,`${e}${f(this,y,w).call(this,o)}`);continue}if(o==="components"){f(this,ie,Ce).call(this,r);continue}if(typeof r=="object"){f(this,M,Q).call(this,r);continue}const s=`${e}${f(this,y,w).call(this,o)}`;this.cssStyles+=`${s}: ${r};`}};ie=new WeakSet;Ce=function(t){for(const e in t){const a=t[e];for(const o in a){const r=a[o];this.cssStyles+=`--${f(this,y,w).call(this,e)}-${f(this,y,w).call(this,o)}: ${r};`}}};B=new WeakSet;se=function(t,e){for(const a in t){let o=`${e}-${f(this,y,w).call(this,a)}`;a==="default"&&(o=`${e}`),this.cssStyles+=`${o}: ${t[a]};`}};y=new WeakSet;w=function(t){return t.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()};L=new WeakSet;Y=function(t,e){for(const a in e)typeof e[a]=="object"&&t[a]?f(this,L,Y).call(this,t[a],e[a]):t[a]=e[a]};_.styles=[k`
            :host {
                display: block;
            }
        `];I([c({type:String})],_.prototype,"theme",2);I([c({type:String})],_.prototype,"scope",2);I([c({type:Object})],_.prototype,"config",2);_=I([E("mjo-theme")],_);function ke(){const t=localStorage.getItem("mjo-theme")||"light",e=document.querySelector("mjo-theme");e&&(e.theme=t);const a=document.querySelector(".theme-toggle");a&&(a.textContent=t==="dark"?"☀️":"🌙")}window.toggleTheme=function(){const t=document.querySelector("mjo-theme");if(t){const a=t.theme==="light"?"dark":"light";t.theme=a,localStorage.setItem("mjo-theme",a);const o=document.querySelector(".theme-toggle");o&&(o.textContent=a==="dark"?"☀️":"🌙")}else console.warn("⚠️ mjo-theme component not found")};document.addEventListener("DOMContentLoaded",()=>{ke()});setTimeout(()=>{ke()},100);
//# sourceMappingURL=client.js.map
