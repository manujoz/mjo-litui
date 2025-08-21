var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _a, _b;
import { r as render, n as noChange, a as nothing, D as Directive, P as PartType, d as directive, h as html } from "./lit-core.js";
import { e as AiOutlineRight, l as AiFillCloseCircle } from "./index.js";
/*! js-cookie v3.0.5 | MIT */
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter$1 = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set,
      get,
      remove: function(name, attributes) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter$1, { path: "/" });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const NODE_MODE = false;
const global$1 = globalThis;
const supportsAdoptingStyleSheets = global$1.ShadowRoot && (global$1.ShadyCSS === void 0 || global$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
const constructionToken = Symbol();
const cssTagCache = /* @__PURE__ */ new WeakMap();
class CSSResult {
  constructor(cssText, strings, safeToken) {
    this["_$cssResult$"] = true;
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
    this._strings = strings;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  get styleSheet() {
    let styleSheet = this._styleSheet;
    const strings = this._strings;
    if (supportsAdoptingStyleSheets && styleSheet === void 0) {
      const cacheable = strings !== void 0 && strings.length === 1;
      if (cacheable) {
        styleSheet = cssTagCache.get(strings);
      }
      if (styleSheet === void 0) {
        (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
        if (cacheable) {
          cssTagCache.set(strings, styleSheet);
        }
      }
    }
    return styleSheet;
  }
  toString() {
    return this.cssText;
  }
}
const textFromCSSResult = (value) => {
  if (value["_$cssResult$"] === true) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`);
  }
};
const unsafeCSS = (value) => new CSSResult(typeof value === "string" ? value : String(value), void 0, constructionToken);
const css = (strings, ...values) => {
  const cssText = strings.length === 1 ? strings[0] : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, strings, constructionToken);
};
const adoptStyles = (renderRoot, styles) => {
  if (supportsAdoptingStyleSheets) {
    renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  } else {
    for (const s of styles) {
      const style = document.createElement("style");
      const nonce = global$1["litNonce"];
      if (nonce !== void 0) {
        style.setAttribute("nonce", nonce);
      }
      style.textContent = s.cssText;
      renderRoot.appendChild(style);
    }
  }
};
const cssResultFromStyleSheet = (sheet) => {
  let cssText = "";
  for (const rule of sheet.cssRules) {
    cssText += rule.cssText;
  }
  return unsafeCSS(cssText);
};
const getCompatibleStyle = supportsAdoptingStyleSheets || NODE_MODE ? (s) => s : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is, defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf } = Object;
const global = globalThis;
let issueWarning$3;
const trustedTypes = global.trustedTypes;
const emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : "";
const polyfillSupport$1 = global.reactiveElementPolyfillSupportDevMode;
{
  const issuedWarnings = global.litIssuedWarnings ?? (global.litIssuedWarnings = /* @__PURE__ */ new Set());
  issueWarning$3 = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
  issueWarning$3("dev-mode", `Lit is in dev mode. Not recommended for production!`);
  if (((_a = global.ShadyDOM) == null ? void 0 : _a.inUse) && polyfillSupport$1 === void 0) {
    issueWarning$3("polyfill-support-missing", `Shadow DOM is being polyfilled via \`ShadyDOM\` but the \`polyfill-support\` module has not been loaded.`);
  }
}
const debugLogEvent = (event) => {
  const shouldEmit = global.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
};
const JSCompiler_renameProperty$1 = (prop, _obj) => prop;
const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        value = value ? emptyStringForBooleanAttribute : null;
        break;
      case Object:
      case Array:
        value = value == null ? value : JSON.stringify(value);
        break;
    }
    return value;
  },
  fromAttribute(value, type) {
    let fromValue = value;
    switch (type) {
      case Boolean:
        fromValue = value !== null;
        break;
      case Number:
        fromValue = value === null ? null : Number(value);
        break;
      case Object:
      case Array:
        try {
          fromValue = JSON.parse(value);
        } catch (e) {
          fromValue = null;
        }
        break;
    }
    return fromValue;
  }
};
const notEqual = (value, old) => !is(value, old);
const defaultPropertyDeclaration$1 = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata"));
global.litPropertyMetadata ?? (global.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class ReactiveElement extends HTMLElement {
  /**
   * Adds an initializer function to the class that is called during instance
   * construction.
   *
   * This is useful for code that runs against a `ReactiveElement`
   * subclass, such as a decorator, that needs to do work for each
   * instance, such as setting up a `ReactiveController`.
   *
   * ```ts
   * const myDecorator = (target: typeof ReactiveElement, key: string) => {
   *   target.addInitializer((instance: ReactiveElement) => {
   *     // This is run during construction of the element
   *     new MyController(instance);
   *   });
   * }
   * ```
   *
   * Decorating a field will then cause each instance to run an initializer
   * that adds a controller:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   @myDecorator foo;
   * }
   * ```
   *
   * Initializers are stored per-constructor. Adding an initializer to a
   * subclass does not add it to a superclass. Since initializers are run in
   * constructors, initializers will run in order of the class hierarchy,
   * starting with superclasses and progressing to the instance's class.
   *
   * @nocollapse
   */
  static addInitializer(initializer) {
    this.__prepare();
    (this._initializers ?? (this._initializers = [])).push(initializer);
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   * @category attributes
   */
  static get observedAttributes() {
    this.finalize();
    return this.__attributeToPropertyMap && [...this.__attributeToPropertyMap.keys()];
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a {@linkcode PropertyDeclaration} for the property with the
   * given options. The property setter calls the property's `hasChanged`
   * property option or uses a strict identity check to determine whether or not
   * to request an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * ```ts
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static createProperty(name, options = defaultPropertyDeclaration$1) {
    if (options.state) {
      options.attribute = false;
    }
    this.__prepare();
    this.elementProperties.set(name, options);
    if (!options.noAccessor) {
      const key = (
        // Use Symbol.for in dev mode to make it easier to maintain state
        // when doing HMR.
        Symbol.for(`${String(name)} (@property() cache)`)
      );
      const descriptor = this.getPropertyDescriptor(name, key, options);
      if (descriptor !== void 0) {
        defineProperty(this.prototype, name, descriptor);
      }
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   * ```ts
   * class MyElement extends LitElement {
   *   static getPropertyDescriptor(name, key, options) {
   *     const defaultDescriptor =
   *         super.getPropertyDescriptor(name, key, options);
   *     const setter = defaultDescriptor.set;
   *     return {
   *       get: defaultDescriptor.get,
   *       set(value) {
   *         setter.call(this, value);
   *         // custom action.
   *       },
   *       configurable: true,
   *       enumerable: true
   *     }
   *   }
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static getPropertyDescriptor(name, key, options) {
    const { get, set } = getOwnPropertyDescriptor(this.prototype, name) ?? {
      get() {
        return this[key];
      },
      set(v) {
        this[key] = v;
      }
    };
    if (get == null) {
      if ("value" in (getOwnPropertyDescriptor(this.prototype, name) ?? {})) {
        throw new Error(`Field ${JSON.stringify(String(name))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);
      }
      issueWarning$3("reactive-property-without-getter", `Field ${JSON.stringify(String(name))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`);
    }
    return {
      get() {
        return get == null ? void 0 : get.call(this);
      },
      set(value) {
        const oldValue = get == null ? void 0 : get.call(this);
        set.call(this, value);
        this.requestUpdate(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a `PropertyDeclaration` via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override
   * {@linkcode createProperty}.
   *
   * @nocollapse
   * @final
   * @category properties
   */
  static getPropertyOptions(name) {
    return this.elementProperties.get(name) ?? defaultPropertyDeclaration$1;
  }
  /**
   * Initializes static own properties of the class used in bookkeeping
   * for element properties, initializers, etc.
   *
   * Can be called multiple times by code that needs to ensure these
   * properties exist before using them.
   *
   * This method ensures the superclass is finalized so that inherited
   * property metadata can be copied down.
   * @nocollapse
   */
  static __prepare() {
    if (this.hasOwnProperty(JSCompiler_renameProperty$1("elementProperties"))) {
      return;
    }
    const superCtor = getPrototypeOf(this);
    superCtor.finalize();
    if (superCtor._initializers !== void 0) {
      this._initializers = [...superCtor._initializers];
    }
    this.elementProperties = new Map(superCtor.elementProperties);
  }
  /**
   * Finishes setting up the class so that it's ready to be registered
   * as a custom element and instantiated.
   *
   * This method is called by the ReactiveElement.observedAttributes getter.
   * If you override the observedAttributes getter, you must either call
   * super.observedAttributes to trigger finalization, or call finalize()
   * yourself.
   *
   * @nocollapse
   */
  static finalize() {
    if (this.hasOwnProperty(JSCompiler_renameProperty$1("finalized"))) {
      return;
    }
    this.finalized = true;
    this.__prepare();
    if (this.hasOwnProperty(JSCompiler_renameProperty$1("properties"))) {
      const props = this.properties;
      const propKeys = [
        ...getOwnPropertyNames(props),
        ...getOwnPropertySymbols(props)
      ];
      for (const p of propKeys) {
        this.createProperty(p, props[p]);
      }
    }
    const metadata = this[Symbol.metadata];
    if (metadata !== null) {
      const properties = litPropertyMetadata.get(metadata);
      if (properties !== void 0) {
        for (const [p, options] of properties) {
          this.elementProperties.set(p, options);
        }
      }
    }
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
    for (const [p, options] of this.elementProperties) {
      const attr = this.__attributeNameForProperty(p, options);
      if (attr !== void 0) {
        this.__attributeToPropertyMap.set(attr, p);
      }
    }
    this.elementStyles = this.finalizeStyles(this.styles);
    {
      if (this.hasOwnProperty("createProperty")) {
        issueWarning$3("no-override-create-property", "Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators");
      }
      if (this.hasOwnProperty("getPropertyDescriptor")) {
        issueWarning$3("no-override-get-property-descriptor", "Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators");
      }
    }
  }
  /**
   * Takes the styles the user supplied via the `static styles` property and
   * returns the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * Styles are deduplicated preserving the _last_ instance in the list. This
   * is a performance optimization to avoid duplicated styles that can occur
   * especially when composing via subclassing. The last item is kept to try
   * to preserve the cascade order with the assumption that it's most important
   * that last added styles override previous styles.
   *
   * @nocollapse
   * @category styles
   */
  static finalizeStyles(styles) {
    const elementStyles = [];
    if (Array.isArray(styles)) {
      const set = new Set(styles.flat(Infinity).reverse());
      for (const s of set) {
        elementStyles.unshift(getCompatibleStyle(s));
      }
    } else if (styles !== void 0) {
      elementStyles.push(getCompatibleStyle(styles));
    }
    return elementStyles;
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */
  static __attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  constructor() {
    super();
    this.__instanceProperties = void 0;
    this.isUpdatePending = false;
    this.hasUpdated = false;
    this.__reflectingProperty = null;
    this.__initialize();
  }
  /**
   * Internal only override point for customizing work done when elements
   * are constructed.
   */
  __initialize() {
    var _a2;
    this.__updatePromise = new Promise((res) => this.enableUpdating = res);
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.__saveInstanceProperties();
    this.requestUpdate();
    (_a2 = this.constructor._initializers) == null ? void 0 : _a2.forEach((i) => i(this));
  }
  /**
   * Registers a `ReactiveController` to participate in the element's reactive
   * update cycle. The element automatically calls into any registered
   * controllers during its lifecycle callbacks.
   *
   * If the element is connected when `addController()` is called, the
   * controller's `hostConnected()` callback will be immediately called.
   * @category controllers
   */
  addController(controller) {
    var _a2;
    (this.__controllers ?? (this.__controllers = /* @__PURE__ */ new Set())).add(controller);
    if (this.renderRoot !== void 0 && this.isConnected) {
      (_a2 = controller.hostConnected) == null ? void 0 : _a2.call(controller);
    }
  }
  /**
   * Removes a `ReactiveController` from the element.
   * @category controllers
   */
  removeController(controller) {
    var _a2;
    (_a2 = this.__controllers) == null ? void 0 : _a2.delete(controller);
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */
  __saveInstanceProperties() {
    const instanceProperties = /* @__PURE__ */ new Map();
    const elementProperties = this.constructor.elementProperties;
    for (const p of elementProperties.keys()) {
      if (this.hasOwnProperty(p)) {
        instanceProperties.set(p, this[p]);
        delete this[p];
      }
    }
    if (instanceProperties.size > 0) {
      this.__instanceProperties = instanceProperties;
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   *
   * @return Returns a node into which to render.
   * @category rendering
   */
  createRenderRoot() {
    const renderRoot = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    adoptStyles(renderRoot, this.constructor.elementStyles);
    return renderRoot;
  }
  /**
   * On first connection, creates the element's renderRoot, sets up
   * element styling, and enables updating.
   * @category lifecycle
   */
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot());
    this.enableUpdating(true);
    (_a2 = this.__controllers) == null ? void 0 : _a2.forEach((c) => {
      var _a3;
      return (_a3 = c.hostConnected) == null ? void 0 : _a3.call(c);
    });
  }
  /**
   * Note, this method should be considered final and not overridden. It is
   * overridden on the element instance with a function that triggers the first
   * update.
   * @category updates
   */
  enableUpdating(_requestedUpdate) {
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   * @category lifecycle
   */
  disconnectedCallback() {
    var _a2;
    (_a2 = this.__controllers) == null ? void 0 : _a2.forEach((c) => {
      var _a3;
      return (_a3 = c.hostDisconnected) == null ? void 0 : _a3.call(c);
    });
  }
  /**
   * Synchronizes property values when attributes change.
   *
   * Specifically, when an attribute is set, the corresponding property is set.
   * You should rarely need to implement this callback. If this method is
   * overridden, `super.attributeChangedCallback(name, _old, value)` must be
   * called.
   *
   * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
   * on MDN for more information about the `attributeChangedCallback`.
   * @category attributes
   */
  attributeChangedCallback(name, _old, value) {
    this._$attributeToProperty(name, value);
  }
  __propertyToAttribute(name, value) {
    var _a2;
    const elemProperties = this.constructor.elementProperties;
    const options = elemProperties.get(name);
    const attr = this.constructor.__attributeNameForProperty(name, options);
    if (attr !== void 0 && options.reflect === true) {
      const converter = ((_a2 = options.converter) == null ? void 0 : _a2.toAttribute) !== void 0 ? options.converter : defaultConverter;
      const attrValue = converter.toAttribute(value, options.type);
      if (this.constructor.enabledWarnings.includes("migration") && attrValue === void 0) {
        issueWarning$3("undefined-attribute-value", `The attribute value for the ${name} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);
      }
      this.__reflectingProperty = name;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this.__reflectingProperty = null;
    }
  }
  /** @internal */
  _$attributeToProperty(name, value) {
    var _a2;
    const ctor = this.constructor;
    const propName = ctor.__attributeToPropertyMap.get(name);
    if (propName !== void 0 && this.__reflectingProperty !== propName) {
      const options = ctor.getPropertyOptions(propName);
      const converter = typeof options.converter === "function" ? { fromAttribute: options.converter } : ((_a2 = options.converter) == null ? void 0 : _a2.fromAttribute) !== void 0 ? options.converter : defaultConverter;
      this.__reflectingProperty = propName;
      this[propName] = converter.fromAttribute(
        value,
        options.type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      );
      this.__reflectingProperty = null;
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should be called
   * when an element should update based on some state not triggered by setting
   * a reactive property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored.
   *
   * @param name name of requesting property
   * @param oldValue old value of requesting property
   * @param options property options to use instead of the previously
   *     configured options
   * @category updates
   */
  requestUpdate(name, oldValue, options) {
    if (name !== void 0) {
      if (name instanceof Event) {
        issueWarning$3(``, `The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()`);
      }
      options ?? (options = this.constructor.getPropertyOptions(name));
      const hasChanged = options.hasChanged ?? notEqual;
      const newValue = this[name];
      if (hasChanged(newValue, oldValue)) {
        this._$changeProperty(name, oldValue, options);
      } else {
        return;
      }
    }
    if (this.isUpdatePending === false) {
      this.__updatePromise = this.__enqueueUpdate();
    }
  }
  /**
   * @internal
   */
  _$changeProperty(name, oldValue, options) {
    if (!this._$changedProperties.has(name)) {
      this._$changedProperties.set(name, oldValue);
    }
    if (options.reflect === true && this.__reflectingProperty !== name) {
      (this.__reflectingProperties ?? (this.__reflectingProperties = /* @__PURE__ */ new Set())).add(name);
    }
  }
  /**
   * Sets up the element to asynchronously update.
   */
  async __enqueueUpdate() {
    this.isUpdatePending = true;
    try {
      await this.__updatePromise;
    } catch (e) {
      Promise.reject(e);
    }
    const result = this.scheduleUpdate();
    if (result != null) {
      await result;
    }
    return !this.isUpdatePending;
  }
  /**
   * Schedules an element update. You can override this method to change the
   * timing of updates by returning a Promise. The update will await the
   * returned Promise, and you should resolve the Promise to allow the update
   * to proceed. If this method is overridden, `super.scheduleUpdate()`
   * must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```ts
   * override protected async scheduleUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.scheduleUpdate();
   * }
   * ```
   * @category updates
   */
  scheduleUpdate() {
    const result = this.performUpdate();
    if (this.constructor.enabledWarnings.includes("async-perform-update") && typeof (result == null ? void 0 : result.then) === "function") {
      issueWarning$3("async-perform-update", `Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`);
    }
    return result;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * Call `performUpdate()` to immediately process a pending update. This should
   * generally not be needed, but it can be done in rare cases when you need to
   * update synchronously.
   *
   * @category updates
   */
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) {
      return;
    }
    debugLogEvent == null ? void 0 : debugLogEvent({ kind: "update" });
    if (!this.hasUpdated) {
      this.renderRoot ?? (this.renderRoot = this.createRenderRoot());
      {
        const ctor = this.constructor;
        const shadowedProperties = [...ctor.elementProperties.keys()].filter((p) => this.hasOwnProperty(p) && p in getPrototypeOf(this));
        if (shadowedProperties.length) {
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${shadowedProperties.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
        }
      }
      if (this.__instanceProperties) {
        for (const [p, value] of this.__instanceProperties) {
          this[p] = value;
        }
        this.__instanceProperties = void 0;
      }
      const elementProperties = this.constructor.elementProperties;
      if (elementProperties.size > 0) {
        for (const [p, options] of elementProperties) {
          if (options.wrapped === true && !this._$changedProperties.has(p) && this[p] !== void 0) {
            this._$changeProperty(p, this[p], options);
          }
        }
      }
    }
    let shouldUpdate = false;
    const changedProperties = this._$changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.willUpdate(changedProperties);
        (_a2 = this.__controllers) == null ? void 0 : _a2.forEach((c) => {
          var _a3;
          return (_a3 = c.hostUpdate) == null ? void 0 : _a3.call(c);
        });
        this.update(changedProperties);
      } else {
        this.__markUpdated();
      }
    } catch (e) {
      shouldUpdate = false;
      this.__markUpdated();
      throw e;
    }
    if (shouldUpdate) {
      this._$didUpdate(changedProperties);
    }
  }
  /**
   * Invoked before `update()` to compute values needed during the update.
   *
   * Implement `willUpdate` to compute property values that depend on other
   * properties and are used in the rest of the update process.
   *
   * ```ts
   * willUpdate(changedProperties) {
   *   // only need to check changed properties for an expensive computation.
   *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
   *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
   *   }
   * }
   *
   * render() {
   *   return html`SHA: ${this.sha}`;
   * }
   * ```
   *
   * @category updates
   */
  willUpdate(_changedProperties) {
  }
  // Note, this is an override point for polyfill-support.
  // @internal
  _$didUpdate(changedProperties) {
    var _a2;
    (_a2 = this.__controllers) == null ? void 0 : _a2.forEach((c) => {
      var _a3;
      return (_a3 = c.hostUpdated) == null ? void 0 : _a3.call(c);
    });
    if (!this.hasUpdated) {
      this.hasUpdated = true;
      this.firstUpdated(changedProperties);
    }
    this.updated(changedProperties);
    if (this.isUpdatePending && this.constructor.enabledWarnings.includes("change-in-update")) {
      issueWarning$3("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
    }
  }
  __markUpdated() {
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.isUpdatePending = false;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super.getUpdateComplete()`, then any subsequent state.
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  get updateComplete() {
    return this.getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   override async getUpdateComplete() {
   *     const result = await super.getUpdateComplete();
   *     await this._myChild.updateComplete;
   *     return result;
   *   }
   * }
   * ```
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  getUpdateComplete() {
    return this.__updatePromise;
  }
  /**
   * Controls whether or not `update()` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  update(_changedProperties) {
    this.__reflectingProperties && (this.__reflectingProperties = this.__reflectingProperties.forEach((p) => this.__propertyToAttribute(p, this[p])));
    this.__markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  updated(_changedProperties) {
  }
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * ```ts
   * firstUpdated() {
   *   this.renderRoot.getElementById('my-text-area').focus();
   * }
   * ```
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  firstUpdated(_changedProperties) {
  }
}
ReactiveElement.elementStyles = [];
ReactiveElement.shadowRootOptions = { mode: "open" };
ReactiveElement[JSCompiler_renameProperty$1("elementProperties")] = /* @__PURE__ */ new Map();
ReactiveElement[JSCompiler_renameProperty$1("finalized")] = /* @__PURE__ */ new Map();
polyfillSupport$1 == null ? void 0 : polyfillSupport$1({ ReactiveElement });
{
  ReactiveElement.enabledWarnings = [
    "change-in-update",
    "async-perform-update"
  ];
  const ensureOwnWarnings = function(ctor) {
    if (!ctor.hasOwnProperty(JSCompiler_renameProperty$1("enabledWarnings"))) {
      ctor.enabledWarnings = ctor.enabledWarnings.slice();
    }
  };
  ReactiveElement.enableWarning = function(warning) {
    ensureOwnWarnings(this);
    if (!this.enabledWarnings.includes(warning)) {
      this.enabledWarnings.push(warning);
    }
  };
  ReactiveElement.disableWarning = function(warning) {
    ensureOwnWarnings(this);
    const i = this.enabledWarnings.indexOf(warning);
    if (i >= 0) {
      this.enabledWarnings.splice(i, 1);
    }
  };
}
(global.reactiveElementVersions ?? (global.reactiveElementVersions = [])).push("2.0.4");
if (global.reactiveElementVersions.length > 1) {
  issueWarning$3("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const JSCompiler_renameProperty = (prop, _obj) => prop;
let issueWarning$2;
{
  const issuedWarnings = globalThis.litIssuedWarnings ?? (globalThis.litIssuedWarnings = /* @__PURE__ */ new Set());
  issueWarning$2 = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
}
class LitElement extends ReactiveElement {
  constructor() {
    super(...arguments);
    this.renderOptions = { host: this };
    this.__childPart = void 0;
  }
  /**
   * @category rendering
   */
  createRenderRoot() {
    var _a2;
    const renderRoot = super.createRenderRoot();
    (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = renderRoot.firstChild);
    return renderRoot;
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param changedProperties Map of changed properties with old values
   * @category updates
   */
  update(changedProperties) {
    const value = this.render();
    if (!this.hasUpdated) {
      this.renderOptions.isConnected = this.isConnected;
    }
    super.update(changedProperties);
    this.__childPart = render(value, this.renderRoot, this.renderOptions);
  }
  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   *
   * ```ts
   * connectedCallback() {
   *   super.connectedCallback();
   *   addEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * Typically, anything done in `connectedCallback()` should be undone when the
   * element is disconnected, in `disconnectedCallback()`.
   *
   * @category lifecycle
   */
  connectedCallback() {
    var _a2;
    super.connectedCallback();
    (_a2 = this.__childPart) == null ? void 0 : _a2.setConnected(true);
  }
  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * ```ts
   * disconnectedCallback() {
   *   super.disconnectedCallback();
   *   window.removeEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * An element may be re-connected after being disconnected.
   *
   * @category lifecycle
   */
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this.__childPart) == null ? void 0 : _a2.setConnected(false);
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `ChildPart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   * @category rendering
   */
  render() {
    return noChange;
  }
}
LitElement["_$litElement$"] = true;
LitElement[JSCompiler_renameProperty("finalized")] = true;
(_b = globalThis.litElementHydrateSupport) == null ? void 0 : _b.call(globalThis, { LitElement });
const polyfillSupport = globalThis.litElementPolyfillSupportDevMode;
polyfillSupport == null ? void 0 : polyfillSupport({ LitElement });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
if (globalThis.litElementVersions.length > 1) {
  issueWarning$2("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const customElement = (tagName) => (classOrTarget, context) => {
  if (context !== void 0) {
    context.addInitializer(() => {
      customElements.define(tagName, classOrTarget);
    });
  } else {
    customElements.define(tagName, classOrTarget);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let issueWarning$1;
{
  const issuedWarnings = globalThis.litIssuedWarnings ?? (globalThis.litIssuedWarnings = /* @__PURE__ */ new Set());
  issueWarning$1 = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
}
const legacyProperty = (options, proto, name) => {
  const hasOwnProperty = proto.hasOwnProperty(name);
  proto.constructor.createProperty(name, hasOwnProperty ? { ...options, wrapped: true } : options);
  return hasOwnProperty ? Object.getOwnPropertyDescriptor(proto, name) : void 0;
};
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const standardProperty = (options = defaultPropertyDeclaration, target, context) => {
  const { kind, metadata } = context;
  if (metadata == null) {
    issueWarning$1("missing-class-metadata", `The class ${target} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);
  }
  let properties = globalThis.litPropertyMetadata.get(metadata);
  if (properties === void 0) {
    globalThis.litPropertyMetadata.set(metadata, properties = /* @__PURE__ */ new Map());
  }
  properties.set(context.name, options);
  if (kind === "accessor") {
    const { name } = context;
    return {
      set(v) {
        const oldValue = target.get.call(this);
        target.set.call(this, v);
        this.requestUpdate(name, oldValue, options);
      },
      init(v) {
        if (v !== void 0) {
          this._$changeProperty(name, void 0, options);
        }
        return v;
      }
    };
  } else if (kind === "setter") {
    const { name } = context;
    return function(value) {
      const oldValue = this[name];
      target.call(this, value);
      this.requestUpdate(name, oldValue, options);
    };
  }
  throw new Error(`Unsupported decorator location: ${kind}`);
};
function property(options) {
  return (protoOrTarget, nameOrContext) => {
    return typeof nameOrContext === "object" ? standardProperty(options, protoOrTarget, nameOrContext) : legacyProperty(options, protoOrTarget, nameOrContext);
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function state(options) {
  return property({
    ...options,
    // Add both `state` and `attribute` because we found a third party
    // controller that is keying off of PropertyOptions.state to determine
    // whether a field is a private internal property or not.
    state: true,
    attribute: false
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const desc = (obj, name, descriptor) => {
  descriptor.configurable = true;
  descriptor.enumerable = true;
  if (
    // We check for Reflect.decorate each time, in case the zombiefill
    // is applied via lazy loading some Angular code.
    Reflect.decorate && typeof name !== "object"
  ) {
    Object.defineProperty(obj, name, descriptor);
  }
  return descriptor;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let issueWarning;
{
  const issuedWarnings = globalThis.litIssuedWarnings ?? (globalThis.litIssuedWarnings = /* @__PURE__ */ new Set());
  issueWarning = (code, warning) => {
    warning += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
}
function query(selector, cache) {
  return (protoOrTarget, nameOrContext, descriptor) => {
    const doQuery = (el) => {
      var _a2;
      const result = ((_a2 = el.renderRoot) == null ? void 0 : _a2.querySelector(selector)) ?? null;
      if (result === null && cache && !el.hasUpdated) {
        const name = typeof nameOrContext === "object" ? nameOrContext.name : nameOrContext;
        issueWarning("", `@query'd field ${JSON.stringify(String(name))} with the 'cache' flag set for selector '${selector}' has been accessed before the first update and returned null. This is expected if the renderRoot tree has not been provided beforehand (e.g. via Declarative Shadow DOM). Therefore the value hasn't been cached.`);
      }
      return result;
    };
    if (cache) {
      const { get, set } = typeof nameOrContext === "object" ? protoOrTarget : descriptor ?? (() => {
        const key = Symbol(`${String(nameOrContext)} (@query() cache)`);
        return {
          get() {
            return this[key];
          },
          set(v) {
            this[key] = v;
          }
        };
      })();
      return desc(protoOrTarget, nameOrContext, {
        get() {
          let result = get.call(this);
          if (result === void 0) {
            result = doQuery(this);
            if (result !== null || this.hasUpdated) {
              set.call(this, result);
            }
          }
          return result;
        }
      });
    } else {
      return desc(protoOrTarget, nameOrContext, {
        get() {
          return doQuery(this);
        }
      });
    }
  };
}
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$7(target, key, result);
  return result;
};
const ThemeMixin = (superClass) => {
  var _applyTheme, applyTheme_fn, _kamelCaseToKebabCase, kamelCaseToKebabCase_fn;
  class ThemeMx extends superClass {
    constructor() {
      super(...arguments);
      __privateAdd(this, _applyTheme);
      __privateAdd(this, _kamelCaseToKebabCase);
      this.cssStyles = "";
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.theme) {
        __privateMethod(this, _applyTheme, applyTheme_fn).call(this);
      }
    }
  }
  _applyTheme = new WeakSet();
  applyTheme_fn = function() {
    var _a2, _b2;
    const key = this.tagName.toLowerCase();
    for (const componentKey in this.theme) {
      const value = this.theme[componentKey];
      this.cssStyles += `--${__privateMethod(this, _kamelCaseToKebabCase, kamelCaseToKebabCase_fn).call(this, key)}-${__privateMethod(this, _kamelCaseToKebabCase, kamelCaseToKebabCase_fn).call(this, componentKey)}: ${value};`;
    }
    let style = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("#mjo-theme");
    if (!style) {
      style = document.createElement("style");
      style.setAttribute("id", "mjo-theme");
      (_b2 = this.shadowRoot) == null ? void 0 : _b2.appendChild(style);
    }
    style.innerHTML = `:host {${this.cssStyles}}`;
  };
  _kamelCaseToKebabCase = new WeakSet();
  kamelCaseToKebabCase_fn = function(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
  };
  __decorateClass$7([
    property({ type: Object })
  ], ThemeMx.prototype, "theme", 2);
  return ThemeMx;
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ifDefined = (value) => value ?? nothing;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const HTML_RESULT = 1;
class UnsafeHTMLDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    this._value = nothing;
    if (partInfo.type !== PartType.CHILD) {
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
    }
  }
  render(value) {
    if (value === nothing || value == null) {
      this._templateResult = void 0;
      return this._value = value;
    }
    if (value === noChange) {
      return value;
    }
    if (typeof value != "string") {
      throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
    }
    if (value === this._value) {
      return this._templateResult;
    }
    this._value = value;
    const strings = [value];
    strings.raw = strings;
    return this._templateResult = {
      // Cast to a known set of integers that satisfy ResultType so that we
      // don't have to export ResultType and possibly encourage this pattern.
      // This property needs to remain unminified.
      ["_$litType$"]: this.constructor.resultType,
      strings,
      values: []
    };
  }
}
UnsafeHTMLDirective.directiveName = "unsafeHTML";
UnsafeHTMLDirective.resultType = HTML_RESULT;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const SVG_RESULT = 2;
class UnsafeSVGDirective extends UnsafeHTMLDirective {
}
UnsafeSVGDirective.directiveName = "unsafeSVG";
UnsafeSVGDirective.resultType = SVG_RESULT;
const unsafeSVG = directive(UnsafeSVGDirective);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$6(target, key, result);
  return result;
};
let MjoIcon = class extends ThemeMixin(LitElement) {
  render() {
    return this.src ? html`${unsafeSVG(this.src)}` : nothing;
  }
};
MjoIcon.styles = [
  css`
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
        `
];
__decorateClass$6([
  property({ type: String })
], MjoIcon.prototype, "src", 2);
MjoIcon = __decorateClass$6([
  customElement("mjo-icon")
], MjoIcon);
const pause = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
var __accessCheck$4 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => {
  __accessCheck$4(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$4 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$3 = (obj, member, method) => {
  __accessCheck$4(obj, member, "access private method");
  return method;
};
var _uniqueId, _handleKeyDown, _navigateToSibling, navigateToSibling_fn, _navigateToEdge, navigateToEdge_fn, _toggleContent, toggleContent_fn, _openContent, openContent_fn, _closeContent, closeContent_fn;
let MjoAccordionItem = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$4(this, _navigateToSibling);
    __privateAdd$4(this, _navigateToEdge);
    __privateAdd$4(this, _toggleContent);
    __privateAdd$4(this, _openContent);
    __privateAdd$4(this, _closeContent);
    this.itemTitle = "";
    this.itemSubtitle = "";
    this.expanded = false;
    this.disabled = false;
    this.compact = false;
    this.icon = AiOutlineRight;
    this.animationDuration = 300;
    this.animationEasing = "ease-in-out";
    this.variant = "light";
    __privateAdd$4(this, _uniqueId, `accordion-item-${Math.random().toString(36).substring(2, 15)}`);
    __privateAdd$4(this, _handleKeyDown, (event) => {
      if (this.disabled)
        return;
      const { key } = event;
      if (key === "Enter" || key === " ") {
        event.preventDefault();
        __privateMethod$3(this, _toggleContent, toggleContent_fn).call(this);
      } else if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault();
        __privateMethod$3(this, _navigateToSibling, navigateToSibling_fn).call(this, key === "ArrowUp" ? "previous" : "next");
      } else if (key === "Home" || key === "End") {
        event.preventDefault();
        __privateMethod$3(this, _navigateToEdge, navigateToEdge_fn).call(this, key === "Home" ? "first" : "last");
      } else if (key === "Escape" && this.expanded) {
        event.preventDefault();
        this.close();
      }
    });
  }
  get computedAriaLabel() {
    if (typeof this.itemTitle === "string") {
      return `Toggle ${this.itemTitle}`;
    }
    return "Toggle accordion section";
  }
  render() {
    return html`
            <div class="container" data-variant=${this.variant} ?data-compact=${this.compact} ?data-disabled=${this.disabled}>
                <div
                    class="titleContainer"
                    role="button"
                    tabindex=${this.disabled ? -1 : 0}
                    aria-expanded=${this.expanded}
                    aria-controls=${`${__privateGet$2(this, _uniqueId)}-content`}
                    aria-label=${this.computedAriaLabel}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    aria-disabled=${this.disabled}
                    @click=${__privateMethod$3(this, _toggleContent, toggleContent_fn)}
                    @keydown=${__privateGet$2(this, _handleKeyDown)}
                >
                    <div class="titleContent" id=${`${__privateGet$2(this, _uniqueId)}-title`}>
                        ${typeof this.itemTitle === "string" ? html`
                                  <mjo-typography class="title" tag="h3" size="heading3" weight="medium">${this.itemTitle}</mjo-typography>
                                  ${this.itemSubtitle ? html`<mjo-typography class="subtitle" tag="p" size="body1" weight="medium"> ${this.itemSubtitle} </mjo-typography>` : nothing}
                              ` : this.itemTitle}
                    </div>
                    <div class="iconContainer">
                        <mjo-icon src=${this.icon}></mjo-icon>
                    </div>
                </div>
                <div class="content" id=${`${__privateGet$2(this, _uniqueId)}-content`} role="region" aria-labelledby=${`${__privateGet$2(this, _uniqueId)}-title`}>
                    <slot></slot>
                </div>
            </div>
        `;
  }
  updated(_changedProperties) {
    if (_changedProperties.has("expanded")) {
      if (this.expanded) {
        __privateMethod$3(this, _openContent, openContent_fn).call(this);
      } else {
        __privateMethod$3(this, _closeContent, closeContent_fn).call(this);
      }
    }
    if (_changedProperties.has("disabled") && this.disabled) {
      this.close();
    }
  }
  setCompact(compact) {
    this.compact = compact;
  }
  open() {
    this.expanded = true;
  }
  close() {
    this.expanded = false;
  }
  toggle() {
    this.expanded = !this.expanded;
  }
  focus() {
    var _a2;
    (_a2 = this.titleContainerEl) == null ? void 0 : _a2.focus();
  }
};
_uniqueId = /* @__PURE__ */ new WeakMap();
_handleKeyDown = /* @__PURE__ */ new WeakMap();
_navigateToSibling = /* @__PURE__ */ new WeakSet();
navigateToSibling_fn = function(direction) {
  const accordion = this.closest("mjo-accordion");
  if (!accordion)
    return;
  const items = Array.from(accordion.querySelectorAll("mjo-accordion-item"));
  const currentIndex = items.indexOf(this);
  const nextIndex = direction === "previous" ? currentIndex - 1 : currentIndex + 1;
  const targetItem = items[nextIndex];
  if (targetItem && !targetItem.disabled) {
    targetItem.focus();
  }
};
_navigateToEdge = /* @__PURE__ */ new WeakSet();
navigateToEdge_fn = function(edge) {
  const accordion = this.closest("mjo-accordion");
  if (!accordion)
    return;
  const items = Array.from(accordion.querySelectorAll("mjo-accordion-item"));
  const targetItem = edge === "first" ? items[0] : items[items.length - 1];
  if (targetItem && !targetItem.disabled) {
    targetItem.focus();
  }
};
_toggleContent = /* @__PURE__ */ new WeakSet();
toggleContent_fn = function() {
  this.expanded = !this.expanded;
  this.dispatchEvent(new CustomEvent("accordion-toggle", { detail: { item: this, expanded: this.expanded } }));
};
_openContent = /* @__PURE__ */ new WeakSet();
openContent_fn = async function(tries = 0) {
  if (this.disabled)
    return;
  const scrollHeight = this.contentEl.scrollHeight;
  if (scrollHeight === 0) {
    if (tries === 10)
      return;
    setTimeout(() => {
      __privateMethod$3(this, _openContent, openContent_fn).call(this, tries + 1);
    }, 50);
    return;
  }
  const willEvent = new CustomEvent("accordion-will-expand", {
    detail: { item: this, expanded: true },
    cancelable: true
  });
  if (!this.dispatchEvent(willEvent)) {
    return;
  }
  this.contentEl.style.transition = `
            max-height ${this.animationDuration}ms ${this.animationEasing},
            opacity ${this.animationDuration}ms ${this.animationEasing}
        `;
  this.iconEl.style.transition = `transform ${this.animationDuration}ms ${this.animationEasing}`;
  this.containerEl.style.paddingBottom = "var(--mjo-accordion-item-content-padding, var(--mjo-space-medium))";
  this.contentEl.style.maxHeight = `${scrollHeight}px`;
  this.contentEl.style.opacity = "1";
  this.iconEl.style.transform = "rotate(90deg)";
  await pause(this.animationDuration);
  this.dispatchEvent(
    new CustomEvent("accordion-expanded", {
      detail: { item: this, expanded: this.expanded }
    })
  );
};
_closeContent = /* @__PURE__ */ new WeakSet();
closeContent_fn = async function() {
  const willEvent = new CustomEvent("accordion-will-collapse", {
    detail: { item: this, expanded: false },
    cancelable: true
  });
  if (!this.dispatchEvent(willEvent)) {
    return;
  }
  this.containerEl.removeAttribute("style");
  this.contentEl.removeAttribute("style");
  this.iconEl.removeAttribute("style");
  await pause(this.animationDuration);
  this.dispatchEvent(
    new CustomEvent("accordion-collapsed", {
      detail: { item: this, expanded: this.expanded }
    })
  );
};
MjoAccordionItem.styles = [
  css`
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
        `
];
__decorateClass$5([
  property({ type: String })
], MjoAccordionItem.prototype, "itemTitle", 2);
__decorateClass$5([
  property({ type: String })
], MjoAccordionItem.prototype, "itemSubtitle", 2);
__decorateClass$5([
  property({ type: Boolean })
], MjoAccordionItem.prototype, "expanded", 2);
__decorateClass$5([
  property({ type: Boolean })
], MjoAccordionItem.prototype, "disabled", 2);
__decorateClass$5([
  property({ type: Boolean })
], MjoAccordionItem.prototype, "compact", 2);
__decorateClass$5([
  property({ type: String })
], MjoAccordionItem.prototype, "icon", 2);
__decorateClass$5([
  property({ type: Number })
], MjoAccordionItem.prototype, "animationDuration", 2);
__decorateClass$5([
  property({ type: String })
], MjoAccordionItem.prototype, "animationEasing", 2);
__decorateClass$5([
  property({ type: String, attribute: "aria-describedby" })
], MjoAccordionItem.prototype, "ariaDescribedby", 2);
__decorateClass$5([
  state()
], MjoAccordionItem.prototype, "variant", 2);
__decorateClass$5([
  query(".container")
], MjoAccordionItem.prototype, "containerEl", 2);
__decorateClass$5([
  query(".content")
], MjoAccordionItem.prototype, "contentEl", 2);
__decorateClass$5([
  query(".iconContainer mjo-icon")
], MjoAccordionItem.prototype, "iconEl", 2);
__decorateClass$5([
  query(".titleContainer")
], MjoAccordionItem.prototype, "titleContainerEl", 2);
MjoAccordionItem = __decorateClass$5([
  customElement("mjo-accordion-item")
], MjoAccordionItem);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
var __accessCheck$3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => {
  __accessCheck$3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$2 = (obj, member, method) => {
  __accessCheck$3(obj, member, "access private method");
  return method;
};
var _handleToggle, _mount, mount_fn;
let MjoAccordion = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$3(this, _mount);
    this.variant = "light";
    this.selectionMode = "single";
    this.compact = false;
    this.items = [];
    __privateAdd$3(this, _handleToggle, (event) => {
      const customEvent = event;
      const toggledItem = customEvent.detail.item;
      if (this.selectionMode === "single") {
        this.items.forEach((item) => {
          if (item !== toggledItem && item.expanded) {
            item.close();
          }
        });
      }
      this.dispatchEvent(
        new CustomEvent("accordion-toggle", {
          detail: {
            item: toggledItem,
            expanded: customEvent.detail.expanded,
            accordion: this
          }
        })
      );
    });
  }
  render() {
    return html`<div class="container" role="tablist" data-variant=${this.variant} ?data-compact=${this.compact}></div>`;
  }
  firstUpdated() {
    this.items = Array.from(this.querySelectorAll("mjo-accordion-item"));
    __privateMethod$2(this, _mount, mount_fn).call(this);
  }
  updated(_changedProperties) {
    if (_changedProperties.has("compact")) {
      this.items.forEach((item) => {
        item.setCompact(this.compact);
      });
    }
    if (_changedProperties.has("variant")) {
      this.items.forEach((item) => {
        item.variant = this.variant;
      });
    }
  }
  expandItem(index) {
    const item = typeof index === "number" ? this.items[index] : this.items.find((i) => i.id === index);
    if (item && !item.disabled) {
      item.open();
    }
  }
  collapseItem(index) {
    const item = typeof index === "number" ? this.items[index] : this.items.find((i) => i.id === index);
    if (item) {
      item.close();
    }
  }
  expandAll() {
    if (this.selectionMode === "multiple") {
      this.items.forEach((item) => {
        if (!item.disabled)
          item.open();
      });
    }
  }
  collapseAll() {
    this.items.forEach((item) => item.close());
  }
  focusItem(index) {
    if (this.items[index] && !this.items[index].disabled) {
      this.items[index].focus();
    }
  }
};
_handleToggle = /* @__PURE__ */ new WeakMap();
_mount = /* @__PURE__ */ new WeakSet();
mount_fn = function() {
  this.items.forEach((item) => {
    this.containerEl.appendChild(item);
    item.variant = this.variant;
    item.addEventListener("accordion-toggle", __privateGet$1(this, _handleToggle));
    item.addEventListener("accordion-will-expand", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("accordion-will-expand", {
          detail: { ...customEvent.detail, accordion: this },
          cancelable: true
        })
      );
    });
    item.addEventListener("accordion-expanded", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("accordion-expanded", {
          detail: { ...customEvent.detail, accordion: this }
        })
      );
    });
    item.addEventListener("accordion-will-collapse", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("accordion-will-collapse", {
          detail: { ...customEvent.detail, accordion: this },
          cancelable: true
        })
      );
    });
    item.addEventListener("accordion-collapsed", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("accordion-collapsed", {
          detail: { ...customEvent.detail, accordion: this }
        })
      );
    });
  });
};
MjoAccordion.styles = [
  css`
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
        `
];
__decorateClass$4([
  property({ type: String })
], MjoAccordion.prototype, "variant", 2);
__decorateClass$4([
  property({ type: String })
], MjoAccordion.prototype, "selectionMode", 2);
__decorateClass$4([
  property({ type: Boolean })
], MjoAccordion.prototype, "compact", 2);
__decorateClass$4([
  query(".container")
], MjoAccordion.prototype, "containerEl", 2);
MjoAccordion = __decorateClass$4([
  customElement("mjo-accordion")
], MjoAccordion);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
var __accessCheck$2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$1 = (obj, member, method) => {
  __accessCheck$2(obj, member, "access private method");
  return method;
};
var _colorByInitial, colorByInitial_fn, _handleKeydown$1, handleKeydown_fn$1, _handleClick, handleClick_fn, _handleError, handleError_fn;
let MjoAvatar = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$2(this, _colorByInitial);
    __privateAdd$2(this, _handleKeydown$1);
    __privateAdd$2(this, _handleClick);
    __privateAdd$2(this, _handleError);
    this.bordered = false;
    this.disabled = false;
    this.clickable = false;
    this.nameColoured = false;
    this.color = "default";
    this.radius = "full";
    this.size = "medium";
    this.error = false;
    this.initial = "";
  }
  get appropriateRole() {
    if (this.clickable)
      return "button";
    if (this.src)
      return "img";
    return "presentation";
  }
  get computedAriaLabel() {
    if (this.ariaLabel)
      return this.ariaLabel;
    if (this.clickable) {
      const nameOrValue = this.name || this.value || "avatar";
      return `Click to interact with ${nameOrValue}`;
    }
    if (this.name) {
      return `Avatar for ${this.name}`;
    }
    return "Avatar";
  }
  render() {
    this.initial = this.name ? this.name[0].toLocaleUpperCase() : "";
    return html`<div
            class="container size-${this.size} radius-${this.radius} color-${this.color}"
            role=${this.appropriateRole}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${ifDefined(this.ariaDescribedby)}
            aria-disabled=${this.disabled ? "true" : "false"}
            tabindex=${this.clickable ? this.tabIndex ?? 0 : -1}
            ?data-bordered=${this.bordered}
            ?data-disabled=${this.disabled}
            ?data-clickable=${this.clickable}
            @click=${__privateMethod$1(this, _handleClick, handleClick_fn)}
            @keydown=${__privateMethod$1(this, _handleKeydown$1, handleKeydown_fn$1)}
        >
            ${this.src && !this.error ? html`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${ifDefined(this.alt || this.name)} @error=${__privateMethod$1(this, _handleError, handleError_fn)} />
                  </div>` : this.fallbackIcon ? html`<div class="image fallback radius-${this.radius} font-size-${this.size}"><mjo-icon src=${this.fallbackIcon}></mjo-icon></div>` : this.name ? html`<div class="image name radius-${this.radius} font-size-${this.size}"><span>${this.initial}</span></div>` : html`<div class="image radius-${this.radius}"></div>`}
        </div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.name) {
      this.initial = this.name[0].toUpperCase();
    }
  }
  updated(_changedProperties) {
    var _a2;
    if (_changedProperties.has("name")) {
      this.initial = this.name ? this.name[0].toUpperCase() : "";
    }
    if (_changedProperties.has("src")) {
      this.error = false;
    }
    const nameElement = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".image.name");
    if (this.name && this.nameColoured && nameElement) {
      const [bg, fg] = __privateMethod$1(this, _colorByInitial, colorByInitial_fn).call(this);
      nameElement.style.backgroundColor = bg;
      nameElement.style.color = fg;
    } else if (nameElement) {
      nameElement.style.backgroundColor = "";
      nameElement.style.color = "";
    }
  }
};
_colorByInitial = /* @__PURE__ */ new WeakSet();
colorByInitial_fn = function() {
  const backgroundColors = [
    "#e72c2c",
    "#e7902c",
    "#f1db13",
    "#c1f113",
    "#59f113",
    "#26b632",
    "#19da90",
    "#10dfcd",
    "#0ab4df",
    "#0a78df",
    "#0a43df",
    "#6d0adf",
    "#985cdd",
    "#c85cdd",
    "#dd5cc8",
    "#c7199b",
    "#c7194d"
  ];
  const foregroundColors = [
    "#fff",
    "#fff",
    "#000",
    "#000",
    "#000",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff"
  ];
  const bgindex = this.initial.charCodeAt(0) % backgroundColors.length;
  const fgindex = this.initial.charCodeAt(0) % foregroundColors.length;
  return [backgroundColors[bgindex], foregroundColors[fgindex]];
};
_handleKeydown$1 = /* @__PURE__ */ new WeakSet();
handleKeydown_fn$1 = function(event) {
  if (!this.clickable || this.disabled)
    return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    __privateMethod$1(this, _handleClick, handleClick_fn).call(this);
  }
};
_handleClick = /* @__PURE__ */ new WeakSet();
handleClick_fn = async function() {
  if (!this.clickable || this.disabled)
    return;
  this.dispatchEvent(new CustomEvent("avatar-click", { detail: { value: this.value || this.name || "" } }));
  this.container.style.transform = "scale(0.9)";
  await pause(100);
  this.container.style.transform = "scale(1.1)";
  await pause(150);
  this.container.removeAttribute("style");
};
_handleError = /* @__PURE__ */ new WeakSet();
handleError_fn = function() {
  this.error = true;
  this.dispatchEvent(
    new CustomEvent("avatar-error", {
      detail: { message: "Failed to load avatar image" }
    })
  );
};
MjoAvatar.styles = [
  css`
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
        `
];
__decorateClass$3([
  property({ type: Boolean })
], MjoAvatar.prototype, "bordered", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoAvatar.prototype, "disabled", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoAvatar.prototype, "clickable", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoAvatar.prototype, "nameColoured", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "fallbackIcon", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "alt", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "color", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "name", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "radius", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "size", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "src", 2);
__decorateClass$3([
  property({ type: String })
], MjoAvatar.prototype, "value", 2);
__decorateClass$3([
  property({ type: String, attribute: "aria-describedby" })
], MjoAvatar.prototype, "ariaDescribedby", 2);
__decorateClass$3([
  state()
], MjoAvatar.prototype, "error", 2);
__decorateClass$3([
  query(".container")
], MjoAvatar.prototype, "container", 2);
MjoAvatar = __decorateClass$3([
  customElement("mjo-avatar")
], MjoAvatar);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let MjoTypography = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    this.tag = "p";
    this.size = "base";
    this.weight = "regular";
  }
  render() {
    switch (this.tag) {
      case "h1":
        return html`<h1 class=${`${this.size} ${this.weight}`}><slot></slot></h1>`;
      case "h2":
        return html`<h2 class=${`${this.size} ${this.weight}`}><slot></slot></h2>`;
      case "h3":
        return html`<h3 class=${`${this.size} ${this.weight}`}><slot></slot></h3>`;
      case "h4":
        return html`<h4 class=${`${this.size} ${this.weight}`}><slot></slot></h4>`;
      case "h5":
        return html`<h5 class=${`${this.size} ${this.weight}`}><slot></slot></h5>`;
      case "span":
        return html`<span class=${`${this.size} ${this.weight}`}><slot></slot></span>`;
      case "p":
        return html`<p class=${`${this.size} ${this.weight}`}><slot></slot></p>`;
      default:
        return html`<slot></slot>`;
    }
  }
};
MjoTypography.styles = [
  css`
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
        `
];
__decorateClass$2([
  property({ type: String })
], MjoTypography.prototype, "tag", 2);
__decorateClass$2([
  property({ type: String })
], MjoTypography.prototype, "size", 2);
__decorateClass$2([
  property({ type: String })
], MjoTypography.prototype, "weight", 2);
MjoTypography = __decorateClass$2([
  customElement("mjo-typography")
], MjoTypography);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
var __accessCheck$1 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$1 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod2 = (obj, member, method) => {
  __accessCheck$1(obj, member, "access private method");
  return method;
};
var _handleKeydown, handleKeydown_fn, _handleCloseKeydown, handleCloseKeydown_fn, _handleChipClick, handleChipClick_fn, _handleCloseClick, handleCloseClick_fn;
let MjoChip = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$1(this, _handleKeydown);
    __privateAdd$1(this, _handleCloseKeydown);
    __privateAdd$1(this, _handleChipClick);
    __privateAdd$1(this, _handleCloseClick);
    this.closable = false;
    this.clickable = false;
    this.disabled = false;
    this.color = "default";
    this.label = "";
    this.radius = "full";
    this.size = "medium";
    this.variant = "solid";
  }
  get computedAriaLabel() {
    if (this.ariaLabel)
      return this.ariaLabel;
    if (this.clickable && this.closable) {
      return `${this.label}. Clickable chip with close button`;
    } else if (this.clickable) {
      return `${this.label}. Click to interact`;
    } else if (this.closable) {
      return `${this.label}. Press to close`;
    }
    return `Chip: ${this.label}`;
  }
  get computedTabIndex() {
    if (this.disabled)
      return -1;
    if (this.clickable || this.closable)
      return this.tabIndex ?? 0;
    return -1;
  }
  render() {
    return html`<div
            class="container"
            role=${ifDefined(this.clickable || this.closable ? "button" : void 0)}
            aria-label=${this.computedAriaLabel}
            aria-describedby=${ifDefined(this.ariaDescribedby)}
            aria-disabled=${this.disabled ? "true" : "false"}
            tabindex=${this.computedTabIndex}
            data-color=${this.color}
            data-size=${this.size}
            data-variant=${this.variant}
            data-radius=${this.radius}
            ?data-closable=${this.closable}
            ?data-clickable=${this.clickable}
            ?data-disabled=${this.disabled}
            @click=${__privateMethod2(this, _handleChipClick, handleChipClick_fn)}
            @keydown=${__privateMethod2(this, _handleKeydown, handleKeydown_fn)}
        >
            ${this.variant === "dot" ? html`<span class="dot"></span>` : nothing}
            ${this.startIcon ? html`<mjo-icon src=${this.startIcon}></mjo-icon>` : nothing}
            <mjo-typography tag="span" class="label">${this.label}</mjo-typography>
            ${this.endIcon ? html`<mjo-icon src=${this.endIcon}></mjo-icon>` : nothing}
            ${this.closable ? html`<mjo-icon
                      class="close"
                      src=${AiFillCloseCircle}
                      @click=${__privateMethod2(this, _handleCloseClick, handleCloseClick_fn)}
                      @keydown=${__privateMethod2(this, _handleCloseKeydown, handleCloseKeydown_fn)}
                      role="button"
                      tabindex=${this.disabled ? "-1" : "0"}
                      aria-label="Close ${this.label}"
                  ></mjo-icon>` : nothing}
        </div>`;
  }
};
_handleKeydown = /* @__PURE__ */ new WeakSet();
handleKeydown_fn = function(event) {
  if (this.disabled)
    return;
  if (event.key === "Escape" && this.closable) {
    event.preventDefault();
    __privateMethod2(this, _handleCloseClick, handleCloseClick_fn).call(this, event);
  }
  if ((event.key === "Enter" || event.key === " ") && this.clickable) {
    event.preventDefault();
    __privateMethod2(this, _handleChipClick, handleChipClick_fn).call(this);
  }
};
_handleCloseKeydown = /* @__PURE__ */ new WeakSet();
handleCloseKeydown_fn = function(event) {
  if (this.disabled)
    return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.stopPropagation();
    __privateMethod2(this, _handleCloseClick, handleCloseClick_fn).call(this, event);
  }
};
_handleChipClick = /* @__PURE__ */ new WeakSet();
handleChipClick_fn = async function() {
  if (!this.clickable || this.disabled)
    return;
  this.dispatchEvent(
    new CustomEvent("chip-click", {
      bubbles: true,
      composed: true,
      detail: { value: this.value || this.label }
    })
  );
  if (this.container) {
    this.container.style.transform = "scale(0.95)";
    await pause(100);
    this.container.style.transform = "scale(1.02)";
    await pause(150);
    this.container.removeAttribute("style");
  }
};
_handleCloseClick = /* @__PURE__ */ new WeakSet();
handleCloseClick_fn = function(event) {
  if (this.disabled)
    return;
  if (event) {
    event.stopPropagation();
  }
  this.dispatchEvent(
    new CustomEvent("chip-close", {
      bubbles: true,
      composed: true,
      detail: { value: this.value || this.label }
    })
  );
  this.remove();
};
MjoChip.styles = [
  css`
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
        `
];
__decorateClass$1([
  property({ type: Boolean })
], MjoChip.prototype, "closable", 2);
__decorateClass$1([
  property({ type: Boolean })
], MjoChip.prototype, "clickable", 2);
__decorateClass$1([
  property({ type: Boolean })
], MjoChip.prototype, "disabled", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "color", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "endIcon", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "label", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "radius", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "size", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "startIcon", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "value", 2);
__decorateClass$1([
  property({ type: String })
], MjoChip.prototype, "variant", 2);
__decorateClass$1([
  property({ type: String, attribute: "aria-describedby" })
], MjoChip.prototype, "ariaDescribedby", 2);
__decorateClass$1([
  query(".container")
], MjoChip.prototype, "container", 2);
MjoChip = __decorateClass$1([
  customElement("mjo-chip")
], MjoChip);
const defaultTheme = {
  radiusLarge: "10px",
  radiusMedium: "5px",
  radiusSmall: "3px",
  fontSizeLarge: "1.5em",
  fontSizeXlarge: "1.75em",
  fontSizeXxlarge: "2em",
  fontSizeMedium: "1em",
  fontSizeSmall: "0.8em",
  fontSizeXsmall: "0.6em",
  fontSizeXxsmall: "0.4em",
  fontWeightBold: "700",
  fontWeightLight: "300",
  fontWeightRegular: "400",
  spaceXxsmall: "3px",
  spaceXsmall: "6px",
  spaceSmall: "8px",
  spaceMedium: "16px",
  spaceLarge: "24px",
  spaceXlarge: "32px",
  spaceXxlarge: "40px",
  colors: {
    white: "#ffffff",
    black: "#000000",
    warning: "#ff9800",
    success: "#4caf50",
    error: "#f44336",
    info: "#128ada",
    blue: {
      default: "#1d7fdb",
      alpha0: "#e3f2fd00",
      alpha1: "#e3f2fd11",
      alpha2: "#e3f2fd22",
      alpha3: "#e3f2fd33",
      alpha4: "#e3f2fd44",
      alpha5: "#e3f2fd55",
      alpha6: "#e3f2fd66",
      alpha7: "#e3f2fd77",
      alpha8: "#e3f2fd88",
      alpha9: "#e3f2fd99",
      "50": "#e3f2fd",
      "100": "#bbdefb",
      "200": "#90caf9",
      "300": "#64b5f6",
      "400": "#42a5f5",
      "500": "#1d7fdb",
      "600": "#1e88e5",
      "700": "#1976d2",
      "800": "#1565c0",
      "900": "#0d47a1"
    },
    cyan: {
      default: "#00bcd4",
      alpha0: "#00bcd400",
      alpha1: "#00bcd411",
      alpha2: "#00bcd422",
      alpha3: "#00bcd433",
      alpha4: "#00bcd444",
      alpha5: "#00bcd455",
      alpha6: "#00bcd466",
      alpha7: "#00bcd477",
      alpha8: "#00bcd488",
      alpha9: "#00bcd499",
      "50": "#e0f7fa",
      "100": "#b2ebf2",
      "200": "#80deea",
      "300": "#4dd0e1",
      "400": "#26c6da",
      "500": "#00bcd4",
      "600": "#00acc1",
      "700": "#0097a7",
      "800": "#00838f",
      "900": "#006064"
    },
    green: {
      default: "#4caf50",
      alpha0: "#4caf5000",
      alpha1: "#4caf5011",
      alpha2: "#4caf5022",
      alpha3: "#4caf5033",
      alpha4: "#4caf5044",
      alpha5: "#4caf5055",
      alpha6: "#4caf5066",
      alpha7: "#4caf5077",
      alpha8: "#4caf5088",
      alpha9: "#4caf5099",
      "50": "#e8f5e9",
      "100": "#c8e6c9",
      "200": "#a5d6a7",
      "300": "#81c784",
      "400": "#66bb6a",
      "500": "#4caf50",
      "600": "#43a047",
      "700": "#388e3c",
      "800": "#2e7d32",
      "900": "#1b5e20"
    },
    purple: {
      default: "#9c27b0",
      alpha0: "#9c27b000",
      alpha1: "#9c27b011",
      alpha2: "#9c27b022",
      alpha3: "#9c27b033",
      alpha4: "#9c27b044",
      alpha5: "#9c27b055",
      alpha6: "#9c27b066",
      alpha7: "#9c27b077",
      alpha8: "#9c27b088",
      alpha9: "#9c27b099",
      "50": "#f3e5f5",
      "100": "#e1bee7",
      "200": "#ce93d8",
      "300": "#ba68c8",
      "400": "#ab47bc",
      "500": "#9c27b0",
      "600": "#8e24aa",
      "700": "#7b1fa2",
      "800": "#6a1b9a",
      "900": "#4a148c"
    },
    red: {
      default: "#f44336",
      alpha0: "#f4433600",
      alpha1: "#f4433611",
      alpha2: "#f4433622",
      alpha3: "#f4433633",
      alpha4: "#f4433644",
      alpha5: "#f4433655",
      alpha6: "#f4433666",
      alpha7: "#f4433677",
      alpha8: "#f4433688",
      alpha9: "#f4433699",
      "50": "#ffebee",
      "100": "#ffcdd2",
      "200": "#ef9a9a",
      "300": "#e57373",
      "400": "#ef5350",
      "500": "#f44336",
      "600": "#e53935",
      "700": "#d32f2f",
      "800": "#c62828",
      "900": "#b71c1c"
    },
    yellow: {
      default: "#ffeb3b",
      alpha0: "#ffeb3b00",
      alpha1: "#ffeb3b11",
      alpha2: "#ffeb3b22",
      alpha3: "#ffeb3b33",
      alpha4: "#ffeb3b44",
      alpha5: "#ffeb3b55",
      alpha6: "#ffeb3b66",
      alpha7: "#ffeb3b77",
      alpha8: "#ffeb3b88",
      alpha9: "#ffeb3b99",
      "50": "#fffde7",
      "100": "#fff9c4",
      "200": "#fff59d",
      "300": "#fff176",
      "400": "#ffee58",
      "500": "#ffeb3b",
      "600": "#fdd835",
      "700": "#fbc02d",
      "800": "#f9a825",
      "900": "#f57f17"
    },
    pink: {
      default: "#e91e63",
      alpha0: "#e91e6300",
      alpha1: "#e91e6311",
      alpha2: "#e91e6322",
      alpha3: "#e91e6333",
      alpha4: "#e91e6344",
      alpha5: "#e91e6355",
      alpha6: "#e91e6366",
      alpha7: "#e91e6377",
      alpha8: "#e91e6388",
      alpha9: "#e91e6399",
      "50": "#fce4ec",
      "100": "#f8bbd0",
      "200": "#f48fb1",
      "300": "#f06292",
      "400": "#ec407a",
      "500": "#e91e63",
      "600": "#d81b60",
      "700": "#c2185b",
      "800": "#ad1457",
      "900": "#880e4f"
    },
    gray: {
      default: "#71717A",
      alpha0: "#71717A00",
      alpha1: "#71717A11",
      alpha2: "#71717A22",
      alpha3: "#71717A33",
      alpha4: "#71717A44",
      alpha5: "#71717A55",
      alpha6: "#71717A66",
      alpha7: "#71717A77",
      alpha8: "#71717A88",
      alpha9: "#71717A99",
      "50": "#FAFAFA",
      "100": "#F4F4F5",
      "200": "#E4E4E7",
      "300": "#D4D4D8",
      "400": "#A1A1AA",
      "500": "#71717A",
      "600": "#52525B",
      "700": "#3F3F46",
      "800": "#27272A",
      "900": "#18181B"
    }
  },
  dark: {
    boxShadow: {
      default: "0 0 5px rgba(0, 0, 0, 0.3)",
      "1": "0 0 2px rgba(0, 0, 0, 0.4)",
      "2": "0 0 7px rgba(0, 0, 0, 0.3)",
      "3": "0 0 10px rgba(0, 0, 0, 0.3)",
      "4": "3px 3px 5px rgba(0, 0, 0, 0.3)",
      "5": "3px 3px 10px rgba(0, 0, 0, 0.3)"
    },
    primaryColor: {
      default: "#1d7fdb",
      hover: "#1a72c5",
      alpha0: "#1d7fdb00",
      alpha1: "#1d7fdb11",
      alpha2: "#1d7fdb22",
      alpha3: "#1d7fdb33",
      alpha4: "#1d7fdb44",
      alpha5: "#1d7fdb55",
      alpha6: "#1d7fdb66",
      alpha7: "#1d7fdb77",
      alpha8: "#1d7fdb88",
      alpha9: "#1d7fdb99",
      "50": "#e8f2fb",
      "100": "#d2e5f8",
      "200": "#a5ccf1",
      "300": "#77b2e9",
      "400": "#4a99e2",
      "500": "#1d7fdb",
      "600": "#1a72c5",
      "700": "#145999",
      "800": "#0f406e",
      "900": "#092642"
    },
    primaryForegroundColor: {
      default: "#ffffff",
      light: "#f2f2f2",
      dark: "#cccccc"
    },
    secondaryColor: {
      default: "#cc3d74",
      hover: "#b83768",
      alpha0: "#cc3d7400",
      alpha1: "#cc3d7411",
      alpha2: "#cc3d7422",
      alpha3: "#cc3d7433",
      alpha4: "#cc3d7444",
      alpha5: "#cc3d7455",
      alpha6: "#cc3d7466",
      alpha7: "#cc3d7477",
      alpha8: "#cc3d7488",
      alpha9: "#cc3d7499",
      "50": "#faecf1",
      "100": "#f5d8e3",
      "200": "#ebb1c7",
      "300": "#e08bac",
      "400": "#d66490",
      "500": "#cc3d74",
      "600": "#b83768",
      "700": "#8f2b51",
      "800": "#661f3a",
      "900": "#3d1223"
    },
    secondaryForegroundColor: {
      default: "#ffffff",
      light: "#f2f2f2",
      dark: "#cccccc"
    },
    borderColor: {
      default: "#555555",
      low: "#444444",
      xlow: "#222222",
      high: "#666666",
      xhigh: "#888888"
    },
    backgroundColor: {
      hover: "#666666",
      default: "#151515",
      xlow: "#030303",
      low: "#111111",
      high: "#252525",
      xhigh: "#444444"
    },
    backgroundColorCard: {
      default: "#333333",
      xlow: "#111111",
      low: "#222222",
      high: "#555555",
      xhigh: "#666666"
    },
    foregroundColor: {
      default: "#f0f0f0",
      xlow: "#999999",
      low: "#bbbbbb",
      high: "#ffffff",
      xhigh: "#ffffff"
    }
  },
  light: {
    boxShadow: {
      default: "0 0 5px rgba(0, 0, 0, 0.3)",
      "1": "0 0 2px rgba(0, 0, 0, 0.4)",
      "2": "0 0 7px rgba(0, 0, 0, 0.3)",
      "3": "0 0 10px rgba(0, 0, 0, 0.3)",
      "4": "3px 3px 5px rgba(0, 0, 0, 0.3)",
      "5": "3px 3px 10px rgba(0, 0, 0, 0.3)"
    },
    primaryColor: {
      default: "#1d7fdb",
      hover: "#1a72c5",
      "50": "#e8f2fb",
      "100": "#d2e5f8",
      "200": "#a5ccf1",
      "300": "#77b2e9",
      "400": "#4a99e2",
      "500": "#1d7fdb",
      "600": "#1a72c5",
      "700": "#145999",
      "800": "#0f406e",
      "900": "#092642",
      alpha0: "#1d7fdb00",
      alpha1: "#1d7fdb11",
      alpha2: "#1d7fdb22",
      alpha3: "#1d7fdb33",
      alpha4: "#1d7fdb44",
      alpha5: "#1d7fdb55",
      alpha6: "#1d7fdb66",
      alpha7: "#1d7fdb77",
      alpha8: "#1d7fdb88",
      alpha9: "#1d7fdb99"
    },
    primaryForegroundColor: {
      default: "#ffffff",
      light: "#f2f2f2",
      dark: "#cccccc"
    },
    secondaryColor: {
      default: "#cc3d74",
      hover: "#b83768",
      alpha0: "#cc3d7400",
      alpha1: "#cc3d7411",
      alpha2: "#cc3d7422",
      alpha3: "#cc3d7433",
      alpha4: "#cc3d7444",
      alpha5: "#cc3d7455",
      alpha6: "#cc3d7466",
      alpha7: "#cc3d7477",
      alpha8: "#cc3d7488",
      alpha9: "#cc3d7499",
      "50": "#faecf1",
      "100": "#f5d8e3",
      "200": "#ebb1c7",
      "300": "#e08bac",
      "400": "#d66490",
      "500": "#cc3d74",
      "600": "#b83768",
      "700": "#8f2b51",
      "800": "#661f3a",
      "900": "#3d1223"
    },
    secondaryForegroundColor: {
      default: "#ffffff",
      light: "#f2f2f2",
      dark: "#cccccc"
    },
    borderColor: {
      default: "#dddddd",
      xlow: "#aaaaaa",
      low: "#cccccc",
      high: "#eeeeee",
      xhigh: "#f0f0f0"
    },
    backgroundColor: {
      hover: "#eeeeee",
      default: "#efefef",
      xlow: "#cccccc",
      low: "#dddddd",
      high: "#f6f6f6",
      xhigh: "#ffffff"
    },
    backgroundColorCard: {
      default: "#fafafa",
      xlow: "#ffffff",
      low: "#ffffff",
      high: "#e6e6e6",
      xhigh: "#dddddd"
    },
    foregroundColor: {
      default: "#333333",
      xlow: "#999999",
      low: "#666666",
      high: "#151515",
      xhigh: "#000000"
    }
  }
};
const applyThemeToCssVars = ({
  config,
  prefix = "--mjo-",
  themeMode = "dark"
}) => {
  let cssStyles = "";
  for (const key in config) {
    const value = config[key];
    if ((key === "dark" || key === "light") && themeMode !== key) {
      continue;
    }
    if (key === "colors") {
      cssStyles += applyColorsPaletteToCssVars(value);
      continue;
    }
    if (typeof value === "object" && value["default"]) {
      cssStyles += applyStylesFromObject(value, `${prefix}${kamelCaseToKebabCase(key)}`);
      continue;
    }
    if (key === "components") {
      cssStyles += applyComponentsStyles(value);
      continue;
    }
    if (typeof value === "object") {
      cssStyles += applyThemeToCssVars({ config: value, themeMode });
      continue;
    }
    const cssVar = `${prefix}${kamelCaseToKebabCase(key)}`;
    cssStyles += `${cssVar}: ${value};`;
  }
  return cssStyles;
};
const mergeConfig = (defaultConfig, userConfig) => {
  for (const key in userConfig) {
    if (typeof userConfig[key] === "object" && defaultConfig[key]) {
      mergeConfig(defaultConfig[key], userConfig[key]);
    } else {
      defaultConfig[key] = userConfig[key];
    }
  }
};
const applyColorsPaletteToCssVars = (colors) => {
  let cssStyles = "";
  for (const key in colors) {
    const value = colors[key];
    if (typeof value === "object") {
      cssStyles += applyStylesFromObject(value, `--mjo-color-${kamelCaseToKebabCase(key)}`);
    } else {
      cssStyles += `--mjo-color-${key}: ${value};`;
    }
  }
  return cssStyles;
};
const applyStylesFromObject = (color, prefix) => {
  let cssStyles = "";
  for (const key in color) {
    let cssVar = `${prefix}-${kamelCaseToKebabCase(key)}`;
    if (key === "default")
      cssVar = `${prefix}`;
    cssStyles += `${cssVar}: ${color[key]};`;
  }
  return cssStyles;
};
const applyComponentsStyles = (components) => {
  let cssStyles = "";
  for (const key in components) {
    const component = components[key];
    for (const componentKey in component) {
      const value = component[componentKey];
      cssStyles += `--${kamelCaseToKebabCase(key)}-${kamelCaseToKebabCase(componentKey)}: ${value};`;
    }
  }
  return cssStyles;
};
const kamelCaseToKebabCase = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _isFirstUpdated;
let MjoTheme = class extends LitElement {
  constructor() {
    super(...arguments);
    this.theme = "light";
    this.scope = "local";
    this.config = {};
    __privateAdd2(this, _isFirstUpdated, true);
  }
  render() {
    __privateSet(this, _isFirstUpdated, false);
    return html`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!api.get("mjo-theme")) {
      api.set("mjo-theme", this.theme, { expires: 365 });
    } else if (api.get("mjo-theme") !== this.theme) {
      this.theme = api.get("mjo-theme");
    }
    this.applyTheme();
  }
  updated(_changedProperties) {
    if (_changedProperties.has("theme") && _changedProperties.get("theme") && _changedProperties.get("theme") !== this.theme) {
      if (!__privateGet(this, _isFirstUpdated)) {
        api.set("mjo-theme", this.theme, { expires: 365 });
      }
      this.applyTheme();
    }
  }
  applyTheme() {
    var _a2, _b2;
    const mergedConfig = structuredClone(defaultTheme);
    mergeConfig(mergedConfig, this.config);
    let cssStyles = this.scope === "global" ? ":root {" : ":host {";
    cssStyles += applyThemeToCssVars({ config: mergedConfig, themeMode: this.theme });
    cssStyles += "}";
    let style;
    if (this.scope === "global") {
      style = document.querySelector("#mjo-theme");
      if (!style) {
        style = document.createElement("style");
        style.setAttribute("id", "mjo-theme");
        document.head.appendChild(style);
      }
    } else {
      style = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("#mjo-theme");
      if (!style) {
        style = document.createElement("style");
        style.setAttribute("id", "mjo-theme");
        (_b2 = this.shadowRoot) == null ? void 0 : _b2.appendChild(style);
      }
    }
    style.innerHTML = cssStyles;
    this.dispatchEvent(new CustomEvent("mjo-theme-change", { detail: { theme: this.theme } }));
  }
};
_isFirstUpdated = /* @__PURE__ */ new WeakMap();
MjoTheme.styles = [
  css`
            :host {
                display: block;
            }
        `
];
__decorateClass([
  property({ type: String })
], MjoTheme.prototype, "theme", 2);
__decorateClass([
  property({ type: String })
], MjoTheme.prototype, "scope", 2);
__decorateClass([
  property({ type: Object })
], MjoTheme.prototype, "config", 2);
MjoTheme = __decorateClass([
  customElement("mjo-theme")
], MjoTheme);
function initializeTheme(tries = 1) {
  const themeComponent = document.querySelector("mjo-theme");
  if (!themeComponent) {
    if (tries > 5) {
      console.error("Failed to find mjo-theme component");
      return;
    }
    setTimeout(() => {
      initializeTheme(tries + 1);
    }, 100);
    return;
  }
  let savedTheme = api.get("mjo-theme");
  if (themeComponent && !savedTheme) {
    savedTheme = themeComponent.theme || "light";
  } else if (!savedTheme) {
    savedTheme = "light";
  }
  const toggleBtn = document.querySelector(".theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  }
  themeComponent.addEventListener("mjo-theme-change", (ev) => {
    const newTheme = ev.detail.theme;
    if (toggleBtn) {
      toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
    }
  });
}
window.toggleTheme = function() {
  const themeComponent = document.querySelector("mjo-theme");
  if (themeComponent) {
    const currentTheme = themeComponent.theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    themeComponent.theme = newTheme;
  } else {
    console.warn("⚠️ mjo-theme component not found");
  }
};
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
});
//# sourceMappingURL=client.js.map
