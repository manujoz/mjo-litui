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
var _a, _b, _ageCalculator, ageCalculator_fn, _defaultMessages, defaultMessages_fn, _getErrorMessage, getErrorMessage_fn, _getInputValue, getInputValue_fn, _setInputError, setInputError_fn, _phoneNumberFormat, phoneNumberFormat_fn, _setInputValue, setInputValue_fn, _validateIsEmail, validateIsEmail_fn, _validateIsUrl, validateIsUrl_fn, _validateIsRequired, validateIsRequired_fn, _validateNoSpaces, validateNoSpaces_fn, _validateIsMinLength, validateIsMinLength_fn, _validateIsMaxLength, validateIsMaxLength_fn, _validateIsRangeLength, validateIsRangeLength_fn, _validateIsNumber, validateIsNumber_fn, _validateIsMin, validateIsMin_fn, _validateIsMax, validateIsMax_fn, _validateIsRange, validateIsRange_fn, _validateDomains, validateDomains_fn, _validateIsDate, validateIsDate_fn, _validateIsDateprevius, validateIsDateprevius_fn, _validateIsMinage, validateIsMinage_fn, _validateIsMaxage, validateIsMaxage_fn, _validateSecurity, validateSecurity_fn, _validateEqualTo, validateEqualTo_fn, _validatePhonenumber, validatePhonenumber_fn, _validatePhonecountry, validatePhonecountry_fn, _validatePattern, validatePattern_fn, _validateAllowed, validateAllowed_fn, _validateMincheck, validateMincheck_fn, _validateMaxcheck, validateMaxcheck_fn;
import { r as render, n as noChange, a as nothing, D as Directive, P as PartType, d as directive, h as html, i as isSingleExpression, s as setCommittedValue } from "./lit-core.js";
import { e as AiOutlineRight, l as AiFillWarning, m as AiFillInfoCircle, n as AiFillCloseCircle, o as AiFillCheckCircle, p as AiOutlineClose, q as AiOutlineMinus, r as AiFillCheckSquare, s as AiFillEye, t as AiFillEyeInvisible } from "./index.js";
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
var __defProp$u = Object.defineProperty;
var __getOwnPropDesc$u = Object.getOwnPropertyDescriptor;
var __decorateClass$u = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$u(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$u(target, key, result);
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
  __decorateClass$u([
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
var __defProp$t = Object.defineProperty;
var __getOwnPropDesc$t = Object.getOwnPropertyDescriptor;
var __decorateClass$t = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$t(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$t(target, key, result);
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
__decorateClass$t([
  property({ type: String })
], MjoIcon.prototype, "src", 2);
MjoIcon = __decorateClass$t([
  customElement("mjo-icon")
], MjoIcon);
const pause = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
var __defProp$s = Object.defineProperty;
var __getOwnPropDesc$s = Object.getOwnPropertyDescriptor;
var __decorateClass$s = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$s(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$s(target, key, result);
  return result;
};
var __accessCheck$k = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$7 = (obj, member, getter) => {
  __accessCheck$k(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$k = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$j = (obj, member, method) => {
  __accessCheck$k(obj, member, "access private method");
  return method;
};
var _uniqueId, _handleKeyDown, _navigateToSibling, navigateToSibling_fn, _navigateToEdge, navigateToEdge_fn, _toggleContent, toggleContent_fn, _openContent, openContent_fn, _closeContent, closeContent_fn;
let MjoAccordionItem = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$k(this, _navigateToSibling);
    __privateAdd$k(this, _navigateToEdge);
    __privateAdd$k(this, _toggleContent);
    __privateAdd$k(this, _openContent);
    __privateAdd$k(this, _closeContent);
    this.itemTitle = "";
    this.itemSubtitle = "";
    this.expanded = false;
    this.disabled = false;
    this.compact = false;
    this.icon = AiOutlineRight;
    this.animationDuration = 300;
    this.animationEasing = "ease-in-out";
    this.variant = "light";
    __privateAdd$k(this, _uniqueId, `accordion-item-${Math.random().toString(36).substring(2, 15)}`);
    __privateAdd$k(this, _handleKeyDown, (event) => {
      if (this.disabled)
        return;
      const { key } = event;
      if (key === "Enter" || key === " ") {
        event.preventDefault();
        __privateMethod$j(this, _toggleContent, toggleContent_fn).call(this);
      } else if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault();
        __privateMethod$j(this, _navigateToSibling, navigateToSibling_fn).call(this, key === "ArrowUp" ? "previous" : "next");
      } else if (key === "Home" || key === "End") {
        event.preventDefault();
        __privateMethod$j(this, _navigateToEdge, navigateToEdge_fn).call(this, key === "Home" ? "first" : "last");
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
                    aria-controls=${`${__privateGet$7(this, _uniqueId)}-content`}
                    aria-label=${this.computedAriaLabel}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    aria-disabled=${this.disabled}
                    @click=${__privateMethod$j(this, _toggleContent, toggleContent_fn)}
                    @keydown=${__privateGet$7(this, _handleKeyDown)}
                >
                    <div class="titleContent" id=${`${__privateGet$7(this, _uniqueId)}-title`}>
                        ${typeof this.itemTitle === "string" ? html`
                                  <mjo-typography class="title" tag="h3" size="heading3" weight="medium">${this.itemTitle}</mjo-typography>
                                  ${this.itemSubtitle ? html`<mjo-typography class="subtitle" tag="p" size="body1" weight="medium"> ${this.itemSubtitle} </mjo-typography>` : nothing}
                              ` : this.itemTitle}
                    </div>
                    <div class="iconContainer">
                        <mjo-icon src=${this.icon}></mjo-icon>
                    </div>
                </div>
                <div class="content" id=${`${__privateGet$7(this, _uniqueId)}-content`} role="region" aria-labelledby=${`${__privateGet$7(this, _uniqueId)}-title`}>
                    <slot></slot>
                </div>
            </div>
        `;
  }
  updated(_changedProperties) {
    if (_changedProperties.has("expanded")) {
      if (this.expanded) {
        __privateMethod$j(this, _openContent, openContent_fn).call(this);
      } else {
        __privateMethod$j(this, _closeContent, closeContent_fn).call(this);
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
  this.dispatchEvent(new CustomEvent("mjo-accordion-toggle", { detail: { item: this, expanded: this.expanded } }));
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
      __privateMethod$j(this, _openContent, openContent_fn).call(this, tries + 1);
    }, 50);
    return;
  }
  const willEvent = new CustomEvent("mjo-accordion-will-expand", {
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
    new CustomEvent("mjo-accordion-expanded", {
      detail: { item: this, expanded: this.expanded }
    })
  );
};
_closeContent = /* @__PURE__ */ new WeakSet();
closeContent_fn = async function() {
  const willEvent = new CustomEvent("mjo-accordion-will-collapse", {
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
    new CustomEvent("mjo-accordion-collapsed", {
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
__decorateClass$s([
  property({ type: String })
], MjoAccordionItem.prototype, "itemTitle", 2);
__decorateClass$s([
  property({ type: String })
], MjoAccordionItem.prototype, "itemSubtitle", 2);
__decorateClass$s([
  property({ type: Boolean })
], MjoAccordionItem.prototype, "expanded", 2);
__decorateClass$s([
  property({ type: Boolean })
], MjoAccordionItem.prototype, "disabled", 2);
__decorateClass$s([
  property({ type: Boolean })
], MjoAccordionItem.prototype, "compact", 2);
__decorateClass$s([
  property({ type: String })
], MjoAccordionItem.prototype, "icon", 2);
__decorateClass$s([
  property({ type: Number })
], MjoAccordionItem.prototype, "animationDuration", 2);
__decorateClass$s([
  property({ type: String })
], MjoAccordionItem.prototype, "animationEasing", 2);
__decorateClass$s([
  property({ type: String, attribute: "aria-describedby" })
], MjoAccordionItem.prototype, "ariaDescribedby", 2);
__decorateClass$s([
  state()
], MjoAccordionItem.prototype, "variant", 2);
__decorateClass$s([
  query(".container")
], MjoAccordionItem.prototype, "containerEl", 2);
__decorateClass$s([
  query(".content")
], MjoAccordionItem.prototype, "contentEl", 2);
__decorateClass$s([
  query(".iconContainer mjo-icon")
], MjoAccordionItem.prototype, "iconEl", 2);
__decorateClass$s([
  query(".titleContainer")
], MjoAccordionItem.prototype, "titleContainerEl", 2);
MjoAccordionItem = __decorateClass$s([
  customElement("mjo-accordion-item")
], MjoAccordionItem);
var __defProp$r = Object.defineProperty;
var __getOwnPropDesc$r = Object.getOwnPropertyDescriptor;
var __decorateClass$r = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$r(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$r(target, key, result);
  return result;
};
var __accessCheck$j = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$6 = (obj, member, getter) => {
  __accessCheck$j(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$j = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$i = (obj, member, method) => {
  __accessCheck$j(obj, member, "access private method");
  return method;
};
var _handleToggle, _mount, mount_fn;
let MjoAccordion = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$j(this, _mount);
    this.variant = "light";
    this.selectionMode = "single";
    this.compact = false;
    this.items = [];
    __privateAdd$j(this, _handleToggle, (event) => {
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
        new CustomEvent("mjo-accordion-toggle", {
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
    __privateMethod$i(this, _mount, mount_fn).call(this);
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
    item.addEventListener("mjo-accordion-toggle", __privateGet$6(this, _handleToggle));
    item.addEventListener("mjo-accordion-will-expand", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("mjo-accordion-will-expand", {
          detail: { ...customEvent.detail, accordion: this },
          cancelable: true,
          bubbles: true,
          composed: true
        })
      );
    });
    item.addEventListener("mjo-accordion-expanded", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("mjo-accordion-expanded", {
          detail: { ...customEvent.detail, accordion: this },
          bubbles: true,
          composed: true
        })
      );
    });
    item.addEventListener("mjo-accordion-will-collapse", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("mjo-accordion-will-collapse", {
          detail: { ...customEvent.detail, accordion: this },
          cancelable: true,
          bubbles: true,
          composed: true
        })
      );
    });
    item.addEventListener("mjo-accordion-collapsed", (event) => {
      const customEvent = event;
      this.dispatchEvent(
        new CustomEvent("mjo-accordion-collapsed", {
          detail: { ...customEvent.detail, accordion: this },
          bubbles: true,
          composed: true
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
__decorateClass$r([
  property({ type: String })
], MjoAccordion.prototype, "variant", 2);
__decorateClass$r([
  property({ type: String })
], MjoAccordion.prototype, "selectionMode", 2);
__decorateClass$r([
  property({ type: Boolean })
], MjoAccordion.prototype, "compact", 2);
__decorateClass$r([
  query(".container")
], MjoAccordion.prototype, "containerEl", 2);
MjoAccordion = __decorateClass$r([
  customElement("mjo-accordion")
], MjoAccordion);
var __defProp$q = Object.defineProperty;
var __getOwnPropDesc$q = Object.getOwnPropertyDescriptor;
var __decorateClass$q = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$q(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$q(target, key, result);
  return result;
};
var __accessCheck$i = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$i = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$h = (obj, member, method) => {
  __accessCheck$i(obj, member, "access private method");
  return method;
};
var _renderCloseButton, renderCloseButton_fn, _handleCloseKeydown$1, handleCloseKeydown_fn$1, _setupAutoClose, setupAutoClose_fn, _clearAutoCloseTimer, clearAutoCloseTimer_fn, _dispatchEvent, dispatchEvent_fn, _show, show_fn, _hide, hide_fn;
let MjoAlert = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$i(this, _renderCloseButton);
    __privateAdd$i(this, _handleCloseKeydown$1);
    __privateAdd$i(this, _setupAutoClose);
    __privateAdd$i(this, _clearAutoCloseTimer);
    __privateAdd$i(this, _dispatchEvent);
    __privateAdd$i(this, _show);
    __privateAdd$i(this, _hide);
    this.type = "info";
    this.size = "medium";
    this.rounded = "medium";
    this.message = "";
    this.detail = "";
    this.closable = false;
    this.hideIcon = false;
    this.ariaLive = "polite";
    this.focusOnShow = false;
    this.autoClose = false;
    this.autoCloseDelay = 5e3;
    this.animation = "fade";
    this.animationDuration = 300;
    this.persistent = false;
    this.icon = "";
    this.autoCloseTimer = null;
    this.storeHeight = 0;
    this.isAnimating = false;
  }
  render() {
    const messageId = `alert-message-${Math.random().toString(36).substring(2, 9)}`;
    const detailId = `alert-detail-${Math.random().toString(36).substring(2, 9)}`;
    const isImportant = this.type === "error" || this.type === "warning";
    return html`
            <div
                class="container"
                data-type=${this.type}
                data-size=${this.size}
                data-rounded=${this.rounded}
                data-animation=${this.animation}
                role="alert"
                aria-live=${isImportant ? "assertive" : this.ariaLive}
                aria-atomic="true"
                aria-labelledby=${messageId}
                aria-describedby=${this.detail ? detailId : nothing}
            >
                <div class="messageContainer">
                    ${!this.hideIcon && this.icon ? html`<div class="icon"><mjo-icon src=${this.icon}></mjo-icon></div>` : nothing}
                    <div class="message" id=${messageId}>${this.message}</div>
                    ${this.closable && !this.persistent ? __privateMethod$h(this, _renderCloseButton, renderCloseButton_fn).call(this) : nothing}
                </div>
                ${this.detail ? html`<div class="detail" id=${detailId} ?data-icon=${!this.hideIcon}>${this.detail}</div>` : nothing}
            </div>
        `;
  }
  updated(_changedProperties) {
    if (_changedProperties.has("type")) {
      if (this.type === "warning") {
        this.icon = AiFillWarning;
      } else if (this.type === "info") {
        this.icon = AiFillInfoCircle;
      } else if (this.type === "error") {
        this.icon = AiFillCloseCircle;
      } else if (this.type === "success") {
        this.icon = AiFillCheckCircle;
      } else {
        this.icon = "";
      }
    }
    if (_changedProperties.has("autoClose") || _changedProperties.has("autoCloseDelay")) {
      __privateMethod$h(this, _setupAutoClose, setupAutoClose_fn).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.autoClose) {
      __privateMethod$h(this, _setupAutoClose, setupAutoClose_fn).call(this);
    }
    if (this.focusOnShow) {
      this.updateComplete.then(() => {
        this.focus();
      });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    __privateMethod$h(this, _clearAutoCloseTimer, clearAutoCloseTimer_fn).call(this);
  }
  show() {
    if (this.autoClose) {
      __privateMethod$h(this, _setupAutoClose, setupAutoClose_fn).call(this);
    }
    __privateMethod$h(this, _show, show_fn).call(this);
  }
  hide() {
    __privateMethod$h(this, _hide, hide_fn).call(this);
  }
  focus() {
    var _a2;
    const closeButton = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".close-button");
    if (closeButton) {
      closeButton.focus();
    } else {
      super.focus();
    }
  }
  announce() {
    var _a2;
    const container = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".container");
    if (container) {
      const currentLive = container.getAttribute("aria-live");
      container.setAttribute("aria-live", "off");
      setTimeout(() => {
        container.setAttribute("aria-live", currentLive || this.ariaLive);
      }, 100);
    }
  }
};
_renderCloseButton = /* @__PURE__ */ new WeakSet();
renderCloseButton_fn = function() {
  return html`
            <button class="close-button" type="button" aria-label="Close alert" @click=${__privateMethod$h(this, _hide, hide_fn)} @keydown=${__privateMethod$h(this, _handleCloseKeydown$1, handleCloseKeydown_fn$1)}>
                <mjo-icon src=${AiOutlineClose}></mjo-icon>
            </button>
        `;
};
_handleCloseKeydown$1 = /* @__PURE__ */ new WeakSet();
handleCloseKeydown_fn$1 = function(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    __privateMethod$h(this, _hide, hide_fn).call(this);
  }
};
_setupAutoClose = /* @__PURE__ */ new WeakSet();
setupAutoClose_fn = function() {
  __privateMethod$h(this, _clearAutoCloseTimer, clearAutoCloseTimer_fn).call(this);
  if (this.autoClose && this.autoCloseDelay > 0) {
    this.autoCloseTimer = window.setTimeout(() => {
      __privateMethod$h(this, _hide, hide_fn).call(this);
    }, this.autoCloseDelay);
  }
};
_clearAutoCloseTimer = /* @__PURE__ */ new WeakSet();
clearAutoCloseTimer_fn = function() {
  if (this.autoCloseTimer) {
    clearTimeout(this.autoCloseTimer);
    this.autoCloseTimer = null;
  }
};
_dispatchEvent = /* @__PURE__ */ new WeakSet();
dispatchEvent_fn = function(eventName, detail) {
  this.dispatchEvent(
    new CustomEvent(eventName, {
      detail: { element: this, ...detail },
      bubbles: true,
      composed: true
    })
  );
};
_show = /* @__PURE__ */ new WeakSet();
show_fn = function() {
  var _a2;
  const container = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".container");
  if (!container || container.offsetHeight > 0 || this.isAnimating)
    return;
  __privateMethod$h(this, _dispatchEvent, dispatchEvent_fn).call(this, "mjo-alert-will-show");
  if (this.autoClose) {
    __privateMethod$h(this, _setupAutoClose, setupAutoClose_fn).call(this);
  }
  if (this.animation === "none") {
    this.style.display = "block";
    __privateMethod$h(this, _dispatchEvent, dispatchEvent_fn).call(this, "mjo-alert-show");
    return;
  }
  this.isAnimating = true;
  let animate = null;
  switch (this.animation) {
    case "fade":
      animate = container.animate(
        [
          { opacity: 0, height: "0", display: "none" },
          { opacity: 1, height: this.storeHeight + "px", display: "block" }
        ],
        {
          duration: this.animationDuration,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
      break;
    case "slide":
      animate = container.animate(
        [
          { transform: "translateX(-100%)", opacity: 0, height: "0", display: "none" },
          {
            transform: "translateX(0)",
            opacity: 1,
            height: this.storeHeight + "px",
            display: "block"
          }
        ],
        {
          duration: this.animationDuration,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
      break;
    case "scale":
      animate = container.animate(
        [
          { transform: "scale(0)", opacity: 0, height: "0", display: "none" },
          {
            transform: "scale(1)",
            opacity: 1,
            height: this.storeHeight + "px",
            display: "block"
          }
        ],
        {
          duration: this.animationDuration,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
      break;
  }
  animate.finished.then(() => {
    __privateMethod$h(this, _dispatchEvent, dispatchEvent_fn).call(this, "mjo-alert-show");
    if (animate)
      animate.cancel();
    this.isAnimating = false;
  });
};
_hide = /* @__PURE__ */ new WeakSet();
hide_fn = function() {
  var _a2, _b2;
  const container = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".container");
  if (!container || container.offsetHeight === 0 || this.isAnimating)
    return;
  __privateMethod$h(this, _dispatchEvent, dispatchEvent_fn).call(this, "mjo-alert-will-close");
  __privateMethod$h(this, _clearAutoCloseTimer, clearAutoCloseTimer_fn).call(this);
  const activeElement = document.activeElement;
  const shouldRestoreFocus = ((_b2 = this.shadowRoot) == null ? void 0 : _b2.contains(activeElement)) || this === activeElement;
  if (this.animation === "none") {
    this.style.display = "none";
    __privateMethod$h(this, _dispatchEvent, dispatchEvent_fn).call(this, "mjo-alert-closed");
    return;
  }
  this.isAnimating = true;
  this.storeHeight = container.offsetHeight;
  let animate = null;
  switch (this.animation) {
    case "fade":
      animate = container.animate(
        [
          { opacity: 1, height: this.storeHeight + "px" },
          { opacity: 0, height: "0", display: "none" }
        ],
        {
          duration: this.animationDuration,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
      break;
    case "slide":
      animate = container.animate(
        [
          {
            transform: "translateX(0)",
            opacity: 1,
            height: this.storeHeight + "px"
          },
          { transform: "translateX(-100%)", opacity: 0, height: "0", display: "none" }
        ],
        {
          duration: this.animationDuration,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
      break;
    case "scale":
      animate = container.animate(
        [
          {
            transform: "scale(1)",
            opacity: 1,
            height: this.storeHeight + "px"
          },
          { transform: "scale(0)", opacity: 0, height: "0", display: "none" }
        ],
        {
          duration: this.animationDuration,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
      break;
  }
  animate == null ? void 0 : animate.finished.then(() => {
    if (shouldRestoreFocus) {
      const nextFocusable = this.nextElementSibling || this.previousElementSibling || this.parentElement;
      if (nextFocusable && nextFocusable instanceof HTMLElement) {
        nextFocusable.focus();
      }
    }
    this.isAnimating = false;
    __privateMethod$h(this, _dispatchEvent, dispatchEvent_fn).call(this, "mjo-alert-closed");
  });
};
MjoAlert.styles = [
  css`
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
        `
];
__decorateClass$q([
  property({ type: String })
], MjoAlert.prototype, "type", 2);
__decorateClass$q([
  property({ type: String })
], MjoAlert.prototype, "size", 2);
__decorateClass$q([
  property({ type: String })
], MjoAlert.prototype, "rounded", 2);
__decorateClass$q([
  property({ type: String })
], MjoAlert.prototype, "message", 2);
__decorateClass$q([
  property({ type: String })
], MjoAlert.prototype, "detail", 2);
__decorateClass$q([
  property({ type: Boolean })
], MjoAlert.prototype, "closable", 2);
__decorateClass$q([
  property({ type: Boolean })
], MjoAlert.prototype, "hideIcon", 2);
__decorateClass$q([
  property({ type: String })
], MjoAlert.prototype, "ariaLive", 2);
__decorateClass$q([
  property({ type: Boolean })
], MjoAlert.prototype, "focusOnShow", 2);
__decorateClass$q([
  property({ type: Boolean })
], MjoAlert.prototype, "autoClose", 2);
__decorateClass$q([
  property({ type: Number })
], MjoAlert.prototype, "autoCloseDelay", 2);
__decorateClass$q([
  property({ type: String })
], MjoAlert.prototype, "animation", 2);
__decorateClass$q([
  property({ type: Number })
], MjoAlert.prototype, "animationDuration", 2);
__decorateClass$q([
  property({ type: Boolean })
], MjoAlert.prototype, "persistent", 2);
__decorateClass$q([
  state()
], MjoAlert.prototype, "icon", 2);
__decorateClass$q([
  state()
], MjoAlert.prototype, "autoCloseTimer", 2);
MjoAlert = __decorateClass$q([
  customElement("mjo-alert")
], MjoAlert);
var __defProp$p = Object.defineProperty;
var __getOwnPropDesc$p = Object.getOwnPropertyDescriptor;
var __decorateClass$p = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$p(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$p(target, key, result);
  return result;
};
var __accessCheck$h = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$h = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$g = (obj, member, method) => {
  __accessCheck$h(obj, member, "access private method");
  return method;
};
var _colorByInitial, colorByInitial_fn, _handleKeydown$5, handleKeydown_fn$5, _handleClick$3, handleClick_fn$3, _handleError, handleError_fn;
let MjoAvatar = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$h(this, _colorByInitial);
    __privateAdd$h(this, _handleKeydown$5);
    __privateAdd$h(this, _handleClick$3);
    __privateAdd$h(this, _handleError);
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
            @click=${__privateMethod$g(this, _handleClick$3, handleClick_fn$3)}
            @keydown=${__privateMethod$g(this, _handleKeydown$5, handleKeydown_fn$5)}
        >
            ${this.src && !this.error ? html`<div class="image radius-${this.radius}">
                      <img src=${this.src} alt=${ifDefined(this.alt || this.name)} @error=${__privateMethod$g(this, _handleError, handleError_fn)} />
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
      const [bg, fg] = __privateMethod$g(this, _colorByInitial, colorByInitial_fn).call(this);
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
_handleKeydown$5 = /* @__PURE__ */ new WeakSet();
handleKeydown_fn$5 = function(event) {
  if (!this.clickable || this.disabled)
    return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    __privateMethod$g(this, _handleClick$3, handleClick_fn$3).call(this);
  }
};
_handleClick$3 = /* @__PURE__ */ new WeakSet();
handleClick_fn$3 = async function() {
  if (!this.clickable || this.disabled)
    return;
  this.dispatchEvent(new CustomEvent("mjo-avatar-click", { detail: { value: this.value || this.name || "" } }));
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
    new CustomEvent("mjo-avatar-error", {
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
__decorateClass$p([
  property({ type: Boolean })
], MjoAvatar.prototype, "bordered", 2);
__decorateClass$p([
  property({ type: Boolean })
], MjoAvatar.prototype, "disabled", 2);
__decorateClass$p([
  property({ type: Boolean })
], MjoAvatar.prototype, "clickable", 2);
__decorateClass$p([
  property({ type: Boolean })
], MjoAvatar.prototype, "nameColoured", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "fallbackIcon", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "alt", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "color", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "name", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "radius", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "size", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "src", 2);
__decorateClass$p([
  property({ type: String })
], MjoAvatar.prototype, "value", 2);
__decorateClass$p([
  property({ type: String, attribute: "aria-describedby" })
], MjoAvatar.prototype, "ariaDescribedby", 2);
__decorateClass$p([
  state()
], MjoAvatar.prototype, "error", 2);
__decorateClass$p([
  query(".container")
], MjoAvatar.prototype, "container", 2);
MjoAvatar = __decorateClass$p([
  customElement("mjo-avatar")
], MjoAvatar);
const searchClosestElement = (element, selector) => {
  var _a2;
  let parent = element.parentElement || element.getRootNode().host;
  let el = querySelectorShadowRoot(selector, parent);
  if (el) {
    return el;
  }
  while (parent) {
    if (parent.tagName === selector.toUpperCase()) {
      return parent;
    }
    parent = parent.parentElement || ((_a2 = parent.getRootNode()) == null ? void 0 : _a2.host);
    if (parent == null ? void 0 : parent.shadowRoot) {
      el = querySelectorShadowRoot(selector, parent);
      if (el) {
        return el;
      }
    }
  }
  return null;
};
const querySelectorShadowRoot = (selector, element) => {
  if (element == null ? void 0 : element.shadowRoot) {
    return element.shadowRoot.querySelector(selector);
  }
  return null;
};
var __defProp$o = Object.defineProperty;
var __getOwnPropDesc$o = Object.getOwnPropertyDescriptor;
var __decorateClass$o = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$o(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$o(target, key, result);
  return result;
};
const FormMixin = (superClass) => {
  var _getForm, getForm_fn, _onFormdata, onFormdata_fn;
  class FormClass extends superClass {
    constructor() {
      super(...arguments);
      __privateAdd(this, _getForm);
      __privateAdd(this, _onFormdata);
      this.formIgnore = false;
      this.form = null;
      this.mjoForm = null;
      this.listenersFormMixin = {
        formData: (ev) => {
          __privateMethod(this, _onFormdata, onFormdata_fn).call(this, ev);
        }
      };
    }
    firstUpdated() {
      __privateMethod(this, _getForm, getForm_fn).call(this);
    }
    disconnectedCallback() {
      var _a2;
      super.disconnectedCallback();
      (_a2 = this.form) == null ? void 0 : _a2.removeEventListener("formdata", this.listenersFormMixin.formData);
    }
    updateFormData({ name, value }) {
      if (!name)
        return;
      this.dataFormMixin = { name, value };
    }
    submiForm() {
      if (!this.form)
        return;
      new FormData(this.form);
      this.form.dispatchEvent(new SubmitEvent("submit", { cancelable: true, bubbles: true }));
    }
  }
  _getForm = new WeakSet();
  getForm_fn = function() {
    var _a2, _b2, _c, _d;
    this.form = searchClosestElement(this, "form");
    (_a2 = this.form) == null ? void 0 : _a2.addEventListener("formdata", this.listenersFormMixin.formData);
    if (this.formIgnore)
      return;
    this.mjoForm = (_c = (_b2 = this.form) == null ? void 0 : _b2.parentNode) == null ? void 0 : _c.host;
    if (((_d = this.mjoForm) == null ? void 0 : _d.tagName) === "MJO-FORM") {
      if (this.tagName === "MJO-BUTTON" && this.type === "submit") {
        this.mjoForm.submitButton = this;
      } else {
        this.mjoForm.elements.push(this);
      }
    }
  };
  _onFormdata = new WeakSet();
  onFormdata_fn = function(ev) {
    if (!this.dataFormMixin)
      return;
    ev.formData.set(this.dataFormMixin.name, this.dataFormMixin.value);
  };
  __decorateClass$o([
    property({ type: Boolean })
  ], FormClass.prototype, "isemail", 2);
  __decorateClass$o([
    property({ type: Boolean })
  ], FormClass.prototype, "isurl", 2);
  __decorateClass$o([
    property({ type: Boolean })
  ], FormClass.prototype, "required", 2);
  __decorateClass$o([
    property({ type: Boolean })
  ], FormClass.prototype, "nospaces", 2);
  __decorateClass$o([
    property({ type: Array })
  ], FormClass.prototype, "rangelength", 2);
  __decorateClass$o([
    property({ type: Boolean })
  ], FormClass.prototype, "isnumber", 2);
  __decorateClass$o([
    property({ type: Array })
  ], FormClass.prototype, "range", 2);
  __decorateClass$o([
    property({ type: Array })
  ], FormClass.prototype, "domains", 2);
  __decorateClass$o([
    property({ type: String })
  ], FormClass.prototype, "isdate", 2);
  __decorateClass$o([
    property({ type: Boolean })
  ], FormClass.prototype, "dateprevious", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "minage", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "maxage", 2);
  __decorateClass$o([
    property({ type: String })
  ], FormClass.prototype, "security", 2);
  __decorateClass$o([
    property({ type: String })
  ], FormClass.prototype, "equalto", 2);
  __decorateClass$o([
    property({ type: Boolean })
  ], FormClass.prototype, "phonenumber", 2);
  __decorateClass$o([
    property({ type: Array })
  ], FormClass.prototype, "phonecountry", 2);
  __decorateClass$o([
    property({ type: String })
  ], FormClass.prototype, "pattern", 2);
  __decorateClass$o([
    property({ type: Array })
  ], FormClass.prototype, "allowed", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "mincheck", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "maxcheck", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "max", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "min", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "maxlength", 2);
  __decorateClass$o([
    property({ type: Number })
  ], FormClass.prototype, "minlength", 2);
  __decorateClass$o([
    property({ type: Boolean, attribute: "form-ignore" })
  ], FormClass.prototype, "formIgnore", 2);
  return FormClass;
};
var __defProp$n = Object.defineProperty;
var __getOwnPropDesc$n = Object.getOwnPropertyDescriptor;
var __decorateClass$n = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$n(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$n(target, key, result);
  return result;
};
let MjoRipple = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    this.handleClick = (ev) => {
      var _a2;
      const x = ev.offsetX;
      const y = ev.offsetY;
      const ripples = document.createElement("span");
      ripples.style.left = `${x}px`;
      ripples.style.top = `${y}px`;
      const container = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("div.container");
      container.removeAttribute("hidden");
      container.appendChild(ripples);
      setTimeout(() => {
        ripples.remove();
      }, 800);
      clearTimeout(this.timeoutRipple);
      this.timeoutRipple = setTimeout(() => {
        container.setAttribute("hidden", "");
      }, 850);
    };
  }
  render() {
    return html`<div class="container" hidden></div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.parent = this.parentElement;
    this.parent.addEventListener("click", this.handleClick);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this.parent) == null ? void 0 : _a2.removeEventListener("click", this.handleClick);
  }
};
MjoRipple.styles = [
  css`
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
        `
];
MjoRipple = __decorateClass$n([
  customElement("mjo-ripple")
], MjoRipple);
var __defProp$m = Object.defineProperty;
var __getOwnPropDesc$m = Object.getOwnPropertyDescriptor;
var __decorateClass$m = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$m(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$m(target, key, result);
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
__decorateClass$m([
  property({ type: String })
], MjoTypography.prototype, "tag", 2);
__decorateClass$m([
  property({ type: String })
], MjoTypography.prototype, "size", 2);
__decorateClass$m([
  property({ type: String })
], MjoTypography.prototype, "weight", 2);
MjoTypography = __decorateClass$m([
  customElement("mjo-typography")
], MjoTypography);
var __defProp$l = Object.defineProperty;
var __getOwnPropDesc$l = Object.getOwnPropertyDescriptor;
var __decorateClass$l = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$l(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$l(target, key, result);
  return result;
};
var __accessCheck$g = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$g = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$f = (obj, member, method) => {
  __accessCheck$g(obj, member, "access private method");
  return method;
};
var _handleClick$2, handleClick_fn$2, _dispatchClickEvent, dispatchClickEvent_fn, _dispatchToggleEvent, dispatchToggleEvent_fn, _dispatchLoadingChangeEvent, dispatchLoadingChangeEvent_fn;
let MjoButton = class extends ThemeMixin(FormMixin(LitElement)) {
  constructor() {
    super(...arguments);
    __privateAdd$g(this, _handleClick$2);
    __privateAdd$g(this, _dispatchClickEvent);
    __privateAdd$g(this, _dispatchToggleEvent);
    __privateAdd$g(this, _dispatchLoadingChangeEvent);
    this.fullwidth = false;
    this.disabled = false;
    this.loading = false;
    this.rounded = false;
    this.toggleable = false;
    this.smallCaps = false;
    this.noink = false;
    this.size = "medium";
    this.color = "primary";
    this.variant = "default";
    this.type = "button";
    this.toggle = false;
  }
  render() {
    const ariaBusy = this.loading ? "true" : "false";
    const ariaPressed = this.toggleable ? this.toggle ? "true" : "false" : void 0;
    return html`<button
            type=${this.type}
            data-color=${this.color}
            data-variant=${this.variant}
            data-size=${this.size}
            ?data-rounded=${this.rounded}
            ?data-toggle=${this.toggle}
            ?data-small-caps=${this.smallCaps}
            aria-busy=${ariaBusy}
            aria-pressed=${ifDefined(ariaPressed)}
            aria-label=${ifDefined(this.buttonLabel)}
            aria-describedby=${ifDefined(this.describedBy)}
            ?disabled=${this.disabled || this.loading}
            @click=${__privateMethod$f(this, _handleClick$2, handleClick_fn$2)}
        >
            ${this.startIcon && html` <mjo-icon src=${this.startIcon}></mjo-icon>`}
            <mjo-typography tag="none"><slot></slot></mjo-typography>
            ${this.endIcon && html` <mjo-icon src=${this.endIcon}></mjo-icon>`}
            ${!this.noink && !this.disabled && !this.loading ? html`<mjo-ripple></mjo-ripple>` : nothing}
            ${this.loading ? html`<div class="loading" aria-hidden="true"></div>` : nothing}
        </button>`;
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if ((this.disabled || this.loading) && this.toggle) {
      this.toggle = false;
    }
    if (_changedProperties.has("loading")) {
      __privateMethod$f(this, _dispatchLoadingChangeEvent, dispatchLoadingChangeEvent_fn).call(this);
    }
    if (_changedProperties.has("toggle") && this.toggleable) {
      __privateMethod$f(this, _dispatchToggleEvent, dispatchToggleEvent_fn).call(this, _changedProperties.get("toggle"));
    }
  }
  /**
   * Sets focus to the button
   */
  focus(options) {
    var _a2;
    const button = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("button");
    button == null ? void 0 : button.focus(options);
  }
  /**
   * Removes focus from the button
   */
  blur() {
    var _a2;
    const button = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("button");
    button == null ? void 0 : button.blur();
  }
  /**
   * Simulates a click on the button
   */
  click() {
    var _a2;
    const button = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("button");
    button == null ? void 0 : button.click();
  }
  /**
   * Sets the button as busy/loading
   */
  setLoading(loading) {
    this.loading = loading;
  }
  /**
   * Toggles the button pressed state (only works if toggleable is true)
   */
  togglePressed() {
    if (this.toggleable && !this.disabled && !this.loading) {
      this.toggle = !this.toggle;
    }
  }
};
_handleClick$2 = /* @__PURE__ */ new WeakSet();
handleClick_fn$2 = function(event) {
  if (this.disabled || this.loading) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (this.toggleable && this.type === "button") {
    this.toggle = !this.toggle;
  }
  if (this.form && this.type === "submit") {
    this.submiForm();
  }
  __privateMethod$f(this, _dispatchClickEvent, dispatchClickEvent_fn).call(this, event);
};
_dispatchClickEvent = /* @__PURE__ */ new WeakSet();
dispatchClickEvent_fn = function(originalEvent) {
  const clickEvent = new CustomEvent("mjo-button-click", {
    detail: {
      element: this,
      toggle: this.toggle,
      originalEvent
    },
    bubbles: true,
    composed: true
  });
  this.dispatchEvent(clickEvent);
};
_dispatchToggleEvent = /* @__PURE__ */ new WeakSet();
dispatchToggleEvent_fn = function(previousState) {
  const toggleEvent = new CustomEvent("mjo-button-toggle", {
    detail: {
      element: this,
      pressed: this.toggle,
      previousState
    },
    bubbles: true,
    composed: true
  });
  this.dispatchEvent(toggleEvent);
};
_dispatchLoadingChangeEvent = /* @__PURE__ */ new WeakSet();
dispatchLoadingChangeEvent_fn = function() {
  const loadingEvent = new CustomEvent("mjo-button-loading-change", {
    detail: {
      element: this,
      loading: this.loading
    },
    bubbles: true,
    composed: true
  });
  this.dispatchEvent(loadingEvent);
};
MjoButton.styles = [
  css`
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
        `
];
__decorateClass$l([
  property({ type: Boolean, reflect: true })
], MjoButton.prototype, "fullwidth", 2);
__decorateClass$l([
  property({ type: Boolean, reflect: true })
], MjoButton.prototype, "disabled", 2);
__decorateClass$l([
  property({ type: Boolean, reflect: true })
], MjoButton.prototype, "loading", 2);
__decorateClass$l([
  property({ type: Boolean, reflect: true })
], MjoButton.prototype, "rounded", 2);
__decorateClass$l([
  property({ type: Boolean })
], MjoButton.prototype, "toggleable", 2);
__decorateClass$l([
  property({ type: Boolean })
], MjoButton.prototype, "smallCaps", 2);
__decorateClass$l([
  property({ type: Boolean })
], MjoButton.prototype, "noink", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "startIcon", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "endIcon", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "size", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "color", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "variant", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "type", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "buttonLabel", 2);
__decorateClass$l([
  property({ type: String })
], MjoButton.prototype, "describedBy", 2);
__decorateClass$l([
  state()
], MjoButton.prototype, "toggle", 2);
MjoButton = __decorateClass$l([
  customElement("mjo-button")
], MjoButton);
const locales = {
  en: {
    search: "Search...",
    calendar: {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    }
  },
  es: {
    search: "Buscar...",
    calendar: {
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      weekdaysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      weekdaysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"]
    }
  },
  fr: {
    search: "Rechercher...",
    calendar: {
      months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
      weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      weekdaysMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]
    }
  },
  pt: {
    search: "Pesquisar...",
    calendar: {
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      weekdays: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
      weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      weekdaysMin: ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sá"]
    }
  },
  it: {
    search: "Cerca...",
    calendar: {
      months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
      weekdays: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      weekdaysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      weekdaysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"]
    }
  },
  de: {
    search: "Suchen...",
    calendar: {
      months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
      weekdays: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      weekdaysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      weekdaysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
    }
  },
  nl: {
    search: "Zoeken...",
    calendar: {
      months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
      monthsShort: ["Jan", "Feb", "Maa", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
      weekdays: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
      weekdaysShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
      weekdaysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"]
    }
  },
  bg: {
    search: "Търсене...",
    calendar: {
      months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
      monthsShort: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
      weekdays: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"],
      weekdaysShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб"],
      weekdaysMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Съ"]
    }
  },
  sr: {
    search: "Претрага...",
    calendar: {
      months: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
      monthsShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
      weekdays: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"],
      weekdaysShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"],
      weekdaysMin: ["Не", "По", "Ут", "Ср", "Че", "Пе", "Су"]
    }
  },
  ru: {
    search: "Поиск...",
    calendar: {
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      weekdaysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
    }
  },
  zh: {
    search: "搜索...",
    calendar: {
      months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      weekdaysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"]
    }
  },
  ja: {
    search: "検索...",
    calendar: {
      months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
      weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
      weekdaysMin: ["日", "月", "火", "水", "木", "金", "土"]
    }
  },
  ko: {
    search: "검색...",
    calendar: {
      months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
      weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
      weekdaysMin: ["일", "월", "화", "수", "목", "금", "토"]
    }
  },
  tr: {
    search: "Arama...",
    calendar: {
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
      weekdays: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
      weekdaysShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
      weekdaysMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"]
    }
  },
  pl: {
    search: "Szukaj...",
    calendar: {
      months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
      monthsShort: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
      weekdays: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
      weekdaysShort: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"],
      weekdaysMin: ["Ni", "Po", "Wt", "Śr", "Cz", "Pi", "So"]
    }
  }
};
class CalendarUtils {
  static isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  }
  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  static getDateLocale(locale) {
    const localeMap = {
      en: "en-US",
      es: "es-ES",
      fr: "fr-FR",
      pt: "pt-PT",
      it: "it-IT",
      de: "de-DE",
      nl: "nl-NL",
      bg: "bg-BG",
      sr: "sr-RS",
      ru: "ru-RU",
      zh: "zh-CN",
      ja: "ja-JP",
      ko: "ko-KR",
      tr: "tr-TR",
      pl: "pl-PL"
    };
    return localeMap[locale] || "en-US";
  }
  static isDateDisabled(date, disabled, minDate, maxDate, disabledDates) {
    if (disabled)
      return true;
    if (minDate) {
      const min = new Date(minDate);
      min.setDate(min.getDate() - 1);
      if (date < min)
        return true;
    }
    if (maxDate) {
      const max = new Date(maxDate);
      if (date > max)
        return true;
    }
    if (disabledDates) {
      const dateStr = CalendarUtils.formatDate(date);
      return disabledDates.includes(dateStr);
    }
    return false;
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ClassMapDirective extends Directive {
  constructor(partInfo) {
    var _a2;
    super(partInfo);
    if (partInfo.type !== PartType.ATTRIBUTE || partInfo.name !== "class" || ((_a2 = partInfo.strings) == null ? void 0 : _a2.length) > 2) {
      throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
  }
  render(classInfo) {
    return " " + Object.keys(classInfo).filter((key) => classInfo[key]).join(" ") + " ";
  }
  update(part, [classInfo]) {
    var _a2, _b2;
    if (this._previousClasses === void 0) {
      this._previousClasses = /* @__PURE__ */ new Set();
      if (part.strings !== void 0) {
        this._staticClasses = new Set(part.strings.join(" ").split(/\s/).filter((s) => s !== ""));
      }
      for (const name in classInfo) {
        if (classInfo[name] && !((_a2 = this._staticClasses) == null ? void 0 : _a2.has(name))) {
          this._previousClasses.add(name);
        }
      }
      return this.render(classInfo);
    }
    const classList = part.element.classList;
    for (const name of this._previousClasses) {
      if (!(name in classInfo)) {
        classList.remove(name);
        this._previousClasses.delete(name);
      }
    }
    for (const name in classInfo) {
      const value = !!classInfo[name];
      if (value !== this._previousClasses.has(name) && !((_b2 = this._staticClasses) == null ? void 0 : _b2.has(name))) {
        if (value) {
          classList.add(name);
          this._previousClasses.add(name);
        } else {
          classList.remove(name);
          this._previousClasses.delete(name);
        }
      }
    }
    return noChange;
  }
}
const classMap = directive(ClassMapDirective);
var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$k(target, key, result);
  return result;
};
var __accessCheck$f = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$f = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$e = (obj, member, method) => {
  __accessCheck$f(obj, member, "access private method");
  return method;
};
var _handleClick$1, handleClick_fn$1, _handleMouseEnter, handleMouseEnter_fn, _handleMouseLeave, handleMouseLeave_fn;
let CalendarDay = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$f(this, _handleClick$1);
    __privateAdd$f(this, _handleMouseEnter);
    __privateAdd$f(this, _handleMouseLeave);
    this.isEmpty = false;
    this.isToday = false;
    this.isSelected = false;
    this.isInRange = false;
    this.isRangeStart = false;
    this.isRangeEnd = false;
    this.isDisabled = false;
    this.isHovered = false;
    this.isFocused = false;
    this.showToday = true;
    this.size = "medium";
  }
  get dateLabel() {
    if (this.isEmpty || !this.month || !this.year)
      return "";
    const date = new Date(this.year, this.month, this.day);
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let label = formatter.format(date);
    if (this.isToday)
      label += ", Today";
    if (this.isSelected)
      label += ", Selected";
    if (this.isRangeStart)
      label += ", Range start";
    if (this.isRangeEnd)
      label += ", Range end";
    if (this.isInRange)
      label += ", In selected range";
    if (this.isDisabled)
      label += ", Disabled";
    return label;
  }
  render() {
    if (this.isEmpty) {
      return html`<div class="day empty" role="gridcell"></div>`;
    }
    const dayClasses = {
      day: true,
      today: this.isToday && this.showToday,
      selected: this.isSelected,
      "in-range": this.isInRange,
      "range-start": this.isRangeStart,
      "range-end": this.isRangeEnd,
      disabled: this.isDisabled,
      "hovered-range": this.isHovered,
      focused: this.isFocused
    };
    return html`
            <div
                class=${classMap(dayClasses)}
                part="day ${this.isSelected ? "selected" : ""} ${this.isToday ? "today" : ""}"
                role="gridcell"
                aria-label=${this.dateLabel}
                aria-selected=${this.isSelected ? "true" : "false"}
                aria-current=${this.isToday ? "date" : "false"}
                aria-disabled=${this.isDisabled ? "true" : "false"}
                tabindex=${this.isFocused ? 0 : -1}
                @click=${__privateMethod$e(this, _handleClick$1, handleClick_fn$1)}
                @mouseenter=${__privateMethod$e(this, _handleMouseEnter, handleMouseEnter_fn)}
                @mouseleave=${__privateMethod$e(this, _handleMouseLeave, handleMouseLeave_fn)}
            >
                <mjo-typography tag="none">${this.day}</mjo-typography>
            </div>
        `;
  }
};
_handleClick$1 = /* @__PURE__ */ new WeakSet();
handleClick_fn$1 = function() {
  if (this.isDisabled)
    return;
  this.dispatchEvent(
    new CustomEvent("day-click", {
      detail: { day: this.day },
      bubbles: true,
      composed: true
    })
  );
};
_handleMouseEnter = /* @__PURE__ */ new WeakSet();
handleMouseEnter_fn = function() {
  if (this.isDisabled)
    return;
  this.dispatchEvent(
    new CustomEvent("day-hover", {
      detail: { day: this.day },
      bubbles: true,
      composed: true
    })
  );
};
_handleMouseLeave = /* @__PURE__ */ new WeakSet();
handleMouseLeave_fn = function() {
  this.dispatchEvent(
    new CustomEvent("day-leave", {
      detail: { day: this.day },
      bubbles: true,
      composed: true
    })
  );
};
CalendarDay.styles = css`
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
    `;
__decorateClass$k([
  property({ type: Number })
], CalendarDay.prototype, "day", 2);
__decorateClass$k([
  property({ type: Number })
], CalendarDay.prototype, "month", 2);
__decorateClass$k([
  property({ type: Number })
], CalendarDay.prototype, "year", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isEmpty", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isToday", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isSelected", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isInRange", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isRangeStart", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isRangeEnd", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isDisabled", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isHovered", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "isFocused", 2);
__decorateClass$k([
  property({ type: Boolean })
], CalendarDay.prototype, "showToday", 2);
__decorateClass$k([
  property({ type: String })
], CalendarDay.prototype, "size", 2);
CalendarDay = __decorateClass$k([
  customElement("calendar-day")
], CalendarDay);
var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$j(target, key, result);
  return result;
};
var __accessCheck$e = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$e = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$d = (obj, member, method) => {
  __accessCheck$e(obj, member, "access private method");
  return method;
};
var _handleDayClick, handleDayClick_fn, _handleDayHover, handleDayHover_fn, _handleDayLeave, handleDayLeave_fn, _isSelectedDate, isSelectedDate_fn, _isInRange, isInRange_fn, _isRangeStart, isRangeStart_fn, _isRangeEnd, isRangeEnd_fn, _isHoveredInRange, isHoveredInRange_fn, _isFocusedDate, isFocusedDate_fn;
let CalendarGrid = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$e(this, _handleDayClick);
    __privateAdd$e(this, _handleDayHover);
    __privateAdd$e(this, _handleDayLeave);
    __privateAdd$e(this, _isSelectedDate);
    __privateAdd$e(this, _isInRange);
    __privateAdd$e(this, _isRangeStart);
    __privateAdd$e(this, _isRangeEnd);
    __privateAdd$e(this, _isHoveredInRange);
    __privateAdd$e(this, _isFocusedDate);
    this.side = "single";
    this.firstDayOfWeek = "monday";
    this.mode = "single";
    this.showToday = true;
    this.size = "medium";
    this.disabled = false;
    this.minDate = "";
    this.maxDate = "";
  }
  get gridLabel() {
    return `Calendar grid for ${this.year}-${String(this.month + 1).padStart(2, "0")}`;
  }
  render() {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    const firstDayOfWeek = this.firstDayOfWeek === "monday" ? firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1 : firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const today = /* @__PURE__ */ new Date();
    const safeWeekDays = this.weekDays && Array.isArray(this.weekDays) && this.weekDays.length >= 7 ? this.weekDays : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekDaysAdjusted = this.firstDayOfWeek === "monday" ? [safeWeekDays[1], safeWeekDays[2], safeWeekDays[3], safeWeekDays[4], safeWeekDays[5], safeWeekDays[6], safeWeekDays[0]] : safeWeekDays;
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(html`<calendar-day isEmpty .size=${this.size}></calendar-day>`);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.year, this.month, day);
      const isToday = CalendarUtils.isSameDay(date, today);
      const isSelected = __privateMethod$d(this, _isSelectedDate, isSelectedDate_fn).call(this, date);
      const isInRange = this.mode === "range" && __privateMethod$d(this, _isInRange, isInRange_fn).call(this, date);
      const isRangeStart = this.mode === "range" && __privateMethod$d(this, _isRangeStart, isRangeStart_fn).call(this, date);
      const isRangeEnd = this.mode === "range" && __privateMethod$d(this, _isRangeEnd, isRangeEnd_fn).call(this, date);
      const isDisabled = CalendarUtils.isDateDisabled(date, this.disabled, this.minDate, this.maxDate, this.disabledDates);
      const isHovered = this.mode === "range" && __privateMethod$d(this, _isHoveredInRange, isHoveredInRange_fn).call(this, date);
      days.push(html`
                <calendar-day
                    day=${day}
                    month=${this.month}
                    year=${this.year}
                    ?isToday=${isToday}
                    ?isSelected=${isSelected}
                    ?isInRange=${isInRange}
                    ?isRangeStart=${isRangeStart}
                    ?isRangeEnd=${isRangeEnd}
                    ?isDisabled=${isDisabled}
                    ?isHovered=${isHovered}
                    ?isFocused=${__privateMethod$d(this, _isFocusedDate, isFocusedDate_fn).call(this, date)}
                    ?showToday=${this.showToday}
                    size=${this.size}
                    @day-click=${__privateMethod$d(this, _handleDayClick, handleDayClick_fn)}
                    @day-hover=${__privateMethod$d(this, _handleDayHover, handleDayHover_fn)}
                    @day-leave=${__privateMethod$d(this, _handleDayLeave, handleDayLeave_fn)}
                ></calendar-day>
            `);
    }
    return html`
            <div class="calendar-grid" part="calendar-grid" role="grid" aria-label=${this.gridLabel}>
                <!-- Week day headers -->
                <div class="week-header" role="row">
                    ${weekDaysAdjusted.map(
      (day) => html`
                            <div class="week-day" role="columnheader">
                                <mjo-typography tag="none" size="body1">${day}</mjo-typography>
                            </div>
                        `
    )}
                </div>
                <!-- Days grid -->
                <div class="days-grid">${days}</div>
            </div>
        `;
  }
};
_handleDayClick = /* @__PURE__ */ new WeakSet();
handleDayClick_fn = function(event) {
  const day = event.detail.day;
  const date = new Date(this.year, this.month, day);
  this.dispatchEvent(
    new CustomEvent("date-click", {
      detail: { date, formattedDate: CalendarUtils.formatDate(date) },
      bubbles: true,
      composed: true
    })
  );
};
_handleDayHover = /* @__PURE__ */ new WeakSet();
handleDayHover_fn = function(event) {
  const day = event.detail.day;
  const date = new Date(this.year, this.month, day);
  this.dispatchEvent(
    new CustomEvent("date-hover", {
      detail: { date },
      bubbles: true,
      composed: true
    })
  );
};
_handleDayLeave = /* @__PURE__ */ new WeakSet();
handleDayLeave_fn = function() {
  this.dispatchEvent(
    new CustomEvent("date-leave", {
      bubbles: true,
      composed: true
    })
  );
};
_isSelectedDate = /* @__PURE__ */ new WeakSet();
isSelectedDate_fn = function(date) {
  if (this.mode === "single" && this.selectedDate) {
    return CalendarUtils.isSameDay(date, this.selectedDate);
  }
  return false;
};
_isInRange = /* @__PURE__ */ new WeakSet();
isInRange_fn = function(date) {
  if (!this.selectedStartDate || !this.selectedEndDate)
    return false;
  return date > this.selectedStartDate && date < this.selectedEndDate;
};
_isRangeStart = /* @__PURE__ */ new WeakSet();
isRangeStart_fn = function(date) {
  if (!this.selectedStartDate)
    return false;
  return CalendarUtils.isSameDay(date, this.selectedStartDate);
};
_isRangeEnd = /* @__PURE__ */ new WeakSet();
isRangeEnd_fn = function(date) {
  if (!this.selectedEndDate)
    return false;
  return CalendarUtils.isSameDay(date, this.selectedEndDate);
};
_isHoveredInRange = /* @__PURE__ */ new WeakSet();
isHoveredInRange_fn = function(date) {
  if (!this.selectedStartDate || !this.hoverDate || this.selectedEndDate)
    return false;
  const start = this.selectedStartDate;
  const end = this.hoverDate;
  if (end < start) {
    return date > end && date < start;
  }
  return date > start && date < end;
};
_isFocusedDate = /* @__PURE__ */ new WeakSet();
isFocusedDate_fn = function(date) {
  if (!this.focusedDate)
    return false;
  return CalendarUtils.isSameDay(date, this.focusedDate);
};
CalendarGrid.styles = css`
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
    `;
__decorateClass$j([
  property({ type: Number })
], CalendarGrid.prototype, "month", 2);
__decorateClass$j([
  property({ type: Number })
], CalendarGrid.prototype, "year", 2);
__decorateClass$j([
  property({ type: String })
], CalendarGrid.prototype, "side", 2);
__decorateClass$j([
  property({ type: Array })
], CalendarGrid.prototype, "weekDays", 2);
__decorateClass$j([
  property({ type: String })
], CalendarGrid.prototype, "firstDayOfWeek", 2);
__decorateClass$j([
  property({ type: String })
], CalendarGrid.prototype, "mode", 2);
__decorateClass$j([
  property({ type: Boolean })
], CalendarGrid.prototype, "showToday", 2);
__decorateClass$j([
  property({ type: String })
], CalendarGrid.prototype, "size", 2);
__decorateClass$j([
  property({ type: Boolean })
], CalendarGrid.prototype, "disabled", 2);
__decorateClass$j([
  property({ type: String })
], CalendarGrid.prototype, "minDate", 2);
__decorateClass$j([
  property({ type: String })
], CalendarGrid.prototype, "maxDate", 2);
__decorateClass$j([
  property({ type: Array })
], CalendarGrid.prototype, "disabledDates", 2);
__decorateClass$j([
  property({ type: Object })
], CalendarGrid.prototype, "selectedDate", 2);
__decorateClass$j([
  property({ type: Object })
], CalendarGrid.prototype, "selectedStartDate", 2);
__decorateClass$j([
  property({ type: Object })
], CalendarGrid.prototype, "selectedEndDate", 2);
__decorateClass$j([
  property({ type: Object })
], CalendarGrid.prototype, "hoverDate", 2);
__decorateClass$j([
  property({ type: Object })
], CalendarGrid.prototype, "focusedDate", 2);
CalendarGrid = __decorateClass$j([
  customElement("calendar-grid")
], CalendarGrid);
const FaChevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>`;
const FaChevronRight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>`;
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$i(target, key, result);
  return result;
};
var __accessCheck$d = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$d = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$c = (obj, member, method) => {
  __accessCheck$d(obj, member, "access private method");
  return method;
};
var _handlePrevious, handlePrevious_fn, _handleNext, handleNext_fn, _handleMonthClick, handleMonthClick_fn, _handleYearClick, handleYearClick_fn;
let CalendarHeader = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$d(this, _handlePrevious);
    __privateAdd$d(this, _handleNext);
    __privateAdd$d(this, _handleMonthClick);
    __privateAdd$d(this, _handleYearClick);
    this.side = "single";
    this.disabled = false;
    this.monthPickerOpen = false;
    this.yearPickerOpen = false;
  }
  get previousMonthLabel() {
    if (!this.monthNames || !Array.isArray(this.monthNames) || this.monthNames.length < 12) {
      return "Previous month";
    }
    const prevMonth = new Date(this.year, this.month - 1, 1);
    const monthIndex = prevMonth.getMonth();
    if (monthIndex < 0 || monthIndex >= this.monthNames.length || !this.monthNames[monthIndex]) {
      return "Previous month";
    }
    return `Go to ${this.monthNames[monthIndex]} ${prevMonth.getFullYear()}`;
  }
  get nextMonthLabel() {
    if (!this.monthNames || !Array.isArray(this.monthNames) || this.monthNames.length < 12) {
      return "Next month";
    }
    const nextMonth = new Date(this.year, this.month + 1, 1);
    const monthIndex = nextMonth.getMonth();
    if (monthIndex < 0 || monthIndex >= this.monthNames.length || !this.monthNames[monthIndex]) {
      return "Next month";
    }
    return `Go to ${this.monthNames[monthIndex]} ${nextMonth.getFullYear()}`;
  }
  get currentMonthYearLabel() {
    if (!this.monthNames || !Array.isArray(this.monthNames) || this.monthNames.length < 12) {
      return `Month ${this.month + 1} ${this.year}`;
    }
    if (this.month < 0 || this.month >= this.monthNames.length || !this.monthNames[this.month]) {
      return `Month ${this.month + 1} ${this.year}`;
    }
    return `${this.monthNames[this.month]} ${this.year}`;
  }
  render() {
    return html`
            <div class="calendar-header" part="header" role="banner">
                <div class="navigation" part="navigation" role="toolbar" aria-label="Calendar navigation">
                    ${this.side === "single" || this.side === "left" ? html`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${FaChevronLeft}
                                  @click=${__privateMethod$c(this, _handlePrevious, handlePrevious_fn)}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.previousMonthLabel}
                                  title=${this.previousMonthLabel}
                              ></mjo-button>
                          ` : nothing}

                    <div class="month-year-selectors" part="month-year" role="group" aria-label=${this.currentMonthYearLabel}>
                        <mjo-button
                            variant="text"
                            @click=${__privateMethod$c(this, _handleMonthClick, handleMonthClick_fn)}
                            ?disabled=${this.disabled}
                            aria-label="Select month"
                            aria-expanded=${this.monthPickerOpen ? "true" : "false"}
                        >
                            <mjo-typography tag="none">
                                ${this.monthNames && Array.isArray(this.monthNames) && this.monthNames[this.month] ? this.monthNames[this.month] : `Month ${this.month + 1}`}
                            </mjo-typography>
                        </mjo-button>
                        <mjo-button
                            variant="text"
                            @click=${__privateMethod$c(this, _handleYearClick, handleYearClick_fn)}
                            ?disabled=${this.disabled}
                            aria-label="Select year"
                            aria-expanded=${this.yearPickerOpen ? "true" : "false"}
                        >
                            <mjo-typography tag="none">${this.year}</mjo-typography>
                        </mjo-button>
                    </div>

                    ${this.side === "single" || this.side === "right" ? html`
                              <mjo-button
                                  variant="ghost"
                                  size="small"
                                  rounded
                                  startIcon=${FaChevronRight}
                                  @click=${__privateMethod$c(this, _handleNext, handleNext_fn)}
                                  ?disabled=${this.disabled}
                                  aria-label=${this.nextMonthLabel}
                                  title=${this.nextMonthLabel}
                              ></mjo-button>
                          ` : nothing}
                </div>
            </div>
        `;
  }
};
_handlePrevious = /* @__PURE__ */ new WeakSet();
handlePrevious_fn = function() {
  this.dispatchEvent(
    new CustomEvent("navigate", {
      detail: { direction: -1, side: this.side },
      bubbles: true,
      composed: true
    })
  );
};
_handleNext = /* @__PURE__ */ new WeakSet();
handleNext_fn = function() {
  this.dispatchEvent(
    new CustomEvent("navigate", {
      detail: { direction: 1, side: this.side },
      bubbles: true,
      composed: true
    })
  );
};
_handleMonthClick = /* @__PURE__ */ new WeakSet();
handleMonthClick_fn = function() {
  this.dispatchEvent(
    new CustomEvent("month-picker", {
      detail: { side: this.side },
      bubbles: true,
      composed: true
    })
  );
};
_handleYearClick = /* @__PURE__ */ new WeakSet();
handleYearClick_fn = function() {
  this.dispatchEvent(
    new CustomEvent("year-picker", {
      detail: { side: this.side },
      bubbles: true,
      composed: true
    })
  );
};
CalendarHeader.styles = css`
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
    `;
__decorateClass$i([
  property({ type: Number })
], CalendarHeader.prototype, "month", 2);
__decorateClass$i([
  property({ type: Number })
], CalendarHeader.prototype, "year", 2);
__decorateClass$i([
  property({ type: String })
], CalendarHeader.prototype, "side", 2);
__decorateClass$i([
  property({ type: Array })
], CalendarHeader.prototype, "monthNames", 2);
__decorateClass$i([
  property({ type: Boolean })
], CalendarHeader.prototype, "disabled", 2);
__decorateClass$i([
  property({ type: Boolean })
], CalendarHeader.prototype, "monthPickerOpen", 2);
__decorateClass$i([
  property({ type: Boolean })
], CalendarHeader.prototype, "yearPickerOpen", 2);
CalendarHeader = __decorateClass$i([
  customElement("calendar-header")
], CalendarHeader);
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$h(target, key, result);
  return result;
};
var __accessCheck$c = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$c = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$b = (obj, member, method) => {
  __accessCheck$c(obj, member, "access private method");
  return method;
};
var _selectMonth, selectMonth_fn, _setFocusedMonth, setFocusedMonth_fn, _handleKeydown$4, handleKeydown_fn$4, _moveFocus$1, moveFocus_fn$1;
let CalendarMonthPicker = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$c(this, _selectMonth);
    __privateAdd$c(this, _setFocusedMonth);
    __privateAdd$c(this, _handleKeydown$4);
    __privateAdd$c(this, _moveFocus$1);
    this.selectedMonth = (/* @__PURE__ */ new Date()).getMonth();
    this.monthNames = [];
    this.disabled = false;
    this.focusedMonth = this.selectedMonth;
  }
  render() {
    return html`
            <div class="month-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select month" @keydown=${__privateMethod$b(this, _handleKeydown$4, handleKeydown_fn$4)}>
                <div class="months-grid" role="grid" aria-label="Month selection grid">
                    ${this.monthNames.map(
      (month, index) => html`
                            <button
                                class="month-button"
                                role="gridcell"
                                ?data-selected=${index === this.selectedMonth}
                                ?disabled=${this.disabled}
                                @click=${() => __privateMethod$b(this, _selectMonth, selectMonth_fn).call(this, index)}
                                tabindex=${this.disabled ? -1 : index === this.focusedMonth ? 0 : -1}
                                aria-label=${month}
                                aria-selected=${index === this.selectedMonth ? "true" : "false"}
                                @focus=${() => __privateMethod$b(this, _setFocusedMonth, setFocusedMonth_fn).call(this, index)}
                            >
                                ${month}
                            </button>
                        `
    )}
                </div>
            </div>
        `;
  }
};
_selectMonth = /* @__PURE__ */ new WeakSet();
selectMonth_fn = function(month) {
  if (this.disabled)
    return;
  this.selectedMonth = month;
  this.dispatchEvent(
    new CustomEvent("month-selected", {
      detail: { month },
      bubbles: true,
      composed: true
    })
  );
};
_setFocusedMonth = /* @__PURE__ */ new WeakSet();
setFocusedMonth_fn = function(month) {
  this.focusedMonth = month;
};
_handleKeydown$4 = /* @__PURE__ */ new WeakSet();
handleKeydown_fn$4 = function(event) {
  if (this.disabled)
    return;
  const key = event.key;
  let handled = false;
  switch (key) {
    case "ArrowLeft":
      __privateMethod$b(this, _moveFocus$1, moveFocus_fn$1).call(this, -1);
      handled = true;
      break;
    case "ArrowRight":
      __privateMethod$b(this, _moveFocus$1, moveFocus_fn$1).call(this, 1);
      handled = true;
      break;
    case "ArrowUp":
      __privateMethod$b(this, _moveFocus$1, moveFocus_fn$1).call(this, -3);
      handled = true;
      break;
    case "ArrowDown":
      __privateMethod$b(this, _moveFocus$1, moveFocus_fn$1).call(this, 3);
      handled = true;
      break;
    case "Home":
      __privateMethod$b(this, _setFocusedMonth, setFocusedMonth_fn).call(this, 0);
      handled = true;
      break;
    case "End":
      __privateMethod$b(this, _setFocusedMonth, setFocusedMonth_fn).call(this, 11);
      handled = true;
      break;
    case "Enter":
    case " ":
      __privateMethod$b(this, _selectMonth, selectMonth_fn).call(this, this.focusedMonth);
      handled = true;
      break;
  }
  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
};
_moveFocus$1 = /* @__PURE__ */ new WeakSet();
moveFocus_fn$1 = function(delta) {
  let newFocus = this.focusedMonth + delta;
  if (newFocus < 0)
    newFocus = 11;
  if (newFocus > 11)
    newFocus = 0;
  __privateMethod$b(this, _setFocusedMonth, setFocusedMonth_fn).call(this, newFocus);
  this.updateComplete.then(() => {
    var _a2;
    const buttons = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll("button");
    const targetButton = buttons == null ? void 0 : buttons[this.focusedMonth];
    targetButton == null ? void 0 : targetButton.focus();
  });
};
CalendarMonthPicker.styles = css`
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
    `;
__decorateClass$h([
  property({ type: Number })
], CalendarMonthPicker.prototype, "selectedMonth", 2);
__decorateClass$h([
  property({ type: Array })
], CalendarMonthPicker.prototype, "monthNames", 2);
__decorateClass$h([
  property({ type: Boolean })
], CalendarMonthPicker.prototype, "disabled", 2);
__decorateClass$h([
  state()
], CalendarMonthPicker.prototype, "focusedMonth", 2);
CalendarMonthPicker = __decorateClass$h([
  customElement("calendar-month-picker")
], CalendarMonthPicker);
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$g(target, key, result);
  return result;
};
var __accessCheck$b = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$b = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$a = (obj, member, method) => {
  __accessCheck$b(obj, member, "access private method");
  return method;
};
var _isYearDisabled, isYearDisabled_fn, _selectYear, selectYear_fn, _previousDecade, previousDecade_fn, _nextDecade, nextDecade_fn, _setFocusedYear, setFocusedYear_fn, _handleKeydown$3, handleKeydown_fn$3, _moveFocus, moveFocus_fn;
let CalendarYearPicker = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$b(this, _isYearDisabled);
    __privateAdd$b(this, _selectYear);
    __privateAdd$b(this, _previousDecade);
    __privateAdd$b(this, _nextDecade);
    __privateAdd$b(this, _setFocusedYear);
    __privateAdd$b(this, _handleKeydown$3);
    __privateAdd$b(this, _moveFocus);
    this.selectedYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.disabled = false;
    this.startYear = Math.floor((/* @__PURE__ */ new Date()).getFullYear() / 10) * 10;
    this.focusedYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  get years() {
    const years = [];
    for (let i = this.startYear; i < this.startYear + 12; i++) {
      years.push(i);
    }
    return years;
  }
  get previousDecadeLabel() {
    return `${this.startYear - 10} - ${this.startYear - 1}`;
  }
  get nextDecadeLabel() {
    return `${this.startYear + 12} - ${this.startYear + 21}`;
  }
  render() {
    return html`
            <div class="year-picker" ?data-disabled=${this.disabled} role="dialog" aria-label="Select year" @keydown=${__privateMethod$a(this, _handleKeydown$3, handleKeydown_fn$3)}>
                <div class="year-navigation">
                    <button
                        class="nav-button"
                        ?disabled=${this.disabled}
                        @click=${__privateMethod$a(this, _previousDecade, previousDecade_fn)}
                        title="Previous decade: ${this.previousDecadeLabel}"
                        aria-label="Previous decade: ${this.previousDecadeLabel}"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <span class="decade-label">${this.startYear} - ${this.startYear + 11}</span>
                    <button
                        class="nav-button"
                        ?disabled=${this.disabled}
                        @click=${__privateMethod$a(this, _nextDecade, nextDecade_fn)}
                        title="Next decade: ${this.nextDecadeLabel}"
                        aria-label="Next decade: ${this.nextDecadeLabel}"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                </div>
                <div class="years-grid" role="grid" aria-label="Year selection grid">
                    ${this.years.map(
      (year) => html`
                            <button
                                class="year-button"
                                role="gridcell"
                                ?data-selected=${year === this.selectedYear}
                                ?disabled=${this.disabled || __privateMethod$a(this, _isYearDisabled, isYearDisabled_fn).call(this, year)}
                                @click=${() => __privateMethod$a(this, _selectYear, selectYear_fn).call(this, year)}
                                tabindex=${this.disabled || __privateMethod$a(this, _isYearDisabled, isYearDisabled_fn).call(this, year) ? -1 : year === this.focusedYear ? 0 : -1}
                                aria-label=${year.toString()}
                                aria-selected=${year === this.selectedYear ? "true" : "false"}
                                @focus=${() => __privateMethod$a(this, _setFocusedYear, setFocusedYear_fn).call(this, year)}
                            >
                                ${year}
                            </button>
                        `
    )}
                </div>
            </div>
        `;
  }
};
_isYearDisabled = /* @__PURE__ */ new WeakSet();
isYearDisabled_fn = function(year) {
  if (this.minYear && year < this.minYear)
    return true;
  if (this.maxYear && year > this.maxYear)
    return true;
  return false;
};
_selectYear = /* @__PURE__ */ new WeakSet();
selectYear_fn = function(year) {
  if (this.disabled || __privateMethod$a(this, _isYearDisabled, isYearDisabled_fn).call(this, year))
    return;
  this.selectedYear = year;
  this.dispatchEvent(
    new CustomEvent("year-selected", {
      detail: { year },
      bubbles: true,
      composed: true
    })
  );
};
_previousDecade = /* @__PURE__ */ new WeakSet();
previousDecade_fn = function() {
  if (this.disabled)
    return;
  this.startYear -= 12;
};
_nextDecade = /* @__PURE__ */ new WeakSet();
nextDecade_fn = function() {
  if (this.disabled)
    return;
  this.startYear += 12;
};
_setFocusedYear = /* @__PURE__ */ new WeakSet();
setFocusedYear_fn = function(year) {
  this.focusedYear = year;
};
_handleKeydown$3 = /* @__PURE__ */ new WeakSet();
handleKeydown_fn$3 = function(event) {
  if (this.disabled)
    return;
  const key = event.key;
  let handled = false;
  switch (key) {
    case "ArrowLeft":
      __privateMethod$a(this, _moveFocus, moveFocus_fn).call(this, -1);
      handled = true;
      break;
    case "ArrowRight":
      __privateMethod$a(this, _moveFocus, moveFocus_fn).call(this, 1);
      handled = true;
      break;
    case "ArrowUp":
      __privateMethod$a(this, _moveFocus, moveFocus_fn).call(this, -4);
      handled = true;
      break;
    case "ArrowDown":
      __privateMethod$a(this, _moveFocus, moveFocus_fn).call(this, 4);
      handled = true;
      break;
    case "Home":
      __privateMethod$a(this, _setFocusedYear, setFocusedYear_fn).call(this, this.startYear);
      handled = true;
      break;
    case "End":
      __privateMethod$a(this, _setFocusedYear, setFocusedYear_fn).call(this, this.startYear + 11);
      handled = true;
      break;
    case "PageUp":
      __privateMethod$a(this, _previousDecade, previousDecade_fn).call(this);
      __privateMethod$a(this, _setFocusedYear, setFocusedYear_fn).call(this, Math.max(this.startYear, this.focusedYear - 12));
      handled = true;
      break;
    case "PageDown":
      __privateMethod$a(this, _nextDecade, nextDecade_fn).call(this);
      __privateMethod$a(this, _setFocusedYear, setFocusedYear_fn).call(this, Math.min(this.startYear + 11, this.focusedYear + 12));
      handled = true;
      break;
    case "Enter":
    case " ":
      if (!__privateMethod$a(this, _isYearDisabled, isYearDisabled_fn).call(this, this.focusedYear)) {
        __privateMethod$a(this, _selectYear, selectYear_fn).call(this, this.focusedYear);
        handled = true;
      }
      break;
  }
  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
};
_moveFocus = /* @__PURE__ */ new WeakSet();
moveFocus_fn = function(delta) {
  let newFocus = this.focusedYear + delta;
  if (newFocus < this.startYear)
    newFocus = this.startYear;
  if (newFocus > this.startYear + 11)
    newFocus = this.startYear + 11;
  __privateMethod$a(this, _setFocusedYear, setFocusedYear_fn).call(this, newFocus);
  this.updateComplete.then(() => {
    var _a2;
    const buttons = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll(".year-button");
    const yearIndex = newFocus - this.startYear;
    const targetButton = buttons == null ? void 0 : buttons[yearIndex];
    targetButton == null ? void 0 : targetButton.focus();
  });
};
CalendarYearPicker.styles = css`
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
    `;
__decorateClass$g([
  property({ type: Number })
], CalendarYearPicker.prototype, "selectedYear", 2);
__decorateClass$g([
  property({ type: Boolean })
], CalendarYearPicker.prototype, "disabled", 2);
__decorateClass$g([
  property({ type: Number })
], CalendarYearPicker.prototype, "minYear", 2);
__decorateClass$g([
  property({ type: Number })
], CalendarYearPicker.prototype, "maxYear", 2);
__decorateClass$g([
  state()
], CalendarYearPicker.prototype, "startYear", 2);
__decorateClass$g([
  state()
], CalendarYearPicker.prototype, "focusedYear", 2);
CalendarYearPicker = __decorateClass$g([
  customElement("calendar-year-picker")
], CalendarYearPicker);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$f(target, key, result);
  return result;
};
var __accessCheck$a = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$5 = (obj, member, getter) => {
  __accessCheck$a(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$a = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$2 = (obj, member, value, setter) => {
  __accessCheck$a(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod$9 = (obj, member, method) => {
  __accessCheck$a(obj, member, "access private method");
  return method;
};
var _debounceTimer, _renderRangeMode, renderRangeMode_fn, _renderSingleMode, renderSingleMode_fn, _renderSingleCalendar, renderSingleCalendar_fn, _renderRangeCalendar, renderRangeCalendar_fn, _renderCalendarSide, renderCalendarSide_fn, _setupResizeObserver, setupResizeObserver_fn, _shouldRenderDualRange, shouldRenderDualRange_fn, _evaluateAutoDual, evaluateAutoDual_fn, _evaluateAutoDualDebounced, evaluateAutoDualDebounced_fn, _doEvaluateAutoDual, doEvaluateAutoDual_fn, _handleAutoDualChange, handleAutoDualChange_fn, _handleWindowResize, _handleKeydown$2, handleKeydown_fn$2, _navigateDate, navigateDate_fn, _navigateMonthByKeyboard, navigateMonthByKeyboard_fn, _navigateToStartOfWeek, navigateToStartOfWeek_fn, _navigateToEndOfWeek, navigateToEndOfWeek_fn, _navigateToToday, navigateToToday_fn, _setFocusedDate, setFocusedDate_fn, _handleEscape, handleEscape_fn, _announceText, announceText_fn, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn, _initializeDates, initializeDates_fn, _handleNavigate, handleNavigate_fn, _handleMonthPicker, handleMonthPicker_fn, _handleYearPicker, handleYearPicker_fn, _handleDateClick, handleDateClick_fn, _handleDateHover, handleDateHover_fn, _handleDateLeave, handleDateLeave_fn, _handleMonthSelected, handleMonthSelected_fn, _handleYearSelected, handleYearSelected_fn, _openPicker, openPicker_fn, _closePicker, closePicker_fn, _calendarIndexForSide, calendarIndexForSide_fn, _sideForCalendarIndex, sideForCalendarIndex_fn, _navigateMonth, navigateMonth_fn, _setMonth, setMonth_fn, _setYear, setYear_fn, _doFullReset, doFullReset_fn, _selectDate, selectDate_fn, _updateFormData, updateFormData_fn, _dispatchDateSelected, dispatchDateSelected_fn, _dispatchRangeSelected, dispatchRangeSelected_fn, _getAutomaticSide, getAutomaticSide_fn, _validateSide, validateSide_fn, _setMonthAndYear, setMonthAndYear_fn, _addMonth, addMonth_fn;
let MjoCalendar = class extends ThemeMixin(FormMixin(LitElement)) {
  constructor() {
    super(...arguments);
    __privateAdd$a(this, _renderRangeMode);
    __privateAdd$a(this, _renderSingleMode);
    __privateAdd$a(this, _renderSingleCalendar);
    __privateAdd$a(this, _renderRangeCalendar);
    __privateAdd$a(this, _renderCalendarSide);
    __privateAdd$a(this, _setupResizeObserver);
    __privateAdd$a(this, _shouldRenderDualRange);
    __privateAdd$a(this, _evaluateAutoDual);
    __privateAdd$a(this, _evaluateAutoDualDebounced);
    __privateAdd$a(this, _doEvaluateAutoDual);
    __privateAdd$a(this, _handleAutoDualChange);
    __privateAdd$a(this, _handleKeydown$2);
    __privateAdd$a(this, _navigateDate);
    __privateAdd$a(this, _navigateMonthByKeyboard);
    __privateAdd$a(this, _navigateToStartOfWeek);
    __privateAdd$a(this, _navigateToEndOfWeek);
    __privateAdd$a(this, _navigateToToday);
    __privateAdd$a(this, _setFocusedDate);
    __privateAdd$a(this, _handleEscape);
    __privateAdd$a(this, _announceText);
    __privateAdd$a(this, _syncDisplayedMonthsFromState);
    __privateAdd$a(this, _initializeDates);
    __privateAdd$a(this, _handleNavigate);
    __privateAdd$a(this, _handleMonthPicker);
    __privateAdd$a(this, _handleYearPicker);
    __privateAdd$a(this, _handleDateClick);
    __privateAdd$a(this, _handleDateHover);
    __privateAdd$a(this, _handleDateLeave);
    __privateAdd$a(this, _handleMonthSelected);
    __privateAdd$a(this, _handleYearSelected);
    __privateAdd$a(this, _openPicker);
    __privateAdd$a(this, _closePicker);
    __privateAdd$a(this, _calendarIndexForSide);
    __privateAdd$a(this, _sideForCalendarIndex);
    __privateAdd$a(this, _navigateMonth);
    __privateAdd$a(this, _setMonth);
    __privateAdd$a(this, _setYear);
    __privateAdd$a(this, _doFullReset);
    __privateAdd$a(this, _selectDate);
    __privateAdd$a(this, _updateFormData);
    __privateAdd$a(this, _dispatchDateSelected);
    __privateAdd$a(this, _dispatchRangeSelected);
    __privateAdd$a(this, _getAutomaticSide);
    __privateAdd$a(this, _validateSide);
    __privateAdd$a(this, _setMonthAndYear);
    __privateAdd$a(this, _addMonth);
    this.mode = "single";
    this.locale = "en";
    this.disabled = false;
    this.size = "medium";
    this.color = "primary";
    this.showToday = true;
    this.firstDayOfWeek = "monday";
    this.rangeCalendars = "auto";
    this.enableKeyboardNavigation = true;
    this.announceSelections = true;
    this.ariaLabelledby = null;
    this.ariaDescribedby = null;
    this.ariaLive = "polite";
    this.picker = { open: false, type: void 0, index: 0 };
    this.autoDual = false;
    this.displayedMonths = [];
    this.announcementText = "";
    __privateAdd$a(this, _debounceTimer, void 0);
    __privateAdd$a(this, _handleWindowResize, () => __privateMethod$9(this, _evaluateAutoDualDebounced, evaluateAutoDualDebounced_fn).call(this));
  }
  get currentLocale() {
    return locales[this.locale] || locales.en;
  }
  get monthNames() {
    const locale = this.currentLocale;
    return locale && locale.calendar ? locale.calendar.months : locales.en.calendar.months;
  }
  get weekDays() {
    const locale = this.currentLocale;
    return locale && locale.calendar ? locale.calendar.weekdaysShort : locales.en.calendar.weekdaysShort;
  }
  get computedAriaLabel() {
    if (this.ariaLabel)
      return this.ariaLabel;
    if (this.mode === "range") {
      return this.selectedStartDate && this.selectedEndDate ? `Date range picker. Selected from ${CalendarUtils.formatDate(this.selectedStartDate)} to ${CalendarUtils.formatDate(this.selectedEndDate)}` : "Date range picker. Use arrow keys to navigate, Enter to select.";
    }
    return this.selectedDate ? `Date picker. Selected date: ${CalendarUtils.formatDate(this.selectedDate)}` : "Date picker. Use arrow keys to navigate, Enter to select.";
  }
  get computedRole() {
    return "application";
  }
  render() {
    const calendarId = `calendar-${Math.random().toString(36).substring(2, 9)}`;
    return html`
            <div
                id=${calendarId}
                class="calendar"
                role="application"
                aria-label=${this.computedAriaLabel}
                aria-labelledby=${ifDefined(this.ariaLabelledby || void 0)}
                aria-describedby=${ifDefined(this.ariaDescribedby || void 0)}
                aria-live=${this.announcementText ? this.ariaLive : "off"}
                tabindex=${this.disabled ? -1 : 0}
                @keydown=${this.enableKeyboardNavigation ? __privateMethod$9(this, _handleKeydown$2, handleKeydown_fn$2) : nothing}
            >
                ${this.mode === "range" ? __privateMethod$9(this, _renderRangeMode, renderRangeMode_fn).call(this) : __privateMethod$9(this, _renderSingleMode, renderSingleMode_fn).call(this)}
                ${this.announcementText ? html`<div class="sr-only" aria-live=${this.ariaLive}>${this.announcementText}</div>` : nothing}
            </div>
        `;
  }
  connectedCallback() {
    super.connectedCallback();
    __privateMethod$9(this, _initializeDates, initializeDates_fn).call(this);
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
    this.updateComplete.then(() => {
      __privateMethod$9(this, _setupResizeObserver, setupResizeObserver_fn).call(this);
    });
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("startDate") || changedProperties.has("endDate") || changedProperties.has("mode")) {
      __privateMethod$9(this, _initializeDates, initializeDates_fn).call(this);
      __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", __privateGet$5(this, _handleWindowResize));
    if (__privateGet$5(this, _debounceTimer)) {
      clearTimeout(__privateGet$5(this, _debounceTimer));
      __privateSet$2(this, _debounceTimer, void 0);
    }
  }
  /** Returns a shallow copy of the currently displayed months (length 1 or 2). */
  getDisplayedMonths() {
    return [...this.displayedMonths];
  }
  /**
   * Sets the displayed months.
   * If two months provided and not adjacent, the second will be coerced to be +1 month from the first by default.
   */
  setDisplayedMonths(months, enforceAdjacency = true) {
    if (!Array.isArray(months) || months.length === 0)
      return;
    if (months.length > 2)
      months = months.slice(0, 2);
    const normalized = months.map((m) => ({ month: m.month, year: m.year }));
    if (normalized.length === 2 && enforceAdjacency) {
      const first = normalized[0];
      const expected = __privateMethod$9(this, _addMonth, addMonth_fn).call(this, first, 1);
      const second = normalized[1];
      if (second.month !== expected.month || second.year !== expected.year) {
        normalized[1] = expected;
      }
    }
    this.displayedMonths = normalized;
  }
  /** Navigate to a specific month with automatic side detection */
  goToMonth(options) {
    if (!options || typeof options !== "object") {
      throw new Error("Option param expect an object");
    }
    if (!options.year) {
      options.year = (/* @__PURE__ */ new Date()).getFullYear();
    }
    const { month, year, side } = options;
    if (typeof month !== "number") {
      throw new Error("Requires a valid month number. Got: " + typeof month);
    }
    if (typeof year !== "number") {
      throw new Error("Requires a valid year number. Got: " + typeof year);
    }
    const clampedMonth = Math.max(1, Math.min(12, month));
    const targetSide = __privateMethod$9(this, _validateSide, validateSide_fn).call(this, side) || __privateMethod$9(this, _getAutomaticSide, getAutomaticSide_fn).call(this);
    __privateMethod$9(this, _setMonthAndYear, setMonthAndYear_fn).call(this, clampedMonth - 1, year, targetSide);
  }
  /** Navigate to a specific year with automatic side detection */
  goToYear(options) {
    if (!options || typeof options !== "object") {
      throw new Error("Option param expect an object");
    }
    const { year, side } = options;
    if (typeof year !== "number" || year < 1e3 || year > 9999) {
      throw new Error("goToYear() requires a valid year (1000-9999). Got: " + year);
    }
    const targetSide = __privateMethod$9(this, _validateSide, validateSide_fn).call(this, side) || __privateMethod$9(this, _getAutomaticSide, getAutomaticSide_fn).call(this);
    const currentDisplayed = this.getDisplayedMonths();
    let currentMonth;
    if (targetSide === "right" && currentDisplayed.length >= 2) {
      currentMonth = currentDisplayed[1].month;
    } else if (targetSide === "left" && currentDisplayed.length >= 1) {
      currentMonth = currentDisplayed[0].month;
    } else {
      currentMonth = currentDisplayed.length > 0 ? currentDisplayed[0].month : (/* @__PURE__ */ new Date()).getMonth();
    }
    __privateMethod$9(this, _setMonthAndYear, setMonthAndYear_fn).call(this, currentMonth, year, targetSide);
  }
  /** Navigate to a specific date (month and year simultaneously) */
  goToDate(options) {
    if (!options || typeof options !== "object") {
      throw new Error("Option param expect an object");
    }
    const { date, side } = options;
    let targetDate;
    if (date instanceof Date) {
      targetDate = new Date(date);
    } else if (typeof date === "string") {
      targetDate = new Date(date);
    } else {
      throw new Error("Date param expect a Date object or date string. Got: " + typeof date);
    }
    if (isNaN(targetDate.getTime())) {
      throw new Error("Date param expect a valid date. Got: " + date);
    }
    const targetSide = __privateMethod$9(this, _validateSide, validateSide_fn).call(this, side) || __privateMethod$9(this, _getAutomaticSide, getAutomaticSide_fn).call(this);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    __privateMethod$9(this, _setMonthAndYear, setMonthAndYear_fn).call(this, targetMonth, targetYear, targetSide);
  }
  /** Reset any current selection (single or range) and displayed months to initial state. */
  resetSelection() {
    __privateMethod$9(this, _doFullReset, doFullReset_fn).call(this);
  }
  /** Full controlled reset API: clears selection, months, pickers and forces fresh today-based view. */
  reset() {
    __privateMethod$9(this, _doFullReset, doFullReset_fn).call(this);
  }
  /**
   * Programmatic date selection helper.
   * Exposed primarily to facilitate unit testing without relying on internal
   * shadow DOM event wiring. Mirrors a user clicking a date cell.
   */
  selectDate(date) {
    __privateMethod$9(this, _selectDate, selectDate_fn).call(this, date);
  }
};
_debounceTimer = /* @__PURE__ */ new WeakMap();
_renderRangeMode = /* @__PURE__ */ new WeakSet();
renderRangeMode_fn = function() {
  if (__privateMethod$9(this, _shouldRenderDualRange, shouldRenderDualRange_fn).call(this)) {
    return __privateMethod$9(this, _renderRangeCalendar, renderRangeCalendar_fn).call(this);
  }
  return __privateMethod$9(this, _renderSingleCalendar, renderSingleCalendar_fn).call(
    this,
    /*rangeMode*/
    true
  );
};
_renderSingleMode = /* @__PURE__ */ new WeakSet();
renderSingleMode_fn = function() {
  return __privateMethod$9(this, _renderSingleCalendar, renderSingleCalendar_fn).call(this);
};
_renderSingleCalendar = /* @__PURE__ */ new WeakSet();
renderSingleCalendar_fn = function(isRangeMode = false) {
  if (this.displayedMonths.length === 0) {
    const today = /* @__PURE__ */ new Date();
    this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
  }
  const dm = this.displayedMonths[0];
  return html`
            <div class="calendar-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${__privateMethod$9(this, _renderCalendarSide, renderCalendarSide_fn).call(this, {
    month: dm.month,
    year: dm.year,
    side: "single",
    forceMode: isRangeMode ? "range" : this.mode
  })}
            </div>
        `;
};
_renderRangeCalendar = /* @__PURE__ */ new WeakSet();
renderRangeCalendar_fn = function() {
  if (this.displayedMonths.length !== 2) {
    if (this.displayedMonths.length === 1) {
      const first = this.displayedMonths[0];
      const secondDate = new Date(first.year, first.month + 1, 1);
      this.displayedMonths = [first, { month: secondDate.getMonth(), year: secondDate.getFullYear() }];
    } else if (this.displayedMonths.length === 0) {
      const today = /* @__PURE__ */ new Date();
      const next = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      this.displayedMonths = [
        { month: today.getMonth(), year: today.getFullYear() },
        { month: next.getMonth(), year: next.getFullYear() }
      ];
    }
  }
  const months = this.displayedMonths;
  return html`
            <div class="calendar-range-container" part="calendar" data-size=${this.size} data-color=${this.color} ?data-disabled=${this.disabled}>
                ${__privateMethod$9(this, _renderCalendarSide, renderCalendarSide_fn).call(this, { month: months[0].month, year: months[0].year, side: "left" })}
                ${__privateMethod$9(this, _renderCalendarSide, renderCalendarSide_fn).call(this, { month: months[1].month, year: months[1].year, side: "right" })}
            </div>
        `;
};
_renderCalendarSide = /* @__PURE__ */ new WeakSet();
renderCalendarSide_fn = function(args) {
  const { month, year, side, forceMode } = args;
  const calendarIndex = __privateMethod$9(this, _calendarIndexForSide, calendarIndexForSide_fn).call(this, side);
  const isPickerSide = this.picker.open && this.picker.index === calendarIndex;
  const mode = forceMode ?? this.mode;
  return html`
            <div class="calendar-side" data-side=${side}>
                <calendar-header
                    month=${month}
                    year=${year}
                    .monthNames=${this.monthNames}
                    ?disabled=${this.disabled}
                    ?monthPickerOpen=${this.picker.open && this.picker.type === "month" && isPickerSide}
                    ?yearPickerOpen=${this.picker.open && this.picker.type === "year" && isPickerSide}
                    side=${side}
                    @navigate=${__privateMethod$9(this, _handleNavigate, handleNavigate_fn)}
                    @month-picker=${__privateMethod$9(this, _handleMonthPicker, handleMonthPicker_fn)}
                    @year-picker=${__privateMethod$9(this, _handleYearPicker, handleYearPicker_fn)}
                ></calendar-header>
                <calendar-grid
                    month=${month}
                    year=${year}
                    .weekDays=${this.weekDays}
                    firstDayOfWeek=${this.firstDayOfWeek}
                    mode=${mode}
                    ?showToday=${this.showToday}
                    size=${this.size}
                    ?disabled=${this.disabled}
                    minDate=${this.minDate || ""}
                    maxDate=${this.maxDate || ""}
                    .disabledDates=${this.disabledDates}
                    .selectedDate=${this.selectedDate}
                    .selectedStartDate=${this.selectedStartDate}
                    .selectedEndDate=${this.selectedEndDate}
                    .hoverDate=${this.hoverDate}
                    .focusedDate=${this.focusedDate}
                    side=${side}
                    @date-click=${__privateMethod$9(this, _handleDateClick, handleDateClick_fn)}
                    @date-hover=${__privateMethod$9(this, _handleDateHover, handleDateHover_fn)}
                    @date-leave=${__privateMethod$9(this, _handleDateLeave, handleDateLeave_fn)}
                ></calendar-grid>
                ${this.picker.open && this.picker.type === "month" && isPickerSide ? html`
                          <calendar-month-picker
                              selectedMonth=${month}
                              .monthNames=${this.monthNames}
                              ?disabled=${this.disabled}
                              @month-selected=${__privateMethod$9(this, _handleMonthSelected, handleMonthSelected_fn)}
                              @click=${(e) => e.stopPropagation()}
                          ></calendar-month-picker>
                      ` : this.picker.open && this.picker.type === "year" && isPickerSide ? html`
                            <calendar-year-picker
                                selectedYear=${year}
                                ?disabled=${this.disabled}
                                @year-selected=${__privateMethod$9(this, _handleYearSelected, handleYearSelected_fn)}
                                @click=${(e) => e.stopPropagation()}
                            ></calendar-year-picker>
                        ` : nothing}
            </div>
        `;
};
_setupResizeObserver = /* @__PURE__ */ new WeakSet();
setupResizeObserver_fn = function() {
  window.addEventListener("resize", __privateGet$5(this, _handleWindowResize));
  __privateMethod$9(this, _evaluateAutoDualDebounced, evaluateAutoDualDebounced_fn).call(this);
};
_shouldRenderDualRange = /* @__PURE__ */ new WeakSet();
shouldRenderDualRange_fn = function() {
  if (this.mode !== "range")
    return false;
  const setting = this.rangeCalendars;
  if (setting === "2")
    return true;
  if (setting === "1")
    return false;
  return this.autoDual;
};
_evaluateAutoDual = /* @__PURE__ */ new WeakSet();
evaluateAutoDual_fn = function() {
  var _a2;
  if (this.rangeCalendars !== "auto" || this.mode !== "range")
    return;
  const parentWidth = (_a2 = this.parentElement) == null ? void 0 : _a2.getBoundingClientRect().width;
  const hostRect = this.getBoundingClientRect();
  const width = parentWidth || hostRect.width || window.innerWidth;
  __privateMethod$9(this, _doEvaluateAutoDual, doEvaluateAutoDual_fn).call(this, width);
};
_evaluateAutoDualDebounced = /* @__PURE__ */ new WeakSet();
evaluateAutoDualDebounced_fn = function() {
  if (__privateGet$5(this, _debounceTimer)) {
    clearTimeout(__privateGet$5(this, _debounceTimer));
  }
  __privateSet$2(this, _debounceTimer, window.setTimeout(() => {
    __privateMethod$9(this, _evaluateAutoDual, evaluateAutoDual_fn).call(this);
  }, 16));
};
_doEvaluateAutoDual = /* @__PURE__ */ new WeakSet();
doEvaluateAutoDual_fn = function(width) {
  const shouldDual = width >= MjoCalendar.AUTO_DUAL_THRESHOLD;
  if (shouldDual !== this.autoDual) {
    this.autoDual = shouldDual;
    __privateMethod$9(this, _handleAutoDualChange, handleAutoDualChange_fn).call(this);
    this.requestUpdate();
  }
};
_handleAutoDualChange = /* @__PURE__ */ new WeakSet();
handleAutoDualChange_fn = function() {
  if (this.mode !== "range")
    return;
  if (this.autoDual && this.displayedMonths.length === 1) {
    const first = this.displayedMonths[0];
    const second = new Date(first.year, first.month + 1, 1);
    this.displayedMonths = [first, { month: second.getMonth(), year: second.getFullYear() }];
  } else if (!this.autoDual && this.displayedMonths.length === 2) {
    this.displayedMonths = [this.displayedMonths[0]];
  }
};
_handleWindowResize = /* @__PURE__ */ new WeakMap();
_handleKeydown$2 = /* @__PURE__ */ new WeakSet();
handleKeydown_fn$2 = function(event) {
  if (this.disabled || this.picker.open)
    return;
  const key = event.key;
  let handled = false;
  const currentDate = this.focusedDate || this.selectedDate || /* @__PURE__ */ new Date();
  switch (key) {
    case "ArrowLeft":
      __privateMethod$9(this, _navigateDate, navigateDate_fn).call(this, currentDate, -1);
      handled = true;
      break;
    case "ArrowRight":
      __privateMethod$9(this, _navigateDate, navigateDate_fn).call(this, currentDate, 1);
      handled = true;
      break;
    case "ArrowUp":
      __privateMethod$9(this, _navigateDate, navigateDate_fn).call(this, currentDate, -7);
      handled = true;
      break;
    case "ArrowDown":
      __privateMethod$9(this, _navigateDate, navigateDate_fn).call(this, currentDate, 7);
      handled = true;
      break;
    case "Home":
      __privateMethod$9(this, _navigateToStartOfWeek, navigateToStartOfWeek_fn).call(this, currentDate);
      handled = true;
      break;
    case "End":
      __privateMethod$9(this, _navigateToEndOfWeek, navigateToEndOfWeek_fn).call(this, currentDate);
      handled = true;
      break;
    case "PageUp":
      event.ctrlKey ? __privateMethod$9(this, _navigateMonthByKeyboard, navigateMonthByKeyboard_fn).call(this, currentDate, -12) : __privateMethod$9(this, _navigateMonthByKeyboard, navigateMonthByKeyboard_fn).call(this, currentDate, -1);
      handled = true;
      break;
    case "PageDown":
      event.ctrlKey ? __privateMethod$9(this, _navigateMonthByKeyboard, navigateMonthByKeyboard_fn).call(this, currentDate, 12) : __privateMethod$9(this, _navigateMonthByKeyboard, navigateMonthByKeyboard_fn).call(this, currentDate, 1);
      handled = true;
      break;
    case "Enter":
    case " ":
      if (this.focusedDate) {
        __privateMethod$9(this, _selectDate, selectDate_fn).call(this, this.focusedDate);
        handled = true;
      }
      break;
    case "Escape":
      __privateMethod$9(this, _handleEscape, handleEscape_fn).call(this);
      handled = true;
      break;
    case "t":
    case "T":
      if (!event.ctrlKey && !event.altKey && !event.metaKey) {
        __privateMethod$9(this, _navigateToToday, navigateToToday_fn).call(this);
        handled = true;
      }
      break;
  }
  if (handled) {
    event.preventDefault();
    event.stopPropagation();
  }
};
_navigateDate = /* @__PURE__ */ new WeakSet();
navigateDate_fn = function(from, days) {
  const newDate = new Date(from);
  newDate.setDate(newDate.getDate() + days);
  __privateMethod$9(this, _setFocusedDate, setFocusedDate_fn).call(this, newDate);
};
_navigateMonthByKeyboard = /* @__PURE__ */ new WeakSet();
navigateMonthByKeyboard_fn = function(from, months) {
  const newDate = new Date(from);
  newDate.setMonth(newDate.getMonth() + months);
  __privateMethod$9(this, _setFocusedDate, setFocusedDate_fn).call(this, newDate);
};
_navigateToStartOfWeek = /* @__PURE__ */ new WeakSet();
navigateToStartOfWeek_fn = function(from) {
  const newDate = new Date(from);
  const day = newDate.getDay();
  const diff = this.firstDayOfWeek === "monday" ? day === 0 ? 6 : day - 1 : day;
  newDate.setDate(newDate.getDate() - diff);
  __privateMethod$9(this, _setFocusedDate, setFocusedDate_fn).call(this, newDate);
};
_navigateToEndOfWeek = /* @__PURE__ */ new WeakSet();
navigateToEndOfWeek_fn = function(from) {
  const newDate = new Date(from);
  const day = newDate.getDay();
  const diff = this.firstDayOfWeek === "monday" ? day === 0 ? 0 : 7 - day : 6 - day;
  newDate.setDate(newDate.getDate() + diff);
  __privateMethod$9(this, _setFocusedDate, setFocusedDate_fn).call(this, newDate);
};
_navigateToToday = /* @__PURE__ */ new WeakSet();
navigateToToday_fn = function() {
  const today = /* @__PURE__ */ new Date();
  __privateMethod$9(this, _setFocusedDate, setFocusedDate_fn).call(this, today);
  this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
};
_setFocusedDate = /* @__PURE__ */ new WeakSet();
setFocusedDate_fn = function(date) {
  this.focusedDate = date;
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentMonth = this.displayedMonths[0];
  if (!currentMonth || currentMonth.month !== month || currentMonth.year !== year) {
    this.displayedMonths = [{ month, year }];
  }
  if (this.announceSelections) {
    const dateString = CalendarUtils.formatDate(date);
    __privateMethod$9(this, _announceText, announceText_fn).call(this, `Focused on ${dateString}`);
  }
};
_handleEscape = /* @__PURE__ */ new WeakSet();
handleEscape_fn = function() {
  if (this.picker.open) {
    __privateMethod$9(this, _closePicker, closePicker_fn).call(this);
  } else {
    this.focusedDate = void 0;
  }
};
_announceText = /* @__PURE__ */ new WeakSet();
announceText_fn = function(text) {
  this.announcementText = text;
  setTimeout(() => {
    this.announcementText = "";
  }, 1e3);
};
_syncDisplayedMonthsFromState = /* @__PURE__ */ new WeakSet();
syncDisplayedMonthsFromState_fn = function() {
  if (this.displayedMonths.length === 0) {
    let referenceDate;
    if (this.mode === "single" && this.selectedDate) {
      referenceDate = this.selectedDate;
    } else if (this.mode === "range" && this.selectedStartDate) {
      referenceDate = this.selectedStartDate;
    }
    if (referenceDate) {
      this.displayedMonths = [{ month: referenceDate.getMonth(), year: referenceDate.getFullYear() }];
    } else {
      const today = /* @__PURE__ */ new Date();
      this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
    }
  }
  if (this.mode === "range" && __privateMethod$9(this, _shouldRenderDualRange, shouldRenderDualRange_fn).call(this) && this.displayedMonths.length === 1) {
    const first = this.displayedMonths[0];
    const d = new Date(first.year, first.month + 1, 1);
    this.displayedMonths = [first, { month: d.getMonth(), year: d.getFullYear() }];
  }
};
_initializeDates = /* @__PURE__ */ new WeakSet();
initializeDates_fn = function() {
  if (this.value && this.mode === "single") {
    this.selectedDate = new Date(this.value);
    this.displayedMonths = [{ month: this.selectedDate.getMonth(), year: this.selectedDate.getFullYear() }];
  } else if (this.startDate && this.mode === "range") {
    this.selectedStartDate = new Date(this.startDate);
    this.displayedMonths = [{ month: this.selectedStartDate.getMonth(), year: this.selectedStartDate.getFullYear() }];
    if (this.endDate) {
      this.selectedEndDate = new Date(this.endDate);
    }
  }
};
_handleNavigate = /* @__PURE__ */ new WeakSet();
handleNavigate_fn = function(event) {
  const { direction, side } = event.detail;
  __privateMethod$9(this, _navigateMonth, navigateMonth_fn).call(this, direction, side);
};
_handleMonthPicker = /* @__PURE__ */ new WeakSet();
handleMonthPicker_fn = function(event) {
  const { side } = event.detail;
  __privateMethod$9(this, _openPicker, openPicker_fn).call(this, "month", side);
};
_handleYearPicker = /* @__PURE__ */ new WeakSet();
handleYearPicker_fn = function(event) {
  const { side } = event.detail;
  __privateMethod$9(this, _openPicker, openPicker_fn).call(this, "year", side);
};
_handleDateClick = /* @__PURE__ */ new WeakSet();
handleDateClick_fn = function(event) {
  const { date } = event.detail;
  __privateMethod$9(this, _selectDate, selectDate_fn).call(this, date);
};
_handleDateHover = /* @__PURE__ */ new WeakSet();
handleDateHover_fn = function(event) {
  const { date } = event.detail;
  if (this.mode === "range" && this.selectedStartDate && !this.selectedEndDate) {
    this.hoverDate = date;
  }
};
_handleDateLeave = /* @__PURE__ */ new WeakSet();
handleDateLeave_fn = function() {
  this.hoverDate = void 0;
};
_handleMonthSelected = /* @__PURE__ */ new WeakSet();
handleMonthSelected_fn = function(event) {
  const { month } = event.detail;
  const side = __privateMethod$9(this, _sideForCalendarIndex, sideForCalendarIndex_fn).call(this, this.picker.index);
  __privateMethod$9(this, _setMonth, setMonth_fn).call(this, month, side);
  __privateMethod$9(this, _closePicker, closePicker_fn).call(this);
};
_handleYearSelected = /* @__PURE__ */ new WeakSet();
handleYearSelected_fn = function(event) {
  const { year } = event.detail;
  const side = __privateMethod$9(this, _sideForCalendarIndex, sideForCalendarIndex_fn).call(this, this.picker.index);
  __privateMethod$9(this, _setYear, setYear_fn).call(this, year, side);
  __privateMethod$9(this, _closePicker, closePicker_fn).call(this);
};
_openPicker = /* @__PURE__ */ new WeakSet();
openPicker_fn = function(type, side) {
  this.picker = { open: true, type, index: __privateMethod$9(this, _calendarIndexForSide, calendarIndexForSide_fn).call(this, side) };
};
_closePicker = /* @__PURE__ */ new WeakSet();
closePicker_fn = function() {
  if (this.picker.open) {
    this.picker = { open: false, type: void 0, index: 0 };
  }
};
_calendarIndexForSide = /* @__PURE__ */ new WeakSet();
calendarIndexForSide_fn = function(side) {
  if (side === "single")
    return 0;
  return side === "left" ? 0 : 1;
};
_sideForCalendarIndex = /* @__PURE__ */ new WeakSet();
sideForCalendarIndex_fn = function(index) {
  if (this.mode !== "range")
    return "single";
  return index === 0 ? "left" : "right";
};
_navigateMonth = /* @__PURE__ */ new WeakSet();
navigateMonth_fn = function(direction, side) {
  if (side === "single") {
    const base = this.displayedMonths[0];
    const newDate = new Date(base.year, base.month + direction, 1);
    this.displayedMonths = [{ month: newDate.getMonth(), year: newDate.getFullYear() }];
    return;
  }
  if (this.displayedMonths.length < 2)
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
  const [left, right] = this.displayedMonths;
  if (side === "left") {
    const newLeft = new Date(left.year, left.month + direction, 1);
    const newRight = new Date(newLeft.getFullYear(), newLeft.getMonth() + 1, 1);
    this.displayedMonths = [
      { month: newLeft.getMonth(), year: newLeft.getFullYear() },
      { month: newRight.getMonth(), year: newRight.getFullYear() }
    ];
  } else {
    const newRight = new Date(right.year, right.month + direction, 1);
    const newLeft = new Date(newRight.getFullYear(), newRight.getMonth() - 1, 1);
    this.displayedMonths = [
      { month: newLeft.getMonth(), year: newLeft.getFullYear() },
      { month: newRight.getMonth(), year: newRight.getFullYear() }
    ];
  }
};
_setMonth = /* @__PURE__ */ new WeakSet();
setMonth_fn = function(month, side) {
  var _a2, _b2;
  if (this.displayedMonths.length === 0)
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
  if (this.displayedMonths.length === 0 || !this.displayedMonths[0]) {
    const today = /* @__PURE__ */ new Date();
    this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
  }
  if (side === "single") {
    const year = ((_a2 = this.displayedMonths[0]) == null ? void 0 : _a2.year) ?? (/* @__PURE__ */ new Date()).getFullYear();
    this.displayedMonths = [{ month, year }];
    return;
  }
  if (this.displayedMonths.length < 2)
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
  if (this.displayedMonths.length < 2) {
    const first = this.displayedMonths[0];
    const d = new Date((first == null ? void 0 : first.year) ?? (/* @__PURE__ */ new Date()).getFullYear(), ((first == null ? void 0 : first.month) ?? (/* @__PURE__ */ new Date()).getMonth()) + 1, 1);
    this.displayedMonths = [first ?? { month: (/* @__PURE__ */ new Date()).getMonth(), year: (/* @__PURE__ */ new Date()).getFullYear() }, { month: d.getMonth(), year: d.getFullYear() }];
  }
  const [left] = this.displayedMonths;
  if (side === "left") {
    const newLeft = { month, year: (left == null ? void 0 : left.year) ?? (/* @__PURE__ */ new Date()).getFullYear() };
    const dRight = new Date(newLeft.year, newLeft.month + 1, 1);
    this.displayedMonths = [newLeft, { month: dRight.getMonth(), year: dRight.getFullYear() }];
  } else {
    const rightYear = ((_b2 = this.displayedMonths[1]) == null ? void 0 : _b2.year) ?? (/* @__PURE__ */ new Date()).getFullYear();
    const newRight = { month, year: rightYear };
    const dLeft = new Date(newRight.year, newRight.month - 1, 1);
    this.displayedMonths = [{ month: dLeft.getMonth(), year: dLeft.getFullYear() }, newRight];
  }
};
_setYear = /* @__PURE__ */ new WeakSet();
setYear_fn = function(year, side) {
  var _a2, _b2, _c;
  if (this.displayedMonths.length === 0)
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
  if (this.displayedMonths.length === 0 || !this.displayedMonths[0]) {
    const today = /* @__PURE__ */ new Date();
    this.displayedMonths = [{ month: today.getMonth(), year: today.getFullYear() }];
  }
  if (side === "single") {
    const month = ((_a2 = this.displayedMonths[0]) == null ? void 0 : _a2.month) ?? (/* @__PURE__ */ new Date()).getMonth();
    this.displayedMonths = [{ month, year }];
    return;
  }
  if (this.displayedMonths.length < 2)
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
  if (this.displayedMonths.length < 2) {
    const first = this.displayedMonths[0];
    const d = new Date(first.year, first.month + 1, 1);
    this.displayedMonths = [first, { month: d.getMonth(), year: d.getFullYear() }];
  }
  if (side === "left") {
    const left = { month: ((_b2 = this.displayedMonths[0]) == null ? void 0 : _b2.month) ?? (/* @__PURE__ */ new Date()).getMonth(), year };
    const rightDate = new Date(year, left.month + 1, 1);
    this.displayedMonths = [left, { month: rightDate.getMonth(), year: rightDate.getFullYear() }];
  } else {
    const right = { month: ((_c = this.displayedMonths[1]) == null ? void 0 : _c.month) ?? (/* @__PURE__ */ new Date()).getMonth(), year };
    const leftDate = new Date(year, right.month - 1, 1);
    this.displayedMonths = [{ month: leftDate.getMonth(), year: leftDate.getFullYear() }, right];
  }
};
_doFullReset = /* @__PURE__ */ new WeakSet();
doFullReset_fn = function() {
  this.selectedDate = void 0;
  this.selectedStartDate = void 0;
  this.selectedEndDate = void 0;
  this.hoverDate = void 0;
  this.value = void 0;
  this.startDate = void 0;
  this.endDate = void 0;
  this.picker = { open: false, type: void 0, index: 0 };
  this.displayedMonths = [];
  this.autoDual = false;
  __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
};
_selectDate = /* @__PURE__ */ new WeakSet();
selectDate_fn = function(date) {
  if (CalendarUtils.isDateDisabled(date, this.disabled, this.minDate || "", this.maxDate || "", this.disabledDates))
    return;
  if (this.mode === "single") {
    this.selectedDate = date;
    this.value = CalendarUtils.formatDate(date);
    __privateMethod$9(this, _updateFormData, updateFormData_fn).call(this);
    __privateMethod$9(this, _dispatchDateSelected, dispatchDateSelected_fn).call(this);
  } else if (this.mode === "range") {
    if (!this.selectedStartDate || this.selectedStartDate && this.selectedEndDate) {
      this.selectedStartDate = date;
      this.selectedEndDate = void 0;
      this.startDate = CalendarUtils.formatDate(date);
      this.endDate = void 0;
    } else if (this.selectedStartDate && !this.selectedEndDate) {
      if (date < this.selectedStartDate) {
        this.selectedEndDate = this.selectedStartDate;
        this.selectedStartDate = date;
        this.endDate = CalendarUtils.formatDate(this.selectedEndDate);
        this.startDate = CalendarUtils.formatDate(this.selectedStartDate);
      } else {
        this.selectedEndDate = date;
        this.endDate = CalendarUtils.formatDate(date);
      }
      __privateMethod$9(this, _updateFormData, updateFormData_fn).call(this);
      __privateMethod$9(this, _dispatchRangeSelected, dispatchRangeSelected_fn).call(this);
    }
  }
};
_updateFormData = /* @__PURE__ */ new WeakSet();
updateFormData_fn = function() {
  if (!this.name)
    return;
  if (this.mode === "single" && this.value) {
    this.updateFormData({ name: this.name, value: this.value });
  } else if (this.mode === "range" && this.startDate && this.endDate) {
    const rangeValue = JSON.stringify({ start: this.startDate, end: this.endDate });
    this.updateFormData({ name: this.name, value: rangeValue });
  }
};
_dispatchDateSelected = /* @__PURE__ */ new WeakSet();
dispatchDateSelected_fn = function() {
  const eventDetail = {
    date: this.value ? new Date(this.value) : void 0,
    value: this.value
  };
  if (this.announceSelections && this.value) {
    const dateString = CalendarUtils.formatDate(new Date(this.value));
    __privateMethod$9(this, _announceText, announceText_fn).call(this, `Selected ${dateString}`);
  }
  this.dispatchEvent(
    new CustomEvent("mjo-calendar-date-selected", {
      detail: eventDetail,
      bubbles: true,
      composed: true
    })
  );
  this.dispatchEvent(
    new CustomEvent("change", {
      detail: eventDetail,
      bubbles: true,
      composed: true
    })
  );
};
_dispatchRangeSelected = /* @__PURE__ */ new WeakSet();
dispatchRangeSelected_fn = function() {
  const eventDetail = {
    startDate: this.startDate ? new Date(this.startDate) : void 0,
    endDate: this.endDate ? new Date(this.endDate) : void 0,
    startDateValue: this.startDate,
    endDateValue: this.endDate
  };
  if (this.announceSelections && this.startDate && this.endDate) {
    const startString = CalendarUtils.formatDate(new Date(this.startDate));
    const endString = CalendarUtils.formatDate(new Date(this.endDate));
    __privateMethod$9(this, _announceText, announceText_fn).call(this, `Selected date range from ${startString} to ${endString}`);
  }
  this.dispatchEvent(
    new CustomEvent("mjo-calendar-range-selected", {
      detail: eventDetail,
      bubbles: true,
      composed: true
    })
  );
  this.dispatchEvent(
    new CustomEvent("change", {
      detail: eventDetail,
      bubbles: true,
      composed: true
    })
  );
};
_getAutomaticSide = /* @__PURE__ */ new WeakSet();
getAutomaticSide_fn = function() {
  if (this.mode === "single") {
    return "single";
  }
  if (this.rangeCalendars === "1") {
    return "single";
  }
  return "left";
};
_validateSide = /* @__PURE__ */ new WeakSet();
validateSide_fn = function(side) {
  if (side === "single" || side === "left" || side === "right") {
    return side;
  }
  return null;
};
_setMonthAndYear = /* @__PURE__ */ new WeakSet();
setMonthAndYear_fn = function(month, year, side) {
  if (this.displayedMonths.length === 0)
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
  if (side === "single") {
    this.displayedMonths = [{ month, year }];
    return;
  }
  if (this.displayedMonths.length < 2)
    __privateMethod$9(this, _syncDisplayedMonthsFromState, syncDisplayedMonthsFromState_fn).call(this);
  if (side === "left") {
    const newLeft = { month, year };
    const rightDate = new Date(year, month + 1, 1);
    this.displayedMonths = [newLeft, { month: rightDate.getMonth(), year: rightDate.getFullYear() }];
  } else {
    const newRight = { month, year };
    const leftDate = new Date(year, month - 1, 1);
    this.displayedMonths = [{ month: leftDate.getMonth(), year: leftDate.getFullYear() }, newRight];
  }
};
_addMonth = /* @__PURE__ */ new WeakSet();
addMonth_fn = function(ref2, delta) {
  let m = ref2.month + delta;
  let y = ref2.year;
  while (m > 11) {
    m -= 12;
    y++;
  }
  while (m < 0) {
    m += 12;
    y--;
  }
  return { month: m, year: y };
};
MjoCalendar.AUTO_DUAL_THRESHOLD = 720;
MjoCalendar.styles = [
  css`
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
        `
];
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "mode", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "name", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "value", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "startDate", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "endDate", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "locale", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "minDate", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "maxDate", 2);
__decorateClass$f([
  property({ type: Boolean, reflect: true })
], MjoCalendar.prototype, "disabled", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "size", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "color", 2);
__decorateClass$f([
  property({ type: Array })
], MjoCalendar.prototype, "disabledDates", 2);
__decorateClass$f([
  property({ type: Boolean })
], MjoCalendar.prototype, "showToday", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "firstDayOfWeek", 2);
__decorateClass$f([
  property({ type: String })
], MjoCalendar.prototype, "rangeCalendars", 2);
__decorateClass$f([
  property({ type: Array })
], MjoCalendar.prototype, "eventMarkers", 2);
__decorateClass$f([
  property({ type: Boolean })
], MjoCalendar.prototype, "enableKeyboardNavigation", 2);
__decorateClass$f([
  property({ type: Boolean })
], MjoCalendar.prototype, "announceSelections", 2);
__decorateClass$f([
  property({ type: String, attribute: "aria-labelledby" })
], MjoCalendar.prototype, "ariaLabelledby", 2);
__decorateClass$f([
  property({ type: String, attribute: "aria-describedby" })
], MjoCalendar.prototype, "ariaDescribedby", 2);
__decorateClass$f([
  property({ type: String, attribute: "aria-live" })
], MjoCalendar.prototype, "ariaLive", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "selectedDate", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "selectedStartDate", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "selectedEndDate", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "hoverDate", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "picker", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "autoDual", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "displayedMonths", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "focusedDate", 2);
__decorateClass$f([
  state()
], MjoCalendar.prototype, "announcementText", 2);
MjoCalendar = __decorateClass$f([
  customElement("mjo-calendar")
], MjoCalendar);
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$e(target, key, result);
  return result;
};
let MjoCard = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    this.radius = "medium";
  }
  render() {
    return html`<div class="content"><slot></slot></div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.contrast)
      this.setAttribute("contrast", this.contrast);
    if (this.radius)
      this.setAttribute("radius", this.radius);
  }
  setContrast(contrast) {
    this.contrast = contrast;
    this.setAttribute("contrast", contrast);
  }
  setRadius(radius) {
    this.radius = radius;
    this.setAttribute("radius", radius);
  }
};
MjoCard.styles = [
  css`
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
        `
];
__decorateClass$e([
  property({ type: String, noAccessor: true })
], MjoCard.prototype, "contrast", 2);
__decorateClass$e([
  property({ type: String, noAccessor: true })
], MjoCard.prototype, "radius", 2);
MjoCard = __decorateClass$e([
  customElement("mjo-card")
], MjoCard);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$d(target, key, result);
  return result;
};
const InputErrorMixin = (superClass) => {
  class InputError extends superClass {
    constructor() {
      super(...arguments);
      this.error = false;
      this.success = false;
    }
  }
  __decorateClass$d([
    property({ type: Boolean })
  ], InputError.prototype, "error", 2);
  __decorateClass$d([
    property({ type: String })
  ], InputError.prototype, "errormsg", 2);
  __decorateClass$d([
    property({ type: Boolean })
  ], InputError.prototype, "success", 2);
  __decorateClass$d([
    property({ type: String })
  ], InputError.prototype, "successmsg", 2);
  return InputError;
};
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$c(target, key, result);
  return result;
};
let InputHelperText = class extends LitElement {
  render() {
    return html`<div class="container" role="region" aria-live="polite">
            ${this.errormsg ? html`<div class="error" role="alert" aria-live="assertive">
                      <mjo-icon src=${AiFillCloseCircle} aria-hidden="true"></mjo-icon>
                      ${this.errormsg}
                  </div>` : this.successmsg ? html`<div class="success" role="status" aria-live="polite">
                        <mjo-icon src=${AiFillCheckCircle} aria-hidden="true"></mjo-icon>
                        ${this.successmsg}
                    </div>` : html`<mjo-typography tag="none"><slot></slot></mjo-typography>`}
        </div>`;
  }
};
InputHelperText.styles = [
  css`
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
                        var(
                            --mjo-switch-helper-color,
                            var(--mjo-textarea-helper-color, var(--mjo-input-helper-color, var(--mjo-foreground-color-low, currentColor)))
                        )
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
        `
];
__decorateClass$c([
  property({ type: String })
], InputHelperText.prototype, "errormsg", 2);
__decorateClass$c([
  property({ type: String })
], InputHelperText.prototype, "successmsg", 2);
InputHelperText = __decorateClass$c([
  customElement("input-helper-text")
], InputHelperText);
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$b(target, key, result);
  return result;
};
var __accessCheck$9 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$9 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$8 = (obj, member, method) => {
  __accessCheck$9(obj, member, "access private method");
  return method;
};
var _handleClick, handleClick_fn, _handleKeydown$1, handleKeydown_fn$1, _handleFocus$2, handleFocus_fn$1, _handleBlur$2, handleBlur_fn$2;
let MjoCheckbox = class extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) {
  constructor() {
    super(...arguments);
    __privateAdd$9(this, _handleClick);
    __privateAdd$9(this, _handleKeydown$1);
    __privateAdd$9(this, _handleFocus$2);
    __privateAdd$9(this, _handleBlur$2);
    this.color = "primary";
    this.checked = false;
    this.disabled = false;
    this.indeterminate = false;
    this.value = "";
    this.hideErrors = false;
    this.type = "checkbox";
  }
  // Computed properties for accessibility
  get computedAriaChecked() {
    if (this.indeterminate)
      return "mixed";
    return this.checked ? "true" : "false";
  }
  get computedAriaLabel() {
    if (this.ariaLabel)
      return this.ariaLabel;
    if (!this.label)
      return void 0;
    let baseLabel = this.label;
    if (this.required || this.ariaRequired)
      baseLabel += " (required)";
    if (this.indeterminate)
      baseLabel += " (partially selected)";
    else if (this.checked)
      baseLabel += " (checked)";
    else
      baseLabel += " (unchecked)";
    return baseLabel;
  }
  get computedTabIndex() {
    return this.disabled ? -1 : 0;
  }
  render() {
    return html`<div class="container" ?data-disabled=${this.disabled} data-color=${this.color}>
            <div
                class="checkbox-container"
                role="checkbox"
                aria-checked=${this.computedAriaChecked}
                aria-label=${ifDefined(this.computedAriaLabel)}
                aria-describedby=${ifDefined(this.ariaDescribedby)}
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-invalid=${this.error ? "true" : "false"}
                tabindex=${this.computedTabIndex}
                @click=${__privateMethod$8(this, _handleClick, handleClick_fn)}
                @keydown=${__privateMethod$8(this, _handleKeydown$1, handleKeydown_fn$1)}
                @focus=${__privateMethod$8(this, _handleFocus$2, handleFocus_fn$1)}
                @blur=${__privateMethod$8(this, _handleBlur$2, handleBlur_fn$2)}
            >
                <div class="box">
                    <div class="checkbox" ?data-checked=${this.checked} ?data-indeterminate=${this.indeterminate}>
                        ${this.indeterminate ? html`<mjo-icon src=${AiOutlineMinus}></mjo-icon>` : html`<mjo-icon src=${AiFillCheckSquare}></mjo-icon>`}
                    </div>
                </div>
                ${this.label ? html`<div class="label-container"><mjo-typography tag="none" class="label">${this.label}</mjo-typography></div>` : nothing}
                <input
                    id="mjoCheckboxInput"
                    type="checkbox"
                    name=${ifDefined(this.name)}
                    value=${ifDefined(this.value)}
                    ?checked=${this.checked}
                    .indeterminate=${this.indeterminate}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    aria-hidden="true"
                    tabindex="-1"
                />
            </div>
            ${this.helperText ? html`<input-helper-text>${this.helperText}</input-helper-text> ` : nothing}
            ${this.errormsg || this.successmsg ? html`<input-helper-text .errormsg=${this.errormsg} .successmsg=${this.successmsg}></input-helper-text> ` : nothing}
        </div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
  }
  getValue() {
    return this.checked ? this.value || "1" : "";
  }
  setValue(value) {
    this.value = value;
  }
  setIndeterminate(indeterminate) {
    this.indeterminate = indeterminate;
    this.inputElement.indeterminate = indeterminate;
    this.dispatchEvent(
      new CustomEvent("mjo-checkbox-indeterminate-change", {
        detail: {
          element: this,
          indeterminate: this.indeterminate,
          checked: this.checked
        },
        bubbles: true,
        composed: true
      })
    );
    this.updateFormData({ name: this.name || "", value: this.getValue() });
  }
  reportValidity() {
    return this.inputElement.reportValidity();
  }
  setCustomValidity(message) {
    this.inputElement.setCustomValidity(message);
  }
};
_handleClick = /* @__PURE__ */ new WeakSet();
handleClick_fn = function() {
  if (this.disabled)
    return;
  const previousState = {
    checked: this.checked,
    indeterminate: this.indeterminate
  };
  if (this.indeterminate) {
    this.indeterminate = false;
    this.inputElement.indeterminate = false;
  }
  this.checked = !this.checked;
  this.updateFormData({ name: this.name || "", value: this.getValue() });
  this.dispatchEvent(
    new CustomEvent("change", {
      detail: {
        element: this,
        checked: this.checked,
        indeterminate: this.indeterminate,
        value: this.value,
        name: this.name || "",
        previousState
      },
      bubbles: true,
      composed: true
    })
  );
  this.dispatchEvent(
    new CustomEvent("mjo-checkbox-change", {
      detail: {
        element: this,
        checked: this.checked,
        indeterminate: this.indeterminate,
        value: this.value,
        name: this.name || "",
        previousState
      },
      bubbles: true,
      composed: true
    })
  );
};
_handleKeydown$1 = /* @__PURE__ */ new WeakSet();
handleKeydown_fn$1 = function(event) {
  if (this.disabled)
    return;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    __privateMethod$8(this, _handleClick, handleClick_fn).call(this);
  }
};
_handleFocus$2 = /* @__PURE__ */ new WeakSet();
handleFocus_fn$1 = function() {
  if (this.disabled)
    return;
  this.dispatchEvent(
    new CustomEvent("mjo-checkbox-focus", {
      detail: {
        element: this
      },
      bubbles: true,
      composed: true
    })
  );
};
_handleBlur$2 = /* @__PURE__ */ new WeakSet();
handleBlur_fn$2 = function() {
  this.dispatchEvent(
    new CustomEvent("mjo-checkbox-blur", {
      detail: {
        element: this
      },
      bubbles: true,
      composed: true
    })
  );
};
MjoCheckbox.styles = [
  css`
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
        `
];
__decorateClass$b([
  property({ type: String })
], MjoCheckbox.prototype, "color", 2);
__decorateClass$b([
  property({ type: Boolean, reflect: true })
], MjoCheckbox.prototype, "checked", 2);
__decorateClass$b([
  property({ type: Boolean, reflect: true })
], MjoCheckbox.prototype, "disabled", 2);
__decorateClass$b([
  property({ type: Boolean, reflect: true })
], MjoCheckbox.prototype, "indeterminate", 2);
__decorateClass$b([
  property({ type: String })
], MjoCheckbox.prototype, "helperText", 2);
__decorateClass$b([
  property({ type: String })
], MjoCheckbox.prototype, "label", 2);
__decorateClass$b([
  property({ type: String })
], MjoCheckbox.prototype, "name", 2);
__decorateClass$b([
  property({ type: String })
], MjoCheckbox.prototype, "value", 2);
__decorateClass$b([
  property({ type: String, reflect: true })
], MjoCheckbox.prototype, "checkgroup", 2);
__decorateClass$b([
  property({ type: Boolean })
], MjoCheckbox.prototype, "hideErrors", 2);
__decorateClass$b([
  property({ type: String, attribute: "aria-describedby" })
], MjoCheckbox.prototype, "ariaDescribedby", 2);
__decorateClass$b([
  query("input#mjoCheckboxInput")
], MjoCheckbox.prototype, "inputElement", 2);
__decorateClass$b([
  query(".checkbox-container")
], MjoCheckbox.prototype, "checkboxContainer", 2);
MjoCheckbox = __decorateClass$b([
  customElement("mjo-checkbox")
], MjoCheckbox);
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$a(target, key, result);
  return result;
};
var __accessCheck$8 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$8 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$7 = (obj, member, method) => {
  __accessCheck$8(obj, member, "access private method");
  return method;
};
var _handleKeydown, handleKeydown_fn, _handleCloseKeydown, handleCloseKeydown_fn, _handleChipClick, handleChipClick_fn, _handleCloseClick, handleCloseClick_fn;
let MjoChip = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$8(this, _handleKeydown);
    __privateAdd$8(this, _handleCloseKeydown);
    __privateAdd$8(this, _handleChipClick);
    __privateAdd$8(this, _handleCloseClick);
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
            @click=${__privateMethod$7(this, _handleChipClick, handleChipClick_fn)}
            @keydown=${__privateMethod$7(this, _handleKeydown, handleKeydown_fn)}
        >
            ${this.variant === "dot" ? html`<span class="dot"></span>` : nothing}
            ${this.startIcon ? html`<mjo-icon src=${this.startIcon}></mjo-icon>` : nothing}
            <mjo-typography tag="span" class="label">${this.label}</mjo-typography>
            ${this.endIcon ? html`<mjo-icon src=${this.endIcon}></mjo-icon>` : nothing}
            ${this.closable ? html`<mjo-icon
                      class="close"
                      src=${AiFillCloseCircle}
                      @click=${__privateMethod$7(this, _handleCloseClick, handleCloseClick_fn)}
                      @keydown=${__privateMethod$7(this, _handleCloseKeydown, handleCloseKeydown_fn)}
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
    __privateMethod$7(this, _handleCloseClick, handleCloseClick_fn).call(this, event);
  }
  if ((event.key === "Enter" || event.key === " ") && this.clickable) {
    event.preventDefault();
    __privateMethod$7(this, _handleChipClick, handleChipClick_fn).call(this);
  }
};
_handleCloseKeydown = /* @__PURE__ */ new WeakSet();
handleCloseKeydown_fn = function(event) {
  if (this.disabled)
    return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.stopPropagation();
    __privateMethod$7(this, _handleCloseClick, handleCloseClick_fn).call(this, event);
  }
};
_handleChipClick = /* @__PURE__ */ new WeakSet();
handleChipClick_fn = async function() {
  if (!this.clickable || this.disabled)
    return;
  this.dispatchEvent(
    new CustomEvent("mjo-chip-click", {
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
    new CustomEvent("mjo-chip-close", {
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
__decorateClass$a([
  property({ type: Boolean })
], MjoChip.prototype, "closable", 2);
__decorateClass$a([
  property({ type: Boolean })
], MjoChip.prototype, "clickable", 2);
__decorateClass$a([
  property({ type: Boolean })
], MjoChip.prototype, "disabled", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "color", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "endIcon", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "label", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "radius", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "size", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "startIcon", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "value", 2);
__decorateClass$a([
  property({ type: String })
], MjoChip.prototype, "variant", 2);
__decorateClass$a([
  property({ type: String, attribute: "aria-describedby" })
], MjoChip.prototype, "ariaDescribedby", 2);
__decorateClass$a([
  query(".container")
], MjoChip.prototype, "container", 2);
MjoChip = __decorateClass$a([
  customElement("mjo-chip")
], MjoChip);
function parseHexToRgb(hex) {
  const cleanHex = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16)
  };
}
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function rgbToHwb(r, g, b) {
  const hsl = rgbToHsl(r, g, b);
  r /= 255;
  g /= 255;
  b /= 255;
  const w = Math.min(r, g, b) * 100;
  const bl = (1 - Math.max(r, g, b)) * 100;
  return { h: hsl.h, w, b: bl };
}
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  const hue2rgb = (p2, q2, t) => {
    if (t < 0)
      t += 1;
    if (t > 1)
      t -= 1;
    if (t < 1 / 6)
      return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2)
      return q2;
    if (t < 2 / 3)
      return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    return p2;
  };
  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
  };
}
function hwbToRgb(h, w, b) {
  w /= 100;
  b /= 100;
  if (w + b >= 1) {
    const gray = Math.round(w / (w + b) * 255);
    return { r: gray, g: gray, b: gray };
  }
  const rgb = hslToRgb(h, 100, 50);
  return {
    r: Math.round((rgb.r / 255 * (1 - w - b) + w) * 255),
    g: Math.round((rgb.g / 255 * (1 - w - b) + w) * 255),
    b: Math.round((rgb.b / 255 * (1 - w - b) + w) * 255)
  };
}
function rgbToHex(r, g, b) {
  const toHex2 = (n) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
}
function parseRgbString(rgbString) {
  const match = rgbString.match(/rgba?\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Invalid RGB string: ${rgbString}`);
  }
  const values = match[1].split(",").map((v) => parseFloat(v.trim()));
  if (values.length < 3 || values.length > 4) {
    throw new Error(`Invalid RGB string: ${rgbString}`);
  }
  const result = {
    r: values[0],
    g: values[1],
    b: values[2]
  };
  if (values.length === 4) {
    result.a = values[3];
  }
  return result;
}
function parseHslString(hslString) {
  const match = hslString.match(/hsla?\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Invalid HSL string: ${hslString}`);
  }
  const values = match[1].split(",").map((v, i) => {
    const trimmed = v.trim();
    if (i === 0)
      return parseFloat(trimmed);
    return parseFloat(trimmed.replace("%", ""));
  });
  if (values.length < 3 || values.length > 4) {
    throw new Error(`Invalid HSL string: ${hslString}`);
  }
  const result = {
    h: values[0],
    s: values[1],
    l: values[2]
  };
  if (values.length === 4) {
    result.a = values[3];
  }
  return result;
}
function parseHwbString(hwbString) {
  const match = hwbString.match(/hwb\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Invalid HWB string: ${hwbString}`);
  }
  const values = match[1].split(/\s+/).map((v, i) => {
    if (i === 0)
      return parseFloat(v);
    return parseFloat(v.replace("%", ""));
  });
  if (values.length !== 3) {
    throw new Error(`Invalid HWB string: ${hwbString}`);
  }
  return {
    h: values[0],
    w: values[1],
    b: values[2]
  };
}
function toHex(color, sourceFormat) {
  if (!sourceFormat) {
    sourceFormat = detectColorFormat(color);
  }
  switch (sourceFormat) {
    case "hex":
      return color.startsWith("#") ? color : `#${color}`;
    case "rgb":
    case "rgba": {
      const rgb = parseRgbString(color);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    case "hsl":
    case "hsla": {
      const hsl = parseHslString(color);
      const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    case "hwb": {
      const hwb = parseHwbString(color);
      const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    default:
      throw new Error(`Unsupported color format: ${sourceFormat}`);
  }
}
function toRgb(color, sourceFormat) {
  if (!sourceFormat) {
    sourceFormat = detectColorFormat(color);
  }
  switch (sourceFormat) {
    case "hex": {
      const rgb = parseHexToRgb(color);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "rgb":
      return color;
    case "rgba": {
      const rgb = parseRgbString(color);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "hsl":
    case "hsla": {
      const hsl = parseHslString(color);
      const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "hwb": {
      const hwb = parseHwbString(color);
      const rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    default:
      throw new Error(`Unsupported color format: ${sourceFormat}`);
  }
}
function toRgba(color, alpha = 1, sourceFormat) {
  const rgbString = toRgb(color, sourceFormat);
  const rgb = parseRgbString(rgbString);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
function toHsl(color, sourceFormat) {
  if (!sourceFormat) {
    sourceFormat = detectColorFormat(color);
  }
  let rgb;
  switch (sourceFormat) {
    case "hex":
      rgb = parseHexToRgb(color);
      break;
    case "rgb":
    case "rgba":
      rgb = parseRgbString(color);
      break;
    case "hsl":
      return color;
    case "hsla": {
      const hsl2 = parseHslString(color);
      return `hsl(${Math.round(hsl2.h)}, ${Math.round(hsl2.s)}%, ${Math.round(hsl2.l)}%)`;
    }
    case "hwb": {
      const hwb = parseHwbString(color);
      rgb = hwbToRgb(hwb.h, hwb.w, hwb.b);
      break;
    }
    default:
      throw new Error(`Unsupported color format: ${sourceFormat}`);
  }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}
function toHsla(color, alpha = 1, sourceFormat) {
  const hslString = toHsl(color, sourceFormat);
  const hsl = parseHslString(hslString);
  return `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${alpha})`;
}
function toHwb(color, sourceFormat) {
  if (!sourceFormat) {
    sourceFormat = detectColorFormat(color);
  }
  let rgb;
  switch (sourceFormat) {
    case "hex":
      rgb = parseHexToRgb(color);
      break;
    case "rgb":
    case "rgba":
      rgb = parseRgbString(color);
      break;
    case "hsl":
    case "hsla": {
      const hsl = parseHslString(color);
      rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      break;
    }
    case "hwb":
      return color;
    default:
      throw new Error(`Unsupported color format: ${sourceFormat}`);
  }
  const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
  return `hwb(${Math.round(hwb.h)} ${Math.round(hwb.w)}% ${Math.round(hwb.b)}%)`;
}
function convertColor(color, targetFormat, sourceFormat, alpha) {
  switch (targetFormat) {
    case "hex":
      return toHex(color, sourceFormat);
    case "rgb":
      return toRgb(color, sourceFormat);
    case "rgba":
      return toRgba(color, alpha, sourceFormat);
    case "hsl":
      return toHsl(color, sourceFormat);
    case "hsla":
      return toHsla(color, alpha, sourceFormat);
    case "hwb":
      return toHwb(color, sourceFormat);
    default:
      throw new Error(`Unsupported target format: ${targetFormat}`);
  }
}
function detectColorFormat(color) {
  const trimmed = color.trim().toLowerCase();
  if (trimmed.startsWith("#") || /^[0-9a-f]{6}$/i.test(trimmed)) {
    return "hex";
  }
  if (trimmed.startsWith("rgb(")) {
    return "rgb";
  }
  if (trimmed.startsWith("rgba(")) {
    return "rgba";
  }
  if (trimmed.startsWith("hsl(")) {
    return "hsl";
  }
  if (trimmed.startsWith("hsla(")) {
    return "hsla";
  }
  if (trimmed.startsWith("hwb(")) {
    return "hwb";
  }
  throw new Error(`Cannot detect color format for: ${color}`);
}
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$9(target, key, result);
  return result;
};
let MjoTextNowrap = class extends LitElement {
  render() {
    return html`<div>
            <div>
                <slot></slot>
            </div>
        </div>`;
  }
};
MjoTextNowrap.styles = [
  css`
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
        `
];
MjoTextNowrap = __decorateClass$9([
  customElement("mjo-text-nowrap")
], MjoTextNowrap);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$8(target, key, result);
  return result;
};
let InputLabel = class extends LitElement {
  constructor() {
    super(...arguments);
    this.focused = false;
    this.error = false;
    this.color = "primary";
  }
  render() {
    return html`${this.label ? html`<div class="container" data-color=${this.color} ?data-focused=${this.focused} ?data-error=${this.error}>
                  <mjo-text-nowrap>${this.label}</mjo-text-nowrap>
              </div>` : nothing}`;
  }
};
InputLabel.styles = [
  css`
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
        `
];
__decorateClass$8([
  property({ type: Boolean })
], InputLabel.prototype, "focused", 2);
__decorateClass$8([
  property({ type: Boolean })
], InputLabel.prototype, "error", 2);
__decorateClass$8([
  property({ type: String })
], InputLabel.prototype, "label", 2);
__decorateClass$8([
  property({ type: String })
], InputLabel.prototype, "color", 2);
InputLabel = __decorateClass$8([
  customElement("input-label")
], InputLabel);
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
var __accessCheck$7 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd$7 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$6 = (obj, member, method) => {
  __accessCheck$7(obj, member, "access private method");
  return method;
};
var _announceColorChange, announceColorChange_fn, _handleInput$1, handleInput_fn, _handleChange, handleChange_fn, _handleFocus$1, handleFocus_fn, _handleBlur$1, handleBlur_fn$1, _handleFormatChange, handleFormatChange_fn, _updateVisualColor, updateVisualColor_fn, _updateAriaInvalid, updateAriaInvalid_fn;
let MjoColorPicker = class extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) {
  constructor() {
    super(...arguments);
    __privateAdd$7(this, _announceColorChange);
    __privateAdd$7(this, _handleInput$1);
    __privateAdd$7(this, _handleChange);
    __privateAdd$7(this, _handleFocus$1);
    __privateAdd$7(this, _handleBlur$1);
    __privateAdd$7(this, _handleFormatChange);
    __privateAdd$7(this, _updateVisualColor);
    __privateAdd$7(this, _updateAriaInvalid);
    this.color = "primary";
    this.disabled = false;
    this.value = "";
    this.hideErrors = false;
    this.rounded = false;
    this.size = "medium";
    this.format = "hex";
    this.showValue = false;
    this.ariaDescribedBy = null;
    this.type = "colorpicker";
  }
  get computedAriaLabel() {
    if (this.ariaLabel)
      return this.ariaLabel;
    if (this.label)
      return this.label;
    return "Color picker";
  }
  get computedAriaInvalid() {
    if (this.error || this.errormsg)
      return "true";
    return this.ariaInvalid;
  }
  get computedAriaDescribedBy() {
    const describedBy = [];
    if (this.ariaDescribedBy) {
      describedBy.push(this.ariaDescribedBy);
    }
    if (this.helperText && !this.errormsg && !this.successmsg) {
      describedBy.push("helper-text");
    }
    return describedBy.length > 0 ? describedBy.join(" ") : void 0;
  }
  render() {
    return html`
            ${this.label ? html`<input-label color=${this.color} label=${this.label} ?error=${this.error} ?data-disabled=${this.disabled}></input-label>` : nothing}
            <div class="container" ?data-rounded=${this.rounded} data-size=${this.size} ?data-disabled=${this.disabled}>
                <div class="color-picker" role="presentation" aria-hidden="true"></div>
                <input
                    @change=${__privateMethod$6(this, _handleChange, handleChange_fn)}
                    @input=${__privateMethod$6(this, _handleInput$1, handleInput_fn)}
                    @focus=${__privateMethod$6(this, _handleFocus$1, handleFocus_fn)}
                    @blur=${__privateMethod$6(this, _handleBlur$1, handleBlur_fn$1)}
                    type="color"
                    name=${ifDefined(this.name)}
                    ?disabled=${this.disabled}
                    value=${this.value}
                    aria-label=${this.computedAriaLabel}
                    aria-errormessage=${this.errormsg || nothing}
                    aria-invalid=${ifDefined(this.computedAriaInvalid)}
                    aria-required=${ifDefined(this.required)}
                    aria-describedby=${ifDefined(this.computedAriaDescribedBy)}
                />
            </div>
            ${this.showValue ? html`<div class="value-display" aria-live="polite">${this.getFormattedValue(this.format)}</div>` : nothing}
            ${this.helperText || this.errormsg || this.successmsg ? html`<input-helper-text errormsg=${ifDefined(this.errormsg)} successmsg=${ifDefined(this.successmsg)}>${this.helperText}</input-helper-text>` : nothing}
        `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateFormData({ name: this.name || "", value: this.value });
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.colorPicker.style.backgroundColor = this.inputElement.value || this.value;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("format") && changedProperties.get("format") !== void 0) {
      __privateMethod$6(this, _handleFormatChange, handleFormatChange_fn).call(this, changedProperties.get("format"));
    }
    if (changedProperties.has("value")) {
      this.colorPicker.style.backgroundColor = this.value;
      __privateMethod$6(this, _updateAriaInvalid, updateAriaInvalid_fn).call(this);
    }
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    try {
      this.value = convertColor(value, this.format);
      __privateMethod$6(this, _updateVisualColor, updateVisualColor_fn).call(this);
    } catch (error) {
      console.warn(`Failed to convert color ${this.value} to format ${this.format}:`, error);
      return this.value;
    }
  }
  getFormattedValue(format) {
    if (!this.value)
      return "";
    try {
      return convertColor(this.value, format);
    } catch (error) {
      console.warn(`Failed to convert color ${this.value} to format ${format}:`, error);
      return this.value;
    }
  }
};
_announceColorChange = /* @__PURE__ */ new WeakSet();
announceColorChange_fn = function() {
  if (!this.value)
    return;
  const announcement = `Color changed to ${this.getFormattedValue(this.format)}`;
  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.style.position = "absolute";
  liveRegion.style.left = "-10000px";
  liveRegion.style.width = "1px";
  liveRegion.style.height = "1px";
  liveRegion.style.overflow = "hidden";
  liveRegion.textContent = announcement;
  document.body.appendChild(liveRegion);
  setTimeout(() => document.body.removeChild(liveRegion), 1e3);
};
_handleInput$1 = /* @__PURE__ */ new WeakSet();
handleInput_fn = function(event) {
  const target = event.currentTarget;
  this.colorPicker.style.backgroundColor = target.value;
  this.value = convertColor(target.value, this.format);
  this.updateFormData({ name: this.name || "", value: this.value });
  __privateMethod$6(this, _announceColorChange, announceColorChange_fn).call(this);
  this.dispatchEvent(
    new CustomEvent("mjo-color-input", {
      detail: {
        element: this,
        value: this.value,
        format: this.format
      },
      bubbles: true
    })
  );
};
_handleChange = /* @__PURE__ */ new WeakSet();
handleChange_fn = function() {
  __privateMethod$6(this, _updateAriaInvalid, updateAriaInvalid_fn).call(this);
  this.dispatchEvent(new Event("change"));
  this.dispatchEvent(
    new CustomEvent("mjo-color-change", {
      detail: {
        element: this,
        value: this.value,
        format: this.format
      },
      bubbles: true
    })
  );
};
_handleFocus$1 = /* @__PURE__ */ new WeakSet();
handleFocus_fn = function() {
  this.dispatchEvent(
    new CustomEvent("mjo-color-focus", {
      detail: { element: this },
      bubbles: true
    })
  );
};
_handleBlur$1 = /* @__PURE__ */ new WeakSet();
handleBlur_fn$1 = function() {
  this.dispatchEvent(
    new CustomEvent("mjo-color-blur", {
      detail: { element: this },
      bubbles: true
    })
  );
};
_handleFormatChange = /* @__PURE__ */ new WeakSet();
handleFormatChange_fn = function(previousFormat) {
  this.dispatchEvent(
    new CustomEvent("mjo-color-format-change", {
      detail: {
        element: this,
        format: this.format,
        previousFormat,
        value: this.value
      },
      bubbles: true
    })
  );
};
_updateVisualColor = /* @__PURE__ */ new WeakSet();
updateVisualColor_fn = function() {
  if (this.colorPicker) {
    this.colorPicker.style.backgroundColor = this.getFormattedValue("hex");
  }
  if (this.inputElement) {
    this.inputElement.value = this.getFormattedValue("hex");
  }
};
_updateAriaInvalid = /* @__PURE__ */ new WeakSet();
updateAriaInvalid_fn = function() {
  if (this.error || this.errormsg) {
    this.ariaInvalid = "true";
  } else {
    this.ariaInvalid = "false";
  }
};
MjoColorPicker.styles = [
  css`
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
        `
];
__decorateClass$7([
  property({ type: String })
], MjoColorPicker.prototype, "color", 2);
__decorateClass$7([
  property({ type: Boolean, reflect: true })
], MjoColorPicker.prototype, "disabled", 2);
__decorateClass$7([
  property({ type: String })
], MjoColorPicker.prototype, "helperText", 2);
__decorateClass$7([
  property({ type: String })
], MjoColorPicker.prototype, "label", 2);
__decorateClass$7([
  property({ type: String })
], MjoColorPicker.prototype, "name", 2);
__decorateClass$7([
  property({ type: String })
], MjoColorPicker.prototype, "value", 2);
__decorateClass$7([
  property({ type: Boolean })
], MjoColorPicker.prototype, "hideErrors", 2);
__decorateClass$7([
  property({ type: Boolean })
], MjoColorPicker.prototype, "rounded", 2);
__decorateClass$7([
  property({ type: String })
], MjoColorPicker.prototype, "size", 2);
__decorateClass$7([
  property({ type: String })
], MjoColorPicker.prototype, "format", 2);
__decorateClass$7([
  property({ type: Boolean })
], MjoColorPicker.prototype, "showValue", 2);
__decorateClass$7([
  property({ type: String, attribute: "aria-describedby" })
], MjoColorPicker.prototype, "ariaDescribedBy", 2);
__decorateClass$7([
  query("input")
], MjoColorPicker.prototype, "inputElement", 2);
__decorateClass$7([
  query(".color-picker")
], MjoColorPicker.prototype, "colorPicker", 2);
MjoColorPicker = __decorateClass$7([
  customElement("mjo-color-picker")
], MjoColorPicker);
const PiCalendarDotsLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M208,34H182V24a6,6,0,0,0-12,0V34H86V24a6,6,0,0,0-12,0V34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM48,46H74V56a6,6,0,0,0,12,0V46h84V56a6,6,0,0,0,12,0V46h26a2,2,0,0,1,2,2V82H46V48A2,2,0,0,1,48,46ZM208,210H48a2,2,0,0,1-2-2V94H210V208A2,2,0,0,1,208,210Zm-70-78a10,10,0,1,1-10-10A10,10,0,0,1,138,132Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,182,132ZM94,172a10,10,0,1,1-10-10A10,10,0,0,1,94,172Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,138,172Zm44,0a10,10,0,1,1-10-10A10,10,0,0,1,182,172Z"></path></svg>`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const notifyChildrenConnectedChanged = (parent, isConnected) => {
  var _a2;
  const children = parent._$disconnectableChildren;
  if (children === void 0) {
    return false;
  }
  for (const obj of children) {
    (_a2 = obj["_$notifyDirectiveConnectionChanged"]) == null ? void 0 : _a2.call(obj, isConnected, false);
    notifyChildrenConnectedChanged(obj, isConnected);
  }
  return true;
};
const removeDisconnectableFromParent = (obj) => {
  let parent, children;
  do {
    if ((parent = obj._$parent) === void 0) {
      break;
    }
    children = parent._$disconnectableChildren;
    children.delete(obj);
    obj = parent;
  } while ((children == null ? void 0 : children.size) === 0);
};
const addDisconnectableToParent = (obj) => {
  for (let parent; parent = obj._$parent; obj = parent) {
    let children = parent._$disconnectableChildren;
    if (children === void 0) {
      parent._$disconnectableChildren = children = /* @__PURE__ */ new Set();
    } else if (children.has(obj)) {
      break;
    }
    children.add(obj);
    installDisconnectAPI(parent);
  }
};
function reparentDisconnectables(newParent) {
  if (this._$disconnectableChildren !== void 0) {
    removeDisconnectableFromParent(this);
    this._$parent = newParent;
    addDisconnectableToParent(this);
  } else {
    this._$parent = newParent;
  }
}
function notifyChildPartConnectedChanged(isConnected, isClearingValue = false, fromPartIndex = 0) {
  const value = this._$committedValue;
  const children = this._$disconnectableChildren;
  if (children === void 0 || children.size === 0) {
    return;
  }
  if (isClearingValue) {
    if (Array.isArray(value)) {
      for (let i = fromPartIndex; i < value.length; i++) {
        notifyChildrenConnectedChanged(value[i], false);
        removeDisconnectableFromParent(value[i]);
      }
    } else if (value != null) {
      notifyChildrenConnectedChanged(value, false);
      removeDisconnectableFromParent(value);
    }
  } else {
    notifyChildrenConnectedChanged(this, isConnected);
  }
}
const installDisconnectAPI = (obj) => {
  if (obj.type == PartType.CHILD) {
    obj._$notifyConnectionChanged ?? (obj._$notifyConnectionChanged = notifyChildPartConnectedChanged);
    obj._$reparentDisconnectables ?? (obj._$reparentDisconnectables = reparentDisconnectables);
  }
};
class AsyncDirective extends Directive {
  constructor() {
    super(...arguments);
    this._$disconnectableChildren = void 0;
  }
  /**
   * Initialize the part with internal fields
   * @param part
   * @param parent
   * @param attributeIndex
   */
  _$initialize(part, parent, attributeIndex) {
    super._$initialize(part, parent, attributeIndex);
    addDisconnectableToParent(this);
    this.isConnected = part._$isConnected;
  }
  // This property needs to remain unminified.
  /**
   * Called from the core code when a directive is going away from a part (in
   * which case `shouldRemoveFromParent` should be true), and from the
   * `setChildrenConnected` helper function when recursively changing the
   * connection state of a tree (in which case `shouldRemoveFromParent` should
   * be false).
   *
   * @param isConnected
   * @param isClearingDirective - True when the directive itself is being
   *     removed; false when the tree is being disconnected
   * @internal
   */
  ["_$notifyDirectiveConnectionChanged"](isConnected, isClearingDirective = true) {
    var _a2, _b2;
    if (isConnected !== this.isConnected) {
      this.isConnected = isConnected;
      if (isConnected) {
        (_a2 = this.reconnected) == null ? void 0 : _a2.call(this);
      } else {
        (_b2 = this.disconnected) == null ? void 0 : _b2.call(this);
      }
    }
    if (isClearingDirective) {
      notifyChildrenConnectedChanged(this, isConnected);
      removeDisconnectableFromParent(this);
    }
  }
  /**
   * Sets the value of the directive's Part outside the normal `update`/`render`
   * lifecycle of a directive.
   *
   * This method should not be called synchronously from a directive's `update`
   * or `render`.
   *
   * @param directive The directive to update
   * @param value The value to set
   */
  setValue(value) {
    if (isSingleExpression(this.__part)) {
      this.__part._$setValue(value, this);
    } else {
      if (this.__attributeIndex === void 0) {
        throw new Error(`Expected this.__attributeIndex to be a number`);
      }
      const newValues = [...this.__part._$committedValue];
      newValues[this.__attributeIndex] = value;
      this.__part._$setValue(newValues, this, 0);
    }
  }
  /**
   * User callbacks for implementing logic to release any resources/subscriptions
   * that may have been retained by this directive. Since directives may also be
   * re-connected, `reconnected` should also be implemented to restore the
   * working state of the directive prior to the next render.
   */
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const createRef = () => new Ref();
class Ref {
}
const lastElementForContextAndCallback = /* @__PURE__ */ new WeakMap();
class RefDirective extends AsyncDirective {
  render(_ref) {
    return nothing;
  }
  update(part, [ref2]) {
    var _a2;
    const refChanged = ref2 !== this._ref;
    if (refChanged && this._ref !== void 0) {
      this._updateRefValue(void 0);
    }
    if (refChanged || this._lastElementForRef !== this._element) {
      this._ref = ref2;
      this._context = (_a2 = part.options) == null ? void 0 : _a2.host;
      this._updateRefValue(this._element = part.element);
    }
    return nothing;
  }
  _updateRefValue(element) {
    if (!this.isConnected) {
      element = void 0;
    }
    if (typeof this._ref === "function") {
      const context = this._context ?? globalThis;
      let lastElementForCallback = lastElementForContextAndCallback.get(context);
      if (lastElementForCallback === void 0) {
        lastElementForCallback = /* @__PURE__ */ new WeakMap();
        lastElementForContextAndCallback.set(context, lastElementForCallback);
      }
      if (lastElementForCallback.get(this._ref) !== void 0) {
        this._ref.call(this._context, void 0);
      }
      lastElementForCallback.set(this._ref, element);
      if (element !== void 0) {
        this._ref.call(this._context, element);
      }
    } else {
      this._ref.value = element;
    }
  }
  get _lastElementForRef() {
    var _a2, _b2;
    return typeof this._ref === "function" ? (_a2 = lastElementForContextAndCallback.get(this._context ?? globalThis)) == null ? void 0 : _a2.get(this._ref) : (_b2 = this._ref) == null ? void 0 : _b2.value;
  }
  disconnected() {
    if (this._lastElementForRef === this._element) {
      this._updateRefValue(void 0);
    }
  }
  reconnected() {
    this._updateRefValue(this._element);
  }
}
const ref = directive(RefDirective);
const DROPDOWN_MARGIN = 15;
const getTopInTopPosition = ({ dropDown, container }) => {
  let top = container.getBoundingClientRect().top + window.scrollY - dropDown.offsetHeight - 5;
  if (dropDown.offsetHeight >= window.innerHeight - DROPDOWN_MARGIN * 2) {
    dropDown.style.maxHeight = `${window.innerHeight - DROPDOWN_MARGIN * 2}px`;
    return window.scrollY + DROPDOWN_MARGIN;
  } else {
    dropDown.style.maxHeight = "";
  }
  if (top < window.scrollY) {
    top = container.getBoundingClientRect().top + window.scrollY + container.offsetHeight + 5;
    if (top + dropDown.offsetHeight > window.innerHeight + window.scrollY) {
      return window.scrollY + DROPDOWN_MARGIN;
    }
    return getTopInBottomPosition({ dropDown, container });
  }
  return top;
};
const getTopInBottomPosition = ({ dropDown, container }) => {
  let top = container.getBoundingClientRect().top + window.scrollY + container.offsetHeight + 5;
  if (dropDown.offsetHeight >= window.innerHeight - DROPDOWN_MARGIN * 2) {
    dropDown.style.maxHeight = `${window.innerHeight - DROPDOWN_MARGIN * 2}px`;
    return window.scrollY + DROPDOWN_MARGIN;
  } else {
    dropDown.style.maxHeight = "";
  }
  if (top + dropDown.offsetHeight > window.innerHeight + window.scrollY) {
    top = container.getBoundingClientRect().top + window.scrollY - dropDown.offsetHeight - 5;
    if (top < window.scrollY) {
      return window.scrollY + DROPDOWN_MARGIN;
    }
    return getTopInTopPosition({ dropDown, container });
  }
  return top;
};
const getTopInMiddlePosition = ({ dropDown, container }) => {
  const top = container.getBoundingClientRect().top + window.scrollY + container.offsetHeight / 2 - dropDown.offsetHeight / 2;
  if (dropDown.offsetHeight >= window.innerHeight - DROPDOWN_MARGIN * 2) {
    dropDown.style.maxHeight = `${window.innerHeight - DROPDOWN_MARGIN * 2}px`;
    return window.scrollY + DROPDOWN_MARGIN;
  } else {
    dropDown.style.maxHeight = "";
  }
  if (top < window.scrollY)
    return 0;
  if (top + dropDown.offsetHeight > window.innerHeight + window.scrollY) {
    return window.innerHeight + window.scrollY - dropDown.offsetHeight;
  }
  return top;
};
const getLeftInLeftPosition = ({ dropDown, container }) => {
  let left = container.getBoundingClientRect().left + window.scrollX - dropDown.offsetWidth - 5;
  if (dropDown.offsetWidth >= window.innerWidth - DROPDOWN_MARGIN * 2)
    return DROPDOWN_MARGIN;
  if (left < window.scrollX) {
    left = container.getBoundingClientRect().left + window.scrollX + container.offsetWidth + 5;
    if (left + dropDown.offsetWidth > window.innerWidth + window.scrollX) {
      return DROPDOWN_MARGIN;
    }
    return getLeftInRightPosition({ dropDown, container });
  }
  return left;
};
const getLeftInCenterPOsition = ({ dropDown, container }) => {
  const left = container.getBoundingClientRect().left + window.scrollX + container.offsetWidth / 2 - dropDown.offsetWidth / 2;
  if (dropDown.offsetWidth >= window.innerWidth - DROPDOWN_MARGIN * 2)
    return DROPDOWN_MARGIN;
  if (left < window.scrollX)
    return 0;
  if (left + dropDown.offsetWidth > window.innerWidth + window.scrollX) {
    return window.innerWidth - dropDown.offsetWidth;
  }
  return left;
};
const getLeftInRightPosition = ({ dropDown, container }) => {
  let left = container.getBoundingClientRect().left + window.scrollX + container.offsetWidth + 5;
  if (dropDown.offsetWidth >= window.innerWidth - DROPDOWN_MARGIN * 2)
    return DROPDOWN_MARGIN;
  if (left + dropDown.offsetWidth > window.innerWidth + window.scrollX) {
    left = container.getBoundingClientRect().left + window.scrollX - dropDown.offsetWidth - 5;
    if (left < window.scrollX) {
      return DROPDOWN_MARGIN;
    }
    return getLeftInLeftPosition({ dropDown, container });
  }
  return left;
};
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
var __accessCheck$6 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$4 = (obj, member, getter) => {
  __accessCheck$6(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$6 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$1 = (obj, member, value, setter) => {
  __accessCheck$6(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod$5 = (obj, member, method) => {
  __accessCheck$6(obj, member, "access private method");
  return method;
};
var _scrollElements, _listeners$1, _addPreventScroll, addPreventScroll_fn, _removePreventScroll, removePreventScroll_fn, _handleScroll, handleScroll_fn, _preventWheel, preventWheel_fn, _getScrollbarElements, getScrollbarElements_fn;
let DropdowContainer = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$6(this, _addPreventScroll);
    __privateAdd$6(this, _removePreventScroll);
    __privateAdd$6(this, _handleScroll);
    __privateAdd$6(this, _preventWheel);
    __privateAdd$6(this, _getScrollbarElements);
    this.position = "center-bottom";
    this.preventScroll = false;
    __privateAdd$6(this, _scrollElements, []);
    __privateAdd$6(this, _listeners$1, {
      scroll: (ev) => {
        __privateMethod$5(this, _handleScroll, handleScroll_fn).call(this, ev);
      },
      wheel: (ev) => {
        __privateMethod$5(this, _preventWheel, preventWheel_fn).call(this, ev);
      },
      resize: () => {
        this.updatePosition();
      }
    });
  }
  render() {
    return html`${this.css ? html`<style type="text/css">
                  ${this.css.toString().replace(/\s+/g, " ")}
              </style>` : nothing}${this.html ? html`<div class="container">${this.html}</div>` : nothing}`;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.height)
      this.style.maxHeight = this.height;
    window.addEventListener("resize", __privateGet$4(this, _listeners$1).resize);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", __privateGet$4(this, _listeners$1).resize);
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (this.offsetHeight > 0)
      this.updatePosition();
  }
  close() {
    __privateSet$1(this, _scrollElements, []);
    __privateMethod$5(this, _removePreventScroll, removePreventScroll_fn).call(this);
    this.style.transform = "scale(0.7)";
    this.style.opacity = "0";
    setTimeout(() => {
      this.style.display = "";
      this.style.transition = "";
      this.style.transform = "";
    }, 210);
  }
  open() {
    __privateMethod$5(this, _addPreventScroll, addPreventScroll_fn).call(this);
    this.style.display = "block";
    this.style.transition = "opacity 0.1s ease-in, transform 0.1s ease-in";
    this.style.transform = "scale(0.7)";
    if (this.width)
      this.style.minWidth = this.width;
    setTimeout(() => {
      this.updatePosition();
      this.style.transform = "scale(1)";
      this.style.opacity = "1";
    }, 5);
  }
  scrollToTop(top) {
    this.scrollTo({
      top
    });
  }
  getScroll() {
    return {
      top: this.scrollTop,
      left: this.scrollLeft
    };
  }
  updatePosition() {
    if (this.offsetHeight === 0 || !this.host)
      return;
    const container = this.host;
    const [x, y] = this.position.split("-");
    const left = x === "left" ? getLeftInLeftPosition({ dropDown: this, container }) : x === "center" ? getLeftInCenterPOsition({ dropDown: this, container }) : getLeftInRightPosition({ dropDown: this, container });
    const top = y === "bottom" ? getTopInBottomPosition({ dropDown: this, container }) : y === "middle" ? getTopInMiddlePosition({ dropDown: this, container }) : getTopInTopPosition({ dropDown: this, container });
    this.style.top = `${top}px`;
    this.style.left = `${left}px`;
  }
};
_scrollElements = /* @__PURE__ */ new WeakMap();
_listeners$1 = /* @__PURE__ */ new WeakMap();
_addPreventScroll = /* @__PURE__ */ new WeakSet();
addPreventScroll_fn = function() {
  __privateMethod$5(this, _getScrollbarElements, getScrollbarElements_fn).call(this);
  __privateGet$4(this, _scrollElements).forEach(({ element }) => {
    element.addEventListener("scroll", __privateGet$4(this, _listeners$1).scroll);
  });
  if (this.preventScroll)
    document.addEventListener("wheel", __privateGet$4(this, _listeners$1).wheel, { passive: false });
};
_removePreventScroll = /* @__PURE__ */ new WeakSet();
removePreventScroll_fn = function() {
  __privateGet$4(this, _scrollElements).forEach(({ element }) => {
    element.removeEventListener("scroll", __privateGet$4(this, _listeners$1).scroll);
  });
  document.removeEventListener("wheel", __privateGet$4(this, _listeners$1).wheel);
};
_handleScroll = /* @__PURE__ */ new WeakSet();
handleScroll_fn = function(ev) {
  const target = ev.currentTarget;
  if (this.preventScroll) {
    for (const { element, scrollTop } of __privateGet$4(this, _scrollElements)) {
      if (element !== target)
        continue;
      if (element === window) {
        window.scrollTo(0, scrollTop);
      } else {
        element.scrollTop = scrollTop;
      }
    }
  } else {
    this.updatePosition();
  }
};
_preventWheel = /* @__PURE__ */ new WeakSet();
preventWheel_fn = function(ev) {
  if (ev.target !== this)
    ev.preventDefault();
};
_getScrollbarElements = /* @__PURE__ */ new WeakSet();
getScrollbarElements_fn = function() {
  var _a2;
  __privateSet$1(this, _scrollElements, []);
  let element = this.host;
  while (element) {
    if (element.scrollHeight > element.clientHeight) {
      if (element.tagName === "HTML") {
        element = window;
        __privateGet$4(this, _scrollElements).push({ element, scrollTop: element.scrollY });
      } else {
        __privateGet$4(this, _scrollElements).push({ element, scrollTop: element.scrollTop });
      }
    }
    element = ((_a2 = element.parentNode) == null ? void 0 : _a2.host) ?? element.parentNode;
  }
};
DropdowContainer.styles = [
  css`
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
        `
];
__decorateClass$6([
  property({ type: Object })
], DropdowContainer.prototype, "css", 2);
__decorateClass$6([
  property({ type: Object })
], DropdowContainer.prototype, "html", 2);
__decorateClass$6([
  property({ type: String })
], DropdowContainer.prototype, "position", 2);
__decorateClass$6([
  property({ type: Boolean })
], DropdowContainer.prototype, "preventScroll", 2);
__decorateClass$6([
  property({ type: String })
], DropdowContainer.prototype, "width", 2);
__decorateClass$6([
  property({ type: String })
], DropdowContainer.prototype, "height", 2);
DropdowContainer = __decorateClass$6([
  customElement("dropdow-container")
], DropdowContainer);
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
var __accessCheck$5 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$3 = (obj, member, getter) => {
  __accessCheck$5(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$5 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod$4 = (obj, member, method) => {
  __accessCheck$5(obj, member, "access private method");
  return method;
};
var _listeners, _setListeners, setListeners_fn, _removeListeners, removeListeners_fn, _open, open_fn, _close, close_fn, _createDropdown, createDropdown_fn;
const convertToPx = (value) => {
  if (value === null)
    return value;
  return isNaN(Number(value)) ? value : `${value}px`;
};
let MjoDropdown = class extends ThemeMixin(LitElement) {
  constructor() {
    super(...arguments);
    __privateAdd$5(this, _setListeners);
    __privateAdd$5(this, _removeListeners);
    __privateAdd$5(this, _open);
    __privateAdd$5(this, _close);
    __privateAdd$5(this, _createDropdown);
    this.fullwidth = false;
    this.disabled = false;
    this.preventScroll = false;
    this.isOpen = false;
    this.behaviour = "hover";
    this.preventCloseOnInnerClick = false;
    this.openTimestamp = 0;
    __privateAdd$5(this, _listeners, {
      open: (ev) => {
        var _a2;
        if (this.behaviour === "click" && (ev == null ? void 0 : ev.type) === "click" && ((_a2 = this.suppressOpenSelectors) == null ? void 0 : _a2.length)) {
          const path = ev.composedPath();
          if (path.some((n) => {
            const el = n;
            if (!el || !el.matches)
              return false;
            return this.suppressOpenSelectors.some((sel) => {
              try {
                return el.matches(sel);
              } catch {
                return false;
              }
            });
          })) {
            return;
          }
        }
        this.open();
      },
      close: (ev) => {
        this.close(ev);
      }
    });
  }
  render() {
    return html`<slot></slot>`;
  }
  connectedCallback() {
    super.connectedCallback();
    __privateMethod$4(this, _createDropdown, createDropdown_fn).call(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    __privateMethod$4(this, _removeListeners, removeListeners_fn).call(this);
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("html") && this.html) {
      if (!this.dropdownContainer)
        return;
      this.dropdownContainer.html = this.html;
    }
    if (changedProperties.has("css") && this.css) {
      if (!this.dropdownContainer)
        return;
      this.dropdownContainer.css = this.css;
    }
    if (changedProperties.has("preventScroll") && this.preventScroll) {
      if (!this.dropdownContainer)
        return;
      this.dropdownContainer.preventScroll = this.preventScroll;
    }
    if (changedProperties.has("width") && this.width !== void 0) {
      if (!this.dropdownContainer)
        return;
      this.dropdownContainer.style.display = this.width;
    }
    if (changedProperties.has("behaviour") && this.behaviour !== void 0) {
      __privateMethod$4(this, _removeListeners, removeListeners_fn).call(this);
      __privateMethod$4(this, _setListeners, setListeners_fn).call(this);
    }
  }
  open() {
    __privateMethod$4(this, _open, open_fn).call(this);
  }
  close(ev) {
    __privateMethod$4(this, _close, close_fn).call(this, ev);
  }
  updatePosition() {
    var _a2;
    (_a2 = this.dropdownContainer) == null ? void 0 : _a2.updatePosition();
  }
  scrollToTop(top) {
    var _a2;
    (_a2 = this.dropdownContainer) == null ? void 0 : _a2.scrollToTop(top);
  }
  getScroll() {
    var _a2;
    return ((_a2 = this.dropdownContainer) == null ? void 0 : _a2.getScroll()) ?? { top: 0, left: 0 };
  }
  getHeigth() {
    var _a2;
    return ((_a2 = this.dropdownContainer) == null ? void 0 : _a2.offsetHeight) ?? 0;
  }
};
_listeners = /* @__PURE__ */ new WeakMap();
_setListeners = /* @__PURE__ */ new WeakSet();
setListeners_fn = function() {
  var _a2;
  if (this.behaviour === "hover") {
    this.addEventListener("mouseenter", __privateGet$3(this, _listeners).open);
    (_a2 = this.dropdownContainer) == null ? void 0 : _a2.addEventListener("mouseleave", __privateGet$3(this, _listeners).close);
  } else {
    this.addEventListener("click", __privateGet$3(this, _listeners).open);
  }
  document.addEventListener("click", __privateGet$3(this, _listeners).close);
};
_removeListeners = /* @__PURE__ */ new WeakSet();
removeListeners_fn = function() {
  var _a2;
  this.removeEventListener("mouseenter", __privateGet$3(this, _listeners).open);
  (_a2 = this.dropdownContainer) == null ? void 0 : _a2.removeEventListener("mouseleave", __privateGet$3(this, _listeners).close);
  this.removeEventListener("click", __privateGet$3(this, _listeners).open);
  document.removeEventListener("click", __privateGet$3(this, _listeners).close);
};
_open = /* @__PURE__ */ new WeakSet();
open_fn = function() {
  var _a2;
  if (this.isOpen || this.disabled)
    return;
  if (this.fullwidth && this.dropdownContainer) {
    this.dropdownContainer.width = `${this.offsetWidth}px`;
  }
  if (this.height && this.dropdownContainer) {
    this.dropdownContainer.height = this.height;
  }
  this.isOpen = true;
  (_a2 = this.dropdownContainer) == null ? void 0 : _a2.open();
  this.openTimestamp = Date.now();
  this.dispatchEvent(new CustomEvent("open"));
};
_close = /* @__PURE__ */ new WeakSet();
close_fn = function(ev) {
  var _a2;
  if (!this.isOpen)
    return;
  const path = ev == null ? void 0 : ev.composedPath();
  const insideHost = !!(path == null ? void 0 : path.includes(this));
  const insideContainer = !!(this.dropdownContainer && (path == null ? void 0 : path.includes(this.dropdownContainer)));
  if (insideHost && this.behaviour === "click" && Date.now() - this.openTimestamp < 100)
    return;
  if (insideContainer && this.preventCloseOnInnerClick)
    return;
  if (insideHost && !insideContainer)
    return;
  this.isOpen = false;
  (_a2 = this.dropdownContainer) == null ? void 0 : _a2.close();
  this.openTimestamp = 0;
  this.dispatchEvent(new CustomEvent("close"));
};
_createDropdown = /* @__PURE__ */ new WeakSet();
createDropdown_fn = function() {
  const themeElement = searchClosestElement(this, "mjo-theme");
  this.dropdownContainer = document.createElement("dropdow-container");
  this.dropdownContainer.host = this;
  this.dropdownContainer.html = this.html;
  this.dropdownContainer.css = this.css;
  this.dropdownContainer.preventScroll = this.preventScroll;
  if (this.theme)
    this.dropdownContainer.theme = this.theme;
  if (this.width)
    this.dropdownContainer.style.width = this.width;
  if (themeElement) {
    const themeClone = document.createElement("mjo-theme");
    themeClone.config = themeElement.config;
    themeClone.theme = themeElement.theme;
    themeClone.scope = "local";
    themeClone.appendChild(this.dropdownContainer);
    document.body.appendChild(themeClone);
  } else {
    document.body.appendChild(this.dropdownContainer);
  }
};
MjoDropdown.styles = [
  css`
            :host {
                display: inline-block;
            }
        `
];
__decorateClass$5([
  property({ type: Boolean })
], MjoDropdown.prototype, "fullwidth", 2);
__decorateClass$5([
  property({ type: Boolean })
], MjoDropdown.prototype, "disabled", 2);
__decorateClass$5([
  property({ type: Boolean })
], MjoDropdown.prototype, "preventScroll", 2);
__decorateClass$5([
  property({ type: Boolean, reflect: true })
], MjoDropdown.prototype, "isOpen", 2);
__decorateClass$5([
  property({ type: Object })
], MjoDropdown.prototype, "css", 2);
__decorateClass$5([
  property({ type: Object })
], MjoDropdown.prototype, "html", 2);
__decorateClass$5([
  property({ type: String })
], MjoDropdown.prototype, "behaviour", 2);
__decorateClass$5([
  property({ type: String, converter: convertToPx })
], MjoDropdown.prototype, "width", 2);
__decorateClass$5([
  property({ type: String, converter: convertToPx })
], MjoDropdown.prototype, "height", 2);
__decorateClass$5([
  property({ type: Boolean })
], MjoDropdown.prototype, "preventCloseOnInnerClick", 2);
__decorateClass$5([
  property({ type: Array })
], MjoDropdown.prototype, "suppressOpenSelectors", 2);
MjoDropdown = __decorateClass$5([
  customElement("mjo-dropdown")
], MjoDropdown);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class LiveDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    if (!(partInfo.type === PartType.PROPERTY || partInfo.type === PartType.ATTRIBUTE || partInfo.type === PartType.BOOLEAN_ATTRIBUTE)) {
      throw new Error("The `live` directive is not allowed on child or event bindings");
    }
    if (!isSingleExpression(partInfo)) {
      throw new Error("`live` bindings can only contain a single expression");
    }
  }
  render(value) {
    return value;
  }
  update(part, [value]) {
    if (value === noChange || value === nothing) {
      return value;
    }
    const element = part.element;
    const name = part.name;
    if (part.type === PartType.PROPERTY) {
      if (value === element[name]) {
        return noChange;
      }
    } else if (part.type === PartType.BOOLEAN_ATTRIBUTE) {
      if (!!value === element.hasAttribute(name)) {
        return noChange;
      }
    } else if (part.type === PartType.ATTRIBUTE) {
      if (element.getAttribute(name) === String(value)) {
        return noChange;
      }
    }
    setCommittedValue(part);
    return value;
  }
}
const live = directive(LiveDirective);
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
var __accessCheck$4 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
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
var _setValue, setValue_fn;
let InputCounter = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$4(this, _setValue);
    this.count = 0;
    this.regressive = false;
  }
  render() {
    return html`<span role="status" aria-live="polite">
            <mjo-typography tag="none">${__privateMethod$3(this, _setValue, setValue_fn).call(this)}</mjo-typography>
        </span>`;
  }
};
_setValue = /* @__PURE__ */ new WeakSet();
setValue_fn = function() {
  let value = "0";
  if (this.regressive && this.max) {
    value = String(this.max - this.count);
  } else if (this.max) {
    value = `${this.count}/${this.max}`;
  } else {
    value = String(this.count);
  }
  return value;
};
InputCounter.styles = [
  css`
            :host {
                display: block;
                font-size: var(--mjo-textarea-helper-font-size, var(--mjo-input-helper-font-size, calc(1em * 0.8)));
                font-weight: var(--mjo-textarea-helper-font-weight, var(--mjo-input-helper-font-weight, normal));
                color: var(--mjo-textarea-helper-color, var(--mjo-input-helper-color, var(--mjo-foreground-color-low, currentColor)));
                line-height: calc(1em * 1.2);
                transition: color 0.3s;
            }
        `
];
__decorateClass$4([
  property({ type: Number })
], InputCounter.prototype, "count", 2);
__decorateClass$4([
  property({ type: Number })
], InputCounter.prototype, "max", 2);
__decorateClass$4([
  property({ type: Boolean })
], InputCounter.prototype, "regressive", 2);
InputCounter = __decorateClass$4([
  customElement("input-counter")
], InputCounter);
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
var __accessCheck$3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => {
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
var _handleBlur, handleBlur_fn, _handleClearabled, handleClearabled_fn, _handleFocus, _handleInput, _handleKeyup, _handlePassword, handlePassword_fn;
let MjoTextfield = class extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) {
  constructor() {
    super(...arguments);
    __privateAdd$3(this, _handleBlur);
    __privateAdd$3(this, _handleClearabled);
    __privateAdd$3(this, _handlePassword);
    this.autoFocus = false;
    this.disabled = false;
    this.fullwidth = false;
    this.readonly = false;
    this.type = "text";
    this.value = "";
    this.size = "medium";
    this.color = "primary";
    this.counter = false;
    this.selectOnFocus = false;
    this.clearabled = false;
    this.nospiners = false;
    this.isFocused = false;
    this.valueLength = 0;
    this.uniqueId = `mjo-textfield-${Math.random().toString(36).substr(2, 9)}`;
    this.isPassword = false;
    __privateAdd$3(this, _handleFocus, () => {
      this.isFocused = true;
      this.dispatchEvent(
        new CustomEvent("mjo-textfield-focus", {
          bubbles: true,
          composed: true,
          detail: {
            element: this,
            value: this.value
          }
        })
      );
      if (this.selectOnFocus) {
        this.inputElement.select();
        return;
      }
      setTimeout(() => {
        if (!this.inputElement)
          return;
        const oldTyoe = this.inputElement.type;
        this.inputElement.type = oldTyoe !== "password" ? "text" : "password";
        this.inputElement.setSelectionRange(this.value.length, this.value.length);
        this.inputElement.type = oldTyoe;
      }, 10);
    });
    __privateAdd$3(this, _handleInput, (ev) => {
      const previousValue = this.value;
      this.value = ev.currentTarget.value;
      this.valueLength = this.value.length;
      this.dispatchEvent(
        new CustomEvent("mjo-textfield-input", {
          bubbles: true,
          composed: true,
          detail: {
            element: this,
            value: this.value,
            previousValue,
            inputType: ev.inputType || ""
          }
        })
      );
      if (ev.type === "change") {
        this.dispatchEvent(
          new CustomEvent("mjo-textfield-change", {
            bubbles: true,
            composed: true,
            detail: {
              element: this,
              value: this.value,
              previousValue
            }
          })
        );
      }
      this.updateFormData({ name: this.name || "", value: this.value });
    });
    __privateAdd$3(this, _handleKeyup, (ev) => {
      this.dispatchEvent(
        new CustomEvent("mjo-textfield-keyup", {
          bubbles: true,
          composed: true,
          detail: {
            element: this,
            key: ev.key,
            code: ev.code,
            value: this.value,
            originalEvent: ev
          }
        })
      );
      if (ev.key === "Enter" && this.form) {
        this.submiForm();
      }
    });
  }
  render() {
    if (this.type === "password" && !this.isPassword)
      this.isPassword = true;
    const helperTextId = this.helperText || this.errormsg || this.successmsg ? `${this.uniqueId}-helper` : void 0;
    const labelId = this.label ? `${this.uniqueId}-label` : void 0;
    return html`${this.label ? html`<input-label
                      id=${ifDefined(labelId)}
                      color=${this.color}
                      label=${this.label}
                      ?focused=${this.isFocused}
                      ?error=${this.error}
                      ?data-disabled=${this.disabled}
                  ></input-label>` : nothing}
            <div
                class="container"
                data-color=${this.color}
                ?data-focused=${this.isFocused}
                data-size=${this.size}
                ?data-error=${this.error}
                ?data-disabled=${this.disabled}
            >
                ${this.prefixText ? html`<div class="prefixText">${this.prefixText}</div>` : nothing}
                ${this.startIcon && html`<div class="icon startIcon" aria-hidden="true"><mjo-icon src=${this.startIcon}></mjo-icon></div>`}
                ${this.startImage && !this.startIcon ? html`<div class="image startImage"><img src=${this.startImage} alt="Input image" /></div>` : nothing}
                <input
                    id=${ifDefined(this.id)}
                    autocapitalize=${ifDefined(this.autoCapitalize)}
                    autocomplete=${ifDefined(this.autoComplete)}
                    ?disabled=${this.disabled}
                    name=${ifDefined(this.name)}
                    max=${ifDefined(this.max)}
                    min=${ifDefined(this.min)}
                    maxlength=${ifDefined(this.maxlength)}
                    minlength=${ifDefined(this.minlength)}
                    placeholder=${ifDefined(this.placeholder)}
                    ?readonly=${this.readonly}
                    step=${ifDefined(this.step)}
                    type=${this.type}
                    .value=${live(this.value)}
                    @focus=${__privateGet$2(this, _handleFocus)}
                    @blur=${__privateMethod$2(this, _handleBlur, handleBlur_fn)}
                    @input=${__privateGet$2(this, _handleInput)}
                    @keyup=${__privateGet$2(this, _handleKeyup)}
                    @change=${__privateGet$2(this, _handleInput)}
                    aria-label=${this.ariaLabel || nothing}
                    aria-labelledby=${labelId || nothing}
                    aria-describedby=${helperTextId || nothing}
                    aria-errormessage=${ifDefined(this.errormsg ? helperTextId : void 0)}
                    aria-invalid=${this.error ? "true" : "false"}
                    aria-required=${ifDefined(this.required)}
                    ?data-nospiners=${this.nospiners}
                />
                ${this.clearabled ? html`<button
                          type="button"
                          class="icon endIcon clearabled"
                          data-dropdown-noopen
                          ?data-visible=${this.value.length > 0}
                          @click=${__privateMethod$2(this, _handleClearabled, handleClearabled_fn)}
                          aria-label="Clear input"
                          tabindex="-1"
                      >
                          <mjo-icon src=${AiFillCloseCircle} aria-hidden="true"></mjo-icon>
                      </button>` : nothing}
                ${this.endIcon && !this.clearabled && this.type !== "password" ? html`<div class="icon endIcon" aria-hidden="true"><mjo-icon src=${this.endIcon}></mjo-icon></div>` : nothing}
                ${this.endImage && !this.endIcon ? html`<div class="image endImage"><img src=${this.endImage} alt="Input image" /></div>` : nothing}
                ${this.isPassword ? this.type === "password" ? html`<button type="button" class="icon endIcon passIcon" @click=${__privateMethod$2(this, _handlePassword, handlePassword_fn)} aria-label="Show password" tabindex="-1">
                              <mjo-icon src=${AiFillEye} aria-hidden="true"></mjo-icon>
                          </button>` : html`<button type="button" class="icon endIcon passIcon" @click=${__privateMethod$2(this, _handlePassword, handlePassword_fn)} aria-label="Hide password" tabindex="-1">
                              <mjo-icon src=${AiFillEyeInvisible} aria-hidden="true"></mjo-icon>
                          </button>` : nothing}
                ${this.suffixText ? html`<div class="prefixText">${this.suffixText}</div>` : nothing}
            </div>
            <div class="helper" ?data-disabled=${this.disabled}>
                ${this.helperText || this.errormsg || this.successmsg ? html`<input-helper-text id=${ifDefined(helperTextId)} errormsg=${ifDefined(this.errormsg)} successmsg=${ifDefined(this.successmsg)}
                          >${this.helperText}</input-helper-text
                      >` : nothing}
                ${this.counter ? html`<input-counter
                          count=${this.valueLength}
                          max=${ifDefined(this.maxlength)}
                          regressive
                          ?data-error=${this.error}
                          ?data-focused=${this.isFocused}
                          data-color=${this.color}
                      ></input-counter>` : nothing}
            </div>`;
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback();
    (_a2 = document.querySelector("input")) == null ? void 0 : _a2.autocomplete;
    this.updateFormData({ name: this.name || "", value: this.value });
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (_changedProperties.has("autoFocus") && this.autoFocus) {
      setTimeout(() => {
        this.focus();
      }, 50);
    }
  }
  blur() {
    this.inputElement.blur();
  }
  clear(focus = false) {
    this.setValue("");
    if (focus)
      this.focus();
  }
  focus() {
    this.inputElement.focus();
  }
  getError() {
    return this.errormsg;
  }
  getForm() {
    return this.form;
  }
  getValue() {
    return this.value;
  }
  removeError() {
    this.error = false;
    this.errormsg = "";
  }
  setError(errormsg) {
    this.error = true;
    this.errormsg = errormsg;
  }
  setValue(value) {
    this.value = value;
  }
};
_handleBlur = /* @__PURE__ */ new WeakSet();
handleBlur_fn = function() {
  this.isFocused = false;
  this.dispatchEvent(
    new CustomEvent("mjo-textfield-blur", {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
        value: this.value
      }
    })
  );
};
_handleClearabled = /* @__PURE__ */ new WeakSet();
handleClearabled_fn = function() {
  const previousValue = this.value;
  this.value = "";
  this.valueLength = 0;
  this.dispatchEvent(
    new CustomEvent("mjo-textfield-clear", {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
        previousValue
      }
    })
  );
};
_handleFocus = /* @__PURE__ */ new WeakMap();
_handleInput = /* @__PURE__ */ new WeakMap();
_handleKeyup = /* @__PURE__ */ new WeakMap();
_handlePassword = /* @__PURE__ */ new WeakSet();
handlePassword_fn = function() {
  const wasPassword = this.type === "password";
  this.type = this.type === "password" ? "text" : "password";
  this.dispatchEvent(
    new CustomEvent("mjo-textfield-password-toggle", {
      bubbles: true,
      composed: true,
      detail: {
        element: this,
        visible: !wasPassword,
        type: this.type
      }
    })
  );
};
MjoTextfield.styles = [
  css`
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
            .passIcon,
            .clearabled {
                cursor: pointer;
                background: none;
                border: none;
                margin: 0;
                color: inherit;
                font-size: inherit;
                transition: opacity 0.3s;
            }
            .clearabled[data-visible] {
                opacity: 1;
                cursor: pointer;
            }
            .container .passIcon mjo-icon,
            .container .clearabled mjo-icon {
                color: #999999 !important;
            }
            .container .passIcon:hover mjo-icon,
            .container .clearabled:hover mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1d7fdb)) !important;
            }
            .container[data-color="secondary"] .passIcon:hover mjo-icon,
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
        `
];
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "autoCapitalize", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "autoComplete", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoTextfield.prototype, "autoFocus", 2);
__decorateClass$3([
  property({ type: Boolean, reflect: true })
], MjoTextfield.prototype, "disabled", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoTextfield.prototype, "fullwidth", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "name", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "placeholder", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoTextfield.prototype, "readonly", 2);
__decorateClass$3([
  property({ type: Number })
], MjoTextfield.prototype, "step", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "type", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "value", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "label", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "size", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "color", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "startIcon", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "endIcon", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "startImage", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "endImage", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "prefixText", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "suffixText", 2);
__decorateClass$3([
  property({ type: String })
], MjoTextfield.prototype, "helperText", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoTextfield.prototype, "counter", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoTextfield.prototype, "selectOnFocus", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoTextfield.prototype, "clearabled", 2);
__decorateClass$3([
  property({ type: Boolean })
], MjoTextfield.prototype, "nospiners", 2);
__decorateClass$3([
  state()
], MjoTextfield.prototype, "isFocused", 2);
__decorateClass$3([
  state()
], MjoTextfield.prototype, "valueLength", 2);
__decorateClass$3([
  state()
], MjoTextfield.prototype, "uniqueId", 2);
__decorateClass$3([
  query("input")
], MjoTextfield.prototype, "inputElement", 2);
MjoTextfield = __decorateClass$3([
  customElement("mjo-textfield")
], MjoTextfield);
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
var __accessCheck$2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => {
  __accessCheck$2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
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
var _setInputElement, setInputElement_fn, _handleClear, handleClear_fn, _announceToScreenReader, announceToScreenReader_fn, _formatDateForAnnouncement, formatDateForAnnouncement_fn, _calendarTemplate, calendarTemplate_fn, _displayValue, displayValue_fn, _onDateSelected, _onRangeSelected, _emitChange, emitChange_fn, _onKeydown;
let MjoDatePicker = class extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) {
  constructor() {
    super(...arguments);
    __privateAdd$2(this, _setInputElement);
    __privateAdd$2(this, _handleClear);
    __privateAdd$2(this, _announceToScreenReader);
    __privateAdd$2(this, _formatDateForAnnouncement);
    __privateAdd$2(this, _calendarTemplate);
    __privateAdd$2(this, _displayValue);
    __privateAdd$2(this, _emitChange);
    this.value = "";
    this.isRange = false;
    this.locale = "en";
    this.disabled = false;
    this.size = "medium";
    this.color = "primary";
    this.clearabled = false;
    this.closeOnSelect = true;
    this.required = false;
    this.displayMode = "iso";
    this.ariaLive = "polite";
    this.disabledAnnounceSelections = false;
    this.calendarId = `mjo-calendar-${Math.random().toString(36).substring(2, 9)}`;
    this.announcementText = "";
    this.calendarInstanceId = 0;
    this.calendarRef = createRef();
    this.type = "date";
    this.inputElement = void 0;
    __privateAdd$2(this, _onDateSelected, (ev) => {
      const detail = ev.detail;
      if (this.isRange)
        return;
      if (detail.value) {
        this.value = detail.value;
        __privateMethod$1(this, _emitChange, emitChange_fn).call(this, { value: this.value, date: detail.date });
        if (!this.disabledAnnounceSelections && detail.date) {
          const formattedDate = __privateMethod$1(this, _formatDateForAnnouncement, formatDateForAnnouncement_fn).call(this, detail.date);
          __privateMethod$1(this, _announceToScreenReader, announceToScreenReader_fn).call(this, `Selected ${formattedDate}`);
        }
        if (this.closeOnSelect)
          this.closePicker();
      }
    });
    __privateAdd$2(this, _onRangeSelected, (ev) => {
      if (!this.isRange)
        return;
      const detail = ev.detail;
      if (detail.startDateValue && detail.endDateValue) {
        const value = `${detail.startDateValue}/${detail.endDateValue}`;
        this.value = value;
        __privateMethod$1(this, _emitChange, emitChange_fn).call(this, {
          value,
          startDate: detail.startDate,
          endDate: detail.endDate,
          startDateValue: detail.startDateValue,
          endDateValue: detail.endDateValue
        });
        if (!this.disabledAnnounceSelections && detail.startDate && detail.endDate) {
          const startFormatted = __privateMethod$1(this, _formatDateForAnnouncement, formatDateForAnnouncement_fn).call(this, detail.startDate);
          const endFormatted = __privateMethod$1(this, _formatDateForAnnouncement, formatDateForAnnouncement_fn).call(this, detail.endDate);
          __privateMethod$1(this, _announceToScreenReader, announceToScreenReader_fn).call(this, `Selected date range from ${startFormatted} to ${endFormatted}`);
        }
        if (this.closeOnSelect)
          this.closePicker();
      }
    });
    __privateAdd$2(this, _onKeydown, (ev) => {
      var _a2;
      if (this.disabled)
        return;
      const isOpen = ((_a2 = this.dropdown) == null ? void 0 : _a2.isOpen) ?? false;
      switch (ev.key) {
        case "Enter":
        case " ":
          ev.preventDefault();
          if (!isOpen) {
            this.openPicker();
          }
          break;
        case "ArrowDown":
        case "ArrowUp":
          ev.preventDefault();
          if (!isOpen) {
            this.openPicker();
          }
          break;
        case "Escape":
          if (isOpen) {
            ev.preventDefault();
            this.closePicker();
          }
          break;
      }
    });
  }
  render() {
    var _a2;
    const isOpen = ((_a2 = this.dropdown) == null ? void 0 : _a2.isOpen) ?? false;
    const computedAriaLabel = this.ariaLabel || this.label || (this.isRange ? "Date range picker" : "Date picker");
    return html`
            <!-- Accessibility announcements region -->
            <div aria-live=${this.ariaLive} aria-atomic="true" class="sr-only" .textContent=${this.announcementText}></div>

            <mjo-dropdown
                behaviour="click"
                preventCloseOnInnerClick
                .suppressOpenSelectors=${[".clearabled", "[data-dropdown-noopen]"]}
                .html=${__privateMethod$1(this, _calendarTemplate, calendarTemplate_fn).call(this)}
            >
                <mjo-textfield
                    form-ignore
                    role="combobox"
                    aria-expanded=${isOpen ? "true" : "false"}
                    aria-haspopup="dialog"
                    aria-controls=${this.calendarId}
                    aria-label=${computedAriaLabel}
                    aria-describedby=${ifDefined(this.ariaDescribedby)}
                    value=${__privateMethod$1(this, _displayValue, displayValue_fn).call(this)}
                    size=${this.size}
                    color=${this.color}
                    ?disabled=${this.disabled}
                    label=${this.label ?? ""}
                    placeholder=${this.placeholder ?? ""}
                    readonly
                    startIcon=${PiCalendarDotsLight}
                    ?clearabled=${this.clearabled}
                    @keydown=${__privateGet$1(this, _onKeydown)}
                    @clear=${__privateMethod$1(this, _handleClear, handleClear_fn)}
                ></mjo-textfield>
            </mjo-dropdown>
        `;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated(args) {
    super.firstUpdated(args);
    if (this.name)
      this.updateFormData({ name: this.name, value: this.value });
    __privateMethod$1(this, _setInputElement, setInputElement_fn).call(this);
  }
  focus() {
    var _a2;
    (_a2 = this.textfield) == null ? void 0 : _a2.focus();
  }
  clear() {
    var _a2;
    if (this.disabled)
      return;
    this.value = "";
    __privateMethod$1(this, _emitChange, emitChange_fn).call(this, { value: this.value });
    if (this.name)
      this.updateFormData({ name: this.name, value: this.value });
    (_a2 = this.calendarRef.value) == null ? void 0 : _a2.reset();
    if (!this.disabledAnnounceSelections) {
      __privateMethod$1(this, _announceToScreenReader, announceToScreenReader_fn).call(this, this.isRange ? "Date range cleared" : "Date cleared");
    }
  }
  openPicker() {
    if (this.disabled)
      return;
    this.dropdown.open();
    if (!this.disabledAnnounceSelections) {
      __privateMethod$1(this, _announceToScreenReader, announceToScreenReader_fn).call(this, this.isRange ? "Date range picker opened" : "Date picker opened");
    }
    requestAnimationFrame(() => {
      if (this.calendarRef.value) {
        this.calendarRef.value.focus();
      }
    });
  }
  closePicker() {
    var _a2;
    this.dropdown.close();
    if (!this.disabledAnnounceSelections) {
      __privateMethod$1(this, _announceToScreenReader, announceToScreenReader_fn).call(this, this.isRange ? "Date range picker closed" : "Date picker closed");
    }
    (_a2 = this.textfield) == null ? void 0 : _a2.focus();
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
};
_setInputElement = /* @__PURE__ */ new WeakSet();
setInputElement_fn = async function() {
  var _a2;
  const textfield = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("mjo-textfield");
  if (textfield) {
    await textfield.updateComplete;
    this.inputElement = textfield.inputElement;
  }
};
_handleClear = /* @__PURE__ */ new WeakSet();
handleClear_fn = function() {
  this.clear();
};
_announceToScreenReader = /* @__PURE__ */ new WeakSet();
announceToScreenReader_fn = function(message) {
  this.announcementText = message;
  setTimeout(() => {
    this.announcementText = "";
  }, 1e3);
};
_formatDateForAnnouncement = /* @__PURE__ */ new WeakSet();
formatDateForAnnouncement_fn = function(date) {
  try {
    const formatter = new Intl.DateTimeFormat(this.locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return formatter.format(date);
  } catch {
    return date.toLocaleDateString(this.locale);
  }
};
_calendarTemplate = /* @__PURE__ */ new WeakSet();
calendarTemplate_fn = function() {
  const resetKey = `${this.calendarInstanceId}-${this.value || (this.isRange ? "range-empty" : "single-empty")}`;
  const startDate = this.isRange && this.value ? this.value.split("/")[0] : void 0;
  const endDate = this.isRange && this.value ? this.value.split("/")[1] : void 0;
  const value = !this.isRange && this.value ? this.value : void 0;
  return html`<div class="panel">
            <mjo-calendar
                ${ref(this.calendarRef)}
                id=${this.calendarId}
                data-reset-key=${resetKey}
                mode=${this.isRange ? "range" : "single"}
                locale=${this.locale}
                aria-label=${this.isRange ? "Date range calendar" : "Date selection calendar"}
                value=${ifDefined(value)}
                startDate=${ifDefined(startDate)}
                endDate=${ifDefined(endDate)}
                minDate=${ifDefined(this.minDate)}
                maxDate=${ifDefined(this.maxDate)}
                .disabledDates=${this.disabledDates}
                @mjo-calendar-date-selected=${__privateGet$1(this, _onDateSelected)}
                @mjo-calendar-range-selected=${__privateGet$1(this, _onRangeSelected)}
            ></mjo-calendar>
        </div>`;
};
_displayValue = /* @__PURE__ */ new WeakSet();
displayValue_fn = function() {
  if (!this.value)
    return "";
  const format = (iso) => {
    if (this.displayMode === "iso")
      return iso;
    const [y, m, d] = iso.split("-").map((v) => Number(v));
    if (!y || !m || !d)
      return iso;
    try {
      const dtf = new Intl.DateTimeFormat(this.locale, { dateStyle: "medium" });
      return dtf.format(new Date(y, m - 1, d));
    } catch {
      return iso;
    }
  };
  if (!this.isRange)
    return format(this.value);
  const [start, end] = this.value.split("/");
  return `${format(start)} – ${format(end)}`;
};
_onDateSelected = /* @__PURE__ */ new WeakMap();
_onRangeSelected = /* @__PURE__ */ new WeakMap();
_emitChange = /* @__PURE__ */ new WeakSet();
emitChange_fn = function({
  value,
  date,
  startDate,
  endDate,
  startDateValue,
  endDateValue
}) {
  if (this.name)
    this.updateFormData({ name: this.name, value });
  this.dispatchEvent(
    new CustomEvent("mjo-date-picker-change", {
      detail: {
        value,
        date,
        startDate,
        endDate,
        startDateValue,
        endDateValue
      },
      bubbles: true,
      cancelable: true
    })
  );
};
_onKeydown = /* @__PURE__ */ new WeakMap();
MjoDatePicker.styles = [
  css`
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

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .panel {
                    border: var(--mjo-date-picker-high-contrast-border, 1px solid);
                }
            }
        `
];
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "name", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "value", 2);
__decorateClass$2([
  property({ type: Boolean, attribute: "range" })
], MjoDatePicker.prototype, "isRange", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "locale", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "minDate", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "maxDate", 2);
__decorateClass$2([
  property({ type: Array })
], MjoDatePicker.prototype, "disabledDates", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "label", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "placeholder", 2);
__decorateClass$2([
  property({ type: Boolean, reflect: true })
], MjoDatePicker.prototype, "disabled", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "size", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "color", 2);
__decorateClass$2([
  property({ type: Boolean })
], MjoDatePicker.prototype, "clearabled", 2);
__decorateClass$2([
  property({ type: Boolean })
], MjoDatePicker.prototype, "closeOnSelect", 2);
__decorateClass$2([
  property({ type: Boolean })
], MjoDatePicker.prototype, "required", 2);
__decorateClass$2([
  property({ type: String })
], MjoDatePicker.prototype, "displayMode", 2);
__decorateClass$2([
  property({ type: String, attribute: "aria-describedby" })
], MjoDatePicker.prototype, "ariaDescribedby", 2);
__decorateClass$2([
  property({ type: String, attribute: "aria-live" })
], MjoDatePicker.prototype, "ariaLive", 2);
__decorateClass$2([
  property({ type: Boolean })
], MjoDatePicker.prototype, "disabledAnnounceSelections", 2);
__decorateClass$2([
  state()
], MjoDatePicker.prototype, "calendarId", 2);
__decorateClass$2([
  state()
], MjoDatePicker.prototype, "announcementText", 2);
__decorateClass$2([
  query("mjo-textfield")
], MjoDatePicker.prototype, "textfield", 2);
__decorateClass$2([
  query("mjo-dropdown")
], MjoDatePicker.prototype, "dropdown", 2);
MjoDatePicker = __decorateClass$2([
  customElement("mjo-date-picker")
], MjoDatePicker);
const validatorMessages = {
  en: {
    allowed: "Allowed files {data0}",
    dateprevious: "Date must be earlier than today",
    domains: "None of the domains are allowed",
    equalto: "Is not equal to {data0}",
    isdate: "Not valid date",
    isemail: "Not valid email address",
    isnumber: "The value entered must be a number",
    isurl: "Not valid url",
    max: "Required numerical value, maximum {data0}",
    maxage: "You must be less than {data0} years of age",
    maxcheck: "You have to check at most {data0} boxes",
    maxlength: "The text entered cannot be longer than {data0} characters",
    min: "Required numerical value, minimum {data0}",
    minage: "You must be older than {data0} years old",
    mincheck: "You have to check at least {data0} boxes",
    minlength: "The text entered must be at least {data0} characters long",
    nospaces: "The entered value cannot contain spaces",
    pattern: "Invalid pattern",
    phonecountry: "The phone number entered is not correct",
    phonenumber: "The phone number entered is not correct",
    range: "The value must be between {data0} and {data1}",
    rangelength: "The length must be between {data0} and {data1} characters.",
    required: "This field is required",
    security: "{data0}"
  },
  es: {
    allowed: "Archivos permitidos {data0}",
    dateprevious: "La fecha debe ser anterior a hoy",
    domains: "Ninguno de los dominios son permitidos",
    equalto: "No es igual a {data0}",
    isdate: "No es una fecha válida",
    isemail: "No es una dirección de correo válida",
    isnumber: "El valor ingresado debe ser un número",
    isurl: "No es una url válida",
    max: "Valor numérico requerido, máximo {data0}",
    maxage: "Debes tener menos de {data0} años",
    maxcheck: "Tienes que marcar como máximo {data0} casillas",
    maxlength: "El texto ingresado no puede ser más largo que {data0} caracteres",
    min: "Valor numérico requerido, mínimo {data0}",
    minage: "Debes tener más de {data0} años",
    mincheck: "Tienes que marcar como mínimo {data0} casillas",
    minlength: "El texto ingresado debe tener al menos {data0} caracteres",
    nospaces: "El valor ingresado no puede contener espacios",
    pattern: "Patrón inválido",
    phonecountry: "El número de teléfono ingresado no es correcto",
    phonenumber: "El número de teléfono ingresado no es correcto",
    range: "El valor debe estar entre {data0} y {data1}",
    rangelength: "La longitud debe estar entre {data0} y {data1} caracteres.",
    required: "Este campo es requerido",
    security: "{data0}"
  },
  fr: {
    allowed: "Fichiers autorisés {data0}",
    dateprevious: "La date doit être antérieure à aujourd'hui",
    domains: "Aucun des domaines n'est autorisé",
    equalto: "N’est pas égal à {data0}",
    isdate: "Date non valide",
    isemail: "Adresse e-mail non valide",
    isnumber: "La valeur saisie doit être un nombre",
    isurl: "URL non valide",
    max: "Valeur numérique requise, maximum {data0}",
    maxage: "Vous devez avoir moins de {data0} ans",
    maxcheck: "Vous devez cocher au maximum {data0} cases",
    maxlength: "Le texte saisi ne peut pas dépasser {data0} caractères",
    min: "Valeur numérique requise, minimum {data0}",
    minage: "Vous devez avoir plus de {data0} ans",
    mincheck: "Vous devez cocher au moins {data0} cases",
    minlength: "Le texte saisi doit comporter au moins {data0} caractères",
    nospaces: "La valeur saisie ne peut pas contenir d'espaces",
    pattern: "Motif invalide",
    phonecountry: "Le numéro de téléphone saisi n'est pas correct",
    phonenumber: "Le numéro de téléphone saisi n'est pas correct",
    range: "La valeur doit être comprise entre {data0} et {data1}",
    rangelength: "La longueur doit être comprise entre {data0} et {data1} caractères.",
    required: "Ce champ est obligatoire",
    security: "{data0}"
  },
  pt: {
    allowed: "Arquivos permitidos {data0}",
    dateprevious: "A data deve ser anterior a hoje",
    domains: "Nenhum dos domínios é permitido",
    equalto: "Não é igual a {data0}",
    isdate: "Não é uma data válida",
    isemail: "Não é um endereço de e-mail válido",
    isnumber: "O valor inserido deve ser um número",
    isurl: "Não é um url válido",
    max: "Valor numérico necessário, máximo {data0}",
    maxage: "Você deve ter menos de {data0} anos",
    maxcheck: "Você deve marcar no máximo {data0} caixas",
    maxlength: "O texto inserido não pode ter mais de {data0} caracteres",
    min: "Valor numérico necessário, mínimo {data0}",
    minage: "Você deve ter mais de {data0} anos",
    mincheck: "Você deve marcar pelo menos {data0} caixas",
    minlength: "O texto inserido deve ter pelo menos {data0} caracteres",
    nospaces: "O valor inserido não pode conter espaços",
    pattern: "Padrão inválido",
    phonecountry: "O número de telefone inserido não está correto",
    phonenumber: "O número de telefone inserido não está correto",
    range: "O valor deve estar entre {data0} e {data1}",
    rangelength: "O comprimento deve estar entre {data0} e {data1} caracteres.",
    required: "Este campo é obrigatório",
    security: "{data0}"
  },
  it: {
    allowed: "File consentite {data0}",
    dateprevious: "La data deve essere precedente a oggi",
    domains: "Nessuno dei domini è consentito",
    equalto: "Non è uguale a {data0}",
    isdate: "Non è una data valida",
    isemail: "Non è un indirizzo email valido",
    isnumber: "Il valore inserito deve essere un numero",
    isurl: "Non è un url valido",
    max: "Valore numerico richiesto, massimo {data0}",
    maxage: "Devi avere meno di {data0} anni",
    maxcheck: "Devi spuntare al massimo {data0} caselle",
    maxlength: "Il testo inserito non può superare {data0} caratteri",
    min: "Valore numerico richiesto, minimo {data0}",
    minage: "Devi avere più di {data0} anni",
    mincheck: "Devi spuntare almeno {data0} caselle",
    minlength: "Il testo inserito deve essere lungo almeno {data0} caratteri",
    nospaces: "Il valore inserito non può contenere spazi",
    pattern: "Modello non valido",
    phonecountry: "Il numero di telefono inserito non è corretto",
    phonenumber: "Il numero di telefono inserito non è corretto",
    range: "Il valore deve essere compreso tra {data0} e {data1}",
    rangelength: "La lunghezza deve essere compresa tra {data0} e {data1} caratteri.",
    required: "Questo campo è obbligatorio",
    security: "{data0}"
  },
  de: {
    allowed: "Erlaubte Dateien {data0}",
    dateprevious: "Das Datum muss früher als heute sein",
    domains: "Keine der Domains ist erlaubt",
    equalto: "Ist nicht gleich {data0}",
    isdate: "Kein gültiges Datum",
    isemail: "Keine gültige E-Mail-Adresse",
    isnumber: "Der eingegebene Wert muss eine Zahl sein",
    isurl: "Keine gültige URL",
    max: "Numerischer Wert erforderlich, maximal {data0}",
    maxage: "Sie müssen jünger als {data0} Jahre sein",
    maxcheck: "Sie müssen höchstens {data0} Kästchen ankreuzen",
    maxlength: "Der eingegebene Text darf nicht länger als {data0} Zeichen sein",
    min: "Numerischer Wert erforderlich, mindestens {data0}",
    minage: "Sie müssen älter als {data0} Jahre sein",
    mincheck: "Sie müssen mindestens {data0} Kästchen ankreuzen",
    minlength: "Der eingegebene Text muss mindestens {data0} Zeichen lang sein",
    nospaces: "Der eingegebene Wert darf keine Leerzeichen enthalten",
    pattern: "Ungültiges Muster",
    phonecountry: "Die eingegebene Telefonnummer ist nicht korrekt",
    phonenumber: "Die eingegebene Telefonnummer ist nicht korrekt",
    range: "Der Wert muss zwischen {data0} und {data1} liegen",
    rangelength: "Die Länge muss zwischen {data0} und {data1} Zeichen liegen.",
    required: "Dieses Feld ist erforderlich",
    security: "{data0}"
  },
  nl: {
    allowed: "Toegestane bestanden {data0}",
    dateprevious: "De datum moet eerder zijn dan vandaag",
    domains: "Geen van de domeinen is toegestaan",
    equalto: "Is niet gelijk aan {data0}",
    isdate: "Geen geldige datum",
    isemail: "Geen geldig e-mailadres",
    isnumber: "De ingevoerde waarde moet een getal zijn",
    isurl: "Geen geldige URL",
    max: "Numerieke waarde vereist, maximaal {data0}",
    maxage: "Je moet jonger zijn dan {data0} jaar",
    maxcheck: "Je moet maximaal {data0} vakjes aanvinken",
    maxlength: "De ingevoerde tekst mag niet langer zijn dan {data0} tekens",
    min: "Numerieke waarde vereist, minimaal {data0}",
    minage: "Je moet ouder zijn dan {data0} jaar",
    mincheck: "Je moet minimaal {data0} vakjes aanvinken",
    minlength: "De ingevoerde tekst moet minimaal {data0} tekens lang zijn",
    nospaces: "De ingevoerde waarde mag geen spaties bevatten",
    pattern: "Ongeldig patroon",
    phonecountry: "Het ingevoerde telefoonnummer is niet correct",
    phonenumber: "Het ingevoerde telefoonnummer is niet correct",
    range: "De waarde moet tussen {data0} en {data1} liggen",
    rangelength: "De lengte moet tussen {data0} en {data1} tekens zijn.",
    required: "Dit veld is verplicht",
    security: "{data0}"
  },
  bg: {
    allowed: "Позволени файлове {data0}",
    dateprevious: "Дата трябва да бъде преди днес",
    domains: "Нито един от домейните не е разрешен",
    equalto: "Не е равно на {data0}",
    isdate: "Невалидна дата",
    isemail: "Невалиден имейл адрес",
    isnumber: "Въведената стойност трябва да бъде число",
    isurl: "Невалиден URL адрес",
    max: "Изисква се числова стойност, максимум {data0}",
    maxage: "Трябва да сте на {data0} години или по-малко",
    maxcheck: "Трябва да отметнете най-много {data0} кутии",
    maxlength: "Въведеният текст не може да бъде по-дълъг от {data0} символа",
    min: "Изисква се числова стойност, минимум {data0}",
    minage: "Трябва да сте на {data0} години или повече",
    mincheck: "Трябва да отметнете поне {data0} кутии",
    minlength: "Въведеният текст трябва да бъде поне {data0} символа",
    nospaces: "Въведената стойност не може да съдържа интервали",
    pattern: "Невалиден шаблон",
    phonecountry: "Въведеният телефонен номер не е правилен",
    phonenumber: "Въведеният телефонен номер не е правилен",
    range: "Стойността трябва да бъде между {data0} и {data1}",
    rangelength: "Дължината трябва да бъде между {data0} и {data1} символа.",
    required: "Това поле е задължително",
    security: "{data0}"
  },
  sr: {
    allowed: "Дозвољени фајлови {data0}",
    dateprevious: "Датум мора бити пре данас",
    domains: "Ниједан од домена није дозвољен",
    equalto: "Није једнако {data0}",
    isdate: "Није важећи датум",
    isemail: "Није важећа адреса е-поште",
    isnumber: "Унесена вредност мора бити број",
    isurl: "Није важећи URL",
    max: "Потребна је нумеричка вредност, максимум {data0}",
    maxage: "Морате бити млађи од {data0} година",
    maxcheck: "Морате проверити највише {data0} поља",
    maxlength: "Унесени текст не може бити дужи од {data0} карактера",
    min: "Потребна је нумеричка вредност, минимум {data0}",
    minage: "Морате бити старији од {data0} година",
    mincheck: "Морате проверити најмање {data0} поља",
    minlength: "Унесени текст мора имати најмање {data0} карактера",
    nospaces: "Унесена вредност не може садржати размаке",
    pattern: "Неважећи узорак",
    phonecountry: "Унесени број телефона није исправан",
    phonenumber: "Унесени број телефона није исправан",
    range: "Вредност мора бити између {data0} и {data1}",
    rangelength: "Дужина мора бити између {data0} и {data1} карактера.",
    required: "Ово поље је обавезно",
    security: "{data0}"
  },
  ru: {
    allowed: "Разрешенные файлы {data0}",
    dateprevious: "Дата должна быть раньше сегодня",
    domains: "Ни один из доменов не разрешен",
    equalto: "Не равно {data0}",
    isdate: "Неверная дата",
    isemail: "Неверный адрес электронной почты",
    isnumber: "Введенное значение должно быть числом",
    isurl: "Неверный URL",
    max: "Требуется числовое значение, максимум {data0}",
    maxage: "Вам должно быть меньше {data0} лет",
    maxcheck: "Вы должны отметить не более {data0} полей",
    maxlength: "Введенный текст не может быть длиннее {data0} символов",
    min: "Требуется числовое значение, минимум {data0}",
    minage: "Вам должно быть больше {data0} лет",
    mincheck: "Вы должны отметить не менее {data0} полей",
    minlength: "Введенный текст должен содержать не менее {data0} символов",
    nospaces: "Введенное значение не может содержать пробелы",
    pattern: "Неверный шаблон",
    phonecountry: "Введенный номер телефона неверен",
    phonenumber: "Введенный номер телефона неверен",
    range: "Значение должно быть между {data0} и {data1}",
    rangelength: "Длина должна быть от {data0} до {data1} символов.",
    required: "Это поле обязательно для заполнения",
    security: "{data0}"
  },
  zh: {
    allowed: "允许的文件 {data0}",
    dateprevious: "日期必须早于今天",
    domains: "不允许任何域",
    equalto: "不等于 {data0}",
    isdate: "无效日期",
    isemail: "无效的电子邮件地址",
    isnumber: "输入的值必须是数字",
    isurl: "无效网址",
    max: "需要数字值，最大值 {data0}",
    maxage: "您必须小于 {data0} 岁",
    maxcheck: "您最多只能勾选 {data0} 个框",
    maxlength: "输入的文本长度不能超过 {data0} 个字符",
    min: "需要数字值，最小值 {data0}",
    minage: "您必须大于 {data0} 岁",
    mincheck: "您至少要勾选 {data0} 个框",
    minlength: "输入的文本长度必须至少为 {data0} 个字符",
    nospaces: "输入的值不能包含空格",
    pattern: "无效模式",
    phonecountry: "输入的电话号码不正确",
    phonenumber: "输入的电话号码不正确",
    range: "值必须在 {data0} 和 {data1} 之间",
    rangelength: "长度必须在 {data0} 和 {data1} 个字符之间。",
    required: "此字段为必填项",
    security: "{data0}"
  },
  ja: {
    allowed: "許可されたファイル {data0}",
    dateprevious: "日付は今日より前でなければなりません",
    domains: "ドメインのいずれも許可されていません",
    equalto: "{data0} と等しくなければなりません",
    isdate: "無効な日付",
    isemail: "無効なメールアドレス",
    isnumber: "入力された値は数値である必要があります",
    isurl: "無効なURL",
    max: "数値が必要です、最大 {data0}",
    maxage: "あなたは {data0} 歳未満でなければなりません",
    maxcheck: "チェックできるのは最大 {data0} 個です",
    maxlength: "入力されたテキストは {data0} 文字を超えることはできません",
    min: "数値が必要です、最小 {data0}",
    minage: "あなたは {data0} 歳以上でなければなりません",
    mincheck: "チェックできるのは最小 {data0} 個です",
    minlength: "入力されたテキストは {data0} 文字以上でなければなりません",
    nospaces: "入力された値にはスペースを含めることはできません",
    pattern: "無効なパターン",
    phonecountry: "入力された電話番号は正しくありません",
    phonenumber: "入力された電話番号は正しくありません",
    range: "値は {data0} と {data1} の間でなければなりません",
    rangelength: "長さは {data0} から {data1} 文字の間でなければなりません。",
    required: "このフィールドは必須です",
    security: "{data0}"
  },
  ko: {
    allowed: "허용 된 파일 {data0}",
    dateprevious: "날짜는 오늘보다 이전이어야합니다.",
    domains: "도메인 중 하나도 허용되지 않습니다.",
    equalto: "이 필드는 {data0}과 일치해야합니다.",
    isdate: "유효하지 않은 날짜",
    isemail: "유효하지 않은 이메일 주소",
    isnumber: "입력 한 값은 숫자 여야합니다.",
    isurl: "유효하지 않은 URL",
    max: "숫자 값이 필요합니다. 최대 {data0}",
    maxage: "당신은 {data0} 세 미만이어야합니다.",
    maxcheck: "최대 {data0} 개의 상자를 선택해야합니다.",
    maxlength: "입력 한 텍스트는 {data0} 자를 초과 할 수 없습니다.",
    min: "숫자 값이 필요합니다. 최소 {data0}",
    minage: "당신은 {data0} 세 이상이어야합니다.",
    mincheck: "최소 {data0} 개의 상자를 선택해야합니다.",
    minlength: "입력 한 텍스트는 {data0} 자 이상이어야합니다.",
    nospaces: "입력 한 값에는 공백을 포함 할 수 없습니다.",
    pattern: "잘못된 패턴",
    phonecountry: "입력 한 전화 번호가 올바르지 않습니다.",
    phonenumber: "입력 한 전화 번호가 올바르지 않습니다.",
    range: "값은 {data0}과 {data1} 사이 여야합니다.",
    rangelength: "길이는 {data0}에서 {data1} 문자 사이 여야합니다.",
    required: "이 필드는 필수입니다",
    security: "{data0}"
  },
  tr: {
    allowed: "İzin verilen dosyalar {data0}",
    dateprevious: "Tarih bugünden önce olmalıdır",
    domains: "Alan adlarının hiçbiri izin verilmez",
    equalto: "{data0} ile eşit olmalıdır",
    isdate: "Geçersiz tarih",
    isemail: "Geçersiz e-posta adresi",
    isnumber: "Girilen değer bir sayı olmalıdır",
    isurl: "Geçersiz url",
    max: "Sayısal değer gerekli, maksimum {data0}",
    maxage: "Yaşınız {data0} yaşından küçük olmalıdır",
    maxcheck: "En fazla {data0} kutuyu işaretlemelisiniz",
    maxlength: "Girilen metin {data0} karakterden uzun olamaz",
    min: "Sayısal değer gerekli, minimum {data0}",
    minage: "Yaşınız {data0} yaşından büyük olmalıdır",
    mincheck: "En az {data0} kutuyu işaretlemelisiniz",
    minlength: "Girilen metin en az {data0} karakter uzunluğunda olmalıdır",
    nospaces: "Girilen değer boşluk içeremez",
    pattern: "Geçersiz desen",
    phonecountry: "Girilen telefon numarası doğru değil",
    phonenumber: "Girilen telefon numarası doğru değil",
    range: "Değer {data0} ve {data1} arasında olmalıdır",
    rangelength: "Uzunluk {data0} ve {data1} karakter arasında olmalıdır.",
    required: "Bu alan gereklidir",
    security: "{data0}"
  },
  pl: {
    allowed: "Dozwolone pliki {data0}",
    dateprevious: "Data musi być wcześniejsza niż dzisiaj",
    domains: "Żaden z domen nie jest dozwolony",
    equalto: "Nie jest równe {data0}",
    isdate: "Nieprawidłowa data",
    isemail: "Nieprawidłowy adres e-mail",
    isnumber: "Wprowadzona wartość musi być liczbą",
    isurl: "Nieprawidłowy adres URL",
    max: "Wymagana wartość liczbową, maksimum {data0}",
    maxage: "Musisz mieć mniej niż {data0} lat",
    maxcheck: "Musisz zaznaczyć maksymalnie {data0} pól",
    maxlength: "Wprowadzony tekst nie może być dłuższy niż {data0} znaków",
    min: "Wymagana wartość liczbową, minimum {data0}",
    minage: "Musisz mieć więcej niż {data0} lat",
    mincheck: "Musisz zaznaczyć co najmniej {data0} pól",
    minlength: "Wprowadzony tekst musi mieć co najmniej {data0} znaków",
    nospaces: "Wprowadzona wartość nie może zawierać spacji",
    pattern: "Nieprawidłowy wzór",
    phonecountry: "Wprowadzony numer telefonu jest nieprawidłowy",
    phonenumber: "Wprowadzony numer telefonu jest nieprawidłowy",
    range: "Wartość musi być między {data0} a {data1}",
    rangelength: "Długość musi mieć od {data0} do {data1} znaków.",
    required: "To pole jest wymagane",
    security: "{data0}"
  }
};
class MjoValidator {
  constructor() {
    __privateAdd(this, _ageCalculator);
    __privateAdd(this, _defaultMessages);
    __privateAdd(this, _getErrorMessage);
    __privateAdd(this, _getInputValue);
    __privateAdd(this, _setInputError);
    __privateAdd(this, _phoneNumberFormat);
    __privateAdd(this, _setInputValue);
    __privateAdd(this, _validateIsEmail);
    __privateAdd(this, _validateIsUrl);
    __privateAdd(this, _validateIsRequired);
    __privateAdd(this, _validateNoSpaces);
    __privateAdd(this, _validateIsMinLength);
    __privateAdd(this, _validateIsMaxLength);
    __privateAdd(this, _validateIsRangeLength);
    __privateAdd(this, _validateIsNumber);
    __privateAdd(this, _validateIsMin);
    __privateAdd(this, _validateIsMax);
    __privateAdd(this, _validateIsRange);
    __privateAdd(this, _validateDomains);
    __privateAdd(this, _validateIsDate);
    __privateAdd(this, _validateIsDateprevius);
    __privateAdd(this, _validateIsMinage);
    __privateAdd(this, _validateIsMaxage);
    __privateAdd(this, _validateSecurity);
    __privateAdd(this, _validateEqualTo);
    __privateAdd(this, _validatePhonenumber);
    __privateAdd(this, _validatePhonecountry);
    __privateAdd(this, _validatePattern);
    __privateAdd(this, _validateAllowed);
    __privateAdd(this, _validateMincheck);
    __privateAdd(this, _validateMaxcheck);
  }
  validateForm({ elements, form }) {
    for (const input of elements) {
      const { errmsg, error, rule } = this.validateInput({ input, form, elements });
      if (error) {
        return {
          error,
          errmsg,
          rule,
          errInput: input
        };
      }
    }
    return {
      error: false,
      errmsg: "",
      rule: null,
      errInput: null
    };
  }
  validateInput({ input, form, elements }) {
    const response = {
      error: false,
      errmsg: "",
      rule: null
    };
    if (input.required) {
      response.error = !__privateMethod(this, _validateIsRequired, validateIsRequired_fn).call(this, input, form);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "required") : "";
      response.rule = "required";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.type === "email" || input.isemail) {
      response.error = !__privateMethod(this, _validateIsEmail, validateIsEmail_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "isemail") : "";
      response.rule = "isemail";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.type === "url" || input.isurl) {
      response.error = !__privateMethod(this, _validateIsUrl, validateIsUrl_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "isurl") : "";
      response.rule = "isurl";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.nospaces) {
      response.error = !__privateMethod(this, _validateNoSpaces, validateNoSpaces_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "nospaces") : "";
      response.rule = "nospaces";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.minlength !== void 0) {
      response.error = !__privateMethod(this, _validateIsMinLength, validateIsMinLength_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "minlength") : "";
      response.rule = "minlength";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.maxlength !== void 0) {
      response.error = !__privateMethod(this, _validateIsMaxLength, validateIsMaxLength_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "maxlength") : "";
      response.rule = "maxlength";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.rangelength) {
      response.error = !__privateMethod(this, _validateIsRangeLength, validateIsRangeLength_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "rangelength") : "";
      response.rule = "rangelength";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.isnumber) {
      response.error = !__privateMethod(this, _validateIsNumber, validateIsNumber_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "isnumber") : "";
      response.rule = "isnumber";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.min !== void 0) {
      response.error = !__privateMethod(this, _validateIsMin, validateIsMin_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "min") : "";
      response.rule = "min";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.max !== void 0) {
      response.error = !__privateMethod(this, _validateIsMax, validateIsMax_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "max") : "";
      response.rule = "max";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.range) {
      response.error = !__privateMethod(this, _validateIsRange, validateIsRange_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "range") : "";
      response.rule = "range";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.domains) {
      response.error = !__privateMethod(this, _validateDomains, validateDomains_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "domains") : "";
      response.rule = "domains";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.isdate) {
      response.error = !__privateMethod(this, _validateIsDate, validateIsDate_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "isdate") : "";
      response.rule = "isdate";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.isdate && input.dateprevious) {
      response.error = !__privateMethod(this, _validateIsDateprevius, validateIsDateprevius_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "dateprevious") : "";
      response.rule = "dateprevious";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.isdate && input.minage) {
      response.error = !__privateMethod(this, _validateIsMinage, validateIsMinage_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "minage") : "";
      response.rule = "minage";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.isdate && input.maxage) {
      response.error = !__privateMethod(this, _validateIsMaxage, validateIsMaxage_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "maxage") : "";
      response.rule = "maxage";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.security) {
      response.error = !__privateMethod(this, _validateSecurity, validateSecurity_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "security") : "";
      response.rule = "security";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.equalto) {
      const equalToElement = elements.find((el) => el.name === input.equalto);
      const variable = (equalToElement == null ? void 0 : equalToElement.label) ?? input.equalto;
      response.error = !__privateMethod(this, _validateEqualTo, validateEqualTo_fn).call(this, input, elements);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "equalto", [variable]) : "";
      response.rule = "equalto";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.phonenumber) {
      response.error = !__privateMethod(this, _validatePhonenumber, validatePhonenumber_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "phonenumber") : "";
      response.rule = "phonenumber";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.phonenumber && input.phonecountry) {
      response.error = !__privateMethod(this, _validatePhonecountry, validatePhonecountry_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "phonecountry") : "";
      response.rule = "phonecountry";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.pattern) {
      response.error = !__privateMethod(this, _validatePattern, validatePattern_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "pattern") : "";
      response.rule = "pattern";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.allowed) {
      response.error = !__privateMethod(this, _validateAllowed, validateAllowed_fn).call(this, input);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "allowed") : "";
      response.rule = "allowed";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.mincheck !== void 0) {
      response.error = !__privateMethod(this, _validateMincheck, validateMincheck_fn).call(this, input, form);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "mincheck") : "";
      response.rule = "mincheck";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    if (input.maxcheck !== void 0) {
      response.error = !__privateMethod(this, _validateMaxcheck, validateMaxcheck_fn).call(this, input, form);
      response.errmsg = response.error ? __privateMethod(this, _getErrorMessage, getErrorMessage_fn).call(this, input, "maxcheck") : "";
      response.rule = "maxcheck";
      __privateMethod(this, _setInputError, setInputError_fn).call(this, input, response.errmsg);
      if (response.error)
        return response;
    }
    input.success = true;
    input.error = false;
    input.errormsg = "";
    return response;
  }
}
_ageCalculator = new WeakSet();
ageCalculator_fn = function(date, format) {
  let year = null;
  let month = null;
  let day = null;
  date = date.toString();
  date = date.replace(new RegExp("/", "g"), "-");
  const arrDate = date.split("-");
  if (format === "aaaa-mm-dd") {
    year = parseInt(arrDate[0]);
    month = parseInt(arrDate[1]);
    day = parseInt(arrDate[2]);
  } else if (format === "dd-mm-aaaa") {
    year = parseInt(arrDate[2]);
    month = parseInt(arrDate[1]);
    day = parseInt(arrDate[0]);
  } else {
    year = parseInt(arrDate[2]);
    month = parseInt(arrDate[0]);
    day = parseInt(arrDate[1]);
  }
  const dateAct = /* @__PURE__ */ new Date();
  const actualyear = dateAct.getFullYear();
  const actualMonth = dateAct.getMonth() + 1;
  const actualDay = dateAct.getDate();
  let age = actualyear + 1900 - year;
  if (actualMonth < month)
    age--;
  if (month === actualMonth && day > actualDay)
    age--;
  if (age > 1900)
    age -= 1900;
  return age;
};
_defaultMessages = new WeakSet();
defaultMessages_fn = function(lang = "en") {
  const messages = validatorMessages[lang] ?? validatorMessages["en"];
  return messages;
};
_getErrorMessage = new WeakSet();
getErrorMessage_fn = function(input, rule, data) {
  var _a2, _b2, _c, _d;
  const name = input.name;
  if (name && this.inputsMessages && this.inputsMessages[name] && ((_a2 = this.inputsMessages[name]) == null ? void 0 : _a2[rule])) {
    let message2 = (_b2 = this.inputsMessages[name]) == null ? void 0 : _b2[rule];
    if (Array.isArray(data) && message2) {
      data.forEach((d, k) => {
        message2 = message2 == null ? void 0 : message2.replace(`{data${k}}`, d);
      });
    }
    if (message2)
      return message2;
  }
  if (name && this.messages && this.messages[rule]) {
    let message2 = this.messages[rule];
    if (Array.isArray(data) && message2) {
      data.forEach((d, k) => {
        message2 = message2 == null ? void 0 : message2.replace(`{data${k}}`, d);
      });
    }
    if (message2)
      return message2;
  }
  const lang = ((_d = (_c = document.querySelector("html")) == null ? void 0 : _c.getAttribute("lang")) == null ? void 0 : _d.split("-")[0]) || "en";
  const defaultMessages = __privateMethod(this, _defaultMessages, defaultMessages_fn).call(this, lang);
  let message = defaultMessages[rule];
  if (Array.isArray(data)) {
    data.forEach((d, k) => {
      message = message.replace(`{data${k}}`, d);
    });
  }
  return message;
};
_getInputValue = new WeakSet();
getInputValue_fn = function(input) {
  return input.getValue();
};
_setInputError = new WeakSet();
setInputError_fn = function(input, errmsg) {
  input.error = true;
  input.errormsg = errmsg;
  input.focus();
};
_phoneNumberFormat = new WeakSet();
phoneNumberFormat_fn = function(phone, country) {
  if (country === "es") {
    phone = phone.toString();
    phone = phone.replace(new RegExp(" ", "g"), "");
    if (phone.length === 13) {
      if (phone[4] === "9") {
        phone = `${phone[0]}${phone[1]}${phone[2]}${phone[3]} ${phone[4]} ${phone[5]} `;
        phone += `${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]} ${phone[11]}${phone[12]}`;
      } else {
        phone = `${phone[0]}${phone[1]}${phone[2]}${phone[3]} ${phone[4]} ${phone[5]}${phone[6]} `;
        phone += `${phone[7]}${phone[8]}${phone[9]} ${phone[10]}${phone[11]}${phone[12]}`;
      }
    } else if (phone.length === 12) {
      if (phone[3] === "9") {
        phone = `${phone[0]}${phone[1]}${phone[2]} ${phone[3]}${phone[4]} ${phone[5]}${phone[6]}${phone[7]} `;
        phone += `${phone[8]}${phone[9]} ${phone[10]}${phone[11]}`;
      } else {
        phone = `${phone[0]}${phone[1]}${phone[2]} ${phone[3]}${phone[4]}${phone[5]} `;
        phone += `${phone[6]}${phone[7]}${phone[8]} ${phone[9]}${phone[10]}${phone[11]}`;
      }
    } else if (phone[0] === "9") {
      phone = `${phone[0]}${phone[1]} ${phone[2]}${phone[3]}${phone[4]} ${phone[5]}${phone[6]} ${phone[7]}${phone[8]}`;
    } else {
      phone = `${phone[0]}${phone[1]}${phone[2]} ${phone[3]}${phone[4]}${phone[5]} ${phone[6]}${phone[7]}${phone[8]}`;
    }
  }
  return phone;
};
_setInputValue = new WeakSet();
setInputValue_fn = function(input, value) {
  input.setValue(value);
};
_validateIsEmail = new WeakSet();
validateIsEmail_fn = function(input) {
  const email = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  const se = email.split("@");
  if (!se[1])
    return false;
  if (email.indexOf("@", 0) === -1 || se[1].indexOf(".", 0) === -1)
    return false;
  return true;
};
_validateIsUrl = new WeakSet();
validateIsUrl_fn = function(input) {
  let url = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (!/^(http|https|ftp):\/\//.test(url) && url)
    url = "http://" + url;
  const regexp = /^(http|https|ftp):\/\/[a-z0-9.-]+\.[a-z]{2,4}/gi;
  if (!regexp.test(url) && url)
    return false;
  return true;
};
_validateIsRequired = new WeakSet();
validateIsRequired_fn = function(input, form) {
  if (!input.inputElement)
    return false;
  if (input.tagName !== "MJO-CHECKBOX" && input.tagName !== "MJO-RADIO") {
    const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
    if (!value)
      return false;
    return true;
  }
  const inputRef = input.inputElement;
  let { checked } = inputRef;
  if (inputRef.type === "checkbox" || inputRef.type === "radio") {
    checked = false;
    if (inputRef.hasAttribute("checked"))
      checked = true;
  }
  if (inputRef.type === "radio") {
    let checkedRadio = false;
    for (let i = 0; i < form.elements.length; i++) {
      if (form[i].checked) {
        checkedRadio = true;
        break;
      }
    }
    if (checkedRadio)
      checked = true;
  }
  return checked;
};
_validateNoSpaces = new WeakSet();
validateNoSpaces_fn = function(input) {
  const attr = input.getAttribute("nospaces");
  let value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  const regexp = /\s/;
  if (attr !== "autodel" && regexp.test(value))
    return false;
  value = value.split(" ").join("");
  __privateMethod(this, _setInputValue, setInputValue_fn).call(this, input, value);
  return true;
};
_validateIsMinLength = new WeakSet();
validateIsMinLength_fn = function(input) {
  const minlength = parseInt(input.getAttribute("minlength") ?? "0");
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (value.length < minlength)
    return false;
  return true;
};
_validateIsMaxLength = new WeakSet();
validateIsMaxLength_fn = function(input) {
  const maxlength = parseInt(input.getAttribute("maxlength") ?? "0");
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (value.length > maxlength)
    return false;
  return true;
};
_validateIsRangeLength = new WeakSet();
validateIsRangeLength_fn = function(input) {
  const rangelength = input.getAttribute("rangelength");
  if (typeof rangelength !== "string")
    return false;
  const rls = rangelength.split("|");
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (value.length < parseInt(rls[0]) || value.length > parseInt(rls[1]))
    return false;
  return true;
};
_validateIsNumber = new WeakSet();
validateIsNumber_fn = function(input) {
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (isNaN(Number(value)))
    return false;
  return true;
};
_validateIsMin = new WeakSet();
validateIsMin_fn = function(input) {
  const min = input.min;
  const valor = parseFloat(__privateMethod(this, _getInputValue, getInputValue_fn).call(this, input));
  if (isNaN(valor))
    return false;
  if (valor < min)
    return false;
  return true;
};
_validateIsMax = new WeakSet();
validateIsMax_fn = function(input) {
  const max = input.max;
  const valor = parseFloat(__privateMethod(this, _getInputValue, getInputValue_fn).call(this, input));
  if (isNaN(valor))
    return false;
  if (valor > max)
    return false;
  return true;
};
_validateIsRange = new WeakSet();
validateIsRange_fn = function(input) {
  if (!input.hasAttribute("range"))
    return true;
  const value = parseInt(__privateMethod(this, _getInputValue, getInputValue_fn).call(this, input));
  const range = input.getAttribute("range");
  if (typeof range !== "string")
    return false;
  const rgs = range.split("|");
  if (isNaN(value))
    return false;
  else if (value < parseInt(rgs[0]) || value > parseInt(rgs[1]))
    return false;
  return true;
};
_validateDomains = new WeakSet();
validateDomains_fn = function(input) {
  if (!input.hasAttribute("domains"))
    return true;
  const domains = input.getAttribute("domains");
  if (typeof domains !== "string")
    return false;
  const dms = domains.split("|");
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  let find = false;
  for (let i = 0; i < dms.length; i++) {
    const regexp = new RegExp(dms[i], "g");
    if (regexp.test(value)) {
      find = true;
      break;
    }
  }
  if (!find)
    return false;
  return true;
};
_validateIsDate = new WeakSet();
validateIsDate_fn = function(input) {
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (!value)
    return true;
  let date = value;
  date = date.toString();
  date = date.replace(new RegExp("/", "g"), "-");
  let format = "aaaa-mm-dd";
  if (input.hasAttribute("isdate"))
    format = input.getAttribute("isdate") ?? "aaaa-mm-dd";
  const splittedDate = date.split(" ");
  const arrDate = splittedDate[0].split("-");
  const arrHour = splittedDate[1] ? splittedDate[1].split(":") : null;
  let year = null;
  let month = null;
  let day = null;
  if (format === "aaaa-mm-dd")
    [year, month, day] = arrDate;
  else if (format === "dd-mm-aaaa")
    [day, month, year] = arrDate;
  else if (format === "mm-dd-aaaa")
    [month, day, year] = arrDate;
  const template = new Date(Number(year), Number(month) - 1, Number(day));
  if (!template || template.getFullYear() !== Number(year) && template.getMonth() !== Number(month) - 1 && template.getDate() !== Number(day)) {
    return false;
  }
  if (arrHour) {
    const hour = parseInt(arrHour[0]);
    const minute = parseInt(arrHour[1]);
    if (hour > 24 || minute > 60)
      return false;
  }
  return true;
};
_validateIsDateprevius = new WeakSet();
validateIsDateprevius_fn = function(input) {
  let date = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  date = date.toString();
  date = date.replace(new RegExp("/", "g"), "-");
  const format = input.getAttribute("isdate") ?? "aaaa-mm-dd";
  const dateSplitted = date.split(" ");
  const arrDate = dateSplitted[0].split("-");
  let year = null;
  let month = null;
  let day = null;
  if (format === "aaaa-mm-dd")
    [year, month, day] = arrDate;
  else if (format === "dd-mm-aaaa")
    [day, month, year] = arrDate;
  else if (format === "mm-dd-aaaa")
    [month, day, year] = arrDate;
  const x = /* @__PURE__ */ new Date();
  x.setFullYear(Number(year), Number(month) - 1, Number(day));
  const today = /* @__PURE__ */ new Date();
  if (x >= today)
    return false;
  return true;
};
_validateIsMinage = new WeakSet();
validateIsMinage_fn = function(input) {
  const minage = parseInt(input.getAttribute("minage") ?? "0");
  const format = input.getAttribute("isdate") ?? "aaaa-mm-dd";
  let date = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  date = date.toString();
  date = date.replace(new RegExp("/", "g"), "-");
  if (minage > __privateMethod(this, _ageCalculator, ageCalculator_fn).call(this, date, format))
    return false;
  return true;
};
_validateIsMaxage = new WeakSet();
validateIsMaxage_fn = function(input) {
  const maxage = parseInt(input.getAttribute("maxage") ?? "0");
  const format = input.getAttribute("isdate") ?? "aaaa-mm-dd";
  let date = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  date = date.toString();
  date = date.replace(new RegExp("/", "g"), "-");
  if (maxage < __privateMethod(this, _ageCalculator, ageCalculator_fn).call(this, date, format))
    return false;
  return true;
};
_validateSecurity = new WeakSet();
validateSecurity_fn = function(input) {
  const pass = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  let security = input.getAttribute("security");
  if (security !== "low" && security !== "medium" && security !== "high" && security !== "very-high")
    security = "medium";
  let regexp = null;
  if ((security === "very-high" || security === "high") && pass.length < 8)
    return false;
  else if (pass.length < 6)
    return false;
  if (security === "very-high") {
    regexp = /[@$*&#\-_+./;()[\]{}\\ºª%!¿?¡^~·¬]+/;
    if (!regexp.test(pass))
      return false;
  }
  if (security === "very-high" || security === "high") {
    regexp = /[0-9]+/;
    if (!regexp.test(pass))
      return false;
  }
  if (security === "very-high" || security === "high" || security === "medium") {
    regexp = /[a-z]+/;
    if (!regexp.test(pass))
      return false;
    regexp = /[A-Z]+/;
    if (!regexp.test(pass))
      return false;
  }
  return true;
};
_validateEqualTo = new WeakSet();
validateEqualTo_fn = function(input, elements) {
  const equalto = input.getAttribute("equalto");
  const inputEq = elements.find((el) => el.name === equalto);
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (!inputEq)
    return false;
  if (value !== __privateMethod(this, _getInputValue, getInputValue_fn).call(this, inputEq))
    return false;
  return true;
};
_validatePhonenumber = new WeakSet();
validatePhonenumber_fn = function(input) {
  let phoneNumber = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  phoneNumber = phoneNumber.toString();
  phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
  phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
  phoneNumber = phoneNumber.replace(new RegExp("\\.", "g"), "");
  phoneNumber = phoneNumber.replace(new RegExp("\\/", "g"), "");
  const regexp = /^((\+\d{1,3})|(00\d{1,3}))?(\(\d{1,3}\))?([\d]){7,11}$/;
  if (phoneNumber && (!regexp.test(phoneNumber) || phoneNumber.length < 8))
    return false;
  return true;
};
_validatePhonecountry = new WeakSet();
validatePhonecountry_fn = function(input) {
  let phoneNumber = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  let valid = false;
  if (!phoneNumber)
    return true;
  const countries = input.getAttribute("phonecountry");
  if (typeof countries !== "string")
    return false;
  const ctrs = countries.split("|");
  let regexp = null;
  let regexp2 = null;
  let regexp3 = null;
  for (let i = 0; i < ctrs.length; i++) {
    const country = ctrs[i];
    if (country === "es") {
      phoneNumber = phoneNumber.toString();
      phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
      regexp = /^((\+34)|(0034))?(6|7|8|9)(\d){8}$/;
      if (regexp.test(phoneNumber)) {
        valid = country;
        break;
      }
    }
    if (country === "uk") {
      phoneNumber = phoneNumber.toString();
      phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
      phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
      regexp = /^((\+44(\(0\))?(1|2|3|7|8))|(0044(\(0\))?(1|2|7))|(0(1|2|7)))\d{9}$/;
      if (regexp.test(phoneNumber)) {
        valid = country;
        break;
      }
    }
    if (country === "it") {
      phoneNumber = phoneNumber.toString();
      phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
      phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
      regexp = /^((\+39)|(0039))?(0)(\d){5,9}$/;
      regexp2 = /^((\+39)|(0039))?(3)(\d){9}$/;
      regexp3 = /^((\+39)|(0039))?(80)(\d){7}$/;
      if (regexp.test(phoneNumber) || regexp2.test(phoneNumber) || regexp3.test(phoneNumber)) {
        valid = country;
        break;
      }
    }
    if (country === "pt") {
      phoneNumber = phoneNumber.toString();
      phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
      phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
      regexp = /^((\+351)|(00351))?(2|7|8|9)(\d){8}$/;
      if (regexp.test(phoneNumber)) {
        valid = country;
        break;
      }
    }
    if (country === "fr") {
      phoneNumber = phoneNumber.toString();
      phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
      phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
      regexp = /^((\+33)|(0033))?(0)?(1|2|3|4|5|6|8)\d{8}$/;
      if (regexp.test(phoneNumber)) {
        valid = country;
        break;
      }
    }
    if (country === "us") {
      phoneNumber = phoneNumber.toString();
      phoneNumber = phoneNumber.replace(new RegExp(" ", "g"), "");
      phoneNumber = phoneNumber.replace(new RegExp("-", "g"), "");
      phoneNumber = phoneNumber.replace(new RegExp("\\.", "g"), "");
      phoneNumber = phoneNumber.replace(new RegExp("\\/", "g"), "");
      regexp = /^((\+1)|(001))?(1?((\(\d{3}\))|(\d{3})))?\d{7}$/;
      if (regexp.test(phoneNumber)) {
        valid = country;
        break;
      }
    }
  }
  if (!valid)
    return false;
  __privateMethod(this, _setInputValue, setInputValue_fn).call(this, input, __privateMethod(this, _phoneNumberFormat, phoneNumberFormat_fn).call(this, phoneNumber, valid));
  return true;
};
_validatePattern = new WeakSet();
validatePattern_fn = function(input) {
  const pattern = input.getAttribute("pattern");
  if (!pattern)
    return false;
  const regExp = new RegExp(pattern);
  const value = __privateMethod(this, _getInputValue, getInputValue_fn).call(this, input);
  if (value && !regExp.test(value))
    return false;
  return true;
};
_validateAllowed = new WeakSet();
validateAllowed_fn = function(input) {
  const allowed = input.getAttribute("allowed");
  if (!allowed)
    return false;
  const alls = allowed.split("|");
  const files = [];
  let valid = true;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const extspl = file.name.split(".");
    const ext = extspl[extspl.length - 1];
    let find = false;
    for (let o = 0; o < alls.length; o++) {
      if (alls[o] === ext) {
        find = true;
        break;
      }
    }
    if (!find) {
      valid = false;
      break;
    }
  }
  return valid;
};
_validateMincheck = new WeakSet();
validateMincheck_fn = function(input, form) {
  const mincheck = parseInt(input.getAttribute("mincheck") ?? "0");
  const checkgroup = input.getAttribute("checkgroup");
  const checkboxs = [...form.querySelectorAll("input[type=checkbox]"), ...form.querySelectorAll("mo-checkbox")];
  let checkeds = 0;
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].getAttribute("checkgroup") === checkgroup && checkboxs[i].hasAttribute("checked"))
      checkeds++;
  }
  if (mincheck > checkeds)
    return false;
  return true;
};
_validateMaxcheck = new WeakSet();
validateMaxcheck_fn = function(input, form) {
  const maxcheck = parseInt(input.getAttribute("maxcheck") ?? "0");
  const checkgroup = input.getAttribute("checkgroup");
  const checkboxs = [...form.querySelectorAll("input[type=checkbox]"), ...form.querySelectorAll("mo-checkbox")];
  let checkeds = 0;
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].getAttribute("checkgroup") === checkgroup && checkboxs[i].hasAttribute("checked"))
      checkeds++;
  }
  if (maxcheck < checkeds)
    return false;
  return true;
};
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
var _handleSubmit, handleSubmit_fn, _parseFormData, parseFormData_fn;
let MjoForm = class extends LitElement {
  constructor() {
    super(...arguments);
    __privateAdd$1(this, _handleSubmit);
    __privateAdd$1(this, _parseFormData);
    this.noValidate = false;
    this.errmessages = {};
    this.inputsErrmessages = {};
    this.formRef = createRef();
    this.elements = [];
    this.submitButton = null;
    this.validator = new MjoValidator();
  }
  render() {
    return html`<form ${ref(this.formRef)} enctype="multipart/form-data" @submit=${__privateMethod2(this, _handleSubmit, handleSubmit_fn)}>
            <slot></slot>
        </form>`;
  }
};
_handleSubmit = /* @__PURE__ */ new WeakSet();
handleSubmit_fn = function(event) {
  event.preventDefault();
  if (!this.formRef.value)
    return;
  this.validator.messages = this.errmessages;
  this.validator.inputsMessages = this.inputsErrmessages;
  const formData = new FormData(this.formRef.value);
  const validatorResponse = this.validator.validateForm({ elements: this.elements, form: this.formRef.value });
  const response = {
    elements: this.elements,
    data: __privateMethod2(this, _parseFormData, parseFormData_fn).call(this, formData),
    form: this,
    submitButton: this.submitButton,
    ...validatorResponse
  };
  if (!response.error && this.submitButton) {
    this.submitButton.loading = true;
  }
  this.dispatchEvent(new CustomEvent("submit", { detail: { formData, event, response }, bubbles: true, cancelable: true }));
};
_parseFormData = /* @__PURE__ */ new WeakSet();
parseFormData_fn = function(formData) {
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });
  return data;
};
MjoForm.styles = [
  css`
            :host {
                display: block;
            }
        `
];
__decorateClass$1([
  property({ type: Boolean })
], MjoForm.prototype, "noValidate", 2);
__decorateClass$1([
  property({ type: Object })
], MjoForm.prototype, "errmessages", 2);
__decorateClass$1([
  property({ type: Object })
], MjoForm.prototype, "inputsErrmessages", 2);
MjoForm = __decorateClass$1([
  customElement("mjo-form")
], MjoForm);
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
