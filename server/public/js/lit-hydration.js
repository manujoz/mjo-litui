/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c, _d;
const global = globalThis;
const debugLogEvent = (event) => {
  const shouldEmit = global.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
};
let debugLogRenderId = 0;
let issueWarning;
{
  global.litIssuedWarnings ?? (global.litIssuedWarnings = /* @__PURE__ */ new Set());
  issueWarning = (code, warning) => {
    warning += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!global.litIssuedWarnings.has(warning)) {
      console.warn(warning);
      global.litIssuedWarnings.add(warning);
    }
  };
  issueWarning("dev-mode", `Lit is in dev mode. Not recommended for production!`);
}
const wrap = ((_a = global.ShadyDOM) == null ? void 0 : _a.inUse) && ((_b = global.ShadyDOM) == null ? void 0 : _b.noPatch) === true ? global.ShadyDOM.wrap : (node) => node;
const trustedTypes = global.trustedTypes;
const policy = trustedTypes ? trustedTypes.createPolicy("lit-html", {
  createHTML: (s) => s
}) : void 0;
const identityFunction = (value) => value;
const noopSanitizer = (_node, _name, _type) => identityFunction;
const setSanitizer = (newSanitizer) => {
  if (sanitizerFactoryInternal !== noopSanitizer) {
    throw new Error(`Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.`);
  }
  sanitizerFactoryInternal = newSanitizer;
};
const _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
  sanitizerFactoryInternal = noopSanitizer;
};
const createSanitizer = (node, name, type) => {
  return sanitizerFactoryInternal(node, name, type);
};
const boundAttributeSuffix = "$lit$";
const marker = `lit$${Math.random().toFixed(9).slice(2)}$`;
const markerMatch = "?" + marker;
const nodeMarker = `<${markerMatch}>`;
const d = document;
const createMarker = () => d.createComment("");
const isPrimitive$1 = (value) => value === null || typeof value != "object" && typeof value != "function";
const isArray = Array.isArray;
const isIterable$1 = (value) => isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
typeof (value == null ? void 0 : value[Symbol.iterator]) === "function";
const SPACE_CHAR = `[ 	
\f\r]`;
const ATTR_VALUE_CHAR = `[^ 	
\f\r"'\`<>=]`;
const NAME_CHAR = `[^\\s"'>=/]`;
const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
const comment2EndRegex = />/g;
const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, "g");
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
const rawTextElement = /^(?:script|style|textarea|title)$/i;
const HTML_RESULT = 1;
const SVG_RESULT = 2;
const MATHML_RESULT = 3;
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
const noChange = Symbol.for("lit-noChange");
const nothing = Symbol.for("lit-nothing");
const templateCache = /* @__PURE__ */ new WeakMap();
const walker = d.createTreeWalker(
  d,
  129
  /* NodeFilter.SHOW_{ELEMENT|COMMENT} */
);
let sanitizerFactoryInternal = noopSanitizer;
function trustFromTemplateString(tsa, stringFromTSA) {
  if (!isArray(tsa) || !tsa.hasOwnProperty("raw")) {
    let message = "invalid template strings array";
    {
      message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, "\n");
    }
    throw new Error(message);
  }
  return policy !== void 0 ? policy.createHTML(stringFromTSA) : stringFromTSA;
}
const getTemplateHtml = (strings, type) => {
  const l = strings.length - 1;
  const attrNames = [];
  let html = type === SVG_RESULT ? "<svg>" : type === MATHML_RESULT ? "<math>" : "";
  let rawTextEndRegex;
  let regex = textEndRegex;
  for (let i = 0; i < l; i++) {
    const s = strings[i];
    let attrNameEndIndex = -1;
    let attrName;
    let lastIndex = 0;
    let match;
    while (lastIndex < s.length) {
      regex.lastIndex = lastIndex;
      match = regex.exec(s);
      if (match === null) {
        break;
      }
      lastIndex = regex.lastIndex;
      if (regex === textEndRegex) {
        if (match[COMMENT_START] === "!--") {
          regex = commentEndRegex;
        } else if (match[COMMENT_START] !== void 0) {
          regex = comment2EndRegex;
        } else if (match[TAG_NAME] !== void 0) {
          if (rawTextElement.test(match[TAG_NAME])) {
            rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, "g");
          }
          regex = tagEndRegex;
        } else if (match[DYNAMIC_TAG_NAME] !== void 0) {
          {
            throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
          }
        }
      } else if (regex === tagEndRegex) {
        if (match[ENTIRE_MATCH] === ">") {
          regex = rawTextEndRegex ?? textEndRegex;
          attrNameEndIndex = -1;
        } else if (match[ATTRIBUTE_NAME] === void 0) {
          attrNameEndIndex = -2;
        } else {
          attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
          attrName = match[ATTRIBUTE_NAME];
          regex = match[QUOTE_CHAR] === void 0 ? tagEndRegex : match[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
        }
      } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
        regex = tagEndRegex;
      } else if (regex === commentEndRegex || regex === comment2EndRegex) {
        regex = textEndRegex;
      } else {
        regex = tagEndRegex;
        rawTextEndRegex = void 0;
      }
    }
    {
      console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, "unexpected parse state B");
    }
    const end = regex === tagEndRegex && strings[i + 1].startsWith("/>") ? " " : "";
    html += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? i : end);
  }
  const htmlResult = html + (strings[l] || "<?>") + (type === SVG_RESULT ? "</svg>" : type === MATHML_RESULT ? "</math>" : "");
  return [trustFromTemplateString(strings, htmlResult), attrNames];
};
class Template {
  constructor({ strings, ["_$litType$"]: type }, options) {
    this.parts = [];
    let node;
    let nodeIndex = 0;
    let attrNameIndex = 0;
    const partCount = strings.length - 1;
    const parts = this.parts;
    const [html, attrNames] = getTemplateHtml(strings, type);
    this.el = Template.createElement(html, options);
    walker.currentNode = this.el.content;
    if (type === SVG_RESULT || type === MATHML_RESULT) {
      const wrapper = this.el.content.firstChild;
      wrapper.replaceWith(...wrapper.childNodes);
    }
    while ((node = walker.nextNode()) !== null && parts.length < partCount) {
      if (node.nodeType === 1) {
        {
          const tag = node.localName;
          if (/^(?:textarea|template)$/i.test(tag) && node.innerHTML.includes(marker)) {
            const m = `Expressions are not supported inside \`${tag}\` elements. See https://lit.dev/msg/expression-in-${tag} for more information.`;
            if (tag === "template") {
              throw new Error(m);
            } else
              issueWarning("", m);
          }
        }
        if (node.hasAttributes()) {
          for (const name of node.getAttributeNames()) {
            if (name.endsWith(boundAttributeSuffix)) {
              const realName = attrNames[attrNameIndex++];
              const value = node.getAttribute(name);
              const statics = value.split(marker);
              const m = /([.?@])?(.*)/.exec(realName);
              parts.push({
                type: ATTRIBUTE_PART,
                index: nodeIndex,
                name: m[2],
                strings: statics,
                ctor: m[1] === "." ? PropertyPart : m[1] === "?" ? BooleanAttributePart : m[1] === "@" ? EventPart : AttributePart
              });
              node.removeAttribute(name);
            } else if (name.startsWith(marker)) {
              parts.push({
                type: ELEMENT_PART,
                index: nodeIndex
              });
              node.removeAttribute(name);
            }
          }
        }
        if (rawTextElement.test(node.tagName)) {
          const strings2 = node.textContent.split(marker);
          const lastIndex = strings2.length - 1;
          if (lastIndex > 0) {
            node.textContent = trustedTypes ? trustedTypes.emptyScript : "";
            for (let i = 0; i < lastIndex; i++) {
              node.append(strings2[i], createMarker());
              walker.nextNode();
              parts.push({ type: CHILD_PART, index: ++nodeIndex });
            }
            node.append(strings2[lastIndex], createMarker());
          }
        }
      } else if (node.nodeType === 8) {
        const data = node.data;
        if (data === markerMatch) {
          parts.push({ type: CHILD_PART, index: nodeIndex });
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            parts.push({ type: COMMENT_PART, index: nodeIndex });
            i += marker.length - 1;
          }
        }
      }
      nodeIndex++;
    }
    {
      if (attrNames.length !== attrNameIndex) {
        throw new Error(`Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=\${true} ?disabled=\${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: 
\`` + strings.join("${...}") + "`");
      }
    }
    debugLogEvent && debugLogEvent({
      kind: "template prep",
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings
    });
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @nocollapse */
  static createElement(html, _options) {
    const el = d.createElement("template");
    el.innerHTML = html;
    return el;
  }
}
function resolveDirective$1(part, value, parent = part, attributeIndex) {
  var _a2, _b2;
  if (value === noChange) {
    return value;
  }
  let currentDirective = attributeIndex !== void 0 ? (_a2 = parent.__directives) == null ? void 0 : _a2[attributeIndex] : parent.__directive;
  const nextDirectiveConstructor = isPrimitive$1(value) ? void 0 : (
    // This property needs to remain unminified.
    value["_$litDirective$"]
  );
  if ((currentDirective == null ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
    (_b2 = currentDirective == null ? void 0 : currentDirective["_$notifyDirectiveConnectionChanged"]) == null ? void 0 : _b2.call(currentDirective, false);
    if (nextDirectiveConstructor === void 0) {
      currentDirective = void 0;
    } else {
      currentDirective = new nextDirectiveConstructor(part);
      currentDirective._$initialize(part, parent, attributeIndex);
    }
    if (attributeIndex !== void 0) {
      (parent.__directives ?? (parent.__directives = []))[attributeIndex] = currentDirective;
    } else {
      parent.__directive = currentDirective;
    }
  }
  if (currentDirective !== void 0) {
    value = resolveDirective$1(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
  }
  return value;
}
let TemplateInstance$1 = class TemplateInstance {
  constructor(template, parent) {
    this._$parts = [];
    this._$disconnectableChildren = void 0;
    this._$template = template;
    this._$parent = parent;
  }
  // Called by ChildPart parentNode getter
  get parentNode() {
    return this._$parent.parentNode;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  // This method is separate from the constructor because we need to return a
  // DocumentFragment and we don't want to hold onto it with an instance field.
  _clone(options) {
    const { el: { content }, parts } = this._$template;
    const fragment = ((options == null ? void 0 : options.creationScope) ?? d).importNode(content, true);
    walker.currentNode = fragment;
    let node = walker.nextNode();
    let nodeIndex = 0;
    let partIndex = 0;
    let templatePart = parts[0];
    while (templatePart !== void 0) {
      if (nodeIndex === templatePart.index) {
        let part;
        if (templatePart.type === CHILD_PART) {
          part = new ChildPart$1(node, node.nextSibling, this, options);
        } else if (templatePart.type === ATTRIBUTE_PART) {
          part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
        } else if (templatePart.type === ELEMENT_PART) {
          part = new ElementPart$1(node, this, options);
        }
        this._$parts.push(part);
        templatePart = parts[++partIndex];
      }
      if (nodeIndex !== (templatePart == null ? void 0 : templatePart.index)) {
        node = walker.nextNode();
        nodeIndex++;
      }
    }
    walker.currentNode = d;
    return fragment;
  }
  _update(values) {
    let i = 0;
    for (const part of this._$parts) {
      if (part !== void 0) {
        debugLogEvent && debugLogEvent({
          kind: "set part",
          part,
          value: values[i],
          valueIndex: i,
          values,
          templateInstance: this
        });
        if (part.strings !== void 0) {
          part._$setValue(values, part, i);
          i += part.strings.length - 2;
        } else {
          part._$setValue(values[i]);
        }
      }
      i++;
    }
  }
};
let ChildPart$1 = class ChildPart {
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    var _a2;
    return ((_a2 = this._$parent) == null ? void 0 : _a2._$isConnected) ?? this.__isConnected;
  }
  constructor(startNode, endNode, parent, options) {
    this.type = CHILD_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this._$startNode = startNode;
    this._$endNode = endNode;
    this._$parent = parent;
    this.options = options;
    this.__isConnected = (options == null ? void 0 : options.isConnected) ?? true;
    {
      this._textSanitizer = void 0;
    }
  }
  /**
   * The parent node into which the part renders its content.
   *
   * A ChildPart's content consists of a range of adjacent child nodes of
   * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
   * `.endNode`).
   *
   * - If both `.startNode` and `.endNode` are non-null, then the part's content
   * consists of all siblings between `.startNode` and `.endNode`, exclusively.
   *
   * - If `.startNode` is non-null but `.endNode` is null, then the part's
   * content consists of all siblings following `.startNode`, up to and
   * including the last child of `.parentNode`. If `.endNode` is non-null, then
   * `.startNode` will always be non-null.
   *
   * - If both `.endNode` and `.startNode` are null, then the part's content
   * consists of all child nodes of `.parentNode`.
   */
  get parentNode() {
    let parentNode = wrap(this._$startNode).parentNode;
    const parent = this._$parent;
    if (parent !== void 0 && (parentNode == null ? void 0 : parentNode.nodeType) === 11) {
      parentNode = parent.parentNode;
    }
    return parentNode;
  }
  /**
   * The part's leading marker node, if any. See `.parentNode` for more
   * information.
   */
  get startNode() {
    return this._$startNode;
  }
  /**
   * The part's trailing marker node, if any. See `.parentNode` for more
   * information.
   */
  get endNode() {
    return this._$endNode;
  }
  _$setValue(value, directiveParent = this) {
    var _a2;
    if (this.parentNode === null) {
      throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
    }
    value = resolveDirective$1(this, value, directiveParent);
    if (isPrimitive$1(value)) {
      if (value === nothing || value == null || value === "") {
        if (this._$committedValue !== nothing) {
          debugLogEvent && debugLogEvent({
            kind: "commit nothing to child",
            start: this._$startNode,
            end: this._$endNode,
            parent: this._$parent,
            options: this.options
          });
          this._$clear();
        }
        this._$committedValue = nothing;
      } else if (value !== this._$committedValue && value !== noChange) {
        this._commitText(value);
      }
    } else if (value["_$litType$"] !== void 0) {
      this._commitTemplateResult(value);
    } else if (value.nodeType !== void 0) {
      if (((_a2 = this.options) == null ? void 0 : _a2.host) === value) {
        this._commitText(`[probable mistake: rendered a template's host in itself (commonly caused by writing \${this} in a template]`);
        console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
        return;
      }
      this._commitNode(value);
    } else if (isIterable$1(value)) {
      this._commitIterable(value);
    } else {
      this._commitText(value);
    }
  }
  _insert(node) {
    return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
  }
  _commitNode(value) {
    var _a2;
    if (this._$committedValue !== value) {
      this._$clear();
      if (sanitizerFactoryInternal !== noopSanitizer) {
        const parentNodeName = (_a2 = this._$startNode.parentNode) == null ? void 0 : _a2.nodeName;
        if (parentNodeName === "STYLE" || parentNodeName === "SCRIPT") {
          let message = "Forbidden";
          {
            if (parentNodeName === "STYLE") {
              message = `Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css\`...\` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.`;
            } else {
              message = `Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.`;
            }
          }
          throw new Error(message);
        }
      }
      debugLogEvent && debugLogEvent({
        kind: "commit node",
        start: this._$startNode,
        parent: this._$parent,
        value,
        options: this.options
      });
      this._$committedValue = this._insert(value);
    }
  }
  _commitText(value) {
    if (this._$committedValue !== nothing && isPrimitive$1(this._$committedValue)) {
      const node = wrap(this._$startNode).nextSibling;
      {
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(node, "data", "property");
        }
        value = this._textSanitizer(value);
      }
      debugLogEvent && debugLogEvent({
        kind: "commit text",
        node,
        value,
        options: this.options
      });
      node.data = value;
    } else {
      {
        const textNode = d.createTextNode("");
        this._commitNode(textNode);
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(textNode, "data", "property");
        }
        value = this._textSanitizer(value);
        debugLogEvent && debugLogEvent({
          kind: "commit text",
          node: textNode,
          value,
          options: this.options
        });
        textNode.data = value;
      }
    }
    this._$committedValue = value;
  }
  _commitTemplateResult(result) {
    var _a2;
    const { values, ["_$litType$"]: type } = result;
    const template = typeof type === "number" ? this._$getTemplate(result) : (type.el === void 0 && (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)), type);
    if (((_a2 = this._$committedValue) == null ? void 0 : _a2._$template) === template) {
      debugLogEvent && debugLogEvent({
        kind: "template updating",
        template,
        instance: this._$committedValue,
        parts: this._$committedValue._$parts,
        options: this.options,
        values
      });
      this._$committedValue._update(values);
    } else {
      const instance = new TemplateInstance$1(template, this);
      const fragment = instance._clone(this.options);
      debugLogEvent && debugLogEvent({
        kind: "template instantiated",
        template,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      instance._update(values);
      debugLogEvent && debugLogEvent({
        kind: "template instantiated and updated",
        template,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      this._commitNode(fragment);
      this._$committedValue = instance;
    }
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @internal */
  _$getTemplate(result) {
    let template = templateCache.get(result.strings);
    if (template === void 0) {
      templateCache.set(result.strings, template = new Template(result));
    }
    return template;
  }
  _commitIterable(value) {
    if (!isArray(this._$committedValue)) {
      this._$committedValue = [];
      this._$clear();
    }
    const itemParts = this._$committedValue;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      if (partIndex === itemParts.length) {
        itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
      } else {
        itemPart = itemParts[partIndex];
      }
      itemPart._$setValue(item);
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
      itemParts.length = partIndex;
    }
  }
  /**
   * Removes the nodes contained within this Part from the DOM.
   *
   * @param start Start node to clear from, for clearing a subset of the part's
   *     DOM (used when truncating iterables)
   * @param from  When `start` is specified, the index within the iterable from
   *     which ChildParts are being removed, used for disconnecting directives in
   *     those Parts.
   *
   * @internal
   */
  _$clear(start = wrap(this._$startNode).nextSibling, from) {
    var _a2;
    (_a2 = this._$notifyConnectionChanged) == null ? void 0 : _a2.call(this, false, true, from);
    while (start && start !== this._$endNode) {
      const n = wrap(start).nextSibling;
      wrap(start).remove();
      start = n;
    }
  }
  /**
   * Implementation of RootPart's `isConnected`. Note that this method
   * should only be called on `RootPart`s (the `ChildPart` returned from a
   * top-level `render()` call). It has no effect on non-root ChildParts.
   * @param isConnected Whether to set
   * @internal
   */
  setConnected(isConnected) {
    var _a2;
    if (this._$parent === void 0) {
      this.__isConnected = isConnected;
      (_a2 = this._$notifyConnectionChanged) == null ? void 0 : _a2.call(this, isConnected);
    } else {
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
    }
  }
};
class AttributePart {
  get tagName() {
    return this.element.tagName;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  constructor(element, name, strings, parent, options) {
    this.type = ATTRIBUTE_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this.element = element;
    this.name = name;
    this._$parent = parent;
    this.options = options;
    if (strings.length > 2 || strings[0] !== "" || strings[1] !== "") {
      this._$committedValue = new Array(strings.length - 1).fill(new String());
      this.strings = strings;
    } else {
      this._$committedValue = nothing;
    }
    {
      this._sanitizer = void 0;
    }
  }
  /**
   * Sets the value of this part by resolving the value from possibly multiple
   * values and static strings and committing it to the DOM.
   * If this part is single-valued, `this._strings` will be undefined, and the
   * method will be called with a single value argument. If this part is
   * multi-value, `this._strings` will be defined, and the method is called
   * with the value array of the part's owning TemplateInstance, and an offset
   * into the value array from which the values should be read.
   * This method is overloaded this way to eliminate short-lived array slices
   * of the template instance values, and allow a fast-path for single-valued
   * parts.
   *
   * @param value The part value, or an array of values for multi-valued parts
   * @param valueIndex the index to start reading values from. `undefined` for
   *   single-valued parts
   * @param noCommit causes the part to not commit its value to the DOM. Used
   *   in hydration to prime attribute parts with their first-rendered value,
   *   but not set the attribute, and in SSR to no-op the DOM operation and
   *   capture the value for serialization.
   *
   * @internal
   */
  _$setValue(value, directiveParent = this, valueIndex, noCommit) {
    const strings = this.strings;
    let change = false;
    if (strings === void 0) {
      value = resolveDirective$1(this, value, directiveParent, 0);
      change = !isPrimitive$1(value) || value !== this._$committedValue && value !== noChange;
      if (change) {
        this._$committedValue = value;
      }
    } else {
      const values = value;
      value = strings[0];
      let i, v;
      for (i = 0; i < strings.length - 1; i++) {
        v = resolveDirective$1(this, values[valueIndex + i], directiveParent, i);
        if (v === noChange) {
          v = this._$committedValue[i];
        }
        change || (change = !isPrimitive$1(v) || v !== this._$committedValue[i]);
        if (v === nothing) {
          value = nothing;
        } else if (value !== nothing) {
          value += (v ?? "") + strings[i + 1];
        }
        this._$committedValue[i] = v;
      }
    }
    if (change && !noCommit) {
      this._commitValue(value);
    }
  }
  /** @internal */
  _commitValue(value) {
    if (value === nothing) {
      wrap(this.element).removeAttribute(this.name);
    } else {
      {
        if (this._sanitizer === void 0) {
          this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "attribute");
        }
        value = this._sanitizer(value ?? "");
      }
      debugLogEvent && debugLogEvent({
        kind: "commit attribute",
        element: this.element,
        name: this.name,
        value,
        options: this.options
      });
      wrap(this.element).setAttribute(this.name, value ?? "");
    }
  }
}
class PropertyPart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = PROPERTY_PART;
  }
  /** @internal */
  _commitValue(value) {
    {
      if (this._sanitizer === void 0) {
        this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "property");
      }
      value = this._sanitizer(value);
    }
    debugLogEvent && debugLogEvent({
      kind: "commit property",
      element: this.element,
      name: this.name,
      value,
      options: this.options
    });
    this.element[this.name] = value === nothing ? void 0 : value;
  }
}
class BooleanAttributePart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = BOOLEAN_ATTRIBUTE_PART;
  }
  /** @internal */
  _commitValue(value) {
    debugLogEvent && debugLogEvent({
      kind: "commit boolean attribute",
      element: this.element,
      name: this.name,
      value: !!(value && value !== nothing),
      options: this.options
    });
    wrap(this.element).toggleAttribute(this.name, !!value && value !== nothing);
  }
}
class EventPart extends AttributePart {
  constructor(element, name, strings, parent, options) {
    super(element, name, strings, parent, options);
    this.type = EVENT_PART;
    if (this.strings !== void 0) {
      throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
    }
  }
  // EventPart does not use the base _$setValue/_resolveValue implementation
  // since the dirty checking is more complex
  /** @internal */
  _$setValue(newListener, directiveParent = this) {
    newListener = resolveDirective$1(this, newListener, directiveParent, 0) ?? nothing;
    if (newListener === noChange) {
      return;
    }
    const oldListener = this._$committedValue;
    const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
    const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
    debugLogEvent && debugLogEvent({
      kind: "commit event listener",
      element: this.element,
      name: this.name,
      value: newListener,
      options: this.options,
      removeListener: shouldRemoveListener,
      addListener: shouldAddListener,
      oldListener
    });
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.name, this, oldListener);
    }
    if (shouldAddListener) {
      this.element.addEventListener(this.name, this, newListener);
    }
    this._$committedValue = newListener;
  }
  handleEvent(event) {
    var _a2;
    if (typeof this._$committedValue === "function") {
      this._$committedValue.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, event);
    } else {
      this._$committedValue.handleEvent(event);
    }
  }
}
let ElementPart$1 = class ElementPart {
  constructor(element, parent, options) {
    this.element = element;
    this.type = ELEMENT_PART;
    this._$disconnectableChildren = void 0;
    this._$parent = parent;
    this.options = options;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value) {
    debugLogEvent && debugLogEvent({
      kind: "commit to element binding",
      element: this.element,
      value,
      options: this.options
    });
    resolveDirective$1(this, value);
  }
};
const _$LH$1 = {
  // Used in lit-ssr
  _boundAttributeSuffix: boundAttributeSuffix,
  _marker: marker,
  _markerMatch: markerMatch,
  _HTML_RESULT: HTML_RESULT,
  _getTemplateHtml: getTemplateHtml,
  // Used in tests and private-ssr-support
  _TemplateInstance: TemplateInstance$1,
  _isIterable: isIterable$1,
  _resolveDirective: resolveDirective$1,
  _ChildPart: ChildPart$1,
  _AttributePart: AttributePart,
  _BooleanAttributePart: BooleanAttributePart,
  _EventPart: EventPart,
  _PropertyPart: PropertyPart,
  _ElementPart: ElementPart$1
};
const polyfillSupport = global.litHtmlPolyfillSupportDevMode;
polyfillSupport == null ? void 0 : polyfillSupport(Template, ChildPart$1);
(global.litHtmlVersions ?? (global.litHtmlVersions = [])).push("3.2.0");
if (global.litHtmlVersions.length > 1) {
  issueWarning("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
const render = (value, container, options) => {
  if (container == null) {
    throw new TypeError(`The container to render into may not be ${container}`);
  }
  const renderId = debugLogRenderId++;
  const partOwnerNode = (options == null ? void 0 : options.renderBefore) ?? container;
  let part = partOwnerNode["_$litPart$"];
  debugLogEvent && debugLogEvent({
    kind: "begin render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  if (part === void 0) {
    const endNode = (options == null ? void 0 : options.renderBefore) ?? null;
    partOwnerNode["_$litPart$"] = part = new ChildPart$1(container.insertBefore(createMarker(), endNode), endNode, void 0, options ?? {});
  }
  part._$setValue(value);
  debugLogEvent && debugLogEvent({
    kind: "end render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  return part;
};
{
  render.setSanitizer = setSanitizer;
  render.createSanitizer = createSanitizer;
  {
    render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let resolveMethodName = null;
const _$LH = {
  boundAttributeSuffix: _$LH$1._boundAttributeSuffix,
  marker: _$LH$1._marker,
  markerMatch: _$LH$1._markerMatch,
  HTML_RESULT: _$LH$1._HTML_RESULT,
  getTemplateHtml: _$LH$1._getTemplateHtml,
  overrideDirectiveResolve: (directiveClass, resolveOverrideFn) => class extends directiveClass {
    _$resolve(_part, values) {
      return resolveOverrideFn(this, values);
    }
  },
  patchDirectiveResolve: (directiveClass, resolveOverrideFn) => {
    if (directiveClass.prototype._$resolve !== resolveOverrideFn) {
      resolveMethodName ?? (resolveMethodName = directiveClass.prototype._$resolve.name);
      for (let proto = directiveClass.prototype; proto !== Object.prototype; proto = Object.getPrototypeOf(proto)) {
        if (proto.hasOwnProperty(resolveMethodName)) {
          proto[resolveMethodName] = resolveOverrideFn;
          return;
        }
      }
      throw new Error(`Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527`);
    }
  },
  setDirectiveClass(value, directiveClass) {
    value["_$litDirective$"] = directiveClass;
  },
  getAttributePartCommittedValue: (part, value, index) => {
    let committedValue = noChange;
    part._commitValue = (value2) => committedValue = value2;
    part._$setValue(value, part, index);
    return committedValue;
  },
  connectedDisconnectable: (props) => ({
    ...props,
    _$isConnected: true
  }),
  resolveDirective: _$LH$1._resolveDirective,
  AttributePart: _$LH$1._AttributePart,
  PropertyPart: _$LH$1._PropertyPart,
  BooleanAttributePart: _$LH$1._BooleanAttributePart,
  EventPart: _$LH$1._EventPart,
  ElementPart: _$LH$1._ElementPart,
  TemplateInstance: _$LH$1._TemplateInstance,
  isIterable: _$LH$1._isIterable,
  ChildPart: _$LH$1._ChildPart
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const PartType = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
((_c = window.ShadyDOM) == null ? void 0 : _c.inUse) && ((_d = window.ShadyDOM) == null ? void 0 : _d.noPatch) === true ? window.ShadyDOM.wrap : (node) => node;
const isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
const isTemplateResult = (value, type) => type === void 0 ? (
  // This property needs to remain unminified.
  (value == null ? void 0 : value["_$litType$"]) !== void 0
) : (value == null ? void 0 : value["_$litType$"]) === type;
const isCompiledTemplateResult = (value) => {
  var _a2;
  return ((_a2 = value == null ? void 0 : value["_$litType$"]) == null ? void 0 : _a2.h) != null;
};
const isSingleExpression = (part) => part.strings === void 0;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { TemplateInstance: TemplateInstance2, isIterable, resolveDirective, ChildPart: ChildPart2, ElementPart: ElementPart2 } = _$LH;
const hydrate = (rootValue, container, options = {}) => {
  if (container["_$litPart$"] !== void 0) {
    throw new Error("container already contains a live render");
  }
  let rootPart = void 0;
  let rootPartMarker = void 0;
  let currentChildPart = void 0;
  const stack = [];
  const walker2 = document.createTreeWalker(container, NodeFilter.SHOW_COMMENT);
  let marker2;
  while ((marker2 = walker2.nextNode()) !== null) {
    const markerText = marker2.data;
    if (markerText.startsWith("lit-part")) {
      if (stack.length === 0 && rootPart !== void 0) {
        throw new Error(`There must be only one root part per container. Found a part marker (${marker2}) when we already have a root part marker (${rootPartMarker})`);
      }
      currentChildPart = openChildPart(rootValue, marker2, stack, options);
      if (rootPart === void 0) {
        rootPart = currentChildPart;
      }
      rootPartMarker ?? (rootPartMarker = marker2);
    } else if (markerText.startsWith("lit-node")) {
      createAttributeParts(marker2, stack, options);
    } else if (markerText.startsWith("/lit-part")) {
      if (stack.length === 1 && currentChildPart !== rootPart) {
        throw new Error("internal error");
      }
      currentChildPart = closeChildPart(marker2, currentChildPart, stack);
    }
  }
  if (rootPart === void 0) {
    const elementMessage = container instanceof ShadowRoot ? `{container.host.localName}'s shadow root` : container instanceof DocumentFragment ? "DocumentFragment" : container.localName;
    console.error(`There should be exactly one root part in a render container, but we didn't find any in ${elementMessage}.`);
  }
  container["_$litPart$"] = rootPart;
};
const openChildPart = (rootValue, marker2, stack, options) => {
  let value;
  let part;
  if (stack.length === 0) {
    part = new ChildPart2(marker2, null, void 0, options);
    value = rootValue;
  } else {
    const state = stack[stack.length - 1];
    if (state.type === "template-instance") {
      part = new ChildPart2(marker2, null, state.instance, options);
      state.instance._$parts.push(part);
      value = state.result.values[state.instancePartIndex++];
      state.templatePartIndex++;
    } else if (state.type === "iterable") {
      part = new ChildPart2(marker2, null, state.part, options);
      const result = state.iterator.next();
      if (result.done) {
        value = void 0;
        state.done = true;
        throw new Error("Unhandled shorter than expected iterable");
      } else {
        value = result.value;
      }
      state.part._$committedValue.push(part);
    } else {
      part = new ChildPart2(marker2, null, state.part, options);
    }
  }
  value = resolveDirective(part, value);
  if (value === noChange) {
    stack.push({ part, type: "leaf" });
  } else if (isPrimitive(value)) {
    stack.push({ part, type: "leaf" });
    part._$committedValue = value;
  } else if (isTemplateResult(value)) {
    if (isCompiledTemplateResult(value)) {
      throw new Error("compiled templates are not supported");
    }
    const markerWithDigest = `lit-part ${digestForTemplateResult(value)}`;
    if (marker2.data === markerWithDigest) {
      const template = ChildPart2.prototype._$getTemplate(value);
      const instance = new TemplateInstance2(template, part);
      stack.push({
        type: "template-instance",
        instance,
        part,
        templatePartIndex: 0,
        instancePartIndex: 0,
        result: value
      });
      part._$committedValue = instance;
    } else {
      throw new Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");
    }
  } else if (isIterable(value)) {
    stack.push({
      part,
      type: "iterable",
      value,
      iterator: value[Symbol.iterator](),
      done: false
    });
    part._$committedValue = [];
  } else {
    stack.push({ part, type: "leaf" });
    part._$committedValue = value == null ? "" : value;
  }
  return part;
};
const closeChildPart = (marker2, part, stack) => {
  if (part === void 0) {
    throw new Error("unbalanced part marker");
  }
  part._$endNode = marker2;
  const currentState = stack.pop();
  if (currentState.type === "iterable") {
    if (!currentState.iterator.next().done) {
      throw new Error("unexpected longer than expected iterable");
    }
  }
  if (stack.length > 0) {
    const state = stack[stack.length - 1];
    return state.part;
  } else {
    return void 0;
  }
};
const createAttributeParts = (comment, stack, options) => {
  const match = /lit-node (\d+)/.exec(comment.data);
  const nodeIndex = parseInt(match[1]);
  const node = comment.nextElementSibling;
  if (node === null) {
    throw new Error("could not find node for attribute parts");
  }
  node.removeAttribute("defer-hydration");
  const state = stack[stack.length - 1];
  if (state.type === "template-instance") {
    const instance = state.instance;
    while (true) {
      const templatePart = instance._$template.parts[state.templatePartIndex];
      if (templatePart === void 0 || templatePart.type !== PartType.ATTRIBUTE && templatePart.type !== PartType.ELEMENT || templatePart.index !== nodeIndex) {
        break;
      }
      if (templatePart.type === PartType.ATTRIBUTE) {
        const instancePart = new templatePart.ctor(node, templatePart.name, templatePart.strings, state.instance, options);
        const value = isSingleExpression(instancePart) ? state.result.values[state.instancePartIndex] : state.result.values;
        const noCommit = !(instancePart.type === PartType.EVENT || instancePart.type === PartType.PROPERTY);
        instancePart._$setValue(value, instancePart, state.instancePartIndex, noCommit);
        state.instancePartIndex += templatePart.strings.length - 1;
        instance._$parts.push(instancePart);
      } else {
        const instancePart = new ElementPart2(node, state.instance, options);
        resolveDirective(instancePart, state.result.values[state.instancePartIndex++]);
        instance._$parts.push(instancePart);
      }
      state.templatePartIndex++;
    }
  } else {
    throw new Error(`Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.`);
  }
};
const digestSize = 2;
const digestForTemplateResult = (templateResult) => {
  const hashes = new Uint32Array(digestSize).fill(5381);
  for (const s of templateResult.strings) {
    for (let i = 0; i < s.length; i++) {
      hashes[i % digestSize] = hashes[i % digestSize] * 33 ^ s.charCodeAt(i);
    }
  }
  const str = String.fromCharCode(...new Uint8Array(hashes.buffer));
  return btoa(str);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const HYDRATE_INTERNALS_ATTR_PREFIX = "hydrate-internals-";
globalThis.litElementHydrateSupport = ({ LitElement }) => {
  const observedAttributes = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(LitElement), "observedAttributes").get;
  Object.defineProperty(LitElement, "observedAttributes", {
    get() {
      return [...observedAttributes.call(this), "defer-hydration"];
    }
  });
  const attributeChangedCallback = LitElement.prototype.attributeChangedCallback;
  LitElement.prototype.attributeChangedCallback = function(name, old, value) {
    if (name === "defer-hydration" && value === null) {
      connectedCallback.call(this);
    }
    attributeChangedCallback.call(this, name, old, value);
  };
  const connectedCallback = LitElement.prototype.connectedCallback;
  LitElement.prototype.connectedCallback = function() {
    if (!this.hasAttribute("defer-hydration")) {
      connectedCallback.call(this);
    }
  };
  const createRenderRoot = LitElement.prototype.createRenderRoot;
  LitElement.prototype.createRenderRoot = function() {
    if (this.shadowRoot) {
      this._$needsHydration = true;
      return this.shadowRoot;
    } else {
      return createRenderRoot.call(this);
    }
  };
  const update = Object.getPrototypeOf(LitElement.prototype).update;
  LitElement.prototype.update = function(changedProperties) {
    const value = this.render();
    update.call(this, changedProperties);
    if (this._$needsHydration) {
      this._$needsHydration = false;
      for (let i = 0; i < this.attributes.length; i++) {
        const attr = this.attributes[i];
        if (attr.name.startsWith(HYDRATE_INTERNALS_ATTR_PREFIX)) {
          const ariaAttr = attr.name.slice(HYDRATE_INTERNALS_ATTR_PREFIX.length);
          this.removeAttribute(ariaAttr);
          this.removeAttribute(attr.name);
        }
      }
      hydrate(value, this.renderRoot, this.renderOptions);
    } else {
      render(value, this.renderRoot, this.renderOptions);
    }
  };
};
console.log("🔧 Lit SSR hydration support loaded");
//# sourceMappingURL=lit-hydration.js.map
