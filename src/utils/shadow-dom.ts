import { type LitElement } from "lit";
import { toRgbaObject } from "./colors.js";

export const getParentNodes = function* (el: HTMLElement | ShadowRoot["host"]) {
    let current: HTMLElement | Element | null = el;

    while (current) {
        // Check if current element is slotted (assigned to a slot)
        if ("assignedSlot" in current && current.assignedSlot) {
            // Element is slotted - traverse to slot's parent host
            const slot = current.assignedSlot as HTMLSlotElement;
            if (slot.parentElement) {
                current = slot.parentElement;
                yield current as HTMLElement;
            } else {
                const rootNode = slot.getRootNode();
                if (rootNode !== document && "host" in rootNode) {
                    current = (rootNode as ShadowRoot).host as HTMLElement;
                    yield current;
                } else {
                    break;
                }
            }
        }

        // Normal DOM traversal
        if (current.parentElement) {
            current = current.parentElement;
            yield current as HTMLElement;
        } else {
            // No parent element - check if we're in a shadow root
            const rootNode = current.getRootNode();
            if (rootNode !== document && "host" in rootNode) {
                // We're in a shadow root - traverse to the host
                current = (rootNode as ShadowRoot).host as HTMLElement;
                yield current;
            } else {
                // Reached document root
                break;
            }
        }
    }
};

export const searchClosestElement = (element: LitElement, selector: keyof HTMLElementTagNameMap) => {
    let parent: HTMLElement | ShadowRoot["host"] | null = element.parentElement || (element.getRootNode() as ShadowRoot).host;

    let el = querySelectorShadowRoot(selector, parent);
    if (el) {
        return el;
    }
    while (parent) {
        if (parent.tagName === selector.toUpperCase()) {
            return parent;
        }
        parent = parent.parentElement || (parent.getRootNode() as ShadowRoot)?.host;
        if (parent?.shadowRoot) {
            el = querySelectorShadowRoot(selector, parent);

            if (el) {
                return el;
            }
        }
    }

    return null;
};

export const querySelectorShadowRoot = (selector: keyof HTMLElementTagNameMap, element: HTMLElement | Element | null) => {
    if (element?.shadowRoot) {
        return element.shadowRoot.querySelector(selector);
    }
    return null;
};

export const searchParentElement = (component: HTMLElement, tagName: string) => {
    const parentNodesGen = getParentNodes(component);
    for (const parent of parentNodesGen) {
        if (parent.tagName === tagName.toUpperCase()) {
            return parent;
        }
    }
    return null;
};

export const getInheritBackgroundColor = (component: HTMLElement) => {
    const parentNodesGen = getParentNodes(component);
    let parent = parentNodesGen.next();
    let lastColor = "";
    let backgroundColor = "";
    while (parent.done === false) {
        const backgroundColorComputed = window.getComputedStyle(parent.value).backgroundColor;
        lastColor = backgroundColorComputed;
        const rgba = toRgbaObject(backgroundColorComputed);
        if (rgba.a > 0) {
            backgroundColor = backgroundColorComputed;
            break;
        }
        parent = parentNodesGen.next();
    }

    return backgroundColor || lastColor;
};

export const getScrollbarElements = (element: HTMLElement) => {
    const elements: HTMLElement[] = [];
    while (element) {
        if (element.scrollHeight > element.clientHeight) {
            if (element.tagName === "HTML") {
                element = window as unknown as HTMLElement;
                elements.push(element);
            } else {
                elements.push(element);
            }
        }
        element = ((element.parentNode as ShadowRoot)?.host as HTMLElement) ?? element.parentNode;
    }

    return elements;
};
