/**
 * Simple focus trap using the inert API
 */
export interface FocusTrapOptions {
    /** Element to focus when trap is activated */
    initialFocus?: string;
    /** Callback when trap is activated */
    onActivate?: () => void;
    /** Callback when trap is deactivated */
    onDeactivate?: () => void;
    /** Disable focus restoration when trap is deactivated */
    disabledRestoreFocus?: boolean;
}

export class FocusTrap {
    private component: HTMLElement;
    private options: FocusTrapOptions;
    private inertElements: HTMLElement[] = [];
    private isActive = false;
    private lastFocusedElement: HTMLElement | null = null;

    constructor(component: HTMLElement, options: FocusTrapOptions = {}) {
        this.component = component;
        this.options = {
            ...options,
        };
    }

    activate(): void {
        if (this.isActive) return;

        // Store the currently focused element
        this.lastFocusedElement = this.#getActiveElememt();

        // Make all other elements inert
        this.#makeOtherElementsInert();

        this.isActive = true;

        // Focus initial element
        const initialFocus = this.options.initialFocus ? (this.component.querySelector(this.options.initialFocus) as HTMLElement) : this.component;

        if (initialFocus) {
            initialFocus.focus();
        }

        // Call activation callback
        this.options.onActivate?.();
    }

    deactivate(): void {
        if (!this.isActive) return;

        // Restore inert state
        this.#restoreInertElements();

        // Restore focus only if not disabled
        if (this.lastFocusedElement && !this.options.disabledRestoreFocus) {
            this.lastFocusedElement.focus();
        }

        this.isActive = false;

        // Call deactivation callback
        this.options.onDeactivate?.();
    }

    #makeOtherElementsInert(): void {
        const bodyChildren = Array.from(document.body.children) as HTMLElement[];

        for (const child of bodyChildren) {
            if (!this.component.contains(child) && child !== this.component) {
                if (!child.inert) {
                    child.inert = true;
                    this.inertElements.push(child);
                }
            }
        }
    }

    #restoreInertElements(): void {
        for (const element of this.inertElements) {
            element.inert = false;
        }
        this.inertElements = [];
    }

    #getActiveElememt() {
        let activeElement = document.activeElement as HTMLElement | null;

        while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
            activeElement = activeElement.shadowRoot.activeElement as HTMLElement;
        }

        return activeElement;
    }
}
