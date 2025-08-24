import { type LitElement } from "lit";

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
