import { type LitElement } from "lit";
import { parseColorToRgba } from "./colors.js";

export const getParentNodes = function* (el: HTMLElement | ShadowRoot["host"]) {
    let current: HTMLElement | Element | null = el.parentElement || (el.getRootNode() as ShadowRoot).host;
    while (current) {
        yield current as HTMLElement;

        current = current?.parentElement || (current?.getRootNode() as ShadowRoot).host;
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

export const getInheritBackgroundColor = (component: HTMLElement) => {
    const parentNodesGen = getParentNodes(component);
    let parent = parentNodesGen.next();
    let lastColor = "";
    let backgroundColor = "";
    while (parent.done === false) {
        const backgroundColorComputed = window.getComputedStyle(parent.value).backgroundColor;
        lastColor = backgroundColorComputed;
        const rgba = parseColorToRgba(backgroundColorComputed);
        if (rgba.a > 0) {
            backgroundColor = backgroundColorComputed;
            break;
        }
        parent = parentNodesGen.next();
    }

    return backgroundColor || lastColor;
};
