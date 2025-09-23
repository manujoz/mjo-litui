export class ScrollLock {
    scrollElements: { element: Element; scrollTop: number }[] = [];
    host: Element;
    onScroll?: (ev: Event) => void;
    onWheel?: (ev: WheelEvent) => void;

    #paddingRightSaved = "";
    #overflowYSaved = "";
    #css = false;

    constructor(host: Element) {
        this.host = host;
    }

    getScrollbarElements() {
        this.scrollElements = [];

        let element = this.host;
        while (element) {
            if (element.scrollHeight > element.clientHeight) {
                if (element.tagName === "HTML") {
                    element = window as unknown as Element;
                    this.scrollElements.push({ element, scrollTop: (element as unknown as Window).scrollY });
                } else {
                    this.scrollElements.push({ element, scrollTop: element.scrollTop });
                }
            }
            element = ((element.parentNode as ShadowRoot)?.host as HTMLElement) ?? element.parentNode;
        }

        return this.scrollElements;
    }

    lock(css: boolean = false) {
        if (css) {
            const body = document.body;
            const style = getComputedStyle(body);

            if (style.overflowY === "hidden") return;

            this.#paddingRightSaved = body.style.paddingRight;
            this.#overflowYSaved = body.style.overflowY;
            this.#css = true;

            const paddingRight = parseFloat(style.paddingRight);
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            body.style.paddingRight = `${scrollbarWidth + paddingRight}px`;
            body.style.overflowY = "hidden";

            return;
        }

        this.getScrollbarElements();

        this.scrollElements.forEach(({ element }) => {
            element.addEventListener("scroll", this.#handleScroll);
        });

        document.addEventListener("wheel", this.#handleWheel, { passive: false });
    }

    unlock() {
        if (this.#css) {
            const body = document.body;
            body.style.paddingRight = this.#paddingRightSaved;
            body.style.overflowY = this.#overflowYSaved;

            this.#css = false;
            this.#paddingRightSaved = "";
            this.#overflowYSaved = "";

            return;
        }

        this.scrollElements.forEach(({ element }) => {
            element.removeEventListener("scroll", this.#handleScroll);
        });

        document.removeEventListener("wheel", this.#handleWheel);
        this.scrollElements = [];
    }

    #handleScroll = (ev: Event) => {
        if (typeof this.onScroll === "function") this.onScroll(ev);

        const target = ev.currentTarget as HTMLElement;

        for (const { element, scrollTop } of this.scrollElements) {
            if (element !== target) continue;

            if (element === (window as unknown as HTMLElement)) {
                window.scrollTo(0, scrollTop);
            } else {
                element.scrollTop = scrollTop;
            }
        }
    };

    #handleWheel = (ev: WheelEvent) => {
        if (ev.target !== this.host) ev.preventDefault();

        if (typeof this.onWheel === "function") this.onWheel(ev);
    };
}
