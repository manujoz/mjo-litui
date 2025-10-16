import type { MjoDropdownContainer } from "./components/dropdown/mjo-dropdown-container";
import type { MjoTheme } from "./mjo-theme.js";
import type { MjoDropdownBehaviour, MjoDropdownCloseEvent, MjoDropdownOpenEvent, MjoDropdownPosition } from "./types/mjo-dropdown.d.js";

import { CSSResult, LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";
import { searchClosestElement } from "./utils/shadow-dom.js";
import { convertToPx } from "./utils/strings.js";

import "./components/dropdown/mjo-dropdown-container.js";

/**
 * @summary Accessible dropdown component that displays floating content relative to its trigger element.
 *
 * @slot - Trigger element that activates the dropdown (button, input, etc.)
 *
 * @fires mjo-dropdown:open - Fired when the dropdown opens
 * @fires mjo-dropdown:close - Fired when the dropdown closes
 *
 * @csspart dropdown-container - The floating container element (applied to mjo-dropdown-container in document body)
 *
 * @cssprop --mjo-dropdown-background-color - Background color of the dropdown container
 * @cssprop --mjo-dropdown-foreground-color - Text color of the dropdown content
 * @cssprop --mjo-dropdown-border-radius - Border radius of the dropdown container
 * @cssprop --mjo-dropdown-box-shadow - Box shadow of the dropdown container
 */
@customElement("mjo-dropdown")
export class MjoDropdown extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) idDropdown?: string;
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) scrollLocked = false;
    @property({ type: Boolean }) isOpen = false;
    @property({ type: Object }) css?: CSSResult;
    @property({ type: Object }) html?: TemplateResult<1>;
    @property({ type: String }) behaviour: MjoDropdownBehaviour = "hover";
    @property({ type: Number }) zIndex = 10;
    @property({ type: String, converter: convertToPx }) width?: string;
    @property({ type: String, converter: convertToPx }) height?: string;
    @property({ type: Boolean }) preventCloseOnInnerClick = false;
    @property({ type: String }) position: MjoDropdownPosition = "center-bottom";
    @property({ type: Boolean }) restoreFocus = true;
    /** Optional list of CSS selectors that, if any element in the click composedPath matches, will prevent opening (only for behaviour='click'). */
    @property({ type: Array }) suppressOpenSelectors?: string[];

    $dropdownContainer?: MjoDropdownContainer | null;
    #openTimestamp = 0;
    #lastFocusedElement?: HTMLElement;

    render() {
        return html`<slot
            role="button"
            tabindex="0"
            aria-haspopup="true"
            aria-expanded=${this.isOpen}
            aria-controls=${this.$dropdownContainer?.id || ""}
        ></slot>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.#createDropdown();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.#removeListeners();
    }

    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has("html") && this.html) {
            if (!this.$dropdownContainer) return;
            this.$dropdownContainer.html = this.html;
        }
        if (changedProperties.has("css") && this.css) {
            if (!this.$dropdownContainer) return;
            this.$dropdownContainer.css = this.css;
        }
        if (changedProperties.has("scrollLocked") && this.scrollLocked) {
            if (!this.$dropdownContainer) return;
            this.$dropdownContainer.scrollLocked = this.scrollLocked;
        }
        if (changedProperties.has("width") && this.width !== undefined) {
            if (!this.$dropdownContainer) return;

            this.$dropdownContainer.style.display = this.width;
        }

        if (changedProperties.has("behaviour") && this.behaviour !== undefined) {
            this.#removeListeners();
            this.#setListeners();
        }
    }

    /**
     * Opens the dropdown programmatically.
     */
    open() {
        this.#open();
    }

    /**
     * Closes the dropdown programmatically.
     */
    close(ev?: Event) {
        this.#close(ev);
    }

    /**
     * Recalculates and updates the dropdown position.
     */
    updatePosition() {
        this.$dropdownContainer?.updatePosition();
    }

    /**
     * Scrolls dropdown content to specified top position.
     */
    scrollToTop(top: number) {
        this.$dropdownContainer?.scrollToTop(top);
    }

    /**
     * Gets the current scroll position of the dropdown.
     */
    getScroll() {
        return this.$dropdownContainer?.getScroll() ?? { top: 0, left: 0 };
    }

    /**
     * Gets the current height of the dropdown container.
     */
    getHeigth() {
        return this.$dropdownContainer?.offsetHeight ?? 0;
    }

    #open() {
        if (this.isOpen || this.disabled) return;

        // Store current focused element for restoration
        if (this.restoreFocus) {
            this.#lastFocusedElement = document.activeElement as HTMLElement;
        }

        if (this.fullwidth && this.$dropdownContainer) {
            this.$dropdownContainer.width = `${this.offsetWidth}px`;
        }

        if (this.height && this.$dropdownContainer) {
            this.$dropdownContainer.height = this.height;
        }

        this.isOpen = true;
        this.$dropdownContainer?.open();
        this.#openTimestamp = Date.now();

        // Dispatch custom event with new naming convention
        const openEvent = new CustomEvent("mjo-dropdown:open", {
            detail: {},
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(openEvent);
        document.addEventListener("keydown", this.#handleKeydown);
    }

    #close(ev?: Event) {
        if (!this.isOpen) return;
        const path = ev?.composedPath();
        const insideHost = !!path?.includes(this);
        const insideContainer = !!(this.$dropdownContainer && path?.includes(this.$dropdownContainer));

        if (insideHost && this.behaviour === "click" && Date.now() - this.#openTimestamp < 100) return;

        if (insideContainer && this.preventCloseOnInnerClick) return;

        if (insideHost && !insideContainer) return;

        this.isOpen = false;
        this.$dropdownContainer?.close();
        this.#openTimestamp = 0;

        // Restore focus to the trigger element
        if (this.restoreFocus && this.#lastFocusedElement) {
            this.#lastFocusedElement.focus();
            this.#lastFocusedElement = undefined;
        }

        // Dispatch custom event with new naming convention
        const closeEvent = new CustomEvent("mjo-dropdown:close", {
            detail: {},
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(closeEvent);

        document.removeEventListener("keydown", this.#handleKeydown);
    }

    #createDropdown() {
        const themeElement = searchClosestElement(this as LitElement, "mjo-theme") as MjoTheme | null;

        this.$dropdownContainer = document.createElement("mjo-dropdown-container") as unknown as MjoDropdownContainer;
        this.$dropdownContainer.host = this;
        this.$dropdownContainer.html = this.html;
        this.$dropdownContainer.css = this.css;
        this.$dropdownContainer.scrollLocked = this.scrollLocked;
        this.$dropdownContainer.position = this.position;
        this.$dropdownContainer.zIndex = this.zIndex;

        const id = this.idDropdown;
        if (id) this.$dropdownContainer.id = id;

        if (this.theme) this.$dropdownContainer.theme = this.theme as Record<string, string>;

        if (this.width) this.$dropdownContainer.style.width = this.width;

        // Set up ARIA attributes
        const dropdownId = `dropdown-${Math.random().toString(36).substring(2, 9)}`;
        this.$dropdownContainer.id = dropdownId;

        if (themeElement) {
            const themeClone = document.createElement("mjo-theme") as MjoTheme;
            themeClone.config = themeElement.config;
            themeClone.theme = themeElement.theme;
            themeClone.scope = "local";
            themeClone.appendChild(this.$dropdownContainer);
            document.body.appendChild(themeClone);
        } else {
            document.body.appendChild(this.$dropdownContainer);
        }
    }

    #setListeners() {
        if (this.behaviour === "hover") {
            this.addEventListener("mouseenter", this.#handleOpen);
            this.$dropdownContainer?.addEventListener("mouseleave", this.#handleClose);
        } else {
            this.addEventListener("click", this.#handleOpen);
        }

        document.addEventListener("click", this.#handleClose);
    }

    #removeListeners() {
        this.removeEventListener("mouseenter", this.#handleOpen);
        this.$dropdownContainer?.removeEventListener("mouseleave", this.#handleClose);
        this.removeEventListener("click", this.#handleOpen);
        document.removeEventListener("click", this.#handleClose);
    }

    #handleKeydown = (ev: KeyboardEvent) => {
        if (ev.key === "Escape" && this.isOpen) {
            ev.preventDefault();
            this.close();
        }
    };

    #handleClose = (ev: Event) => {
        this.close(ev);
    };

    #handleOpen = (ev: Event) => {
        if (this.behaviour === "click" && ev?.type === "click" && this.suppressOpenSelectors?.length) {
            const path = ev.composedPath();
            if (
                path.some((n) => {
                    const el = n as HTMLElement;
                    if (!el || !el.matches) return false;
                    return this.suppressOpenSelectors!.some((sel) => {
                        try {
                            return el.matches(sel);
                        } catch {
                            return false;
                        }
                    });
                })
            ) {
                return;
            }
        }
        this.open();
    };

    static styles = [
        css`
            :host {
                display: inline-block;
                max-height: max-content;
                max-width: max-content;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-dropdown": MjoDropdown;
    }

    interface HTMLElementEventMap {
        "mjo-dropdown:open": MjoDropdownOpenEvent;
        "mjo-dropdown:close": MjoDropdownCloseEvent;
    }
}
