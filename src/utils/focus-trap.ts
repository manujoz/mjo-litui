/**
 * Simple focus trap using the inert API
 */
export class FocusTrap {
    #component: HTMLElement;
    #options: FocusTrapOptions;
    #inertElements: HTMLElement[] = [];
    #isActive = false;
    #lastFocusedElement: HTMLElement | null = null;

    constructor(component: HTMLElement, options: FocusTrapOptions = {}) {
        this.#component = component;
        this.#options = { ...options };
    }

    #getActiveElement() {
        let activeElement = document.activeElement as HTMLElement | null;

        while (activeElement?.shadowRoot && activeElement.shadowRoot.activeElement) {
            activeElement = activeElement.shadowRoot.activeElement as HTMLElement;
        }

        return activeElement;
    }

    activate() {
        if (this.#isActive) {
            return;
        }

        this.#lastFocusedElement = this.#getActiveElement();

        this.#makeOtherElementsInert();
        this.#isActive = true;

        const initialFocus =
            typeof this.#options.initialFocus === "string"
                ? this.#component.querySelector<HTMLElement>(this.#options.initialFocus)
                : this.#options.initialFocus || this.#component;

        if (initialFocus) {
            initialFocus.focus();
        }

        if (typeof this.#options.onActivate === "function") {
            this.#options.onActivate();
        }
    }

    deactivate() {
        if (!this.#isActive) {
            return;
        }

        this.#restoreInertElements();

        if (this.#lastFocusedElement && !this.#options.disabledRestoreFocus) {
            this.#lastFocusedElement.focus();
        }

        this.#isActive = false;

        if (typeof this.#options.onDeactivate === "function") {
            this.#options.onDeactivate();
        }
    }

    #makeOtherElementsInert() {
        const bodyChildren = Array.from(document.body.children) as HTMLElement[];

        for (const child of bodyChildren) {
            if (this.#component.contains(child) || child === this.#component) {
                continue;
            }

            if (!child.inert) {
                child.inert = true;
                this.#inertElements.push(child);
            }
        }
    }

    #restoreInertElements() {
        for (const element of this.#inertElements) {
            element.inert = false;
        }

        this.#inertElements = [];
    }
}

export interface FocusTrapOptions {
    /** Element to focus when trap is activated */
    initialFocus?: string | HTMLElement;
    /** Callback when trap is activated */
    onActivate?: () => void;
    /** Callback when trap is deactivated */
    onDeactivate?: () => void;
    /** Disable focus restoration when trap is deactivated */
    disabledRestoreFocus?: boolean;
}
