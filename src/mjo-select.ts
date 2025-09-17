import { type MjoOption } from "./components/select/mjo-option.js";
import { type MjointOptionsList } from "./components/select/mjoint-options-list.js";
import { type MjoDropdown } from "./mjo-dropdown.js";
import {
    MjoSelectBlurEvent,
    MjoSelectChangeEvent,
    MjoSelectClearEvent,
    MjoSelectCloseEvent,
    type MjoSelectColor,
    MjoSelectFocusEvent,
    MjoSelectKeydownEvent,
    MjoSelectOpenEvent,
    MjoSelectOptionPreselectEvent,
    MjoSelectSearchEvent,
    type MjoSelectSize,
} from "./types/mjo-select.js";
import { type MjoDropdownTheme } from "./types/mjo-theme.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AiOutlineDown } from "mjo-icons/ai";

import { FormMixin, type IFormMixin } from "./mixins/form-mixin.js";
import { type IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { type IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./components/input/mjoint-input-helper-text.js";
import "./components/input/mjoint-input-label.js";
import "./components/select/mjo-option.js";
import "./components/select/mjoint-options-list.js";
import "./mjo-dropdown.js";

/**
 * @summary Comprehensive dropdown select component with search functionality, rich options support, and full form integration.
 *
 * @description The mjo-select component provides a sophisticated dropdown selection interface with support for
 * icons, images, search functionality, and comprehensive form integration. It works with mjo-option elements
 * to create flexible and user-friendly selection experiences with full accessibility support.
 *
 * @fires mjo-select:change - Fired when the selected value changes with detailed information
 * @fires mjo-select:open - Fired when the dropdown opens
 * @fires mjo-select:close - Fired when the dropdown closes
 * @fires mjo-select:search - Fired when searching through options (when searchable is enabled)
 * @fires mjo-select:focus - Fired when the select gains focus
 * @fires mjo-select:blur - Fired when the select loses focus
 * @fires mjo-select:option-preselect - Fired when an option is preselected via keyboard navigation
 * @fires change - Standard HTML change event
 * @fires focus - Standard HTML focus event
 * @fires invalid - Fired when validation fails
 *
 * @slot - Contains mjo-option elements that define the available selections
 *
 * @csspart container - The main select input container
 * @csspart input - The native input element (hidden for select display)
 * @csspart label-container - The label container (via exportparts from mjoint-input-label)
 * @csspart label-truncate-container - The label truncate container (via exportparts)
 * @csspart label-truncate-wrapper - The label truncate wrapper (via exportparts)
 * @csspart prefix-text - Container for prefix text
 * @csspart suffix-text - Container for suffix text
 * @csspart start-icon-container - Container for start icon
 * @csspart start-icon - The start icon element (via exportparts from mjo-icon)
 * @csspart end-icon-container - Container for end icon
 * @csspart end-icon - The end icon element (via exportparts from mjo-icon)
 * @csspart end-icon-option-container - Container for end icon from selected option
 * @csspart end-option-icon - The end icon from selected option (via exportparts from mjo-icon)
 * @csspart start-image-container - Container for start image
 * @csspart start-image - The start image element
 * @csspart end-image-container - Container for end image
 * @csspart end-image - The end image element
 * @csspart end-image-option-container - Container for end image from selected option
 * @csspart end-option-image - The end image from selected option
 * @csspart select-dropdown-icon - The dropdown arrow icon
 * @csspart helper-container - Helper container (via exportparts from mjoint-input-helper-text)
 * @csspart helper-text-container - Helper text container (via exportparts)
 * @csspart helper-text-typography - Helper text typography (via exportparts)
 * @csspart helper-text-typography-tag - Helper text typography tag (via exportparts)
 * @csspart helper-text-error-message - Error message element (via exportparts)
 * @csspart helper-text-success-message - Success message element (via exportparts)
 * @csspart helper-text-icon - Helper text icon element (via exportparts)
 * @csspart options-list-container - The options list container (from mjoint-options-list)
 * @csspart select-search-container - The search container when searchable is enabled
 * @csspart select-search-input-wrapper - The search input wrapper element
 * @csspart select-search-input - The search input element
 * @csspart select-search-icon-container - Container for the search icon
 * @csspart select-search-icon - The search icon element
 */
@customElement("mjo-select")
export class MjoSelect extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IInputErrorMixin, IFormMixin, IThemeMixin {
    @property({ type: Boolean }) autoFocus = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: Boolean }) fullwidth = false;
    @property({ type: String }) name?: string;
    @property({ type: String }) placeholder?: string;
    @property({ type: String }) value: string = "";
    @property({ type: String }) label?: string;
    @property({ type: String }) size: MjoSelectSize = "medium";
    @property({ type: String }) color: MjoSelectColor = "primary";
    @property({ type: String }) startIcon?: string;
    @property({ type: String }) endIcon?: string;
    @property({ type: String }) startImage?: string;
    @property({ type: String }) endImage?: string;
    @property({ type: String }) prefixText?: string;
    @property({ type: String }) suffixText?: string;
    @property({ type: String }) helperText?: string;
    @property({ type: Boolean }) selectOnFocus = false;
    @property({ type: Boolean }) searchable = false;
    @property({ type: Object }) dropDownTheme?: MjoDropdownTheme;

    // ARIA properties - using Lit's built-in support where possible
    @property({ type: String, attribute: "aria-describedby" }) ariaDescribedby?: string;
    @property({ type: String, attribute: "aria-labelledby" }) ariaLabelledby?: string;
    @property({ type: String, attribute: "aria-errormessage" }) ariaErrormessage?: string;
    @property({ type: String, attribute: "aria-autocomplete" }) ariaAutocomplete?: "none" | "inline" | "list" | "both";
    @property({ type: String, attribute: "aria-activedescendant" }) ariaActivedescendant?: string;

    @state() private isFocused = false;
    @state() private open = false;
    @state() private options: MjoOption[] = [];
    @state() private visibleValue: string = "";
    @state() private startOptionImage?: string;
    @state() private endOptionImage?: string;
    @state() private startOptionIcon?: string;
    @state() private endOptionIcon?: string;
    @state() private currentFilter: string = "";
    @state() private activeDescendantId?: string;

    // Private validation state
    #customValidationMessage = "";

    @query("mjo-dropdown") dropdownElement!: MjoDropdown;
    @query("input[type='hidden']") inputElement!: HTMLInputElement;
    @query("input[type='text']") inputVisibleElement!: HTMLInputElement;

    type = "select";
    optionListRef = createRef<MjointOptionsList>();
    observer!: MutationObserver;
    #uniqueId = `mjo-select-${Math.random().toString(36).substring(2, 9)}`;
    #previousValue = "";
    #previousOption: MjoOption | null = null;

    render() {
        const helperTextId = this.helperText || this.errormsg || this.successmsg ? `${this.#uniqueId}-helper` : undefined;
        const labelId = this.label ? `${this.#uniqueId}-label` : undefined;
        const listboxId = `${this.#uniqueId}-listbox`;

        return html`${this.applyThemeSsr()}
            ${this.label
                ? html`<mjoint-input-label
                      id=${ifDefined(labelId)}
                      exportparts="container: label-container, truncate-container: label-truncate-container, truncate-wrapper: label-truncate-wrapper"
                      color=${this.color}
                      label=${this.label}
                      ?focused=${this.isFocused}
                      ?error=${this.error}
                      ?data-disabled=${this.disabled}
                  ></mjoint-input-label>`
                : nothing}
            <mjo-dropdown
                .html=${html`<mjoint-options-list
                    ${ref(this.optionListRef)}
                    id=${listboxId}
                    exportparts="
                        container: options-list-container,
                        select-search-container: select-search-container,
                        select-search-input-wrapper: select-search-input-wrapper,
                        select-search-input: select-search-input,
                        select-search-icon-container: select-search-icon-container,
                        select-search-icon: select-search-icon,
                    "
                    .options=${this.options}
                    .mjoSelect=${this as MjoSelect}
                    ?searchable=${this.searchable}
                    ?open=${this.open}
                    .theme=${this.theme}
                    @options-list.blur=${() => this.#handleOptionsBlur()}
                    @options-list.filter=${(e: CustomEvent) => this.#handleOptionListFilter(e)}
                    @options-list.selection-change=${(e: CustomEvent) => this.#handleOptionListSelectionChange(e)}
                ></mjoint-options-list>`}
                ?disabled=${this.disabled}
                preventScroll
                behaviour="click"
                fullwidth
                .theme=${this.dropDownTheme}
                @mjo-dropdown:open=${this.#handleOpen}
                @mjo-dropdown:close=${this.#handleClose}
                @click=${this.#handleClick}
            >
                <div
                    class="container"
                    part="container"
                    data-color=${this.color}
                    ?data-focused=${this.isFocused}
                    data-size=${this.size}
                    ?data-error=${this.error}
                    ?data-disabled=${this.disabled}
                >
                    ${this.prefixText ? html`<div class="prefixText" part="prefix-text">${this.prefixText}</div>` : nothing}
                    ${this.startIcon &&
                    html`
                        <div class="icon startIcon" part="start-icon-container" aria-hidden="true">
                            <mjo-icon exportparts="icon: start-icon" src=${this.startIcon}></mjo-icon>
                        </div>
                    `}
                    ${this.startImage && !this.startIcon
                        ? html`<div class="image startImage" part="start-image-container">
                              <img src=${this.startImage} part="start-image" alt="Input image" />
                          </div>`
                        : nothing}
                    ${this.startOptionIcon &&
                    html`<div class="icon startIcon optionImage" aria-hidden="true"><mjo-icon src=${this.startOptionIcon}></mjo-icon></div>`}
                    ${this.startOptionImage && !this.startOptionIcon
                        ? html`<div class="image startImage optionImage"><img src=${this.startOptionImage} alt="Selected option image" /></div>`
                        : nothing}
                    <input
                        role="combobox"
                        part="input"
                        ?autofocus=${this.autoFocus}
                        ?disabled=${this.disabled}
                        placeholder=${ifDefined(this.placeholder)}
                        type="text"
                        .value=${live(this.visibleValue)}
                        aria-haspopup="listbox"
                        aria-expanded=${this.open ? "true" : "false"}
                        aria-controls=${listboxId}
                        aria-activedescendant=${ifDefined(this.activeDescendantId)}
                        aria-autocomplete=${this.searchable ? "list" : "none"}
                        aria-label=${this.ariaLabel || nothing}
                        aria-labelledby=${this.ariaLabelledby || labelId || nothing}
                        aria-describedby=${this.ariaDescribedby || helperTextId || nothing}
                        aria-errormessage=${this.ariaErrormessage || (this.errormsg ? helperTextId : nothing) || nothing}
                        aria-invalid=${this.error ? "true" : "false"}
                        aria-required=${ifDefined(this.required)}
                        readonly
                        @focus=${this.#handleFocus}
                        @blur=${this.#handleBlur}
                    />
                    <input type="hidden" name=${ifDefined(this.name)} .value=${live(this.value)} />

                    ${this.endOptionIcon
                        ? html`
                              <div class="icon endIcon optionImage" part="end-icon-container end-icon-option-container" aria-hidden="true">
                                  <mjo-icon src=${this.endOptionIcon} exportparts="icon: end-option-icon"></mjo-icon>
                              </div>
                          `
                        : nothing}
                    ${this.endOptionImage && !this.endOptionIcon
                        ? html`
                              <div class="image endImage optionImage" part="end-image-container end-image-option-container">
                                  <img src=${this.endOptionImage} part="end-option-image" alt="Selected option image" />
                              </div>
                          `
                        : nothing}
                    ${this.endIcon
                        ? html`
                              <div class="icon endIcon" part="end-icon-container" aria-hidden="true">
                                  <mjo-icon src=${this.endIcon} exportparts="icon: end-icon"></mjo-icon>
                              </div>
                          `
                        : nothing}
                    ${this.endImage && !this.endIcon
                        ? html`
                              <div class="image endImage" part="end-image-container">
                                  <img src=${this.endImage} part="end-image" alt="Input image" />
                              </div>
                          `
                        : nothing}
                    ${this.suffixText ? html`<div class="prefixText" part="suffix-text">${this.suffixText}</div>` : nothing}
                    <div class="icon endIcon arrowDown" part="select-dropdown-icon" aria-hidden="true">
                        <mjo-icon src=${AiOutlineDown}></mjo-icon>
                    </div>
                </div>
            </mjo-dropdown>
            <div class="helper" part="helper-container" ?data-disabled=${this.disabled}>
                ${this.helperText || this.errormsg || this.successmsg
                    ? html`
                          <mjoint-input-helper-text
                              id=${ifDefined(helperTextId)}
                              exportparts="
                                    container: helper-text-container,
                                    typography: helper-text-typography,
                                    helper-text: helper-text-typography-tag,
                                    error-message: helper-text-error-message,
                                    success-message: helper-text-success-message,
                                    icon: helper-text-icon
                                "
                              errormsg=${ifDefined(this.errormsg)}
                              successmsg=${ifDefined(this.successmsg)}
                          >
                              ${this.helperText}
                          </mjoint-input-helper-text>
                      `
                    : nothing}
            </div>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.#setOptions();
        this.#handleOptions();

        if (this.autoFocus) {
            this.inputVisibleElement.focus();
        }

        this.updateFormData({ name: this.name || "", value: this.value });

        this.observer = new MutationObserver(() => {
            this.#setOptions();
            this.#handleOptions();
        });

        this.observer.observe(this, { childList: true });
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.observer.disconnect();
    }

    protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
        if (_changedProperties.has("value") && this.value !== this.inputElement.value) {
            this.setValue(this.value);
        }

        // Update ARIA states
        if (_changedProperties.has("open")) {
            this.inputVisibleElement?.setAttribute("aria-expanded", this.open ? "true" : "false");
        }

        if (_changedProperties.has("activeDescendantId")) {
            if (this.activeDescendantId) {
                this.inputVisibleElement?.setAttribute("aria-activedescendant", this.activeDescendantId);
            } else {
                this.inputVisibleElement?.removeAttribute("aria-activedescendant");
            }
        }
    }

    // Public methods for accessibility and validation

    /**
     * Focuses the select input element.
     */
    focus() {
        this.inputVisibleElement.focus();
    }

    /**
     * Blurs the select input element.
     */
    blur() {
        this.inputVisibleElement.blur();
    }

    /**
     * Checks the validity of the select element according to its validation constraints.
     * @returns true if the element meets all validation constraints, false otherwise
     */
    checkValidity(): boolean {
        if (this.required && !this.value) {
            return false;
        }
        if (this.#customValidationMessage) {
            return false;
        }
        return true;
    }

    /**
     * Reports the validity state of the element and displays validation messages if invalid.
     * @returns true if the element is valid, false otherwise
     */
    reportValidity(): boolean {
        const isValid = this.checkValidity();

        if (!isValid) {
            this.dispatchEvent(
                new CustomEvent("invalid", {
                    detail: {
                        message: this.validationMessage,
                        element: this,
                    },
                    bubbles: true,
                }),
            );
        }

        return isValid;
    }

    /**
     * Sets a custom validation message for the select element.
     * @param message - The validation message to set
     */
    setCustomValidity(message: string): void {
        this.#customValidationMessage = message;
    }

    /**
     * Gets the current validation message.
     * @returns The validation message
     */
    get validationMessage(): string {
        if (this.#customValidationMessage) {
            return this.#customValidationMessage;
        }
        if (this.required && !this.value) {
            return "Please select an option.";
        }
        return "";
    }

    /**
     * Opens the select dropdown.
     */
    openDropdown(): void {
        if (!this.disabled) {
            this.dropdownElement.open();
        }
    }

    /**
     * Closes the select dropdown.
     */
    closeDropdown(): void {
        this.dropdownElement.close();
    }

    /**
     * Toggles the select dropdown open/closed state.
     */
    toggleDropdown(): void {
        if (this.open) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    /**
     * Gets the currently selected option.
     * @returns The selected MjoOption element or null if none selected
     */
    getSelectedOption(): MjoOption | null {
        return this.options.find((option) => option.selected) || null;
    }

    /**
     * Gets all available options.
     * @returns Array of MjoOption elements
     */
    getOptions(): MjoOption[] {
        return [...this.options];
    }

    /**
     * Filters options based on a search query.
     * @param query - The search string to filter by
     */
    filterOptions(query: string): void {
        if (this.optionListRef.value) {
            this.optionListRef.value.filter = query;
        }
    }

    /**
     * Resets the filter to show all options.
     */
    resetFilter(): void {
        if (this.optionListRef.value) {
            this.optionListRef.value.resetFilter();
        }
    }

    /**
     * Returns whether the select dropdown is currently open.
     */
    isOpen() {
        return this.open;
    }

    setValue(value: string, noDispatch: boolean = false) {
        this.#previousValue = this.value;
        this.#previousOption = this.options.find((option) => option.selected) || null;

        for (const option of this.options) {
            option.selected = option.value === value;
            if (option.value === value) {
                this.value = value;
                this.startOptionIcon = option.startIcon;
                this.endOptionIcon = option.endIcon;
                this.startOptionImage = option.startImage;
                this.endOptionImage = option.endImage;
                this.visibleValue = option.text || option.value;
                this.activeDescendantId = option.id || undefined;
            }
        }

        if (!noDispatch) {
            const selectedOption = this.options.find((option) => option.selected) || null;
            this.dispatchEvent(
                new CustomEvent("mjo-select:change", {
                    detail: {
                        element: this,
                        value: this.value,
                        previousValue: this.#previousValue,
                        option: selectedOption,
                        previousOption: this.#previousOption,
                    },
                    bubbles: true,
                }),
            );

            // Also dispatch the standard change event for form compatibility
            this.dispatchEvent(new Event("change", { bubbles: true }));
        }

        this.updateFormData({ name: this.name || "", value: this.value });
    }

    getValue() {
        return this.value;
    }

    #handleBlur() {
        if (this.searchable) return;
        this.dropdownElement.close();

        this.dispatchEvent(
            new CustomEvent("mjo-select:blur", {
                detail: {
                    element: this,
                    value: this.value,
                    reason: "blur",
                },
                bubbles: true,
            }),
        );
    }

    #handleClick() {
        if (!this.open) {
            this.dispatchEvent(
                new CustomEvent("mjo-select:focus", {
                    detail: {
                        element: this,
                        value: this.value,
                    },
                    bubbles: true,
                }),
            );
            // Also dispatch the standard focus event
            this.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
        }
    }

    #handleClose() {
        this.open = false;
        this.isFocused = false;
        this.activeDescendantId = undefined;

        this.dispatchEvent(
            new CustomEvent("mjo-select:close", {
                detail: {
                    element: this,
                    value: this.value,
                    reason: "blur",
                },
                bubbles: true,
            }),
        );
    }

    #handleFocus() {
        this.dropdownElement.open();
    }

    #handleOpen() {
        this.open = true;
        this.isFocused = true;

        this.dispatchEvent(
            new CustomEvent("mjo-select:open", {
                detail: {
                    element: this,
                    value: this.value,
                    optionsCount: this.options.length,
                },
                bubbles: true,
            }),
        );
    }

    #handleOptionsBlur() {
        this.focus();
        this.dropdownElement.close();
    }

    #handleOptionListFilter(event: CustomEvent) {
        this.currentFilter = event.detail.filter || "";

        this.dispatchEvent(
            new CustomEvent("mjo-select:search", {
                detail: {
                    element: this,
                    query: this.currentFilter,
                    filteredOptionsCount: event.detail.filteredOptionsCount || 0,
                },
                bubbles: true,
            }),
        );

        setTimeout(() => {
            this.dropdownElement.updatePosition();
        }, 50);
    }

    #handleOptionListSelectionChange(event: CustomEvent) {
        const { option, previousOption } = event.detail;
        this.activeDescendantId = option?.id || undefined;

        this.dispatchEvent(
            new CustomEvent("mjo-select:option-preselect", {
                detail: {
                    element: this,
                    option,
                    previousOption,
                    value: option?.value || "",
                },
                bubbles: true,
            }),
        );
    }

    async #handleOptions() {
        if (this.options.length === 0) return;

        let selectedValue = null;
        let hasSelected = false;
        for (const option of this.options) {
            await option.updateComplete;

            if (selectedValue === null || option.selected) {
                selectedValue = option.value;
            }

            if (option.selected) {
                hasSelected = true;
            }

            option.color = this.color;
            option.handleClick = this.setValue.bind(this);
        }

        if (!hasSelected) {
            this.options[0].selected = true;
        }

        this.setValue(selectedValue || "", true);
    }

    #setOptions() {
        if (this.optionListRef.value) {
            this.optionListRef.value.resetFilter();
        }

        const options = this.querySelectorAll("mjo-option");
        if (!options.length) return;

        this.options = Array.from(options) as MjoOption[];

        this.options.forEach((option) => {
            option.theme = this.theme;
        });
    }

    static styles = [
        css`
            :host {
                display: inline-flex;
                flex-flow: column nowrap;
                position: relative;
                max-width: 100%;
            }
            :host([fullwidth]) {
                width: 100%;
            }
            .container {
                border-radius: var(--mjo-input-border-radius, var(--mjo-radius-medium, 5px));
                border: solid 1px;
                border-style: var(--mjo-input-border-style, solid);
                border-width: var(--mjo-input-border-width, 1px);
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                background-color: var(--mjo-input-background-color, var(--mjo-background-color-card-low, #ffffff));
                box-shadow: var(--mjo-input-box-shadow, none);
                display: flex;
                flex-flow: row nowrap;
                overflow: hidden;
                position: relative;
                transition: border-color 0.3s;
                user-select: none;
            }
            .container::after {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
            }
            .container:hover {
                border-style: var(--mjo-input-border-style-hover, solid);
                border-width: var(--mjo-input-border-width-hover, 1px);
                border-color: var(--mjo-input-border-color-hover, #cccccc);
            }
            .container[data-focused] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-focused][data-color="secondary"] {
                border-style: var(--mjo-input-border-style-focus, solid);
                border-width: var(--mjo-input-border-width-focus, 1px);
                border-color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            .container[data-error],
            .container[data-error][data-color="secondary"] {
                border-color: var(--mjo-color-error, #d31616);
            }
            .container[data-disabled] {
                border-color: var(--mjo-input-border-color, var(--mjo-border-color, #dddddd));
                opacity: 0.5;
            }
            mjoint-input-label[data-disabled],
            .helper[data-disabled] {
                opacity: 0.5;
            }
            input {
                position: relative;
                background-color: transparent;
                border: none;
                padding: var(--mjo-input-padding, calc(1em / 2 - 3px) calc(1em / 2 - 2px) calc(1em / 2 - 4px));
                font-size: var(--mjo-input-font-size, 1em);
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                color: var(--mjo-input-color, var(--mjo-foreground-color, #222222));
                box-sizing: border-box;
                flex: 1 1 0;
                width: 100%;
                min-width: 0;
                user-select: none;
            }
            input:focus {
                outline: none;
            }
            input:-webkit-autofill {
                box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                -webkit-text-fill-color: var(--mo-input-color, #111111);
            }
            input::-ms-reveal,
            input::-ms-clear {
                display: none !important;
            }
            .container[data-size="small"] input {
                padding: var(--mjo-input-padding-small, calc(1em / 2 - 4px) calc(1em / 2));
                font-size: 0.8em;
            }
            .container[data-size="large"] input {
                padding: var(--mjo-input-padding-large, calc(1em / 2 - 2px) calc(1em / 2 + 3px) calc(1em / 2 - 3px));
                font-size: 1.2em;
            }
            .prefixText {
                position: relative;
                font-weight: var(--mjo-input-font-weight, normal);
                font-family: var(--mjo-input-font-family, inherit);
                line-height: var(--mjo-input-font-size, 1em);
                padding: calc(1em / 2 - 2px);
                background-color: var(--mjo-input-prefix-text-background-color, rgba(220, 220, 220, 0.5));
                color: var(--mjo-input-prefix-text-color, currentColor);
                display: grid;
                place-items: center;
                transition: color 0.3s;
            }
            .container[data-focused].prefixText {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-focused][data-color="secondary"] .prefixText {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            .icon {
                position: relative;
                display: grid;
                place-items: center;
                color: var(--mjo-input-color, var(--mjo-foreground-color, #222222));
            }
            mjo-icon {
                font-size: var(--mjo-input-font-size, 1em);
            }
            .container[data-focused] :not(.optionImage) mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed));
            }
            .container[data-focused][data-color="secondary"] :not(.optionImage) mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717));
            }
            .container[data-error] :not(.optionImage) mjo-icon,
            .container[data-error][data-color="secondary"] :not(.optionImage) mjo-icon {
                color: var(--mjo-color-error, #d31616);
            }
            .image {
                position: relative;
                display: grid;
                place-items: center;
            }
            .image img {
                width: 1em;
                height: 1em;
                object-fit: contain;
            }
            .startIcon,
            .startImage {
                padding-left: calc(1em / 2 - 4px);
            }
            .endIcon,
            .endImage {
                padding-right: calc(1em / 2 - 4px);
            }
            .arrowDown {
                color: var(--mjo-input-color, var(--mjo-foreground-color, #222222));
                font-size: 0.8em;
            }
            .passIcon {
                cursor: pointer;
            }
            .clearabled {
                opacity: 0;
                font-size: calc(var(--mjo-input-font-size, 1em) * 0.8);
                transition: opacity 0.3s;
            }
            .clearabled[data-visible] {
                opacity: 1;
                cursor: pointer;
            }
            .container .clearabled mjo-icon {
                color: #999999 !important;
            }
            .container .clearabled:hover mjo-icon {
                color: var(--mjo-input-primary-color, var(--mjo-primary-color, #1aa8ed)) !important;
            }
            .container[data-color="secondary"] .clearabled:hover mjo-icon {
                color: var(--mjo-input-secondary-color, var(--mjo-secondary-color, #7dc717)) !important;
            }
            .helper {
                position: relative;
                display: flex;
                justify-content: flex-end;
                gap: 5px;
            }
            mjoint-input-helper-text {
                flex: 1 1 0;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-select": MjoSelect;
    }

    interface HTMLElementEventMap {
        "mjo-select:change": MjoSelectChangeEvent;
        "mjo-select:open": MjoSelectOpenEvent;
        "mjo-select:close": MjoSelectCloseEvent;
        "mjo-select:clear": MjoSelectClearEvent;
        "mjo-select:search": MjoSelectSearchEvent;
        "mjo-select:option-preselect": MjoSelectOptionPreselectEvent;
        "mjo-select:focus": MjoSelectFocusEvent;
        "mjo-select:blur": MjoSelectBlurEvent;
        "mjo-select:keydown": MjoSelectKeydownEvent;
    }
}
