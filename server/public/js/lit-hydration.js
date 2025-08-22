var _a, _b;
import { _ as _$LH$1, n as noChange, P as PartType, r as render } from "./lit-core.js";
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
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
((_a = window.ShadyDOM) == null ? void 0 : _a.inUse) && ((_b = window.ShadyDOM) == null ? void 0 : _b.noPatch) === true ? window.ShadyDOM.wrap : (node) => node;
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
const { TemplateInstance, isIterable, resolveDirective, ChildPart, ElementPart } = _$LH;
const hydrate = (rootValue, container, options = {}) => {
  if (container["_$litPart$"] !== void 0) {
    throw new Error("container already contains a live render");
  }
  let rootPart = void 0;
  let rootPartMarker = void 0;
  let currentChildPart = void 0;
  const stack = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_COMMENT);
  let marker;
  while ((marker = walker.nextNode()) !== null) {
    const markerText = marker.data;
    if (markerText.startsWith("lit-part")) {
      if (stack.length === 0 && rootPart !== void 0) {
        throw new Error(`There must be only one root part per container. Found a part marker (${marker}) when we already have a root part marker (${rootPartMarker})`);
      }
      currentChildPart = openChildPart(rootValue, marker, stack, options);
      if (rootPart === void 0) {
        rootPart = currentChildPart;
      }
      rootPartMarker ?? (rootPartMarker = marker);
    } else if (markerText.startsWith("lit-node")) {
      createAttributeParts(marker, stack, options);
    } else if (markerText.startsWith("/lit-part")) {
      if (stack.length === 1 && currentChildPart !== rootPart) {
        throw new Error("internal error");
      }
      currentChildPart = closeChildPart(marker, currentChildPart, stack);
    }
  }
  if (rootPart === void 0) {
    const elementMessage = container instanceof ShadowRoot ? `{container.host.localName}'s shadow root` : container instanceof DocumentFragment ? "DocumentFragment" : container.localName;
    console.error(`There should be exactly one root part in a render container, but we didn't find any in ${elementMessage}.`);
  }
  container["_$litPart$"] = rootPart;
};
const openChildPart = (rootValue, marker, stack, options) => {
  let value;
  let part;
  if (stack.length === 0) {
    part = new ChildPart(marker, null, void 0, options);
    value = rootValue;
  } else {
    const state = stack[stack.length - 1];
    if (state.type === "template-instance") {
      part = new ChildPart(marker, null, state.instance, options);
      state.instance._$parts.push(part);
      value = state.result.values[state.instancePartIndex++];
      state.templatePartIndex++;
    } else if (state.type === "iterable") {
      part = new ChildPart(marker, null, state.part, options);
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
      part = new ChildPart(marker, null, state.part, options);
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
    if (marker.data === markerWithDigest) {
      const template = ChildPart.prototype._$getTemplate(value);
      const instance = new TemplateInstance(template, part);
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
const closeChildPart = (marker, part, stack) => {
  if (part === void 0) {
    throw new Error("unbalanced part marker");
  }
  part._$endNode = marker;
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
        const instancePart = new ElementPart(node, state.instance, options);
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
//# sourceMappingURL=lit-hydration.js.map
