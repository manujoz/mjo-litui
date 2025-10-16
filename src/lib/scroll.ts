import { getScrollbarElements } from "../utils/shadow-dom";

export class ScrollLock {
    scrollElements: { element: HTMLElement; paddingRight: string; overflowY: string; boxSizing: string }[] = [];
    host: Element;

    constructor(host: Element) {
        this.host = host;
    }

    /**
     * Locks scrolling on the page or parent scrollable elements.
     * @param cascade - If true, locks all scrollable parent elements. If false, only locks the body element. Default is false.
     */
    lock(cascade = false) {
        if (cascade) {
            this.#getScrollbarElements();
        } else {
            this.scrollElements = [{ element: window as unknown as HTMLElement, paddingRight: "", overflowY: "", boxSizing: "" }];
        }

        this.scrollElements.forEach((se) => {
            const element = (se.element as unknown as Window) === window ? document.body : se.element;

            const style = getComputedStyle(element);
            if (style.overflowY === "hidden") return;

            se.paddingRight = element.style.paddingRight;
            se.overflowY = element.style.overflowY;
            se.boxSizing = element.style.boxSizing;

            const paddingRight = parseFloat(style.paddingRight);
            let scrollbarWidth = 0;
            if ((se.element as unknown as Window) === window) {
                scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            } else {
                scrollbarWidth = se.element.offsetWidth - se.element.clientWidth;
            }

            element.style.paddingRight = `${scrollbarWidth + paddingRight}px`;
            element.style.overflowY = "hidden";
            element.style.boxSizing = "border-box";
        });
    }

    /**
     * Unlocks scrolling on the page or parent scrollable elements.
     */
    unlock() {
        this.scrollElements.forEach((se) => {
            const element = (se.element as unknown as Window) === window ? document.body : se.element;
            element.style.paddingRight = se.paddingRight;
            element.style.overflowY = se.overflowY;
            element.style.boxSizing = se.boxSizing;
        });

        this.scrollElements = [];
    }

    #getScrollbarElements() {
        const elements = getScrollbarElements(this.host as HTMLElement);

        this.scrollElements = [];
        elements.forEach((el) => {
            this.scrollElements.push({ element: el, paddingRight: "", overflowY: "", boxSizing: "" });
        });

        return this.scrollElements;
    }
}
