var hc=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)};var b=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)};var l=(t,e,a)=>(hc(t,e,"access private method"),a);import{Q as pc,R as Fe,D as m,i as fr,t as ke,e as gr,k as c,r as Ss,d as uc}from"./lit-core.js";import{e as mc,l as fc,m as gc,n as vr,o as _s,p as vc,q as bc,r as yc,s as wc,t as jc}from"./index.js";/*! js-cookie v3.0.5 | MIT */function ta(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var o in a)t[o]=a[o]}return t}var kc={read:function(t){return t[0]==='"'&&(t=t.slice(1,-1)),t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(t){return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function Nr(t,e){function a(r,i,s){if(!(typeof document>"u")){s=ta({},e,s),typeof s.expires=="number"&&(s.expires=new Date(Date.now()+s.expires*864e5)),s.expires&&(s.expires=s.expires.toUTCString()),r=encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var p="";for(var d in s)s[d]&&(p+="; "+d,s[d]!==!0&&(p+="="+s[d].split(";")[0]));return document.cookie=r+"="+t.write(i,r)+p}}function o(r){if(!(typeof document>"u"||arguments.length&&!r)){for(var i=document.cookie?document.cookie.split("; "):[],s={},p=0;p<i.length;p++){var d=i[p].split("="),f=d.slice(1).join("=");try{var g=decodeURIComponent(d[0]);if(s[g]=t.read(f,g),r===g)break}catch{}}return r?s[r]:s}}return Object.create({set:a,get:o,remove:function(r,i){a(r,"",ta({},i,{expires:-1}))},withAttributes:function(r){return Nr(this.converter,ta({},this.attributes,r))},withConverter:function(r){return Nr(ta({},this.converter,r),this.attributes)}},{attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(t)}})}var Qe=Nr(kc,{path:"/"});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ua=globalThis,gi=ua.ShadowRoot&&(ua.ShadyCSS===void 0||ua.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,vi=Symbol(),fs=new WeakMap;let Ds=class{constructor(e,a,o){if(this._$cssResult$=!0,o!==vi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(gi&&e===void 0){const o=a!==void 0&&a.length===1;o&&(e=fs.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&fs.set(a,e))}return e}toString(){return this.cssText}};const xc=t=>new Ds(typeof t=="string"?t:t+"",void 0,vi),$=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((o,r,i)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new Ds(a,t,vi)},$c=(t,e)=>{if(gi)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const o=document.createElement("style"),r=ua.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=a.cssText,t.appendChild(o)}},gs=gi?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const o of e.cssRules)a+=o.cssText;return xc(a)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Sc,defineProperty:_c,getOwnPropertyDescriptor:Dc,getOwnPropertyNames:Cc,getOwnPropertySymbols:Ec,getPrototypeOf:Mc}=Object,Me=globalThis,vs=Me.trustedTypes,zc=vs?vs.emptyScript:"",Pr=Me.reactiveElementPolyfillSupport,Ot=(t,e)=>t,Da={toAttribute(t,e){switch(e){case Boolean:t=t?zc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},bi=(t,e)=>!Sc(t,e),bs={attribute:!0,type:String,converter:Da,reflect:!1,hasChanged:bi};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Me.litPropertyMetadata??(Me.litPropertyMetadata=new WeakMap);class et extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=bs){if(a.state&&(a.attribute=!1),this._$Ei(),this.elementProperties.set(e,a),!a.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,a);r!==void 0&&_c(this.prototype,e,r)}}static getPropertyDescriptor(e,a,o){const{get:r,set:i}=Dc(this.prototype,e)??{get(){return this[a]},set(s){this[a]=s}};return{get(){return r==null?void 0:r.call(this)},set(s){const p=r==null?void 0:r.call(this);i.call(this,s),this.requestUpdate(e,p,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??bs}static _$Ei(){if(this.hasOwnProperty(Ot("elementProperties")))return;const e=Mc(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ot("properties"))){const a=this.properties,o=[...Cc(a),...Ec(a)];for(const r of o)this.createProperty(r,a[r])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[o,r]of a)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[a,o]of this.elementProperties){const r=this._$Eu(a,o);r!==void 0&&this._$Eh.set(r,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)a.unshift(gs(r))}else e!==void 0&&a.push(gs(e));return a}static _$Eu(e,a){const o=a.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const o of a.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $c(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostConnected)==null?void 0:o.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostDisconnected)==null?void 0:o.call(a)})}attributeChangedCallback(e,a,o){this._$AK(e,o)}_$EC(e,a){var i;const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const s=(((i=o.converter)==null?void 0:i.toAttribute)!==void 0?o.converter:Da).toAttribute(a,o.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,a){var i;const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const s=o.getPropertyOptions(r),p=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)==null?void 0:i.fromAttribute)!==void 0?s.converter:Da;this._$Em=r,this[r]=p.fromAttribute(a,s.type),this._$Em=null}}requestUpdate(e,a,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??bi)(this[e],a))return;this.P(e,a,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,a,o){this._$AL.has(e)||this._$AL.set(e,a),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,s]of r)s.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.P(i,this[i],s)}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(o=this._$EO)==null||o.forEach(r=>{var i;return(i=r.hostUpdate)==null?void 0:i.call(r)}),this.update(a)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(o=>{var r;return(r=o.hostUpdated)==null?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(a=>this._$EC(a,this[a]))),this._$EU()}updated(e){}firstUpdated(e){}}et.elementStyles=[],et.shadowRootOptions={mode:"open"},et[Ot("elementProperties")]=new Map,et[Ot("finalized")]=new Map,Pr==null||Pr({ReactiveElement:et}),(Me.reactiveElementVersions??(Me.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class w extends et{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.o=pc(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.o)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.o)==null||e.setConnected(!1)}render(){return Fe}}var $s;w._$litElement$=!0,w.finalized=!0,($s=globalThis.litElementHydrateSupport)==null||$s.call(globalThis,{LitElement:w});const Wr=globalThis.litElementPolyfillSupport;Wr==null||Wr({LitElement:w});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=t=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ac={attribute:!0,type:String,converter:Da,reflect:!1,hasChanged:bi},Tc=(t=Ac,e,a)=>{const{kind:o,metadata:r}=a;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),i.set(a.name,t),o==="accessor"){const{name:s}=a;return{set(p){const d=e.get.call(this);e.set.call(this,p),this.requestUpdate(s,d,t)},init(p){return p!==void 0&&this.P(s,void 0,t),p}}}if(o==="setter"){const{name:s}=a;return function(p){const d=this[s];e.call(this,p),this.requestUpdate(s,d,t)}}throw Error("Unsupported decorator location: "+o)};function n(t){return(e,a)=>typeof a=="object"?Tc(t,e,a):((o,r,i)=>{const s=r.hasOwnProperty(i);return r.constructor.createProperty(i,s?{...o,wrapped:!0}:o),s?Object.getOwnPropertyDescriptor(r,i):void 0})(t,e,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function L(t){return n({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ys=(t,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,a),a);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ne(t,e){return(a,o,r)=>{const i=s=>{var p;return((p=s.renderRoot)==null?void 0:p.querySelector(t))??null};if(e){const{get:s,set:p}=typeof o=="object"?a:r??(()=>{const d=Symbol();return{get(){return this[d]},set(f){this[d]=f}}})();return ys(a,o,{get(){let d=s.call(this);return d===void 0&&(d=i(this),(d!==null||this.hasUpdated)&&p.call(this,d)),d}})}return ys(a,o,{get(){return i(this)}})}}var Oc=Object.defineProperty,Pc=Object.getOwnPropertyDescriptor,Wc=(t,e,a,o)=>{for(var r=o>1?void 0:o?Pc(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Oc(e,a,r),r};const ee=t=>{var a,Cs,r,Br;class e extends t{constructor(){super(...arguments);b(this,a);b(this,r);this.cssStyles=""}connectedCallback(){super.connectedCallback(),this.theme&&l(this,a,Cs).call(this)}}return a=new WeakSet,Cs=function(){var g,C;const d=this.tagName.toLowerCase();for(const O in this.theme){const pe=this.theme[O];this.cssStyles+=`--${l(this,r,Br).call(this,d)}-${l(this,r,Br).call(this,O)}: ${pe};`}let f=(g=this.shadowRoot)==null?void 0:g.querySelector("#mjo-theme");f||(f=document.createElement("style"),f.setAttribute("id","mjo-theme"),(C=this.shadowRoot)==null||C.appendChild(f)),f.innerHTML=`:host {${this.cssStyles}}`},r=new WeakSet,Br=function(d){return d.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()},Wc([n({type:Object})],e.prototype,"theme",2),e};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=t=>t??m;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Yr extends fr{constructor(e){if(super(e),this.it=m,e.type!==ke.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===m||e==null)return this._t=void 0,this.it=e;if(e===Fe)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const a=[e];return a.raw=a,this._t={_$litType$:this.constructor.resultType,strings:a,values:[]}}}Yr.directiveName="unsafeHTML",Yr.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Hr extends Yr{}Hr.directiveName="unsafeSVG",Hr.resultType=2;const Rc=gr(Hr);var Ic=Object.defineProperty,Lc=Object.getOwnPropertyDescriptor,Es=(t,e,a,o)=>{for(var r=o>1?void 0:o?Lc(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Ic(e,a,r),r};let Ca=class extends ee(w){render(){return this.src?c`${Rc(this.src)}`:m}};Ca.styles=[$`
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
        `];Es([n({type:String})],Ca.prototype,"src",2);Ca=Es([S("mjo-icon")],Ca);const dt=async t=>new Promise(e=>setTimeout(e,t));var Fc=Object.defineProperty,Nc=Object.getOwnPropertyDescriptor,ae=(t,e,a,o)=>{for(var r=o>1?void 0:o?Nc(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Fc(e,a,r),r},Ms=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},jt=(t,e,a)=>(Ms(t,e,"read from private field"),a?a.call(t):e.get(t)),Oe=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Ie=(t,e,a)=>(Ms(t,e,"access private method"),a),tt,qr,Ur,zs,Vr,As,ma,Jr,Ea,Kr,Gr,Ts;let V=class extends ee(w){constructor(){super(...arguments),Oe(this,Ur),Oe(this,Vr),Oe(this,ma),Oe(this,Ea),Oe(this,Gr),this.itemTitle="",this.itemSubtitle="",this.expanded=!1,this.disabled=!1,this.compact=!1,this.icon=mc,this.animationDuration=300,this.animationEasing="ease-in-out",this.variant="light",Oe(this,tt,`accordion-item-${Math.random().toString(36).substring(2,15)}`),Oe(this,qr,t=>{if(this.disabled)return;const{key:e}=t;e==="Enter"||e===" "?(t.preventDefault(),Ie(this,ma,Jr).call(this)):e==="ArrowUp"||e==="ArrowDown"?(t.preventDefault(),Ie(this,Ur,zs).call(this,e==="ArrowUp"?"previous":"next")):e==="Home"||e==="End"?(t.preventDefault(),Ie(this,Vr,As).call(this,e==="Home"?"first":"last")):e==="Escape"&&this.expanded&&(t.preventDefault(),this.close())})}get computedAriaLabel(){return typeof this.itemTitle=="string"?`Toggle ${this.itemTitle}`:"Toggle accordion section"}render(){return c`
            <div class="container" data-variant=${this.variant} ?data-compact=${this.compact} ?data-disabled=${this.disabled}>
                <div
                    class="titleContainer"
                    role="button"
                    tabindex=${this.disabled?-1:0}
                    aria-expanded=${this.expanded}
                    aria-controls=${`${jt(this,tt)}-content`}
                    aria-label=${this.computedAriaLabel}
                    aria-describedby=${v(this.ariaDescribedby)}
                    aria-disabled=${this.disabled}
                    @click=${Ie(this,ma,Jr)}
                    @keydown=${jt(this,qr)}
                >
                    <div class="titleContent" id=${`${jt(this,tt)}-title`}>
                        ${typeof this.itemTitle=="string"?c`
                                  <mjo-typography class="title" tag="h3" size="heading3" weight="medium">${this.itemTitle}</mjo-typography>
                                  ${this.itemSubtitle?c`<mjo-typography class="subtitle" tag="p" size="body1" weight="medium"> ${this.itemSubtitle} </mjo-typography>`:m}
                              `:this.itemTitle}
                    </div>
                    <div class="iconContainer">
                        <mjo-icon src=${this.icon}></mjo-icon>
                    </div>
                </div>
                <div class="content" id=${`${jt(this,tt)}-content`} role="region" aria-labelledby=${`${jt(this,tt)}-title`}>
                    <slot></slot>
                </div>
            </div>
        `}updated(t){t.has("expanded")&&(this.expanded?Ie(this,Ea,Kr).call(this):Ie(this,Gr,Ts).call(this)),t.has("disabled")&&this.disabled&&this.close()}setCompact(t){this.compact=t}open(){this.expanded=!0}close(){this.expanded=!1}toggle(){this.expanded=!this.expanded}focus(){var t;(t=this.titleContainerEl)==null||t.focus()}};tt=new WeakMap;qr=new WeakMap;Ur=new WeakSet;zs=function(t){const e=this.closest("mjo-accordion");if(!e)return;const a=Array.from(e.querySelectorAll("mjo-accordion-item")),o=a.indexOf(this),r=t==="previous"?o-1:o+1,i=a[r];i&&!i.disabled&&i.focus()};Vr=new WeakSet;As=function(t){const e=this.closest("mjo-accordion");if(!e)return;const a=Array.from(e.querySelectorAll("mjo-accordion-item")),o=t==="first"?a[0]:a[a.length-1];o&&!o.disabled&&o.focus()};ma=new WeakSet;Jr=function(){this.expanded=!this.expanded,this.dispatchEvent(new CustomEvent("mjo-accordion-toggle",{detail:{item:this,expanded:this.expanded}}))};Ea=new WeakSet;Kr=async function(t=0){if(this.disabled)return;const e=this.contentEl.scrollHeight;if(e===0){if(t===10)return;setTimeout(()=>{Ie(this,Ea,Kr).call(this,t+1)},50);return}const a=new CustomEvent("mjo-accordion-will-expand",{detail:{item:this,expanded:!0},cancelable:!0});this.dispatchEvent(a)&&(this.contentEl.style.transition=`
            max-height ${this.animationDuration}ms ${this.animationEasing},
            opacity ${this.animationDuration}ms ${this.animationEasing}
        `,this.iconEl.style.transition=`transform ${this.animationDuration}ms ${this.animationEasing}`,this.containerEl.style.paddingBottom="var(--mjo-accordion-item-content-padding, var(--mjo-space-medium))",this.contentEl.style.maxHeight=`${e}px`,this.contentEl.style.opacity="1",this.iconEl.style.transform="rotate(90deg)",await dt(this.animationDuration),this.dispatchEvent(new CustomEvent("mjo-accordion-expanded",{detail:{item:this,expanded:this.expanded}})))};Gr=new WeakSet;Ts=async function(){const t=new CustomEvent("mjo-accordion-will-collapse",{detail:{item:this,expanded:!1},cancelable:!0});this.dispatchEvent(t)&&(this.containerEl.removeAttribute("style"),this.contentEl.removeAttribute("style"),this.iconEl.removeAttribute("style"),await dt(this.animationDuration),this.dispatchEvent(new CustomEvent("mjo-accordion-collapsed",{detail:{item:this,expanded:this.expanded}})))};V.styles=[$`
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
        `];ae([n({type:String})],V.prototype,"itemTitle",2);ae([n({type:String})],V.prototype,"itemSubtitle",2);ae([n({type:Boolean})],V.prototype,"expanded",2);ae([n({type:Boolean})],V.prototype,"disabled",2);ae([n({type:Boolean})],V.prototype,"compact",2);ae([n({type:String})],V.prototype,"icon",2);ae([n({type:Number})],V.prototype,"animationDuration",2);ae([n({type:String})],V.prototype,"animationEasing",2);ae([n({type:String,attribute:"aria-describedby"})],V.prototype,"ariaDescribedby",2);ae([L()],V.prototype,"variant",2);ae([ne(".container")],V.prototype,"containerEl",2);ae([ne(".content")],V.prototype,"contentEl",2);ae([ne(".iconContainer mjo-icon")],V.prototype,"iconEl",2);ae([ne(".titleContainer")],V.prototype,"titleContainerEl",2);V=ae([S("mjo-accordion-item")],V);var Bc=Object.defineProperty,Yc=Object.getOwnPropertyDescriptor,Vt=(t,e,a,o)=>{for(var r=o>1?void 0:o?Yc(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Bc(e,a,r),r},Os=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},Hc=(t,e,a)=>(Os(t,e,"read from private field"),a?a.call(t):e.get(t)),ws=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},qc=(t,e,a)=>(Os(t,e,"access private method"),a),yi,Xr,Ps;let He=class extends ee(w){constructor(){super(...arguments),ws(this,Xr),this.variant="light",this.selectionMode="single",this.compact=!1,this.items=[],ws(this,yi,t=>{const e=t,a=e.detail.item;this.selectionMode==="single"&&this.items.forEach(o=>{o!==a&&o.expanded&&o.close()}),this.dispatchEvent(new CustomEvent("mjo-accordion-toggle",{detail:{item:a,expanded:e.detail.expanded,accordion:this}}))})}render(){return c`<div class="container" role="tablist" data-variant=${this.variant} ?data-compact=${this.compact}></div>`}firstUpdated(){this.items=Array.from(this.querySelectorAll("mjo-accordion-item")),qc(this,Xr,Ps).call(this)}updated(t){t.has("compact")&&this.items.forEach(e=>{e.setCompact(this.compact)}),t.has("variant")&&this.items.forEach(e=>{e.variant=this.variant})}expandItem(t){const e=typeof t=="number"?this.items[t]:this.items.find(a=>a.id===t);e&&!e.disabled&&e.open()}collapseItem(t){const e=typeof t=="number"?this.items[t]:this.items.find(a=>a.id===t);e&&e.close()}expandAll(){this.selectionMode==="multiple"&&this.items.forEach(t=>{t.disabled||t.open()})}collapseAll(){this.items.forEach(t=>t.close())}focusItem(t){this.items[t]&&!this.items[t].disabled&&this.items[t].focus()}};yi=new WeakMap;Xr=new WeakSet;Ps=function(){this.items.forEach(t=>{this.containerEl.appendChild(t),t.variant=this.variant,t.addEventListener("mjo-accordion-toggle",Hc(this,yi)),t.addEventListener("mjo-accordion-will-expand",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-will-expand",{detail:{...a.detail,accordion:this},cancelable:!0,bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-expanded",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-expanded",{detail:{...a.detail,accordion:this},bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-will-collapse",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-will-collapse",{detail:{...a.detail,accordion:this},cancelable:!0,bubbles:!0,composed:!0}))}),t.addEventListener("mjo-accordion-collapsed",e=>{const a=e;this.dispatchEvent(new CustomEvent("mjo-accordion-collapsed",{detail:{...a.detail,accordion:this},bubbles:!0,composed:!0}))})})};He.styles=[$`
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
        `];Vt([n({type:String})],He.prototype,"variant",2);Vt([n({type:String})],He.prototype,"selectionMode",2);Vt([n({type:Boolean})],He.prototype,"compact",2);Vt([ne(".container")],He.prototype,"containerEl",2);He=Vt([S("mjo-accordion")],He);var Uc=Object.defineProperty,Vc=Object.getOwnPropertyDescriptor,G=(t,e,a,o)=>{for(var r=o>1?void 0:o?Vc(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Uc(e,a,r),r},Jc=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},Pe=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},F=(t,e,a)=>(Jc(t,e,"access private method"),a),Zr,Ws,wi,Rs,rt,Pt,Rt,br,ze,Ye,Qr,Is,ht,Jt;let Y=class extends w{constructor(){super(...arguments),Pe(this,Zr),Pe(this,wi),Pe(this,rt),Pe(this,Rt),Pe(this,ze),Pe(this,Qr),Pe(this,ht),this.type="info",this.size="medium",this.rounded="medium",this.message="",this.detail="",this.closable=!1,this.hideIcon=!1,this.ariaLive="polite",this.focusOnShow=!1,this.autoClose=!1,this.autoCloseDelay=5e3,this.animation="fade",this.animationDuration=300,this.persistent=!1,this.icon="",this.autoCloseTimer=null,this.storeHeight=0,this.isAnimating=!1}render(){const t=`alert-message-${Math.random().toString(36).substring(2,9)}`,e=`alert-detail-${Math.random().toString(36).substring(2,9)}`,a=this.type==="error"||this.type==="warning";return c`
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
                aria-describedby=${this.detail?e:m}
            >
                <div class="messageContainer">
                    ${!this.hideIcon&&this.icon?c`<div class="icon"><mjo-icon src=${this.icon}></mjo-icon></div>`:m}
                    <div class="message" id=${t}>${this.message}</div>
                    ${this.closable&&!this.persistent?F(this,Zr,Ws).call(this):m}
                </div>
                ${this.detail?c`<div class="detail" id=${e} ?data-icon=${!this.hideIcon}>${this.detail}</div>`:m}
            </div>
        `}updated(t){t.has("type")&&(this.type==="warning"?this.icon=fc:this.type==="info"?this.icon=gc:this.type==="error"?this.icon=vr:this.type==="success"?this.icon=_s:this.icon=""),(t.has("autoClose")||t.has("autoCloseDelay"))&&F(this,rt,Pt).call(this)}connectedCallback(){super.connectedCallback(),this.autoClose&&F(this,rt,Pt).call(this),this.focusOnShow&&this.updateComplete.then(()=>{this.focus()})}disconnectedCallback(){super.disconnectedCallback(),F(this,Rt,br).call(this)}show(){this.autoClose&&F(this,rt,Pt).call(this),F(this,Qr,Is).call(this)}hide(){F(this,ht,Jt).call(this)}focus(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".close-button");t?t.focus():super.focus()}announce(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".container");if(t){const a=t.getAttribute("aria-live");t.setAttribute("aria-live","off"),setTimeout(()=>{t.setAttribute("aria-live",a||this.ariaLive)},100)}}};Zr=new WeakSet;Ws=function(){return c`
            <button class="close-button" type="button" aria-label="Close alert" @click=${F(this,ht,Jt)} @keydown=${F(this,wi,Rs)}>
                <mjo-icon src=${vc}></mjo-icon>
            </button>
        `};wi=new WeakSet;Rs=function(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),F(this,ht,Jt).call(this))};rt=new WeakSet;Pt=function(){F(this,Rt,br).call(this),this.autoClose&&this.autoCloseDelay>0&&(this.autoCloseTimer=window.setTimeout(()=>{F(this,ht,Jt).call(this)},this.autoCloseDelay))};Rt=new WeakSet;br=function(){this.autoCloseTimer&&(clearTimeout(this.autoCloseTimer),this.autoCloseTimer=null)};ze=new WeakSet;Ye=function(t,e){this.dispatchEvent(new CustomEvent(t,{detail:{element:this,...e},bubbles:!0,composed:!0}))};Qr=new WeakSet;Is=function(){var a;const t=(a=this.shadowRoot)==null?void 0:a.querySelector(".container");if(!t||t.offsetHeight>0||this.isAnimating)return;if(F(this,ze,Ye).call(this,"mjo-alert-will-show"),this.autoClose&&F(this,rt,Pt).call(this),this.animation==="none"){this.style.display="block",F(this,ze,Ye).call(this,"mjo-alert-show");return}this.isAnimating=!0;let e=null;switch(this.animation){case"fade":e=t.animate([{opacity:0,height:"0",display:"none"},{opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"slide":e=t.animate([{transform:"translateX(-100%)",opacity:0,height:"0",display:"none"},{transform:"translateX(0)",opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"scale":e=t.animate([{transform:"scale(0)",opacity:0,height:"0",display:"none"},{transform:"scale(1)",opacity:1,height:this.storeHeight+"px",display:"block"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break}e.finished.then(()=>{F(this,ze,Ye).call(this,"mjo-alert-show"),e&&e.cancel(),this.isAnimating=!1})};ht=new WeakSet;Jt=function(){var r,i;const t=(r=this.shadowRoot)==null?void 0:r.querySelector(".container");if(!t||t.offsetHeight===0||this.isAnimating)return;F(this,ze,Ye).call(this,"mjo-alert-will-close"),F(this,Rt,br).call(this);const e=document.activeElement,a=((i=this.shadowRoot)==null?void 0:i.contains(e))||this===e;if(this.animation==="none"){this.style.display="none",F(this,ze,Ye).call(this,"mjo-alert-closed");return}this.isAnimating=!0,this.storeHeight=t.offsetHeight;let o=null;switch(this.animation){case"fade":o=t.animate([{opacity:1,height:this.storeHeight+"px"},{opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"slide":o=t.animate([{transform:"translateX(0)",opacity:1,height:this.storeHeight+"px"},{transform:"translateX(-100%)",opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break;case"scale":o=t.animate([{transform:"scale(1)",opacity:1,height:this.storeHeight+"px"},{transform:"scale(0)",opacity:0,height:"0",display:"none"}],{duration:this.animationDuration,easing:"ease-in-out",fill:"forwards"});break}o==null||o.finished.then(()=>{if(a){const s=this.nextElementSibling||this.previousElementSibling||this.parentElement;s&&s instanceof HTMLElement&&s.focus()}this.isAnimating=!1,F(this,ze,Ye).call(this,"mjo-alert-closed")})};Y.styles=[$`
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
        `];G([n({type:String})],Y.prototype,"type",2);G([n({type:String})],Y.prototype,"size",2);G([n({type:String})],Y.prototype,"rounded",2);G([n({type:String})],Y.prototype,"message",2);G([n({type:String})],Y.prototype,"detail",2);G([n({type:Boolean})],Y.prototype,"closable",2);G([n({type:Boolean})],Y.prototype,"hideIcon",2);G([n({type:String})],Y.prototype,"ariaLive",2);G([n({type:Boolean})],Y.prototype,"focusOnShow",2);G([n({type:Boolean})],Y.prototype,"autoClose",2);G([n({type:Number})],Y.prototype,"autoCloseDelay",2);G([n({type:String})],Y.prototype,"animation",2);G([n({type:Number})],Y.prototype,"animationDuration",2);G([n({type:Boolean})],Y.prototype,"persistent",2);G([L()],Y.prototype,"icon",2);G([L()],Y.prototype,"autoCloseTimer",2);Y=G([S("mjo-alert")],Y);var Kc=Object.defineProperty,Gc=Object.getOwnPropertyDescriptor,te=(t,e,a,o)=>{for(var r=o>1?void 0:o?Gc(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Kc(e,a,r),r},Xc=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},aa=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},kt=(t,e,a)=>(Xc(t,e,"access private method"),a),eo,Ls,to,Fs,Ma,ji,ao,Ns;let q=class extends ee(w){constructor(){super(...arguments),aa(this,eo),aa(this,to),aa(this,Ma),aa(this,ao),this.bordered=!1,this.disabled=!1,this.clickable=!1,this.nameColoured=!1,this.color="default",this.radius="full",this.size="medium",this.error=!1,this.initial=""}get appropriateRole(){return this.clickable?"button":this.src?"img":"presentation"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.clickable?`Click to interact with ${this.name||this.value||"avatar"}`:this.name?`Avatar for ${this.name}`:"Avatar"}render(){return this.initial=this.name?this.name[0].toLocaleUpperCase():"",c`<div
            class="container size-${this.size} radius-${this.radius} color-${this.color}"
            role=${this.appropriateRole}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${v(this.ariaDescribedby)}
            aria-disabled=${this.disabled?"true":"false"}
            tabindex=${this.clickable?this.tabIndex??0:-1}
            ?data-bordered=${this.bordered}
            ?data-disabled=${this.disabled}
            ?data-clickable=${this.clickable}
            @click=${kt(this,Ma,ji)}
            @keydown=${kt(this,to,Fs)}
        >
            ${this.src&&!this.error?c`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${v(this.alt||this.name)} @error=${kt(this,ao,Ns)} />
                  </div>`:this.fallbackIcon?c`<div class="image fallback radius-${this.radius} font-size-${this.size}"><mjo-icon src=${this.fallbackIcon}></mjo-icon></div>`:this.name?c`<div class="image name radius-${this.radius} font-size-${this.size}"><span>${this.initial}</span></div>`:c`<div class="image radius-${this.radius}"></div>`}
        </div>`}connectedCallback(){super.connectedCallback(),this.name&&(this.initial=this.name[0].toUpperCase())}updated(t){var a;t.has("name")&&(this.initial=this.name?this.name[0].toUpperCase():""),t.has("src")&&(this.error=!1);const e=(a=this.shadowRoot)==null?void 0:a.querySelector(".image.name");if(this.name&&this.nameColoured&&e){const[o,r]=kt(this,eo,Ls).call(this);e.style.backgroundColor=o,e.style.color=r}else e&&(e.style.backgroundColor="",e.style.color="")}};eo=new WeakSet;Ls=function(){const t=["#e72c2c","#e7902c","#f1db13","#c1f113","#59f113","#26b632","#19da90","#10dfcd","#0ab4df","#0a78df","#0a43df","#6d0adf","#985cdd","#c85cdd","#dd5cc8","#c7199b","#c7194d"],e=["#fff","#fff","#000","#000","#000","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff"],a=this.initial.charCodeAt(0)%t.length,o=this.initial.charCodeAt(0)%e.length;return[t[a],e[o]]};to=new WeakSet;Fs=function(t){!this.clickable||this.disabled||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),kt(this,Ma,ji).call(this))};Ma=new WeakSet;ji=async function(){!this.clickable||this.disabled||(this.dispatchEvent(new CustomEvent("mjo-avatar-click",{detail:{value:this.value||this.name||""}})),this.container.style.transform="scale(0.9)",await dt(100),this.container.style.transform="scale(1.1)",await dt(150),this.container.removeAttribute("style"))};ao=new WeakSet;Ns=function(){this.error=!0,this.dispatchEvent(new CustomEvent("mjo-avatar-error",{detail:{message:"Failed to load avatar image"}}))};q.styles=[$`
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
        `];te([n({type:Boolean})],q.prototype,"bordered",2);te([n({type:Boolean})],q.prototype,"disabled",2);te([n({type:Boolean})],q.prototype,"clickable",2);te([n({type:Boolean})],q.prototype,"nameColoured",2);te([n({type:String})],q.prototype,"fallbackIcon",2);te([n({type:String})],q.prototype,"alt",2);te([n({type:String})],q.prototype,"color",2);te([n({type:String})],q.prototype,"name",2);te([n({type:String})],q.prototype,"radius",2);te([n({type:String})],q.prototype,"size",2);te([n({type:String})],q.prototype,"src",2);te([n({type:String})],q.prototype,"value",2);te([n({type:String,attribute:"aria-describedby"})],q.prototype,"ariaDescribedby",2);te([L()],q.prototype,"error",2);te([ne(".container")],q.prototype,"container",2);q=te([S("mjo-avatar")],q);const Bs=(t,e)=>{var r;let a=t.parentElement||t.getRootNode().host,o=js(e,a);if(o)return o;for(;a;){if(a.tagName===e.toUpperCase())return a;if(a=a.parentElement||((r=a.getRootNode())==null?void 0:r.host),a!=null&&a.shadowRoot&&(o=js(e,a),o))return o}return null},js=(t,e)=>e!=null&&e.shadowRoot?e.shadowRoot.querySelector(t):null;var Zc=Object.defineProperty,Qc=Object.getOwnPropertyDescriptor,M=(t,e,a,o)=>{for(var r=o>1?void 0:o?Qc(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Zc(e,a,r),r};const bt=t=>{var a,Ys,r,Hs;class e extends t{constructor(){super(...arguments);b(this,a);b(this,r);this.formIgnore=!1,this.form=null,this.mjoForm=null,this.listenersFormMixin={formData:d=>{l(this,r,Hs).call(this,d)}}}firstUpdated(){l(this,a,Ys).call(this)}disconnectedCallback(){var d;super.disconnectedCallback(),(d=this.form)==null||d.removeEventListener("formdata",this.listenersFormMixin.formData)}updateFormData({name:d,value:f}){d&&(this.dataFormMixin={name:d,value:f})}submiForm(){this.form&&(new FormData(this.form),this.form.dispatchEvent(new SubmitEvent("submit",{cancelable:!0,bubbles:!0})))}}return a=new WeakSet,Ys=function(){var d,f,g,C;this.form=Bs(this,"form"),(d=this.form)==null||d.addEventListener("formdata",this.listenersFormMixin.formData),!this.formIgnore&&(this.mjoForm=(g=(f=this.form)==null?void 0:f.parentNode)==null?void 0:g.host,((C=this.mjoForm)==null?void 0:C.tagName)==="MJO-FORM"&&(this.tagName==="MJO-BUTTON"&&this.type==="submit"?this.mjoForm.submitButton=this:this.mjoForm.elements.push(this)))},r=new WeakSet,Hs=function(d){this.dataFormMixin&&d.formData.set(this.dataFormMixin.name,this.dataFormMixin.value)},M([n({type:Boolean})],e.prototype,"isemail",2),M([n({type:Boolean})],e.prototype,"isurl",2),M([n({type:Boolean})],e.prototype,"required",2),M([n({type:Boolean})],e.prototype,"nospaces",2),M([n({type:Array})],e.prototype,"rangelength",2),M([n({type:Boolean})],e.prototype,"isnumber",2),M([n({type:Array})],e.prototype,"range",2),M([n({type:Array})],e.prototype,"domains",2),M([n({type:String})],e.prototype,"isdate",2),M([n({type:Boolean})],e.prototype,"dateprevious",2),M([n({type:Number})],e.prototype,"minage",2),M([n({type:Number})],e.prototype,"maxage",2),M([n({type:String})],e.prototype,"security",2),M([n({type:String})],e.prototype,"equalto",2),M([n({type:Boolean})],e.prototype,"phonenumber",2),M([n({type:Array})],e.prototype,"phonecountry",2),M([n({type:String})],e.prototype,"pattern",2),M([n({type:Array})],e.prototype,"allowed",2),M([n({type:Number})],e.prototype,"mincheck",2),M([n({type:Number})],e.prototype,"maxcheck",2),M([n({type:Number})],e.prototype,"max",2),M([n({type:Number})],e.prototype,"min",2),M([n({type:Number})],e.prototype,"maxlength",2),M([n({type:Number})],e.prototype,"minlength",2),M([n({type:Boolean,attribute:"form-ignore"})],e.prototype,"formIgnore",2),e};var ed=Object.defineProperty,td=Object.getOwnPropertyDescriptor,ad=(t,e,a,o)=>{for(var r=o>1?void 0:o?td(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&ed(e,a,r),r};let ro=class extends ee(w){constructor(){super(...arguments),this.handleClick=t=>{var i;const e=t.offsetX,a=t.offsetY,o=document.createElement("span");o.style.left=`${e}px`,o.style.top=`${a}px`;const r=(i=this.shadowRoot)==null?void 0:i.querySelector("div.container");r.removeAttribute("hidden"),r.appendChild(o),setTimeout(()=>{o.remove()},800),clearTimeout(this.timeoutRipple),this.timeoutRipple=setTimeout(()=>{r.setAttribute("hidden","")},850)}}render(){return c`<div class="container" hidden></div>`}connectedCallback(){super.connectedCallback(),this.parent=this.parentElement,this.parent.addEventListener("click",this.handleClick)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.parent)==null||t.removeEventListener("click",this.handleClick)}};ro.styles=[$`
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
        `];ro=ad([S("mjo-ripple")],ro);var rd=Object.defineProperty,od=Object.getOwnPropertyDescriptor,yr=(t,e,a,o)=>{for(var r=o>1?void 0:o?od(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&rd(e,a,r),r};let pt=class extends ee(w){constructor(){super(...arguments),this.tag="p",this.size="base",this.weight="regular"}render(){switch(this.tag){case"h1":return c`<h1 class=${`${this.size} ${this.weight}`}><slot></slot></h1>`;case"h2":return c`<h2 class=${`${this.size} ${this.weight}`}><slot></slot></h2>`;case"h3":return c`<h3 class=${`${this.size} ${this.weight}`}><slot></slot></h3>`;case"h4":return c`<h4 class=${`${this.size} ${this.weight}`}><slot></slot></h4>`;case"h5":return c`<h5 class=${`${this.size} ${this.weight}`}><slot></slot></h5>`;case"span":return c`<span class=${`${this.size} ${this.weight}`}><slot></slot></span>`;case"p":return c`<p class=${`${this.size} ${this.weight}`}><slot></slot></p>`;default:return c`<slot></slot>`}}};pt.styles=[$`
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
        `];yr([n({type:String})],pt.prototype,"tag",2);yr([n({type:String})],pt.prototype,"size",2);yr([n({type:String})],pt.prototype,"weight",2);pt=yr([S("mjo-typography")],pt);var id=Object.defineProperty,sd=Object.getOwnPropertyDescriptor,X=(t,e,a,o)=>{for(var r=o>1?void 0:o?sd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&id(e,a,r),r},nd=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ra=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},fa=(t,e,a)=>(nd(t,e,"access private method"),a),oo,qs,ki,Us,io,Vs,so,Js;let H=class extends ee(bt(w)){constructor(){super(...arguments),ra(this,oo),ra(this,ki),ra(this,io),ra(this,so),this.fullwidth=!1,this.disabled=!1,this.loading=!1,this.rounded=!1,this.toggleable=!1,this.smallCaps=!1,this.noink=!1,this.size="medium",this.color="primary",this.variant="default",this.type="button",this.toggle=!1}render(){const t=this.loading?"true":"false",e=this.toggleable?this.toggle?"true":"false":void 0;return c`<button
            type=${this.type}
            data-color=${this.color}
            data-variant=${this.variant}
            data-size=${this.size}
            ?data-rounded=${this.rounded}
            ?data-toggle=${this.toggle}
            ?data-small-caps=${this.smallCaps}
            aria-busy=${t}
            aria-pressed=${v(e)}
            aria-label=${v(this.buttonLabel)}
            aria-describedby=${v(this.describedBy)}
            ?disabled=${this.disabled||this.loading}
            @click=${fa(this,oo,qs)}
        >
            ${this.startIcon&&c` <mjo-icon src=${this.startIcon}></mjo-icon>`}
            <mjo-typography tag="none"><slot></slot></mjo-typography>
            ${this.endIcon&&c` <mjo-icon src=${this.endIcon}></mjo-icon>`}
            ${!this.noink&&!this.disabled&&!this.loading?c`<mjo-ripple></mjo-ripple>`:m}
            ${this.loading?c`<div class="loading" aria-hidden="true"></div>`:m}
        </button>`}updated(t){super.updated(t),(this.disabled||this.loading)&&this.toggle&&(this.toggle=!1),t.has("loading")&&fa(this,so,Js).call(this),t.has("toggle")&&this.toggleable&&fa(this,io,Vs).call(this,t.get("toggle"))}focus(t){var a;const e=(a=this.shadowRoot)==null?void 0:a.querySelector("button");e==null||e.focus(t)}blur(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("button");t==null||t.blur()}click(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("button");t==null||t.click()}setLoading(t){this.loading=t}togglePressed(){this.toggleable&&!this.disabled&&!this.loading&&(this.toggle=!this.toggle)}};oo=new WeakSet;qs=function(t){if(this.disabled||this.loading){t.preventDefault(),t.stopPropagation();return}this.toggleable&&this.type==="button"&&(this.toggle=!this.toggle),this.form&&this.type==="submit"&&this.submiForm(),fa(this,ki,Us).call(this,t)};ki=new WeakSet;Us=function(t){const e=new CustomEvent("mjo-button-click",{detail:{element:this,toggle:this.toggle,originalEvent:t},bubbles:!0,composed:!0});this.dispatchEvent(e)};io=new WeakSet;Vs=function(t){const e=new CustomEvent("mjo-button-toggle",{detail:{element:this,pressed:this.toggle,previousState:t},bubbles:!0,composed:!0});this.dispatchEvent(e)};so=new WeakSet;Js=function(){const t=new CustomEvent("mjo-button-loading-change",{detail:{element:this,loading:this.loading},bubbles:!0,composed:!0});this.dispatchEvent(t)};H.styles=[$`
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
        `];X([n({type:Boolean,reflect:!0})],H.prototype,"fullwidth",2);X([n({type:Boolean,reflect:!0})],H.prototype,"disabled",2);X([n({type:Boolean,reflect:!0})],H.prototype,"loading",2);X([n({type:Boolean,reflect:!0})],H.prototype,"rounded",2);X([n({type:Boolean})],H.prototype,"toggleable",2);X([n({type:Boolean})],H.prototype,"smallCaps",2);X([n({type:Boolean})],H.prototype,"noink",2);X([n({type:String})],H.prototype,"startIcon",2);X([n({type:String})],H.prototype,"endIcon",2);X([n({type:String})],H.prototype,"size",2);X([n({type:String})],H.prototype,"color",2);X([n({type:String})],H.prototype,"variant",2);X([n({type:String})],H.prototype,"type",2);X([n({type:String})],H.prototype,"buttonLabel",2);X([n({type:String})],H.prototype,"describedBy",2);X([L()],H.prototype,"toggle",2);H=X([S("mjo-button")],H);const oa={en:{search:"Search...",calendar:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"]}},es:{search:"Buscar...",calendar:{months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthsShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],weekdays:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],weekdaysShort:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],weekdaysMin:["Do","Lu","Ma","Mi","Ju","Vi","Sá"]}},fr:{search:"Rechercher...",calendar:{months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthsShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],weekdays:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],weekdaysShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],weekdaysMin:["Di","Lu","Ma","Me","Je","Ve","Sa"]}},pt:{search:"Pesquisar...",calendar:{months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],weekdays:["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],weekdaysShort:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],weekdaysMin:["Do","Se","Te","Qa","Qi","Sx","Sá"]}},it:{search:"Cerca...",calendar:{months:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],monthsShort:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],weekdays:["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],weekdaysShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],weekdaysMin:["Do","Lu","Ma","Me","Gi","Ve","Sa"]}},de:{search:"Suchen...",calendar:{months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],weekdays:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],weekdaysShort:["So","Mo","Di","Mi","Do","Fr","Sa"],weekdaysMin:["So","Mo","Di","Mi","Do","Fr","Sa"]}},nl:{search:"Zoeken...",calendar:{months:["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"],monthsShort:["Jan","Feb","Maa","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],weekdays:["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"],weekdaysShort:["Zo","Ma","Di","Wo","Do","Vr","Za"],weekdaysMin:["Zo","Ma","Di","Wo","Do","Vr","Za"]}},bg:{search:"Търсене...",calendar:{months:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],monthsShort:["Яну","Фев","Мар","Апр","Май","Юни","Юли","Авг","Сеп","Окт","Ное","Дек"],weekdays:["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"],weekdaysShort:["Нед","Пон","Вто","Сря","Чет","Пет","Съб"],weekdaysMin:["Не","По","Вт","Ср","Че","Пе","Съ"]}},sr:{search:"Претрага...",calendar:{months:["Јануар","Фебруар","Март","Април","Мај","Јун","Јул","Август","Септембар","Октобар","Новембар","Децембар"],monthsShort:["Јан","Феб","Мар","Апр","Мај","Јун","Јул","Авг","Сеп","Окт","Нов","Дец"],weekdays:["Недеља","Понедељак","Уторак","Среда","Четвртак","Петак","Субота"],weekdaysShort:["Нед","Пон","Уто","Сре","Чет","Пет","Суб"],weekdaysMin:["Не","По","Ут","Ср","Че","Пе","Су"]}},ru:{search:"Поиск...",calendar:{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],weekdays:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],weekdaysShort:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],weekdaysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]}},zh:{search:"搜索...",calendar:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],weekdays:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],weekdaysShort:["周日","周一","周二","周三","周四","周五","周六"],weekdaysMin:["日","一","二","三","四","五","六"]}},ja:{search:"検索...",calendar:{months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],weekdays:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],weekdaysShort:["日","月","火","水","木","金","土"],weekdaysMin:["日","月","火","水","木","金","土"]}},ko:{search:"검색...",calendar:{months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],monthsShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],weekdays:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],weekdaysShort:["일","월","화","수","목","금","토"],weekdaysMin:["일","월","화","수","목","금","토"]}},tr:{search:"Arama...",calendar:{months:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],monthsShort:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],weekdays:["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],weekdaysShort:["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],weekdaysMin:["Pz","Pt","Sa","Ça","Pe","Cu","Ct"]}},pl:{search:"Szukaj...",calendar:{months:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],monthsShort:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],weekdays:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],weekdaysShort:["Nie","Pon","Wto","Śro","Czw","Pią","Sob"],weekdaysMin:["Ni","Po","Wt","Śr","Cz","Pi","So"]}}};class R{static isSameDay(e,a){return e.getFullYear()===a.getFullYear()&&e.getMonth()===a.getMonth()&&e.getDate()===a.getDate()}static formatDate(e){const a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${o}-${r}`}static getDateLocale(e){return{en:"en-US",es:"es-ES",fr:"fr-FR",pt:"pt-PT",it:"it-IT",de:"de-DE",nl:"nl-NL",bg:"bg-BG",sr:"sr-RS",ru:"ru-RU",zh:"zh-CN",ja:"ja-JP",ko:"ko-KR",tr:"tr-TR",pl:"pl-PL"}[e]||"en-US"}static isDateDisabled(e,a,o,r,i){if(a)return!0;if(o){const s=new Date(o);if(s.setDate(s.getDate()-1),e<s)return!0}if(r){const s=new Date(r);if(e>s)return!0}if(i){const s=R.formatDate(e);return i.includes(s)}return!1}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ld=gr(class extends fr{constructor(t){var e;if(super(t),t.type!==ke.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var o,r;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!((o=this.nt)!=null&&o.has(i))&&this.st.add(i);return this.render(e)}const a=t.element.classList;for(const i of this.st)i in e||(a.remove(i),this.st.delete(i));for(const i in e){const s=!!e[i];s===this.st.has(i)||(r=this.nt)!=null&&r.has(i)||(s?(a.add(i),this.st.add(i)):(a.remove(i),this.st.delete(i)))}return Fe}});var cd=Object.defineProperty,dd=Object.getOwnPropertyDescriptor,re=(t,e,a,o)=>{for(var r=o>1?void 0:o?dd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&cd(e,a,r),r},hd=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},Rr=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Ir=(t,e,a)=>(hd(t,e,"access private method"),a),no,Ks,lo,Gs,co,Xs;let J=class extends w{constructor(){super(...arguments),Rr(this,no),Rr(this,lo),Rr(this,co),this.isEmpty=!1,this.isToday=!1,this.isSelected=!1,this.isInRange=!1,this.isRangeStart=!1,this.isRangeEnd=!1,this.isDisabled=!1,this.isHovered=!1,this.isFocused=!1,this.showToday=!0,this.size="medium"}get dateLabel(){if(this.isEmpty||!this.month||!this.year)return"";const t=new Date(this.year,this.month,this.day);let a=new Intl.DateTimeFormat("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t);return this.isToday&&(a+=", Today"),this.isSelected&&(a+=", Selected"),this.isRangeStart&&(a+=", Range start"),this.isRangeEnd&&(a+=", Range end"),this.isInRange&&(a+=", In selected range"),this.isDisabled&&(a+=", Disabled"),a}render(){if(this.isEmpty)return c`<div class="day empty" role="gridcell"></div>`;const t={day:!0,today:this.isToday&&this.showToday,selected:this.isSelected,"in-range":this.isInRange,"range-start":this.isRangeStart,"range-end":this.isRangeEnd,disabled:this.isDisabled,"hovered-range":this.isHovered,focused:this.isFocused};return c`
            <div
                class=${ld(t)}
                part="day ${this.isSelected?"selected":""} ${this.isToday?"today":""}"
                role="gridcell"
                aria-label=${this.dateLabel}
                aria-selected=${this.isSelected?"true":"false"}
                aria-current=${this.isToday?"date":"false"}
                aria-disabled=${this.isDisabled?"true":"false"}
                tabindex=${this.isFocused?0:-1}
                @click=${Ir(this,no,Ks)}
                @mouseenter=${Ir(this,lo,Gs)}
                @mouseleave=${Ir(this,co,Xs)}
            >
                <mjo-typography tag="none">${this.day}</mjo-typography>
            </div>
        `}};no=new WeakSet;Ks=function(){this.isDisabled||this.dispatchEvent(new CustomEvent("day-click",{detail:{day:this.day},bubbles:!0,composed:!0}))};lo=new WeakSet;Gs=function(){this.isDisabled||this.dispatchEvent(new CustomEvent("day-hover",{detail:{day:this.day},bubbles:!0,composed:!0}))};co=new WeakSet;Xs=function(){this.dispatchEvent(new CustomEvent("day-leave",{detail:{day:this.day},bubbles:!0,composed:!0}))};J.styles=$`
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
    `;re([n({type:Number})],J.prototype,"day",2);re([n({type:Number})],J.prototype,"month",2);re([n({type:Number})],J.prototype,"year",2);re([n({type:Boolean})],J.prototype,"isEmpty",2);re([n({type:Boolean})],J.prototype,"isToday",2);re([n({type:Boolean})],J.prototype,"isSelected",2);re([n({type:Boolean})],J.prototype,"isInRange",2);re([n({type:Boolean})],J.prototype,"isRangeStart",2);re([n({type:Boolean})],J.prototype,"isRangeEnd",2);re([n({type:Boolean})],J.prototype,"isDisabled",2);re([n({type:Boolean})],J.prototype,"isHovered",2);re([n({type:Boolean})],J.prototype,"isFocused",2);re([n({type:Boolean})],J.prototype,"showToday",2);re([n({type:String})],J.prototype,"size",2);J=re([S("calendar-day")],J);var pd=Object.defineProperty,ud=Object.getOwnPropertyDescriptor,U=(t,e,a,o)=>{for(var r=o>1?void 0:o?ud(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&pd(e,a,r),r},md=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},be=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},ye=(t,e,a)=>(md(t,e,"access private method"),a),ho,Zs,po,Qs,uo,en,mo,tn,fo,an,go,rn,vo,on,bo,sn,yo,nn;let N=class extends w{constructor(){super(...arguments),be(this,ho),be(this,po),be(this,uo),be(this,mo),be(this,fo),be(this,go),be(this,vo),be(this,bo),be(this,yo),this.side="single",this.firstDayOfWeek="monday",this.mode="single",this.showToday=!0,this.size="medium",this.disabled=!1,this.minDate="",this.maxDate=""}get gridLabel(){return`Calendar grid for ${this.year}-${String(this.month+1).padStart(2,"0")}`}render(){const t=new Date(this.year,this.month,1),e=new Date(this.year,this.month+1,0),a=this.firstDayOfWeek==="monday"?t.getDay()===0?6:t.getDay()-1:t.getDay(),o=e.getDate(),r=new Date,i=this.weekDays&&Array.isArray(this.weekDays)&&this.weekDays.length>=7?this.weekDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],s=this.firstDayOfWeek==="monday"?[i[1],i[2],i[3],i[4],i[5],i[6],i[0]]:i,p=[];for(let d=0;d<a;d++)p.push(c`<calendar-day isEmpty .size=${this.size}></calendar-day>`);for(let d=1;d<=o;d++){const f=new Date(this.year,this.month,d),g=R.isSameDay(f,r),C=ye(this,mo,tn).call(this,f),O=this.mode==="range"&&ye(this,fo,an).call(this,f),pe=this.mode==="range"&&ye(this,go,rn).call(this,f),wt=this.mode==="range"&&ye(this,vo,on).call(this,f),cc=R.isDateDisabled(f,this.disabled,this.minDate,this.maxDate,this.disabledDates),dc=this.mode==="range"&&ye(this,bo,sn).call(this,f);p.push(c`
                <calendar-day
                    day=${d}
                    month=${this.month}
                    year=${this.year}
                    ?isToday=${g}
                    ?isSelected=${C}
                    ?isInRange=${O}
                    ?isRangeStart=${pe}
                    ?isRangeEnd=${wt}
                    ?isDisabled=${cc}
                    ?isHovered=${dc}
                    ?isFocused=${ye(this,yo,nn).call(this,f)}
                    ?showToday=${this.showToday}
                    size=${this.size}
                    @day-click=${ye(this,ho,Zs)}
                    @day-hover=${ye(this,po,Qs)}
                    @day-leave=${ye(this,uo,en)}
                ></calendar-day>
            `)}return c`
            <div class="calendar-grid" part="calendar-grid" role="grid" aria-label=${this.gridLabel}>
                <!-- Week day headers -->
                <div class="week-header" role="row">
                    ${s.map(d=>c`
                            <div class="week-day" role="columnheader">
                                <mjo-typography tag="none" size="body1">${d}</mjo-typography>
                            </div>
                        `)}
                </div>
                <!-- Days grid -->
                <div class="days-grid">${p}</div>
            </div>
        `}};ho=new WeakSet;Zs=function(t){const e=t.detail.day,a=new Date(this.year,this.month,e);this.dispatchEvent(new CustomEvent("date-click",{detail:{date:a,formattedDate:R.formatDate(a)},bubbles:!0,composed:!0}))};po=new WeakSet;Qs=function(t){const e=t.detail.day,a=new Date(this.year,this.month,e);this.dispatchEvent(new CustomEvent("date-hover",{detail:{date:a},bubbles:!0,composed:!0}))};uo=new WeakSet;en=function(){this.dispatchEvent(new CustomEvent("date-leave",{bubbles:!0,composed:!0}))};mo=new WeakSet;tn=function(t){return this.mode==="single"&&this.selectedDate?R.isSameDay(t,this.selectedDate):!1};fo=new WeakSet;an=function(t){return!this.selectedStartDate||!this.selectedEndDate?!1:t>this.selectedStartDate&&t<this.selectedEndDate};go=new WeakSet;rn=function(t){return this.selectedStartDate?R.isSameDay(t,this.selectedStartDate):!1};vo=new WeakSet;on=function(t){return this.selectedEndDate?R.isSameDay(t,this.selectedEndDate):!1};bo=new WeakSet;sn=function(t){if(!this.selectedStartDate||!this.hoverDate||this.selectedEndDate)return!1;const e=this.selectedStartDate,a=this.hoverDate;return a<e?t>a&&t<e:t>e&&t<a};yo=new WeakSet;nn=function(t){return this.focusedDate?R.isSameDay(t,this.focusedDate):!1};N.styles=$`
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
    `;U([n({type:Number})],N.prototype,"month",2);U([n({type:Number})],N.prototype,"year",2);U([n({type:String})],N.prototype,"side",2);U([n({type:Array})],N.prototype,"weekDays",2);U([n({type:String})],N.prototype,"firstDayOfWeek",2);U([n({type:String})],N.prototype,"mode",2);U([n({type:Boolean})],N.prototype,"showToday",2);U([n({type:String})],N.prototype,"size",2);U([n({type:Boolean})],N.prototype,"disabled",2);U([n({type:String})],N.prototype,"minDate",2);U([n({type:String})],N.prototype,"maxDate",2);U([n({type:Array})],N.prototype,"disabledDates",2);U([n({type:Object})],N.prototype,"selectedDate",2);U([n({type:Object})],N.prototype,"selectedStartDate",2);U([n({type:Object})],N.prototype,"selectedEndDate",2);U([n({type:Object})],N.prototype,"hoverDate",2);U([n({type:Object})],N.prototype,"focusedDate",2);N=U([S("calendar-grid")],N);const fd='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>',gd='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>';var vd=Object.defineProperty,bd=Object.getOwnPropertyDescriptor,Te=(t,e,a,o)=>{for(var r=o>1?void 0:o?bd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&vd(e,a,r),r},yd=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ia=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},sa=(t,e,a)=>(yd(t,e,"access private method"),a),wo,ln,jo,cn,ko,dn,xo,hn;let ve=class extends w{constructor(){super(...arguments),ia(this,wo),ia(this,jo),ia(this,ko),ia(this,xo),this.side="single",this.disabled=!1,this.monthPickerOpen=!1,this.yearPickerOpen=!1}get previousMonthLabel(){if(!this.monthNames||!Array.isArray(this.monthNames)||this.monthNames.length<12)return"Previous month";const t=new Date(this.year,this.month-1,1),e=t.getMonth();return e<0||e>=this.monthNames.length||!this.monthNames[e]?"Previous month":`Go to ${this.monthNames[e]} ${t.getFullYear()}`}get nextMonthLabel(){if(!this.monthNames||!Array.isArray(this.monthNames)||this.monthNames.length<12)return"Next month";const t=new Date(this.year,this.month+1,1),e=t.getMonth();return e<0||e>=this.monthNames.length||!this.monthNames[e]?"Next month":`Go to ${this.monthNames[e]} ${t.getFullYear()}`}get currentMonthYearLabel(){return!this.monthNames||!Array.isArray(this.monthNames)||this.monthNames.length<12?`Month ${this.month+1} ${this.year}`:this.month<0||this.month>=this.monthNames.length||!this.monthNames[this.month]?`Month ${this.month+1} ${this.year}`:`${this.monthNames[this.month]} ${this.year}`}render(){return c`
            <div class="calendar-header" part="header" role="banner">
                <div class="navigation" part="navigation" role="toolbar" aria-label="Calendar navigation">
                    ${this.side==="single"||this.side==="left"?c`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${fd}
                                  @click=${sa(this,wo,ln)}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.previousMonthLabel}
                                  title=${this.previousMonthLabel}
                              ></mjo-button>
                          `:m}

                    <div class="month-year-selectors" part="month-year" role="group" aria-label=${this.currentMonthYearLabel}>
                        <mjo-button
                            variant="text"
                            @click=${sa(this,ko,dn)}
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
                            @click=${sa(this,xo,hn)}
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
                                  startIcon=${gd}
                                  @click=${sa(this,jo,cn)}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.nextMonthLabel}
                                  title=${this.nextMonthLabel}
                              ></mjo-button>
                          `:m}
                </div>
            </div>
        `}};wo=new WeakSet;ln=function(){this.dispatchEvent(new CustomEvent("navigate",{detail:{direction:-1,side:this.side},bubbles:!0,composed:!0}))};jo=new WeakSet;cn=function(){this.dispatchEvent(new CustomEvent("navigate",{detail:{direction:1,side:this.side},bubbles:!0,composed:!0}))};ko=new WeakSet;dn=function(){this.dispatchEvent(new CustomEvent("month-picker",{detail:{side:this.side},bubbles:!0,composed:!0}))};xo=new WeakSet;hn=function(){this.dispatchEvent(new CustomEvent("year-picker",{detail:{side:this.side},bubbles:!0,composed:!0}))};ve.styles=$`
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
    `;Te([n({type:Number})],ve.prototype,"month",2);Te([n({type:Number})],ve.prototype,"year",2);Te([n({type:String})],ve.prototype,"side",2);Te([n({type:Array})],ve.prototype,"monthNames",2);Te([n({type:Boolean})],ve.prototype,"disabled",2);Te([n({type:Boolean})],ve.prototype,"monthPickerOpen",2);Te([n({type:Boolean})],ve.prototype,"yearPickerOpen",2);ve=Te([S("calendar-header")],ve);var wd=Object.defineProperty,jd=Object.getOwnPropertyDescriptor,Kt=(t,e,a,o)=>{for(var r=o>1?void 0:o?jd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&wd(e,a,r),r},kd=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},na=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},ue=(t,e,a)=>(kd(t,e,"access private method"),a),za,xi,ut,It,$o,pn,ot,xt;let qe=class extends w{constructor(){super(...arguments),na(this,za),na(this,ut),na(this,$o),na(this,ot),this.selectedMonth=new Date().getMonth(),this.monthNames=[],this.disabled=!1,this.focusedMonth=this.selectedMonth}render(){return c`
            <div class="month-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select month" @keydown=${ue(this,$o,pn)}>
                <div class="months-grid" role="grid" aria-label="Month selection grid">
                    ${this.monthNames.map((t,e)=>c`
                            <button
                                class="month-button"
                                role="gridcell"
                                ?data-selected=${e===this.selectedMonth}
                                ?disabled=${this.disabled}
                                @click=${()=>ue(this,za,xi).call(this,e)}
                                tabindex=${this.disabled?-1:e===this.focusedMonth?0:-1}
                                aria-label=${t}
                                aria-selected=${e===this.selectedMonth?"true":"false"}
                                @focus=${()=>ue(this,ut,It).call(this,e)}
                            >
                                ${t}
                            </button>
                        `)}
                </div>
            </div>
        `}};za=new WeakSet;xi=function(t){this.disabled||(this.selectedMonth=t,this.dispatchEvent(new CustomEvent("month-selected",{detail:{month:t},bubbles:!0,composed:!0})))};ut=new WeakSet;It=function(t){this.focusedMonth=t};$o=new WeakSet;pn=function(t){if(this.disabled)return;const e=t.key;let a=!1;switch(e){case"ArrowLeft":ue(this,ot,xt).call(this,-1),a=!0;break;case"ArrowRight":ue(this,ot,xt).call(this,1),a=!0;break;case"ArrowUp":ue(this,ot,xt).call(this,-3),a=!0;break;case"ArrowDown":ue(this,ot,xt).call(this,3),a=!0;break;case"Home":ue(this,ut,It).call(this,0),a=!0;break;case"End":ue(this,ut,It).call(this,11),a=!0;break;case"Enter":case" ":ue(this,za,xi).call(this,this.focusedMonth),a=!0;break}a&&(t.preventDefault(),t.stopPropagation())};ot=new WeakSet;xt=function(t){let e=this.focusedMonth+t;e<0&&(e=11),e>11&&(e=0),ue(this,ut,It).call(this,e),this.updateComplete.then(()=>{var r;const a=(r=this.shadowRoot)==null?void 0:r.querySelectorAll("button"),o=a==null?void 0:a[this.focusedMonth];o==null||o.focus()})};qe.styles=$`
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
    `;Kt([n({type:Number})],qe.prototype,"selectedMonth",2);Kt([n({type:Array})],qe.prototype,"monthNames",2);Kt([n({type:Boolean})],qe.prototype,"disabled",2);Kt([L()],qe.prototype,"focusedMonth",2);qe=Kt([S("calendar-month-picker")],qe);var xd=Object.defineProperty,$d=Object.getOwnPropertyDescriptor,Ve=(t,e,a,o)=>{for(var r=o>1?void 0:o?$d(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&xd(e,a,r),r},Sd=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},We=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},I=(t,e,a)=>(Sd(t,e,"access private method"),a),lt,Lt,Aa,$i,Ta,Si,Oa,_i,De,Ne,So,un,it,$t;let $e=class extends w{constructor(){super(...arguments),We(this,lt),We(this,Aa),We(this,Ta),We(this,Oa),We(this,De),We(this,So),We(this,it),this.selectedYear=new Date().getFullYear(),this.disabled=!1,this.startYear=Math.floor(new Date().getFullYear()/10)*10,this.focusedYear=new Date().getFullYear()}get years(){const t=[];for(let e=this.startYear;e<this.startYear+12;e++)t.push(e);return t}get previousDecadeLabel(){return`${this.startYear-10} - ${this.startYear-1}`}get nextDecadeLabel(){return`${this.startYear+12} - ${this.startYear+21}`}render(){return c`
            <div class="year-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select year" @keydown=${I(this,So,un)}>
                <div class="year-navigation">
                    <button
                        class="nav-button"
                        ?disabled=${this.disabled}
                        @click=${I(this,Ta,Si)}
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
                        @click=${I(this,Oa,_i)}
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
                                ?disabled=${this.disabled||I(this,lt,Lt).call(this,t)}
                                @click=${()=>I(this,Aa,$i).call(this,t)}
                                tabindex=${this.disabled||I(this,lt,Lt).call(this,t)?-1:t===this.focusedYear?0:-1}
                                aria-label=${t.toString()}
                                aria-selected=${t===this.selectedYear?"true":"false"}
                                @focus=${()=>I(this,De,Ne).call(this,t)}
                            >
                                ${t}
                            </button>
                        `)}
                </div>
            </div>
        `}};lt=new WeakSet;Lt=function(t){return!!(this.minYear&&t<this.minYear||this.maxYear&&t>this.maxYear)};Aa=new WeakSet;$i=function(t){this.disabled||I(this,lt,Lt).call(this,t)||(this.selectedYear=t,this.dispatchEvent(new CustomEvent("year-selected",{detail:{year:t},bubbles:!0,composed:!0})))};Ta=new WeakSet;Si=function(){this.disabled||(this.startYear-=12)};Oa=new WeakSet;_i=function(){this.disabled||(this.startYear+=12)};De=new WeakSet;Ne=function(t){this.focusedYear=t};So=new WeakSet;un=function(t){if(this.disabled)return;const e=t.key;let a=!1;switch(e){case"ArrowLeft":I(this,it,$t).call(this,-1),a=!0;break;case"ArrowRight":I(this,it,$t).call(this,1),a=!0;break;case"ArrowUp":I(this,it,$t).call(this,-4),a=!0;break;case"ArrowDown":I(this,it,$t).call(this,4),a=!0;break;case"Home":I(this,De,Ne).call(this,this.startYear),a=!0;break;case"End":I(this,De,Ne).call(this,this.startYear+11),a=!0;break;case"PageUp":I(this,Ta,Si).call(this),I(this,De,Ne).call(this,Math.max(this.startYear,this.focusedYear-12)),a=!0;break;case"PageDown":I(this,Oa,_i).call(this),I(this,De,Ne).call(this,Math.min(this.startYear+11,this.focusedYear+12)),a=!0;break;case"Enter":case" ":I(this,lt,Lt).call(this,this.focusedYear)||(I(this,Aa,$i).call(this,this.focusedYear),a=!0);break}a&&(t.preventDefault(),t.stopPropagation())};it=new WeakSet;$t=function(t){let e=this.focusedYear+t;e<this.startYear&&(e=this.startYear),e>this.startYear+11&&(e=this.startYear+11),I(this,De,Ne).call(this,e),this.updateComplete.then(()=>{var i;const a=(i=this.shadowRoot)==null?void 0:i.querySelectorAll(".year-button"),o=e-this.startYear,r=a==null?void 0:a[o];r==null||r.focus()})};$e.styles=$`
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
    `;Ve([n({type:Number})],$e.prototype,"selectedYear",2);Ve([n({type:Boolean})],$e.prototype,"disabled",2);Ve([n({type:Number})],$e.prototype,"minYear",2);Ve([n({type:Number})],$e.prototype,"maxYear",2);Ve([L()],$e.prototype,"startYear",2);Ve([L()],$e.prototype,"focusedYear",2);$e=Ve([S("calendar-year-picker")],$e);var _d=Object.defineProperty,Dd=Object.getOwnPropertyDescriptor,k=(t,e,a,o)=>{for(var r=o>1?void 0:o?Dd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&_d(e,a,r),r},Di=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ct=(t,e,a)=>(Di(t,e,"read from private field"),a?a.call(t):e.get(t)),u=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},mn=(t,e,a,o)=>(Di(t,e,"write to private field"),o?o.call(t,a):e.set(t,a),a),h=(t,e,a)=>(Di(t,e,"access private method"),a),Ce,_o,fn,Do,gn,wr,Ci,Ei,vn,Ft,Pa,Co,bn,jr,Mi,zi,yn,Wa,Ai,Ti,wn,Oi,jn,Ra,Eo,kn,st,St,nt,_t,Pi,xn,Wi,$n,Ri,Sn,Je,yt,Ii,_n,Gt,kr,de,fe,ga,Mo,Li,Dn,Fi,Cn,Ni,En,Bi,Mn,Yi,zn,Hi,An,qi,Tn,Ui,On,xr,Vi,Xt,$r,Sr,Ji,_r,Ki,Gi,Pn,Xi,Wn,Zi,Rn,va,zo,Nt,Dr,Ia,Ao,Qi,In,es,Ln,Dt,ba,Ct,ya,Et,wa,To,Fn;let y=class extends ee(bt(w)){constructor(){super(...arguments),u(this,_o),u(this,Do),u(this,wr),u(this,Ei),u(this,Ft),u(this,Co),u(this,jr),u(this,zi),u(this,Wa),u(this,Ti),u(this,Oi),u(this,Eo),u(this,st),u(this,nt),u(this,Pi),u(this,Wi),u(this,Ri),u(this,Je),u(this,Ii),u(this,Gt),u(this,de),u(this,ga),u(this,Li),u(this,Fi),u(this,Ni),u(this,Bi),u(this,Yi),u(this,Hi),u(this,qi),u(this,Ui),u(this,xr),u(this,Xt),u(this,Sr),u(this,_r),u(this,Gi),u(this,Xi),u(this,Zi),u(this,va),u(this,Nt),u(this,Ia),u(this,Qi),u(this,es),u(this,Dt),u(this,Ct),u(this,Et),u(this,To),this.mode="single",this.locale="en",this.disabled=!1,this.size="medium",this.color="primary",this.showToday=!0,this.firstDayOfWeek="monday",this.rangeCalendars="auto",this.enableKeyboardNavigation=!0,this.announceSelections=!0,this.ariaLabelledby=null,this.ariaDescribedby=null,this.ariaLive="polite",this.picker={open:!1,type:void 0,index:0},this.autoDual=!1,this.displayedMonths=[],this.announcementText="",u(this,Ce,void 0),u(this,Ra,()=>h(this,Wa,Ai).call(this))}get currentLocale(){return oa[this.locale]||oa.en}get monthNames(){const t=this.currentLocale;return t&&t.calendar?t.calendar.months:oa.en.calendar.months}get weekDays(){const t=this.currentLocale;return t&&t.calendar?t.calendar.weekdaysShort:oa.en.calendar.weekdaysShort}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.mode==="range"?this.selectedStartDate&&this.selectedEndDate?`Date range picker. Selected from ${R.formatDate(this.selectedStartDate)} to ${R.formatDate(this.selectedEndDate)}`:"Date range picker. Use arrow keys to navigate, Enter to select.":this.selectedDate?`Date picker. Selected date: ${R.formatDate(this.selectedDate)}`:"Date picker. Use arrow keys to navigate, Enter to select."}get computedRole(){return"application"}render(){const t=`calendar-${Math.random().toString(36).substring(2,9)}`;return c`
            <div
                id=${t}
                class="calendar"
                role="application"
                aria-label=${this.computedAriaLabel}
                aria-labelledby=${v(this.ariaLabelledby||void 0)}
                aria-describedby=${v(this.ariaDescribedby||void 0)}
                aria-live=${this.announcementText?this.ariaLive:"off"}
                tabindex=${this.disabled?-1:0}
                @keydown=${this.enableKeyboardNavigation?h(this,Eo,kn):m}
            >
                ${this.mode==="range"?h(this,_o,fn).call(this):h(this,Do,gn).call(this)}
                ${this.announcementText?c`<div class="sr-only" aria-live=${this.ariaLive}>${this.announcementText}</div>`:m}
            </div>
        `}connectedCallback(){super.connectedCallback(),h(this,ga,Mo).call(this),h(this,de,fe).call(this),this.updateComplete.then(()=>{h(this,Co,bn).call(this)})}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("startDate")||t.has("endDate")||t.has("mode"))&&(h(this,ga,Mo).call(this),h(this,de,fe).call(this))}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",ct(this,Ra)),ct(this,Ce)&&(clearTimeout(ct(this,Ce)),mn(this,Ce,void 0))}getDisplayedMonths(){return[...this.displayedMonths]}setDisplayedMonths(t,e=!0){if(!Array.isArray(t)||t.length===0)return;t.length>2&&(t=t.slice(0,2));const a=t.map(o=>({month:o.month,year:o.year}));if(a.length===2&&e){const o=a[0],r=h(this,To,Fn).call(this,o,1),i=a[1];(i.month!==r.month||i.year!==r.year)&&(a[1]=r)}this.displayedMonths=a}goToMonth(t){if(!t||typeof t!="object")throw new Error("Option param expect an object");t.year||(t.year=new Date().getFullYear());const{month:e,year:a,side:o}=t;if(typeof e!="number")throw new Error("Requires a valid month number. Got: "+typeof e);if(typeof a!="number")throw new Error("Requires a valid year number. Got: "+typeof a);const r=Math.max(1,Math.min(12,e)),i=h(this,Ct,ya).call(this,o)||h(this,Dt,ba).call(this);h(this,Et,wa).call(this,r-1,a,i)}goToYear(t){if(!t||typeof t!="object")throw new Error("Option param expect an object");const{year:e,side:a}=t;if(typeof e!="number"||e<1e3||e>9999)throw new Error("goToYear() requires a valid year (1000-9999). Got: "+e);const o=h(this,Ct,ya).call(this,a)||h(this,Dt,ba).call(this),r=this.getDisplayedMonths();let i;o==="right"&&r.length>=2?i=r[1].month:o==="left"&&r.length>=1?i=r[0].month:i=r.length>0?r[0].month:new Date().getMonth(),h(this,Et,wa).call(this,i,e,o)}goToDate(t){if(!t||typeof t!="object")throw new Error("Option param expect an object");const{date:e,side:a}=t;let o;if(e instanceof Date)o=new Date(e);else if(typeof e=="string")o=new Date(e);else throw new Error("Date param expect a Date object or date string. Got: "+typeof e);if(isNaN(o.getTime()))throw new Error("Date param expect a valid date. Got: "+e);const r=h(this,Ct,ya).call(this,a)||h(this,Dt,ba).call(this),i=o.getMonth(),s=o.getFullYear();h(this,Et,wa).call(this,i,s,r)}resetSelection(){h(this,va,zo).call(this)}reset(){h(this,va,zo).call(this)}selectDate(t){h(this,Nt,Dr).call(this,t)}};Ce=new WeakMap;_o=new WeakSet;fn=function(){return h(this,jr,Mi).call(this)?h(this,Ei,vn).call(this):h(this,wr,Ci).call(this,!0)};Do=new WeakSet;gn=function(){return h(this,wr,Ci).call(this)};wr=new WeakSet;Ci=function(t=!1){if(this.displayedMonths.length===0){const a=new Date;this.displayedMonths=[{month:a.getMonth(),year:a.getFullYear()}]}const e=this.displayedMonths[0];return c`
            <div class="calendar-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${h(this,Ft,Pa).call(this,{month:e.month,year:e.year,side:"single",forceMode:t?"range":this.mode})}
            </div>
        `};Ei=new WeakSet;vn=function(){if(this.displayedMonths.length!==2){if(this.displayedMonths.length===1){const e=this.displayedMonths[0],a=new Date(e.year,e.month+1,1);this.displayedMonths=[e,{month:a.getMonth(),year:a.getFullYear()}]}else if(this.displayedMonths.length===0){const e=new Date,a=new Date(e.getFullYear(),e.getMonth()+1,1);this.displayedMonths=[{month:e.getMonth(),year:e.getFullYear()},{month:a.getMonth(),year:a.getFullYear()}]}}const t=this.displayedMonths;return c`
            <div class="calendar-range-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${h(this,Ft,Pa).call(this,{month:t[0].month,year:t[0].year,side:"left"})}
                ${h(this,Ft,Pa).call(this,{month:t[1].month,year:t[1].year,side:"right"})}
            </div>
        `};Ft=new WeakSet;Pa=function(t){const{month:e,year:a,side:o,forceMode:r}=t,i=h(this,Sr,Ji).call(this,o),s=this.picker.open&&this.picker.index===i,p=r??this.mode;return c`
            <div class="calendar-side" data-side=${o}>
                <calendar-header
                    month=${e}
                    year=${a}
                    .monthNames=${this.monthNames}
                    ?disabled=${this.disabled}
                    ?monthPickerOpen=${this.picker.open&&this.picker.type==="month"&&s}
                    ?yearPickerOpen=${this.picker.open&&this.picker.type==="year"&&s}
                    side=${o}
                    @navigate=${h(this,Li,Dn)}
                    @month-picker=${h(this,Fi,Cn)}
                    @year-picker=${h(this,Ni,En)}
                ></calendar-header>
                <calendar-grid
                    month=${e}
                    year=${a}
                    .weekDays=${this.weekDays}
                    firstDayOfWeek=${this.firstDayOfWeek}
                    mode=${p}
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
                    side=${o}
                    @date-click=${h(this,Bi,Mn)}
                    @date-hover=${h(this,Yi,zn)}
                    @date-leave=${h(this,Hi,An)}
                ></calendar-grid>
                ${this.picker.open&&this.picker.type==="month"&&s?c`
                          <calendar-month-picker
                              selectedMonth=${e}
                              .monthNames=${this.monthNames}
                              ?disabled=${this.disabled}
                              @month-selected=${h(this,qi,Tn)}
                              @click=${d=>d.stopPropagation()}
                          ></calendar-month-picker>
                      `:this.picker.open&&this.picker.type==="year"&&s?c`
                            <calendar-year-picker
                                selectedYear=${a}
                                ?disabled=${this.disabled}
                                @year-selected=${h(this,Ui,On)}
                                @click=${d=>d.stopPropagation()}
                            ></calendar-year-picker>
                        `:m}
            </div>
        `};Co=new WeakSet;bn=function(){window.addEventListener("resize",ct(this,Ra)),h(this,Wa,Ai).call(this)};jr=new WeakSet;Mi=function(){if(this.mode!=="range")return!1;const t=this.rangeCalendars;return t==="2"?!0:t==="1"?!1:this.autoDual};zi=new WeakSet;yn=function(){var o;if(this.rangeCalendars!=="auto"||this.mode!=="range")return;const t=(o=this.parentElement)==null?void 0:o.getBoundingClientRect().width,e=this.getBoundingClientRect(),a=t||e.width||window.innerWidth;h(this,Ti,wn).call(this,a)};Wa=new WeakSet;Ai=function(){ct(this,Ce)&&clearTimeout(ct(this,Ce)),mn(this,Ce,window.setTimeout(()=>{h(this,zi,yn).call(this)},16))};Ti=new WeakSet;wn=function(t){const e=t>=y.AUTO_DUAL_THRESHOLD;e!==this.autoDual&&(this.autoDual=e,h(this,Oi,jn).call(this),this.requestUpdate())};Oi=new WeakSet;jn=function(){if(this.mode==="range")if(this.autoDual&&this.displayedMonths.length===1){const t=this.displayedMonths[0],e=new Date(t.year,t.month+1,1);this.displayedMonths=[t,{month:e.getMonth(),year:e.getFullYear()}]}else!this.autoDual&&this.displayedMonths.length===2&&(this.displayedMonths=[this.displayedMonths[0]])};Ra=new WeakMap;Eo=new WeakSet;kn=function(t){if(this.disabled||this.picker.open)return;const e=t.key;let a=!1;const o=this.focusedDate||this.selectedDate||new Date;switch(e){case"ArrowLeft":h(this,st,St).call(this,o,-1),a=!0;break;case"ArrowRight":h(this,st,St).call(this,o,1),a=!0;break;case"ArrowUp":h(this,st,St).call(this,o,-7),a=!0;break;case"ArrowDown":h(this,st,St).call(this,o,7),a=!0;break;case"Home":h(this,Pi,xn).call(this,o),a=!0;break;case"End":h(this,Wi,$n).call(this,o),a=!0;break;case"PageUp":t.ctrlKey?h(this,nt,_t).call(this,o,-12):h(this,nt,_t).call(this,o,-1),a=!0;break;case"PageDown":t.ctrlKey?h(this,nt,_t).call(this,o,12):h(this,nt,_t).call(this,o,1),a=!0;break;case"Enter":case" ":this.focusedDate&&(h(this,Nt,Dr).call(this,this.focusedDate),a=!0);break;case"Escape":h(this,Ii,_n).call(this),a=!0;break;case"t":case"T":!t.ctrlKey&&!t.altKey&&!t.metaKey&&(h(this,Ri,Sn).call(this),a=!0);break}a&&(t.preventDefault(),t.stopPropagation())};st=new WeakSet;St=function(t,e){const a=new Date(t);a.setDate(a.getDate()+e),h(this,Je,yt).call(this,a)};nt=new WeakSet;_t=function(t,e){const a=new Date(t);a.setMonth(a.getMonth()+e),h(this,Je,yt).call(this,a)};Pi=new WeakSet;xn=function(t){const e=new Date(t),a=e.getDay(),o=this.firstDayOfWeek==="monday"?a===0?6:a-1:a;e.setDate(e.getDate()-o),h(this,Je,yt).call(this,e)};Wi=new WeakSet;$n=function(t){const e=new Date(t),a=e.getDay(),o=this.firstDayOfWeek==="monday"?a===0?0:7-a:6-a;e.setDate(e.getDate()+o),h(this,Je,yt).call(this,e)};Ri=new WeakSet;Sn=function(){const t=new Date;h(this,Je,yt).call(this,t),this.displayedMonths=[{month:t.getMonth(),year:t.getFullYear()}]};Je=new WeakSet;yt=function(t){this.focusedDate=t;const e=t.getMonth(),a=t.getFullYear(),o=this.displayedMonths[0];if((!o||o.month!==e||o.year!==a)&&(this.displayedMonths=[{month:e,year:a}]),this.announceSelections){const r=R.formatDate(t);h(this,Gt,kr).call(this,`Focused on ${r}`)}};Ii=new WeakSet;_n=function(){this.picker.open?h(this,Xt,$r).call(this):this.focusedDate=void 0};Gt=new WeakSet;kr=function(t){this.announcementText=t,setTimeout(()=>{this.announcementText=""},1e3)};de=new WeakSet;fe=function(){if(this.displayedMonths.length===0){let t;if(this.mode==="single"&&this.selectedDate?t=this.selectedDate:this.mode==="range"&&this.selectedStartDate&&(t=this.selectedStartDate),t)this.displayedMonths=[{month:t.getMonth(),year:t.getFullYear()}];else{const e=new Date;this.displayedMonths=[{month:e.getMonth(),year:e.getFullYear()}]}}if(this.mode==="range"&&h(this,jr,Mi).call(this)&&this.displayedMonths.length===1){const t=this.displayedMonths[0],e=new Date(t.year,t.month+1,1);this.displayedMonths=[t,{month:e.getMonth(),year:e.getFullYear()}]}};ga=new WeakSet;Mo=function(){this.value&&this.mode==="single"?(this.selectedDate=new Date(this.value),this.displayedMonths=[{month:this.selectedDate.getMonth(),year:this.selectedDate.getFullYear()}]):this.startDate&&this.mode==="range"&&(this.selectedStartDate=new Date(this.startDate),this.displayedMonths=[{month:this.selectedStartDate.getMonth(),year:this.selectedStartDate.getFullYear()}],this.endDate&&(this.selectedEndDate=new Date(this.endDate)))};Li=new WeakSet;Dn=function(t){const{direction:e,side:a}=t.detail;h(this,Gi,Pn).call(this,e,a)};Fi=new WeakSet;Cn=function(t){const{side:e}=t.detail;h(this,xr,Vi).call(this,"month",e)};Ni=new WeakSet;En=function(t){const{side:e}=t.detail;h(this,xr,Vi).call(this,"year",e)};Bi=new WeakSet;Mn=function(t){const{date:e}=t.detail;h(this,Nt,Dr).call(this,e)};Yi=new WeakSet;zn=function(t){const{date:e}=t.detail;this.mode==="range"&&this.selectedStartDate&&!this.selectedEndDate&&(this.hoverDate=e)};Hi=new WeakSet;An=function(){this.hoverDate=void 0};qi=new WeakSet;Tn=function(t){const{month:e}=t.detail,a=h(this,_r,Ki).call(this,this.picker.index);h(this,Xi,Wn).call(this,e,a),h(this,Xt,$r).call(this)};Ui=new WeakSet;On=function(t){const{year:e}=t.detail,a=h(this,_r,Ki).call(this,this.picker.index);h(this,Zi,Rn).call(this,e,a),h(this,Xt,$r).call(this)};xr=new WeakSet;Vi=function(t,e){this.picker={open:!0,type:t,index:h(this,Sr,Ji).call(this,e)}};Xt=new WeakSet;$r=function(){this.picker.open&&(this.picker={open:!1,type:void 0,index:0})};Sr=new WeakSet;Ji=function(t){return t==="single"||t==="left"?0:1};_r=new WeakSet;Ki=function(t){return this.mode!=="range"?"single":t===0?"left":"right"};Gi=new WeakSet;Pn=function(t,e){if(e==="single"){const r=this.displayedMonths[0],i=new Date(r.year,r.month+t,1);this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()}];return}this.displayedMonths.length<2&&h(this,de,fe).call(this);const[a,o]=this.displayedMonths;if(e==="left"){const r=new Date(a.year,a.month+t,1),i=new Date(r.getFullYear(),r.getMonth()+1,1);this.displayedMonths=[{month:r.getMonth(),year:r.getFullYear()},{month:i.getMonth(),year:i.getFullYear()}]}else{const r=new Date(o.year,o.month+t,1),i=new Date(r.getFullYear(),r.getMonth()-1,1);this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()},{month:r.getMonth(),year:r.getFullYear()}]}};Xi=new WeakSet;Wn=function(t,e){var o,r;if(this.displayedMonths.length===0&&h(this,de,fe).call(this),this.displayedMonths.length===0||!this.displayedMonths[0]){const i=new Date;this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()}]}if(e==="single"){const i=((o=this.displayedMonths[0])==null?void 0:o.year)??new Date().getFullYear();this.displayedMonths=[{month:t,year:i}];return}if(this.displayedMonths.length<2&&h(this,de,fe).call(this),this.displayedMonths.length<2){const i=this.displayedMonths[0],s=new Date((i==null?void 0:i.year)??new Date().getFullYear(),((i==null?void 0:i.month)??new Date().getMonth())+1,1);this.displayedMonths=[i??{month:new Date().getMonth(),year:new Date().getFullYear()},{month:s.getMonth(),year:s.getFullYear()}]}const[a]=this.displayedMonths;if(e==="left"){const i={month:t,year:(a==null?void 0:a.year)??new Date().getFullYear()},s=new Date(i.year,i.month+1,1);this.displayedMonths=[i,{month:s.getMonth(),year:s.getFullYear()}]}else{const i=((r=this.displayedMonths[1])==null?void 0:r.year)??new Date().getFullYear(),s={month:t,year:i},p=new Date(s.year,s.month-1,1);this.displayedMonths=[{month:p.getMonth(),year:p.getFullYear()},s]}};Zi=new WeakSet;Rn=function(t,e){var a,o,r;if(this.displayedMonths.length===0&&h(this,de,fe).call(this),this.displayedMonths.length===0||!this.displayedMonths[0]){const i=new Date;this.displayedMonths=[{month:i.getMonth(),year:i.getFullYear()}]}if(e==="single"){const i=((a=this.displayedMonths[0])==null?void 0:a.month)??new Date().getMonth();this.displayedMonths=[{month:i,year:t}];return}if(this.displayedMonths.length<2&&h(this,de,fe).call(this),this.displayedMonths.length<2){const i=this.displayedMonths[0],s=new Date(i.year,i.month+1,1);this.displayedMonths=[i,{month:s.getMonth(),year:s.getFullYear()}]}if(e==="left"){const i={month:((o=this.displayedMonths[0])==null?void 0:o.month)??new Date().getMonth(),year:t},s=new Date(t,i.month+1,1);this.displayedMonths=[i,{month:s.getMonth(),year:s.getFullYear()}]}else{const i={month:((r=this.displayedMonths[1])==null?void 0:r.month)??new Date().getMonth(),year:t},s=new Date(t,i.month-1,1);this.displayedMonths=[{month:s.getMonth(),year:s.getFullYear()},i]}};va=new WeakSet;zo=function(){this.selectedDate=void 0,this.selectedStartDate=void 0,this.selectedEndDate=void 0,this.hoverDate=void 0,this.value=void 0,this.startDate=void 0,this.endDate=void 0,this.picker={open:!1,type:void 0,index:0},this.displayedMonths=[],this.autoDual=!1,h(this,de,fe).call(this)};Nt=new WeakSet;Dr=function(t){R.isDateDisabled(t,this.disabled,this.minDate||"",this.maxDate||"",this.disabledDates)||(this.mode==="single"?(this.selectedDate=t,this.value=R.formatDate(t),h(this,Ia,Ao).call(this),h(this,Qi,In).call(this)):this.mode==="range"&&(!this.selectedStartDate||this.selectedStartDate&&this.selectedEndDate?(this.selectedStartDate=t,this.selectedEndDate=void 0,this.startDate=R.formatDate(t),this.endDate=void 0):this.selectedStartDate&&!this.selectedEndDate&&(t<this.selectedStartDate?(this.selectedEndDate=this.selectedStartDate,this.selectedStartDate=t,this.endDate=R.formatDate(this.selectedEndDate),this.startDate=R.formatDate(this.selectedStartDate)):(this.selectedEndDate=t,this.endDate=R.formatDate(t)),h(this,Ia,Ao).call(this),h(this,es,Ln).call(this))))};Ia=new WeakSet;Ao=function(){if(this.name){if(this.mode==="single"&&this.value)this.updateFormData({name:this.name,value:this.value});else if(this.mode==="range"&&this.startDate&&this.endDate){const t=JSON.stringify({start:this.startDate,end:this.endDate});this.updateFormData({name:this.name,value:t})}}};Qi=new WeakSet;In=function(){const t={date:this.value?new Date(this.value):void 0,value:this.value};if(this.announceSelections&&this.value){const e=R.formatDate(new Date(this.value));h(this,Gt,kr).call(this,`Selected ${e}`)}this.dispatchEvent(new CustomEvent("mjo-calendar-date-selected",{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0}))};es=new WeakSet;Ln=function(){const t={startDate:this.startDate?new Date(this.startDate):void 0,endDate:this.endDate?new Date(this.endDate):void 0,startDateValue:this.startDate,endDateValue:this.endDate};if(this.announceSelections&&this.startDate&&this.endDate){const e=R.formatDate(new Date(this.startDate)),a=R.formatDate(new Date(this.endDate));h(this,Gt,kr).call(this,`Selected date range from ${e} to ${a}`)}this.dispatchEvent(new CustomEvent("mjo-calendar-range-selected",{detail:t,bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("change",{detail:t,bubbles:!0,composed:!0}))};Dt=new WeakSet;ba=function(){return this.mode==="single"||this.rangeCalendars==="1"?"single":"left"};Ct=new WeakSet;ya=function(t){return t==="single"||t==="left"||t==="right"?t:null};Et=new WeakSet;wa=function(t,e,a){if(this.displayedMonths.length===0&&h(this,de,fe).call(this),a==="single"){this.displayedMonths=[{month:t,year:e}];return}if(this.displayedMonths.length<2&&h(this,de,fe).call(this),a==="left"){const o={month:t,year:e},r=new Date(e,t+1,1);this.displayedMonths=[o,{month:r.getMonth(),year:r.getFullYear()}]}else{const o={month:t,year:e},r=new Date(e,t-1,1);this.displayedMonths=[{month:r.getMonth(),year:r.getFullYear()},o]}};To=new WeakSet;Fn=function(t,e){let a=t.month+e,o=t.year;for(;a>11;)a-=12,o++;for(;a<0;)a+=12,o--;return{month:a,year:o}};y.AUTO_DUAL_THRESHOLD=720;y.styles=[$`
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
        `];k([n({type:String})],y.prototype,"mode",2);k([n({type:String})],y.prototype,"name",2);k([n({type:String})],y.prototype,"value",2);k([n({type:String})],y.prototype,"startDate",2);k([n({type:String})],y.prototype,"endDate",2);k([n({type:String})],y.prototype,"locale",2);k([n({type:String})],y.prototype,"minDate",2);k([n({type:String})],y.prototype,"maxDate",2);k([n({type:Boolean,reflect:!0})],y.prototype,"disabled",2);k([n({type:String})],y.prototype,"size",2);k([n({type:String})],y.prototype,"color",2);k([n({type:Array})],y.prototype,"disabledDates",2);k([n({type:Boolean})],y.prototype,"showToday",2);k([n({type:String})],y.prototype,"firstDayOfWeek",2);k([n({type:String})],y.prototype,"rangeCalendars",2);k([n({type:Array})],y.prototype,"eventMarkers",2);k([n({type:Boolean})],y.prototype,"enableKeyboardNavigation",2);k([n({type:Boolean})],y.prototype,"announceSelections",2);k([n({type:String,attribute:"aria-labelledby"})],y.prototype,"ariaLabelledby",2);k([n({type:String,attribute:"aria-describedby"})],y.prototype,"ariaDescribedby",2);k([n({type:String,attribute:"aria-live"})],y.prototype,"ariaLive",2);k([L()],y.prototype,"selectedDate",2);k([L()],y.prototype,"selectedStartDate",2);k([L()],y.prototype,"selectedEndDate",2);k([L()],y.prototype,"hoverDate",2);k([L()],y.prototype,"picker",2);k([L()],y.prototype,"autoDual",2);k([L()],y.prototype,"displayedMonths",2);k([L()],y.prototype,"focusedDate",2);k([L()],y.prototype,"announcementText",2);y=k([S("mjo-calendar")],y);var Cd=Object.defineProperty,Ed=Object.getOwnPropertyDescriptor,ts=(t,e,a,o)=>{for(var r=o>1?void 0:o?Ed(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Cd(e,a,r),r};let Bt=class extends ee(w){constructor(){super(...arguments),this.radius="medium"}render(){return c`<div class="content"><slot></slot></div>`}connectedCallback(){super.connectedCallback(),this.contrast&&this.setAttribute("contrast",this.contrast),this.radius&&this.setAttribute("radius",this.radius)}setContrast(t){this.contrast=t,this.setAttribute("contrast",t)}setRadius(t){this.radius=t,this.setAttribute("radius",t)}};Bt.styles=[$`
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
        `];ts([n({type:String,noAccessor:!0})],Bt.prototype,"contrast",2);ts([n({type:String,noAccessor:!0})],Bt.prototype,"radius",2);Bt=ts([S("mjo-card")],Bt);var Md=Object.defineProperty,zd=Object.getOwnPropertyDescriptor,la=(t,e,a,o)=>{for(var r=o>1?void 0:o?zd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Md(e,a,r),r};const Cr=t=>{class e extends t{constructor(){super(...arguments),this.error=!1,this.success=!1}}return la([n({type:Boolean})],e.prototype,"error",2),la([n({type:String})],e.prototype,"errormsg",2),la([n({type:Boolean})],e.prototype,"success",2),la([n({type:String})],e.prototype,"successmsg",2),e};var Ad=Object.defineProperty,Td=Object.getOwnPropertyDescriptor,as=(t,e,a,o)=>{for(var r=o>1?void 0:o?Td(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Ad(e,a,r),r};let Yt=class extends w{render(){return c`<div class="container">
            ${this.errormsg?c`<div class="error"><mjo-icon src=${vr}></mjo-icon>${this.errormsg}</div>`:this.successmsg?c`<div class="success"><mjo-icon src=${_s}></mjo-icon>${this.successmsg}</div>`:c`<mjo-typography tag="none"><slot></slot></mjo-typography>`}
        </div>`}};Yt.styles=[$`
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
        `];as([n({type:String})],Yt.prototype,"errormsg",2);as([n({type:String})],Yt.prototype,"successmsg",2);Yt=as([S("input-helper-text")],Yt);var Od=Object.defineProperty,Pd=Object.getOwnPropertyDescriptor,le=(t,e,a,o)=>{for(var r=o>1?void 0:o?Pd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Od(e,a,r),r},Wd=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ca=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Mt=(t,e,a)=>(Wd(t,e,"access private method"),a),La,rs,Oo,Nn,Po,Bn,Wo,Yn;let Z=class extends ee(Cr(bt(w))){constructor(){super(...arguments),ca(this,La),ca(this,Oo),ca(this,Po),ca(this,Wo),this.color="primary",this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.value="",this.hideErrors=!1,this.type="checkbox"}get computedAriaChecked(){return this.indeterminate?"mixed":this.checked?"true":"false"}get computedAriaLabel(){if(this.ariaLabel)return this.ariaLabel;if(!this.label)return;let t=this.label;return(this.required||this.ariaRequired)&&(t+=" (required)"),this.indeterminate?t+=" (partially selected)":this.checked?t+=" (checked)":t+=" (unchecked)",t}get computedTabIndex(){return this.disabled?-1:0}render(){return c`<div class="container" ?data-disabled=${this.disabled} data-color=${this.color}>
            <div
                class="checkbox-container"
                role="checkbox"
                aria-checked=${this.computedAriaChecked}
                aria-label=${v(this.computedAriaLabel)}
                aria-describedby=${v(this.ariaDescribedby)}
                aria-disabled=${this.disabled?"true":"false"}
                aria-invalid=${this.error?"true":"false"}
                tabindex=${this.computedTabIndex}
                @click=${Mt(this,La,rs)}
                @keydown=${Mt(this,Oo,Nn)}
                @focus=${Mt(this,Po,Bn)}
                @blur=${Mt(this,Wo,Yn)}
            >
                <div class="box">
                    <div class="checkbox" ?data-checked=${this.checked} ?data-indeterminate=${this.indeterminate}>
                        ${this.indeterminate?c`<mjo-icon src=${bc}></mjo-icon>`:c`<mjo-icon src=${yc}></mjo-icon>`}
                    </div>
                </div>
                ${this.label?c`<div class="label-container"><mjo-typography tag="none" class="label">${this.label}</mjo-typography></div>`:m}
                <input
                    id="mjoCheckboxInput"
                    type="checkbox"
                    name=${v(this.name)}
                    value=${v(this.value)}
                    ?checked=${this.checked}
                    .indeterminate=${this.indeterminate}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    aria-hidden="true"
                    tabindex="-1"
                />
            </div>
            ${this.helperText?c`<input-helper-text>${this.helperText}</input-helper-text> `:m}
            ${this.errormsg||this.successmsg?c`<input-helper-text .errormsg=${this.errormsg} .successmsg=${this.successmsg}></input-helper-text> `:m}
        </div>`}connectedCallback(){super.connectedCallback(),this.updateFormData({name:this.name||"",value:this.checked?this.value||"1":""})}getValue(){return this.checked?this.value||"1":""}setValue(t){this.value=t}setIndeterminate(t){this.indeterminate=t,this.inputElement.indeterminate=t,this.dispatchEvent(new CustomEvent("mjo-checkbox-indeterminate-change",{detail:{element:this,indeterminate:this.indeterminate,checked:this.checked},bubbles:!0,composed:!0})),this.updateFormData({name:this.name||"",value:this.getValue()})}reportValidity(){return this.inputElement.reportValidity()}setCustomValidity(t){this.inputElement.setCustomValidity(t)}};La=new WeakSet;rs=function(){if(this.disabled)return;const t={checked:this.checked,indeterminate:this.indeterminate};this.indeterminate&&(this.indeterminate=!1,this.inputElement.indeterminate=!1),this.checked=!this.checked,this.updateFormData({name:this.name||"",value:this.getValue()}),this.dispatchEvent(new CustomEvent("change",{detail:{element:this,checked:this.checked,indeterminate:this.indeterminate,value:this.value,name:this.name||"",previousState:t},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("mjo-checkbox-change",{detail:{element:this,checked:this.checked,indeterminate:this.indeterminate,value:this.value,name:this.name||"",previousState:t},bubbles:!0,composed:!0}))};Oo=new WeakSet;Nn=function(t){this.disabled||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),Mt(this,La,rs).call(this))};Po=new WeakSet;Bn=function(){this.disabled||this.dispatchEvent(new CustomEvent("mjo-checkbox-focus",{detail:{element:this},bubbles:!0,composed:!0}))};Wo=new WeakSet;Yn=function(){this.dispatchEvent(new CustomEvent("mjo-checkbox-blur",{detail:{element:this},bubbles:!0,composed:!0}))};Z.styles=[$`
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
        `];le([n({type:String})],Z.prototype,"color",2);le([n({type:Boolean,reflect:!0})],Z.prototype,"checked",2);le([n({type:Boolean,reflect:!0})],Z.prototype,"disabled",2);le([n({type:Boolean,reflect:!0})],Z.prototype,"indeterminate",2);le([n({type:String})],Z.prototype,"helperText",2);le([n({type:String})],Z.prototype,"label",2);le([n({type:String})],Z.prototype,"name",2);le([n({type:String})],Z.prototype,"value",2);le([n({type:String,reflect:!0})],Z.prototype,"checkgroup",2);le([n({type:Boolean})],Z.prototype,"hideErrors",2);le([n({type:String,attribute:"aria-describedby"})],Z.prototype,"ariaDescribedby",2);le([ne("input#mjoCheckboxInput")],Z.prototype,"inputElement",2);le([ne(".checkbox-container")],Z.prototype,"checkboxContainer",2);Z=le([S("mjo-checkbox")],Z);var Rd=Object.defineProperty,Id=Object.getOwnPropertyDescriptor,ce=(t,e,a,o)=>{for(var r=o>1?void 0:o?Id(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Rd(e,a,r),r},Ld=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},da=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Be=(t,e,a)=>(Ld(t,e,"access private method"),a),Ro,Hn,Io,qn,Fa,os,Ht,Er;let Q=class extends ee(w){constructor(){super(...arguments),da(this,Ro),da(this,Io),da(this,Fa),da(this,Ht),this.closable=!1,this.clickable=!1,this.disabled=!1,this.color="default",this.label="",this.radius="full",this.size="medium",this.variant="solid"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.clickable&&this.closable?`${this.label}. Clickable chip with close button`:this.clickable?`${this.label}. Click to interact`:this.closable?`${this.label}. Press to close`:`Chip: ${this.label}`}get computedTabIndex(){return this.disabled?-1:this.clickable||this.closable?this.tabIndex??0:-1}render(){return c`<div
            class="container"
            role=${v(this.clickable||this.closable?"button":void 0)}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${v(this.ariaDescribedby)}
            aria-disabled=${this.disabled?"true":"false"}
            tabindex=${this.computedTabIndex}
            data-color=${this.color}
            data-size=${this.size}
            data-variant=${this.variant}
            data-radius=${this.radius}
            ?data-closable=${this.closable}
            ?data-clickable=${this.clickable}
            ?data-disabled=${this.disabled}
            @click=${Be(this,Fa,os)}
            @keydown=${Be(this,Ro,Hn)}
        >
            ${this.variant==="dot"?c`<span class="dot"></span>`:m}
            ${this.startIcon?c`<mjo-icon src=${this.startIcon}></mjo-icon>`:m}
            <mjo-typography tag="span" class="label">${this.label}</mjo-typography>
            ${this.endIcon?c`<mjo-icon src=${this.endIcon}></mjo-icon>`:m}
            ${this.closable?c`<mjo-icon
                      class="close"
                      src=${vr}
                      @click=${Be(this,Ht,Er)}
                      @keydown=${Be(this,Io,qn)}
                      role="button"
                      tabindex=${this.disabled?"-1":"0"}
                      aria-label="Close ${this.label}"
                  ></mjo-icon>`:m}
        </div>`}};Ro=new WeakSet;Hn=function(t){this.disabled||(t.key==="Escape"&&this.closable&&(t.preventDefault(),Be(this,Ht,Er).call(this,t)),(t.key==="Enter"||t.key===" ")&&this.clickable&&(t.preventDefault(),Be(this,Fa,os).call(this)))};Io=new WeakSet;qn=function(t){this.disabled||(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),t.stopPropagation(),Be(this,Ht,Er).call(this,t))};Fa=new WeakSet;os=async function(){!this.clickable||this.disabled||(this.dispatchEvent(new CustomEvent("mjo-chip-click",{bubbles:!0,composed:!0,detail:{value:this.value||this.label}})),this.container&&(this.container.style.transform="scale(0.95)",await dt(100),this.container.style.transform="scale(1.02)",await dt(150),this.container.removeAttribute("style")))};Ht=new WeakSet;Er=function(t){this.disabled||(t&&t.stopPropagation(),this.dispatchEvent(new CustomEvent("mjo-chip-close",{bubbles:!0,composed:!0,detail:{value:this.value||this.label}})),this.remove())};Q.styles=[$`
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
        `];ce([n({type:Boolean})],Q.prototype,"closable",2);ce([n({type:Boolean})],Q.prototype,"clickable",2);ce([n({type:Boolean})],Q.prototype,"disabled",2);ce([n({type:String})],Q.prototype,"color",2);ce([n({type:String})],Q.prototype,"endIcon",2);ce([n({type:String})],Q.prototype,"label",2);ce([n({type:String})],Q.prototype,"radius",2);ce([n({type:String})],Q.prototype,"size",2);ce([n({type:String})],Q.prototype,"startIcon",2);ce([n({type:String})],Q.prototype,"value",2);ce([n({type:String})],Q.prototype,"variant",2);ce([n({type:String,attribute:"aria-describedby"})],Q.prototype,"ariaDescribedby",2);ce([ne(".container")],Q.prototype,"container",2);Q=ce([S("mjo-chip")],Q);function is(t){const e=t.replace("#","");if(!/^[0-9a-fA-F]{6}$/.test(e))throw new Error(`Invalid hex color: ${t}`);return{r:parseInt(e.substring(0,2),16),g:parseInt(e.substring(2,4),16),b:parseInt(e.substring(4,6),16)}}function Un(t,e,a){t/=255,e/=255,a/=255;const o=Math.max(t,e,a),r=Math.min(t,e,a);let i=0,s=0;const p=(o+r)/2;if(o!==r){const d=o-r;switch(s=p>.5?d/(2-o-r):d/(o+r),o){case t:i=(e-a)/d+(e<a?6:0);break;case e:i=(a-t)/d+2;break;case a:i=(t-e)/d+4;break}i/=6}return{h:i*360,s:s*100,l:p*100}}function Fd(t,e,a){const o=Un(t,e,a);t/=255,e/=255,a/=255;const r=Math.min(t,e,a)*100,i=(1-Math.max(t,e,a))*100;return{h:o.h,w:r,b:i}}function Mr(t,e,a){t/=360,e/=100,a/=100;const o=(s,p,d)=>(d<0&&(d+=1),d>1&&(d-=1),d<1/6?s+(p-s)*6*d:d<1/2?p:d<2/3?s+(p-s)*(2/3-d)*6:s);if(e===0){const s=Math.round(a*255);return{r:s,g:s,b:s}}const r=a<.5?a*(1+e):a+e-a*e,i=2*a-r;return{r:Math.round(o(i,r,t+1/3)*255),g:Math.round(o(i,r,t)*255),b:Math.round(o(i,r,t-1/3)*255)}}function ss(t,e,a){if(e/=100,a/=100,e+a>=1){const r=Math.round(e/(e+a)*255);return{r,g:r,b:r}}const o=Mr(t,100,50);return{r:Math.round((o.r/255*(1-e-a)+e)*255),g:Math.round((o.g/255*(1-e-a)+e)*255),b:Math.round((o.b/255*(1-e-a)+e)*255)}}function Lr(t,e,a){const o=r=>{const i=Math.round(Math.max(0,Math.min(255,r))).toString(16);return i.length===1?"0"+i:i};return`#${o(t)}${o(e)}${o(a)}`}function Zt(t){const e=t.match(/rgba?\(([^)]+)\)/);if(!e)throw new Error(`Invalid RGB string: ${t}`);const a=e[1].split(",").map(r=>parseFloat(r.trim()));if(a.length<3||a.length>4)throw new Error(`Invalid RGB string: ${t}`);const o={r:a[0],g:a[1],b:a[2]};return a.length===4&&(o.a=a[3]),o}function Qt(t){const e=t.match(/hsla?\(([^)]+)\)/);if(!e)throw new Error(`Invalid HSL string: ${t}`);const a=e[1].split(",").map((r,i)=>{const s=r.trim();return parseFloat(i===0?s:s.replace("%",""))});if(a.length<3||a.length>4)throw new Error(`Invalid HSL string: ${t}`);const o={h:a[0],s:a[1],l:a[2]};return a.length===4&&(o.a=a[3]),o}function ns(t){const e=t.match(/hwb\(([^)]+)\)/);if(!e)throw new Error(`Invalid HWB string: ${t}`);const a=e[1].split(/\s+/).map((o,r)=>parseFloat(r===0?o:o.replace("%","")));if(a.length!==3)throw new Error(`Invalid HWB string: ${t}`);return{h:a[0],w:a[1],b:a[2]}}function Nd(t,e){switch(e||(e=zr(t)),e){case"hex":return t.startsWith("#")?t:`#${t}`;case"rgb":case"rgba":{const a=Zt(t);return Lr(a.r,a.g,a.b)}case"hsl":case"hsla":{const a=Qt(t),o=Mr(a.h,a.s,a.l);return Lr(o.r,o.g,o.b)}case"hwb":{const a=ns(t),o=ss(a.h,a.w,a.b);return Lr(o.r,o.g,o.b)}default:throw new Error(`Unsupported color format: ${e}`)}}function Vn(t,e){switch(e||(e=zr(t)),e){case"hex":{const a=is(t);return`rgb(${a.r}, ${a.g}, ${a.b})`}case"rgb":return t;case"rgba":{const a=Zt(t);return`rgb(${a.r}, ${a.g}, ${a.b})`}case"hsl":case"hsla":{const a=Qt(t),o=Mr(a.h,a.s,a.l);return`rgb(${o.r}, ${o.g}, ${o.b})`}case"hwb":{const a=ns(t),o=ss(a.h,a.w,a.b);return`rgb(${o.r}, ${o.g}, ${o.b})`}default:throw new Error(`Unsupported color format: ${e}`)}}function Bd(t,e=1,a){const o=Vn(t,a),r=Zt(o);return`rgba(${r.r}, ${r.g}, ${r.b}, ${e})`}function Jn(t,e){e||(e=zr(t));let a;switch(e){case"hex":a=is(t);break;case"rgb":case"rgba":a=Zt(t);break;case"hsl":return t;case"hsla":{const r=Qt(t);return`hsl(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%)`}case"hwb":{const r=ns(t);a=ss(r.h,r.w,r.b);break}default:throw new Error(`Unsupported color format: ${e}`)}const o=Un(a.r,a.g,a.b);return`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`}function Yd(t,e=1,a){const o=Jn(t,a),r=Qt(o);return`hsla(${Math.round(r.h)}, ${Math.round(r.s)}%, ${Math.round(r.l)}%, ${e})`}function Hd(t,e){e||(e=zr(t));let a;switch(e){case"hex":a=is(t);break;case"rgb":case"rgba":a=Zt(t);break;case"hsl":case"hsla":{const r=Qt(t);a=Mr(r.h,r.s,r.l);break}case"hwb":return t;default:throw new Error(`Unsupported color format: ${e}`)}const o=Fd(a.r,a.g,a.b);return`hwb(${Math.round(o.h)} ${Math.round(o.w)}% ${Math.round(o.b)}%)`}function Lo(t,e,a,o){switch(e){case"hex":return Nd(t,a);case"rgb":return Vn(t,a);case"rgba":return Bd(t,o,a);case"hsl":return Jn(t,a);case"hsla":return Yd(t,o,a);case"hwb":return Hd(t,a);default:throw new Error(`Unsupported target format: ${e}`)}}function zr(t){const e=t.trim().toLowerCase();if(e.startsWith("#")||/^[0-9a-f]{6}$/i.test(e))return"hex";if(e.startsWith("rgb("))return"rgb";if(e.startsWith("rgba("))return"rgba";if(e.startsWith("hsl("))return"hsl";if(e.startsWith("hsla("))return"hsla";if(e.startsWith("hwb("))return"hwb";throw new Error(`Cannot detect color format for: ${t}`)}var qd=Object.defineProperty,Ud=Object.getOwnPropertyDescriptor,Vd=(t,e,a,o)=>{for(var r=o>1?void 0:o?Ud(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&qd(e,a,r),r};let Fo=class extends w{render(){return c`<div>
            <div>
                <slot></slot>
            </div>
        </div>`}};Fo.styles=[$`
            :host {
                display: block;
                position: relative;
                height: calc(1em * 1.25);
            }
            div {
                position: absolute;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                left: 0;
                width: 100%;
            }
            div > div {
                position: relative;
                display: inline-block;
            }
        `];Fo=Vd([S("mjo-text-nowrap")],Fo);var Jd=Object.defineProperty,Kd=Object.getOwnPropertyDescriptor,ea=(t,e,a,o)=>{for(var r=o>1?void 0:o?Kd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Jd(e,a,r),r};let Ue=class extends w{constructor(){super(...arguments),this.focused=!1,this.error=!1,this.color="primary"}render(){return c`${this.label?c`<div class="container" data-color=${this.color} ?data-focused=${this.focused} ?data-error=${this.error}>
                  <mjo-text-nowrap>${this.label}</mjo-text-nowrap>
              </div>`:m}`}};Ue.styles=[$`
            :host {
                position: relative;
                display: block;
                text-align: left;
                font-size: var(
                    --mjo-color-picker-label-font-size,
                    var(
                        --mjo-select-label-font-size,
                        var(
                            --mjo-slider-label-font-size,
                            var(--mjo-switch-label-font-size, var(--mjo-textarea-label-font-size, var(--mjo-input-label-font-size, calc(1em * 0.8))))
                        )
                    )
                );
                font-weight: var(
                    --mjo-color-picker-label-font-weight,
                    var(
                        --mjo-select-label-font-weight,
                        var(
                            --mjo-slider-label-font-weight,
                            var(--mjo-switch-label-font-weight, var(--mjo-textarea-label-font-weight, var(--mjo-input-label-font-weight, normal)))
                        )
                    )
                );
                color: var(
                    --mjo-color-picker-label-color,
                    var(
                        --mjo-select-label-color,
                        var(
                            --mjo-slider-label-color,
                            var(--mjo-switch-label-color, var(--mjo-textarea-label-color, var(--mjo-input-label-color, currentColor)))
                        )
                    )
                );
            }
            .container {
                position: relative;
                transition: color 0.2s;
            }
            .container[data-focused] {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .container[data-error] {
                color: var(--mjo-color-error, #d81717);
            }
        `];ea([n({type:Boolean})],Ue.prototype,"focused",2);ea([n({type:Boolean})],Ue.prototype,"error",2);ea([n({type:String})],Ue.prototype,"label",2);ea([n({type:String})],Ue.prototype,"color",2);Ue=ea([S("input-label")],Ue);var Gd=Object.defineProperty,Xd=Object.getOwnPropertyDescriptor,oe=(t,e,a,o)=>{for(var r=o>1?void 0:o?Xd(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Gd(e,a,r),r},Zd=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},_e=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},je=(t,e,a)=>(Zd(t,e,"access private method"),a),ls,Kn,No,Gn,Bo,Xn,Yo,Zn,Ho,Qn,qo,el,Uo,tl,Na,cs;let K=class extends ee(Cr(bt(w))){constructor(){super(...arguments),_e(this,ls),_e(this,No),_e(this,Bo),_e(this,Yo),_e(this,Ho),_e(this,qo),_e(this,Uo),_e(this,Na),this.color="primary",this.disabled=!1,this.value="",this.hideErrors=!1,this.rounded=!1,this.size="medium",this.format="hex",this.showValue=!1,this.ariaDescribedBy=null,this.type="colorpicker"}get computedAriaLabel(){return this.ariaLabel?this.ariaLabel:this.label?this.label:"Color picker"}get computedAriaInvalid(){return this.error||this.errormsg?"true":this.ariaInvalid}get computedAriaDescribedBy(){const t=[];return this.ariaDescribedBy&&t.push(this.ariaDescribedBy),this.helperText&&!this.errormsg&&!this.successmsg&&t.push("helper-text"),t.length>0?t.join(" "):void 0}render(){return c`
            ${this.label?c`<input-label color=${this.color} label=${this.label} ?error=${this.error} ?data-disabled=${this.disabled}></input-label>`:m}
            <div class="container" ?data-rounded=${this.rounded} data-size=${this.size} ?data-disabled=${this.disabled}>
                <div class="color-picker" role="presentation" aria-hidden="true"></div>
                <input
                    @change=${je(this,Bo,Xn)}
                    @input=${je(this,No,Gn)}
                    @focus=${je(this,Yo,Zn)}
                    @blur=${je(this,Ho,Qn)}
                    type="color"
                    name=${v(this.name)}
                    ?disabled=${this.disabled}
                    value=${this.value}
                    aria-label=${this.computedAriaLabel}
                    aria-errormessage=${this.errormsg||m}
                    aria-invalid=${v(this.computedAriaInvalid)}
                    aria-required=${v(this.required)}
                    aria-describedby=${v(this.computedAriaDescribedBy)}
                />
            </div>
            ${this.showValue?c`<div class="value-display" aria-live="polite">${this.getFormattedValue(this.format)}</div>`:m}
            ${this.helperText||this.errormsg||this.successmsg?c`<input-helper-text errormsg=${v(this.errormsg)} successmsg=${v(this.successmsg)}>${this.helperText}</input-helper-text>`:m}
        `}connectedCallback(){super.connectedCallback(),this.updateFormData({name:this.name||"",value:this.value})}firstUpdated(t){super.firstUpdated(t),this.colorPicker.style.backgroundColor=this.inputElement.value||this.value}updated(t){super.updated(t),t.has("format")&&t.get("format")!==void 0&&je(this,qo,el).call(this,t.get("format")),t.has("value")&&(this.colorPicker.style.backgroundColor=this.value,je(this,Na,cs).call(this))}getValue(){return this.value}setValue(t){try{this.value=Lo(t,this.format),je(this,Uo,tl).call(this)}catch(e){return console.warn(`Failed to convert color ${this.value} to format ${this.format}:`,e),this.value}}getFormattedValue(t){if(!this.value)return"";try{return Lo(this.value,t)}catch(e){return console.warn(`Failed to convert color ${this.value} to format ${t}:`,e),this.value}}};ls=new WeakSet;Kn=function(){if(!this.value)return;const t=`Color changed to ${this.getFormattedValue(this.format)}`,e=document.createElement("div");e.setAttribute("aria-live","polite"),e.setAttribute("aria-atomic","true"),e.style.position="absolute",e.style.left="-10000px",e.style.width="1px",e.style.height="1px",e.style.overflow="hidden",e.textContent=t,document.body.appendChild(e),setTimeout(()=>document.body.removeChild(e),1e3)};No=new WeakSet;Gn=function(t){const e=t.currentTarget;this.colorPicker.style.backgroundColor=e.value,this.value=Lo(e.value,this.format),this.updateFormData({name:this.name||"",value:this.value}),je(this,ls,Kn).call(this),this.dispatchEvent(new CustomEvent("mjo-color-input",{detail:{element:this,value:this.value,format:this.format},bubbles:!0}))};Bo=new WeakSet;Xn=function(){je(this,Na,cs).call(this),this.dispatchEvent(new Event("change")),this.dispatchEvent(new CustomEvent("mjo-color-change",{detail:{element:this,value:this.value,format:this.format},bubbles:!0}))};Yo=new WeakSet;Zn=function(){this.dispatchEvent(new CustomEvent("mjo-color-focus",{detail:{element:this},bubbles:!0}))};Ho=new WeakSet;Qn=function(){this.dispatchEvent(new CustomEvent("mjo-color-blur",{detail:{element:this},bubbles:!0}))};qo=new WeakSet;el=function(t){this.dispatchEvent(new CustomEvent("mjo-color-format-change",{detail:{element:this,format:this.format,previousFormat:t,value:this.value},bubbles:!0}))};Uo=new WeakSet;tl=function(){this.colorPicker&&(this.colorPicker.style.backgroundColor=this.getFormattedValue("hex")),this.inputElement&&(this.inputElement.value=this.getFormattedValue("hex"))};Na=new WeakSet;cs=function(){this.error||this.errormsg?this.ariaInvalid="true":this.ariaInvalid="false"};K.styles=[$`
            :host {
                display: inline-block;
                text-align: left;
                min-width: 150px;
            }
            :host([rounded]) {
                --mjo-input-radius: 50%;
            }
            .container {
                position: relative;
                overflow: hidden;
                border: solid 1px;
                width: inherit;
                width: var(--mjo-color-picker-size-medium, 28px);
                height: var(--mjo-color-picker-size-medium, 28px);
                border-style: var(--mjo-color-picker-border-style, var(--mjo-input-border-style, solid));
                border-width: var(--mjo-color-picker-border-width, var(--mjo-input-border-width, 1px));
                border-color: var(--mjo-color-picker-border-color, var(--mjo-input-border-color, var(--mjo-border-color, #dddddd)));
                box-shadow: var(--mjo-color-picker-box-shadow, var(--mjo-input-box-shadow, none));
                border-radius: var(--mjo-color-picker-radius, var(--mjo-input-radius, var(--mjo-radius, 5px)));
                transition: var(--mjo-color-picker-transition, border-color 0.2s ease, box-shadow 0.2s ease);
            }
            .container:focus-within {
                border-color: var(--mjo-color-picker-border-color-focus, var(--mjo-input-border-color-focus, var(--mjo-primary-color, #1d7fdb)));
                box-shadow: var(--mjo-color-picker-box-shadow-focus, var(--mjo-input-box-shadow-focus, 0 0 0 2px rgba(29, 127, 219, 0.2)));
                outline: none;
            }
            .container[data-size="small"] {
                width: var(--mjo-color-picker-size-small, 20px);
                height: var(--mjo-color-picker-size-small, 20px);
            }
            .container[data-size="large"] {
                width: var(--mjo-color-picker-size-large, 36px);
                height: var(--mjo-color-picker-size-large, 36px);
            }
            .container[data-disabled] {
                opacity: 0.5;
                filter: grayscale(0.5);
                cursor: not-allowed;
            }
            .container[data-disabled]:focus-within {
                border-color: var(--mjo-color-picker-border-color, var(--mjo-input-border-color, var(--mjo-border-color, #dddddd)));
                box-shadow: var(--mjo-color-picker-box-shadow, var(--mjo-input-box-shadow, none));
            }
            input-label[data-disabled] {
                opacity: 0.5;
            }
            input {
                opacity: 0;
                width: 100%;
                height: 100%;
                padding: 0;
                cursor: pointer;
                border: none;
                outline: none;
            }
            input:focus {
                outline: none;
            }
            .container[data-disabled] input {
                cursor: not-allowed;
            }
            .color-picker {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .value-display {
                position: relative;
                color: var(--mjo-color-picker-value-color, var(--mjo-foreground-color-low, #1f2937));
                font-size: var(--mjo-color-picker-value-font-size, 0.75rem);
                font-weight: var(--mjo-color-picker-value-font-weight, 500);
                padding: 2px 0 0;
                text-align: left;
                border-top: none;
                white-space: nowrap;
            }
            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .container {
                    border-width: 2px;
                }
                .container:focus-within {
                    border-width: 3px;
                }
                .value-display {
                    border-width: 2px;
                }
            }
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .container {
                    transition: none;
                }
            }
        `];oe([n({type:String})],K.prototype,"color",2);oe([n({type:Boolean,reflect:!0})],K.prototype,"disabled",2);oe([n({type:String})],K.prototype,"helperText",2);oe([n({type:String})],K.prototype,"label",2);oe([n({type:String})],K.prototype,"name",2);oe([n({type:String})],K.prototype,"value",2);oe([n({type:Boolean})],K.prototype,"hideErrors",2);oe([n({type:Boolean})],K.prototype,"rounded",2);oe([n({type:String})],K.prototype,"size",2);oe([n({type:String})],K.prototype,"format",2);oe([n({type:Boolean})],K.prototype,"showValue",2);oe([n({type:String,attribute:"aria-describedby"})],K.prototype,"ariaDescribedBy",2);oe([ne("input")],K.prototype,"inputElement",2);oe([ne(".color-picker")],K.prototype,"colorPicker",2);K=oe([S("mjo-color-picker")],K);const Qd='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,34H182V24a6,6,0,0,0-12,0V34H86V24a6,6,0,0,0-12,0V34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM48,46H74V56a6,6,0,0,0,12,0V46h84V56a6,6,0,0,0,12,0V46h26a2,2,0,0,1,2,2V82H46V48A2,2,0,0,1,48,46ZM208,210H48a2,2,0,0,1-2-2V94H210V208A2,2,0,0,1,208,210Zm-70-78a10,10,0,1,1-10-10A10,10,0,0,1,138,132Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,182,132ZM94,172a10,10,0,1,1-10-10A10,10,0,0,1,94,172Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,138,172Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,182,172Z"></path></svg>';/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=(t,e)=>{var o;const a=t._$AN;if(a===void 0)return!1;for(const r of a)(o=r._$AO)==null||o.call(r,e,!1),Wt(r,e);return!0},Ba=t=>{let e,a;do{if((e=t._$AM)===void 0)break;a=e._$AN,a.delete(t),t=e}while((a==null?void 0:a.size)===0)},al=t=>{for(let e;e=t._$AM;t=e){let a=e._$AN;if(a===void 0)e._$AN=a=new Set;else if(a.has(t))break;a.add(t),ah(e)}};function eh(t){this._$AN!==void 0?(Ba(this),this._$AM=t,al(this)):this._$AM=t}function th(t,e=!1,a=0){const o=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(o))for(let i=a;i<o.length;i++)Wt(o[i],!1),Ba(o[i]);else o!=null&&(Wt(o,!1),Ba(o));else Wt(this,t)}const ah=t=>{t.type==ke.CHILD&&(t._$AP??(t._$AP=th),t._$AQ??(t._$AQ=eh))};class rh extends fr{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,a,o){super._$AT(e,a,o),al(this),this.isConnected=e._$AU}_$AO(e,a=!0){var o,r;e!==this.isConnected&&(this.isConnected=e,e?(o=this.reconnected)==null||o.call(this):(r=this.disconnected)==null||r.call(this)),a&&(Wt(this,e),Ba(this))}setValue(e){if(Ss(this.t))this.t._$AI(e,this);else{const a=[...this.t._$AH];a[this.i]=e,this.t._$AI(a,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rl=()=>new oh;class oh{}const Fr=new WeakMap,ol=gr(class extends rh{render(t){return m}update(t,[e]){var o;const a=e!==this.Y;return a&&this.Y!==void 0&&this.rt(void 0),(a||this.lt!==this.ct)&&(this.Y=e,this.ht=(o=t.options)==null?void 0:o.host,this.rt(this.ct=t.element)),m}rt(t){if(this.isConnected||(t=void 0),typeof this.Y=="function"){const e=this.ht??globalThis;let a=Fr.get(e);a===void 0&&(a=new WeakMap,Fr.set(e,a)),a.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),a.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,e;return typeof this.Y=="function"?(t=Fr.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(e=this.Y)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),B=15,il=({dropDown:t,container:e})=>{let a=e.getBoundingClientRect().top+window.scrollY-t.offsetHeight-5;return t.offsetHeight>=window.innerHeight-B*2?(t.style.maxHeight=`${window.innerHeight-B*2}px`,window.scrollY+B):(t.style.maxHeight="",a<window.scrollY?(a=e.getBoundingClientRect().top+window.scrollY+e.offsetHeight+5,a+t.offsetHeight>window.innerHeight+window.scrollY?window.scrollY+B:sl({dropDown:t,container:e})):a)},sl=({dropDown:t,container:e})=>{let a=e.getBoundingClientRect().top+window.scrollY+e.offsetHeight+5;return t.offsetHeight>=window.innerHeight-B*2?(t.style.maxHeight=`${window.innerHeight-B*2}px`,window.scrollY+B):(t.style.maxHeight="",a+t.offsetHeight>window.innerHeight+window.scrollY?(a=e.getBoundingClientRect().top+window.scrollY-t.offsetHeight-5,a<window.scrollY?window.scrollY+B:il({dropDown:t,container:e})):a)},ih=({dropDown:t,container:e})=>{const a=e.getBoundingClientRect().top+window.scrollY+e.offsetHeight/2-t.offsetHeight/2;return t.offsetHeight>=window.innerHeight-B*2?(t.style.maxHeight=`${window.innerHeight-B*2}px`,window.scrollY+B):(t.style.maxHeight="",a<window.scrollY?0:a+t.offsetHeight>window.innerHeight+window.scrollY?window.innerHeight+window.scrollY-t.offsetHeight:a)},nl=({dropDown:t,container:e})=>{let a=e.getBoundingClientRect().left+window.scrollX-t.offsetWidth-5;return t.offsetWidth>=window.innerWidth-B*2?B:a<window.scrollX?(a=e.getBoundingClientRect().left+window.scrollX+e.offsetWidth+5,a+t.offsetWidth>window.innerWidth+window.scrollX?B:ll({dropDown:t,container:e})):a},sh=({dropDown:t,container:e})=>{const a=e.getBoundingClientRect().left+window.scrollX+e.offsetWidth/2-t.offsetWidth/2;return t.offsetWidth>=window.innerWidth-B*2?B:a<window.scrollX?0:a+t.offsetWidth>window.innerWidth+window.scrollX?window.innerWidth-t.offsetWidth:a},ll=({dropDown:t,container:e})=>{let a=e.getBoundingClientRect().left+window.scrollX+e.offsetWidth+5;return t.offsetWidth>=window.innerWidth-B*2?B:a+t.offsetWidth>window.innerWidth+window.scrollX?(a=e.getBoundingClientRect().left+window.scrollX-t.offsetWidth-5,a<window.scrollX?B:nl({dropDown:t,container:e})):a};var nh=Object.defineProperty,lh=Object.getOwnPropertyDescriptor,Ke=(t,e,a,o)=>{for(var r=o>1?void 0:o?lh(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&nh(e,a,r),r},ds=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},me=(t,e,a)=>(ds(t,e,"read from private field"),a?a.call(t):e.get(t)),Re=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},cl=(t,e,a,o)=>(ds(t,e,"write to private field"),o?o.call(t,a):e.set(t,a),a),zt=(t,e,a)=>(ds(t,e,"access private method"),a),xe,Ae,Vo,dl,Jo,hl,Ko,pl,Go,ul,hs,ml;let Se=class extends ee(w){constructor(){super(...arguments),Re(this,Vo),Re(this,Jo),Re(this,Ko),Re(this,Go),Re(this,hs),this.position="center-bottom",this.preventScroll=!1,Re(this,xe,[]),Re(this,Ae,{scroll:t=>{zt(this,Ko,pl).call(this,t)},wheel:t=>{zt(this,Go,ul).call(this,t)},resize:()=>{this.updatePosition()}})}render(){return c`${this.css?c`<style type="text/css">
                  ${this.css.toString().replace(/\s+/g," ")}
              </style>`:m}${this.html?c`<div class="container">${this.html}</div>`:m}`}connectedCallback(){super.connectedCallback(),this.height&&(this.style.maxHeight=this.height),window.addEventListener("resize",me(this,Ae).resize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",me(this,Ae).resize)}updated(t){super.updated(t),this.offsetHeight>0&&this.updatePosition()}close(){cl(this,xe,[]),zt(this,Jo,hl).call(this),this.style.transform="scale(0.7)",this.style.opacity="0",setTimeout(()=>{this.style.display="",this.style.transition="",this.style.transform=""},210)}open(){zt(this,Vo,dl).call(this),this.style.display="block",this.style.transition="opacity 0.1s ease-in, transform 0.1s ease-in",this.style.transform="scale(0.7)",this.width&&(this.style.minWidth=this.width),setTimeout(()=>{this.updatePosition(),this.style.transform="scale(1)",this.style.opacity="1"},5)}scrollToTop(t){this.scrollTo({top:t})}getScroll(){return{top:this.scrollTop,left:this.scrollLeft}}updatePosition(){if(this.offsetHeight===0||!this.host)return;const t=this.host,[e,a]=this.position.split("-"),o=e==="left"?nl({dropDown:this,container:t}):e==="center"?sh({dropDown:this,container:t}):ll({dropDown:this,container:t}),r=a==="bottom"?sl({dropDown:this,container:t}):a==="middle"?ih({dropDown:this,container:t}):il({dropDown:this,container:t});this.style.top=`${r}px`,this.style.left=`${o}px`}};xe=new WeakMap;Ae=new WeakMap;Vo=new WeakSet;dl=function(){zt(this,hs,ml).call(this),me(this,xe).forEach(({element:t})=>{t.addEventListener("scroll",me(this,Ae).scroll)}),this.preventScroll&&document.addEventListener("wheel",me(this,Ae).wheel,{passive:!1})};Jo=new WeakSet;hl=function(){me(this,xe).forEach(({element:t})=>{t.removeEventListener("scroll",me(this,Ae).scroll)}),document.removeEventListener("wheel",me(this,Ae).wheel)};Ko=new WeakSet;pl=function(t){const e=t.currentTarget;if(this.preventScroll)for(const{element:a,scrollTop:o}of me(this,xe))a===e&&(a===window?window.scrollTo(0,o):a.scrollTop=o);else this.updatePosition()};Go=new WeakSet;ul=function(t){t.target!==this&&t.preventDefault()};hs=new WeakSet;ml=function(){var e;cl(this,xe,[]);let t=this.host;for(;t;)t.scrollHeight>t.clientHeight&&(t.tagName==="HTML"?(t=window,me(this,xe).push({element:t,scrollTop:t.scrollY})):me(this,xe).push({element:t,scrollTop:t.scrollTop})),t=((e=t.parentNode)==null?void 0:e.host)??t.parentNode};Se.styles=[$`
            :host {
                display: none;
                position: absolute;
                transition: all 0.3s;
                opacity: 0;
                transform-origin: top center;
                max-width: calc(100vw - 20px);
                box-shadow: var(--mjo-dropdown-box-shadow, var(--mjo-box-shadow, 0px 0px 7px rgba(0, 0, 0, 0.5)));
                border-radius: var(--mjo-dropdown-radius, var(--mjo-radius-medium, 5px));
                overflow-x: hidden;
                overflow-y: auto;
            }
            .container {
                background-color: var(--dropdow-container-background-color, var(--mjo-dropdown-background-color, var(--mjo-background-color, white)));
                overflow: hidden;
            }
        `];Ke([n({type:Object})],Se.prototype,"css",2);Ke([n({type:Object})],Se.prototype,"html",2);Ke([n({type:String})],Se.prototype,"position",2);Ke([n({type:Boolean})],Se.prototype,"preventScroll",2);Ke([n({type:String})],Se.prototype,"width",2);Ke([n({type:String})],Se.prototype,"height",2);Se=Ke([S("dropdow-container")],Se);var ch=Object.defineProperty,dh=Object.getOwnPropertyDescriptor,he=(t,e,a,o)=>{for(var r=o>1?void 0:o?dh(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&ch(e,a,r),r},fl=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},Ee=(t,e,a)=>(fl(t,e,"read from private field"),a?a.call(t):e.get(t)),Ge=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Xe=(t,e,a)=>(fl(t,e,"access private method"),a),ge,Xo,gl,ja,Zo,Qo,vl,ei,bl,ti,yl;const wl=t=>t===null||isNaN(Number(t))?t:`${t}px`;let se=class extends ee(w){constructor(){super(...arguments),Ge(this,Xo),Ge(this,ja),Ge(this,Qo),Ge(this,ei),Ge(this,ti),this.fullwidth=!1,this.disabled=!1,this.preventScroll=!1,this.isOpen=!1,this.behaviour="hover",this.preventCloseOnInnerClick=!1,this.openTimestamp=0,Ge(this,ge,{open:t=>{var e;this.behaviour==="click"&&(t==null?void 0:t.type)==="click"&&((e=this.suppressOpenSelectors)!=null&&e.length)&&t.composedPath().some(o=>{const r=o;return!r||!r.matches?!1:this.suppressOpenSelectors.some(i=>{try{return r.matches(i)}catch{return!1}})})||this.open()},close:t=>{this.close(t)}})}render(){return c`<slot></slot>`}connectedCallback(){super.connectedCallback(),Xe(this,ti,yl).call(this)}disconnectedCallback(){super.disconnectedCallback(),Xe(this,ja,Zo).call(this)}updated(t){if(super.updated(t),t.has("html")&&this.html){if(!this.dropdownContainer)return;this.dropdownContainer.html=this.html}if(t.has("css")&&this.css){if(!this.dropdownContainer)return;this.dropdownContainer.css=this.css}if(t.has("preventScroll")&&this.preventScroll){if(!this.dropdownContainer)return;this.dropdownContainer.preventScroll=this.preventScroll}if(t.has("width")&&this.width!==void 0){if(!this.dropdownContainer)return;this.dropdownContainer.style.display=this.width}t.has("behaviour")&&this.behaviour!==void 0&&(Xe(this,ja,Zo).call(this),Xe(this,Xo,gl).call(this))}open(){Xe(this,Qo,vl).call(this)}close(t){Xe(this,ei,bl).call(this,t)}updatePosition(){var t;(t=this.dropdownContainer)==null||t.updatePosition()}scrollToTop(t){var e;(e=this.dropdownContainer)==null||e.scrollToTop(t)}getScroll(){var t;return((t=this.dropdownContainer)==null?void 0:t.getScroll())??{top:0,left:0}}getHeigth(){var t;return((t=this.dropdownContainer)==null?void 0:t.offsetHeight)??0}};ge=new WeakMap;Xo=new WeakSet;gl=function(){var t;this.behaviour==="hover"?(this.addEventListener("mouseenter",Ee(this,ge).open),(t=this.dropdownContainer)==null||t.addEventListener("mouseleave",Ee(this,ge).close)):this.addEventListener("click",Ee(this,ge).open),document.addEventListener("click",Ee(this,ge).close)};ja=new WeakSet;Zo=function(){var t;this.removeEventListener("mouseenter",Ee(this,ge).open),(t=this.dropdownContainer)==null||t.removeEventListener("mouseleave",Ee(this,ge).close),this.removeEventListener("click",Ee(this,ge).open),document.removeEventListener("click",Ee(this,ge).close)};Qo=new WeakSet;vl=function(){var t;this.isOpen||this.disabled||(this.fullwidth&&this.dropdownContainer&&(this.dropdownContainer.width=`${this.offsetWidth}px`),this.height&&this.dropdownContainer&&(this.dropdownContainer.height=this.height),this.isOpen=!0,(t=this.dropdownContainer)==null||t.open(),this.openTimestamp=Date.now(),this.dispatchEvent(new CustomEvent("open")))};ei=new WeakSet;bl=function(t){var r;if(!this.isOpen)return;const e=t==null?void 0:t.composedPath(),a=!!(e!=null&&e.includes(this)),o=!!(this.dropdownContainer&&(e!=null&&e.includes(this.dropdownContainer)));a&&this.behaviour==="click"&&Date.now()-this.openTimestamp<100||o&&this.preventCloseOnInnerClick||a&&!o||(this.isOpen=!1,(r=this.dropdownContainer)==null||r.close(),this.openTimestamp=0,this.dispatchEvent(new CustomEvent("close")))};ti=new WeakSet;yl=function(){const t=Bs(this,"mjo-theme");if(this.dropdownContainer=document.createElement("dropdow-container"),this.dropdownContainer.host=this,this.dropdownContainer.html=this.html,this.dropdownContainer.css=this.css,this.dropdownContainer.preventScroll=this.preventScroll,this.theme&&(this.dropdownContainer.theme=this.theme),this.width&&(this.dropdownContainer.style.width=this.width),t){const e=document.createElement("mjo-theme");e.config=t.config,e.theme=t.theme,e.scope="local",e.appendChild(this.dropdownContainer),document.body.appendChild(e)}else document.body.appendChild(this.dropdownContainer)};se.styles=[$`
            :host {
                display: inline-block;
            }
        `];he([n({type:Boolean})],se.prototype,"fullwidth",2);he([n({type:Boolean})],se.prototype,"disabled",2);he([n({type:Boolean})],se.prototype,"preventScroll",2);he([n({type:Boolean,reflect:!0})],se.prototype,"isOpen",2);he([n({type:Object})],se.prototype,"css",2);he([n({type:Object})],se.prototype,"html",2);he([n({type:String})],se.prototype,"behaviour",2);he([n({type:String,converter:wl})],se.prototype,"width",2);he([n({type:String,converter:wl})],se.prototype,"height",2);he([n({type:Boolean})],se.prototype,"preventCloseOnInnerClick",2);he([n({type:Array})],se.prototype,"suppressOpenSelectors",2);se=he([S("mjo-dropdown")],se);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hh=gr(class extends fr{constructor(t){if(super(t),t.type!==ke.PROPERTY&&t.type!==ke.ATTRIBUTE&&t.type!==ke.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ss(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Fe||e===m)return e;const a=t.element,o=t.name;if(t.type===ke.PROPERTY){if(e===a[o])return Fe}else if(t.type===ke.BOOLEAN_ATTRIBUTE){if(!!e===a.hasAttribute(o))return Fe}else if(t.type===ke.ATTRIBUTE&&a.getAttribute(o)===e+"")return Fe;return uc(t),e}});var ph=Object.defineProperty,uh=Object.getOwnPropertyDescriptor,Ar=(t,e,a,o)=>{for(var r=o>1?void 0:o?uh(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&ph(e,a,r),r},mh=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},fh=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},gh=(t,e,a)=>(mh(t,e,"access private method"),a),ai,jl;let mt=class extends w{constructor(){super(...arguments),fh(this,ai),this.count=0,this.regressive=!1}render(){return c`${gh(this,ai,jl).call(this)}`}};ai=new WeakSet;jl=function(){let t="0";return this.regressive&&this.max?t=String(this.max-this.count):this.max?t=`${this.count}/${this.max}`:t=String(this.count),t};mt.styles=[$`
            :host {
                display: block;
                font-size: var(--mjo-textarea-helper-font-size, var(--mjo-input-helper-font-size, calc(1em * 0.8)));
                font-weight: var(--mjo-textarea-helper-font-weight, var(--mjo-input-helper-font-weight, normal));
                color: var(--mjo-textarea-helper-color, var(--mjo-input-helper-color, var(--mjo-foreground-color-low)));
                line-height: calc(1em * 1.2);
                transition: color 0.3s;
            }
        `];Ar([n({type:Number})],mt.prototype,"count",2);Ar([n({type:Number})],mt.prototype,"max",2);Ar([n({type:Boolean})],mt.prototype,"regressive",2);mt=Ar([S("input-counter")],mt);var vh=Object.defineProperty,bh=Object.getOwnPropertyDescriptor,x=(t,e,a,o)=>{for(var r=o>1?void 0:o?bh(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&vh(e,a,r),r},kl=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},ha=(t,e,a)=>(kl(t,e,"read from private field"),a?a.call(t):e.get(t)),Ze=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},pa=(t,e,a)=>(kl(t,e,"access private method"),a),ri,xl,oi,$l,ii,ka,si,xa,ni;let j=class extends ee(Cr(bt(w))){constructor(){super(...arguments),Ze(this,ri),Ze(this,oi),Ze(this,xa),this.autoFocus=!1,this.disabled=!1,this.fullwidth=!1,this.readonly=!1,this.type="text",this.value="",this.size="medium",this.color="primary",this.counter=!1,this.selectOnFocus=!1,this.clearabled=!1,this.nospiners=!1,this.isFocused=!1,this.valueLength=0,this.isPassword=!1,Ze(this,ii,()=>{if(this.isFocused=!0,this.selectOnFocus){this.inputElement.select();return}setTimeout(()=>{if(!this.inputElement)return;const t=this.inputElement.type;this.inputElement.type=t!=="password"?"text":"password",this.inputElement.setSelectionRange(this.value.length,this.value.length),this.inputElement.type=t},10)}),Ze(this,ka,t=>{this.value=t.currentTarget.value,this.valueLength=this.value.length,t.type==="change"&&this.dispatchEvent(new Event("change")),this.updateFormData({name:this.name||"",value:this.value})}),Ze(this,si,t=>{t.key==="Enter"&&this.form&&this.submiForm()})}render(){return c`${this.label?c`<input-label
                      color=${this.color}
                      label=${this.label}
                      ?focused=${this.isFocused}
                      ?error=${this.error}
                      ?data-disabled=${this.disabled}
                  ></input-label>`:m}
            <div
                class="container"
                data-color=${this.color}
                ?data-focused=${this.isFocused}
                data-size=${this.size}
                ?data-error=${this.error}
                ?data-disabled=${this.disabled}
            >
                ${this.prefixText?c`<div class="prefixText">${this.prefixText}</div>`:m}
                ${this.startIcon&&c`<div class="icon startIcon"><mjo-icon src=${this.startIcon}></mjo-icon></div>`}
                ${this.startImage&&!this.startIcon?c`<div class="image startImage"><img src=${this.startImage} alt="Input image" /></div>`:m}
                <input
                    id="mjoTextfiedlInput"
                    autocapitalize=${v(this.autoCapitalize)}
                    autocomplete=${v(this.autoComplete)}
                    ?disabled=${this.disabled}
                    name=${v(this.name)}
                    max=${v(this.max)}
                    min=${v(this.min)}
                    maxlength=${v(this.maxlength)}
                    minlength=${v(this.minlength)}
                    placeholder=${v(this.placeholder)}
                    ?readonly=${this.readonly}
                    step=${v(this.step)}
                    type=${this.type}
                    .value=${hh(this.value)}
                    @focus=${ha(this,ii)}
                    @blur=${pa(this,ri,xl)}
                    @input=${ha(this,ka)}
                    @keyup=${ha(this,si)}
                    @change=${ha(this,ka)}
                    aria-label=${this.label||this.ariaLabel||m}
                    aria-errormessage=${this.errormsg||m}
                    aria-required=${v(this.required)}
                    ?data-nospiners=${this.nospiners}
                />
                ${this.clearabled?c`<div class="icon endIcon clearabled" data-dropdown-noopen ?data-visible=${this.value.length>0} @click=${pa(this,oi,$l)}>
                          <mjo-icon src=${vr}></mjo-icon>
                      </div>`:m}
                ${this.endIcon&&!this.clearabled&&this.type!=="password"?c`<div class="icon endIcon"><mjo-icon src=${this.endIcon}></mjo-icon></div>`:m}
                ${this.endImage&&!this.endIcon?c`<div class="image endImage"><img src=${this.endImage} alt="Input image" /></div>`:m}
                ${this.isPassword?this.type==="password"?c`<div class="icon endIcon passIcon" @click=${pa(this,xa,ni)}><mjo-icon src=${wc}></mjo-icon></div>`:c`<div class="icon endIcon passIcon" @click=${pa(this,xa,ni)}><mjo-icon src=${jc}></mjo-icon></div>`:m}
                ${this.suffixText?c`<div class="prefixText">${this.suffixText}</div>`:m}
            </div>
            <div class="helper" ?data-disabled=${this.disabled}>
                ${this.helperText||this.errormsg||this.successmsg?c`<input-helper-text errormsg=${v(this.errormsg)} successmsg=${v(this.successmsg)}
                          >${this.helperText}</input-helper-text
                      >`:m}
                ${this.counter?c`<input-counter
                          count=${this.valueLength}
                          max=${v(this.maxlength)}
                          regressive
                          ?data-error=${this.error}
                          ?data-focused=${this.isFocused}
                          data-color=${this.color}
                      ></input-counter>`:m}
            </div>`}connectedCallback(){var t;super.connectedCallback(),(t=document.querySelector("input"))==null||t.autocomplete,this.type==="password"&&!this.isPassword&&(this.isPassword=!0),this.updateFormData({name:this.name||"",value:this.value})}firstUpdated(t){super.firstUpdated(t),t.has("autoFocus")&&this.autoFocus&&setTimeout(()=>{this.focus()},50)}blur(){this.inputElement.blur()}clear(t=!1){this.setValue(""),t&&this.focus()}focus(){this.inputElement.focus()}getError(){return this.errormsg}getForm(){return this.form}getValue(){return this.value}removeError(){this.error=!1,this.errormsg=""}setError(t){this.error=!0,this.errormsg=t}setValue(t){this.value=t}};ri=new WeakSet;xl=function(){this.isFocused=!1};oi=new WeakSet;$l=function(){this.value="",this.valueLength=0,this.dispatchEvent(new CustomEvent("clear",{bubbles:!0,composed:!0}))};ii=new WeakMap;ka=new WeakMap;si=new WeakMap;xa=new WeakSet;ni=function(){this.type=this.type==="password"?"text":"password"};j.styles=[$`
            :host {
                display: inline-flex;
                flex-flow: column nowrap;
                position: relative;
                max-width: 100%;
            }
            :host([fullwidth]) {
                width: 100%;
            }
            .container {
                border-radius: var(--mjo-input-radius, var(--mjo-radius, 5px));
                border: solid 1px;
                border-style: var(--mjo-input-border-style, solid);
                border-width: var(--mjo-input-border-width, 1px);
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                background-color: var(--mjo-input-background-color, var(--mjo-background-color-high, #ffffff));
                box-shadow: var(--mjo-input-box-shadow, none);
                display: flex;
                flex-flow: row nowrap;
                overflow: hidden;
                position: relative;
                transition: border-color 0.3s;
            }
            .container:hover {
                border-style: var(--mjo-input-border-style-hover, solid);
                border-width: var(--mjo-input-border-width-hover, 1px);
                border-color: var(--mjo-input-border-color-hover, #cccccc);
            }
            .container[data-disabled] {
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                opacity: 0.5;
            }
            input-label[data-disabled],
            .helper[data-disabled] {
                opacity: 0.5;
            }
            .container[data-focused] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .container[data-error],
            .container[data-error][data-color="secondary"] {
                border-color: var(--mjo-color-error, #d31616);
            }
            input {
                background-color: transparent;
                border: none;
                padding: var(--mjo-input-padding, calc(1em / 2 - 3px) calc(1em / 2 - 2px) calc(1em / 2 - 4px));
                font-size: var(--mjo-input-font-size, 1em);
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                color: var(--mjo-input-color, var(--mjo-foreground-color, #222222));
                box-sizing: border-box;
                flex: 1 1 0;
                width: 100%;
                min-width: 0;
            }
            input:focus {
                outline: none;
            }
            input:-webkit-autofill {
                box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-text-fill-color: var(--mo-input-color, #111111);
            }
            input::-ms-reveal,
            input::-ms-clear {
                display: none !important;
            }
            input[data-nospiners]::-webkit-inner-spin-button,
            input[data-nospiners]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            .container[data-size="small"] input {
                padding: var(--mjo-input-padding-small, calc(1em / 2 - 4px) calc(1em / 2));
                font-size: 0.8em;
            }
            .container[data-size="large"] input {
                padding: var(--mjo-input-padding-large, calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px));
                font-size: 1.2em;
            }
            .prefixText {
                position: relative;
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                padding: calc(1em / 2 - 2px);
                background-color: var(--mjo-input-prefix-text-background-color, rgba(220, 220, 220, 0.5));
                color: var(--mjo-input-prefix-text-color, currentColor);
                display: grid;
                place-items: center;
                transition: color 0.3s;
            }
            .container[data-focused].prefixText {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] .prefixText {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .icon {
                position: relative;
                display: grid;
                place-items: center;
                color: var(--mjo-input-color, var(--mjo-foreground-color, #222222));
            }
            mjo-icon {
                font-size: var(--mjo-input-font-size, 1em);
            }
            .container[data-focused] mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            .container[data-focused][data-color="secondary"] mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            .container[data-error] mjo-icon,
            .container[data-error][data-color="secondary"] mjo-icon {
                color: var(--mjo-color-error, #d31616);
            }
            .image {
                position: relative;
                display: grid;
                place-items: center;
            }
            .image img {
                width: 1em;
                height: 1em;
                object-fit: contain;
            }
            .startIcon,
            .startImage {
                padding-left: calc(1em / 2 - 4px);
            }
            .endIcon,
            .endImage {
                padding-right: calc(1em / 2 - 4px);
            }
            .passIcon {
                cursor: pointer;
            }
            .clearabled {
                opacity: 0;
                font-size: calc(var(--mjo-input-font-size, 1em) * 0.8);
                transition: opacity 0.3s;
            }
            .clearabled[data-visible] {
                opacity: 1;
                cursor: pointer;
            }
            .container .clearabled mjo-icon {
                color: #999999 !important;
            }
            .container .clearabled:hover mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb)) !important;
            }
            .container[data-color="secondary"] .clearabled:hover mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74)) !important;
            }
            .helper {
                position: relative;
                display: flex;
                justify-content: flex-end;
                gap: 5px;
            }
            input-helper-text {
                flex: 1 1 0;
            }
            input-counter {
                flex: 0 0 auto;
            }
            input-counter[data-focused] {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb));
            }
            input-counter[data-focused][data-color="secondary"] {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #cc3d74));
            }
            input-counter[data-error],
            input-counter[data-error][data-color="secondary"] {
                color: var(--mjo-color-error, #d31616);
            }
        `];x([n({type:String})],j.prototype,"autoCapitalize",2);x([n({type:String})],j.prototype,"autoComplete",2);x([n({type:Boolean})],j.prototype,"autoFocus",2);x([n({type:Boolean,reflect:!0})],j.prototype,"disabled",2);x([n({type:Boolean})],j.prototype,"fullwidth",2);x([n({type:String})],j.prototype,"name",2);x([n({type:String})],j.prototype,"placeholder",2);x([n({type:Boolean})],j.prototype,"readonly",2);x([n({type:Number})],j.prototype,"step",2);x([n({type:String})],j.prototype,"type",2);x([n({type:String})],j.prototype,"value",2);x([n({type:String})],j.prototype,"label",2);x([n({type:String})],j.prototype,"size",2);x([n({type:String})],j.prototype,"color",2);x([n({type:String})],j.prototype,"startIcon",2);x([n({type:String})],j.prototype,"endIcon",2);x([n({type:String})],j.prototype,"startImage",2);x([n({type:String})],j.prototype,"endImage",2);x([n({type:String})],j.prototype,"prefixText",2);x([n({type:String})],j.prototype,"suffixText",2);x([n({type:String})],j.prototype,"helperText",2);x([n({type:Boolean})],j.prototype,"counter",2);x([n({type:Boolean})],j.prototype,"selectOnFocus",2);x([n({type:Boolean})],j.prototype,"clearabled",2);x([n({type:Boolean})],j.prototype,"nospiners",2);x([L()],j.prototype,"isFocused",2);x([L()],j.prototype,"valueLength",2);x([ne("input#mjoTextfiedlInput")],j.prototype,"inputElement",2);j=x([S("mjo-textfield")],j);var yh=Object.defineProperty,wh=Object.getOwnPropertyDescriptor,P=(t,e,a,o)=>{for(var r=o>1?void 0:o?wh(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&yh(e,a,r),r},Sl=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},li=(t,e,a)=>(Sl(t,e,"read from private field"),a?a.call(t):e.get(t)),we=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},ie=(t,e,a)=>(Sl(t,e,"access private method"),a),ci,_l,Le,at,At,$a,di,Dl,hi,Cl,ps,us,Tt,Sa,pi;let E=class extends ee(Cr(bt(w))){constructor(){super(...arguments),we(this,ci),we(this,Le),we(this,At),we(this,di),we(this,hi),we(this,Tt),this.value="",this.isRange=!1,this.locale="en",this.disabled=!1,this.size="medium",this.color="primary",this.clearabled=!1,this.closeOnSelect=!0,this.required=!1,this.displayMode="iso",this.ariaLive="polite",this.disabledAnnounceSelections=!1,this.calendarId=`mjo-calendar-${Math.random().toString(36).substring(2,9)}`,this.announcementText="",this.calendarInstanceId=0,this.calendarRef=rl(),we(this,ps,t=>{const e=t.detail;if(!this.isRange&&e.value){if(this.value=e.value,ie(this,Tt,Sa).call(this,{value:this.value,date:e.date}),!this.disabledAnnounceSelections&&e.date){const a=ie(this,At,$a).call(this,e.date);ie(this,Le,at).call(this,`Selected ${a}`)}this.closeOnSelect&&this.closePicker()}}),we(this,us,t=>{if(!this.isRange)return;const e=t.detail;if(e.startDateValue&&e.endDateValue){const a=`${e.startDateValue}/${e.endDateValue}`;if(this.value=a,ie(this,Tt,Sa).call(this,{value:a,startDate:e.startDate,endDate:e.endDate,startDateValue:e.startDateValue,endDateValue:e.endDateValue}),!this.disabledAnnounceSelections&&e.startDate&&e.endDate){const o=ie(this,At,$a).call(this,e.startDate),r=ie(this,At,$a).call(this,e.endDate);ie(this,Le,at).call(this,`Selected date range from ${o} to ${r}`)}this.closeOnSelect&&this.closePicker()}}),we(this,pi,t=>{var a;if(this.disabled)return;const e=((a=this.dropdown)==null?void 0:a.isOpen)??!1;switch(t.key){case"Enter":case" ":t.preventDefault(),e||this.openPicker();break;case"ArrowDown":case"ArrowUp":t.preventDefault(),e||this.openPicker();break;case"Escape":e&&(t.preventDefault(),this.closePicker());break}})}render(){var a;const t=((a=this.dropdown)==null?void 0:a.isOpen)??!1,e=this.ariaLabel||this.label||(this.isRange?"Date range picker":"Date picker");return c`
            <!-- Accessibility announcements region -->
            <div aria-live=${this.ariaLive} aria-atomic="true" class="sr-only" .textContent=${this.announcementText}></div>

            <mjo-dropdown
                behaviour="click"
                preventCloseOnInnerClick
                .suppressOpenSelectors=${[".clearabled","[data-dropdown-noopen]"]}
                .html=${ie(this,di,Dl).call(this)}
            >
                <mjo-textfield
                    form-ignore
                    role="combobox"
                    aria-expanded=${t?"true":"false"}
                    aria-haspopup="dialog"
                    aria-controls=${this.calendarId}
                    aria-label=${e}
                    aria-describedby=${v(this.ariaDescribedby)}
                    value=${ie(this,hi,Cl).call(this)}
                    size=${this.size}
                    color=${this.color}
                    ?disabled=${this.disabled}
                    label=${this.label??""}
                    placeholder=${this.placeholder??""}
                    readonly
                    startIcon=${Qd}
                    ?clearabled=${this.clearabled}
                    @keydown=${li(this,pi)}
                    @clear=${ie(this,ci,_l)}
                ></mjo-textfield>
            </mjo-dropdown>
        `}connectedCallback(){super.connectedCallback()}firstUpdated(t){super.firstUpdated(t),this.name&&this.updateFormData({name:this.name,value:this.value})}focus(){var t;(t=this.textfield)==null||t.focus()}clear(){var t;this.disabled||(this.value="",ie(this,Tt,Sa).call(this,{value:this.value}),this.name&&this.updateFormData({name:this.name,value:this.value}),(t=this.calendarRef.value)==null||t.reset(),this.disabledAnnounceSelections||ie(this,Le,at).call(this,this.isRange?"Date range cleared":"Date cleared"))}openPicker(){this.disabled||(this.dropdown.open(),this.disabledAnnounceSelections||ie(this,Le,at).call(this,this.isRange?"Date range picker opened":"Date picker opened"),requestAnimationFrame(()=>{this.calendarRef.value&&this.calendarRef.value.focus()}))}closePicker(){var t;this.dropdown.close(),this.disabledAnnounceSelections||ie(this,Le,at).call(this,this.isRange?"Date range picker closed":"Date picker closed"),(t=this.textfield)==null||t.focus()}getValue(){return this.value}setValue(t){this.value=t}};ci=new WeakSet;_l=function(){this.clear()};Le=new WeakSet;at=function(t){this.announcementText=t,setTimeout(()=>{this.announcementText=""},1e3)};At=new WeakSet;$a=function(t){try{return new Intl.DateTimeFormat(this.locale,{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(t)}catch{return t.toLocaleDateString(this.locale)}};di=new WeakSet;Dl=function(){const t=`${this.calendarInstanceId}-${this.value||(this.isRange?"range-empty":"single-empty")}`,e=this.isRange&&this.value?this.value.split("/")[0]:void 0,a=this.isRange&&this.value?this.value.split("/")[1]:void 0,o=!this.isRange&&this.value?this.value:void 0;return c`<div class="panel">
            <mjo-calendar
                ${ol(this.calendarRef)}
                id=${this.calendarId}
                data-reset-key=${t}
                mode=${this.isRange?"range":"single"}
                locale=${this.locale}
                aria-label=${this.isRange?"Date range calendar":"Date selection calendar"}
                value=${v(o)}
                startDate=${v(e)}
                endDate=${v(a)}
                minDate=${v(this.minDate)}
                maxDate=${v(this.maxDate)}
                .disabledDates=${this.disabledDates}
                @mjo-calendar-date-selected=${li(this,ps)}
                @mjo-calendar-range-selected=${li(this,us)}
            ></mjo-calendar>
        </div>`};hi=new WeakSet;Cl=function(){if(!this.value)return"";const t=o=>{if(this.displayMode==="iso")return o;const[r,i,s]=o.split("-").map(p=>Number(p));if(!r||!i||!s)return o;try{return new Intl.DateTimeFormat(this.locale,{dateStyle:"medium"}).format(new Date(r,i-1,s))}catch{return o}};if(!this.isRange)return t(this.value);const[e,a]=this.value.split("/");return`${t(e)} – ${t(a)}`};ps=new WeakMap;us=new WeakMap;Tt=new WeakSet;Sa=function({value:t,date:e,startDate:a,endDate:o,startDateValue:r,endDateValue:i}){this.name&&this.updateFormData({name:this.name,value:t}),this.dispatchEvent(new CustomEvent("date-picker-change",{detail:{value:t,date:e,startDate:a,endDate:o,startDateValue:r,endDateValue:i},bubbles:!0,cancelable:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))};pi=new WeakMap;E.styles=[$`
            :host {
                display: inline-block;
            }

            .panel {
                padding: var(--mjo-date-picker-panel-padding, var(--mjo-space-small, 8px));
                background: var(--mjo-date-picker-panel-background-color, var(--mjo-background-color));
                border-radius: var(--mjo-date-picker-panel-radius, var(--mjo-radius, 8px));
                box-shadow: var(--mjo-date-picker-panel-box-shadow, var(--mjo-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.15)));
            }

            /* Screen reader only content */
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

            /* Enhanced focus states for accessibility */
            :host(:focus-within) {
                outline: var(--mjo-date-picker-focus-ring-width, 2px) solid var(--mjo-date-picker-focus-ring-color, var(--mjo-focus-ring-color, #0066cc));
                outline-offset: var(--mjo-date-picker-focus-ring-offset, 2px);
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .panel {
                    border: var(--mjo-date-picker-high-contrast-border, 1px solid);
                }
            }
        `];P([n({type:String})],E.prototype,"name",2);P([n({type:String})],E.prototype,"value",2);P([n({type:Boolean,attribute:"range"})],E.prototype,"isRange",2);P([n({type:String})],E.prototype,"locale",2);P([n({type:String})],E.prototype,"minDate",2);P([n({type:String})],E.prototype,"maxDate",2);P([n({type:Array})],E.prototype,"disabledDates",2);P([n({type:String})],E.prototype,"label",2);P([n({type:String})],E.prototype,"placeholder",2);P([n({type:Boolean,reflect:!0})],E.prototype,"disabled",2);P([n({type:String})],E.prototype,"size",2);P([n({type:String})],E.prototype,"color",2);P([n({type:Boolean})],E.prototype,"clearabled",2);P([n({type:Boolean})],E.prototype,"closeOnSelect",2);P([n({type:Boolean})],E.prototype,"required",2);P([n({type:String})],E.prototype,"displayMode",2);P([n({type:String,attribute:"aria-describedby"})],E.prototype,"ariaDescribedby",2);P([n({type:String,attribute:"aria-live"})],E.prototype,"ariaLive",2);P([n({type:Boolean})],E.prototype,"disabledAnnounceSelections",2);P([L()],E.prototype,"calendarId",2);P([L()],E.prototype,"announcementText",2);P([ne("mjo-textfield")],E.prototype,"textfield",2);P([ne("mjo-dropdown")],E.prototype,"dropdown",2);E=P([S("mjo-date-picker")],E);const ks={en:{allowed:"Allowed files {data0}",dateprevious:"Date must be earlier than today",domains:"None of the domains are allowed",equalto:"Is not equal to {data0}",isdate:"Not valid date",isemail:"Not valid email address",isnumber:"The value entered must be a number",isurl:"Not valid url",max:"Required numerical value, maximum {data0}",maxage:"You must be less than {data0} years of age",maxcheck:"You have to check at most {data0} boxes",maxlength:"The text entered cannot be longer than {data0} characters",min:"Required numerical value, minimum {data0}",minage:"You must be older than {data0} years old",mincheck:"You have to check at least {data0} boxes",minlength:"The text entered must be at least {data0} characters long",nospaces:"The entered value cannot contain spaces",pattern:"Invalid pattern",phonecountry:"The phone number entered is not correct",phonenumber:"The phone number entered is not correct",range:"The value must be between {data0} and {data1}",rangelength:"The length must be between {data0} and {data1} characters.",required:"This field is required",security:"{data0}"},es:{allowed:"Archivos permitidos {data0}",dateprevious:"La fecha debe ser anterior a hoy",domains:"Ninguno de los dominios son permitidos",equalto:"No es igual a {data0}",isdate:"No es una fecha válida",isemail:"No es una dirección de correo válida",isnumber:"El valor ingresado debe ser un número",isurl:"No es una url válida",max:"Valor numérico requerido, máximo {data0}",maxage:"Debes tener menos de {data0} años",maxcheck:"Tienes que marcar como máximo {data0} casillas",maxlength:"El texto ingresado no puede ser más largo que {data0} caracteres",min:"Valor numérico requerido, mínimo {data0}",minage:"Debes tener más de {data0} años",mincheck:"Tienes que marcar como mínimo {data0} casillas",minlength:"El texto ingresado debe tener al menos {data0} caracteres",nospaces:"El valor ingresado no puede contener espacios",pattern:"Patrón inválido",phonecountry:"El número de teléfono ingresado no es correcto",phonenumber:"El número de teléfono ingresado no es correcto",range:"El valor debe estar entre {data0} y {data1}",rangelength:"La longitud debe estar entre {data0} y {data1} caracteres.",required:"Este campo es requerido",security:"{data0}"},fr:{allowed:"Fichiers autorisés {data0}",dateprevious:"La date doit être antérieure à aujourd'hui",domains:"Aucun des domaines n'est autorisé",equalto:"N’est pas égal à {data0}",isdate:"Date non valide",isemail:"Adresse e-mail non valide",isnumber:"La valeur saisie doit être un nombre",isurl:"URL non valide",max:"Valeur numérique requise, maximum {data0}",maxage:"Vous devez avoir moins de {data0} ans",maxcheck:"Vous devez cocher au maximum {data0} cases",maxlength:"Le texte saisi ne peut pas dépasser {data0} caractères",min:"Valeur numérique requise, minimum {data0}",minage:"Vous devez avoir plus de {data0} ans",mincheck:"Vous devez cocher au moins {data0} cases",minlength:"Le texte saisi doit comporter au moins {data0} caractères",nospaces:"La valeur saisie ne peut pas contenir d'espaces",pattern:"Motif invalide",phonecountry:"Le numéro de téléphone saisi n'est pas correct",phonenumber:"Le numéro de téléphone saisi n'est pas correct",range:"La valeur doit être comprise entre {data0} et {data1}",rangelength:"La longueur doit être comprise entre {data0} et {data1} caractères.",required:"Ce champ est obligatoire",security:"{data0}"},pt:{allowed:"Arquivos permitidos {data0}",dateprevious:"A data deve ser anterior a hoje",domains:"Nenhum dos domínios é permitido",equalto:"Não é igual a {data0}",isdate:"Não é uma data válida",isemail:"Não é um endereço de e-mail válido",isnumber:"O valor inserido deve ser um número",isurl:"Não é um url válido",max:"Valor numérico necessário, máximo {data0}",maxage:"Você deve ter menos de {data0} anos",maxcheck:"Você deve marcar no máximo {data0} caixas",maxlength:"O texto inserido não pode ter mais de {data0} caracteres",min:"Valor numérico necessário, mínimo {data0}",minage:"Você deve ter mais de {data0} anos",mincheck:"Você deve marcar pelo menos {data0} caixas",minlength:"O texto inserido deve ter pelo menos {data0} caracteres",nospaces:"O valor inserido não pode conter espaços",pattern:"Padrão inválido",phonecountry:"O número de telefone inserido não está correto",phonenumber:"O número de telefone inserido não está correto",range:"O valor deve estar entre {data0} e {data1}",rangelength:"O comprimento deve estar entre {data0} e {data1} caracteres.",required:"Este campo é obrigatório",security:"{data0}"},it:{allowed:"File consentite {data0}",dateprevious:"La data deve essere precedente a oggi",domains:"Nessuno dei domini è consentito",equalto:"Non è uguale a {data0}",isdate:"Non è una data valida",isemail:"Non è un indirizzo email valido",isnumber:"Il valore inserito deve essere un numero",isurl:"Non è un url valido",max:"Valore numerico richiesto, massimo {data0}",maxage:"Devi avere meno di {data0} anni",maxcheck:"Devi spuntare al massimo {data0} caselle",maxlength:"Il testo inserito non può superare {data0} caratteri",min:"Valore numerico richiesto, minimo {data0}",minage:"Devi avere più di {data0} anni",mincheck:"Devi spuntare almeno {data0} caselle",minlength:"Il testo inserito deve essere lungo almeno {data0} caratteri",nospaces:"Il valore inserito non può contenere spazi",pattern:"Modello non valido",phonecountry:"Il numero di telefono inserito non è corretto",phonenumber:"Il numero di telefono inserito non è corretto",range:"Il valore deve essere compreso tra {data0} e {data1}",rangelength:"La lunghezza deve essere compresa tra {data0} e {data1} caratteri.",required:"Questo campo è obbligatorio",security:"{data0}"},de:{allowed:"Erlaubte Dateien {data0}",dateprevious:"Das Datum muss früher als heute sein",domains:"Keine der Domains ist erlaubt",equalto:"Ist nicht gleich {data0}",isdate:"Kein gültiges Datum",isemail:"Keine gültige E-Mail-Adresse",isnumber:"Der eingegebene Wert muss eine Zahl sein",isurl:"Keine gültige URL",max:"Numerischer Wert erforderlich, maximal {data0}",maxage:"Sie müssen jünger als {data0} Jahre sein",maxcheck:"Sie müssen höchstens {data0} Kästchen ankreuzen",maxlength:"Der eingegebene Text darf nicht länger als {data0} Zeichen sein",min:"Numerischer Wert erforderlich, mindestens {data0}",minage:"Sie müssen älter als {data0} Jahre sein",mincheck:"Sie müssen mindestens {data0} Kästchen ankreuzen",minlength:"Der eingegebene Text muss mindestens {data0} Zeichen lang sein",nospaces:"Der eingegebene Wert darf keine Leerzeichen enthalten",pattern:"Ungültiges Muster",phonecountry:"Die eingegebene Telefonnummer ist nicht korrekt",phonenumber:"Die eingegebene Telefonnummer ist nicht korrekt",range:"Der Wert muss zwischen {data0} und {data1} liegen",rangelength:"Die Länge muss zwischen {data0} und {data1} Zeichen liegen.",required:"Dieses Feld ist erforderlich",security:"{data0}"},nl:{allowed:"Toegestane bestanden {data0}",dateprevious:"De datum moet eerder zijn dan vandaag",domains:"Geen van de domeinen is toegestaan",equalto:"Is niet gelijk aan {data0}",isdate:"Geen geldige datum",isemail:"Geen geldig e-mailadres",isnumber:"De ingevoerde waarde moet een getal zijn",isurl:"Geen geldige URL",max:"Numerieke waarde vereist, maximaal {data0}",maxage:"Je moet jonger zijn dan {data0} jaar",maxcheck:"Je moet maximaal {data0} vakjes aanvinken",maxlength:"De ingevoerde tekst mag niet langer zijn dan {data0} tekens",min:"Numerieke waarde vereist, minimaal {data0}",minage:"Je moet ouder zijn dan {data0} jaar",mincheck:"Je moet minimaal {data0} vakjes aanvinken",minlength:"De ingevoerde tekst moet minimaal {data0} tekens lang zijn",nospaces:"De ingevoerde waarde mag geen spaties bevatten",pattern:"Ongeldig patroon",phonecountry:"Het ingevoerde telefoonnummer is niet correct",phonenumber:"Het ingevoerde telefoonnummer is niet correct",range:"De waarde moet tussen {data0} en {data1} liggen",rangelength:"De lengte moet tussen {data0} en {data1} tekens zijn.",required:"Dit veld is verplicht",security:"{data0}"},bg:{allowed:"Позволени файлове {data0}",dateprevious:"Дата трябва да бъде преди днес",domains:"Нито един от домейните не е разрешен",equalto:"Не е равно на {data0}",isdate:"Невалидна дата",isemail:"Невалиден имейл адрес",isnumber:"Въведената стойност трябва да бъде число",isurl:"Невалиден URL адрес",max:"Изисква се числова стойност, максимум {data0}",maxage:"Трябва да сте на {data0} години или по-малко",maxcheck:"Трябва да отметнете най-много {data0} кутии",maxlength:"Въведеният текст не може да бъде по-дълъг от {data0} символа",min:"Изисква се числова стойност, минимум {data0}",minage:"Трябва да сте на {data0} години или повече",mincheck:"Трябва да отметнете поне {data0} кутии",minlength:"Въведеният текст трябва да бъде поне {data0} символа",nospaces:"Въведената стойност не може да съдържа интервали",pattern:"Невалиден шаблон",phonecountry:"Въведеният телефонен номер не е правилен",phonenumber:"Въведеният телефонен номер не е правилен",range:"Стойността трябва да бъде между {data0} и {data1}",rangelength:"Дължината трябва да бъде между {data0} и {data1} символа.",required:"Това поле е задължително",security:"{data0}"},sr:{allowed:"Дозвољени фајлови {data0}",dateprevious:"Датум мора бити пре данас",domains:"Ниједан од домена није дозвољен",equalto:"Није једнако {data0}",isdate:"Није важећи датум",isemail:"Није важећа адреса е-поште",isnumber:"Унесена вредност мора бити број",isurl:"Није важећи URL",max:"Потребна је нумеричка вредност, максимум {data0}",maxage:"Морате бити млађи од {data0} година",maxcheck:"Морате проверити највише {data0} поља",maxlength:"Унесени текст не може бити дужи од {data0} карактера",min:"Потребна је нумеричка вредност, минимум {data0}",minage:"Морате бити старији од {data0} година",mincheck:"Морате проверити најмање {data0} поља",minlength:"Унесени текст мора имати најмање {data0} карактера",nospaces:"Унесена вредност не може садржати размаке",pattern:"Неважећи узорак",phonecountry:"Унесени број телефона није исправан",phonenumber:"Унесени број телефона није исправан",range:"Вредност мора бити између {data0} и {data1}",rangelength:"Дужина мора бити између {data0} и {data1} карактера.",required:"Ово поље је обавезно",security:"{data0}"},ru:{allowed:"Разрешенные файлы {data0}",dateprevious:"Дата должна быть раньше сегодня",domains:"Ни один из доменов не разрешен",equalto:"Не равно {data0}",isdate:"Неверная дата",isemail:"Неверный адрес электронной почты",isnumber:"Введенное значение должно быть числом",isurl:"Неверный URL",max:"Требуется числовое значение, максимум {data0}",maxage:"Вам должно быть меньше {data0} лет",maxcheck:"Вы должны отметить не более {data0} полей",maxlength:"Введенный текст не может быть длиннее {data0} символов",min:"Требуется числовое значение, минимум {data0}",minage:"Вам должно быть больше {data0} лет",mincheck:"Вы должны отметить не менее {data0} полей",minlength:"Введенный текст должен содержать не менее {data0} символов",nospaces:"Введенное значение не может содержать пробелы",pattern:"Неверный шаблон",phonecountry:"Введенный номер телефона неверен",phonenumber:"Введенный номер телефона неверен",range:"Значение должно быть между {data0} и {data1}",rangelength:"Длина должна быть от {data0} до {data1} символов.",required:"Это поле обязательно для заполнения",security:"{data0}"},zh:{allowed:"允许的文件 {data0}",dateprevious:"日期必须早于今天",domains:"不允许任何域",equalto:"不等于 {data0}",isdate:"无效日期",isemail:"无效的电子邮件地址",isnumber:"输入的值必须是数字",isurl:"无效网址",max:"需要数字值，最大值 {data0}",maxage:"您必须小于 {data0} 岁",maxcheck:"您最多只能勾选 {data0} 个框",maxlength:"输入的文本长度不能超过 {data0} 个字符",min:"需要数字值，最小值 {data0}",minage:"您必须大于 {data0} 岁",mincheck:"您至少要勾选 {data0} 个框",minlength:"输入的文本长度必须至少为 {data0} 个字符",nospaces:"输入的值不能包含空格",pattern:"无效模式",phonecountry:"输入的电话号码不正确",phonenumber:"输入的电话号码不正确",range:"值必须在 {data0} 和 {data1} 之间",rangelength:"长度必须在 {data0} 和 {data1} 个字符之间。",required:"此字段为必填项",security:"{data0}"},ja:{allowed:"許可されたファイル {data0}",dateprevious:"日付は今日より前でなければなりません",domains:"ドメインのいずれも許可されていません",equalto:"{data0} と等しくなければなりません",isdate:"無効な日付",isemail:"無効なメールアドレス",isnumber:"入力された値は数値である必要があります",isurl:"無効なURL",max:"数値が必要です、最大 {data0}",maxage:"あなたは {data0} 歳未満でなければなりません",maxcheck:"チェックできるのは最大 {data0} 個です",maxlength:"入力されたテキストは {data0} 文字を超えることはできません",min:"数値が必要です、最小 {data0}",minage:"あなたは {data0} 歳以上でなければなりません",mincheck:"チェックできるのは最小 {data0} 個です",minlength:"入力されたテキストは {data0} 文字以上でなければなりません",nospaces:"入力された値にはスペースを含めることはできません",pattern:"無効なパターン",phonecountry:"入力された電話番号は正しくありません",phonenumber:"入力された電話番号は正しくありません",range:"値は {data0} と {data1} の間でなければなりません",rangelength:"長さは {data0} から {data1} 文字の間でなければなりません。",required:"このフィールドは必須です",security:"{data0}"},ko:{allowed:"허용 된 파일 {data0}",dateprevious:"날짜는 오늘보다 이전이어야합니다.",domains:"도메인 중 하나도 허용되지 않습니다.",equalto:"이 필드는 {data0}과 일치해야합니다.",isdate:"유효하지 않은 날짜",isemail:"유효하지 않은 이메일 주소",isnumber:"입력 한 값은 숫자 여야합니다.",isurl:"유효하지 않은 URL",max:"숫자 값이 필요합니다. 최대 {data0}",maxage:"당신은 {data0} 세 미만이어야합니다.",maxcheck:"최대 {data0} 개의 상자를 선택해야합니다.",maxlength:"입력 한 텍스트는 {data0} 자를 초과 할 수 없습니다.",min:"숫자 값이 필요합니다. 최소 {data0}",minage:"당신은 {data0} 세 이상이어야합니다.",mincheck:"최소 {data0} 개의 상자를 선택해야합니다.",minlength:"입력 한 텍스트는 {data0} 자 이상이어야합니다.",nospaces:"입력 한 값에는 공백을 포함 할 수 없습니다.",pattern:"잘못된 패턴",phonecountry:"입력 한 전화 번호가 올바르지 않습니다.",phonenumber:"입력 한 전화 번호가 올바르지 않습니다.",range:"값은 {data0}과 {data1} 사이 여야합니다.",rangelength:"길이는 {data0}에서 {data1} 문자 사이 여야합니다.",required:"이 필드는 필수입니다",security:"{data0}"},tr:{allowed:"İzin verilen dosyalar {data0}",dateprevious:"Tarih bugünden önce olmalıdır",domains:"Alan adlarının hiçbiri izin verilmez",equalto:"{data0} ile eşit olmalıdır",isdate:"Geçersiz tarih",isemail:"Geçersiz e-posta adresi",isnumber:"Girilen değer bir sayı olmalıdır",isurl:"Geçersiz url",max:"Sayısal değer gerekli, maksimum {data0}",maxage:"Yaşınız {data0} yaşından küçük olmalıdır",maxcheck:"En fazla {data0} kutuyu işaretlemelisiniz",maxlength:"Girilen metin {data0} karakterden uzun olamaz",min:"Sayısal değer gerekli, minimum {data0}",minage:"Yaşınız {data0} yaşından büyük olmalıdır",mincheck:"En az {data0} kutuyu işaretlemelisiniz",minlength:"Girilen metin en az {data0} karakter uzunluğunda olmalıdır",nospaces:"Girilen değer boşluk içeremez",pattern:"Geçersiz desen",phonecountry:"Girilen telefon numarası doğru değil",phonenumber:"Girilen telefon numarası doğru değil",range:"Değer {data0} ve {data1} arasında olmalıdır",rangelength:"Uzunluk {data0} ve {data1} karakter arasında olmalıdır.",required:"Bu alan gereklidir",security:"{data0}"},pl:{allowed:"Dozwolone pliki {data0}",dateprevious:"Data musi być wcześniejsza niż dzisiaj",domains:"Żaden z domen nie jest dozwolony",equalto:"Nie jest równe {data0}",isdate:"Nieprawidłowa data",isemail:"Nieprawidłowy adres e-mail",isnumber:"Wprowadzona wartość musi być liczbą",isurl:"Nieprawidłowy adres URL",max:"Wymagana wartość liczbową, maksimum {data0}",maxage:"Musisz mieć mniej niż {data0} lat",maxcheck:"Musisz zaznaczyć maksymalnie {data0} pól",maxlength:"Wprowadzony tekst nie może być dłuższy niż {data0} znaków",min:"Wymagana wartość liczbową, minimum {data0}",minage:"Musisz mieć więcej niż {data0} lat",mincheck:"Musisz zaznaczyć co najmniej {data0} pól",minlength:"Wprowadzony tekst musi mieć co najmniej {data0} znaków",nospaces:"Wprowadzona wartość nie może zawierać spacji",pattern:"Nieprawidłowy wzór",phonecountry:"Wprowadzony numer telefonu jest nieprawidłowy",phonenumber:"Wprowadzony numer telefonu jest nieprawidłowy",range:"Wartość musi być między {data0} a {data1}",rangelength:"Długość musi mieć od {data0} do {data1} znaków.",required:"To pole jest wymagane",security:"{data0}"}};var qt,ui,Ya,El,_,z,T,W,D,A,Ha,Ml,Ut,mi,qa,zl,Ua,Al,Va,Tl,Ja,Ol,Ka,Pl,Ga,Wl,Xa,Rl,Za,Il,Qa,Ll,er,Fl,tr,Nl,ar,Bl,rr,Yl,or,Hl,ir,ql,sr,Ul,nr,Vl,lr,Jl,cr,Kl,dr,Gl,hr,Xl,pr,Zl,ur,Ql,mr,ec;class jh{constructor(){b(this,qt);b(this,Ya);b(this,_);b(this,T);b(this,D);b(this,Ha);b(this,Ut);b(this,qa);b(this,Ua);b(this,Va);b(this,Ja);b(this,Ka);b(this,Ga);b(this,Xa);b(this,Za);b(this,Qa);b(this,er);b(this,tr);b(this,ar);b(this,rr);b(this,or);b(this,ir);b(this,sr);b(this,nr);b(this,lr);b(this,cr);b(this,dr);b(this,hr);b(this,pr);b(this,ur);b(this,mr)}validateForm({elements:e,form:a}){for(const o of e){const{errmsg:r,error:i,rule:s}=this.validateInput({input:o,form:a,elements:e});if(i)return{error:i,errmsg:r,rule:s,errInput:o}}return{error:!1,errmsg:"",rule:null,errInput:null}}validateInput({input:e,form:a,elements:o}){const r={error:!1,errmsg:"",rule:null};if(e.required&&(r.error=!l(this,Va,Tl).call(this,e,a),r.errmsg=r.error?l(this,_,z).call(this,e,"required"):"",r.rule="required",l(this,D,A).call(this,e,r.errmsg),r.error)||(e.type==="email"||e.isemail)&&(r.error=!l(this,qa,zl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"isemail"):"",r.rule="isemail",l(this,D,A).call(this,e,r.errmsg),r.error)||(e.type==="url"||e.isurl)&&(r.error=!l(this,Ua,Al).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"isurl"):"",r.rule="isurl",l(this,D,A).call(this,e,r.errmsg),r.error)||e.nospaces&&(r.error=!l(this,Ja,Ol).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"nospaces"):"",r.rule="nospaces",l(this,D,A).call(this,e,r.errmsg),r.error)||e.minlength!==void 0&&(r.error=!l(this,Ka,Pl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"minlength"):"",r.rule="minlength",l(this,D,A).call(this,e,r.errmsg),r.error)||e.maxlength!==void 0&&(r.error=!l(this,Ga,Wl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"maxlength"):"",r.rule="maxlength",l(this,D,A).call(this,e,r.errmsg),r.error)||e.rangelength&&(r.error=!l(this,Xa,Rl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"rangelength"):"",r.rule="rangelength",l(this,D,A).call(this,e,r.errmsg),r.error)||e.isnumber&&(r.error=!l(this,Za,Il).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"isnumber"):"",r.rule="isnumber",l(this,D,A).call(this,e,r.errmsg),r.error)||e.min!==void 0&&(r.error=!l(this,Qa,Ll).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"min"):"",r.rule="min",l(this,D,A).call(this,e,r.errmsg),r.error)||e.max!==void 0&&(r.error=!l(this,er,Fl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"max"):"",r.rule="max",l(this,D,A).call(this,e,r.errmsg),r.error)||e.range&&(r.error=!l(this,tr,Nl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"range"):"",r.rule="range",l(this,D,A).call(this,e,r.errmsg),r.error)||e.domains&&(r.error=!l(this,ar,Bl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"domains"):"",r.rule="domains",l(this,D,A).call(this,e,r.errmsg),r.error)||e.isdate&&(r.error=!l(this,rr,Yl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"isdate"):"",r.rule="isdate",l(this,D,A).call(this,e,r.errmsg),r.error)||e.isdate&&e.dateprevious&&(r.error=!l(this,or,Hl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"dateprevious"):"",r.rule="dateprevious",l(this,D,A).call(this,e,r.errmsg),r.error)||e.isdate&&e.minage&&(r.error=!l(this,ir,ql).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"minage"):"",r.rule="minage",l(this,D,A).call(this,e,r.errmsg),r.error)||e.isdate&&e.maxage&&(r.error=!l(this,sr,Ul).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"maxage"):"",r.rule="maxage",l(this,D,A).call(this,e,r.errmsg),r.error)||e.security&&(r.error=!l(this,nr,Vl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"security"):"",r.rule="security",l(this,D,A).call(this,e,r.errmsg),r.error))return r;if(e.equalto){const i=o.find(p=>p.name===e.equalto),s=(i==null?void 0:i.label)??e.equalto;if(r.error=!l(this,lr,Jl).call(this,e,o),r.errmsg=r.error?l(this,_,z).call(this,e,"equalto",[s]):"",r.rule="equalto",l(this,D,A).call(this,e,r.errmsg),r.error)return r}return e.phonenumber&&(r.error=!l(this,cr,Kl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"phonenumber"):"",r.rule="phonenumber",l(this,D,A).call(this,e,r.errmsg),r.error)||e.phonenumber&&e.phonecountry&&(r.error=!l(this,dr,Gl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"phonecountry"):"",r.rule="phonecountry",l(this,D,A).call(this,e,r.errmsg),r.error)||e.pattern&&(r.error=!l(this,hr,Xl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"pattern"):"",r.rule="pattern",l(this,D,A).call(this,e,r.errmsg),r.error)||e.allowed&&(r.error=!l(this,pr,Zl).call(this,e),r.errmsg=r.error?l(this,_,z).call(this,e,"allowed"):"",r.rule="allowed",l(this,D,A).call(this,e,r.errmsg),r.error)||e.mincheck!==void 0&&(r.error=!l(this,ur,Ql).call(this,e,a),r.errmsg=r.error?l(this,_,z).call(this,e,"mincheck"):"",r.rule="mincheck",l(this,D,A).call(this,e,r.errmsg),r.error)||e.maxcheck!==void 0&&(r.error=!l(this,mr,ec).call(this,e,a),r.errmsg=r.error?l(this,_,z).call(this,e,"maxcheck"):"",r.rule="maxcheck",l(this,D,A).call(this,e,r.errmsg),r.error)||(e.success=!0,e.error=!1,e.errormsg=""),r}}qt=new WeakSet,ui=function(e,a){let o=null,r=null,i=null;e=e.toString(),e=e.replace(new RegExp("/","g"),"-");const s=e.split("-");a==="aaaa-mm-dd"?(o=parseInt(s[0]),r=parseInt(s[1]),i=parseInt(s[2])):a==="dd-mm-aaaa"?(o=parseInt(s[2]),r=parseInt(s[1]),i=parseInt(s[0])):(o=parseInt(s[2]),r=parseInt(s[0]),i=parseInt(s[1]));const p=new Date,d=p.getFullYear(),f=p.getMonth()+1,g=p.getDate();let C=d+1900-o;return f<r&&C--,r===f&&i>g&&C--,C>1900&&(C-=1900),C},Ya=new WeakSet,El=function(e="en"){return ks[e]??ks.en},_=new WeakSet,z=function(e,a,o){var d,f,g,C;const r=e.name;if(r&&this.inputsMessages&&this.inputsMessages[r]&&((d=this.inputsMessages[r])!=null&&d[a])){let O=(f=this.inputsMessages[r])==null?void 0:f[a];if(Array.isArray(o)&&O&&o.forEach((pe,wt)=>{O=O==null?void 0:O.replace(`{data${wt}}`,pe)}),O)return O}if(r&&this.messages&&this.messages[a]){let O=this.messages[a];if(Array.isArray(o)&&O&&o.forEach((pe,wt)=>{O=O==null?void 0:O.replace(`{data${wt}}`,pe)}),O)return O}const i=((C=(g=document.querySelector("html"))==null?void 0:g.getAttribute("lang"))==null?void 0:C.split("-")[0])||"en";let p=l(this,Ya,El).call(this,i)[a];return Array.isArray(o)&&o.forEach((O,pe)=>{p=p.replace(`{data${pe}}`,O)}),p},T=new WeakSet,W=function(e){return e.getValue()},D=new WeakSet,A=function(e,a){e.error=!0,e.errormsg=a,e.focus()},Ha=new WeakSet,Ml=function(e,a){return a==="es"&&(e=e.toString(),e=e.replace(new RegExp(" ","g"),""),e.length===13?e[4]==="9"?(e=`${e[0]}${e[1]}${e[2]}${e[3]} ${e[4]} ${e[5]} `,e+=`${e[6]}${e[7]}${e[8]} ${e[9]}${e[10]} ${e[11]}${e[12]}`):(e=`${e[0]}${e[1]}${e[2]}${e[3]} ${e[4]} ${e[5]}${e[6]} `,e+=`${e[7]}${e[8]}${e[9]} ${e[10]}${e[11]}${e[12]}`):e.length===12?e[3]==="9"?(e=`${e[0]}${e[1]}${e[2]} ${e[3]}${e[4]} ${e[5]}${e[6]}${e[7]} `,e+=`${e[8]}${e[9]} ${e[10]}${e[11]}`):(e=`${e[0]}${e[1]}${e[2]} ${e[3]}${e[4]}${e[5]} `,e+=`${e[6]}${e[7]}${e[8]} ${e[9]}${e[10]}${e[11]}`):e[0]==="9"?e=`${e[0]}${e[1]} ${e[2]}${e[3]}${e[4]} ${e[5]}${e[6]} ${e[7]}${e[8]}`:e=`${e[0]}${e[1]}${e[2]} ${e[3]}${e[4]}${e[5]} ${e[6]}${e[7]}${e[8]}`),e},Ut=new WeakSet,mi=function(e,a){e.setValue(a)},qa=new WeakSet,zl=function(e){const a=l(this,T,W).call(this,e),o=a.split("@");return!(!o[1]||a.indexOf("@",0)===-1||o[1].indexOf(".",0)===-1)},Ua=new WeakSet,Al=function(e){let a=l(this,T,W).call(this,e);return!/^(http|https|ftp):\/\//.test(a)&&a&&(a="http://"+a),!(!/^(http|https|ftp):\/\/[a-z0-9.-]+\.[a-z]{2,4}/gi.test(a)&&a)},Va=new WeakSet,Tl=function(e,a){if(!e.inputElement)return!1;if(e.tagName!=="MJO-CHECKBOX"&&e.tagName!=="MJO-RADIO")return!!l(this,T,W).call(this,e);const o=e.inputElement;let{checked:r}=o;if((o.type==="checkbox"||o.type==="radio")&&(r=!1,o.hasAttribute("checked")&&(r=!0)),o.type==="radio"){let i=!1;for(let s=0;s<a.elements.length;s++)if(a[s].checked){i=!0;break}i&&(r=!0)}return r},Ja=new WeakSet,Ol=function(e){const a=e.getAttribute("nospaces");let o=l(this,T,W).call(this,e);return a!=="autodel"&&/\s/.test(o)?!1:(o=o.split(" ").join(""),l(this,Ut,mi).call(this,e,o),!0)},Ka=new WeakSet,Pl=function(e){const a=parseInt(e.getAttribute("minlength")??"0");return!(l(this,T,W).call(this,e).length<a)},Ga=new WeakSet,Wl=function(e){const a=parseInt(e.getAttribute("maxlength")??"0");return!(l(this,T,W).call(this,e).length>a)},Xa=new WeakSet,Rl=function(e){const a=e.getAttribute("rangelength");if(typeof a!="string")return!1;const o=a.split("|"),r=l(this,T,W).call(this,e);return!(r.length<parseInt(o[0])||r.length>parseInt(o[1]))},Za=new WeakSet,Il=function(e){const a=l(this,T,W).call(this,e);return!isNaN(Number(a))},Qa=new WeakSet,Ll=function(e){const a=e.min,o=parseFloat(l(this,T,W).call(this,e));return!(isNaN(o)||o<a)},er=new WeakSet,Fl=function(e){const a=e.max,o=parseFloat(l(this,T,W).call(this,e));return!(isNaN(o)||o>a)},tr=new WeakSet,Nl=function(e){if(!e.hasAttribute("range"))return!0;const a=parseInt(l(this,T,W).call(this,e)),o=e.getAttribute("range");if(typeof o!="string")return!1;const r=o.split("|");return isNaN(a)?!1:!(a<parseInt(r[0])||a>parseInt(r[1]))},ar=new WeakSet,Bl=function(e){if(!e.hasAttribute("domains"))return!0;const a=e.getAttribute("domains");if(typeof a!="string")return!1;const o=a.split("|"),r=l(this,T,W).call(this,e);let i=!1;for(let s=0;s<o.length;s++)if(new RegExp(o[s],"g").test(r)){i=!0;break}return!!i},rr=new WeakSet,Yl=function(e){const a=l(this,T,W).call(this,e);if(!a)return!0;let o=a;o=o.toString(),o=o.replace(new RegExp("/","g"),"-");let r="aaaa-mm-dd";e.hasAttribute("isdate")&&(r=e.getAttribute("isdate")??"aaaa-mm-dd");const i=o.split(" "),s=i[0].split("-"),p=i[1]?i[1].split(":"):null;let d=null,f=null,g=null;r==="aaaa-mm-dd"?[d,f,g]=s:r==="dd-mm-aaaa"?[g,f,d]=s:r==="mm-dd-aaaa"&&([f,g,d]=s);const C=new Date(Number(d),Number(f)-1,Number(g));if(!C||C.getFullYear()!==Number(d)&&C.getMonth()!==Number(f)-1&&C.getDate()!==Number(g))return!1;if(p){const O=parseInt(p[0]),pe=parseInt(p[1]);if(O>24||pe>60)return!1}return!0},or=new WeakSet,Hl=function(e){let a=l(this,T,W).call(this,e);a=a.toString(),a=a.replace(new RegExp("/","g"),"-");const o=e.getAttribute("isdate")??"aaaa-mm-dd",i=a.split(" ")[0].split("-");let s=null,p=null,d=null;o==="aaaa-mm-dd"?[s,p,d]=i:o==="dd-mm-aaaa"?[d,p,s]=i:o==="mm-dd-aaaa"&&([p,d,s]=i);const f=new Date;return f.setFullYear(Number(s),Number(p)-1,Number(d)),!(f>=new Date)},ir=new WeakSet,ql=function(e){const a=parseInt(e.getAttribute("minage")??"0"),o=e.getAttribute("isdate")??"aaaa-mm-dd";let r=l(this,T,W).call(this,e);return r=r.toString(),r=r.replace(new RegExp("/","g"),"-"),!(a>l(this,qt,ui).call(this,r,o))},sr=new WeakSet,Ul=function(e){const a=parseInt(e.getAttribute("maxage")??"0"),o=e.getAttribute("isdate")??"aaaa-mm-dd";let r=l(this,T,W).call(this,e);return r=r.toString(),r=r.replace(new RegExp("/","g"),"-"),!(a<l(this,qt,ui).call(this,r,o))},nr=new WeakSet,Vl=function(e){const a=l(this,T,W).call(this,e);let o=e.getAttribute("security");o!=="low"&&o!=="medium"&&o!=="high"&&o!=="very-high"&&(o="medium");let r=null;return(o==="very-high"||o==="high")&&a.length<8?!1:!(a.length<6||o==="very-high"&&(r=/[@$*&#\-_+./;()[\]{}\\ºª%!¿?¡^~·¬]+/,!r.test(a))||(o==="very-high"||o==="high")&&(r=/[0-9]+/,!r.test(a))||(o==="very-high"||o==="high"||o==="medium")&&(r=/[a-z]+/,!r.test(a)||(r=/[A-Z]+/,!r.test(a))))},lr=new WeakSet,Jl=function(e,a){const o=e.getAttribute("equalto"),r=a.find(s=>s.name===o),i=l(this,T,W).call(this,e);return!(!r||i!==l(this,T,W).call(this,r))},cr=new WeakSet,Kl=function(e){let a=l(this,T,W).call(this,e);return a=a.toString(),a=a.replace(new RegExp(" ","g"),""),a=a.replace(new RegExp("-","g"),""),a=a.replace(new RegExp("\\.","g"),""),a=a.replace(new RegExp("\\/","g"),""),!(a&&(!/^((\+\d{1,3})|(00\d{1,3}))?(\(\d{1,3}\))?([\d]){7,11}$/.test(a)||a.length<8))},dr=new WeakSet,Gl=function(e){let a=l(this,T,W).call(this,e),o=!1;if(!a)return!0;const r=e.getAttribute("phonecountry");if(typeof r!="string")return!1;const i=r.split("|");let s=null,p=null,d=null;for(let f=0;f<i.length;f++){const g=i[f];if(g==="es"&&(a=a.toString(),a=a.replace(new RegExp(" ","g"),""),s=/^((\+34)|(0034))?(6|7|8|9)(\d){8}$/,s.test(a))){o=g;break}if(g==="uk"&&(a=a.toString(),a=a.replace(new RegExp(" ","g"),""),a=a.replace(new RegExp("-","g"),""),s=/^((\+44(\(0\))?(1|2|3|7|8))|(0044(\(0\))?(1|2|7))|(0(1|2|7)))\d{9}$/,s.test(a))){o=g;break}if(g==="it"&&(a=a.toString(),a=a.replace(new RegExp(" ","g"),""),a=a.replace(new RegExp("-","g"),""),s=/^((\+39)|(0039))?(0)(\d){5,9}$/,p=/^((\+39)|(0039))?(3)(\d){9}$/,d=/^((\+39)|(0039))?(80)(\d){7}$/,s.test(a)||p.test(a)||d.test(a))){o=g;break}if(g==="pt"&&(a=a.toString(),a=a.replace(new RegExp(" ","g"),""),a=a.replace(new RegExp("-","g"),""),s=/^((\+351)|(00351))?(2|7|8|9)(\d){8}$/,s.test(a))){o=g;break}if(g==="fr"&&(a=a.toString(),a=a.replace(new RegExp(" ","g"),""),a=a.replace(new RegExp("-","g"),""),s=/^((\+33)|(0033))?(0)?(1|2|3|4|5|6|8)\d{8}$/,s.test(a))){o=g;break}if(g==="us"&&(a=a.toString(),a=a.replace(new RegExp(" ","g"),""),a=a.replace(new RegExp("-","g"),""),a=a.replace(new RegExp("\\.","g"),""),a=a.replace(new RegExp("\\/","g"),""),s=/^((\+1)|(001))?(1?((\(\d{3}\))|(\d{3})))?\d{7}$/,s.test(a))){o=g;break}}return o?(l(this,Ut,mi).call(this,e,l(this,Ha,Ml).call(this,a,o)),!0):!1},hr=new WeakSet,Xl=function(e){const a=e.getAttribute("pattern");if(!a)return!1;const o=new RegExp(a),r=l(this,T,W).call(this,e);return!(r&&!o.test(r))},pr=new WeakSet,Zl=function(e){const a=e.getAttribute("allowed");if(!a)return!1;const o=a.split("|"),r=[];let i=!0;for(let s=0;s<r.length;s++){const d=r[s].name.split("."),f=d[d.length-1];let g=!1;for(let C=0;C<o.length;C++)if(o[C]===f){g=!0;break}if(!g){i=!1;break}}return i},ur=new WeakSet,Ql=function(e,a){const o=parseInt(e.getAttribute("mincheck")??"0"),r=e.getAttribute("checkgroup"),i=[...a.querySelectorAll("input[type=checkbox]"),...a.querySelectorAll("mo-checkbox")];let s=0;for(let p=0;p<i.length;p++)i[p].getAttribute("checkgroup")===r&&i[p].hasAttribute("checked")&&s++;return!(o>s)},mr=new WeakSet,ec=function(e,a){const o=parseInt(e.getAttribute("maxcheck")??"0"),r=e.getAttribute("checkgroup"),i=[...a.querySelectorAll("input[type=checkbox]"),...a.querySelectorAll("mo-checkbox")];let s=0;for(let p=0;p<i.length;p++)i[p].getAttribute("checkgroup")===r&&i[p].hasAttribute("checked")&&s++;return!(o<s)};var kh=Object.defineProperty,xh=Object.getOwnPropertyDescriptor,Tr=(t,e,a,o)=>{for(var r=o>1?void 0:o?xh(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&kh(e,a,r),r},$h=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},xs=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},tc=(t,e,a)=>($h(t,e,"access private method"),a),fi,ac,ms,rc;let ft=class extends w{constructor(){super(...arguments),xs(this,fi),xs(this,ms),this.noValidate=!1,this.errmessages={},this.inputsErrmessages={},this.formRef=rl(),this.elements=[],this.submitButton=null,this.validator=new jh}render(){return c`<form ${ol(this.formRef)} enctype="multipart/form-data" @submit=${tc(this,fi,ac)}>
            <slot></slot>
        </form>`}};fi=new WeakSet;ac=function(t){if(t.preventDefault(),!this.formRef.value)return;this.validator.messages=this.errmessages,this.validator.inputsMessages=this.inputsErrmessages;const e=new FormData(this.formRef.value),a=this.validator.validateForm({elements:this.elements,form:this.formRef.value}),o={elements:this.elements,data:tc(this,ms,rc).call(this,e),form:this,submitButton:this.submitButton,...a};!o.error&&this.submitButton&&(this.submitButton.loading=!0),this.dispatchEvent(new CustomEvent("submit",{detail:{formData:e,event:t,response:o},bubbles:!0,cancelable:!0}))};ms=new WeakSet;rc=function(t){const e={};return t.forEach((a,o)=>{e[o]=a.toString()}),e};ft.styles=[$`
            :host {
                display: block;
            }
        `];Tr([n({type:Boolean})],ft.prototype,"noValidate",2);Tr([n({type:Object})],ft.prototype,"errmessages",2);Tr([n({type:Object})],ft.prototype,"inputsErrmessages",2);ft=Tr([S("mjo-form")],ft);const Sh={radiusLarge:"10px",radiusMedium:"5px",radiusSmall:"3px",fontSizeLarge:"1.5em",fontSizeXlarge:"1.75em",fontSizeXxlarge:"2em",fontSizeMedium:"1em",fontSizeSmall:"0.8em",fontSizeXsmall:"0.6em",fontSizeXxsmall:"0.4em",fontWeightBold:"700",fontWeightLight:"300",fontWeightRegular:"400",spaceXxsmall:"3px",spaceXsmall:"6px",spaceSmall:"8px",spaceMedium:"16px",spaceLarge:"24px",spaceXlarge:"32px",spaceXxlarge:"40px",colors:{white:"#ffffff",black:"#000000",warning:"#ff9800",success:"#4caf50",error:"#f44336",info:"#128ada",blue:{default:"#1d7fdb",alpha0:"#e3f2fd00",alpha1:"#e3f2fd11",alpha2:"#e3f2fd22",alpha3:"#e3f2fd33",alpha4:"#e3f2fd44",alpha5:"#e3f2fd55",alpha6:"#e3f2fd66",alpha7:"#e3f2fd77",alpha8:"#e3f2fd88",alpha9:"#e3f2fd99",50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#1d7fdb",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1"},cyan:{default:"#00bcd4",alpha0:"#00bcd400",alpha1:"#00bcd411",alpha2:"#00bcd422",alpha3:"#00bcd433",alpha4:"#00bcd444",alpha5:"#00bcd455",alpha6:"#00bcd466",alpha7:"#00bcd477",alpha8:"#00bcd488",alpha9:"#00bcd499",50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064"},green:{default:"#4caf50",alpha0:"#4caf5000",alpha1:"#4caf5011",alpha2:"#4caf5022",alpha3:"#4caf5033",alpha4:"#4caf5044",alpha5:"#4caf5055",alpha6:"#4caf5066",alpha7:"#4caf5077",alpha8:"#4caf5088",alpha9:"#4caf5099",50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"},purple:{default:"#9c27b0",alpha0:"#9c27b000",alpha1:"#9c27b011",alpha2:"#9c27b022",alpha3:"#9c27b033",alpha4:"#9c27b044",alpha5:"#9c27b055",alpha6:"#9c27b066",alpha7:"#9c27b077",alpha8:"#9c27b088",alpha9:"#9c27b099",50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c"},red:{default:"#f44336",alpha0:"#f4433600",alpha1:"#f4433611",alpha2:"#f4433622",alpha3:"#f4433633",alpha4:"#f4433644",alpha5:"#f4433655",alpha6:"#f4433666",alpha7:"#f4433677",alpha8:"#f4433688",alpha9:"#f4433699",50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c"},yellow:{default:"#ffeb3b",alpha0:"#ffeb3b00",alpha1:"#ffeb3b11",alpha2:"#ffeb3b22",alpha3:"#ffeb3b33",alpha4:"#ffeb3b44",alpha5:"#ffeb3b55",alpha6:"#ffeb3b66",alpha7:"#ffeb3b77",alpha8:"#ffeb3b88",alpha9:"#ffeb3b99",50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17"},pink:{default:"#e91e63",alpha0:"#e91e6300",alpha1:"#e91e6311",alpha2:"#e91e6322",alpha3:"#e91e6333",alpha4:"#e91e6344",alpha5:"#e91e6355",alpha6:"#e91e6366",alpha7:"#e91e6377",alpha8:"#e91e6388",alpha9:"#e91e6399",50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f"},gray:{default:"#71717A",alpha0:"#71717A00",alpha1:"#71717A11",alpha2:"#71717A22",alpha3:"#71717A33",alpha4:"#71717A44",alpha5:"#71717A55",alpha6:"#71717A66",alpha7:"#71717A77",alpha8:"#71717A88",alpha9:"#71717A99",50:"#FAFAFA",100:"#F4F4F5",200:"#E4E4E7",300:"#D4D4D8",400:"#A1A1AA",500:"#71717A",600:"#52525B",700:"#3F3F46",800:"#27272A",900:"#18181B"}},dark:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#555555",low:"#444444",xlow:"#222222",high:"#666666",xhigh:"#888888"},backgroundColor:{hover:"#666666",default:"#151515",xlow:"#030303",low:"#111111",high:"#252525",xhigh:"#444444"},backgroundColorCard:{default:"#333333",xlow:"#111111",low:"#222222",high:"#555555",xhigh:"#666666"},foregroundColor:{default:"#f0f0f0",xlow:"#999999",low:"#bbbbbb",high:"#ffffff",xhigh:"#ffffff"}},light:{boxShadow:{default:"0 0 5px rgba(0, 0, 0, 0.3)",1:"0 0 2px rgba(0, 0, 0, 0.4)",2:"0 0 7px rgba(0, 0, 0, 0.3)",3:"0 0 10px rgba(0, 0, 0, 0.3)",4:"3px 3px 5px rgba(0, 0, 0, 0.3)",5:"3px 3px 10px rgba(0, 0, 0, 0.3)"},primaryColor:{default:"#1d7fdb",hover:"#1a72c5",50:"#e8f2fb",100:"#d2e5f8",200:"#a5ccf1",300:"#77b2e9",400:"#4a99e2",500:"#1d7fdb",600:"#1a72c5",700:"#145999",800:"#0f406e",900:"#092642",alpha0:"#1d7fdb00",alpha1:"#1d7fdb11",alpha2:"#1d7fdb22",alpha3:"#1d7fdb33",alpha4:"#1d7fdb44",alpha5:"#1d7fdb55",alpha6:"#1d7fdb66",alpha7:"#1d7fdb77",alpha8:"#1d7fdb88",alpha9:"#1d7fdb99"},primaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},secondaryColor:{default:"#cc3d74",hover:"#b83768",alpha0:"#cc3d7400",alpha1:"#cc3d7411",alpha2:"#cc3d7422",alpha3:"#cc3d7433",alpha4:"#cc3d7444",alpha5:"#cc3d7455",alpha6:"#cc3d7466",alpha7:"#cc3d7477",alpha8:"#cc3d7488",alpha9:"#cc3d7499",50:"#faecf1",100:"#f5d8e3",200:"#ebb1c7",300:"#e08bac",400:"#d66490",500:"#cc3d74",600:"#b83768",700:"#8f2b51",800:"#661f3a",900:"#3d1223"},secondaryForegroundColor:{default:"#ffffff",light:"#f2f2f2",dark:"#cccccc"},borderColor:{default:"#dddddd",xlow:"#aaaaaa",low:"#cccccc",high:"#eeeeee",xhigh:"#f0f0f0"},backgroundColor:{hover:"#eeeeee",default:"#efefef",xlow:"#cccccc",low:"#dddddd",high:"#f6f6f6",xhigh:"#ffffff"},backgroundColorCard:{default:"#fafafa",xlow:"#ffffff",low:"#ffffff",high:"#e6e6e6",xhigh:"#dddddd"},foregroundColor:{default:"#333333",xlow:"#999999",low:"#666666",high:"#151515",xhigh:"#000000"}}},oc=({config:t,prefix:e="--mjo-",themeMode:a="dark"})=>{let o="";for(const r in t){const i=t[r];if((r==="dark"||r==="light")&&a!==r)continue;if(r==="colors"){o+=_h(i);continue}if(typeof i=="object"&&i.default){o+=sc(i,`${e}${gt(r)}`);continue}if(r==="components"){o+=Dh(i);continue}if(typeof i=="object"){o+=oc({config:i,themeMode:a});continue}const s=`${e}${gt(r)}`;o+=`${s}: ${i};`}return o},ic=(t,e)=>{for(const a in e)typeof e[a]=="object"&&t[a]?ic(t[a],e[a]):t[a]=e[a]},_h=t=>{let e="";for(const a in t){const o=t[a];typeof o=="object"?e+=sc(o,`--mjo-color-${gt(a)}`):e+=`--mjo-color-${a}: ${o};`}return e},sc=(t,e)=>{let a="";for(const o in t){let r=`${e}-${gt(o)}`;o==="default"&&(r=`${e}`),a+=`${r}: ${t[o]};`}return a},Dh=t=>{let e="";for(const a in t){const o=t[a];for(const r in o){const i=o[r];e+=`--${gt(a)}-${gt(r)}: ${i};`}}return e},gt=t=>t.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase();var Ch=Object.defineProperty,Eh=Object.getOwnPropertyDescriptor,Or=(t,e,a,o)=>{for(var r=o>1?void 0:o?Eh(e,a):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(r=(o?s(e,a,r):s(r))||r);return o&&r&&Ch(e,a,r),r},nc=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)},Mh=(t,e,a)=>(nc(t,e,"read from private field"),a?a.call(t):e.get(t)),zh=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},Ah=(t,e,a,o)=>(nc(t,e,"write to private field"),o?o.call(t,a):e.set(t,a),a),_a;let vt=class extends w{constructor(){super(...arguments),this.theme="light",this.scope="local",this.config={},zh(this,_a,!0)}render(){return Ah(this,_a,!1),c`<slot></slot>`}connectedCallback(){super.connectedCallback(),Qe.get("mjo-theme")?Qe.get("mjo-theme")!==this.theme&&(this.theme=Qe.get("mjo-theme")):Qe.set("mjo-theme",this.theme,{expires:365}),this.applyTheme()}updated(t){t.has("theme")&&t.get("theme")&&t.get("theme")!==this.theme&&(Mh(this,_a)||Qe.set("mjo-theme",this.theme,{expires:365}),this.applyTheme())}applyTheme(){var o,r;const t=structuredClone(Sh);ic(t,this.config);let e=this.scope==="global"?":root {":":host {";e+=oc({config:t,themeMode:this.theme}),e+="}";let a;this.scope==="global"?(a=document.querySelector("#mjo-theme"),a||(a=document.createElement("style"),a.setAttribute("id","mjo-theme"),document.head.appendChild(a))):(a=(o=this.shadowRoot)==null?void 0:o.querySelector("#mjo-theme"),a||(a=document.createElement("style"),a.setAttribute("id","mjo-theme"),(r=this.shadowRoot)==null||r.appendChild(a))),a.innerHTML=e,this.dispatchEvent(new CustomEvent("mjo-theme-change",{detail:{theme:this.theme}}))}};_a=new WeakMap;vt.styles=[$`
            :host {
                display: block;
            }
        `];Or([n({type:String})],vt.prototype,"theme",2);Or([n({type:String})],vt.prototype,"scope",2);Or([n({type:Object})],vt.prototype,"config",2);vt=Or([S("mjo-theme")],vt);function lc(t=1){const e=document.querySelector("mjo-theme");if(!e){if(t>5){console.error("Failed to find mjo-theme component");return}setTimeout(()=>{lc(t+1)},100);return}let a=Qe.get("mjo-theme");e&&!a?a=e.theme||"light":a||(a="light");const o=document.querySelector(".theme-toggle");o&&(o.textContent=a==="dark"?"☀️":"🌙"),e.addEventListener("mjo-theme-change",r=>{const i=r.detail.theme;o&&(o.textContent=i==="dark"?"☀️":"🌙")})}window.toggleTheme=function(){const t=document.querySelector("mjo-theme");if(t){const a=t.theme==="light"?"dark":"light";t.theme=a}else console.warn("⚠️ mjo-theme component not found")};document.addEventListener("DOMContentLoaded",()=>{lc()});
//# sourceMappingURL=client.js.map
